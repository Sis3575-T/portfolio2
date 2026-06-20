import { useState, useEffect } from 'react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../../services/api';
import { toast } from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const emptyForm = { title: '', excerpt: '', content: '', categories: '', tags: '', status: 'draft', readTime: 5 };

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const res = await getBlogs('?status=all&limit=50'); setBlogs(res.data || []); }
    catch { toast('Failed to load blog posts', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('excerpt', form.excerpt);
      fd.append('content', form.content);
      fd.append('categories', JSON.stringify(form.categories.split(',').map(s => s.trim()).filter(Boolean)));
      fd.append('tags', JSON.stringify(form.tags.split(',').map(s => s.trim()).filter(Boolean)));
      fd.append('status', form.status);
      fd.append('readTime', form.readTime);
      if (form.imageFile) fd.append('featuredImage', form.imageFile);

      if (editing) await updateBlog(editing, fd);
      else await createBlog(fd);

      toast(editing ? 'Post updated!' : 'Post created!');
      setModal(false);
      load();
    } catch (err) { toast(err.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteBlog(deleteId); toast('Post deleted'); setDeleteId(null); load(); }
    catch (err) { toast(err.message, 'error'); }
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Blog Posts ({blogs.length})</h3>
          <button className="btn-admin btn-admin-primary" onClick={() => { setEditing(null); setForm(emptyForm); setModal(true); }}>+ New Post</button>
        </div>

        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> :
          blogs.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty-icon">📝</div><h4>No blog posts yet</h4></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Status</th><th>Views</th><th>Read Time</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b._id}>
                      <td style={{ fontWeight: 600, color: '#0f172a', maxWidth: 280 }}>{b.title}</td>
                      <td><span className={`badge ${b.status === 'published' ? 'badge-green' : 'badge-gray'}`}>{b.status}</span></td>
                      <td>{b.views}</td>
                      <td>{b.readTime} min</td>
                      <td style={{ color: '#64748b', fontSize: '0.82rem' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button className="btn-admin btn-admin-secondary" onClick={() => {
                            setEditing(b._id);
                            setForm({ ...b, categories: (b.categories || []).join(', '), tags: (b.tags || []).join(', ') });
                            setModal(true);
                          }}>Edit</button>
                          <button className="btn-admin btn-admin-danger" onClick={() => setDeleteId(b._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Post' : 'New Blog Post'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="admin-form">
                  <div className="admin-field">
                    <label>Title *</label>
                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                  </div>
                  <div className="admin-field">
                    <label>Excerpt</label>
                    <textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
                  </div>
                  <div className="admin-field">
                    <label>Content *</label>
                    <textarea rows={10} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
                  </div>
                  <div className="form-row-2">
                    <div className="admin-field">
                      <label>Categories (comma separated)</label>
                      <input value={form.categories} onChange={e => setForm(f => ({ ...f, categories: e.target.value }))} placeholder="Web Dev, React" />
                    </div>
                    <div className="admin-field">
                      <label>Tags (comma separated)</label>
                      <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="javascript, tutorial" />
                    </div>
                  </div>
                  <div className="form-row-2">
                    <div className="admin-field">
                      <label>Status</label>
                      <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div className="admin-field">
                      <label>Read Time (minutes)</label>
                      <input type="number" min={1} value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Featured Image</label>
                    <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, imageFile: e.target.files[0] }))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-admin btn-admin-secondary" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-admin btn-admin-primary" disabled={saving}>{saving ? 'Saving...' : (editing ? 'Update' : 'Publish')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && <ConfirmDialog message="Delete this blog post?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
};

export default BlogManager;
