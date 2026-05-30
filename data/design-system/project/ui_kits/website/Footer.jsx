/* global React, Logo, Icon, Button, Badge */
const { useEffect: useEffF } = React;

const FOOTER_COLS = [
  { h: 'Products', links: ['Microcontrollers', 'Power', 'Sensors', 'Security', 'Connectivity', 'Memory'] },
  { h: 'Applications', links: ['Automotive', 'Renewables', 'IoT & Edge', 'Data center', 'Mobility'] },
  { h: 'Support', links: ['Product finder', 'Documentation', 'Community', 'Contact', 'Where to buy'] },
  { h: 'Company', links: ['About Infineon', 'Careers', 'Investor relations', 'Newsroom', 'Sustainability'] },
];

function Footer() {
  return (
    <footer style={{ background: 'var(--engineering-blue)', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4,1fr)', gap: 32 }} className="dds-foot-grid">
          <div>
            <Logo color="#fff" size={24} />
            <p style={{ font: 'var(--body-03)', color: 'var(--fg-on-dark-2)', maxWidth: 240, margin: '16px 0 18px' }}>
              Driving decarbonization and digitalization. Together.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['Linkedin', 'globe'], ['YouTube', 'play-circle'], ['Contact', 'at-sign'], ['Feed', 'rss']].map(([label, ic]) => (
                <a key={ic} href="#" aria-label={label} style={{ color: 'var(--fg-on-dark-2)', display: 'inline-flex' }}><Icon name={ic} size={19} /></a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((c) => (
            <div key={c.h}>
              <div style={{ font: 'var(--label)', color: '#fff', marginBottom: 14 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.links.map((l) => (
                  <li key={l}><a href="#" style={{ font: 'var(--body-03)', color: 'var(--fg-on-dark-2)', textDecoration: 'none' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 40, paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ font: 'var(--caption)', color: 'var(--fg-on-dark-2)' }}>© 2026 Infineon Technologies AG. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 18 }}>
            {['Imprint', 'Privacy', 'Terms', 'Cookie settings'].map((l) => (
              <a key={l} href="#" style={{ font: 'var(--caption)', color: 'var(--fg-on-dark-2)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width:860px){ .dds-foot-grid{grid-template-columns:1fr 1fr!important;gap:28px!important;} }`}</style>
    </footer>
  );
}

// ---- Product detail drawer (opens on product card click) ----
function ProductDrawer({ product, onClose }) {
  useEffF(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  if (!product) return null;
  const p = product;
  const rows = [
    ['Category', p.cat], ['Key spec', p.spec], ['Lifecycle', p.status === 'new' ? 'New product' : 'Active'],
    ['Qualification', 'AEC-Q100 / industrial'], ['Availability', 'In production'],
  ];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,17,0.45)', zIndex: 70, display: 'flex', justifyContent: 'flex-end' }}>
      <aside onClick={(e) => e.stopPropagation()} style={{ width: 'min(440px, 100%)', height: '100%', background: '#fff',
        boxShadow: 'var(--shadow-3)', overflowY: 'auto', animation: 'ddsSlide var(--duration) var(--ease)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff' }}>
          <span style={{ font: 'var(--overline)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{p.cat}</span>
          <button onClick={onClose} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-2)' }}><Icon name="x" size={22} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-sm)', background: 'var(--ocean-50)', color: 'var(--ocean-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Icon name={p.icon} size={26} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h2 style={{ font: 'var(--display-03)', color: 'var(--fg-1)', margin: 0 }}>{p.name}</h2>
            <Badge tone={p.status}>{p.status === 'new' ? 'New' : 'Active'}</Badge>
          </div>
          <p style={{ font: 'var(--body-02)', color: 'var(--fg-2)', margin: '0 0 22px' }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 26 }}>
            <Button variant="primary" iconRight="arrow-right">View product</Button>
            <Button variant="secondary" icon="download">Datasheet</Button>
          </div>
          <div style={{ font: 'var(--label)', color: 'var(--fg-1)', marginBottom: 10 }}>Key parameters</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--grey-100)' }}>
                  <td style={{ font: 'var(--body-03)', color: 'var(--fg-3)', padding: '11px 0', width: '45%' }}>{k}</td>
                  <td style={{ font: 'var(--body-03)', color: 'var(--fg-1)', fontWeight: 600, padding: '11px 0' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
      <style>{`@keyframes ddsSlide{from{transform:translateX(24px);opacity:.4}to{transform:none;opacity:1}}`}</style>
    </div>
  );
}

Object.assign(window, { Footer, ProductDrawer });
