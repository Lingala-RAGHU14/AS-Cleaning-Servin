// First, ensure GSAP and ScrollTrigger are loaded in your HTML before this script
// Add these to your HTML head if missing:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

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

    // Initialize EmailJS with the correct public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("VKLqES6lzhyYc1TUJ");
        console.log("EmailJS initialized successfully");
    } else {
        console.error('EmailJS is not loaded. Please add the EmailJS CDN link to your HTML.');
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

// Setup form validation with EmailJS and WhatsApp notifications
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    // EmailJS configuration - VERIFIED CORRECT
    const emailjsConfig = {
        serviceID: 'service_oeabpde',
        templateID: 'template_io53rzp',
        publicKey: 'aMQx4vb58zziXJRN8'
    };
    
    // WhatsApp configuration
    const businessWhatsAppNumber = "+918179867825"; // Your business WhatsApp number without the + sign
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Validate name
        if (nameInput && !nameInput.value.trim()) {
            const nameError = document.getElementById('nameError');
            if (nameError) nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Validate service
        if (serviceInput && serviceInput.value === '') {
            const serviceError = document.getElementById('serviceError');
            if (serviceError) serviceError.textContent = 'Please select a service';
            isValid = false;
        }
        
        // Validate message
        if (messageInput && !messageInput.value.trim()) {
            const messageError = document.getElementById('messageError');
            if (messageError) messageError.textContent = 'Please tell us about your cleaning needs';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Direct WhatsApp notification function - SIMPLIFIED APPROACH
    function sendWhatsAppNotification(formData) {
        const customerName = formData.get('name');
        const customerEmail = formData.get('email');
        const customerPhone = formData.get('phone') || 'Not provided';
        const requestedService = formData.get('service');
        const customerMessage = formData.get('message');
        
        // Create a formatted message for the business owner
        const notificationMessage = encodeURIComponent(
            `📣 NEW QUOTE REQUEST 📣\n\n` +
            `👤 Name: ${customerName}\n` +
            `📧 Email: ${customerEmail}\n` +
            `📱 Phone: ${customerPhone}\n` +
            `🔧 Service: ${requestedService}\n\n` +
            `📝 Message:\n${customerMessage}`
        );
        
        // Generate WhatsApp link and open it directly
        const whatsappLink = `https://api.whatsapp.com/send?phone=${businessWhatsAppNumber}&text=${notificationMessage}`;
        window.open(whatsappLink, '_blank');
    }
    
  // Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Form submitted");
    
    // Show loading state
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    }
    
    // Clear previous status messages
    if (formStatus) {
        formStatus.innerHTML = '';
    }
    
    // Validate form
    if (validateForm()) {
        console.log("Form validation passed");
        
        try {
            // Make sure EmailJS is properly initialized before sending
            if (typeof emailjs === 'undefined') {
                console.error('EmailJS is not defined. Make sure the script is loaded correctly.');
                throw new Error('EmailJS is not initialized');
            }
            
            // Use EmailJS sendForm method which is more reliable
            emailjs.sendForm('service_oeabpde', 'template_io53rzp', contactForm, 'aMQx4vb58zziXJRN8')
                .then(function(response) {
                    console.log('EmailJS SUCCESS:', response.status, response.text);
                    
                    // Send data to Google Sheets
                    const formData = new FormData(contactForm);
                    fetch('https://script.google.com/macros/s/AKfycbwZEHxXmrT7vHd8embQ7wUQ00FMTyC2roM6yGzev0KUr_TSgtD5AZ1G4_ObrgMlohI2/exec', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData
                    }).catch(error => console.error('Google Sheets error:', error));
                    
                    // Show success message
                    if (formStatus) {
                        const serviceName = serviceInput ? serviceInput.value : "cleaning service";
                        const customerName = nameInput ? nameInput.value : "customer";
                        const whatsappMessage = encodeURIComponent(`Hello, I'm ${customerName}. I just submitted a request on your website for ${serviceName} and would like to discuss further.`);
                        // Fix WhatsApp link to use proper format
                        const whatsappLink = `https://wa.me/918179867825?text=${whatsappMessage}`;
                        
                        formStatus.innerHTML = `
                            <div class="success-message p-4 bg-green-100 text-green-700 rounded-lg mt-4">
                                <p class="font-bold">Your message has been sent successfully!</p>
                                <div class="whatsapp-option mt-3">
                                    <p>Want to chat directly with us?</p>
                                    <a href="${whatsappLink}" target="_blank" class="whatsapp-button inline-block mt-2 bg-green-500 text-white py-2 px-4 rounded-lg">
                                        <i class="fab fa-whatsapp mr-2"></i> Continue on WhatsApp
                                    </a>
                                </div>
                            </div>
                        `;
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Send WhatsApp notification to business owner - use more reliable format
                    const notificationMessage = encodeURIComponent(
                        `📣 NEW QUOTE REQUEST 📣\n\n` +
                        `👤 Name: ${nameInput.value}\n` +
                        `📧 Email: ${emailInput.value}\n` +
                        `📱 Phone: ${phoneInput ? phoneInput.value : 'Not provided'}\n` +
                        `🔧 Service: ${serviceInput.value}\n\n` +
                        `📝 Message:\n${messageInput.value}`
                    );
                    
                    // Fix WhatsApp link to use proper format
                    const adminWhatsAppLink = `https://wa.me/918179867825?text=${notificationMessage}`;
                    
                    // Open in a small window that can be easily closed
                    const whatsappWindow = window.open(adminWhatsAppLink, '_blank', 'width=600,height=400');
                    if (whatsappWindow) {
                        // You can optionally close it automatically after a delay
                        // setTimeout(() => { whatsappWindow.close(); }, 5000);
                    }
                    
                }, function(error) {
                    console.error('EmailJS FAILED:', error);
                    
                    // Show error message with more details
                    if (formStatus) {
                        formStatus.innerHTML = `
                            <div class="error-message p-4 bg-red-100 text-red-700 rounded-lg mt-4">
                                <p>There was an error sending your message: ${error.text || 'Unknown error'}.</p>
                                <p>Please try again or contact us directly at raghulingala532@gmail.com.</p>
                            </div>
                        `;
                    }
                })
                .finally(function() {
                    // Reset button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '<span>Request a Quote</span> <i class="fas fa-arrow-right"></i>';
                    }
                });
        } catch (error) {
            console.error('Error in form submission:', error);
            
            // Show error message for caught exceptions
            if (formStatus) {
                formStatus.innerHTML = `
                    <div class="error-message p-4 bg-red-100 text-red-700 rounded-lg mt-4">
                        <p>There was an error processing your request: ${error.message}</p>
                        <p>Please try again or contact us directly at raghulingala532@gmail.com.</p>
                    </div>
                `;
            }
            
            // Reset button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Request a Quote</span> <i class="fas fa-arrow-right"></i>';
            }
        }
    } else {
        console.log("Form validation failed");
        // Re-enable button if validation fails
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Request a Quote</span> <i class="fas fa-arrow-right"></i>';
        }
    }
    
    // Backup timeout to ensure the button is re-enabled
    setTimeout(function() {
        if (submitButton && submitButton.disabled) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Request a Quote</span> <i class="fas fa-arrow-right"></i>';
            
            if (formStatus && formStatus.innerHTML === '') {
                formStatus.innerHTML = '<div class="error-message p-4 bg-red-100 text-red-700 rounded-lg mt-4">The request took too long. Please try again later.</div>';
            }
        }
    }, 12000);
});

    // Live validation as user types
    const inputs = [nameInput, emailInput, phoneInput, messageInput].filter(input => input !== null);
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('blur', function() {
                validateForm();
            });
        }
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
