# How to run Zebra on Akash Network

Step-by-step guide for deploying a Zebra Zcash full node using [Akash Console](https://console.akash.network).

### What You're Deploying

A full Zebra node that will:

-> Sync the entire Zcash blockchain (100GB+ for mainnet, ~40GB for testnet)

-> Cost roughly $15/month depending on AKT token prices

-> Take several hours to days to fully sync

-> Use 4 vCPUs, 16GB RAM, 350GB storage (mainnet) or 2 vCPUs, 8GB RAM, 50GB (testnet)


### Important: Port Mapping on Akash

When you expose a port on Akash (e.g., port 8233 for Zebra P2P), it **does NOT bind to that exact port** on the provider's public IP. Instead, the provider assigns a random high port (like 31234 or 42567) and reverse-proxies it to your container's port 8233.

This is by design - providers run multiple deployments, and they'd have conflicts if everyone tried to use port 8233 directly.

**What this means for you:**

-> You configure port 8233 in the SDL (Zebra's standard P2P port)

-> Akash gives you a URI like *provider.com:31234*

-> Other Zcash nodes connect to you at *provider.com:31234*

-> Inside your container, Zebra still listens on 8233


This is handled automatically. Just use the URI that Akash gives you.

### Prerequisites

1. **Keplr Wallet** browser extension installed (Chrome/Brave/Firefox)
2. **AKT tokens** - Get 50-100 AKT from an exchange (Coinbase, Kraken, Osmosis)
3. **5 minutes** to click through the Console UI

## Step 1: Connect Your Wallet

-> Go to [https://console.akash.network](https://console.akash.network)

-> Click **"Connect Wallet"** in the top right

-> Choose **Keplr** (or your preferred Cosmos wallet)

-> Approve the connection when Keplr pops up


Your AKT balance should appear in the top right. If it's zero, go fund your wallet first.

### Step 2: Create Deployment

-> Click **"Deploy"** button (big blue button, center of page)

-> Choose **"Build your template"** (or skip directly to uploading SDL)


#### Option A: Upload SDL File (Recommended)

[![Deploy on Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

#### Option B: Use SDL Editor

If you want to manually paste [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copy the contents of *zebra-akash.yml*

-> Paste into the SDL editor

-> Modify as needed (see configuration section below)

-> Click **"Create Deployment"**


### Step 3: Review and Approve Deposit

The Console will show you:

-> **Deployment deposit**: ~5 AKT (you get this back when you close the deployment)

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

### Step 5: Wait for Deployment

Console will:

-> Create the lease with your chosen provider

-> Send the manifest (tells the provider what to run)

-> Start your container

This takes 1-2 minutes. You'll see status updates in the UI.

### Step 6: Verify It's Running

Once deployed, you'll see:

-> **Services** tab: Shows your `zebra` service with status

-> **Logs** tab: Live container logs

-> **Leases** tab: Details about your deployment (DSEQ, provider, cost)


#### Check the Logs

Click on **Logs** and you should see Zebra starting up:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

The sync will take **hours to days** depending on the network. Watch for:

-> Increasing block heights

-> Peer connections (should be 10-30 peers)

-> No repeated errors


### Step 7: Get Your Node's Address

Click on the **Leases** tab, then **URIs**.

You'll see something like:

```bash
zebra-8233: provider-hostname.com:31234
```

This is your node's **public P2P endpoint**. Other Zcash nodes will connect to you at this address.

**Note the port mapping:** You configured port 8233 in the SDL, but Akash assigned it to a different public port (31234 in this example). This is normal - see the "Port Mapping on Akash" section at the top if this confuses you. Your node is accessible at whatever port Akash shows here, not necessarily 8233.

If you enabled RPC (commented out by default in the SDL), you'll also see the RPC endpoint here with its own mapped port.

### Configuration Options

#### Switching to Testnet

The SDL defaults to Mainnet. To use Testnet instead:

-> **Comment out Mainnet config** in the *env* section:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Uncomment Testnet config**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
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

-> **Optional: Reduce resources** for Testnet in *profiles.compute.zebra.resources*:

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

#### Enable RPC Access

RPC is disabled by default for security. To enable it:

**For Mainnet:**

-> Uncomment in *env* section:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment the Mainnet RPC port in *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**For Testnet:**

-> Uncomment in *env* section:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Uncomment the Testnet RPC port in *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Warning**: If you set *global: true* for RPC, you're exposing it to the internet. Zebra uses cookie auth by default, but still - don't do this unless you know what you're doing.

**Port mapping reminder**: Even if you expose RPC globally, Akash will map it to a random high port (not 8232/18232). Check the URIs in your deployment to see the actual public endpoint. For *global: false* (recommended), the RPC endpoint is only accessible within the Akash deployment network, not from the public internet.

#### Enable Metrics (Prometheus)

To scrape metrics for monitoring:

-> Uncomment in *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Uncomment the metrics port in *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Adjust Resources/Pricing

If you're not getting bids or want to optimize cost:

**For lower-spec providers**, reduce in the *profiles.compute.zebra.resources* section:

-> CPU: *units: 2* (minimum for reasonable sync speed)

-> Memory: *size: 12Gi* (minimum for stability)

-> Storage: *size: 120Gi* (minimum for mainnet)

**To attract more bids**, increase in *profiles.placement.akash.pricing*:

-> Mainnet: Try *amount: 1000000* uakt/block

-> Testnet: Try *amount: 1000000* uakt/block

### Updating Your Deployment

Need to change configuration after deploying?

-> Go to **My Deployments** in Console

-> Find your Zebra deployment

-> Click **"Update Deployment"**

-> Edit the SDL

-> Click **"Update"** and approve in Keplr

**Note**: Updating will restart your container. The node will resume from its saved state (persistent storage), but expect 1-2 minutes of downtime.

### Monitoring

#### Via Console

-> **Logs tab**: Live container logs

-> **Shell tab**: Get a shell inside the container (useful for debugging)

-> **Events tab**: Kubernetes events (mostly useless unless something's broken)


#### Via RPC (if enabled)

If you enabled RPC, you can query your node as a normal zebrad full node (because it is!)

### Closing Your Deployment

When you're done or want to stop paying:

-> Go to **My Deployments**

-> Find your Zebra deployment

-> Click **"Close Deployment"**

-> Confirm and sign in Keplr

Your 5 AKT deposit will be refunded. **Persistent storage** should be preserved by the provider, but don't rely on it - treat it like any other cloud provider.

### Troubleshooting

#### "Insufficient funds" error

You need more AKT. Fund your Keplr wallet.

#### No bids showing up

Either:

-> Your pricing is too low (increase `amount` in SDL)

-> Your resource requirements are too high for available providers (reduce CPU/memory/storage)

-> Wait longer (sometimes takes 60-90 seconds for bids to appear)


#### Deployment stuck in "pending"

The provider might be having issues. Close the deployment and try a different provider.

#### Zebra logs show "No peers connected"

This is normal for the first few minutes. Zebra will discover peers automatically. If it persists after 10+ minutes, you might have a networking issue (unlikely on Akash).

#### "Out of memory" errors in logs

You cheaped out on RAM. Close the deployment and redeploy with at least 12Gi memory (16Gi recommended).

#### Sync is taking forever

Define "forever":

-> **Hours**: Normal

-> **Days**: Also normal for mainnet from scratch

-> **Weeks**: Something's wrong, check logs for errors


### Cost Management

Monitor your spending in the Console:

-> **My Deployments** -> Your deployment -> Shows "Cost per month" estimate

-> Your Keplr wallet balance will decrease over time


When your balance runs low, Akash will auto-close your deployment. **Top up your wallet periodically** or set up alerts.

#### Reducing Costs

-> **Use Testnet** for non-production testing (50% cheaper)

-> **Lower CPU/memory** if you don't need fast sync

-> **Choose cheaper providers** (not always wise - uptime matters)


### Mainnet vs Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Start with Testnet if you're just testing the deployment process. See "Switching to Testnet" section above for configuration.

### Additional Resources

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorers**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (for provider issues)

