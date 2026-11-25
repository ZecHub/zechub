<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# FROST ve Korumalı ZEC için Eşikli Saklama

> FROST protokolünün tüm kriptografik ayrıntıları için [FROST teknik sayfasına](FROST.md) bakın.

FROST eşikli saklama, Zcash sohbetlerinde sık sık gündeme geliyor — ZecHub Hackathon 2026’nın en popüler başlığıydı — ancak kavram her zaman anlaşılır bir dille açıklanmıyor. Bu sayfada ne anlama geldiğini, ne zaman gerçekten ihtiyaç duyacağınızı, ödünleşimleri ve bugün hangi araçların bunu desteklediğini ele alıyoruz.

---

## Kısaca

- **FROST**, tek bir kişinin özel anahtarın tamamını elinde tutmasına gerek kalmadan, bir anahtar sahibi grubunun korumalı Zcash adresini birlikte kontrol etmesini sağlar.
- **t-of-n** eşiği şu anlama gelir: Harcama yapmak için t kişinin birlikte imzalaması gerekir; t-1 veya daha az kişi fonları tek başına hareket ettiremez.
- İşlemler diğer tüm korumalı işlemler gibi görünür — eşikli imzalama kullanıldığını açığa çıkaran zincir üstü hiçbir iz yoktur.
- Bu, şeffaf çoklu imzadan (zincir üstünde herkese açık olan ve Zcash tarafından uzun süredir desteklenen) temelden farklıdır — FROST korumalı havuz içinde çalışır.
- DAO’lar, borsalar, saklama hizmetleri, ortak birikimler ve ekip hazineleri için kullanışlıdır — tek bir anahtarın arızalanmasının kabul edilemeyeceği her yerde.

---

## FROST basitçe nedir?

Üç iş ortağının her birinin bir anahtar parçasını elinde tuttuğunu düşünün. Ortak cüzdanlarından harcama yapmak için üç kişiden herhangi ikisinin anlaşması ve birlikte imzalaması gerekir. Ortaya çıkan işlem, sıradan bir bireysel gönderimle aynı görünür — hiçbir gözlemci, blokzincire bakarak birden fazla kişinin dahil olduğunu anlayamaz.

FROST (**Esnek Tur Optimize Edilmiş Schnorr Eşikli İmzalar**), korumalı Zcash için bunu mümkün kılan kriptografik protokoldür. Chelsea Komlo (Waterloo Üniversitesi / Zcash Foundation) ve Ian Goldberg tarafından oluşturulmuştur.

Temel özellikleri:

- **Eşikli**: Yalnızca t-of-n imzalayanın katılması gerekir (ör. 2-of-3, 3-of-5)
- **Korumalı**: Orchard gizlilik havuzunda çalışır — tutarlar, gönderen ve alıcı gizli kalır
- **Ayırt edilemez**: Son imza, diğer herhangi bir Zcash korumalı işlem imzası gibi görünür
- **Gözetimsiz**: Tek bir taraf bile anahtarın tamamını elinde tutmaz — koordinatör bile

---

## Eşikli saklamayı ne zaman kullanmalısınız?

Eşikli saklama, **tek bir anahtarın veya kişinin kaybının fonların kaybına yol açmaması gerektiğinde** anlamlıdır.

| Durum | Eşikli saklama neden işe yarar |
|-----------|----------------------------|
| **DAO veya ekip hazinesi** | Hiçbir yönetici fonları tek başına çekemez; konsensüs gerekir |
| **Borsa veya saklama hizmeti** | Anahtar riskini güvenlik bölgeleri ya da çalışanlar arasında dağıtır |
| **Kişisel soğuk saklama (güvendiğiniz aile üyeleriyle)** | Siz ve iki aile üyeniz arasında 2-of-3 — vefat etseniz veya erişiminizi kaybetseniz bile fonlar kaybolmaz |
| **Emanet** | Alıcı, satıcı ve arabulucu birer pay tutar; iki taraf anlaşınca fonlar serbest bırakılır |
| **Yüksek değerli hibe ödemesi** | ZCG tarzı: ödeme yapılmadan önce birden fazla bağımsız imzalayanın onayını gerektirir |
| **Geliştirici anahtar yönetimi** | İçeriden gelebilecek tehditleri önler — hiçbir mühendis protokol fonlarını tek başına çekemez |

