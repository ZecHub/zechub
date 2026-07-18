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

function scheduleHide() {
  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    if (!isHoveringTrigger && !isHoveringModal) {
      hideActivity();
    }
  }, 150);
}



async function loadLeaderboard() {

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

  try {

    const res = await fetch(`/api/${communitySlug}/leaderboard`);
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



function showCountdown() {
  const countdownWrapper = document.getElementById('countdownWrapper');


  if (!countdownWrapper) return;
  const h = countdownWrapper.scrollHeight;
  countdownWrapper.style.setProperty("--h", `${h}px`);
  countdownWrapper.classList.remove("is-hidden");
  countdownWrapper.classList.add("show");
}

function hideCountdown() {
  const countdownWrapper = document.getElementById('countdownWrapper');

  if (!countdownWrapper) return;
  countdownWrapper.classList.remove("show");
  countdownWrapper.classList.add("is-hidden");
}

/* =====================================================
   MAIN INIT
===================================================== */
function initSprintDatePickers({
  startOffsetMinutes = 10,
  durationDays = 14
} = {}) {
  const countdownWrapper = document.getElementById('countdownWrapper');
  const countdownTimer = document.getElementById('countdownTimer');
  const countdownLabel = document.querySelector('.countdown-label');
  /* ----------------------------------------------------
     ELEMENTS
  ---------------------------------------------------- */
  const startPreview = document.getElementById('timezone-start');
  const endPreview   = document.getElementById('timezone-end');

  const startIsoInput = document.getElementById('start_date_iso');
  const endIsoInput   = document.getElementById('end_date_iso');

  const startDisplayInput =
    document.querySelector('input[name="start_date_display"]');
  const endDisplayInput =
    document.querySelector('input[name="end_date_display"]');

  const timezoneLabel = document.querySelector('.timezone-label');

  if (!startDisplayInput || !endDisplayInput) return;

  let countdownInterval = null;

  /* ----------------------------------------------------
     TIMEZONE LABEL
  ---------------------------------------------------- */
  if (timezoneLabel) {
    timezoneLabel.textContent =
      `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  }

  /* ----------------------------------------------------
     HELPERS
  ---------------------------------------------------- */
  function formatPreview(date) {
    return date.toLocaleString(undefined, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  function formatLocalISO(date) {
    const pad = n => String(n).padStart(2, '0');
    return (
      date.getFullYear() + '-' +
      pad(date.getMonth() + 1) + '-' +
      pad(date.getDate()) + 'T' +
      pad(date.getHours()) + ':' +
      pad(date.getMinutes())
    );
  }

  function updatePreview(el, date) {
    if (!el || !date) return;
    el.textContent = formatPreview(date);
    el.dataset.local = date.getTime(); // LOCAL timestamp only
  }

  /* ----------------------------------------------------
     COUNTDOWN
  ---------------------------------------------------- */
  function startCountdown(startDate, endDate) {
    if (!countdownTimer || !countdownLabel) return;

    if (countdownInterval) clearInterval(countdownInterval);

    function tick() {
      const now = new Date();
      let target;

      // 🔁 RESET STATE EVERY TICK
      countdownLabel.classList.remove("ended");
      countdownLabel.textContent = "";
      countdownLabel.innerHTML = "";

      if (now < startDate) {
        // 🟢 NOT STARTED
        target = startDate;
        countdownLabel.textContent = "Starting in:";

        showCountdown();

      } else if (now < endDate) {
        // 🔵 LIVE
        target = endDate;
        countdownLabel.textContent = "Ends in:";

        showCountdown();

      } else {
        // 🔴 ENDED
        countdownLabel.classList.add("ended");
        countdownLabel.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,24H7.005a4.014,4.014,0,0,1-3.044-1.4,3.94,3.94,0,0,1-.917-3.158A12.522,12.522,0,0,1,7.445,12a12.522,12.522,0,0,1-4.4-7.444A3.94,3.94,0,0,1,3.961,1.4,4.014,4.014,0,0,1,7.005,0H17a4.017,4.017,0,0,1,3.044,1.4,3.943,3.943,0,0,1,.918,3.155A12.556,12.556,0,0,1,16.551,12a12.557,12.557,0,0,1,4.406,7.448,3.944,3.944,0,0,1-.918,3.156A4.017,4.017,0,0,1,17,24ZM17,2H7.005a2.015,2.015,0,0,0-1.528.7,1.921,1.921,0,0,0-.456,1.556c.376,2.5,1.924,4.84,4.6,6.957a1,1,0,0,1,0,1.568C6.945,14.9,5.4,17.242,5.021,19.741A1.921,1.921,0,0,0,5.477,21.3a2.015,2.015,0,0,0,1.528.7H17a2.014,2.014,0,0,0,1.528-.7,1.917,1.917,0,0,0,.456-1.554c-.373-2.487-1.92-4.829-4.6-6.962a1,1,0,0,1,0-1.564c2.681-2.133,4.228-4.475,4.6-6.963A1.916,1.916,0,0,0,18.523,2.7,2.014,2.014,0,0,0,17,2ZM15.681,20H8.318a1,1,0,0,1-.927-1.374,11.185,11.185,0,0,1,3.471-4.272l.518-.412a1,1,0,0,1,1.245,0l.509.406a11.3,11.3,0,0,1,3.473,4.276A1,1,0,0,1,15.681,20Zm-5.647-2h3.928A11.57,11.57,0,0,0,12,16,11.3,11.3,0,0,0,10.034,18Z"/>
          </svg>
          Sprint Ended
        `;

        hideCountdown();
        clearInterval(countdownInterval);
        return;
      }

      // ⏱️ COUNTDOWN NUMBERS
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      const nums = countdownTimer.querySelectorAll(".num");
      if (nums.length === 4) {
        nums[0].textContent = String(days).padStart(2, "0");
        nums[1].textContent = String(hours).padStart(2, "0");
        nums[2].textContent = String(minutes).padStart(2, "0");
        nums[3].textContent = String(seconds).padStart(2, "0");
      }
    }

    tick();
    countdownInterval = setInterval(tick, 1000);
  }

  function syncCalendarFromInput(type) {
    const isoInput =
      type === "start" ? startIsoInput : endIsoInput;

    if (!isoInput || !isoInput.value) return;

    const d = new Date(isoInput.value);
    if (isNaN(d)) return;

    const state = window.calendarState;

    // 🔁 sync core state
    state.selected  = new Date(d);
    state.viewYear  = d.getFullYear();
    state.viewMonth = d.getMonth();

    // 🔁 sync time UI
    const hourInput = document.querySelector(".flatpickr-hour");
    const minuteEl  = document.querySelector(".flatpickr-minute");
    const amPmEl    = document.querySelector(".flatpickr-am-pm");

    const h24 = d.getHours();
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

    if (hourInput) hourInput.value = h12;
    if (minuteEl)  minuteEl.textContent = String(d.getMinutes()).padStart(2, "0");
    if (amPmEl)    amPmEl.textContent = h24 >= 12 ? "PM" : "AM";

    // 🔥 redraw calendar grid + header
    window.dispatchEvent(new CustomEvent("calendar:refresh"));
  }

  function commitDate({ type, date }) {
    if (!(date instanceof Date)) return;
    date = snapTo30Minutes(date);
    if (type === "start") {
      startDisplayInput.value = formatPreview(date);
      startIsoInput.value = formatLocalISO(date);
      updatePreview(startPreview, date);

      const endDate = endIsoInput.value
        ? new Date(endIsoInput.value)
        : null;

      if (endDate && endDate < date) {
        commitDate({ type: "end", date });
      }

      if (endDate) startCountdown(date, endDate);
    }

    if (type === "end") {
      endDisplayInput.value = formatPreview(date);
      endIsoInput.value = formatLocalISO(date);
      updatePreview(endPreview, date);

      const startDate = new Date(startIsoInput.value);
      startCountdown(startDate, date);
    }
  }


  /* -----------------------------------------
    CLOSE ON OUTSIDE CLICK
  ----------------------------------------- */

  /* ----------------------------------------------------
     OPEN PICKERS VIA BOX
  ---------------------------------------------------- */
  startDisplayInput.style.pointerEvents = 'none';
  endDisplayInput.style.pointerEvents = 'none';
  const startCalendar = document.getElementById("startCalendar");
  const startBox = document.getElementById("start_date");
  const EndBox = document.getElementById("end_date");

  document.addEventListener("click", (e) => {
    const target = e.target;

    const clickedInsideCalendar = startCalendar.contains(target);
    const clickedStartBox = startBox.contains(target);
    const clickedEndBox = EndBox.contains(target);

    if (!clickedInsideCalendar && !clickedStartBox && !clickedEndBox) {
      closeCalendar(startCalendar);
    }
  });




  let activePicker = "start";
  function toggleCalendar(triggerEl, calendarEl, type) {
    const isOpen = calendarEl.classList.contains("open");

    if (isOpen && activePicker === type) {
      // 🔁 same trigger → close
      closeCalendar(calendarEl);
      return;
    }

    // 🔄 switch or open
    activePicker = type;
    syncCalendarFromInput(type);
    window.openCalendar(triggerEl, calendarEl);
  }


  startBox.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCalendar(startBox, startCalendar, "start");
  });

  EndBox.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCalendar(EndBox, startCalendar, "end");
  });


  /* ----------------------------------------------------
     DEFAULT CREATION VALUES (OFFSET APPLIED LAST)
  ---------------------------------------------------- */
  const startDate = snapTo30Minutes(
    new Date(Date.now() + startOffsetMinutes * 60 * 1000)
  );

  const endDate = snapTo30Minutes(
    new Date(startDate.getTime() + durationDays * 86400000)
  );


 
  startIsoInput.value = formatLocalISO(startDate);
  endIsoInput.value   = formatLocalISO(endDate);

  updatePreview(startPreview, startDate);
  updatePreview(endPreview, endDate);

  startCountdown(startDate, endDate);
