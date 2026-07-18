(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
      return;
    }
  } catch (e) {}
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  document.documentElement.setAttribute('data-theme', mq.matches ? 'dark' : 'light');
})();
