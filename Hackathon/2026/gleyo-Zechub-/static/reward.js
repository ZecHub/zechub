(function () {

let ZEC_PRICE_USD = 460;
const ZEC_NET_FEE  = 0.001;   
const ZEC_PLATFORM = 0.03;
const ZEC_MIN      = 0.00185;

const balEl             = document.getElementById('zecBalDisplay');
let zecBalance          = parseFloat(balEl?.dataset?.balance    || '0') || 0;
let zecTotalEarned      = parseFloat(balEl?.dataset?.earned     || '0') || 0;
let zecTotalWithdrawn   = parseFloat(balEl?.dataset?.withdrawn  || '0') || 0;
let LAST_WITHDRAW       = 0;
let addrCheckTimer      = null;
let addrVerified        = false;
let lastVerifiedAddr    = '';

function fmtZec(n) { return n.toFixed(8); }
function fmtRewardZec(n) { return parseFloat(n).toFixed(4); }

const earnedEl = document.getElementById('totalEarned');
if (earnedEl) earnedEl.textContent = zecTotalEarned.toFixed(2);

const sheetEl = document.getElementById('sheetBal');
if (sheetEl) sheetEl.innerHTML = fmtZec(zecBalance) + ' <em>ZEC</em>';

const usdElInit = document.getElementById('zecUsdDisplay');
if (usdElInit) usdElInit.textContent = (zecBalance * ZEC_PRICE_USD).toFixed(2);

function updateWithdrawButton() {
  const btn = document.querySelector('.btn-p');
  if (!btn) return;
  btn.disabled      = zecBalance <= 0;
  btn.style.opacity = zecBalance <= 0 ? '0.5' : '1';
  btn.style.cursor  = zecBalance <= 0 ? 'not-allowed' : 'pointer';
}

function fmtLocalDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

updateWithdrawButton();

async function fetchZecPrice() {
  try {
    const res   = await fetch('/api/zec-price', { cache: 'no-store' });
    const data  = await res.json();
    const price = data?.price;
    if (price && price > 0 && price !== ZEC_PRICE_USD) {
      ZEC_PRICE_USD = price;
      refreshUsdDisplays();
    }
  } catch (_) {}
}


function txStatusClass(tx) {
  if (tx.status === 'confirmed' || tx.status === 'paid') return 'in';   
  if (tx.status === 'failed') return 'out';                            
  return 'pend';                                                       
}

function refreshUsdDisplays() {
  const usdEl = document.getElementById('zecUsdDisplay');
  if (!usdEl) return;
  usdEl.textContent  = (zecBalance * ZEC_PRICE_USD).toFixed(2);
  usdEl.style.transition = 'opacity 0.15s ease';
  usdEl.style.opacity    = '0.25';
  setTimeout(() => { usdEl.style.opacity = '1'; }, 150);
}

window.ZecPriceStore.start();

window.__rewardPriceCleanup =
window.ZecPriceStore.subscribe((price) => {
  ZEC_PRICE_USD = price;
  refreshUsdDisplays();
});

const root     = document.querySelector('.reward-conte-inner');
let tfaEnabled = root?.dataset?.tfaEnabled === 'true';

function setBalanceDisplay(bal) {
  zecBalance = bal;
  const balEl   = document.getElementById('zecBalDisplay');
  const usdEl   = document.getElementById('zecUsdDisplay');
  const sheetEl = document.getElementById('sheetBal');
  if (balEl)   balEl.innerHTML   = fmtZec(bal) + ' <em>ZEC</em>';
  if (usdEl)   usdEl.textContent = (bal * ZEC_PRICE_USD).toFixed(2);
  if (sheetEl) sheetEl.innerHTML = fmtZec(bal) + ' <em>ZEC</em>';
  updateWithdrawButton();
}

function revealID(el) {
  if (el.classList.contains('revealed')) return;
  const cover = el.querySelector('.id-cover');
  for (let i = 0; i < 50; i++) {
    const p        = document.createElement('span');
    p.className    = 'particle';
    const angle    = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 80;
    p.style.left   = Math.random() * 100 + '%';
    p.style.top    = Math.random() * 100 + '%';
    p.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * distance - Math.random() * 20 + 'px');
    p.style.animationDelay = Math.random() * 0.1 + 's';
    cover.appendChild(p);
  }
  el.classList.add('revealing');
  setTimeout(() => { el.classList.add('revealed'); cover.innerHTML = ''; }, 900);
}

function doCopy(b) {
  const el   = document.querySelector('.wa-val');
  const text = el?.dataset?.full || '';
  if (!text) { showToast('No wallet address to copy.', 'error'); return; }
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(fallback);
  } else { fallback(); }
  b.classList.add('ok');
  b.innerHTML = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.5 8L9 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg> Copied`;
  setTimeout(() => {
    b.classList.remove('ok');
    b.innerHTML = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="3.5" y="3.5" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.1"/><path d="M1.5 7.5V2C1.5 1.72 1.72 1.5 2 1.5H7.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg> Copy`;
  }, 1600);
}

