const generateBtn = document.getElementById('generate-btn');
const output = document.getElementById('output');
const paymentInfo = document.getElementById('payment-info');
const walletAddress = document.getElementById('wallet-address');
const copyBtn = document.getElementById('copy-btn');
const copyIcon = document.getElementById('copy-icon');
const checkIcon = document.getElementById('check-icon');
const copyText = document.getElementById('copy-text');
const formPanel = document.getElementById('form-panel');
const previewPanel = document.getElementById('preview-panel');
const timerDiv = document.getElementById('timer');

const TOKEN = 'ZEC';
const NETWORK = 'Zcash';

let countdownInterval = null;
let secondsRemaining = 0;

// ✅ Timer helpers
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer(seconds) {
  clearInterval(countdownInterval);
  secondsRemaining = seconds;
  countdownInterval = setInterval(() => {
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      clearInterval(countdownInterval);
      timerDiv.innerHTML = '❌ Session expired';
      document.getElementById('status').innerHTML = `
        <span style="color: red; font-weight: bold;">
          ❌ Session expired
        </span>
      `;
    } else {
      timerDiv.innerHTML = `⏳ Time left: ${formatTime(secondsRemaining)}`;
    }
  }, 1000);
}

function setupCopyBtn(addressText) {
  copyBtn.onclick = () => {
    const textToCopy = addressText.trim();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(showCopiedState).catch(fallbackCopy);
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
        if (successful) showCopiedState();
      } catch (err) {
        alert("Copy failed. Please copy manually.");
      }

      document.body.removeChild(tempInput);
    }

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
  };
}

// ✅ Generate Payment Info
generateBtn.addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const statusDiv = document.getElementById('status');
  const refCode = document.getElementById("payment-data").dataset.ref;

  if (!amount) {
    alert("Amount is missing.");
    return;
  }

  // Tell backend we're starting payment
  const res = await fetch("/api/start-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference_code: refCode, token: TOKEN, network: NETWORK })
  });

  const data = await res.json();
  if (data.error) {
    alert(data.error);
    return;
  }

  const fixedAddress = data.address;

  // Hide form, show preview
  formPanel.style.display = 'none';
  previewPanel.style.display = 'flex';
  paymentInfo.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    document.body.classList.add("right-panel-active");
  }, 150);

  // Show instructions
  output.innerHTML = `Send exactly <strong>${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ${TOKEN}</strong> on <strong>${NETWORK}</strong>`;
  walletAddress.textContent = fixedAddress;

  // Waiting for payment
  statusDiv.innerHTML = `
    <span class="payment-waiting">
      <span class="spinner"></span>
      Waiting for payment...
    </span>
  `;

  // QR code
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), { text: fixedAddress, width: 128, height: 128 });

  // Copy button
  setupCopyBtn(fixedAddress);

  // Get initial timer value from backend
  const firstCheck = await fetch(`/api/check-payment/${refCode}`);
  const firstData = await firstCheck.json();
  if (firstData.time_left !== null) {
    startTimer(firstData.time_left);
  }

  // Poll backend for payment every 5s
  const poll = setInterval(async () => {
    const checkRes = await fetch(`/api/check-payment/${refCode}`);
    const checkData = await checkRes.json();

    // Sync timer with backend
    if (checkData.time_left !== null) {
      if (Math.abs(checkData.time_left - secondsRemaining) > 2) {
        startTimer(checkData.time_left);
      }
    }

    if (checkData.payment_state === "paid") {
      clearInterval(poll);
      clearInterval(countdownInterval);

      timerDiv.innerHTML = "";

      statusDiv.innerHTML = `
        <span class="pop-status">
          <span class="check-circle">✔️</span> Payment received!
        </span>
      `;
      document.getElementById('payment-sound').play();
      confetti();

      setTimeout(() => {
        if (checkData.community_slug) {
          window.location.href = `/${checkData.community_slug}/community_settings`;
        } else {
          window.location.href = "/dashboard";
        }
      }, 10000);

    } else if (checkData.payment_state === "expired") {
      clearInterval(poll);
      statusDiv.innerHTML = `
        <span style="color: red; font-weight: bold;">
          ❌ Session expired
        </span>
      `;

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, 5000);
});