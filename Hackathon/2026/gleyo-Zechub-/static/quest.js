(function () {


const contextMenu = document.getElementById('custom-context-menu');

const TopDropdownTriggersSelector = ".filter-trigger, #dropdown-arrow";
function isTopDropdownTrigger(target) {
  return target.closest(TopDropdownTriggersSelector);
}

function updateTopAreaWidth() {
  const topArea = document.querySelector('.top-area');
  const container = document.querySelector('.content-container');
  const left = document.querySelector('.inner-most-width');
  const filter = document.querySelector('.filter-trigger');

  if (!topArea || !container) return;

  const screenWidth = window.innerWidth;

  // Only between 768 and 942
  if (screenWidth >= 768 && screenWidth <= 942) {
    const containerWidth = container.clientWidth;
    const leftWidth = left ? left.offsetWidth : 0;
    const filterWidth = filter ? filter.offsetWidth : 0;

    const containerStyles = getComputedStyle(container);
    const paddingLeft = parseFloat(containerStyles.paddingLeft);
    const paddingRight = parseFloat(containerStyles.paddingRight);

    const availableWidth =
      containerWidth -
      leftWidth -
      filterWidth -
      paddingLeft -
      paddingRight +
      3;

    topArea.style.width = availableWidth + "px";
  }  
}
window.addEventListener("resize", updateTopAreaWidth);


async function syncSprintUI() {
  try {
    const res = await fetch(`/api/${communitySlug}/sprint`);
    const data = await res.json();

    const btn = document.getElementById("createSprintBtn");
    if (!btn) return;

    // no sprint → allow create
    if (!data.exists) return;

    const now = new Date(); // user local time
    const start = data.start ? new Date(data.start) : null;
    const end = data.end ? new Date(data.end) : null;

    if (!start || !end) return;

    // ❌ LIVE → remove
    if (now >= start && now <= end) {
      btn.remove();
      return;
    }

    // ❌ UPCOMING → remove
    if (now < start) {
      btn.remove();
      return;
    }

    // ✅ COMPLETED → keep button
    if (now > end) {
      return;
    }

  } catch (e) {
    console.error("Sprint sync failed", e);
  }
}


const NothingHereSvg = `
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="1024.000000pt" height="1024.000000pt" viewBox="0 0 1024.000000 1024.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
    fill="currentColor" stroke="none">
    <path d="M3635 9750 c-313 -28 -651 -109 -936 -225 -667 -272 -1220 -790
    -1553 -1456 -167 -334 -259 -655 -295 -1033 -14 -140 -14 -473 -1 -607 51
    -508 208 -946 486 -1360 84 -124 112 -161 251 -320 l92 -106 -36 -53 c-72
    -107 -160 -325 -197 -490 -82 -359 -52 -760 83 -1100 308 -775 1112 -1254
    1962 -1170 320 32 601 127 849 287 411 267 683 650 784 1104 32 147 46 277 46
    436 0 122 -11 259 -25 315 -6 24 -3 27 67 47 40 13 130 50 201 83 l128 62 147
    -145 c81 -79 189 -184 240 -232 l92 -88 -17 -32 c-10 -20 -18 -64 -21 -120 -4
    -85 -3 -91 31 -161 30 -60 57 -92 154 -186 65 -62 408 -398 763 -745 650 -635
    1300 -1263 1441 -1391 101 -91 215 -158 341 -202 93 -32 116 -36 238 -40 151
    -4 231 8 346 53 200 79 391 268 471 465 79 196 67 455 -30 645 -71 141 -131
    205 -647 686 -698 651 -1082 1011 -1185 1109 -60 58 -216 204 -345 326 -464
    435 -442 419 -565 419 -44 0 -98 -3 -120 -8 l-40 -7 -223 217 -223 218 84 127
    c306 461 467 1026 467 1639 0 479 -94 882 -305 1314 -172 351 -392 647 -679
    914 -456 423 -1033 700 -1651 791 -161 24 -509 34 -670 20z m622 -274 c405
    -60 761 -188 1075 -387 476 -302 844 -726 1074 -1240 238 -531 302 -1114 184
    -1673 -162 -765 -668 -1423 -1355 -1761 -200 -98 -188 -96 -210 -38 -30 80
    -112 235 -169 317 l-53 79 104 53 c204 103 397 248 570 425 112 115 165 181
    249 307 564 848 433 1995 -308 2707 -287 276 -622 466 -987 560 -482 124
    -1014 66 -1470 -161 -237 -117 -403 -238 -596 -430 -271 -272 -455 -593 -545
    -953 -171 -679 -17 -1366 431 -1922 l85 -105 -85 -51 c-104 -62 -210 -140
    -301 -221 l-67 -61 -64 71 c-180 198 -308 385 -420 613 -419 855 -335 1907
    218 2702 147 212 372 455 558 602 408 324 926 524 1510 585 84 9 474 -4 572
    -18z m-2 -875 c228 -46 495 -155 680 -277 415 -273 706 -704 813 -1203 24
    -115 26 -145 27 -351 0 -199 -3 -238 -24 -335 -124 -582 -488 -1028 -1068
    -1312 l-153 -74 -57 44 c-97 74 -222 152 -338 210 -303 151 -561 206 -919 194
    -181 -6 -307 -24 -446 -64 l-85 -25 -100 104 c-268 276 -422 565 -503 938 -24
    115 -26 143 -26 350 0 195 3 239 22 329 81 371 237 663 501 935 298 306 677
    491 1146 560 17 2 118 3 225 1 153 -2 219 -7 305 -24z m-704 -3432 c694 -118
    1183 -640 1260 -1344 27 -253 -30 -565 -146 -795 -92 -184 -265 -388 -439
    -519 -363 -274 -821 -379 -1256 -287 -140 29 -216 55 -339 112 -455 213 -768
    622 -857 1119 -26 148 -24 388 4 522 64 297 185 530 385 739 206 215 446 356
    734 429 144 36 197 42 374 44 118 1 187 -4 280 -20z m3039 -835 c14 -18 1 -33
    -192 -224 l-207 -206 -206 206 -206 207 87 74 c49 40 145 128 214 195 l125
    122 185 -178 c102 -98 192 -186 200 -196z m457 -156 c32 -28 220 -205 418
    -393 378 -358 1043 -987 1180 -1115 44 -41 123 -116 175 -166 52 -50 200 -189
    327 -308 145 -136 248 -240 272 -277 71 -106 103 -243 82 -354 -43 -231 -258
    -405 -499 -405 -129 0 -238 38 -352 123 -81 61 -1072 996 -2080 1964 l-306
    293 346 345 c190 190 354 345 363 345 9 0 43 -23 74 -52z"/>
    <path d="M3170 7681 c-191 -62 -281 -273 -191 -449 27 -54 111 -127 168 -146
    71 -24 167 -21 230 8 240 112 244 451 7 567 -52 25 -165 36 -214 20z"/>
    <path d="M4600 7681 c-131 -42 -218 -151 -228 -282 -9 -128 55 -241 169 -298
    54 -27 72 -31 138 -30 87 1 121 11 184 55 87 62 147 193 132 287 -17 106 -87
    202 -181 248 -52 25 -165 36 -214 20z"/>
    <path d="M3820 6834 c-240 -44 -423 -137 -579 -291 -135 -135 -211 -266 -211
    -367 0 -111 67 -180 172 -179 61 1 85 17 181 119 187 200 388 295 596 281 175
    -11 311 -84 481 -257 63 -64 125 -122 138 -129 32 -17 114 -16 149 3 69 35
    102 105 89 187 -18 115 -167 316 -318 429 -94 71 -252 151 -358 180 -73 20
    -281 35 -340 24z"/>
    <path d="M2571 4529 c-118 -34 -192 -141 -193 -277 -1 -111 29 -155 271 -397
    l211 -209 -206 -207 c-113 -113 -219 -226 -235 -250 -97 -148 -30 -351 141
    -426 21 -9 64 -15 107 -15 124 0 154 19 406 270 l217 216 223 -220 c251 -249
    277 -267 397 -267 214 0 348 211 261 409 -16 36 -77 103 -241 268 l-219 221
    228 230 c207 208 230 235 246 284 47 145 -34 316 -175 366 -56 20 -154 19
    -216 -1 -42 -15 -79 -47 -279 -245 l-230 -229 -220 220 c-251 250 -281 270
    -395 269 -36 0 -80 -5 -99 -10z"/>
    </g>
    </svg>

`;


function checkEmptyModulesAndReset() {
  const remainingModules = document.querySelectorAll('.content-init-q.scrollable');

  if (remainingModules.length === 0) {
    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = "";  
    renderWelcomeBlock();  
  }
}

async function initQuestApp() {
  const app = document.getElementById("app");
  if (!app) return;



  try {
    const res = await fetch(`/api/${communitySlug}/quests`);
    const data = await res.json();
    console.log(data)

 
    if (!data.quests || data.quests.length === 0) {
      app.innerHTML = "";
      renderWelcomeBlock("questContainer");
      return;
    }

    app.innerHTML = "";



    createQuestModule(data.quests, communitySlug);
    initQuestUIBindings(); 
    initModuleCRUDHandlers();
    initAddSubquestHandlers();  
    initTopDropdowns();
    
    const allModules = document.querySelectorAll('.content-init-q.scrollable');
    allModules.forEach((module) => {
      bindModuleActions(module);
    });


    initSubquestToggles(data.community_id);
    document.querySelectorAll('.quest-item').forEach(item => {
      attachContextMenuEvents(item);
    });
    initSubquestFiltering();
    initQuestItemNavigation();
    initQuestDragSystem();
    initMobileQuestMoveSystem(); 
    LoadContextitemInit();



  requestAnimationFrame(() => {
    updateTopAreaWidth();
  });

    syncSprintUI()

  } catch (err) {
    console.error("Quest fetch failed:", err);
    renderWelcomeBlock("questContainer");
  }
}



function initSubquestFiltering() {
  const trigger = document.querySelector(".filter-trigger");
  const dropdown = document.getElementById("global-filter-dropdown");

  if (!trigger || !dropdown) return;

  // 🔹 helper: set label text before SVG
  function setTriggerText(text) {
    const textNode = Array.from(trigger.childNodes)
      .find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== "");

    if (textNode) {
      textNode.textContent = text + " ";
    } else {
      const svg = trigger.querySelector("svg");
      trigger.innerHTML = text + " ";
      if (svg) trigger.appendChild(svg);
    }
  }

 
  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (IsopenDropdown === dropdown) {
      dropdown.style.display = "none";
      IsopenDropdown = null;
      return;
    }
    SmartDropdown(trigger, dropdown, {
      offset: 10,
      prefer: "bottom"
    });

  });

  // 🧠 prevent inside click from closing
  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // 🎯 select filter
  dropdown.querySelectorAll(".filter-item").forEach(item => {
    item.addEventListener("click", function () {
      const value = item.dataset.value;

      trigger.dataset.filter = value;

      const label =
        value.charAt(0).toUpperCase() + value.slice(1);

      setTriggerText(label);

      applySubquestFilter(value);
    });
  });
}

