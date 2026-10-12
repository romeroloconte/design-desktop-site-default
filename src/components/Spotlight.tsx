import { useId, useMemo, useRef, useState } from 'react';
import { IoFolderOutline, IoLayersOutline, IoLogoAppleAppstore, IoCopyOutline, IoSearch } from 'react-icons/io5';
import type { DockItemData, Note, Project } from '../content/types';
import { useFocusTrap } from '../hooks/hooks';

type Category = 'apps' | 'folders' | 'links' | 'notes';

interface Result {
  key: string;
  category: Category;
  label: string;
  hint: string;
  run: () => void;
}

const categories: { id: Category; label: string; Icon: typeof IoSearch }[] = [
  { id: 'apps', label: 'Apps', Icon: IoLogoAppleAppstore },
  { id: 'folders', label: 'Proyectos', Icon: IoFolderOutline },
  { id: 'links', label: 'Enlaces', Icon: IoLayersOutline },
  { id: 'notes', label: 'Notas', Icon: IoCopyOutline },
];

interface Props {
  projects: Project[];
  dockItems: DockItemData[];
  notes: Note[];
  onProject: (id: string) => void;
  onDockItem: (item: DockItemData) => void;
  onClose: () => void;
}

export function Spotlight({ projects, dockItems, notes, onProject, onDockItem, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [active, setActive] = useState(0);
  useFocusTrap(ref, onClose);

  const all = useMemo<Result[]>(() => {
    const done = (fn: () => void) => () => fn();
    return [
      ...dockItems
        .filter((d) => d.kind === 'tool')
        .map((d) => ({ key: d.id, category: 'apps' as const, label: d.label, hint: 'Aplicación', run: done(() => onDockItem(d)) })),
      ...projects.map((p) => ({ key: p.id, category: 'folders' as const, label: p.title, hint: p.category, run: done(() => onProject(p.id)) })),
      ...dockItems
        .filter((d) => d.kind === 'link' || d.kind === 'browser')
        .map((d) => ({ key: d.id, category: 'links' as const, label: d.label, hint: 'Enlace', run: done(() => onDockItem(d)) })),
      ...notes.map((n) => ({
        key: n.id,
        category: 'notes' as const,
        label: n.title,
        hint: 'Nota',
        run: done(() => onDockItem(dockItems.find((d) => d.kind === 'notes')!)),
      })),
    ];
  }, [dockItems, projects, notes, onDockItem, onProject]);

  const q = query.trim().toLowerCase();
  const results = q || category ? all.filter((r) => (!category || r.category === category) && r.label.toLowerCase().includes(q)) : [];

  const pick = (r?: Result) => {
    if (!r) return;
    onClose();
    r.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length) setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length);
    } else if (e.key === 'Enter') pick(results[active]);
  };

  return (
    <div className="window-layer window-layer--spotlight" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="spotlight" role="dialog" aria-modal="true" aria-label="Búsqueda Spotlight">
        <div className="spotlight__row">
          <label className="spotlight__field">
            <IoSearch aria-hidden="true" />
            <input
              data-autofocus
              type="text"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
              placeholder="Búsqueda Spotlight"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
            />
          </label>
          {categories.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className="spotlight__cat"
              aria-label={label}
              aria-pressed={category === id}
              title={label}
              onClick={() => {
                setCategory(category === id ? null : id);
                setActive(0);
              }}
            >
              <Icon aria-hidden="true" />
            </button>
          ))}
        </div>
        {results.length > 0 && (
          <ul id={listId} role="listbox" className="spotlight__results">
            {results.map((r, i) => (
              <li
                key={r.key}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className="spotlight__result"
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(r)}
              >
                <span>{r.label}</span>
                <span className="spotlight__hint">{r.hint}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
