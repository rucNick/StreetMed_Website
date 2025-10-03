/* ================================================
   ARTICLES PAGE JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Filter Functionality
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles with animation
            articleCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show card with stagger animation
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 50);
                    }, index * 100);
                } else {
                    // Hide card
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                articleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all article cards
    articleCards.forEach(card => {
        articleObserver.observe(card);
    });
    
    // ===================================
    // Intro Section Animation
    // ===================================
    const introContent = document.querySelector('.intro-content');
    
    if (introContent) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    introObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        introContent.style.opacity = '0';
        introContent.style.transform = 'translateY(20px)';
        introContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        introObserver.observe(introContent);
    }
    
    // ===================================
    // Filter Buttons Animation
    // ===================================
    const filterControls = document.querySelector('.filter-controls');
    
    if (filterControls) {
        const filterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const buttons = entry.target.querySelectorAll('.filter-btn');
                    buttons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.style.opacity = '1';
                            btn.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    filterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        filterButtons.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        filterObserver.observe(filterControls);
    }
    
    // ===================================
    // CTA Section Animation
    // ===================================
    const ctaContent = document.querySelector('.articles-cta .cta-content');
    
    if (ctaContent) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        ctaContent.style.opacity = '0';
        ctaContent.style.transform = 'translateY(30px)';
        ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        ctaObserver.observe(ctaContent);
    }
    
    // ===================================
    // Button Hover Effects
    // ===================================
    const articleButtons = document.querySelectorAll('.article-actions .btn');
    
    articleButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===================================
    // Modal Functionality for Abstract
    // ===================================
    const abstractButtons = document.querySelectorAll('.article-actions .btn-primary');
    
    abstractButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.article-card');
            const title = card.querySelector('.article-title').textContent;
            const abstract = card.querySelector('.article-abstract').textContent;
            
            // Show abstract modal (you can implement a proper modal here)
            showAbstractModal(title, abstract);
        });
    });
    
    function showAbstractModal(title, abstract) {
        // Simple alert for now - can be replaced with a proper modal
        alert(`${title}\n\n${abstract}`);
        
        // TODO: Implement proper modal
        // You can create a modal overlay and display the full abstract
    }
    
    // ===================================
    // Download PDF Functionality
    // ===================================
    const downloadButtons = document.querySelectorAll('.article-actions .btn-secondary');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.article-card');
            const title = card.querySelector('.article-title').textContent;
            
            // Simulate download (replace with actual download link)
            console.log(`Downloading: ${title}`);
            alert('PDF download functionality will be implemented with actual paper links.');
        });
    });
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
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
    
    // ===================================
    // Parallax Effect for Hero
    // ===================================
    const heroBackground = document.querySelector('.articles-hero .hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ===================================
    // Card Statistics Counter Animation
    // ===================================
    function animateCitations() {
        const citationElements = document.querySelectorAll('.meta-item:first-child');
        
        const citationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const textContent = entry.target.textContent;
                    const numberMatch = textContent.match(/\d+/);
                    
                    if (numberMatch) {
                        const targetNumber = parseInt(numberMatch[0]);
                        animateNumber(entry.target, targetNumber);
                        entry.target.classList.add('counted');
                    }
                    
                    citationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        citationElements.forEach(element => {
            citationObserver.observe(element);
        });
    }
    
    function animateNumber(element, target) {
        const duration = 1000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const text = element.textContent.replace(/\d+/, Math.floor(current));
            element.textContent = text;
        }, 16);
    }
    
    // Initialize citation animations
    animateCitations();
    
    // ===================================
    // Search Functionality (Optional)
    // ===================================
    // You can add a search bar to filter articles by title or author
    function createSearchBar() {
        const filterSection = document.querySelector('.articles-filter .container');
        
        if (filterSection) {
            const searchWrapper = document.createElement('div');
            searchWrapper.className = 'search-wrapper';
            searchWrapper.innerHTML = `
                <input type="text" id="articleSearch" placeholder="Search articles by title, author, or keyword..." class="search-input">
            `;
            
            filterSection.appendChild(searchWrapper);
            
            const searchInput = document.getElementById('articleSearch');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                articleCards.forEach(card => {
                    const title = card.querySelector('.article-title').textContent.toLowerCase();
                    const authors = card.querySelector('.article-authors').textContent.toLowerCase();
                    const abstract = card.querySelector('.article-abstract').textContent.toLowerCase();
                    
                    const matches = title.includes(searchTerm) || 
                                  authors.includes(searchTerm) || 
                                  abstract.includes(searchTerm);
                    
                    if (matches || searchTerm === '') {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('visible'), 50);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        }
    }
    
    // Uncomment to enable search functionality
    // createSearchBar();
    
    // ===================================
    // Print Article Information
    // ===================================
    function setupPrintButtons() {
        articleCards.forEach(card => {
            const actionsDiv = card.querySelector('.article-actions');
            
            const printBtn = document.createElement('button');
            printBtn.className = 'btn btn-tertiary';
            printBtn.textContent = 'Citation';
            printBtn.addEventListener('click', function() {
                const title = card.querySelector('.article-title').textContent;
                const authors = card.querySelector('.article-authors span').textContent;
                const journal = card.querySelector('.article-journal').textContent;
                const year = card.querySelector('.article-year').textContent;
                
                const citation = `${authors} (${year}). ${title}. ${journal}.`;
                
                // Copy to clipboard
                navigator.clipboard.writeText(citation).then(() => {
                    alert('Citation copied to clipboard!');
                }).catch(() => {
                    alert(`Citation:\n\n${citation}`);
                });
            });
        });
    }
    
    // ===================================
    // Utility Functions
    // ===================================
    
    // Debounce function for performance
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
    
    // Apply debounce to scroll events if needed
    window.addEventListener('scroll', debounce(() => {
        // Any scroll-based functionality
    }, 100));
    
});

window.articlesModule = {
};