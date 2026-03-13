import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectModal from './ProjectModal';
import './Projects.css';

import natlefImg from '../assets/NatLef.png';
import mentorImg from '../assets/MentoConnect.png';
import quizImg from '../assets/GUI.png';
import mealImg from '../assets/meal.png';

export const projectsData = [
    {
        id: 1,
        title: 'NatLef Research',
        description: 'Led the end-to-end execution of a Product Portfolio Web Application. Structured frontend with React, built backend APIs with Node.js & MongoDB, and handled VPS deployment with SSL on Hostinger.',
        image: natlefImg,
        tags: ['MongoDB', 'Express', 'React', 'Node.js'],
        github: 'https://github.com/Ankitmina25/NatLef-Research.git',
        live: 'https://www.natlefresearch.com/',
        category: 'Full Stack',
        problemStatement: 'NatLef Research needed a professional web presence to showcase their product portfolio, research papers, and team information. They required a modern, SEO-optimized website with content management capabilities and secure hosting.',
        detailedExplanation: 'Built a complete product portfolio web application from scratch using the MERN stack. The frontend is structured with React and features a responsive design with dynamic routing. The backend uses Node.js with Express for RESTful APIs and MongoDB for data persistence. Implemented SEO optimization, meta tags, and structured data for better search engine visibility.',
        howSolved: 'Designed the architecture with a clear separation of concerns — React SPA for the frontend, Express API server, and MongoDB Atlas for the database. Deployed the application on a Hostinger VPS with Nginx reverse proxy, SSL certificates via Let\'s Encrypt, and configured CI/CD for seamless updates. Optimized images and implemented lazy loading for fast page loads.',
    },
    {
        id: 2,
        title: 'Mentor Connect',
        description: 'Full-stack mentorship platform with role-based auth, mentor discovery, session booking, real-time Socket.io chat, and a responsive UI enhanced with Spline 3D components.',
        image: mentorImg,
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
        github: 'https://github.com/CodeWithRDX/MentorConnect.git',
        live: 'https://mentor-connect-puce.vercel.app/',
        category: 'Full Stack',
        problemStatement: 'Students often struggle to find the right mentors for guidance. There was a need for a platform that connects mentors and mentees seamlessly with real-time communication, session management, and role-based access.',
        detailedExplanation: 'Developed a full-stack mentorship platform featuring JWT-based role authentication (mentor/mentee), a mentor discovery system with filters, session booking with calendar integration, and real-time messaging using Socket.io. The UI incorporates Spline 3D elements for a premium feel and is fully responsive across all devices.',
        howSolved: 'Implemented role-based authentication with JWT tokens and middleware guards. Built a real-time chat system using Socket.io with message persistence in MongoDB (TTL-based auto-cleanup). Created a mentor search system with category filters and rating system. Deployed on Vercel with serverless functions for the backend API.',
    },
    {
        id: 3,
        title: 'Quiz App',
        description: 'Java Swing-based Quiz Application integrated with MySQL. Features user login, dynamic question retrieval by subject, score tracking, timers, and full-screen mode.',
        image: quizImg,
        tags: ['Java', 'Swing', 'AWT', 'JDBC', 'MySQL'],
        github: 'https://github.com/CodeWithRDX/JavaQuizApp.git',
        live: '#',
        category: 'Desktop',
        problemStatement: 'Educational institutions needed a desktop-based quiz application that could dynamically load questions from a database, support multiple subjects, track scores, and enforce time limits — all without requiring an internet connection.',
        detailedExplanation: 'Built a desktop quiz application using Java Swing for the GUI and MySQL for question storage. The app features a secure login system, subject-wise question retrieval using JDBC, a countdown timer for each question, real-time score tracking, and a results dashboard. The full-screen mode prevents tab-switching during exams.',
        howSolved: 'Used Java Swing with custom-painted components for a polished UI. Connected to MySQL via JDBC with prepared statements for SQL injection prevention. Implemented a timer using javax.swing.Timer. Built a modular architecture with separate classes for authentication, question management, and scoring logic.',
    },
    {
        id: 4,
        title: 'Meal Planner',
        description: 'A meal planning and nutrition tracking web application featuring weekly calendar views, recipe suggestions, calorie counting, and a shopping list generator.',
        image: mealImg,
        tags: ['HTML', 'CSS', 'PHP', 'MySQL'],
        github: 'https://github.com/CodeWithRDX/meal-planner.git',
        live: '#',
        category: 'Web',
        problemStatement: 'People often struggle with meal planning and nutrition tracking. A simple web tool was needed that lets users plan weekly meals, count calories, get recipe suggestions, and auto-generate shopping lists based on their meal plan.',
        howSolved: 'Built the backend with PHP using an MVC-like structure. Designed a normalized MySQL schema for recipes, ingredients, meal plans, and user data. Implemented AJAX-based interactions for a smooth UX without full page reloads. Used CSS Grid for the calendar layout and responsive design for mobile support.',
    },
    {
        id: 5,
        title: 'Weather App',
        description: 'A responsive weather dashboard showing current conditions and forecasts using an external Weather API.',
        image: 'https://images.unsplash.com/photo-1504608524841-42ce6c20a016?q=80&w=2000&auto=format&fit=crop',
        tags: ['HTML', 'CSS', 'JavaScript', 'API'],
        github: '#',
        live: '#',
        category: 'Mini Projects',
        problemStatement: 'Need a quick way to check weather without bloated apps.',
        detailedExplanation: 'Built a lightweight weather dashboard using vanilla JavaScript to fetch real-time data from OpenWeatherMap API.',
        howSolved: 'Used Fetch API for asynchronous data fetching and CSS Grid for layout.',
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title"><span>Featured Projects</span></h2>

                <div className="projects-list">
                    {projectsData.slice(0, 4).map((project, index) => (
                        <div
                            key={project.id}
                            className="project-split-card glass-panel animate-fade-in-up"
                            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                        >
                            {/* Left — Description */}
                            <div className="project-info-side">
                                <div className="project-info-top">
                                    <span className="project-category-tag">{project.category}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-tags">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="project-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="project-actions">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline project-action-btn">
                                        <Github size={16} /> Source Code
                                    </a>
                                    {project.live !== '#' && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary project-action-btn">
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                    )}
                                    <button className="btn btn-outline project-action-btn project-details-btn" onClick={() => setSelectedProject(project)}>
                                        <Eye size={16} /> Details
                                    </button>
                                </div>
                            </div>

                            {/* Right — Live Preview */}
                            <div className="project-preview-side">
                                {project.live !== '#' ? (
                                    <div className="preview-frame-container">
                                        <div className="preview-browser-bar">
                                            <div className="browser-dots">
                                                <span className="dot red" />
                                                <span className="dot yellow" />
                                                <span className="dot green" />
                                            </div>
                                            <div className="browser-url-bar">
                                                <span>{project.live.replace('https://', '')}</span>
                                            </div>
                                        </div>
                                        <div className="preview-iframe-wrap">
                                            <iframe
                                                src={project.live}
                                                title={`${project.title} preview`}
                                                className="preview-iframe"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="preview-live-badge">
                                            <span className="live-dot" /> Live
                                        </div>
                                    </div>
                                ) : (
                                    <div className="preview-image-wrap">
                                        <img src={project.image} alt={project.title} className="preview-image" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-view-all">
                    <Link to="/projects" className="btn btn-outline view-all-btn">
                        View All Projects <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
};

export default Projects;
