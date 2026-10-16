import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { IoBatteryFull, IoBluetooth, IoLockClosed, IoWarning, IoWifi } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';

// [TODO] Replace the placeholder device / network names.
const devices: { name: string; battery?: number; active: boolean; icon?: string }[] = [
  { name: 'Magic Keyboard', battery: 75, active: true, icon: 'keyboard' },
  { name: 'Magic Mouse', battery: 59, active: true, icon: 'mouse' },
  { name: 'AirPods', active: false, icon: 'airpods' },
];

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className="mswitch" onClick={() => onChange(!on)}>
      <span className="mswitch__knob" />
    </button>
  );
}

type Kind = 'bluetooth' | 'wifi' | 'battery';
const labels: Record<Kind, string> = { bluetooth: 'Bluetooth', wifi: 'Wi-Fi', battery: 'Battery' };

function BatteryPanel() {
  return (
    <div className="status-panel" role="dialog" aria-label="Battery">
      <div className="status-panel__head">
        <strong>Battery</strong>
        <span className="status-panel__meta">100 %</span>
      </div>
      <div className="status-panel__text">
        <p>Power Source: Power Adapter</p>
        <p>Battery Is Charged</p>
      </div>
      <div className="status-panel__sep" />
      <p className="status-panel__section"><strong>Energy Mode</strong></p>
      <div className="status-panel__row">
        <span className="status-panel__dot status-panel__dot--flat">
          <img src="/icons-menubar/battery-low.svg" alt="" draggable={false} />
        </span>
        <span className="status-panel__name">Low Power</span>
      </div>
      <div className="status-panel__sep" />
      <p className="status-panel__section">No Apps Using Significant Energy</p>
      <div className="status-panel__sep" />
      <div className="status-panel__foot">Battery Settings…</div>
    </div>
  );
}

function Panel({ kind, on, setOn }: { kind: 'bluetooth' | 'wifi'; on: boolean; setOn: (v: boolean) => void }) {
  const isBt = kind === 'bluetooth';
  return (
    <div className="status-panel" role="dialog" aria-label={isBt ? 'Bluetooth' : 'Wi-Fi'}>
      <div className="status-panel__head">
        <strong>{isBt ? 'Bluetooth' : 'Wi-Fi'}</strong>
        <Switch on={on} onChange={setOn} label={isBt ? 'Bluetooth' : 'Wi-Fi'} />
      </div>
      {isBt ? (
        <>
        <div className="status-panel__sep" />
        <ul className="status-panel__list">
          {devices.map((d) => (
            <li key={d.name} className={on ? '' : 'is-off'}>
              <span className={`status-panel__dot${d.active && on ? ' is-active' : ''}`}>
                {d.icon ? (
                  <img src={`/icons-menubar/${d.icon}.svg`} alt="" draggable={false} />
                ) : (
                  <IoBluetooth aria-hidden="true" />
                )}
              </span>
              <span className="status-panel__name">{d.name}</span>
              {d.battery !== undefined && on && (
                <span className="status-panel__meta">
                  {d.battery} % <IoBatteryFull aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ul>
        </>
      ) : (
        <>
          <div className="status-panel__row status-panel__row--warn">
            <span>Weak Security…</span>
            <IoWarning aria-hidden="true" />
          </div>
          <div className="status-panel__sep" />
          <p className="status-panel__section">Known Network</p>
          <div className={`status-panel__row${on ? '' : ' is-off'}`}>
            <span className={`status-panel__dot${on ? ' is-active' : ''}`}>
              <IoWifi aria-hidden="true" />
            </span>
            <span className="status-panel__name">Home-5G</span>
            <IoLockClosed aria-hidden="true" className="status-panel__meta" />
          </div>
          <div className="status-panel__sep" />
          <div className="status-panel__row status-panel__row--muted">
            <span>Other Networks</span>
            <IoChevronForward aria-hidden="true" />
          </div>
        </>
      )}
      <div className="status-panel__sep" />
      <div className="status-panel__foot">{isBt ? 'Bluetooth Settings…' : 'Wi-Fi Settings…'}</div>
    </div>
  );
}

/** Menu-bar icon that toggles a macOS-style popover. Closes on outside click / Esc. */
export function StatusItem({ kind, children, on, onToggle }: { kind: Kind; children: ReactNode; on?: boolean; onToggle?: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [localOn, setLocalOn] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

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
    <div ref={ref} className="status-item">
      <button
        type="button"
        className={`status-item__btn${open ? ' is-open' : ''}`}
        aria-label={labels[kind]}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {children}
      </button>
      {open && (
        <div id={id}>
          {kind === 'battery' ? <BatteryPanel /> : <Panel kind={kind} on={on ?? localOn} setOn={onToggle ?? setLocalOn} />}
        </div>
      )}
    </div>
  );
}
