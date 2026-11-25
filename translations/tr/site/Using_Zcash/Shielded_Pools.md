<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Değer Havuzları 

## Özet

- Zcash şu anda **5 değer havuzuna** sahiptir: Sprout (eski), Sapling, Orchard (yalnızca harcama), Ironwood ve Şeffaf.
- **Ironwood**, 28 Temmuz 2026'da NU6.3 yükseltmesiyle kullanıma açılan, mevcut birincil korumalı havuzdur.
- **Orchard** artık **yalnızca harcama için** kullanılabilir: İçine yeni değer giremez ve mevcut fonlar buradan Ironwood'e taşınır.
- **Sapling** (`zs` ile başlayan z adresleri) geniş çapta desteklenmeye devam eder ve önemli miktarda korumalı ZEC'i güvence altına alır.
- **Şeffaf** adresler (t...) işlem gizliliği sağlamaz ve Bitcoin'e benzer şekilde çalışır.
- **Sprout**, etkin kullanımdan kaldırılmış eski bir korumalı havuzdur.
- Orchard'dan Ironwood'e geçiş **devam etmektedir** ve turnike tarafından herkese açık biçimde denetlenir.
- En güçlü gizlilik güvenceleri için kullanıcılar, mümkün olduğunda **korumalıdan korumalıya (z → z)** işlemleri tercih etmeye devam etmelidir.


<br/>

## Zcash Değer Havuzlarını Anlamak

Zcash, fonları değer havuzları olarak bilinen ayrı muhasebe sistemlerine böler. Her havuzun kendi kriptografik kuralları ve gizlilik özellikleri vardır; protokol ise aralarında hareket eden toplam değeri izler.

Bugün ağda beş temel değer havuzu bulunur:

- Şeffaf — Herkese açıktır ve zincir üstünde tamamen görünür.
- Sapling — İlk geniş çapta benimsenen modern korumalı havuzdur ve hâlâ etkindir.
- Orchard — Önceki birincil korumalı havuzdur; artık yalnızca harcama için kullanılabilir.
- Ironwood — NU6.3 ile kullanıma sunulan mevcut birincil korumalı havuzdur.
- Sprout — 2016'da Zcash ile kullanıma sunulan ilk korumalı havuzdur.
  


Zcash geliştikçe, mevcut fonlarla uyumluluğu korurken güvenliği, gizliliği, kullanılabilirliği ve denetlenebilirliği iyileştirmek için yeni korumalı havuzlar kullanıma sunulabilir.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Şekil 1: Ironwood etkinleşmeden önce, 29 Ekim 2025'e kadar olan üç korumalı havuzu (Sprout, Sapling ve Orchard) gösteren grafik

<br/>

## Korumalı Havuzlar


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Havuzu</h3>

Ironwood mevcut birincil korumalı havuzdur. NU6.3 ağ yükseltmesinin bir parçası olarak 28 Temmuz 2026'da 3.428.143 numaralı blokta etkinleşti ve yeni korumalı değerler artık burada tutuluyor.

Bu havuz, Mayıs 2026'da Orchard'ın kanıt sistemiyle ilgili bir güvenlik açığının bulunması nedeniyle oluşturuldu. Bu açığın kötüye kullanıldığına dair hiçbir kanıt yoktur; ancak bu kusur, korumalı arzın yalnızca kanıtlarla sağlam olduğunun doğrulanamayacağı anlamına geliyordu. Ağ, açığı mevcut sistemde yamamak yerine düzeltilmiş bir devreyle yeni bir havuz oluşturdu ve tüm coinleri herkese açık biçimde sayan bir turnike üzerinden değeri buraya taşıdı. Arzın tamamının karşılığının bulunduğu güvencesini yeniden sağlayan şey bu muhasebedir.

