const settingsLabels = {
  "general": "General",
  "security": "Security",
  "linked-accounts": "Linked Accounts",
  "wallet": "Wallet",
};

function updateSettingsHeader(path) {
  const h1 = document.getElementById("chngaer-this");
  if (!h1) return;
  const slug = getSettingsSlug(path) || "general";
  const label = settingsLabels[slug] || slug.replace(/-/g, " ");

  h1.textContent = `${label}`;
}
  
  

const WaitSvg = `
<svg
  viewBox="0 0 59.066 59.066"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M52.846,27.12C52.415,26.398,51.691,26,50.793,26c-1.667,0.006-3.673,0.667-5.235,1.724
    c-1.441,0.975-3.53,2.782-5.293,5.863c-0.331,0.578-0.874,0.97-1.455,1.063c-0.002-0.134-0.001-0.287-0.001-0.431
    c0-0.31,0.001-0.678-0.012-1.084V11c0-2.206-1.794-4-4-4s-4,1.794-4,4v15.5c0,0.275-0.225,0.5-0.5,0.5
    s-0.5-0.225-0.5-0.5V4c0-2.206-1.794-4-4-4s-4,1.794-4,4v22.5c0,0.275-0.225,0.5-0.5,0.5
    s-0.5-0.225-0.5-0.5v-18c0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5v20c0,0.275-0.225,0.5-0.5,0.5
    s-0.5-0.225-0.5-0.5V16c0-1.93-1.57-3.5-3.51-3.5c-1.93,0-3.5,1.57-3.5,3.5l0.002,27.197
    c0.968,13.983,9.545,15.869,17.808,15.869c6.846,0,12.995-3.396,16.027-8.824c0.39-0.63,1.445-2.288,2.696-4.254
    c3.128-4.913,5.748-9.041,6.135-9.775c0.863-1.634,1.826-2.911,2.784-3.693c0.867-0.708,1.397-1.611,1.828-2.404
    C53.289,29.704,53.483,28.189,52.846,27.12z"/>
</svg>

`;


const NewCodeSvgSent= `
<svg viewBox="0 0 26.001 26.001" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.002,12.998C11,14.102,11.894,14.999,12.998,15c1.104,0,2-0.895,2.002-1.997
    c0.002-1.106-0.893-2.001-1.996-2.001C11.898,11,11.002,11.892,11.002,12.998z"/>
  
  <path d="M13.573,13.539c0,0,0.001-0.002,0.001-0.004c0.39-0.39,1.101-1.715,0.72-2.053
    c0,0-10.61-8.467-10.929-8.148s8.116,10.96,8.116,10.96
    C11.822,14.673,13.184,13.927,13.573,13.539z"/>
  
  <circle cx="13" cy="2.001" r="2.001"/>
  
  <path d="M17.288,1.798c-0.688,1.154,0.396,1.861,0.723,2.04
    c3.244,1.776,5.453,5.21,5.453,9.163
    c0,5.77-4.693,10.463-10.463,10.463S2.536,18.771,2.536,13.001
    c0-1.326,0.253-2.594,0.707-3.76
    C3.303,9.09,3.872,8.086,2.757,7.384
    c-0.764-0.48-1.512,0.062-1.662,0.404
    C0.392,9.384,0,11.146,0,13.001
    c0,7.18,5.82,13,13,13s13-5.82,13-13
    c0-5.113-2.959-9.528-7.253-11.646
    C18.657,1.31,17.768,0.991,17.288,1.798z" />
</svg>

`;


  const header = document.querySelector(".portal-header");

let currentEmail = document.querySelector(".portal-header")?.dataset?.email || null;
const toggleBtn = document.querySelector('.bar-quest-container');
const sidebar   = document.querySelector('.settings-sidebar');
const injectCard = document.getElementById("inject-card");
const content   = document.querySelector('.settings-content');
const contentCard   = document.querySelector('.settings-content .card');
const overlay   = document.querySelector('.overlay-7457398t4');
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");


