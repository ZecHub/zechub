<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood, 16 Temmuz 2020 UTC tarihinde Zcash ana ağında 903.000 numaralı blokta devreye girdi.

Öğrenecekleriniz: Heartwood madencilerin blok ödüllerini doğrudan korumalı adreslere almasını nasıl sağladı ve Zcash'ın iş kanıtının hafif istemciler tarafından doğrulanabilir olmasını nasıl mümkün kıldı.

Heartwood, bir Zcash [ağ yükseltmesi](../start-here/network-upgrades), dağıtımı [ZIP 250](https://zips.z.cash/zip-0250) ile tanımlanan bir konsensüs kuralları hard fork'udur. İki özellik değişikliğini bir araya getirdi: [ZIP 213](https://zips.z.cash/zip-0213) (Korumalı Coinbase) ve [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood, Zcash'ın dördüncü büyük ağ yükseltmesiydi ve hem [Electric Coin Company](../zcash-organizations/electric-coin-company) hem de [Zcash Foundation](../zcash-organizations/zcash-foundation) tarafından ortaklaşa desteklendi. Her Zcash yükseltmesinde olduğu gibi, yeni bir konsensüs dal kimliği belirledi. Bu etiket, iki yönlü tekrar oynatma koruması sağlar; böylece yeni kurallar altında oluşturulan bir işlem eski Zincir üzerinde tekrar oynatılamaz, bunun tersi de geçerlidir.

Heartwood sabit bir saat zamanında değil, belirli bir blok yüksekliğinde (903.000) etkinleşir; bu nedenle gösterge panelinde gördüğünüz tam dakika konuma göre biraz farklılık gösterebilir. Blok da an da aynıdır.

Bunun önemi. Madenciler, bir bloğu her kazdıklarında yeni basılmış ZEC kazanır. Heartwood öncesinde bu gelir, herkese açık olan şeffaf bir adrese gitmek zorundaydı. Herkes bir madencinin ne kadar kazandığını ve coin'lerin daha sonra nereye gittiğini takip edebilirdi. Heartwood bu ödülün doğrudan korumalı bir adrese gitmesini sağladı; böylece madencinin ödemesi gizli kalabilir. Ayrıca hafif cüzdanların ve diğer Zincirlerin tüm Zincir'i indirmeden Zcash'ın iş kanıtını doğrulamasını mümkün kıldı.

## Korumalı coinbase

Coinbase işlemi, blok ödülünü dağıtan özel işlemdir. Heartwood öncesinde çıktılarının şeffaf olması gerekiyordu; bu nedenle madencinin yeni basılmış ZEC'i her zaman halka açık bir adreste hayata başlıyordu. Heartwood, konsensüs kurallarını değiştirdi; ZIP 213'ün ifadesiyle coinbase işlemleri artık Sapling çıktıları içerebilir. Başka bir deyişle, madenciler artık ödülleri doğrudan korumalı Sapling adreslerine alabilir. Şeffaf coinbase çıktıları desteklenmeye devam eder; dolayısıyla bu, zorunlu bir değişiklik değil, yeni bir seçenektir.

![Heartwood'dan önce madencinin blok ödülü şeffaf bir genel adrese gitmek zorundaydı. Heartwood'dan sonra coinbase işlemleri Sapling çıktıları içerebilir; böylece ödül doğrudan korumalı bir adrese gidebilir](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Önce neden Sapling

Korumalı coinbase özellikle Sapling çıktılarını hedefler ve bunun bir nedeni vardır. ZIP 213, Sapling yükseltmesinin mimari değişiklikler ve performans iyileştirmeleri getirerek fonların doğrudan coinbase işleminde korumalı hâle getirilmesini mümkün kıldığını açıklar. İlk Sprout korumalı havuzu, coinbase içinde doğrudan korumalı hâle getirmek için fazla kaynak gerektiriyordu. Sapling'ın daha verimli kanıtlama sistemi ve note biçimi bunu uygulanabilir kıldı. Sapling, korumalı coinbase çıktılarını yasaklayan eski kuralı Sapling çıktılarını da kapsayacak şekilde genişletmişti; Heartwood ise bu çıktılara izin vermek için kuralı gevşetiyor. Bu, Zcash yükseltmelerinin birbirinin üzerine nasıl inşa edildiğine iyi bir örnektir: Bir yükseltmenin altyapısı, bir sonraki yükseltmenin temelini oluşturur.

## FlyClient

Heartwood, blok başlığının taahhüt ettiği bilgileri de değiştirdi. Daha önce hashFinalSaplingRoot olarak adlandırılan başlık alanının işlevi değiştirildi ve adı hashLightClientRoot olarak değiştirildi. Artık önceki blokların zaman damgaları, zorluk hedefleri, Sapling kökleri, birikmiş iş miktarı ve işlem sayıları gibi başlık verileri ve meta verileri üzerinden oluşturulan, sürekli güncellenen bir Merkle Dağ Silsilesi'nin (MMR) köküne taahhüt ediyor. Bu taahhüt, hafif bir istemcinin veya harici bir Zincir'in, Zincir'in uzunluğuyla yalnızca logaritmik olarak büyüyen küçük bir kanıt kullanarak Zcash'ın iş kanıtını doğrulamasını sağlar. Bunun getirisi, daha iyi hafif istemci cüzdanları ve üçüncü taraflarla zincirler arası entegrasyonun kolaylaşmasıdır; çünkü bir istemcinin artık Zincir'in arkasındaki işi doğrulamak için her bloğu indirmesi gerekmez.

![FlyClient akışı: her bloğun başlık verileri bir Merkle Mountain Range köküne (hashLightClientRoot) taahhüt edilir; bu, hafif istemcinin iş kanıtını küçük, logaritmik boyutlu bir kanıtla doğrulamasını sağlar](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwood nereye oturuyor

Heartwood, Zcash yükseltmelerinden oluşan bir dizinin adımlarından biridir; her yükseltme, bir sonrakinin dayandığı bir parçayı ekler. Overwinter ve Sapling 2018'de, Blossom 2019'da, Heartwood ise 2020'de 903.000 numaralı blokta devreye girdi. Canopy, 2020'nin ilerleyen dönemlerinde 1.046.400 numaralı blokta bunları izledi. Sapling, Heartwood için bu Zincir'in kilit halkasıdır: Verimli korumalı işlem mekanizması, korumalı coinbase'i mümkün kılan teknik ön koşuldu.

![Zcash yükseltmeleri zaman çizelgesi: 2018'de Overwinter ve Sapling, 2019'da Blossom ve 2020'de Heartwood](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Kısaca

- Heartwood, 16 Temmuz 2020 UTC tarihinde ana ağın 903.000 numaralı bloğunda etkinleşti. ZIP 250 ile dağıtıldı ve iki yönlü tekrar oynatma koruması için yeni bir konsensüs dal kimliği belirlendi.
- ZIP 213 (Korumalı Coinbase): Coinbase işlemleri Sapling çıktıları içerebilir; böylece madenciler blok ödüllerini doğrudan korumalı bir adrese alabilir.
- ZIP 221 (FlyClient): Başlığın hashLightClientRoot alanı artık bir Merkle Dağ Silsilesi'ne taahhüt ediyor; böylece hafif istemciler, yalnızca logaritmik olarak büyüyen kanıtlarla iş kanıtını doğrulayabiliyor.
- Şeffaf coinbase çıktıları tamamen desteklenmeye devam eder; korumalı coinbase bir zorunluluk değil, yeni bir seçenektir.
- Etkinleşme belirli bir blok yüksekliğinde olur, saat zamanında değil; bu nedenle gösterge panelleri ve saat dilimleri arasındaki tam dakika farklılık gösterir.

## Temel Açıklama

Heartwood öncesinde, madencinin yeni basılmış ZEC'i şeffaf bir adreste hayata başlamak zorundaydı; böylece herkes madencinin gelirini görebiliyor ve nereye gittiğini izleyebiliyordu. ZIP 213, konsensüs kuralını gevşeterek coinbase işleminin Sapling çıktıları ödemesine izin verdi ve madencinin ödemesini var olduğu ilk andan itibaren gizli tuttu. Özellikle Sapling'i hedefler; çünkü Sapling'ın verimli kanıtlama sistemi, coinbase içinde korumalı hâle getirmeyi uygulanabilir kıldı. Sprout'ın ağır kanıtları ise burada kullanılamıyordu.

ZIP 221, başlık alanı hashFinalSaplingRoot'un işlevini değiştirerek hashLightClientRoot adını verdi. Artık önceki blokların başlık verileri (zaman damgaları, zorluk hedefleri, Sapling kökleri, birikmiş iş miktarı ve işlem sayıları) üzerinden oluşturulan bir Merkle Dağ Silsilesi'ne taahhüt ediyor. Böylece hafif bir istemci veya başka bir Zincir, her bloğu indirmek yerine küçük bir kanıtla Zcash'ın iş kanıtını doğrulayabilir.

## Görsel benzetme

Önce: Her madencinin maaş günü halka açık bir duyuru panosuna asılıyordu; tutarı ve izlediği yol herkes tarafından okunabiliyordu. Sonra: Maaş, mühürlü bir zarf içinde gelebilir. Ayrıca her yeni blok artık kendisinden önceki tüm blokları özetleyen kompakt bir mum mühür taşıyor; böylece bir yabancı, her sayfayı okumak yerine tek bakışta tüm iş Zincirini doğrulayabiliyor.

## Derinlemesine inceleme

Kural değişikliğinin bir geçmişi vardı: Sapling, korumalı coinbase'e yönelik ilk yasağı Sapling çıktılarını da kapsayacak şekilde genişletmişti; Heartwood ise bu çıktılara izin vermek için kısıtlamayı kaldırdı. Bu, bir yükseltmenin altyapısının bir sonrakinin temelini oluşturmasına iyi bir örnektir. MMR taahhüdü, hafif cüzdanlar ve zincirler arası entegrasyon için fayda sağlar; bu alanlarda Zcash'ın işini doğrulamak daha önce tüm Zincir'in indirilmesini gerektiriyordu. Etkinleştirme sırasında eklenen konsensüs dal kimliği, iki yönlü tekrar oynatma koruması sağlar: Yeni kurallar altında oluşturulan bir işlem eski Zincir üzerinde tekrar oynatılamaz, bunun tersi de geçerlidir.

## Yaygın Hatalar

- **Korumalı coinbase'in zorunlu hâle geldiğini düşünmek.** Şeffaf coinbase çıktıları hâlâ geçerlidir; seçimi madenciler yapar.
- **Sprout'in korumalı coinbase alabileceğini varsaymak.** Yalnızca Sapling çıktılarına izin verilir; Sprout'ın kanıtlama sistemi çok fazla kaynak gerektiriyordu.
- **FlyClient'in tam düğümlere olan ihtiyacı ortadan kaldırdığını sanmak.** Hafif istemcilere ve zincirler arası doğrulayıcılara hizmet eder; tam düğümler ağı sabitlemeye devam eder.
- **Sabit bir etkinleşme saati aramak.** Etkinleşme 903.000 numaralı blokta tanımlanmıştı; bu nedenle duvar saatindeki dakika değişiklik gösterir.
- **hashLightClientRoot'u eski hashFinalSaplingRoot ile karıştırmak.** Aynı alanın işlevi değiştirilip adı yenilendi.

## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Ağ yükseltmesi (NU) | Zcash'ın belirli bir blok yüksekliğinde etkinleşen konsensüs kurallarında yapılan eşgüdümlü değişiklik |
| Coinbase işlemi | Her blokta blok ödülünü dağıtan özel işlem |
| Korumalı Sapling adresi | Sapling yükseltmesiyle tanıtılan özel bir Zcash adres türü |
| Korumalı coinbase | Blok ödüllerinin korumalı Sapling adreslerine ödenmesini sağlayan Heartwood değişikliği |
| FlyClient | Hafif istemcilerin küçük kanıtlarla iş kanıtını doğrulamasını sağlayan yöntem |
| Merkle Dağ Silsilesi (MMR) | Blok başlığının taahhüt ettiği, geçmiş blokların sürekli güncellenen özeti |
| Konsensüs dal kimliği | Bir işlemin hangi yükseltmenin kurallarına tabi olduğunu belirten ve tekrar oynatma koruması için kullanılan etiket |

## SSS

Heartwood ZEC'imi veya gizliliğimi etkiler mi? Hayır. Heartwood mevcut fonlarınıza dokunmadı. Madencilerin ödülleri korumalı adreslere alabilmesi için bir seçenek ekledi ve hafif istemci desteğini iyileştirdi. Bakiyeleriniz ve korumalı işlemleriniz etkilenmez.

Korumalı coinbase nedir? Coinbase, blok ödülünü ödeyen işlemdir. Heartwood, bu ödülün şeffaf bir adres yerine korumalı bir Sapling adresine gitmesini sağlar; böylece madencinin geliri gizli kalabilir.

Madenciler artık ödülleri korumalı olarak almak zorunda mı? Hayır. Korumalı coinbase isteğe bağlıdır. Şeffaf coinbase çıktıları desteklenmeye devam eder; madenciler ikisinden birini seçebilir.

Korumalı coinbase neden eski Sprout havuzu yerine Sapling kullanıyor? Çünkü Sapling'ın daha verimli tasarımı, doğrudan coinbase içinde korumalı hâle getirmeyi uygulanabilir kıldı. Önceki Sprout havuzu bunu yapmak için çok fazla kaynak gerektiriyordu.

Hafif istemciler için ne değişti? Blok başlığı artık hashLightClientRoot alanı üzerinden geçmiş bloklar hakkındaki bir Merkle Dağ Silsilesi'ne taahhüt ediyor. Bu sayede hafif istemciler ve diğer Zincirler, tüm Zincir'i indirmek yerine küçük ve boyutu logaritmik olarak büyüyen kanıtlarla Zcash'ın iş kanıtını doğrulayabilir.

## Anlayıp anlamadığınızı sınayın

Heartwood öncesinde madenciye ödenen blok ödülü neden herkese açık görünüyordu ve Heartwood neyi değiştirdi?

<details>
<summary>Yanıt</summary>

Coinbase çıktılarının şeffaf olması gerekiyordu; bu nedenle madencinin yeni basılmış ödülü her zaman herkesin inceleyebileceği halka açık, şeffaf bir adrese gidiyordu. Heartwood, konsensüs kurallarını değiştirerek (ZIP 213) coinbase işlemlerinin Sapling çıktıları içermesine izin verdi; böylece madenciler ödüllerini doğrudan korumalı adreslere alabilir.
</details>

### Kaynaklar

[ZIP 250: Heartwood Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0250)

[ZIP 213: Korumalı Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Konsensüs Katmanı Değişiklikleri](https://zips.z.cash/zip-0221)

[Heartwood ağ yükseltmesi](https://z.cash/upgrade/heartwood/)

### Ayrıca bkz.

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Korumalı Havuzlar](../using-zcash/shielded-pools)

[Cüzdanlar](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## İlgili Sayfalar

- [Sapling](./Sapling.md) — korumalı coinbase'i mümkün kılan verimli mekanizma
- [Canopy](./Canopy.md) — serideki bir sonraki yükseltme
- [Tam Düğümler](./Full_Nodes.md) — tam doğrulamanın hâlâ sağladıkları
- [Bir Blok Gezgini Neleri Görebilir](./What_a_Block_Explorer_Can_See.md) — şeffaf ve korumalı coinbase'in ortaya çıkardıkları


Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Blossom](../zcash-tech/blossom) · Sonraki: [Canopy](../zcash-tech/canopy)
