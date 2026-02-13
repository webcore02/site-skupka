document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== БУРГЕР МЕНЮ =====
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            burger.classList.toggle('active');
            burger.classList.toggle('open');
        });
    }

    // ===== МОБИЛЬНЫЙ ДРОПДАУН =====
    const mobileDropdownTitle = document.querySelector('.mobile-dropdown-title');
    if (mobileDropdownTitle) {
        mobileDropdownTitle.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = this.parentElement.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0)';
            }
        });
    }

    // ===== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ =====
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start', 
                    inline: 'nearest' 
                });
                
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    burger?.classList.remove('active');
                    burger?.classList.remove('open');
                }
            }
        });
    });

    // ===== HEADER СКРЫТИЕ ПРИ СКРОЛЛЕ =====
    let lastScroll = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header?.classList.remove('hidden');
        } else if (currentScroll > lastScroll && !header?.classList.contains('hidden')) {
            header?.classList.add('hidden');
        } else if (currentScroll < lastScroll && header?.classList.contains('hidden')) {
            header?.classList.remove('hidden');
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });

    // ===== АНИМАЦИИ ПРИ ПОЯВЛЕНИИ =====
    
    function initAnimations() {
        const heroElements = [
            '.hero h1',
            '.hero-tags',
            '.hero-sub',
            '.hero-buttons',
            '.hero-keywords',
            '.hero-image',
            '.brands-label',
            '.brands-image'
        ];
        
        heroElements.forEach((selector, index) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('animate-onload');
                el.style.animationDelay = `${index * 0.1}s`;
            });
        });

        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.classList.add('animate-onload');
            card.style.animationDelay = `${0.3 + index * 0.1}s`;
        });

        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.add('animate-onload');
            step.style.animationDelay = `${0.4 + index * 0.1}s`;
        });


        const cityCards = document.querySelectorAll('.city-region-card');
        cityCards.forEach((card, index) => {
            card.classList.add('animate-onload');
            card.style.animationDelay = `${0.2 + (index % 3) * 0.1}s`;
        });
    }

    // ===== INTERSECTION OBSERVER ДЛЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
        once: true
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                
                if (entry.target.classList.contains('cities-showcase')) {
                    entry.target.querySelectorAll('.city-tag').forEach((tag, index) => {
                        setTimeout(() => {
                            tag.classList.add('animate-visible');
                        }, index * 30);
                    });
                }
                
                if (entry.target.classList.contains('acceptance-card')) {
                    entry.target.querySelectorAll('li').forEach((li, index) => {
                        setTimeout(() => {
                            li.classList.add('animate-visible');
                        }, 100 + index * 50);
                    });
                }
                
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);


    const observeElements = [
        '.section-title',
        '.feature-card',
        '.step',
        '.acceptance-card',
        '.cities-showcase',
        '.city-region-card',
        '.seo-container',
        '.cta-container'
    ];

    observeElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            appearOnScroll.observe(el);
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        const brandsImage = document.querySelector('.brands-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
        
        if (brandsImage) {
            brandsImage.style.transform = `translateY(${scrolled * 0.02}px)`;
        }
    }, { passive: true });

    function animateNumbers() {
        const stepNumbers = document.querySelectorAll('.step-number');
        
        stepNumbers.forEach((number, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            entry.target.style.transform = 'scale(1)';
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(number);
        });
    }

    initAnimations();
    animateNumbers();

    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
                mobileMenu.classList.remove('active');
                burger?.classList.remove('active');
                burger?.classList.remove('open');
            }
        }
    });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    
});

