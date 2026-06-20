import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProjectsManagement from './pages/ProjectsManagement';
import MessagesManagement from './pages/MessagesManagement';
import MediaLibrary from './pages/MediaLibrary';
import AnalyticsPage from './pages/AnalyticsPage';
import SEOManagement from './pages/SEOManagement';
import SkillsManagement from './pages/SkillsManagement';
import BlogManagement from './pages/BlogManagement';
import TestimonialsManagement from './pages/TestimonialsManagement';
import HeroManagement from './pages/HeroManagement';
import AboutManagement from './pages/AboutManagement';
import ExperienceManagement from './pages/ExperienceManagement';
import EducationManagement from './pages/EducationManagement';
import ServicesManagement from './pages/ServicesManagement';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

function Sidebar() {
  const { user, logout } = useAuth();
  const [active, setActive] = React.useState(
    () => localStorage.getItem('admin_page') || 'dashboard'
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-regular fa-chart-pie' },
    { id: 'divider' },
    { id: 'hero', label: 'Hero', icon: 'fa-regular fa-user' },
    { id: 'about', label: 'About', icon: 'fa-regular fa-address-card' },
    { id: 'skills', label: 'Skills', icon: 'fa-regular fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fa-regular fa-folder' },
    { id: 'experience', label: 'Experience', icon: 'fa-regular fa-briefcase' },
    { id: 'education', label: 'Education', icon: 'fa-regular fa-graduation-cap' },
    { id: 'services', label: 'Services', icon: 'fa-regular fa-gear' },
    { id: 'testimonials', label: 'Testimonials', icon: 'fa-regular fa-comment' },
    { id: 'blog', label: 'Blog', icon: 'fa-regular fa-newspaper' },
    { id: 'messages', label: 'Messages', icon: 'fa-regular fa-message' },
    { id: 'media', label: 'Media Library', icon: 'fa-regular fa-images' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-regular fa-chart-bar' },
    { id: 'seo', label: 'SEO', icon: 'fa-regular fa-magnifying-glass' },
  ];

  const handleNav = (id) => {
    if (id === 'divider') return;
    localStorage.setItem('admin_page', id);
    setActive(id);
    window.dispatchEvent(new CustomEvent('admin-navigate', { detail: id }));
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">A</div>
        <div className="sidebar-brand-text">
          <h3>Admin Panel</h3>
          <p>Portfolio CMS</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) =>
          item.id === 'divider' ? (
            <div key={item.id} className="sidebar-divider" />
          ) : (
            <div
              key={item.id}
              className={`sidebar-nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          )
        )}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-av">{user?.name?.charAt(0) || 'A'}</div>
          <div>
            <p className="sidebar-user-name">{user?.name || 'Admin'}</p>
            <p className="sidebar-user-role">Administrator</p>
          </div>
        </div>
        <button className="sidebar-logout" onClick={logout} title="Logout">
          <i className="fa-regular fa-right-from-bracket"></i>
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  const [title, setTitle] = React.useState('Dashboard');

  React.useEffect(() => {
    const handler = (e) => {
      const labels = {
        dashboard: 'Dashboard', hero: 'Hero Management', about: 'About Management',
        skills: 'Skills Management', projects: 'Project Management',
        experience: 'Experience Management', education: 'Education Management',
        services: 'Services Management', testimonials: 'Testimonials Management',
        blog: 'Blog Management', messages: 'Contact Messages',
        media: 'Media Library', analytics: 'Analytics', seo: 'SEO Settings',
      };
      setTitle(labels[e.detail] || 'Dashboard');
    };
    window.addEventListener('admin-navigate', handler);
    return () => window.removeEventListener('admin-navigate', handler);
  }, []);

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <h2>{title}</h2>
      </div>
      <div className="admin-topbar-right">
        <div className="topbar-search">
          <i className="fa-regular fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <button className="topbar-btn"><i className="fa-regular fa-bell"></i></button>
        <button className="topbar-btn"><i className="fa-regular fa-envelope"></i></button>
      </div>
    </header>
  );
}

function AdminRouter() {
  const [page, setPage] = React.useState(
    () => localStorage.getItem('admin_page') || 'dashboard'
  );

  React.useEffect(() => {
    const handler = (e) => setPage(e.detail);
    window.addEventListener('admin-navigate', handler);
    return () => window.removeEventListener('admin-navigate', handler);
  }, []);

  const components = {
    dashboard: <Dashboard />,
    hero: <HeroManagement />,
    about: <AboutManagement />,
    skills: <SkillsManagement />,
    projects: <ProjectsManagement />,
    experience: <ExperienceManagement />,
    education: <EducationManagement />,
    services: <ServicesManagement />,
    testimonials: <TestimonialsManagement />,
    blog: <BlogManagement />,
    messages: <MessagesManagement />,
    media: <MediaLibrary />,
    analytics: <AnalyticsPage />,
    seo: <SEOManagement />,
  };

  return components[page] || <Dashboard />;
}

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="admin-loading">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminRouter />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;
