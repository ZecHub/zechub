# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge, Zcash (ZEC) ve Avalanche (AVAX) blokzincirleri arasında birlikte çalışabilirlik sağlayan merkeziyetsiz bir köprüdür. Bu köprü, ZEC’in Avalanche blokzincirine sorunsuz aktarımını kolaylaştırmak için tasarlanmıştır; Avalanche’ın yüksek işlem kapasitesi, düşük ücretleri ve çevre dostu konsensüs mekanizmalarından yararlanırken Zcash’in gizlilik odaklı özelliklerini korur.

RedBridge; zincirler arası merkeziyetsiz finans (DeFi), özel işlemler ve likidite paylaşımı dahil olmak üzere çok çeşitli kullanım senaryolarını destekler ve Zcash sahiplerine Avalanche ekosistemine daha geniş erişim imkânı sunar. Bu köprü, merkeziyetsiz düğümler ve **ZavaX** olarak bilinen bir oracle aracılığıyla işletilir; bu yapı, Zcash ile Avalanche arasında güvenilir veri aktarımı ve fiyat doğrulaması sağlar.

### Temel Özellikler

Gizliliği Koruyan Birlikte Çalışabilirlik: Zcash kullanıcılarının Avalanche üzerindeki DeFi uygulamalarını kullanırken gizliliklerini korumalarını sağlar.
Merkeziyetsiz Oracle ZavaX: Doğru ZEC/AVAX fiyat verilerini sağlamak için bir oracle sistemi entegre eder ve güven gerektirmeyen zincirler arası işlemlere olanak tanır.
Ölçeklenebilir ve Çevre Dostu: Avalanche’ın konsensüs modelini kullanır ve minimum çevresel etkiyle yüksek hızlı işlemler sunar.
DeFi ve DApps Desteği: Zcash sahipleri artık gizlilikten ödün vermeden Avalanche üzerindeki çeşitli DeFi platformlarına katılabilir.

### Teknik Bileşenler