function applySubquestFilter(type) {
  const items = document.querySelectorAll(".quest-item");
  const AllInitQconatin = document.querySelector(".allinit-conatin");
  const emptyState = document.querySelector(".empty-state");

  let visibleCount = 0;

  items.forEach(item => {
    const isDraft   = item.dataset.draft === "true";
    const isArchive = item.dataset.archive === "true";
    const isActive  = item.dataset.active === "true";

    let show = false;

    if (type === "all") show = true;
    if (type === "draft") show = isDraft;
    if (type === "archive") show = isArchive;
    if (type === "active") show = isActive;

    if (show) visibleCount++;

    item.style.display = show ? "flex" : "none";
  });

  /* ===============================
     EMPTY STATE LOGIC
  =============================== */
  if (visibleCount === 0) {
    // hide all content
    AllInitQconatin.style.display = "none";

    // show svg empty state
    emptyState.style.display = "flex";
  } else {
    // show content
    AllInitQconatin.style.display = "block";

    // hide svg
    emptyState.style.display = "none";
  }
}


let mobileMoveMode = false;
let mobileMoveItem = null;
let mobileOriginModule = null;

function guardMobileMove(e){
   

  if(!mobileMoveMode) return false;
  if(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation?.();
  }

  return true; 
}

window.activeQuestUUID = null;

 

function bindModuleActions(module) {
  const menuBtn = module.querySelector('.menu-btn');
  const dropdown = document.getElementById('myDropdown');
  const moduleHeader = module.querySelector('.module-header');

  if (!moduleHeader) return;

  const moduleUUID = module.id.replace('module-', '');

  /* =========================
     RIGHT CLICK (DESKTOP)
  ========================= */
  moduleHeader.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();

    hideAllDropdowns();

    // ✅ store active quest
    window.activeQuestUUID = moduleUUID;
    hideMenu();
    if (isTopDropdownTrigger(e.target)) return;
    if (IsopenDropdown){
      IsopenDropdown = null; 
      IsopenDropdown.style.display ="none";

           
    }
 


    if (dropdown) {
      dropdown.classList.add('show');
      dropdown.style.display = 'block';
      positionDropdown(dropdown, e.pageX, e.pageY);
    }
  });

  /* =========================
     LONG PRESS (MOBILE)
  ========================= */
  let pressTimer = null;
  let longPressTriggered = false;

  moduleHeader.addEventListener(
    'touchstart',
    (e) => {
      longPressTriggered = false;

      pressTimer = setTimeout(() => {
        longPressTriggered = true;




         hideMenu();

    


        window.activeQuestUUID = moduleUUID;
        if(guardMobileMove(e)) return;

        if (dropdown) {
          dropdown.classList.add('show');
          dropdown.style.display = 'block';

          const touch = e.touches[0];
          positionDropdown(dropdown, touch.pageX, touch.pageY);
        }

        // ⛔ block ghost click
        e.preventDefault();
        e.stopPropagation();

        if (isTopDropdownTrigger(e.target)) return;
        if(IsopenDropdown){
          IsopenDropdown.style.display ="none";

          IsopenDropdown = null;      
        }        
      }, 600);
    },
    { passive: false }   // 🔥 IMPORTANT
  );

  moduleHeader.addEventListener(
    'touchend',
    (e) => {
      clearTimeout(pressTimer);

      // ⛔ if dropdown opened, block click-through
      if (longPressTriggered) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    { passive: false }
  );

  moduleHeader.addEventListener(
    'touchmove',
    () => {
      clearTimeout(pressTimer);
    },
    { passive: true }
  );

  /* =========================
     MENU BUTTON (ALL DEVICES)
  ========================= */
  if (menuBtn && dropdown) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 🔥 close other UI first
      hideAllDropdowns();
      hideMenu();



      // ✅ store active quest
      window.activeQuestUUID = moduleUUID;

      const isOpen = dropdown.classList.contains('flip-left')

        console.log(isOpen)

      /* =========================
        🔁 TOGGLE MODE
      ========================= */
      if (isOpen) {
        // CLOSE
        dropdown.classList.remove('show');
        dropdown.classList.remove('flip-left');
        dropdown.style.display = "none";
      } else {
        if(dropdown.classList.contains("show"))
        dropdown.classList.add('show');
        dropdown.style.display = "flex";
        positionDropdown(dropdown, e.pageX, e.pageY);
      }      
      if (isTopDropdownTrigger(e.target)) return;

      if (IsopenDropdown){
        IsopenDropdown.style.display = "none";
        IsopenDropdown = null;      
      }
    });
  }

}

  function hideAllDropdowns() {
    document.querySelectorAll('.dropdown.show').forEach(d => {
      d.classList.remove('show');
      d.style.display = 'none';
    });
  }

  function positionDropdown(dropdown, x, y) {
    const padding = 10;

    dropdown.classList.remove('flip-left', 'flip-up');
    dropdown.style.visibility = 'hidden';
    dropdown.style.display = 'flex';
    dropdown.style.left = '0';
    dropdown.style.top = '0';

    const realWidth = dropdown.offsetWidth || 180;
    const realHeight = dropdown.offsetHeight || 200;

    const spaceRight = window.innerWidth - x;
    const spaceBottom = window.innerHeight - y;

    let top = y;
    let left = x;

    if (spaceRight < realWidth + padding) {
      dropdown.classList.add('flip-left');
      left = x - realWidth;
    }

    if (spaceBottom < realHeight + padding) {
      dropdown.classList.add('flip-up');
      top = y - realHeight;
    }

    dropdown.style.left = `${left}px`;
    dropdown.style.top = `${top}px`;
    dropdown.style.visibility = 'visible';
  }


function renderWelcomeBlock(containerId = "questContainer") {
  const app = document.getElementById("app");
  if (!app) return;

  const wrapper = document.createElement("div");
  wrapper.className = "content-container welcome";

  wrapper.innerHTML = `
    <div class="spacer-init">

      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.000000 225.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
        fill=" currentColor" stroke="none">
        <path d="M1400 2006 c-19 -7 -135 -63 -257 -125 -123 -61 -232 -111 -243 -111
        -12 0 -141 36 -287 80 -146 44 -280 80 -297 80 -46 0 -105 -19 -127 -41 -44
        -44 -5 -127 54 -115 15 3 40 9 55 12 19 4 108 -19 282 -72 355 -108 319 -111
        628 44 158 79 255 122 275 122 42 0 495 -167 524 -193 68 -61 19 -177 -75
        -177 -16 0 -119 36 -231 80 -111 44 -209 80 -217 80 -8 0 -114 -50 -236 -111
        -240 -120 -320 -146 -413 -134 -27 3 -130 31 -227 60 -97 30 -179 55 -182 55
        -3 0 -6 -212 -6 -471 l0 -471 -35 -35 c-32 -32 -40 -35 -77 -30 -26 3 -51 15
        -67 31 l-26 26 -5 511 -5 511 -24 19 c-31 26 -57 24 -86 -6 l-25 -24 0 -494
        c0 -563 1 -568 73 -641 23 -23 56 -47 72 -53 17 -6 165 -51 330 -98 228 -66
        314 -86 360 -86 57 0 74 7 306 122 154 76 257 122 275 121 16 0 116 -35 223
        -77 180 -72 198 -77 248 -72 64 7 132 43 167 90 56 73 56 73 56 671 0 629 0
        627 -73 699 -38 38 -68 52 -297 137 -272 101 -337 114 -410 86z m-131 -696
        c85 -43 134 -124 135 -220 1 -103 -53 -180 -167 -240 -26 -14 -50 -33 -53 -43
        -3 -10 -17 -22 -31 -28 -38 -14 -73 0 -90 36 -25 51 4 99 89 150 98 59 108 71
        108 122 0 36 -6 50 -29 74 -63 62 -160 25 -174 -68 -12 -73 -85 -99 -127 -46
        -37 47 -13 141 54 211 74 80 191 101 285 52z m-89 -637 c25 -32 20 -69 -12
        -95 -62 -54 -149 30 -98 95 30 37 80 37 110 0z"/>
        </g>
      </svg>

      <p class="space">
        <strong>Quest Hub</strong>
        Welcome to your Quest hub! This is where you create fun quests, tasks, and reward your community for taking actions.
      </p>

      <a href="/${communitySlug}/module"
        class="marakey"
        data-path="/${communitySlug}/module"
        onclick="event.preventDefault(); loadMainSettingsSection(this.dataset.path, event)">
       Create Module
      </a>

    </div>
  `;

  app.appendChild(wrapper);
}


