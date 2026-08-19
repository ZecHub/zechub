<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Sapling

> Sapling, Zcash mainnet’inde 419.200. blokta etkinleşti (29 Ekim 2018, 02:15 UTC).

Edineceğiniz ana fikir: Sapling, özel Zcash ödemelerini telefonda veya bir donanım cüzdanında çalışacak kadar hızlı ve hafif hâle getirdi.

Sapling, Zcash ağının ikinci büyük yükseltmesiydi ve Zcash’in ikinci yıldönümünde etkinleşti. Korumalı (özel) işlemlerin nasıl oluşturulduğunu yeniden inşa eden bir konsensüs hard fork’uydu. Dağıtım ZIP 205 ile, yeni işlem imza kuralları ZIP 243 ile tanımlanır ve her ikisi de ağ yükseltme mekanizması olan ZIP 200 üzerine kuruludur. Tüm ayrıntılar Zcash Protocol Specification içinde yer alır. Electric Coin Company bu yükseltmeyi geliştirdi ve bunu destekleyen ilk sürüm olan zcashd 2.0.0’ı Ağustos 2018’de yayımladı. Zincir üzerinde ağ, Sapling kurallarını konsensüs branch id ile tanımlar.

Bu neden önemlidir? Sapling’den önce gerçekten özel bir ödeme yapmak, ispatı oluşturmak için bilgisayarınızın gigabaytlarca belleği kullanarak dakikalar boyunca çalışmasını beklemek anlamına geliyordu. Bu çoğu insan için fazla yavaş ve ağırdı; bu yüzden birçok kullanıcı, borsa ve mağaza korumalı işlemleri atlıyor ve bunun yerine ZEC’i açık şekilde gönderiyordu. Sapling bu işi birkaç saniyeye ve yaklaşık 40 megabayt belleğe düşürdü. Günlük yaşamda, sıradan telefonlarda ve donanım cüzdanlarında korumalı ZEC kullanımını pratik hâle getiren şey işte bu tek değişiklik oldu.

## Neler değişti

Sapling’in kalbinde, korumalı bir işlemi gizli tutan sıfır bilgi ispatını daha hızlı oluşturmanın bir yolu vardır. Orijinal Sprout tasarımı, yavaş ve çok bellek tüketen tek bir ispat devresi (JoinSplit devresi) kullanıyordu. Sapling bunu, Zcash Protocol Specification içinde açıklanan, belirli amaçlar için tasarlanmış iki devreyle değiştirdi: Spend devresi ve Output devresi. Sonuç, maliyette büyük bir düşüştür. Electric Coin Company’ye göre, korumalı bir işlem yaklaşık 40 megabayt bellek kullanılarak yalnızca birkaç saniyede oluşturulabilir. Sapling öncesi Sprout tabanı ise çok daha ağırdı; dakikalar ve birkaç gigabayt bellek düzeyindeydi (Sprout tarafındaki bu rakamlar, yaygın şekilde alıntılanan yaklaşık temel düzeydir).

