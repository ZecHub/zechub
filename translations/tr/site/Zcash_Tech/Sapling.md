<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Sapling

> Sapling, Zcash ana ağında 419.200. blokta (29 Ekim 2018, 02:15 UTC) devreye girdi.

Öğrenecekleriniz: Sapling, korumalı Zcash ödemelerini telefon veya donanım cüzdanında çalışabilecek kadar hızlı ve hafif hâle getirdi.

Sapling, Zcash'in ikinci yıl dönümünde etkinleşen ikinci büyük Zcash ağ yükseltmesiydi. Korumalı (özel) işlemlerin oluşturulma biçimini yeniden düzenleyen bir konsensüs hard fork'uydu. Dağıtım, ZIP 205 ile; yeni işlem imza kuralları ise ZIP 243 ile tanımlanır ve her ikisi de ağ yükseltme mekanizması olan ZIP 200 üzerine kuruludur. Tüm ayrıntılar Zcash Protokol Spesifikasyonu'nda yer alır. Electric Coin Company yükseltmeyi geliştirdi ve destekleyen ilk sürüm olan zcashd 2.0.0'ı Ağustos 2018'de yayımladı. Zincir üstünde ağ, Sapling kurallarını konsensüs dal kimliğiyle tanımlar.

Önemi. Sapling öncesinde gerçekten özel bir ödeme yapmak, bilgisayarınız kanıtı oluşturmak için gigabaytlarca belleği işlerken dakikalarca beklemek anlamına geliyordu. Çoğu kişi için bu işlem çok yavaş ve ağırdı; bu nedenle birçok kullanıcı, borsa ve mağaza korumalı işlemleri atlayıp ZEC ödemelerini açık olarak gönderiyordu. Sapling, gereken işi birkaç saniyeye ve yaklaşık 40 megabayt belleğe indirdi. Bu tek değişiklik, korumalı ZEC işlemlerini gündelik hayatta, sıradan telefonlarda ve donanım cüzdanlarında kullanılabilir hâle getirdi.

## Kısaca

- Sapling, 419.200. blokta (29 Ekim 2018, 02:15 UTC) etkinleşen ikinci büyük Zcash ağ yükseltmesiydi — Zcash'in ikinci yıl dönümünde.
- Korumalı işlemleri, Sprout'ün tek ve yavaş JoinSplit devresinin yerine amaca özel iki devreyle (Spend ve Output) yeniden oluşturdu (ZIP 205, ZIP 243).
- Sonuç: Kanıt oluşturma süresi dakikalardan birkaç saniyeye, bellek kullanımı gigabaytlardan yaklaşık 40 MB'a indi — telefonlar ve donanım cüzdanları için yeterince hafif.
- Yeni özellikler: çeşitlendirilmiş adresler (tek bir anahtardan türetilebilen, birbiriyle ilişkilendirilemez çok sayıda ödeme adresi), yalnızca denetim erişimi sağlayan görüntüleme anahtarları ve kanıt oluşturma ile imzalamanın birbirinden ayrılması.
- Parametreleri iki aşamalı çok taraflı bir törenden (Powers of Tau + Sapling MPC) geldi; katılımcılardan yalnızca birinin bile dürüst olması güvenlik için yeterliydi.

## Görsel benzetme

Sprout, her mektubu ülkenin bir ucundan diğerine yürüyerek taşıyan özel bir kuryeydi — kusursuz bir gizlilik sağlıyordu ama yavaş ve yorucuydu. Sapling, aynı kuryeyi hafif sırt çantalı bir bisikletliye dönüştürdü: Gizlilik aynı kaldı, ancak gündelik teslimatlar için yeterince hızlı oldu. Yeni görüntüleme anahtarları da bir denetçiye, kuryenin yükünün anahtarlarını hiç vermeden kayıt defterine açık bir pencereden bakma olanağı tanımak gibidir.


## Neler değişti

Sapling'in temelinde, korumalı bir işlemi gizli tutan sıfır bilgi kanıtını daha hızlı oluşturmanın bir yolu vardır. İlk Sprout tasarımı, yavaş ve bellek kullanımı yüksek tek bir kanıtlama devresi (JoinSplit devresi) kullanıyordu. Sapling, bunu Zcash Protokol Spesifikasyonu'nda açıklanan, amaca özel iki devreyle — Spend ve Output devreleriyle — değiştirdi. Sonuç, maliyette büyük bir düşüştür. Electric Coin Company'e göre korumalı bir işlem, yaklaşık 40 megabayt bellek kullanılarak yalnızca birkaç saniyede oluşturulabilir. Sapling öncesindeki Sprout referans değeri çok daha yüksekti; süre dakikalar, bellek kullanımı ise birkaç gigabayt düzeyindeydi (bu Sprout tarafı değerleri, yaygın olarak alıntılanan yaklaşık referans değerlerdir).