function showAddrSpinner(r) {
  if (r('addrErr')) r('addrErr').innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:5px;color:var(--sub);font-size:11px">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
           style="animation:zec-spin 0.8s linear infinite;flex-shrink:0">
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5"
                stroke-dasharray="14 8" stroke-linecap="round"/>
      </svg>
      Verifying shielded address…
    </span>`;
}

function showAddrOk(r) {
  if (r('addrErr')) r('addrErr').innerHTML = `
    <span style="color:var(--green);display:inline-flex;align-items:center;gap:4px;font-size:11px">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="-5.0 -10.0 110.0 135.0" fill="currentColor" stroke="currentColor" style="position: relative; top: 2px">
        <path d="m85.652 6.5938c-15.199 4.6992-33.309 28.609-50.668 53.164-7.3672-12.414-15.172-16.559-23.242-12.312-0.99609 0.52344-1.6523 1.5273-1.7344 2.6562-0.082031 1.1406 0.42969 2.2422 1.3555 2.918 5.8516 4.2734 11.922 11.848 19.141 23.84v-0.003906c1.2891 2.1758 3.6328 3.5039 6.1562 3.4883h0.11719c2.6016-0.023438 4.9844-1.4453 6.2461-3.7188 7.0234-12.734 14.738-25.07 23.109-36.957 6.8594-9.75 14.508-18.926 22.867-27.43 1.125-1.1016 1.332-2.8359 0.5-4.1719-0.77734-1.332-2.3789-1.9453-3.8477-1.4727z"/>
      </svg>
      Valid shielded address
    </span>`;
}

function showAddrErr(r, msg) {
  if (r('addrErr')) r('addrErr').innerHTML = `
    <span style="color:var(--red,#f05070);font-size:11px">${msg}</span>`;
}

function openWithdraw() {
  if (zecBalance <= 0) {
    showToast("You don't have any funds to withdraw.", 'error');
    return;
  }
  const r = id => document.getElementById(id);
  ['w1','w2','w3'].forEach((id, i) => {
    const el = r(id);
    if (el) el.style.display = i === 0 ? '' : 'none';
  });
  if (r('amtIn'))       r('amtIn').value = '';
  if (r('destIn'))      r('destIn').value = '';
  if (r('rcv'))         r('rcv').textContent = '—';
  if (r('platformFee')) r('platformFee').textContent = '—';
  if (r('remainAfter')) r('remainAfter').textContent = '—';
  if (r('procBtn'))     r('procBtn').disabled = true;
  if (r('amtErr'))      r('amtErr').textContent = '';
  if (r('addrErr'))     r('addrErr').textContent = '';
  if (r('balRemain'))   r('balRemain').textContent = 'Balance: ' + fmtZec(zecBalance) + ' ZEC';
  if (r('sheetBal'))    r('sheetBal').innerHTML = fmtZec(zecBalance) + ' <em>ZEC</em>';

  addrVerified     = false;
  lastVerifiedAddr = '';

  r('wOv').classList.add('open');
}

function closeW() {
  document.getElementById('wOv').classList.remove('open');
}

function bgClose(e, id) {
  if (e.target === document.getElementById(id)) document.getElementById(id).classList.remove('open');
}

// FIXED: MAX just sets the exact balance — no division, no reduction
function setMax() {
  if (zecBalance <= 0) return;
  const el = document.getElementById('amtIn');
  if (el) {
    el.value = parseFloat(zecBalance.toFixed(8));
    calcFee(true);
  }
}

function checkProcBtn() {
  const amt     = parseFloat(document.getElementById('amtIn')?.value) || 0;
  const procBtn = document.getElementById('procBtn');
  if (!procBtn) return;
  procBtn.disabled = !(amt >= ZEC_MIN && amt <= zecBalance && addrVerified);
}

async function checkAddressBackend(addr, r) {
  try {
    const res  = await fetch('/api/wallet/zec/validate-address', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
      body:    JSON.stringify({ address: addr })
    });
    const data = await res.json();
    if (data.valid) {
      addrVerified     = true;
      lastVerifiedAddr = addr;
      showAddrOk(r);
    } else {
      addrVerified     = false;
      lastVerifiedAddr = '';
      showAddrErr(r, data.error || 'Invalid shielded address — not recognized on Zcash mainnet');
    }
  } catch (_) {
    addrVerified     = false;
    lastVerifiedAddr = '';
    showAddrErr(r, 'Could not verify address — check your connection');
  }
  checkProcBtn();
}

function calcFee(amountOnly) {
  const amt  = parseFloat(document.getElementById('amtIn')?.value) || 0;
  const dest = document.getElementById('destIn')?.value?.trim() || '';
  const r    = id => document.getElementById(id);

  if (r('amtErr'))      r('amtErr').textContent = '';
  if (r('platformFee')) r('platformFee').textContent = '—';
  if (r('remainAfter')) r('remainAfter').textContent = '—';
  if (r('rcv'))         r('rcv').textContent = '—';

  checkProcBtn();

  if (r('balRemain')) {
    if (amt <= 0) {
      r('balRemain').textContent = 'Balance: ' + fmtZec(zecBalance) + ' ZEC';
      r('balRemain').className   = 'bal-remain';
    } else {
      const left = zecBalance - amt;
      if (amt > zecBalance) {
        r('balRemain').textContent = 'Insufficient balance';
        r('balRemain').className   = 'bal-remain danger';
      } else if (left < 0.001) {
        r('balRemain').textContent = 'Remaining: ' + fmtZec(left) + ' ZEC';
        r('balRemain').className   = 'bal-remain warn';
      } else {
        r('balRemain').textContent = 'Remaining: ' + fmtZec(left) + ' ZEC';
        r('balRemain').className   = 'bal-remain';
      }
    }
  }

  if (amt > 0) {
    if (amt < ZEC_MIN) {
      if (r('amtErr')) r('amtErr').textContent = `Minimum withdrawal is ${ZEC_MIN} ZEC (~$1)`;
    } else if (amt > zecBalance) {
      if (r('amtErr')) r('amtErr').textContent = 'Amount exceeds available balance';
    } else {
      // FIXED: fees come OUT of the amount the user typed, not added on top
      // User types X → platform takes 3% of X, network takes 0.001, receiver gets the rest
      const platformFee = parseFloat((amt * ZEC_PLATFORM).toFixed(8));
      const receive     = parseFloat((amt - platformFee - ZEC_NET_FEE).toFixed(8));
      const remaining   = parseFloat((zecBalance - amt).toFixed(8));
      if (receive <= 0) {
        if (r('amtErr')) r('amtErr').textContent = 'Amount too small after fees';
      } else {
        if (r('platformFee')) r('platformFee').textContent = fmtZec(platformFee) + ' ZEC';
        if (r('remainAfter')) r('remainAfter').textContent = fmtZec(remaining) + ' ZEC';
        if (r('rcv'))         r('rcv').textContent = fmtZec(receive) + ' ZEC';
      }
    }
  }

  if (amountOnly) { checkProcBtn(); return; }

  if (!dest) {
    addrVerified = false;
    if (r('addrErr')) r('addrErr').textContent = '';
    checkProcBtn();
    return;
  }

  const lower = dest.toLowerCase();

  if (lower.startsWith('t1') || lower.startsWith('t3') ||
      lower.startsWith('zc') || lower.startsWith('0x')) {
    addrVerified     = false;
    lastVerifiedAddr = '';
    showAddrErr(r, '🚫 Only shielded Unified addresses accepted — use a u1… address');
    checkProcBtn();
    return;
  }

  if (lower.startsWith('u1')) {
    if (dest === lastVerifiedAddr && addrVerified) {
      checkProcBtn();
      return;
    }
    addrVerified = false;
    checkProcBtn();
    showAddrSpinner(r);
    if (addrCheckTimer) clearTimeout(addrCheckTimer);
    addrCheckTimer = setTimeout(() => checkAddressBackend(dest, r), 700);
    return;
  }

  addrVerified     = false;
  lastVerifiedAddr = '';
  showAddrErr(r, 'Address must start with u1 (Unified)');
  checkProcBtn();
}

function toW2() {
  const amt   = parseFloat(document.getElementById('amtIn')?.value) || 0;
  const dest  = document.getElementById('destIn')?.value?.trim() || '';
  const lower = dest.toLowerCase();
  const r     = id => document.getElementById(id);

  if (lower.startsWith('t1') || lower.startsWith('t3') ||
      lower.startsWith('zc') || lower.startsWith('0x')) {
    showToast('Transparent addresses not accepted.', 'error');
    return;
  }
  if (!dest) { showToast('Please enter a destination address.', 'error'); return; }
  if (r('procBtn')?.disabled) {
    showToast('Please enter a valid shielded ZEC address.', 'error');
    return;
  }

  const platformFee = parseFloat((amt * ZEC_PLATFORM).toFixed(8));
  const receive     = parseFloat((amt - platformFee - ZEC_NET_FEE).toFixed(8));

  LAST_WITHDRAW = amt;

  if (r('cAmt'))  r('cAmt').textContent  = fmtZec(amt) + ' ZEC';
  if (r('cDest')) r('cDest').textContent = dest.slice(0, 10) + '…' + dest.slice(-6);
  if (r('cFee'))  r('cFee').textContent  = fmtZec(platformFee) + ' ZEC';
  if (r('cRcv'))  r('cRcv').textContent  = fmtZec(receive) + ' ZEC';

  r('w1').style.display = 'none';
  r('w2').style.display = '';
}

function toW1() {
  document.getElementById('w2').style.display = 'none';
  document.getElementById('w1').style.display = '';
}

function doSend() {
  const dest  = document.getElementById('destIn')?.value?.trim() || '';
  const lower = dest.toLowerCase();
  if (lower.startsWith('u1')) { executeWithdraw(); return; }
  if (!tfaEnabled) { goToSettings(); return; }
  open2FA();
}


// ── Append pending tx to the top of the list ──────────────────────────────────

function prependPendingTx(amt, dest) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) + ' · ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  const newTx = {
    type:   'out',
    status: 'pending',
    amount: amt,
    token:  'ZEC',
    remark: `Withdrawal · ${dest.slice(0, 6)}…${dest.slice(-4)}`,
    date:   dateStr
  };

  ALL_TX.unshift(newTx);
  renderRecentTx();

  const txCountEl = document.getElementById('txCount');
  if (txCountEl) txCountEl.textContent = ALL_TX.length;
}


// ── Render only 4 most recent transactions ────────────────────────────────────

function renderRecentTx() {
  const container = document.getElementById('txContainer');
  if (!container) return;

  const recent = ALL_TX.slice(0, 4);

  if (!recent.length) {
    container.innerHTML = `<div class="no-tx">No transaction history</div>`;
    return;
  }

  container.innerHTML = recent.map(tx => {
    const isIn      = tx.type === 'in';
    const isPending = tx.status === 'pending';
    const isZec     = (tx.token || '').toUpperCase() === 'ZEC';
    const amtStr    = isZec ? fmtRewardZec(tx.amount) : tx.amount.toFixed(2);
    return `
      <div class="tx-row">
        ${txDot(tx)}
        <div class="tx-info">
          <div class="tx-desc">${tx.remark || 'Transaction'}</div>
          <div class="tx-time">${fmtLocalDate(tx.date)}</div>
        </div>
        <div class="tx-right">
          <div class="tx-amt ${txStatusClass(tx)}">
            ${isIn ? '+' : '−'}${amtStr} ${tx.token}
          </div>
        </div>
      </div>`;
  }).join('');
}


async function executeWithdraw() {
  const amt     = parseFloat(document.getElementById('amtIn')?.value) || 0;
  const dest    = document.getElementById('destIn')?.value?.trim() || '';
  const sendBtn = document.querySelector('#w2 .cta:not(.cta-ghost)');

  if (sendBtn) {
    sendBtn.disabled  = true;
    sendBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
           style="animation:zec-spin 0.8s linear infinite;flex-shrink:0">
        <circle cx="7" cy="7" r="5.5" stroke="white" stroke-width="1.5"
                stroke-dasharray="16 8" stroke-linecap="round"/>
      </svg>
      Submitting…`;
  }

  try {
    const res  = await fetch('/api/wallet/zec/withdraw', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
      body:    JSON.stringify({ address: dest, amount: amt })
    });
    const data = await res.json();

    if (!res.ok) {
      if (sendBtn) { sendBtn.disabled = false; sendBtn.innerHTML = 'Confirm & Send'; }
      showToast(data.error || 'Withdrawal failed', 'error');
      return;
    }

    zecBalance = parseFloat((zecBalance - amt).toFixed(8));
    setBalanceDisplay(zecBalance);
    prependPendingTx(amt, dest);

    document.getElementById('w2').style.display = 'none';
    document.getElementById('w3').style.display = '';

  } catch (_) {
    if (sendBtn) { sendBtn.disabled = false; sendBtn.innerHTML = 'Confirm & Send'; }
    showToast('Network error — withdrawal not sent', 'error');
  }
}

