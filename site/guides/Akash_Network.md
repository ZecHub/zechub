# How to Run Zcashd on Akash Network

## Tutorial

### Initial Setup

- Install Keplr Wallet: https://keplr.app
- Fund your wallet with a minimum of 5 AKT: https://osmosis.zone
- Navigate to the Akash Console: https://console.akash.network

### Setup Deployment

- Connect your Keplr wallet to the console.
- Click 'New Deployment' or 'Deploy Now' to start the process.
- Select the 'Ubuntu' template (or a similar basic Linux container template).
- Use the builder/editor to configure your deployment specifications.
- Set the mount path for persistent storage to `/mnt/data`.
- Recommended Hardware:
  - 4 CPU cores
  - 8 GB RAM
  - 300 GB Persistent Storage - ensure persistent storage is enabled by selecting an available class like beta3 (by default, it may show ephemeral storage).
- Approve the deployment transaction via Keplr (this includes a small network fee).
- Review bids from providers, select the most suitable one, and accept it (approve the transaction).
- Wait for the deployment status to update to 'Running'.
- Access the web shell for the container via the console interface.

### Install Dependencies & zcashd

In the web shell:

```bash
apt-get update && apt-get install -y apt-transport-https wget gnupg2
wget -qO - https://apt.z.cash/zcash.asc | sudo tee /etc/apt/trusted.gpg.d/zcash.asc > /dev/null
echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/zcash.asc] https://apt.z.cash/ jammy main" | sudo tee /etc/apt/sources.list.d/zcash.list
apt-get update && apt-get install -y zcash
zcash-fetch-params
mkdir -p ~/.zcash
cd /mnt/data
mkdir .zcash
vi ~/.zcash/zcash.conf
```

Add the following to `zcash.conf` (edit as needed):

```
addnode=mainnet.z.cash
datadir=/mnt/data/.zcash
```

Save and exit (press ESC, then type `:wq` and press Enter).

### Start Zcashd & Sync

```bash
zcashd
```

Estimated time for full sync: 3 days (depending on network conditions and hardware). Once synced, you can experiment with the node using `zcash-cli` commands, such as `zcash-cli getinfo` to check status.