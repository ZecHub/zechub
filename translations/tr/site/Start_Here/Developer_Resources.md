<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Geliştirici Kaynakları

Zcash üzerinde geliştirme yapmak için ihtiyaç duyduğunuz kaynaklar, tek bir yığında listelenmek yerine her birinin ne amaçla kullanıldığına göre gruplandırılmıştır.

Yığın 2026'da büyük ölçüde değişti. Tarihinin büyük bölümünde ağı çalıştıran zcashd, 18 Temmuz 2026'da 3417100 blok yüksekliğinde kullanım ömrünün sonuna ulaştı ve değiştirilmemiş tüm düğümler bu yükseklikte kapandı ve yeniden başlamayı reddedecek. zcashd için yazılmış kılavuzlar artık bir başlangıç noktası değil, tarih niteliğinde; bu nedenle bu sayfa onun yerini alanlar etrafında düzenlenmiştir.

## Yığına genel bakış

| Katman | Kullanılacak araç | Başlangıç için |
|:--|:--|:--|
| Tam düğüm | Zebra veya Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Tam düğüm cüzdanı | Beta aşamasındaki Zallet | [The Zallet Book](https://zcash.github.io/zallet/) |
| Hafif cüzdan sunucusu | Zaino veya lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Cüzdan kütüphaneleri | librustzcash crate'leri | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobil | Android ve iOS SDK'ları | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Spesifikasyon | Protokol spesifikasyonu ve ZIP'ler | [zips.z.cash](https://zips.z.cash) |

## Düğümler

Bir düğüm konsensüsü doğrular ve zinciri tutar. Aktif olarak geliştirilen iki uygulama vardır.

[Zebra](/zcash-tech/zebra-full-node), Zcash Foundation'ın Rust ile yazılmış düğümüdür ve artık çoğu kılavuzun varsaydığı düğümdür. [The Zebra Book](https://zebra.zfnd.org/), onu kurmayı ve çalıştırmayı kapsar; [depo](https://github.com/ZcashFoundation/zebra) ise geliştirmenin gerçekleştiği yerdir.

[Zakura](/zcash-tech/zakura-node), yazarları tarafından "ölçek için oluşturulmuş, konsensüs uyumlu bir Zcash tam düğümü" olarak tanımlanan daha yeni bir düğümdür; daha hızlı senkronizasyon, blok budama ve zcashd uyumluluk modu sunar. Zcash kurucu ortaklarından Sean Bowe ve Dev Ojha tarafından yönetilmektedir. Apache 2.0 lisansıyla [zakura-core/zakura](https://github.com/zakura-core/zakura) adresinde açık kaynaklıdır.

ZecHub, aralarındaki dengeleri ele alan bir [Tam Düğümler](/zcash-tech/full-nodes) sayfasına sahiptir.

## Tam düğüm cüzdanı

zcashd, düğümle birlikte bir cüzdan sunuyordu. Bu cüzdan artık yok ve yerine [Zallet](https://github.com/zcash/zallet) geldi. The Zallet Book, onu "Rust ile yazılmış bir tam düğüm Zcash cüzdanı" ve "zcashd cüzdanının yerine geçmek üzere geliştirilen" bir yazılım olarak tanımlar.

Ona bağımlı olmadan önce güvenlik uyarısını okuyun. Zallet beta aşamasındadır, "tam olarak incelenmemiştir"; uyumluluğu bozan değişiklikler "herhangi bir zamanda gerçekleşebilir ve Zallet cüzdanınızı silip yeniden oluşturmanızı gerektirebilir"; ayrıca her zcashd RPC yöntemi henüz taşınmamıştır.

Mevcut bir kurulumu taşıyorsanız, ZecHub'da [zcashd'den Zebra ve Zallet'e geçiş kılavuzu](/guides/migration-guide-zcashd-to-zebrad-zallet) ve bir [Zallet hızlı başvuru](/using-zcash/zallet-quick-reference-guide) bulunmaktadır.

## Hafif cüzdan sunucuları

Çoğu cüzdan bir düğüm çalıştırmaz. Zinciri tutan ve zincirin kompakt bir görünümünü geri veren bir sunucuyla iletişim kurarlar.

[lightwalletd](https://github.com/zcash/lightwalletd), Go ile yazılmış özgün hizmettir ve "Zcash blok zincirine bant genişliği açısından verimli bir arayüz sağlayan bir arka uç hizmeti" olarak tanımlanır. [Zaino](/zcash-tech/zaino), Rust ile yazılmış daha yeni indeksleyicidir ve kendi zincir kopyasını taşımak yerine tam bir doğrulayıcıdan okur.

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) belgeleri, protokolün kendisini kapsar. [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) sayfası, bu sunucuların bir kullanıcı hakkında neleri görebileceğini ve göremeyeceğini açıklar; birini seçmeden önce bunu anlamakta fayda vardır.

## Cüzdan geliştirme

Cüzdan çalışmalarının çoğu, mobil SDK'ların ve çeşitli masaüstü cüzdanların üzerine inşa edildiği [librustzcash](https://github.com/zcash/librustzcash) altındaki Rust crate'lerinde gerçekleşir. Her crate [docs.rs](https://docs.rs) üzerinde belgelenmiştir.

| Crate | Ne için kullanılır |
|:--|:--|
| zcash_client_backend | Senkronizasyon ve işlem oluşturma dâhil olmak üzere "korumalı Zcash hafif istemcileri oluşturmak için API'ler" |
| zcash_client_sqlite | Yukarıdakiler için depolama katmanı olan "SQLite tabanlı bir Zcash hafif istemcisi" |
| zcash_keys | "Zcash anahtar ve adres yönetimi" |
| zcash_primitives | "Zcash temel bileşenlerinin Rust uygulamaları" |
| zcash_protocol | "Zcash protokol ağ sabitleri ve değer türleri" |
| orchard | "Orchard korumalı işlem protokolü" |
| sapling-crypto | "Zcash Sapling için kriptografik kütüphane" |
| pczt | Donanım ve çoklu cihaz imzalama için kullanılan, "kısmen oluşturulmuş Zcash işlemleriyle çalışmaya yönelik araçlar" |
| zip321 | ZIP 321'de belirtildiği şekliyle ödeme isteği URI'leri |

Mobil için [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) ve [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) bu kütüphaneleri sarmalar. iOS deposunun önceki adı ZcashLightClientKit'ti; bu nedenle eski bağlantılar ve makalelerde bu ad kullanılır.

## Spesifikasyon ve kriptografi

[Protokol spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf), [adres ve anahtar kodlamaları](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) dâhil olmak üzere Zcash'in nasıl çalıştığı konusunda yetkili kaynaktır.

[ZIP'ler](https://zips.z.cash), değişikliklerin önerildiği ve tanımlandığı yerdir; dizin, hangilerinin taslak hangilerinin nihai olduğunu gösterir. Konsensüs değişiklikleri ağ yükseltmeleriyle yayınlanır ve ZecHub bunları [Ağ Yükseltmeleri](/start-here/network-upgrades) sayfasında takip eder.

Alttaki kriptografi için [The halo2 Book](https://zcash.github.io/halo2/index.html) ve [The Orchard Book](https://zcash.github.io/orchard/) kaynaklarını, ayrıca [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) ve [orchard](https://docs.rs/orchard/latest/orchard/) crate belgelerini okuyun. [The FROST Book](https://frost.zfnd.org/) eşik imzalarını kapsar ve ZecHub'ın bir [FROST](/zcash-tech/frost) sayfası vardır.

## Testnet

Testnet, TAZ adı verilen değersiz coin'lere sahip ayrı bir zincirdir. Hem Zebra hem de Zakura bunun üzerinde çalışabilir ve [testnet kılavuzu](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) düğüm yapılandırmasını kapsar.

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/), çalışan bir testnet blok gezginidir; ana ağ karşılığı [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) adresindedir.

TAZ edinmek zor kısımdır, çünkü eski belgelerde bağlantısı verilen musluklar yanıt vermeyi bıraktı. [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz), “kendi düğümünü, cüzdanını ve madencisini” çalıştıran, “korumalı z2z damlaları” ödeyen ve talepleri “captcha sağlayıcısı yerine tarayıcı iş kanıtı” ile sınırlayan, topluluk tarafından işletilen bir musluktur. MIT lisansı altında açık kaynaklıdır. Kullanılamıyorsa, Zcash belgelerinin de önerdiği gibi Zcash R&D Discord'da sorun.

## Genel belgeler

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/), protokol kavramlarını, entegrasyonu ve madenciliği kapsayan en geniş tek kaynak olmayı sürdürmektedir. Biraz dikkatle okuyun. zcashd'ye göre sürümlenmiştir; dolayısıyla bazı bölümleri artık çalışmayan bir düğümü açıklar, buna karşılık protokol ve hafif istemci bölümleri hâlâ faydalıdır. Orada bulunan [Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), kullanıcı gizliliğine dokunan herhangi bir şey tasarlamadan önce okumaya değerdir.

Genel olarak blok zincirlerine yeniyseniz, ortak temel kavramlar için her zamanki öneri [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook)'dir ve tamamı ücretsiz olarak okunabilir. Korumalı işlemleri kapsamaz.

## Geliştiricilerin bahsettiği diğer araçlar

[Arti](https://docs.rs/arti/latest/arti/), cüzdan trafiğini yönlendirmek için zcash_client_backend tarafından kullanılan Tor'un Rust uygulamasıdır. Kendi çalıştırdığınız bir düğüme bağlanmak için [Tailscale](https://github.com/tailscale/tailscale) gündeme gelir. [warp2](https://github.com/hhanh00/warp2), Hanh tarafından geliştirilmiş hızlı bir senkronizasyon uygulamasıdır; ancak 2023'ten beri güncellenmemiştir.

## Topluluk ve etkinlikler

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK), protokol ve cüzdan geliştirmenin tartışıldığı yerdir; [Zcash Community Forum](https://forum.zcashcommunity.com/) ise daha uzun öneriler ve destek başlıkları içerir.

Yakın dönem hackathon sonuçları, insanların neler geliştirdiğine dair iyi bir tablo sunar: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) ve [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985).

## Kullanımdan kaldırılmış kaynaklar

Eski makaleler bunlara bağlantı verdiği ve kullanımdan kaldırılmış düğümün nasıl davrandığına dair hâlâ referans oldukları için korunmuştur. Buradan başlamayın.

[The Zcashd Book](https://zcash.github.io/zcash/) ve [zcashd RPC başvurusu](https://zcash.github.io/rpc/), Temmuz 2026'da [kullanım ömrünün sonuna](https://zcash.github.io/zcash/user/end-of-life.html) ulaşan yazılımı belgeler. [zcash/zcash](https://github.com/zcash/zcash) deposu arşivlenmiştir.

Eklenecek bir kaynağınız varsa veya burada güncelliğini yitirmiş bir şey görürseniz bir issue ya da pull request açın. Ekiplerin her şeyi güncel tutacak kapasitesi her zaman olmayabilir; karşılaştığınız sorunları bildirmek, kılavuzların yönlendirilmesine yardımcı olur.

**Son güncelleme:** Ağustos 2026
