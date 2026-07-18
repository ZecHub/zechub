
  function CalledIniter4_digit() {
    
  
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

    `

    const inputs = document.querySelectorAll('.code-input');
    const form = document.querySelector('form');
    const resendBtn = document.getElementById("resendBtn");
    const resendStatus = document.getElementById("resendStatus");
    const errorMsg = document.querySelector('p[style*="color:red"]');

    let reflowTimer = null;

    /* ----------------------- iOS SMART REFLOW ----------------------- */

    function forceReflow() {
      window.scrollTo(0, window.scrollY + 1);
      window.scrollTo(0, window.scrollY - 1);
      document.body.style.minHeight = window.innerHeight + "px";
    }

    function handleFocusOut(e) {

      const el = e.target;

      if (
        el.tagName !== "INPUT" &&
        el.tagName !== "TEXTAREA" &&
        !el.isContentEditable
      ) return;

      clearTimeout(reflowTimer);

      reflowTimer = setTimeout(() => {
        const active = document.activeElement;

        // If focus jumped to another OTP input → DO NOTHING
        if (
          active &&
          (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
        ) return;

        // Otherwise keyboard closed → fix layout
        forceReflow();
      }, 120); // sweet spot delay
    }

    document.addEventListener("focusout", handleFocusOut);

    /* ----------------------- OTP LOGIC ----------------------- */

    function getCode() {
      return Array.from(inputs).map(i => i.value).join("");
    }

    function setErrorState() {
      inputs.forEach(i => i.classList.add("error"));
    }

    function clearErrorState() {
      inputs.forEach(i => i.classList.remove("error"));
    }

    async function verifyCode() {
      const code = getCode();
      if (code.length !== inputs.length) return;

      const res = await fetch("/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ code })
      });
        if (res.redirected) {
            window.location.href = res.url;
            return;
        }
      const data = await res.json();

      if (data.error === "wrong") {
        setErrorState();
        setTimeout(() => {
          inputs.forEach(i => i.value = "");
          clearErrorState();
          inputs[0].focus();
        }, 400);
      }

      if (data.error === "expired") {
        setErrorState();
      }
      if (data.hard) {
        window.location.href = data.redirect;
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
    }

     
    inputs.forEach((input, idx) => {

input.addEventListener("input", (e) => {

  if (errorMsg) errorMsg.style.display = 'none';
  clearErrorState();

  let value = input.value.replace(/\D/g, "");

  // 🔥 KEY FIX: detect autofill (Android / Gmail / SMS)
  if (idx === 0 && value.length > 1) {
    value.split('').forEach((char, i) => {
      if (i < inputs.length) {
        inputs[i].value = char;
      }
    });

    inputs[Math.min(value.length, inputs.length) - 1].focus();

    if (value.length >= inputs.length) {
      verifyCode();
    }
    return;
  }

  input.value = value;

  // normal typing
  if (value && idx < inputs.length - 1) {
    inputs[idx + 1].focus();
  }

  if (getCode().length === inputs.length) {
    verifyCode();
  }
});

      input.addEventListener("keydown", e => {
        if (e.key === "Backspace" && !input.value && idx > 0) {
          inputs[idx - 1].focus();
        }

        if (e.key === "Enter") {
          e.preventDefault();
          if (getCode().length === inputs.length) {
            verifyCode();
          }
        }
      });

      input.addEventListener("paste", e => {
        e.preventDefault();

        const paste = (e.clipboardData || window.clipboardData)
          .getData('text')
          .replace(/\D/g, '');

        if (!paste) return;

        paste.split('').forEach((char, i) => {
          if (idx + i < inputs.length) {
            inputs[idx + i].value = char;
          }
        });

        const last = Math.min(idx + paste.length - 1, inputs.length - 1);
        inputs[last].focus();

        if (getCode().length === inputs.length) {
          verifyCode();
        }
      });

    });

    /* ----------------------- RESEND ----------------------- */

    function showStatus(type, message, icon) {
      resendStatus.className = "resend-status show " + type;
      resendStatus.innerHTML = icon + `<span>${message}</span>`;

      setTimeout(() => {
        resendStatus.classList.remove("show");
      }, 3000);
    }

    async function resendCode(e) {
      e.preventDefault();

      const res = await fetch("/resend-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        }
      });

      const data = await res.json();

      if (data.status === "wait") {
        showStatus("wait", `Wait ${data.left}s`, WaitSvg);
      }

      if (data.status === "sent") {
        showStatus("sent", "New code sent", NewCodeSvgSent);
      }
    }

    resendBtn.addEventListener("click", resendCode);

    inputs[0].focus();
  }

