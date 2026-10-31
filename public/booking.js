// "Book a meeting": each booking link is a plain link to the Cal.com page, and this opens that page in a dialog over the
// site instead. Nothing from Cal.com loads until the click, and none of their code runs on this site: the page sits in a
// frame (the CSP's frame-src allows https://cal.com and nothing else). Ctrl- or middle-click still opens it in a tab.
(function () {
  var dialog = null;
  function open(href) {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'booking';
      dialog.setAttribute('aria-label', 'Book a meeting');
      var bar = document.createElement('div');
      bar.className = 'booking-bar';
      var title = document.createElement('span');
      title.textContent = 'Book a meeting';
      var tab = document.createElement('a');
      tab.target = '_blank';
      tab.rel = 'noopener';
      tab.textContent = 'Open in Cal.com';
      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'btn ghost';
      close.textContent = 'Close';
      close.addEventListener('click', function () {
        dialog.close();
      });
      bar.append(title, tab, close);
      var frame = document.createElement('iframe');
      frame.title = 'Cal.com booking calendar';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      dialog.append(bar, frame);
      // A click on the backdrop (outside the dialog's box) closes it too.
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });
      document.body.appendChild(dialog);
    }
    var frame = dialog.querySelector('iframe');
    if (frame.getAttribute('src') !== href) frame.setAttribute('src', href);
    dialog.querySelector('.booking-bar a').href = href;
    dialog.showModal();
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[data-cal-link]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
    if (typeof HTMLDialogElement !== 'function') return;
    event.preventDefault();
    open(link.href);
  });
})();