window.addEventListener("calendar:select", (e) => {
  commitDate({
    type: activePicker,
    date: e.detail.date
  });
});
}



function initLiveTextPreview() {

  function renderLines(container, text) {
    if (!container) return;

    container.innerHTML = "";

    const lines = text.split("\n");

    lines.forEach((lineText) => {
      const line = document.createElement("div");
      line.className = "line";
      line.textContent = lineText || "\u00A0"; // keep empty lines visible
      container.appendChild(line);
    });

    // Scroll to last line instantly
    const lastLine = container.lastElementChild;
    if (lastLine) {
      lastLine.scrollIntoView({
        block: "nearest",
        behavior: "auto"
      });
    }
  }

  /* =========================
     TITLE PREVIEW
  ========================== */
  const titleInput = document.getElementById("title");
  const previewTitle = document.getElementById("previewTitle");

  if (titleInput && previewTitle) {
    const defaultTitle = "Title";

    // Initial render
    previewTitle.textContent = titleInput.value || defaultTitle;

    titleInput.addEventListener("input", () => {
      previewTitle.textContent =
        titleInput.value.trim() || defaultTitle;
    });
  }

  /* =========================
     REWARDS PREVIEW
  ========================== */
  const rewardInput = document.getElementById("rewards");
  const previewReward = document.getElementById("previewReward");

  if (rewardInput && previewReward) {
    const defaultReward = "Top 3 get $ZEC + Gleyo XP";

    renderLines(previewReward, rewardInput.value || defaultReward);

    rewardInput.addEventListener("input", () => {
      renderLines(previewReward, rewardInput.value || defaultReward);
    });
  }

  /* =========================
     DESCRIPTION PREVIEW
  ========================== */
  const descInput = document.getElementById("description");
  const previewDesc = document.getElementById("previewDescription");

  if (descInput && previewDesc) {
    const defaultDesc =
      "Complete daily quests and rise up the leaderboard. Get featured. Get rewarded.";

    renderLines(previewDesc, descInput.value || defaultDesc);

    descInput.addEventListener("input", () => {
      renderLines(previewDesc, descInput.value || defaultDesc);
    });
  }
}

