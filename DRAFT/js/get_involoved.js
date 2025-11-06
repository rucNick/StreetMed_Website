/* ================================================
   COURSE CREDIT MODAL JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('creditModal');
    const triggerBtn = document.getElementById('creditTrigger');
    const closeBtn = modal.querySelector('.credit-modal-close');
    const overlay = modal.querySelector('.credit-modal-overlay');
    
    let hoverTimeout;
    let isModalOpen = false;
    
    // Open modal function
    function openModal() {
        if (!isModalOpen) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            isModalOpen = true;
            
            // Animate items when modal opens
            setTimeout(() => {
                const items = modal.querySelectorAll('.credit-modal-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 50);
                });
            }, 100);
        }
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        isModalOpen = false;
        
        // Reset item animations
        const items = modal.querySelectorAll('.credit-modal-item');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
        });
    }
    
    // Initialize modal items for animation
    const items = modal.querySelectorAll('.credit-modal-item');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease';
    });
    
    // Click event to open modal
    triggerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
    
    // Hover event to open modal (with delay)
    triggerBtn.addEventListener('mouseenter', function() {
        if (!isModalOpen) {
            hoverTimeout = setTimeout(function() {
                openModal();
            }, 500);
        }
    });
    
    // Clear timeout if mouse leaves button before delay (but don't close if modal is open)
    triggerBtn.addEventListener('mouseleave', function() {
        if (hoverTimeout && !isModalOpen) {
            clearTimeout(hoverTimeout);
        }
    });
    
    // Close button click event
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Overlay click event to close modal
    overlay.addEventListener('click', function() {
        closeModal();
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });
    
    // Prevent closing when clicking inside modal content
    modal.querySelector('.credit-modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});