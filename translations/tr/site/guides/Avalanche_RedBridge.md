# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge, Zcash (ZEC) ve Avalanche (AVAX) blokzincirleri arasında birlikte çalışabilirliği sağlayan merkeziyetsiz bir köprüdür. Bu köprü, Avalanche ağının yüksek işlem kapasitesinden, düşük ücretlerinden ve çevre dostu konsensüs mekanizmalarından yararlanırken Zcash ağının gizlilik odaklı özelliklerini koruyarak ZEC varlıklarının Avalanche blokzincirine sorunsuz aktarılmasını kolaylaştırmak üzere tasarlanmıştır.

RedBridge, zincirler arası merkeziyetsiz finans (DeFi), gizli işlemler ve likidite paylaşımı gibi çok çeşitli kullanım alanlarını destekleyerek Zcash sahiplerine Avalanche ekosistemine daha geniş erişim olanağı sunar. Bu köprü, Zcash ile Avalanche arasında güvenilir veri aktarımını ve fiyat doğrulamasını sağlayan, **ZavaX** olarak bilinen bir oracle ve merkeziyetsiz düğümler bütünü aracılığıyla işletilir.

### Temel Özellikler

Gizliliği Koruyan Birlikte Çalışabilirlik: Zcash kullanıcılarının, Avalanche üzerindeki DeFi uygulamalarını kullanırken gizliliklerini korumasını sağlar.
Merkeziyetsiz ZavaX Oracle’ı: Güven gerektirmeyen zincirler arası işlemlere olanak tanıyan, doğru ZEC/AVAX fiyat verileri sağlamak için bir oracle sistemi entegre eder.
Ölçeklenebilir ve Çevre Dostu: Avalanche’ın konsensüs modelini kullanarak çevresel etkisi en aza indirirken yüksek hızlı işlemler sunar.
DeFi ve DApp Desteği: Zcash sahipleri artık gizliliklerinden ödün vermeden Avalanche üzerindeki çeşitli DeFi platformlarına katılabilir.

### Teknik Bileşenler

