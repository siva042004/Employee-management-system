import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../store/store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(s => s.auth);

  useEffect(() => { if (token) navigate('/dashboard'); }, [token, navigate]);
  useEffect(() => { if (error) { toast.error(error); dispatch(clearError()); } }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logo}>EM</div>
        </div>
        <h1 style={styles.title}>Employee Portal</h1>
        <p style={styles.sub}>Sign in to your account</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="Enter username"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Enter password"
              required
            />
          </div>
          <button style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }} type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={styles.hint}>Default: <b>admin</b> / <b>admin123</b></p>
      </div>
      <div style={styles.bg} />
    </div>
  );
}

const styles = {
  root: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117', position: 'relative', overflow: 'hidden' },
  bg: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a2744 0%, transparent 70%)', pointerEvents: 'none' },
  card: { position: 'relative', zIndex: 1, background: '#161b27', border: '1px solid #2a3448', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 400, boxShadow: '0 24px 64px rgba(0,0,0,0.5)' },
  logoWrap: { display: 'flex', justifyContent: 'center', marginBottom: 20 },
  logo: { width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: 1 },
  title: { textAlign: 'center', color: '#f1f5f9', fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, margin: '0 0 6px' },
  sub: { textAlign: 'center', color: '#64748b', fontSize: 14, margin: '0 0 32px' },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { background: '#1e2535', border: '1px solid #2a3448', borderRadius: 8, padding: '12px 14px', color: '#f1f5f9', fontSize: 14, outline: 'none', transition: 'border-color 0.2s' },
  btn: { marginTop: 8, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: 8, padding: '14px', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'opacity 0.2s' },
  hint: { textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }
};
