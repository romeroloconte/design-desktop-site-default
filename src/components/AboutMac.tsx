import { useId, useRef, useState } from 'react';
import { appearances, type Appearance } from '../appearance';
import { useFocusTrap } from '../hooks/hooks';
import { author } from '../content/dock';

export function AboutMac({ current, onPick, onClose }: { current: Appearance; onPick: (a: Appearance) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(ref, onClose);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ sx: number; sy: number; base: typeof pos; rect: DOMRect } | null>(null);
  const active = appearances.find((a) => a.id === current)!;

  return (
    <div className="window-layer window-layer--dialog about-layer" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        className="about-mac"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={{ translate: `${pos.x}px ${pos.y}px` }}
        onPointerDown={(e) => {
          if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { sx: e.clientX, sy: e.clientY, base: pos, rect: e.currentTarget.getBoundingClientRect() };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          // keep the whole modal on screen, below the menu bar
          const dx = Math.min(Math.max(e.clientX - d.sx, -d.rect.left), window.innerWidth - d.rect.right);
          const dy = Math.min(Math.max(e.clientY - d.sy, 28 - d.rect.top), window.innerHeight - d.rect.bottom);
          setPos({ x: d.base.x + dx, y: d.base.y + dy });
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <div className="about-mac__bar">
          <button type="button" className="tl tl--close" aria-label="Close" onClick={onClose} />
          <button type="button" className="tl tl--min" aria-label="Minimize" disabled />
          <button type="button" className="tl tl--max" aria-label="Maximize" disabled />
        </div>
        <div className={`about-mac__laptop`} aria-hidden="true">
          <div className="about-mac__screen" />
          <div className="about-mac__base" />
        </div>
        <h2 id={titleId} className="about-mac__name">{author.name}'s Portfolio</h2>
        <p className="about-mac__sub">{active.name}, {active.era}</p>

        <div className="about-mac__picker" role="radiogroup" aria-label="Appearance">
          {appearances.map((a) => (
            <button key={a.id} type="button" role="radio" aria-checked={a.id === current} data-autofocus={a.id === current || undefined} className={`about-mac__opt${a.id === current ? ' is-on' : ''}`} onClick={() => onPick(a.id)}>
              <span className={`about-mac__thumb about-mac__thumb--${a.id}`} aria-hidden="true">
                <i className="th-bar" />
                <i className="th-win"><b /><b /><b /></i>
                <i className="th-dock" />
              </span>
              <span className="about-mac__opt-name">{a.name}</span>
              <span className="about-mac__opt-era">{a.era}</span>
            </button>
          ))}
        </div>
        <p className="about-mac__blurb">{active.blurb}</p>

        <dl className="about-mac__specs">
          <dt>Design</dt><dd>{author.name}</dd>
          <dt>Appearance</dt><dd>{active.name}</dd>
          <dt>Version</dt><dd>{active.era}</dd>
        </dl>
      </div>
    </div>
  );
}
