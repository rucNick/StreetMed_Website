// Resources Page JavaScript - Solid Final Version
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            const selectedTab = document.getElementById(tabName + '-tab');
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        });
    });
    
    // Filter Functionality for Shelters - FIXED
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const shelterContainer = document.getElementById('shelter-cards');
            
            if (!shelterContainer) return;
            
            // Get all shelter items (cards)
            const shelterItems = shelterContainer.querySelectorAll('.shelter-item');
            
            shelterItems.forEach(item => {
                let shouldShow = false;
                
                switch(filter) {
                    case 'all':
                        shouldShow = true;
                        break;
                    
                    case 'wheelchair':
                        // Check if card has wheelchair tags
                        const wheelchairTags = item.querySelectorAll('.wheelchair-tag');
                        shouldShow = wheelchairTags.length > 0 || item.getAttribute('data-wheelchair') === 'yes';
                        break;
                    
                    case 'youth':
                        // Check for youth content
                        const youthTags = item.querySelectorAll('.youth-tag');
                        const youthText = item.textContent.toLowerCase();
                        shouldShow = youthTags.length > 0 || 
                                   youthText.includes('youth') || 
                                   youthText.includes('18-24') ||
                                   item.getAttribute('data-youth') === 'yes';
                        break;
                    
                    case 'no-curfew':
                        // Check for no curfew
                        const noCurfewTags = item.querySelectorAll('.no-curfew-tag');
                        const curfewText = item.textContent.toLowerCase();
                        shouldShow = noCurfewTags.length > 0 || 
                                   curfewText.includes('no curfew') ||
                                   item.getAttribute('data-curfew') === 'no';
                        break;
                }
                
                // Show or hide the card
                if (shouldShow) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
            
            // Also filter individual list items within cards for more granular control
            if (filter !== 'all') {
                shelterItems.forEach(card => {
                    if (card.style.display !== 'none') {
                        const listItems = card.querySelectorAll('li');
                        let hasVisibleItems = false;
                        
                        listItems.forEach(li => {
                            let itemShouldShow = false;
                            const liText = li.textContent.toLowerCase();
                            
                            switch(filter) {
                                case 'wheelchair':
                                    itemShouldShow = li.querySelector('.wheelchair-tag') !== null ||
                                                   liText.includes('wheelchair');
                                    break;
                                case 'youth':
                                    itemShouldShow = li.querySelector('.youth-tag') !== null ||
                                                   liText.includes('youth') ||
                                                   liText.includes('18-24') ||
                                                   li.getAttribute('data-youth') === 'yes';
                                    break;
                                case 'no-curfew':
                                    itemShouldShow = li.querySelector('.no-curfew-tag') !== null ||
                                                   liText.includes('no curfew');
                                    break;
                            }
                            
                            if (itemShouldShow) {
                                li.style.display = 'block';
                                li.style.backgroundColor = 'rgba(255, 184, 28, 0.05)';
                                li.style.borderLeft = '3px solid #FFB81C';
                                li.style.paddingLeft = '10px';
                                hasVisibleItems = true;
                            } else {
                                li.style.display = 'none';
                            }
                        });
                        
                        // Hide the entire card if no items match
                        if (!hasVisibleItems && filter !== 'all') {
                            card.style.display = 'none';
                        }
                    }
                });
            } else {
                // Reset all list items to visible when showing all
                shelterItems.forEach(card => {
                    const listItems = card.querySelectorAll('li');
                    listItems.forEach(li => {
                        li.style.display = 'block';
                        li.style.backgroundColor = '';
                        li.style.borderLeft = '';
                        li.style.paddingLeft = '';
                    });
                });
            }
        });
    });
    
    // Keyboard navigation for accessibility
    tabButtons.forEach((button, index) => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            if (e.key === 'ArrowRight') {
                const nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
            }
            if (e.key === 'ArrowLeft') {
                const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[prevIndex].focus();
            }
        });
    });
});