const InnerSvgDisplay = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path d="M6 9l6 6 6-6" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
        </svg>
`
const InnerOnWords = `
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14.5" height="14.5" fill="currentColor" aria-hidden="true">
            <g transform="translate(0 1.333) scale(0.0416666)">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"/>
            </g>
          </svg>
`;

const isMobileInit = window.innerWidth <= 767;


const FinalPreview = isMobileInit ? InnerOnWords : "Preview";


function updateArchiveMenuState(questItem) {
  if (!contextMenu || !questItem) return;

  const isArchived = questItem.dataset.archive === "true";

  const archiveBtn   = contextMenu.querySelector('.menu-item.archived');
  const unarchiveBtn = contextMenu.querySelector('.menu-item.un-archive');

  if (!archiveBtn || !unarchiveBtn) return;

  if (isArchived) {
    // show UNARCHIVE
    unarchiveBtn.style.display = "flex";
    archiveBtn.style.display   = "none";
  } else {
    // show ARCHIVE
    archiveBtn.style.display   = "flex";
    unarchiveBtn.style.display = "none";
  }
}

function syncInitialToggleState() {
  document.querySelectorAll(".toggle-subquests").forEach(btn => {
    const moduleId = btn.dataset.moduleId;
    const icon = btn.querySelector("svg");
    const subquests = document.querySelectorAll(`#subquests-${moduleId}`);

    if (!subquests.length || !icon) return;

    const isOpen = subquests[0].style.display !== "none";

    // 🔥 apply initial rotation
    icon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
  });
}


function createQuestModule(quests, communitySlug, isMobile = false, subquestStates = {}) {
  const app = document.getElementById("app");
  if (!app) return;

  /* ===============================
     CONTENT CONTAINER (TOP AREA)
  =============================== */
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";
  contentContainer.innerHTML = `
    <div class="inner-most-width"></div>

    <div class="filter-trigger" data-filter="all">
      All
      ${InnerSvgDisplay}
    </div>

    <div class="top-area">
      <input type="search" placeholder="Search...">
      <a 
        href="/${communitySlug}/quest"
        data-path="/${communitySlug}/quest"
        onclick="event.preventDefault(); loadMainSettingsSection(this.dataset.path, true, true)"
        class="highlight">
        ${FinalPreview}
      </a>

      <div class="dropdown-wrapper">
        <div class="topbars">
          <div class="browse-wrapper">
            <button class="top-btn dropdown-toggle">
              <span id="btn-text" class="btn-text">Templates</span>
              <div class="vertical-line"></div>
              <span id="dropdown-arrow" class="arrow">▼</span>
            </button>
          </div>
        </div> 
      </div>
    </div>

    <div class="diver-nessess"></div>
    <div class="diver-nessess"></div>
  `;

  /* ===============================
     SCROLL CONTAINER
  =============================== */
  const scrollContainer = document.createElement("div");
  scrollContainer.className = "scroll-container";

  /* ===============================
     NO RESULTS
  =============================== */
  const noResults = document.createElement("div");
  noResults.id = "no-results-message";
  noResults.style.cssText = `
    display: none;
    text-align:center;
    margin-top:10rem;
    font-weight: 550;
    font-style: italic;
    color: var(--text-main);
    font-size: 14px;
    height: 100%
  `;
  noResults.textContent = "No quest found";

  const AllInitQconatin = document.createElement("div");
  AllInitQconatin.className = "allinit-conatin";

  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";
  emptyState.innerHTML = `
    <div class="empty-container">
      <div class="empty-icon">
        ${NothingHereSvg}
      </div>
      <div class="empty-text">
        Nothing here yet
      </div>    
    </div>
  `;

  scrollContainer.appendChild(emptyState);

  /* ===============================
     APPEND STRUCTURE
  =============================== */
  app.appendChild(contentContainer);
  app.appendChild(scrollContainer);
  scrollContainer.appendChild(noResults);
  scrollContainer.appendChild(AllInitQconatin);

  /* ===============================
     MODULES
  =============================== */
  quests.forEach(quest => {
    const is_open = quest.is_open === true;

    const module = document.createElement("div");
    module.className = "content-init-q scrollable";
    module.id = `module-${quest.uuid}`;
    module.dataset.community = communitySlug;

    module.innerHTML = `
      <div class="cardin">

        <div class="module-header">
          <div class="module-title-wrapper" data-module-id="${quest.uuid}">
            <h5 class="module-title" id="module-name-${quest.uuid}">${quest.title}</h5>
          </div>

          <div class="module-actions">
            <button class="icon-btn toggle-subquests" data-module-id="${quest.uuid}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button class="icon-btn add-quest">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button class="icon-btn menu-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.5"/>
                <circle cx="12" cy="12" r="1.5"/>
                <circle cx="19" cy="12" r="1.5"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="subquests-list">
          ${quest.subquests.map(subquest => `
            <div class="quest-item"
                id="subquests-${quest.uuid}"
                data-module-id="${quest.uuid}"
                style="display:${is_open ? "flex" : "none"};"
                data-url="${subquest.url}"
                data-draft="${subquest.is_draft}"
                data-subquest-uuid="${subquest.uuid}" 
                data-archive="${subquest.is_archive}"
                data-active="${!subquest.is_draft && !subquest.is_archive}">

              <div class="diver-quest-123321">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="17" height="17" fill="currentColor">
                  <path d="M6.5 11a1.5 1.5 0 1 1-3 0
                           1.5 1.5 0 0 1 3 0z
                           M5 3.5A1.5 1.5 0 1 0 6.5 5
                           1.5 1.5 0 0 0 5 3.5z
                           M12.5 11a1.5 1.5 0 1 1-3 0
                           1.5 1.5 0 0 1 3 0z
                           M11 3.5A1.5 1.5 0 1 0 12.5 5
                           1.5 1.5 0 0 0 11 3.5z"/>
                </svg>


                <div class="quest-link" style="user-select:none !important;">
                  ${subquest.name}
                </div>

              </div>

              <div class="sub-quest-init-place">Reward</div>
            </div>
          `).join("")}
        </div>

      </div>
    `;

    AllInitQconatin.appendChild(module);
    syncInitialToggleState();


  });
}




function initMobileQuestMoveSystem(){

  document.addEventListener("click", async (e) => {
    if(!mobileMoveMode) return;

    const targetModule = e.target.closest('.content-init-q');
    if(!targetModule) return;

    const targetQuestUUID = targetModule.id.replace("module-", "");
    const subquestUUID = mobileMoveItem?.dataset?.subquestUuid;

    if(!targetQuestUUID || !subquestUUID) return;

    const originQuestUUID = mobileOriginModule
      ? mobileOriginModule.id.replace("module-", "")
      : null;

    // ❌ same module → cancel
    if(originQuestUUID === targetQuestUUID){
      cleanupMobileMove();
      showToast("Cancelled", "error");
      return;
    }

    /* ============================
       👁️ AUTO OPEN TARGET MODULE
    ============================ */
    const toggleBtn = targetModule.querySelector('.toggle-subquests');

    if(toggleBtn){
      const moduleId = toggleBtn.dataset.moduleId;
      const subquests = document.querySelectorAll(`#subquests-${moduleId}`);
      const icon = toggleBtn.querySelector("svg");

      const isOpen = subquests.length && subquests[0].style.display !== "none";

      if(!isOpen){
        // open UI
        subquests.forEach(sub => sub.style.display = "flex");
        if(icon) icon.style.transform = "rotate(180deg)";

        // 🔥 persist open state
        fetch("/save_subquest_state", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify({
            community_id: communityId,
            module_id: moduleId,
            state: "open"
          })
        }).catch(()=>{});
      }
    }

    /* ============================
       BACKEND MOVE
    ============================ */
    try{
      const res = await fetch('/move_subquest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
          subquest_uuid: subquestUUID,
          target_quest_uuid: targetQuestUUID
        })
      });

      const data = await res.json();

      if(data.status === 'success'){

        // UI move
        const targetList = targetModule.querySelector('.subquests-list');
        if(targetList){
          targetList.appendChild(mobileMoveItem);
        }
        mobileMoveItem.dataset.moduleId = targetQuestUUID;
        updateModuleUI(mobileOriginModule);
        updateModuleUI(targetModule);
        showSuccess(`
          <div style="display:flex;align-items:center;gap:10px;">
            ${SuccessAvgInitColored}
            <span>Moved successfully</span>
          </div>
        `);
        cleanupMobileMove();

      } else {
        showError("Move failed");
        cleanupMobileMove();
      }

    }catch(err){
      showError("Move error");
      cleanupMobileMove();
    }

  }, true);
}

function cleanupMobileMove(){
  if(mobileMoveItem){
    mobileMoveItem.classList.remove('mobile-move-active');
  }

  document.documentElement.classList.remove('quest-mobile-lock');

  mobileMoveMode = false;
  mobileMoveItem = null;
  mobileOriginModule = null;
}



  function isMobileView() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

const mobileMoveStyle = document.createElement('style');
mobileMoveStyle.innerHTML = `
html.quest-mobile-lock{
  overflow: hidden !important;
  touch-action: none !important;
}

.quest-item.mobile-move-active{
  opacity:0.3;
}

.quest-drag-ghost{
  position: fixed;
  pointer-events:none;
  z-index:999999;
  opacity:0.9;
  background:var(--bg-main);
  border:1px solid var(--border);
  border-radius:8px;
  padding:6px 10px;
  box-shadow:0 8px 25px rgba(0,0,0,0.25);
}
`;


