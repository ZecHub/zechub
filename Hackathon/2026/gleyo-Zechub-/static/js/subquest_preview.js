function updatePQuestPreview(subquest) {
    const titleEl = document.getElementById("preview-title");
    const descEl  = document.getElementById("preview-description");
    const detailsEl = document.getElementById("subquest-details");

    if (!titleEl || !descEl || !detailsEl) return;

    titleEl.textContent = subquest.name || "Your title here";
    descEl.textContent  = subquest.description || "Your description here";

    let detailsHTML = "";

    if (subquest.tasks?.length) {
        detailsHTML += "<h4>Tasks:</h4><ul>";
        subquest.tasks.forEach(t => {
            detailsHTML += `<li>${t.type}: ${t.config.title || ""}</li>`;
        });
        detailsHTML += "</ul>";
    }

    if (subquest.conditions?.length) {
        detailsHTML += "<h4>Conditions:</h4><ul>";
        subquest.conditions.forEach(c => {
            detailsHTML += `<li>${c.condition_type} ${c.operator || ""} ${c.condition_value || ""}</li>`;
        });
        detailsHTML += "</ul>";
    }

    if (subquest.rewards?.length) {
        detailsHTML += "<h4>Rewards:</h4><ul>";
        subquest.rewards.forEach(r => {
            if (r.reward_type === "custom") detailsHTML += `<li>${r.reward_data.text || "Custom reward"}</li>`;
            else if (r.reward_type === "xp") detailsHTML += `<li>XP: ${r.reward_data.amount || 0}</li>`;
            else if (r.reward_type === "role") detailsHTML += `<li>Role: ${r.reward_data.role || ""}</li>`;
            else if (r.reward_type === "token") detailsHTML += `<li>Token: ${r.reward_data.symbol || ""} (${r.reward_data.amount_per_winner || 0})</li>`;
        });
        detailsHTML += "</ul>";
    }

    detailsEl.innerHTML = detailsHTML;
}
