document.addEventListener("DOMContentLoaded", () => {
const generateBtn = document.getElementById('generate-btn');
const generateBtnContent = document.getElementById('generate-btn-content');
const generateBtnOriginalHTML = generateBtnContent.innerHTML;
const originNote = document.getElementById('rp-instruction');
const paymentInfo = document.getElementById('payment-info');
const walletAddress = document.getElementById('wallet-address');
const copyBtn = document.getElementById('copy-btn');
const copyIcon = document.getElementById('copy-icon');
const checkIcon = document.getElementById('check-icon');
const copyText = document.getElementById('copy-text');
const formPanel = document.getElementById('form-panel');
const previewPanel = document.getElementById('preview-panel');
const timerDiv = document.getElementById('timer');
const audio = document.getElementById('payment-sound');
const communitySlug = document.getElementById('community-data')?.dataset?.slug;
const locationdUrl = `/community/${communitySlug}/settings/subscription`;
const checkPaidBtn = document.getElementById('check-paid-btn');
const checkPaidCooldown = document.getElementById('check-paid-cooldown');

const amountInput = document.getElementById('amount');
const amountBadge = document.getElementById('amount-badge');
const amountLabel = document.getElementById('amount-label');
const convertPreview = document.getElementById('convert-preview');

const rpAmountValue = document.getElementById('rp-amount-value');
const rpUsdValue = document.getElementById('rp-usd-value');
const rpTokenIcon = document.getElementById('rp-token-icon');
const rpNetworkBadge = document.getElementById('rp-network-badge');
const copyAmountBtn = document.getElementById('copy-amount-btn');
const infoBtn = document.getElementById('info-btn');

const SETTLEMENT_TOKEN = 'ZEC';
const SETTLEMENT_NETWORK = 'Zcash';
const SWAPPING_RECHECK = 20; 

const NETWORKS_BY_TOKEN = {
  USDT: [
    { value: 'Polygon', label: 'Polygon' },
    { value: 'BSC', label: 'BNB Smart Chain (BSC)' }
  ],
  USDC: [
    { value: 'Base', label: 'Base' },
    { value: 'Polygon', label: 'Polygon' },
    { value: 'BSC', label: 'BNB Smart Chain (BSC)' }
  ],
  ZEC: [
    { value: 'Zcash', label: 'Zcash' }
  ]
};

function getNetworkLabel(token, networkValue) {
  const list = NETWORKS_BY_TOKEN[token] || [];
  const match = list.find(n => n.value === networkValue);
  return match ? match.label : networkValue;
}

const Network = {
  USDT: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <circle cx="16" cy="16" r="16" fill="#26A17B"></circle> <path fill="#FFF" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"></path> </g> </g></svg>`,
  USDC: `<svg data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><path d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z" fill="#2775ca"/><path d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z" fill="#fff"/><path d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z" fill="#fff"/></svg>`,
  ZEC: `  <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" fill="#F3B724"/>
            <polyline points="9 9 15 9 9 15 15 15" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <line x1="12" y1="7" x2="12" y2="9" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
            <line x1="12" y1="15" x2="12" y2="17" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
          </svg>
  `,
};

const Blockchain = {
  Base: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111 111" fill="none"><circle cx="55.5" cy="55.5" r="55.5" fill="#0052FF"/><path d="M56.13 88c17.93 0 32.47-14.54 32.47-32.47 0-17.94-14.54-32.48-32.47-32.48-16.78 0-30.6 12.75-32.28 29.09h42.75v6.78H23.85C25.53 75.25 39.35 88 56.13 88z" fill="#fff"/></svg>`,
  Polygon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#8247e5"/><path fill="#fff" d="M21.092 12.693a1.396 1.396 0 0 0-1.35 0l-3.093 1.792-2.104 1.16-3.093 1.792a1.396 1.396 0 0 1-1.35 0L7.6 15.978a1.353 1.353 0 0 1-.675-1.157v-2.735a1.32 1.32 0 0 1 .675-1.156l2.483-1.402a1.396 1.396 0 0 1 1.35 0l2.483 1.402a1.353 1.353 0 0 1 .675 1.156v1.792l2.104-1.223v-1.792a1.32 1.32 0 0 0-.675-1.156l-4.53-2.63a1.396 1.396 0 0 0-1.35 0L5.61 9.51a1.353 1.353 0 0 0-.675 1.156v5.28a1.32 1.32 0 0 0 .675 1.156l4.559 2.63a1.396 1.396 0 0 0 1.35 0l3.093-1.763 2.104-1.223 3.093-1.763a1.396 1.396 0 0 1 1.35 0l2.483 1.402a1.32 1.32 0 0 1 .675 1.156v2.735a1.353 1.353 0 0 1-.675 1.157l-2.454 1.43a1.396 1.396 0 0 1-1.35 0l-2.483-1.402a1.353 1.353 0 0 1-.675-1.157v-1.762l-2.104 1.222v1.792a1.32 1.32 0 0 0 .675 1.156l4.53 2.63a1.396 1.396 0 0 0 1.35 0l4.559-2.63a1.353 1.353 0 0 0 .675-1.156v-5.31a1.32 1.32 0 0 0-.675-1.156z"/></svg>`,
  BSC: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2496 2496"><circle cx="1248" cy="1248" r="1248" fill="#F0B90B"/><path fill="#fff" d="M685.9,1248l0.9,330l280.4,165v193.2l-444.5-260.7v-524L685.9,1248L685.9,1248z M685.9,918v192.3l-163.3-96.6V821.4l163.3-96.6l164.1,96.6L685.9,918L685.9,918z M1084.3,821.4l163.3-96.6l164.1,96.6L1247.6,918L1084.3,821.4L1084.3,821.4z"/><path fill="#fff" d="M803.9,1509.6v-193.2l163.3,96.6v192.3L803.9,1509.6L803.9,1509.6z M1084.3,1812.2l163.3,96.6l164.1-96.6v192.3l-164.1,96.6l-163.3-96.6V1812.2L1084.3,1812.2z M1645.9,821.4l163.3-96.6l164.1,96.6v192.3l-164.1,96.6V918L1645.9,821.4L1645.9,821.4L1645.9,821.4z M1809.2,1578l0.9-330l163.3-96.6v524l-444.5,260.7v-193.2L1809.2,1578L1809.2,1578L1809.2,1578z"/><polygon fill="#fff" points="1692.1,1509.6 1528.8,1605.3 1528.8,1413 1692.1,1316.4 1692.1,1509.6"/><path fill="#fff" d="M1692.1,986.4l0.9,193.2l-281.2,165v330.8l-163.3,95.7l-163.3-95.7v-330.8l-281.2-165V986.4L968,889.8l279.5,165.8l281.2-165.8l164.1,96.6H1692.1L1692.1,986.4z M803.9,656.5l443.7-261.6l444.5,261.6l-163.3,96.6l-281.2-165.8L967.2,753.1L803.9,656.5L803.9,656.5z"/></svg>`,
};

let selectedToken = null;
let selectedNetwork = null;
let selectedNetworkLabel = null;

let zecUsdRate = null;
let zecUsdRateFetchedAt = 0;
let zecUsdRatePromise = null;
const RATE_CACHE_MS = 60 * 1000;

async function getZecUsdRate() {
  const isFresh = zecUsdRate && (Date.now() - zecUsdRateFetchedAt) < RATE_CACHE_MS;
  if (isFresh) return zecUsdRate;
  if (zecUsdRatePromise) return zecUsdRatePromise;

  zecUsdRatePromise = fetch('/api/zec-price')
    .then(res => {
      if (!res.ok) throw new Error('rate lookup failed');
      return res.json();
    })
    .then(data => {
      const price = data?.price;
      if (!price || price <= 0) throw new Error('bad rate payload');
      zecUsdRate = price;
      zecUsdRateFetchedAt = Date.now();
      return zecUsdRate;
    })
    .catch(err => {
      console.error('❌ ZEC rate fetch error:', err);
      return null;
    })
    .finally(() => {
      zecUsdRatePromise = null;
    });

  return zecUsdRatePromise;
}

function convertTokenAmountToZec(amount, token, rate) {
  if (token === 'ZEC') return amount;
  if (!rate) return null;
  return amount / rate;
}

function formatZec(n) {
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function formatUsd(n) {
  return Number(n).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

// Zodl-style truncation: "9nB93KHbft...YEQ3fKiws3"
function truncateAddress(address, front = 10, back = 8) {
  if (!address) return '';
  if (address.length <= front + back + 3) return address;
  return `${address.slice(0, front)}...${address.slice(-back)}`;
}

function setGenerateLoading(isLoading) {
  generateBtn.disabled = isLoading;
  if (isLoading) {
    generateBtnContent.innerHTML = `<span class="btn-spinner"></span> Generating...`;
  } else {
    generateBtnContent.innerHTML = generateBtnOriginalHTML;
  }
}

const tokenSelect = document.getElementById('token-select');
const tokenSelectedLabel = document.getElementById('token-selected-label');
const tokenOptions = document.getElementById('token-options');

const networkSelect = document.getElementById('network-select');
const networkSelectedLabel = document.getElementById('network-selected-label');
const networkOptions = document.getElementById('network-options');

function closeAllSelects() {
  tokenSelect.classList.remove('open');
  tokenOptions.classList.remove('open');
  networkSelect.classList.remove('open');
  networkOptions.classList.remove('open');
}

tokenSelect.addEventListener('click', () => {
  const willOpen = !tokenOptions.classList.contains('open');
  closeAllSelects();
  if (willOpen) {
    tokenSelect.classList.add('open');
    tokenOptions.classList.add('open');
  }
});

tokenOptions.querySelectorAll('.option-item').forEach(opt => {
  opt.addEventListener('click', (e) => {
    e.stopPropagation();
    const value = opt.dataset.value;
    selectToken(value, opt.textContent.trim());
    closeAllSelects();
  });
});

networkSelect.addEventListener('click', () => {
  if (networkSelect.classList.contains('disabled')) {
    if (!selectedToken) showToast('Select a token first', 'error');
    return;
  }
  const willOpen = !networkOptions.classList.contains('open');
  closeAllSelects();
  if (willOpen) {
    networkSelect.classList.add('open');
    networkOptions.classList.add('open');
  }
});

document.addEventListener('click', (e) => {
  if (!tokenSelect.contains(e.target) && !tokenOptions.contains(e.target) &&
      !networkSelect.contains(e.target) && !networkOptions.contains(e.target)) {
    closeAllSelects();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllSelects();
});

function selectToken(value, label) {
  selectedToken = value;
  tokenSelectedLabel.textContent = label;
  tokenOptions.querySelectorAll('.option-item').forEach(o => {
    o.classList.toggle('active', o.dataset.value === value);
  });

  selectedNetwork = null;
  selectedNetworkLabel = null;
  buildNetworkOptions(value);

  amountBadge.textContent = value;
  amountLabel.textContent = `Amount (${value})`;
  const noteLabel = document.getElementById('note-label');
  const noteField = document.getElementById('note');
  if (value === 'ZEC') {
    noteLabel.textContent = 'Memo (Optional)';
    noteField.placeholder = 'Enter a memo (optional)...';
    noteField.required = false;
    const only = NETWORKS_BY_TOKEN.ZEC[0];
    selectNetwork(only.value, only.label);
    convertPreview.classList.remove('show', 'err');
    convertPreview.textContent = '';
  } else {
    noteLabel.textContent = 'Refundable Address';
    noteField.placeholder = 'Enter your wallet address for refunds...';
    noteField.required = true;
    networkSelect.classList.remove('disabled');
    networkSelectedLabel.textContent = 'Select network';
    updateConversionPreview();
  }
}

function buildNetworkOptions(token) {
  const list = NETWORKS_BY_TOKEN[token] || [];
  networkOptions.innerHTML = '';
  list.forEach(net => {
    const div = document.createElement('div');
    div.className = 'option-item';
    div.dataset.value = net.value;
    div.textContent = net.label;
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      selectNetwork(net.value, net.label);
      closeAllSelects();
    });
    networkOptions.appendChild(div);
  });
}

function selectNetwork(value, label) {
  selectedNetwork = value;
  selectedNetworkLabel = label;
  networkSelectedLabel.textContent = label;
  networkOptions.querySelectorAll('.option-item').forEach(o => {
    o.classList.toggle('active', o.dataset.value === value);
  });
}

// ── Live conversion preview under the amount field ──
let conversionDebounce = null;
amountInput.addEventListener('input', () => {
  clearTimeout(conversionDebounce);
  conversionDebounce = setTimeout(updateConversionPreview, 300);
});

async function updateConversionPreview() {
  if (!selectedToken || selectedToken === 'ZEC') {
    convertPreview.classList.remove('show', 'err');
    convertPreview.textContent = '';
    return;
  }

  const amount = parseFloat(amountInput.value);
  if (!amount || amount <= 0) {
    convertPreview.classList.remove('show', 'err');
    convertPreview.textContent = '';
    return;
  }

  convertPreview.classList.add('show');
  convertPreview.classList.remove('err');
  convertPreview.textContent = 'Fetching conversion rate…';

  const rate = await getZecUsdRate();
  if (!rate) {
    convertPreview.classList.add('err');
    convertPreview.textContent = 'Could not fetch conversion rate — try again.';
    return;
  }

  const zecAmount = convertTokenAmountToZec(amount, selectedToken, rate);
  convertPreview.classList.remove('err');
  convertPreview.innerHTML = `≈ <strong>${formatZec(zecAmount)} ZEC</strong> at current rate`;
}

const ACTIVE_DURATION = 10;
const COOLDOWN_DURATION = 30;

let checkPaidCycleInterval = null;
let checkPaidPhaseEndTime = null;
let currentPaymentId = null;
let countdownInterval = null;

function startCheckPaidCycle() {
  clearInterval(checkPaidCycleInterval);
  enterActivePhase();
}

function enterActivePhase() {
  clearInterval(checkPaidCycleInterval);

  checkPaidBtn.disabled = false;
  checkPaidBtn.textContent = "I've sent the funds";
  checkPaidPhaseEndTime = Date.now() + ACTIVE_DURATION * 1000;

  checkPaidCycleInterval = setInterval(() => {
    const remaining = Math.ceil((checkPaidPhaseEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      enterCooldownPhase();
      return;
    }
    checkPaidCooldown.textContent = `Click within ${remaining}s`;
  }, 250);
}

function enterCooldownPhase() {
  clearInterval(checkPaidCycleInterval);
  checkPaidBtn.disabled = true;
  checkPaidPhaseEndTime = Date.now() + COOLDOWN_DURATION * 1000;

  checkPaidCycleInterval = setInterval(() => {
    const remaining = Math.ceil((checkPaidPhaseEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      enterActivePhase();
      return;
    }
    checkPaidBtn.textContent = `Checking available in ${remaining}s`;
    checkPaidCooldown.textContent = '';
  }, 250);
}

function stopCheckPaidCycle() {
  clearInterval(checkPaidCycleInterval);
  checkPaidBtn.disabled = true;
  checkPaidCooldown.textContent = '';
}

function enterSwappingPhase() {
  clearInterval(checkPaidCycleInterval);
  checkPaidBtn.disabled = true;
  checkPaidPhaseEndTime = Date.now() + SWAPPING_RECHECK * 1000;

  checkPaidCycleInterval = setInterval(() => {
    const remaining = Math.ceil((checkPaidPhaseEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(checkPaidCycleInterval);
      // FIXED: call the check logic directly instead of checkPaidBtn.click().
      // The button is disabled at this point, and browsers do not fire click
      // listeners on disabled buttons — the old .click() call was a silent
      // no-op, so the swapping loop never actually rechecked anything.
      checkPayment();
      return;
    }
    checkPaidBtn.textContent = `Checking again in ${remaining}s`;
    checkPaidCooldown.textContent = '';
  }, 250);
}

// Extracted so both the real button click and the auto-recheck timer
// (which fires while checkPaidBtn is disabled) can trigger the same logic.
function checkPayment() {
  if (!currentPaymentId) return;

  const checkUrl = `/${communitySlug}/verify_payment/${currentPaymentId}`;
  const statusDiv = document.getElementById('status');

  checkPaidBtn.disabled = true;
  statusDiv.innerHTML = `
    <span class="payment-waiting">
      <span class="spinner"></span> Checking payment...
    </span>
  `;

  fetch(checkUrl, { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'paid') {
        stopCheckPaidCycle();
        clearInterval(countdownInterval);

        localStorage.removeItem(`payment_session_${currentPaymentId}`);
        localStorage.removeItem('last_payment_id');

        sessionStorage.setItem("paid_payment_id", currentPaymentId);
        audio.currentTime = 0;
        audio.play().catch(() => {});
        statusDiv.innerHTML = `
          <span class="pop-status">
            <span class="check-circle">✔️</span> Payment received!
          </span>
        `;

        if (typeof confetti === 'function') {
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        }

        setTimeout(() => {
          window.location.href = locationdUrl;
        }, 2000);

      } else if (data.status === 'expired') {
        stopCheckPaidCycle();
        clearInterval(countdownInterval);

        statusDiv.innerHTML = '❌ Session expired';

        localStorage.removeItem(`payment_session_${currentPaymentId}`);
        localStorage.removeItem('last_payment_id');

        setTimeout(() => {
          window.location.href = locationdUrl;
        }, 3000);

      } else if (data.stage === 'swapping') {
        // Deposit detected, Defuse is mid-swap — real progress, not
        // "not detected". Auto-recheck instead of making the user click
        // again; redirect only ever happens from the status === 'paid'
        // branch above, once a later recheck actually confirms it.
        statusDiv.innerHTML = `
          <span class="payment-waiting">
            <span class="spinner"></span> Payment swapping — this will confirm automatically, no need to click again...
          </span>
        `;
        enterSwappingPhase();

      } else {
        statusDiv.innerHTML = `❌ Payment not detected yet. Try again shortly.`;

        setTimeout(() => {
          if (
            statusDiv.innerHTML.includes('Payment not detected')
          ) {
            statusDiv.innerHTML = '';
          }
        }, 5000);

        enterCooldownPhase();
      }
    })
    .catch(err => {
      console.error('❌ Check payment error:', err);
      statusDiv.innerHTML = '❌ Error checking payment.';
      enterCooldownPhase();
    });
}

checkPaidBtn.addEventListener('click', () => {
  if (checkPaidBtn.disabled || !currentPaymentId) return;
  checkPayment();
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function resetToForm() {
  previewPanel.style.display = 'none';
  paymentInfo.style.display = 'none';
  formPanel.style.display = 'flex';
  document.body.classList.remove('right-panel-active');
  currentPaymentId = null;
  document.getElementById('amount').value = '';
  document.getElementById('note').value = '';
  timerDiv.innerHTML = '';
  document.getElementById('status').innerHTML = '';
  setGenerateLoading(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startTimer(secondsRemaining, paymentId) {
  clearInterval(countdownInterval);

  const expirationTime = Date.now() + secondsRemaining * 1000;

  countdownInterval = setInterval(() => {
    const now = Date.now();
    const remainingSeconds = Math.floor((expirationTime - now) / 1000);

    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
      stopCheckPaidCycle();

      timerDiv.innerHTML = '❌ Payment expired';
      document.getElementById('status').innerHTML =
        '<span style="color:#ff7777">Session expired</span>';

      localStorage.removeItem(`payment_session_${paymentId}`);
      localStorage.removeItem('last_payment_id');

      fetch(`/${communitySlug}/verify_payment/${paymentId}`, {
        method: 'POST'
      }).catch(console.error);

      setTimeout(resetToForm, 1500);
    } else {
      timerDiv.innerHTML = `⏳ Time left: ${formatTime(remainingSeconds)}`;
    }
  }, 1000);
}

function saveSession(id, expiresAt, communitySlug) {
  const sessionData = { id, expiresAt, communitySlug };
  localStorage.setItem(`payment_session_${id}`, JSON.stringify(sessionData));
  localStorage.setItem('last_payment_id', id);
}

function setupCopyBtn(addressText) {
  copyBtn.onclick = () => copyToClipboard(addressText, showCopiedState);

  function showCopiedState() {
    copyIcon.style.display = "none";
    checkIcon.style.display = "inline";
    copyText.textContent = "Copied";
    setTimeout(() => {
      copyIcon.style.display = "inline";
      checkIcon.style.display = "none";
      copyText.textContent = "Copy";
    }, 1500);
  }
}

function copyToClipboard(text, onSuccess) {
  const textToCopy = text.trim();

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(onSuccess).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }

  function fallbackCopy() {
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    tempInput.setAttribute("readonly", "");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";
    tempInput.style.top = "0";
    tempInput.style.opacity = "0";
    tempInput.style.pointerEvents = "none";
    tempInput.style.height = "0";
    tempInput.style.zIndex = "-1";

    document.body.appendChild(tempInput);
    tempInput.select();

    try {
      const successful = document.execCommand("copy");
      if (successful && onSuccess) onSuccess();
    } catch (err) {
      alert("Copy failed. Please copy manually.");
    }

    document.body.removeChild(tempInput);
  }
}

copyAmountBtn?.addEventListener('click', () => {
  const amt = rpAmountValue.textContent.trim();
  copyToClipboard(amt, () => showToast('Amount copied', 'success'));
});

infoBtn?.addEventListener('click', () => {
  openRefundPolicy();
});

function buildQrData(address, zecAmount, token) {
  if (token === 'ZEC') {
    return `zcash:${address}?amount=${zecAmount}`;
  }
  return address;
}

function renderQR(address, zecAmount, token) {
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';

  const qrData = buildQrData(address, zecAmount, token);

  const qr = new QRCodeStyling({
      width: 280,
      height: 280,
      type: "svg",
      data: qrData,
      qrOptions: {
          errorCorrectionLevel: "H"
      },
      dotsOptions: {
          color: "#000000",
          type: "rounded"
      },
      backgroundOptions: {
          color: "#d9d8d8"
      },
      cornersSquareOptions: {
          type: "extra-rounded"
      },
      cornersDotOptions: {
          type: "dot"
      }
  });

  qr.append(qrContainer);
}

function showToast(msg, type = "error") {
  document.querySelectorAll(".toast").forEach(t => t.remove());

  const t = document.createElement("div");
  t.className = `toast ${type}`;

  t.innerHTML = msg;

  document.body.appendChild(t);

  requestAnimationFrame(() => t.classList.add("show"));

  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 2600);
}

function showError(msg) {
  showToast(msg, "error");
}

function renderTokenBadge(token, networkValue) {
  rpTokenIcon.innerHTML = Network[token] || '';
  if (token === 'ZEC') {
    // Zcash IS the network — no separate badge needed.
    rpNetworkBadge.innerHTML = '';
    rpNetworkBadge.style.display = 'none';
  } else {
    rpNetworkBadge.innerHTML = Blockchain[networkValue] || '';
    rpNetworkBadge.style.display = Blockchain[networkValue] ? 'flex' : 'none';
  }
}

function showPreviewPanel(zecAmount, address, originToken, originNetworkLabel, originAmount, originNetworkValue) {
  formPanel.style.display = 'none';
  previewPanel.style.display = 'flex';
  paymentInfo.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    document.body.classList.add("right-panel-active");
  }, 150);

  window.__lastZecAmount = zecAmount;

  const displayToken = originToken || 'ZEC';
  const displayAmount = (displayToken === 'ZEC') ? zecAmount : originAmount;
  const netValue = originNetworkValue || selectedNetwork;
  const netLabel = originNetworkLabel || selectedNetworkLabel;

  window.__lastOriginToken = displayToken;
  window.__lastOriginNetworkValue = netValue;
  window.__lastOriginNetworkLabel = netLabel;

  renderTokenBadge(displayToken, netValue);

  rpAmountValue.textContent = displayToken === 'ZEC'
    ? formatZec(zecAmount)
    : Number(displayAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });

  // USD equivalent line
  rpUsdValue.textContent = '';
  if (displayToken === 'ZEC') {
    getZecUsdRate().then(rate => {
      if (rate) rpUsdValue.textContent = `≈ ${formatUsd(zecAmount * rate)}`;
    });
  } else {
    rpUsdValue.textContent = formatUsd(displayAmount);
  }

  // Zodl-style instruction copy
  if (displayToken === 'ZEC') {
    originNote.innerHTML = `Use your <strong>ZEC</strong> wallet on <strong>Zcash</strong> to send funds. Sending other assets may result in loss of funds.`;
  } else {
    originNote.innerHTML = `Use your <strong>${displayToken}</strong> on <strong>${netLabel}</strong> wallet to deposit funds. Depositing other assets may result in loss of funds. This settles as <strong>${formatZec(zecAmount)} ZEC</strong> on Zcash.`;
  }

  const fullAddress = address;
  walletAddress.textContent = truncateAddress(fullAddress);
  walletAddress.dataset.full = fullAddress;

  renderQR(fullAddress, zecAmount, displayToken);
  setupCopyBtn(fullAddress);
}

async function save_payment() {

  const rawAmount = parseFloat(amountInput.value);
  const noteField = document.getElementById('note');
  const refund_address = noteField.value.trim();
  const save_paymentUrl = `/${communitySlug}/save_payment`;

  const MIN_ZEC_AMOUNT = 0.001;

  if (!selectedToken) {
    showError('Please select a token.');
    return;
  }
  if (!selectedNetwork) {
    showError('Please select a network.');
    return;
  }

  if (!rawAmount || rawAmount <= 0) {
    showError(`Please enter a valid ${selectedToken} amount.`);
    return;
  }

  if (selectedToken !== 'ZEC' && !refund_address) {
      showError('Please enter your refundable wallet address.');
      return;
  }
  setGenerateLoading(true);

  let zecAmount = rawAmount;
  if (selectedToken !== 'ZEC') {
    const rate = await getZecUsdRate();
    if (!rate) {
      showError('Unable to fetch conversion rate right now. Please try again.');
      setGenerateLoading(false);
      return;
    }
    zecAmount = Math.round(convertTokenAmountToZec(rawAmount, selectedToken, rate) * 10000) / 10000;
  }

  if (zecAmount < MIN_ZEC_AMOUNT) {
    showError(`Minimum payment is ${MIN_ZEC_AMOUNT} ZEC (your ${selectedToken} amount converts below this).`);
    setGenerateLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append("amount", rawAmount);
  formData.append("token", selectedToken);
  formData.append("network", selectedNetwork);
  formData.append("origin_token", selectedToken);
  formData.append("origin_network", selectedNetwork);
  if (selectedToken === 'ZEC') {
      formData.append('note', refund_address);
  } else {
      formData.append('refund_address', refund_address);
  }

  fetch(save_paymentUrl, {
    method: 'POST',
    body: formData
  })
    .then(async res => {
      const data = await res.json();

      if (!res.ok) {
        if (
          data.payment_id &&
          data.expires_at &&
          data.error?.toLowerCase().includes('pending')
        ) {

          currentPaymentId = data.payment_id;

          saveSession(
            data.payment_id,
            data.expires_at,
            communitySlug
          );

          // IMPORTANT: build the preview from the PENDING payment's own
          // token/network/amount (data.token / data.network / data.amount),
          // never from whatever the user currently has selected in the
          // form. A pending payment can be a completely different
          // token/network than the live dropdowns — using the form's
          // selectedToken/selectedNetwork/rawAmount here was the bug: the
          // address/amount came from the backend correctly, but the icon
          // and instruction text were built from stale, unrelated form
          // state, producing a mismatched preview.
          const restoredToken = (data.token || 'ZEC').toUpperCase();
          const restoredNetwork = data.network || (restoredToken === 'ZEC' ? 'Zcash' : '');
          const restoredNetworkLabel = getNetworkLabel(restoredToken, restoredNetwork);

          showPreviewPanel(
            data.amount,
            data.address,
            restoredToken,
            restoredNetworkLabel,
            data.amount,
            restoredNetwork
          );

          startTimer(
            Math.max(5, data.expires_at - data.server_time),
            data.payment_id
          );

          startCheckPaidCycle();

          setGenerateLoading(false);

          showToast(
            "⚠️ Restored active payment",
            "warning"
          );

          return Promise.reject('__SESSION_RESTORED__');
        }

        throw data;
      }

      return data;
    })
    .then(data => {
      const { id, address, created_at, server_time } = data;
      const expires_at = created_at + 1800;

      if (!id || !address || !expires_at || !server_time) {
        console.error('Missing required data from server:', data);
        setGenerateLoading(false);
        return;
      }

      currentPaymentId = id;
      showPreviewPanel(zecAmount, address, selectedToken, selectedNetworkLabel, rawAmount, selectedNetwork);

      const secondsRemaining = expires_at - server_time;

      saveSession(id, expires_at, communitySlug);
      startTimer(secondsRemaining, id);
      startCheckPaidCycle();
    })
    .catch(err => {
      if (err === '__SESSION_RESTORED__') {
        return;
      }

      console.error('❌ Fetch error:', err);

      const msg =
        err?.error ||
        err?.message ||
        'Unable to generate payment';

      showError(`❌ ${msg}`);

      setGenerateLoading(false);
    });
}

generateBtn.addEventListener('click', async () => {
  save_payment();
});

// Expose for the inline share-modal script in pay.html
window.__gleyoPay = { truncateAddress, buildQrData, Network, Blockchain, showToast };

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  if (e.target.tagName === "TEXTAREA") return;

  if (document.body.classList.contains("right-panel-active")) {
    e.preventDefault();

    if (!checkPaidBtn.disabled && currentPaymentId) {
      checkPaidBtn.click();   
    }
    return;
  }

  e.preventDefault();

  if (!generateBtn.disabled) {
    save_payment();
  }
});

const params = new URLSearchParams(window.location.search);


const initAmount = params.get('prefillAmount');


if (initAmount) {
    const parsed = parseFloat(initAmount);
    const token = "ZEC"

    if (!isNaN(parsed) && parsed > 0) {
        amountInput.value = parsed;
        updateConversionPreview();
        selectToken(token, token);
    }
}
});

document.querySelectorAll('.copy-button, .share-button')
.forEach(btn => {

    btn.addEventListener('touchend', () => {
        btn.classList.remove('button-bounce');

        void btn.offsetWidth;

        btn.classList.add('button-bounce');
    });

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('button-bounce');

        void btn.offsetWidth;

        btn.classList.add('button-bounce');
    });

});