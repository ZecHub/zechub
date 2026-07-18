const customSelect = document.getElementById("communitySizeSelect");
const trigger = customSelect.querySelector(".select-trigger");
const options = customSelect.querySelectorAll(".select-option");
const hiddenInput = document.getElementById("communitySizeInput");
const selectedText = document.getElementById("selectedSize");
const waitlistForm = document.getElementById("waitlistForm");
const waitlistBtn = waitlistForm.querySelector(".btn.others");
const waitlistEmail = waitlistForm.querySelector("input[name='email']");
const earlyForm = document.getElementById("earlyAccessForm");
const earlyBtn = earlyForm.querySelector(".btn.others");
const requiredFields = earlyForm.querySelectorAll("input[required], textarea[required]");

trigger.addEventListener("click", () => {
  customSelect.classList.toggle("active");
});


function showToast(msg, type = "error") {
  document.querySelectorAll(".toast").forEach(t => t.remove());

  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
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


function checkWaitlistValidity() {
  const emailValue = waitlistEmail.value.trim();

  // Basic email pattern check
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  if (emailValid) {
    waitlistBtn.classList.add("active");
  } else {
    waitlistBtn.classList.remove("active");
  }
}

waitlistEmail.addEventListener("input", checkWaitlistValidity);




function checkEarlyFormValidity() {
  let allFilled = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      allFilled = false;
    }
  });

  // Also check community size
  if (!hiddenInput.value) {
    allFilled = false;
  }

  if (allFilled) {
    earlyBtn.classList.add("active");
  } else {
    earlyBtn.classList.remove("active");
  }
}

requiredFields.forEach(field => {
  field.addEventListener("input", checkEarlyFormValidity);
});

options.forEach(option => {
  option.addEventListener("click", checkEarlyFormValidity);
});


options.forEach(option => {
  option.addEventListener("click", () => {
    selectedText.textContent = option.textContent;
    hiddenInput.value = option.dataset.value;

    selectedText.classList.add("active");

    customSelect.classList.remove("active");
  });
});

 
document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("active");
  }
});


function showView(viewId) {
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  document.getElementById(viewId).classList.add('active');
}

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}


function showToast(msg, type = "error") {
  document.querySelectorAll(".toast").forEach(t => t.remove());

  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
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



function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";

  if (id === "earlyModal") {
    earlyForm.reset();

    document.getElementById("earlyFeedback").innerText = "";

    selectedText.textContent = "Community Size";
    selectedText.classList.remove("active");
    hiddenInput.value = "";
    customSelect.classList.remove("active");

    earlyBtn.classList.remove("active");
  }

  if (id === "waitlistModal") {
    waitlistForm.reset();

    document.getElementById("waitlistFeedback").innerText = "";

    waitlistBtn.classList.remove("active");
  }
}


document.getElementById("earlyAccessForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  if (!earlyBtn.classList.contains("active")) return;

  const originalContent = earlyBtn.innerHTML;
  earlyBtn.innerHTML = IsloadingInit;
  earlyBtn.disabled = true;

  const formData = new FormData(this);

  try {
    const response = await fetch("/apply-early-access", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken },
      body: formData
    });

    const result = await response.json();

    earlyBtn.innerHTML = originalContent;
    earlyBtn.disabled = false;

    if (result.success) {
      closeModal("earlyModal");
      setTimeout(() => showSuccess(result.message), 200);
    } else {
      showError(result.message);
    }

  } catch {
    earlyBtn.innerHTML = originalContent;
    earlyBtn.disabled = false;
    showError("Something went wrong.");
  }
});



const IsloadingInit = `
<svg xmlns="["http://www.w3.org/2000/svg"" http://www.w3.org/2000/svg"] viewBox="0 0 200 200" width="20" height="20"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="currentColor" stop-opacity="0"></stop><stop offset=".2" stop-color="currentColor" stop-opacity=".3"></stop><stop offset=".4" stop-color="currentColor" stop-opacity=".6"></stop><stop offset=".7" stop-color="currentColor" stop-opacity=".9"></stop><stop offset="1" stop-color="currentColor"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="0;360" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="currentColor" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
`;

waitlistForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  if (!waitlistBtn.classList.contains("active")) return;

  const originalContent = waitlistBtn.innerHTML;
  waitlistBtn.innerHTML = IsloadingInit;
  waitlistBtn.disabled = true;

  const formData = new FormData(this);

  try {
    const response = await fetch("/join-waitlist", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken },
      body: formData
    });

    const result = await response.json();

    waitlistBtn.innerHTML = originalContent;
    waitlistBtn.disabled = false;

    if (result.success) {
      closeModal("waitlistModal");
      setTimeout(() => showSuccess(result.message), 200);
    } else {
      showError(result.message);
    }

  } catch {
    waitlistBtn.innerHTML = originalContent;
    waitlistBtn.disabled = false;
    showError("Something went wrong.");
  }
});


function showView(viewId) {
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');

    if (link.hasAttribute(`data-${viewId}`)) {
      link.classList.add('active');
    }
  });
}



window.addEventListener('popstate', function () {
  const viewId = window.location.pathname.replace('/', '') || 'home';
  showView(viewId);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const path = this.getAttribute('href');     
    const viewId = path.replace('/', '');     

    window.history.pushState({}, '', path);

    showView(viewId);
  });
});