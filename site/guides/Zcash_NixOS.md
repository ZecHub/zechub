<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_NixOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Running Zcash Services on NixOS (zcash.nix)

[zcash.nix](https://github.com/cypherpunktech/zcash.nix) is a set of Nix packages and NixOS modules for the Zcash node stack, published by [Cypherpunk](https://cypherpunk.com/) under the MIT licence. Every package is built from a pinned upstream tag or commit, and every service runs as a sandboxed systemd unit. On NixOS, a full node with an indexer next to it is a few lines of configuration instead of a manual build, a user account and a hand-written service file.

## TL;DR

* One flake gives you `zebrad`, Zakura, Zaino, Zinder, lightwalletd, lightwalletd-rs, Zallet, Ztreamer and zpay, built from pinned source for `x86_64-linux`, `aarch64-linux` and `aarch64-darwin`.
* On NixOS, `services.zcash.<service>.<name>` declares one instance: its own systemd unit `<service>-<name>`, its own state directory `/var/lib/<service>-<name>`, and its own user. A Mainnet and a Testnet node can run side by side.
* The units carry the same kind of systemd sandboxing as the [Hardened Zebra Full Node](/guides/hardened-zebrad) guide, written once for every service. RPC stays on localhost with cookie authentication, and `openFirewall` opens only the peer-to-peer port.
* An indexer can follow a node on the same host: it starts after the node's RPC answers and reads the node's cookie through systemd, so the two keep separate users.
* An optional binary cache saves hours of compiling. Using it means trusting the project's CI. Without it, everything builds from source.

## What it packages

Versions pinned on `main` as of 18 November 2026. The project bumps them as upstream releases land (on 17 November alone: Zebra 7.1.0, Zakura 1.8.9, Zinder 0.16.4), so check [`packages/`](https://github.com/cypherpunktech/zcash.nix/tree/main/packages) for the current pins.

| Package | What it is | Pinned | Binaries |
| --- | --- | --- | --- |
| `zakura` | [Zakura](/zcash-tech/zakura-node) full node | 1.8.9 | `zakurad`, `zakura-prune-state`, `zakura-rollback-state` |
| `zebra` | The Zcash Foundation's [Zebra](/zcash-tech/zebra-full-node) node | 7.1.0 | `zebrad` |
| `zaino` | Zingo Labs' indexer and light-wallet server ([Zaino](/zcash-tech/zaino)) | 0.10.2 | `zainod` |
| `zinder` | The Zcash Foundation's alpha indexer ([Zinder](/zcash-tech/zinder)) | 0.16.4 | `zinder-ingest`, `zinder-projector`, `zinder-query`, `zinder-compat-lightwalletd` |
| `ztreamer` | Light-wallet server with an embedded Zakura node | unstable snapshot (17 November 2026) | `ztreamerd` |
| `lightwalletd` | The Go light-client server ([Lightwallet Nodes](/zcash-tech/lightwallet-nodes)) | 0.6.1 | `lightwalletd` |
| `lightwalletd-rs` | A Rust light-client server | 0.2.0 | `lightwalletd-rs` |
| `zallet` | The RPC wallet that replaces zcashd's wallet | 0.1.0-beta.3 | `zallet` |
| `zpay` | Payments facilitator for x402 and MPP | unstable snapshot (21 July 2026) | `zpay-runtime`, `zspend-runtime` |

There is no zcashd package: zcashd is retired (see [Full Nodes](/zcash-tech/full-nodes)).

## Try a binary without installing

With Nix installed (flakes enabled), any package runs straight from the repository:

```console
$ nix run github:cypherpunktech/zcash.nix#zebra -- --version
$ nix run github:cypherpunktech/zcash.nix#zakura -- --version
```

## Run a node on NixOS

Add the flake as an input and import its module in your system flake:

```nix
inputs.zcash-nix.url = "github:cypherpunktech/zcash.nix";
```

```nix
imports = [ zcash-nix.nixosModules.default ];
nixpkgs.overlays = [ zcash-nix.overlays.default ];   # optional: puts the packages in pkgs
```

A Zebra Mainnet node, with its RPC on localhost:

```nix
services.zcash.zebra.mainnet = {
  enable = true;
  openFirewall = true;                          # the P2P port only, never RPC
  settings.rpc.listen_addr = "127.0.0.1:8232";  # freeform zebrad.toml
};
```

This creates the unit `zebra-mainnet` with its state in `/var/lib/zebra-mainnet`. `settings` is written out as the node's own TOML file, so every option from the [Zebra book](https://zebra.zfnd.org) works there. Zakura works the same way under `services.zcash.zakura.<name>`. For a Testnet node next to it, add a second instance with `settings.network.network = "Testnet"` and a different RPC port.

`sudo systemctl status zebra-mainnet` and `journalctl -u zebra-mainnet -f` show what it is doing.

## Add an indexer for light wallets

A node alone doesn't serve light wallets (see [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). Zaino can follow the node above:

```nix
services.zcash.zaino.mainnet = {
  enable = true;
  node = "zebra-mainnet";   # the node's unit name
  settings = {
    grpc_settings.listen_address = "127.0.0.1:8137";
    validator_settings.validator_jsonrpc_listen_address = "127.0.0.1:8232";
  };
};
```

With `node` set, the Zaino unit starts once the node's RPC answers, restarts when the node restarts, and authenticates with the node's RPC cookie, which systemd hands over as a credential. lightwalletd and lightwalletd-rs have their own modules (`services.zcash.lightwalletd.<name>`, `services.zcash.lightwalletd-rs.<name>`). They won't build without a TLS certificate and key (`tls.certFile`, `tls.keyFile`). The `insecureNoTLS` switch exists, but its own documentation warns that wallets send their viewing-key query patterns over that connection, so use it only behind a TLS-terminating reverse proxy on the same host, or in a test.

The full list of options is in [`docs/options.md`](https://github.com/cypherpunktech/zcash.nix/blob/main/docs/options.md).

## Options worth knowing

* **`services.zcash.binaryCache.enable`** adds `cypherpunktech.cachix.org` as a substituter. Without it, Zebra alone can take half an hour or more to compile. The module adds it through `nix.settings` because the flake's own `nixConfig` is silently ignored for users Nix doesn't trust. It is off by default, so importing the module never adds a trust root on its own.
* **`zakura.<name>.snapshot.enable`** restores a published chain-state snapshot instead of syncing from genesis. A node restored this way trusts the snapshot's publisher for the history it contains; a node that syncs from the network checks it. The download sits next to the state before it is unpacked, so the disk needs room for both once.
* **`zakura.<name>.watchdog.enable`** restarts a node that is running but has stopped following the chain. It polls the `/ready` health endpoint, so `settings.health.listen_addr` must be set, and it only acts after the node has been ready once, so a node syncing from genesis isn't restarted in a loop. `watchdog.stallAfter` (default 1800 seconds) sets how long `/ready` must fail first.
* **`services.zcash.zallet.acceptBetaRisk`** must be set to `true` before the Zallet module builds at all. Zallet is beta software that holds spending keys, and upstream advises against using it for significant funds.
* **`user`**: by default each instance runs as a systemd `DynamicUser`. Set a fixed user only when another service has to read the instance's files.
* If you turn cookie authentication off while the RPC listens on a non-loopback address, the build warns that the RPC is unauthenticated and reachable from the network.

## What the hardening covers

Every service shares one hardening block ([`modules/hardening.nix`](https://github.com/cypherpunktech/zcash.nix/blob/main/modules/hardening.nix)), with a comment explaining each line. In short: the service can write only to its own state directory, `/home` and `/root` are invisible, it starts with no capabilities and can't gain any, kernel tunables, modules and logs are off limits, and it can open only IPv4 and IPv6 sockets. Each module is also booted in a VM test in CI.

## What you are trusting

The project's [SECURITY.md](https://github.com/cypherpunktech/zcash.nix/blob/main/SECURITY.md) is unusually direct about this, and worth reading before you run a node from it:

* **Pinned, not audited.** Each package pins a tag or commit and the hash of its source tree, plus the hash of its vendored dependencies, so a moved tag or a changed tarball fails the build instead of building something else. The packaging does not review upstream code.
* **Signed upstream tags are checked where they exist.** Today that's Zinder and lightwalletd-rs; the other upstreams sign binaries or nothing, so for them pinning proves the source never changed after it was pinned, not that it came from the maintainer.
* **Known vulnerable dependencies are listed, not patched.** Daily `cargo-audit` and `govulncheck` runs report advisories in each upstream's own lockfile. The accepted ones, with reasons and review dates, are in [`scripts/advisories-accepted.txt`](https://github.com/cypherpunktech/zcash.nix/blob/main/scripts/advisories-accepted.txt).
* **Upstream test suites don't run** (they need live peers and chain state). Each binary is run once and each module is booted in a VM.
* **The binary cache serves what CI built.** Only CI on pushes to `main` can write to it; pull requests and forks can't. A cached binary hasn't necessarily passed its smoke test. To check one without trusting the cache, rebuild it locally (`nix build --rebuild`) and compare.
* **Where to report.** A packaging problem goes to a security advisory on the zcash.nix repository. A vulnerability in Zebra, Zallet, Zaino or another packaged project goes upstream, not to zcash.nix.

## Common Mistakes

* **Expecting `nixConfig` to enable the cache.** For an untrusted Nix user, `--accept-flake-config` is silently ignored, and the first sign is a very long compile. Use `services.zcash.binaryCache.enable` (or your own `nix.settings`) instead.
* **Running only a node and expecting light wallets to connect.** Add Zaino, Zinder's lightwalletd adapter, or lightwalletd next to it.
* **Exposing RPC to fix a connection problem.** Keep RPC on `127.0.0.1` and run indexers on the same host with `node` set. `openFirewall` deliberately never opens the RPC port.
* **Turning on the watchdog without a health address.** The module stops with an error until `settings.health.listen_addr` is set.
* **Treating a pinned version as a recommendation.** Zinder is alpha, Zallet is beta and Ztreamer is an unreleased snapshot. Pinning makes them reproducible, not stable.

## Related pages

* [Full Nodes](/zcash-tech/full-nodes) - what a full node does, and which implementations exist
* [Hardened Zebra Full Node](/guides/hardened-zebrad) - the same kind of systemd sandbox, set up by hand on Ubuntu
* [Zakura Node](/zcash-tech/zakura-node) - the second node implementation, forked from Zebra
* [Zaino](/zcash-tech/zaino) and [Zinder](/zcash-tech/zinder) - the indexers zcash.nix can run next to a node
* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) - the servers that light wallets query
* [Migration Guide: zcashd to zebrad/Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) - moving off the retired zcashd

## Where can I learn more?

* [zcash.nix on GitHub](https://github.com/cypherpunktech/zcash.nix) - README, CONTRIBUTING and SECURITY
* [All NixOS options](https://github.com/cypherpunktech/zcash.nix/blob/main/docs/options.md)
* [NixOS manual: flakes and modules](https://nixos.org/manual/nixos/stable/)
