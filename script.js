// First, ensure GSAP and ScrollTrigger are loaded in your HTML before this script
// Add these to your HTML head if missing:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Please add the GSAP CDN link to your HTML.');
        return;
    }

    // Check if ScrollTrigger is loaded and register it if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn('ScrollTrigger plugin is not loaded. Some animations may not work.');
    }

    // Testimonial Slider
    initTestimonialSlider();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Create bubbles animation
    createBubbles();
    
    // Initialize all GSAP animations with a small delay
    setTimeout(initAnimations, 100);
});

// Function to initialize testimonial slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!slides.length || !dots.length) {
        console.warn('Testimonial slides or dots not found.');
        return;
    }
    
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to the selected slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Function to go to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
        showSlide(currentSlide);
    }
    
    // Set up automatic slide transition
    let autoSlide = setInterval(nextSlide, slideInterval);
    
    // Pause auto-slide on dot click and restart it
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide); // Stop auto-slide
            showSlide(index); // Show the clicked slide
            currentSlide = index; // Update the current slide index
            autoSlide = setInterval(nextSlide, slideInterval); // Restart auto-slide
        });
    });
    
    // Initialize the first slide
    showSlide(currentSlide);
}

// Function to initialize mobile menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    
    if (!menuToggle || !mobileMenu) {
        console.warn('Mobile menu elements not found.');
        return;
    }
    
    menuToggle.addEventListener('click', () => {
        // Toggle the visibility of the mobile menu
        mobileMenu.classList.toggle('translate-x-0');
        mobileMenu.classList.toggle('translate-x-full');
        
        // Toggle burger animation
        const bars = menuToggle.children;
        if (bars.length >= 3) {
            bars[0].classList.toggle('rotate-45');
            bars[0].classList.toggle('translate-y-2');
            bars[1].classList.toggle('opacity-0');
            bars[2].classList.toggle('-rotate-45');
            bars[2].classList.toggle('-translate-y-2');
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll("#mobile-menu a");
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        });
    });
    
    // Close button functionality
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        });
    }
}

