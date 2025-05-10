
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
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
    
    // Create bubbles for cleaning effect
    const bubblesContainer = document.querySelector('.bubbles');
    const numBubbles = 15;
    
    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubblesContainer.appendChild(bubble);
        
        // Position bubbles randomly
        const xPos = Math.random() * 100;
        const delay = Math.random() * 5;
        const size = Math.random() * 30 + 10;
        
        bubble.style.left = `${xPos}%`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Animate bubbles
        gsap.to(bubble, {
            y: -100 - size,
            x: Math.random() * 50 - 25,
            opacity: 0.7,
            scale: 1,
            duration: 4 + Math.random() * 6,
            delay: delay,
            ease: 'power1.out',
            repeat: -1,
            repeatDelay: Math.random() * 5,
            onRepeat: function() {
                gsap.set(bubble, {
                    y: 100,
                    x: Math.random() * 100,
                    scale: 0,
                    opacity: 0
                });
            }
        });
    }
    
    // Background color animation
    gsap.to('.navbar::before', {
        opacity: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    // gsap.to('.navbar', {
    //     backgrounfd: linear-gradient(135deg, #03a9f4 0%, #288d1 100%),
    // duration : 3,
    //     re)

    // })
    
    // Create timeline for initial animations
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Logo animation
    timeline.from('.logo', { 
        y: -50, 
        opacity: 0, 
        duration: 1 
    });
    
    // Nav links staggered animation
    timeline.to('.nav-links li', { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8 
    }, '-=0.5');
    
    // CTA button animation - more subtle entrance without disappearing
    // timeline.from('.cta-button', { 
    //     y: 20,
    //     duration: 0.8,
    //     scale: 0.9,
    //     ease: 'back.out(1.7)'
    // }, '-=0.5');
    
    // // Subtle pulse animation that repeats a few times to draw attention
    // timeline.to('.cta-button', {
    //     scale: 1.05,
    //     duration: 0.5,
    //     repeat: 2,
    //     yoyo: true,
    //     ease: 'power1.inOut',
    //     delay: 0.2
    // });
    
    // Hover effects for logo using GSAP
    const logoElement = document.querySelector('.logo');
    
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
    
    // Mobile navigation toggle
    // const burger = document.querySelector('.burger');
    // const nav = document.querySelector('.nav-links');
    // const navLinks = document.querySelectorAll('.nav-links li');
    
    // burger.addEventListener('click', () => {
    //     // Toggle Nav
    //     nav.classList.toggle('nav-active');
        
    //     // Animate Links
    //     navLinks.forEach((link, index) => {
    //         if (link.style.animation) {
    //             link.style.animation = '';
    //         } else {
    //             link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    //         }
    //     });
        
    //     // Burger Animation
    //     burger.classList.toggle('toggle');
        
    //     // Use GSAP for burger animation
    //     if (burger.classList.contains('toggle')) {
    //         gsap.to('.line1', { rotation: -45, y: 8, duration: 0.3 });
    //         gsap.to('.line2', { opacity: 0, duration: 0.3 });
    //         gsap.to('.line3', { rotation: 45, y: -8, duration: 0.3 });
    //     } else {
    //         gsap.to('.line1', { rotation: 0, y: 0, duration: 0.3 });
    //         gsap.to('.line2', { opacity: 1, duration: 0.3 });
    //         gsap.to('.line3', { rotation: 0, y: 0, duration: 0.3 });
    //     }
    // });
    
    // // Scroll animation for navbar
    // window.addEventListener('scroll', () => {
    //     const navbar = document.querySelector('.navbar');
        
    //     if (window.scrollY > 50) {
    //         gsap.to(navbar, {
    //             padding: '1rem 5%',
    //             background: 'linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%)',
    //             boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
    //             duration: 0.3
    //         });
            
    //         // Make bubbles more transparent on scroll
    //         gsap.to('.bubble', {
    //             opacity: 0.4,
    //             duration: 0.3
    //         });
    //     } else {
    //         gsap.to(navbar, {
    //             padding: '1.5rem 5%',
    //             background: 'linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%)',
    //             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    //             duration: 0.3
    //         });
            
    //         // Restore bubble opacity
    //         gsap.to('.bubble', {
    //             opacity: 0.7,
    //             duration: 0.3
    //         });
    //     }
    // });
    
    // // Shimmering water effect for cleaning theme
    // const shimmerTimeline = gsap.timeline({repeat: -1});
    // shimmerTimeline.to('.navbar', {
    //     backgroundImage: 'linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 50%, #bbdefb 100%)',
    //     duration: 3,
    //     ease: 'sine.inOut'
    // });
    // shimmerTimeline.to('.navbar', {
    //     backgroundImage: 'linear-gradient(135deg, #bbdefb 0%, #b3e5fc 50%, #e0f7fa 100%)',
    //     duration: 3,
    //     ease: 'sine.inOut'
    // });

    // // Wait for DOM to be fully loaded

    
    // // Add a small delay to ensure all elements are properly loaded
    // setTimeout(function() {
    //     initAnimations();
    // }, 100);
    
    // function initAnimations() {
    
    // Keep the existing navbar animations (if any)
    // Focus on adding scroll animations to other sections
    
    // Hero section animation
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
    
    
    // Services section animation
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
    
    // Service card animations with direct targeting and improved settings
    let serviceCards = document.querySelectorAll('.service-card');
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
                    // markers: true, // Uncomment to debug
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
    
    // About section animation
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
    
    // Testimonials section animation
    gsap.from('.testimonials-section ', {
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
    document.addEventListener('DOMContentLoaded', function() {
        // Add Font Awesome if not already in the document
        if (!document.querySelector('link[href*="font-awesome"]')) {
          const fontAwesome = document.createElement('link');
          fontAwesome.rel = 'stylesheet';
          fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
          document.head.appendChild(fontAwesome);
        }
        const contactForm = document.getElementById('contactForm');
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
          if (!nameInput.value.trim()) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
          }
          
          // Validate email (required and format)
          if (!emailInput.value.trim()) {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
          }
          
          // Validate phone (format)
          if (phoneInput.value.trim() && !/^[\d\s\-\(\)\.]+$/.test(phoneInput.value.trim())) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            isValid = false;
          }
          
          // Validate service selection
          if (serviceInput.value === '') {
            document.getElementById('serviceError').textContent = 'Please select a service';
            isValid = false;
          }
          
          // Validate message (required)
          if (!messageInput.value.trim()) {
            document.getElementById('messageError').textContent = 'Please tell us about your cleaning needs';
            isValid = false;
          }
          
          return isValid;
        }
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          if (validateForm()) {
            // Disable form while submitting
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending</span><i class="fas fa-spinner fa-spin"></i>';
            formStatus.innerHTML = '';
            
            // Add pulse animation to button
            submitButton.style.animation = 'pulse 1.5s infinite';
            
            // Simulate form submission (replace with your actual submission code)
            setTimeout(() => {
              // Create success checkmark and message
              formStatus.innerHTML = `
                <div class="success-checkmark show">
                  <div class="check-icon"></div>
                </div>
                <div class="status-success">Thank you! We've received your request and will contact you shortly.</div>
              `;
              
              // Apply animation to checkmark
              const checkIcon = document.querySelector('.check-icon');
              checkIcon.style.animation = 'checkmark 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards';
              
              // Reset form
              contactForm.reset();
              
              // Re-enable submit button
              submitButton.disabled = false;
              submitButton.innerHTML = '<span>Request a Quote</span><i class="fas fa-arrow-right"></i>';
              
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
            }, 1500);
            
            // In a real application, you would use fetch or XMLHttpRequest here:
            
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
            
          }
        });

        
        // Live validation as user types
        const inputs = [nameInput, emailInput, phoneInput, messageInput];
        inputs.forEach(input => {
          input.addEventListener('blur', function() {
            validateForm();
          });
        });
        
        // Validate service when changed
        serviceInput.addEventListener('change', function() {
          validateForm();
        });
      })
    
    // Contact section animation
    gsap.from('.contact-section ', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
    
    // Modified to ensure the form remains visible
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
    
    // Using a safer selector and reducing animation intensity
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

    
    // Footer animation
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

);
// Testimonial Carousel Implementation
// Initialize GSAP and ScrollTrigger 
// gsap.registerPlugin(ScrollTrigger);

            // Mobile menu toggle
           // Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    // Toggle the visibility of the mobile menu
    mobileMenu.classList.toggle('translate-x-0');
    mobileMenu.classList.toggle('translate-x-full');

    // Toggle burger animation
    const bars = menuToggle.children;
    bars[0].classList.toggle('rotate-45');
    bars[0].classList.toggle('translate-y-2');
    bars[1].classList.toggle('opacity-0');
    bars[2].classList.toggle('-rotate-45');
    bars[2].classList.toggle('-translate-y-2');
});
            
// Create bubbles animation
                 function createBubbles() {
                     const bubblesContainer = document.querySelector('.bubbles');
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
            
            // Initialize bubbles on load
            window.addEventListener('load', createBubbles);
            
            // Navbar color change on scroll
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('nav');
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-white', 'shadow-xl');
                    navbar.classList.remove('bg-gradient-nav');
                } else {
                    navbar.classList.add('bg-gradient-nav');
                    navbar.classList.remove('bg-white', 'shadow-xl');
                }
            });
        }



