#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Resmî Web Sitesi](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs, insan deneyimini geliştirmeye adanmış vizyonerlerden oluşan bir ekiptir. Teknolojinin insanlığa fayda sağlaması gerektiğine ve rızaya dayalı etkileşimlerle geliştiğimize inanıyoruz. Bunu mümkün kılan örüntüleri belirliyoruz.

Zingo Lab Cyan, Korumalı DAO olarak faaliyet gösterir. Fonlarımızı, her üyenin bir görüntüleme anahtarına sahip olduğu bir hazinede saklıyoruz. Üyeler bir teklifi onaylamak için oy kullandığında fonlar hazineden harcanır.

## Projeler

### Zingo! Cüzdan ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Cüzdan, kullanım kolaylığı için tasarlanmış, tüm özelliklere sahip bir Zcash cüzdanıdır; ancak ileri düzey kullanıcılar için bazı gelişmiş özellikler de içerir. Şeffaf, Sapling ve Ironwood havuzlarını destekler, yinelenen ödemeler için bir adres defteri sunar ve çeşitli dillerde kullanılabilir. Orchard desteği sunan ve NU5 biçimlerini uygulayan ilk cüzdandır.

Zingo! ürününün başlıca özelliklerinden biri, işlemleriniz hakkında değerli bilgiler sunmak için Memo alanını kullanabilmesidir.

Zingo mobil için 3.0 sürümü (31 Ekim 2026), NU7 desteği sunar ve SwapKit üzerinden yerleşik zincirler arası takaslar ekler. Bilgisayar uygulaması, 2.0.26 sürümünden beri SwapKit takaslarını, 2.0.27 sürümünden beri de Mainnet NU7 desteğini sunar.

Zingo! mobil cihazlarda ve bilgisayarlarda kullanılabilir. Tüm indirmeleri [burada](https://zingolabs.org/) bulabilirsiniz.

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Uygulamaların kullanabilmesi için zcash işlevlerini sunan bir API ve test uygulaması. Zingolib, zingo-mobile için bir kütüphanenin yanı sıra zingo-cli adlı bir komut satırı uygulaması da sağlar. Bu hafif cüzdan, [Zaino](/zcash-tech/zaino) gibi bir Zincir indeksleyicisiyle iletişim kurar.

### Zaino İndeksleyicisi ([GitHub](https://github.com/zingolabs/zaino))
Zaino, Zcash blokzinciri için Rust indeksleyicisidir ve Zingo ekibi tarafından geliştirilmiştir. [Z3 yığınının](/zcash-tech/z3-stack) indeksleyicisidir: bir [Zebra](/zcash-tech/zebra-full-node) doğrulayıcısından Zincir verilerini indeksler ve cüzdanlara, gezginlere ve diğer istemcilere sunar. lightwalletd için ardıl çözümdür.

Zaino, tam blokzincir geçmişine ihtiyaç duymayan cüzdanlar ve uygulamalar gibi hafif istemciler için olduğu kadar tam istemciler veya cüzdanlar için de temel özellikler sunar. Ayrıca, Zebra tam doğrulayıcısı tarafından yönetilen son hâli kesinleşmiş blokzincire ve henüz kesinleşmemiş en iyi Zincir'e ve mempool'a erişim sağlayarak blok gezginlerini de destekler.

`zcashd`, 18 Temmuz 2026 tarihinde 3.417.100 numaralı blokta Destek Sonu nedeniyle durduruldu ve Ironwood (NU6.3) desteği sunmaz. Zaino, bir Zebra doğrulayıcısından veri okur.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Zcash süreçlerini başlatıp yöneten bir araçlar kümesi. Bu araçlar, aşağıdakilerin geliştirilmesinde entegrasyon testleri için kullanılır:
- hafif istemciler
- indeksleyiciler
- doğrulayıcılar

Amacı, Zebra gibi çekirdek düğümler (doğrulayıcılar), Zaino gibi indeksleyiciler ve zingo-cli gibi hafif istemci cüzdanları için son derece uyarlanabilir ve sağlam bir test ortamı sunmaktır.

Başlattığı varsayılan yığın Zebrad, zainod ve zcash-devtool bileşenlerinden oluşur. Eski `zcashd` ve lightwalletd süreçleri, desteklenmeyen bir `legacy-stack` özelliğinin arkasında çalışır ve kaldırılmaları planlanmıştır.

Zcash Zincir verilerini (mainnet, testnet ve regtest için) başlatma, önbelleğe alma ve yükleme araçları sunmanın yanı sıra zcash-local-net, Zaino'nin test paketinde Zaino içinde barındırılan Lightwallet RPC hizmetlerini değerlendirmek için kullanılır (bkz. [Zaino test belgeleri](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
