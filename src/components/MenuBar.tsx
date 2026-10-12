import { useEffect, useRef, useState } from 'react';
import { IoBluetooth } from 'react-icons/io5';
import { StatusItem } from './StatusPanel';
import { WidgetsPanel } from './WidgetsPanel';
import { author } from '../content/dock';

export function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);
  const date = now.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/\./g, '');
  const hhmm = `${date} ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  return (
    <time className="clock" dateTime={now.toISOString()}>
      {hhmm}
    </time>
  );
}

/** Clock button that slides in the widgets side panel. Closes on outside click / Esc. */
function ClockWidgets() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return (
    <div ref={ref} className="clock-wrap">
      <button type="button" className={`status-item__btn clock-btn${open ? ' is-open' : ''}`} aria-expanded={open} aria-label="Widgets" onClick={() => setOpen((o) => !o)}>
        <Clock />
      </button>
      {open && <WidgetsPanel />}
    </div>
  );
}

function MenuIcon({ name }: { name: 'wifi' | 'wifi-off' | 'keyboard' | 'mouse' | 'airpods' | 'headphones' | 'battery-charging' | 'battery-full' | 'battery-empty' | 'battery-low' | 'search' | 'controls' | 'user' }) {
  return <img className="menu-icon" src={`/icons-menubar/${name}.svg`} alt="" draggable={false} />;
}

const menus = ['Archivo', 'Edición', 'Visualización', 'Ir', 'Ventana', 'Ayuda'];

export function MenuBar({ onSearch, onProfile }: { onHome: () => void; onSearch: () => void; onProfile: () => void }) {
  const [wifiOn, setWifiOn] = useState(true);
  return (
    <header className="menu-bar">
      <div className="menu-bar__left">
        <svg className="menu-bar__apple" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="M16.4 12.6c0-2.600 2.100-3.800 2.200-3.900-1.200-1.800-3.100-2-3.700-2-1.600-.2-3.100.9-3.900.9s-2-.9-3.300-.9c-1.700 0-3.300 1-4.200 2.500-1.800 3.100-.5 7.700 1.300 10.200.9 1.200 1.900 2.600 3.200 2.500 1.300-.1 1.800-.8 3.300-.8s2 .8 3.300.8 2.200-1.200 3.100-2.400c1-1.400 1.400-2.800 1.400-2.900-.1 0-2.700-1-2.700-4zM13.900 5c.7-.9 1.200-2 1-3.200-1 0-2.300.7-3 1.600-.7.800-1.200 2-1 3.100 1.100.1 2.300-.6 3-1.500z" />
        </svg>
        <button type="button" className="menu-bar__app" aria-label={`${author.name}, website`} onClick={onProfile}>
          {author.name}
        </button>
        <nav className="menu-bar__menus" aria-hidden="true">
          {menus.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </nav>
      </div>
      <div className="menu-bar__right">
        <span className="menu-bar__status">
          <StatusItem kind="bluetooth">
            <IoBluetooth className="menu-icon menu-icon--glyph" />
          </StatusItem>
          <button type="button" className="status-item__btn" aria-label="Usuario">
            <MenuIcon name="user" />
          </button>
          <StatusItem kind="battery">
            <MenuIcon name="battery-charging" />
          </StatusItem>
          <StatusItem kind="wifi" on={wifiOn} onToggle={setWifiOn}>
            <MenuIcon name={wifiOn ? 'wifi' : 'wifi-off'} />
          </StatusItem>
          <button type="button" className="status-item__btn" aria-label="Búsqueda Spotlight" onClick={onSearch}>
            <MenuIcon name="search" />
          </button>
          <button type="button" className="status-item__btn" aria-label="Centro de control">
            <MenuIcon name="controls" />
          </button>
        </span>
        <ClockWidgets />
      </div>
    </header>
  );
}
