(function () {
let controller = null;

async function LetsitQuestUp() {
  controller?.abort();
  controller = new AbortController();
  document.addEventListener("click", async (e) => {
    const claimBtn = e.target.closest("#claim-task");
    if (!claimBtn) return;

    if (claimBtn.hasAttribute("disabled")) return;

    claimBtn.setAttribute("disabled", "true");
    claimBtn.style.cursor = "wait";

    const subquestId = claimBtn.dataset.subquestId;

    handleClaim(subquestId, claimBtn);
  }, { signal: controller.signal });
  renderQuestSkeleton(4);

  const mode = detectSprintMode();
  window.__SPRINT_MODE__ = mode;

  await loadAllQuests();

  // ✅ now DOM exists
  setSprintModeUI(mode);
}



window.__SPRINT_MODE__ = "all";
window.__QUEST_FILTER_STATE__ = {}; 
window.__SCROLL_MEMORY__ = {
  all: 0,
  sprint: 0
};






  window.__QUEST_MODE__ = "{{ quest_mode }}";
function detectSprintMode(){
  if (window.__QUEST_MODE__) return window.__QUEST_MODE__;

  const path = window.location.pathname.replace(/\/+$/, "");
  if (path.endsWith("/quest/sprint")) return "sprint";
  return "all";
}

window.copyInviteLink = copyInviteLink

async function copyInviteLink(btn) {
  const link = btn.dataset.copyLink;
  if (!link) return;

  try {
    await navigator.clipboard.writeText(link);

    const originalText = btn.innerText;
    btn.innerText = "Copied";

    setTimeout(() => {
      btn.innerText = originalText;
    }, 1500);

  } catch (err) {
    console.error("Copy failed:", err);
  }
}

function updateURL(mode){

  const slug = communitySlug;
  const path = window.location.pathname.replace(/\/+$/, "");

  // 🔥 If inside quest/subquest route → DO NOT TOUCH URL
  // pattern: /slug/quest/<uuid>/<uuid>
  const deepRoutePattern = new RegExp(`^/${slug}/quest/[^/]+/[^/]+$`);

  if (deepRoutePattern.test(path)) {
    return; // ⛔ stop URL rewriting
  }

  // normal list routes only
  let newPath = `/${slug}/quest`;

  if (mode === "sprint") {
    newPath = `/${slug}/quest/sprint`;
  }

  // 🔥 only push if different
  if (newPath !== path) {
    window.history.pushState({ sprint: mode }, "", newPath);
  }
}

function saveScrollPosition(){
  const panel = document.getElementById("quests-root"); // right-panel
  if(!panel) return;

  window.__SCROLL_MEMORY__[window.__SPRINT_MODE__] = panel.scrollTop;
}

function restoreScrollPosition(mode){
  const panel = document.getElementById("quests-root");
  if(!panel) return;

  const pos = window.__SCROLL_MEMORY__[mode] || 0;

  requestAnimationFrame(()=>{
    panel.scrollTop = pos;
  });
}




window.addEventListener("popstate", (e)=>{
  const mode = detectSprintMode();
  window.__SPRINT_MODE__ = mode;
  setSprintModeUI(mode);
});

function handleSprintEmptyState(){
  const root = document.getElementById("quests-root");
  const ModuleNav = document.querySelector(".module-nav-bar");

  // check visible modules
  const visibleModules = [...document.querySelectorAll(".all-content")]
    .filter(m => !m.classList.contains("module-hidden"));

  let emptyBox = document.getElementById("sprint-empty-state");

  // ===== NOTHING VISIBLE =====
  if (visibleModules.length === 0 && window.__SPRINT_MODE__ === "sprint") {

    // 🔥 hide module nav
    if (ModuleNav) ModuleNav.style.display = "none";

    if (!emptyBox) {
      emptyBox = document.createElement("div");
      emptyBox.id = "sprint-empty-state";
      emptyBox.className = "sprint-empty-state";

      emptyBox.innerHTML = `
        <div class="sprint-empty-image-wrap">
          <img 
            src="http://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/5/channels/21/6dd99c1a-8114-4b01-b54e-52ecdbf2af1a.png"
            class="sprint-empty-image"
            alt="Empty sprint"
          />
        </div>
      `;

      root.appendChild(emptyBox);
    }

  } 
  // ===== SOMETHING VISIBLE =====
  else {

    // 🔥 show module nav again
    if (ModuleNav) ModuleNav.style.display = "";

    if (emptyBox) emptyBox.remove();
  }
}


function applySprintFilter(mode){

  // ✅ SAVE CURRENT MODE SCROLL
  saveScrollPosition();

  window.__SPRINT_MODE__ = mode;

  const wrapper = document.querySelector(".sprint-view-wrapper");
  const modules = document.querySelectorAll(".all-content");

  modules.forEach(module => {
    const subquests = module.querySelectorAll(".preview-box");

    let sprintCount = 0;

    subquests.forEach(box => {
      const questUUID = box.dataset.quest;
      const subUUID   = box.dataset.subquest;

      const quest = window.__QUEST_CACHE__?.find(q => q.uuid === questUUID);
      if (!quest) return;

      const sq = quest.subquests.find(s => s.uuid === subUUID);
      if (!sq) return;

      if (mode === "all") {
        box.classList.remove("sprint-hidden");
        return;
      }

      if (sq.is_in_current_sprint) {
        box.classList.remove("sprint-hidden");
        sprintCount++;
      } else {
        box.classList.add("sprint-hidden");
      }
    });

    if (mode === "sprint") {
      if (sprintCount === 0) {
        module.classList.add("module-hidden");
      } else {
        module.classList.remove("module-hidden");
      }
    } else {
      module.classList.remove("module-hidden");
    }
  });

  syncModuleNavWithSprint();   
  handleSprintEmptyState();
  updateURL(mode); 

  // ✅ RESTORE SCROLL FOR NEW MODE
  syncMobileModuleActive();

  restoreScrollPosition(mode);
}




function showGlobalEmptyState(){
  const root = document.getElementById("quests-root");


    emptyBox = document.createElement("div");
    emptyBox.id = "sprint-empty-state";
    emptyBox.className = "sprint-empty-state";

    emptyBox.innerHTML = `
      <div class="sprint-empty-image-wrap">
        <img 
          src="http://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/5/channels/21/6dd99c1a-8114-4b01-b54e-52ecdbf2af1a.png"
          class="sprint-empty-image"
          alt="Empty state"
        />
      </div>
    `;

    root.appendChild(emptyBox);
}


function initSprintSwipe(){
  if (window.innerWidth > 767) return;

  const root = document.getElementById("quests-root");
  if (!root) return;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let dragging = false;
  let isSwipe = false;

  const SWIPE_START_THRESHOLD = 12;   // px before it's considered a swipe
  const SWIPE_TRIGGER = 60;           // px to trigger mode change

  // zones where swipe must NOT trigger sprint switching
  function isBlockedArea(target){
    return (
      target.closest(".sprint-switch-wrap") ||
      target.closest(".module-nav-bar")
    );
  }

  root.addEventListener("touchstart", e=>{
    if (isBlockedArea(e.target)) return; // ❌ block

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = startX;
    dragging = true;
    isSwipe = false;
  }, { passive: true });

  root.addEventListener("touchmove", e=>{
    if (!dragging) return;
    if (isBlockedArea(e.target)) return; // ❌ block

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const dx = x - startX;
    const dy = y - startY;

    // Only treat as swipe if horizontal intent is clear
    if (!isSwipe) {
      if (Math.abs(dx) > SWIPE_START_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        isSwipe = true;   // ✅ confirmed horizontal swipe
      } else {
        return; // still scroll / tap
      }
    }

    currentX = x;
  }, { passive: true });

  root.addEventListener("touchend", ()=>{
    if (!dragging) return;
    dragging = false;

    if (!isSwipe) return; // tap / scroll → ignore

    const diff = currentX - startX;

    if (diff < -SWIPE_TRIGGER) {
      // swipe left → sprint
      setSprintModeUI("sprint");
    } 
    else if (diff > SWIPE_TRIGGER) {
      // swipe right → all
      setSprintModeUI("all");
    }
  });
}




function setSprintModeUI(mode){
  const tabs = document.querySelectorAll(".sprint-tab");
  const pill = document.querySelector(".sprint-pill");

  tabs.forEach((t,i)=>{
    if(t.dataset.mode === mode){
      t.classList.add("active");
      pill.style.transform = `translateX(${i * 100}%)`;
    }else{
      t.classList.remove("active");
    }
  });

  // 🔥 sync URL

  applySprintFilter(mode);
}



async function scrollToSubquestByUUID(subquestUUID) {
  if (!subquestUUID) return;

  // ✅ real scroll container
  const container = document.querySelector(".right-panel"); // #quests-root parent
  if (!container) return;

  // ✅ target by uuid
  const target = container.querySelector(
    `.preview-box[data-subquest="${subquestUUID}"]`
  );

  if (!target) {
    console.warn("❌ Subquest not found for scroll:", subquestUUID);
    return;
  }

  // Remove old highlights
  container.querySelectorAll(".flash-highlight").forEach(el => {
    el.classList.remove("flash-highlight");
  });

  // Geometry-based scroll (layout-safe)
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const scrollTop =
    container.scrollTop +
    (targetRect.top - containerRect.top) -
    container.clientHeight / 2 +
    target.clientHeight / 2;

  container.scrollTo({
    top: scrollTop,
    behavior: "smooth"
  });

  // Highlight
  requestAnimationFrame(() => {
    target.classList.add("flash-highlight");

    setTimeout(() => {
      target.classList.remove("flash-highlight");
    }, 1200);
  });
}

function getLayoutRoot(){
  return document.querySelector(".module-nav-displayer");
}


function showGlobalEmptyState() {
  const root = document.getElementById("quests-root");

  root.innerHTML = `
    <div class="empty-state">
      
      <div class="empty-svg">
        <svg viewBox="0 0 200 200">
          
          <!-- orbit circle -->
          <circle cx="100" cy="100" r="60" class="orbit"></circle>

          <!-- moving dot -->
          <circle cx="100" cy="40" r="6" class="dot"></circle>

          <!-- center pulse -->
          <circle cx="100" cy="100" r="12" class="pulse"></circle>

        </svg>
      </div>

      <h3>No quests yet</h3>
      <p>When quests are created, they’ll show up here.</p>

    </div>
  `;
}


async function loadAllQuests() {
  const root = document.getElementById("quests-root");

  const res = await fetch(`/api/quests/${communitySlug}`);
  const data = await res.json();

  // ✅ DEFINE CACHE
  window.__QUEST_CACHE__ = data.data || [];
  const navDisplayer = document.querySelector(".module-nav-displayer");
  if (navDisplayer) {
    navDisplayer.innerHTML = "";
  }
  root.innerHTML = "";
  if (window.__QUEST_CACHE__.length === 0) {

    showGlobalEmptyState();           
    return;                              
  }


  if (!Array.isArray(window.__QUEST_CACHE__)) {
    console.error("Invalid API response:", data);
    return;
  }

  const isMobile = window.innerWidth <= 767;

  /* ============================
     📱 MOBILE LAYOUT
  ============================ */
  if (isMobile) {

    // sprint switch first
    root.appendChild(renderSprintSwitch());

    // quests
    // animated container
    const wrapper = document.createElement("div");
    wrapper.className = "sprint-view-wrapper mode-all";

    const allView = document.createElement("div");
    allView.className = "sprint-view sprint-view-all";

    const sprintView = document.createElement("div");
    sprintView.className = "sprint-view sprint-view-sprint";

    // render same quests into both
    window.__QUEST_CACHE__.forEach(quest => {
      allView.appendChild(renderQuest(quest));
      sprintView.appendChild(renderQuest(quest));
    });

    wrapper.appendChild(allView);
    wrapper.appendChild(sprintView);
    root.appendChild(wrapper);


    // module nav last (bottom bar)
    root.appendChild(renderModuleNavBar(window.__QUEST_CACHE__));

  } 
  /* ============================
     🖥️ DESKTOP LAYOUT
  ============================ */
  else {

    // module nav first (top filter bar style)
  getLayoutRoot().appendChild(renderModuleNavBar(window.__QUEST_CACHE__));

    // quests
    window.__QUEST_CACHE__.forEach(quest => {
      root.appendChild(renderQuest(quest));
    });

    // ❌ NO sprint switch here
  }

  /* ============================
     INIT SYSTEMS
  ============================ */
  initLockedConditionDropdown();
  initCooldownTimers();
  initNoRetryPreviewBoxes();
  initQuestFilters();
  initSprintSwipe();
  initPreviewBoxRouting();




  if (
    window.__FROM_SLUG_ROUTE__ &&
    window.__INIT_QUEST_UUID__ &&
    window.__INIT_SUBQUEST_UUID__
  ) {

   
    const initQuestUUID = window.__INIT_QUEST_UUID__;
    const initSubUUID   = window.__INIT_SUBQUEST_UUID__;
    window.__FROM_SLUG_ROUTE__   = false;
    window.__INIT_QUEST_UUID__   = null;
    window.__INIT_SUBQUEST_UUID__ = null;

    requestAnimationFrame(() => {

      const boxInit = document.querySelector(
        `.preview-box[data-quest="${initQuestUUID}"][data-subquest="${initSubUUID}"]`
      );

      if (!boxInit) {
        console.warn("❌ Auto-route preview-box not found");
        return;
      }

      document.querySelectorAll(".preview-box.active")
        .forEach(b => b.classList.remove("active"));

      boxInit.classList.add("active");

      const container = document.querySelector(".quest-complete");
      const layout    = document.querySelector(".layout-root");

      if (container) container.classList.remove("quest-hidden");
      if (layout) layout.classList.add("quest-open");

      routeToSubquest(boxInit);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSubquestByUUID(initSubUUID);
        });
      });
    });
  }
  
  document.addEventListener("click", (e) => {
    const box = e.target.closest(".preview-box.try-again");
    if (!box) return;

    // cooldown active
    if (box.querySelector(".cooldown-retry")) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}


function renderSprintSwitch(){
  const wrap = document.createElement("div");
  wrap.className = "sprint-switch-wrap";

  wrap.innerHTML = `
    <div class="sprint-switch">
      <div class="sprint-pill"></div>

      <button class="sprint-tab active" data-mode="all">
        All time
      </button>

      <button class="sprint-tab" data-mode="sprint">
        Sprint
      </button>
    </div>
  `;

  const root = wrap.querySelector(".sprint-switch");
  const pill = root.querySelector(".sprint-pill");
  const tabs = root.querySelectorAll(".sprint-tab");

  tabs.forEach((tab, i)=>{
    tab.addEventListener("click", ()=>{
      tabs.forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");

      // move pill
      pill.style.transform = `translateX(${i * 100}%)`;

      const mode = tab.dataset.mode;

      // 🔥 APPLY SPRINT FILTER
      applySprintFilter(mode);
    });
  });

  return wrap;
}



function renderModuleNavBar(quests){
  const bar = document.createElement("div");
  bar.className = "module-nav-bar";

  const inner = document.createElement("div");
  inner.className = "module-nav-scroll";

  quests.forEach(q=>{
    const btn = document.createElement("button");
    btn.className = "module-nav-item";
    btn.dataset.quest = q.uuid;
    btn.innerText = q.title;

    // 🔥 detect sprint relevance
    const hasSprint = q.subquests?.some(sq => sq.is_in_current_sprint === true);
    btn.dataset.hasSprint = hasSprint ? "true" : "false";

    btn.addEventListener("click", ()=>{
      btn.classList.toggle("active");
      filterToModules();   // respects sprint mode
    });

    inner.appendChild(btn);
  });

  bar.appendChild(inner);
  return bar;
}


function syncModuleNavWithSprint(){
  const buttons = document.querySelectorAll(".module-nav-item");

  buttons.forEach(btn=>{
    const hasSprint = btn.dataset.hasSprint === "true";

    if(window.__SPRINT_MODE__ === "sprint"){
      if(!hasSprint){
        btn.style.display = "none";   // ✅ real hide
        btn.classList.remove("active");
      }else{
        btn.style.display = "";
      }
    } else {
      btn.style.display = "";
    }
  });
}


/* ===============================
   MULTI FILTER LOGIC
================================ */

function filterToModules(){

  let scopeModules;

  // 🔥 scope to active view (mobile sprint/all)
  if (window.innerWidth <= 767) {
    const wrapper = document.querySelector(".sprint-view-wrapper");

    if (window.__SPRINT_MODE__ === "sprint") {
      scopeModules = wrapper.querySelectorAll(".sprint-view-sprint .all-content");
    } else {
      scopeModules = wrapper.querySelectorAll(".sprint-view-all .all-content");
    }
  } else {
    // desktop
    scopeModules = document.querySelectorAll(".all-content");
  }

  const activeBtns = document.querySelectorAll(".module-nav-item.active");
  const activeUUIDs = [...activeBtns].map(b => b.dataset.quest);

  /* ===========================
     NO MODULE SELECTED
  =========================== */
  if(activeUUIDs.length === 0){

    scopeModules.forEach(m=>{

      // ✅ sprint mode → respect sprint filter
      if(window.__SPRINT_MODE__ === "sprint"){
        // only show if module has sprint content
        const hasVisibleSprint = m.querySelector(
          '.preview-box:not(.sprint-hidden)'
        );

        if(hasVisibleSprint){
          m.classList.remove("module-hidden");
        }else{
          m.classList.add("module-hidden");
        }

      } 
      // all mode → show all
      else {
        m.classList.remove("module-hidden");
      }

    });

    return;
  }

  /* ===========================
     MODULES SELECTED
  =========================== */
  scopeModules.forEach(m=>{
    const isSelected = activeUUIDs.includes(m.dataset.questUuid);

    if(!isSelected){
      m.classList.add("module-hidden");
      return;
    }

    // selected module
    if(window.__SPRINT_MODE__ === "sprint"){
      // but only if it has sprint subquests
      const hasVisibleSprint = m.querySelector(
        '.preview-box:not(.sprint-hidden)'
      );

      if(hasVisibleSprint){
        m.classList.remove("module-hidden");
      }else{
        m.classList.add("module-hidden");
      }

    } else {
      m.classList.remove("module-hidden");
    }
  });
}



function utcHumanToLocalHuman(utcHumanStr){
  // "04 Feb 05:00 2026" (UTC human)
  if (!utcHumanStr) return "";

  const parts = utcHumanStr.split(" ");
  if (parts.length !== 4) return utcHumanStr;

  const [dayStr, monStr, timeStr, yearStr] = parts;
  const [hhStr, mmStr] = timeStr.split(":");

  const months = {
    Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
    Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
  };

  if (!(monStr in months)) return utcHumanStr;

  // build UTC date
  const utcDate = new Date(Date.UTC(
    Number(yearStr),
    months[monStr],
    Number(dayStr),
    Number(hhStr),
    Number(mmStr),
    0, 0
  ));

  // convert to local
  const d = new Date(utcDate.getTime());

  const monthsArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const day   = String(d.getDate()).padStart(2,"0");
  const month = monthsArr[d.getMonth()];
  const year  = d.getFullYear();
  const hour  = String(d.getHours()).padStart(2,"0");
  const min   = String(d.getMinutes()).padStart(2,"0");

  return `${day} ${month} ${hour}:${min} ${year}`; // ✅ USER LOCAL TIME
}
 


function createConditionList(subquest) {
  const wrap = document.createElement("div");
  wrap.className = "condition-list";
  wrap.style.display = "flex";

  wrap.innerHTML = `
    <div class="info-how-too">
      <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path fill-rule="nonzero" d="M256 0c70.69 0 134.69 28.66 181.02 74.98C483.34 121.3 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.69 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.69 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-9.96 161.03c0-4.28.76-8.26 2.27-11.91 1.5-3.63 3.77-6.94 6.79-9.91 3-2.95 6.29-5.2 9.84-6.7 3.57-1.5 7.41-2.28 11.52-2.28 4.12 0 7.96.78 11.49 2.27 3.54 1.51 6.78 3.76 9.75 6.73 2.95 2.97 5.16 6.26 6.64 9.91 1.49 3.63 2.22 7.61 2.22 11.89 0 4.17-.73 8.08-2.21 11.69-1.48 3.6-3.68 6.94-6.65 9.97-2.94 3.03-6.18 5.32-9.72 6.84-3.54 1.51-7.38 2.29-11.52 2.29-4.22 0-8.14-.76-11.75-2.26-3.58-1.51-6.86-3.79-9.83-6.79-2.94-3.02-5.16-6.34-6.63-9.97-1.48-3.62-2.21-7.54-2.21-11.77zm13.4 178.16c-1.11 3.97-3.35 11.76 3.3 11.76 1.44 0 3.27-.81 5.46-2.4 2.37-1.71 5.09-4.31 8.13-7.75 3.09-3.5 6.32-7.65 9.67-12.42 3.33-4.76 6.84-10.22 10.49-16.31.37-.65 1.23-.87 1.89-.48l12.36 9.18c.6.43.73 1.25.35 1.86-5.69 9.88-11.44 18.51-17.26 25.88-5.85 7.41-11.79 13.57-17.8 18.43l-.1.06c-6.02 4.88-12.19 8.55-18.51 11.01-17.58 6.81-45.36 5.7-53.32-14.83-5.02-12.96-.9-27.69 3.06-40.37l19.96-60.44c1.28-4.58 2.89-9.62 3.47-14.33.97-7.87-2.49-12.96-11.06-12.96h-17.45c-.76 0-1.38-.62-1.38-1.38l.08-.48 4.58-16.68c.16-.62.73-1.04 1.35-1.02l89.12-2.79c.76-.03 1.41.57 1.44 1.33l-.07.43-37.76 124.7zm158.3-244.93c-41.39-41.39-98.58-67-161.74-67-63.16 0-120.35 25.61-161.74 67-41.39 41.39-67 98.58-67 161.74 0 63.16 25.61 120.35 67 161.74 41.39 41.39 98.58 67 161.74 67 63.16 0 120.35-25.61 161.74-67 41.39-41.39 67-98.58 67-161.74 0-63.16-25.61-120.35-67-161.74z"/></svg>
      How to unlock this quest?
    </div>
  `;

  if (!subquest.conditions || !subquest.conditions.length) {
    wrap.innerHTML += `<div style="font-size:13px;">No conditions</div>`;
    return wrap;
  }

  subquest.conditions.forEach(cond => {
    const item = document.createElement("div");
    item.className = "condition-items";

    const status = `
    <span class="cond-status">
      ${cond.is_completed ? SuccessAvgInitColored : "&middot;"}
    </span>
    `;

    /* ===== ROLE ===== */
    if (cond.type === "Role") {
      item.innerHTML = `
        <div class="condition-listers">
          ${status}
          <p>Must have role: <b>${cond.value || ""}</b></p>
        </div>
      `;
    }

    /* ===== FOLLOWERS ===== */
    else if (cond.type === "Followers") {
      item.innerHTML = `
        <div class="condition-listers">
          ${status}
          <p>Must have more than <b>${cond.value || 0}</b> followers on X</p>
        </div>
      `;
    }

    /* ===== LEVEL ===== */
    else if (cond.type === "Level") {
      item.innerHTML = `
        <div class="condition-listers">
          ${status}
          <p>Reach level <b>${cond.value}</b></p>
        </div>
      `;
    }

    /* ===== QUEST ===== */
    else if (cond.type === "Quest") {
      item.innerHTML = `
        <div class="condition-listers">
          ${status}
          <p style="display: inline-flex; gap: 13px">
            Complete quest:
            <a class="quest-link" href="/${communitySlug}/quest/${cond.quest_uuid}/${cond.subquest_uuid}">
              ${cond.value}
            </a>
          </p>
        </div>
      `;
    }

    /* ===== DATE ===== */
    else if (cond.type === "Date") {
      const localDate = utcHumanToLocalHuman(cond.value);

      item.innerHTML = `
        <div class="condition-listers">
          ${status}
          <p>Unlocks on <b>${localDate}</b></p>
        </div>
      `;
    }

    wrap.appendChild(item);
  });

  return wrap;
}

function initLockedConditionDropdown() {
  let activeConditionBox = null;

  // ===== CLOSE HELPER =====
  function closeActiveDropdown() {
    if (!activeConditionBox) return;
    activeConditionBox.remove();
    activeConditionBox = null;
  }

  // ===== OUTSIDE CLICK CLOSE =====
  document.addEventListener("click", (e) => {
    if (!activeConditionBox) return;
    if (!activeConditionBox.contains(e.target)) {
      closeActiveDropdown();
    }
  });

  // ===== WINDOW RESIZE CLOSE =====
  window.addEventListener("resize", () => {
    closeActiveDropdown();
  });

  // ===== WINDOW SCROLL CLOSE =====
  // use capture to catch scrolls from containers too
  window.addEventListener(
    "scroll",
    () => {
      closeActiveDropdown();
    },
    true
  );

  // ===== DIRECT BINDING =====
  const lockedPreviews = document.querySelectorAll(".preview-box.locked");

  lockedPreviews.forEach(box => {
    box.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      closeActiveDropdown();

      const questUUID = box.dataset.quest;
      const subUUID   = box.dataset.subquest;

      const quest = window.__QUEST_CACHE__?.find(q => q.uuid === questUUID);
      if (!quest) return;

      const subquest = quest.subquests.find(s => s.uuid === subUUID);
      if (!subquest) return;

      const dropdown = createConditionList(subquest);

      dropdown.style.position = "absolute";
      dropdown.style.zIndex = "9999";
      dropdown.style.visibility = "hidden";

      document.body.appendChild(dropdown);

      const rect = box.getBoundingClientRect();
      const dropRect = dropdown.getBoundingClientRect();

      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;

      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;

      let top;
      let left = rect.left + window.scrollX;

      // ===== VERTICAL SMART LOGIC =====
      if (spaceBelow >= dropRect.height + 12) {
        top = rect.bottom + window.scrollY + 8;
      } else if (spaceAbove >= dropRect.height + 12) {
        top = rect.top + window.scrollY - dropRect.height - 8;
      } else {
        top = Math.max(
          8,
          Math.min(
            viewportH - dropRect.height - 8,
            rect.bottom + window.scrollY + 8
          )
        );
      }

      // ===== HORIZONTAL CLAMP =====
      if (left + dropRect.width > viewportW - 8) {
        left = viewportW - dropRect.width - 8;
      }
      if (left < 8) left = 8;

      dropdown.style.left = left + "px";
      dropdown.style.top  = top + "px";
      dropdown.style.visibility = "visible";

      activeConditionBox = dropdown;
    });
  });
}


