<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash, 28 Ekim 2016'da Sprout korumalı havuzuyla kullanıma sunuldu.

> **Uyarı:** NU7, 6 Kasım 2026'da (UTC; bkz. [ZIP 259](https://zips.z.cash/zip-0259)) 3.543.405 blok yüksekliğinde ana ağda etkinleştirildi. O tarihten bu yana, Sprout havuzunda kalan ZEC harcanamaz; çünkü 4. sürüm işlemler artık geçerli değildir (ZIP 2003). Kurtarma seçeneklerinin arka planı için [Fonları Kurtarma](../using-zcash/recovering-funds) sayfasını okuyun.

Öğrenecekleriniz: Zcash'ın başladığı yer Sprout'tır; özel ve doğrulanabilir paranın canlı bir blokzincirde çalıştığı ilk örnektir.

Sprout, Zcash ağının daha sonraki bir [ağ yükseltmesi](../start-here/network-upgrades) değil, ilk kez kullanıma sunulmasıdır. 28 Ekim 2016'da başlangıç bloğuyla birlikte yayına girdi. Numaralandırılmış hiçbir ZIP, Sprout'ı tanımlamaz: ZIP süreci daha sonra Overwinter ile başladı; bu nedenle Sprout, ilk Zcash Protokol Belirtimi ve üzerine inşa edildiği Zerocash yapısıyla tanımlanır. Zooko Wilcox liderliğindeki [Electric Coin Company](../zcash-organizations/electric-coin-company) (o zamanlar Zerocoin Electric Coin Company), sistemi geliştirip kullanıma sundu. Sprout, ilk pratik zk-SNARK korumalı işlemleri ve özgün korumalı havuzu tanıttı; böylece ağ bakiyelerin tutarlı olduğunu doğrulamaya devam ederken kişiler, gönderen, alıcı ve tutar gizli kalacak şekilde ZEC gönderebildi. İsim, ekibin büyümesini beklediği genç ve filizlenen bir Zincir'e işaret ediyordu.

Bunun önemi. Sprout'dan önceki her açık blokzincir ödemelerinizi herkesin görebileceği şekilde sergiliyordu: herkes kimin kime ne kadar ödediğini görebilirdi. Sprout, bu ayrıntıları gizleyip yine de kimsenin hile yapmadığını kanıtlayan ilk canlı, izin gerektirmeyen ağdı. Bu, nakitten ya da başkalarının okuyamadığı bir banka ekstresinden beklediğiniz türden olağan finansal gizlilik için önemlidir. Ayrıca güçlü zincir üstü gizliliğin, kâğıt üzerindeki bir tasarımın ötesinde, pratikte işe yarayabileceğini de kanıtladı. Bunu mümkün kılan güvene dayalı kurulum Seremonisi, sonraki kriptografi çalışmaları için bir referans noktası hâline geldi; Sprout ile birlikte sunulan yavaş ve bellek yoğun kanıtlama sistemi ise ekibi tam da iki yıl sonra Sapling'ı geliştirmeye itti.

## İlk korumalı havuz

Sprout iki tür adres oluşturdu. Şeffaf adresler (t-adresleri), ayrıntıların herkese açık defterde görülebildiği Bitcoin gibi çalışır. Korumalı adresler (z-adresleri), fonları gönderenin, alıcının ve tutarın gizli kaldığı Sprout [korumalı havuz](../using-zcash/shielded-pools) içine gönderir. Bunun yöntemi [zk-SNARKs](../zcash-tech/zk-snarks): Bir işlemin geçerli olduğunu, çift harcama olmadığını ve bakiyelerin tutarlı olduğunu, hiçbir ayrıntıyı açığa çıkarmadan gösteren sıfır bilgi kanıtlarıdır. Sprout, bunun canlı bir kripto para üzerinde üretim ortamında çalıştığı ilk örnekti.