function open2FA() {
  const blocked = document.getElementById('tfaBlocked');
  const verify  = document.getElementById('tfaVerify');
  if (blocked) blocked.style.display = tfaEnabled ? 'none' : '';
  if (verify)  verify.style.display  = tfaEnabled ? '' : 'none';
  for (let i = 0; i < 6; i++) {
    const c = document.getElementById('otp' + i);
    if (c) { c.value = ''; c.classList.remove('err', 'ok'); }
  }
  setupOTPInputs();
  const errEl = document.getElementById('otpErr');
  if (errEl) errEl.textContent = '';
  document.getElementById('tfaOv').classList.add('open');
  if (tfaEnabled) setTimeout(() => document.getElementById('otp0')?.focus(), 350);
}

function closeTFA() { document.getElementById('tfaOv').classList.remove('open'); }

function goToSettings() {
  closeTFA(); closeW();
  let path = window.location.pathname + window.location.search;
  if (path.includes('/settings')) path = '/';
  sessionStorage.setItem('accountBackRoute', path);
  const toast = document.createElement('div');
  toast.className   = 'toast pending';
  toast.textContent = 'Redirecting to Settings › Security…';
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(-50%) translateY(6px)';
    setTimeout(() => { window.location.href = '/settings/security'; }, 300);
  }, 1800);
}

