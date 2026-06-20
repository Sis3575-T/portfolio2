import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function MessagesManagement() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getMessages({ limit: 50 });
        setMessages(data.data || []);
      } catch (err) {
        console.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelect = async (msg) => {
    setSelected(msg);
    setReply('');
    if (!msg.isRead) {
      try {
        await adminApi.markAsRead(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
      } catch (err) { /* ignore */ }
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    try {
      await adminApi.replyMessage(selected._id, { replyContent: reply });
      setMessages(prev => prev.map(m => m._id === selected._id ? { ...m, isReplied: true, replyContent: reply } : m));
      setSelected({ ...selected, isReplied: true, replyContent: reply });
      setReply('');
    } catch (err) {
      console.error('Failed to reply', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminApi.deleteMessage(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  if (loading) return <div className="placeholder-page"><p>Loading messages...</p></div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, height: 'calc(100vh - 120px)' }}>
      <div style={{ overflow: 'auto', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', fontWeight: 600, fontSize: 14 }}>
          Inbox ({messages.length})
        </div>
        {messages.map(msg => (
          <div
            key={msg._id}
            onClick={() => handleSelect(msg)}
            style={{
              padding: '12px 16px', borderBottom: '1px solid var(--gray-100)',
              cursor: 'pointer', background: selected?._id === msg._id ? 'var(--blue-light)' : 'transparent',
              opacity: msg.isRead ? 0.7 : 1,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: msg.isRead ? 400 : 600, fontSize: 13 }}>{msg.name}</span>
              <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {msg.subject || msg.message?.substring(0, 60)}
            </p>
          </div>
        ))}
        {messages.length === 0 && <div style={{ padding: 32, textAlign: 'center', color: 'var(--gray-400)' }}>No messages yet</div>}
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', padding: 20, overflow: 'auto' }}>
        {selected ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{selected.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{selected.email}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(selected._id)}>
                <i className="fa-regular fa-trash-can"></i> Delete
              </button>
            </div>
            {selected.subject && <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 8, fontWeight: 500 }}>Subject: {selected.subject}</p>}
            <div style={{ marginTop: 16, padding: 16, background: 'var(--light)', borderRadius: 'var(--radius-sm)', fontSize: 13, lineHeight: 1.7 }}>
              {selected.message}
            </div>
            <p style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 8 }}>
              Received {new Date(selected.createdAt).toLocaleString()}
              {selected.isRead && <span> · Read</span>}
            </p>
            {selected.isReplied && (
              <div style={{ marginTop: 16, padding: 12, background: 'var(--green-light)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)' }}>Your reply:</p>
                <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>{selected.replyContent}</p>
              </div>
            )}
            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, display: 'block', marginBottom: 4 }}>Reply</label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                style={{ width: '100%', padding: 10, border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font)', fontSize: 13, minHeight: 80, resize: 'vertical' }}
              />
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={handleReply} disabled={!reply.trim()}>
                <i className="fa-regular fa-paper-plane"></i> Send Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="placeholder-page" style={{ padding: 40 }}>
            <i className="fa-regular fa-message"></i>
            <h3>Select a message</h3>
            <p>Choose a message from the inbox to read and reply.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesManagement;
