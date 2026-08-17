---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Sayfası"/>
</a>

# Zcash Değer Havuzları 

## Kısaca

- Zcash şu anda **5 değer havuzuna** sahiptir: Sprout (eski), Sapling, Orchard (yalnızca harcama), Ironwood ve Transparent.
- **Ironwood**, 28 Temmuz 2026’daki NU6.3 yükseltmesinden beri aktif olan mevcut birincil shielded havuzdur.
- **Orchard** artık **yalnızca harcama** modundadır: yeni değer bu havuza giremez ve mevcut fonlar buradan Ironwood’a taşınır.
- **Sapling** (`zs` ile başlayan z-adresleri) yaygın şekilde desteklenmeye devam eder ve önemli miktarda shielded ZEC’i korumayı sürdürür.
- **Transparent** adresler (t...) işlem gizliliği sağlamaz ve Bitcoin’e benzer şekilde çalışır.
- **Sprout**, aktif kullanımdan kaldırılmış eski bir shielded havuzdur.
- Orchard’dan Ironwood’a geçiş **devam etmektedir** ve turnstile tarafından herkesin görebileceği şekilde denetlenmektedir.
- En güçlü gizlilik garantileri için kullanıcılar, mümkün olduğunda **shielded-to-shielded (z → z)** işlemleri tercih etmeye devam etmelidir.


<br/>

## Zcash Değer Havuzlarını Anlamak

Zcash, fonları değer havuzları olarak bilinen ayrı muhasebe sistemlerine ayırır. Her havuzun kendine özgü kriptografik kuralları ve gizlilik özellikleri vardır; protokol ise bunlar arasında hareket eden toplam değeri izler.

Bugün ağ beş ana değer havuzu içerir:

- Transparent — Herkese açık ve zincir üzerinde tamamen görünür.
- Sapling — Geniş çapta benimsenen ilk modern shielded havuz, hâlâ aktif.
- Orchard — Önceki birincil shielded havuz, artık yalnızca harcama modunda.
- Ironwood — NU6.3 ile sunulan mevcut birincil shielded havuz.
- Sprout — 2016’da Zcash ile birlikte başlatılan ilk shielded havuz.
  


Zcash geliştikçe, mevcut fonlarla uyumluluğu korurken güvenlik, gizlilik, kullanılabilirlik ve denetlenebilirliği iyileştirmek için yeni shielded havuzlar kullanılmaya başlanabilir.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Şekil 1: Ekim 2025 itibarıyla mevcut 4 havuzu gösteren bir grafik

<br/>

## Shielded Havuzlar 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Havuzu</h3>

Ironwood, mevcut birincil shielded havuzdur. 28 Temmuz 2026’da 3.428.143 numaralı blokta NU6.3 ağ yükseltmesinin bir parçası olarak etkinleştirilmiştir ve yeni shielded değer artık burada bulunur.

Bunun nedeni, Mayıs 2026’da Orchard’ın proving sisteminde bir güvenlik açığının bulunmuş olmasıdır. Bunun hiç istismar edildiğine dair bir kanıt yoktur, ancak bu kusur shielded arzın yalnızca ispatlarla sağlam olduğunun kanıtlanamaması anlamına geliyordu. Yerinde yamamak yerine ağ, düzeltilmiş bir devreyle yeni bir havuz oluşturdu ve değeri, her coini herkesin görebileceği şekilde sayan bir turnstile üzerinden taşıdı. Shielded arzın tamamen desteklendiği garantisini geri getiren şey bu muhasebedir.

