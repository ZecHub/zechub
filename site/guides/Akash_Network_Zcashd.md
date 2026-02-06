# Deploying zcashd to Akash via Console

Guide for deploying a zcashd Zcash full node (Electric Coin Co implementation) using [Akash Console](https://console.akash.network). Here is a video tutorial below. A more in-depth guide can be found below.

<iframe width="320" height="200" src="https://www.youtube.com/embed/SVekeNU6_-g?si=HMX_bUg0PVkXv7hN" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What You're Deploying

A full zcashd node that will:

-> Sync the entire Zcash blockchain (350GB+ for mainnet, ~ 40GB for testnet)

-> Cost roughly $15/month depending on AKT token prices

-> Take several hours to days to fully sync

-> Use 4 vCPUs, 16GB RAM, 350GB storage (mainnet) or 2 vCPUs, 8GB RAM, 50GB (testnet)

-> Download cryptographic parameters on first run (~ 2GB, one-time)

**zcashd vs Zebra:**

-> zcashd is the original Zcash node implementation by Electric Coin Co

-> Zebra is the Zcash Foundation's alternative implementation

-> Both are compatible with the Zcash network

-> zcashd has more features (mining, wallet, Insight Explorer API)

-> Use zcashd if you need wallet functionality or specific RPC APIs


### **Important: Port Mapping on Akash**

When you expose a port on Akash (e.g., port 8233 for zcashd P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

This is by design - providers run multiple deployments, and they'd have conflicts if everyone tried to use port 8233 directly.

**What this means for you:**

-> You configure port 8233 in the SDL (zcashd's standard P2P port)

-> Akash gives you a URI like *provider.com:31234*

-> Other Zcash nodes connect to you at *provider.com:31234*

-> Inside your container, zcashd still listens on 8233


This is handled automatically. Just use the URI that Akash gives you.

## Prerequisites

-> **Keplr Wallet** browser extension installed (Chrome/Brave/Firefox)

-> **AKT tokens** - Get 50-100 AKT from an exchange (Coinbase, Kraken, Osmosis)

-> **5 minutes** to click through the Console UI


## Step 1: Connect Your Wallet

-> Go to [https://console.akash.network](https://console.akash.network)

-> Click **"Connect Wallet"** in the top right

-> Choose **Keplr** (or your preferred Cosmos wallet)

-> Approve the connection when Keplr pops up


Your AKT balance should appear in the top right. If it's zero, go fund your wallet first.

## Step 2: Create Deployment

-> Click **"Deploy"** button (big blue button, center of page)

-> Choose **"Build your template"** (or skip directly to uploading SDL)

### Option A: Upload SDL File (Recommended)

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Option B: Use SDL Editor

If you want to manually paste the SDL:

-> Copy the contents of *zcashd-akash.yml*

-> Paste into the SDL editor

-> Modify as needed (see configuration section below)

-> Click **"Create Deployment"**


## Step 3: Review and Approve Deposit

The Console will show you:

-> **Deployment deposit**: ~ 5 AKT (you get this back when you close the deployment)

-> **Estimated cost**: Based on your SDL pricing


Click **"Approve"** and sign the transaction in Keplr.

## Step 4: Choose a Provider

After ~ 30 seconds, you'll see bids from providers. Each bid shows:

-> **Price per block** (in AKT or USDC)

-> **Monthly estimated cost**

-> **Provider details** (uptime, region, etc.)


**Don't just pick the cheapest.** Check:

-> Uptime % (aim for > 95%)

-> Region (closer to you = better latency, but doesn't matter much for blockchain nodes)

-> Audited status (green checkmark = more trustworthy)


Click **"Accept Bid"** on your chosen provider and sign in Keplr.

## Step 5: Wait for Deployment

Console will:

-> Create the lease with your chosen provider

-> Send the manifest (tells the provider what to run)

-> Start your container


This takes 1-2 minutes. You'll see status updates in the UI.

## Step 6: Verify It's Running

Once deployed, you'll see:

-> **Services** tab: Shows your *zcashd* service with status

-> **Logs** tab: Live logs from your zcashd node

-> **Leases** tab: Details about your deployment (DSEQ, provider, cost)


### Check the Logs

Click on **Logs** and you should see zcashd starting up:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**First run will download zcash-params (~2GB).** This is a one-time operation and takes 5-10 minutes depending on provider bandwidth. Subsequent restarts will skip this.

The sync will take **hours to days** depending on the network. Watch for:

-> Increasing block heights

-> Peer connections (should be 10-30 peers)

-> No repeated errors


## Step 7: Get Your Node's Address

Click on the **Leases** tab, then **URIs**.

You'll see something like:

```
zcashd-8233: provider-hostname.com:31234
```

This is your node's **public P2P endpoint**. Other Zcash nodes will connect to you at this address.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

If you enabled RPC (commented out by default in the SDL), you'll also see the RPC endpoint here with its own mapped port.

## Configuration Options

### Switching to Testnet

The SDL defaults to Mainnet. To use Testnet instead:

-> **Change network in the *env* section:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
   ```

-> **Update the exposed port** in the *expose* section:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Optional: Reduce resources** for Testnet in *profiles.compute.zcashd.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Optional: Lower pricing** in *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> note lowering prices may filter our providers form bidding. experiement with this value, or use the provider endpiont to check if they would bid. (review provider api documentation)

### Enable RPC Access

RPC is disabled by default for security. To enable it:

**CRITICAL: Set strong credentials.** zcashd RPC transmits username/password over HTTP (not HTTPS). Only expose RPC if you understand the security implications.

-> Uncomment in *env* section:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Uncomment the RPC port in *expose*:

   **For Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **For Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Warning**: If you set *global: true* for RPC, you're exposing it to the internet with basic auth. This is a bad idea. Use *global: false* and access RPC through Akash's internal network or set up a secure tunnel.

**Port mapping reminder**: Even if you expose RPC globally, Akash will map it to a random high port (not 8232/18232). Check the URIs in your deployment to see the actual public endpoint. For *global: false* (recommended), the RPC endpoint is only accessible within the Akash deployment network, not from the public internet.

### Enable Transaction Index

Transaction index allows you to query any transaction by its ID via RPC. Uses more storage (~ 20% increase).

Uncomment in *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Warning**: Enabling txindex on an existing synced node requires re-indexing the entire blockchain, which takes hours.

### Enable Insight Explorer

Insight Explorer provides additional REST API endpoints for blockchain data (useful for block explorers).

Uncomment in *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

This automatically enables txindex and adds extra RPC methods.

### Enable Prometheus Metrics

To scrape metrics for monitoring:

-> Uncomment in *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Uncomment the metrics port in *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Metrics will be available at http://yourendpoint:9969/metrics in Prometheus format.

### Adjust Resources/Pricing

If you're not getting bids or want to optimize cost:

**For lower-spec providers**, reduce in the *profiles.compute.zcashd.resources* section:

-> CPU: *units: 2* (minimum for reasonable sync speed)

-> Memory: *size: 12Gi* (minimum for stability)

-> Storage: *size: 120Gi* (minimum for mainnet)


**To attract more bids**, increase in *profiles.placement.akash.pricing*:

-> Mainnet: Try *amount: 15000* uakt/block

-> Testnet: Try *amount: 7500* uakt/block


The SDL values are set conservatively high. Most providers will bid lower.

## Updating Your Deployment

Need to change configuration after deploying?

-> Go to **My Deployments** in Console

-> Find your zcashd deployment

-> Click **"Update Deployment"**

-> Edit the SDL

-> Click **"Update"** and approve in Keplr


**Note**: Updating will restart your container. The node will resume from its saved state (persistent storage), but expect 1-2 minutes of downtime.

## Monitoring

### Via Console

-> **Logs tab**: Live container logs

-> **Shell tab**: Get a shell inside the container (useful for debugging)

-> **Events tab**: Kubernetes events (mostly useless unless something's broken)


### Via RPC (if enabled)

If you enabled RPC, you can query your node as a normal zcashd full node (because it is!)

### zcash-cli Alternative

If you have shell access via Console, you can use *zcash-cli* directly:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Closing Your Deployment

When you're done or want to stop paying:

-> Go to **My Deployments**

-> Find your zcashd deployment

-> Click **"Close Deployment"**

-> Confirm and sign in Keplr


Your 5 AKT deposit will be refunded. **Persistent storage** should be preserved by the provider, but don't rely on it - treat it like any other cloud provider.

## Troubleshooting

### "Insufficient funds" error

You need more AKT. Fund your Keplr wallet.

### No bids showing up

Either:

-> Your pricing is too low (increase *amount* in SDL)

-> Your resource requirements are too high for available providers (reduce CPU/memory/storage)

-> Wait longer (sometimes takes 60-90 seconds for bids to appear)


### Deployment stuck in "pending"

The provider might be having issues. Close the deployment and try a different provider.

### zcashd logs show "No peers connected"

This is normal for the first few minutes. zcashd will discover peers automatically. If it persists after 10+ minutes, you might have a networking issue (unlikely on Akash).

### "Out of memory" errors in logs

You cheaped out on RAM. Close the deployment and redeploy with at least 12Gi memory (16Gi recommended).

### Sync is taking forever

Define "forever":

-> **Hours**: Normal

-> **Days**: Also normal for mainnet from scratch

-> **Weeks**: Something's wrong, check logs for errors


### "Error fetching zcash-params"

The provider might have network issues or slow bandwidth. This usually resolves itself. If it persists for more than 30 minutes, try redeploying to a different provider.

### RPC authentication failures

-> Check that *ZCASHD_RPCUSER* and *ZCASHD_RPCPASSWORD* are set correctly

-> Verify you're using the correct port (8232 for mainnet, 18232 for testnet)

-> Remember ports are mapped by Akash - use the URI from your deployment, not 8232 directly


## Cost Management

Monitor your spending in the Console:

-> **My Deployments** -> Your deployment -> Shows "Cost per month" estimate

-> Your Keplr wallet balance will decrease over time


When your balance runs low, Akash will auto-close your deployment. **Top up your wallet periodically** or set up alerts.

### Reducing Costs

-> **Use Testnet** for non-production testing (50% cheaper)

-> **Lower CPU/memory** if you don't need fast sync

-> **Choose cheaper providers** (not always wise - uptime matters)

-> **Use USDC instead of AKT** if AKT price is volatile (requires SDL pricing change)

-> **Disable txindex** if you don't need it (saves ~ 20% storage)


### Additional Resources

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (for provider issues)

## Final Notes

- **Persistent storage matters.** Don't skip *persistent: true* or use *beta2* class. Use *beta3*.
- **Initial sync is slow.** Be patient. This is normal for blockchain nodes.
- **Keep your wallet funded.** Deployments auto-close when you run out of AKT.
- **Backups aren't automatic.** If you care about the data, assume it can disappear and plan accordingly.
- **RPC security is critical.** Don't expose RPC to the internet without proper security measures.
- **zcash-params are cached.** First run downloads ~2GB of cryptographic parameters. This is normal and only happens once.
