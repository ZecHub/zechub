<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key'ler

Shielded adresler, Zcash blokzincirinde mümkün olduğunca az bilgi açığa çıkararak işlem yapmanızı sağlar. Peki *gerçekten* belirli bir tarafa neye sahip olduğunuzu veya ne gönderdiğinizi göstermeniz gerektiğinde ne olur? Her shielded adresin, harcama yetkisi vermeden okuma erişimi tanıyan bir viewing key'i vardır. Viewing key'ler [ZIP 310](https://zips.z.cash/zip-0310) ile tanıtıldı ve Sapling ağ yükseltmesinde protokole eklendi.

Viewing key, seçici açıklama aracıdır: kimin neyi göreceğini siz seçersiniz ve bunu yapmak için asla harcama yetkisini teslim etmezsiniz.

## Özet

Bir görüntüleme anahtarı, korumalı bir Zcash adresinin veya hesabının faaliyetlerine **salt okunur** erişim verir: ona sahip olan kişi gelen (ve tam görüntüleme anahtarları için giden) işlemleri görebilir, ancak asla harcama yapamaz.

- **Nedir:** shielded havuzların seçici açıklama aracı. [ZIP 310](https://zips.z.cash/zip-0310)'da tanıtıldı, Sapling ağ yükseltmesiyle protokole eklendi.
- **Ne sağlar:** yatırımların algılanması (`uivk…` incoming keys) veya bir hesap için tam gelen/giden görünürlüğü (`uview…` unified full viewing keys) ile eski Sapling `zxviews…` anahtarları.
- **Ne sağlamaz:** harcama yetkisi. Viewing key sahibinin yaptığı hiçbir şey fonları hareket ettiremez.
- **Bugün nerede çalışır:** [Zallet](https://github.com/zcash/zallet) içinde dışa/içe aktarma (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) ve Zkool gibi cüzdanlarda salt izleme hesapları; güncel destek matrisi için [Wallets](/using-zcash/wallets) sayfasına bakın.
- **Temel kural:** sorulan soruyu yanıtlayan en dar kapsamlı anahtarı tercih edin ve verilen bir anahtarın geri alınamayacağını unutmayın — yalnızca fonlar taşınarak geçersiz kılınabilir.

---

## Neden viewing key kullanılır?

Electric Coin Company'nin konuyla ilgili yazısı en sık ortaya çıkan durumları sıralar ve bunlar bugün de yaygın olanlardır:

- **Yatırımları izleyen bir borsa.** Borsa, müşterilerin bir shielded adrese yaptığı yatırımları fark edebilmek için internete açık bir algılama düğümüne incoming viewing key yükler; harcama anahtarı ise ağa asla bağlanmayan donanımda kalır.
- **Varlıklarını kanıtlayan bir saklama kuruluşu.** Saklama kuruluşu, her shielded adres için bir denetçiye full viewing key verir. Denetçi bu bakiyeleri kontrol edebilir ve bu adreslere yönelik ve bu adreslerden yapılan geçmiş etkinliği inceleyebilir; başka hiçbir şey yapamaz.
- **Bir karşı taraf hakkında durum tespiti.** Bir borsanın, gelişmiş durum tespiti kapsamında müşterinin shielded geçmişini incelemesi gerektiğinde, fonlar yerine viewing key'i isteyebilir.

## Bir viewing key'in gösterdikleri ve göstermedikleri

Birden fazla anahtar türü vardır ve aralarındaki fark, ne kadarını paylaştığınızı belirler.

| Anahtar | Önek | Sağladığı erişim |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Hesaptaki her havuz için gelen **ve** giden işlemleri görür |
| Unified incoming viewing key (UIVK) | `uivk…` | Hesaptaki her havuz için yalnızca gelen işlemleri görür |
| Sapling extended full viewing key | `zxviews…` | Anahtarın adresleri için gelen ve giden Sapling etkinliğini görür |

Bunların hiçbiri harcama yapamaz. Hepsi önemli olan açıdan kalıcıdır: verdiğiniz bir anahtar geri alınamaz; yalnızca fonları, diğer tarafın anahtarlarına sahip olmadığı bir hesaba taşıyarak geçersiz kılınabilir.

Herhangi bir şey paylaşmadan önce bilmeniz gereken iki açıklama tuzağı vardır.

**Incoming dar kapsamlı anlamına gelmez.** Unified incoming viewing key, hakkında soru sorulan tek bir adrese değil, tüm hesaba kapsamlıdır. Tek bir Sapling adresi için UIVK dışa aktarmak, o hesaptaki her havuzda gelen işlemleri görme yetkisi verir; dolayısıyla adının belirttiği adresten daha fazlasını açığa çıkarır. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) bunu açıkça belirtir.

**Yayınlanmış bir adres, incoming viewing key'ini gelecekteki bir saldırgana zaten açığa çıkarır.** [ZIP 326](https://zips.z.cash/zip-0326), kuantum bilgisayara sahip bir saldırganın, yayınlanmış çeşitlendirilmiş bir adresten incoming viewing key'i elde edebileceğini; bunun nullifier key'i elde etmekten farklı olarak mümkün olduğunu belirtir. Bir adresi yayınlamak bugün viewing key'i yayınlamakla aynı değildir, ancak yeterince uzun bir zaman ufkunda ikisi birbirine yaklaşır.

## Ironwood sonrası viewing key'ler

NU6.3, Ironwood shielded havuzunu tanıttı ve Orchard havuzunu yalnızca harcama yapılabilir hâle getirdi; böylece fonlar zaman içinde birinden diğerine taşınır. Yükseltmenin kendisi için [Ironwood](/zcash-tech/ironwood) ve [Turnike](/zcash-tech/the-turnstile) sayfalarına bakın.

**Ironwood öncesinde verilmiş bir viewing key, geçişten sonra da çalışmaya devam eder.** ZIP 326, bir alıcının ve ona karşılık gelen incoming viewing key'in, bir havuz yerine Orchard *protokolü* kapsamlı olduğunu belirtir: aynı incoming viewing key, hem Orchard havuzu hem de Ironwood havuzu note ciphertext'lerini deneme amaçlı şifre çözer. Zallet bunu bu şekilde uygular; Ironwood note'larını Orchard biçimli olarak tanımlar ve Ironwood note-encryption domain altında hesabın Orchard viewing key'leriyle deneme amaçlı şifrelerini çözer.

Anahtar sahibi veya veren herkes için üç sonuç vardır:

1. **Bakiyeler havuzlar arasında taşınır ve izleyici bunu görür.** [ZIP 318](https://zips.z.cash/zip-0318), geçişi rastgeleleştirilmiş bir takvimde yayınlanan, küçük ve kasıtlı olarak tekdüze Orchard'dan Ironwood'a işlemler dizisi olarak tanımlar; her işlem bir Orchard note harcar ve kanonik birimden bir Ironwood çıktısı üretir. Viewing key ile izleyen bir denetçi, varlıkların tek bir hareketle değil, haftalar boyunca adım adım bir havuzdan diğerine geçtiğini görür. Bir cüzdan, viewing key'lerini kullanarak zincir verilerinden kendi geçiş ilerlemesini yeniden oluşturabilir.
2. **Her geçiş adımı, taşıdığı değeri açığa çıkarır.** Bu, bir turnikeden geçmenin doğasında vardır ve geçişi denetlenebilir kılan da budur. Bakiyeyi kanonik birimlere bölmek, tek bir işlemin Orchard havuzundaki tüm bakiyeyi açığa çıkarmaması anlamına gelir.
3. **Ironwood sonrasında oluşturulan hesaplar anahtarlarını farklı türetebilir.** [ZIP 2005](https://zips.z.cash/zip-2005), kuantumla geri elde edilebilir anahtarlar için bir `use_qsk` bayrağı ekler ve incoming, outgoing ve diversifier anahtarlarının nasıl türetildiğini değiştirir; dolayısıyla `use_qsk = true` anahtarları gerçekten farklı anahtarlardır. ZIP 326, bayrağın bir hesap genelinde tutarlı olmasını zorunlu kılar ve Mainnet'te NU6.3 etkinleşmeden önce `use_qsk = true` anahtarlarının üretilmesini yasaklar. Bu nedenle Ironwood öncesinde var olan bir hesaptan dışa aktarılan anahtar `use_qsk = false` anahtarıdır ve bu hesap için doğru kalmaya devam eder. Bir hesaptan dışa aktarılan anahtarın başka bir hesabı tanımladığını varsaymayın.

## Viewing key dışa aktarma

### Zallet

[Zallet](https://github.com/zcash/zallet), zcashd içindeki cüzdanın yerini alan tam düğüm cüzdanıdır. Viewing key dışa ve içe aktarma **v0.1.0-beta.2 (28 Temmuz 2026)** sürümünde geldi; bu nedenle önce sürümünüzü kontrol edin, daha eski derlemelerde bu yöntemler yoktur. Yöntem adından sonraki her argüman geçerli JSON olmalıdır; bu da string değerlerin kendi çift tırnaklarını koruduğu anlamına gelir. [Zallet Hızlı Başvuru Kılavuzu](/using-zcash/zallet-quick-reference-guide), genel komut biçimini ele alır.

Cüzdanın elinde ne olduğunu listeleyin:

```bash
zallet rpc listaddresses
```

Unified adres geçirerek hesabın unified full viewing key'ini dışa aktarın:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Bunun yerine isteğe bağlı `ivk` argümanını kullanarak hesabın unified incoming viewing key'ini dışa aktarın:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Bir Sapling adresi geçirmek, eski zcashd davranışıyla uyumlu olarak o hesabın Sapling extended full viewing key'ini (`zxviews…`) döndürür. Belgelenmiş iki sınır vardır: Sprout adresleri reddedilir ve cüzdan bunu yeniden oluşturamadığı için, kendisi yalnızca görüntüleme amacıyla içe aktarılmış bir hesaptan Sapling extended full viewing key dışa aktarılamaz. `ivk` biçimi ise içe aktarılmış yalnızca görüntüleme hesaplarında çalışır.

### Kendi arayüzlerinden viewing key dışa aktaran cüzdanlar

[Cüzdanlar](/using-zcash/wallets) sayfası, her cüzdan için viewing key desteğini ve Ironwood hazırlığını takip eder. Yazının yazıldığı sırada hem viewing key desteğini hem de **Ironwood: Ready** durumunu listeleyen cüzdanlar ZODL, Zingo!, Zkool, Cake, Zallet, zecd ve Nozy'yi içerir. Hazırlık durumu değiştiğinden, herhangi bir tek cüzdana güvenmeden önce bu sayfayı kontrol edin.

## Viewing key'i yalnızca izleme hesabı olarak içe aktarma

### Zkool

[Zkool](https://github.com/hhanh00/zkool2), legacy anahtarların yanı sıra unified anahtarları da kabul ettiği için burada en esnek seçenektir. README dosyası, zcashd'den dışa aktarılan legacy shielded extended anahtarların yanında **unified viewing key** veya **Sapling extended viewing key** ile oluşturulan yalnızca görüntüleme hesaplarını belgeler. Yeni bir hesap ekleyin, yalnızca görüntüleme yolunu seçin ve `uview…` veya `zxviews…` anahtarını yapıştırın; hesap daha sonra senkronize olur ve harcama yetkisi olmadan bakiyeleri ve geçmişi raporlar.

Ironwood protokol desteği ve Orchard'dan Ironwood'a geçiş Zkool 6.24.0'da (20 Temmuz 2026) geldi; 6.26.1 (2 Ağustos 2026) ise mempool'daki Ironwood işlem algılamasını düzeltti. 6.26.1 veya daha yeni bir sürüm kullanın.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

İkinci argüman yeniden tarama politikasıdır: `"whenkeyisnew"` (varsayılan), `"yes"` veya `"no"`. Üçüncüsü, yeniden taramanın başlayacağı blok yüksekliğidir. Zallet, anahtarı yalnızca görüntüleme hesabı olarak içe aktarır ve harcama yetkisi olmadan adresleri için gelen ve giden işlemleri takip eder.

**Zallet yalnızca Sapling extended full viewing key'leri içe aktarır.** Bir `uview…` unified full viewing key'ini dışa aktarabilse de içe aktarmaz. Tüm bir unified hesap için okuma erişimi vermek üzere UFVK'yi Zallet'ten dışa aktarın ve Zkool gibi unified anahtarları kabul eden bir cüzdana içe aktarın.

İçe aktarılan bir anahtarı txid'ler, ücretler ve memolar içeren tam bir işlem geçmişi dosyasına dönüştürmek için [Viewing Key'den İşlem Geçmişi Dışa Aktarma](/guides/viewing-key-transaction-export) sayfasına bakın.

## Neler değişti ve artık neyi aramayı bırakmalısınız

Bu sayfanın eski bir sürümünü veya çevirisini takip ettiyseniz, üç yol artık çalışmıyor.

- **`zcash-cli z_exportviewingkey` ve `z_importviewingkey`.** zcashd, 18 Temmuz 2026'da destek sonu durdurmasına ulaştı ve artık çalışmıyor. Zallet'in aynı adlı yöntemleri bunun yerine geçer; [geçiş kılavuzuna](/guides/migration-guide-zcashd-to-zebrad-zallet) bakın.
- **Ywallet rehberi.** Cüzdanlar sayfası Ywallet'i **Ironwood: Not Ready** olarak işaretler; dolayısıyla Ironwood dönemi viewing key'leri için insanları yönlendireceğiniz cüzdan bu değildir. Aynı geliştiricinin Zkool'u aynı anahtar aralığını kabul eder ve Ready olarak işaretlenmiştir.
- **zcashblockexplorer.com/vk.** Hizmet, geçersiz bir sertifikayla HTTP 503 döndürür ve yerine bir şey konulmadan kaldırılmıştır. Bir viewing key'i web sitesine yapıştırmak, tüm işlem geçmişinizi o web sitesini işleten kişiye verir; bu da eski sayfadaki üç seçeneğin her zaman en zayıfıydı. Bunun yerine anahtarı kendi çalıştırdığınız bir cüzdana içe aktarın.

## Görsel / Analoji

### Denetçinin penceresi

Korumalı bir hesabı bankadaki kasa dairesi gibi düşünün:

- **harcama anahtarı** oda anahtarıdır. Ona sahip olan herkes kutuları açabilir ve içindekileri çıkarabilir.
- **görüntüleme anahtarı**, denetçinin odaya açılan penceresidir. Denetçi her kutunun girişini ve çıkışını izleyebilir, etiketleri okuyabilir ve defter tutabilir — ancak pencerenin kolu yoktur. Odaya bakan kişi içerideki hiçbir şeyi hareket ettiremez.

### Pencerenin gösteremeyecekleri

Pencere, dışarıdaki dünyaya değil odaya bakar. İzlenen hesabın korumalı faaliyetlerini gösterir; izleyeni blockchain genelinde bir gözlemciye dönüştürmez ve izleyenin hesabın faaliyetlerini başkasının korumasız geçmişiyle ilişkilendirmesine izin vermez. Pencere hesap düzeyinde kurulduğu için, birine tek bir emanet kasası (tek bir adres) için gözetleme deliği vermek yine de ona tüm odanın gelen görünümünü sunar — en dar anahtar kuralının var olmasının nedeni tam olarak budur.

### Pencereyi neden geri alamazsınız

Bir Viewing Key, bir izin girdisi değil, bir bilgi parçasıdır. Kopyalandıktan sonra, izlediği hesaptan fonlar ayrılana kadar varlığını sürdürür. Pratik çözüm rotasyondur: bakiyeleri, anahtarlarını karşı tarafın hiç edinmediği yeni bir hesaba taşırsınız ve eski pencere boş bir odaya bakar.

## Derinlemesine İnceleme

### Deneme şifre çözme: görüntülemenin gerçekte nasıl çalıştığı

Her korumalı işlem, not açık metinlerini amaçlanan alıcı için şifreler. Görüntüleme anahtarına sahip bir cüzdan **deneme şifre çözme** gerçekleştirir: zincirde bulduğu her işlem için, anahtarla not şifreli metinlerini çözmeye çalışır. Eşleşmeler notun değerini, alıcı çeşitlendiricisini ve notunu ortaya çıkarır; eşleşmemelerin maliyeti yoktur. Bu nedenle aynı gelen görüntüleme anahtarı Orchard ve Ironwood havuzları arasında çalışmaya devam eder — [ZIP 326](https://zips.z.cash/zip-0326), bir alıcıyı Orchard *protokolüne* kapsamlar; dolayısıyla Ironwood not şifreli metinleri Orchard biçimindedir ve Ironwood not şifreleme alanı altında hesabın Orchard görüntüleme anahtarlarıyla deneme şifre çözme uygulanır.

### Tam ve gelen: hangi türetmenin karar verdiği

**Tam** bir viewing key, giden görüntüleme yeteneğini türetebilir; bu da bir denetçinin işlem şifresi çözüldüğünde transferin *gönderen* tarafını yeniden oluşturmasını sağlar. **Gelen** bir viewing key ise kasıtlı olarak sınırlıdır: gelen notları tespit eder ve şifrelerini çözer, ancak giden bağlantıyı yeniden oluşturamaz. Bu yetenekler arasındaki türetme tek yönlüdür — gelen anahtar tam anahtardan türetilir, asla tersi olmaz — bu da "yalnızca gelen"in bir vaat yerine gerçek bir kısıtlama olmasını sağlar. [ZIP 2005](https://zips.z.cash/zip-2005)'ten gelen `use_qsk` bayrağı, türetmenin kendisini değiştirir; dolayısıyla kuantumla kurtarılabilir anahtarlar, eskisinin bir varyantı değil, tamamen farklı bir anahtar ailesidir.

### Geçiş bir görüntüleyiciye nasıl görünür

[ZIP 318](https://zips.z.cash/zip-0318) geçişi, küçük ve eşit Orchard-Ironwood işlemlerinden oluşan rastgeleleştirilmiş bir dizi olduğundan, anahtarı elinde bulunduran bir gözlemci tek bir sıçrama yerine standart birim değerlerde birçok basamağı olan bir merdiven görür. Hiçbir tek basamak, taşınan toplam bakiyeyi ortaya çıkarmaz; ancak *örüntü* tanınabilir niteliktedir — denetlenebilir bir turnikenin amaçlanan ödünleşimi de budur.

## Pratik Etkiler

- **Borsalar ve ödeme işlemcileri için:** hesabın incoming viewing key'ini (veya tam kapsam için UFVK'yi) bir tespit düğümüne yükleyin ve müşteri yatırmalarını şeffaf bir adresle yapacağınız gibi otomatik olarak mutabık hâle getirin — ancak müşterinin harcama anahtarı hiçbir zaman soğuk depolamadan çıkmaz.
- **Denetçiler ve rezerv kanıtları için:** bir full viewing key, "bize güvenin" ifadesini "bunu doğrulayın"a dönüştürür: izlenen hesapların bakiyeleri ve eksiksiz işlem geçmişi, onlara dokunma imkânı olmadan. Tek bir ödemeye ilişkin tek seferlik kanıtlar için [Ödeme açıklamalarını](/zcash-tech/payment-disclosures) kullanın.
- **Durum tespiti için:** karşı tarafa tüm cüzdanınızın değil, işlemle ilgili hesabın anahtarını verin. İlişki sona ererse hesabı değiştirerek yeni anahtar oluşturun.
- **Araç seçimi için:** Zallet UFVK'leri dışa aktarır ve Sapling extended full viewing key'leri içe aktarır; Zkool birleşik ve eski anahtarları salt izleme hesapları olarak kabul eder. Bir cüzdanı standartlaştırmadan önce güncel Ironwood hazırlık matrisi için [Cüzdanlar](/using-zcash/wallets) sayfasını kontrol edin.
- **Açıklamanın maliyeti kalıcıdır:** bir anahtarın her ek sahibi, kapatamayacağınız kalıcı bir gizlilik kredi hattıdır. Anahtarları ilişki başına verin, tek bir hesapla sınırlayın ve kimin neyi tuttuğunu belgelendirin.

## Yaygın Hatalar

| Yaygın inanış | Aslında durum nedir |
| --- | --- |
| "Bir görüntüleme anahtarı sızarsa fonları harcayabilir." | Harcayamaz. Görüntüleme anahtarları harcama yetkisi taşımaz; sızıntının yapabileceği en kötü şey geçmişi açığa çıkarmaktır. |
| "Bir görüntüleme anahtarını daha sonra iptal edebilirim." | Edemezsiniz. Verilmiş bir anahtar, fonlar diğer tarafın anahtarlarına sahip olmadığı bir hesaba taşınana kadar çalışır. |
| "Tek bir adres için UIVK dışa aktarmak yalnızca o adresi gösterir." | Görüntüleme anahtarları hesap kapsamındadır. Bir UIVK, hesaptaki her havuz için gelen etkinliği gösterir. |
| "`zcash-cli z_exportviewingkey` hâlâ çalışıyor." | Hayır. zcashd, 18 Temmuz 2026'da destek sonu durdurmasına ulaştı; bunun yerine Zallet'nin `z_exportviewingkey` / `z_importviewingkey` seçeneklerini kullanın. |
| "Bir görüntüleme anahtarını bir web aracına yapıştırmak güvenlidir çünkü salt okunurdur." | Salt okunur olması, o hesaba ait tüm işlem geçmişinizin siteyi işleten kişiye verildiği anlamına gelir. Anahtarı kendi çalıştırdığınız bir cüzdana içe aktarın. |
| "Zallet, Zallet'nın dışa aktarabildiği herhangi bir görüntüleme anahtarını içe aktarabilir." | Hayır. Zallet yalnızca Sapling genişletilmiş tam görüntüleme anahtarlarını içe aktarır; birleşik `uview…` anahtarları, Zkool gibi birleşik anahtarları kabul eden cüzdanlara aktarılmalıdır. |

## İlgili Sayfalar

- [Ödeme Açıklamaları](/zcash-tech/payment-disclosures) — bir hesaba sürekli erişim vermeden tek bir ödemenin seçilmiş ayrıntılarını kanıtlama
- [Birleşik Adresler](/zcash-tech/unified-addresses) — görüntüleme anahtarı alıcılarını taşıyan adres katmanı
- [Ironwood](/zcash-tech/ironwood) — Orchard’in geçiş yaptığı NU6.3 korumalı havuz
- [Turnike](/zcash-tech/the-turnstile) — izleyicilerin takip edebileceği Orchard’den Ironwood’ye geçiş mekanizması
- [Cüzdanlar](/using-zcash/wallets) — cüzdanların, görüntüleme anahtarı desteğinin ve Ironwood hazırlığının tam dizini
- [Bir Viewing Key’dan İşlem Geçmişini Dışa Aktarma](/guides/viewing-key-transaction-export) — içe aktarılan bir anahtarı eksiksiz bir txid/ücret/not geçmişi dosyasına dönüştürme

## Kaynaklar

Viewing key'leri gerektiği kadar kullanın ve sorulan soruyu yanıtlayan en dar kapsamlı anahtarı tercih edin.

- [Ödeme açıklamaları](/zcash-tech/payment-disclosures) - bir hesaba sürekli erişim vermeden tek bir ödemenin seçilmiş ayrıntılarını kanıtlama
- [ZIP 326: NU6.3 Cüzdanlar için Sonuçlar](https://zips.z.cash/zip-0326) — görüntüleme anahtarlarının Orchard ve Ironwood havuzları arasında nasıl davrandığı
- [ZIP 229: Sürüm 6 İşlem Biçimi](https://zips.z.cash/zip-0229) — Orchard ve Ironwood havuzlarını tanımlar
- [ZIP 310](https://zips.z.cash/zip-0310) — görüntüleme anahtarı spesifikasyonu
- [Zallet değişiklik günlüğü](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — hangi sürümün hangi RPC yöntemini eklediği
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — desteklenen hesap ve anahtar türleri
- [ECC, Görüntüleme Anahtarlarının Açıklaması](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Seçici Açıklama ve Görüntüleme Anahtarları](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Sunumu](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