function computeLockState(subquest){
  if (subquest.is_completed) return false;

  let locked = false;

  if (subquest.conditions && subquest.conditions.length) {
    for (const cond of subquest.conditions) {

      if (cond.type === "Date") {
        if (!isDateUnlocked(cond.value)) locked = true;
      }

      if (cond.type === "Level") {
        if (!cond.is_completed) locked = true;
      }

      if (cond.type === "Quest") {
        if (!cond.is_completed) locked = true;
      }

      if (cond.type === "Role" || cond.type === "Followers") {
        if (!cond.is_completed) locked = true;
      }

    }
  }

  return locked;
}

function isDateUnlocked(utcHumanStr){
  // "05 Feb 00:00 2026"  (UTC)
  if (!utcHumanStr) return false;

  const parts = utcHumanStr.split(" ");
  if (parts.length !== 4) return false;

  const [dayStr, monStr, timeStr, yearStr] = parts;
  const [hhStr, mmStr] = timeStr.split(":");

  const months = {
    Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
    Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
  };

  if (!(monStr in months)) return false;

  const utcDate = new Date(Date.UTC(
    Number(yearStr),
    months[monStr],
    Number(dayStr),
    Number(hhStr),
    Number(mmStr),
    0, 0
  ));

  const now = new Date(); // user local time

  return now >= utcDate;
}





const INFOBOX_GRADIENTS = [
  // ===== DESIGN 1 (original clean)  ✅ DO NOT TOUCH
  (color) => `
    radial-gradient(
      120% 120% at 50% 0%,
      rgba(255,255,255,0.12),
      transparent 60%
    ),
    linear-gradient(
      90deg,
      #1e3a8a 0%,
      ${color} 100%
    )
  `,

  // ===== DESIGN 2 (curved flow)
  (color) => `
    radial-gradient(
      120% 140% at 10% 50%,
      ${hexToRgba(color, 0.55)},
      transparent 60%
    ),
    radial-gradient(
      140% 120% at 90% 40%,
      rgba(30, 58, 138, 0.75),
      transparent 65%
    ),
    radial-gradient(
      160% 160% at 50% 60%,
      ${hexToRgba(color, 0.35)},
      rgba(30, 58, 138, 0.35),
      transparent 70%
    ),
    linear-gradient(
      100deg,
      #1e3a8a,
      ${color}
    )
  `,

  // ===== DESIGN 3 (vertical glow)
  (color) => `
    radial-gradient(
      100% 140% at 50% 20%,
      ${hexToRgba(color, 0.45)},
      transparent 60%
    ),
    linear-gradient(
      180deg,
      #0f172a,
      ${color}
    )
  `,

  // ===== DESIGN 4 (🔥 PREMIUM FLOW — FIXED, COLOR-AWARE)
  (color) => `
    radial-gradient(
      120% 140% at 10% 50%,
      ${hexToRgba(color, 0.55)},
      transparent 60%
    ),
    radial-gradient(
      140% 120% at 90% 40%,
      rgba(30, 58, 138, 0.75),
      transparent 65%
    ),
    radial-gradient(
      160% 160% at 50% 60%,
      ${hexToRgba(color, 0.35)},
      rgba(30, 58, 138, 0.35),
      transparent 70%
    ),
    linear-gradient(
      100deg,
      #1e3a8a,
      ${color}
    )
  `,

  (color) => `
    conic-gradient(
      from 220deg at 50% 50%,
      ${hexToRgba(color, 0.45)} 0deg,
      rgba(30, 58, 138, 0.35) 60deg,
      ${hexToRgba(color, 0.30)} 120deg,
      rgba(255,255,255,0.10) 180deg,
      ${hexToRgba(color, 0.35)} 240deg,
      rgba(30, 58, 138, 0.40) 300deg,
      ${hexToRgba(color, 0.45)} 360deg
    ),
    radial-gradient(
      85% 85% at 50% 50%,
      rgba(0,0,0,0.45) 0%,
      rgba(0,0,0,0.25) 25%,
      rgba(0,0,0,0.12) 45%,
      transparent 65%
    ),
    radial-gradient(
      120% 120% at 50% 50%,
      rgba(0,0,0,0.25),
      transparent 70%
    ),
    linear-gradient(
      135deg,
      #020617,
      ${color}
    )
  `

];

function getModuleState(subquests){
  if (!subquests || subquests.length === 0) return null;

  let completedCount = 0;
  let lockedCount = 0;

  subquests.forEach(sq => {
    const isLocked = computeLockState(sq);   // ✅ single source of truth

    if (sq.is_completed) completedCount++;
    if (isLocked && !sq.is_completed) lockedCount++;
  });

  const total = subquests.length;

  // 🟢 All completed
  if (completedCount === total) return "completed";

  // 🔒 All either locked OR completed
  if (lockedCount + completedCount === total) return "locked";

  // 🟡 Mixed state
  return null;
}




function hexToRgba(hex, alpha = 1) {
  if (!hex || !hex.startsWith("#")) return `rgba(236,72,153,${alpha})`;
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}


