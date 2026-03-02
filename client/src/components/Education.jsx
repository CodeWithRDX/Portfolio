import { BookOpen, Award, Calendar } from 'lucide-react';
import './Education.css';

const educationData = [
    {
        id: 1,
        degree: 'B.Tech in Computer Science',
        institution: 'Lovely Professional University (LPU)',
        year: '2024 - 2027 (Pursuing)',
        description: 'Currently pursuing B.Tech with 8+ CGPA. Focused on full-stack development, data structures & algorithms, and system design.',
        icon: <BookOpen className="timeline-icon" size={24} />
    },
    {
        id: 2,
        degree: 'Polytechnic Diploma',
        institution: 'Government Polytechnic, Muzaffarpur',
        year: '2020 - 2023',
        description: 'Completed diploma with 8+ CGPA. Built a strong foundation in programming, databases, and computer fundamentals.',
        icon: <Award className="timeline-icon" size={24} />
    },
    {
        id: 3,
        degree: 'Matriculation',
        institution: 'R.K.S.G.S. High School, Baradaud',
        year: '2020',
        description: 'Completed matriculation with 79%. Developed early interest in technology and problem solving.',
        icon: <Calendar className="timeline-icon" size={24} />
    }
];

const Education = () => {
    return (
        <section id="education" className="education-section">
            <div className="container">
                <h2 className="section-title"><span>Education & Qualification</span></h2>

                <div className="timeline-container">
                    {educationData.map((item, index) => (
                        <div
                            key={item.id}
                            className="timeline-item animate-fade-in-up"
                            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                        >
                            <div className="timeline-marker">
                                <div className="timeline-icon-wrapper glass-panel">
                                    {item.icon}
                                </div>
                                {index !== educationData.length - 1 && <div className="timeline-line"></div>}
                            </div>

                            <div className="timeline-content glass-panel">
                                <span className="timeline-year gradient-text">{item.year}</span>
                                <h3 className="timeline-degree">{item.degree}</h3>
                                <h4 className="timeline-institution">{item.institution}</h4>
                                <p className="timeline-description">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
