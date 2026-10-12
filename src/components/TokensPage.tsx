const colors = [
  ['--ink', 'Ink'], ['--muted', 'Muted'], ['--system-blue', 'System blue'], ['--menu-bg', 'Menu bg'],
  ['--window-bg', 'Window bg'], ['--surface-dark', 'Surface dark'], ['--accent', 'Accent (violet)'],
  ['--accent-on-dark', 'Accent on dark'], ['--status-green', 'Status green'], ['--tl-close', 'Close'],
  ['--tl-min', 'Minimize'], ['--tl-max', 'Expand'],
];
const type = [
  ['Wordmark', 'var(--fs-wordmark)', 'var(--fw-medium)', 'var(--tr-wordmark)'],
  ['Display', 'var(--fs-display)', 'var(--fw-bold)', 'var(--tr-display)'],
  ['Heading', 'var(--fs-heading)', 'var(--fw-bold)', 'var(--tr-heading)'],
  ['Body', 'var(--fs-body)', 'var(--fw-regular)', '0'],
  ['Eyebrow', 'var(--fs-xs)', 'var(--fw-semibold)', 'var(--tr-eyebrow)'],
] as const;
const radii = [['window', '--radius-window'], ['card', '--radius-card'], ['card-lg', '--radius-card-lg'], ['dock', '--radius-dock'], ['dialog', '--radius-dialog'], ['pill', '--radius-pill']];

const h2 = { margin: '48px 0 16px', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-text)' } as const;

export function TokensPage() {
  return (
    <div data-theme="light" style={{ height: '100vh', overflowY: 'auto', background: 'var(--window-bg)', color: 'var(--ink)', padding: '48px var(--section-pad-x)' }}>
      <h1 style={{ margin: 0, fontSize: 'var(--fs-heading)', letterSpacing: 'var(--tr-heading)' }}>Tokens</h1>
      <h2 style={h2}>Color</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
        {colors.map(([v, n]) => (
          <div key={v}>
            <div style={{ height: 64, background: `var(${v})`, borderRadius: 'var(--radius-card)', border: '0.5px solid var(--hairline)' }} />
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>{n}</div>
            <code style={{ fontSize: 11, color: 'var(--muted)' }}>{v}</code>
          </div>
        ))}
      </div>
      <h2 style={h2}>Type</h2>
      {type.map(([n, fs, fw, tr]) => (
        <div key={n} style={{ display: 'flex', alignItems: 'baseline', gap: 24, borderTop: '0.5px solid var(--hairline)', padding: '12px 0' }}>
          <code style={{ width: 90, fontSize: 11, color: 'var(--muted)', flex: 'none' }}>{n}</code>
          <span style={{ fontSize: fs, fontWeight: fw, letterSpacing: tr, lineHeight: 1 }}>Aa Design</span>
        </div>
      ))}
      <h2 style={h2}>Radii</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {radii.map(([n, v]) => (
          <div key={v} style={{ textAlign: 'center' }}>
            <div style={{ width: 96, height: 64, background: 'var(--surface)', border: '0.5px solid var(--hairline)', borderRadius: `var(${v})`, boxShadow: 'var(--shadow-card)' }} />
            <code style={{ fontSize: 11, color: 'var(--muted)' }}>{n}</code>
          </div>
        ))}
      </div>
      <h2 style={h2}>Window shadow</h2>
      <div style={{ width: 280, height: 120, background: 'var(--window-bg)', borderRadius: 'var(--radius-window)', boxShadow: 'var(--shadow-window)' }} />
      <h2 style={h2}>Dark theme accent</h2>
      <div data-theme="dark" style={{ background: 'var(--window-bg)', color: 'var(--ink)', padding: 24, borderRadius: 'var(--radius-card)' }}>
        <span style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: 12, letterSpacing: '0.12em' }}>01 / OVERVIEW</span>
      </div>
    </div>
  );
}
