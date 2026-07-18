(function () {
let hoverTimeout = null;
let hideTimeout = null;
let isHoveringTrigger = false;
let isHoveringModal = false;



function getColor(id) {
  const colors = [
    '#FF6F61','#6B5B95','#88B04B','#F7CAC9',
    '#92A8D1','#955251','#B565A7','#009B77',
    '#DD4124','#45B8AC'
  ];
  return colors[id % colors.length];
}

function scheduleHide() {
  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    if (!isHoveringTrigger && !isHoveringModal) {
      hideActivity();
    }
  }, 150);
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

async function loadLeaderboardSprint() {

  const list = document.querySelector(".participants-list");
  const emptyMessage = document.querySelector(".empty-message");

  const topRankRow = document.querySelector(".top-rank-row");

  const rankNumber = document.querySelector(".rank-number");
  const rankAvatar = document.querySelector(".rank-avatar");
  const rankUsername = document.querySelector(".rank-username");
  const rankXp = document.querySelector(".rank-xp");
  const skeletonRows = Array.from({ length: 4 }).map(() => `
    <div class="lb-s-row">
      <div class="lb-s-rank shimmer"></div>
      <div class="lb-s-avatar shimmer"></div>
      <div class="lb-s-name shimmer" style="width: ${getRandomWidth()}px;"></div>
      <div class="lb-s-xp shimmer"></div>
    </div>
  `).join("");

  list.innerHTML = skeletonRows;
  const pathParts = window.location.pathname.split("/");
  const sprintId = pathParts[pathParts.length - 1];
  try {

    const res = await fetch(`/api/${communitySlug}/leaderboard/${sprintId}`);
    const data = await res.json();


    const users = data.leaderboard;
    const currentUser = data.current_user;
    const participantsCount = document.querySelector(".participants-count");

    if (participantsCount) {
      participantsCount.textContent = `${users.length} participants`;
    }
    // EMPTY LEADERBOARD
    if (!users || users.length === 0) {
      emptyMessage.style.display = "flex";
      list.style.display = "none";
      topRankRow.style.display = "none";
      return;
    }

    emptyMessage.style.display = "none";
    list.style.display = "flex";

    list.innerHTML = "";

    users.forEach(user => {

      const li = document.createElement("li");
      li.className = "participant-item";

      const hasImage = user.image && user.image.trim() !== "";
      const bg = getColor(user.user_id);
      const textColor = getTextColor(bg);
      li.innerHTML = `
          ${
            hasImage
              ? `<img src="${user.image}" class="participant-avatar" alt="${user.username}">`
              : `<div class="participant-avatar" style="background:${bg}; color:${textColor}; font-weight: 500;">${user.username[0].toUpperCase()}</div>`
          }

        <div class="participant-info">
          <span class="participant-name">${user.username}</span>
          <span class="participant-xp">${user.xp.toLocaleString()} XP</span>
        </div>
      `;

      list.appendChild(li);
      const avatar = li.querySelector(".participant-avatar");
      const name = li.querySelector(".participant-name");

      if (window.innerWidth > 767) {

        const delay = 300;

        function handleEnter(e) {
          isHoveringTrigger = true;

          clearTimeout(hoverTimeout);

          const position = {
            x: e.clientX,
            y: e.clientY
          };

          hoverTimeout = setTimeout(() => {
            showUserActivity(user.username, position);
          }, delay);
        }

        function handleLeave() {
          isHoveringTrigger = false;
          clearTimeout(hoverTimeout);
          scheduleHide();
        }

        li.addEventListener("mouseenter", handleEnter);
        li.addEventListener("mouseleave", handleLeave);

      } else {

        li.addEventListener("click", () => {
          showUserActivity(user.username);
        });

      }


    });

    if (currentUser) {

      topRankRow.style.display = "flex";

      rankNumber.textContent = `${currentUser.rank}.`;

      const hasImage = currentUser.image && currentUser.image.trim() !== "";
      const bg = getColor(currentUserId || 3);
      const textColor = getTextColor(bg);

      rankAvatar.innerHTML = hasImage
        ? `<img src="${currentUser.image}" alt="${currentUser.username}" class="rank-avatar">`
        : `
          <div class="rank-init"
              style="background:${bg}; color:${textColor}; font-weight:500;">
            ${currentUser.username[0].toUpperCase()}
          </div>
        `;
      rankAvatar.alt = currentUser.username;

      rankUsername.textContent = currentUser.username;

      rankXp.textContent = `${currentUser.xp.toLocaleString()} XP`;

    } else {

      topRankRow.style.display = "none";

    }


  } catch (err) {
    console.error("Leaderboard failed to load:", err);
  }

}

  
  const panel = document.getElementById('announcementPanel');
  const overlay = document.getElementById('mobileOverlay');
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  window.toggleAnnouncement=toggleAnnouncement
  function toggleAnnouncement() {
    if (window.innerWidth <= 991) {
      panel.classList.toggle('show');
      overlay.classList.toggle('active');

      // ✅ Add/remove scroll lock cleanly
      if (panel.classList.contains('show')) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }

      toggleIcon.classList.toggle('hidden');
    } else {
      panel.classList.toggle('show');
    }
  }

  function closeAnnouncement() {
    panel.classList.remove('show');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.querySelector('.toggle-icon').classList.remove('hidden');
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAnnouncement();
  });


  const detailsReward = panel?.querySelector(".details-reward");


  function closeAnnouncement() {
    panel.classList.remove("show");
    document.body.classList.remove("no-scroll");

    // 🔥 instantly reset scroll
    if (detailsReward) {
      detailsReward.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" // no animation
      });
    }
  }



  const dragHandle = document.getElementById("dragHandle");
  let startY = 0;
  let currentY = 0;
  let draggingY = false;

  dragHandle.addEventListener("touchstart", (e) => {
    e.preventDefault();
    draggingY = true;
    startY = e.touches[0].clientY;
  });

  dragHandle.addEventListener("touchmove", (e) => {
    if (!draggingY) return;

    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY > 0) {
      panel.style.transform = `translateY(${deltaY}px)`;
    }
  });

  dragHandle.addEventListener("touchend", () => {
    if (!draggingY) return;

    const deltaY = currentY - startY;
    draggingY = false;
    panel.style.transform = "";

    if (deltaY > 80) {
      closeAnnouncement(); // 🔥 scroll reset happens here
    }
  });



 
    function SprintIntiLeader() {
    function formatLocal(utcString) {
        const date = new Date(utcString);

        const month = date.toLocaleString(undefined, { month: "short" });
        const day = String(date.getDate()).padStart(2, "0");

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
    }

    // sprint date range
    const startEl = document.getElementById("timezone-start");
    const endEl = document.getElementById("timezone-end");

    if (startEl && endEl) {
        startEl.textContent = formatLocal(startEl.dataset.utc);
        endEl.textContent = formatLocal(endEl.dataset.utc);
    }

    const announcement = document.getElementById("announcementStatus");

    if (announcement) {
      const startRaw = announcement.dataset.start;
      const endRaw = announcement.dataset.end;

      const startDate = new Date(startRaw.endsWith("Z") ? startRaw : startRaw + "Z");
      const endDate = new Date(endRaw.endsWith("Z") ? endRaw : endRaw + "Z");

      const now = new Date();

      const start = formatLocal(startDate);
      const end = formatLocal(endDate);

      let status = "";

      if (now < startDate) {
        status = "Starting Soon";
      } else if (now >= startDate && now <= endDate) {
        status = "Currently Live";
      } else {
        status = "Sprint Ended";
      }

      announcement.textContent = `${status} · ${start} – ${end}`;
    }


    const countdownLabel = document.querySelector(".countdown-label");
    const countdown = document.getElementById("countdownTimer");


const start = new Date(startEl.dataset.utc);
const end   = new Date(endEl.dataset.utc);
    console.log(start)
    let intervalId;

    function updateCountdown() {
        const nowUTC = Date.now();
        let target;
        let label;

        if (nowUTC < start.getTime()) {
        target = start;
        label = "Starting in:";
        countdownLabel.textContent = label;
        } 
        else if (nowUTC < end.getTime()) {
        target = end;
        label = "Ends in:";
        countdownLabel.textContent = label;
        } 
        else {
        // ✅ SPRINT ENDED (HTML)
        countdownLabel.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,24H7.005a4.014,4.014,0,0,1-3.044-1.4,3.94,3.94,0,0,1-.917-3.158A12.522,12.522,0,0,1,7.445,12a12.522,12.522,0,0,1-4.4-7.444A3.94,3.94,0,0,1,3.961,1.4,4.014,4.014,0,0,1,7.005,0H17a4.017,4.017,0,0,1,3.044,1.4,3.943,3.943,0,0,1,.918,3.155A12.556,12.556,0,0,1,16.551,12a12.557,12.557,0,0,1,4.406,7.448,3.944,3.944,0,0,1-.918,3.156A4.017,4.017,0,0,1,17,24ZM17,2H7.005a2.015,2.015,0,0,0-1.528.7,1.921,1.921,0,0,0-.456,1.556c.376,2.5,1.924,4.84,4.6,6.957a1,1,0,0,1,0,1.568C6.945,14.9,5.4,17.242,5.021,19.741A1.921,1.921,0,0,0,5.477,21.3a2.015,2.015,0,0,0,1.528.7H17a2.014,2.014,0,0,0,1.528-.7,1.917,1.917,0,0,0,.456-1.554c-.373-2.487-1.92-4.829-4.6-6.962a1,1,0,0,1,0-1.564c2.681-2.133,4.228-4.475,4.6-6.963A1.916,1.916,0,0,0,18.523,2.7,2.014,2.014,0,0,0,17,2ZM15.681,20H8.318a1,1,0,0,1-.927-1.374,11.185,11.185,0,0,1,3.471-4.272l.518-.412a1,1,0,0,1,1.245,0l.509.406a11.3,11.3,0,0,1,3.473,4.276A1,1,0,0,1,15.681,20Zm-5.647-2h3.928A11.57,11.57,0,0,0,12,16,11.3,11.3,0,0,0,10.034,18Z"/>
            </svg>


            Sprint Ended
        `;

        countdownLabel.classList.add("ended")

        const wrapper = document.getElementById("countdownWrapper");
        if (wrapper && !wrapper.classList.contains("is-hidden")) {
            wrapper.classList.add("is-hidden");
            setTimeout(() => wrapper.remove(), 450);
        }

        clearInterval(intervalId);
        return;
        }

        const diff = target.getTime() - nowUTC;

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        const nums = countdown.querySelectorAll(".num");
        if (nums.length >= 4) {
        nums[0].textContent = String(days).padStart(2, "0");
        nums[1].textContent = String(hours).padStart(2, "0");
        nums[2].textContent = String(minutes).padStart(2, "0");
        nums[3].textContent = String(seconds).padStart(2, "0");
        }
    }

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);


    const wrapper = document.getElementById("edit-button-wrapper");
    if (!wrapper) return;

    let tooltip = document.createElement("span");
    tooltip.className = "tooltip-text";
    tooltip.textContent = "Edit";
    tooltip.style.opacity = "0";
    document.body.appendChild(tooltip);

    let visible = false;

    function positionTooltip() {
        if (!visible || !tooltip || !wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        if (!rect || tooltip.offsetHeight === 0) return;

        tooltip.style.top =
        `${rect.top - tooltip.offsetHeight - 8}px`;
        tooltip.style.left =
        `${rect.right - tooltip.offsetWidth}px`;
    }

    wrapper.addEventListener("mouseenter", () => {
        visible = true;
        positionTooltip();
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateY(0)";
    });

    wrapper.addEventListener("mouseleave", () => {
        visible = false;
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateY(4px)";
    });

    window.addEventListener("scroll", positionTooltip, true);
    window.addEventListener("resize", positionTooltip);

        function isMobile() {
        return window.innerWidth < 750;
        }


 
    const wrapperSpr = document.getElementById("edit-button-wrapper");
    if (!wrapperSpr) return; // no button in DOM

    const endDate = new Date(wrapperSpr.dataset.sprintEnd);
    const hasEnded = wrapperSpr.dataset.hasEnded === "true";

    // Hide immediately if backend already marked ended
    if (hasEnded) {
        wrapperSpr.remove();
        return;
    }



    // Timer check
    let timer; // ✅ declare before use
    function checkSprintEnded() {
        const now = new Date();
        if (now >= endDate) {
        wrapperSpr.remove();
        clearInterval(timer);
        }
    }

    checkSprintEnded(); // initial run
    timer = setInterval(checkSprintEnded, 10000); 
    }


const modal = document.getElementById("activity-modal");
const modalContent = modal.querySelector(".activity-content");
if(window.innerWidth >= 768) {

  modal.addEventListener("mouseenter", () => {
    isHoveringModal = true;
    clearTimeout(hideTimeout);
  });


  modal.addEventListener("mouseleave", () => {
    isHoveringModal = false;
    scheduleHide();
  });
} else {
  modal.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 767;

    if (isMobile && e.target === modal) {
      hideActivity();
    }
  });  
}



function timeAgo(date) {

  const parsedDate = new Date(date.endsWith("Z") ? date : date + "Z");

  const seconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);

  const intervals = [
    {label:"year", secs:31536000},
    {label:"month", secs:2592000},
    {label:"day", secs:86400},
    {label:"hour", secs:3600},
    {label:"minute", secs:60},
    {label:"second", secs:1}
  ];

  for (const i of intervals){
    const count = Math.floor(seconds / i.secs);
    if(count >= 1){
      return `${count}${i.label[0]} ago`;
    }
  }

  return "just now";
}

async function showUserActivity(username, position) {

  const isMobile = window.innerWidth <= 767;

  // 👉 show loader instantly
  modalContent.innerHTML = `
    <div class="activity-loading">
      ${fetchingSvg}
    </div>
  `;

  modal.classList.remove("hidden");

  // 👉 position only for desktop
  if (!isMobile && position) {
    const offset = 12;
    modal.style.top = position.y + window.scrollY + offset + "px";
    modal.style.left = position.x + offset + "px";
  }

  try {
    const res = await fetch(`/api/${communitySlug}/user/${username}/activity`);
    const data = await res.json();

    renderUserActivity(data, isMobile, position);

  } catch (err) {
    modalContent.innerHTML = `<div class="error">Failed to load</div>`;
  }
}



function renderUserActivity(data, isMobile, position) {

  modalContent.innerHTML = "";

  if (isMobile) {

    const progress = (data.current_xp / data.next_level_xp) * 100;

    modalContent.innerHTML = `
    <div class="mobile-user-card">

      <!-- 🔥 TOP BAR -->
      <div class="mobile-top-bar">
        <button class="back-btn-modalinit" id="activityBackBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"/>
          </svg> Back
        </button>
      </div>

      <!-- USER -->
      <div class="mobile-user-header">
        <img class="mobile-avatar"
            src="${data.image || 'https://i.pravatar.cc/80'}">

        <div class="mobile-user-meta">
          <div class="mobile-username">${data.username}</div>
        </div>
      </div>

      <!-- XP -->
      <div class="init-fillere">
        <div class="mobile-level-row">
          <span class="mobile-level-label">Level ${data.level}</span>
          <span class="mobile-level-progress">
            ${data.current_xp} / ${data.next_level_xp}XP
          </span>
        </div>

        <div class="xp-bar">
          <div class="xp-fill" style="width:${progress}%"></div>
        </div>
      </div>

      <!-- ROLES -->
      <div class="mobile-roles">
        <span class="role-core">${data.core_role}</span>

        ${data.extra_roles.map(r =>
          `<span class="role-extra" style="background:${r.color}">
            ${r.name}
          </span>`
        ).join("")}
      </div>

      <!-- ACTIVITY -->
      <div class="iner-llebei">
        <div class="recent-activity-title">
          Recent activity
        </div>

        ${
          data.activities.length === 0
            ? `<div class="no-activity">No activity yet</div>`
            : data.activities.map(act => {

                const actor = data.is_current_user ? "You" : data.username;

                return `
                <div class="activity-item">

                  <div class="activity-left">
                    <span class="activity-user">${actor}</span>
                    completed
                    <span class="activity-quest">${act.subquest_name}</span>
                    <span class="activity-time-inline">
                      ${timeAgo(act.completed_at)}
                    </span>
                  </div>

                  ${
                    act.xp !== null
                      ? `<div class="activity-xp">+${act.xp} XP</div>`
                      : ``
                  }

                </div>
                `;

              }).join("")
        }
      </div>

    </div>
    `;

    // ✅ attach back button AFTER render
    const backBtn = document.getElementById("activityBackBtn");
    if (backBtn) {
      backBtn.addEventListener("click", hideActivity);
    }

  } else {

    if (data.activities.length === 0) {

      const empty = document.createElement("div");
      empty.className = "no-activity";
      empty.textContent = "No activity yet";

      modalContent.appendChild(empty);

    } else {
      
      data.activities.forEach(act => {

        const text = data.is_current_user
          ? `You completed ${act.subquest_name}`
          : `${data.username} completed ${act.subquest_name}`;

        const div = document.createElement("div");
        div.className = "activity-item";

        div.innerHTML = `
          <div class="activity-left">
            ${text}
            <span class="activity-time-inline">
              ${timeAgo(act.completed_at)}
            </span>
          </div>

          ${
            act.xp !== null
              ? `<div class="activity-xp">+${act.xp} XP</div>`
              : ``
          }
        `;

        modalContent.appendChild(div);

      });

    }

  }
}


function hideActivity(){
  modal.classList.add("hidden");
}






function hideActivity(){
  modal.classList.add("hidden");
}
  loadLeaderboardSprint();

  window.SprintViewinit = {
    init: SprintIntiLeader
  };

})();