Tek başınıza kontrol ettiğiniz kişisel bir cüzdan, küçük tutarlar veya ek koordinasyon yükünün risk azaltımından ağır bastığı durumlar için muhtemelen eşikli saklamaya **ihtiyacınız yoktur**.

---

## Şeffaf çoklu imzadan farkı nedir?

Zcash, t-adresinden harcama yapmak için birden fazla anahtar gerektiren şeffaf çoklu imzayı uzun süredir destekliyor. Ancak şeffaf çoklu imzanın ciddi bir gizlilik bedeli vardır: **Çoklu imza yapısı, tüm açık anahtarlar ve tüm imzalayanlar blokzincirde görünür**.

FROST, korumalı havuz içinde çalışarak bu sorunu çözer:

| | Şeffaf çoklu imza | FROST eşikli (korumalı) |
|--|---------------------|--------------------------|
| Havuz | Şeffaf (herkese açık) | Orchard (korumalı) |
| Zincir üstünde görünen imzalayanlar | Evet — tüm açık anahtarlar açığa çıkar | Hayır — tek imzalayanlı bir harcamadan ayırt edilemez |
| Tutarlar görünür mü | Evet | Hayır |
| Gereken koordinasyon | Zincir üstü betik | Zincir dışı iletişim turu |
| Gizlilik | Yok | Tam korumalı gizlilik |

---

## Ödünleşimler ve sınırlamalar

FROST güçlüdür, ancak kullanmadan önce anlamanız gereken gerçek ödünleşimleri de beraberinde getirir:

### Koordinasyon yükü
İmzalayanların bir imzalama turunu tamamlamak için aynı anda (veya neredeyse aynı anda) çevrimiçi olması gerekir. Eğer t imzalayanınız farklı saat dilimlerine dağılmışsa veya bağlantıları güvenilir değilse, harcama yapmak tek başına kullanılan bir cüzdanda gerekmeyen koordinasyonu gerektirir.

### Yeterli katılım yoksa imzalama yapılamaz
Yeterli sayıda anahtar sahibi müsait değilse (hasta, seyahatte veya yanıt vermiyorsa), fonlar geçici olarak harcanamaz. Eşiğinizi ve pay sayısını dikkatle seçin — 2-of-3, 2-of-2’den daha dayanıklıdır.

### Anahtar oluşturma töreni
FROST kurulumu, tüm n katılımcının aynı anda çevrimiçi olduğu dağıtık bir anahtar oluşturma (DKG) töreni gerektirir. Bu tek seferlik bir etkinliktir, ancak dikkatle yürütülmelidir — DKG sırasında katılımcıların güvenliği ihlal edilirse güvenlik zedelenir.

### Araçlar hâlâ olgunlaşıyor
Korumalı Zcash için FROST görece yenidir. IETF standardı (draft-irtf-cfrg-frost) olgunlaşmıştır, ancak cüzdan entegrasyonları sınırlıdır. Standart tek anahtarlı bir cüzdana kıyasla bazı pürüzlerle karşılaşmayı bekleyin.

### Kurtarma karmaşıklığı
Bir parçayı kaybetmek dünyanın sonu değildir (eşik sisteminin amacı da budur), ancak kurtarma planları önceden belgelenmelidir. Yedekleri kim tutuyor? Aynı anda iki parça kaybolursa ne olur?

---

## Zcash üzerinde FROST ile kimler çalışıyor?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation, çalışan bir FROST uygulaması ve demo sitesi yayımladı. Bu, test ve geliştirme için kullanılan referans uygulamadır.

### Ywallet FROST Demosu
Ywallet, erken bir FROST demo entegrasyonuna sahipti; bu entegrasyon [Ywallet FROST Demo kılavuzunda](/guides/Ywallet_FROST_Demo) ele alınmıştır. Ywallet artık bakımı yapılmıyor ve Ironwood için güncellenmeyecek; bu nedenle kılavuzu bugün çalıştırılacak bir şey olarak değil, arka plan bilgisi olarak okuyun. Aynı geliştiricinin ürünü olan Zkool, bakımı yapılan halefidir ve özellikleri arasında FROST çoklu imzayı listeler.

