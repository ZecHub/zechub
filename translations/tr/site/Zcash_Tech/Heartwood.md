<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood, Zcash ana ağında 903.000. blokta (16 Temmuz 2020 UTC) etkinleşti.

Buradan çıkaracağınız sonuç: Heartwood'un madencilerin blok ödüllerini doğrudan shielded adreslere almasını nasıl sağladığı ve Zcash'in proof-of-work'ünün hafif istemciler tarafından nasıl doğrulanabilir hâle geldiği.

Heartwood, Zcash'in bir [ağ yükseltmesidir](../start-here/network-upgrades); dağıtımı [ZIP 250](https://zips.z.cash/zip-0250) içinde tanımlanan, konsensüs kurallarını değiştiren bir hard fork'tur. İki özellik değişikliğini bir araya getirmiştir: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) ve [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood, Zcash'in dördüncü büyük ağ yükseltmesiydi ve [Electric Coin Company](../zcash-organizations/electric-coin-company) ile [Zcash Foundation](../zcash-organizations/zcash-foundation) tarafından ortaklaşa desteklendi. Her Zcash yükseltmesinde olduğu gibi, yeni bir consensus branch id belirledi; bu etiket, yeni kurallar altında oluşturulan bir işlemin eski zincirde tekrar oynatılamamasını ve tersinin de geçerli olmasını sağlayan çift yönlü replay koruması sunar.

Heartwood sabit bir saat zamanında değil, belirli bir blok yüksekliğinde (903.000) etkinleşir; bu yüzden bir panoda gördüğünüz tam dakika, bir yerden diğerine biraz farklılık gösterebilir. Blok da an da aynıdır.

Bu neden önemlidir? Madenciler, her blok kazdıklarında yeni basılmış ZEC kazanırlar. Heartwood'dan önce bu gelir şeffaf bir adrese gitmek zorundaydı; yani herkese açıktı. Herkes bir madencinin ne kadar kazandığını ve coin'lerin daha sonra nereye gittiğini görebiliyordu. Heartwood, bu ödülün bunun yerine doğrudan bir shielded adrese gitmesine izin verdi; böylece bir madencinin kazancı gizli kalabilir. Ayrıca hafif cüzdanların ve diğer zincirlerin, tüm zinciri indirmeden Zcash'in proof-of-work'ünü doğrulayabilmesini mümkün kıldı.

## Shielded coinbase

Coinbase işlemi, blok ödülünü ödeyen özel işlemdir. Heartwood'dan önce, çıktılarının şeffaf olması gerekiyordu; bu nedenle bir madencinin yeni basılmış ZEC'i her zaman herkese açık bir adreste hayata başlıyordu. Heartwood, konsensüs kurallarını değiştirerek ZIP 213'ün ifadesiyle coinbase işlemlerinin Sapling çıktıları içerebilmesini sağladı. Basitçe söylemek gerekirse, madenciler artık ödüllerini doğrudan shielded Sapling adreslerine alabiliyor. Şeffaf coinbase çıktıları hâlâ desteklenmektedir; yani bu zorunlu bir değişiklik değil, yeni bir seçenektir.

![Heartwood'dan önce bir madencinin blok ödülü şeffaf, herkese açık bir adrese gitmek zorundaydı. Heartwood'dan sonra coinbase işlemleri Sapling çıktıları içerebilir, böylece ödül doğrudan bir shielded adrese gidebilir](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Neden önce Sapling

Shielded coinbase özellikle Sapling çıktılarını hedefler ve bunun bir nedeni vardır. ZIP 213, Sapling yükseltmesinin fonların doğrudan coinbase işleminde shielded hâle getirilmesini mümkün kılan mimari değişiklikler ve performans iyileştirmeleri getirdiğini açıklar. Orijinal Sprout shielded havuzu, korumayı doğrudan coinbase içinde yapabilmek için fazla kaynak yoğundu. Sapling'in daha verimli proving sistemi ve note formatı bunu uygulanabilir kıldı. Sapling, shielded coinbase çıktılarını engelleyen eski kuralı, Sapling çıktılarını da kapsayacak şekilde zaten genişletmişti; Heartwood ise bu kurala izin verecek biçimde esneklik kazandırır. Bu, Zcash yükseltmelerinin nasıl birbirinin üzerine inşa edildiğine dair iyi bir örnektir: bir yükseltmenin altyapısı, sonrakinin temeli hâline gelir.

## FlyClient

Heartwood ayrıca bir blok başlığının neye taahhütte bulunduğunu da değiştirdi. Önceden `hashFinalSaplingRoot` adı verilen başlık alanı, yeniden amaçlandırıldı ve `hashLightClientRoot` olarak yeniden adlandırıldı. Artık önceki blokların başlık verileri ve meta verileri üzerine kurulan, zaman damgaları, zorluk hedefleri, Sapling kökleri, birikmiş iş ve işlem sayıları gibi bilgileri içeren bir Merkle Mountain Range (MMR) köküne taahhütte bulunur. Bu taahhüt, bir hafif istemcinin veya dış bir zincirin, boyutu yalnızca zincirin uzunluğuna logaritmik olarak büyüyen küçük bir ispatla Zcash'in proof-of-work'ünü doğrulamasına imkân verir. Bunun getirisi daha iyi hafif istemci cüzdanları ve daha kolay üçüncü taraf ile zincirler arası entegrasyondur; çünkü artık bir istemcinin zincirin arkasındaki işe güvenmek için her bloğu indirmesi gerekmez.

![FlyClient akışı: her bloğun başlık verisi bir Merkle Mountain Range köküne (`hashLightClientRoot`) taahhüt edilir; bu da bir hafif istemcinin küçük, logaritmik boyutlu bir ispatla proof-of-work'ü doğrulamasını sağlar](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwood'un yeri

Heartwood, Zcash yükseltmeleri dizisindeki adımlardan biridir; her biri, sonrakinin dayandığı bir parçayı ekler. Overwinter ve Sapling 2018'de, Blossom 2019'da ve Heartwood 2020'de 903.000. blokta geldi. Canopy ise 2020'nin ilerleyen dönemlerinde 1.046.400. blokta geldi. Heartwood için bu zincirdeki temel halka Sapling'dir: onun verimli shielded işlem altyapısı, shielded coinbase'i mümkün kılan teknik ön koşuldu.

![Zcash yükseltmelerinin zaman çizelgesi: Overwinter ve Sapling 2018'de, Blossom 2019'da ve Heartwood 2020'de](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Özet

- Heartwood, ana ağda 903.000 numaralı blokta (16 Temmuz 2020 UTC) etkinleşti; iki yönlü replay koruması için yeni bir konsensüs dal kimliğiyle (consensus branch id) ZIP 250 aracılığıyla devreye alındı.
- ZIP 213 (Shielded Coinbase): coinbase işlemleri Sapling çıktıları içerebilir; böylece madenciler blok ödüllerini doğrudan shielded bir adrese alabilir.
- ZIP 221 (FlyClient): blok başlığındaki hashLightClientRoot artık bir Merkle Mountain Range'e taahhütte bulunur; bu da hafif istemcilerin proof-of-work'ü yalnızca logaritmik olarak büyüyen ispatlarla doğrulamasını sağlar.
- Transparent coinbase çıktıları hâlâ tam olarak desteklenmektedir. Shielded coinbase bir zorunluluk değil, yeni bir seçenektir.
- Etkinleşme bir saat zamanına göre değil, bir blok yüksekliğine göre gerçekleşir. Bu nedenle tam dakika, panolar ve saat dilimleri arasında farklılık gösterir.

## Temel Açıklama

Heartwood öncesinde, bir madencinin yeni basılmış ZEC'i hayatına şeffaf bir adreste başlamak zorundaydı; bu nedenle herkes bir madencinin gelirini izleyebilir ve nereye gittiğini takip edebilirdi. ZIP 213, coinbase işleminin Sapling çıktılarına ödeme yapabilmesi için mutabakat kuralını gevşetti ve böylece bir madencinin kazancı, var olduğu ilk andan itibaren gizli kalır. Özellikle Sapling'ı hedef alır, çünkü Sapling'ın verimli ispat üretimi coinbase içinde korumayı pratik hale getirdi; Sprout'ın ağır ispatları ise orada uygulanabilir değildi.

ZIP 221, hashFinalSaplingRoot başlık alanını hashLightClientRoot olarak yeniden kullandı. Bu alan artık önceki blokların başlık verileri üzerine kurulan bir Merkle Mountain Range'e taahhütte bulunur: zaman damgaları, zorluk hedefleri, Sapling kökleri, birikmiş iş ve işlem sayıları. Böylece bir hafif istemci ya da başka bir zincir, her bloğu indirmek yerine küçük bir kanıtla Zcash'ın iş ispatını doğrulayabilir.

## Görsel benzetme

Önce: her madencinin maaş günü herkese açık bir ilan panosuna asılıyordu; tutar da iz de herkes tarafından okunabiliyordu. Sonra: maaş artık mühürlü bir zarf içinde gelebiliyor. Üstelik her yeni blok artık kendisinden önceki tüm blokları özetleyen küçük bir mum mühür taşıyor; böylece bir yabancı, her sayfayı tek tek okumak yerine tek bir bakışla tüm iş zincirini doğrulayabiliyor.

## Derinlemesine İnceleme

Kural değişikliğinin bir geçmişi vardı: Sapling, korumalı coinbase üzerindeki orijinal yasağı Sapling çıktılarını da kapsayacak şekilde genişletmişti; Heartwood ise bu kısıtlamayı kaldırarak bunlara izin verdi. Bu, bir yükseltmenin altyapısının bir sonraki yükseltmenin temeline dönüşmesine dair net bir örnektir. MMR taahhüdü, daha önce Zcash'ün işini doğrulamanın tüm zincirin indirilmesini gerektirdiği hafif cüzdanlarda ve zincirler arası entegrasyonda karşılığını verir. Aktivasyonla birlikte eklenen konsensüs dal kimliği (consensus branch id) iki yönlü tekrar oynatma koruması sağlar: yeni kurallar altında oluşturulan bir işlem eski zincirde tekrar oynatılamaz, bunun tersi de geçerlidir.

## Sık Yapılan Hatalar

- **Shielded coinbase'in zorunlu hale geldiğini düşünmek.** Şeffaf coinbase çıktıları hâlâ geçerlidir; seçim madencilere aittir.
- **Sprout'ün shielded coinbase alabileceğini varsaymak.** Yalnızca Sapling çıktılarına izin verilir; Sprout'ün ispat üretimi çok fazla kaynak gerektiriyordu.
- **FlyClient'ün tam düğümlere olan ihtiyacı ortadan kaldırdığına inanmak.** Hafif istemcilere ve zincirler arası doğrulayıcılara hizmet eder; ağın dayanağı hâlâ tam düğümlerdir.
- **Sabit bir aktivasyon saati aramak.** Aktivasyon 903,000 numaralı blokta tanımlandığı için gerçek saatteki dakika değişir.
- **hashLightClientRoot'u eski hashFinalSaplingRoot ile karıştırmak.** Aynı alanın amacı değiştirildi ve adı yenilendi.

## Sözlük

| Terim | Sade anlamı |
|---|---|
| Network upgrade (NU) | Zcash'in konsensüs kurallarında, belirli bir blok yüksekliğinde etkinleşen koordineli bir değişiklik |
| Coinbase transaction | Her bloktaki blok ödülünü ödeyen özel işlem |
| Shielded Sapling address | Sapling yükseltmesiyle tanıtılan özel bir Zcash adres türü |
| Shielded coinbase | Blok ödüllerinin shielded Sapling adreslerine ödenmesini sağlayan Heartwood değişikliği |
| FlyClient | Hafif istemcilerin proof-of-work'ü küçük ispatlarla doğrulamasını sağlayan bir yöntem |
| Merkle Mountain Range (MMR) | Blok başlığının taahhütte bulunduğu, geçmiş blokların çalışan bir özeti |
| Consensus branch id | Bir işlemin hangi yükseltmenin kurallarını izlediğini belirten ve replay koruması için kullanılan etiket |

## SSS

Heartwood benim ZEC'imi veya gizliliğimi değiştiriyor mu? Hayır. Heartwood mevcut fonlarınıza dokunmadı. Madencilerin ödüllerini shielded adreslere alabilmesi seçeneğini ekledi ve hafif istemcilere yönelik desteği iyileştirdi. Kendi bakiyeleriniz ve shielded işlemleriniz etkilenmez.

Shielded coinbase nedir? Coinbase, blok ödülünü ödeyen işlemdir. Heartwood, bu ödülün şeffaf bir adres yerine shielded bir Sapling adresine gitmesine izin verir; böylece madenci geliri özel kalabilir.

Madenciler artık ödüllerini zorunlu olarak shielded mı almak zorunda? Hayır. Shielded coinbase isteğe bağlıdır. Şeffaf coinbase çıktıları desteklenmeye devam eder; dolayısıyla madenciler ikisinden birini seçebilir.

Shielded coinbase neden eski Sprout havuzu yerine Sapling kullanıyor? Çünkü Sapling'in daha verimli tasarımı, korumayı doğrudan coinbase içinde uygulanabilir hâle getirdi. Daha önceki Sprout havuzu bunu yapmak için fazla kaynak yoğundu.

Hafif istemciler için ne değişti? Blok başlığı artık `hashLightClientRoot` alanı aracılığıyla geçmiş bloklar üzerinde bir Merkle Mountain Range'e taahhütte bulunur. Bu, hafif istemcilerin ve diğer zincirlerin, tüm zincir yerine küçük, logaritmik boyutlu ispatlarla Zcash'in proof-of-work'ünü doğrulamasını sağlar.

## Bilginizi test edin

Heartwood'dan önce, bir madenciye ödenen blok ödülü neden herkesin görebildiği şekilde ortaya çıkıyordu ve Heartwood neyi değiştirdi?

<details>
<summary>Cevap</summary>

Coinbase çıktılarının şeffaf olması gerekiyordu; bu yüzden bir madencinin yeni basılmış ödülü her zaman herkesin inceleyebileceği şeffaf, herkese açık bir adrese gidiyordu. Heartwood, konsensüs kurallarını (ZIP 213) değiştirerek coinbase işlemlerinin Sapling çıktıları içerebilmesini sağladı; böylece madenciler ödüllerini doğrudan shielded adreslere alabilir oldu.
</details>

### Kaynaklar

[ZIP 250: Heartwood Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Konsensüs Katmanı Değişiklikleri](https://zips.z.cash/zip-0221)

[Heartwood ağ yükseltmesi](https://z.cash/upgrade/heartwood/)

### Ayrıca bakınız

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Shielded Havuzlar](../using-zcash/shielded-pools)

[Cüzdanlar](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## İlgili Sayfalar

- [Sapling](./Sapling.md) — korumalı coinbase'i mümkün kılan verimli mekanizma
- [Canopy](./Canopy.md) — serideki bir sonraki yükseltme
- [Tam Düğümler](./Full_Nodes.md) — tam doğrulamanın hâlâ sağladıkları
- [Bir Blok Gezgininin Görebildikleri](./What_a_Block_Explorer_Can_See.md) — şeffaf ve korumalı coinbase'in neleri açığa çıkardığı

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Blossom](../zcash-tech/blossom) · Sonraki: [Canopy](../zcash-tech/canopy)
