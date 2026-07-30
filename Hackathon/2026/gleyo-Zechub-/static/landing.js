const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

const searchInput = document.querySelector(".nav-search");
const mainContent = document.getElementById("main-content");
const resultsContainer = document.getElementById("community-search-results");

if (searchInput) {
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
      mainContent.style.display = "block";
      resultsContainer.style.display = "none";
      resultsContainer.innerHTML = "";
      return;
    }
    mainContent.style.display = "none";
    resultsContainer.style.display = "block";
    const res = await fetch(`/api/search-communities?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (data.length === 0) { resultsContainer.innerHTML = "<p>No communities found.</p>"; return; }
    let html = `<div class="community-grid">`;
    data.forEach(c => {
      html += `<a href="${c.url}" class="community-card">
        <img src="${c.logo}" alt="">
        <div class="center-edinit"><h3>${c.name}</h3><p>${c.about || ""}</p></div>
      </a>`;
    });
    html += `</div>`;
    resultsContainer.innerHTML = html;
  });
}

function handleProfileClick() {
  if (window.innerWidth <= 768) {
    openSheet();
  } else {
    toggleDropdown();
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById("profile-dropdown");
  const trigger = document.getElementById("profile-trigger");
  if (!trigger || !dropdown) return;
  const rect = trigger.getBoundingClientRect();
  if (dropdown.style.display === "flex") { dropdown.style.display = "none"; return; }
  dropdown.style.display = "flex";
  dropdown.style.top = rect.bottom + 8 + "px";
  dropdown.style.left = rect.right - 210 + "px";
}

window.addEventListener("click", function (e) {
  const trigger = document.getElementById("profile-trigger");
  const dropdown = document.getElementById("profile-dropdown");
  if (!trigger || !dropdown) return;
  if (!trigger.contains(e.target) && !dropdown.contains(e.target)) dropdown.style.display = "none";
});

function openSheet() {
  const overlay = document.getElementById("sheet-overlay");
  const sheet = document.getElementById("bottom-sheet");
  if (!sheet) return;
  document.body.style.overflow = "hidden";
  if (overlay) { overlay.style.display = "block"; requestAnimationFrame(() => overlay.classList.add("open")); }
  requestAnimationFrame(() => sheet.classList.add("open"));
}

function closeSheet() {
  const overlay = document.getElementById("sheet-overlay");
  const sheet = document.getElementById("bottom-sheet");
  if (!sheet) return;
  document.body.style.overflow = "";
  sheet.classList.remove("open");
  if (overlay) {
    overlay.classList.remove("open");
    setTimeout(() => { if (overlay) overlay.style.display = "none"; }, 300);
  }
}

 
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeSheet();
});

function saveAccountBackRoute() {
  let path = window.location.pathname + window.location.search;
  if (path.includes("/settings")) path = "/";
  sessionStorage.setItem("accountBackRoute", path);
}

async function logoutUser(url) {
  const nextPath = window.location.pathname + window.location.search;
  const loginUrl = `/login?next=${encodeURIComponent(nextPath)}`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "X-CSRFToken": csrfToken }
  });

  sessionStorage.removeItem("push_dismissed");

  if (res.redirected) {
    window.location.replace(res.url);
    return;
  }

  const ct = res.headers.get("content-type");

  if (ct && ct.includes("application/json")) {
    const data = await res.json();

    if (data.success) {
      window.location.replace(loginUrl);
    }
  } else {
    window.location.replace(loginUrl);
  }
}
 
const scrollWrapEl = document.getElementById("scroll-wrap");

function handleScroll() {
  const scrollY = scrollWrapEl ? scrollWrapEl.scrollTop : window.scrollY;

  document.querySelectorAll(".parallax").forEach(el => {
    const speed = el.dataset.speed || 0.2;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });

  const nav = document.querySelector(".top-nav");
  if (nav) nav.style.background = scrollY > 20 ? "rgba(11,11,18,0.95)" : "rgba(11,11,18,0.78)";
}

if (scrollWrapEl) {
  scrollWrapEl.addEventListener("scroll", handleScroll);
} else {
  window.addEventListener("scroll", handleScroll);
}

function showToast(msg, type = "error") {
  document.querySelectorAll(".toast").forEach(t => t.remove());

  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);

  requestAnimationFrame(() => t.classList.add("show"));

  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 2600);
}

function showError(msg) {
  showToast(msg, "error");
}

function showSuccess(msg) {
  showToast(msg, "success");
}

const topNav = document.querySelector(".top-nav");

if (topNav) {
  let isPressing = false;

  topNav.addEventListener("pointerdown", () => {
    if (window.innerWidth > 768) return;
    isPressing = true;
    topNav.classList.remove("bounce-out");
    topNav.classList.add("pressing");
  });

  const release = () => {
    if (!isPressing) return;
    isPressing = false;
    topNav.classList.remove("pressing");
    void topNav.offsetWidth;  
    topNav.classList.add("bounce-out");
  };

  topNav.addEventListener("pointerup", release);
  topNav.addEventListener("pointercancel", release);
  topNav.addEventListener("pointerleave", release);

  window.addEventListener("load", () => {
    if (window.innerWidth > 768) return;
    if (isPressing || topNav.classList.contains("pressing")) return;
    if (topNav.classList.contains("bounce-out")) return;

    void topNav.offsetWidth;
    topNav.classList.add("bounce-out");
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("active"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));



const featuredContainer = document.getElementById("featured-communities");

function renderCommunitySkeletons(count = 4) {
  if (!featuredContainer) return;

  featuredContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    featuredContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="spotlight-card skeleton">
        <div class="spotlight-image skeleton-box"></div>

        <div class="spotlight-content">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-pill"></div>
        </div>
      </div>
      `
    );
  }
}

async function loadFeaturedCommunities() {
  if (!featuredContainer) return;

  renderCommunitySkeletons();

  try {
    const res = await fetch("/api/public/communities");
    const communities = await res.json();

    featuredContainer.innerHTML = "";

    communities.forEach(c => {

      const badge =
        c.slug.toLowerCase() === "gleyo"
          ? "Official"
          : "Verified";

      featuredContainer.insertAdjacentHTML(
        "beforeend",
        `
        <a href="${c.url}" class="spotlight-link">

          <div class="spotlight-card">

            <div class="spotlight-image">
              <img
                src="${c.logo}"
                loading="lazy"
                alt="${c.name}">
            </div>

            <div class="spotlight-content">

              <h3>${c.name}</h3>

              <p>${c.about}</p>

              <span class="comm-badge">${badge}</span>

            </div>

          </div>

        </a>
        `
      );
    });

  } catch (err) {
    console.error(err);

    featuredContainer.innerHTML =
      "<p>Unable to load communities.</p>";
  }
}

window.addEventListener("load", () => {
  loadFeaturedCommunities();
});