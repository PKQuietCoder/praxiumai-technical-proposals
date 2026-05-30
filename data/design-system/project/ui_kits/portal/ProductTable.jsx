/* global React, Icon, Badge */
const { useState: useSP, useMemo } = React;

// ---- Dataset (product finder results) ----
const ROWS = [
  { pn: 'TC4D7XADA', name: 'AURIX™ TC4x', market: 'Automotive', v: '—', pkg: 'TQFP-176', life: 'New', status: 'new' },
  { pn: 'IMW65R027M1H', name: 'CoolSiC™ 650 V M1H', market: 'Industrial Power', v: '650 V', pkg: 'TO-247-3', life: 'Active', status: 'active' },
  { pn: 'IPW60R037P7', name: 'CoolMOS™ P7 600 V', market: 'Industrial Power', v: '600 V', pkg: 'TO-247', life: 'Active', status: 'active' },
  { pn: 'SLS32AIA010MH', name: 'OPTIGA™ Trust M', market: 'Security', v: '1.8 V', pkg: 'USON-10', life: 'Active', status: 'active' },
  { pn: 'CY8C6247BZI', name: 'PSoC™ 6 BLE', market: 'Connectivity', v: '3.3 V', pkg: 'BGA-124', life: 'Active', status: 'active' },
  { pn: 'PASCO2V01', name: 'XENSIV™ PAS CO2', market: 'Sensors', v: '3.3 V', pkg: 'SMD-8', life: 'New', status: 'new' },
  { pn: 'IGW40N120H3', name: 'TRENCHSTOP™ IGBT', market: 'Industrial Power', v: '1200 V', pkg: 'TO-247', life: 'NRND', status: 'warn' },
  { pn: 'TLE9263QX', name: 'System basis chip', market: 'Automotive', v: '5 V', pkg: 'VQFN-48', life: 'Active', status: 'active' },
  { pn: 'IGT60R070D1', name: 'CoolGaN™ 600 V', market: 'Industrial Power', v: '600 V', pkg: 'PG-DSO', life: 'Active', status: 'active' },
  { pn: 'CYW43439', name: 'AIROC™ Wi-Fi 4', market: 'Connectivity', v: '3.3 V', pkg: 'WLCSP', life: 'Active', status: 'active' },
  { pn: 'BGT60TR13C', name: 'XENSIV™ 60 GHz radar', market: 'Sensors', v: '1.8 V', pkg: 'VQFN-32', life: 'Active', status: 'active' },
  { pn: 'SAK-TC397XE', name: 'AURIX™ TC3xx', market: 'Automotive', v: '—', pkg: 'BGA-292', life: 'EOL', status: 'eol' },
];

const FILTERS = {
  Market: ['Automotive', 'Industrial Power', 'Connectivity', 'Security', 'Sensors'],
  Lifecycle: ['New', 'Active', 'NRND', 'EOL'],
};

function FilterSidebar({ active, toggle, clear }) {
  return (
    <aside style={{ width: 248, flex: 'none', borderRight: '1px solid var(--border)', padding: '20px 20px 40px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ font: 'var(--label)', color: 'var(--fg-1)', display: 'inline-flex', gap: 7, alignItems: 'center' }}>
          <Icon name="sliders-horizontal" size={16} /> Filters
        </span>
        <button onClick={clear} style={{ font: 'var(--caption)', color: 'var(--ocean-600)', background: 'none', border: 0, cursor: 'pointer', fontWeight: 600 }}>Clear</button>
      </div>
      {Object.entries(FILTERS).map(([group, opts]) => (
        <div key={group} style={{ borderTop: '1px solid var(--grey-100)', padding: '14px 0' }}>
          <div style={{ font: 'var(--overline)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 10 }}>{group}</div>
          {opts.map((o) => {
            const on = active.includes(o);
            return (
              <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer', font: 'var(--body-03)', color: 'var(--fg-1)' }}>
                <span onClick={() => toggle(o)} style={{ width: 18, height: 18, borderRadius: 3, flex: 'none',
                  border: `1.5px solid ${on ? 'var(--ocean-400)' : 'var(--border-strong)'}`, background: on ? 'var(--ocean-400)' : '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all var(--duration) var(--ease)' }}>
                  {on && <Icon name="check" size={13} stroke={3} />}
                </span>
                {o}
              </label>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

function ProductTable({ rows, onOpen, selected, setSelected }) {
  const cols = ['', 'Part number', 'Product', 'Market', 'Voltage', 'Package', 'Lifecycle', ''];
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--body-03)' }}>
      <thead>
        <tr style={{ borderBottom: '1.5px solid var(--border-strong)' }}>
          {cols.map((c, i) => (
            <th key={i} style={{ textAlign: 'left', font: 'var(--caption)', fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '.05em', color: 'var(--fg-3)', padding: '11px 14px', whiteSpace: 'nowrap' }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => <Row key={r.pn} r={r} onOpen={onOpen} selected={selected} setSelected={setSelected} />)}
        {rows.length === 0 && (
          <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: 'var(--fg-3)' }}>No products match your filters.</td></tr>
        )}
      </tbody>
    </table>
  );
}

function Row({ r, onOpen, selected, setSelected }) {
  const [h, setH] = useSP(false);
  const sel = selected.includes(r.pn);
  const label = { new: 'New', active: 'Active', warn: 'NRND', eol: 'End of life' }[r.status];
  return (
    <tr onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => onOpen(r)}
      style={{ borderBottom: '1px solid var(--grey-100)', background: sel ? 'var(--ocean-50)' : h ? 'var(--grey-50)' : '#fff', cursor: 'pointer', transition: 'background var(--duration-fast) var(--ease)' }}>
      <td style={{ padding: '11px 14px' }} onClick={(e) => { e.stopPropagation(); setSelected(sel ? selected.filter((x) => x !== r.pn) : [...selected, r.pn]); }}>
        <span style={{ width: 18, height: 18, borderRadius: 3, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
          border: `1.5px solid ${sel ? 'var(--ocean-400)' : 'var(--border-strong)'}`, background: sel ? 'var(--ocean-400)' : '#fff', color: '#fff' }}>
          {sel && <Icon name="check" size={13} stroke={3} />}
        </span>
      </td>
      <td style={{ padding: '11px 14px', fontWeight: 600, color: 'var(--ocean-700)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{r.pn}</td>
      <td style={{ padding: '11px 14px', color: 'var(--fg-1)', fontWeight: 600 }}>{r.name}</td>
      <td style={{ padding: '11px 14px', color: 'var(--fg-2)' }}>{r.market}</td>
      <td style={{ padding: '11px 14px', color: 'var(--fg-2)' }}>{r.v}</td>
      <td style={{ padding: '11px 14px', color: 'var(--fg-2)' }}>{r.pkg}</td>
      <td style={{ padding: '11px 14px' }}><Badge tone={r.status}>{label}</Badge></td>
      <td style={{ padding: '11px 14px', color: h ? 'var(--ocean-600)' : 'var(--grey-300)' }}><Icon name="chevron-right" size={18} /></td>
    </tr>
  );
}

Object.assign(window, { FilterSidebar, ProductTable, ROWS });
