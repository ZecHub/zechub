## Introduction

Zcash (ZEC) is a privacy-focused cryptocurrency that uses the Equihash proof-of-work algorithm for mining. Mining Zcash involves using computational power to solve complex mathematical problems, validating transactions, and securing the network in exchange for ZEC rewards. Due to the network's high difficulty, solo mining is not recommended for most users. Joining a mining pool is the best way to earn consistent rewards by combining your hash power with others.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).

**New infrastructure note:** Projects like the Sovright Mining Pool (focused on miner sovereignty via Stratum V2) and the Sovright Relay Network (low-latency block propagation) aim to improve decentralization and reduce issues such as stale shares caused by slow block discovery. Details and links are included below.

## Requirements

### Hardware
- **GPU Mining (Personal Setup Recommended for Beginners):**
  - NVIDIA or AMD GPUs with at least 4GB VRAM (e.g., NVIDIA GTX 1070, RTX 3060; AMD RX 580 or better).
  - A compatible motherboard, sufficient PSU (at least 750W for multiple GPUs), and good cooling to prevent overheating.
  - Multi-GPU rigs are common for better hash rates (e.g., 6x GPUs can achieve 1-2 kSol/s).
- **ASIC Mining (More Efficient but Higher Cost):**
  - Equihash-compatible ASICs like Bitmain Antminer Z15 (420 kSol/s) or Innosilicon A9 (50 kSol/s).
  - These are louder, hotter, and consume more power (e.g., 1500W+); suitable for dedicated spaces. Buy from reputable sources like Bitmain.com or resellers (Blockware Mining).
- **General:** Stable internet, a computer for setup/monitoring. ASICs dominate the network (~13 GSol/s total hashrate in 2026), making GPU mining less competitive but still possible for hobbyists.

### Software
- **Operating System:** Windows 10/11, Linux (Ubuntu recommended for stability).
- **Mining Software:**
  - For GPUs: lolMiner (supports AMD/NVIDIA), GMiner, or miniZ (NVIDIA-focused). Download from official GitHub repos (e.g., github.com/Lolliedieb/lolMiner-releases). Prefer software with Stratum V2 support where available for newer pools.
  - For ASICs: Use the manufacturer's built-in firmware/dashboard (e.g., Bitmain's web interface).
