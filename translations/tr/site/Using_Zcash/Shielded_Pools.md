<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Değer Havuzları 

## Kısaca

- Zcash şu anda **4 değer havuzuna** sahiptir: Sprout (eski), Sapling, Orchard ve Transparent.
- **Orchard**, Unified Address (u1...) tarafından kullanılan mevcut birincil shielded havuzdur.
- **Sapling** (`zs` ile başlayan z-address'ler) geniş çapta desteklenmeye devam ediyor ve önemli miktarda shielded ZEC'i korumayı sürdürüyor.
- **Transparent** adresler (t...) işlem gizliliği sağlamaz ve Bitcoin'e benzer şekilde çalışır.
- **Sprout**, aktif kullanımdan kaldırılmış eski bir shielded havuzdur.
- **Ironwood** olarak bilinen gelecekteki bir shielded havuz önerilmiştir; bu havuz, gizliliği korurken shielded ZEC arzının bütünlüğüne olan güveni güçlendirmeyi amaçlar.
- En güçlü gizlilik garantileri için kullanıcılar, mümkün olduğunda **shielded-to-shielded (z → z)** işlemleri tercih etmeye devam etmelidir.


<br/>

## Zcash Değer Havuzlarını Anlamak

Zcash, fonları değer havuzları olarak bilinen ayrı muhasebe sistemlerine ayırır. Her havuzun kendine özgü kriptografik kuralları ve gizlilik özellikleri vardır; protokol ise bunlar arasında hareket eden toplam değeri takip eder.

Bugün ağ, dört ana değer havuzu içerir:

- Transparent — Genel ve zincir üzerinde tamamen görünür.
- Sapling — Geniş çapta benimsenen ilk modern shielded havuz.
- Orchard — Unified Address ile tanıtılan mevcut birincil shielded havuz.
- Sprout — 2016'da Zcash ile başlatılan orijinal shielded havuz.
  


Zcash geliştikçe, mevcut fonlarla uyumluluğu korurken güvenliği, gizliliği, kullanılabilirliği ve denetlenebilirliği iyileştirmek için yeni shielded havuzlar kullanılmaya başlanabilir.

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Şekil 1: Ekim 2025 itibarıyla mevcut 4 havuzu gösteren bir grafik

<br/>

## Shielded Havuzlar 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Havuzu</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Şekil 2: Ekim 2025 itibarıyla Orchard havuzunu gösteren bir grafik

<br/>

Orchard Shielded Havuzu, NU5 ağ yükseltmesinin bir parçası olarak 31 Mayıs 2022'de etkinleştirildi. Orchard, güvenilir bir kuruluma olan ihtiyacı ortadan kaldıran yeni bir shielded protokol sundu ve Unified Address (UA) tarafından kullanılan birincil shielded havuz haline geldi.

Orchard, geleneksel shielded girdiler ve çıktılar yerine Actions tabanlı daha esnek bir işlem modeli sunarak işlem meta verisi sızıntısını önemli ölçüde azalttı; böylece kullanılabilirliği, verimliliği ve gizliliği ciddi biçimde iyileştirdi.

Bugün Orchard, Zcash için birincil shielded havuz olmaya devam ediyor. Ancak topluluk, gizlilik garantilerini korurken shielded ZEC arzının bütünlüğü konusunda ek güvence sağlayacak Ironwood adlı yeni bir shielded havuza gelecekte geçişi değerlendiriyor.

[Zcash Shielded cüzdanları](/site/Using_Zcash/Wallets) artık Orchard'ı destekliyor. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Havuzu</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Şekil 3: Ekim 2025 itibarıyla Sapling havuzunu gösteren bir grafik

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling), 28 Ekim 2018'de tanıtılan bir Zcash protokol yükseltmesiydi. Gizlilik, verimlilik ve kullanılabilirlik açısından bazı sınırlamaları olan Sprout olarak bilinen önceki sürüme kıyasla büyük bir iyileştirmeydi. 

Yükseltmeler arasında shielded adresler için gelişmiş performans, kullanıcıların özel anahtarlarını açığa çıkarmadan gelen ve giden işlemleri görüntüleyebilmesini sağlayan geliştirilmiş viewing key'ler ve donanım cüzdanlarında işlem imzalama için bağımsız Zero Knowledge anahtarları yer alır. 

