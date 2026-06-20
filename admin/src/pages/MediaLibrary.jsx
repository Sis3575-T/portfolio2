import React, { useState, useEffect, useRef } from 'react';
import { adminApi } from '../utils/api';

function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const fileRef = useRef();
  const perPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getMedia({ limit: 50 });
        setMedia(data.data || []);
      } catch (err) {
        console.error('Failed to load media');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', file.type.startsWith('image/') ? 'image' : 'document');
    try {
      await adminApi.uploadMedia(formData);
      const { data } = await adminApi.getMedia({ limit: 50 });
      setMedia(data.data || []);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await adminApi.deleteMedia(id);
      setMedia(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const totalPages = Math.ceil(media.length / perPage);
  const paged = media.slice((page - 1) * perPage, page * perPage);

  const getIcon = (mime) => {
    if (mime?.startsWith('image/')) return 'fa-regular fa-image';
    if (mime?.includes('pdf')) return 'fa-regular fa-file-pdf';
    if (mime?.includes('word')) return 'fa-regular fa-file-word';
    return 'fa-regular fa-file';
  };

  if (loading) return <div className="placeholder-page"><p>Loading media library...</p></div>;

  return (
    <div>
      <div className="table-header">
        <span style={{ fontSize: 14, fontWeight: 500 }}>All Media <span style={{ fontWeight: 400, color: 'var(--gray-500)' }}>({media.length} files)</span></span>
        <div>
          <input type="file" ref={fileRef} onChange={handleUpload} style={{ display: 'none' }} />
          <button className="btn btn-primary" onClick={() => fileRef.current?.click()}>
            <i className="fa-regular fa-upload"></i> Upload Files
          </button>
        </div>
      </div>

      <div className="media-grid">
        {paged.map((item) => (
          <div key={item._id} className="media-card" style={{ position: 'relative' }}>
            <div className="media-preview">
              <i className={getIcon(item.mimeType)}></i>
            </div>
            <div className="media-info">
              <div className="media-name">{item.originalName || item.name}</div>
              <div className="media-meta">
                {(item.size / 1024 / 1024).toFixed(1)} MB · {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                position: 'absolute', top: 8, right: 8,
                width: 28, height: 28, borderRadius: 6,
                border: 'none', background: 'rgba(0,0,0,0.5)',
                color: 'white', cursor: 'pointer', fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              title="Delete"
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        ))}
        <div className="media-upload" onClick={() => fileRef.current?.click()}>
          <i className="fa-regular fa-cloud-arrow-up"></i>
          <p>Drop files here or click to upload</p>
        </div>
      </div>

      <div className="pagination">
        <span className="pagination-info">Showing {paged.length > 0 ? (page - 1) * perPage + 1 : 0} to {Math.min(page * perPage, media.length)} of {media.length} files</span>
        <div className="pagination-btns">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><i className="fa-regular fa-chevron-left"></i></button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
            <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><i className="fa-regular fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  );
}

export default MediaLibrary;