function setupOTPInputs() {
  const inputs = Array.from({ length: 6 }, (_, i) => document.getElementById('otp' + i));

  function distributeFrom(startIndex, value) {
    const digits = value.replace(/\D/g, '').slice(0, 6).split('');
    for (let i = 0; i < digits.length; i++) {
      const target = inputs[startIndex + i];
      if (target) { target.value = digits[i]; target.classList.remove('err'); }
    }
    inputs[Math.min(startIndex + digits.length, inputs.length - 1)]?.focus();
    checkFull();
  }

  inputs.forEach((input, idx) => {
    if (!input || input._r) return;
    input._r = true;
    input.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 1) { distributeFrom(idx, v); return; }
      input.value = v ? v[0] : '';
      input.classList.remove('err');
      if (v && idx < inputs.length - 1) inputs[idx + 1].focus();
      checkFull();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && idx > 0) inputs[idx - 1].focus();
    });
    input.addEventListener('paste', e => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      if (paste) distributeFrom(idx, paste);
    });
  });
}

function checkFull() {
  const code = Array.from({ length: 6 }, (_, i) => document.getElementById('otp' + i)?.value || '').join('');
  if (code.length === 6) autoVerify(code);
}

async function autoVerify(code) {
  try {
    const res  = await fetch('/api/verify-totp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
      body:    JSON.stringify({ code })
    });
    const data = await res.json();
    if (!res.ok) { handleOTPError(data.error); return; }
    handleOTPSuccess();
  } catch (_) { handleOTPError('network'); }
}

