import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, createDepartment, deleteDepartment } from '../store/store';
import { departmentService } from '../services/api';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

export default function DepartmentsPage() {
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.departments);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => { dispatch(fetchDepartments()); }, [dispatch]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await departmentService.update(editing.id, form);
        toast.success('Department updated');
        setEditing(null);
      } else {
        await dispatch(createDepartment(form)).unwrap();
        toast.success('Department created');
      }
      setForm({ name: '', description: '' });
      dispatch(fetchDepartments());
    } catch { toast.error('Failed'); }
  };

  const handleEdit = (d) => { setEditing(d); setForm({ name: d.name, description: d.description || '' }); };
  const handleCancel = () => { setEditing(null); setForm({ name: '', description: '' }); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this department?')) return;
    await dispatch(deleteDepartment(id));
    toast.success('Deleted');
  };

  return (
    <Layout>
      <div style={s.wrap}>
        <h1 style={s.h1}>Departments</h1>
        <div style={s.layout}>
          <div style={s.formCard}>
            <h2 style={s.subtitle}>{editing ? 'Edit Department' : 'New Department'}</h2>
            <form onSubmit={handleSave} style={s.form}>
              <div style={s.field}>
                <label style={s.label}>Name</label>
                <input style={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Description</label>
                <textarea style={{ ...s.input, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" style={s.saveBtn}>{editing ? 'Update' : 'Create'}</button>
                {editing && <button type="button" style={s.cancelBtn} onClick={handleCancel}>Cancel</button>}
              </div>
            </form>
          </div>

          <div style={s.listCard}>
            <h2 style={s.subtitle}>All Departments ({list.length})</h2>
            <div style={s.deptList}>
              {list.map(d => (
                <div key={d.id} style={s.deptItem}>
                  <div>
                    <div style={s.deptName}>{d.name}</div>
                    <div style={s.deptDesc}>{d.description || 'No description'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={s.editBtn} onClick={() => handleEdit(d)}>Edit</button>
                    <button style={s.delBtn} onClick={() => handleDelete(d.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {list.length === 0 && <p style={{ color: '#475569', textAlign: 'center' }}>No departments yet</p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const s = {
  wrap: { padding: '40px 32px' },
  h1: { color: '#f1f5f9', fontFamily: "'Georgia',serif", fontSize: 28, fontWeight: 700, marginBottom: 28 },
  layout: { display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24 },
  formCard: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 12, padding: 24 },
  listCard: { background: '#161b27', border: '1px solid #2a3448', borderRadius: 12, padding: 24 },
  subtitle: { color: '#94a3b8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { color: '#94a3b8', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
  input: { background: '#1e2535', border: '1px solid #2a3448', borderRadius: 8, padding: '10px 12px', color: '#f1f5f9', fontSize: 14, outline: 'none' },
  saveBtn: { background: 'linear-gradient(135deg,#3b82f6,#6366f1)', border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 },
  cancelBtn: { background: 'none', border: '1px solid #2a3448', borderRadius: 8, padding: '10px 20px', color: '#94a3b8', cursor: 'pointer', fontSize: 14 },
  deptList: { display: 'flex', flexDirection: 'column', gap: 10 },
  deptItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e2535', borderRadius: 10, padding: '14px 16px' },
  deptName: { color: '#f1f5f9', fontWeight: 600, fontSize: 15, marginBottom: 3 },
  deptDesc: { color: '#64748b', fontSize: 13 },
  editBtn: { background: '#1e2535', border: '1px solid #2a3448', borderRadius: 6, padding: '5px 12px', color: '#94a3b8', cursor: 'pointer', fontSize: 12 },
  delBtn: { background: '#ef444411', border: '1px solid #ef444433', borderRadius: 6, padding: '5px 12px', color: '#ef4444', cursor: 'pointer', fontSize: 12 }
};
