---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zingo 2.0 - Pepper Sync

## Kısaca

* Pepper Sync, Zingo Labs tarafından geliştirilen açık kaynaklı Zcash cüzdanı Zingo! 2.0 ile sunulan senkronizasyon motorudur.
* Zinciri büyük sıralı parçalar halinde taramak yerine doğrusal olmayan senkronizasyon kullanır; böylece bakiyeniz ve işlemleriniz çok daha erken görünür.
* İlerleme sürekli kaydedilir. Bağlantı koparsa veya uygulama kapanırsa, senkronizasyon baştan başlamak yerine durduğu yerden devam eder.
* Senkronizasyon tamamlanmadan önce harcama yapabilirsiniz.
* Shielded işlemler tüm süreç boyunca gizli kalır.

## Temel Açıklama

Zingo 2.0, Zcash topluluğu için geliştirilmiş hafif, açık kaynaklı Zingo! cüzdanının en yeni sürümüdür. Bu sürümün yıldızı, cüzdanların blokzincirle nasıl bağlantı kurduğunu tamamen yeniden düşünen büyük bir yükseltme olan Pepper Sync'tir.

Geçmişte senkronizasyon acı verecek kadar yavaş, hataya açık ve kaynak yoğun hissettirebiliyordu; hatta bazen kullanıcıları her şeye sıfırdan başlamaya zorluyordu. Pepper Sync bunu tamamen değiştiriyor. Senkronizasyonu daha hızlı, daha akıcı, daha güvenilir ve cihazınız için daha az yorucu hale getirirken shielded işlemlerin gizliliğini de tamamen koruyor.

İster Zcash'i ilk kez deneyen yepyeni bir kullanıcı olun, ister birden fazla shielded cüzdan yöneten uzun süreli bir topluluk üyesi olun, Pepper Sync bu deneyimi çok daha pratik ve keyifli hale getiriyor.

### Pepper Sync'in temel özellikleri

Pepper Sync çeşitli iyileştirmeler sunar:

- Çok Daha Hızlı Senkronizasyon - Cüzdanınız saatler içinde değil, dakikalar içinde hazır olur.
- Akıllı Güncellemeler - Veriler daha küçük parçalar halinde işlenir, tam yeniden taramalardan kaçınılır.
- Kesintilere Dayanıklı - Bağlantınız koparsa senkronizasyon kaldığı yerden devam eder.
- Hafif ve Verimli - Telefonlar, dizüstüler ve daha düşük güçlü diğer cihazlar için optimize edilmiştir.
- Daha Net Geri Bildirim - Gerçek zamanlı ilerleme güncellemeleri kafa karışıklığını azaltır.
- Gizliliği Koruyan - Shielded işlemler süreç boyunca gizli kalır.

### Öncesine göre daha iyi olan ne

Zingo'nun eski sürümleri uzun senkronizasyon süreleri, belirsiz hata yönetimi ve yüksek kaynak kullanımı nedeniyle kullanıcıları sık sık hayal kırıklığına uğratıyordu. Pepper Sync bu yaygın sorunları çözüyor:

| Özellik            | Önceki Zingo Sürümleri                | Pepper Sync ile Zingo 2.0                  |
| ------------------ | ------------------------------------- | ------------------------------------------ |
| Senkronizasyon Hızı| Daha yavaş, özellikle ilk kurulumda   | İlk ve sürekli senkronizasyon çok daha hızlı |
| Hata Yönetimi      | Ara sıra takılmalar ve belirsiz hatalar | Otomatik toparlanma ile gelişmiş kararlılık |
| Kullanıcı Deneyimi | Senkronizasyon yeni başlayanlara "kapalı kutu" gibi geliyordu | Daha net durum ve güncellemelerle şeffaf |
| Cihaz Performansı  | Yüksek CPU/bellek kullanımı           | Sorunsuz kaynak kullanımı için optimize edilmiş |

Kısacası: senkronizasyon artık daha hızlı, daha güvenilir ve daha anlaşılır.

