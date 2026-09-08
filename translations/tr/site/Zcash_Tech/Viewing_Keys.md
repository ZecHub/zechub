<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Viewing Keys

Shielded adresler, Zcash blokzincirinde mümkün olduğunca az bilgi açığa çıkararak işlem yapmanıza olanak tanır. Peki, elinizde ne olduğunu veya ne gönderdiğinizi belirli bir tarafa *göstermeniz* gerektiğinde ne olur? Her shielded adresin, harcama yetkisi vermeden okuma erişimi sağlayan bir görüntüleme anahtarı vardır. Viewing key'ler [ZIP 310](https://zips.z.cash/zip-0310) ile tanıtıldı ve Sapling ağ yükseltmesinde protokole eklendi.

Bir görüntüleme anahtarı seçici ifşanın aracıdır: neyi kimin göreceğini siz seçersiniz ve bunu yapmak için asla harcama yetkisini devretmezsiniz.

## Neden bir görüntüleme anahtarı kullanılır?

Electric Coin Company'nin bu konudaki yazısı en sık karşılaşılan durumları ortaya koyar ve bunlar bugün de hâlâ en yaygın olanlardır:

- **Yatırmaları izleyen bir borsa.** Borsa, müşterilerin shielded bir adrese yaptığı yatırmaları fark edebilmek için internete açık bir tespit düğümüne bir incoming viewing key yükler; harcama anahtarı ise ağa hiç dokunmayan donanımda kalır.
- **Varlıklarını kanıtlayan bir saklayıcı.** Saklayıcı, her shielded adres için bir denetçiye bir full viewing key verir. Denetçi bu bakiyeleri kontrol edebilir, bu adreslere gelen ve giden geçmiş etkinliği inceleyebilir ve bunun dışında hiçbir şey yapamaz.
- **Karşı taraf üzerinde durum tespiti.** Bir borsanın geliştirilmiş durum tespiti kapsamında bir müşterinin shielded geçmişini incelemesi gerektiğinde, fonları istemek yerine görüntüleme anahtarını isteyebilir.

## Bir görüntüleme anahtarının neyi gösterdiği ve neyi göstermediği

Birden fazla anahtar türü vardır ve ne kadarını ifşa ettiğinizi aralarındaki fark belirler.

| Anahtar | Önek | Sağladığı yetki |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Hesaptaki her havuz için gelen **ve** giden işlemleri görür |
| Unified incoming viewing key (UIVK) | `uivk…` | Hesaptaki her havuz için yalnızca gelen işlemleri görür |
| Sapling extended full viewing key | `zxviews…` | Anahtarın adresleri için gelen ve giden Sapling etkinliğini görür |

Bunların hiçbiri harcama yapamaz. Hepsi önemli olan açıdan kalıcıdır: dağıttığınız bir anahtar geri alınamaz; yalnızca, karşı tarafın anahtarlarına sahip olmadığı bir hesaba fon taşıyarak geride bırakılabilir.

Bir şey paylaşmadan önce bilinmeye değer iki ifşa tuzağı vardır.

**Incoming dar kapsamlı demek değildir.** Bir unified incoming viewing key, size sorulan tek bir adrese değil, hesabın tamamına kapsamlıdır. Tek bir Sapling adresi için UIVK dışa aktarmak bile o hesaptaki her havuz genelinde gelen görünürlüğü verir; dolayısıyla adını taşıdığı adresten daha fazlasını ifşa eder. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) bunu açıkça belirtir.

**Yayımlanmış bir adres, gelecekteki bir saldırgana incoming viewing key'ini zaten açığa çıkarır.** [ZIP 326](https://zips.z.cash/zip-0326), kuantum bilgisayara sahip bir saldırganın yayımlanmış çeşitlendirilmiş bir adresten incoming viewing key'i kurtarabileceğini; bunun da nullifier anahtarını kurtarmaya göre uygulanabilir olduğunu belirtir. Bugün bir adres yayımlamak, bir görüntüleme anahtarı yayımlamakla aynı şey değildir, ancak yeterince uzun bir zaman ufkunda bu ikisi birbirine daha çok yaklaşır.

## Ironwood sonrasında görüntüleme anahtarları

NU6.3, Ironwood shielded havuzunu tanıttı ve Orchard havuzunu yalnızca harcamaya açık hâle getirdi; böylece fonlar zamanla birinden diğerine göç eder. Yükseltmenin kendisi için [Ironwood](/zcash-tech/ironwood) ve [The turnstile](/zcash-tech/the-turnstile) sayfalarına bakın.