function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0; // unsigned
}


function pickGradientIndex(seed, total) {
  const h1 = hashString(seed);
  const h2 = hashString(seed.split("").reverse().join(""));
  const mixed = (h1 ^ (h2 << 1)) >>> 0;
  return mixed % total;
}


function createQuestFilterDropdown(questUUID){
  const box = document.createElement("div");
  box.className = "quest-filter-dropdown";
  box.dataset.quest = questUUID;

  box.innerHTML = `
    <label><input type="checkbox" data-filter="completed"> Completed</label>
    <label><input type="checkbox" data-filter="pending"> Pending</label>
    <label><input type="checkbox" data-filter="locked"> Locked</label>
    <label><input type="checkbox" data-filter="cooldown"> Cooldown</label>
    <label><input type="checkbox" data-filter="no_retry"> No Retry</label>
  `;

  return box;
}




let ACTIVE_FILTER_BOX = null;
let ACTIVE_FILTER_BTN = null;

function initQuestFilters() {

  let ACTIVE_FILTER_BOX = null;
  let ACTIVE_FILTER_BTN = null;

  // ===== CLOSE HELPER =====
  function closeActiveFilter() {
    if (!ACTIVE_FILTER_BOX) return;
    ACTIVE_FILTER_BOX.remove();
    ACTIVE_FILTER_BOX = null;
    ACTIVE_FILTER_BTN = null;
  }

  // ===== WINDOW RESIZE CLOSE =====
  window.addEventListener("resize", () => {
    closeActiveFilter();
  });

  // ===== WINDOW SCROLL CLOSE =====
  window.addEventListener(
    "scroll",
    () => {
      closeActiveFilter();
    },
    true
  );

  // ===== CLICK HANDLER =====
  document.addEventListener("click", (e) => {

    /* ===== TOGGLE FILTER ===== */
    const btn = e.target.closest(".quest-filter-btn");
    if (btn) {
      e.stopPropagation();

      // same button → close
      if (ACTIVE_FILTER_BOX && ACTIVE_FILTER_BTN === btn) {
        closeActiveFilter();
        return;
      }

      // another open → close first
      closeActiveFilter();

      // ===== OPEN NEW =====
      const questUUID = btn.dataset.quest;
      const dropdown = createQuestFilterDropdown(questUUID);

      /* ===== RESTORE STATE ===== */
      const saved = window.__QUEST_FILTER_STATE__[questUUID] || [];

      dropdown.querySelectorAll("input").forEach(input=>{
        if (saved.includes(input.dataset.filter)) {
          input.checked = true;
        }
      });

      dropdown.style.position = "absolute";
      dropdown.style.zIndex = "9999";
      dropdown.style.visibility = "hidden"; // ⬅️ measure first

      document.body.appendChild(dropdown);

      const rect = btn.getBoundingClientRect();
      const dropRect = dropdown.getBoundingClientRect();

      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;

      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;

      let top;
      let left = rect.right - dropRect.width;

      // ===== SMART VERTICAL LOGIC =====
      if (spaceBelow >= dropRect.height + 12) {
        // drop down
        top = rect.bottom + window.scrollY + 8;
      } else if (spaceAbove >= dropRect.height + 12) {
        // flip up
        top = rect.top + window.scrollY - dropRect.height - 8;
      } else {
        // clamp inside viewport
        top = Math.max(
          8,
          Math.min(
            viewportH - dropRect.height - 8,
            rect.bottom + window.scrollY + 8
          )
        );
      }

      // ===== HORIZONTAL CLAMP =====
      if (left + dropRect.width > viewportW - 8) {
        left = viewportW - dropRect.width - 8;
      }
      if (left < 8) left = 8;

      dropdown.style.left = left + "px";
      dropdown.style.top  = top + "px";
      dropdown.style.visibility = "visible";

      ACTIVE_FILTER_BOX = dropdown;
      ACTIVE_FILTER_BTN = btn;
      return;
    }

    /* ===== OUTSIDE CLICK CLOSE ===== */
    if (ACTIVE_FILTER_BOX && !ACTIVE_FILTER_BOX.contains(e.target)) {
      closeActiveFilter();
    }
  });

  document.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const input = e.target;
    if (!input.closest(".quest-filter-dropdown")) return;

    const dropdown = input.closest(".quest-filter-dropdown");
    const questUUID = dropdown.dataset.quest;

    const activeFilters = [...dropdown.querySelectorAll("input:checked")]
      .map(i => i.dataset.filter);

    // ✅ persist state
    window.__QUEST_FILTER_STATE__[questUUID] = activeFilters;

    applyQuestFilters(questUUID, activeFilters);
  });

}


function applyQuestFilters(questUUID, filters){

  let scope;

  // 🔥 detect active view
  if (window.innerWidth <= 767) {
    const wrapper = document.querySelector(".sprint-view-wrapper");

    if (window.__SPRINT_MODE__ === "sprint") {
      scope = wrapper.querySelector(".sprint-view-sprint");
    } else {
      scope = wrapper.querySelector(".sprint-view-all");
    }
  } else {
    // desktop = single tree
    scope = document;
  }

  const questRoot = scope.querySelector(
    `.all-content[data-quest-uuid="${questUUID}"]`
  );

  if(!questRoot) return;

  const boxes = questRoot.querySelectorAll(".preview-box");

  boxes.forEach(box=>{
    let show = false;

    if(filters.length === 0){
      show = true;
    } else {
      filters.forEach(f=>{
        if(f === "completed" && box.classList.contains("completed")) show = true;
        if(f === "pending"   && box.classList.contains("pending")) show = true;
        if(f === "locked"    && box.classList.contains("locked")) show = true;
        if(f === "cooldown"  && box.classList.contains("try-again") && !box.dataset.noRetry) show = true;
        if(f === "no_retry"  && box.dataset.noRetry === "true") show = true;
      });
    }

    // ===== SHOW =====
    if(show){
      box.classList.remove("hidden");
      requestAnimationFrame(()=>{
        box.classList.remove("hiding");
      });
    }

    // ===== HIDE =====
    else{
      if(box.classList.contains("hidden")) return;

      box.classList.add("hiding");
      setTimeout(()=>{
        box.classList.add("hidden");
      }, 450);
    }
  });
}




function renderQuest(quest) {
  const root = document.createElement("div");
  root.className = "all-content";
  root.dataset.questUuid = quest.uuid;

  /* ======================
     INFO BOX (HEADER)
  ====================== */
  const infoBox = document.createElement("div");
  infoBox.className = "info-box";

  if (quest.cover_url) {
    infoBox.style.background = `
      linear-gradient(
        rgba(0,0,0,0.45),
        rgba(0,0,0,0.45)
      ),
      url('${quest.cover_url}') center center / cover no-repeat
    `;
  } 
  else {
    const color = quest.color || "#ec4899";

    const index = pickGradientIndex(quest.uuid, INFOBOX_GRADIENTS.length);
    const gradientBuilder = INFOBOX_GRADIENTS[index];

    infoBox.style.background = gradientBuilder(color);   // ✅ APPLY
    infoBox.style.boxShadow = "";
  }




  const header = document.createElement("div");
  header.className = "preview-header";

  header.innerHTML = `
    <div class="preview-title">${quest.title}</div>
    <div class="preview-description">${quest.description || ""}</div>
    <p class="counting-subquest">${quest.completed}/${quest.total}</p>

    <div class="progress-bars">
      <div class="progress-fillstatic" style="width:${quest.progress}%"></div>
    </div>
  `;
  const filterBtn = document.createElement("div");
  filterBtn.className = "quest-filter-btn";
  filterBtn.innerHTML = `
    <svg 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M18 4H6c-1.105 0-2.026.91-1.753 1.98a8.018 8.018 0 0 0 4.298 5.238c.823.394 1.455 1.168 1.455 2.08v6.084a1 1 0 0 0 1.447.894l2-1a1 1 0 0 0 .553-.894v-5.084c0-.912.632-1.686 1.454-2.08a8.017 8.017 0 0 0 4.3-5.238C20.025 4.91 19.103 4 18 4z"
        stroke="currentColor"
        stroke-width="2"
      />
    </svg>

  `;
  filterBtn.dataset.quest = quest.uuid;

  infoBox.appendChild(filterBtn);

  infoBox.appendChild(header);

  /* ======================
    MODULE STATE OVERLAY
  ====================== */
  const moduleState = getModuleState(quest.subquests);


  if (moduleState === "completed") {
    infoBox.classList.add("completed");
    const badge = document.createElement("div");
    badge.className = "module-state module-completed";
    badge.innerText = "Module Completed";
    root.appendChild(badge);
  }

  if (moduleState === "locked") {
    infoBox.classList.add("task-locked");
    const badge = document.createElement("div");
    badge.className = "module-state module-locked";
    badge.innerText = "Module Locked";
    root.appendChild(badge);
  }


  /* ======================
     CONTENT BLOCK
  ====================== */
  const contentBlock = document.createElement("div");
  contentBlock.className = "content-block";

  const previewContent = document.createElement("div");
  previewContent.className = "preview-content";

  quest.subquests.forEach(sq => {
    previewContent.appendChild(renderSubquest(sq, quest.uuid));
  });

  contentBlock.appendChild(previewContent);

  /* ======================
     FINAL TREE
  ====================== */
  root.appendChild(infoBox);
  root.appendChild(contentBlock);

  return root;
}

function renderSubquest(subquest, questUUID) {

  const isLocked = computeLockState(subquest);

  const isBlocked =
    subquest.is_completed ||
    subquest.is_pending ||
    isLocked ||
    subquest.no_retry === true;

  let classes = ["preview-box"];
  if (subquest.is_completed) classes.push("completed");
  if (subquest.is_pending) classes.push("pending");
  if (isLocked) classes.push("locked");
  if (subquest.no_retry === true) classes.push("try-again");
  if (subquest.cooldown_until) classes.push("try-again");

  // decide element type
  let el;

  if (isBlocked) {
    el = document.createElement("div");
  } else {
    el = document.createElement("a");
  }

  if (!isBlocked) {
    el.href = `${communitySlug}/quest/${questUUID}/${subquest.uuid}`; 
  }

  el.className = classes.join(" ");
  el.dataset.quest = questUUID;
  el.dataset.subquest = subquest.uuid;

  const rewardCount = (subquest.rewards || []).length;
  const textShrinkClass = rewardCount >= 2 ? "multi-reward" : "";

  el.innerHTML = `
    <div class="preview-text ${isLocked ? "task-locked" : ""} ${textShrinkClass}">
      <div class="subquest-name">${subquest.name}</div>
      <div class="preview-dec">${subquest.description || ""}</div>

      <div class="task-icons">
        ${renderTaskIcons(subquest.tasks)}
        ${subquest.recurrence ? renderRecurrence(subquest.recurrence) : ""}
      </div>
    </div>

    <div class="badge-container ${isLocked ? "badge-locked" : ""}">
      ${renderRewards(subquest.rewards)}
    </div>

    ${renderStateBadge(subquest, isLocked)}
  `;

  return el;
}

function renderStateBadge(subquest, isLocked) {
  // 🥇 PRIORITY SYSTEM

  // 1) Completed overrides everything
  if (subquest.is_completed) {
    return renderCompleted();
  }

  // 2)  (permanent lock)
  if (subquest.no_retry === true) {
    return renderNoRetry();
  }

  // 3) Timed cooldown
  if (subquest.cooldown_until) {
    return renderCooldown(subquest);
  }

  // 4) Pending
  if (subquest.is_pending) {
    return renderPending();
  }

  // 5) Locked by conditions
  if (isLocked) {
    return renderLocked();
  }

  return "";
}

function getFcfsColor(claim, max) {
  if (!max || max === 0) return "#e67e22";

  const ratio = claim / max;

  // 0 → light, 1 → full color
  if (ratio === 0) return "#f6d2a2";   // very light orange
  if (ratio < 0.5) return "#f1b56b";   // light
  if (ratio < 1) return "#e89a3c";     // medium
  return "#e67e22";                    // full
}


function renderNoRetry() {
  return `
    <div class="timer-main no-retry">
      <div class="timer-scount-retry">
        <div class="cool-display">
          No retry
        </div>
      </div>
    </div>
  `;
}


function initNoRetryPreviewBoxes() {
  const noRetryTimers = document.querySelectorAll(".timer-main.no-retry");

  noRetryTimers.forEach(timerMain => {
    const previewBox = timerMain.closest(".preview-box");
    if (!previewBox) return;

    // same visual state as cooldown
    previewBox.classList.add("try-again");

    // but DO NOT auto-remove
    previewBox.dataset.noRetry = "true"; // state marker
  });
}

function buildFcfsGradientSvg(claim, max) {
  const ratio = max ? claim / max : 1;
  const percent = Math.max(0, Math.min(ratio * 100, 100));

  const gid = `fcfs-grad-${Math.floor(Math.random() * 1e9)}`;

  return `
<svg xmlns="http://www.w3.org/2000/svg"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19">
  <defs>
    <linearGradient id="${gid}" x1="0%" y1="100%" x2="0%" y2="0%">
      <!-- filled part -->
      <stop offset="${percent}%" stop-color="#ff7700"/>
      <!-- empty part = transparent orange -->
      <stop offset="${percent}%" stop-color="#ff7700cb"/>
    </linearGradient>
  </defs>

  <path
    d="M13 3 
       C12.6 2.5,12 2.5,11.7 3 
       L5.5 12.2 
       C5.2 12.7,5.5 13.3,6 13.3 
       H10 
       V21 
       C10 21.5,10.7 21.7,11.1 21.3 
       L18.2 12.3 
       C18.6 11.8,18.3 11.2,17.7 11.2 
       H13 
       V3 Z"
    fill="url(#${gid})"
    // stroke="url(#${gid})"
    stroke-width="4"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
</svg>`;
}


