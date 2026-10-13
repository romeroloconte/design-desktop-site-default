import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { initialState, reducer, topWindow, type WindowType } from './state';
import { projects } from './content/projects';
import { dockItems, notes, profileItem } from './content/dock';
import type { DockItemData } from './content/types';
import { useIsMobile } from './hooks/hooks';
import { MenuBar } from './components/MenuBar';
import { Desktop } from './components/Desktop';
import { Dock, type DockTile } from './components/Dock';
import { CaseWindow } from './components/CaseWindow';
import { MobileCaseView } from './components/MobileCaseView';
import { NotesWindow } from './components/NotesWindow';
import { BrowserWindow } from './components/BrowserWindow';
import type { FrameProps } from './components/CaseWindow';
import { SystemDialog } from './components/SystemDialog';
import { Spotlight } from './components/Spotlight';
import { AboutMac } from './components/AboutMac';
import { useAppearance } from './appearance';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMobile = useIsMobile();
  const opener = useRef<HTMLElement | null>(null);
  const [spotlight, setSpotlight] = useState(false);
  const [about, setAbout] = useState(false);
  const [appearance, setAppearance] = useAppearance();

  const openSpotlight = useCallback(() => {
    opener.current = document.activeElement as HTMLElement;
    setSpotlight(true);
  }, []);
  const closeSpotlight = useCallback(() => {
    setSpotlight(false);
    const el = opener.current;
    requestAnimationFrame(() => el?.isConnected && el.focus());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        openSpotlight();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openSpotlight]);

  const wins = state.windows;
  const top = topWindow(wins);

  const open = useCallback(
    (window: { type: WindowType; id: string }) => {
      // Keep the very first opener if windows pile up.
      if (!document.querySelector('[role="dialog"],[role="alertdialog"]')) {
        opener.current = document.activeElement as HTMLElement;
      }
      dispatch({ type: 'open', window, single: isMobile });
    },
    [isMobile],
  );

  const close = useCallback(
    (key: string) => {
      dispatch({ type: 'close', key });
      // Wait for the window to unmount before restoring focus; only when nothing is left open.
      if (wins.length <= 1) {
        const el = opener.current;
        requestAnimationFrame(() => el?.isConnected && el.focus());
      }
    },
    [wins.length],
  );

  // Aim the fly-to-dock animation at the right end of the dock, where minimized tiles appear.
  const minimize = useCallback((key: string) => {
    const el = document.querySelector<HTMLElement>(`[data-win-key="${CSS.escape(key)}"]`);
    const dock = document.querySelector('.dock')?.getBoundingClientRect();
    if (el && dock) {
      const r = el.getBoundingClientRect();
      const vertical = dock.height > dock.width;
      el.style.setProperty('--fly-x', `${(vertical ? dock.left + dock.width / 2 : dock.right - 24) - (r.left + r.width / 2)}px`);
      el.style.setProperty('--fly-y', `${(vertical ? dock.bottom - 24 : dock.top + dock.height / 2) - (r.top + r.height / 2)}px`);
    }
    dispatch({ type: 'minimize', key });
  }, []);

  // Once a minimized window's dock tile exists, re-aim the fly animation at its exact spot.
  const aimed = useRef(new Set<string>());
  useLayoutEffect(() => {
    for (const w of wins) {
      if (!w.minimized) {
        aimed.current.delete(w.key);
        continue;
      }
      if (aimed.current.has(w.key)) continue;
      const key = CSS.escape(w.key);
      const tile = document.querySelector<HTMLElement>(`[data-dock-id="${key}"]`);
      const el = document.querySelector<HTMLElement>(`[data-win-key="${key}"]`);
      if (!tile || !el) continue;
      aimed.current.add(w.key);
      const t = tile.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      el.style.setProperty('--fly-x', `${t.left + t.width / 2 - (r.left + r.width / 2)}px`);
      el.style.setProperty('--fly-y', `${t.top + t.height / 2 - (r.top + r.height / 2)}px`);
    }
  }, [wins]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || spotlight || !top || top.type === 'dialog') return;
      close(top.key);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [spotlight, top, close]);

  const [trashFull, setTrashFull] = useState(true);
  const dockList = dockItems.map((d) => (d.id === 'trash' && !trashFull ? { ...d, icon: '/icons-dock/trash-empty.png', icons: { aqua: '/icons-dock/aqua/trash-empty.png?v=3', classic: '/icons-dock/classic/trash-empty.svg' } } : d));

  const onDock = (item: DockItemData) => {
    if (item.id === 'trash') return setTrashFull(false);
    if (item.kind === 'link' && item.href) {
      if (item.href.startsWith('mailto:')) window.location.href = item.href;
      else window.open(item.href, '_blank', 'noopener,noreferrer');
    } else if (item.kind === 'notes') open({ type: 'notes', id: item.id });
    else if (item.kind === 'browser') open({ type: 'browser', id: item.id });
    else open({ type: 'dialog', id: item.id });
  };

  const tileFor = (w: (typeof wins)[number]): DockTile => {
    if (w.type === 'case') {
      const p = projects.find((x) => x.id === w.id);
      return { key: w.key, label: p?.title ?? 'Case', icon: '/icons-dock/folder.png', thumb: 'case' };
    }
    const d = [...dockItems, profileItem].find((x) => x.id === w.id);
    return { key: w.key, label: d?.label ?? w.id, icon: d?.icon ?? '/icons-dock/folder.png', icons: d?.icons, thumb: d?.kind === 'notes' ? 'notes' : d?.id === 'tool-spotify' ? 'spotify' : d?.kind === 'browser' ? 'browser' : 'generic' };
  };
  const tiles = wins.filter((w) => w.minimized && w.type !== 'dialog').map(tileFor);
  const runningIds = new Set(wins.filter((w) => w.type !== 'case').map((w) => w.id));

  const frame = (w: (typeof wins)[number]): FrameProps => ({
    winKey: w.key,
    slot: w.slot,
    z: w.z,
    minimized: w.minimized,
    isTop: top?.key === w.key,
    isExpanded: w.expanded,
    onClose: () => close(w.key),
    onMinimize: () => minimize(w.key),
    onFocus: () => dispatch({ type: 'focus', key: w.key }),
    onToggleExpand: () => dispatch({ type: 'toggleExpand', key: w.key }),
  });

  return (
    <main className="desktop-shell">
      <MenuBar onApple={() => setAbout(true)} onProfile={() => open({ type: 'browser', id: profileItem.id })} onSearch={() => (spotlight ? closeSpotlight() : openSpotlight())} onHome={() => (top ? close(top.key) : dispatch({ type: 'select', id: null }))} />
      <Desktop
        projects={projects}
        selectedId={state.selectedFolderId}
        isMobile={isMobile}
        onSelect={(id) => dispatch({ type: 'select', id })}
        onOpen={(id) => {
          dispatch({ type: 'select', id });
          open({ type: 'case', id });
        }}
      />
      <Dock
        items={dockList}
        runningIds={runningIds}
        tiles={tiles}
        onActivate={onDock}
        onRestore={(key) => {
          const w = wins.find((x) => x.key === key);
          if (w) open({ type: w.type, id: w.id });
        }}
      />

      {wins.map((w) => {
        if (w.type === 'case') {
          const project = projects.find((p) => p.id === w.id);
          if (!project) return null;
          return isMobile ? (
            <MobileCaseView key={w.key} project={project} onClose={() => close(w.key)} />
          ) : (
            <CaseWindow key={w.key} project={project} f={frame(w)} />
          );
        }
        if (w.type === 'notes') return <NotesWindow key={w.key} notes={notes} f={frame(w)} />;
        if (w.type === 'browser') {
          const item = [...dockItems, profileItem].find((d) => d.id === w.id);
          return item && <BrowserWindow key={w.key} item={item} f={frame(w)} />;
        }
        const item = dockItems.find((d) => d.id === w.id);
        return item && <SystemDialog key={w.key} item={item} onClose={() => close(w.key)} />;
      })}
      {about && <AboutMac current={appearance} onPick={setAppearance} onClose={() => setAbout(false)} />}
      {spotlight && (
        <Spotlight
          projects={projects}
          dockItems={dockItems}
          notes={notes}
          onClose={closeSpotlight}
          onProject={(id) => {
            dispatch({ type: 'select', id });
            open({ type: 'case', id });
          }}
          onDockItem={onDock}
        />
      )}
    </main>
  );
}
