<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Project Tachyon

## Kısaca

- Tachyon, Zcash cüzdanlarının korumalı fonları bulup harcama biçimini yeniden tasarlamayı önerir; amaç, ağın çok büyük kullanıcı sayılarına ulaşmasını sağlamaktır
- Bugün bir cüzdan, hangi ödemelerin kendisine ait olduğunu keşfetmek için blokzincirin büyük bir bölümünün şifresini çözmeye çalışmak zorundadır ve korumalı eşzamanlamanın yavaş hissettirmesinin başlıca nedeni budur
- Tachyon bunun yerine **gizliliği koruyan eşzamanlama (oblivious synchronization)** yöntemini getirir; böylece cüzdan, her şeyi taramadan ve sunucuya hangi bölümleri istediğini bildirmeden ihtiyaç duyduğu verileri alır
- Ayrıca ödeme ayrıntılarını blokzincirden çıkarıp ödeme isteğinin içine taşır; bu, protokolü basitleştirirken sorumluluğu cüzdanlara yükler
- Bu, ilk olarak Nisan 2025'te yayımlanmış bir öneridir. **NU7 parçası değildir** ve **henüz kullanıma sunulmamıştır**; Sapling yükseltmesi ölçeğinde bir mühendislik çalışması gerektirir

<br/>

## Kimler için

- Korumalı bir cüzdanın eşzamanlanmasını izleyip bunun neden bu kadar uzun sürdüğünü merak eden herkes
- Tachyon terimini NU7 ve Zcash ölçeklendirmesiyle birlikte görüp duran yeni başlayanlar
- Önce fikri, sonra kriptografiyi öğrenmek isteyen okurlar

<br/>

## Tachyon'in çözdüğü sorun

Zcash bir ödemenin kime yapıldığını gizler. Bütün amaç budur ve bu da çetrefilli bir sorun yaratır: Bir ödemenin kime ait olduğunu kimse anlayamıyorsa, kendi cüzdanınız size ait olanı nasıl bulur?

Bitcoin'de bu kolaydır. Adresler herkese açıktır; dolayısıyla bir cüzdan sunucuya “bu adrese ne gönderildi?” diye sorabilir ve yanıt alabilir. Zcash cüzdanı bu soruyu soramaz; çünkü bunu sorması, korumalı havuzun gizlemek üzere tasarlandığı şeyi tam olarak ortaya çıkarır.

Bu nedenle Zcash farklı bir yöntem kullanır. Gönderen, ödeme ayrıntılarını şifreler ve işlemin içine yerleştirir. Ardından cüzdanınız Zincir üzerindeki işlemleri sırayla inceler ve her birinin şifresini çözmeye çalışır. Denemelerin neredeyse tamamı başarısız olur. Başarılı olan birkaç tanesi sizin ödemelerinizdir. Buna **deneme yoluyla şifre çözme (trial decryption)** denir; yöntem gizlidir, doğrudur ama yavaştır.

![Bugün bir Zcash cüzdanı her korumalı işlemi indirir ve kendisine ait birkaç ödemeyi bulmak için neredeyse her girişim başarısız olacak şekilde her birinin şifresini çözmeye çalışır](/content-images/tachyon-scanning-today.svg)

Sorun, gereken çalışmanın neye bağlı olduğudur. Cüzdanınızın harcadığı emek, aldığınız ödeme sayısına değil, Zincir'in büyüklüğüne bağlıdır. Hiç ödeme almamış biri, her gün ödeme alan biri kadar iş yapmak zorunda kalır. Zcash büyüdükçe bu durum herkes için kötüleşir. Önerideki ifadeyle, “ölçeklenmesi mümkün değildir.”

<br/>

## Tachyon neleri değiştiriyor

Tachyon soruna kökünden yaklaşır: blokzinciri ödeme sırlarını iletmek için kullanmayı bırakır.

