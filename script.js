// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Initialize header scroll effect
    initHeaderScrollEffect();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Toggle icon between menu and x
            const icon = mobileMenuBtn.querySelector('[data-lucide]');
            if (mobileNav.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            
            // Recreate icons after changing
            lucide.createIcons();
        });
        
        // Close mobile menu when clicking on links
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('[data-lucide]');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('[data-lucide]');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = 'Sending...';
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
                
                // Recreate icons
                lucide.createIcons();
            }, 2000);
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .post-item, .reel-item, .account-card, .contact-detail');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            background: #1e293b;
            color: #f8fafc;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            border: 1px solid #334155;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            border-left: 4px solid #10b981;
        }
        
        .notification-error {
            border-left: 4px solid #ef4444;
        }
        
        .notification-content {
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            background-color: #334155;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = notificationStyles;
        document.head.appendChild(styleElement);
    }
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Recreate icons for the close button
    lucide.createIcons();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Button Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('[data-lucide="arrow-right"], [data-lucide="external-link"], [data-lucide="send"]');
            if (icon) {
                icon.style.transform = 'translateX(4px)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('[data-lucide="arrow-right"], [data-lucide="external-link"], [data-lucide="send"]');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
});

// Portfolio Item Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Opening ${title} project details...`, 'info');
        });
    });
});

// Post Item Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    const postItems = document.querySelectorAll('.post-item');
    
    postItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Viewing ${title} post details...`, 'info');
        });
    });
});

// Reel Item Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    const reelItems = document.querySelectorAll('.reel-item');
    
    reelItems.forEach(item => {
        const video = item.querySelector('video');
        const title = item.querySelector('h3').textContent;
        
        if (video) {
            // Add click handler to play/pause video
            video.addEventListener('click', function() {
                if (this.paused) {
                    this.play();
                    showNotification(`▶️ Playing ${title}`, 'success');
                } else {
                    this.pause();
                    showNotification(`⏸️ Paused ${title}`, 'info');
                }
            });
            
            // Add event listeners for video events
            video.addEventListener('loadstart', function() {
                console.log(`Loading ${title} video...`);
            });
            
            video.addEventListener('canplay', function() {
                console.log(`${title} video ready to play`);
            });
            
            video.addEventListener('error', function() {
                console.log(`Error loading ${title} video`);
                showNotification(`Could not load ${title} video`, 'error');
            });
        }
    });
});

// Account Profile Link Handlers
document.addEventListener('DOMContentLoaded', function() {
    const accountButtons = document.querySelectorAll('.account-card .btn');
    
    accountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const accountName = this.closest('.account-card').querySelector('h3').textContent;
            showNotification(`Opening ${accountName} Instagram profile...`, 'info');
            
            // Simulate opening external link
            setTimeout(() => {
                // In a real implementation, you would open the actual Instagram profile
                console.log(`Opening Instagram profile for ${accountName}`);
            }, 1000);
        });
    });
});

// Service Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3').textContent;
            if (serviceTitle.includes('Post')) {
                // Scroll to posts section
                document.querySelector('#posts').scrollIntoView({ behavior: 'smooth' });
            } else if (serviceTitle.includes('Reel')) {
                // Scroll to reels section
                document.querySelector('#reels').scrollIntoView({ behavior: 'smooth' });
            } else {
                showNotification(`Learn more about our ${serviceTitle} service!`, 'info');
            }
        });
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('[data-lucide]');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Form Validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = field.type === 'email' ? isValidEmail(value) : value.length > 0;
    
    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = '#10b981';
    } else {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', initFormValidation);

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(function() {
    // Any scroll-based functionality can be added here
}, 10));

// Console welcome message
console.log(`
🎨 Webivi Agency Portfolio
Built with HTML, CSS, and JavaScript
For social media management and content creation services
`);
