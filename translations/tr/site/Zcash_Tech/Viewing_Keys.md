<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key'ler

Shielded adresler, Zcash blokzincirinde mümkün olduğunca az bilgi açığa çıkararak işlem yapmanızı sağlar. Peki *gerçekten* belirli bir tarafa neye sahip olduğunuzu veya ne gönderdiğinizi göstermeniz gerektiğinde ne olur? Her shielded adresin, harcama yetkisi vermeden okuma erişimi tanıyan bir viewing key'i vardır. Viewing key'ler [ZIP 310](https://zips.z.cash/zip-0310) ile tanıtıldı ve Sapling ağ yükseltmesinde protokole eklendi.

Viewing key, seçici açıklama aracıdır: kimin neyi göreceğini siz seçersiniz ve bunu yapmak için asla harcama yetkisini teslim etmezsiniz.

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

[Cüzdanlar](/using-zcash/wallets) sayfası, her cüzdan için viewing key desteğini ve Ironwood hazırlığını takip eder. Yazının yazıldığı sırada hem viewing key desteğini hem de **Ironwood: Ready** durumunu listeleyen cüzdanlar ZODL, Zingo!, Zkool, Cake, Zallet, Zecd ve Nozy'yi içerir. Hazırlık durumu değiştiğinden, herhangi bir tek cüzdana güvenmeden önce bu sayfayı kontrol edin.

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

## Kaynaklar

Viewing key'leri gerektiği kadar kullanın ve sorulan soruyu yanıtlayan en dar kapsamlı anahtarı tercih edin.

- [Ödeme açıklamaları](/zcash-tech/payment-disclosures) - bir hesaba sürekli erişim izni vermeden tek bir ödemenin seçilen ayrıntılarını kanıtlama
- [ZIP 326: NU6.3 Cüzdanlar için Sonuçlar](https://zips.z.cash/zip-0326) — görüntüleme anahtarlarının Orchard ve Ironwood havuzları arasında nasıl davrandığı
- [ZIP 229: Sürüm 6 İşlem Biçimi](https://zips.z.cash/zip-0229) — Orchard ve Ironwood havuzlarını tanımlar
- [Zallet değişiklik günlüğü](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — hangi sürümün hangi RPC yöntemini eklediği
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — desteklenen hesap ve anahtar türleri
- [ECC, Viewing Keys'i Açıklamak](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Seçici Açıklama ve Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Sunumu](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
