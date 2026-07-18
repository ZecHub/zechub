(function () {

let isPaused = false;
let elapsedTime = 0;
let startTime;
let timerInterval;
let isRecording = false;
let mediaStream;
let mediaRecorder;
let chunks = [];
let tooltipTimeout;
let currentRecipientId = null;
let suppressNextContextMenu = false;
let currentCommunityId = null;
let selectedImages = [];
let collapsed = false;
let lastFetchedChat = null;  
let skeletonTimeout = null;
let tooltipBlocked = false;
window.mutualViewers = window.mutualViewers || {};
let currentRightClickedMsg = null;
let lastMessageDate = null; 
let audioCtx, analyser, sourceNode, dataArray, animationId;
let cropper;
let CURRENT_COMMUNITY_ID = communityId;
let ACTIVE_RECIPIENT_COMMUNITY_ID = null;
let contextMenuActive = false;
let communityStatusMap = {};
let blockNextClick = false;
let selectionMode = false;
window.selectedMessages = new Set();
window.currentCommunityId = communityId
const senderId = CURRENT_COMMUNITY_ID;
const recipientId = ACTIVE_RECIPIENT_COMMUNITY_ID;
const textarea = document.getElementById("chatInput");
const replyRow = document.getElementById("replyRow");
const closeReply = document.getElementById("closeReply");
const chatlist = document.querySelector(".chatlist-section");
const MAX_SEL = 5;
const cnts = document.querySelectorAll(".quirk-contact");
const sendButtons = document.querySelectorAll(".send-button");
const allChatLists = document.querySelectorAll(".chatlist-section");
const allMessageContainers = document.querySelectorAll(".message-container-chat");
const tagListElm = document.getElementById("lstTags");
const dropArea = document.querySelector(".chat-container");
const dropImg = document.querySelector(".drop-img");
const addImageBtn = document.querySelector(".add-image-button");
const imagePicker = document.getElementById("imagePicker");
const imageThumbnailContainer = document.querySelector(".image-thumbnail");
const sendButton = document.querySelector(".editor-footer .send-button");
const selArea = document.getElementById("areaSel");
const hdrMain = document.getElementById("hdrMain");
const hdrSearch = document.getElementById("hdrSearch");
const icSearch = document.getElementById("icSearch");
const icBack = document.getElementById("icBack");
const inSearch = document.getElementById("inSearch");
const appMessage = document.querySelector(".app-message");
const flexContainer = document.querySelector(".flex-container-message");
const messageContainer = document.querySelector(".message-container-chat");
const chatFreeArea = document.querySelector(".chat-free-area");
const toggleBtn = document.getElementById("themeToggleBtn");
const linkBackBtn = document.querySelector(".link-back");
const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");
const toggleIcon = document.getElementById("chatlistToggle");
const perepatyChat = document.querySelector(".perepaty-chat");
const landingChat = document.querySelector(".landing-chat");
const tooltip = document.getElementById("globalTooltip");
let selectedMessages = new Set();
let holdTimeout = null;
let allFiles = [];
let FORWARD_MESSAGE_IDS = [];
let isHold = false;
let editingMessageId = null;
const chatContainer = document.getElementById("chatMessages");
const contextMenu = document.getElementById("contextMenu");
const editRow = document.getElementById("editRow");
const replyPreview = document.getElementById("replyPreview");
const editMessageTextDiv = editRow.querySelector(".chat-free-edit-message");
let startX = 0;
let startY = 0;
let isSwiping = false;
const closeEditBtn = document.getElementById("closeEdit");
const navButtons = document.querySelectorAll('.bottom-nav button');
const headerTitle = document.querySelector('.tab-init');
const chatsSection = document.querySelector('.chats');
const requestsSection = document.querySelector('.requests');
const normalHeader = document.getElementById("normalHeader");
const selectionHeader = document.getElementById("selectionHeader");
const cancelSelection = document.getElementById("cancelSelection");
const selectedCount = document.getElementById("selectedCount");
const deletePopup = document.getElementById("deletePopup");
const deleteMeBtn = document.getElementById("deleteMe");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const deleteMediaCheckbox = document.getElementById("deleteMedia");
const deletePopupSender = document.getElementById("deletePopup");
const deletePopupRecipient = document.getElementById("deletePopup_recip");
const tabs = document.querySelector('.tabs_message');
const tabButtons = document.querySelectorAll('.tabs_message button');
const searchInput = document.querySelector('.serch-input');
const noResultsAll = document.querySelector('.no-results-all');
const noResultsUnread = document.querySelector('.no-results-unread');
const noRequests = document.querySelector('.no-request');
const allChatContainer = document.querySelector('.chats.all-chat');
const unreadChatContainer = document.querySelector('.chats.unread');
const allChats = allChatContainer.querySelector('.all-chats');
const unreadChats = unreadChatContainer.querySelector('.unread-chats');
const editBtn = document.getElementById('editBtn');
const cropModal = document.getElementById('cropModal');
const cropImage = document.getElementById('cropImage');
const mainImage = document.getElementById('mainImage');
const deleteBtn = document.querySelector('.right-tools .icon-button');
const editorContainer = document.querySelector('.editor-container');
const captionInput = document.querySelector('.editor-caption');
const isMobile = window.matchMedia("(max-width: 991px)").matches;

const loggedInCommunityId = document.querySelector(".chatlist-section")?.dataset.communityId || null;
const USER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const chatInput = document.getElementById("chat-input");
const closeImageReply = document.getElementById("closeReplyImage");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const recordUI = document.getElementById("recordUI");
const recordTimer = document.getElementById("recordTimer");
const deleteIcon = document.getElementById("deleteIcon");
const waveformBars = document.querySelector(".waveform-bars");
const pausePlayToggle = document.getElementById("pausePlayToggle");
const attachBtn = document.getElementById("attachBtn");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
// const inputWrapper = document.querySelector(".input-wrapper");
window.selectedMessages = new Set();
window.selectionMode = false;
const sendSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  width="22" height="22" fill="currentColor">
                <path d="M22.45,11.6l-19-9L3,2.5A1,1,0,0,0,2,3.5L4.65,12H12a1,1,0,0,1,1,1,1,1,0,0,1-1,1H4.65L2,21.5A1,1,0,0,0,3,22.5l.45-.1,19-9A1,1,0,0,0,22.45,11.6Z"/>
              </svg>`;
const recordSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/></svg>`;
const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>`;
const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
 
const tooltips = {
  record: "Record a voice message",
  send: "Shift+Enter for Newline / Enter to Send",
  play: "Play voice message",
  pause: "Pause voice message"
};






window.textarea = textarea


function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, {type:mime});
}

function toggleRight() {
  chatlist.classList.toggle("move-right");
  const isExpanded = chatlist.classList.contains("move-right");

  if (isExpanded) {
    appMessage.classList.add("message-app");
    flexContainer.classList.add("flex-shifted");
    chatFreeArea?.classList.add("sticky-active");
    chatMessages?.classList.add("messages-shifted");
    linkBackBtn?.classList.add("back-shifted");
    scrollToBottomBtn?.classList.add("scroll-shifted");
    perepatyChat?.classList.add("chat-shifted");
    landingChat?.classList.add("chat-shifted");
  } else {
    appMessage.classList.remove("message-app");
    flexContainer.classList.remove("flex-shifted");
    chatFreeArea?.classList.remove("sticky-active");
    chatMessages?.classList.remove("messages-shifted");
    linkBackBtn?.classList.remove("back-shifted");
    scrollToBottomBtn?.classList.remove("scroll-shifted");
    perepatyChat?.classList.remove("chat-shifted");
    landingChat?.classList.remove("chat-shifted");
  }
}


function closeEditorIfEmpty() {
    const editor = document.querySelector(".editor-container");
    if (selectedImages.length === 0) {
        editor.style.display = "none";
    }
}
function checkSendButton() {
  const caption = chatInput.textContent.trim().length > 0;
  const hasFiles = allFiles.length > 0;
  const sendIcon = sendBtn.querySelector("svg");
 
}

 
function resetTextareaHeight() {
  const wrapper = document.querySelector(".chat-free-wrapper");

  if (!textarea || !wrapper) return;

  textarea.style.height = "auto"; 
  textarea.style.height = textarea.scrollHeight + "px";

  wrapper.style.height = "auto";
  wrapper.style.paddingTop = "10px";
}


function formatTimeSec(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}



async function handleForwardConfirm() {
  if (!FORWARD_MESSAGE_IDS.length) {
    alert("No message selected to forward!");
    return;
  }

  
  const senderCommunityId = document.querySelector(".chatlist-section")?.dataset.communityId;
const selectedRecipients = Array.from(tagListElm.children)
    .map(el => el.dataset.id);  // make sure each tag has data-id


  if (selectedRecipients.length === 0) {
    alert("Please select at least one recipient.");
    return;
  }

  try {
    const res = await fetch("/api/forward_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({
        message_ids: FORWARD_MESSAGE_IDS,
        sender_community_id: senderCommunityId,
        recipient_ids: selectedRecipients
      })
    });
    
    const data = await res.json();
    if (data.status === "success") {
      closeForwardOverlay();
    } else {
      alert(`⚠️ ${data.error || "Something went wrong"}`);
    }
  } catch (err) {
    console.error("Forward error:", err);
    alert("An error occurred while forwarding messages.");
  }
}



// Format "Last seen"
function formatLastSeen(date) {
const now = new Date();
const diffMs = now - date;
const diffSec = Math.floor(diffMs / 1000);
const diffMin = Math.floor(diffSec / 60);
const diffHr = Math.floor(diffMin / 60);
const diffDay = Math.floor(diffHr / 24);

if (diffSec < 60) return "just now";
if (diffMin < 60) return `${diffMin} min ago`;
if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? "s" : ""} ago`;
return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
}

// Update status UI
function updateCommunityStatusUI(community_id) {
const el = document.querySelector(`.status[data-community-id='${community_id}']`);
if (!el) return;

const status = communityStatusMap[community_id];
if (!status) return;

if (status.online) {
    el.textContent = "Online";
    el.classList.add("online");

// ✅ Update ONLY messages sent to that specific community
document.querySelectorAll(`.chat-bubble.sender[data-recipient-id='${community_id}'] svg.single-check`)
.forEach(svg => {
    svg.outerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="22" height="22" fill="none"
        stroke="#888888"
        stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round"
        class="double-check">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
    </svg>
    `;
});


} else {
    el.textContent = `Last seen ${formatLastSeen(new Date(status.last_seen))}`;
    el.classList.remove("online");
}
}

 
function updateDropImgVisibility() {
  if (allFiles.length === 0) {
    dropImg.style.display = "block";
    dropImg.style.opacity = "1";
  } else {
    dropImg.style.opacity = "0";
    setTimeout(() => dropImg.style.display = "none", 200);
  }
}

function showToastMessage(message) {
  let toast = document.getElementById("toast-message");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-message";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  clearTimeout(toast.hideTimeout); // prevent overlap if clicked fast
  toast.hideTimeout = setTimeout(() => {
    toast.style.opacity = "0";
  }, 1500);
}

function closeEditorIfEmpty() {
    if (selectedImages.length === 0) {
        document.querySelector(".editor-container").style.display = "none";
    }
}


function updateThumbnails() {
    imageThumbnailContainer.innerHTML = "";

    const thumbnailsToShow = selectedImages.slice(0, 3);

    thumbnailsToShow.forEach((imgSrc, index) => {
        const thumbWrapper = document.createElement("div");
        thumbWrapper.style.position = "relative";

        const img = document.createElement("img");
        img.src = imgSrc;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "6px";
        img.style.objectFit = "cover";
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            mainImage.src = imgSrc;
        });

        const removeBtn = document.createElement("span");
        removeBtn.innerHTML = "&times;";
        removeBtn.style.position = "absolute";
        removeBtn.style.top = "0px";
        removeBtn.style.right = "0px";
        removeBtn.style.background = "rgba(0,0,0,0.6)";
        removeBtn.style.color = "#fff";
        removeBtn.style.fontSize = "12px";
        removeBtn.style.width = "16px";
        removeBtn.style.height = "16px";
        removeBtn.style.display = "flex";
        removeBtn.style.alignItems = "center";
        removeBtn.style.justifyContent = "center";
        removeBtn.style.borderRadius = "50%";
        removeBtn.style.cursor = "pointer";

        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering main image change
            selectedImages.splice(index, 1);
  fileInput.value = "";
            
            updateThumbnails();
            closeEditorIfEmpty();

            // If main image was removed, set a new main image
            if (mainImage.src === imgSrc) {
                mainImage.src = selectedImages[0] || "https://via.placeholder.com/600";
            }
        });

        thumbWrapper.appendChild(img);
        thumbWrapper.appendChild(removeBtn);

        imageThumbnailContainer.appendChild(thumbWrapper);
    });

    if (selectedImages.length > 3) {
        const extraCount = selectedImages.length - 3;
        const extraDiv = document.createElement("div");
        extraDiv.style.width = "40px";
        extraDiv.style.height = "40px";
        extraDiv.style.borderRadius = "6px";
        extraDiv.style.background = "#ddd";
        extraDiv.style.display = "flex";
        extraDiv.style.alignItems = "center";
        extraDiv.style.justifyContent = "center";
        extraDiv.style.fontSize = "14px";
        extraDiv.style.fontWeight = "bold";
        extraDiv.style.cursor = "pointer";
        extraDiv.innerText = "+" + extraCount;

        extraDiv.addEventListener("click", () => {
            alert("More images: " + selectedImages.length);
        });

        imageThumbnailContainer.appendChild(extraDiv);
    }

    if (selectedImages.length > 0 && !selectedImages.includes(mainImage.src)) {
        mainImage.src = selectedImages[selectedImages.length - 1];
    }
}


function filterQ(q) {
  const low = q.toLowerCase();
  cnts.forEach(c => {
    const nm = c.dataset.name.toLowerCase();
    c.style.display = nm.includes(low) ? "flex" : "none";
  });
}

function updateSel() {
  const has = tagListElm.children.length > 0;
  selArea.style.display = has ? "flex" : "none";
}

function moveToggleToHeader() {
  toggleBtn.classList.add("move-to-header");
}

function moveToggleBack() {
  toggleBtn.classList.remove("move-to-header");
}

setTimeout(moveToggleToHeader, 1000);


function disableScroll() {
  chatContainer.classList.add("no-scroll-active");
}

function enableScroll() {
  chatContainer.classList.remove("no-scroll-active");
}


function clearTempSelectionAndContext() {
  document.querySelectorAll(".selected-temp, .selected").forEach(el => el.classList.remove("selected-temp", "selected"));
  contextMenu.style.display = "none";
  contextMenu.style.top = "0";
  contextMenu.style.left = "0";
  contextMenuActive = false;
  currentRightClickedMsg = null;
  window.lastRightClickedMessageId = null;
  selectionMode = false;
  document.body.classList.remove("selection-active");
  selectionHeader.style.display = "none";
  normalHeader.style.display = "flex";
  enableScroll(chatContainer);
}



function initVoicePlayers() {
  const playButtons = document.querySelectorAll(".play-btn");

  playButtons.forEach((btn) => {
    const voiceMsg = btn.closest(".voice-message");
    const audio = voiceMsg.querySelector("audio");
    const bars = voiceMsg.querySelectorAll(".waveform-bars-rendered .bar");
    const timeSpan = voiceMsg.querySelector(".voice-time"); 

    let rafId;

    const updateWave = () => {
      if (!audio.paused) {
        const progress = audio.currentTime / audio.duration;
        const playedCount = Math.floor(progress * bars.length);

        bars.forEach((bar, i) => {
          bar.classList.toggle("played", i < playedCount);
        });

        // update countdown timer
        const remaining = Math.max(0, audio.duration - audio.currentTime);
        const minutes = Math.floor(remaining / 60);
        const seconds = Math.floor(remaining % 60);
        timeSpan.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        rafId = requestAnimationFrame(updateWave);
      }
    };

    btn.addEventListener("click", () => {
      // Stop all other audio
      document.querySelectorAll("audio").forEach((a) => {
        if (a !== audio) {
          a.pause();
          a.currentTime = 0;
          const otherVoiceMsg = a.closest(".voice-message");
          const otherBtn = otherVoiceMsg.querySelector(".play-btn");
          const otherBars = otherVoiceMsg.querySelectorAll(".bar");
          const otherTime = otherVoiceMsg.querySelector(".voice-time");

          cancelAnimationFrame(rafId);

          otherBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>`;
          otherBars.forEach(b => b.classList.remove("played"));
          // reset timer to full duration
          if (a.duration) {
            const m = Math.floor(a.duration / 60).toString().padStart(2,'0');
            const s = Math.floor(a.duration % 60).toString().padStart(2,'0');
            otherTime.textContent = `${m}:${s}`;
          }
        }
      });

      if (audio.paused) {
        audio.play();
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="22"   viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
          </svg>`;
        updateWave();
      } else {
        audio.pause();
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg"  width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>`;
        cancelAnimationFrame(rafId);
      }

      audio.addEventListener("ended", () => {
        cancelAnimationFrame(rafId);
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>`;
        bars.forEach(b => b.classList.remove("played"));
        // reset timer to full duration
        if (audio.duration) {
            const m = Math.floor(audio.duration / 60).toString().padStart(2,'0');
            const s = Math.round(audio.duration % 60).toString().padStart(2,'0'); // ✅ round instead of floor
            timeSpan.textContent = `${m}:${s}`;

        }
      });
    });
  });
}



function resetForwardOverlay() {
  FORWARD_MESSAGE_IDS = [];
  const overlay = document.querySelector(".quirk-overlay");
  if (!overlay) return;


  const lstTags = document.getElementById("lstTags");
  if (lstTags) lstTags.innerHTML = "";

 const areaSel = document.getElementById("areaSel");
  if (areaSel) areaSel.style.display = "none";

  overlay.querySelectorAll("input, textarea, select").forEach(el => el.value = "");
  overlay.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
  clearTempSelectionAndContext();
}


function showForwardOverlay(messageIds) {
  resetForwardOverlay(); // this clears FORWARD_MESSAGE_IDS + overlay inputs

  // 🔧 add this extra cleanup line:
  document.querySelectorAll(".quirk-contact.selected").forEach(el => el.classList.remove("selected"));

  FORWARD_MESSAGE_IDS = messageIds;

  const overlay = document.querySelector(".quirk-overlay");
  if (!overlay) return;

  const selectionHeader = document.getElementById("selectionHeader");
  const normalHeader = document.getElementById("normalHeader");

  if (selectionHeader) selectionHeader.style.display = "none";
  if (normalHeader) normalHeader.style.display = "flex";

  overlay.style.display = "flex";
  overlay.dataset.forwardIds = JSON.stringify(messageIds); // store for debug if needed
  console.log("🟢 Forward overlay opened for message IDs:", messageIds);
}



function closeForwardOverlay() {
  const overlay = document.querySelector(".quirk-overlay");
  if (!overlay) return;
  selectedMessages.forEach(msg => msg.classList.remove("selected"));
  selectedMessages.clear();
  window.selectedMessages.forEach(msg => {
    msg.classList.remove("selected");
    msg.classList.remove("selected-temp"); // also clear temporary selection highlights
  });

  // 2️⃣ Clear the selectedMessages set
  window.selectedMessages.clear();
  // 2️⃣ Reset selection mode & header
  selectionMode = false;
  document.body.classList.remove("selection-active");
  overlay.style.display = "none";
  delete overlay.dataset.forwardId;
  resetForwardOverlay();

  document.querySelectorAll(".chat-bubble.selected").forEach(el => el.classList.remove("selected"));

  const selectionHeader = document.getElementById("selectionHeader");
  const normalHeader = document.getElementById("normalHeader");

  if (selectionHeader) selectionHeader.style.display = "none";
  if (normalHeader) normalHeader.style.display = "flex";

  console.log("🔴 Forward overlay closed & reset");
}


function initOverlayCloseListener() {
  const overlay = document.querySelector(".quirk-overlay");
  if (!overlay) return;

  overlay.addEventListener("click", (e) => {
    const content = overlay.querySelector(".quirk-modal");
    if (!content.contains(e.target)) {
      closeForwardOverlay();
    }
  });
}

 

function updateContextMenuOptionsForMessage(msg) {
  const menuClasses = [
    "edit-message",
    "copy-message",
    "forward-message",
    "triggerDeletePopup",
    "reply-message",
    "menu-divider",
    "select-header"
  ];

  // Determine if there are any deleted messages currently selected
  const hasDeletedSelected = [...window.selectedMessages].some(m => m.classList.contains("deleted"));

  // Iterate both context menu and selection header
  const containers = [
    document.querySelector("#contextMenu"),
    document.querySelector("#selectionHeader")
  ];

  containers.forEach(container => {
    if (!container) return;

    menuClasses.forEach(cls => {
      const el = container.querySelector(`.${cls}`);
      if (!el) return;

      if (hasDeletedSelected) {
        // Hide everything except delete triggers
        if (cls === "triggerDeletePopup") {
          el.style.display = "flex"; // always show delete
        } else {
          el.style.display = "none";
        }
      } else {
        // Restore default visibility
        el.style.display = "flex";
      }
    });
  });
}

function markMessageDeleted(msg) {
  msg.classList.add("deleted");
  window.deletedMessages.add(msg);
  msg.classList.remove("selected");
  window.selectedMessages.delete(msg);

  updateContextMenuOptionsForMessage(msg);
}
 

function closeDeletePopups() {
  const deletePopup = document.getElementById("deletePopup");
  const deletePopupRecip = document.getElementById("deletePopup_recip");
  if (deletePopup) deletePopup.style.display = "none";
  if (deletePopupRecip) deletePopupRecip.style.display = "none";
}


function selectMessage(msg) {
  const selectedMessages = window.selectedMessages;

  if (selectedMessages.has(msg)) {
    msg.classList.remove("selected");
    selectedMessages.delete(msg);
  } else {
    msg.classList.add("selected");
    selectedMessages.add(msg);
  }

  if (selectedMessages.size > 0) {
    normalHeader.style.display = "none";
    selectionHeader.style.display = "flex";
    selectionMode = true;
    document.body.classList.add("selection-active");
  } else {
    selectionMode = false;
    document.body.classList.remove("selection-active");
    selectionHeader.style.display = "none";
    normalHeader.style.display = "flex";
  }

  const editBtn = document.querySelector(".edit-message");
  if (editBtn) {
    if (selectedMessages.size === 1) {
      const onlyMsg = [...selectedMessages][0];

      // ❌ Hide edit for audio/voice messages
      if (onlyMsg.querySelector(".voice-message")) {
        editBtn.style.display = "none";
      } else {
        const createdAt = onlyMsg.dataset.createdAt;
        if (createdAt) {
          const createdDate = new Date(createdAt.endsWith("Z") ? createdAt : createdAt + "Z");
          const diffMinutes = (Date.now() - createdDate.getTime()) / (1000 * 60);
          editBtn.style.display = diffMinutes <= 10 ? "flex" : "none";
        } else {
          editBtn.style.display = "none";
        }
      }
    } else {
      editBtn.style.display = "none"; // hide if more than 1 selected
    }
  }

  selectedCount.textContent = selectedMessages.size;
}


function closeAllDeletePopups() {
  deletePopupSender.style.display = "none";
  deletePopupRecipient.style.display = "none";
}

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}

function showReplyPreview(text) {
  document.querySelector(".reply-content").textContent = text;
  replyPreview.style.display = "flex";
  // inputWrapper.classList.add("has-reply");
}
function cancelReply() {
  replyPreview.style.display = "none";
  // inputWrapper.classList.remove("has-reply");
}



function handleHoldStart(e) {
  const msg = e.target.closest(".chat-bubble");
  if (!msg) return;

  startX = e.touches ? e.touches[0].clientX : e.clientX;
  startY = e.touches ? e.touches[0].clientY : e.clientY;

  isHold = false;
  holdTimeout = setTimeout(() => {
    isHold = true;
    selectionMode = true;
    document.body.classList.add("selection-active");
    selectMessage(msg);
    if (navigator.vibrate) navigator.vibrate(100);
  }, 1000);
}

function handleHoldMove(e) {
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  const currentY = e.touches ? e.touches[0].clientY : e.clientY;

  const diffX = Math.abs(currentX - startX);
  const diffY = Math.abs(currentY - startY);

  // Cancel long press if user moves finger significantly
  if (diffX > 10 || diffY > 10) {
    clearTimeout(holdTimeout);
  }
}

function handleHoldEnd() {
  clearTimeout(holdTimeout);
}
 

function resetSelectionAndContext() {
  // 1️⃣ Deselect any selected messages
  selectedMessages.forEach(msg => msg.classList.remove("selected"));
  selectedMessages.clear();
  window.selectedMessages.forEach(msg => {
    msg.classList.remove("selected");
    msg.classList.remove("selected-temp"); // also clear temporary highlights
  });

  // 2️⃣ Clear the selectedMessages set
  window.selectedMessages.clear();

  // 2️⃣ Hide selection header, restore normal header
  selectionMode = false;
  document.body.classList.remove("selection-active");
  selectionHeader.style.display = "none";
  normalHeader.style.display = "flex";

  // 3️⃣ Clear right-click context state
  currentRightClickedMsg = null;
  contextMenuActive = false;
  window.lastRightClickedMessageId = null;

  // 4️⃣ Hide context menu (if still open)
  const contextMenu = document.getElementById("contextMenu");
  if (contextMenu){ 
    contextMenu.style.display = "none";
    contextMenu.style.top = "0";
    contextMenu.style.left = "0";
  }
  // 5️⃣ Hide all delete popups
  document.getElementById("deletePopup").style.display = "none";
  document.getElementById("deletePopup_recip").style.display = "none";
}



function initDeleteHandler() {

  const deleteMeBtnSender = document.getElementById("deleteMe");
  const deleteMeBtnRecip = document.getElementById("deleteMe_recip");
  const deleteMediaSender = document.getElementById("deleteMedia");
  const deleteMediaRecip = document.getElementById("deleteMedia_recip");

  console.log("Sender button:", deleteMeBtnSender);
  console.log("Recipient button:", deleteMeBtnRecip);

  // --- Sender delete button ---
  deleteMeBtnSender?.addEventListener("click", async () => {
    console.log("🧨 Sender delete clicked");
    await handleDeleteAction("sender", deleteMediaSender);
  });

  // --- Recipient delete button ---
  deleteMeBtnRecip?.addEventListener("click", async () => {
    console.log("🧨 Recipient delete clicked");
    await handleDeleteAction("recipient", deleteMediaRecip);
  });

async function handleDeleteAction(type, checkbox) {
  console.log("🚀 handleDeleteAction triggered:", type);

  const deleteForEveryone = checkbox?.checked || false;
  console.log("✅ Live checked state:", deleteForEveryone);


  let messageIds = [];
  if (window.selectedMessages.size > 0) {
    messageIds = [...window.selectedMessages].map(
      (msg) => msg.dataset.messageId || msg.id.replace("msg-", "")
    );
  } else if (window.currentRightClickedMsg) {
    messageIds = [
      window.currentRightClickedMsg.dataset.messageId ||
      window.currentRightClickedMsg.id.replace("msg-", "")
    ];
  }

  console.log("🧩 Message IDs to delete (final):", messageIds);

  if (messageIds.length === 0) {
    console.warn("⚠️ No message IDs to delete — aborting.");
    return;
  }


  console.log("🧩 Message IDs to delete:", messageIds);

  try {
    const res = await fetch(`/api/delete_message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      credentials: "include",
      body: JSON.stringify({
        community_id: CURRENT_COMMUNITY_ID,
        message_ids: messageIds,
        delete_for_everyone: deleteForEveryone,
      }),
    });

    console.log("🔸 Response status:", res.status);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    console.log("✅ Delete success:", data);

    // ✅ Loop safely over selected messages
// ✅ Collect all messages to update: selected + right-clicked
let affectedMessages = new Set(window.selectedMessages);

if (window.currentRightClickedMsg) {
  affectedMessages.add(window.currentRightClickedMsg);
}

const toRemove = [];
for (const msg of affectedMessages) {
  const msgId = msg.dataset.messageId || msg.id.replace("msg-", "");
  const wasDeleted = data.deleted_ids?.includes(msgId);

  if (!wasDeleted) continue;

  msg.classList.remove("selected");
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" width="14" height="14"
         stroke-width="1.5" stroke="currentColor"
         class="size-6 deleted-icon">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>`;
  if (deleteForEveryone) {
    // Add icon only for the sender
    const deletedText =
      type === "sender"
        ? `${svgIcon} You deleted this message`
        : "This message was deleted";

    msg.innerHTML = `<div class="deleted-placeholder">${deletedText}</div>`;

    closeDeletePopups();
    markMessageDeleted(msg);
    msg.classList.add("deleted");
    msg.classList.remove("selected");
    window.selectedMessages.delete(msg);
  } else {
    // one-sided delete
    toRemove.push(msg);
    msg.remove();
    window.selectedMessages.delete(msg);
  }
}

// ✅ Remove deleted ones from DOM (if not for everyone)
toRemove.forEach((m) => m.remove());

// ✅ Hide popups and clear selections
document.getElementById("deletePopup").style.display = "none";
document.getElementById("deletePopup_recip").style.display = "none";

window.selectedMessages.clear();
window.currentRightClickedMsg = null; // 🧹 clear for next time
checkbox.checked = false;


    // ✅ Exit selection mode (hide selection header)
    const selectionHeader = document.querySelector(".selection-header");
    const normalHeader = document.querySelector(".normal-header");
    if (selectionHeader && normalHeader) {
      selectionHeader.style.display = "none";
      normalHeader.style.display = "flex";
    }

  } catch (err) {
    console.error("❌ Delete failed:", err);
    closeDeletePopups();
  }
}



}

function truncateLongMessages() {
  const bubbles = document.querySelectorAll(".chat-bubble.sender, .chat-bubble.recipient");
  
  bubbles.forEach(bubble => {
    const textDiv = bubble.querySelector(".caption-text");
    if (!textDiv) return;

    // Remove previous states to allow rebuild
    bubble.classList.remove("truncated", "partial", "expanded");
    bubble.removeAttribute("data-truncated");

    const oldToggle = bubble.querySelector(".read-toggle");
    if (oldToggle) oldToggle.remove();

    // Apply truncation only to long messages
    if (textDiv.textContent.length > 250) {
      bubble.classList.add("truncated");
      bubble.dataset.truncated = "true";

      const toggle = document.createElement("span");
      toggle.classList.add("read-toggle");
      toggle.textContent = "Read more...";

      let stage = 0;

      toggle.addEventListener("click", () => {
        if (stage === 0) {
          bubble.classList.remove("truncated");
          bubble.classList.add("partial");
          toggle.textContent = "Read more...";
          stage = 1;
        } else if (stage === 1) {
          bubble.classList.remove("partial");
          bubble.classList.add("expanded");
          toggle.textContent = "See less";
          stage = 2;
        } else {
          bubble.classList.remove("expanded", "partial");
          bubble.classList.add("truncated");
          toggle.textContent = "Read more...";
          stage = 0;
        }
      });

      textDiv.after(toggle);
    }
  });
}



function triggerReply(msg) {
  const replyRow = document.getElementById("replyRow");
  const replyMessage = replyRow.querySelector(".chat-free-reply-message");

  const thumbnailDiv = replyRow.querySelector(".thumbnail-image");
  const thumbnailImg = thumbnailDiv.querySelector("img");
  const closeTextBtn = replyRow.querySelector("#closeReply");
    const replyUserEl = replyRow.querySelector(".chat-free-reply-user");
  // 🟢 Set the user name dynamically
  if (msg.classList.contains("recipient")) {
    // message came from recipient (community)
    replyUserEl.textContent = document.querySelector(".chat.active .chat-name")?.textContent || "Community";
  } else if (msg.classList.contains("sender")) {
    // message came from you
    replyUserEl.textContent = "You";
  }

  // --- Check for image ---
  const imgEl = msg.querySelector("img");
  const imageSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14" height="14" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  `;

  // --- Check for voice message ---
  const voiceEl = msg.querySelector(".voice-message");
  const voiceSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="14" height="14" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  `;

  if (imgEl) {
    // Image reply
    thumbnailImg.src = imgEl.src;
    thumbnailDiv.style.display = "flex";

    const text = msg.querySelector(".image-caption-text")?.textContent?.trim() 
                 || msg.querySelector(".caption-text")?.textContent?.trim();
    replyMessage.innerHTML = `${imageSVG} ${text ? text : "Photo"}`;

    closeTextBtn.style.display = "none";

  } else if (voiceEl) {
    // Voice reply
    const durationText = voiceEl.querySelector(".voice-time")?.textContent || "00:00";
    replyMessage.innerHTML = `${voiceSVG} Voice message (${durationText})`;

    thumbnailDiv.style.display = "none";
    thumbnailImg.src = "";
    closeTextBtn.style.display = "block";

  } else {
    // Text reply
    thumbnailDiv.style.display = "none";
    thumbnailImg.src = "";
    closeTextBtn.style.display = "block";
    replyMessage.textContent = msg.querySelector(".caption-text")?.textContent || msg.textContent.trim();
  }

// 🟢 Assign reply message ID properly
if (msg.dataset.messageId) {
  chatInput.dataset.replyTo = msg.dataset.messageId; // ← real DB message id
} else if (msg.id) {
  chatInput.dataset.replyTo = msg.id.replace("msg-", ""); // fallback
} else {
  chatInput.removeAttribute("data-reply-to");
}


if (!chatInput.dataset.replyTo && msg.id) {
  chatInput.dataset.replyTo = msg.id.replace("msg-", "");
}


  replyRow.style.display = "flex";

  chatInput.focus();
}






function updateButtonIcon(forceMic = false) {
  if (isRecording) return;

  const hasText = chatInput.textContent.trim().length > 0;
  const hasFiles = allFiles.length > 0;

  if (forceMic) {
    sendBtn.innerHTML = recordSVG;
    sendBtn.dataset.tooltip = tooltips.record;
  } else if (hasText || hasFiles) {
    sendBtn.innerHTML = sendSVG;
    sendBtn.dataset.tooltip = tooltips.send;
  } else {
    sendBtn.innerHTML = recordSVG;
    sendBtn.dataset.tooltip = tooltips.record;
  }
}

async function requestMicrophoneAccess() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("🎤 Microphone access granted");
    // Immediately stop tracks if you don't want to record yet
    stream.getTracks().forEach(track => track.stop());
  } catch (err) {
    console.error("❌ Microphone access denied", err);
  }
}




function formatTimeSec(s) {
  const sec = Math.max(0, Math.floor(s));
  const mins = Math.floor(sec / 60).toString().padStart(2, "0");
  const secs = (sec % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}



function updateLayoutOnResize() {
  const activeChat = document.querySelector(".message-container-chat[style*='display: flex']");

  if (!isMobile) {
    document.body.classList.remove("chat-open");
    document.body.style.overflowY = "auto";

    allChatLists.forEach(list => (list.style.display = "block"));
    allMessageContainers.forEach(msg => {
      msg.style.display = "flex";
      msg.style.width = "100%";
    });
  } else {
    allChatLists.forEach(list => {
      if (!document.body.classList.contains("chat-open")) list.style.display = "block";
    });

    // ✅ Hide others, but keep the open one visible
    allMessageContainers.forEach(msg => {
      if (msg === activeChat) {
        msg.style.display = "flex";
      } else {
        msg.style.display = "none";
      }
    });
  }
}






async function startRecordingUI() {
  isRecording = true;
  recordUI.style.display = "flex";
  sendBtn.innerHTML = sendSVG;
  sendBtn.style.background = "#4285f4";
  chatInput.disabled = true;
  chatInput.placeholder = "Recording...";
  if (currentCommunityId && currentRecipientId) {
    onSocketReady((socket) => {
      socket.emit("start_recording", {
        communityId: currentCommunityId,
        recipientId: currentRecipientId
      });
    });
  }
  recordTimer.textContent = "0:00";
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = elapsedTime + Math.floor((Date.now() - startTime) / 1000);
    recordTimer.textContent = `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, "0")}`;
  }, 1000);

  // 🟢 Immediately show placeholder waveform
  waveformBars.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = "3px";
    bar.style.marginRight = "2px";
    bar.style.height = `${4 + Math.random() * 10}px`; // random initial height
    bar.style.animation = `bounce 1s ease-in-out ${Math.random()}s infinite`;
    waveformBars.appendChild(bar);
  }

  // 🎤 Now start actual recording logic
  startAudioRecording();
}


function stopRecordingUI(send = true) {
  clearInterval(timerInterval);
  isRecording = false;
  recordUI.style.display = "none";
  sendBtn.innerHTML = recordSVG; // back to mic icon
  sendBtn.style.background = "";
  chatInput.disabled = false;
  chatInput.placeholder = "Type your message...";
  if (currentCommunityId && currentRecipientId) {
    onSocketReady((socket) => {
      socket.emit("stop_recording", {
        communityId: currentCommunityId,
        recipientId: currentRecipientId
      });
    });
  }

  elapsedTime = 0;
  isPaused = false;
  pausePlayToggle.innerHTML = pauseSVG;
  animationRunning = false;

  stopAudioRecording(send);

}


async function startAudioRecording() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(mediaStream);
    chunks = [];
    mediaRecorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data);
    mediaRecorder.start();

    // 🎵 Setup analyser for live waveform
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    sourceNode = audioCtx.createMediaStreamSource(mediaStream);
    sourceNode.connect(analyser);
    analyser.fftSize = 128; // small size = more reactive waveform
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // 🎚️ create bars
    waveformBars.innerHTML = "";
    for (let i = 0; i < 30; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.width = "3px";
      bar.style.marginRight = "2px";
      bar.style.background = "#4285f4";
      bar.style.height = "5px";
      waveformBars.appendChild(bar);
    }

    const bars = waveformBars.querySelectorAll(".bar");

    // 🎨 Animate with actual mic data
    function draw() {
      if (!isRecording) return;
      analyser.getByteFrequencyData(dataArray);

      const step = Math.floor(dataArray.length / bars.length);
      for (let i = 0; i < bars.length; i++) {
        const value = dataArray[i * step];
        const percent = value / 255;
        const height = Math.max(2, percent * 50); // scale amplitude
        bars[i].style.height = `${height}px`;
        bars[i].style.opacity = 0.6 + percent * 0.4;
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();
  } catch (err) {
    console.error("Mic access denied:", err);
    stopRecordingUI(false);
  }
}

function stopAudioRecording(send = true) {
  if (!mediaRecorder) return;
  cancelAnimationFrame(animationId);
  if (audioCtx) audioCtx.close();

  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    if (send) createVoiceBubble(URL.createObjectURL(blob), blob);
  };
  mediaRecorder.stop();
  if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
}


function stopAudioRecording(send = true) {
  if (!mediaRecorder) return;
  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    if (!send) return;
    createVoiceBubble(URL.createObjectURL(blob), blob);
  };
  mediaRecorder.stop();
  if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
}

async function createVoiceBubble(audioUrl, blob) {
  const { heights, duration } = await extractWaveformHeights(blob, 40, 18);

  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", "sender");

  // Sending clock (visible immediately)
const sendingSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="sending clock" class="sending-text">
  <circle cx="24" cy="24" r="18" fill="none" stroke="#888888" stroke-width="4"/>
  <path d="M24 14 v12 h6" fill="none" stroke="#888888" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  bubble.innerHTML = `
    <div class="voice-message">
      <button class="play-btn">${playSVG}</button>
      <div class="voice-body">
        <div class="waveform-outer">
          <div class="waveform-bars" id="live-recording-waveform" ></div>
        </div>
        <div class="voice-footer">
          <span class="voice-time">${formatTimeSec(Math.floor(duration))}</span>
          <div class="voice-meta"
          <span class="voice-timestamp">${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
          <span class="voice-checks voice-sending">${sendingSvg}</span>
          </div>
        </div>
      </div>
    </div>
  `;



  // --- Waveform setup ---
  const barsContainer = bubble.querySelector(".waveform-bars");
  barsContainer.innerHTML = "";

  heights.forEach(h => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${h}px`;
    barsContainer.appendChild(bar);
  });

  const btn = bubble.querySelector(".play-btn");
  const audio = new Audio(audioUrl);

  // --- Playback ---
  function updateBars() {
    const progress = audio.currentTime / audio.duration;
    const totalBars = barsContainer.children.length;
    for (let i = 0; i < totalBars; i++) {
      const bar = barsContainer.children[i];
      if (i < progress * totalBars) bar.classList.add("played");
      else bar.classList.remove("played");
    }
  }

  audio.addEventListener("timeupdate", updateBars);
  audio.addEventListener("ended", () => {
    btn.innerHTML = playSVG;
    barsContainer.querySelectorAll(".played").forEach(b => b.classList.remove("played"));
  });

  btn.addEventListener("click", async () => {
    if (audio.paused) {
      await audio.play();
      btn.innerHTML = pauseSVG;
    } else {
      audio.pause();
      btn.innerHTML = playSVG;
    }
  });

  // Append to chat
  chatMessages.append(bubble);

