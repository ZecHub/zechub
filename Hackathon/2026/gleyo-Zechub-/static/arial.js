(function () {
let controller = null;

let selectedSprint = null;
function getUuidsFromUrl() {
  const parts = window.location.pathname.split('/').filter(Boolean);

  return {
    quest_uuid: parts[3],
    subquest_uuid: parts[4]
  };
}

window.__SPRINT_DATA__ =  {
  id: null,
  name: ""
}

function restoreSelectedSprint() {

  const sprintListBtn = document.querySelector(".sprint-list");
  if (!sprintListBtn) return;

  const sprintId = sprintListBtn.dataset.initr;
  if (!sprintId) return;

  const text = sprintListBtn.textContent.trim();

  if (!text.startsWith("Sprint:")) return;

  const sprintName = text.replace("Sprint:", "").trim();

  selectedSprint = {
    id: sprintId,
    name: sprintName
  };

}



  function openCustomDatePicker(triggerEl, onSelect) {

    const calendarEl = document.querySelector("#startCalendar");
    if (!calendarEl) return;

    /* ===== 🔁 TOGGLE GATE ===== */
    if (calendarEl.classList.contains("open")) {
      closeCalendar(calendarEl);
      activeCalendarTarget = null;
      return; // ⛔ stop execution (toggle close)
    }

    activeCalendarTarget = { triggerEl, onSelect };

    /* ===============================
      🔁 SYNC FROM VALUE TEXT
    =============================== */
    const valueTextEl = triggerEl.querySelector(".valueText");

    if (valueTextEl && valueTextEl.textContent.trim()) {
      const raw = valueTextEl.textContent.trim();

      // expects: "03 Feb 00:00 2026"
      const parsed = parseDisplayDate(raw);

      if (parsed && !isNaN(parsed)) {
        const state = window.calendarState;

        // core state
        state.selected  = new Date(parsed);
        state.viewYear  = parsed.getFullYear();
        state.viewMonth = parsed.getMonth();

        // time UI
        const hourInput = document.querySelector(".flatpickr-hour");
        const minuteEl  = document.querySelector(".flatpickr-minute");
        const amPmEl    = document.querySelector(".flatpickr-am-pm");

        const h24 = parsed.getHours();
        const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
        const ampm = h24 >= 12 ? "PM" : "AM";

        if (hourInput) hourInput.value = h12;
        if (minuteEl)  minuteEl.textContent = String(parsed.getMinutes()).padStart(2, "0");
        if (amPmEl)    amPmEl.textContent = ampm;

        /* 🔥 STATE-DRIVEN SYNC */
        updateTime({
          hours: h12,
          minutes: parsed.getMinutes(),
          ampm: ampm
        });

        // redraw calendar (month + active day)
        window.dispatchEvent(new CustomEvent("calendar:refresh"));
      }
    }

    /* ===============================
      📍 OPEN PICKER
    =============================== */
    window.openCalendar(triggerEl, calendarEl);
  }
    
  function positionDropdown(dropdownEl) {
    const rect = dropdownEl.getBoundingClientRect();
    const dropdownHeight = dropdownEl.offsetHeight;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      dropdownEl.style.top = "auto";
      dropdownEl.style.bottom = "100%"; // 👈 flip above
    } else {
      dropdownEl.style.bottom = "auto";
      dropdownEl.style.top = "100%";    // 👈 drop below
    }
  }

  function parseDisplayDate(str) {
    // "03 Feb 00:00 2026"
    const parts = str.split(" ");
    if (parts.length !== 4) return null;

    const [day, mon, time, year] = parts;
    const [hh, mm] = time.split(":");

    const months = {
      Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
      Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
    };

    if (!(mon in months)) return null;

    return new Date(
      Number(year),
      months[mon],
      Number(day),
      Number(hh),
      Number(mm),
      0,
      0
    );
  }

function formatDisplayDate(date) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${String(date.getDate()).padStart(2, "0")} ${
    months[date.getMonth()]
  } ${hours}:${minutes} ${date.getFullYear()}`;
}

window.addEventListener("calendar:select", (e) => {
  if (!activeCalendarTarget) return;

  const d = e.detail.date;

  const formatted = formatDisplayDate(d);

  activeCalendarTarget.onSelect(d, formatted);
});

getUuidsFromUrl();

const {quest_uuid, subquest_uuid } = getUuidsFromUrl();

  const counterSpan = document.querySelector('.title span');
  
  const maxTasks = 5;

  function updateCounter() {
    const count = uniqueItems.children.length;
    counterSpan.textContent = `(${count} / ${maxTasks})`;
    const addBtn = document.getElementById('addTaskBtn');

    if (count >= maxTasks) {
      addBtn.classList.add("disabled-task-btn");
      addBtn.style.pointerEvents = "none";  
    } else {
      addBtn.classList.remove("disabled-task-btn");
      addBtn.style.pointerEvents = "auto";
    }
    validateForm();
  }


REWARD_ICONS = {
 ALL: `
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4285f4">
          <path
            d="M232,128.00037A104.11767,104.11767,0,0,0,128.042,24.00086L128,23.96423l-.042.03663a103.99952,103.99952,0,0,0-.001,207.999l.043.0376.043-.0376A104.11763,104.11763,0,0,0,232,128.00037Zm-16.36768-8h-39.853c-1.5918-29.637-12.01123-57.01758-29.5044-78.08643A88.1919,88.1919,0,0,1,215.63232,120.00037Zm-119.37353,16h63.48242C157.93164,164.75623,146.44678,191.703,128,210.44177,109.55322,191.703,98.06836,164.75623,96.25879,136.00037Zm0-16C98.06836,91.24353,109.55322,64.29675,128,45.559c18.44678,18.73779,29.93164,45.68457,31.74121,74.44141Zm50.01562,94.08642c17.49317-21.06933,27.9126-48.45044,29.50489-78.08642h39.853A88.19181,88.19181,0,0,1,146.27441,214.08679Z"
            fill="#4285f4"
          />
        </svg>

    `,

    FCFS: `
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" style="flex-shrink: 0"
            width="16"
            height="16"
            fill="#e67e22"
            stroke="#e67e22"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round">
        <path d="M13 3 
                C12.6 2.5,12 2.5,11.7 3 
                L5.5 12.2 
                C5.2 12.7,5.5 13.3,6 13.3 
                H10 
                V21 
                C10 21.5,10.7 21.7,11.1 21.3 
                L18.2 12.3 
                C18.6 11.8,18.3 11.2,17.7 11.2 
                H13 
                V3 Z"/>
        </svg> 
    `,

    RAFFLE: `
        "svg": """
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
     width="16"
     height="16">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M14.0079 19.0029L14.0137 17C14.0137 16.4477 14.4625 16 15.0162 16C15.5698 16 16.0187 16.4477 16.0187 17V18.9765C16.0187 19.458 16.0187 19.6988 16.1731 19.8464C16.3275 19.9941 16.5637 19.984 17.0362 19.964C18.8991 19.8852 20.0437 19.6332 20.8504 18.8284C21.6591 18.0218 21.911 16.8766 21.9894 15.0105C22.005 14.6405 22.0128 14.4554 21.9437 14.332C21.8746 14.2085 21.5987 14.0545 21.0469 13.7463C20.4341 13.4041 20.0199 12.7503 20.0199 12C20.0199 11.2497 20.4341 10.5959 21.0469 10.2537C21.5987 9.94554 21.8746 9.79147 21.9437 9.66803C22.0128 9.54458 22.005 9.35954 21.9894 8.98947C21.911 7.12339 21.6591 5.97823 20.8504 5.17157C19.9727 4.29604 18.6952 4.0748 16.5278 4.0189C16.2482 4.01169 16.0187 4.23718 16.0187 4.51618V7C16.0187 7.55228 15.5698 8 15.0162 8C14.4625 8 14.0137 7.55228 14.0137 7L14.0064 4.49855C14.0056 4.22298 13.7814 4 13.5052 4H9.99502C6.21439 4 4.32407 4 3.14958 5.17157C2.34091 5.97823 2.08903 7.12339 2.01058 8.98947C1.99502 9.35954 1.98724 9.54458 2.05634 9.66802C2.12545 9.79147 2.40133 9.94554 2.95308 10.2537C3.56586 10.5959 3.98007 11.2497 3.98007 12C3.98007 12.7503 3.56586 13.4041 2.95308 13.7463C2.40133 14.0545 2.12545 14.2085 2.05634 14.332C1.98724 14.4554 1.99502 14.6405 2.01058 15.0105C2.08903 16.8766 2.34091 18.0218 3.14958 18.8284C4.32407 20 6.21438 20 9.99502 20H13.0054C13.4767 20 13.7124 20 13.8591 19.8541C14.0058 19.7081 14.0065 19.4731 14.0079 19.0029ZM16.0187 13V11C16.0187 10.4477 15.5698 10 15.0162 10C14.4625 10 14.0137 10.4477 14.0137 11V13C14.0137 13.5523 14.4625 14 15.0162 14C15.5698 14 16.0187 13.5523 16.0187 13Z"
        fill="#8B5CF6"
      />
    </svg>
  `,


    VOTE: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(0, 255, 0)"
            width="16"
            height="16" class="reward-icons" >
          <g transform="scale(0.0375)">
            <path d="M144 224C161.7 224 176 238.3 176 256L176 512C176 529.7 161.7 544 144 544L96 544C78.3 544 64 529.7 64 512L64 256C64 238.3 78.3 224 96 224L144 224zM334.6 80C361.9 80 384 102.1 384 129.4L384 133.6C384 140.4 382.7 147.2 380.2 153.5L352 224L512 224C538.5 224 560 245.5 560 272C560 291.7 548.1 308.6 531.1 316C548.1 323.4 560 340.3 560 360C560 383.4 543.2 402.9 521 407.1C525.4 414.4 528 422.9 528 432C528 454.2 513 472.8 492.6 478.3C494.8 483.8 496 489.8 496 496C496 522.5 474.5 544 448 544L360.1 544C323.8 544 288.5 531.6 260.2 508.9L248 499.2C232.8 487.1 224 468.7 224 449.2L224 262.6C224 247.7 227.5 233 234.1 219.7L290.3 107.3C298.7 90.6 315.8 80 334.6 80z"/>
          </g>
        </svg>
  `,



};


function clearValue(btn) {
  btn.parentElement.querySelector('input').value = '';
}

function stepValue(btn, step) {
  const input = btn.closest('.number-input-wrapper').querySelector('input');
  let val = parseInt(input.value) || 0;
  val += step;
  const min = input.min ? parseInt(input.min) : -Infinity;
  const max = input.max ? parseInt(input.max) : Infinity;
  if (val >= min && val <= max) {
    input.value = val;
  }
}


window.previewSubquest = previewSubquest
window.updateCounter = updateCounter
window.stepValue = stepValue
window.closePreview = closePreview
window.publishSubquest = publishSubquest
window.clearValue = clearValue




    function renderReward(r) {
   const rewardParent = document.getElementById("rewardContainerParent");
    if (!rewardParent) return;
        const wrapper = document.createElement("div");
        wrapper.classList.add("rewardContainerWrapper");
        const typeKey = r.reward_type.toLowerCase();
        wrapper.dataset.rewardType = typeKey;

        let typeContent = "";
    const svgIcon = svgMap[typeKey]
        ? svgMap[typeKey]
        : ``;
        if (typeKey === "role") {
            typeContent = `${svgIcon}
                           <span class="identifyerrole">${r.reward_data.role || ""}</span>`;
        } else if (typeKey === "xp") {
            typeContent = `${svgIcon}
                          <span class="identifyerxp">${r.reward_data.amount || 0}</span> 
                          <span>XP</span>`;
        }


        const distTypeRaw = r.distribution_type || "ALL";

        // Normalize display text
        let distTypeDisplay = distTypeRaw;
        if (distTypeRaw !== "FCFS") {
            distTypeDisplay = distTypeRaw.charAt(0) + distTypeRaw.slice(1).toLowerCase();
        }
        const rewardSVG =
          REWARD_ICONS[r.distribution_type?.toUpperCase()] ||
          REWARD_ICONS["ALL"];

        wrapper.innerHTML = `
          <div class="rewardsec reward-actions" style="font-size:14px; font-weight:bold;">
            <span class="reward-item reward-display" style="gap:3px;">
              ${typeContent}
            </span>
            <span class="divider"></span>
            <span class="reward-item reward-type" style="display: flex; align-items: center; gap: 4px;">
              
             ${rewardSVG} ${distTypeDisplay}
            </span>
            <span class="divider"></span>
            <span class="reward-item delete-reward" style="color:var(--text-muted);cursor:pointer;">
              <svg width="16" height="16" class="triggerDeletePopup" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Trash lid -->
                <path d="M20.5 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

                <!-- Trash body -->
                <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>

                <!-- Trash handle/body curve -->
                <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

                <!-- Two vertical bars -->
                <line x1="10" y1="9" x2="10" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
                <line x1="14" y1="9" x2="14" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
              </svg>
            </span>
          </div>

        `;

        



        if (typeKey === "role") {
            const rewardDisplay = wrapper.querySelector(".reward-display");
            const discordConnected = "{{ 'true' if discord_connected else 'false' }}" === "true";

            if (discordConnected) {
                // ✅ Build dropdown
                const tmpl = document.getElementById("roleSelectTemplate");
                const roleDropdown = tmpl.content.firstElementChild.cloneNode(true);
                const roleList = roleDropdown.querySelector(".role-list");

                // toggle dropdown on click
                rewardDisplay.addEventListener("click", (e) => {
                    e.stopPropagation();
                    roleDropdown.style.display =
                        roleDropdown.style.display === "block" ? "none" : "block";
                });
              

                // select role
                roleDropdown.querySelectorAll(".role-item").forEach((item) => {
                    item.addEventListener("click", () => {
                        rewardDisplay.innerHTML = `
                          ${svgIcon}
                          <span class="identifyerrole">${item.textContent.trim()}</span>
                        `;
                        roleDropdown.style.display = "none";
                    });
                });


              const searchInput = roleDropdown.querySelector(".serachesing");

                    searchInput.addEventListener("input", () => {
                      const filter = searchInput.value.toLowerCase();
                      let anyVisible = false;

                      roleList.querySelectorAll(".role-item").forEach(item => {
                          if (item.classList.contains("disabled")) return;

                          const text = item.textContent.toLowerCase();
                          if (text.includes(filter)) {
                              item.style.display = "";
                              anyVisible = true;
                          } else {
                              item.style.display = "none";
                          }
                      });
                      let noRoleItem = roleList.querySelector(".role-item.disabled");
                      if (!noRoleItem) {
                          noRoleItem = document.createElement("li");
                          noRoleItem.className = "role-item disabled";
                          noRoleItem.textContent = "No roles found";
                          noRoleItem.style.display = "none";
                          roleList.appendChild(noRoleItem);
                      }
                      noRoleItem.style.display = anyVisible ? "none" : "";
                  });

                wrapper.appendChild(roleDropdown);
            } else {
                // 🚫 Not connected → show popup
                rewardDisplay.addEventListener("click", (e) => {
                    e.stopPropagation();
                    showDiscordPopup();
                });
            }
        }
        // ---- CUSTOM SPECIFIC LOGIC HERE ----
        if (typeKey === "custom") {
            const rewardDisplay = wrapper.querySelector(".reward-display");

            // Show default icon + label
            rewardDisplay.innerHTML = `
              ${svgIcon}
              <span class="customtextspan" style="${r.reward_data.text ? '' : 'display:none;'}"> ${r.reward_data.text || ""}</span>
            `;
            rewardDisplay.style.display = "flex";
            rewardDisplay.style.alignItems = "center";

            // Clone template
            const template = document.getElementById("customTemplate");
            const customBody = template.content.firstElementChild.cloneNode(true);

            if (customBody) {
                wrapper.appendChild(customBody);
                customBody.style.display = "none";
                customBody.style.position = "absolute";
                wrapper.style.position = "relative";

                // Positioning
                const positionDropdown = () => {
                    const rect = rewardDisplay.getBoundingClientRect();
                    const dropdownHeight = customBody.offsetHeight || 150;
                    const spaceBelow = window.innerHeight - rect.bottom;
                    const spaceAbove = rect.top;

                    if (spaceBelow >= dropdownHeight) {
                        customBody.style.top = rect.height + "px";
                    } else if (spaceAbove >= dropdownHeight) {
                        customBody.style.top = -dropdownHeight + "px";
                    } else {
                        customBody.style.top = Math.max(
                            -spaceAbove,
                            Math.min(spaceBelow, rect.height)
                        ) + "px";
                    }
                    customBody.style.left = "0px";
                };

                const showDropdown = () => {
                    positionDropdown();
                    customBody.style.display = "block";
                    const textarea = customBody.querySelector("textarea.customtext");
                    if (textarea) textarea.focus();
                };
                const hideDropdown = () => (customBody.style.display = "none");

                // Toggle on badge click
                rewardDisplay.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (customBody.style.display === "block") hideDropdown();
                    else showDropdown();
                });

                // Live update badge text
                const textarea = customBody.querySelector("textarea.customtext");
                if (textarea) {
                    const textSpan = rewardDisplay.querySelector(".customtextspan");
                    textarea.value = r.reward_data.text || "";
                    textarea.addEventListener("input", () => {
                        if (textarea.value.trim()) {
                            textSpan.textContent = textarea.value.trim();
                            textSpan.style.display = "inline"; // show text if not empty
                        } else {
                            textSpan.textContent = "";
                            textSpan.style.display = "none";   // hide text span when empty
                        }
                    });
                }

                // Click outside to close
                const handleClickOutside = (e) => {
                    if (!wrapper.contains(e.target)) hideDropdown();
                };
                document.addEventListener("click", handleClickOutside);

                // Clean up if deleted
                wrapper.querySelector(".delete-reward").addEventListener("click", () => {
                    document.removeEventListener("click", handleClickOutside);
                    wrapper.remove();
                    updateRewardColumnState();

                });

                // Auto-show when first added
                
                if (!r.reward_data.text) {
                    showDropdown();
                }
            }
        }
    
        else if (typeKey === "token") {
          const rewardDisplay = wrapper.querySelector(".reward-display");

          rewardDisplay.innerHTML = `
            ${svgIcon}
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
              <circle cx="12" cy="12" r="9" fill="#F3B724"/>
              <polyline points="9 9 15 9 9 15 15 15" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              <line x1="12" y1="7" x2="12" y2="9" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
              <line x1="12" y1="15" x2="12" y2="17" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
            </svg>
            <span class="amount-text" style="font-size:.78rem;font-weight:600;">${r.reward_data.amount_per_winner || '—'}</span>
            <span style="color:#F4B728;font-size:.7rem;font-weight:700;margin-left:3px;">ZEC</span>
          `;
          rewardDisplay.style.display = "flex";
          rewardDisplay.style.alignItems = "center";
          rewardDisplay.style.gap = "4px";
          rewardDisplay.style.cursor = "pointer";

          const amountSpan = rewardDisplay.querySelector(".amount-text");

          // ── Build container ───────────────────────────────────────────────────────
          const tokenContainer = document.createElement("div");
          tokenContainer.className = "zec-inline-reward";
          tokenContainer.style.display = "none";
          tokenContainer.innerHTML = `
            <div class="zec-inline-header">
              <label class="zec-inline-lbl">ZEC Reward per winner</label>
              <span class="zec-platform-bal" id="zecPlatBal">Loading…</span>
            </div>
            <div class="zec-amt-row">
              <div class="zec-input-wrap">
                <div class="zec-badge">
                  <svg fill="none" viewBox="0 0 24 24" width="14" height="14">
                    <circle cx="12" cy="12" r="9" fill="#F3B724"/>
                    <polyline points="9 9 15 9 9 15 15 15" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                  ZEC
                </div>
                <input type="number" class="amount-input" placeholder="0.00000000"
                      step="0.00000001" min="0" value="${r.reward_data.amount_per_winner || ''}"/>
              </div>
              <div class="zec-usd-equiv">≈ $0.00 USD</div>
            </div>
            <div class="zec-bal-feedback" style="display:none"></div>
            <input type="hidden" class="hidden-network" name="network" value="Zcash">
            <input type="hidden" class="hidden-token"   name="token"   value="ZEC">
            <input type="hidden" class="hidden-amount"  name="amount"  value="${r.reward_data.amount_per_winner || ''}">
          `;

          wrapper.style.position = "relative";
          wrapper.appendChild(tokenContainer);

          const amountInput  = tokenContainer.querySelector(".amount-input");
          const usdEl        = tokenContainer.querySelector(".zec-usd-equiv");
          const hiddenAmount = tokenContainer.querySelector(".hidden-amount");
          const balFeedback  = tokenContainer.querySelector(".zec-bal-feedback");
          const platBalEl    = tokenContainer.querySelector("#zecPlatBal");

          // ── Match width of .contain-all-side ─────────────────────────────────────
          const syncWidth = () => {
            const containAll = document.querySelector(".contain-all-side");
            if (containAll) tokenContainer.style.width = containAll.offsetWidth + "px";
          };

          // ── Smart positioning ─────────────────────────────────────────────────────
          const positionPanel = () => {
            syncWidth();
            const rect        = rewardDisplay.getBoundingClientRect();
            const panelHeight = tokenContainer.offsetHeight || 160;
            const spaceBelow  = window.innerHeight - rect.bottom;
            if (spaceBelow >= panelHeight + 8) {
              tokenContainer.style.top    = rewardDisplay.offsetHeight + 4 + "px";
              tokenContainer.style.bottom = "auto";
            } else {
              tokenContainer.style.bottom = rewardDisplay.offsetHeight + 4 + "px";
              tokenContainer.style.top    = "auto";
            }
            tokenContainer.style.left = "0px";
          };

          // ── Toggle ────────────────────────────────────────────────────────────────
          rewardDisplay.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = tokenContainer.style.display === "block";
            if (!isOpen) {
              tokenContainer.style.display = "block";
              positionPanel();
              validateForm();
            } else {
              tokenContainer.style.display = "none";
            }
          });

          // ── Outside click closes ──────────────────────────────────────────────────
          const handleDocClick = (e) => {
            if (!tokenContainer.contains(e.target) && !rewardDisplay.contains(e.target)) {
              tokenContainer.style.display = "none";
            }
          };
          document.addEventListener("click", handleDocClick);
          tokenContainer.addEventListener("click", (e) => e.stopPropagation());

          // ── Platform balance ──────────────────────────────────────────────────────
          let platformZecBal = null;

          fetch(`/api/platform/zec-balance?community_slug=${communitySlug}`)
            .then(r => r.json())
            .then(data => {
              platformZecBal = parseFloat(data.balance) || 0;
              platBalEl.textContent = `${platformZecBal.toFixed(4)} ZEC available`;
              platBalEl.style.color = platformZecBal > 0 ? 'var(--sub)' : 'var(--red)';
              updateUsdDisplay();
              validateForm();
            })
            .catch(() => { platBalEl.textContent = ''; });

          // ── Live ZEC price ────────────────────────────────────────────────────────
          let widgetZecPrice = (typeof ZEC_PRICE_USD !== "undefined") ? ZEC_PRICE_USD : 540;

          const updateUsdDisplay = () => {
            const amt = parseFloat(amountInput.value) || 0;
            usdEl.textContent = amt > 0
              ? `≈ $${(amt * widgetZecPrice).toFixed(2)} USD`
              : `≈ $0.00 USD`;

            if (amt > 0 && platformZecBal !== null) {
              balFeedback.style.display = 'block';
              if (amt > platformZecBal) {
                balFeedback.textContent = `⚠️ Only ${platformZecBal.toFixed(4)} ZEC available`;
                balFeedback.className   = 'zec-bal-feedback zec-bal-err';
              } else {
                balFeedback.textContent = `Remaining after reward: ${(platformZecBal - amt).toFixed(4)} ZEC`;
                balFeedback.className   = 'zec-bal-feedback zec-bal-ok';
              }
            } else {
              balFeedback.style.display = 'none';
            }
          };



          window.ZecPriceStore?.start();

          const unsubscribePrice =
            window.ZecPriceStore?.subscribe((price) => {

              widgetZecPrice = price;

              if (typeof ZEC_PRICE_USD !== "undefined") {
                ZEC_PRICE_USD = price;
              }

              updateUsdDisplay();

              usdEl.style.transition = "opacity .15s";
              usdEl.style.opacity = ".3";

              setTimeout(() => {
                usdEl.style.opacity = "1";
              }, 150);

            });

          wrapper.__cleanupPrice = unsubscribePrice;

          // ── Amount input ──────────────────────────────────────────────────────────
          amountInput.addEventListener("input", () => {
            const raw = parseFloat(amountInput.value);
            const amt = isNaN(raw) ? 0 : raw;

            if (raw < 0) {
              amountInput.value      = "";
              amountSpan.textContent = "—";
              hiddenAmount.value     = "";
            } else {
              amountSpan.textContent = amt > 0 ? amountInput.value : "—";
              hiddenAmount.value     = amt > 0 ? amountInput.value : "";
            }

            updateUsdDisplay();
            validateForm();
          });

          // ── Delete ────────────────────────────────────────────────────────────────
          wrapper.querySelector(".delete-reward").addEventListener("click", () => {
            clearInterval(priceInterval);
            wrapper.__cleanupPrice?.();
            document.removeEventListener("click", handleDocClick);
            wrapper.remove();
            updateRewardColumnState();
          });

          validateForm();
        }



        rewardParent.appendChild(wrapper);
        const distType = (r.distribution_type || "ALL").toUpperCase();

        REWARD_STATE.set(wrapper, {
          type: distType === "FCFS" ? "FCFS" : 
                distType === "RAFFLE" ? "Raffle" :
                distType === "VOTE" ? "Vote" : "All",

          maxSupply: r.reward_data?.subcontent?.max_supply || "",
          rewardCount: 
              r.reward_data?.subcontent?.num_rewards || ""
        });
        initRenoDropdown(wrapper);        
        rewardParent.style.display = "flex";

        
        validateForm();
        
        

    }



function smartPosition(trigger, dropdown) {
  const tRect = trigger.getBoundingClientRect();
  const dRect = dropdown.getBoundingClientRect();

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const spaceBottom = vh - tRect.bottom;
  const spaceTop    = tRect.top;
  const spaceRight  = vw - tRect.right;
  const spaceLeft   = tRect.left;

  // reset
  dropdown.style.top = "auto";
  dropdown.style.bottom = "auto";
  dropdown.style.left = "auto";
  dropdown.style.right = "auto";

  dropdown.style.position = "absolute";

  /* ---- Vertical ---- */
  if (spaceBottom >= dRect.height || spaceBottom >= spaceTop) {
    // drop down
    dropdown.style.top = `${tRect.bottom + window.scrollY + 6}px`;
  } else {
    // drop up
    dropdown.style.top = `${tRect.top + window.scrollY - dRect.height - 6}px`;
  }

  /* ---- Horizontal ---- */
  if (spaceRight >= dRect.width || spaceRight >= spaceLeft) {
    dropdown.style.left = `${tRect.left + window.scrollX}px`;
  } else {
    dropdown.style.left = `${tRect.right + window.scrollX - dRect.width}px`;
  }
}


function Loadotherside() {
 




    updateRewardColumnState();


    
  updateClearAllRewards();
  





    const shifted = document.querySelector(".shifted");
    const trigger = document.querySelector(".shift");
    const options = document.querySelector(".reward-dropdown");

    let rewardOpen = false;








/* =========================
   TOGGLE ENGINE
========================= */
function toggleRewardDropdown(e) {
  e.stopPropagation();

  if (rewardOpen) {
    options.style.display = "none";
    rewardOpen = false;
    return;
  }

  options.style.display = "block";

  // wait for render
  requestAnimationFrame(() => {
    smartPosition(trigger, options);
  });

  rewardOpen = true;
}

/* =========================
   EVENTS
========================= */
trigger.addEventListener("click", toggleRewardDropdown);

/* =========================
   OUTSIDE CLICK CLOSE
========================= */
document.addEventListener("click", (e) => {
  if (
    e.target.closest(".shift") ||
    e.target.closest(".reward-dropdown")
  ) return;

  options.style.display = "none";
  rewardOpen = false;
});

/* =========================
   SCROLL / RESIZE
========================= */
window.addEventListener("resize", () => {
  options.style.display = "none";
  rewardOpen = false;
});
window.addEventListener("scroll", () => {
  options.style.display = "none";
  rewardOpen = false;
}, true);


 


const clearAllBtn = document.getElementById("clearAllRewards"); 

 




  // Clear all rewards
  clearAllBtn.addEventListener("click", () => {
    rewardParent.innerHTML = ''; // removes all rewards + any extra wrappers
    updateClearAllRewards();
    updateRewardColumnState();

  });







  /* ---------------------------
     GLOBAL STATE
  --------------------------- */
  const tabs2 = document.querySelectorAll(".tabs .tab");
  const settingsContainer = document.querySelector(".settings-container");



/* ---------------------------
   XP INPUT HANDLING
--------------------------- */
const xpInputWrapper = document.getElementById("xpInputWrapper");
const input = xpInputWrapper.querySelector("input");
let activeReward = null;

document.addEventListener("click", (e) => {
  const reward = e.target.closest(".reward-wrapper, .reward-display");

  if (reward) {
    // --- XP handler ---
    const xpSpan = reward.querySelector(".identifyerxp");
    if (xpSpan) {
      const rect = reward.getBoundingClientRect();

      const dropdownHeight = xpInputWrapper.offsetHeight || 40;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow >= dropdownHeight) {
        xpInputWrapper.style.top = rect.bottom + window.scrollY + "px";
      } else if (spaceAbove >= dropdownHeight) {
        xpInputWrapper.style.top = rect.top + window.scrollY - dropdownHeight + "px";
      } else {
        xpInputWrapper.style.top = rect.bottom + window.scrollY + "px";
      }

      xpInputWrapper.style.left = rect.left + window.scrollX + "px";

      input.value = xpSpan.textContent;

      xpInputWrapper.style.display = "flex";
      activeReward = reward;

      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);

      return; // stop here if XP handled
    }

if (reward.querySelector(".identifyerrole")) {
  const rect = reward.getBoundingClientRect();
  const roleDropdown = document.querySelector(".role-select");

  if (roleDropdown) {
    // temporarily show to measure height
    roleDropdown.style.display = "block";
    roleDropdown.style.visibility = "hidden";
    roleDropdown.style.top = "-9999px";
    const dropdownHeight = roleDropdown.offsetHeight || 200;
    roleDropdown.style.visibility = "visible";

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;
    if (spaceBelow >= dropdownHeight) {
      top = rect.bottom + window.scrollY; // ✅ drop down
    } else if (spaceAbove >= dropdownHeight) {
      top = rect.top + window.scrollY - dropdownHeight; // ✅ drop up
    } else {
      // clamp to viewport: put it at max possible
      top = Math.max(
        window.scrollY,
        Math.min(rect.bottom + window.scrollY, window.innerHeight - dropdownHeight + window.scrollY)
      );
    }

    roleDropdown.style.top = top + "px";

    // clamp horizontally
    let left = rect.left + window.scrollX;
    if (left + roleDropdown.offsetWidth > window.innerWidth) {
      left = window.innerWidth - roleDropdown.offsetWidth - 10;
    }
    roleDropdown.style.left = left + "px";

    // finally show it
    roleDropdown.style.display = "block";
    roleDropdown.style.visibility = "visible";
  }

  activeReward = reward;
  return;
}





  }

  // --- Click outside: close both ---
  if (!xpInputWrapper.contains(e.target)) {
    xpInputWrapper.style.display = "none";
  }
  const roleDropdown = document.querySelector(".role-select");
  if (roleDropdown && !roleDropdown.contains(e.target)) {
    roleDropdown.style.display = "none";
  }
});


// 🔹 live update + validation
input.addEventListener("input", () => {
  const value = input.value; // spaces preserved

  if (/^\d*$/.test(value)) {
    xpInputWrapper.style.border = "1px solid var(--border)"; // valid
    if (activeReward) {
      let xpSpan = activeReward.querySelector(".identifyerxp");
      if (xpSpan) {
        xpSpan.textContent = value || "0";
      }
    }
  } else {
    xpInputWrapper.style.border = "1px solid var(--red)"; // 🚨 invalid input
  }
  validateForm();
});

 
document.addEventListener("input", (e) => {
  if (e.target.matches("textarea.customtext")) {
    validateForm(); // ✅ recheck when typing in custom reward
  }
});
document.addEventListener("input", (e) => {
  if (e.target.matches(".subcontent2 input, .subcontent3 input, .subcontent4 input")) {
    validateForm();
  }
});


  // persist left badge (#rewardDisplay)
  window.rewardDisplaySelection = { html: "" };

  // persist right badge (#rewardtype)
  let rewardTypeSelection = {
    html: null,
    targetClass: "subcontent1"
  };

  /* ---------------------------
     DROPDOWN HANDLING
  --------------------------- */
  function closeAllDropdowns() {
    document
      .querySelectorAll(".custom-drop.active, .custom-dropdown.active, .shifted.active")
      .forEach(d => {
        d.classList.remove("active");
        const opts = d.querySelector(".options, .reward-dropdown");
        if (opts) opts.style.display = "none";
      });
  }
document.querySelectorAll(".reward-dropdown .option").forEach(option => {
  option.addEventListener("click", (e) => {
    if (e.target.closest("#levelDropdown")) return;
    const opt = e.target.closest(".option");
    const dropdownContainer = e.target.closest(
      ".custom-drop, .custom-dropdown, .recurrence-label, .shifted"
    );

    if (opt) {
      e.preventDefault();
      e.stopPropagation(); 
      const isRewardOption = !!opt.closest(".reward-dropdown") || opt.hasAttribute("data-icon");
      const text = opt.getAttribute("data-text") || opt.textContent.trim();
      const iconClass = opt.getAttribute("data-icon") || (opt.querySelector("i")?.className || "");
      const color = opt.getAttribute("data-color") || (opt.querySelector("i")?.style.color || "");
      const rewardDisplay = document.getElementById("rewardDisplay");

      if (isRewardOption) {
        const target = document.getElementById("rewardContainerParent");
        if (!target) return;

        const wrapper = document.createElement("div");
        wrapper.classList.add("rewardContainerWrapper");
        wrapper.dataset.rewardType = text.toLowerCase();
        wrapper.style.flexDirection = "column";
        wrapper.style.gap = "10px";

        const xpContent = text === "XP"
          ? `<span class="identifyerxp"></span><span class="xp-label">XP</span>`
          : "";

        const svgKey = text.toLowerCase();
        const svgIcon = svgMap[svgKey] 
          ? svgMap[svgKey].replace(/currentColor/g, color)
          : `<i class="${iconClass}" style="color:${color};margin-right:5px;"></i>`;
        const rewardSVG =
          REWARD_ICONS[text.toUpperCase()] || REWARD_ICONS["ALL"];

        wrapper.innerHTML = `
          <div class="rewardsec reward-actions" style="font-size:14px; font-weight:bold;">
          <span class="reward-item reward-display" style="gap: 3px;">
            
            ${svgIcon}
            ${xpContent}
          </span>

            <span class="divider"></span>

            <span class="reward-item reward-type" style="display: flex; align-items: center; gap: 4px;">
             ${rewardSVG}
              <span>All</span>
            </span>

            <span class="divider"></span>

            <span class="reward-item delete-reward" style="color:color:var(--text-muted);cursor:pointer;">
          <svg width="16" height="16" class="triggerDeletePopup" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Trash lid -->
            <path d="M20.5 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

            <!-- Trash body -->
            <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>

            <!-- Trash handle/body curve -->
            <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

            <!-- Two vertical bars -->
            <line x1="10" y1="9" x2="10" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
            <line x1="14" y1="9" x2="14" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
          </svg>

            </span>
          </div>

        `;

        target.appendChild(wrapper);

        /* init memory for this reward */


        if (text === "XP") {
          const rewardDisplay = wrapper.querySelector(".reward-display");

          // ✅ Create an empty XP span so the input can target it
          let xpSpan = rewardDisplay.querySelector(".identifyerxp");
          if (!xpSpan) {
            xpSpan = document.createElement("span");
            xpSpan.classList.add("identifyerxp");
            rewardDisplay.insertBefore(xpSpan, rewardDisplay.querySelector("span")); 
          }

          rewardDisplay.click()

          // ✅ Position xpInputWrapper under this reward
          const rect = rewardDisplay.getBoundingClientRect();
          const dropdownHeight = xpInputWrapper.offsetHeight || 40;
          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;

          if (spaceBelow >= dropdownHeight) {
            xpInputWrapper.style.top = rect.bottom + window.scrollY + "px";
          } else if (spaceAbove >= dropdownHeight) {
            xpInputWrapper.style.top = rect.top + window.scrollY - dropdownHeight + "px";
          } else {
            xpInputWrapper.style.top = rect.bottom + window.scrollY + "px";
          }

          xpInputWrapper.style.left = rect.left + window.scrollX + "px";
          xpInputWrapper.style.display = "flex";
          activeReward = rewardDisplay;

          // ✅ Focus input immediately
          input.value = "";
          setTimeout(() => input.focus(), 0);
        }

        if (text === "Role") {
          const rewardDisplay = wrapper.querySelector(".reward-display");
          const rewardDropdown = document.querySelector(".reward-dropdown");
          if (rewardDropdown) rewardDropdown.style.display = "none";
          // 🔹 check if Discord is connected (Flask injected bool)
          const discordConnected = "{{ 'true' if discord_connected else 'false' }}" === "true";

          if (!discordConnected) {
            // 🚫 Discord not connected → remove wrapper + show popup
            wrapper.remove(); // prevent reward from being added
            setTimeout(showDiscordPopup, 50); // show popup immediately
            return; // stop further execution
          }

          // ✅ Normal flow: Discord connected → show dropdown
          const tmpl = document.getElementById("roleSelectTemplate");
          const roleDropdown = tmpl.content.firstElementChild.cloneNode(true);
          const roleList = roleDropdown.querySelector(".role-list");

          if (roleList) {
            const items = roleList.querySelectorAll(".role-item:not(.disabled)");
            if (items.length > 8) {
              roleList.style.maxHeight = "calc(8 * 2.2em)";
              roleList.style.overflowY = "auto";
            }
          }

          wrapper.appendChild(roleDropdown);

          // --- init search filtering for this dropdown ---
          const searchInput = roleDropdown.querySelector(".serachesing");
          searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            let anyVisible = false;

            roleList.querySelectorAll(".role-item").forEach(item => {
              if (item.classList.contains("disabled")) return;

              const text = item.textContent.toLowerCase();
              if (text.includes(filter)) {
                item.style.display = "";
                anyVisible = true;
              } else {
                item.style.display = "none";
              }
            });

            // Handle "No roles found"
            let noRoleItem = roleList.querySelector(".role-item.disabled");
            if (!noRoleItem) {
              noRoleItem = document.createElement("li");
              noRoleItem.className = "role-item disabled";
              noRoleItem.textContent = "No roles found";
              noRoleItem.style.display = "none";
              roleList.appendChild(noRoleItem);
            }
            noRoleItem.style.display = anyVisible ? "none" : "";
          });

          // ensure positioning relative to wrapper
          wrapper.style.position = "relative";
          roleDropdown.style.position = "absolute";
          roleDropdown.style.left = "0";
          roleDropdown.style.display = "none"; // start hidden

          // smart placement when showing
          const placeDropdown = () => {
            roleDropdown.style.display = "block";
            roleDropdown.style.visibility = "hidden"; // measure only
            const dropdownHeight = roleDropdown.offsetHeight || 200;
            roleDropdown.style.visibility = "visible";

            const rect = wrapper.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow >= dropdownHeight) {
              roleDropdown.style.top =
                wrapper.querySelector(".reward-display").offsetHeight + "px";
            } else if (spaceAbove >= dropdownHeight) {
              roleDropdown.style.top = -dropdownHeight + "px";
            } else {
              roleDropdown.style.top =
                wrapper.querySelector(".reward-display").offsetHeight + "px";
            }
          };

          // toggle dropdown on click of rewardDisplay
          rewardDisplay.addEventListener("click", (e) => {
            e.stopPropagation();
            const isVisible = roleDropdown.style.display === "block";
            if (isVisible) {
              roleDropdown.style.display = "none";
            } else {
              placeDropdown();
            }
          });

          // immediately show dropdown after adding Role reward
          placeDropdown();
          validateForm();

          // select a role
          roleDropdown.querySelectorAll(".role-item").forEach((item) => {
            item.addEventListener("click", () => {
              const selectedRole = item.textContent.trim();
              rewardDisplay.innerHTML = `
                ${svgIcon}
                <span class="identifyerrole">${selectedRole}</span>
              `;
              roleDropdown.style.display = "none";
            });
          });

          // hide dropdown if reward deleted
          wrapper.querySelector(".delete-reward").addEventListener("click", () => {
            wrapper.remove();
            updateRewardColumnState();

          });

          // click outside closes dropdown
          document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
              roleDropdown.style.display = "none";
            }
          });
        }


        if (text === "Custom") {
          const rewardDropdown = document.querySelector(".reward-dropdown");
          if (rewardDropdown) rewardDropdown.style.display = "none";
          const rewardDisplay = wrapper.querySelector(".reward-display");

          // Show icon only (span hidden at first)
          rewardDisplay.innerHTML = `
            ${svgIcon}
            <span class="customtextspan" style="display:none;"></span>
          `;
          rewardDisplay.style.display = "flex";
          rewardDisplay.style.alignItems = "center";

          // Clone dropdown
          const template = document.getElementById("customTemplate");
          const customBody = template.content.firstElementChild.cloneNode(true);
          if (!customBody) return;

          wrapper.appendChild(customBody);
          customBody.style.display = "none";
          customBody.style.position = "absolute";
          wrapper.style.position = "relative";

          // Position dropdown
          const positionDropdown = () => {
            const rect = rewardDisplay.getBoundingClientRect();
            const dropdownHeight = customBody.offsetHeight || 150;
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow >= dropdownHeight) {
              customBody.style.top = rect.height + "px";
            } else if (spaceAbove >= dropdownHeight) {
              customBody.style.top = -dropdownHeight + "px";
            } else {
              customBody.style.top = Math.max(-spaceAbove, Math.min(spaceBelow, rect.height)) + "px";
            }
            customBody.style.left = "0px";
          };

          // Show/Hide dropdown
          const showDropdown = () => {
            positionDropdown();
            customBody.style.display = "block";
            const textarea = customBody.querySelector("textarea.customtext");
            if (textarea) textarea.focus();
          };
          const hideDropdown = () => (customBody.style.display = "none");

          rewardDisplay.addEventListener("click", (e) => {
            e.stopPropagation();
            if (customBody.style.display === "block") hideDropdown();
            else showDropdown();
          });

          // 🔹 Live update + show span only when input exists
          const textarea = customBody.querySelector("textarea.customtext");
          if (textarea) {
            const textSpan = rewardDisplay.querySelector(".customtextspan");
            textarea.addEventListener("input", () => {
              const value = textarea.value.trim();
              if (value) {
                textSpan.style.display = "inline";
                textSpan.textContent = value;
              } else {
                textSpan.style.display = "none"; // hide if empty
                textSpan.textContent = "";
              }
              validateForm();
            });
            validateForm();
          }

          // Outside click listener
          const handleClickOutside = (e) => {
            if (!wrapper.contains(e.target)) hideDropdown();
          };
          document.addEventListener("click", handleClickOutside);

          // Immediately show dropdown
          showDropdown();

          // Delete handler
          wrapper.querySelector(".delete-reward").addEventListener("click", () => {
            document.removeEventListener("click", handleClickOutside);
            wrapper.remove();
            updateRewardColumnState();

          });
        }


        if (text === "Token") {
          const rewardDropdown = document.querySelector(".reward-dropdown");
          if (rewardDropdown) rewardDropdown.style.display = "none";
          const rewardDisplay = wrapper.querySelector(".reward-display");

          rewardDisplay.innerHTML = `
            ${svgIcon}
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
              <circle cx="12" cy="12" r="9" fill="#F3B724"/>
              <polyline points="9 9 15 9 9 15 15 15" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              <line x1="12" y1="7" x2="12" y2="9" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
              <line x1="12" y1="15" x2="12" y2="17" stroke="#fff" stroke-linecap="round" stroke-width="2"/>
            </svg>
            <span class="amount-text" style="font-size:.78rem;font-weight:600;">—</span>
            <span style="color:#F4B728;font-size:.7rem;font-weight:700;margin-left:3px;">ZEC</span>
          `;
          rewardDisplay.style.display = "flex";
          rewardDisplay.style.alignItems = "center";
          rewardDisplay.style.gap = "4px";
          rewardDisplay.style.cursor = "pointer";

          const amountSpan = rewardDisplay.querySelector(".amount-text");

          // ── Build container ───────────────────────────────────────────────────────
          const tokenContainer = document.createElement("div");
          tokenContainer.className = "zec-inline-reward";
          tokenContainer.style.display = "none";
          tokenContainer.innerHTML = `
            <div class="zec-inline-header">
              <label class="zec-inline-lbl">ZEC Reward per winner</label>
              <span class="zec-platform-bal" id="zecPlatBal">Loading…</span>
            </div>
            <div class="zec-amt-row">
              <div class="zec-input-wrap">
                <div class="zec-badge">
                  <svg fill="none" viewBox="0 0 24 24" width="14" height="14">
                    <circle cx="12" cy="12" r="9" fill="#F3B724"/>
                    <polyline points="9 9 15 9 9 15 15 15" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                  ZEC
                </div>
                <input type="number" class="amount-input" placeholder="0.00000000"
                      step="0.00000001" min="0"/>
              </div>
              <div class="zec-usd-equiv">≈ $0.00 USD</div>
            </div>
            <div class="zec-bal-feedback" style="display:none"></div>
            <input type="hidden" class="hidden-network" name="network" value="Zcash">
            <input type="hidden" class="hidden-token"   name="token"   value="ZEC">
            <input type="hidden" class="hidden-amount"  name="amount">
          `;

          wrapper.style.position = "relative";
          wrapper.appendChild(tokenContainer);

          // ── Match width of .contain-all-side ─────────────────────────────────────
          const syncWidth = () => {
            const containAll = document.querySelector(".contain-all-side");
            if (containAll) {
              tokenContainer.style.width = containAll.offsetWidth + "px";
            }
          };
          // ── Smart positioning — drop down or drop up ──────────────────────────────
          const positionPanel = () => {
            syncWidth();
            const rect        = rewardDisplay.getBoundingClientRect();
            const panelHeight = tokenContainer.offsetHeight || 160;
            const spaceBelow  = window.innerHeight - rect.bottom;
            if (spaceBelow >= panelHeight + 8) {
              tokenContainer.style.top    = rewardDisplay.offsetHeight + 4 + "px";
              tokenContainer.style.bottom = "auto";
            } else {
              tokenContainer.style.bottom = rewardDisplay.offsetHeight + 4 + "px";
              tokenContainer.style.top    = "auto";
            }
            tokenContainer.style.left = "0px";
          };
          tokenContainer.style.display = "block";
          positionPanel();
          validateForm();
          const amountInput  = tokenContainer.querySelector(".amount-input");
          const usdEl        = tokenContainer.querySelector(".zec-usd-equiv");
          const hiddenAmount = tokenContainer.querySelector(".hidden-amount");
          const balFeedback  = tokenContainer.querySelector(".zec-bal-feedback");
          const platBalEl    = tokenContainer.querySelector("#zecPlatBal");



          // ── Toggle ────────────────────────────────────────────────────────────────
          rewardDisplay.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = tokenContainer.style.display === "block";
            if (!isOpen) {
              tokenContainer.style.display = "block";
              positionPanel();
              validateForm();  
            } else {
              tokenContainer.style.display = "none";
            }
          });

          // ── Outside click closes ──────────────────────────────────────────────────
          const handleDocClick = (e) => {
            if (!tokenContainer.contains(e.target) && !rewardDisplay.contains(e.target)) {
              tokenContainer.style.display = "none";
            }
          };
          document.addEventListener("click", handleDocClick);
          tokenContainer.addEventListener("click", (e) => e.stopPropagation());

          // ── Platform balance ──────────────────────────────────────────────────────
          let platformZecBal = null;

          fetch(`/api/platform/zec-balance?community_slug=${communitySlug}`)
            .then(r => r.json())
            .then(data => {
              platformZecBal = parseFloat(data.balance) || 0;
              platBalEl.textContent = `${platformZecBal.toFixed(4)} ZEC available`;
              platBalEl.style.color = platformZecBal > 0 ? 'var(--sub)' : 'var(--red)';
              updateUsdDisplay();
              validateForm();
            })
            .catch(() => { platBalEl.textContent = ''; });

          // ── Live ZEC price ────────────────────────────────────────────────────────
          let widgetZecPrice = window.ZecPriceStore?.getPrice?.() || 540;

          const updateUsdDisplay = () => {
            const amt = parseFloat(amountInput.value) || 0;
            usdEl.textContent = amt > 0
              ? `≈ $${(amt * widgetZecPrice).toFixed(2)} USD`
              : `≈ $0.00 USD`;

            if (amt > 0 && platformZecBal !== null) {
              balFeedback.style.display = 'block';
              if (amt > platformZecBal) {
                balFeedback.textContent = `⚠️ Only ${platformZecBal.toFixed(4)} ZEC available`;
                balFeedback.className   = 'zec-bal-feedback zec-bal-err';
              } else {
                balFeedback.textContent = `Remaining after reward: ${(platformZecBal - amt).toFixed(4)} ZEC`;
                balFeedback.className   = 'zec-bal-feedback zec-bal-ok';
              }
            } else {
              balFeedback.style.display = 'none';
            }
          };



          window.ZecPriceStore?.start();

          const unsubscribePrice =
            window.ZecPriceStore?.subscribe((price) => {

              widgetZecPrice = price;

              if (typeof ZEC_PRICE_USD !== "undefined") {
                ZEC_PRICE_USD = price;
              }

              updateUsdDisplay();

              usdEl.style.transition = "opacity .15s";
              usdEl.style.opacity = ".3";

              setTimeout(() => {
                usdEl.style.opacity = "1";
              }, 150);

            });

          wrapper.__cleanupPrice = unsubscribePrice;

          amountInput.addEventListener("input", () => {
            const raw = parseFloat(amountInput.value);
            const amt = isNaN(raw) ? 0 : raw;

            // Clamp: reject negatives
            if (raw < 0) {
              amountInput.value = "";
              amountSpan.textContent = "—";
              hiddenAmount.value = "";
            } else {
              amountSpan.textContent = amt > 0 ? amountInput.value : "—";
              hiddenAmount.value     = amt > 0 ? amountInput.value : "";
            }

            updateUsdDisplay();
            validateForm();  
          });

          // ── Delete ────────────────────────────────────────────────────────────────
          wrapper.querySelector(".delete-reward").addEventListener("click", () => {
            clearInterval(priceInterval);
            wrapper.__cleanupPrice?.();
            document.removeEventListener("click", handleDocClick);
            wrapper.remove();
            updateRewardColumnState();
          });
        }
        
        wrapper
          .querySelector(".delete-reward")
          .addEventListener("click", () => {
            wrapper.remove();
            updateRewardColumnState();
          });

        
        REWARD_STATE.set(wrapper, {
          type: "All",
          maxSupply: "",
          rewardCount: ""
        });

        /* only attach click logic */
        initRenoDropdown(wrapper);


        updateClearAllRewards();
        updateRewardColumnState();

  

      }else {
        const dropdown = opt.closest(".custom-drop, .custom-dropdown, .recurrence-label, .shifted");
        if (dropdown) {
          const selected = dropdown.querySelector(".selected");
          if (selected) selected.innerHTML = opt.innerHTML + ' <span class="arro">▼</span>';
        }
      }

      opt.parentElement?.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      closeAllDropdowns();
      return;
    }


    if (dropdownContainer) {
      e.stopPropagation();
      const wasActive = dropdownContainer.classList.contains("active");
      closeAllDropdowns();
      if (!wasActive) {
        dropdownContainer.classList.add("active");
        const options = dropdownContainer.querySelector(".options, .reward-dropdown");
        if (options) options.style.display = "block";
      }
      return;
    }

    closeAllDropdowns();
  });
});

  window.addEventListener("scroll", closeAllDropdowns, { passive: true });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ---------------------------
     REWARD METHOD HANDLING
  --------------------------- */
  function initRewardSection() {
    const renoContainer = settingsContainer.querySelector(".renocontainer");
    const rewardType = settingsContainer.querySelector("#rewardtype");
    const okBtn = settingsContainer.querySelector(".piicki");
    if (!renoContainer || !rewardType || !okBtn) return;

    // ---------- TRASH DELETE HANDLER ----------


    // restore previous rewardType badge if saved
    if (rewardTypeSelection.html) {
      rewardType.innerHTML = rewardTypeSelection.html;
      const tabToActivate = renoContainer.querySelector(
        `.tab-buttons > div[data-target="${rewardTypeSelection.targetClass}"]`
      );
      const contentToActivate = renoContainer.querySelector(
        `.${rewardTypeSelection.targetClass}`
      );
      if (tabToActivate && contentToActivate) {
        renoContainer.querySelectorAll(".tab-buttons > div")
          .forEach(t => t.classList.remove("active-tab"));
        renoContainer.querySelectorAll(".subcontent1, .subcontent2, .subcontent3, .subcontent4")
          .forEach(c => c.classList.remove("active-content"));
        tabToActivate.classList.add("active-tab");
        contentToActivate.classList.add("active-content");
      }
    }

    // ---------- SMART DROPDOWN TOGGLE ----------
  rewardType.addEventListener("click", e => {
    e.stopPropagation();

  

    // temporarily show to measure height
    renoContainer.style.display = "block";
    const dropdownHeight = renoContainer.offsetHeight || 200;
    renoContainer.style.display = "none";

    const rect = rewardType.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // smart dropup / dropdown
    if (spaceBelow >= dropdownHeight) {
      renoContainer.style.top = rewardType.offsetHeight + "px"; // drop down
    } else if (spaceAbove >= dropdownHeight) {
      renoContainer.style.top = -dropdownHeight + "px"; // drop up
    } else {
      renoContainer.style.top = rewardType.offsetHeight + "px"; // fallback
    }

    // align left with rewardType
    renoContainer.style.left = rewardType.offsetLeft + "px";

    renoContainer.style.display = "block";
  });

  

    // ---------- TAB SWITCHING ----------
  // ---------- TAB SWITCHING ----------
  const tabs = renoContainer.querySelectorAll(".tab-buttons > div");
  const contents = renoContainer.querySelectorAll(
    ".subcontent1, .subcontent2, .subcontent3, .subcontent4"
  );

  

  }

    /* ---------------------------
      TABS (Properties / Results)
    --------------------------- */
  if (settingsContainer && tabs2.length > 0) {
    settingsContainer.style.visibility = "hidden";

    // Create a dedicated container for results
    const resultsView = document.createElement("div");
    resultsView.classList.add("results-view");
    resultsView.style.display = "none";
    settingsContainer.appendChild(resultsView);

    let initialized = false;

    function setActiveTab(tabName) {
      // Update active class on tabs
      tabs2.forEach(t =>
        t.classList.toggle("active", t.textContent.toLowerCase().includes(tabName))
      );

      if (tabName === "results") {
        // Hide properties content (your original HTML stays in place)
        Array.from(settingsContainer.children).forEach(child => {
          if (!child.classList.contains("results-view")) child.style.display = "none";
        });
        resultsView.style.display = "flex";
        loadResults();
      } else {
        // Show properties again, hide results
        Array.from(settingsContainer.children).forEach(child => {
          if (!child.classList.contains("results-view")) child.style.display = "flex";
        });
        resultsView.style.display = "none";

        if (!initialized) {
          initRewardSection();
          initialized = true;
        }

        // restore rewardDisplay (left badge)
        const rewardDisplay = settingsContainer.querySelector("#rewardDisplay");
        if (rewardDisplay && window.rewardDisplaySelection?.html) {
          rewardDisplay.innerHTML = window.rewardDisplaySelection.html;
        }
      }

      sessionStorage.setItem("activeTab", tabName);
      settingsContainer.style.visibility = "visible";
    }

    function loadResults() {
      fetch(`/${communitySlug}/result/${subquest_uuid}`)
        .then(r => {
          if (!r.ok) throw new Error("Network error while loading results.");
          return r.text();
        })
        .then(html => {
          resultsView.innerHTML = html;
        })
        .catch(err => {
          resultsView.innerHTML = `<p style="color:var(--error-alt); text-align: center; font-size: 14px; opacity: 0.9;">Failed to load results: ${err.message}</p>`;
        });
    }




    // Restore last active tab (default: properties)
    const activeTab = sessionStorage.getItem("activeTab") || "properties";
    setActiveTab(activeTab);

    // Tab click handlers
    tabs2.forEach(tab => {
      tab.addEventListener("click", () => {
        const txt = tab.textContent.trim().toLowerCase();
        setActiveTab(txt.includes("results") ? "results" : "properties");
      });
    });

    // Clear activeTab on page unload
    window.addEventListener("beforeunload", () =>
      sessionStorage.removeItem("activeTab")
    );
  }


}
  




function CalledIsmobMobile() {
  const hideBtn = document.querySelector(".hide-settings-info");
  const showBtn = document.querySelector(".show-settings-info");
  const SettingsDetails = document.querySelector(".side-panel");
  const SettingsApp = document.querySelector(".quest-left");
  const Questcreator = document.querySelector(".quest-creator");


  if (!hideBtn || !showBtn || !SettingsDetails || !SettingsApp) return;
 

  const saveState = async (visible) => {
    try {
      await fetch("/save_settingsinfo_state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
          visible: visible,
          community_id: communityId,
        }),
      });
    } catch (err) {
      console.error("Failed to save userinfo state:", err);
    }
  };

  hideBtn.addEventListener("click", () => {
    Questcreator.classList.add("settings-collapsed");
    saveState(true);
  });

  showBtn.addEventListener("click", () => {
       Questcreator.classList.remove("settings-collapsed");


    saveState(false);
  });
}





const notEqualSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="con-svg">
  <path 
    fill="currentColor"
    transform="scale(0.0536, 0.0469)"
    d="M378.6 81.8c9.8-14.7 5.8-34.6-8.9-44.4s-34.6-5.8-44.4 8.9L270.9 128 32 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l196.2 0-85.3 128-110.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l68.2 0-30.8 46.2c-9.8 14.7-5.8 34.6 8.9 44.4s34.6 5.8 44.4-8.9L177.1 384 416 384c17.7 0 32-14.3 32-32s-14.3-32-32-32l-196.2 0 85.3-128 110.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-68.2 0 30.8-46.2z"
  />
</svg>
`;

const equalSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="con-svg">
  <path 
    fill="currentColor" 
    d="M1.714 6.857c-.755 0-1.371.616-1.371 1.371s.616 1.371 1.371 1.371l20.571 0c.755 0 1.371-.616 1.371-1.371s-.616-1.371-1.371-1.371L1.714 6.857zm0 9.143c-.755 0-1.371.616-1.371 1.371s.616 1.371 1.371 1.371l20.571 0c.755 0 1.371-.616 1.371-1.371s-.616-1.371-1.371-1.371L1.714 16z"
  />
</svg>
`;

  const conditionIcons = {
"Quest": `
  <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px !important;"
       viewBox="0 0 24 24" 
       width="14" 
       height="14" 
       fill="#f39c12">
    <g transform="scale(0.0416667)"> 
      <path d="M0 112C0 70.5 31.6 36.4 72 32.4l0-.4 280 0c53 0 96 43 96 96l0 176-176 0c-39.8 0-72 32.2-72 72l0 60c0 24.3-19.7 44-44 44s-44-19.7-44-44l0-228-64 0c-26.5 0-48-21.5-48-48l0-48zM236.8 480c7.1-13.1 11.2-28.1 11.2-44l0-60c0-13.3 10.7-24 24-24l248 0c13.3 0 24 10.7 24 24l0 24c0 44.2-35.8 80-80 80l-227.2 0zM80 80c-17.7 0-32 14.3-32 32l0 48 64 0 0-48c0-17.7-14.3-32-32-32z"/>
    </g>
  </svg>
`,

"Level": `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" style="color:#3498db; vertical-align:middle; margin-right: 4px !important;">
  <g transform="scale(0.046875)">
    <path fill="currentColor" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"/>
  </g>
</svg>`,
"Role": `
<svg xmlns="http://www.w3.org/2000/svg"
     width="14" height="14" viewBox="0 0 24 24"
     fill="#5865F2" style="margin-right: 4px !important;">
  <path d="M20.318 4.36a19.8 19.8 0 0 0-4.885-1.517.075.075 0 0 0-.078.038c-.212.375-.445.866-.609 1.25a18.3 18.3 0 0 0-5.487 0 12 12 0 0 0-.618-1.25.075.075 0 0 0-.078-.038 19.9 19.9 0 0 0-4.885 1.517.06.06 0 0 0-.031.027C.534 9.036-.32 13.57.1 18.048q.005.033.032.056a19.9 19.9 0 0 0 5.992 3.03.075.075 0 0 0 .084-.028q.695-.945 1.227-1.994a.075.075 0 0 0-.016-.089l-.027-.017a13.5 13.5 0 0 1-1.872-.892.075.075 0 0 1-.03-.1l.022-.028q.191-.143.372-.292a.075.075 0 0 1 .077-.01c3.928 1.794 8.181 1.794 12.062 0a.075.075 0 0 1 .08.01q.181.149.372.292a.075.075 0 0 1-.006.127 12 12 0 0 1-1.873.891.075.075 0 0 0-.045.045.075.075 0 0 0 .004.062c.36.697.773 1.363 1.226 1.994a.075.075 0 0 0 .084.028 19.8 19.8 0 0 0 6.001-3.03.075.075 0 0 0 .032-.056c.501-5.176-.839-9.673-3.55-13.658a.045.045 0 0 0-.03-.029m-12.297 10.96c-1.184 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419m7.974 0c-1.183 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.177 1.095 2.157 2.419 0 1.333-.947 2.419-2.157 2.419"/>
</svg>
`,
"color": "#5865F2",

"Date": `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" width="15" height="15"
        stroke="currentColor" stroke-width="2" style="color:#e74c3c; margin-right: 5px;"
        stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="17" rx="4" ry="4"/>
      <line x1="7.25" y1="2.5" x2="7.25" y2="5.5" />
      <line x1="15.25" y1="2.5" x2="15.25" y2="5.5" />
      <line x1="6" y1="9" x2="18" y2="9" />
      <circle cx="8" cy="13" r="0.4" fill="currentColor"/>
      <circle cx="12" cy="13" r="0.4" fill="currentColor"/>
      <circle cx="16" cy="13" r="0.4" fill="currentColor"/>
      <circle cx="8" cy="16.5" r="0.4" fill="currentColor"/>
      <circle cx="12" cy="16.5" r="0.4" fill="currentColor"/>
      <circle cx="16" cy="16.5" r="0.4" fill="currentColor"/>
    </svg>`,
"Followers": `
  <svg xmlns="http://www.w3.org/2000/svg"  
      width="13" height="13" 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      style="color:#000000; margin-right: 4px;">
    <path d="M18.9 1.125h3.681l-8.04 9.213L24 22.875h-7.405l-5.8-7.605-6.637 7.605H.474l8.6-9.855L0 1.125h7.595l5.243 6.95L18.901 1.125Zm-1.29 19.542h2.04L6.484 3.217H4.297z"/>
  </svg>
`,
  };



const CHECK_SVG = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" fill="var(--active-ness)" stroke="currentColor">
              <path d="m85.652 6.5938c-15.199 4.6992-33.309 28.609-50.668 53.164-7.3672-12.414-15.172-16.559-23.242-12.312-0.99609 0.52344-1.6523 1.5273-1.7344 2.6562-0.082031 1.1406 0.42969 2.2422 1.3555 2.918 5.8516 4.2734 11.922 11.848 19.141 23.84v-0.003906c1.2891 2.1758 3.6328 3.5039 6.1562 3.4883h0.11719c2.6016-0.023438 4.9844-1.4453 6.2461-3.7188 7.0234-12.734 14.738-25.07 23.109-36.957 6.8594-9.75 14.508-18.926 22.867-27.43 1.125-1.1016 1.332-2.8359 0.5-4.1719-0.77734-1.332-2.3789-1.9453-3.8477-1.4727z"/>
              </svg>
`;


function convertUTCHumanToLocalHuman(utcStr) {
  // expects: "04 Feb 08:30 2026" (UTC)
  if (!utcStr) return "";

  const parts = utcStr.split(" ");
  if (parts.length !== 4) return utcStr;

  const [dayStr, monStr, timeStr, yearStr] = parts;
  const [hhStr, mmStr] = timeStr.split(":");

  const months = {
    Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
    Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
  };

  if (!(monStr in months)) return utcStr;

  const day  = Number(dayStr);
  const year = Number(yearStr);
  const hour = Number(hhStr);
  const min  = Number(mmStr);
  const mon  = months[monStr];

  // ✅ Build TRUE UTC date
  const utcDate = new Date(Date.UTC(year, mon, day, hour, min, 0, 0));

  // ✅ Convert to LOCAL
  const lDay   = String(utcDate.getDate()).padStart(2, "0");
  const lYear  = utcDate.getFullYear();
  const lHour  = String(utcDate.getHours()).padStart(2, "0");
  const lMin   = String(utcDate.getMinutes()).padStart(2, "0");
  const lMonth = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][utcDate.getMonth()];

  return `${lDay} ${lMonth} ${lHour}:${lMin} ${lYear}`;
}



function renderSavedCondition(cond) {
  const containerParent = document.getElementById("conditionContainerParent");
  containerParent.style.display = "flex";

  // 🔹 Map condition_type → correct icon


  const newBlock = document.createElement("div");
  newBlock.classList.add("condition-block");
  newBlock.innerHTML = `
    <div class="conditionsec condition-actions" style="font-size:14px;font-weight:bold"> 
      <div class="conditon-wrapper condition-item">
        <span class="conditionDisplay" style="gap:3px;">
          ${conditionIcons[cond.condition_type] || '<i class="fa-solid fa-circle-check"></i>'}
          ${cond.condition_type}
        </span>
      </div>
      <span class="divider"></span>
      <span class="condition-item conitiontype"><span>${cond.operator || ""}</span></span>
      <span class="divider"></span>
      <span class="condition-item condition-value">
        <span class="valueDisplay" style="min-width:20px; display:inline-block; cursor:pointer; position:relative;">
          <span class="valueText">${cond.condition_value || ""}</span>
        </span>
      </span>
      <span class="divider"></span>
<span class="condition-item delete-condition" style="color:#9e9eac;cursor:pointer;">
  <svg width="15" height="15" class="triggerDeletePopup" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Trash lid -->
    <path d="M20.5 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

    <!-- Trash body -->
    <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>

    <!-- Trash handle/body curve -->
    <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

    <!-- Two vertical bars -->
    <line x1="10" y1="9" x2="10" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
    <line x1="14" y1="9" x2="14" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
  </svg>
</span>

    </div>
  `;

  // 👇 restore special UIs
  if (["Level", "Followers"].includes(cond.condition_type)) {
    const type = cond.condition_type; 
    const dropdownClone = levelDropdownTemplate.content.cloneNode(true);
    newBlock.appendChild(dropdownClone);

    const dropdownEl = newBlock.querySelector(".level-dropdown");
    const inputEl = dropdownEl.querySelector("input");
    const valueText = newBlock.querySelector(".valueText");
    const typeSpan = newBlock.querySelector(".conitiontype span");
    if (type === "Level") {
      inputEl.placeholder = "Enter level";
      inputEl.min = 1;
    }

    if (type === "Followers") {
      inputEl.placeholder = "Enter follower count";
      inputEl.min = 0;
    }

    // restore values
    inputEl.value = cond.condition_value || "";
    valueText.textContent = cond.condition_value || "";
    validateForm(); 

    // Use SVG instead of FontAwesome
    const operator = cond.operator === ">" ? ">" : "<";
    typeSpan.innerHTML = operator === ">"
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg-mega" fill="currentColor">
    <path d="M1.64 2.63c-.35.76-.02 1.67 0.74 2.02L18.91 12 2.38 19.35c-.76.35-1.1 1.26-.74 2.02s1.26 1.1 2.02.74l19.92-9.17c.54-.25.89-.79.89-1.38s-.35-1.13-.89-1.38L3.66 1.89c-.76-.35-1.67-.02-2.02.74z"/>
  </svg>
  `
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg-mega" fill="currentColor">
    <path d="M22.36 2.63c.35.76.02 1.67-.74 2.02L5.09 12l16.53 7.35c.76.35 1.1 1.26.74 2.02s-1.26 1.1-2.02.74L1.42 13.56c-.54-.25-.89-.79-.89-1.38s.35-1.13.89-1.38l18.94-8.74c.76-.35 1.67-.02 2.02.74z"/>
  </svg>
  `;
    typeSpan.dataset.operator = operator;

    // toggle dropdown on click
    const conditionValueEl = newBlock.querySelector(".condition-value");
    conditionValueEl.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".level-dropdown, .role-select, .quest-select").forEach(dd => {
        if (dd !== dropdownEl) dd.style.display = "none";
      });

      if (dropdownEl.style.display === "block") {
        dropdownEl.style.display = "none";
        openDropdown = null;
      } else {
        dropdownEl.style.display = "block";
        positionDropdown(dropdownEl);
        inputEl.focus();
        openDropdown = dropdownEl;
      }
    });

    // update on input
    inputEl.addEventListener("input", () => {
      const val = parseFloat(inputEl.value);
      if (isNaN(val) || val <= 0) {
        inputEl.style.border = "1px solid red";
        valueText.textContent = "";
        typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg" fill="currentColor">
    <path d="M1.64 2.63c-.35.76-.02 1.67 0.74 2.02L18.91 12 2.38 19.35c-.76.35-1.1 1.26-.74 2.02s1.26 1.1 2.02.74l19.92-9.17c.54-.25.89-.79.89-1.38s-.35-1.13-.89-1.38L3.66 1.89c-.76-.35-1.67-.02-2.02.74z"/>
  </svg>`;
        typeSpan.dataset.operator = "<";
      } else {
        inputEl.style.border = "";
        valueText.textContent = inputEl.value;
        typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg" fill="currentColor">
    <path d="M22.36 2.63c.35.76.02 1.67-.74 2.02L5.09 12l16.53 7.35c.76.35 1.1 1.26.74 2.02s-1.26 1.1-2.02.74L1.42 13.56c-.54-.25-.89-.79-.89-1.38s.35-1.13.89-1.38l18.94-8.74c.76-.35 1.67-.02 2.02.74z"/>
  </svg>
  `;
        typeSpan.dataset.operator = ">";
      }
      validateForm();
      updateRewardColumnState();

    });
  }



  if (cond.condition_type === "Role") {
    const dropdownClone = roleSelectTemplate.content.cloneNode(true);
    newBlock.appendChild(dropdownClone);

    const valueText = newBlock.querySelector(".valueText");
    const typeSpan = newBlock.querySelector(".conitiontype span");
    const dropdownEl = newBlock.querySelector(".role-select");
    const searchInput = dropdownEl.querySelector("input");
    const roleList = dropdownEl.querySelector(".role-list"); // container

    valueText.textContent = cond.condition_value || "";

    // Use SVGs for operator
    typeSpan.innerHTML = cond.operator === "=" ? equalSvg : notEqualSvg;

    // --- toggle dropdown
    const conditionValueEl = newBlock.querySelector(".condition-value");
    conditionValueEl.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".role-select, .level-dropdown, .quest-select")
        .forEach(dd => { if (dd !== dropdownEl) dd.style.display = "none"; });

      dropdownEl.style.display = dropdownEl.style.display === "block" ? "none" : "block";
      if (dropdownEl.style.display === "block") searchInput.focus();
    });

    // --- event delegation for click
    roleList.addEventListener("click", (e) => {
      const item = e.target.closest(".role-item");
      if (!item || item.classList.contains("disabled")) return;

      valueText.textContent = item.textContent.trim();
      dropdownEl.style.display = "none";

      // Switch operator to "=" SVG after selection
      typeSpan.innerHTML = equalSvg;

      validateForm();
    });

    // --- search filter
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      roleList.querySelectorAll(".role-item").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
      });
    });
  }



  



  if (cond.condition_type === "Date") {
    const container = newBlock.querySelector(".condition-value .valueDisplay");
    const typeSpan = newBlock.querySelector(".conitiontype span");

    const dateOperatorSVG = {
      ">": `<svg xmlns="http://www.w3.org/2000/svg" class="con-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M1.64 2.63c-.35.76-.02 1.67 0.74 2.02L18.91 12 2.38 19.35c-.76.35-1.1 1.26-.74 2.02s1.26 1.1 2.02.74l19.92-9.17c.54-.25.89-.79.89-1.38s-.35-1.13-.89-1.38L3.66 1.89c-.76-.35-1.67-.02-2.02.74z"/>
      </svg>`,
      "<": `<svg xmlns="http://www.w3.org/2000/svg" class="con-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M22.36 2.63c.35.76.02 1.67-.74 2.02L5.09 12l16.53 7.35c.76.35 1.1 1.26.74 2.02s-1.26 1.1-2.02.74L1.42 13.56c-.54-.25-.89-.79-.89-1.38s.35-1.13.89-1.38l18.94-8.74c.76-.35 1.67-.02 2.02.74z"/>
      </svg>`
    };

    const operator = cond.operator || "<";
    typeSpan.innerHTML = dateOperatorSVG[operator];
    typeSpan.dataset.operator = operator;

    container.addEventListener("click", (e) => {
      e.stopPropagation();

      openCustomDatePicker(container, (dateObj, formatted) => {
        newBlock.querySelector(".valueText").textContent = formatted;

        // operator logic
        const newOperator = formatted ? ">" : "<";
        typeSpan.innerHTML = dateOperatorSVG[newOperator];
        typeSpan.dataset.operator = newOperator;

        validateForm();
      });
    });

    let displayValue = cond.condition_value || "";

      displayValue = convertUTCHumanToLocalHuman(displayValue);



    newBlock.querySelector(".valueText").textContent = displayValue;

  }




  if (cond.condition_type === "Quest") {
    const dropdownClone = questSelectTemplate.content.cloneNode(true);
    newBlock.appendChild(dropdownClone);

    const valueText = newBlock.querySelector(".valueText");
    const typeSpan = newBlock.querySelector(".conitiontype span");
    const dropdownEl = newBlock.querySelector(".quest-select");
    const searchInput = dropdownEl.querySelector("input");
    const questItems = dropdownEl.querySelectorAll(".quest-item");
    const subquestItems = dropdownEl.querySelectorAll(".subquest-item");

    // restore saved values
    valueText.textContent = cond.condition_value || "";
    validateForm(); 

    // --- use SVGs for operator
    typeSpan.innerHTML = cond.operator === "=" ? equalSvg : notEqualSvg;

    // auto re-check saved quest/subquest

// ===== AUTO RESTORE FROM DB (RENDER TIME) =====
if (cond.subquest_uuid || cond.condition_value) {

  // 1) clear all checks first
  subquestItems.forEach(el => {
    el.innerHTML = `
      <span class="subquest-text">${el.textContent.trim()}</span>
      <span class="checkmark"></span>
    `;
    el.classList.remove("active");
  });

  // 2) find the correct one from DB data
  subquestItems.forEach(item => {
    const uuid = item.dataset.subquestId;
    const name = item.textContent.trim();

    const match =
      (cond.subquest_uuid && uuid === cond.subquest_uuid) ||   // ✅ real match (UUID)
      (!cond.subquest_uuid && name === cond.condition_value);  // ⚠ fallback

    if (match) {

      // apply check svg
      item.innerHTML = `
        <span class="subquest-text">${name}</span>
        <span class="checkmark">
          ${CHECK_SVG}
        </span>
      `;

      item.classList.add("active");

      // set visible value
      valueText.textContent = name;

      // set hidden uuid
      const hiddenUUIDInput = newBlock.querySelector('.selected-subquest-uuid');
      if (hiddenUUIDInput && uuid) {
        hiddenUUIDInput.value = uuid;
      }

      // set operator icon
      typeSpan.innerHTML = equalSvg;
    }
  });
}

    // click value → toggle dropdown
    const conditionValueEl = newBlock.querySelector(".condition-value");
    conditionValueEl.addEventListener("click", (e) => {
      e.stopPropagation();

      // close others
      document.querySelectorAll(".level-dropdown, .role-select, .quest-select").forEach(dd => {
        if (dd !== dropdownEl) dd.style.display = "none";
      });

      if (dropdownEl.style.display === "block") {
        dropdownEl.style.display = "none";
        openDropdown = null;
      } else {
        dropdownEl.style.display = "block";
        positionDropdown(dropdownEl);
        searchInput.focus();
        openDropdown = dropdownEl;
      }
    });

    // quest/subquest selection
    subquestItems.forEach(item => {
      item.addEventListener("click", () => {
        if (item.classList.contains("disabled")) return;

        // clear all previous ✅
        subquestItems.forEach(el => {
          el.innerHTML = `<span class="subquest-text">${el.textContent.trim()}</span><span class="checkmark"></span>`;
        });

        // add ✅ to this one
        item.innerHTML = `
          <span class="subquest-text">${item.textContent.trim()}</span>
          <span class="checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" fill="currentColor" stroke="currentColor">
            <path d="m85.652 6.5938c-15.199 4.6992-33.309 28.609-50.668 53.164-7.3672-12.414-15.172-16.559-23.242-12.312-0.99609 0.52344-1.6523 1.5273-1.7344 2.6562-0.082031 1.1406 0.42969 2.2422 1.3555 2.918 5.8516 4.2734 11.922 11.848 19.141 23.84v-0.003906c1.2891 2.1758 3.6328 3.5039 6.1562 3.4883h0.11719c2.6016-0.023438 4.9844-1.4453 6.2461-3.7188 7.0234-12.734 14.738-25.07 23.109-36.957 6.8594-9.75 14.508-18.926 22.867-27.43 1.125-1.1016 1.332-2.8359 0.5-4.1719-0.77734-1.332-2.3789-1.9453-3.8477-1.4727z"/>
            </svg>
          </span>
        `;


        valueText.textContent = item.textContent.trim();
        const hiddenUUIDInput = newBlock.querySelector('.selected-subquest-uuid');
        if (hiddenUUIDInput) {
            hiddenUUIDInput.value = item.dataset.subquestId;  // store UUID
        }

        // after selection → set equal SVG
        typeSpan.innerHTML = equalSvg;

        dropdownEl.style.display = "none";
        openDropdown = null;
      });
    });

    // search filter (hides quests with no matching subquests)
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();

      questItems.forEach(questItem => {
        const subquests = questItem.querySelectorAll(".subquest-item");
        let hasVisible = false;

        subquests.forEach(sub => {
          const text = sub.textContent.toLowerCase();
          if (text.includes(filter)) {
            sub.style.display = "";
            hasVisible = true;
          } else {
            sub.style.display = "none";
          }
        });

        questItem.style.display = hasVisible ? "" : "none";
      });
    });
  }







  // Delete button
  newBlock.querySelector(".delete-condition").addEventListener("click", () => {
    newBlock.remove();
    updateClearAllConditions();
    if (containerParent.querySelectorAll(".condition-block").length === 0) {
      containerParent.style.display = "none";
    }
    updateConditionColumnState();
  });

  containerParent.appendChild(newBlock);
  validateForm();
  updateClearAllConditions();
}



window.renderSavedCondition = renderSavedCondition
window.showDiscordPopup = function showDiscordPopup() {
  const popup = document.getElementById("discordPopup");              
  const popupContent = popup.querySelector(".custom-popup-content"); 
  const settingsLink = popup.querySelector(".target-link-into");    
    const dropdownHandle = document.querySelector(".condition")
    dropdownHandle.style.display = "none";
  if (!popup || !popupContent) return;

  // show
  popup.classList.add("show");

  // helper to hide + cleanup listeners
  const hide = () => {
    popup.classList.remove("show");
    popup.removeEventListener("click", overlayHandler);
    settingsLink?.removeEventListener("click", settingsHandler);

  };

  /* =========================
     OVERLAY CLICK CLOSE
  ========================= */
  const overlayHandler = (event) => {
    // ONLY close if clicking the overlay itself
    if (event.target === popup) {
      hide();
    }
  };

  /* =========================
     SETTINGS LINK CLOSE
  ========================= */
  const settingsHandler = () => {
    hide(); // close popup when link is clicked
  };

  // listeners
  popup.addEventListener("click", overlayHandler);

  if (settingsLink) {
    settingsLink.addEventListener("click", settingsHandler);
  }

};











function callingTriggerArialAsp() {
  const triggers = document.querySelectorAll(".conshift");
  const levelDropdownTemplate = document.getElementById("levelDropdownTemplate");
  const roleSelectTemplate = document.getElementById("roleSelectTemplate");
  const clearBtn = document.getElementById("clearAllCondition");

  let openDropdown = null;



  /* =========================
    SMART POSITION ENGINE
  ========================= */
  function smartPosition(trigger, dropdown) {
    const tRect = trigger.getBoundingClientRect();
    const dRect = dropdown.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceBottom = vh - tRect.bottom;
    const spaceTop    = tRect.top;
    const spaceRight  = vw - tRect.right;
    const spaceLeft   = tRect.left;

    // reset
    dropdown.style.top = "auto";
    dropdown.style.bottom = "auto";
    dropdown.style.left = "auto";
    dropdown.style.right = "auto";

    dropdown.style.position = "absolute";

    /* ---- Vertical logic ---- */
    if (spaceBottom >= dRect.height || spaceBottom >= spaceTop) {
      // drop down
      dropdown.style.top = `${tRect.bottom + window.scrollY + 6}px`;
    } else {
      // drop up
      dropdown.style.top = `${tRect.top + window.scrollY - dRect.height - 6}px`;
    }

    /* ---- Horizontal logic ---- */
    if (spaceRight >= dRect.width || spaceRight >= spaceLeft) {
      // align left
      dropdown.style.left = `${tRect.left + window.scrollX}px`;
    } else {
      // align right
      dropdown.style.left = `${tRect.right + window.scrollX - dRect.width}px`;
    }
  }



  function closeAllDropdowns(except = null) {
    document.querySelectorAll(".condition, .level-dropdown, .role-select, .quest-select")
      .forEach(dd => { if (dd !== except) dd.style.display = "none"; });

    // ✅ Close Flatpickr if open
    if (openDropdown && openDropdown.close && openDropdown !== except) {
      openDropdown.close();
      openDropdown = null;
    }
  }



  // --- Update clear button visibility ---

  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".conshift") ||
      e.target.closest(".condition") ||
      e.target.closest(".level-dropdown") ||
      e.target.closest(".role-select") ||
      e.target.closest(".quest-select")
    ) return;

    closeAllDropdowns(null);
  });
  // --- Clear all conditions ---
  clearBtn.addEventListener("click", () => {
    const containerParent = document.getElementById("conditionContainerParent");
    containerParent.innerHTML = "";
    containerParent.style.display = "none";
    clearBtn.style.display = "none";
    openDropdown = null;
    updateConditionColumnState();
  });


  function forceCloseCondition() {
    document.querySelectorAll(".condition").forEach(c => {
      c.style.display = "none";
    });

    if (openDropdown && openDropdown.classList?.contains("condition")) {
      openDropdown = null;
    }
  }

  window.addEventListener("scroll", forceCloseCondition, { passive: true });

  document.addEventListener("scroll", forceCloseCondition, true);

  document.querySelectorAll("*").forEach(el => {
    if (getComputedStyle(el).overflowY === "auto" || getComputedStyle(el).overflowY === "scroll") {
      el.addEventListener("scroll", forceCloseCondition, { passive: true });
    }
  });



  function setSingleSubquestSelection(dropdownEl, selectedItem) {

    const items = dropdownEl.querySelectorAll(".subquest-item");

    // 🔥 clear all
    items.forEach(el => {
      el.innerHTML = `
        <span class="subquest-text">${el.textContent.trim()}</span>
        <span class="checkmark"></span>
      `;
    });

    // ✅ set only one
    selectedItem.innerHTML = `
      <span class="subquest-text">${selectedItem.textContent.trim()}</span>
      <span class="checkmark">
        ${CHECK_SVG}
      </span>
    `;
  }



  // --- Condition triggers ---
  triggers.forEach(trigger => {
    const dropdown = trigger.nextElementSibling;

    // Toggle Add Condition dropdown
    // Condition trigger (Add condition button)
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      // find related dropdown safely
      const dropdown = trigger.closest(".condition-wrapper, .condition-container, body")
        ?.querySelector(".condition");

      if (!dropdown) return;

      // toggle
      if (openDropdown === dropdown) {
        dropdown.style.display = "none";
        openDropdown = null;
        return;
      }

      closeAllDropdowns(dropdown);

      dropdown.style.display = "block";

      requestAnimationFrame(() => {
        smartPosition(trigger, dropdown);
      });

      openDropdown = dropdown;
    });

document.querySelectorAll(".condition .option").forEach(option => {
  option.addEventListener("click", (e) => {
        e.stopPropagation();

        const containerParent = document.getElementById("conditionContainerParent");
        containerParent.style.display = "flex";

        const newBlock = document.createElement("div");
        newBlock.classList.add("condition-block");
        newBlock.innerHTML = `
          <div class="conditionsec condition-actions" style="font-size:14px;font-weight:bold"> 
            <div class="conditon-wrapper condition-item">
              <span class="conditionDisplay" style="gap:3px; display: flex;"></span>
            </div>
            <span class="divider"></span>
            <span class="condition-item conitiontype"><span></span></span>
            <span class="divider"></span>
            <span class="condition-item condition-value">
              <span class="valueDisplay" style="min-width:20px; display:inline-block; cursor:pointer; position:relative;">
                <span class="valueText"></span>
              </span>
            </span>
            <span class="divider"></span>
  <span class="condition-item delete-condition" style="color:#9e9eac;cursor:pointer;">
    <svg width="15" height="15" class="triggerDeletePopup" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Trash lid -->
      <path d="M20.5 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

      <!-- Trash body -->
      <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>

      <!-- Trash handle/body curve -->
      <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>

      <!-- Two vertical bars -->
      <line x1="10" y1="9" x2="10" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
      <line x1="14" y1="9" x2="14" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></line>
    </svg>
  </span>

          </div>
        `;

        const displaySpan = newBlock.querySelector(".conditionDisplay");
        const iconEl = option.querySelector("svg");
        if (iconEl) {
          const clone = iconEl.cloneNode(true);
          clone.classList.add("condition-icon");  // new class
          displaySpan.appendChild(clone);
        }

        displaySpan.appendChild(document.createTextNode(" " + option.textContent.trim()));


        const typeSpan = newBlock.querySelector(".conitiontype span");
        const valueText = newBlock.querySelector(".valueText");

        if (["Level", "Followers"].includes(option.textContent.trim())) {
          const type = option.textContent.trim(); 
          // default operator arrow (less-than)
          typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg" fill="currentColor">
          <path d="M22.36 2.63c.35.76.02 1.67-.74 2.02L5.09 12l16.53 7.35c.76.35 1.1 1.26.74 2.02s-1.26 1.1-2.02.74L1.42 13.56c-.54-.25-.89-.79-.89-1.38s.35-1.13.89-1.38l18.94-8.74c.76-.35 1.67-.02 2.02.74z"/>
        </svg>
        `;
          typeSpan.dataset.operator = "<";

          // clone dropdown template
          const dropdownClone = levelDropdownTemplate.content.cloneNode(true);
          newBlock.appendChild(dropdownClone);

          const dropdownEl = newBlock.querySelector(".level-dropdown");
          const inputEl = dropdownEl.querySelector("input");
          if (type === "Level") {
            inputEl.placeholder = "Enter level";
            inputEl.min = 1;
          }

          if (type === "Followers") {
            inputEl.placeholder = "Enter follower count";
            inputEl.min = 0;
          }

          // Show dropdown briefly to compute position
          dropdownEl.style.visibility = "hidden";
          dropdownEl.style.display = "block";
          positionDropdown(dropdownEl);
          dropdownEl.style.visibility = "visible";

          setTimeout(() => inputEl.focus(), 0);

          // clicking value box toggles dropdown
          const conditionValueEl = newBlock.querySelector(".condition-value");
          conditionValueEl.addEventListener("click", (e) => {
            e.stopPropagation();

            document.querySelectorAll(".level-dropdown, .role-select, .quest-select").forEach(dd => {
              if (dd !== dropdownEl) dd.style.display = "none";
            });

            if (dropdownEl.style.display === "block") {
              dropdownEl.style.display = "none";
              openDropdown = null;
            } else {
              dropdownEl.style.display = "block";
              positionDropdown(dropdownEl);
              inputEl.value = valueText.textContent.trim(); // restore previous value
              inputEl.focus();
              openDropdown = dropdownEl;
            }
          });

          // Typing in input updates valueText & validates form
          inputEl.addEventListener("input", () => {
            const val = parseFloat(inputEl.value);
            if (!isNaN(val) && val > 0) {
              inputEl.style.border = "";
              valueText.textContent = inputEl.value;
              typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg"  fill="currentColor">
          <path d="M1.64 2.63c-.35.76-.02 1.67 0.74 2.02L18.91 12 2.38 19.35c-.76.35-1.1 1.26-.74 2.02s1.26 1.1 2.02.74l19.92-9.17c.54-.25.89-.79.89-1.38s-.35-1.13-.89-1.38L3.66 1.89c-.76-.35-1.67-.02-2.02.74z"/>
        </svg>
        `;
              typeSpan.dataset.operator = ">";
            } else {
              inputEl.style.border = "1px solid red";
              valueText.textContent = ""; 
              typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="con-svg" fill="currentColor">
          <path d="M22.36 2.63c.35.76.02 1.67-.74 2.02L5.09 12l16.53 7.35c.76.35 1.1 1.26.74 2.02s-1.26 1.1-2.02.74L1.42 13.56c-.54-.25-.89-.79-.89-1.38s.35-1.13.89-1.38l18.94-8.74c.76-.35 1.67-.02 2.02.74z"/>
        </svg>
        `;
              typeSpan.dataset.operator = "<";
            }
            validateForm(); // ✅ reliably validate on every input
          });
        }

        // Handle Discord Role (dropdown with roleSelectTemplate)
        if (option.textContent.trim() === "Role") {
          // Default operator → NOT EQUAL SVG
          typeSpan.innerHTML = notEqualSvg;

          // 🔹 check if Discord is connected (Flask injected bool)
          const discordConnected = "{{ 'true' if discord_connected else 'false' }}" === "true";
          const conditionValueEl = newBlock.querySelector(".condition-value");

          if (!discordConnected) {
            valueText.innerHTML = `
              <i class="fab fa-discord" style="color:#5865F2; font-size:14px; margin-right:4px;"></i>
              <span style="color:#999;">Discord Required</span>
            `;
            setTimeout(showDiscordPopup, 50);

            conditionValueEl.addEventListener("click", (e) => {
              e.stopPropagation();
              showDiscordPopup();
            });

            return; // stop here
          }

          // ✅ Normal flow: Discord connected → show dropdown
          const dropdownClone = roleSelectTemplate.content.cloneNode(true);
          newBlock.appendChild(dropdownClone);

          const dropdownEl = newBlock.querySelector(".role-select");
          const searchInput = dropdownEl.querySelector("input");
          const roleItems = dropdownEl.querySelectorAll(".role-item");

          dropdownEl.style.display = "block";
          positionDropdown(dropdownEl);
          searchInput.focus();
          openDropdown = dropdownEl;

          conditionValueEl.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".level-dropdown, .role-select, .quest-select").forEach(dd => {
              if (dd !== dropdownEl) dd.style.display = "none";
            });

            if (openDropdown && openDropdown !== dropdownEl) openDropdown.style.display = "none";

            dropdownEl.style.display = dropdownEl.style.display === "block" ? "none" : "block";
            if (dropdownEl.style.display === "block") {
              positionDropdown(dropdownEl);
              searchInput.focus();
              openDropdown = dropdownEl;
            } else {
              openDropdown = null;
            }
          });

          // Role selection
          roleItems.forEach(item => {
            item.addEventListener("click", () => {
              if (item.classList.contains("disabled")) return;
              valueText.textContent = item.textContent.trim();
              dropdownEl.style.display = "none";
              openDropdown = null;

              // Switch operator → EQUAL SVG
              typeSpan.innerHTML = equalSvg;
              validateForm();
            });
          });

          // Role search filter
          searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            roleItems.forEach(item => {
              item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
            });
          });
        }

        if (option.textContent.trim() === "Date") {

          const container = newBlock.querySelector(".condition-value .valueDisplay");
          const typeSpan = newBlock.querySelector(".conitiontype span"); 

          container.addEventListener("click", (e) => {
            e.stopPropagation();

            openCustomDatePicker(container, (dateObj, formatted) => {
              valueText.textContent = formatted;

              if (formatted) {
                typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  class="con-svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M1.64 2.63c-.35.76-.02 1.67 0.74 2.02L18.91 12 2.38 19.35c-.76.35-1.1 1.26-.74 2.02s1.26 1.1 2.02.74l19.92-9.17c.54-.25.89-.79.89-1.38s-.35-1.13-.89-1.38L3.66 1.89c-.76-.35-1.67-.02-2.02.74z"/>
                                  </svg>
                                  `;
                typeSpan.dataset.operator = ">"; 
              } else {
                typeSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="con-svg"  viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M22.36 2.63c.35.76.02 1.67-.74 2.02L5.09 12l16.53 7.35c.76.35 1.1 1.26.74 2.02s-1.26 1.1-2.02.74L1.42 13.56c-.54-.25-.89-.79-.89-1.38s.35-1.13.89-1.38l18.94-8.74c.76-.35 1.67-.02 2.02.74z"/>
                </svg>
                `;
                typeSpan.dataset.operator = "<"; 
              }

              validateForm();
            });
          });

          // auto open for new condition
          setTimeout(() => {
            container.click();
          }, 0);
        }



      if (option.textContent.trim() === "Quest") {
      typeSpan.innerHTML = notEqualSvg;

        const dropdownClone = questSelectTemplate.content.cloneNode(true);
        newBlock.appendChild(dropdownClone);

        const dropdownEl = newBlock.querySelector(".quest-select");
        const searchInput = dropdownEl.querySelector("input");
        const questItems = dropdownEl.querySelectorAll(".quest-item");

        // Show dropdown immediately
        dropdownEl.style.display = "block";
        positionDropdown(dropdownEl);
        searchInput.focus();
        openDropdown = dropdownEl;

        // Click on condition value toggles dropdown
        const conditionValueEl = newBlock.querySelector(".condition-value");
        conditionValueEl.addEventListener("click", (e) => {
          e.stopPropagation();

          document.querySelectorAll(".level-dropdown, .role-select, .quest-select").forEach(dd => {
            if (dd !== dropdownEl) dd.style.display = "none";
          });

          if (dropdownEl.style.display === "block") {
            dropdownEl.style.display = "none";
            openDropdown = null;
          } else {
            dropdownEl.style.display = "block";
            positionDropdown(dropdownEl);
            searchInput.focus();
            openDropdown = dropdownEl;
          }
        });

        dropdownEl.querySelectorAll(".subquest-item").forEach(item => {
          item.addEventListener("click", () => {
            if (item.classList.contains("disabled")) return;

            // ✅ single selection system
            setSingleSubquestSelection(dropdownEl, item);

            // Update condition value
            valueText.textContent = item.textContent.trim();

            const hiddenUUIDInput = newBlock.querySelector('.selected-subquest-uuid');
            if (hiddenUUIDInput) {
              hiddenUUIDInput.value = item.dataset.subquestId;
            }

            // Operator
            typeSpan.innerHTML = equalSvg;

            // Close dropdown
            dropdownEl.style.display = "none";
            openDropdown = null;

            validateForm();
          });
        });

        // ✅ Quest search filter (fix to filter subquests too)
        searchInput.addEventListener("input", () => {
          const filter = searchInput.value.toLowerCase();

          questItems.forEach(questItem => {
            const subquests = questItem.querySelectorAll(".subquest-item");
            let hasVisibleSubquests = false;

            subquests.forEach(sub => {
              const text = sub.textContent.toLowerCase();
              if (text.includes(filter)) {
                sub.style.display = "";   // show match
                hasVisibleSubquests = true;
              } else {
                sub.style.display = "none"; // hide non-match
              }
            });

            // ✅ Hide quest group if no subquest matches
            questItem.style.display = hasVisibleSubquests ? "" : "none";
          });
        });

      }



      
        // Delete single condition
        newBlock.querySelector(".delete-condition").addEventListener("click", () => {
          if (newBlock.querySelector(".level-dropdown, .role-select") === openDropdown) {
            openDropdown = null;
          }
          newBlock.remove();
          updateClearAllConditions();
          if (containerParent.querySelectorAll(".condition-block").length === 0) {
            containerParent.style.display = "none";
          }
          updateConditionColumnState();

        });

        containerParent.appendChild(newBlock);
        validateForm();
        updateConditionColumnState();
        updateClearAllConditions();
        const dropdown = document.querySelector(".condition")
        dropdown.style.display = "none";
      });
  });
});



  document.addEventListener("click", (e) => {
    if ([...triggers].some(trigger => trigger.contains(e.target)) ||
        e.target.closest(".condition") ||
        e.target.closest(".level-dropdown") ||
        e.target.closest(".role-select") ||
        e.target.closest(".quest-select") ||
        e.target.closest(".flatpickr-calendar")) return;

    document.querySelectorAll(".condition").forEach(dd => dd.style.display = "none");
    document.querySelectorAll(".level-dropdown, .role-select, .quest-select").forEach(dd => dd.style.display = "none");

    // ✅ Close Flatpickr
    if (openDropdown && openDropdown.close) {
      openDropdown.close();
    }

    openDropdown = null;
  });




}





  let GLOBAL_RENO = null;
  let ACTIVE_WRAPPER = null;
  const REWARD_STATE = new Map(); 
  function createGlobalRenoContainer() {
    if (GLOBAL_RENO) return GLOBAL_RENO;

    const div = document.createElement("div");
    div.className = "renocontainer";
    div.style.display = "none";

    div.innerHTML = `
      <h2>Reward Method</h2>
      <div class="tab-buttons">
        <div class="contents1" data-target="subcontent1">
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4285f4">
            <path
              d="M232,128.00037A104.11767,104.11767,0,0,0,128.042,24.00086L128,23.96423l-.042.03663a103.99952,103.99952,0,0,0-.001,207.999l.043.0376.043-.0376A104.11763,104.11763,0,0,0,232,128.00037Zm-16.36768-8h-39.853c-1.5918-29.637-12.01123-57.01758-29.5044-78.08643A88.1919,88.1919,0,0,1,215.63232,120.00037Zm-119.37353,16h63.48242C157.93164,164.75623,146.44678,191.703,128,210.44177,109.55322,191.703,98.06836,164.75623,96.25879,136.00037Zm0-16C98.06836,91.24353,109.55322,64.29675,128,45.559c18.44678,18.73779,29.93164,45.68457,31.74121,74.44141Zm50.01562,94.08642c17.49317-21.06933,27.9126-48.45044,29.50489-78.08642h39.853A88.19181,88.19181,0,0,1,146.27441,214.08679Z"
              fill="#4285f4"
            />
          </svg>
          <span>All</span>
        </div>
        <div class="contents2" data-target="subcontent2">
          <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" style="flex-shrink: 0"
              width="16"
              height="16"
              fill="#e67e22"
              stroke="#e67e22"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round">
            <path d="M13 3 
                    C12.6 2.5,12 2.5,11.7 3 
                    L5.5 12.2 
                    C5.2 12.7,5.5 13.3,6 13.3 
                    H10 
                    V21 
                    C10 21.5,10.7 21.7,11.1 21.3 
                    L18.2 12.3 
                    C18.6 11.8,18.3 11.2,17.7 11.2 
                    H13 
                    V3 Z"/>
          </svg>
          <span>FCFS</span>
        </div>
        <div class="contents3" data-target="subcontent3">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M14.0079 19.0029L14.0137 17C14.0137 16.4477 14.4625 16 15.0162 16C15.5698 16 16.0187 16.4477 16.0187 17V18.9765C16.0187 19.458 16.0187 19.6988 16.1731 19.8464C16.3275 19.9941 16.5637 19.984 17.0362 19.964C18.8991 19.8852 20.0437 19.6332 20.8504 18.8284C21.6591 18.0218 21.911 16.8766 21.9894 15.0105C22.005 14.6405 22.0128 14.4554 21.9437 14.332C21.8746 14.2085 21.5987 14.0545 21.0469 13.7463C20.4341 13.4041 20.0199 12.7503 20.0199 12C20.0199 11.2497 20.4341 10.5959 21.0469 10.2537C21.5987 9.94554 21.8746 9.79147 21.9437 9.66803C22.0128 9.54458 22.005 9.35954 21.9894 8.98947C21.911 7.12339 21.6591 5.97823 20.8504 5.17157C19.9727 4.29604 18.6952 4.0748 16.5278 4.0189C16.2482 4.01169 16.0187 4.23718 16.0187 4.51618V7C16.0187 7.55228 15.5698 8 15.0162 8C14.4625 8 14.0137 7.55228 14.0137 7L14.0064 4.49855C14.0056 4.22298 13.7814 4 13.5052 4H9.99502C6.21439 4 4.32407 4 3.14958 5.17157C2.34091 5.97823 2.08903 7.12339 2.01058 8.98947C1.99502 9.35954 1.98724 9.54458 2.05634 9.66802C2.12545 9.79147 2.40133 9.94554 2.95308 10.2537C3.56586 10.5959 3.98007 11.2497 3.98007 12C3.98007 12.7503 3.56586 13.4041 2.95308 13.7463C2.40133 14.0545 2.12545 14.2085 2.05634 14.332C1.98724 14.4554 1.99502 14.6405 2.01058 15.0105C2.08903 16.8766 2.34091 18.0218 3.14958 18.8284C4.32407 20 6.21438 20 9.99502 20H13.0054C13.4767 20 13.7124 20 13.8591 19.8541C14.0058 19.7081 14.0065 19.4731 14.0079 19.0029ZM16.0187 13V11C16.0187 10.4477 15.5698 10 15.0162 10C14.4625 10 14.0137 10.4477 14.0137 11V13C14.0137 13.5523 14.4625 14 15.0162 14C15.5698 14 16.0187 13.5523 16.0187 13Z"
              fill="#8B5CF6"
            />
          </svg>
          <span>Raffle</span>
        </div>
        <div class="contents4" data-target="subcontent4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(0, 255, 0)"
              width="16"
              height="16" class="reward-icons" >
            <g transform="scale(0.0375)">
              <path d="M144 224C161.7 224 176 238.3 176 256L176 512C176 529.7 161.7 544 144 544L96 544C78.3 544 64 529.7 64 512L64 256C64 238.3 78.3 224 96 224L144 224zM334.6 80C361.9 80 384 102.1 384 129.4L384 133.6C384 140.4 382.7 147.2 380.2 153.5L352 224L512 224C538.5 224 560 245.5 560 272C560 291.7 548.1 308.6 531.1 316C548.1 323.4 560 340.3 560 360C560 383.4 543.2 402.9 521 407.1C525.4 414.4 528 422.9 528 432C528 454.2 513 472.8 492.6 478.3C494.8 483.8 496 489.8 496 496C496 522.5 474.5 544 448 544L360.1 544C323.8 544 288.5 531.6 260.2 508.9L248 499.2C232.8 487.1 224 468.7 224 449.2L224 262.6C224 247.7 227.5 233 234.1 219.7L290.3 107.3C298.7 90.6 315.8 80 334.6 80z"/>
            </g>
          </svg>
          <span>Vote</span>
        </div>
      </div>

      <div class="subcontent1">
        <p>Everyone who completes the quest gets this reward.</p>
      </div>
    <div class="subcontent2">
      <p>First to finish get this reward. After that, you can still complete the quest but won't get this reward.</p>
      <label>Max Supply</label>
      <input type="number">
    </div>

    <div class="subcontent3">
      <p>Complete quest to enter a raffle. Winners picked when quest ends or reaches max participants.</p>
      <label>Number of rewards</label>
      <input type="number">
    </div>

    <div class="subcontent4">
      <p>All users who have successfully completed this quest will be subject to votes from other community members.</p>
      <label>Number of rewards</label>
      <input type="number">
    </div>


      <button class="piicki">OK</button>
    `;

    const container = document.getElementById("inject-main-card");
    if (container) {
      container.appendChild(div);
    }
    GLOBAL_RENO = div;

    return div;
  }

  function initRenoDropdown(wrapper) {
    const rewardType = wrapper.querySelector(".reward-type");
    if (!rewardType) return;

    const reno = createGlobalRenoContainer();
    const okBtn = reno.querySelector(".piicki");

    /* ===============================
      🔒 PREVENT INSIDE CLICKS FROM CLOSING
    =============================== */
    reno.addEventListener("click", (e) => {
      e.stopPropagation(); // stop document click
    });

    /* ===============================
      OPEN DROPDOWN
    =============================== */
  rewardType.addEventListener("click", (e) => {
    e.stopPropagation();

    ACTIVE_WRAPPER = wrapper;
    const state = REWARD_STATE.get(wrapper);

    const tabs = reno.querySelectorAll(".tab-buttons > div");
    const contents = reno.querySelectorAll(
      ".subcontent1, .subcontent2, .subcontent3, .subcontent4"
    );

    // reset UI
    tabs.forEach(t => t.classList.remove("active-tab"));
    contents.forEach(c => c.classList.remove("active-content"));
    reno.querySelectorAll("input").forEach(inp => inp.value = "");

    if (state) {
      // ✅ activate tab
      tabs.forEach(t => {
        const label = t.querySelector("span")?.innerText.trim();
        if (label === state.type) {
          t.classList.add("active-tab");

          // ✅ activate content
          const target = t.dataset.target;
          const content = reno.querySelector("." + target);
          if (content) content.classList.add("active-content");
        }
      });

      // ✅ restore inputs
      if (state.maxSupply) {
        const maxInput = reno.querySelector('.subcontent2 input');
        if (maxInput) maxInput.value = state.maxSupply;
      }

      if (state.rewardCount) {
        const raffleInput = reno.querySelector('.subcontent3 input');
        const voteInput = reno.querySelector('.subcontent4 input');
        if (raffleInput) raffleInput.value = state.rewardCount;
        if (voteInput) voteInput.value = state.rewardCount;
      }
    }

    // show + position
    reno.style.display = "block";
    reno.style.visibility = "hidden";

    const dropdownHeight = reno.offsetHeight || 240;
    const rect = rewardType.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;
    if (spaceBelow >= dropdownHeight) {
      top = rect.bottom + window.scrollY;
    } else if (spaceAbove >= dropdownHeight) {
      top = rect.top + window.scrollY - dropdownHeight;
    } else {
      top = rect.bottom + window.scrollY;
    }

    const isMobile = window.innerWidth <= 767;
    let left;
    let width = reno.offsetWidth || 320;
    const padding = 12;

    if (isMobile) {
      reno.style.width = "calc(100vw - 24px)";
      left = 12 + window.scrollX;
    } else {
      left = rect.left + window.scrollX;
      const viewportRight = window.scrollX + window.innerWidth;

      if (left + width + padding > viewportRight) {
        left = viewportRight - width - padding;
      }
      if (left < window.scrollX + padding) {
        left = window.scrollX + padding;
      }
      reno.style.width = "";
    }

    reno.style.top = `${top}px`;
    reno.style.left = `${left}px`;
    reno.style.visibility = "visible";
  });


    /* ===============================
      OK BUTTON
    =============================== */
    okBtn.onclick = (e) => {
      e.stopPropagation(); // stop document click
      reno.style.display = "none";
      const state = REWARD_STATE.get(ACTIVE_WRAPPER);
      if (state) {
        if (state.type === "FCFS") {
          const maxInput = GLOBAL_RENO.querySelector('.subcontent2 input');
          state.maxSupply = maxInput?.value || "";
        }

        if (state.type === "Raffle") {
          const raffleInput = GLOBAL_RENO.querySelector('.subcontent3 input');
          state.rewardCount = raffleInput?.value || "";
        }

        if (state.type === "Vote") {
          const voteInput = GLOBAL_RENO.querySelector('.subcontent4 input');
          state.rewardCount = voteInput?.value || "";
        }

        REWARD_STATE.set(ACTIVE_WRAPPER, state);
      }

      ACTIVE_WRAPPER = null;
      validateForm?.();
    };

    /* ===============================
      TAB LOGIC (SHARED DROPDOWN)
    =============================== */
    const tabs = reno.querySelectorAll(".tab-buttons > div");
    const contents = reno.querySelectorAll(
      ".subcontent1, .subcontent2, .subcontent3, .subcontent4"
    );

    tabs.forEach(tab => {
      tab.onclick = (e) => {
        e.stopPropagation();

        tabs.forEach(t => t.classList.remove("active-tab"));
        contents.forEach(c => c.classList.remove("active-content"));

        tab.classList.add("active-tab");

        const target = tab.dataset.target;
        const content = reno.querySelector("." + target);
        if (content) content.classList.add("active-content");

        /* 🔁 Update badge + reset state */
        if (ACTIVE_WRAPPER) {
          const rewardTypeEl = ACTIVE_WRAPPER.querySelector(".reward-type");
          const svgEl = tab.querySelector("svg");
          const labelEl = tab.querySelector("span");

          const svgHTML = svgEl ? svgEl.outerHTML : "";
          const label = labelEl ? labelEl.innerText.trim() : "";

          // update badge
          rewardTypeEl.innerHTML = `
            ${svgHTML}
            ${label}
          `;
          ACTIVE_WRAPPER.dataset.distributionType = label.toLowerCase();
          // 🧹 WIPE OLD STATE
          const state = {
            type: label
          };
          REWARD_STATE.set(ACTIVE_WRAPPER, state);

          // 🧼 clear inputs
          reno.querySelectorAll("input").forEach(inp => inp.value = "");
        }

        // 🔄 reposition after DOM height change
        requestAnimationFrame(() => {
          repositionReno();
        });

        validateForm();
      };
    });

  }

  function repositionReno() {
    if (!GLOBAL_RENO || !ACTIVE_WRAPPER) return;

    const rewardType = ACTIVE_WRAPPER.querySelector(".reward-type");
    if (!rewardType) return;

    const reno = GLOBAL_RENO;

    // measure new height after content change
    reno.style.visibility = "hidden";
    reno.style.display = "block";

    const dropdownHeight = reno.offsetHeight || 240;

    const rect = rewardType.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;

    if (spaceBelow >= dropdownHeight) {
      top = rect.bottom + window.scrollY; // dropdown
    } else if (spaceAbove >= dropdownHeight) {
      top = rect.top + window.scrollY - dropdownHeight; // dropup
    } else {
      top = rect.bottom + window.scrollY; // fallback
    }

    const isMobile = window.innerWidth <= 767;
    let left;
    let width = reno.offsetWidth || 320;
    const padding = 12;

    if (isMobile) {
      reno.style.width = "calc(100vw - 24px)";
      left = 12 + window.scrollX;
    } else {
      left = rect.left + window.scrollX;

      const viewportRight = window.scrollX + window.innerWidth;

      if (left + width + padding > viewportRight) {
        left = viewportRight - width - padding;
      }

      if (left < window.scrollX + padding) {
        left = window.scrollX + padding;
      }

      reno.style.width = "";
    }

    reno.style.top = `${top}px`;
    reno.style.left = `${left}px`;
    reno.style.visibility = "visible";
  }






  function updateClearAllRewards() {
  const rewardParent = document.getElementById("rewardContainerParent");
  const clearAllBtn = document.getElementById("clearAllRewards");
  if (!rewardParent || !clearAllBtn) return;

  const wrappers = [...rewardParent.querySelectorAll(".rewardContainerWrapper")]
    .filter(w => !w.dataset.placeholder);

  const visibleWrappers = wrappers.filter(
    w => document.body.contains(w) && w.offsetParent !== null
  );


  clearAllBtn.style.display =
    visibleWrappers.length >= 2 ? "inline-flex" : "none";
}
  function updateClearAllConditions() {
    const containerParent = document.getElementById("conditionContainerParent");
    const conditionCount = containerParent.querySelectorAll(".condition-block").length;
    const clearBtn = document.getElementById("clearAllCondition");
    clearBtn.style.display = conditionCount >= 2 ? "flex" : "none";
  }




function initCooldownTimers() {
  const timers = document.querySelectorAll(".cooldown-retry");
  if (!timers.length) return;

  function parseUtc(iso) {
    if (!iso) return null;
    if (iso.includes("Z") || iso.includes("+")) return iso;
    return iso + "Z";
  }

  function formatTime(sec) {
    const MONTH = 30 * 24 * 60 * 60; // approx
    const WEEK  = 7  * 24 * 60 * 60;
    const DAY   = 24 * 60 * 60;
    const HOUR  = 60 * 60;
    const MIN   = 60;

    if (sec >= MONTH) {
      const m = Math.floor(sec / MONTH);
      return `${m}mo`;
    }

    if (sec >= WEEK) {
      const w = Math.floor(sec / WEEK);
      return `${w}w`;
    }

    if (sec >= DAY) {
      const d = Math.floor(sec / DAY);
      const h = Math.floor((sec % DAY) / HOUR);
      return h > 0 ? `${d}d ${h}h` : `${d}d`;
    }

    if (sec >= HOUR) {
      const h = Math.floor(sec / HOUR);
      const m = Math.floor((sec % HOUR) / MIN);
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }

    if (sec >= MIN) {
      const m = Math.floor(sec / MIN);
      const s = sec % MIN;
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    }

    return `${sec}s`;
  }

  function update() {
    const now = Date.now();

    timers.forEach(el => {
      const untilRaw = el.dataset.cooldownUntil;
      if (!untilRaw) return;

      const normalized = parseUtc(untilRaw);
      const until = new Date(normalized).getTime();
      if (isNaN(until)) return;

      const diff = Math.floor((until - now) / 1000); // seconds
      const timerMain = el.closest(".timer-main");

      /* =======================
         ACTIVE COOLDOWN
      ======================= */
      if (diff > 0) {
        el.textContent = formatTime(diff);
        return;
      }

      /* =======================
         EXPIRED COOLDOWN
      ======================= */

      if (el.dataset.cooldownDone === "1") return;
      el.dataset.cooldownDone = "1";

      if (timerMain) {
        timerMain.remove();
      }

      /* =======================
         CLAIM BUTTON RESTORE
      ======================= */

      const claimSection = el.closest(".claim-button") 
                        || document.querySelector(".claim-button");

      if (!claimSection) return;

      const claimBtn = claimSection.querySelector("#claim-task");
      const coolDisplay = claimSection.querySelector(".cool-display");

      if (coolDisplay) {
        coolDisplay.style.display = "none";
      }

      if (claimBtn) {
        claimBtn.style.display = "flex";
        claimBtn.classList.remove("enabled");
        claimBtn.classList.add("disable");
        claimBtn.setAttribute("disabled", "true");
        claimBtn.style.cursor = "not-allowed";
      }
    });
  }

  update();
  setInterval(update, 1000);
}

function updateClaimButtonCooldown(cooldownUntil) {
  const claimSection = document.querySelector(".claim-button");
  if (!claimSection) return;

  const cooldownDisplay = claimSection.querySelector(".cool-display");
  const claimBtn = claimSection.querySelector("#claim-task");

  if (cooldownDisplay) {
    cooldownDisplay.style.display = "flex";   // ✅ force show
    const span = cooldownDisplay.querySelector(".cooldown-retry");
    if (span) {
      span.dataset.cooldownUntil = cooldownUntil;
      span.textContent = "--";
    }
  }

  if (claimBtn) {
    claimBtn.style.display = "none";        
    claimBtn.classList.remove("enabled");
    claimBtn.setAttribute("disabled", "true");
  }
}


window.launchConfetti = function () {
  if (!window.confetti) return;

  const container = document.querySelector(".quest-complete");
  if (!container) return;

  const canvas = container.querySelector(".confetti-canvas");
  if (!canvas) return;

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });

  const colors = ["#facc15", "#fde68a", "#ffffff", "#22c55e"];

  const floatDefaults = {
    spread: 140,
    ticks: 1200,           
    gravity: 0.02,         
    decay: 0.995,        
    startVelocity: 0.6,    
    scalar: 0.3,          
    shapes: ["circle"],
    colors
  };

  let running = true;

  // 🌫 floating emission
  const interval = setInterval(() => {

    // left float
    myConfetti({
      ...floatDefaults,
      particleCount: 4,
      angle: 20,
      origin: { x: 0.05, y: 0.75 }
    });

    // right float
    myConfetti({
      ...floatDefaults,
      particleCount: 4,
      angle: 160,
      origin: { x: 0.95, y: 0.75 }
    });

    // top float mist
    myConfetti({
      ...floatDefaults,
      particleCount: 6,
      angle: 90,
      spread: 160,
      startVelocity: 0.4,
      gravity: 0.015,
      origin: { x: 0.5, y: -0.05 }
    });

  }, 700); // slow emission

  // ⏱ stop after 10s
  setTimeout(() => {
    running = false;
    clearInterval(interval);

    // 🧹 fade out clean
    setTimeout(() => {
      myConfetti.reset();
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);

  }, 10000); // 🔥 total duration = 10s
};






function showCloserAllOverlay() {
  let el = document.querySelector(".closer-all-ppp-qq-init");



  el.style.display = "none";
}

function normalizeUtcIso(iso) {
  if (!iso) return null;

  // already has timezone
  if (iso.includes("Z") || iso.includes("+")) return iso;

  // force UTC
  return iso + "Z";
}


async function handlePreviewClaim(subquestId, claimBtn){
  if (!claimBtn.classList.contains("enabled")) return;
  const originalHTML = claimBtn.innerHTML;  

  claimBtn.innerHTML = IsloadingInit;      
  claimBtn.setAttribute("disabled", "true");
  claimBtn.style.cursor = "wait";

  claimBtn.setAttribute("disabled", "true");
  claimBtn.style.cursor = "wait";

  const disableClaimButton = () => {
    claimBtn.classList.remove("enabled");
    claimBtn.classList.add("disable");
    claimBtn.setAttribute("disabled", "true");
  };

  try {
    const quizAnswers = {};

    document.querySelectorAll('.card-container-quest.quiz').forEach(card => {
      const taskId = card.dataset.taskId;
      if(!taskId) return;

      const selectedIndexes = [];
      const selectedTexts = [];

      const inputs = card.querySelectorAll(
        'input[type="radio"], input[type="checkbox"]'
      );

      inputs.forEach(input => {
        if(input.checked){
          const label = input.closest("label");
          const text = label?.querySelector(".radio-text")?.textContent?.trim() || "";

          const index = parseInt(input.value, 10); // <-- your renderer sets value=i

          selectedIndexes.push(index);
          selectedTexts.push(text);
        }
      });

      quizAnswers[taskId] = {
        selected_indexes: selectedIndexes,
        selected_texts: selectedTexts
      };
    });
    

    const taskAnswers = {};

    document.querySelectorAll('.card-container-quest.input-task').forEach(card => {
      const taskId = card.dataset.taskId;
      if(!taskId) return;

      const input = card.querySelector('input');
      if(!input) return;

      const value = input.value.trim();

      taskAnswers[taskId] = {
        type: card.classList.contains("url") ? "url" :
              card.classList.contains("numbers") ? "numbers" :
              card.classList.contains("text") ? "text" : "unknown",
        value: value
      };
    });


    const optionscaleAnswers = {};

    // Number boxes (Optionscale numbers)
    document.querySelectorAll(".js-number-container").forEach(container => {
        const taskId = container.closest(".card-container-quest").dataset.taskId;
        const activeBox = container.querySelector(".number-box.active");
        const allBoxes = Array.from(container.querySelectorAll(".number-box"))
                              .map(b => parseInt(b.textContent));

        const leftLabel = container.closest(".card-container-quest").querySelector(".js-left-label")?.textContent || "";
        const rightLabel = container.closest(".card-container-quest").querySelector(".js-right-label")?.textContent || "";

        const minValue = Math.min(...allBoxes);
        const maxValue = Math.max(...allBoxes);

        optionscaleAnswers[taskId] = {
            selected: activeBox ? parseInt(activeBox.textContent) : null,
            min: minValue,
            max: maxValue,
            left_label: leftLabel,
            right_label: rightLabel
        };
    });

    // Star scales (Optionscale stars)
    document.querySelectorAll(".js-stars-container").forEach(container => {
        const taskId = container.closest(".card-container-quest").dataset.taskId;
        const stars = container.querySelectorAll("svg.active");
        const totalStars = parseInt(container.dataset.count) || container.querySelectorAll("svg").length;

        optionscaleAnswers[taskId] = {
            selected: stars.length,
            min: 1,
            max: totalStars
        };
    });

    /* =========================
      🧩 Puzzle Answers
    ========================= */
    const puzzleAnswers = {};

    document.querySelectorAll(".card-container-quest.puzzle").forEach(card => {
      const taskId = card.dataset.taskId;
      const input  = card.querySelector(".puzzle-answer-input");

      if (!taskId || !input) return;

      const value = input.value.trim();

      // always send (backend decides validity)
      puzzleAnswers[taskId] = value;
    });

    const pollAnswers = {};
    const pollOtherAnswers = {};

    document.querySelectorAll(".card-container-quest.poll").forEach(card => {
      const taskId = card.dataset.taskId;

      const inputs = card.querySelectorAll(
        'input[type="radio"], input[type="checkbox"]'
      );

      const selected = [];

      inputs.forEach(input => {
        if (!input.checked) return;

        // OTHER OPTION
        if (input.value === "other") {
          const otherInput = card.querySelector(".other-input");
          const otherValue = otherInput?.value.trim() || "";

          if (otherValue) {
            selected.push({
              type: "other",
              value: otherValue
            });

            pollOtherAnswers[taskId] = otherValue;
          }

          return;
        }

        // NORMAL OPTION
        const label = input.closest(".custom-radio");
        const text = label?.querySelector(".radio-text")?.textContent.trim() || "";

        selected.push({
          type: "option",
          index: parseInt(input.value, 10),
          text: text
        });
      });

      pollAnswers[taskId] = {
        selected: selected   // unified structure
      };
    });



    const visitLinkAnswers = {};

    // root = real task card (same pattern as quiz, poll, optionscale, file, input)
    document.querySelectorAll(".card-container-quest.visit-link").forEach(card => {
      const taskId = card.dataset.taskId;

      // main URL (real source of truth = <a href>)
      const url = card.getAttribute("href") || "";

      // preview container
      const previewInner = card.querySelector(".js-link-preview-inner");

      let title = "";
      let description = "";
      let image = "";

      if (previewInner) {
        title = previewInner.querySelector(".js-link-preview-title")?.textContent.trim() || "";
        description = previewInner.querySelector(".js-link-preview-desc")?.textContent.trim() || "";
        image = previewInner.querySelector(".js-link-preview-img")?.getAttribute("src") || "";
      }

      visitLinkAnswers[taskId] = {
        url: url,
        title: title,
        description: description,
        image: image,
        clicked: card.dataset.clicked === "true"   // ✅ validation state
      };
    });


    const subquestId = claimBtn.dataset.subquestId;

    // ✅ Use FormData instead of JSON
    const formData = new FormData();

    // Add JSON-like answers
    formData.append("quiz_answers", JSON.stringify(quizAnswers));
    formData.append("task_answers", JSON.stringify(taskAnswers));
    formData.append("optionscale_answers", JSON.stringify(optionscaleAnswers));
    formData.append("poll_answers", JSON.stringify(pollAnswers));
    formData.append("poll_other_answers", JSON.stringify(pollOtherAnswers));
    formData.append("visit_link_answers", JSON.stringify(visitLinkAnswers));
    formData.append("puzzle_answers", JSON.stringify(puzzleAnswers));

    


    document.querySelectorAll(".card-container-quest.file-upload").forEach(card=>{
      if(card.__files && card.__files.length){
        card.__files.forEach(file=>{
          formData.append("files", file);   // multiple files supported
        });
      }
    });



  const res = await fetch(`/test-claim/${subquestId}`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken
    },
    body: formData   // ❌ no headers, browser sets multipart automatically
  });
  const data = await res.json();


const hasNoRetry  = !data.success && data.no_retry;
const hasCooldown = !data.success && data.cooldown_until;
const hasErrors   = data.errors && Object.keys(data.errors).length > 0;

/* ============================
   1) RESTRICTIONS (UI only)
============================ */

if (hasNoRetry) {
  showCloserAllOverlay();

  setQuestState("no_retry");
  disableClaimButton();
}

if (hasCooldown) {

  const utcCooldown = normalizeUtcIso(data.cooldown_until);
console.log(utcCooldown)
  updateClaimButtonCooldown(utcCooldown);
  initCooldownTimers();
  disableClaimButton();
}



// 🔁 REDIRECT
if (!data.success && data.error_code === "REDIRECT") {
  if (data.redirect) {
    window.location.href = data.redirect;
  }
  return; 
}

if (data?.error_code === "RECURRENCE_BLOCKED") {
  
  // preview box

  // claim button section
  const claimBtn = document.querySelector("#claim-task");
  if (claimBtn) {
    claimBtn.style.display = "none";
  }

  const completedBox = document.querySelector(".forquest-main");
  if (completedBox) {
    completedBox.style.display = "flex";
  }

  return; 
}




// 🚫 MAX CLAIM REACHED
if (!data.success && data.error_code === "MAX_CLAIM_REACHED") {
  showError(data.toast || "Max number of claims reached");
  disableClaimButton();
  return; 
}


// 📘 PENDING REVIEW
if (data.success && data.pending_review) {
  showCloserAllOverlay();
  setQuestState("pending");
  disableClaimButton();
  return; 
}


// ✅ SUCCESS
if (data.success) {
  showCloserAllOverlay();
  setQuestState("completed");
  disableClaimButton();
  return; 
}


/* ===== FAILED (NO ERRORS OBJECT) ===== */
if (!data.success && (!data.errors || Object.keys(data.errors).length === 0)) {
  showCloserAllOverlay();

  setQuestState("failed", { message: data.message });
  disableClaimButton();
  return; 
}


/* ===== VALIDATION ERRORS — LOWEST PRIORITY ===== */

if (hasErrors) {

  for (const [taskId, errorMsg] of Object.entries(data.errors)) {

    const card = document.querySelector(
      `.card-container-quest[data-task-id="${taskId}"]`
    );
    if (!card) continue;

    const errorEl =
      card.querySelector(".prove-self") ||
      card.querySelector(".wrong-anser") ||
      card.querySelector(".partnership-error") ||
      card.querySelector(".partnership-quest-error") ||
      card.querySelector(".discord-errir") ||
      card.querySelector(".puzzle-error") ||
      card.querySelector(".yotube-error") ||
      card.querySelector(".telegram-error") ||
      card.querySelector(".numbers-error") ||
      card.querySelector(".text-error") ||
      card.querySelector(".url-error");

      if (errorEl) {

        if (errorMsg?.type === "HTML" && errorMsg.error_html) {
          errorEl.innerHTML = errorMsg.error_html;   // ✅ HTML render
        } else {
          errorEl.textContent = errorMsg.error || errorMsg; // normal
        }

        errorEl.style.display = "block";
      }

  }

  scrollToFirstTaskError();
  disableClaimButton();
  return; 
}


  } catch (err) {
    console.error(err);
    disableClaimButton();
  } finally {
    claimBtn.innerHTML = "Claim";
  }
}






const PastSVGQ = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M128 64C92.7 64 64 92.7 64 128L64 448C64 483.3 92.7 512 128 512L240 512L240 288C240 226.1 290.1 176 352 176L416 176L416 128C416 92.7 387.3 64 352 64L128 64zM312 176L168 176C154.7 176 144 165.3 144 152C144 138.7 154.7 128 168 128L312 128C325.3 128 336 138.7 336 152C336 165.3 325.3 176 312 176zM352 224C316.7 224 288 252.7 288 288L288 512C288 547.3 316.7 576 352 576L512 576C547.3 576 576 547.3 576 512L576 346.5C576 329.5 569.3 313.2 557.3 301.2L498.8 242.7C486.8 230.7 470.5 224 453.5 224L352 224z"/>
  </svg>
`;

const DeleteSVGQ = `
  <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 6H3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>

    <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.7"></path>

    <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>

    <line x1="10" y1="9" x2="10" y2="17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></line>
    <line x1="14" y1="9" x2="14" y2="17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></line>
  </svg>
`


const ChevronSVGQ = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd"
        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
        fill="currentColor"/>
</svg>

`

 
function showPreviewModal(html, isLoading = false) {
  const modal = document.getElementById("preview-modal");
  const content = document.getElementById("preview-content");

  if (!modal || !content) {
    console.error("Preview modal elements not found");
    return;
  }

  content.innerHTML = html;
  content.classList.toggle("is-loading", isLoading);

  if (!isLoading) {
    content.scrollTop = 0;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";  
}


function closePreview() {
  const modal = document.getElementById("preview-modal");
  const content = document.getElementById("preview-content");

  if (content) content.innerHTML = "";
  if (modal) modal.style.display = "none";

  document.body.style.overflow = "";  
}


function getPreviewSkeleton() {
  return `
    <div class="sqsk-container">

      <div class="sqsk-topbar">
        <div class="sqsk sqsk-back"></div>
        <div class="sqsk sqsk-pill"></div>
      </div>

      <div class="sqsk sqsk-title"></div>

      <div class="sqsk-meta">
        <div class="sqsk sqsk-meta-item"></div>
        <div class="sqsk sqsk-meta-item"></div>
      </div>

      <div class="sqsk-main">
        <div class="sqsk-left">
          <div class="sqsk sqsk-section"></div>
          <div class="sqsk-reward-card">
            <div class="sqsk sqsk-card-label"></div>
            <div class="sqsk sqsk-reward"></div>
          </div>
        </div>
      </div>

      <div class="sqsk-right">
        <div class="sqsk sqsk-section"></div>
        <div class="sqsk-tab"></div>
        <div class="sqsk-quest-card">
          <div class="sqsk sqsk-question"></div>
          <div class="sqsk sqsk-input"></div>
        </div>
      </div>

      <div class="sqsk-bottom-bar">
        <div class="sqsk sqsk-btn"></div>
      </div>

    </div>
  `;
}






function renderVisitLinkTask(task) {

  const link = task.config?.link || "#";
  const preview = task.config?.preview || {};

  const hasPreview =
    preview.image ||
    preview.title ||
    preview.description;

  return `
<div class="container-all-contain-yinit visit-link-wrapper"
     data-type="visit-link"
     data-task-id="${task.id}"
     style="color: var(--accent-link)">

  <!-- ================= CARD ================= -->
  <a href="${link}"
     target="_blank"
     rel="noopener noreferrer"
     class="card-container-quest visit-link">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS["visit-link"]?.icon || "🔗"}
      </span>
      <span>Visit Link</span>
    </div>

    <!-- Card Wrapper -->
    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest link-root">

          <div class="js-link-preview">

            <div class="js-link-preview-inner"
                 style="
                   display:${hasPreview ? "flex" : "none"};
                   gap:16px;
                   align-items:center;
                 ">

                  <img class="js-link-preview-img"
                       src="${preview.image}"
                       style="
                         width:110px;
                         height:110px;
                         border-radius:12px;
                         object-fit:cover;
                         flex-shrink:0;
                       ">

              <div class="link-text-wrap"
                   style="display:flex; flex-direction:column; gap:6px;">

                <div class="js-link-preview-title"
                     style="font-weight:600; font-size:15px;">
                  ${preview.title || "Visit link"}
                </div>

                  <div class="js-link-preview-desc"
                        style="font-size:13px; opacity:0.75;">
                    ${preview.description}
                  </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>

  </a>
  <!-- =============== END CARD =============== -->


  <!-- ================= POPUP ================= -->
  <div class="popup-container visit-link-popup is-open"
       role="dialog"
       aria-label="Visit link editor">

    <!-- Popup Header -->
    <div class="popup-header">
      <div class="telicon"
           style="background-color: var(--accent-link)">
        ${PLATFORM_ICONS["visit-link"]?.icon || "🔗"}
      </div>

      <div class="title">Visit Link</div>

      <div class="liner"></div>

      <div class="popup-actions">
        <button class="js-copy-link" title="close">
          ${ChevronSVGQ}
        </button>

        <button class="js-paste-link" title="paste">
          ${PastSVGQ}
        </button>

        <button class="js-delete-link" title="delete">
          ${DeleteSVGQ}
        </button>
      </div>
    </div>

    <!-- Popup Body -->
    <div class="bottom-visitlink">

      <div class="liners"></div>

      <label class="labeltesting">
        Link you want users to visit
      </label>

      <input
        class="social-input telinput js-link-input"
        type="text"
        placeholder="https://example.com"
        value="${task.config?.link || ""}"
      />

      <div class="error-message visit-link-error"
           style="display:none;">
        Invalid URL
      </div>

    </div>

  </div>
  <!-- =============== END POPUP =============== -->

</div>
`;
}



const FILE_TYPESVG = {

    "document": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22" height="22"
            fill="currentColor">
            <path d="M4.8 4.8C4.8 3.708 5.708 2.8 6.8 2.8H12.8C13.48 2.8 14.15 3.03 14.68 3.56L18.44 7.32C18.97 7.85 19.2 8.52 19.2 9.2V19.2C19.2 20.292 18.292 21.2 17.2 21.2H6.8C5.708 21.2 4.8 20.292 4.8 19.2V4.8zM12.6 4.9V8.1C12.6 8.58 12.98 8.96 13.46 8.96H16.64L12.6 4.9zM10.54 12.68C10.42 12.16 9.91 11.8 9.39 11.91C8.87 12.02 8.51 12.53 8.62 13.05L9.94 18.49C10.04 18.88 10.4 19.17 10.83 19.2C11.26 19.23 11.66 18.96 11.79 18.56L12.8 15.17L13.81 18.56C13.94 18.96 14.34 19.23 14.77 19.2C15.2 19.17 15.56 18.88 15.66 18.49L16.98 13.05C17.09 12.53 16.73 12.02 16.21 11.91C15.69 11.8 15.18 12.16 15.06 12.68L14.53 14.93L13.71 12.57C13.58 12.19 13.22 11.92 12.8 11.92C12.38 11.92 12.02 12.19 11.89 12.57L11.07 14.93L10.54 12.68z"/>
          </svg>

        `,
      },

      
    "presentation": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="22" height="22"
              fill="currentColor">
            <path transform="scale(0.0375)" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/>
          </svg>

        `,
      },


      
    "spreadsheet": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="22" height="22" 
              fill="currentColor">
                <path transform="scale(0.0375)" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/>
          </svg>

        `,
      },

      
    "image": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="22" height="22"
            fill="currentColor">
              <path transform="scale(0.0375)" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/>
          </svg>
        `,
      },

      
    "drawing": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22" height="22"
            fill="currentColor">
            <path d="M19.2 2.8L10.9 7.9C9.8 8.6 9 9.7 8.9 10.9C11.2 11.4 12.9 13.1 13.5 15.4C14.7 15.3 15.8 14.7 16.5 13.7L21.9 5.9C22.2 5.3 22.3 4.7 22.3 4.1C22.3 2.7 21.2 1.6 19.8 1.6C19.2 1.6 18.7 1.8 19.2 2.8zM12 17.4C12 15.2 10.2 13.4 8 13.4C5.8 13.4 4 15.2 4 17.4C4 17.6 4 17.8 4.1 18C4.2 18.7 3.7 19.5 3 19.5H2.8C2 19.5 1.4 20.1 1.4 20.9C1.4 21.7 2 22.3 2.8 22.3H8C10.2 22.3 12 20.5 12 18.3z"/>
          </svg>

        `,
      },

      
    "video": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="22" height="22"
              fill="currentColor">
            <path d="M4.8 4.8C4.8 3.4 5.9 2.3 7.3 2.3H12.8C13.5 2.3 14.1 2.5 14.6 3L19 7.4C19.5 7.9 19.7 8.6 19.7 9.3V19.2C19.7 20.6 18.6 21.7 17.2 21.7H7.3C5.9 21.7 4.8 20.6 4.8 19.2V4.8ZM12.6 3.9V7.3C12.6 7.9 13.1 8.4 13.7 8.4H17.1L12.6 3.9ZM7.8 13.8V17.4C7.8 18.2 8.4 18.8 9.2 18.8H12.6C13.4 18.8 14 18.2 14 17.4V16.4L15.5 17.9C15.7 18.1 16 18.2 16.3 18.2C16.9 18.2 17.4 17.7 17.4 17.1V13.9C17.4 13.3 16.9 12.8 16.3 12.8C16 12.8 15.7 12.9 15.5 13.2L14 14.7V13.7C14 12.9 13.4 12.3 12.6 12.3H9.2C8.4 12.3 7.8 12.9 7.8 13.8Z"/>
          </svg>

        `,
      },

      
    "audio": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="22" height="22"
              fill="currentColor">
                <path transform="scale(0.0375)" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/>
          </svg>

        `,
      },

      
    "archive": {
        svg: `
          <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="22" height="22" 
              fill="currentColor">
            <path transform="scale(0.0375)" d="M128 128C128 92.7 156.7 64 192 64H341.5C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6V512C512 547.3 483.3 576 448 576H192C156.7 576 128 547.3 128 512V128zM336 122.5V216C336 229.3 346.7 240 360 240H453.5L336 122.5zM272 320C263.2 320 256 327.2 256 336V352H240C231.2 352 224 359.2 224 368V384C224 392.8 231.2 400 240 400H256V416H240C231.2 416 224 423.2 224 432V448C224 456.8 231.2 464 240 464H256V480C256 488.8 263.2 496 272 496H304C312.8 496 320 488.8 320 480V464C320 455.2 312.8 448 304 448H288V432H304C312.8 432 320 424.8 320 416V400C320 391.2 312.8 384 304 384H288V368H304C312.8 368 320 360.8 320 352V336C320 327.2 312.8 320 304 320H272z"/>
          </svg>

        `,
      },

      

}

function renderFileType(typeKey, label, activeTypes) {
  const isActive = activeTypes.includes(typeKey.toLowerCase());

  return `
    <div class="file-type-item ${isActive ? "selected" : ""}">
      <input type="checkbox" 
             class="js-file-type ${typeKey}" 
             value="${typeKey}"
             ${activeTypes.includes(typeKey) ? "checked" : ""}>

      ${FILE_TYPESVG[typeKey]?.svg || ""}

      <span>${label}</span>
    </div>
  `;
}


async function markBackendValidatedSocialTasks(root = document) {
  controller?.abort();        
  controller = new AbortController();

  document.addEventListener("click", async (e) => {
    const claimBtn = e.target.closest("#claim-task");
    if (!claimBtn) return;

    if (claimBtn.hasAttribute("disabled")) return;

    claimBtn.setAttribute("disabled", "true");
    claimBtn.style.cursor = "wait";

    const subquestId = claimBtn.dataset.subquestId;

    handlePreviewClaim(subquestId, claimBtn);
  }, { signal: controller.signal });

  const data = await loadEditorData();
  const tasks = data.tasks || [];

  const container = document.getElementById("uniqueItems");
  if (!container) return;

  container.innerHTML = "";

  tasks.forEach(task => {
    const html = renderTask(task);
    if (html) {
      container.insertAdjacentHTML("beforeend", html);
    }
  });

  
  hookTaskInteractions(container);

  // ✅ NOW mark valid AFTER render
  container.querySelectorAll(".social-input").forEach(input => {
    if (input.value && input.value.trim().length > 0) {
      input.dataset.valid = "true";
    }
  });

  validateForm();  
}

function hookTaskInteractions(root = document){
  hookPopupControls(root);
  hookInputTasks(root);
  hookSocialTasks(root);
  hookQuizTasks(root);
  hookGithubTasks(root);
  hookPollTasks(root);
  hookFileUploadTasks(root);
  hookVisitLinkTasks(root);
  hookInviteTasks(root);
  hookPuzzleTasks(root);
  LetsInitQuestBuildup();
  UndoingStacksArial();
  callingTriggerArialAsp();
  CalledIsmobMobile();
  Loadotherside();

}


function hookGithubTasks(root){
  
  document.querySelectorAll(".gh-tooltip-wrap").forEach(el => {
    el.querySelector(".gh-tooltip-box").textContent = el.dataset.tip;
  });
}



function hookPuzzleTasks(root = document){

  root.addEventListener("input", e => {

    const placeholderInput = e.target.closest(".js-puzzle-placeholder");
    if(!placeholderInput) return;

    const container = placeholderInput.closest(".container-all-contain-yinit");
    if(!container) return;

    const taskId = container.dataset.taskId;
    const val = placeholderInput.value;

    /* === card puzzle input === */
    const puzzleInput = container.querySelector(".puzzle-answer-input");


    if(puzzleInput){
      puzzleInput.setAttribute(
        "placeholder",
        val || "Enter secret code..."
      );
    }

    if(titleInput){
      titleInput.setAttribute(
        "placeholder",
        val || "Puzzle title..."
      );
    }

    /* === persist to task config === */
    const task = window.__TASKS__?.find(t => String(t.id) === String(taskId));
    if(task){
      if(!task.config) task.config = {};
      task.config.placeholder = val;
    }

  });

}


function looksLikeUrlSocial(value){
  if(!value) return false;

  value = value.trim().toLowerCase();

  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("www.")
  );
}

function hookSocialTasks(root){

  root.addEventListener("input", e => {
    const input = e.target.closest(".social-input");
    if (!input) return;

    if (input.dataset.platform === "partnership") {
      lockPartnershipPrefix(input);
    }
  });


  /* ✅ paste triggers fetch */
  root.addEventListener("paste", e => {
    const input = e.target.closest(".social-input");
    if (!input) return;

    setTimeout(() => {
      const value = input.value.trim();
      if(!looksLikeUrlSocial(value)) return;
      handleSocialUpdate(input, value);
    }, 0);
  });


  root.addEventListener("blur", e => {
    const input = e.target.closest(".social-input");
    if (!input) return;

    const value = input.value.trim();
    const popup = input.closest(".popup-container");
    if (!popup) return;

    const errorMsg = popup.querySelector(".social-error-msg");

    // empty input → no error, no fetch
    if (!value){
      if(errorMsg) errorMsg.style.display = "none";
      return;
    }

    // invalid url → show error
    if(!looksLikeUrlSocial(value)){
      if(errorMsg) errorMsg.style.display = "block";
      return;
    }

    // valid url → hide error + fetch
    if(errorMsg) errorMsg.style.display = "none";
    handleSocialUpdate(input, value);

  }, true);

}


async function handleSocialUpdate(input, value){
  const popup = input.closest(".popup-container");
  if (!popup) return;

  const platform = input.dataset.platform;
  const card = popup.closest(".container-all-contain-yinit");

  const avatarImg = card.querySelector(".avatar-quest img");
  const fallback  = card.querySelector(".fallback-letter");
  const titleEl   = card.querySelector(".community_name");
  const descEl    = card.querySelector(".description-parnership");
  const ctaBtn    = card.querySelector(".cta-quest");
  const errorMsg  = popup.querySelector(".social-error-msg");

  if(errorMsg) errorMsg.style.display = "none";

  try{

    let payload;

    if (platform === "discord") {
      const invite = extractDiscordInvite(value);
      if (!invite) throw "bad discord";

      const data = await fetch(`/api/discord_info?invite=${invite}`).then(r=>r.json());

      payload = {
        title: data.name,
        icon: data.icon,
        link: `https://discord.gg/${invite}`,
        action: "Join Server"
      };
    }

    else if (platform === "telegram") {
      const username = extractTelegramUsername(value);
      if (!username) throw "bad telegram";

      const data = await fetch(`/api/telegram_info?username=${username}`).then(r=>r.json());

      payload = {
        title: data.title,
        icon: data.photo,
        link: `https://t.me/${username}`,
        action: "Join Channel"
      };
    }

    else if (platform === "youtube") {
      const yt = await fetchChannelInfo(value);

      payload = {
        title: yt.title,
        icon: yt.thumbnail,
        link: `${value}?sub_confirmation=1`,
        action: "Subscribe"
      };
    }

    else if (platform === "partnership") {

      let clean = value.trim();

      // remove prefix
      if (clean.startsWith(PARTNERSHIP_PREFIX)) {
        clean = clean.replace(PARTNERSHIP_PREFIX, "");
      }

      // backend must receive only after /
      clean = clean.replace(/^\/+/, "");   // safety

      // example: nativ/sandbox
      const slug = clean.replaceAll("/", "");

      const res = await fetch(`/api/community/${slug}`).then(r=>r.json());
      if (res.error) throw "no community";

      payload = {
        title: res.name,
        desc: res.about,
        icon: res.logo_path,
        link: PARTNERSHIP_PREFIX + clean,   // 🔒 always locked
        action: "Join Community"
      };

      card.dataset.community_id = res.id;
    }
    else if (platform === "github") {


      const match = value.match(/github\.com\/([^/]+)\/([^/?#]+)/);
      if (!match) throw "bad github";

      const owner = match[1];
      const repo  = match[2].replace(/\.git$/, "");

      // hit your Flask route — it calls GitHub API server-side
      const data = await fetch(`/api/github_repo_info?owner=${owner}&repo=${repo}`)
        .then(r => r.json());

      if (data.error || !data.public) throw "not public";

      payload = {
        title:  data.full_name,          // "owner/repo"
        desc:   `@${data.owner}`,
        icon:   data.owner_avatar,
        link:   `https://github.com/${owner}/${repo}`,
        action: "Star this repo"         // updated dynamically below
      };

      // store owner/repo on card for later toggle updates
      const card = popup.closest(".container-all-contain-yinit");
      card.dataset.github_owner  = data.owner;
      card.dataset.github_repo   = data.repo_name;
      card.dataset.github_avatar = data.owner_avatar;

      // update preview strip
      const preview = popup.querySelector(".github-repo-preview");
      if (preview) {
        preview.style.display = "flex";
        preview.querySelector(".github-preview-avatar").src = data.owner_avatar;
        preview.querySelector(".github-preview-name").textContent = data.full_name;
        preview.querySelector(".github-preview-owner").textContent = `@${data.owner}`;
      }
    }
    else if (platform === "partnership_quest") {
 
      const parts = normalizePartnershipQuestUrl(value);


      if (!parts || parts.length < 4) throw "bad quest url";

      const quest_uuid     = parts[2];  
      const subquest_uuid  = parts[3];   

      const res = await fetch(
        `/api/quest/${communitySlug}/${quest_uuid}/${subquest_uuid}`
      ).then(r=>r.json());

      if (res.error) throw "no quest";

      payload = {
        title: res.community_name,
        desc: `<div style="white-space: nowrap: max-width: 90%; text-overflow: ellipsis;">Claim <span style="color:#fff; opacity: 0.9">"${res.subquest_name || ''}"</span> in ${res.community_name || ''}`,
        icon: res.community_logo,
        link: res.quest_url,
        action: "Go to Quest",
        isHTML: true   // 🔥 flag
      };


      card.dataset.community_id = res.community_id;
    }
     if (!payload) {
        console.warn("No payload created for platform:", platform, value);
        return;
      }

    /* ===== APPLY UI ===== */

    if (titleEl) titleEl.textContent = payload.title || "";
    if (descEl && payload.desc) {
      if (payload.isHTML) {
        descEl.innerHTML = payload.desc;   // 🔥 formatted render
      } else {
        descEl.textContent = payload.desc; // safe render
      }
    }


    if (payload.icon){
      avatarImg.src = payload.icon;
      avatarImg.style.display = "block";
      if (fallback) fallback.style.display = "none";
    } else if (payload.title && fallback){
      fallback.textContent = payload.title[0].toUpperCase();
      fallback.style.display = "flex";
      avatarImg.style.display = "none";
    }

    if (ctaBtn){
      ctaBtn.href = payload.link;
      ctaBtn.innerHTML = payload.action;
    }

    input.dataset.valid = "true";
    validateForm();
  } catch(err){
    console.error(err);
    input.dataset.valid = "false";
    validateForm();
    if(errorMsg) errorMsg.style.display = "block";
  }
}



const PARTNERSHIP_PREFIX = "https://gleyo.app/";

function lockPartnershipPrefix(input){
  if(!input.value.startsWith(PARTNERSHIP_PREFIX)){
    input.value = PARTNERSHIP_PREFIX;
  }
}


/* ============================
   POLL LOGIC
============================ */

/* Reindex placeholders */
function reindexPoll(taskWrap){
  const popup = taskWrap.querySelector(".poll-popup");
  const rows = popup.querySelectorAll(".optionnsy:not(.other-editor)");

  rows.forEach((row,i)=>{
    const input = row.querySelector(".optn");
    if(input){
      input.placeholder = `Option ${i+1}`;
    }
  });
}


/* Sync editor → card */
function syncPollToCard(taskWrap){
  const popup = taskWrap.querySelector(".poll-popup");
  const cardGroup = taskWrap.querySelector(".radio-group");

  const allowMulti = popup.querySelector(".js-multi-toggle")?.checked;
  const allowOther = popup.querySelector(".js-other-toggle")?.checked;

  const options = [...popup.querySelectorAll(".optionnsy:not(.other-editor) .optn")]
    .map(i => i.value.trim())
    .filter(v => v !== "");

  let html = "";

  // normal options
  options.forEach((opt,i)=>{
    html += `
      <label class="custom-radio">
        <input
          type="${allowMulti ? "checkbox" : "radio"}"
          name="${allowMulti ? "" : "poll-"+taskWrap.dataset.taskId}"
          value="${i}"
          data-task-id="${taskWrap.dataset.taskId}"
        />
        <span class="radio-ui"></span>
        <span class="radio-text">${opt || `Option ${i+1}`}</span>
      </label>
    `;
  });

  // other option always LAST
  if(allowOther){
    html += `
      <div class="custom-radio other-option">
        <label class="other-radio">
          <input
            type="${allowMulti ? "checkbox" : "radio"}"
            name="${allowMulti ? "" : "poll-${taskWrap.dataset.taskId}"}"
            value="other"
          />
          <span class="radio-ui"></span>
        </label>
        <input 
          type="text"
          class="other-input"
          placeholder="Other (please specify)"
        />
      </div>
    `;
  }

  cardGroup.innerHTML = html;
}




/* Toggle OTHER option */
function togglePollOther(taskWrap, enabled){
  const popup = taskWrap.querySelector(".poll-popup");
  const container = popup.querySelector(".options-container");

  const existing = container.querySelector(".other-editor");

  if(enabled){
    if(existing) return; // already exists

    const otherHTML = document.createElement("div");
    otherHTML.className = "optionnsy other-editor";
    otherHTML.innerHTML = `
      <input 
        type="text"
        class="optn other-disabled"
        value="Other option"
        disabled
        style="opacity: 0.6; background-color: transparent; border: 0.1px dashed #cccccc57;"
      />
    `;

    container.appendChild(otherHTML); // ALWAYS LAST
  }else{
    if(existing) existing.remove();
  }

  syncPollToCard(taskWrap);
}


/* Add option (ALWAYS before Other) */
function addPollOption(taskWrap){
  const popup = taskWrap.querySelector(".poll-popup");
  const container = popup.querySelector(".options-container");
  const other = container.querySelector(".other-editor");

  const row = document.createElement("div");
  row.className = "optionnsy";
  row.innerHTML = `
    <input 
      type="text" 
      class="optn"  
      placeholder="Option"
      style="background-color: transparent; border: 0.1px solid #cccccc57;"
    />
    <button class="remove-option">&times;</button>
  `;

  // insert before "other"
  if(other){
    container.insertBefore(row, other);
  }else{
    container.appendChild(row);
  }

  reindexPoll(taskWrap);
  syncPollToCard(taskWrap);
}


/* Remove option */
function removePollOption(btn){
  const row = btn.closest(".optionnsy");
  const taskWrap = btn.closest(".poll-task");

  row.remove();
  reindexPoll(taskWrap);
  syncPollToCard(taskWrap);
}


/* ============================
   HOOK POLL EVENTS
============================ */

function hookPollTasks(root = document){

  // add option
  root.addEventListener("click", e=>{
    if(e.target.closest(".poll-popup .add-option")){
      const taskWrap = e.target.closest(".poll-task");
      addPollOption(taskWrap);
    }
  });

  root.addEventListener("change", e => {

    const input = e.target;

    // ignore "other"
    if (
      !input.matches('.radio-group input') ||
      input.closest('.other-option')
    ) return;

    const taskWrap = input.closest(".poll-task");
    const allowMulti = taskWrap.querySelector(".js-multi-toggle")?.checked;

    if (!allowMulti) {
      const other = taskWrap.querySelector(".other-option input");
      if (other) {
        other.checked = false;

        const otherText = taskWrap.querySelector(".other-input");
        if (otherText) otherText.value = "";
      }
    }

  });
  
  // select OTHER option
  root.addEventListener("change", e=>{
    const otherInput = e.target.closest(".other-option input");
    if(!otherInput) return;

    const taskWrap = e.target.closest(".poll-task");
    const group = taskWrap.querySelector(".radio-group");

    const allowMulti = taskWrap
      .querySelector(".js-multi-toggle")
      ?.checked;

    // only force single selection
    if(!allowMulti){

      group.querySelectorAll(".custom-radio input, .other-option input")
        .forEach(input=>{
          input.checked = false;
        });

      otherInput.checked = true;
    }
  });


  // clicking other text focuses/selects other
  root.addEventListener("focusin", e=>{
    const otherText = e.target.closest(".other-input");
    if(!otherText) return;

    const other = otherText.closest(".other-option");
    const radio = other.querySelector("input");

    radio.dispatchEvent(new Event("change", { bubbles:true }));
  });


  // remove option
  root.addEventListener("click", e=>{
    if(e.target.classList.contains("remove-option")){
      removePollOption(e.target);
    }
  });


  // input sync
  root.addEventListener("input", e=>{
    if(e.target.classList.contains("optn")){
      const taskWrap = e.target.closest(".poll-task");

      reindexPoll(taskWrap);
      syncPollToCard(taskWrap);
    }
  });


  // multiple toggle
  root.addEventListener("change", e=>{
    if(e.target.classList.contains("js-multi-toggle")){
      const taskWrap = e.target.closest(".poll-task");

      syncPollToCard(taskWrap);
    }
  });


  // other toggle
  root.addEventListener("change", e=>{
    if(e.target.classList.contains("js-other-toggle")){
      const taskWrap = e.target.closest(".poll-task");

      togglePollOther(taskWrap, e.target.checked);
    }
  });

}


function hookPopupControls(root){

  /* ===== CHEVRON ===== */
  root.addEventListener("click", e => {
    const btn = e.target.closest(".js-copy-link");
    if (!btn) return;

    const popup = btn.closest(".popup-container");
    if (!popup) return;

    const isOpen = popup.classList.contains("is-open");

    root.querySelectorAll(".popup-container.is-open").forEach(p => {
      if (p !== popup) p.classList.remove("is-open");
    });

    popup.classList.toggle("is-open", !isOpen);
  });

  /* ===== DELETE ===== */
  root.addEventListener("click", e => {
    const btn = e.target.closest(".js-delete-link");
    if (!btn) return;

    const wrapper = btn.closest(".container-all-contain-yinit");
    if (!wrapper) return;

    wrapper.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    wrapper.style.opacity = "0";
    wrapper.style.transform = "scale(0.96)";
    setTimeout(() => {
      wrapper.remove();
      updateCounter();
    }, 250);
  });

  /* ===== PASTE ===== */
  root.addEventListener("click", async e => {
    const btn = e.target.closest(".js-paste-link");
    if (!btn) return;

    let text = "";
    try {
      text = await navigator.clipboard.readText();
    } catch { return; }

    if (!text?.trim()) return;

    const popup = btn.closest(".popup-container");
    if (!popup) return;

    const platform = popup.dataset.platform;

    /* SOCIAL */
    if (platform) {
      const input = popup.querySelector(".social-input");
      if (input) {

        /* 🔥 PATCH START (ONLY ADD THIS) */
        if (platform === "partnership") {
          let clean = text.trim();

          if (clean.startsWith(PARTNERSHIP_PREFIX)) {
            clean = clean.replace(PARTNERSHIP_PREFIX, "");
          }

          try {
            if (clean.startsWith("http://") || clean.startsWith("https://")) {
              const u = new URL(clean);
              clean = u.pathname.replace(/^\/+/,"");
            }
          } catch(e){}

          input.value = PARTNERSHIP_PREFIX + clean;

          const value = input.value.trim();
          handleSocialUpdate(input, value);
          return; // 🔒 stop here for partnership
        }
        /* 🔥 PATCH END */

        // original behavior (untouched)
        input.value = text.trim();

        /* directly trigger validation + fetch */
        const value = input.value.trim();
        if (looksLikeUrlSocial(value)) {
          handleSocialUpdate(input, value);
        }
      }
      return;
    }

    /* INPUT TASKS (UNCHANGED) */
    const titleInput = popup.querySelector(".js-title-input");
    const descInput  = popup.querySelector(".js-desc-input");

    if (titleInput && !titleInput.value.trim()) {
      titleInput.value = text;
      titleInput.dispatchEvent(new Event("input"));
    } else if (descInput) {
      descInput.value = text;
      descInput.dispatchEvent(new Event("input"));
    }
  });

}

const starstrerSvg = `
    <svg viewBox="0 0 24 24" width="30" height="30"   xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
    </svg>
`;


function hookInputTasks(root){

  /* ===========================
     EXISTING TITLE SYNC
  ============================ */
  root.addEventListener("input", e => {
    const input = e.target.closest(".js-title-input");
    if (!input) return;

    const wrapper = input.closest(".container-all-contain-yinit");
    if (!wrapper) return;

    const titleView = wrapper.querySelector(
      ".title-quest, .polltitq, .polltitn, .polltits, .community_name"
    );

    if (titleView) titleView.textContent = input.value || "";
  });

  /* ===========================
     EXISTING DESC SYNC
  ============================ */
  root.addEventListener("input", e => {
    const textarea = e.target.closest(".js-desc-input");
    if (!textarea) return;

    const wrapper = textarea.closest(".container-all-contain-yinit");
    if (!wrapper) return;

    const descView = wrapper.querySelector(
      ".description-quest, .polldescq, .polldescn, .polldescs, .description-parnership"
    );

    if (descView) descView.textContent = textarea.value || "";
  });
  root.addEventListener("input", e => {
      validateForm();  
  });
  /* =====================================================
    ⭐ STAR SCALE LOGIC (FIXED)
  ====================================================== */
  root.addEventListener("input", e => {
    const input = e.target.closest(".startcount");
    if (!input) return;

    const wrapper = input.closest(".container-all-contain-yinit");
    if (!wrapper) return;

    // allow empty while typing
    if (input.value === "") {
      const starBox = wrapper.querySelector(".js-stars-container");
      if (starBox) starBox.innerHTML = "";
      return;
    }

    let val = parseInt(input.value);

    // only enforce MAX
    if (isNaN(val)) return;

    if (val > 10) {
      val = 10;
      input.value = 10;   // 🔒 clamp only max
    }

    const starBox = wrapper.querySelector(".js-stars-container");
    if (!starBox) return;

    starBox.dataset.count = val;

    // rebuild stars
    starBox.innerHTML = Array.from({ length: val }).map(() => `
      ${starstrerSvg}
    `).join("");
  });

  /* =====================================================
     🔢 NUMBER SCALE LOGIC
  ====================================================== */
  root.addEventListener("input", e => {
    const startInput = e.target.closest(".js-firstnum");
    const endInput   = e.target.closest(".js-lastnum");
    if (!startInput && !endInput) return;

    const wrapper = e.target.closest(".container-all-contain-yinit");
    if (!wrapper) return;

    const start = parseInt(wrapper.querySelector(".js-firstnum")?.value);
    const end   = parseInt(wrapper.querySelector(".js-lastnum")?.value);

    if (isNaN(start) || isNaN(end)) return;
    if (end < start) return;

    const box = wrapper.querySelector(".js-number-container");
    if (!box) return;

    const nums = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    box.innerHTML = nums.map(n => `<div class="number-box">${n}</div>`).join("");
  });

  /* =====================================================
     🔤 LABEL LIVE SYNC
  ====================================================== */
  root.addEventListener("input", e => {
    const left = e.target.closest(".js-notlikely");
    const right = e.target.closest(".js-verylikely");
    if (!left && !right) return;

    const wrapper = e.target.closest(".container-all-contain-yinit");
    if (!wrapper) return;

    if (left) {
      const el = wrapper.querySelector(".js-left-label");
      if (el) el.textContent = left.value;
    }

    if (right) {
      const el = wrapper.querySelector(".js-right-label");
      if (el) el.textContent = right.value;
    }
  });

}



function extractDiscordInvite(url) {
  if (!url) return null;

  const match = url.match(
    /(discord\.gg\/|discord\.com\/invite\/)([a-zA-Z0-9]+)/i
  );

  return match ? match[2] : null;
}

function extractTelegramUsername(url) {
  if (!url) return null;

  const match = url.match(/t\.me\/(?:joinchat\/)?([a-zA-Z0-9_]+)/i);
  return match ? match[1] : null;
}



function parseYouTubeInput(input) {
  input = input.trim();

  // Channel ID
  // https://www.youtube.com/channel/UCxxxx
  let match = input.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return { identifier: match[1], type: "channelId" };
  }

  // Username
  // https://www.youtube.com/user/username
  match = input.match(/youtube\.com\/user\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return { identifier: match[1], type: "forUsername" };
  }

  // Handle
  // https://www.youtube.com/@handle
  match = input.match(/youtube\.com\/@([a-zA-Z0-9_.-]+)/);
  if (match) {
    return { identifier: match[1], type: "forUsername" };
  }

  // youtu.be links (videos → extract channel via backend later if needed)
  match = input.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return { identifier: match[1], type: "video" }; // optional future support
  }

  // Raw channelId (UCxxxx)
  if (/^UC[a-zA-Z0-9_-]{20,}$/.test(input)) {
    return { identifier: input, type: "channelId" };
  }

  // Raw username
  return { identifier: input.replace("@",""), type: "forUsername" };
}



async function fetchChannelInfo(input) {

  const parsed = parseYouTubeInput(input);

  // 🚫 backend doesn't support video lookup yet
  if (parsed.type === "video") {
    throw "Video URLs not supported yet (channel link required)";
  }

  const res = await fetch("/api/channel-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken
    },
    body: JSON.stringify({
      identifier: parsed.identifier,
      type: parsed.type   // ONLY channelId | forUsername
    })
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw data.error || "Invalid YouTube channel";
  }

  return data;
}



function normalizePartnershipQuestUrl(input){
  if(!input) return null;

  input = input.trim();

  // If full URL → extract pathname
  try {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      const urlObj = new URL(input);
      input = urlObj.pathname;   // ✅ /sandbox/quest/uuid1/uuid2
    }
  } catch(e){
    // invalid URL → fallback to raw
  }

  // remove leading/trailing slashes
  input = input.replace(/^\/+|\/+$/g, "");

  return input.split("/");
}


function hookQuizTasks(root = document){

  /* ==============================
     ADD OPTION
  ============================== */
  root.addEventListener("click", e => {
    const btn = e.target.closest(".js-add-option");
    if(!btn) return;

    const popup = btn.closest(".quiz-popup");
    if(!popup) return;

    const optionsWrap = popup.querySelector(".js-options");
    const taskWrap = popup.closest(".quiz-task");
    const taskId = taskWrap.dataset.taskId;

    const allowMulti = popup.querySelector(".js-multi-toggle")?.checked;

    const count = optionsWrap.children.length;
    const index = count + 1;

    const row = document.createElement("div");
    row.className = "radiotext";
    row.innerHTML = `
      <input 
        type="${allowMulti ? "checkbox" : "radio"}"
        name="correct-${taskId}"
        class="correct-answer"
      >
      <div class="optiony">
        <input 
          type="text"
          class="optns"
          value=""
          placeholder="Option ${index}"
          style="background-color: transparent; border: 0.1px solid #cccccc57;"
        >
        <button class="remove-option">&times;</button>
      </div>
    `;

    optionsWrap.appendChild(row);

    syncQuizToCard(taskWrap);
    reindexQuiz(taskWrap);
  });


  /* ==============================
     REMOVE OPTION
  ============================== */
  root.addEventListener("click", e => {
    const btn = e.target.closest(".remove-option");
    if(!btn) return;

    const row = btn.closest(".radiotext");
    if(!row) return;

    const taskWrap = row.closest(".quiz-task");

    row.remove();

    reindexQuiz(taskWrap);
    syncQuizToCard(taskWrap);
  });


  /* ==============================
     TEXT INPUT SYNC
  ============================== */
  root.addEventListener("input", e => {
    const input = e.target.closest(".optns");
    if(!input) return;

    const taskWrap = input.closest(".quiz-task");
    syncQuizToCard(taskWrap);
  });


  /* ==============================
     CORRECT ANSWER CLICK
  ============================== */
  root.addEventListener("change", e => {
    const correct = e.target.closest(".correct-answer");
    if(!correct) return;

    const taskWrap = correct.closest(".quiz-task");
    const popup = correct.closest(".quiz-popup");
    const allowMulti = popup.querySelector(".js-quiz-toggle")?.checked;

    if(!allowMulti){
      // force single correct
      popup.querySelectorAll(".correct-answer").forEach(i=>{
        if(i !== correct) i.checked = false;
      });
    }

    paintCorrect(taskWrap);
  });


  /* ==============================
    MULTI TOGGLE
  ============================== */
  root.addEventListener("change", e => {
    const toggle = e.target.closest(".js-multi-toggle");
    if(!toggle) return;

    const popup = toggle.closest(".quiz-popup");
    const quizToggle = popup.querySelector(".js-quiz-toggle");
    const taskWrap = popup.closest(".quiz-task");

    // 🔒 lock if correct answers is ON
    if(quizToggle.checked && !toggle.checked){
      toggle.checked = true;
      return;
    }

    // ✅ STATE SOURCE OF TRUTH
    taskWrap.dataset.multi = toggle.checked ? "true" : "false";

    switchQuizMode(taskWrap, toggle.checked);
  });


  root.addEventListener("change", e => {
    const toggle = e.target.closest(".js-github-star, .js-github-fork");
    if (!toggle) return;

    const popup   = toggle.closest(".popup-container");
    const card    = popup?.closest(".container-all-contain-yinit");
    if (!card) return;

    const doStar = popup.querySelector(".js-github-star")?.checked;
    const doFork = popup.querySelector(".js-github-fork")?.checked;

    const label = doStar && doFork
      ? "Star & Fork this repo"
      : doFork
        ? "Fork this repo"
        : doStar
          ? "Star this repo"
          : "Visit repo";

    const cta = card.querySelector(".js-github-cta");
    if (cta) cta.textContent = label;
  });


  /* ==============================
    CORRECT ANSWERS TOGGLE
  ============================== */
  root.addEventListener("change", e => {
    const toggle = e.target.closest(".js-quiz-toggle");
    if(!toggle) return;

    const popup = toggle.closest(".quiz-popup");
    const multiToggle = popup.querySelector(".js-multi-toggle");
    const taskWrap = popup.closest(".quiz-task");

    if(toggle.checked){
      // auto-enable multi
      multiToggle.checked = true;
      multiToggle.disabled = true;

      // ✅ store state
      taskWrap.dataset.multi = "true";

      switchQuizMode(taskWrap, true);
    }else{
      // unlock multi
      multiToggle.disabled = false;

      // ✅ clear all selected correct answers
      popup.querySelectorAll(".correct-answer").forEach(input => {
        input.checked = false;
      });

      // store current multi state
      taskWrap.dataset.multi = multiToggle.checked ? "true" : "false";

      paintCorrect(taskWrap);
    }
  });

}



function reindexQuiz(taskWrap){
  const popup = taskWrap.querySelector(".quiz-popup");
  const rows = popup.querySelectorAll(".radiotext");

  rows.forEach((row,i)=>{
    const input = row.querySelector(".optns");
    if(input){
      input.placeholder = `Option ${i+1}`;
    }
  });
}


function syncQuizToCard(taskWrap){
  const popup = taskWrap.querySelector(".quiz-popup");
  const cardGroup = taskWrap.querySelector(".radio-group");

  const options = [...popup.querySelectorAll(".radiotext")].map(row=>{
    return row.querySelector(".optns")?.value?.trim() || "";
  });

  const allowMulti = popup.querySelector(".js-multi-toggle")?.checked;

  cardGroup.innerHTML = options.map((opt,i)=>`
    <label class="custom-radio">
      <input 
        type="${allowMulti ? "checkbox" : "radio"}"
        name="${allowMulti ? "" : "quiz-"+taskWrap.dataset.taskId}"
        value="${i}"
        data-task-id="${taskWrap.dataset.taskId}"
      />
      <span class="radio-ui"></span>
      <span class="radio-text">${opt || `Option ${i+1}`}</span>
    </label>
  `).join("");
}


function switchQuizMode(taskWrap, allowMulti){
  const popup = taskWrap.querySelector(".quiz-popup");

  popup.querySelectorAll(".correct-answer").forEach(i=>{
    i.type = allowMulti ? "checkbox" : "radio";
  });

  taskWrap.querySelectorAll(".radio-group input").forEach(i=>{
    i.type = allowMulti ? "checkbox" : "radio";
  });

  paintCorrect(taskWrap);
}


function paintCorrect(taskWrap){
  const popup = taskWrap.querySelector(".quiz-popup");
  const rows = popup.querySelectorAll(".radiotext");

  rows.forEach(row=>{
    const box = row.querySelector(".optiony");
    const input = row.querySelector(".correct-answer");

    if(input.checked){
      box.style.border = "1px solid #00ff7b";
      box.style.boxShadow = "0 0 0 1px rgba(0,255,123,.4)";
    }else{
      box.style.border = "0.1px solid #cccccc57";
      box.style.boxShadow = "none";
    }
  });
}





function hookFileUploadTasks(root = document) {

  /* ----------------------------
     Toggle file type selection
  -----------------------------*/
  root.addEventListener("click", e => {

    const item = e.target.closest(".file-type-item");
    if (!item) return;

    const popup = item.closest(".file-popup");
    const wrapper = item.closest(".file-task");
    if (!popup || !wrapper) return;

    const uploader = wrapper.querySelector(".uploader-root");
    const fileInput = wrapper.querySelector(".fileUpload-init-makein");
    if (!uploader || !fileInput) return;

    const checkbox = item.querySelector(".js-file-type");
    if (!checkbox) return;

    // Toggle state
    const willSelect = !item.classList.contains("selected");
    item.classList.toggle("selected", willSelect);
    checkbox.checked = willSelect;

    // Collect active types
    const activeTypes = [
      ...popup.querySelectorAll(".file-type-item.selected .js-file-type")
    ].map(i => i.value);

    // 🚨 If zero selected → show error (but allow it)
    if (activeTypes.length === 0) {
      showError("Please select at least one file type.");
    }

    // Store exactly what user selected (even empty)
    uploader.dataset.fileTypes = activeTypes.join(",");

    // Build accept string (can be empty)
    const accept = buildAcceptString(activeTypes);

    if (accept) {
      fileInput.setAttribute("accept", accept);
    } else {
      fileInput.removeAttribute("accept");
    }

  });


  /* ----------------------------
     File count control
     (NO forced minimum anymore)
  -----------------------------*/
  root.addEventListener("input", e => {

    if (!e.target.classList.contains("js-file-count")) return;

    const input = e.target;
    const popup = input.closest(".file-popup");
    const wrapper = popup?.closest(".file-task");
    if (!wrapper) return;

    const uploader = wrapper.querySelector(".uploader-root");
    const fileInput = wrapper.querySelector(".fileUpload-init-makein");
    if (!uploader || !fileInput) return;

    let val = parseInt(input.value);

    // If invalid number → allow 0 but warn
    if (isNaN(val)) {
      uploader.dataset.fileCount = 0;
      fileInput.removeAttribute("multiple");
      showError("File count cannot be empty.");
      return;
    }

    // 🚨 If 0 → show error but DO NOT auto-correct
    if (val === 0) {
      showError("You must allow at least 1 file.");
    }

    // Hard cap only (optional safety)
    if (val > 50) {
      val = 50;
      input.value = 50;
    }

    // Store exactly what user entered
    uploader.dataset.fileCount = val;

    // Update multiple attribute
    if (val > 1) {
      fileInput.setAttribute("multiple", "multiple");
    } else {
      fileInput.removeAttribute("multiple");
    }

  });

}


async function handleVisitLinkUpdate(input, value){

  const popup = input.closest(".visit-link-popup");
  if (!popup) return;

  const wrapper = popup.closest(".visit-link-wrapper");
  if (!wrapper) return;

  const card = wrapper.querySelector(".visit-link");
  const previewBox = wrapper.querySelector(".js-link-preview-inner");
  const imgEl = wrapper.querySelector(".js-link-preview-img");
  const titleEl = wrapper.querySelector(".js-link-preview-title");
  const descEl = wrapper.querySelector(".js-link-preview-desc");
  const errorEl = popup.querySelector(".visit-link-error");

  if(errorEl) errorEl.style.display = "none";

  /* ===== 🔥 RESET UI IMMEDIATELY ===== */
  if(previewBox){
    previewBox.style.display = "flex";
  }

  if(imgEl){
    imgEl.src = "";
    imgEl.style.display = "none";
  }

  if(titleEl){
    titleEl.textContent = "Loading preview...";
  }

  if(descEl){
    descEl.textContent = "";
  }

  if(card){
    card.removeAttribute("href");   // prevent stale click
  }

  /* ===== FETCH ===== */
  try{
    const res = await fetch("/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ url: value })
    });

    const data = await res.json();
    if(data.error) throw "bad link";

    /* ===== APPLY UI ===== */

    // link
    card.href = value;

    if(previewBox){
      previewBox.style.display = "flex";
    }

    if(imgEl && data.image){
      imgEl.src = data.image;
      imgEl.style.display = "block";
    }

    if(titleEl){
      titleEl.textContent = data.title || "Visit link";
    }

    if(descEl){
      descEl.textContent = data.description || "";
    }
    input.dataset.valid = "true";
    validateForm();
  }catch(err){
    console.error("Visit link error:", err);

    // error state
    if(titleEl) titleEl.textContent = "Failed to load preview";
    if(descEl) descEl.textContent = "";
    if(errorEl) errorEl.style.display = "block";
    input.dataset.valid = "false";
    validateForm();
  }
}


async function loadEditorData() {


  const res = await fetch(
    `/api/${communitySlug}/quest/${quest_uuid}/${subquest_uuid}/editor-data`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      credentials: "include"
    }
  );

  if (!res.ok) {
    console.error("Failed to load editor data");
    return { tasks: [], conditions: [] };
  }

  const data = await res.json();

  window.__TASKS__ = data.tasks || [];
  window.existingConditions = data.conditions || [];

  return data;
}







function hookVisitLinkTasks(root = document){

  /* ===== PASTE BUTTON ===== */
  root.addEventListener("click", async e => {
    const btn = e.target.closest(".visit-link-popup .js-paste-link");
    if (!btn) return;

    let text = "";
    try{
      text = await navigator.clipboard.readText();
    }catch{
      return;
    }

    if(!text?.trim()) return;

    const popup = btn.closest(".visit-link-popup");
    if (!popup) return;

    const input = popup.querySelector(".social-input");
    if (!input) return;

    // 🔥 wipe + replace
    input.value = text.trim();

    // 🔥 fetch preview
    handleVisitLinkUpdate(input, input.value.trim());
  });


  /* ===== MANUAL PASTE (CTRL+V) ===== */
  root.addEventListener("paste", e => {
    const input = e.target.closest(".visit-link-popup .social-input");
    if (!input) return;

    setTimeout(()=>{
      const value = input.value.trim();
      if(!looksLikeUrlSocial(value)) return;
      handleVisitLinkUpdate(input, value);
    },0);
  });


  /* ===== BLUR FETCH ===== */
  root.addEventListener("blur", e=>{
    const input = e.target.closest(".visit-link-popup .social-input");
    if (!input) return;

    const value = input.value.trim();
    if(!value) return;
    if(!looksLikeUrlSocial(value)) return;

    handleVisitLinkUpdate(input, value);
  }, true);

}



function hookInviteTasks(root = document){

  const panel = document.querySelector(".panel-select-init");
  if(!panel) return;

  const searchInput = panel.querySelector(".searchQuest");

  /* ================= INPUT ================= */
  root.addEventListener("input", (e)=>{
    const input = e.target.closest(".js-invite-count");
    if(!input) return;

    const wrapper = input.closest(".invite-task-wrapper");
    if(!wrapper) return;

    const previewNum = wrapper.querySelector(".number-of-invites");
    const counter = wrapper.querySelector(".error-init-max");
    const errorMsg = wrapper.querySelector(".invite-error");

    let raw = input.value.replace(/\D/g, "");

    if(raw === ""){
      if(previewNum) previewNum.textContent = "—";
      if(counter) counter.textContent = `0/30`;
      if(errorMsg) errorMsg.style.display = "none";
      return;
    }

    let num = parseInt(raw, 10);

    /* ---------- VALIDATION ---------- */
    if(num > 30){

      // ❌ DO NOT CHANGE INPUT VALUE
      if(errorMsg){
        errorMsg.textContent = "Maximum monthly invite limit is 30";
        errorMsg.style.display = "block";
      }

      if(counter) counter.textContent = `30/30`;

      return;
    }

    /* ---------- VALID ---------- */
    if(errorMsg) errorMsg.style.display = "none";

    if(previewNum) previewNum.textContent = num;
    if(counter) counter.textContent = `${num}/30`;

    const hidden = wrapper.querySelector(".selected-num-invites");
    if(hidden) hidden.value = num;
  });


  /* ================= SEARCH FILTER ================= */
  if(searchInput){
    searchInput.addEventListener("input", ()=>{
      const q = searchInput.value.toLowerCase().trim();

      const questItems = panel.querySelectorAll(".quest-item");

      questItems.forEach(qItem=>{
        let questMatch = qItem.textContent.toLowerCase().includes(q);
        let subMatch = false;

        const subItems = qItem.querySelectorAll(".subquest-item");

        subItems.forEach(sub=>{
          const match = sub.textContent.toLowerCase().includes(q);
          sub.style.display = match ? "block" : "none";
          if(match) subMatch = true;
        });

        // show quest if quest name matches OR any subquest matches
        if(questMatch || subMatch){
          qItem.style.display = "block";
        }else{
          qItem.style.display = "none";
        }
      });
    });
  }


  /* ================= CLICK HANDLER (ALL LOGIC) ================= */
  document.addEventListener("click", (e)=>{

    /* ---------- TOGGLE DROPDOWN ---------- */
    const dropdownBtn = e.target.closest(".js-invite-dropdown");
    if(dropdownBtn){

      const wrapper = dropdownBtn.closest(".invite-task-wrapper");
      if(!wrapper) return;

      const isOpen = panel.dataset.open === "1";

      if(isOpen){
        closePanel();
        return;
      }

      panel.style.display = "block";
      panel.style.zIndex = "999999";
      smartPositionDropdown(dropdownBtn, panel);
      panel.style.visibility = "visible";
      panel.dataset.open = "1";
      panel.__activeWrapper = wrapper;
      return;
    }

    /* ---------- SUBQUEST SELECT ---------- */
    const item = e.target.closest(".subquest-item");
    if(item){

      const wrapper = panel.__activeWrapper;
      if(!wrapper) return;

      const subquestUUID = item.getAttribute("data-subquest-id");
      const subquestName = item.textContent.trim();

      const label = wrapper.querySelector(".selected-quest-label");
      if(label) label.textContent = subquestName;

      const uuidInput = wrapper.querySelector(".selected-subquest-uuid");
      const nameInput = wrapper.querySelector(".selected-subquest-name");

      if(uuidInput) uuidInput.value = subquestUUID;
      if(nameInput) nameInput.value = subquestName;

      wrapper.dataset.subquestUuid = subquestUUID;
      wrapper.dataset.subquestName = subquestName;

      closePanel();
      return;
    }

    /* ---------- OUTSIDE CLICK CLOSE ---------- */
    if(panel.dataset.open === "1"){
      const insidePanel = e.target.closest(".panel-select-init");
      const onButton  = e.target.closest(".js-invite-dropdown");

      if(!insidePanel && !onButton){
        closePanel();
      }
    }

  });


  /* ================= INTERNAL CLOSE (not extra function exposed) ================= */
  function closePanel(){
    panel.style.display = "none";
    panel.dataset.open = "0";
    panel.__activeWrapper = null;

    // 🔄 reset search + display
    if(searchInput){
      searchInput.value = "";
    }

    const questItems = panel.querySelectorAll(".quest-item");
    const subItems = panel.querySelectorAll(".subquest-item");

    questItems.forEach(q=> q.style.display = "flex");
    subItems.forEach(s=> s.style.display = "flex");
  }

}


function escapeHTMLFunc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function renderTask(task){
  if(!task || !task.type) return "";


  if(task.type === "url" || task.type === "text" || task.type === "numbers"){

    let inputType = "text";
    let title = "";
    let desc = "";
    let placeholder = "";
    let accent = task.type;

    if(task.type === "url"){
      inputType = "url";
      title = "URL";
      desc = "Paste a public link.";
      placeholder = "https://example.com";
    }

    if(task.type === "numbers"){
      inputType = "text";
      title = "Number";
      desc = "Enter a numeric value.";
      placeholder = "12345";
    }

    if(task.type === "text"){
      inputType = "text";
      title = "Text";
      desc = "Enter required text.";
      placeholder = "Type here...";
    }

    const html = `
  <div class="container-all-contain-yinit input-task-wrapper ${task.type}"
      data-platform="${task.type}"
      data-task-id="${task.id}">

    <!-- CARD -->
    <div class="card-container-quest input-task ${task.type}"
        style="color: var(--accent-${accent})">

      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS[task.type]?.icon || "📝"}
        </span>
        <span>${title}</span>
      </div>

      <div class="card-wrapper-quest">
        <div class="card-quest">
          <div class="content-quest-none">

            <div class="title-quest">${task.config?.title || title}</div>

            <div class="description-quest">
              ${task.config?.description || desc}
            </div>

            <div class="input-wrapper-quest">
              <input
                type="${inputType}"
                placeholder="${task.config?.placeholder || placeholder}"
                ${task.type === "numbers" 
                  ? `inputmode="numeric" pattern="[0-9]*"` 
                  : ""}
              />
            </div>

            <p style="display:none" class="${task.type}-error"></p>

          </div>
        </div>
      </div>
    </div>

    <!-- POPUP (SAME PATTERN AS YOUTUBE) -->
    <div class="popup-container input-popup is-open" role="dialog" aria-label="${title}">
      <div class="popup-header">
        <div class="telicon" style="background-color: var(--accent-${accent})">
          ${PLATFORM_ICONS[task.type]?.icon || "📝"}
        </div>

        <div class="title">${title}</div>
        <div class="liner"></div>


        <div class="popup-actions">
          <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
          <button class="js-paste-link" title="paste">${PastSVGQ}</button>
          <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
        </div>
      </div>

      <div class="bottom-${task.type}">
        <div class="liners"></div>

        <!-- Title input -->
        <input 
          class="js-title-input"
          style="color: aliceblue;"
          type="text"
          placeholder="Enter the title..."
          value="${task.config?.title || ""}"
        />

        <!-- Description input -->
        <textarea 
          class="js-desc-input"
          style="color: #787878;"
          placeholder="Type description...">${task.config?.description || ""}</textarea>

        <div class="mutiplespacing">
          <div class="text">
            <div class="title">Automatic validation</div>
            <div class="description">
              Once submitted, the claim is auto-validated and skips review.
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" class="js-auto-validate"
              ${task.config?.auto_validate ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>

  </div>
  `;

    return html;
  }

  else if ([
    "telegram",
    "discord",
    "youtube",
    "partnership",
    "partnership_quest"
  ].includes(task.type)) {
    
    const PLATFORM_META = {
      telegram: {
        title: "Telegram",
        action: "Join",
        placeholder: "https://t.me",
        accent: "telegram",
        suffix: "Channel"
      },
      discord: {
        title: "Discord",
        action: "Join",
        placeholder: "https://discord.gg",
        accent: "discord",
        suffix: "Server"
      },
      youtube: {
        title: "YouTube",
        action: "Subscribe",
        placeholder: "https://youtube.com",
        accent: "youtube",
        suffix: "Channel",
        extraLink: "?sub_confirmation=1"
      },
      partnership: {
        title: "Partnership",
        action: "Join",
        placeholder: "https://",
        accent: "partnership",
        suffix: "Community",
      },
      partnership_quest: {
        title: "Partnership Quest",
        action: "Go to",
        placeholder: "https://",
        accent: "p-quest",
        suffix: "Quest"
      }
    };

    const meta = PLATFORM_META[task.type];

    const name =
      task.config?.name ||
      task.config?.community_name ||
      meta.title;

    const desc =
      task.config?.about ||
      task.config?.subquest_name ||
      "";

    const link =
      (task.config?.link || "#") +
      (meta.extraLink || "");

    html = `
      <div class="container-all-contain-yinit social-task ${task.type}" 
          data-platform="${task.type}"
          data-task-id="${task.id}">

        <div class="card-container-quest social-task ${task.type}"
            style="color: var(--accent-${meta.accent})">

          <div class="badge-quest">
            <span class="badge-icon-quest">
              ${PLATFORM_ICONS[task.type]?.icon || "🌐"}
            </span>
            <span>${meta.title}</span>
          </div>

          <div class="card-wrapper-quest">
            <div class="card-quest">
              <div class="content-quest">

                <div class="avatar-quest">
                  <img src="${task.config?.icon || ""}">
                  <span class="fallback-letter"></span>
                </div>

                <h2 class="community_name">${name}</h2>

                <div class="description-parnership">${desc}</div>

                <a class="cta-quest"
                  href="${link}"
                  target="_blank"
                  style="background: var(--accent-${meta.accent}-text)">
                  ${meta.action} ${meta.suffix}
                </a>

              </div>
            </div>
          </div>
        </div>

        <!-- POPUP -->
        <div class="popup-container social-popup is-open" data-platform="${task.type}">
          <div class="popup-header">
            <div class="telicon" style="background-color: var(--accent-${meta.accent})">
              ${PLATFORM_ICONS[task.type]?.icon || "🌐"}
            </div>

            <div class="title">${meta.title}</div>
            <div class="liner"></div>

            <div class="popup-actions">
              <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
              <button class="js-paste-link" title="paste">${PastSVGQ}</button>
              <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
            </div>
          </div>

          <div class="bottom-${task.type}">

            <div class="liners"></div>

            <label class="labeltesting">Link you want users to visit</label>

            <input
              class="social-input telinput"
              data-platform="${task.type}"
              type="text"
              placeholder="${meta.placeholder}"
              value="${task.config?.link || ""}"
            />

            <div class="error-message social-error-msg" style="display:none;">
              Invalid url
            </div>
          </div>
        </div>

      </div>
  `;

    return html;   
  }

/* ============================
   PUZZLE TASK
   ============================ */
  else if(task.type === "puzzle"){

    const accent = "puzzle";

    const title = task.config?.title || "Puzzle";
    const desc  = task.config?.description || "Solve the puzzle and enter the correct secret code.";
    const placeholder = task.config?.placeholder || "Enter secret code...";

    const html = `
    <div class="container-all-contain-yinit input-task-wrapper puzzle"
        data-platform="puzzle"
        data-task-id="${task.id}">

      <!-- CARD -->
      <div class="card-container-quest input-task puzzle"
          style="color: var(--accent-puzzle)">

        <div class="badge-quest">
          <span class="badge-icon-quest">
          ${PLATFORM_ICONS["puzzle"]?.icon || "🧩"}
          </span>
          <span class="position-pp-zle">Puzzle</span>
        </div>

        <div class="card-wrapper-quest">
          <div class="card-quest">
            <div class="content-quest-none">

              <div class="title-quest">${title}</div>

              <div class="description-quest">
                ${desc}
              </div>

              <div class="input-wrapper-quest puzzle-input">
                <input
                  type="text"
                  class="puzzle-answer-input"
                  placeholder="${placeholder}"
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>

              <p style="display:none" class="puzzle-error"></p>

            </div>
          </div>
        </div>
      </div>

      <!-- 🧩 POPUP -->
      <div class="popup-container input-popup puzzle-popup is-open" role="dialog" aria-label="Puzzle">

        <div class="popup-header">
          <div class="teliconpuzz" style="background-color: var(--accent-puzzle)">
          ${PLATFORM_ICONS["puzzle"]?.icon || "🧩"}
          </div>

          <div class="title">Puzzle</div>
          <div class="liner"></div>

          <div class="popup-actions">
            <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
            <button class="js-paste-link" title="paste">${PastSVGQ}</button>
            <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
          </div>
        </div>

        <div class="bottom-puzzle">
          <div class="liners"></div>

          <!-- Puzzle Title -->
          <input 
            class="js-title-input"
            style="color: aliceblue;"
            type="text"
            placeholder="Puzzle title..."
            value="${task.config?.title || ""}"
          />

          <!-- Puzzle Description -->
          <textarea 
            class="js-desc-input"
            style="color: #787878;"
            placeholder="Describe the puzzle / riddle / challenge...">${task.config?.description || ""}</textarea>

            <div class="puzzle-config" style="margin-top: 15px">

              <label class="labeltesting">Expected Answer / Secret Code</label>
              <input
                type="text"
                class="js-puzzle-answer puzzule"
                placeholder="e.g. 7H3-K3Y-42 / open_sesame / 0xA91F / secret123"
                value="${task.config?.answer || ""}"
              />

              <label class="labeltesting"  style="margin-top: 20px">Input Placeholder</label>
              <input 
                type="text"
                class="js-puzzle-placeholder js-puzzle-answer"
                placeholder="Enter secret code..."
                value="${task.config?.placeholder || ""}"
              />

            </div>

          <div class="mutiplespacing">
            <div class="text">
              <div class="title">Automatic validation</div>
              <div class="description">
                Correct answer auto-validates claim.
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" class="js-auto-validate"
                ${task.config?.auto_validate ? "checked" : "checked"}>
              <span class="slider"></span>
            </label>
          </div>

        </div>
      </div>

    </div>
    `;

    return html;
  }


  else if (task.type === "github") {

    const repoUrl   = task.config?.link || "";
    const repoName  = task.config?.repo_name || "";
    const repoOwner = task.config?.repo_owner || "";
    const repoAvatar= task.config?.owner_avatar || "";
    const doStar    = task.config?.star !== false;
    const doFork    = !!task.config?.fork;

    const ctaLabel = doStar && doFork
      ? "Star & Fork this repo"
      : doFork
        ? "Fork this repo"
        : "Star this repo";

    return `
  <div class="container-all-contain-yinit social-task github"
      data-platform="github"
      data-task-id="${task.id}">

    <div class="card-container-quest social-task github"
        style="color: var(--accent-github)">

      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS["github"]?.icon || `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`}
        </span>
        <span>GitHub</span>
      </div>

      <div class="card-wrapper-quest">
        <div class="card-quest">
          <div class="content-quest">

            <div class="avatar-quest">
              <img src="${repoAvatar}" style="${repoAvatar ? '' : 'display:none'}">
              <span class="fallback-letter" style="${repoAvatar ? 'display:none' : ''}">
                ${repoOwner ? repoOwner[0].toUpperCase() : ''}
              </span>
            </div>

            <h2 class="community_name">${repoName || "Repository"}</h2>

            <div class="description-parnership" style="font-size:12px;opacity:.6">
              ${repoOwner ? `@${repoOwner}` : ""}
            </div>

            <a class="cta-quest js-github-cta"
              href="${repoUrl}"
              target="_blank"
              style="background: var(--accent-github-text)">
              ${ctaLabel}
            </a>

          </div>
        </div>
      </div>
    </div>

    <!-- POPUP -->
    <div class="popup-container social-popup is-open" data-platform="github">
      <div class="popup-header">
        <div class="telicon" style="background-color:#24292e">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        </div>

        <div class="title">GitHub</div>
        <div class="liner"></div>

        <div class="popup-actions">
          <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
          <button class="js-paste-link" title="paste">${PastSVGQ}</button>
          <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
        </div>
      </div>

      <div class="bottom-github">
        <div class="liners"></div>

        <label class="labeltesting">Repository URL</label>
        <input
          class="social-input github-input telinput"
          data-platform="github"
          type="text"
          placeholder="https://github.com/owner/repo"
          value="${repoUrl}"
        />

        <div class="error-message social-error-msg" style="display:none">
          Could not find a public repository at that URL
        </div>

        <!-- repo preview strip (hidden until fetched) -->
        <div class="github-repo-preview" style="display:${repoName ? 'flex' : 'none'};align-items:center;gap:10px;margin-top:10px;padding:10px 12px;background:rgba(90, 90, 131, 0.21);border:0.9px solid var(--border);border-radius:14px">
          <img class="github-preview-avatar" src="${repoAvatar}" style="width:28px;height:28px;border-radius:50%;object-fit:cover">
          <div>
            <div class="github-preview-name" style="font-size:13px;font-weight:600;color:#eeeef5">${repoName}</div>
            <div class="github-preview-owner" style="font-size:11px;opacity:.5">@${repoOwner}</div>
          </div>
        </div>

        <!-- Star toggle -->
        <div class="mutiplespacing github-initer first" style="margin-top:16px">
          <div class="text">
            <div class="title" style="display:flex;align-items:center;gap:6px;font-size: 15px">
              Star
              <span class="gh-tooltip-wrap" data-tip="When enabled, members of your community will be asked to give this repository a star on GitHub.">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="cursor:pointer;opacity:.5">
                  <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1"/>
                  <text x="6.5" y="10" text-anchor="middle" font-size="8" fill="currentColor">?</text>
                </svg>
                <span class="gh-tooltip-box"></span>
              </span>
            </div>
            <div class="description">Ask members to star this repository</div>
          </div>
          <label class="switch">
            <input type="checkbox" class="js-github-star" ${doStar ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>

        <!-- Fork toggle -->
        <div class="mutiplespacing github-initer">
          <div class="text">
            <div class="title" style="display:flex;align-items:center;gap:6px; font-size: 15px">
              Fork
              <span class="gh-tooltip-wrap" data-tip="When enabled, members of your community will be asked to fork this repository to their own GitHub account.">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style="cursor:pointer;opacity:.5">
                  <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1"/>
                  <text x="6.5" y="10" text-anchor="middle" font-size="8" fill="currentColor">?</text>
                </svg>
                <span class="gh-tooltip-box"></span>
              </span>
            </div>
            <div class="description">Ask members to fork this repository</div>
          </div>
          <label class="switch">
            <input type="checkbox" class="js-github-fork" ${doFork ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>

      </div>
    </div>

  </div>`;
  }

  else if(task.type === "Optionscale(numbers)") {

    const start = parseInt(task.config?.scale?.from) || 1;
    const end = parseInt(task.config?.scale?.to) || 10;
    const leftLabel = task.config?.labels?.left || "Not Likely";
    const rightLabel = task.config?.labels?.right || "Very Likely";

    const numbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    return `
  <div class="container-all-contain-yinit rating-task numberOpt"
      data-type="Optionscale(numbers)"
      data-task-id="${task.id}"
      style="color: var(--accent-numbers)">

    <!-- CARD -->
    <div class="card-container-quest optionscale-numbers">

      <!-- Badge -->
      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS["optionscale(numbers)"]?.icon || "🔢"}
        </span>
        <span>Your Take</span>
      </div>

      <!-- Wrapper -->
      <div class="card-wrapper-quest">
        <div class="card-quest">
          <div class="content-quest numbers">

            <!-- Title -->
            <div class="polltitn">
              ${task.config?.title || "Your Take"}
            </div>

            <!-- Description -->
            <div class="polldescn">
              ${task.config?.description || ""}
            </div>

            <!-- Numbers -->
            <div class="number-container js-number-container">
              ${numbers.map(num => `
                <div class="number-box">${num}</div>
              `).join("")}
            </div>

            <!-- Labels -->
            <div class="containersters">
              <div class="left-div js-left-label">${leftLabel}</div>
              <div class="right-div js-right-label">${rightLabel}</div>
            </div>

          </div>
        </div>
      </div>

    </div>


    <!-- 🔢 POPUP OVERLAY -->
    <div class="popup-container rating-popup is-open" role="dialog" aria-label="Number Scale">

      <div class="popup-header">
        <div class="telicon" style="background-color: var(--accent-numbers)">
          ${PLATFORM_ICONS["optionscale(numbers)"]?.icon || "🔢"}
        </div>

        <div class="title">Your Take</div>

          <div class="liner"></div>


          <div class="popup-actions">
            <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
            <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
          </div>
      </div>
      <div class="bottom-numberopt">

        <div class="liners"></div>

        <!-- Title -->
        <input 
          class="js-title-input"
          style="color: aliceblue;"
          type="text"
          placeholder="Enter title..."
          value="${task.config?.title || ""}"
        />

        <!-- Description -->
        <textarea 
          class="js-desc-input"
          style="color: #787878;"
          placeholder="Enter description...">${task.config?.description || ""}</textarea>

        <!-- Scale Config -->
        <div class="rating-config">

          <div class="yourtaketitle">Scale</div>
          <div class="scale-row">
            <input type="number" class="js-firstnum" value="${start}" min="-1000" max="1000">
            <span class="scale-sep">to</span>
            <input type="number" class="js-lastnum" value="${end}" min="-1000" max="1000">
          </div>

          <div class="scale-errors">
            <span class="js-first-error"></span>
            <span class="js-last-error"></span>
          </div>

          <div class="yourtaketitle">Label</div>
          <div class="scale-row">
            <input type="text" class="js-notlikely" value="${leftLabel}" placeholder="Not Likely">
            <span class="scale-sep"></span>
            <input type="text" class="js-verylikely" value="${rightLabel}" placeholder="Very Likely">
          </div>

        </div>
      </div>

    </div>

  </div>
  `;
  }


  else if(task.type === "visit-link"){
    return renderVisitLinkTask(task);
  }

  /* ============================
   QUIZ
   ============================ */
  else if (task.type === "quiz") {

    const allowMulti = !!task.config?.allowMultipleSelection;
    const options = task.config?.options || [];

    return `
  <div class="container-all-contain-yinit quiz-task"
      data-type="quiz"
      data-task-id="${task.id}"
      style="color: var(--accent-quiz)" data-multi="${allowMulti ? "true" : "false"}">

    <!-- ================= CARD ================= -->
    <div class="card-container-quest quiz">

      <!-- Badge -->
      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS["quiz"]?.icon || "🧠"}
        </span>
        <span>Quiz</span>
      </div>

      <!-- Wrapper -->
      <div class="card-wrapper-quest">
        <div class="card-quest">
          <div class="content-quest quiz-root">

            <!-- Title -->
            <div class="polltitq">
              ${task.config?.title || "Quiz title"}
            </div>

            <!-- Description -->
            <div class="polldescq">
              ${task.config?.description || "Quiz description"}
            </div>

            <!-- Options -->
            <div class="radio-group">
              ${options.map((opt, i) => `
                <label class="custom-radio">
                  <input 
                    type="${allowMulti ? "checkbox" : "radio"}"
                    name="${allowMulti ? "" : "quiz-${task.id}"}"
                    value="${i}"
                    data-task-id="${task.id}"
                  />
                  <span class="radio-ui"></span>
                  <span class="radio-text">${opt || `Option ${i+1}`}</span>
                </label>
              `).join("")}
            </div>

          </div>
        </div>
      </div>
    </div>


    <!-- ================= POPUP OVERLAY ================= -->
    <div class="popup-container quiz-popup is-open" role="dialog" aria-label="Quiz editor">

      <div class="popup-header">
        <div class="telicon" style="background-color: var(--accent-quiz)">
          ${PLATFORM_ICONS["quiz"]?.icon || "🧠"}
        </div>

        <div class="title">Quiz</div>

        <div class="liner"></div>


        <div class="popup-actions">
          <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
          <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
        </div>
      </div>
      <div class="bottom-quiz">

        <div class="liners"></div>

        <!-- TITLE -->
        <input  
          class="js-title-input"
          type="text"
          placeholder="Enter the title of your quiz..."
          style="color: aliceblue;"
          value="${escapeHTMLFunc(task.config?.title || "")}"
        />

        <!-- DESCRIPTION -->
        <textarea 
          class="js-desc-input"
          placeholder="Type your quiz description..."
          style="color: #787878;">${task.config?.description || ""}</textarea>

        <!-- OPTIONS EDITOR -->
        <div class="addingtiming js-addingtiming">

          <div class="transoptions js-options">

            ${(options.length ? options : ["",""]).map((opt, i) => {
              const isCorrect = task.config?.correct?.includes(i);
              return `
              <div class="radiotext">
                <input 
                  type="${allowMulti ? "checkbox" : "radio"}"
                  name="correct-${task.id}"
                  class="correct-answer"
                  ${isCorrect ? "checked" : ""}
                >
                <div class="optiony"
                  style="${isCorrect 
                    ? 'border:1px solid #00ff7b; box-shadow:0 0 0 1px rgba(0,255,123,.4);' 
                    : 'border:0.1px solid #cccccc57; box-shadow:none;'}">
                  <input 
                    type="text"
                    class="optns"
                    value="${opt}"
                    placeholder="Option ${i+1}"
                    style="background-color: transparent;"
                  >
                  <button class="remove-option">&times;</button>
                </div>
              </div>
              `;
            }).join("")}
          </div>

          <button class="add-option js-add-option">+ Add option</button>
        </div>

        <!-- SETTINGS -->
        <div class="spacinelement">

          <!-- Correct answers -->
          <div class="mutiplespacing">
            <div class="text">
              <div class="title">Correct answer(s)</div>
              <div class="description">
                Select one or more correct answers from the options above.
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" class="js-quiz-toggle"
                ${task.config?.hasCorrectAnswers ? "checked" : ""}>
              <span class="slider"></span>
            </label>
          </div>

          <!-- Multiple selection -->
          <div class="mutiplespacing">
            <div class="text">
              <div class="title">Multiple selection</div>
              <div class="description">
                Allow users to select multiple options.
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" class="js-multi-toggle"
                ${allowMulti ? "checked" : ""}>
              <span class="slider"></span>
            </label>
          </div>

        </div>
      </div>

    </div>

  </div>
  `;
  }




  else if (task.type === "poll") {

    const allowMulti = !!task.config?.multiple;
    const options = task.config?.options || [];
    const allowOther = !!task.config?.other;

    return `
    <div class="container-all-contain-yinit poll-task"
        data-type="poll"
        data-task-id="${task.id}"
        style="color: var(--accent-poll)">

      <!-- CARD -->
      <div class="card-container-quest poll">

        <!-- Badge -->
        <div class="badge-quest">
          <span class="badge-icon-quest">
            ${PLATFORM_ICONS["poll"]?.icon || "📊"}
          </span>
          <span>Poll</span>
        </div>

        <!-- Wrapper -->
        <div class="card-wrapper-quest">
          <div class="card-quest">
            <div class="content-quest quiz-root">

              <!-- Title -->
              <div class="polltitq">
                ${task.config?.title || "Poll title"}
              </div>

              <!-- Description -->
              <div class="polldescq">
                ${task.config?.description || "Poll description"}
              </div>

              <!-- OPTIONS PREVIEW -->
              <div class="radio-group">
                ${options.map((opt, i) => `
                  <label class="custom-radio">
                    <input
                      type="${allowMulti ? "checkbox" : "radio"}"
                      name="${allowMulti ? "" : `poll-${task.id}`}"
                      value="${i}"
                      data-task-id="${task.id}"
                    />
                    <span class="radio-ui"></span>
                    <span class="radio-text">${opt}</span>
                  </label>
                `).join("")}

                ${allowOther ? `
                  <div class="custom-radio other-option">
                    <label class="other-radio">
                      <input
                        type="${allowMulti ? "checkbox" : "radio"}"
                        name="${allowMulti ? "" : `poll-${task.id}`}"
                        value="other"
                      />
                      <span class="radio-ui"></span>
                    </label>
                    <input 
                      type="text"
                      class="other-input"
                      placeholder="Other (please specify)"
                    />
                  </div>
                ` : ""}
              </div>

            </div>
          </div>
        </div>
      </div>


      <!-- 🗳️ POLL EDITOR POPUP -->
      <div class="popup-container poll-popup is-open" role="dialog">

        <div class="popup-header">
          <div class="telicon" style="background-color: var(--accent-poll)">
            ${PLATFORM_ICONS["poll"]?.icon || "📊"}
          </div>

          <div class="title">Poll</div>
          <div class="liner"></div>

          <div class="popup-actions">
            <button class="js-copy-link">${ChevronSVGQ}</button>
            <button class="js-delete-link">${DeleteSVGQ}</button>
          </div>
        </div>

        <div class="bottom-quiz">
          <div class="liners"></div>

          <!-- Title -->
          <input  
            class="js-title-input"
            type="text"
            placeholder="Enter the title of your poll..."
            style="color: aliceblue;"
            value="${escapeHTMLFunc(task.config?.title || "")}"
          />

          <!-- Description -->
          <textarea 
            class="js-desc-input"
            placeholder="Type your poll description..."
            style="color: #787878;">${task.config?.description || ""}</textarea>


          <!-- OPTIONS EDITOR -->
          <div class="addingtiming js-options-section">

            <div class="options-container" style="margin-top: 5px !important;">

              ${(options.length ? options : ["",""]).map((opt, i) => `
                <div class="optionnsy">
                  <input 
                    type="text" 
                    class="optn"  
                    placeholder="Option ${i+1}"
                    value="${opt}"
                    style="background-color: transparent; border: 0.1px solid #cccccc57;"
                  />
                  <button class="remove-option">&times;</button>
                </div>
              `).join("")}

              ${allowOther ? `
                <div class="optionnsy other-editor">
                  <input 
                    type="text"
                    class="optn other-disabled"
                    value="Other option"
                    disabled
                    style="opacity: 0.6; background-color: transparent; border: 0.1px dashed #cccccc57;"
                  />
                </div>
              ` : ""}

            </div>

            <button class="add-option" style="margin-top: 20px !important;">
              + Add option
            </button>

          </div>


          <!-- SETTINGS -->
          <div class="spacinelement">


            <div class="mutiplespacing">
              <div class="text">
                <div class="title">Multiple selection</div>
                <div class="description">
                  Allow users to select multiple options.
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" class="js-multi-toggle"
                  ${allowMulti ? "checked" : ""}>
                <span class="slider"></span>
              </label>
            </div>

            <div class="mutiplespacing">
              <div class="text">
                <div class="title">Other option</div>
                <div class="description">
                  Allow users to enter a custom option.
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" class="js-other-toggle"
                  ${allowOther ? "checked" : ""}>
                <span class="slider"></span>
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>`;
  }

    
  else if (task.type === "file-upload") {

    const fileCount = task.config?.fileCount || 1;
    const fileTypes = (task.config?.fileTypes || []).map(t => t.toLowerCase());
    const accept = buildAcceptString(fileTypes);

    return `
  <div class="container-all-contain-yinit file-task"
      data-type="file-upload"
      data-task-id="${task.id}"
      style="color: var(--accent-upload)">

    <!-- CARD -->
    <div class="card-container-quest file-upload">
      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS["file-upload"]?.icon || "📁"}
        </span>
        <span>File Upload</span>
      </div>

      <div class="card-wrapper-quest file-up">
        <div class="card-quest">
          <div class="content-quest uploader-root"
              data-file-count="${fileCount}"
              data-file-types="${fileTypes.join(",")}">

            <div class="upload-box-init-q">
              <div class="dragPrompt">
                <span class="initialPrompt">
                  <span class="choose-file">Choose file</span>
                </span>
                <span> or </span>
                <strong>drag & drop</strong>
              </div>

              <div class="divers">
                <div class="chosenFilesContainer"></div>
                <div class="file-preview"></div>

                <input 
                  type="file"
                  class="fileUpload-init-makein"
                  name="files"
                  ${fileCount > 1 ? "multiple" : ""}
                  ${accept ? `accept="${accept}"` : ""}
                  hidden
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- POPUP -->
    <div class="popup-container file-popup is-open">

      <div class="popup-header">
        <div class="telicon" style="background-color: var(--accent-upload)">
          ${PLATFORM_ICONS["file-upload"]?.icon || "📁"}
        </div>
        <div class="title">File Upload</div>
          <div class="liner"></div>


          <div class="popup-actions">
            <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
            <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
          </div>
      </div>

      <div class="bottom-file-upload">

        <div class="liners"></div>

        <!-- FILE COUNT -->
        <div class="mutiplespacing">
          <div class="text">
            <div class="title">Number of files</div>
          </div>

          <div class="input-group">
            <input 
              type="number" 
              class="js-file-count"
              max="12" 
              value="${fileCount}"
            >
          </div>
        </div>

        <!-- CATEGORY BOX -->
        <div class="categoryBox category file-category-box">

          ${renderFileType("document", "Document", fileTypes)}
          ${renderFileType("presentation", "Presentation", fileTypes)}
          ${renderFileType("spreadsheet", "Spreadsheet", fileTypes)}
          ${renderFileType("image", "Image", fileTypes)}
          ${renderFileType("drawing", "Drawing", fileTypes)}
          ${renderFileType("video", "Video", fileTypes)}
          ${renderFileType("audio", "Audio", fileTypes)}
          ${renderFileType("archive", "Archive", fileTypes)}

        </div>

      </div>

    </div>

  </div>
  `;
  }




  else if (task.type === "invite") {

    const numInvites = task.config?.numInvites || "";
    const subquestName = task.config?.subquest_name || "";
    const subquestUUID = task.config?.subquest_uuid || "";

    return `
  <div class="container-all-contain-yinit invite-task-wrapper"
      data-type="invite"
      data-task-id="${task.id}"
      style="color: var(--accent-invite)">

    <!-- ================= CARD ================= -->
    <div class="card-container-quest invite-task">

      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS["invite"]?.icon || "✉️"}
        </span>
        <span>Invite</span>
      </div>

      <div class="card-wrapper-quest">
        <div class="card-quest">
          <div class="content-quest invite-root">

            <div class="invite-preview-box">
              <div class="invite-preview-desc">
                Invite <span class="number-of-invites">${numInvites}</span> people to complete this task
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


    <!-- ================= POPUP OVERLAY ================= -->
    <div class="popup-container invite-popup" role="dialog" aria-label="Invite">

      <div class="popup-header">
        <div class="telicon" style="background: var(--accent-invite)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path fill="#ffffff" transform="scale(0.0375)" d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
          </svg>
        </div>

          <div class="liner"></div>


          <div class="popup-actions">
            <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
            <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
          </div>
      </div>

      <div class="liners"></div>


      <div class="invite-row">

        <!-- Number of invites -->
        <div class="invite-text">
          <div class="invite-title">Number of invitations required</div>

          <input 
            type="text" 
            class="invite-num js-invite-count" 
            style="background-color: transparent; outline: none; font-size: 14px !important; cursor: text !important;" 
            placeholder="1" 
            value="${numInvites}"
          >

          <p class="error-init-max">30/30</p>



          <p class="invite-hint">
            You can set any number of invites for this task, but your community has a 
            monthly limit of <strong>30 total invites</strong>. Once the limit is reached, 
            you won’t be able to create additional invite tasks until the next month.
          </p>


          <p class="error-quest invite-error" style="color: red; display: none;">
            Value must be greater than zero
          </p>

        </div>


        <!-- Quest selector -->
        <div class="invite-text">

          <div class="invite-title-row">
            <span class="invite-title">Quest needed to count</span>
            <span class="smalltext optional-text">Optional</span>
          </div>

          <div class="invite-dropdown">

            <div class="invite-dropdown-input js-invite-dropdown">
              <span class="selected-quest-label" style="white-space: nowrap; text-overflow: ellipsis; max-width: 80%; overflow: hidden">
                ${subquestName || "Select Quest"}
              </span>
              <span class="invite-arrow">${ChevronSVGQ}</span>
            </div>

            <div class="invite-quest-select">

              <div class="invite-quest-panel">

                <div class="invite-search-box">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                    <path d="M20 20L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <input 
                    type="search" 
                    class="invite-searchQuest" 
                    placeholder="Search quest..." 
                  />
                </div>

                <div class="invite-quest-divider"></div>

                <!-- hidden storage -->
                <input type="hidden" class="selected-subquest-uuid" value="${subquestUUID}">
                <input type="hidden" class="selected-subquest-name" value="${subquestName}">
                <input type="hidden" class="selected-num-invites" value="${numInvites}">

                <ul class="invite-quest-list">
                  <!-- dynamically filled later -->
                  <li class="invite-quest-item disabled">No quests loaded</li>
                </ul>

              </div>
            </div>

          </div>

          <div class="smalltext">
            Only users who claimed this quest will be count.
            <a href="#" style="text-decoration: underline; ">Learn More.</a>
          </div>

        </div>


        <div class="invite-text-topper">
          <div class="invite-title">XP required for invite to count</div>
          <div class="smalltext">
            Update your invite requirements for your community in 
            <a href="/community/${communitySlug}/settings/security" style="text-decoration: underline; ; cursor: pointer">settings.</a>
          </div>
        </div>

      </div>
    </div>

  </div>
  `;
  }

  /* ============================
    PROOF OF HUMANITY (P.O.H)
    ============================ */
  else if (task.type === "p.o.h") {

    return `
  <div class="container-all-contain-yinit poh-wrapper"
      data-type="p.o.h"
      data-task-id="${task.id}">

    <!-- CARD -->
    <div class="card-container-quest poh"
        style="color: var(--accent-poh)">

      <!-- Badge -->
      <div class="badge-quest">
        <span class="badge-icon-quest">
          ${PLATFORM_ICONS["p.o.h"]?.icon || "🧍"}
        </span>
        <span>Proof of Humanity</span>
      </div>

      <!-- Wrapper -->
      <div class="card-wrapper-quest">
        <div class="card-quest">
          <div class="content-quest poh-root">

            <div class="poh-title">
              Verify Your Humanity
            </div>

            <div class="poh-subtitle">
              Click below to prove you’re real
            </div>

            <!-- CTA -->
            <a href="${task.config?.link || "#"}"
              target="_blank"
              rel="noopener noreferrer"
              class="cta-quest poh-btn">
              Claim Verification
            </a>

            <!-- Error / status -->
            <p class="prove-self" style="display:none;">
              Verification required to continue
            </p>

          </div>
        </div>
      </div>
    </div>

    <!-- SIMPLE POPUP -->
    <div class="popup-container" role="dialog" aria-label="Proof of Humanity details">
      <div class="popup-header">
        <div class="telicon" style="background-color: var(--accent-poh)">
          ${PLATFORM_ICONS["p.o.h"]?.icon || "🧍"}
        </div>

        <div class="title">Proof of Humanity</div>
          <div class="liner"></div>

        <div class="popup-actions">
          <button title="Delete link">${DeleteSVGQ}</button>
        </div>
      </div>

      <div class="liners"></div>
    </div>

  </div>`;
  }


  else if(task.type === "Optionscale(star)"){

    const starCount = task.config?.starCount || 5;

    return `
<div class="container-all-contain-yinit rating-task Starsss"
     data-type="Optionscale(star)"
     data-task-id="${task.id}"
     style="color: var(--accent-star)">

  <div class="card-container-quest optionscale-star"  >

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS["optionscale(star)"]?.icon || "⭐"}
      </span>
      <span>Star Take</span>
    </div>

    <!-- Wrapper -->
    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest star">

          <!-- Title -->
          <div class="polltits">
            ${task.title || task.config?.title || "Rate this"}
          </div>

          <!-- Description -->
          <div class="polldescs">
            ${task.description || task.config?.description || ""}
          </div>

          <!-- Stars -->
          <div class="stars js-stars-container" data-count="${starCount}">
            ${Array.from({ length: starCount }).map((_, i) => `
            ${starstrerSvg}
            `).join("")}
          </div>

        </div>
      </div>
    </div>

   </div>


    <!-- ⭐ POPUP CONTAINER (OVERLAY STYLE) -->
    <div class="popup-container rating-popup is-open" role="dialog" aria-label="Star Take">

      <div class="popup-header">
        <div class="telicon" style="background-color: var(--accent-star)">
          ${PLATFORM_ICONS["optionscale(star)"]?.icon || "⭐"}
        </div>

        <div class="title">Star Take</div>
        <div class="liner"></div>


        <div class="popup-actions">
          <button class="js-copy-link" title="close">${ChevronSVGQ}</button>
          <button class="js-delete-link" title="delete">${DeleteSVGQ}</button>
        </div>
      </div>
      <div class="bottom-star">

        <div class="liners"></div>

        <!-- Title input -->
        <input 
          class="js-title-input title-input-star"
          style="color: aliceblue;"
          type="text"
          placeholder="Enter the title of your poll..."
          value="${task.config?.title || ""}"
        />

        <!-- Description input -->
        <textarea 
          style="margin-top: 10px; !important"
          class="js-desc-input"
          style="color: #787878;"
          placeholder="Type your poll description...">${task.config?.description || ""}</textarea>

        <div class="rating-config">
          <div class="yourtaketitle star">Star count</div>
          <input 
            type="number" 
            class="startcount" 
            value="${starCount}" 
            placeholder="10"
            max="10"
          >
        </div>
      </div>

    </div>

  </div>`;
  }



/* ============================
     DEFAULT
     ============================ */
  else {
    return `
<div class="card-container-quest default">
  <div class="badge-quest">
    <span class="badge-icon-quest">Task</span>
    <span>${task.type}</span>
  </div>

  <div class="card-wrapper-quest">
    <div class="card-quest">
      <div class="content-quest">
        <div class="avatar-quest">
          ${task.config?.icon ? `<img src="${task.config.icon}">` : ""}
        </div>
        <h2>${task.config?.name || task.type}</h2>
        <a class="cta-quest"
           href="${task.config?.link || "#"}"
           target="_blank">
          Open
        </a>
      </div>
    </div>
  </div>
</div>`;
  }
}



async function blobToBase64(blobUrl) {
  const res = await fetch(blobUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // base64 data url
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}








async function serializeDescription() {
  const blocks = [];
  const children = document.querySelectorAll(
    '.main-text-area > .text-block, .main-text-area > .media-block'
  );

  for (const node of children) {

    /* ---------- TEXT ---------- */
    if (node.classList.contains('text-block')) {
      const html = node.innerHTML.trim();

      if (html !== "") {
        blocks.push({
          type: "text",
          html
        });
      }
    }

    /* ---------- MEDIA ---------- */
    if (node.classList.contains('media-block')) {
      const img = node.querySelector('img');
      const vid = node.querySelector('video');

      /* ----- IMAGE ----- */
      if (img) {
        let src = img.src;

        // ✅ convert blob → base64
        if (src.startsWith("blob:")) {
          src = await blobToBase64(src);
        }

        blocks.push({
          type: "image",
          src,
          encoding: src.startsWith("data:image") ? "base64" : "url"
        });
      }

      /* ----- VIDEO ----- */
      if (vid) {
        let src = vid.src;

        // ✅ convert blob → base64
        if (src.startsWith("blob:")) {
          src = await blobToBase64(src);
        }

        blocks.push({
          type: "video",
          src,
          encoding: src.startsWith("data:video") ? "base64" : "url"
        });
      }
    }
  }

  return blocks;
}



function collectConditions() {

  const conditionBlocks = document.querySelectorAll('.condition-block');
  const conditions = [];

  conditionBlocks.forEach(block => {

    const typeEl = block.querySelector('.conditionDisplay');
    const operatorEl = block.querySelector('.conitiontype span');
    const valueEl = block.querySelector('.valueText');
    const uuidEl = block.querySelector('.selected-subquest-uuid');

    const condition_type = typeEl?.textContent.trim() || '';

    let operator = null;
    if (operatorEl) {
      operator = operatorEl.dataset.operator || operatorEl.textContent.trim();
    }

    let subquest_uuid = uuidEl?.value || null;
    let condition_value = valueEl?.textContent.trim() || null;

    if (condition_type === "Date" && condition_value) {
      condition_value = convertHumanDateToUTCHuman(condition_value);
    }

    conditions.push({
      condition_type,
      operator,
      condition_value,
      subquest_uuid
    });
  });

  return conditions;
}


function collectRewards() {

  const rewardWrappers = document.querySelectorAll(".rewardContainerWrapper");
  const rewards = [];

  rewardWrappers.forEach(wrapper => {
    if (!document.body.contains(wrapper)) return; // skip deleted rewards

    const display = wrapper.querySelector(".reward-display span");
    let reward_type = wrapper.dataset.rewardType || "custom";
    let distribution_type = "ALL";
    let subcontent_data = {};

    const state = REWARD_STATE.get(wrapper);

    if (state) {
      if (state.type === "All") {
        distribution_type = "ALL";
      }

      if (state.type === "FCFS") {
        distribution_type = "FCFS";
        subcontent_data.max_supply = parseInt(state.maxSupply || "0", 10);
      }

      if (state.type === "Raffle") {
        distribution_type = "RAFFLE";
        subcontent_data.num_rewards = parseInt(state.rewardCount || "0", 10);
      }

      if (state.type === "Vote") {
        distribution_type = "VOTE";
        subcontent_data.num_rewards = parseInt(state.rewardCount || "0", 10);
      }
    }


    let reward_data = {};

    // XP reward → save the numeric amount
    const xpSpan = wrapper.querySelector(".identifyerxp");
    if (reward_type === "xp" && xpSpan) {
      reward_data.amount = parseInt(xpSpan.textContent.trim() || "0", 10);
    } else if (reward_type === "xp") {
      return; // skip empty XP
    }

    // Role reward → save role name/id
    const roleSpan = wrapper.querySelector(".identifyerrole");
    if (reward_type === "role" && roleSpan) {
      reward_data.role = roleSpan.textContent.trim();
    }

    if (reward_type === "token") {
      const hiddenNetwork = wrapper.querySelector(".hidden-network");
      const hiddenToken   = wrapper.querySelector(".hidden-token");
      const hiddenAmount  = wrapper.querySelector(".hidden-amount");
      const tokenIconElem = wrapper.querySelector(".token-icon");  // ← get it here

      reward_data = {
        network: hiddenNetwork ? hiddenNetwork.value : "",
        contract: hiddenToken ? hiddenToken.value : "",
        amount_per_winner: hiddenAmount ? hiddenAmount.value : "",
        icon: tokenIconElem ? tokenIconElem.src : "",   // ← use this
        symbol: hiddenToken ? hiddenToken.value : ""
      };
    }


    // Custom reward → save text from badge or textarea
    if (reward_type === "custom") {
      const customSpan = wrapper.querySelector(".customtextspan");
      const customTextarea = wrapper.querySelector("textarea.customtext");
      reward_data.text = (customTextarea?.value.trim() || customSpan?.textContent.trim() || "Custom");
    }


    // ✅ Add subcontent info to reward_data
    if (Object.keys(subcontent_data).length) {
      reward_data.subcontent = subcontent_data;
    }

    rewards.push({
      reward_type,
      distribution_type,
      reward_data
    });
  });


  return rewards;
}



function collectTasks() {

  const wrappers = document.querySelectorAll('.container-all-contain-yinit');
  const tasks = [];

  wrappers.forEach(wrapper => {

    const type = wrapper.dataset.platform || wrapper.dataset.type;
    const taskId = wrapper.dataset.taskId;

    if (!type) return;

    const config = {};

    /* ============================
       INPUT TYPES
       url | text | numbers
       ============================ */
    if (["url","text","numbers"].includes(type)) {

      config.title = wrapper.querySelector('.js-title-input')?.value || "";
      config.description = wrapper.querySelector('.js-desc-input')?.value || "";
      config.placeholder = wrapper.querySelector('.input-wrapper-quest input')?.placeholder || "";
      config.auto_validate = wrapper.querySelector('.js-auto-validate')?.checked || false;
    }

    /* ============================
       PUZZLE
       ============================ */
    else if (type === "puzzle") {

      config.title = wrapper.querySelector('.js-title-input')?.value || "";
      config.description = wrapper.querySelector('.js-desc-input')?.value || "";
      config.answer = wrapper.querySelector('.js-puzzle-answer')?.value || "";
      config.placeholder = wrapper.querySelector('.js-puzzle-placeholder')?.value || "";
      config.auto_validate = wrapper.querySelector('.js-auto-validate')?.checked ?? true;
    }
    else if (type === "github") {

      config.link = wrapper.querySelector(".github-input")?.value || "";

      config.repo_name =
        wrapper.querySelector(".github-preview-name")?.textContent?.trim() || "";

      config.repo_owner =
        wrapper.querySelector(".github-preview-owner")
          ?.textContent
          ?.replace("@", "")
          .trim() || "";

      config.owner_avatar =
        wrapper.querySelector(".github-preview-avatar")?.src || "";

      config.star =
        wrapper.querySelector(".js-github-star")?.checked || false;

      config.fork =
        wrapper.querySelector(".js-github-fork")?.checked || false;
    }
    /* ============================
       QUIZ
       ============================ */
      else if (type === "quiz") {

        config.title = wrapper.querySelector('.js-title-input')?.value || "";
        config.description = wrapper.querySelector('.js-desc-input')?.value || "";

        // options
        const options = [];
        wrapper.querySelectorAll('.optns').forEach(i => options.push(i.value || ""));
        config.options = options;

        // correct answers
        const correct = [];
        wrapper.querySelectorAll('.correct-answer').forEach((el, i)=>{
          if(el.checked) correct.push(i);
        });

        // ✅ OLD FORMAT
        config.correct = correct;

        // ✅ SOURCE OF TRUTH
        const isMulti = wrapper.dataset.multi === "true";

        config.allowMultipleSelection = isMulti;
        config.multiple = correct.length > 1 || isMulti;
      }



    /* ============================
       POLL
       ============================ */
        else if (type === "poll") {

          config.title = wrapper.querySelector('.js-title-input')?.value || "";
          config.description = wrapper.querySelector('.js-desc-input')?.value || "";

          /* =========================
            OPTIONS (EXCLUDE "OTHER")
          ========================= */
          const options = [];
          wrapper.querySelectorAll('.options-container .optn').forEach(input=>{
            // skip disabled "Other option"
            if(input.disabled) return;

            const val = input.value?.trim();
            if(val) options.push(val);
          });

          config.options = options;

          /* =========================
            TOGGLES
          ========================= */
          config.multiple =
            wrapper.querySelector('.js-multi-toggle')?.checked === true;

          config.other =
            wrapper.querySelector('.js-other-toggle')?.checked === true;

          /* =========================
            🚫 DO NOT SAVE THIS FOR POLL
          ========================= */
          delete config.auto_validate;
        }


    /* ============================
       SOCIALS
       telegram | discord | youtube
       ============================ */
    else if (["telegram","discord","youtube"].includes(type)) {

      config.link = wrapper.querySelector('.social-input')?.value || "";

      config.name =
        wrapper.querySelector('.community_name')?.innerText?.trim() ||
        wrapper.querySelector('.js-preview-title')?.innerText?.trim() ||
        "";

      config.icon =
        wrapper.querySelector('img')?.src || "";
    }

    /* ============================
       PARTNERSHIP
       ============================ */
        else if (type === "partnership") {

          config.community_name = wrapper.querySelector('.community_name')?.innerText.trim() || "";
          config.about = wrapper.querySelector('.description-parnership')?.innerText.trim() || "";
          config.link = wrapper.querySelector('.cta-quest')?.href || "";
          config.icon = wrapper.querySelector('img')?.src || "";

          // 🔥 FIX
          config.community_id = wrapper.dataset.community_id || "";
        }
        else if (type === "partnership_quest") {

          config.community_name = wrapper.querySelector('.community_name')?.innerText.trim() || "";
          config.subquest_name = wrapper.querySelector('.description-parnership')?.innerText.trim() || "";
          config.link = wrapper.querySelector('.cta-quest')?.href || "";
          config.icon = wrapper.querySelector('img')?.src || "";

          // 🔥 FIX
          config.community_id = wrapper.dataset.community_id || "";
        }

    /* ============================
       FILE UPLOAD
       ============================ */
      else if (type === "file-upload") {

        config.fileCount = parseInt(
          wrapper.querySelector('.js-file-count')?.value || "1"
        );

        const types = [];

        wrapper.querySelectorAll('.file-category-box .selected').forEach(el => {
          const checkbox = el.querySelector(".js-file-type");
          if (checkbox?.value) {
            types.push(checkbox.value.toLowerCase());
          }
        });

        config.fileTypes = types;
      }

    /* ============================
       INVITE
       ============================ */
    else if (type === "invite") {

      const num = wrapper.querySelector('.js-invite-count')?.value || "";
      const uuid = wrapper.querySelector('.selected-subquest-uuid')?.value || "";
      const name = wrapper.querySelector('.selected-subquest-name')?.value || "";

      if(num) config.numInvites = parseInt(num);
      if(uuid) config.subquest_uuid = uuid;
      if(name) config.subquest_name = name;
    }

    /* ============================
       VISIT LINK
       ============================ */
    else if (type === "visit-link") {

      config.link = wrapper.querySelector('.js-link-input')?.value || "";

      config.preview = {
        title: wrapper.querySelector('.js-link-preview-title')?.innerText || "",
        description: wrapper.querySelector('.js-link-preview-desc')?.innerText || "",
        image: wrapper.querySelector('.js-link-preview-img')?.src || ""
      };
    }

    /* ============================
       OPTION SCALE (NUMBERS)
       ============================ */
        else if (type === "Optionscale(numbers)") {

          const popup = wrapper.querySelector('.rating-popup'); // 👈 scope

          config.title = popup?.querySelector('.js-title-input')?.value || "";
          config.description = popup?.querySelector('.js-desc-input')?.value || "";

          config.scale = {
            from: popup?.querySelector('.js-firstnum')?.value || 1,
            to: popup?.querySelector('.js-lastnum')?.value || 10
          };

          config.labels = {
            left: popup?.querySelector('.js-notlikely')?.value || "",
            right: popup?.querySelector('.js-verylikely')?.value || ""
          };
        }


    /* ============================
       OPTION SCALE (STAR)
       ============================ */
    else if (type === "Optionscale(star)") {

      config.title = wrapper.querySelector('.js-title-input')?.value || "";
      config.description = wrapper.querySelector('.js-desc-input')?.value || "";
      config.starCount = parseInt(wrapper.querySelector('.startcount')?.value || "5");
    }

    /* ============================
       PUSH TASK
       ============================ */
    tasks.push({
      id: taskId,
      type,
      config
    });

  });

  return tasks;
}


const svgMap = { 
  xp: `

      <svg viewBox="0 0 24 24" width="16" height="16"  style="margin-right: 5px;"  xmlns="http://www.w3.org/2000/svg" stroke="#4285f4" fill="#4285f4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
      </svg>
       `,

  role: `<svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px;" width="14" height="14" fill="#5865F2" viewBox="0 0 24 24" style="margin-right: 5px;"> 
            <path d="M20.318 4.36a19.8 19.8 0 0 0-4.885-1.517c-.212.375-.445.866-.609 1.25a18.3 18.3 0 0 0-5.487 0 12 12 0 0 0-.618-1.25A19.9 19.9 0 0 0 3.214 4.36C.534 9.036-.32 13.57.1 18.048a19.9 19.9 0 0 0 5.992 3.03q.695-.945 1.227-1.994a13.5 13.5 0 0 1-1.872-.892q.191-.143.372-.292c3.928 1.794 8.181 1.794 12.062 0q.181.149.372.292a12 12 0 0 1-1.873.891c.36.697.773 1.363 1.226 1.994a19.8 19.8 0 0 0 6.001-3.03c.501-5.176-.839-9.673-3.55-13.658M8.02 15.32c-1.184 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419m7.974 0c-1.183 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.177 1.095 2.157 2.419 0 1.333-.947 2.419-2.157 2.419"/>
         </svg>`,

  custom: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
           fill="none" stroke="var(--text-muted)" stroke-width="2" style="margin-right: 4px;"
           viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
             <path d="M11 4H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7"/>
             <path d="M18.2 2.8a2 2 0 0 1 2.8 2.8L12 14.8l-3.5.9.9-3.5L18.2 2.8z"/>
         </svg>`,

  token: `<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 24 24" width="14" height="14" style="margin-right: 4px;"
     fill="#F7931A">
  <path transform="scale(0.046875)" d="M128 96l0-16c0-44.2 86-80 192-80S512 35.8 512 80l0 16c0 30.6-41.3 57.2-102 70.7-2.4-2.8-4.9-5.5-7.4-8-15.5-15.3-35.5-26.9-56.4-35.5-41.9-17.5-96.5-27.1-154.2-27.1-21.9 0-43.3 1.4-63.8 4.1-.2-1.3-.2-2.7-.2-4.1zM432 353l0-46.2c15.1-3.9 29.3-8.5 42.2-13.9 13.2-5.5 26.1-12.2 37.8-20.3l0 15.4c0 26.8-31.5 50.5-80 65zm0-96l0-33c0-4.5-.4-8.8-1-13 15.5-3.9 30-8.6 43.2-14.2s26.1-12.2 37.8-20.3l0 15.4c0 26.8-31.5 50.5-80 65zM0 240l0-16c0-44.2 86-80 192-80s192 35.8 192 80l0 16c0 44.2-86 80-192 80S0 284.2 0 240zm384 96c0 44.2-86 80-192 80S0 380.2 0 336l0-15.4c11.6 8.1 24.5 14.7 37.8 20.3 41.9 17.5 96.5 27.1 154.2 27.1s112.3-9.7 154.2-27.1c13.2-5.5 26.1-12.2 37.8-20.3l0 15.4zm0 80.6l0 15.4c0 44.2-86 80-192 80S0 476.2 0 432l0-15.4c11.6 8.1 24.5 14.7 37.8 20.3 41.9 17.5 96.5 27.1 154.2 27.1s112.3-9.7 154.2-27.1c13.2-5.5 26.1-12.2 37.8-20.3z"/>
</svg>`
};



async function buildSubquestPayload() {

  const conditions = collectConditions();
  const rewards = collectRewards();
  const tasks = collectTasks();

  const sprintId = selectedSprint?.id || null;
  const sprintName = selectedSprint?.name || null;


  const subquest_name =
    document.getElementById('hintname')?.value.trim() || '';

  const subquest_desc = await serializeDescription();

  const recurrence =
    document.querySelector('.custom-dropdown.recurrence-label .selected span')
      ?.textContent.trim() || 'None';

  const cooldown =
    document.querySelector('.custom-drop .selected span')
      ?.textContent.trim() || 'None';

  const maxClaimInput =
    document.querySelector('.number-input-wrapper input');

  let max_claim = null;
  if (maxClaimInput?.value.trim()) {
    const val = parseInt(maxClaimInput.value, 10);
    if (!isNaN(val)) max_claim = val;
  }
  const streak_enabled =
    document.getElementById("streakToggle")?.checked || false;

  const autovalidation =
    document.querySelector('input[name="autovalidation"]')?.value || "0";
  
  return {
    quest_uuid,
    subquest_uuid,
    sprint_id: sprintId,
    sprint_name: sprintName,
    tasks,
    subquest_name,
    streak_enabled,
    subquest_desc,
    recurrence,
    cooldown,
    max_claim,
    autovalidation,
    conditions,
    rewards,
    communitySlug
  };
}



function mapActionToTaskType(type) {
  switch(type) {
    case "visit_link": return "visit-link";
    case "invite": return "invite";
    case "text": return "text";
    case "numbers": return "numbers";
    case "selector": return "file-upload";
    case "proof_of_humanity": return "p.o.h";
    case "api": return "api";
    case "tiktok": return "tiktok";
    case "twitter": return "twitter";
    case "youtube": return "youtube";    
    case "stars": return "Optionscale(star)";
    case "ratings": return "Optionscale(numbers)";
    case "rankingup": return "discord";
    case "puzzle": return "puzzle";
    case "github": return "github";
    case "nums": return "numbers";
    case "test": return "telegram";
    case "partnership_quest": return "partnership_quest";
    case "partnership_arial": return "partnership";    case "quizpoll": return "poll";
    case "quiz": return "quiz";
    case "textform": return "text";
    case "partnership_quest": return "partnership_quest";
    case "url": return "url";
    default: return type; 
  }
}
 

async function previewSubquest() {
  showPreviewModal(getPreviewSkeleton(), true);

  const payload = await buildSubquestPayload();
  console.log("Payload:", payload);

  try {
    const res = await fetch(`/${payload.communitySlug}/preview_subquest`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify(payload)
    });

    const html = await res.text(); 
    showPreviewModal(html);
    initSubquestTasks();

  } catch (err) {
    console.error(err);
    showToast("Preview failed");
  }
}

async function publishSubquest() {
  const payload = await buildSubquestPayload();
  try {
    const res = await fetch(`/${payload.communitySlug}/publish_subquest`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      const path = `/${payload.communitySlug}/quest/admin`;
      loadMainSettingsSection(path);
    } else {
      showToast(data.error || "Publish failed");
    }
  } catch (err) {
    console.error(err);
    showToast("Publish failed");
  }
}





function LetsInitQuestBuildup() {
  const taskList = document.getElementById('taskList');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');
  const uniqueItems = document.getElementById('uniqueItems');
  const taskItems = document.querySelectorAll('.task-item');


  document.querySelectorAll('.subsettings').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();  
      const url = el.getAttribute('data-href');
      if (url) {
        window.location.href = url;
      }
    });
  });

  document.querySelectorAll(".task-item").forEach(item => {
  item.addEventListener("click", () => {

    const type = item.getAttribute("data-file");
    if (!type) return;

    const container = document.getElementById("uniqueItems");
    if (!container) return;

    // create EMPTY task

    const task = {
      type: mapActionToTaskType(type), 
      config: {}                     
    };


    const html = renderTask(task);
    if (!html) return;

    // inject at bottom
    container.insertAdjacentHTML("beforeend", html);
    document.querySelectorAll(".gh-tooltip-wrap").forEach(el => {
      const tooltipBox = el.querySelector(".gh-tooltip-box");

      if (!tooltipBox) return;

      tooltipBox.textContent = el.dataset.tip || "";
    });
    
    updateCounter?.();
    if (typeof popup !== "undefined") popup.style.display = "none";
  });
  });

  // Popup controls
  taskList.addEventListener('click', () => {
    const count = uniqueItems.children.length;
    if (count < maxTasks) {
      popup.style.display = 'flex';
    }
  });

  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });

  function convertHumanDateToUTCHuman(dateStr) {
  // expects: "04 Feb 02:00 2026"
  if (!dateStr) return null;

  const parsed = parseDisplayDate(dateStr); // your existing parser
  if (!parsed || isNaN(parsed.getTime())) return null;

  // ---- UTC values ----
  let year  = parsed.getUTCFullYear();
  let monthIndex = parsed.getUTCMonth();
  let day   = parsed.getUTCDate();
  let hour  = parsed.getUTCHours();
  let min   = parsed.getUTCMinutes();

  // ---- snap minutes to 00 or 30 ----
  if (min < 15) {
    min = 0;
  } else if (min < 45) {
    min = 30;
  } else {
    min = 0;
    hour += 1; // carry hour
  }

  // ---- handle hour overflow ----
  if (hour >= 24) {
    hour = 0;
    const d = new Date(Date.UTC(year, monthIndex, day));
    d.setUTCDate(d.getUTCDate() + 1);
    year = d.getUTCFullYear();
    monthIndex = d.getUTCMonth();
    day = d.getUTCDate();
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month  = months[monthIndex];

  const dd = String(day).padStart(2, "0");
  const hh = String(hour).padStart(2, "0");
  const mm = String(min).padStart(2, "0");

  // ✅ same human format, UTC time, snapped
  return `${dd} ${month} ${hh}:${mm} ${year}`;
  }
  document.getElementById("addTaskBtn").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    document.getElementById("popup").style.display = "flex";
  });

  document.getElementById("closePopup").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    document.getElementById("popup").style.display = "none"; // ✅ use "closePopup"
  });

  document.getElementById("popup").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    if (e.target.id === "popup") {
      document.getElementById("popup").style.display = "none"; // ✅ consistent
    }
  });

    const toggleBtn = document.getElementById("sidePanelToggle");
    const sidePanel = document.querySelector(".side-panel");
  

    // Open side-panel
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("active-side-q");
    });

  
    // Optional: click outside closes panel
    document.addEventListener("click", (e) => {
      if (
        sidePanel.classList.contains("active") &&
        !sidePanel.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        sidePanel.classList.remove("active-side-q");
      }
    });
  updateCounter();
}


function validateForm() {
  let valid = true;

  /* reset all previous errors */
  document.querySelectorAll(".task-error, .error-quest, .social-error-msg, .puzzle-error").forEach(e=>{
    e.style.display = "none";
    e.innerText = "";
  });

  /* ===============================
     TASK VALIDATION
  =============================== */
  document.querySelectorAll("[data-task-id]").forEach(task => {

    const type = task.dataset.type || task.dataset.platform || task.dataset.taskType;
    const taskId = task.dataset.taskId;

    /* helper */
    const fail = (msg, selector) => {
      valid = false;
      let el = selector ? task.querySelector(selector) : task.querySelector(".task-error");
      if(el){
        el.innerText = msg;
        el.style.display = "block";
      }
    };

    /* =========================
       1. SOCIAL TASKS
    ========================= */
    if(["discord","youtube","telegram","partnership","partnership_quest", "github"].includes(type)){
      const input = task.querySelector(".social-input");
      const popup = task.querySelector(".popup-container");
      const err = popup?.querySelector(".social-error-msg");

      if(!input || !input.value.trim()){
        fail("Link required", ".social-error-msg");
      }

      // backend validation flag
      if(input && input.dataset.valid !== "true"){
        fail("Link not validated", ".social-error-msg");
      }
    }

    /* =========================
       2. URL / TEXT / NUMBERS
    ========================= */
    if(["url","text","numbers"].includes(type)){
      const title = task.querySelector(".title");
      if(!title || !title.innerText.trim()){
        fail("Title required");
      }
    }

    /* =========================
       3. PUZZLE
    ========================= */
    if(type === "puzzle"){
      const placeholder = task.querySelector(".js-puzzle-answer.puzzule");
      if(!placeholder || !placeholder.value.trim()){
        fail("Puzzle placeholder required", ".puzzle-error");
      }
    }

    /* =========================
       4. OPTIONSCALE
    ========================= */
    if(type === "Optionscale(star)"){
      const star = task.querySelector(".startcount");
      if(!star || !star.value || parseInt(star.value) <= 0){
        fail("Star count must be > 0");
      }
    }

    if(type === "Optionscale(numbers)"){
      const first = task.querySelector(".js-firstnum");
      const last = task.querySelector(".js-lastnum");

      if(!first?.value || !last?.value){
        fail("Scale range required");
      }

      if(parseInt(first.value) === 0 || parseInt(last.value) === 0){
        fail("Scale cannot start or end with 0");
      }

      if(parseInt(first.value) >= parseInt(last.value)){
        fail("Invalid scale range");
      }
    }

    /* =========================
       5. QUIZ / POLL
    ========================= */
    if(type === "quiz"){
      const checked = task.querySelectorAll(".correct-answer:checked");
      if(checked.length === 0){
        fail("Select at least 1 correct answer");
      }
    }

    if(type === "poll"){
      // always pass
    }

    /* =========================
       6. FILE UPLOAD
    ========================= */
    if(type === "file-upload"){
      const selected = task.querySelectorAll(".file-type-item.selected");
      if(selected.length === 0){
        fail("Select at least one file type");
      }
    }

    /* =========================
       7. INVITE
    ========================= */
    if(type === "invite"){
      const num = task.querySelector(".js-invite-count");
      const v = parseInt(num?.value);

      if(!v || v <= 0){
        fail("Invite count must be > 0", ".invite-error");
      }

      if(v > 30){
        fail("Invite count cannot exceed 30", ".invite-error");
      }
    }

    /* =========================
       8. P.O.H
    ========================= */
    if(type === "p.o.h"){
      // always pass
    }

    /* =========================
       9. VISIT LINK
    ========================= */
    if(type === "visit-link"){
      const input = task.querySelector(".js-link-input");
      if(!input || !input.value.trim()){
        fail("Link required");
      }

      // must be validated by fetch
      if(input.dataset.valid !== "true"){
        fail("Link not validated");
      }
    }

  });



  /* ---------------------------
     VALIDATE CONDITIONS
  --------------------------- */
  document.querySelectorAll(".condition-block").forEach((block, i) => {
    const typeEl = block.querySelector(".conditionDisplay");
    const type = typeEl?.textContent.trim();

    let val = "";
      const valEl = block.querySelector(".valueText");


    if (["Level", "Followers"].includes(type)) {
      const inputEl = block.querySelector(".level-dropdown input");

      if (inputEl && inputEl.value.trim()) {
        val = inputEl.value.trim();
      } else if (valEl && valEl.textContent.trim()) {
        val = valEl.textContent.trim();
      }

      // ✅ Only allow numbers strictly greater than 0
      if (!val || isNaN(val) || parseInt(val, 10) <= 0) {
        valid = false;
      }
}

    if (type === "Role") {
      val = valEl?.textContent.trim();
      if (!val) {
        valid = false;
      }
    }

    if (type === "Date") {
      
      val = valEl?.textContent.trim();
      if (!val) {
        valid = false;
      } else {
        const d = new Date(val);
        if (isNaN(d.getTime())) {
          valid = false;
        }
      }
    }

    if (type === "Quest") {
      val = valEl?.textContent.trim();
      if (!val) {
        valid = false;
        console.log("  ❌ Invalid Quest (empty)");
      }
    }
  });

  /* ---------------------------
     VALIDATE REWARDS
  --------------------------- */
  document.querySelectorAll(".rewardContainerWrapper").forEach((wrapper, i) => {
    const type = wrapper.dataset.rewardType;

    if (type === "xp") {
      const xp = wrapper.querySelector(".identifyerxp")?.textContent.trim();
      if (!xp || isNaN(xp) || parseInt(xp, 10) <= 0) {
        valid = false;
      }
    }

    if (type === "role") {
      const role = wrapper.querySelector(".identifyerrole")?.textContent.trim();
      if (!role) {
        valid = false;
      }
    }

    if (type === "token" || type === "Token") {
      const amt = wrapper.querySelector(".hidden-amount")?.value.trim();
      const net = wrapper.querySelector(".hidden-network")?.value.trim();
      const tok = wrapper.querySelector(".hidden-token")?.value.trim();

      if (!amt || isNaN(amt) || parseFloat(amt) <= 0 || !net || !tok) {
        valid = false;
      }

      const amountInput = wrapper.querySelector(".amount-input");
      const balFeedback = wrapper.querySelector(".zec-bal-feedback");
      if (amountInput && balFeedback && balFeedback.classList.contains("zec-bal-err")) {
        valid = false;
      }
    }


    if (type === "custom") {
      const text =
        wrapper.querySelector("textarea.customtext")?.value.trim() ||
        wrapper.querySelector(".customtextspan")?.textContent.trim();
      if (!text) {
        valid = false;
      }
    }

      let activeInput = null;

      if (GLOBAL_RENO) {
        activeInput = GLOBAL_RENO.querySelector(
          ".subcontent2.active-content input[type=number], " +
          ".subcontent3.active-content input[type=number], " +
          ".subcontent4.active-content input[type=number]"
        );
      }

    if (activeInput) {
      if (!activeInput.value.trim() || parseInt(activeInput.value, 10) <= 0) {
        valid = false;
      }
    }
  });

  /* ---------------------------
     TOGGLE PUBLISH BUTTON
  --------------------------- */
  const btn = document.getElementById("publishBtn");
  if (btn) {
    if (valid) {
      btn.disabled = false;
      btn.classList.remove("disabled");
    } else {
      btn.disabled = true;
      btn.classList.add("disabled");
    }
  }

  return valid;
}




  const undoStack = [];
  const redoStack = [];
  let savedRange = null;


  
  

  function smartPositionDropdown(triggerEl, dropdownEl) {
    // make visible invisibly to measure
    dropdownEl.style.visibility = "hidden";
    dropdownEl.style.display = "block";

    const rect = triggerEl.getBoundingClientRect();
    const modalRect = dropdownEl.getBoundingClientRect();

    const modalHeight = modalRect.height;
    const modalWidth  = modalRect.width;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // horizontal positioning
    let left = rect.left;
    if (left + modalWidth > window.innerWidth) {
      left = window.innerWidth - modalWidth - 10; // prevent overflow
    }
    if (left < 10) left = 10;

    // vertical logic
    let top;
    let dropDirection = "down";

    if (spaceBelow >= modalHeight) {
      // drop down
      top = rect.bottom + 6;
      dropDirection = "down";
    } 
    else if (spaceAbove >= modalHeight) {
      // drop up
      top = rect.top - modalHeight - 6;
      dropDirection = "up";
    } 
    else {
      // neither fits → choose bigger side + scroll
      if (spaceBelow >= spaceAbove) {
        top = rect.bottom + 6;
        dropdownEl.style.maxHeight = (spaceBelow - 10) + "px";
        dropDirection = "down";
      } else {
        top = 10;
        dropdownEl.style.maxHeight = (spaceAbove - 10) + "px";
        dropDirection = "up";
      }
      dropdownEl.style.overflowY = "auto";
    }

    dropdownEl.style.left = left + "px";
    dropdownEl.style.top  = top + "px";

    // show for real
    dropdownEl.style.visibility = "visible";

    // optional debug class (if you want animations later)
    dropdownEl.dataset.drop = dropDirection;
  }

function updateRewardColumnState() {
    validateForm(); 

  updateConditionColumnState() 
  const rewardParent = document.getElementById("rewardContainerParent");
  const rewardCount = rewardParent
  ? rewardParent.querySelectorAll(".rewardContainerWrapper").length
  : 0;

  const rewardColumn = rewardParent?.closest(".column-setting");
  if (!rewardColumn) return;

  if (rewardCount > 0) {
  rewardColumn.classList.add("items-active");
  } else {
  rewardColumn.classList.remove("items-active");
  }
}





function updateConditionColumnState() {
    validateForm(); 

  const conditionParent = document.getElementById("conditionContainerParent");
  const conditionCount = conditionParent
  ? conditionParent.querySelectorAll(".condition-block").length
  : 0;

  const conditionColumn = conditionParent?.closest(".column-setting");
  if (!conditionColumn) return;

  if (conditionCount > 0) {
  conditionColumn.classList.add("items-active");
  } else {
  conditionColumn.classList.remove("items-active");
}
}
  function UndoingStacksArial() {

    function splitBlockAtCaret(block){
    const sel = window.getSelection();
    if(!sel.rangeCount) return null;

    const range = sel.getRangeAt(0);

    if(!block.contains(range.startContainer)) return null;

    const beforeRange = range.cloneRange();
    beforeRange.selectNodeContents(block);
    beforeRange.setEnd(range.startContainer, range.startOffset);

    const afterRange = range.cloneRange();
    afterRange.selectNodeContents(block);
    afterRange.setStart(range.startContainer, range.startOffset);

    const beforeFrag = beforeRange.cloneContents();
    const afterFrag  = afterRange.cloneContents();

    return { beforeFrag, afterFrag };
  }



    function snapshotEditor(){
      const blocks = [];

      mainArea.querySelectorAll(".text-block, .media-block").forEach(b=>{
        if(b.classList.contains("text-block")){
          blocks.push({
            type: "text",
            html: b.innerHTML
          });
        }

        if(b.classList.contains("media-block")){
          const img = b.querySelector("img");
          const vid = b.querySelector("video");

          blocks.push({
            type: img ? "image" : "video",
            src: img ? img.src : vid.src
          });
        }
      });

      const caret = getCaretData();

      // ❌ prevent duplicate states
      const last = undoStack[undoStack.length - 1];
      if(last){
        if(JSON.stringify(last.blocks) === JSON.stringify(blocks)){
          return;
        }
      }

      undoStack.push({ blocks, caret });

      // clear redo on new action
      redoStack.length = 0;
    }


    function placeCaretAtStart(el) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    }

    function placeCaretAtEnd(el) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    }

    const pickBtn = document.getElementById("pickMedia");
    const fileInput = document.getElementById("fileInput");
    const mainArea = document.querySelector(".main-text-area");
    const firstBlock = document.getElementById("first-text-block");



    mainArea.addEventListener("keydown", e => {

      // only when caret is inside editor
      const target = e.target;
      if (!target.closest(".main-text-area")) return;

      // Ctrl+Z
      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();

        if (undoStack.length > 1) {
          const current = undoStack.pop();
          redoStack.push(current);
          const prev = undoStack[undoStack.length - 1];
          restoreState(prev);
        }
      }

      // Ctrl+Y or Ctrl+Shift+Z
      if (
        (e.ctrlKey && e.key.toLowerCase() === "y") ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();

        if (redoStack.length) {
          const next = redoStack.pop();
          undoStack.push(next);
          restoreState(next);
        }
      }
    });


    function getFirstBlock(){
      return mainArea.querySelector(".text-block");
    }




    function getCaretData(){
      const sel = window.getSelection();
      if(!sel.rangeCount) return null;

      let node = sel.getRangeAt(0).startContainer;
      let block = node;

      while(block && !block.classList?.contains("text-block")){
        block = block.parentNode;
      }

      if(!block) return null;

      const blocks = [...mainArea.querySelectorAll(".text-block")];
      const blockIndex = blocks.indexOf(block);

      // char offset
      const range = sel.getRangeAt(0);
      const pre = document.createRange();
      pre.selectNodeContents(block);
      pre.setEnd(range.startContainer, range.startOffset);

      return {
        blockIndex,
        offset: pre.toString().length
      };
    }



    function restoreState(state){
      if(!state) return;

      // keep picker
      const picker = mainArea.querySelector(".image-picker");

      // wipe editor
      mainArea.innerHTML = "";
      if(picker) mainArea.appendChild(picker);

      let textIndex = 0; // for placeholder logic

      state.blocks.forEach((b)=>{

        /* -------- TEXT -------- */
        if(b.type === "text"){
          const tb = document.createElement("div");
          tb.className = "text-block";
          tb.contentEditable = "true";

          // ✅ RESTORE PLACEHOLDER (NO STORAGE, PURE LOGIC)
          tb.setAttribute(
            "data-placeholder",
            textIndex === 0
              ? "Tell adventurers what they must do to complete this quest.."
              : "Continue typing..."
          );

          tb.innerHTML = b.html || "";

          // ✅ CARET ANCHOR (CRITICAL FOR CHROME)
          if(tb.innerHTML.trim() === ""){
            tb.appendChild(document.createTextNode("\u200B"));
          }

          mainArea.insertBefore(tb, picker || null);
          textIndex++;
        }

        /* -------- IMAGE -------- */
        if(b.type === "image"){
          const mb = document.createElement("div");
          mb.className = "media-block";

          const img = document.createElement("img");
          img.src = b.src;

          mb.appendChild(img);
          mainArea.insertBefore(mb, picker || null);

          // ensure text block after media
          const tb = document.createElement("div");
          tb.className = "text-block";
          tb.contentEditable = "true";
          tb.setAttribute("data-placeholder","Continue typing...");

          // caret anchor
          tb.appendChild(document.createTextNode("\u200B"));

          mainArea.insertBefore(tb, picker || null);
          textIndex++;
        }

        /* -------- VIDEO -------- */
        if(b.type === "video"){
          const mb = document.createElement("div");
          mb.className = "media-block";

          const v = document.createElement("video");
          v.src = b.src;
          v.controls = true;

          mb.appendChild(v);
          mainArea.insertBefore(mb, picker || null);

          const tb = document.createElement("div");
          tb.className = "text-block";
          tb.contentEditable = "true";
          tb.setAttribute("data-placeholder","Continue typing...");

          // caret anchor
          tb.appendChild(document.createTextNode("\u200B"));

          mainArea.insertBefore(tb, picker || null);
          textIndex++;
        }

      });

      restoreCaretFromData(state.caret);
      syncPlaceholders();
    }




    function restoreCaretFromData(c){
      if(!c) return;

      const blocks = [...mainArea.querySelectorAll(".text-block")];
      const block = blocks[c.blockIndex];
      if(!block) return;

      let remaining = c.offset;
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null);

      let node;
      while(node = walker.nextNode()){
        if(remaining <= node.nodeValue.length){
          const range = document.createRange();
          range.setStart(node, remaining);
          range.collapse(true);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          return;
        }
        remaining -= node.nodeValue.length;
      }

      placeCaretAtEnd(block);
    }



    function syncPlaceholders(){
      updateFirstBlockPlaceholder();
      updateContinueTyping();
    }

    /* =========================
      MAIN AREA CLICK FOCUS
    ========================= */

    mainArea.addEventListener("click", (e) => {

    const hitTextBlock = e.target.closest?.(".text-block");
    const hitRemove    =  e.target.closest?.(".media-remove");

    const hitPicker =
      e.target.closest?.(".image-picker");
      if (hitTextBlock || hitPicker || hitRemove) return;


      const textBlocks = [...mainArea.querySelectorAll(".text-block")];
      const mediaBlocks = [...mainArea.querySelectorAll(".media-block")];

      // CASE 1: no images at all → focus first block
      if (mediaBlocks.length === 0) {
        placeCaretAtEnd(getFirstBlock());

        return;
      }

      // CASE 2: images exist → pick closest text-block to click Y
      const clickY = e.clientY;

      let closestBlock = null;
      let closestDist = Infinity;

      textBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const blockCenter = rect.top + rect.height / 2;
        const dist = Math.abs(blockCenter - clickY);

        if (dist < closestDist) {
          closestDist = dist;
          closestBlock = block;
        }
      });

      if (closestBlock) {
        placeCaretAtEnd(closestBlock);
      } else {
        // fallback safety
        placeCaretAtEnd(getFirstBlock());

      }

    });

    let savedCaret = {
      block: null,
      offset: 0
    };




    function buildEditorFromSubquest(desc) {
      if (!Array.isArray(desc) || desc.length === 0) return;

      // wipe existing editor content (except picker svg)
      const picker = mainArea.querySelector(".image-picker");
      mainArea.innerHTML = "";
      if (picker) mainArea.appendChild(picker);

      let lastTextBlock = null;

      desc.forEach((block, i) => {

        /* -------- TEXT -------- */
        if (block.type === "text") {
          const textBlock = document.createElement("div");
          textBlock.className = "text-block";
          textBlock.contentEditable = "true";
          textBlock.setAttribute(
            "data-placeholder",
            i === 0
              ? "Tell adventurers what they must do to complete this quest.."
              : "Continue typing..."
          );

          // backend already sends safe HTML
          textBlock.innerHTML = block.html || "";

          mainArea.insertBefore(textBlock, picker || null);
          lastTextBlock = textBlock;
        }

        /* -------- IMAGE -------- */
        if (block.type === "image") {
          const mediaBlock = document.createElement("div");
          mediaBlock.className = "media-block";

          const img = document.createElement("img");
          img.src = block.src;

          const remove = document.createElement("div");
          remove.className = "media-remove";
          remove.innerHTML = RemoveSvg;

          remove.onclick = () => {
            const prev = mediaBlock.previousElementSibling;
            const next = mediaBlock.nextElementSibling;

            mediaBlock.remove();

            // merge touching text blocks
            if (
              prev && prev.classList.contains("text-block") &&
              next && next.classList.contains("text-block")
            ) {
              prev.innerHTML += "<br>" + next.innerHTML;
              next.remove();
              placeCaretAtEnd(prev);
            }

            syncPlaceholders();
          };

          mediaBlock.append(img, remove);
          mainArea.insertBefore(mediaBlock, picker || null);

          // always ensure text block after media
          const tb = document.createElement("div");
          tb.className = "text-block";
          tb.contentEditable = "true";
          tb.setAttribute("data-placeholder","Continue typing...");
          tb.innerHTML = "";

          mainArea.insertBefore(tb, picker || null);
          lastTextBlock = tb;
        }

        /* -------- VIDEO -------- */
        if (block.type === "video") {
          const mediaBlock = document.createElement("div");
          mediaBlock.className = "media-block";

          const video = document.createElement("video");
          video.src = block.src;
          video.controls = true;

          const remove = document.createElement("div");
          remove.className = "media-remove";
          remove.innerHTML = RemoveSvg;

          remove.onclick = () => {
            const prev = mediaBlock.previousElementSibling;
            const next = mediaBlock.nextElementSibling;

            mediaBlock.remove();

            if (
              prev && prev.classList.contains("text-block") &&
              next && next.classList.contains("text-block")
            ) {
              prev.innerHTML += "<br>" + next.innerHTML;
              next.remove();
              placeCaretAtEnd(prev);
            }

            syncPlaceholders();
          };

          mediaBlock.append(video, remove);
          mainArea.insertBefore(mediaBlock, picker || null);

          const tb = document.createElement("div");
          tb.className = "text-block";
          tb.contentEditable = "true";
          tb.setAttribute("data-placeholder","Continue typing...");
          tb.innerHTML = "";

          mainArea.insertBefore(tb, picker || null);
          lastTextBlock = tb;
        }

      });

      // focus last block
      if (lastTextBlock) {
        placeCaretAtEnd(lastTextBlock);
      }

      syncPlaceholders();
    }




    function splitBlockByOffset(block, offset){
      const text = block.textContent || "";
      return {
        before: text.slice(0, offset),
        after:  text.slice(offset)
      };
    }



    function saveCaretPosition(){
      const sel = window.getSelection();
      if (!sel.rangeCount) return;

      const range = sel.getRangeAt(0);
      let node = range.startContainer;

      // climb to .text-block
      while (node && !node.classList?.contains("text-block")) {
        node = node.parentNode;
      }
      if (!node) return;

      // compute character offset
      const preRange = document.createRange();
      preRange.selectNodeContents(node);
      preRange.setEnd(range.startContainer, range.startOffset);

      savedCaret.block = node;
      savedCaret.offset = preRange.toString().length;
    }

    function openPickerWithCaret(e){
      e.preventDefault();
      saveCaretPosition();
      fileInput.click();
    }
    pickBtn.addEventListener("touchstart", openPickerWithCaret, { passive: true });

    // Android / Desktop
    pickBtn.addEventListener("mousedown", openPickerWithCaret);



    function isEmptyTextBlock(block) {
      if (!block) return true;

      // remove zero-width chars and <br>
      const html = block.innerHTML
        .replace(/<br>/gi, "")
        .replace(/&nbsp;/gi, "")
        .replace(/\u200B/g, "")
        .trim();

      return html === "";
    }


    function updateContinueTyping(){
      const textBlocks = [...mainArea.querySelectorAll(".text-block")]
        .filter(b => b !== firstBlock);

      // remove continue typing from all
      textBlocks.forEach(b => b.classList.add("has-content"));

      // find last text block
      const last = textBlocks[textBlocks.length - 1];
      if (!last) return;

      // only show on last block AND only if empty
      if (isBlockVisuallyEmpty(last)) {
        last.classList.remove("has-content"); // show "Continue typing..."
      } else {
        last.classList.add("has-content");
      }
    }




    function updateFirstBlockPlaceholder(){
      const blocks = [...mainArea.querySelectorAll(".text-block, .media-block")];

      // remove picker svg
      const realContent = blocks.filter(b => !b.classList.contains("image-picker"));

      const isEditorEmpty = realContent.every(el => {
        if (el.classList.contains("text-block")) {
          return isBlockVisuallyEmpty(el);
        }
        if (el.classList.contains("media-block")) {
          return false; // media = content
        }
        return true;
      });

      if (isEditorEmpty) {
        firstBlock.classList.remove("has-content"); // show first placeholder
      } else {
        firstBlock.classList.add("has-content"); // hide first placeholder
      }
    }



    function isBlockVisuallyEmpty(block){
      if (!block) return true;

      const html = block.innerHTML
        .replace(/<br>/gi, "")
        .replace(/&nbsp;/gi, "")
        .replace(/\u200B/g, "")
        .trim();

      return html === "";
    }

  async function loadSubquestDescription() {

    const { quest_uuid, subquest_uuid } = getUuidsFromUrl();

    if (!quest_uuid || !subquest_uuid) return;

    const url = `/${communitySlug}/api/subquest-description/${quest_uuid}/${subquest_uuid}`;

    try {
      const res = await fetch(url);

      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      if (!res.ok) return;

      const data = await res.json();



      // 🔥 DESCRIPTION
      let desc = data.description;

      if (typeof desc === "string") {
        try {
          desc = JSON.parse(desc);
        } catch {
          desc = [{ type: "text", html: desc }];
        }
      }

      window.__SPRINT_DATA__ = data.sprint || {
        id: null,
        name: ""
      };

      // 🔥 REWARDS
      window.existingRewards = (data.rewards || []).map(r => {
        try {
          r.reward_data = JSON.parse(r.reward_data);
        } catch {
          r.reward_data = {};
        }
        return r;

      });

      // 🔥 CONDITIONS
      window.existingConditions = (data.conditions || []).map(c => {
        try {
          c.condition_value = JSON.parse(c.condition_value);
        } catch {
          // leave as-is if not JSON
        }
        return c;
      });
    if (window.existingRewards) {
      window.existingRewards.forEach(r => {
        renderReward(r);
      });
    }

    if (window.existingConditions) {
      window.existingConditions.forEach(cond => {
        renderSavedCondition(cond);
      });
    }
    updateClearAllRewards();

    updateRewardColumnState();

      buildEditorFromSubquest(desc);

      syncPlaceholders();

      
    } catch (err) {
      console.error("Failed to load description", err);
    }
  }


  loadSubquestDescription();
    function updatePlaceholders() {
      document.querySelectorAll(".text-block").forEach(block => {
        const text = block.textContent || "";
        const hasText = text.length > 0; // counts spaces as content

        const hasMediaBefore = block.previousElementSibling && 
                              block.previousElementSibling.classList.contains("media-block");

        if (hasText || hasMediaBefore) {
          block.classList.add("has-content");
        } else {
          block.classList.remove("has-content");
        }
      });
    }





    function getActiveTextBlock() {
      const sel = window.getSelection();
      if (!sel.rangeCount) return firstBlock;

      let node = sel.getRangeAt(0).startContainer;

      while (node && node !== mainArea) {
        if (node.classList && node.classList.contains("text-block")) {
          return node;
        }
        node = node.parentNode;
      }

      return firstBlock;
    }

    function isEmptyTextBlock(block) {
      return !block.textContent || block.textContent.trim() === "";
    }



    const RemoveSvg = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 5L19 19M5 19L19 5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

    `
    /* =========================
      FILE PICK
    ========================= */
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
    
      const url = URL.createObjectURL(file);

      let activeBlock = getActiveTextBlock();

      /* -------------------------
        MEDIA BLOCK
      ------------------------- */
      const mediaBlock = document.createElement("div");
      mediaBlock.className = "media-block";

      let media;
      if (file.type.startsWith("image")) {
        media = document.createElement("img");
        media.src = url;
      } else {
        media = document.createElement("video");
        media.src = url;
        media.controls = true;
      }

      const remove = document.createElement("div");
      remove.className = "media-remove";
      remove.innerHTML = RemoveSvg;


      remove.onclick = () => {
        const prev = mediaBlock.previousElementSibling;
        const next = mediaBlock.nextElementSibling;

        mediaBlock.remove();

        // merge touching text blocks
        if (
          prev && prev.classList.contains("text-block") &&
          next && next.classList.contains("text-block")
        ) {
          prev.innerHTML += "<br>" + next.innerHTML;
          next.remove();
          placeCaretAtEnd(prev);
        }
        syncPlaceholders();


      };

      mediaBlock.append(media, remove);

      /* -------------------------
        NEW TEXT BLOCK
      ------------------------- */
      const newText = document.createElement("div");
      newText.className = "text-block";
      newText.contentEditable = "true";
      newText.setAttribute("data-placeholder","Continue typing...");
      newText.innerHTML = "";

      /* =========================
        SMART INSERT LOGIC
      ========================= */

      // CASE 1: first block is empty → stack image BEFORE it
    /* =========================
      CARET-TRUE INSERT LOGIC
    ========================= */

    if (activeBlock === firstBlock && isEmptyTextBlock(firstBlock)) {
      // first empty block → simple stack
      const prev = firstBlock.previousElementSibling;

      if (prev && prev.classList.contains("media-block")) {
        prev.after(mediaBlock);
      } else {
        mainArea.insertBefore(mediaBlock, firstBlock);
      }

      placeCaretAtStart(firstBlock);

    } 
    else {


      const split = splitBlockAtCaret(activeBlock);

      if(split){

        const { beforeFrag, afterFrag } = split;

        // LEFT block
        activeBlock.innerHTML = "";
        activeBlock.appendChild(beforeFrag);

        // MEDIA
        activeBlock.after(mediaBlock);

        // RIGHT block
        const newText = document.createElement("div");
        newText.className = "text-block";
        newText.contentEditable = "true";
        newText.setAttribute("data-placeholder","Continue typing...");
        newText.appendChild(afterFrag);

        mediaBlock.after(newText);

        placeCaretAtStart(newText);

      } else {
        // fallback
        activeBlock.after(mediaBlock, newText);
        placeCaretAtStart(newText);
      }


    }


      fileInput.value = "";
      syncPlaceholders();



    });





    

    /* =========================
      TOKEN ENGINE (EDITOR MODE)
      - styles only: * _ ~ !
      - NO link styling
      - NO nested link styling
      - NO auto-link
      - links handled in preview only
    ========================= */
    function forcePlainTextPaste(block){

      // PASTE
      block.addEventListener("paste", (e)=>{
        // if not real clipboard data → allow
        if (!e.clipboardData) return;

        // allow internal programmatic inserts
        if (e.isTrusted === false) return;

        e.preventDefault();

        const text = e.clipboardData.getData("text/plain");

        // insert pure text only
        document.execCommand("insertText", false, text);
      });

      // DROP
      block.addEventListener("drop", (e)=>{
        // allow internal/app logic drops
        if (!e.dataTransfer) return;
        if (e.isTrusted === false) return;

        e.preventDefault();

        const text = e.dataTransfer.getData("text/plain");
        document.execCommand("insertText", false, text);
      });

    }



    document.querySelectorAll(".text-block").forEach(block=>{
      forcePlainTextPaste(block);
    });

    document.querySelectorAll(".text-block").forEach(bindEditor);

    function getBlockRoot(node){
      // hard safety
      if(!node) return null;

      // if it's a text node → move to parent
      if(node.nodeType === 3){
        if(!node.parentNode) return null;
        node = node.parentNode;
      }

      // if not element → stop
      if(node.nodeType !== 1) return null;

      // closest only exists on elements
      if(typeof node.closest === "function"){
        return node.closest(".text-block");
      }

      return null;
    }


    function normalizeWrappedLinkSyntax(root){
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let node;

      const rules = [
        { sym:"*", type:"bold" },
        { sym:"_", type:"italic" },
        { sym:"~", type:"underline" },
        { sym:"!", type:"strike" }
      ];

      while(node = walker.nextNode()){
        let text = node.nodeValue;

        for(const r of rules){
          // match: *["name" url]*
          const regex = new RegExp(
            `\\${r.sym}\\["([^"]+)"\\s+([^\\]]+)\\]\\${r.sym}`
          );

          let match;
          while(match = text.match(regex)){
            const full  = match[0];
            const name  = match[1];
            const url   = match[2];

            const start = match.index;
            const end   = start + full.length;

            const before = text.slice(0,start);
            const after  = text.slice(end);

            const parent = node.parentNode;

            if(before){
              parent.insertBefore(document.createTextNode(before), node);
            }

            // build: ["*name*" url]
            const rebuilt = `["${r.sym}${name}${r.sym}" ${url}]`;
            parent.insertBefore(document.createTextNode(rebuilt), node);

            if(after){
              parent.insertBefore(document.createTextNode(after), node);
            }

            parent.removeChild(node);

            // continue scanning
            node = parent.childNodes[parent.childNodes.length - 1];
            text = node.nodeValue || "";
          }
        }
      }
    }

    function saveCaret(root){
      const sel = window.getSelection();
      if(!sel || sel.rangeCount === 0) return null;

      const range = sel.getRangeAt(0);
      let index = 0;

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let node;

      while(node = walker.nextNode()){
        if(node === range.startContainer){
          index += range.startOffset;
          break;
        }else{
          index += node.nodeValue.length;
        }
      }

      return { index };
    }

    function restoreCaret(root, saved){
      if(!saved) return;

      const sel = window.getSelection();
      if(!sel) return;

      let remaining = saved.index;

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let node;

      while(node = walker.nextNode()){
        if(remaining <= node.nodeValue.length){
          const range = document.createRange();
          range.setStart(node, remaining);
          range.collapse(true);

          sel.removeAllRanges();
          sel.addRange(range);
          return;
        }else{
          remaining -= node.nodeValue.length;
        }
      }

      // fallback → end of content
      if(node){
        const range = document.createRange();
        range.setStart(node, node.nodeValue.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }




    function handleInput(e){
      const root = e.currentTarget;

      // 🧠 Save caret BEFORE DOM mutations
      const caret = saveCaret(root);

      normalizeTextNodes(root);

      // 🔥 FIRST: detect wrapped link syntax
      normalizeWrappedLinkSyntax(root);

      // 🔁 THEN normal formatting engine
      autoBuildTokens(root);
      validateTokens(root);

      // 🎯 Restore caret AFTER mutations (Safari fix)
      restoreCaret(root, caret);
    }



    /* =========================
      NORMALIZE TEXT NODES
    ========================= */
    function normalizeTextNodes(root){
      root.normalize(); // browser-native merge text nodes
    }


    function unwrapNode(el){
      if(!el || !el.parentNode) return;

      const text = document.createTextNode(el.textContent || "");
      el.parentNode.insertBefore(text, el);
      el.remove();
    }


    /* =========================
      AUTO BUILD TOKENS
      detects: *text*
      even if typed backwards
    ========================= */
    function autoBuildTokens(root){
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let node;

      const patterns = [
        { sym:"*", type:"bold", symClass:"sym-bold" },
        { sym:"_", type:"italic", symClass:"sym-italic" },
        { sym:"~", type:"underline", symClass:"sym-underline" },
        { sym:"!", type:"strike", symClass:"sym-strike" }
      ];

      while(node = walker.nextNode()){
        let text = node.nodeValue;

        for(const p of patterns){
          const regex = new RegExp(`\\${p.sym}([^\\${p.sym}]+)\\${p.sym}`);
          let match;

          while(match = text.match(regex)){
            const start = match.index;
            const end   = start + match[0].length;

            const before = text.slice(0,start);
            const content = match[1];
            const after = text.slice(end);

            const parent = node.parentNode;

            if(before){
              parent.insertBefore(document.createTextNode(before), node);
            }

            // sym left
            const left = document.createElement("span");
            left.className = p.symClass;
            left.textContent = p.sym;

            // fmt wrapper (NESTABLE)
            const mid = document.createElement("span");
            mid.className = "fmt-" + p.type;

            // 👇 allow nested content
            mid.appendChild(document.createTextNode(content));

            // sym right
            const right = document.createElement("span");
            right.className = p.symClass;
            right.textContent = p.sym;

            parent.insertBefore(left, node);
            parent.insertBefore(mid, node);
            parent.insertBefore(right, node);

            const afterNode = document.createTextNode(after);
            parent.insertBefore(afterNode, node);
            parent.removeChild(node);

            node = afterNode;
            text = after;
          }
        }
      }
    }




    /* =========================
      VALIDATE STRUCTURE
    ========================= */
    function validateTokens(root){
      if(!root) return;

      /* =========================
        🔒 HARD SYMBOL GUARD
        Prevent sym-* spans from
        swallowing typed chars
      ========================= */

      root.querySelectorAll(
        ".sym-bold, .sym-italic, .sym-underline, .sym-strike"
      ).forEach(sym=>{
        const txt = sym.textContent || "";

        // if symbol span contains more than 1 char → split
        if(txt.length > 1){
          const symbolChar = txt[0];       // ! * _ ~
          const extraText  = txt.slice(1); // user-typed chars

          // keep only symbol
          sym.textContent = symbolChar;

          // push extra text OUTSIDE the sym span
          const textNode = document.createTextNode(extraText);

          if(sym.nextSibling){
            sym.parentNode.insertBefore(textNode, sym.nextSibling);
          }else{
            sym.parentNode.appendChild(textNode);
          }
        }
      });

      /* =========================
        ORIGINAL LOGIC CONTINUES
      ========================= */

      const map = {
        "fmt-bold":"sym-bold",
        "fmt-italic":"sym-italic",
        "fmt-underline":"sym-underline",
        "fmt-strike":"sym-strike"
      };

      const isSym = (n, cls) => n && n.nodeType===1 && n.classList.contains(cls);

      const skipEmpty = n=>{
        while(n && n.nodeType===3 && n.textContent.trim()==="") n = n.nextSibling;
        return n;
      };

      root.querySelectorAll(".fmt-bold,.fmt-italic,.fmt-underline,.fmt-strike")
      .forEach(fmt=>{
        const parent = fmt.parentNode;
        if(!parent) return;

        const typeClass = [...fmt.classList].find(c=>c.startsWith("fmt-"));
        const symClass  = map[typeClass];

        let prev = skipEmpty(fmt.previousSibling);
        let next = skipEmpty(fmt.nextSibling);

        const leftOk  = isSym(prev, symClass);
        const rightOk = isSym(next, symClass);

        if(!(leftOk && rightOk)){

    if(prev && prev.nodeType===1 && prev.classList.contains(symClass)){
      unwrapNode(prev);
    }

    if(next && next.nodeType===1 && next.classList.contains(symClass)){
      unwrapNode(next);
    }


          while(fmt.firstChild){
            parent.insertBefore(fmt.firstChild, fmt);
          }
          fmt.remove();
        }
      });
    }





    function cleanupBrokenSyntax(root){
      if(!root) return;

      // 1) remove empty sym spans
      root.querySelectorAll(
        ".sym-bold, .sym-italic, .sym-underline, .sym-strike"
      ).forEach(sym=>{
        if(!sym.textContent || sym.textContent.trim() === ""){
          sym.remove();
        }
      });

      // 2) validate fmt spans
      const fmts = root.querySelectorAll(
        ".fmt-bold, .fmt-italic, .fmt-underline, .fmt-strike"
      );

      const map = {
        bold: "sym-bold",
        italic: "sym-italic",
        underline: "sym-underline",
        strike: "sym-strike"
      };

      fmts.forEach(fmt=>{
        const parent = fmt.parentNode;
        if(!parent) return;

        const type = [...fmt.classList].find(c=>c.startsWith("fmt-")).replace("fmt-","");
        const symClass = map[type];

        // get real neighbors (skip empty text nodes)
        const getPrev = (n)=>{
          n = n.previousSibling;
          while(n && n.nodeType === 3 && n.textContent.trim()==="") n = n.previousSibling;
          return n;
        };

        const getNext = (n)=>{
          n = n.nextSibling;
          while(n && n.nodeType === 3 && n.textContent.trim()==="") n = n.nextSibling;
          return n;
        };

        const prev = getPrev(fmt);
        const next = getNext(fmt);

        const leftOk  = prev && prev.nodeType === 1 && prev.classList.contains(symClass);
        const rightOk = next && next.nodeType === 1 && next.classList.contains(symClass);

        // ❌ broken structure → unwrap immediately
        if(!(leftOk && rightOk)){
    if(leftOk) unwrapNode(prev);
    if(rightOk) unwrapNode(next);

          // replace fmt with text
          parent.insertBefore(document.createTextNode(fmt.textContent), fmt);
          fmt.remove();
        }
      });
    }




    /* =========================
      BINDING
    ========================= */

    function bindEditor(block) {
      block.addEventListener("input", () => {
        handleInput({ currentTarget: block });
      syncPlaceholders();
      snapshotEditor(); 

      });
    }


    const observer = new MutationObserver(muts => {
      muts.forEach(m => {
        m.addedNodes.forEach(n => {
          if (n.classList && n.classList.contains("text-block")) {
            forcePlainTextPaste(n);
            bindEditor(n);
            bindToolbar(n);

          }
        });
      });
    });

    observer.observe(document.querySelector(".main-text-area"), {
      childList: true,
      subtree: true
    });


    const ShrtCutHighlightSVGs = {
      bold: `
        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 380 511.38"><path fill-rule="nonzero" d="M0 511.38V0h179.09C241.18 0 288.3 11.87 320.3 35.72c32.13 23.73 48.19 58.62 48.19 104.53 0 25.05-6.47 47.23-19.42 66.29-12.83 19.06-30.69 33.09-53.7 41.95 26.25 6.6 46.87 19.79 61.97 39.69 15.11 19.89 22.66 44.22 22.66 73 0 49.14-15.7 86.3-46.99 111.6-31.41 25.29-76.12 38.12-134.14 38.6H0zm105.37-222.25v137.38h90.26c24.82 0 44.24-5.88 58.14-17.63 13.91-11.74 20.86-28.05 20.86-48.78 0-46.63-24.22-70.25-72.64-70.97h-96.62zm0-74.8h78.04c53.1-.95 79.71-22.05 79.71-63.53 0-23.13-6.71-39.8-20.26-49.99-13.42-10.18-34.64-15.22-63.77-15.22h-73.72v128.74z"/></svg>
      `,
      italic: `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.0234 3H18C18.5523 3 19 3.4477 19 4C19 4.5523 18.5523 5 18 5H15.693L10.443 19H12C12.5523 19 13 19.4477 13 20C13 20.5523 12.5523 21 12 21H9.02307L6 21C5.44772 21 5 20.5523 5 20C5 19.4477 5.44772 19 6 19H8.30703L13.557 5H12C11.4477 5 11 4.5523 11 4C11 3.4477 11.4477 3 12 3H15.0234Z"
            fill="currentColor"
          />
        </svg>

      `,
      stikethrough: `
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M220,128a4.0002,4.0002,0,0,1-4,4H161.15967C176.61108,139.23535,188,149.80054,188,168c0,24.26172-26.916,44-60,44s-60-19.73828-60-44a4,4,0,0,1,8,0c0,19.85059,23.32715,36,52,36s52-16.14941,52-36c0-19.543-16.125-28.30469-42.17725-36H40a4,4,0,0,1,0-8H216A4.0002,4.0002,0,0,1,220,128ZM76.3335,100.00391a4.00247,4.00247,0,0,0,3.80127-5.24805A21.64374,21.64374,0,0,1,79.11133,88c0-20.52344,21.01758-36,48.88867-36,21.34277,0,38.94287,8.917,45.93262,23.271a3.99981,3.99981,0,0,0,7.19238-3.502C172.78467,54.64062,152.42822,44,128,44,95.56836,44,71.11133,62.916,71.11133,88a29.63244,29.63244,0,0,0,1.42187,9.25A4.002,4.002,0,0,0,76.3335,100.00391Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="4.608"
          />
        </svg>


      `,

      link: `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><title>hyperlink</title><path d="M60.54,34.07A7.65,7.65,0,0,1,49.72,23.25l13-12.95a35.38,35.38,0,0,1,49.91,0l.07.08a35.37,35.37,0,0,1-.07,49.83l-13,12.95A7.65,7.65,0,0,1,88.81,62.34l13-13a20.08,20.08,0,0,0,0-28.23l-.11-.11a20.08,20.08,0,0,0-28.2.07l-12.95,13Zm14,3.16A7.65,7.65,0,0,1,85.31,48.05L48.05,85.31A7.65,7.65,0,0,1,37.23,74.5L74.5,37.23ZM62.1,89.05A7.65,7.65,0,0,1,72.91,99.87l-12.7,12.71a35.37,35.37,0,0,1-49.76.14l-.28-.27a35.38,35.38,0,0,1,.13-49.78L23,50A7.65,7.65,0,1,1,33.83,60.78L21.12,73.49a20.09,20.09,0,0,0,0,28.25l0,0a20.07,20.07,0,0,0,28.27,0L62.1,89.05Z"/></svg>

      `,

      underline: `
        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.17 7.11409H9.52791V14.1677C9.52791 15.8123 10.6067 17.0042 12.4927 17.0042C14.3787 17.0042 15.4574 15.8123 15.4574 14.1677V7.11409H16.8154V14.2582C16.8154 16.5817 15.1934 18.2565 12.4927 18.2565C9.79195 18.2565 8.17 16.5817 8.17 14.2582V7.11409ZM7 21.1H18V19.9H7V21.1Z"
            fill="currentColor"
          />
        </svg>

      `,
      }




  function looksLikeURL(text){
    text = text.trim().toLowerCase();

    // real URL patterns
    const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

    return urlRegex.test(text);
  }

  const toolbar = document.getElementById("highlight-toolbar");

  
  document.querySelector('[data-action="bold"]').innerHTML = ShrtCutHighlightSVGs.bold;
  document.querySelector('[data-action="italic"]').innerHTML = ShrtCutHighlightSVGs.italic;
  document.querySelector('[data-action="underline"]').innerHTML = ShrtCutHighlightSVGs.underline;
  document.querySelector('[data-action="strike"]').innerHTML = ShrtCutHighlightSVGs.stikethrough;
  document.querySelector('[data-action="link"]').innerHTML = ShrtCutHighlightSVGs.link;
  function bindToolbar(block){
    block.addEventListener("mouseup", showToolbar);
    block.addEventListener("keyup", showToolbar);
  }

  document.addEventListener("scroll", () => toolbar.style.display = "none");

  function selectionIsOnlySyntax(range){
    const frag = range.cloneContents();

    // No real text?
    const text = frag.textContent.replace(/\s/g,"");
    if(!text) return true;

    // Walk nodes
    const walker = document.createTreeWalker(
      frag,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node = walker.nextNode();
    let hasRealContent = false;

    while(node){
      // text node with real characters (not just symbols)
      if(node.nodeType === 3){
        if(node.textContent.replace(/[\s*_~!]/g,"").length > 0){
          hasRealContent = true;
          break;
        }
      }

      // element nodes
      if(node.nodeType === 1){
        // if it's NOT a sym node, it's real content
        if(!node.className.startsWith("sym-")){
          hasRealContent = true;
          break;
        }
      }

      node = walker.nextNode();
    }

    return !hasRealContent; // true = only syntax
  }

  let savedLinkRange = null;


  function insertSyntaxLink(name){
    if(!savedLinkRange) return;

    const range = savedLinkRange;

    const selectedURL = range.toString().trim();

    if(!looksLikeURL(selectedURL)){
      alert("Selected text must be a valid URL");
      return;
    }

    const syntax = `["${name}" ${selectedURL}]`;

    range.deleteContents();
    range.insertNode(document.createTextNode(syntax));

    savedLinkRange = null;
    hideToolbar();
  }



  function selectionInsideSingleAtomicBlock(range){
    const start = range.startContainer;
    const end   = range.endContainer;

    function findAtomic(node){
      while(node && node.nodeType === 1){
        if(
          node.classList.contains("fmt-bold") ||
          node.classList.contains("fmt-italic") ||
          node.classList.contains("fmt-underline") ||
          node.classList.contains("fmt-strike") ||
          node.classList.contains("sym-bold") ||
          node.classList.contains("sym-italic") ||
          node.classList.contains("sym-underline") ||
          node.classList.contains("sym-strike")
        ){
          return node;
        }
        node = node.parentNode;
      }
      return null;
    }

    const a1 = findAtomic(start.nodeType === 1 ? start : start.parentNode);
    const a2 = findAtomic(end.nodeType === 1 ? end : end.parentNode);

    // both inside same atomic block
    if(a1 && a2 && a1 === a2){
      return true;
    }

    return false;
  }


  function showToolbar(){
    const sel = window.getSelection();
    if(!sel.rangeCount) return hideToolbar();
    if(sel.isCollapsed) return hideToolbar();

    const range = sel.getRangeAt(0);

    // 🚫 block syntax-only selections
    if(selectionIsOnlySyntax(range)) return hideToolbar();

    // 🚫 block atomic fmt/sym selections
    if(selectionInsideSingleAtomicBlock(range)) return hideToolbar();

    const rect = range.getBoundingClientRect();

    toolbar.style.display = "flex";
    toolbar.style.top  = window.scrollY + rect.top - 55 + "px";
    toolbar.style.left = window.scrollX + rect.left + (rect.width/2) - (toolbar.offsetWidth/2) + "px";

    updateToolbarState(range);
  }


  function hideToolbar(){
    toolbar.style.display = "none";
  }

  /* =========================
    SMART FORMAT DETECTION
  ========================= */

  function hasAnyParentClass(node, classList){
    while(node){
      if(node.nodeType === 1){
        for(const cls of classList){
          if(node.classList.contains(cls)) return true;
        }
      }
      node = node.parentNode;
    }
    return false;
  }

  function hasLink(node){
    while(node){
      if(node.nodeType === 1 && node.tagName === "A") return true;
      node = node.parentNode;
    }
    return false;
  }

  /* =========================
    SMART BUTTON + DIVIDER CONTROL
  ========================= */

  function setBtnVisibility(action, show){
    const btn = document.querySelector(`[data-action="${action}"]`);
    if(!btn) return;

    const divider = btn.nextElementSibling; // divider after button

    btn.style.display = show ? "flex" : "none";

    if(divider && divider.classList.contains("tb-divider")){
      divider.style.display = show ? "block" : "none";
    }
  }


  function rangeHasClass(range, classList){
    const fragment = range.cloneContents();
    const walker = document.createTreeWalker(
      fragment,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    let node = walker.nextNode();
    while(node){
      for(const cls of classList){
        if(node.classList.contains(cls)) return true;
      }
      node = walker.nextNode();
    }
    return false;
  }



  function looksLikeURLInput(text){
    if(!text) return false;

    const value = text.trim();

    return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/\S*)?$/i.test(value);
  }




  function updateToolbarState(range){

    const isBold = rangeHasClass(range, ["fmt-bold","sym-bold"]);
    const isItalic = rangeHasClass(range, ["fmt-italic","sym-italic"]);
    const isUnderline = rangeHasClass(range, ["fmt-underline","sym-underline"]);
    const isStrike = rangeHasClass(range, ["fmt-strike","sym-strike"]);

    const frag = range.cloneContents();
    const hasLinkInside = !!frag.querySelector("a");

    const selectedText = range.toString().trim();
    const isURL = looksLikeURLInput(selectedText);


    setBtnVisibility("bold", !isBold);
    setBtnVisibility("italic", !isItalic);
    setBtnVisibility("underline", !isUnderline);
    setBtnVisibility("strike", !isStrike);

    /* link + divider */
    const linkBtn = document.querySelector(`[data-action="link"]`);
    const vDivider = linkBtn?.previousElementSibling;

    if(linkBtn){
      const showLink = isURL && !hasLinkInside;

      linkBtn.style.display = showLink ? "flex" : "none";

      if(vDivider && vDivider.classList.contains("tb-divider")){
        vDivider.style.display = showLink ? "block" : "none";
      }
    }

  }


  /* =========================
    SYNTAX FORMAT ENGINE
  ========================= */

  const SYM_MAP = {
    bold:      { sym: "*",  symClass: "sym-bold",      fmt: "fmt-bold" },
    italic:    { sym: "_",  symClass: "sym-italic",    fmt: "fmt-italic" },
    underline: { sym: "~",  symClass: "sym-underline", fmt: "fmt-underline" },
    strike:    { sym: "!",  symClass: "sym-strike",    fmt: "fmt-strike" }
  };

  function applySyntaxFormat(type){

    const sel = window.getSelection();
    if(!sel.rangeCount) return;

    let range = sel.getRangeAt(0);
    if(range.collapsed) return;

    const cfg = SYM_MAP[type];
    const selectedText = range.toString();

    /* ===============================
      🔒 BLOCK SYNTAX WRAPPING
    =============================== */

    // If selection contains link syntax → format ONLY label
    const linkMatch = selectedText.match(/^\s*\["([^"]+)"\s+([^\]]+)\]\s*$/);

    if(linkMatch){
      const label = linkMatch[1];
      const url   = linkMatch[2];
      range.deleteContents();

      const frag = document.createDocumentFragment();

      // [" 
      frag.appendChild(document.createTextNode('["'));

      // *
      const left = document.createElement("span");
      left.className = cfg.symClass;
      left.textContent = cfg.sym;
      frag.appendChild(left);

      // yes
      const mid = document.createElement("span");
      mid.className = cfg.fmt;
      mid.textContent = label;
      frag.appendChild(mid);

      // *
      const right = document.createElement("span");
      right.className = cfg.symClass;
      right.textContent = cfg.sym;
      frag.appendChild(right);

      // " url]
      frag.appendChild(document.createTextNode(`" ${url}]`));

      // insert once (order preserved)
      range.insertNode(frag);


      sel.removeAllRanges();
      hideToolbar();
      return;
    }

    /* ===============================
      🔒 BLOCK PURE SYNTAX
    =============================== */
    if(
      selectedText.includes('[') ||
      selectedText.includes(']') ||
      selectedText.includes('"') ||
      selectedText.includes('http') ||
      selectedText.includes('://')
    ){
      return;
    }

    /* ===============================
      ✅ NORMAL TEXT FORMATTING
    =============================== */

    const frag = range.extractContents();

    const left = document.createElement("span");
    left.className = cfg.symClass;
    left.textContent = cfg.sym;

    const mid = document.createElement("span");
    mid.className = cfg.fmt;
    mid.appendChild(frag);

    const right = document.createElement("span");
    right.className = cfg.symClass;
    right.textContent = cfg.sym;

    const container = document.createDocumentFragment();
    container.appendChild(left);
    container.appendChild(mid);
    container.appendChild(right);

    range.insertNode(container);

    sel.removeAllRanges();
    hideToolbar();
  }


  /* =========================
    LINK (NO SYNTAX)
  ========================= */

  
  let linkModal = null;

  function openLinkNameModal(url, onSubmit){
    toolbar.style.display = "none"
    if(linkModal){
      linkModal.classList.add("show");
      return;
    }

    linkModal = document.createElement("div");
    linkModal.className = "modal-backdrop";
    linkModal.id = "linkNameModal";

    linkModal.innerHTML = `
      <div class="modal-glass">
        <h3>Insert link</h3>
        <p>
          Enter a display name for 
          <em style="opacity:.8;">(${url})</em>
        </p>

        <input 
          id="linkNameInput"
          type="text"
          placeholder="Link name (e.g. My website)"
          style="
            width:100%;
            padding:10px 12px;
            border-radius:10px;
            border:1px solid var(--border);
            background:rgba(0,0,0,0.25);
            color:var(--text-main);
            outline:none;
            margin-bottom:16px;
          "
        />

        <div class="modal-actions">
          <button id="linkCancelBtn">Cancel</button>
          <button id="linkInsertBtn">Insert</button>
        </div>
      </div>
    `;

    document.body.appendChild(linkModal);

    requestAnimationFrame(()=>{
      linkModal.classList.add("show");
    });

    const input = linkModal.querySelector("#linkNameInput");
    const cancelBtn = linkModal.querySelector("#linkCancelBtn");
    const insertBtn = linkModal.querySelector("#linkInsertBtn");

    input.focus();

    cancelBtn.onclick = ()=>{
      closeLinkModal();
    };

    insertBtn.onclick = ()=>{
      const name = input.value.trim();
      if(!name) return;
      onSubmit(name);
      closeLinkModal();
    };

    // click outside to close
    linkModal.addEventListener("click", e=>{
      if(e.target === linkModal){
        closeLinkModal();
      }
    });
    function closeLinkModal(){
      if(!linkModal) return;
      linkModal.classList.remove("show");
      input.value=""
    }  
  }



  /* =========================
    BUTTON ACTIONS
  ========================= */

  toolbar.addEventListener("click", e=>{
    const btn = e.target.closest(".tb-btn");

    if(!btn) return;

    const action = btn.dataset.action;

    if(action==="bold")      applySyntaxFormat("bold");
    if(action==="italic")    applySyntaxFormat("italic");
    if(action==="underline") applySyntaxFormat("underline");
    if(action==="strike")    applySyntaxFormat("strike");

    if(action==="link"){
      const sel = window.getSelection();
      if(!sel.rangeCount) return;

      const range = sel.getRangeAt(0);

      // save selection BEFORE modal
      savedLinkRange = range.cloneRange();

      const url = range.toString().trim();

      openLinkNameModal(url, (name)=>{
        insertSyntaxLink(name);
      });
    }


  hideToolbar();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-reward");
    if (btn) {
      const reward = btn.closest(".rewardContainerWrapper");
      if (reward) {
        reward.remove();
        updateClearAllRewards();
        updateRewardColumnState();
      }
      return;
    }

    if (!GLOBAL_RENO) return;
    if (GLOBAL_RENO.style.display !== "block") return;
    if (GLOBAL_RENO.contains(e.target)) return;
    if (e.target.closest(".reward-type")) return;

    GLOBAL_RENO.style.display = "none";
    ACTIVE_WRAPPER = null;
  });



  document.addEventListener("input", (e) => {
    if (!GLOBAL_RENO || !ACTIVE_WRAPPER) return;
    if (!GLOBAL_RENO.contains(e.target)) return;

    const state = REWARD_STATE.get(ACTIVE_WRAPPER);
    if (!state) return;

    if (e.target.closest(".subcontent2")) {
      state.maxSupply = e.target.value;
    } else if (e.target.closest(".subcontent3, .subcontent4")) {
      state.rewardCount = e.target.value;
    }
  });
  document.querySelectorAll(".toggle-switch").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const hiddenInput = toggle.nextElementSibling;

      let value = toggle.getAttribute("data-value");
      let newValue = value === "1" ? "0" : "1";

      toggle.setAttribute("data-value", newValue);
      hiddenInput.value = newValue;

      if(newValue === "1"){
        toggle.classList.add("on");
      }else{
        toggle.classList.remove("on");
      }
    });
  });

  let activeCalendarTarget = null;






  const startCalendarEach = document.getElementById("startCalendar");
  const startCalendar = document.getElementById("startCalendar");

  function initCalendarOutsideClick() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      const clickedInsideCalendar =
        startCalendarEach.contains(target);

      const clickedConditionItem =
        target.closest(".condition-item.condition-value");

      if (!clickedInsideCalendar && !clickedConditionItem) {
        closeCalendar(startCalendarEach);
        let activeCalendarTarget = null;

      }
    });
  }



  function TriggerOpionCLickler() {
    initCalendarOutsideClick();

  }


  



  window.addEventListener("calendar:select", (e) => {
    if (!activeCalendarTarget) return;

    const d = e.detail.date;

    const formatted = formatDate(d); // your format
    activeCalendarTarget.onSelect(d, formatted);
  });

  /* format helper */
  function formatDate(d) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const day = String(d.getDate()).padStart(2,"0");
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hour = String(d.getHours()).padStart(2,"0");
    const min = String(d.getMinutes()).padStart(2,"0");
    return `${day} ${month} ${hour}:${min} ${year}`;
  }



  const recurrenceTrigger = document.querySelector(".custom-dropdown.recurrence-label .selected");
  const cooldownTrigger   = document.querySelector(".custom-drop .selected");

  const recurrenceMenu = document.querySelector(".options.recurrence");
  const cooldownMenu   = document.querySelector(".options.cooldown");

  let openMenu = null;

  function openFloatingMenu(triggerEl, menuEl) {
    const rect = triggerEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // toggle
    if (openMenu === menuEl) {
      closeAllMenus();
      return;
    }

    closeAllMenus();

    /* ===============================
      PREPARE FOR MEASURE
    =============================== */
    menuEl.style.display = "flex";
    menuEl.style.flexDirection = "column";
    menuEl.style.position = "fixed";
    menuEl.style.visibility = "hidden";   // no flicker
    menuEl.style.maxHeight = "";
    menuEl.style.overflowY = "";
    menuEl.style.top = "";
    menuEl.style.left = "";

    // force layout
    menuEl.getBoundingClientRect();

    const mRect = menuEl.getBoundingClientRect();
    const menuHeight = mRect.height;
    const menuWidth  = mRect.width;

    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = vw - rect.left;
    const spaceLeft  = rect.left;

    let top, left;

    /* ===============================
      VERTICAL LOGIC
    =============================== */
    if (spaceBelow >= menuHeight + 10) {
      // drop down
      top = rect.bottom + 7;
      menuEl.dataset.direction = "down";
    } 
    else if (spaceAbove >= menuHeight + 10) {
      // drop up
      top = rect.top - menuHeight - 7;
      menuEl.dataset.direction = "up";
    } 
    else {
      // fallback: partial fit + scroll
      if (spaceBelow >= spaceAbove) {
        top = rect.bottom + 7;
        menuEl.style.maxHeight = (spaceBelow - 10) + "px";
        menuEl.dataset.direction = "down";
      } else {
        top = 10;
        menuEl.style.maxHeight = (spaceAbove - 10) + "px";
        menuEl.dataset.direction = "up";
      }
      menuEl.style.overflowY = "auto";
    }

    /* ===============================
      HORIZONTAL LOGIC
    =============================== */
    if (rect.left + menuWidth <= vw - 10) {
      // normal align left
      left = rect.left;
    } 
    else if (rect.right - menuWidth >= 10) {
      // align right to trigger
      left = rect.right - menuWidth;
    } 
    else {
      // clamp to viewport
      left = Math.max(10, vw - menuWidth - 10);
    }

    /* ===============================
      APPLY
    =============================== */
    menuEl.style.top  = top + "px";
    menuEl.style.left = left + "px";
    menuEl.style.visibility = "visible";

    openMenu = menuEl;
  }


  function closeAllMenus() {
    recurrenceMenu.style.display = "none";
    cooldownMenu.style.display = "none";
    openMenu = null;
  }

  recurrenceTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    openFloatingMenu(recurrenceTrigger, recurrenceMenu);
  });

  cooldownTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    openFloatingMenu(cooldownTrigger, cooldownMenu);
  });

const streakRow    = document.getElementById("streakRow");
const streakToggle = document.getElementById("streakToggle");

document.querySelectorAll(".options .option").forEach(opt => {
  opt.addEventListener("click", (e) => {
    e.stopPropagation();
    const value = opt.innerText.trim();

    if (opt.closest(".options.recurrence")) {
      recurrenceTrigger.querySelector("span").innerText = value;

      // streak only for Daily
      if (value === "Daily") {
        streakRow.classList.add("visible");
      } else {
        streakRow.classList.remove("visible");
        streakToggle.checked = false; // reset if they switch away
      }
    }

    if (opt.closest(".options.cooldown")) {
      cooldownTrigger.querySelector("span").innerText = value;
    }

    closeAllMenus();
  });
});

// on page load — if backend already has recurrence = Daily, show the row
if ("{{ subquest.recurrence }}" === "Daily") {
  streakRow.classList.add("visible");
}
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".options") ||
      e.target.closest(".custom-dropdown") ||
      e.target.closest(".custom-drop")
    ) return;

    closeAllMenus();
  });

  window.addEventListener("resize", closeAllMenus);

  Initgrounderarial();

  }



async function Initgrounderarial() {

  const sprintListBtn = document.querySelector(".sprint-list");
  const sprintModal = document.getElementById("sprintModal");
  const closeModal = sprintModal.querySelector(".close-sprint");
  const selectBtn = document.getElementById("selectSprintBtn");

  sprintModal.style.display = "none";
  sprintModal.style.position = "absolute";


  const sprintData = window.__SPRINT_DATA__;

  if (sprintData?.sprintUndertake) {
    selectedSprint = {
      id: sprintData.sprint.id,
      name: sprintData.sprint.name
    };
  }

  if (selectedSprint) {
    sprintListBtn.textContent = `Sprint: ${selectedSprint.name}`;
    if (selectBtn) selectBtn.textContent = "Undo";
  }

  sprintListBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (sprintModal.style.display === "block") {
      sprintModal.style.display = "none";
      return;
    }

    sprintModal.style.maxHeight = "";
    sprintModal.style.overflowY = "";

    smartPositionDropdown(sprintListBtn, sprintModal);
    
  });

  closeModal.addEventListener("click", (e) => {
    e.stopPropagation();
    sprintModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (!sprintModal.contains(e.target) && e.target !== sprintListBtn) {
      sprintModal.style.display = "none";
    }
  });

  if (selectBtn) {
    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!selectedSprint) {
        selectedSprint = {
          id: selectBtn.dataset.sprintId,
          name: selectBtn.dataset.sprintName
        };


        sprintListBtn.textContent = `Sprint: ${selectedSprint.name}`;
        selectBtn.textContent = "Undo";
      } else {
        selectedSprint = null;
        sprintListBtn.innerHTML = `<i class="fas fa-plus"></i> Add to sprint`;
        selectBtn.textContent = "Select";
      }

      smartPositionDropdown(sprintListBtn, sprintModal);
    });
  }

  window.addEventListener("resize", () => {
    if (sprintModal.style.display === "block") {
      smartPositionDropdown(sprintListBtn, sprintModal);
    }
  });


  const template = document.getElementById("roleSelectTemplate");

  // --- Function to fetch roles ---
  async function fetchRoles() {
    try {
      const response = await fetch(`/api/community/${communityId}/roles-and-level`);
      if (!response.ok) throw new Error("Failed to fetch roles");
      return await response.json();
    } catch (err) {
      console.error("Error fetching roles:", err);
      return { discord_connected: false, discord_roles: [] };
    }
  }

  // --- Preload roles once ---
  const data = await fetchRoles();

  // --- Prepare role list HTML ---
  const roleListHTML = (() => {
    if (data.discord_connected && data.discord_roles.length > 0) {
      return data.discord_roles
        .map(role => `<li class="role-item" data-role-id="${role.id}">${role.name}</li>`)
        .join("");
    } else if (data.discord_connected) {
      return `<li class="role-item disabled">No roles found</li>`;
    } else {
      return `<li class="role-item disabled">Discord not connected</li>`;
    }
  })();

  
  const templateContent = template.content.querySelector(".role-list");
  templateContent.innerHTML = roleListHTML;


  document.querySelectorAll(".role-select .role-list").forEach((ul) => {
    ul.innerHTML = roleListHTML;


    ul.querySelectorAll(".role-item").forEach((item) => {
      item.addEventListener("click", () => {
        const rewardDisplay = ul.closest(".rewardContainerWrapper").querySelector(".reward-display");
        if (!rewardDisplay) return;

        const svgIcon = rewardDisplay.querySelector("svg")?.outerHTML || "";
        rewardDisplay.innerHTML = `
          ${svgIcon}
          <span class="identifyerrole">${item.textContent.trim()}</span>
        `;

        // Hide the **whole dropdown container** instead of just the <ul>
        const dropdownContainer = ul.closest(".role-select"); // or the wrapper div you cloned
        if (dropdownContainer) dropdownContainer.style.display = "none";
      });
      });

  });



}




restoreSelectedSprint();
  window.AialModule = {
    init: markBackendValidatedSocialTasks,
    destroy() { controller?.abort(); controller = null; }
  };

})();