function handleOTPSuccess() {
  for (let i = 0; i < 6; i++) document.getElementById('otp' + i)?.classList.add('ok');
  setTimeout(() => {
    closeTFA();
    zecBalance = parseFloat((zecBalance - LAST_WITHDRAW).toFixed(8));
    setBalanceDisplay(zecBalance);
    const hb   = document.getElementById('txHashBox');
    const hash = 'zec_' + Array.from({ length: 60 }, () => '0123456789abcdef'[Math.random() * 16 | 0]).join('');
    if (hb) hb.textContent = 'Tx: ' + hash.slice(0, 18) + '…' + hash.slice(-6);
    document.getElementById('w2').style.display = 'none';
    document.getElementById('w3').style.display = '';
  }, 500);
}

function handleOTPError(type) {
  const errEl = document.getElementById('otpErr');
  if (type === 'no_2fa' || type === 'not_enabled') { goToSettings(); return; }
  const msg = type === 'invalid' ? 'Incorrect code — try again.' : 'Something went wrong';
  if (errEl) errEl.textContent = msg;
  for (let i = 0; i < 6; i++) {
    const c = document.getElementById('otp' + i);
    if (c) { c.classList.add('err'); c.classList.remove('ok'); }
  }
  setTimeout(() => {
    for (let i = 0; i < 6; i++) {
      const c = document.getElementById('otp' + i);
      if (c) { c.value = ''; c.classList.remove('err'); }
    }
    if (errEl) errEl.textContent = '';
    document.getElementById('otp0')?.focus();
  }, 900);
}

