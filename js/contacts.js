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
        
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    } 

    // ===== МОБИЛЬНЫЙ ДРОПДАУН =====
    const mobileDropdownTitle = document.querySelector('.mobile-dropdown-title');
    if (mobileDropdownTitle) {
        mobileDropdownTitle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = this.parentElement.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0)';
            }
        });
    }

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                burger?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
                mobileMenu.classList.remove('active');
                burger?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

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
                
                // Закрыть мобильное меню после клика
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    burger?.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});