window.CallcreatePass = function () {

  const card = document.querySelector("#card.card");
  const nextUrl = card?.dataset?.initerme || "";

  window.__NEXT_URL__ = nextUrl;  
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");


  const MAX = 6;
  let step = 1;       
  let firstCode = '';
  let current = '';

  const dotsEl    = document.getElementById('dots');
  const dotEls    = Array.from(dotsEl.querySelectorAll('.dot'));
  const titleEl   = document.getElementById('title');
  const subtitleEl= document.getElementById('subtitle');
  const stepLabel = document.getElementById('stepLabel');
  const lockIcon  = document.getElementById('lockIcon');
  const successOverlay = document.getElementById('successOverlay');

  function updateDots(state = 'normal') {
    dotEls.forEach((d, i) => {
      d.classList.remove('filled','error','success','pulse');
      if (state === 'error') {
        if (i < current.length) d.classList.add('error');
      } else if (state === 'success') {
        d.classList.add('success');
      } else {
        if (i < current.length) d.classList.add('filled');
      }
    });
  }

  function pushDigit(val) {
    if (current.length >= MAX) return;
    current += val;
    const dot = dotEls[current.length - 1];
    dot.classList.add('filled','pulse');
    dot.addEventListener('animationend', () => dot.classList.remove('pulse'), { once: true });

    if (current.length === MAX) {
      setTimeout(() => handleComplete(), 120);
    }
  }

  function deleteDigit() {
    if (!current.length) return;
    current = current.slice(0, -1);
    updateDots();
  }

  function handleComplete() {
    if (step === 1) {
      firstCode = current;
      current = '';
      step = 2;
      stepLabel.textContent = 'Step 2 of 2';
      titleEl.textContent = 'Confirm Passcode';
      subtitleEl.textContent = 'Enter your passcode again to confirm';
      subtitleEl.className = 'subtitle';
      updateDots();
    } else {
      if (current === firstCode) {
        handleSuccess();
      } else {
        handleError();
      }
    }
  }

    async function handleSuccess() {
    updateDots('success');
    successOverlay.classList.add('show');
    lockIcon.classList.add('unlock');

    titleEl.textContent = 'Securing...';
    subtitleEl.textContent = 'Please wait';
    subtitleEl.className = 'subtitle';

    document.getElementById('pad').style.pointerEvents = 'none';

    try {
        const res = await fetch("/api/create-passcode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ passcode: firstCode }) 
        });

        const data = await res.json();

        if (!res.ok) {
        throw new Error(data.error || "Failed");
        }

        // ✅ SUCCESS UI
        titleEl.textContent = 'Passcode Set!';
        subtitleEl.textContent = 'Your account is now secured';
        subtitleEl.className = 'subtitle success';
        stepLabel.textContent = 'Complete ✓';

        const card = document.getElementById('card');
        card.style.overflow = 'hidden';
        document.getElementById('shackle')
        .setAttribute('d','M17 24V17a9 9 0 0118 0');

        setTimeout(() => {
        lockIcon.classList.remove('unlock');
        }, 600);

        setTimeout(() => {
          if (window.__NEXT_URL__ && window.__NEXT_URL__.length > 0) {
            window.location.href = window.__NEXT_URL__;
          } else {
            window.location.href = "/settings/general";
          }
        }, 2000);

    } catch (err) {
        console.error(err);

        titleEl.textContent = 'Something went wrong';
        subtitleEl.textContent = err.message;
        subtitleEl.className = 'subtitle error';

        current = '';
        firstCode = '';
        step = 1;
        stepLabel.textContent = 'Step 1 of 2';
        document.getElementById('pad').style.pointerEvents = 'auto';
        updateDots();
    }
    }

  function handleError() {
    updateDots('error');
    dotsEl.classList.add('error-shake');
    lockIcon.classList.add('shake');
    subtitleEl.textContent = "Passcodes don't match — try again";
    subtitleEl.className = 'subtitle error';
    dotsEl.addEventListener('animationend', () => dotsEl.classList.remove('error-shake'), { once: true });
    lockIcon.addEventListener('animationend', () => lockIcon.classList.remove('shake'), { once: true });

    setTimeout(() => {
      current = '';
      updateDots();
      if (subtitleEl.classList.contains('error')) {
        subtitleEl.textContent = 'Enter your passcode again to confirm';
        subtitleEl.className = 'subtitle';
      }
    }, 700);
  }

  // Key press events
  document.getElementById('pad').addEventListener('click', (e) => {
    const key = e.target.closest('.key');
    if (!key) return;
    const val = key.dataset.val;

    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = key.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    key.appendChild(r);
    r.addEventListener('animationend', () => r.remove());

    // Pressed visual
    key.classList.add('pressed');
    setTimeout(() => key.classList.remove('pressed'), 120);

    if (val === 'del') deleteDigit();
    else pushDigit(val);
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') pushDigit(e.key);
    else if (e.key === 'Backspace') deleteDigit();
  });
}


window.CallcreatePass();