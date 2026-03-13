import { useEffect } from 'react';
import { X, ExternalLink, Github, Code2, Lightbulb, Wrench } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-title-area">
                        <span className="modal-category">{project.category}</span>
                        <h2 className="modal-title">{project.title}</h2>
                    </div>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {/* Tech Stack */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <Code2 size={18} className="modal-section-icon" />
                            <h3>Tech Stack</h3>
                        </div>
                        <div className="modal-tags">
                            {project.tags.map(tag => (
                                <span key={tag} className="modal-tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <Lightbulb size={18} className="modal-section-icon" />
                            <h3>Problem Statement</h3>
                        </div>
                        <p className="modal-text">{project.problemStatement}</p>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <Code2 size={18} className="modal-section-icon" />
                            <h3>What I Built</h3>
                        </div>
                        <p className="modal-text">{project.detailedExplanation}</p>
                    </div>

                    {/* How I Solved */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <Wrench size={18} className="modal-section-icon" />
                            <h3>How I Solved It</h3>
                        </div>
                        <p className="modal-text">{project.howSolved}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline modal-footer-btn">
                        <Github size={16} /> Source Code
                    </a>
                    {project.live !== '#' && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary modal-footer-btn">
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
