# Zakura Node

## What is Zakura?

Zakura is a full node for the Zcash network, forked from [Zebra](Zebra_Full_Node.md) and tuned for speed. It is free and open source, and version 1.0.0 shipped on July 15, 2026. The project comes out of a collaboration between Valar Group and Project Tachyon. Its maintainers are Sean Bowe, a Zcash co-founder who leads Project Tachyon's cryptographic work, and Dev Ojha, who co-founded Osmosis and leads Valar Group.

Because it is a fork of Zebra, Zakura is written in Rust and follows the same consensus rules as Zebra and zcashd. A block that is valid on one is valid on the others. It also supports the Ironwood (NU6.3) network upgrade.

## Why run Zakura instead of Zebra?

The short answer is sync time and disk space.

The project's own benchmarks put a full sync from the P2P network at about 4 hours 20 minutes, compared to 20 hours 46 minutes for Zebra on the same hardware. That is close to a 5x difference. The bigger gains come from snapshots: Zakura publishes downloadable chain snapshots, and restoring from one skips most of the sync entirely.

| Sync method | Zebra | Zakura | Disk needed |
|---|---|---|---|
| Full P2P sync | ~20h 46m | ~4h 20m | ~300 GB (archival) |
| Archive snapshot | not offered | ~37m | ~300 GB (archival) |
| Pruned snapshot | not offered | ~1m 50s | ~11 GB |

So a pruned Zakura node goes from nothing to following the chain tip in under 2 minutes, on a laptop's worth of disk.

A few other differences matter for operators:

- Zakura has native block pruning with configurable retention, so a node that doesn't need the full chain history can run on a fraction of the disk space an archival node needs.
- A compatibility mode reproduces the old `zcashd` RPC interface. Wallets and services that were built against zcashd and never migrated to Zebra's RPC can point at Zakura and keep working.
- There is an experimental new P2P transport aiming at sub-500ms worst-case block propagation, with mempool aggregation. The developers are upfront that it has known DoS weaknesses and isn't hardened for production yet, so treat it as opt-in and experimental.

One honest caveat: the sync and snapshot numbers above come from Zakura's own announcement and haven't been independently benchmarked. They are plausible for a pruned, snapshot-based design, but your results will depend on hardware and bandwidth.

## Installing Zakura

The fastest route is the interactive installer:

```sh
curl -fsSL https://raw.githubusercontent.com/zakura-core/zakura/main/scripts/install-zakura.sh | bash
```

Or run it in Docker:

```sh
docker run -d --name zakura -p 8233:8233 -v zakurad-cache:/home/zakura/.cache/zakura zakuracore/zakura:latest
```

For Testnet, swap port `8233` for `18233`.

If you'd rather build from source, you need Rust, libclang, and a C++ compiler, the same toolchain Zebra uses. Then either install from crates.io:

```sh
cargo install --locked zakura
```

or build a pinned release straight from GitHub:

```sh
cargo install --git https://github.com/zakura-core/zakura --tag v1.0.0 zakura
```

## Hardware requirements

Zakura's README doesn't list minimum hardware specs yet. Since it shares most of its code with Zebra, Zebra's recommendations are a sensible starting point: 4 CPU cores, 16 GB RAM, 300 GB of disk, and a 100 Mbps connection. A pruned Zakura node needs far less disk than that. The 300 GB figure assumes a full archival chain, while the pruned snapshot starts at roughly 11 GB plus whatever retention window you configure. Check the [Zakura repository](https://github.com/zakura-core/zakura) for updated numbers as the project matures.

## Network configuration

Zakura listens on the same TCP ports as Zebra:

- Mainnet: 8233
- Testnet: 18233

## Links

- Announcement: https://zakura.com/announcements/introducing-zakura/
- Source code: https://github.com/zakura-core/zakura
- Website: https://zakura.com
- Twitter/X: [@ZakuraZcash](https://twitter.com/ZakuraZcash)
- Zebra, the project Zakura is forked from: [Zebra Full Node](Zebra_Full_Node.md)
