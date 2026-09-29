const express = require('express');
const router = express.Router();

// In-memory cache to prevent spamming GFG servers (15 min TTL)
const cache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000;

// Verified baseline fallback stats for codewithrdx if GFG is temporarily unreachable
const FALLBACK_STATS = {
    userHandle: 'codewithrdx',
    total_score: 924,
    monthly_score: 0,
    total_problems_solved: 242,
    pod_solved_longest_streak: 124,
    pod_solved_current_streak: 0,
    institute_rank: 169,
    School: 0,
    Basic: 12,
    Easy: 61,
    Medium: 142,
    Hard: 27
};

async function fetchGfgStats(username) {
    const cached = cache.get(username);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const [profileRes, subRes] = await Promise.allSettled([
            fetch(`https://www.geeksforgeeks.org/user/${encodeURIComponent(username)}/`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            }).then(r => r.text()),
            fetch('https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                body: JSON.stringify({ handle: username })
            }).then(r => r.json())
        ]);

        let score = 0;
        let solved = 0;
        let longestStreak = 0;
        let currentStreak = 0;
        let monthlyScore = 0;
        let instituteRank = 0;

        if (profileRes.status === 'fulfilled') {
            const html = profileRes.value;
            const extractInt = (key) => {
                const regex = new RegExp(`\\\\?"${key}\\\\?":\\s*([0-9]+)`);
                const m = html.match(regex);
                return m ? parseInt(m[1], 10) : 0;
            };
            score = extractInt('score');
            solved = extractInt('total_problems_solved');
            longestStreak = extractInt('pod_solved_longest_streak');
            currentStreak = extractInt('pod_solved_current_streak');
            monthlyScore = extractInt('monthly_score');
            instituteRank = extractInt('institute_rank');
        }

        let School = 0, Basic = 0, Easy = 0, Medium = 0, Hard = 0;
        if (subRes.status === 'fulfilled' && subRes.value?.result) {
            const res = subRes.value.result;
            School = res.School ? Object.keys(res.School).length : 0;
            Basic = res.Basic ? Object.keys(res.Basic).length : 0;
            Easy = res.Easy ? Object.keys(res.Easy).length : 0;
            Medium = res.Medium ? Object.keys(res.Medium).length : 0;
            Hard = res.Hard ? Object.keys(res.Hard).length : 0;
            if (!solved) {
                solved = subRes.value.count || (School + Basic + Easy + Medium + Hard);
            }
        }

        // Apply fallbacks if scraping was blocked or empty
        const fallback = username.toLowerCase() === 'codewithrdx' ? FALLBACK_STATS : {};
        score = score || fallback.total_score || 0;
        solved = solved || fallback.total_problems_solved || 0;
        longestStreak = longestStreak || fallback.pod_solved_longest_streak || 0;
        currentStreak = currentStreak || fallback.pod_solved_current_streak || 0;
        if (!Easy && !Medium && !Hard && fallback.Easy) {
            Basic = fallback.Basic;
            Easy = fallback.Easy;
            Medium = fallback.Medium;
            Hard = fallback.Hard;
        }

        const data = {
            success: true,
            userHandle: username,
            total_score: score,
            monthly_score: monthlyScore,
            total_problems_solved: solved,
            pod_solved_longest_streak: longestStreak,
            pod_solved_current_streak: currentStreak,
            institute_rank: instituteRank,
            School,
            Basic,
            Easy,
            Medium,
            Hard
        };

        cache.set(username, { timestamp: Date.now(), data });
        return data;
    } catch (err) {
        console.error('Error fetching GFG data:', err.message);
        if (username.toLowerCase() === 'codewithrdx') {
            return { success: true, ...FALLBACK_STATS };
        }
        throw err;
    }
}

const handleGfgRequest = async (req, res) => {
    try {
        const username = req.params.username || 'codewithrdx';
        const data = await fetchGfgStats(username);
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, ...FALLBACK_STATS });
    }
};

router.get('/', handleGfgRequest);
router.get('/:username', handleGfgRequest);

module.exports = router;
