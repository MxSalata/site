// Knowledge map: search and level filter. Optional: without it every item is already on the page.
(function () {
  var map = document.getElementById('kb-map');
  var form = document.querySelector('.kb-tools');
  if (!map || !form) return;
  var input = form.querySelector('input');
  var buttons = form.querySelectorAll('.kb-seg button');
  var status = document.getElementById('kb-status');
  var empty = document.getElementById('kb-empty');
  var reset = document.getElementById('kb-reset');
  if (!input || !status) return;
  var items = Array.prototype.slice.call(map.querySelectorAll('[data-item]'));
  var zones = Array.prototype.slice.call(map.querySelectorAll('[data-group]'));
  var total = items.length;
  var noLevel = items.filter(function (el) { return !el.hasAttribute('data-level'); }).length;
  var level = 'all';
  // Everyday short forms that should still find an item.
  var alias = { epr: 'emr', ehr: 'emr', pas: 'patient administration' };

  function squash(t) { return t.replace(/[^a-z0-9]+/g, ''); }
  function plural(n) { return n === 1 ? ' item' : ' items'; }
  // The search index: the item's name, its note, its level (or "no level") and its group's title, joined with spaces.
  var hay = items.map(function (el) {
    var n = el.querySelector('.kb-itnote');
    var g = el.closest('[data-group]');
    return [el.getAttribute('data-item'), n ? n.textContent : '', el.getAttribute('data-level') || 'no level',
      g ? g.getAttribute('data-group') : '']
      .join(' ').toLowerCase().replace(/\s+/g, ' ');
  });
  var flat = hay.map(squash);

  function has(i, w) {
    if (hay[i].indexOf(w) !== -1) return true;
    var s = squash(w);
    if (s.length >= 4 && flat[i].indexOf(s) !== -1) return true; // "hl7v2" finds "HL7 v2"
    return !!alias[s] && hay[i].indexOf(alias[s]) !== -1;
  }

  // Each zone's tally: "7 items" becomes "3 of 7 items" while some of its items are hidden.
  zones.forEach(function (z) {
    z._count = z.querySelector('.kb-count');
    z._all = z.querySelectorAll('[data-item]').length;
  });

  // The status line is polite, so while someone types it waits for a pause instead of announcing every keystroke.
  var statusTimer = null;
  function say(msg, now) {
    clearTimeout(statusTimer);
    if (now) { status.textContent = msg; return; }
    statusTimer = setTimeout(function () { status.textContent = msg; }, 400);
  }

  // After the list changes, keep the search bar where the visitor had it, and bring the results into view.
  // Filtering can make the page shorter than the scroll position, which would drag the bar down the screen. So the map
  // is given just enough height to hold the position, and only while the visitor is scrolled down. If the results
  // would sit under the sticky bar or off screen, the page scrolls to them instead. The added height is capped at one screen.
  function place(s0, active) {
    map.style.minHeight = '';
    var vh = window.innerHeight;
    var cur = window.pageYOffset;
    var fr = form.getBoundingClientRect();
    var mr = map.getBoundingClientRect();
    var cs = getComputedStyle(form);
    var sticky = cs.position === 'sticky';
    var stick = sticky ? (parseFloat(cs.top) || 0) : 8;
    var mapDoc = mr.top + cur;
    var barDoc = mapDoc - fr.height - (parseFloat(cs.marginBottom) || 0); // where the bar sits before it sticks
    var want = s0;
    if (active) {
      var under = stick + fr.height + 12;
      if (sticky) {
        if (mapDoc - want < under) want = mapDoc - under;
        else if (mapDoc - want > vh * 0.85) want = barDoc - stick;
      } else if (barDoc - want < 0 || mapDoc - want > vh * 0.85) {
        want = barDoc - stick;
      }
    }
    want = Math.max(0, want);
    var maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
    if (want === s0) {
      // The blank space that holds the bar still is never more than one screen.
      if (want > maxScroll) map.style.minHeight = Math.ceil(mr.height + Math.min(want - maxScroll, vh)) + 'px';
    } else {
      want = Math.min(want, maxScroll);
    }
    if (Math.abs(window.pageYOffset - s0) > 1) window.scrollTo({ top: s0, behavior: 'auto' });
    if (Math.abs(want - s0) > 2) {
      var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: want, behavior: calm ? 'auto' : 'smooth' });
    }
  }

  function run(now) {
    var s0 = window.pageYOffset;
    var raw = input.value.trim();
    var q = raw.toLowerCase().replace(/\s+/g, ' ');
    var words = q ? q.split(' ') : [];
    var hasQ = words.length > 0;
    var hasLevel = level !== 'all';
    var active = hasQ || hasLevel;
    var matches = [];
    items.forEach(function (el, i) {
      var lv = el.getAttribute('data-level');
      var okQ = words.every(function (w) { return has(i, w); });
      var okL = !hasLevel || (level === 'none' ? !lv : lv === level);
      var on = okQ && okL;
      if (on) matches.push(el);
      el.hidden = !on;
    });
    zones.forEach(function (z) {
      var n = z.querySelectorAll('[data-item]:not([hidden])').length;
      z.hidden = n === 0;
      if (z._count) z._count.textContent = n === z._all ? z._all + plural(z._all) : n + ' of ' + z._all + plural(z._all);
    });
    map.classList.toggle('is-filtering', active);

    var shown = matches.length;
    if (empty) empty.hidden = shown > 0;
    var where = level === 'none' ? ' with no level' : ' at ' + level;
    var msg;
    if (!active) msg = total + ' items';
    else if (!shown) msg = 'No items match' + (hasQ ? ' “' + raw + '”' : '') + (hasLevel ? where : '') + '.';
    else {
      msg = shown + ' of ' + total + ' items' + (hasQ ? ' match “' + raw + '”' : '') + (hasLevel ? where : '');
      var names = shown <= 3 ? matches.map(function (el) { return el.getAttribute('data-item'); }).join(', ') : '';
      // Names help a screen reader, but a long run would wrap the status line to many rows.
      if (names && (msg + ': ' + names + '.').length <= 90) msg += ': ' + names;
      msg += '.';
      if (hasLevel && level !== 'none') msg += ' The ' + noLevel + ' items with no level are hidden.';
    }
    say(msg, now);

    place(s0, active);
  }

  if (reset) {
    reset.addEventListener('click', function () {
      input.value = '';
      level = 'all';
      Array.prototype.forEach.call(buttons, function (o) {
        o.setAttribute('aria-pressed', String(o.getAttribute('data-level') === 'all'));
      });
      run(true);
      input.focus();
    });
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  input.addEventListener('input', function () { run(false); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && input.value) { input.value = ''; run(true); }
  });
  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener('click', function () {
      level = b.getAttribute('data-level');
      Array.prototype.forEach.call(buttons, function (o) {
        o.setAttribute('aria-pressed', String(o === b));
      });
      run(true);
    });
  });
})();
