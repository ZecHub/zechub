
(function () {



  
function teaminbxinit() {

  const filterDropdown = document.querySelector(".team-role-filter");
  const members = document.querySelectorAll(".team-member");
  const roleDropdowns = document.querySelectorAll(".team-role");
  filterDropdown.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
      const filter = option.getAttribute("data-filter");
      members.forEach(member => {
        const roleLabel = member.querySelector(".team-role-label").textContent.toLowerCase();
        member.style.display = (filter === "all" || roleLabel === filter) ? "flex" : "none";
      });
      checkEmptyState();
      filterDropdown.style.display = "none";
    });
  });


  

  // --- GLOBAL DROPDOWN CLOSE ---
  function closeAllDropdowns(except = null) {
    // close role filter
    if (except !== filterDropdown) filterDropdown.style.display = "none";

    // close member role dropdowns
    roleDropdowns.forEach(role => {
      if (role !== except) role.classList.remove("open");
    });
  }
function checkEmptyState() {
  const visibleMembers = Array.from(members).filter(m => m.style.display !== "none");
  const list = document.querySelector(".team-members-list");

  if (visibleMembers.length === 0) {
    list.classList.add("empty");
  } else {
    list.classList.remove("empty");
  }
}


  const inviteUser = document.querySelector(".invite-user");
  const inviteDropdown = document.querySelector(".team-role-invite");

  if (inviteUser && inviteDropdown) {
    inviteUser.addEventListener("click", (e) => {
      e.stopPropagation();

      const rect = inviteUser.getBoundingClientRect();

      if (inviteDropdown.style.display === "block") {
        inviteDropdown.style.display = "none";
        return;
      }

      inviteDropdown.style.position = "fixed";

      // place below trigger
      inviteDropdown.style.top = rect.bottom + 6 + "px";

      // center align
      const dropdownWidth = inviteDropdown.offsetWidth || 160;
      const left = rect.left + rect.width / 2 - dropdownWidth / 2;

      inviteDropdown.style.left = left + "px";

      inviteDropdown.style.zIndex = "9999";
      inviteDropdown.style.display = "block";
    });

    // Handle option clicks
    inviteDropdown.querySelectorAll("div").forEach(option => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        inviteUser.querySelector("span").textContent = option.textContent;
        inviteDropdown.style.display = "none";
      });
    });
  }

  //




  // Click outside closes everything
  document.addEventListener("click", () => closeAllDropdowns());

  // Optional: search input
  const searchInput = document.querySelector(".team-search-box.not-mob input");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    members.forEach(member => {
      const name = member.querySelector(".team-name").textContent.toLowerCase();
      member.style.display = name.includes(query) ? "flex" : "none";
    });
    checkEmptyState();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;

    const isInsideDropdown =
      target.closest(".team-role-invite") ||       // invite dropdown
      target.closest(".team-role-menu") ||         // per-user role menu
      target.closest(".team-filter") ||            // filter button
      target.closest(".invite-user-dropdown") ||   // invite link dropdown
      target.closest(".team-role") ||              // role label itself
      target.closest(".team-btn.invite") ||        // send invites button
      target.closest(".team-btn.copy");            // copy invite button

    if (!isInsideDropdown) {
      // close role filter dropdown

      // close invite dropdowns
      document.querySelector(".team-role-invite")?.style.setProperty("display", "none");
      document.querySelector(".team-role-dropdown")?.style.setProperty("display", "none");

      // remove .open from all team-role elements
      document.querySelectorAll(".team-role.open").forEach(el => el.classList.remove("open"));
    }
  });



  const filterBtn = document.querySelector(".team-filter");
  const roleFilter = document.getElementById("teamRoleFilter");

  document.body.appendChild(roleFilter);

  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const rect = filterBtn.getBoundingClientRect();

    roleFilter.style.display = "block";

    roleFilter.style.top = rect.bottom + scrollY + 8 + "px";

    // horizontal: align RIGHT edges
    roleFilter.style.left =
      rect.right + window.scrollX - roleFilter.offsetWidth + "px";
  });
    const inviteBtn = document.querySelector(".team-btn.invite");
    const modalWrapper = document.querySelector(".modal-pops");
    const modalAmit = document.querySelector(".send-invite-email");
    const closeIconAmit = modalAmit.querySelector(".modal-close-icon");

    // Open modal with animation
    inviteBtn.addEventListener("click", () => {
      modalWrapper.classList.add("active");
      modalAmit.classList.add("active");
    });

    // Close modal function
    const closeModal = () => {
      modalAmit.classList.remove("active");
      modalWrapper.classList.remove("active");
    };

    // Close via X icon
    closeIconAmit.addEventListener("click", closeModal);

    // Close by clicking overlay
    modalWrapper.addEventListener("click", (e) => {
      if (e.target === modalWrapper) closeModal();
    });

  const copyBtn = document.querySelector(".team-btn.copy");
  const modal = document.querySelector(".link-invite-modal");
  const closeIcon = modal.querySelector(".modal-close-icon-link");
  const roleDropdown = document.querySelector(".team-role-dropdown");
  const roleToggle = modal.querySelector(".invite-user-dropdown");
  const roleSpan = roleToggle.querySelector("span");
  const copyLinkBtn = modal.querySelector(".invite-btn.copy-link-btn");
  let currentCode = null;

  const inviterUserId = 1; 
  const inviterUsername = "nuce"; // current username


  // --- Show spinner inside the button ---
  const showButtonSpinner = (btn) => {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span>Generating...`;
  };

  // --- Restore button text ---
  const restoreButton = (btn) => {
    btn.disabled = false;
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy invite link
    `;
  };

  const generateCode = async (role) => {
    showButtonSpinner(copyLinkBtn);
    try {
      const [res] = await Promise.all([
        fetch(`/${communitySlug}/generate_invite_code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify({
            role: role,
            inviter_user_id: inviterUserId,
            inviter_username: inviterUsername
          })
        }),
      ]);

      const data = await res.json();
      if (data.success) {
        currentCode = data.code;
      } else {
        console.error("Error generating code:", data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      restoreButton(copyLinkBtn);
    }
  };


  // --- Open modal & generate code ---
  copyBtn.addEventListener("click", () => {
    modal.classList.add("show");
    const role = roleToggle.getAttribute("data-selected-role") || "Editor";
    generateCode(role);
  });

  // --- Close modal ---
  closeIcon.addEventListener("click", () => {
    modal.classList.remove("show");
    roleDropdown.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      roleDropdown.style.display = "none";
    }
  });

  // --- Dropdown toggle ---
  roleToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    const rect = roleToggle.getBoundingClientRect();

    if (roleDropdown.style.display === "block") {
      roleDropdown.style.display = "none";
      return;
    }

    roleDropdown.style.position = "fixed";
    roleDropdown.style.display = "block"; 

    const dropdownWidth = roleDropdown.offsetWidth || 160;

    roleDropdown.style.top = rect.bottom + 6 + "px";
    roleDropdown.style.left = (rect.left + rect.width / 2 - dropdownWidth / 2) + "px";
    roleDropdown.style.zIndex = "9999";
  });

  roleDropdown.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", async (e) => {
      e.stopPropagation();
      const selectedRole = option.getAttribute("data-link");
      roleToggle.setAttribute("data-selected-role", selectedRole);
      roleSpan.textContent = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);
      roleDropdown.style.display = "none";
      await generateCode(selectedRole);
    });
  });

  // --- Close dropdown if click outside ---
  document.addEventListener("click", () => {
    roleDropdown.style.display = "none";
  });

copyLinkBtn.addEventListener("click", async () => {
  if (!currentCode) return;

  const slug = communitySlug;
  const role = roleToggle.getAttribute("data-selected-role") || "editor";

  const url = role === "member"
    ? `https://gleyo.app/${slug}/invite/${currentCode}`
    : `https://gleyo.app/${slug}/team_invite/${currentCode}`;

  try {
    await navigator.clipboard.writeText(url);
  } catch (err) {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
    } catch (e) {
      console.error("Copy failed", e);
    }

    document.body.removeChild(textarea);
  }

  copyLinkBtn.textContent = "Copied!";
  setTimeout(() => restoreButton(copyLinkBtn), 1000);
});



const sendBtn = document.querySelector(".invite-btn.send");
const defaultBtnText = sendBtn.textContent; // store original text

// Initialize selectedRole based on the default span text
let selectedRole = document.querySelector(".invite-user span").textContent.trim().toLowerCase();

// Select role from dropdown
document.querySelectorAll(".team-role-invite div").forEach(item => {
  item.addEventListener("click", e => {
    selectedRole = e.target.getAttribute("data-invite") || e.target.getAttribute("data-invite");
    document.querySelectorAll(".team-role-invite div").forEach(d => d.classList.remove("selected"));
    e.target.classList.add("selected");
  });
});

sendBtn.addEventListener("click", async () => {
  // Disable button and show spinner
  sendBtn.disabled = true;
  sendBtn.innerHTML = `<div class="spinner"></div> Sending...`;

  const emails = document.getElementById("invite-emails").value;


  try {
    const res = await fetch(`/community/${communitySlug}/send_invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ emails, role: selectedRole, current_user_id: currentUserId })
    });

    const data = await res.json();

    if(res.ok && data.success) {
      const emailList = data.sent_emails;
      const delay = emailList.length === 1 ? 6000 : 3000;

      const showNextToast = (index) => {
        if(index >= emailList.length) return;

        // Create new toast element
        const toast = document.createElement("div");
        toast.className = "toast success show";

        // Image
        const img = document.createElement("img");
        img.src = "{{ url_for('static', filename='sprint.png') }}";
        img.alt = "success";

        // Text wrapped in a span
        const textSpan = document.createElement("span");
        textSpan.textContent = `Invitation link sent to ${emailList[index]}`;

        toast.appendChild(img);
        toast.appendChild(textSpan);

        document.body.appendChild(toast);

        // Remove toast after delay
        setTimeout(() => {
          toast.classList.remove("show");
          toast.remove();
          showNextToast(index + 1);
        }, delay);

      };

      showNextToast(0); 
    } else {
      showToast(`❌ ${data.error}`, "error", true);
    }

  } catch(err) {
    console.error(err);
    showToast("❌ Network error", "error", true);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = defaultBtnText;
  }
});


}


const container = document.querySelector(".team-container");

let currentUserId = null;
let currentRoleBox = null;


const dropdown = document.getElementById("roleDropdown");

let isOpen = false;
let activeTrigger = null;

document.querySelectorAll(".team-role").forEach(el => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();

    if (el.classList.contains("creator-role")) return;

    currentUserId = el.dataset.userId;
    currentRoleBox = el;
    if (window.activeTrigger === el) {
      dropdown.style.display = "none";
      window.activeTrigger = null;
      return;
    }

    window.activeTrigger = el;

    const rect = el.getBoundingClientRect();

    // 👉 show to measure
    dropdown.style.display = "block";
    dropdown.style.visibility = "hidden";

    const dropdownHeight = dropdown.offsetHeight;
    const dropdownWidth = dropdown.offsetWidth;

    dropdown.style.visibility = "visible";

    // 🔥 CLEAN POSITION (RIGHT + CLOSE)
    let left = rect.right - dropdownWidth - 2;
    let top = rect.bottom + 4;

    // flip if no space
    if (top + dropdownHeight > window.innerHeight) {
      top = rect.top - dropdownHeight - 4;
    }

    // keep inside screen
    if (left < 6) left = 6;
    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth - 6;
    }

    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;
  });
});



 

// 🎯 HANDLE ROLE CLICK
dropdown.querySelectorAll("div").forEach(option => {
  option.addEventListener("click", async (e) => {
    e.stopPropagation();

    const role = option.dataset.role;
    if (!currentUserId) return;

    try {
      const res = await fetch(`/community/${communityId}/update_role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
          user_id: currentUserId,
          role: role
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Role updated to ${role}`, "success", true);

        const label = currentRoleBox.querySelector(".team-role-label");

        if (data.banned) {
          label.textContent = "Banned";
          label.style.color = "#f66";
        } else {
          label.textContent =
            role.charAt(0).toUpperCase() + role.slice(1);
          label.style.color = "";
        }

      } else {
        showToast(`❌ ${data.error}`, "error");
      }

    } catch (err) {
      console.error(err);
      showToast("❌ Network error", "error");
    }

    dropdown.style.display = "none";
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !e.target.closest(".team-role")) {
    dropdown.style.display = "none";
    isOpen = false;
    activeTrigger = null;
  }
});

window.addEventListener("scroll", closeDropdown, true);

container.addEventListener("scroll", closeDropdown);

function closeDropdown() {
  dropdown.style.display = "none";
  window.activeTrigger = null;
}

function getColor(id) {
  const colors = [
    '#FF6F61','#6B5B95','#88B04B','#F7CAC9',
    '#92A8D1','#955251','#B565A7','#009B77',
    '#DD4124','#45B8AC'
  ];
  return colors[id % colors.length];
}


function adjustColor(hex, amount) {
  hex = hex.replace('#', '');

  let r = parseInt(hex.substring(0, 2), 16) + amount;
  let g = parseInt(hex.substring(2, 4), 16) + amount;
  let b = parseInt(hex.substring(4, 6), 16) + amount;

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


function getTextColor(bgColor) {
  const r = parseInt(bgColor.substring(1, 3), 16);
  const g = parseInt(bgColor.substring(3, 5), 16);
  const b = parseInt(bgColor.substring(5, 7), 16);

  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  if (brightness > 160) {
    return adjustColor(bgColor, -60); // darker
  } else {
    return adjustColor(bgColor, 60); // lighter
  }
}


document.querySelectorAll('.team-avatar').forEach(el => {
  const userId = Number(el.dataset.userId) || 0;

  // Skip if user has image
  if (el.querySelector("img")) return;

  const bg = getColor(userId);
  const text = getTextColor(bg);

  el.style.backgroundColor = bg;
  el.style.color = text;
});

  window.TeamInviteModule = {
    init: teaminbxinit
  };

})();

