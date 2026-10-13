import { useRef, useState } from 'react';
import { AnimatePresence, motion, Reorder, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import type { DockItemData } from '../content/types';
import { dockSeparatorsAfter } from '../content/dock';
import { useIsMobile, useItemIcon, usePrefersReducedMotion } from '../hooks/hooks';

const DEFAULT_SIZE = 44;
const MIN_SIZE = 32;
const MAX_SIZE = 84;
const KEY = 'dock-size';
const clamp = (n: number) => Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(n)));
const THUMB_RATIO = 1.5;
const SPRING = { mass: 0.1, stiffness: 170, damping: 14 };

export function DockTooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <span className={`dock-tooltip${visible ? ' is-visible' : ''}`} aria-hidden="true">
      {label}
    </span>
  );
}

interface ItemProps {
  item: DockItemData;
  mouseX: MotionValue<number>;
  base: number;
  reduced: boolean;
  running: boolean;
  onActivate: (item: DockItemData) => void;
  thumb?: ThumbKind;
}

export function DockItem({ item, mouseX, base: BASE, reduced, running, onActivate, thumb }: ItemProps) {
  const icon = useItemIcon(item);
  const MAX = BASE * (80 / 44);
  const RANGE = BASE * (140 / 44);
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  // Cosine-like falloff, as in macOS: smooth peak under the cursor, zero outside RANGE.
  const target = useTransform(distance, [-RANGE, -RANGE / 2, 0, RANGE / 2, RANGE], [BASE, BASE + (MAX - BASE) * 0.35, MAX, BASE + (MAX - BASE) * 0.35, BASE]);
  const spring = useSpring(target, SPRING);
  const size = reduced ? BASE : spring;
  const wideSpring = useTransform(spring, (v) => v * THUMB_RATIO);
  const width = thumb ? (reduced ? BASE * THUMB_RATIO : wideSpring) : size;

  return (
    <motion.div
      ref={ref}
      className="dock-item-wrap"
      style={{ width }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <DockTooltip label={item.label} visible={tip} />
      <motion.button
        type="button"
        className="dock-item"
        data-dock-id={item.id}
        aria-label={item.label}
        style={{ width, height: size }}
        whileTap={{ scale: 0.94 }}
        animate={bouncing ? { y: [0, -30, 0, -18, 0, -7, 0] } : { y: 0 }}
        transition={bouncing ? { duration: 1, ease: 'easeOut' } : { duration: 0 }}
        onAnimationComplete={() => bouncing && setBouncing(false)}
        onFocus={() => setTip(true)}
        onBlur={() => setTip(false)}
        onClick={() => {
          if (!reduced) setBouncing(true);
          onActivate(item);
        }}
      >
        <span className="dock-item__icon" aria-hidden="true">
          {thumb ? <WindowThumb kind={thumb} icon={icon} /> : icon.startsWith('/') ? <img src={icon} alt="" draggable={false} /> : icon}
        </span>
      </motion.button>
      {running && <span className="dock-dot" aria-hidden="true" />}
    </motion.div>
  );
}

export type ThumbKind = 'notes' | 'case' | 'browser' | 'spotify' | 'generic';

export interface DockTile {
  key: string;
  label: string;
  icon: string;
  icons?: DockItemData['icons'];
  thumb: ThumbKind;
}

/** Simulated miniature of a minimized window (not a real capture). */
function WindowThumb({ kind, icon }: { kind: ThumbKind; icon: string }) {
  return (
    <span className={`win-thumb win-thumb--${kind}`} aria-hidden="true">
      <span className="win-thumb__bar">
        <i /><i /><i />
      </span>
      <span className="win-thumb__body">
        {kind === 'notes' && (
          <>
            <span className="win-thumb__side">
              <b className="is-active" /><b /><b />
            </span>
            <span className="win-thumb__main">
              <b className="h" /><b /><b /><b className="s" /><b />
            </span>
          </>
        )}
        {kind === 'case' && (
          <span className="win-thumb__main">
            <b className="hero" /><b className="h" /><b /><b className="s" />
          </span>
        )}
        {kind === 'spotify' && (
          <span className="win-thumb__sp">
            <span className="win-thumb__sp-head">
              <i className="cover" />
              <span><b className="h" /><b /><b className="s" /></span>
            </span>
            <span className="win-thumb__sp-list"><b /><b /></span>
          </span>
        )}
        {(kind === 'browser' || kind === 'generic') && (
          <span className="win-thumb__main">
            <b className="hero" /><b /><b className="s" />
          </span>
        )}
      </span>
      <img className="win-thumb__badge" src={icon} alt="" draggable={false} />
    </span>
  );
}

export function Dock({
  items,
  runningIds,
  tiles,
  onActivate,
  onRestore,
}: {
  items: DockItemData[];
  runningIds: Set<string>;
  tiles: DockTile[];
  onActivate: (i: DockItemData) => void;
  onRestore: (key: string) => void;
}) {
  const mouseX = useMotionValue(Infinity);
  const reduced = usePrefersReducedMotion();
  const [size, setSize] = useState(() => {
    try {
      return clamp(Number(localStorage.getItem(KEY)) || DEFAULT_SIZE);
    } catch {
      return DEFAULT_SIZE;
    }
  });
  const drag = useRef<{ y: number; size: number } | null>(null);
  const isMobile = useIsMobile();
  // Order is session-only on purpose: a reload restores the default order.
  const [order, setOrder] = useState(() => items.map((i) => i.id));
  const justDragged = useRef(false);
  const byId = new Map(items.map((i) => [i.id, i]));
  const sepIndex = items.findIndex((i) => dockSeparatorsAfter.includes(i.id));

  const save = (n: number) => {
    try {
      localStorage.setItem(KEY, String(n));
    } catch {
      /* storage unavailable */
    }
  };
  const onResizeKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowUp' ? 4 : e.key === 'ArrowDown' ? -4 : 0;
    if (!d) return;
    e.preventDefault();
    const n = clamp(size + d);
    setSize(n);
    save(n);
  };

  return (
    <Reorder.Group
      as="nav"
      axis={isMobile ? 'y' : 'x'}
      values={order}
      onReorder={setOrder}
      className="dock"
      style={{ '--dock-icon': `${size}px` } as React.CSSProperties}
      aria-label="Dock"
      onMouseMove={(e: React.MouseEvent) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {order.flatMap((id, idx) => {
        const item = byId.get(id)!;
        const out = [
          <Reorder.Item
            as="div"
            key={id}
            value={id}
            layout="position"
            className="dock-slot"
            whileDrag={{ zIndex: 5 }}
            onDragStart={() => (justDragged.current = true)}
            onDragEnd={() => setTimeout(() => (justDragged.current = false), 50)}
            onClickCapture={(e: React.MouseEvent) => justDragged.current && e.stopPropagation()}
          >
            <DockItem item={item} mouseX={mouseX} base={size} reduced={reduced} running={runningIds.has(id)} onActivate={onActivate} />
          </Reorder.Item>,
        ];
        if (idx === sepIndex) {
          out.push(
            <span
              key="dock-separator"
              className="dock-separator"
              role="separator"
              tabIndex={0}
              aria-orientation="horizontal"
              aria-label="Tamaño del Dock"
              aria-valuemin={MIN_SIZE}
              aria-valuemax={MAX_SIZE}
              aria-valuenow={size}
              onKeyDown={onResizeKey}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                drag.current = { y: e.clientY, size };
              }}
              onPointerMove={(e) => {
                if (drag.current) setSize(clamp(drag.current.size + (drag.current.y - e.clientY)));
              }}
              onPointerUp={() => {
                drag.current = null;
                save(size);
              }}
              onPointerCancel={() => (drag.current = null)}
            />,
          );
        }
        return out;
      })}
      <AnimatePresence initial={false}>
        {tiles.length > 0 && (
          <motion.span
            key="tiles-sep"
            className="dock-separator"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {tiles.map((t) => (
          <motion.div
            key={t.key}
            className="dock-slot dock-tile"
            initial={reduced ? false : { scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 380, damping: 28, delay: 0.16 } }}
            exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.18 } }}
          >
            <DockItem
              item={{ id: t.key, label: t.label, icon: t.icon, icons: t.icons, kind: 'tool' }}
              mouseX={mouseX}
              base={size}
              reduced={reduced}
              running={false}
              thumb={t.thumb}
              onActivate={() => onRestore(t.key)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
