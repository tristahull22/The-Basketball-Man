/* The Basketball Man - site behaviour. Small on purpose. */
(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Pre-select the system type when arriving from an "Enquire" button
  var select = document.getElementById('system-select');
  if (select) {
    var wanted = new URLSearchParams(window.location.search).get('system');
    if (wanted) {
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value.toLowerCase() === wanted.toLowerCase()) {
          select.selectedIndex = i;
        }
      }
    }
    var detail = new URLSearchParams(window.location.search).get('system-detail');
    var message = document.querySelector('textarea[name="message"]');
    if (detail && message && !message.value) {
      message.value = 'I am interested in the ' + detail + '. ';
    }
  }

  // Keep the enquiry form usable if the form service is not configured yet
  var form = document.querySelector('form.enquiry');
  if (form && form.getAttribute('action').indexOf('REPLACE_WITH') !== -1) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-error');
      if (!note) {
        note = document.createElement('p');
        note.className = 'form-error';
        form.appendChild(note);
      }
      note.textContent = 'The enquiry form is not connected yet. '
        + 'Please call 0417 970 163 or email info@basketballman.com.au.';
    });
  }
})();
