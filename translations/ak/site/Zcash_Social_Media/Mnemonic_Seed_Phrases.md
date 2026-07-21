# Nimdeɛ Zero kosi Zero: Mnemonic Aba Nsɛmfua

**Series:** Zero kosi Zero Nimdeɛ

Mnemonic aba nsɛmfua gyina cryptocurrency afã horow a ɛho hia sen biara no mu biako ase - **self-custody**. 
Ɛnnɛ yɛsua sɛdeɛ wɔyɛ aba kasasin na wɔde di dwuma wɔ sika kotokuo mu.

---

## Dɛn ne Mnemonic Aba Nsɛmfua?

Wɔde **BIP-39** nkyerɛkyerɛmu, kasasin a wɔtaa de di dwuma nnɛ no na ɛkyerɛkyerɛ kasasin a wɔde san nya mu.

Nsɛmfua a wɔde san yɛ adwuma no bɔ fi ase denam **randomness** a ɛde ba no so. Entropy pii kyerɛ ahobammɔ a ɛkorɔn. Wobu entropy **128 bits** sɛ ɛdɔɔso ma wɔn a wɔde di dwuma dodow no ara.

![Aba kasasin adwene](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Ɛgyina entropy a edi kan no tenten so no, kasasin a wɔde san ba no bɛyɛ **nsɛmfua 12 kosi 24**.

---

## Anamɔn biara: Sɛnea Wɔyɛ Aba Kasasin a Ɛwɔ Nsɛmfua 12

### 1. Yɛ Entropy
Yɛhyɛ aseɛ denam entropy **128 bits** a yɛyɛ so.

### 2. Fa Checksum ka ho
Yɛde **SHA256** na ɛyɛ hash entropy no. Hash yi mu bits kakraa bi a edi kan no bɛyɛ checksum. 
Eyi ma yenya nsateaa soronko bi ma yɛn entropy.

![Entropy + Checksum mfonini](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Kyekyɛ mu yɛ no 11-bit chunks
Wɔakyekyɛ bits 132 (entropy 128 + checksum 4) no nyinaa mu ayɛ no asinasin a ɛyɛ bits 11.

### 4. Map a ɛkɔ Wordlist so
Wɔdannan 11-bit nnidiso nnidiso biara ma ɛyɛ decimal nɔma (0-2047). 
BIP-39 nsɛmfua a wɔahyehyɛ no kura **nsɛmfua 2048** pɛpɛɛpɛ (Borɔfo, Spania, China, ne nea ɛkeka ho).

Wɔde saa nɔma ahorow yi hwehwɛ asɛmfua a ɛne no hyia wɔ nsɛmfua a wɔahyehyɛ no mu.

![Asɛmfua map nhwɛso](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Nea efi mu ba:** Seesei yɛwɔ kasasin a ahobammɔ wom, a nnipa betumi akenkan a ɛwɔ nsɛmfua 12 a wɔde san nya ahoɔden!

---

## Efi Recovery Phrase -> Aba -> Katua Address ahorow

Sɛ wode kasasin a wɔde san nya no di dwuma a, sika kotoku betumi ayɛ nsafe a wɔde bɛyɛ address a wɔde tua sika ne sika kotoku akontaabu ahorow.

Keys a wɔayɛ no yɛ **deterministic** - input koro no ara ma output koro no ara ba bere nyinaa.

### Aba Awo Ntoatoaso
Wɔnya sika kotokuo aba no firi nkaeɛ kasasin a wɔde **Key Derivation Function (KDF)** di dwuma:

- Wɔ **Bitcoin** mu no: PBKDF2 
- Wɔ **Zcash** mu no: Blake2b-256/512

Wei ma wonya **64-byte (512-bit)** aba.

![Seed to master keys](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Master Keys
Wɔakyekyɛ aba no mu abien a ɛyɛ baiti 32 nnidiso nnidiso:
- **Master Sikakorabea Safoa**
- **Owura Nkɔnsɔnkɔnsɔn Mmara**

Wɔde eyinom di dwuma wɔ **Hierarchical Deterministic (HD) Walets** mu ma mmofra safoa a wonya fi mu.

---

## Zcash Nneɛma pɔtee (ZIP-32) .

Wɔ Zcash mu no, wobetumi de **tumi a wɔhwɛ** anaa ** tumi a wɔde di dwuma** ahyɛ obi nsa wɔ ahofadi mu ama nnua nketewa a wɔrensɛe aba wura no.

**ZIP-32** kyerɛkyerɛ hierarchical deterministic key generation gyinapɛn a wɔayɛ ama Zcash kokoam nsɛm no mu.

Efi **Expanded Spending Key** mu na yenya:
- Full Viewing Key
- Incoming Viewing Key
- Address ahorow a wɔde tua ka a wɔahyehyɛ

Derivation akwan horow ma abɔnten address ahorow a ɛfata sɛ wɔde ma wɔn a wɔde nneɛma mena wɔ shielded pools (Sapling & Orchard) so.

![Zcash safoa derivation nhyehyɛe](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash nso boa **address a ɛwɔ mu** ma sika kotokuo dwumadie te sɛ Auto-Shielding.

---

## Akadeɛ

- [ZIP-32: Sikakorabea a Wɔabɔ no Yiye a Wɔde Di Dwuma a Wɔabɔ no Yiye](https://zips.z.cash/zip-0032)  
- [Zcash Protocol Nkyerɛkyerɛmu (NU5) .](https://zips.z.cash/protocol/protocol.pdf)  
- [Shielded-by-default sika kotoku ho nsɛm](https://zechub.wiki)

---

**Mfitiaseɛ Nhama a ZecHub (@ZecHub) kyerɛwee** 
https://x.com/ZecHub/status/1624125037945946145

---

*Wɔboaboaa krataafa yi ano fii mfitiase Zero to Zero Knowledge thread no mu maa ZecHub wiki.*
