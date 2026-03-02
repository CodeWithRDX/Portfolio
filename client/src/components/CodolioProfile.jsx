import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Trophy, Code2, Flame, RotateCcw } from 'lucide-react';
import './Codolio.css';

const CodolioProfile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const codolioStats = {
        platform: 'Codolio',
        username: '@codewithrdx',
        profileLink: 'https://codolio.com/profile/CodeWithRdx',
        rating: '1508',
        problemsSolved: '300+',
        streak: '45',
    };

    const leetcodeStats = {
        platform: 'LeetCode',
        username: '@codewithrdx',
        profileLink: 'https://leetcode.com/u/CodeWithRDX/',
        rating: '1508',
        problemsSolved: '250+',
        contests: '4',
    };

    return (
        <section id="coding-profile" className="codolio-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title"><span>Competitive Coding</span></h2>

                <div className="codolio-layout">
                    {/* Left side — info */}
                    <div className={`codolio-info ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <h3 className="codolio-heading">Consistent Problem Solver</h3>
                        <p className="codolio-desc">
                            Solved <strong>300+ DSA problems</strong> on LeetCode & GFG across arrays, recursion, dynamic programming, and graphs.
                        </p>
                        <p className="codolio-desc">
                            LeetCode BiWeekly Contest Rating: <strong>1508</strong>
                        </p>

                        <div className="codolio-highlights">
                            <div className="highlight-item">
                                <Trophy size={22} className="highlight-icon gold" />
                                <div>
                                    <span className="highlight-value">300+</span>
                                    <span className="highlight-label">DSA Problems Solved</span>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <Flame size={22} className="highlight-icon red" />
                                <div>
                                    <span className="highlight-value">1508</span>
                                    <span className="highlight-label">LeetCode Contest Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side — flippable card */}
                    <div className={`flip-card-container ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                            {/* Front — Codolio */}
                            <div className="flip-card-face flip-card-front glass-panel">
                                <div className="flip-card-header">
                                    <div className="flip-avatar codolio-gradient">
                                        <Code2 size={28} className="flip-avatar-icon" />
                                    </div>
                                    <div>
                                        <h4 className="flip-platform">{codolioStats.platform}</h4>
                                        <p className="flip-username gradient-text">{codolioStats.username}</p>
                                    </div>
                                </div>

                                <div className="flip-stats">
                                    <div className="flip-stat-item">
                                        <span className="flip-stat-value">{codolioStats.problemsSolved}</span>
                                        <span className="flip-stat-label">Solved</span>
                                    </div>
                                </div>

                                <a href={codolioStats.profileLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary flip-visit-btn" onClick={(e) => e.stopPropagation()}>
                                    Visit Profile <ExternalLink size={14} />
                                </a>

                                <div className="flip-hint">
                                    <RotateCcw size={14} /> Tap to see LeetCode
                                </div>
                            </div>

                            {/* Back — LeetCode */}
                            <div className="flip-card-face flip-card-back glass-panel">
                                <div className="flip-card-header">
                                    <div className="flip-avatar leetcode-gradient">
                                        <Code2 size={28} className="flip-avatar-icon" />
                                    </div>
                                    <div>
                                        <h4 className="flip-platform">{leetcodeStats.platform}</h4>
                                        <p className="flip-username gradient-text">{leetcodeStats.username}</p>
                                    </div>
                                </div>

                                <div className="flip-stats">
                                    <div className="flip-stat-item">
                                        <span className="flip-stat-value">{leetcodeStats.rating}</span>
                                        <span className="flip-stat-label">Contest Rating</span>
                                    </div>
                                    <div className="flip-stat-divider"></div>
                                    <div className="flip-stat-item">
                                        <span className="flip-stat-value">{leetcodeStats.problemsSolved}</span>
                                        <span className="flip-stat-label">Solved</span>
                                    </div>
                                </div>

                                <a href={leetcodeStats.profileLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary flip-visit-btn leetcode-btn" onClick={(e) => e.stopPropagation()}>
                                    Visit Profile <ExternalLink size={14} />
                                </a>

                                <div className="flip-hint">
                                    <RotateCcw size={14} /> Tap to see Codolio
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodolioProfile;
