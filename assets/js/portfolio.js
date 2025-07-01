// Custom Portfolio JavaScript for Jose Ramos

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#nav ul.links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const header = document.querySelector('#header');
                const nav = document.querySelector('#nav');
                let offset = 0;
                if (header) offset += header.offsetHeight;
                if (nav && getComputedStyle(nav).position === 'fixed') offset += nav.offsetHeight;

                const rect = targetElement.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = rect.top + scrollTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink(clickedLink = null) {
        const navLinks = document.querySelectorAll('#nav ul.links li');
        
        if (clickedLink) {
            navLinks.forEach(li => li.classList.remove('active'));
            clickedLink.parentElement.classList.add('active');
        } else {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(li => li.classList.remove('active'));
                    const activeLink = document.querySelector(`#nav ul.links a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.parentElement.classList.add('active');
                    }
                }
            });
        }
    }
    
    // Update active nav on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 50);
    });
    
    // Typing animation for intro
    const introTitle = document.querySelector('#intro h1');
    const introSubtitle = document.querySelector('#intro h2');
    
    if (introTitle && introSubtitle) {
        // Add typing animation class
        introTitle.style.opacity = '0';
        introSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            introTitle.style.opacity = '1';
            introTitle.style.animation = 'fadeInUp 1s ease forwards';
        }, 500);
        
        setTimeout(() => {
            introSubtitle.style.opacity = '1';
            introSubtitle.style.animation = 'fadeInUp 1s ease forwards';
        }, 1000);
    }
    
    // Animate skill items on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skills-grid, .experience-item, .activity-item, .posts article');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.posts article');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Contact form enhancement
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Add loading state
            const submitButton = this.querySelector('input[type="submit"]');
            const originalText = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;
            
            // Re-enable after a delay (for demo purposes)
            setTimeout(() => {
                submitButton.value = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
        
        // Form field animations
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
    
    // Add click tracking for project links (for analytics)
    const projectLinks = document.querySelectorAll('.posts article .button');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('article').querySelector('h2').textContent.trim();
            console.log(`Project clicked: ${projectName}`);
            // Here you could add Google Analytics tracking
        });
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
    
    // Add rainbow animation for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Performance: Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // if (img.src.includes('demo') || img.src.includes('preview')) {
        //     // These are placeholder images
        //     img.style.filter = 'blur(2px)';
        //     img.style.transition = 'filter 0.3s ease';
            
        //     img.addEventListener('load', () => {
        //         img.style.filter = 'none';
        //     });
        // }
        imageObserver.observe(img);
    });
    
    // Add copy email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Email copied!';
                    tooltip.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #18bfef;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        z-index: 10000;
                        animation: fadeInUp 0.3s ease;
                    `;
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                }).catch(() => {
                    // Fallback: open email client
                    window.location.href = this.href;
                });
            } else {
                // Fallback: open email client
                window.location.href = this.href;
            }
        });
    });
    
    console.log('Portfolio initialized successfully! 🚀');
    console.log('Tip: Try the Konami code for a surprise! ↑↑↓↓←→←→BA');
});

// Export for potential use by other scripts
window.PortfolioJS = {
    initialized: true,
    version: '1.0.0'
}; 