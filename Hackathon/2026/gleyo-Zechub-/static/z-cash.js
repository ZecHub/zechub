(function () {

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let _qrLibLoaded = false;

const SESSION_ENDPOINT = '/api/zec/session';
const POLL_ENDPOINT = '/api/zec/poll';

const WALLETS = [
  {
    key: 'ZODL',
    name: 'ZODL',
    desc: 'iOS & Android',
    tag: 'RECOMMENDED',
    bg: '#0d0d1a',
    icon: `<img src="https://play-lh.googleusercontent.com/0tPoGDUdDKVQ-T4bpx9vo4X72827KtZySJdVmbbyaGu6CMG9v_7RgRTocvPHJAxdGuH3tLB07RPEd5eVUkUR=w480-h960" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:0">`
  },
  {
    key: 'zkool',
    name: 'Zkool',
    tag: null,
    desc: 'Multi-account privacy wallet',
    bg: '#1a0e00',
    icon: `<img src="https://xpcqiovfesvllsljxhac.supabase.co/storage/v1/object/public/uploads/zkool.png" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:0">`
  },
  {
    key: 'zingo',
    name: 'Zingo!',
    desc: 'Open-source · iOS & Android',
    tag: null,
    bg: '#0a0a0a',
    icon: `<img src="https://global.discourse-cdn.com/zcash/original/3X/6/6/66c4ea553cb3b8347d8b4781a2ab0bd657f0fa6e.png" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:0">`
  }
];

function buildZecUri(addr, memoBase64) {
  return `zcash:${addr}?amount=0.00001&memo=${memoBase64}`;
}

let _currentSessionId = null;
let _statusClearTimer = null;
let _countdownTimer = null;
let _checkCycleInterval = null;
let _checkPhaseEndTime = null;
let _activeSessionId = null;
let _userAddress = null;
let _activeWallet = null;

const CHECK_ACTIVE = 10;
const CHECK_COOLDOWN = 30;


function loadQRLib() {
  return new Promise((resolve, reject) => {
    if (_qrLibLoaded || window.QRCodeStyling) {
      _qrLibLoaded = true;
      return resolve();
    }
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/qr-code-styling/lib/qr-code-styling.js';
    s.onload = () => { _qrLibLoaded = true; resolve(); };
    s.onerror = () => reject(new Error('Failed to load QR library'));
    document.head.appendChild(s);
  });
}

function inject() {
  if (document.getElementById('zec-modal-overlay')) return;

  const CSS = `
  #zec-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,.65);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: none;
    align-items: flex-end;
    justify-content: center;
  }
  #zec-modal-overlay.zec-open {
    display: flex;
  }
  @media (min-width: 600px) {
    #zec-modal-overlay {
      align-items: center;
    }
  }
  #zec-sheet {
    background: #08080e;
    border: 0.9px solid #2f2f4aec;
    width: 100%;
    max-width: 440px;
    border-radius: 22px 22px 0 0;
    max-height: 88dvh;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
    transform: translateY(100%);
    transition: transform .38s cubic-bezier(.32,.72,0,1);
    scrollbar-width: none;
  }
  #zec-sheet::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 600px) {
    #zec-sheet {
      border-radius: 22px;
      height: auto;
      max-height: 84vh;
      overflow-y: auto;
      transform: none;
      animation: zecFadeIn .22s ease;
    }
  }
  @keyframes zecFadeIn {
    from { opacity: 0; transform: scale(.97); }
    to { opacity: 1; transform: scale(1); }
  }
  #zec-modal-overlay.zec-open #zec-sheet {
    transform: translateY(0);
  }
  .zec-handle {
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,.1);
    margin: 14px auto 0;
    flex-shrink: 0;
  }
  @media (min-width: 600px) {
    .zec-handle { display: none; }
  }
  .zec-head {
    padding: 18px 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .zec-head h2 {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -.01em;
    color: #eeeef5;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-close {
    width: 28px;
    height: 28px;
    padding: 0;
    flex: none;
    border-radius: 50%;
    border: 0.9px solid #2f2f4a;
    background: #2a2a449c;
    color: #8888aa;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .15s, color .15s;
    appearance: none;
    -webkit-appearance: none;
  }
  .zec-close:hover {
    background: #222230;
    color: #eeeef5;
  }
  .zec-sub {
    padding: 3px 20px 14px;
    font-size: 12px;
    color: #5a5a78;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-err {
    margin: 0 14px 10px;
    background: rgba(239,68,68,.1);
    border: 1px solid rgba(239,68,68,.2);
    border-radius: 9px;
    padding: 9px 12px;
    font-size: 12px;
    color: #fca5a5;
    display: none;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-err.zec-err-show { display: block; }
  .zec-view { display: none; }
  .zec-view.zec-active { display: block; }
  .zec-flex-view { display: none; }
  .zec-flex-view.zec-active {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .zec-list {
    padding: 0 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .zec-item {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background .12s, border-color .12s, transform .1s;
  }
  .zec-item:hover {
    background: #2a2a449c;
    border-color: #2f2f4a;
  }
  .zec-item:active { transform: scale(.98); }
  .zec-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    flex-shrink: 0;
    overflow: hidden;
    border: 1px solid #2f2f4a;
    padding: 0;
  }
  .zec-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0;
  }
  .zec-info { flex: 1; }
  .zec-name {
    font-size: 13px;
    font-weight: 600;
    color: #eeeef5;
    margin-bottom: 2px;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .zec-desc {
    font-size: 11.5px;
    color: #8888aa;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-tag {
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
    background: rgba(244,183,40,.15);
    color: #f4b728;
    border: 1px solid rgba(244,183,40,.25);
    letter-spacing: .03em;
  }
  .zec-arrow {
    color: #5a5a78;
    font-size: 16px;
    flex-shrink: 0;
  }
  .zec-addr-wrap { padding: 0 14px 14px; }
  .zec-addr-label {
    font-size: 11px;
    font-weight: 600;
    color: #5a5a78;
    text-transform: uppercase;
    letter-spacing: .06em;
    display: block;
    margin-bottom: 7px;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-addr-input {
    width: 100%;
    box-sizing: border-box;
    background: #111122;
    border: 1px solid #2f2f4a;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 11.5px;
    font-family: 'Courier New', monospace;
    color: #eeeef5;
    outline: none;
    transition: border-color .15s;
  }
  .zec-addr-input:focus { border-color: rgba(244,183,40,.5); }
  .zec-addr-input::placeholder {
    color: #5a5a78;
    font-family: 'DM Sans', sans-serif;
    font-size: 11.5px;
  }
  .zec-addr-err {
    font-size: 11px;
    color: #fca5a5;
    margin-top: 5px;
    min-height: 14px;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-addr-ok {
    font-size: 11px;
    color: #2ecc71;
    margin-top: 5px;
    min-height: 14px;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-note {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    margin: 0 14px 18px;
    padding: 10px 12px;
    background: rgba(244,183,40,.05);
    border: 1px solid rgba(244,183,40,.15);
    border-radius: 10px;
    font-size: 11.5px;
    color: #8888aa;
    line-height: 1.55;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-note svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: #c89a20;
  }
  .zec-conn-wrap {
    position: relative;
    width: 88px;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
  }
  @keyframes zring { to { transform: rotate(360deg); } }
  .zec-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #F4B728;
    border-right-color: rgba(244,183,40,.3);
    animation: zring 1.1s linear infinite;
  }
  .zec-ring::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #F4B728;
  }
  .zec-ring-outer {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1.5px solid transparent;
    border-top-color: rgba(244,183,40,.18);
    border-left-color: rgba(244,183,40,.28);
    animation: zring 1.9s linear infinite reverse;
  }
  .zec-logo-bg {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    border: 1px solid #2f2f4aec;
    overflow: hidden;
    z-index: 1;
    position: relative;
    padding: 0;
  }
  .zec-logo-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0;
  }
  .zec-conn-name {
    font-size: 15px;
    font-weight: 700;
    color: #eeeef5;
    margin-bottom: 6px;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-conn-status {
    font-size: 12px;
    color: #8888aa;
    max-width: 240px;
    line-height: 1.6;
    margin-bottom: 18px;
    font-family: 'DM Sans', sans-serif;
    text-align: center;
  }
  .zec-cancel {
    font-size: 12px;
    color: #5a5a78;
    cursor: pointer;
    text-decoration: underline;
    font-family: 'DM Sans', sans-serif;
    background: none;
    border: none;
    padding: 0;
  }
  .zec-cancel:hover { color: #8888aa; }
  .zec-deeplink-btn {
    display: none;
    width: calc(100% - 40px);
    margin: 0 20px 12px;
    padding: 13px;
    border-radius: 13px;
    border: none;
    background: linear-gradient(135deg, #F4B728, #c9890a);
    color: #0a0500;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: opacity .2s;
  }
  .zec-deeplink-btn:hover { opacity: .88; }
  .zec-check-btn {
    display: block;
    width: calc(100% - 40px);
    margin: 0 20px 8px;
    padding: 13px;
    border-radius: 13px;
    border: 1px solid rgba(46,204,113,.32);
    background: rgba(46,204,113,.13);
    color: #2ecc71;
    font-size: 13.5px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .1s;
  }
  .zec-check-btn:hover:not(:disabled) {
    background: rgba(46,204,113,.2);
    border-color: rgba(46,204,113,.45);
    transform: translateY(-1px);
  }
  .zec-check-btn:active:not(:disabled) { transform: scale(.98); }
  .zec-check-btn:disabled {
    background: rgba(255,255,255,.04);
    border-color: rgba(255,255,255,.07);
    color: rgba(255,255,255,.22);
    cursor: not-allowed;
  }
  .zec-check-hint {
    text-align: center;
    font-size: 11px;
    color: rgba(255,255,255,.28);
    margin: 0 20px 10px;
    min-height: 16px;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-check-status {
    text-align: center;
    font-size: 12px;
    margin: 0 20px 14px;
    min-height: 18px;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-check-status.is-checking { color: #F4B728; }
  .zec-check-status.is-error { color: #fca5a5; }
  .zec-check-status.is-idle { color: #8888aa; }
  .zec-done-wrap {
    padding: 48px 24px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    text-align: center;
  }
  .zec-done-icon { font-size: 44px; }
  .zec-done-title {
    font-size: 16px;
    font-weight: 700;
    color: #22c55e;
    font-family: 'DM Sans', sans-serif;
  }
  .zec-done-sub {
    font-size: 12px;
    color: #8888aa;
    font-family: 'DM Sans', sans-serif;
  }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'zec-modal-overlay';
  overlay.innerHTML = `
<div id="zec-sheet">
  <div class="zec-handle"></div>

  <!-- LIST VIEW -->
  <div id="zec-view-list" class="zec-view zec-active">
    <div class="zec-err" id="zec-err-bar"></div>
    <div class="zec-head">
      <h2>Connect ZEC Wallet</h2>
      <button class="zec-close" id="zec-close-btn">&#215;</button>
    </div>
    <div class="zec-sub">Native Zcash · shielded privacy</div>

    <div class="zec-addr-wrap">
      <label class="zec-addr-label">Your Shielded Zcash Address</label>
      <input
        class="zec-addr-input"
        id="zec-user-address"
        type="text"
        placeholder="u1..."
        autocomplete="off"
        spellcheck="false"
      />
      <div class="zec-addr-err" id="zec-addr-err"></div>
      <div class="zec-addr-ok" id="zec-addr-ok"></div>
    </div>

    <div class="zec-list" id="zec-wallet-list"></div>
    <div class="zec-note">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.1"/><path d="M6 4v3M6 7.5v.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
      Paste your wallet address above, pick your wallet, then send 0.00001 ZEC with the memo code shown. Expires in 15 min.
    </div>
  </div>

  <!-- CONNECTING VIEW -->
  <div id="zec-view-connecting" class="zec-flex-view" style="padding:44px 24px 36px;gap:0;text-align:center">
    <div class="zec-conn-wrap">
      <div class="zec-ring-outer"></div>
      <div class="zec-ring"></div>
      <div class="zec-logo-bg" id="zec-logo-bg"></div>
    </div>
    <div class="zec-conn-name" id="zec-conn-name">Zkool</div>
    <div class="zec-conn-status" id="zec-conn-status">Validating address…</div>
    <button class="zec-cancel" id="zec-cancel-btn">Cancel</button>
  </div>

  <!-- PAYMENT VIEW -->
  <div id="zec-view-pay" class="zec-view" style="padding-top:20px;padding-bottom:8px">
    <div class="zec-head" style="margin-bottom:14px">
      <h2 id="zec-pay-title">Send with Zkool</h2>
      <button class="zec-close" id="zec-pay-close-btn">&#215;</button>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;padding:0 20px 4px">
      <p style="font-size:12px;color:#5a5a78;margin:0 0 10px;align-self:flex-start">
        Scan QR code with your Zcash wallet
      </p>
      <div style="background:#fff;border-radius:14px;padding:10px;border:1px solid #2f2f4a;line-height:0;display:inline-block">
        <div id="zec-qr-container" style="width:200px;height:200px;display:block"></div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11.5px;color:#5a5a78">
        <span>Expires in</span>
        <span id="zec-pay-expires" style="font-weight:600;color:#F4B728;font-variant-numeric:tabular-nums">15:00</span>
      </div>
    </div>

    <div style="margin:12px 20px;background:#111122;border:1px solid #2f2f4a;border-radius:12px;padding:11px 14px">
      <div style="font-size:10px;color:#5a5a78;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;font-family:'DM Sans',sans-serif">Memo code</div>
      <div id="zec-memo-display" style="font-family:'Courier New',monospace;font-size:15px;font-weight:700;color:#F4B728;letter-spacing:.1em"></div>
      <div style="font-size:10.5px;color:#5a5a78;margin-top:3px;font-family:'DM Sans',sans-serif">Paste this exactly into your wallet memo field</div>
    </div>

    <div style="display:flex;align-items:center;gap:10px;margin:0 20px 12px">
      <div style="flex:1;height:1px;background:#2f2f4a"></div>
      <span style="font-size:11px;color:#5a5a78;letter-spacing:.08em">OR</span>
      <div style="flex:1;height:1px;background:#2f2f4a"></div>
    </div>

    <button class="zec-deeplink-btn" id="zec-deeplink-btn"></button>

    <div class="zec-check-status is-idle" id="zec-check-status">After sending, click below to verify.</div>
    <button class="zec-check-btn" id="zec-check-paid-btn">I've Paid — Verify</button>
    <div class="zec-check-hint" id="zec-check-hint"></div>

    <div style="text-align:center;padding:10px 0 24px">
      <button class="zec-cancel" id="zec-pay-cancel-btn">Cancel</button>
    </div>
  </div>

  <!-- DONE VIEW -->
  <div id="zec-view-done" class="zec-view">
    <div class="zec-done-wrap">
      <div class="zec-done-icon">⚡</div>
      <div class="zec-done-title">Wallet Connected!</div>
      <div class="zec-done-sub" id="zec-done-sub">Wallet verified and connected.</div>
    </div>
  </div>

</div>`;

  document.body.appendChild(overlay);
  buildList();
  bindEvents();
}

function buildList() {
  const container = document.getElementById('zec-wallet-list');
  container.innerHTML = '';
  WALLETS.forEach(w => {
    const item = document.createElement('div');
    item.className = 'zec-item';
    item.setAttribute('data-wallet', w.key);
    const tagHtml = w.tag ? `<span class="zec-tag">${w.tag}</span>` : '';
    item.innerHTML = `
      <div class="zec-icon" style="background:${w.bg}">${w.icon}</div>
      <div class="zec-info">
        <div class="zec-name">${w.name}${tagHtml}</div>
        <div class="zec-desc">${w.desc}</div>
      </div>
      <span class="zec-arrow">›</span>`;
    item.addEventListener('click', () => startAuth(w));
    container.appendChild(item);
  });
}

function setCheckStatus(msg, type) {
  const el = document.getElementById('zec-check-status');
  if (!el) return;
  el.textContent = msg;
  el.className = `zec-check-status is-${type}`;
}

function bindEvents() {
  document.getElementById('zec-close-btn').addEventListener('click', closeZecModal);
  document.getElementById('zec-cancel-btn').addEventListener('click', closeZecModal);
  document.getElementById('zec-pay-close-btn').addEventListener('click', closeZecModal);
  document.getElementById('zec-pay-cancel-btn').addEventListener('click', closeZecModal);
  document.getElementById('zec-modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeZecModal();
  });

  let _addrDebounce = null;
  document.addEventListener('input', (e) => {
    if (e.target.id !== 'zec-user-address') return;
    clearTimeout(_addrDebounce);
    const errEl = document.getElementById('zec-addr-err');
    const okEl = document.getElementById('zec-addr-ok');
    const val = e.target.value.trim();

    if (!val) { errEl.textContent = ''; okEl.textContent = ''; return; }

    if (!val.startsWith('u1')) {
      errEl.textContent = 'Must start with u1 (Unified)';
      okEl.textContent = '';
      return;
    }

    errEl.textContent = '';
    okEl.textContent = '';

    _addrDebounce = setTimeout(async () => {
      try {
        const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        const res = await fetch('/api/wallet/zec/validate-address', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf },
          body: JSON.stringify({ address: val })
        });
        const data = await res.json();
        if (data.valid) {
          okEl.textContent = '✓ Valid shielded address';
          errEl.textContent = '';
        } else {
          errEl.textContent = data.error || 'Invalid address';
          okEl.textContent = '';
        }
      } catch (_) {}
    }, 500);
  });

  const sheet = document.getElementById('zec-sheet');
  let startY = 0, currentY = 0, isDragging = false;
  sheet.addEventListener('touchstart', e => {
    if (!e.target.closest('.zec-handle,.zec-head')) return;
    startY = e.touches[0].clientY; isDragging = true; sheet.style.transition = 'none';
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    let d = currentY - startY; if (d < 0) d = 0;
    e.preventDefault(); sheet.style.transform = `translateY(${d}px)`;
  }, { passive: false });
  sheet.addEventListener('touchend', () => {
    if (!isDragging) return; isDragging = false;
    sheet.style.transition = 'transform .38s cubic-bezier(.32,.72,0,1)';
    if (currentY - startY > 110) { closeZecModal(); sheet.style.transform = ''; }
    else sheet.style.transform = 'translateY(0)';
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZecModal(); });
}


// ── Check cycle ──────────────────────────────────────

function startCheckCycle(sessionId) {
  _activeSessionId = sessionId;
  clearInterval(_checkCycleInterval);
  _enterCheckActive();
}

function _enterCheckActive() {
  const btn = document.getElementById('zec-check-paid-btn');
  const hint = document.getElementById('zec-check-hint');
  if (!btn) return;

  // Clear any existing interval FIRST — prevents overlapping intervals
  clearInterval(_checkCycleInterval);
  _checkCycleInterval = null;

  btn.disabled = false;
  btn.textContent = "I've Paid — Verify";
  _checkPhaseEndTime = Date.now() + CHECK_ACTIVE * 1000;

  _checkCycleInterval = setInterval(() => {
    const remaining = Math.ceil((_checkPhaseEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      _enterCheckCooldown();
      return;
    }
    if (hint) hint.textContent = `Click within ${remaining}s`;
  }, 250);
}

function _enterCheckCooldown() {
  const btn = document.getElementById('zec-check-paid-btn');
  const hint = document.getElementById('zec-check-hint');
  if (!btn) return;

  // Clear any existing interval FIRST — prevents overlapping intervals
  clearInterval(_checkCycleInterval);
  _checkCycleInterval = null;

  btn.disabled = true;
  _checkPhaseEndTime = Date.now() + CHECK_COOLDOWN * 1000;

  _checkCycleInterval = setInterval(() => {
    const remaining = Math.ceil((_checkPhaseEndTime - Date.now()) / 1000);
    if (remaining <= 0) {
      _enterCheckActive();
      return;
    }
    btn.textContent = `Available in ${remaining}s`;
    if (hint) hint.textContent = '';
  }, 250);
}

function stopCheckCycle() {
  clearInterval(_checkCycleInterval);
  _checkCycleInterval = null;
}


// ── Auth flow ────────────────────────────────────────

async function startAuth(w) {
  _activeWallet = w;
  const addrInput = document.getElementById('zec-user-address');
  const addrErr = document.getElementById('zec-addr-err');
  const userAddress = addrInput ? addrInput.value.trim() : '';

  if (!userAddress) {
    if (addrErr) addrErr.textContent = 'Please enter your shielded Zcash address first.';
    addrInput && addrInput.focus();
    return;
  }

  if (!userAddress.startsWith('u1')) {
    if (addrErr) addrErr.textContent = 'Must start with u1 (Unified)';
    addrInput && addrInput.focus();
    return;
  }

  document.getElementById('zec-logo-bg').innerHTML = w.icon;
  document.getElementById('zec-logo-bg').style.background = w.bg;
  document.getElementById('zec-conn-name').textContent = w.name;
  document.getElementById('zec-conn-status').textContent = 'Validating address…';
  showView('zec-view-connecting');

  try {
    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const validateRes = await fetch('/api/wallet/zec/validate-address', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf },
      body: JSON.stringify({ address: userAddress })
    });
    const validateData = await validateRes.json();

    if (!validateData.valid) {
      showView('zec-view-list');
      if (addrErr) addrErr.textContent = validateData.error || 'Invalid address';
      return;
    }

    document.getElementById('zec-conn-status').textContent = 'Creating session…';

    const [res] = await Promise.all([
      fetch(SESSION_ENDPOINT, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf },
        body: JSON.stringify({ wallet: w.key, address: userAddress })
      }),
      loadQRLib()
    ]);

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create session');

    _userAddress = userAddress;
    _currentSessionId = data.session_id;
    showPayView(data, w);
    startCountdown(data.expires_in || 900);
    startCheckCycle(data.session_id);

  } catch (err) {
    showView('zec-view-list');
    showErr(err.message || 'Could not start session. Try again.');
  }
}

function showPayView(data, w) {
  document.getElementById('zec-pay-title').textContent = `Send with ${w.name}`;

  const addr = data.address;
  const code = data.code;
  const memoBase64 = btoa(code).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const zecUri = buildZecUri(addr, memoBase64);

  const memoDisplay = document.getElementById('zec-memo-display');
  if (memoDisplay) memoDisplay.textContent = code;

  const qrContainer = document.getElementById('zec-qr-container');
  qrContainer.innerHTML = '';

  const qr = new QRCodeStyling({
    width: 200,
    height: 200,
    type: "svg",
    data: zecUri,
    image: _walletImg(w),
    qrOptions: { errorCorrectionLevel: "H" },
    dotsOptions: { color: "#000000", type: "rounded" },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { type: "extra-rounded" },
    cornersDotOptions: { type: "square" },
    imageOptions: { crossOrigin: "anonymous", margin: 10, imageSize: 0.14 }
  });
  qr.append(qrContainer);

  const dlBtn = document.getElementById('zec-deeplink-btn');
  dlBtn.innerHTML = `<span>Open in ${w.name}</span>`;
  dlBtn.style.display = 'flex';
  dlBtn.style.alignItems = 'center';
  dlBtn.style.justifyContent = 'center';
  dlBtn.style.gap = '8px';
  dlBtn.onclick = () => { window.location.href = zecUri; };

  setCheckStatus('After sending, click below to verify.', 'idle');

  const checkBtn = document.getElementById('zec-check-paid-btn');

  checkBtn.onclick = async () => {
    if (checkBtn.disabled || !_activeSessionId) return;

    clearTimeout(_statusClearTimer);
    setCheckStatus('Syncing wallet and checking…', 'checking');
    checkBtn.disabled = true;

    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    try {
      const res = await fetch(`${POLL_ENDPOINT}/${_activeSessionId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRFToken': csrf }
      });
      const result = await res.json();

      if (result.status === 'confirmed') {
        stopCheckCycle();
        clearInterval(_countdownTimer);
        onConfirmed();
      } else if (result.status === 'expired') {
        stopCheckCycle();
        clearInterval(_countdownTimer);
        showView('zec-view-list');
        showErr('Session expired. Please try again.');
      } else {
        const msg = result.error || 'Payment not detected yet. Try again shortly.';
        setCheckStatus(msg, 'error');
        _statusClearTimer = setTimeout(() => setCheckStatus('After sending, click below to verify.', 'idle'), 8000);
        _enterCheckCooldown();
      }
    } catch (err) {
      console.error('Check error:', err);
      setCheckStatus('Error checking payment.', 'error');
      _statusClearTimer = setTimeout(() => setCheckStatus('After sending, click below to verify.', 'idle'), 8000);
      _enterCheckCooldown();
    }
  };

  showView('zec-view-pay');

  const sheet = document.getElementById('zec-sheet');
  if (sheet) sheet.scrollTop = 0;
}

