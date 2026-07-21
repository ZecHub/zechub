<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Full_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Full Nodes

A Full Node is software that runs a full copy of any cryptocurrency's blockchain giving access to the protocols features.

It holds a complete record of every transaction that has occurred since genesis and is therefore able to verify the validity of new transactions and blocks that are added to the blockchain.

## Zcashd

> **Note:** zcashd is being deprecated. The Electric Coin Company has [formally announced](https://z.cash/support/zcashd-deprecation/) that zcashd is being retired, with its full-node role replaced by [Zebra](https://github.com/ZcashFoundation/zebra) (`zebrad`) and its wallet role by [Zallet](https://github.com/zcash/zallet). For new deployments, use Zebra (see below). If you already run a zcashd node, follow the [Migration Guide: zcashd to Zebrad/Zallet](https://zechub.wiki/migration-guide-zcashd-to-zebrad-zallet).

zcashd was the original Full Node implementation for Zcash, developed and maintained by the Electric Coin Company. The build instructions below are retained for reference and for operators migrating away from zcashd.

Zcashd exposes a set of API's via its RPC interface. These API's provide functions that allow external applications to interact with the node.

[Lightwalletd](https://github.com/zcash/lightwalletd) is an example of an application that uses a full node to enable developers to build and maintain mobile-friendly shielded light wallets without having to interact directly with Zcashd.

[Full list of supported RPC commands](https://zcash.github.io/rpc/)

[The Zcashd book](https://zcash.github.io/zcash/)


### Start up a Node (Linux)

- Install Dependencies 

      sudo apt update

      sudo apt-get install \
      build-essential pkg-config libc6-dev m4 g++-multilib \
      autoconf libtool ncurses-dev unzip git python3 python3-zmq \
      zlib1g-dev curl bsdmainutils automake libtinfo5

- Clone latest release, checkout, setup and build:

      git clone https://github.com/zcash/zcash.git

      cd zcash/

      git checkout v5.4.1
      ./zcutil/fetch-params.sh
      ./zcutil/clean.sh
      ./zcutil/build.sh -j$(nproc)

- Sync Blockchain (may take several hours)

    To start the node run:

      ./src/zcashd

- Private Keys are stored in ~/.zcash/wallet.dat

[Guide for Zcashd on Raspberry Pi](https://zechub.notion.site/Raspberry-Pi-4-a-zcashd-full-node-guide-6db67f686e8d4b0db6047e169eed51d1)


## Zebra

Zebra is an independent, production-ready full node implementation of the Zcash protocol, created by the Zcash Foundation and written in Rust. As zcashd is retired, Zebra (`zebrad`) is the recommended full node for new deployments.

Zebra validates blocks and transactions, participates in the peer-to-peer network, and exposes an RPC interface for applications. The wallet is a separate component now: [Zallet](https://github.com/zcash/zallet) runs against a Zebra node and handles keys and balances. This replaces zcashd, which bundled the node and wallet in a single process.

To serve shielded light wallets, the node runs alongside an indexer, either the established [lightwalletd](https://github.com/zcash/lightwalletd) or the newer [Zaino](https://zechub.wiki/zaino).

Be sure to read the Zebra book for set-up instructions, and join the R&D Discord server for support. 

[Github](https://github.com/ZcashFoundation/zebra/)

[The Zebra Book](https://zebra.zfnd.org) 

[Discord](https://discord.gg/uvEdHsrb)



## The Network

By running a full node you are helping to strengthen the zcash network by supporting its decentralization. 

This helps to  prevent adversarial control and keep the network resilient to some forms of disruption.

DNS seeders expose a list of other reliable nodes via a built-in server. This allows transactions to propagate throughout the network. 

### Network Stats

These are examples platforms which allow access to Zcash Network data:

[Zcash Block Explorer](https://zcashblockexplorer.com)

[Coinmetrics](https://docs.coinmetrics.io/info/assets/zec)

[Blockchair](https://blockchair.com/zcash)

You can also contribute to the development of the network by running tests or proposing new improvements & providing metrics. 



### Mining

Miners require full nodes to access all mining related rpc's such as getblocktemplate & getmininginfo. 

Zcashd also enables mining to shielded coinbase. Miners and mining pools have the option to mine directly to accumulate shielded ZEC in a z-address by default. 

Read [Mining Guide](https://zcash.readthedocs.io/en/latest/rtd_pages/zcash_mining_guide.html) or Join the Community Forum page for [Zcash Miners](https://forum.zcashcommunity.com/c/mining/13).

### Privacy 

Running a full node allows you to independently verify all transactions and blocks on the Zcash network.

Running a full node avoids some privacy risks associated with using third-party services to verify transactions on your behalf.

Using your own node also permits connecting to the network via [Tor](https://zcash.github.io/zcash/user/tor.html).
This has an added advantage of allowing other users to connect privately to your node .onion address.


**Need Help?**

Read [Support Documentation](https://zcash.readthedocs.io/en/latest/)

Join our [Discord Sever](https://discord.gg/zcash) or reach out to us on [twitter](https://twitter.com/ZecHub)



