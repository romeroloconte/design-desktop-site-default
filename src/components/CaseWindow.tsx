import { useId, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import type { Project } from '../content/types';
import { useIsMobile, useWindowFocus } from '../hooks/hooks';
import { CaseBody } from './CaseNav';

interface ChromeProps {
  title: string;
  titleId: string;
  isExpanded: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleExpand: () => void;
}

export function WindowChrome({ title, titleId, isExpanded, onClose, onMinimize, onToggleExpand }: ChromeProps) {
  const isMobile = useIsMobile();
  return (
    <div className="window-chrome" data-drag>
      <div className="traffic-lights">
        <button type="button" className="tl tl--close" aria-label="Close window" onClick={onClose} />
        <button type="button" className="tl tl--min" aria-label="Minimize window" onClick={onMinimize} />
        <button
          type="button"
          className="tl tl--max"
          aria-label={isMobile ? 'Minimize window' : isExpanded ? 'Restore window size' : 'Expand window'}
          onClick={isMobile ? onMinimize : onToggleExpand}
        />
      </div>
      <h2 className="window-chrome__title" id={titleId}>
        {title}
      </h2>
    </div>
  );
}

/** Everything a desktop window needs from the window manager in App. */
export interface FrameProps {
  winKey: string;
  slot: number;
  z: number;
  minimized: boolean;
  isTop: boolean;
  isExpanded: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onToggleExpand: () => void;
}

/** Non-modal window shell: stacks, cascades, and flies to the dock when minimized. */
export function Frame({
  f,
  titleId,
  className = '',
  theme,
  children,
}: {
  f: FrameProps;
  titleId: string;
  className?: string;
  theme?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useWindowFocus(ref, f.isTop);
  const [dragging, setDragging] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const grab = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const cls = [
    'case-window',
    className,
    f.isExpanded && 'is-expanded',
    f.minimized && 'is-minimized',
    f.isTop && 'is-top',
    dragging && 'is-dragging',
  ];

  // Drag by the title bar (any [data-drag] area that is not a control).
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    f.onFocus();
    const t = e.target as HTMLElement;
    if (f.isExpanded || e.button !== 0 || !t.closest('[data-drag]') || t.closest('button,a,input')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    grab.current = { px: e.clientX, py: e.clientY, ...pos.current };
    setDragging(true);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const g = grab.current;
    if (!g) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    let x = g.x + e.clientX - g.px;
    let y = g.y + e.clientY - g.py;
    // Keep the title bar reachable: below the menu bar, above the bottom edge, partly on screen.
    const dy = y - pos.current.y;
    const dx = x - pos.current.x;
    if (r.top + dy < 28) y += 28 - (r.top + dy);
    if (r.top + dy > window.innerHeight - 60) y -= r.top + dy - (window.innerHeight - 60);
    if (r.right + dx < 80) x += 80 - (r.right + dx);
    if (r.left + dx > window.innerWidth - 80) x -= r.left + dx - (window.innerWidth - 80);
    pos.current = { x, y };
    el.style.setProperty('--dx', `${x}px`);
    el.style.setProperty('--dy', `${y}px`);
  };
  const onUp = () => {
    grab.current = null;
    setDragging(false);
  };

  // Resize from the bottom-right corner. The window is centred, so shift it by half the
  // growth to keep the top-left corner where it is.
  const sizing = useRef<{ px: number; py: number; w: number; h: number; x: number; y: number } | null>(null);
  const onSizeDown = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.button !== 0 || f.isExpanded) return;
    e.stopPropagation();
    f.onFocus();
    e.currentTarget.setPointerCapture(e.pointerId);
    const r = el.getBoundingClientRect();
    sizing.current = { px: e.clientX, py: e.clientY, w: r.width, h: r.height, ...pos.current };
    setDragging(true);
  };
  const onSizeMove = (e: PointerEvent<HTMLSpanElement>) => {
    const s = sizing.current;
    const el = ref.current;
    if (!s || !el) return;
    const minW = window.innerWidth <= 720 ? 220 : 360;
    const w = Math.max(minW, Math.min(window.innerWidth, s.w + e.clientX - s.px));
    const h = Math.max(240, Math.min(window.innerHeight - 28, s.h + e.clientY - s.py));
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    // Phones size browser windows through these (CSS !important beats the inline size).
    el.style.setProperty('--rw', `${w}px`);
    el.style.setProperty('--rh', `${h}px`);
    pos.current = { x: s.x + (w - s.w) / 2, y: s.y + (h - s.h) / 2 };
    el.style.setProperty('--dx', `${pos.current.x}px`);
    el.style.setProperty('--dy', `${pos.current.y}px`);
  };
  const onSizeUp = () => {
    sizing.current = null;
    setDragging(false);
  };
  return (
    <div className="window-layer" style={{ '--z': f.z } as CSSProperties}>
      <div
        ref={ref}
        className={cls.filter(Boolean).join(' ')}
        role="dialog"
        aria-labelledby={titleId}
        data-win-key={f.winKey}
        data-theme={theme}
        style={{ '--slot': f.slot } as CSSProperties}
        tabIndex={-1}
        inert={f.minimized}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {children}
        <span
          className="resize-handle"
          aria-hidden="true"
          onPointerDown={onSizeDown}
          onPointerMove={onSizeMove}
          onPointerUp={onSizeUp}
          onPointerCancel={onSizeUp}
        />
      </div>
    </div>
  );
}

export function CaseWindow({ project, f }: { project: Project; f: FrameProps }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  return (
    <Frame f={f} titleId={titleId} theme={project.theme}>
      <WindowChrome
        title={project.windowTitle}
        titleId={titleId}
        isExpanded={f.isExpanded}
        onClose={f.onClose}
        onMinimize={f.onMinimize}
        onToggleExpand={f.onToggleExpand}
      />
      <CaseBody project={project} scrollRef={scrollRef} />
    </Frame>
  );
}
