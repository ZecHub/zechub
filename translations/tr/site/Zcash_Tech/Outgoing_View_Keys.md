<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Giden Görüntüleme Anahtarları (OVK'ler)

Giden görüntüleme anahtarı (outgoing viewing key, OVK), korumalı bir çıktının *giden* şifreli metnini şifrelemek için kullanılan, yalnızca bu amaçla kullanılan 32 baytlık bir değerdir. Bir tarafın, fonları harcama veya gelen notları görme olanağı olmadan gönderilen note'un açık metnini (alıcı adresi, değer ve memo) kurtarmasını sağlar.

Alıcı, gelen note'u her zaman kendi gelen görüntüleme anahtarıyla çözer. OVK seçimi, alıcının gördüklerini değiştirmez. Ham bir OVK için standart bir kodlama yoktur; yalnızca 32 bayttan oluşur.

## Kısaca

- Bir OVK, korumalı bir ödemenin giden açık metnini kimin kurtarabileceğini belirler.
- Cüzdanlar üç politikadan birini seçer: **Gönderici** (hesabın UFVK'siyle olağan kurtarma), **Özel** (sağladığınız bir anahtarla kurtarma) veya **Discard** (hiç kimse Zincir'den giden açık metni kurtaramaz).
- Discard veya özel bir OVK kullanılsa bile, UFVK sahibi hangi note'ların harcandığını görür ve hesaptan çıkan net tutarı hesaplayabilir.
- Belirli bir UFVK'den bir tutarı gizli tutmanın tek güvenilir yolu, note'ların hiçbir zaman o hesaba ait olmamasını sağlamaktır (ayrı bir hesap veya ayrı bir cüzdan).
- Üç politika da `zcash_client_backend` içinde mevcuttur; günümüzde neredeyse tüm cüzdanlar yalnızca varsayılan Gönderici politikasını kullanır.

---

## Üç politika

`zcash_client_backend` üzerine kurulu cüzdanlar, bir işlem oluştururken bir `OvkPolicy` seçer:

| Politika | Giden şifreli metinler | Giden açık metni daha sonra kim kurtarabilir |
|--------|----------------------|----------------------------------------------|
| **Gönderici** (varsayılan) | Hesabın olağan OVK'siyle şifrelenir | Gönderen hesabın Birleşik Full Viewing Key |
| **Özel** | Sağladığınız anahtar(lar)la şifrelenir | Sağlanan anahtar(lar)a sahip olan kişi |
| **Discard** | OVK kullanılmaz (`ovk = ⊥`) | Hiç kimse (gönderen bile) |

Bir kolaylık oluşturucusu, hem harici hem de dahili OVK'nin aynı anahtar olması için tek bir 32 baytlık değerden `Custom` politikası oluşturur.

![Outgoing Viewing Key politika karşılaştırması](/content-images/ovk-policies.webp)

[OvkPolicy belgelerine](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) ve [ZIP 310](https://zips.z.cash/zip-0310) sayılı belgeye bakın.

## Her politika ne için kullanılır?

**Gönderici**, olağan cüzdan davranışıdır. İşlem madenciliğe alındıktan sonra, hesabın UFVK'sine sahip olan herkes giden şifreli metinleri çözerek alıcı adreslerini, tutarları ve memoları kurtarabilir.

**Özel**, üçüncü bir tarafa (denetçi, ödeme işlemcisi, makbuz sistemi veya ayrı bir cihaz) tam görüntüleme anahtarını vermeden belirli giden ödemelerin şifresini çözme olanağı sunmanızı sağlar. İşlemden sonra sileceğiniz geçici bir anahtar da kullanabilir veya tek bir anahtarın tüm giden ödemeleri görmemesi için farklı karşı taraflar için farklı anahtarlar kullanabilirsiniz.

**Discard**, gönderen cüzdanın Zincir'den giden açık metni kurtaramayacağı anlamına gelir. UFVK daha sonra ele geçirilirse kurtarılabilecek verileri en aza indirmek istediğinizde veya hesabın OVK'sinin açabileceği zincir üstü bir kayıt olmasını özellikle istemediğinizde bu kullanışlıdır.

## UFVK sahibi neleri görmeye devam eder?

Discard veya özel bir OVK kullanılsa bile, hesabın UFVK'sine sahip olan biri şunları yapabilir:

- Hesabın hangi note'larının harcandığını tespit edebilir (nullifier'lar aracılığıyla).
- Bu girdi note'larının değerlerini öğrenebilir.
- Herhangi bir para üstü note'unu kurtarabilir (bunlar bir OVK'ye değil, dahili gelen görüntüleme anahtarına şifrelenir).
- Dolayısıyla hesaptan çıkan net tutarı hesaplayabilir.

