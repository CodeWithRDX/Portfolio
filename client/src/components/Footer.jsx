import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: <Github size={20} />, href: 'https://github.com/CodeWithRDX', label: 'GitHub' },
        { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/raushankumar1/', label: 'LinkedIn' },
        { icon: <Twitter size={20} />, href: 'https://x.com/Raushan70138257', label: 'Twitter' },
        { icon: <Mail size={20} />, href: 'mailto:codewithrdx@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <p className="footer-logo">Portfolio<span className="accent">.</span></p>
                        <p className="footer-tagline">Building exceptional digital experiences.</p>
                    </div>

                    <div className="footer-nav">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="footer-link">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-social-section">
                        <h4 className="footer-heading">Connect</h4>
                        <div className="footer-socials">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="footer-social-icon"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        &copy; {currentYear} Raushan Kumar. All rights reserved.
                    </p>
                    <p className="footer-made-with">
                        Made with <Heart size={14} className="heart-icon" /> using React
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
