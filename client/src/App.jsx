import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CodolioProfile from './components/CodolioProfile';
import Education from './components/Education';
import Contact from './components/Contact';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import './App.css';

function App() {
  // Theme state: dark by default as requested
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document element
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="app-container">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Projects />
            <Skills />
            <CodolioProfile />
            <Certificates />
            <Education />
            <Contact />
          </main>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;