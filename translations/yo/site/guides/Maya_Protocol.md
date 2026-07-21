# Maya Decentralized Exchange (Àdàpòsòpò Àkànlò)

---

## Ẹ̀kọ́ àkànṣe


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    jẹ́ kíFullScreen
    loading="lazy"
  />
</div>


## Kí ni Ìlànà Maya?

Maya jẹ́ [ìpínwó tí a kò dá dúró]](https://nym.com/blog/what-is-dex) O le, fun apẹẹrẹ, paṣipaarọ Bitcoin (BTC) lori Bitcoin blockchain pẹlu Ethereum (ETH) lori Ethereum blockchain ni ọna ti o rọrun, laisi idaduro awọn ohun-ini tabi ṣiṣe eyikeyi awọn alaṣẹ aarin tabi Mọ Awọn ilana Onibara Rẹ (KYC).

Maya Protocol was developed using the Cosmos Software Development Kit (Cosmos SDK) and operates on a Proof of Bond (PoB) consensus mechanism. The protocol is upheld by "Node Operators," who stake capital into the system and earn returns as a reward for their contribution and efforts. Essentially, nodes are computers running software that validates user swaps and oversees assets in designated addresses across different blockchains.

To complete a swap, the supported cryptocurrency must be received in one of Maya's addresses, sent by a user, and then an equivalent amount is sent from another of Maya's addresses on a different blockchain. This process is managed and approved by at least two-thirds of the nodes, particularly ensuring that the funds are properly received.

Ni ọna yii, awọn olumulo le firanṣẹ iru ami kan lori blockchain kan ki o gba iru oriṣiriṣi lori blockchain miiran, gbogbo abinibi ati laisi lilo awọn ami ti a fi sinu.

## Kí Ni Ẹ̀rí Ìdè?

Proof of Bond (PoB) is a consensus mechanism where node operators must commit a bond (usually in the form of the network's native token) to participate in the network. This bond acts as a form of economic security, ensuring that nodes act honestly and maintain the network's integrity2. If a node tries to act maliciously or fails to perform its duties, its bond can be slashed, meaning a portion of it is taken away as a penalty.

In Maya Protocol, this mechanism helps to produce economic value from the staked resources of node operators, increasing capital efficiency. Similarly, in Thorchain, node operators bond RUNE (the native token) to secure the network and ensure cooperation among participants.

## Ìyàtọ̀ láàrin Maya àti THORChain

Maya jẹ ẹ̀ka ti THORChain ṣùgbọ́n ó kún fún àwọn ohun tuntun àti iṣẹ́-ṣiṣe tí ó ń ṣiṣẹ́ bí àyípadà ńlá.

### Awọn Nọmba Owo-owo

Rather than following the Pure Bond Model, Maya is contemplating a shift to a Liquidity Nodes model. In this system, nodes are enabled to directly contribute liquidity, bonding it to the network. This approach means node operators face a significant risk: if they misuse funds, they incur losses, acting as a powerful deterrent. As a result, node operators use Liquidity Units from Liquidity Pools, which simultaneously provide liquidity and bolster network security.

### Ìdáàbòbò fún Àwọn Àdánù Tí Kì Í Pẹ́

A system that protects liquidity providers from the temporary loss (LPs) they may experience when providing liquidity, due to the constant fluctuations in the prices of crypto assets.
ILP holds 10% of the $CACAO supply (10 million $CACAO) and is continuously replenished by 10% of the protocol fees. ILP becomes active 50 days after a liquidity deposit, with coverage capped at 100%.

The duration of ILP coverage depends on the performance of the ASSET and $CACAO. Full coverage is achieved after 150 days if ASSET performs better, and after 450 days if $CACAO performs better. ILP is both paid out and reset upon complete withdrawal but is not affected by partial withdrawals. For top-ups, ILP is reset but not paid out.

### Àpẹẹrẹ ìkápá tó yàtọ̀

The Liquidity Auction was a 21-day event designed to distribute $CACAO tokens among participants. During the event, users deposited supported assets to a specific address. At the conclusion of the auction, 90% of the $CACAO tokens were allocated to participants in proportion to their liquidity contributions, while the remaining 10% was allocated to the ILP reserve. The participants became liquidity providers, with their deposited assets and $CACAO tokens placed into Maya's pools, enabling them to earn a share of the generated fees.

### Ọ̀nà Mìíràn Láti Máa Lo Àwọn Ìpamọ́

At the genesis of Maya Protocol, the available CACAO reserves were only 10% of the total supply, compared to 44% for THORChain, and were primarily intended for Impermanent Loss Protection (ILP). Maya does not have block emissions; and if Protocol Owned Liquidity and Lending are implemented, they will feature a different design, as in THORChain, these aspects are closely integrated with the Reserves.

Síbẹ̀síbẹ̀, láìfi àwọn ìyàtọ̀ rẹ̀ pè, Maya tún ṣiṣẹ́ gẹ́gẹ́ bí àfikún ojútùú sí THORChain, tí ó ńfúnni ní àpòpòpòpọ̀, ìmúgbòòrò àti ìfọwọ́sílẹ̀, àti mímú àwọn nẹ́tàkì tuntun tí kò sí nínú ìmúṣẹ THOR Chain tòní.

Pẹlupẹlu, ibi-afẹde Maya ni lati di * backend * fun awọn iṣẹ miiran lati kọ lori, ni ireti lati rii ọpọlọpọ awọn * frontends * tuntun, tabi awọn iṣẹ DEX ti a kọ lori amayederun Maya.

## Àdéhùn Maya ìkójọpò̀ àpò-ìpamọ́

Ṣiṣẹ bi * backend *, Maya nilo lati ni atilẹyin nipasẹ awọn UI oriṣiriṣi ati awọn apamọwọ lati lo. 
Eyi ni akojọ pẹlu diẹ ninu awọn iṣẹ ti o ṣe atilẹyin Maya tẹlẹ:

[Thorwallet DEX] [Ìsọfúnni tó wà nínú ìwé pẹlẹbẹ]](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado] Àwọn ohun tó ń ṣẹlẹ̀](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[Àmì ojúewé]](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet, àti Rabby.

[XDEFI](https://www.xdefi.io/): àpò-ìpamọ́-ara ẹni ti ó ní ọ̀pọ̀lọpọ̀ àyíká-ayé pẹ̀lú ìtìlẹ́yìn fún 30+ àwọn ẹ̀ka ìpamọ̀ abínibí, àti gbogbo EVM àti Cosmos chain, títí kan Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, àti púpọ̀ sí i.

[TójútóKey ](https://keepkey.com/): Àpamọ́ alágbèéká kan fún ìpamọ̀ àwọn ohun ìní díjítálì láìséwu.
