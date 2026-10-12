import { useId, useRef } from 'react';
import type { Project } from '../content/types';
import { useFocusTrap } from '../hooks/hooks';
import { CaseBody } from './CaseNav';

export function MobileCaseView({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useFocusTrap(ref, onClose);

  return (
    <div ref={ref} className="mobile-case" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
      <header className="mobile-case__bar">
        <button type="button" className="mobile-case__back" onClick={onClose} aria-label="Back to desktop">
          <span aria-hidden="true">‹</span> Back
        </button>
        <h2 id={titleId} className="mobile-case__title">
          {project.title}
        </h2>
      </header>
      <CaseBody project={project} scrollRef={scrollRef} />
    </div>
  );
}
