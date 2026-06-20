import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'General', tags: '', featured: false });
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getBlogs();
        setBlogs(data.data || []);
      } catch (err) {
        console.error('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = blogs;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', slug: '', excerpt: '', content: '', category: 'General', tags: '', featured: false });
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditing(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'General',
      tags: (blog.tags || []).join(', '),
      featured: blog.featured || false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };
      if (editing) {
        await adminApi.updateBlog(editing._id, data);
      } else {
        await adminApi.createBlog(data);
      }
      const { data: refresh } = await adminApi.getBlogs();
      setBlogs(refresh.data || []);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save blog', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await adminApi.deleteBlog(id);
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  if (loading) return <div className="placeholder-page"><p>Loading blog posts...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>{blogs.length} posts</span>
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="fa-regular fa-plus"></i> New Post
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th></th></tr>
        </thead>
        <tbody>
          {paged.map(b => (
            <tr key={b._id}>
              <td style={{ fontWeight: 500 }}>{b.title}</td>
              <td>{b.category}</td>
              <td><span className={`status ${b.isActive ? 'published' : 'draft'}`}>{b.isActive ? 'Published' : 'Draft'}</span></td>
              <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{new Date(b.publishedAt).toLocaleDateString()}</td>
              <td>
                <div className="table-actions">
                  <button className="edit" onClick={() => openEdit(b)}><i className="fa-regular fa-pen"></i></button>
                  <button className="delete" onClick={() => handleDelete(b._id)}><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          ))}
          {paged.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No blog posts</td></tr>}
        </tbody>
      </table>

      <div className="pagination">
        <span className="pagination-info">Showing {filtered.length > 0 ? (page - 1) * perPage + 1 : 0} to {Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
        <div className="pagination-btns">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><i className="fa-regular fa-chevron-left"></i></button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><i className="fa-regular fa-chevron-right"></i></button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Post' : 'New Post'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="leave-empty-to-auto-generate" />
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Content (markdown)</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ minHeight: 150 }} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  Featured post
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

export default BlogManagement;
