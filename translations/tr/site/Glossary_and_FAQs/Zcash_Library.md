# Zcash Kütüphanesi

Zcash ile ilgili temel terimler, kavramlar ve kaynaklar için kapsamlı bir sözlük.

### Hızlı Gezinme
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Term | Definition |
|------|-----------|
| Actions | Orchard protokolü, her Spend ve Output için ayrı ayrı birkaç kanıt oluşturmak yerine bunları tek bir Action içinde birleştirir. |
| Addresses | Zcash'te Shielded (Z/zaddr) ve Transparent (T/taddr) adresler bulunur. Unified addresses (UA), NU5 yükseltmesinin ardından Z ve T'nin yerini almak üzere kademeli olarak devreye girmektedir. |
| Arborist Call | Zcash protokolü ve araştırma geliştirmeleriyle ilgili güncellemeleri kapsayan iki haftada bir yapılan çağrı. Zcash Community Forum ve Discord üzerinde düzenlenir. [Toplantı Notları](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Forum Duyuruları](https://forum.zcashcommunity.com) |
| Auto-shielding | Kullanıcıların (daha spesifik olarak cüzdanlarının) fonları bir transparent adresten en güncel shielded ZEC havuzuna otomatik olarak taşımasını sağlar. |

## B

| Term | Definition |
|------|-----------|
| Benchmarking | Madenciler, Zcash madenciliğinde kullanılan çeşitli donanımların verimliliğine ilişkin metrikler gönderebilir. [Buradan görüntüleyin](https://zcashbenchmarks.info) |
| Block | Block, Zcash blokzincirinde ağ üzerinden gönderilmiş bir işlem kümesini içeren bir kayıttır. Ortalama olarak yaklaşık her 75 saniyede bir blokzincire yeni bir blok eklenir. |
| Block Explorer | Blokzincirdeki geçmiş ve güncel tüm işlemleri görüntülemek için çevrimiçi bir araç. [Zcash Block Explorer](https://zcashexplorer.app/) |
| Blogs | [ZODL Blog (eski adıyla Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blogu](https://zfnd.org/blog/) / [ZecHub Blogu](https://zechub.wiki/zechub-dao) |
| Blossom | Zcash için 3. Büyük Ağ Yükseltmesi. [Daha Fazla Bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Term | Definition |
|------|-----------|
| Canopy | Zcash için 5. Büyük Ağ Yükseltmesi. [Daha Fazla Bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Bir taahhütte bulunan kişinin, doğrulayıcının taahhüt edilen polinomun iddia edilen değerlendirmelerini doğrulamak için kullanabileceği kısa bir dizeyle bir polinoma taahhütte bulunmasını sağlar. Zcash protokolündeki iletişim maliyetlerini azaltmak için faydalıdır. |
| Community | [Resmî Zcash Community Forum](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | İş ispatı blok üretimini koruyan ve bunun üzerine bir hisse ispatı kesinlik katmanı ekleyen, önerilmiş hibrit bir konsensüs tasarımıdır; böylece bloklar madencilikten vazgeçilmeden daha güçlü kesinlik kazanır. Trailing Finality Layer araştırmasından doğmuştur ve Shielded Labs tarafından geliştirilmektedir; 2026 itibarıyla hâlâ testnet geliştirme aşamasındadır. |
| CrossPay | ZODL cüzdanındaki bir özelliktir; merkezi bir borsa yerine NEAR Intents üzerinden yönlendirilerek, alıcının tercih ettiği varlık ve zincirde ödeme almasını sağlarken sizin shielded ZEC harcamanıza olanak tanır. |
| Cypherpunk Zero | ECC, illüstratör Stranger Wolf, Mighty Jaxx ve seçili ekosistem ortakları arasındaki yaratıcı bir evren ve iş birliği girişimi. [Cypherpunk Zero Sitesi](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea Koleksiyonu](https://opensea.io/collection/cypherpunk-zero) |

## D

| Term | Definition |
|------|-----------|
| DeFi | ZEC'i DeFi ile entegre eden projeler: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/) |
| Deshielding | Bir işlemin zaddr'den (shielded address) taddr'ye (transparent address) gönderilmesini ifade eder. İşlemin kaynağı görünmez, ancak fonlar kamuya açık şekilde görülebilen bir değer havuzuna girer. |
| Developer Resources | [Geliştirici Kaynakları](https://www.zcashcommunity.com/developers/) |
| Documentation | [Resmî Dokümantasyon](https://zcash.readthedocs.io/en/latest/) |

## E

| Term | Definition |
|------|-----------|
| ECC | Zcash protokolünü başlatan ekip olan Electric Coin Company; daha önce Zcash Company olarak biliniyordu. Tüm mühendislik ekibi, Bootstrap kurulu ile yaşanan bir yönetişim anlaşmazlığının ardından Ocak 2026'da istifa etti ve ardından ZODL'yi kurdu. |
| ECDSA | Elliptic Curve Digital Signature Algorithm, kriptografik olarak güvenli bir dijital imza şemasıdır. ECDSA imzalama/doğrulama algoritması, eliptik eğri nokta çarpımına dayanır. |
| Education | Zcash'i açıklayan öğrenme odaklı videolar [burada](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Shielded adreslere gönderilen işlemler için ödeme alıcısının görebildiği ek bir alandır. Şifreli not yalnızca gönderici ve alıcı tarafından görülebilir. |
| Equihash | Zcash'te kullanılan bellek odaklı proof-of-work madencilik algoritmasıdır. |
| Events | Zcash ile ilgili etkinliklerin takvimi [Luma](https://luma.com/zcash) ve [Zcash Foundation](https://zfnd.org/zf-events/) üzerinde görüntülenebilir |
| Exchanges | [Zcash destekleyen borsaların listesi](https://z.cash/exchanges/) |

## F

| Term | Definition |
|------|-----------|
| Fiat-Shamir | Etkileşimli bir bilgi kanıtını alıp buna dayalı bir dijital imza oluşturma tekniğidir. Bu sayede bazı olgular (ör. bir sırrın bilgisi), altta yatan bilgiler ifşa edilmeden kamuya açık biçimde kanıtlanabilir. |
| Formal Verification | Yalnızca testlere güvenmek yerine, bir sistemin tam olarak belirtildiği şekilde davrandığını matematiksel olarak kanıtlamaktır. Ironwood Action devresi, sağlamlık hatalarının bulunmadığını göstermek amacıyla zkSecurity ve ZODL katkıcıları tarafından Lean teorem ispatlayıcısı kullanılarak bu şekilde doğrulanmıştır. |
| Founders Reward | Founders Reward, toplam blok ödülünün yüzde 20'sini temsil eder; her bloğun değerinden kesilir ve protokol geliştirmesi ile büyümeyi desteklemek için şeffaf biçimde dağıtılır. |
| Free2z | Zcash destekli anonim içerik ve özel bağışlar için bir araç. [Free2z](https://free2z.com) |
| FROST | Flexible Round-Optimized Schnorr Threshold imza şeması. [Araştırma Makalesi](https://eprint.iacr.org/2020/852) |

## G

| Term | Definition |
|------|-----------|
| Governance | ZIP sürecinden çıkan kararlar, Zcash spesifikasyonuna ve ağın çalışmasını sağlayan yazılıma yazılır. Değişiklikler, ağın çoğunluğu yükseltmeyi benimsediğinde ve konsensüs bozulmadığında zincir üzerinde onaylanır. [Tam Protokol Geçmişi](https://zfnd.org/protocol-governance/) |

## H

| Term | Definition |
|------|-----------|
| Halo | Güvenilir kurulumlara ihtiyaç duymadan devre yükseltmelerini mümkün kılar; böylece Zcash shielded protokolü gelecekteki iyileştirme ve genişletmeler için daha çevik hale gelir. [Teknik Açıklama](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Hiyerarşik deterministik cüzdanlar tek bir seed'den bir dizi anahtar çifti üretir; kolaylık, yönetilebilirlik ve yüksek düzey güvenlik sağlar. |
| Heartwood | Zcash'in 4. Büyük Ağ Yükseltmesi. [Daha Fazla Bilgi](https://z.cash/upgrade/heartwood/) |

## I

| Term | Definition |
|------|-----------|
| Index | CoinDesk'in ZCX Endeksi, Zcash için gerçek zamanlı USD eşdeğeri spot kuru temsil eder. [Fiyat Endeksi](https://www.coindesk.com/indices/zcx/) |
| Integrations | Bir dizi üçüncü taraf sağlayıcı aracılığıyla Zcash ödemeleri kabul edebilirsiniz. [Ödeme İşlemcileri](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Hesaplamayı iki taraf — bir Prover ve bir Verifier — arasındaki mesaj alışverişi olarak modelleyen soyut bir makinedir. |
| Investment | Zcash'e maruz kalmak isteyen kurumsal yatırımcılar veya aile ofisleri için çeşitli finansal seçenekler mevcuttur. [Tam liste](https://z.cash/investors/) |
| Ironwood | 28 Temmuz 2026'da 3.428.143. blokta mainnet'te etkinleşen ağ yükseltmesidir (NU6.3). Ironwood olarak da adlandırılan yeni bir shielded pool sundu ve mevcut değerin turnstile üzerinden taşınması için Orchard havuzunu yalnızca harcamaya açık hale getirdi. [Daha fazla bilgi](/zcash-tech/ironwood) |

## J

| Term | Definition |
|------|-----------|
| JubJub | zk-SNARK devrelerinde verimli şekilde uygulanmak üzere tasarlanmış bir eliptik eğri. |

## K

| Term | Definition |
|------|-----------|
| Keystone Wallet | Yerel Zcash (Orchard shielded) desteğine sahip, ZODL ile soğuk imzalama için uyumlu, air-gapped bir donanım cüzdanı. [Keystone](https://keyst.one) |

## L

| Term | Definition |
|------|-----------|
| Layer-1 | Bir temel ağı ve onun altyapısını ifade eder. Layer-1 blokzincirleri, başka bir ağa ihtiyaç duymadan işlemleri doğrulayabilir ve kesinleştirebilir. Zcash bir L1 blokzinciridir. |
| librustzcash | Zcash ile çalışmak için gerekli tüm crate'leri ve bağımlılıkları içeren bir Rust çalışma alanı. [repo](https://github.com/zcash/librustzcash) |
| Lightwalletd | Hafif istemcilere blokzincir bilgisi sunan stateless bir sunucu. [Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Term | Definition |
|------|-----------|
| Metrics | Ağ metrikleri [burada](https://tokenterminal.com/explorer/projects/zcash/metrics/all) mevcuttur |
| Metadata | Bir kullanıcının Zcash işlemiyle birlikte üretilen veriler. Buna blok yüksekliği, işlem sürümü veya sona erme yüksekliği vb. dahil olabilir. |
| Mobile SDK | Android'i Zcash'e bağlayan hafif bir SDK'dır; üçüncü taraf Android uygulamalarının shielded işlemler göndermesine ve almasına olanak tanır. [Github](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Zcash ağındaki düğümlerin, her blok için, kendi kendini ayarlayan bir zorluk seviyesine dayalı bir çözüm bulmak amacıyla karmaşık matematiksel hesaplamalar yaparak yarıştığı süreçtir. [Rehber](https://z.cash/mining-zcash/) |
| Multisignature | Fon harcamak için birden fazla özel anahtar imzası gerektiren bir adres. Şu anda multisig işlevi yalnızca transparent adresler tarafından desteklenmektedir. |

## N

| Term | Definition |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Shielded Labs tarafından, protokolün uzun vadeli güvenlik bütçesinin tamamen ihraçlara dayanmaması için işlem ücretlerinin bir kısmının yakılmasını öneren bir teklif. ZIP 234'te belirtilmiştir, 2026 itibarıyla inceleme altındadır. |
| Nighthawk | Zcash için bir mobil cüzdan. [Web Sitesi](https://nighthawkwallet.com) |
| Noir Wallet | Zcash Community Grants tarafından desteklenen, shielded ZEC'i QR kodlara ve manuel transferlere dayanmak yerine doğrudan tarayıcı uygulamalarına bağlamak için geliştirilmiş bir Zcash tarayıcı eklentisi cüzdanı. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Orchard shielded havuzu ve Unified Address'leri tanıtan, Zcash için 6. Büyük Ağ Yükseltmesi. [Daha Fazla Bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash Community Grants programını ve Shielded Labs'i finanse etmek için blok sübvansiyonunu ayarlayan, Zcash için 7. Büyük Ağ Yükseltmesi. 2024'ün sonlarında etkinleştirildi. [Daha Fazla Bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood'dan sonraki bir sonraki büyük ağ yükseltmesi. Aday özellikler arasında Project Tachyon'ın ölçeklendirme çalışmaları, Zcash Shielded Assets ve Network Sustainability Mechanism yer alıyor. |

## O

| Term | Definition |
|------|-----------|
| Oblivious Synchronization | Project Tachyon kapsamında geliştirilmekte olan, bir cüzdanın ihtiyaç duyduğu verileri güvenilmeyen bir sunucudan, hangi notları sorduğunu açığa çıkarmadan talep etmesini sağlayan bir yöntemdir. Sunucu nullifier'larınızı asla öğrenmez, çünkü protokol onların ilişkilendirilemez bir şekilde evrilmesini sağlar. [Yazı](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard Shielded Pool | Zcash için üçüncü shielded havuzdur ve zk-SNARK teknoloji yığınımızın sürekli evrimini temsil eder. [Tüm ayrıntılar](https://electriccoin.co/blog/explaining-halo-2/) |
| Overwinter | Zcash için 1. Ağ Yükseltmesi. [Daha Fazla Bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Term | Definition |
|------|-----------|
| Payments | Farklı ödeme sağlayıcıları aracılığıyla Zcash'i günlük alışverişlerde kullanmak mümkündür. [Ödeme Uygulamaları](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Verinin, kendi doğruluğuna dair bir kanıtla birlikte taşındığı bir ilkeldir; böylece verileri birleştirmek, kanıtları da birleştirmek anlamına gelir. Project Tachyon, korumalı protokolü PCD etrafında yeniden inşa eder ve her cüzdanın zinciri yeniden taramak yerine kendi bakiyesinin doğru olduğuna dair özyinelemeli bir kanıt taşımasına olanak tanır. Zcash uygulaması, Halo'yu takip eden ve güvenilir kurulum gerektirmeyen [Ragu](https://github.com/tachyon-zcash/ragu)'dur. |
| Peer-to-Peer Network | P2P ağları merkeziyetsizlik kavramına dayanır. Blokzincir teknolojisinin temel mimarisidir. |
| PIR (Private Information Retrieval) | Sunucunun hangi kaydı istediğinizi öğrenmeden bir sunucudan kayıt almanıza olanak tanıyan tekniklerdir. Zcash için, hafif cüzdanların ne aradıklarını açığa çıkarmadan ihtiyaç duydukları verileri almalarının bir yolu olarak aktif şekilde araştırılmaktadır. |
| Podcast | [Radiolab (Zcash Ceremony)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Term | Definition |
|------|-----------|
| QR Code | Zcash adreslerini kolay tarama için kodlamakta kullanılan makine tarafından okunabilir kod. Unified Address'ler (UA'lar), modern Zcash cüzdanlarında genellikle QR kodları üzerinden paylaşılır. |
| Quantum Recoverability | [ZIP 2005](https://zips.z.cash/zip-2005)'te belirtilen Ironwood notlarının bir özelliğidir; gelecekte bir kuantum bilgisayar bugün onu koruyan kriptografiyi kırarsa, bir coin'in zincir üstü kaydının kurtarılabilir kalmasını sağlar. Bu, kuantum direncinden ziyade bir kurtarma yoludur ve mevcut Sprout, Sapling veya Orchard fonlarına değil, Ironwood notlarına uygulanır. |

## R

| Term | Definition |
|------|-----------|
| Recovery Phrase | Bir cüzdanı yedeklemek ve geri yüklemek için kullanılan 12 veya 24 harf ve rakamdan oluşan bir dizi. Zcash'te bu ifade, spending ve viewing anahtarlarını yeniden üretir; bu da onu fon kurtarma ve güvenlik açısından kritik hale getirir. |

## S

| Term | Definition |
|------|-----------|
| Sapling | Shielded işlemler için önemli verimlilik iyileştirmeleri getiren ve mobil benimsenmenin önünü açan büyük bir ağ yükseltmesi. 419200 numaralı blokta etkinleştirildi. |
| Selective Disclosure | Shielded bir adresin sahibinin, verileri diğer herkesten gizli tutarken viewing key'leri veya ödeme açıklamalarını üçüncü taraflarla seçici biçimde paylaşmasına olanak tanır. |
| Shielded Address | zaddr olarak da adlandırılır. z ile başlar. Göndericiyi, alıcıyı, miktarı ve notu zk-SNARKs kullanarak gizler. |
| Shielded Labs | Zcash protokol ekonomisi ve mutabakatı üzerinde çalışan bağımsız bir kuruluş. Şu anda Crosslink ve Network Sustainability Mechanism'e liderlik ediyor. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Yalnızca shielded adresler arasındaki bir işlem. Blokzincir üzerinde tamamen özeldir. |
| Sol/s | Saniye başına çözüm - Equihash madencilik performansını ölçer. |
| Spending Key | Shielded bir adresten harcama yapmaya olanak tanıyan özel anahtar (aynı zamanda bakiyeyi ve geçmişi görmenizi sağlar). |
| Sprout | Zcash'in orijinal shielded protokol sürümü (2016'da başlatıldı). |

## T

| Term | Definition |
|------|-----------|
| Tachyon | NU7’yi hedefleyen Zcash ölçeklendirme programı. Cüzdanları her bloğu taramaktan uzaklaştırıp kanıt taşıyan cüzdan durumuna, oblivious senkronizasyona ve budanabilir düğüm durumuna yönlendirir; amaç, shielded işlem hacmini saniyede binlerce işleme çıkarmaktır. [Proje sitesi](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (değersiz test para birimi). |
| Testnet | Mainnet'ten önce yükseltmeleri ve özellikleri test etmek için kullanılan ayrı bir blokzincir. |
| Trailing Finality Layer (TFL) | Madenciliğin yerine geçmeden, Zcash’in proof-of-work zincirinin arkasına bir kesinlik katmanı eklenerek son blokların kesinleştirilmesini sağlamaya yönelik araştırma. Crosslink, bu çalışmadan ortaya çıkan tasarımdır. |
| Transaction | Kullanıcılar arasındaki, ağa gönderilen ve sonunda bir blok içinde onaylanan ödeme. |
| Transaction Expiry | İşlemler onaylanmazsa yaklaşık 25 dakika (20 blok) sonra sona erer; fonlar otomatik olarak geri döner. |
| Transaction Fee | Varsayılan ücret 0.0001 ZEC'tir. Daha yüksek ücretler öncelik alır; çok düşük ücretler gecikmelere veya sona ermeye neden olabilir. |
| Transparent Address | taddr olarak da adlandırılır. t ile başlar. Tamamen herkese açıktır (Bitcoin gibi). |
| Transparent Transaction | Yalnızca transparent adresler arasındaki bir işlem - her şey kamuya açık şekilde görünür. |
| Turnstile | Her shielded havuza ne kadar değer girdiğini ve çıktığını takip eden muhasebe kuralı; böylece hiçbir havuz, içine girenden daha fazlasını dışarı veremez. Zcash tarihindeki her havuz geçişinde kullanılmıştır ve şu anda Orchard’dan Ironwood’a geçişi korumaktadır. [Daha fazla bilgi](/zcash-tech/the-turnstile) |

## U

| Term | Definition |
|------|-----------|
| Unified Address | Tek bir dizgede hem transparent hem de shielded ödemeler için çalışan modern adres biçimi (NU5'te tanıtıldı). |
| Upgrade Activation | Bir ağ yükseltmesinin (ör. NU5, NU6) otomatik olarak etkinleştiği belirli blok yüksekliği. |

## V

| Term | Definition |
|------|-----------|
| Viewing Key | Fonları harcayabilme yetkisi olmadan shielded bir adresin bakiyesini ve işlem geçmişini görmenizi sağlayan özel anahtar. |

## W

| Term | Definition |
|------|-----------|
| Wallet | Özel anahtarları saklayan ve ZEC gönderip almanızı sağlayan yazılım veya donanım. Aktif cüzdanlar arasında ZODL (iOS/Android), Zingo! (mobil/masaüstü), Nighthawk (Android), YWallet, Zallet (yakında) ve Keystone (donanım) bulunur. Tam liste için bkz. [Zcash Ekosistem Cüzdanları](https://z.cash/ecosystem/?wallets=#tag-wallets) |
| WebZjs | Tarayıcı ortamları için ChainSafe tarafından geliştirilen, Zcash için ilk JavaScript SDK'sı. MetaMask'e shielded ZEC getiren Zcash Shielded Wallet snap'inin temelini oluşturur. |

## X

| Term | Definition |
|------|-----------|
| XZC | Bazı eski borsalarda kullanılan, Zcash için daha eski bir ticker sembolü. Resmî ticker ZEC'tir. |

## Y

| Term | Definition |
|------|-----------|
| YWallet | Orchard, Sapling ve transparent adresleri destekleyen, gizlilik odaklı bir Zcash cüzdanıdır ve hızlı senkronizasyonuyla bilinir. Artık bakımı yapılmamaktadır: geliştiricisi, Ironwood için güncellenmeyeceğini doğrulamıştır; bu nedenle artık ağı takip edemez. Aynı geliştirici tarafından geliştirilen Zkool, bakımı sürdürülen halefidir. |

## Z

| Term | Definition |
|------|-----------|
| Zcash | zk-SNARKs kullanan gizlilik odaklı kripto para. Transparent (Bitcoin tarzı) ve tamamen shielded ödemeler arasında köprü kurar. |
| Zcash Foundation | Zcash ekosistemini destekleyen, geliştirmeyi finanse eden ve gizliliği teşvik eden bağımsız bir kâr amacı gütmeyen kuruluş. |
| Zcash Network | İşlemleri doğrulayan ve blokzinciri sürdüren eşten eşe düğüm ağı. |
| ZEC | Zcash için resmî para birimi kodu (bazı borsalar hâlâ XZC gösterir). |
| Zerocash | Zcash'in dayandığı akademik protokol (2014). |
| Zaino | lightwalletd'nin yerini alan, Zcash Foundation tarafından geliştirilen yeni nesil Zcash indeksleyicisi. Hafif istemcilerin daha hızlı ve daha özel biçimde senkronize olmasını sağlar. Zcash Z3 altyapı yükseltmesinin bir parçasıdır. |
| Zakura | Temmuz 2026'da yayınlanan, Valar Group ve Project Tachyon tarafından Zebra'nın bir fork'u olarak geliştirilen bir Zcash tam düğüm uygulaması. Snapshot ile önyüklemeyle birlikte işlem hacmi ve senkronizasyon hızını hedefler; ayrıca saniyede yaklaşık 50.000 işlemle kart ağı ölçeğine ulaşma hedefi olduğunu belirtir. [zakura.com](https://zakura.com) |
| Zallet | zcashd'nin cüzdan işlevleri kullanımdan kaldırıldığında bunları devralan cüzdan bileşeni; Zcash Z3 altyapı çalışmasının bir parçası olarak Zaino üzerine inşa edilmiştir. |
| Zebra | Zcash Foundation'ın Rust tabanlı tam düğüm uygulaması (zcashd'ye alternatif). Üretime hazırdır ve aktif olarak sürdürülmektedir. [GitHub](https://github.com/ZcashFoundation/zebra) |
| zcashd | Bitcoin Core'dan fork'lanan özgün Zcash tam düğümü. Uzun süren bir kullanım dışı bırakma sürecinin ardından Temmuz 2026'da emekliye ayrıldı; rolleri, konsensüs için Zebra ile cüzdan işlevleri için Zallet arasında paylaştırıldı. |
| ZIP | Zcash Improvement Proposal - protokol değişikliklerini önermek ve onaylamak için kullanılan topluluk yönetişim süreci. [ZIP Deposu](https://github.com/zcash/zips) |
| ZODL | Zcash Open Development Lab. Josh Swihart ve eski Electric Coin Company mühendislik ekibi tarafından, Bootstrap ile yaşanan bir yönetişim anlaşmazlığı nedeniyle istifa etmelerinin ardından 2026'nın başlarında kurulan bağımsız kuruluştur. Mart 2026'da başlangıç yatırımı olarak 25 milyon doların üzerinde fon topladı ve Şubat 2026'da Zashi'den yeniden adlandırılan Zodl cüzdanını sürdürmektedir. [zodl.com](https://zodl.com) |
| zk-SNARKs | Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — Zcash shielded işlemlerini güçlendiren kriptografi. Herhangi bir gizli bilgiyi ifşa etmeden bir ifadenin (ör. geçerli harcama) kanıtlanmasına olanak tanır. |
| ZSA (Zcash Shielded Assets) | Kullanıcı tarafından çıkarılan ve Zcash'in shielded gizliliğini devralan tokenlerdir; ZEC dışındaki varlıkların ağ üzerinde özel biçimde hareket etmesini sağlar. [ZIP 226](https://zips.z.cash/zip-0226) içinde tanımlanmıştır ve NU7 için aday bir özelliktir. |

---

**Son güncelleme:** Temmuz 2026
**Katkıda bulunmak ister misiniz?** [Bu sayfayı GitHub üzerinde düzenleyin](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
