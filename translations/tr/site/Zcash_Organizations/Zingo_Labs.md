#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt Text" width="50"/> ZingoLabs

[Resmi Web Sitesi](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs, insan deneyimini geliştirmeye adanmış vizyonerlerden oluşan bir ekiptir. Teknolojinin insanlığa fayda sağlaması gerektiğine ve rızaya dayalı etkileşimler yoluyla geliştiğimize inanıyoruz. Bunu mümkün kılan kalıpları belirliyoruz.

Zingo Lab Cyan, bir Shielded DAO olarak faaliyet gösterir. Fonlarımızı, her üyenin bir view key'e sahip olduğu bir hazinede tutuyoruz. Üyeler bir teklifi oylayarak desteklediğinde, fonlar hazineden harcanır.

## Projeler

### Zingo! Wallet ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet, kullanıcı dostu olacak şekilde tasarlanmış, tam özellikli bir Zcash cüzdanıdır; ancak daha ileri düzey kullanıcılar için bazı gelişmiş özellikler de içerir. Transparent, Sapling ve Orchard havuzlarını destekler, tekrar eden ödemeler için bir adres defterine sahiptir ve çeşitli dillerde kullanılabilir. Orchard'ı destekleyen ve NU5 formatlarını uygulayan ilk cüzdandı.

Zingo!'nun başlıca özelliklerinden biri, işlemleriniz hakkında değerli içgörüler sunmak için Memo alanını kullanabilmesidir.

Zingo!, mobil cihazlar ve PC'ler için mevcuttur. Tüm indirmeleri [burada](https://zingolabs.org/) bulabilirsiniz.

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
Uygulamaların kullanımı için zcash işlevlerini açığa çıkaran bir API ve test uygulaması. Zingolib, hem zingo-mobile için bir kütüphane sağlar hem de lightwalletd aracılığıyla zcashd ile etkileşim kurmak için Zingo-cli adlı, komut satırı tabanlı bir lightwalletd-proxy istemcisi olan yerleşik bir cli uygulaması içerir.

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino, Zingo ekibi tarafından Rust ile geliştirilmiş bir Indexer'dır; lightwalletd'nin yerini almayı ve zcashd kullanımının sonlandırılması projesini ileri taşımayı amaçlar.

Zaino, hem cüzdanlar ve tam blockchain geçmişine ihtiyaç duymayan uygulamalar gibi hafif istemciler, hem de tam istemciler veya cüzdanlar için temel özellikler sunar. Ayrıca block explorer'ları da destekler ve bir Zebra veya Zcashd tam doğrulayıcısı tarafından yönetilen hem finalize edilmiş blockchain'e hem de finalize edilmemiş best chain ve mempool'a erişim sağlar.

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
Zcash süreçlerini başlatan ve yöneten bir dizi yardımcı araç. Bu, şu alanların geliştirilmesinde entegrasyon testleri için kullanılır:
- light client'lar
- indexer'lar
- doğrulayıcılar

Amacı, zcash ve zebra gibi çekirdek düğümler (doğrulayıcılar), lightwallet ve zaino gibi indexer'lar ve asgari olarak hafif istemci cüzdanı olarak zingo-cli için son derece uyarlanabilir ve sağlam bir test ortamı sunmaktır.

Bu depo, Zcashd kullanımının sonlandırılması sürecindeki geçişi kolaylaştırmak için çeşitli doğrulayıcıların (Zcashd ve Zebrad gibi) ve indexer'ların (Lightwalletd ve Zaino gibi) işlevselliğini karşılaştırmak üzere tasarlanmıştır.

zcash-zocal-net, Zcash zincir verilerini (mainnet, testnet ve regtest için) başlatma, önbelleğe alma ve yükleme araçları sağlamanın yanı sıra, tüm Lightwallet RPC hizmetlerinde Lightwalletd ile Zaino'nun yeteneklerini karşılaştırmak için bir dizi test de içerir. Bu testler, Zaino üzerinde barındırılan Lightwallet RPC hizmetlerini değerlendirmek için doğrudan Zaino'dan çalıştırılabilir (bkz. [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)]).
