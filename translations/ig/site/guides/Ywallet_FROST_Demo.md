# Ngosipụta Ywallet FROST

> **A naghịzi elekọta Ywallet.** Onye nrụpụta ya ekwenyela na agaghị emelite ya maka Ironwood (NU6.3), yabụ na ọ gaghịzi eso usoro ndị a, a gaghịkwa emecha usoro ndị dị n'okpuru na mainnet. A na-edebe ibe a maka ntụaka. Zkool, sitere n'aka otu onye nrụpụta ahụ, bụ onye ga-anọchi ya ma na-akwado ọtụtụ FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Chịkọta ihe nchekwa FROST

[Njikọ Github](https://github.com/ZcashFoundation/frost-zcash-demo)

Jiri repo dị n'elu wee soro ntuziaka maka nchịkọta: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bin ga-abụ folda ebumnuche.

## Mepụta FROST UA

`./generateFROST_UA.sh`



## Bubata UFVK n'ime Ywallet

Akaụntụ -> Pịa + mado ufvk site na nzọụkwụ dị n'elu

## Mepụta azụmahịa na Ywallet

Mado na UA ọ bụla wee ziga tx. Chekwaa faịlụ ahụ.

## Malite usoro mbinye aka FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

Ntinye mbụ bụ ebe tx raw dị site na nzọụkwụ dị n'elu
Ntinye nke abụọ bụ ebe na aha nke tx mbinye aka ịchọrọ ịgbasa
Nke a bụ akụkụ ebe ị na-agwa FROST nke mgbanwe ịchọrọ ka onye ọ bụla bịanye aka na ya

## Onye nhazi mmalite

`./runCoordinator.sh`

Nke a na-ahazi mbinye aka nke onye ọ bụla sonyere ma mepụta mbinye aka otu

## Mee ka onye ọ bụla so na ya bịanye aka maka azụmahịa a

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Mezue azụmahịa a bịanyere aka na ya

Na windo nhazi, detuo mbinye aka otu nke ewepụtara wee mado ya na windo mbinye aka FROST.
Nke a ga-emecha mbinye aka FROST ma wepụta 'mysingedtx'


## Kwusaa azụmahịa gị na Ywallet

Pịa 'More' n'akụkụ aka nri ala nke Ywallet wee chọta 'Broadcast'. Chọta 'mysignedtx' wee pịa 'OK'.

Ọ bụrụ na ihe niile arụọ, ị ga-enweta ID azụmahịa :)