// Scroll to bottom
chatMessages.scrollTo({
  top: chatMessages.scrollHeight, // <-- use scrollHeight, not bottom
  behavior: "smooth"
});


  if (!recipientId) {
    alert("Please select a chat before sending a message.");
    return;
  }

const formData = new FormData();
formData.append("sender_community_id", senderId);
formData.append("recipient_community_id", recipientId);
formData.append("message", ""); // no text for pure voice messages
formData.append("message_type", "audio");
onSocketReady((socket) => {
  formData.append("sender_sid", socket.id);
});

// 🟢 add the actual recorded audio blob
formData.append("recorded_audio", blob, "recording.webm");

// 🟢 Add waveform + duration info
formData.append("audio_durations", JSON.stringify([Math.floor(duration)]));

// optional waveform data (if you want to send visual bars)
formData.append("waveform_heights", JSON.stringify([heights]));


// optional debug of form entries
// for (const [k, v] of formData.entries()) console.log(k, v);
const res = await fetch("/api/send_message", {
  method: "POST",
  headers: {
    "X-CSRFToken": csrfToken   // ✅ ONLY THIS HEADER
  },
  body: formData
});

if (!res.ok) throw new Error(`HTTP ${res.status}`);

const data = await res.json();
const msg = data.message; 
console.log("Message sent successfully:", data);
bubble.dataset.messageId = msg.id;
bubble.dataset.createdAt = msg.created_at;
bubble.dataset.senderId = msg.sender_id;
bubble.dataset.recipientId = msg.recipient_id;

