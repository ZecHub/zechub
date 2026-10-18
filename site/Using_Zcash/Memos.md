<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Memos

## TL;DR

* A memo is a short note you attach to a payment sent to a shielded address. It is encrypted, so people watching the blockchain cannot read it.
* The memo field holds up to 512 bytes of text.
* People use memos to say who sent a payment and what it was for, or to send a private message.
* Payments to transparent addresses cannot carry a memo.
* A [payment request link](/using-zcash/payment-request-uris) can fill in the memo for you so that a shop can tag each order.

## Core Explanation

### Sending Encrypted Memos

When sending a Z2Z (shielded-to-shielded) transaction, you can include a memo (message) in the transaction. This memo can be used for several different things.

### Signing Transactions

Memos are primarily used for signing payments. Since shielded transactions encrypt your data, you're not able to see who sent you ZEC and what the ZEC might've been for. Users can use the memo field to sign their name or pseudonym to let their counterpart know who the transaction was from. They can also describe what the transaction was for.

### Sending a Message

Another use case for the encrypted memo is to send a message to someone with a z-addr. These messages can be about anything, whether it be a [reminder to a friend](https://twitter.com/iansagstette/status/1542142468505870336) or a [sensitive message that needs to remain as private as possible](https://twitter.com/InsideZcash/status/1545800146352578560).

### Love Notes on the Blockchain

There was a person who sent their partner a love note in one of the first blocks in the Zcash blockchain. Someone found that their partner had sent them a file via a Zcash memo. This file was a ticket to a special event overseas that she and her distant lover had been talking about attending together. The memo was a love note.

## Visual / Analogy

Think of a shielded payment as a sealed envelope with money inside. The memo is a note folded in with the money.

The blockchain is the post office. It carries the envelope and records that it arrived, and it never opens it. The person who opens the envelope reads the note. A transparent payment is a postcard, so there is no envelope to fold a note into.

## Deep Dive

### What fits in a memo

The memo field is always exactly 512 bytes. A shorter text memo is padded with zero bytes before it is encrypted, so every memo looks the same size on-chain.

Most memos are plain UTF-8 text. [ZIP 302](https://zips.z.cash/zip-0302) also reserves memos that start with a byte of `0xF5` or higher for other kinds of data, and a memo of `0xF6` followed by zeros means "no memo".

Each shielded output in a transaction carries its own memo, so one transaction that pays several people can include a different note for each of them.

### Advanced

> **Historical. This demo no longer runs as written.**
>
> The demo below uses zcashd, and its [receiving script](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) reads memos through `zcash-cli`. zcashd reached its automatic End-of-Support halt on 18 July 2026, so that script cannot reach a running node, and it has not been ported.
>
> Reading shielded memos from the command line still works on Zallet: `zallet rpc z_listunspent` returns each received shielded note with the same `memoStr` field the script reads. See the [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) for the command, and the [migration guide to Zebra and Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) to move a node off zcashd. Zallet is still in beta.
>
> This section is kept as a historical record of the Magic-Wormhole demo.

Here is how to use Zcash Shielded Memos with the Magic-Wormhole CLI and zcashd to securely send files from one computer to another!

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Encrypted File Transfer with Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Related Pages

- [Payment Request URIs](/using-zcash/payment-request-uris): put a memo into a `zcash:` link or QR code.
- [Transactions](/using-zcash/transactions): shielded and transparent transaction types.
- [Shielded Pools](/using-zcash/shielded-pools): where the shielded notes that carry memos live.
- [Wallets](/using-zcash/wallets): use the Shielded Memo filter to find wallets that support memos.
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide): read received memos from the command line.
- [Zcash Tools for Creators](/using-zcash/creators-and-tips): tipping tools that send a message along with the tip.

### Resources

[The Encrypted Memo Field](https://electriccoin.co/blog/encrypted-memo-field/)

**Last updated:** October 2026
