import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, MapPin, BookOpen, Award, Calendar, Code2, Server, Database, Smartphone, CheckCircle } from 'lucide-react';
import img from '../assets/Img.png';
import Certificates from '../components/Certificates';
import './AboutPage.css';
import { useNavigate } from 'react-router-dom';

const educationData = [
    {
        id: 1,
        degree: 'B.Tech in Computer Science',
        institution: 'Lovely Professional University (LPU)',
        year: '2024 - 2027 (Pursuing)',
        description: 'Currently pursuing B.Tech with 8+ CGPA. Specializing in Software Engineering and participating in hackathons to build real-world products.',
        icon: <BookOpen className="about-timeline-icon" size={22} />,
    },
    {
        id: 2,
        degree: 'Polytechnic Diploma',
        institution: 'Government Polytechnic, Muzaffarpur',
        year: '2020 - 2023',
        description: 'Completed diploma with 8+ CGPA. Built a strong foundation in programming, databases, and computer science fundamentals.',
        icon: <Award className="about-timeline-icon" size={22} />,
    },
    {
        id: 3,
        degree: 'Matriculation',
        institution: 'R.K.S.G.S. High School, Baradaud',
        year: '2020',
        description: 'Completed matriculation with 79%. Discovered an early passion for technology and logical problem solving.',
        icon: <Calendar className="about-timeline-icon" size={22} />,
    },
];

const skills = [
    'Java', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js',
    'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
    'Tailwind CSS', 'Git & GitHub', 'Docker', 'AWS (Basics)'
];

const WhatIDo = [
    {
        title: 'Frontend Development',
        desc: 'Crafting responsive, accessible, and performant web interfaces using React.js and modern CSS architecture.',
        icon: <Smartphone size={24} className="what-i-do-icon" />
    },
    {
        title: 'Backend Engineering',
        desc: 'Designing scalable APIs, complex background jobs, and microservices architecture using Node.js and Express.',
        icon: <Server size={24} className="what-i-do-icon" />
    },
    {
        title: 'Database Design',
        desc: 'Architecting normalized SQL and schema-flexible NoSQL databases for high read/write performance.',
        icon: <Database size={24} className="what-i-do-icon" />
    },
    {
        title: 'Competitive Programming',
        desc: 'Writing optimized algorithms & data structures focusing on time and space complexity constraints.',
        icon: <Code2 size={24} className="what-i-do-icon" />
    }
];

