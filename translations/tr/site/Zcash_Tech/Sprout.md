---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash, 28 Ekim 2016'da Sprout shielded pool ile başlatıldı.

Buradan çıkaracağınız ana fikir: Sprout, Zcash'in başladığı yerdir; özel, doğrulanabilir paranın canlı bir blok zincirinde ilk kez çalıştığı andır.

Sprout, Zcash ağının orijinal başlangıcıdır; daha sonraki bir [ağ yükseltmesi](../start-here/network-upgrades) değildir. 28 Ekim 2016'da genesis bloğunda canlıya geçti. Sprout'u tanımlayan numaralı bir ZIP yoktur: ZIP süreci daha sonra Overwinter ile başladı, bu yüzden Sprout, orijinal Zcash Protocol Specification ve üzerine inşa edildiği Zerocash yapısı tarafından tanımlanır. Zooko Wilcox liderliğindeki [Electric Coin Company](../zcash-organizations/electric-coin-company) (o zamanki adıyla Zerocoin Electric Coin Company) bunu geliştirdi ve kullanıma sundu. Sprout, ilk pratik zk-SNARK shielded işlemlerini ve orijinal shielded pool'u tanıttı; böylece insanlar ZEC göndereni, alıcısı ve miktarı gizliyken gönderebilirken ağ da bakiyelerin toplamının tuttuğunu kontrol etmeye devam edebildi. İsim, ekibin büyümesini beklediği genç, filizlenen bir zinciri simgeliyordu.

Bu neden önemlidir? Sprout'tan önceki her açık blok zinciri ödemelerinizi gözler önüne seriyordu: herkes kimin kime ne kadar ödediğini görebiliyordu. Sprout, bu ayrıntıları gizleyip aynı zamanda kimsenin hile yapmadığını kanıtlayan ilk canlı, izinsiz ağdı. Bu, sıradan finansal mahremiyet için önemlidir; yani nakitte ya da başkasının okuyamadığı bir banka ekstresinde beklediğiniz türden mahremiyet. Ayrıca güçlü zincir üstü gizliliğin yalnızca kâğıt üzerindeki bir tasarımın ötesinde, pratikte çalışabileceğini de kanıtladı. Bunu mümkün kılan trusted-setup Ceremony, daha sonraki kriptografi çalışmaları için bir referans noktası oldu ve Sprout ile sunulan yavaş, bellek açısından ağır ispat sistemi, ekibi iki yıl sonra Sapling'i geliştirmeye iten şeyin tam olarak kendisiydi.

## İlk shielded pool

Sprout iki tür adres oluşturdu. Transparent adresler (t-addresses) Bitcoin gibi çalışır; ayrıntılar herkese açık defterde görünür. Shielded adresler (z-addresses) fonları Sprout [shielded pool](../using-zcash/shielded-pools) içine gönderir; burada gönderen, alıcı ve miktar gizli kalır. İşin püf noktası [zk-SNARKs](../zcash-tech/zk-snarks) yani bir işlemin ayrıntıların hiçbirini açıklamadan, çift harcama olmadığını ve bakiyelerin tuttuğunu gösteren sıfır bilgi ispatlarıdır. Sprout, bunun canlı bir kripto para sisteminde üretim ortamında ilk kez çalıştırılmasıydı.

