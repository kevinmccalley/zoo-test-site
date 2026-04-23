// Zoo Test Site — JS with intentional accessibility issues

// Accordion toggle — no keyboard support, no aria-expanded
function toggleAccordion(id) {
  const body = document.getElementById(id);
  if (body) {
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
    // No aria-expanded update on the header
  }
}

// Custom checkbox — only responds to clicks, not keyboard
function toggleCheck(el) {
  const box = el.querySelector('.checkbox-box');
  if (box) {
    box.classList.toggle('checked');
    // No aria-checked update
  }
}

// Contact form — error shown but not announced
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name');
  if (!name || !name.value.trim()) {
    const errorEl = document.getElementById('form-error');
    if (errorEl) {
      errorEl.style.display = 'block';
      // No focus management — user not directed to the error
      // No aria-live on the error container
    }
    return;
  }
  const errorEl = document.getElementById('form-error');
  if (errorEl) errorEl.style.display = 'none';
  const successEl = document.getElementById('form-success');
  if (successEl) {
    successEl.style.display = 'block';
    // No focus moved to success message
    // No aria-live — screen reader users won't know submission succeeded
  }
}

// Auto-refreshing content — no user control to pause/stop (WCAG 2.2.2)
(function startTempFeed() {
  const el = document.getElementById('temp-feed');
  if (!el) return;

  const enclosures = [
    { name: 'Komodo Dragon', temp: 28 },
    { name: 'Bearded Dragon', temp: 35 },
    { name: 'Leopard Gecko', temp: 30 },
    { name: 'Gila Monster', temp: 27 },
  ];

  function update() {
    const rows = enclosures.map(e => {
      const variation = (Math.random() * 2 - 1).toFixed(1);
      const current = (e.temp + parseFloat(variation)).toFixed(1);
      return `${e.name}: ${current}°C`;
    }).join(' &nbsp;|&nbsp; ');
    el.innerHTML = rows;
    // Updates every 3 seconds with no pause mechanism
  }

  update();
  setInterval(update, 3000);
})();

// Focus trap NOT implemented in modal — user can tab out of modal
// (intentional violation: keyboard trap is absent so focus escapes,
//  and the modal itself has aria-hidden="true" while visible)