let saveBtn = null;

document.addEventListener("DOMContentLoaded", () => {
  const backLink = document.querySelector(".account-back");
  const saved = sessionStorage.getItem("accountBackRoute");


  if (!backLink) return;

  const url = saved || "/";
  backLink.dataset.url = url;

  const path = url.split("?")[0];
  const parts = path.split("/").filter(Boolean);

  let label = "Home";

  const isIdLike = (str) => {
    return /^[0-9\-]+$/.test(str) || /^[0-9a-f\-]{8,}$/i.test(str) || str.length > 12;
  };

  for (let i = parts.length - 1; i >= 0; i--) {
    if (!isIdLike(parts[i])) {
      label = parts[i];
      break;
    }
  }

  label = label.replace(/-/g, " ");
  label = label.charAt(0).toUpperCase() + label.slice(1);

  const span = backLink.querySelector("span");
  if (span) {
    span.textContent = `Back to ${label}`;
  }
});

async function logoutUser(url) {
  const nextPath = window.location.pathname + window.location.search;
  const loginUrl = `/login?next=${encodeURIComponent(nextPath)}`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "X-CSRFToken": csrfToken }
  });

  sessionStorage.removeItem("push_dismissed");

  if (res.redirected) {
    window.location.replace(res.url);
    return;
  }

  const ct = res.headers.get("content-type");

  if (ct && ct.includes("application/json")) {
    const data = await res.json();

    if (data.success) {
      window.location.replace(loginUrl);
    }
  } else {
    window.location.replace(loginUrl);
  }
}


async function goBackFromSettings(el) {
  const url = el.dataset.url || "/";

  // clear after use
  sessionStorage.removeItem("accountBackRoute");

  const response = await fetch(url, {
    headers: { "X-Requested-With": "XMLHttpRequest" }
  });

  const html = await response.text();


  window.location.href = url;
}

function ClosemobileUI() {
  if (document.body.classList.contains('sidebar-open')) {
    document.body.classList.remove('sidebar-open');
    document.documentElement.classList.remove('sidebar-open');
  }

}

toggleBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  document.body.classList.toggle('sidebar-open');
  document.documentElement.classList.toggle('sidebar-open');
});

overlay?.addEventListener('click', () => {
  document.body.classList.remove('sidebar-open');
  document.documentElement.classList.remove('sidebar-open');
});

sidebar?.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent overlay close
});


content?.addEventListener('click', () => {
  ClosemobileUI();
});


function normalizeSettingsPath(path) {
  if (isBaseSettings(path)) {
    return path.replace(/\/settings\/?$/, "/settings/general");
  }
  return path;
}


function getSettingsSlug(path = window.location.pathname) {
  const match = path.match(/\/settings\/([^/]+)/);
  return match ? match[1] : null;
}




function isBaseSettings(path) {
  return /\/settings\/?$/.test(path);
}



function setActiveNav(path) {
  document.querySelectorAll("[data-path]").forEach(el => {
    el.classList.toggle("active", el.dataset.path === path);
  });
}

function showProfileSkeleton(target) {
  const container =
    typeof target === "string"
      ? document.querySelector(target)
      : target;

  if (!container) return;

  container.innerHTML = `
    <div class="profile-wrapper">
      <div class="profile-banner skeleton skel-banner"></div>

      <div style="position: relative;">
        <div class="skeleton skel-avatar" style="position:absolute; top:-28px; left:24px;"></div>
      </div>

      <div class="profile-card skel-card" style="margin-top:40px; border: 0.9px solid var(--border) !important; padding-top: 23px">
        <div class="skeleton skel-line short"></div>
        
        <div style="margin-top:20px;">
          <div class="skeleton skel-line short" style="width: 100px"></div>
          <div class="skeleton skel-line long" style="margin-top:10px; padding: 20px 10px; border-radius: 15px"></div>
        </div>

        <div style="margin-top:20px;">
          <div class="skeleton skel-line long" style="width: 150px"></div>
          <div class="skeleton skel-line long" style="margin-top:10px; padding: 20px 10px; border-radius: 15px"></div>
        </div>
      </div>

      <div class="profile-card skel-card el" style="margin-top: 30px;  border: 0.9px solid var(--border) !importan">
        <div class="skeleton skel-line long"></div>
      </div>
    </div>
  `;
}


