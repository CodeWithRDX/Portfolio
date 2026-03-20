import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code2, TrendingUp, Loader2, Trophy, Award, Flame } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell, ReferenceLine,
    RadialBarChart, RadialBar, PolarAngleAxis,
    AreaChart, Area
} from 'recharts';
import './CodingProfile.css';

/* ─── Rating Graph Component ───────────────────────────────── */
const RatingAreaGraph = ({ rating, contests, animated }) => {
    // User requested specific historical data points
    const graphData = [
        { name: 'Start', rating: 1500 },
        { name: 'Contest 1', rating: 1508 },
        { name: 'Contest 2', rating: 1483 },
        { name: 'Contest 3', rating: 1461 },
        { name: `Contest 4 (Current)`, rating: rating || 1468 }
    ];

    const minRating = Math.min(1461, rating) - 30;
    const maxRating = Math.max(1508, rating) + 30;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'var(--glass-bg, rgba(20,20,30,0.92))',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: '8px', padding: '10px 14px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(12px)'
                }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {payload[0].payload.name}
                    </p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#f59e0b', fontSize: '1.1rem' }}>
                        Rating: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={graphData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="ratingGraphGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" strokeOpacity={0.4} vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[minRating, maxRating]} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <ReferenceLine y={1500} stroke="#ef4444" strokeDasharray="4 3" strokeOpacity={0.5} 
                        label={{ value: '1500 (Base)', position: 'insideTopLeft', fill: '#ef4444', fontSize: 11 }} />
                    <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        fill="url(#ratingGraphGrad)"
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6, stroke: 'var(--bg-secondary)' }}
                        activeDot={{ r: 8, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                        isAnimationActive={animated}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

/* ─── GFG Score Bar Graph ────────────────────────────────── */
const GfgScoreGraph = ({ totalScore, monthlyScore, streak, animated }) => {
    const scoreData = [
        { label: 'Total', value: totalScore, color: '#22c55e' },
        { label: 'Monthly', value: monthlyScore, color: '#16a34a' },
    ];
    const maxVal = Math.max(totalScore, 1);

    return (
        <div className="gfg-score-graph">
            <div className="gfg-score-bars">
                {scoreData.map((item, i) => (
                    <div className="gfg-bar-row" key={item.label}>
                        <span className="gfg-bar-label">{item.label} Score</span>
                        <div className="gfg-bar-track">
                            <div
                                className="gfg-bar-fill"
                                style={{
                                    width: animated ? `${(item.value / maxVal) * 100}%` : '0%',
                                    background: item.color,
                                    transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${i * 0.2}s`,
                                }}
                            />
                        </div>
                        <span className="gfg-bar-value" style={{ color: item.color }}>{item.value}</span>
                    </div>
                ))}
            </div>
            <div className="gfg-streak-badge">
                <Flame size={16} color="#f59e0b" />
                <span>{streak} day streak</span>
            </div>
        </div>
    );
};

/* ─── Main Component ──────────────────────────────────────── */
const CodingProfile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const [stats, setStats] = useState({
        lcSolved: 0, lcRating: 0, lcContests: 0, lcGlobalRank: 0, lcTopPct: 0,
        gfgSolved: 0, gfgScore: 0, gfgMonthly: 0, gfgStreak: 0,
        gfgEasy: 0, gfgMedium: 0, gfgHard: 0,
        easy: 0, medium: 0, hard: 0, totalSolved: 0,
        loading: true
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) { setIsVisible(true); observer.disconnect(); } },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [lcRes, gfgRes] = await Promise.all([
                    fetch('/proxy/lc/user/leetcode/codewithrdx/'),
                    fetch('/proxy/gfg/codewithrdx?raw=true')
                ]);
                const lcData  = await lcRes.json();
                const gfgData = await gfgRes.json();

                // LeetCode
                const lcStats = lcData.data;
                const acSub   = lcStats?.matchedUser?.submitStats?.acSubmissionNum || [];
                const lcEasy   = acSub.find(s => s.difficulty === 'Easy')?.count   || 0;
                const lcMedium = acSub.find(s => s.difficulty === 'Medium')?.count || 0;
                const lcHard   = acSub.find(s => s.difficulty === 'Hard')?.count   || 0;
                const lcTotal  = acSub.find(s => s.difficulty === 'All')?.count    || 0;
                const cr = lcStats?.userContestRanking || {};
                const lcRating     = Math.round(cr.rating || 0);
                const lcContests   = cr.attendedContestsCount || 0;
                const lcGlobalRank = cr.globalRanking       || 0;
                const lcTopPct     = cr.topPercentage       || 0;

                // GFG — field names from API: total_score, monthly_score, total_problems_solved,
                //        pod_solved_current_streak, Easy, Medium, Hard
                const gfgSolved  = gfgData?.total_problems_solved    || 0;
                const gfgScore   = gfgData?.total_score              || 0;
                const gfgMonthly = gfgData?.monthly_score            || 0;
                const gfgStreak  = gfgData?.pod_solved_current_streak || 0;
                const gfgEasy    = gfgData?.Easy   || 0;
                const gfgMedium  = gfgData?.Medium || 0;
                const gfgHard    = gfgData?.Hard   || 0;

                setStats({
                    lcSolved: lcTotal, lcRating, lcContests, lcGlobalRank, lcTopPct,
                    gfgSolved, gfgScore, gfgMonthly, gfgStreak,
                    gfgEasy, gfgMedium, gfgHard,
                    easy:   lcEasy   + gfgEasy,
                    medium: lcMedium + gfgMedium,
                    hard:   lcHard   + gfgHard,
                    totalSolved: lcTotal + gfgSolved,
                    loading: false
                });
            } catch (err) {
                console.error('Error fetching coding stats:', err);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };
        fetchStats();
    }, []);

    const problemBreakdown = [
        { label: 'Easy',   value: stats.easy,   max: Math.max(stats.totalSolved, 1), color: '#22c55e' },
        { label: 'Medium', value: stats.medium, max: Math.max(stats.totalSolved, 1), color: '#f59e0b' },
        { label: 'Hard',   value: stats.hard,   max: Math.max(stats.totalSolved, 1), color: '#ef4444' },
    ];

    // Donut for LC difficulty
    const lcDonut = [
        { name: 'Hard',   value: stats.hard   - stats.gfgHard,   fill: '#ef4444' },
        { name: 'Medium', value: stats.medium - stats.gfgMedium, fill: '#f59e0b' },
        { name: 'Easy',   value: stats.easy   - stats.gfgEasy,   fill: '#22c55e' },
    ];

    return (
        <section id="coding-profile" className="coding-profile-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title"><span>Competitive Coding</span></h2>

                <div className={`coding-dashboard ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    {stats.loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <Loader2 size={48} style={{ animation: 'spin 1.5s linear infinite', color: 'var(--text-secondary)' }} />
                            <span style={{ marginLeft: '12px', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Fetching live metrics...</span>
                        </div>
                    ) : (
                        <>
                            {/* ── Summary Stat Cards ── */}
                            <div className="stats-summary" style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: '0' }}>
                                <div className="stat-card glass-panel">
                                    <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}>
                                        <TrendingUp size={22} color="#fff" />
                                    </div>
                                    <div className="stat-card-info">
                                        <span className="stat-card-value">{stats.lcRating}</span>
                                        <span className="stat-card-label">LC Rating</span>
                                    </div>
                                </div>
                                <div className="stat-card glass-panel" style={{ animationDelay: '0.1s' }}>
                                    <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
                                        <Code2 size={22} color="#fff" />
                                    </div>
                                    <div className="stat-card-info">
                                        <span className="stat-card-value">{stats.totalSolved}+</span>
                                        <span className="stat-card-label">Total Problems</span>
                                    </div>
                                </div>
                                <div className="stat-card glass-panel" style={{ animationDelay: '0.2s' }}>
                                    <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
                                        <Award size={22} color="#fff" />
                                    </div>
                                    <div className="stat-card-info">
                                        <span className="stat-card-value">{stats.gfgScore}</span>
                                        <span className="stat-card-label">GFG Score</span>
                                    </div>
                                </div>
                                <div className="stat-card glass-panel" style={{ animationDelay: '0.3s' }}>
                                    <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg,#f59e0b,#fb923c)' }}>
                                        <Flame size={22} color="#fff" />
                                    </div>
                                    <div className="stat-card-info">
                                        <span className="stat-card-value">{stats.gfgStreak}</span>
                                        <span className="stat-card-label">GFG Streak</span>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-split-layout">
                                <div className="profile-left-col">
                                    {/* ── LC Rating Bar Graph ── */}
                                    <div className="rating-graph-card glass-panel" style={{ flex: 1, minHeight: 350 }}>
                                <div className="rgc-header">
                                    <div className="rgc-title-group">
                                        <Trophy size={20} color="#f59e0b" />
                                        <h3 className="chart-card-title" style={{ margin: 0 }}>LeetCode Contest Rating</h3>
                                    </div>
                                    <div className="rgc-meta">
                                        <span>🏆 {stats.lcContests} contests</span>
                                        <span>·</span>
                                        <span>Global #{stats.lcGlobalRank.toLocaleString()}</span>
                                        <span>·</span>
                                        <span>Top {Math.round(stats.lcTopPct)}%</span>
                                    </div>
                                </div>
                                <RatingAreaGraph rating={stats.lcRating} contests={stats.lcContests} animated={isVisible} />
                            </div>

                            {/* ── GFG Score Graph ── */}
                            <div className="gfg-graph-card glass-panel">
                                <div className="rgc-header">
                                    <div className="rgc-title-group">
                                        <Award size={20} color="#22c55e" />
                                        <h3 className="chart-card-title" style={{ margin: 0 }}>GeeksforGeeks Performance</h3>
                                    </div>
                                    <a
                                        href="https://auth.geeksforgeeks.org/user/codewithrdx/"
                                        target="_blank" rel="noopener noreferrer"
                                        className="rgc-link"
                                    >
                                        View Profile <ExternalLink size={12} />
                                    </a>
                                </div>

                                <div className="gfg-body">
                                    {/* Left: score bars */}
                                    <GfgScoreGraph
                                        totalScore={stats.gfgScore}
                                        monthlyScore={stats.gfgMonthly}
                                        streak={stats.gfgStreak}
                                        animated={isVisible}
                                    />

                                    {/* Right: stat chips */}
                                    <div className="gfg-stat-chips">
                                        <div className="gfg-chip">
                                            <span className="gfg-chip-val" style={{ color: '#22c55e' }}>{stats.gfgSolved}</span>
                                            <span className="gfg-chip-lbl">Solved</span>
                                        </div>
                                        <div className="gfg-chip">
                                            <span className="gfg-chip-val" style={{ color: '#22c55e' }}>{stats.gfgEasy}</span>
                                            <span className="gfg-chip-lbl">Easy</span>
                                        </div>
                                        <div className="gfg-chip">
                                            <span className="gfg-chip-val" style={{ color: '#f59e0b' }}>{stats.gfgMedium}</span>
                                            <span className="gfg-chip-lbl">Medium</span>
                                        </div>
                                        <div className="gfg-chip">
                                            <span className="gfg-chip-val" style={{ color: '#ef4444' }}>{stats.gfgHard}</span>
                                            <span className="gfg-chip-lbl">Hard</span>
                                        </div>
                                        <div className="gfg-chip">
                                            <span className="gfg-chip-val" style={{ color: '#f59e0b' }}>{stats.gfgMonthly}</span>
                                            <span className="gfg-chip-lbl">Monthly</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Difficulty Breakdown ── */}
                            <div className="lc-difficulty-section">
                                {/* Recharts donut for LC */}
                                <div className="donut-card glass-panel">
                                    <h3 className="chart-card-title">LeetCode by Difficulty</h3>
                                    <div className="donut-wrapper">
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadialBarChart
                                                cx="50%" cy="50%"
                                                innerRadius="40%" outerRadius="80%"
                                                data={lcDonut}
                                                startAngle={90} endAngle={-270}
                                            >
                                                <PolarAngleAxis type="number" domain={[0, stats.lcSolved || 1]} angleAxisId={0} tick={false} />
                                                <RadialBar
                                                    dataKey="value"
                                                    cornerRadius={6}
                                                    background={{ fill: 'var(--bg-tertiary)' }}
                                                    isAnimationActive={isVisible}
                                                    animationDuration={1400}
                                                />
                                                <Tooltip
                                                    formatter={(v, n) => [v, n]}
                                                    contentStyle={{
                                                        background: 'var(--glass-bg, rgba(15,23,42,0.9))',
                                                        border: '1px solid var(--glass-border)',
                                                        borderRadius: 10,
                                                        color: 'var(--text-primary)',
                                                    }}
                                                />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        <div className="donut-center-label">
                                            <span className="dcl-value">{stats.lcSolved}</span>
                                            <span className="dcl-sub">LC Solved</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bar breakdown (overall) */}
                                <div className="bar-chart-card glass-panel">
                                    <h3 className="chart-card-title">Difficulty Breakdown (Overall)</h3>
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
                                    </div>
                                </div>

                                {/* ── Right Column: Platform Cards ── */}
                                <div className="profile-right-col">
                                    {/* LeetCode */}
                                <div className="platform-card glass-panel">
                                    <div className="platform-card-header">
                                        <div className="platform-avatar" style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}>
                                            <Code2 size={24} color="#fff" />
                                        </div>
                                        <div>
                                            <h4 className="platform-name">LeetCode</h4>
                                            <p className="platform-username gradient-text">@CodeWithRDX</p>
                                        </div>
                                    </div>
                                    <div className="platform-stats-row">
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.lcSolved}</span>
                                            <span className="platform-stat-label">Solved</span>
                                        </div>
                                        <div className="platform-stat-divider" />
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.lcRating}</span>
                                            <span className="platform-stat-label">Rating</span>
                                        </div>
                                        <div className="platform-stat-divider" />
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.lcContests}</span>
                                            <span className="platform-stat-label">Contests</span>
                                        </div>
                                    </div>
                                    <a href="https://leetcode.com/u/CodeWithRDX/" target="_blank" rel="noopener noreferrer"
                                        className="btn btn-primary platform-visit-btn">
                                        Visit Profile <ExternalLink size={14} />
                                    </a>
                                </div>

                                {/* GeeksforGeeks */}
                                <div className="platform-card glass-panel">
                                    <div className="platform-card-header">
                                        <div className="platform-avatar" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>
                                            <Code2 size={24} color="#fff" />
                                        </div>
                                        <div>
                                            <h4 className="platform-name">GeeksforGeeks</h4>
                                            <p className="platform-username gradient-text">@codewithrdx</p>
                                        </div>
                                    </div>
                                    <div className="platform-stats-row">
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.gfgSolved}</span>
                                            <span className="platform-stat-label">Solved</span>
                                        </div>
                                        <div className="platform-stat-divider" />
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.gfgScore}</span>
                                            <span className="platform-stat-label">Score</span>
                                        </div>
                                        <div className="platform-stat-divider" />
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.gfgMonthly}</span>
                                            <span className="platform-stat-label">Monthly</span>
                                        </div>
                                        <div className="platform-stat-divider" />
                                        <div className="platform-stat">
                                            <span className="platform-stat-value">{stats.gfgStreak}🔥</span>
                                            <span className="platform-stat-label">Streak</span>
                                        </div>
                                    </div>
                                    <a href="https://auth.geeksforgeeks.org/user/codewithrdx/" target="_blank" rel="noopener noreferrer"
                                        className="btn btn-primary platform-visit-btn">
                                        Visit Profile <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CodingProfile;
