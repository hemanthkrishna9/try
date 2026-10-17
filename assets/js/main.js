(function () {
  document.documentElement.classList.add('js');

  // Show the styled placeholder until a real photo exists at the img path
  document.querySelectorAll('.media img').forEach(function (img) {
    function missing() { img.parentElement.classList.add('is-missing'); }
    if (img.complete && img.naturalWidth === 0) missing();
    img.addEventListener('error', missing);
  });

  // Mobile menu
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('nav-open'));
  });
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Header shadow on scroll; mobile booking bar appears once past the hero
  var hero = document.querySelector('.hero');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
    document.body.classList.toggle('show-cta', window.scrollY > hero.offsetHeight * 0.8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll + active nav link
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    var links = {};
    document.querySelectorAll('.nav ul a').forEach(function (a) { links[a.getAttribute('href')] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = links['#' + entry.target.id];
        if (!link) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
        link.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'offerings', 'schedule', 'workshops', 'faq', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Only one FAQ open at a time
  var faqs = document.querySelectorAll('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
