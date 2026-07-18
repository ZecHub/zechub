 (function () {
    const addCoverBtn = document.getElementById('add-cover-btn');
    const fileInput = document.getElementById('cover-input');
    const previewHeader = document.querySelector('.preview-header-mod');
    const coverUrlInput = document.getElementById('cover-url');

 function InintCallerModule() {

    addCoverBtn.addEventListener('click', () => {
      // ✅ Only allow if not locked
      if (addCoverBtn.classList.contains('locked')) {
        return;
      }

      fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const maxSizeMB = 1.5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file) {
        if (file.size > maxSizeBytes) {
          alert(`The image is too large! Please select a file smaller than ${maxSizeMB}MB.`);
          fileInput.value = ''; // Reset the input
          return;
        }

        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const imageUrl = e.target.result;

            // Update preview background
            if (previewHeader) {
              previewHeader.style.background = `url(${imageUrl}) center/cover no-repeat`;
              previewHeader.style.color = '#fff';
            }

            // Save to hidden input for form submission
            if (coverUrlInput) {
              coverUrlInput.value = imageUrl;
            }
          };
          reader.readAsDataURL(file);
        }
      }
    });
  

    document.querySelectorAll('.color-circle').forEach(circle => {
      circle.addEventListener('click', () => {
        const selectedColor = circle.style.backgroundColor;
        document.getElementById('color-selected').value = selectedColor;
      });
    });


  // Optional: You can add logic to update 'cover-url' based on uploaded/selected cover

  const titleInput = document.getElementById('title');
  const descInput = document.getElementById('description');
  const previewTitle = document.getElementById('preview-title');
  const previewDesc = document.getElementById('preview-description');
  const createBtn = document.getElementById('create-module');
  const previewBtn = document.querySelector('.mobile-preview-btn');
  const RighPanll = document.querySelector('.right-panel');
  const container = document.querySelector('.container-part');
  const MAX_WORDS = 70;
  const PreviewSVG = `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14.5" height="14.5" fill="currentColor" aria-hidden="true">
            <g transform="translate(0 1.333) scale(0.0416666)">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"/>
            </g>
          </svg>
  `;
  function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function getTotalWordCount() {
    return countWords(titleInput.value) + countWords(descInput.value);
  }

  function enforceWordLimit(inputField) {
    inputField.addEventListener('keydown', (e) => {
      const totalWords = getTotalWordCount();
      const selectedText = window.getSelection().toString();
      const isDeleting = e.key === "Backspace" || e.key === "Delete";

      if (totalWords >= MAX_WORDS && !isDeleting && !selectedText) {
        e.preventDefault(); // block typing
      }
    });

    inputField.addEventListener('input', () => {
      updatePreview();
    });
  }

  function updatePreview() {
    previewTitle.textContent = titleInput.value || "Your title here";
    previewDesc.textContent = descInput.value || "Your description here";
    updatePreviewHeight();
  }

  enforceWordLimit(titleInput);
  enforceWordLimit(descInput);


  const createBtnCreate = document.querySelector('#create-module.create');
  const createBtnEdit   = document.querySelector('#create-module.edit');
  function getOrionColor() {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue('--orion-color')
      .trim();

    // normalize empty / invalid
    if (!val || val === 'transparent' || val === 'initial' || val === 'unset') {
      return null;
    }

    return val;
  }


/* =========================
   CREATE MODE
========================= */
if (createBtnCreate) {
  createBtnCreate.addEventListener('click', async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const color = getOrionColor();


    const coverInput = document.getElementById("cover-input");
    const coverFile = coverInput?.files?.[0] || null;

    if (!title) {
      showError("Title is required");
      titleInput.focus();
      return;
    }

    try {
      createBtnCreate.disabled = true;
      createBtnCreate.innerText = "Creating...";

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("color", color);
      fd.append("community_slug", communitySlug);

      if (coverFile) {
        fd.append("cover", coverFile);
      }

      const res = await fetch("/api/module/create", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken
        },
        body: fd
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        showError(data.message || "Create failed");
        createBtnCreate.disabled = false;
        createBtnCreate.innerText = "Create";
        return;
      }

      showSuccess(`
        <div style="display:flex;align-items:center;gap:10px;">
          ${SuccessAvgInitColored}
          <span>Module created</span>
        </div>
      `);

      setTimeout(() => {
        const path = `/${communitySlug}/quest/admin`;
        loadMainSettingsSection(path);
      }, 400);


    } catch (err) {
      console.error(err);
      showError("Network error");
      createBtnCreate.disabled = false;
      createBtnCreate.innerText = "Create";
    }
  });
}

function getQuestUUIDFromURL() {
  const path = window.location.pathname.replace(/\/$/, "");
  const parts = path.split("/");
  return parts.pop() || null;
}

const QUEST_UUID = getQuestUUIDFromURL();

