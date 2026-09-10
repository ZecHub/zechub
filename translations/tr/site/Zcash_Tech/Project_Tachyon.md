<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Project Tachyon

## Kısaca

- Tachyon, Zcash cüzdanlarının korumalı fonları bulma ve harcama biçimine yönelik, ağın çok büyük kullanıcı sayılarına ulaşmasını sağlamayı amaçlayan önerilmiş bir yeniden tasarımdır
- Bugün bir cüzdan, kendisine ait ödemeleri keşfetmek için blok zincirinin çok büyük bir kısmını şifresini çözmeye çalışmak zorundadır ve korumalı eşitlemenin yavaş hissettirmesinin temel nedeni budur
- Tachyon bunu **gizli eşitleme** ile değiştirir; böylece cüzdan, her şeyi taramadan ve sunucuya hangi bölümleri istediğini söylemeden ihtiyaç duyduklarını getirir
- Ayrıca ödeme ayrıntılarını blok zincirinden çıkarıp ödeme talebinin içine taşır; bu protokolü basitleştirir, ancak sorumluluğu cüzdanlara kaydırır
- Bu bir öneridir; ilk kez Nisan 2025'te yayımlandı ve NU7 için aday olarak adlandırıldı. **Yayınlanmış değildir** ve Sapling yükseltmesi ölçeğinde bir mühendislik çalışmasına ihtiyaç duyar

<br/>

## Bu kimler için

- Korumalı bir cüzdanın eşitlenmesini izleyip neden bu kadar uzun sürdüğünü merak eden herkes
- Tachyon'un NU7 ve Zcash ölçeklenmesinin yanında anıldığını sürekli gören yeni başlayanlar
- Önce fikri, sonra kriptografiyi isteyen okuyucular

<br/>

## Tachyon'un çözdüğü sorun

Zcash, bir ödemenin kime yönelik olduğunu gizler. Asıl amaç budur ve rahatsız edici bir sorun yaratır: hiç kimse bir ödemenin kime ait olduğunu söyleyemiyorsa, kendi cüzdanınız sizinkini nasıl bulur?

Bitcoin'de bu kolaydır. Adresler herkese açıktır; bu nedenle bir cüzdan sunucuya "bu adrese ne gönderildi?" diye sorabilir ve yanıt alabilir. Bir Zcash cüzdanı bu soruyu soramaz, çünkü bunu sormak korumalı havuzun gizlemek üzere tasarlandığı şeyi tam olarak açığa çıkarır.

Bu nedenle Zcash farklı bir şey yapar. Gönderen, ödeme ayrıntılarını şifreler ve bunları işlemin içine yerleştirir. Ardından cüzdanınız zincirdeki işlemler üzerinde çalışır ve her birinin şifresini çözmeye çalışır. Neredeyse her deneme başarısız olur. Başarılı olan az sayıdaki deneme sizin ödemelerinizdir. Buna **deneme amaçlı şifre çözme** denir; özeldir, doğrudur ve yavaştır.

![Bugün bir Zcash cüzdanı, kendisine ait az sayıdaki ödemeyi bulmak için her korumalı işlemi indirir ve neredeyse her deneme başarısız olurken her birinin şifresini çözmeye çalışır](/content-images/tachyon-scanning-today.svg)

Sorun, işin neye bağlı olduğudur. Cüzdanınızın harcadığı çaba, gerçekten kaç ödeme aldığınıza değil, zincirin ne kadar büyük olduğuna göre belirlenir. Tek bir ödeme bile almamış biri, günlük ödeme alan biri kadar neredeyse aynı işi yapar. Zcash büyüdükçe bu herkes için kötüleşir. Önerinin ifadesiyle, "basitçe ölçeklenmez."

<br/>

## Tachyon neleri değiştiriyor

Tachyon soruna kökünden saldırır: blok zincirini ödeme sırlarının iletim kanalı olarak kullanmayı bırakır.

Bunun yerine, ihtiyacınız olan ayrıntılar ödeme talebinin kendisiyle birlikte, bant dışından taşınır. Bir ödeme talebi, URI veya QR kodu, eskiden işleme şifrelenmiş olan bilgiyi taşır. Sean Bowe bunu, bir Zcash korumalı protokolünde ilk kez **bant dışı ödemeleri** benimsemek olarak tanımlıyor.

Zincir artık bu bilgiyi taşımadığında, cüzdanınızın onu aramak için de bir nedeni kalmaz ve deneme amaçlı şifre çözme sorunu ortadan kalkar.

Yine de cüzdanınızın harcama yapabilmek için güncel zincir durumunu bilmesi gerekir. Bu tasarımın ikinci yarısı olan **gizli eşitleme**, bir cüzdanın ihtiyaç duyduğu belirli şeyleri, sunucuya hangi şeyleri istediğini açıklamadan getirmesini sağlayan yöntemdir.

