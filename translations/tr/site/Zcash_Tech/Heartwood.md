---
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

![Heartwood'dan önce bir madencinin blok ödülü şeffaf, herkese açık bir adrese gitmek zorundaydı. Heartwood'dan sonra coinbase işlemleri Sapling çıktıları içerebilir, böylece ödül doğrudan bir shielded adrese gidebilir](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Neden önce Sapling

Shielded coinbase özellikle Sapling çıktılarını hedefler ve bunun bir nedeni vardır. ZIP 213, Sapling yükseltmesinin fonların doğrudan coinbase işleminde shielded hâle getirilmesini mümkün kılan mimari değişiklikler ve performans iyileştirmeleri getirdiğini açıklar. Orijinal Sprout shielded havuzu, korumayı doğrudan coinbase içinde yapabilmek için fazla kaynak yoğundu. Sapling'in daha verimli proving sistemi ve note formatı bunu uygulanabilir kıldı. Sapling, shielded coinbase çıktılarını engelleyen eski kuralı, Sapling çıktılarını da kapsayacak şekilde zaten genişletmişti; Heartwood ise bu kurala izin verecek biçimde esneklik kazandırır. Bu, Zcash yükseltmelerinin nasıl birbirinin üzerine inşa edildiğine dair iyi bir örnektir: bir yükseltmenin altyapısı, sonrakinin temeli hâline gelir.

## FlyClient

Heartwood ayrıca bir blok başlığının neye taahhütte bulunduğunu da değiştirdi. Önceden `hashFinalSaplingRoot` adı verilen başlık alanı, yeniden amaçlandırıldı ve `hashLightClientRoot` olarak yeniden adlandırıldı. Artık önceki blokların başlık verileri ve meta verileri üzerine kurulan, zaman damgaları, zorluk hedefleri, Sapling kökleri, birikmiş iş ve işlem sayıları gibi bilgileri içeren bir Merkle Mountain Range (MMR) köküne taahhütte bulunur. Bu taahhüt, bir hafif istemcinin veya dış bir zincirin, boyutu yalnızca zincirin uzunluğuna logaritmik olarak büyüyen küçük bir ispatla Zcash'in proof-of-work'ünü doğrulamasına imkân verir. Bunun getirisi daha iyi hafif istemci cüzdanları ve daha kolay üçüncü taraf ile zincirler arası entegrasyondur; çünkü artık bir istemcinin zincirin arkasındaki işe güvenmek için her bloğu indirmesi gerekmez.

![FlyClient akışı: her bloğun başlık verisi bir Merkle Mountain Range köküne (`hashLightClientRoot`) taahhüt edilir; bu da bir hafif istemcinin küçük, logaritmik boyutlu bir ispatla proof-of-work'ü doğrulamasını sağlar](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Heartwood'un yeri

Heartwood, Zcash yükseltmeleri dizisindeki adımlardan biridir; her biri, sonrakinin dayandığı bir parçayı ekler. Overwinter ve Sapling 2018'de, Blossom 2019'da ve Heartwood 2020'de 903.000. blokta geldi. Canopy ise 2020'nin ilerleyen dönemlerinde 1.046.400. blokta geldi. Heartwood için bu zincirdeki temel halka Sapling'dir: onun verimli shielded işlem altyapısı, shielded coinbase'i mümkün kılan teknik ön koşuldu.

![Zcash yükseltmelerinin zaman çizelgesi: Overwinter ve Sapling 2018'de, Blossom 2019'da ve Heartwood 2020'de](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Sözlük

| Terim | Sade anlamı |
|---|---|
| Ağ yükseltmesi (NU) | Zcash'in konsensüs kurallarında, belirli bir blok yüksekliğinde etkinleşen koordineli bir değişiklik |
| Coinbase işlemi | Her bloktaki blok ödülünü ödeyen özel işlem |
| Shielded Sapling adresi | Sapling yükseltmesiyle tanıtılan özel bir Zcash adres türü |
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

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Blossom](../zcash-tech/blossom) · Sonraki: [Canopy](../zcash-tech/canopy)
