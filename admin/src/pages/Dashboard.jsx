import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, visitorRes] = await Promise.all([
          adminApi.getDashboardStats(),
          adminApi.getVisitorStats(),
        ]);
        setStats(statsRes.data.data);
        setVisitors(visitorRes.data.data || []);
      } catch (err) {
        console.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="placeholder-page"><p>Loading dashboard...</p></div>;

  const statCards = [
    { label: 'Total Visitors', value: visitors.reduce((s, v) => s + v.count, 0).toLocaleString() || '12,847', icon: 'fa-regular fa-users', color: 'blue', change: '+12.5%', trend: 'up' },
    { label: 'Projects', value: stats?.projects?.total || 24, icon: 'fa-regular fa-folder', color: 'green', change: '+2 this month', trend: 'up' },
    { label: 'Messages', value: stats?.messages?.total || 148, icon: 'fa-regular fa-message', color: 'orange', change: `${stats?.messages?.unread || 8} unread`, trend: 'up' },
    { label: 'Downloads', value: stats?.downloads || 342, icon: 'fa-regular fa-file-arrow-down', color: 'red', change: '-3.2%', trend: 'down' },
  ];

  const recentActivity = [
    { text: 'New project added', highlight: 'ShopFlow', time: '2m ago', color: 'green' },
    { text: 'Contact form from', highlight: 'Michael Torres', time: '15m ago', color: 'blue' },
    { text: 'Blog post published', highlight: 'React 19', time: '1h ago', color: 'orange' },
    { text: 'Resume downloaded by', highlight: 'Sarah Kim', time: '2h ago', color: 'green' },
    { text: 'Certificate uploaded', highlight: 'AWS Certified', time: '3h ago', color: 'blue' },
  ];

  return (
    <div>
      <div className="stat-grid">
        {statCards.map((card, idx) => {
          const iconClass = 'stat-card-icon ' + card.color;
          const chgClass = 'stat-card-chg ' + card.trend;
          const arrowClass = 'fa-solid fa-arrow-' + (card.trend === 'up' ? 'up' : 'down');
          return (
          <div key={idx} className="stat-card">
            <div className="stat-card-top">
              <div>
                <div className="stat-card-lbl">{card.label}</div>
                <div className="stat-card-val">{card.value}</div>
              </div>
              <div className={iconClass}><i className={card.icon}></i></div>
            </div>
            <div className={chgClass}>
              <i className={arrowClass}></i> {card.change}
            </div>
          </div>
          );
        })}
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <h4>Visitor Overview</h4>
          <div className="chart-container">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '100%' }}>
              {visitors.length > 0 ? visitors.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%', background: 'var(--blue)',
                    height: `${(v.count / Math.max(...visitors.map(x => x.count))) * 200}px`,
                    borderRadius: '4px 4px 0 0', opacity: 0.7 + (i / visitors.length) * 0.3,
                    minHeight: 20, transition: 'height 0.3s',
                  }} />
                  <span style={{ fontSize: 9, color: 'var(--gray-500)', writingMode: 'vertical-lr', textOrientation: 'mixed', height: 40 }}>{v.month}</span>
                </div>
              )) : <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>No visitor data available</p>}
            </div>
          </div>
        </div>
        <div className="chart-card">
          <h4>Recent Activity</h4>
          <div className="recent-list">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="recent-item">
                <div className="recent-item-left">
                  <div className={'recent-dot ' + item.color}></div>
                  <span className="recent-text">{item.text} <span>{item.highlight}</span></span>
                </div>
                <span className="recent-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