Ironwood, Orchard’ın Action modelini ve Halo 2 ispatlarını yeniden kullanır; bu yüzden günlük kullanımda aynı şekilde davranır. İki şey yenidir: işlemler v6 biçimini kullanır ve Ironwood notları, [ZIP 2005](https://zips.z.cash/zip-2005) kapsamında **quantum-recoverable** özelliğine sahiptir; yani gelecekte bir kuantum bilgisayar bugünün kriptografisini kırarsa, bir coinin zincir üzerindeki kaydı kurtarılabilir olmaya devam eder. Bu, kuantum direnci değil bir kurtarma yoludur ve eski havuzlar için geçerli değildir.

Yeni bir adrese ihtiyacınız yoktur. Unified Address’ler birden fazla alıcıyı bir araya getirir ve cüzdanlar sizin için doğru havuzu seçer.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Havuzu</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Şekil 2: Ekim 2025 itibarıyla Orchard havuzunu gösteren bir grafik

<br/>

Orchard Shielded Havuzu, 31 Mayıs 2022’de NU5 ağ yükseltmesinin bir parçası olarak etkinleştirildi. Orchard, güvenilir kurulum gereksinimini ortadan kaldıran yeni bir shielded protokol sundu ve Unified Address’ler (UA’ler) tarafından kullanılan birincil shielded havuz hâline geldi.

Orchard, geleneksel shielded girişler ve çıkışlar yerine Action’lara dayalı daha esnek bir işlem modeli sunarak işlem üstverisi sızıntısını azalttı; böylece kullanılabilirliği, verimliliği ve gizliliği önemli ölçüde geliştirdi.

28 Temmuz 2026’da Ironwood yükseltmesi etkinleştirildiğinden beri **Orchard yalnızca harcama** modundadır. Yeni değer bu havuza giremez. Burada tutulan fonlar hâlâ harcanabilir ve turnstile üzerinden Ironwood’a taşınmaktadır. Cüzdanlar bunu sizin için halleder, ancak çoğu size hız konusunda bir miktar kontrol sunar.

Orchard fonlarınız varsa, geçişin pratikte ne anlama geldiğini görmek için [Ironwood](/zcash-tech/ironwood) sayfasına bakın.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Havuzu</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Şekil 3: Ekim 2025 itibarıyla Sapling havuzunu gösteren bir grafik

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling), 28 Ekim 2018’de kullanıma sunulan Zcash protokolü yükseltmesidir. Gizlilik, verimlilik ve kullanılabilirlik açısından bazı sınırlamaları bulunan önceki sürüm Sprout’a göre büyük bir iyileştirmedir. 

Yükseltmeler arasında shielded adresler için geliştirilmiş performans, kullanıcıların özel anahtarlarını açığa çıkarmadan gelen ve giden işlemleri görüntülemelerini sağlayan geliştirilmiş viewing key’ler ve işlem imzalama sırasında donanım cüzdanları için bağımsız Zero Knowledge anahtarları bulunur. 

Zcash Sapling, kullanıcıların Sprout serisine kıyasla çok daha kısa sürede, yalnızca birkaç saniye içinde özel işlemler gerçekleştirmesini sağlar. 

İşlem shielded özelliği gizliliği artırır; üçüncü tarafların işlemleri ilişkilendirmesini ve aktarılan ZEC miktarını belirlemesini imkânsız hâle getirir. Sapling ayrıca özel işlem üretmek için gereken hesaplama gereksinimlerini azaltarak kullanılabilirliği iyileştirir ve bunu kullanıcılar için daha erişilebilir kılar.

Sapling cüzdan adresleri "zs" ile başlar ve bu, Sapling adreslerini yerleşik olarak içeren desteklenen tüm Zcash Shielded Wallet’larda (YWallet, Zingo Wallet, Nighthawk vb.) görülebilir. Zcash Sapling, işlem gizliliği ve verimliliği açısından önemli bir teknolojik gelişmeyi temsil eder; bu da Zcash’i gizlilik ve güvenliğe önem veren kullanıcılar için pratik ve etkili bir kripto para birimi hâline getirir.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Havuzu</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Şekil 4: Ekim 2025 itibarıyla Sprout havuzunu gösteren bir grafik

Sprout, şimdiye kadar başlatılan ilk açık ve izinsiz Zero Knowledge gizlilik protokolüydü. 28 Ekim 2016’da başlatıldı.

