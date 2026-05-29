import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', salary: '', nid: '', bankAccount: '', status: 'ACTIVE', departmentId: '' };

export default function EmployeeModal({ emp, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const { list: depts } = useSelector(s => s.departments);

  useEffect(() => { if (emp) setForm({ ...EMPTY, ...emp, departmentId: emp.departmentId || '' }); }, [emp]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => { e.preventDefault(); onSave(form); };

  const fields = [
    { key: 'firstName', label: 'First Name', required: true },
    { key: 'lastName', label: 'Last Name', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'phone', label: 'Phone' },
    { key: 'salary', label: 'Salary', type: 'number' },
    { key: 'nid', label: 'NID (encrypted)' },
    { key: 'bankAccount', label: 'Bank Account (encrypted)' },
  ];

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={s.header}>
          <h2 style={s.title}>{emp?.id ? 'Edit Employee' : 'Add Employee'}</h2>
          <button style={s.close} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.grid}>
            {fields.map(f => (
              <div key={f.key} style={s.field}>
                <label style={s.label}>{f.label}</label>
                <input style={s.input} type={f.type || 'text'} value={form[f.key]} onChange={e => set(f.key, e.target.value)} required={f.required} />
              </div>
            ))}
            <div style={s.field}>
              <label style={s.label}>Department</label>
              <select style={s.input} value={form.departmentId} onChange={e => set('departmentId', e.target.value)}>
                <option value="">— None —</option>
                {depts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Status</label>
              <select style={s.input} value={form.status} onChange={e => set('status', e.target.value)}>
                <option>ACTIVE</option><option>INACTIVE</option><option>ON_LEAVE</option>
              </select>
            </div>
          </div>
          <div style={s.actions}>
            <button type="button" style={s.cancel} onClick={onClose}>Cancel</button>
            <button type="submit" style={s.save}>Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, backdropFilter: 'blur(4px)' },
  modal: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 16, padding: '28px', width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { color: '#f1f5f9', fontSize: 18, fontWeight: 700, margin: 0 },
  close: { background: 'none', border: 'none', color: '#64748b', fontSize: 18, cursor: 'pointer' },
  form: {},
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { background: '#1e2535', border: '1px solid #2a3448', borderRadius: 8, padding: '10px 12px', color: '#f1f5f9', fontSize: 14, outline: 'none' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
  cancel: { background: 'none', border: '1px solid #2a3448', borderRadius: 8, padding: '10px 20px', color: '#94a3b8', cursor: 'pointer', fontSize: 14 },
  save: { background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: 8, padding: '10px 24px', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }
};
