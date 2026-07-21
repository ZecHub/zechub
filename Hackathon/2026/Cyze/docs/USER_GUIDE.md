# Cyze — User Walkthrough & Testing Guide

A step-by-step guide to exercising every major feature end to end. Follow it in
order to vet a build.

> **Beta software, unaudited.** Start on **testnet** (free faucet funds). Only
> move to mainnet once you trust the flow, and then with small amounts.

## Getting the app

**Option A — download a prebuilt installer (recommended).** Grab the build for
your operating system from the
**[Releases page](https://github.com/USCMig/Cyze/releases)** (open the latest
release and download the matching asset):

| OS | Download |
| --- | --- |
| **Windows** | `.msi` (or the `.exe` installer) |
| **macOS** | `.dmg` — Apple Silicon or Intel, whichever matches your Mac |
| **Linux** | `.AppImage` (portable), or `.deb` / `.rpm` for your package manager |

The FROSTd and tunnel helpers are bundled inside, so there is nothing else to
install.

**Option B — build from source.** For the latest code or an unlisted platform:

```sh
git clone https://github.com/USCMig/Cyze.git
cd Cyze
git checkout main
npm install
./scripts/build-sidecar.sh   # fetches both bundled sidecars (required)
npm run tauri build          # native installer, or `npm run tauri dev` to run
```

See the [README](../README.md) for build prerequisites (Rust, Node, and the
Linux system packages).

**Testing setup.** Cyze coordinates multiple people, so most flows need two
parties. The easiest way to test alone is two instances on one machine — give the
second its own data directory (works with an installed build or a dev build):

```sh
# installed build (example paths — use your platform's launch command)
cyze                                  # instance A (coordinator)
FROST_APP_DATA_DIR=/tmp/cyze-b cyze   # instance B (participant)

# or from source
npm run tauri dev                                # instance A
FROST_APP_DATA_DIR=/tmp/cyze-b npm run tauri dev # instance B
```

Throughout, **Coordinator** = the person who hosts the server and drives a
ceremony; **Participant** = someone who connects to that server and approves.

---

## 1. High-level features

