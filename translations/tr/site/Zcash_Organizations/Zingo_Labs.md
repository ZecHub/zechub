#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[Resmî Web Sitesi](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs insan deneyimini geliştirmeye kendini adamış vizyonerlerden oluşan bir ekip. Teknolojinin insanlığa fayda sağlaması gerektiğine ve rızaya dayalı etkileşimler yoluyla geliştiğimize inanıyoruz. Bunu mümkün kılan örüntüleri belirliyoruz.

Zingo Lab Cyan, Shielded DAO olarak faaliyet gösterir. Fonlarımızı, her üyenin bir görüntüleme anahtarına sahip olduğu bir hazinede tutuyoruz. Üyeler bir öneri lehinde oy verdiğinde fonlar hazineden harcanır.

## Projeler

### Zingo! Cüzdanı ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Cüzdanı, kullanıcı dostu olacak şekilde tasarlanmış, ancak daha ileri düzey kullanıcılar için bazı gelişmiş özellikler de içeren tam donanımlı bir Zcash cüzdanıdır. Şeffaf, Sapling ve Ironwood havuzlarını destekler, tekrarlanan ödemeler için bir adres defterine sahiptir ve çeşitli dillerde kullanılabilir. Orchard desteği sunan ve NU5 formatlarını uygulayan ilk cüzdandı.

Zingo!'ün başlıca özelliklerinden biri, işlemleriniz hakkında değerli bilgiler sunmak için Memo alanını kullanabilmesidir.

Zingo! mobil cihazlar ve bilgisayarlar için kullanılabilir. Tüm indirmeleri [burada](https://zingolabs.org/) bulabilirsiniz

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
Uygulamaların kullanımı için Zcash işlevselliğini sunan bir API ve test uygulaması. Zingolib, zingo-mobile için bir kitaplığın yanı sıra, zingo-cli adlı, [Zaino](/zcash-tech/zaino) gibi bir zincir indeksleyiciyle iletişim kuran komut satırı hafif cüzdan uygulamasını da sağlar.

### Zaino İndeksleyici ([GitHub](https://github.com/zingolabs/zaino))
Zaino, Zingo ekibi tarafından geliştirilen, Zcash blok zinciri için bir Rust indeksleyicidir. [Z3 stack](/zcash-tech/z3-stack) içindeki indeksleyicidir: bir [Zebra](/zcash-tech/zebra-full-node) doğrulayıcısından zincir verilerini indeksler ve cüzdanlara, gezginlere ve diğer istemcilere hizmet verir. lightwalletd için devam yoludur.

Zaino, hem cüzdanlar gibi hafif istemciler ve blok zincirinin tam geçmişini gerektirmeyen uygulamalar hem de tam istemciler veya cüzdanlar için temel özellikler sunar. Ayrıca, bir Zebra tam doğrulayıcı tarafından yönetilen hem kesinleşmiş blok zincirine hem de kesinleşmemiş en iyi zincir ve bellek havuzuna erişim sağlayarak blok gezginlerini de destekler.

`zcashd`, 18 Temmuz 2026'da 3.417.100 numaralı blokta Destek Sonu durmasına ulaştı ve Ironwood (NU6.3) desteği sunmaz. Zaino, bir Zebra doğrulayıcısını okur.

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

Zcash süreçlerini başlatan ve yöneten bir yardımcı araçlar kümesi. Bu, aşağıdakilerin geliştirilmesindeki entegrasyon testlerinde kullanılır:
- hafif istemciler
- indeksleyiciler
- doğrulayıcılar

Amacı, Zebra gibi çekirdek düğümler (doğrulayıcılar), Zaino gibi indeksleyiciler ve zingo-cli gibi hafif istemci cüzdanları için son derece uyarlanabilir ve sağlam bir test ortamı sunmaktır.

Başlattığı varsayılan yığın Zebrad, zainod ve zcash-devtool'dir. Eski `zcashd` ve lightwalletd süreçleri, desteklenmeyen bir `legacy-stack` özelliğinin arkasında bulunur ve kaldırılmaları planlanmıştır.

Ana ağ, test ağı ve regtest için Zcash zincir verilerini başlatmak, önbelleğe almak ve yüklemek için araçlar sağlamanın yanı sıra zcash-local-net, Zaino'ün test paketinden Zaino üzerinde barındırılan Lightwallet RPC hizmetlerini değerlendirmek için kullanılır (bkz. [Zaino test belgeleri](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)).
