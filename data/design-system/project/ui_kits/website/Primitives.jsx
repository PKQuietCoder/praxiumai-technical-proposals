/* global React */
// Infineon DDS — shared UI primitives (website kit)
const { useState, useEffect, useRef } = React;

// ---- Icon: thin wrapper over Lucide (documented substitution for DDS icons) ----
function Icon({ name, size = 18, stroke = 1.75, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: { width: size, height: size, 'stroke-width': stroke },
        nameAttr: 'data-lucide',
      });
    }
  }, [name, size, stroke]);
  return React.createElement('span', {
    ref, style: { display: 'inline-flex', lineHeight: 0, ...style },
  });
}

// ---- Logo: typographic placeholder wordmark ----
function Logo({ color = 'var(--engineering-blue)', size = 26 }) {
  return (
    <span className="dds-logo" role="img" aria-label="Infineon"
      style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 600,
        letterSpacing: '-0.01em', fontSize: size, lineHeight: 1, color, userSelect: 'none' }}>
      <span style={{ position: 'relative', width: '0.62em', height: '0.62em', marginRight: '0.26em', flex: 'none' }} aria-hidden="true">
        <span style={{ position: 'absolute', bottom: 0, left: '0.04em', width: '0.58em', height: '0.30em',
          borderBottom: '0.13em solid var(--orange)', borderRight: '0.13em solid var(--orange)',
          borderRadius: '0 0 0.6em 0.6em', transform: 'rotate(8deg)' }} />
        <span style={{ position: 'absolute', top: 0, left: 0, width: '0.30em', height: '0.30em',
          borderRadius: '50%', background: 'var(--error)' }} />
      </span>
      Infineon
    </span>
  );
}

// ---- Button ----
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, type, style }) {
  const [hover, setHover] = useState(false);
  const pad = size === 'sm' ? '7px 14px' : size === 'lg' ? '12px 24px' : '10px 20px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 16 : 14;
  const variants = {
    primary: { background: hover ? 'var(--ocean-600)' : 'var(--ocean-400)', color: '#fff', border: '1.5px solid transparent' },
    secondary: { background: hover ? 'var(--ocean-50)' : '#fff', color: 'var(--ocean-600)', border: '1.5px solid var(--ocean-400)' },
    tertiary: { background: 'transparent', color: 'var(--ocean-600)', border: '1.5px solid transparent', textDecoration: hover ? 'underline' : 'none', padding: '8px 6px' },
    inverse: { background: hover ? '#fff' : 'transparent', color: hover ? 'var(--engineering-blue)' : '#fff', border: '1.5px solid #fff' },
    ghost: { background: hover ? 'var(--grey-100)' : 'transparent', color: 'var(--fg-2)', border: '1.5px solid transparent' },
  };
  return (
    <button type={type} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ font: 'var(--label)', fontSize: fs, fontWeight: 600, borderRadius: 'var(--radius-sm)',
        padding: variant === 'tertiary' ? '8px 6px' : pad, cursor: 'pointer', display: 'inline-flex',
        alignItems: 'center', gap: 8, whiteSpace: 'nowrap', transition: 'all var(--duration) var(--ease)',
        fontFamily: 'var(--font-sans)', ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={fs + 3} />}
      {children}
      {iconRight && <Icon name={iconRight} size={fs + 3} />}
    </button>
  );
}

// ---- Badge ----
function Badge({ tone = 'new', children }) {
  const tones = {
    active: { background: 'var(--success-bg)', color: '#067a39' },
    new: { background: 'var(--ocean-50)', color: 'var(--ocean-700)' },
    warn: { background: 'var(--warning-bg)', color: '#9c6200' },
    eol: { background: 'var(--error-bg)', color: '#a30026' },
    neutral: { background: 'var(--grey-100)', color: 'var(--fg-2)' },
  };
  return (
    <span style={{ font: 'var(--caption)', fontWeight: 600, padding: '3px 10px',
      borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', gap: 5, ...tones[tone] }}>
      {children}
    </span>
  );
}

// ---- Image placeholder (use until real Infineon photography is supplied) ----
function ImagePlaceholder({ label = 'Image', tint = 'var(--ocean-300)', icon = 'image', height = '100%', radius = 0 }) {
  return (
    <div style={{ height, width: '100%', borderRadius: radius,
      background: `linear-gradient(135deg, ${tint}, color-mix(in srgb, ${tint} 60%, #06302b))`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.92)', gap: 8 }}>
      <Icon name={icon} size={30} stroke={1.5} />
      <span style={{ font: 'var(--caption)', opacity: 0.85 }}>{label}</span>
    </div>
  );
}

Object.assign(window, { Icon, Logo, Button, Badge, ImagePlaceholder });