const isRecipientOnline = msg.recipient_online === true;
const isMutualActive = msg.mutual_active === true;
let checkColor;
if (isMutualActive) {
  checkColor = "read"; 
} else {
  checkColor = "unread"; 
}
// ✅ Choose the right check SVG
const checkSVG = isRecipientOnline
  ? `

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
           width="20" height="20" fill="none"
            stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
      </svg>
  `
  : `
    <!-- Single check (recipient offline = sent only) -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke-width="2"
           class="single-check" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5" />
      </svg>
  `;
const checkEl = bubble.querySelector(".voice-checks");
if (checkEl) checkEl.innerHTML = checkSVG;




// now it's safe to clear the reply dataset on the input
if (chatInput.dataset.replyTo) {
  chatInput.removeAttribute("data-reply-to");
}

}

async function extractWaveformHeights(blob, barCount = 40, maxBarHeightPx = 22) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContextClass();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    const samplesPerBar = Math.floor(channelData.length / barCount);
    const rmsValues = new Array(barCount).fill(0);
    let maxRms = 0;
    for (let i = 0; i < barCount; i++) {
      let start = i * samplesPerBar;
      let end = Math.min(start + samplesPerBar, channelData.length);
      let sum = 0;
      for (let j = start; j < end; j++) sum += channelData[j] * channelData[j];
      const rms = Math.sqrt(sum / (end - start));
      rmsValues[i] = rms;
      if (rms > maxRms) maxRms = rms;
    }
    const heights = rmsValues.map(r => Math.max(2, Math.round((r / maxRms) * maxBarHeightPx)));
    audioCtx.close();
    return { heights, duration: audioBuffer.duration };
  } catch {
    return { heights: new Array(barCount).fill(6), duration: 0 };
  }
}



pausePlayToggle.addEventListener("click", () => {
const recordDot = document.querySelector(".record-dot");
if (!isPaused) {
  // --- Pause recording ---
  mediaRecorder.pause();
  clearInterval(timerInterval);
  elapsedTime += Math.floor((Date.now() - startTime) / 1000);
  pausePlayToggle.innerHTML = playSVG;

  mediaStream.getAudioTracks().forEach(track => (track.enabled = false));

const recordingBars = document.querySelectorAll("#live-recording-waveform .bar");
recordingBars.forEach(bar => {
    bar.style.animationPlayState = "paused";
    bar.style.opacity = 0.4;
});


  // 🔴 Stop blinking dot when paused
  recordDot.style.animationPlayState = "paused";
  recordDot.style.opacity = "0.5";

  isPaused = true;
} else {
  // --- Resume recording ---
  mediaStream.getAudioTracks().forEach(track => (track.enabled = true));
  mediaRecorder.resume();
  startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsed = elapsedTime + Math.floor((Date.now() - startTime) / 1000);
    recordTimer.textContent = `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, "0")}`;
  }, 1000);

  pausePlayToggle.innerHTML = pauseSVG;

  document.querySelectorAll(".waveform-bars .bar").forEach(bar => {
    bar.style.animationPlayState = "running";
    bar.style.opacity = "1";
  });

  // 🔴 Resume blinking dot when unpaused
  recordDot.style.animationPlayState = "running";
  recordDot.style.opacity = "1";

  isPaused = false;
}

});


chatInput.addEventListener("keydown", (e) => {

if (isMobile) return; // mobile Enter = newline

if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();

    // ✅ Only send if not editing
    const isEditing = editRow.style.display === "flex" && editingMessageId;
    if (isEditing) {
    sendBtn.click(); // triggers your edit logic
    return;
    }

    handleSend(); 
    chatInput.value = "";
    resetTextareaHeight();
    updateButtonIcon(true);
}
});



function initReplyJump() {
  document.addEventListener("click", (e) => {
    const replyEl = e.target.closest(".chat-free-reply-row.reply-in-bubble, .chat-free-reply-row.reply");
    if (!replyEl) return;

    const targetId = replyEl.dataset.replyTo;
    if (!targetId) return;

    const targetMsg = document.getElementById(targetId);
    if (!targetMsg) return;

    // Smooth scroll to replied message
    targetMsg.scrollIntoView({ behavior: "smooth", block: "center" });

    // Highlight briefly
    targetMsg.classList.add("jump-highlight");
    setTimeout(() => targetMsg.classList.remove("jump-highlight"), 1500);
  });
}



function resetRecordingState() {

  // stop any timers or animations
  clearInterval(timerInterval);
  cancelAnimationFrame(animationId);

  // reset flags
  isRecording = false;
  isPaused = false;
  elapsedTime = 0;
  startTime = null;

  // stop any existing mic stream
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }

  // reset UI elements if present
  const recordUI = document.getElementById("recordUI");

  const sendBtn = document.getElementById("sendBtn");

  if (recordUI) recordUI.style.display = "none";
  if (chatInput) {
    chatInput.disabled = false;
    chatInput.placeholder = "Type a message...";
  }
  if (sendBtn) {
    sendBtn.innerHTML = recordSVG;
    sendBtn.style.background = "";
  }

  console.log("✅ Recording state fully reset");
}




function showSkeletonLoader() {
  const chatMessagesContainer = document.getElementById("chatMessages");
  if (!chatMessagesContainer) return;

  chatMessagesContainer.innerHTML = `
    <div class="skeleton-container">
      ${Array.from({ length: 10 })
        .map(
          (_, i) => `
          <div class="skeleton-message ${i % 2 === 0 ? "sender" : "recipient"}" data-skeleton="${i + 1}">
            <div class="skeleton-bubble" style="width:${40 + Math.random() * 40}%; height:${20 + Math.random() * 10}px;"></div>
          </div>
        `
        )
        .join("")}
    </div>
    <div id="skeletonError" class="skeleton-error-overlay" style="display:none; white-space: no-wrap;">
      Could not load messages
    </div>
  `;
}

function getDateHeader(dateIso) {

  if (!dateIso) return "";

  // Convert Date object → ISO string
  if (dateIso instanceof Date) {
    dateIso = dateIso.toISOString();
  }

  // Ensure it's a string
  dateIso = String(dateIso);

  // Ensure UTC format
  const safeIso = dateIso.endsWith("Z") ? dateIso : dateIso + "Z";

  const msgDate = new Date(safeIso);
  const now = new Date();

  const msgDayStart = new Date(
    msgDate.getFullYear(),
    msgDate.getMonth(),
    msgDate.getDate()
  );

  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const diffDays = Math.floor((todayStart - msgDayStart) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  if (diffDays < 7) {
    return msgDate.toLocaleDateString(undefined, { weekday: "long" });
  }

  return msgDate.toLocaleDateString();
}


function bindGalleryClicks(container) {
  const galleries = container.querySelectorAll(".gallery");
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll("img");
    const imageURLs = Array.from(images).map(img => img.src);

    gallery.addEventListener("click", (e) => {
      const imgEl = e.target.closest("img");
      if (!imgEl) return;
      const index = [...images].indexOf(imgEl);
      showGalleryModal(imageURLs, index);
    });
  });
}


function disableHorizontalSwipe(targets = ['.chat-container', '.message-container-chat']) {
  const containers = document.querySelectorAll(targets.join(','));

  containers.forEach(container => {
    let startX = 0;
    let startY = 0;

    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    }, { passive: true }); // touchstart can be passive

    container.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // Only prevent horizontal swipe if horizontal movement dominates
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault(); // BLOCK horizontal swipe nav
        e.stopPropagation(); // stop bubbling just in case
      }
    }, { passive: false });
  });
}



function formatUserTime(iso) {
  if (!iso) return "";
  // Append Z if no timezone (treat as UTC)
  if (!iso.includes("Z") && !iso.includes("+")) iso += "Z";

  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: USER_TZ,
  });
}




function getImageSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14" height="14"
               viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 
                     5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 
                     0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 
                     1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 
                     1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 
                     1.5 1.5Z" />
          </svg>`;
}

function getVoiceSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" width="14" height="14">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 
                     7.5a6 6 0 0 1-6-6v-1.5m6 
                     7.5v3.75m-3.75 0h7.5M12 
                     15.75a3 3 0 0 1-3-3V4.5a3 
                     3 0 1 1 6 0v8.25a3 3 0 0 1-3 
                     3Z"/>
          </svg>`;
}



onSocketReady((socket) => {
socket.on("forwarded_messages", (messages) => {
  console.log("📦 Forwarded messages batch received:", messages);

  // Ensure messages is always an array
  if (!Array.isArray(messages)) {
    messages = [messages];
  }

  [...messages].reverse().forEach((msg) => {
      const content = msg.content || {}; 

    const currentUserId = parseInt(CURRENT_COMMUNITY_ID);
    
    const isSender = msg.sender_id === currentUserId;

    // ✅ Find all chats related to this message
    const targetChats = document.querySelectorAll(".chat");
    const relevantChats = Array.from(targetChats).filter(chat =>
      [msg.sender_id, msg.recipient_id].includes(parseInt(chat.dataset.recipientId))
    );

    relevantChats.forEach(targetChat => {
      const preview = targetChat.querySelector(".details p");
      const timeEl = targetChat.querySelector(".time-chat");
      const meta = targetChat.querySelector(".chat-meta");

      // 🧩 Build preview text like new_message does
      let newPreview = "";
      if (msg.message_type === "text") {
        newPreview = msg.content?.text?.trim() || "Start chatting";
      } else if (msg.message_type === "audio") {
        const dur = msg.content?.audio_durations?.[0];
        const durationText = dur ? `00:${dur.toString().padStart(2,"0")}` : "";
        newPreview = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="2" stroke="currentColor" class="size-5 inline-block mr-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 
                     7.5a6 6 0 0 1-6-6v-1.5m6 
                     7.5v3.75m-3.75 0h7.5M12 
                     15.75a3 3 0 0 1-3-3V4.5a3 
                     3 0 1 1 6 0v8.25a3 3 0 0 1-3 
                     3Z"/>
          </svg> ${durationText}`;
      } else if (msg.message_type === "image" || msg.message_type === "mixed") {
        const txt = msg.content?.text || msg.content?.caption || "Photo";
        newPreview = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="2" stroke="currentColor" class="size-5 inline-block mr-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 
                     2.25 0 0 1 3.182 0l5.159 
                     5.159m-1.5-1.5 1.409-1.409a2.25 
                     2.25 0 0 1 3.182 0l2.909 
                     2.909m-18 3.75h16.5a1.5 1.5 
                     0 0 0 1.5-1.5V6a1.5 1.5 
                     0 0 0-1.5-1.5H3.75A1.5 
                     1.5 0 0 0 2.25 6v12a1.5 
                     1.5 0 0 0 1.5 1.5Z"/>
          </svg> ${txt}`;
      } else {
        newPreview = "Start chatting";
      }

      preview.innerHTML = newPreview;

      // ⏰ Update time
timeEl.textContent = formatUserTime(msg.created_at);



    const mutualKey = [msg.sender_id, msg.recipient_id].sort().join("-");
    const isMutual = window.mutualViewers?.[mutualKey];

    // 🔹 Debug logs to track mutualViewers changes
    console.log(`🔑 mutualKey: ${mutualKey}`);
    console.log(`👀 isMutual before handling message:`, isMutual);
    console.log(`✉️ Message sender: ${msg.sender_id}, recipient: ${msg.recipient_id}, currentUser: ${currentUserId}`);
    console.log(`🧑‍💻 isSender?`, isSender);

if (!isSender && (isMutual === false || isMutual === undefined)) {
  let badge = targetChat.querySelector(".badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = "1";
    badge.style.display = "inline-block";
    meta.appendChild(badge);
    console.log(`➕ Badge created for ${mutualKey}`);
  } else {
    badge.textContent = String(parseInt(badge.textContent) + 1);
    console.log(`➕ Badge incremented for ${mutualKey}: ${badge.textContent}`);
  }
}

// remove badge if mutual becomes true
if (isMutual === true) {
  const badge = targetChat.querySelector(".badge");
  if (badge) {
    badge.remove();
    console.log(`❌ Badge removed for ${mutualKey} because isMutual=true`);
  }
}




      // 🔄 Move chat to top & animate
      const parent = targetChat.parentNode;
      if (parent.firstChild !== targetChat) parent.prepend(targetChat);

      targetChat.classList.add("updated");
      setTimeout(() => targetChat.classList.remove("updated"), 700);
    });


      
  const bubble = document.createElement("div");
bubble.classList.add("chat-bubble", isSender ? "sender" : "recipient");
  bubble.id = `msg-${msg.id}`;
  bubble.dataset.messageId = msg.id;
  bubble.dataset.createdAt = msg.created_at;









// --- VOICE ---
  if (msg.message_type === "audio" && content.audio?.length > 0) {
    const audioUrl = content.audio[0];
    const duration = content.audio_durations?.[0] || 0;
    const heights =
      Array.isArray(msg.waveform_heights?.[0])
        ? msg.waveform_heights[0]
        : Array.isArray(msg.waveform_heights)
        ? msg.waveform_heights
        : new Array(40).fill(8);

    const voiceDiv = document.createElement("div");
    voiceDiv.classList.add("voice-message");
    voiceDiv.innerHTML = `
      <button class="play-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 3l14 9-14 9V3z" />
        </svg>
      </button>
      <div class="voice-body">
        <div class="waveform-outer"><div class="waveform-bars"></div></div>
        <div class="voice-footer">
          <span class="voice-time">${formatTimeSec(Math.floor(duration))}</span>
          <div class="voice-meta">
            <span class="voice-timestamp">${formatUserTime(msg.created_at)}</span>
            <span class="voice-checks"></span>

          </div>
        </div>
      </div>`;

    const barsContainer = voiceDiv.querySelector(".waveform-bars");
    heights.forEach(h => {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${h}px`;
      barsContainer.appendChild(bar);
    });

    const btn = voiceDiv.querySelector(".play-btn");
    const audio = new Audio(audioUrl);
    const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>`;
    const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>`;

    function updateBars() {
      const progress = audio.currentTime / audio.duration;
      const totalBars = barsContainer.children.length;
      for (let i = 0; i < totalBars; i++) {
        barsContainer.children[i].classList.toggle("played", i < progress * totalBars);
      }
    }

    audio.addEventListener("timeupdate", updateBars);
    audio.addEventListener("ended", () => {
      btn.innerHTML = playSVG;
      barsContainer.querySelectorAll(".played").forEach(b => b.classList.remove("played"));
    });

    btn.addEventListener("click", async () => {
      if (audio.paused) {
        await audio.play();
        btn.innerHTML = pauseSVG;
      } else {
        audio.pause();
        btn.innerHTML = playSVG;
      }
    });
const checkEl = voiceDiv.querySelector(".voice-checks");

  if (isSender) {
    // ✅ Only sender sees checkmark
    const isRecipientOnline = msg.recipient_online === true;
    const isMutualActive = msg.mutual_active === true;
    const checkColor = isMutualActive ? "read" : "unread";

    const checkSVG = isRecipientOnline
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check "${checkColor}"
              width="20" height="20" fill="none"
              stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
          <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
        </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2"
               class="single-check" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5" />
        </svg>`;

    if (checkEl) checkEl.innerHTML = checkSVG;
  } else {
    // ✅ Recipient sees NO check + hide the span entirely
    if (checkEl) checkEl.style.display = "none";
  }


  bubble.appendChild(voiceDiv);
}
  // --- IMAGE ---
  else if (content.images?.length > 0) {
    const gallery = document.createElement("div");
    gallery.classList.add("gallery");
    content.images.forEach(url => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("gallery-item");
      const img = document.createElement("img");
      img.src = url;
      wrapper.appendChild(img);
      imageURLs.push(e.target.result);

      gallery.appendChild(wrapper);
    });
    bubble.appendChild(gallery);

    if (content.caption || content.text) {
      const textDiv = document.createElement("div");
      textDiv.classList.add("caption-text");
      textDiv.textContent = content.caption || content.text;
      bubble.appendChild(textDiv);
    }

// ✅ Add timestamp and checkmark for sender
const timestampContainer = document.createElement("div");
timestampContainer.classList.add("timestamp-container");

const createdAt = new Date(msg.created_at);
const timeString = createdAt.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: USER_TZ,
});

// --- Only sender sees check mark beside time
if (isSender) {
  const isRecipientOnline = msg.recipient_online === true;
  const isMutualActive = msg.mutual_active === true;

  let checkColor = isMutualActive ? "read" : "unread";

  // --- Decide which check icon to show
const checkSVG = isRecipientOnline
  ? `

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
           width="20" height="20" fill="none"
           stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
      </svg>
  `
  : `
    <!-- Single check (recipient offline = sent only) -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke-width="2"
           stroke="#888888" class="single-check" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5" />
      </svg>
  `;

  timestampContainer.innerHTML = `${timeString} ${checkSVG}`;
} else {
  // ✅ Recipient just sees time
  timestampContainer.textContent = timeString;
}

bubble.appendChild(timestampContainer);

  }

  // --- TEXT ---
  else if (content.text) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("caption-text");
    textDiv.textContent = content.text;
    bubble.appendChild(textDiv);

// ✅ Add timestamp and checkmark for sender
const timestampContainer = document.createElement("div");
timestampContainer.classList.add("timestamp-container");

const createdAt = new Date(msg.created_at);
const timeString = createdAt.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: USER_TZ,
});

// --- Only sender sees check mark beside time
if (isSender) {
  const isRecipientOnline = msg.recipient_online === true;
  const isMutualActive = msg.mutual_active === true;

  let checkColor = isMutualActive ? "read" : "unread";

  // --- Decide which check icon to show
  const checkSVG = isRecipientOnline
    ? `

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
            width="20" height="20" fill="none"
            stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
          <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
        </svg>
    `
    : `
      <!-- Single check (recipient offline = sent only) -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="2"
             class="single-check" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    `;

  timestampContainer.innerHTML = `${timeString} ${checkSVG}`;
} else {
  // ✅ Recipient just sees time
  timestampContainer.textContent = timeString;
}



bubble.appendChild(timestampContainer);

    
  }

// ✅ Find correct chat bubble container for this message
const chatBubbleContainer = document.querySelector(
  `.chat-bubble-container[data-community-id-for-bubble="${msg.recipient_id === currentUserId ? msg.sender_id : msg.recipient_id}"]`
);

if (!chatBubbleContainer) {
  console.warn("⚠️ No matching bubble container found for forwarded message:", {
    recipient_id: msg.recipient_id,
    sender_id: msg.sender_id,
    currentUserId,
    expectedSelector: `.chat-bubble-container[data-community-id-for-bubble="${msg.recipient_id === currentUserId ? msg.sender_id : msg.recipient_id}"]`,
  });
  return;
}

const msgDateHeader = getDateHeader(new Date(msg.created_at));

// ✅ Look for an existing parent-date whose child-date matches this date
let parentDateDiv = Array.from(chatBubbleContainer.querySelectorAll(".parent-date")).find(pd => {
  const child = pd.querySelector(".child-date");
  return child && child.textContent === msgDateHeader;
});

// ✅ If none exists, create one
if (!parentDateDiv) {
  parentDateDiv = document.createElement("div");
  parentDateDiv.classList.add("parent-date");
  parentDateDiv.dataset.date = msgDateHeader;

  const childDateDiv = document.createElement("div");
  childDateDiv.classList.add("child-date");
  childDateDiv.textContent = msgDateHeader;

  parentDateDiv.appendChild(childDateDiv);
  chatBubbleContainer.appendChild(parentDateDiv);
}



parentDateDiv.appendChild(bubble);
bindGalleryClicks(bubble);




// 🧩 Debug info before appending
console.log("📦 Found chatBubbleContainer:", chatBubbleContainer);
console.log("💬 Message being appended:", msg);
console.log("🧱 Bubble element:", bubble);

// ✅ Append the bubble
chatBubbleContainer.appendChild(bubble);

console.log("✅ Bubble successfully appended to container.");

// 🔽 Scroll to bottom smoothly
chatBubbleContainer.scrollTo({
  top: chatBubbleContainer.scrollHeight,
  behavior: "smooth"
});
console.log("🌀 Scrolled to bottom after append.");


  });
});
});







