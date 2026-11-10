<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Giden Görüntüleme Anahtarları (OVK'ler)

Giden görüntüleme anahtarı (OVK), yalnızca korumalı bir çıktının *giden* şifreli metnini şifrelemek için kullanılan 32 baytlık bir değerdir. Bir tarafın, fon harcama veya gelen notları görme yetkisi olmadan gönderilen notun düz metnini (alıcı adresi, değer ve not) geri almasını sağlar.

Alıcı, gelen notun şifresini her zaman kendi gelen görüntüleme anahtarıyla çözer. OVK seçimi alıcının gördüklerini değiştirmez. Ham bir OVK için standart bir kodlama yoktur; yalnızca 32 bayttır.

## Kısaca

- Bir OVK yalnızca korumalı bir ödemenin giden düz metnini kimin geri alabileceğini kontrol eder.
- Cüzdanlar üç politika arasından seçim yapar: **Gönderen** (hesabın UFVK'siyle normal kurtarma), **Özel** (sağladığınız bir anahtarla kurtarma) veya **Discard** (hiç kimse giden düz metni zincirden geri alamaz).
- Discard veya özel bir OVK kullanılsa bile, bir UFVK sahibi hangi notların harcandığını görmeye ve hesaptan çıkan net tutarı hesaplamaya devam eder.
- Bir tutarı belirli bir UFVK'den gizli tutmanın tek güvenilir yolu, notların hiçbir zaman o hesaba ait olmamasını sağlamaktır (ayrı hesap veya ayrı cüzdan).
- Üç politikanın tümü zaten `zcash_client_backend` içinde bulunmaktadır; günümüzde neredeyse her cüzdan yalnızca varsayılan Gönderen politikasını kullanır.

---

## Üç politika

`zcash_client_backend` üzerine kurulu cüzdanlar, bir işlem oluştururken bir `OvkPolicy` seçer:

| Politika | Giden şifreli metinler | Giden düz metni daha sonra kim geri alabilir |
|--------|----------------------|----------------------------------------------|
| **Gönderen** (varsayılan) | Hesabın normal OVK'sine şifrelenir | Gönderen hesabın Birleşik Full Viewing Key'si |
| **Özel** | Sağladığınız anahtar(lar)a şifrelenir | Sağlanan anahtar(lar)ı elinde tutan kişi |
| **Discard** | OVK kullanılmaz (`ovk = ⊥`) | Hiç kimse (gönderen bile değil) |

Kolaylık sağlayan bir kurucu, hem harici hem de dahili OVK'nin aynı anahtar olması için tek bir 32 baytlık değerden bir `Custom` politikası oluşturur.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

[OvkPolicy belgelerine](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) ve [ZIP 310](https://zips.z.cash/zip-0310)'a bakın.

## Her politikanın kullanım amacı

**Gönderen**, normal cüzdan davranışıdır. İşlem madenciliği yapıldıktan sonra, hesabın UFVK'sini elinde tutan herkes giden şifreli metinlerin şifresini çözebilir ve alıcı adreslerini, tutarları ve notları geri alabilir.

**Özel**, üçüncü bir tarafa (denetçi, ödeme işleyicisi, makbuz sistemi veya ayrı bir cihaz) tam görüntüleme anahtarını vermeden belirli giden ödemelerin şifresini çözme yetkisi vermenizi sağlar. İşlemden sonra attığınız geçici bir anahtar da kullanabilir veya tek bir anahtarın her giden ödemeyi görmemesi için farklı karşı taraflar için farklı anahtarlar kullanabilirsiniz.

**Discard**, gönderen cüzdanın giden düz metni zincirden geri alamayacağı anlamına gelir. Bu, UFVK'nin daha sonra ele geçirilmesi durumunda geri alınabilir olanları en aza indirmek istediğinizde veya kasıtlı olarak hesabın OVK'sinin açabileceği zincir üstü bir kayıt istemediğinizde kullanışlıdır.

## Bir UFVK sahibinin yine de gördükleri

Discard veya özel bir OVK kullanılsa bile, hesabın UFVK'sini elinde tutan kişi şunları yapabilir:

- Hesabın hangi notlarının harcandığını tespit edebilir (nullifier'lar aracılığıyla).
- Bu girdi notlarının değerlerini bilir.
- Herhangi bir para üstü notunu geri alabilir (bunlar OVK'ye değil, dahili gelen görüntüleme anahtarına şifrelenir).
- Dolayısıyla hesaptan çıkan net tutarı hesaplayabilir.

Görünür olmayanlar, tekil alıcı adresleri, tutarın nasıl bölündüğü ve notlardır. `WalletWrite` belgeleri, Discard (veya rastgele bir özel OVK) altında oluşturulan işlemlere ilişkin verilerin yerel kayıt kaybolursa zincir verilerinden geri alınamayacağı konusunda uyarır.

## Tutarları belirli bir UFVK'den uzak tutmak

`OvkPolicy` yalnızca giden düz metnin geri alınmasını kontrol eder. Harcamaları veya net tutarları hesabın kendi UFVK'sinden gizlemez.

Bir tutarı belirli bir UFVK'nin görememesini sağlamanın tek güvenilir yolu, o tutarı taşıyan notların UFVK'nin kontrol ettiği hesaba hiçbir zaman ait olmamasını sağlamaktır:

1. **Ayrı ZIP-32 hesapları** (aynı seed) — Yeni bir hesap dizini oluşturun, fonları buraya taşıyın ve bu hesabın UFVK'sini asla dışa aktarmayın. Orijinal hesabın UFVK'si yalnızca yeni hesaba yapılan transferi görür.
2. **Tamamen ayrı cüzdan** (farklı seed) — Yeni bir cüzdanı fonlayın, ondan harcama yapın ve seed'i veya UFVK'yi atın. Orijinal cüzdan yalnızca fonlama transferini kaydeder.
3. **Geçici tek kullanımlık cüzdanlar** — Yukarıdakiyle aynıdır, ancak harcama cüzdanını tek kullanımlık kabul edin.

Bir UFVK hesap başınadır. Bu hesapta hiç bulunmamış notlar, hesabın bakiyesinde veya çıkış toplamlarında asla görünmez.

## Cüzdanlar politikaları bugün nasıl kullanıyor

Üretimdeki neredeyse her cüzdan yalnızca varsayılan **Gönderen** politikasını kullanır; dolayısıyla tam giden geçmiş UFVK'den geri alınabilir. Diğer iki politika kütüphanede mevcuttur ancak kullanıcı arayüzlerinde nadiren sunulur.

Olası gelecekteki seçenekler şunlardır:

- Kullanıcının tek bir ödeme için Özel veya Discard seçmesini sağlayan işlem başına bir işaret.
- Kalıcı bir Discard modu (seed geri yükleme bu durumda yalnızca net çıkışları gösterir).
- Tekil ödemelerin seçici olarak açıklanması için özel OVK'ler (tam bir [ZIP 311](https://zips.z.cash/zip-0311) ödeme açıklamasından daha hafiftir).
- Daha güçlü yalıtım için hesap veya cüzdan ayrımını sürdürme.

## Kaynaklar

- [ZIP 310: Sapling Görüntüleme Anahtarlarının Güvenlik Özellikleri](https://zips.z.cash/zip-0310)
- [ZIP 316: Birleşik Adresler ve Birleşik Görüntüleme Anahtarları](https://zips.z.cash/zip-0316)
- [ZIP 315: Cüzdan Uygulamaları için En İyi Uygulamalar](https://zips.z.cash/zip-0315)
- [OvkPolicy zcash_client_backend içindeki](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## İlgili sayfalar

- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys)
- [Ödeme Açıklamaları](/zcash-tech/payment-disclosures)
- [Birleşik Adresler](/zcash-tech/unified-addresses)
- [Bir Blok Gezgini Ne Görebilir](/zcash-tech/what-a-block-explorer-can-see)
