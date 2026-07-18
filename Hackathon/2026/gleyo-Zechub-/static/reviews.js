(function () {
const activitySVGs = {
  failed: `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="32"
         height="32"
         class="svg-error"
         fill="none"
         stroke="currentColor"
      
         viewBox="0 0 24 24">
      <path d="M12 22.5A10.5 10.5 0 1 1 12 1.5a10.5 10.5 0 0 1 0 21m0 1.5A12 12 0 1 0 12 0a12 12 0 0 0 0 24"/>
      <g transform="translate(1.8 1.8) scale(0.85)"> 
        <path d="M6.969 6.969a.75.75 0 0 1 1.062 0L12 10.938l3.969-3.969a.75.75 0 0 1 1.062 1.062L13.062 12l3.969 3.969a.75.75 0 0 1-1.062 1.062L12 13.062l-3.969 3.969a.75.75 0 0 1-1.062-1.062L10.938 12 6.969 8.031a.75.75 0 0 1 0-1.062"/>
      </g>
    </svg>
  `,
  success: `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         width="32"
         height="32"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
         class="svg-success"
       >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  `,
  flag: `
        <svg viewBox="0 0 24 24" class="svg-flag" fill="currentColor" stroke="currentColor" width="18" height=18 xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4.5 21V16M4.5 16V6.5C5.5 5.5 7 5 8.5 5C11.5 5 13.5 7.5 17.5 5.5V15.5C13.5 17.5 11.5 14.5 8.5 14.5C7.5 14.5 5.5 15 4.5 16Z" />
        </svg>
  `,
  
  star: `
      <svg viewBox="0 0 24 24" width="16" height="16" class="svg-star"   xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
      </svg>

  `,

  pending: `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 24 24" 
         width="32" 
         class="svg-pending"
         height="32" 
         fill="currentColor" 
         >
      <path d="M12,0c-0.524,0-1.078,0.423-0.924,1.74c0.123,1.052,0.447,2.096,0.924,2.096s0.8-1.044,0.923-2.096C13.078,0.423,12.524,0,12,0z"/>
      <path d="M12,20.718c-0.477,0-0.801,1.043-0.924,2.096C10.923,23.577,11.476,24,12,24s1.078-0.423,0.924-1.186C12.801,21.761,12.477,20.718,12,20.718z"/>
      <path d="M5.975,1.603C5.52,1.86,5.256,2.528,6.065,3.771c0.632,0.809,1.434,1.516,1.847,1.289c0.413-0.228,0.174-1.246-0.244-2.174C7.157,1.427,6.43,1.346,5.975,1.603z"/>
      <path d="M16.438,19.392c-0.413,0.228-0.174,1.246,0.243,2.175c0.524,1.163,1.216,1.248,1.671,0.998s0.724-0.868-0.067-1.884C17.65,19.895,16.851,19.164,16.438,19.392z"/>
      <path d="M3.564,5.958C2.501,5.192,1.83,5.455,1.573,5.91C1.316,6.365,1.404,7.073,2.472,7.55c0.971,0.418,2.034,0.657,2.274,0.244C5.009,7.381,4.246,6.767,3.564,5.958z"/>
      <path d="M21.746,16.654c-0.971-0.418-2.034-0.658-2.272-0.244c-0.239,0.411,0.5,1.211,1.347,1.838c1.063,0.789,1.707,0.519,1.964,0.066C23.042,17.858,22.954,17.15,21.746,16.654z"/>
      <path d="M3.792,12c0-0.477-1.043-0.801-2.096-0.924C0.423,10.923,0,11.476,0,12s0.423,1.078,1.696,0.924C2.749,12.801,3.792,12.477,3.792,12z"/>
      <path d="M22.378,11.098c-1.052,0.124-2.096,0.447-2.096,0.924s1.043,0.8,2.096,0.924C23.693,13.07,24,12.524,24,12S23.693,10.93,22.378,11.098z"/>
      <path d="M2.652,16.654c-1.163,0.524-1.248,1.215-0.998,1.67c0.257,0.456,0.868,0.724,1.931-0.067c0.847-0.627,1.588-1.426,1.347-1.838C4.693,16.002,3.63,16.24,2.652,16.654z"/>
      <path d="M21.746,7.346c1.163-0.524,1.249-1.215,0.998-1.67c-0.257-0.456-0.868-0.724-1.931,0.067c-0.848,0.627-1.588,1.426-1.347,1.837C19.705,7.998,20.769,7.76,21.746,7.346z"/>
      <path d="M6.045,20.456c-0.789,1.056-0.52,1.696-0.066,1.964c0.456,0.257,1.153,0.171,1.68-1.056c0.42-0.977,0.661-2.044,0.245-2.272C7.381,18.991,6.678,19.697,6.045,20.456z"/>
      <path d="M18.121,1.603c-0.456-0.257-1.153-0.171-1.68,1.056c-0.42,0.977-0.659,2.044-0.244,2.272c0.415,0.228,1.223-0.5,1.859-1.289C18.847,2.482,18.576,1.86,18.121,1.603z"/>
    </svg>
  `

};
const REVIEW_CACHE = {}; 
const reviewBadgeEl = () => document.querySelector(".reviews-init");

function updateReviewBadgeDelta(delta) {
  const el = reviewBadgeEl();
  if (!el) return;

  if (delta > 0) {
    BadgeManager.increment(el, delta);
  } else if (delta < 0) {
    BadgeManager.decrement(el, Math.abs(delta));
  }
}


let selectedCompletionIds = [];
let selectModeInit = false;
const toggleBtn = document.getElementById("show-me-up");
const backBtn = document.getElementById("backesstyerr");
const detailsPanel = document.querySelector(".review-details");
const reviewCenter = document.querySelector(".review-panel.review-center");

window.togglePanels = togglePanels
window.toggleHtml= toggleHtml;

function togglePanels(e) {
  e.preventDefault();
  e.stopPropagation();
  
  detailsPanel.style.display = "flex";
  detailsPanel.classList.remove("hidden-review")


  reviewCenter.style.display = "none";
}


function toggleHtml(e) {
const detailsPanel = document.querySelector(".review-panel.review-details");
const reviewCenter = document.querySelector(".review-panel.review-center");

  e.preventDefault();
  e.stopPropagation();
  
  detailsPanel.classList.remove("hidden-review")
  detailsPanel.style.display = "none";

  reviewCenter.style.display = "flex";
}



  function resetReviewUI() {
    const wrapper = document.querySelector(".action-review-wrapper");

    // remove done state
    wrapper.classList.remove("active-review-done");

    // reset buttons
    document.querySelectorAll(".free-xp-star, .flag--user").forEach(btn => {
      btn.classList.remove("active", "active-flag");
    });

    // reset inputs
    const textarea = document.getElementById("review-comment");
    if (textarea) textarea.value = "";

    const xpInput = document.querySelector(".free-xp");
    if (xpInput) xpInput.value = "";

    // hide xp box
    const xpBox = document.querySelector(".review-free-xp");
    if (xpBox) xpBox.style.display = "none";
  }



const megaTrigger = document.querySelector(".mega-review");
const divers = document.querySelector(".First-divers");
const userNamePanel = document.querySelector(".review-name");
const upiLevelSpan = document.querySelector(".upi-level");
const upiXpSpan = document.querySelector(".upi-xp");
const upiBarFill = document.querySelector(".upi-bar-fill");
const rewardRow = document.querySelector(".review-row.for-reward span:last-child");
const avatarCommentDiv = document.querySelector(".review-avatar-comment");

const joinDateRow = document.querySelector(".review-row.joined-date span:last-child");
const recurrenceRow = document.querySelector(".review-row.recoccurence span:last-child");
const cooldownRow = document.querySelector(".review-row.cooldown span:last-child");
 

function updateMegaTriggerState() {

  if (!megaTrigger) return;

  if (selectedCompletionIds.length > 0) {
    megaTrigger.classList.remove("disabled");
  } else {
    megaTrigger.classList.add("disabled");
  }

}


function enableReviewSelection() {

  document.querySelectorAll(".review-item").forEach(item => {

    item.addEventListener("click", () => {

      if (!document.body.classList.contains("select-mode")) return;
      if (item.offsetParent === null) return;

      const id = Number(item.dataset.completionId);

      item.classList.toggle("selected");

      if (item.classList.contains("selected")) {

        if (!selectedCompletionIds.includes(id)) {
          selectedCompletionIds.push(id);
        }

      } else {

        selectedCompletionIds =
          selectedCompletionIds.filter(x => x !== id);

      }

      updateMegaTriggerState();
      updateSelectAllState();

    });

  });

}


function updateSelectAllState() {

  const items = Array.from(document.querySelectorAll(".review-item"))
    .filter(i => i.offsetParent !== null);

  const selected = items.filter(i => i.classList.contains("selected"));

  if (!selectAllBox) return;

  if (selected.length === 0) {
    selectAllBox.classList.remove("checked");
    return;
  }

  if (selected.length === items.length) {
    selectAllBox.classList.add("checked");
  } else {
    selectAllBox.classList.remove("checked");
  }

}

function exitSelectMode() {

  const filters = document.querySelector(".review-filters");
  const mega = document.querySelector(".container-mega-review");

  if (filters && mega) {
    filters.classList.remove("review-hidden");
    mega.classList.remove("show-mega");
    mega.classList.add("review-hidden");
  }

  document.body.classList.remove("select-mode");

  document.querySelectorAll(".review-item")
    .forEach(i => i.classList.remove("selected"));

  selectAllBox?.classList.remove("checked");

  selectedCompletionIds = [];     
  updateMegaTriggerState();       

  selectModeInit = false;
}
const bulkUndoBtn = document.querySelector(".diver-undo");

bulkUndoBtn?.addEventListener("click", () => {
  runBulkAction("pending");
});

const bulkSuccessBtn = document.querySelector(".diver-success");

bulkSuccessBtn?.addEventListener("click", () => {
  runBulkAction("pass");
});

const bulkFailBtn = document.querySelector(".diver-fail");

bulkFailBtn?.addEventListener("click", () => {
  runBulkAction("fail");
});


async function runBulkAction(status) {

  if (!selectModeInit) return;
  if (!selectedCompletionIds.length) return;

  try {

    const res = await fetch(`/api/subquest_review_bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({
        completion_ids: selectedCompletionIds,
        status
      })
    });

    const result = await res.json();

    if (!result.success) {
      showToast(result.error || "Bulk operation failed");
      return;
    }
    let delta = 0;
    result.updated.forEach(r => {


      if (r.review_status === "success" || r.review_status === "failed") {
        delta -= 1;
      } else if (r.review_status === "pending") {
        delta += 1;
      }


      // ✅ 1 — update left list item immediately
      updateReviewItem(r.completion_id, r.review_status);
      syncReviewState(r.completion_id, r.review_status);

      delete REVIEW_CACHE[r.completion_id];

      // ✅ 3 — if currently open panel → update live
      if (CURRENT_USER_DATA?.completionId == r.completion_id) {

        updateReviewPanel(r.review_status);
        CURRENT_USER_DATA.status = r.review_status;

        // activity log
        const reviewKey = `${r.completion_id}-${r.review_id}`;

        const act = {
          timestamp: r.updated_at,
          reviewer: r.reviewer_username || "User",
          status: r.review_status,
          comment: r.comment,
          star: r.star,
          free_xp: r.free_xp,
          flag: r.flag
        };

        if (!ACTIVITY_LOGS[reviewKey]) ACTIVITY_LOGS[reviewKey] = [];
        ACTIVITY_LOGS[reviewKey].push(act);

        const container =
          document.querySelector(".review-task .activity-container");

        if (container) {
          container.insertAdjacentHTML(
            "beforeend",
            buildActivityHTML(act)
          );
        }

      }

    });
    updateReviewBadgeDelta(delta);

    exitSelectMode();

  } catch (err) {

    console.error(err);
    showError("Network error");

  }

}


function syncReviewState(completionId, newStatus) {

  if (!completionId) return;

  const status = (newStatus || "pending").toLowerCase();

  const meta = REVIEW_META.get(completionId);
  if (meta) {
    meta.status = status;
  } else {
    REVIEW_META.set(completionId, {
      status,
      timestamp: Date.now(),
      username: "",
      reviewer: "",
      subquest: ""
    });
  }

  // 2️⃣ update DOM
  updateReviewItem(completionId, status);

  // 3️⃣ re-run filters
  filterAllReviewItems();

}


async function initReviewinit() {
    await loadReviewsFeed();

}
  let openDropdown = null; 
  let starBtn, freeXpBox, freeXpInput, successBtn;
  let flagBtn, failMainBtn;
  let CURRENT_USER_DATA = {};
  window.originalItems = [];
  window.ACTIVITY_LOGS = {};

  const REVIEW_META = new Map(); 
  let savedContentScrollTopMMP = 0;

  async function loadReviewsFeed() {
      const reviewListEl = document.querySelector(".review-list");

      if (!reviewListEl || !communitySlug) return;


      fetch(`/${communitySlug}/reviews-feed`)
          .then(res => res.json())
          .then(data => {
          reviewListEl.innerHTML = "";


              if (!data || data.length === 0) {
                  reviewListEl.innerHTML = `
                      <div style="padding:20px; opacity:0.6;" class="activity-empty">
                          No reviews yet.
                      </div>`;
                  return;
              }

              data.forEach(item => {
                  const completionId = item.completion_id;

                  REVIEW_META.set(completionId, {

                      status: (item.status || "failed").toLowerCase(),

                      timestamp: item.time_filter
                          ? new Date(item.time_filter).getTime()
                          : 0,

                      username: (item.username || "").toLowerCase(),

                      reviewer: (item.reviewer || item.username || "").toLowerCase(),

                      subquest: (item.subquest_name || "").toLowerCase()

                  });
                  const el = document.createElement("div");
                  el.className = "review-item";

                  // ✅ ONLY DATASET
                  el.dataset.completionId = item.completion_id;
                  el.dataset.reviewId = item.review_id;

                  const avatar = item.profile_pic
                      ? `<img src="${item.profile_pic}" alt="avatar">`
                      : `<div class="avatar-fallback">${(item.username || "U")[0].toUpperCase()}</div>`;
                  const statusIcon = statusSVGs[item.status] || statusSVGs["pending"];

                  el.innerHTML = `
                      <div class="review-avatar">
                          <div class="review-checkbox"></div>
                          ${avatar}
                      </div>
                      <div class="all-review-container">
                          <div class="review-meta left-right-left">
                              <div class="review-title">
                                  ${item.username}
                                  <span style="color:var(--txt-dim); font-weight:500; font-size: 12.5px">
                                      claimed
                                  </span>
                              </div>
                              <div class="review-sub">
                                  ${item.subquest_name}
                              </div>
                          </div>
                          <div class="review-ago">
                              ${statusIcon}
                              <span class="time-ago">
                                  ${item.time_ago}
                              </span>
                          </div>
                      </div>
                  `;

                  reviewListEl.appendChild(el);
              });
              window.originalItems = Array.from(
                  document.querySelectorAll(".review-item")
              );
              MobileOnlicker();
              LoadedReviewsinit();
              reviewItemsOnwords();
              ReviewitemOnlick();
              Callspadeinitreview();
              CalledOutsideooo();
              enableReviewSelection();

          })
          .catch(err => {
              reviewListEl.innerHTML = `
                  <div style="padding:20px; color:#e66;">
                      Failed to load reviews.
                  </div>`;
              console.error(err);
          });
  }

  function LoadedReviewsinit() {

      const starBtn = document.querySelector(".free-xp-star");
      const freeXpBox = document.querySelector(".review-free-xp");
      const freeXpInput = document.querySelector(".free-xp");
      const successBtn = document.querySelector("#pass-user");

      const flagBtn = document.querySelector(".flag--user");
      const failMainBtn = document.querySelector("#fail-user");

      if (!starBtn || !freeXpBox || !freeXpInput || !successBtn || !flagBtn || !failMainBtn) return;


      starBtn.addEventListener("click", () => {
          const activating = !starBtn.classList.contains("active");
          if (activating) deactivateFlagMode(flagBtn, failMainBtn);
          if (activating) activateXpMode(starBtn, freeXpBox, freeXpInput, successBtn);
          else deactivateXpMode(starBtn, freeXpBox, successBtn);
      });

      flagBtn.addEventListener("click", () => {
          const activating = !flagBtn.classList.contains("active-flag");
          if (activating) deactivateXpMode(starBtn, freeXpBox, successBtn);
          if (activating) activateFlagMode(flagBtn, failMainBtn);
          else deactivateFlagMode(flagBtn, failMainBtn);
      });

      // Reset on task switch
      deactivateXpMode(starBtn, freeXpBox, successBtn);
      deactivateFlagMode(flagBtn, failMainBtn);


  

      // Prevent bad keyboard input
      freeXpInput.addEventListener("keydown", (e) => {
          // block minus, plus, decimal, scientific notation
          if (["-", "+", "e", "E", "."].includes(e.key)) {
              e.preventDefault();
          }

          // block spaces
          if (e.key === " ") {
              e.preventDefault();
          }

          // allow only digits + necessary keys
          const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

          if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
              e.preventDefault();
          }
      });

      freeXpInput.addEventListener("paste", (e) => {
          const text = (e.clipboardData || window.clipboardData).getData("text");
          if (!/^[0-9]+$/.test(text)) {
              e.preventDefault();
          }
      });

      freeXpInput.addEventListener("input", () => {
          freeXpInput.value = freeXpInput.value.replace(/[^0-9]/g, "");
      });

    function clearPanelSearch(panel) {
      if (!panel) return;

      const input = panel.querySelector('input[type="search"]');
      if (!input) return;

      // Clear input
      input.value = '';

      // Trigger input event so filtering resets
      input.dispatchEvent(new Event('input', { bubbles: true }));

      // Hide any "no result" messages inside panel
      panel.querySelectorAll('[id$="result"], [id$="no-result"]').forEach(el => {
        el.style.display = 'none';
      });
    }

    function closeOpenDropdown() {
      if (openDropdown) {
        clearPanelSearch(openDropdown); 
        openDropdown.style.display = 'none';
        openDropdown = null;
      }
    }

    function closeMainDropdown() {
      if (!mainDropdown) return;

      mainDropdown.style.display = "none";

    }


    /* -------------------------------------------------------
      MAIN REVIEW ITEM DROPDOWN LOGIC
    --------------------------------------------------------*/
    const mainDropdown = document.getElementById('review-item-dropdown');
    const mainPanels = {
      'data-select-status': document.getElementById('filter-by-status'),
      'data-select-reviewer': document.getElementById('filter-by-reviewer'),
      'data-select-quest': document.getElementById('filter-by-quest'),
      'data-select-username': document.getElementById('filter-by-username'),
    };

    const mainTriggers = document.querySelectorAll('#show-review-item-dropdown, #plus-show-review-item-dropdown');
    let lastTrigger = null;
    function positionUnderTrigger(trigger, element) {
      const rect = trigger.getBoundingClientRect();

      element.style.display = "flex";

      element.style.left = `${rect.left + window.scrollX}px`;
      element.style.top = `${rect.bottom + window.scrollY}px`;
    }


    function positionPlusUnderTrigger(trigger, element) {
      const rect = trigger.getBoundingClientRect();

      element.style.display = "flex"; 
      const width = element.offsetWidth;

      element.style.left =
        `${rect.right + window.scrollX - width}px`;

      element.style.top =
        `${rect.bottom + window.scrollY + 5}px`;
    }

    mainTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();

        // ✅ If clicking same trigger while open → CLOSE
        if (openDropdown === mainDropdown) {
          closeMainDropdown();
          openDropdown = null;
          return;
        }

        lastTrigger = trigger;

        // Close any other open dropdown
        if (openDropdown && openDropdown !== mainDropdown) {
          closeOpenDropdown();
        }

        // Open it
        if (trigger.id === "show-review-item-dropdown") {
          positionPlusUnderTrigger(trigger, mainDropdown);
        } else {
          positionUnderTrigger(trigger, mainDropdown);
        }

        openDropdown = mainDropdown;
      });
    });

    document.addEventListener("click", (e) => {


    // Otherwise → close
    closeMainDropdown();
  });


  mainDropdown.addEventListener('click', e => e.stopPropagation());


  mainDropdown.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', () => {

      // highlight selected option
      mainDropdown.querySelectorAll('.dropdown-option')
        .forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      // close main dropdown
      mainDropdown.style.display = 'none';
      openDropdown = null;

      closeOpenDropdown(); // close any other open panel

      // open small panel
      const attr = Array.from(option.attributes).find(a => a.name.startsWith('data-select-'));
      if (attr && mainPanels[attr.name] && lastTrigger) {

        const panel = mainPanels[attr.name];
        const rect = lastTrigger.getBoundingClientRect();
        if (attr.name === "data-select-username") {
            loadUsernamePanel();
        }

        if (attr.name === "data-select-reviewer" || attr.name === "data-select-quest") {
            loadReviewerPanel();
        }

        // temporarily show panel to measure width
        panel.style.visibility = "hidden";
        panel.style.display = "block";

        const panelRect = panel.getBoundingClientRect();
        const shift = (panelRect.width - rect.width) / 2;

        /* --------------------------------------------
          USE EXACT SAME LOGIC AS MAIN TRIGGERS
        ---------------------------------------------*/
        if (lastTrigger.id === "show-review-item-dropdown") {

          positionPlusUnderTrigger(lastTrigger, panel);

        } else {

        positionUnderTrigger(lastTrigger, panel);

        }

        // make visible
        panel.style.visibility = "visible";
        openDropdown = panel;
      }

      if (option.hasAttribute("data-select-select")) {

        const filters = document.querySelector(".review-filters");
        const mega = document.querySelector(".container-mega-review");

        if (filters && mega) {

          filters.classList.add("review-hidden");

          mega.classList.remove("review-hidden");
          mega.classList.add("show-mega");

          selectModeInit = true
          document.body.classList.add("select-mode");
        }

        mainDropdown.style.display = 'none';
        openDropdown = null;

        return;  
      }
    });
  });


    // Prevent panel clicks from closing
    Object.values(mainPanels).forEach(panel => {
      panel.addEventListener('click', e => e.stopPropagation());
    });

    /* -------------------------------------------------------
      STATUS / QUEST / USERNAME / REVIEWER TOP BARS
    --------------------------------------------------------*/
    const topTriggers = {
      'show-status-select': document.getElementById('for-status-select'),
      'show-quest-select': document.getElementById('for-quest-select'),
      'show-username-select': document.getElementById('for-username-select'),
      'show-reviewer-select': document.getElementById('for-reviewer-select'),
    };

    const topPanels = {
      'show-status-select': document.getElementById('filter-by-status'),
      'show-quest-select': document.getElementById('filter-by-quest'),
      'show-username-select': document.getElementById('filter-by-username'),
      'show-reviewer-select': document.getElementById('filter-by-reviewer'),
    };

    Object.keys(topTriggers).forEach(key => {
      const triggerEl = topTriggers[key].querySelector(`.${key}`);
      triggerEl.addEventListener('click', e => {
        e.stopPropagation();

        closeOpenDropdown(); // close any open panel/dropdown
        mainDropdown.style.display = 'none';

        const panel = topPanels[key];
        const rect = triggerEl.getBoundingClientRect();
        positionUnderTrigger(triggerEl, panel)
        openDropdown = panel;
      });
    });

    Object.values(topPanels).forEach(panel => {
      panel.addEventListener('click', e => e.stopPropagation());
    });

    /* -------------------------------------------------------
      REVIEW DROPDOWN SORTING
    --------------------------------------------------------*/
    const reviewChip = document.getElementById('review-chip');
    const reviewDropdown = document.getElementById('review-dropdown');
    const options = reviewDropdown.querySelectorAll('div');
    const reviewList = document.querySelector('.review-list');
    let selectedValue = 'recommended';


    reviewChip.addEventListener('click', (e) => {
      e.stopPropagation();
      if (openDropdown && openDropdown !== reviewDropdown) closeOpenDropdown();
      const rect = reviewChip.getBoundingClientRect();
      reviewDropdown.style.top = `${rect.bottom + window.scrollY + 4}px`;
      reviewDropdown.style.left = `${rect.left + window.scrollX}px`;
      reviewDropdown.style.display = reviewDropdown.style.display === 'flex' ? 'none' : 'flex';
      openDropdown = reviewDropdown.style.display === 'flex' ? reviewDropdown : null;
    });

    document.addEventListener('click', () => {
      closeOpenDropdown();
      reviewDropdown.style.display = 'none';
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        reviewChip.textContent = `${option.textContent.trim()} ▾`;
        selectedValue = option.dataset.value;
        reviewDropdown.style.display = 'none';
        openDropdown = null;
        filterReviews(selectedValue);
      });
    });


    if (selectAllBox) {

      selectAllBox.addEventListener("click", () => {

        selectAllBox.classList.toggle("checked");

        const isChecked = selectAllBox.classList.contains("checked");

        selectedCompletionIds = [];

        document.querySelectorAll(".review-item").forEach(item => {

          if (item.offsetParent === null) return; // skip hidden

          const id = Number(item.dataset.completionId);

          item.classList.toggle("selected", isChecked);

          if (isChecked) {
            selectedCompletionIds.push(id);
          }

        });

        updateMegaTriggerState();

      });

    }


    const clearMega = document.getElementById("clearMega");

    if (clearMega) {

      clearMega.addEventListener("click", () => {

        // remove UI selection
        document.querySelectorAll(".review-item")
          .forEach(i => i.classList.remove("selected"));

        // reset checkbox
        selectAllBox?.classList.remove("checked");

        // empty array
        selectedCompletionIds = [];



        exitSelectMode();

      });

    }

    if (megaTrigger && divers) {

      megaTrigger.addEventListener("click", (e) => {
        e.stopPropagation();

        if (megaTrigger.classList.contains("disabled")) return;

        const isOpen =
          divers.style.display === "block" ||
          divers.classList.contains("show");

        // 🔁 TOGGLE
        if (isOpen) {
          divers.style.display = "none";
          divers.classList.remove("show");
          return;
        }

        const rect = megaTrigger.getBoundingClientRect();

        divers.style.display = "block";

        // position
        divers.style.left = rect.left + "px";
        divers.style.top = rect.bottom + 15 + "px";

        // 🔥 match trigger width
        divers.style.width = rect.width + "px";

        divers.classList.add("show");
      });

    }

  function filterReviews(type) {

    const reviewList = document.querySelector('.review-list');

    // IMPORTANT: use global reference
    const items = [...window.originalItems];

    const getMeta = (el) => {

        const id = Number(el.dataset.completionId);

        const meta = REVIEW_META.get(id);

        return meta || {
            status: "pending",
            timestamp: 0
        };
    };

    let sorted = [];

    switch (type) {

        case 'newest':
            sorted = items.sort(
                (a, b) => getMeta(b).timestamp - getMeta(a).timestamp
            );
            break;

        case 'oldest':
            sorted = items.sort(
                (a, b) => getMeta(a).timestamp - getMeta(b).timestamp
            );
            break;

        case 'longest': {

            const pending = items
                .filter(el => getMeta(el).status === 'pending')
                .sort(
                    (a, b) => getMeta(a).timestamp - getMeta(b).timestamp
                );

            const nonPending = items
                .filter(el => getMeta(el).status !== 'pending')
                .sort(
                    (a, b) => getMeta(b).timestamp - getMeta(a).timestamp
                );

            sorted = [...pending, ...nonPending];
            break;
        }

        case 'recommended':
            sorted = items
                .filter(el => getMeta(el).status === 'pending')
                .sort(
                    (a, b) => getMeta(a).timestamp - getMeta(b).timestamp
                );
            break;

        default:
            sorted = items;
    }

    reviewList.innerHTML = "";

    sorted.forEach(el => reviewList.appendChild(el));
    filterAllReviewItems();
  }

    /* -------------------------------------------------------
      DISABLE TEXT SELECTION IN LISTS
    --------------------------------------------------------*/
    function disableTextSelectionInLists() {
      const spans = document.querySelectorAll(
        ".status-list li span, .username-list li span, .reviewer-list li span, .quest-list li span"
      );
      spans.forEach(span => {
        span.style.userSelect = "none";
        span.style.webkitUserSelect = "none";
        span.style.mozUserSelect = "none";
        span.style.msUserSelect = "none";
      });
    }
    disableTextSelectionInLists();

  }




  function reviewItemsOnwords() {
    const reviewItems = document.querySelectorAll(".review-item");
    const reviewCenter = document.querySelector(".review-center");
    const reviewDetails = document.querySelector(".review-details");
    const reviewFeed = document.querySelector(".review-feed");
    const reviewCrumbBack = document.querySelector(".review-crumb.ellipsis");

    // Feed item → open review (mobile)
    reviewItems.forEach(item => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 1112) {
        if (selectModeInit) return;

          if (openDropdown) {
            e.stopPropagation();
            e.preventDefault();


            return; 
          }
          const content = document.querySelector(".content");
          if (content) {
            savedContentScrollTopMMP = content.scrollTop;
          }
          reviewFeed.style.display = "none";
          reviewCenter.classList.remove("hidden");
          reviewCenter.style.display = "flex";

          reviewDetails.classList.add("hidden");

          reviewDetails.style.display = "none";
        }
      });
    });

    // 🔙 Crumb click → return to feed
    if (reviewCrumbBack) {
      reviewCrumbBack.addEventListener("click", (e) => {
        if (window.innerWidth <= 1112) {
          e.stopPropagation();

          reviewItems.forEach(i => i.classList.remove("active-review-item"));

          // Hide center + details
          reviewCenter.style.display = "none";
          reviewDetails.style.display = "none";

          // Show feed
          reviewFeed.style.display = "block";

          // ✅ RESTORE SCROLL POSITION (.content)
          const content = document.querySelector(".content");
          requestAnimationFrame(() => {
            if (content) {
              content.scrollTop = savedContentScrollTopMMP;
            }
          });

          if (typeof updateReviewTaskHeight === "function") {
            requestAnimationFrame(updateReviewTaskHeight);
          }
        }
      });
    }


    // Tap blank area to close center (optional)
    reviewCenter.addEventListener("click", (e) => {
      if (e.target === reviewCenter && window.innerWidth <= 768) {
        reviewCenter.style.display = "none";


        reviewFeed.style.display = "block";
      }
    });
  }


  let USERS_LOADED = false;
  let REVIEWERS_LOADED = false;

  async function loadUsernamePanel() {

    if (USERS_LOADED) return;

    try {

      const resUsers = await fetch(`/api/${communitySlug}/users`);
      if (!resUsers.ok) throw new Error("Failed to fetch users");

      const dataUsers = await resUsers.json();

      const list = document.querySelector(".username-list");

      list.innerHTML = dataUsers.usernames.map(u => `
        <li class="username-item" data-username="${u.toLowerCase()}">
          <label class="username-checkbox-wrapper">
            <input type="checkbox">
            <span class="custom-checkmark"></span>
          </label>
          <span>${u}</span>
        </li>
      `).join("");

      attachSearch(
        ".username-search-box input",
        ".username-list",
        "#filter-by-username .username-list + div"
      );

      filterAllReviewItems();

      USERS_LOADED = true;

    } catch (err) {
      console.error(err);
    }
  }


  async function loadReviewerPanel() {

    if (REVIEWERS_LOADED) return;

    try {

      const resReviewers = await fetch(`/api/${communitySlug}/reviewers`);
      if (!resReviewers.ok) throw new Error("Failed to fetch reviewers");

      const dataReviewers = await resReviewers.json();

      // Reviewers
      const reviewerList = document.querySelector(".reviewer-list");

      reviewerList.innerHTML = dataReviewers.reviewers.map(r => `
        <li class="reviewer-item" data-reviewer-name="${r.toLowerCase()}">
          <label class="reviewer-checkbox-wrapper">
            <input type="checkbox">
            <span class="reviewer-checkmark"></span>
          </label>
          <span>${r}</span>
        </li>
      `).join("");

      attachSearch(".reviewer-search-box input", ".reviewer-list", "#reviewer-result");


      // Quests
      const questList = document.querySelector(".quest-list");

      questList.innerHTML = dataReviewers.subquests.map(q => `
        <li class="quest-item-rev" data-quest-name="${q.toLowerCase()}">
          <label class="quest-checkbox-wrapper">
            <input type="checkbox">
            <span class="custom-checkmark"></span>
          </label>
          <span>${q}</span>
        </li>
      `).join("");

      attachSearch(".quest-search-box input", ".quest-list", "#quest-no-result");

      filterAllReviewItems();

      REVIEWERS_LOADED = true;

    } catch (err) {
      console.error(err);
    }
  }



  const rewardsvgMap = { 
    xp: `      <svg viewBox="0 0 24 24" width="16" height="16"   xmlns="http://www.w3.org/2000/svg" stroke="#4285f4" fill="#4285f4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
        </svg>`,

    role: `<svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 4px;" width="14" height="14" fill="#5865F2" viewBox="0 0 24 24" style="margin-right: 5px;"> 
              <path d="M20.318 4.36a19.8 19.8 0 0 0-4.885-1.517c-.212.375-.445.866-.609 1.25a18.3 18.3 0 0 0-5.487 0 12 12 0 0 0-.618-1.25A19.9 19.9 0 0 0 3.214 4.36C.534 9.036-.32 13.57.1 18.048a19.9 19.9 0 0 0 5.992 3.03q.695-.945 1.227-1.994a13.5 13.5 0 0 1-1.872-.892q.191-.143.372-.292c3.928 1.794 8.181 1.794 12.062 0q.181.149.372.292a12 12 0 0 1-1.873.891c.36.697.773 1.363 1.226 1.994a19.8 19.8 0 0 0 6.001-3.03c.501-5.176-.839-9.673-3.55-13.658M8.02 15.32c-1.184 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419m7.974 0c-1.183 0-2.157-1.085-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.177 1.095 2.157 2.419 0 1.333-.947 2.419-2.157 2.419"/>
          </svg>`,

    custom: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" 
            fill="none" stroke="#a3a3a3" stroke-width="2" style="margin-right: 4px;"
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


  function capitalizeWords(str) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }


  function calculateIconSize(container, count, gap = 4, desktopSize = 27) {
    if (!isMobile()) return desktopSize;

    const containerWidth = container.clientWidth || container.offsetWidth;

    // 🚨 fallback if width is still tiny
    if (containerWidth < 100) {
      return 20; // safe mobile default
    }

    const totalGap = gap * (count - 1);
    const size = Math.floor((containerWidth - totalGap) / count);

    return Math.max(size, 18);
  }



  /* ===============================
    FUNCTION TO RENDER REVIEW CARDS
  =============================== */
  function renderReviewCards(taskAttempts, container, reviewData) {
    container.innerHTML = ""; // Clear previous cards

    taskAttempts.forEach(task => {
      const card = document.createElement("div");
      card.className = "review-card";

      const label = document.createElement("div");
      label.className = "review-label";

      const taskType = task.task_type.toLowerCase();


    if (PLATFORM_ICONS[taskType]) {
      const status = task.status?.toLowerCase() || "pending"; // fallback to pending
      label.innerHTML = `
    <div style="display:flex; align-items:center; width:100%;" class="downer-class-review">
        <div style="display:flex; align-items:center; gap:8px;">
            <span class="svg-wrapper" style="--icon-bg:${PLATFORM_ICONS[taskType].color}">
                ${PLATFORM_ICONS[taskType].icon}
            </span>
            <span class="review-label">
                ${capitalizeWords(task.task_type)}
            </span>
        </div>

        <div class="review-svg-right" style="display:flex; align-items:center; margin-left:auto;">
            ${statusSVGs[status] || statusSVGs.pending}
        </div>
    </div>

      `;
    }
    else {
      label.textContent = task.task_type; // fallback
    }

  card.appendChild(label);


      // Handle different task types
  if (taskType === "file-upload" && task.user_input?.files?.length > 0) {
    const mediaContainer = document.createElement("div");
    mediaContainer.className = "review-image";
    mediaContainer.style.overflow = "hidden";

    task.user_input.files.forEach(f => {

      const ext = f.name.split(".").pop().toLowerCase();

      /* ✅ IMAGE FILES */
      if (["jpg","jpeg","png","gif","webp"].includes(ext)) {
        const img = document.createElement("img");
        img.className = "img-bubble"
        img.src = f.url;
        img.alt = f.name;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "6px";
        mediaContainer.appendChild(img);
      }

      /* ✅ VIDEO FILES (MP4) */
    else if (["mp4", "mov", "webm"].includes(ext)) {

      let activeVideo = null;

      // 🔒 Outer wrapper (clips overflow)
      const videoWrapper = document.createElement("div");
      videoWrapper.className = "video-wrapper";

      // 🎯 Inner scaler (THIS gets transformed)
      const videoInner = document.createElement("div");
      videoInner.className = "video-inner";

      videoWrapper.appendChild(videoInner);

      // Thumbnail
      const thumbnail = document.createElement("img");
      thumbnail.style.width = "100%";
      thumbnail.style.height = "100%";
      thumbnail.style.objectFit = "cover";
      thumbnail.style.filter = "blur(1.5px)";
      thumbnail.style.opacity = "0.85";

      const tempVideo = document.createElement("video");
      tempVideo.src = f.url;
      tempVideo.muted = true;

      tempVideo.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = tempVideo.videoWidth;
        canvas.height = tempVideo.videoHeight;
        canvas.getContext("2d").drawImage(tempVideo, 0, 0);
        thumbnail.src = canvas.toDataURL("image/jpeg");
      });

      videoInner.appendChild(thumbnail);

      // Overlay
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.inset = "0";
      overlay.style.background = "rgba(0,0,0,0.35)";
      overlay.style.backdropFilter = "blur(2px)";
      videoInner.appendChild(overlay);

      // Play button
      const playBtn = document.createElement("div");
      playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="white"
          viewBox="0 0 24 24" width="60" height="60">
          <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54
          6.347a1.125 1.125 0 0 1 0 1.972l-11.54
          6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
        </svg>
      `;
      playBtn.style.position = "absolute";
      playBtn.style.top = "50%";
      playBtn.style.left = "50%";
      playBtn.style.transform = "translate(-50%, -50%)";
      playBtn.style.animation = "pulse 1.6s infinite ease-in-out";
      videoInner.appendChild(playBtn);

      // Loader
      const loader = document.createElement("div");
      loader.style.position = "absolute";
      loader.style.top = "50%";
      loader.style.left = "50%";
      loader.style.transform = "translate(-50%, -50%)";
      loader.style.width = "40px";
      loader.style.height = "40px";
      loader.style.border = "4px solid rgba(255,255,255,0.2)";
      loader.style.borderTopColor = "#fff";
      loader.style.borderRadius = "50%";
      loader.style.animation = "spin 1s linear infinite";
      loader.style.display = "none";
      videoInner.appendChild(loader);

      // Click → replace with video
      videoWrapper.addEventListener("click", () => {
        loader.style.display = "block";

        const video = document.createElement("video");
        video.src = f.url;
        video.controls = true;
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "100%";

        if (activeVideo && !activeVideo.paused) activeVideo.pause();
        activeVideo = video;

        video.addEventListener("loadeddata", () => {
          videoWrapper.replaceWith(video);
        });
      });

      mediaContainer.appendChild(videoWrapper);
    }

    });

    card.appendChild(mediaContainer);
  }


  else if (taskType === "puzzle") {
    const bubble = document.createElement("div");
    bubble.className = "review-bubble";

    const status = task.status?.toLowerCase();

    let answer = "";

    if (status === "success") {
      // ✅ Show correct answer
      answer =
        task.user_input?.puzzle?.answer ||
        task.user_input?.task_answer ||
        "Completed";
    } else {
      // ❌ Show what user typed (FAILED case)
      answer =
        task.user_input?.task_answer ||
        task.user_input?.puzzle ||
        "No Answer";
    }

    bubble.textContent = answer;
    card.appendChild(bubble);
  }


  else if (["youtube", "discord", "partnership", "partnership_quest"].includes(taskType)) {
      const bubble = document.createElement("div");
      bubble.className = "review-bubble";

      let text = "";

      const status = task.status?.toLowerCase() || "pending"; // Check task status

      if (taskType === "youtube") {
          if (status === "success" && task.user_input?.youtube) {
              const info = task.user_input.youtube;
              const channelName = info.channel_name || "Unknown Channel";
              text = `Subscribed to <span style="font-style:italic; font-weight:550;">${channelName}</span> YouTube channel`;
          } else {
              text = "Did not subscribe to the required YouTube channel";
          }
      } 
      else if (taskType === "discord") {
          if (status === "success" && task.user_input?.discord) {
              const info = task.user_input.discord;
              const serverName = info.server_name || "Unknown Server";
              text = `Joined "<span style="font-style:italic; font-weight:550;">${serverName}</span>" Discord server`;
          } else {
              text = "Did not join the required Discord server";
          }
      } 
      else if (taskType === "partnership") {
          if (status === "success" && task.user_input?.partnership) {
              const info = task.user_input.partnership;
              text = `Joined ${info.community_name || "Unknown Community"} Community`;
          } else {
              text = "Did not join the required community";
          }
      } 
      else if (taskType === "partnership_quest") {
          if (status === "success" && task.user_input?.partnership_quest) {
              const info = task.user_input.partnership_quest;
              const subquestName = info.subquest_name || "Unknown Subquest";
              text = `Completed "<span style="font-style:italic; font-weight:550;">${subquestName}</span>" quest in ${info.community_name || "Unknown Community"} Community`;
          } else {
              text = "Did not complete the required partnership quest";
          }
      }

      bubble.innerHTML = text;
      card.appendChild(bubble);
  }


  else if (taskType === "visit link") {
    const meta = task.user_input?.visit_link || {};

    // ✅ Main review bubble
    const bubble = document.createElement("div");
    bubble.className = "review-bubble";
    bubble.style.display = "flex";
    bubble.style.flexDirection = "column";
    bubble.style.gap = "8px";

    // ✅ Clickable wrapper link
    const link = document.createElement("a");
    link.href = meta.url || "#";
    link.target = "_blank";
    link.style.textDecoration = "none";
    link.style.color = "inherit";
    link.style.display = "block";

    // ✅ Preview card inside link
    const preview = document.createElement("div");
    preview.className = "url-preview-card";
    preview.style.display = "flex";
    preview.style.alignItems = "center";
    preview.style.gap = "10px";
    preview.style.borderRadius = "15px";
    preview.style.position = "relative";
    preview.style.overflow = "hidden";
    preview.style.cursor = "pointer";
    preview.style.transition = "background 0.25s ease";

    // ✅ Thumbnail
    if (meta.image) {
      const img = document.createElement("img");
      img.src = meta.image;
      img.alt = meta.title || "Preview";
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px";
      preview.appendChild(img);
    }

    // ✅ Info column (no visible link)
    const info = document.createElement("div");
    info.style.display = "flex";
    info.style.flexDirection = "column";
    info.style.gap = "4px";
    info.innerHTML = ` 
      <div style="font-weight:600; var(--text-muted)">${meta.title || "No Title"}</div>
      <div style="font-size:13px; color:var(--text-muted);">${meta.description || "No Description"}</div>
    `;
    preview.appendChild(info);

    // ✅ Wrap preview in clickable link
    link.appendChild(preview);
    bubble.appendChild(link);

    // ✅ Add plain text status below (no badge)
    const visitedText = document.createElement("div");
    if (task.status?.toLowerCase() === "success" && meta.visited) {
      visitedText.textContent = "Visited";
      visitedText.style.color = "#4CAF50";
    } else {
      visitedText.textContent = "Did not visit the required link";
      visitedText.style.color = "#e74c3c";
    }
    visitedText.style.fontSize = "12px";
    visitedText.style.fontWeight = "600";
    visitedText.style.marginTop = "4px";
    bubble.appendChild(visitedText);

    // ✅ Add bubble to card
    card.appendChild(bubble);
  }



  else if (taskType === "quiz") {
      const bubble = document.createElement("div");
      bubble.className = "review-bubble";

      const answer = task.user_input?.quiz_answer || task.user_input?.quiz || {};
      const indexes = answer.selected_indexes || [];
      const texts = answer.selected_texts || [];

      const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (indexes.length > 0) {
          let formatted = indexes.map((i, idx) => {
              let letter = ABC[i] || "?";
              let text = texts[idx] || "";
              return `${letter}. ${text}`;
          }).join("\n");

          bubble.textContent = formatted;
      } else {
          bubble.textContent = "No Answer";
      }

      card.appendChild(bubble);
  }

  else if (taskType === "poll") {
      const bubble = document.createElement("div");
      bubble.className = "review-bubble";

      const answer = task.user_input?.poll_answer || {};
      const indexes = answer.selected_indexes || [];
      const texts = answer.selected_texts || [];

      const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (indexes.length > 0) {
          let formatted = indexes.map((i, idx) => {

              let letter;

              // 🛠️ FIX: When backend sends "other" instead of number
              if (i === "other" || i === "Others" || i === "Other") {
                  letter = "Other";
              }
              else {
                  // assume number index normally
                  letter = ABC[i] || "?";
              }

              let text = texts[idx] || "";
              return `${letter}. ${text}`;
          }).join("\n");

          bubble.textContent = formatted;
      } else {
          bubble.textContent = "No Selection";
      }

      card.appendChild(bubble);
  }




  else if (taskType === "optionscale(numbers)") {
    const ans = task.user_input?.optionscale_answer || {};

    const selectedRaw = Number(ans.selected || 0);
    const maxBars = 10;
    const selected = Math.min(selectedRaw, maxBars);

    const leftLabel  = ans.left_label  || "Not Likely";
    const rightLabel = ans.right_label || "Very Likely";
    const label = selected >= 6 ? rightLabel : leftLabel;

    // 🔹 Bubble
    const bubble = document.createElement("div");
    bubble.className = "review-bubble optionscale-bubble";

    // 🔹 Row
    const row = document.createElement("div");
    row.className = "optionscale-row";

    // 🔹 Column
    const barColumn = document.createElement("div");
    barColumn.className = "optionscale-bar-column";

    // 🔹 Bar
    const bar = document.createElement("div");
    bar.className = "optionscale-bar";

    // 🔹 Build trapezoids FIRST (no size yet)
    for (let i = 1; i <= maxBars; i++) {
      const trapezoid = document.createElement("div");
      trapezoid.className = "optionscale-trapezoid";
      trapezoid.innerHTML = `
        <svg class="optionscale-svg ${i <= selected ? "active" : ""}"
            viewBox="0 0 24 24">
          <path d="M5.13 3L0.82 17H14.87L19.18 3H5.13Z"></path>
        </svg>
      `;
      bar.appendChild(trapezoid);
    }

    // 🔹 Number badge
    const numberBadge = document.createElement("div");
    numberBadge.className = "optionscale-number-badge";
    numberBadge.textContent = `${selectedRaw} out of ${maxBars}`;

    // 🔹 Label
    const txt = document.createElement("div");
    txt.className = "optionscale-label";
    txt.textContent = label;

    // 🔹 Badge + label row
    const numberLabelRow = document.createElement("div");
    numberLabelRow.className = "optionscale-number-label-row";
    numberLabelRow.appendChild(numberBadge);
    numberLabelRow.appendChild(txt);

    // 🔹 Assemble DOM FIRST
    barColumn.appendChild(bar);
    barColumn.appendChild(numberLabelRow);
    row.appendChild(barColumn);
    bubble.appendChild(row);
    card.appendChild(bubble);

    // 🔥 NOW calculate size (after DOM paint)
    requestAnimationFrame(() => {
      const iconSize = calculateIconSize(bar, maxBars);

      bar.querySelectorAll("svg").forEach(svg => {
        svg.setAttribute("width", iconSize);
        svg.setAttribute("height", iconSize);
      });
    });
  }


  else if (taskType === "optionscale(star)") {
    const bubble = document.createElement("div");
    bubble.className = "review-bubble";

    bubble.style.display = "flex";
    bubble.style.flexDirection = "column";
    bubble.style.alignItems = "stretch"; // ✅ IMPORTANT
    bubble.style.gap = "6px";

    const ans = task.user_input?.optionscale_answer || {};
    const selected = Number(ans.selected || 0);
    const max = Number(ans.max || 10);

    // ⭐ Stars row
    const starRow = document.createElement("div");
    starRow.style.display = "flex";
    starRow.style.gap = "5px";
    starRow.style.width = "100%"; // ✅ THIS IS THE FIX

    // Build stars (no size yet)
    for (let i = 1; i <= max; i++) {
      const star = document.createElement("div");
      star.className = "star-bubble";
      star.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16"   xmlns="http://www.w3.org/2000/svg" stroke="${i <= selected ? "#ffd700" : "var(--text-muted-svg)"}" fill="${i <= selected ? "#ffd700" : "var(--text-muted-svg)"}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
        </svg>
      `;
      starRow.appendChild(star);
    }

    // Rating text
    const ratingText = document.createElement("div");
    ratingText.style.fontSize = "13px";
    ratingText.style.color = "var(--text-main)";

    let label = "";
    if (selected <= max * 0.2) label = "Bad";
    else if (selected <= max * 0.5) label = "Okay";
    else if (selected <= max * 0.8) label = "Good";
    else label = "Very Good";

    ratingText.textContent = `${selected}/${max} – ${label}`;

    bubble.appendChild(starRow);
    bubble.appendChild(ratingText);
    card.appendChild(bubble);

    // 🔥 Resize AFTER layout
    requestAnimationFrame(() => {
      const starSize = calculateIconSize(starRow, max);
      starRow.querySelectorAll("svg").forEach(svg => {
        svg.setAttribute("width", starSize);
        svg.setAttribute("height", starSize);
      });
    });
  }


  else if (taskType === "text" || taskType === "numbers") {
    const bubble = document.createElement("div");
    bubble.className = "review-bubble";

    // Prefer task_answer, fallback to text or answer
    const answer =
      task.user_input?.task_answer ??
      task.user_input?.text ??
      task.user_input?.answer ??
      "N/A";

    bubble.textContent = answer;
    card.appendChild(bubble);
  }
  else if (taskType === "url") {
        const urlContainer = document.createElement("div");
        urlContainer.className = "review-url";
        const chip = document.createElement("span");
        chip.className = "review-chip";
        const input = document.createElement("input");
        input.value = task.user_input?.url || task.subquest_url || "";
        input.readOnly = true;
        input.style.outline = "none";
        urlContainer.appendChild(chip);
        urlContainer.appendChild(input);
        card.appendChild(urlContainer);
      } else {
        // Default bubble for unknown types
        const bubble = document.createElement("div");
        bubble.className = "review-bubble";
        bubble.textContent = "Completed";
        card.appendChild(bubble);
      }

      container.appendChild(card);
    });
    appendHistoryBlock(CURRENT_CLICKED_ITEM, reviewData, container);

  }



  function activateXpMode(starBtn, freeXpBox, freeXpInput, successBtn) {
      starBtn.classList.add("active");
      freeXpBox.style.display = "flex";
      setTimeout(() => freeXpInput.focus(), 30);
      successBtn.classList.add("xp-mode-active");

      starBtn.querySelector("svg").style.fill = "rgb(250, 250, 9)";
      starBtn.querySelector("svg").style.color = "rgb(250, 250, 9)";
  }

  function deactivateXpMode(starBtn, freeXpBox, successBtn) {
      starBtn.classList.remove("active");
      freeXpBox.style.display = "none";
      successBtn.classList.remove("xp-mode-active");

      starBtn.querySelector("svg").style.fill = "";
      starBtn.querySelector("svg").style.color = "";
  }

  function activateFlagMode(flagBtn, failMainBtn) {
      flagBtn.classList.add("active-flag");
      failMainBtn.classList.add("flag-mode-active");
      failMainBtn.textContent = "Fail with flag";

      let svg = flagBtn.querySelector("svg");
      svg.style.color = "rgb(255, 70, 70)";
      svg.style.fill = "rgb(255, 70, 70)";
      svg.style.stroke = "rgb(255, 70, 70)";
  }

  function deactivateFlagMode(flagBtn, failMainBtn) {
      flagBtn.classList.remove("active-flag");
      failMainBtn.classList.remove("flag-mode-active");
      failMainBtn.textContent = "Fail";

      let svg = flagBtn.querySelector("svg");
      svg.style.color = "";
      svg.style.fill = "";
      svg.style.stroke = "";
  }


function appendHistoryBlock(item, reviewData, container) {

  const historyList = reviewData.review_history || [];

  const username =
    item.querySelector(".review-title")?.childNodes[0]?.textContent.trim() || "User";

  const subquest =
    item.querySelector(".review-sub")?.textContent.trim() || "Untitled quest";

  const timeAgo =
    item.querySelector(".time-ago")?.textContent.trim() || "—";

  const avatarImg = item.querySelector(".review-avatar img");
  const profilePic = avatarImg ? avatarImg.src : null;

  const firstLetter = username[0]?.toUpperCase() || "?";

  let avatarHTML = "";

  if (profilePic) {
    avatarHTML = `
      <div class="avatar-img" style="width:27px;height:27px;position:absolute;left:0;top:0;">
        <img src="${profilePic}">
      </div>
    `;
  } else {
    avatarHTML = `<div class="avatar-fallback-his fall">${firstLetter}</div>`;
  }

  const historyBlock = document.createElement("div");
  historyBlock.className = "activity-container";
  historyBlock.innerHTML = `<h2>History</h2>`;

  const claimedHTML = `
    <div class="activity-item">
      ${avatarHTML}
      <div class="activity-content">
        <span class="activity-user">${username}</span> claimed
        <strong>${subquest}</strong>
        <span class="activity-time">${timeAgo}</span>
      </div>
    </div>
  `;

  historyBlock.innerHTML += claimedHTML;

  historyList.slice().reverse().forEach(h => {

    let mainSVG = activitySVGs.pending;

    if (h.status === "success")
      mainSVG = h.star ? activitySVGs.star : activitySVGs.success;
    else if (h.status === "failed")
      mainSVG = h.flag ? activitySVGs.flag : activitySVGs.failed;

    const reviewer = h.reviewer_username || username;

    const userLabel =
      `<span class="activity-user" style="font-weight:600;">${reviewer}</span>`;

    let msg = "";

    if (h.status === "success") {

      if (h.star && h.free_xp > 0)
        msg = `${userLabel} reviewed with <span class="status-text">success</span>, awarded a star, and gave ${h.free_xp} XP in bonus.`;

      else if (h.star)
        msg = `${userLabel} reviewed with <span class="status-text">success</span> and awarded a star.`;

      else if (h.free_xp > 0)
        msg = `${userLabel} reviewed with <span class="status-text">success</span> and gave ${h.free_xp} XP in bonus.`;

      else
        msg = `${userLabel} reviewed with <span class="status-text">success</span>.`;
    }

    else if (h.status === "failed") {

      if (h.flag)
        msg = `${userLabel} reviewed with <span class="status-text">fail</span> and marked as flagged.`;

      else
        msg = `${userLabel} reviewed with <span class="status-text">fail</span>.`;
    }

    else if (h.status === "pending") {
      msg = `${userLabel} changed status to <span class="status-text">pending</span>.`;
    }

    const reviewHTML = `
      <div class="activity-item">
        <div class="avatar-svg">${mainSVG}</div>
        <div class="activity-content">
          <span class="activity-message">${msg}</span>
          <span class="activity-time">${h.time_ago || "—"}</span>
          ${h.comment ? `<div class="activity-comment">${h.comment}</div>` : ""}
        </div>
      </div>
    `;

    historyBlock.innerHTML += reviewHTML;
  });

  container.appendChild(historyBlock);
}






  const ReviewrEWARD_ICONS = {

      ALL: `
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4285f4">
            <path
              d="M232,128.00037A104.11767,104.11767,0,0,0,128.042,24.00086L128,23.96423l-.042.03663a103.99952,103.99952,0,0,0-.001,207.999l.043.0376.043-.0376A104.11763,104.11763,0,0,0,232,128.00037Zm-16.36768-8h-39.853c-1.5918-29.637-12.01123-57.01758-29.5044-78.08643A88.1919,88.1919,0,0,1,215.63232,120.00037Zm-119.37353,16h63.48242C157.93164,164.75623,146.44678,191.703,128,210.44177,109.55322,191.703,98.06836,164.75623,96.25879,136.00037Zm0-16C98.06836,91.24353,109.55322,64.29675,128,45.559c18.44678,18.73779,29.93164,45.68457,31.74121,74.44141Zm50.01562,94.08642c17.49317-21.06933,27.9126-48.45044,29.50489-78.08642h39.853A88.19181,88.19181,0,0,1,146.27441,214.08679Z"
              fill="#4285f4"
            />
          </svg>

  `,
      

      FCFS:  `
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
  </svg> `,

      RAFFLE: 
      `

      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.0079 19.0029L14.0137 17C14.0137 16.4477 14.4625 16 15.0162 16C15.5698 16 16.0187 16.4477 16.0187 17V18.9765C16.0187 19.458 16.0187 19.6988 16.1731 19.8464C16.3275 19.9941 16.5637 19.984 17.0362 19.964C18.8991 19.8852 20.0437 19.6332 20.8504 18.8284C21.6591 18.0218 21.911 16.8766 21.9894 15.0105C22.005 14.6405 22.0128 14.4554 21.9437 14.332C21.8746 14.2085 21.5987 14.0545 21.0469 13.7463C20.4341 13.4041 20.0199 12.7503 20.0199 12C20.0199 11.2497 20.4341 10.5959 21.0469 10.2537C21.5987 9.94554 21.8746 9.79147 21.9437 9.66803C22.0128 9.54458 22.005 9.35954 21.9894 8.98947C21.911 7.12339 21.6591 5.97823 20.8504 5.17157C19.9727 4.29604 18.6952 4.0748 16.5278 4.0189C16.2482 4.01169 16.0187 4.23718 16.0187 4.51618V7C16.0187 7.55228 15.5698 8 15.0162 8C14.4625 8 14.0137 7.55228 14.0137 7L14.0064 4.49855C14.0056 4.22298 13.7814 4 13.5052 4H9.99502C6.21439 4 4.32407 4 3.14958 5.17157C2.34091 5.97823 2.08903 7.12339 2.01058 8.98947C1.99502 9.35954 1.98724 9.54458 2.05634 9.66802C2.12545 9.79147 2.40133 9.94554 2.95308 10.2537C3.56586 10.5959 3.98007 11.2497 3.98007 12C3.98007 12.7503 3.56586 13.4041 2.95308 13.7463C2.40133 14.0545 2.12545 14.2085 2.05634 14.332C1.98724 14.4554 1.99502 14.6405 2.01058 15.0105C2.08903 16.8766 2.34091 18.0218 3.14958 18.8284C4.32407 20 6.21438 20 9.99502 20H13.0054C13.4767 20 13.7124 20 13.8591 19.8541C14.0058 19.7081 14.0065 19.4731 14.0079 19.0029ZM16.0187 13V11C16.0187 10.4477 15.5698 10 15.0162 10C14.4625 10 14.0137 10.4477 14.0137 11V13C14.0137 13.5523 14.4625 14 15.0162 14C15.5698 14 16.0187 13.5523 16.0187 13Z"
          fill="#8B5CF6"
        />
      </svg>

        `,
    



      VOTE:
          `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(0, 255, 0)"
              width="16"
              height="16" class="reward-icons" >
            <g transform="scale(0.0375)">
              <path d="M144 224C161.7 224 176 238.3 176 256L176 512C176 529.7 161.7 544 144 544L96 544C78.3 544 64 529.7 64 512L64 256C64 238.3 78.3 224 96 224L144 224zM334.6 80C361.9 80 384 102.1 384 129.4L384 133.6C384 140.4 382.7 147.2 380.2 153.5L352 224L512 224C538.5 224 560 245.5 560 272C560 291.7 548.1 308.6 531.1 316C548.1 323.4 560 340.3 560 360C560 383.4 543.2 402.9 521 407.1C525.4 414.4 528 422.9 528 432C528 454.2 513 472.8 492.6 478.3C494.8 483.8 496 489.8 496 496C496 522.5 474.5 544 448 544L360.1 544C323.8 544 288.5 531.6 260.2 508.9L248 499.2C232.8 487.1 224 468.7 224 449.2L224 262.6C224 247.7 227.5 233 234.1 219.7L290.3 107.3C298.7 90.6 315.8 80 334.6 80z"/>
            </g>
          </svg>
          `,
      
  }





function buildRewardsHTML(rewards) {
  console.log(rewards)
  if (!Array.isArray(rewards)) return "";

  let html = "";

  rewards.forEach(r => {
    const svg = rewardsvgMap[r.reward_type] || "";
    const distType = r.distribution_type || "";

    let label = "";
    switch (r.reward_type) {
      case "xp":
        label = `${r.reward_data?.amount ?? r.amount ?? 0} XP`;
        break;
      case "role":
        label = r.reward_data?.role || "Role";
        break;
      case "custom":
        label = r.reward_data?.text || "Custom";
        break;
      case "token":
        label = `${r.reward_data?.amount_per_winner ?? r.amount ?? 0} ${r.reward_data?.symbol ?? r.symbol ?? ""}`;
        break;
      default:
        label = r.reward_type;
    }

    let dist = "";
    let iconHTML = "";

    if (distType) {
      const upperDist = distType.toUpperCase();

      if (upperDist === "FCFS") {
        iconHTML = ReviewrEWARD_ICONS.FCFS || "";
        dist = "FCFS";
      } else if (upperDist === "ALL") {
        iconHTML = ReviewrEWARD_ICONS.ALL || "";
        dist = "ALL";
      } else if (upperDist === "RAFFLE") {
        iconHTML = ReviewrEWARD_ICONS.RAFFLE || "";
        dist = "RAFFLE";
      } else if (upperDist === "VOTE") {
        iconHTML = ReviewrEWARD_ICONS.VOTE || "";
        dist = "VOTE";
      } else {
        dist = `(${distType})`;
      }
    }

    html += `<span class="review-pilled">${svg} ${label} ${iconHTML} ${dist}</span>`;
  });

  return html;
}






  async function getReviewData(completionId) {

      if (REVIEW_CACHE[completionId]) {
          return REVIEW_CACHE[completionId];
      }

      const res = await fetch(`/api/${communitySlug}/review/${completionId}`);
      if (!res.ok) throw new Error("Failed to fetch review");

      const data = await res.json();

      REVIEW_CACHE[completionId] = data; // store in memory

      return data;
  }



function openReviewPanels() {
  const center = document.querySelector(".review-center");
  const details = document.querySelector(".review-details");
  const placeholder = document.querySelector(".placeholder-review");
  const reviewPanelFeed = document.querySelector(".review-panel.review-feed");

  if (!center || !center.classList.contains("hidden-review")) {
    return;
  }

  const width = window.innerWidth;

  if (width <= 1404) {
    center.classList.remove("hidden-review");

    if (reviewPanelFeed) {
      reviewPanelFeed.style.width = "100%";
    }

  } else {
    
    center.classList.remove("hidden-review");
    details?.classList.remove("hidden-review");

    if (reviewPanelFeed) {
      reviewPanelFeed.style.width = "100%";
    }
  }

  placeholder?.classList.add("hidden-review");
}



  function ReviewitemOnlick() {
    /* ===============================
      ELEMENT REFERENCES
    =============================== */
    const reviewItems = document.querySelectorAll(".review-item");

    const reviewCenter = document.querySelector(".review-center");
    const reviewDetails = document.querySelector(".review-details");
    const reviewFeed = document.querySelector(".review-feed");

    const subquestCrumb = document.querySelector(".review-bar .review-crumb.ellipsis:first-child");
    const usernameCrumb = document.querySelector(".review-bar .review-crumb.ellipsis:last-child");
      const starBtn = document.querySelector(".free-xp-star");
      const freeXpBox = document.querySelector(".review-free-xp");
      const freeXpInput = document.querySelector(".free-xp");
      const successBtn = document.querySelector("#pass-user");

      const flagBtn = document.querySelector(".flag--user");
      const failMainBtn = document.querySelector("#fail-user");

      if (!starBtn || !freeXpBox || !freeXpInput || !successBtn || !flagBtn || !failMainBtn) return;
    const userAvatarContainer = document.querySelector(".review-user .review-avatar-right");
    const userAvatarImg = userAvatarContainer.querySelector("img") || document.createElement("img");
    userAvatarImg.alt = "avatar";
    if (!userAvatarImg.parentNode) userAvatarContainer.appendChild(userAvatarImg);
  const allAddButtons = document.querySelectorAll(".review-icon-btn, .action-icon");
  const PlaceHolderReview = document.querySelector(".placeholder-review")


    /* ===============================
      ✅ MAIN REVIEW CLICK HANDLER
    =============================== */
    reviewItems.forEach(item => {
      
  
      item.addEventListener("click", async (e) => {
        resetReviewUI();
        
        if (selectModeInit) return;
        document.querySelectorAll(".review-dropdown, .review-item-dropdown")
        .forEach(el => {
          el.style.display = "none";
        });
        
        if (openDropdown) {
            return;
        }

        

        

        const completionId = item.dataset.completionId;
        const reviewId = item.dataset.reviewId
        if (!completionId) return;

        let r;
        PlaceHolderReview.style.display="none"
        if (window.innerWidth <= 768) {
        reviewFeed.style.display = "none";
        reviewCenter.style.display = "flex";
        reviewDetails.style.display = "none";
        }
        openReviewPanels();
        try {
            r = await getReviewData(completionId);
        } catch (err) {
            console.error("Failed to load review", err);
            return;
        }
        deactivateXpMode(starBtn, freeXpBox, successBtn);
        deactivateFlagMode(flagBtn, failMainBtn);
        document.querySelectorAll(".review-textarea").forEach(textarea => {
        textarea.value = "";
        });
        reviewItems.forEach(i => i.classList.remove("active-review-item"));
        
        
        item.classList.add("active-review-item");
        
        document.querySelectorAll(".showconatiner-wallet").forEach(container => {

        copyIcon.classList.remove("hide");
        copyIcon.classList.add("show");
        });
        window.CURRENT_CLICKED_ITEM = item;
        const status = r.status;
        const actionPanel = document.querySelector(".review-actions");
        const usernameCrumbStrong = document.querySelector(".review-bar .review-crumb.ellipsis-text strong");
        const donePanel = document.querySelector(".review-done-content");
        const bottomStatus = donePanel.querySelector(".bottom-status");
        const statusSpan = donePanel.querySelector(".review-done-status");

        // Default: hide done panelzzzzzzzzzzzzzzzzzzzzzzzzzzz
        donePanel.style.display = "none";
        actionPanel.style.display = "block";

        // ✅ If PENDING → show full review actions
        if (status === "pending") {
        actionPanel.style.display = "block";
        donePanel.style.display = "none";
        }

        else if (status === "success" || status === "failed") {
        actionPanel.style.display = "none";
        donePanel.style.display = "flex";

        // Update bottom status text
        bottomStatus.textContent = status === "success" ? "Success" : "Failed";

        // Insert SVG icon inside the status span (before text)
        const svgIcon = status === "success" 
        ? statusSVGs.success 
        : statusSVGs.failed;

        statusSpan.innerHTML = `
        <span class="status-svg">${svgIcon}</span>
        Marked as
        `;

        }





        const actionWrapper = document.querySelector(".action-review-wrapper");

        // Toggle the active class based on status
        if (status === "success" || status === "failed") {
        actionWrapper.classList.add("active-review-done");
        } else {
        actionWrapper.classList.remove("active-review-done");
        }

        const freeXpInput = document.querySelector(".free-xp");
        if (freeXpInput) freeXpInput.value = "";



        const taskAttempts = r.task_attempts || [];


        const reviewTaskContainer = document.querySelector(".review-task");
        if (reviewTaskContainer) {
        renderReviewCards(taskAttempts, reviewTaskContainer, r);
        }
        allAddButtons.forEach(btn => btn.style.display = "inline-block");
        const rewards = r.subquest_rewards || [];
        console.log("First reward data:", rewards)

        CURRENT_USER_DATA = {
          completionId: r.completion_id,
          reviewId: r.task_review_id || reviewId,
          username: r.username,
          subquest: r.subquest,
          profilePic: r.profile_pic,
          hasPic: r.hasPic,

          level: r.level,
          currentXp: r.current_xp,
          nextLevelXp: r.next_level_xp,

          discord: r.discord_username,
          twitter: r.twitter_username,
          telegram: r.telegram_username,
          youtube: r.youtube_handle,

          adminDisplay: item.dataset.userInfo,

          joinedAt: r.joined_at || "N/A",
          recurrence: r.subquest_recurrence || "None",
          cooldown: r.subquest_cooldown,

          rewards: rewards,
          subquestUrl: r.subquest_url
        };

        // --------------- restore history -----------------
        const historyContainer = document.querySelector('.review-task .activity-container');
        if (historyContainer) {
        const reviewKey = `${CURRENT_USER_DATA.completionId}-${CURRENT_USER_DATA.reviewId}`;
        const cachedActivities = ACTIVITY_LOGS[reviewKey] || [];

        cachedActivities.forEach(act => {
        historyContainer.insertAdjacentHTML('beforeend', buildActivityHTML(act));
        });
        }

        const rewardsHTML = buildRewardsHTML(rewards);
        const rewardContainer = item.querySelector(".review-row.for-reward span.review-pill") || document.querySelector(".review-row.for-reward span.review-pill");
        if (rewardContainer) rewardContainer.innerHTML = rewardsHTML;
        // update crumbs
        if (subquestCrumb) subquestCrumb.textContent = CURRENT_USER_DATA.subquest || "—";
        if (usernameCrumb) usernameCrumb.textContent = CURRENT_USER_DATA.username || "—";
        if (usernameCrumbStrong) {
        usernameCrumbStrong.textContent = CURRENT_USER_DATA.username || "—";
        }
        // username
        if (userNamePanel) userNamePanel.textContent = CURRENT_USER_DATA.username;

        userAvatarContainer.innerHTML = "";

        const avatarImg = item.querySelector(".review-avatar img");

        if (avatarImg && avatarImg.src) {

          const img = document.createElement("img");
          img.src = avatarImg.src;
          img.alt = "avatar";

          userAvatarContainer.appendChild(img);

        } else {

          const fallback = document.createElement("div");
          fallback.className = "avatar-fallback";
          fallback.textContent =
            CURRENT_USER_DATA.username?.[0]?.toUpperCase() || "?";

          userAvatarContainer.appendChild(fallback);
        }

        if (avatarCommentDiv) {

          avatarCommentDiv.innerHTML = "";

          const avatarImg = item.querySelector(".review-avatar img");

          if (avatarImg && avatarImg.src) {

            const img = document.createElement("img");
            img.src = avatarImg.src;
            img.alt = "avatar";

            avatarCommentDiv.appendChild(img);

          } else {

            avatarCommentDiv.textContent =
              CURRENT_USER_DATA.username?.[0]?.toUpperCase() || "?";
          }
        }



        // XP & progress bar
        if (upiLevelSpan) upiLevelSpan.textContent = `Level ${CURRENT_USER_DATA.level}`;
        if (upiXpSpan) upiXpSpan.textContent = `${CURRENT_USER_DATA.currentXp} / ${CURRENT_USER_DATA.nextLevelXp} XP`;
        if (upiBarFill) {
        const percent = Math.min(100, Math.round((CURRENT_USER_DATA.currentXp / CURRENT_USER_DATA.nextLevelXp) * 100));
        upiBarFill.style.width = percent + "%";
        }

        // rewards
        // if (rewardRow) rewardRow.innerHTML = buildRewardHTML(CURRENT_USER_DATA.rewards);

        // misc details
        if (joinDateRow) joinDateRow.textContent = CURRENT_USER_DATA.joinedAt || "—";
        if (recurrenceRow) recurrenceRow.textContent = CURRENT_USER_DATA.recurrence || "None";
        if (cooldownRow) cooldownRow.textContent = CURRENT_USER_DATA.cooldown || "None";

        // mobile


        reviewCenter.scrollTop = 0;
      });
  
    });

    /* ===============================
      ✅ VIEW QUEST CLICK HANDLER
      Opens subquest URL in new tab
    =============================== */
    document.querySelector(".see-quest").addEventListener("click", () => {
      if (!CURRENT_USER_DATA.subquestUrl) {
        console.warn("No subquest URL found for this quest");
        return;
      }

    // ✅ TikTok-style popup
    const width = 450;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    const popup = window.open(
      CURRENT_USER_DATA.subquestUrl,
      "questWindow",
      `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,location=yes,status=no,resizable=yes,scrollbars=yes`
    );

    if (popup) {
      popup.focus();
    } else {
      alert("Please allow popups for this site to open the quest.");
    }
  });

  }




  function attachSearch(inputSelector, listSelector, noResultSelector) {
    const input = document.querySelector(inputSelector);
    const list = document.querySelector(listSelector);
    const noResult = document.querySelector(noResultSelector); // <-- existing div

    input.addEventListener("input", () => {
      const filter = input.value.toLowerCase();
      let visible = 0;

      list.querySelectorAll("li").forEach(item => {
        if (item.classList.contains("disabled")) return;

        const text = (item.querySelector("span")?.textContent || "").toLowerCase();
        const dataAttr = Array.from(item.attributes)
          .filter(a => a.name.startsWith("data-"))
          .map(a => a.value.toLowerCase())
          .join(" ");

        const searchString = text + " " + dataAttr;

        if (searchString.includes(filter)) {
          item.style.display = "";
          visible++;
        } else {
          item.style.display = "none";
        }
      });

      // 🔥 show/hide existing No result found
      noResult.style.display = visible === 0 ? "block" : "none";
    });
  }





  function MobileOnlicker() {
    const isMobilere = () => window.matchMedia("(max-width: 1113px)").matches;
    if (!isMobilere()) return;
    const reviewItems = Array.from(document.querySelectorAll(".review-item"));
    const reviewCenter = document.querySelector(".review-center");
 
    const arrowUp = document.querySelector(".arrow-btn.arrow-up");
    const arrowDown = document.querySelector(".arrow-btn.arrow-down");

    const getActiveIndex = () =>
      reviewItems.findIndex(item => item.classList.contains("active-review-item"));

    const activateItem = (index) => {
      if (index < 0 || index >= reviewItems.length) return;

      reviewItems.forEach(i => i.classList.remove("active-review-item"));
      const item = reviewItems[index];
      item.classList.add("active-review-item");

      const reviewFeed = document.querySelector(".review-feed .review-list");
      if (reviewFeed) {
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        const feedHeight = reviewFeed.offsetHeight;
        reviewFeed.scrollTop = itemTop - feedHeight / 2 + itemHeight / 2;
      }

      // ✅ Always scroll the review-task to the very top when switching
      const reviewTask = document.querySelector(".review-task");
      if (reviewTask) reviewTask.scrollTop = 0;

      // Trigger the click (loads main content)
      item.click();
    };

    arrowDown.addEventListener("click", () => {
      const currentIndex = getActiveIndex();
      const nextIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, reviewItems.length - 1);
      activateItem(nextIndex);
    });

    arrowUp.addEventListener("click", () => {
      const currentIndex = getActiveIndex();
      const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
      activateItem(prevIndex);
    });


 
 

    let lastTouchEnd = 0;

    document.addEventListener('touchend', function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault(); // prevent double-tap zoom
      }
      lastTouchEnd = now;
    }, false);
 


  }







  function toLocalDate(utcString) {
    // Handles "Z" (UTC) timestamps and ensures correct conversion
    const utcDate = new Date(utcString);
    const localOffsetMs = utcDate.getTimezoneOffset() * 60 * 1000;
    return new Date(utcDate.getTime() - localOffsetMs);
  }


  function parseUTC(dateString) {
    if (!dateString) return new Date();

    // If backend already includes timezone → use directly
    if (dateString.endsWith("Z") || dateString.includes("+")) {
      return new Date(dateString);
    }

    // Otherwise assume UTC and add Z
    return new Date(dateString + "Z");
  }


  
  function formatTimeAgo(date) {
    let seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 0) seconds = 0; // prevent negatives

    if (seconds < 5) return "just now";

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  }



  setInterval(() => {
    document.querySelectorAll('.activity-item[data-timestamp]').forEach(item => {
      const timestamp = item.getAttribute('data-timestamp');
      if (!timestamp) return;
      const localDate = toLocalDate(timestamp);
      const timeText = formatTimeAgo(localDate);
      const timeEl = item.querySelector('.activity-time');
      if (timeEl) timeEl.textContent = timeText;
    });
  }, 30 * 1000);







  function updateReviewPanel(status) {
      const actionWrapper = document.querySelector(".action-review-wrapper");
      const actionPanel = document.querySelector(".review-actions");
      const donePanel = document.querySelector(".review-done-content");
      const bottomStatus = donePanel.querySelector(".bottom-status");
      const reviewDoneStatus = donePanel.querySelector(".review-done-status");

      // Show/hide panels
      actionPanel.style.display = status === "pending" ? "block" : "none";
      donePanel.style.display = status === "pending" ? "none" : "flex";

      // Update bottom status text
      bottomStatus.textContent =
          status === "success" ? "Success" :
          status === "failed" ? "Failed" :
          "Pending";

      // Update SVG inside done status
      const svg = status === "success"
          ? statusSVGs.success
          : status === "failed"
          ? statusSVGs.failed
          : statusSVGs.pending;

      reviewDoneStatus.innerHTML = `
          <span class="status-svg">${svg}</span>
          Marked as
      `;

      // ✅ Toggle 'active' class on wrapper
      if (status === "success" || status === "failed") {
          actionWrapper.classList.add("active-review-done");
      } else {
          actionWrapper.classList.remove("active-review-done");
      }
  }



  function updateReviewItem(completionId, status) {
      const reviewItem = Array.from(document.querySelectorAll('.review-item'))
          .find(item =>
              item.dataset.completionId == completionId
          );


      if (reviewItem) {
          const svgContainer = reviewItem.querySelector('.review-ago');
          const oldTimeText = svgContainer.querySelector('span')?.textContent || '';

          const svgKey = status === 'success' ? 'success'
                        : status === 'failed' ? 'failed'
                        : 'pending';

          svgContainer.innerHTML = statusSVGs[svgKey] + `<span>${oldTimeText}</span>`;

          // ✅ Update the data-status attribute
          reviewItem.dataset.status = status;
      }
  }


  function buildActivityHTML(act) {
      const timeAgo = formatTimeAgo(parseUTC(act.timestamp));

      // === Decide main SVG ===
      let mainSVG = activitySVGs.pending;
      if (act.status === 'success') mainSVG = act.star ? activitySVGs.star : activitySVGs.success;
      else if (act.status === 'failed') mainSVG = act.flag ? activitySVGs.flag : activitySVGs.failed;

      // === Build user label + inline icons ===
      let userIcons = '';
      if (act.status === 'success' && act.star) userIcons += activitySVGs.star;
      if (act.flag) userIcons += activitySVGs.flag;

      const userLabel = `<span class="activity-user" style="display:inline-flex; align-items:center; gap:2px;">${act.reviewer}</span>`;

      // === Build message ===
      let activityMessage = '';
      if (act.status === 'success') {
          if (act.star && act.free_xp > 0)
              activityMessage = `${userLabel} reviewed with success, awarded a star, and gave ${act.free_xp} XP in bonus.`;
          else if (act.star)
              activityMessage = `${userLabel} reviewed with success and awarded a star.`;
          else if (act.free_xp > 0)
              activityMessage = `${userLabel} reviewed with success and gave ${act.free_xp} XP in bonus.`;
          else
              activityMessage = `${userLabel} reviewed with success.`;
      } else if (act.status === 'failed') {
          if (act.flag && (act.star || act.free_xp > 0))
              activityMessage = `${userLabel} reviewed with <span class="status-text">fail</span>, marked as flagged, and removed rewards.`;
          else if (act.flag)
              activityMessage = `${userLabel} reviewed with <span class="status-text">fail</span> and marked as flagged.`;
          else
              activityMessage = `${userLabel} reviewed with <span class="status-text">fail</span>.`;
      } else if (act.status === 'pending') {
          activityMessage = `${userLabel} changed status to <span class="status-text">pending</span>.`;
      }

      return `
          <div class="activity-item" data-timestamp="${act.timestamp}">
              <div class="avatar-svg">${mainSVG}</div>
              <div class="activity-content">
                  <span class="activity-message">${activityMessage}</span>
                  <span class="activity-time">${timeAgo}</span>
                  ${act.comment ? `<div class="activity-comment" style="color:#c8c8d6; font-size:12.5px;">Comment: ${act.comment}</div>` : ''}
              </div>
          </div>
      `;
  }



  function Callspadeinitreview() {
    const actionPanel = document.querySelector(".review-actions");
    const donePanel = document.querySelector(".review-done-content");
    const bottomStatus = document.querySelector(".bottom-status");
    const reviewDoneStatus = document.querySelector(".review-done-status");
    const undoBtn = document.getElementById("undo-review");
      const deleteButtons = document.querySelectorAll(
          ".status-delete, .quest-delete, .username-delete, .reviewer-delete"
      );

      deleteButtons.forEach(btn => {
          btn.addEventListener("click", function () {

              let bar =
                  this.closest(".status-bar") ||
                  this.closest(".quest-bar") ||
                  this.closest(".username-bar") ||
                  this.closest(".reviewer-bar");

              if (!bar) return;

              // hide the bar
              bar.style.display = "none";

              // get type name
              const filterType = bar.id
                  .replace("for-", "")
                  .replace("-select", "");

              // uncheck all checkboxes for this filter type
              let selector = "";
              switch(filterType) {
                  case "status": selector = ".status-list input[type='checkbox']"; break;
                  case "quest": selector = ".quest-list input[type='checkbox']"; break;
                  case "username": selector = ".username-list input[type='checkbox']"; break;
                  case "reviewer": selector = ".reviewer-list input[type='checkbox']"; break;
              }

              document.querySelectorAll(selector).forEach(cb => {
                  cb.checked = false;
                  const li = cb.closest("li");
                  if (li) li.classList.remove("selected");
              });

              // clear selectionOrder
              selectionOrder[filterType] = [];

              // clear text in middle section
              const mid = bar.querySelector(".middle");
              if (mid) mid.textContent = "";

              // remove from activation order
              barActivationOrder = barActivationOrder.filter(b => b !== filterType);

              // update UI & filters
              updateFilterUI();
              filterAllReviewItems();
          });
      });

    const clearBtn = document.getElementById("clear-all-filter");

    clearBtn.addEventListener("click", () => {

      // 1️⃣ Hide all filter bars
      const bars = document.querySelectorAll(".status-bar, .quest-bar, .username-bar, .reviewer-bar");
      bars.forEach(bar => {
        bar.style.display = "none";
        const mid = bar.querySelector(".middle");
        if (mid) mid.textContent = "";
      });

      // 2️⃣ Uncheck all checkboxes and remove "selected" class
      const allCheckboxes = document.querySelectorAll(
        ".status-list input[type='checkbox'], " +
        ".quest-list input[type='checkbox'], " +
        ".username-list input[type='checkbox'], " +
        ".reviewer-list input[type='checkbox']"
      );
      allCheckboxes.forEach(cb => {
        cb.checked = false;
        const li = cb.closest("li");
        if (li) li.classList.remove("selected");
      });

      // 3️⃣ Clear selectionOrder for all types
      selectionOrder.status = [];
      selectionOrder.quest = [];
      selectionOrder.username = [];
      selectionOrder.reviewer = [];

      // 4️⃣ Clear activation order
      barActivationOrder = [];

      // 5️⃣ Update UI & filter items
      updateFilterUI();
      filterAllReviewItems();
    });

    const modalforreview = document.getElementById('feedback-modal');
    const btn = document.getElementById('feedback-show'); // match your HTML ID

    if(btn) {
        btn.addEventListener('click', () => {
            modalforreview.style.display = 'flex';
        });
    }

    // Hide modal when clicking outside the popup
    modalforreview.addEventListener('click', (e) => {
        if (e.target === modalforreview) {
            modalforreview.style.display = 'none';
        }
    });

    // Fill textarea when clicking suggestions
    const suggestionsContainer = document.querySelector(".feedback-suggestions");
    const textarea = document.querySelector("#review-comment");

    if(suggestionsContainer && textarea) {
        suggestionsContainer.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("suggestion")) {
                textarea.value = target.textContent.trim();
                textarea.focus();
                modalforreview.style.display = 'none';
            }
        });
    }



undoBtn?.addEventListener('click', async () => {

  const completionId = CURRENT_USER_DATA?.completionId;
  const reviewId = CURRENT_USER_DATA?.reviewId;
  console.log("UNDO DATA:", completionId);

  if (!completionId || !reviewId) {
    showError("No review selected!");
    return;
  }

  try {

    const response = await fetch(
      `/api/subquest_review/${completionId}/${reviewId}`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ status: "pending" })
      }
    );

    // 🔥 check HTTP status first
    if (!response.ok) {
      const text = await response.text();
      showToast("HTTP Error:", response.status, text);
      showError("Server error while undoing review.");
      return;
    }

    // 🔥 safe JSON parse
    let result;
    try {
      result = await response.json();
    } catch (e) {
      showToast("Invalid JSON:", e);
      showError("Invalid server response.");
      return;
    }

    if (!result.success) {
      showError(result.error || "Operation failed.");
      return;
    }

    // ======================
    // SUCCESS UI UPDATE
    // ======================

    updateReviewPanel("pending");
    updateReviewBadgeDelta(+1);
    updateReviewItem(completionId, "pending");
    syncReviewState(completionId, "pending");
    delete REVIEW_CACHE[completionId];

    const act = {
      timestamp: result.updated_at,
      reviewer: result.reviewer_username || 'User',
      status: "pending",
      comment: null,
      star: false,
      free_xp: 0,
      flag: false
    };

    const reviewKey = `${completionId}-${reviewId}`;
    if (!ACTIVITY_LOGS[reviewKey]) ACTIVITY_LOGS[reviewKey] = [];
    ACTIVITY_LOGS[reviewKey].push(act);

    let historyContainer = document.querySelector('.review-task .activity-container');

    if (!historyContainer) {
      historyContainer = document.createElement('div');
      historyContainer.className = 'activity-container';
      document.querySelector('.review-task').appendChild(historyContainer);
    }

    historyContainer.insertAdjacentHTML(
      'beforeend',
      buildActivityHTML(act)
    );


  } catch (err) {

    console.error("Network/JS Error:", err);

    showError(
      "An unexpected error occurred. Please check your internet connection."
    );

  }


});


    document.querySelectorAll('.review-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const completionId = CURRENT_USER_DATA?.completionId;
            const reviewId = CURRENT_USER_DATA?.reviewId;

            if (!completionId || !reviewId) return alert("No review selected!");

            const status = btn.id === 'pass-user' ? 'pass' : 'fail';
            const commentEl = document.getElementById('review-comment');
            const comment = commentEl?.value.trim() || null;
            const starActive = document.querySelector(".free-xp-star")?.classList.contains("active") || false;
            const flagActive = document.querySelector(".flag--user")?.classList.contains("active-flag") || false;
            const freeXpValue = starActive ? (parseInt(document.querySelector(".free-xp")?.value) || 0) : 0;

            try {
              const response = await fetch(`/api/subquest_review/${completionId}/${reviewId}`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrfToken
                },
                body: JSON.stringify({
                  status,
                  comment,
                  star: starActive,
                  free_xp: freeXpValue,
                  flag: flagActive
                })
              });

              const result = await response.json();
              if (!result.success) return showToast(`Error: ${result.error}`);

              updateReviewPanel(result.review_status);
              if (result.review_status === "success" || result.review_status === "failed") {
                updateReviewItem(completionId, result.review_status);
              }
              updateReviewBadgeDelta(-1);
              delete REVIEW_CACHE[completionId];
              syncReviewState(completionId, result.review_status);
              if ((result.review_status === "success" || result.review_status === "failed") && result.comment) {
                const feedbackContainer = document.querySelector("#feedback-modal .feedback-suggestions");
                if (feedbackContainer) {
                  const newSuggestion = document.createElement("div");
                  newSuggestion.className = "suggestion";
                  newSuggestion.textContent = result.comment;
                  feedbackContainer.insertBefore(newSuggestion, feedbackContainer.firstChild);
                }
              }
              // === Extract returned data ===
              const reviewStatus = result.review_status;
              const starGiven = result.star;
              const bonusXP = result.free_xp;
              const flagged = result.flag;
              const updatedAt = result.updated_at;
              const reviewerUsername = result.reviewer_username || 'User';
              const timeAgo = formatTimeAgo(parseUTC(updatedAt));

              let activitySVG = activitySVGs.pending;
              let activityMessage = '';

              // === SVG + message logic ===
              if (reviewStatus === 'success') {
                // ⭐ If a star is given, replace main SVG with the star
                activitySVG = starGiven ? activitySVGs.star : activitySVGs.success;

                // Build username + inline star/flag icons
                let userIcons = '';
                if (starGiven) userIcons += activitySVGs.star;
                if (flagged) userIcons += activitySVGs.flag;

                const userLabel = `<span class="activity-user">${reviewerUsername}</span>`;

                if (starGiven && bonusXP > 0) {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">success</span>, awarded a star, and gave ${bonusXP} XP in bonus.`;
                } else if (starGiven && bonusXP === 0) {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">success</span> and awarded a star.`;
                } else if (!starGiven && bonusXP > 0) {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">success</span> and gave ${bonusXP} XP in bonus.`;
                } else {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">success</span>.`;
                }

              } else if (reviewStatus === 'failed') {
                activitySVG = flagged ? activitySVGs.flag : activitySVGs.failed;

                let userIcons = '';
                if (flagged) userIcons += activitySVGs.flag;
                const userLabel = `<span class="activity-user">${reviewerUsername}</span>`;

                if (flagged && (starGiven || bonusXP > 0)) {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">fail</span>, marked as flagged, and removed rewards.`;
                } else if (flagged) {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">fail</span> and marked as flagged.`;
                } else {
                  activityMessage = `${userLabel} reviewed with <span class="status-text">fail</span>.`;
                }

              } else if (reviewStatus === 'pending') {
                activitySVG = activitySVGs.pending;
                const userLabel = `<span class="activity-user">${reviewerUsername}</span>`;
                activityMessage = `${userLabel} changed status to <span class="status-text">pending</span>.`;
              }

              // === Build HTML ===
              const newActivityHTML = `
                <div class="activity-item" data-timestamp="${updatedAt}">
                  <div class="avatar-svg">${activitySVG}</div>
                  <div class="activity-content">
                    <span class="activity-message">${activityMessage}</span>
                    <span class="activity-time">${timeAgo}</span>
                    ${
                      comment
                        ? `<div class="activity-comment" style="color:#c8c8d6; font-size:12.5px;">Comment: ${comment}</div>`
                        : ''
                    }
                  </div>
                </div>
              `;

              // === Insert into history container ===
              const reviewKey = `${completionId}-${reviewId}`;
              if (!ACTIVITY_LOGS[reviewKey]) ACTIVITY_LOGS[reviewKey] = [];
              ACTIVITY_LOGS[reviewKey].push({
                timestamp: updatedAt,
                reviewer: reviewerUsername,
                status: reviewStatus,
                comment: comment || '',
                star: starGiven,
                free_xp: bonusXP,
                flag: flagged
              });

              let historyContainer = document.querySelector('.review-task .activity-container');
              if (!historyContainer) {
                historyContainer = document.createElement('div');
                historyContainer.className = 'activity-container';
                document.querySelector('.review-task').appendChild(historyContainer);
              }

              historyContainer.insertAdjacentHTML('beforeend', newActivityHTML);

              // === Clear comment box ===
              if (commentEl) commentEl.value = '';

            } catch (err) {
              console.error(err);
              alert('An unexpected error occurred, Please check your internet connection.');
            }


        });
    });

    attachFilterListeners(".status-list", "status");
    attachFilterListeners(".quest-list", "quest");
    attachFilterListeners(".username-list", "username");
    attachFilterListeners(".reviewer-list", "reviewer");

    document.getElementById("clear-all-filter").addEventListener("click", clearAllFilters);

    filterAllReviewItems();
    updateFilterUI();


    const hideBtn = document.querySelector(".hide-profile-info");
    const showBtn = document.querySelector(".show-profile-info");
    const reviewDetails = document.querySelector(".review-details");
    const reviewApp = document.querySelector(".review-app");

    // Make sure all elements exist
    if (!hideBtn || !showBtn || !reviewDetails || !reviewApp) return;

    const communityId = reviewApp.dataset.communityId; 

  
    const saveState = async (visible) => {
      try {
        await fetch("/save_userinfo_state", {
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
      reviewDetails.style.display = "none";
      hideBtn.style.display = "none";
      showBtn.style.display = "flex";

      reviewApp.style.gridTemplateColumns = "370px 1fr";

      saveState(false);
    });

    showBtn.addEventListener("click", () => {
      reviewDetails.style.display = "flex";
      showBtn.style.display = "none";
      hideBtn.style.display = "flex";

      reviewApp.style.gridTemplateColumns = "370px minmax(0,1fr) 360px";

      saveState(true);
    });
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      let timer;

      el.addEventListener('mouseenter', () => {
        timer = setTimeout(() => {
          el.classList.add('show-tooltip');
        }, 600); // 3 seconds
      });

      el.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        el.classList.remove('show-tooltip');
      });
    });
  }



  const selectionOrder = {
    status: [],
    quest: [],
    username: [],
    reviewer: []
  };

  // Track which bar was first activated
  let barActivationOrder = [];

  /* ---------------------------
    Update Filter UI
  --------------------------- */
  function updateFilterUI() {

  const container = document.querySelector(".filter-reviews-conatiner");
  const listContainer = document.querySelector(".functional-list");

    const dropdownBtns = document.querySelectorAll("#show-review-item-dropdown");
    const clearBtn = document.getElementById("clear-all-filter");

      const bars = {
        status: document.getElementById("for-status-select"),
        quest: document.getElementById("for-quest-select"),
        username: document.getElementById("for-username-select"),
        reviewer: document.getElementById("for-reviewer-select")
      };


    // Update each bar's content
    Object.keys(bars).forEach(type => {
      const bar = bars[type];
      const selection = selectionOrder[type];
      const middleSection = bar.querySelector(`.${type}-section.middle`);

      if (selection.length > 0) {
        bar.style.display = "flex";
        middleSection.textContent = selection.join(", ");

        if (!barActivationOrder.includes(type)) barActivationOrder.push(type);
      } else {
        bar.style.display = "none";
        middleSection.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        barActivationOrder = barActivationOrder.filter(b => b !== type);
      }
    });

    // Reorder bars in container according to activation order
    barActivationOrder.forEach(type => {
      const bar = bars[type];
      listContainer.appendChild(bar);

    });

    // Container & clear button
    if (selectionOrder.status.length || selectionOrder.quest.length || selectionOrder.username.length || selectionOrder.reviewer.length) {
      container.style.display = "flex";
      clearBtn.style.display = "inline-flex";
      dropdownBtns.forEach(btn => btn.style.display = "none");
    } else {
      container.style.display = "none";
      clearBtn.style.display = "none";
      dropdownBtns.forEach(btn => btn.style.display = "block");
      barActivationOrder = [];
    }
  }

  /* ---------------------------
    Attach Listeners
  --------------------------- */
  function attachFilterListeners(listSelector, type) {
    const list = document.querySelector(listSelector);
    if (!list) return;

    list.addEventListener("click", e => {
      const li = e.target.closest("li");
      if (!li || li.classList.contains("disabled") || li.classList.contains("no-results")) return;

      const checkbox = li.querySelector("input[type='checkbox']");
      if (!checkbox) return;

      checkbox.checked = !checkbox.checked;
      li.classList.toggle("selected", checkbox.checked);

      const value = li.querySelector("label + span")?.textContent.trim();

      // Only track selectionOrder for status / quest / username
      if (["status", "quest", "username", "reviewer"].includes(type) && value) {
        if (checkbox.checked) {
          if (!selectionOrder[type].includes(value)) selectionOrder[type].push(value);
        } else {
          selectionOrder[type] = selectionOrder[type].filter(v => v !== value);
        }
      }

      filterAllReviewItems();
      updateFilterUI();
    });
  }


  /* ---------------------------
    Clear All Filters
  --------------------------- */
  function clearAllFilters() {
    document.querySelectorAll(
      ".status-list input[type='checkbox'], .quest-list input[type='checkbox'], .username-list input[type='checkbox'], .reviewer-list input[type='checkbox']"
    ).forEach(cb => cb.checked = false);

    document.querySelectorAll(
      ".status-list li.selected, .quest-list li.selected, .username-list li.selected, .reviewer-list li.selected"
    ).forEach(li => li.classList.remove("selected"));

    selectionOrder.status = [];
    selectionOrder.quest = [];
    selectionOrder.username = [];
    barActivationOrder = [];

    filterAllReviewItems();
    updateFilterUI();
  }

  /* ---------------------------
    Get first active bar for filtering order
  --------------------------- */
  function getFirstActiveBar() {
    return barActivationOrder[0] || null;
  }

  /* ---------------------------
    Filter Reviews Based on Selection
  --------------------------- */
  function filterAllReviewItems() {

    const reviewItems = document.querySelectorAll(".review-item");

    const selectedStatuses = selectionOrder.status.map(s => s.toLowerCase());
    const selectedUsernames = selectionOrder.username.map(u => u.toLowerCase());
    const selectedReviewers = Array.from(
        document.querySelectorAll(".reviewer-list li.selected")
    ).map(li => (li.dataset.reviewerName || "").toLowerCase());

    const selectedSubquests = selectionOrder.quest.map(q => q.toLowerCase());

    const firstBar = getFirstActiveBar();


    reviewItems.forEach(item => {

      const id = Number(item.dataset.completionId);
      const meta = REVIEW_META.get(id);

      if (!meta) return;

      const status = meta.status;
      const username = meta.username;
      const reviewer = meta.reviewer;
      const subquest = meta.subquest;

      const statusMatch =
          selectedStatuses.length === 0 || selectedStatuses.includes(status);

      const usernameMatch =
          selectedUsernames.length === 0 || selectedUsernames.includes(username);

      const reviewerMatch =
          selectedReviewers.length === 0 || selectedReviewers.includes(reviewer);

      const subquestMatch =
          selectedSubquests.length === 0 || selectedSubquests.includes(subquest);

      let show =
          statusMatch &&
          usernameMatch &&
          reviewerMatch &&
          subquestMatch;

      // priority bar logic
      if (firstBar === "status") show = show && statusMatch;
      else if (firstBar === "quest") show = show && subquestMatch;
      else if (firstBar === "username") show = show && usernameMatch;

      item.style.display = show ? "" : "none";

    });
  }





  function LoadCommentOutside() {
      const suggestionsContainer = document.querySelector(".feedback-suggestions");
      const searchInput = document.querySelector(".feedback-input");
      const noResultDiv = document.querySelector(".no-result-feedback");

      // Delay 4 seconds to fetch community comments
      setTimeout(() => {
          fetch(`/api/community/${communitySlug}/comments`)
              .then(res => res.json())
              .then(data => {
                  if (!data || data.length === 0) return;

                  // Loop from last to first to prepend correctly
                  for (let i = data.length - 1; i >= 0; i--) {
                      const comment = data[i];
                      if (!comment.comment) continue; // skip empty comments
                      const div = document.createElement("div");
                      div.className = "suggestion";
                      div.textContent = comment.comment;

                      suggestionsContainer.prepend(div); // newest on top
                  }
              })
              .catch(err => console.error("Error fetching comments:", err));
      }, 4000);

      // Filter suggestions as user types
      searchInput.addEventListener("input", () => {
          const query = searchInput.value.toLowerCase().trim();
          let visibleCount = 0;

          document.querySelectorAll(".feedback-suggestions .suggestion").forEach(s => {
              if (s.textContent.toLowerCase().includes(query)) {
                  s.style.display = "block";
                  visibleCount++;
              } else {
                  s.style.display = "none";
              }
          });

          // Show or hide the no result message inside suggestions
          noResultDiv.style.display = visibleCount === 0 && query !== "" ? "block" : "none";
      });
  }



  function CalledOutsideooo() {
    const reviewList = document.querySelector('.review-list');
    const reviewFeedTop = document.querySelector('.review-feed-top');
    const reviewApp = document.querySelector('.review-app');

    const isMobile = () => window.matchMedia("(max-width: 1112px)").matches;

 



    const modal = document.getElementById("exportReviewsModal");
    const openBtn = document.getElementById("openExportModal");
    const closeBtn = modal.querySelector(".close");
    const sendBtn = document.getElementById("sendExport");
    const statusEl = document.getElementById("statusMessage");

    openBtn.onclick = () => modal.classList.add("show");
    closeBtn.onclick = () => modal.classList.remove("show"); 
    window.onclick = (event) => { if(event.target == modal) modal.classList.remove("show"); }

    sendBtn.addEventListener("click", async () => {
      statusEl.style.display = "block";
      statusEl.textContent = "Sending...";
      statusEl.className = "status";

      try {
        const response = await fetch(`/api/export_reviews/${communitySlug}`);
        const data = await response.json();

        if(data.success){
          statusEl.textContent = data.message;
          statusEl.classList.add("success");
        } else {
          statusEl.textContent = "Failed to send reviews.";
          statusEl.classList.add("error");
        }
      } catch(err){
        console.error(err);
        statusEl.textContent = "Error sending reviews.";
        statusEl.classList.add("error");
      }
    });

  }
  
  document.addEventListener("click", () => {
    if (divers) {
      divers.style.display = "none";
      divers.classList.remove("show");      
    }  

  });

  window.ReviewsModule = {
    init: initReviewinit
  };

})();