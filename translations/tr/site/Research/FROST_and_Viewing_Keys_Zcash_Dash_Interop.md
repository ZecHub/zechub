# FROST ve Görüntüleme Anahtarları: Zcash/Dash Birlikte Çalışabilirlik Araştırma Özeti

*ZecHub için hazırlandı · 27 Eylül 2026'da güncellendi · Tüm iddialar metin içinde kaynaklandırılmıştır*

## Yönetici özeti

ZecHub, wiki bağış seçeneği olarak korumalı DASH ekledikten sonra şu soruyu gündeme getirdi: Zcash tarzı görüntüleme anahtarları veya FROST eşik imzaları Dash'ye uyarlanabilir mi?

Araştırma soruyu farklı bir çerçeveye oturttu. Görüntüleme anahtarları açık bir soru değil — Dash, [Zcash Orchard korumalı havuzunu](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) Evolution Zincirine taşıdı ve Orchard'ın anahtar hiyerarşisi tasarımı gereği görüntüleme anahtarlarını içeriyor. Dash'ın kendi [yol haritası](https://www.dash.org/roadmap/), bunları denetçilere açıklama ve Seyahat Kuralı uyumluluğu için konumlandırıyor. Bu kısım hayata geçirilmiş durumda; varsayımsal değil.

**FROST gerçek boşluğun bulunduğu yer.** Dash, [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html) aracılığıyla BLS eşik imzalarını zaten kullanıyor, ancak bunlar ağ düzeyindeki konsensüse hizmet ediyor — ChainLocks ve InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) ise farklı bir şeyi hedefliyor: küçük bir bireysel anahtar sahibi grubunun elindeki tek bir korumalı hesap için eşikli harcama yetkilendirmesi. Bu ikisi birbirinin yerine kullanılamaz. Ayrıca ZIP 312 hâlâ **Taslak** olduğundan, başka bir Zincirden taşınabilecek bir referans uygulama yok; dolayısıyla bunu hangi taraf geliştirirse geliştirsin, çalışma yeni olacaktır.

---

## Zaman çizelgesi: bu karşılaştırma şu anda neden sıra dışı

2026 ortasında, birkaç hafta arayla iki korumalı havuz olayı yaşandı.

**Zcash, Orchard'den ayrıldı.** Araştırmacı Taylor Hornby, arzı tespit edilemeden artırmak için kullanılabilecek bir Orchard devre açığını açıkladı. Zcash, **28 Temmuz 2026** tarihinde **Ironwood (NU6.3)**'ü etkinleştirerek yeni bir korumalı havuz ve turnike geçiş mekanizması sundu.