![Sprout ve Sapling korumalı işlem maliyeti](/content-images/sapling-before-after-a045b0b48f.webp)

## Yeni anahtarlar

Sapling ayrıca yeni bir korumalı adres ve anahtar kümesi de kullanıma sundu. Tek bir anahtardan, dışarıdan bakan bir gözlemcinin birbiriyle ilişkilendiremeyeceği çok sayıda çeşitlendirilmiş adres, yani ayrı ödeme adresleri türetilebilir. Sapling görüntüleme anahtarlarını da ekledi: Tam veya gelen görüntüleme anahtarı, cüzdanın işlem ayrıntılarını görme yetkisini paylaşmanıza olanak tanırken fonları harcama yetkisini vermez. Bu özellik denetim ve muhasebe işlemlerinde ya da yalnızca bir ödemenin yapıldığını kanıtlamak için kullanışlıdır.

Bununla ilişkili bir değişiklik de Sapling'ün kanıt oluşturma işini işlem imzalama işinden ayırmasıdır. Sıfır bilgi kanıtını oluşturan aygıtın artık harcama yetkisini elinde tutan aygıtla aynı olması gerekmez. Bu ayrım, donanım cüzdanının harcama anahtarınızı yalıtılmış tutmasını ve daha ağır kanıtlama işini ayrı bir aygıtın yapmasını sağlar.

