(function () {
  document.documentElement.classList.add('js');

  // Testimonials: cards + outcome filters, built from assets/js/testimonials.js
  var grid = document.getElementById('kind-grid');
  var stories = window.TESTIMONIALS || [];
  if (grid && stories.length) {
    var make = function (tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text) n.textContent = text;
      return n;
    };

    stories.forEach(function (t, i) {
      var card = make('figure', 't-card');
      card.dataset.tags = '|' + (t.tags || []).join('|') + '|';

      var q = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      q.setAttribute('class', 't-quote');
      q.setAttribute('aria-hidden', 'true');
      var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#i-quote');
      q.appendChild(use);
      card.appendChild(q);

      var text = make('blockquote', 't-text');
      var at = t.mark ? t.quote.indexOf(t.mark) : -1;
      if (at >= 0) {
        text.appendChild(document.createTextNode(t.quote.slice(0, at)));
        text.appendChild(make('mark', null, t.mark));
        text.appendChild(document.createTextNode(t.quote.slice(at + t.mark.length)));
      } else {
        text.textContent = t.quote;
      }
      card.appendChild(text);

      var more = make('button', 't-more', 'Read more');
      more.type = 'button';
      more.hidden = true;
      more.addEventListener('click', function () {
        var open = card.classList.toggle('is-open');
        more.textContent = open ? 'Show less' : 'Read more';
        more.setAttribute('aria-expanded', String(open));
      });
      card.appendChild(more);

      if (t.results && t.results.length) {
        var ul = make('ul', 't-results');
        t.results.forEach(function (r) { ul.appendChild(make('li', null, r)); });
        card.appendChild(ul);
      }

      var cap = make('figcaption', 't-by');
      cap.appendChild(make('span', 't-avatar t-avatar-' + (i % 4), t.name.charAt(0)));
      var who = make('span', 't-who');
      who.appendChild(make('strong', null, t.name));
      if (t.meta) {
        var meta = make('span', null, t.meta);
        if (t.country) {
          var flag = make('img', 't-flag');
          flag.src = 'assets/images/flags/' + t.country + '.svg';
          flag.alt = '';
          flag.width = 16;
          flag.height = 12;
          meta.insertBefore(flag, meta.firstChild);
        }
        who.appendChild(meta);
      }
      cap.appendChild(who);
      card.appendChild(cap);

      grid.appendChild(card);
    });

    // show "Read more" only where the text is actually clamped
    function checkClamp() {
      grid.querySelectorAll('.t-card').forEach(function (card) {
        if (card.classList.contains('is-open')) return;
        var text = card.querySelector('.t-text');
        card.querySelector('.t-more').hidden = text.scrollHeight <= text.clientHeight + 2;
      });
    }
    checkClamp();
    window.addEventListener('resize', checkClamp);
    if (document.fonts) document.fonts.ready.then(checkClamp);

    var filters = document.getElementById('kind-filters');
    (window.TESTIMONIAL_TAGS || []).forEach(function (tag) {
      if (!stories.some(function (t) { return (t.tags || []).indexOf(tag) >= 0; })) return;
      var b = make('button', 'chip', tag);
      b.type = 'button';
      b.dataset.tag = tag;
      b.setAttribute('aria-pressed', 'false');
      filters.appendChild(b);
    });
    // Show the first few stories until "Show all" is pressed; a filter always shows every match
    var LIMIT = 9;
    var expanded = false;
    var activeTag = '';
    var showAll = document.getElementById('kind-all');
    var swipeRow = window.matchMedia('(max-width: 680px)');
    function applyView() {
      var limited = !activeTag && !expanded && !swipeRow.matches;
      grid.querySelectorAll('.t-card').forEach(function (card, i) {
        var match = !activeTag || card.dataset.tags.indexOf('|' + activeTag + '|') >= 0;
        card.hidden = !match || (limited && i >= LIMIT);
      });
      if (showAll) {
        showAll.hidden = !!activeTag || expanded || stories.length <= LIMIT;
      }
      checkClamp();
    }
    if (showAll) {
      showAll.addEventListener('click', function () {
        expanded = true;
        window.addEventListener('resize', applyView);
    applyView();
      });
    }
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) return;
      filters.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
      activeTag = b.dataset.tag;
      grid.scrollLeft = 0;
      applyView();
    });
    applyView();
  }

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
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  var navLinks = document.querySelectorAll('.nav ul a');
  function setActive(href) {
    navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === href); });
  }

  // Header shadow on scroll; mobile booking bar appears once past the hero
  var hero = document.querySelector('.hero');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
    document.body.classList.toggle('show-cta', window.scrollY > hero.offsetHeight * 0.8);
    if (window.scrollY < hero.offsetHeight * 0.5) setActive('#top');
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

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive('#' + entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'offerings', 'testimonials', 'schedule', 'workshops', 'faq', 'contact'].forEach(function (id) {
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