![Şeffaf işlemler göndereni, alıcıyı ve tutarı açığa çıkarırken Sprout korumalı işlemleri üçünü de gizler ancak doğrulanabilir kalır](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Seremoni

Sprout içindeki zk-SNARKs bir dizi açık parametreye ihtiyaç duyuyordu ve bunları güvenli biçimde oluşturmak, Seremoni adı verilen tek seferlik bir kurulum gerektiriyordu. Birbirinden uzakta ve ayrı konumlarda bulunan altı katılımcının her biri, zehirli atık adı verilen gizli bir parça oluşturdu. Herhangi biri tüm parçaları yeniden bir araya getirebilseydi, yoktan ZEC oluşturabilirdi. Tasarım, bu riski basit bir kurala dönüştürdü: Katılımcılardan en az biri kendi parçasını yok ettiği sürece, gizli anahtarın tamamı asla yeniden oluşturulamazdı; böylece sahtecilik imkânsız kalıyordu. Adları kamuya açıklanan katılımcılar arasında Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd ve NCC Group'tan Derek Hinch bulunuyor. Bir katılımcı anonim kalmayı tercih etti.

![Seremoni: altı katılımcı gizli parçalar oluşturur, ardından zehirli atığı yok eder; geriye yalnızca Sprout'ın açık parametreleri kalır](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Köken

Sprout, sonraki tüm değişikliklerin üzerine inşa edildiği temel sürümdür. Ağ yükseltme mekanizması Overwinter ile geldiğinde, özgün kuralları konsensüs dal kimliği 0 olarak etiketledi; bu, henüz hiçbir yükseltmenin uygulanmadığı anlamına gelir. O zamandan beri gelen her şey (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6 ve sonrakiler), Sprout'ın başlattığı Zincir üzerinde yer alır. Kullanıma sunulacağı Ağustos 2016'da duyuruldu ve başlangıç bloğunun 28 Ekim'de oluşturulacağı belirtildi; Seremoni önceki haftalarda yürütüldü ve başlangıç bloğunda sabit kodlanmış zaman damgası 28 Ekim 2016, 07:56 UTC olarak kaydedildi.

![Ağustos 2016 duyurusundan parametre Seremonisi üzerinden 28 Ekim 2016 Sprout lansmanına kadar zaman çizelgesi](/content-images/sprout-timeline-348766352a.webp)

## Sözlükçe

| Terim | Sade dille anlamı |
|---|---|
| zk-SNARK | Göndereni, alıcıyı veya tutarı açığa çıkarmadan bir işlemin geçerli olduğunu gösteren sıfır bilgi kanıtı |
| Shielded pool | Tutarların ve tarafların gizli olduğu Zcash'ın özel bölümü. Sprout havuzu ilkti |
| z-address and t-address | z-adresi korumalıdır ve ayrıntıları gizli tutar. t-adresi şeffaftır ve ayrıntıları herkese açık defterde gösterir |
| The Ceremony | Sprout'ın açık parametrelerini oluşturup ardından zehirli atığı ortadan kaldıran 2016'daki çok taraflı kurulum |
| Toxic waste | ZEC'ın taklit edilememesi için yok edilmesi gereken Seremoni'deki gizli anahtar parçaları |
| Consensus branch id 0 | Sprout'ın kuralları için kullanılan etiket; herhangi bir ağ yükseltmesinden önceki temel sürümü ifade eder |

## SSS

Sprout benim ZEC’ımı ya da bugün gizliliğimi değiştirir mi? Hayır. Sprout tarihtir; ZEC’ınızın üzerinde bulunduğu Zincir’i başlatan lansmandır. Bugünkü coinleriniz ve gizliliğiniz, Sprout hakkında yapmanız gereken herhangi bir şeye değil, şu anda kullandığınız cüzdana ve korumalı havuza bağlıdır.

Sprout için neden bir ZIP numarası yok? ZIP süreci daha sonra, Overwinter yükseltmesiyle başladı. Sprout ilk kullanıma sunumdur; Zcash Protokol Belirtimi ve temel aldığı Zerocash yapısıyla tanımlanır. ZIP 200, Sprout'dan yalnızca geriye dönük olarak, herhangi bir yükseltmeden önceki temel sürüm olan konsensüs dal kimliği 0 şeklinde bahseder.

Seremoni'deki altı kişiye güvenmem gerekiyor muydu? Kurulum, yalnızca birinin dürüst olması yeterli olacak şekilde tasarlanmıştı. Her biri gizli bir parça tuttu ve tek bir katılımcı bile kendi parçasını yok ettiği sürece gizli anahtarın tamamı asla yeniden oluşturulamaz, hiç kimse de ZEC taklit edemezdi. Beş katılımcının adı kamuya açıklandı; biri anonim kaldı.

Sprout havuzu, cüzdanımın bugün kullandığı havuz mu? Muhtemelen değil. Sprout ilk korumalı havuzdu; ancak Sapling gibi sonraki yükseltmeler daha hızlı bir korumalı tasarım getirdi ve günümüzde çoğu cüzdan daha yeni havuzları kullanıyor. Sprout, özel ve doğrulanabilir işlemlerin canlı bir ağda çalışabileceğini kanıtlayan çalışma olarak önemini koruyor.

Sprout'ı Bitcoin'den farklı kılan neydi? Bitcoin her ödemeyi, tutarların ve adreslerin görülebildiği herkese açık bir deftere yazar. Sprout, göndereni, alıcıyı ve tutarı gizleyen, ancak yine de ağın işlemin geçerli olduğunu doğrulamasına olanak tanıyan korumalı işlemler ekledi. Şeffaf adresleri de korudu; böylece her iki yöntem de aynı Zincir'de yer alıyor.

## Bilginizi sınayın

Sprout genellikle etkinleştirme yüksekliği olan bir ağ yükseltmesi olarak anılır. Bu neden tam olarak doğru değildir?

<details>
<summary>Yanıt</summary>

Sprout, Zcash'ın daha sonraki bir yükseltme değil, ilk kez kullanıma sunulmasıdır. 28 Ekim 2016'daki başlangıç bloğundan (blok 0) beri etkindir; dolayısıyla belirtilecek bir etkinleştirme yüksekliği yoktur. Ağ yükseltme mekanizması daha sonra geldi ve Sprout'ın kurallarını, herhangi bir yükseltmeden önceki temel sürüm olan konsensüs dal kimliği 0 olarak etiketledi.
</details>

### Kaynaklar

[ZIP 200: Ağ Yükseltme Mekanizması](https://zips.z.cash/zip-0200)

[Zcash ağ yükseltmeleri](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout lansmanı](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Seremoni'nin Tasarımı](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Ayrıca bkz.

[Korumalı Havuzlar](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash Ağ Yükseltmeleri](../start-here/network-upgrades)

[ZEC nedir ve Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Seri: [Ağ Yükseltmeleri dizini](../start-here/network-upgrades) · Sonraki: [Overwinter](../zcash-tech/overwinter)
