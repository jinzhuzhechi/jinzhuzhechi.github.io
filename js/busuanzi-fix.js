/* global window, document */
(function() {
  var isLocalHost = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  var valueSelectors = [
    '#busuanzi_value_page_pv',
    '#busuanzi_value_site_pv',
    '#busuanzi_value_site_uv'
  ];
  var containerSelectors = [
    '#busuanzi_container_page_pv',
    '#busuanzi_container_site_pv',
    '#busuanzi_container_site_uv'
  ];

  function normalizeValues() {
    valueSelectors.forEach(function(selector) {
      var el = document.querySelector(selector);
      if (!el) {
        return;
      }
      if (isLocalHost) {
        el.textContent = '0';
        return;
      }
      var raw = (el.textContent || '').trim();
      var n = Number(raw);
      if (!Number.isFinite(n) || n < 0) {
        el.textContent = '0';
      }
    });
  }

  function showContainersOnLocal() {
    if (!isLocalHost) {
      return;
    }
    containerSelectors.forEach(function(selector) {
      var el = document.querySelector(selector);
      if (el) {
        el.style.display = 'inline';
      }
    });
  }

  function runFix() {
    normalizeValues();
    showContainersOnLocal();
  }

  window.addEventListener('load', function() {
    runFix();
    setTimeout(runFix, 500);
    setTimeout(runFix, 1500);
  });
})();
