# Ywallet FROST ngosi

> **A naghị elekọta Ywallet ọzọ.** Onye mmepụta [developer] ya ekwenyela na agaghị emelite ya maka Ironwood (NU6.3), ya mere ọ nweghịzi ike iso chain ahụ, a pụghịkwa imezu usoro ndị dị n'okpuru na mainnet. E debere ibe a maka ntụaka. Zkool, sitere n'aka otu onye mmepụta ahụ, bụ onye nọchiri anya ya a na-elekọta ma na-akwado multisig nke FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Azụmahia ngosi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Kọmpaịlụ bin FROST

[GitHub njikọ](https://github.com/ZcashFoundation/frost-zcash-demo)

Jiri repo dị n'elu ma soro ntuziaka maka ịkọmpaịlụ: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Bin ga-adị n'ime folda target.

## Mepụta UA FROST

`./generateFROST_UA.sh`



## Bubata UFVK n'ime Ywallet

Accounts -> Pịa + ma mado ufvk sitere na nzọụkwụ dị n'elu

## Mepụta Azụmahia na Ywallet

Mado UA ọ bụla ma ziga tx. Chekwaa faịlụ ahụ.

## Bido usoro ntinye signature nke FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

ntinye mbụ bụ ebe raw tx sitere na nzọụkwụ dị n'elu dị
ntinye nke abụọ bụ ebe na aha tx ejirila signature nke ịchọrọ ịgbasa
Nke a bụ akụkụ ebe ị na-agwa FROST Azụmahia nke ịchọrọ ka onye ọ bụla tinye signature na ya

## Bido Coordinator

`./runCoordinator.sh`

Nke a na-ahazi signature nke onye ọ bụla sonyere ma mepụta signature otu

## Mee ka Onye Nsonyere ọ bụla tinye signature maka Azụmahia a

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Mechaa Azụmahia ejirila signature

N'ime mpio coordinator, detuo signature otu e wepụtara ma mado ya n'ime mpio ntinye signature nke FROST.
Nke a ga-emecha ntinye signature nke FROST ma wepụta 'mysingedtx'


## Gbasaa Azụmahia gị na Ywallet

Pịa 'More' n'akụkụ ala aka nri nke Ywallet ma chọta 'Broadcast'. Chọta 'mysignedtx' ma pịa ok.

Ọ bụrụ na ihe niile arụ ọrụ, ị ga-enweta ID Azụmahia :)