const REWARD_ICONS = {
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
     fill="currentColor"
     stroke="currentColor"
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






function renderTaskIcons(tasks = []) {
  const max = 2;
  let html = "";

  tasks.slice(0, max).forEach((t, i) => {
    const isLast = i === max - 1;
    const hasMore = tasks.length > max;

    html += `
      <div class="task-icon" style="background:${t.icon_color}">
        ${t.icon_svg}
        ${
          isLast && hasMore
            ? `<span class="more-icons">+${tasks.length - max}</span>`
            : ``
        }
      </div>
    `;
  });

  return html;
}


function renderRewards(rewards = []) {
  const maxRewards = window.innerWidth <= 430 ? 2 : 3;

  return rewards.slice(0, maxRewards).map(r => {
    const type = r.type;
    const data = r.data || {};
    const dist = (r.distribution_type || "ALL").toUpperCase();
    let icon = REWARD_ICONS[dist] || REWARD_ICONS.ALL;

    let setupStyle = "";

    if (r.fcfs) {
      const { claim_count, max_claim } = r.fcfs;
      icon = buildFcfsGradientSvg(claim_count, max_claim);
    }

    if (type === "xp") {
      return `
        <div class="badge-wrapper">
          <div class="badge-xp">
            <div class="badge-inner">
              <div class="xp">XP</div>
              <div class="points"><span>${data.amount || 0}</span></div>
              <div class="sparkle one"></div>
              <div class="sparkle two"></div>
              <div class="sparkle three"></div>
            </div>
          </div>
          <div class="setup-icon" ${setupStyle}>${icon}</div>
        </div>
      `;
    }

    if (type === "role") {
      return `
        <div class="badge-wrapper">
          <div class="badge-role">
            <div class="badge-inner">
              <img src="https://xpcqiovfesvllsljxhac.supabase.co/storage/v1/object/public/uploads/discord_reward.png">
              <div class="points"><span>${data.role || ""}</span></div>
              <div class="sparkle one"></div>
              <div class="sparkle two"></div>
              <div class="sparkle three"></div>
            </div>
          </div>
          <div class="setup-icon" ${setupStyle}>${icon}</div>
        </div>
      `;
    }

    if (type === "token") {
      return `
        <div class="badge-wrapper">
          <div class="badge-token">
            <div class="badge-inner">
              <div class="points">
                <span>${data.amount_per_winner || ""} ${data.symbol || ""}</span>
              </div>
              <div class="sparkle one"></div>
              <div class="sparkle two"></div>
              <div class="sparkle three"></div>
            </div>
          </div>
          <div class="setup-icon" ${setupStyle}>${icon}</div>
        </div>
      `;
    }

    if (type === "custom") {
      return `
        <div class="badge-wrapper">
          <div class="badge-custom">
            <div class="badge-inner">
              <div class="points">
                <span>${data.text || "Custom"}</span>
              </div>
              <div class="sparkle one"></div>
              <div class="sparkle two"></div>
              <div class="sparkle three"></div>
            </div>
          </div>
          <div class="setup-icon" ${setupStyle}>${icon}</div>
        </div>
      `;
    }

    return "";
  }).join("");
}


function renderCompleted() {
  return `
    <div class="complete-main">
      <div class="complete-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" fill="currentColor" stroke="currentColor" width="13" height="13">
        <path d="m85.652 6.5938c-15.199 4.6992-33.309 28.609-50.668 53.164-7.3672-12.414-15.172-16.559-23.242-12.312-0.99609 0.52344-1.6523 1.5273-1.7344 2.6562-0.082031 1.1406 0.42969 2.2422 1.3555 2.918 5.8516 4.2734 11.922 11.848 19.141 23.84v-0.003906c1.2891 2.1758 3.6328 3.5039 6.1562 3.4883h0.11719c2.6016-0.023438 4.9844-1.4453 6.2461-3.7188 7.0234-12.734 14.738-25.07 23.109-36.957 6.8594-9.75 14.508-18.926 22.867-27.43 1.125-1.1016 1.332-2.8359 0.5-4.1719-0.77734-1.332-2.3789-1.9453-3.8477-1.4727z"/>
        </svg>
        <span class="completed-subquest" style="color: currentColor"">Completed</span>
      </div>
    </div>
  `;
}


function renderPending() {
  return `
    <div class="pending-reviews">
      <div class="pending-scount">
        <div class="preview-display" style="font-size:11px;font-weight:550;">
          in review
        </div>
      </div>
    </div>
  `;
}



function renderLocked() {
  return `
    <div class="lock-main">
      <div class="lock-scount" style="display:flex; align-items:center; gap:4px;">

      <svg
        viewBox="0 0 24 24"
        fill="none" width="11" height="11"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

        <div class="lock-text">Locked</div>
      </div>
    </div>
  `;
}


function renderCooldown(sq) {
  return `
    <div class="timer-main">
      <div class="timer-scount">
        <div class="cool-display" style="font-size:11px;font-weight:550;">
          Try again in:
          <span class="cooldown-retry" 
                data-cooldown-until="${sq.cooldown_until}">
            --
          </span>
        </div>
      </div>
    </div>
  `;
}

function formatCooldown(seconds) {
  if (seconds <= 0) return "0s";

  const minute = 60;
  const hour   = 60 * minute;
  const day    = 24 * hour;
  const week   = 7 * day;
  const month  = 30 * day; // logical month for cooldowns

  // seconds
  if (seconds < minute) {
    return `${seconds}s`;
  }

  // minutes
  if (seconds < hour) {
    const m = Math.floor(seconds / minute);
    return `${m}min`;
  }

  // hours + minutes ✅
  if (seconds < day) {
    const h = Math.floor(seconds / hour);
    const rem = seconds % hour;
    const m = Math.floor(rem / minute);

    if (m > 0) {
      return `${h}hr ${m}min`;   // 👉 2hr 20min
    }
    return `${h}hr`;             // 👉 2hr
  }

  // days
  if (seconds < week) {
    const d = Math.floor(seconds / day);
    return `${d}day${d > 1 ? "s" : ""}`;
  }

  // weeks
  if (seconds < month) {
    const w = Math.floor(seconds / week);
    return `${w}week${w > 1 ? "s" : ""}`;
  }

  // months
  const mo = Math.floor(seconds / month);
  return `${mo}month${mo > 1 ? "s" : ""}`;
}



function initCooldownTimers() {
  const timers = document.querySelectorAll(".cooldown-retry");
  if (!timers.length) return;

  function update() {
    const now = Date.now(); // ms

    timers.forEach(el => {
      const untilRaw = el.dataset.cooldownUntil;
      if (!untilRaw) return;

      const until = new Date(untilRaw).getTime();
      if (isNaN(until)) return;

      const diff = Math.floor((until - now) / 1000); // seconds

      const timerMain  = el.closest(".timer-main");
      const previewBox = el.closest(".preview-box");

      /* =======================
         ACTIVE COOLDOWN
      ======================= */
      if (diff > 0) {
        el.innerText = formatCooldown(diff);

        // preview state
        if (previewBox) {
          previewBox.classList.add("try-again");
        }

        return;
      }

      /* =======================
         EXPIRED COOLDOWN
      ======================= */

      // ✅ stop re-processing forever
      if (el.dataset.cooldownDone === "1") return;
      el.dataset.cooldownDone = "1";

      // remove preview timer
      if (timerMain) {
        timerMain.remove();
      }

      if (previewBox) {
        previewBox.classList.remove("try-again");
      }

      /* =======================
         CLAIM BUTTON RESTORE
      ======================= */

      // 🔥 scope to THIS timer's subquest UI
      const claimSection = el.closest(".claim-button") 
                        || document.querySelector(".claim-button");

      if (!claimSection) return;

      const claimBtn = claimSection.querySelector("#claim-task");
      const coolDisplay = claimSection.querySelector(".cool-display");

      // hide cooldown text
      if (coolDisplay) {
        coolDisplay.style.display = "none";
      }

      // show button but keep disabled
      if (claimBtn) {
        claimBtn.style.display = "flex";

        // disabled ONCE (validation controls later)
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


function renderRecurrence(text){
  if (!text || text === "None") return "";

  return `
    <span style="
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-left: 5px;
      border-radius: 12px;
      background: var(--bg-hover-hover);
      padding: 4px;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" 
          width="12" height="12"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          stroke-width="1.7" 
          stroke-linecap="round" 
          stroke-linejoin="round">
        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0
                3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25
                0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
      </svg>
      <span style="font-size: 11px; font-weight: 630;">
        ${text}
      </span>
    </span>
  `;
}









window.__ACTIVE_SUBQUEST__ = null;  
window.__FETCH_LOCK__ = false;    
const recurrenceSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
`;

const cooldownSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
`;
function pushSubquestURL(questUUID, subUUID){
 

  const newPath = `/${communitySlug}/quest/${questUUID}/${subUUID}`;
  const current = window.location.pathname.replace(/\/+$/, "");

  if(newPath !== current){
    window.history.pushState(
      { questUUID, subUUID },
      "",
      newPath
    );
  }
}

function initArrowNavigation(){

  // 🔒 prevent multi-binding
  if(window.__ARROW_NAV_BOUND__) return;
  window.__ARROW_NAV_BOUND__ = true;

  document.addEventListener("click", (e)=>{

    const btn = e.target.closest(".arrow-btn");
    if(!btn) return;

    e.preventDefault();
    e.stopPropagation();

    /* 🔥 DOM order source of truth */
    const allBoxes = [...document.querySelectorAll(".preview-box")];
    if(!allBoxes.length) return;

    /* 🔥 filter navigable */
    const boxes = allBoxes.filter(box => {

      if (box.classList.contains("hidden")) return false;
      if (box.closest(".module-hidden")) return false;

      if (box.classList.contains("locked")) return false;
      if (box.classList.contains("completed")) return false;
      if (box.classList.contains("pending")) return false;
      if (box.classList.contains("try-again")) return false;

      return true;
    });

    if(!boxes.length) return;

    /* 🔥 route state = source of truth */
    if(!window.__ACTIVE_SUBQUEST__){
      activatePreviewBox(boxes[0]);
      return;
    }

    const { questUUID, subUUID } = window.__ACTIVE_SUBQUEST__;

    let index = boxes.findIndex(b =>
      b.dataset.quest === questUUID &&
      b.dataset.subquest === subUUID
    );

    /* fallback */
    if(index === -1){
      activatePreviewBox(boxes[0]);
      return;
    }

    /* LEFT = UP */
    if(btn.classList.contains("left")){
      index = Math.max(index - 1, 0);
    }

    /* RIGHT = DOWN */
    if(btn.classList.contains("right")){
      index = Math.min(index + 1, boxes.length - 1);
    }

    activatePreviewBox(boxes[index]);   // 🔥 unified router path
  });
}


function parseInlineStyles(text){
  let t = text;

  // bold *text*
  t = t.replace(/\*(.*?)\*/g, "<b>$1</b>");

  // italic _text_
  t = t.replace(/_(.*?)_/g, "<i>$1</i>");

  // underline ~text~
  t = t.replace(/~(.*?)~/g, "<u>$1</u>");

  // strike !text!
  t = t.replace(/!(.*?)!/g, "<s>$1</s>");

  return t;
}



function parseInlineStyles(text){
  let t = text;

  t = t.replace(/\*(.*?)\*/g, "<b>$1</b>");
  t = t.replace(/_(.*?)_/g, "<i>$1</i>");
  t = t.replace(/~(.*?)~/g, "<u>$1</u>");
  t = t.replace(/!(.*?)!/g, "<s>$1</s>");

  return t;
}


function parseQuestDescription(text){
  if(!text) return "";

  let out = text;

  /* =========================
     1) INLINE STYLES FIRST
  ========================= */
  out = parseInlineStyles(out);

  /* =========================
     2) ["Text" https://url]
  ========================= */
  out = out.replace(
    /\["([\s\S]*?)"\s+(https?:\/\/[^\s<>"']+)\]/g,
    (match, label, url) => {
      const cleanUrl = url.trim();
      return `<a href="${cleanUrl}" class="quest-link-init" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
  );

  /* =========================
     3) AUTO LINK FULL URLS
  ========================= */
  out = out.replace(
    /(^|[\s>])(https?:\/\/[^\s<>"']+)/g,
    (match, prefix, url) => {

      // prevent nested links
      if(url.includes('href="')) return match;

      return `${prefix}<a href="${url}" class="quest-link-init" target="_blank" rel="noopener noreferrer">${url}</a>`;
    }
  );

  /* =========================
     4) AUTO LINK DOMAINS
  ========================= */
  out = out.replace(
    /(^|[\s>])((?:www\.)?[a-zA-Z0-9-]+\.(?:com|net|org|io|co|app|xyz|site|dev|ai))/g,
    (match, prefix, domain) => {

      // skip if already linked
      if(domain.includes("href=")) return match;

      const url = `https://${domain}`;

      return `${prefix}<a href="${url}" class="quest-link-init" target="_blank" rel="noopener noreferrer">${domain}</a>`;
    }
  );

  /* =========================
     5) REMOVE LINE BREAKS
  ========================= */
  out = out.replace(/\n/g, "");

  return out;
}

function initSocialTooltips(communitySlug) {

  const socialMessages = {
    twitter: "Twitter connection is enabled. Turn it off in ",
    github: "Github connection is enabled. Turn it off in ",
    discord: "Discord connection is enabled. Turn it off in ",
    youtube: "YouTube connection is enabled. Turn it off in ",
    telegram: "Telegram connection is enabled. Turn it off in "
  };

  /* ---------- ROOT CONTAINER ---------- */
  const viewportRoot = document.querySelector('.quest-complete') || document.body;

  /* ---------- CREATE ONE GLOBAL DROPDOWN ---------- */
  const dropdown = document.createElement("div");
  dropdown.className = "info-global-dropdown";

  const textSpan = document.createElement("span");

  const link = document.createElement("a");
  link.className = "settings-link";
  link.textContent = "settings.";
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  // 🔥 IMPORTANT: prevent outside click handler from killing navigation
  link.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  dropdown.appendChild(textSpan);
  dropdown.appendChild(link);
  document.body.appendChild(dropdown);

  let activeInfo = null;

  /* ---------- CLOSE ---------- */
  function closeDropdown() {
    dropdown.classList.remove("active");
    activeInfo = null;
  }

  /* ---------- POSITION ENGINE ---------- */
  function positionDropdown(infoEl) {
    const infoRect = infoEl.getBoundingClientRect();
    const rootRect = viewportRoot.getBoundingClientRect();

    const dropdownWidth = dropdown.offsetWidth || 260;
    const dropdownHeight = dropdown.offsetHeight || 60;
    const gap = 8;

    const viewportTop = rootRect.top + window.scrollY;
    const viewportBottom = rootRect.bottom + window.scrollY;
    const viewportLeft = rootRect.left + window.scrollX;
    const viewportRight = rootRect.right + window.scrollX;

    const infoTop = infoRect.top + window.scrollY;
    const infoBottom = infoRect.bottom + window.scrollY;
    const infoRight = infoRect.right + window.scrollX;

    dropdown.classList.remove("arrow-up", "arrow-down");

    let top;
    let direction = "up";

    const spaceAbove = infoTop - viewportTop;
    const spaceBelow = viewportBottom - infoBottom;

    if (spaceAbove >= dropdownHeight + gap) {
      top = infoTop - dropdownHeight - gap;
      direction = "up";
    } else if (spaceBelow >= dropdownHeight + gap) {
      top = infoBottom + gap;
      direction = "down";
    } else {
      top = viewportTop + 8;
      direction = "up";
    }

    let left = infoRight - dropdownWidth;

    if (left < viewportLeft) left = viewportLeft + 8;
    if (left + dropdownWidth > viewportRight) {
      left = viewportRight - dropdownWidth - 8;
    }

    dropdown.style.top = top + "px";
    dropdown.style.left = left + "px";

    dropdown.classList.add(direction === "up" ? "arrow-down" : "arrow-up");
  }

  /* ---------- BIND CARDS ---------- */
  document.querySelectorAll('.connect-card').forEach(card => {
    const info = card.querySelector('.info');
    const btn  = card.querySelector('.connect-btn');
    if (!info || !btn) return;

    let social = ["twitter", "discord", "youtube", "telegram"]
      .find(s => btn.classList.contains(s)) || "twitter";

    info.addEventListener("click", (e) => {
      e.stopPropagation();

      if (activeInfo === info) {
        closeDropdown();
        return;
      }

      activeInfo = info;

      textSpan.textContent = socialMessages[social];
      link.href = `/community/${communitySlug}/settings/security`;

      dropdown.classList.add("active");
      positionDropdown(info);
    });
  });

  /* ---------- GLOBAL CLOSE EVENTS ---------- */
  document.addEventListener("click", closeDropdown);
  window.addEventListener("resize", closeDropdown);

  document.addEventListener("scroll", closeDropdown, {
    passive: true,
    capture: true
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) closeDropdown();
  });
}

/* =========================
   INLINE STYLE PARSER
========================= */

function renderSocialConnects(socials_to_show = {}, can_view_info = false) {
  if (!socials_to_show) return "";

  const platforms = ["twitter", "discord", "youtube", "telegram", "github"];

  // only active ones
  const activePlatforms = platforms.filter(p => socials_to_show[p]);
  if (!activePlatforms.length) return "";

  const links = {
    twitter: "/twitter/login",
    discord: "/discord/connect",
    youtube: "/youtube/login",
    github: "{{ url_for('github_bp.github_login', next=url_for('account_settings_linked_accounts')) }}",
    telegram: "https://oauth.telegram.org/auth?bot_id=7686743241&origin=YOURDOMAIN&return_to=YOURDOMAIN/telegram/callback"
  };

  const labels = {
    twitter: "Connect Twitter",
    discord: "Connect Discord",
    youtube: "Connect YouTube",
    github: "Link Github",
    telegram: "Connect Telegram"
  };

  return `
    <div class="logic-social">
      ${activePlatforms.map(platform => {
        const iconObj = PLATFORM_ICONS[platform] || {};
        const icon = iconObj.icon || "";
        const color = iconObj.color || "";

        return `
          <div class="connect-card">

            ${
              can_view_info
                ? `
                  <div class="info">
                    <i class="fa-solid fa-circle-question"></i>
                    Why am I seeing this?
                  </div>
                `
                : ""
            }

            <a href="${links[platform]}" 
               class="connect-btn ${platform}" 
               style="${color ? `--platform-color:${color};` : ""}">
              ${icon}
              ${labels[platform]}
            </a>

          </div>
        `;
      }).join("")}
    </div>
  `;
}

function hasBlockingSocials(socials_to_show = {}) {
  return !!(
    socials_to_show.twitter ||
    socials_to_show.discord ||
    socials_to_show.github ||
    socials_to_show.youtube ||
    socials_to_show.telegram
  );
}


function renderQuestBlocks(blocks){
  if(!Array.isArray(blocks) || !blocks.length) return "";

  let html = "";

  blocks.forEach(block => {

    if(block.type === "text"){
      html += `
        <div class="desc-text">
          ${parseQuestDescription(block.html || "")}
        </div>
      `;
    }

    else if(block.type === "image"){
      if(!block.src) return;
      html += `
        <div class="desc-media">
          <img src="${block.src}" loading="lazy" />
        </div>
      `;
    }

    else if(block.type === "video"){
      if(!block.src) return;
      html += `
        <div class="desc-media">
          <video src="${block.src}" controls preload="metadata"></video>
        </div>
      `;
    }

  });

  return html;
}

function renderQuestComplete(data){

  const subquest = data.subquest || {};
  const rewards  = data.rewards || [];
  const tasks    = data.tasks || [];

  const socials_to_show = data.security?.socials_to_show || {};
  const current_sprint  = data.sprint?.current || null;
  const ui = data.ui_state || {};

  const fcfs_claimed_count = ui.fcfs_claimed_count || {};
  const max_claimed_count  = 0; 

  const socialsBlocked = hasBlockingSocials(socials_to_show);

  return `
<div class="quest-content">

  <!-- ================= BACK HEADER ================= -->
  <div class="backto-main-quest-sec">
    <div class="init-things">
      
      <button class="init-back-btn-q"
              onclick="gobacktoquest(event)"
              style="font-size:14px;display:flex;align-items:center;gap:4px; cursor: pointer;">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
          <polyline
            points="328 112 184 256 328 400"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
          />
        </svg>
        Back
      </button>  

      <div class="module-section-back" id="mobile-module-strip"></div>

    </div>
  </div>

  <!-- ================= MAIN CONTENT ================= -->
  <div class="render-content-init">

    <!-- Title -->
    <h1 style="margin-bottom:15px;">${subquest.title || ""}</h1>

    <!-- Meta info -->
    <div class="span-gap"
         style="display:flex;box-sizing:border-box;gap:12px;flex-wrap:wrap;">

      <span class="span-con">
        ${cooldownSvg} Cooldown period: ${subquest.cooldown || "None"}
      </span>

      <span class="span-con">
        ${recurrenceSvg} Recurrence: ${subquest.recurrence || "None"}
      </span>



      ${
        subquest.max_claim !== null && subquest.max_claim !== undefined
          ? `
            <span class="span-con">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 50 50" fill="none" style="position: relative; top: -1.3px;">
        <g transform="scale(1) translate(5, 5)" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <!-- Four vertical tally lines -->
          <line x1="5" y1="40" x2="5" y2="10"/>
          <line x1="15" y1="40" x2="15" y2="10"/>
          <line x1="25" y1="40" x2="25" y2="10"/>
          <line x1="35" y1="40" x2="35" y2="10"/>
          
          <!-- Fifth diagonal line crossing the four -->
          <line x1="0" y1="10" x2="40" y2="40"/>
        </g>
      </svg>


              <span class="span-con cunter-sg-text">${subquest.claim_count ?? 0}/${subquest.max_claim}</span>
              
            </span>
          `
          : ``
      }

      ${
        subquest.streak_enabled && subquest.recurrence?.toLowerCase() === "daily"
          ? `
            <span class="span-con streak">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
              </svg>
              Streak
            </span>
            `
          : ``
      }
    </div>

    ${
      rewards.length
        ? `
          <div class="reward-label">Rewards</div>

          <div class="rewards-list" style="gap:10px;margin-top:10px;">
            ${rewards.map((reward, i) =>
              renderRewardCard(reward, i, fcfs_claimed_count)
            ).join("")}
          </div>
        `
        : ""
    }


    <!-- Description -->
    ${
      subquest.desc
      ? `
        <div class="quest-sdesc">
          ${renderQuestBlocks(subquest.desc)}
        </div>
      `
      : ""
    }
    <!-- Social connects -->
    ${renderSocialConnects(socials_to_show, data.community?.can_view_info)}

    <!-- Tasks header -->
    ${tasks.length === 1 
      ? `<div class="tasks-title ${!rewards.length ? "no-reward" : ""}">Task</div>` 
      : tasks.length > 1 
        ? `<div class="tasks-title ${!rewards.length ? "no-reward" : ""}">Tasks</div>` 
        : ""}


    <!-- Tasks list -->
    <div class="tasks-list ${socialsBlocked ? "disabled-tasks" : ""}" style="width: 100%;">
      ${tasks.map(task => renderTask(task)).join("")}
    </div>

    <!-- Claim section -->

  </div>
    ${renderClaimSection(subquest, ui, socials_to_show)}

</div>
`;
}


function getNavigablePreviewBoxes(){
  let scope;

  // 🔥 detect active view (mobile sprint/all)
  if (window.innerWidth <= 767) {
    const wrapper = document.querySelector(".sprint-view-wrapper");

    if (window.__SPRINT_MODE__ === "sprint") {
      scope = wrapper?.querySelector(".sprint-view-sprint");
    } else {
      scope = wrapper?.querySelector(".sprint-view-all");
    }
  } else {
    scope = document;
  }

  if(!scope) return [];

  return [...scope.querySelectorAll(".preview-box")]
    .filter(box => {

      // hidden by filters / sprint
      if (box.classList.contains("hidden")) return false;
      if (box.closest(".module-hidden")) return false;

      // blocked states
      if (box.classList.contains("locked")) return false;
      if (box.classList.contains("completed")) return false;
      if (box.classList.contains("pending")) return false;
      if (box.classList.contains("try-again")) return false;

      return true;
    });
}

function activatePreviewBox(box){
  if(!box) return;

  // clear active
  document.querySelectorAll(".preview-box.active")
    .forEach(b => b.classList.remove("active"));

  box.classList.add("active");

  // 🔥 direct routing (NO DOM EVENTS)
  routeToSubquest(box);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSubquestByUUID(window.__INIT_SUBQUEST_UUID__);
        });
      })

}



function createInviteOverlay(communitySlug, taskId) {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <div class="invite-overlay">
      <div class="invite-modal">
        <button class="invite-close-btn" id="closeModalBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
  
        </button>

        <h2>Invited friends</h2>

        <div class="invite-tabs">
          <button class="invite-tab invite-active"
            data-url="/${communitySlug}/${taskId}/active_invite">Active</button>

          <button class="invite-tab"
            data-url="/${communitySlug}/${taskId}/pending_invite">Pending</button>

          <button class="invite-tab"
            data-url="/${communitySlug}/${taskId}/consumed_invite">Consumed</button>
        </div>

        <div class="invite-content">Loading invites...</div>
      </div>
    </div>
  `;

  const overlay = wrapper.firstElementChild;

  // 🔒 hidden by default
  overlay.style.display = "none";

  document.body.appendChild(overlay);
  return overlay;
}



function destroyInviteOverlay(){
  document.querySelectorAll(".invite-overlay").forEach(o=>{
    o.remove();
  });
}


function initInviteModal(overlay){

  if(!overlay) return;

  const inviteTabs     = overlay.querySelectorAll('.invite-tab');
  const inviterContent = overlay.querySelector('.invite-content');
  const closeBtn       = overlay.querySelector("#closeModalBtn");

async function loadInviterContent(url, tab){
  inviterContent.innerHTML = "Loading...";

  try{
    const res = await fetch(url);

    if(!res.ok){
      throw new Error("HTTP error " + res.status);
    }

    const html = await res.text();
    inviterContent.innerHTML = html;

    // ✅ safe calls
    if(typeof initCopyButtons === "function"){
      initCopyButtons();
    }

    if(typeof initSubquestRedirects === "function"){
      initSubquestRedirects();
    }

  }catch(e){
    console.error("Invite load error:", e);
    inviterContent.innerHTML = "Error loading invites.";
  }

  inviteTabs.forEach(t=>t.classList.remove("invite-active"));
  if(tab) tab.classList.add("invite-active");
}


  /* Tabs */
  inviteTabs.forEach(tab=>{
    tab.addEventListener("click", ()=>{
      loadInviterContent(tab.dataset.url, tab);
    });
  });

  /* Close */
  closeBtn.addEventListener("click", ()=>{
    destroyInviteOverlay(); // 💥 destroy
  });

  /* Click outside */
  overlay.addEventListener("click",(e)=>{
    if(e.target === overlay){
      destroyInviteOverlay(); // 💥 destroy
    }
  });

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest(".show-invite");
    if(!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const inviteCard = btn.closest(".card-container-quest.invite-task");
    if(!inviteCard) return;

    const taskId = inviteCard.dataset.taskId;
    if(!taskId) return;

    // 💥 destroy any existing overlay
    destroyInviteOverlay();

    // 🆕 create fresh overlay
    const overlay = createInviteOverlay(communitySlug, taskId);

    // init modal logic
    initInviteModal(overlay);

    // 👁 show
    overlay.style.display = "flex";
  });

  // load default tab
  const defaultUrl = inviteTabs[0].dataset.url;
  loadInviterContent(defaultUrl, inviteTabs[0]);
}

window.gobacktoquest=gobacktoquest
function gobacktoquest(e){
  if(e){
    e.preventDefault();
    e.stopPropagation();
  }

  const container = document.querySelector(".quest-complete");
  const layout    = document.querySelector(".layout-root");

  /* 🔥 Destroy modals / overlays */
  destroyInviteOverlay();

  /* 🔥 Clear active state */
  document.querySelectorAll(".preview-box.active")
    .forEach(b => b.classList.remove("active"));

  if(container){
    container.classList.add("quest-hidden");
    container.innerHTML = "";
  }

  /* 🔥 Restore layout */
  if(layout){
    layout.classList.remove("quest-open");
  }

  /* 🔥 Reset global state */
  window.__ACTIVE_SUBQUEST__ = null;
  window.__UI_STATE__ = {};
  window.__FETCH_LOCK__ = false;

  /* 🔥 Reset URL */
  history.pushState({}, "", `/${communitySlug}/quest`);



  /* 🔥 Re-init preview systems */
  initResponsivePreviewGrid();
  initPreviewKeyboardNav();
  initArrowNavigation();

  /* 🔥 Scroll back */
  const grid = document.querySelector(".preview-grid, .preview-container, .preview-root");
  if(grid){
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}






function renderTask(task){
  if(!task || !task.type) return "";
  /* ============================
     INPUT TASKS (UI ONLY)
     ============================ */
  if(task.type === "url" || task.type === "text" || task.type === "numbers"){

    let inputType = "text";
    let title = "";
    let desc = "";
    let placeholder = "";

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

    return `
<div class="card-container-quest input-task ${task.type}" style="color: var(--accent-${task.type})" data-task-id="${task.id}">

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

</div>`;
  }

  /* ============================
     DISCORD
     ============================ */
  if(task.type === "discord"){
    return `
<div class="card-container-quest discord" style="color: var(--accent-discord)" data-task-id="${task.id}">
  <div class="badge-quest">
    <span class="badge-icon-quest">${PLATFORM_ICONS.discord.icon}</span>
    <span>Discord</span>
  </div>

  <div class="card-wrapper-quest">
    <div class="card-quest">
      <div class="content-quest">
        <div class="avatar-quest">
          <img src="${task.config?.icon || ""}">
        </div>
        <h2>${task.config?.name || "Discord"}</h2>
        <a class="cta-quest"
           href="${task.config?.link || "#"}"
           target="_blank"
           style="background: var(--accent-discord-text)">
          Join ${task.config?.name || "Server"}
        </a>

        <p style="display: none;" class="discord-errir" >Join the Discord server to claim this task</p>

      </div>
    </div>
  </div>
</div>`;
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

    <div class="card-container-quest social-task github"
        style="color: var(--accent-github)"  data-task-id="${task.id}">

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
            <p style="display:none" class="github-error">
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
  }
  /* ============================
     YOUTUBE
     ============================ */
  else if(task.type === "youtube"){
    return `
<div class="card-container-quest youtube" style="color: var(--accent-youtube)" data-task-id="${task.id}">
  <div class="badge-quest">
    <span class="badge-icon-quest">${PLATFORM_ICONS.youtube.icon}</span>
    <span>YouTube</span>
  </div>

  <div class="card-wrapper-quest">
    <div class="card-quest">
      <div class="content-quest">
        <div class="avatar-quest">
          <img src="${task.config?.icon || ""}">
        </div>
        <h2>${task.config?.name || "YouTube"}</h2>
        <a class="cta-quest"
           href="${task.config?.link || "#"}?sub_confirmation=1"
           target="_blank"
           style="background: var(--accent-youtube-text)">
          Subscribe to ${task.config?.name || "Channel"}
        </a>

        <div style="display: none;" class="yotube-error">Subcribe to the channel to claim this task</div>

      </div>
    </div>
  </div>
</div>`;
  }

  /* ============================
     TELEGRAM
     ============================ */
  else if(task.type === "telegram"){
    return `
<div class="card-container-quest telegram" style="color: var(--accent-telegram)" data-task-id="${task.id}">
  <div class="badge-quest">
      <span class="badge-icon-quest">${PLATFORM_ICONS.telegram.icon}</span>
      <span>Telegram</span>
    </div>

    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest">
          <div class="avatar-quest">
            <img src="${task.config?.icon || ""}">
          </div>
          <h2>${task.config?.name || "Telegram"}</h2>
          <a class="cta-quest"
            href="${task.config?.link || "#"}"
            target="_blank"
            style="background: var(--accent-telegram-text)">
            Join ${task.config?.name || "Channel"}
          </a>
          <p class="telegram-error" style="display: none;"></p>

        </div>
      </div>
    </div>
  </div>`;
  }
  /* ============================
   PARTNERSHIP
   ============================ */
  else if (task.type === "partnership") {

    return `
  <div class="card-container-quest partnership" data-type="partnership" data-task-id="${task.id}" style="color: var(--accent-partnership)">

    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS.partnership?.icon || "🤝"}
      </span>
      <span>Partnership</span>
    </div>

    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest">

          <div class="avatar-quest">
            <img 
              src="https://images.seeklogo.com/logo-png/46/1/nativa-fm-logo-png_seeklogo-464973.png"
            />
            <span class="partnerFallback fallback-letter"></span>
          </div>

          <h2 class="community_name">
            ${task.config?.community_name || "Community"}
          </h2>

          <div class="description-parnership">
            ${task.config?.about || ""}
          </div>

          <a href="${task.config?.link || "#"}"
            class="cta-quest"
            target="_blank"
            rel="noopener noreferrer"
            style="background: var(--accent-partnership-text)">
            Join
          </a>

          <p class="partnership-error" style="color: red; display: none;">
            Join the community to claim this task
          </p>

        </div>
      </div>
    </div>

  </div>`;
  }


  else if (task.type === "partnership_quest") {


    return `
  <div class="card-container-quest partnership_quest" data-type="partnership_quest" data-task-id="${task.id}" style="color: var(--accent-p-quest)">

    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS.partnership?.icon || "🤝"}
      </span>
      <span>Partnership Quest</span>
    </div>

    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest">

          <div class="avatar-quest">
            <img 
              src="https://images.seeklogo.com/logo-png/46/1/chatgpt-logo-png_seeklogo-465219.png"
              alt="Profile picture"
              style="display: block !important;" 
            />
            <span class="partnerFallback fallback-letter"></span>
          </div>

          <h2 class="community_name">
            ${task.config?.community_name || "Community"}
          </h2>

          <div class="description-parnership">
            ${task.config?.subquest_name || ""}
          </div>

          <a href="${task.config?.link || "#"}"
            class="cta-quest"
            target="_blank"
            rel="noopener noreferrer"
            style="background: var(--accent-p-quest-text)">
            Go to quest
          </a>

          <p class="partnership-error" style="color: red; display: none;">
            
          </p>

        </div>
      </div>
    </div>

  </div>`;
  }



  /* ============================
    OPTIONSCALE (STAR)
    ============================ */
  else if(task.type === "Optionscale(star)"){

    const starCount = task.config?.starCount || 5;

    return `
  <div class="card-container-quest optionscale-star" 
      data-type="Optionscale(star)" 
      data-task-id="${task.id}"
      style="color: var(--accent-star)">

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
          <svg viewBox="0 0 24 24" width="30" height="30"   xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
          </svg>
            `).join("")}
          </div>

        </div>
      </div>
    </div>

  </div>`;
  }


  else if(task.type === "Optionscale(numbers)") {
    const start = parseInt(task.config?.scale?.from) || 1;
    const end = parseInt(task.config?.scale?.to) || 10;
    const numbers = Array.from({length: end - start + 1}, (_, i) => start + i);

    return `
  <div class="card-container-quest optionscale-numbers" 
      data-type="Optionscale(numbers)" 
      data-task-id="${task.id}"
      style="color: var(--accent-numbers)">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS["optionscale(numbers)"]?.icon || "🔢"}
      </span>
      <span>Number Scale</span>
    </div>

    <!-- Wrapper -->
    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest numbers">

          <!-- Title and description -->
          <div class="polltitn">${task.title || "Your Take"}</div>
          <div class="polldescn">${task.description || ""}</div>

          <!-- Numbers container -->
          <div class="number-container js-number-container">
            ${numbers.map(num => `<div class="number-box">${num}</div>`).join('')}
          </div>

          <!-- Left & Right labels -->
          <div class="containersters">
            <div class="left-div js-left-label">${task.labels?.left || ""}</div>
            <div class="right-div js-right-label">${task.labels?.right || ""}</div>
          </div>

        </div>
      </div>
    </div>
  </div>
    `;
  }


  else if (task.type === "visit-link") {

    const link = task.config?.link || "#";
    const preview = task.config?.preview || {};

    return `
  <a href="${link}"
    target="_blank"
    rel="noopener noreferrer"
    class="card-container-quest visit-link"
    data-type="visit-link"
    data-task-id="${task.id}"
    style="color: var(--accent-link)">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS["visit-link"]?.icon || "🔗"}
      </span>
      <span>Visit Link</span>
    </div>

    <!-- Wrapper -->
    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest link-root">

          <div class="js-link-preview">

            <div class="js-link-preview-inner"
                style="display:flex; gap:12px; align-items:center;
                ${(!preview.image && !preview.title && !preview.description) ? "display:none;" : ""}">

              ${
                preview.image
                ? `<img class="js-link-preview-img"
                        src="${preview.image}"
                        style="width:120px;height:120px;border-radius:10px;object-fit:cover;">`
                : ``
              }

              <div class="link-text-wrap">
                <div class="js-link-preview-title">
                  ${preview.title || "Visit link"}
                </div>

                <div class="js-link-preview-desc">
                  ${preview.description || ""}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>

  </a>`;
  }

  /* ============================
    QUIZ
    ============================ */
  else if(task.type === "quiz") {

    const allowMulti = !!task.config?.allowMultipleSelection;
    const options = task.config?.options || [];

    return `
  <div class="card-container-quest quiz" 
      data-type="quiz" 
      data-task-id="${task.id}"
      style="color: var(--accent-quiz)">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">${PLATFORM_ICONS["quiz"]?.icon || "🧠"}</span>
      <span>Quiz</span>
    </div>

    <!-- Wrapper -->
    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest quiz-root">

          <div class="polltitq">
            ${task.config?.title || "Quiz"}
          </div>

          <div class="polldescq">
            ${task.config?.description || ""}
          </div>

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

          <div class="wrong-anser">
            Almost there! Try another answer.
          </div>

        </div>
      </div>
    </div>

  </div>`;
  }


  else if (task.type === "poll") {

    const allowMulti = !!task.config?.multiple;
    const options = task.config?.options || [];
    const allowOther = !!task.config?.other;

    return `
  <div class="card-container-quest poll" 
      data-type="poll" 
      data-task-id="${task.id}"
      style="color: var(--accent-poll)">

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
            ${task.config?.title || "Poll"}
          </div>

          <!-- Description -->
          <div class="polldescq">
            ${task.config?.description || ""}
          </div>

          <!-- Options -->
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
                  onfocus="this.previousElementSibling.querySelector('input').checked = true"
                />
              </div>
            ` : ""}

          </div>

        </div>
      </div>
    </div>

  </div>`;
  }

  else if (task.type === "file-upload") {

    const fileCount = task.config?.fileCount || 1;
    const fileTypes = task.config?.fileTypes || [];
    const accept = buildAcceptString(fileTypes);

    return `
  <div class="card-container-quest file-upload"
      data-type="file-upload"
      data-task-id="${task.id}"
      style="color: var(--accent-upload)">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
       ${PLATFORM_ICONS["file-upload"].icon}
      </span>
      <span>File Upload</span>
    </div>

    <!-- Wrapper -->
    <div class="card-wrapper-quest file-up">
      <div class="card-quest">
        <div class="content-quest uploader-root"
            data-file-count="${fileCount}"
            data-file-types="${fileTypes.join(",")}">

          <!-- Upload UI -->
          <div class="upload-box-init-q">

            <div class="dragPrompt">
              <span class="initialPrompt">
                <span class="choose-file">Choose a file</span>
              </span>
              <span> or </span>
              <strong>drag & drop here</strong>
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

  </div>`;
  }
else if (task.type === "puzzle") {

  const title = task.config?.title || "Puzzle";
  const desc = task.config?.description || "";
  const placeholder = task.config?.placeholder || "";

  return `
  <div class="card-container-quest input-task puzzle"
       data-task-id="${task.id}"
       style="color: var(--accent-puzzle)">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS["puzzle"]?.icon || "🧩"}
      </span>
      <span class="position-pp-zle">Puzzle</span>
    </div>

    <!-- Wrapper -->
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
  </div>`;
}

  else if (task.type === "invite") {

    const numInvites = task.config?.numInvites || 1;
    const activeInvites = task.progress?.active_invites || 0;
    const inviteCode = task.config?.invite_code || "";
    const percentComplete = numInvites > 0 
      ? Math.min(100, Math.round((activeInvites / numInvites) * 100)) 
      : 0;

    const xpForValidInvite = task.config?.xp_for_valid_invite || 0;

    const subquestName = task.config?.subquest_name || null;
    const subquestUUID = task.config?.subquest_uuid || null;

    const questUUID = task.quest_uuid || "";


    const inviteLink = `${window.location.origin}/${communitySlug}/invite/${inviteCode}`;

    return `
  <div class="card-container-quest invite-task"
      data-type="invite"
      data-task-id="${task.id}"
      style="color: var(--accent-invite)">

    <!-- Badge -->
    <div class="badge-quest">
      <span class="badge-icon-quest">
        ${PLATFORM_ICONS["invite"]?.icon || "✉️"}
      </span>
      <span>Invite</span>
    </div>

    <!-- Wrapper -->
    <div class="card-wrapper-quest">
      <div class="card-quest">
        <div class="content-quest invite-root">

          <!-- Header -->
          <div class="invite-header">

            <div class="progress-header">
              <span class="invite-count">
                <strong>${activeInvites}</strong> /
                <span class="quering-root">${numInvites}</span>
              </span>

              <span class="invite-remaining">
                Invite <strong>${Math.max(0, numInvites - activeInvites)}</strong> more friends to claim
              </span>
            </div>

            <div class="progress-bared">
              <div class="progress-filled" style="width:${percentComplete}%;"></div>
            </div>

          </div>

          <!-- Invite Link -->
          <div class="invite-link-wrapper">
            <div class="invite-link-box">
              <div class="invite-link" data-invite-link="${inviteLink}">
                ${inviteLink}
              </div>
            </div>
            <button class="copy-btn-quest" data-copy-link="${inviteLink}" onclick="copyInviteLink(this)">Copy</button>
          </div>

          <!-- Conditions -->
          <div class="conditon-invite">

            <div class="invite-text-title">How to invite?</div>

            <div class="content-block-quest">
              <div class="text-bold">1. Recruits join through link</div>
              <div class="text-small-invite">
                New member signs up using your unique invite link.
              </div>
            </div>

            <div class="content-block-quest">
              <div class="text-bold">
                2. Reach <span class="xp-together">${xpForValidInvite} XP</span>
              </div>
              <div class="text-small-invite">
                Recruits earn at least <span class="xp-together">${xpForValidInvite} XP</span> through quests.
              </div>
            </div>

            ${
              subquestName && subquestUUID
              ? `
              <div class="content-block-quest">
                <div class="text-bold">
                  3. Complete "${subquestName}" quest
                </div>
                <div class="text-small-invite">
                  Complete 
                  <a class="subquest-named"
                    href="/${communitySlug}/quest/${questUUID}/${subquestUUID}">
                    ${subquestName}
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="13" height="13" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="icon-inline">
                      <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                  </a>  
                  quest to count for this quest.
                </div>
              </div>
              `
              : ``
            }

          </div>

          <!-- Footer -->
          <button class="show-invite" data-task-id="${task.id}">
            <span style="margin-left:4px;">Show my invites</span>
          </button>

        </div>
      </div>
    </div>

  </div>`;
  }

/* ============================
   PROOF OF HUMANITY (P.O.H)
   ============================ */
else if (task.type === "p.o.h") {

  return `
<div class="card-container-quest poh"
     data-type="p.o.h"
     data-task-id="${task.id}"
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


        <!-- Title -->
        <div class="poh-title">
          Verify Your Humanity
        </div>

        <!-- Subtitle -->
        <div class="poh-subtitle">
          Click below to prove you’re real"
        </div>

        <!-- CTA -->
        <a href="${task.config?.link || "#"}"
           target="_blank"
           rel="noopener noreferrer"
           class="cta-quest poh-btn" >
          Claim Verification
        </a>

        <!-- Error / status -->
        <p class="prove-self" style="display:none;">
          Verification required to continue
        </p>

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




function safeClassName(str){
  return String(str || "")
    .toLowerCase()
    .replace(/\s+/g, "-")      // spaces → dash
    .replace(/[^\w-]/g, "");   // remove () * etc
}


function initPreviewKeyboardNav(){

  // 🔒 prevent multi-binding
  if(window.__KEYBOARD_NAV_BOUND__) return;
  window.__KEYBOARD_NAV_BOUND__ = true;

  document.addEventListener("keydown", (e)=>{

    if(e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    e.preventDefault();
    e.stopPropagation();

    /* 🔥 get DOM order list */
    const allBoxes = [...document.querySelectorAll(".preview-box")];

    if(!allBoxes.length) return;

    /* 🔥 filter navigable */
    const boxes = allBoxes.filter(box => {

      if (box.classList.contains("hidden")) return false;
      if (box.closest(".module-hidden")) return false;

      if (box.classList.contains("locked")) return false;
      if (box.classList.contains("completed")) return false;
      if (box.classList.contains("pending")) return false;
      if (box.classList.contains("try-again")) return false;

      return true;
    });

    if(!boxes.length) return;

    /* 🔥 source of truth = route state */
    if(!window.__ACTIVE_SUBQUEST__){
      activatePreviewBox(boxes[0]);
      return;
    }

    const { questUUID, subUUID } = window.__ACTIVE_SUBQUEST__;

    let index = boxes.findIndex(b =>
      b.dataset.quest === questUUID &&
      b.dataset.subquest === subUUID
    );

    /* fallback */
    if(index === -1){
      activatePreviewBox(boxes[0]);
      return;
    }

    if(e.key === "ArrowDown"){
      index = Math.min(index + 1, boxes.length - 1);
    }

    if(e.key === "ArrowUp"){
      index = Math.max(index - 1, 0);
    }

    activatePreviewBox(boxes[index]);

  }, { passive:false });
}


function renderClaimSection(subquest, ui, socials_to_show) {
  const remaining = ui?.remaining?.[subquest.id] ?? 0;
  const cooldownTs = ui?.cooldowns?.[subquest.id] ?? 0;
  const completed = ui?.completed_subquests?.includes(subquest.id);

  const socialsBlocked = hasBlockingSocials(socials_to_show);
  const isLoggedIn = currentUserId && currentUserId !== "None";

  return `
    <div class="claim-button">

      <button class="arrow-btn left" style="outline:none;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>

      <!-- Completed badge -->
      <div class="forquest-main" style="${!completed ? "display:none" : ""}">
        <div class="forquest-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" fill="currentColor" stroke="currentColor">
            <path d="m85.652 6.5938c-15.199 4.6992-33.309 28.609-50.668 53.164-7.3672-12.414-15.172-16.559-23.242-12.312-0.99609 0.52344-1.6523 1.5273-1.7344 2.6562-0.082031 1.1406 0.42969 2.2422 1.3555 2.918 5.8516 4.2734 11.922 11.848 19.141 23.84v-0.003906c1.2891 2.1758 3.6328 3.5039 6.1562 3.4883h0.11719c2.6016-0.023438 4.9844-1.4453 6.2461-3.7188 7.0234-12.734 14.738-25.07 23.109-36.957 6.8594-9.75 14.508-18.926 22.867-27.43 1.125-1.1016 1.332-2.8359 0.5-4.1719-0.77734-1.332-2.3789-1.9453-3.8477-1.4727z"/>
          </svg>
          <span class="completed-forquest">Completed</span>
        </div>
      </div>

      <!-- Cooldown / Claim button -->
      <div class="cool-display claim-ppqq" style="display: none">
        Try again in:
        <span class="cooldown-retry">3s</span>
      </div>

      ${!completed ? `
        ${
          !isLoggedIn
            ? `
              <button
                style="outline:none; ${remaining > 0 ? "display:none;" : ""}"
                class="claim-task login"
                onclick="openAuthModal()">
                Log in
              </button>
            `
            : `
              <button id="claim-task" 
                      data-subquest-id="${subquest.id}"
                      style="outline:none; ${remaining > 0 ? "display:none;" : ""}"
                      class="claim-task disable ${socialsBlocked ? "disabled-task" : ""}"
                      ${socialsBlocked ? "disabled aria-disabled='true'" : ""}>
                Claim
              </button>
            `
        }
      ` : ``}

      <button class="arrow-btn right" style="outline:none;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>

    </div>
  `;
}







function renderRewardCard(reward, index, fcfs_claimed_count = {}, has_any_role = true){
  const d   = reward.reward_data || {};
  const sub = d.subcontent || {};

  /* =========================
     ICON + HEADER TEXT
  ========================= */
  const iconSvg = REWARD_ICONS[reward.distribution_type] || REWARD_ICONS.ALL;

  let extra = "";
  if (reward.distribution_type === "RAFFLE") {
    extra = `(${sub.num_rewards || 0})`;
  } 
  else if (reward.distribution_type === "VOTE") {
    extra = `(${sub.num_rewards || 0})`;
  } 
  else if (reward.distribution_type === "FCFS") {
    const claimed = fcfs_claimed_count[reward.id] || 0;
    const max = sub.max_supply || 0;
    extra = `(${claimed}/${max})`;
  }

  /* =========================
     BODY CONTENT
  ========================= */
  let bodyHTML = "";
  let cardTypeClass = "";

  if (reward.reward_type === "xp") {

    cardTypeClass = "card-xp";
    bodyHTML = `
      <h1 class="xp-com">XP</h1>
      <div class="xp-value">${d.amount || 0}</div>
    `;
  } 
  else if (reward.reward_type === "role") {
    cardTypeClass = "card-role";
    bodyHTML = `
      <img 
        src="https://xpcqiovfesvllsljxhac.supabase.co/storage/v1/object/public/uploads/discord_reward.png"
        alt="Discord Reward"
        draggable="false"
        oncontextmenu="return false;"
      >
      <div class="xp-value">${d.role || ""}</div>
    `;
  } 
  else if (reward.reward_type === "token") {
    cardTypeClass = "card-token";
    bodyHTML = `
      <div class="xp-value">
        ${d.amount_per_winner || ""} ${d.symbol || ""}
      </div>
    `;
  } 
  else {
    cardTypeClass = "card-custom";
    bodyHTML = `
      <div class="xp-value">${d.text || "Custom"}</div>
    `;
  }

  /* =========================
     DISABLED STATE
  ========================= */
  const disabledClass = has_any_role ? "" : "disabled-card";
  const cursorStyle   = has_any_role ? "cursor:pointer;" : "";

  /* =========================
     FINAL TEMPLATE
  ========================= */
  return `
    <div class="all-container">
      <div class="card ${disabledClass}" 
           onclick="openModal(${index})"
           style="${cursorStyle}">
        
        <div class="card-header">
          <span class="setup-complete reward-icon">
            ${iconSvg}
          </span>

          <span class="distribution-type">
            ${reward.distribution_type}
          </span>

          <span class="reward-extra">
            ${extra}
          </span>
        </div>

        <div class="${cardTypeClass}">
          ${bodyHTML}

          <div class="sparkle one"></div>
          <div class="sparkle two"></div>
          <div class="sparkle three"></div>
        </div>

      </div>
    </div>
  `;
}

let __PREVIEW_RESIZE_OBSERVER__ = null;
let __PREVIEW_RESIZE_HANDLER__ = null;


function initPreviewBoxRouting(){

  document.addEventListener("click", (e)=>{
    const box = e.target.closest(".preview-box");
    if(!box) return;

    e.preventDefault();
    e.stopPropagation();

    if (box.classList.contains("pending")) {
      console.log("⛔ [click] Blocked — quest is pending");
      return;
    }

    routeToSubquest(box);  
  });

}

window.goToNextQuest = goToNextQuest

function goToNextQuest(){

  /* 🔥 DOM order source */
  const allBoxes = [...document.querySelectorAll(".preview-box")];
  if (!allBoxes.length) return;

  /* 🔥 navigable filter */
  const isFree = (box) => {
    if (box.classList.contains("hidden")) return false;
    if (box.closest(".module-hidden")) return false;
    if (box.classList.contains("locked")) return false;
    if (box.classList.contains("completed")) return false;
    if (box.classList.contains("pending")) return false;
    if (box.classList.contains("try-again")) return false;
    return true;
  };

  /* 🔥 find current active index */
  let currentIndex = -1;

  // 1) route state first
  if (window.__ACTIVE_SUBQUEST__) {
    const { questUUID, subUUID } = window.__ACTIVE_SUBQUEST__;
    currentIndex = allBoxes.findIndex(b =>
      b.dataset.quest === questUUID &&
      b.dataset.subquest === subUUID
    );
  }

  // 2) fallback → .active class
  if (currentIndex === -1) {
    currentIndex = allBoxes.findIndex(b => b.classList.contains("active"));
  }

  // 3) no active at all → go first free
  if (currentIndex === -1) {
    const firstFree = allBoxes.find(isFree);
    if (firstFree) activatePreviewBox(firstFree);
    return;
  }

  /* 🔁 scan forward */
  for (let i = currentIndex + 1; i < allBoxes.length; i++) {
    if (isFree(allBoxes[i])) {
      activatePreviewBox(allBoxes[i]);
      return;
    }
  }

  /* 🔁 wrap to top */
  for (let i = 0; i < currentIndex; i++) {
    if (isFree(allBoxes[i])) {
      activatePreviewBox(allBoxes[i]);
      return;
    }
  }

  // ❌ nothing free → do nothing
}






function renderMobileModuleStrip(){
  // 📱 mobile only
  if(window.innerWidth > 1059) return;

  const strip = document.getElementById("mobile-module-strip");
  if(!strip) return;
  if(!window.__QUEST_CACHE__) return;

  strip.innerHTML = "";

  window.__QUEST_CACHE__.forEach(q=>{
    const pill = document.createElement("div");
    pill.className = "mobile-module-item";
    pill.dataset.quest = q.uuid;
    pill.innerText = q.title;

    pill.addEventListener("click", ()=>{
      activateMobileModule(q.uuid);
    });

    strip.appendChild(pill);
  });

  // 🔥 set active immediately from route state
  syncMobileModuleActive()


}


function syncMobileModuleActive(){
  if(window.innerWidth > 1059) return;
  if(!window.__ACTIVE_SUBQUEST__) return;

  const { questUUID } = window.__ACTIVE_SUBQUEST__;
  const strip = document.getElementById("mobile-module-strip");
  if(!strip) return;

  strip.querySelectorAll(".mobile-module-item")
    .forEach(i=>i.classList.remove("active"));

  const el = strip.querySelector(
    `.mobile-module-item[data-quest="${questUUID}"]`
  );

  if(el) el.classList.add("active");
}




function activateMobileModule(questUUID){
  if(window.innerWidth > 1059) return;
  if(!window.__QUEST_CACHE__) return;

  const quest = window.__QUEST_CACHE__.find(q=>q.uuid === questUUID);
  if(!quest) return;

  // 🔥 single active UI
  const strip = document.getElementById("mobile-module-strip");
  if(strip){
    strip.querySelectorAll(".mobile-module-item")
      .forEach(i=>i.classList.remove("active"));

    const el = strip.querySelector(
      `.mobile-module-item[data-quest="${questUUID}"]`
    );
    if(el) el.classList.add("active");
  }

  // 🔥 find first valid subquest in that module
  let targetBox = null;

  for(const sq of quest.subquests){

    // sprint respect
    if(window.__SPRINT_MODE__ === "sprint" && !sq.is_in_current_sprint) continue;

    const box = document.querySelector(
      `.preview-box[data-quest="${questUUID}"][data-subquest="${sq.uuid}"]`
    );

    if(!box) continue;

    // same guards as everywhere else
    if (box.classList.contains("hidden")) continue;
    if (box.closest(".module-hidden")) continue;
    if (box.classList.contains("locked")) continue;
    if (box.classList.contains("completed")) continue;
    if (box.classList.contains("pending")) continue;
    if (box.classList.contains("try-again")) continue;

    targetBox = box;
    break;
  }

  if(targetBox){
    activatePreviewBox(targetBox); // 🔥 unified router
  }
}


function parseUtc(dateString) {
  if (!dateString) return null;

  // If it already has timezone info, trust it
  if (dateString.endsWith("Z") || /[+-]\d\d:\d\d$/.test(dateString)) {
    return new Date(dateString);
  }

  // Otherwise, force UTC
  return new Date(dateString.replace(" ", "T") + "Z");
}


function hasNextPlayableQuest(currentBox){

  const boxes = [...document.querySelectorAll(".preview-box")];

  const index = boxes.indexOf(currentBox);
  if(index === -1) return false;

  const nextBoxes = boxes.slice(index + 1);

  return nextBoxes.some(box => {

    if(
      box.classList.contains("locked") ||
      box.classList.contains("completed") ||
      box.classList.contains("pending") ||
      box.classList.contains("review") ||
      box.classList.contains("try-again")
    ){
      return false;
    }

    return true; // playable found
  });
}




function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}


function createQuestCompleteSkeleton(container) {
  if (!container) return;

  const skeleton = document.createElement("div");

  skeleton.className = "render-content-init";
  skeleton.innerHTML = `
    <div class="sqsk-container">

      <!-- TOP BAR -->
      <div class="sqsk-topbar">
        <div class="sqsk sqsk-back"></div>
        <div class="sqsk sqsk-pill"></div>
      </div>

      <!-- TITLE -->
      <div class="sqsk sqsk-title"></div>

      <!-- META -->
      <div class="sqsk-meta">
        <div class="sqsk sqsk-meta-item"></div>
        <div class="sqsk sqsk-meta-item"></div>
      </div>

      <div class="sqsk-main">

        <!-- LEFT -->
        <div class="sqsk-left">
          <div class="sqsk sqsk-section"></div>

          <div class="sqsk-reward-card">
            <div class="sqsk sqsk-card-label"></div>
            <div class="sqsk sqsk-reward"></div>
          </div>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="sqsk-right">
        <div class="sqsk sqsk-section"></div>

        <div class="sqsk-tab"></div>

        <div class="sqsk-quest-card">
          <div class="sqsk sqsk-question"></div>
          <div class="sqsk sqsk-input"></div>
        </div>
      </div>

      <!-- ACTION -->
      <div class="sqsk-bottom-bar">
        <div class="sqsk sqsk-circle"></div>
        <div class="sqsk sqsk-btn"></div>
        <div class="sqsk sqsk-circle"></div>
      </div>

    </div>
  `;

  // ✅ clear + append
  container.innerHTML = "";
  container.appendChild(skeleton);
}



async function routeToSubquest(box){
  if(!box) return;
 
  const isPending   = box.classList.contains("pending");
  const isCompleted = box.classList.contains("completed");
  const isLocked    = box.classList.contains("locked");
  const isCooldown = box.classList.contains("try-again");
  const isNoRetry  = box.dataset.noRetry === "true";
  const container = document.querySelector(".quest-complete");
  const layout    = document.querySelector(".layout-root");
  const questUUID = box.dataset.quest;
  const showNext = hasNextPlayableQuest(box);
  const subUUID   = box.dataset.subquest;
  if(!questUUID || !subUUID) return;

  pushSubquestURL(questUUID, subUUID);
  initResponsivePreviewGrid();
  createQuestCompleteSkeleton(container);

  if (isPending || isCompleted || isLocked || isNoRetry) {



    let stateUI = "";

    /* ===== PENDING ===== */
    if (isPending) {
      stateUI = renderQuestStateUI({
        img: "https://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/5/channels/21/191680b9-5075-4765-80dd-1982f28297bf.png",
        text: "Quest in review",
        showNext 
      });
    }

    /* ===== COMPLETED ===== */
    else if (isCompleted) {
      stateUI = renderQuestStateUI({
        img: "https://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/5/channels/21/7509f516-d6bd-4ac1-927f-816a3e3ececa.png",
        text: "Quest Completed",
        showNext 
      });
    }

    /* ===== NO RETRY ===== */
    else if (isNoRetry) {
      stateUI = renderQuestStateUI({
        img: "https://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/5/channels/21/f227963b-ff82-4ea7-acaf-954ef84e5701.png",
        text: "You cannot retry this quest",
        showNext: false
      });
    }

    /* ===== LOCKED ===== */
    else if (isLocked) {
      stateUI = renderQuestStateUI({
        img: "https://zupdpwnloewdkjqsymdm.supabase.co/storage/v1/object/public/uploads/5/channels/21/f227963b-ff82-4ea7-acaf-954ef84e5701.png",
        text: "Quest locked",
        showNext: false
      });
    }

  container.innerHTML = "";

    container.innerHTML = stateUI;

    // ⬆️ scroll content container back to top
    const scrollTargetState = document.querySelector(".quest-complete.quest-content") || document.querySelector(".quest-content");
    if (scrollTargetState) scrollTargetState.scrollTop = 0;

    window.__ACTIVE_SUBQUEST__ = { questUUID, subUUID };

    return; // ⛔ stop API fetch, but UI is rendered
  }





  /* =========================
     🚫 SAME ROUTE GUARD
  ========================= */
  if(
    window.__ACTIVE_SUBQUEST__ &&
    window.__ACTIVE_SUBQUEST__.questUUID === questUUID &&
    window.__ACTIVE_SUBQUEST__.subUUID === subUUID
  ){
    console.log("⛔ Same subquest → no refetch");
    return; // 🔥 STOP HERE
  }

  /* =========================
     🚫 FETCH LOCK
  ========================= */
  if(window.__FETCH_LOCK__){
    console.log("⛔ Fetch in progress → blocked");
    return;
  }

  window.__FETCH_LOCK__ = true;

  /* =========================
     ACTIVE STATE
  ========================= */
  document.querySelectorAll(".preview-box.active")
    .forEach(b => b.classList.remove("active"));

  box.classList.add("active");


  container.classList.remove("quest-hidden");
  layout.classList.add("quest-open");

  if(!container || !layout) {
    window.__FETCH_LOCK__ = false;
    return;
  }



  try{
    const res = await fetch(`/apiinit/${communitySlug}/quest/${questUUID}/${subUUID}`);
    const data = await res.json();

    if(!res.ok){
      container.innerHTML = `<div class="quest-error">Failed to load quest</div>`;
      window.__FETCH_LOCK__ = false;
      return;
    }
    let stateUI = "";

    container.innerHTML = renderQuestComplete(data);

    let scrollTarget;
    if (window.innerWidth <= 767) {
      scrollTarget = document.querySelector(".quest-complete.quest-content");
    } else {
      scrollTarget = document.querySelector(".quest-content");
    }
    if (scrollTarget) scrollTarget.scrollTop = 0;

    initSocialTooltips(communitySlug);

    /* backend source of truth */
    const cooldownUntilRaw = data.subquest.cooldown_until || null;
    const cooldownUntilDate = parseUtc(cooldownUntilRaw);


    /* if cooldown exists and is future (UTC-safe) */
    if (
      cooldownUntilDate &&
      cooldownUntilDate.getTime() > Date.now()
    ) {
      // ✅ STATE
      updateActivePreviewBoxState("cooldown", {
        cooldown_until: cooldownUntilDate.toISOString()
      });

      // ✅ UI
      updateClaimButtonCooldown(cooldownUntilDate);

      // ✅ TIMER ENGINE
      initCooldownTimers();
    }

    initRewardModals(data.rewards);

    initSubquestTasks();
    

    const inviteTask = document.querySelector(".card-container-quest.invite-task");

    if(inviteTask){
      const taskId = inviteTask.dataset.taskId;
      const overlay = createInviteOverlay(communitySlug, taskId);
      initInviteModal(overlay);
    }
    /* 🔥 save active route */
    window.__ACTIVE_SUBQUEST__ = { questUUID, subUUID };
    window.__UI_STATE__ = data.ui_state || {};

    renderMobileModuleStrip();
    syncMobileModuleActive();
    /* 🔥 rebind grid AFTER render */
    initPreviewKeyboardNav();
    initArrowNavigation();

  }catch(err){
    console.error(err);
    container.innerHTML = `<div class="quest-error">Network error</div>`;
  }finally{
    window.__FETCH_LOCK__ = false;  // 🔓 unlock
  }
}



 

function updateActivePreviewBoxState(state, options = {}) {
  if (!window.__ACTIVE_SUBQUEST__) return;

  const { questUUID, subUUID } = window.__ACTIVE_SUBQUEST__;

  const box = document.querySelector(
    `.preview-box[data-quest="${questUUID}"][data-subquest="${subUUID}"]`
  );
  if (!box) return;

  /* ===== CLEAN OLD STATES ===== */
  box.classList.remove("completed", "pending", "locked", "try-again");
  box.dataset.noRetry = "false";

  const oldTimer = box.querySelector(".timer-main");
  if (oldTimer) oldTimer.remove();

  const oldComplete = box.querySelector(".complete-main");
  if (oldComplete) oldComplete.remove();

  /* ============================
     NO RETRY (INSTANT BADGE)
  ============================ */
  if (state === "no_retry") {
    box.classList.add("try-again");
    box.dataset.noRetry = "true";

    const badge = document.createElement("div");
    badge.className = "timer-main no-retry";
    badge.innerHTML = `
      <div class="timer-scount-retry">
        <div class="cool-display">No Retry</div>
      </div>
    `;

    box.appendChild(badge);
    return; // 🔥 stop here
  }

  /* ============================
     COOLDOWN
  ============================ */
  if (state === "cooldown") {
    box.classList.add("try-again");

    const badge = document.createElement("div");
    badge.className = "timer-main";
    badge.innerHTML = `
      <div class="timer-scount">
        <div class="cool-display" style="font-size:11px;font-weight:550;">
          Try again in:
          <span class="cooldown-retry"
                data-cooldown-until="${options.cooldown_until}">
            --
          </span>
        </div>
      </div>
    `;

    box.appendChild(badge);
    return;
  }

  /* ============================
    COMPLETED
  ============================ */
  if (state === "completed") {
    box.classList.add("completed");

    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderCompleted();

    box.appendChild(wrapper.firstElementChild);
    return;
  }


  /* ============================
     PENDING
  ============================ */
  if (state === "pending") {
    box.classList.add("pending");

    const badge = document.createElement("div");
    badge.className = "pending-reviews";
    badge.innerHTML = `
      <div class="pending-scount">
        <div class="preview-display" style="font-size:11px;font-weight:550;">
          in review
        </div>
      </div>
    `;

    box.appendChild(badge);
    return;
  }
}



function updateQuestProgressAfterClaim() {
  if (!window.__ACTIVE_SUBQUEST__) return;

  const { questUUID, subUUID } = window.__ACTIVE_SUBQUEST__;

  /* =========================
     🔎 Find active preview-box
  ========================= */
  const box = document.querySelector(
    `.preview-box[data-quest="${questUUID}"][data-subquest="${subUUID}"]`
  );
  if (!box) return;

  /* =========================
     🧮 Find quest root
  ========================= */
  const questRoot = document.querySelector(
    `.all-content[data-quest-uuid="${questUUID}"]`
  );
  if (!questRoot) return;

  /* =========================
     📦 HEADER ELEMENTS
  ========================= */
  const countEl = questRoot.querySelector(".counting-subquest");
  const progressFill = questRoot.querySelector(".progress-fillstatic");
  const infoBox = questRoot.querySelector(".info-box");

  if (!countEl || !progressFill || !infoBox) return;

  /* =========================
     📊 Parse current values
  ========================= */
  const [done, total] = countEl.textContent
    .split("/")
    .map(n => parseInt(n.trim()));

  let newDone = done + 1;

  if (newDone > total) newDone = total;

  const percent = Math.round((newDone / total) * 100);

  /* =========================
     🎯 Update UI
  ========================= */
  countEl.textContent = `${newDone}/${total}`;
  progressFill.style.width = percent + "%";

  /* =========================
     🧠 Update cache model
  ========================= */
  if (window.__QUEST_CACHE__) {
    const quest = window.__QUEST_CACHE__.find(q => q.uuid === questUUID);
    if (quest) {
      quest.completed = newDone;
      quest.progress = percent;

      const sq = quest.subquests.find(s => s.uuid === subUUID);
      if (sq) sq.is_completed = true;
    }
  }

  /* =========================
     🏁 Module completed
  ========================= */
  if (newDone === total) {
    infoBox.classList.add("completed");

    // prevent duplicates
    if (!questRoot.querySelector(".module-completed")) {
      const badge = document.createElement("div");
      badge.className = "module-state module-completed";
      badge.innerText = "Module Completed";
      questRoot.appendChild(badge);
    }
  }
}


async function updateXpUI(communityId) {
  const res = await fetch(`/api/${communityId}/level`);
  if (!res.ok) return;

  const data = await res.json();

  document.querySelector(".level").textContent = `Level ${data.level}`;
  document.querySelector(".xp-amt").textContent = `${data.current_xp} / ${data.next_level_xp} XP`;

  const percent = (data.current_xp / data.next_level_xp) * 100;
  document.querySelector(".xp-fill").style.width = percent + "%";
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
    ticks: 1200,          // 🔥 very long life
    gravity: 0.02,        // 🔥 near zero gravity
    decay: 0.995,         // 🔥 almost no decay
    startVelocity: 0.6,   // 🔥 ultra slow start
    scalar: 0.3,          // fine particles
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
    claimBtn.style.display = "none";           // ✅ hide button
    claimBtn.classList.remove("enabled");
    claimBtn.setAttribute("disabled", "true");
  }
}




