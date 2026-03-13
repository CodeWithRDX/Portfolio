import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code2, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Codolio.css';

const CodolioProfile = () => {
    const [isVisible, setIsVisible] = useState(false);
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

    // Stats data for the graphs
    const problemBreakdown = [
        { label: 'Easy', value: 120, max: 400, color: '#22c55e' },
        { label: 'Medium', value: 140, max: 400, color: '#f59e0b' },
        { label: 'Hard', value: 40, max: 400, color: '#ef4444' },
    ];

    const platformStats = [
        {
            platform: 'LeetCode',
            username: '@codewithrdx',
            profileLink: 'https://leetcode.com/u/CodeWithRDX/',
            solved: 250,
            rating: 1508,
            contests: 4,
            gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#f59e0b',
        },
        {
            platform: 'Codolio',
            username: '@codewithrdx',
            profileLink: 'https://codolio.com/profile/CodeWithRdx',
            solved: 400,
            rating: null,
            contests: null,
            gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: '#3b82f6',
        },
    ];

    // Mock Historical Data for Area Chart (Problems Solved / Progress)
    const historicalProgressData = [
        { month: 'Oct', solved: 45, rating: 1350 },
        { month: 'Nov', solved: 90, rating: 1400 },
        { month: 'Dec', solved: 150, rating: 1420 },
        { month: 'Jan', solved: 210, rating: 1480 },
        { month: 'Feb', solved: 260, rating: 1495 },
        { month: 'Mar', solved: 400, rating: 1508 },
    ];

    // Custom Tooltip for the Recharts graph to match the site's dark glassmorphism theme
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip glass-panel" style={{ padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="chart-tooltip-label" style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ margin: '4px 0 0 0', color: entry.color, fontSize: '0.9rem', fontWeight: 500 }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <section id="coding-profile" className="codolio-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title"><span>Competitive Coding</span></h2>

                <div className={`coding-dashboard ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    {/* Row 1: Main Ring Chart + Stats Summary */}
                    <div className="dashboard-top">
                        {/* Chart 1: Problems Solved */}
                        <div className="interactive-chart-card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 className="chart-card-title">Problems Journey</h3>
                            <div className="recharts-wrapper" style={{ width: '100%', marginTop: '1rem', flex: 1 }}>
                                {isVisible && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={historicalProgressData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="left" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area yAxisId="left" type="monotone" dataKey="solved" name="Problems Solved" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSolved)" activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        {/* Chart 2: Contest Rating */}
                        <div className="interactive-chart-card glass-panel" style={{ display: 'flex', flexDirection: 'column', animationDelay: '0.1s' }}>
                            <h3 className="chart-card-title">Contest Rating</h3>
                            <div className="recharts-wrapper" style={{ width: '100%', marginTop: '1rem', flex: 1 }}>
                                {isVisible && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={historicalProgressData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                            <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis yAxisId="right" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area yAxisId="right" type="monotone" dataKey="rating" name="Contest Rating" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="stats-summary">
                            <div className="stat-card glass-panel" style={{ animationDelay: '0.1s' }}>
                                <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                                    <TrendingUp size={22} color="#fff" />
                                </div>
                                <div className="stat-card-info">
                                    <span className="stat-card-value">1508</span>
                                    <span className="stat-card-label">Contest Rating</span>
                                </div>
                            </div>
                            <div className="stat-card glass-panel" style={{ animationDelay: '0.2s' }}>
                                <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                                    <Code2 size={22} color="#fff" />
                                </div>
                                <div className="stat-card-info">
                                    <span className="stat-card-value">4</span>
                                    <span className="stat-card-label">Contests Participated</span>
                                </div>
                            </div>
                            <div className="stat-card glass-panel" style={{ animationDelay: '0.3s' }}>
                                <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                                    <Code2 size={22} color="#fff" />
                                </div>
                                <div className="stat-card-info">
                                    <span className="stat-card-value">400+</span>
                                    <span className="stat-card-label">DSA Problems</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Difficulty Breakdown Bar Chart */}
                    <div className="bar-chart-card glass-panel" style={{ animationDelay: '0.3s' }}>
                        <h3 className="chart-card-title">Difficulty Breakdown</h3>
                        <div className="bar-chart">
                            {problemBreakdown.map((item, index) => (
                                <div className="bar-row" key={item.label}>
                                    <span className="bar-label">{item.label}</span>
                                    <div className="bar-track">
                                        <div
                                            className="bar-fill"
                                            style={{
                                                width: isVisible ? `${(item.value / item.max) * 100}%` : '0%',
                                                backgroundColor: item.color,
                                                transitionDelay: `${0.3 + index * 0.15}s`,
                                            }}
                                        />
                                    </div>
                                    <span className="bar-value">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 3: Platform Cards */}
                    <div className="platform-cards">
                        {platformStats.map((p, index) => (
                            <div className="platform-card glass-panel" key={p.platform} style={{ animationDelay: `${0.4 + index * 0.15}s` }}>
                                <div className="platform-card-header">
                                    <div className="platform-avatar" style={{ background: p.gradient }}>
                                        <Code2 size={24} color="#fff" />
                                    </div>
                                    <div>
                                        <h4 className="platform-name">{p.platform}</h4>
                                        <p className="platform-username gradient-text">{p.username}</p>
                                    </div>
                                </div>

                                <div className="platform-stats-row">
                                    <div className="platform-stat">
                                        <span className="platform-stat-value">{p.solved}+</span>
                                        <span className="platform-stat-label">Solved</span>
                                    </div>
                                    {p.rating && (
                                        <>
                                            <div className="platform-stat-divider" />
                                            <div className="platform-stat">
                                                <span className="platform-stat-value">{p.rating}</span>
                                                <span className="platform-stat-label">Rating</span>
                                            </div>
                                        </>
                                    )}
                                    {p.contests && (
                                        <>
                                            <div className="platform-stat-divider" />
                                            <div className="platform-stat">
                                                <span className="platform-stat-value">{p.contests}</span>
                                                <span className="platform-stat-label">Contests</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <a
                                    href={p.profileLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary platform-visit-btn"
                                >
                                    Visit Profile <ExternalLink size={14} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodolioProfile;