const AboutPage = () => {
    const navigate = useNavigate();
    const skillsRef = useRef(null);
    const [skillsInView, setSkillsInView] = useState(false);
    const [codingStats, setCodingStats] = useState({ lcSolved: 0, lcRating: 0, gfgSolved: 0, gfgScore: 0, loading: true });

    useEffect(() => {
        window.scrollTo({ top: 0 });
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setSkillsInView(true);
            }
        }, { threshold: 0.2 });
        
        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }
        
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchCodingStats = async () => {
             try {
                 const [lcRes, gfgRes] = await Promise.all([
                     fetch('/proxy/lc/user/leetcode/codewithrdx/'),
                     fetch('/proxy/gfg/codewithrdx?raw=true')
                 ]);
                 const lcData = await lcRes.json();
                 const gfgData = await gfgRes.json();
                 
                 const lcTotal = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 250;
                 const lcRating = Math.round(lcData?.data?.userContestRanking?.rating || 1500);
                 const gfgTotal = gfgData?.total_problems_solved || 0;
                 const gfgScore = gfgData?.total_score || 0;
                 
                 setCodingStats({ lcSolved: lcTotal, lcRating, gfgSolved: gfgTotal, gfgScore, loading: false });
             } catch(err) {
                 console.error(err);
                 setCodingStats(prev => ({ ...prev, loading: false }));
             }
        };
        fetchCodingStats();
    }, []);

    const handleLetsTalk = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    // Generate random scatter transforms for initial state
    const getScatterTransform = (index) => {
        if (skillsInView) return 'translate(0, 0) scale(1) rotate(0)';
        
        const angle = (index * 137.5) % 360; // Golden angle for even distribution
        const distance = 150 + Math.random() * 200; // Random distance
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        const rotation = (Math.random() - 0.5) * 90; // Random initial rotation
        
        return `translate(${x}px, ${y}px) scale(0.5) rotate(${rotation}deg)`;
    };

    return (
        <main className="about-page">
            <div className="container about-split-layout">
                
                {/* LEFT: Sticky Sidebar */}
                <aside className="about-sidebar">
                    <div className="about-sidebar-inner glass-panel animate-fade-in-up">
                        <div className="about-img-wrapper">
                            <div className="about-img-glow" />
                            <img src={img} alt="Raushan Kumar" className="about-portrait" />
                        </div>
                        
                        <div className="about-sidebar-info">
                            <span className="about-badge">
                                <MapPin size={14} /> Bihar, India
                            </span>
                            <h1 className="about-name">
                                Raushan <span className="gradient-text">Kumar</span>
                            </h1>
                            <p className="about-role">Software Engineer & Full Stack Developer</p>
                            
                            <div className="about-socials">
                                <a href="https://github.com/CodeWithRDX" target="_blank" rel="noopener noreferrer" className="about-social-link glass-panel" aria-label="GitHub">
                                    <Github size={20} />
                                </a>
                                <a href="https://www.linkedin.com/in/raushankumar1/" target="_blank" rel="noopener noreferrer" className="about-social-link glass-panel" aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://x.com/Raushan70138257" target="_blank" rel="noopener noreferrer" className="about-social-link glass-panel" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                            </div>

                            <button onClick={handleLetsTalk} className="btn btn-primary" style={{ width: '100%', margin: '1.5rem auto 0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                Let's Talk <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* RIGHT: Scrollable Content */}
                <div className="about-content">
                    
                    {/* Bio Section */}
                    <section className="about-section animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="section-title left-align"><span>About Me</span></h2>
                        <div className="about-text-content">
                            <p className="about-bio-lead">
                                I am an ambitious Software Engineer specializing in full-stack web development and high-performance algorithms.
                            </p>
                            <p>
                                With rigorous daily practice in Data Structures and Algorithms combined with hands-on production application development, I bridge the gap between theoretical computer science and practical software architecture.
                            </p>
                            <p>
                                I am currently pursuing my B.Tech in Computer Science at LPU while independently learning scalable system architectures. I love diving deep into the V8 engine, optimizing React renders, and crafting efficient database queries. When I'm not coding, I enjoy studying tech business strategies and reading engineering blogs from top companies.
                            </p>
                            
                            <div className="about-soft-skills">
                                <div className="soft-skill"><CheckCircle size={16} className="text-accent" /> Strong Problem Solving</div>
                                <div className="soft-skill"><CheckCircle size={16} className="text-accent" /> System Architecture Focus</div>
                                <div className="soft-skill"><CheckCircle size={16} className="text-accent" /> Agile & Scrum Team Player</div>
                                <div className="soft-skill"><CheckCircle size={16} className="text-accent" /> Rapid Self-Learning</div>
                            </div>
                        </div>
                    </section>

                    {/* What I Do Section */}
                    <section className="about-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h2 className="section-title left-align"><span>What I Do</span></h2>
                        <div className="what-i-do-grid">
                            {WhatIDo.map((item, idx) => (
                                <div key={idx} className="what-i-do-card glass-panel">
                                    <div className="what-i-do-header">
                                        {item.icon}
                                        <h3>{item.title}</h3>
                                    </div>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section ref={skillsRef} className="about-section about-skills-container">
                        <h2 className="section-title left-align"><span>Technical Stack</span></h2>
                        <div className={`about-skills-scatter ${skillsInView ? 'in-view' : ''}`}>
                            {skills.map((skill, i) => (
                                <span 
                                    key={skill} 
                                    className="about-skill-chip glass-panel"
                                    style={{ 
                                        transform: getScatterTransform(i),
                                        opacity: skillsInView ? 1 : 0,
                                        transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.05}s`
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="about-section about-education-section animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h2 className="section-title left-align"><span>Education Journey</span></h2>
                        <div className="about-timeline">
                            {educationData.map((item, index) => (
                                <div key={item.id} className="about-timeline-item">
                                    <div className="about-timeline-marker">
                                        <div className="about-timeline-dot glass-panel">
                                            {item.icon}
                                        </div>
                                        {index !== educationData.length - 1 && <div className="about-timeline-line" />}
                                    </div>
                                    <div className="about-timeline-card glass-panel">
                                        <span className="about-timeline-year gradient-text">{item.year}</span>
                                        <h3 className="about-timeline-degree">{item.degree}</h3>
                                        <h4 className="about-timeline-institution">{item.institution}</h4>
                                        <p className="about-timeline-desc">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Coding Stats Section */}
                    <section className="about-section about-coding-section animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <h2 className="section-title left-align"><span>Competitive Coding</span></h2>
                        <div className="about-coding-grid">
                            <div className="about-coding-card glass-panel">
                                <div className="coding-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                                    <Code2 size={28} color="#fff" />
                                </div>
                                <h3>LeetCode</h3>
                                <div className="coding-card-stats">
                                    <div><span className="coding-stat-num">{codingStats.loading ? '...' : `${codingStats.lcSolved}+`}</span><span className="coding-stat-lbl">Solved</span></div>
                                    <div><span className="coding-stat-num">{codingStats.loading ? '...' : codingStats.lcRating}</span><span className="coding-stat-lbl">Rating</span></div>
                                </div>
                                <a href="https://leetcode.com/u/CodeWithRDX/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                    Visit Profile
                                </a>
                            </div>

                            <div className="about-coding-card glass-panel">
                                <div className="coding-card-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                                    <Code2 size={28} color="#fff" />
                                </div>
                                <h3>GeeksforGeeks</h3>
                                <div className="coding-card-stats">
                                    <div><span className="coding-stat-num">{codingStats.loading ? '...' : `${codingStats.gfgSolved}+`}</span><span className="coding-stat-lbl">Solved</span></div>
                                    <div><span className="coding-stat-num">{codingStats.loading ? '...' : codingStats.gfgScore}</span><span className="coding-stat-lbl">Score</span></div>
                                </div>
                                <a href="https://auth.geeksforgeeks.org/user/codewithrdx/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                    Visit Profile
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Integrated Certificates */}
                    <div className="about-section animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <Certificates />
                    </div>

                </div>
            </div>
        </main>
    );
};

export default AboutPage;