const INFO_SVG = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 354.796 354.796"
  width="20"
  height="20"
  fill="currentColor"
>
  <path d="M265.442,109.092c-10.602-4.25-13.665-6.82-13.665-11.461c0-3.714,2.813-8.053,10.744-8.053c7.015,0,12.395,2.766,12.443,2.79c0.566,0.302,1.201,0.463,1.83,0.463c1.535,0,2.893-0.929,3.456-2.367l1.927-4.926c0.671-1.795-0.347-3.359-1.645-3.92c-4.319-1.88-12.76-3.335-12.846-3.35c-0.136-0.024-0.609-0.125-0.609-0.678l-0.027-7.146c0-2.152-1.797-3.904-4.003-3.904h-3.457c-2.204,0-4,1.751-4,3.905l0.009,7.513c0,0.576-0.624,0.826-0.852,0.879c-10.655,2.538-17.314,10.343-17.314,20.188c0,12.273,10.145,17.819,21.099,21.982c8.757,3.438,12.329,6.924,12.329,12.037c0,5.564-5.059,9.45-12.307,9.45c-6.189,0-14.565-3.923-14.648-3.963c-0.536-0.254-1.104-0.382-1.688-0.382c-1.594,0-2.982,0.964-3.537,2.457l-1.84,4.982c-0.654,1.86,0.353,3.37,1.642,4.042c5.144,2.679,15.098,4.249,15.541,4.318c0.119,0.017,0.725,0.23,0.725,0.784v7.48c0,2.152,1.797,3.904,4.004,3.904h3.572c2.208,0,4.005-1.751,4.005-3.904v-7.872c0-0.736,0.543-0.801,0.655-0.828c11.351-2.55,18.343-10.855,18.343-21.283C285.325,121.518,279.377,114.597,265.442,109.092z"/>

  <path d="M260.979,22.509c-51.816,0-93.818,42.005-93.818,93.818c0,51.814,42.002,93.82,93.818,93.82c51.814,0,93.817-42.006,93.817-93.82C354.796,64.514,312.793,22.509,260.979,22.509zM260.979,188.404c-39.808,0-72.076-32.271-72.076-72.076s32.268-72.075,72.076-72.075c39.806,0,72.073,32.27,72.073,72.075s-32.267,72.076-72.073,72.076z"/>

  <path d="M335.733,255.61c-19.95,11.011-47.389,21.192-74.753,25.484c-24.346,3.818-70.148-5.39-70.148-16.265c0-4.121,40.17,10.154,64.469,3.671c18.633-4.971,15.988-22.401,5.853-24.7c-10.076-2.287-69.108-23.913-94.323-24.659c-11.878-0.351-41.203,4.131-55.393,6.442c-4.861,0.791-7.909,0.704-8.213,5.356c-1.412,21.62-4.195,65.832-5.712,88.926c-0.032,0.488,0.646,7.05,6.061,2.432c5.927-5.054,14.24-10.656,21.929-8.912c12.063,2.737,116.424,21.856,130.819,18.51c20.593-4.787,78.888-39.334,90.065-50.072C363.711,265.176,350.244,247.601,335.733,255.61z"/>

  <path d="M74.426,224.74l-54.672-2.694c-4.221-0.208-8.532,2.973-9.581,7.066l-9.941,90.255c-1.048,4.094,1.55,7.578,5.773,7.741l60.59-0.006c4.224,0.163,7.942-3.151,8.266-7.365l6.654-86.958C81.837,228.566,78.647,224.948,74.426,224.74zM42.24,315.145c-8.349,0-15.116-6.768-15.116-15.116c0-8.349,6.768-15.116,15.116-15.116s15.116,6.768,15.116,15.116c0,8.349-6.767,15.116-15.116,15.116z"/>