### ZecHub Hackathon 2026 — FROST Başlığı Projeleri

FROST başlığı, ZecHub Hackathon 2026’daki en rekabetçi başlıktı. Öne çıkan projeler:

- **ZecVault** — ana ağda sonuçlandırılan 2-of-3 korumalı emanet (FROST eşiği)
- **Steward** — kurtarmaya odaklı bir kullanıcı deneyimiyle korumalı Zcash için eşikli saklama

### Coinbase
Coinbase, eşikli imzalama sistemleri için üretim ortamında kullanılabilecek bir FROST uygulaması geliştirdi (Bitcoin için); ön işleme aşamasını kaldıran ve toplayıcı rolünü tüm katılımcılara dağıtan değişiklikler yaptı. Edindikleri deneyim, FROST güvenlik modelini üretim ölçeğinde doğruluyor.

---

## Bir imzalama oturumu nasıl işler (basitleştirilmiş)

1. **Kurulum (bir kez):** Tüm n katılımcı dağıtık bir anahtar oluşturma (DKG) töreni yürütür. Her biri özel bir parça alır; ortak bir açık anahtar türetilir. Hiçbir taraf özel anahtarın tamamını bilmez.

2. **İmzalayanları koordine edin:** Harcama gerektiğinde bir koordinatör (imzalayanlardan biri olabilir), imzalamaya istekli t katılımcıdan kriptografik taahhütleri toplar.

3. **1. Tur:** Katılan her imzalayan bir nonce üretir ve bir kriptografik taahhüdü yayınlar (herkese açık, hassas olmayan).

4. **2. Tur:** Katılan her imzalayan, özel parçasını kullanarak kısmi imzasını hesaplar ve yayınlar.

5. **Birleştirme:** Koordinatör, t kısmi imzayı tek bir nihai Schnorr imzasında birleştirir — zincir üstünde tek bir tarafın imzasından ayırt edilemez.

6. **Yayınlama:** İşlem, her zamanki gibi Zcash ağına yayınlanır.

Herhangi bir imzalayan hatalı bir kısmi imza gönderirse protokol bunu tespit eder ve durdurulur (bu kişi gelecekteki oturumlardan çıkarılır). Koordinasyon zincir dışında gerçekleşir — blokzincir yalnızca nihai işlemi görür.

---

## Eşik parametrelerinizi seçme

| Kurulum | Dayanıklılık | Risk |
|-------|-----------|------|
| 1-of-1 | Dayanıklılık yok — tek hata noktası | Anahtarın kaybı = kalıcı kayıp |
| 2-of-2 | Her iki imzalayan da gerekir — hata toleransı yok | Birinin müsait olmaması = fonların dondurulması |
| 2-of-3 | Bir parça kaybolabilir veya kullanılamayabilir | 3-of-5’e kıyasla daha düşük güvenlik payı |
| 3-of-5 | İki parça kaybolabilir; güçlü güvenlik | Daha fazla koordinasyon yükü |
| 3-of-7 | Kurumsal düzey; iki arızayı tolere eder | Yüksek koordinasyon maliyeti |

Çoğu ekip için pratik bir başlangıç noktası: **2-of-3** (dayanıklı, en az koordinasyon) veya **3-of-5** (kurumsal, daha yüksek güvenlik).

---

## İlgili Sayfalar

- [FROST — Teknik Derinlemesine İnceleme](FROST.md) — protokolün kriptografik ayrıntıları (DKG, imzalama turları, güvenlik kanıtları)
- [Ywallet FROST Demo Kılavuzu](/guides/Ywallet_FROST_Demo) — arka plan bilgisi, Ywallet artık bakımı yapılmıyor
- [Görüntüleme Anahtarları](Viewing_Keys.md) — korumalı adreslere salt okunur erişim (eşikli saklamayı tamamlayıcı)
- [Zcash Korumalı Varlıklar](Zcash_Shielded_Assets.md) — ZSA ihracı için FROST da temel altyapıdır

## Kaynaklar

- [FROST araştırma makalesi (Komlo ve Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST taslak standardı (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST uygulaması](https://frost.zfnd.org)
- [Chelsea Komlo — Eşikli İmzalar Nedir? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Eşikli Dijital İmzalar](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Sağlam Asenkron Schnorr Eşikli İmzalar (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
