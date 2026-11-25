# Özel bilgi erişimi

## Kısaca

- Özel bilgi erişimi (PIR), bir cihazın sunucudan veritabanındaki tek bir öğeyi almasını ve sunucunun hangi öğenin istendiğini öğrenmemesini sağlar
- Zcash buna ihtiyaç duyar; çünkü gizlilik odaklı bir cüzdan, kendini ele vermeden sunucuya hangi işlemlerin kendisine ait olduğunu soramaz
- Günümüzde cüzdanlar ihtiyaç duyduklarından çok daha fazla veriyi indirip tarıyor; eşitlemenin yavaş olmasının başlıca nedenlerinden biri bu
- PIR, cüzdanın yalnızca kendisine ait verileri gizlilik içinde almasını sağlayarak gizliliği korurken bu darboğazı ortadan kaldırabilir
- Zcash için aktif bir araştırma alanı olan PIR, kuramsal olarak güçlüdür ve gerçek cüzdanlarda kullanılabilecek hâle getirilmektedir
- Canlı bir örnek zaten mevcut: [ZecBlock Private](https://private.zecblock.com), ilk tam PIR tabanlı Zcash blok gezginidir (işlemler, bloklar ve adresler)

## Kimler için

- Gizlilik odaklı bir cüzdanın hangi coinlerin kendisine ait olduğunu sızdırmadan nasıl bulduğunu merak eden herkes
- Zcash ölçeklendirme çalışmalarıyla birlikte PIR'den sıkça söz edildiğini gören yeni başlayanlar
- Önce kavramı, ardından altında yatan kriptografiyi öğrenmek isteyen okurlar
- PIR tabanlı, çalışan bir blok gezginini merak eden herkes

## PIR'ın Zcash için çözdüğü sorun

Zcash bir işlemin kime ait olduğunu gizler. Bu gizlilik zor bir soruyu beraberinde getirir: Ağ hangi işlemlerin size ait olduğunu göremiyorsa, kendi cüzdanınız bunları nasıl bulur?

Bugün yanıt oldukça nettir. Cüzdan, sunucuya hangi işlemlerin bana ait olduğunu soramaz; çünkü bu soru, Zcash'ın gizlemeye çalıştığı şeyi tam olarak açığa çıkarır. Bu yüzden cüzdan bunun yerine çok miktarda veriyi indirir ve hangi öğelerin kendisine ait olduğunu görmek için her birini yerel olarak sınar. Bu yöntem işe yarar ve gizliliği korur, ancak yavaş ve kaynak tüketicidir. Bu tarama, cüzdan eşitlemesinin ağır ilerlemesinin başlıca nedenlerinden biridir.

İdeal olan, cüzdanın sunucudan tam olarak kendisine ait verileri isteyip alabilmesi ve sunucunun ne istendiğini hiçbir zaman öğrenmemesidir. Özel bilgi erişimi tam da bunu sağlar.

## PIR nedir?

Özel bilgi erişimi, istemcinin sunucuya hangi girdiyi okuduğunu açıklamadan sunucunun veritabanındaki tek bir girdiyi okumasını sağlayan kriptografik bir yöntemdir.

İstediğiniz kitabı alabileceğiniz, ancak kütüphanecinin size hangi kitabı verdiğini hiç öğrenmediği bir kütüphane düşünün. İstediğiniz öğeyi alırsınız ve ilginiz gizli kalır. PIR, bu fikrin herhangi bir veritabanına uygulanmış matematiksel biçimidir.

Bu kavram, kriptografide onlarca yıldır incelenmektedir. İlk olarak 1995'te Chor, Goldreich, Kushilevitz ve Sudan tarafından ortaya atılmış; bu araştırmacılar çok sunuculu yaklaşımı tanımlamıştır. İlk tek sunuculu sürüm ise 1997'de Kushilevitz ve Ostrovsky tarafından geliştirilmiştir. Bu, Zcash'ın icat ettiği bir şey değildir; Zcash'ın bugün gerçek ve çözümü zor bir soruna uyguladığı, köklü bir araştırma alanıdır.

## PIR'ın temel işleyişi

PIR geliştirmenin iki genel yolu vardır ve aralarındaki fark önemlidir.

İlk yol birden fazla sunucu kullanır. İstemci, sorgunun bir parçasını birkaç sunucunun her birine gönderir ve yanıtlarını yerel olarak birleştirir. Hiçbir sunucu, ne istendiğini öğrenmeye yetecek kadar bilgi göremez. Bu yöntem verimlidir, ancak sunucuların birbiriyle iş birliği yapmamasına bağlıdır; bunu gerçek dünyada garanti etmek zordur.

İkinci yol, birden fazla taraf yerine tek bir sunucu ve akıllı kriptografi kullanır. Bu yöntemde istemci, homomorfik şifreleme adı verilen özel bir araca dayanır. Birden fazla sunucunun birbiriyle iş birliği yapmamasını gerektirmediğinden, gerçek uygulamalarda en kullanışlı yön budur.

## Mekanizma: homomorfik şifreleme

Homomorfik şifreleme, veriler şifreli kalırken sunucunun bu veriler üzerinde hesaplama yapmasına olanak tanıyan bir şifreleme türüdür. Sunucu, temel değerleri hiç görmeden doğru ve şifreli bir yanıt üretir.

Bu yöntemle kurulan tek sunuculu PIR'ın temel fikri şöyledir. İstemci bir listenin üçüncü öğesini ister. Üçüncü konum için şifrelenmiş bir evet, diğer tüm konumlar içinse şifrelenmiş bir hayır niteliğinde bir sorgu oluşturur. Sunucu için bu sorgu anlamsız bir gürültüden ibarettir; hangi konumda evet bulunduğunu anlayamaz.

Sunucu daha sonra homomorfik şifrelemenin özel özelliklerini kullanarak veritabanını bu şifrelenmiş sorguyla birleştirir: Saklanan her öğeyi karşılık gelen şifrelenmiş evet ya da hayır ile çarpar ve sonuçları toplar. Ortaya, istemcinin istediği öğeyi tam olarak içeren tek bir şifreli paket çıkar; hangi öğenin istendiğini açığa çıkaran hiçbir şey yoktur. İstemci bu paketin şifresini çözer ve öğesini okur. Sunucu, sorunun ne olduğunu hiçbir zaman bilmeden yanıtı vermiş olur.

Simetrik PIR adı verilen daha güçlü bir sürüm, ikinci bir güvence ekler: İstemci yalnızca istediği öğeyi öğrenir, veritabanındaki diğer girdiler hakkında hiçbir şey öğrenmez. Böylece yalnızca istemci değil, veritabanı da korunur.

## Teknik okurlar için daha yakından inceleme

Modern tek sunuculu şemalar, çoğunlukla hatalı öğrenme varsayımına dayanan kafes kriptografisi üzerine kuruludur. İstemcinin sorgusu, şifreli metinlerden oluşan bir vektördür: Hedef dizindeki bir değerin şifrelenmiş hâli ve diğer tüm konumlarda sıfır bulunur. Şifreleme toplamsal olarak homomorfiktir; bu sayede sunucu şifreli metinleri toplayabilir ve şifrelerini çözmeden düz metin veritabanı girdileriyle çarpabilir.

Sunucu, veritabanını bir matris olarak ele alır, şifrelenmiş seçim vektörünü uygular ve istenen satırın şifresini çözen tek bir şifreli metin döndürür. Sorgu rastgele gürültüden ayırt edilemediğinden, sunucu dizin hakkında bilgi edinemez.

Tarih boyunca en büyük engel hep maliyet olmuştur. Basit bir yaklaşımda sunucu, her sorgu için veritabanındaki tüm girdilere erişmek zorundadır; bu hesaplama açısından pahalıdır. Ayrıca şifreli metinler büyüktür ve bant genişliği açısından maliyetlidir. Son araştırmalar bu sorunları ön işleme kullanarak ele alıyor. SimplePIR ve FrodoPIR gibi şemalar, sunucunun veritabanını önceden hazırlamasına ve her istemciye küçük bir ipucu vermesine olanak tanır. Böylece işin büyük kısmı çevrimdışı aşamaya aktarılır ve canlı sorgular hızlanır. Yararlı bir ek avantaj da kafes tabanlı yapıların kuantum saldırılarına dayanıklı kabul edilmesidir; bu, Zcash'ın kuantum sonrası gizliliğe yönelik daha geniş kapsamlı yönelimiyle uyumludur.

## Zcash içinde PIR

PIR, Zcash'ı geniş ölçekte hem gizli hem de hızlı hâle getirme çabasının bir parçasıdır.

Daha önce açıklanan cüzdan taraması darboğazı, çözülmesi hedeflenen sorundur. Valar Group bünyesindeki çalışmalar, cüzdanın hangi girdilerin istendiğini sunucuya açıklamadan kendi verilerini sunucudan alabilmesi için özel bilgi erişimi teknikleri geliştiriyor. Somut uygulamalardan biri, nullifier'ları gizlilik içinde kontrol etmektir. Nullifier, bir note harcandığında yayımlanan ve aynı fonların iki kez harcanmasını önleyen benzersiz bir işarettir. Cüzdanın çoğu zaman belirli bir nullifier'ın ortaya çıkıp çıkmadığını, başka bir deyişle bir note'un hâlâ harcanmamış olup olmadığını kontrol etmesi gerekir. Bugün bunu sunucu üzerinden yapmak, hangi note'un sorulduğunu açığa çıkarabilir. Özel bilgi erişimi, cüzdanın hangi nullifier'la ilgilendiğini açıklamadan bu soruyu sormasını sağlar. Bu çalışma, günümüzde gizlilik odaklı cüzdanların performansını sınırlayan engelleri ortadan kaldırmayı amaçlayan Project Tachyon ve yeni düğüm yazılımları dâhil olmak üzere diğer ölçeklendirme çalışmalarıyla birlikte ilerlemektedir.

Çalışmanın hangi aşamada olduğu konusunda dürüst olmak önemlidir. Bu, tamamlanmış ve kullanıma sunulmuş bir özellik değil; aktif bir araştırma ve mühendislik çalışmasıdır. Kavram köklüdür ve izlenecek yön belirlenmiştir; ancak PIR'ı sıradan cihazlarda günlük cüzdan kullanımına yetecek kadar verimli hâle getirmek, şu anda üzerinde çalışılan asıl zorluktur.

## Canlı örnek: ZecBlock Private

Kasım 2026'da ZecBlock, işlem, blok ve adres aramalarında özel bilgi erişimi kullanan gezgin sürümü **ZecBlock Private**'u (private.zecblock.com) kullanıma sundu.

Bu, PIR üzerine kurulmuş ilk tam Zcash blok gezginidir (işlemleri, blokları ve adresleri kapsar). Önceki PIR gezgini demoları, adres bakiyeleri gibi daha sınırlı sorgularla kısıtlıydı.

### Gizli aramalar nasıl çalışır?

- Sorgu (işlem kimliği, blok yüksekliği/hash'i veya adres), gönderilmeden önce tamamen tarayıcıda şifrelenir.
- Sunucu, hangi kaydın istendiğini öğrenmeden yayımlanmış veri kümesinin tamamını işler.
- Sunucu, yalnızca tarayıcının şifresini çözebileceği tek bir şifreli yanıt döndürür.
- Var olan bir şeyi aramak, var olmayan bir şeyi aramaktan ayırt edilemez (istek boyutu ve biçimi aynıdır).

Her aramadan sonra site, tam olarak ne gönderildiğinin kısa bir özetini göstererek gizlilik özelliğinin kolayca incelenmesini sağlar.

### Doğrulama adımları

Her veri yayını imzalanır. Tarayıcı, her sonucu görüntülemeden önce imzayı doğrular; böylece kötü niyetli veya hatalı çalışan bir sunucu farklı verilerle değiştirme yapamaz.

### Verilerin güncelliği

Yeni bloklar birkaç saniyede bir yayımlanır. Özel gezginin verileri, genellikle normal ZecBlock gezgininin verilerinden yaklaşık 20 saniye geridedir.

### Bant genişliği maliyetleri

Sunucunun veri kümesinin tamamına erişmesi gerektiğinden PIR, normal bir aramadan daha maliyetlidir:

- İşlem araması: yaklaşık 1,2 MB yükleme
- Adres araması: yaklaşık 0,4 MB yükleme

Sorgu hakkında sunucunun hiçbir şey öğrenmemesinin pratik maliyeti budur.

### İstemci uygulaması

Tarayıcı istemcisi, Rust → WebAssembly sarmalayıcısıdır (şu anda ZecBlock deposunda `prototype/pir-browser` altında). Valar Group'dan alınan açık kaynaklı PIR kütüphaneleri üzerine kurulmuştur. Sarmalayıcı henüz bağımsız bir npm paketi olarak yayımlanmamıştır, ancak bu planlanmaktadır.

### Cüzdan PIR'ından farkı

ZecBlock Private, **açık** Zincir verileri için PIR'ı gösterir (bilinen bir işlemi, bloğu veya adresi hangisi olduğunu açıklamadan arama). Bu yöntem, görüntüleme anahtarına hangi note'ların ait olduğunu gizlilik içinde keşfetme veya harcanmamış note'lar için nullifier'ları gizlilik içinde kontrol etme şeklindeki daha zor cüzdan sorununu **çözmez**. Bunlar hâlâ aktif araştırma alanlarıdır.

## Yaygın yanlış anlamalar

- PIR, hangi öğeyi istediğinizi gizler; sunucuyla bağlantı kurduğunuzu mutlaka gizlemez. Ağ düzeyindeki üst veriler ayrı bir konudur
- PIR, Zcash'a özgü değildir; Zcash'ın cüzdan gizliliğine uyguladığı genel bir kriptografik araçtır
- PIR sayesinde daha hızlı eşitleme, üzerinde çalışılan bir hedeftir; cüzdanlarda zaten bulunan bir özellik değildir
- Her şeyi indirip yerel olarak taramak, mevcut yaklaşım olarak gizliliği korur ancak yavaştır. PIR, yavaşlığı ortadan kaldırırken gizliliği korumayı amaçlar

## İlgili sayfalar

- [Zcash Cüzdan Eşitlemesi](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - eşitlemenin bugün neden bu şekilde çalıştığı
- [Hafif İstemci Düğümleri](https://zechub.wiki/zcash-tech/lightwallet-nodes) - PIR'ın iyileştirebileceği hafif istemci modeli
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - Zcash gizliliğinin arkasındaki diğer önemli kriptografik araç
- [Kuantum Sonrası Güvenlik](https://zechub.wiki/zcash-tech/post-quantum-security) - kafes tabanlı yöntemlerin gelecek için neden önemli olduğu
- [ZecBlock](https://zecblock.com) - başlıca açık gezgin
- [Valar Group](https://zechub.wiki/zcash-organizations/valar-group) - hem gezgin prototipinde hem de cüzdan araştırmalarında kullanılan PIR kütüphanelerinin geliştiricileri
