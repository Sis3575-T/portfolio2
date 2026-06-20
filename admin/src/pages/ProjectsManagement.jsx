import React, { useState, useEffect } from 'react';
import { adminApi, imageUrl } from '../utils/api';
import api from '../utils/api';

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

function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', thumbnail: '', images: [], featured: false, category: 'Full Stack' });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const perPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getProjects();
        setProjects(data.data || []);
      } catch (err) {
        console.error('Failed to load projects');
      }
    };
    fetchData();
  }, []);

  const filtered = projects.filter(p =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const openCreate = () => {
    setEditing(null);
    setUploadError('');
    setForm({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', thumbnail: '', images: [], featured: false, category: 'Full Stack' });
    setShowModal(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setUploadError('');
    setForm({
      title: project.title || '',
      description: project.description || '',
      technologies: (project.technologies || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      thumbnail: project.thumbnail || '',
      images: project.images || [],
      featured: project.featured || false,
      category: project.category || 'Full Stack',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...form,
        technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (editing) {
        await adminApi.updateProject(editing._id, data);
      } else {
        await adminApi.createProject(data);
      }
      const { data: refresh } = await adminApi.getProjects();
      setProjects(refresh.data || []);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save project', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await adminApi.deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  const uploadCountRef = React.useRef(0);

  const uploadImage = async (file) => {
    uploadCountRef.current += 1;
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      return data.data.url;
    } catch (err) {
      console.error('Upload failed', err);
      setUploadError(err.response?.data?.message || 'Upload failed. Check console for details.');
      return null;
    } finally {
      uploadCountRef.current -= 1;
      if (uploadCountRef.current <= 0) setUploading(false);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    const url = await uploadImage(file);
    if (url) setForm({ ...form, thumbnail: url });
  };

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    const urls = await Promise.all(files.map(uploadImage));
    setForm({ ...form, images: [...form.images, ...urls.filter(Boolean)] });
  };

  const removeImage = (idx) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const handleToggle = async (id) => {
    try {
      await adminApi.toggleProject(id);
      const { data } = await adminApi.getProjects();
      setProjects(data.data || []);
    } catch (err) {
      console.error('Failed to toggle project', err);
    }
  };

  return (
    <div>
      <div className="table-header">
        <div className="search-inline">
          <i className="fa-regular fa-magnifying-glass"></i>
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="fa-regular fa-plus"></i> Add Project
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Technologies</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paged.map((p) => (
            <tr key={p._id}>
              <td style={{ fontWeight: 500 }}>{p.title}</td>
              <td>{(p.technologies || []).join(', ')}</td>
              <td>{p.category}</td>
              <td><span className={`status ${p.isActive ? 'published' : 'draft'}`}>{p.isActive ? 'Published' : 'Hidden'}</span></td>
              <td>
                <div className="table-actions">
                  <button className="edit" onClick={() => openEdit(p)} title="Edit"><i className="fa-regular fa-pen"></i></button>
                  <button className="edit" onClick={() => handleToggle(p._id)} title={p.isActive ? 'Hide' : 'Show'}><i className={`fa-regular ${p.isActive ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
                  <button className="delete" onClick={() => handleDelete(p._id)} title="Delete"><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </td>
            </tr>
          ))}
          {paged.length === 0 && (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No projects found</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <span className="pagination-info">Showing {filtered.length > 0 ? (page - 1) * perPage + 1 : 0} to {Math.min(page * perPage, filtered.length)} of {filtered.length} projects</span>
        <div className="pagination-btns">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><i className="fa-regular fa-chevron-left"></i></button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><i className="fa-regular fa-chevron-right"></i></button>
        </div>
      </div>

      {showModal && (
        <Modal title={editing ? 'Edit Project' : 'Add Project'} onClose={() => setShowModal(false)}>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Technologies (comma-separated)</label>
            <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>GitHub URL</label>
              <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Live URL</label>
              <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Full Stack</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>DevOps</option>
                <option>Mobile</option>
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 9 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 0 }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured project
              </label>
            </div>
          </div>
          {uploadError && <div className="login-error" style={{ marginBottom: 12 }}>{uploadError}</div>}
          <div className="form-group">
            <label>Thumbnail</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {form.thumbnail && (
                <div style={{ position: 'relative', width: 100, height: 64 }}>
                  <img src={imageUrl(form.thumbnail)} alt="thumb" style={{ width: 100, height: 64, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }} />
                  <button onClick={() => setForm({ ...form, thumbnail: '' })} style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', border: 'none', background: '#ef4444', color: '#fff', fontSize: 12, lineHeight: '20px', textAlign: 'center', cursor: 'pointer' }}>&times;</button>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleThumbnailUpload} disabled={uploading} style={{ fontSize: '0.85rem' }} />
              {uploading && <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Uploading...</span>}
            </div>
          </div>
          <div className="form-group">
            <label>Images</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              {form.images.map((img, i) => (
                <div key={i} style={{ position: 'relative', width: 80, height: 56 }}>
                  <img src={imageUrl(img)} alt={''} style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }} />
                  <button onClick={() => removeImage(i)} style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', border: 'none', background: '#ef4444', color: '#fff', fontSize: 12, lineHeight: '20px', textAlign: 'center', cursor: 'pointer' }}>&times;</button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={handleImagesUpload} disabled={uploading} style={{ fontSize: '0.85rem' }} />
          </div>
          <div className="modal-footer" style={{ padding: '16px 0 0' }}>
            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={uploading}>{editing ? 'Update' : 'Create'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProjectsManagement;
