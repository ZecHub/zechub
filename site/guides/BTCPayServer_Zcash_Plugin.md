# BTCPay Server with Zcash Support: Full Installation and Integration Guide

BTCPay Server allows online businesses to accept cryptocurrency payments directly, without intermediaries or custodians. This guide walks you through the complete process of setting up BTCPay Server with native support for Zcash shielded payments.

> ⚠️ This documentation focuses on integrating Zcash into your BTCPay Server instance.  
> It supports both **full node (Zebra)** and **lightwalletd-based setups**.

---

## Table of Contents

- [Why Use BTCPay Server with Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [How BTCPay Server Works](#How-BTCPay-Server-Works)
- [Where Are Funds Stored? Who Controls the Private Keys?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [How to Set Up BTCPay Server for Accepting Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Deploying BTCPay Server with Zcash Support](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Running Your Own Zcash Full Node (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node-Zebra--Lightwalletd)
  - [Connecting to an External `lightwalletd` Node (Custom Configuration)](#Connecting-to-an-External-lightwalletd-Node-Custom-Configuration)
  - [Hosting BTCPay Server at Home with Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configuring the Zcash Plugin in the BTCPay Server Web Interface](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Integrating BTCPay Server with Your Website](#Integrating-BTCPay-Server-with-Your-Website)
  - [API Integration](#API-Integration)
    - [Generating an API Key](#Generating-an-API-Key)
    - [Example: Creating an Invoice via API](#Example-Creating-an-Invoice-via-API)
    - [Setting Up a Webhook](#Setting-Up-a-Webhook-Optional)
  - [CMS Integration](#CMS-Integration)
  - [Payment Button or Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Conclusion](#Conclusion)
- [Resources](#Resources)


---

## Why Use BTCPay Server with Zcash

Online commerce increasingly accepts cryptocurrency. It’s fast, global, and works without banks. This benefits both merchants and customers. But there’s an important detail that many overlook.

When placing an order, the customer typically provides personal information: name, shipping address, and phone number. If the payment is made using a public blockchain — such as Bitcoin, Ethereum, or stablecoins on Ethereum or Tron — the transaction becomes permanently visible for analysis.

Anyone, even without knowing what was ordered, can:

- see when and how much was paid  
- trace where the funds came from and where they went  
- link a cryptocurrency address to a real person if there’s any point of correlation (for example, a leaked email or shipping name)

This means that a single purchase may reveal a customer’s entire financial history.

And it works the other way as well. If a merchant’s address has ever appeared on-chain, they become exposed. Competitors and third-party observers can track payment volumes, supplier activity, and the structure of business flows.

### The combination of BTCPay Server and Zcash can solve this.


BTCPay Server is a free and decentralized system for receiving cryptocurrency payments.  
It is not a payment intermediary and does not hold any funds. All payments go directly to the merchant’s wallet.  
This can be a personal wallet or a multisig setup within an organization.

The server handles coordination tasks:

- generates a unique address for each order  
- tracks when payment is received and links it to the order  
- issues receipts and notifications  
- provides a payment interface for the customer  

Everything runs under the control of the store owner, without relying on third-party services.

Zcash is a cryptocurrency built on zero-knowledge proofs. It supports a fully private transaction model.  
When using shielded addresses (hereafter simply called “addresses”), the sender, the recipient, and the transaction amount are not revealed on the blockchain.

For online stores, this means:

- The buyer can complete the payment without revealing their financial history  
- The seller receives payment without exposing their address, sales volume, or transaction structure  
- No external observer can link the payment to the order or to customer data

### Practical Example

A user places an order and selects Bitcoin or USDT as the payment method.  
The website generates a payment address and displays the amount.  
After the payment is made, this address is stored on the blockchain and becomes public.  
An attacker only needs to link one order to the address to gain long-term visibility into its entire transaction history.

Now imagine the same situation with Zcash.  
BTCPay Server generates a shielded address. The buyer sends the payment.  
From the blockchain’s perspective, nothing happens. There is no public data to analyze.  
The server receives confirmation, links it to the order, and completes the process.

For any outsider, it looks like nothing occurred.  
All logic remains between the store and the customer — as it should.

This solution doesn’t compromise automation or usability.  
Everything works the same as with other cryptocurrencies, just without the risk of data leaks.



## How BTCPay Server Works

BTCPay Server acts as a payment processing bridge between your e-commerce platform and the blockchain. Here's how the flow works:

1. **The customer places an order** on your website (e.g. WooCommerce, Magento, or any platform with BTCPay integration).

2. **The store requests a payment invoice** from BTCPay Server. The server generates a unique invoice with:
   - The order amount
   - A countdown timer
   - A Zcash address (e.g. a shielded `zs...` address)

3. **The customer sees the payment page** and sends ZEC to the provided address.

4. **BTCPay Server monitors the blockchain**, checking the payment against:
   - The expected amount
   - The receiving address
   - The invoice timestamp

5. **Once the transaction is detected and confirmed**, BTCPay notifies the store.

6. **The customer receives a payment confirmation.** Optionally, the server can send a receipt via email.

This entire process happens **automatically**, with no intermediaries or custodians.  
BTCPay Server does **not hold any funds** — it simply connects the order system to the blockchain securely and privately.
## Where Are Funds Stored? Who Controls the Private Keys?

BTCPay Server is **not** a wallet and does **not require private keys**.  
All funds go **directly** to the merchant’s wallet. Security is ensured by using a **viewing key-based architecture**.

### How It Works

- **The wallet is created in advance.**  
  The merchant uses a Zcash wallet that supports viewing keys — such as [YWallet](https://ywallet.app/installation) or [Zingo! Wallet](https://zingolabs.org/).  
  A full list is available at [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server connects via a viewing key.**  
  A viewing key is a **read-only key**: it can detect incoming payments and generate new receiving addresses,  
  but it cannot spend funds. The server does not store seed phrases or private keys.

- **Blockchain data is accessed through a `lightwalletd` server.**  
  You can use a public node like `https://zec.rocks`, or run your own `Zebra + lightwalletd` stack for full sovereignty.

- **Each order gets a unique address.**  
  Viewing keys allow the server to derive new Zcash shielded addresses for every invoice,  
  enabling secure payment tracking and preventing address reuse.

- **You retain full control over the funds.**  
  Even if the server is compromised, no one can steal your money — only payment metadata could be exposed.

This design separates **infrastructure** from **asset control**.  
You can update, migrate, or reinstall BTCPay Server without putting any funds at risk.

## How to Set Up BTCPay Server for Accepting Zcash

In the previous sections, we explained how BTCPay Server works with Zcash and why it matters for privacy-preserving payments. Now it’s time to get hands-on.

Your exact setup will depend on several factors:

- Do you already have a BTCPay Server instance?
- Do you want to use a public lightwalletd or run your own full node?
- Will the server run on a VPS or at home?

This chapter covers all current configuration scenarios — from minimal setups to fully sovereign deployments.

We’ll walk through the following:

- How to deploy everything from scratch on a VPS, including the full node (Zebra)
- How to run BTCPay Server at home while keeping your IP hidden using **Cloudflare Tunnel**
- How to enable and configure Zcash support inside the BTCPay Server web interface
- How to integrate BTCPay with your website or online store


## Deploying BTCPay Server with Zcash Support

Let’s move on to the actual setup. In this section, we’ll install BTCPay Server with Zcash support — either on a fresh VPS or by adding ZEC support to an existing instance.

If you already have BTCPay Server running (e.g. for BTC or Lightning), you don’t need to reinstall everything — just enable the ZEC plugin.

We’ll walk through various configurations, from minimal setups using a public `lightwalletd` node to fully sovereign installations with your own full node.  
The best option depends on your server location and how much independence you want from external infrastructure.

> 🧭 Official plugin documentation:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)

---

### Recommended VPS Configuration

Before installing, make sure you have:

- A VPS with **Ubuntu 22.04+**
- A domain name pointing to your server’s IP address (via DNS)
- `git`, `docker`, and `docker-compose` installed
- SSH access to the server

---

## Preparing Your Server (hidden part)

<details>
  <summary>Click to expand</summary><br>

To deploy BTCPay Server with Zcash support, you will need the following:

### 1. VPS with Ubuntu 22.04 or newer

We recommend using a minimal installation of **Ubuntu Server 22.04 LTS**.  
Any VPS provider that offers a dedicated IP address will work.  

**Minimum requirements**:  
- 2 CPU cores  
- 4 GB RAM  
- 40 GB disk space  

This setup is sufficient if you’re using lightwalletd for Zcash.  
If you plan to run a **full Zcash node**, you’ll need **at least 300 GB** of free disk space.

---

### 2. Domain name pointing to your server

In your DNS provider’s dashboard, create an `A` record for a subdomain  
(e.g. `btcpay.example.com`) that points to your VPS IP address.  

This domain will be used to access BTCPay Server from the browser  
and to automatically generate a **free SSL certificate** via Let’s Encrypt.

---

### 3. SSH access to the server

To install BTCPay Server, you must connect to your VPS via SSH.  
From your terminal, run:

```bash
ssh root@YOUR_SERVER_IP
````

If you use macOS, Linux, or WSL on Windows, SSH is already available in the terminal.
On plain Windows, use an SSH client like **PuTTY**.

---

### 4. Install Git, Docker, and Docker Compose

Once connected via SSH, update your system packages and install the required components:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> ⚠️ On Ubuntu 22.04 and newer, `docker-compose` from APT is deprecated.
> The recommended package is `docker-compose-plugin`, which provides the `docker compose` command (note the space instead of a dash).

Your server environment is now ready for installing BTCPay Server.

</details>

---

### Step 1: Clone the Repository

Create a working directory and download the BTCPay Server Docker deployment:

```bash
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Step 2: Export Environment Variables

Replace `btcpay.example.com` with your actual domain:

```bash
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> 💡 If you plan to add Monero or Litecoin later, you can include them now:

```bash
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

You can add new coins at any time by exporting the appropriate variables and rerunning the setup script:

```bash
. ./btcpay-setup.sh -i
```

For this guide, we’ll focus on **Zcash only**.

---

### Step 3: Run the Installer

Run the setup script to build and launch the server:

```bash
. ./btcpay-setup.sh -i
```

The script will install dependencies, generate the `docker-compose.yml`, start services, and configure `systemd`.
This takes about 5 minutes.

Once complete, your BTCPay Server instance will be available at:

```
https://btcpay.example.com
```

> 💡 If you’re modifying an existing installation (e.g. adding ZEC), be sure to stop and restart the server with new settings:

```bash
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Then proceed to the next section to configure Zcash in the BTCPay Server web interface.



## Running Your Own Zcash Full Node (Zebra + Lightwalletd)

If you prefer **not** to rely on public `lightwalletd` nodes, you can deploy your own full Zcash node along with Lightwalletd on the same server.  
This gives you **full autonomy** — no external dependencies, no trust required.

---

### Step 1: Ensure Sufficient Disk Space

A full Zcash node (Zebra + Lightwalletd) currently requires **300+ GB** of disk space, and it continues to grow.

Breakdown:

- The Zebra blockchain database: ~260–270 GB
- Lightwalletd indexing: ~15–20 GB

#### Recommended storage:

- **400 GB+** if the server is used **only** for Zcash payments
- **800 GB+** if the server also runs BTCPay Server, PostgreSQL, Nginx, etc.

> 💡 Ideally use an SSD/NVMe disk with **1 TB capacity**, especially if you don’t plan to prune data regularly.

---

### Step 2: Set Environment Variables

Append the following to your environment setup to activate the full node configuration:

```bash
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
````

This will include the `zcash-fullnode` fragment, which launches both `zebrad` and `lightwalletd` inside BTCPay Server.

---

### Step 3: Re-run the Installer

```bash
. ./btcpay-setup.sh -i
```

The script will:

* Download the Docker images for Zebra and Lightwalletd
* Set up the services inside the BTCPay stack
* Link the Zcash plugin to the **local** `lightwalletd` instance

> ⏳ **Full blockchain sync may take several days**, especially on low-resource VPS servers.
> Until synchronization completes, shielded payments will not be available.


## Connecting to an External `lightwalletd` Node (Custom Configuration)

In most cases, full autonomy isn’t required — and merchants may not want to spend time and disk space running a full Zcash node.  
By default, BTCPay Server connects to a public `lightwalletd` node to handle shielded payments without downloading the entire blockchain.

The default endpoint is:

```

https://zec.rocks:443

```

However, you can configure BTCPay Server to connect to **any external `lightwalletd` node**, such as:

```

https://lightwalletd.example:443

````

This section shows how to do that using a **custom Docker fragment**.

> 💡 A complete config example with all environment variables is available in the [plugin repository](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> The steps below show a minimal working setup.

---

### Step 1: Create a Custom Docker Fragment

In your BTCPayServer project directory, create a custom fragment file:

```bash
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Add the following content:

```yaml
exclusive:
- zcash
```

The `exclusive` directive ensures that only one fragment with the same label (`zcash` in this case) can be active at a time.
This prevents configuration conflicts — for example, you cannot run both the `zcash-fullnode` fragment and this custom external `lightwalletd` fragment simultaneously.
By marking it as `exclusive: zcash`, BTCPay Server will automatically disable the default `zcash-fullnode` and internal `lightwalletd` containers, allowing you to connect to your own external node instead.

---

### Step 2: Set Environment Variables

In the terminal:

```bash
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Step 3: Define the External Node Address

Open your `.env` file:

```bash
nano .env
```

Add the following line, replacing the URL with your chosen endpoint:

```dotenv
ZCASH_LIGHTWALLETD=https://lightwalletd.example:443
```

You can use:

* A **public node**, such as `https://lightwalletd.zcash-infra.com`
* Your own self-hosted node, deployed separately from BTCPay Server

> ⚠️ If the external `lightwalletd` becomes unavailable or overloaded, shielded payments will fail.
> For critical services, choose a **stable and proven endpoint** (like the default `zec.rocks`).

> 💡 Want to self-host `lightwalletd`?
> You can use the `docker-compose.lwd.yml` from the [Zebra repository](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Warning:** This setup is not officially documented and requires manual TLS setup, port forwarding, and firewall configuration — recommended for advanced users only.

---

### Step 4: Re-run the Installer

```bash
. ./btcpay-setup.sh -i
```

BTCPay Server will apply your custom config and connect to the specified `lightwalletd` node.

From now on, the Zcash plugin will use that external endpoint for handling shielded transactions.


## Hosting BTCPay Server at Home with Cloudflare Tunnel

Want to accept Zcash payments while hosting BTCPay Server on a home device — like a Raspberry Pi 5 or any local server **without a static IP**?  
You can securely expose your instance to the internet using **Cloudflare Tunnel**.

This method avoids port forwarding and hides your real IP address from the public — while keeping your server accessible over HTTPS.

It also helps you **avoid the cost of renting a VPS**, which is ideal if cryptocurrency payments are an optional feature rather than the core of your business.

---

### Step 1: Install Cloudflare Tunnel

1. Create an account at [cloudflare.com](https://www.cloudflare.com) and add your domain.
2. On your **home server**, install Cloudflare Tunnel:

```bash
sudo apt update
sudo apt install cloudflared --legacy
````

3. Authenticate with Cloudflare:

```bash
cloudflared tunnel login
```

This command will open a browser window. Log in and authorize access to your domain.
Cloudflare will automatically create a `credentials` file with a token on your server.

4. Create a new tunnel (you can name it `btcpay` or anything else):

```bash
cloudflared tunnel create btcpay
```

This generates a `btcpay.json` file containing the tunnel ID and credentials — you’ll need it in the next step.

---

### Step 2: Create Tunnel Configuration File

Create the configuration directory (if it doesn’t exist) and open the config file:

```bash
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Paste the following configuration:

```yaml
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explanation:

* `tunnel` — name of the tunnel you created earlier
* `credentials-file` — path to the token file generated during `cloudflared tunnel login`
* `hostname` — your domain registered with Cloudflare (e.g. `btcpay.example.com`)
* `service` — local address of your BTCPay Server (usually `http://127.0.0.1:80` for Nginx)

> 💡 Cloudflare will proxy traffic securely to your local server, without exposing your home IP.


### Step 3: Add a DNS Record for Your Tunnel

After creating the tunnel, Cloudflare will usually **automatically add a CNAME DNS record** for your domain. It should look like this:

```

btcpay.example.com → <UUID>.cfargotunnel.com

````

If it doesn’t appear automatically, add it manually:

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to the **DNS** section
3. Add a new CNAME record:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     You can find the exact value in your `btcpay.json` file or by running:
     ```bash
     cloudflared tunnel list
     ```
   - **Proxy status**: Enabled (orange cloud)

> 💡 This record ensures that all requests to `btcpay.example.com` are routed through the Cloudflare Tunnel, hiding your real IP address from the public.

---

### Step 4: Enable Tunnel on System Startup

To make the tunnel run automatically at boot, install it as a system service:

```bash
sudo cloudflared service install
````

Then enable and start the service:

```bash
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Check the status:

```bash
sudo systemctl status cloudflared
```

You should see a message like `Active: active (running)` and confirmation that `btcpay.example.com` is online.

> ✅ From now on, the tunnel will start automatically on every reboot, and your BTCPay Server will be publicly accessible — without port forwarding and without exposing your real IP.

---

### Step 5: Finalize BTCPay Server Setup

If you're about to install BTCPay Server for the first time, set your domain before running the setup script:

```bash
export BTCPAY_HOST="btcpay.example.com"
```

This ensures the correct domain is used when generating the **Nginx configuration** and **SSL certificates**.

If BTCPay Server is already installed and you're just adding the tunnel:

```bash
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

The setup will regenerate configs and apply the new domain.
You should now be able to access your server at:

```
https://btcpay.example.com
```

> 💡 Whether you're using a public `lightwalletd` or your own full node, this does not affect the tunnel.
> All that matters is that BTCPay Server is listening on `127.0.0.1:80` locally.


## Configuring the Zcash Plugin in the BTCPay Server Web Interface

After successfully deploying your BTCPay Server instance, you’ll need to perform some basic configuration via the admin web interface.  
The official documentation provides full instructions in English — here, we'll walk through the essential steps and focus specifically on configuring the Zcash plugin.

---

### Step 1: Log in to the Web Interface

Visit your instance at:

```

[https://btcpay.example.com](https://btcpay.example.com)

```

- Enter your administrator login and password.
- If this is your first time logging in, you’ll be prompted to create an account.
- The first account you register will automatically be assigned admin privileges.

---

### Step 2: Install the Zcash Plugin

1. In the main menu, go to:

```

Plugins → Browse Plugins

```

2. Locate the **Zcash (ZEC)** plugin. Use the search bar if needed.
3. Click **Install** and confirm.

> 💡 Repeat this process for any other altcoins you enabled during server configuration.

After installation, click **Restart Server** to reload the interface with the active plugins.


### Step 3: Connect Your Wallet via Viewing Key

After installing the plugin, a new **Zcash** section will appear in the settings menu.

1. Go to:

```

Zcash → Settings

```

2. Paste your **viewing key** — this allows BTCPay to detect incoming shielded payments.

   Example format:

```

zxviewtestsapling1q0hl2...

```

3. Enter the **current Zcash block height** — syncing will begin from this block to speed up initialization and skip unnecessary transaction history.

> 💡 Not all Zcash wallets currently support viewing key export.  
> Recommended options:
>
> - [**YWallet**](https://ywallet.app/installation)
> - [**Zingo! Wallet**](https://zingolabs.org/)
>
> In both apps, you’ll find viewing keys in the backup section.  
> In **Zingo!**, make sure to use the **Sapling viewing key** — this is the type supported by BTCPay Server.

These keys support **automatic address rotation**, meaning:
- Every customer gets a **unique** payment address
- You see a **single, unified** balance

You can find a full wallet compatibility list on [ZecHub → Wallets](https://zechub.wiki/wallets)

Once all fields are filled out, click **Save**.

---

### ✅ Test Your ZEC Payment Flow

Congratulations — your Zcash wallet is now connected to BTCPay Server.

Let’s run a test:

1. Go to:

```

Invoices → Create New

```

2. Generate a test invoice for a small amount in ZEC.
3. Send funds from **a different wallet** (not the one connected to BTCPay).
4. Once the transaction is detected, the invoice page will display a visual celebration 🎉.
5. Confirm that the invoice status changes to **Paid**.

If everything works — you're ready to integrate ZEC payments into your website using the API or CMS plugins.



## Integrating BTCPay Server with Your Website

Once your Zcash wallet is connected to BTCPay Server, you can integrate the payment system into your website.  
There are several ways to do this — from direct API access to ready-to-use plugins for popular CMS platforms.

---

### Integration Options

- **API Integration**  
  Ideal for custom-built websites or systems without a CMS.  
  Gives you full control over invoice creation, payment tracking, and notifications — all within your own interface and logic.  
  Requires basic programming knowledge, so this task is best handled by your developer.

- **CMS Plugins**  
  Available for platforms like **WooCommerce**, **PrestaShop**, and others.  
  These plugins allow you to accept payments in just a few minutes — no coding required.

- **Payment Button or Iframe**  
  The simplest method.  
  Perfect for landing pages, personal websites, or any site where you just want to embed a donation link or checkout widget.

---

### API Integration

If you're using a custom platform (or no CMS at all), the API is the best option.  
It gives you complete flexibility: you can create invoices, track their status, receive notifications, and fully control the user experience.

> 📌 Note: Even some CMS plugins use the API under the hood, so creating an API key is often the **first required step**, regardless of your integration method.

Next step: generate an API key for your store and start using the [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) to build your integration.


### Generating an API Key

To integrate BTCPay Server with your website or app, you'll need to generate an API key.

1. Log in to BTCPay Server and open the **user menu** (top-right corner)
2. Go to **API Keys**
3. Click **Create a new API key**
4. Enter a name for your key
5. In the **Permissions** section, enable:
   - `Can create invoice`
   - `Can view invoice`
   - *(Optional)* `Can modify store settings` — only if you need store-level management

6. Click **Generate**. Your personal API key will be displayed — copy and store it securely.

> ⚠️ This key grants access to your store’s invoices.  
> Do **not** share it publicly or expose it in client-side code.

---

### Example: Creating an Invoice via API

**Endpoint:**

```http
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
````

**Request body:**

```json
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Response:**

You’ll receive a JSON object with:

* `invoiceId`
* A payment URL that you can embed on your website or send to the customer

See full documentation:
[Greenfield API – Create Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Setting Up a Webhook (Optional)

To receive real-time notifications when invoice statuses change (e.g. when a payment is received):

1. Go to your store settings → **Webhooks**
2. Add the URL of your backend endpoint that will handle `POST` requests from BTCPay Server
3. BTCPay will automatically send notifications when an invoice is paid or expires

Webhook payloads and retry logic are described in the [official webhook documentation](https://docs.btcpayserver.org/Development/Webhooks/).

> 🧩 Example integrations are available for various programming languages in the BTCPay docs and GitHub repositories.



### CMS Integration

BTCPay Server supports plugins for popular content management systems (CMS).  
The most mature and widely used integration is with **WordPress + WooCommerce**, making it easy to accept ZEC payments **without writing code**.

---

#### WooCommerce (WordPress)

BTCPay Server officially supports a plugin for WooCommerce.

Steps to integrate:

1. Install the **BTCPay for WooCommerce** plugin from the WordPress plugin directory or from GitHub.
2. In your WordPress admin panel, go to:

```

WooCommerce → Settings → Payments

```

3. Find **BTCPay** in the list and click **Set up**
4. Enter your BTCPay Server URL and follow the authorization instructions  
   (automatic API key generation is recommended)
5. Enable the payment method and save your settings

> 💡 Detailed instructions, video tutorials, and troubleshooting guides are available in the plugin documentation.

You’ll also find other CMS integration options in that same section of the BTCPay docs.

---

### Payment Button or Iframe (No CMS or API Needed)

If you don’t use a CMS and don’t want to work with APIs, the easiest way to accept ZEC payments is to **embed a payment link or widget** directly on your website.

This method is ideal for:

- Landing pages
- Portfolio sites
- Blogs or static pages
- Projects without a backend server

---

#### Option 1: Payment Button (Link)

1. In BTCPay Server, manually create an invoice in the **Invoices** section
2. Copy the payment link, e.g.:

```

[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)

````

3. Add the link to your HTML:

```html
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
````

---

#### Option 2: Embedded Invoice (Iframe)

To display the invoice directly on your site, use an iframe:

```html
<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>
```

> 💡 You can style the button or iframe container to match your site’s design — BTCPay Server allows flexible theming of the invoice page.

## Conclusion

This guide was long — but it only covers the foundational aspects of integrating Zcash payments with BTCPay Server.

The BTCPay Server interface offers far more functionality than we've shown here. Luckily, the UI is available in multiple languages (including Russian), making it easy to explore and experiment further.

BTCPay is a highly flexible tool. You can:

* Host multiple independent stores on a single instance
* Define custom roles and permissions for team members — from order view-only to full admin
* Use your own domains and branding
* Set up webhooks, fallback wallets, and even Tor access
* Configure advanced settings such as tax rules, discount codes, checkout page customization, payment method restrictions, and more

BTCPay was built as an open-source alternative to centralized payment providers. If you're looking to accept private ZEC payments with no intermediaries, this platform is absolutely worth your attention.

We wish you success exploring the BTCPay ecosystem and making your payments truly yours.

## Resources

* [BTCPay Server Official Website](https://btcpayserver.org/)
* [BTCPay FAQ](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server GitHub Repository](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Mainnet Demo](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Plugin for BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Plugin Installation Guide](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Custom zcash-lightwalletd.custom.yml Example](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Lightwalletd Docker Compose File (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [BTCPay API Key Docs (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Create a Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Wallet Compatibility List (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd on Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
