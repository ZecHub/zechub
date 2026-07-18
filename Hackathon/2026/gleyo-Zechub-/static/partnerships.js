(function () {

function LetsGetloadedPartnership() {
  const infoIcons = document.querySelectorAll(".info-svg");
  const modal = document.querySelector(".community-card-container");
  const modalLogo = modal.querySelector(".community-logo");
  const modalName = modal.querySelector(".community-name");
  const descBox = document.getElementById("desc");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");
  const allCommunities = Array.from(infoIcons);
  let currentIndex = -1;

  // ✅ Function to show a specific community in the modal
  function showCommunity(index) {
    if (index < 0 || index >= allCommunities.length) return;

    currentIndex = index;
    const icon = allCommunities[index];
    const name = icon.getAttribute("data-name");
    const logo = icon.getAttribute("data-logo");
    const about = icon.getAttribute("data-about") || "";
    const twitterCount = icon.getAttribute("data-twitter") || "0";
    const discordCount = icon.getAttribute("data-discord") || "0";

    resetLogoArea();

    if (logo) {
      modalLogo.src = logo;
      modalLogo.style.display = "block";
      modalLogo.onerror = () => createCommunityFallback(name);
    } else {
      createCommunityFallback(name);
    }

    modalName.textContent = name;

    // ✅ Update About text
    if (about.trim() !== "") {
      descBox.innerHTML = `<strong>About:</strong> ${about}`;
    } else {
      descBox.innerHTML = `
        <strong>Note:</strong> Stay connected and grow your community with Gleyo Hub.
        Track your followers across platforms and unlock insights that help boost your engagement.
        Use the navigation arrows to move between items, then tap "Send Request" to submit.
      `;
    }

    // ✅ Update social stats dynamically
    modal.querySelector(".social-item.twitter .count").textContent = twitterCount;
    modal.querySelector(".social-item.discord .count").textContent = discordCount;

    modal.style.display = "flex";
    updateArrowVisibility();
  }


  // ✅ Hide or show arrows based on position
  function updateArrowVisibility() {
    if (currentIndex <= 0) {
      prevArrow.style.visibility = "hidden";
    } else {
      prevArrow.style.visibility = "visible";
    }

    if (currentIndex >= allCommunities.length - 1) {
      nextArrow.style.visibility = "hidden";
    } else {
      nextArrow.style.visibility = "visible";
    }
  }

  // ✅ Remove previous fallback if any
  function resetLogoArea() {
    const existingFallback = modal.querySelector(".communityfallback");
    if (existingFallback) existingFallback.remove();
    modalLogo.style.display = "none";
  }

  // ✅ Create the fallback circle with first letter
  function createCommunityFallback(name) {
    resetLogoArea();
    const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
    const fallback = document.createElement("div");
    fallback.classList.add("communityfallback");
    fallback.textContent = firstLetter;

    fallback.style.cssText = `
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 25px;
      color: white;
      font-family: 'Outfit', sans-serif;
      text-transform: uppercase;
    `;

    modalLogo.insertAdjacentElement("beforebegin", fallback);
  }

  // ✅ Click event for each info icon
  infoIcons.forEach((icon, index) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      showCommunity(index);
    });
  });

  // ✅ Navigation arrows
  prevArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) showCommunity(currentIndex - 1);
  });

  nextArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex < allCommunities.length - 1) showCommunity(currentIndex + 1);
  });

  // ✅ Click outside to close modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });





document.addEventListener("click", (e) => {
  const span = e.target.closest(".span-gapes");
  if (!span || span.classList.contains("request-sent") || span.disabled) return;

  const toCommunityId = span.dataset.communityId;
  const fromCommunityId = span.dataset.fromCommunityId;
  const toCommunityName = span.closest(".partnership-item")
                              ?.querySelector(".communites-names")?.innerText;

  if (!toCommunityId || toCommunityId === fromCommunityId) return;

  // ✅ Disable immediately so a double-click can’t send two
  span.disabled = true;

  fetch("/send_request", {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
    body: JSON.stringify({
      from_community_id: fromCommunityId,
      to_community_id: toCommunityId
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      if (data.first_time) {
        const unlockToast = document.getElementById("unlock-toast");
        unlockToast.classList.add("show");
        unlockToast.style.display = "flex";
        unlockToast.style.opacity = "1";
        unlockToast.style.transform = "translateY(0)";
      } else {
        showToast(`Partnership request sent to ${toCommunityName}`);
      }

      span.innerHTML = "Request sent";
      span.classList.add("request-sent");
      span.style.color = "green";
      span.style.fontStyle = "italic";
      span.style.cursor = "not-allowed";
      span.removeAttribute("data-community-id");
      span.removeAttribute("data-from-community-id");
    } else if (data.error) {
      showToast(`Error: ${data.error}`, false, "error");
      span.disabled = false; // re-enable if backend error
    }
  })
  .catch(err => {
    console.error(err);
    showToast("An unexpected error occurred", false, "error");
    span.disabled = false;
  });
});


}

const DiscordSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011..." />
  </svg>
`

const TwitterXsvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
  </svg>
`

