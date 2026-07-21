# Zaino Indexer

Zaino, Zingo ekibi tarafından Rust ile geliştirilen bir Indexer'dır; lightwalletd'nin yerini almayı ve zcashd kullanım dışı bırakma projesini ileri taşımayı amaçlar.

Zaino, cüzdanlar ve tam blockchain geçmişine ihtiyaç duymayan uygulamalar gibi hafif istemciler ile tam istemciler veya cüzdanlar için temel özellikler sunar. Ayrıca block explorer'ları da destekler; bir Zebra veya Zcashd tam doğrulayıcısı tarafından yönetilen hem kesinleşmiş blockchain'e hem de kesinleşmemiş en iyi zincire ve mempool'a erişim sağlar.

## Neden yeni bir Indexer?

Bunun temel nedeni geleceğe hazırlanmaktır. Zcashd ve lightwalletd, 2016 yılında bitcoind kodundan fork edilerek C plus plus kullanılarak inşa edildi. Her iki hizmeti oluşturmak için kullanılan platform ve kod tabanı artık eskimeye, ölçeklendirilmesi, bakımı ve üzerinde modern özellikler geliştirilmesi zorlaşmaya başlıyor.

Rust, Zcash'in gelecekteki geliştirmelere hazır olmasını sağlayan, yeni geliştiricileri Zcash ekosistemi üzerinde ve çevresinde pek çok yeni işlevsellik geliştirmeye davet eden modern, sağlam ve güvenli bir dildir.

Bununla birlikte Zaino, mümkün olan yerlerde geriye dönük uyumluluğu hedefler; benimsenmedeki sürtünmeyi azaltmaya yardımcı olan API'ler ve arayüzler sunarak daha geniş Zcash ekosisteminin, önemli yeniden yazımlara veya öğrenme eğrilerine ihtiyaç duymadan Zaino'nun geliştirmelerinden faydalanmasını sağlar.

Ayrıca Zaino, RPC erişimi ve eksiksiz bir istemci kütüphanesi aracılığıyla hafif istemci işlevselliğinin tam düğümden ayrılmasına olanak tanıyacak; geliştiricilerin Zaino'yu entegre ederek zincir verilerine doğrudan hafif istemci uygulamalarından erişmesini sağlayacak ve Zebra düğümündeki hassas verileri yalıtılmış ve güvenli tutacaktır.

## Zaino'nun nasıl çalıştığını gösteren bazı diyagramlar

### Zaino İç Mimari
![Zaino Internal Architecture](https://i.ibb.co/mRTNtfy/image-2025-01-02-190143429.png)

### Zaino Canlı Hizmet Mimarisi
![Zebra Live Service Architecture](https://i.ibb.co/x7dbRY8/image-2025-01-02-190349017.png)

### Zaino Sistem Mimarisi
![Zaino System Architecture](https://i.ibb.co/wwL0XZv/image-2025-01-02-190448037.png)


## Nereden daha fazla bilgi edinebilirim?
Zaino Indexer hakkında daha fazla bilgiyi resmî [Zcash Community Forum başlığında](https://forum.zcashcommunity.com/t/zingo-labs-accelerates-zcashd-deprecation/48545/38) veya resmî [Github sayfasında](https://github.com/zingolabs/zaino) okuyabilirsiniz