function _walletImg(w) {
  const m = w.icon.match(/src="([^"]+)"/);
  return m ? m[1] : '';
}


// ── Countdown ────────────────────────────────────────

function startCountdown(seconds) {
  clearInterval(_countdownTimer);
  let remaining = seconds;
  const el = document.getElementById('zec-pay-expires');
  function tick() {
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    if (el) el.textContent = `${m}:${s}`;
    if (remaining <= 0) {
      clearInterval(_countdownTimer);
      if (el) el.textContent = 'Expired';
      stopCheckCycle();
      setCheckStatus('Session expired.', 'error');
    }
    remaining--;
  }
  tick();
  _countdownTimer = setInterval(tick, 1000);
}


// ── Confirmed — update UI in place ───────────────────

function onConfirmed() {
  const address = _userAddress;
  const walletName = _activeWallet ? _activeWallet.name : '';

  // Show done view briefly, then update the page UI
  document.getElementById('zec-done-sub').textContent = 'Wallet verified and connected.';
  showView('zec-view-done');

  setTimeout(() => {
    closeZecModal();

    // Flip card states
    const stateNc = document.getElementById('zec-state-nc');
    const stateC  = document.getElementById('zec-state-c');
    if (stateNc) stateNc.classList.remove('active');
    if (stateC)  stateC.classList.add('active');

    // Populate connected card fields
    const walletLbl = document.getElementById('zec-wallet-lbl');
    if (walletLbl) walletLbl.textContent = walletName || '—';

    const addrEl = document.getElementById('zec-addr');
    if (addrEl && address) {
      addrEl.textContent = `${address.slice(0, 8)}…${address.slice(-6)}`;
    }

    const sigStatus = document.getElementById('zec-sig-status');
    if (sigStatus) {
      sigStatus.style.color = 'var(--green)';
      sigStatus.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="-5 -10 110 135" fill="currentColor" stroke="currentColor" style="position:relative;top:2px">
          <path d="m85.652 6.5938c-15.199 4.6992-33.309 28.609-50.668 53.164-7.3672-12.414-15.172-16.559-23.242-12.312-0.99609 0.52344-1.6523 1.5273-1.7344 2.6562-0.082031 1.1406 0.42969 2.2422 1.3555 2.918 5.8516 4.2734 11.922 11.848 19.141 23.84v-0.003906c1.2891 2.1758 3.6328 3.5039 6.1562 3.4883h0.11719c2.6016-0.023438 4.9844-1.4453 6.2461-3.7188 7.0234-12.734 14.738-25.07 23.109-36.957 6.8594-9.75 14.508-18.926 22.867-27.43 1.125-1.1016 1.332-2.8359 0.5-4.1719-0.77734-1.332-2.3789-1.9453-3.8477-1.4727z"/>
        </svg>
        Verified`;
    }

    // Fire event for any other listeners
    window.dispatchEvent(new CustomEvent('zecWalletConnected', {
      detail: { address, walletName }
    }));

  }, 1800);
}


// ── Helpers ──────────────────────────────────────────

function showView(id) {
  document.querySelectorAll('#zec-sheet .zec-view, #zec-sheet .zec-flex-view').forEach(v => {
    v.classList.remove('zec-active');
  });
  document.getElementById(id).classList.add('zec-active');
}

function showErr(msg) {
  const b = document.getElementById('zec-err-bar');
  b.textContent = msg;
  b.classList.add('zec-err-show');
  setTimeout(() => b.classList.remove('zec-err-show'), 6000);
}

function openZecModal() {
  inject();
  document.getElementById('zec-err-bar').classList.remove('zec-err-show');
  showView('zec-view-list');
  document.getElementById('zec-modal-overlay').classList.add('zec-open');
  document.documentElement.style.overflow = 'hidden';
}

function closeZecModal() {
  stopCheckCycle();
  clearInterval(_countdownTimer);
  const overlay = document.getElementById('zec-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('zec-open');
  document.documentElement.style.overflow = '';
}

window.openZecModal = openZecModal;
window.closeZecModal = closeZecModal;

})();