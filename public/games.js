// The Games page's tabs: one game at a time, chosen with a click, the arrow keys, Home or End (selection follows focus).
// Without JavaScript the tab list is hidden (global.css, .js) and every game shows, one under another, under its heading.
(() => {
  const list = document.querySelector('.gm-tabs');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  if (!tabs.length || panels.includes(null)) return;

  const select = (i, how) => {
    tabs.forEach((t, n) => {
      const on = n === i;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[n].hidden = !on;
    });
    if (how === 'user') {
      tabs[i].focus();
      // The address names the game shown, so a link to it opens on the same tab.
      history.replaceState(null, '', `#${panels[i].id}`);
    }
  };

  panels.forEach((p, n) => {
    p.setAttribute('role', 'tabpanel');
    p.tabIndex = 0;
  });
  const fromAddress = panels.findIndex((p) => `#${p.id}` === location.hash);
  select(fromAddress < 0 ? 0 : fromAddress, 'load');

  list.addEventListener('click', (e) => {
    const t = e.target.closest('[role="tab"]');
    if (t) select(tabs.indexOf(t), 'user');
  });
  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const last = tabs.length - 1;
    const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    select(to, 'user');
  });
})();
