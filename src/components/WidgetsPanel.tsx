import { useEffect, useState } from 'react';
import { IoLaptopOutline } from 'react-icons/io5';

// [TODO] Edit the cities and device levels.
const cities = [
  { name: 'Caracas', tz: 'America/Caracas' },
  { name: 'Bogotá', tz: 'America/Bogota' },
  { name: 'Miami', tz: 'America/New_York' },
  { name: 'Los Angeles', tz: 'America/Los_Angeles' },
];

const devices: { label: string; pct: number; icon: 'laptop' | 'keyboard' | 'mouse' }[] = [
  { label: 'MacBook', pct: 100, icon: 'laptop' },
  { label: 'Keyboard', pct: 75, icon: 'keyboard' },
  { label: 'Mouse', pct: 58, icon: 'mouse' },
];

/** Wall-clock parts of `date` in time zone `tz`. */
function zoned(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  return { y: get('year'), mo: get('month'), d: get('day'), h: get('hour'), m: get('minute'), s: get('second') };
}

const asUtc = (z: ReturnType<typeof zoned>) => Date.UTC(z.y, z.mo - 1, z.d, z.h, z.m, z.s);

function AnalogClock({ h, m, s }: { h: number; m: number; s: number }) {
  const hourA = (h % 12) * 30 + m * 0.5;
  const minA = m * 6 + s * 0.1;
  const secA = s * 6;
  return (
    <svg viewBox="0 0 100 100" className="wclock" aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="#fff" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) * 30 * Math.PI) / 180;
        return (
          <text key={i} x={50 + 38 * Math.sin(a)} y={50 - 38 * Math.cos(a)} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="600" fill="#1c1c1e">
            {i + 1}
          </text>
        );
      })}
      <line x1="50" y1="50" x2="50" y2="29" stroke="#1c1c1e" strokeWidth="4" strokeLinecap="round" transform={`rotate(${hourA} 50 50)`} />
      <line x1="50" y1="50" x2="50" y2="15" stroke="#1c1c1e" strokeWidth="3" strokeLinecap="round" transform={`rotate(${minA} 50 50)`} />
      <g transform={`rotate(${secA} 50 50)`}>
        <line x1="50" y1="58" x2="50" y2="10" stroke="#ff9f0a" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="3" fill="#ff9f0a" />
    </svg>
  );
}

function Ring({ pct, children }: { pct: number; children?: React.ReactNode }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 76 76" className="wring" aria-hidden="true">
      <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
      {pct > 0 && (
        <circle cx="38" cy="38" r={r} fill="none" stroke="#30d158" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(c * pct) / 100} ${c}`} transform="rotate(-90 38 38)" />
      )}
      {children}
    </svg>
  );
}

export function WidgetsPanel() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const local = zoned(now, Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <div className="widgets" role="dialog" aria-label="Widgets">
      <section className="widget widget--clocks" aria-label="World clocks">
        {cities.map((c) => {
          const z = zoned(now, c.tz);
          const diff = Math.round(((asUtc(z) - asUtc(local)) / 3600000) * 2) / 2;
          const day = Math.sign(Date.UTC(z.y, z.mo - 1, z.d) - Date.UTC(local.y, local.mo - 1, local.d));
          return (
            <div key={c.tz} className="wcity">
              <AnalogClock h={z.h} m={z.m} s={z.s} />
              <strong>{c.name}</strong>
              <span>{day < 0 ? 'Yesterday' : day > 0 ? 'Tomorrow' : 'Today'}</span>
              <span>{diff === 0 ? '+0HRS' : `${diff > 0 ? '+' : '−'}${Math.abs(diff)}HRS`}</span>
            </div>
          );
        })}
      </section>
      <section className="widget widget--batteries" aria-label="Batteries">
        {devices.map((d) => (
          <div key={d.label} className="wbat" role="img" aria-label={`${d.label} ${d.pct} %`}>
            <div className="wbat__ring">
              <Ring pct={d.pct} />
              <span className="wbat__icon">
                {d.icon === 'laptop' ? <IoLaptopOutline /> : <img src={`/icons-menubar/${d.icon}.svg`} alt="" draggable={false} />}
              </span>
            </div>
            <span>{d.pct} %</span>
          </div>
        ))}
        <div className="wbat wbat--empty" aria-hidden="true">
          <div className="wbat__ring">
            <Ring pct={0} />
          </div>
        </div>
      </section>
    </div>
  );
}
