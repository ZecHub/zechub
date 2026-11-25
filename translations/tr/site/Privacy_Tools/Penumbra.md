# Penumbra 

Penumbra, tamamen korumalı, hisse kanıtı (proof-of-stake) kullanan bir katman-1 ağı ve Cosmos ekosisteminde merkeziyetsiz bir borsadır. Zincirler arası korumalı havuzunda, IBC bağlantılı Zincirlerden gelen varlıklar tutulabilir. Kullanıcılar, bireysel hesap bakiyelerini yayımlamadan veya bu işlemleri kimlikleriyle ilişkilendirmeden Penumbra içinde varlık aktarabilir, staking yapabilir, takas edebilir ve likidite sağlayabilir. Bu, ağ veya DEX verilerinin her parçasının gizli olduğu anlamına gelmez.

![image.png](/content-images/_unavailable.svg)

## Penumbra IBC'de Kullanılan Teknoloji

IBC Entegrasyonu: Blokzincirler Arası İletişim (Inter-Blockchain Communication, IBC) protokolü, Penumbra ağını IBC destekli diğer Zincirlere bağlar. Gelen bir IBC aktarımı, fonlar Penumbra ağına girerken onları korumalı hâle getirir; giden bir aktarım ise fonlar ağdan çıkarken korumayı kaldırır. Şeffaf bir karşı taraf Zincirindeki etkinlik, gelen bir yatırmanın hedef adresi de dâhil olmak üzere herkese açık kalır. [gizlilik sınırı, IBC sınırını izler](https://guide.penumbra.zone/overview/interchain-privacy).

Sıfır Bilgi Kanıtları (ZKPs): Penumbra, şifrelenmiş durum güncellemelerinin geçerli olduğunu, kullanıcının özel işlem verilerini yayımlamadan göstermek için istemci tarafında sıfır bilgi kanıtları kullanır. Cüzdanlar, görebildikleri verileri yerel olarak tarar ve şifresini çözer; herkese açık bir düğüm, kullanıcının özel bakiyesini doğrudan sunamaz.

![image.png](/content-images/_unavailable.svg)

Gizlilik Sunan Merkeziyetsiz Borsa: Penumbra, korumalı havuzundaki varlıkların alım satımı için bir DEX içerir. Bireysel takas çıktıları gizliyken, toplu yürütme sonuçları ve anonim likidite pozisyonları herkese açıktır. Borsanın neleri gizlediğini anlatırken bu ayrımlar önemlidir.

## Kullanım Alanları

Güvenli işlemler: Penumbra ağının korumalı havuzu içindeki aktarımlar; göndericiyi, alıcıyı, tutarı ve varlık türünü korur. Kullanıcılar, etkinliklerini yetkili üçüncü taraflara seçerek açıklayabilir. Yalnızca bir alım adresini paylaşmak, bu adresin sahibinin bakiyelerini açığa çıkarmaz. Fonlar çekildikten sonra başka bir Zincirde herkese açık olarak gerçekleştirilen etkinlikler bu özelliklerden yararlanmaz.

Staking: Penumbra ağının yerel staking token'ı **UM**'dır. UM bir doğrulayıcıya devretmek, o doğrulayıcının delegasyon havuzundaki payları temsil eden delegasyon token'ları kazandırır. Her doğrulayıcı havuzundaki toplam staking miktarı herkese açıktır; bireysel delegasyonlar ise anonimdir. Delegasyonu geri çekme işlemi önce doğrulayıcıya özel bağ çözme token'ları oluşturur. Bu token'lar, bağ çözme gecikmesi sona erene kadar slashing riskine açık kalır. Resmî [korumalı staking kılavuzuna](https://guide.penumbra.zone/overview/staking) bakın.

Token takasları: Takas niyetleri işlem çiftine göre gruplandırılır ve her bloğun sonunda toplu olarak gerçekleştirilir. Bu, takas niyetlerinin blok içindeki sıralamasını yatırımcılar için bir araca dönüştürmeyi engeller; ancak bu, belirli bir mekanizmadır ve MEV'in hiçbir biçimde var olamayacağını garanti etmez. Toplu sonuçlar herkese açık Zincir durumuna yazılır ve kullanıcılar sonuçtaki paylarını özel olarak korumalı havuza aktarır. [DEX kılavuzu](https://guide.penumbra.zone/overview/dex), toplu yürütmeyi ve protokolün otomatik arbitrajını açıklar.

Piyasa yapıcılığı: Likidite sağlayıcıları anonim yoğunlaştırılmış likidite pozisyonları oluşturur. Pozisyonların likiditesi ve alım satım işlevleri herkese açıktır, ancak sağlayıcıların kimliğiyle ilişkilendirilmez.
