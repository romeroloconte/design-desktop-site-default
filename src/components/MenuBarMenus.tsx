import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type Ref } from 'react';
import { LuCheck, LuChevronRight, LuGlobe, LuMic, LuPlus, LuSearch, LuX } from 'react-icons/lu';
import { finderMenus, finderTags, type Menu, type MenuAction, type MenuEntry } from '../content/menus';

type Item = Extract<MenuEntry, { label: string }>;
const isItem = (e: MenuEntry): e is Item => e.type === undefined || e.type === 'item';
const isEnabled = (e: MenuEntry) => isItem(e) && !e.disabled;

/** Handlers for menu items with an `action`; an item whose handler is missing shows as disabled. */
export type MenuActions = Partial<Record<MenuAction, () => void>>;
const ActionsContext = createContext<MenuActions>({});

/** The selected folder's colour tags; without it the tags row is decorative. */
export type TagControl = { on: readonly string[]; toggle: (id: string) => void };
const TagsContext = createContext<TagControl | undefined>(undefined);

const BLINK_MS = 180; // macOS flashes the picked item before the menu fades
const FADE_MS = 140;
const SUBMENU_DELAY = 110; // forgiving diagonal travel into a submenu

function Shortcut({ keys }: { keys: string }) {
  const parts = keys.split(/(\{globe\}|\{mic\})/).filter(Boolean);
  return (
    <span className="mmenu__shortcut" aria-hidden="true">
      {parts.map((p, i) =>
        p === '{globe}' ? <LuGlobe key={i} className="mmenu__glyph" /> : p === '{mic}' ? <LuMic key={i} className="mmenu__glyph" /> : <span key={i}>{p}</span>,
      )}
    </span>
  );
}

type ListHandle = { focusFirst: () => void };

type ListProps = {
  items: MenuEntry[];
  level: number;
  style?: CSSProperties;
  onPick: (item: Item) => void;
  onCloseSelf: () => void;
  onCloseAll: () => void;
  onSwitch?: (dir: 1 | -1) => void;
  autoFocus?: boolean;
  initialActive?: number;
  empty?: string;
  head?: ReactNode;
  handle?: Ref<ListHandle>;
};

