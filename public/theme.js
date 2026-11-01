// The theme switch: Light, Pastel, Dark or Auto (the device's setting), remembered on this device. Without it the site
// follows the device's setting and the switch stays hidden.
(function () {
  var KEY = 'mxsalata.theme';
  var root = document.documentElement;
  function stored() {
    try {
      return localStorage.getItem(KEY) || 'auto';
    } catch (e) {
      return 'auto';
    }
  }
  // The browser bar's colour: the chosen theme's header, or the device's own (the page's two meta tags) on Auto.
  var BAR = { light: '#f9fafb', pastel: '#fbeee3', dark: '#1f2630' };
  function bar(value) {
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      var m = metas[i];
      if (!m.hasAttribute('data-content')) m.setAttribute('data-content', m.getAttribute('content'));
      m.setAttribute('content', BAR[value] || m.getAttribute('data-content'));
    }
  }
  function apply(value) {
    if (value === 'light' || value === 'pastel' || value === 'dark') root.setAttribute('data-theme', value);
    else root.removeAttribute('data-theme');
    bar(value);
    var buttons = document.querySelectorAll('.themes button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-value') === value));
    }
  }
  root.classList.add('js');
  apply(stored());
  document.addEventListener('DOMContentLoaded', function () {
    apply(stored());
    // The wide screens' "UI Themes" menu closes after a pick, on Escape, and on a click anywhere else.
    function closeMenus(except) {
      var open = document.querySelectorAll('details.theme-menu[open]');
      for (var i = 0; i < open.length; i++) if (open[i] !== except) open[i].removeAttribute('open');
    }
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var menu = document.querySelector('details.theme-menu[open]');
      if (!menu) return;
      menu.removeAttribute('open');
      menu.querySelector('summary').focus();
    });
    document.addEventListener('click', function (event) {
      closeMenus(event.target.closest && event.target.closest('details.theme-menu'));
      var button = event.target.closest && event.target.closest('.themes button');
      if (!button) return;
      closeMenus(null);
      var value = button.getAttribute('data-value');
      try {
        localStorage.setItem(KEY, value);
      } catch (e) {
        // a private window: applied, not remembered
      }
      apply(value);
    });
  });
})();
