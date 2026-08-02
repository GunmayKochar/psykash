/* ============================================================
   PSYKASH — main.js
   Navbar scroll · Mobile drawer · Active-link tracking ·
   Scroll-fade observer
   ============================================================ */

(() => {
  'use strict';

  /* ── SPLASH SCREEN LOGIC ── */
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    let shouldPlay = true;
    
    // Check navigation type
    const navEntries = performance.getEntriesByType('navigation');
    const navType = navEntries.length > 0 ? navEntries[0].type : '';
    
    // Check if this was an internal navigation
    const isInternalNav = sessionStorage.getItem('psykash_internal_nav') === 'true';
    sessionStorage.removeItem('psykash_internal_nav'); // clear for future refreshes

    if (navType === 'reload') {
      shouldPlay = true; // Always play on explicit refresh
    } else if (isInternalNav || navType === 'back_forward') {
      shouldPlay = false; // Skip on internal link clicks or back button
    }

    if (shouldPlay) {
      document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      setTimeout(() => {
        splashScreen.classList.add('splash-fade-out');
        document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        setTimeout(() => {
          splashScreen.remove();
          document.dispatchEvent(new CustomEvent('psykash-splash-complete'));
        }, 1700);
      }, 2350);
    } else {
      // Remove immediately without playing
      splashScreen.remove();
      setTimeout(() => document.dispatchEvent(new CustomEvent('psykash-splash-complete')), 50);
      
      // Page Transition Fade-In (Desktop)
      if (window.innerWidth > 768 && navType !== 'back_forward') { window.scrollTo(0, 0);
        document.documentElement.classList.add('is-animating');
        const inCls = 'page-fade-in-up';
        const mainEl = document.querySelector('main');
        if(mainEl) mainEl.classList.add(inCls); else document.body.classList.add(inCls);
        setTimeout(() => {
          document.documentElement.classList.remove('is-animating');
          const mainEl = document.querySelector('main');
          if(mainEl) mainEl.classList.remove(inCls); else document.body.classList.remove(inCls);
        }, 200);
      }
    }
  } else {
    // If no splash screen exists on this page
    setTimeout(() => document.dispatchEvent(new CustomEvent('psykash-splash-complete')), 50);
    
    // Page Transition Fade-In (Desktop)
    const isInternalNavFallback = sessionStorage.getItem('psykash_internal_nav') === 'true';
    if (window.innerWidth > 768 && isInternalNavFallback) { window.scrollTo(0, 0);
      document.documentElement.classList.add('is-animating');
      const inCls = 'page-fade-in-up';
      const mainEl = document.querySelector('main');
      if(mainEl) mainEl.classList.add(inCls); else document.body.classList.add(inCls);
      setTimeout(() => {
        document.documentElement.classList.remove('is-animating');
        const mainEl = document.querySelector('main');
        if(mainEl) mainEl.classList.remove(inCls); else document.body.classList.remove(inCls);
      }, 200);
    }
  }

  // Global click listener to track internal navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href) {
      try {
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin) {
          // Only flag if navigating to a different page within the site
          if (url.pathname !== window.location.pathname) {
             sessionStorage.setItem('psykash_internal_nav', 'true');
             
             // Page Transition Fade-Out (Desktop)
             if (window.innerWidth > 768 && (!link.target || link.target !== '_blank')) {
               // Ensure it's not a hash link on the same page
               if (!link.hash || link.pathname !== window.location.pathname) {
                 e.preventDefault();
                 document.documentElement.classList.add('is-animating');
                 
                 const outCls = 'page-fade-out';
                 const mainEl = document.querySelector('main');
                 if(mainEl) mainEl.classList.add(outCls); else document.body.classList.add(outCls);
                 
                 setTimeout(() => {
                   window.location.href = link.href;
                 }, 200);
               }
             }
          }
        }
      } catch (err) {}
    }
  });

  /* ── DOM refs ── */
  const navbar       = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileScrim  = document.getElementById('mobileScrim');
  const navLinks     = document.querySelectorAll('.navbar__link');
  const mobileLinks  = document.querySelectorAll('.mobile-nav__link');

  /* ─── 1. Navbar: transparent → frosted glass ─── */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ─── 2. Mobile drawer toggle ─── */
  const openMenu = () => {
    mobileNav.classList.add('open');
    mobileScrim.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    mobileScrim.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileScrim.addEventListener('click', closeMenu);

    document.addEventListener('click', (e) => {
      if (e.target.closest('#mobileCloseBtn')) {
        closeMenu();
      }
    });

    

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });


  /* ─── 3. Active nav link tracking ─── */
  const allLinks = [...navLinks, ...mobileLinks];

  const setActive = (id) => {
    allLinks.forEach(link => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isMatch);
    });
  };

  const sections = document.querySelectorAll('section[id]');

  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(sec => sectionObserver.observe(sec));
  }


  /* ─── 4. Fade-in on scroll ─── */
  const fadeEls = document.querySelectorAll('.fade-in, .slide-in-right');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* "?"?"? 5. Get Started Modal "?"?"? */
  const btnGetStartedModal = document.getElementById('btnGetStartedModal');
  const getStartedModal = document.getElementById('getStartedModal');
  const btnModalClose = document.getElementById('btnModalClose');
  const btnModalContact = document.getElementById('btnModalContact');

  if (btnGetStartedModal && getStartedModal) {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    const openModal = () => {
      getStartedModal.classList.add('open');
      getStartedModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      if (window.lucide) {
        window.lucide.createIcons();
      }
      
      setTimeout(() => {
        const focusableContent = getStartedModal.querySelectorAll(focusableElements);
        if (focusableContent.length > 0) {
          focusableContent[0].focus();
        }
      }, 100);
    };

    const closeModal = () => {
      getStartedModal.classList.remove('open');
      getStartedModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      btnGetStartedModal.focus();
    };

    btnGetStartedModal.addEventListener('click', openModal);
    btnModalClose.addEventListener('click', closeModal);
      
      const btnMobileGoBack = document.getElementById('btnMobileGoBack');
      if (btnMobileGoBack) {
        btnMobileGoBack.addEventListener('click', closeModal);
      }
    
    getStartedModal.addEventListener('click', (e) => {
      if (e.target === getStartedModal) {
        closeModal();
      }
    });

    getStartedModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
      
      let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (!isTabPressed) return;
      
      const focusableContent = getStartedModal.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement = focusableContent[focusableContent.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
    
    if (btnModalContact) {
      btnModalContact.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  /* ─── 6. Stat Counter Animation ─── */
  const statNumbers = document.querySelectorAll('.stat-card__number, .stat-number');
  
  if (statNumbers.length) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // easeOutCubic curve for smooth deceleration
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const duration = 2000;

      const animateNumber = (element) => {
        const originalText = element.getAttribute('data-original-text');
        const targetMatch = originalText.match(/(\d+)(.*)/);
        if (!targetMatch) return;

        const targetNumber = parseInt(targetMatch[1], 10);
        const suffix = targetMatch[2];
        let startTimestamp = null;
        let lastRenderedNumber = -1;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = easeOutCubic(progress);
          
          const currentNumber = Math.floor(easeProgress * targetNumber);
          
          if (currentNumber !== lastRenderedNumber) {
            element.innerText = currentNumber + suffix;
            lastRenderedNumber = currentNumber;
          }
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            element.innerText = originalText; // Ensure exact final text
          }
        };
        
        window.requestAnimationFrame(step);
      };

      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const initCounters = () => {
        statNumbers.forEach(el => {
          const targetText = el.getAttribute('data-target') || el.innerText;
          
          if (!el.hasAttribute('data-original-text')) {
            el.setAttribute('data-original-text', targetText);
          }
          
          el.innerText = '0+';
          statsObserver.observe(el);
        });
      };

      // Wait for splash screen to finish before observing, otherwise it animates behind the splash screen
      if (document.getElementById('splash-screen')) {
        document.addEventListener('psykash-splash-complete', initCounters, { once: true });
      } else {
        initCounters();
      }
    }
  }

})();