**Dash, Orchard'e geçti.** Dash planı [19 Şubat 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) tarihinde duyurdu — *“Güvenlik denetimleri ve daha fazla kod incelemesi beklenmek kaydıyla, yakında korumalı transferleri başlatabileceğimizi öngörüyoruz.”* Dash'ın [yol haritası](https://www.dash.org/roadmap/), Korumalı Bakiyelerin Dash Platform **v4.0** ile **Temmuz 2026'da tamamlandığını** kaydediyor ve Dash, **4 Ağustos 2026** tarihinde Dash Evolution ana ağında korumalı işlemlerin kullanıma sunulduğunu[*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) yayımladı.

> **Sıralamaya ilişkin not.** Bazı haberler Dash ana ağının etkinleştirilmesini 17 Temmuz 2026'ya tarihlendirdi; bu tarih Ironwood'den önceye denk geliyor. Bu tarihin etkinleştirmeden ziyade duyurunun basında yer almasına dayandığı anlaşılıyor. Dash'ın kendi kaynaklarında özellik Temmuz ayında tamamlanmış ve 4 Ağustos'ta kullanıma sunulduğu duyurulmuş — Ironwood'den sonra. İki Zincir birkaç hafta arayla kesişti; kesin sıralama hangi dönüm noktasının esas alındığına bağlı ve bu özet herhangi birini ileri sürmüyor.

Önemli olarak, Dash hatayı devralmadı. Duyurularında açıkça şöyle deniyor: *“Orchard'nin bilinen bir enflasyon hatası içermeyen sürümünü uyguladık. Önceki sürüm, Zcash'ın arzını fark edilmeden artırmak için kullanılabilecek bir hata içeriyordu.”*

Dolayısıyla Dash artık, temel katmanda Zcash'in kendisinin terk ettiği kriptografinin yamalanmış bir çatallanmasını kullanıyor. Bu sırada Zcash'ın yeni nesil havuzu (Ironwood) ve yeni nesil harcama yetkilendirme şeması (FROST) sırasıyla yeni kullanıma sunulmuş ve hâlâ Taslak durumda.

---

## Görüntüleme anahtarları: araştırma boşluğu değil, uygulanmış özellik

Dash'ın korumalı havuzu, güvene dayalı kurulum gerektirmeyen Halo 2 zk-SNARKs üzerine kurulu [Orchard](https://zips.z.cash/zip-0224)'dir. Orchard'ın anahtar hiyerarşisi, Tasarımının parçası olarak Tam Görüntüleme Anahtarları ve Gelen Görüntüleme Anahtarlarını en başından beri içeriyor; bunlar sonradan eklenmiş özellikler değil. Dolayısıyla bu yetenek, iki Zincirin üzerinde anlaşarak aktarması gereken bir unsur olarak değil, kodla birlikte geldi.

Dash'ın yol haritası amacı doğrudan ifade ediyor:

> *“Zorunlu gizlilik sistemlerinin borsa listelemelerinden çıkarılma ve düzenleyici engellerle karşılaşmasının aksine, Korumalı Bakiyeler görüntüleme anahtarları aracılığıyla seçici açıklamayı destekliyor. Böylece kullanıcılar ve işletmeler, gündelik kullanımda gizlilikten ödün vermeden, gerektiğinde işlem ayrıntılarını denetçilerle paylaşabiliyor veya Seyahat Kuralı gerekliliklerine uyabiliyor.”*

Kayda değer iki gözlem:

**Dash, görüntüleme anahtarlarını Zcash'ın kendi araçlarının ulaştığından daha somut bir üretim kullanım alanı etrafında konumlandırıyor.** Zcash'ın ödeme açıklama araçları, cüzdanlar genelinde büyük ölçüde deneysel ve isteğe bağlı kalmıştır. Dash ise kendi duyurusuna göre yaklaşık bir saniyede kesinleşen işlemler ve yaklaşık yirmi saniyede cüzdan eşitlemesi sunan bir Zincirde, kullanım alanlarını belirttiği bir uyumluluk özelliği olarak görüntüleme anahtarlarını kullanıma sunuyor.

**Açık konu yetenek değil, uyumluluk sapması.** Her iki Zincir bağımsız olarak geliştikçe Dash'ın görüntüleme anahtarı uygulamasının Zcash'ın Orchard görüntüleme anahtarı biçimiyle tel uyumluluğunu koruyup korumayacağını izlemeye değer. Bu bir araştırma projesinden ziyade izleme konusudur.

---

## Anahtar türetme: Zcash ve Dash karşılaştırması

Bu bölüm, inceleyenin sorusunu doğrudan ele alıyor. Kısa yanıt şu: *korumalı* anahtar ağaçları, kod ortak olduğu için neredeyse aynıdır; anlamlı farklılıklar, her Zincirin bu ağacı cüzdan anahtar alanına nasıl **bağladığında** ve bu alanda başka nelerin bulunduğundadır.

### Zcash

Zcash, **Nihai** statüsündeki [ZIP 32'yi, *Korumalı Hiyerarşik Deterministik Cüzdanları*](https://zips.z.cash/zip-0032) kullanır. Korumalı anahtarları tek bir BIP 32 ağacına yerleştirmek yerine, ZIP 32 her korumalı havuza kendi ana anahtarını ve kendi yolunu verir:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`, BIP 43 uyarınca `32'` (0x80000020) olarak sabitlenmiştir. `coin_type` ise SLIP 44'ü izler ve tüm test ağları `1` dizinini paylaşır.

Bir Orchard hesabı içindeki hiyerarşi kesin biçimde tek yönlüdür — her seviye, kendisinin altındaki her şeyi türetebilir, üstündeki hiçbir şeyi türetemez:

| Anahtar | Yapabilecekleri | Türettiği |
|---|---|---|
| Spending key | Notelar harcamak | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Harcamalara yetki vermek | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Gelen **ve** giden ödemeleri görmek | IVK, OVK |
| Incoming Viewing Key | Yalnızca gelen ödemeleri görmek | Çeşitlendirilmiş adresler |
| Outgoing Viewing Key | Giden ödeme ayrıntılarını kurtarmak | — |
| Diversified address | Ödeme almak | — |

Orchard, bunu Sapling'e kıyasla basitleştirdi: [Orchard Kitabı](https://zcash.github.io/orchard/design/keys.html)'na göre nullifier özel anahtarı `nsk` kaldırıldı, `nk` bir eğri noktası yerine bir alan elemanı hâline geldi ve `ovk` artık ayrı tutulmak yerine tam görüntüleme anahtarından türetiliyor.

Bunun üzerinde [ZIP 316, *Birleşik Adresler ve Birleşik Görüntüleme Anahtarları*](https://zips.z.cash/zip-0316) bulunur — Revizyon 0 Aktif, Revizyon 1 Geri Çekilmiş, Revizyon 2 Taslak. Bu ZIP, havuz başına anahtarları **Birleşik Full Viewing Key** (“birden fazla Full Viewing Key… Öğesini birleştirir”) ve **Birleşik Incoming Viewing Key** içinde toplar. Cüzdan geliştiricisinin gözetmesi gereken ayrım şudur: UFVK hem gelen hem giden etkinlikleri açığa çıkarırken, UIVK yalnızca gelenleri açığa çıkarır.

### Dash

Dash, her şeyi SLIP 44 para birimi türü `5'` olan geleneksel bir BIP 32 ağacına bağlar ve kendi türetme uzantılarından ikisini ekler.

[DIP-0009, *Özellik Türetme Yolları*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html), anahtar alanını para birimine özgü işlevlere göre bölümlere ayıran bir **özellik** düzeyi ekler:

```
m / purpose' / coin_type' / feature' / *
```

Burada `purpose`, `9'` (0x80000009) olarak; `coin_type` ise `5'` (0x80000005) olarak sabitlenmiştir. DIP'in belirttiği gerekçe yalıtımdır — *“Karışık fonları, karışık olmayan fonlardan yalıtılmış bir yolda tutmak tercih edilebilir.”*

[DIP-0014, *256 Bit İşaretsiz Tamsayılar Kullanarak Genişletilmiş Anahtar Türetme*](https://github.com/dashpay/dips/blob/master/dip-0014.md), BIP 32'nin 31 bitlik dizin sınırını kaldırarak yol bileşenlerinin tam 256 bitlik değerler taşımasını sağlar. Böylece kimlikten türetilen yollar kullanılabilir:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

Burada son iki bileşen, kullanıcı kimliği özetleridir. Zcash'ın benzeri yoktur: ZIP 32, başka bir tarafın kimliğinden anahtar yolu türetme kavramına sahip değildir.

### İkisi gerçekte nerede farklılaşıyor?

**Korumalı alt ağaç aynıdır.** Dash'ın korumalı anahtarları Orchard anahtarlarıdır; çünkü Dash'ın korumalı havuzu Orchard'dır. İki Zincir arasında geçiş yapan bir cüzdan geliştiricisi, aynı harcama anahtarından görüntüleme anahtarı yapısına sahip olur.

**Kök bağlama farklıdır.** Zcash, her korumalı havuzu `32'` amacıyla kendi ana anahtarı altında yalıtır. Dash, korumalı özelliği diğer tüm özelliklerle birlikte `9'` amacı altında tek bir birleşik ağaca bağlar. Zcash'ın ayrımı kriptografik havuz bazındadır; Dash'ınki ise ürün özelliği bazında.

**Dash'ın anahtar alanı, Zcash'ınkinde bulunmayan bir şey içeriyor: ayrı bir BLS alanı.** LLMQ'larda kullanılan masternode operatör anahtarları, oylama anahtarları ve çoğunluk anahtarları, Schnorr ailesinden anahtarlar değil BLS anahtarlarıdır ve yukarıda açıklanan BIP 32 ağacının tamamen dışında yer alır. Dash'ın mevcut eşik imzalama sistemi tam olarak burada bulunur; bir sonraki bölümde açıklanacağı üzere, Orchard harcama yetkilendirmesiyle birleştirilememesinin nedeni de budur.

**Kimliğe bağlı türetme yalnızca Dash'da bulunur.** DIP-0014'ün 256 bitlik yolları, kimlikler arasındaki ilişkilerden anahtar türetmek için vardır. Bu, başka bir Zcash karşılığı olmayan bir Dash Platform kavramıdır ve iki türetme şemasının kazara değil, bilinçli olarak farklılaştığının en açık örneğidir.

*Ortak bir Orchard alt ağacında birleşen iki kök bağlama şeması için Şekil 1'e bakın.*

---

## FROST: gerçekten açık olan soru

Dash, ChainLocks, InstantSend ve Dash Platform doğrulayıcı konsensüsü için kullanılan **BLS tabanlı LLMQ'larda** (Uzun Ömürlü Masternode Yeter Sayıları) olgun bir eşik imza sistemine sahiptir.

[ZIP 312, *Harcama Yetkilendirme Çoklu İmzaları için FROST*](https://zips.z.cash/zip-0312), **Taslak** statüsündedir ve farklı bir iş yapar. Sapling ve Orchard tarafından zaten tanımlanmış Schnorr tabanlı harcama yetkilendirme imzalarını — sırasıyla **RedJubjub** ve **RedPallas** — eşikli hâle getirir. Böylece ZIP'ın kendi ifadesiyle *“bir cüzdanın gözetimini paylaşan kullanıcılar ve üçüncü taraf hizmetleri ya da ortak fonları yöneten bir grup kişi”*, harcama öncesinde 2/3 gibi bir eşikli onay isteyebilir. Bu, mevcut harcama yetkilendirmesiyle uyumlu imzalar ürettiği ve konsensüsü değiştirmediği için **Cüzdan** ZIP olarak sınıflandırılır. Koordinatör rolünü korur; ZIP bu rolün kaldırılmasını açıkça reddeder ve hem güvenilir aracıyla anahtar oluşturmayı hem de dağıtık anahtar oluşturmayı ele alır.

Önemli ayrım ve bunların neden birbirinin yerine kullanılamayacağı:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| İmza şeması | BLS | Schnorr — RedJubjub / RedPallas |
| Kim imzalar | Bir masternode çoğunluğu | Küçük bir bireysel anahtar sahibi grubu |
| Neye yetki verilir | Bir ağ olgusu: blok kilidi, işlem kilidi | Tek bir korumalı hesaptan harcama |
| Katman | Konsensüs | Cüzdan |
| Anahtar alanı | Ayrı BLS alanı | Orchard/Sapling harcama yetkilendirme anahtarı |
| Durum | Kullanımda | Taslak, referans uygulama yok |

Dash'ın BLS eşik imzalarına sahip olması, FROST'e sahip olduğu ya da ihtiyaç duyduğu **anlamına gelmez**. Ancak bu, Dash mühendislerinin eşik imzalama, dağıtık anahtar oluşturma ve çoğunluk koordinasyonu konusunda kurum içi deneyime sahip olduğu anlamına gelir — bunu geliştirmeyi seçerlerse aktarılabilecek gerçek bir deneyim.

Her şemanın gerçekte neyi imzaladığını görmek için *Şekil 2'ye bakın.*

### FROST'ın Dash'ın Orchard çatallanmasında gerektirecekleri: ilk değerlendirme

1. **Orchard'ın harcama yetkilendirme şeması RedPallas üzerinde bir FROST DKG ve imzalama töreni** — Pallas eğrisi üzerinde bir Schnorr varyantı. Bu, Dash'ın LLMQ'lar için mevcut BLS DKG'sinden ayrıdır ve ona indirgenemez.
2. **Tek bir korumalı hesap için çok taraflı imzalamaya yönelik cüzdan ve UX desteği.** Bu, masternode çoğunluğu araçlarından farklı bir etkileşim biçimidir ve Koordinatör eşdeğeri gerektirir.
3. **Katmana ilişkin bir karar.** ZIP 312, konsensüs değişikliğinden ziyade mevcut temel öğeler üzerine kurulu bir cüzdan şeması olarak kapsamlandığından, büyük olasılıkla yalnızca cüzdan katmanında olur. Ancak bu, Zcash'ın kapsamından varsayılmamalı; özellikle Dash'ın Orchard çatallanması için doğrulanmalıdır.

---

## Öneri

**Görüntüleme anahtarları — araştırmak yerine belgeleyin.** Bu özellik her iki Zincirde de kullanıma sunulmuş durumda. Dash'ın korumalı havuzunun görüntüleme anahtarları içerdiğini belirten ve Dash'ın yol haritasına bağlantı veren kısa bir wiki notu, ZecHub'ın okuyucularının bunun hâlâ varsayımsal olduğunu düşünmesini önler. İki Zincir geliştikçe tel biçimi uyumluluğunu izleyin.

**FROST — gerçek bir fırsat, ancak üst projedeki engel nedeniyle beklemede.** Bunun için ZIP 312'nin bir referans uygulamaya ulaşması ya da Dash'ın paralel olarak geliştirmeyi seçmesi gerekiyor. ZecHub bunu doğrudan hızlandıramaz.

**En değerli sonraki adım daha fazla masa başı araştırması değil, bir görüşme.** Bunu geliştirecek kişilere ulaşılabilir. Shielded Labs, ZIP 312'yi yürütüyor; Dash'ın mühendislik ekibi, Orchard entegrasyonuyla ilgili “Zcash'den ödünç alınmış” çerçevesine şimdiden olumlu yaklaşmış durumda. İki topluluğu bir araya getiren bir iletişim başlığı, bir tur daha okumaktan daha fazlasını ortaya çıkarır; bu özet, kamuya açık kaynakların yanıtlayabileceklerinin sınırına ulaştı.

---

## Şekiller

**Şekil 1 — Anahtar türetmenin kök bağlaması: Zcash ZIP 32 ve Dash DIP-0009/0014, ortak bir Orchard alt ağacında birleşiyor.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Şekil 2 — Her eşik şemasının neyi imzaladığı: bir ağ olgusunu doğrulayan masternode çoğunluğuna karşılık tek bir korumalı harcamaya yetki veren anahtar sahibi grubu.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Kaynaklar

**Zcash — protokol**
- [ZIP 32: Korumalı Hiyerarşik Deterministik Cüzdanlar](https://zips.z.cash/zip-0032) — Nihai statüsünde
- [ZIP 224: Orchard Korumalı Protokolü](https://zips.z.cash/zip-0224)
- [ZIP 312: Harcama Yetkilendirme Çoklu İmzaları için FROST](https://zips.z.cash/zip-0312) — Taslak statüsünde
- [ZIP 316: Birleşik Adresler ve Birleşik Görüntüleme Anahtarları](https://zips.z.cash/zip-0316)
- [Orchard Kitabı — Anahtarlar ve adresler](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protokol Belirtimi](https://zips.z.cash/protocol/protocol.pdf) — Anahtar bileşenleri, §5.6.4

**Dash — protokol ve duyurular**
- [Korumalı işlemler Dash Evolution ana ağında kullanıma sunuldu](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 Ağustos 2026
- [Dash Evolution'a Korumalı İşlemler Ekliyor](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 Şubat 2026
- [Dash Yol Haritası](https://www.dash.org/roadmap/) — Korumalı Bakiyeler, Temmuz 2026'da tamamlandı, Platform v4.0; 12 Eylül 2026'da güncellendi
- [DIP-0009: Özellik Türetme Yolları](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: 256 Bit İşaretsiz Tamsayılar Kullanarak Genişletilmiş Anahtar Türetme](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core belgeleri — Masternode Yeter Sayıları (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips deposu](https://github.com/dashpay/dips)

**Dönemle aynı zamana ait haberler**
- [Dash, gizlilik yükseltmesinde Zcash'ın Orchard teknolojisini kullanıma sunuyor](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash, Korumalı İşlemler için Evolution Zincirine Zcash Orchard Gizliliği Getiriyor](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Kaynaklar 27 Eylül 2026'da kontrol edildi. Dash Platform ve ZIP 312 gelişmeye devam ediyor; yeniden yayımlanmadan önce şekiller ve durumlar yeniden doğrulanmalıdır.*
