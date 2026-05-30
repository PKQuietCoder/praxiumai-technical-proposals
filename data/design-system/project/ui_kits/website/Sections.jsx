/* global React, Button, Icon, Badge, ImagePlaceholder */
const { useState: useS } = React;

const WRAP = { maxWidth: 1280, margin: '0 auto', padding: '0 24px' };

// ---------------------------------------------------------------- Hero
function Hero() {
  return (
    <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ ...WRAP, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48,
        alignItems: 'center', padding: '64px 24px' }} className="dds-hero">
        <div>
          <div style={{ font: 'var(--overline)', letterSpacing: '.08em', textTransform: 'uppercase',
            color: 'var(--ocean-600)' }}>Powering the future</div>
          <h1 style={{ font: 'var(--display-01)', letterSpacing: '-0.01em', color: 'var(--fg-1)', margin: '12px 0 16px' }}>
            Driving decarbonization and digitalization. Together.
          </h1>
          <p style={{ font: 'var(--body-01)', color: 'var(--fg-2)', maxWidth: 520, margin: '0 0 28px' }}>
            We make life easier, safer and greener — with technology that achieves more, consumes
            less and is accessible to everyone. Semiconductors for a better tomorrow.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" iconRight="arrow-right">Find your product</Button>
            <Button variant="secondary" size="lg">Explore solutions</Button>
          </div>
        </div>
        <div style={{ height: 360, borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-2)' }}>
          <ImagePlaceholder label="Hero photography — clean-energy / automotive" tint="var(--ocean-300)" icon="image" />
        </div>
      </div>
      <style>{`@media (max-width:860px){ .dds-hero{grid-template-columns:1fr!important;gap:28px!important;} }`}</style>
    </section>
  );
}

// ---------------------------------------------------------------- Segments
const SEGMENTS = [
  { ov: 'Automotive', t: 'Drive the future of mobility', icon: 'car', tint: 'var(--ocean-400)' },
  { ov: 'Green Industrial Power', t: 'Energy for a sustainable world', icon: 'leaf', tint: 'var(--green)' },
  { ov: 'Power & Sensor Systems', t: 'Efficient power, precise sensing', icon: 'zap', tint: 'var(--orange)' },
  { ov: 'Connected Secure Systems', t: 'Secure, connected everything', icon: 'shield-check', tint: 'var(--berry)' },
];

