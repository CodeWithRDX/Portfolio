import { useEffect, useState } from 'react';
import { ExternalLink, Github, Code2, Filter, Eye } from 'lucide-react';
import { projectsData } from '../components/Projects';
import ProjectModal from '../components/ProjectModal';
import './ProjectsPage.css';

const categories = ['All', ...new Set(projectsData.map(p => p.category))];

const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(projectsData);
        } else {
            setFilteredProjects(projectsData.filter(p => p.category === activeFilter));
        }
    }, [activeFilter]);

    return (
        <main className="projects-page">
            {/* Hero Banner */}
            <section className="pp-hero">
                <div className="container">
                    <div className="pp-hero-content animate-fade-in-up">
                        <h1 className="pp-hero-title">
                            My <span className="gradient-text">Projects</span>
                        </h1>
                        <p className="pp-hero-subtitle">
                            A collection of all my work — from full-stack web applications to desktop tools and competitive programming projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="pp-filter-section">
                <div className="container">
                    <div className="pp-filter-bar">
                        <Filter size={18} className="pp-filter-icon" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`pp-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Cards — Split Layout */}
            <section className="pp-projects-section">
                <div className="container">
                    <div className="pp-list">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="pp-split-card glass-panel animate-fade-in-up"
                                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                            >
                                {/* Top — Preview */}
                                <div className="pp-preview-side">
                                    {project.live !== '#' ? (
                                        <div className="pp-frame-container">
                                            <div className="pp-browser-bar">
                                                <div className="pp-browser-dots">
                                                    <span className="pp-dot red" />
                                                    <span className="pp-dot yellow" />
                                                    <span className="pp-dot green" />
                                                </div>
                                                <div className="pp-url-bar">
                                                    <span>{project.live.replace('https://', '')}</span>
                                                </div>
                                            </div>
                                            <div className="pp-iframe-scroll">
                                                <iframe
                                                    src={project.live}
                                                    title={`${project.title} preview`}
                                                    className="pp-iframe"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="pp-live-badge">
                                                <span className="pp-live-dot" /> Live
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="pp-img-container">
                                            <img src={project.image} alt={project.title} className="pp-img" />
                                        </div>
                                    )}
                                </div>

                                {/* Bottom — Info */}
                                <div className="pp-info-side">
                                    <div className="pp-info-top">
                                        <span className="pp-cat-badge">{project.category}</span>
                                        <h3 className="pp-card-title">{project.title}</h3>
                                        <p className="pp-card-desc">{project.description}</p>
                                        <div className="pp-card-tags">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="pp-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pp-card-actions">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline pp-action-btn"
                                        >
                                            <Github size={16} /> Source Code
                                        </a>
                                        {project.live !== '#' && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary pp-action-btn"
                                            >
                                                <ExternalLink size={16} /> Live Demo
                                            </a>
                                        )}
                                        <button
                                            className="btn btn-outline pp-action-btn pp-details-btn"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            <Eye size={16} /> Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="pp-empty">
                            <Code2 size={48} />
                            <p>No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </main>
    );
};

export default ProjectsPage;
