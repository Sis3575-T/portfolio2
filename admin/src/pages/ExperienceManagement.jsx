import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function ExperienceManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    company: '', position: '', location: '', startDate: '', endDate: '',
    current: false, description: '', responsibilities: '', achievements: '',
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await adminApi.getExperiences();
      setItems(data.data || []);
    } catch (err) { console.error('Failed to load experiences'); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', responsibilities: '', achievements: '' });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      company: item.company || '', position: item.position || '', location: item.location || '',
      startDate: item.startDate ? item.startDate.slice(0, 10) : '',
      endDate: item.endDate ? item.endDate.slice(0, 10) : '',
      current: item.current || false, description: item.description || '',
      responsibilities: (item.responsibilities || []).join('\n'),
      achievements: (item.achievements || []).join('\n'),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        responsibilities: form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
        achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean),
      };
      if (editing) {
        await adminApi.updateExperience(editing._id, payload);
      } else {
        await adminApi.createExperience(payload);
      }
      const { data } = await adminApi.getExperiences();
      setItems(data.data || []);
      setShowModal(false);
    } catch (err) { console.error('Failed to save', err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await adminApi.deleteExperience(id);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { console.error('Failed to delete', err); }
  };

  if (loading) return <div className="placeholder-page"><p>Loading...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>{items.length} experiences</span>
        <button className="btn btn-primary" onClick={openCreate}><i className="fa-regular fa-plus"></i> Add Experience</button>
      </div>

      <table className="data-table">
        <thead><tr><th>Company</th><th>Position</th><th>Duration</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i._id}>
              <td style={{ fontWeight: 500 }}>{i.company}</td>
              <td>{i.position}</td>
              <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                {i.startDate?.slice(0, 7)} — {i.current ? 'Present' : i.endDate?.slice(0, 7)}
              </td>
              <td><span className={`status ${i.isActive ? 'published' : 'draft'}`}>{i.isActive ? 'Active' : 'Hidden'}</span></td>
              <td>
                <div className="table-actions">
                  <button className="edit" onClick={() => openEdit(i)} title="Edit"><i className="fa-regular fa-pen"></i></button>
                  <button className="delete" onClick={() => handleDelete(i._id)} title="Delete"><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No experiences yet</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <Modal title={editing ? 'Edit Experience' : 'Add Experience'} onClose={() => setShowModal(false)}>
          <div className="form-row">
            <div className="form-group"><label>Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
            <div className="form-group"><label>Position</label><input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 9 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 0 }}>
                <input type="checkbox" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} />
                Current position
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Start Date</label><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
            <div className="form-group"><label>End Date</label><input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} disabled={form.current} /></div>
          </div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="form-group"><label>Responsibilities (one per line)</label><textarea rows={3} value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} placeholder="Led team of 5 developers&#10;Built microservices architecture" /></div>
          <div className="form-group"><label>Achievements (one per line)</label><textarea rows={2} value={form.achievements} onChange={(e) => setForm({ ...form, achievements: e.target.value })} placeholder="Reduced costs by 40%&#10;Improved performance by 60%" /></div>
          <div className="modal-footer" style={{ padding: '16px 0 0' }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExperienceManagement;
