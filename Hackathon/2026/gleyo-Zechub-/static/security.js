document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".logout-device-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const sessionId = btn.dataset.id;
      fetch(`/logout_device/${sessionId}`, { method: "POST" })
        .then(res => {
          if(res.ok) location.reload();
        });
    });
  });

  // Logout all other devices
  const logoutOtherBtn = document.getElementById("logoutAllOtherBtn");
  logoutOtherBtn?.addEventListener("click", () => {
    fetch("/logout_all_other_devices", { method: "POST" })
      .then(res => {
        if(res.ok) location.reload();
      });
  });

  const logoutAllBtn = document.getElementById("logoutAllBtn");
  logoutAllBtn?.addEventListener("click", () => {
    fetch("/logout_all_devices", { method: "POST" })
      .then(res => {
        if(res.ok) window.location.href = "/login";
      });
  });

});
