import { useEffect, useRef, useState } from 'react';
import type { Project } from '../content/types';
import { author } from '../content/dock';
import { finderTags } from '../content/menus';

interface FolderProps {
  project: Project;
  selected: boolean;
  isMobile: boolean;
  onSelect: () => void;
  onOpen: () => void;
  offset: Offset;
  onMove: (o: Offset) => void;
  onMenu: (x: number, y: number, viaKeyboard: boolean) => void;
  tags: readonly string[];
}

type Offset = { x: number; y: number };
const DRAG_THRESHOLD = 4;
const MENU_BAR_H = 28;

export function ProjectFolder({ project, selected, isMobile, onSelect, onOpen, offset, onMove, onMenu, tags }: FolderProps) {
  const tagged = finderTags.filter((t) => tags.includes(t.id));
  const drag = useRef<{ sx: number; sy: number; base: Offset; rect: DOMRect; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const clamp = (d: Offset, base: Offset, rect: DOMRect): Offset => {
    const dx = Math.min(Math.max(d.x, -rect.left), window.innerWidth - rect.right);
    const dy = Math.min(Math.max(d.y, MENU_BAR_H - rect.top), window.innerHeight - rect.bottom);
    return { x: base.x + dx, y: base.y + dy };
  };

  return (
    <button
      type="button"
      className={`project-folder${selected ? ' is-selected' : ''}`}
      data-folder-id={project.id}
      aria-label={`${project.title}, ${project.category}${tagged.length ? `, tagged ${tagged.map((t) => t.name).join(', ')}` : ''}`}
      aria-pressed={selected}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const rect = e.currentTarget.getBoundingClientRect();
        drag.current = { sx: e.clientX, sy: e.clientY, base: offset, rect, moved: false };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.sx;
        const dy = e.clientY - d.sy;
        if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        d.moved = true;
        onMove(clamp({ x: dx, y: dy }, d.base, d.rect));
      }}
      onPointerUp={() => {
        justDragged.current = !!drag.current?.moved;
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onClick={() => {
        if (justDragged.current) {
          justDragged.current = false;
          onSelect();
          return;
        }
        if (isMobile) onOpen();
        else onSelect();
      }}
      onDoubleClick={() => onOpen()}
      onContextMenu={(e) => {
        if (isMobile) return;
        e.preventDefault();
        e.stopPropagation();
        onSelect();
        onMenu(e.clientX, e.clientY, false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onOpen();
        } else if (!isMobile && (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10'))) {
          e.preventDefault();
          const r = e.currentTarget.getBoundingClientRect();
          onSelect();
          onMenu(r.left + r.width / 2, r.top + r.height / 2, true);
        }
      }}
    >
      <span className="project-folder__icon" aria-hidden="true">
        <img src="/icons-dock/folder.png" alt="" width="64" height="64" draggable={false} />
      </span>
      <span className="project-folder__label" aria-hidden="true">
        <span className="project-folder__title">
          {tagged.length > 0 && (
            <span className="project-folder__tags">
              {tagged.map((t) => (
                <i key={t.id} style={{ background: t.color }} />
              ))}
            </span>
          )}
          {project.title}
        </span>
        <span className="project-folder__category">{project.category}</span>
      </span>
    </button>
  );
}

interface DesktopProps {
  projects: Project[];
  selectedId: string | null;
  isMobile: boolean;
  onSelect: (id: string | null) => void;
  onOpen: (id: string) => void;
  /** Right-click (or the context-menu key) on a folder, or on the empty desktop when id is null. */
  onMenu: (id: string | null, x: number, y: number, viaKeyboard: boolean) => void;
  /** Bumping this puts every folder back in its grid spot (View › Clean Up). */
  cleanUp: number;
  tags: Record<string, readonly string[]>;
}

const STORAGE_KEY = 'folder-offsets';

function loadOffsets(): Record<string, Offset> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function Desktop({ projects, selectedId, isMobile, onSelect, onOpen, onMenu, cleanUp, tags }: DesktopProps) {
  const [offsets, setOffsets] = useState<Record<string, Offset>>(loadOffsets);
  // pull back any folder whose saved position is now off-screen (e.g. after a resize)
  useEffect(() => {
    const fit = () => {
      setOffsets((prev) => {
        let changed = false;
        const next = { ...prev };
        document.querySelectorAll<HTMLElement>('[data-folder-id]').forEach((el) => {
          const id = el.dataset.folderId!;
          const r = el.getBoundingClientRect();
          const o = prev[id] ?? { x: 0, y: 0 };
          const dx = r.left < 0 ? -r.left : Math.min(0, window.innerWidth - r.right);
          const dy = r.top < MENU_BAR_H ? MENU_BAR_H - r.top : Math.min(0, window.innerHeight - r.bottom);
          if (dx !== 0 || dy !== 0) {
            next[id] = { x: o.x + dx, y: o.y + dy };
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  const cleaned = useRef(cleanUp);
  const [tidying, setTidying] = useState(false);
  useEffect(() => {
    if (cleaned.current === cleanUp) return;
    cleaned.current = cleanUp;
    setTidying(true);
    setOffsets({});
    const t = window.setTimeout(() => setTidying(false), 500);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return () => clearTimeout(t);
  }, [cleanUp]);
  const move = (id: string, o: Offset) =>
    setOffsets((prev) => {
      const next = { ...prev, [id]: o };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  return (
    <section
      className={`portfolio-desktop${tidying ? ' is-tidying' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onSelect(null);
      }}
      onContextMenu={(e) => {
        if (isMobile) return;
        e.preventDefault();
        onSelect(null);
        onMenu(null, e.clientX, e.clientY, false);
      }}
    >
      <div className="hero-image" aria-hidden="true" />
      <h1 className="visually-hidden">{author.name}</h1>
      <div className="project-grid" onClick={(e) => e.target === e.currentTarget && onSelect(null)}>
        {projects.map((p) => (
          <ProjectFolder
            key={p.id}
            project={p}
            selected={selectedId === p.id}
            isMobile={isMobile}
            onSelect={() => onSelect(p.id)}
            onOpen={() => onOpen(p.id)}
            offset={offsets[p.id] ?? { x: 0, y: 0 }}
            onMove={(o) => move(p.id, o)}
            onMenu={(x, y, kb) => onMenu(p.id, x, y, kb)}
            tags={tags[p.id] ?? []}
          />
        ))}
      </div>
    </section>
  );
}
