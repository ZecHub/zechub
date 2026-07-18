(function () {

const IsloadingInit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="20" height="20"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".2" stop-color="currentColor" stop-opacity=".3"/><stop offset=".4" stop-color="currentColor" stop-opacity=".6"/><stop offset=".7" stop-color="currentColor" stop-opacity=".9"/><stop offset="1" stop-color="currentColor"/></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="0;360" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"/></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="currentColor" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"/></svg>`;

async function loadAuth(path) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${path}"]`)) { resolve(); return; }
    const script = document.createElement("script");
    script.src = path;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
}

let __zecLoaded = false;

async function loadZecModal(btn) {
  if (!btn) return;
  if (btn.dataset.loading === "1") return;
  const original = btn.innerHTML;
  if (!__zecLoaded) {
    btn.dataset.loading = "1";
    btn.style.pointerEvents = "none";
    btn.innerHTML = IsloadingInit;
    try {
      await loadAuth("/static/z-cash.js");
      __zecLoaded = true;
    } catch (err) {
      console.error("Failed loading ZEC modal:", err);
      btn.innerHTML = original;
      btn.style.pointerEvents = "";
      btn.dataset.loading = "0";
      return;
    }
    btn.innerHTML = original;
    btn.style.pointerEvents = "";
    btn.dataset.loading = "0";
  }
  openZecModal();
}


async function disconnectZec() {

  const btn = document.querySelector(".disc-btn");

  if (btn) {
    btn.disabled = true;
    btn.textContent = "Disconnecting...";
  }


  try {

    const csrf = document.querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') || '';


    const res = await fetch('/api/wallet/zec/disconnect', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrf
      }
    });


    const data = await res.json();


    if (!data.success) {
      throw new Error(data.error || "Disconnect failed");
    }


    // flip UI back

    const stateNc = document.getElementById('zec-state-nc');
    const stateC  = document.getElementById('zec-state-c');


    if (stateC) {
      stateC.classList.remove('active');
    }


    if (stateNc) {
      stateNc.classList.add('active');
    }


    // clear old data

    const walletLbl = document.getElementById('zec-wallet-lbl');
    const addr = document.getElementById('zec-addr');
    const proof = document.getElementById('zec-proof-display');
    const sig = document.getElementById('zec-sig-status');


    if(walletLbl) walletLbl.textContent = "—";
    if(addr) addr.textContent = "—";


    if(proof){
      proof.textContent = "";
      proof.classList.add("hidden");
    }


    if(sig){
      sig.style.color = "var(--muted)";
      sig.innerHTML = "Not verified";
    }


    window.dispatchEvent(
      new CustomEvent('zecWalletDisconnected')
    );


  } catch(err){

    console.error("Disconnect error:", err);
    alert(err.message);

  }
  finally{

    if(btn){
      btn.disabled = false;
      btn.textContent = "Disconnect Zcash";
    }

  }

}


window.disconnectZec = disconnectZec;

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (typeof closeZecModal === 'function') closeZecModal();
  }
});

Object.assign(window, {
  loadZecModal,
});

})();