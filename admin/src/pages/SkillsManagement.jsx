import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Frontend', proficiency: 80, icon: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getSkills();
        setSkills(data.data || []);
      } catch (err) {
        console.error('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools', 'Other'];

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', category: 'Frontend', proficiency: 80, icon: '' });
    setShowModal(true);
  };

  const openEdit = (skill) => {
    setEditing(skill);
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency, icon: skill.icon || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await adminApi.updateSkill(editing._id, form);
      } else {
        await adminApi.createSkill(form);
      }
      const { data } = await adminApi.getSkills();
      setSkills(data.data || []);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save skill', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await adminApi.deleteSkill(id);
      setSkills(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  if (loading) return <div className="placeholder-page"><p>Loading skills...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>{skills.length} skills</span>
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="fa-regular fa-plus"></i> Add Skill
        </button>
      </div>

      {categories.map(cat => {
        const catSkills = skills.filter(s => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{cat}</h4>
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Proficiency</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {catSkills.map(s => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, maxWidth: 120, height: 6, background: 'var(--gray-100)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${s.proficiency}%`, height: '100%', background: 'var(--blue)', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{s.proficiency}%</span>
                      </div>
                    </td>
                    <td><span className={`status ${s.isActive ? 'published' : 'draft'}`}>{s.isActive ? 'Active' : 'Hidden'}</span></td>
                    <td>
                      <div className="table-actions">
                        <button className="edit" onClick={() => openEdit(s)}><i className="fa-regular fa-pen"></i></button>
                        <button className="delete" onClick={() => handleDelete(s._id)}><i className="fa-regular fa-trash-can"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Proficiency (0-100)</label>
                  <input type="number" min={0} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsManagement;