/* ================================
   QUEST DRAG & DROP SYSTEM
   Real draggable subquest movement
   Auto-scroll + module targeting
================================ */

let dragState = {
  item: null,
  ghost: null,
  originModule: null,
  currentModule: null,
  startY: 0,
  dragging: false
};

/* ================================
   CSS (INJECT ONCE)
================================ */
const dragStyle = document.createElement('style');
dragStyle.innerHTML = `
.quest-drag-ghost {
  position: fixed;
  pointer-events:none;
  z-index:999999;
  opacity:0.9;
  background:var(--bg-main);
  border:1px solid var(--border);
  border-radius:8px;
  padding:6px 10px;
  box-shadow:0 8px 25px rgba(0,0,0,0.25);
}



.quest-item.dragging{
  opacity:0.3;
}
`;
document.head.appendChild(dragStyle);



/* ================================
   INIT SYSTEM
================================ */
function initQuestDragSystem(){
  document.addEventListener('pointerdown', onDragStart, true);
  document.addEventListener('pointermove', onDragMove, true);
  document.addEventListener('pointerup', onDragEnd, true);
}

/* ================================
   START DRAG
================================ */
function onDragStart(e){

  /* =========================
     MOBILE START
  ========================= */
  if(isMobileView()) {
    return;
  }

  const handle = e.target.closest('.diver-quest-123321 svg');
  if(!handle) return;

  const questItem = handle.closest('.quest-item');
  if(!questItem) return;

  e.preventDefault();

  dragState.dragging = true;
  dragState.item = questItem;
  dragState.originModule = questItem.closest('.content-init-q');
  dragState.startY = e.clientY;

  handle.style.cursor = 'grabbing';

  // ghost
  const ghost = questItem.cloneNode(true);
  ghost.classList.add('quest-drag-ghost');
  ghost.style.width = questItem.offsetWidth + 'px';
  document.body.appendChild(ghost);

  dragState.ghost = ghost;
  questItem.classList.add('dragging');
}

/* ================================
   DRAG MOVE
================================ */
function onDragMove(e){
  if(!dragState.dragging) return;

  e.preventDefault();

  const { ghost } = dragState;

  const container = document.querySelector('.scroll-container');
  if(container){
    const cRect = container.getBoundingClientRect();
    const gRect = ghost.getBoundingClientRect();

    let x = e.clientX + 10;
    let y = e.clientY + 10;

    if(x < cRect.left) x = cRect.left;
    if(x + gRect.width > cRect.right) x = cRect.right - gRect.width;
    if(y < cRect.top) y = cRect.top;
    if(y + gRect.height > cRect.bottom) y = cRect.bottom - gRect.height;

    ghost.style.left = x + 'px';
    ghost.style.top  = y + 'px';
  }

  autoScroll(e.clientY);

  const el = document.elementFromPoint(e.clientX, e.clientY);
  const module = el ? el.closest('.content-init-q.scrollable') : null;

  /* =========================
     🔁 REVERT PREVIOUS TEMP OPEN
  ========================= */
  if(dragState.currentModule && dragState.currentModule !== module){
    const prev = dragState.currentModule;

    if(prev.dataset.tempOpen === "true"){
      const wasOpen = prev.dataset.wasOpen === "true";

      // revert only if originally closed
      if(!wasOpen){
        const btn = prev.querySelector('.toggle-subquests');
        if(btn){
          const id = btn.dataset.moduleId;
          const subs = document.querySelectorAll(`#subquests-${id}`);
          subs.forEach(s => s.style.display = "none");

          const icon = btn.querySelector('svg');
          if(icon) icon.style.transform = "rotate(0deg)";
        }
      }

      // cleanup flags
      delete prev.dataset.tempOpen;
      prev.classList.remove("temp-open");
    }

    prev.classList.remove("module-drop-target");
  }

  /* =========================
     RESET VISUAL TARGETS
  ========================= */
  document.querySelectorAll('.content-init-q').forEach(m=>{
    m.classList.remove('module-drop-target');
  });

  if(!module){
    dragState.currentModule = null;
    return;
  }

  /* =========================
     🎯 NEW TARGET
  ========================= */
  module.classList.add('module-drop-target');
  dragState.currentModule = module;

  const toggleBtn = module.querySelector('.toggle-subquests');
  if (!toggleBtn) return;

  const moduleId = toggleBtn.dataset.moduleId;
  const subquests = document.querySelectorAll(`#subquests-${moduleId}`);
  if (!subquests.length) return;

  const isOpen = subquests[0].style.display !== "none";

  // store original state once
  if (!module.dataset.hasOwnProperty("wasOpen")) {
    module.dataset.wasOpen = isOpen ? "true" : "false";
  }

  /* =========================
     👁️ TEMP PREVIEW OPEN
  ========================= */
  if (!isOpen && module.dataset.tempOpen !== "true") {

    // preview open
    subquests.forEach(sub => sub.style.display = "flex");

    const icon = toggleBtn.querySelector('svg');
    if(icon) icon.style.transform = "rotate(180deg)";

    module.classList.add("temp-open");
    module.dataset.tempOpen = "true";
  }
}

/* ================================
   END DRAG
================================ */
let suppressNextClickQ = false;

function updateModuleUI(module) {
  if (!module) return;
  
  const toggleBtn = module.querySelector('.toggle-subquests');
  const icon = toggleBtn?.querySelector('svg');
  const subquests = module.querySelectorAll('.quest-item');
  const subquestList = module.querySelector('.subquests-list');

  if (!toggleBtn || !icon || !subquestList) return;

  const hasItems = subquests.length > 0;

  // ✅ NO ITEMS → FORCE CLOSE EVERYTHING
  if (!hasItems) {
    icon.style.transform = "rotate(0deg)";

    console.log("this is the module", icon)
    return;
  }

  // ✅ CHECK VISIBILITY PROPERLY
  const isOpen = [...subquests].some(
    el => getComputedStyle(el).display !== "none"
  );

  // ✅ SYNC UI
  subquestList.style.display = isOpen ? "block" : "none";

  icon.style.transform = isOpen
    ? "rotate(180deg)"
    : "rotate(0deg)";
}


function onDragEnd(e){
  if(!dragState.dragging) return;
  suppressNextClickQ = true; 

  setTimeout(() => {
    suppressNextClickQ = false;
  }, 120);
  const { item, ghost, currentModule, originModule } = dragState;

  document.querySelectorAll('.content-init-q')
    .forEach(m=>m.classList.remove('module-drop-target'));

  const subquestUUID = item?.dataset?.subquestUuid || null;

  const originQuestUUID = originModule
    ? originModule.id.replace("module-", "")
    : null;

  const targetQuestUUID = currentModule
    ? currentModule.id.replace("module-", "")
    : null;

  // ❌ no valid drop
  if(!currentModule || !targetQuestUUID || !subquestUUID){
    cleanupHybrid();
    return;
  }

  // ❌ same module → no backend, no persist
  if(originQuestUUID === targetQuestUUID){
    cleanupHybrid();
    return;
  }

  /* ============================
     BACKEND MOVE
  ============================ */
  fetch('/move_subquest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify({
      subquest_uuid: subquestUUID,
      target_quest_uuid: targetQuestUUID
    })
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === 'success'){

      // move UI
      const targetList = currentModule.querySelector('.subquests-list');
      if(targetList){
        targetList.appendChild(item);
        
      }
      item.dataset.moduleId = targetQuestUUID;
      updateModuleUI(originModule);
      updateModuleUI(currentModule);
      /* ============================
         ✅ PERSIST STATE ONLY ON DROP
      ============================ */

      const wasOpen = currentModule.dataset.wasOpen === "true";

      if (!wasOpen) {

        const toggleBtn = currentModule.querySelector('.toggle-subquests');
        if (!toggleBtn) return;

        const moduleId = toggleBtn.dataset.moduleId;
        const subquests = document.querySelectorAll(`#subquests-${moduleId}`);
        const icon = toggleBtn.querySelector("svg");

        // 🔥 force real open UI
        subquests.forEach(sub => sub.style.display = "flex");
        if(icon) icon.style.transform = "rotate(180deg)";

        // 🔥 persist explicitly
        fetch("/save_subquest_state", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify({
            community_id: communityId,
            module_id: moduleId,
            state: "open"   
          })
        }).catch(console.error);
      }


    } else {
      console.error("Move failed:", data);
    }
  })
  .catch(err=>{
    console.error("Move error:", err);
  });

  cleanupHybrid();
}

/* ============================
   CLEANUP FUNCTION
============================ */
function cleanupHybrid(){
  const { item, ghost } = dragState;

  if(item) item.classList.remove('dragging');
  if(ghost) ghost.remove();

  document.querySelectorAll('.content-init-q').forEach(m=>{
    delete m.dataset.wasOpen;
    delete m.dataset.tempOpen;
    m.classList.remove("temp-open");
    m.classList.remove("module-drop-target");
  });

  dragState = {
    item:null,
    ghost:null,
    originModule:null,
    currentModule:null,
    startY:0,
    dragging:false
  };
}



/* ================================
   AUTO SCROLL
================================ */
function autoScroll(y){
  const container = document.querySelector('.scroll-container');
  if(!container) return;

  const rect = container.getBoundingClientRect();
  const threshold = 80;
  const speed = 12;

  // ❌ if pointer is outside container → no scroll
  if(y < rect.top || y > rect.bottom) return;

  // ✅ only scroll when inside container
  if(y < rect.top + threshold){
    container.scrollTop -= speed;
  }

  if(y > rect.bottom - threshold){
    container.scrollTop += speed;
  }
}