let ALL_TX = [];

function txDot(tx) {
  const cls = txStatusClass(tx);  

  if (cls === 'pend') {
    return `
      <div class="tx-dot pend">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#f5a623" stroke-width="1.8"/>
          <path d="M12 7v5l3 3" stroke="#f5a623" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>`;
  }

  if (cls === 'out') {
    return `
      <div class="tx-dot out">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M7 7l10 10M17 7L7 17" stroke="#f05070" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>`;
  }

  const isIncoming = tx.type === 'in';
  const arrowPath = isIncoming
    ? 'M12 19V5M5 12l7 7 7-7'    
    : 'M12 5v14M19 12l-7-7-7 7'; 

  return `
    <div class="tx-dot in">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="${arrowPath}" stroke="#12d87a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`;
}

async function loadTransactions() {
  const container = document.getElementById('txContainer');
  if (!container) return;
  try {
    const res = await fetch('/api/user/transactions');
    const txs = await res.json();
    ALL_TX = txs;

    if (!txs.length) {
      container.innerHTML = `<div class="no-tx">No transaction history</div>`;
      return;
    }

    renderRecentTx();
    updateStats(txs);

  } catch (_) {
    if (container) container.innerHTML = 'Failed to load transactions';
  }
}

function updateStats(txs) {
  const txCountEl = document.getElementById('txCount');
  if (txCountEl) txCountEl.textContent = txs.length;
}

