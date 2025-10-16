// Main Portfolio JavaScript with GSAP Animations and Modern Features
// =========================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 3000);
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Voice Interaction Mode
    const voiceToggle = document.getElementById('voice-toggle');
    let isListening = false;
    let recognition = null;

    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = function() {
            isListening = true;
            voiceToggle.classList.add('listening');
            gsap.to(voiceToggle, { scale: 1.2, duration: 0.3 });
            // Add wave animation
            const wave = document.createElement('div');
            wave.className = 'voice-wave';
            wave.style.cssText = `
                position: absolute;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 4px;
                background: linear-gradient(90deg, transparent, #28a745, transparent);
                border-radius: 2px;
                animation: wavePulse 1s infinite;
            `;
            voiceToggle.appendChild(wave);
        };

        recognition.onend = function() {
            isListening = false;
            voiceToggle.classList.remove('listening');
            gsap.to(voiceToggle, { scale: 1, duration: 0.3 });
            const wave = voiceToggle.querySelector('.voice-wave');
            if (wave) wave.remove();
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            handleVoiceCommand(transcript);
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            voiceToggle.classList.remove('listening');
        };
    }

    function handleVoiceCommand(command) {
        // Voice commands
        if (command.includes('show projects') || command.includes('projects')) {
            scrollToSection('projects');
            speakResponse('Showing your projects section.');
        } else if (command.includes('toggle dark mode') || command.includes('dark mode')) {
            document.getElementById('dark-mode-toggle').click();
            speakResponse('Toggling dark mode.');
        } else if (command.includes('open contact') || command.includes('contact form')) {
            scrollToSection('contact');
            speakResponse('Opening contact form.');
        } else if (command.includes('about') || command.includes('who are you')) {
            scrollToSection('about');
            speakResponse('Here\'s information about Erick Mwangi.');
        } else if (command.includes('services') || command.includes('what do you do')) {
            scrollToSection('services');
            speakResponse('Check out the services offered.');
        } else if (command.includes('home') || command.includes('top')) {
            scrollToSection('home');
            speakResponse('Going to the top of the page.');
        } else {
            speakResponse('I didn\'t understand that command. Try saying "show projects", "toggle dark mode", or "open contact".');
        }
    }

    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    function speakResponse(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }

    if (voiceToggle) {
        voiceToggle.addEventListener('click', function() {
            if (recognition && !isListening) {
                recognition.start();
            } else if (isListening) {
                recognition.stop();
            } else {
                alert('Voice recognition is not supported in your browser. Try Chrome or Edge.');
            }
        });
    }

    // SwizBot Chat
    const swizbotToggle = document.querySelector('.swizbot-toggle');
    const swizbotChat = document.querySelector('.swizbot-chat');
    const swizbotClose = document.querySelector('.swizbot-close');
    const swizbotInput = document.querySelector('.swizbot-input input');
    const swizbotSend = document.querySelector('.swizbot-send');
    const swizbotMessages = document.querySelector('.swizbot-messages');

    const responses = {
        'hello': 'Hello! Welcome to my portfolio. How can I help you today?',
        'hi': 'Hi there! Thanks for visiting. What would you like to know?',
        'about': 'I\'m Erick Mwangi, a Full-Stack Developer and AI Specialist based in Kisii, Kenya. I love creating innovative solutions!',
        'projects': 'Check out my projects section! I have worked on AI chatbots, e-commerce platforms, and health monitoring apps.',
        'contact': 'You can reach me through the contact form or connect with me on LinkedIn and GitHub. I\'d love to hear from you!',
        'skills': 'I specialize in AI/ML, React, Node.js, Python, and cloud technologies. Always learning something new!',
        'experience': 'I have experience in full-stack development, AI implementation, and creating scalable web applications.',
        'default': 'That\'s interesting! Feel free to ask me about my work, skills, or anything else. I\'m here to help!'
    };

    if (swizbotToggle && swizbotChat) {
        swizbotToggle.addEventListener('click', function() {
            swizbotChat.classList.toggle('active');
        });

        swizbotClose.addEventListener('click', function() {
            swizbotChat.classList.remove('active');
        });

        function sendMessage() {
            const message = swizbotInput.value.trim().toLowerCase();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.innerHTML = `<p>${swizbotInput.value}</p>`;
                swizbotMessages.appendChild(userMessage);

                // Get bot response
                const response = responses[message] || responses['default'];
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    botMessage.innerHTML = `<p>${response}</p>`;
                    swizbotMessages.appendChild(botMessage);
                    swizbotMessages.scrollTop = swizbotMessages.scrollHeight;
                }, 500);

                swizbotInput.value = '';
                swizbotMessages.scrollTop = swizbotMessages.scrollHeight;
            }
        }

        swizbotSend.addEventListener('click', sendMessage);
        swizbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Project Modal
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalTags = document.querySelector('.modal-tags');
    const modalDescription = document.querySelector('.modal-description');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const tags = this.querySelectorAll('.project-tag');

            modalImage.src = img;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalTags.innerHTML = '';

            tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'project-tag';
                tagElement.textContent = tag.textContent;
                modalTags.appendChild(tagElement);
            });

            projectModal.classList.add('active');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            projectModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Particles.js Initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ff4c4c' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ff4c4c',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // GSAP Animations
    // Set initial states to ensure visibility
    gsap.set('.hero', { scale: 1.1 });
    gsap.set('.profile-pic', { opacity: 0, y: 50 });
    gsap.set('h1', { opacity: 0, y: 30 });
    gsap.set('.hero p', { opacity: 0, y: 20 });
    gsap.set('.hero-btns', { opacity: 0, y: 20 });
    gsap.set('.social-icons', { opacity: 0, y: 20 });
    gsap.set('.scroll-down', { opacity: 0, y: 20 });

    gsap.set('h2', { opacity: 0, y: 30 });
    gsap.set('.skill-progress', { width: 0 });
    gsap.set('.service-card', { opacity: 0, y: 50 });
    gsap.set('.project-card', { opacity: 0, y: 50, rotationY: 15 });
    gsap.set('.faq-item', { opacity: 0, x: -30 });

    // Hero Entrance Animation
    const heroTl = gsap.timeline();
    heroTl
        .to('.hero', { scale: 1, duration: 1.5, ease: "power3.out" })
        .to('.profile-pic', { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" }, "-=1")
        .to('h1', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to('.hero p', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .to('.hero-btns', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .to('.social-icons', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .to('.scroll-down', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");

    // Floating animations for hero elements
    gsap.to('.profile-pic', {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });

    gsap.to('.social-icons a', {
        y: -5,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.1
    });

    // Reveal text animations for section headings
    const headings = document.querySelectorAll('h2');
    headings.forEach(heading => {
        gsap.to(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            width: originalWidth,
            duration: 1.5,
            ease: "power3.out"
        });
    });

    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    gsap.to(serviceCards, {
        scrollTrigger: {
            trigger: '.services-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    // Project cards animation
    const projectCardsAnim = document.querySelectorAll('.project-card');
    gsap.to(projectCardsAnim, {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3
    });

    // FAQ items animation
    const faqItems = document.querySelectorAll('.faq-item');
    gsap.to(faqItems, {
        scrollTrigger: {
            trigger: '.faq-grid',
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    // Parallax effect for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50,
            ease: "none"
        });
    });

    // Ambient Light Glow System
    const ambientGlow = document.getElementById('ambient-glow');
    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    // Section color themes
    const sectionThemes = {
        home: { hue: 0, saturation: 100, lightness: 50 }, // Red
        about: { hue: 220, saturation: 100, lightness: 50 }, // Blue
        services: { hue: 120, saturation: 100, lightness: 50 }, // Green
        projects: { hue: 280, saturation: 100, lightness: 50 }, // Purple
        faq: { hue: 60, saturation: 100, lightness: 50 }, // Yellow
        contact: { hue: 300, saturation: 100, lightness: 50 }, // Magenta
        default: { hue: 0, saturation: 100, lightness: 50 }
    };

    function getCurrentSection() {
        const sections = ['home', 'about', 'services', 'projects', 'faq', 'contact'];
        const scrollY = window.scrollY + window.innerHeight / 2;

        for (let section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                const elementBottom = elementTop + rect.height;

                if (scrollY >= elementTop && scrollY < elementBottom) {
                    return section;
                }
            }
        }
        return 'default';
    }

    function updateGlowColor() {
        const currentSection = getCurrentSection();
        const theme = sectionThemes[currentSection];
        const hslColor = `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`;
        ambientGlow.style.background = `radial-gradient(circle, ${hslColor} 0%, rgba(${theme.hue}, ${theme.saturation}, ${theme.lightness}, 0.1) 50%, transparent 70%)`;
    }

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        // Check for nearby elements
        const nearbyElements = document.querySelectorAll('a, button, .btn, .project-card, .service-card, .faq-item');
        let isNearElement = false;

        nearbyElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

            if (distance < 100) { // Within 100px
                isNearElement = true;
            }
        });

        // Adjust glow intensity based on proximity
        if (isNearElement) {
            ambientGlow.style.filter = 'blur(30px)';
            ambientGlow.style.transform = 'scale(1.5)';
        } else {
            ambientGlow.style.filter = 'blur(20px)';
            ambientGlow.style.transform = 'scale(1)';
        }
    });

    function updateGlowPosition() {
        glowX += (targetX - glowX) * 0.05;
        glowY += (targetY - glowY) * 0.05;

        ambientGlow.style.left = glowX + 'px';
        ambientGlow.style.top = glowY + 'px';

        updateGlowColor();
        requestAnimationFrame(updateGlowPosition);
    }
    updateGlowPosition();

    // Magnetic cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    // Trusted By Section Animations
    const trustedBySection = document.querySelector('.trusted-by');
    const logoItems = document.querySelectorAll('.logo-item');
    const logosWrapper = document.querySelector('.logos-wrapper');

    if (trustedBySection && logoItems.length > 0) {
        // Initial fade-in from blur with stagger
        gsap.set(logoItems, { opacity: 0, filter: 'blur(10px)', y: 20 });

        gsap.to(logoItems, {
            scrollTrigger: {
                trigger: trustedBySection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Infinite horizontal scroll animation
        const totalWidth = logosWrapper.scrollWidth / 2; // Since we duplicate for seamless loop
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(logosWrapper, {
            x: -totalWidth,
            duration: 20,
            ease: "none"
        });

        // Duplicate logos for seamless loop
        const originalLogos = Array.from(logoItems);
        originalLogos.forEach(logo => {
            const clone = logo.cloneNode(true);
            logosWrapper.appendChild(clone);
        });

        // Hover interactions
        logoItems.forEach((logo, index) => {
            logo.addEventListener('mouseenter', () => {
                gsap.to(tl, { timeScale: 0.3, duration: 0.5 }); // Slow down animation
                gsap.to(logo, { scale: 1.15, duration: 0.3, ease: "power2.out" });
                gsap.to(logo, {
                    boxShadow: "0 0 30px rgba(255, 76, 76, 0.6)",
                    duration: 0.3
                });
            });

            logo.addEventListener('mouseleave', () => {
                gsap.to(tl, { timeScale: 1, duration: 0.5 }); // Resume normal speed
                gsap.to(logo, { scale: 1, duration: 0.3, ease: "power2.out" });
                gsap.to(logo, { boxShadow: "0 0 0px rgba(255, 76, 76, 0)", duration: 0.3 });
            });
        });

        // Parallax effect on scroll
        gsap.to(logosWrapper, {
            scrollTrigger: {
                trigger: trustedBySection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -30,
            ease: "none"
        });

        // Subtle wave motion
        logoItems.forEach((logo, index) => {
            gsap.to(logo, {
                y: Math.sin(index * 0.5) * 5,
                duration: 2 + Math.random() * 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2
            });
        });
    }
});
