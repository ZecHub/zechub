<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Shielded ZEC için FROST ve Eşikli Saklama

> FROST protokolünün tüm kriptografik ayrıntıları için [FROST teknik sayfasına](FROST.md) bakın.

FROST eşikli saklama, Zcash sohbetlerinde sürekli gündeme geliyor — ZecHub Hackathon 2026'nın en popüler kategorisiydi — ancak kavram her zaman sade bir dille açıklanmıyor. Bu sayfa, bunun ne anlama geldiğini, buna gerçekten ne zaman ihtiyaç duyduğunuzu, ödünleşimleri ve bugün hangi araçların bunu desteklediğini ele alıyor.

---

## Kısaca

- **FROST**, bir anahtar sahibi grubunun, tek bir kişinin tam özel anahtarı elinde tutmasına gerek kalmadan shielded bir Zcash adresini ortaklaşa kontrol etmesini sağlar.
- **t-of-n** eşiği şu anlama gelir: harcama yapmak için t kişinin birlikte imza atması gerekir; t-1 ya da daha az kişi fonları tek başına hareket ettiremez.
- İşlemler, diğer herhangi bir shielded işlem gibi görünür — zincir üzerinde eşikli imzalamanın kullanıldığını ortaya çıkaran hiçbir iz yoktur.
- Bu, şeffaf multisig'den temelde farklıdır (zincir üzerinde herkese açıktır ve Zcash bunu uzun süredir desteklemektedir) — FROST, shielded havuzun içinde çalışır.
- DAO'lar, borsalar, saklama hizmetleri, ortak birikimler ve ekip hazineleri için — yani anahtar başarısızlığında tek hata noktasının kabul edilemez olduğu her yerde — faydalıdır.

---

## Sade bir dille FROST nedir?

Üç iş ortağının her birinin bir anahtar parçası tuttuğunu hayal edin. Ortak cüzdanlarından harcama yapmak için üçünün herhangi ikisinin anlaşması ve birlikte imza atması gerekir. Ortaya çıkan işlem, normal bir bireysel gönderimle tamamen aynı görünür — blokzinciri üzerinden bakan hiçbir gözlemci birden fazla kişinin dahil olduğunu anlayamaz.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**), bunu shielded Zcash için mümkün kılan kriptografik protokoldür. Chelsea Komlo (University of Waterloo / Zcash Foundation) ve Ian Goldberg tarafından oluşturulmuştur.

Temel özellikleri:

- **Eşikli**: yalnızca t-of-n imzacı katılmak zorundadır (ör. 2-of-3, 3-of-5)
- **Shielded**: Orchard gizlilik havuzunun içinde çalışır — tutarlar, gönderici ve alıcı gizli kalır
- **Ayırt edilemez**: nihai imza, diğer herhangi bir Zcash shielded işlemi gibi görünür
- **Gözetimsiz**: hiçbir taraf tam anahtarı asla elinde tutmaz — koordinatör bile

---

## Eşikli saklamayı ne zaman kullanmalısınız?

Eşikli saklama, **tek bir anahtarı ya da tek bir kişiyi kaybetmenin fonları kaybetmek anlamına gelmemesi gerektiğinde** mantıklıdır.

| Durum | Eşikli saklama neden yardımcı olur |
|-----------|----------------------------|
| **DAO veya ekip hazinesi** | Hiçbir yönetici fonları tek taraflı boşaltamaz; uzlaşma gerekir |
| **Borsa veya saklayıcı** | Anahtar riskini güvenlik bölgeleri veya çalışanlar arasında dağıtır |
| **Kişisel soğuk saklama (güvenilen aile üyeleriyle)** | Siz + iki aile üyesi arasında 2-of-3 — ölürseniz ya da erişimi kaybederseniz fonlar kaybolmaz |
| **Emanet** | Alıcı, satıcı ve hakem birer pay tutar; ikisi anlaştığında fonlar serbest bırakılır |
| **Yüksek değerli hibe ödemesi** | ZCG tarzı: ödeme yapılmadan önce birden fazla bağımsız imzacı gerekir |
| **Geliştirici anahtar yönetimi** | İç tehditleri önler — tek bir mühendis protokol fonunu boşaltamaz |

