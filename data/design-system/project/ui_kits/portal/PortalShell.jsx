/* global React, Logo, Icon, Button, Badge, FilterSidebar, ProductTable, ROWS */
const { useState: useSh, useMemo: useM, useEffect: useEf } = React;

function PortalAppBar({ query, setQuery }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff', borderBottom: '1px solid var(--border)',
      height: 60, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', boxShadow: 'var(--shadow-1)' }}>
      <Logo size={22} />
      <span style={{ width: 1, height: 24, background: 'var(--border)' }} />
      <span style={{ font: 'var(--label)', color: 'var(--fg-1)' }}>Product Finder</span>
      <div style={{ flex: 1, maxWidth: 420, marginLeft: 12, display: 'flex', alignItems: 'center', gap: 9,
        border: '1.5px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '8px 12px' }}>
        <Icon name="search" size={17} style={{ color: 'var(--fg-3)' }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search part number or product…"
          style={{ border: 0, outline: 0, font: 'var(--body-03)', flex: 1, fontFamily: 'var(--font-sans)' }} />
        {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-3)', display: 'inline-flex' }}><Icon name="x" size={16} /></button>}
      </div>
      <div style={{ flex: 1 }} />
      <button style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-2)', display: 'inline-flex', position: 'relative' }} aria-label="Notifications">
        <Icon name="bell" size={19} />
        <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--error)' }} />
      </button>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ocean-400)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--label)', fontSize: 13 }}>JS</div>
    </header>
  );
}

function PortalApp() {
  const [active, setActive] = useSh([]);
  const [query, setQuery] = useSh('');
  const [selected, setSelected] = useSh([]);
  const [sort, setSort] = useSh('relevance');
  const [open, setOpen] = useSh(null);

  const rows = useM(() => {
    let r = ROWS.filter((x) => {
      const byFilter = active.length === 0 || active.includes(x.market) || active.includes(x.life);
      const byQuery = !query || (x.pn + ' ' + x.name).toLowerCase().includes(query.toLowerCase());
      return byFilter && byQuery;
    });
    if (sort === 'pn') r = [...r].sort((a, b) => a.pn.localeCompare(b.pn));
    if (sort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [active, query, sort]);

  const toggle = (o) => setActive(active.includes(o) ? active.filter((x) => x !== o) : [...active, o]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--grey-50)' }}>
      <PortalAppBar query={query} setQuery={setQuery} />
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <FilterSidebar active={active} toggle={toggle} clear={() => setActive([])} />
        <main style={{ flex: 1, padding: '24px 28px 60px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
            <div>
              <h1 style={{ font: 'var(--display-03)', color: 'var(--fg-1)', margin: '0 0 4px' }}>Products</h1>
              <span style={{ font: 'var(--body-03)', color: 'var(--fg-3)' }}>{rows.length} results
                {active.length > 0 && ` · ${active.length} filter${active.length > 1 ? 's' : ''} applied`}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {selected.length > 0 && <Button variant="secondary" size="sm" icon="git-compare">Compare ({selected.length})</Button>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--body-03)', color: 'var(--fg-3)' }}>
                <span>Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  style={{ border: '1.5px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', font: 'var(--body-03)', fontFamily: 'var(--font-sans)', color: 'var(--fg-1)', background: '#fff' }}>
                  <option value="relevance">Relevance</option>
                  <option value="pn">Part number</option>
                  <option value="name">Product name</option>
                </select>
              </div>
            </div>
          </div>
          {/* active filter chips */}
          {active.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '6px 0 16px' }}>
              {active.map((a) => (
                <span key={a} style={{ font: 'var(--caption)', fontWeight: 600, padding: '5px 8px 5px 12px', borderRadius: 'var(--radius-pill)',
                  background: 'var(--ocean-50)', color: 'var(--ocean-700)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {a}<button onClick={() => toggle(a)} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--ocean-700)', display: 'inline-flex' }}><Icon name="x" size={13} /></button>
                </span>
              ))}
            </div>
          )}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-1)' }}>
            <ProductTable rows={rows} onOpen={setOpen} selected={selected} setSelected={setSelected} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, font: 'var(--body-03)', color: 'var(--fg-3)' }}>
            <span>Showing 1–{rows.length} of {rows.length}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['chevron-left', '1', '2', '3', 'chevron-right'].map((p, i) => (
                <button key={i} style={{ minWidth: 34, height: 34, borderRadius: 'var(--radius-sm)', cursor: 'pointer', font: 'var(--body-03)', fontWeight: 600,
                  border: '1.5px solid var(--border)', background: p === '1' ? 'var(--ocean-400)' : '#fff', color: p === '1' ? '#fff' : 'var(--fg-2)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.startsWith('chevron') ? <Icon name={p} size={16} /> : p}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
      {open && <DetailDrawer r={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function DetailDrawer({ r, onClose }) {
  useEf(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  const label = { new: 'New', active: 'Active', warn: 'NRND', eol: 'End of life' }[r.status];
  const rows = [['Part number', r.pn], ['Market', r.market], ['Voltage', r.v], ['Package', r.pkg],
    ['Lifecycle', label], ['Qualification', 'AEC-Q100'], ['Documents', '3 datasheets · 2 app notes']];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,17,0.45)', zIndex: 70, display: 'flex', justifyContent: 'flex-end' }}>
      <aside onClick={(e) => e.stopPropagation()} style={{ width: 'min(460px,100%)', height: '100%', background: '#fff', boxShadow: 'var(--shadow-3)', overflowY: 'auto' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff' }}>
          <span style={{ font: 'var(--caption)', fontFamily: 'var(--font-mono)', color: 'var(--ocean-700)', fontWeight: 600 }}>{r.pn}</span>
          <button onClick={onClose} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-2)' }}><Icon name="x" size={22} /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <h2 style={{ font: 'var(--display-03)', color: 'var(--fg-1)', margin: 0 }}>{r.name}</h2>
            <Badge tone={r.status}>{label}</Badge>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <Button variant="primary" iconRight="arrow-right">Open product page</Button>
            <Button variant="secondary" icon="download">Datasheet</Button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--grey-100)' }}>
                  <td style={{ font: 'var(--body-03)', color: 'var(--fg-3)', padding: '12px 0', width: '42%' }}>{k}</td>
                  <td style={{ font: 'var(--body-03)', color: 'var(--fg-1)', fontWeight: 600, padding: '12px 0' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { PortalApp });
