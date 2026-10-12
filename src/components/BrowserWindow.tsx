import { useId } from 'react';
import type { DockItemData } from '../content/types';
import { author, notes } from '../content/dock';
import { useIsMobile } from '../hooks/hooks';
import { Frame, type FrameProps } from './CaseWindow';


// LinkedIn sends X-Frame-Options/frame-ancestors, so the real site cannot be
// embedded. This window simulates Firefox around a profile card instead.
export function BrowserWindow({ item, f }: { item: DockItemData; f: FrameProps }) {
  const titleId = useId();
  const isMobile = useIsMobile();
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
              aria-label={isMobile ? 'Minimize window' : f.isExpanded ? 'Restore window size' : 'Expand window'}
              onClick={isMobile ? f.onMinimize : f.onToggleExpand}
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
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2 2 8l6 6" />
            </svg>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 2 6 6-6 6" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1M13.5 2v3h-3" />
            </svg>
          </span>
          <button type="button" className="browser-back" aria-label="Back to desktop" onClick={f.onClose}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2 2 8l6 6" />
            </svg>
          </button>
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