/* ================================
   CURSOR EFFECT
================================ */
document.addEventListener('mouseover', e=>{
  const h = e.target.closest('.diver-quest-123321 svg');
  if(h) h.style.cursor = 'grab';
});

  function hideMenu() {
    contextMenu.style.display = 'none';
  }


function hideMenuModule() {
   dropdownMode.classList.remove('show');
  dropdownMode.style.display = "none"

}

  function hideAllMenus(e) {
    hideMenuModule();
    hideMenu();
    if (isTopDropdownTrigger(e.target)) return;

    if(IsopenDropdown){
      IsopenDropdown.style.display ="none";

      IsopenDropdown = null;      
    }
  }

const dropdownMode = document.getElementById('myDropdown');





function initQuestItemNavigation() {

  /* ===================================
     QUEST ITEM NAVIGATION (UNCHANGED)
  =================================== */
  document.addEventListener("click", (e) => {
    const questItem = e.target.closest(".quest-item");
    if (!questItem) return;

    const moduleDropdown = document.getElementById("myDropdown");
    if(guardMobileMove(e)) return;

    const isContextMenuOpen =
      contextMenu && contextMenu.style.display === "flex";

    const isModuleMenuOpen =
      moduleDropdown &&
      (moduleDropdown.style.display === "flex" ||
       moduleDropdown.style.display === "block" ||
       moduleDropdown.classList.contains("show"));

    const isSmartDropdownOpen = IsopenDropdown !== null;

    const isDragging = dragState?.dragging === true;

    /* =========================
       🛑 GUARD MODE
    ========================= */
    if (
      suppressNextClickQ ||        
      isDragging ||                  
      isContextMenuOpen ||           
      isModuleMenuOpen ||           
      isSmartDropdownOpen           
    ) {
      suppressNextClickQ = false;    
      hideAllMenus?.(e);

      e.preventDefault();
      e.stopPropagation();
      return;
    }

    /* =========================
       ✅ NORMAL NAVIGATION
    ========================= */
    const url = questItem.dataset.url;
    if (url) {
      loadMainSettingsSection(url, event);
    }

  }, true); 




  



  document.addEventListener("click", (e) => {

    const clickedQuestItem   = e.target.closest(".quest-item");
    const clickedContextMenu = e.target.closest("#contextMenu");
    const clickedModuleMenu  = e.target.closest("#myDropdown");
    const clickedSmartDrop   = e.target.closest(".smart-dropdown"); // if exists
    const clickedToggle      = e.target.closest(".toggle-subquests");

    const isDragging = dragState?.dragging === true;
    /* =========================
       🛑 GUARDS
    ========================= */
    if (isDragging) return;

    // quest-item click → navigation system handles it
    if (clickedQuestItem) return;

    // clicks inside menus → ignore
    if (
      clickedContextMenu ||
      clickedModuleMenu ||
      clickedSmartDrop
    ) return;

    // toggle buttons should not auto-close
    if (clickedToggle) return;

    /* =========================
       ❌ OUTSIDE CLICK → CLOSE ALL
    ========================= */
    hideAllMenus?.(e);

    if (contextMenu) {
      contextMenu.style.display = "none";
    }



    const moduleDropdown = document.getElementById("myDropdown");
    if (moduleDropdown) {
      moduleDropdown.classList.remove("show");
      moduleDropdown.style.display = "none";
    }

    if (isTopDropdownTrigger(e.target)) return;
    if (IsopenDropdown) {
      IsopenDropdown.style.display = "none";
      IsopenDropdown = null;
    }
  }, true); // capture phase
}


function attachContextMenuEvents(item) {
  let pressTimer = null;
  let longPressTriggered = false;
  let startX = 0;
  let startY = 0;

  function showMenu(x, y, e) {
    const menuWidth = contextMenu.offsetWidth || 180;
    const menuHeight = contextMenu.offsetHeight || 200;
    const padding = 10;
    let left = x, top = y;

    if (window.innerWidth - x < menuWidth + padding) left = x - menuWidth;
    if (window.innerHeight - y < menuHeight + padding) top = y - menuHeight;
    if (left < 0) left = 0;
    if (top < 0) top = 0;

    hideMenuModule();

    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
    contextMenu.style.display = 'flex';

    const uuid = item.dataset.subquestUuid || '';
    contextMenu.dataset.currentId = uuid;
    window.currentSubquest = item;
    updateArchiveMenuState(item);

    if (isTopDropdownTrigger(e.target)) return;

    if (IsopenDropdown) {
      IsopenDropdown.style.display = "none";
      IsopenDropdown = null;
    }
  }

  /* =========================
     RIGHT CLICK (DESKTOP)
  ========================= */
  item.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showMenu(e.pageX, e.pageY, e);
  });

  /* =========================
     LONG PRESS (MOBILE)
  ========================= */
  item.addEventListener('touchstart', (e) => {
    longPressTriggered = false;

    const touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;

    pressTimer = setTimeout(() => {
      // Only trigger if finger hasn't moved too much
      longPressTriggered = true;

      showMenu(startX, startY, e);

      // Prevent ghost click
      e.preventDefault();
      e.stopPropagation();
    }, 600);
  }, { passive: false });

  item.addEventListener('touchend', (e) => {
    clearTimeout(pressTimer);

    if (longPressTriggered) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });

  item.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.pageX - startX);
    const dy = Math.abs(touch.pageY - startY);

    // Cancel if moved more than 10px
    if (dx > 10 || dy > 10) {
      clearTimeout(pressTimer);
    }
  }, { passive: true });
}


document.head.appendChild(mobileMoveStyle);



function getSubquestUUID(el) {
  return el.dataset.subquestUuid;
}

function questUX({
  module,
  node = null,
  scrollContainer = null,
  toast = null,
  toastType = "success",
  highlight = false,
  delay = 250
}) {
  // toast
  if (toast) {
    if (toastType === "error") showError(toast);
    else showSuccess(toast);
  }

  // force open module
  if (module) forceOpenModule(module);

  // scroll + highlight
  if (scrollContainer && node) {
    requestAnimationFrame(() => {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });

      if (highlight) {
        highlightQuest(node, delay);
      }
    });
  }
}


function DelquestUX({
  module,
  node = null,
  scrollContainer = null,
  toast = null,
  toastType = "success",
  highlight = false,
  delay = 250
}) {
  // toast
  if (toast) {
    if (toastType === "error") showError(toast);
    else showSuccess(toast);
  }

 
  

  // scroll + highlight
  if (scrollContainer && node) {
    requestAnimationFrame(() => {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });

      if (highlight) {
        highlightQuest(node, delay);
      }
    });
  }
}