function Segments() {
  return (
    <section style={{ background: 'var(--grey-50)', padding: '64px 0' }}>
      <div style={WRAP}>
        <h2 style={{ font: 'var(--display-02)', color: 'var(--fg-1)', margin: '0 0 6px' }}>Explore our segments</h2>
        <p style={{ font: 'var(--body-02)', color: 'var(--fg-2)', margin: '0 0 28px' }}>Four businesses, one mission.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="dds-seg-grid">
          {SEGMENTS.map((s) => <SegmentCard key={s.ov} {...s} />)}
        </div>
      </div>
      <style>{`@media (max-width:980px){ .dds-seg-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media (max-width:560px){ .dds-seg-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}

function SegmentCard({ ov, t, icon, tint }) {
  const [h, setH] = useS(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', textDecoration: 'none', boxShadow: h ? 'var(--shadow-2)' : 'var(--shadow-1)',
        transform: h ? 'translateY(-2px)' : 'none', transition: 'all var(--duration) var(--ease)', display: 'block' }}>
      <div style={{ height: 96, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <Icon name={icon} size={32} stroke={1.5} />
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ font: 'var(--overline)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>{ov}</div>
        <div style={{ font: 'var(--display-05)', color: 'var(--fg-1)', margin: '6px 0 12px' }}>{t}</div>
        <span style={{ font: 'var(--label)', color: 'var(--ocean-600)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          Learn more <Icon name="arrow-right" size={15} />
        </span>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------- Product finder (interactive filter)
const PRODUCTS = [
  { name: 'AURIX™ TC4x', cat: 'Automotive', desc: '32-bit microcontrollers for ADAS, e-mobility and connectivity.', spec: 'TriCore™ · up to 6 cores', status: 'new', icon: 'cpu' },
  { name: 'CoolSiC™ MOSFET 650 V', cat: 'Industrial Power', desc: 'Silicon-carbide for efficient power conversion.', spec: '650 V · TO-247', status: 'active', icon: 'zap' },
  { name: 'OPTIGA™ Trust M', cat: 'Security', desc: 'Turnkey security solution for IoT devices.', spec: 'Common Criteria EAL6+', status: 'active', icon: 'shield-check' },
  { name: 'PSoC™ 6', cat: 'Connectivity', desc: 'Ultra-low-power dual-core MCU for IoT.', spec: 'Arm® Cortex®-M4/M0+', status: 'active', icon: 'radio' },
  { name: 'XENSIV™ PAS CO2', cat: 'Sensors', desc: 'Real CO₂ sensor for air-quality monitoring.', spec: 'Photoacoustic · 14×14 mm', status: 'new', icon: 'activity' },
  { name: 'CoolGaN™ 600 V', cat: 'Industrial Power', desc: 'Gallium-nitride for high-density power supplies.', spec: '600 V · integrated driver', status: 'active', icon: 'zap' },
  { name: 'TRAVEO™ T2G', cat: 'Automotive', desc: 'Body & cluster microcontrollers with HMI support.', spec: 'Arm® Cortex®-M7', status: 'active', icon: 'cpu' },
  { name: 'EZ-USB™ FX10', cat: 'Connectivity', desc: 'High-speed USB peripheral controller.', spec: 'USB 3.2 · 10 Gbps', status: 'new', icon: 'radio' },
];
const FILTERS = ['All', 'Automotive', 'Industrial Power', 'Connectivity', 'Security', 'Sensors'];

function ProductFinder({ onOpen }) {
  const [filter, setFilter] = useS('All');
  const list = filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
  return (
    <section style={{ background: '#fff', padding: '64px 0' }}>
      <div style={WRAP}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ font: 'var(--display-02)', color: 'var(--fg-1)', margin: '0 0 6px' }}>Product highlights</h2>
            <p style={{ font: 'var(--body-02)', color: 'var(--fg-2)', margin: 0 }}>Filter the portfolio by market.</p>
          </div>
          <Button variant="tertiary" iconRight="arrow-right">Open product finder</Button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '22px 0 26px' }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ font: 'var(--caption)', fontWeight: 600, padding: '7px 14px', borderRadius: 'var(--radius-pill)',
                cursor: 'pointer', transition: 'all var(--duration) var(--ease)',
                border: `1.5px solid ${filter === f ? 'var(--ocean-400)' : 'var(--border-strong)'}`,
                background: filter === f ? 'var(--ocean-400)' : '#fff', color: filter === f ? '#fff' : 'var(--fg-2)' }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="dds-prod-grid">
          {list.map((p) => <ProductCard key={p.name} p={p} onOpen={onOpen} />)}
        </div>
      </div>
      <style>{`@media (max-width:1040px){ .dds-prod-grid{grid-template-columns:repeat(2,1fr)!important;} }
        @media (max-width:560px){ .dds-prod-grid{grid-template-columns:1fr!important;} }`}</style>
    </section>
  );
}

function ProductCard({ p, onOpen }) {
  const [h, setH] = useS(false);
  return (
    <div onClick={() => onOpen(p)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
        padding: '18px 18px 20px', cursor: 'pointer', boxShadow: h ? 'var(--shadow-2)' : 'none',
        display: 'flex', flexDirection: 'column',
        transform: h ? 'translateY(-2px)' : 'none', transition: 'all var(--duration) var(--ease)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--ocean-50)',
          color: 'var(--ocean-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={p.icon} size={20} />
        </div>
        <Badge tone={p.status}>{p.status === 'new' ? 'New' : 'Active'}</Badge>
      </div>
      <div style={{ font: 'var(--overline)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 14 }}>{p.cat}</div>
      <h3 style={{ font: 'var(--display-05)', color: h ? 'var(--ocean-700)' : 'var(--fg-1)', margin: '4px 0 6px' }}>{p.name}</h3>
      <p style={{ font: 'var(--body-03)', color: 'var(--fg-2)', margin: '0 0 12px', flex: 1 }}>{p.desc}</p>
      <div style={{ font: 'var(--caption)', color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="settings-2" size={13} />{p.spec}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Inverse highlight banner
function Highlight() {
  return (
    <section style={{ background: 'var(--engineering-blue)', color: '#fff' }}>
      <div style={{ ...WRAP, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', padding: '64px 24px' }} className="dds-hero">
        <div style={{ height: 280, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <ImagePlaceholder label="Application imagery" tint="var(--ocean-400)" icon="factory" />
        </div>
        <div>
          <div style={{ font: 'var(--overline)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ocean-200)' }}>Sustainability</div>
          <h2 style={{ font: 'var(--display-02)', margin: '12px 0 14px' }}>Every watt counts</h2>
          <p style={{ font: 'var(--body-01)', color: 'var(--fg-on-dark-2)', maxWidth: 480, margin: '0 0 26px' }}>
            Our power semiconductors save more energy than is needed to produce them — many times over.
            That's efficiency you can build a cleaner grid on.
          </p>
          <Button variant="inverse" size="lg" iconRight="arrow-right">Read the story</Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Newsroom
const NEWS = [
  { tag: 'Press release', date: '21 May 2026', title: 'Infineon expands SiC capacity to meet EV demand' },
  { tag: 'Newsroom', date: '14 May 2026', title: 'New AURIX™ generation accelerates software-defined vehicles' },
  { tag: 'Investor', date: '07 May 2026', title: 'Q2 FY26 results: revenue growth across all segments' },
];

function Newsroom() {
  return (
    <section style={{ background: 'var(--grey-50)', padding: '64px 0' }}>
      <div style={WRAP}>
        <h2 style={{ font: 'var(--display-02)', color: 'var(--fg-1)', margin: '0 0 28px' }}>Latest from the newsroom</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="dds-seg-grid">
          {NEWS.map((n) => <NewsCard key={n.title} {...n} />)}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ tag, date, title }) {
  const [h, setH] = useS(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
        textDecoration: 'none', boxShadow: h ? 'var(--shadow-2)' : 'var(--shadow-1)', transition: 'all var(--duration) var(--ease)' }}>
      <div style={{ height: 140 }}><ImagePlaceholder label="" tint="var(--ocean-200)" icon="newspaper" /></div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ font: 'var(--overline)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ocean-600)' }}>{tag}</span>
          <span style={{ font: 'var(--caption)', color: 'var(--fg-3)' }}>· {date}</span>
        </div>
        <div style={{ font: 'var(--display-05)', color: h ? 'var(--ocean-700)' : 'var(--fg-1)', textWrap: 'pretty' }}>{title}</div>
      </div>
    </a>
  );
}

Object.assign(window, { Hero, Segments, ProductFinder, Highlight, Newsroom });
