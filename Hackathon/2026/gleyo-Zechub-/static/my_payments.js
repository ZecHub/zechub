(function () {

  function centerNoResults() {
    const parent = document.querySelector('.payments-section');
    const el = document.getElementById('noResultsMessage');

    if (!parent || !el) return;

    const rect = parent.getBoundingClientRect();

      el.style.display = "0";


    el.style.top = rect.top + "px";
    el.style.left = rect.left + "px";
    el.style.width = rect.width + "px";
    el.style.height = rect.height + "px";
  }


  centerNoResults();
  window.addEventListener("resize", centerNoResults);

  function toggleFilterMenu() {
    const menu = document.getElementById('filterMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  }

  window.toggleFilterMenu = toggleFilterMenu;


  window.filterPayments= filterPayments;
  function filterPayments(status) {
    const cards = document.querySelectorAll('.payment-card');
    let anyVisible = false;

    const noPaymentsMsg = document.getElementById('noPaymentsMessage');
    if (noPaymentsMsg) {
      noPaymentsMsg.style.display = 'none';
    }

    cards.forEach(card => {
      if (status === 'all' || card.dataset.status === status) {
        card.style.display = 'block';
        anyVisible = true;
      } else {
        card.style.display = 'none';
      }
    });

    document.getElementById('noResultsMessage').style.display = anyVisible ? 'none' : 'flex';
    document.getElementById('noResultsMessage').style.opacity = anyVisible ? '0' : '1';
    document.getElementById('filterMenu').style.display = 'none'; 
  }

  function InitMypayintoClick() {
    document.addEventListener('click', function (event) {
      const menu = document.getElementById('filterMenu');
      const toggleBtn = document.getElementById('filterToggle');

      if (!menu.contains(event.target) && !toggleBtn.contains(event.target)) {
        menu.style.display = 'none';
      }
  });
  }





  window.MyPAYMENTModule = {
    init: InitMypayintoClick
  };

})();