function LoadContextitemInit() {
  let currentSubquest = null;

  /* =========================
     MENU ACTIONS
  ========================= */

  /* ===== RENAME ===== */
  contextMenu.querySelector('.menu-item:nth-child(1)').addEventListener('click', function () {
    if (!window.currentSubquest) return;

    const uuid = window.currentSubquest.dataset.subquestUuid;

    const nameEl = window.currentSubquest.querySelector('.quest-link');
    const oldName = (nameEl?.textContent || "")
      .replace(/\s+/g, " ")
      .trim();

    showInputModal({
      title: "Rename Quest",
      message: "Enter a new name for this quest",
      placeholdeszsr: "Quest name...",
      defaultValue: oldName,
      confirmText: "Rename",
      onConfirm: (newName) => {
        newName = newName.replace(/\s+/g, " ").trim();
        if (!newName) return;

        fetch(`/rename_subquest/${uuid}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          body: JSON.stringify({ name: newName })
        })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            const nameEl = window.currentSubquest.querySelector('.quest-link');
            if (nameEl) nameEl.textContent = data.name;
          }
        });
      }
    });

    hideMenu();
  });



  contextMenu.querySelector('.menu-item.move').addEventListener('click', function () {
    if (!window.currentSubquest) return;
    if(!isMobileView()) {
      return;
    }
    const questItem = window.currentSubquest; 
    hideMenu();

    /* =========================
      MOBILE MOVE MODE
    ========================= */
    if(isMobileView()){
      mobileMoveMode = true;
      mobileMoveItem = questItem;
      mobileOriginModule = questItem.closest('.content-init-q');

      // visual feedback
      questItem.classList.add('mobile-move-active');
      document.documentElement.classList.add('quest-mobile-lock');

      showToast("Tap a module to move here", "success");  // helper hint
      return;
    }

  });


 

  /* ===== DELETE ===== */
  contextMenu.querySelector('.menu-item:nth-child(8)').addEventListener('click', function (e) {
    if (!window.currentSubquest) return;
    e.preventDefault();
    e.stopPropagation();
    const uuid = window.currentSubquest.dataset.subquestUuid;

    showInputModal({
      title: "Delete Subquest",
      message: "Are you sure you want to delete this quest? This action cannot be undone.",
      cancelText: "Cancel",
      confirmText: "Delete",
      placeholder: "",
      defaultValue: "",
      onConfirm: () => {

        fetch(`/delete_subquest/${uuid}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          }
        })
        .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {

              const module = window.currentSubquest.closest('.content-init-q');

              window.currentSubquest.remove();
              updateModuleUI(module);

              DelquestUX({
                module,
                toast: "Quest deleted",
                toastType: "success"
              });

            } else {
              DelquestUX({ toast: data.message || "Delete failed", toastType: "error" });
            }
          });


      }
    });

    hideMenu();
  });

  /* ===== ARCHIVE / UNARCHIVE ===== */
  contextMenu.querySelector('.menu-item:nth-child(5)').addEventListener('click', toggleArchive);
  contextMenu.querySelector('.menu-item:nth-child(6)').addEventListener('click', toggleArchive);

  function toggleArchive(){
    if (!window.currentSubquest) return;

    const uuid = window.currentSubquest.dataset.subquestUuid;

    fetch(`/toggle_subquest_archive/${uuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    })
    .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {

          const module = window.currentSubquest.closest('.content-init-q');

          window.currentSubquest.dataset.archive = data.archived ? "true" : "false";
          window.currentSubquest.dataset.active  = data.archived ? "false" : "true";

          if (data.archived) {
            window.currentSubquest.style.display = "none";

            questUX({
              module,
              toast: "Quest archived",
              toastType: "success"
            });

          } else {
            window.currentSubquest.style.display = "flex";

            questUX({
              module,
              node: window.currentSubquest,
              scrollContainer: module.closest('.scroll-container'),
              toast: "Quest restored",
              toastType: "success",
              highlight: true
            });
          }

        } else {
          questUX({ toast: data.message || "Archive failed", toastType: "error" });
        }
      });


    hideMenu();
  }

  /* ===== OPEN ===== */
  contextMenu.querySelector('.menu-item:nth-child(3)').addEventListener('click', function (e) {
    if (!window.currentSubquest) return;
    e.preventDefault();
    e.stopPropagation();

    const url = window.currentSubquest.dataset.url;
    if (url) window.open(url, '_blank');

    hideMenu();
  });

  /* ===== DUPLICATE ===== */
  contextMenu.querySelector('.menu-item:nth-child(2)').addEventListener('click', function () {
    if (!window.currentSubquest) return;

    const uuid = window.currentSubquest.dataset.subquestUuid;

    const subquestContainer = window.currentSubquest.closest('.subquests-list');
    if (!subquestContainer) return;

    const questUUID = subquestContainer.id.replace('subquests_add-', '');

    fetch(`/duplicate_subquest/${uuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {

        const newItem = document.createElement('div');
        newItem.className = 'quest-item';
        newItem.dataset.subquestUuid = data.subquest_uuid;
        newItem.dataset.archive = "false";
        newItem.dataset.active = "true";
        newItem.dataset.draft = "false";
        newItem.dataset.url = window.currentSubquest.dataset.url;

        newItem.innerHTML = `
          <div class="diver-quest-123321">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="17" height="17" fill="currentColor">
              <path d="M6.5 11a1.5 1.5 0 1 1-3 0
                      1.5 1.5 0 0 1 3 0z
                      M5 3.5A1.5 1.5 0 1 0 6.5 5
                      1.5 1.5 0 0 0 5 3.5z
                      M12.5 11a1.5 1.5 0 1 1-3 0
                      1.5 1.5 0 0 1 3 0z
                      M11 3.5A1.5 1.5 0 1 0 12.5 5
                      1.5 1.5 0 0 0 11 3.5z"/>
            </svg>

            <div class="quest-link">${data.name}</div>
          </div>
          <div class="sub-quest-init-place">Reward</div>
        `;

        const subquestList = window.currentSubquest.closest('.subquests-list');
        const module = window.currentSubquest.closest('.content-init-q');
        const scrollContainer = module.closest('.scroll-container');

        if (subquestList) {
          subquestList.appendChild(newItem);
          attachContextMenuEvents(newItem);

          questUX({
            module,
            node: newItem,
            scrollContainer,
            toast: "Quest duplicated successfully",
            toastType: "success",
            highlight: true
          });
        }
      } else {
        questUX({ toast: data.message || "Duplicate failed", toastType: "error" });
      }
    });


    hideMenu();
  });

}


function forceOpenModule(module) {
  if (!module) return;

  const toggleBtn = module.querySelector('.toggle-subquests');
  if (!toggleBtn) return;

  const moduleId = toggleBtn.dataset.moduleId;
  const subquests = module.querySelectorAll('.quest-item');
  const icon = toggleBtn.querySelector("svg");

  // already open → do nothing
  const isAnyVisible = [...subquests].some(s => s.style.display === "flex");
  if (isAnyVisible) return;

  // 🔥 force UI open
  subquests.forEach(sub => sub.style.display = "flex");
  if (icon) icon.style.transform = "rotate(180deg)";
  console.log("called Force opened")
  // 🔥 persist backend
  fetch("/save_subquest_state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken
    },
    body: JSON.stringify({
      community_id: communityId,
      module_id: moduleId,
      state: "open"
    })
  }).catch(console.error);
}


function highlightQuest(node, delay = 250) {
  if (!node) return;

  setTimeout(() => {
    node.classList.add('smart-highlight');

    // cleanup class after animation
    setTimeout(() => {
      node.classList.remove('smart-highlight');
    }, 1200);

  }, delay);
}


