/* ================================================
   ABOUT US PAGE JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Timeline Animation on Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        timelineObserver.observe(item);
    });

    // Team Member Cards Hover Effect
    const teamMembers = document.querySelectorAll('.board-member, .liaison-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // School Cards Animation
    const schoolCards = document.querySelectorAll('.schools-column p');
    
    const schoolObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                schoolObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    schoolCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'all 0.5s ease';
        schoolObserver.observe(card);
    });

    // Smooth Reveal for Sections
    const sections = document.querySelectorAll('.team-section, .volunteers-section, .history-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('reveal-section');
        sectionObserver.observe(section);
    });

    // Parallax Effect for Hero Background
    const heroBackground = document.querySelector('.about-hero .hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Counter Animation for Statistics (if any)
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            element.textContent = Math.floor(progress * (end - start) + start);
            
            if (progress < 1) {
                window.requestAnimationFrame(animation);
            } else {
                element.textContent = end + (element.dataset.suffix || '');
            }
        };
        
        window.requestAnimationFrame(animation);
    }

    // Trigger counter animation when visible
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const value = parseInt(target.dataset.value);
                target.classList.add('animated');
                animateCounter(target, 0, value, 2000);
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Apply Button Hover Effect
    const applyButton = document.querySelector('.cta-section .btn');
    
    if (applyButton) {
        applyButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(255, 184, 28, 0.5)';
        });
        
        applyButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(255, 184, 28, 0.4)';
        });
    }

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Add reveal animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);