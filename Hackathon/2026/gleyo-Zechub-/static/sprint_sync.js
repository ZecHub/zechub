document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title');
  const rewardInput = document.getElementById('rewards');
  const descInput = document.getElementById('description');
  const startDateInput = document.getElementById('start_date');
  const endDateInput = document.getElementById('end_date');

  const previewTitle = document.getElementById('previewTitle');
  const previewReward = document.getElementById('previewReward');
  const previewDescription = document.getElementById('previewDescription');
  const previewDateRange = document.getElementById('previewDateRange');
  const countdownTimer = document.getElementById('countdownTimer');

  function updateCountdown() {
    const startDate = new Date(startDateInput.value);
    const now = new Date();
    const diff = startDate - now;

    if (diff <= 0) {
      countdownTimer.innerHTML = `<div class="countdown-digit"><span class="num">00</span><span class="unit">DAYS</span></div>
      <div class="countdown-digit"><span class="num">00</span><span class="unit">HRS</span></div>
      <div class="countdown-digit"><span class="num">00</span><span class="unit">MIN</span></div>
      <div class="countdown-digit"><span class="num">00</span><span class="unit">SEC</span></div>`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownTimer.innerHTML = `
      <div class="countdown-digit"><span class="num">${String(days).padStart(2, '0')}</span><span class="unit">DAYS</span></div>
      <div class="countdown-digit"><span class="num">${String(hours).padStart(2, '0')}</span><span class="unit">HRS</span></div>
      <div class="countdown-digit"><span class="num">${String(minutes).padStart(2, '0')}</span><span class="unit">MIN</span></div>
      <div class="countdown-digit"><span class="num">${String(seconds).padStart(2, '0')}</span><span class="unit">SEC</span></div>
    `;
  }

  function syncFields() {
    previewTitle.textContent = titleInput.value || "Sprint name";
    previewReward.textContent = rewardInput.value || "Top 3 get $USDT + Gleyo XP";
    previewDescription.textContent = descInput.value || "Complete daily quests and rise up the leaderboard.";

    if (startDateInput.value && endDateInput.value) {
      const start = new Date(startDateInput.value).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      const end = new Date(endDateInput.value).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      previewDateRange.textContent = `${start} – ${end}`;
    }

    updateCountdown();
  }

  [titleInput, rewardInput, descInput, startDateInput, endDateInput].forEach(input => {
    input.addEventListener('input', syncFields);
    input.addEventListener('change', syncFields);
  });

  syncFields();
  setInterval(updateCountdown, 1000);
});