function showSkeletonError() {
  const skeletonError = document.getElementById("skeletonError");
  if (skeletonError) skeletonError.style.display = "block";

  const skeletonMessages = document.querySelectorAll(".skeleton-message");

  skeletonMessages.forEach(msg => {
    const index = parseInt(msg.dataset.skeleton, 10);

    if (index > 5) {
      msg.style.display = "none";
    } else {
      const bubble = msg.querySelector(".skeleton-bubble");
      if (bubble) {
        // Add the stop-animation class
        bubble.classList.add("stop-animation");
      }
    }
  });
}


async function handleSend() {
  const caption = chatInput.textContent.trim();

  // --- NEW: separate image caption ---
  const imageCaptionInput = document.querySelector(".editor-caption");
  const imageCaption = imageCaptionInput ? imageCaptionInput.value.trim() : "";

  const hasFiles = allFiles.length > 0;
  const isEmpty = !caption && !hasFiles;
  if (isEmpty) return;

  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", "sender");
// --- Add reply section if exists ---
const replyRow = document.getElementById("replyRow");
if (replyRow.style.display === "flex") {
  const replyRef = document.createElement("div");
  replyRef.classList.add("chat-free-reply-row", "reply-in-bubble");
  replyRef.dataset.replyTo = chatInput.dataset.replyTo || "";

  // Clone structure similar to preview
  const replyLeft = document.createElement("div");
  replyLeft.classList.add("chat-free-reply-left");

  const indicator = document.createElement("div");
  indicator.classList.add("chat-free-reply-indicator");
  const textWrap = document.createElement("div");
  textWrap.classList.add("chat-free-reply-text");

// --- Determine who you're replying to ---
const replyUserEl = replyRow.querySelector(".chat-free-reply-user");
  const replyTargetName = replyUserEl?.textContent?.trim() || "You";

const userEl = document.createElement("h3");
userEl.classList.add("chat-free-reply-user");
userEl.textContent = replyTargetName;


// Apply the text dynamically


const msgEl = document.createElement("div");
msgEl.classList.add("chat-free-reply-message");
msgEl.innerHTML =
  replyRow.querySelector(".chat-free-reply-message").innerHTML || "";


  textWrap.appendChild(userEl);
  textWrap.appendChild(msgEl);
  replyLeft.appendChild(indicator);
  replyLeft.appendChild(textWrap);
  replyRef.appendChild(replyLeft);

  // If there's an image reply
const thumb = replyRow.querySelector(".thumbnail-image img");
bubble.id = "msg-" + Date.now(); // unique per message

// ✅ only clone if src is a real image (data: or blob: or http)
if (
  thumb &&
  thumb.src &&
  (
    thumb.src.startsWith("data:image") ||
    thumb.src.startsWith("blob:") ||
    /\.(jpg|jpeg|png|gif|webp)$/i.test(thumb.src)
  )
) {
  const thumbClone = document.createElement("div");
  thumbClone.classList.add("thumbnail-image");

  const wrapper = document.createElement("div");
  wrapper.classList.add("thumbnail-wrapper");

  const img = document.createElement("img");
  img.src = thumb.src;

  wrapper.appendChild(img);
  thumbClone.appendChild(wrapper);
  replyRef.appendChild(thumbClone);
}

  // Add reply ref at top of bubble
  bubble.appendChild(replyRef);

  // Reset reply state
  replyRow.style.display = "none";
  replyRow.querySelector(".chat-free-reply-message").textContent = "";
  replyRow.querySelector(".thumbnail-image img").src = "";
  replyRow.querySelector(".thumbnail-image").style.display = "none";
}

  // --- Media section ---
  if (hasFiles) {
    const gallery = document.createElement("div");
    gallery.classList.add("gallery");

    const maxShow = 4;
    const visibleFiles = allFiles.slice(0, maxShow);
    const extraCount = allFiles.length - maxShow;
    const imageURLs = [];

    for (let i = 0; i < visibleFiles.length; i++) {
      const file = visibleFiles[i];
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("gallery-item");

          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = `Image ${i + 1}`;
          wrapper.appendChild(img);
          imageURLs.push(e.target.result);


          // Add +N overlay to the 4th image if there are more
          if (i === 3 && extraCount > 0) {
            const overlay = document.createElement("div");
            overlay.classList.add("overlay-count");
            overlay.textContent = `+${extraCount}`;
            wrapper.appendChild(overlay);
          }

          gallery.appendChild(wrapper);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    // Open modal when clicking image or overlay
    gallery.addEventListener("click", (e) => {
      const imgEl = e.target.closest("img");
      if (!imgEl) return;
      const index = [...gallery.querySelectorAll("img")].indexOf(imgEl);
      showGalleryModal(imageURLs, index);
    });

    bubble.appendChild(gallery);

    // --- Add image caption separately ---
    if (imageCaption) {
      const captionDiv = document.createElement("div");
      captionDiv.classList.add("image-caption-text");
      captionDiv.textContent = imageCaption;
      bubble.appendChild(captionDiv);
    }
  }

  // --- Text caption section ---
  if (caption) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("caption-text");
    textDiv.textContent = caption;
    bubble.appendChild(textDiv);
  }

  // --- Timestamp + sending icon ---
// --- Create timestamp container ---
const timestampContainer = document.createElement("div");
timestampContainer.classList.add("timestamp-container");

// --- Get timestamp text ---
const createdAt = new Date(bubble.dataset.createdAt || Date.now());
const timeString = createdAt.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: USER_TZ,
});


// --- Add timestamp text directly to container (no span) ---
timestampContainer.appendChild(document.createTextNode(timeString + " "));

// --- Add sending clock SVG initially ---
const sendingSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" 
  role="img" aria-label="sending clock" class="sending-text">
  <circle cx="24" cy="24" r="18" fill="none" class="sending-stroke"/>
  <path d="M24 14 v12 h6" fill="none" class="sending-stroke" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

timestampContainer.innerHTML += sendingSvg;


// --- Append container to bubble ---
bubble.appendChild(timestampContainer);
const recipientId = ACTIVE_RECIPIENT_COMMUNITY_ID;


const chatBubbleContainer = document.querySelector(
  `.chat-bubble-container[data-community-id-for-bubble="${recipientId}"]`
);

if (!chatBubbleContainer) {
  console.warn("⚠️ No matching bubble container found for recipient:", recipientId);
  return;
}

// ✅ Check if we need to insert a new date header
// ✅ Insert date header if needed
// ✅ Determine date header for this message
const msgDateHeader = getDateHeader(new Date()); // e.g., "Today", "Yesterday", or "25 Oct 2025"

// ✅ Look for an existing parent-date whose child-date matches today
let parentDateDiv = Array.from(chatBubbleContainer.querySelectorAll(".parent-date")).find(pd => {
  const child = pd.querySelector(".child-date");
  return child && child.textContent === msgDateHeader;
});

// ✅ If none exists, create it
if (!parentDateDiv) {
  parentDateDiv = document.createElement("div");
  parentDateDiv.classList.add("parent-date");
  parentDateDiv.dataset.date = msgDateHeader;

  const childDateDiv = document.createElement("div");
  childDateDiv.classList.add("child-date");
  childDateDiv.textContent = msgDateHeader;

  parentDateDiv.appendChild(childDateDiv);
  chatBubbleContainer.appendChild(parentDateDiv);
}

// ✅ Append bubble inside the correct parent-date
parentDateDiv.appendChild(bubble);


  chatBubbleContainer.append(bubble);
// Scroll to bottom
chatMessages.scrollTo({
  top: chatMessages.scrollHeight, // <-- use scrollHeight, not bottom
  behavior: "smooth"
});
 truncateLongMessages(); 

 

if (!recipientId) {
  alert("Please select a chat before sending a message.");
  return;
}

const payload = {
  sender_community_id: senderId,
  recipient_community_id: recipientId,
  message: caption || imageCaption,
  message_type: hasFiles ? "image" : "text"
};

console.log("Payload:", payload);


// (optional) just for debugging
console.log("Sender ID:", senderId, "Recipient ID:", recipientId);
// Notify server this user is viewing this chat



