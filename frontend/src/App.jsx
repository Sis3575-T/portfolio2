import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProjectDetail from './pages/ProjectDetail';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Terminal from './components/Terminal';

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  const toggleTerminal = useCallback(() => {
    setTerminalOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleTerminal]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleTerminal={toggleTerminal} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <AnimatePresence>
        {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