![Transparent işlemler göndereni, alıcıyı ve miktarı açığa çıkarırken, Sprout shielded işlemleri üçünü de gizler ama yine de doğrulanabilir kalır](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Ceremony

Sprout'taki zk-SNARKs için bir dizi açık parametre gerekiyordu ve bunların güvenli biçimde üretilmesi Ceremony adı verilen tek seferlik bir kurulum gerektiriyordu. Birbirinden uzak, ayrı konumlardaki altı katılımcı, toxic waste denilen gizli birer parça üretti. Eğer biri bu parçaların tamamını yeniden bir araya getirebilseydi, yoktan ZEC üretebilirdi. Tasarım bu riski basit bir kurala dönüştürdü: en az bir katılımcı kendi parçasını yok ettiği sürece tam sır hiçbir zaman yeniden oluşturulamazdı, böylece sahte ZEC üretmek imkânsız kalırdı. Kamuya açık olarak adı bilinen katılımcılar arasında Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd ve NCC Group'tan Derek Hinch bulunur. Bir katılımcı anonim kalmayı seçti.

![Ceremony: altı katılımcı özel parçalar üretir, ardından toxic waste'i yok eder ve geriye yalnızca herkese açık Sprout parametreleri kalır](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Köken

Sprout, sonraki her değişikliğin üzerine inşa edildiği temel çizgidir. Overwinter ile ağ yükseltme mekanizması geldiğinde, orijinal kuralları consensus branch id 0 olarak etiketledi; bu basitçe henüz hiçbir yükseltmenin uygulanmadığı anlamına gelir. O zamandan beri gelen her şey (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 ve sonrası) Sprout'un başlattığı zincirin üzerine oturur. Başlangıç, Ekim 2016'da bir genesis için Ağustos 2016'da duyuruldu, Ceremony önceki haftalarda gerçekleştirildi ve genesis bloğunun sabit kodlanmış zaman damgası 28 Ekim 2016, 07:56 UTC olarak okunur.

![Ağustos 2016 duyurusundan parametre Ceremony'sine ve 28 Ekim 2016'daki Sprout başlangıcına uzanan zaman çizelgesi](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Sözlük

| Terim | Düz anlamı |
|---|---|
| zk-SNARK | Göndereni, alıcıyı veya miktarı açıklamadan bir işlemin geçerli olduğunu gösteren bir sıfır bilgi ispatı |
| Shielded pool | Zcash'in miktarların ve tarafların gizlendiği özel tarafı. Sprout pool ilk olandı |
| z-address ve t-address | z-address shielded'dır ve ayrıntıları gizli tutar. t-address transparent'tır ve ayrıntıları herkese açık defterde gösterir |
| Ceremony | Sprout'un herkese açık parametrelerini üreten ve ardından toxic waste'i ortadan kaldıran 2016 tarihli çok taraflı kurulum |
| Toxic waste | ZEC'in sahte şekilde üretilememesi için yok edilmesi gereken Ceremony'deki gizli anahtar parçaları |
| Consensus branch id 0 | Sprout kurallarının etiketi; herhangi bir ağ yükseltmesinden önceki temel durumu ifade eder |

## SSS

Sprout bugün benim ZEC'imi ya da gizliliğimi değiştiriyor mu? Hayır. Sprout tarihtir; ZEC'inizin üzerinde yaşadığı zinciri başlatan açılıştır. Bugünkü coin'leriniz ve gizliliğiniz, Sprout hakkında yapmanız gereken bir şeye değil, şu anda kullandığınız cüzdana ve shielded pool'a bağlıdır.

Sprout için neden bir ZIP numarası yok? ZIP süreci daha sonra, Overwinter yükseltmesiyle başladı. Sprout, dayandığı Zcash Protocol Specification ve Zerocash yapısı tarafından tanımlanan orijinal başlangıçtır. ZIP 200, Sprout'tan yalnızca geriye dönük olarak, herhangi bir yükseltmeden önceki temel çizgi olan consensus branch id 0 şeklinde söz eder.

Ceremony'deki altı kişiye güvenmem gerekiyor muydu? Kurulum, yalnızca birinin dürüst olması yeterli olacak şekilde tasarlanmıştı. Her biri gizli bir parça tuttu ve tek bir katılımcı bile kendi parçasını yok ettiği sürece tam sır yeniden oluşturulamaz, kimse de sahte ZEC üretemezdi. Beş katılımcı kamuya açık olarak adlandırıldı ve biri anonim kaldı.

Sprout pool şu anda cüzdanımın kullandığı pool mu? Muhtemelen değil. Sprout ilk shielded pool'du, ancak Sapling gibi sonraki yükseltmeler daha hızlı bir shielded tasarım sundu ve bugün çoğu cüzdan daha yeni pool'ları kullanıyor. Sprout hâlâ önemlidir çünkü özel, doğrulanabilir işlemlerin canlı bir ağda çalışabileceğini kanıtlayan çalışma oydu.

Sprout'u Bitcoin'den farklı kılan neydi? Bitcoin, her ödemeyi miktarların ve adreslerin görünür olduğu herkese açık bir deftere koyar. Sprout, göndereni, alıcıyı ve miktarı gizleyen ama yine de ağın işlemin geçerli olduğunu doğrulamasına izin veren shielded işlemler ekledi. Transparent adresleri de korudu; yani iki tarz da aynı zincirde birlikte yaşar.

## Bilginizi test edin

Sprout'a sık sık etkinleştirme yüksekliği olan bir ağ yükseltmesi denir. Bu neden tam olarak doğru değildir?

<details>
<summary>Cevap</summary>

Sprout, daha sonraki bir yükseltme değil, Zcash'in orijinal başlangıcıdır. 28 Ekim 2016'da genesis bloğundan (blok 0) beri aktiftir, dolayısıyla işaret edilecek bir etkinleştirme yüksekliği yoktur. Ağ yükseltme mekanizması daha sonra geldi ve Sprout kurallarını consensus branch id 0, yani herhangi bir yükseltmeden önceki temel çizgi olarak etiketledi.
</details>

### Kaynaklar

[ZIP 200: Ağ Yükseltme Mekanizması](https://zips.z.cash/zip-0200)

[Zcash ağ yükseltmeleri](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout başlangıcı](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Ceremony'nin Tasarımı](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Ayrıca bakınız

[Shielded Pools](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[ZEC ve Zcash nedir](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Sonraki: [Overwinter](../zcash-tech/overwinter)