Ironwood, Orchard'ın Action modelini ve Halo 2 kanıtlarını yeniden kullanır; bu nedenle günlük işleyişi aynıdır. İki yenilik vardır: İşlemler v6 biçimini kullanır ve Ironwood note'ları, [ZIP 2005](https://zips.z.cash/zip-2005) kapsamında **kuantumla kurtarılabilir**; yani gelecekteki bir kuantum bilgisayar günümüzün kriptografisini kırarsa bir coinin zincir üstü kaydı kurtarılabilir durumda kalır. Bu, kuantuma dayanıklılık değil, kurtarma yoludur ve daha eski havuzlar için geçerli değildir.

Yeni bir adrese ihtiyacınız yoktur. Birleşik adresler birkaç alıcıyı bir araya getirir ve cüzdanlar sizin için doğru havuzu seçer.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Havuzu</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Şekil 2: Ironwood etkinleşmeden önce, 29 Ekim 2025'e kadar olan Orchard havuzunu gösteren grafik

<br/>

Orchard Korumalı Havuzu, NU5 ağ yükseltmesinin bir parçası olarak 31 Mayıs 2022'de etkinleştirildi. Orchard, güvene dayalı kurulum ihtiyacını ortadan kaldıran yeni bir korumalı protokol sundu ve Birleşik Adresler (UA) tarafından kullanılan birincil korumalı havuz hâline geldi.

Orchard, işlem meta verilerinin sızmasını azaltarak ve geleneksel korumalı girdi ve çıktılar yerine Action'lara dayanan daha esnek bir işlem modeli sunarak kullanılabilirliği, verimliliği ve gizliliği önemli ölçüde iyileştirdi.

Ironwood yükseltmesi 28 Temmuz 2026'da etkinleştiğinden beri, **Orchard yalnızca harcama için kullanılabilir**. Havuzun içine yeni değer giremez. Burada tutulan fonlar harcanabilir ve turnike aracılığıyla Ironwood'e taşınmaktadır. Cüzdanlar bu işlemi sizin için yapar; ancak çoğu cüzdan geçiş hızını bir ölçüde kontrol etmenizi sağlar. Orchard'ten yapılan her çıkışın miktarı blokzincirde görünür; bu nedenle cüzdanın geçişi nasıl böldüğü ve zamanladığı gizlilik açısından önemlidir.

Orchard fonlarınız varsa, geçişin uygulamada ne anlama geldiğini öğrenmek için [Ironwood](/zcash-tech/ironwood) sayfasına bakın.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Havuzu</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Şekil 3: Ironwood etkinleşmeden önce, 29 Ekim 2025'e kadar olan Sapling havuzunu gösteren grafik

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling), Zcash protokolüne 28 Ekim 2018'de getirilen bir yükseltmeydi. Gizlilik, verimlilik ve kullanılabilirlik açısından bazı kısıtlamaları olan önceki Sprout sürümüne kıyasla büyük bir iyileştirmeydi.

Yükseltmeler arasında korumalı adresler için iyileştirilmiş performans, kullanıcıların özel anahtarlarını açığa çıkarmadan gelen ve giden işlemleri görmesini sağlayan geliştirilmiş görüntüleme anahtarları ve işlem imzalama sırasında donanım cüzdanları için bağımsız sıfır bilgi anahtarları yer alır.

Zcash Sapling, Sprout Serisi'nde daha uzun süren işlemlere kıyasla kullanıcıların özel işlemleri yalnızca birkaç saniyede gerçekleştirmesini sağlar.

İşlemlerin korumalı hâle getirilmesi gizliliği artırır; üçüncü tarafların işlemleri ilişkilendirmesini ve aktarılan ZEC miktarını belirlemesini imkânsız kılar. Sapling, özel işlem oluşturmak için gereken hesaplama kaynaklarını azaltarak kullanılabilirliği de artırır ve bu işlemleri kullanıcılar için daha erişilebilir hâle getirir.

Sapling cüzdan adresleri "zs" ile başlar; bu, yerleşik Sapling adresleri bulunan desteklenen tüm Zcash Korumalı Cüzdanlarda (Zkool, Zingo Cüzdan vb.) görülebilir. Zcash Sapling, işlemlerin gizliliği ve verimliliği bakımından teknolojide önemli bir gelişmeyi temsil eder ve gizlilikle güvenliğe önem veren kullanıcılar için Zcash'i pratik ve etkili bir kripto para hâline getirir.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Havuzu</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Şekil 4: Ironwood etkinleşmeden önce, 29 Ekim 2025'e kadar olan Sprout havuzunu gösteren grafik

