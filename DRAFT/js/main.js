/* Main JavaScript File */

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Smooth scroll to content
function scrollToContent() {
    const missionSection = document.getElementById('mission');
    if (missionSection) {
        missionSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Toggle current item
            faqItem.classList.toggle('active');
            
            // Close other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        });
    });

    // Animated Number Counter
    function animateNumbers() {
        const numbers = document.querySelectorAll('.metric-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.getAttribute('data-target');
                    const hasPlus = finalValue.includes('+') || parseInt(finalValue) >= 100;
                    const numValue = parseInt(finalValue.replace('+', ''));
                    
                    animateValue(target, 0, numValue, 2000, hasPlus);
                    observer.unobserve(target);
                }
            });
        }, { 
            threshold: 0.5 
        });

        numbers.forEach(num => observer.observe(num));
    }

    // Animate value from start to end
    function animateValue(element, start, end, duration, hasPlus) {
        const range = end - start;
        const minTimer = 50;
        let stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);
        
        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        let timer;
        
        function run() {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            
            element.textContent = value + (hasPlus ? '+' : '');
            
            if (value == end) {
                clearInterval(timer);
            }
        }
        
        timer = setInterval(run, stepTime);
        run();
    }

    // Start animations when page loads
    animateNumbers();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Handle submenu hover for desktop
    const menuItems = document.querySelectorAll('.main-nav li');
    menuItems.forEach(item => {
        let hoverTimeout;
        
        item.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'flex';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                hoverTimeout = setTimeout(() => {
                    submenu.style.display = 'none';
                }, 300);
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to navigation
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.main-nav');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(40, 40, 40, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            nav.style.background = 'rgba(40, 40, 40, 0.95)';
            nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.impact-card, .involvement-card, .news-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}