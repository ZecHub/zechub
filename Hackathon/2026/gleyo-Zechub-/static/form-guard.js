document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.getElementById('createBtn');
  if (!createBtn) return;               // no button found, nothing to guard

  createBtn.addEventListener('click', e => {
    const grab = (selectors) => {
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) return (el.value || '').trim();
      }
      return '';
    };

    /* --------- gather field values (robust to ID changes) --------- */
    const nameVal = grab([
      '#nameInput',         
      'input[name="name"]',
      '#emailInput',
      'input[type="text"]',
      'input[type="email"]'
    ]);

    const aboutVal = grab([
      '#aboutBox',
      '#description',
      'textarea[name="description"]',
      'textarea'
    ]);

    const missing = [];
    if (!nameVal)  missing.push('Name');
    if (!aboutVal) missing.push('About');



  });
});