import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function ServicesManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', icon: '', features: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await adminApi.getServices();
      setItems(data.data || []);
    } catch (err) { console.error('Failed to load services'); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', description: '', icon: '', features: '' });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || '', description: item.description || '', icon: item.icon || '',
      features: (item.features || []).join('\n'),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
      };
      if (editing) {
        await adminApi.updateService(editing._id, payload);
      } else {
        await adminApi.createService(payload);
      }
      const { data } = await adminApi.getServices();
      setItems(data.data || []);
      setShowModal(false);
    } catch (err) { console.error('Failed to save', err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await adminApi.deleteService(id);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { console.error('Failed to delete', err); }
  };

  if (loading) return <div className="placeholder-page"><p>Loading...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>{items.length} services</span>
        <button className="btn btn-primary" onClick={openCreate}><i className="fa-regular fa-plus"></i> Add Service</button>
      </div>

      <table className="data-table">
        <thead><tr><th>Title</th><th>Features</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i._id}>
              <td style={{ fontWeight: 500 }}>{i.title}</td>
              <td>{(i.features || []).length} features</td>
              <td><span className={`status ${i.isActive ? 'published' : 'draft'}`}>{i.isActive ? 'Active' : 'Hidden'}</span></td>
              <td>
                <div className="table-actions">
                  <button className="edit" onClick={() => openEdit(i)} title="Edit"><i className="fa-regular fa-pen"></i></button>
                  <button className="delete" onClick={() => handleDelete(i._id)} title="Delete"><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No services yet</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <Modal title={editing ? 'Edit Service' : 'Add Service'} onClose={() => setShowModal(false)}>
          <div className="form-group"><label>Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="form-group"><label>Icon (FontAwesome class, e.g. FaGlobe)</label><input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="FaGlobe" /></div>
          <div className="form-group"><label>Features (one per line)</label><textarea rows={3} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Responsive Design&#10;Performance Optimization" /></div>
          <div className="modal-footer" style={{ padding: '16px 0 0' }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ServicesManagement;
