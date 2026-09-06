<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Geliştirici Kaynakları

Zcash üzerinde geliştirme yapmak için ihtiyaç duyduğunuz kaynaklar; tek bir yığında listelenmek yerine, her birinin ne işe yaradığına göre gruplandırılmıştır.

Yığın 2026'da büyük ölçüde değişti. Ağın tarihinin büyük bölümünde çalışmasını sağlayan zcashd, 18 Temmuz 2026'da 3417100 blok yüksekliğinde kullanım ömrünün sonuna ulaştı ve değiştirilmemiş her düğüm bu yükseklikte kapandı; yeniden başlamayı da reddedecek. zcashd için yazılmış rehberler artık bir başlangıç noktası değil, tarihin bir parçası; dolayısıyla bu sayfa onun yerini alanlar etrafında düzenlenmiştir.

## Yığına genel bakış

| Katman | Kullanılacak araç | Şununla başlayın |
|:--|:--|:--|
| Tam düğüm | Zebra veya Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Tam düğüm cüzdanı | Beta sürümündeki Zallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| Hafif cüzdan sunucusu | Zaino veya lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Cüzdan kütüphaneleri | librustzcash crate'leri | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobil | Android ve iOS SDK'ları | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spesifikasyon | Protokol spesifikasyonu ve ZIP'ler | [zips.z.cash](https://zips.z.cash) |

## Düğümler

Bir düğüm konsensüsü doğrular ve zinciri tutar. Aktif olarak geliştirilen iki uygulama vardır.

[Zebra](/zcash-tech/zebra-full-node), Zcash Foundation'ın Rust ile yazılmış düğümüdür ve artık çoğu rehberin varsaydığı düğümdür. [The Zebra Book](https://zebra.zfnd.org/) onu kurmayı ve çalıştırmayı kapsar; geliştirme ise [depoda](https://github.com/ZcashFoundation/zebra) gerçekleşir.