![Sprout ile Sapling arasında korumalı işlem maliyeti karşılaştırması](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Yeni anahtarlar

Sapling ayrıca yeni bir korumalı adres ve anahtar seti de tanıttı. Tek bir anahtar, birçok çeşitlendirilmiş adres türetebilir; bunlar dışarıdan bir gözlemcinin birbirine bağlayamayacağı ayrı ödeme adresleridir. Sapling görüntüleme anahtarlarını da ekledi: tam veya gelen görüntüleme anahtarı, bir cüzdanın işlem ayrıntılarını görme yeteneğini, o cüzdandaki fonları harcama yetkisini vermeden paylaşmanıza olanak tanır. Bu; denetim, muhasebe ya da basitçe bir ödemenin yapıldığını kanıtlama için faydalıdır.

Bununla ilişkili bir başka değişiklik de Sapling’in ispatı oluşturma işi ile işlemi imzalama işini ayırmış olmasıdır. Sıfır bilgi ispatını oluşturan cihazın artık harcama yetkisini elinde tutan cihaz olması gerekmez. Bu ayrıştırma, bir donanım cüzdanının harcama anahtarınızı izole biçimde saklarken daha ağır ispatlama işini ayrı bir cihazın yapmasına olanak tanır.

![İspat oluşturan cihaz, ispatı ayrı bir imzalama cihazına verir](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Güvenilir kurulum

Sapling’in devreleri, dikkatle üretilmesi gereken bir dizi ortak parametreye dayanır. Eğer bunları tek bir taraf tek başına üretmiş ve geriye kalan gizli veriyi (“toxic waste”) saklamış olsaydı, bu taraf sahte ispatlar üretebilirdi. Bunu önlemek için parametreler iki aşamalı, çok taraflı bir törenden elde edildi. Powers of Tau adı verilen 1. aşama devreden bağımsızdı; yani Sapling’in belirli devrelerine bağlı değildi. 2. aşama olan Sapling MPC ise devreye özeldi. Her aşama, en az bir katılımcı dürüst olduğu ve toxic waste’i yok ettiği sürece güvenli kalır; dolayısıyla tören ancak bütün katılımcıların iş birliği yapması durumunda başarısız olur.

## Nasıl etkinleşti

Sapling, ağın yükseltme mekanizmasını hazırlayan Haziran 2018 yükseltmesi Overwinter’ı takip etti. Electric Coin Company, Ağustos 2018’de yayımlanan zcashd 2.0.0 içinde mainnet etkinleşme yüksekliğini belirledi ve 419.200. blok çıkarıldığında ağ Sapling kurallarına geçti. Zincir üzerinde bu an, Sapling konsensüs branch id ile işaretlenir.

![Zcash’in lansmanından Sapling etkinleşmesine uzanan zaman çizelgesi](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Sözlük

| Terim | Sade Türkçe anlamı |
|---|---|
| Shielded transaction | Göndereni, alıcıyı ve tutarı gizleyen özel bir Zcash işlemi. |
| Sprout | Zcash’in birlikte piyasaya çıktığı, Sapling’e göre daha yavaş ve daha ağır olan ilk korumalı protokol. |
| Spend and Output circuits | Sprout’un tek JoinSplit devresinin yerini alan iki yeni Sapling ispat devresi. |
| Diversified address | Tek bir anahtardan türetebileceğiniz, birbiriyle ilişkilendirilemeyen çok sayıdaki ödeme adresinden biri. |
| Viewing key | Birinin, bir cüzdanın işlemlerini ondan harcama yapamadan görmesini sağlayan anahtar. |
| Consensus branch id | Ağa, bir işlemin hangi yükseltmenin kurallarını izlediğini söyleyen kısa kod. |

## SSS

Sapling sahip olduğum ZEC miktarını değiştirdi mi? Hayır. Sapling, korumalı işlemlerin nasıl oluşturulduğunu değiştirdi; herhangi birinin elindeki ZEC miktarını ya da toplam arzı değil. Bakiyeniz etkilenmedi.

Sapling’den sonra ZEC’im hâlâ özel mi? Evet, hem de daha kullanışlı. Sapling, korumalı işlemlerin güçlü gizliliğini korudu ve onları gerçekten kullanılabilecek kadar hızlı ve ucuz hâle getirdi. Korumalı fonlar aynı şekilde gizli kalır.

Bir şey yapmam gerekiyor mu? Hayır, holder olarak sizden herhangi bir işlem gerekmez. Sapling, cüzdan ve düğüm yazılımlarının benimsediği bir ağ yükseltmesiydi. Modern cüzdanlar zaten Sapling adreslerini destekliyor.

Sprout ile Sapling arasındaki fark nedir? Sprout ilk korumalı protokoldü ve yavaş, çok bellek kullanan tek bir ispat devresi kullanıyordu. Sapling bunu daha hızlı Spend ve Output devreleriyle değiştirdi, görüntüleme anahtarları ile çeşitlendirilmiş adresler ekledi ve korumalı işlemleri telefonlar ile donanım cüzdanları için yeterince hafif hâle getirdi.

Neden bazı kaynaklar 28 Ekim, bazıları ise 29 Ekim diyor? Etkinleşme yüksekliği önceden 28 Ekim 2018’i hedefleyecek şekilde ayarlanmıştı. Değişikliği fiilen tetikleyen blok olan 419.200. blok, UTC’ye göre 29 Ekim’in ilk saatlerinde çıkarıldı. Birçok yerel saat diliminde bu hâlâ 28 Ekim’di. Her iki durumda da aynı blok ve aynı andır.

Görüntüleme anahtarı nedir? Bir görüntüleme anahtarı, korumalı bir cüzdana okuma erişimini paylaşmanıza olanak tanır. Tam veya gelen görüntüleme anahtarına sahip biri cüzdanın işlem ayrıntılarını görebilir ama fonlarını harcayamaz. Daha fazlası için bkz. [Viewing Keys](../zcash-tech/viewing-keys).

## Anladığınızı test edin

Sprout döneminde neden bu kadar çok insan korumalı işlemlerden kaçındı ve Sapling bunu nasıl düzeltti?

<details>
<summary>Cevap</summary>
Sprout döneminde korumalı bir işlem oluşturmak dakikalar sürüyor ve gigabaytlarca bellek kullanıyordu; bu yüzden çoğu kullanıcı, borsa ve mağaza için fazla yavaş ve ağırdı. Sapling, işi birkaç saniyeye ve yaklaşık 40 megabayta indiren daha hızlı Spend ve Output devrelerini tanıttı; böylece korumalı işlemler gündelik telefonlarda ve donanım cüzdanlarında pratik hâle geldi.
</details>

### Kaynaklar

- [ZIP 205: Sapling Network Upgrade’in Dağıtımı](https://zips.z.cash/zip-0205)
- [ZIP 243: Sapling için İşlem İmzası Doğrulaması](https://zips.z.cash/zip-0243)
- [Zcash Sapling yükseltme sayfası](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling duyurusu](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC duyurusu](https://electriccoin.co/blog/sapling-mpc/)

### Ayrıca bkz.

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash Network Upgrades](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Seri: [Network Upgrades dizini](../start-here/network-upgrades) · Önceki: [Overwinter](../zcash-tech/overwinter) · Sonraki: [Blossom](../zcash-tech/blossom)
