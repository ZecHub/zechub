# Ywallet FROST ho ɔyɛkyerɛ

> **Wɔhwɛ Ywallet so bio.** Nea ɔyɛɛ no ​​no asi so dua sɛ wɔrennyɛ no foforo mma Ironwood (NU6.3), enti entumi nni nkɔnsɔnkɔnsɔn no akyi bio na anammɔn a ɛwɔ ase ha no ntumi nwie wɔ mainnet so. Wɔde kratafa yi asie sɛnea ɛbɛyɛ a wobetumi ahwɛ mu. Zkool, a efi developer koro no ara mu, ne nea wɔhwɛ so no na ɛboa FROST multisig.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Transaction Demo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>


## Boaboa FROST bin ahorow ano

[Github link no](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Fa atifi hɔ repo no di dwuma na di akwankyerɛ a ɛfa compiling ho akyi: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Bins bɛyɛ nea wɔde asi wɔn ani so folda no.

## Yɛ FROST UA

`./generateFROST_UA.sh`



## Fa UFVK ba Ywallet mu

Accounts -> Klik + na paste ufvk fi anammɔn a ɛwɔ atifi hɔ no

## Yɛ asɛm bi a ɛfa Ywallet ho

Paste wɔ UA biara mu na fa tx mena. Fa fael no sie.

## Fi ase FROST nsaano nkyerɛwee nhyehyɛe no 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

kan input ne beae a raw tx no fi anammɔn a ɛwɔ atifi hɔ no
input a ɛtɔ so mmienu ne beaeɛ ne din a signed tx a wopɛ sɛ wobɔ no
Eyi yɛ fã bi a woka kyerɛ FROST sɛ transction bɛn na wopɛ sɛ obiara de ne nsa hyɛ ase

## Fi ase Ntamgyinafo

`./runCoordinator.sh`

Eyi na ɛhyehyɛ wɔn a wɔde wɔn ho hyɛ mu biara nsaano nkyerɛwee na ɛma kuw nsaano nkyerɛwee

## Ma Ɔde ne ho hyɛ mu biara mfa ne nsa nhyɛ saa asɛm yi ase

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalize nsaano nkyerɛwee Transaction

Wɔ coordinator window no mu no, kɔpi kuw signature a ɛrepue no na fa hyɛ FROST signing window no mu.
Wei bɛma FROST nsaano nkyerɛwee no awie na ɛde 'mysingedtx' afiri adi.


## Broadcast wo Transaction ne Ywallet

Klik 'More' wɔ Ywallet ase nifa so na hwehwɛ 'Broadcast'. Hwehwɛ 'mysignedtx' na klik ok.

Sɛ biribiara yɛ adwuma a wobɛnya transaction ID :)
