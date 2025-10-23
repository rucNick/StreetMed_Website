/* ================================================
   EVENTS PAGE JAVASCRIPT - (CALENDAR DISABLED)
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    /* ====================================================
       CALENDAR FUNCTIONALITY - TEMPORARILY DISABLED
       ==================================================== */
    
    /*
    // Calendar functionality
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Enhanced events data with all the events from your HTML
    const events = {
        // Regular weekly street rounds (weekends)
        '2025-10-25': { type: 'street-rounds', title: 'Saturday Street Rounds' },
    };
    
    function generateCalendar(month, year) {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        // Clear existing calendar days (keep headers)
        const dayHeaders = calendarGrid.querySelectorAll('.calendar-day-header');
        const existingDays = calendarGrid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());
        
        // Update month/year display
        const monthYearElement = document.querySelector('.calendar-month-year');
        if (monthYearElement) {
            monthYearElement.textContent = `${monthNames[month]} ${year}`;
        }
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = createDayElement(day, true, month - 1, year);
            calendarGrid.appendChild(dayElement);
        }
        
        // Add days of current month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = (year === today.getFullYear() && 
                           month === today.getMonth() && 
                           day === today.getDate());
            const dayElement = createDayElement(day, false, month, year, isToday);
            calendarGrid.appendChild(dayElement);
        }
        
        // Add days from next month to complete the grid
        const totalCells = calendarGrid.children.length - 7; // Subtract headers
        const remainingCells = 42 - totalCells;
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = createDayElement(day, true, month + 1, year);
            calendarGrid.appendChild(dayElement);
        }
    }
    
    function createDayElement(day, isOtherMonth, month, year, isToday = false) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        // Check if this day has an event
        const dateKey = `${year}-${month + 1}-${day}`;
        if (events[dateKey] && !isOtherMonth) {
            dayElement.classList.add('has-event', events[dateKey].type);
            dayElement.setAttribute('title', events[dateKey].title);
            dayElement.style.cursor = 'pointer';
        }
        
        // Also check for weekend street rounds
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        if ((dayOfWeek === 0 || dayOfWeek === 6) && !isOtherMonth && !events[dateKey]) {
            // Add default weekend street rounds if not already an event
            dayElement.classList.add('has-event', 'street-rounds');
            dayElement.setAttribute('title', `${dayOfWeek === 0 ? 'Sunday' : 'Saturday'} Street Rounds`);
            dayElement.style.cursor = 'pointer';
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Add click event for days with events
        if ((events[dateKey] || (dayOfWeek === 0 || dayOfWeek === 6)) && !isOtherMonth) {
            dayElement.addEventListener('click', function() {
                const eventDetails = events[dateKey] || {
                    title: `${dayOfWeek === 0 ? 'Sunday' : 'Saturday'} Street Rounds`,
                    type: 'street-rounds',
                    description: 'Weekly street rounds to provide care and support to individuals experiencing homelessness.'
                };
                showEventDetails(eventDetails, day, month, year);
            });
        }
        
        return dayElement;
    }
    
    function showEventDetails(event, day, month, year) {
        // Simple alert for now - you can enhance this to a modal later
        const message = `${event.title}\n${monthNames[month]} ${day}, ${year}${event.description ? '\n\n' + event.description : ''}`;
        alert(message);
    }
    
    // Navigation functions
    window.previousMonth = function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    };
    
    window.nextMonth = function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    };
    
    // Initialize calendar
    generateCalendar(currentMonth, currentYear);
    */
    
    /* ====================================================
       END OF CALENDAR SECTION
       ==================================================== */
    
    
    /* ====================================================
       PAST EVENTS SHOW/HIDE FUNCTIONALITY
       ==================================================== */
    
    // Hide past events beyond the first 6 on initial load
    function initializePastEvents() {
        const allPastEventCards = document.querySelectorAll('.past-events-grid .past-event-card');
        
        // Hide all cards after the 6th one
        allPastEventCards.forEach((card, index) => {
            if (index >= 6) {
                card.style.display = 'none';
                card.classList.add('hidden-event');
            }
        });
        
        // Setup the View More button
        const viewMoreBtn = document.querySelector('.view-more-section button');
        if (viewMoreBtn && allPastEventCards.length > 6) {
            viewMoreBtn.style.display = 'inline-block';
            
            // Remove any existing click handlers
            viewMoreBtn.onclick = null;
            
            // Add new click handler
            viewMoreBtn.addEventListener('click', function() {
                showMorePastEvents();
            });
        } else if (viewMoreBtn) {
            // Hide button if there are 6 or fewer events
            viewMoreBtn.style.display = 'none';
        }
    }
    
    // Function to show more past events
    function showMorePastEvents() {
        const hiddenEvents = document.querySelectorAll('.past-event-card.hidden-event');
        const viewMoreBtn = document.querySelector('.view-more-section button');
        
        // Show all hidden events with animation
        hiddenEvents.forEach((card, index) => {
            setTimeout(() => {
                card.style.display = 'block';
                card.classList.remove('hidden-event');
                
                // Add animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100); // Stagger the animation
        });
        
        // Update button after all events are shown
        if (viewMoreBtn) {
            setTimeout(() => {
                viewMoreBtn.textContent = 'All Events Loaded';
                viewMoreBtn.disabled = true;
                viewMoreBtn.style.opacity = '0.6';
                viewMoreBtn.style.cursor = 'not-allowed';
            }, hiddenEvents.length * 100);
        }
    }
    
    // Initialize past events display
    initializePastEvents();
    
    
    /* ====================================================
       IMAGE ERROR HANDLING
       ==================================================== */
    
    // Fix missing placeholder images
    document.querySelectorAll('.past-event-image img').forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a base64 SVG placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50IEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
        });
    });
    
    
    /* ====================================================
       SMOOTH SCROLL FUNCTIONALITY
       ==================================================== */
    
    // Smooth scroll for anchor links
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
    
    
    /* ====================================================
       ANIMATION ON SCROLL
       ==================================================== */
    
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.event-card, .past-event-card:not(.hidden-event)');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        if (!element.classList.contains('hidden-event')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animateObserver.observe(element);
        }
    });
    
    
    /* ====================================================
       HOVER EFFECTS
       ==================================================== */
    
    // Add hover effects to event buttons
    const eventButtons = document.querySelectorAll('.event-btn');
    eventButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});


/* ====================================================
   UTILITY FUNCTIONS
   ==================================================== */

// Utility function for date formatting
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to check if date is a weekend (for street rounds)
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Export functions for potential use in other scripts
window.eventsModule = {
    formatDate,
    isWeekend
};