function MenuList({ items, level, style, onPick, onCloseSelf, onCloseAll, onSwitch, autoFocus = true, initialActive = -1, empty, head, handle }: ListProps) {
  const actions = useContext(ActionsContext);
  const tags = useContext(TagsContext);
  const isOff = (e: MenuEntry) => (e.type === 'tags' ? !tags : !isItem(e) || !!e.disabled || (e.action !== undefined && !actions[e.action]));
  const isOn = (e: MenuEntry) => !isOff(e);
  const [active, setActive] = useState(initialActive);
  const [tagIdx, setTagIdx] = useState(items[initialActive]?.type === 'tags' ? 0 : -1);
  const [sub, setSub] = useState<{ index: number; top: number; keyboard: boolean } | null>(null);
  const [blink, setBlink] = useState(-1);
  const [flip, setFlip] = useState<{ x: boolean; dy: number }>({ x: false, dy: 0 });
  const popRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  const hasIcons = items.some((e) => isItem(e) && e.icon);
  const hasChecks = items.some((e) => isItem(e) && e.checked);

  useEffect(() => {
    if (autoFocus) listRef.current?.focus({ preventScroll: true });
    return () => clearTimeout(timer.current);
  }, [autoFocus]);

  useEffect(() => {
    if (!handle) return;
    const h: ListHandle = {
      focusFirst: () => {
        listRef.current?.focus({ preventScroll: true });
        setActive(items.findIndex(isEnabled));
      },
    };
    if (typeof handle === 'function') handle(h);
    else (handle as { current: ListHandle | null }).current = h;
  }, [handle, items]);

  // Keep submenus on screen: flip to the left / nudge up when they overflow.
  useLayoutEffect(() => {
    if (level === 0 || !popRef.current) return;
    const r = popRef.current.getBoundingClientRect();
    setFlip({ x: r.right > window.innerWidth - 6, dy: Math.min(0, window.innerHeight - 6 - r.bottom) });
  }, [level]);

  // Keep the keyboard-highlighted row visible in long, scrolling menus.
  useEffect(() => {
    if (active < 0) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const openSub = (index: number, keyboard: boolean) => {
    const row = listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    const top = row ? row.offsetTop - (listRef.current?.scrollTop ?? 0) : 0;
    setSub({ index, top, keyboard });
  };

  const toggleTag = (ti: number) => {
    const t = finderTags[ti];
    if (!tags || !t) return;
    tags.toggle(t.id);
    onCloseAll();
  };

  const activate = (index: number, keyboard = false) => {
    const e = items[index];
    if (e?.type === 'tags') return toggleTag(tagIdx);
    if (!e || !isItem(e) || isOff(e) || blink >= 0) return;
    if (e.submenu) {
      clearTimeout(timer.current);
      if (e.submenu.length) openSub(index, keyboard);
      return;
    }
    setBlink(index);
    onPick(e);
  };

  const move = (dir: 1 | -1) => {
    const n = items.length;
    if (!n) return;
    let i = active;
    for (let step = 0; step < n; step++) {
      i = i < 0 ? (dir === 1 ? 0 : n - 1) : (i + dir + n) % n;
      if (isOn(items[i])) {
        setTagIdx(items[i].type === 'tags' ? 0 : -1);
        return setActive(i);
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (sub) return; // the open submenu owns the keyboard
    const cur = items[active];
    if (cur?.type === 'tags' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      const n = finderTags.length;
      setTagIdx((t) => (Math.max(t, 0) + (e.key === 'ArrowRight' ? 1 : n - 1)) % n);
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    switch (e.key) {
      case 'ArrowDown': move(1); break;
      case 'ArrowUp': move(-1); break;
      case 'ArrowRight':
        if (cur && isItem(cur) && cur.submenu?.length && !isOff(cur)) openSub(active, true);
        else onSwitch?.(1);
        break;
      case 'ArrowLeft':
        if (level > 0) onCloseSelf();
        else onSwitch?.(-1);
        break;
      case 'Enter': case ' ': if (active >= 0) activate(active, true); break;
      case 'Escape': if (level > 0) onCloseSelf(); else onCloseAll(); break;
      case 'Tab': onCloseAll(); return;
      default: return;
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const hover = (i: number) => {
    const e = items[i];
    setActive(isOn(e) ? i : -1);
    clearTimeout(timer.current);
    const wantsSub = isItem(e) && !isOff(e) && !!e.submenu?.length;
    if (sub?.index === i) return;
    timer.current = window.setTimeout(() => (wantsSub ? openSub(i, false) : setSub(null)), SUBMENU_DELAY);
  };

  const subItem = sub ? items[sub.index] : null;
  // Like Finder, the row under the tags names what a click on the hovered colour will do.
  const hovered = tags && items[active]?.type === 'tags' ? finderTags[tagIdx] : undefined;
  const tagHint = hovered ? `${tags!.on.includes(hovered.id) ? 'Remove' : 'Add'} “${hovered.name}”` : null;
  const cls = ['mmenu', level > 0 && 'mmenu--sub', hasIcons && 'has-icons', hasChecks && 'has-checks', blink >= 0 && 'is-picking'].filter(Boolean).join(' ');

  return (
    <div
      className={`mmenu-wrap${level > 0 ? ' mmenu-wrap--sub' : ''}`}
      style={{ ...style, ...(flip.x ? { left: 'auto', right: 'calc(100% - 6px)' } : null), ...(level > 0 ? { marginTop: `calc(-1 * var(--mmenu-pad) + ${flip.dy}px)` } : null) }}
      onMouseEnter={() => clearTimeout(timer.current)}
    >
     <div ref={popRef} className={cls}>
      {head}
      <div
        ref={listRef}
        className="mmenu__list"
        role="menu"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        onMouseLeave={() => {
          clearTimeout(timer.current);
          if (!sub) setActive(-1);
        }}
      >
        {items.length === 0 && empty && <div className="mmenu__empty">{empty}</div>}
        {items.map((e, i) => {
          if (e.type === 'sep') return <div key={i} className="mmenu__sep" role="separator" />;
          if (e.type === 'tags')
            return (
              <div
                key={i}
                data-index={i}
                className={`mmenu__tags${tags ? ' is-live' : ''}`}
                role={tags ? 'group' : undefined}
                aria-label={tags ? 'Tags' : undefined}
                aria-hidden={tags ? undefined : true}
                onMouseEnter={() => hover(i)}
              >
                {finderTags.map((t, ti) => {
                  const on = !!tags?.on.includes(t.id);
                  const focus = !!tags && active === i && tagIdx === ti;
                  return (
                    <span
                      key={t.id}
                      role={tags ? 'menuitemcheckbox' : undefined}
                      aria-checked={tags ? on : undefined}
                      aria-label={tags ? t.name : undefined}
                      className={`mmenu__tag${on ? ' is-on' : ''}${focus ? ' is-focus' : ''}`}
                      style={{ '--tag': t.color } as CSSProperties}
                      onMouseEnter={() => tags && setTagIdx(ti)}
                      onMouseUp={(ev) => {
                        if (!tags || ev.button !== 0) return;
                        ev.stopPropagation();
                        toggleTag(ti);
                      }}
                    >
                      {focus && (on ? <LuX className="mmenu__tag-glyph" aria-hidden="true" /> : <LuPlus className="mmenu__tag-glyph" aria-hidden="true" />)}
                    </span>
                  );
                })}
              </div>
            );
          const Icon = e.icon;
          const off = isOff(e);
          const hint = tagHint && items[i - 1]?.type === 'tags' ? tagHint : null;
          const isActive = active === i || sub?.index === i;
          return (
            <div
              key={i}
              data-index={i}
              role={e.checked !== undefined ? 'menuitemcheckbox' : 'menuitem'}
              aria-checked={e.checked}
              aria-disabled={off || undefined}
              aria-haspopup={e.submenu ? 'menu' : undefined}
              aria-expanded={e.submenu ? sub?.index === i : undefined}
              className={`mmenu__item${isActive ? ' is-active' : ''}${off ? ' is-disabled' : ''}${blink === i ? ' is-blink' : ''}${hint ? ' is-hint' : ''}`}
              onMouseEnter={() => hover(i)}
              onMouseUp={(ev) => {
                if (ev.button !== 0) return;
                ev.stopPropagation();
                activate(i);
              }}
            >
              {hasChecks && <span className="mmenu__check">{e.checked && <LuCheck />}</span>}
              {hasIcons && <span className="mmenu__icon">{Icon && <Icon />}</span>}
              <span className="mmenu__label">{hint ?? e.label}</span>
              {e.hint && <span className="mmenu__hint">{e.hint}</span>}
              {e.shortcut && <Shortcut keys={e.shortcut} />}
              {e.submenu && <LuChevronRight className="mmenu__chevron" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
     </div>
      {sub && subItem && isItem(subItem) && subItem.submenu && (
        <MenuList
          items={subItem.submenu}
          level={level + 1}
          style={{ top: sub.top }}
          initialActive={sub.keyboard ? subItem.submenu.findIndex(isOn) : -1}
          onPick={onPick}
          onCloseAll={onCloseAll}
          onCloseSelf={() => {
            setSub(null);
            listRef.current?.focus({ preventScroll: true });
          }}
        />
      )}
    </div>
  );
}

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Every leaf item across the Finder menus, tagged with its path, for Help › Search. */
const searchIndex: Item[] = finderMenus.flatMap((m) =>
  m.items.flatMap((e) => {
    if (!isItem(e)) return [];
    if (e.submenu?.length) return e.submenu.filter(isItem).map((s) => ({ ...s, icon: s.icon ?? e.icon, hint: `${m.title} › ${e.label}`, submenu: undefined }));
    return [{ ...e, hint: m.title, submenu: undefined }];
  }),
);

function HelpMenu({ menu, ...rest }: { menu: Menu } & Pick<ListProps, 'onPick' | 'onCloseAll' | 'onSwitch'>) {
  const [q, setQ] = useState('');
  const listHandle = useRef<ListHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus({ preventScroll: true }), []);

  const query = fold(q.trim());
  const results = query ? searchIndex.filter((e) => fold(e.label).includes(query)).slice(0, 12) : [];
  const items: MenuEntry[] = query ? (results.length ? [...results, { type: 'sep' }, ...menu.items] : menu.items) : menu.items;

  return (
    <MenuList
      key={query ? 'q' : 'base'}
      items={items}
      level={0}
      autoFocus={false}
      handle={listHandle}
      onCloseSelf={rest.onCloseAll}
      {...rest}
      head={
        <>
          <label className="mmenu__search">
            <LuSearch aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search"
              aria-label="Search the menus"
              value={q}
              spellCheck={false}
              autoComplete="off"
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); listHandle.current?.focusFirst(); }
                else if (e.key === 'Escape') { e.preventDefault(); if (q) setQ(''); else rest.onCloseAll(); }
                else if (e.key === 'ArrowLeft' && !q) rest.onSwitch?.(-1);
              }}
            />
          </label>
          {query && <div className="mmenu__section">{results.length ? 'Menu Items' : 'No Results'}</div>}
        </>
      }
    />
  );
}

/** Decorative Finder menus in the menu bar: click / press-drag-release, hover-switching and full keyboard support. */
export function MenuBarMenus({ actions = {}, tags }: { actions?: MenuActions; tags?: TagControl }) {
  const [open, setOpen] = useState<number | null>(null);
  const [viaKeyboard, setViaKeyboard] = useState(false);
  const [closing, setClosing] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const titles = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<number[]>([]);

  const close = (refocus = false) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (refocus && open !== null) titles.current[open]?.focus();
    setOpen(null);
    setClosing(false);
  };

  useEffect(() => {
    if (open === null) return;
    const onDown = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && close();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && !e.defaultPrevented && close(true);
    const onBlur = () => close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onBlur);
    window.addEventListener('resize', onBlur);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', onBlur);
    };
  });

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const show = (i: number, keyboard: boolean) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setClosing(false);
    setViaKeyboard(keyboard);
    setOpen(i);
  };

  const pick = (item: Item) => {
    timers.current.push(
      window.setTimeout(() => setClosing(true), BLINK_MS),
      window.setTimeout(() => {
        close();
        if (item.action) actions[item.action]?.();
      }, BLINK_MS + FADE_MS),
    );
  };

  const switchMenu = (dir: 1 | -1) => {
    if (open === null) return;
    const next = (open + dir + finderMenus.length) % finderMenus.length;
    show(next, true);
  };

  return (
    <ActionsContext.Provider value={actions}>
    <TagsContext.Provider value={tags}>
    <nav ref={navRef} className="menu-bar__menus" role="menubar" aria-label="Finder menus">
      {finderMenus.map((m, i) => {
        const isOpen = open === i;
        return (
          <div key={m.title} className="menu-bar__menu-wrap">
            <button
              ref={(el) => { titles.current[i] = el; }}
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              className={`menu-bar__menu${isOpen ? ' is-open' : ''}`}
              tabIndex={i === 0 ? 0 : -1}
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault(); // keep focus handling ours
                if (isOpen) close();
                else show(i, false);
              }}
              onMouseEnter={() => open !== null && !isOpen && show(i, false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); show(i, true); }
                else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  titles.current[(i + (e.key === 'ArrowRight' ? 1 : -1) + finderMenus.length) % finderMenus.length]?.focus();
                }
              }}
            >
              {m.title}
            </button>
            {isOpen && (
              <div className={`menu-bar__drop${closing ? ' is-closing' : ''}`}>
                {m.search ? (
                  <HelpMenu menu={m} onPick={pick} onCloseAll={() => close(true)} onSwitch={switchMenu} />
                ) : (
                  <MenuList
                    key={m.title}
                    items={m.items}
                    level={0}
                    initialActive={viaKeyboard ? m.items.findIndex(isEnabled) : -1}
                    onPick={pick}
                    onCloseSelf={() => close(true)}
                    onCloseAll={() => close(true)}
                    onSwitch={switchMenu}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
    </TagsContext.Provider>
    </ActionsContext.Provider>
  );
}

/** A right-click menu at (x, y): same rows, keyboard support and pick blink as the menu bar. */
export function ContextMenu({ x, y, items, actions, tags, viaKeyboard = false, onClose }: { x: number; y: number; items: MenuEntry[]; actions: MenuActions; tags?: TagControl; viaKeyboard?: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });
  const [closing, setClosing] = useState(false);
  const timers = useRef<number[]>([]);

  // Open toward the free side when the menu would overflow the viewport, like macOS.
  useLayoutEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: x + r.width > window.innerWidth - 6 ? Math.max(6, x - r.width) : x,
      y: y + r.height > window.innerHeight - 6 ? Math.max(6, y - r.height) : y,
    });
  }, [x, y]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && onClose();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', onClose);
    window.addEventListener('resize', onClose);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', onClose);
      window.removeEventListener('resize', onClose);
    };
  }, [onClose]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pick = (item: Item) => {
    timers.current.push(
      window.setTimeout(() => setClosing(true), BLINK_MS),
      window.setTimeout(() => {
        onClose();
        if (item.action) actions[item.action]?.();
      }, BLINK_MS + FADE_MS),
    );
  };

  return (
    <ActionsContext.Provider value={actions}>
    <TagsContext.Provider value={tags}>
      <div ref={ref} className={`context-menu${closing ? ' is-closing' : ''}`} style={{ left: pos.x, top: pos.y }} onContextMenu={(e) => e.preventDefault()}>
        <MenuList items={items} level={0} initialActive={viaKeyboard ? items.findIndex((e) => isItem(e) && !e.disabled && (!e.action || !!actions[e.action])) : -1} onPick={pick} onCloseSelf={onClose} onCloseAll={onClose} />
      </div>
    </TagsContext.Provider>
    </ActionsContext.Provider>
  );
}
