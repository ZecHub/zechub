<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zingo 2.0 - Pepper Sync

## Özet

* Pepper Sync, Zingo! 2.0'da tanıtılan, Zingo Labs tarafından geliştirilen açık kaynaklı Zcash cüzdanının eşitleme motorudur.
* Zinciri büyük, ardışık parçalar hâlinde taramak yerine doğrusal olmayan eşitleme kullanır; böylece bakiyeniz ve işlemleriniz çok daha kısa sürede görünür.
* İlerleme sürekli kaydedilir. Bağlantı kesilirse veya uygulama kapanırsa eşitleme baştan başlamak yerine kaldığı yerden devam eder.
* Eşitleme tamamlanmadan harcama yapabilirsiniz.
* Korumalı işlemler tüm süreç boyunca gizli kalır.

## Temel Açıklama

Zingo 2.0, Zcash topluluğu için geliştirilmiş, hafif ve açık kaynaklı Zingo! cüzdanının sürümüdür. Bu sürüm, cüzdanların blokzincire nasıl bağlandığını baştan ele alan önemli bir yükseltme olan Pepper Sync'i tanıttı. Sonraki sürümlerde de Pepper Sync kullanılmaya devam ediyor: mevcut mobil sürüm olan [Zingo 3.0](https://github.com/zingolabs/zingo-mobile/releases/tag/zingo-3.0.0-324) (31 Ekim 2026), NU7 desteği ve yerleşik takaslar ekliyor.

Geçmişte eşitleme son derece yavaş, hatalara açık ve kaynakları yoğun kullanan bir süreç olabiliyor, bazen de kullanıcıları baştan başlamaya zorluyordu. Pepper Sync tüm bunları değiştiriyor. Korumalı işlemlerin gizliliğini bütünüyle korurken eşitlemeyi daha hızlı, daha akıcı ve daha güvenilir hâle getiriyor ve cihazınızdan daha az kaynak kullanıyor.

İster Zcash'i ilk kez deneyen yepyeni bir kullanıcı, ister birden fazla korumalı cüzdanı yöneten uzun süredir topluluğun üyesi olun, Pepper Sync deneyimi çok daha kullanışlı ve keyifli hâle getiriyor.

### Pepper Sync'in temel özellikleri

Pepper Sync çeşitli iyileştirmeler sunuyor:

- Çok Daha Hızlı Eşitleme - Cüzdanınız saatler değil, dakikalar içinde hazır olur.
- Akıllı Güncellemeler - Veriler daha küçük parçalar hâlinde işlenerek tam tarama ihtiyacı önlenir.
- Kesintilere Dayanıklı - Bağlantınız kesilirse eşitleme kaldığı yerden devam eder.
- Hafif ve Verimli - Telefonlar, dizüstü bilgisayarlar ve gücü daha düşük diğer cihazlar için optimize edilmiştir.
- Daha Anlaşılır Geri Bildirim - Gerçek zamanlı ilerleme güncellemeleri kafa karışıklığını azaltır.
- Gizliliği Korur - Korumalı işlemler süreç boyunca gizli kalır.

### Öncekine göre neler daha iyi?

Zingo! uygulamasının eski sürümleri, uzun eşitleme süreleri, belirsiz hata yönetimi ve yoğun kaynak kullanımı nedeniyle kullanıcıları sık sık hayal kırıklığına uğratıyordu. Pepper Sync bu yaygın sorunları gideriyor:

| Özellik            | Önceki Zingo Sürümleri                | Pepper Sync ile Zingo 2.0                   |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Eşitleme Hızı         | Daha yavaş, özellikle ilk kurulumda      | İlk ve sonraki eşitlemeler çok daha hızlı         |
| Hata Yönetimi     | Ara sıra takılmalar ve belirsiz hatalar | Otomatik kurtarma ile geliştirilmiş kararlılık   |
| Kullanıcı Deneyimi    | Eşitleme yeni kullanıcılar için “anlaşılmaz” geliyordu        | Daha anlaşılır durum ve güncellemelerle şeffaf |
| Cihaz Performansı | Yüksek CPU/bellek kullanımı                  | Kaynakları akıcı biçimde kullanacak şekilde optimize edilmiş            |

