/* ==========================================================================
   شبكة قدس — components.js
   Shared site chrome (top bar · header · footer · search overlay) injected
   into every internal page so the whole site stays one consistent product.
   Runs as a deferred script BEFORE main.js, so main.js wires the injected DOM.
   ========================================================================== */
(function () {
  'use strict';

  /* Category nav — internal links (single source of truth) */
  var CATS = [
    { name: 'أخبار',        href: 'category.html?cat=أخبار',   key: 'akhbar' },
    { name: 'متابعات',      href: 'category.html?cat=متابعات', key: 'motabaat' },
    { name: 'تقارير',       href: 'category.html?cat=تقارير',  key: 'taqareer' },
    { name: 'مدوّنات',      href: 'category.html?cat=مدوّنات', key: 'modawanat' },
    { name: 'ترجمات',       href: 'category.html?cat=ترجمات',  key: 'tarjamat' },
    { name: 'بودكاست قدس',  href: 'podcasts.html',             key: 'podcasts' }
  ];

  var active = document.body.getAttribute('data-page') || '';

  function navLinks(cls) {
    return CATS.map(function (c) {
      var cur = (c.key === active) ? ' aria-current="page"' : '';
      return '<a href="' + c.href + '" class="' + cls + '"' + cur + '>' + c.name + '</a>';
    }).join('');
  }

  /* ---------- TOP BAR + HEADER ---------- */
  var headerHTML =
  '<div class="topbar"><div class="container topbar__inner">' +
    '<div class="topbar__meta">' +
      '<span><i class="fa-regular fa-calendar" aria-hidden="true"></i> الإثنين، 15 حزيران 2026</span>' +
      '<span class="topbar__divider" aria-hidden="true">|</span>' +
      '<span class="topbar__rates"><span><span class="hl">الدولار</span> 3.62 ₪</span>' +
      '<span class="dot" aria-hidden="true">·</span><span><span class="hl">الدينار</span> 5.10 ₪</span></span>' +
    '</div>' +
    '<div class="topbar__social">' +
      '<a href="https://www.facebook.com/QudsNet" aria-label="فيسبوك" class="social-link"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>' +
      '<a href="https://twitter.com/QudsN" aria-label="إكس" class="social-link"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>' +
      '<a href="https://www.instagram.com/qudsn" aria-label="إنستغرام" class="social-link"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>' +
      '<a href="https://www.youtube.com/user/QudsNetwork" aria-label="يوتيوب" class="social-link"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>' +
      '<a href="https://t.me/QudsN" aria-label="تيليغرام" class="social-link"><i class="fa-brands fa-telegram" aria-hidden="true"></i></a>' +
      '<span class="topbar__sep" aria-hidden="true"></span>' +
      '<a href="http://qudsnen.co" class="topbar__lang">English</a>' +
    '</div>' +
  '</div></div>' +

  '<header class="site-header"><div class="container header__inner">' +
    '<a href="index.html" class="brand" aria-label="شبكة قدس الإخبارية — الصفحة الرئيسية">' +
      '<img src="assets/img/logo.png" alt="شعار شبكة قدس الإخبارية" class="brand__logo" width="90" height="38">' +
      '<span class="brand__sep" aria-hidden="true"></span><span class="brand__tag">الإخبارية</span></a>' +
    '<div class="header__actions">' +
      '<button type="button" class="icon-btn" id="searchOpen" aria-label="فتح البحث" aria-haspopup="dialog"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>' +
      '<a href="https://t.me/QudsN" class="btn btn--primary"><i class="fa-regular fa-paper-plane" aria-hidden="true"></i><span>اشترك في القناة</span></a>' +
      '<button type="button" class="icon-btn nav-toggle" id="navToggle" aria-label="فتح القائمة" aria-expanded="false" aria-controls="catNav"><i class="fa-solid fa-bars" aria-hidden="true"></i></button>' +
    '</div></div>' +
    '<nav class="cat-nav" id="catNav" aria-label="أقسام الموقع"><div class="container cat-nav__inner">' +
      navLinks('cat-link') +
    '</div></nav>' +
  '</header>';

  /* ---------- FOOTER ---------- */
  var footerHTML =
  '<footer class="site-footer"><div class="container footer__grid">' +
    '<div class="footer__col">' +
      '<a href="index.html" class="footer__brand" aria-label="شبكة قدس الإخبارية">' +
        '<img src="assets/img/logo.png" alt="شعار شبكة قدس الإخبارية" loading="lazy" width="90" height="38">' +
        '<span class="brand__sep" aria-hidden="true"></span><span class="brand__tag">الإخبارية</span></a>' +
      '<p class="footer__about">شبكة قدس الإخبارية — عاجل وتحليلات الأخبار من القدس وفلسطين إلى العالم.</p>' +
      '<div class="footer__social">' +
        '<a href="https://www.facebook.com/QudsNet" aria-label="فيسبوك" class="footer__social-link"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>' +
        '<a href="https://twitter.com/QudsN" aria-label="إكس" class="footer__social-link"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>' +
        '<a href="https://www.instagram.com/qudsn" aria-label="إنستغرام" class="footer__social-link"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>' +
        '<a href="https://www.youtube.com/user/QudsNetwork" aria-label="يوتيوب" class="footer__social-link"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>' +
        '<a href="https://tiktok.com/@qudsn" aria-label="تيك توك" class="footer__social-link"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a>' +
        '<a href="https://whatsapp.com/channel/0029Va54z83IiRp163Clyw3P" aria-label="واتساب" class="footer__social-link"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>' +
        '<a href="https://t.me/QudsN" aria-label="تيليغرام" class="footer__social-link"><i class="fa-brands fa-telegram" aria-hidden="true"></i></a>' +
      '</div></div>' +
    '<nav class="footer__col" aria-label="الأقسام"><h3 class="footer__title">الأقسام</h3><ul class="footer__links">' +
      CATS.map(function (c) { return '<li><a href="' + c.href + '">' + c.name + '</a></li>'; }).join('') +
    '</ul></nav>' +
    '<nav class="footer__col" aria-label="روابط"><h3 class="footer__title">روابط</h3><ul class="footer__links">' +
      '<li><a href="about.html">من نحن</a></li>' +
      '<li><a href="contact.html">اتصل بنا</a></li>' +
      '<li><a href="articles.html">كل المقالات</a></li>' +
      '<li><a href="videos.html">قدس فيديو</a></li>' +
      '<li><a href="http://qudsnen.co">English</a></li>' +
    '</ul></nav>' +
    '<div class="footer__col"><h3 class="footer__title">تابعونا مباشرة</h3>' +
      '<a href="https://t.me/QudsN" class="footer-channel footer-channel--tg"><i class="fa-brands fa-telegram" aria-hidden="true"></i>' +
        '<span><span class="footer-channel__name">قناة تيليغرام</span><span class="footer-channel__sub">آخر الأخبار العاجلة</span></span></a>' +
      '<a href="https://whatsapp.com/channel/0029Va54z83IiRp163Clyw3P" class="footer-channel footer-channel--wa"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i>' +
        '<span><span class="footer-channel__name">قناة واتساب</span><span class="footer-channel__sub">انضم الآن</span></span></a>' +
    '</div>' +
  '</div>' +
  '<div class="container footer__bottom"><p>© 2026 شبكة قدس الإخبارية. جميع حقوق النشر محفوظة.</p><p>تصميم وتطوير بعناية لتجربة قراءة أفضل</p></div>' +
  '</footer>';

  /* ---------- SEARCH OVERLAY ---------- */
  var searchHTML =
  '<div class="search-overlay" id="searchOverlay" role="dialog" aria-modal="true" aria-label="البحث في شبكة قدس" hidden>' +
    '<div class="search-box" role="document">' +
      '<div class="search-box__head"><h3 class="search-box__title">ابحث في شبكة قدس</h3>' +
        '<button type="button" class="icon-btn" id="searchClose" aria-label="إغلاق البحث"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div>' +
      '<form class="search-box__field" role="search" action="search-results.html" method="get">' +
        '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>' +
        '<label class="sr-only" for="searchInput">كلمة البحث</label>' +
        '<input id="searchInput" name="q" type="search" placeholder="مثال: الأوضاع في غزة، اتفاق وقف إطلاق النار...">' +
      '</form>' +
      '<div class="search-box__trending"><span class="search-box__trending-label">الأكثر بحثًا</span>' +
        '<div class="search-box__tags">' +
          '<a href="search-results.html?q=غزة" class="tag">غزة</a>' +
          '<a href="search-results.html?q=وقف إطلاق النار" class="tag">وقف إطلاق النار</a>' +
          '<a href="search-results.html?q=الضفة الغربية" class="tag">الضفة الغربية</a>' +
          '<a href="search-results.html?q=ترجمات عبرية" class="tag">ترجمات عبرية</a>' +
          '<a href="search-results.html?q=بودكاست مسارنا" class="tag">بودكاست مسارنا</a>' +
        '</div></div>' +
    '</div></div>';

  function inject(id, html, where) {
    var mount = document.getElementById(id);
    if (mount) { mount.innerHTML = html; return; }
    // fallback: append/prepend to body if no explicit mount point
    var wrap = document.createElement(where === 'top' ? 'div' : 'div');
    wrap.innerHTML = html;
    if (where === 'top') document.body.insertBefore(wrap, document.body.firstChild);
    else document.body.appendChild(wrap);
  }

  inject('qd-header', headerHTML, 'top');
  inject('qd-footer', footerHTML, 'bottom');
  inject('qd-search', searchHTML, 'bottom');
})();
