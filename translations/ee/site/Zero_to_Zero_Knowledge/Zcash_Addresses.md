# Zero to Zero Knowledge: Nuwo ƒe ʋuʋuɖi [Transparent] kple Ɣaɣla [Shielded] Gaɖoɖowo & Ɖekae Ƒe Gaɖoƒe ƒe Dzesiewo

**Xexlẽme:** Zero to Zero Knowledge

Ne èle Zcash srɔm zi gbã la, àkpɔ be gaɖoɖo ƒomevi eve le mɔ: **Nuwo ƒe ʋuʋuɖi** kple **Ɣaɣla**.  

Egbe míele wo srɔm eye míakpɔ ŋkeke yeye ƒe nɔnɔwo dometɔ ɖeka si le #Zcash ƒe nutome la me, **Ɖekae Ƒe Gaɖoƒe ƒe Dzesiewo**.

---

## Nuwo ƒe ʋuʋuɖi kple Ɣaɣla Gaɖoɖowo

- **Nuwo ƒe ʋuʋuɖi Gaɖoɖowo** zã **t-gaɖoƒe ƒe dzesiewo** (Base58 meŋlɔŋlɔ). Ame sia ame ate ŋu akpɔ nuwo katã kple dɔmeɖeɖe, abe Bitcoin ene.  
- **Ɣaɣla Gaɖoɖowo** zã gaɖoƒe ƒe dzesiewo si woŋlɔ na **Sapling** alo **Orchard** gaƒuƒoƒowo. Esia ɣla dzɔla, xɔla, kple gaƒeƒe to zero-knowledge ɖaseɖigbalɛwo me.

**Ɣaɣla Gaɖoɖo** fia gaɖoɖo siawo katã si zã gaɖoƒe ƒe dzesiewo si woŋlɔ na Sapling/Orchard gaƒuƒoƒowo.

