import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/store';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/employees', label: 'Employees', icon: '👥' },
  { to: '/departments', label: 'Departments', icon: '🏢' },
];

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <div style={s.root}>
      <aside style={s.sidebar}>
        <div style={s.brand}>
          <div style={s.logo}>EM</div>
          <span style={s.brandName}>EmpManager</span>
        </div>
        <nav style={s.nav}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} style={({ isActive }) => ({ ...s.link, ...(isActive ? s.linkActive : {}) })}>
              <span style={s.icon}>{l.icon}</span> {l.label}
            </NavLink>
          ))}
        </nav>
        <button style={s.logout} onClick={handleLogout}>⎋ Sign Out</button>
      </aside>
      <main style={s.main}>{children}</main>
    </div>
  );
}

const s = {
  root: { display: 'flex', minHeight: '100vh', background: '#0f1117' },
  sidebar: { width: 220, background: '#161b27', borderRight: '1px solid #2a3448', display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'sticky', top: 0, height: '100vh' },
  brand: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 },
  logo: { width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff' },
  brandName: { color: '#f1f5f9', fontWeight: 700, fontSize: 15 },
  nav: { display: 'flex', flexDirection: 'column', gap: 4, flex: 1 },
  link: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, color: '#64748b', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'all 0.15s' },
  linkActive: { background: '#1e2535', color: '#f1f5f9' },
  icon: { fontSize: 16 },
  logout: { background: 'none', border: '1px solid #2a3448', borderRadius: 8, padding: '10px 12px', color: '#64748b', cursor: 'pointer', fontSize: 13, textAlign: 'left' }
};
