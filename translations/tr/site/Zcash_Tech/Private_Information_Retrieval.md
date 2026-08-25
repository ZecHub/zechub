# Özel bilgi erişimi

## Kısaca

- Özel bilgi erişimi ya da PIR, bir cihazın bir sunucunun veritabanından tek bir öğeyi, sunucu hangi öğenin istendiğini öğrenmeden almasını sağlar
- Zcash buna ihtiyaç duyar çünkü özel bir cüzdan, hangi işlemlerin kendisine ait olduğunu kendini ele vermeden bir sunucuya soramaz
- Bugün cüzdanlar ihtiyaç duyduklarından çok daha fazla veri indirip tarar ve senkronizasyonun yavaş olmasının başlıca nedenlerinden biri budur
- PIR, bir cüzdanın yalnızca kendi verisini özel biçimde almasını sağlayarak bu darboğazı ortadan kaldırırken gizliliği de korur
- Bu, Zcash için aktif bir araştırma alanıdır; teoride güçlüdür ve gerçek cüzdanlar için pratik hale getirilmektedir

<br/>

## Bu kimler için

- Özel bir cüzdanın hangi coin'lerin kendisine ait olduğunu sızdırmadan nasıl bulduğunu merak eden herkes için
- PIR'nin Zcash ölçekleme çalışmalarıyla birlikte anıldığını sürekli gören yeni başlayanlar için
- Önce kavramı, sonra bunun altındaki kriptografiyi anlamak isteyen okurlar için

<br/>

## PIR'nin Zcash için çözdüğü sorun

Zcash bir işlemin kime yönelik olduğunu gizler. Bu gizlilik şu zor soruyu doğurur: ağ hangi işlemlerin size ait olduğunu göremiyorsa, kendi cüzdanınız bunları nasıl bulur?

Bugün yanıt oldukça kabadır. Bir cüzdan bir sunucuya hangi işlemler benim diye soramaz, çünkü bu soru Zcash'in gizlemeye çalıştığı şeyi tam olarak açığa çıkarır. Bu yüzden cüzdan bunun yerine büyük miktarda veri indirir ve hangi öğelerin kendisine ait olduğunu görmek için her birini yerel olarak test eder. Bu yöntem işe yarar ve gizliliği korur, ancak yavaş ve ağırdır. Bu tarama işlemi, cüzdan senkronizasyonunun ağır hissettirmesinin başlıca nedenlerinden biridir.

İdeal olan, bir cüzdanın tam olarak kendi verisini bir sunucudan isteyebilmesi ve bunu alabilmesi, üstelik sunucunun neyin istendiğini hiç öğrenmemesidir. Özel bilgi erişimi tam olarak bunu sağlar.

<br/>

## PIR nedir

Özel bilgi erişimi, bir istemcinin bir sunucunun veritabanındaki tek bir kaydı, sunucu hangi kaydı okuduğunu bilmeden okumasını sağlayan kriptografik bir yöntemdir.

İstediğiniz kitabı tam olarak alabildiğiniz ama kütüphanecinin size hangi kitabı verdiğini asla öğrenmediği bir kütüphane hayal edin. Öğenizi alırsınız ve ilginiz gizli kalır. PIR, bu fikrin matematiksel versiyonudur ve herhangi bir veritabanına uygulanır.

Bu kavram kriptografide onlarca yıldır incelenmektedir. İlk olarak 1995'te Chor, Goldreich, Kushilevitz ve Sudan tarafından çoklu sunucu yaklaşımıyla tanıtıldı; ilk tek sunuculu sürüm ise 1997'de Kushilevitz ve Ostrovsky tarafından geldi. Bu, Zcash'in icat ettiği bir şey değildir; Zcash'in şimdi gerçek ve inatçı bir soruna uyguladığı yerleşik bir alandır.

<br/>

## İlk düzeyde PIR nasıl çalışır

PIR kurmanın iki geniş yolu vardır ve aradaki fark önemlidir.

Birincisi birden fazla sunucu kullanır. İstemci, birkaç sunucunun her birine sorgunun bir parçasını gönderir ve yanıtları yerelde birleştirir. Hiçbir tekil sunucu neyin istendiğini öğrenmeye yetecek kadar bilgi görmez. Bu verimlidir, ancak sunucuların birbiriyle iş birliği yapmamasına bağlıdır; bunu gerçek dünyada garanti etmek zordur.

İkincisi birden fazla taraf yerine tek bir sunucu ve akıllı kriptografi kullanır. Burada istemci homomorphic encryption adı verilen özel bir araca dayanır ve gerçek dağıtımlar için en kullanışlı yön de budur, çünkü birbiriyle iş birliği yapmayan birden fazla sunucu gerektirmez.

<br/>

## Mekanizma: homomorphic encryption

Homomorphic encryption, bir sunucunun veri şifreli kalırken onun üzerinde hesaplama yapmasına izin veren bir şifreleme türüdür. Sunucu, alttaki değerleri hiç görmeden doğru şifreli yanıtı üretir.

Bu şekilde kurulan tek sunuculu PIR'nin arkasındaki fikir şudur. İstemci bir listedeki üç numaralı öğeyi ister. Fiilen, üçüncü konum için şifreli bir evet ve diğer tüm konumlar için şifreli bir hayır olan bir sorgu oluşturur. Sunucu açısından bu sorgu yalnızca anlamsız bir gürültüdür; hangi konumun eveti taşıdığını anlayamaz.

