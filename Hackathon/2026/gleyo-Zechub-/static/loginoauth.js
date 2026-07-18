const socialView = document.getElementById("social-view");
const emailView = document.getElementById("email-view");
const continueEmailBtn = document.getElementById("continueEmailBtn");
const backFromEmail = document.getElementById("backFromEmail");
const logoLink = document.getElementById("logo-link");


function getCSRFToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
}

let __CURRENT_AUTH_PATH__ = null;

async function loadAuth(path, push = true) {

  const res = await fetch(path, {
    headers: { "X-Partial": "1" }
  })

  if (!res.ok) {
    document.getElementById("auth-content").innerHTML = "Something went wrong. Please refresh.";
    return;
  }

  const html = await res.text();
  document.getElementById("auth-content").innerHTML = html;

  if (push && window.location.pathname !== path) {
    history.pushState({ path }, "", path);
  }

  CalledIniter();
  initViewSwitcher();
  CloseBackfromemail();
  updateTopButton(path);
}

function updateTopButton(path) {
  const btn = document.querySelector(".top-right a");
  if (!btn) return;

  if (path === "/login") {
    btn.textContent = "Create an Account";
    document.title = "Log In";
    btn.dataset.path = "/create-account";
    btn.href = "/create-account";
  } else if (path === "/create-account") {
    btn.textContent = "Log In";
    document.title = "Create Account";
    btn.dataset.path = "/login";
    btn.href = "/login";
  }
}

document.addEventListener("click", function(e) {
  const link = e.target.closest(".auth-link");
  if (!link) return;

  e.preventDefault();
  loadAuth(link.dataset.path);
});

window.addEventListener("popstate", function(e) {
  const path = window.location.pathname;
  loadAuth(path, false);
});


function openEmailView() {

  const socialView = document.getElementById("social-view");
  const emailView = document.getElementById("email-view");
  const backFromEmail = document.getElementById("backFromEmail");
  const logoLink = document.getElementById("logo-link");

  if (!socialView || !emailView) return;

  socialView.style.display = "none";
  emailView.style.display = "block";

  if (logoLink) {
    logoLink.classList.add("hiding");
  }

  if (backFromEmail) {
    backFromEmail.classList.add("showing");
  }
}

function closeEmailView() {

  const socialView = document.getElementById("social-view");
  const emailView = document.getElementById("email-view");
  const backFromEmail = document.getElementById("backFromEmail");
  const logoLink = document.getElementById("logo-link");

  if (!socialView || !emailView) return;

  emailView.style.display = "none";
  socialView.style.display = "block";

  if (backFromEmail) {
    backFromEmail.classList.remove("showing");
  }

  if (logoLink) {
    logoLink.classList.remove("hiding");
  }
}


function initViewSwitcher() {


  if (!socialView || !emailView) return;



}


function CloseBackfromemail() {
  const socialView = document.getElementById("social-view");
  const emailView = document.getElementById("email-view");
  const backFromEmail = document.getElementById("backFromEmail");
  const logoLink = document.getElementById("logo-link");

  if (backFromEmail) backFromEmail.classList.remove("showing");
  if (logoLink) logoLink.classList.remove("hiding");

  if (!socialView || !emailView) return;

  emailView.style.display = "none";
  socialView.style.display = "block";
}


const IsloadingInit = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="20" height="20"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="currentColor" stop-opacity="0"></stop><stop offset=".2" stop-color="currentColor" stop-opacity=".3"></stop><stop offset=".4" stop-color="currentColor" stop-opacity=".6"></stop><stop offset=".7" stop-color="currentColor" stop-opacity=".9"></stop><stop offset="1" stop-color="currentColor"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="0;360" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="currentColor" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
`;


function CalledIniter() {
  const emailInput = document.getElementById("aboutBox");
  const fieldset = document.getElementById("emailFieldset");
  const legend = document.getElementById("legend");
  const errorMsg = document.querySelector(".inavid-email");
  const loginBtn = document.getElementById("loginBtn");

  if (!emailInput || !loginBtn) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim().toLowerCase();

    const flashContainer = document.querySelector(".flash-container");
    if (flashContainer) {
      flashContainer.style.display = "none";
    }

    fieldset.classList.remove("error");
    legend.classList.remove("error-legend");
    errorMsg.textContent = "";

    if (email && emailRegex.test(email)) {
      loginBtn.classList.add("valid-email");
    } else {
      loginBtn.classList.remove("valid-email");
    }
  });

  loginBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim().toLowerCase();
    const originalText = loginBtn.innerHTML;

    if (!email) {
      fieldset.classList.add("error");
      legend.classList.add("error-legend");
      return;
    }

    if (!emailRegex.test(email)) {
      fieldset.classList.add("error");
      legend.classList.add("error-legend");
      errorMsg.textContent = "Please enter a valid email address";
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = IsloadingInit;

    const nextValue = document.querySelector('input[name="next"]').value;

    try {
      const response = await fetch("/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": getCSRFToken(),
          "X-Requested-With": "XMLHttpRequest"
        },
        body: new URLSearchParams({
          box: email,
          next: nextValue
        })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const html = await response.text();

      const container = document.getElementById("innerconntect");
      container.innerHTML = html;
      runPageScript();
    } catch (err) {
      console.error("Error sending email:", err);

      loginBtn.disabled = false;
      loginBtn.innerHTML = originalText;

      errorMsg.textContent = "Something went wrong. Check your connection.";
    }
  });

  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loginBtn.click();
    }
  });

  (async () => {
    if (localStorage.getItem("tzSet")) return;

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (!tz) return;

      const res = await fetch("/set_timezone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify({ tz })
      });

      if (res.ok) {
        localStorage.setItem("tzSet", "1");
      }
    } catch (err) {
      console.error("Timezone setup failed:", err);
    }
  })();
}


async function loadScript(src) {
  return new Promise((resolve, reject) => {

    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
}


async function runPageScript() {

  if (document.querySelector("#loginBtn")) {
    await loadScript("/static/login.js");
    CalledIniter();
  }

  if (document.querySelector(".code-input")) {
    document.title = "OTP Verification";
    await loadScript("/static/4_digit.js");
    CalledIniter4_digit();
  }

  if (document.querySelector("#username-error")) {
    document.title = "Create Username";
    await loadScript("/static/pickUsername.js");
    pickUsername();
  }

  if (document.querySelector("#card")) {
    document.title = "Set Passcode";
    console.log("reachedin fetching passcoded")
    await loadScript("/static/createpasscode.js");
    console.log("fetched passcode")
  }
}


function callSpaceflash() {
  const flash = document.querySelector(".flash");

  if (!flash) return;

  setTimeout(() => {
    flash.classList.add("show");
  }, 50);

  setTimeout(() => {
    hideFlash(flash);
  }, 4000);
}

function closeFlash(el) {
  const flash = el.closest('.flash');
  hideFlash(flash);
}

function hideFlash(flash) {
  if (!flash) return;

  flash.classList.remove("show");
  flash.classList.add("hide");

  setTimeout(() => {
    const container = flash.closest('.flash-container');
    if (container) container.remove();
  }, 300);
}



CalledIniter();
initViewSwitcher();
callSpaceflash();