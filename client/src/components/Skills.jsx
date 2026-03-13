import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Skills.css';

const skillsData = [
    {
        category: 'Languages',
        items: [
            { name: 'Java', level: 'Advanced', highlight: true },
            { name: 'C++', level: 'Advanced', highlight: true },
            { name: 'JavaScript', level: 'Advanced', highlight: true },
            { name: 'C', level: 'Intermediate', highlight: false },
            { name: 'Python', level: 'Intermediate', highlight: false }
        ]
    },
    {
        category: 'Frameworks & Libraries',
        items: [
            { name: 'React', level: 'Advanced', highlight: true },
            { name: 'Node.js & Express', level: 'Advanced', highlight: true },
            { name: 'Tailwind CSS', level: 'Advanced', highlight: false },
            { name: 'HTML & CSS', level: 'Advanced', highlight: false },
            { name: 'PHP', level: 'Intermediate', highlight: false }
        ]
    },
    {
        category: 'Databases & Tools',
        items: [
            { name: 'MySQL', level: 'Advanced', highlight: true },
            { name: 'MongoDB', level: 'Advanced', highlight: true },
            { name: 'PostgreSQL', level: 'Intermediate', highlight: false },
            { name: 'Git & GitHub', level: 'Advanced', highlight: true },
            { name: 'VS Code / IntelliJ', level: 'Advanced', highlight: false }
        ]
    },
    {
        category: 'Core Subjects',
        items: [
            { name: 'Data Structures & Algorithms', level: 'Advanced', highlight: true },
            { name: 'DBMS', level: 'Advanced', highlight: true },
            { name: 'Operating Systems', level: 'Intermediate', highlight: false },
            { name: 'Computer Networks', level: 'Intermediate', highlight: false },
            { name: 'OOP Concepts', level: 'Advanced', highlight: true }
        ]
    }
];

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Scatter transform mirrors the About page animation:
    // items start randomly displaced and fly into position on scroll-in
    const getScatterTransform = (index) => {
        if (isVisible) return 'translate(0, 0) scale(1) rotate(0deg)';
        const angle = (index * 137.5) % 360;
        const distance = 120 + (index % 5) * 40;
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;
        const rotation = ((index % 7) - 3) * 15;
        return `translate(${x}px, ${y}px) scale(0.5) rotate(${rotation}deg)`;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="skills-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title"><span>Technical Expertise</span></h2>

                <div className={`skills-container-detailed ${isVisible ? 'skills-in-view' : ''}`}>
                    {(() => {
                        let globalItemIndex = 0;
                        return skillsData.map((skillGroup, groupIndex) => (
                            <div
                                key={skillGroup.category}
                                className={`skill-card-detailed glass-panel ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: isVisible ? `${0.15 * (groupIndex + 1)}s` : '0s' }}
                            >
                                <h3 className="skill-category-title gradient-text">{skillGroup.category}</h3>

                                <ul className="skills-detailed-list">
                                    {skillGroup.items.map((skill, index) => {
                                        const itemIdx = globalItemIndex++;
                                        return (
                                            <li
                                                key={skill.name}
                                                className="skill-row"
                                                style={{
                                                    transform: getScatterTransform(itemIdx),
                                                    opacity: isVisible ? 1 : 0,
                                                    transition: `all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.15 * (groupIndex + 1) + 0.07 * index}s`,
                                                }}
                                            >
                                                <div className="skill-info">
                                                    <CheckCircle2 size={18} className={`skill-icon ${skill.highlight ? 'icon-highlight' : ''}`} />
                                                    <span className="skill-name">{skill.name}</span>
                                                </div>
                                                <span className="skill-level">{skill.level}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ));
                    })()}
                </div>
            </div>
        </section>
    );
};

export default Skills;