Zcash Sapling, kullanıcıların Sprout serisinde gereken daha uzun sürelerle karşılaştırıldığında özel işlemleri yalnızca birkaç saniye içinde gerçekleştirmesini sağlar. 

İşlem shielding'i gizliliği artırır; üçüncü tarafların işlemleri ilişkilendirmesini ve aktarılan ZEC miktarını belirlemesini imkânsız hale getirir. Sapling ayrıca özel işlemler oluşturmak için gereken hesaplama ihtiyacını azaltarak kullanılabilirliği geliştirir ve bunu kullanıcılar için daha erişilebilir hale getirir.

Sapling cüzdan adresleri "zs" ile başlar ve bu, yerleşik Sapling adreslerine sahip tüm desteklenen Zcash Shielded Wallet'larda (YWallet, Zingo Wallet, Nighthawk vb.) görülebilir. Zcash Sapling, işlem gizliliği ve verimliliği açısından teknolojide önemli bir gelişmeyi temsil eder; bu da Zcash'i gizlilik ve güvenliğe değer veren kullanıcılar için pratik ve etkili bir kripto para haline getirir.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Havuzu</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Şekil 4: Ekim 2025 itibarıyla Sprout havuzunu gösteren bir grafik

Sprout, şimdiye kadar başlatılan ilk açık ve izinsiz Zero Knowledge gizlilik protokolüydü. 28 Ekim 2016'da başlatıldı.

Sprout adresleri, her zaman "zc" olan ilk iki harfiyle tanımlanır. "Sprout" adı, yazılımın genç, filizlenen ve büyüme potansiyeli yüksek bir blockchain olduğunu ve geliştirmeye açık olduğunu vurgulamak amacıyla verildi. 

Sprout, madencilere ZEC ve blok ödüllerinin dağıtımını sağlayan [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) için erken bir araç olarak kullanıldı. 

Shielded işlemlerin sayısı arttıkça Zcash ekosistemi genişlemeye devam ederken, Zcash Sprout serisinin kullanıcı gizliliği, işlem ölçeklenebilirliği ve işleme açısından sınırlı ve daha az verimli hale geldiği gözlemlendi. Bu durum ağın değiştirilmesine ve Sapling yükseltmesine yol açtı. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Havuzu</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Şekil 5: Ekim 2025 itibarıyla Transparent havuzunu gösteren bir grafik

<br/>

Zcash Transparent havuzu shielded değildir ve özel değildir. Zcash'teki Transparent cüzdan adresleri "t" harfiyle başlar; bu adres türünü işlemlerde kullanırken gizlilik seviyesi çok düşüktür.

Zcash'teki Transparent işlemler, çoklu imza işlemlerini destekleyen ve standart genel adresleri kullanan Bitcoin işlemlerine benzer.

Zcash Transparent adresleri çoğunlukla merkezi borsalar tarafından, kullanıcılar arasında ZEC gönderip alırken yüksek şeffaflık ve ağ onayı sağlamak için kullanılır.

Ayrıca şunu belirtmek de önemlidir: Zcash Shielded adresleri işlemler sırasında yüksek gizlilik sağlasa da, işlemleri işlemek için daha fazla hesaplama kaynağı gerektirir. Bu nedenle bazı kullanıcılar, aynı düzeyde gizlilik gerektirmeyen işlemler için Transparent adresleri tercih edebilir.

<br/>

## Havuzlar Arası Transfer İçin Önerilen Uygulama

Zcash ağı üzerinde işlemler sırasında yüksek düzeyde gizlilik istendiğinde, aşağıdaki uygulamaların takip edilmesi önerilir;

Zcash blockchain üzerinde "z to z" cüzdanlar arasında gerçekleşen işlemler çoğunlukla shielded'dır ve üretilen yüksek gizlilik seviyesi nedeniyle bazen Özel İşlem olarak adlandırılır. Gizlilik gerektiğinde $ZEC gönderip almanın genellikle en iyi ve en çok önerilen yolu budur. 

---

