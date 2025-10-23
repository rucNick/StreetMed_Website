/* ================================================
   ABOUT US PAGE JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Timeline Animation on Scroll - MATCHING OLD WORKING VERSION
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
    const teamMembers = document.querySelectorAll(
        '.board-member, .liaison-member, .resource-member, ' +
        '.events-education-member, .research-member'
    );
    
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