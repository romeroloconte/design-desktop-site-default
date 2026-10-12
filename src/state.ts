export type WindowType = 'case' | 'notes' | 'dialog' | 'browser';

export interface Win {
  key: string; // `${type}:${id}`: one window per thing
  type: WindowType;
  id: string;
  minimized: boolean;
  expanded: boolean;
  slot: number; // cascade offset, fixed at creation
  z: number; // stacking order; the array order never changes so iframes are never remounted
}

export interface State {
  selectedFolderId: string | null;
  windows: Win[];
  nextZ: number;
}

export type Action =
  | { type: 'select'; id: string | null }
  | { type: 'open'; window: { type: WindowType; id: string }; single?: boolean }
  | { type: 'close'; key: string }
  | { type: 'minimize'; key: string }
  | { type: 'focus'; key: string }
  | { type: 'toggleExpand'; key: string };

export const initialState: State = { selectedFolderId: null, windows: [], nextZ: 1 };

export const SLOTS = 6;
export const winKey = (type: WindowType, id: string) => `${type}:${id}`;

/** The window the user is interacting with: the highest one that is not minimized. */
export const topWindow = (windows: Win[]) =>
  windows.filter((w) => !w.minimized).reduce<Win | undefined>((a, w) => (!a || w.z > a.z ? w : a), undefined);

export function reducer(state: State, action: Action): State {
  const patch = (key: string, p: Partial<Win>) => state.windows.map((w) => (w.key === key ? { ...w, ...p } : w));
  switch (action.type) {
    case 'select':
      return { ...state, selectedFolderId: action.id };
    case 'open': {
      const key = winKey(action.window.type, action.window.id);
      // On phones everything is full-screen, so a new window replaces the others.
      const base = action.single ? state.windows.filter((w) => w.key === key) : state.windows;
      const z = state.nextZ;
      if (base.some((w) => w.key === key)) {
        return { ...state, nextZ: z + 1, windows: base.map((w) => (w.key === key ? { ...w, minimized: false, z } : w)) };
      }
      const used = new Set(base.map((w) => w.slot));
      const slot = Array.from({ length: SLOTS }, (_, i) => i).find((i) => !used.has(i)) ?? base.length % SLOTS;
      return { ...state, nextZ: z + 1, windows: [...base, { ...action.window, key, minimized: false, expanded: false, slot, z }] };
    }
    case 'close':
      return { ...state, windows: state.windows.filter((w) => w.key !== action.key) };
    case 'minimize':
      return { ...state, windows: patch(action.key, { minimized: true }) };
    case 'focus': {
      if (topWindow(state.windows)?.key === action.key) return state;
      return { ...state, nextZ: state.nextZ + 1, windows: patch(action.key, { z: state.nextZ }) };
    }
    case 'toggleExpand':
      return { ...state, windows: state.windows.map((w) => (w.key === action.key ? { ...w, expanded: !w.expanded } : w)) };
  }
}
