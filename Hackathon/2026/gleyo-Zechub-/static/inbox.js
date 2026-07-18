(function () {
  let openDropdown = null; 

const REVIEW_ATTEMPT_CACHE = new Map();
const REVIEW_META_MAP = new Map();
let openDropdownSub = null;


async function fetchReviewAttempts(taskReviewId) {

  if (REVIEW_ATTEMPT_CACHE.has(taskReviewId)) {
    return REVIEW_ATTEMPT_CACHE.get(taskReviewId);
  }

  const res = await fetch(`/task-review-attempts/${taskReviewId}`);

  if (!res.ok) throw new Error("Failed to fetch attempts");

  const data = await res.json();

  REVIEW_ATTEMPT_CACHE.set(taskReviewId, data);

  return data;
}

let activeTypeFilter = null;

function applyTypeFilter(type) {

    activeTypeFilter = type;

    const items = document.querySelectorAll(".review-item");

    let visibleCount = 0;

    items.forEach(it => {

        const itemType = it.dataset.type;

        if (!type || itemType === type) {
            it.style.display = "grid";
            visibleCount++;
        } else {
            it.style.display = "none";
        }

    });

    // ONLY run quest filter if we are in task mode
    if (type === "task") {
        applyQuestFilter();
    }
    if (type === "invite") {
      openDropdownSub = null;
    
    }

    showEmptyState(visibleCount);
}


function showEmptyState(count) {

    const reviewListEl = document.querySelector(".review-list");

    let empty = reviewListEl.querySelector(".empty-state");

    if (!empty) {
        empty = document.createElement("div");
        empty.className = "empty-state";
        empty.style.padding = "20px";
        empty.style.opacity = "0.6";
        empty.style.color = "var(--text-muted)";
        reviewListEl.appendChild(empty);
    }

    if (count === 0) {
        empty.textContent = "No activity found.";
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }
}




function applyQuestFilter() {

    if (activeTypeFilter !== "task") return;

    const checked = Array.from(
        document.querySelectorAll(".quest-check:checked")
    ).map(input =>
        input.closest("li").dataset.questName.toLowerCase()
    );

    const items = document.querySelectorAll(".review-item");

    let visibleCount = 0;

    items.forEach(it => {

        if (it.dataset.type !== "task") return;

        const reviewId = it.dataset.taskReviewId;
        const meta = REVIEW_META_MAP.get(reviewId);

        if (!meta) {
            it.style.display = "none";
            return;
        }

        const subName = meta.subquestName;

        if (checked.length === 0 || checked.includes(subName)) {
            it.style.display = "grid";
            visibleCount++;
        } else {
            it.style.display = "none";
        }

    });

    showEmptyState(visibleCount);
}



const CommentIconSvg= `
            <span class="comment-indicator" title="Click to view comment">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg-comment" viewBox="0 0 24 24" fill="currentColor"
                    style="width:15px;height:15px;opacity:0.8;margin-left:4px;">
                  <path d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"/>
                </svg>
            </span>
`;


  let savedContentScrollTop = 0;



function closeOpenDropdown() {
  if (openDropdown) {
    openDropdown.style.display = 'none';
    openDropdown = null;
  }
}


function calledAllInboxforview() {
  const typeDropdown = document.getElementById("filter-by-type");

  const isMobile = () => window.matchMedia("(max-width: 1112px)").matches;


  const reviewListEl = document.querySelector(".review-list");
  const reviewFeed = document.querySelector(".review-panel.review-feed");
  const reviewCenter = document.querySelector(".review-panel.review-center");
  const inboxBar = document.querySelector(".inbox-bar");
  const isDesktop = !/android|iphone|ipad|ipod/i.test(navigator.userAgent);

  const reviewBar = document.querySelector(".inbox-conatiner-wrapper");
  const placeholderInbox = document.querySelector(".placeholder-inbox");
  const inboxTaskContainer = document.querySelector(".inbox-task");
  const commentContainer = document.querySelector(".comment-container");
  const commentBox = document.querySelector(".comment-box");
  const clearBtn = document.getElementById("clear-all-filter-inbox");


  // -----------------------------
  // CLICK REVIEW ITEM (MOBILE → CENTER)
  // -----------------------------
  reviewListEl.addEventListener("click", function (e) {


    if(openDropdownSub) return;

    const item = e.target.closest(".review-item");
      if (openDropdown) {
        e.stopPropagation();
        e.preventDefault();

        closeOpenDropdown();

        return; 
      }
    if (!item) return;

    if (item.dataset.type === "invite") return;
      const content = document.querySelector(".content");
      if (content) {
        savedContentScrollTop = content.scrollTop;
      }

    document
      .querySelectorAll(".review-item.active-review-item")
      .forEach(el => el.classList.remove("active-review-item"));

    item.classList.add("active-review-item");

    const subquestName = item.querySelector(".review-sub")?.textContent || "Task";

    reviewBar.querySelector(".inbox-crumb").textContent = subquestName;

    reviewBar.style.display = "flex";
    if (isDesktop) {
      placeholderInbox.style.display = "none";
    }




    const reviewerName = item.querySelector(".review-title")?.textContent || "";


    // Comment logic
    const comment = item.getAttribute("data-inbox-comment");
    if (!comment || comment.trim() === "") {
      commentContainer.style.display = "none";
      commentBox.innerHTML = "";
    } else {
      commentContainer.style.display = "block";
      commentBox.innerHTML = `
        <strong style="font-size:14px;font-weight:550;">Comment:</strong>
        <span style="font-size:14px;">${comment}</span>
      `;
    }


// Attempts (NEW SYSTEM)

  const taskReviewId = item.dataset.taskReviewId;

  if (!taskReviewId) return;

  fetchReviewAttempts(taskReviewId)
    .then(data => {

      const taskAttempts = data.task_attempts || [];

      // comment from backend
      const comment = data.comment || "";

      if (!comment.trim()) {
        commentContainer.style.display = "none";
        commentBox.innerHTML = "";
      } else {
        commentContainer.style.display = "block";
        commentBox.innerHTML = `
          <strong style="font-size:14px;font-weight:550;">Comment:</strong>
          <span style="font-size:14px;">${comment}</span>
        `;
      }

      renderInboxCards(taskAttempts, inboxTaskContainer);

    })
    .catch(err => {
      console.error(err);
    });


    // ✅ MOBILE PANEL SWITCH
    if (isMobile()) {
      reviewFeed.classList.remove("show");
      reviewCenter.classList.add("show");
    }
    inboxBar?.addEventListener("click", function () {
      if (!isMobile()) return;

      reviewCenter.classList.remove("show");
      reviewFeed.classList.add("show");
      item.classList.remove("active-review-item");
      const content = document.querySelector(".content");
      requestAnimationFrame(() => {
        if (content) {
          content.scrollTop = savedContentScrollTop;
        }
      });
    });

  });

  // -----------------------------
  // CLICK INBOX BAR (MOBILE → FEED)
  // -----------------------------
  const typeItems = document.querySelectorAll("#filter-by-type .type-item");

  typeItems.forEach(item => {

    item.addEventListener("click", () => {

      const type = item.dataset.type;

      // hide dropdown
      typeDropdown.style.display = "none";
      questDropdown.style.display = "none";
      openDropdownSub = null;

       

      if (type === "invite") {
        applyTypeFilter("invite");
        showClearFilterBtn();
      }

      if (type === "task") {

        applyTypeFilter("task");

        questDropdown.style.display = "block";
        openDropdownSub = questDropdown;

        const rect = trigger.getBoundingClientRect();
        const dropdownWidth = questDropdown.offsetWidth;

        questDropdown.style.top =
          rect.bottom + window.scrollY + 5 + "px";

        questDropdown.style.left =
          rect.right + window.scrollX - dropdownWidth + "px";

        if (allSubquests.length === 0) {
          loadSubquests();
        }
      }

    });

  });




  const trigger = document.getElementById("show-inbox-item-dropdown");
  const questDropdown = document.getElementById("filter-by-quest");
  const questList = questDropdown.querySelector(".quest-list");
  const noResultEl = document.getElementById("quest-no-result");
  const searchInput = questDropdown.querySelector("input[type='search']");

  let allSubquests = [];

  function showClearFilterBtn() {
    clearBtn.style.display = "flex";
      trigger.style.display ="none";


    setTimeout(() => {
      clearBtn.style.opacity = "1";
    }, 300);
  }

  function hideClearFilterBtn() {
    clearBtn.style.opacity = "0";

    setTimeout(() => {
      clearBtn.style.display = "none";
      trigger.style.display ="flex";

    }, 300);
  }
  // -----------------------------
  // LOAD SUBQUESTS FROM API
  // -----------------------------
  async function loadSubquests() {
    try {
      const slug = communitySlug;
      const res = await fetch(`/api/${slug}/subquests`);
      if (!res.ok) throw new Error("Failed to load");

      const data = await res.json();
      allSubquests = data.subquests || [];
      renderSubquests(allSubquests);

    } catch (err) {
      questList.innerHTML = `<li class="quest-item disabled">Failed to load</li>`;
      console.error(err);
    }
  }

  // -----------------------------
  // RENDER SUBQUEST ITEMS
  // -----------------------------
  function renderSubquests(list) {
    questList.innerHTML = "";

    if (list.length === 0) {
      noResultEl.style.display = "block";
      return;
    }

    noResultEl.style.display = "none";

    list.forEach(q => {
      const item = document.createElement("li");
      item.className = "quest-item-inb";
      item.dataset.questName = q.toLowerCase();

      item.innerHTML = `
        <label class="quest-checkbox-wrapper">
          <input type="checkbox" class="quest-check">
          <span class="custom-checkmark"></span>
        </label>
        <span>${q}</span>
      `;

      const checkbox = item.querySelector(".quest-check");

      // 🔥 CLICK ANYWHERE on LI toggles checkbox
      item.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
        updateSelectedState(item);
      });

      questList.appendChild(item);
    });
  }

  // -----------------------------
  // UPDATE SELECTED STYLE
  // -----------------------------
  function updateSelectedState(item) {
    const checkbox = item.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
    showClearFilterBtn();

    applyQuestFilter(); 
  }
  clearBtn.addEventListener("click", () => {

    // reset type filter
    activeTypeFilter = null;

    // show all items
    document.querySelectorAll(".review-item").forEach(it => {
      it.style.display = "grid";
    });

    // uncheck all quest checkboxes
    document.querySelectorAll(".quest-check").forEach(cb => {
      cb.checked = false;
      cb.closest(".quest-item-inb")?.classList.remove("selected");
    });

    // hide dropdowns
    questDropdown.style.display = "none";
    typeDropdown.style.display = "none";
    openDropdownSub = null;

    // hide clear button
    hideClearFilterBtn();

    // reset search
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));

    showEmptyState(document.querySelectorAll(".review-item").length);
  });

  // -----------------------------
  // SEARCH FILTER
  // -----------------------------
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = allSubquests.filter(q => q.toLowerCase().includes(term));
    renderSubquests(filtered);
    noResultEl.style.display = filtered.length === 0 ? "block" : "none";
  });

  // -----------------------------
  // OPEN / CLOSE DROPDOWN
  // -----------------------------

