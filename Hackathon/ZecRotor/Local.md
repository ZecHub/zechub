# Shade Agent Template for ZecRotor

## Warning
This technology has **not yet undergone a formal security audit**.  
Use at your own risk. Do not deploy with significant funds until audited.

---

## Overview
This repository provides a **template for deploying a Shade Agent** on **NEAR + Phala Cloud**.  
The template has been adapted for **ZecRotor**, a Shade Agent that:  
- Accepts rotation jobs from users  
- Watches for deposits  
- Executes cross-chain token swaps (NEAR ↔ Zcash)  
- Releases funds on a schedule  

---

## Prerequisites
1. **Clone the repository**  
   ```bash
   git clone https://github.com/prakhar728/ZecRotor.git 
   cd ZecRotor
   ```

2. **Install NEAR CLI**  
   ```bash
   curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
   ```

3. **Install Shade Agent CLI**  
   ```bash
   npm i -g @neardefi/shade-agent-cli
   ```

4. **Create a NEAR testnet account**  
   ```bash
   near account create-account sponsor-by-faucet-service <example-name.testnet> autogenerate-new-keypair print-to-terminal network-config testnet create
   ```
   Replace `<example-name.testnet>` with your unique name.

5. **Set up Docker**  
   - Install Docker for Mac/Linux  
   - Login: `docker login`  

6. **Create a Phala Cloud account**  
   - Register at [Phala Cloud](https://cloud.phala.network/register)  
   - Get an API key at [Phala Dashboard](https://cloud.phala.network/dashboard/tokens)  

   **What is Phala Cloud?**  
   Phala Cloud provides secure Trusted Execution Environment (TEE) hosting. Shade Agents use TEE for verifiable execution.

---

## Setup
1. Copy env template:  
   ```bash
   mv .env.development.local.example .env.development.local
   ```
   Fill in environment variables (NEAR account, Phala API key, etc.)

2. Start Docker:  
   - Mac:  
     ```bash
     open -a Docker
     ```  
   - Linux:  
     ```bash
     sudo systemctl start docker
     ```

3. Install dependencies:  
   ```bash
   npm i
   ```

---

## Local Development
1. In one terminal run the Shade Agent CLI:  
   ```bash
   shade-agent-cli
   ```

2. In another terminal run the app:  
   ```bash
   npm run dev
   ```
   Your app will be live at [https://localhost:3000](https://localhost:3000)

---

## TEE Deployment (Phala)
1. Change `NEXT_PUBLIC_contractId` prefix from `ac-proxy.` to `ac-sandbox.` followed by your NEAR accountId in `.env.development.local`.  

2. Run the CLI:  
   ```bash
   shade-agent-cli
   ```
   The last URL printed is your live deployment on Phala Cloud.  

3. Debug logs: Go to your Phala Dashboard → App → Logs.  

---

## Interacting with the Agent
Once running, you can use REST APIs:  

- Get agent account (on NEAR):  
  ```http
  GET /api/agent-account
  ```

- Get Ethereum Sepolia account (for ETH-related tasks):  
  ```http
  GET /api/eth-account
  ```

- Submit a transaction (rotation job in ZecRotor):  
  ```http
  POST /api/jobs
  ```

Check your deployment’s base URL (Phala URL instead of localhost).

---

## Frontend
For local frontend:  
```bash
cd frontend
npm i
npm run dev
```

For Phala deployment:  
- Update `config.js` with your Phala API URL  
- Run frontend as above  
