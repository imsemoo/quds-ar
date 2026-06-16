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
     7) SHARE BUTTONS  (article / podcast pages)
     ------------------------------------------------------------------ */
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'qd-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-show'); });
    setTimeout(function () {
      t.classList.remove('is-show');
      setTimeout(function () { t.remove(); }, 300);
    }, 2200);
  }

  function initShare() {
    var btns = document.querySelectorAll('[data-share]');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = encodeURIComponent(btn.getAttribute('data-url') || location.href);
        var title = encodeURIComponent(btn.getAttribute('data-title') || document.title);
        var type = btn.getAttribute('data-share');
        var target = '';
        if (type === 'facebook') target = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
        else if (type === 'x') target = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
        else if (type === 'whatsapp') target = 'https://api.whatsapp.com/send?text=' + title + '%20' + url;
        else if (type === 'telegram') target = 'https://t.me/share/url?url=' + url + '&text=' + title;
        else if (type === 'copy') {
          var raw = btn.getAttribute('data-url') || location.href;
          if (navigator.clipboard) navigator.clipboard.writeText(raw).then(function () { toast('تم نسخ الرابط'); });
          else { var ta = document.createElement('textarea'); ta.value = raw; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('تم نسخ الرابط'); } catch (e2) {} ta.remove(); }
          return;
        }
        if (target) window.open(target, '_blank', 'noopener,width=640,height=560');
      });
    });
  }

  /* ------------------------------------------------------------------
     8) AUDIO PLAYER  (single podcast)
     ------------------------------------------------------------------ */
  function fmt(s) {
    if (!s || isNaN(s)) return '0:00';
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }
  function initAudioPlayer() {
    document.querySelectorAll('.audio-player').forEach(function (pl) {
      var audio = pl.querySelector('audio');
      var play = pl.querySelector('.audio-player__play');
      var track = pl.querySelector('.audio-player__track');
      var prog = pl.querySelector('.audio-player__progress');
      var cur = pl.querySelector('[data-cur]');
      var dur = pl.querySelector('[data-dur]');
      if (!audio || !play) return;
      var icon = play.querySelector('i');

      play.addEventListener('click', function () {
        if (audio.paused) audio.play(); else audio.pause();
      });
      audio.addEventListener('play', function () { if (icon) icon.className = 'fa-solid fa-pause'; });
      audio.addEventListener('pause', function () { if (icon) icon.className = 'fa-solid fa-play'; });
      audio.addEventListener('loadedmetadata', function () { if (dur) dur.textContent = fmt(audio.duration); });
      audio.addEventListener('timeupdate', function () {
        var p = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        if (prog) prog.style.width = p + '%';
        if (cur) cur.textContent = fmt(audio.currentTime);
      });
      if (track) track.addEventListener('click', function (e) {
        var r = track.getBoundingClientRect();
        // RTL-aware: distance from the right edge
        var ratio = (r.right - e.clientX) / r.width;
        if (audio.duration) audio.currentTime = Math.min(1, Math.max(0, ratio)) * audio.duration;
      });
      pl.querySelectorAll('.audio-player__btn[data-seek]').forEach(function (b) {
        b.addEventListener('click', function () { audio.currentTime += parseFloat(b.getAttribute('data-seek')); });
      });
      pl.querySelectorAll('.audio-player__btn[data-rate]').forEach(function (b) {
        b.addEventListener('click', function () {
          audio.playbackRate = parseFloat(b.getAttribute('data-rate'));
          pl.querySelectorAll('[data-rate]').forEach(function (x) { x.classList.remove('is-active'); });
          b.classList.add('is-active');
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     9) CONTACT FORM
     ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var success = document.getElementById('contactSuccess');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (success) { success.hidden = false; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      form.reset();
    });
  }

  /* ------------------------------------------------------------------
     10) ARCHIVE FILTERS  (client-side category filtering)
     ------------------------------------------------------------------ */
  function initFilters() {
    var chips = document.querySelectorAll('.filter-chip[data-filter]');
    if (!chips.length) return;
    var items = document.querySelectorAll('[data-cat-item]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var f = chip.getAttribute('data-filter');
        items.forEach(function (it) {
          var show = (f === 'all') || it.getAttribute('data-cat-item') === f;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     11) QUERY-PARAM TITLES  (category / tag / search pages)
     ------------------------------------------------------------------ */
  function initQueryTitles() {
    var params = new URLSearchParams(location.search);
    document.querySelectorAll('[data-from-query]').forEach(function (el) {
      var key = el.getAttribute('data-from-query');
      var val = params.get(key);
      if (val) {
        el.textContent = decodeURIComponent(val);
        if (el.hasAttribute('data-title-prefix')) document.title = decodeURIComponent(val) + ' — شبكة قدس الإخبارية';
      }
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
    initShare();
    initAudioPlayer();
    initContactForm();
    initFilters();
    initQueryTitles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
