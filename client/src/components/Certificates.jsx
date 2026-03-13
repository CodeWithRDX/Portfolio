import { ExternalLink, Award } from 'lucide-react';
import './Certificates.css';
import comp from '../assets/CompC.png';
import java from '../assets/JavaC.png';
import gui from '../assets/Guic.png';
import oop from '../assets/OOPC.png';
import dsa from '../assets/DsaC.png';

const certificatesData = [
    {
        id: 1,
        title: 'Compiler Design',
        issuer: 'NPTEL',
        date: 'Apr 2025',
        image: comp,
        link: 'https://drive.google.com/file/d/1lFuYipOjDihKCnkU8cV3CLOmva6R53xX/preview',
        viewLink: 'https://drive.google.com/file/d/1lFuYipOjDihKCnkU8cV3CLOmva6R53xX/view?usp=sharing',
        description: 'Completed an in-depth course on compiler design covering lexical analysis, syntax parsing, semantic analysis, intermediate code generation, optimization techniques, and code generation for target machines.',
    },
    {
        id: 2,
        title: 'JAVA Maestro: Hands on Training on Developing GUI',
        issuer: 'LPU',
        date: 'Jul 2025',
        image: gui,
        link: 'https://drive.google.com/file/d/1-cfZ5y_cW1EmhiANAk1xVV37966Ale7-/preview',
        viewLink: 'https://drive.google.com/file/d/1-cfZ5y_cW1EmhiANAk1xVV37966Ale7-/view?usp=sharing',
        description: 'Hands-on training in building graphical user interfaces using Java Swing and AWT, covering event handling, layout management, and interactive desktop application development.',
    },
    {
        id: 3,
        title: 'JAVA Programming',
        issuer: 'NeoColab',
        date: '2025',
        image: java,
        link: 'https://drive.google.com/file/d/1HI5c5KcJqFRER7fTBSumHj4sGXZPsUwE/preview',
        viewLink: 'https://drive.google.com/file/d/1HI5c5KcJqFRER7fTBSumHj4sGXZPsUwE/view?usp=drive_link',
        description: 'Certified in core Java programming including OOP principles, exception handling, multithreading, collections framework, file I/O, and building robust applications using Java SE.',
    },
    {
        id: 4,
        title: 'OOPS using C++ Programming',
        issuer: 'NeoColab',
        date: 'DEC 2024',
        image: oop,
        link: 'https://drive.google.com/file/d/1Dqdec8swQ2nOgkmkxtRQsV_CbYpxoUDh/preview',
        viewLink: 'https://drive.google.com/file/d/1Dqdec8swQ2nOgkmkxtRQsV_CbYpxoUDh/view?usp=drive_link',
        description: 'Mastered object-oriented programming concepts in C++ including classes, inheritance, polymorphism, encapsulation, abstraction, operator overloading, and template-based programming.',
    },
    {
        id: 5,
        title: 'Data Structures & Algorithms',
        issuer: 'NeoColab',
        date: 'DEC 2024',
        image: dsa,
        link: 'https://drive.google.com/file/d/14mJpbLqi-9teAI3yRRXpUvI6TTPlZDUH/preview',
        viewLink: 'https://drive.google.com/file/d/14mJpbLqi-9teAI3yRRXpUvI6TTPlZDUH/view?usp=drive_link',
        description: 'Comprehensive certification covering arrays, linked lists, stacks, queues, trees, graphs, sorting and searching algorithms, dynamic programming, and time/space complexity analysis.',
    },
];

const Certificates = () => {
    return (
        <section id="certificates" className="certificates-section">
            <div className="container">
                <h2 className="section-title"><span>Certificates</span></h2>

                <div className="certs-grid">
                    {certificatesData.map((cert, index) => (
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
            </div>
        </section>
    );
};

export default Certificates;
