import { useEffect, useState, type RefObject } from 'react';
import type { Project } from '../content/types';
import { usePrefersReducedMotion } from '../hooks/hooks';
import { SectionRenderer } from './SectionRenderer';

export function CaseNav({
  nav,
  scrollRef,
}: {
  nav: Project['nav'];
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  const [active, setActive] = useState<string | undefined>(nav[0]?.anchorId);
  const reduced = usePrefersReducedMotion();

  // Scroll-spy: the section crossing the top third of the scroll area is active.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.anchor);
        });
      },
      { root, rootMargin: '0px 0px -66% 0px' },
    );
    root.querySelectorAll('[data-anchor]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scrollRef, nav]);

  const go = (anchorId: string) => {
    const root = scrollRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-anchor="${anchorId}"]`);
    if (!root || !el) return;
    const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 56;
    root.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    setActive(anchorId);
  };

  return (
    <nav className="case-nav" aria-label="Case sections">
      {nav.map((n) => (
        <button
          key={n.anchorId}
          type="button"
          className={`case-nav__item${active === n.anchorId ? ' is-active' : ''}`}
          aria-current={active === n.anchorId ? 'true' : undefined}
          onClick={() => go(n.anchorId)}
        >
          {n.label}
        </button>
      ))}
    </nav>
  );
}

export function CaseBody({ project, scrollRef }: { project: Project; scrollRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="case-body" data-theme={project.theme}>
      <CaseNav nav={project.nav} scrollRef={scrollRef} />
      <div className="case-scroll" ref={scrollRef} tabIndex={-1}>
        {project.sections.map((s, i) => (
          <SectionRenderer key={i} section={s} />
        ))}
      </div>
    </div>
  );
}