Bunun yerine ihtiyaç duyduğunuz ayrıntılar, ayrı bir kanaldan doğrudan ödeme isteğiyle birlikte iletilir. Bir ödeme isteği, URI veya QR kodu, eskiden işlemde şifrelenmiş olan bilgileri taşır. Sean Bowe bunu, bir Zcash korumalı protokolünde ilk kez **bant dışı ödemelerin (out-of-band payments)** benimsenmesi olarak tanımlar.

Zincir artık bu bilgileri taşımadığında, cüzdanınızın Zincir'i araması gerekmez ve deneme yoluyla şifre çözme sorunu ortadan kalkar.

Yine de harcama yapabilmek için cüzdanınızın güncel Zincir durumunu bilmesi gerekir. Tasarımın ikinci yarısı olan **gizliliği koruyan eşzamanlama (oblivious synchronization)** da budur: Cüzdanın, sunucuya hangi verileri istediğini açıklamadan yalnızca ihtiyaç duyduğu belirli verileri almasını sağlayan bir yöntem.

![Tachyon ile gönderen, ödeme ayrıntılarını bant dışı olarak alıcıya iletir; cüzdan tüm zinciri taramak yerine yalnızca ihtiyaç duyduğu verileri almak için gizliliği koruyan eşzamanlama kullanır](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Cüzdan kullananlar için anlamı

- **Eşzamanlama artık Zincir büyüdükçe uzamaz.** Cüzdanınızın güncel duruma yetişmesi için harcadığı süre, Zcash boyutundan ziyade kendi etkinliğinizi izler.
- **Ödeme yapmak birine fatura vermeye daha çok benzer.** Ödeme isteği, alıcının ihtiyaç duyduğu bilgileri taşır; bu nedenle gönderici ile alıcı arasındaki bilgi alışverişi bugünkünden daha önemli hâle gelir.
- **Cüzdanlara daha fazla sorumluluk düşer.** Zincir, ödeme ayrıntılarınızın şifrelenmiş bir kopyasını artık tutmadığından cüzdan verilerinizi kaybetmeniz daha önemli hâle gelir. Yedekleme ve kurtarma, protokol özelliği olmaktan çıkar ve cüzdan yazılımının doğru şekilde ele alması gereken konulara dönüşür.
- **Bazı tanıdık bileşenler taşınır veya ortadan kalkar.** Tachyon; anahtar çeşitlendirmeyi, görüntüleme anahtarlarını ve ödeme adreslerini temel protokolün dışına çıkarıp cüzdan katmanına bırakır. Bu, önerinin daha önemli sonuçlar doğurabilecek bölümlerinden biridir ve üzerinde hâlâ çalışılmaktadır.

<br/>

## Teknik okurlar için daha yakından bakış

Tachyon, Orchard protokolünde geriye dönük uyumlu bir değişiklik olarak tanımlanır. Mevcut Orchard havuzuna yükseltme olarak veya [turnike](https://zechub.wiki/zcash-tech/the-turnstile) aracılığıyla erişilen ayrı bir korumalı havuz olarak devreye alınabilir; bu, Zcash'in Ironwood için kullandığı mekanizmanın aynısıdır. Seçim tasarımı değil, devreye alma biçimini etkiler.

Orchard'den çeşitli unsurları korur: RedPallas anahtarı için yeniden rastgeleleştirme, homomorfik değer kriptografik taahhütleri ve bağlayıcı imzalar, ayrıca bir aygıtın harcama yetkisini devretmeden kanıt oluşturma yetkisini devretmesini sağlayan bölümlenmiş anahtar yapısı.

Ölçeklendirme çalışması, verilerin kendi doğruluğuna ilişkin bir kanıtla birlikte taşındığı ve bu verilerin başka kanıt taşıyan verilerle birleştirilmesiyle mevcut kanıtları devralıp genişleten bir sonuç elde edildiği **kanıt taşıyan veri (proof-carrying data)** tekniğine dayanır. Bu teknik, büyük miktarda doğrulanmış çalışmanın küçük ve hızlı denetlenebilir bir yapıya sıkıştırılmasını sağlar. Zcash ekibinin keşfettiği Halo, kanıt taşıyan verileri üzerine inşa edilebilecek kadar uygulanabilir kılmıştır.

Üçüncü bileşen, korumalı durum değişikliklerinin nasıl iletildiğini değiştiren ve imzalama işleyişini de etkileyen **korumalı işlem toplamalarıdır (shielded transaction aggregates)**.

<br/>

## Çalışmaların durumu

Tachyon, **kullanıma sunulmuş bir özellik değil, bir öneridir**. Nisan 2025'te yayımlanmış, Mayıs 2025'teki bir takip yazısında ise konsensüs üzerindeki etkileri ele alınmıştır. Ironwood sonrasındaki bir sonraki yükseltme olan NU7 için aday olarak adı geçmiştir; ancak 17 Eylül 2026'da üzerinde uzlaşılan NU7 kapsamına dahil edilmemiştir: [ZIP 259](https://zips.z.cash/zip-0259), NU7'in devreye alacağı değişiklikleri listeler ve [forum duyurusu](https://forum.zcashcommunity.com/t/nu7-timeline/57655), bu yükseltmede yeni bir işlem biçiminin yer almayacağını belirtir. Tachyon için herhangi bir etkinleştirme tarihi belirlenmemiştir.

Yazarın kendi ifadesiyle bu, varsayımsal bir araştırmadan ziyade uygulanabilir bir plandır; ancak bazı daha zor soruları bilerek sonraya bırakan ve Sapling ile karşılaştırılabilir ölçekte mühendislik çalışması gerektiren bir plandır.

İlgili çalışmalar şimdiden görülmeye başlanmıştır. Temmuz 2026'da yayımlanan bir tam düğüm olan [Zakura](https://zechub.wiki/zcash-tech/zakura-node), Project Tachyon ile Valar Group arasında ortak bir çalışmadır ve bu ağ düzeyindeki değişikliklerin bazılarını önceden gösterir. [Özel bilgi erişimi](https://zechub.wiki/zcash-tech/private-information-retrieval) araştırmaları, aynı tarama darboğazını farklı bir açıdan ele alır.

<br/>

## Yaygın yanlış anlamalar

- **Tachyon henüz kullanıma sunulmamıştır.** Bugün hiçbir cüzdan bunu kullanmıyor ve hiçbir yükseltme etkinleştirmedi.
- **Tachyon, Ironwood ile aynı şey değildir.** Ironwood Temmuz 2026'da etkinleştirilmiş; Orchard havuzunu ve turnikeyi ele almıştır. Tachyon ise ölçeklendirmeye ilişkin ayrı ve daha sonraki bir öneridir.
- **Tachyon gizliliği azaltmaz.** Amaç, hız karşılığında gizlilikten ödün vermek değil, defterdeki ayırt edilemezliği korurken ölçeklendirme maliyetini ortadan kaldırmaktır.
- **zk-SNARK doğrulaması hiçbir zaman darboğaz olmadı.** Öneride yavaşlığın, kanıtları denetleme maliyetinden değil, cüzdanların durumu keşfedip eşgüdümlemesinden kaynaklandığı açıkça belirtilir.
- **Tachyon, NU7 kapsamında değildir.** Bir zamanlar aday olarak adı geçse de Eylül 2026'da üzerinde uzlaşılan kapsam; 25 saniyelik blokları, ücretlerin yeniden dağıtımını ve 4. sürüm işlemlerinin sona ermesini kapsar, ancak yeni bir işlem biçimini içermez ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Terimler sözlüğü

| Terim | Anlamı |
|---|---|
| Trial decryption | Size yöneltilen işlemleri bulmak için işlemlerin şifresini tek tek çözmeye çalışmak |
| In-band secret distribution | Zcash'in bugün yaptığı gibi, ödeme sırrını blokzincirdeki işlemin içine koymak |
| Out-of-band payment | Ödeme ayrıntılarını Zincir üzerinden iletmek yerine doğrudan gönderici ile alıcı arasında paylaşmak |
| Oblivious synchronization | Bir cüzdanın ihtiyaç duyduğu Zincir verilerini, hangi verilerin istendiğini açıklamadan almak |
| Proof-carrying data (PCD) | Kendi doğruluğuna ilişkin kanıtla birlikte taşınan, böylece kanıtların birleştirilip sıkıştırılabildiği veri |
| Shielded transaction aggregate | Tachyon'in korumalı durum değişikliklerini paketleme yöntemi; bu değişikliklerin iletilme ve imzalanma biçimini değiştirir |
| ledger indistinguishability | Korumalı işlemlerin birbirinden ayırt edilememesi özelliği |

<br/>

## SSS

**Bu, cüzdanımın daha hızlı eşzamanlanmasını sağlar mı?** Amaç budur. Eşzamanlama süresi, Zincir'in büyüklüğünden ziyade kendi etkinliğinizi izler. Henüz hiçbir şey kullanıma sunulmadığından aktarılabilecek ölçülmüş bir değer yoktur.

**Şimdi bir şey yapmam gerekiyor mu?** Hayır. Tachyon bir öneridir. Kabul edilirse, olağan duyurularla birlikte bir ağ yükseltmesi aracılığıyla devreye alınır.

**Görüntüleme anahtarlarının kaldırılması, okuma erişimini paylaşma olanağını kaybetmek anlamına mı geliyor?** Öneri, bu olanağı temel protokolün dışına ve cüzdan katmanına taşır. Bunun uygulamada nasıl görüneceği, yanıt bekleyen sorulardan biridir.

**Tachyon kullanıma sunulursa param tehlikeye girer mi?** Devreye alma, bir Orchard yükseltmesi veya turnike aracılığıyla yapılır; ikisi de değerin herkese açık muhasebe kuralları kapsamında taşınmasını sağlayacak şekilde tasarlanmıştır. Ironwood sayfasında turnikenin nasıl çalıştığı açıklanır.

<br/>

## İlgili sayfalar

- [Özel Bilgi Erişimi](https://zechub.wiki/zcash-tech/private-information-retrieval) - aynı cüzdan tarama darboğazına yönelik başka bir yaklaşım
- [Zakura Düğümü](https://zechub.wiki/zcash-tech/zakura-node) - kısmen Tachyon mühendislik çalışmasıyla oluşturulmuş bir düğüm
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - Temmuz 2026'da etkinleştirilen ve sıklıkla Tachyon ile karıştırılan yükseltme
- [Turnike](https://zechub.wiki/zcash-tech/the-turnstile) - Tachyon kendi havuzu olarak devreye alınırsa kullanabileceği mekanizma
- [Kuantum Sonrası Güvenlik](https://zechub.wiki/zcash-tech/post-quantum-security) - Tachyon'in uzun vadeli protokol çalışmaları arasındaki yeri
- [Zcash Nasıl Düzenleniyor](https://zechub.wiki/start-here/how-zcash-is-organized) - bu çalışmayı kimin yürüttüğü ve ekosistemin nasıl bir araya geldiği

<br/>

## Kaynaklar

- [Tachyon: Farkında Olmadan Eşzamanlamayla Zcash Ölçeklendirme](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Nisan 2025; özgün öneri
- [Uzaktan Takyon Etkisi](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mayıs 2025; konsensüs ve protokol etkileri, protokol geliştiricileri için yazılmıştır
- [Sean Bowe'in blogu](https://seanbowe.com/blog/) - Tachyon dizisinin yayımlandığı yer
- [tachyon.z.cash](https://tachyon.z.cash/) - proje sitesi