**Merkeziyetsiz ZavaX Oracle**
Açıklama: ZavaX oracle, köprü için kritik öneme sahiptir; zincirler arası fiyat akışları sağlar ve güven gerektirmeyen ZEC’ten AVAX’a dönüşümleri mümkün kılar.
[Oracle bağlantısı](https://zavax-oracle.red.dev)

**Zincirler Arası Köprü Sözleşmesi**
Açıklama: Zcash Avalanche köprüsünü destekleyen akıllı sözleşme mimarisi; ZEC yatırma, dönüştürme ve çekme işlemlerini yönetir.

**Gizlilik Katmanı Entegrasyonu**
Açıklama: Zcash gizlilik özelliklerinin köprüleme süreci boyunca korunmasını sağlar ve özel zincirler arası işlemlere olanak tanır.

## Teslimatlar ve Dokümantasyon

**Avalanche Üzerindeki Zcash Elastic Subnet Bridge**: [Hibe Teklifi](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Aşağıda Zcash Avalanche RedBridge projesi için tamamlanan temel teslimatlar ve teknik kaynaklar yer almaktadır:

Teslimat 1.1: Github’da yayımlanan ve Avalanche testnet üzerinde tek düğümlü bir subnet ile, bir CLI aracılığıyla testnet Avalanche subnet’inden testnet Zcash işlemlerinin sorgulanmasını destekleyen ön PoC. https://github.com/red-dev-inc/zavax-oracle

Teslimat 2.1: [Mimari](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Kilometre Taşı 3 31 Mart 2024

Teslimat 3.1 tamamlandı ve ZavaX köprüsünde eşik imzaları için BLS yerine FROST benimsenmesine ilişkin analizimizi sunuyor. Bu değişim, Zcash Foundation tarafından denetlenmiş kütüphanelerden yararlanıyor ve daha iyi entegrasyon ile güvenlik sağlıyor. https://github.com/ZcashFoundation/frost

Teslimat 3.2 GUI için UX ve UI tasarımı tamamlandı; penetrasyon testi sonuçlarıyla desteklenen ZavaX Oracle subnet’ine yönelik güvenlik iyileştirmelerimizi ayrıntılandırıyor. Sunucu yapılandırması ve test sonuçları dahil daha fazla ayrıntı için [Güvenlik Değerlendirmesi](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Denetim Raporu](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Ek olarak ekip, ZavaX markasını redbridge olarak yeniden markaladı ve staking token’ını ZAX’ten RBR’ye değiştirdi.

### Kilometre Taşı 4 30 Nisan 2024
Teslimat 4.1 CLI desteğiyle birlikte, 3 doğrulayıcılı bir Subnet üzerinde Zcash ve Avalanche testnet’lerine tam işlevsel dağıtım

### Kilometre Taşı 5 31 Mayıs 2024
Teslimat 5.1 GUI: köprünün Core veya Webapp’e entegrasyonu

Kilometre Taşı 6 30 Haziran 2024
Teslimat 6.1 Yazılım denetiminin başarıyla geçilmesi
Teslimat 6.2 Denetlenmiş kaynak kodunun herkese açık bir Github reposunda yayımlanması

[Github reposuna](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture) göz atın
  
Daha fazla teknik ayrıntı için kullanıcıların, entegrasyonun ayrıntılarını, test çerçevelerini ve güvenlik protokollerini [incelemek](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) üzere RedBridge projesinin reposunu ve dokümantasyonunu gözden geçirmeleri tavsiye edilir.


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Teslimatlar: 
2025’in 1. çeyreğinde ekip, herkesin kullanıcı deneyimini deneyebileceği, geri bildirim verebileceği ve iyileştirme önerilerinde bulunabileceği [red·bridge demo web sitesinin](https://redbridge-demo.red.dev/index.html) lansmanını duyurdu. Bu site aynı zamanda teknik olmayan kişileri projeyle tanıştırmanın kolay bir yolu olarak da hizmet veriyor.

* Ekip, red·bridge’in nihai sürümü için Zebra kullandı. Bunu test etmek için Avalanche’ın Fuji testnet’i üzerinde çalışan test blokzincirleri ZavaX Oracle’daki üç düğümün ikisini yükselttiler. Son düğüm de başarıyla yükseltildi; artık [Zavax Oracle](https://zavax-oracle.red.dev/) ZEBRA üzerinde çalışıyor!

* 2025’in 1. çeyreğinde, red.bridge web sitesi başlangıçta kırmızı olan ilk sürümün aksine red, Dark, Light ve Zebra olmak üzere dört görünüm sunacak şekilde kodlandı.

* Bir diğer nokta da ekibin Aralık 2025’te red·bridge L1’i Avalanche mainnet üzerinde canlıya alacak olmasıdır. Başlangıçta Zcash blokzinciri için, kısa süre sonra da Bitcoin için bir oracle olarak hizmet verecek. Bu kapsamda her talep, gas token olarak 0.001 AVAX maliyetine sahip olacak. Bu yapı, Avalanche üzerindeki herhangi bir L1’in veya akıllı sözleşmenin Zcash ve Bitcoin’den verileri merkeziyetsiz şekilde düşük maliyetle sorgulamasını mümkün kılacak.

* 2. çeyrekte ekip, bir red.bridge guardian çalıştırmayı daha erken ve herkes için daha uygun maliyetli hale getirmek amacıyla Avalanche Foundation’a bir kilometre taşı olan ACP-77’yi (Avalanche9000 olarak bilinir) sundu. Başlangıçta doğrulayıcıların yaklaşık 2000 AVAX stake etmesi gerekiyordu; ancak Avalanche9000costs ile doğrulayıcıların yalnızca 1 AVAX (aylık) stake etmesi gerekti. Ayrıca bu kilometre taşı, ZF’nin FROST uygulamasını kullanma planını da nihai hale getiriyor; bu da her Guardian’a köprü cüzdanının güvenli ve dağıtık kontrolü için bir imza payı veriyor.

* 2026’nın 1. ve 2. çeyreğinde red.bridge, Zcash ve Avalanche topluluğu üyeleri için RBR token’ının (eski adıyla ZAX) airdrop’unu düzenleyecek. red.dev’in kurucusuna göre, kullanıcıların köprüyü test etmeye yardımcı olurken RBR kazanma şansı elde edeceği teşvikli bir testnet de düzenlenecek.