function initAddSubquestHandlers() {
  const modules = document.querySelectorAll('.content-init-q.scrollable');
  if (!modules.length) return;

  modules.forEach(module => {
    const addQuestBtn = module.querySelector('.add-quest');
    if (!addQuestBtn) return;

    const moduleId = module.id.replace('module-', '');
    const subquestContainer = module.querySelector('.subquests-list');
    const scrollContainer = module.closest('.scroll-container');

    addQuestBtn.addEventListener('click', async () => {
      console.log(`🟢 Adding subquest to module ${moduleId}...`);

      try {
        const res = await fetch(`/create_subquest/${moduleId}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
        });

        const data = await res.json();
        console.log('📦 Response:', data);

        if (data.status !== 'success') {
          console.error('❌ Backend error:', data.message);
          return;
        }

        if (!subquestContainer) {
          console.error('❌ Subquest container not found for module', moduleId);
          return;
        }

        forceOpenModule(module);
        const newSubquest = document.createElement('div');
        newSubquest.className = 'quest-item';
        newSubquest.style.display = 'flex';

        newSubquest.id = `subquests-${moduleId}`;
        newSubquest.dataset.moduleId = moduleId;
        newSubquest.dataset.url = `/${communitySlug}/quest/admin/${moduleId}/${data.subquest_uuid}`;
        newSubquest.dataset.draft = "true";     
        newSubquest.dataset.archive = "false";
        newSubquest.dataset.active = "false";
        newSubquest.dataset.subquestUuid = data.subquest_uuid;

        newSubquest.innerHTML = `
          <div class="diver-quest-123321">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="17" height="17" fill="currentColor">
              <path d="M6.5 11a1.5 1.5 0 1 1-3 0
                      1.5 1.5 0 0 1 3 0z
                      M5 3.5A1.5 1.5 0 1 0 6.5 5
                      1.5 1.5 0 0 0 5 3.5z
                      M12.5 11a1.5 1.5 0 1 1-3 0
                      1.5 1.5 0 0 1 3 0z
                      M11 3.5A1.5 1.5 0 1 0 12.5 5
                      1.5 1.5 0 0 0 11 3.5z"/>
            </svg>

            <div class="quest-link" style="user-select:none !important;">
              ${data.name || 'Untitled quest'}
            </div>

          </div>

          <div class="sub-quest-init-place">Reward</div>
        `;


        subquestContainer.appendChild(newSubquest);

        /* =========================
           🎞 ANIMATION
        ========================= */
        requestAnimationFrame(() => {
          newSubquest.style.display = 'flex';
          newSubquest.style.opacity = '0';
          newSubquest.style.transform = 'translateY(10px)';

          requestAnimationFrame(() => {
            newSubquest.style.transition = 'all 0.3s ease';
            newSubquest.style.opacity = '1';
            newSubquest.style.transform = 'translateY(0)';
          });
        });

        /* =========================
           🧠 CONTEXT MENU
        ========================= */
        if (typeof attachContextMenuEvents === 'function') {
          attachContextMenuEvents(newSubquest);
        }

        /* =========================
           📜 AUTO SCROLL
        ========================= */
        if (scrollContainer) {
          requestAnimationFrame(() => {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              behavior: 'smooth'
            });

            // 🎯 smart highlight after scroll
            highlightQuest(newSubquest, 280);
          });
        }

        console.log(`✅ Successfully added subquest to module ${moduleId}`);
      } catch (err) {
        console.error('💥 JS Fetch error:', err);
      }
    });
  });
}


function createShareModal() { 
  if (document.getElementById("share-modal")) return;

  const modal = document.createElement("div");
  modal.id = "share-modal";

  modal.innerHTML = `
    <div class="share-backdrop"></div>

    <div class="share-box">

      <div class="share-header" id="share-header" style="display:none;">
        <span>Share this module</span>
        <button class="share-close">✕</button>
      </div>

      <div class="share-preview" id="share-preview-container">
        ${fetchingSvg}
      </div>

      <!-- DESKTOP ROW -->
      <div class="share-row" id="share-actions" style="display:none;">

        <div class="share-item" data-type="copy">
          <div class="share-circle">
            ${linkSvg}
          </div>
          <div class="share-label">Copy Link</div>
        </div>

        <div class="share-item" data-type="reddit">
          <div class="share-circle">
            ${redditSvg}
          </div>
          <div class="share-label">Reddit</div>
        </div>

        <div class="share-item" data-type="whatsapp">
          <div class="share-circle">
            ${whatappSVG}
          </div>
          <div class="share-label">WhatsApp</div>
        </div>

        <div class="share-item" data-type="x">
          <div class="share-circle">
            ${twitterSvg}
          </div>
          <div class="share-label">X (Twitter)</div>
        </div>

        <div class="share-item" data-type="linkedin">
          <div class="share-circle">
            ${linkedinSvg}
          </div>
          <div class="share-label">Linkedin</div>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const shareBox = modal.querySelector(".share-box");

  // close when clicking outside box
  modal.addEventListener("click", (e) => {
    if (!shareBox.contains(e.target)) {
      closeShareModal();
    }
  });

  // prevent inside clicks from bubbling
  shareBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  /* ================= EVENTS ================= */

  requestAnimationFrame(() => modal.classList.add("open"));

  // close
  modal.querySelector(".share-close").onclick = closeShareModal;
  modal.querySelector(".share-backdrop").onclick = closeShareModal;

  // share buttons
  modal.querySelectorAll(".share-item").forEach(item => {
    item.onclick = async () => {
      const type = item.dataset.type;
      const url = modal.dataset.url;
      const encoded = encodeURIComponent(url);
      let shareLink = "";

      // ===== COPY =====
      if (type === "copy") {
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          const input = document.createElement("input");
          input.value = url;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }

        showSuccess("Link copied");
        await closeShareModal();
        return;
      }

      // ===== LINKS =====
      if (type === "x") {
        shareLink = `https://twitter.com/intent/tweet?url=${encoded}`;
      }
      if (type === "reddit") {
        shareLink = `https://www.reddit.com/submit?url=${encoded}`;
      }
      if (type === "whatsapp") {
        shareLink = `https://wa.me/?text=${encoded}`;
      }
      if (type === "linkedin") {
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
      }

      // 🔥 OPEN FIRST (still user gesture)
      if (shareLink) {
        window.open(shareLink, "_blank");
      }

      // 🧠 THEN animate close
      await closeShareModal();
    };
  });

}



async function loadSharePreview(moduleUUID) {
  const container = document.getElementById("share-preview-container");
  const header = document.getElementById("share-header");
  const actions = document.getElementById("share-actions");

  // hide UI
  header.style.display = "none";
  actions.style.display = "none";

  // show spinner
  container.innerHTML = fetchingSvg;

  try {
    const res = await fetch(`/api/share/preview/${moduleUUID}`);
    const data = await res.json();

    if (!res.ok) {
      container.innerHTML = `<div style="color:red;">Failed to load preview</div>`;
      return;
    }

    // inject preview
    container.innerHTML = data.html;

    // show UI after load
    header.style.display = "flex";
    actions.style.display = "flex";

  } catch (e) {
    container.innerHTML = `<div style="color:red;">Network error</div>`;
  }
}



function openShareModal(url) {
  createShareModal();

  const modal = document.getElementById("share-modal");
  modal.dataset.url = url;

  modal.classList.add("open");

  // extract uuid from url
  const parts = url.split("/");
  const moduleUUID = parts[parts.length - 1];

  // fetch preview
  loadSharePreview(moduleUUID);
}


function closeShareModal() {
  return new Promise(resolve => {
    const modal = document.getElementById("share-modal");
    if (!modal) return resolve();

    // start close animation
    modal.classList.remove("open");

    // wait for transition to finish
    const duration = 250; // must match CSS transition time

    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      modal.removeEventListener("transitionend", finish);
      resolve();
    };

    modal.addEventListener("transitionend", finish);

    // safety fallback (in case transitionend doesn't fire)
    setTimeout(finish, duration + 50);
  });
}

window.activeQuestUUID = null;

whatappSVG =`
<svg class="whatsapp-icon"
     xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 510 512.459"
     fill="currentColor">
  <path d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.891 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z"/>
</svg>

`;

linkedinSvg = `
    <svg
      class="linkedin-icon"
      viewBox="0 -2 44 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 Z
          M707.17921,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 Z
          M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 Z"
        fill="#007EBB"
        transform="translate(-702 -265)"
      />
    </svg>
`;

linkSvg = `
<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" fill="var(--text-main)"><title>hyperlink</title><path d="M60.54,34.07A7.65,7.65,0,0,1,49.72,23.25l13-12.95a35.38,35.38,0,0,1,49.91,0l.07.08a35.37,35.37,0,0,1-.07,49.83l-13,12.95A7.65,7.65,0,0,1,88.81,62.34l13-13a20.08,20.08,0,0,0,0-28.23l-.11-.11a20.08,20.08,0,0,0-28.2.07l-12.95,13Zm14,3.16A7.65,7.65,0,0,1,85.31,48.05L48.05,85.31A7.65,7.65,0,0,1,37.23,74.5L74.5,37.23ZM62.1,89.05A7.65,7.65,0,0,1,72.91,99.87l-12.7,12.71a35.37,35.37,0,0,1-49.76.14l-.28-.27a35.38,35.38,0,0,1,.13-49.78L23,50A7.65,7.65,0,1,1,33.83,60.78L21.12,73.49a20.09,20.09,0,0,0,0,28.25l0,0a20.07,20.07,0,0,0,28.27,0L62.1,89.05Z"/></svg>
`;

redditSvg = `
<svg viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" class="reddit-icon">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> 
    <g  transform="translate(-800.000000, -566.000000)" fill="#FF5700"> 
    <path d="M831.14,592.325803 C829.346,592.325803 827.8385,590.884067 827.8385,589.106421 C827.8385,587.328775 829.346,585.839477 831.14,585.839477 C832.934,585.839477 834.389,587.328775 834.389,589.106421 C834.389,590.884067 832.934,592.325803 831.14,592.325803 M831.902,598.574316 C830.231,600.228597 827.654,601.032699 824.024,601.032699 C824.0165,601.032699 824.0075,601.031213 823.9985,601.031213 C823.991,601.031213 823.982,601.032699 823.973,601.032699 C820.343,601.032699 817.7675,600.228597 816.098,598.574316 C815.585,598.065993 815.585,597.244055 816.098,596.737218 C816.6095,596.23038 817.439,596.23038 817.952,596.737218 C819.104,597.878716 821.0735,598.434602 823.973,598.434602 C823.982,598.434602 823.991,598.436088 823.9985,598.436088 C824.0075,598.436088 824.0165,598.434602 824.024,598.434602 C826.9235,598.434602 828.8945,597.878716 830.048,596.737218 C830.561,596.228894 831.3905,596.23038 831.902,596.737218 C832.4135,597.245541 832.4135,598.067479 831.902,598.574316 M813.611,589.106421 C813.611,587.330262 815.1155,585.839477 816.908,585.839477 C818.702,585.839477 820.157,587.330262 820.157,589.106421 C820.157,590.884067 818.702,592.325803 816.908,592.325803 C815.1155,592.325803 813.611,590.884067 813.611,589.106421 M839.996,568.598098 C841.211,568.598098 842.1995,569.577586 842.1995,570.780024 C842.1995,571.983948 841.211,572.963436 839.996,572.963436 C838.781,572.963436 837.7925,571.983948 837.7925,570.780024 C837.7925,569.577586 838.781,568.598098 839.996,568.598098 M848,585.570452 C848,582.417955 845.4125,579.854043 842.231,579.854043 C840.854,579.854043 839.5895,580.335612 838.5965,581.136742 C835.079,578.945898 830.615,577.62604 825.83,577.346611 L828.326,569.527051 L835.1855,571.127824 C835.3655,573.602556 837.4535,575.561534 839.996,575.561534 C842.6555,575.561534 844.82,573.416766 844.82,570.780024 C844.82,568.144768 842.6555,566 839.996,566 C838.136,566 836.519,567.049346 835.7135,568.581748 L827.7425,566.722354 C827.075,566.56629 826.4,566.94679 826.193,567.594828 L823.094,577.300535 C817.9385,577.425386 813.092,578.749703 809.3165,581.068371 C808.337,580.308859 807.1055,579.854043 805.769,579.854043 C802.5875,579.854043 800,582.417955 800,585.570452 C800,587.519025 800.99,589.241677 802.4975,590.273187 C802.4345,590.726516 802.4015,591.182818 802.4015,591.645065 C802.4015,595.585315 804.713,599.250595 808.91,601.964625 C812.933,604.567182 818.258,606 823.9025,606 C829.547,606 834.872,604.567182 838.895,601.964625 C843.092,599.250595 845.4035,595.585315 845.4035,591.645065 C845.4035,591.224435 845.375,590.806778 845.3225,590.392093 C846.9305,589.376932 848,587.594828 848,585.570452"> 

    </path> 
  </g> 
</g> 
</svg>
`;

twitterSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" class="twitter-icon" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
  </svg>
`;


fetchingSvg= `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="spin-svg">
  <path d="M4.97498 12H7.89998" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M11.8 5V8" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18.625 12H15.7" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M11.8 19V16" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6.97374 16.95L9.04203 14.8287" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6.97374 7.05001L9.04203 9.17133" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M16.6262 7.05001L14.5579 9.17133" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M16.6262 16.95L14.5579 14.8287" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
</svg>

`;



function initModuleCRUDHandlers() {
  document.addEventListener('click', (e) => {
    let target = e.target;



    /* =========================
       ✏️ EDIT MODULE
    ========================= */
    let editBtn = target;
    while (editBtn && !editBtn.classList.contains('edit-mode-module')) {
      editBtn = editBtn.parentElement;
    }

  if (editBtn) {
    const moduleId = window.activeQuestUUID;
    if (!moduleId) return;

    const path = `/${communitySlug}/module/${moduleId}`;

    loadMainSettingsSection(path); 
    hideMenuModule();
    return;
  }


    /* =========================
       📝 RENAME MODULE
    ========================= */
    const renameBtn = target.closest('.rename-module');
    if (renameBtn) {

      const moduleId = window.activeQuestUUID;   // ✅ STATE ONLY
      if (!moduleId) return;

      const titleEl = document.getElementById(`module-name-${moduleId}`);
      if (!titleEl) return;

      const oldName = titleEl.textContent || "";

      showInputModal({
        title: "Rename Module",
        message: "Enter a new name for this module",
        placeholder: "Module name...",
        defaultValue: oldName,
        confirmText: "Rename",
        onConfirm: (newName) => {
          newName = newName.replace(/\s+/g, " ").trim();
          if (!newName || newName === oldName) return;

          fetch(`/rename_module/${moduleId}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({ title: newName })
          })
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              titleEl.textContent = newName; // ✅ live update
            }
          });
        }
      });

      hideMenuModule();
      return;
    }

    /* =========================
       🗑 DELETE MODULE
    ========================= */
    const deleteBtn = target.closest('.delete-module');
    if (deleteBtn) {

      const moduleId = window.activeQuestUUID;   // ✅ STATE ONLY
      if (!moduleId) return;

      const moduleEl = document.getElementById(`module-${moduleId}`);
      const moduleName =
        moduleEl?.querySelector('.module-title')?.textContent || "this module";

      showInputModal({
        title: "Delete Module",
        message: `Are you sure you want to delete "${moduleName}" module? This action cannot be undone.`,
        cancelText: "Cancel",
        confirmText: "Delete",
        placeholder: "",
        defaultValue: "",
        onConfirm: () => {

          fetch(`/delete_module/${moduleId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken
            }
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              moduleEl?.remove();  
              checkEmptyModulesAndReset();
            }
          });

        }
      });

      hideMenuModule();
      return;
    }
    const shareBtn = target.closest('.share-module');
    if (shareBtn) {

      const moduleId = window.activeQuestUUID;   
      if (!moduleId) {
        showError("Module not found");
        return;
      }

      const shareUrl = `${window.location.origin}/${communitySlug}/quest/${moduleId}`;

      /* =========================
        📱 MOBILE SHARE (iOS / Android)
      ========================= */
      if (navigator.share) {
        // ⚡ gesture-safe
        navigator.share({
          title: 'Check out this module!',
          text: 'Here’s a module I wanted to share with you:',
          url: shareUrl
        })
        .then(() => hideMenuModule())
        .catch(() => hideMenuModule());
      }

      /* =========================
        💻 DESKTOP SHARE MODAL
      ========================= */
      else {
        hideMenuModule();
        openShareModal(shareUrl);   // 🔥 your custom modal
      }

      return;
    }
   /* =========================
       📄 DUPLICATE MODULE
    ========================= */
    const duplicateBtn = target.closest('.duplicate-module');
    if (duplicateBtn) {

      const moduleId = window.activeQuestUUID;   // ✅ STATE ONLY
      if (!moduleId) return;

      fetch(`/duplicate_module/${moduleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Duplicate failed');
        return res.json();
      })
      .then(data => {
        if (data.status === 'success') {
          location.reload(); // or dynamic inject later
        }
      })
      .catch(err => console.error('Duplicate error:', err));

      hideMenuModule();
      return;
    }

  });
}

