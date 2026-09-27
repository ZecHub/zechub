<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ihe ncheta

#### Izipu Memos ezoro ezo

When sending a Z2Z (shielded-to-shielded) transaction, you're able to include a memo (message) in the transaction. This memo can be used for a number of different things.

#### Ịbịanye Aka n'Ụgwọ

Memos are primarily used for singing payments. Since shielded transactions encrypt your data, you're not able to see who sent you ZEC, and what the ZEC might've been for. Users can use the memo field to sign their name or pseudonym to let their counterpart know who the transaction was from. They can also describe what the transaction was for.

#### Izipụ Ozi

Another use case for the encrypted memo is to send a message to someone with a z-addr. These messages can be about anything, whether it be a [reminder to a friend](https://twitter.com/iansagstette/status/1542142468505870336), ma ọ bụ ozi dị nro nke kwesịrị ịnọgide na nzuzo dị ka o kwere mee](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Ihe ndị e dere n'Ịntanet na-egosi ịhụnanya

There was a person who sent their partner a love note in one of the first blocks in the Zcash blockchain. Someone found that their partner had sent them a file via a Zcash memo. This file was a ticket to a special event, overseas, that she and her distant lover had been talking about attending together. The memo was a love note.

#### Ọganihu dị elu

> **Akụkọ ihe mere eme. Ihe ngosi a anaghịzi arụ ọrụ dịka e dere ya.**
>
> Ihe ngosi dị n'okpuru na-eji zcashd, [edemede nnata](https://github.com/ZecHub/zechub/blob/main/site/tutorials/ZcashMagicWormhole/receiveOwlsWormhole.sh) ya na-agụkwa memo site na `zcash-cli`. zcashd ruru nkwụsị akpaaka nke ọgwụgwụ nkwado (End-of-Support) na 18 July 2026, ya mere edemede ahụ enweghị ike iru node na-arụ ọrụ, a bufebeghịkwa ya.
>
> Ịgụ memo e chebere site na ahịrị iwu ka na-arụ ọrụ na Zallet: `zallet rpc z_listunspent` na-eweghachi note ọ bụla e chebere a natara ya na otu mpaghara `memoStr` ahụ edemede ahụ na-agụ. Lee [Ntuziaka Ntụaka Ngwa ngwa nke Zallet](/using-zcash/zallet-quick-reference-guide) maka iwu ahụ, na [ntuziaka mbufe gaa na Zebra na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) iji wepụ node na zcashd. Zallet ka nọ na beta.
>
> Edobere ngalaba a dị ka ndekọ akụkọ ihe mere eme nke ihe ngosi Magic-Wormhole.

Here is how to use Zcash Shielded Memos with the Magic-Wormhole CLI and zcashd to securely send files from one computer to another!: 

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

#### Akụrụngwa

[The ezoro ezo Memo Ubi](https://electriccoin.co/blog/encrypted-memo-field/)


