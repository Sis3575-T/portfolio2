import { useState, useEffect } from 'react';
import { getMessages, markMessageRead, deleteMessage } from '../../../services/api';
import { toast } from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async () => {
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.set('search', search);
      if (filter !== 'all') params.set('read', filter === 'read' ? 'true' : 'false');
      const res = await getMessages(`?${params}`);
      setMessages(res.data || []);
      setTotal(res.total || 0);
    } catch { toast('Failed to load messages', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page, filter]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); load(); };

  const handleMarkRead = async (id, read) => {
    try { await markMessageRead(id, read); load(); }
    catch (err) { toast(err.message, 'error'); }
  };

  const handleDelete = async () => {
    try { await deleteMessage(deleteId); toast('Message deleted'); setDeleteId(null); setSelected(null); load(); }
    catch (err) { toast(err.message, 'error'); }
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.read) handleMarkRead(msg._id, true);
  };

  return (
    <div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Messages ({total})</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="admin-search" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
              <button type="submit" className="btn-admin btn-admin-secondary">Search</button>
            </form>
            <select className="admin-search" style={{ width: 'auto' }} value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}>
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> :
          messages.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">✉️</div>
              <h4>No messages</h4>
              <p>Contact form submissions will appear here</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m._id} style={{ cursor: 'pointer', fontWeight: m.read ? 400 : 700 }}>
                      <td onClick={() => openMessage(m)}>{m.name}</td>
                      <td onClick={() => openMessage(m)}>{m.email}</td>
                      <td onClick={() => openMessage(m)}>{m.subject || '—'}</td>
                      <td onClick={() => openMessage(m)} style={{ color: '#64748b', fontSize: '0.82rem' }}>
                        {new Date(m.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`badge ${m.read ? 'badge-gray' : 'badge-blue'}`}>
                          {m.read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button className="btn-admin btn-admin-secondary" onClick={() => handleMarkRead(m._id, !m.read)}>
                            {m.read ? 'Unread' : 'Read'}
                          </button>
                          <button className="btn-admin btn-admin-danger" onClick={() => setDeleteId(m._id)}>Delete</button>
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

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selected.subject || 'Message'}</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px' }}>
                <p><strong>From:</strong> {selected.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${selected.email}`}>{selected.email}</a></p>
                <p><strong>Date:</strong> {new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {selected.message}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin btn-admin-danger" onClick={() => setDeleteId(selected._id)}>Delete</button>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`} className="btn-admin btn-admin-primary">Reply via Email</a>
              <button className="btn-admin btn-admin-secondary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && <ConfirmDialog message="Delete this message permanently?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
};

export default MessagesManager;