Sprout adresleri, her zaman "zc" olan ilk iki harfleriyle tanımlanır. "Sprout" adı, yazılımın genç, filizlenen ve gelişime açık, büyüme potansiyeli yüksek bir blokzincir olduğunu vurgulamak amacıyla verilmiştir. 

Sprout, [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) için erken bir araç olarak kullanıldı; bu da madenciler için ZEC dağıtımını ve blok ödüllerini beraberinde getirdi. 

Daha fazla sayıda shielded işlemin gerçekleşmesiyle Zcash ekosistemi genişlemeye devam ettikçe, Zcash Sprout Serisinin kullanıcı gizliliği, işlem ölçeklenebilirliği ve işleme açısından sınırlı ve daha az verimli olduğu gözlemlendi. Bu da ağın değiştirilmesine ve Sapling yükseltmesine yol açtı. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Havuzu</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Şekil 5: Ekim 2025 itibarıyla Transparent havuzunu gösteren bir grafik

<br/>

Zcash Transparent havuzu shielded değildir ve özel değildir. Zcash üzerindeki Transparent cüzdan adresleri "t" harfiyle başlar; bu adres türünü işlemler için kullanırken gizlilik seviyesi çok düşüktür.

Zcash’teki Transparent işlemler, çoklu imzalı işlemleri destekleyen ve standart herkese açık adresleri kullanan Bitcoin işlemlerine benzer.

Zcash Transparent adresleri çoğunlukla merkezi borsalar tarafından, kullanıcılar arasında ZEC gönderip alırken yüksek şeffaflık ve ağ onayı sağlamak için kullanılır.

Ayrıca belirtmek gerekir ki, Zcash shielded adresleri işlemler sırasında yüksek gizlilik sağlarken, işlemleri işlemek için daha fazla hesaplama kaynağı da gerektirir. Bu nedenle bazı kullanıcılar, aynı düzeyde gizlilik gerektirmeyen işlemler için Transparent adresleri tercih edebilir.

<br/>

## Havuzlar Arası Transfer İçin Önerilen Uygulamalar

Zcash Ağında işlem sırasında yüksek düzeyde gizlilik istendiğinde, aşağıdaki uygulamaları takip etmeniz önerilir;

Zcash blokzincirinde "z to z" cüzdanlar arasında gerçekleşen işlemler çoğunlukla shielded olur ve üretilen yüksek gizlilik seviyesi nedeniyle bazen Private Transaction olarak adlandırılır. Gizlilik gerektiğinde $ZEC gönderip almanın genellikle en iyi ve en çok önerilen yolu budur. 

---

"Z-address" üzerinden "T-address"e ZEC gönderdiğinizde, bu basitçe bir Deshielding işlemi anlamına gelir. Bu işlem türünde gizlilik seviyesi her zaman yüksek değildir; çünkü ZEC’in bir Transparent Address’e gönderilmesi nedeniyle bazı bilgiler blokzincir üzerinde görünür olacaktır. Yüksek gizlilik gerektiğinde Deshielding işlemi her zaman önerilmez. 

---

Bir Transparent Address’ten (T-address) bir Z-address’e ZEC aktarmak basitçe Shielding olarak bilinir. Bu işlem türünde gizlilik seviyesi, z-z işlemine kıyasla her zaman o kadar yüksek değildir; ancak gizlilik gerektiğinde yine de önerilir. 

---

Zcash Ağında bir Transparent Address’ten (T-address) başka bir Transparent Address’e (T-address) ZEC göndermek (T-T işlemi), Bitcoin işlemlerine çok benzer ve bu yüzden Zcash üzerindeki T-T işlemleri her zaman Public transaction olarak adlandırılır; çünkü hem gönderenin hem de alıcının işlem ayrıntıları kamuya görünür hâle gelir, bu da bu tür işlemlerde gizlilik seviyesini çok düşürür. 