![Kanıt oluşturma cihazı, kanıtı ayrı bir imzalama cihazına teslim eder](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Güvene dayalı kurulum

Sapling'ün devreleri, dikkatle oluşturulması gereken bir dizi açık parametreye dayanır. Bu parametreleri tek bir taraf üretip geride kalan gizli verileri (“zehirli atık”) saklasaydı, bu taraf sahte kanıtlar oluşturabilirdi. Bunu önlemek için parametreler iki aşamalı, çok taraflı bir törenle üretildi. Powers of Tau adı verilen 1. aşama devreden bağımsızdı; yani Sapling'ün belirli devrelerine bağlı değildi. Sapling MPC olarak adlandırılan 2. aşama ise devreye özeldi. Her iki aşama da en az bir katılımcı dürüst olduğu ve zehirli atığını yok ettiği sürece güvenli kalır; dolayısıyla tören ancak tüm katılımcıların iş birliği yapması durumunda başarısız olur.

## Nasıl etkinleşti

Sapling, ağın yükseltme mekanizmasını hazırlayan Haziran 2018 yükseltmesi Overwinter'i izledi. Electric Coin Company, ana ağ etkinleşme yüksekliğini Ağustos 2018'de yayımlanan zcashd 2.0.0 sürümünde belirledi ve 419.200. blok kazıldığında ağ Sapling kurallarına geçti. Zincir üstünde bu an, Sapling konsensüs dal kimliğiyle işaretlenir.

![Zcash lansmanından Sapling etkinleştirmesine kadar zaman çizelgesi](/content-images/sapling-timeline-6cad184c30.webp)

## Sık Yapılan Hatalar

- **Korumalı ödemelerin her zaman kullanılabilir olduğunu varsaymak.** Sapling öncesinde kanıt oluşturma işlemi dakikalar ve gigabaytlarca bellek gerektiriyordu; bu yüzden çoğu kullanıcı, borsa ve mağaza korumalı işlemleri tamamen atlıyordu.
- **Sapling adreslerinin Sprout adresleriyle aynı olduğunu söylemek.** Sapling kendi adres ve anahtar türlerini (çeşitlendirilmiş adresler ve görüntüleme anahtarlarının yanı sıra) kullanıma sundu; Sprout anahtarları Sapling adresleriyle birlikte çalışmaz.
- **Güvene dayalı kurulumun “tek bir şirketin sırrı” olduğuna inanmak.** Bu, çok taraflı bir törenle yapıldı: Kanıtlar ancak tüm katılımcılar iş birliği yaparsa sahte olarak oluşturulabilirdi.
- **Sapling'in ihracı veya bakiyeleri değiştirdiğini düşünmek.** Korumalı işlemlerin oluşturulma biçimini değiştirdi — hiçbir ZEC tutarı etkilenmedi.
- **Kanıtlama ve imzalamanın aynı aygıtta yapılması gerektiğini varsaymak.** Sapling'ün sağladığı ayrım sayesinde donanım cüzdanları harcama anahtarlarını yalıtılmış tutarken başka bir aygıt kanıt oluşturabilir.


## Sözlük

| Terim | Sade dille anlamı |
|---|---|
| Shielded transaction | Göndereni, alıcıyı ve tutarı gizleyen özel bir Zcash işlemidir. |
| Sprout | Zcash ile kullanıma sunulan ilk korumalı protokoldür; Sapling'den daha yavaş ve daha ağırdır. |
| Spend and Output circuits | Sprout'ün tek JoinSplit devresinin yerini alan iki yeni Sapling kanıtlama devresidir. |
| Diversified address | Tek bir anahtardan türetebileceğiniz, birbiriyle ilişkilendirilemez çok sayıda ödeme adresinden biridir. |
| Viewing Key | Bir kişinin cüzdan işlemlerini görmesini sağlayan, ancak fonları harcamasına izin vermeyen anahtardır. |
| Consensus branch id | Bir işlemin hangi yükseltmenin kurallarına uyduğunu ağa bildiren kısa bir koddur. |

## SSS

Sapling, sahip olduğum ZEC miktarını değiştirdi mi? Hayır. Sapling, korumalı işlemlerin oluşturulma biçimini değiştirdi; herhangi bir kişinin sahip olduğu ZEC miktarını veya toplam arzı değiştirmedi. Bakiyeniz etkilenmedi.

Sapling sonrasında ZEC hâlâ gizli mi? Evet, üstelik kullanımı daha kolay. Sapling, korumalı işlemlerin güçlü gizliliğini korurken onları gerçekten kullanılabilecek kadar hızlı ve ucuz hâle getirdi. Korumalı fonlar aynı şekilde gizli kalır.

Bir şey yapmam gerekiyor mu? Hayır. Bir varlık sahibi olarak herhangi bir işlem yapmanız gerekmez. Sapling, cüzdan ve düğüm yazılımlarının benimsediği bir ağ yükseltmesiydi. Güncel cüzdanlar Sapling adreslerini zaten destekliyor.

Sprout ile Sapling arasındaki fark nedir? Sprout ilk korumalı protokoldü ve yavaş, bellek kullanımı yüksek tek bir kanıtlama devresi kullanıyordu. Sapling, bu devrenin yerine daha hızlı Spend ve Output devrelerini koydu; görüntüleme anahtarları ve çeşitlendirilmiş adresler ekledi; korumalı işlemleri telefonlarda ve donanım cüzdanlarında kullanılabilecek kadar hafif hâle getirdi.

Bazı kaynaklar neden 28 Ekim, bazılarıysa 29 Ekim diyor? Etkinleşme yüksekliği, önceden 28 Ekim 2018'i hedefleyecek şekilde belirlenmişti. Değişikliği gerçekten tetikleyen 419.200. blok, UTC'ye göre 29 Ekim'in ilk saatlerinde kazıldı. Birçok yerel saat diliminde tarih hâlâ 28 Ekim'di. Her iki durumda da aynı blok ve aynı andan söz ediliyor.

Görüntüleme anahtarı nedir? Görüntüleme anahtarı, korumalı bir cüzdana okuma erişimini paylaşmanıza olanak tanır. Tam veya gelen görüntüleme anahtarına sahip biri cüzdanın işlem ayrıntılarını görebilir, ancak fonlarını harcayamaz. Daha fazla bilgi için [Görüntüleme Anahtarları](../zcash-tech/viewing-keys) sayfasına bakın.

## Bilginizi sınayın

Sprout altında birçok kişi korumalı işlemlerden neden kaçınıyordu ve Sapling bunu nasıl düzeltti?

<details>
<summary>Yanıt</summary>
Sprout altında korumalı bir işlem oluşturmak dakikalar sürüyor ve gigabaytlarca bellek kullanıyordu; bu nedenle çoğu kullanıcı, borsa ve mağaza için işlem çok yavaş ve ağırdı. Sapling, işi birkaç saniyeye ve yaklaşık 40 megabayta indiren daha hızlı Spend ve Output devrelerini kullanıma sundu; böylece korumalı işlemler gündelik telefonlarda ve donanım cüzdanlarında kullanılabilir hâle geldi.
</details>

### Kaynaklar

- [ZIP 205: Sapling Ağ Yükseltmesinin Dağıtımı](https://zips.z.cash/zip-0205)
- [ZIP 243: Sapling için İşlem İmzası Doğrulaması](https://zips.z.cash/zip-0243)
- [Zcash Sapling yükseltme sayfası](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling duyurusu](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC duyurusu](https://electriccoin.co/blog/sapling-mpc/)

### Ayrıca bakınız

- [Korumalı Havuzlar](../using-zcash/shielded-pools)
- [Görüntüleme Anahtarları](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)
- [Cüzdanlar](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

## İlgili Sayfalar

- [Görüntüleme Anahtarları](./Viewing_Keys.md) — Sapling'ün kullanıma sunduğu denetim paylaşımı özelliği
- [Sprout](./Sprout.md) — Sapling'ün yerine geçtiği ilk korumalı protokol
- [Blossom](./Blossom.md) — serideki sonraki yükseltme (kriptografi değil, blok zamanlaması)
- [zk_SNARKS](./zk_SNARKS.md) — devrelerin arkasındaki sıfır bilgi teknolojisi


Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Önceki: [Overwinter](../zcash-tech/overwinter) · Sonraki: [Blossom](../zcash-tech/blossom)
