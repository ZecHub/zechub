<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Korumalı ödeme kanıtı ve ödeme açıklamaları

## Kısaca

- Bir işlem kimliği bir işlemi tanımlar, ancak korumalı alıcıyı, tutarı veya notu açıklamaz.
- Ödeme açıklaması, gönderenin cüzdan geçmişinin geri kalanını açığa çıkarmadan tek bir ödemenin seçilmiş ayrıntılarını kanıtlamasına olanak vermek üzere tasarlanmıştır.
- Bir görüntüleme anahtarı, bir adrese veya hesaba sürekli okuma erişimi verir. Bunu tek ödemelik bir anlaşmazlık için değil, devam eden denetimler için kullanın.
- Bir ödeme açıklaması, malların teslim edildiğini kanıtlayamaz, tek başına bir kişiyi tanımlayamaz, bir ödemeyi geri alamaz veya onay kontrollerinin yerini tutamaz.
- [ZIP 311](https://zips.z.cash/zip-0311) hâlâ bir **Taslak**tır. Mevcut metni Orchard desteğini, şeffaf girdi desteğini, kodlamayı, sürümlemeyi ve kullanıcı arayüzü kurallarını tamamlanmamış bırakmaktadır.

## Bir işlem kimliği neden yeterli değildir?

Herkes şeffaf bir Zcash ödemesinin herkese açık ayrıntılarını inceleyebilir. Bir blok gezgini, adreslerini, tutarlarını ve onay durumunu gösterebilir.

Korumalı bir ödeme farklı çalışır. Zincir, işlemin Zcash kurallarına uyduğunu kanıtlar; ancak korumalı göndericiyi, alıcıyı, tutarı veya notu yayınlamaz. İşlem kimliğini paylaşmak bir işlemin madenciliğinin yapıldığını gösterebilir, ancak bunun içindeki hangi özel ödemenin olduğunu bir satıcıya veya üçüncü tarafa kanıtlayamaz.

Bu, pratik bir sorun yaratır. Bir müşterinin satıcıyla yaşadığı anlaşmazlığı çözmesi, bir borsanın para çekme işlemini gerçekleştirdiğini kanıtlaması veya bir bağışçının tek bir katkıyı kanıtlamak istemesi gerekebilir. Tam bir görüntüleme anahtarını paylaşmak, bu durumların gerektirdiğinden çok daha fazlasını açığa çıkarır.

[ZIP 311: Zcash Ödeme Açıklamaları](https://zips.z.cash/zip-0311) daha dar kapsamlı bir yanıt önerir: tek bir işlemden seçilmiş bilgileri açıklamak ve doğrulamak.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Ödeme açıklaması nasıl çalışır?

Temel akış şöyledir:

1. Doğrulayıcı, etkileşimli bir kanıt uygunsa gönderene benzersiz bir meydan okuma veya referans verir.
2. Gönderen, işlemi ve açıklanacak korumalı çıktıyı veya çıktıları seçer.
3. Uyumlu cüzdan yazılımı, bu işleme ve isteğe bağlı olarak meydan okumaya bağlı bir ödeme açıklaması oluşturur.
4. Gönderen, açıklamayı doğrulayıcıya verir.
5. Doğrulayıcı, gerçek işlemi güvenilir bir Zcash düğümünden alır, madenciliğinin yapıldığını kontrol eder ve açıklamayı bu işleme karşı doğrular.
6. Geçerli bir sonuç, yalnızca o açıklamada yer alan iddiaları onaylar.

ZIP'ün Sapling tasarımı, seçilen her çıktıyı kurtarmak için giden şifreleme anahtarı kullanır. Bu, çıktının alıcısını, tutarını ve notunu ortaya çıkarabilir. Ayrıca en az bir işlem girdisi için harcama yetkisi kanıtı gerektirir; böylece işlemi yalnızca gören bir kişi, işlemi kendisi göndermiş gibi geçerli bir açıklama oluşturamaz.

Bir Sapling ödeme açıklaması, bir gönderici adresini açığa çıkarmak zorunda değildir. Harcama yetkisi birçok çeşitlendirilmiş adresi kontrol edebilir; dolayısıyla harcama kontrolünü kanıtlamak otomatik olarak tek bir adresi tanımlamaz. ZIP 311, kanıtı bilinen bir gönderici adresine bağlamanın gerekli olduğu durumlar için isteğe bağlı bir adres kanıtı içerir.

## Ödeme açıklaması mı, görüntüleme anahtarı mı?

| Yöntem | En iyi kullanım | Açığa çıkardıkları | Sürekli erişim? | Ödemeye kriptografik olarak bağlı mı? |
| --- | --- | --- | --- | --- |
| Transaction ID | Bir işlemin madenciliğinin yapıldığını kontrol etmek | Herkese açık işlem verileri ve onaylar | Hayır | Evet, ancak korumalı ödeme ayrıntıları gizli kalır |
| Screenshot or receipt | Gayriresmî kayıt tutma | Gönderenin göstermeyi seçtiği her şey | Hayır | Hayır; görüntü düzenlenebilir |
| Payment disclosure | Tek bir ödemenin seçilmiş ayrıntılarını kanıtlamak | Seçilmiş işlem çıktıları ve eklenmiş tüm gönderici veya meydan okuma kanıtları | Hayır, ancak paylaşılan kanıt kopyalanabilir | Evet |
| Incoming Viewing Key | Bir hesabın aldığı ödemeleri izlemek | Anahtarın kapsadığı gelen etkinlik | Evet | Eşleşen gelen ödemelerin şifresini çözer |
| Full Viewing Key | Bir hesabın muhasebesi veya denetimi | Anahtarın kapsadığı gelen ve giden etkinlik, tutarlar, notlar ve bakiyeler | Evet | Eşleşen hesap etkinliğinin şifresini çözer |

Soruyu yanıtlayan en küçük kapsamlı açıklamayı kullanın. Tek bir ödemeyle ilgili satıcı anlaşmazlığı, normalde bir hesaptaki her ödemeye erişimi haklı çıkarmaz. Tüm bir raporlama dönemini incelemesi gereken bir muhasebecinin bunun yerine bir görüntüleme anahtarına ihtiyacı olabilir.

Hiçbir yöntem harcama izni vermez. Ödeme kanıtı olarak asla bir başlangıç ifadesini, harcama anahtarını, özel anahtarı veya cüzdan yedeğini paylaşmayın.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Bugün ne kullanabilirim?

Burada, ZIP 311 ödeme açıklaması oluşturma veya doğrulama işlemini uyguladığı belirtilen güncel bir cüzdan yoktur. ZIP taslak olarak kalmakta ve referans uygulamasını "TBD" olarak listelemektedir. Aşağıdaki bakımı yapılan araçlar, gönderenin, alıcının veya yetkili bir denetçinin bugün mevcut kayıtları incelemesine yine de yardımcı olabilir:

| Uygulama | Bugün için yararlı olduğu alanlar | Önemli sınırlama |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Ayrıntılı işlem metaverilerini, tutarları, havuz girdilerini ve çıktılarını ve notları görüntüleme; Unified veya Sapling görüntüleme anahtarlarını yalnızca görüntüleme hesaplarına aktarma | ZIP 311 açıklama oluşturma veya doğrulama özelliğini sunduğunu belirtmez |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Korumalı işlem geçmişini ve notları inceleme; Unified Full Viewing Key öğesini salt okunur modda içe aktarma | Bir cüzdan kaydı veya salt okunur hesap, seçici kapsamlı bir ödeme açıklaması değildir |
| [Zallet](https://zcash.github.io/zallet/) | `z_viewtransaction`, `z_exportviewingkey` ve `z_importviewingkey` kullanan operatör iş akışları | Beta yazılım; görüntüleme anahtarı ve işlem RPC'leri ZIP 311 kanıtları değil, daha geniş kapsamlı veya yerel kayıtlardır |

Önce ödemeyi gönderen veya alan cüzdanı kullanın. İşlem ayrıntılarını, notu, işlem kimliğini ve onayları kontrol edin; ardından diğer taraftan bu ayrıntıları kendi kayıtlarıyla karşılaştırmasını isteyin. Yalnızca kanıt üretmek için yeni bir cüzdan kurmayın ve başlangıç ifadesi girmeyin. Bir denetçinin sürekli görünürlüğe ihtiyacı varsa, uyumlu bir salt görüntüleme hesabını değerlendirin ve paylaşmadan önce görüntüleme anahtarının kapsamını anlayın.

Bu uygulamalar, kayıtları kontrol etmek için pratik alternatiflerdir; standartlaştırılmış bir ödeme açıklamasının mevcut olduğunun kanıtı değildir. Ekran görüntüsü insanların kayıtları karşılaştırmasına yardımcı olabilir, ancak düzenlenebilir ve kriptografik kanıt değildir.

## Ödeme açıklamalarının geçerli olduğu yerler

### Satıcı anlaşmazlıkları

Bir müşteri, belirli bir tutarın satıcının korumalı adresine gönderildiğini kanıtlayabilir. Kanıt, malların teslim edildiğini, geri ödeme borçlu olunduğunu veya kanıtı sunan kişinin belirli bir hukuki kimliğe sahip olduğunu göstermez. Bu sorular hâlâ sipariş kaydına ve tarafların anlaşmasına bağlıdır.

### Korumalı para çekme işlemleri

ZIP 311, korumalı para çekme işlemlerini hedef kullanım örneği olarak listeler: bir borsa, bu ayrıntıları zincir üzerinde yayınlamadan alıcıyı ve tutarı kanıtlar. Şeffaf girdi kanıtı hâlâ tamamlanmamıştır; dolayısıyla bu henüz eksiksiz standartlaştırılmış bir iş akışı değildir. Müşteri ayrıca işlemin onay durumunu bağımsız olarak kontrol etmelidir.

### Bağışlar

Bir bağışçı veya kampanya, ilgisiz ödemeleri gizli tutarken belirli bir katkıyı kanıtlayabilir. Açıklamanın yayınlanması, seçilmiş ayrıntılarını kopyayı alan herkese açık hâle getirir; bu nedenle herkese açık kanıt gereksizse özel bir doğrulama kanalı daha güvenlidir.

### Muhasebe

Bir muhasebecinin tek bir işlem için kanıta ihtiyacı olduğunda ödeme açıklaması kullanın. Muhasebecinin birçok işleme veya eksiksiz bir raporlama dönemine sürekli erişmesi gerektiğinde en dar kapsamlı uygun görüntüleme anahtarını kullanın.

## Gizlilik açısından güvenli iş akışı

ZIP 311 henüz tamamlanmış, yaygın olarak dağıtılabilir bir cüzdan standardı değildir. Uyumlu gönderici ve doğrulayıcı araçlar kullanılabilir hâle geldiğinde, bu kontrol listesini kullanın:

1. **Önce uyumluluğu doğrulayın.** Her iki araç da aynı açıklama biçimini ve ödemenin kullandığı korumalı havuzu desteklemelidir.
2. **Önce sıradan sorunları çözün.** Özel ayrıntıları açığa çıkarmadan önce cüzdan eşitlemesini, işlem kimliğini, onay sayısını, sona erme durumunu ve alıcının kayıtlarını kontrol edin.
3. **Bir meydan okuma isteyin.** Bir anlaşmazlık için doğrulayıcı, açıklamanın bu isteğe bağlı olması amacıyla yeni bir sipariş numarası veya rastgele meydan okuma sağlamalıdır.
4. **Yalnızca gerekli çıktıyı seçin.** Aynı işlemdeki ilgisiz çıktıları eklemeyin.
5. **Açığa çıkarılan her alanı önizleyin.** Dışa aktarmadan önce alıcıyı, tutarı, notu, gönderici adresi kanıtını ve meydan okumayı kontrol edin.
6. **Özel bir kanal aracılığıyla paylaşın.** Açıklama gizli bir harcama anahtarı değildir; ancak onu alan herkes, açığa çıkardığı bilgileri saklayabilir veya yeniden dağıtabilir.
7. **Zincire karşı doğrulayın.** Doğrulayıcı, tam işlemi güvenilir bir düğümden getirmeli, amaçlanan ağda ve blokta olduğunu doğrulamalı, ardından açıklamayı geçerli kılmalıdır.
8. **Ek sırları değil, sonucu kaydedin.** Yalnızca anlaşmazlık, para çekme, bağış veya muhasebe sürecinin gerektirdiği bilgileri saklayın.

Cüzdan açıklama oluşturamıyorsa, daha geniş ve kalıcı kapsamını anlamadan tam bir görüntüleme anahtarını ikame etmeyin. Alıcının ödemeyi kendi cüzdan kayıtlarından onaylayıp onaylayamayacağını veya bunun yerine daha az hassas bir kaydı kabul edip edemeyeceğini sorun.

## Geçerli bir açıklama neyi kanıtlamaz?

Başarılı bir doğrulama şunları kanıtlamaz:

- İşlemin doğrulayıcının risk politikası için yeterli onaya sahip olduğunu
- Bir zincir yeniden düzenlemesinin yakın tarihli bir işlemi kaldıramayacağını
- Malların veya hizmetlerin teslim edildiğini
- Geri ödeme veya ters ibraz gerektiğini
- Uygun bir adres kanıtı eklenmediği sürece göndericinin belirli bir adresi kontrol ettiğini
- Açıklamayı sunan kişinin iddia edilen gerçek dünyadaki kimliğe sahip olduğunu
- Açıklanmayan çıktıların, diğer işlemlerin veya cüzdan bakiyesinin belirli bir değere sahip olduğunu
- Açıklamanın paylaşıldıktan sonra gizli kalacağını

Doğrulayıcı, zincire dâhil edilme ve onay durumunu ayrı olarak kontrol etmelidir. ZIP 311'in doğrulama prosedürü, çağıranın madenciliği yapılmış işlemi ve blok yüksekliğini zaten elde ettiğini varsayar.

## Mevcut sınırlamalar

ZIP 311'i, mevcut bir cüzdanda çalışan bir **Ödemeyi kanıtla** düğmesinin bulunacağı vaadi olarak değil, önerilen bir standart olarak değerlendirin.

Taslak şu anda Sapling harcamalarını ve çıktılarını belirtmektedir; ancak Orchard, şeffaf girdiler, açıklama kodlaması, sürümleme ve cüzdanların farklı geçerlilik düzeylerini nasıl göstermesi gerektiği için hâlâ tamamlanmamış maddeler içermektedir. Referans uygulaması da "TBD" olarak listelenmiştir. Yazıldığı şekliyle, Orchard veya Ironwood ödemeleri için ödeme açıklamalarını tanımlamaz.

Gönderen, işlem o çıktı için giden görüntüleme anahtarı olmadan kasıtlı olarak oluşturulduysa bir çıktıyı açıklayamayabilir. ZIP 311, yeni bir kurtarma yolu oluşturmak yerine bu gizlilik seçimini korur.

Eski belgeler, `zcashd` içindeki deneysel `z_getpaymentdisclosure` ve `z_validatepaymentdisclosure` komutlarını açıklar. Bu komutlar, ZIP 311'deki Sapling tasarımını değil, yalnızca **Sprout JoinSplit çıktılarını** destekliyordu ve kullanımdan kaldırıldı. `zcashd` Temmuz 2026'da nihai Destek Sonu duruşuna ulaştı. Mevcut fonlar için bu eski kılavuzu talimat olarak kullanmayın.

Bu eksikler fikri yararsız kılmaz. Gizlilik modelini ve kullanım örneklerini, sıradan kullanıcılar için hazır olan yazılımlardan neden dikkatle ayırmak gerektiğini açıklarlar.

## SSS

### Yalnızca işlem kimliğiyle korumalı bir ödemeyi kanıtlayabilir miyim?

Hayır. Kimlik işlemi ve onay durumunu tanımlayabilir, ancak korumalı alıcı, tutar ve not herkese açık değildir.

### Ödeme açıklaması, görüntüleme anahtarıyla aynı şey mi?

Hayır. Açıklama, tek bir işlemin seçilmiş ayrıntılarıyla sınırlıdır. Görüntüleme anahtarı, zaman içinde bir adres veya hesap için eşleşen etkinliği açığa çıkarabilir.

### Alıcı, göndericinin kanıtını oluşturabilir mi?

ZIP 311 tasarımına göre hayır. Geçerli bir açıklama, en az bir girdi için harcama yetkisini kanıtlamalıdır. Alıcı, ödemeyi kendi cüzdan kayıtlarını kullanarak onaylayabilir; ancak bu farklı bir iddiadır.

### Paylaştıktan sonra bir açıklamayı geri çekebilir miyim?

Hayır. Görüntüleme anahtarı gibi gelecekteki hesap erişimi vermez, ancak açığa çıkarılan veriler ve kanıt kopyalanabilir. Onu herhangi bir özel finansal kayıt kadar dikkatle paylaşın.

### Doğrulama herhangi bir ZEC taşır mı veya kilitler mi?

Hayır. Açıklama oluşturmak veya doğrulamak fonları harcamaz, iade etmez, dondurmaz ya da geri almaz.

### Cüzdanımda açıklama özelliği yoksa bugün ne kullanmalıyım?

Alıcının cüzdan kayıtları, işlem kimliği ve onay durumu, şifreli not içindeki fatura referansı veya karşılıklı kabul edilen başka bir makbuzla başlayın. Görüntüleme anahtarını yalnızca daha geniş kapsamı gerçekten gerekli ve anlaşılmış olduğunda kullanın.

## Kaynaklar

- [ZIP 311: Zcash Ödeme Açıklamaları](https://zips.z.cash/zip-0311) - taslak tasarım, gereksinimler, doğrulama süreci ve gizlilik değerlendirmeleri
- [ZIP 310: Sapling Görüntüleme Anahtarlarının Güvenlik Özellikleri](https://zips.z.cash/zip-0310) - görüntüleme anahtarlarının neyi açığa çıkardığı ve hangi güvenceleri sağladığı
- [ZIP 304: Sapling Adres İmzaları](https://zips.z.cash/zip-0304) - ZIP 311'de başvurulan isteğe bağlı adres kanıtı mekanizması
- [Zcash protokol spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf) - Sapling not şifrelemesi, giden görüntüleme anahtarları ve harcama yetkilendirmesi
- [Arşivlenmiş zcashd ödeme açıklaması belgesi](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - tarihsel yalnızca Sprout uygulaması, güncel bir kılavuz değildir
- [zcashd kullanımdan kaldırılmış özellikler](https://zcash.github.io/zcash/user/deprecation.html) - eski deneysel açıklama komutlarının durumu

## İlgili sayfalar

- [İşlemler](/using-zcash/transactions) - korumalı ödemeler, onaylar ve işlem sorun giderme
- [Görüntüleme anahtarları](/zcash-tech/viewing-keys) - sürekli salt okunur erişim ve mevcut dışa aktarma seçenekleri
- [Bir blok gezgininin görebilecekleri](/zcash-tech/what-a-block-explorer-can-see) - herkese açık ve özel işlem alanları
- [Korumalı ZEC ile kayıt tutma](/zcash-use-cases/keeping-records-with-shielded-zec) - cüzdan geçmişini yayınlamadan muhasebe
