# Özel bilgi erişimi

## Kısaca

- Özel bilgi erişimi (PIR), bir cihazın sunucunun veritabanındaki bir öğeyi, sunucunun hangi öğenin istendiğini öğrenmesine gerek kalmadan almasını sağlar
- Zcash buna ihtiyaç duyar; çünkü özel bir cüzdan, kendini ifşa etmeden sunucuya hangi işlemlerin kendisine ait olduğunu soramaz
- Bugün cüzdanlar ihtiyaç duyduklarından çok daha fazla veriyi indirip tarıyor; eşitlemenin yavaş olmasının başlıca nedenlerinden biri bu
- PIR, cüzdanın yalnızca kendisine ait verileri özel olarak almasını sağlayarak gizliliği korurken bu darboğazı ortadan kaldırabilir
- Bu, Zcash için aktif bir araştırma alanı; teoride güçlü ve gerçek cüzdanlarda kullanılabilecek hâle getiriliyor
- Çalışır durumda bir demo şimdiden mevcut: [ZecBlock Private](https://private.zecblock.com), PIR tabanlı ilk eksiksiz Zcash blok gezginidir (işlemler, bloklar ve adresler)

## Kimler için

- Özel bir cüzdanın hangi coinlerin kendisine ait olduğunu sızdırmadan nasıl bulduğunu merak eden herkes
- PIR'ın Zcash ölçeklendirme çalışmalarıyla birlikte anıldığını sık sık gören yeni başlayanlar
- Önce kavramı, ardından temelindeki kriptografiyi öğrenmek isteyen okurlar
- Çalışır durumdaki PIR tabanlı bir blok gezgini merak eden herkes

## PIR'ın Zcash için çözdüğü sorun

Zcash bir işlemin kimin için olduğunu gizler. Bu gizlilik, zor bir soruyu beraberinde getirir: Ağ hangi işlemlerin size ait olduğunu göremiyorsa kendi cüzdanınız bunları nasıl bulur?

Bugün bunun yanıtı basit: Bir cüzdan sunucuya hangi işlemlerin bana ait olduğunu soramaz; çünkü bu soru, Zcash'ın gizlemeye çalıştığı şeyi doğrudan açığa çıkarır. Bu yüzden cüzdan büyük miktarda veriyi indirir ve hangi öğelerin kendisine ait olduğunu görmek için her birini yerel olarak sınar. Bu yöntem işe yarar ve gizliliği korur, ancak yavaş ve zahmetlidir. Bu tarama, cüzdan eşitlemesinin ağır ilerlemesinin başlıca nedenlerinden biridir.

İdeal çözüm, cüzdanın sunucuya tam olarak kendisine ait verileri sorup alabilmesi ve sunucunun ne istendiğini hiçbir zaman öğrenmemesidir. Özel bilgi erişimi tam olarak bunu sağlar.

## PIR nedir?

Özel bilgi erişimi, istemcinin sunucunun veritabanından bir kaydı, hangi kaydı okuduğunu sunucuya açıklamadan almasını sağlayan kriptografik bir yöntemdir.

İstediğiniz kitabı tam olarak alabileceğiniz, ancak kütüphanecinin size hangi kitabı verdiğini hiçbir zaman öğrenmediği bir kütüphane düşünün. İstediğiniz öğeyi alırsınız ve ilginiz gizli kalır. PIR, herhangi bir veritabanına uygulanan bu fikrin matematiksel hâlidir.

Bu kavram kriptografide onlarca yıldır inceleniyor. İlk olarak 1995'te Chor, Goldreich, Kushilevitz ve Sudan tarafından tanıtıldı; bu araştırmacılar birden fazla sunucu yaklaşımını açıkladı. İlk tek sunuculu sürüm ise 1997'de Kushilevitz ve Ostrovsky tarafından geliştirildi. Bunu Zcash icat etmedi; bu, Zcash'ın artık gerçek ve inatçı bir soruna uyguladığı, köklü bir araştırma alanı.

## PIR nasıl çalışır: temel düzeyde

PIR'ı kurmanın iki genel yolu vardır ve aralarındaki fark önemlidir.

İlk yöntem birden fazla sunucu kullanır. İstemci sorgunun bir parçasını birkaç sunucunun her birine gönderir ve yanıtları yerel olarak birleştirir. Tek bir sunucu bile ne istendiğini anlayacak kadar bilgi edinemez. Bu yöntem verimlidir, ancak sunucuların birbirleriyle iş birliği yapmamasına bağlıdır; bunu gerçek dünyada garanti etmek zordur.

İkinci yöntem, birden fazla taraf yerine tek bir sunucu ve akıllı kriptografi kullanır. Burada istemci, homomorfik şifreleme adı verilen özel bir araca dayanır. Birden fazla sunucunun iş birliği yapmamasını gerektirmediği için gerçek uygulamalarda en kullanışlı yön budur.

## Mekanizma: homomorfik şifreleme

Homomorfik şifreleme, veriler şifreli kalırken sunucunun bu veriler üzerinde hesaplama yapmasına olanak tanıyan bir şifreleme türüdür. Sunucu, temel değerleri hiç görmeden doğru ve şifreli bir yanıt üretir.

Bu yöntemle kurulan tek sunuculu PIR'ın ardındaki fikir şöyledir: İstemci bir listedeki üçüncü öğeyi ister. Üçüncü konum için şifreli bir evet, diğer tüm konumlar için şifreli bir hayır içeren bir sorgu oluşturur. Sunucu açısından bu sorgu anlamsız bir gürültüden ibarettir; hangi konumda evet bulunduğunu anlayamaz.

Sunucu daha sonra homomorfik şifrelemenin özel özelliklerini kullanarak veritabanını bu şifreli sorguyla birleştirir; kayıtlı her öğeyi karşılık gelen şifreli evet ya da hayır ile çarpar ve sonuçları toplar. Ortaya, istemcinin istediği öğeyi tam olarak içeren tek bir şifreli paket çıkar ve paketten hangi öğenin istendiği anlaşılmaz. İstemci paketin şifresini çözer ve öğesini okur. Sunucu, sorunun ne olduğunu hiçbir zaman bilmeden yanıtlamış olur.

Simetrik PIR adı verilen daha güçlü bir sürüm, ikinci bir güvence ekler: İstemci yalnızca istediği öğeyi öğrenir, veritabanındaki diğer kayıtlar hakkında hiçbir bilgi edinmez. Böylece istemcinin yanı sıra veritabanı da korunur.

## Teknik okurlar için daha yakından bakış

Modern tek sunuculu şemalar kafes kriptografisine, çoğunlukla da öğrenme hataları varsayımına dayanır. İstemcinin sorgusu bir şifreli metinler vektörüdür: hedef dizinde birin, diğer dizinlerde sıfırın şifrelenmiş hâlidir. Şifreleme toplamsal homomorfiktir; bu sayede sunucu şifreli metinleri toplayabilir ve şifrelerini çözmeden açık metin hâlindeki veritabanı kayıtlarıyla çarpabilir.

Sunucu veritabanını bir matris olarak ele alır, şifreli seçim vektörünü uygular ve istenen satırın şifresini çözdüğü tek bir şifreli metin döndürür. Sorgu rastgele gürültüden ayırt edilemediği için sunucu dizin hakkında hiçbir bilgi edinmez.

Tarihsel engel hep maliyet oldu. Basit bir uygulamada sunucu her sorgu için veritabanındaki her öğeye erişmek zorundadır; bu, hesaplama açısından pahalıdır. Şifreli metinler de büyüktür ve bu nedenle bant genişliği maliyeti yüksektir. Son araştırmalar, ön işleme kullanarak bu sorunu ele alıyor. SimplePIR ve FrodoPIR gibi şemalar, sunucunun veritabanını önceden hazırlamasına ve her istemciye küçük bir ipucu vermesine olanak tanır. Böylece işin büyük bölümü çevrimdışı aşamaya taşınır ve canlı sorgular hızlanır. Kafes tabanlı yapıların kuantum saldırılarına karşı da dayanıklı kabul edilmesi, Zcash'ın kuantum sonrası gizliliğe yönelik daha geniş yönelimiyle örtüşür.

## Zcash'te PIR

PIR, Zcash'ı geniş ölçekte hem özel hem de hızlı hâle getirme çabalarının bir parçasıdır.

Daha önce anlatılan cüzdan tarama darboğazı hedefleniyor. Valar Group'teki çalışmalar, cüzdanın kendi verilerini sunucudan alırken sunucunun hangi kayıtların istendiğini öğrenmesini önleyecek özel bilgi erişimi teknikleri geliştiriyor. Bunun somut uygulamalarından biri, nullifier'ları özel olarak kontrol etmektir. Nullifier, bir not harcandığında yayımlanan ve aynı fonların ikinci kez harcanmasını önleyen benzersiz bir işarettir. Cüzdanın çoğu zaman belirli bir nullifier'ın yayımlanıp yayımlanmadığını, başka bir deyişle bir notun hâlâ harcanmamış olup olmadığını kontrol etmesi gerekir. Bugün bunu bir sunucu üzerinden yapmak, hangi notun sorgulandığını açığa çıkarabilir. Özel bilgi erişimi, cüzdanın hangi nullifier'ı önemsediğini açıklamadan bu soruyu sormasını sağlar. Bu çalışma, bugün özel cüzdanların önündeki performans sınırlarını kaldırmayı amaçlayan Project Tachyon ve yeni düğüm yazılımları da dâhil olmak üzere diğer ölçeklendirme çalışmalarıyla birlikte ilerliyor.

Çalışmanın hangi aşamada olduğu konusunda dürüst olmak önemlidir. Bu, tamamlanmış ve kullanıma sunulmuş bir özellik değil; aktif bir araştırma ve mühendislik çalışmasıdır. Kavram köklü, izlenecek yön ise belirlenmiş durumda. Ancak PIR'ı sıradan cihazlardaki günlük cüzdanlar için yeterince verimli hâle getirmek, şu anda üzerinde çalışılan asıl zor kısımdır.

## Canlı örnek: ZecBlock Private

Kasım 2026'da ZecBlock, işlem, blok ve adres sorguları için özel bilgi erişimi kullanan gezgininin bir sürümü olan **ZecBlock Private**'ı (private.zecblock.com) kullanıma sundu.

Bu, PIR üzerine kurulu ilk eksiksiz Zcash blok gezginidir (işlemleri, blokları ve adresleri kapsar). Daha önceki PIR gezgini demoları, adres bakiyeleri gibi daha sınırlı sorgularla kısıtlıydı.

### Özel sorgular nasıl çalışır?

- Sorgu (işlem kimliği, blok yüksekliği/hash'i veya adres), gönderilmeden önce tamamen tarayıcıda şifrelenir.
- Sunucu, hangi kaydın istendiğini öğrenmeden yayımlanan veri kümesinin tamamını işler.
- Sunucu yalnızca tarayıcının şifresini çözebileceği tek bir şifreli yanıt döndürür.
- Var olan bir şeyi aramakla olmayan bir şeyi aramak birbirinden ayırt edilemez (istek boyutu ve biçimi aynıdır).

Her aramanın ardından site, tam olarak nelerin gönderildiğine dair kısa bir özet göstererek gizlilik özelliğinin kolayca incelenmesini sağlar.

### Doğrulama adımları

Her veri yayını imzalanır. Tarayıcı her sonucu görüntülemeden önce imzayı doğrular; böylece kötü niyetli veya hatalı bir sunucu farklı veriler sunamaz.

### Veri güncelliği

Yeni bloklar birkaç saniyede bir yayımlanır. Özel gezginin verileri genellikle standart ZecBlock gezgininin verilerinden yaklaşık 20 saniye geridedir.

### Bant genişliği maliyetleri

Sunucunun veri kümesinin tamamına erişmesi gerektiği için PIR, normal bir sorgudan daha maliyetlidir:

- İşlem sorgusu: yaklaşık 1,2 MB yükleme
- Adres sorgusu: yaklaşık 0,4 MB yükleme

Bu, sunucunun sorgu hakkında hiçbir şey öğrenmemesinin pratik maliyetidir.

### İstemci uygulaması

Tarayıcı istemcisi bir Rust → WebAssembly sarmalayıcısıdır (şu anda ZecBlock deposunda, `prototype/pir-browser` altında). Valar Group'ın açık kaynaklı PIR kütüphaneleri üzerine kurulmuştur. Sarmalayıcı henüz bağımsız bir npm paketi olarak yayımlanmadı, ancak yayımlanması planlanıyor.

### Cüzdan PIR'ından farkı

ZecBlock Private, **herkese açık** zincir verileri için PIR kullanımını gösterir (bilinen bir işlemi, bloğu veya adresi hangisi olduğunu açıklamadan sorgulamak). İzleme anahtarına ait notları özel olarak bulma veya harcanmamış notların nullifier'larını özel olarak kontrol etme gibi daha zor cüzdan sorunlarını **çözmez**. Bunlar aktif araştırma alanları olmaya devam ediyor.

## Yaygın yanlış anlamalar

- PIR, hangi öğeyi istediğinizi gizler; sunucuyla iletişim kurduğunuzu mutlaka gizlemez. Ağ düzeyindeki üst veriler ayrı bir konudur
- PIR, Zcash'a özgü değildir; Zcash'ın cüzdan gizliliğine uyguladığı genel amaçlı bir kriptografik araçtır
- PIR ile daha hızlı eşitleme şu anda üzerinde çalışılan bir hedeftir; cüzdanlarda zaten bulunan bir özellik değildir
- Her şeyi indirip yerel olarak taramak, mevcut yöntemdir; gizlidir ancak yavaştır. PIR, gizliliği koruyup yavaşlığı ortadan kaldırmayı amaçlar

## İlgili sayfalar

- [Zcash Cüzdan Eşitlemesi](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - eşitlemenin bugün neden bu şekilde çalıştığı
- [Hafif Cüzdan Düğümleri](https://zechub.wiki/zcash-tech/lightwallet-nodes) - PIR'ın geliştireceği hafif istemci modeli
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - Zcash gizliliğinin ardındaki diğer başlıca kriptografik araç
- [Kuantum Sonrası Güvenlik](https://zechub.wiki/zcash-tech/post-quantum-security) - kafes tabanlı yöntemlerin gelecek için neden önemli olduğu
- [ZecBlock](https://zecblock.com) - başlıca herkese açık gezgin
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - hem gezgin prototipinde hem de cüzdan araştırmalarında kullanılan PIR kütüphanelerinin geliştiricileri