// Function to create bubbles animation
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    
    if (!bubblesContainer) {
        console.warn('Bubbles container not found.');
        return;
    }
    
    const bubbleCount = 15;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size between 10px and 50px
        const size = Math.random() * 40 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position along the width
        bubble.style.left = `${Math.random() * 100}%`;
        
        // Random delay and duration
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 8;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Initialize all GSAP animations
function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded. Cannot initialize animations.');
        return;
    }
    
    // Logo animation
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        // Initial logo animation
        gsap.from('.logo', { 
            y: -50, 
            opacity: 0, 
            duration: 1 
        });
        
        // Logo hover effects
        logoElement.addEventListener('mouseenter', () => {
            gsap.to('.logo-icon', {
                rotate: 360,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
            
            gsap.to('.logo-text', {
                color: '#3498db',
                duration: 0.3
            });
        });
        
        logoElement.addEventListener('mouseleave', () => {
            gsap.to('.logo-text', {
                color: '#2c3e50',
                duration: 0.3
            });
        });
    }
    
    // Nav links staggered animation
    const navLinks = document.querySelectorAll('.nav-links li');
    if (navLinks.length) {
        gsap.to('.nav-links li', { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2, 
            duration: 0.8 
        });
    }
    
    // ScrollTrigger animations - only initialize if ScrollTrigger is loaded
    if (typeof ScrollTrigger !== 'undefined') {
        // Hero section animation
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            gsap.from('.hero-content', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top center',
                    toggleActions: 'play none none none'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
            
            gsap.from('.cleaning-tool', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top center',
                    toggleActions: 'play none none none'
                },
                scale: 0,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
        }
        
        // Services section animation
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
            gsap.from('.section-header', {
                scrollTrigger: {
                    trigger: '.services-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8
            });
            
            // Service card animations
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                gsap.fromTo(card, 
                    {
                        y: 50,
                        opacity: 0
                    },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom-=100',
                            end: 'bottom center',
                            toggleActions: 'play none none reset',
                            id: `card-${index}`
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        delay: index * 0.1,
                        ease: 'power1.out'
                    }
                );
            });
        }
        
        // About section animation
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            gsap.from('.about-image', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
            
            gsap.from('.about-content', {
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
            
            gsap.from('.stat-item', {
                scrollTrigger: {
                    trigger: '.about-stats',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back.out(1.2)'
            });
        }
        
        // Testimonials section animation
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            gsap.from('.testimonials-section', {
                scrollTrigger: {
                    trigger: '.testimonials-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8
            });
            
            gsap.from('.testimonial-slide', {
                scrollTrigger: {
                    trigger: '.testimonials-container',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: 'power1.out'
            });
            
            gsap.from('.testimonial-dot', {
                scrollTrigger: {
                    trigger: '.testimonials-container',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                scale: 0,
                opacity: 0,
                stagger: 0.15,
                duration: 0.5,
                ease: 'back.out(2)'
            });
        }
        
        // Contact section animation
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            gsap.from('.contact-section', {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8
            });
            
            gsap.from('.contact-container form', {
                scrollTrigger: {
                    trigger: '.contact-container',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.from('.form-group', {
                scrollTrigger: {
                    trigger: '.contact-container',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 15,
                opacity: 0.5,
                stagger: 0.1,
                duration: 0.5,
                ease: 'power1.out'
            });
        }
        
        // Footer animation
        const footer = document.querySelector('.footer');
        if (footer) {
            gsap.from('.footer-container', {
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8
            });
            
            gsap.from('.social-icons a', {
                scrollTrigger: {
                    trigger: '.social-icons',
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        }
    }
    
    // Form validation setup
    setupFormValidation();
    
    // Navbar color change on scroll
    setupNavbarScroll();
}

// Setup form validation
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Validate name (required)
        if (nameInput && !nameInput.value.trim()) {
            const nameError = document.getElementById('nameError');
            if (nameError) nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email (required and format)
        if (emailInput) {
            if (!emailInput.value.trim()) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Validate phone (format)
        if (phoneInput && phoneInput.value.trim() && !/^[\d\s\-\(\)\.]+$/.test(phoneInput.value.trim())) {
            const phoneError = document.getElementById('phoneError');
            if (phoneError) phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        // Validate service selection
        if (serviceInput && serviceInput.value === '') {
            const serviceError = document.getElementById('serviceError');
            if (serviceError) serviceError.textContent = 'Please select a service';
            isValid = false;
        }
        
        // Validate message (required)
        if (messageInput && !messageInput.value.trim()) {
            const messageError = document.getElementById('messageError');
            if (messageError) messageError.textContent = 'Please tell us about your cleaning needs';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Disable form while submitting
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span>Sending</span><i class="fas fa-spinner fa-spin"></i>';
                submitButton.style.animation = 'pulse 1.5s infinite';
            }
            
            if (formStatus) formStatus.innerHTML = '';
            
            // Simulate form submission (replace with your actual submission code)
            setTimeout(() => {
                if (formStatus) {
                    // Create success checkmark and message
                    formStatus.innerHTML = `
                        <div class="success-checkmark show">
                            <div class="check-icon"></div>
                        </div>
                        <div class="status-success">Thank you! We've received your request and will contact you shortly.</div>
                    `;
                    
                    // Apply animation to checkmark
                    const checkIcon = document.querySelector('.check-icon');
                    if (checkIcon) {
                        checkIcon.style.animation = 'checkmark 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards';
                    }
                    
                    // Scroll to success message
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        // Fade out animation
                        formStatus.style.opacity = '0';
                        formStatus.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            formStatus.innerHTML = '';
                            formStatus.style.opacity = '1';
                            formStatus.className = '';
                        }, 500);
                    }, 5000);
                }
                
                // Reset form
                contactForm.reset();
                
                // Re-enable submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Request a Quote</span><i class="fas fa-arrow-right"></i>';
                    submitButton.style.animation = '';
                }
            }, 1500);
            
            // In a real application, you would use fetch here
            // Commented out to avoid actual API calls
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    service: serviceInput.value,
                    message: messageInput.value
                })
            })
            .then(response => response.json())
            .then(data => {
                formStatus.textContent = 'Thank you! We\'ve received your request and will contact you shortly.';
                formStatus.className = 'status-success';
                contactForm.reset();
            })
            .catch(error => {
                formStatus.textContent = 'There was an error sending your request. Please try again or call us directly.';
                formStatus.className = 'status-error';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Request a Quote';
            });
            */
        }
    });
    
    // Live validation as user types
    const inputs = [nameInput, emailInput, phoneInput, messageInput].filter(input => input !== null);
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateForm();
        });
    });
    
    // Validate service when changed
    if (serviceInput) {
        serviceInput.addEventListener('change', function() {
            validateForm();
        });
    }
}

// Setup navbar scroll effects
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-xl');
            navbar.classList.remove('bg-gradient-nav');
        } else {
            navbar.classList.add('bg-gradient-nav');
            navbar.classList.remove('bg-white', 'shadow-xl');
        }
    });
}