**Merkeziyetsiz ZavaX Oracle**
Açıklama: ZavaX Oracle, zincirler arası fiyat akışları sağlayarak ve güven gerektirmeyen ZEC ile AVAX dönüşümlerine olanak tanıyarak köprü için kritik bir rol oynar.
[Oracle’a bağlantı](https://zavax-oracle.red.dev)

**Zincirler Arası Köprü Sözleşmesi**
Açıklama: Zcash Avalanche köprüsünü destekleyen akıllı sözleşme mimarisi; ZEC yatırma, dönüştürme ve çekme işlemlerini yürütür.

**Gizlilik Katmanı Entegrasyonu**
Açıklama: Köprüleme süreci boyunca Zcash gizlilik özelliklerinin korunmasını ve gizli zincirler arası işlemlere olanak tanınmasını sağlar.

## Teslimatlar ve Belgeler

**Zcash Avalanche Elastic Subnet Köprüsü**: [Hibe Teklifi](https://forum.zcashcommunity.com/t/zcash-elastic-subnet-bridge-on-avalanche/44220)
Aşağıda Zcash Avalanche RedBridge projesi için tamamlanan temel teslimatlar ve teknik kaynaklar yer almaktadır:

Teslimat 1.1: CLI içeren bir testnet Avalanche alt ağından testnet Zcash işlemlerini sorgulamayı destekleyen, GitHub üzerinde yayımlanan ve Avalanche testnetinde tek düğümlü bir alt ağla çalışan ön PoC. https://github.com/red-dev-inc/redbridge-oracle

Teslimat 2.1: [Mimari](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture)


### 3. Aşama 31 Mart 2024

3.1 numaralı teslimat tamamlandı. ZavaX köprüsünde eşik imzaları için BLS yerine FROST kullanılması üzerine yaptığımız analizi sunuyor. Bu değişiklik, Zcash Foundation denetlenmiş kütüphanelerinden yararlanarak daha iyi entegrasyon ve güvenlik sağlıyor. https://github.com/ZcashFoundation/frost

3.2 numaralı teslimat: GUI için UX ve UI tasarımı tamamlandı. Sızma testi sonuçlarıyla desteklenen ZavaX Oracle alt ağına yönelik güvenlik iyileştirmelerimiz ayrıntılı olarak açıklanıyor. Sunucu yapılandırması ve test sonuçları dâhil daha fazla bilgi için [Güvenlik Değerlendirmesi](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/deployment-notes.md)
[Denetim Raporu](https://github.com/red-dev-inc/redbridge-oracle/blob/main/security/pen-testing-report-2024-09.md)
Ayrıca ekip, ZavaX adını redbridge olarak değiştirdi ve staking token’ını ZAX’tan RBR’ye geçirdi.

### 4. Aşama 30 Nisan 2024
4.1 numaralı teslimat: CLI desteğiyle, 3 doğrulayıcılı bir alt ağın Zcash ve Avalanche testnetlerinde tamamen işlevsel dağıtımı

### 5. Aşama 31 Mayıs 2024
5.1 numaralı teslimat: GUI: Köprünün Core’a veya web uygulamasına entegrasyonu

Aşama 6: 30 Haziran 2024
6.1 numaralı teslimat: Yazılım denetiminin başarıyla tamamlanması
6.2 numaralı teslimat: Denetlenmiş kaynak kodun herkese açık bir GitHub deposunda yayımlanması

[GitHub depoya](https://github.com/red-dev-inc/red-bridge/tree/main/Architecture) göz atın
  
Daha fazla teknik ayrıntı için kullanıcıların, entegrasyonun özelliklerini, test çerçevelerini ve güvenlik protokollerini [incelemek](https://github.com/red-dev-inc/red-bridge) üzere RedBridge projesinin deposunu ve belgelerini gözden geçirmeleri önerilir.


![img1](/content-images/b8c5d267-1711-458a-8a32-1df9d56fae8a-a93ff66932.webp)


* Teslimatlar: 
2025’in 1. çeyreğinde ekip, herkesin kullanıcı deneyimini deneyebileceği, geri bildirim verebileceği ve iyileştirme önerilerinde bulunabileceği [red·bridge demo web sitesinin](https://redbridge-demo.red.dev/index.html) kullanıma açıldığını duyurdu. Site, teknik bilgisi olmayan kişileri projeyle tanıştırmanın da kolay bir yolunu sunuyor.

* Ekip, red·bridge için son sürümde Zebra kullandı. Test etmek için test blokzincirlerindeki üç düğümden ikisini yükselttiler: ZavaX Oracle. Bu blokzincir, Avalanche’ün Fuji testnetinde çalışıyor. Son düğüm de başarıyla yükseltildi; artık [ZavaX Oracle](https://web.archive.org/web/20260823181644/https://zavax-oracle.red.dev/) artık Zebra üzerinde çalışıyor!

* 2025’in 1. çeyreğinde red.bridge web sitesi, başlangıçtaki kırmızı sürümün aksine kırmızı, Koyu, Açık ve Zebra olmak üzere dört görünüm sunacak şekilde kodlandı.

* Bir diğer nokta, ekibin red·bridge L1’i Avalanche ana ağında Aralık 2025’te canlıya alacak olması. Başlangıçta Zcash blokzinciri için, kısa süre sonra da Bitcoin için bir oracle olarak hizmet verecek. Her istek, gas token olarak 0,001 AVAX tutarında ücret gerektirecek. Bu sürüm, Avalanche üzerindeki herhangi bir L1’in veya akıllı sözleşmenin Zcash ve Bitcoin’den merkeziyetsiz biçimde düşük maliyetle veri sorgulamasını sağlayacak.

* 2. çeyrekte ekip, red.bridge koruyucularının daha erken ve herkes için daha uygun maliyetle çalıştırılmasını sağlamak amacıyla ACP-77 (Avalanche9000 olarak bilinir) kilometre taşını Avalanche Foundation’a sundu. Başlangıçta doğrulayıcıların yaklaşık 2.000 AVAX stake etmesi gerekiyordu; ancak Avalanche9000 maliyetleriyle doğrulayıcıların yalnızca 1 AVAX (ay) stake etmesi yeterli oldu. Ayrıca bu kilometre taşı, her Koruyucuya köprü cüzdanının güvenli ve dağıtık kontrolü için bir imza payı veren ZF’nin FROST uygulamasının kullanılmasına yönelik planı da kesinleştiriyor.

* 2026’nın 1. ve 2. çeyreklerinde red.bridge, RBR token’ının (önceki adı ZAX) Zcash ve Avalanche topluluğu üyelerine airdrop’unu düzenleyecek. Kurucunun açıklamasına göre, red.dev ekibi kullanıcıların köprüyü test ederken RBR kazanma şansı bulacağı teşvikli bir testnet düzenleyecek.
