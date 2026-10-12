# Indexer Benchmark: Zaino vs Ztreamer

Zaino and Ztreamer are two indexers that serve the lightwallet gRPC protocol, the API that Zcash light wallets use to sync. This page summarises an independent, reproducible comparison of the two: whether they return the same answers, how long they take to build their index, and how fast they serve wallets.

## TL;DR

* Both indexers return correct chain data. Every response that could be checked against Zebra matched, so wallets can use either one.
* The differences found are conventions and edge cases: error codes, the byte order of one hash, how a duplicated address is counted, and a few JSON-RPC response shapes.
* Ztreamer builds its index about 6× faster on the same CPU. Zaino starts answering after 6 seconds by passing requests through to Zebra while it builds.
* Ztreamer serves faster in every scenario measured: 13–17× more blocks per second for a full wallet download.
* Much of Zaino's latency comes from one missing socket setting (`TCP_NODELAY`), which adds about 40 ms to many requests. It is a one-line fix.

## What Was Compared

| Build | Backing node | Why |
|:--|:--|:--|
| Zaino 0.10.1 | Zebra 6.4.2 (`direct` backend) | Latest stable Zaino release |
| Zaino 0.9.0 | Zebra 6.4.2 (`direct` backend) | The version measured in Ztreamer's own published comparison |
| Ztreamer v0.1.0 | Embedded Zakura node | Latest Ztreamer tag |
| Ztreamer master | Embedded Zakura 1.5.1 | What Ztreamer's install instructions build |

The two use different designs:

* **Zaino** runs as a separate process beside a [Zebra](Zebra_Full_Node.md) full node, reads Zebra's state, and keeps its own index. It is the indexer in the [Z3 stack](Z3_Stack.md). See [Zaino](Zaino.md).
* **Ztreamer** embeds a [Zakura](Zakura_Node.md) node (a Zebra fork) in the same process and keeps a compact-block index.

## How It Was Measured

* **Same data for everyone.** Every build started from the same Zcash Foundation testnet snapshot, frozen at height 4,382,897, so all of them indexed exactly the same chain.
* **Anyone can repeat it.** Everything runs on free GitHub-hosted runners: fork the repository and run one workflow.
* **Three runs per build**, each from an empty index. The server and the load generator ran on separate CPU cores.
* **Compatibility:** all 20 lightwallet-protocol gRPC methods (274 test cases), compared byte for byte across builds and checked against Zebra's JSON-RPC. The 28 JSON-RPC methods Zaino serves were checked too.
* **Performance:** time and resources to build the index, per-request latency, block-range throughput, 1 to 128 concurrent clients, and a full wallet download from Sapling activation to the tip.

## Results

### Index build

Medians of three runs:

| Build | Index complete | First answer | Index size on disk |
|:--|--:|--:|--:|
| Zaino 0.10.1 | 1,395 s | 6 s | 22.06 GiB |
| Zaino 0.9.0 | 1,211 s | 6 s | 22.06 GiB |
| Ztreamer v0.1.0 | 216 s | 210 s | 1.44 GiB |
| Ztreamer master | 159 s | 158 s | 1.44 GiB |

Zaino is usable almost at once because it forwards requests to Zebra while it builds. Ztreamer serves nothing until its index is complete. On the same CPU model, Zaino 0.10.1 took 6–6.5× as long as Ztreamer v0.1.0 and used 7.5–8× the CPU time (Zebra included).

### Serving

Medians of three runs, in blocks per second unless noted:

| Scenario | Zaino 0.10.1 | Ztreamer v0.1.0 |
|:--|--:|--:|
| Block range of 1,000 blocks | 11,414 | 179,486 |
| Full wallet download (280,000 → tip) | 11,124 | 189,041 |
| Block range of 1,000 blocks, 128 clients | 110,093 | 229,527 |
| Single block, 128 clients (requests/s) | 6,843 | 11,044 |

With 128 clients the gap narrows to about 2×, because both servers were limited to two CPU cores.

### The 40 ms floor

On Zaino, six of twelve RPCs have a median latency of about 40 ms, and every RPC has a 99th percentile around 41 ms. The cause is the way Zaino sets up its gRPC listener: the `TCP_NODELAY` socket option is never turned on, so the operating system holds back small responses for up to 40 ms.

Turning the option on from outside, without changing the Zaino binary, removed the floor. For example, `GetTreeState` dropped from 40.3 ms to 0.75 ms (Ztreamer: 0.63 ms). Bulk block streaming did not change, so the throughput gap above is real.

### Compatibility differences

* **Zaino 0.9.0** includes transparent data in `GetBlock` by default, where the protocol says the default is shielded data only. This is fixed in 0.10.1.
* **`GetSubtreeRoots`:** the `completingBlockHash` field uses opposite byte orders on the two indexers. Current wallets do not read this field.
* **Error codes:** Zaino returns `INTERNAL` for bad input; Ztreamer returns `INVALID_ARGUMENT` or `NOT_FOUND`.
* **Duplicated addresses** in `GetTaddressBalanceStream` are counted twice, except on Ztreamer master.
* **JSON-RPC:** Zaino's `getrawtransaction` with verbosity 0 returns an object instead of a hex string, unlike Zebra and zcashd.

## Limitations

* **Testnet only.** Testnet blocks are smaller than mainnet's, so absolute times and sizes are not mainnet figures. The comparison is relative, on identical inputs.
* **Shared CI machines** with several CPU models. The full report gives same-CPU comparisons for the headline numbers.
* **Not measured:** reorgs, following a live chain tip, mempool load, and TLS.

## Where to Learn More

* Full report: [zcash-indexer-bench/report/report.md](https://github.com/pearl-max468/zcash-indexer-bench/blob/main/report/report.md)
* Benchmark repository: [github.com/pearl-max468/zcash-indexer-bench](https://github.com/pearl-max468/zcash-indexer-bench)
* Raw data: [results-2026-10-10 release](https://github.com/pearl-max468/zcash-indexer-bench/releases/tag/results-2026-10-10)
* Zaino: [github.com/zingolabs/zaino](https://github.com/zingolabs/zaino)
* Ztreamer: [ztreamer.sh](https://ztreamer.sh)
