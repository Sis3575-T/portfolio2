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

function EducationManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    institution: '', degree: '', field: '', startDate: '', endDate: '',
    gpa: '', description: '', achievements: '',
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await adminApi.getEducation();
      setItems(data.data || []);
    } catch (err) { console.error('Failed to load education'); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '', achievements: '' });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      institution: item.institution || '', degree: item.degree || '', field: item.field || '',
      startDate: item.startDate ? item.startDate.slice(0, 10) : '',
      endDate: item.endDate ? item.endDate.slice(0, 10) : '',
      gpa: item.gpa || '', description: item.description || '',
      achievements: (item.achievements || []).join('\n'),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean),
      };
      if (editing) {
        await adminApi.updateEducation(editing._id, payload);
      } else {
        await adminApi.createEducation(payload);
      }
      const { data } = await adminApi.getEducation();
      setItems(data.data || []);
      setShowModal(false);
    } catch (err) { console.error('Failed to save', err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      await adminApi.deleteEducation(id);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { console.error('Failed to delete', err); }
  };

  if (loading) return <div className="placeholder-page"><p>Loading...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>{items.length} education records</span>
        <button className="btn btn-primary" onClick={openCreate}><i className="fa-regular fa-plus"></i> Add Education</button>
      </div>

      <table className="data-table">
        <thead><tr><th>Institution</th><th>Degree</th><th>Field</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i._id}>
              <td style={{ fontWeight: 500 }}>{i.institution}</td>
              <td>{i.degree}</td>
              <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{i.field}</td>
              <td><span className={`status ${i.isActive ? 'published' : 'draft'}`}>{i.isActive ? 'Active' : 'Hidden'}</span></td>
              <td>
                <div className="table-actions">
                  <button className="edit" onClick={() => openEdit(i)} title="Edit"><i className="fa-regular fa-pen"></i></button>
                  <button className="delete" onClick={() => handleDelete(i._id)} title="Delete"><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No education records yet</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <Modal title={editing ? 'Edit Education' : 'Add Education'} onClose={() => setShowModal(false)}>
          <div className="form-row">
            <div className="form-group"><label>Institution</label><input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} /></div>
            <div className="form-group"><label>Degree</label><input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Field of Study</label><input value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} /></div>
            <div className="form-group"><label>GPA</label><input value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} placeholder="3.85" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Start Date</label><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
            <div className="form-group"><label>End Date</label><input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="form-group"><label>Achievements (one per line)</label><textarea rows={3} value={form.achievements} onChange={(e) => setForm({ ...form, achievements: e.target.value })} placeholder="Dean's List&#10;Published research" /></div>
          <div className="modal-footer" style={{ padding: '16px 0 0' }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EducationManagement;