Kripto para merkezi borsalarının çoğu, Zcash blokzinciri üzerinde işlem yaparken Transparent Address ("T-address) kullanır, ancak bu işlem türü (T-T) herhangi bir özel özellik taşımaz.

<br/>

## Orchard’dan Ironwood’a Geçiş

Geçiş şu anda gerçekleşiyor. Orchard yeni yatırımlara kapatıldı ve hâlâ orada duran değer, işlem işlem Ironwood’a taşınıyor. Toplamları [ironwood.live](https://ironwood.live/) üzerinden izleyebilirsiniz.

Bunun sizin için anlamı, fonlarınızın nerede olduğuna bağlıdır:

1. **Yeni shielded etkinlik** otomatik olarak Ironwood’a gider. Yapmanız gereken bir şey yok.
2. **Mevcut Orchard fonlarının** taşınması gerekir. Bakımı yapılan cüzdanlar bunu sizin için yapar; genellikle hepsini bir anda değil, aşamalar hâlinde gerçekleştirir.
3. **Sapling etkilenmez** ve hâlâ fon kabul eder. Yalnızca Orchard kapatıldı.
4. **Turnstile, havuzlar arasında geçen her şeyi sayar**; bu da yol boyunca hiçbir coin üretilmediğini kanıtlayan şeydir.

> **Bilinmesi gereken önemli bir gizlilik uyarısı.** Turnstile, havuzlar arasında geçen *miktarı* blok yüksekliğiyle birlikte yayınlar. Gönderen ve alıcı her zamanki gibi gizli kalır, ancak ayırt edici bir miktar size kadar geri izlenebilir. Bu nedenle cüzdanlar, bakiyenizi tek ve tanınabilir bir toplu hareket olarak taşımak yerine, standart miktarlar kullanarak aşamalı geçiş yapar. Cüzdanınızın kendi hızında ilerlemesine izin verin ve IP adresinizin taşıdığınız miktarlara bağlanmaması için Tor veya bir VPN kullanmayı düşünün.

Yükseltmenin kendisi için [Ironwood](/zcash-tech/ironwood), muhasebenin nasıl çalıştığı için ise [The Turnstile](/zcash-tech/the-turnstile) sayfalarına bakın.

<br/>

## Kaçınılması Gereken Yaygın Hatalar

- **t-address’ten t-address’e göndermek** — tamamen herkese açıktır, gizlilik yoktur. Fonları önce her zaman shielded yapın.
- **Orchard’ın hâlâ fon kabul ettiğini sanmak** — 28 Temmuz 2026’dan beri yalnızca harcama modundadır. Değer çıkabilir, ama yeni bir şey giremez
- **Sapling adresleri ile Unified Address’leri karıştırmak** — Sapling adresleri `zs` ile başlar. Unified Address’ler `u1` ile başlar ve birden fazla alıcıyı bir araya getirir; dolayısıyla ödemenizin hangi havuza ulaşacağı, bu adresin hangi alıcıları taşıdığına bağlıdır
- **Fonları Sprout havuzunda bırakmak** — Sprout yıllardır kullanım dışıdır; bu fonları oradan çıkarın
- **Bir geçişin tamamen görünmez olmasını beklemek** — gönderen ve alıcı görünmese de, turnstile’dan geçen miktar herkese açıktır
- **t → z (shielding) işleminin tamamen özel olduğunu varsaymak** — shielding işleminin kendisi zincir üzerinde görünürdür; içeriği görünmez

---

## İlgili Sayfalar

- [Ironwood](/zcash-tech/ironwood) — Mevcut havuzu oluşturan yükseltme
- [The Turnstile](/zcash-tech/the-turnstile) — Havuzlar arasında hareket eden değerin nasıl denetlendiği
- [Cüzdanlar](/using-zcash/wallets) — Hangi cüzdanların bakımının yapıldığı ve Ironwood için hazır olduğu
- [İşlemler](/using-zcash/transactions) — Shielded işlemler nasıl gönderilir
- [ZEC Satın Alma](/using-zcash/buying-zec) — Havuzlarda kullanmadan önce ZEC edinme
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Shielded havuzların kriptografik temeli
- [ZEC ve Zcash Nedir](/start-here/what-is-zec-and-zcash) — Zcash gizliliği hakkında arka plan