try {
  const formData = new FormData();
  formData.append("sender_community_id", senderId);
  formData.append("recipient_community_id", recipientId);
  formData.append("message", caption || imageCaption);
  formData.append("message_type", hasFiles ? "image" : "text");
  onSocketReady((socket) => {
    formData.append("sender_sid", socket.id);
  });
  
if (chatInput.dataset.replyTo) {
  formData.append("reply_to", chatInput.dataset.replyTo);
}

  // Attach uploaded files
  for (const file of allFiles) {
    formData.append("files", file);
  }


  
  const res = await fetch("/api/send_message", {
    method: "POST",
  headers: {
    "X-CSRFToken": csrfToken   // ✅ ONLY THIS HEADER
  },
    body: formData
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
const msg = data.message; // shorthand

bubble.id = `msg-${msg.id}`;
bubble.dataset.messageId = msg.id;
bubble.dataset.createdAt = msg.created_at;
bubble.dataset.senderId = msg.sender_id;
bubble.dataset.recipientId = msg.recipient_id;


const isRecipientOnline = msg.recipient_online === true; // ensure boolean
const isMutualActive = msg.mutual_active === true; // 👈 new

// ✅ Choose check color depending on seen / mutual activity
let checkColor;
if (isMutualActive) {
  checkColor = "read"; 
} else {
  checkColor = "unread";
}


// ✅ Choose the right check SVG
const checkSVG = isRecipientOnline
  ? `
    <!-- Double check (recipient online = delivered) -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
         width="20" height="20" fill="none"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
    </svg>
  `
  : `
    <!-- Single check (recipient offline = sent only) -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="size-5 single-check" 
         viewBox="0 0 24 24" stroke="#888888"
         width="20" height="20">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  `;

timestampContainer.innerHTML = `${timeString} ${checkSVG}`;


  const serverImages = data.message.content.images;
  console.log("Message sent successfully:", data);

} catch (err) {
  console.error("Message send failed:", err);
}
  resetTextareaHeight()

  resetInputs(); 



 
}

function showGalleryModal(imageURLs, startIndex = 0) {
  let currentIndex = startIndex;

  const sidePanel = document.getElementById("on-the-sider") || document.body;

  // 🔹 Remove any existing modal
  const existingModal = sidePanel.querySelector(".modal");
  if (existingModal) existingModal.remove();

  // Modal structure
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-viewer">
      <span class="close-modal">&times;</span>

      <div class="play-container left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 128">
          <path d="M48 46 L48 82 L28 64 Z" fill="#ffffff"/>
          <path d="M48 46 L48 82 L28 64 Z"
            fill="none"
            stroke="#ffffff"
            stroke-width="10"
            stroke-linejoin="round"
            stroke-linecap="round"/>
        </svg>
      </div>

      <img class="modal-image" src="">

      <div class="play-container right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 128">
          <path d="M30 46 L30 82 L50 64 Z" fill="#ffffff"/>
          <path d="M30 46 L30 82 L50 65 Z"
            fill="none"
            stroke="#ffffff"
            stroke-width="10"
            stroke-linejoin="round"
            stroke-linecap="round"/>
        </svg>
      </div>

      <div class="counter"></div>
    </div>

    <div class="swipe-hint">
      <span>⬅️ Swipe left or right to view more ➡️</span>
    </div>
  `;

  // 🔹 Append inside the side panel instead of body
  sidePanel.appendChild(modal);

  // Elements
  const imgEl = modal.querySelector(".modal-image");
  const counterEl = modal.querySelector(".counter");
  const leftBtn = modal.querySelector(".play-container.left");
  const rightBtn = modal.querySelector(".play-container.right");

  function showImage() {
    imgEl.src = imageURLs[currentIndex];
    counterEl.textContent = `${currentIndex + 1} / ${imageURLs.length}`;
  }

  showImage();

  // Navigation
  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imageURLs.length) % imageURLs.length;
    showImage();
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imageURLs.length;
    showImage();
  });

  // Close
  modal.querySelector(".close-modal").addEventListener("click", () => modal.remove());

  // Keyboard navigation
  const handleKey = (e) => {
    if (!document.body.contains(modal)) {
      document.removeEventListener("keydown", handleKey);
      return;
    }

    if (e.key === "ArrowLeft") leftBtn.click();
    if (e.key === "ArrowRight") rightBtn.click();
    if (e.key === "Escape") modal.remove();
  };

  document.addEventListener("keydown", handleKey);

  // Swipe support
  let startX = 0;

  imgEl.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  imgEl.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? leftBtn.click() : rightBtn.click();
    }
  });
}

function showImage() {
  const file = allFiles[currentIndex];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    imgEl.src = e.target.result;
    imgEl.onload = () => {
      const imgRatio = imgEl.naturalWidth / imgEl.naturalHeight;
      const viewerRatio = window.innerWidth / window.innerHeight;

      // --- Constrain proportionally ---
      if (imgEl.naturalWidth > window.innerWidth * 0.9 || imgEl.naturalHeight > window.innerHeight * 0.9) {
        // Large images: shrink to fit window
        imgEl.style.maxWidth = "90vw";
        imgEl.style.maxHeight = "90vh";
      } else {
        // Smaller images: center naturally but don’t shrink further
        imgEl.style.maxWidth = imgEl.naturalWidth + "px";
        imgEl.style.maxHeight = imgEl.naturalHeight + "px";
      }

      // --- Maintain aspect ratio visually ---
      imgEl.style.objectFit = "contain";
    };

    counterEl.textContent = `${currentIndex + 1} / ${allFiles.length}`;
  };
  
  reader.readAsDataURL(file);
}



function resetInputs() {
chatInput.value = "";
chatInput.placeholder = "Type your message...";
chatInput.disabled = false;
chatInput.removeAttribute("data-reply-to");

allFiles = [];
selectedImages = [];
fileInput.value = "";

// Hide editor cleanly
const editor = document.querySelector(".editor-container");
if (editor) editor.style.display = "none";

// previewContainer.innerHTML = "";
// previewContainer.classList.remove("active");
// inputWrapper.classList.remove("has-preview");

sendBtn.disabled = false;
sendBtn.style.opacity = "1";
sendBtn.style.pointerEvents = "auto";
updateButtonIcon(true);
resetTextareaHeight();
checkSendButton();
updateButtonIcon();
}


function updateChatHoverStates() {
  document.querySelectorAll(".chat").forEach(chat => {
    const parentSection = chat.closest(".chatlist-section");
    const communityId = parentSection.dataset.communityId;
    const recipientId = chat.dataset.recipientId;

    // Only add hover if this chat is NOT active
    if (communityId === currentCommunityId && recipientId === currentRecipientId) {
      chat.classList.remove("hoverable");
    } else {
      chat.classList.add("hoverable");
    }
  });
}


function updateChatHoverIniter() {
 
    document.querySelectorAll(".chatlist-section").forEach(section => {
    section.addEventListener("click", async (e) => {
        const chat = e.target.closest(".chat");
        if (!chat) return;
    const parentSection = chat.closest(".chatlist-section");
    const communityId = parentSection.dataset.communityId;
    const recipientId = chat.dataset.recipientId;
    const chatKey = `${communityId}-${recipientId}`;
    const messageContainer = document.querySelector(`.message-container-chat[data-community-id="${communityId}"]`);

    currentCommunityId = communityId;
    currentRecipientId = recipientId;

    updateChatHoverStates();

    // Update header
    const headerImage = messageContainer.querySelector(".profile-image");
    const headerName = messageContainer.querySelector(".username");
    if (headerImage) {
    const logoUrl = chat.dataset.logo;
    const fallbackLetter = chat.dataset.fallback || "?";
    const textColor = chat.getAttribute("text-color") || "#000"; 
    const bgColor = chat.dataset.bg || "#ccc"; 

    const fallbackSpan = messageContainer.querySelector(".profile-fallback");

    // Reset state
    fallbackSpan.textContent = "";
    fallbackSpan.style.backgroundColor = "transparent"; 
    fallbackSpan.style.color = textColor;
    headerImage.style.display = "none";

    if (logoUrl) {
        // Try to show image
        headerImage.src = logoUrl;

        headerImage.onload = () => {
        // Image loaded → show it, hide fallback
        headerImage.style.display = "block";
        fallbackSpan.textContent = "";
        fallbackSpan.style.backgroundColor = "transparent";
        fallbackSpan.style.color = textColor;
        };

        headerImage.onerror = () => {
        // Image failed → show fallback letter + color
        headerImage.style.display = "none";
        fallbackSpan.textContent = fallbackLetter;
        fallbackSpan.style.backgroundColor = bgColor;
        };
    } else {
        // No logo at all → show fallback letter + color
        fallbackSpan.textContent = fallbackLetter;
        fallbackSpan.style.backgroundColor = bgColor;
        fallbackSpan.style.color = textColor;
    }
    }


    

    if (headerName) headerName.textContent = chat.dataset.name || "Unknown";

    // Show/hide status divs
    messageContainer.querySelectorAll(".status").forEach(statusDiv => {
        statusDiv.style.display = statusDiv.dataset.recipientId === recipientId ? "block" : "none";
    });


    // Show proper chat content
    const landingChat = messageContainer.querySelector(".landing-chat");
    const perepatyChat = messageContainer.querySelector(".perepaty-chat");
    if (landingChat) landingChat.style.display = "none";
    if (perepatyChat) perepatyChat.style.display = "block";

    // Show skeleton immediately
    if (lastFetchedChat !== chatKey) {
        skeletonTimeout = setTimeout(() => showSkeletonLoader(), 900);
    }

    const currentChatBadge = chat.querySelector(".badge");
    if (currentChatBadge) {
    currentChatBadge.textContent = "0";
    currentChatBadge.style.display = "none";
    }

    // Remove badge from matching chat in Unread tab
    const matchingUnreadChat = document.querySelector(`.unread-chats .chat[data-recipient-id="${recipientId}"]`);
    if (matchingUnreadChat) {
    const unreadBadge = matchingUnreadChat.querySelector(".badge");
    if (unreadBadge) unreadBadge.remove();

    // Optionally hide this chat from Unread list
    matchingUnreadChat.style.display = "none";
    }

    // ✅ Update the unread tab count
    const unreadTab = [...tabButtons].find(b => b.textContent.includes("Unread"));
    if (unreadTab) {
    const remainingUnread = document.querySelectorAll(
        ".unread-chats .chat:not([style*='display: none'])"
    ).length;

    unreadTab.textContent = remainingUnread > 0 ? `Unread ${remainingUnread}` : "Unread";
    }


    // Mobile UI change
    if (isMobile) {
        setTimeout(() => {
        parentSection.style.display = "none";
        messageContainer.style.display = "flex";
        messageContainer.style.width = "100%";
        document.body.classList.add("chat-open");
        document.body.style.overflowY = "hidden";
        }, 170);
    } else {
        messageContainer.style.display = "flex";
        messageContainer.style.width = "100%";
        linkBackBtn.style.display="none"

    }

    // --- Fetch chat messages ---
    try {
        const response = await fetch(`/chat_partial/${communityId}/${recipientId}`);
        if (skeletonTimeout) clearTimeout(skeletonTimeout);
        if (!response.ok) throw new Error(`Failed to fetch messages: ${response.status}`);

        const data = await response.json();
        const messages = data.messages;
        
        const chatMessagesContainer = document.getElementById("chatMessages");

        // Build HTML dynamically
    lastMessageDate = null;

    const chatHtml = messages
    .map(msg => buildMessageHtml(msg, communityId))
    .join("");

        chatMessagesContainer.innerHTML = `<div class="chat-bubble-container" data-community-id-for-bubble="${recipientId}">${chatHtml}</div>`;

        disableHorizontalSwipe();

        // Reset input / record UI
        const recordUI = document.getElementById("recordUI");
        const replyRow = document.getElementById("replyRow");
        const editRow = document.getElementById("editRow");
        const chatFreeBottomRow = document.querySelector(".chat-free-bottom-row");

        setTimeout(() => {

        if (chatInput) {
            chatInput.setAttribute("readonly", "readonly");
            setTimeout(() => chatInput.removeAttribute("readonly"), 50);
        }
        }, 400);

        if (recordUI) recordUI.style.display = "none";
        if (replyRow) replyRow.style.display = "none";
        if (editRow) editRow.style.display = "none";
        if (chatFreeBottomRow) chatFreeBottomRow.style.display = "flex";


        if (chatInput) {
        chatInput.value = "";
        chatInput.placeholder = "Type a message...";
        chatInput.disabled = false;
        }

        bindGalleryClicks(chatMessagesContainer);
        if (typeof initVoicePlayers === "function") initVoicePlayers();
        initReplyJump();
        resetRecordingState();
        initDeleteHandler();
        updateChatHoverStates();
        truncateLongMessages();

        chatMessagesContainer.querySelectorAll(".message").forEach(msg => {
        updateContextMenuOptionsForMessage(msg);
        });
        setTimeout(() => {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 0);

        // Extra safety: also scroll after images/audio fully load
        setTimeout(() => {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 94);

        onSocketReady((socket) => {
          socket.emit("active_chat", { 
          communityId: window.currentCommunityId,
          recipientId: recipientId
          });
        });

        lastFetchedChat = chatKey;

    } catch (err) {
        if (skeletonTimeout) clearTimeout(skeletonTimeout);
        console.error(err);
        showSkeletonError();
    }
    });

    /* --- Helper function to build message HTML dynamically --- */
    function buildMessageHtml(msg, communityId) {

    const isSender = msg.is_sender;
    const classes = ["chat-bubble"];
    classes.push(isSender ? "sender" : "recipient");
    if (msg.is_deleted) classes.push("deleted");

    const msgDateStr = new Date(msg.created_at).toDateString();
    let dateHeaderHtml = "";

    // If date changes, show date header BEFORE bubble
    if (lastMessageDate !== msgDateStr) {
        lastMessageDate = msgDateStr;
        dateHeaderHtml = `
        <div class="parent-date">
            <div class="child-date">${getDateHeader(msg.created_at)}</div>
        </div>
        `;
    }

    if (msg.is_deleted) {
        return `
        <div class="${classes.join(" ")}" id="msg-${msg.id}" 
            data-created-at="${msg.created_at}" data-message-id="${msg.id}" 
            data-sender-id="${msg.sender_id}" data-recipient-id="${msg.recipient_id}">
            <div class="deleted-placeholder">
            ${msg.is_sender ? deletedSvg() + "You deleted this message" : deletedSvg() + "This message was deleted"}
            </div>
        </div>`;
    }

    let replyHtml = "";
    if (msg.reply_message) {
        const reply = msg.reply_message;
        const replyName = reply.sender_id === currentCommunityId ? "You" : (reply.sender_name || "Unknown");
        let replyContent = "";
        if (reply.text) replyContent = `<span class="reply-text">${truncateText(reply.text, 80)}</span>`;
        else if (reply.images?.length) replyContent = `<span class="reply-text">Photo</span>`;
        else if (reply.audio?.length) replyContent = `<span class="reply-text">Voice message</span>`;
        else replyContent = `<span class="reply-text">(no message)</span>`;

        let replyImgHtml = "";
        if (reply.images?.length) {
        replyImgHtml = `<div class="thumbnail-image"><div class="thumbnail-wrapper"><img src="${reply.images[0]}" alt="reply image"></div></div>`;
        }

        replyHtml = `
        <div class="chat-free-reply-row reply-in-bubble" data-reply-to="${reply.id}">
            <div class="chat-free-reply-left">
            <div class="chat-free-reply-indicator"></div>
            <div class="chat-free-reply-text">
                <h3 class="chat-free-reply-user">${replyName}</h3>
                <div class="chat-free-reply-message">
                ${replyContent}
                </div>
            </div>
            </div>
            ${replyImgHtml}
        </div>`;
    }

    // Images
    let imagesHtml = "";
    if (msg.images?.length) {
        imagesHtml = `<div class="gallery">${msg.images.map(img => `<div class="gallery-item"><img src="${img}" alt="message image"></div>`).join("")}</div>`;
    }

    // Audio
    let audioHtml = "";
    if (msg.audio?.length) {
        audioHtml = msg.audio.map((url, idx) => {
        const duration = msg.audio_durations?.[idx] || 0;
        const waveform = msg.waveform_heights?.[idx] || Array(40).fill(6);
        return `
        <div class="voice-message">
            <button class="play-btn" data-audio="${url}">${playSvg()}</button>
            <div class="voice-body">
            <audio src="${url}" preload="metadata"></audio>
            <div class="waveform-outer">
                <div class="waveform-bars-rendered">
                ${waveform.map(h => `<div class="bar" style="height:${h}px"></div>`).join("")}
                </div>
            </div>
            <div class="voice-footer">
                <span class="voice-time">${formatDuration(duration)}</span>
                <div class="voice-meta">
                <span class="voice-timestamp">${formatTime(msg.created_at)}</span>
                <span class="voice-checks">
                    ${isSender ? generateCheckSvg(msg.is_read, msg.recipient_online) : ""}
                </span>
                </div>
            </div>
            </div>
        </div>`;
        }).join("");
    }

    // Text
    let textHtml = msg.text ? `<div class="caption-text">${msg.text}</div>` : "";

    // Timestamp (for non-audio)
    let timestampHtml = "";
    if (!msg.audio?.length) {
        timestampHtml = `<div class="timestamp-container">
    ${msg.edited_at ? "Edited " : ""}${formatTime(msg.created_at)}
    ${isSender ? generateCheckSvg(msg.is_read, msg.recipient_online) : ""}
    </div>`;
    }

    return `
    ${dateHeaderHtml}
    <div class="${classes.join(" ")}" 
        id="msg-${msg.id}" 
        data-created-at="${msg.created_at}" 
        data-message-id="${msg.id}" 
        data-sender-id="${msg.sender_id}" 
        data-recipient-id="${msg.recipient_id}">
        ${replyHtml}
        ${imagesHtml}
        ${audioHtml}
        ${textHtml}
        ${timestampHtml}
    </div>
    `;
    }
    /* --- Small helper functions --- */
    function truncateText(text, maxLen) {
    return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
    }

    function formatTime(iso) {
    if (!iso) return "";
    // Ensure timezone offset exists (treat as UTC if missing)
    if (!iso.includes("Z") && !iso.includes("+")) {
        iso += "Z"; // mark as UTC
    }

    const d = new Date(iso);
    return d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: USER_TZ,
    });
    }


    function formatDuration(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2,'0');
    const s = String(seconds % 60).padStart(2,'0');
    return `${m}:${s}`;
    }

    function deletedSvg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="14" height="14" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>`;
    }

    function playSvg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>`;
    }

    function generateCheckSvg(isRead, recipientOnline) {
    if (recipientOnline) {
        const stateClass = isRead ? "read" : "unread";
        return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${stateClass}""
            width="20" height="20" fill="none" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
        </svg>
            
        `;
    } else {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="single-check" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        `;
    }
    }

    });


    navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (btn.textContent.includes('Chats')) {
        headerTitle.textContent = 'Chat';
        chatsSection.style.display = 'block';
        requestsSection.style.display = 'none';
        tabs.style.display = 'flex';
        } else if (btn.textContent.includes('Requests')) {
        headerTitle.textContent = 'Requests';
        chatsSection.style.display = 'none';
        requestsSection.style.display = 'block';
        tabs.style.display = 'none';
        }
    });
    });

    tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tab.classList.add('active');

        if (tab.textContent.includes('All')) {
        // Show All chats, hide Unread
        allChatContainer.style.display = 'block';
        unreadChatContainer.style.display = 'none';
        } else if (tab.textContent.includes('Unread')) {
        // Show Unread chats, hide All
        allChatContainer.style.display = 'none';
        unreadChatContainer.style.display = 'block';
        }
    });
    });



    searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    let activeSection, noResults;

    if (chatsSection.style.display !== "none") {
        // Chats tab
        if (allChatContainer.style.display !== "none") {
        activeSection = allChats;
        noResults = noResultsAll;
        } else {
        activeSection = unreadChats;
        noResults = noResultsUnread;
        }
    } else if (requestsSection.style.display !== "none") {
        // Requests tab
        activeSection = requestsSection;
        noResults = noRequests;
    }

    const chats = activeSection.querySelectorAll('.chat');
    let anyVisible = false;

    chats.forEach(chat => {
        const nameElem = chat.querySelector('.details h3');
        if (nameElem) {
        const name = nameElem.textContent.toLowerCase();
        if (name.includes(query)) {
            chat.style.display = "flex";
            anyVisible = true;
        } else {
            chat.style.display = "none";
        }
        }
    });

    noResults.style.display = anyVisible ? "none" : "block";
    });
    


    editBtn.addEventListener('click', () => {
    cropImage.src = mainImage.src;
    cropModal.style.display = 'flex';
    setTimeout(() => {
        cropper = new Cropper(cropImage, {
        viewMode: 1,
        background: false,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        autoCropArea: 1,
        dragMode: 'crop',
        aspectRatio: NaN,
        guides: true,
        cropBoxMovable: true,
        cropBoxResizable: true
        });
    }, 100);
    });

    document.querySelector('.crop-cancel').addEventListener('click', () => {
    cropModal.style.display = 'none';
    cropper.destroy();
    });
    document.querySelector('.crop-save').addEventListener('click', () => {
    const croppedCanvas = cropper.getCroppedCanvas();
    const croppedData = croppedCanvas.toDataURL('image/png');

    // Update main image
    mainImage.src = croppedData;

    // Replace in selectedImages array
    const index = selectedImages.findIndex(img => img === cropImage.src);
    if (index !== -1) {
        selectedImages[index] = croppedData;
    } else {
        selectedImages[selectedImages.length - 1] = croppedData;
    }

    // Replace in allFiles array
    const fileIndex = allFiles.findIndex(file => {
        return file.name === "image.png" || file.name === cropImage.src;
    });
    if (fileIndex !== -1) {
        allFiles[fileIndex] = dataURLtoFile(croppedData, "image.png");
    } else {
        allFiles[0] = dataURLtoFile(croppedData, "image.png");
    }

    updateThumbnails();

    cropModal.style.display = 'none';
    cropper.destroy();
    });




    deleteBtn.addEventListener('click', () => {
    // Clear all images
    selectedImages = [];

    // Reset main image
    mainImage.src = "https://via.placeholder.com/600";

    // Clear thumbnails
    imageThumbnailContainer.innerHTML = "";

    // Clear caption
    captionInput.value = "";

    // Hide editor container
    editorContainer.style.display = "none";
    });


    document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".chat-free-wrapper");


    if (wrapper && textarea) {
        wrapper.addEventListener("click", (e) => {
        // Avoid re-focusing when clicking buttons, SVGs, etc.
        const isInteractive = e.target.closest("button, svg, input, textarea");
        if (!isInteractive) {
            textarea.focus();
        }
        });
    }
    });

    
    document.addEventListener("click", (e) => {
    const backBtn = e.target.closest(".link-back");
    if (!backBtn) return;

    const flexContainer = document.querySelector(".flex-container-message");
    const chatListSection = document.querySelector(".chatlist-section");
    const messageContainer = document.querySelector(".message-container-chat");

    // Always show chatlist when back button is clicked (for mobile)
    chatListSection.style.display = "block";

    // For desktop — restore flex layout if collapsed
    if (window.innerWidth >= 768) {
        flexContainer.classList.remove("collapsed"); // In case you use a collapse class
        chatListSection.style.display = "flex";
        messageContainer.style.display = "flex";
    } else {
        // For mobile — show chatlist, hide message view
        chatListSection.style.display = "block";
        messageContainer.style.display = "none";
    }
    });



    function isLaptop() {
    return !("ontouchstart" in window);
    }
chatContainer.addEventListener("contextmenu", (e) => {
    if (suppressNextContextMenu) {
        suppressNextContextMenu = false;
        return;
    }

    if (!isLaptop()) return;

    const bubble = e.target.closest(".chat-bubble");
    if (!bubble) return;

    e.preventDefault();

    window.currentRightClickedMsg = bubble;

    const msgId = bubble.dataset.messageId || bubble.id?.replace("msg-", "");
    window.lastRightClickedMessageId = msgId;

    const createdAt = bubble.dataset.createdAt;
    const editOption = document.querySelector("#contextMenu .edit-message");

    const isSender = bubble.classList.contains("sender");
    const isRecipient = bubble.classList.contains("recipient");

    if (!editOption) {
        console.warn("⚠️ No .edit-message element found");
    }

    // ⏰ Edit time check
    if (createdAt) {
        const utcString = createdAt.endsWith("Z") ? createdAt : createdAt + "Z";
        const createdDate = new Date(utcString);
        const diffMinutes = (Date.now() - createdDate.getTime()) / (1000 * 60);

        if (editOption) {
            editOption.style.display = diffMinutes > 10 ? "none" : "flex";
        }
    }

    currentRightClickedMsg = bubble;
    selectedMessages.add(bubble);

    if (selectionMode) return;

    contextMenuActive = true;

    document.querySelectorAll(".selected-temp").forEach(el =>
        el.classList.remove("selected-temp")
    );

    bubble.classList.add("selected-temp");

    /* ---------------- SMART POSITIONING ---------------- */

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const padding = 8;

    // Show invisibly to measure
    contextMenu.style.visibility = "hidden";
    contextMenu.style.display = "block";

    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let posX = mouseX;
    let posY = mouseY;

    // If overflowing right → move left
    if (mouseX + menuWidth + padding > viewportWidth) {
        posX = mouseX - menuWidth;
    }

    // If overflowing bottom → move up
    if (mouseY + menuHeight + padding > viewportHeight) {
        posY = mouseY - menuHeight;
    }

    // Clamp to viewport
    posX = Math.max(padding, Math.min(posX, viewportWidth - menuWidth - padding));
    posY = Math.max(padding, Math.min(posY, viewportHeight - menuHeight - padding));

    contextMenu.style.left = posX + "px";
    contextMenu.style.top = posY + "px";

    contextMenu.style.visibility = "visible";

    /* ---------------------------------------------------- */

    disableScroll();

    window.addEventListener("click", (e) => {
        if (blockNextClick) {
            blockNextClick = false;
            return;
        }

        if (!e.target.closest("#contextMenu")) {
            hideContextMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") hideContextMenu();
    });
});


  function hideContextMenu() {
      contextMenu.style.display = "none";
      contextMenu.style.top = "0";
      contextMenu.style.left = "0";
      enableScroll();
  }

    // ======= Edit message =======


    contextMenu.addEventListener("click", async (e) => {
    if (e.target.closest(".edit-message")) {
        const bubble = currentRightClickedMsg;
        if (!bubble) return;

        editingMessageId = bubble.dataset.messageId || bubble.id.replace("msg-", "");
        const messageText = bubble.querySelector(".caption-text")?.textContent || "";

        // Show edit row
        editMessageTextDiv.textContent = messageText;
        editRow.style.display = "flex";

        // Put message in chat input
        chatInput.value = messageText;
        resetTextareaHeight();
        
        chatInput.focus();

        contextMenu.style.display = "none";
        contextMenu.style.top = "0";
        contextMenu.style.left = "0";
    }
    });

    closeEditBtn.addEventListener("click", () => {
    editRow.style.display = "none";
    chatInput.value = "";
    editingMessageId = null;

    // 🟢 If any message is selected (from edit mode), unselect it
    const selected = document.querySelector(".chat-bubble.selected");
    if (selected) {
        selected.classList.remove("selected");
    }

    selectionMode = false;
    document.body.classList.remove("selection-active");
    selectionHeader.style.display = "none";
    normalHeader.style.display = "flex";
    });

    document.querySelector(".selection-header .edit-message").addEventListener("click", () => {
    const selected = document.querySelector(".chat-bubble.selected");
    if (!selected) return;

    editingMessageId = selected.dataset.messageId || selected.id.replace("msg-", "");
    const messageText = selected.querySelector(".caption-text")?.textContent || "";

    const selHeader = document.getElementById("selectionHeader");
    const normalHeader = document.getElementById("normalHeader");

    selHeader.style.opacity = "0";
    selHeader.style.transition = "opacity 0.15s ease";
    setTimeout(() => {
        selHeader.style.display = "none";
        normalHeader.style.display = "flex";
        normalHeader.style.opacity = "1";

        editMessageTextDiv.textContent = messageText;
        editRow.style.display = "flex";
        chatInput.value = messageText;
        resetTextareaHeight();
        chatInput.focus();
    }, 120); 
    });

    



    sendBtn.addEventListener("click", async (e) => {
    e.stopPropagation();

    const text = chatInput.textContent.trim();
    const hasText = text.length > 0;
    console.log(text)
    const hasFiles = allFiles.length > 0;

    // 🔹 Edit mode
    if ((editRow.style.display === "flex" && editingMessageId) || chatInput.dataset.editingId) {
        const idToEdit = editingMessageId || chatInput.dataset.editingId;
        sendBtn.disabled = true;

        try {
        const res = await fetch(`/edit_message/${idToEdit}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({ text })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Edit failed");

        // Update bubble
        const bubble = document.querySelector(`[data-message-id='${idToEdit}']`);
        if (bubble) {
            bubble.querySelector(".caption-text").textContent = data.new_text;
            bubble.classList.remove("truncated", "partial", "expanded");
            bubble.removeAttribute("data-truncated");

            const oldToggle = bubble.querySelector(".read-toggle");
            if (oldToggle) oldToggle.remove();
            truncateLongMessages();

            const timestampContainer = bubble.querySelector(".timestamp-container");
            if (timestampContainer) {
                // ✅ Check if it already contains "Edited" text anywhere
                if (!timestampContainer.textContent.includes("Edited")) {
                    const editedTag = document.createElement("span");
                    editedTag.classList.add("edited-tag");
                    editedTag.textContent = " Edited";
                    timestampContainer.prepend(editedTag);
                }
            } else {
                // fallback: append to bubble if timestamp missing
                const editedTag = document.createElement("span");
                editedTag.classList.add("edited-tag");
                editedTag.textContent = " Edited";
                bubble.appendChild(editedTag);
            }
        }

        // Reset edit state
        editRow.style.display = "none";
        chatInput.value = "";
        editingMessageId = null;
        chatInput.removeAttribute("data-editing-id");

        } catch (err) {
        console.error("Edit failed:", err);
        alert(err.message);
        } finally {
        sendBtn.disabled = false;
        }resetTextareaHeight()

        resetInputs();
        
        return; // ✅ prevent sending new message
    }

    // 🔹 Send new message
    if (hasText || hasFiles) {
        handleSend();

        setTimeout(() => {
        chatInput.value = "";
        allFiles = [];
        resetTextareaHeight();
        checkSendButton();
        updateButtonIcon();
        }, 100);

        return;
    }


    


    // 🔹 Recording toggle
    if (!isRecording) {
    await requestMicrophoneAccess(); 
        startRecordingUI();
    } else {
        stopRecordingUI(true);
    }
    });



    window.addEventListener("click", (e) => {
    enableScroll()
    if (blockNextClick) {
        console.log("⛔ blockNextClick active → skipping this click");
        blockNextClick = false;
        return;
    }

    if (!e.target.closest("#contextMenu")) {
        console.log("🎯 Global click → closing context menu");
        document.querySelectorAll(".selected-temp").forEach(el => el.classList.remove("selected-temp"));
        contextMenu.style.display = "none";
        contextMenu.style.top = "0";
        contextMenu.style.left = "0";
        contextMenuActive = false;
    }
    });

    cancelSelection.addEventListener("click", () => {
    // 1️⃣ Deselect all selected messages
    selectedMessages.forEach(msg => msg.classList.remove("selected"));
    selectedMessages.clear();
    window.selectedMessages.forEach(msg => {
        msg.classList.remove("selected");
        msg.classList.remove("selected-temp"); // also clear temporary selection highlights
    });

    // 2️⃣ Clear the selectedMessages set
    window.selectedMessages.clear();
    // 2️⃣ Reset selection mode & header
    selectionMode = false;
    document.body.classList.remove("selection-active");
    selectionHeader.style.display = "none";
    normalHeader.style.display = "flex";

    // 3️⃣ Clear reply state if any
    chatInput.removeAttribute("data-reply-to");
    const replyRow = document.getElementById("replyRow");
    if (replyRow) {
        replyRow.style.display = "none";
        const thumbnailDiv = replyRow.querySelector(".thumbnail-image");
        if (thumbnailDiv) {
        thumbnailDiv.style.display = "none";
        thumbnailDiv.querySelector("img").src = "";
        }
        replyRow.querySelector(".chat-free-reply-message").textContent = "";
    }

    // 4️⃣ Reset right-click context
    currentRightClickedMsg = null;
    contextMenuActive = false;
    window.lastRightClickedMessageId = null;

    const contextMenu = document.getElementById("contextMenu");
    if (contextMenu) { 
      contextMenu.style.display = "none";
      contextMenu.style.top = "0";
      contextMenu.style.left = "0";
    }
    // 5️⃣ Hide delete popups if any
    document.getElementById("deletePopup").style.display = "none";
    document.getElementById("deletePopup_recip").style.display = "none";

    // ✅ Optional: clear any temporary selections
    document.querySelectorAll(".selected-temp").forEach(el => el.classList.remove("selected-temp"));

    // 6️⃣ Reset edit mode if active
    if (editRow.style.display === "flex") {
        editRow.style.display = "none";
        editingMessageId = null;
        chatInput.value = "";
    }
    });



    contextMenu.addEventListener("click", (e) => {
    const bubble = currentRightClickedMsg;
    if (!bubble) return;

    // Copy
    if (e.target.closest(".copy-message")) {
        const text = bubble.querySelector(".caption-text")?.textContent ||
                    bubble.querySelector(".image-caption-text")?.textContent || "";
        navigator.clipboard.writeText(text).catch(console.error);
        bubble.classList.remove("selected-temp");
        contextMenu.style.display = "none";
        contextMenu.style.top = "0";
        contextMenu.style.left = "0";
    }

    // Delete
    else if (e.target.closest(".triggerDeletePopup")) {
    // Just open delete popup, no selection header changes
    bubble.classList.remove("selected-temp");
    selectedMessages.clear();
    selectedMessages.add(bubble);

    // 🟢 Do NOT activate selection header here
    deletePopup.style.display = "flex";
    contextMenu.style.display = "none";
      contextMenu.style.top = "0";
      contextMenu.style.left = "0";
    // Optional: visually highlight bubble temporarily
    bubble.classList.add("selected");
    setTimeout(() => bubble.classList.remove("selected"), 400);
    }


    else if (e.target.closest(".select-header")) {
        bubble.classList.remove("selected-temp");
        
        selectionMode = true; 
        document.body.classList.add("selection-active");
        selectMessage(bubble);  
        contextMenu.style.display = "none";
        contextMenu.style.top = "0";
        contextMenu.style.left = "0";
        blockNextClick = true; 
    }

    // ✅ REPLY BUTTON
    else if (e.target.closest(".reply-message")) {
        // Trigger the reply logic same as swipe
        triggerReply(bubble);
        bubble.classList.remove("selected-temp");
        contextMenu.style.display = "none";
        contextMenu.style.top = "0";
        contextMenu.style.left = "0";
    }
    });




    sendBtn.addEventListener("mouseenter", () => {
    tooltipTimeout = setTimeout(() => {
        sendBtn.classList.add("tooltip-visible");
    }, 1500); 
    });

    sendBtn.addEventListener("mouseleave", () => {
    clearTimeout(tooltipTimeout);
    sendBtn.classList.remove("tooltip-visible");
    });


    chatMessages.addEventListener("touchstart", (e) => {
    if (selectionMode) return; 
    const msg = e.target.closest(".chat-bubble");
    if (!msg) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    isSwiping = false;
    msg.style.transition = "none";
    });

    chatMessages.addEventListener("touchmove", (e) => {
    if (selectionMode) return;
    const msg = e.target.closest(".chat-bubble");
    if (!msg) return;

    const diffX = e.touches[0].clientX - startX;
    const diffY = e.touches[0].clientY - startY;

    // Ignore mostly vertical movements
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (diffX > 10) {
        isSwiping = true;
        msg.style.transform = `translateX(${Math.min(diffX, 100)}px)`;
    }
    });

    chatMessages.addEventListener("touchend", (e) => {
    if (selectionMode) return; 
    const msg = e.target.closest(".chat-bubble");
    if (!msg) return;

    msg.style.transition = "transform 0.2s ease";
    msg.style.transform = "translateX(0)";

    const diffX = e.changedTouches[0].clientX - startX;
    const elapsed = Date.now() - startTime;

    // Trigger reply if swipe is long enough or fast enough
    const isQuickSwipe = elapsed < 200 && diffX > 30;
    const isLongSwipe = diffX > 60;

    if (isSwiping && (isQuickSwipe || isLongSwipe)) {
        triggerReply(msg);
        if (window.navigator.vibrate) navigator.vibrate(25); // optional haptic feedback
    }

    isSwiping = false;
    });




    closeImageReply.addEventListener("click", () => {
    const replyRow = document.getElementById("replyRow");
    const thumbnailDiv = replyRow.querySelector(".thumbnail-image");

    const closeTextBtn = replyRow.querySelector("#closeReply");

    // Hide thumbnail
    thumbnailDiv.style.display = "none";
    thumbnailDiv.querySelector("img").src = "";

    // Show text-close button again (for next text reply)
    closeTextBtn.style.display = "block";

    // Hide entire reply row
    replyRow.style.display = "none";

    // Clear reply-to reference
    chatInput.removeAttribute("data-reply-to");
    });

    
    chatMessages.addEventListener("click", (e) => {
    if (!selectionMode) return;
    const msg = e.target.closest(".chat-bubble");
    if (!msg) return;
    selectMessage(msg);
    });

    chatMessages.addEventListener("mousedown", handleHoldStart);
    chatMessages.addEventListener("mouseup", handleHoldEnd);
    chatMessages.addEventListener("touchstart", handleHoldStart);
    chatMessages.addEventListener("touchend", handleHoldEnd);

    document.querySelectorAll(".triggerDeletePopup").forEach(btn => {
    btn.addEventListener("click", () => {
        if (window.selectedMessages.size === 0) return;

        const deletePopup = document.getElementById("deletePopup");
        const deletePopupRecip = document.getElementById("deletePopup_recip");
        if (deletePopup) deletePopup.style.display = "none";
        if (deletePopupRecip) deletePopupRecip.style.display = "none";

        let hasSender = false;
        let hasRecipient = false;
        let hasDeleted = false;

        window.selectedMessages.forEach(msg => {
        if (msg.classList.contains("sender")) hasSender = true;
        if (msg.classList.contains("recipient")) hasRecipient = true;
        if (msg.classList.contains("deleted")) hasDeleted = true;
        });

        if (hasDeleted || (hasSender && hasRecipient) || hasRecipient) {
        if (deletePopupRecip) deletePopupRecip.style.display = "flex";
        } else if (hasSender) {
        if (deletePopup) deletePopup.style.display = "flex";
        }
    });
    });


    document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".triggerDeletePopup");
    if (!deleteBtn) return;

    // Find which bubble is currently selected
    const activeMsg = document.querySelector(".chat-bubble.selected");
    if (!activeMsg) return;

    // Hide both modals first
    document.getElementById("deletePopup").style.display = "none";
    document.getElementById("deletePopup_recip").style.display = "none";

    // Show recipient modal if message is marked as deleted
    if (activeMsg.classList.contains("deleted")) {
        document.getElementById("deletePopup_recip").style.display = "flex";
        return;
    }

    // Otherwise, check if the selected message belongs to sender or recipient
    if (activeMsg.classList.contains("sender")) {
        document.getElementById("deletePopup").style.display = "flex"; // sender modal
    } else if (activeMsg.classList.contains("recipient")) {
        document.getElementById("deletePopup_recip").style.display = "flex"; // recipient modal
    }
    });


    // Cancel delete for both popups
    document.getElementById("cancelDelete")?.addEventListener("click", closeAllDeletePopups);
    document.getElementById("cancelDelete_recip")?.addEventListener("click", closeAllDeletePopups);
    document.getElementById("cancelDelete")?.addEventListener("click", resetSelectionAndContext);
    document.getElementById("cancelDelete_recip")?.addEventListener("click", resetSelectionAndContext);
    document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resetSelectionAndContext();
    });
    chatMessages.addEventListener("touchmove", handleHoldMove);
    chatMessages.addEventListener("mousemove", handleHoldMove);

 
 
    chatInput.addEventListener("input", () => {
    chatInput.style.height = "auto";
    chatInput.style.height = chatInput.scrollHeight + "px";
    });

    document.addEventListener("click", e => {
    const parentDate = e.target.closest(".parent-date");
    if (!parentDate) return;

    const chatMessagesContainer = document.getElementById("chatMessages");
    if (!chatMessagesContainer) return;

    // Find the next chat bubble element after this parent-date
    const nextMsg = parentDate.nextElementSibling;
    if (!nextMsg || !nextMsg.classList.contains("chat-bubble")) return;

    // Smooth scroll so that message appears at top
    chatMessagesContainer.scrollTo({
        top: nextMsg.offsetTop - 65, // add a little padding offset
        behavior: "smooth"
    });

    // Optional: subtle flash to highlight that section briefly
    nextMsg.classList.add("highlight-date");
    setTimeout(() => nextMsg.classList.remove("highlight-date"), 1000);
    });






 


    deleteIcon.addEventListener("click", () => stopRecordingUI(false));

    chatInput.addEventListener("input", () => {
    resetTextareaHeight();
    updateButtonIcon();
    checkSendButton();
    });
    closeReply.addEventListener("click", () => {
    replyRow.style.display = "none";
    });



    const tooltip = document.getElementById("globalTooltip");
    const toggleIcon = document.getElementById("chatlistToggle");

    const showTooltip = (e) => {
        if (tooltipBlocked) return;

        tooltip.textContent = collapsed ? "Expand chat" : "Collapse chat";

        tooltip.style.visibility = "hidden";
        tooltip.classList.add("show");

        const rect = e.currentTarget.getBoundingClientRect();
        const tooltipX = rect.left + (rect.width - tooltip.offsetWidth) / 2;

        tooltip.style.left = `${tooltipX + 30}px`;
        tooltip.style.top = `${rect.bottom + 6}px`;

        tooltip.style.visibility = "visible";
    };


    const hideTooltip = () => {
    tooltip.classList.remove("show");
    };

    if(toggleIcon){
      toggleIcon.addEventListener("mouseenter", showTooltip);
      toggleIcon.addEventListener("mouseleave", hideTooltip);    
      toggleIcon.addEventListener("click", () => {
      collapsed = !collapsed;
      });  
    }




  disableHorizontalSwipe();


    document.querySelector(".chatlist-section").addEventListener("click", (e) => {
    const chat = e.target.closest(".chat");
    if (!chat) return;

    ACTIVE_RECIPIENT_COMMUNITY_ID = chat.dataset.recipientId;
    console.log("Selected recipient:", ACTIVE_RECIPIENT_COMMUNITY_ID);

    document.querySelectorAll(".chat").forEach(c => c.classList.remove("active"));
    chat.classList.add("active");

    });


 
  const scrollBtn = document.getElementById("scrollToBottomBtn");
  const replyRow = document.getElementById("replyRow");
  const editRow = document.getElementById("editRow");


  const SHOW_THRESHOLD = 200;    
  const HIDE_NEAR_BOTTOM = 100;     

  function adjustScrollBtn() {
    const replyVisible = replyRow && getComputedStyle(replyRow).display !== "none" && getComputedStyle(replyRow).opacity !== "0";
    const editVisible = editRow && getComputedStyle(editRow).display !== "none" && getComputedStyle(editRow).opacity !== "0";

    if (replyVisible || editVisible) {
      scrollBtn.style.bottom = "170px";
      console.log("⬆ scrollBtn moved UP (reply/edit visible)");
    } else {
      scrollBtn.style.bottom = "90px";
      console.log("⬇ scrollBtn moved DOWN (reply/edit hidden)");
    }
  }

  // Watch for style changes
  const observer = new MutationObserver(() => adjustScrollBtn());
  if (replyRow) observer.observe(replyRow, { attributes: true, attributeFilter: ["style", "class"] });
  if (editRow) observer.observe(editRow, { attributes: true, attributeFilter: ["style", "class"] });

  // Scroll handler for column layout
  function handleScroll() {
    const distanceFromBottom = chatMessages.scrollHeight - chatMessages.clientHeight - chatMessages.scrollTop;

    if (distanceFromBottom > SHOW_THRESHOLD) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.pointerEvents = "auto";
    } else if (distanceFromBottom < HIDE_NEAR_BOTTOM) {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.pointerEvents = "none";
    }

    // Optional: trigger "fetch older messages" if scrolled near top
    if (chatMessages.scrollTop < 50) {
      // fetchOlderMessages(); // call your function to prepend older messages
      console.log("🔼 Near top - fetch older messages");
    }
  }

  // Scroll-to-bottom button behavior
  scrollBtn.addEventListener("click", () => {
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: "auto", // jump instantly to bottom
    });
  });

  chatMessages.addEventListener("scroll", handleScroll);

  // Initial state: scroll to bottom immediately
  chatMessages.scrollTop = chatMessages.scrollHeight;

  adjustScrollBtn();
  handleScroll();

  const chatMessagesContainer = document.getElementById("chatMessages");
  if (!chatMessagesContainer) return;

  function handleStickyHeaders() {
    const headers = chatMessagesContainer.querySelectorAll(".parent-date");
    headers.forEach((header, index) => {
      const nextHeader = headers[index + 1];
      if (!nextHeader) return;

      
      const rect = header.getBoundingClientRect();
      const nextRect = nextHeader.getBoundingClientRect();

      // If this header's bottom overlaps next header's top, hide it
      if (rect.bottom > nextRect.top) {
        header.style.visibility = "hidden";
      } else {
        header.style.visibility = "visible";
      }
    });

  }



  chatMessagesContainer.addEventListener("scroll", handleStickyHeaders);
  const observerMutual = new MutationObserver(handleStickyHeaders);
  observerMutual.observe(chatMessagesContainer, { childList: true, subtree: true });

  // Initial call
  handleStickyHeaders();
 






  updateLayoutOnResize();
  window.addEventListener("resize", updateLayoutOnResize);


  let typingTimeout;

  const TYPING_DELAY = 1000;


  function setActiveChat(communityId, recipientId) {
    currentCommunityId = communityId;
    currentRecipientId = recipientId;
    console.log("💬 Active chat set:", { currentCommunityId, currentRecipientId });
  }


  // Bind input event dynamically
  if (chatInput) {
    chatInput.addEventListener("input", () => {
      if (!currentRecipientId || !currentCommunityId) return;

      console.log("📝 Typing...", currentCommunityId, currentRecipientId);
      onSocketReady((socket) => {

        socket.emit("typing", {
          communityId: currentCommunityId,
          recipientId: currentRecipientId
        });
      });


      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        console.log("⏹️ Stop typing", currentCommunityId, currentRecipientId);
        onSocketReady((socket) => {
          socket.emit("stop_typing", {
            communityId: currentCommunityId,
            recipientId: currentRecipientId
          });
        });
      }, TYPING_DELAY);
    });
  }

  
  unreadChats.addEventListener("click", (e) => {
    const chat = e.target.closest(".chat");
    if (!chat) return;

    const recipientId = chat.dataset.recipientId;
    if (!recipientId) return;

    // Hide this unread chat
    chat.style.display = "none";

    // Remove badge from the same chat in "All" list
    const matchingChatInAll = allChats.querySelector(`.chat[data-recipient-id="${recipientId}"]`);
    if (matchingChatInAll) {
      const badge = matchingChatInAll.querySelector(".badge");
      if (badge) badge.remove();
    }

    // Remove badge from unread list too (just in case)
    const badgeUnread = chat.querySelector(".badge");
    if (badgeUnread) badgeUnread.remove();

    // ✅ Switch tab UI to "All"
    tabButtons.forEach(b => b.classList.remove("active"));
    const allTab = [...tabButtons].find(b => b.textContent.includes("All"));
    if (allTab) allTab.classList.add("active");

    // ✅ Properly show All chats section, hide Unread section
    const allChatContainer = document.querySelector('.chats.all-chat');
    const unreadChatContainer = document.querySelector('.chats.unread');

    if (allChatContainer && unreadChatContainer) {
      allChatContainer.style.display = "block";
      unreadChatContainer.style.display = "none";
    }

    // ✅ Update unread tab counter
    const unreadTab = [...tabButtons].find(b => b.textContent.includes("Unread"));
    if (unreadTab) {
      const remainingUnread = unreadChats.querySelectorAll(".chat:not([style*='display: none'])").length;
      unreadTab.textContent = remainingUnread > 0 ? `Unread ${remainingUnread}` : `Unread`;
    }
  });
















  document.querySelectorAll(".link-back").forEach(backBtn => {
    backBtn.addEventListener("click", () => {
      const parentContainer = backBtn.closest(".message-container-chat");
      const communityId = parentContainer.dataset.communityId;
      const relatedList = document.querySelector(`.chatlist-section[data-community-id="${communityId}"]`);

      if (isMobile) {
        relatedList.style.display = "block";
        parentContainer.style.display = "none";
        document.body.classList.remove("chat-open");
        document.body.style.overflowY = "auto";
      }
    });
  });




    document.addEventListener("click", (e) => {
    const replyRef = e.target.closest(".chat-free-reply-row.reply-in-bubble, .chat-free-reply-row.reply");
    if (!replyRef) return;

    const replyToId = replyRef.dataset.replyTo;
    if (!replyToId) return;

    // Try both types of IDs (#msg-123 and plain number)
    const target = document.getElementById(`msg-${replyToId}`) || document.getElementById(replyToId);

    if (target) {
        // 🔵 Scroll smoothly into view
        target.scrollIntoView({
        behavior: "smooth",
        block: "center"
        });

        // 🔵 Highlight temporarily
        target.classList.add("highlight-flash");
        setTimeout(() => target.classList.remove("highlight-flash"), 1500);
    }
    });


    document.addEventListener("contextmenu", (e) => {
    const msg = e.target.closest(".chat-bubble");

    if (!msg) return; // Only handle right-click on a message bubble

    e.preventDefault();

    const contextMenu = document.getElementById("contextMenu");
    const editItem = contextMenu.querySelector(".edit-message");

    // Hide Edit if message is a recipient message
    if (msg.classList.contains("recipient")) {
        if (editItem) editItem.style.display = "none";
    } else {
        // Hide Edit if message contains audio/voice
        const audioEl = msg.querySelector("audio, .voice-message, .audio-player");
        if (audioEl) {
        if (editItem) editItem.style.display = "none";
        } else {
        // Otherwise show the edit option
        return;
        }
    }

    // Store currently right-clicked message
    window.currentRightClickedMsg = msg;
    });

    document.addEventListener("click", (e) => {
    const contextMenu = document.getElementById("contextMenu");
    if (contextMenu && !contextMenu.contains(e.target)) {
        contextMenu.style.display = "none";
    }
    });
    
    document.querySelector(".selection-header .forward-message")?.addEventListener("click", () => {
    const selected = Array.from(document.querySelectorAll(".chat-bubble.selected"));
    if (selected.length === 0) return alert("Select at least one message to forward!");

    const messageIds = selected.map(el => el.dataset.messageId);
    showForwardOverlay(messageIds);
    });


    document.querySelector("#contextMenu .forward-message")?.addEventListener("click", () => {
    if (!currentRightClickedMsg) return alert("No message selected to forward!");
    
    const messageId = currentRightClickedMsg.dataset.messageId;
    showForwardOverlay([messageId]);  
    const menu = document.getElementById("contextMenu");
    if (menu) menu.style.display = "none";
    console.log("📤 Forward triggered via context menu for message:", messageId);

    });




    document.querySelectorAll(".accept, .decline").forEach(btn => {
    btn.addEventListener("click", async function() {
        const reqId = this.dataset.id;
        const action = this.classList.contains("accept") ? "accept" : "decline";
        try {
        const res = await fetch(`/community_request/${reqId}/action`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({ action })
        });
        const result = await res.json();

        if (result.success) {
            this.closest(".request").remove();

            // 🔽 Update badge count
            const badge = document.querySelector(".request-badge");
            if (badge) {
            let currentCount = parseInt(badge.textContent.trim()) || 0;
            if (currentCount > 1) {
                badge.textContent = currentCount - 1;
            } else {
                badge.remove();
            }
            }
        } else {
            alert(result.error || "Something went wrong");
        }
        } catch (err) {
        console.error(err);
        alert("Error sending request");
        }
    });
    });


    document.querySelectorAll(".copy-message").forEach(copyBtn => {
    copyBtn.addEventListener("click", async () => {
        try {
        // Grab all truly selected bubbles
        let selected = Array.from(document.querySelectorAll(".chat-bubble.selected"));

        // If none are selected, fall back to temp-selected bubble (right-clicked)
        if (!selected.length) {
            const temp = document.querySelector(".chat-bubble.selected-temp");
            if (temp) selected = [temp];
        }

        if (!selected.length) {
            showToastMessage("No message selected");
            return;
        }

        // Collect text from each bubble
        const texts = selected.map(b => {
            const caption = b.querySelector(".caption-text")?.textContent || "";
            const imgCaption = b.querySelector(".image-caption-text")?.textContent || "";
            return [caption, imgCaption].filter(Boolean).join("\n");
        }).filter(Boolean);

        if (!texts.length) {
            showToastMessage("Nothing to copy");
            selected.forEach(b => b.classList.remove("selected", "selected-temp"));
        clearTempSelectionAndContext();
            return;
        }

        const finalText = texts.join("\n\n");
        let copied = false;

        // Try Clipboard API first
        try {
            await navigator.clipboard.writeText(finalText);
            copied = true;
        } catch {
            // Fallback for older browsers / Safari
            const tempArea = document.createElement("textarea");
            tempArea.value = finalText;
            tempArea.style.position = "fixed";
            tempArea.style.top = "-1000px";
            tempArea.style.opacity = "0";
            document.body.appendChild(tempArea);
            tempArea.focus();
            tempArea.select();
            try {
            copied = document.execCommand("copy");
            } catch {
            copied = false;
            }
            document.body.removeChild(tempArea);
        }

        showToastMessage(copied ? "Message Copied to clipboard!" : "Failed to copy message");

        // Clear selection / temp highlight after copy
        selected.forEach(b => b.classList.remove("selected", "selected-temp"));
        clearTempSelectionAndContext();


        

        const selectionHeader = document.getElementById("selectionHeader");
        const normalHeader = document.getElementById("normalHeader");
        const selectedCount = document.getElementById("selectedCount");

        if (selectionHeader) selectionHeader.style.display = "none";
        if (selectedCount) selectedCount.textContent = "0";
        if (normalHeader) normalHeader.style.display = "flex";

        } catch (err) {
        console.error(err);
        showToastMessage("Failed to copy message");
        }
    });
    });


 


    addImageBtn.addEventListener("click", () => {
        imagePicker.click();
    });

    imagePicker.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);

        // Add new files to both selectedImages (UI) and allFiles (sending)
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                selectedImages.push(ev.target.result);
                updateThumbnails();
            };
            reader.readAsDataURL(file);
        });

        allFiles = allFiles.concat(files); // <-- merge them
    });


    sendButtons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        e.preventDefault();
        handleSend(); // your existing send logic
    });
    });


    document.querySelector(".right-tools .icon-button").addEventListener("click", () => {
    // Clear image list
    selectedImages = [];
    allFiles = [];

    // Hide the editor
    const editor = document.querySelector(".editor-container");
    editor.style.display = "none";

    // Reset main image + thumbnails
    const mainImage = document.getElementById("mainImage");
    const imageThumbnailContainer = document.querySelector(".image-thumbnail");
    mainImage.src = "";
    imageThumbnailContainer.innerHTML = "";

    // ✅ VERY IMPORTANT: reset file input so same file can be picked again
    const fileInput = document.getElementById("fileInput");
    fileInput.value = "";
    });

    

    attachBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {
    const files = [...fileInput.files];
    allFiles = files;
    updateDropImgVisibility();

    if (files.length === 0) return;

    const editorContainer = document.querySelector(".editor-container");
    const mainImage = document.getElementById("mainImage");
    const imageThumbnailContainer = document.querySelector(".image-thumbnail");

    editorContainer.style.display = "flex";
    imageThumbnailContainer.innerHTML = "";

    selectedImages = [];

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
        selectedImages.push(e.target.result);
        updateThumbnails();
        mainImage.src = selectedImages[0];
        };
        reader.readAsDataURL(file);
    });
    });
    


    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => e.preventDefault());
    });
    dropArea.addEventListener("dragenter", () => {
    dropImg.style.display = "block";
    dropImg.style.opacity = "1";
    });

    dropArea.addEventListener("dragleave", () => {
    if (!allFiles || allFiles.length === 0) {
        dropImg.style.opacity = "0";
        setTimeout(() => dropImg.style.display = "none", 200);
    }
    });

    dropArea.addEventListener("dragover", () => {
    dropArea.classList.add("dragging");
    });

    dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragging");
    });


    if(toggleIcon) {
      toggleIcon.addEventListener("click", toggleRight);      
    }


    linkBackBtn.addEventListener("click", () => {
    if (linkBackBtn.classList.contains("back-shifted")) {
        perepatyChat?.classList.add("hidden");

        // 🚫 Immediately hide tooltip and block hover
        tooltipBlocked = true;
        tooltip.classList.remove("show");

        // 🚫 Disable pointer events temporarily on toggle icon
        toggleIcon.style.pointerEvents = "none";

        // ✅ Re-enable after 2s (enough for user to move mouse away)
        setTimeout(() => {
        tooltipBlocked = false;
        toggleIcon.style.pointerEvents = "auto";
        }, 1000);
    }
    });

    document.querySelectorAll(".chat").forEach(chat => {
    chat.addEventListener("click", () => {
        if (perepatyChat?.classList.contains("hidden")) {
        setTimeout(() => {
            perepatyChat.classList.remove("hidden");
            perepatyChat.style.display = "block";
        }, 110);
        }
    });
    });
 


    const btnNNNeed = document.getElementById("themeToggleBtn");

    btnNNNeed.addEventListener("click", async () => {
    try {
        const res = await fetch("/api/toggle_theme", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ community_id:  CURRENT_COMMUNITY_ID })
        });

        const data = await res.json();

        if (data.theme_mode) {
        document.body.classList.toggle("dark", data.theme_mode === "dark");
        console.log("🌙 Theme updated:", data.theme_mode);
        }
    } catch (err) {
        console.error("Theme toggle failed:", err);
    }
    });


    document.querySelector(".mobile-back")?.addEventListener("click", () => {
    closeForwardOverlay();

    });

    dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragging");

    const droppedFiles = [...e.dataTransfer.files].filter(f => f.type.startsWith("image/"));
    if (droppedFiles.length === 0) return;

    dropImg.style.opacity = "0";
    setTimeout(() => dropImg.style.display = "none", 200);

    editorContainer.style.display = "flex";
    imageThumbnailContainer.innerHTML = "";
    selectedImages = [];
    allFiles = droppedFiles; // ✅ update global state

    let filesLoaded = 0;

    droppedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
        selectedImages.push(event.target.result);
        filesLoaded++;

        if (filesLoaded === droppedFiles.length) {
            updateThumbnails();
            mainImage.src = selectedImages[0];
            
            // ✅ Option 1: Automatically show "Send" active
            const sendBtn = document.querySelector(".send-button");
            sendBtn.disabled = false;
            sendBtn.style.opacity = "1";
            sendBtn.style.pointerEvents = "auto";
            
            // ✅ Option 2 (if you want it to send instantly)
        }
        };
        reader.readAsDataURL(file);
    });

    chatInput.placeholder = "Add a caption...";
    previewContainer.classList.remove("active");
    // inputWrapper.classList.remove("has-preview");
    });




    icSearch.addEventListener("click", () => {
    hdrMain.style.display = "none";
    hdrSearch.classList.add("showing");
    inSearch.focus();
    });

    icBack.addEventListener("click", () => {
    hdrSearch.classList.remove("showing");
    hdrMain.style.display = "flex";
    inSearch.value = "";
    filterQ("");
    });

    inSearch.addEventListener("input", (e) => {
    filterQ(e.target.value);
    });




    cnts.forEach(ct => {
    ct.addEventListener("click", () => {
        const nm = ct.dataset.name;
        const avatarDiv = ct.querySelector(".quirk-avatar");
        const selCount = document.querySelectorAll(".quirk-contact.selected").length;
        const already = ct.classList.contains("selected");

        if (!already && selCount >= MAX_SEL) {
        tagListElm.classList.add("quirk-shake");
        setTimeout(() => tagListElm.classList.remove("quirk-shake"), 400);
        return;
        }

        ct.classList.toggle("selected");
        const existTag = tagListElm.querySelector(`[data-name="${nm}"]`);

        if (ct.classList.contains("selected")) {
        const tg = document.createElement("div");
        tg.classList.add("quirk-tag");
        tg.dataset.id = ct.dataset.recipientId;
        tg.dataset.name = nm;

        // Determine if avatar is image or fallback
        const logoUrl = avatarDiv.style.backgroundImage.replace(/url\(["']?/, '').replace(/["']?\)/, '');
        if (logoUrl) {
            tg.innerHTML = `<img src="${logoUrl}" alt="${nm}" style="object-fit: cover;"> <span class="quirk-tag-text">${nm}</span><span class="remove-selected-f">&times;</span>`;
        } else {
            const bgColor = avatarDiv.style.backgroundColor || '#ccc';
            const letter = avatarDiv.textContent || nm[0].toUpperCase();
            const textColor = ct.getAttribute("text-color") || "#000";
            tg.innerHTML = `
                <div style="
                background-color:${bgColor};
                color:${textColor};
                width:24px;
                height:24px;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:12px;
                font-weight:500;
                text-transform:uppercase;
                ">${letter}</div>
                <span class="quirk-tag-text">${nm}</span>
                <span class="remove-selected-f">&times;</span>
            `;;
        }

        tg.querySelector("span").addEventListener("click", e => {
            e.stopPropagation();
            ct.classList.remove("selected");
            tg.remove();
            updateSel();
        });

        tagListElm.appendChild(tg);
        } else if (existTag) {
        existTag.remove();
        }

        updateSel();
    });
    });









onSocketReady((socket) => {
socket.on("mutual_active", (data) => {
  console.log("📩 Received mutual_active event:", data);

  if (!data || !data.communityA || !data.communityB) {
    console.warn("⚠️ Invalid mutual_active payload:", data);
    return;
  }

  const key = [data.communityA, data.communityB].sort().join("-");
  window.mutualViewers[key] = data.mutual;

  console.log(`🤝 Mutual status updated for ${key}:`, data.mutual);
});
});


onSocketReady((socket) => {
socket.on("disconnect_badge", (data) => {
console.log("📩 Received disconnect_badge event:", data);

const key = [data.communityA, data.communityB].sort().join("-");
window.mutualViewers[key] = false;
console.log("🚫 Mutual broken:", key);
});
});





onSocketReady((socket) => {
socket.on("online_status", ({ community_id }) => {
    console.log("⚡ online_status received:", community_id);

    communityStatusMap[community_id] = { online: true, last_seen: new Date() };
    updateCommunityStatusUI(community_id);
});

});


onSocketReady((socket) => {

socket.on("offline_status", ({ community_id, last_seen }) => {
    console.log("⚫ offline_status received:", community_id, last_seen);

    communityStatusMap[community_id] = { online: false, last_seen: new Date(last_seen) };
    updateCommunityStatusUI(community_id);
});

});


setInterval(() => {
    Object.entries(communityStatusMap).forEach(([cid, { online, last_seen }]) => {
    if (!online) updateCommunityStatusUI(cid);
    });
}, 60000);


onSocketReady((socket) => {

socket.on("messages_marked_read", ({ sender_id, recipient_id }) => {
console.log("📩 messages_marked_read event:", sender_id, recipient_id, "current:", window.currentCommunityId);

if (window.currentCommunityId !== recipient_id) {
    console.log("⛔ Ignored — not sender’s side");
    return;
}

document.querySelectorAll(".chat-bubble.sender .double-check").forEach(svg => {
    svg.classList.add("read");
});

console.log("✅ Updated double-check icons to blue");
});
});

onSocketReady((socket) => {

socket.on("show_typing", ({ from }) => {
console.log("📥 show_typing received from:", from);
const el = document.querySelector(`.status[data-community-id='${from}']`);
if (el) el.textContent = "typing...";
});
});


onSocketReady((socket) => {
socket.on("hide_typing", ({ from }) => {
console.log("📥 hide_typing received from:", from);
const el = document.querySelector(`.status[data-community-id='${from}']`);
if (!el) return;

// 👇 If we have a record of their last known state, restore it
if (communityStatusMap[from]) {
    updateCommunityStatusUI(from);
} else {
    el.textContent = "Online"; // fallback if unknown
}
});
});


onSocketReady((socket) => {

socket.on("recording_status", ({ from, status }) => {
console.log(`🎤 Recording status update from ${from}: ${status}`);
const el = document.querySelector(`.status[data-community-id='${from}']`);
if (!el) return;

if (status === "recording") {
    el.textContent = "recording audio...";
} else if (status === "online") {
    // restore from map if exists
    if (communityStatusMap[from]) {
    updateCommunityStatusUI(from);
    } else {
    el.textContent = "Online"; // fallback
    }
}
});

});


onSocketReady((socket) => {
socket.on("new_message", (msg) => {
console.log("📩 New message received:", msg);
console.log("🎵 waveform heights received:", msg.waveform_heights);

const currentUserId = parseInt(CURRENT_COMMUNITY_ID);
const isSender = msg.sender_id === currentUserId;
const content = msg.content || {};

// ✅ 1️⃣ SIDEBAR PREVIEW UPDATE (for both sender and recipient)
// Find any chat whose data-recipient-id or data-sender-id matches
const targetChats = document.querySelectorAll(".chat");
const relevantChats = Array.from(targetChats).filter(chat =>
[msg.sender_id, msg.recipient_id].includes(parseInt(chat.dataset.recipientId))
);



relevantChats.forEach(targetChat => {
    const preview = targetChat.querySelector(".details p");
    const timeEl = targetChat.querySelector(".time-chat");
    const meta = targetChat.querySelector(".chat-meta");

    // Build preview text
    let newPreview = "";
    if (msg.message_type === "text") {
    newPreview = msg.content?.text?.trim() || "Start chatting";
    } else if (msg.message_type === "audio") {
    const dur = msg.content?.audio_durations?.[0];
    const durationText = dur ? `00:${dur.toString().padStart(2, "0")}` : "";
    newPreview = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" class="size-5 inline-block mr-1">
        <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 
                7.5a6 6 0 0 1-6-6v-1.5m6 
                7.5v3.75m-3.75 0h7.5M12 
                15.75a3 3 0 0 1-3-3V4.5a3 
                3 0 1 1 6 0v8.25a3 3 0 0 1-3 
                3Z"/>
        </svg> ${durationText}`;
    } else if (msg.message_type === "image" || msg.message_type === "mixed") {
    const txt = msg.content?.text || msg.content?.caption || "Photo";
    newPreview = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" class="size-5 inline-block mr-1">
        <path stroke-linecap="round" stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 
                2.25 0 0 1 3.182 0l5.159 
                5.159m-1.5-1.5 1.409-1.409a2.25 
                2.25 0 0 1 3.182 0l2.909 
                2.909m-18 3.75h16.5a1.5 1.5 
                0 0 0 1.5-1.5V6a1.5 1.5 
                0 0 0-1.5-1.5H3.75A1.5 
                1.5 0 0 0 2.25 6v12a1.5 
                1.5 0 0 0 1.5 1.5Z"/>
        </svg> ${txt}`;
    } else {
    newPreview = "Start chatting";
    }

    preview.innerHTML = newPreview;

timeEl.textContent = formatUserTime(msg.created_at);

const mutualKey = [msg.sender_id, msg.recipient_id].sort().join("-");
const isMutual = window.mutualViewers?.[mutualKey];

// 🔹 Debug logs
console.log(`🔑 mutualKey: ${mutualKey}`);
console.log(`👀 isMutual before handling message:`, isMutual);
console.log(`✉️ sender: ${msg.sender_id}, recipient: ${msg.recipient_id}, currentUser: ${currentUserId}`);
console.log(`🧑‍💻 isSender?`, isSender);

// 🟢 Remove badge if mutual view is active
if (isMutual === true) {
const badge = targetChat.querySelector(".badge");
if (badge) {
    badge.remove();
    console.log(`❌ Badge removed for ${mutualKey} because isMutual=true`);
}
}

// 🔹 Only for recipient (not sender)
if (!isSender && (isMutual === false || isMutual === undefined)) {
let badge = targetChat.querySelector(".badge");
if (!badge) {
    // Create new badge
    badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = "1";
    badge.style.display = "inline-block";
    meta.appendChild(badge);
    console.log(`➕ Badge created for ${mutualKey}`);
} else {
    // Increment existing badge count
    badge.textContent = String(parseInt(badge.textContent) + 1);
    console.log(`➕ Badge incremented for ${mutualKey}: ${badge.textContent}`);
}

// ✅ Sync unread section
const unreadContainer = document.querySelector(".unread-chats");
const recipientId = msg.sender_id; // sender is the one being unread for recipient
let existingUnread = unreadContainer.querySelector(`.chat[data-recipient-id="${recipientId}"]`);

if (!existingUnread) {
    console.log("🆕 Creating new unread chat entry for", recipientId);

    // Clone from visible chat list
    const mainChat = document.querySelector(`.chat[data-recipient-id="${recipientId}"]`);
    if (mainChat) {
    const clone = mainChat.cloneNode(true);
    const cloneBadge = clone.querySelector(".badge");
    if (cloneBadge) cloneBadge.textContent = badge.textContent; // sync exact count
    unreadContainer.prepend(clone);

    // Make sure container is visible
    unreadContainer.style.display = "block";

    // Remove any placeholder “no unread” text
    unreadContainer.querySelectorAll(".unread-list, .no-results-unread").forEach(el => el.remove());
    } else {
    // Fallback if main chat doesn’t exist
    const div = document.createElement("div");
    div.classList.add("chat");
    div.dataset.recipientId = recipientId;
    div.innerHTML = `
        <div class="avatar" style="background:#888;">
        <div class="profile-fallback">?</div>
        </div>
        <div class="details">
        <h3 class="ellipsis">New Chat</h3>
        <p>${msg.content?.text || "New message"}</p>
        </div>
        <div class="chat-meta">
        <span class="time-chat">${formatUserTime(msg.created_at)}</span>
        <span class="badge">${badge.textContent}</span>
        </div>
    `;
    unreadContainer.prepend(div);
    unreadContainer.style.display = "block";
    }
} else {
    // ✅ Sync badge count between unread and main list
    const unreadBadge = existingUnread.querySelector(".badge");
    const mainBadge = document.querySelector(`.chat[data-recipient-id="${recipientId}"] .badge`);
    if (unreadBadge && mainBadge) unreadBadge.textContent = mainBadge.textContent;
}

// ✅ Update Unread tab properly
const unreadTabBtn = document.querySelector('.tabs_message button:nth-child(2)');
if (unreadTabBtn) {
    const badges = document.querySelectorAll('.unread-chats .badge');
    let totalUnread = 0;
    badges.forEach(b => {
    totalUnread += parseInt(b.textContent) || 0;
    });

    // Only show number if > 0
    unreadTabBtn.textContent = totalUnread > 0 ? `Unread ${totalUnread}` : "Unread";
}
}


// ✅ Move chat to top smoothly when a new message is received
const parent = targetChat.parentNode;

setTimeout(() => {
if (parent && parent.firstChild !== targetChat) {
    targetChat.style.transition = "all 0.25s ease";
    targetChat.style.opacity = "0";
    targetChat.style.transform = "scale(0.98)";

    setTimeout(() => {
    parent.prepend(targetChat);
    targetChat.style.opacity = "1";
    targetChat.style.transform = "scale(1)";
    targetChat.classList.add("updated");
    setTimeout(() => targetChat.classList.remove("updated"), 700);
    }, 150); // slight delay to ensure DOM reflow
}
}, 300); // ← delay the reordering by 0.3s

});


if (msg.sender_sid === socket.id) return;


// ✅ 2️⃣ CREATE CHAT BUBBLE (ONLY for recipient)

const bubble = document.createElement("div");
bubble.classList.add("chat-bubble", isSender ? "sender" : "recipient");
bubble.id = `msg-${msg.id}`;
bubble.dataset.messageId = msg.id;
bubble.dataset.createdAt = msg.created_at;
if (content.reply_to) {
const replyRef = document.createElement("div");
replyRef.classList.add("chat-free-reply-row", "reply-in-bubble");
replyRef.dataset.replyTo = content.reply_to;

const replyLeft = document.createElement("div");
replyLeft.classList.add("chat-free-reply-left");

const indicator = document.createElement("div");
indicator.classList.add("chat-free-reply-indicator");

const textWrap = document.createElement("div");
textWrap.classList.add("chat-free-reply-text");

// ✅ Find replied message in DOM if available
let replyOriginal = "Message not found";
let replySenderName = "Unknown";
const repliedMsgEl = document.querySelector(`#msg-${content.reply_to}`);

if (repliedMsgEl) {
    // detect sender
    if (repliedMsgEl.classList.contains("sender")) {
    replySenderName = "You";
    } else if (repliedMsgEl.classList.contains("recipient")) {
    replySenderName =
        document.querySelector(".chat.active .chat-name")?.textContent ||
        "Community";
    }

    // detect message type
    const imgEl = repliedMsgEl.querySelector("img");
    const voiceEl = repliedMsgEl.querySelector(".voice-message");

    if (imgEl) {
    const txt =
        repliedMsgEl.querySelector(".image-caption-text")?.textContent?.trim() ||
        repliedMsgEl.querySelector(".caption-text")?.textContent?.trim();
    replyOriginal = txt || "Photo"; // ✅ Use caption if available
    } else if (voiceEl) {
    const dur = voiceEl.querySelector(".voice-time")?.textContent || "00:00";
    replyOriginal = `Voice message (${dur})`;
    } else {
    replyOriginal =
        repliedMsgEl.querySelector(".caption-text")?.textContent?.trim() ||
        repliedMsgEl.textContent?.trim() ||
        "Text message";
    }
} else {
    replyOriginal = "Loading...";
    replySenderName = msg.content?.reply_to_name || "Unknown";
}

// ✅ Create sender name and message summary
const userEl = document.createElement("h3");
userEl.classList.add("chat-free-reply-user");
userEl.textContent = replySenderName;


const msgEl = document.createElement("div");
msgEl.classList.add("chat-free-reply-message");

// --- ICON or THUMBNAIL PREVIEW ---
if (repliedMsgEl) {
    const imgEl = repliedMsgEl.querySelector("img");
    const voiceEl = repliedMsgEl.querySelector(".voice-message");

    if (imgEl) {
    const caption =
        repliedMsgEl.querySelector(".image-caption-text")?.textContent?.trim() ||
        repliedMsgEl.querySelector(".caption-text")?.textContent?.trim() ||
        "Photo";

    msgEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            width="14" height="14" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182
                0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25
                2.25 0 0 1 3.182 0l2.909 2.909m-18
                3.75h16.5a1.5 1.5 0 0 0
                1.5-1.5V6a1.5 1.5 0 0 0
                -1.5-1.5H3.75A1.5 1.5 0 0
                0 2.25 6v12a1.5 1.5 0 0 0
                1.5 1.5Z"/>
        </svg>
        ${caption}`;
    } else if (voiceEl) {
    const dur = voiceEl.querySelector(".voice-time")?.textContent || "00:00";
    msgEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" width="14" height="14" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6
                7.5a6 6 0 0 1-6-6v-1.5m6
                7.5v3.75m-3.75
                0h7.5M12 15.75a3 3 0 0
                1-3-3V4.5a3 3 0 1 1 6
                0v8.25a3 3 0 0 1-3
                3Z"/>
        </svg>
        Voice message (${dur})`;
    } else {
    msgEl.textContent = replyOriginal;
    }
} else {
    msgEl.textContent = replyOriginal;
}

// ✅ Assemble reply layout
textWrap.appendChild(userEl);
textWrap.appendChild(msgEl);
replyLeft.appendChild(indicator);
replyLeft.appendChild(textWrap);
replyRef.appendChild(replyLeft);

// ✅ Optional: attached thumbnail(s) in reply bubble
if (repliedMsgEl) {
    const imgEl = repliedMsgEl.querySelector("img");
    if (imgEl) {
    const thumbClone = document.createElement("div");
    thumbClone.classList.add("thumbnail-image");

    const wrapper = document.createElement("div");
    wrapper.classList.add("thumbnail-wrapper");

    const img = document.createElement("img");
    img.src = imgEl.src;

    wrapper.appendChild(img);
    
    thumbClone.appendChild(wrapper);
    replyRef.appendChild(thumbClone);
    }
}

// ✅ Final append to bubble
bubble.appendChild(replyRef);
}











// --- VOICE ---
if (msg.message_type === "audio" && content.audio?.length > 0) {
    const audioUrl = content.audio[0];
    const duration = content.audio_durations?.[0] || 0;
    const heights =
    Array.isArray(msg.waveform_heights?.[0])
        ? msg.waveform_heights[0]
        : Array.isArray(msg.waveform_heights)
        ? msg.waveform_heights
        : new Array(40).fill(8);

    const voiceDiv = document.createElement("div");
    voiceDiv.classList.add("voice-message");
    voiceDiv.innerHTML = `
    <button class="play-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3l14 9-14 9V3z" />
        </svg>
    </button>
    <div class="voice-body">
        <div class="waveform-outer"><div class="waveform-bars"></div></div>
        <div class="voice-footer">
        <span class="voice-time">${formatTimeSec(Math.floor(duration))}</span>
        <div class="voice-meta">
            <span class="voice-timestamp">${formatUserTime(msg.created_at)}</span>
            <span class="voice-checks"></span>

        </div>
        </div>
    </div>`;

    const barsContainer = voiceDiv.querySelector(".waveform-bars");
    heights.forEach(h => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${h}px`;
    barsContainer.appendChild(bar);
    });

    const btn = voiceDiv.querySelector(".play-btn");
    const audio = new Audio(audioUrl);
    const playSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>`;
    const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>`;

    function updateBars() {
    const progress = audio.currentTime / audio.duration;
    const totalBars = barsContainer.children.length;
    for (let i = 0; i < totalBars; i++) {
        barsContainer.children[i].classList.toggle("played", i < progress * totalBars);
    }
    }

    audio.addEventListener("timeupdate", updateBars);
    audio.addEventListener("ended", () => {
    btn.innerHTML = playSVG;
    barsContainer.querySelectorAll(".played").forEach(b => b.classList.remove("played"));
    });

    btn.addEventListener("click", async () => {
    if (audio.paused) {
        await audio.play();
        btn.innerHTML = pauseSVG;
    } else {
        audio.pause();
        btn.innerHTML = playSVG;
    }
    });
const checkEl = voiceDiv.querySelector(".voice-checks");

if (isSender) {
    // ✅ Only sender sees checkmark
    const isRecipientOnline = msg.recipient_online === true;
    const isMutualActive = msg.mutual_active === true;
    const checkColor = isMutualActive ? "read" : "unread";

    const checkSVG = isRecipientOnline
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
            width="20" height="20" fill="none"
            stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
        </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="2"
            class="single-check" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5" />
        </svg>`;

    if (checkEl) checkEl.innerHTML = checkSVG;
} else {
    // ✅ Recipient sees NO check + hide the span entirely
    if (checkEl) checkEl.style.display = "none";
}


bubble.appendChild(voiceDiv);
}
// --- IMAGE ---
else if (content.images?.length > 0) {
    const gallery = document.createElement("div");
    gallery.classList.add("gallery");
    content.images.forEach(url => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("gallery-item");
    const img = document.createElement("img");
    img.src = url;
    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
    });
    bubble.appendChild(gallery);

    if (content.caption || content.text) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("caption-text");
    textDiv.textContent = content.caption || content.text;
    bubble.appendChild(textDiv);
    }

// ✅ Add timestamp and checkmark for sender
const timestampContainer = document.createElement("div");
timestampContainer.classList.add("timestamp-container");

const createdAt = new Date(msg.created_at);
const timeString = createdAt.toLocaleTimeString("en-GB", {
hour: "2-digit",
minute: "2-digit",
hour12: false,
timeZone: USER_TZ,
});


// --- Only sender sees check mark beside time
if (isSender) {
const isRecipientOnline = msg.recipient_online === true;
const isMutualActive = msg.mutual_active === true;

let checkColor = isMutualActive ? "read" : "unread";

// --- Decide which check icon to show
const checkSVG = isRecipientOnline
? `

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
        width="20" height="20" fill="none"
            stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
    </svg>
`
: `
    <!-- Single check (recipient offline = sent only) -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke-width="2"
        class="single-check" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5" />
    </svg>
`;

timestampContainer.innerHTML = `${timeString} ${checkSVG}`;
} else {
// ✅ Recipient just sees time
timestampContainer.textContent = timeString;
}

bubble.appendChild(timestampContainer);

}

// --- TEXT ---
else if (content.text) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("caption-text");
    textDiv.textContent = content.text;
    bubble.appendChild(textDiv);

// ✅ Add timestamp and checkmark for sender
const timestampContainer = document.createElement("div");
timestampContainer.classList.add("timestamp-container");

const createdAt = new Date(msg.created_at);
const timeString = createdAt.toLocaleTimeString("en-GB", {
hour: "2-digit",
minute: "2-digit",
hour12: false,
timeZone: USER_TZ,
});


// --- Only sender sees check mark beside time
if (isSender) {
const isRecipientOnline = msg.recipient_online === true;
const isMutualActive = msg.mutual_active === true;

let checkColor = isMutualActive ? "read" : "unread";

// --- Decide which check icon to show
const checkSVG = isRecipientOnline
    ? `

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="double-check ${checkColor}"
            width="20" height="20" fill="none"
            stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
        <path d="M2,12L5,15L12,8M9,12L12,15L22,5" />
        </svg>
    `
    : `
    <!-- Single check (recipient offline = sent only) -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="2"
            class="single-check" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    `;

timestampContainer.innerHTML = `${timeString} ${checkSVG}`;
} else {
// ✅ Recipient just sees time
timestampContainer.textContent = timeString;
}

bubble.appendChild(timestampContainer);

    
}

const chatBubbleContainer = document.querySelector(
`.chat-bubble-container[data-community-id-for-bubble="${msg.recipient_id === currentUserId ? msg.sender_id : msg.recipient_id}"]`
);




if (!chatBubbleContainer) {
console.warn("⚠️ No matching bubble container found for message:", msg);
return;
}

const msgDateHeader = getDateHeader(new Date(msg.created_at));

// ✅ Look for an existing parent-date whose child-date matches this date
let parentDateDiv = Array.from(chatBubbleContainer.querySelectorAll(".parent-date")).find(pd => {
const child = pd.querySelector(".child-date");
return child && child.textContent === msgDateHeader;
});

// ✅ If none exists, create one
if (!parentDateDiv) {
parentDateDiv = document.createElement("div");
parentDateDiv.classList.add("parent-date");
parentDateDiv.dataset.date = msgDateHeader;

const childDateDiv = document.createElement("div");
childDateDiv.classList.add("child-date");
childDateDiv.textContent = msgDateHeader;

parentDateDiv.appendChild(childDateDiv);
chatBubbleContainer.appendChild(parentDateDiv);
}



parentDateDiv.appendChild(bubble);
bindGalleryClicks(bubble);




chatBubbleContainer.appendChild(bubble);

// Scroll to bottom
chatMessages.scrollTo({
top: chatMessages.scrollHeight, // <-- use scrollHeight, not bottom
behavior: "smooth"
});
});
});