Kısacası, eşitleme artık daha hızlı, daha güvenilir ve daha kolay anlaşılır.

## Görsel / Benzetme

Eski bir cüzdanın eşitlemesini, hakkında herhangi bir şey söylemenize izin verilmeden önce çok uzun bir kitabı baştan başlayarak yüksek sesle okumaya benzetebilirsiniz. Yarıda durursanız, birinci sayfadan yeniden başlarsınız. Pepper Sync aynı kitabı okur ama bir ayraç kullanır, sizin için önemli bölümleri önce okur ve son sayfayı bitirmeden hikâye hakkında konuşmanıza olanak tanır.

Önemli olan ayraçtır. Önceki tüm sürümler kesintiye uğrayan eşitlemeyi boşa harcanmış emek olarak görürken Pepper Sync bunu duraklatma olarak ele alır.

### Görsel kılavuzlar

- Ayrıntılı Akış - Sürecin tamamını gösterir. ![Ayrıntılı akış](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Basitleştirilmiş Akış - Günlük kullanıcılar için hızlı bir genel bakış. ![Basitleştirilmiş akış](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Derinlemesine İnceleme

### Pepper Sync nasıl çalışır? (basit görünüm)

Blokzinciri büyük ve hantal parçalar hâlinde yeniden taramak yerine Pepper Sync, ilerledikçe konumunuzu kaydederek küçük ve yönetilebilir adımlarla çalışır.

1. Bağlan - Cüzdan ağa bağlanır.
2. Blokları Getir - Veriler aşamalı olarak indirilir.
3. Doğrula - İşlemler doğrulanır.
4. Korumalı Note'ları İşle - Gizlilik her zaman korunur.
5. Bakiyeleri Güncelle - Cüzdan güvenli biçimde yenilenir.
6. İlerlemeyi Kaydet - Sorunsuz biçimde durur ve devam eder.
7. Tamamla - Cüzdan işlem yapmaya hazırdır.

## Kullanım Açısından Etkileri

### Pepper Sync'ten kimler yararlanır?

- Yeni Kullanıcılar - Gecikmeler nedeniyle vazgeçmeden cüzdanlarını hızlıca kurabilir.
- Günlük Kullanıcılar - Güvenilir eşitleme, korumalı ödemeleri günlük kullanım için pratik hâle getirir.
- Geliştiriciler ve Test Uzmanları - Daha kısa eşitleme süreleri, test döngülerinin hızlanması demektir.
- Mobil ve Hafif Cihazlar - Zingo artık kaynakları kısıtlı donanımlarda bile verimli çalışır.

### Zcash için neden önemlidir?

Zcash, kripto para alanındaki en güçlü gizlilik araçlarından biri olan korumalı işlemler üzerine kuruludur. Ancak gizlilik, yalnızca erişilebilir olduğunda işe yarar.

Pepper Sync şu yollarla yardımcı olur:

- Giriş engellerini azaltır - Yeni kullanıcılar hızla başlayabilir.
- Günlük kullanımı destekler - Korumalı adreslere güvenmek kolaylaşır.
- Ekosistemin büyümesini teşvik eder - Daha iyi bir cüzdan deneyimi, benimsenmeyi, uygulamaları ve hizmetleri artırır.

Cüzdan deneyimini iyileştirerek Pepper Sync, Zcash ekosisteminin tamamını güçlendirir.

### Başlangıç: Zingo 2.0 ile ilk kurulum

1. Cüzdanı İndirin - Doğru sürümü [zingolabs.org](https://zingolabs.org/) adresinden veya GitHub'in [mobil](https://github.com/zingolabs/zingo-mobile/releases) ve [masaüstü](https://github.com/zingolabs/zingo-pc/releases) sürüm sayfalarından indirin
2. Cüzdanınızı Kurun - Yeni bir cüzdan oluşturun veya mevcut bir kurtarma ifadesini kullanarak cüzdanınızı geri yükleyin. [Zingo 2.0 ve Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Pepper Sync'in Çalışmasına İzin Verin - Cüzdanınız güncellenirken ilerleme göstergelerini izleyin. [Pepper Sync'i çalıştırın](https://x.com/ZingoLabs/status/1961871338441724191)
4. Zcash'i Kullanmaya Başlayın - Eşitleme tamamlanır tamamlanmaz korumalı ZEC gönderip alın.
5. Kesintiler Konusunda Endişelenmeyin - Uygulama kapanırsa veya bağlantı kesilirse Pepper Sync otomatik olarak devam eder.

## Sık Yapılan Hatalar

**Pepper Sync'i başlı başına bir cüzdan sanmak**. Pepper Sync, Zingo! cüzdanının içindeki eşitleme motorudur; ayrı bir uygulama değildir. Zingo! cüzdanını yüklersiniz; arka planda çalışan Pepper Sync'tir.

**Daha hızlı eşitlemenin daha zayıf gizlilik anlamına geldiğini varsaymak**. Hız, blok verilerinin nasıl getirildiğinden, sıralandığından ve önbelleğe alındığından kaynaklanır; daha fazla bilgi açığa çıkarılmasından değil. Korumalı işlemler gizli kalır.

**Harcama yapmadan önce eşitlemenin tamamen tamamlanması gerektiğini varsaymak**. Eşitleme tamamlanmadan harcama yapmak, Pepper Sync'in öne çıkan özelliklerinden biridir. Bu nedenle cüzdanın Zincir ucuna ulaşmasını beklemeniz gerekmez.

## SSS - Sık sorulan sorular

**S: Cüzdanı her açtığımda yeniden tarama yapmam gerekiyor mu?**

C: Hayır. Pepper Sync ilerlemeyi kaydeder; böylece yalnızca son kaldığınız noktadan itibaren güncelleme yaparsınız.

**S: İnternet bağlantım kesilirse ne olur?**

C: Eşitleme duraklar ve baştan başlamadan daha sonra devam eder.

**S: Eşitleme sırasında gizliliğim güvende mi?**

C: Evet. Korumalı işlemler tamamen gizli kalır.

**S: İlk eşitleme ne kadar sürer?**

C: Cihazınıza ve internet bağlantınıza bağlı olarak genellikle saatler yerine dakikalar sürer.

**S: Eşitleme tamamlanmadan cüzdanı kullanabilir miyim?**

C: Evet. Pepper Sync, eşitleme tamamlanmadan harcama yapmayı destekler; bu nedenle cüzdanın Zincir ucuna ulaşmasını beklemeniz gerekmez.

## Sonuç

Zingo 2.0 Pepper Sync ile eşitleme, korumalı cüzdanların artık en büyük sorunlarından biri değil. Artık hızlı, kararlı ve kullanıcı dostu; yeni kullanıcıların önündeki engelleri azaltıyor ve günlük kullanımı çok daha pratik hâle getiriyor.

Kullanıcılar için bu, daha az beklemek ve daha fazla gizlilik demek. Geliştiriciler için üzerine inşa edilebilecek daha sağlam bir temel demek. Zcash ekosistemi içinse korumalı işlemleri herkesin erişimine açma yolunda atılmış bir adım daha demek.

Zingo 2.0 ve Pepper Sync yalnızca bir yükseltme değil; gizli ve kullanışlı kripto para alanında ileriye doğru büyük bir adımdır.

## İlgili Sayfalar

- [Zcash Cüzdan Eşitleme](/zcash-tech/zcash-wallet-syncing) — cüzdan eşitlemesinin Zcash ekosisteminde nasıl çalıştığını açıklar.
- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) — Zingo gibi hafif bir cüzdanın eşitlendiği altyapı.
- [Zaino](/zcash-tech/zaino) — Zingo ekibi tarafından geliştirilen dizinleyici.
- [Cüzdanlar](/wallets) — Zcash cüzdanlarının ve özelliklerinin kapsamlı dizini.

## Daha Fazla Bilgi

- [Zingo! GitHub Deposu](https://github.com/zingolabs/zingolib)
- [Zcash Topluluk Forumu](https://forum.zcashcommunity.com/)
- Resmî Duyurular - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
