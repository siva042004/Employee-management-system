import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee, fetchDepartments } from '../store/store';
import Layout from '../components/Layout';
import EmployeeModal from '../components/EmployeeModal';
import toast from 'react-hot-toast';

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(s => s.employees);
  const [modal, setModal] = useState(null); // null | 'add' | {emp}
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const size = 10;

  const load = useCallback(() => {
    dispatch(fetchEmployees({ page, size, search: search || undefined }));
  }, [dispatch, page, search]);

  useEffect(() => { load(); dispatch(fetchDepartments()); }, [load, dispatch]);

  const handleSave = async (form) => {
    try {
      if (form.id) await dispatch(updateEmployee({ id: form.id, data: form })).unwrap();
      else await dispatch(createEmployee(form)).unwrap();
      toast.success(form.id ? 'Employee updated' : 'Employee added');
      setModal(null); load();
    } catch { toast.error('Operation failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    await dispatch(deleteEmployee(id));
    toast.success('Deleted');
  };

  const pages = Math.ceil(total / size);

  return (
    <Layout>
      <div style={s.wrap}>
        <div style={s.topbar}>
          <h1 style={s.h1}>Employees</h1>
          <button style={s.addBtn} onClick={() => setModal('add')}>+ Add Employee</button>
        </div>

        <div style={s.searchWrap}>
          <input style={s.search} placeholder="Search by name, email, department…" value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }} />
        </div>

        <div style={s.tableWrap}>
          {loading ? <div style={s.loading}>Loading…</div> : (
            <table style={s.tbl}>
              <thead>
                <tr>{['Name', 'Email', 'Phone', 'Department', 'Status', 'Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {list.map(e => (
                  <tr key={e.id} style={s.tr}>
                    <td style={s.td}><b style={{ color: '#f1f5f9' }}>{e.firstName} {e.lastName}</b></td>
                    <td style={s.td}>{e.email}</td>
                    <td style={s.td}>{e.phone || '—'}</td>
                    <td style={s.td}>{e.departmentName || '—'}</td>
                    <td style={s.td}><span style={{ ...s.badge, ...statusColor(e.status) }}>{e.status}</span></td>
                    <td style={s.td}>
                      <button style={s.editBtn} onClick={() => setModal(e)}>Edit</button>
                      <button style={s.delBtn} onClick={() => handleDelete(e.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', color: '#475569' }}>No employees found</td></tr>}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 && (
          <div style={s.pagination}>
            <button style={s.pgBtn} onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>‹ Prev</button>
            <span style={{ color: '#64748b', fontSize: 13 }}>Page {page + 1} of {pages}</span>
            <button style={s.pgBtn} onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page >= pages - 1}>Next ›</button>
          </div>
        )}
      </div>

      {modal && <EmployeeModal emp={modal === 'add' ? null : modal} onSave={handleSave} onClose={() => setModal(null)} />}
    </Layout>
  );
}

const statusColor = (s) => ({
  ACTIVE: { background: '#10b98122', color: '#10b981' },
  INACTIVE: { background: '#ef444422', color: '#ef4444' },
  ON_LEAVE: { background: '#f59e0b22', color: '#f59e0b' },
}[s] || {});

const s = {
  wrap: { padding: '40px 32px' },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  h1: { color: '#f1f5f9', fontFamily: "'Georgia',serif", fontSize: 28, fontWeight: 700, margin: 0 },
  addBtn: { background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 },
  searchWrap: { marginBottom: 20 },
  search: { width: '100%', maxWidth: 400, background: '#161b27', border: '1px solid #2a3448', borderRadius: 8, padding: '10px 14px', color: '#f1f5f9', fontSize: 14, outline: 'none', boxSizing: 'border-box' },
  tableWrap: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 12, overflow: 'hidden' },
  tbl: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #2a3448' },
  tr: { borderBottom: '1px solid #1e2535', transition: 'background 0.1s' },
  td: { padding: '13px 16px', color: '#cbd5e1', fontSize: 14 },
  badge: { padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 },
  editBtn: { background: '#1e2535', border: '1px solid #2a3448', borderRadius: 6, padding: '5px 12px', color: '#94a3b8', cursor: 'pointer', fontSize: 12, marginRight: 6 },
  delBtn: { background: '#ef444411', border: '1px solid #ef444433', borderRadius: 6, padding: '5px 12px', color: '#ef4444', cursor: 'pointer', fontSize: 12 },
  loading: { padding: '40px', textAlign: 'center', color: '#64748b' },
  pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 20 },
  pgBtn: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 8, padding: '8px 16px', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }
};