Cyze is a desktop wallet for Zcash where **no one person holds the private key**.
A group jointly controls the funds using [FROST](https://frost.zfnd.org/)
threshold signatures: a configurable quorum (e.g. 2 of 3) must cooperate to
authorize any spend. It handles the full lifecycle — distributed key generation,
a shared Orchard wallet (sync, receive, balances, history), and threshold-signed
sending where each participant explicitly reviews and approves the transaction
before their signature share is produced.

---

## 2. Application security & passphrase

On first launch you create your local keystore.

1. **Set a passphrase** and a **display name**, then confirm the passphrase.
2. You are shown a **one-time 12-word recovery code**. Copy it and store it
   somewhere safe — it is displayed **only once** and is never saved by the app.
3. Tick the acknowledgement and click **"I have saved my recovery code —
   continue."**

**What to verify:**
- Lock the app (or restart) and **unlock with your passphrase**.
- Lock again and **unlock with the 12-word recovery code** instead — both work
  independently, so either can recover access.
- A wrong passphrase or code is rejected cleanly.

Your key shares and contacts are stored encrypted at rest. The passphrase and the
recovery code each unlock the keystore; losing both means the data cannot be
recovered, which is why the recovery code must be backed up.

---

## 3. Managing contacts

Contacts are the people you run ceremonies with, identified by a communication
public key. Go to **Contacts**.

**Share your contact:**
1. Enter your display name and generate your **contact string** (begins with
   `zffrost1…`).
2. Copy it and send it to the others out-of-band (chat, email).

**Import a contact:**
1. Paste the `zffrost1…` string a peer shared into **"Import a contact."**
2. Optionally add a nickname (a local label only you see) and save.

Imported contacts appear in your **address book** and become selectable when you
create a DKG ceremony. Exchange contacts in both directions before continuing.

---

## 4. Setting up the FROSTd server

All ceremony traffic flows through a FROSTd coordination server. It is an
untrusted relay — messages are end-to-end encrypted — so one party hosts it and
the others connect. Go to **Session Configuration**.

### As the host (coordinator)

1. **Start the embedded server.** It binds to loopback on your machine.
2. Choose how remote participants reach it:
   - **Cloudflare Tunnel** *(recommended for remote testing)* — click **Open
     public tunnel** to get a public `https://…trycloudflare.com` URL with valid
     TLS. Share that URL with participants. **Note:** the URL is disposable — a
     new one is generated every time you restart the tunnel, so always share the
     current one.
   - **Direct URL / IP** — for participants on your LAN or reachable by IP. Share
     the URL, the certificate **fingerprint**, and the self-signed **certificate**
     (participants must trust it once).
   - **NGINX reverse proxy** — for a stable domain with your own TLS.

### As a participant

1. In **Connect to the coordinator's server**, paste the URL the coordinator gave
   you. It looks like `https://frost.example.com`, `https://203.0.113.7:2744`, or
   `https://…trycloudflare.com`.
2. Click **Test connection** — a success message confirms the server, its TLS
   trust, and latency.
3. For a Direct-URL (self-signed) server, expand **"Trust its certificate,"**
   paste the PEM the coordinator shared, verify the fingerprint out-of-band, and
   trust it. (Not needed for a tunnel or NGINX server — those use public TLS.)
4. **Save & use this server.**

**What to verify:** the participant's Test connection succeeds against the
coordinator's live server before moving on.

---

## 5. DKG ceremony (create a group)

Distributed Key Generation creates the shared key. Everyone ends up with one
share; the full private key never exists anywhere. Go to **New DKG**.  Note, that to send transactions in ZCash, the RedPallas ciphersuite needs to be selected as a part of the DKG ceremony.

### Coordinator

1. Set **Role → Create a ceremony.**
2. Enter a **Group name** (tell the participants exactly what you called it — the
   name is local to each device).
3. Choose the **ciphersuite**: **RedPallas** for a Zcash wallet, or **Ed25519**
   for general-purpose signing. *For enabling a wallet, choose RedPallas.*
4. Set the **threshold** (e.g. 2) and **select the participants** from your
   contacts.
5. Click **Begin** and keep the app open.

### Participant

1. Set **Role → Join a ceremony.**
2. Enter the **same group name** the coordinator announced.
3. Click **Begin.** The app joins the ceremony waiting on the configured server.

When all parties have joined, the ceremony completes and the **group** appears in
the left sidebar for everyone. A RedPallas group exposes a **Wallet** page.

**What to verify:** the group appears on every participant's device with the same
threshold and participant count.

---

## 6. Building transactions

Spending requires the coordinator to draft a transaction and a threshold of
members to approve it.

### Coordinator — draft and send

1. Open the group from the sidebar → **Wallet.**
2. Fund the group first if needed: copy the **receive address** (a `u1…` on
   mainnet / `utest1…` on testnet) and send ZEC to it. Received funds need
   **10 confirmations** before they are spendable (your own change needs 3).
3. In the **Send** section, enter the **recipient address**, the **amount**, and
   an optional **memo**. The **Prepare** button stays disabled — and explains why
   — until there is enough spendable balance.
4. Choose which members will **sign** (any subset that meets the threshold; you
   are pre-selected).
5. Click **Prepare draft transaction**, review the amount, recipient, and fee,
   then **Sign and broadcast.** The signing ceremony starts.

### Participant — review and approve

1. A red **!** badge appears next to **Inbox** in the sidebar. Open it.
2. Open the pending session. You see the **exact message** being signed (hex and
   decoded UTF-8) and the **decoded transaction** (amount, recipient, fee).
3. If it matches what the coordinator described, click **Approve** to release your
   signature share. Nothing is signed until you approve.

Once a threshold of members approves, the coordinator's app aggregates the
signatures, builds the proof, broadcasts the transaction, and shows the **txid**.
The transaction then appears in **Transaction history** on both sides, with its
fee and memo shown inline.

**What to verify:** the txid confirms on a block explorer, and the sender's
balance and history update (use **Sync Now** on the Wallet page if needed).

---

## 7. Settings & configuration

Network and light-client endpoint are set on the **Wallet Settings** page.

**Network.** Cyze defaults to **Mainnet**; a persistent banner and confirmation
dialog make the active network unmissable. Switch to **Testnet** to test with
faucet funds, and back to Mainnet when ready. Balances, addresses, and history
are kept entirely separate per network.

**lightwalletd endpoint.** Each network offers a **preset** public endpoint
(`zec.rocks` on mainnet, `testnet.zec.rocks` on testnet). To use your own node,
enter a **custom** `https://host:port` URL instead. Plaintext `http://` endpoints
are refused. Use **Test** to confirm reachability, then **Save** — the save
confirms whether the server actually responded.

**Sync.** The Wallet page auto-syncs and shows the current block height. If it
looks stalled, press **Sync Now** — it restarts the sync from scratch and
refreshes every panel (balances, pending/settled, notes, and history).