## Görsel / Analoji

Eski bir cüzdan senkronizasyonunu, onun hakkında bir şey söylemenize izin verilmeden önce çok uzun bir kitabı ilk sayfadan başlayarak yüksek sesle okumaya benzetin. Yarıda durursanız, yine ilk sayfadan başlarsınız. Pepper Sync aynı kitabı okur, ama bir ayraç kullanır, önce sizin için önemli bölümleri okur ve son sayfayı bitirmeden önce hikâye hakkında konuşmanıza izin verir.

Ayraç burada en önemli kısımdır. Önceki tüm sürümler kesintiye uğrayan bir senkronizasyonu boşa gitmiş emek olarak görüyordu; Pepper Sync ise bunu bir duraklama olarak görüyor.

### Görsel rehberler

- Ayrıntılı Akış - Tüm süreci gösterir. ![Ayrıntılı Akış](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Basitleştirilmiş Akış - Günlük kullanıcılar için hızlı görünüm. ![Basitleştirilmiş Akış](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Derinlemesine İnceleme

### Pepper Sync nasıl çalışır (basit görünüm)

Pepper Sync, blokzinciri devasa ve hantal parçalar halinde yeniden taramak yerine küçük, yönetilebilir adımlarla çalışır ve bunu yaparken yerinizi her zaman kaydeder.

1. Bağlan - Cüzdan ağla bağlantı kurar.
2. Blokları Al - Veriler kademeli olarak indirilir.
3. Doğrula - İşlemler doğrulanır.
4. Shielded Notları İşle - Gizlilik her zaman korunur.
5. Bakiyeleri Güncelle - Cüzdan güvenli şekilde yenilenir.
6. İlerlemeyi Kaydet - Sorunsuz şekilde durur ve devam eder.
7. Bitir - Cüzdan işlem yapmaya hazırdır.

## Pratik Sonuçlar

### Pepper Sync'ten kimler faydalanır?

- Yeni Kullanıcılar - Gecikmeler nedeniyle cesaretleri kırılmadan cüzdanlarını hızlıca kurabilir.
- Günlük Kullanıcılar - Güvenilir senkronizasyon, shielded ödemeleri günlük kullanım için pratik hale getirir.
- Geliştiriciler ve Test Uzmanları - Daha kısa senkronizasyon süreleri daha hızlı test döngüleri anlamına gelir.
- Mobil ve Hafif Cihazlar - Zingo artık kaynakları sınırlı donanımlarda bile verimli çalışır.

### Zcash için neden önemlidir

Zcash, kripto para dünyasındaki en güçlü gizlilik araçlarından biri olan shielded işlemler etrafında inşa edilmiştir. Ancak gizlilik ancak erişilebilir olduğunda faydalıdır.

Pepper Sync buna şu yollarla yardımcı olur:

- Giriş engellerini azaltır - Yeni kullanıcılar hızlıca başlayabilir.
- Günlük kullanılabilirliği destekler - Shielded adreslere güvenmek daha kolay hale gelir.
- Ekosistem büyümesini teşvik eder - Daha iyi bir cüzdan deneyimi daha fazla benimsenme, uygulama ve hizmet getirir.

Pepper Sync, cüzdan deneyimini iyileştirerek tüm Zcash ekosistemini güçlendirir.

### Başlarken: Zingo 2.0 ile ilk kurulum

1. Cüzdanı İndirin - Doğru sürümü [Zingo GitHub sürümleri sayfasından](https://github.com/zingolabs/zingolib) edinin
2. Cüzdanınızı Kurun - Yeni bir cüzdan oluşturun veya mevcut bir seed phrase'den geri yükleyin. [Zingo Labs ile Zingo 2.0](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Pepper Sync'in Çalışmasına İzin Verin - Cüzdanınız güncellenirken ilerleme göstergelerini izleyin. [Pepper Sync Çalışıyor](https://x.com/ZingoLabs/status/1961871338441724191)
4. Zcash Kullanmaya Başlayın - Senkronizasyon tamamlanır tamamlanmaz shielded ZEC gönderip alın.
5. Kesintiler İçin Endişelenmeyin - Uygulama kapanırsa veya bağlantı koparsa Pepper Sync otomatik olarak devam eder.

## Yaygın Hatalar

**Pepper Sync'i başlı başına bir cüzdan sanmak**. Pepper Sync, ayrı bir uygulama değil, Zingo! cüzdanının içindeki senkronizasyon motorudur. Siz Zingo'yu kurarsınız; Pepper Sync onun altında çalışan bileşendir.

**Daha hızlı senkronizasyonun daha zayıf gizlilik anlamına geldiğini varsaymak**. Hız, daha fazla bilgi açığa çıkmasından değil, blok verisinin nasıl alındığı, sıralandığı ve önbelleğe alındığından kaynaklanır. Shielded işlemler süreç boyunca gizli kalır.

**Harcama yapabilmek için tamamen senkronize olmanız gerektiğini varsaymak**. Senkronizasyon tamamlanmadan harcama yapabilmek, Pepper Sync'in öne çıkan özelliklerinden biridir; bu yüzden cüzdanın zincirin en ucuna ulaşmasını beklemeniz gerekmez.

## SSS - Yaygın sorular

**S: Cüzdanı her açtığımda yeniden tarama yapmam gerekiyor mu?**

C: Hayır. Pepper Sync ilerlemeyi kaydeder, bu yüzden yalnızca son noktadan itibaren güncelleme yaparsınız.

**S: İnternet bağlantım kesilirse ne olur?**

C: Senkronizasyon duraklar ve daha sonra yeniden başlamadan devam eder.

**S: Senkronizasyon sırasında gizliliğim güvende mi?**

C: Evet. Shielded işlemler tamamen gizli kalır.

**S: İlk senkronizasyon ne kadar sürer?**

C: Cihazınıza ve internetinize bağlı olarak genellikle saatler yerine dakikalar sürer.

**S: Senkronizasyon bitmeden cüzdanı kullanabilir miyim?**

C: Evet. Pepper Sync, senkronizasyon tamamlanmadan önce harcamayı destekler; bu nedenle cüzdanın zincirin en ucuna ulaşmasını beklemeniz gerekmez.

## Sonuç

Zingo 2.0 Pepper Sync ile senkronizasyon artık shielded cüzdanların en büyük sıkıntı noktası değil. Artık hızlı, kararlı ve kullanıcı dostu; yeni gelenler için giriş engelini azaltıyor ve günlük kullanımı çok daha pratik hale getiriyor.

Kullanıcılar için bu, daha az bekleme ve daha fazla gizlilik demek. Geliştiriciler için üzerine inşa edilebilecek daha güçlü bir temel anlamına geliyor. Zcash ekosistemi içinse, shielded işlemleri herkes için erişilebilir kılma yolunda atılmış bir adım daha.

Pepper Sync'li Zingo 2.0 sadece bir yükseltme değil; özel ve kullanılabilir kripto için ileriye doğru büyük bir sıçrama.

## İlgili Sayfalar

- [Zcash Cüzdan Senkronizasyonu](/zcash-tech/zcash-wallet-syncing) — cüzdan senkronizasyonunun Zcash ekosisteminde nasıl çalıştığı.
- [Lightwallet Düğümleri](/zcash-tech/lightwallet-nodes) — Zingo gibi bir hafif cüzdanın senkronize olduğu altyapı.
- [Zaino](/zcash-tech/zaino) — Zingo ekibi tarafından geliştirilen indeksleyici.
- [Cüzdanlar](/wallets) — Zcash cüzdanlarının ve özelliklerinin tam dizini.

## Daha Fazla Öğrenme

- [Zingo! GitHub Deposu](https://github.com/zingolabs/zingolib)
- [Zcash Topluluk Forumu](https://forum.zcashcommunity.com/)
- Resmî Duyurular - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
