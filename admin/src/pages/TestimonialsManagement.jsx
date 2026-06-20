import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', rating: 5, featured: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getTestimonials();
        setTestimonials(data.data || []);
      } catch (err) {
        console.error('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', role: '', company: '', content: '', rating: 5, featured: false });
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, company: t.company || '', content: t.content, rating: t.rating, featured: t.featured });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await adminApi.updateTestimonial(editing._id, form);
      } else {
        await adminApi.createTestimonial(form);
      }
      const { data } = await adminApi.getTestimonials();
      setTestimonials(data.data || []);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save testimonial', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await adminApi.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  if (loading) return <div className="placeholder-page"><p>Loading testimonials...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>{testimonials.length} testimonials</span>
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="fa-regular fa-plus"></i> Add Testimonial
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr><th>Name</th><th>Role</th><th>Rating</th><th>Featured</th><th></th></tr>
        </thead>
        <tbody>
          {testimonials.map(t => (
            <tr key={t._id}>
              <td style={{ fontWeight: 500 }}>{t.name}</td>
              <td style={{ color: 'var(--gray-500)', fontSize: 12 }}>{t.role}{t.company ? ` at ${t.company}` : ''}</td>
              <td style={{ color: '#F59E0B' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</td>
              <td>{t.featured ? <span className="status published">Featured</span> : <span className="status draft">No</span>}</td>
              <td>
                <div className="table-actions">
                  <button className="edit" onClick={() => openEdit(t)}><i className="fa-regular fa-pen"></i></button>
                  <button className="delete" onClick={() => handleDelete(t._id)}><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  Featured testimonial
                </label>
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

export default TestimonialsManagement;