function openAll() {
  const content = document.getElementById('txContent');
  if (!ALL_TX.length) {
    content.innerHTML = `<div class="s-title">All Transactions</div><div class="no-tx">No transaction history</div>`;
    document.getElementById('txOv').classList.add('open');
    return;
  }
  content.innerHTML = `
    <div class="s-title">All Transactions</div>
    <div class="s-sub" style="margin-bottom:14px">Complete history</div>
    ${ALL_TX.map((tx, i) => {
      const isIn      = tx.type === 'in';
      const isPending = tx.status === 'pending';
      const isZec     = (tx.token || '').toUpperCase() === 'ZEC';
      const amtStr    = isZec ? fmtRewardZec(tx.amount) : tx.amount.toFixed(2);
      return `
        <div class="stx" onclick="openTxFromAPI(${i})">
          ${txDot(tx)}
          <div class="tx-info">
            <div class="tx-desc">${tx.remark || 'Transaction'}</div>
            <div class="tx-time">${fmtLocalDate(tx.date)}</div>
          </div>
          <div class="tx-right">
            <div class="tx-amt ${txStatusClass(tx)}">
              ${isIn ? '+' : '−'}${amtStr} ${tx.token}
            </div>
            <div class="tx-usd">≈ $${(tx.amount * ZEC_PRICE_USD).toFixed(2)} USD</div>
          </div>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="1.4"/>
          </svg>
        </div>`;
    }).join('')}`;
  document.getElementById('txOv').classList.add('open');
}

function openTxFromAPI(i) {
  const tx     = ALL_TX[i];
  if (!tx) return;
  const isIn   = tx.type === 'in';
  const isZec  = (tx.token || '').toUpperCase() === 'ZEC';
  const amtStr = isZec ? fmtRewardZec(tx.amount) : tx.amount.toFixed(2);

  let color;
  if (tx.status === 'confirmed' || tx.status === 'paid') {
    color = isIn ? 'var(--green)' : 'var(--green)';
  } else if (tx.status === 'failed') {
    color = 'var(--red)';
  } else {
    color = 'var(--amber)'; // pending
  }

  const sign   = isIn ? '+' : '−';
  const usdVal = (tx.amount * ZEC_PRICE_USD).toFixed(2);

  const hashRow = tx.tx_hash
    ? `<div class="dr"><span class="dk">Tx Hash</span><span class="dv" style="font-family:var(--mono);font-size:.7rem">${tx.tx_hash.slice(0, 14)}…${tx.tx_hash.slice(-8)}</span></div>`
    : '';

  document.getElementById('txContent').innerHTML = `
    <div class="sbadge ${tx.status === 'failed' ? 'out' : (tx.status === 'confirmed' || tx.status === 'paid') ? 'in' : 'pend'}">${tx.status}</div>
    <div class="d-amt" style="color:${color}">${sign}${amtStr} ${tx.token}</div>
    <div class="d-usd">≈ $${usdVal} USD</div>
    <div class="dg">
      <div class="dr"><span class="dk">Description</span><span class="dv">${tx.remark || 'Transaction'}</span></div>
      <div class="dr"><span class="dk">Date</span><span class="dv">${fmtLocalDate(tx.date)}</span></div>
      <div class="dr"><span class="dk">Status</span><span class="dv">${tx.status}</span></div>
      ${hashRow}
      <div class="dr"><span class="dk">Network</span><span class="dv">Zcash Mainnet</span></div>
    </div>`;
  document.getElementById('txOv').classList.add('open');
}

function showToast(msg, type) {
  if (window.showToast && window.showToast !== showToast) { window.showToast(msg, type); return; }
  const t = document.createElement('div');
  t.className   = 'toast ' + (type || '');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity   = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity   = '0';
    t.style.transform = 'translateX(-50%) translateY(6px)';
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

(function injectSpinCSS() {
  if (document.getElementById('zec-spin-style')) return;
  const s = document.createElement('style');
  s.id = 'zec-spin-style';
  s.textContent = '@keyframes zec-spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(s);
})();

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['wOv', 'txOv'].forEach(id => document.getElementById(id)?.classList.remove('open'));
    closeTFA();
  }
});

setupOTPInputs();

Object.assign(window, {
  doCopy, bgClose, openWithdraw, revealID, setMax, calcFee,
  toW2, toW1, doSend, closeW, closeTFA, goToSettings, openAll, openTxFromAPI,
});

window.ReviewModule = { init: loadTransactions };

})();