Sunucu daha sonra veritabanını bu şifreli sorguyla homomorphic encryption'ın özel özelliklerini kullanarak birleştirir; depolanan her öğeyi karşılık gelen şifreli evet ya da hayır ile çarpar ve sonuçları toplar. Ortaya tek bir şifreli paket çıkar; bu paket istemcinin istediği öğeyi tam olarak içerir ve bunun hangisi olduğunu açığa çıkaran hiçbir şey yoktur. İstemci bu paketi çözer ve öğesini okur. Sunucu soruyu hiç bilmeden soruyu yanıtlamıştır.

Symmetric PIR adı verilen daha güçlü bir sürüm ikinci bir garanti ekler: istemci yalnızca istediği öğeyi öğrenir ve veritabanındaki başka hiçbir kayıt hakkında bilgi edinmez. Bu, veritabanını da istemci kadar korur.

<br/>

## Teknik okurlar için daha yakından bakış

Modern tek sunuculu şemalar lattice kriptografisi üzerine kuruludur; en yaygın olarak da learning with errors varsayımına dayanır. İstemcinin sorgusu ciphertext'lerden oluşan bir vektördür; hedef indekste birin, diğer yerlerde sıfırın şifrelenmiş halidir ve şifreleme toplamsal olarak homomorfiktir, bu nedenle sunucu şifre çözmeden ciphertext'leri toplayabilir ve bunları düz metin veritabanı girdileriyle çarpabilir.

Sunucu veritabanını bir matris olarak ele alır, şifreli seçim vektörünü uygular ve çözüldüğünde istenen satırı veren tek bir ciphertext döndürür. Sorgu rastgele gürültüden ayırt edilemediği için sunucu indeks hakkında hiçbir bilgi edinmez.

Tarihsel engel her zaman maliyet olmuştur. Naif biçimde, sunucu her sorgu için veritabanındaki her girdiye dokunmak zorundadır; bu da hesaplama açısından pahalıdır. Ciphertext'ler de büyüktür; bu da bant genişliği açısından pahalıdır. Son dönem araştırmaları buna ön işleme ile saldırır; SimplePIR ve FrodoPIR gibi şemalar sunucunun veritabanını önceden hazırlamasına ve her istemciye küçük bir ipucu vermesine izin verir. Böylece işin büyük kısmı çevrimdışı aşamaya taşınır ve canlı sorgular hızlı hale gelir. Yararlı bir yan fayda olarak, lattice tabanlı yapılar kuantum saldırılarına karşı da dayanıklı kabul edilir; bu da Zcash'in kuantum sonrası gizliliğe yönelik daha geniş yönelimiyle uyumludur.

<br/>

## Zcash'te PIR

PIR, Zcash'i hem özel hem de ölçekte hızlı hale getirme çabasının bir parçasıdır.

Daha önce açıklanan cüzdan tarama darboğazı hedef alınmaktadır. Valar Group'taki çalışmalar, bir cüzdanın hangi kayıtların istendiğini sunucu öğrenmeden kendi verisini bir sunucudan alabilmesi için özel bilgi erişimi teknikleri geliştiriyor. Somut uygulamalardan biri, nullifier'ları özel biçimde kontrol etmektir. Nullifier, bir note harcandığında yayımlanan benzersiz bir işaretleyicidir ve aynı fonların iki kez harcanmasını önler. Bir cüzdanın çoğu zaman belirli bir nullifier'ın görünüp görünmediğini, yani bir note'un hâlâ harcanmamış olup olmadığını kontrol etmesi gerekir; bunu bugün bir sunucu üzerinden yapmak ise hangi note'un sorulduğunu sızdırabilir. Özel bilgi erişimi, cüzdanın hangi nullifier ile ilgilendiğini açığa çıkarmadan bu soruyu sormasını sağlar. Bu yaklaşım, Project Tachyon ve yeni düğüm yazılımları da dahil olmak üzere, bugün özel cüzdanları geri tutan performans sınırlarını kaldırmayı amaçlayan diğer ölçekleme çalışmalarıyla yan yana durur.

Aşama konusunda dürüst olmak önemlidir. Bu, tamamlanmış ve kullanıma sunulmuş bir özellik değil, aktif araştırma ve mühendislik çalışmasıdır. Kavram iyi yerleşmiştir ve yön bellidir, ancak PIR'yi sıradan cihazlardaki günlük cüzdanlar için yeterince verimli hale getirmek tam da şu anda üzerinde çalışılan zor kısımdır.

<br/>

## Yaygın yanlış anlamalar

- PIR hangi öğeyi istediğinizi gizler, ancak sunucuyla iletişime geçtiğiniz gerçeğini mutlaka gizlemez; ağ düzeyindeki metadata ayrı bir konudur
- PIR Zcash'e özgü değildir; Zcash'in cüzdan gizliliğine uyguladığı genel bir kriptografik araçtır
- PIR ile daha hızlı senkronizasyon, hâlihazırda cüzdanlarda bulunan bir özellik değil, ilerlemekte olan bir hedeftir
- Her şeyi indirip yerelde taramak, yani mevcut yaklaşım, özeldir ama yavaştır; PIR gizliliği korurken bu yavaşlığı ortadan kaldırmayı hedefler

<br/>

## İlgili sayfalar

- [Zcash Cüzdan Senkronizasyonu](https://zechub.wiki/zcash-tech/zcash-wallet-syncing) - senkronizasyonun bugün neden bu şekilde çalıştığı
- [Lightwallet Düğümleri](https://zechub.wiki/zcash-tech/lightwallet-nodes) - PIR'nin iyileştireceği hafif istemci modeli
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) - Zcash gizliliğinin arkasındaki diğer büyük kriptografik araç
- [Kuantum Sonrası Güvenlik](https://zechub.wiki/zcash-tech/post-quantum-security) - lattice tabanlı yöntemlerin gelecek için neden önemli olduğu
