import { useState, useEffect } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../../services/api';
import { toast } from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const emptyForm = { name: '', category: 'Frontend', icon: '', level: 80, visible: true };

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    try { const res = await getSkills(true); setSkills(res.data || []); }
    catch { toast('Failed to load skills', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const categories = [...new Set(skills.map(s => s.category))];
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateSkill(editing, form);
      else await createSkill(form);
      toast(editing ? 'Skill updated!' : 'Skill added!');
      setModal(false);
      load();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDelete = async () => {
    try { await deleteSkill(deleteId); toast('Skill deleted'); setDeleteId(null); load(); }
    catch (err) { toast(err.message, 'error'); }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Skills ({skills.length})</h3>
          <button className="btn-admin btn-admin-primary" onClick={() => { setEditing(null); setForm(emptyForm); setModal(true); }}>+ Add Skill</button>
        </div>

        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> :
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6366f1', marginBottom: '0.75rem' }}>{cat}</h4>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Icon</th><th>Level</th><th>Visible</th><th>Actions</th></tr></thead>
                  <tbody>
                    {items.map(s => (
                      <tr key={s._id}>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td>{s.icon || '—'}</td>
                        <td>{s.level}%</td>
                        <td><span className={`badge ${s.visible ? 'badge-green' : 'badge-gray'}`}>{s.visible ? 'Yes' : 'No'}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button className="btn-admin btn-admin-secondary" onClick={() => { setEditing(s._id); setForm(s); setModal(true); }}>Edit</button>
                            <button className="btn-admin btn-admin-danger" onClick={() => setDeleteId(s._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        }
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="admin-form">
                  <div className="form-row-2">
                    <div className="admin-field">
                      <label>Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="admin-field">
                      <label>Category</label>
                      <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Frontend, Backend, Tools..." />
                    </div>
                  </div>
                  <div className="form-row-2">
                    <div className="admin-field">
                      <label>Icon (emoji)</label>
                      <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="⚡" />
                    </div>
                    <div className="admin-field">
                      <label>Level (0-100)</label>
                      <input type="number" min={0} max={100} value={form.level} onChange={e => setForm(f => ({ ...f, level: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Visible</label>
                    <select value={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.value === 'true' }))}>
                      <option value="true">Yes</option><option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-admin btn-admin-secondary" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-admin btn-admin-primary">{editing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && <ConfirmDialog message="Delete this skill?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
};

export default SkillsManager;