function scrollToFirstTaskError() {
  const container = document.querySelector(".quest-content");
  if (!container) return;

  // find first visible error inside quest container
  const errorEl = container.querySelector(
    ".prove-self," +
    ".wrong-anser," +
    ".partnership-error," +
    ".partnership-quest-error," +
    ".discord-errir," +
    ".yotube-error," +
    ".telegram-error," +
    ".numbers-error," +
    ".text-error," +
    ".url-error"
  );

  if (!errorEl) return;

  const taskCard = errorEl.closest(".card-container-quest");
  if (!taskCard) return;

  // smooth scroll inside quest container
  const containerRect = container.getBoundingClientRect();
  const taskRect = taskCard.getBoundingClientRect();

  const scrollTop =
    container.scrollTop +
    (taskRect.top - containerRect.top) -
    40; // offset padding

  container.scrollTo({
    top: scrollTop,
    behavior: "smooth"
  });
}



async function handleClaim(subquestId, claimBtn){
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
    formData.append("puzzle_answers", JSON.stringify(puzzleAnswers)); 
    formData.append("visit_link_answers", JSON.stringify(visitLinkAnswers));




    document.querySelectorAll(".card-container-quest.file-upload").forEach(card=>{
      if(card.__files && card.__files.length){
        card.__files.forEach(file=>{
          formData.append("files", file);   // multiple files supported
        });
      }
    });



  const res = await fetch(`/claim/${subquestId}`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken
    },
    body: formData   // ❌ no headers, browser sets multipart automatically
  });
    const data = await res.json();
      console.log("DATA:", data);

      const hasNoRetry  = !data.success && data.no_retry;
      const hasCooldown = !data.success && data.cooldown_until;
      const hasErrors   = data.errors && Object.keys(data.errors).length > 0;

      /* ============================
        1) RESTRICTIONS (UI only)
      ============================ */

      if (hasNoRetry) {
        setQuestState("no_retry");
        updateActivePreviewBoxState("no_retry");
        disableClaimButton();
      }

      if (hasCooldown) {
        updateActivePreviewBoxState("cooldown", {
          cooldown_until: data.cooldown_until
        });

        updateClaimButtonCooldown(data.cooldown_until);
        initCooldownTimers();
        disableClaimButton();
      }

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
            card.querySelector(".github-error") ||
            card.querySelector(".yotube-error") ||
            card.querySelector(".telegram-error") ||
            card.querySelector(".numbers-error") ||
            card.querySelector(".text-error") ||
            card.querySelector(".url-error");


            if (errorEl) {

              if (errorMsg?.type === "HTML" && errorMsg.error_html) {
                errorEl.innerHTML = errorMsg.error_html;  
              } else {
                errorEl.textContent = errorMsg.error || errorMsg;  
              }

              errorEl.style.display = "block";
            }
        }

        scrollToFirstTaskError();
        disableClaimButton();
        return; 
      }
      
      if (!data.success && data.message) {
        showToast(data.message);
        return;
      }

      if (data?.error_code === "RECURRENCE_BLOCKED") {
        
        // preview box
        updateActivePreviewBoxState("completed");

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
        setQuestState("pending");
        updateActivePreviewBoxState("pending");
        updateReviewBadgeDelta(+1);
        disableClaimButton();
        return; 
      }


      // ✅ SUCCESS
      if (data.success) {
          window.updateXpUI(communityId);

        // right panel
        setQuestState("completed");

        // preview grid
        updateActivePreviewBoxState("completed");

        // header progress
        updateQuestProgressAfterClaim();

        disableClaimButton();
        return; 
      }


      /* ===== FAILED (NO ERRORS OBJECT) ===== */
      if (!data.success && (!data.errors || Object.keys(data.errors).length === 0)) {
        setQuestState("failed", { message: data.message });
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








function createRewardModal(reward, index) {
  let modalHTML = "";
  const distInfo = getDistributionInfo(reward.distribution_type);
  const distExtra = getDistributionExtra(reward);

  if (reward.reward_type === "xp") {
    modalHTML = `
      <div class="xp-modal-overlay reward-modal" id="modal-${index}" style="display: none;">
        <div class="xp-modal-box">
          <div class="xp-modal-header">
            <h2>XP Reward</h2>
            <span class="modal-close" data-index="${index}">
              <svg class="modal-close-icon" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
          </div>
          <div class="xp-image-wrapper">
            <div class="xp-modal-bg"></div>
            <h1 class="xp-big-text">XP</h1>
            <div class="xp-sparkle one"></div>
            <div class="xp-sparkle two"></div>
            <div class="xp-sparkle three"></div>
          </div>
          <div class="xp-modal-content">
            <div class="xp-reward-title">${reward.reward_data.amount || 0} XP</div>
            <div class="xp-reward-info">
              <div class="xp-reward-col">
                <div class="xp-reward-method-label">Reward method</div>
                <div class="xp-reward-method">
                  <span class="dist-text">${distInfo.text}</span>
                </div>
              </div>
              ${distExtra}
            </div>
          </div>
        </div>
      </div>`;
  }

  else if (reward.reward_type === "role") {
    modalHTML = `
      <div class="role-modal-overlay reward-modal" id="modal-${index}"  style="display: none;">
        <div class="role-modal-box">
          <div class="role-modal-header">
            <h2>Role Reward</h2>
            <span class="modal-close" data-index="${index}">
              <svg class="modal-close-icon" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
          </div>
          <div class="role-image-wrapper">
            <div class="role-modal-bg"></div>
            <img src="https://xpcqiovfesvllsljxhac.supabase.co/storage/v1/object/public/uploads/discord_reward.png" alt="Discord Reward">
          </div>
          <div class="role-modal-content">
            <div class="role-reward-title">${reward.reward_data.role || ""}</div>
            <div class="xp-reward-info">
              <div class="xp-reward-col">
                <div class="xp-reward-method-label">Reward method</div>
                <div class="xp-reward-method">
                  <span class="dist-text">${distInfo.text}</span>
                </div>
              </div>
              ${distExtra}
            </div>
          </div>
        </div>
      </div>`;
  }

  else if (reward.reward_type === "token") {
      modalHTML = `
        <div class="modal-overlay reward-modal" id="modal-${index}" style="display: none;">
          <div class="modal">
            <div class="modal-header">
              <h2>Token Reward</h2>
              <span class="modal-close" data-index="${index}">
                <svg class="modal-close-icon" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
            </div>
            <div class="image-wrapper">
              <div class="token-modal-image-bg"></div>
              <div class="sparkle one"></div>
              <div class="sparkle two"></div>
              <div class="sparkle three"></div>
            </div>
            <div class="modal-content">
              <div class="reward-title">
                ${reward.reward_data.amount_per_winner || ""} ZEC
              </div>
              <div class="xp-reward-info token-extra-info">
                <div class="xp-reward-col">
                  <div class="xp-reward-method-label">Network</div>
                  <div class="xp-reward-method">Zcash</div>
                </div>
                <div class="xp-reward-col">
                  <div class="xp-reward-method-label">Privacy</div>
                  <div class="xp-reward-method">Shielded</div>
                </div>
              </div>
              <div class="xp-reward-info">
                <div class="xp-reward-col">
                  <div class="xp-reward-method-label">Reward method</div>
                  <div class="xp-reward-method">
                    <span class="dist-text">${distInfo.text}</span>
                  </div>
                </div>
                ${distExtra}
              </div>
            </div>
          </div>
        </div>`;
    }

  else if (reward.reward_type === "custom") {
    modalHTML = `
      <div class="modal-overlay reward-modal" id="modal-${index}" style="display: none;">
        <div class="modal">
          <div class="modal-header">
            <h2>Custom Reward</h2>
            <span class="modal-close" data-index="${index}">
              <svg class="modal-close-icon" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
          </div>
          <div class="image-wrapper">
            <div class="custom-modal-image-bg"></div>
            <div class="sparkle one"></div>
            <div class="sparkle two"></div>
            <div class="sparkle three"></div>
          </div>
          <div class="modal-content">
            <div class="reward-title">${reward.reward_data.text || "Custom"}</div>
            <div class="xp-reward-info">
              <div class="xp-reward-col">
                <div class="xp-reward-method-label">Reward method</div>
                <div class="xp-reward-method">
                  <span class="dist-text">${distInfo.text}</span>
                </div>
              </div>
              ${distExtra}
            </div>
          </div>
        </div>
      </div>`;
  }

  return modalHTML;
}

function initRewardModals(subquestRewards) {
  const container = document.getElementById("reward-container");

  container.innerHTML = ""; 

  subquestRewards.forEach((reward, index) => {
    container.insertAdjacentHTML("beforeend", createRewardModal(reward, index));
  });

  // Keep your open/close logic
  window.openModal = function(index) {
    const modal = document.getElementById("modal-" + index);
    if (modal) modal.style.display = "flex";
  };

document.body.addEventListener("click", (e) => {

  // Close button
  const closeBtn = e.target.closest(".modal-close");
  if (closeBtn) {
    const i = closeBtn.getAttribute("data-index");
    const modal = document.getElementById("modal-" + i);
    if (modal) modal.style.display = "none";
    return;
  }

  // Overlay click (outside modal box)
  const overlay = e.target.classList.contains("reward-modal") 
    ? e.target 
    : null;

  if (overlay) {
    overlay.style.display = "none";
  }

});

}


function getDistributionExtra(reward) {
  const distType = (reward.distribution_type || "").toUpperCase();
  const rd = reward.reward_data?.subcontent || {};

  const ui = window.__UI_STATE__ || {};
  const fcfsMap = ui.fcfs_claimed_count || {};

  if (distType === "FCFS") {
    // reward.id is the canonical key (API contract)
    const rewardKey = String(reward.id);
    const claimed = fcfsMap[rewardKey] || 0;

    console.log("FCFS:", rewardKey, claimed);

    return `
      <div class="xp-reward-col">
        <div class="xp-reward-method-label">Reward won</div>
        <div class="xp-reward-method">
          (${claimed}/${rd.max_supply || "0"})
        </div>
      </div>
    `;
  }

  if (distType === "RAFFLE") {
    return `
      <div class="xp-reward-col">
        <div class="xp-reward-method-label">Total Reward</div>
        <div class="xp-reward-method"
          (${rd.num_rewards || 0})
        </div>
      </div>
    `;
  }

  return "";
}



function getDistributionInfo(distType) {
  if (!distType) distType = "ALL";
  distType = distType.toUpperCase();

  const iconSvg = REWARD_ICONS[distType] || REWARD_ICONS.ALL;

  const text = (distType === "FCFS")
    ? "FCFS"
    : distType.charAt(0) + distType.slice(1).toLowerCase();

  return {
    text
  };
}







  window.PQUESTModule = {
    init: LetsitQuestUp,
    destroy() { controller?.abort(); controller = null; }
  };

})();