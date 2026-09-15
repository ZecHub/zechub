# Maya Decentralized Exchange (Maya Madaraka Kubadilishana)

---

## Mafunzo ya mafunzo


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>


## Itikadi ya Maya ni nini?

Maya ni a [kubadilishana madaraka ya chini](https://nym.com/blog/what-is-dex) (DEX) mfumo ambao unawezesha biashara ya cryptocurrencies katika blockchains tofauti. Unaweza, kwa mfano, kubadilishana Bitcoin (BTC) kwenye blockchain Bitcoin na Ethereum (ETH) juu ya blockchain Ethereum kwa njia rahisi, bila kushikilia mali au kuhusisha mamlaka yoyote kuu au Ujue taratibu za Wateja wako (KYC).

Maya Protocol was developed using the Cosmos Software Development Kit (Cosmos SDK) and operates on a Proof of Bond (PoB) consensus mechanism. The protocol is upheld by "Node Operators," who stake capital into the system and earn returns as a reward for their contribution and efforts. Essentially, nodes are computers running software that validates user swaps and oversees assets in designated addresses across different blockchains.

Ili kukamilisha kubadilishana, cryptocurrency mkono lazima kupokelewa katika moja ya anwani Maya wa, kutumwa na mtumiaji, na kisha kiasi sawa ni kupelekwa kutoka mwingine wa anwani maya juu blockchain tofauti. mchakato huu inasimamiwa na kupitishwa kwa angalau theluthi mbili ya nodes, hasa kuhakikisha kwamba fedha zinapokewa vizuri.

Kwa njia hii, watumiaji wanaweza kutuma aina moja ya ishara kwenye blockchain na kupokea aina tofauti juu ya mwingine blockchain, wote natively na bila kutumia vifungo wrapped.

## Uthibitisho wa Kifungo Ni Nini?

Uthibitisho wa Bond (PoB) ni utaratibu umoja ambapo node watendaji lazima kufanya dhamana (kawaida katika mfumo wa ishara ya asili mtandao) kushiriki katika mtandao. dhamana hii vitendo kama aina ya usalama kiuchumi, kuhakikisha kwamba nodes kutenda kwa uaminifu na kudumisha usahihi wa mtandao2. ikiwa Node anajaribu kutenda vibaya au kushindwa kutekeleza majukumu yake, dhamana yake inaweza kuwa slashed, maana sehemu yake inachukuliwa mbali kama adhabu.

Katika Maya Protocol, utaratibu huu husaidia kuzalisha thamani ya kiuchumi kutoka kwa rasilimali zilizowekwa za waendeshaji node, kuongeza ufanisi wa mtaji. Vivyo hivyo, katika Thorchain, waendeshaje node wanafunga RUNE (alama asili) kupata mtandao na kuhakikisha ushirikiano kati ya washiriki.

## Tofauti kati ya Maya na THORChain

Maya ni uma wa THORChain lakini kubeba na baadhi ya vipengele mpya na utendaji ambayo hutumika kama mbadala kubwa. Wale muhimu zaidi ni:

### Nodes Liquidity (Ndoa za Kioevu)

Badala ya kufuata Pure Bond Model, Maya ni kuzingatia mabadiliko kwa Liquidity Nodes mfano. Katika mfumo huu, nodes zinawezeshwa kuchangia moja kwa moja ukwasi, bonding yake na mtandao. Mbinu hii ina maana node waendeshaji wanakabiliwa hatari kubwa: kama wao kutumia vibaya fedha, wanapata hasara, akifanya kazi kama nguvu deterrent. Matokeo yake, Node watendaji kutumia Units Uwekezaji kutoka Pools uwekezaji, ambayo wakati huo huo kutoa upatikanaji wa fedha na kuimarisha usalama wa mtandao.

### Ulinzi Dhidi ya Hasara za Muda Tu

Mfumo ambao hulinda watoaji wa ukwasi kutokana na hasara ya muda (LPs) wanaweza uzoefu wakati kutoa fedha, kwa sababu ya kushuka mara kwa mara katika bei za mali crypto.
ILP holds 10% of the $CACAO supply (10 million $CACAO) and is continuously replenished by 10% of the protocol fees. ILP becomes active 50 days after a liquidity deposit, with coverage capped at 100%.

The duration of ILP coverage depends on the performance of the ASSET and $CACAO. Full coverage is achieved after 150 days if ASSET performs better, and after 450 days if $CACAO performs better. ILP is both paid out and reset upon complete withdrawal but is not affected by partial withdrawals. For top-ups, ILP is reset but not paid out.

### Mfano tofauti wa ugawaji

The Liquidity Auction was a 21-day event designed to distribute $CACAO tokens among participants. During the event, users deposited supported assets to a specific address. At the conclusion of the auction, 90% of the $CACAO tokens were allocated to participants in proportion to their liquidity contributions, while the remaining 10% was allocated to the ILP reserve. The participants became liquidity providers, with their deposited assets and $CACAO tokens placed into Maya's pools, enabling them to earn a share of the generated fees.

### Njia tofauti ya kushughulikia akiba

At the genesis of Maya Protocol, the available CACAO reserves were only 10% of the total supply, compared to 44% for THORChain, and were primarily intended for Impermanent Loss Protection (ILP). Maya does not have block emissions; and if Protocol Owned Liquidity and Lending are implemented, they will feature a different design, as in THORChain, these aspects are closely integrated with the Reserves.

Bado, licha ya tofauti zake, Maya pia hutumika kama suluhisho la ziada kwa THORChain, kutoa upungufu wa kazi, upanuzi na uthibitishaji, na kuunganisha mitandao mpya ambayo haipo katika utekelezaji wa sasa wa THORCHINE.

Also, Maya's goal is to become a *backend* for other services to build upon, in hopes of seeing plenty of new *frontends*, or DEX services built upon Maya's infraestructure.

## Maya itifaki mkoba ushirikiano

Kutenda kama * backend, Maya inahitaji kuwa na mkono kwa UI tofauti ya na pochi kutumika. 
Hapa ni orodha ya baadhi ya huduma ambazo tayari kusaidia Maya:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado (Mto wa Dhoruba)](https://www.eldorado.market/): XDEFI, Kiwanda cha Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: tena online, uwanja wake haina kutatua.

[XDEFI](https://www.xdefi.io/): a multi-ecosystem self-custody wallet with support for 30+ native blockchains, and all EVM and Cosmos chains, including Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON, and more.

[WekaKey ](https://keepkey.com/): mkoba vifaa kwa ajili ya kuhifadhi salama mali digital.
