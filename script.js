document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE MENU TOGGLE
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle 'active' class for hamburger animation (X shape)
            hamburger.classList.toggle('active');
            // Slide menu in/out
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    /* =========================================
       2. STICKY HEADER EFFECT
       ========================================= */
    const header = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky-nav');
            // Note: You can add .sticky-nav styles in CSS if you want a different shadow/height on scroll
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        } else {
            header.classList.remove('sticky-nav');
            header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
        }
    });

    /* =========================================
       3. ACTIVE LINK HIGHLIGHTING
       ========================================= */
    // Automatically set the 'active' class on the navbar based on the current URL
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-link');
    const menuLength = menuItems.length;

    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            // Remove active class from all
            menuItems.forEach(item => item.classList.remove('active'));
            // Add to current
            menuItems[i].classList.add('active');
        }
    }

    /* =========================================
       4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================= */
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .fade-in-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed (for one-time animation)
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================
       5. NUMBER COUNTER ANIMATION
       ========================================= */
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true; // Ensure it only runs once

                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + "+";
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    /* =========================================
       6. SMOOTH SCROLLING (For Anchor Links)
       ========================================= */
    // This handles links like <a href="#infra"> and offsets them so the Sticky Header doesn't cover the title
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty links

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // For Sidebar: Add active class to clicked link
                const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
                if (sidebarLinks.length > 0) {
                    sidebarLinks.forEach(link => link.classList.remove('active-link'));
                    if (this.closest('.sidebar-nav')) {
                        this.classList.add('active-link');
                    }
                }
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function () {

        const sections = document.querySelectorAll('.service-section');
        const links = document.querySelectorAll('.sidebar-nav a');

        // Show only infra by default
        sections.forEach(section => {
            section.style.display = section.id === 'infra' ? 'block' : 'none';
        });

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (!targetSection) return;

                // Hide all sections
                sections.forEach(sec => sec.style.display = 'none');

                // Show selected section
                targetSection.style.display = 'block';

                // Active state
                links.forEach(l => l.classList.remove('active-link'));
                this.classList.add('active-link');

                // Scroll nicely
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

    });

    // Mobile Sidebar Toggle
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }





    /* =========================================
       7. SIMPLE TESTIMONIAL SLIDER (Auto-play)
       ========================================= */
    // This simulates a slider if you have multiple .testimonial-card elements
    // For the HTML provided, we currently have one, but if you add more, this logic works.
    /* let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none'; // Or use classes for fade
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 4000);
    }
    */
});