function renderCommunity(c, currentCommunityId) {

  const isCurrent = c.id === currentCommunityId;

  const logoHtml = c.logo_path
    ? `<img src="${c.logo_path}"
           alt="logo"
           class="mobile-image"
           style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover; background-color: rgb(168, 167, 167); vertical-align: middle; margin-right: 8px;">`
    : `<div class="avatar-fallback mobile-image">
         ${c.name.charAt(0).toUpperCase()}
       </div>`;

  let actionHtml = "";

  if (isCurrent) {
    actionHtml = `
      <span class="span-gapes"
        style="font-size: 14px; color: var(--text-muted); opacity: 0.9;
        font-style: italic; cursor: not-allowed; white-space: nowrap;">
        Your Community
      </span>
    `;
  } else if (c.is_partner) {
    actionHtml = `
      <span class="span-gapes"
        style="color: rgb(23, 226, 23); font-weight: 500; font-size: 12px; cursor: text;">
        Partners
      </span>
    `;
  } else if (c.request_sent) {
    actionHtml = `
      <span class="span-gapes request-sent"
        style="font-size: 14px; color: green; font-style: italic; cursor: not-allowed;">
        Request sent
      </span>
    `;
  } else {
    actionHtml = `
      <span class="span-gapes"
        style="font-size: 14px;"
        data-community-id="${c.id}"
        data-from-community-id="${currentCommunityId}">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="14" height="14"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="currentColor">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
        Send request
      </span>
    `;
  }

  return `
  <div class="partnership-list">
    <div class="partnership-item" style="border-radius: 0 !important;">

      <div class="partnership-left">

        <svg xmlns="http://www.w3.org/2000/svg"
             class="info-svg"
             fill="none"
             stroke="currentColor"
             width="22"
             height="22"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
             viewBox="0 0 24 24"
             data-name="${c.name || ""}"
             data-about="${c.about || ""}"
             data-logo="${c.logo_path ? `${c.logo_path}` : ""}"
             data-twitter="${c.twitter_followers || 0}"
             data-discord="${c.discord_member_count || 0}">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>

        <div class="community-item">
          ${logoHtml}
        </div>

      </div>

      <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;"
           class="container-downer-init">

        <span class="communites-names"
              style="font-size: 15px; font-weight: 600;">
          ${c.name}
        </span>

        <div class="partnership-right">

          <span class="span-gapes mobile">
            ${TwitterXsvg}
            <span class="twitter" style="font-size: 14px;">
              ${c.twitter_username || "—"}
            </span>
          </span>

          <span class="span-gapes mobile">
            ${DiscordSvg}
            <span class="discord" style="font-size: 14px;">
              ${c.discord_guild_name || "—"}
            </span>
            <span class="server-member">
              ${c.discord_member_count || ""}
            </span>
          </span>

          ${actionHtml}

        </div>
      </div>

    </div>
  </div>
  `;
}

function initToggleSubquests() {
  document.querySelectorAll(".toggle-subquests").forEach(button => {
    button.addEventListener("click", function () {
      const moduleHeader = button.closest(".module-header");

      // collect all wrappers after this header until next .module-header
      let wrappers = [];
      let sibling = moduleHeader.nextElementSibling;
      while (sibling && !sibling.classList.contains("module-header")) {
        if (sibling.classList.contains("partnership-list")) {
          wrappers.push(sibling);
        }
        sibling = sibling.nextElementSibling;
      }

      // check if currently expanded
      const expanded = wrappers.some(w => w.classList.contains("expanded"));

      // toggle all
      wrappers.forEach(wrapper => {
        if (expanded) {
          wrapper.classList.remove("expanded");
          wrapper.classList.add("collapsed");
        } else {
          wrapper.classList.remove("collapsed");
          wrapper.classList.add("expanded");
        }
      });

      // update chevron
      button.innerHTML = expanded
        ? `<i class="fas fa-chevron-down"></i>`
        : `<i class="fas fa-chevron-up"></i>`;
    });
  });
}



function initSearchFeature() {
  const searchInput = document.querySelector('input[type="search"]');
  const communityCards = document.querySelectorAll(".partnership-list");
  const noResultsMsg = document.getElementById("no-results-message");

  if (!searchInput) return; // in case the input isn’t on this page

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    let anyVisible = false;

    communityCards.forEach(card => {
      const nameEl = card.querySelector(".communites-names");
      const name = nameEl ? nameEl.textContent.toLowerCase() : "";

      if (name.includes(query)) {
        card.style.display = "";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });
    

    
    // Toggle "No quest found" message
    if (noResultsMsg) {
      noResultsMsg.style.display = anyVisible ? "none" : "block";
    }
  });
}


async function loadPartnerships(slug) {
  const container = document.querySelector(".cardin");
  const skeletons = document.querySelectorAll(".skelpppp");

  const res = await fetch(`/api/${slug}/partnerships`);
  const data = await res.json();

  const { communities, current_community_id } = data;

  if (!communities.length) {
    document.getElementById("no-results-message").style.display = "block";

    skeletons.forEach(el => el.classList.add("hidden-pp"));
    return;
  }

  communities.forEach(c => {
    container.insertAdjacentHTML(
      "beforeend",
      renderCommunity(c, current_community_id)
    );
  });

  initSearchFeature();
  initToggleSubquests();
  LetsGetloadedPartnership();

  // 🔥 hide all skeletons
  skeletons.forEach(el => el.classList.add("hidden-pp"));
}

const openChatToastBtn = document.getElementById("openChatNow");

if (openChatToastBtn) {
  openChatToastBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const firstChatTrigger = document.querySelector(".open-message");

    if (firstChatTrigger) {
      firstChatTrigger.click();
    }

    const toast = document.getElementById("unlock-toast");
    if (toast) toast.remove();

  });
}




window.PartnershipsModule = {
  init() {
    loadPartnerships(communitySlug);
  }
};


})();