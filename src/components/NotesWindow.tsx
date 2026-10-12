import { useId, useState } from 'react';
import type { Note } from '../content/types';
import { Frame, WindowChrome, type FrameProps } from './CaseWindow';

export function NotesWindow({ notes, f }: { notes: Note[]; f: FrameProps }) {
  const titleId = useId();
  const [activeId, setActiveId] = useState<string | undefined>();
  const active = notes.find((n) => n.id === activeId);

  return (
    <Frame f={f} titleId={titleId} className="notes-window">
      <WindowChrome
        title="Notes"
        titleId={titleId}
        isExpanded={f.isExpanded}
        onClose={f.onClose}
        onMinimize={f.onMinimize}
        onToggleExpand={f.onToggleExpand}
      />
      <div className="notes">
        <aside className="notes__sidebar" aria-label="Notes list">
          <p className="notes__count">{notes.length} Notes</p>
          <ul>
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  className={`notes__item${n.id === active?.id ? ' is-active' : ''}`}
                  aria-current={n.id === active?.id ? 'true' : undefined}
                  onClick={() => setActiveId(n.id)}
                >
                  <span className="notes__item-title">{n.title}</span>
                  <span className="notes__item-preview">{n.preview}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <article className="notes__content" data-note={active?.id}>
          {active ? (
            <>
              <h3>{active.title}</h3>
              {active.content.split('\n\n').map((para) => (
                <NoteBlock key={para} text={para} />
              ))}
            </>
          ) : (
            <p className="notes__empty">Select a note</p>
          )}
        </article>
      </div>
    </Frame>
  );
}

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

/** Lines: "# " title, "@ " company, "~ " dates, "+ " extra meta, "• " bullet, otherwise body text. */
function NoteBlock({ text }: { text: string }) {
  const lines = text.split('\n');
  if (lines.length === 1 && !/^[#@~+=•] /.test(text)) {
    return <p><Inline text={text} /></p>;
  }
  return (
    <section className="note-entry">
      {lines.map((line) => {
        const body = line.slice(2);
        if (line.startsWith('# ')) return <h4 key={line} className="note-entry__title">{body}</h4>;
        if (line.startsWith('@ ')) return <p key={line} className="note-entry__org">{body}</p>;
        if (line.startsWith('~ ')) return <p key={line} className="note-entry__dates">{body}</p>;
        if (line.startsWith('+ ') || line.startsWith('= ')) return <p key={line} className="note-entry__meta">{body}</p>;
        if (line.startsWith('• ')) return <p key={line} className="note-entry__bullet"><Inline text={body} /></p>;
        return <p key={line} className="note-entry__text"><Inline text={line} /></p>;
      })}
    </section>
  );
}
