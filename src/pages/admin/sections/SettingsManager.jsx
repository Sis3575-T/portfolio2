import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../../services/api';
import { toast } from '../components/Toast';

const SettingsManager = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(res => { setForm(res.data || {}); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (k !== 'logoFile' && k !== 'faviconFile' && typeof v !== 'object') fd.append(k, v); });
      if (form.logoFile) fd.append('logo', form.logoFile);
      if (form.faviconFile) fd.append('favicon', form.faviconFile);
      await updateSettings(fd);
      toast('Settings saved!');
    } catch (err) { toast(err.message, 'error'); }
    finally { setSaving(false); }
  };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div className="admin-field">
      <label>{label}</label>
      <input type={type} value={form[key] || ''} placeholder={placeholder} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
    </div>
  );

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  return (
    <form onSubmit={handleSave}>
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Site Settings</h3>
          <button type="submit" className="btn-admin btn-admin-primary" disabled={saving}>{saving ? 'Saving...' : 'Save All Settings'}</button>
        </div>

        <h4 style={{ marginBottom: '1rem', color: '#6366f1', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>General</h4>
        <div className="admin-form" style={{ marginBottom: '2rem' }}>
          <div className="form-row-2">
            {field('Site Title', 'siteTitle')}
            {field('Site Description', 'siteDescription')}
          </div>
          <div className="form-row-2">
            {field('SEO Title', 'seoTitle')}
            {field('SEO Description', 'seoDescription')}
          </div>
          <div className="form-row-2">
            <div className="admin-field"><label>Logo</label><input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, logoFile: e.target.files[0] }))} /></div>
            <div className="admin-field"><label>Favicon</label><input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, faviconFile: e.target.files[0] }))} /></div>
          </div>
        </div>

        <h4 style={{ marginBottom: '1rem', color: '#6366f1', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact Info</h4>
        <div className="admin-form" style={{ marginBottom: '2rem' }}>
          <div className="form-row-2">
            {field('Email', 'email', 'email')}
            {field('Phone', 'phone', 'tel')}
          </div>
          {field('Address', 'address')}
        </div>

        <h4 style={{ marginBottom: '1rem', color: '#6366f1', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Social Links</h4>
        <div className="admin-form" style={{ marginBottom: '2rem' }}>
          <div className="form-row-2">
            {field('GitHub URL', 'github', 'url')}
            {field('LinkedIn URL', 'linkedin', 'url')}
          </div>
          <div className="form-row-2">
            {field('Twitter URL', 'twitter', 'url')}
            {field('Telegram URL', 'telegram', 'url')}
          </div>
        </div>

        <h4 style={{ marginBottom: '1rem', color: '#6366f1', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Footer</h4>
        <div className="admin-form">
          {field('Footer Text', 'footerText')}
          {field('Copyright Text', 'copyrightText')}
        </div>
      </div>
    </form>
  );
};

export default SettingsManager;