/* =========================
   EDIT MODE
========================= */
if (createBtnEdit && QUEST_UUID) {
  createBtnEdit.addEventListener('click', async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const color = getOrionColor();


    const coverInput = document.getElementById("cover-input");
    const coverFile = coverInput?.files?.[0] || null;

    if (!title) {
      showError("Title is required");
      titleInput.focus();
      return;
    }

    try {
      createBtnEdit.disabled = true;
      createBtnEdit.innerText = "Saving...";

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("color", color);
      fd.append("community_slug", communitySlug);

      if (coverFile) {
        fd.append("cover", coverFile);
      }

      const res = await fetch(`/api/module/edit/${QUEST_UUID}`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken
        },
        body: fd
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        showError(data.message || "Save failed");
        createBtnEdit.disabled = false;
        createBtnEdit.innerText = "Save";
        return;
      }

      showSuccess(`
        <div style="display:flex;align-items:center;gap:10px;">
          ${SuccessAvgInitColored}
          <span>Module saved</span>
        </div>
      `);

      setTimeout(() => {
        const path = `/${communitySlug}/quest/admin`;
        loadMainSettingsSection(path);
      }, 400);


    } catch (err) {
      console.error(err);
      showError("Network error");
      createBtnEdit.disabled = false;
      createBtnEdit.innerText = "Save";
    }
  });
}


const closeRightBtn = document.querySelector('.close-rightpp');

previewBtn.addEventListener('click', () => {
  // ONLY OPEN preview
  container.classList.add('preview-mode');
  RighPanll.classList.remove('hidden');

  // button state
  previewBtn.innerHTML = `${PreviewSVG} <span>Preview</span>`;
});


closeRightBtn.addEventListener('click', () => {
  // FORCE CLOSE preview
  container.classList.remove('preview-mode');
  RighPanll.classList.add('hidden');



  // reset preview button UI
  previewBtn.innerHTML = `${PreviewSVG} <span>Preview</span>`;
});


  function updatePreviewHeight() {
    const scrollHeight = previewHeader.scrollHeight;
    const maxHeight = 150;
    // Reference only — can be used for dynamic sizing
  }

document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const createBtn = document.getElementById("create-module");

  // Handle Enter key globally for title + description
  [titleInput, descInput].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent new line in textarea
        createBtn.click(); // trigger save/create button
      }
    });
  });
});

  document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const selectedColor = circle.getAttribute('data-color');
      document.getElementById('color').value = selectedColor;

      // Optionally add visual feedback for selected
      document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
      circle.classList.add('selected');
    });
  });

initOrionColorPicker();  



}

const previewContainer = document.querySelector('.preview-container');


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
  window.InintCallerModule = InintCallerModule;


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

  const isPremiumUntil = document.querySelector(".container-part.badged")

  let isPremium = false
  if(isPremiumUntil) {
    isPremium= true
  } else {
    isPremium=false
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
  
function applyModuleBackground(element, {
  seed,
  color,
  coverUrl
}) {
  if (!element) return;

  console.log("coverUrl:", coverUrl, typeof coverUrl);

  if (
    coverUrl &&
    coverUrl !== "null" &&
    coverUrl !== "undefined"
  ) {
    element.style.background = `
      linear-gradient(
        rgba(0,0,0,0.45),
        rgba(0,0,0,0.45)
      ),
      url('${coverUrl}') center center / cover no-repeat
    `;
    return;
  }

  const safeColor = color || "#ec4899";

  const index = pickGradientIndex(
    seed || safeColor,
    INFOBOX_GRADIENTS.length
  );

  const gradientBuilder = INFOBOX_GRADIENTS[index];

  element.style.background = gradientBuilder(safeColor);
  element.style.boxShadow = "";
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





function bindOrionPickerEvents(picker) {
  let draftColor = null;


  const swatches = picker.querySelectorAll('.orion-swatch');
  const confirmBtn = picker.querySelector('#orion-confirm-btn');
  const preview = picker.querySelector('#orion-preview');
  const hiddenInput = picker.querySelector('#orion-hidden-input');
  const hashtagIcon = picker.querySelector('#orion-hashtag-icon');
  const colorInputField = picker.querySelector('#orion-text-input');
  const eyedropperIcon = picker.querySelector('#orion-eyedropper-icon');

  const previewContainer = document.querySelector('.preview-container');

    function setSprintColor(color) {
      draftColor = color;
      hiddenInput.value = color;
      document.documentElement.style.setProperty('--orion-color', color);

      if (!previewHeader) return;
      const coverUrl = "null"

      applyModuleBackground(previewHeader, {
        seed: previewHeader.dataset.seed || color,
        color: color,
        coverUrl: coverUrl
      });
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


  // ✅ Backend renders true/false


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

 





  function CallmoduleWhenspace() {
    const previewHeader = document.querySelector(".preview-header-mod");
    if (!previewHeader) return;

    const seed = previewHeader.dataset.seed || "";
    const color = previewHeader.dataset.color || "#fdfdfd";
    const coverUrl = previewHeader.dataset.cover || null;

    document.documentElement.style.setProperty('--orion-color', color);

    applyModuleBackground(previewHeader, {
      seed,
      color,
      coverUrl
    });
  }

  CallmoduleWhenspace();
    

  window.MainModule = {
    init: InintCallerModule
  };

})();