import React, { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

function AnalyticsPage() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminApi.getVisitorStats();
        setVisitors(data.data || []);
      } catch (err) {
        console.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const topProjects = [
    { name: 'ShopFlow', views: 4382, downloads: 283, conv: '6.5%' },
    { name: 'DataPulse', views: 3917, downloads: 194, conv: '5.0%' },
    { name: 'CloudDeploy', views: 3124, downloads: 156, conv: '5.0%' },
    { name: 'TaskPro', views: 2846, downloads: 112, conv: '3.9%' },
  ];

  if (loading) return <div className="placeholder-page"><p>Loading analytics...</p></div>;

  const maxVisitor = visitors.length > 0 ? Math.max(...visitors.map(v => v.count)) : 1;

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="stat-card" style={{ flex: 1, minWidth: 140 }}>
          <div className="stat-card-lbl">Page Views</div>
          <div className="stat-card-val" style={{ marginTop: 4 }}>48,392</div>
          <div className="stat-card-chg up"><i className="fa-solid fa-arrow-up"></i> 18.2%</div>
        </div>
        <div className="stat-card" style={{ flex: 1, minWidth: 140 }}>
          <div className="stat-card-lbl">Unique Visitors</div>
          <div className="stat-card-val" style={{ marginTop: 4 }}>21,847</div>
          <div className="stat-card-chg up"><i className="fa-solid fa-arrow-up"></i> 12.5%</div>
        </div>
        <div className="stat-card" style={{ flex: 1, minWidth: 140 }}>
          <div className="stat-card-lbl">Bounce Rate</div>
          <div className="stat-card-val" style={{ marginTop: 4 }}>32.4%</div>
          <div className="stat-card-chg down"><i className="fa-solid fa-arrow-down"></i> 2.1%</div>
        </div>
        <div className="stat-card" style={{ flex: 1, minWidth: 140 }}>
          <div className="stat-card-lbl">Avg. Session</div>
          <div className="stat-card-val" style={{ marginTop: 4 }}>4m 32s</div>
          <div className="stat-card-chg up"><i className="fa-solid fa-arrow-up"></i> 8.3%</div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Traffic Sources</h4>
          <div className="chart-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', justifyContent: 'center' }}>
              {[
                { label: 'Direct', value: 35, color: 'var(--blue)' },
                { label: 'Search', value: 28, color: 'var(--green)' },
                { label: 'Social', value: 18, color: 'var(--orange)' },
                { label: 'Referral', value: 12, color: '#8B5CF6' },
                { label: 'Other', value: 7, color: '#EC4899' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--gray-500)', width: 60 }}>{item.label}</span>
                  <div style={{ flex: 1, height: 8, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${item.value}%`, height: '100%', background: item.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, width: 32, textAlign: 'right' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="analytics-card">
          <h4>Visitor Growth (Monthly)</h4>
          <div className="chart-container">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: '100%', paddingTop: 20 }}>
              {visitors.length > 0 ? visitors.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%', background: i % 2 === 0 ? 'var(--blue)' : 'var(--blue-light)',
                    height: `${(v.count / maxVisitor) * 160}px`,
                    borderRadius: '4px 4px 0 0',
                    minHeight: 12,
                  }} />
                  <span style={{ fontSize: 8, color: 'var(--gray-500)' }}>{v.month}</span>
                </div>
              )) : <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>No data</p>}
            </div>
          </div>
        </div>
        <div className="analytics-card full">
          <h4>Popular Projects</h4>
          <table className="data-table" style={{ border: 'none', boxShadow: 'none' }}>
            <thead>
              <tr><th>Project</th><th>Views</th><th>Downloads</th><th>Conversion</th></tr>
            </thead>
            <tbody>
              {topProjects.map(p => (
                <tr key={p.name}>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{p.views.toLocaleString()}</td>
                  <td>{p.downloads}</td>
                  <td style={{ color: 'var(--green)' }}>{p.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
