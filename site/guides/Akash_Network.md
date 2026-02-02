# How to run a Zcash Node (Zebra) on Akash Network

**Note:** This guide has been updated to use **Zebra (`zebrad`)**, the modern, efficient Zcash node implementation written in Rust. The legacy `zcashd` node is being deprecated. This guide also utilizes **Akash SDL** for a native, persistent deployment, replacing the outdated manual Ubuntu installation method.

## Prerequisites
1.  **Install a Wallet:** [Keplr](https://keplr.app) or [Leap Wallet](https://www.leapwallet.io/).
2.  **Fund Wallet:** You will need **AKT** tokens.
    * Buy on an exchange (Kraken, Coinbase, Gate.io) or swap on [Osmosis](https://osmosis.zone).
    * *Recommendation:* Hold at least **20-30 AKT** to cover the storage deposit and lease costs.
3.  **Akash Console:** Access the dashboard at [console.akash.network](https://console.akash.network).

---

## Deployment Guide

### 1. Create Deployment
1.  Connect your wallet to [Akash Console](https://console.akash.network).
2.  Click **"Deploy"** or **"Create Deployment"**.
3.  Select the **"Empty"** or **"Build your own"** option.
4.  Switch the editor to **YAML** mode.
5.  **Copy and paste** the following SDL (Stack Definition Language) configuration into the editor. This configuration handles the software, networking, and persistent storage automatically.

```yaml
---
version: "2.0"

services:
  zebra:
    image: zfnd/zebra:latest
    env:
      - ZEBRA_LOG_FILTER=info
      - ZEBRA_NETWORK__NETWORK=Mainnet
    expose:
      - port: 8233
        as: 8233
        to:
          - global: true
    # Mounts persistent storage so blockchain data survives restarts
    params:
      storage:
        data:
          mount: /home/zebra/.local/share/zebra

profiles:
  compute:
    zebra:
      resources:
        cpu:
          units: 4.0
        memory:
          size: 8Gi
        storage:
          - size: 300Gi
            name: data
            attributes:
              persistent: true
              class: beta3 # Requests SSD/NVMe for faster syncing

  placement:
    dcloud:
      attributes:
        host: akash
      signedBy:
        anyOf:
          - "akash1365yvmc4s7awdyj3n2sav7xfx76adc6dnmlx63"
      pricing:
        zebra:
          denom: uakt
          amount: 10000

deployment:
  zebra:
    dcloud:
      profile: zebra
      count: 1

```

### 2. Launch Lease
* **Name your Deployment:** e.g., `zcash-zebra-mainnet`.
* **Create Lease:** Click the button to request bids from the network.
* **Choose a Provider:**
    * Look for providers with the **Audit shield icon** (verified providers).
    * Ensure they have **Persistent Storage** enabled (indicated by a disk icon).
    * *Note:* The monthly cost is an estimate based on the provider's specific bid.
* **Approve Transaction:** Select your preferred bid and approve the transaction in your wallet to start the deployment.

### 3. Verification & Syncing
Once your deployment status is **Active**:
1.  Navigate to the **Logs** tab in the deployment details.
2.  You should see logs indicating that Zebra is initializing and downloading blocks:
    > `INFO zebrad::components::sync::progress: synced_headers=...`
3.  **Sync Time:** A full sync typically takes **12 to 48 hours** depending on the provider's connection speed and allocated resources.

---

### Technical Details
* **Software:** [Zebra (Zebrad)](https://zebra.zfnd.org/) — The official Zcash Foundation consensus node.
* **Docker Image:** `zfnd/zebra:latest`
* **Storage:** 300GB Persistent Volume (Required to store the Mainnet chain history).
* **Network:** Mainnet (P2P Port `8233`).
