const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme', currentTheme);
    });
}

const hamburger = document.getElementById('hamburger');
const navbarLinks = document.querySelector('.navbar-links');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navbarLinks.classList.toggle('active');

        if (navbarLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (navbarLinks && navbarLinks.classList.contains('active') &&
        !navbarLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarLinks && navbarLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

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
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
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

function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const quickQuestions = document.querySelectorAll('.quick-question');

    if (!chatbotToggle) return;

    chatbotToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (chatbotWindow.classList.contains('active') &&
            !chatbotWindow.contains(e.target) &&
            !chatbotToggle.contains(e.target)) {
            chatbotWindow.classList.remove('active');
        }
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            processMessage(message);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingDiv;
    }

    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        const typing = showTyping();

        setTimeout(() => {
            typing.remove();
            let response = '';

            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                response = "Hello! I'm here to help you learn about Pitso's portfolio.";
            } else if (lowerMessage.includes('skill')) {
                response = "Pitso specializes in Java, Spring Boot, Databases, Mobile & Cloud.";
            } else if (lowerMessage.includes('project')) {
                response = "Check the Projects page for Pitso's work and GitHub links.";
            } else {
                response = "Ask me about skills, projects, certifications, or contact info.";
            }

            addMessage(response, 'bot');
        }, 800 + Math.random() * 500);
    }

    if (chatbotSend) chatbotSend.addEventListener('click', sendMessage);

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    quickQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const questionText = question.getAttribute('data-question');
            addMessage(questionText, 'user');
            processMessage(questionText);
        });
    });
}

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    let animationSpeed = 40;
    const slowDownBtn = document.getElementById('slowDownBtn');
    const speedUpBtn = document.getElementById('speedUpBtn');

    if (slowDownBtn) {
        slowDownBtn.addEventListener('click', () => {
            animationSpeed += 10;
            carousel.style.animationDuration = animationSpeed + 's';
        });
    }

    if (speedUpBtn) {
        speedUpBtn.addEventListener('click', () => {
            animationSpeed = Math.max(10, animationSpeed - 10);
            carousel.style.animationDuration = animationSpeed + 's';
        });
    }

    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-preview, .skill-category, .timeline-item, .project-card, .contact-form-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function fixVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
        body.classList.add('dark-mode');
    }

    fixVH();
    window.addEventListener('resize', fixVH);
    window.addEventListener('orientationchange', fixVH);

    if (document.querySelector('.skill-progress')) animateSkillBars();

    animateOnScroll();
    initSmoothScroll();
    initChatbot();
    initCarousel();
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) event.preventDefault();
    lastTouchEnd = now;
}, false);

function checkFontAwesome() {
    const styleSheets = Array.from(document.styleSheets);
    const fontAwesomeLoaded = styleSheets.some(sheet => {
        try {
            return sheet.href && sheet.href.includes('font-awesome');
        } catch {
            return false;
        }
    });

    if (!fontAwesomeLoaded) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
    }
}

window.addEventListener('load', checkFontAwesome);
