# FROST & Viewing Keys: Zcash/Dash Birlikte Çalışabilirlik Araştırma Özeti

*ZecHub için hazırlandı · 27 Eylül 2026 tarihinde revize edildi · Tüm iddiaların kaynakları satır içinde verilmiştir*

## Yönetici özeti

ZecHub, shielded DASH’i bir wiki bağış seçeneği olarak ekledikten sonra şu soruyu gündeme getirdi: Zcash tarzı viewing key'ler veya FROST eşik imzaları Dash'e uyarlanabilir mi?

Araştırma, soruyu yeniden çerçeveledi. Viewing key'ler açık bir soru değil — Dash, [Zcash Orchard shielded havuzunu](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) Evolution zincirine ekledi ve Orchard'nin anahtar hiyerarşisi, tasarım gereği viewing key'leri içeriyor. Dash'in kendi [yol haritası](https://www.dash.org/roadmap/), bunları denetçi açıklamaları ve Travel Rule uyumluluğu için konumlandırıyor. Bu kısım varsayımsal değil, devrede.

**Asıl boşluğun bulunduğu yer FROST.** Dash, [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html) aracılığıyla BLS eşik imzalarını hâlihazırda kullanıyor, ancak bunlar ağ düzeyindeki konsensüse hizmet ediyor — ChainLocks ve InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) ise farklı bir şeyi hedefliyor: küçük bir bireysel anahtar sahibi grubu tarafından tutulan tek bir shielded hesap üzerinde eşikli harcama yetkilendirmesi. Bu ikisi birbirinin yerine geçmez. Ayrıca ZIP 312 hâlâ **Taslak** olduğundan, taşınacak bir referans uygulaması iki zincirde de yok; dolayısıyla hangi taraf geliştirirse geliştirsin bu yeni bir çalışma olacaktır.

---

## Zaman çizelgesi: bu karşılaştırma neden şu anda sıra dışı

2026 ortasında, birbirinden haftalar arayla iki shielded havuz olayı yaşandı.

**Zcash, Orchard'den ayrıldı.** Araştırmacı Taylor Hornby, Orchard içinde arzın fark edilmeden şişirilmesi için kullanılabilecek bir devre güvenlik açığını açıkladı. Zcash, turnike geçiş mekanizmasına sahip yeni bir shielded havuz sunan **Ironwood'yi (NU6.3)** **28 Temmuz 2026** tarihinde etkinleştirerek yanıt verdi.

