import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

import natlefImg from '../assets/NatLef.png';
import mentorImg from '../assets/MentoConnect.png';
import quizImg from '../assets/GUI.png';
import mealImg from '../assets/GUI.png';

const projectsData = [
    {
        id: 1,
        title: 'NatLef Research',
        description: 'Led the end-to-end execution of a Product Portfolio Web Application. Structured frontend with React, built backend APIs with Node.js & MongoDB, and handled VPS deployment with SSL on Hostinger.',
        image: natlefImg,
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        github: 'https://github.com/Ankitmina25/NatLef-Research.git',
        live: 'https://www.natlefresearch.com/'
    },
    {
        id: 2,
        title: 'Mentor Connect',
        description: 'Full-stack mentorship platform with role-based auth, mentor discovery, session booking, real-time Socket.io chat, and a responsive UI enhanced with Spline 3D components.',
        image: mentorImg,
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        github: 'https://github.com/CodeWithRDX/MentorConnect.git',
        live: 'https://mentor-connect-puce.vercel.app/'
    },
    {
        id: 3,
        title: 'Quiz App',
        description: 'Java Swing-based Quiz Application integrated with MySQL. Features user login, dynamic question retrieval by subject, score tracking, timers, and full-screen mode.',
        image: quizImg,
        tags: ['Java', 'Swing', 'AWT', 'JDBC', 'MySQL'],
        github: 'https://github.com/CodeWithRDX/JavaQuizApp.git',
        live: '#'
    },
    {
        id: 4,
        title: 'Meal Planner',
        description: 'A meal planning and nutrition tracking web application featuring weekly calendar views, recipe suggestions, calorie counting, and a shopping list generator.',
        image: mealImg,
        tags: ['HTML', 'CSS', 'PHP', 'MySQL'],
        github: 'https://github.com/CodeWithRDX/meal-planner.git',
        live: '#'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title"><span>Featured Projects</span></h2>

                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card glass-panel animate-fade-in-up"
                            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                        >
                            <div className="project-image-container">
                                <img src={project.image} alt={project.title} className="project-image" />
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-bottom-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Github Repo" className="project-bottom-link">
                                        <Github size={18} /> GitHub
                                    </a>
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="project-bottom-link">
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
