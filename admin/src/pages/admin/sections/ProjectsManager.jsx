import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../../services/api';
import { toast } from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const emptyForm = { title: '', description: '', category: 'Full Stack Web App', technologies: '', highlights: '', liveUrl: '', githubUrl: '', status: 'Live', featured: false, visible: true };

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await getProjects('?visible=all');
      setProjects(res.data || []);
    } catch { toast('Failed to load projects', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ ...p, technologies: (p.technologies || []).join(', '), highlights: (p.highlights || []).join('\n') });
    setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      const techArr = form.technologies.split(',').map(s => s.trim()).filter(Boolean);
      const hlArr = form.highlights.split('\n').map(s => s.trim()).filter(Boolean);
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('category', form.category);
      fd.append('technologies', JSON.stringify(techArr));
      fd.append('highlights', JSON.stringify(hlArr));
      fd.append('liveUrl', form.liveUrl || '');
      fd.append('githubUrl', form.githubUrl || '');
      fd.append('status', form.status);
      fd.append('featured', form.featured);
      fd.append('visible', form.visible);
      if (form.imageFile) fd.append('images', form.imageFile);

      if (editing) await updateProject(editing, fd);
      else await createProject(fd);

      toast(editing ? 'Project updated!' : 'Project created!');
      setModal(false);
      load();
    } catch (err) { toast(err.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(deleteId);
      toast('Project deleted');
      setDeleteId(null);
      load();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleToggle = async (p, field) => {
    try {
      const fd = new FormData();
      fd.append(field, !p[field]);
      await updateProject(p._id, fd);
      load();
    } catch {}
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Projects ({projects.length})</h3>
          <button className="btn-admin btn-admin-primary" onClick={openAdd}>+ Add Project</button>
        </div>

        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> :
          projects.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">🚀</div>
              <h4>No projects yet</h4>
              <p>Add your first project to get started</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th><th>Category</th><th>Status</th><th>Featured</th><th>Visible</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p._id}>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.title}</td>
                      <td><span className="badge badge-blue">{p.category}</span></td>
                      <td><span className={`badge ${p.status === 'Live' ? 'badge-green' : 'badge-gray'}`}>{p.status}</span></td>
                      <td>
                        <label className="toggle">
                          <input type="checkbox" checked={p.featured} onChange={() => handleToggle(p, 'featured')} />
                          <span className="toggle-slider" />
                        </label>
                      </td>
                      <td>
                        <label className="toggle">
                          <input type="checkbox" checked={p.visible} onChange={() => handleToggle(p, 'visible')} />
                          <span className="toggle-slider" />
                        </label>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button className="btn-admin btn-admin-secondary" onClick={() => openEdit(p)}>Edit</button>
                          <button className="btn-admin btn-admin-danger" onClick={() => setDeleteId(p._id)}>Delete</button>
                          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-admin btn-admin-success">View</a>}
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
              <h3>{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button className="modal-close" onClick={() => setModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="admin-form">
                  <div className="form-row-2">
                    <div className="admin-field">
                      <label>Title *</label>
                      <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                    </div>
                    <div className="admin-field">
                      <label>Category</label>
                      <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Description *</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                  </div>
                  <div className="admin-field">
                    <label>Technologies (comma separated)</label>
                    <input placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))} />
                  </div>
                  <div className="admin-field">
                    <label>Key Highlights (one per line)</label>
                    <textarea rows={3} placeholder="Responsive design&#10;Live deployment" value={form.highlights} onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))} />
                  </div>
                  <div className="form-row-2">
                    <div className="admin-field">
                      <label>Live URL</label>
                      <input type="url" value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} />
                    </div>
                    <div className="admin-field">
                      <label>GitHub URL</label>
                      <input type="url" value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} />
                    </div>
                  </div>
                  <div className="form-row-3">
                    <div className="admin-field">
                      <label>Status</label>
                      <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                        <option>Live</option><option>In Progress</option><option>Completed</option>
                      </select>
                    </div>
                    <div className="admin-field">
                      <label>Featured</label>
                      <select value={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.value === 'true' }))}>
                        <option value="true">Yes</option><option value="false">No</option>
                      </select>
                    </div>
                    <div className="admin-field">
                      <label>Visible</label>
                      <select value={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.value === 'true' }))}>
                        <option value="true">Yes</option><option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="admin-field">
                    <label>Project Image</label>
                    <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, imageFile: e.target.files[0] }))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-admin btn-admin-secondary" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-admin btn-admin-primary" disabled={saving}>{saving ? 'Saving...' : (editing ? 'Update' : 'Create')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Delete this project? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ProjectsManager;