Görünür olmayanlar, tek tek alıcı adresleri, tutarın nasıl bölündüğü ve memolardır. `WalletWrite` belgeleri, Discard altında oluşturulan işlemlere (veya rastgele bir özel OVK'ye) ilişkin verilerin yerel kayıt kaybolursa Zincir verilerinden kurtarılamayacağı konusunda uyarır.

## Tutarları belirli bir UFVK'den gizli tutma

`OvkPolicy` yalnızca giden açık metnin kurtarılmasını kontrol eder. Harcamaları veya net tutarları hesabın kendi UFVK'sinden gizlemez.

Bir tutarın belirli bir UFVK tarafından görülmesini önlemenin tek güvenilir yolu, bu tutarı taşıyan note'ların söz konusu UFVK'nin kontrol ettiği hesaba hiçbir zaman ait olmamasını sağlamaktır:

1. **Ayrı ZIP-32 hesapları** (aynı tohum) — Yeni bir hesap dizini oluşturun, fonları bu hesaba aktarın ve o hesabın UFVK'sini hiçbir zaman dışa aktarmayın. Özgün hesabın UFVK'si yalnızca yeni hesaba yapılan aktarımı görür.
2. **Tamamen ayrı cüzdan** (farklı tohum) — Yeni bir cüzdana fon aktarın, bu cüzdandan harcama yapın ve tohumu veya UFVK'yi silin. Özgün cüzdan yalnızca fonlama aktarımını kaydeder.
3. **Tek kullanımlık geçici cüzdanlar** — Yukarıdakiyle aynıdır; ancak harcama cüzdanını kullan-at olarak değerlendirin.

UFVK hesap başınadır. Bir hesapta hiçbir zaman bulunmamış note'lar, o hesabın bakiyesinde veya çıkış toplamlarında görünmez.

## Cüzdanlar bugün bu politikaları nasıl kullanıyor?

Üretim ortamındaki neredeyse tüm cüzdanlar yalnızca varsayılan **Gönderici** politikasını kullanır; bu nedenle giden işlemlerin tam geçmişi UFVK'den kurtarılabilir. Diğer iki politika kütüphanede mevcuttur, ancak kullanıcı arayüzlerinde nadiren sunulur.

Gelecekte sunulabilecek seçenekler şunlardır:

- Kullanıcının tek bir ödeme için Özel veya Discard seçmesine olanak tanıyan işlem başına bir işaret.
- Kalıcı bir Discard modu (tohum geri yüklendiğinde yalnızca net çıkışlar gösterilir).
- Tek tek ödemelerin seçici açıklaması için özel OVK'ler (tam bir [ZIP 311](https://zips.z.cash/zip-0311) ödeme açıklamasından daha hafif bir yöntem).
- Daha güçlü yalıtım için hesap veya cüzdan ayrımının sürdürülmesi.

## Kaynaklar

- [ZIP 310: Sapling Görüntüleme Anahtarlarının Güvenlik Özellikleri](https://zips.z.cash/zip-0310)
- [ZIP 316: Birleşik Adresler ve Birleşik Görüntüleme Anahtarları](https://zips.z.cash/zip-0316)
- [ZIP 315: Cüzdan Uygulamaları için En İyi Uygulamalar](https://zips.z.cash/zip-0315)
- [OvkPolicy zcash_client_backend içinde](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## İlgili sayfalar

- [Görüntüleme Anahtarları](/zcash-tech/viewing-keys)
- [Ödeme Açıklamaları](/zcash-tech/payment-disclosures)
- [Birleşik Adresler](/zcash-tech/unified-addresses)
- [Bir Blok Gezgini Neleri Görebilir](/zcash-tech/what-a-block-explorer-can-see)
