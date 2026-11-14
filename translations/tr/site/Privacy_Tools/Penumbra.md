# Penumbra 

Penumbra, Cosmos ekosisteminde tamamen korumalı, proof-of-stake tabanlı bir katman-1 ağı ve merkeziyetsiz borsadır. Zincirler arası korumalı havuzu, IBC'ye bağlı zincirlerdeki varlıkları barındırabilir. Kullanıcılar, bireysel hesap bakiyelerini yayımlamadan veya bu eylemleri kimlikleriyle ilişkilendirmeden Penumbra içinde transfer yapabilir, stake edebilir, takas gerçekleştirebilir ve likidite sağlayabilir. Bu, ağ veya DEX verilerinin her parçasının gizli olduğu anlamına gelmez.

![image.png](/content-images/_unavailable.svg)

## Penumbra IBC'de kullanılan teknoloji 

IBC Entegrasyonu: Zincirler Arası İletişim (IBC) protokolü, Penumbra ile IBC özellikli diğer zincirleri bağlar. Gelen bir IBC transferi, fonlar Penumbra'ye girerken onları korumalı hâle getirir; giden bir transfer ise ayrılırken korumayı kaldırır. Gelen bir yatırmanın hedef adresi de dahil olmak üzere, şeffaf karşı taraf zincirindeki faaliyetler herkese açık kalır. [gizlilik sınırı IBC sınırını takip eder](https://guide.penumbra.zone/overview/interchain-privacy).

Sıfır Bilgi Kanıtları (ZKP'ler): Penumbra, kullanıcının özel işlem verilerini yayımlamadan şifrelenmiş durum güncellemelerinin geçerli olduğunu göstermek için istemci tarafında sıfır bilgi kanıtları kullanır. Cüzdanlar, kendileri için görünür olan verileri yerel olarak tarar ve şifresini çözer; herkese açık bir düğüm yalnızca kullanıcının özel bakiyesini döndüremez.

![image.png](/content-images/_unavailable.svg)

Gizlilik Odaklı Merkeziyetsiz Borsa: Penumbra, korumalı havuzu içindeki varlıkların alım satımı için bir DEX içerir. Tekil takas çıktıları gizliyken, toplu yürütme sonuçları ve anonim likidite pozisyonları herkese açıktır. Borsanın neyi gizlediğini açıklarken bu ayrımlar önemlidir.

## Kullanım Alanları

Güvenli işlemler: Penumbra'nin korumalı havuzu içindeki transferler göndereni, alıcıyı, tutarı ve varlık türünü korur. Kullanıcılar faaliyetlerini yetkili üçüncü taraflara seçici olarak açıklayabilir. Yalnızca bir alım adresinin paylaşılması, sahibinin bakiyelerini açığa çıkarmaz. Bu özellikler, fonlar çekildikten sonra başka bir zincirdeki herkese açık faaliyetlere uzanmaz.

Stake etme: Penumbra'nin yerel stake tokenı **UM**'dir. UM'yi bir doğrulayıcıya devretmek, o doğrulayıcının delegasyon havuzundaki payları temsil eden delegasyon tokenları sağlar. Her doğrulayıcının havuzundaki toplam stake herkese açıktır, ancak bireysel delegasyonlar anonimdi. Delegasyonu geri çekmek önce doğrulayıcıya özgü bağdan çözülme tokenları oluşturur; bunlar bağdan çözülme gecikmesi sona erene kadar slashing'e açık kalır. Resmî [korumalı stake rehberine](https://guide.penumbra.zone/overview/staking) bakın.

Token takasları: Takas niyetleri işlem çiftine göre gruplandırılır ve her bloğun sonunda toplu olarak yürütülür. Bu, takas niyetlerinin blok içi sıralamasını yatırımcılar için bir kaldıraç olmaktan çıkarır; bu belirli bir mekanizmadır, hiçbir MEV biçiminin var olamayacağına dair bir garanti değildir. Toplu sonuçlar herkese açık zincir durumuna yazılır ve kullanıcılar sonuçtaki paylarını korumalı havuza özel olarak talep eder. [DEX rehberi](https://guide.penumbra.zone/overview/dex), toplu yürütmeyi ve protokolün otomatik arbitrajını açıklar.

Piyasa yapıcılık: Likidite sağlayıcıları anonim yoğunlaştırılmış likidite pozisyonları oluşturur. Pozisyonların likiditesi ve alım satım işlevleri herkese açıktır, ancak sağlayıcının kimliğiyle ilişkilendirilmez.