trigger.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const isOpen = openDropdownSub === typeDropdown;
  questDropdown.style.display = "none";

  if (isOpen) {
    typeDropdown.style.display = "none";
    questDropdown.style.display = "none";
    openDropdownSub = null;
    return;
  }

  // 🟢 OPEN
  typeDropdown.style.display = "block";

  const rect = trigger.getBoundingClientRect();
  const dropdownWidth = typeDropdown.offsetWidth;

  typeDropdown.style.top =
    rect.bottom + window.scrollY + 5 + "px";

  typeDropdown.style.left =
    rect.right + window.scrollX - dropdownWidth + "px";

  openDropdownSub = typeDropdown;
});


document.addEventListener("click", (e) => {

  const clickedInsideQuest = questDropdown.contains(e.target);
  const clickedInsideType = typeDropdown.contains(e.target);

  if (
    openDropdownSub &&
    !clickedInsideQuest &&
    !clickedInsideType &&
    e.target !== trigger
  ) {

    questDropdown.style.display = "none";
    typeDropdown.style.display = "none";

    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));


    openDropdownSub = null;
  }
});

}


const extraSVGs = {
  flag: `
      <svg viewBox="0 0 24 24" class="svg-flag inbox-svg-feed" style="top: 1.5px;" fill="currentColor" stroke="currentColor" width="18" height=18 xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.5 21V16M4.5 16V6.5C5.5 5.5 7 5 8.5 5C11.5 5 13.5 7.5 17.5 5.5V15.5C13.5 17.5 11.5 14.5 8.5 14.5C7.5 14.5 5.5 15 4.5 16Z" />
      </svg>
  `,

  star: `
    <svg viewBox="0 0 24 24" width="16" height="16" class="svg-star inbox-svg-feed"   xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
    </svg>
  `,

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





function renderInboxCards(taskAttempts, container) {
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
      chip.textContent = "🔗";
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

}


function initinboxinit() {
    const reviewListEl = document.querySelector(".review-list");

    if (!reviewListEl || !communitySlug) return;

    fetch(`/${communitySlug}/task-review-feed/${currentUserId}`)
        .then(res => res.json())
        .then(data => {

            reviewListEl.innerHTML = "";

            if (!data.history || data.history.length === 0) {
                reviewListEl.innerHTML = `
                    <div style="padding:20px; opacity:0.6; color: var(--text-muted); text-align: center;">
                        No activity yet.
                    </div>`;
                return;
            }


            data.history.forEach(item => {

                const el = document.createElement("div");
                el.className = "review-item";
                if (item.type === "invite") {
                    el.classList.add("invite");
                }
                el.dataset.type = item.type;

                let avatar = "";
                let mainText = "";
                let subText = "";
                let timeAgo = "";
                let statusIcon = "";

                if (item.type === "task") {

                    el.dataset.taskReviewId = item.task_review_id;
                    const reviewId = String(item.task_review_id);

                    REVIEW_META_MAP.set(reviewId, {
                        subquestName: (item.subquest_name || "").toLowerCase(),
                        type: "task"
                    });
                    avatar = item.reviewer_profile_pic
                        ? `<img src="${item.reviewer_profile_pic}">`
                        : `<div class="avatar-fallback">${(item.reviewer_name || "U")[0]}</div>`;

                    mainText = `
                        <span class="rv-name">${item.reviewer_name}</span>
                        <span class="rv-normal"> reviewed with </span>
                        <span class="rv-status">${item.history_status}</span>
                    `;

                    subText = item.subquest_name || "";
                    timeAgo = item.review_created_at;
                    statusIcon = statusSVGs[item.history_status] || "";

                } else if (item.type === "invite") {
                  REVIEW_META_MAP.set("invite-" + item.created_at, {
                      subquestName: "",
                      type: "invite"
                  });
                    avatar = item.avatar_url
                        ? `<img src="${item.avatar_url}">`
                        : `<div class="avatar-fallback">${item.action_text[0]}</div>`;

                    const parts = item.action_text.split(" ");
                    const name = parts.shift();
                    const rest = parts.join(" ");

                    mainText = `
                        <span class="rv-name">${name}</span>
                        <span class="rv-normal">${rest}</span>
                    `;

                    subText = item.community_name;
                    timeAgo = item.created_at;
                    statusIcon = ""; // invites no status icon
                }

                el.innerHTML = `
                    <div class="review-avatar">${avatar}</div>
                    <div class="all-review-container">
                        <div class="review-meta left-right-left">
                            <div class="review-title">${mainText}</div>
                            <div class="review-sub">${subText}</div>
                        </div>
                        <div class="review-ago">
                            ${statusIcon}
                            <span class="time-ago">${timeAgo}</span>
                        </div>
                    </div>
                `;

                reviewListEl.appendChild(el);
            });


            calledAllInboxforview();

        })
        .catch(err => {
            reviewListEl.innerHTML = `
                <div style="padding:20px; color:#e66;">
                    Failed to load activity.
                </div>`;
            console.error(err);
        });
}






  window.inBoxModule = {
    init: initinboxinit
  };




})();