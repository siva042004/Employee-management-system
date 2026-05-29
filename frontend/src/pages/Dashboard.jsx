import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, fetchDepartments } from '../store/store';
import Layout from '../components/Layout';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list: employees, total } = useSelector(s => s.employees);
  const { list: departments } = useSelector(s => s.departments);

  useEffect(() => {
    dispatch(fetchEmployees({ page: 0, size: 100 }));
    dispatch(fetchDepartments());
  }, [dispatch]);

  const cards = [
    { label: 'Total Employees', value: total, color: '#3b82f6', icon: '👥' },
    { label: 'Departments', value: departments.length, color: '#10b981', icon: '🏢' },
    { label: 'Active', value: employees.filter(e => e.status === 'ACTIVE').length, color: '#6366f1', icon: '✅' },
    { label: 'Avg Salary', value: employees.length ? `$${Math.round(employees.reduce((a, e) => a + (parseFloat(e.salary) || 0), 0) / employees.length).toLocaleString()}` : '—', color: '#f59e0b', icon: '💰' },
  ];

  return (
    <Layout>
      <div style={s.wrap}>
        <h1 style={s.h1}>Dashboard</h1>
        <div style={s.grid}>
          {cards.map(c => (
            <div key={c.label} style={s.card}>
              <div style={{ ...s.dot, background: c.color + '22', color: c.color }}>{c.icon}</div>
              <div style={s.val}>{c.value}</div>
              <div style={s.clabel}>{c.label}</div>
            </div>
          ))}
        </div>

        <h2 style={s.h2}>Recent Employees</h2>
        <div style={s.table}>
          <table style={s.tbl}>
            <thead>
              <tr>{['Name', 'Email', 'Department', 'Status'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {employees.slice(0, 8).map(e => (
                <tr key={e.id} style={s.tr}>
                  <td style={s.td}>{e.firstName} {e.lastName}</td>
                  <td style={s.td}>{e.email}</td>
                  <td style={s.td}>{e.departmentName || '—'}</td>
                  <td style={s.td}><span style={{ ...s.badge, background: e.status === 'ACTIVE' ? '#10b98122' : '#ef444422', color: e.status === 'ACTIVE' ? '#10b981' : '#ef4444' }}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

const s = {
  wrap: { padding: '40px 32px' },
  h1: { color: '#f1f5f9', fontFamily: "'Georgia',serif", fontSize: 28, fontWeight: 700, marginBottom: 28 },
  h2: { color: '#94a3b8', fontSize: 16, fontWeight: 600, margin: '36px 0 16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 },
  card: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 12, padding: '24px 20px' },
  dot: { width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14 },
  val: { color: '#f1f5f9', fontSize: 28, fontWeight: 700, marginBottom: 4 },
  clabel: { color: '#64748b', fontSize: 13 },
  table: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 12, overflow: 'hidden' },
  tbl: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', color: '#64748b', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #2a3448' },
  tr: { borderBottom: '1px solid #1e2535' },
  td: { padding: '12px 16px', color: '#cbd5e1', fontSize: 14 },
  badge: { padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }
};
