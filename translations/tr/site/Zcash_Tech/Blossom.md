<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Blossom

> Blossom, Zcash tarihinde ana ağda 653.600 numaralı blokta kullanıma sunuldu (11 Aralık 2019 UTC).

Öğrenecekleriniz: Blossom, ağın zaman içinde oluşturduğu ZEC miktarını değiştirmeden Zcash blokların yaklaşık iki kat daha hızlı gelmesini nasıl sağladı.

Blossom, bir Zcash [ağ yükseltmesidir](../start-here/network-upgrades). [ZIP 206](https://zips.z.cash/zip-0206) ile dağıtıldı ve temel konsensüs değişikliği [ZIP 208](https://zips.z.cash/zip-0208) içinde tanımlandı. Blossom bir ölçeklenebilirlik yükseltmesiydi: bloklar arasındaki hedef süreyi 150 saniyeden 75 saniyeye indirdi, böylece bloklar yaklaşık iki kat daha sık gelmeye başladı. Electric Coin Company, Blossom çalışmalarına öncülük etti ve duyurdu.

Bu neden önemli? ZEC gönderdiğinizde ağın bunu bir blokta onaylamasını beklersiniz. Bloklar yavaş geliyorsa daha uzun beklersiniz. Blossom öncesinde yaklaşık her 150 saniyede bir yeni blok bekleniyordu. Blossom bu hedefi yarıya, 75 saniyeye indirdi; böylece onaylar daha erken gelir ve Zincir aynı süre içinde daha fazla işlem taşıyabilir. Bunu daha fazla ZEC oluşturmadan veya gelecekteki yarılanmaların zamanını değiştirmeden yaptı. (2026'nın Kasım ayında etkinleştirilen NU7, daha sonra [ZIP 218](https://zips.z.cash/zip-0218) kapsamında aynı yaklaşımı kullanarak hedefi tekrar 25 saniyeye indirdi.)

## Kısaca

- Blossom, Zcash'ın üçüncü ağ yükseltmesiydi; ana ağın 653.600 numaralı bloğunda etkinleştirildi (11 Aralık 2019 UTC). ZIP 206 ile dağıtıldı ve temel değişikliği ZIP 208'de tanımlandı.
- Hedef blok aralığını 150 saniyeden 75 saniyeye indirdi: bloklar yaklaşık iki kat daha sık gelir; böylece ilk onaylar daha erken alınır ve işlem hacmi kabaca iki katına çıkar.
- İhracın sabit kalması için blok başına ödülü yarıya indirdi ve yarılanma aralığını 840.000 bloktan 1.680.000 bloğa çıkardı.
- Zaman birimi başına oluşturulan toplam ZEC ve gelecekteki yarılanmaların gerçek zamandaki tarihleri değişmedi.
- Zorunlu, ikili bir değişiklikti: Zincirde kalmak için her düğümün yükseltme yapması gerekiyordu.

## Görsel benzetme

Blossom, sefer sıklığını ikiye katlayan bir otobüs ağı gibidir. Otobüsler artık her 150 saniyede bir yerine 75 saniyede bir gelir; bu nedenle yarı süre beklersiniz (daha hızlı onaylar) ve ağ iki kat yolcu taşır (işlem hacmi). Şoför maaş toplamını aynı tutmak için her şoförün sefer başına aldığı ücret yarıya indirilir; toplam maaş harcaması aynıdır, yalnızca iki kat daha fazla sefer üzerinden ödenir.


## Daha hızlı bloklar

Blossom temel değişikliği basittir. Zcash hedef blok aralığı, yani ağın bir blok ile sonraki blok arasında hedeflediği süre, 150 saniyeden 75 saniyeye düştü ([ZIP 208](https://zips.z.cash/zip-0208)). Bloklar iş kanıtıyla bulunur, dolayısıyla aralarındaki gerçek süre değişkenlik gösterir; ancak ağ artık her 150 saniyede bir yerine yaklaşık her 75 saniyede bir blok hedefler.

Bunun iki sonucu vardır:

1. Bloklar yaklaşık iki kat daha sık gelir; böylece Zincir zaman birimi başına kabaca iki kat işlem taşıyabilir.
2. Sonraki bloğu daha az beklediğiniz için işleminiz ilk onayını daha erken alır.

![Blossom'dan önce blok hedefi 150 saniyeydi; onaylar daha yavaş ve kapasite daha düşüktü. Blossom'dan sonra hedef 75 saniyedir; onaylar daha hızlı ve kapasite yaklaşık iki katıdır](/content-images/blossom-block-spacing-50b6bfbacc.webp)

## İhracı sabit tutmak

Daha hızlı bloklar bir soru doğurur. Zcash iki kat fazla blok oluşturup her blokta aynı ödülü vermeye devam etseydi ağ ZEC iki kat daha hızlı oluştururdu. Blossom bunu önler. Blok başına verilen ödülü yarıya indirdi ve blok ödülü yarılanma aralığını 840.000 bloktan 1.680.000 bloğa çıkardı ([ZIP 208](https://zips.z.cash/zip-0208)). İki kat fazla bloktan her birinin yarı ödül vermesi, zaman birimi başına oluşturulan ZEC miktarını aynı tutar. Toplam arz planı ve gerçek zamanla ölçülen gelecekteki yarılanmaların tarihleri değişmedi.

![Blossom ihracatı nasıl sabit tutar: 75 saniyelik bloklar iki kat daha sık gelir, blok başına ödül yarıya iner ve yarılanma aralığı iki katına çıkar; böylece zaman içindeki toplam emisyon aynı kalır](/content-images/blossom-emission-balance-f2443e29ab.webp)

## Zorunlu bir yükseltme

Blossom ikili bir konsensüs değişikliğiydi; yani her düğümün Zinciri takip etmeyi sürdürmek için yükseltme yapması gerekiyordu ([ZIP 206](https://zips.z.cash/zip-0206)). Eşitlemeyi sürdürmek isteyen bir düğüm işletmecisi için isteğe bağlı değildi. Blossom ana ağın 653.600 numaralı bloğunda etkinleştirildi ve kendi konsensüs dal kimliğini taşır; bu etiket, düğümlerin ve işlemlerin Blossom kurallarını kullandıklarını doğrulamasını sağlar. Yükseltmede Zcash'ın standart ağ yükseltme mekanizması kullanıldı ([ZIP 200](https://zips.z.cash/zip-0200)).

## Blossom nereye oturuyor?

Blossom, Zcash'ın üçüncü ağ yükseltmesiydi. Overwinter ve Sapling yükseltmelerinden sonra, Heartwood ve Canopy yükseltmelerinden önce geldi. Zcash'ın korumalı kriptografisini baştan ele alan Sapling'ın aksine Blossom, ölçek ve hıza odaklandı. Temel amacı yeni gizlilik özellikleri eklemek değil, blok zamanlamasını değiştirmekti.

## Sık Yapılan Hatalar

- **Daha hızlı blokların daha fazla ZEC anlamına geldiğini düşünmek.** Blok başına ödülün yarıya indirilip blok hızının ikiye katlanması, zaman birimi başına ihracı tam olarak aynı tutar.
- **Yarılanmaların gerçek zamanda daha erken gerçekleştiğini varsaymak.** Yarılanma aralığı 840.000 bloktan 1.680.000 bloğa çıkarıldı; bu nedenle yarılanma tarihleri gerçek zamanda değişmedi.
- **“75 saniye” ifadesini garanti olarak yorumlamak.** Bu bir iş kanıtı hedefidir; bloklar arasındaki gerçek süreler bu hedefin çevresinde değişkenlik gösterir.
- **Blossom yükseltmesini bir gizlilik yükseltmesi olarak görmek.** Amacı blok zamanlaması ve ölçekti; Sapling'ın aksine hiçbir kriptografik değişiklik yapmadı.
- **Düğüm işletmecilerinin bu yükseltmeyi atlayabileceğini düşünmek.** Blossom ikili bir konsensüs değişikliğiydi; yükseltilmemiş bir düğüm ağdan ayrılarak farklı bir dala geçer.


## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Block target spacing | Ağın bir blok ile sonraki blok arasında hedeflediği süre |
| Block reward | Her blok madencilikle çıkarıldığında oluşturulan ve dağıtılan yeni ZEC |
| Halving interval | Blok ödülünün her yarılanması arasında geçen blok sayısı |
| Consensus branch id | Bir düğümün veya işlemin hangi ağ kuralları kümesini izlediğini belirten etiket |
| Bilateral consensus change | Ağda kalmak için her düğümün benimsemesi gereken bir kural değişikliği |
| Network upgrade (NU) | Zcash'ın belirli bir blok yüksekliğinde etkinleştirilen konsensüs kurallarında yapılan koordineli değişiklik |

## SSS

Blossom mevcut ZEC miktarını veya yarılanmaların ne zaman gerçekleşeceğini değiştirir mi? Hayır. Blok başına ödül yarıya indirilirken yarılanma aralığı aynı anda ikiye katlandı; bu nedenle zaman birimi başına oluşturulan ZEC miktarı ve gelecekteki yarılanmaların zamanlaması aynı kaldı.

Blossom ZEC bakiyemi veya gizliliğimi değiştirir mi? Hayır. Blossom, blok zamanlamasını ve ödül hesaplamasını değiştirdi. Bakiyelerinize veya korumalı işlemlerinize dokunmadı.

75 saniye gerçekte ne anlama gelir? Bu bir hedeftir, garanti değildir. Bloklar iş kanıtıyla bulunduğundan bloklar arasındaki gerçek süre değişkenlik gösterir. Ağ, her 150 saniyede bir yerine yaklaşık her 75 saniyede bir blok hedefler.

Blossom etkinleştirildiğinde bir şey yapmam gerekiyor muydu? Tam düğüm çalıştırıyorsanız, Blossom zorunlu olduğundan onu yükseltmeniz gerekiyordu. Cüzdan kullanıyorsanız yeni kuralları destekleyen bir sürüm kullanmanız gerekiyordu.

Blok ödülünü neden yarıya indirmek gerekiyordu? Çünkü bloklar artık iki kat daha hızlı gelir. Blok başına ödülü yarıya indirmek, ağın ZEC iki kat daha hızlı oluşturmasını önler.

Blossom ne zaman etkinleştirildi? Ana ağın 653.600 numaralı bloğunda, 11 Aralık 2019 UTC tarihinde.

## Anlayıp anlamadığınızı sınayın

Blossom, Zcash blokların yaklaşık iki kat daha sık gelmesini sağladı. Bu, yeni ZEC oluşturulma hızını neden iki katına çıkarmadı?

<details>
<summary>Yanıt</summary>

Çünkü Blossom blok başına verilen ödülü de yarıya indirdi ve yarılanma aralığını 840.000 bloktan 1.680.000 bloğa çıkardı. İki kat fazla bloktan her birinin yarı ödül vermesi, zaman birimi başına aynı miktarda ZEC oluşturulması demektir; dolayısıyla gerçek zamanla ölçülen ihraç planı değişmedi.
</details>

### Kaynaklar

[ZIP 208: Daha Kısa Hedef Blok Aralığı](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0206)

[Blossom Ağ Yükseltmesi](https://z.cash/upgrade/blossom/)

[Blossom Yükseltmesi Hızı, Ölçeklenebilirliği ve Kapasiteyi Artırıyor (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Zcash Para Politikası](../start-here/zcash-monetary-policy)

[ZEC ve Zcash](../start-here/what-is-zec-and-zcash) nedir?

[Tam Düğümler](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

## İlgili Sayfalar

- [Sapling](./Sapling.md) — önceki yükseltme (kriptografi, zamanlama değil)
- [Heartwood](./Heartwood.md) — serideki sonraki yükseltme
- [Tam Düğümler](./Full_Nodes.md) — zorunlu yükseltmeler sırasında düğüm çalıştırmanın neleri içerdiği
- [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) — tüm yükseltmelerin zaman çizelgesi


Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Sapling](../zcash-tech/sapling) · Sonraki: [Heartwood](../zcash-tech/heartwood)
