/* Ileana Prince — portfolio behaviour
   Everything here is progressive enhancement: the site is fully usable without it. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- year --- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------ sticky header --- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------------------------------- colour theme --- */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    var root = document.documentElement;
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    var currentIsDark = function () {
      var set = root.getAttribute('data-theme');
      return set ? set === 'dark' : systemDark.matches;
    };
    var syncLabel = function () {
      var dark = currentIsDark();
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to the light theme' : 'Switch to the dark theme');
    };
    syncLabel();
    systemDark.addEventListener('change', syncLabel);
    toggle.addEventListener('click', function () {
      var next = currentIsDark() ? 'light' : 'dark';
      root.classList.add('theme-changing');
      root.setAttribute('data-theme', next);
      // Force a style flush, then re-enable transitions on the next frame.
      void root.offsetWidth;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { root.classList.remove('theme-changing'); });
      });
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      syncLabel();
    });
  }

  /* ------------------------------------------------ reveal on scroll --- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ------------------------------------------- case study TOC state --- */
  var tocLinks = document.querySelectorAll('.case-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var sections = [];
    tocLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) sections.push({ link: link, target: target });
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (l) { l.classList.remove('is-active'); });
        var match = sections.find(function (s) { return s.target === entry.target; });
        if (match) match.link.classList.add('is-active');
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    sections.forEach(function (s) { spy.observe(s.target); });
  }

  /* ------------------------------------------------------- lightbox --- */
  var shots = document.querySelectorAll('button.shot');
  if (!shots.length) return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Enlarged image');
  dialog.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>' +
    '<figure style="margin:0;display:grid;justify-items:center">' +
    '<img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(dialog);

  var bigImg = dialog.querySelector('img');
  var bigCap = dialog.querySelector('figcaption');
  var closeBtn = dialog.querySelector('.lightbox-close');
  var lastFocus = null;

  function open(shot) {
    var img = shot.querySelector('img');
    if (!img) return;
    lastFocus = shot;
    // The grid holds a downscaled copy; the viewer loads the full-size original.
    bigImg.src = img.dataset.full || img.currentSrc || img.src;
    bigImg.alt = img.alt || '';
    var caption = shot.closest('figure') && shot.closest('figure').querySelector('figcaption');
    bigCap.textContent = caption ? caption.textContent : (img.alt || '');
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    closeBtn.focus();
  }

  function close() {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else { dialog.removeAttribute('open'); restore(); }
  }

  // Esc closes a <dialog> natively without going through close(), so the
  // cleanup and focus restore live on the close event where both paths meet.
  function restore() {
    bigImg.removeAttribute('src');
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  }

  shots.forEach(function (shot) {
    var thumb = shot.querySelector('img');
    if (thumb && !shot.getAttribute('aria-label')) {
      shot.setAttribute('aria-label', 'Enlarge image: ' + (thumb.alt || 'project visual'));
    }
    shot.addEventListener('click', function () { open(shot); });
  });

  closeBtn.addEventListener('click', close);
  dialog.addEventListener('click', function (event) {
    // Click on the backdrop area (the dialog element itself) closes it.
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', restore);
})();
