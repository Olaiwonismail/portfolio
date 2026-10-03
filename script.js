// Theme toggle, GitHub heatmap and Lagos clock
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    // --- 1. Theme toggle --------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

    if (themeToggle) {
        const syncLabel = () => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
            themeToggle.title = `Switch to ${next} theme`;
        };
        themeToggle.addEventListener('click', () => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.dataset.theme = next;
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncLabel();
        });
        systemDark.addEventListener('change', syncLabel);
        syncLabel();
    }

    // --- 3. GitHub contribution heatmap -----------------------------------
    const heatmap = document.getElementById('heatmap');
    const summary = document.getElementById('activitySummary');
    const USER = 'olaiwonismail';

    if (heatmap && summary) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const numberFormat = new Intl.NumberFormat('en-US');

        fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                const days = data.contributions || [];
                if (!days.length) throw new Error('No data');

                // Pad the first column so each column is a Sunday-to-Saturday week
                const firstWeekday = new Date(`${days[0].date}T00:00:00`).getDay();
                const cells = [];
                for (let i = 0; i < firstWeekday; i++) cells.push('<i data-empty></i>');
                for (const day of days) {
                    const label = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${dateFormat.format(new Date(`${day.date}T00:00:00`))}`;
                    cells.push(`<i data-level="${day.level}" title="${label}"></i>`);
                }
                heatmap.innerHTML = cells.join('');

                const total = data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
                summary.innerHTML = `${numberFormat.format(total)} contributions in the last year on <a href="https://github.com/${USER}" target="_blank" rel="noopener">GitHub</a>.`;
                heatmap.setAttribute('aria-label', `GitHub contribution heatmap: ${numberFormat.format(total)} contributions in the last year`);

                // Start scrolled to the most recent weeks on narrow screens
                const scroller = heatmap.parentElement;
                scroller.scrollLeft = scroller.scrollWidth;
            })
            .catch(() => {
                summary.innerHTML = `Couldn’t load contributions right now. They’re on <a href="https://github.com/${USER}" target="_blank" rel="noopener">GitHub</a>.`;
                heatmap.parentElement.hidden = true;
                const legend = document.querySelector('.heatmap-legend');
                if (legend) legend.hidden = true;
            })
            .finally(() => clearTimeout(timeout));
    }

    // --- 4. Local time in Lagos --------------------------------------------
    const lagosTime = document.getElementById('lagosTime');
    if (lagosTime && window.Intl) {
        const timeFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' });
        const tick = () => { lagosTime.textContent = `${timeFormat.format(new Date())} in Lagos (WAT)`; };
        tick();
        setInterval(tick, 30000);
    }

    // --- 5. Sidebar: highlight the section in view -------------------------
    const sideLinks = Array.from(document.querySelectorAll('.side-link'));
    const sideTargets = sideLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

    if (sideLinks.length) {
        let clicked = null;   // keep a clicked link active until the user scrolls by hand
        ['wheel', 'touchstart', 'keydown'].forEach(type =>
            window.addEventListener(type, () => { clicked = null; }, { passive: true }));

        const update = () => {
            let current = clicked;
            if (!current) {
                const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
                current = atBottom ? sideTargets[sideTargets.length - 1] : sideTargets[0];
                if (!atBottom) {
                    for (const target of sideTargets) {
                        if (target.getBoundingClientRect().top <= window.innerHeight * 0.35) current = target;
                    }
                }
            }
            sideLinks.forEach(link => {
                if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });
        };

        sideLinks.forEach(link => link.addEventListener('click', () => {
            clicked = document.querySelector(link.getAttribute('href'));
            update();
        }));

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { update(); ticking = false; });
        }, { passive: true });
        update();
    }

    // --- 6. Footer year -------------------------------------------------------
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
