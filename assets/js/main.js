/* ==========================================================================
   شبكة قدس الإخبارية — main.js  (Vanilla JS)
   Swiper sliders · AOS · counters · search overlay · mobile nav · newsletter
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1) SWIPER SLIDERS — per-section responsive configs
     ------------------------------------------------------------------ */
  var SWIPER_CONFIGS = {
    news: {
      spaceBetween: 24,
      breakpoints: {
        0:    { slidesPerView: 1.15 },
        480:  { slidesPerView: 1.5 },
        640:  { slidesPerView: 2 },
        768:  { slidesPerView: 2.4 },
        992:  { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    },
    follow: {
      spaceBetween: 20,
      breakpoints: {
        0:   { slidesPerView: 1.05 },
        600: { slidesPerView: 1.6 },
        992: { slidesPerView: 2 }
      }
    },
    reports: {
      spaceBetween: 26,
      breakpoints: {
        0:    { slidesPerView: 1.1 },
        560:  { slidesPerView: 1.7 },
        768:  { slidesPerView: 2.2 },
        1024: { slidesPerView: 3 }
      }
    },
    infographics: {
      spaceBetween: 24,
      breakpoints: {
        0:    { slidesPerView: 1.1 },
        560:  { slidesPerView: 1.7 },
        900:  { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    },
    blogs: {
      spaceBetween: 22,
      loop: true,
      autoplay: { delay: 4800, disableOnInteraction: false, pauseOnMouseEnter: true },
      breakpoints: {
        0:    { slidesPerView: 1.3 },
        480:  { slidesPerView: 2 },
        768:  { slidesPerView: 3 },
        1100: { slidesPerView: 4 }
      }
    },
    podcasts: {
      spaceBetween: 24,
      breakpoints: {
        0:    { slidesPerView: 1.6 },
        480:  { slidesPerView: 2.3 },
        768:  { slidesPerView: 3 },
        1100: { slidesPerView: 4 }
      }
    }
  };

  function initSwipers() {
    if (typeof window.Swiper === 'undefined') return;

    document.querySelectorAll('.quds-swiper').forEach(function (el) {
      var key = el.getAttribute('data-swiper');
      var cfg = SWIPER_CONFIGS[key] || {};

      // Ensure correct RTL behaviour regardless of inheritance.
      el.dir = 'rtl';

      var options = {
        slidesPerView: 1.2,
        spaceBetween: cfg.spaceBetween || 24,
        grabCursor: true,
        watchOverflow: true,           // disable nav/pagination when not needed
        keyboard: { enabled: true },
        a11y: {
          prevSlideMessage: 'الشريحة السابقة',
          nextSlideMessage: 'الشريحة التالية',
          paginationBulletMessage: 'انتقل إلى الشريحة {{index}}'
        },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true
        },
        navigation: {
          prevEl: el.querySelector('.swiper-button-prev'),
          nextEl: el.querySelector('.swiper-button-next')
        },
        breakpoints: cfg.breakpoints || {}
      };

      if (cfg.loop) options.loop = true;
      if (cfg.autoplay && !reduceMotion) options.autoplay = cfg.autoplay;

      new window.Swiper(el, options);
    });
  }

  /* ------------------------------------------------------------------
     2) AOS — scroll reveal
     ------------------------------------------------------------------ */
  function initAOS() {
    if (typeof window.AOS === 'undefined') return;
    window.AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: reduceMotion
    });
  }

  /* ------------------------------------------------------------------
     3) STATS COUNTERS — animate when section enters viewport
     ------------------------------------------------------------------ */
  function initCounters() {
    var section = document.getElementById('qstats');
    if (!section) return;
    var counters = section.querySelectorAll('.counter');
    if (!counters.length) return;

    function run() {
      counters.forEach(function (node) {
        var target = parseInt(node.getAttribute('data-target'), 10) || 0;
        if (reduceMotion) { node.textContent = target; return; }
        var steps = 40, i = 0;
        var timer = setInterval(function () {
          i++;
          var p = Math.min(1, i / steps);
          var eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
          node.textContent = Math.round(target * eased);
          if (p >= 1) clearInterval(timer);
        }, 32);
      });
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { run(); obs.disconnect(); }
        });
      }, { threshold: 0.4 });
      obs.observe(section);
    } else {
      run();
    }
  }

  /* ------------------------------------------------------------------
     4) SEARCH OVERLAY
     ------------------------------------------------------------------ */
  function initSearch() {
    var overlay = document.getElementById('searchOverlay');
    var openBtn = document.getElementById('searchOpen');
    var closeBtn = document.getElementById('searchClose');
    var input = document.getElementById('searchInput');
    if (!overlay || !openBtn) return;

    function open() {
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      if (input) setTimeout(function () { input.focus(); }, 50);
    }
    function close() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();          // click on backdrop only
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) close();
    });
  }

  /* ------------------------------------------------------------------
     5) MOBILE NAV TOGGLE
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('catNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
      var icon = toggle.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
  }

  /* ------------------------------------------------------------------
     6) NEWSLETTER FORM
     ------------------------------------------------------------------ */
  function initNewsletter() {
    var form = document.getElementById('newsForm');
    var success = document.getElementById('newsSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('newsEmail');
      if (input && !input.checkValidity()) { input.reportValidity(); return; }
      form.hidden = true;
      success.hidden = false;
    });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  function boot() {
    initSwipers();
    initAOS();
    initCounters();
    initSearch();
    initNav();
    initNewsletter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
