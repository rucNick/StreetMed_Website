/* ================================================
   EVENTS PAGE JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Sample events data (in production, this would come from a database)
    const events = {
        '2025-1-4': { type: 'street-rounds', title: 'Downtown Street Rounds' },
        '2025-1-5': { type: 'street-rounds', title: 'East Liberty Street Rounds' },
    };
    
    function generateCalendar(month, year) {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        // Clear existing calendar days (keep headers)
        const dayHeaders = calendarGrid.querySelectorAll('.calendar-day-header');
        calendarGrid.innerHTML = '';
        dayHeaders.forEach(header => calendarGrid.appendChild(header));
        
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
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Add click event for days with events
        if (events[dateKey] && !isOtherMonth) {
            dayElement.addEventListener('click', function() {
                showEventDetails(events[dateKey], day, month, year);
            });
        }
        
        return dayElement;
    }
    
    function showEventDetails(event, day, month, year) {
        // In production, this would show a modal or navigate to event details
        alert(`${event.title} on ${monthNames[month]} ${day}, ${year}`);
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
    
    // Load more past events functionality
    window.loadMoreEvents = function() {
        const grid = document.querySelector('.past-events-grid');
        const button = document.querySelector('.view-more-section button');
        
        if (!grid || !button) return;
        
        // Sample additional events (in production, this would be an API call)
        const moreEvents = [
                // future implemented
        ];
        
        // Add new event cards
        moreEvents.forEach(event => {
            const card = createPastEventCard(event);
            grid.appendChild(card);
        });
        
        // Update button text
        button.textContent = 'All Events Loaded';
        button.disabled = true;
        button.style.opacity = '0.6';
    };
    
    function createPastEventCard(event) {
        const card = document.createElement('div');
        card.className = 'past-event-card';
        
        card.innerHTML = `
            <div class="past-event-image">
                <img src="Events/placeholder.jpg" alt="${event.title}">
                <div class="event-overlay">
                    <span class="event-date-overlay">${event.date}</span>
                </div>
            </div>
            <div class="past-event-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-stats">
                    ${Object.entries(event.stats).map(([key, value]) => 
                        `<span class="stat"><strong>${value}</strong> ${key}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        return card;
    }
    
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
    
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.event-card, .past-event-card');
    
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
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(element);
    });
    
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
    
    // Calendar day hover effect
    const calendarDays = document.querySelectorAll('.calendar-day.has-event');
    calendarDays.forEach(day => {
        day.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        day.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

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