![Tachyon ile gönderen ödeme ayrıntılarını alıcıya bant dışından iletir ve cüzdan tüm zinciri taramak yerine yalnızca ihtiyaç duyduğu verileri almak için gizli eşitlemeyi kullanır](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Bir cüzdan kullanan biri için ne anlama gelir

- **Eşitleme zincirle birlikte büyümeyi bırakır.** Cüzdanınızın güncel duruma ulaşmak için harcadığı süre, Zcash'in boyutu yerine kendi etkinliğinizi takip eder.
- **Ödemeler birine fatura vermeye daha çok benzer.** Ödeme talebi alıcının ihtiyaç duyduğu şeyi taşır; bu nedenle gönderen ile alıcı arasındaki alışveriş bugün olduğundan daha önemli hâle gelir.
- **Cüzdanlar daha fazla sorumluluk taşır.** Zincir artık ödeme ayrıntılarınızın şifreli bir kopyasını tutmadığı için, cüzdan verilerinizi kaybetmek daha fazla önem kazanır. Yedekleme ve kurtarma, protokol özelliği olmaktan çıkar ve cüzdan yazılımının doğru yapması gereken bir şey hâline gelir.
- **Bazı tanıdık parçalar taşınır veya ortadan kalkar.** Tachyon, anahtar çeşitlendirmeyi, görüntüleme anahtarlarını ve ödeme adreslerini çekirdek protokolden çıkararak bunları cüzdan katmanına bırakır. Bu, önerinin en sonuç doğurucu kısımlarından biridir ve üzerinde hâlâ çalışılmaktadır.

<br/>

## Teknik okuyucular için daha yakından bakış

Tachyon, Orchard protokolüne tersine uyumlu bir değişiklik olarak tanımlanır. Mevcut Orchard havuzuna yönelik bir yükseltme olarak ya da Zcash'in Ironwood için kullandığı mekanizmayla aynı olan bir [turnstile](https://zechub.wiki/zcash-tech/the-turnstile) üzerinden erişilen ayrı bir korumalı havuz olarak dağıtılabilir. Seçim, tasarımı değil dağıtımı etkiler.

Orchard'dan birçok şeyi korur: RedPallas anahtar yeniden rastgeleleştirme, homomorfik değer taahhütleri ve bağlama imzaları ile bir cihazın harcama yetkisini devretmeden kanıtlama işlemini devretmesini sağlayan bölümlenmiş anahtar yapısı.

Ölçekleme çalışması, **kanıt taşıyan veriye** dayanır; bu, verinin kendi doğruluğuna ilişkin bir kanıtla birlikte taşındığı bir tekniktir, böylece bunu diğer kanıt taşıyan verilerle birleştirmek, bu kanıtları devralan ve genişleten bir sonuç üretir. Büyük miktardaki doğrulanmış çalışmanın küçük ve hızlı kontrol edilebilir bir şeye sıkıştırılmasını sağlayan budur. Zcash'in arkasındaki ekip tarafından keşfedilen Halo, kanıt taşıyan veriyi üzerine inşa edilebilecek kadar pratik hâle getiren şeydir.

Üçüncü unsur **korumalı işlem toplamlarıdır**; bu, korumalı durum değişikliklerinin nasıl iletildiğini değiştirir ve imzalamanın nasıl çalıştığı üzerinde dolaylı etkiler yaratır.

<br/>

## Çalışmanın durumu

Tachyon, **bir öneridir, yayınlanmış bir özellik değildir**. Nisan 2025'te yayımlandı ve Mayıs 2025'te yayımlanan bir takip yazısı fikir birliği etkilerini ele aldı. Ironwood'dan sonraki büyük yükseltme olan NU7 için aday olarak adlandırılmıştır, ancak NU7'nin içeriğine coin sahibi oylaması karar verir ve Tachyon hakkında hiçbir şey kesinleşmiş değildir.

Yazarın kendi çerçevesine göre bu, spekülatif araştırmadan ziyade uygulanabilir bir plandır; ancak Sapling ile karşılaştırılabilir bir mühendislik çabası gerektirir ve bazı daha zor sorular kasıtlı olarak sonraya bırakılmıştır.

İlgili çalışmalar şimdiden görünür durumdadır. Temmuz 2026'da yayımlanan tam düğüm [Zakura](https://zechub.wiki/zcash-tech/zakura-node), Project Tachyon ile Valar Group'un ortak çalışmasıdır ve bu ağ düzeyindeki değişikliklerin bazılarını önceden gösterir. [Özel bilgi erişimi](https://zechub.wiki/zcash-tech/private-information-retrieval) araştırması, aynı tarama darboğazını farklı bir açıdan hedefler.

<br/>

## Yaygın yanlış anlamalar

- **Tachyon aktif değildir.** Bugün hiçbir cüzdan onu kullanmıyor ve hiçbir yükseltme onu etkinleştirmedi.
- **Tachyon, Ironwood ile aynı değildir.** Ironwood Temmuz 2026'da etkinleştirildi ve Orchard havuzu ile turnstile'ı ele aldı. Tachyon, ölçekleme hakkında ayrı ve daha sonraki bir öneridir.
- **Tachyon gizlilikte bir azalma değildir.** Amaç, gizliliği hız karşılığında takas etmek değil, ölçekleme maliyetini ortadan kaldırırken defter ayırt edilemezliğini korumaktır.
- **zk-SNARK doğrulaması hiçbir zaman darboğaz olmadı.** Öneri, yavaş kısmın kanıtları kontrol etme maliyeti değil, cüzdanların durumu nasıl keşfedip koordine ettiği olduğunu açıkça belirtir.
- **"NU7 için hedefleniyor" bir taahhüt değildir.** NU7'ye neyin gireceğine bir oylama karar verir.

<br/>

## Sözlük

| Terim | Anlamı |
|---|---|
| Deneme amaçlı şifre çözme | Size adreslenen işlemleri bulmak için işlemlerin şifresini tek tek çözmeye çalışmak |
| Zincir içi gizli dağıtım | Zcash'in bugün yaptığı gibi, ödeme sırrını blok zincirindeki işlemin içine yerleştirmek |
| Bant dışı ödeme | Ödeme ayrıntılarını zincir üzerinden değil, doğrudan gönderen ile alıcı arasında iletmek |
| Gizli eşitleme | Bir cüzdanın ihtiyaç duyduğu zincir verisini, hangi verinin talep edildiğini açıklamadan getirmek |
| Kanıt taşıyan veri (PCD) | Kendi doğruluğuna ilişkin bir kanıtla birlikte taşınan, böylece kanıtların birleştirilip sıkıştırılabildiği veri |
| Korumalı işlem toplamı | Tachyon'un korumalı durum değişikliklerini paketleme yöntemi; bunların nasıl iletildiğini ve imzalandığını değiştirir |
| defter ayırt edilemezliği | Korumalı işlemlerin birbirinden ayırt edilememesi özelliği |

<br/>

## SSS

**Bu, cüzdanımın daha hızlı eşitlenmesini sağlayacak mı?** Amaç budur. Eşitleme süresi, zincirin boyutu yerine kendi etkinliğinizi takip eder. Henüz hiçbir şey yayınlanmadı; dolayısıyla alıntılanacak ölçülmüş bir rakam yok.

**Şimdi bir şey yapmam gerekiyor mu?** Hayır. Tachyon bir öneridir. Benimsenirse, her zamanki bildirimle birlikte bir ağ yükseltmesi aracılığıyla gelir.

**Görüntüleme anahtarlarının kaldırılması, okuma erişimini paylaşma yeteneğinin kaybedilmesi anlamına mı geliyor?** Öneri, bu yeteneği çekirdek protokolden çıkarıp cüzdan katmanına taşır. Bunun pratikte nasıl görüneceği açık sorulardan biridir.

**Tachyon yayınlanırsa param risk altında mı olur?** Dağıtım, her ikisi de değerin herkese açık muhasebe kuralları altında hareket etmesi için tasarlanmış Orchard yükseltmesi veya turnstile kullanır. Ironwood sayfası bir turnstile'ın nasıl çalıştığını açıklar.

<br/>

## İlgili sayfalar

- [Özel Bilgi Erişimi](https://zechub.wiki/zcash-tech/private-information-retrieval) - aynı cüzdan tarama darboğazına yönelik başka bir yaklaşım
- [Zakura Düğümü](https://zechub.wiki/zcash-tech/zakura-node) - kısmen Tachyon'un mühendislik çalışmasıyla oluşturulmuş bir düğüm
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - Temmuz 2026'da etkinleştirilen ve sıklıkla Tachyon ile karıştırılan yükseltme
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - Tachyon kendi havuzu olarak dağıtılırsa kullanabileceği mekanizma
- [Kuantum Sonrası Güvenlik](https://zechub.wiki/zcash-tech/post-quantum-security) - Tachyon'un daha uzun vadeli protokol çalışmalarıyla birlikte konumlandığı yer
- [Zcash Nasıl Organize Edilir](https://zechub.wiki/start-here/how-zcash-is-organized) - bu çalışmayı kimin yaptığı ve ekosistemin nasıl bir araya geldiği

<br/>

## Kaynaklar

- [Tachyon: Gizli Eşitleme ile Zcash'i Ölçeklendirmek](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Nisan 2025, özgün öneri
- [Uzaktan Tachyaction](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mayıs 2025, fikir birliği ve protokol etkileri; protokol geliştiricileri için yazılmıştır
- [Sean Bowe'un blogu](https://seanbowe.com/blog/) - Tachyon serisinin yayımlandığı yer
- [tachyon.z.cash](https://tachyon.z.cash/) - proje sitesi
