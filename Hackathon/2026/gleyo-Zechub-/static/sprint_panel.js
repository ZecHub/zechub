(function () {

  function getSprintUUIDFromURL() {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1];
  }
  function initEditSprintSave() {
    const saveBtn = document.getElementById("saveBtn");
    if (!saveBtn) return;

    saveBtn.addEventListener("click", async function (e) {
      e.preventDefault();

      const sprintUuid = getSprintUUIDFromURL();
      if (!sprintUuid) {
        showError("Invalid sprint ID.");
        return;
      }

      const payload = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        rewards: document.getElementById("rewards").value.trim(),
        end_zone: document.getElementById("end_zone").value || null,
        color: window.selectedColor || null,
        start_date: document.getElementById("start_date_iso").value,
        end_date: document.getElementById("end_date_iso").value
      };

      // simple guard
      if (!payload.title || !payload.start_date || !payload.end_date) {
        showError("Please fill all required fields.");
        return;
      }

      saveBtn.disabled = true;

      try {
        const res = await fetch(`/update_sprint/${sprintUuid}`, {
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
          showError(data.message || "Failed to update sprint.");
          return;
        }

        showSuccess("Sprint updated successfully.");

        // 🔥 redirect using SAME UUID from browser
        setTimeout(() => {
          loadMainSettingsSection(`/${communitySlug}/leaderboard/${sprintUuid}`);
        }, 400);

      } catch (err) {
        saveBtn.disabled = false;
        showError("Network error. Please try again.");
      }
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
      // ⭐ Premium users: full access

      // 🎨 Swatches
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



  const countdownWrapper = document.getElementById('countdownWrapper');
  const countdownTimer = document.getElementById('countdownTimer');
  const countdownLabel = document.querySelector('.countdown-label');
  function showCountdown() {
    const h = countdownWrapper.scrollHeight;

    countdownWrapper.style.setProperty("--h", `${h}px`);
    countdownWrapper.classList.remove("is-hidden");
    countdownWrapper.classList.add("show");
  }
  function hideCountdown() {
    countdownWrapper.classList.remove("show");
    countdownWrapper.classList.add("is-hidden");
  }

  function initSprintDatePickers() {
    /* ----------------------------------------------------
      ELEMENTS
    ---------------------------------------------------- */
    const startPreview = document.getElementById('timezone-start');
    const endPreview = document.getElementById('timezone-end');

    const startIsoInput = document.getElementById('start_date_iso');
    const endIsoInput = document.getElementById('end_date_iso');

    const startDisplayInput =
      document.querySelector('input[name="start_date_display"]');
    const endDisplayInput =
      document.querySelector('input[name="end_date_display"]');

    const timezoneLabel = document.querySelector('.timezone-label');

    // Countdown


    let countdownInterval = null;

    if (!startDisplayInput || !endDisplayInput) return;

    /* ----------------------------------------------------
      TIMEZONE LABEL
    ---------------------------------------------------- */
    if (timezoneLabel) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezoneLabel.textContent = `Timezone: ${tz}`;
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

    function updatePreview(el, date) {
      if (!el || !date) return;
      el.textContent = formatPreview(date);
      el.dataset.utc = date.toISOString();
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

  

    const startCalendar = document.getElementById("startCalendar");
    const startBox = document.getElementById("start_date");
    const EndBox = document.getElementById("end_date");


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

    /* -----------------------------------------
      CLOSE ON OUTSIDE CLICK
    ----------------------------------------- */
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
      FLATPICKR: END DATE
    ---------------------------------------------------- */
  
    function commitDate({ type, date }) {
      if (!(date instanceof Date)) return;
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
    /* ----------------------------------------------------
      INITIAL HYDRATION (EDIT MODE)
    ---------------------------------------------------- */
    function hydrateFromServer() {
      let startDate, endDate;

      const startUtc = startDisplayInput.dataset.utc;
      const endUtc   = endDisplayInput.dataset.utc;

      if (startUtc) {
        startDate = new Date(startUtc); // ← auto local TZ
        startDisplayInput.value = formatPreview(startDate);
        startIsoInput.value = formatLocalISO(startDate);
        updatePreview(startPreview, startDate);
      }

      if (endUtc) {
        endDate = new Date(endUtc);
        endDisplayInput.value = formatPreview(endDate);
        endIsoInput.value = formatLocalISO(endDate);
        updatePreview(endPreview, endDate);
      }

      if (startDate && endDate) {
        startCountdown(startDate, endDate);
      }
    }


    hydrateFromServer();

    window.addEventListener("calendar:select", (e) => {
      commitDate({
        type: activePicker,
        date: e.detail.date
      });
    });
  }




  function isMobile() {
    return window.innerWidth < 750;

  }

  function updateInfoBottomHeight() {
    const infoTop = document.querySelector('.info-top');
    const switchSprints = document.querySelector('.switch-between-sprints');
    const infoBottom = document.querySelector('.info-bottom');

    if (!infoBottom) return;

    const infoTopHeight = infoTop
      ? infoTop.getBoundingClientRect().height
      : 0;

    const switchHeight = switchSprints
      ? switchSprints.getBoundingClientRect().height
      : 0;

    let totalOffset;
    const fixedOffset = 80;

    if (isMobile()) {
      totalOffset = fixedOffset + infoTopHeight + switchHeight;   
    } else {

      totalOffset = fixedOffset + infoTopHeight + switchHeight;

    }

    infoBottom.style.height = `calc(100dvh - ${totalOffset}px)`;
  }


  function PAnelSprint() {
    const previewContainer = document.querySelector(".info-bottom");

    function renderLines(container, text) {
      container.innerHTML = "";

      const lines = text.split("\n");

      lines.forEach((lineText, index) => {
        const line = document.createElement("div");
        line.className = "line";
        line.textContent = lineText || "\u00A0"; // keep empty lines visible
        container.appendChild(line);
      });

      // Scroll to the LAST line that was just added
      const lastLine = container.lastElementChild;
      if (lastLine) {
        lastLine.scrollIntoView({
          block: "nearest",
          behavior: "auto" // immediate, no lag
        });
      }
    }

    // Rewards
    const rewardInput = document.getElementById("rewards");
    const previewReward = document.getElementById("previewReward");

    if (rewardInput && previewReward) {
      renderLines(
        previewReward,
        rewardInput.value || "Top 3 get $ZEC + Gleyo XP"
      );

      rewardInput.addEventListener("input", () => {
        renderLines(
          previewReward,
          rewardInput.value || "Top 3 get $ZEC + Gleyo XP"
        );
      });
    }

    // Description
    const descInput = document.getElementById("description");
    const previewDesc = document.getElementById("previewDescription");

    if (descInput && previewDesc) {
      renderLines(
        previewDesc,
        descInput.value ||
          "Complete daily quests and rise up the leaderboard. Get featured. Get rewarded."
      );

      descInput.addEventListener("input", () => {
        renderLines(
          previewDesc,
          descInput.value ||
            "Complete daily quests and rise up the leaderboard. Get featured. Get rewarded."
        );
      });
    }

  document.querySelectorAll('.delete-sprint-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const sprintId = button.dataset.sprintId;

      const response = await fetch(`/delete_sprint/${sprintId}`, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      const data = await response.json();
      const alertBox = document.getElementById('delete-alert');

      if (data.success) {
        // Optionally show success and reload
        alertBox.innerText = 'Sprint deleted successfully.';
        alertBox.className = 'delete-alert success';
        alertBox.style.display = 'block';

        setTimeout(() => location.reload(), 1000); // Refresh after 1s
      } else {
        alertBox.innerText = data.message;
        alertBox.className = 'delete-alert error';
        alertBox.style.display = 'block';
      }
    });
  });
  window.addEventListener('load', updateInfoBottomHeight);

  window.addEventListener('resize', updateInfoBottomHeight);

  const ro = new ResizeObserver(updateInfoBottomHeight);
  document
    .querySelectorAll('.info-top, .switch-between-sprints')
    .forEach(el => el && ro.observe(el));


  initOrionColorPicker();
  initSprintDatePickers();


    let selectedSprintId = null;

    const modal = document.getElementById("delete-modal");
    const cancelBtn = document.getElementById("cancel-delete");
    const confirmBtn = document.getElementById("confirm-delete");

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        selectedSprintId = this.getAttribute('data-id');
        modal.classList.remove("hidden");
      });
    });

    cancelBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      selectedSprintId = null;
    });

    confirmBtn.addEventListener("click", () => {
      if (!selectedSprintId) return;

      fetch(`/delete_sprint/${selectedSprintId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
      })
      .then(res => res.json())
      .then(data => {
        modal.classList.add("hidden");

        if (data.success) {

          // ✅ Show toast immediately (SPA style)
          showSuccess("Sprint deleted successfully");

          const path = `/${communitySlug}/leaderboard`;

          
          setTimeout(async () => {
            await refreshCommunityNav(communitySlug);
            loadMainSettingsSection(path);
          }, 300);

        } else {
          showError(data.message || "Failed to delete sprint.");
        }
      })
      .catch(err => {
        console.error(err);
        showError("An error occurred while deleting.");
      });
    });
  }


  function getElementSize(target) {
    const el = typeof target === "string"
      ? document.querySelector(target)
      : target;

    if (!el) return null;

    const rect = el.getBoundingClientRect();

    return {
      width: rect.width,
      height: rect.height
    };
  }


  const el = document.querySelector(".countdown-label");
  const size = getElementSize(el);

  console.log(size.width);
  console.log(size.height);  
  initEditSprintSave();

  window.SprintPanelsEdit = {
    init: PAnelSprint
  };

})();