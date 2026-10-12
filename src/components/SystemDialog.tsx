import { useId, useRef } from 'react';
import type { DockItemData } from '../content/types';
import { useFocusTrap } from '../hooks/hooks';

export function SystemDialog({ item, onClose }: { item: DockItemData; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  useFocusTrap(ref, onClose);
  if (!item.dialog) return null;

  return (
    <div className="window-layer window-layer--dialog">
      <div
        ref={ref}
        className="system-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
      >
        <div className="system-dialog__bar">
          <button type="button" className="tl tl--close" aria-label="Close" onClick={onClose} />
          <span className="system-dialog__app" aria-hidden="true">
            {item.label}
          </span>
        </div>
        <span className="system-dialog__icon" aria-hidden="true">
          {item.icon.startsWith('/') ? <img src={item.icon} alt="" draggable={false} /> : item.icon}
        </span>
        <h2 id={titleId} className="system-dialog__title">
          {item.dialog.title}
        </h2>
        <p id={descId} className="system-dialog__body">
          {item.dialog.body}
        </p>
        <button type="button" className="system-dialog__cta" data-autofocus onClick={onClose}>
          {item.dialog.cta}
        </button>
      </div>
    </div>
  );
}
