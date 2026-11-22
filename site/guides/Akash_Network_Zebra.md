# How to run Zebra on Akash Network

Step-by-step guide for deploying a Zebra Zcash full node on Akash.

### What You're Deploying

A full Zebra node that will:

-> Sync the entire Zcash blockchain (100GB+ for mainnet, ~40GB for testnet)

-> Cost roughly $15/month depending on AKT token prices

-> Take several hours to days to fully sync

-> Use 4 vCPUs, 16GB RAM, 350GB storage (mainnet) or 2 vCPUs, 8GB RAM, 50GB (testnet)

The awesome-akash template now pins **Zebra 7.0.0** (never `:latest`). It enables Prometheus (`9999`) and health (`8080`) internally, JSON-RPC internally for a colocated **lightwalletd** on gRPC **9067**, and feature flags `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

For a faster pruned Mainnet node, see [How to run Zakura on Akash](/guides/akash-network-zakura). For a disposable Regtest dashboard, see [Thus Spoke Zakura on Akash](/guides/thus-spoke-zakura-akash).


### How Akash publishes ports

The numbers in the SDL (`port` / `as`) are **container ports**. Zebra still listens on **8233**, lightwalletd on **9067**, health on **8080**. Those numbers are for the process and for other services in the same deployment (`zebra:8232`).

They are **not** the ports on the provider's public IP.

**Default (this template):** no dedicated IP. For each `global: true` TCP expose, the provider maps a **random high port** on a shared host to your container port. After the lease is up, Console/Air **Leases → URIs** lists the real endpoints, for example:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Peers and wallets use **those** host:port values. Copy the URI for the expose you care about (P2P vs lightwalletd). If you set `ZEBRA_NETWORK__EXTERNAL_ADDR`, set it to the mapped P2P URI (`provider.example:31482`), not `…:8233`.

**HTTP** (`as: 80` with `http_options`, used on the Thus Spoke dashboard): many providers publish an **ingress hostname** (often on 80/443) instead of a random TCP port. Open the URI for that service in a browser.

**Internal** (`global: false` or `to: service: lightwalletd`): cluster DNS only (`zebra:8232`). No public URI.

**Dedicated IPs** (`endpoints` / `kind: ip` in the SDL) are a **premium extra**. They can pin a public IP and sometimes the `as` port on that IP. These templates do **not** request one. Add that yourself later if you want a stable `host:8233`; expect extra cost and fewer bidding providers.

### Which site to use (payments)

The SDL is the same. The two Akash web UIs differ in **how you pay**.

| Site | Payments | Wallet |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Traditional web checkout (card / fiat rails Console offers) | Console account |
| [air.akash.network](https://air.akash.network) | Native Akash chain payments (AKT / ACT) | **Keplr** |

Use **Air** when you want to pay with Keplr on-chain. Use **Console** when you want a conventional web payment flow. Do not expect Keplr native settlement on Console.

### Prerequisites

**If you pay on Console (web checkout)**

1. A Console account at [console.akash.network](https://console.akash.network)
2. A payment method the Console UI accepts
3. A few minutes in the UI

**If you pay on Air (native Akash / Keplr)**

1. **Keplr** browser extension (Chrome/Brave/Firefox)
2. **AKT / ACT** in Keplr for the deposit and lease (from an exchange or IBC)
3. Open [air.akash.network](https://air.akash.network)

#### Step 1: Connect

**Console (web payments)**

-> Go to [https://console.akash.network](https://console.akash.network)

-> Sign in / complete the Console account flow

-> Use the checkout the UI presents (not Keplr on-chain)

**Air (native Akash payments)**

-> Go to [https://air.akash.network](https://air.akash.network)

-> Click **"Connect Wallet"**

-> Choose **Keplr** and approve the connection

-> Confirm your AKT/ACT balance is enough for deposit plus the lease

#### Step 2: Create Deployment

-> Click **"Deploy"**

-> Choose **"Build your template"** (or skip directly to uploading SDL)


##### Option A: Upload SDL File (Recommended)

**Web payments (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Native Akash payments with Keplr (Air)**

[Open this template on Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Option B: Use SDL Editor

If you want to manually paste [the SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copy the contents of *zebra-akash.yml*

-> Paste into the SDL editor

-> Modify as needed (see configuration section below)

-> Click **"Create Deployment"**


#### Step 3: Review and Approve Deposit

The UI will show you:

-> **Deployment deposit**: ~5 AKT (you get this back when you close the deployment)

-> **Estimated cost**: Based on your SDL pricing

On **Air**, click **"Approve"** and sign in **Keplr**. On **Console**, complete the web checkout the UI presents.

#### Step 4: Choose a Provider

After ~ 30 seconds, you'll see bids from providers. Each bid shows:

-> **Price per block** (in AKT or USDC)

-> **Monthly estimated cost**

-> **Provider details** (uptime, region, etc.)


**Don't just pick the cheapest.** Check:

-> Uptime % (aim for > 95%)

-> Region (closer to you = better latency, but doesn't matter much for blockchain nodes)

-> Audited status (green checkmark = more trustworthy)


Click **"Accept Bid"** on your chosen provider. On Air, sign in Keplr. On Console, confirm with the web payment flow.

#### Step 5: Wait for Deployment

Console will:

-> Create the lease with your chosen provider

-> Send the manifest (tells the provider what to run)

-> Start your container

This takes 1-2 minutes. You'll see status updates in the UI.

#### Step 6: Verify It's Running

Once deployed, you'll see:

-> **Services** tab: Shows your *zebra* service with status

-> **Logs** tab: Live container logs

-> **Leases** tab: Details about your deployment (DSEQ, provider, cost)


##### Check the Logs

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


#### Step 7: Get Your Node's Address

Click on the **Leases** tab, then **URIs**.

You'll see something like:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Each line is one `global: true` expose. The name includes the SDL `as` port (8233, 9067). The number after the hostname is the **provider's mapped port**, assigned at lease time. Other Zcash nodes dial `provider-hostname.com:31482`. Compact wallets use the lightwalletd URI (TLS off unless you terminate TLS yourself).

The container is still listening on 8233 / 9067. The public address is always the URI, unless you later add a dedicated IP (not in this template).

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

If you expose RPC with `global: true`, the public address is still a **lease URI** (`host:&lt;random-high-port&gt;`), not `host:8232`. With `global: false` (this template), RPC stays on the deployment network (`zebra:8232` for lightwalletd). Dedicated IP leases are a separate paid option and are not in the SDL.

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

-> Click **"Update"** (Air: sign in Keplr; Console: confirm the web payment flow)

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

-> Confirm (Air: sign in Keplr; Console: confirm in the Console UI)

Your 5 AKT deposit will be refunded. **Persistent storage** should be preserved by the provider, but don't rely on it - treat it like any other cloud provider.

### Troubleshooting

#### "Insufficient funds" error

On Air, fund Keplr with AKT/ACT. On Console, top up the Console payment method.

#### No bids showing up

Either:

-> Your pricing is too low (increase *amount* in SDL)

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

Monitor your spending in Console or Air:

-> **My Deployments** -> Your deployment -> Shows "Cost per month" estimate

-> Air: your Keplr AKT/ACT balance decreases over time. Console: your Console payment balance decreases.


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

**Akash Console** (web payments): [https://console.akash.network](https://console.akash.network)

**Akash Air** (native AKT/ACT + Keplr): [https://air.akash.network](https://air.akash.network)

**Akash Docs**: [https://akash.network/docs/](https://akash.network/docs/)

**Zebra Docs**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Zcash Explorers**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (for provider issues)