[Zakura](/zcash-tech/zakura-node), yazarlarının "ölçeklenebilirlik için oluşturulmuş, konsensüs uyumlu bir Zcash tam düğümü" olarak tanımladığı daha yeni bir düğümdür; daha hızlı senkronizasyon, blok budama ve zcashd uyumluluk moduna sahiptir. Zcash kurucu ortaklarından Sean Bowe ve Dev Ojha tarafından yönetilmektedir. [zakura-core/zakura](https://github.com/zakura-core/zakura) altında Apache 2.0 lisansıyla açık kaynaklıdır.

ZecHub'ın aralarındaki avantaj ve dezavantajları ele alan bir [Tam Düğümler](/zcash-tech/full-nodes) sayfası vardır.

## Tam düğüm cüzdanı

zcashd, düğümle birlikte bir cüzdan sunuyordu. Bu cüzdan artık yok ve yerine [Zallet](https://github.com/zcash/zallet) geldi. The Zallet Book, onu "Rust ile yazılmış bir tam düğüm Zcash cüzdanı" ve "zcashd cüzdanının yerine geçmek üzere oluşturulan" bir araç olarak tanımlar.

Ona bağımlı olmadan önce güvenlik uyarısını okuyun. Zallet beta sürümündedir, "tam olarak incelenmemiştir", uyumluluğu bozan değişiklikler "istediğiniz anda gerçekleşebilir ve Zallet cüzdanınızı silip yeniden oluşturmanızı gerektirebilir"; ayrıca her zcashd RPC yöntemi henüz taşınmamıştır.

Mevcut bir kurulumu taşıyorsanız, ZecHub'ın [zcashd'den Zebra ve Zallet'e geçiş rehberi](/guides/migration-guide-zcashd-to-zebrad-zallet) ve bir [Zallet hızlı başvuru rehberi](/using-zcash/zallet-quick-reference-guide) vardır.

## Hafif cüzdan sunucuları

Çoğu cüzdan bir düğüm çalıştırmaz. Zinciri tutan ve onun kompakt bir görünümünü geri gönderen bir sunucuyla iletişim kurarlar.

[lightwalletd](https://github.com/zcash/lightwalletd), Go ile yazılmış özgün hizmettir ve "Zcash blokzincirine bant genişliği açısından verimli bir arayüz sağlayan bir arka uç hizmeti" olarak tanımlanır. [Zaino](/zcash-tech/zaino), Rust ile yazılmış daha yeni indeksleyicidir ve zincirin kendi kopyasını taşımak yerine tam bir doğrulayıcıdan okur.

[Hafif İstemci Protokolü](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) belgeleri protokolün kendisini kapsar. [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) sayfası, bu sunucuların kullanıcı hakkında neleri görebileceğini ve göremeyeceğini ele alır; birini seçmeden önce bunu anlamak önemlidir.

## Cüzdan geliştirme

Cüzdan çalışmalarının çoğu, mobil SDK'ların ve çeşitli masaüstü cüzdanların üzerine inşa edildiği [librustzcash](https://github.com/zcash/librustzcash) altındaki Rust crate'lerinde gerçekleşir. Her crate [docs.rs](https://docs.rs) üzerinde belgelenmiştir.

| Crate | Ne için kullanılır |
|:--|:--|
| zcash_client_backend | Senkronizasyon ve işlem oluşturma dâhil, "korumalı Zcash hafif istemcileri oluşturmak için API'ler" |
| zcash_client_sqlite | Yukarıdakinin depolama katmanı olan, "SQLite tabanlı bir Zcash hafif istemcisi" |
| zcash_keys | "Zcash anahtar ve adres yönetimi" |
| zcash_primitives | "Zcash ilkellerinin Rust uygulamaları" |
| zcash_protocol | "Zcash protokol ağ sabitleri ve değer türleri" |
| orchard | "Orchard korumalı işlem protokolü" |
| sapling-crypto | "Zcash Sapling için kriptografik kütüphane" |
| pczt | Donanım ve çoklu cihaz imzalama için kullanılan, "kısmen oluşturulmuş Zcash işlemleriyle çalışmaya yönelik araçlar" |
| zip321 | ZIP 321'de belirtildiği üzere ödeme isteği URI'leri |

Mobil için [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) ve [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) bu kütüphaneleri sarmalar. iOS deposunun önceki adı ZcashLightClientKit idi; bu nedenle eski bağlantılar ve makaleler bu adı kullanır.

## Spesifikasyon ve kriptografi

[Protokol spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf), [adres ve anahtar kodlamaları](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) dâhil olmak üzere Zcash'in nasıl çalıştığı konusunda yetkili kaynaktır.

[ZIP'ler](https://zips.z.cash), değişikliklerin önerildiği ve belirtildiği yerdir; dizin, hangilerinin taslak ve hangilerinin nihai olduğunu gösterir. Konsensüs değişiklikleri ağ yükseltmeleriyle yayınlanır ve ZecHub bunları [Ağ Yükseltmeleri](/start-here/network-upgrades) sayfasında takip eder.

Alttaki kriptografi için [The halo2 Book](https://zcash.github.io/halo2/index.html) ve [The Orchard Book](https://zcash.github.io/orchard/) kaynaklarını, ayrıca [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) ve [orchard](https://docs.rs/orchard/latest/orchard/) crate belgelerini okuyun. [The FROST Book](https://frost.zfnd.org/) eşik imzalarını kapsar ve ZecHub'ın bir [FROST](/zcash-tech/frost) sayfası vardır.

## Testnet

Testnet, TAZ adlı değersiz coin'lere sahip ayrı bir zincirdir. Hem Zebra hem de Zakura bunun üzerinde çalışabilir; [testnet rehberi](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) düğüm yapılandırmasını kapsar.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/), [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) adresinde bir mainnet karşılığı bulunan, çalışan bir testnet blok gezginidir.

TAZ edinmek zor kısımdır. Herkese açık faucet'ler ortaya çıkıp kaybolur ve eski belgelerde bağlantısı verilenler bu sayfa yazıldığında yanıt vermiyordu. Güvenilir yol, Zcash belgelerinin de önerdiği gibi Zcash R&D Discord'da sormaktır.

## Genel belgeler

[Zcash Belgeleri](https://zcash.readthedocs.io/en/latest/), protokol kavramlarını, entegrasyonu ve madenciliği kapsayan en geniş tek kaynak olmaya devam ediyor. Biraz dikkatle okuyun. zcashd'ye göre sürümlendirilmiştir; bu nedenle bazı bölümleri artık çalışmayan bir düğümü anlatırken, protokol ve hafif istemci bölümleri faydalı olmaya devam eder. Orada yer alan [Zcash Cüzdan Uygulaması Tehdit Modeli](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), kullanıcı gizliliğine dokunan herhangi bir şey tasarlamadan önce okumaya değerdir.

Genel olarak blokzincirlerine yeniyseniz, ortak temeller için olağan öneri [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)'dir ve tamamı ücretsiz okunabilir. Korumalı işlemleri kapsamaz.

## Geliştiricilerin bahsettiği diğer araçlar

[Arti](https://docs.rs/arti/latest/arti/), cüzdan trafiğini yönlendirmek için zcash_client_backend tarafından kullanılan Tor'un Rust uygulamasıdır. Kendi çalıştırdığınız bir düğüme bağlanmak için [Tailscale](https://github.com/tailscale/tailscale) sıkça gündeme gelir. [warp2](https://github.com/hhanh00/warp2), Hanh tarafından geliştirilmiş hızlı bir senkronizasyon uygulamasıdır; ancak 2023'ten beri güncellenmemiştir.

## Topluluk ve etkinlikler

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK), protokol ve cüzdan geliştirmenin konuşulduğu yerdir; [Zcash Community Forum](https://forum.zcashcommunity.com/) ise daha uzun önerileri ve destek başlıklarını barındırır.

Yakın tarihli hackathon sonuçları, insanların neler geliştirdiğine dair iyi bir tablo sunar: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) ve [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Kullanımdan kaldırılmış kaynaklar

Eski makaleler bunlara bağlantı verdiği ve kullanımdan kaldırılmış düğümün nasıl davrandığına ilişkin referans olmaya devam ettikleri için tutulmuştur. Buradan başlamayın.

[The Zcashd Book](https://zcash.github.io/zcash/) ve [zcashd RPC referansı](https://zcash.github.io/rpc/), Temmuz 2026'da [kullanım ömrünün sonuna](https://zcash.github.io/zcash/user/end-of-life.html) ulaşan yazılımı belgeler. [zcash/zcash](https://github.com/zcash/zcash) deposu arşivlenmiştir.

Eklenecek bir kaynağınız varsa veya burada güncelliğini yitirmiş bir şey fark ederseniz, bir issue ya da pull request açın. Ekiplerin her şeyi güncel tutacak kapasitesi her zaman olmayabilir; karşılaştığınız durumu bildirmek rehberlerin yönlendirilmesine yardımcı olur.

**Son güncelleme:** Ağustos 2026