![Transparent vs Shielded intro](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

**Ɖekae Ƒe Gaɖoƒe ƒe Dzesiewo (UAs)** wowɔ wo be woa**ɖe kpleɖe** ɣaɣla alo nuwo ƒe ʋuʋuɖi gaɖoɖowo ɖe gaɖoƒe ƒe dzesi ɖeka me.

---

## Gaɖoƒe Ƒe Dzesi Ƒomeviwo le Zcash

Gaɖoƒe ƒe dzesi ƒomevi etɔe le zazãm:

1. **(T) Nuwo ƒe ʋuʋuɖi** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Ɖekae Ƒe Gaɖoƒe ƒe Dzesi** – Bech32m  

Agbalẽdzesiwo ƒe xexlẽme (eye eya ta QR code ƒe lolome) gɔme ɖe edzi kple ƒomevi siawo dometɔ ɖe sia ɖe.

![Address types comparison](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![QR code size comparison](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Ale Si Ɖekae Ƒe Gaɖoƒe Ƒe Dzesiewo Wɔ Dɔe

Woŋlɔ gaɖoƒe ƒe dzesiewo kple kɔkɔewo abe byte ƒe woƒe mɔnu ( **Raw Encoding** ) ene.  
**Receiver Encoding** me la, nyatakaka si hiã katã le be woatrɔ asset ɖeka to protocol aɖe me.

Ɖekae Ƒe Gaɖoƒe ƒe Dzesi ƒe raw encoding nye receiverwo ƒe encodingwo (typecode, didime, addr) ƒe ƒoƒo:

- UA: `0x03`  
- Sapling: `0x02`  
- Nuwo ƒe ʋuʋuɖi: `0x01`  

**Nu si le vevie**: Ɣaɣla fexexe gaɖoƒe ƒe dzesi atɔ ɖeka koŋ hĩ le UA ɖe sia ɖe me. (Sprout gaɖoƒe ƒe dzesiewo menye nu si wowɔa dɔe le Canopy ƒe upgrade megbe o.)

![UA encoding structure](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Ɖeɖeɖe bliboa: **[ZIP-316: Ɖekae Ƒe Gaɖoƒe Ƒe Dzesiewo](https://zips.z.cash/zip-0316)**

---

## Ɖekae Ƒe Gaɖoƒe Ƒe Dzesiewo Ƒe Viɖeawo

- **Ewɔe bɔbɔe na gatrɔƒewo** - Fifia woate ŋu ado ɣaɣla gaɖoƒe ƒe dzesiwo me kple woadoe go le mɔ dedie wu.  
- **Eŋu akpɔ etsɔme** - Woate ŋu atsɔ ɣaɣla gaƒuƒoƒo yeyewo akpe ɖe eŋu ne gakotokuwo manɔ gbãm o.  
- **Ɣaɣla le gɔmedzedze** - UA ɖe sia ɖe me la, ɣaɣla gaɖoƒe ƒe dzesi atɔ ɖeka koŋ le, eyata ɣaɣla nɔa mɔ sia mɔ.

Esia nye tɔtrɔ gã aɖe si le kpeɖe ŋu xoxo be ZEC geɖe naava ɣaɣla gaƒuƒoƒo me.

---

## Orchard Gaɖoɖowo & Wɔwɔwo

Orchard tsɔ susu yeye aɖe vɛ si woyɔna be **Wɔwɔwo**:

- Wowɔe be metadata ƒe lele le ŋgɔ ŋu nade ɖe egbɔ to **anchor ɖeka** zazã na Wɔwɔwo katã le gaɖoɖo ɖeka me.  
- Woƒoa (V4) Spend + Output ƒe fieldwo katã ɖe value commitment ɖeka me.  
- Esia na Halo2 ɖaseɖigbalɛ ƒe system la ŋuɖoɖo ƒe tɔtrɔwo nava anyi.

Daira ɖe Anchor ƒe nɔƒewo ƒe gɔme me (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Asixɔxɔ ƒe Balance & Ɣaɣla

Le nyateƒe aɖewo me (abe gaƒuƒoƒo vovovowo dome gaɖoɖowo ene), ame si mele gota la ate ŋu akpɔ gaƒeƒewo. Ke hã, `valueBalanceSapling` kple `valueBalanceOrchard` zã **homomorphic adzɔgbeɖeɖewo** be woaɖe ZEC ƒe katã le ɣaɣla gaƒuƒoƒowo me afi, eye woaxe mɔ na asixɔxɔ ƒe alakpanu.

Xlẽ nu geɖe: [ZIP 209: Mègana Chain Value Pool Balances Siwo Doa Dzidzɔ Tso Range Me O](https://zips.z.cash/zip-0209)

---

## Ɣeyiɣi Si Gbɔna Ƒe Ɖeɖeɖewo

ECC ƒe team la le RPC mɔnu yeye aɖewo wɔm le `zcashd` me (si ɖe `z_sendmany` teƒe) si ana be zãlawo nakpɔ gaɖoɖo si wodo ɖaɖa daɖi, eye woaxɔe alo woagbe edzi le eƒe ɣaɣla ƒe nɔnɔwo nu.

---

## Aɖaŋu

Thread sia tsɔ gbãna ame ɖe **YWallet** ŋu, le gaɖoɖo ƒe ɖoɖo si wòkpɔ hafi nàdzi send la ta. YWallet menɔa dɔ wɔm o azɔ eye woamaɖe eƒe version yeyee na Ironwood o, eyata mate ŋu adze ɖoɖonu la yome o. Tia gakotoku si wole dɔ wɔm ɖe eŋu tso [Gakotokuwɔwo](https://zechub.wiki/wallets) ƒe axa dzi ɖe teƒe, eye nàfia tɔ si aɖe nu si gaɖoɖo la aɖe fia hafi woadzoe.

Article nyui aɖe ku ɖe gaɖoɖo ƒe ɣaɣla ŋu: https://medium.com/@hanh.huynh/

---

**Thread Gbãtɔ Tso ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Woƒo axa sia nu tso Zero to Zero Knowledge ƒe thread gbãtɔ me na ZecHub ƒe wiki.*