**Ironwood öncesinde verilmiş bir görüntüleme anahtarı, göçten sonra da çalışmaya devam eder.** ZIP 326, bir alıcının ve buna karşılık gelen incoming viewing key'in bir havuza değil Orchard *protokolüne* kapsamlı olduğunu belirtir: aynı incoming viewing key hem Orchard-havuzu hem de Ironwood-havuzu note şifreli metinlerinde deneme amaçlı çözümleme yapar. Zallet bunu bu şekilde uygular; Ironwood note'larını Orchard biçimli olarak tanımlar ve bunları Ironwood note-şifreleme alanı altında hesabın Orchard görüntüleme anahtarlarıyla deneme amaçlı çözer.

Bir anahtarı elinde bulunduran veya veren herkes için üç sonuç vardır:

1. **Bakiyeler havuzlar arasında hareket eder ve görüntüleyen kişi bunun gerçekleştiğini görür.** [ZIP 318](https://zips.z.cash/zip-0318), göçü rastgeleleştirilmiş bir takvimde yayımlanan, küçük ve kasıtlı olarak tek tip Orchard'dan Ironwood'a işlemler dizisi olarak tanımlar; her biri bir Orchard note'unu harcar ve standart bir değerde bir Ironwood çıktısı üretir. Bir denetçi, görüntüleme anahtarıyla bakarken varlıkların tek seferde değil, haftalar boyunca adım adım bir havuzdan diğerine kaydığını görür. Bir cüzdan, görüntüleme anahtarlarını kullanarak zincir verilerinden kendi göç ilerlemesini yeniden oluşturabilir.
2. **Her göç adımı, taşıdığı değeri açığa çıkarır.** Bu, bir turnstile'dan geçmenin doğasında vardır ve göçü denetlenebilir yapan da budur. Bakiyeyi standart değerlere bölmek, tek bir işlemin tüm Orchard-havuzu bakiyesini açığa çıkarmaması anlamına gelir.
3. **Ironwood sonrasında oluşturulan hesaplar anahtarlarını farklı türetebilir.** [ZIP 2005](https://zips.z.cash/zip-2005), kuantumla kurtarılabilir anahtarlar için bir `use_qsk` bayrağı ekler ve incoming, outgoing ve diversifier anahtarlarının nasıl türetildiğini değiştirir; dolayısıyla `use_qsk = true` anahtarları gerçekten farklı anahtarlardır. ZIP 326, bayrağın bir hesap genelinde tek tip olmasını zorunlu kılar ve Mainnet'te NU6.3 etkinleşmeden önce `use_qsk = true` anahtarları üretmeyi yasaklar. Bu nedenle Ironwood'dan önce var olan bir hesaptan dışa aktarılan anahtar, bir `use_qsk = false` anahtarıdır ve o hesap için doğru kalır. Bir hesaptan dışa aktarılan bir anahtarın başka bir hesabı tanımladığını varsaymayın.

## Bir görüntüleme anahtarını dışa aktarma

### Zallet

[Zallet](https://github.com/zcash/zallet), zcashd içindeki cüzdanın yerini alan full-node cüzdandır. Görüntüleme anahtarı dışa aktarma ve içe aktarma **v0.1.0-beta.2 (28 Temmuz 2026)** sürümünde geldi; bu yüzden önce sürümünüzü kontrol edin, daha eski derlemelerde bu yöntemler yoktur. Yöntem adından sonra gelen her argüman geçerli JSON olmalıdır; bu da string değerlerin kendi çift tırnaklarını koruduğu anlamına gelir. [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide), genel komut biçimini kapsar.

Cüzdanın neleri tuttuğunu listeleyin:

```bash
zallet rpc listaddresses
```

Bir unified address geçirerek hesabın unified full viewing key'ini dışa aktarın:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

İsteğe bağlı `ivk` argümanını kullanarak bunun yerine hesabın unified incoming viewing key'ini dışa aktarın:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Bir Sapling adresi geçirmek, eski zcashd davranışıyla uyumlu olarak o hesabın Sapling extended full viewing key'ini (`zxviews…`) döndürür. Belgelenmiş iki sınır vardır: Sprout adresleri reddedilir ve kendisi view-only olarak içe aktarılmış bir hesaptan Sapling extended full viewing key dışa aktarılamaz, çünkü cüzdan bunu yeniden oluşturamaz. `ivk` biçimi, içe aktarılmış view-only hesaplarda çalışır.

### Kendi arayüzünden görüntüleme anahtarı dışa aktaran cüzdanlar

[Cüzdanlar](/using-zcash/wallets) sayfası, her cüzdan için görüntüleme anahtarı desteğini ve Ironwood hazırlığını izler. Yazının yazıldığı sırada hem görüntüleme anahtarı desteğini hem de **Ironwood: Ready** durumunu listeleyen cüzdanlar ZODL, Zingo!, Zkool, Cake, Zallet, Zecd ve Nozy'dir. Hazırlık durumu değiştiği için, herhangi bir tek cüzdana güvenmeden önce bu sayfayı kontrol edin.

## Bir görüntüleme anahtarını watch-only hesap olarak içe aktarma

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) burada en esnek seçenektir, çünkü legacy anahtarların yanı sıra unified anahtarları da kabul eder. README'si, zcashd'den dışa aktarılan legacy shielded extended anahtarların yanında, bir **unified viewing key** veya bir **Sapling extended viewing key** ile oluşturulan view-only hesapları belgelendirir. Yeni bir hesap ekleyin, view-only yolunu seçin ve `uview…` veya `zxviews…` anahtarını yapıştırın; hesap daha sonra eşzamanlanır ve harcama yetkisi olmadan bakiyeleri ve geçmişi bildirir.

Ironwood protokol desteği ve Orchard'dan Ironwood'a göç, Zkool 6.24.0'da (20 Temmuz 2026) geldi; 6.26.1 (2 Ağustos 2026) ise mempool'da Ironwood işlem tespitini düzeltti. 6.26.1 veya daha yenisini çalıştırın.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

İkinci argüman yeniden tarama ilkesidir: `"whenkeyisnew"` (varsayılan), `"yes"` veya `"no"`. Üçüncüsü ise yeniden taramanın başlayacağı blok yüksekliğidir. Zallet, anahtarı bir view-only hesap olarak içe aktarır ve harcama yetkisi olmadan adresleri için gelen ve giden işlemleri izler.

**Zallet yalnızca Sapling extended full viewing key'leri içe aktarır.** Bir `uview…` unified full viewing key'i içe aktarmayacaktır; bunu dışa aktarabiliyor olsa bile. Tüm unified hesap için okuma erişimi devretmek istiyorsanız, UFVK'yi Zallet'ten dışa aktarın ve bunu Zkool gibi unified anahtarları kabul eden bir cüzdana içe aktarın.

## Neler değişti ve artık neyi aramayı bırakmalısınız

Bu sayfanın daha eski bir sürümünü veya bir çevirisini takip ettiyseniz, üç yol artık çalışmıyor.

- **`zcash-cli z_exportviewingkey` ve `z_importviewingkey`.** zcashd, destek sonu duruşuna 18 Temmuz 2026'da ulaştı ve artık çalışmıyor. Yerine geçen şey Zallet'in aynı adlı yöntemleridir; bkz. [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet anlatımı.** Cüzdanlar sayfası Ywallet'i **Ironwood: Not Ready** olarak işaretliyor; dolayısıyla Ironwood dönemi görüntüleme anahtarları için insanları yönlendireceğiniz cüzdan bu değildir. Aynı geliştiricinin ürünü olan Zkool, aynı anahtar aralığını kabul eder ve Ready olarak işaretlidir.
- **zcashblockexplorer.com/vk.** Hizmet geçersiz sertifikayla HTTP 503 döndürüyor ve değiştirilmek yerine kaldırıldı. Bir görüntüleme anahtarını bir web sitesine yapıştırmak, tüm işlem geçmişinizi o siteyi işleten kişiye vermek anlamına gelir; bu da eski sayfadaki üç seçeneğin her zaman en zayıfıydı. Bunun yerine anahtarı kendi çalıştırdığınız bir cüzdana içe aktarın.

## Kaynaklar

Görüntüleme anahtarlarını ihtiyaç oldukça kullanın ve sorulan soruya yanıt veren en dar kapsamlı anahtarı tercih edin.

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — görüntüleme anahtarlarının Orchard ve Ironwood havuzları arasında nasıl davrandığı
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard ve Ironwood havuzlarını tanımlar
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — hangi sürümün hangi RPC yöntemini eklediği
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — desteklenen hesap ve anahtar türleri
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
