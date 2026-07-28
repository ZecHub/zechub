# Zcash Mining Guide: Joining a Mining Pool with Personal Hardware

## Introduction

Zcash (ZEC) is a privacy-focused cryptocurrency that uses the Equihash proof-of-work algorithm for mining. Mining Zcash involves using computational power to solve complex mathematical problems, validating transactions, and securing the network in exchange for ZEC rewards. Due to the network's high difficulty, solo mining is not recommended for most users. Joining a mining pool is the best way to earn consistent rewards by combining your hash power with others.

This guide focuses on mining Zcash using personal hardware (e.g., a home PC with GPUs or entry-level ASICs). Note that while GPUs can still mine Zcash, ASICs are far more efficient and profitable in 2026 due to network difficulty. Always check current profitability using tools like WhatToMine.com, as factors like electricity costs, hardware prices, and ZEC value affect viability. Mining may not be profitable for everyone; research local regulations and energy rates (aim for < $0.08/kWh).


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
  - For GPUs: lolMiner (supports AMD/NVIDIA), GMiner, or miniZ (NVIDIA-focused). Download from official GitHub repos (e.g., github.com/Lolliedieb/lolMiner-releases).
  - For ASICs: Use the manufacturer's built-in firmware/dashboard (e.g., Bitmain's web interface).
- **Wallet:** A Zcash wallet to receive payouts. Recommended:
  - Shielded (private): Zashi Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Transparent (easier but less private): Edge Wallet, Zecwallet Lite.
  - Download from [wallets](https://zechub.wiki/wallets). Generate a shielded address (starts with 'zs') for privacy if the pool supports it.

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

**Recommended Pools (Based on Hashrate, Fees, and Reviews):**
- **2Miners (zec.2miners.com)**: 1% fee, PPLNS payout, supports GPU/ASIC/NiceHash. High hashrate (~1.17 GSol/s), reliable servers.
- **F2Pool (zec.f2pool.com)**: 2% fee, PPS+ payout, multi-coin support. Large pool (~2.57 GSol/s).
- **ViaBTC (zec.viabtc.com)**: 2% fee (PPS+), user-friendly dashboard, global servers.
- **AntPool (zec.antpool.com)**: 1% fee, from Bitmain, good for ASICs (~494 MSol/s).
-  **Sovright ([mining.sovright.com](https://mining.sovright.com/))**: Community driven mining pool focused on miner sovereignty and network decentralization. Features **Stratum V2** support (NU6 public testnet), mandatory **shielded payouts** to z-addresses, open source pool software, transparent payout logic, no account registration, and support for CPU testing, Equihash ASICs, and AI assisted miner deployment. Integrated with the **Sovright Relay Network** for low latency block propagation and reduced stale shares. (Currently available on the NU6 public testnet.) 
- Others: Kryptex Pool, Luxor (check poolwatch.io/coin/zcash for real-time stats).

1. Visit the pool's website and create an account (email or no registration for some like 2Miners).
2. Add your Zcash wallet address in the settings for payouts.
3. Note the pool's stratum server (e.g., zec.2miners.com:1010) and port.

### Step 4: Install and Configure Mining Software
- For GPUs (Example: lolMiner on Windows/Linux):
  1. Download lolMiner from GitHub (latest version, e.g., 1.88).
  2. Extract to a folder.
  3. Create a batch file (start.bat) with configuration:
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Replace `YOUR_WALLET_ADDRESS` with your ZEC address.
     - `WORKER_NAME`: A name for your rig (e.g., Rig1).
     - For EU servers: eu.zec.2miners.com:1010.
  4. Run the batch file. It will connect to the pool and start mining.
- For ASICs (Example: Bitmain Antminer):
  1. Log into the web dashboard.
  2. Go to Miner Configuration.
  3. Add pool details:
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (or blank).
  4. Save and reboot the miner.
- For Sovright Mining ((NU6 Public Testnet)
  [Sovright](https://mining.sovright.com/) provides one of the simplest ways to begin mining on the Zcash **NU6 Public Testnet**. Miners can connect directly to     the Sovright testnet mining pool    using any compatible Equihash mining software or ASIC firmware by following the connection details published on the official   website. For developers and users experimenting with automated deployments, Sovright also provides AI-assisted onboarding. A single setup prompt can be used       with supported AI coding agents to automatically configure a compatible testnet miner, making it easy to evaluate mining without manually editing configuration    files.
- For other software (e.g., GMiner):
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test:** Run for 10-15 minutes; check console for accepted shares and hashrate.

### Step 5: Start Mining and Monitor
1. Launch the miner: it will connect to the pool and begin submitting shares.
2. Monitor via:
   - Pool dashboard: Enter your wallet address to see hashrate, unpaid balance, and stats.
   - Software console: Watch for errors, temperature (keep < 80 degrees C).
   - Tools: Use HiveOS or SimpleMining OS for remote rig management.
3. Payouts: Most pools pay automatically when you reach the minimum (e.g., 0.05 ZEC). Check pool rules.
### Improving Block Propagation with the Sovright Relay Network

In Proof-of-Work mining, discovering a new block is only the first step. That block must then be propagated across the network as quickly as possible so that every mining pool can immediately begin mining the next block. Any delay in propagation increases the likelihood that miners will continue working on an outdated block template, producing stale shares that cannot contribute to the blockchain.

The **Sovright Relay Network** ([relay.sovright.com](https://relay.sovright.com/)) is a public, UDP-based, low-latency block relay overlay built for the Zcash peer-to-peer network. Rather than replacing the native network, it complements existing peer-to-peer communication by rapidly forwarding newly discovered blocks between participating mining pools through globally distributed relay nodes. This helps reduce propagation delays and keeps miners synchronized with the latest block.

#### Benefits of the Sovright Relay Network

* **Faster block propagation** by distributing newly discovered blocks with minimal delay across participating mining pools.
* **Lower stale share rates**, allowing miners to spend more time performing productive work instead of mining outdated block templates.
* **Reduced orphan rates**, improving overall mining efficiency and reducing wasted computational effort.
* **Fairer competition** by helping reduce the networking advantage traditionally available to the largest mining pools with private relay infrastructure.
* **Improved network resilience** through publicly accessible relay infrastructure that benefits the broader Zcash mining ecosystem.
* **Supports decentralization** by enabling smaller and independent mining pools to receive newly discovered blocks more quickly and compete more effectively.

> **Note**
>
> Individual miners do not need to configure the Sovright Relay Network. When mining through a participating pool such as **Sovright Mining Pool**, block propagation is handled automatically by the pool infrastructure. Mining pool operators interested in integrating with the relay network can find deployment documentation and technical details at **https://relay.sovright.com/**.
 
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Tips and Best Practices
- **Profitability:** Use calculators like whattomine.com/coins/166-zec-equihash. Example: A RTX 3060 (~300 Sol/s) earns ~0.001 ZEC/day at $50/ZEC, minus ~$0.50 electricity.
- **Privacy:** Use shielded pools if available; avoid reusing addresses.
- **Security:** Use strong passwords; enable 2FA on pools/wallets. Never share private keys.
- **Troubleshooting:** If no shares, check firewall, antivirus, or wrong config. Join forums like forum.zcashcommunity.com or Reddit r/zec.
- **Alternatives:** If unprofitable, consider cloud mining or staking other coins.
- **Environmental Note:** Mining consumes energy; use renewable sources if possible.
- **Updates:** Zcash may evolve (e.g., potential PoS shift); check z.cash for news.
