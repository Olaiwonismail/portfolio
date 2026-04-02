// Scroll-based fade-up animations and Active Navigation
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Fade-up Animations with Staggering ---
    const targets = document.querySelectorAll(
        '.exp-card, .project-card, .edu-card, .about-grid, .hero-text, .hero-photo, .empty-state'
    );

    targets.forEach(el => el.classList.add('fade-up'));

    const animationObserver = new IntersectionObserver((entries) => {
        let delay = 0; // Counter for staggering elements that appear simultaneously

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a staggered delay if multiple elements appear at once
                entry.target.style.transitionDelay = `${delay * 0.15}s`;
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);

                delay++;
                // Reset delay after a short time so later scrolls don't have huge delays
                setTimeout(() => { delay = 0; }, 100);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => animationObserver.observe(el));

    // --- 2. Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        // Trigger point is near the vertical middle of the screen
        rootMargin: '-40% 0px -40% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // --- 3. Hamburger Menu Toggle ---
    const hamburger = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
});
