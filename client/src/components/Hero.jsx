import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import img from '../assets/Img.JPG';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getFlyInStyle = (direction, delay) => {
        if (!isVisible) {
            let transform = '';
            switch (direction) {
                case 'left': transform = 'translateX(-100px) scale(0.9)'; break;
                case 'right': transform = 'translateX(100px) scale(0.9)'; break;
                case 'bottom': transform = 'translateY(100px) scale(0.9)'; break;
                case 'top': transform = 'translateY(-100px) scale(0.9)'; break;
                default: transform = 'translateY(50px) scale(0.9)';
            }
            return {
                opacity: 0,
                transform,
                transition: 'none'
            };
        }

        return {
            opacity: 1,
            transform: 'translate(0, 0) scale(1)',
            transition: `all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`
        };
    };

    return (
        <section id="home" className="hero-section" ref={heroRef}>
            <div className="container hero-container">
                <div className="hero-content">
                    <p className="hero-greeting" style={getFlyInStyle('left', 0.1)}>
                        Hello, I'm
                    </p>
                    <h1 className="hero-title" style={getFlyInStyle('left', 0.2)}>
                        Raushan Kumar
                        <span className="hero-title-role gradient-text">Full Stack Developer</span>
                    </h1>
                    <p className="hero-description" style={getFlyInStyle('left', 0.4)}>
                        I build exceptional and accessible digital experiences for the web.
                        Passionate about creating modern, beautiful, and dynamic applications.
                    </p>

                    <div className="hero-cta" style={getFlyInStyle('bottom', 0.6)}>
                        <a href="#projects" className="btn btn-primary">
                            View Work <ArrowRight size={18} />
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=1tNCxrF5U7OrkOsiQPq8HYbFjNh1_72lp" className="btn btn-outline">
                            Resume <Download size={18} />
                        </a>
                    </div>

                    <div className="hero-socials" style={getFlyInStyle('bottom', 0.8)}>
                        <a href="https://github.com/CodeWithRDX" target="_blank" rel="noopener noreferrer" aria-label="Github"><Github size={24} /></a>
                        <a href="https://www.linkedin.com/in/raushankumar1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={24} /></a>
                        <a href="https://x.com/Raushan70138257" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={24} /></a>
                    </div>
                </div>

                <div className="hero-visual" style={getFlyInStyle('right', 0.3)}>
                    <div className="hero-shape"></div>
                    <div className="hero-image-wrapper glass-panel">
                        {/* Simple gradient div for modern look instead of generic image */}
                        <div className="hero-placeholder-image">
                            <img src={img} alt={img} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
