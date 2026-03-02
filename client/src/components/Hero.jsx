import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import img from '../assets/Img.jpg';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <p className="hero-greeting animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Hello, I'm
                    </p>
                    <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Raushan Kumar
                        <span className="hero-title-role gradient-text">Full Stack Developer</span>
                    </h1>
                    <p className="hero-description animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        I build exceptional and accessible digital experiences for the web.
                        Passionate about creating modern, beautiful, and dynamic applications.
                    </p>

                    <div className="hero-cta animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <a href="#projects" className="btn btn-primary">
                            View Work <ArrowRight size={18} />
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=1tNCxrF5U7OrkOsiQPq8HYbFjNh1_72lp" className="btn btn-outline">
                            Resume <Download size={18} />
                        </a>
                    </div>

                    <div className="hero-socials animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <a href="https://github.com/CodeWithRDX" target="_blank" rel="noopener noreferrer" aria-label="Github"><Github size={24} /></a>
                        <a href="https://www.linkedin.com/in/raushankumar1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={24} /></a>
                        <a href="https://x.com/Raushan70138257" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={24} /></a>
                    </div>
                </div>

                <div className="hero-visual animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
