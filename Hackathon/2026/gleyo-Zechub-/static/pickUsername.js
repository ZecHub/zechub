function pickUsername(){
  const input = document.getElementById('username-input');
  const form = input.closest('form');
  const serverError = document.getElementById('username-server-error');

  let validationError = document.getElementById('username-uppercase-error');
  if (!validationError) {
    validationError = document.createElement('p');
    validationError.id = 'username-uppercase-error';
    validationError.style.color = 'rgba(255, 0, 0, 0.771)';
    validationError.style.display = 'none';
    input.insertAdjacentElement('afterend', validationError);
  }


  const allowedRegex = /^[a-z0-9._@-]+$/;

  input.addEventListener('input', () => {
    if (serverError) serverError.style.display = 'none';

    const value = input.value;

    if (value !== value.toLowerCase()) {
      validationError.textContent = 'Username must be all lowercase letters.';
      validationError.style.display = 'block';
    } 
    else if (/\s/.test(value)) {
      validationError.textContent = 'Username cannot contain spaces.';
      validationError.style.display = 'block';
    }
    else if (!allowedRegex.test(value)) {  
      validationError.textContent = 'Username contains invalid characters.';
      validationError.style.display = 'block';
    }
    else {
      validationError.style.display = 'none';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.value.trim();

      if (value === '') {
        validationError.textContent = 'Username cannot be empty.';
        validationError.style.display = 'block';
        return;
      }

      if (value !== value.toLowerCase()) {
        validationError.textContent = 'Username must be all lowercase letters.';
        validationError.style.display = 'block';
        return;
      }

      if (/\s/.test(value)) {
        validationError.textContent = 'Username cannot contain spaces.';
        validationError.style.display = 'block';
        return;
      }

      if (!allowedRegex.test(value)) { 
        validationError.textContent = 'Username contains invalid characters.';
        validationError.style.display = 'block';
        return;
      }

      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (
      value === '' ||
      value !== value.toLowerCase() ||
      /\s/.test(value) ||
      !allowedRegex.test(value)
    ) {
      validationError.style.display = 'block';
      return;
    }
    const btn = document.getElementById("continueBtn");

    btn.disabled = true;
    btn.textContent = "Saving...";
    const res = await fetch("/api/pick-username", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
    },
    body: JSON.stringify({
        username: value
    })
    });

    const data = await res.json();

    if (data.error) {
        validationError.textContent = data.error;
        validationError.style.display = 'block';

        btn.disabled = false;
        btn.textContent = "Continue";

        return;
    }

    if (data.redirect) {
        const response = await fetch(data.redirect, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        });

        const html = await response.text();

        const container = document.getElementById("innerconntect");
        container.innerHTML = html;

        window.history.pushState({}, "", data.redirect);

        await runPageScript(); 
    }
  });


}



function forceReflow() {
  setTimeout(() => {
    window.scrollTo(0, window.scrollY + 1);
    window.scrollTo(0, window.scrollY - 1);
    document.body.style.minHeight = window.innerHeight + "px";
  }, 50);
}

function handleFocusOut(e) {
  const el = e.target;

  if (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.isContentEditable
  ) {

  }
}

document.addEventListener("focusout", handleFocusOut);