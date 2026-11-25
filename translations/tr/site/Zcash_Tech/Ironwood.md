<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Ironwood

> Ironwood, 28 Temmuz 2026 UTC tarihinde 3.428.143 numaralı blokta Zcash ana ağında etkinleştirildi ve o tarihten beri çalışır durumda.

Bu yazıdan öğrenecekleriniz: Ironwood neleri değiştirdiği, gizli paradaki bir hatanın neden ciddi olduğu ve turnikenin herkesin hiçbir ZEC sahteciliği yapılmadığını doğrulamasını nasıl sağladığı.

Ironwood, aynı adı taşıyan yeni bir korumalı havuz oluşturan bir Zcash [ağ yükseltmesidir](../start-here/network-upgrades); resmî adıyla NU6.3'tür. Bir [korumalı havuz](../using-zcash/shielded-pools), miktarları ve sahipleri [sıfır bilgi kriptografisi](../zcash-tech/zk-snarks) ile gizli tutulan fonların oluşturduğu kümedir. Ironwood, mevcut Orchard korumalı havuzunda bulunan bir doğruluk hatasını sınırlandırmak ve topluluğa ZEC toplam arzının dürüst olduğunu denetlemek için daha güçlü bir yöntem sunmak amacıyla oluşturuldu. Konsensüs kuralları [ZIP 258](https://zips.z.cash/zip-0258)'de tanımlanmıştır.

Bu neden önemli? Bitcoin gibi şeffaf paralarda herkes, herkese açık defteri inceleyerek hiçbir coin'in sahteciliğinin yapılmadığını doğrulayabilir. Korumalı paralarda miktarlar gizlidir, dolayısıyla yalnızca bakarak bunu anlayamazsınız. Bunun yerine kriptografinin kendisi, hiç kimsenin gizlice para oluşturamayacağını garanti etmelidir. Ironwood önemlidir; çünkü Orchard havuzuna yönelik bu garantide bir hata bulundu. Yükseltme bu açığı kapatır ve herkese ZEC toplam arzının hâlâ dürüst olduğunu doğrulama olanağı verir.

Zcash hakkında yeni misiniz? Önce [ZEC ve Zcash](../start-here/what-is-zec-and-zcash) ve [Korumalı Havuzlar](../using-zcash/shielded-pools) yazılarını okuyun, sonra buraya dönün.

![Ironwood değer taşıma akışı: değer Orchard havuzundan çıkar, turnike kontrol noktasından geçer ve yeni Ironwood havuzuna girer](/content-images/ironwood-flow-8af7a58b99.webp)

## Ironwood neden gerekliydi?

Mayıs 2026'nın sonlarında, bağımsız güvenlik araştırmacısı Taylor Hornby, [Shielded Labs](../zcash-organizations/shielded-labs) için yaptığı protokol denetimi sırasında Orchard korumalı havuzunda bir doğruluk hatası buldu ve sorumlu bir şekilde bildirdi. Orchard, o sırada Zcash'ın en yeni korumalı havuzuydu. Kusur, [Halo](../zcash-tech/halo) 2 kanıtlama sistemini kullanan sıfır bilgi devresinin eliptik eğriyle ilgili bir bölümündeydi.

1. Doğruluk hatası, bir işlemin geçerli olduğunu kanıtlayan matematiğin işlemin geçerliliğini tam olarak garanti etmediği anlamına gelir.
2. Teoride bir saldırgan, bu kusuru Orchard havuzunda geçersiz değer üretmek ve gerçekte kendisine ait olmayan fonları harcamak için kullanabilirdi; bunu da sıradan bir düğümün tespit edebileceği bir iz bırakmadan yapabilirdi.
3. Zcash turnikesi Orchard dışına çıkabilecek değeri yine de sınırlıyordu; bu nedenle toplam arz artırılamazdı. Ancak havuzun kendi kriptografisi artık içindeki her gizli coin'in gerçek olduğunu garanti etmiyordu.

![Hata açıklaması: bir işlem 5 ZEC yatırır, ancak kusurlu kanıt 7 ZEC çıkışında da geçer ve yoktan 2 ZEC oluşturur](/content-images/ironwood-bug-8f689d6f61.webp)

Yukarıdaki sayılar basitleştirilmiş bir anlatımdır. Gerçek kusur, devrenin matematiğinde belirli bir bölümdeydi; havuza giren ve çıkan coin'lerin gerçek sayısıyla ilgili değildi. Buradan çıkarılması gereken tek nokta, doğruluk hatasının havuz içinde fark edilmeden değer oluşturulmasına imkân verebileceğidir.