"Z-address"ten "T-address"e ZEC gönderdiğinizde, bu basitçe bir Deshielding işlemi anlamına gelir. Bu işlem türünde gizlilik seviyesi her zaman yüksek değildir; çünkü Transparent Address'e ZEC gönderilmesinin etkisiyle bazı bilgiler blockchain üzerinde görünür olacaktır. Yüksek gizlilik gerektiğinde Deshielding işlemi her zaman önerilmez. 

---

ZEC'in bir Transparent Address'ten (T-address) bir Z-address'e aktarılması basitçe Shielding olarak bilinir. Bu işlem türünde gizlilik seviyesi, z-z işlemine kıyasla her zaman o kadar yüksek değildir; ancak gizlilik gerektiğinde yine de önerilir. 

---

ZEC'i bir Transparent Address'ten (T-address) başka bir Transparent Address'e (T-address) Zcash ağı üzerinde göndermek (T-T işlemi), Bitcoin işlemine çok benzer ve bu nedenle Zcash'teki T-T işlemleri her zaman Genel işlemler olarak adlandırılır; çünkü hem gönderenin hem de alıcının işlem detayları kamuya görünür hale gelir, bu da bu tür işlemlerde gizlilik seviyesini çok düşürür. 

Çoğu Merkezi Kripto Para borsası, Zcash blockchain üzerinde işlem yaparken Transparent Address ("T-address) kullanır; ancak bu tür işlemler (T-T) herhangi bir özel gizlilik özelliğine sahip olmayacaktır.

<br/>

## Gelecek: Ironwood Havuzu

Zcash topluluğu şu anda Ironwood adlı önerilen bir shielded havuzu değerlendiriyor.

Ironwood, Orchard'ın proving sisteminde yakın zamanda keşfedilip yamalanan bir güvenlik açığını ele almak üzere tasarlanmıştır. Açığın gerçekten istismar edildiğine dair hiçbir kanıt bulunmasa da, Ironwood Orchard'tan yeni oluşturulmuş bir shielded havuza kontrollü bir geçişi mümkün kılarak ek bir güvence katmanı sağlayacaktır.

Amaç Zcash gizliliğinin yerini almak değil, shielded ZEC arzının bütünlüğüne duyulan güveni güçlendirmektir.

## Öneri kapsamında:

1. Yeni shielded faaliyetler kademeli olarak Ironwood'a taşınacaktır.
2. Mevcut Orchard fonları özel biçimde taşınabilecektir.
3. Genel turnike muhasebesi, tüm shielded fonların tamamen desteklendiğine dair daha güçlü kanıt sağlayacaktır.
4. Kullanıcılar, Zcash'ten bekledikleri aynı gizlilik korumalarını koruyacaktır.

<br/>
Gelecekteki ağ yükseltmeleri yoluyla etkinleştirilirse Ironwood, mevcut shielded fonlarla uyumluluğu korurken Zcash'in shielded ekosisteminin yeni nesli haline gelecektir.

<br/>

## Kaçınılması Gereken Yaygın Hatalar

- **t-address'ten t-address'e gönderim yapmak** — tamamen geneldir, gizlilik yoktur. Her zaman önce fonları shield edin.
- **Sapling ve Orchard adreslerini karıştırmak** — Sapling adresleri `zs` ile başlar, Orchard/Unified adresleri `u1` ile başlar
- **Fonları Sprout havuzunda bırakmak** — Sprout kullanımdan kaldırılmıştır; fonları Orchard'a taşıyın
- **t → z (shielding) işleminin tamamen özel olduğunu varsaymak** — shielding işleminin kendisi zincir üzerinde görünür; içerik görünmez

---

## İlgili Sayfalar

- [Cüzdanlar](/using-zcash/wallets) — Hangi cüzdanlar Orchard ve Sapling havuzlarını destekler
- [İşlemler](/using-zcash/transactions) — Shielded işlemler nasıl gönderilir
- [ZEC Satın Alma](/using-zcash/buying-zec) — Havuzlarda kullanmadan önce ZEC edinme
- [ZK-SNARKs](/zcash-tech/zk-snarks) — Shielded havuzların kriptografik temeli
- [ZEC ve Zcash nedir](/start-here/what-is-zec-and-zcash) — Zcash gizliliği hakkında arka plan
