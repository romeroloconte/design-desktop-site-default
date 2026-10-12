import { useId } from 'react';
import type { DockItemData } from '../content/types';
import { author, notes } from '../content/dock';
import { Frame, type FrameProps } from './CaseWindow';


// LinkedIn sends X-Frame-Options/frame-ancestors, so the real site cannot be
// embedded. This window simulates Firefox around a profile card instead.
export function BrowserWindow({ item, f }: { item: DockItemData; f: FrameProps }) {
  const titleId = useId();
  const href = item.href ?? 'https://www.linkedin.com';
  const display = href.replace(/^https?:\/\//, '');
  const about = notes.find((n) => n.id === 'about');
  const title = item.embed ? item.label : `${author.name} | ${item.label}`;

  return (
    <Frame f={f} titleId={titleId} className={`browser-window${item.id === 'profile' ? ' browser-window--site' : ''}${item.id === 'tool-spotify' ? ' browser-window--compact' : ''}`}>
        <div className="browser-top" data-drag>
          <div className="traffic-lights">
            <button type="button" className="tl tl--close" aria-label="Close window" onClick={f.onClose} />
            <button type="button" className="tl tl--min" aria-label="Minimize window" onClick={f.onMinimize} />
            <button
              type="button"
              className="tl tl--max"
              aria-label={f.isExpanded ? 'Restore window size' : 'Expand window'}
              onClick={f.onToggleExpand}
            />
          </div>
          <div className="browser-tab">
            <img src={item.icon} alt="" width={14} height={14} draggable={false} />
            <h2 id={titleId} className="browser-tab__title">
              {title}
            </h2>
          </div>
        </div>
        <div className="browser-toolbar">
          <span className="browser-nav" aria-hidden="true">
            <span>‹</span>
            <span>›</span>
            <span>↻</span>
          </span>
          <div className="browser-url" aria-label="Address">
            <span aria-hidden="true">🔒</span>
            <span className="browser-url__text">{display}</span>
          </div>
        </div>
        {item.embed ? (
          <div className="browser-embed" style={item.embedBg ? { background: item.embedBg } : undefined}>
            <iframe
              className="browser-frame"
              src={item.embed}
              title={item.label}
              allow="encrypted-media; clipboard-write; fullscreen"
              loading="lazy"
            />
          </div>
        ) : (
        <div className="browser-page">
          <div className="li-banner" aria-hidden="true" />
          <div className="li-card">
            <span className="li-avatar" aria-hidden="true">
              {author.monogram}
            </span>
            <h3 className="li-name">{author.name}</h3>
            <p className="li-headline">UX/UI Designer · End-to-end digital products</p>
            <p className="li-meta">{author.availability}</p>
            <p className="li-about">{about?.preview}</p>
            <a className="li-cta" href={href} target="_blank" rel="noopener noreferrer" data-autofocus>
              Open on {item.label} ↗
            </a>
          </div>
        </div>
        )}
    </Frame>
  );
}
