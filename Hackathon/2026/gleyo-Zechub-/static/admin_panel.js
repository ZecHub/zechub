const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");


document.addEventListener('DOMContentLoaded', () => {
  const IsloadingInit = `
  <svg xmlns="["http://www.w3.org/2000/svg"" http://www.w3.org/2000/svg"] viewBox="0 0 200 200" width="20" height="20"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="currentColor" stop-opacity="0"></stop><stop offset=".2" stop-color="currentColor" stop-opacity=".3"></stop><stop offset=".4" stop-color="currentColor" stop-opacity=".6"></stop><stop offset=".7" stop-color="currentColor" stop-opacity=".9"></stop><stop offset="1" stop-color="currentColor"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="0;360" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="currentColor" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
  `;


  const websiteInput = document.getElementById('website');
  const urlError = document.getElementById('urlError');
  const nextBtn = document.getElementById('nextBtn'); // FIXED ID

  const startsWithOk = /^(https?:\/\/|www\.)/i;

  function showError(message) {
    urlError.textContent = message;
    urlError.classList.add("showed");
  }

  function clearError() {
    urlError.textContent = "";
    urlError.classList.remove("showed");
  }

  function validateWebsite(value) {
    if (value.trim() === '') {
      clearError();
      return false;
    }

    if (!startsWithOk.test(value)) {
      showError('Website url must start with "https://" or "www."');
      return false;
    }

    try {
      new URL(value.startsWith('http') ? value : 'https://' + value);
    } catch {
      showError('Please enter a valid website address.');
      return false;
    }

    clearError();
    return true;
  }

  function toggleNext(valid) {
    if (valid) {
      nextBtn.classList.remove('disabled');
      nextBtn.removeAttribute("disabled");
    } else {
      nextBtn.classList.add('disabled');
      nextBtn.setAttribute("disabled", "true");
    }
  }

  websiteInput.addEventListener('input', () => {
    const valid = validateWebsite(websiteInput.value.trim());
    toggleNext(valid);
  });



const nextBtnJS = document.getElementById("nextBtn");

nextBtnJS.addEventListener("click", async (e) => {
    const valid = validateWebsite(websiteInput.value.trim());
    if (!valid) {
      e.preventDefault();
      websiteInput.focus();
    }
  const website = document.getElementById("website").value.trim();
  const errorDiv = document.getElementById("urlError");

  errorDiv.textContent = "";

  if (!website) {
    errorDiv.textContent = "Website URL required";
    return;
  }
  const originalText = nextBtn.innerHTML;
  nextBtn.innerHTML = IsloadingInit;
  nextBtn.disabled = true;

  try {
    const res = await fetch("/api/adminlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ website: website })
    });

    const data = await res.json();

    if (!res.ok) {
      errorDiv.textContent = data.error || "Something went wrong";
      return;
    }

    navigateTo(data.redirect_url);

  } catch (err) {
    errorDiv.textContent = "Network error";
    nextBtn.innerHTML = originalText;
    nextBtn.disabled = false;
  }
});
});