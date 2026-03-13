import { ExternalLink, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Certificates.css';
import comp from '../assets/CompC.png';
import java from '../assets/JavaC.png';
import gui from '../assets/Guic.png';
import oop from '../assets/OOPC.png';
import dsa from '../assets/DsaC.png';
import llm from '../assets/llm.png';
import logic from '../assets/logic.png';
import master from '../assets/master.png';
import gen from '../assets/gen.png';
import gpt from '../assets/gpt.png';
import hard from '../assets/hard.png';
import lara from '../assets/laravel.png';

// Helper to parse a date string like "Apr 2025", "DEC 2024", "MAR 2026" into a Date
const parseDate = (dateStr) => {
    const normalized = dateStr.trim();
    const parsed = new Date(`${normalized} 1`); // e.g. "Apr 2025 1"
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

const certificatesData = [
    {
        id: 1,
        title: 'Compiler Design',
        issuer: 'NPTEL',
        date: 'Apr 2025',
        image: comp,
        viewLink: 'https://drive.google.com/file/d/1lFuYipOjDihKCnkU8cV3CLOmva6R53xX/view?usp=sharing',
        description: 'Completed an in-depth course on compiler design covering lexical analysis, syntax parsing, semantic analysis, intermediate code generation, optimization techniques, and code generation for target machines.',
    },
    {
        id: 2,
        title: 'JAVA Maestro: Hands on Training on Developing GUI',
        issuer: 'LPU',
        date: 'Jul 2025',
        image: gui,
        viewLink: 'https://drive.google.com/file/d/1-cfZ5y_cW1EmhiANAk1xVV37966Ale7-/view?usp=sharing',
        description: 'Hands-on training in building graphical user interfaces using Java Swing and AWT, covering event handling, layout management, and interactive desktop application development.',
    },
    {
        id: 3,
        title: 'JAVA Programming',
        issuer: 'NeoColab',
        date: 'May 2025',
        image: java,
        viewLink: 'https://drive.google.com/file/d/1HI5c5KcJqFRER7fTBSumHj4sGXZPsUwE/view?usp=drive_link',
        description: 'Certified in core Java programming including OOP principles, exception handling, multithreading, collections framework, file I/O, and building robust applications using Java SE.',
    },
    {
        id: 4,
        title: 'OOPS using C++ Programming',
        issuer: 'NeoColab',
        date: 'Dec 2024',
        image: oop,
        viewLink: 'https://drive.google.com/file/d/1Dqdec8swQ2nOgkmkxtRQsV_CbYpxoUDh/view?usp=drive_link',
        description: 'Mastered object-oriented programming concepts in C++ including classes, inheritance, polymorphism, encapsulation, abstraction, operator overloading, and template-based programming.',
    },
    {
        id: 5,
        title: 'Data Structures & Algorithms',
        issuer: 'NeoColab',
        date: 'Dec 2024',
        image: dsa,
        viewLink: 'https://drive.google.com/file/d/14mJpbLqi-9teAI3yRRXpUvI6TTPlZDUH/view?usp=drive_link',
        description: 'Comprehensive certification covering arrays, linked lists, stacks, queues, trees, graphs, sorting and searching algorithms, dynamic programming, and time/space complexity analysis.',
    },
    {
        id: 6,
        title: 'Master Generative AI & Generative AI Tools',
        issuer: 'Infosys',
        date: 'Aug 2025',
        image: master,
        viewLink: 'https://drive.google.com/file/d/1sXKjKi8dwQ3Ohz1KNA5RR7DTgQN78GaT/view?usp=drive_link',
        description: 'Successfully completed the "Master Generative AI & Generative AI Tools (ChatGPT & More)" course from Infosys Springboard. This course provided hands-on knowledge of Generative AI technologies and modern AI tools, focusing on practical applications using tools like ChatGPT and other AI-powered platforms.',
    },
    {
        id: 7,
        title: 'Build Generative AI Apps and Solutions with No-Code Tools',
        issuer: 'Infosys',
        date: 'Aug 2025',
        image: gen,
        viewLink: 'https://drive.google.com/file/d/1yaV3ZGD346IEXfNtT1YDbuaxIfO59qj3/view?usp=drive_link',
        description: 'Successfully completed the "Build Generative AI Apps and Solutions with No-Code Tools" course from Infosys Springboard. This course introduced me to building Generative AI powered applications using no-code platforms, understanding AI workflows, and designing practical AI solutions without heavy programming.',
    },
    {
        id: 8,
        title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
        issuer: 'Infosys',
        date: 'Aug 2025',
        image: gpt,
        viewLink: 'https://drive.google.com/file/d/1ZOTlfb8x1TPWCW8nGaGarf2pu-uNT3gI/view?usp=drive_link',
        description: 'Completed "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM" through Infosys Springboard. This course strengthened my understanding of prompt engineering techniques and Large Language Models (LLMs) to effectively interact with AI systems.'
    },
    {
        id: 9,
        title: 'Computational Theory: Language Principle & Finite Automata Theory',
        issuer: 'Infosys',
        date: 'Aug 2025',
        image: llm,
        viewLink: 'https://drive.google.com/file/d/1bNaol-Bl6uy_n1lGkse0PQcRJejCjT_9/view?usp=drive_link',
        description: 'Completed "Computational Theory: Language Principle & Finite Automata Theory" through Infosys Springboard. This course covered the theoretical foundation of computer science including formal languages, automata theory, and computational models.'
    },
    {
        id: 10,
        title: 'Digital Systems: From Logic Gates to Processors',
        issuer: 'Coursera',
        date: 'Sep 2024',
        image: logic,
        viewLink: 'https://drive.google.com/file/d/1HjThsb1v9AMv0lVdNjzo7mSA7qKv7d_p/view?usp=drive_link',
        description: 'Completed "Digital Systems: From Logic Gates to Processors" through Coursera. This course provided a strong foundation in digital electronics and computer architecture, starting from logic gates to modern processor design.'
    },
    {
        id: 11,
        title: 'Introduction to Hardware and Operating Systems',
        issuer: 'Coursera',
        date: 'Sep 2024',
        image: hard,
        viewLink: 'https://drive.google.com/file/d/1t4_GpcARocPjTCBaUGTLDXVlALlNbvyx/view?usp=drive_link',
        description: 'Completed the "Introduction to Hardware and Operating Systems" course by IBM Skills Network through Coursera. This course helped me understand the core architecture of computers and the role of operating systems in managing hardware resources.'
    },
    {
        id: 12,
        title: 'PHP with Laravel for beginners - Become a Master in Laravel',
        issuer: 'Udemy',
        date: 'Mar 2026',
        image: lara,
        viewLink: 'https://drive.google.com/file/d/1MTfigGpGHrEIq2pNPVngup7tLhcT5HOt/view?usp=drive_link',
        description: 'Successfully completed the "PHP with Laravel for Beginners – Become a Master in Laravel" course on Udemy. This course helped me build a strong foundation in PHP and the Laravel framework, focusing on developing dynamic and scalable web applications using modern backend development practices.'
    },
];

// Sort certificates: newest first
const sortedCertificates = [...certificatesData].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
);

const HOMEPAGE_LIMIT = 6;

const Certificates = ({ homepageMode = false }) => {
    const navigate = useNavigate();
    const displayCerts = homepageMode ? sortedCertificates.slice(0, HOMEPAGE_LIMIT) : sortedCertificates;

    const handleViewAll = () => {
        navigate('/about');
        // Small delay to let the page load, then scroll to certificates section
        setTimeout(() => {
            const el = document.getElementById('certificates');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return (
        <section id="certificates" className="certificates-section">
            <div className="container">
                <h2 className="section-title"><span>Certificates</span></h2>

                <div className="certs-grid">
                    {displayCerts.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="cert-card glass-panel animate-fade-in-up"
                            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                        >
                            <div className="cert-card-preview">
                                {cert.image ? (
                                    <img
                                        src={cert.image}
                                        alt={`${cert.title} certificate`}
                                        className="cert-preview-img"
                                    />
                                ) : (
                                    <div className="cert-card-icon-placeholder">
                                        <Award size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="cert-card-content">
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-issuer">
                                    {cert.issuer} • <span className="cert-date">{cert.date}</span>
                                </p>
                                <p className="cert-desc">{cert.description}</p>
                            </div>
                            <div className="cert-card-actions">
                                {cert.viewLink && (
                                    <a
                                        href={cert.viewLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary cert-btn"
                                    >
                                        <ExternalLink size={14} /> View
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {homepageMode && (
                    <div className="certs-view-all-wrapper">
                        <button className="btn btn-outline certs-view-all-btn" onClick={handleViewAll}>
                            View All Certificates ({sortedCertificates.length})
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certificates;
