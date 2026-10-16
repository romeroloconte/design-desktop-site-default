import { useEffect, useId, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import type { HeroSection, IntroSection, Project } from '../content/types';
import { useFocusTrap } from '../hooks/hooks';
import { MediaBlock } from './SectionRenderer';

const hero = (p: Project) => p.sections.find((s): s is HeroSection => s.type === 'hero');
const intro = (p: Project) => p.sections.find((s): s is IntroSection => s.type === 'intro');
const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/** Finder's Get Info (⌘I): the project's metadata, read from the data it already has. */
export function GetInfo({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(ref, onClose);
  const tags = hero(project)?.tags ?? [];
  const meta = intro(project)?.meta ?? [];
  const general = [
    { label: 'Kind', value: 'Folder' },
    { label: 'Category', value: project.category },
    { label: 'Size', value: `${project.sections.length} sections` },
    { label: 'Where', value: 'Desktop › Portfolio' },
  ];

  return (
    <div className="window-layer window-layer--dialog finder-layer" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="get-info" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="get-info__bar">
          <button type="button" className="tl tl--close" aria-label="Close" onClick={onClose} />
          <span id={titleId} className="get-info__title">{project.title} Info</span>
        </div>
        <div className="get-info__head">
          <img className="get-info__icon" src="/icons-dock/folder.png" alt="" width="40" height="40" draggable={false} />
          <div>
            <strong>{project.title}</strong>
            <span>{project.sections.length} sections</span>
          </div>
        </div>
        <section className="get-info__group">
          <h3>General:</h3>
          <dl>
            {general.map((m) => (
              <div key={m.label}>
                <dt>{m.label}:</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>
        {meta.length > 0 && (
          <section className="get-info__group">
            <h3>More Info:</h3>
            <dl>
              {meta.map((m) => (
                <div key={m.label}>
                  <dt>{titleCase(m.label)}:</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {project.nav.length > 0 && (
          <section className="get-info__group">
            <h3>Contents:</h3>
            <p className="get-info__text">{project.nav.map((n) => n.label).join(', ')}</p>
          </section>
        )}
        {tags.length > 0 && (
          <section className="get-info__group">
            <h3>Tags:</h3>
            <ul className="get-info__tags">
              {tags.map((t, i) => (
                <li key={`${t}-${i}`}>{t}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

/** Quick Look (space): a fast preview of the case's hero, without opening the full window. */
export function QuickLook({ project, onClose, onOpen }: { project: Project; onClose: () => void; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(ref, onClose);
  const h = hero(project);

  // Space toggles Quick Look shut, like in Finder.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' || e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="window-layer window-layer--dialog finder-layer" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="quick-look" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="quick-look__bar">
          <button type="button" className="quick-look__btn" aria-label="Close" onClick={onClose}>
            <LuX aria-hidden="true" />
          </button>
          <span id={titleId} className="quick-look__title">{project.title}</span>
          <button type="button" className="quick-look__open" data-autofocus onClick={onOpen}>
            Open
          </button>
        </div>
        <div className="quick-look__body">
          {h ? (
            <>
              <p className="section__eyebrow">{h.eyebrow}</p>
              <h2 className="quick-look__headline">
                {h.title.split('\n').map((l, i) => (
                  <span key={i} className="section__title-line">{l}</span>
                ))}
              </h2>
              <p className="quick-look__lead">{h.lead}</p>
              {h.tags.length > 0 && (
                <ul className="tags">
                  {h.tags.map((t, i) => (
                    <li key={`${t}-${i}`}>{t}</li>
                  ))}
                </ul>
              )}
              {h.media && <MediaBlock media={h.media} />}
            </>
          ) : (
            <h2 className="quick-look__headline">{project.title}</h2>
          )}
        </div>
      </div>
    </div>
  );
}