- **Wallet:** A Zcash wallet to receive payouts. Recommended:
  - Shielded (private): Zashi Wallet, Zingo (Mobile/Desktop), YWallet (mobile/desktop).
  - Transparent (easier but less private): Edge Wallet, Zecwallet Lite.
  - Download from [wallets](https://zechub.wiki/wallets). Generate a shielded address (starts with 'zs') for privacy if the pool supports it. **Sovright prioritizes shielded (Orchard) payouts.**

### Other
- Electricity: Calculate costs. GPUs use 150-300W per card; ASICs 1000W+.
- Antivirus: Disable during setup as it may flag miners as threats.

## Step-by-Step Guide to Joining a Mining Pool

### Step 1: Set Up Your Zcash Wallet
1. Download and install a wallet from the official Zcash website [wallets](https://zechub.wiki/wallets).
2. Create a new wallet and back up your seed phrase securely.
3. Generate a receiving address (preferably shielded for privacy). Note it down, e.g., `zs1exampleaddress...`.
4. If using a transparent address (starts with 't'), it's simpler but offers less privacy.

### Step 2: Prepare Your Hardware
- For GPUs:
  1. Install GPUs in your PC and update drivers (NVIDIA: GeForce Experience; AMD: Radeon Software).
  2. Overclock if experienced (use MSI Afterburner for stability; aim for +100-200 core clock, -500 memory for efficiency).
- For ASICs:
  1. Connect the ASIC to power and Ethernet.
  2. Find its IP address using a tool like Advanced IP Scanner or the manufacturer's app.
  3. Access the web dashboard (e.g., enter IP in browser, default login: root/root for Bitmain).

**Warning:** Ensure proper ventilation; mining generates heat. Start small to test.

### Step 3: Choose and Join a Mining Pool
Mining pools distribute work and share rewards based on your contributed hashrate. Select based on fees (0-2%), payout minimum (0.01-0.1 ZEC), location (low ping), and reliability.

**Recommended Pools (Based on Hashrate, Fees, Reviews, and Decentralization Features):**
- **[Sovright Mining Pool](https://mining.sovright.com/)**: Currently a public **testnet** (Zcash NU6 / Stratum V2) focused on miner sovereignty. It pays nothing and is for testing only—use it to experiment with advanced features ahead of the planned mainnet launch. Key advantages:
  - Shielded (Orchard) payouts for privacy (unlike most pools that pay to transparent addresses).
  - No minimum hashrate; designed for independent/small operators with fleet monitoring tools.
  - Stratum V2 with Job Declaration: miners can choose full, partial, or no control over transaction selection / block templates (or let the pool handle it), with identical fees either way.
  - First open-source Stratum V2 implementation for Zcash.
  - Easy entry points: “Mine from your laptop” (CPU Equihash), “Connect your ASICs,” or “Onboard with your agent” (AI-assisted setup via tools like Claude/Codex). Setup can take ~10 minutes; no account required for basic testing.
  - Open-source infrastructure: https://github.com/sovright/mining-infra (includes pool server, Equihash validator, Job Declaration, and related components).
  - Check the site for the latest CPU quickstart, ASIC guide, and agent guide. Feedback helps shape mainnet.
- **2Miners (zec.2miners.com)**: 1% fee, PPLNS payout, supports GPU/ASIC/NiceHash. High hashrate (~1.17 GSol/s), reliable servers.
- **F2Pool (zec.f2pool.com)**: 2% fee, PPS+ payout, multi-coin support. Large pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% fee (PPS+), user-friendly dashboard, global servers.
- **AntPool (zec.antpool.com)**: 1% fee, from Bitmain, good for ASICs (~494 MSol/s).
- Others: Kryptex Pool, Luxor (check poolwatch.io/coin/zcash for real-time stats).

1. Visit the pool's website and create an account (email or no registration for some like 2Miners; Sovright testnet often requires none for basic use).
2. Add your Zcash wallet address in the settings for payouts (prefer shielded where supported, e.g., Sovright).
3. Note the pool's stratum server (e.g., zec.2miners.com:1010) and port. **For Sovright, follow the on-site guides for current testnet endpoints and Stratum V2 configuration.**

### Step 4: Install and Configure Mining Software
- For GPUs (Example: lolMiner on Windows/Linux):
  1. Download lolMiner from GitHub (latest version, e.g., 1.88). Prefer versions with good Equihash / Stratum V2 compatibility for pools like Sovright.
  2. Extract to a folder.
  3. Create a batch file (start.bat) with configuration:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Replace `YOUR_WALLET_ADDRESS` with your ZEC address.
     - `WORKER_NAME`: A name for your rig (e.g., Rig1).
     - For EU servers: eu.zec.2miners.com:1010.
     - For Sovright testnet: Use the exact stratum URL, port, and any Noise/encryption parameters shown in the site’s CPU/ASIC/agent guides (Stratum V2 format may differ from classic Stratum V1).
  4. Run the batch file. It will connect to the pool and start mining.
- For ASICs (Example: Bitmain Antminer):
  1. Log into the web dashboard.
  2. Go to Miner Configuration.
  3. Add pool details:
     - URL: stratum+tcp://zec.2miners.com:1010 (or Sovright testnet endpoint from the site guides)
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (or blank).
  4. Save and reboot the miner.
- For other software (e.g., GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```
  Adjust algorithm flags and connection strings for Stratum V2 / Equihash 200,9 as needed for Sovright.

**Test:** Run for 10-15 minutes; check console for accepted shares and hashrate. On Sovright testnet you can watch shares land on the real dashboard without earning real ZEC.

### Step 5: Start Mining and Monitor
1. Launch the miner: it will connect to the pool and begin submitting shares.
2. Monitor via:
   - Pool dashboard: Enter your wallet address to see hashrate, unpaid balance, and stats. (Sovright provides fleet monitoring tools oriented toward independent operators.)
   - Software console: Watch for errors, temperature (keep < 80°C).
   - Tools: Use HiveOS or SimpleMining OS for remote rig management.
3. Payouts: Most pools pay automatically when you reach the minimum (e.g., 0.05 ZEC). Check pool rules. Sovright testnet has no real payouts.

![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)

## Tips and Best Practices
- **Profitability:** Use calculators like whattomine.com/coins/166-zec-equihash. Example: A RTX 3060 (~300 Sol/s) earns ~0.001 ZEC/day at $50/ZEC, minus ~$0.50 electricity.
- **Privacy:** Use shielded pools/addresses if available (Sovright emphasizes shielded Orchard payouts); avoid reusing addresses.
- **[Sovright Relay Network](https://relay.sovright.com/):** A public, open-source low-latency block relay for Zcash mainnet. It distributes new blocks across geographic regions (US, Europe, Asia, etc.) via HMAC-authenticated UDP + Forward Error Correction, delivering them faster than native P2P in many cases. Benefits include fewer stale/orphan shares and a more level playing field for smaller pools/operators. Live dashboard shows real-time win rates, latency comparisons, orphan rates, and regional status. Pool operators (and advanced users running nodes) can connect; personal miners benefit indirectly when their pool uses it. Open-source components are in the same Sovright repositories. Monitor performance at the dashboard link above.
- **Security:** Use strong passwords; enable 2FA on pools/wallets. Never share private keys.
- **Troubleshooting:** If no shares, check firewall, antivirus, or wrong config. Join forums like forum.zcashcommunity.com or Reddit r/zec. For Sovright-specific issues, refer to the on-site guides or GitHub issues.
- **Alternatives:** If unprofitable, consider cloud mining or staking other coins. Experiment on the Sovright testnet to learn Stratum V2 and miner-controlled templates without risk.
- **Environmental Note:** Mining consumes energy; use renewable sources if possible.
- **Updates:** Zcash may evolve (e.g., potential changes around block times or upgrades); check z.cash and the Sovright sites/forums for news. The mining pool testnet and Relay are recent public goods aimed at decentralization.

For the latest Sovright connection details, guides, and status (testnet → mainnet), always visit:
- Mining Pool: https://mining.sovright.com/
- Relay Dashboard: https://relay.sovright.com/
- Source code: https://github.com/sovright/mining-infra