**Dash, Orchard'ye geçti.** Dash, planı [19 Şubat 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) tarihinde duyurdu — *"Doğal olarak güvenlik denetimleri ve ek kod incelemelerine bağlı olmak üzere, shielded transferleri yakında başlatabilmeyi bekliyoruz."* Dash'in [yol haritası](https://www.dash.org/roadmap/), Shielded Balances özelliğini Dash Platform **v4.0** ile **Temmuz 2026'da tamamlandı** olarak kaydediyor ve Dash, **4 Ağustos 2026** tarihinde [*"Shielded işlemler Dash Evolution ana ağında yayında"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) açıklamasını yayımladı.

> **Sıralama hakkında bir not.** Bazı haberler Dash'in ana ağ etkinleştirmesini 17 Temmuz 2026 olarak verdi; bu tarih Dash'i Ironwood'den önce konumlandırırdı. Bu tarih, bir etkinleştirmeden ziyade duyuruya ilişkin basın haberlerine dayanıyor gibi görünüyor. Dash'in kendi kaynaklarında özellik Temmuz ayında tamamlandı ve 4 Ağustos'ta yayında olduğu duyuruldu — yani Ironwood'den sonra. İki zincirin yolları birkaç hafta içinde kesişti; kesin sıralama hangi kilometre taşının sayıldığına bağlıdır ve bu özet bunlardan birini iddia etmez.

Kritik olarak, Dash hatayı devralmadı. Duyuruları nettir: *"Bilinen bir enflasyon hatası olmayan Orchard sürümünü uyguladık. Önceki sürüm, Zcash arzını fark edilmeden şişirmek için kullanılabilecek bir hata içeriyordu."*

Dolayısıyla Dash artık, Zcash'nin temel katmanda kendisinin de terk ettiği kriptografinin yamalanmış bir çatallanmasını kullanıyor; buna karşılık Zcash'nin yeni nesil havuzu (Ironwood) yeni yayında ve yeni nesil harcama yetkilendirme şeması (FROST) hâlâ Taslak durumunda.

---

## Viewing key'ler: araştırma boşluğu değil, devrede

Dash'in shielded havuzu [Orchard](https://zips.z.cash/zip-0224) olup, güvenilir kurulum gerektirmeyen Halo 2 zk-SNARKs üzerine kuruludur. Orchard'nin anahtar hiyerarşisi, eklenti olarak değil tasarımının bir parçası olarak her zaman Full Viewing Keys ve Incoming Viewing Keys içerdi — dolayısıyla yetenek, iki zincirin de ayrıca uyarlamak zorunda kaldığı bir unsur olarak değil, kodla birlikte geldi.

Dash'in yol haritası amacı doğrudan ifade ediyor:

> *"Borsa listeden çıkarılmaları ve düzenleyici zorluklarla karşılaşan zorunlu gizlilik sistemlerinin aksine, Shielded Balances view key'ler aracılığıyla seçici açıklamayı destekler — kullanıcıların ve işletmelerin, günlük kullanım gizliliğinden ödün vermeden, gerektiğinde işlem ayrıntılarını denetçilerle paylaşmalarına veya Travel Rule gerekliliklerine uymalarına olanak tanır."*

Kayda değer iki gözlem:

**Dash, viewing key'leri Zcash'nin kendi araçlarının ulaştığından daha somut bir üretim kullanım senaryosu etrafında konumlandırıyor.** Zcash'nin ödeme-açıklama araçları cüzdanlarda büyük ölçüde deneysel ve isteğe bağlı kaldı. Dash ise kendi duyurusuna göre yaklaşık bir saniyelik deterministik kesinleşme ve yaklaşık yirmi saniyelik cüzdan senkronizasyonu sunan bir zincirde, view key'leri belirli kullanım durumlarıyla bir uyumluluk özelliği olarak sunuyor.

**Açık konu yetenek değil, uyumluluk sapmasıdır.** Her iki zincir bağımsız gelişirken Dash'in viewing key uygulamasının Zcash'nin Orchard viewing key biçimiyle kablo düzeyinde uyumlu kalıp kalmadığı takip edilmeye değerdir. Bu, araştırma projesinden ziyade izleme sorusudur.

---

## Anahtar türetimi: Zcash ve Dash karşılaştırması

Bu bölüm, gözden geçirenin sorusunu doğrudan yanıtlıyor. Kısa yanıt şudur: *shielded* anahtar ağaçları, kod paylaşıldığı için neredeyse aynıdır — anlamlı farklar, her zincirin bu ağacı cüzdan anahtar alanına nasıl **köklediğinde** ve bu alanı başka nelerin doldurduğunda bulunur.

### Zcash

Zcash, durumu **Nihai** olan [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032) standardını kullanır. Shielded anahtarları tek bir BIP 32 ağacına yerleştirmek yerine, ZIP 32 her shielded havuza kendi ana anahtarını ve kendi yolunu verir:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`, BIP 43 uyarınca `32'` (0x80000020) olarak sabitlenmiştir ve `coin_type` SLIP 44'ü takip eder; tüm test ağları `1` indeksini paylaşır.

Bir Orchard hesabı içinde hiyerarşi kesinlikle tek yönlüdür — her seviye, altındaki her şeyi türetebilir; üstündekileri ise türetemez:

| Anahtar | Yapabilecekleri | Türettiği |
|---|---|---|
| Spending key | Notları harcar | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Harcamaları yetkilendirir | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Gelen **ve** giden ödemeleri görür | IVK, OVK |
| Incoming Viewing Key | Yalnızca gelen ödemeleri görür | Çeşitlendirilmiş adresler |
| Outgoing Viewing Key | Giden ödeme ayrıntılarını kurtarır | — |
| Diversified address | Alır | — |

Orchard, bunu Sapling'ye kıyasla basitleştirdi: [Orchard Book](https://zcash.github.io/orchard/design/keys.html)'a göre nullifier özel anahtarı `nsk` kaldırıldı, `nk` eğri noktası yerine alan elemanı oldu ve `ovk` artık ayrı tutulmak yerine tam viewing key'den türetiliyor.

Bunun üzerinde, havuz başına anahtarları bir **Unified Full Viewing Key** ("birden çok Full Viewing Key… öğeyi birleştirir") ve bir **Unified Incoming Viewing Key** içinde toplayan [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) bulunur — Revizyon 0 Etkin, Revizyon 1 Geri Çekilmiş, Revizyon 2 Taslak durumundadır. Bir cüzdan geliştiricisinin gözetmesi gereken ayrım şudur: UFVK hem gelen hem de giden etkinliği açığa çıkarırken, UIVK yalnızca gelen etkinliği açığa çıkarır.

### Dash

Dash, her şeyi SLIP 44 coin türü `5'` olan geleneksel bir BIP 32 ağacına kökler ve buna kendi iki türetim uzantısını ekler.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html), anahtar alanını coin'e özgü işlevlere göre bölen bir **özellik** seviyesi ekler:

```
m / purpose' / coin_type' / feature' / *
```

Burada `purpose`, `9'` (0x80000009) olarak ve `coin_type` ise `5'` (0x80000005) olarak sabitlenmiştir. DIP'in ifade edilen gerekçesi yalıtımdır — *"karma fonları, karma olmayan fonlardan izole edilmiş bir yolda tutmak istenebilir."*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md), BIP 32'nin 31 bitlik indeks sınırını aşarak yol bileşenlerinin tam 256 bitlik değerler taşımasına olanak verir. Bu, aşağıdaki gibi kimlikten türetilmiş yolları mümkün kılar:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

Son iki bileşen kullanıcı kimliği karmalarıdır. Zcash'nin bir karşılığı yoktur: ZIP 32, başka bir tarafın kimliğinden anahtar yolu türetme kavramını içermez.

### İkisinin gerçekten farklılaştığı noktalar

**Shielded alt ağaç aynıdır.** Dash'in shielded anahtarları Orchard anahtarlarıdır; çünkü Dash'in shielded havuzu Orchard'dir. İkisi arasında geçiş yapan bir cüzdan geliştiricisi aynı harcama anahtarı-vieving key yapısıyla çalışır.

**Kökleme farklıdır.** Zcash, her shielded havuzu `32'` amacıyla kendi ana anahtarının altında izole eder. Dash, shielded özelliğini diğer tüm özelliklerin yanında, `9'` amacının altında tek bir birleşik ağaca bağlar. Zcash'nin ayrımı kriptografik havuz bazlıdır; Dash'inki ise ürün özelliği bazlıdır.

**Dash'in anahtar alanı, Zcash'nin sahip olmadığı bir şey içerir: ayrı bir BLS alanı.** LLMQ'lar tarafından kullanılan masternode operatörü anahtarları, oylama anahtarları ve quorum anahtarları BLS anahtarlarıdır, Schnorr ailesi anahtarları değildir ve yukarıda açıklanan BIP 32 ağacının tamamen dışında bulunur. Dash'in mevcut eşik imzalama sistemi tam olarak burada yaşar — ve sonraki bölümün açıkladığı üzere Orchard harcama yetkilendirmesiyle neden birleşmediğinin sebebi de budur.

**Kimlikle bağlantılı türetim yalnızca Dash'te bulunur.** DIP-0014'ün 256 bitlik yolları, anahtarları kimlikler arasındaki ilişkilerden türetmek için vardır. Bu, Zcash eşdeğeri olmayan bir Dash Platform kavramıdır ve iki türetim şemasının kazara değil, amaçlı biçimde ayrıştığının en açık örneğidir.

*İki kökleme şemasının ortak bir Orchard alt ağacında birleşimi için Şekil 1'e bakın.*

---

## FROST: gerçekten açık soru

Dash, ChainLocks, InstantSend ve Dash Platform doğrulayıcı konsensüsü için kullanılan **BLS tabanlı LLMQ'larda** (Long-Living Masternode Quorums) olgun bir eşik-imza sistemine sahiptir.

Durumu **Taslak** olan [ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312) farklı bir şey yapar. Sapling ve Orchard tarafından sırasıyla tanımlanan, zaten mevcut Schnorr tabanlı harcama yetkilendirme imzalarını — **RedJubjub** ve **RedPallas** — eşiklendirir; böylece ZIP'nin kendi ifadesiyle *"bir cüzdanın saklamasını paylaşan kullanıcılar ve üçüncü taraf hizmetler veya ortak fonları yöneten bir grup insan"*, harcama öncesinde 3 üzerinden 2 gibi eşik onayı isteyebilir. Bu bir **Cüzdan** ZIP olarak sınıflandırılmıştır: konsensüsü değiştirmek yerine, mevcut harcama yetkilendirmesiyle uyumlu imzalar üretir. ZIP'nin kaldırmayı açıkça reddettiği bir Koordinatör rolünü korur; ayrıca hem güvenilir dağıtıcı anahtar üretimini hem de dağıtık anahtar üretimini ele alır.

Önem taşıyan ve bunların neden ikame olmadığını açıklayan ayrım:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| İmza şeması | BLS | Schnorr — RedJubjub / RedPallas |
| Kim imzalar | Bir masternode quorum'u | Küçük bir bireysel anahtar sahibi grubu |
| Ne yetkilendirilir | Bir ağ olgusu: blok kilidi, işlem kilidi | Bir shielded hesaptan harcama |
| Katman | Konsensüs | Cüzdan |
| Anahtar alanı | Ayrı BLS alanı | Orchard/Sapling harcama yetkilendirme anahtarı |
| Durum | Devrede | Taslak, referans uygulama yok |

