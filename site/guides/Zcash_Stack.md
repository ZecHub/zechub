<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Stack: Run a Light Wallet Server on Kubernetes or Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) is the open-source deployment kit from the team behind zec.rocks. It packages a Zcash full node, a light wallet server and optional extras (Zaino, a block explorer, a Tor hidden service, a DNS seeder, zecd, a gRPC-web proxy for browser wallets) as a Helm chart for Kubernetes and as Docker Compose files. The zec.rocks lightwalletd servers all run from this chart. The project is funded by [Zcash Community Grants](https://zcashcommunitygrants.org/).

This page summarises what the kit deploys, what you need before installing it, and the settings that matter most. It follows chart version **0.4.9** (released November 13, 2026). The project's own [chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) and [workshop notes](https://github.com/zecrocks/zcash-stack/tree/main/docs) are the reference; read them before you run anything in production.

## TL;DR

- **Two ways in.** A Helm chart for Kubernetes (k3s on your own NVMe hardware is the main target; GKE Standard and Autopilot also work) and Docker Compose files for a single machine. The workshop recommends Docker if you are new to running servers and Kubernetes if you already run fleets.
- **One chain node plus a light wallet server.** The recommended setup is Zebra + lightwalletd. Zakura can replace Zebra as the backend, and Zaino can replace or sit beside lightwalletd.
- **Plan for about 600 GiB of disk.** Zebra's chain state was ~260 GiB in June 2026 and is growing; the light wallet cache adds ~17 GiB. A full sync takes days, so the chart can restore from a published snapshot instead.
- **The chart pins image versions.** In 0.4.9 that is Zebra 7.0.0 (follows NU7), lightwalletd v0.6.1, Zakura 1.8.6 and Zaino 0.8.0. Update the chart before network upgrades and before a Zakura release reaches its end-of-support height.
- **Register your server.** Public operators can add their server to the [hosh.zec.rocks](https://hosh.zec.rocks/zec) monitor so wallets and users can see whether it is up.

## What gets deployed

Every component is a switch in the chart's [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml). Only lightwalletd is on by default, and it needs a chain node, so the example files turn Zebra on as well.

| Component | Image in chart 0.4.9 | Default | What it does |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | off (on in the examples) | Full node; validates the chain and serves RPC to everything else |
| Zakura | `zakuracore/zakura:1.8.6` | off | Zebra fork; a drop-in backend for lightwalletd or Zaino instead of Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | on | Light wallet server (gRPC) for mobile and desktop wallets |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | off | Rust indexer that also serves light wallets |
| Block explorer | `emersonian/zcash-explorer:v0.0.6` | off | Web explorer reading the node's JSON-RPC (Zaino can't back it: it serves gRPC only) |
| Tor | `osminogin/tor-simple:0.4.9.16` | off | Publishes lightwalletd or Zaino as a `.onion` service |
| DNS seeder | `zfnd/dnsseeder:v1.8.0` | off | Helps new nodes find peers |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | off | Shielded-first wallet server (see [zecd](/zcash-tech/zecd)) |
| gRPC-web proxy | `envoyproxy/envoy:v1.40.2` | off | Lets browser wallets talk to lightwalletd, which browsers can't reach over raw gRPC |
| WebZjs wallet | `ghcr.io/zecrocks/webzjs-wallet` | off | Browser wallet; needs the gRPC-web proxy on the same host |

Two version notes. Zaino upstream is at [0.10.1](https://github.com/zingolabs/zaino/releases) while the chart still ships the 0.8.0 image, so check `values.yaml` before relying on newer Zaino behaviour. And Zakura nodes stop on Mainnet at a per-release end-of-support height: for 1.8.6 that is block 3,643,309, around December 5, 2026, and x86-64 builds since 1.8.0 refuse to start on CPUs without BMI2 and ADX. The [Zakura Node](/zcash-tech/zakura-node) page covers both.

## Kubernetes: before you install

The chart deploys against three things you set up once per cluster.

1. **An ingress controller.** The chart creates a standard Kubernetes `Ingress` and defaults to the `nginx` class; ingress-nginx is recommended because it handles gRPC the same way on k3s and GKE. On k3s, either install k3s with `--disable traefik` or keep Traefik and set `ingress.className: traefik` plus `ingress.backendProtocol: GRPC` (the chart then emits a Traefik `IngressRoute`, because a plain Ingress through Traefik returns HTTP 500 on gRPC). On GKE, the built-in `gce` ingress class can't route gRPC to lightwalletd or Zaino.
2. **cert-manager and a ClusterIssuer** for automatic Let's Encrypt certificates (`examples/cluster-issuer.yaml`; test against the staging issuer first). On GKE Autopilot, install cert-manager with `--set global.leaderElection.namespace=cert-manager`, or issuer creation fails with an x509 "unknown authority" error. You can skip cert-manager and point `<service>.ingress.tls.secretName` at your own certificate instead.
3. **A StorageClass.** `local-path` is fine on k3s with NVMe. On GKE, give Zebra a provisioned-IOPS class (the repo ships a Hyperdisk example) and raise the regional disk quota first: new GKE projects allow only 500 GB of SSD and 500 GB of Hyperdisk per region, and a chain node wants 300 to 500 GB, so the volume otherwise sticks in `Pending` with `QUOTA_EXCEEDED`. `storageClassName` can't be changed on an existing StatefulSet without recreating the volume.

Then point a DNS record for each hostname at the ingress controller's external IP. If you don't have DNS yet, list an [sslip.io](https://sslip.io) name such as `203-0-113-7.sslip.io` next to your real hostname: it resolves to the embedded IP, so a certificate is issued straight away. Keep your own hostname as the primary one for permanent servers.

## Kubernetes: install

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

The [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) example turns on Zebra, connects lightwalletd to it, gives lightwalletd a 40 GiB cache and a TLS ingress, and keeps the node's RPC inside the cluster. Change the placeholder RPC username and password before installing. Other examples cover testnet, GKE, GKE Autopilot with high availability, a Tor hidden service and the sslip.io bootstrap.

To upgrade, run `helm repo update`, preview the change with the helm-diff plugin (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`), then `helm upgrade` with the same arguments. If you are coming from a 0.0.x chart, read [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md) first: 0.1.0 replaced the old Traefik setup with standard Ingress and cert-manager, and the values layout changed.

## Sizing

| | Steady state | Initial sync | Disk |
|:--|:--|:--|:--|
| Zebra | ~0.1 vCPU, 1.6 GiB | CPU, IOPS and memory heavy | ~260 GiB (June 2026) and growing; chart default 500 GiB |
| lightwalletd | ~0.15 vCPU, 165 MiB | builds its cache block by block | ~17 GiB; chart default 40 GiB |

The whole stack requests about 1.5 vCPU and 4.5 GiB of memory. For one machine the chart suggests 8 vCPU, 32 GiB of RAM and about 1 TB of NVMe (on GKE, an `n2-standard-8` with a 500 GiB Hyperdisk or pd-ssd volume). The default requests already satisfy GKE Autopilot's minimums, and CPU limits are left off so the sync can burst.

## Settings worth knowing

**Snapshot restore.** Set `<chain>.initSnapshot.enabled: true` (with `initSnapshot.url`, `gs://` or `https://`) to start from a published snapshot instead of syncing from genesis. The restore marks its progress, redoes an interrupted download cleanly and never wipes a healthy volume from an earlier install. A snapshot is a trust shortcut: blocks after it are still validated, and a bad snapshot shows up as blocks that fail to validate. The workshop puts a from-scratch sync at about 10 days and a snapshot start at about 10 hours.

**Scaling and zero downtime.** lightwalletd and Zaino are thin caches in front of the node, so run `replicas: 2` for rolling updates without downtime (a PodDisruptionBudget is added automatically when replicas are above 1). Chain nodes are not for load: each replica is another full node with its own volume and its own sync, so run one, or two for redundancy.

**Inbound peers.** By default Zebra only makes outbound connections. `zebra.p2pPublic.enabled: true` accepts inbound peers on port 8233 (18233 on testnet) and advertises your address; pick `externalAddrFrom: hostIP` on bare metal and k3s, `nodeExternalIP` on clouds where the node's own IP is private, or `loadBalancer` with a reserved static IP on GKE Autopilot.

**TLS and gRPC.** TLS ends at the ingress and plain HTTP/2 runs inside the cluster, so several hostnames can point at one lightwalletd. Keep `path: /` with `pathType: Prefix`, because gRPC method paths need it. If the first certificate fails because of the HTTPS redirect, issue it with the staging issuer or temporarily set `ingress.tls.sslRedirect: "false"`.

**Tor hidden service.** Useful when your cluster has no public IP or domain:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Read the address with `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` and test it through a local Tor client with [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Around network upgrades.** Zebra may ban peers still on old versions and stall, logging that chain updates have stalled. Its ban list lives in memory, so `kubectl delete pod zebra-0` clears it; the pod comes back on the same chain data without a resync.

## Docker Compose

For a single machine, clone the repo and start the default file from the `docker/` folder:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` runs Zebra, lightwalletd and [Watchtower](https://containrrr.dev/watchtower/) on x86; `compose.arm.yaml` does the same on ARM hosts. Watchtower pulls new images automatically, and the default file uses the `zfnd/zebra:latest` tag, so the node follows new Zebra releases without manual upgrades. `compose.zaino.yaml` swaps lightwalletd for Zaino, but it pins an old community image (`emersonian/zcash-zaino:0.1.2-zr4`), so check it before you use it. Other files add a Caddy TLS front end, a VPS proxy and an autossh tunnel for nodes at home.

Set `LIGHTWALLETD_DONATION_ADDRESS` in the `.env` file to your own unified address to publish it as the server's donation address. Running `./download-snapshot.sh` from the `docker/` folder before the first `docker compose up` downloads a chain snapshot instead of syncing from scratch.

## Connecting and monitoring

The workshop's second class covers how to expose the server: a public static IP, hiding your home IP behind an SSH tunnel to a VPS or Tailscale Funnel, or a Tor-only server. Test the result by pointing a wallet at it (in ZODL, Advanced Settings; see [Changing the server in your wallet](/zcash-tech/lightwallet-nodes)) or by calling `GetLightdInfo` with a gRPC client.

For monitoring, the third class lists the manual Docker commands and suggests registering a public server with [hosh](https://hosh.zec.rocks/zec), the zec.rocks uptime monitor. Registration is a pull request adding your hostname and port to hosh's server list. Help with any step is offered on the [zec.rocks workshops forum](https://workshops.zec.rocks).

## Common mistakes

**Installing lightwalletd without a chain node.** lightwalletd reads from Zebra (or Zakura). Turn one on, or start from an example file that does.

**Leaving the example RPC credentials in place.** The examples ship placeholders. RPC stays inside the cluster, but change them anyway.

**Running a chain node on GKE's default disk quota.** The volume never binds. Raise the regional quota before installing.

**Scaling Zebra for load.** Every Zebra replica is a full extra sync. Scale lightwalletd or Zaino instead.

**Pinning an old chart through a network upgrade.** A node that predates an upgrade stops following Mainnet after it (Zebra needs 7.0.0 or later since NU7). Run `helm repo update` and upgrade the chart before activation heights and Zakura end-of-support heights.

## Related Pages

- [Zcash Lightwallet Nodes](/zcash-tech/lightwallet-nodes): what a light wallet server can and cannot see, and public servers.
- [Zebra Full Node](/zcash-tech/zebra-full-node): the validator this stack runs.
- [Zakura Node](/zcash-tech/zakura-node): the Zebra fork the chart can run instead.
- [Zaino](/zcash-tech/zaino): the Rust indexer.
- [zecd](/zcash-tech/zecd): the wallet server the chart can add.
- [Zcash Node RPC and Indexing](/guides/zcash-node-rpc-and-indexing): Zebra RPC, Zallet and indexers.
- [How to run Zebra on Akash Network](/guides/akash-network-zebra): another way to host a node.

## Resources

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repository, releases and examples)
- [Zcash Stack Helm chart README](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Workshop notes: Sync, Connect, Observe](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Artifact Hub listing](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (public server monitor)

**Last updated:** November 2026 (chart 0.4.9)
