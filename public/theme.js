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
  function apply(value) {
    if (value === 'light' || value === 'pastel' || value === 'dark') root.setAttribute('data-theme', value);
    else root.removeAttribute('data-theme');
    var buttons = document.querySelectorAll('.themes button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-value') === value));
    }
  }
  root.classList.add('js');
  apply(stored());
  document.addEventListener('DOMContentLoaded', function () {
    apply(stored());
    document.addEventListener('click', function (event) {
      var button = event.target.closest && event.target.closest('.themes button');
      if (!button) return;
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