Dash'in BLS eşik imzalarına sahip olması, FROST'ye sahip olduğu veya buna ihtiyaç duyduğu anlamına **gelmez**. Ancak Dash mühendislerinin eşik imzalama, dağıtık anahtar üretimi ve quorum koordinasyonu konusunda kurum içi deneyime sahip olduğu anlamına gelir — bunu geliştirmeyi seçmeleri hâlinde gerçek ve aktarılabilir bir deneyimdir.

*Her şemanın gerçekte neyi imzaladığını görmek için Şekil 2'ye bakın.*

### İlk değerlendirmeye göre Dash'in Orchard çatallanmasında FROST için gerekenler

1. **FROST'nin harcama yetkilendirme şeması olan Pallas eğrisi üzerindeki Schnorr varyantı RedPallas için bir Orchard DKG ve imzalama töreni.** Bu, LLMQ'lar için Dash'in mevcut BLS DKG'sinden ayrıdır ve ona indirgenemez.
2. **Tek bir shielded hesabın çok taraflı imzalanması için cüzdan ve UX desteği.** Bu, masternode-quorum araçlarından farklı bir etkileşim biçimidir ve bir Koordinatör eşdeğeri gerektirir.
3. **Katman hakkında karar.** ZIP 312, konsensüs değişikliği yerine mevcut ilkeller üzerinde bir cüzdan şeması olarak kapsamlandığı için büyük olasılıkla yalnızca cüzdan düzeyinde olacaktır — ancak bu, Orchard'nin çatallanmasında özellikle doğrulanmalıdır; Zcash'nin kapsamından varsayılmamalıdır.

---

## Öneri

**Viewing key'ler — araştırma yapmayın, belgelendirin.** Yetenek her iki zincirde de devrede. Dash'in shielded havuzunun view key'ler içerdiğini kaydeden ve Dash'in yol haritasına bağlantı veren kısa bir wiki notu, ZecHub kitlesinin bunun hâlâ varsayımsal olduğunu düşünmesini önler. Zincirler geliştikçe kablo biçimi uyumluluğunu takip edin.

**FROST — gerçek fırsat, ancak üst akışta engelli.** Bu, ZIP 312'nin bir referans uygulamaya ulaşmasına veya Dash'in paralel geliştirmeyi seçmesine bağlıdır. ZecHub bunu doğrudan hızlandıramaz.

**En yüksek değerli sonraki adım, daha fazla masa başı araştırması değil, bir görüşmedir.** Bunu geliştirecek kişilere ulaşılabilir. Shielded Labs, ZIP 312'yi yürütüyor; Dash'in mühendislik ekibi ise Orchard entegrasyonu bağlamında "Zcash'den alınmış" çerçevesiyle olumlu şekilde ilgilendi. İkisini bağlayan topluluklar arası bir tartışma, yeni bir okuma turundan daha fazla bilgi ortaya çıkarır; bu özet kamusal kaynakların kesinleştirebileceği noktaların sınırına ulaşmıştır.

---

## Şekiller

**Şekil 1 — Anahtar türetim köklemesi: Zcash ZIP 32 ve Dash DIP-0009/0014, ortak bir Orchard alt ağacında birleşiyor.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Şekil 2 — Her eşik şemasının imzaladığı şey: bir ağ olgusunu tasdik eden masternode quorum'una karşı, tek bir shielded harcamayı yetkilendiren anahtar sahibi grubu.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Kaynaklar

**Zcash — protokol**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — durum Nihai
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — durum Taslak
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Anahtarlar ve adresler](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — anahtar bileşenleri, §5.6.4

**Dash — protokol ve duyurular**
- [Shielded işlemler Dash Evolution ana ağında yayında](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 Ağustos 2026
- [Dash Evolution'a Shielded İşlemler Ekliyor](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 Şubat 2026
- [Dash Yol Haritası](https://www.dash.org/roadmap/) — Shielded Balances, Temmuz 2026'da tamamlandı, Platform v4.0; 12 Eylül 2026'da güncellendi
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core belgeleri — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips deposu](https://github.com/dashpay/dips)

**Eş zamanlı haberler**
- [Dash, gizlilik yükseltmesinde Zcash'nin Orchard teknolojisini kullanıma sundu](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash, shielded işlemler için Evolution Chain'e Zcash Orchard gizliliğini getiriyor](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Kaynaklar 27 Eylül 2026'da kontrol edildi. Dash Platform ve ZIP 312'nin ikisi de gelişiyor; şekiller ve durumlar yeniden yayımlanmadan önce tekrar doğrulanmalıdır.*
