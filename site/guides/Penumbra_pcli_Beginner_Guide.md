<a href="https://github.com/zechub/zechub/edit/main/site/guides/Penumbra_pcli_Beginner_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Penumbra `pcli` Beginner Guide

`pcli` is Penumbra's command-line wallet. It can create a wallet, sync private wallet state, show balances, send assets, stake, vote, swap, and withdraw over IBC.

Penumbra commands and network details can change. Compare this guide with the current Penumbra docs before using real funds.

## What you need

- Linux or macOS.
- A current `pcli` release.
- A Penumbra RPC endpoint or your own Penumbra node.
- A safe place to store your seed phrase.

Penumbra is private by default. `pcli` includes a view service that syncs with the chain and scans with your viewing key so your wallet can detect notes that belong to you.

## Install `pcli`

Download current binaries from the Penumbra releases page, or use the install script:

```sh
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/penumbra-zone/penumbra/releases/latest/download/pcli-installer.sh | sh
pcli --version
```

The installer places the binary in `$HOME/.cargo/bin/`. If your shell cannot find `pcli`, add that directory to your `PATH`.

## Create a wallet

For a local software wallet:

```sh
pcli init soft-kms generate
```

To import an existing seed phrase:

```sh
pcli init soft-kms import-phrase
```

The `soft-kms` backend is convenient, but it stores key material locally. For better safety, use encryption:

```sh
pcli init --encrypted soft-kms generate
```

or re-encrypt an existing config:

```sh
pcli init re-encrypt
```

Save your seed phrase offline. Never share it.

## Get an address

Penumbra wallets control many numbered accounts. To show the address for account `0`:

```sh
pcli view address 0
```

Give this address to someone who wants to send you funds.

## Sync wallet state

After receiving funds, sync your local wallet view:

```sh
pcli view sync
```

Syncing also happens automatically, but running `sync` first can make later commands faster.

## Check balances

```sh
pcli view balance
```

For staking-related balances:

```sh
pcli view staked
```

## Send funds

Check your balance first:

```sh
pcli view balance
```

Then send an asset:

```sh
pcli tx send 10 penumbra --to penumbrav2t...
```

Confirm the recipient address and asset before approving the transaction.

## Stake

List validators:

```sh
pcli query validator list
```

Delegate:

```sh
pcli tx delegate 10 penumbra --to penumbravalid...
```

To undelegate, use `pcli tx undelegate` with the delegation-token amount. After the waiting period, claim the undelegated funds:

```sh
pcli tx undelegate-claim
```

## Swap

To swap one asset into another:

```sh
pcli tx swap --into gm 1 penumbra
```

Only swap assets you understand. Liquidity and pricing can change.

## IBC withdrawals

View available IBC channels:

```sh
pcli query ibc channels
```

Use only channels you trust. Incorrect or unsupported IBC routes may fail or send assets somewhere unexpected.

## Safety notes

- Keep your seed phrase offline.
- Keep `pcli` updated to the version expected by the network.
- Use encrypted custody for real funds.
- Test with small amounts first.
- Confirm addresses and IBC channels before sending.
- Consider Prax if you prefer a browser-wallet flow.

## Related pages

- [Penumbra](/privacy-tools/penumbra)
- [Shielded ecosystems comparison](/research/shielded-ecosystems-comparison)
- [Zcash wallet privacy decision tree](/using-zcash/zcash-wallet-privacy-decision-tree)

## Resources

- [Penumbra Guide: Using `pcli`](https://guide.penumbra.zone/usage/pcli)
- [Penumbra Guide: Installing `pcli`](https://guide.penumbra.zone/usage/pcli/install)
- [Penumbra Guide: Generating a wallet](https://guide.penumbra.zone/usage/pcli/wallet)
- [Penumbra Guide: Software custody backend](https://guide.penumbra.zone/usage/pcli/wallet/softkms)
- [Penumbra Guide: Viewing balances](https://guide.penumbra.zone/usage/pcli/balance)
- [Penumbra Guide: Sending transactions](https://guide.penumbra.zone/usage/pcli/transaction)
