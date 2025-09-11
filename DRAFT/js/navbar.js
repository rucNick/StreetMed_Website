/* ================================================
   NAVBAR JAVASCRIPT FOR STREET MEDICINE AT PITT
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    const mainNav = document.querySelector('.main-nav');
    
    // Toggle mobile menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle submenu clicks on mobile
    hasSubmenu.forEach(item => {
        const link = item.querySelector('> a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other submenus
                    hasSubmenu.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('submenu-open');
                        }
                    });
                    
                    // Toggle current submenu
                    item.classList.toggle('submenu-open');
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && menuToggle) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all submenus
                hasSubmenu.forEach(item => {
                    item.classList.remove('submenu-open');
                });
            }
        }
    });
    
    // Close menu when window resizes to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all mobile submenus
            hasSubmenu.forEach(item => {
                item.classList.remove('submenu-open');
            });
        }
    });
    
    // Add scroll effect to navigation
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (mainNav) {
            if (currentScroll > 100) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Set active page based on current URL
    function setActivePage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'Home.html';
        
        // Remove all active classes
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page
        document.querySelectorAll('.main-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active page on load
    setActivePage();
});

// Global function for onclick attribute (backward compatibility)
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (navMenu && menuToggle) {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Smooth scroll function
function scrollToContent() {
    const missionSection = document.getElementById('mission');
    if (missionSection) {
        missionSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}