function initQuestUIBindings() {
  const searchInput = document.querySelector('.top-area input[type="search"]');
  if (!searchInput) return;

  /* =========================
     🔍 SEARCH FILTER
  ========================= */

  searchInput.addEventListener('input', function () {
    const searchValue = this.value.trim().toLowerCase();

    const filterTrigger = document.querySelector(".filter-trigger");
    if (!filterTrigger) return;

    // 🔥 current active filter (all | active | draft | archive)
    const activeFilter = filterTrigger.dataset.filter || "all";

    let anyMatch = false;

    document.querySelectorAll('.content-init-q.scrollable').forEach((module) => {
      const moduleTitle =
        module.querySelector('.module-title')?.textContent.toLowerCase() || '';

      const questItems = module.querySelectorAll('.quest-item');

      let moduleHasMatch = false;

      questItems.forEach((quest) => {
        const questText =
          quest.querySelector('a')?.textContent.toLowerCase() ||
          quest.textContent.toLowerCase();

        // 🔹 filter state
        const isDraft   = quest.dataset.draft === "true";
        const isArchive = quest.dataset.archive === "true";
        const isActive  = quest.dataset.active === "true";

        // 🔹 filter gate
        let allowedByFilter = false;
        if (activeFilter === "all") allowedByFilter = true;
        if (activeFilter === "draft") allowedByFilter = isDraft;
        if (activeFilter === "archive") allowedByFilter = isArchive;
        if (activeFilter === "active") allowedByFilter = isActive;

        // ❌ not part of active filter → force hide
        if (!allowedByFilter) {
          quest.style.display = "none";
          return;
        }

        // 🔍 search match
        const match =
          searchValue === "" ||
          moduleTitle.includes(searchValue) ||
          questText.includes(searchValue);

        if (match) {
          quest.style.display = "flex";
          moduleHasMatch = true;
          anyMatch = true;
        } else {
          quest.style.display = "none";
        }
      });

      // module visibility depends only on visible children
      const hasVisible = [...questItems].some(q => q.style.display === "flex");
      module.style.display = hasVisible ? "block" : "none";
    });

    /* =========================
      NO RESULTS (SEARCH ONLY)
    ========================= */
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
      if (!anyMatch && searchValue !== "") {
        noResultsMessage.style.display = "block";
      } else {
        noResultsMessage.style.display = "none";
      }
    }

    // ❌ DO NOT TOUCH empty-state
    // ❌ DO NOT TOUCH allinit-conatin
  });


  /* =========================
     📦 MODULE BINDINGS
  ========================= */



  /* =========================
     🌍 GLOBAL CLOSERS
  ========================= */
  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.dropdown') &&
      !e.target.closest('.menu-btn') &&
      !e.target.closest('.module-header')
    ) {
      hideAllDropdowns();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (
      !e.target.closest('.dropdown') &&
      !e.target.closest('.menu-btn') &&
      !e.target.closest('.module-header')
    ) {
      hideAllDropdowns();
    }
  });

  document.addEventListener('scroll', hideAllDropdowns, true);
}


  function initSubquestToggles(communityId) {
  document.querySelectorAll(".toggle-subquests").forEach(btn => {



    btn.addEventListener("click", e => {
        e.stopPropagation();
      const moduleId = btn.dataset.moduleId;

      const icon = btn.querySelector("svg");
      const subquests = document.querySelectorAll(
        `.quest-item[data-module-id="${moduleId}"]`
      );
    console.log("subquest lendth",subquests.length)


      /* =========================
         ❌ NO SUBQUESTS
      ========================= */
      if (!subquests.length) {
        showError(`
          <div style="display:flex; align-items:center; gap:8px;">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path
                  d="M12,2A10,10,0,1,0,22,12,10.016,10.016,0,0,0,12,2Zm1,14a1,1,0,0,1-2,0V12a1,1,0,0,1,2,0ZM12,9a1,1,0,1,1,1-1A1,1,0,0,1,12,9Z"
                  fill="currentColor"
                />
              </svg>
              No quest in this module
          </div>
        `);
        return;
      }

      /* =========================
         TOGGLE LOGIC
      ========================= */
      const currentlyOpen = [...subquests].some(
        el => getComputedStyle(el).display !== "none"
      );

      subquests.forEach(sub => {
        sub.style.display = currentlyOpen ? "none" : "flex";
      });

      if (icon) {
        icon.style.transform = currentlyOpen
          ? "rotate(0deg)"
          : "rotate(180deg)";
      }

      const newState = currentlyOpen ? "closed" : "open";

      /* =========================
         SAVE STATE
      ========================= */
      fetch("/save_subquest_state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({
          community_id: communityId,
          module_id: moduleId,
          state: newState
        })
      }).catch(console.error);
    });
  });
}



function SmartDropdown(trigger, dropdown, options = {}) {
  if (!trigger || !dropdown) return;

  const container = document.getElementById("app");
  if (!container) return;

  const config = {
    offset: 8,
    zIndex: 99999,
    prefer: "bottom",
    ...options
  };

  dropdown.style.position = "fixed";
  dropdown.style.zIndex = config.zIndex;

  function close() {
    if (IsopenDropdown) {
      IsopenDropdown.style.display = "none";
      IsopenDropdown = null;
    }
  }

  function open() {

    // close any other dropdown
    if (IsopenDropdown && IsopenDropdown !== dropdown) {
      IsopenDropdown.style.display = "none";
      IsopenDropdown = null;
    }

    hideMenuModule?.();
    hideMenu?.();

    const tRect = trigger.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    // measure dropdown
    dropdown.style.visibility = "hidden";
    dropdown.style.display = "flex";

    const dRect = dropdown.getBoundingClientRect();

    dropdown.style.visibility = "visible";

    let top, left;

    if (config.prefer === "bottom") {
      if (tRect.bottom + dRect.height + config.offset <= cRect.bottom) {
        top = tRect.bottom + config.offset;
      } else {
        top = tRect.top - dRect.height - config.offset;
      }
    } else {
      if (tRect.top - dRect.height - config.offset >= cRect.top) {
        top = tRect.top - dRect.height - config.offset;
      } else {
        top = tRect.bottom + config.offset;
      }
    }

    left = tRect.left + (tRect.width / 2) - (dRect.width / 2);

    const minLeft = cRect.left + config.offset;
    const maxLeft = cRect.right - dRect.width - config.offset;

    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;
    dropdown.style.display = "flex";

    IsopenDropdown = dropdown;
  }

  function toggle() {
    if (IsopenDropdown === dropdown) {
      close();
    } else {
      open();
    }
  }

  // close on scroll / resize
  window.addEventListener("scroll", close, true);
  window.addEventListener("resize", close);

  // 👇 IMPORTANT: open immediately when called
  toggle();

  return { open, close, toggle };
}

function initTopDropdowns() {
  const trigger = document.getElementById('dropdown-arrow');
  const menu = document.querySelector('.dropdown-menu');

  if (!trigger || !menu) return;

  // Remove previous listener if SPA re-inits
  trigger.replaceWith(trigger.cloneNode(true));

  const newTrigger = document.getElementById('dropdown-arrow');

  newTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    SmartDropdown(newTrigger, menu, {
      offset: 10,
      prefer: "bottom"
    });
  });
}






  window.QuestModule = {
    init: initQuestApp
  };

})();