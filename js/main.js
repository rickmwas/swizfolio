// Main Portfolio JavaScript with GSAP Animations
// =========================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

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

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
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
    const projectCards = document.querySelectorAll('.project-card');
    gsap.to(projectCards, {
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

    // Optional: Page transition on nav clicks
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            gsap.to('body', {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.to('body', { opacity: 1, duration: 0.3 });
                }
            });
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

