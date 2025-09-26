/* ================================================
   NAVBAR JS 
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.querySelector('.mobile-nav-overlay');
    
    // Toggle main menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
            overlay.classList.toggle('active');
            
            if (navMenu.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu on overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('mobile-active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Handle submenu clicks - Enhanced with Home button double-click
    const submenuParents = document.querySelectorAll('.has-submenu > a');
    
    submenuParents.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const isHomeButton = link.textContent.trim() === 'Home';
            
            // Desktop behavior
            if (window.innerWidth > 768) {
                if (isHomeButton) {
                    // If submenu is visible, navigate to home
                    if (parent.classList.contains('show-submenu') || parent.matches(':hover')) {
                        window.location.href = 'Home.html';
                    } else {
                        e.preventDefault();
                        parent.classList.add('show-submenu');
                        // Remove after a delay if not hovering
                        setTimeout(() => {
                            if (!parent.matches(':hover')) {
                                parent.classList.remove('show-submenu');
                            }
                        }, 3000);
                    }
                } else {
                    // For other menu items, prevent default
                    e.preventDefault();
                }
            } 
            // Mobile behavior
            else {
                e.preventDefault();
                e.stopPropagation();
                
                // Check if Home button and submenu is already open
                if (isHomeButton && parent.classList.contains('show-submenu')) {
                    // Navigate to homepage
                    window.location.href = 'Home.html';
                    return;
                }
                
                // Close other submenus
                document.querySelectorAll('.has-submenu').forEach(function(item) {
                    if (item !== parent) {
                        item.classList.remove('show-submenu');
                    }
                });
                
                // Toggle this submenu
                parent.classList.toggle('show-submenu');
            }
        });
    });
    
    // Let submenu links work normally
    const submenuLinks = document.querySelectorAll('.submenu a');
    submenuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            // Link will navigate normally
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('mobile-active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            document.querySelectorAll('.has-submenu').forEach(function(item) {
                item.classList.remove('show-submenu');
            });
        }
    });
    
    // Add scroll effect to navigation (optional)
    const mainNav = document.querySelector('.main-nav');
    window.addEventListener('scroll', function() {
        if (mainNav && window.pageYOffset > 50) {
            mainNav.classList.add('scrolled');
        } else if (mainNav) {
            mainNav.classList.remove('scrolled');
        }
    });
});

// Smooth scroll function
function scrollToContent() {
    const target = document.getElementById('mission');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make scrollToContent available globally
window.scrollToContent = scrollToContent;