</svg>
`;



function isMobile() {
  return window.innerWidth < 750;
}



let paymentConfirmed = false;
let selectedOption = null;

function initPayDistributionUI() {
  const radios = document.querySelectorAll('input[name="distribution"]');
  const output = document.getElementById("distributionOutput");
  const saveBtn = document.querySelector('button[type="submit"]');
  const errorDiv = document.getElementById("paymentError");
  const rewardInfo = document.querySelector(".distribution-type-info");


  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      selectedOption = radio.value;
      paymentConfirmed = false;
      output.innerHTML = '';
      errorDiv.style.display = "none"; // Hide previous error

      if (radio.value === "pay_to_creator") {
        // Show Pay Now button
        output.innerHTML = `
          <button type="button" onclick="window.open('pay', '_blank')"
            style="margin-top: 15px;>
            Pay Now
          </button>
        `;
      rewardInfo.innerHTML = `
        <div class="reward-info-row Gleyo">
          <span class="reward-icon">${INFO_SVG}</span>
          <div class="reward-text">
            <span class="reward-label">Handled by</span>
            <strong>Gleyo</strong>
          </div>
        </div>
      `;

      } else if (radio.value === "self_distribute") {
        output.innerHTML = ``;
        rewardInfo.innerHTML = `
          <div class="reward-info-row Gleyo">
            <span class="reward-icon">${INFO_SVG}</span>
            <div class="reward-text">
              <strong class="reward-label">The community</strong>
            </div>
          </div>
        `;

      }
    });
  });
 
}



 


function createOrionDropdown() {
  const panel = document.createElement('div');
  panel.className = 'orion-dropdown-panel';
  panel.innerHTML = `
    <div class="orion-color-row">
      <div class="orion-swatch"  data-color="#ff4b4b" style="background-color: #ff4b4b;"></div>
      <div class="orion-swatch" data-color="#ff6e40" style="background-color: #ff6e40;"></div>
      <div class="orion-swatch" data-color="#f6d32d" style="background-color: #f6d32d;"></div>
      <div class="orion-swatch" data-color="#ff82ff" style="background-color: #ff82ff;"></div>
      <div class="orion-swatch" data-color="#ffb347" style="background-color: #ffb347;"></div>
    </div>

    <div class="orion-color-row">
      <div class="orion-swatch" data-color="#4285f4" style="background-color: #4285f4;"></div>
      <div class="orion-swatch" data-color="#4258f4" style="background-color: #4258f4;"></div>
      <div class="orion-swatch" data-color="#3eff91" style="background-color: #3eff91;"></div>
      <div class="orion-swatch" data-color="#1e13f1" style="background-color: #1e13f1;"></div>
      <div class="orion-swatch" data-color="#13a04c" style="background-color: #13a04c;"></div>
    </div>

    <div class="orion-color-row">
      <div class="orion-swatch" data-color="green" style="background-color: green;"></div>
      <div class="orion-swatch" data-color="#428" style="background-color: #428;"></div>
      <div class="orion-swatch" data-color="#cccccc" style="background-color: #cccccc;"></div>
      <div class="orion-swatch" data-color="#a8a8a8" style="background-color: #a8a8a8;"></div>
      <div class="orion-swatch" data-color="#fdfdfd" style="background-color: #fdfdfd;"></div>
    </div>

    <input type="hidden" id="orion-hidden-input" name="color" />
    <div class="orion-preview" id="orion-preview"></div>

    <div class="orion-hashtag-group">
      <div class="orion-hashtag-icon" id="orion-hashtag-icon">#</div>
      <input class="orion-text-input" id="orion-text-input" placeholder="#hex" maxlength="7" />
      <img class="orion-eyedropper-icon" id="orion-eyedropper-icon" title="Pick screen color" src="https://cdn-icons-png.flaticon.com/512/151/151933.png" />
    </div>

    <button type="button" class="orion-confirm-btn" id="orion-confirm-btn">Okay</button>
  `;
  return panel;
}

function positionDropdown(panel, anchor) {
  const rect = anchor.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const gap = 8;

  let top;

  if (viewportH - rect.bottom >= panelRect.height + gap) {
    top = rect.bottom + gap;
  } else if (rect.top >= panelRect.height + gap) {
    top = rect.top - panelRect.height - gap;
  } else {
    top = rect.bottom + gap;
  }

  let left = rect.left + rect.width / 2 - panelRect.width / 2;

  const minLeft = gap;
  const maxLeft = viewportW - panelRect.width - gap;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  const minTop = gap;
  const maxTop = viewportH - panelRect.height - gap;
  top = Math.max(minTop, Math.min(top, maxTop));

  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
}


  const isPremiumUntil = document.querySelector(".main-wrapper.badged")

  let isPremium = false
  if(isPremiumUntil) {
    isPremium= true
  } else {
    isPremium=false
  }
  



function bindOrionPickerEvents(picker) {
  let draftColor = null;

  const swatches = picker.querySelectorAll('.orion-swatch');
  const confirmBtn = picker.querySelector('#orion-confirm-btn');
  const preview = picker.querySelector('#orion-preview');
  const hiddenInput = picker.querySelector('#orion-hidden-input');
  const hashtagIcon = picker.querySelector('#orion-hashtag-icon');
  const colorInputField = picker.querySelector('#orion-text-input');
  const eyedropperIcon = picker.querySelector('#orion-eyedropper-icon');

  const previewHeader = document.querySelector('.preview-header');
  const previewContainer = document.querySelector('.preview-container');

  function setSprintColor(color) {
    document.documentElement.style.setProperty('--sprint-color', color);
    hiddenInput.value = color;
  }

  if (isPremium) {

    swatches.forEach((swatch) => {
      const color = swatch.getAttribute('data-color');

      swatch.addEventListener('click', () => {
        setSprintColor(color);

        // ✅ close ONLY because a color was chosen
        picker.classList.remove('is-open');
      });
    });


    confirmBtn.addEventListener('click', () => {
      if (draftColor) {
        setSprintColor(draftColor); 
        draftColor = null;
      }
      picker.classList.remove('is-open');
    });


    // Hashtag → Text input
    if (hashtagIcon && colorInputField) {
      hashtagIcon.addEventListener('click', () => {
        hashtagIcon.style.display = 'none';
        colorInputField.style.display = 'inline-block';
        colorInputField.focus();
        colorInputField.value = '#';
      });


    colorInputField.addEventListener('input', () => {
      let val = colorInputField.value;

      // 🛑 Always force leading #
      if (!val.startsWith('#')) {
        val = '#' + val.replace(/#/g, '');
      }

      // ⛔ Remove invalid characters
      val = '#' + val.slice(1).replace(/[^0-9a-fA-F]/g, '');

      // ⛔ Limit length (# + 6 chars)
      val = val.slice(0, 7);

      colorInputField.value = val;

      // ✅ Only accept valid hex
      if (/^#[0-9a-fA-F]{3,6}$/.test(val)) {
        draftColor = val;

        if (preview) preview.style.backgroundColor = val;
        if (previewHeader) previewHeader.style.backgroundColor = val;
        if (previewContainer) previewContainer.style.backgroundColor = val;
      }
    });


    colorInputField.addEventListener('keydown', (e) => {
      const cursorPos = colorInputField.selectionStart;

      // 🚫 Prevent backspace deleting #
      if (e.key === 'Backspace' && cursorPos <= 1) {
        e.preventDefault();
      }

      // 🚫 Prevent cursor going before #
      if (e.key === 'ArrowLeft' && cursorPos <= 1) {
        e.preventDefault();
      }
    });


    }

    // Eyedropper
    if (eyedropperIcon) {
      eyedropperIcon.addEventListener('click', async () => {
        if ('EyeDropper' in window) {
          try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            const pickedColor = result.sRGBHex;
            [preview, previewHeader, previewContainer].forEach(el => {
              setSprintColor(pickedColor);
            });
            if (hiddenInput) hiddenInput.value = pickedColor;
            if (colorInputField) {
              colorInputField.value = pickedColor;
              colorInputField.style.display = 'inline-block';
            }
            if (hashtagIcon) hashtagIcon.style.display = 'none';
          } catch (err) {
            console.warn('Eyedropper canceled:', err);
          }
        } else {
          alert('Eyedropper API not supported in this browser.');
        }
      });
    }

  } else {

    swatches.forEach(swatch => {
      swatch.classList.add('lock-base', 'lock-swatch');
      // 🔒 Disable click completely
      swatch.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
      }, true);
    });

    if (hashtagIcon) {
      hashtagIcon.classList.add('lock-base', 'lock-icon');
      hashtagIcon.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
      }, true);
    }

    if (colorInputField) {
      colorInputField.disabled = true;
    }

    if (eyedropperIcon) {
      eyedropperIcon.classList.add('lock-base', 'lock-icon');
      eyedropperIcon.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
      }, true);
    }

    if (confirmBtn) {
      confirmBtn.classList.add('lock-base', 'lock-btn');
      confirmBtn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
      }, true);
    }
  }


}



function initOrionColorPicker() {
  const toggle = document.getElementById('orion-toggle-picker');
  if (!toggle) return;


  toggle.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!picker) {
      picker = createOrionDropdown();
      document.body.appendChild(picker);
      bindOrionPickerEvents(picker);

      // 🔥 THIS LINE FIXES EVERYTHING
      picker.addEventListener('click', e => e.stopPropagation());
    }
    const calendarPickr = document.querySelector(".flatpickr-calendar.open");
    if (calendarPickr) {
      calendarPickr.classList.remove("open");
    }
    picker.classList.toggle('is-open');
    positionDropdown(picker, toggle);
  });

  document.addEventListener('click', (e) => {
    if (!picker || !picker.classList.contains('is-open')) return;
    picker.classList.remove('is-open');
  });


  window.addEventListener('resize', () => {
    if (picker?.classList.contains('is-open')) {
      positionDropdown(picker, toggle);
    }
  });
}










function snapTo30Minutes(date) {
  const d = new Date(date);

  d.setSeconds(0, 0);

  const m = d.getMinutes();

  if (m < 15) {
    d.setMinutes(0);
  } else if (m < 45) {
    d.setMinutes(30);
  } else {
    d.setMinutes(0);
    d.setHours(d.getHours() + 1);
  }

  return d;
}



function initSprintDates({
  startOffsetMinutes = 10,
  durationDays = 14
} = {}) {

  const startDisplay = document.querySelector('[name="start_date_display"]');
  const endDisplay = document.querySelector('[name="end_date_display"]');
  const startISO = document.getElementById('start_date_iso');
  const endISO = document.getElementById('end_date_iso');
  const tzLabel = document.querySelector('.timezone-label');

  const previewStart = document.getElementById('timezone-start');
  const previewEnd = document.getElementById('timezone-end');

  if (!startISO || !endISO) return;

  const now = new Date();

  // ✅ Offset REALLY applied
  const startDate = new Date(now.getTime() + startOffsetMinutes * 60 * 1000);
  const endDate = new Date(
    startDate.getTime() + durationDays * 24 * 60 * 60 * 1000
  );

  const displayFormat = (date) =>
    date.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

  const previewFormat = (date) =>
    date.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

  const isoFormatLocal = (date) => {
    const pad = (n) => String(n).padStart(2, "0");
    return (
      date.getFullYear() + "-" +
      pad(date.getMonth() + 1) + "-" +
      pad(date.getDate()) + "T" +
      pad(date.getHours()) + ":" +
      pad(date.getMinutes())
    );
  };

  // Inputs
  if (startDisplay) startDisplay.value = displayFormat(startDate);
  if (endDisplay) endDisplay.value = displayFormat(endDate);

  // Backend-safe (LOCAL time)
  startISO.value = isoFormatLocal(startDate);
  endISO.value = isoFormatLocal(endDate);

  // Preview
  if (previewStart) previewStart.textContent = previewFormat(startDate);
  if (previewEnd) previewEnd.textContent = previewFormat(endDate);

  if (tzLabel) {
    tzLabel.textContent =
      "Timezone: " + Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}

  function createSprint(prefillData = null) {
    const url = new URL(window.location.href);
    url.searchParams.set("open", "sprint");
    history.replaceState({}, "", url);

    const isMobile = window.innerWidth <= 991;

    if (isMobile) {
      let url = `/sprint_create?community_id=${communityId}`;
   

      fetch(url, { credentials: 'include' })
        .then(r => {
          if (!r.ok) throw new Error("Failed to load sprint_create");
          return r.text();
        })
        .then(html => {
          const wrapper = document.querySelector('.main-wrapper');
          wrapper.innerHTML = html;

        initOrionColorPicker();
        initSprintDates();
        initSprintDatePickers();
        initLiveTextPreview();
        initPayDistributionUI();



        })
        .catch(err => {
          console.error("❌ Mobile sprint error:", err);
          alert("Could not load sprint planner.");
        });

      return; // stop desktop logic
    }



    const panel = document.getElementById('rightPanel');
    const leftPanel = document.getElementById('leftPanel');

    document.querySelector('.main-wrapper').classList.add('sprint-mode');

    if (window.innerWidth <= 900) {
      document.querySelector('.main-wrapper').style.flexDirection = 'column';
      panel.style.borderRadius = '0';
    }

    panel.classList.add('fade-out');
    panel.classList.add('sprint-mode');

    setTimeout(() => {
  
      let url = `/sprint_create?community_id=${communityId}`;
   

      console.log("🔍 Sprint fetch URL:", url);

      Promise.all([
        fetch(url).then(r => { if (!r.ok) throw new Error("Failed to load sprint_create"); return r.text(); }),
        fetch('/live_view').then(r => { if (!r.ok) throw new Error("Failed to load live_view"); return r.text(); })
      ])
      .then(([sprintHtml, liveHtml]) => {
        panel.innerHTML = sprintHtml;
        panel.classList.remove('fade-out');

        leftPanel.innerHTML = liveHtml;

   
        initOrionColorPicker();
        initSprintDates();
        initSprintDatePickers();
        initLiveTextPreview();
        initPayDistributionUI();
        Savehanler();

        setupSprintValidation();
        


      })
      .catch(err => {
        alert("Failed to load sprint planner.");
        console.error("❌ Load Error:", err);
      });

    }, 300);



  }


  function setupSprintValidation() {
    const saveBtn = document.getElementById("saveBtn");
    if (!saveBtn) return;

    const titleInput = document.getElementById("title");
    const startDateInput = document.getElementById("start_date_iso");
    const endDateInput = document.getElementById("end_date_iso");
    const distributionInputs = document.querySelectorAll('input[name="distribution"]');

    function validateForm() {
      const title = titleInput.value.trim();
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;

      // if distribution exists (only when not paid)
      const distributionRequired = distributionInputs.length > 0;
      const distributionChecked = document.querySelector('input[name="distribution"]:checked');

      const isValid =
        title &&
        startDate &&
        endDate &&
        (!distributionRequired || distributionChecked);

      if (isValid) {
        saveBtn.classList.remove("disable");
      } else {
        saveBtn.classList.add("disable");
      }
    }

    // Listen to changes
    titleInput.addEventListener("input", validateForm);
    startDateInput.addEventListener("change", validateForm);
    endDateInput.addEventListener("change", validateForm);
    distributionInputs.forEach(radio =>
      radio.addEventListener("change", validateForm)
    );

    validateForm();
  }

  function Savehanler() {
    const SaveBtn = document.getElementById("saveBtn");
    if (!SaveBtn) return;

    SaveBtn.addEventListener("click", async function () {

      const saveBtn = this;
      if (saveBtn.disabled || saveBtn.classList.contains("disable")) {
        return;
      }

      const payload = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        rewards: document.getElementById("rewards").value.trim(),
        end_zone: document.getElementById("end_zone").value || null,
        color: window.selectedColor || null,
        distribution: document.querySelector('input[name="distribution"]:checked')?.value || null,
        start_date: document.getElementById("start_date_iso").value,
        end_date: document.getElementById("end_date_iso").value
      };

      saveBtn.disabled = true;

      try {
        const res = await fetch(`/${communitySlug}/sprints/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        saveBtn.disabled = false;

        if (!res.ok) {
          showError(data.message || "Something went wrong.");
          return;
        }

        showSuccess(data.message || "Sprint created successfully.");

        setTimeout(async () => {

          await refreshCommunityNav(communitySlug); 

          loadMainSettingsSection(data.redirect_url);

        }, 700);

      } catch (err) {
        saveBtn.disabled = false;
        showError("Network error. Please try again.");
      }
    });
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
      <div class="p">
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




function checkOpenSprintFromURL() {
  const params = new URLSearchParams(window.location.search);
  __CURRENT_PATH__ = null;
  const open = params.get("open");

  if (open === "sprint") {
    createSprint();
  }
}



  checkOpenSprintFromURL();
  window.createSprint = createSprint;
  window.LeaderboardModule = {
    init: loadLeaderboard
  };

})();


