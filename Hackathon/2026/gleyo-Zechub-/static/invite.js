document.addEventListener("DOMContentLoaded", () => {
  const communitySlug = document.body.dataset.communitySlug;
  const currentUserId = document.body.dataset.userId;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

  const inviteRowsContainer = document.getElementById("inviteRows");
  const addRowBtn = document.querySelector(".add-row");
  const sendBtn = document.querySelector(".main-login-btn.full-btn");
  const buttonContent = sendBtn.querySelector(".button-content");

  function initCustomSelect(select) {
    const selected = select.querySelector(".select-selected");
    const selectedText = selected.querySelector("span");
    const items = select.querySelector(".select-items");

    selected.addEventListener("click", () => {
      items.classList.toggle("select-hide");
      selected.classList.toggle("select-arrow-active");
    });

    items.querySelectorAll("div").forEach(option => {
      option.addEventListener("click", () => {
        selectedText.textContent = option.textContent;
        items.classList.add("select-hide");
        selected.classList.remove("select-arrow-active");
      });
    });
  }

  document.querySelectorAll(".custom-select").forEach(initCustomSelect);

  // close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".custom-select").forEach(select => {
      if (!select.contains(e.target)) {
        select.querySelector(".select-items").classList.add("select-hide");
        select.querySelector(".select-selected").classList.remove("select-arrow-active");
      }
    });
  });

  const infoBtn = document.getElementById("infoBtn");
  const rolePopup = document.getElementById("rolePopup");
  const popupClose = rolePopup.querySelector(".set-up-invite-icon");

  infoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    rolePopup.classList.add("active");
  });

  popupClose.addEventListener("click", () => {
    rolePopup.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (
      rolePopup.classList.contains("active") &&
      !rolePopup.contains(e.target) &&
      !infoBtn.contains(e.target)
    ) {
      rolePopup.classList.remove("active");
    }
  });

  // ---- toast ----
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

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function updateButtonState() {
    const rows = document.querySelectorAll(".invite-row");
    let hasValidEmail = false;

    rows.forEach(row => {
      const emailInput = row.querySelector("input[type='email']");
      if (emailInput && isValidEmail(emailInput.value)) hasValidEmail = true;
    });

    if (hasValidEmail) {
      buttonContent.classList.add("enable");
      buttonContent.classList.remove("disable");
      sendBtn.disabled = false;
    } else {
      buttonContent.classList.remove("enable");
      buttonContent.classList.add("disable");
      sendBtn.disabled = true;
    }
  }

  function bindEmailInput(row) {
    const emailInput = row.querySelector("input[type='email']");
    emailInput.addEventListener("input", updateButtonState);
  }

  document.querySelectorAll(".invite-row").forEach(bindEmailInput);
  updateButtonState();

  addRowBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const templateRow = document.querySelector(".invite-row");
    const newRow = templateRow.cloneNode(true);

    newRow.querySelector("input[type='email']").value = "";
    newRow.querySelector(".select-selected span").textContent = "Editor";
    newRow.querySelector(".select-items").classList.add("select-hide");
    newRow.querySelector(".select-selected").classList.remove("select-arrow-active");

    inviteRowsContainer.appendChild(newRow);

    initCustomSelect(newRow.querySelector(".custom-select"));
    bindEmailInput(newRow);
    updateButtonState();
  });

  sendBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (sendBtn.disabled) return;

    const rows = document.querySelectorAll(".invite-row");
    const invites = [];

    rows.forEach(row => {
      const emailInput = row.querySelector("input[type='email']");
      const role = row.querySelector(".select-selected span").textContent.trim();
      if (isValidEmail(emailInput.value)) {
        invites.push({ email: emailInput.value, role });
      }
    });

    if (invites.length === 0) {
      showError("❌ No valid emails entered");
      return;
    }

    sendBtn.disabled = true;
    buttonContent.innerHTML = `<span class="spinner"></span> Sending...`;

    const sentEmails = [];
    const errorMessages = [];

    for (const invite of invites) {
      try {
        const response = await fetch(`/community/${communitySlug}/send_invite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify({
            current_user_id: currentUserId,
            emails: invite.email,
            role: invite.role
          })
        });

        if (!response.ok) {
          errorMessages.push(`${invite.email}: Server error (${response.status})`);
          continue;
        }

        const result = await response.json();

        if (result.success && result.sent_emails.length > 0) {
          sentEmails.push(...result.sent_emails);
          rows.forEach(row => (row.querySelector("input[type='email']").value = ""));
        } else {
          errorMessages.push(`${invite.email}: ${result.error || "Unknown error"}`);
        }
      } catch (err) {
        console.error(`Error sending to ${invite.email}`, err);
        errorMessages.push(`${invite.email}: Error sending invite`);
      }
    }

    if (sentEmails.length > 0) {
      showSuccess(`Invitation link sent to: ${sentEmails.join(", ")}`);
    }

    if (errorMessages.length > 0) {
      showError(`❌ Failed: ${errorMessages.join(", ")}`);
    }

    sendBtn.disabled = false;
    buttonContent.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="size-6">
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
      Send invite link
    `;

    updateButtonState();
  });
});