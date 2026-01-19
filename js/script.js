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
// Chatbot Functionality
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const quickQuestions = document.querySelectorAll('.quick-question');

    if (!chatbotToggle) return; // Exit if chatbot elements don't exist

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatbotWindow.contains(e.target) && 
            !chatbotToggle.contains(e.target) && 
            chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
        }
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            processMessage(message);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
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

    // Process user message
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        showTyping();
        
        setTimeout(() => {
            document.querySelector('.typing-indicator')?.remove();
            
            let response = '';
            
            // Predefined responses
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                response = "Hello! I'm here to help you learn about Pitso's portfolio. You can ask me about skills, projects, experience, or certifications.";
            } else if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
                response = "Pitso specializes in:<br>• Java & Spring Boot (85%)<br>• Database Management (MySQL, PostgreSQL)<br>• Mobile Development with React Native<br>• Cloud & DevOps (Oracle Cloud, Azure)<br>• Full-Stack Web Development<br>Check the About page for detailed skill breakdown!";
            } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
                response = "Notable projects include:<br>• <strong>GIGConnectSkill SA</strong> - FNB Hackathon mobile app<br>• <strong>AI Fraud Detection</strong> - Machine learning project<br>• <strong>Personal Portfolio</strong> - Full-stack website<br>• <strong>VUT Eats</strong> - Campus food ordering system<br>Visit the Projects page for details and GitHub links!";
            } else if (lowerMessage.includes('certif') || lowerMessage.includes('cert')) {
                response = "Pitso has 11+ certifications:<br>• Oracle Cloud Infrastructure DevOps Professional<br>• Microsoft Azure Fundamentals (AZ-900)<br>• Multiple Cisco certifications (Networking, Cybersecurity)<br>• Spring Boot & Git/GitHub from AmigosCode<br>View the spinning certificates carousel on the About page!";
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
                response = "Contact information:<br>• Email: pnkotolane@gmail.com<br>• Phone: +27 63 865 4343<br>• Location: Johannesburg, South Africa<br>• LinkedIn: linkedin.com/in/pitso-nkotolane<br>• GitHub: github.com/Pitso4859<br>Use the Contact page to send a direct message!";
            } else if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
                response = "Experience includes:<br>• <strong>Diploma in IT</strong> - Vaal University of Technology (Completed Nov 2025)<br>• <strong>Volunteer Tutor</strong> - Software Development mentor<br>• <strong>Multiple certifications</strong> from Oracle, Cisco, Microsoft<br>• <strong>Hackathon participation</strong> - FNB App of the Year<br>Check the timeline on the About page!";
            } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
                response = "Pitso completed a <strong>Diploma in Information Technology</strong> at Vaal University of Technology in November 2025. The program focused on software development, networking, and IT systems with distinction-level performance in core programming courses.";
            } else if (lowerMessage.includes('github') || lowerMessage.includes('code')) {
                response = "Check out Pitso's GitHub: <strong>github.com/Pitso4859</strong><br>All projects are publicly available with source code. You'll find Java applications, React Native mobile apps, Spring Boot projects, and more!";
            } else if (lowerMessage.includes('hire') || lowerMessage.includes('job') || lowerMessage.includes('opportunity')) {
                response = "Pitso is available for:<br>• Full-time software development positions<br>• Graduate programs<br>• Internship opportunities<br>• Freelance projects<br>• Collaborative work<br>Use the Contact page to discuss opportunities!";
            } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
                response = "You can download Pitso's resume directly from the website! Look for the 'Download CV' button on the Home or About pages. The resume includes detailed information about education, skills, projects, and certifications.";
            } else {
                response = "I'm not sure how to answer that. You can ask me about:<br>• Skills and technologies<br>• Projects and GitHub<br>• Certifications<br>• Contact information<br>• Education and experience<br>Or click one of the quick questions above!";
            }
            
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick questions
    quickQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const questionText = question.getAttribute('data-question');
            addMessage(questionText, 'user');
            processMessage(questionText);
        });
    });

    // Initialize with welcome message if chat is empty
    if (chatbotMessages.children.length <= 1) {
        setTimeout(() => {
            addMessage("Try asking: 'What are your main skills?' or 'Tell me about your projects'", 'bot');
        }, 2000);
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Initialize chatbot
    initChatbot();
});
