/* global React, Logo, Button, Icon */
const { useState: useStateH } = React;

const NAV = ['Products', 'Applications', 'Markets', 'About Infineon'];

function Header({ onSearch }) {
  const [open, setOpen] = useStateH(false);
  const [search, setSearch] = useStateH(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff',
      borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow-1)' }}>
      {/* utility bar */}
      <div style={{ background: 'var(--grey-50)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 18 }}>
          {['Contact', 'Support', 'EN'].map((t) => (
            <a key={t} href="#" style={{ font: 'var(--caption)', color: 'var(--fg-3)', textDecoration: 'none' }}>{t}</a>
          ))}
        </div>
      </div>
      {/* main bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', gap: 28 }}>
        <a href="#" style={{ textDecoration: 'none' }} aria-label="Infineon home"><Logo /></a>
        <nav className="dds-desktop-nav" style={{ display: 'flex', gap: 22, marginLeft: 8 }}>
          {NAV.map((n) => <NavItem key={n} label={n} />)}
        </nav>
        <div style={{ flex: 1 }} />
        <button onClick={() => { setSearch(true); onSearch && onSearch(); }} aria-label="Search"
          style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-2)', padding: 6, display: 'inline-flex' }}>
          <Icon name="search" size={20} />
        </button>
        <Button variant="secondary" size="sm" icon="user">myInfineon</Button>
        <button className="dds-burger" onClick={() => setOpen(!open)} aria-label="Menu"
          style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-1)', padding: 6, display: 'none' }}>
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>
      {/* mobile drawer */}
      {open && (
        <nav style={{ borderTop: '1px solid var(--border)', padding: '8px 24px 16px' }}>
          {NAV.map((n) => (
            <a key={n} href="#" style={{ display: 'block', padding: '11px 0', font: 'var(--display-05)',
              color: 'var(--fg-1)', textDecoration: 'none', borderBottom: '1px solid var(--grey-100)' }}>{n}</a>
          ))}
        </nav>
      )}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
      <style>{`@media (max-width: 860px){ .dds-desktop-nav{display:none!important;} .dds-burger{display:inline-flex!important;} }`}</style>
    </header>
  );
}

function NavItem({ label }) {
  const [h, setH] = useStateH(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ font: 'var(--label)', fontWeight: 600, color: h ? 'var(--ocean-600)' : 'var(--fg-1)',
        textDecoration: 'none', padding: '21px 0', borderBottom: `2px solid ${h ? 'var(--ocean-400)' : 'transparent'}`,
        display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color var(--duration) var(--ease)' }}>
      {label}<Icon name="chevron-down" size={15} />
    </a>
  );
}

function SearchOverlay({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, top: 0, background: 'rgba(10,14,17,0.45)', zIndex: 60 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', padding: '28px 24px',
        boxShadow: 'var(--shadow-3)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid var(--ocean-400)',
            borderRadius: 'var(--radius-sm)', padding: '12px 14px', boxShadow: 'var(--shadow-focus)' }}>
            <Icon name="search" size={22} style={{ color: 'var(--fg-3)' }} />
            <input autoFocus placeholder="Search products, part numbers, documents…"
              style={{ border: 0, outline: 0, font: 'var(--body-01)', flex: 1, fontFamily: 'var(--font-sans)' }} />
            <button onClick={onClose} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)' }}>
              <Icon name="x" size={22} />
            </button>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ font: 'var(--caption)', color: 'var(--fg-3)', alignSelf: 'center' }}>Popular:</span>
            {['AURIX™', 'CoolSiC™', 'OPTIGA™ Trust', 'PSoC™ 6', 'XENSIV™'].map((t) => (
              <span key={t} style={{ font: 'var(--caption)', fontWeight: 600, padding: '5px 12px',
                borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--border-strong)', color: 'var(--fg-2)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Header });
