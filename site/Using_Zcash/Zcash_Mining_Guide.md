# Zcash Mining Guide  
*How to Mine ZEC Using Your Own Hardware and a Mining Pool*

---

## What is Zcash Mining?

Zcash (ZEC) is a privacy-focused cryptocurrency that uses **Proof-of-Work (PoW)**.  
Miners provide computing power to secure the network, verify transactions, and create new blocks. In return, they earn **ZEC block rewards** and **transaction fees**.

Zcash uses the **Equihash** mining algorithm, designed to be GPU-friendly and memory-hard to resist ASIC dominance.

---

## Why Join a Mining Pool?

Solo mining Zcash is extremely difficult unless you control large amounts of hardware.  
A **mining pool** combines your hashrate with other miners and distributes rewards fairly based on contribution.

### Benefits of Mining Pools
- More frequent payouts  
- Lower variance in earnings  
- No need to find blocks alone  
- Beginner-friendly setup  

---

## What You Need to Mine Zcash

### 1. Hardware

Zcash is best mined using **GPUs**.

Recommended GPUs:
- NVIDIA RTX 20xx / 30xx / 40xx series  
- AMD RX 5000 / 6000 / 7000 series  

Minimum requirements:
- 4–6 GB VRAM per GPU  
- Stable internet connection  
- Reliable power supply  

---

### 2. Zcash Wallet

You need a ZEC address to receive mining rewards.

Recommended wallets:
- YWallet  
- Zashi  
- Nighthawk  
- Unstoppable Wallet  

For best privacy, create a **shielded address (z-address)**.

---

### 3. Mining Software

Popular Zcash mining software:
- GMiner  
- MiniZ  
- lolMiner  

Always download miners from their **official GitHub pages or websites**.

---

### 4. Mining Pool

Popular Zcash mining pools:
- Flypool  
- 2Miners  
- ViaBTC  
- ZHash  

Choose a pool based on:
- Low fees  
- Server near your location  
- Reliable uptime  

---

## Step-by-Step: Join a Zcash Mining Pool

### Step 1 — Install Mining Software
Download a miner such as **GMiner** or **MiniZ**.  
Extract the files into a folder on your computer.

---

### Step 2 — Get Pool Address

Example (Flypool): zec-eu1.flypool.org:3333

Your mining pool will provide:
- Stratum address  
- Port number  

---

### Step 3 — Create a Start Script

Inside your miner folder, create a new text file called: start.bat

Paste the following (example for GMiner): miner.exe --algo equihash --server zec-eu1.flypool.org --port 3333 --user t1YourZcashAddress.WorkerName

Replace:
- `t1YourZcashAddress` with your real ZEC address  
- `WorkerName` with any name (for example: `rig1`)  

Save the file.

---

### Step 4 — Start Mining

Double-click `start.bat`.

You should see:
- GPU detected  
- Hashrate  
- Shares being submitted  
- Pool connection confirmed  

---

### Step 5 — Monitor Your Miner

Visit your pool’s website and paste your ZEC address into the search bar.  
You will be able to view:
- Current hashrate  
- Active workers  
- Pending balance  
- Payout history  

---

## How You Get Paid

Most mining pools pay automatically once you reach a minimum balance (for example 0.01 ZEC).  
Funds are sent directly to your Zcash wallet.

---

## Important Tips

- Use a **shielded ZEC address** for better privacy  
- Keep GPU temperatures below 70–75°C  
- Enable auto-start on reboot  
- Watch rejected shares  
- Never download miners from unknown sources  

---

## Is Zcash Mining Profitable?

Profit depends on:
- Your GPU hashrate  
- Electricity cost  
- ZEC price  
- Network difficulty  

You can estimate earnings using mining calculators such as WhatToMine.

---

## Why Mining Matters for Zcash

Mining:
- Secures the blockchain  
- Prevents censorship  
- Keeps Zcash decentralized  
- Enables private digital money  

Every miner helps protect Zcash’s privacy and freedom.

---

## Further Resources

- Zcash Foundation – https://zfnd.org  
- ZecHub Wiki – https://zechub.wiki  
- Mining Pool Stats – https://miningpoolstats.stream/zcash  

---
