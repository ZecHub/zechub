document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  const subTabParam = params.get('subtab');

  // --- Activate main tab ---
  let activeTab = document.querySelector('.tab[data-tab="' + tabParam + '"]') 
                  || document.querySelector('.tab');
  if (activeTab) {
    const target = activeTab.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    activeTab.classList.add('active');
    document.getElementById(target).classList.add('active');
  }

  // --- Activate sub-tab ---
  let activeSubTab = document.querySelector('.sub-tab[data-subtab="' + subTabParam + '"]') 
                     || document.querySelector('.tab-content.active .sub-tab');
  if (activeSubTab) {
    const target = activeSubTab.dataset.subtab;
    const parent = activeSubTab.closest('.tab-content');
    parent.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
    parent.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    activeSubTab.classList.add('active');
    document.getElementById(target).classList.add('active');
  }

  // --- Click handlers remain same ---
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
      const target = this.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(target).classList.add('active');

      params.set('tab', target);
      params.delete('subtab');
      history.replaceState(null, '', '?' + params.toString());
    });
  });

  document.querySelectorAll('.sub-tab').forEach(subTab => {
    subTab.addEventListener('click', function () {
      const target = this.dataset.subtab;
      const parent = this.closest('.tab-content');
      parent.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
      parent.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(target).classList.add('active');

      params.set('subtab', target);
      history.replaceState(null, '', '?' + params.toString());
    });
  });
});