Tek başınıza kontrol ettiğiniz kişisel bir cüzdan, küçük tutarlar veya ek koordinasyon yükünün risk azalımından daha ağır bastığı durumlar için muhtemelen eşikli saklamaya **ihtiyacınız yoktur**.

---

## Şeffaf multisig'den farkı nedir?

Zcash uzun süredir şeffaf multisig'i desteklemektedir — bir t-address'ten harcama yapmak için birden fazla anahtar gerekir. Ancak şeffaf multisig'in önemli bir gizlilik maliyeti vardır: **multisig yapısı, tüm açık anahtarlar ve tüm imzacılar blokzincirinde görünür durumdadır**.

FROST bunu shielded havuzun içinde çalışarak çözer:

| | Şeffaf multisig | FROST eşiği (shielded) |
|--|---------------------|--------------------------|
| Havuz | Şeffaf (halka açık) | Orchard (shielded) |
| İmzacılar zincir üzerinde görünür mü? | Evet — tüm açık anahtarlar açığa çıkar | Hayır — tek imzacılı bir harcamadan ayırt edilemez |
| Tutarlar görünür mü? | Evet | Hayır |
| Koordinasyon gerekir mi? | Zincir üstü script | Zincir dışı iletişim turu |
| Gizlilik | Yok | Tam shielded gizlilik |

---

## Ödünleşimler ve sınırlamalar

FROST güçlüdür, ancak kullanmadan önce anlamanız gereken gerçek ödünleşimlerle gelir:

### Koordinasyon yükü
İmzacıların bir imzalama turunu tamamlamak için aynı anda (veya buna çok yakın zamanlarda) çevrimiçi olmaları gerekir. Eğer t imzacınız farklı saat dilimlerine yayılmışsa veya bağlantıları güvenilir değilse, harcama yapmak tek kişilik bir cüzdanda olmayan bir koordinasyon gerektirir.

### Çoğunluk yoksa imzalama yok
Yeterli sayıda anahtar sahibi müsait değilse (hasta, seyahatte, yanıt vermiyor), fonlar geçici olarak harcanamaz hale gelir. Eşiğinizi ve pay sayınızı dikkatle seçin — 2-of-3, 2-of-2'ye göre daha dayanıklıdır.

### Anahtar üretim töreni
FROST kurulumu, tüm n katılımcının birlikte çevrimiçi olduğu dağıtık bir anahtar üretim (DKG) töreni gerektirir. Bu tek seferlik bir olaydır, ancak dikkatle yapılmalıdır — katılımcılar DKG sırasında ele geçirilirse güvenlik zedelenir.

### Araçlar hâlâ olgunlaşma aşamasında
Shielded Zcash için FROST nispeten yenidir. IETF standardı (draft-irtf-cfrg-frost) olgundur, ancak cüzdan entegrasyonları sınırlıdır. Standart tek anahtarlı bir cüzdana kıyasla bazı pürüzlerle karşılaşmayı bekleyin.

### Kurtarma karmaşıklığı
Bir parçanın kaybolması dünyanın sonu değildir (zaten eşik mantığının amacı budur), ancak kurtarma planları önceden belgelenmelidir. Yedekleri kim tutuyor? Aynı anda iki parça kaybolursa ne olur?

---

## Zcash üzerinde FROST ile kimler inşa ediyor?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation çalışan bir FROST uygulaması ve bir demo sitesi yayınladı. Bu, test ve geliştirme için kullanılan referans uygulamadır.

### YWallet FROST Demo
YWallet (yüksek performanslı bir Zcash cüzdanı), erken aşamada bir FROST demo entegrasyonuna sahiptir. Adım adım talimatlar için [YWallet FROST Demo rehberine](/guides/Ywallet_FROST_Demo) bakın.

### ZecHub Hackathon 2026 — FROST Kategori Projeleri

