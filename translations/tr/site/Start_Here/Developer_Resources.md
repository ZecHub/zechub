<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Geliştirici Kaynakları

Zcash üzerinde geliştirme yapmak için ihtiyaç duyduğunuz kaynaklar; tek bir yığın halinde listelenmek yerine, her birinin ne işe yaradığına göre gruplanmıştır.

Yığın 2026'da büyük ölçüde değişti. Tarihinin büyük bölümünde ağı çalıştıran `zcashd`, 18 Temmuz 2026'da 3417100 blok yüksekliğinde kullanım ömrünün sonuna ulaştı ve değiştirilmemiş her düğüm bu yükseklikte kapandı ve yeniden başlatılmayı reddedecek. `zcashd` için yazılmış rehberler artık bir başlangıç noktası olmaktan çok tarihsel kaynak niteliğinde, bu yüzden bu sayfa onun yerini alan yapılar etrafında düzenlendi.

## Yığına kısa bakış

| Katman | Ne kullanılmalı | Başlangıç noktası |
|:--|:--|:--|
| Tam düğüm | Zebra veya Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Tam düğüm cüzdanı | Zallet, beta aşamasında | [The Zallet Book](https://zcash.github.io/zallet/) |
| Hafif cüzdan sunucusu | Zaino veya lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Cüzdan kütüphaneleri | librustzcash crate'leri | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobil | Android ve iOS SDK'ları | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spesifikasyon | Protokol spesifikasyonu ve ZIP'ler | [zips.z.cash](https://zips.z.cash) |

## Düğümler

Bir düğüm konsensüsü doğrular ve zinciri tutar. Aktif olarak geliştirilen iki uygulama vardır.

[Zebra](/zcash-tech/zebra-full-node), Zcash Foundation'ın Rust ile yazılmış düğümüdür ve artık çoğu rehber bunu varsayar. [The Zebra Book](https://zebra.zfnd.org/) onu kurmayı ve çalıştırmayı anlatır, geliştirme ise [repository](https://github.com/ZcashFoundation/zebra) üzerinde yapılır.

[Zakura](/zcash-tech/zakura-node), yazarları tarafından "ölçek için inşa edilmiş, konsensüs uyumlu bir Zcash tam düğümü" olarak tanımlanan daha yeni bir düğümdür; daha hızlı senkronizasyon, blok budama ve bir `zcashd` uyumluluk modu sunar. Liderliğini Zcash'in kurucu ortaklarından Sean Bowe ve Dev Ojha yapmaktadır. Apache 2.0 lisansı altında açık kaynak olarak [zakura-core/zakura](https://github.com/zakura-core/zakura) adresinde yer alır.

ZecHub'da, aralarındaki ödünleşimleri ele alan bir [Full Nodes](/zcash-tech/full-nodes) sayfası bulunur.

## Tam düğüm cüzdanı

`zcashd`, düğümle birlikte bir cüzdan sunuyordu. Bu cüzdan artık yok ve onun yerine [Zallet](https://github.com/zcash/zallet) geldi. The Zallet Book, onu "Rust ile yazılmış bir tam düğüm Zcash cüzdanı" ve "`zcashd` cüzdanının yerine geçmesi için" geliştirilen bir araç olarak tanımlıyor.

Ona bağımlı hale gelmeden önce güvenlik uyarısını okuyun. Zallet beta aşamasındadır, "tam olarak incelenmemiştir", uyumsuz değişiklikler "her an meydana gelebilir ve Zallet cüzdanınızı silip yeniden oluşturmanızı gerektirebilir", ayrıca her `zcashd` RPC yöntemi henüz taşınmış değildir.

Mevcut bir kurulumu taşıyorsanız, ZecHub'da [zcashd'den Zebra ve Zallet'e geçiş rehberi](/guides/migration-guide-zcashd-to-zebrad-zallet) ve bir [Zallet hızlı başvuru kılavuzu](/using-zcash/zallet-quick-reference-guide) bulunur.

## Hafif cüzdan sunucuları

Çoğu cüzdan bir düğüm çalıştırmaz. Zinciri tutan ve onun sıkıştırılmış bir görünümünü geri veren bir sunucuyla konuşurlar.

[lightwalletd](https://github.com/zcash/lightwalletd), Go ile yazılmış özgün hizmettir ve "Zcash blokzincirine bant genişliği açısından verimli bir arayüz sağlayan bir arka uç hizmeti" olarak tanımlanır. [Zaino](/zcash-tech/zaino) ise Rust ile yazılmış daha yeni dizinleyicidir ve zincirin kendi kopyasını taşımak yerine tam bir doğrulayıcıdan okuma yapar.

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) belgeleri protokolün kendisini açıklar. [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) sayfası ise bu sunucuların bir kullanıcı hakkında neleri görüp neleri göremediğini ele alır; birini seçmeden önce bunu anlamakta fayda vardır.

## Cüzdan geliştirme

Cüzdan çalışmalarının çoğu, mobil SDK'ların ve çeşitli masaüstü cüzdanların temel aldığı [librustzcash](https://github.com/zcash/librustzcash) altındaki Rust crate'lerinde gerçekleşir. Her crate, [docs.rs](https://docs.rs) üzerinde belgelenmiştir.

| Crate | Ne işe yarar |
|:--|:--|
| zcash_client_backend | Senkronizasyon ve işlem oluşturma dahil olmak üzere "korumalı Zcash hafif istemcileri oluşturmak için API'ler" |
| zcash_client_sqlite | Yukarıdakinin depolama katmanı olan "SQLite tabanlı bir Zcash hafif istemcisi" |
| zcash_keys | "Zcash anahtar ve adres yönetimi" |
| zcash_primitives | "Zcash primitflerinin Rust uygulamaları" |
| zcash_protocol | "Zcash protokol ağ sabitleri ve değer türleri" |
| orchard | "Orchard korumalı işlem protokolü" |
| sapling-crypto | "Zcash Sapling için kriptografik kütüphane" |
| pczt | Donanım ve çoklu cihaz imzalama için kullanılan, "kısmen oluşturulmuş Zcash işlemleriyle çalışmaya yönelik araçlar" |
| zip321 | ZIP 321'de tanımlandığı şekliyle ödeme isteği URI'leri |

Mobil tarafta, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) ve [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) bu kütüphaneleri sarmalar. iOS deposunun önceki adı ZcashLightClientKit idi; bu yüzden daha eski bağlantılar ve yazılar bu adı kullanır.

## Spesifikasyon ve kriptografi

[protokol spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf), [adres ve anahtar kodlamaları](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) dahil olmak üzere Zcash'in nasıl çalıştığı konusunda temel otoritedir.

[ZIP'ler](https://zips.z.cash), değişikliklerin önerildiği ve tanımlandığı yerdir; dizin de hangilerinin taslak, hangilerinin nihai olduğunu gösterir. Konsensüs değişiklikleri ağ yükseltmeleriyle yayınlanır ve ZecHub bunları [Network Upgrades](/start-here/network-upgrades) sayfasında takip eder.

Alttaki kriptografi için [The halo2 Book](https://zcash.github.io/halo2/index.html) ve [The Orchard Book](https://zcash.github.io/orchard/)'u, yanında da [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) ve [orchard](https://docs.rs/orchard/latest/orchard/) crate belgelerini okuyun. [The FROST Book](https://frost.zfnd.org/) eşik imzalarını ele alır; ZecHub'da ayrıca bir [FROST](/zcash-tech/frost) sayfası vardır.

## Testnet

Testnet, değersiz coin'lere sahip ayrı bir zincirdir ve TAZ olarak adlandırılır. Hem Zebra hem de Zakura bunun üzerinde çalışabilir; [testnet guide](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) düğüm yapılandırmasını ele alır.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/), çalışan bir testnet blok gezginidir; mainnet karşılığı ise [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/)'dedir.

TAZ edinmek işin zor kısmıdır. Halka açık faucet'ler ortaya çıkar ve kaybolur; bu sayfa yazıldığında eski belgelerde bağlantı verilenler yanıt vermiyordu. Güvenilir yol, Zcash R&D Discord'unda istemektir; Zcash belgelerinin kendisi de bunu önerir.

## Genel belgeler

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/), protokol kavramları, entegrasyon ve madenciliği kapsayan en geniş tek kaynak olmayı sürdürüyor. Yine de dikkatli okuyun. `zcashd` sürümüne göre versiyonlandığı için bazı bölümleri artık çalışmayan bir düğümü anlatır; buna karşılık protokol ve hafif istemci bölümleri hâlâ faydalıdır. Orada yer alan [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), kullanıcı gizliliğine dokunan herhangi bir şey tasarlamadan önce okunmaya değerdir.

Genel olarak blokzincirlere yeniyseniz, ortak temeller için alışılmış öneri [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)'dir ve tamamı ücretsiz okunabilir. Korumalı işlemleri kapsamaz.

## Geliştiricilerin bahsettiği diğer araçlar

[Arti](https://docs.rs/arti/latest/arti/), `zcash_client_backend` tarafından cüzdan trafiğini yönlendirmek için kullanılan Tor'un Rust uygulamasıdır. Kendi çalıştırdığınız bir düğüme bağlanmak için [Tailscale](https://github.com/tailscale/tailscale) sıkça gündeme gelir. [warp2](https://github.com/hhanh00/warp2), Hanh tarafından geliştirilen hızlı bir senkronizasyon uygulamasıdır, ancak 2023'ten beri güncellenmemiştir.

## Topluluk ve etkinlikler

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK), protokol ve cüzdan geliştirmenin tartışıldığı yerdir; [Zcash Community Forum](https://forum.zcashcommunity.com/) ise daha uzun önerilere ve destek başlıklarına ev sahipliği yapar.

Yakın dönem hackathon sonuçları, insanların neler geliştirdiğine dair iyi bir resim sunar: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) ve [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Kullanımdan kalkmış kaynaklar

Eski makaleler bunlara bağlantı verdiği ve artık kullanılmayan düğümün nasıl davrandığı konusunda hâlâ başvuru kaynağı oldukları için tutuluyorlar. Buradan başlamayın.

[The Zcashd Book](https://zcash.github.io/zcash/) ve [zcashd RPC reference](https://zcash.github.io/rpc/), Temmuz 2026'da [kullanım ömrünün sonuna](https://zcash.github.io/zcash/user/end-of-life.html) ulaşan yazılımı belgeliyor. [zcash/zcash](https://github.com/zcash/zcash) deposu arşivlenmiştir.

Eklenecek bir kaynağınız varsa ya da burada güncelliğini yitirmiş bir şey fark ederseniz, bir issue veya pull request açın. Ekiplerin her şeyi güncel tutacak kapasitesi her zaman olmayabiliyor ve karşılaştığınız şeyi işaretlemeniz rehberlerin yönlendirilmesine yardımcı oluyor.

**Son güncelleme:** Ağustos 2026