function showSecuritySkeleton(target) {
  const container =
    typeof target === "string"
      ? document.querySelector(target)
      : target;

  if (!container) return;

  container.innerHTML = `
    <div class="sk-wrapper">
      <div class="sk-wrapper-main">
      
        <div class="sk sk-title"></div>

        <div class="sk-card sk-flex">
          <div class="sk-left">
            <div class="sk sk-lg"></div>
            <div class="sk sk-sm"></div>
          </div>
          <div class="sk sk-toggle"></div>
        </div>

        <div class="sk sk-section"></div>

        <div class="sk-card">
          <div class="sk-row">
            <div class="sk sk-avatar"></div>
            <div class="sk-col">
              <div class="sk sk-md"></div>
              <div class="sk sk-sm"></div>
              <div class="sk sk-xs"></div>
            </div>
          </div>

          <div class="sk-divider"></div>

          <div class="sk sk-btn"></div>
        </div>

        
        <div class="sk sk-section"></div>

        <div class="sk-card">
          <div class="sk-row">
            <div class="sk sk-avatar"></div>
            <div class="sk-col">
              <div class="sk sk-md"></div>
              <div class="sk sk-sm"></div>
              <div class="sk sk-xs"></div>
            </div>
          </div>

          <div class="sk-row" style="margin-top: 20px !important;">
            <div class="sk sk-avatar"></div>
            <div class="sk-col">
              <div class="sk sk-md"></div>
              <div class="sk sk-sm"></div>
              <div class="sk sk-xs"></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;
}




function showLinkedAccountsSkeleton(target) {
  const container =
    typeof target === "string"
      ? document.querySelector(target)
      : target;

  if (!container) return;

  container.innerHTML = `
    <div class="sk-wrapper">
      <div class="sk-wrapper-main">

        <!-- Discord -->
        <div class="sk-card sk-flex">
          <div class="sk-row">
            <div class="sk sk-social"></div>
            <div class="sk-col">
              <div class="sk sk-name"></div>
              <div class="sk sk-handle"></div>
            </div>
          </div>
          <div class="sk sk-btn-sm"></div>
        </div>

        <!-- Twitter -->
        <div class="sk-card sk-flex">
          <div class="sk-row">
            <div class="sk sk-social"></div>
            <div class="sk-col">
              <div class="sk sk-name"></div>
              <div class="sk sk-handle"></div>
            </div>
          </div>
          <div class="sk sk-btn-sm"></div>
        </div>

        <!-- YouTube -->
        <div class="sk-card sk-flex">
          <div class="sk-row">
            <div class="sk sk-social"></div>
            <div class="sk-col">
              <div class="sk sk-name"></div>
              <div class="sk sk-handle" style="width:120px;"></div>
            </div>
          </div>
          <div class="sk sk-btn-sm"></div>
        </div>

        <!-- TikTok -->
        <div class="sk-card sk-flex">
          <div class="sk-row">
            <div class="sk sk-social"></div>
            <div class="sk-col">
              <div class="sk sk-name"></div>
              <div class="sk sk-handle" style="width:140px;"></div>
            </div>
          </div>
          <div class="sk sk-btn-sm"></div>
        </div>

      </div>
    </div>
  `;
}

function showWalletSkeleton(target) {
const container =
  typeof target === "string"
    ? document.querySelector(target)
    : target;

if (!container) return;

container.innerHTML = `
  <div class="shell state active sk-wrap wallet">
    
    <div class="sk-card wallet" style="min-width: 230px ">
      
      <div class="sk-line sk-sm"></div>
      <div class="sk-line sk-full" style="margin-top: 10px"></div>

      <div class="sk-block" style="margin-top: 60px"></div>

      <div class="sk-line sk-mid" style="margin-top: 13px"></div>

    </div>

  </div>
`;
}
const loadedScripts = new Set();
function loadSectionScript(slug) {
  if (!slug) return;

  const version = "2";  
  const src = `/static/settings/${slug}.js?v=${version}`;

  const old = document.getElementById("section-script");
  if (old) old.remove();

  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  script.id = "section-script";

  script.onload = () => {
    console.log(`Loaded script: ${src}`);
    runSectionInits(slug);
  };

  script.onerror = () => {
    console.warn(`Failed to load: ${src}`);
  };

  document.body.appendChild(script);
}

function runSectionInits(slug) {
  switch (slug) {
    case "general":
      initUsernameEditor();
      CallImagePickr();
      break;

    case "security":
      loadActiveSessions();
      calledIniterd();
      break;

    case "linked-accounts":
      initSocialDisconnects();
      break;

    case "wallet":
      window.openModal      = openModal;
      window.closeModal     = closeModal;
      window.overlayClick   = overlayClick;
      window.backToList     = backToList;
      window.pick           = pick;
      window.showUniversalQR = showUniversalQR;
      window.openDeepLink   = openDeepLink;
      window.disconnect     = disconnect;
      break;

    default:
      console.log("No init functions for:", slug);
  }
}

async function loadSettingsSection(path, push = true) {
  const finalPath = normalizeSettingsPath(path);

  ClosemobileUI();
  if (finalPath.includes("/security")) {
    showSecuritySkeleton(injectCard);
  } 
  
  if (finalPath.includes("/general")) {
    showProfileSkeleton(injectCard);
  }

  if (finalPath.includes("/linked-accounts")) {
    showLinkedAccountsSkeleton(injectCard);
  }

  if (finalPath.includes("/wallets")) {
    showWalletSkeleton(injectCard);
  }
  const res = await fetch(finalPath, {
    headers: { "X-Partial": "1" }
  });
  if (res.status === 403) {
    const data = await res.json();

    if (data.require_passcode) {
      openPasscodeModal(finalPath);
      return;
    }
  }
  const html = await res.text();


  updateSettingsHeader(finalPath)
  injectCard.innerHTML = html;
    const slug = getSettingsSlug(path);
    setActiveNav(finalPath);

    if (push) {
      history.pushState({}, "", finalPath);
    }

    setActiveNav(finalPath);

      loadSectionScript(slug);







  }


document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.pathname;

  path = normalizeSettingsPath(path);

  if (path.startsWith("/settings")) {
    loadSettingsSection(path, false);
  }
});


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

function showSuccess(msg) {
showToast(msg, "success");
}





const OTP_CODE      = '000000'; 
const MAX_ATTEMPTS  = 5;
const LOCK_SECONDS  = 300;
const MAX_DIGITS    = 6;

let current = '', attempts = 0, locked = false, lockTimer = null;

const dotsEl        = document.getElementById('dots');
const dotEls        = Array.from(dotsEl.querySelectorAll('.dot'));
const subtitleEl    = document.getElementById('subtitle');
const pad           = document.getElementById('pad');
const avatar        = document.getElementById('avatar');
const attemptsEl    = document.getElementById('attempts');
const lockedBanner  = document.getElementById('lockedBanner');
const lockedTimerEl = document.getElementById('lockedTimer');

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('show'));
  document.getElementById(id).classList.add('show');
}

document.querySelectorAll('.back-btn[data-back]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.back));
});

function updateDots(state = 'normal') {
  dotEls.forEach((d, i) => {
    d.classList.remove('filled','error','success','pulse');
    if (state === 'error')        { if (i < current.length) d.classList.add('error'); }
    else if (state === 'success') { d.classList.add('success'); }
    else                          { if (i < current.length) d.classList.add('filled'); }
  });
}

function pushDigit(val) {
  if (locked || current.length >= MAX_DIGITS) return;
  current += val;
  const dot = dotEls[current.length - 1];
  dot.classList.add('filled','pulse');
  dot.addEventListener('animationend', () => dot.classList.remove('pulse'), { once: true });
  if (current.length === MAX_DIGITS) setTimeout(handleSubmit, 130);
}

function deleteDigit() {
  if (locked || !current.length) return;
  current = current.slice(0, -1);
  updateDots();
}

async function handleSubmit() {
  try {
    const res = await fetch("/api/verify-passcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ code: current })
    });

    const data = await res.json();

    if (data.success) {
      handleSuccess();

      setTimeout(() => {
        document.getElementById("passcode-modal").classList.add("hidden");

        if (pendingPath) {
          loadSettingsSection(pendingPath);
          pendingPath = null;
        }
      }, 1500);

    } else if (data.locked) {
      handleError(0);
      startLockout(data.remaining);

    } else {
      handleError(data.attempts_left);
    }

  } catch (err) {
    console.error(err);
  }
}


function handleSuccess() {
  updateDots('success');
  avatar.classList.add('success-glow');
  subtitleEl.textContent = 'Access granted';
  subtitleEl.className = 'subtitle success';
  pad.style.pointerEvents = 'none';

  setTimeout(() => showScreen('successScreen'), 600);
}

function handleError(attemptsLeft) {
updateDots('error');
dotsEl.classList.add('error-shake');
avatar.classList.add('shake');
attemptsEl.style.opacity = '1';

// 🔥 RESET FIRST
document.querySelectorAll('.attempt-pip').forEach(p => p.classList.remove('used'));

const used = MAX_ATTEMPTS - attemptsLeft;

for (let i = 0; i < used && i < MAX_ATTEMPTS; i++) {
  document.getElementById(`pip${i}`).classList.add('used');
}

subtitleEl.textContent =
  attemptsLeft > 0
    ? `Wrong — ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left`
    : 'Account locked';

subtitleEl.className = 'subtitle error';

dotsEl.addEventListener('animationend', () => {
  dotsEl.classList.remove('error-shake');
}, { once: true });

avatar.addEventListener('animationend', () => {
  avatar.classList.remove('shake');
}, { once: true });

setTimeout(() => {
  current = '';
  updateDots();

  if (attemptsLeft <= 0) {
    // do nothing, lock handled already
  } else {
    subtitleEl.textContent = 'Enter your 6-digit passcode';
    subtitleEl.className = 'subtitle';
  }
}, 700);
}



function startLockout(seconds) {
  locked = true;
  pad.style.pointerEvents = 'none';
  dotsEl.style.opacity = '0.3';

  lockedBanner.classList.add('show');
  subtitleEl.textContent = '';

  let rem = seconds;

  const tick = () => {
    lockedTimerEl.textContent =
      `${Math.floor(rem/60)}:${(rem%60).toString().padStart(2,'0')}`;

    if (rem-- <= 0) {
      clearInterval(lockTimer);
      unlockAfterTimeout();
    }
  };

  tick();
  lockTimer = setInterval(tick, 1000);
}

function unlockAfterTimeout() {
  locked = false; attempts = 0; current = '';
  lockedBanner.classList.remove('show');
  pad.style.pointerEvents = ''; dotsEl.style.opacity = '1';
  subtitleEl.textContent = 'Enter your 6-digit passcode'; subtitleEl.className = 'subtitle';
  document.querySelectorAll('.attempt-pip').forEach(p => p.classList.remove('used'));
  attemptsEl.style.opacity = '0'; updateDots();
}

pad.addEventListener('click', (e) => {
  const key = e.target.closest('.key'); if (!key) return;
  const val = key.dataset.val;
  const r = document.createElement('span');
  r.className = 'ripple';
  const rect = key.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  key.appendChild(r); r.addEventListener('animationend', () => r.remove());
  key.classList.add('pressed'); setTimeout(() => key.classList.remove('pressed'), 120);
  if (val === 'del') deleteDigit(); else pushDigit(val);
});

document.addEventListener('keydown', (e) => {
  if (document.getElementById('loginScreen').classList.contains('show')) {
    if (e.key >= '0' && e.key <= '9') pushDigit(e.key);
    else if (e.key === 'Backspace') deleteDigit();
  }
});

document.getElementById('forgotBtn').addEventListener('click', (e) => { e.preventDefault(); showScreen('forgotScreen'); });

document.getElementById('goEmail').addEventListener('click', () => showScreen('emailScreen'));
document.getElementById('go2FA').addEventListener('click', () => {
  showScreen('twoFAScreen');
  setTimeout(() => document.getElementById('otp0').focus(), 300);
});
document.getElementById('goSupport').addEventListener('click', () => showScreen('supportScreen'));

const btn = document.getElementById('sendEmailBtn');

btn.addEventListener('click', async () => {
  const originalText = btn.innerText;

  // 👉 show loading
  btn.innerText = "Sending...";
  btn.disabled = true;

  try {
    const res = await fetch("/api/send-reset-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      }
    });

    const data = await res.json();

    if (data.success) {
      btn.innerText = "Sent";
      document.getElementById('sentBadge').classList.add('show');
    } else {
      throw new Error(data.error || "Failed");
    }

  } catch (err) {
    console.error(err);

    // ❌ show toast
    showToast("Failed to send email");

    // reset button
    btn.innerText = originalText;
    btn.disabled = false;
  }
});

const otpBoxes = Array.from(document.querySelectorAll('.otp-box'));

otpBoxes.forEach((box, idx) => {
  box.addEventListener('input', () => {
    const v = box.value.replace(/\D/g, '');
    box.value = v ? v[0] : '';
    if (v) { box.classList.add('otp-filled'); if (idx < 5) otpBoxes[idx+1].focus(); }
    else   { box.classList.remove('otp-filled'); }
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && idx > 0) { otpBoxes[idx-1].focus(); otpBoxes[idx-1].value = ''; otpBoxes[idx-1].classList.remove('otp-filled'); }
  });
  box.addEventListener('paste', (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);
    paste.split('').forEach((ch, i) => { if (otpBoxes[i]) { otpBoxes[i].value = ch; otpBoxes[i].classList.add('otp-filled'); } });
    const next = otpBoxes[Math.min(paste.length, 5)]; if (next) next.focus();
  });
});

document.getElementById('verifyOtpBtn').addEventListener('click', () => {
  const code = otpBoxes.map(b => b.value).join('');
  if (code.length < 6) { otpBoxes[code.length].focus(); return; }
  if (code === OTP_CODE) {
    otpBoxes.forEach(b => b.classList.add('otp-success'));
    document.getElementById('twoFASubtitle').textContent = 'Code verified! Redirecting...';
    document.getElementById('twoFASubtitle').style.color = 'var(--dot-success)';
    setTimeout(() => showScreen('successScreen'), 900);
  } else {
    otpBoxes.forEach(b => { b.classList.add('otp-error'); b.value = ''; b.classList.remove('otp-filled'); });
    document.getElementById('twoFASubtitle').textContent = 'Wrong code — try again';
    document.getElementById('twoFASubtitle').style.color = 'var(--dot-error)';
    setTimeout(() => { otpBoxes.forEach(b => b.classList.remove('otp-error')); document.getElementById('twoFASubtitle').textContent = 'Enter the 6-digit code from your authenticator app.'; document.getElementById('twoFASubtitle').style.color = ''; otpBoxes[0].focus(); }, 900);
  }
});






let pendingPath = null;

function openPasscodeModal(path) {
  pendingPath = path;

  document.getElementById("passcode-modal").classList.remove("hidden");
}


