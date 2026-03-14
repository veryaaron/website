/**
 * Nobodies Collective Association
 */

(function() {
    'use strict';

    // Mobile Navigation
    function initMobileNav() {
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
        });

        // Close on link click
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !links.contains(e.target)) {
                links.classList.remove('active');
            }
        });
    }

    // Smooth scroll
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const id = this.getAttribute('href');
                if (id === '#') return;

                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    const header = document.querySelector('.header');
                    const offset = header ? header.offsetHeight : 0;

                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Header scroll effect
    function initHeaderScroll() {
        var header = document.querySelector('.header');
        if (!header) return;

        // Pages without a hero section always get dark nav text
        var hasHero = !!document.querySelector('.hero');
        if (!hasHero) {
            header.classList.add('scrolled');
            return;
        }

        function checkScroll() {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }

    // Hero Slideshow
    function initSlideshow() {
        var slides = document.querySelectorAll('.hero-slide');
        if (slides.length < 2) return;

        var current = 0;
        var total = slides.length;

        setInterval(function() {
            slides[current].classList.remove('active');
            current = (current + 1) % total;
            slides[current].classList.add('active');
        }, 5000);
    }

    // Scroll Animations
    function initScrollAnimations() {
        var animEls = document.querySelectorAll('.anim');
        if (!animEls.length || !('IntersectionObserver' in window)) {
            // No support or no elements — show everything
            animEls.forEach(function(el) { el.classList.add('visible'); });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        animEls.forEach(function(el) { observer.observe(el); });
    }

    // Hero Glitch Text
    function initGlitchText() {
        var hero = document.querySelector('.hero');
        if (!hero) return;

        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var words = ['ELSEWHERE', 'BURN', 'ELSEWHERE BURN', 'BURN ELSEWHERE'];
        var blendModes = ['difference', 'exclusion', 'color-dodge', 'hard-light', 'overlay'];
        var glitchColors = ['#fff', '#0ff', '#f0f', '#ff0', '#fff', '#fff'];
        var glitchStyles = ['', 'glitch-aberration', 'glitch-ghost', 'glitch-scan'];

        function flash() {
            var text = words[Math.floor(Math.random() * words.length)];
            var el = document.createElement('div');
            el.className = 'glitch-flash';

            // Add a random glitch variant
            var style = glitchStyles[Math.floor(Math.random() * glitchStyles.length)];
            if (style) el.classList.add(style);

            el.textContent = text;

            // Random position within hero
            el.style.top = (10 + Math.random() * 65) + '%';
            el.style.left = (5 + Math.random() * 50) + '%';

            // Random blend mode and color
            el.style.mixBlendMode = blendModes[Math.floor(Math.random() * blendModes.length)];
            el.style.color = glitchColors[Math.floor(Math.random() * glitchColors.length)];

            // Random transform
            var skew = (Math.random() - 0.5) * 15;
            var scale = 0.7 + Math.random() * 0.8;
            var rotate = (Math.random() - 0.5) * 8;
            el.style.transform = 'skew(' + skew + 'deg) scale(' + scale + ') rotate(' + rotate + 'deg)';

            // Random font size
            el.style.fontSize = (2.5 + Math.random() * 4.5) + 'rem';

            // Random opacity
            el.style.opacity = 0.4 + Math.random() * 0.6;

            hero.appendChild(el);

            // Remove after flash
            var duration = 200 + Math.random() * 400;
            setTimeout(function() {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, duration);

            // Schedule next flash
            var nextDelay = 1500 + Math.random() * 4000;
            setTimeout(flash, nextDelay);
        }

        // Start after a short delay
        setTimeout(flash, 2000);
    }

    // Init
    function init() {
        initMobileNav();
        initSmoothScroll();
        initSlideshow();
        initHeaderScroll();
        initScrollAnimations();
        initGlitchText();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
