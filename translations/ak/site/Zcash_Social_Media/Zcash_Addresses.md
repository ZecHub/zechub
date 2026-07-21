# Zero to Zero Nimdeɛ: Transparent vs Shielded Transactions & Address a Wɔaka abom

**Series:** Zero kosi Zero Nimdeɛ

Sɛ woresua Zcash ho ade nea edi kan a wubehu sɛ nnwuma ahorow abien na ɛwɔ hɔ: **Transparent** ne **Shielded**. 

Ɛnnɛ yɛsua wɔn ho ade & yɛkata nneɛma foforɔ a ɛwɔ #Zcash ecosystem no mu baako so, **Unified Addresses**.

---

## Transparent vs Shielded Nkitahodi

- **Nkitahodi a ɛda adi** de **t-addresses** (Base58 encoded) di dwuma. Biribiara da adi wɔ baguam - te sɛ Bitcoin ara pɛ. 
- **Shielded Transactions** de address ahorow a wɔakyerɛw ama **Sapling** anaa **Orchard** pools no di dwuma. Eyinom de adanse a wonni nimdeɛ biara sie nea ɔde kɔmaa, nea ogye, ne sika dodow.

**Shielded Transaction** kyerɛ asɛm biara a ɛwɔ address a wɔde encoded ama Sapling/Orchard pools.

![Transparent vs Shielded nnianim asɛm](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

**Wɔayɛ Unified Addresses (UAs)** sɛ **wɔbɛka** nnwuma a wɔabɔ ho ban anaa ɛda adi pefee ayɛ no address baako.

---

## Address ahorow a ɛwɔ Zcash mu

Address ahorow 3 na wɔde di dwuma:

1. **(T) Nneɛma a ɛda adi** – Base58 
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Nkyerɛwde dodow (na ɛno nti QR koodu kɛse) kɔ soro bere biara a wɔakyerɛw no.

![Address ahorow a wɔde toto ho](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR koodu kɛseɛ ntotoho](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Sɛnea Address ahorow a Wɔaka abom Yɛ Adwuma

Wɔakyerɛw address ne safoa sɛ baiti ntoatoaso (**Raw Encoding**). 
**Receiver Encoding** ka nsɛm a ɛho hia nyinaa a wɔde bɛfa agyapadeɛ bi akɔma obi foforɔ denam protocol pɔtee bi so.

Unified Address no raw encoding yɛ encodings (typecode, tenten, addr) a wɔaka abom a ɛfa receivers ho:

- UA: `0x03`  
- Sapling: `0x02`  
- Fann: `0x01`  

**Nea ɛho hia**: Ɛsɛ sɛ **anyɛ yiye koraa no, address biako a wɔde tua sika a wɔabɔ ho ban** wɔ UA biara mu. (Wɔmmoa Sprout address ahorow bio wɔ Canopy upgrade no akyi.)

![UA encoding nhyehyɛe](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Nkyerɛkyerɛmu a edi mũ: **[ZIP-316: Address ahorow a Wɔaka abom](https://zips.z.cash/zip-0316)**

---

## Mfaso a Ɛwɔ Address ahorow a Wɔaka abom So

- **Ɛyɛ mmerɛw ma exchanges** - Seesei wobetumi aboa shielded deposits/withdrawals a ahobammɔ wom. 
- **Future-proof** - Wobetumi de atare foforo a wɔabɔ ho ban aka ho a wɔrenbubu sika kotoku. 
- **Shielded-by-Default** - Anyɛ yiye koraa no, UA biara kura address biako a wɔabɔ ho ban, enti kokoamsɛm wɔ hɔ bere nyinaa.

Eyi yɛ nsakrae titiriw a ɛreboa ZEC pii dedaw ma wɔatu akɔ ɔtare a wɔabɔ ho ban no mu.

---

## Orchard Nkitahodi & Nneyɛe

Orchard de adwene foforo bi a wɔfrɛ no **Actions** bae:

- Wɔtew metadata a ɛretu so denam **anchor biako** a wɔde di dwuma ma Nneyɛe nyinaa wɔ asɛm bi mu no so. 
- Wɔka (V4) Spend + Output fields no bom yɛ no value commitment baako. 
- Wei ma wotumi yɛ adwumayɛ a ɛyɛ papa wɔ Halo2 adansedi nhyehyɛe no mu.

Daira kyerɛkyerɛ Anchor gyinabea ahorow mu (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ma kwan maFullScreen no
    loading="lazy"
  />
</div>

---

## Botae a Ɛkari pɛ & Kokoam Nsɛm

Wɔ tebea horow bi mu (e.g. cross-pool transactions) sika dodow betumi ayɛ nea obi a ofi abɔnten a ɔhwɛ no ahu. Mmom, `valueBalanceSapling` ne `valueBalanceOrchard` fa **homomorphic commitments** di dwuma de kyerɛ sɛ ZEC nyinaa wɔ atare a wɔabɔ ho ban mu na wɔasiw atoro a wɔyɛ no ano.

Kenkan pii: [Ahobammɔ a Wɔde Tia Atoro a Wɔyɛ wɔ Atare a Wɔabɔ Ho Ban Mu](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Nkɔso a Ɛbɛba Daakye

ECC kuw no reyɛ adwuma wɔ RPC akwan foforo so wɔ `zcashd` (a wɔde besi ananmu `z_sendmany`) a ɛbɛma wɔn a wɔde di dwuma no ahwɛ na wɔagye/apow asɛm bi a wɔahyɛ ho nyansa a egyina ne kokoamsɛm su so.

---

## Nyansahyɛ a wɔde ma

Sɔ **YWallet** a aba foforo no hwɛ! 
Ɛkyerɛ "Transaction Plan" dedaw wɔ screen so ansa na woabɔ send, a ɛboa wo ma wopaw kokoam nneɛma pii.

Asɛm kɛse a ɛfa asɛmdi ho kokoamsɛm ho: https://medium.com/@hanh.huynh/

---

**Mfitiaseɛ Nhama a ZecHub (@ZecHub) kyerɛwee** 
https://x.com/ZecHub/status/1628498645627666432

---

*Wɔboaboaa krataafa yi ano fii mfitiase Zero to Zero Knowledge thread no mu maa ZecHub wiki.*
