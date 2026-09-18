# Ywallet FROST demo no yɛ nea wobɛtumi de adi dwuma.

> Ywallet no nni hɔ bio.** N'abɔadeɛ no akyerɛ sɛ ɔrenyɛ Ironwood (NU6.3) mu adwuma, enti ɛntumi nyɛ chain na akwan a ɛwɔ ase ha yi ntumi mma wɔ mainnet so. Saa kratafa yi yɛ de fa reference ho. Zkool firi deɛ abɔfoɔ koro no ara bɔeɛ, ɛne nea ɛtoa FROST multisig akyi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma no yɛ FullScreen
    loading="lazy"
  />
</div>


## Hyehyɛ FROST nkukuo no mu.

[Github so nkitahodi](https://github.com/ZcashFoundation/frost-zcash-demo)

Fa repo a ɛwɔ soro yi di akwankyerɛ ahorow so wɔ faako: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Nsa a wɔde fa nneɛma no so na ɛbɛba.

## Siesie FROST UA no bi

`./generateFROST_UA.sh`



## Fa UFVK kɔ Ywallet mu

Accounts -> Twerε + na fa ufvk firi ashensoɔ a' yεato no mu sεε wo twe bi.

## Fa Ywallet yɛ adwuma na di dwuma wɔ wo fon so

Fa UA biara to mu na fa tx bi ma. Bue wo mpokyerɛ no so.

## Fa FROST nsaano adwuma no hyɛ aseɛ. 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

input a edi kan ne baabi a raw tx no wɔ fi ɔfã a ɛwɔ soro hɔ mu.
Deɛ ɛtɔ so mmienu ne baabi a ɛwɔ na edin no nso yɛ tx a woatwerɛ sɛ wopɛsɛ wotwe kɔma obi.
This is part where you tell FROST which transction you want everyone to sign

## Mfitiaseɛ Nhyehyɛmu no

`./runCoordinator.sh`

Eyi ma obiara nsa a ɔde ka nsɛm no yɛ adwuma na ɛma nnipakuw bi de wɔn ho hyɛ mu.

## Ma Ɔfesefoɔ biara nsɔ ano mfa nni dwuma yi ho dawuro

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Yɛ nhyehyɛe a yɛde bɛhyɛ aseɛ ayɛ adwuma no awieɛ.

Wɔ coordinator mpomma no mu, fa kuw nsa a w'ayi adi na twerɛ to FROST nsahyɛ mfoni apon no mu.
Eyi bɛma FROST nsaano adwuma no awie na ɛde 'mysingedtx' aba.


## Fa wo transaction no to Ywallet so ma obiara nhu.

Klik 'More' wɔ Ywallet fam benkum na hwehwɛ 'Broadcast'. Hwehwɛ 'mysignedtx' na mia ok.

Sɛ biribiara yɛ adwuma a, wobɛ nya transaction ID :)
