// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Save the current theme to localStorage
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', currentTheme);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navbarLinks = document.querySelector('.navbar-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
    });
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally send the form data to the server
        // For demo purposes, we'll just show the success message
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.style.display = 'flex';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
        contactForm.reset();
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
        body.classList.add('dark-mode');
    }

    // Animate skill bars if on about page
    if (document.querySelector('.skill-progress')) {
        animateSkillBars();
    }

    // Add scroll animations to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-preview, .skill-category, .timeline-item, .project-card, .contact-form-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    };
    
    animateOnScroll();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Carousel Functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    let currentIndex = 0;
    const totalItems = certificateItems.length;
    const rotationAngle = 360 / totalItems;
    
    // Create indicators
    certificateItems.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    // Update carousel position
    function updateCarousel() {
        const rotation = -currentIndex * rotationAngle;
        carousel.style.transform = `rotateY(${rotation}deg)`;
        
        // Update active indicator
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Initialize carousel if it exists
    if (document.querySelector('.carousel')) {
        initCarousel();
    }
});