FROST kategorisi, ZecHub Hackathon 2026'da en rekabetçi kategoriydi. Dikkat çeken projeler:

- **ZecVault** — ana ağda sonuçlandırılmış 2-of-3 shielded emanet (FROST eşiği)
- **Steward** — shielded Zcash için kurtarma odaklı bir UX'e sahip eşikli saklama

### Coinbase
Coinbase, eşikli imzalama sistemleri için (Bitcoin üzerinde) üretim düzeyinde bir FROST uygulaması geliştirdi; ön işleme aşamasını kaldıran ve toplayıcı rolünü tüm katılımcılar arasında dağıtan değişiklikler yaptı. Deneyimleri, FROST'un güvenlik modelini üretim ölçeğinde doğrulamaktadır.

---

## Bir imzalama oturumu nasıl çalışır? (basitleştirilmiş)

1. **Kurulum (bir kez):** Tüm n katılımcı, dağıtık bir anahtar üretim (DKG) töreni yürütür. Her biri özel bir parça alır; ortak bir açık anahtar türetilir. Hiçbir taraf tam özel anahtarı bilmez.

2. **İmzacıları koordine etme:** Harcama gerektiğinde, bir koordinatör (imzacılardan biri olabilir) imzalamaya istekli t katılımcıdan taahhütleri toplar.

3. **1. Tur:** Katılan her imzacı bir nonce üretir ve bir taahhüt yayınlar (açık, hassas olmayan).

4. **2. Tur:** Katılan her imzacı, özel parçasını kullanarak kısmi imzasını hesaplar ve bunu yayınlar.

5. **Birleştirme:** Koordinatör, t adet kısmi imzayı tek bir nihai Schnorr imzasında birleştirir — zincir üzerinde tek taraflı bir imzadan ayırt edilemez.

6. **Yayınlama:** İşlem, normal şekilde Zcash ağına yayınlanır.

Herhangi bir imzacı kötü bir kısmi imza gönderirse, protokol bunu tespit eder ve işlemi durdurur (gelecekteki oturumlardan dışlanırlar). Koordinasyon zincir dışında gerçekleşir — blokzinciri yalnızca nihai işlemi görür.

---

## Eşik parametrelerinizi seçmek

| Kurulum | Dayanıklılık | Risk |
|-------|-----------|------|
| 1-of-1 | Dayanıklılık yok — tek hata noktası | Anahtar kaybı = kalıcı kayıp |
| 2-of-2 | Her iki imzacı da gerekli — hata toleransı yok | Biri yoksa = fonlar donar |
| 2-of-3 | Bir parça kaybolabilir veya erişilemez olabilir | 3-of-5'e göre daha düşük güvenlik payı |
| 3-of-5 | İki parça kaybolabilir; güçlü güvenlik | Daha fazla koordinasyon yükü |
| 3-of-7 | Kurumsal düzey; iki arızayı tolere eder | Yüksek koordinasyon maliyeti |

Çoğu ekip için pratik bir başlangıç noktası: **2-of-3** (dayanıklı, asgari koordinasyon) veya **3-of-5** (kurumsal, daha yüksek güvenlik).

---

## İlgili Sayfalar

- [FROST — Teknik Derinlemesine İnceleme](FROST.md) — protokolün kriptografik ayrıntıları (DKG, imzalama turları, güvenlik ispatları)
- [YWallet FROST Demo Rehberi](/guides/Ywallet_FROST_Demo) — adım adım uygulamalı demo
- [FROST Demo (frostdemo)](/guides/frostdemo) — Zcash Foundation demo anlatımı
- [Viewing Keys](Viewing_Keys.md) — shielded adreslere salt okunur erişim (eşikli saklamayı tamamlayıcı)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST, ZSA ihracı için de temel altyapıdır

## Kaynaklar

- [FROST araştırma makalesi (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST taslak standardı (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST uygulaması](https://frost.zfnd.org)
- [Chelsea Komlo — Eşikli İmzalar Nedir? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Eşikli Dijital İmzalar](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Güçlü Eşzamansız Schnorr Eşikli İmzalar (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
