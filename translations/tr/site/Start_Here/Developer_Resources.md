<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Geliştirici Kaynakları

Zcash üzerinde geliştirme yapmak için ihtiyaç duyduğunuz kaynaklar; tek bir yığında listelenmek yerine her birinin ne işe yaradığına göre gruplandırılmıştır.

Yığın 2026'da büyük ölçüde değişti. Ağın geçmişinin büyük bölümünde çalıştığı zcashd, 18 Temmuz 2026'da 3417100 blok yüksekliğinde kullanım ömrünün sonuna ulaştı; değiştirilmemiş her düğüm bu yükseklikte kapandı ve yeniden başlamayı reddedecek. zcashd için yazılmış rehberler artık bir başlangıç noktası değil, tarihin bir parçası; bu nedenle bu sayfa onun yerini alanlar etrafında düzenlenmiştir.

## Yığına genel bakış

| Katman | Kullanılacak araç | Başlangıç noktası |
|:--|:--|:--|
| Tam düğüm | Zebra veya Zakura | [Zebra Kitabı](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Tam düğüm cüzdanı | Beta aşamasındaki Zallet | [Zallet Kitabı](https://zcash.github.io/zallet/) |
| Hafif cüzdan sunucusu | Zaino veya lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Cüzdan kütüphaneleri | librustzcash crate'leri | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobil | Android ve iOS SDK'ları | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spesifikasyon | Protokol spesifikasyonu ve ZIP'ler | [zips.z.cash](https://zips.z.cash) |

## Düğümler

Bir düğüm konsensüsü doğrular ve zinciri tutar. Aktif olarak geliştirilen iki uygulama vardır.

[Zebra](/zcash-tech/zebra-full-node), Zcash Foundation'ın Rust ile yazılmış düğümüdür ve artık çoğu rehberin varsaydığı düğümdür. [Zebra Kitabı](https://zebra.zfnd.org/) kurulumunu ve çalıştırılmasını kapsar; geliştirme ise [depoda](https://github.com/ZcashFoundation/zebra) gerçekleşir.

[Zakura](/zcash-tech/zakura-node), yazarları tarafından “ölçek için geliştirilmiş, konsensüs uyumlu bir Zcash tam düğümü” olarak tanımlanan daha yeni bir düğümdür; daha hızlı senkronizasyon, blok budama ve zcashd uyumluluk modu sunar. Bir Zcash kurucu ortağı olan Sean Bowe ve Dev Ojha tarafından yönetilmektedir. Apache 2.0 kapsamında açık kaynaklıdır ve [zakura-core/zakura](https://github.com/zakura-core/zakura) adresindedir.

ZecHub, aralarındaki ödünleşimleri kapsayan bir [Tam Düğümler](/zcash-tech/full-nodes) sayfasına sahiptir.

## Tam düğüm cüzdanı

zcashd, düğümle birlikte bir cüzdan içeriyordu. Bu cüzdan artık yok ve yerine [Zallet](https://github.com/zcash/zallet) geldi. Zallet Kitabı, onu “Rust ile yazılmış bir tam düğüm Zcash cüzdanı” ve “zcashd cüzdanının yerine geçmek üzere geliştirilen” bir araç olarak tanımlar.

Buna güvenmeden önce güvenlik uyarısını okuyun. Zallet beta aşamasındadır, “tam olarak incelenmemiştir”; uyumluluğu bozan değişiklikler “herhangi bir zamanda meydana gelebilir ve Zallet cüzdanınızı silip yeniden oluşturmanızı gerektirebilir”; ayrıca her zcashd RPC yöntemi henüz aktarılmış değildir.

Mevcut bir kurulumu taşıyorsanız, ZecHub'ın [zcashd'den Zebra ve Zallet'e geçiş rehberi](/guides/migration-guide-zcashd-to-zebrad-zallet) ve [Zallet hızlı başvuru rehberi](/using-zcash/zallet-quick-reference-guide) vardır.

## Hafif cüzdan sunucuları

Çoğu cüzdan bir düğüm çalıştırmaz. Zinciri tutan ve onun kompakt bir görünümünü geri veren bir sunucuyla iletişim kurarlar.

[lightwalletd](https://github.com/zcash/lightwalletd), Go ile yazılmış özgün hizmettir ve “Zcash blokzincirine bant genişliği açısından verimli bir arayüz sağlayan bir arka uç hizmeti” olarak tanımlanır. [Zaino](/zcash-tech/zaino), Rust ile yazılmış daha yeni indeksleyicidir ve kendi zincir kopyasını taşımak yerine tam bir doğrulayıcıdan okur.

[Hafif İstemci Protokolü](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) dokümantasyonu protokolün kendisini kapsar. [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) sayfası, bu sunucuların bir kullanıcı hakkında neleri görüp göremeyeceğini ele alır; birini seçmeden önce bunu anlamakta fayda vardır.

## Cüzdan geliştirme

Cüzdan çalışmalarının çoğu, mobil SDK'ların ve çeşitli masaüstü cüzdanların üzerine inşa edildiği [librustzcash](https://github.com/zcash/librustzcash) altındaki Rust crate'lerinde yapılır. Her crate, [docs.rs](https://docs.rs) üzerinde belgelenmiştir.

| Crate | Ne için kullanılır |
|:--|:--|
| zcash_client_backend | Senkronizasyon ve işlem oluşturma dâhil, “korumalı Zcash hafif istemcileri oluşturmak için API'ler” |
| zcash_client_sqlite | “SQLite tabanlı bir Zcash hafif istemcisi”; yukarıdakinin depolama katmanı |
| zcash_keys | “Zcash anahtar ve adres yönetimi” |
| zcash_primitives | “Zcash temel bileşenlerinin Rust uygulamaları” |
| zcash_protocol | “Zcash protokol ağ sabitleri ve değer türleri” |
| orchard | “Orchard korumalı işlem protokolü” |
| sapling-crypto | “Zcash Sapling için kriptografik kütüphane” |
| pczt | Donanım ve çoklu cihaz imzalamada kullanılan, “kısmen oluşturulmuş Zcash işlemleriyle çalışmak için araçlar” |
| zip321 | ZIP 321'de belirtildiği şekilde ödeme isteği URI'leri |

Mobil için [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) ve [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) bu kütüphaneleri sarmalar. iOS deposu daha önce ZcashLightClientKit olarak adlandırılıyordu; bu nedenle eski bağlantılar ve makaleler bu adı kullanır.

## Spesifikasyon ve kriptografi

[Protokol spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf), [adres ve anahtar kodlamaları](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) dâhil olmak üzere Zcash'in nasıl çalıştığı konusundaki yetkili kaynaktır.

[ZIP'ler](https://zips.z.cash), değişikliklerin önerildiği ve belirtildiği yerdir; dizin, hangilerinin taslak, hangilerinin nihai olduğunu gösterir. Konsensüs değişiklikleri ağ yükseltmelerinde sunulur ve ZecHub bunları [Ağ Yükseltmeleri](/start-here/network-upgrades) sayfasında takip eder.

Alttaki kriptografi için [halo2 Kitabı](https://zcash.github.io/halo2/index.html) ve [Orchard Kitabı](https://zcash.github.io/orchard/) ile birlikte [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) ve [orchard](https://docs.rs/orchard/latest/orchard/) crate belgelerini okuyun. [FROST Kitabı](https://frost.zfnd.org/) eşik imzalarını kapsar ve ZecHub'ın bir [FROST](/zcash-tech/frost) sayfası vardır.

## Testnet

Testnet, TAZ adı verilen değersiz coin'lere sahip ayrı bir zincirdir. Hem Zebra hem de Zakura bununla çalışabilir; [testnet rehberi](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) düğüm yapılandırmasını kapsar.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/), çalışan bir testnet blok gezginidir; ana ağ karşılığı [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) adresindedir.

TAZ edinmek zor olan kısımdır. Herkese açık faucet'ler ortaya çıkıp kaybolur ve eski dokümantasyonda bağlantısı verilenler bu sayfa yazıldığında yanıt vermiyordu. Güvenilir yol, Zcash dokümantasyonunun da önerdiği gibi Zcash R&D Discord'da sormaktır.

## Genel dokümantasyon

[Zcash Dokümantasyonu](https://zcash.readthedocs.io/en/latest/), protokol kavramlarını, entegrasyonu ve madenciliği kapsayan en geniş tek kaynak olmaya devam ediyor. Biraz dikkatle okuyun. zcashd'ye göre sürümlendirilmiştir; dolayısıyla bazı bölümleri artık çalışmayan bir düğümü tanımlarken protokol ve hafif istemci bölümleri faydalı olmaya devam eder. Orada bulunan [Zcash Cüzdan Uygulaması Tehdit Modeli](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), kullanıcı gizliliğine dokunan herhangi bir şey tasarlamadan önce okumaya değerdir.

Genel olarak blokzincirlere yeniyseniz, ortak temeller için olağan öneri [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)'dir ve tamamı ücretsiz okunabilir. Korumalı işlemleri kapsamaz.

## Geliştiricilerin bahsettiği diğer araçlar

[Arti](https://docs.rs/arti/latest/arti/), zcash_client_backend tarafından cüzdan trafiğini yönlendirmek için kullanılan Tor'un Rust uygulamasıdır. [Tailscale](https://github.com/tailscale/tailscale), kendi çalıştırdığınız bir düğüme bağlanmak için gündeme gelir. [warp2](https://github.com/hhanh00/warp2), Hanh tarafından geliştirilen hızlı bir senkronizasyon uygulamasıdır; ancak 2023'ten beri güncellenmemiştir.

## Topluluk ve etkinlikler

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK), protokol ve cüzdan geliştirmesinin tartışıldığı yerdir; [Zcash Community Forum](https://forum.zcashcommunity.com/) ise daha uzun öneri ve destek başlıklarını barındırır.

Yakın zamandaki hackathon sonuçları, insanların neler geliştirdiğine dair iyi bir tablo sunar: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) ve [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Kullanımdan kaldırılmış kaynaklar

Eski makaleler bunlara bağlantı verdiği ve kullanımdan kaldırılmış düğümün nasıl davrandığı konusunda hâlâ başvuru kaynağı oldukları için korunmuştur. Buradan başlamayın.

[Zcashd Kitabı](https://zcash.github.io/zcash/) ve [zcashd RPC başvurusu](https://zcash.github.io/rpc/), Temmuz 2026'da [kullanım ömrünün sonuna](https://zcash.github.io/zcash/user/end-of-life.html) ulaşan yazılımı belgeler. [zcash/zcash](https://github.com/zcash/zcash) deposu arşivlenmiştir.

Eklenecek bir kaynağınız varsa veya burada güncelliğini yitirmiş bir şey fark ederseniz, bir issue ya da pull request açın. Ekiplerin her şeyi güncel tutacak kapasitesi her zaman olmayabilir; karşılaştığınız şeyleri bildirmeniz, rehberlere yön vermeye yardımcı olur.

**Son güncelleme:** Ağustos 2026
