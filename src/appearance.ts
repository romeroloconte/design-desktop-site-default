import { useEffect, useState } from 'react';

export type Appearance = 'tahoe' | 'aqua' | 'classic';

export const appearances: { id: Appearance; name: string; era: string; blurb: string }[] = [
  // chronological order; Tahoe stays the default selection
  { id: 'classic', name: 'Classic', era: 'Mac OS 9', blurb: 'Platinum: flat, crisp and pixel-perfect.' },
  { id: 'aqua', name: 'Aqua', era: 'Mac OS X 10.4', blurb: 'Glossy gel, pinstripes and glass buttons.' },
  { id: 'tahoe', name: 'Tahoe', era: 'macOS 26', blurb: 'Liquid Glass: translucent and rounded.' },
];

const KEY = 'appearance';
const isAppearance = (v: unknown): v is Appearance => appearances.some((a) => a.id === v);

function read(): Appearance {
  try {
    const v = localStorage.getItem(KEY);
    if (isAppearance(v)) return v;
  } catch {
    /* ignore */
  }
  return 'tahoe';
}

const apply = (a: Appearance) => document.documentElement.setAttribute('data-appearance', a);
apply(read()); // before first paint, so there is no flash of the default look

export function useAppearance(): [Appearance, (a: Appearance) => void] {
  const [current, setCurrent] = useState<Appearance>(read);
  useEffect(() => apply(current), [current]);
  const set = (a: Appearance) => {
    setCurrent(a);
    try {
      localStorage.setItem(KEY, a);
    } catch {
      /* ignore */
    }
  };
  return [current, set];
}