Sprout, kullanıma sunulan ilk açık, izin gerektirmeyen sıfır bilgi gizlilik protokolüydü. 28 Ekim 2016'da kullanıma sunuldu.

Sprout adresleri, her zaman "zc" olan ilk iki harflerinden tanınır. Yazılıma henüz genç, gelişme potansiyeli yüksek ve geliştirmeye açık bir blokzincir olduğunu vurgulamak amacıyla "Sprout" adı verildi.

Sprout, [Zcash yavaş başlangıç madenciliği](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) için erken bir araç olarak kullanıldı; bu süreçte ZEC ve madenci blok ödülleri dağıtıldı.

Zcash ekosistemi büyümeyi sürdürüp korumalı işlem sayısı arttıkça, Zcash Sprout Serisi'nin kullanıcı gizliliği, işlem ölçeklendirmesi ve işleme açısından sınırlı ve daha az verimli kaldığı gözlemlendi. Bu durum ağın değiştirilmesine ve Sapling Yükseltmesi'ne yol açtı.

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Şeffaf Havuz</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Şekil 5: Ironwood etkinleşmeden önce, 29 Ekim 2025'e kadar olan Şeffaf havuzu gösteren grafik

<br/>

Zcash Şeffaf havuzu korumasızdır ve gizlilik sağlamaz. Zcash üzerindeki şeffaf cüzdan adresleri "t" harfiyle başlar; bu adres türüyle yapılan işlemlerde gizlilik çok düşüktür.

Zcash üzerindeki şeffaf işlemler, çoklu imza işlemlerini destekleyen ve standart herkese açık adresler kullanan Bitcoin işlemlerine benzer.

Zcash Şeffaf adresleri çoğunlukla merkezi borsalar, kullanıcılar arasında ZEC gönderirken ve alırken yüksek şeffaflık ve ağ onayı sağlamak için kullanır.

Zcash Korumalı adresler işlemler sırasında yüksek gizlilik sağlasa da işlemleri işlemek için daha fazla hesaplama kaynağı gerektirir. Bu nedenle bazı kullanıcılar, aynı düzeyde gizlilik gerektirmeyen işlemler için Şeffaf adresleri tercih edebilir.

<br/>

## Havuzlar Arası Aktarım İçin Önerilen Uygulamalar

Zcash Ağında işlem yaparken yüksek düzeyde gizlilik sağlamak için aşağıdaki uygulamaları izlemeniz önerilir:

Zcash blokzincirindeki "z'den z'ye" cüzdanlar arasındaki işlemler çoğunlukla korumalıdır ve sağladıkları yüksek gizlilik nedeniyle bazen Özel İşlem olarak adlandırılır. Gizlilik gerektiğinde, $ZEC gönderip almanın genellikle en iyi ve en çok önerilen yolu budur.

---

ZEC'i "Z adresi"nden "T adresi"ne gönderdiğinizde, bu bir korumayı kaldırma işlemidir. Bu işlem türünde gizlilik düzeyi her zaman yüksek değildir; çünkü ZEC'i Şeffaf bir adrese göndermek, bazı bilgileri blokzincirde görünür hâle getirir. Yüksek gizlilik gerektiğinde korumayı kaldırma işlemi her zaman önerilmez.

---

ZEC'i Şeffaf bir adresten (T adresi) bir Z adresine aktarmaya korumaya alma denir. Bu işlemde gizlilik düzeyi z-z işlemlerine kıyasla her zaman yüksek değildir; ancak gizlilik gerektiğinde bu yöntem de önerilir.

---

ZEC'i Zcash Ağında bir Şeffaf adresten (T adresi) başka bir Şeffaf adrese (T adresi) göndermek, Bitcoin işlemine çok benzer. Bu nedenle Zcash üzerindeki T-T işlemleri her zaman herkese açık işlemler olarak adlandırılır: Gönderenin ve alıcının işlem bilgileri herkese görünür olduğundan bu tür işlemlerde gizlilik düzeyi çok düşüktür.

