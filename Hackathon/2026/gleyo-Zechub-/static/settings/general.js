(function () {


  function showOTPStatus(container, html, type = "wait") {
    const statusEl = container.querySelector("#resendStatus");
    if (!statusEl) return;

    clearTimeout(statusEl._timer);

    statusEl.className = `resend-status show ${type}`;
    statusEl.innerHTML = html;

    statusEl._timer = setTimeout(() => {
      statusEl.classList.remove("show");

      setTimeout(() => {
        statusEl.innerHTML = "";
        statusEl.className = "resend-status";
      }, 400);
    }, 5000);
  }


  function showChangeEmailModal() {
    if (document.getElementById("changeEmailModal")) return;

    const modal = document.createElement("div");
    modal.id = "changeEmailModal";
    modal.className = "modal-backdrop";

    modal.innerHTML = `
      <div class="modal-glass" id="emailModalInner">
        <h3>Change email</h3>
        <p>Enter your new email address</p>

        <input type="email" class="modal-input" placeholder="new@email.com" />

        <div class="modal-actions push-downer">
          <button class="btn-outline" id="cancelChangeEmail">Cancel</button>
          <button id="confirmChangeEmail">Continue</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add("show");

    const inner = modal.querySelector("#emailModalInner");
    const input = modal.querySelector(".modal-input");
    const confirmBtn = modal.querySelector("#confirmChangeEmail");


    /* ---------- CLEANUP ---------- */
    const cleanup = () => {
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 200);
    };

    modal.onclick = (e) => {
      if (e.target === modal) cleanup();
    };

    modal.querySelector("#cancelChangeEmail").onclick = cleanup;

    /* ---------- LIVE VALIDATION ---------- */
    input.addEventListener("input", () => {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      confirmBtn.classList.toggle("valid", ok);
    });

    /* ---------- SEND OTP ---------- */
    confirmBtn.onclick = async () => {
      if (!confirmBtn.classList.contains("valid")) return;

      currentEmail = input.value.trim();
      confirmBtn.textContent = "Sending...";
      confirmBtn.disabled = true;


      const res = await fetch("/send-email-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
          email: currentEmail,
          action: "change_email"
        })
      });

      const data = await res.json();

      confirmBtn.disabled = false;
      confirmBtn.textContent = "Continue";

      if (!res.ok) {
        if (data.error === "email_taken") {
          cleanup(); // close modal
          showToast("Email already taken");
          return;
        }

        if (data.error === "no_change") {
          showToast("That’s already your email");
          return;
        }

        if (data.error === "not_authenticated") {
          showToast("Please log in again");
          return;
        }

        showToast("Failed to send verification code");
        return;
      }

      showOTPView();

    };

    /* ---------- OTP VIEW ---------- */
    function showOTPView() {
      inner.innerHTML = `
        <div class="verify-header">
          <h3>Verify email</h3>
          <span id="resendStatus" class="resend-status"></span>
        </div>

        <p>Enter the 6-digit code sent to <b>${currentEmail}</b></p>

        <div class="otp-row">
          ${Array.from({ length: 6 })
            .map(
              () => `
              <div class="otp-box">
                <input
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  class="otp-input"
                />
              </div>
            `
            )
            .join("")}
        </div>


        <div class="resend-text" id="resendCode">
          Didn’t receive any code? <span class="resend-email">Resend</span>
        </div>

        <div class="modal-actions push-downer">
          <button class="btn-outline" id="cancelVerify">Cancel</button>
          <button id="verifyEmailBtn">Verify</button>
        </div>
      `;

      const inputs = inner.querySelectorAll(".otp-input");

      inputs.forEach((inp, i) => {
        inp.addEventListener("input", () => {
          if (inp.value && inputs[i + 1]) inputs[i + 1].focus();
        });
      });

      const resendBtn = inner.querySelector("#resendCode");
      
      let statusTimer;


      const verifyBtn = inner.querySelector("#verifyEmailBtn");
      const cancelBtn = inner.querySelector("#cancelVerify");

      cancelBtn.onclick = () => {
        cleanup();
      };


      function updateVerifyState() {
        const code = [...otpInputs].map(i => i.value).join("");
        const isComplete = code.length === 6;

        verifyBtn.classList.toggle("valid", isComplete);
      }

      resendBtn.onclick = async () => {
        const res = await fetch("/resend-email-code-change", {
          method: "POST",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": csrfToken
          }
        });

        const data = await res.json();

        if (data.status === "sent") {
          showOTPStatus(inner, `${NewCodeSvgSent} New code sent`, "sent");
        }

        if (data.status === "wait") {
          showOTPStatus(inner, `${WaitSvg} Wait ${data.left}s`, "wait");
        }

      };

      const boxes = inner.querySelectorAll(".otp-box");
      const otpInputs = inner.querySelectorAll(".otp-input");

      otpInputs.forEach((otpInput, index) => {
        otpInput.addEventListener("focus", () => {
          boxes[index].classList.add("active");
        });

        otpInput.addEventListener("blur", () => {
          boxes[index].classList.remove("active");
        });

        otpInput.addEventListener("input", (e) => {
          let val = e.target.value.replace(/\D/g, "");

          // ❌ clear error immediately on any change
          boxes.forEach(b => b.classList.remove("error"));

          // 📋 smart paste handling
          if (val.length > 1) {
            val
              .split("")
              .slice(0, 6)
              .forEach((char, i) => {
                if (otpInputs[i]) otpInputs[i].value = char;
              });

            otpInputs[Math.min(val.length, 5)]?.focus();
            updateVerifyState();
            return;
          }

          otpInput.value = val;

          if (val && otpInputs[index + 1]) {
            otpInputs[index + 1].focus();
          }

          updateVerifyState();
        });

        otpInput.addEventListener("input", () => {
          boxes.forEach(b => b.classList.remove("error"));
        });

        otpInput.addEventListener("keydown", (e) => {
          if (e.key !== "Backspace") return;

          e.preventDefault();

          // clear error immediately
          boxes.forEach(b => b.classList.remove("error"));
          updateVerifyState();

          if (otpInput.value) {
            otpInput.value = "";
          } else if (otpInputs[index - 1]) {
            otpInputs[index - 1].value = "";
            otpInputs[index - 1].focus();
          }
        });


      });
      inner.querySelector(".otp-row").addEventListener("paste", (e) => {
        e.preventDefault();

        const pasted = (e.clipboardData || window.clipboardData)
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, 6);

        pasted.split("").forEach((char, i) => {
          if (otpInputs[i]) otpInputs[i].value = char;
        });

        otpInputs[Math.min(pasted.length, 5)]?.focus();
      });

      inner.querySelector("#verifyEmailBtn").onclick = async () => {
        const code = [...otpInputs].map(i => i.value).join("");

        if (code.length !== 6) return;

        const res = await fetch("/verify-email-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify({
            code
          })
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.error === "code_expired") {
            otpInputs.forEach(i => i.value = "");

            boxes.forEach(b => b.classList.remove("error"));

            showOTPStatus(inner, "Code expired. Please resend.", "wait");


            otpInputs[0].focus();
            return;
          }

          boxes.forEach(b => b.classList.add("error"));
          return;
        }

        // ✅ SUCCESS
        document.querySelector(".email-value").textContent = currentEmail;
        cleanup();
      };

    }
  }



  function handleKeyboardOffset(el) {
    if (!window.visualViewport) return;

    let raf = null;

    const update = () => {
      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const offset =
          window.innerHeight - window.visualViewport.height;

        el.style.bottom =
          offset > 0 ? `${offset + 16}px` : "24px";
      });
    };

    window.visualViewport.addEventListener("resize", update);
    update();
  }



  let avatarChanged = false;
  let originalAvatarSrc = null;

  function hideSave() {
    if (saveBtn) saveBtn.classList.add("hidden");
  }

  function createSaveButton() {
    if (saveWrapper) return;

    saveWrapper = document.createElement("div");
    saveWrapper.className = "save-username-wrapper";

    saveBtn = document.createElement("button");
    saveBtn.className = "save-username-btn hidden";
    saveBtn.textContent = "Save changes";
    
    saveBtn.onclick = async () => {
      saveBtn.disabled = true;
      saveBtn.textContent = "Saving...";

      try {
        const formData = new FormData();

        const cleanUsername = usernameInput.value

          .toLowerCase()
          .replace(/\s+/g, "");

        // ✅ only send username if changed
        if (cleanUsername !== originalUsername) {
          formData.append("username", cleanUsername);
        }

        // ✅ only send avatar if changed
        if (avatarChanged) {
          const avatarInput = document.getElementById("avatarInput");
          const file = avatarInput?.files?.[0];

          if (file && file.name && file.size > 0) {
            formData.append("avatar", file);
          }
        }

        // ❌ nothing changed (safety)
        if (![...formData.keys()].length) {
          hideSave();
          return;
        }

        const res = await fetch("/api/account/profile", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken
          },
          credentials: "same-origin",
          body: formData
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to update profile");
        }

        // ✅ sync frontend state
        if (data.username) {
          originalUsername = data.username;
        }

        if (data.avatar_url) {
          originalAvatarSrc = data.avatar_url;
          document.querySelector(".avatar img").src = data.avatar_url;
        }

        avatarChanged = false;
        hideSave();

      } catch (err) {
        showToast(err.message);
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save changes";
      }
    };

    saveWrapper.appendChild(saveBtn);
    document.body.appendChild(saveWrapper);
    handleKeyboardOffset(saveWrapper);
    }




  let saveWrapper = null;
  let usernameInput = null;
  let originalUsername = null;

  function CallImagePickr() {
    const avatarOverlay = document.querySelector(".avatar-overlay");
    const avatarInput = document.getElementById("avatarInput");
    const avatarImg = document.querySelector(".avatar img");
    const avatarFalback = document.querySelector(".avatar-fallback");


    if (!avatarOverlay || !avatarInput || !avatarImg) return;
    // store original src once
    originalAvatarSrc = avatarImg.src;

    avatarOverlay.addEventListener("click", () => {
      avatarInput.click();
    });

    avatarInput.addEventListener("change", () => {
      const file = avatarInput.files[0];
      if (!file) return;

      // ✅ validate file type
      if (!file.type.startsWith("image/")) {
        showToast("Only image files are allowed");
        avatarInput.value = "";
        return;
      }

      // ✅ preview image immediately
      const reader = new FileReader();
      reader.onload = () => {
        avatarFalback.classList.add("hidden-from-view")
        avatarImg.classList.remove("hidden-from-view")
        avatarImg.src = reader.result;
        avatarChanged = true;
        showSave(); // 🔥 THIS is the key
      };
      reader.readAsDataURL(file);
    });

  }

  function showSave() {
    createSaveButton();
    saveBtn.classList.remove("hidden");
  }

  function initUsernameEditor() {
    usernameInput = document.getElementById("usernameInput");
    if (!usernameInput) return;

    originalUsername = usernameInput.value.toLowerCase();


    function shouldShowSave(cleanUsername) {
      return cleanUsername !== originalUsername || avatarChanged;
    }

    usernameInput.addEventListener("input", () => {
      const clean = usernameInput.value
        .toLowerCase()
        .replace(/\s+/g, "");

      if (usernameInput.value !== clean) {
        usernameInput.value = clean;
      }

      if (shouldShowSave(clean)) {
        showSave();
      } else {
        hideSave();
      }
    });
  }






  let deleteModal = null;

  function openDeleteAccountModal(e) {
    e.preventDefault();
    e.stopPropagation();

    if (deleteModal) {
      showDeleteModal();
      return;
    }

    deleteModal = document.createElement("div");
    deleteModal.className = "modal-emailch";
    deleteModal.id = "deleteAccountModal";

    deleteModal.innerHTML = `
      <div class="modal-backdrop-email">
        <h3 style="margin:0 0 12px;font-size:16px;color:var(--text-main);">
          Delete account
        </h3>

        <p style="font-size:14px; margin: 0 0 12px; color:var(--text-muted); line-height:1.5;">
          To protect your account, we’ll first verify this action with a one-time code
          sent to your email address.
        </p>

        <p style="font-size:14px; margin: 0 0 12px; color:var(--text-muted); line-height:1.5;">
          After verification, your account will be scheduled for deletion and
          permanently removed after <strong>30 days</strong>.
        </p>

        <p style="font-size:14px; margin: 0 0 18px; color:var(--text-muted); line-height:1.5;">
          During this period, you won’t be able to access your account.
          All your messages in community chats will be deleted.
          If you change your mind within 30 days, you can contact our support team
          to request account restoration.
        </p>


        <div class="field-actions action-buttons" style="margin-top: 18px;">
          <button class="btn cancel" id="cancelDeleteAccount">
            Cancel
          </button>

          <button class="btn save" id="confirmDeleteAccount"
            style="border:none;">
            Continue
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(deleteModal);

    deleteModal.addEventListener("click", (e) => {
      if (e.target === deleteModal) {
        closeDeleteAccountModal();
      }
    });

    deleteModal.querySelector("#cancelDeleteAccount")
      .addEventListener("click", closeDeleteAccountModal);

    deleteModal.querySelector("#confirmDeleteAccount")
      .addEventListener("click", () => {
        showDeleteOTPView();
        fetch("/send-delete-otp", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken
          }
        });
      });

    showDeleteModal();
  }







  function showDeletionScheduled() {
    const inner = deleteModal.querySelector(".modal-backdrop-email");

    inner.innerHTML = `
      <h3>Account deletion scheduled</h3>

      <p>
        Your account has been scheduled for deletion and will be
        permanently removed after <strong>30 days</strong>.
      </p>

      <p>
        You can contact support within this period if you change your mind.
      </p>

      <div class="modal-actions field-actions action-buttons" style="margin-top: 18px;">
        <button class="btn cancel" onclick="closeDeleteAccountModalWhenDeleted()">Close</button>
      </div>
    `;
  }



  function getCurrentEmail() {
    const el = document.querySelector(".field-value.email-value");
    return el && el.textContent.trim()
      ? el.textContent.trim()
      : "your email address";
  }

  async function confirmDeleteWithOTP(code) {
    const res = await fetch("/verify-delete-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ code })
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.error === "code_expired") {
        return "expired";
      }
      return "invalid";
    }

    showDeletionScheduled();
    return "ok";
  }


  function attachOTPLogic({
    container,
    submitBtnId,
  }) {
    const boxes = container.querySelectorAll(".otp-box");
    const inputs = container.querySelectorAll(".otp-input");
    const submitBtn = container.querySelector(`#${submitBtnId}`);
    const resendBtn = container.querySelector("#resendCode");

    function getCode() {
      return [...inputs].map(i => i.value).join("");
    }

    function updateState() {
      submitBtn.classList.toggle("valid", getCode().length === 6);

    }

    inputs.forEach((input, index) => {
      input.addEventListener("focus", () => {
        boxes[index].classList.add("active");
      });

      input.addEventListener("blur", () => {
        boxes[index].classList.remove("active");
      });

      input.addEventListener("input", e => {
        let val = e.target.value.replace(/\D/g, "");

        boxes.forEach(b => b.classList.remove("error"));

        // 📋 paste handling
        if (val.length > 1) {
          val
            .slice(0, 6)
            .split("")
            .forEach((char, i) => {
              if (inputs[i]) inputs[i].value = char;
            });

          inputs[Math.min(val.length, 5)]?.focus();
          updateState();
          return;
        }

        input.value = val;

        if (val && inputs[index + 1]) {
          inputs[index + 1].focus();
        }

        updateState();
      });

      input.addEventListener("keydown", e => {
        if (e.key !== "Backspace") return;
        e.preventDefault();

        boxes.forEach(b => b.classList.remove("error"));

        if (input.value) {
          input.value = "";
        } else if (inputs[index - 1]) {
          inputs[index - 1].value = "";
          inputs[index - 1].focus();
        }

        updateState();
      });
    });

    container.querySelector(".otp-row").addEventListener("paste", e => {
      e.preventDefault();

      const pasted = (e.clipboardData || window.clipboardData)
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

      pasted.split("").forEach((char, i) => {
        if (inputs[i]) inputs[i].value = char;
      });

      inputs[Math.min(pasted.length, 5)]?.focus();
      updateState();
    });
    submitBtn.onclick = async () => {
      if (!submitBtn.classList.contains("valid")) return;

      const result = await confirmDeleteWithOTP(getCode());

      if (result === "invalid") {
        boxes.forEach(b => b.classList.add("error"));
        return;
      }

      if (result === "expired") {
        inputs.forEach(i => i.value = "");
        boxes.forEach(b => b.classList.remove("error"));
        inputs[0].focus();
        updateState();
        showOTPStatus(container, "Code expired. Please resend.", "wait");

        return;
      }

    };
  }



  function showDeleteOTPView() {
    const inner = deleteModal.querySelector(".modal-backdrop-email");
    const currentEmail = getCurrentEmail();

    inner.innerHTML = `
      <div class="verify-header" style="display:flex; margin: 0">
        <h3>Confirm account deletion</h3>
        <span id="resendStatus" class="resend-status"></span>
      </div>

      <p>
        Enter the 6-digit code sent to <b>${currentEmail}</b>
        to confirm account deletion.
      </p>

      <div class="otp-row">
        ${Array.from({ length: 6 }).map(() => `
          <div class="otp-box">
            <input type="text" inputmode="numeric" maxlength="1" class="otp-input" />
          </div>
        `).join("")}
      </div>

      <div class="resend-text" id="resendCode">
        Didn’t receive any code? <span class="resend-email">Resend</span>
      </div>

      <div class="modal-actions push-downer">
        <button id="confirmDeleteBtn" class="btn-outline delete-account">Delete account</button>
      </div>
    `;
    attachOTPLogic({
      container: inner,
      submitBtnId: "confirmDeleteBtn",
    });


    const resendBtn = inner.querySelector("#resendCode");

    resendBtn.onclick = async () => {
      const res = await fetch("/resend-delete-otp", {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": csrfToken
        }
      });

      const data = await res.json();

      if (data.status === "sent") {
        showOTPStatus(inner, `${NewCodeSvgSent} New code sent`, "sent");
      }

      if (data.status === "wait") {
        showOTPStatus(inner, `${WaitSvg} Wait ${data.left}s`, "wait");
      }
    };

  }
 
  function showDeleteModal() {
    deleteModal.classList.add("show")

  }

  function closeDeleteAccountModal() {
    if (!deleteModal) return;
    deleteModal.classList.remove("show")
  }

  function closeDeleteAccountModalWhenDeleted() {
    if (!deleteModal) return;
    deleteModal.style.opacity = "0";
    deleteModal.style.pointerEvents = "none";
    window.location.href = "/logout";
  }

  async function confirmDeleteAccount() {
    const btn = deleteModal.querySelector("#confirmDeleteAccount");

    // lock width BEFORE changing text
    btn.style.width = `${btn.offsetWidth}px`;

    btn.disabled = true;
    btn.textContent = "Deleting...";

    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        credentials: "same-origin"
      });

      if (!res.ok) throw new Error();
      window.location.href = "/";
    } catch (err) {
      btn.disabled = false;
      btn.textContent = "Delete";
      btn.style.width = "";
      showToast("Failed to delete account. Try again.");
    }
  }

  window.initUsernameEditor = initUsernameEditor;
  window.CallImagePickr = CallImagePickr;
  window.openDeleteAccountModal = openDeleteAccountModal
  window.showChangeEmailModal = showChangeEmailModal

        

})();