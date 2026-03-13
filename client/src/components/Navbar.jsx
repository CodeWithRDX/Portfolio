import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isDark, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to section, navigating to home first if needed
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        setIsMenuOpen(false);

        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation then scroll
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePageLink = () => {
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0 })}>
                    Portfolio<span className="accent">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-desktop">
                    <ul className="nav-links">
                        <li>
                            <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
                        </li>
                        <li>
                            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={handlePageLink}>About</Link>
                        </li>
                        <li>
                            <Link to="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={handlePageLink}>Projects</Link>
                        </li>
                        <li>
                            <a href="#skills" className="nav-link" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
                        </li>
                        <li>
                            <a href="#education" className="nav-link" onClick={(e) => scrollToSection(e, 'education')}>Education</a>
                        </li>
                        <li>
                            <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                        </li>
                    </ul>

                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="nav-mobile-toggle">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle" aria-label="Toggle Menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`nav-mobile-menu glass-panel ${isMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    <li>
                        <a href="#home" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
                    </li>
                    <li>
                        <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={handlePageLink}>About</Link>
                    </li>
                    <li>
                        <Link to="/projects" className={`mobile-nav-link ${isActive('/projects') ? 'active' : ''}`} onClick={handlePageLink}>Projects</Link>
                    </li>
                    <li>
                        <a href="#skills" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
                    </li>
                    <li>
                        <a href="#education" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'education')}>Education</a>
                    </li>
                    <li>
                        <a href="#contact" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
