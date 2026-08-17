<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Blossom

> Blossom, Zcash ana ağında 653,600. blokta (11 Aralık 2019 UTC) etkinleşti.

Buradan çıkaracağınız sonuç: Blossom'un, ağın zaman içinde ne kadar ZEC ürettiğini değiştirmeden Zcash bloklarının yaklaşık iki kat daha hızlı gelmesini nasıl sağladığı.

Blossom, bir Zcash [ağ yükseltmesi](../start-here/network-upgrades)dir. [ZIP 206](https://zips.z.cash/zip-0206) ile devreye alındı ve ana uzlaşma değişikliği [ZIP 208](https://zips.z.cash/zip-0208) içinde tanımlanmıştır. Blossom bir ölçeklenebilirlik yükseltmesiydi: bloklar arasındaki hedef süreyi 150 saniyeden 75 saniyeye düşürdü, böylece bloklar yaklaşık iki kat daha sık gelir hale geldi. Electric Coin Company, Blossom'a liderlik etti ve onu duyurdu.

Bu neden önemlidir? ZEC gönderdiğinizde, ağın bunu bir blok içinde onaylamasını beklersiniz. Bloklar yavaşsa, daha uzun beklersiniz. Blossom'dan önce yeni bir blok yaklaşık her 150 saniyede bir bekleniyordu. Blossom bu hedefi yarıya, yani 75 saniyeye indirdi; böylece onaylar daha erken gelir ve zincir aynı süre içinde daha fazla işlem taşıyabilir. Bunu daha fazla ZEC üretmeden veya gelecekteki yarılanmaların zamanlamasını kaydırmadan yaptı.

## Daha hızlı bloklar

Blossom'un temel değişikliği basittir. Zcash'in hedef blok aralığı, yani ağın bir blok ile sonraki blok arasındaki süre için hedeflediği zaman, 150 saniyeden 75 saniyeye düştü ([ZIP 208](https://zips.z.cash/zip-0208)). Bloklar proof of work ile bulunur, bu yüzden aralarındaki gerçek süre değişkenlik gösterir; ancak ağ artık yaklaşık her 150 saniyede bir yerine yaklaşık her 75 saniyede bir blok hedeflemektedir.

Bundan iki sonuç çıkar:

1. Bloklar yaklaşık iki kat daha sık gelir, bu yüzden zincir zaman birimi başına kabaca iki kat daha fazla işlem taşıyabilir.
2. İşleminiz ilk onayını daha erken alır, çünkü bir sonraki blok için o kadar uzun beklemezsiniz.

![Blossom'dan önce blok hedefi 150 saniyeydi; onaylar daha yavaştı ve işlem kapasitesi daha düşüktü. Blossom'dan sonra hedef 75 saniyedir; onaylar daha hızlıdır ve kapasite kabaca iki katına çıkar](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## İhracı sabit tutmak

Daha hızlı bloklar bir soruyu gündeme getirir. Eğer Zcash iki kat fazla blok üretse ve her blok hâlâ aynı ödülü verseydi, ağ ZEC'i iki kat daha hızlı üretirdi. Blossom bunu önler. Blok başına ödenen ödülü yarıya indirdi ve blok ödülü yarılanma aralığını 840,000 bloktan 1,680,000 bloğa çıkardı ([ZIP 208](https://zips.z.cash/zip-0208)). İki kat fazla blok ve her birinin yarı miktarda ödeme yapması, zaman birimi başına üretilen ZEC miktarını aynı tutar. Toplam arz takvimi ve gelecekteki yarılanmaların gerçek zamana göre zamanlaması değişmedi.

![Blossom'un ihracı nasıl sabit tuttuğu: 75 saniyelik bloklar iki kat daha sık gelir, blok başına ödül yarıya iner, yarılanma aralığı iki katına çıkar; böylece zaman içindeki toplam emisyon aynı kalır](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## Zorunlu bir yükseltme

Blossom iki taraflı bir uzlaşma değişikliğiydi; bu da her düğümün zinciri izlemeye devam etmek için yükseltilmesi gerektiği anlamına gelir ([ZIP 206](https://zips.z.cash/zip-0206)). Senkronize kalmak isteyen bir düğüm operatörü için bu isteğe bağlı değildi. Blossom, ana ağda 653,600. blokta etkinleşti ve kendi uzlaşma dalı kimliğini taşır; bu, düğümlerin ve işlemlerin Blossom kurallarında olduklarını doğrulamalarını sağlayan bir etikettir. Yükseltme, Zcash'in standart ağ yükseltme mekanizmasını kullandı ([ZIP 200](https://zips.z.cash/zip-0200)).

## Blossom'un yeri

Blossom, Zcash'in üçüncü ağ yükseltmesiydi. Overwinter ve Sapling'den sonra geldi, Heartwood ve Canopy'den önce yer aldı. Zcash'in shielded kriptografisini yeniden düzenleyen Sapling'in aksine, Blossom ölçek ve hıza odaklanmıştı. Ana görevi blok zamanlamasıydı, yeni gizlilik özellikleri değil.

## Sözlük

| Terim | Sade anlamı |
|---|---|
| Hedef blok aralığı | Ağın bir blok ile sonraki blok arasında hedeflediği süre |
| Blok ödülü | Her blok kazıldığında oluşturulan ve dağıtılan yeni ZEC |
| Yarılanma aralığı | Blok ödülünün her yarılanması arasında geçen blok sayısı |
| Uzlaşma dalı kimliği | Bir düğümün veya işlemin hangi ağ kuralları kümesini izlediğini gösteren etiket |
| İki taraflı uzlaşma değişikliği | Ağda kalmak için her düğümün benimsemesi gereken kural değişikliği |
| Ağ yükseltmesi (NU) | Belirli bir blok yüksekliğinde etkinleşen, Zcash'in uzlaşma kurallarındaki koordineli değişiklik |

## SSS

Blossom, var olan ZEC miktarını veya yarılanmaların ne zaman olacağını değiştirir mi? Hayır. Blok başına ödül yarıya indirildi ve yarılanma aralığı aynı anda iki katına çıkarıldı; bu yüzden zaman birimi başına oluşturulan ZEC miktarı ve gelecekteki yarılanmaların zamanlaması aynı kaldı.

Blossom, benim ZEC'imi veya gizliliğimi değiştirir mi? Hayır. Blossom blok zamanlamasını ve ödül hesaplamasını değiştirdi. Bakiyelerinize veya shielded işlemlerinize dokunmadı.

75 saniye gerçekte ne anlama geliyor? Bu bir hedeftir, garanti değil. Bloklar proof of work ile bulunur, bu yüzden bloklar arasındaki gerçek süre değişir. Ağ artık yaklaşık her 150 saniyede bir yerine yaklaşık her 75 saniyede bir blok hedefler.

Blossom etkinleştiğinde benim bir şey yapmam gerekiyor muydu? Bir tam düğüm çalıştırıyorsanız, onu yükseltmeniz gerekiyordu; çünkü Blossom zorunluydu. Bir cüzdan kullanıyorsanız, yeni kuralları destekleyen bir sürüme ihtiyacınız vardı.

Blok ödülünü neden yarıya indirmek gerekti? Çünkü bloklar artık iki kat daha hızlı geliyor. Blok başına ödülün yarıya indirilmesi, ağın ZEC'i iki kat hızla üretmesini engeller.

Blossom ne zaman etkinleşti? 11 Aralık 2019 UTC tarihinde, ana ağın 653,600. bloğunda.

## Anladığınızı test edin

Blossom, Zcash bloklarının yaklaşık iki kat daha sık gelmesini sağladı. Bu neden yeni ZEC oluşturulma oranını ikiye katlamadı?

<details>
<summary>Cevap</summary>

Çünkü Blossom aynı zamanda blok başına ödenen ödülü yarıya indirdi ve yarılanma aralığını 840,000 bloktan 1,680,000 bloğa çıkardı. İki kat fazla blok ve her birinin yarı miktarda ödeme yapması, zaman birimi başına aynı miktarda ZEC eder; dolayısıyla gerçek zamana göre ölçülen emisyon takvimi değişmedi.
</details>

### Kaynaklar

[ZIP 208: Daha Kısa Hedef Blok Aralığı](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom Ağ Yükseltmesinin Devreye Alınması](https://zips.z.cash/zip-0206)

[Blossom Ağ Yükseltmesi](https://z.cash/upgrade/blossom/)

[Blossom Yükseltmesi Hız, Ölçeklenebilirlik ve Kapasiteyi İyileştiriyor (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Zcash Para Politikası](../start-here/zcash-monetary-policy)

[ZEC ve Zcash Nedir](../start-here/what-is-zec-and-zcash)

[Tam Düğümler](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Sapling](../zcash-tech/sapling) · Sonraki: [Heartwood](../zcash-tech/heartwood)
