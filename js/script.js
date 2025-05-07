// Document ready function
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    
                    // Update URL without page jump
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            });
        });

        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.feature-card, .testimonial, .pricing-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Run once on load
        animateOnScroll();
        
        // Then run on scroll
        window.addEventListener('scroll', animateOnScroll);

        // FAQ accordion functionality
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const button = item.querySelector('button');
            const content = item.querySelector('div');
            
            // Close all except first on load
            if (item !== faqItems[0]) {
                content.style.display = 'none';
            } else {
                button.querySelector('i').classList.remove('fa-chevron-down');
                button.querySelector('i').classList.add('fa-chevron-up');
            }
            
            button.addEventListener('click', () => {
                const isOpen = content.style.display === 'block';
                
                // Close all other items
                faqItems.forEach(faq => {
                    if (faq !== item) {
                        faq.querySelector('div').style.display = 'none';
                        faq.querySelector('i').classList.remove('fa-chevron-up');
                        faq.querySelector('i').classList.add('fa-chevron-down');
                    }
                });
                
                // Toggle current item
                content.style.display = isOpen ? 'none' : 'block';
                const icon = button.querySelector('i');
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('fa-chevron-down');
            });
        });

        // Pricing card hover effects
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('popular')) {
                    card.style.transform = 'translateY(-10px)';
                    card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('popular')) {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }
            });
        });

        // Savings calculator functionality
        const calculatorForm = document.getElementById('savings-calculator');
        if (calculatorForm) {
            const currentBillInput = document.getElementById('current-bill');
            const homeSizeInput = document.getElementById('home-size');
            const locationInput = document.getElementById('location');
            
            const calculateSavings = () => {
                const currentBill = parseFloat(currentBillInput.value) || 0;
                const homeSize = parseFloat(homeSizeInput.value) || 0;
                const location = locationInput.value;
                
                // Calculate projected savings (simplified example)
                let savingsPercentage = 20; // Base savings
                
                // Adjust based on home size
                if (homeSize > 2000) savingsPercentage += 5;
                if (homeSize > 3000) savingsPercentage += 5;
                
                // Adjust based on location
                if (location === 'northeast') savingsPercentage += 3;
                if (location === 'south') savingsPercentage += 5;
                
                const monthlySavings = (currentBill * savingsPercentage / 100).toFixed(2);
                const annualSavings = (monthlySavings * 12).toFixed(2);
                
                document.getElementById('savings-percentage').textContent = `${savingsPercentage}%`;
                document.getElementById('monthly-savings').textContent = `$${monthlySavings}`;
                document.getElementById('annual-savings').textContent = `$${annualSavings}`;
            };
            
            // Add event listeners
            currentBillInput.addEventListener('input', calculateSavings);
            homeSizeInput.addEventListener('input', calculateSavings);
            locationInput.addEventListener('change', calculateSavings);
            
            // Initial calculation
            calculateSavings();
        }

        // Dynamic counter for happy customers
        const counterElement = document.querySelector('.happy-customers-count');
        if (counterElement) {
            let count = 0;
            const target = 5000;
            const duration = 2000; // ms
            const increment = target / (duration / 16); // Roughly 60fps
            
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counterElement.textContent = Math.floor(count).toLocaleString() + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.textContent = target.toLocaleString() + '+';
                }
            };
            
            // Start counter when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counterElement);
                }
            });
            
            observer.observe(counterElement);
        }

        // Form submission handling (example)
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                if (submitButton) {
                    const originalText = submitButton.innerHTML;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
                    submitButton.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Show success message
                        const successDiv = document.createElement('div');
                        successDiv.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg';
                        successDiv.innerHTML = 'Thank you! We\'ll be in touch shortly.';
                        this.appendChild(successDiv);
                        
                        // Reset form
                        this.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        
                        // Remove message after 5 seconds
                        setTimeout(() => {
                            successDiv.remove();
                        }, 5000);
                    }, 1500);
                }
            });
        });
    });