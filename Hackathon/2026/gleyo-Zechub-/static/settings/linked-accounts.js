(function () {
 
  function initSocialDisconnects() {

    document.querySelectorAll(".connection-card").forEach(card => {

      const btn = card.querySelector(".btn");
      if (!btn) return;

      if (!btn.classList.contains("disconnect")) return;

      const link = btn.closest("a");
      if (!link) return;

      link.addEventListener("click", async (e) => {
        e.preventDefault();

        const url = link.href;

        btn.disabled = true;
        btn.textContent = "Disconnecting...";

        try {

          const res = await fetch(url, {
            method: "GET",
            headers: { "X-Requested-With": "XMLHttpRequest" }
          });

          const data = await res.json()
            if (!res.ok || !data.success) {
              throw new Error(data.message || "Disconnect failed");
            }

          // update UI
          // update UI
          const status = card.querySelector(".connected-as");

          if (status) {
            status.classList.remove("connected-as");
            status.classList.add("not-connected");
            status.textContent = "Not connected";
          }

          // 🔥 IMPORTANT: update link to CONNECT URL
          const connectUrl = link.getAttribute("data-connect-url");
          if (connectUrl) {
            link.href = connectUrl;
          }

          // update button
          btn.classList.remove("disconnect");
          btn.classList.add("connect");
          btn.textContent = "Connect";
          btn.disabled = false;

          showSuccess("Account disconnected successfully");

        } catch (err) {

          console.error(err);

          btn.disabled = false;
          btn.textContent = "Disconnect";

          // ❌ SHOW ERROR TOAST
          showError("Failed to disconnect account");

        }

      });

    });

  }




function onTelegramAuth(user) {
  console.log("Telegram user:", user);

  const formData = new FormData();

  for (const key in user) {
    formData.append(key, user[key]);
  }

  fetch("/telegram/connect", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showSuccess("Telegram connected successfully");
      location.reload(); // refresh UI
    } else {
      showError(data.error || "Failed to connect Telegram");
    }
  })
  .catch(() => {
    showError("Telegram connection failed");
  });
}
  window.initSocialDisconnects = initSocialDisconnects
})();
