function DeclearedSprintSwitch() {

    const wrap = document.querySelector(".switch-between-sprints-wrap");
    if (!wrap) return;

    const root = wrap.querySelector(".switch-between-sprints");
    const pill = root.querySelector(".switch-pill");
    const tabs = root.querySelectorAll(".switch-tab");

    const wrapper = document.querySelector(".main-wrapper");
    if (!wrapper) return;

    tabs.forEach((tab, i) => {

        tab.onclick = () => {

            if (tab.classList.contains("active")) return;

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            pill.style.transform = `translateX(${i * 100}%)`;

            const mode = tab.dataset.mode;

            let path;

            if (mode === "all") {
                path = `/${communitySlug}/leaderboard`;
            } else {
                const sprintId = wrap.dataset.latestSprint;
                if (!sprintId) return;

                path = `/${communitySlug}/leaderboard/${sprintId}`;
            }

            loadMainSettingsSection(path, true, false, true);
        };
    });
}


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