onSocketReady((socket) => {


socket.on("message_deleted", (data) => {
  console.log("🗑️ message_deleted event received:", data);

  const { deleted_ids, delete_for_everyone, sender_id, recipient_id } = data;
  if (!deleted_ids?.length) return;

  deleted_ids.forEach((id) => {
    const msgEl = document.querySelector(`[data-message-id="${id}"]`);
    if (!msgEl) return;

    if (delete_for_everyone) {
      const currentUserId = parseInt(CURRENT_COMMUNITY_ID, 10);
      const isSender = currentUserId === sender_id;

      const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" width="14" height="14"
             stroke-width="1.5" stroke="currentColor"
             class="size-6 deleted-icon">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>`;

      const placeholderHTML = isSender
        ? `<div class="deleted-placeholder">${svgIcon} You deleted this message</div>`
        : `<div class="deleted-placeholder">This message was deleted</div>`;


      msgEl.innerHTML = placeholderHTML;
      msgEl.classList.add("deleted");
    } else {
      msgEl.remove();
    }
  });
});
});



onSocketReady((socket) => {


socket.on("sender_deleted", (data) => {
  console.log("👋 sender_deleted received:", data);
  const { deleted_ids } = data;

  deleted_ids.forEach((id) => {
    const msgEl = document.querySelector(`.chat-bubble.sender[data-message-id="${id}"]`);
    if (msgEl) msgEl.style.display = "none";
  });
});
});


onSocketReady((socket) => {

socket.on("recipient_deleted", (data) => {
  console.log("📭 recipient_deleted received:", data);
  const { deleted_ids } = data;

  deleted_ids.forEach((id) => {
    const msgEl = document.querySelector(`.chat-bubble.recipient[data-message-id="${id}"]`);
    if (msgEl) msgEl.style.display = "none";
  });
});

});

onSocketReady((socket) => {

socket.on("message_edited", (data) => {
  console.log("✏️ message_edited event:", data);

  const { message_id, new_text, edited_at } = data;
  const msgEl = document.querySelector(`[data-message-id='${message_id}']`);
  if (!msgEl) return;

  const textDiv = msgEl.querySelector(".caption-text");
  if (textDiv) textDiv.textContent = new_text;

  // Add "Edited" label if not already there
  let timestampContainer = msgEl.querySelector(".timestamp-container");
  if (timestampContainer && !timestampContainer.textContent.includes("Edited")) {
    const editedTag = document.createElement("span");
    editedTag.classList.add("edited-tag");
    editedTag.textContent = " Edited";
    timestampContainer.prepend(editedTag);
  }

  msgEl.classList.add("edited"); // optional CSS hook
});
});




onSocketReady((socket) => {

socket.on("notification", (data) => {
    console.log("Recieved Request:", data);


  if (data.type === "request_accept") {
    const allChats = document.querySelector(".all-chats");
    const unreadChats = document.querySelector(".unread-chats");

    // Prevent duplicates
    const existsInAll = allChats && allChats.querySelector(`.chat[data-recipient-id="${data.from_community_id}"]`);
    const existsInUnread = unreadChats && unreadChats.querySelector(`.chat[data-recipient-id="${data.from_community_id}"]`);

    if (!existsInAll) {
      const colors = [
        "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1",
        "#955251", "#B565A7", "#009B77", "#DD4124", "#45B8AC"
      ];
      const colorIndex = data.from_community_id % colors.length;
      const bgColor = colors[colorIndex];

      // Build chat HTML (used for both all and unread)
      const chatHTML = `
        <div class="chat" 
          data-recipient-id="${data.from_community_id}"
          data-bg="${bgColor}"
          data-name="${data.from_community_name}"
          data-slug="${data.from_community_slug}"
          data-status="${data.status || 'Available'}"
          data-logo="${data.logo_path ? `${data.logo_path}` : ''}"
          data-fallback="${data.from_community_name.charAt(0).toUpperCase()}">

          <div class="avatar" style="background:${bgColor}">
            ${data.logo_path
              ? `<img class="profile-pic" src="${data.logo_path}" alt="${data.from_community_name}" width="40" height="40">`
              : `<div class="profile-fallback" style="color:#000;font-weight:600;">${data.from_community_name.charAt(0).toUpperCase()}</div>`}
          </div>
          <div class="details">
            <h3 class="chat-name">${data.from_community_name}</h3>
            <p>${data.message}</p>
          </div>
          <div class="chat-meta">
            <span class="time-chat">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <span class="badge">1</span>
          </div>
        </div>
      `;

      // Add to both lists

    if (allChats) allChats.insertAdjacentHTML("afterbegin", chatHTML);
    if (unreadChats && !existsInUnread) {
      unreadChats.insertAdjacentHTML("afterbegin", chatHTML);

      // 🟢 Increment the Unread tab counter
  // 🟢 Increment the Unread tab counter
  const unreadTab = document.querySelector(".tabs_message button:nth-child(2)");
  if (unreadTab) {
    // Extract current count or default to 0
    const currentText = unreadTab.textContent.trim();
    const match = currentText.match(/Unread\s*(\d+)?/i);
    let count = match && match[1] ? parseInt(match[1]) : 0;

    // Increment
    count += 1;

    // Update tab text
    unreadTab.textContent = `Unread ${count}`;
  }


      // 🧹 Hide placeholders
      const noUnreadList = document.querySelector(".unread-list");
      const noUnreadResults = document.querySelector(".no-results-unread");
      if (noUnreadList) noUnreadList.style.display = "none";
      if (noUnreadResults) noUnreadResults.style.display = "none";
    }

      // Optional highlight animation
      const newChat = allChats?.querySelector(`.chat[data-recipient-id="${data.from_community_id}"]`);
      if (newChat) {
        newChat.classList.add("highlight-flash");
        setTimeout(() => newChat.classList.remove("highlight-flash"), 2000);
      }
    }
  }


  // Show incoming request in requests panel (to_community) immediately
  if (data.type === "new_request") {
    const requestsContainer = document.querySelector(".requests");
    if (requestsContainer) {
      const requestDiv = document.createElement("div");
      requestDiv.className = "request";
      requestDiv.dataset.id = data.request_id;
      requestDiv.innerHTML = `
        <div class="avatar">
          <img class="profile-pic" src="${data.logo_path}" alt="${data.from_community_name}">
        </div>
        <div class="details">
          <h3 class="ellipsis" style="margin:0;" title="${data.from_community_name}">${data.from_community_name}</h3>
          <p style="margin:0;">wants to connect with you</p>
        </div>
        <div class="actions">
          <button class="accept" data-id="${data.request_id}">Accept</button>
          <button class="decline" data-id="${data.request_id}">Decline</button>
        </div>
      `;
      requestsContainer.prepend(requestDiv);
      const badge = document.querySelector(".request-badge");
      if (badge) {
        let currentCount = parseInt(badge.textContent.trim()) || 0;
        badge.textContent = currentCount + 1;
      } else {
        // If no badge exists (e.g., count was 0), create one
        const button = document.querySelector('.bottom-nav button:nth-child(2)');
        const newBadge = document.createElement("span");
        newBadge.className = "request-badge";
        newBadge.textContent = "1";
        button.appendChild(newBadge);
      }

      // Bind accept/decline buttons
      requestDiv.querySelectorAll(".accept, .decline").forEach(btn => {
        btn.addEventListener("click", async function() {
          const reqId = this.dataset.id;
          const action = this.classList.contains("accept") ? "accept" : "decline";
          try {
            const res = await fetch(`/community_request/${reqId}/action`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
              },
              body: JSON.stringify({ action })
            });
            const result = await res.json();

            if (result.success) {
              this.closest(".request").remove();
              const badge = document.querySelector(".request-badge");
              if (badge) {
                let currentCount = parseInt(badge.textContent.trim()) || 0;
                if (currentCount > 1) {
                  badge.textContent = currentCount - 1;
                } else {
                  badge.remove();
                }
              }
            }else {
              alert(result.error || "Something went wrong");
            }
          } catch (err) {
            console.error(err);
            alert("Error sending request");
          }
        });
      });
    }
  }
});

});


}



function isMessageEmpty() {
  return chatInput.textContent.trim().length === 0;
}

function updatePlaceholder() {
  if (isMessageEmpty()) {
    chatInput.classList.remove("has-content");
  } else {
    chatInput.classList.add("has-content");
  }
}

chatInput.addEventListener("input", updatePlaceholder);

chatInput.addEventListener("paste", (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

updatePlaceholder();
updateChatHoverIniter();
updateButtonIcon();
updateSel();
initOverlayCloseListener();
initVoicePlayers();





})();