Merkezi kripto para borsalarının çoğu, Zcash blokzincirinde işlem yapmak için Şeffaf adresleri ("T adresi) kullanır; ancak bu işlem türü (T-T) hiçbir gizlilik özelliği sağlamaz.

<br/>

## Orchard'dan Ironwood'e Geçiş

Geçiş şu anda gerçekleşiyor. Orchard yeni yatırımlara kapatıldı ve orada hâlâ bulunan değer, her seferinde bir işlemle Ironwood'e taşınıyor. Toplamları [ironwood.live](https://ironwood.live/) adresinden izleyebilirsiniz.

Bunun sizin için anlamı, fonlarınızın nerede bulunduğuna bağlıdır:

1. **Yeni korumalı etkinlik** otomatik olarak Ironwood'e gider. Yapmanız gereken bir şey yoktur.
2. **Mevcut Orchard fonlarının** taşınması gerekir. Bakımı sürdürülen cüzdanlar bunu sizin için genellikle tek seferde değil, aşamalar hâlinde yapar.
3. **Sapling etkilenmez** ve fon kabul etmeye devam eder. Yalnızca Orchard kapatıldı.
4. **Turnike havuzlar arasında geçen her şeyi sayar** ve bu sayım, süreç boyunca hiçbir coin'in yaratılmadığını kanıtlar.

> **Bilmeniz gereken bir gizlilik notu.** Turnike, havuzlar arasında geçen *miktarı* ve blok yüksekliğini yayımlar. Gönderen ve alıcı her zamanki gibi gizli kalır; ancak ayırt edici bir miktar sizinle ilişkilendirilebilir. Bu nedenle cüzdanlar, bakiyenizi tek ve tanınabilir bir meblağ hâlinde taşımak yerine standart kupürleri kullanarak aşamalı geçiş yapar. Cüzdanınızın geçiş hızını ayarlamasına izin verin ve IP adresinizin taşıdığınız miktarlarla ilişkilendirilmemesi için Tor veya VPN kullanmayı değerlendirin.

Yükseltmenin kendisi için [Ironwood](/zcash-tech/ironwood) sayfasına, muhasebe işlemlerinin nasıl yürüdüğü için [The Turnstile](/zcash-tech/the-turnstile) sayfasına bakın.

<br/>

## Kaçınılması Gereken Yaygın Hatalar

- **t adresinden t adresine gönderim yapmak** — tamamen herkese açıktır ve gizlilik sağlamaz. Önce fonlarınızı mutlaka korumalı hâle getirin.
- **Orchard'in hâlâ fon kabul ettiğini varsaymak** — 28 Temmuz 2026'dan beri yalnızca harcama için kullanılabilir. Değer havuzdan çıkabilir, ancak yeni değer giremez
- **Sapling ile Birleşik adresleri karıştırmak** — Sapling adresleri `zs` ile başlar. Birleşik adresler `u1` ile başlar ve birkaç alıcıyı bir araya getirir; bu nedenle ödemenizin hangi havuza gideceği adresin içerdiği alıcılara bağlıdır
- **Fonları Sprout havuzunda bırakmak** — Sprout yıllardır kullanımdan kaldırılmıştır; bu fonları dışarı taşıyın
- **Geçişin tamamen görünmez olmasını beklemek** — gönderen ve alıcı görünmese de turnikeden geçen miktar herkese açıktır
- **t → z (korumaya alma) işleminin tamamen gizli olduğunu varsaymak** — korumaya alma işleminin kendisi zincir üstünde görünür, içeriği ise görünmez

---

## İlgili Sayfalar

- [Ironwood](/zcash-tech/ironwood) — Mevcut havuzu oluşturan yükseltme
- [The Turnstile](/zcash-tech/the-turnstile) — Havuzlar arasında hareket eden değerin nasıl denetlendiği
- [Wallets](/using-zcash/wallets) — Hangi cüzdanların bakımının sürdürüldüğü ve Ironwood için hazır olduğu
- [Transactions](/using-zcash/transactions) — Korumalı işlemlerin nasıl gönderileceği
- [Buying ZEC](/using-zcash/buying-zec) — Havuzlarda kullanmadan önce ZEC edinme
- [zk-SNARKs](/zcash-tech/zk-snarks) — Korumalı havuzların kriptografik temeli
- [What is ZEC and Zcash](/start-here/what-is-zec-and-zcash) — Zcash gizliliği hakkında arka plan