Önemli bir nokta: Hatanın istismar edildiğine, kullanıcı fonlarının etkilendiğine veya ZEC toplam arzının değiştiğine dair hiçbir kanıt yoktur. Hata güvenlik araştırması sırasında bulundu ve bilinen herhangi bir zarar oluşmadan düzeltildi.

## Verilen yanıt

Zcash topluluğu düzeltmeleri tek seferde değil, aşamalar hâlinde yayımladı.

![Ironwood yanıt zaman çizelgesi: Orchard hatası Mayıs 2026'da bulundu, havuz Haziran 2026'da duraklatıldı, devre NU6.2'de düzeltildi ve Ironwood 28 Temmuz 2026'da 3,428,143 numaralı blokta etkinleştirildi](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Haziran 2026'nın başlarında, kapsamlı bir düzeltme hazırlanırken geçici bir önlem olarak Orchard havuzu devre dışı bırakıldı.
2. NU6.2 yükseltmesi, Orchard devresini düzelterek temel doğruluk açığını kapattı.
3. NU6.3 yükseltmesi, yani Ironwood, yeni bir korumalı havuz ve herkese açık bir kontrol noktası oluşturarak değerin eski Orchard havuzundan eksiksiz bir denetim altında taşınmasını sağlar.

![NU6.2'deki düzeltme: düzeltilmiş kanıt, girdilerin çıktılara eşit olmasını gerektirir; bu nedenle geçerli 5 ZEC çıktısı kabul edilirken 7 ZEC çıkarma girişimi reddedilir](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ironwood havuzu ne işe yarar?

NU6.2, tüm yeni işlemler için Orchard devresini güvenli hâle getirdi; ancak eski kurallar altında oluşturulan değer hâlâ Orchard havuzunda duruyor. Ironwood, bu değere temiz bir hedef ve taşınırken denetlenmesini sağlayan bir yöntem sunar.

Ironwood havuzu, NU6.3 tarafından 3.428.143 numaralı blokta oluşturulan korumalı değer havuzudur. Düzeltilmiş devre üzerine kuruludur ve kuantum bilgisayarların [kuantum bilgisayarlar](../zcash-tech/post-quantum-security) bugünkü kriptografiyi kırması hâlinde fonların kurtarılmasını sağlayan, kuantumla kurtarılabilir bir note biçimi kullanır. Bu biçim [ZIP 2005](https://zips.z.cash/zip-2005)'te tanımlanmıştır.

1. Etkinleştirmenin ardından eski Orchard havuzu yalnızca harcamaya açık hâle gelir; bu havuza yeni değer giremez.
2. Yeni korumalı değerler bunun yerine Ironwood havuzuna aktarılır.
3. Ironwood içinde korumalı ZEC, göndereni, alıcıyı ve miktarı gizleyerek gizliliği korur. Orchard havuzundan Ironwood havuzuna ZEC aktarılması, taşınan miktarı gösterir.

## Turnike

Ironwood'ın temel fikri turnikedir: Eski Orchard havuzundan Ironwood havuzuna taşınırken her coin'in geçmesi gereken bir muhasebe kontrol noktası.

> Turnike, gizli para için banka kasasının cam kapısının yaptığı işi görür. İçeriyi yine göremezsiniz, ancak giren ve çıkan miktarı tam olarak sayabilirsiniz.

1. Orchard havuzundan çıkan fonlar, Ironwood havuzuna girmeden önce herkese açık bir doğrulama noktasında sayılır.
2. Böylece herkes ne kadar ZEC taşındığını denetleyebilir ve gerçek dolaşımdaki arza duyulan güven güçlenir.
3. Önceki hata nedeniyle sahte ZEC oluşturulmuş olsaydı, bu taşıma muhasebesi sırasında ortaya çıkardı.

Turnikeler Zcash için yeni değildir. Ağ, değer havuzlar arasında taşınırken denetlenebilir kalması ve hiçbir havuzun meşru biçimde aldığı miktardan fazlasını serbest bırakamaması için bunları daha önce Sprout, Sapling ve Orchard havuzlarının sınırlarında kullandı.

Konsensüs kuralları, Ironwood dâhil tüm değer havuzlarını ağın azami para sınırı içinde tutar; dolayısıyla havuz bakiyeleri hiçbir zaman negatif olamaz.

## Kullanıcıların yapması gerekenler

Cüzdanlar ve düğüm yazılımları bu işlemlerin çoğunu otomatik olarak yönetir. Uygulamadaki değişiklik basittir: Zaman içinde, korumalı varlıklarınızı eski Orchard havuzundan turnike aracılığıyla Ironwood havuzuna taşıyın. Her aktarımın miktarı blokzincirde görünür; bu nedenle [ZIP 318](https://zips.z.cash/zip-0318) standardı uygulayan cüzdanlar tutarı standart miktarlara bölerek zaman içinde gönderir. Cüzdan sağlayıcınızın yönlendirmelerini izleyin ve yazılımınızı desteklenen bir sürümde tutun.

## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Shielded pool | Miktarları ve sahipleri sıfır bilgi kriptografisiyle gizlenen fonların oluşturduğu küme |
| Soundness bug | Geçersiz bir işlemin kanıt denetimini geçerliymiş gibi geçmesine imkân veren kusur |
| Turnstile | Arzın denetlenebilir kalması için havuzlar arasında taşınan değeri sayan, herkese açık kontrol noktası |
| Spend-only | İçinden harcama yapabileceğiniz, ancak yeni değer ekleyemeyeceğiniz havuz |
| Network upgrade (NU) | Zcash konsensüs kurallarında belirli bir blok yüksekliğinde etkinleştirilen, eşgüdümlü değişiklik |
| Quantum-recoverable note | Kuantum bilgisayarların bugünkü kriptografiyi kırması hâlinde fonların kurtarılabilmesi için tasarlanmış note biçimi |

## SSS

ZEC'ım etkilendi mi? Hayır. Hatanın kullanıldığına, kullanıcı fonlarının etkilendiğine veya toplam arzın değiştiğine dair hiçbir kanıt yoktur.

Bir şey yapmam gerekiyor mu? Cüzdan ve düğüm yazılımlarınızı desteklenen bir sürümde tutun. Orchard fonlarını harcamak bunları Ironwood havuzuna taşır ve havuzlar arasındaki miktar herkese açık olur. Bazı cüzdanlar, bakiyenizin ilişkilendirilmesini zorlaştırmak için standart miktarları zaman içinde gönderen bir taşıma seçeneği sunar. Cüzdan sağlayıcınızın yönlendirmelerini izleyin.

Zcash hâlâ gizli mi? Evet. Ironwood içindeki ödemeler, Orchard ödemelerinde olduğu gibi göndereni, alıcıyı ve miktarı gizler. Orchard havuzundan Ironwood havuzuna yapılan aktarım gibi, havuzlar arasında taşınan miktar herkese açıktır. Bu yükseltme arzın bütünlüğüyle ilgilidir.

Hata istismar edildi mi? Edildiğine dair hiçbir kanıt yoktur. Hata güvenlik araştırması sırasında bulundu, sorumlu bir şekilde bildirildi ve bilinen herhangi bir zarar oluşmadan düzeltildi.

Eski Orchard havuzuna ne olacak? Yalnızca harcamaya açık hâle gelecek. Bu havuza yeni değer giremeyecek ve mevcut değer turnike aracılığıyla Ironwood havuzuna taşınacak; taşıma herkese açık biçimde denetlenecek.

## Anlayışınızı sınayın

Korumalı havuzlardaki ZEC gizliyse, Orchard hatasının toplam arzı gizlice artırmadığını herkes nasıl doğrulayabilir?

<details>
<summary>Yanıt</summary>

Turnike aracılığıyla. Eski Orchard havuzundan çıkan her coin, Ironwood havuzuna girerken herkese açık bir kontrol noktasında sayılır. Meşru biçimde girenden daha fazla değer çıkmaya çalışsaydı muhasebe dengelenmezdi; böylece hatanın oluşturmuş olabileceği herhangi bir sahtecilik bu geçiş noktasında ortaya çıkardı.
</details>

### Kaynaklar

[ZIP 258: NU6.3 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard Geçici Güvenlik Açığı Azaltımının ve NU6.2 Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Kuantumla Kurtarılabilirlik](https://zips.z.cash/zip-2005)

[ZIP 229: Sürüm 6 İşlem Biçimi](https://zips.z.cash/zip-0229)

[ZIP 318: Orchard'dan Ironwood'a Taşıma](https://zips.z.cash/zip-0318)

[Ironwood: Zcash için Yeni Bir Korumalı Havuz](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Ayrıca bkz.

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[Korumalı Havuzlar](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Kuantum Sonrası Güvenlik](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC ve Zcash nedir?](../start-here/what-is-zec-and-zcash)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [NU6.2](../zcash-tech/nu6-2) · Sonraki: [NU7](../zcash-tech/nu7)
