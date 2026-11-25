# Zcash Kütüphanesi

Zcash ile ilgili temel terimlerin, kavramların ve kaynakların kapsamlı bir sözlüğü. Sürüm notlarında, forum başlıklarında veya cüzdan değişiklik günlüklerinde geçen terimlere bakabileceğiniz tek kütüphane.

### Hızlı Gezinme
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

| Terim | Tanım |
|------|-----------|
| Actions | Her bir harcama ve çıktı için ayrı ayrı birden fazla kanıt oluşturmak yerine, Orchard protokolü bunları tek bir Eylemde birleştirir. |
| Addresses | Zcash, korumalı (zaddr) ve şeffaf (taddr) adreslere sahiptir. Birleşik adresler (UA), farklı alıcı türlerini bir araya getirerek gönderici cüzdanın her iki tarafın da desteklediği en uygun adresi seçmesini sağlar. [ZIP 316](https://zips.z.cash/zip-0316) içinde tanımlanmıştır. [Birleşik adresler](/zcash-tech/unified-addresses) |
| Arborist Call | Zcash protokolü ve araştırma geliştirmeleriyle ilgili güncellemeleri ele alan, iki haftada bir yapılan çağrı. Zcash Topluluk Forumu ve Discord üzerinden düzenlenir. [Toplantı Notları](https://github.com/ZcashCommunityGrants/arboretum-notes) / [Forum Duyuruları](https://forum.zcashcommunity.com) |
| Auto-shielding | Kullanıcıların (daha doğrusu cüzdanlarının) fonları şeffaf bir adresten en yeni korumalı ZEC havuzuna otomatik olarak aktarmasını sağlar. |

## B

| Terim | Tanım |
|------|-----------|
| Benchmarking | Madenciler, Zcash madenciliğinde kullanılan çeşitli donanımların verimliliğine ilişkin ölçümleri gönderebilir. [Buradan görüntüleyin](https://zcashbenchmarks.info) |
| Block | Blok, ağda gönderilen bir işlem kümesini içeren, Zcash blokzincirindeki bir kayıttır. Ortalama olarak yaklaşık her 25 saniyede blokzincire yeni bir blok eklenir (NU7 Kasım 2026'da etkinleştirilmeden önce bu süre 75 saniyeydi). |
| Block Explorer | Blokzincirdeki geçmiş ve güncel tüm işlemleri görüntülemek için kullanılan çevrimiçi bir araç. [Zcash Blok Gezgini](https://zcashexplorer.app/) |
| Blogs | [ZODL Blogu (önceki adıyla Electric Coin Co)](https://zodl.com/blog/) / [Zcash Foundation Blogu](https://zfnd.org/blog/) / [ZecHub Bülteni](https://zechub.substack.com/) |
| Blossom | Zcash için 3. büyük ağ yükseltmesi. [Daha fazla bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom) |

## C

| Terim | Tanım |
|------|-----------|
| Canopy | Zcash için 5. büyük ağ yükseltmesi. [Daha fazla bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy) |
| Commitment Scheme | Taahhütte bulunan tarafın bir polinoma kısa bir dizgeyle taahhüt vermesini sağlar; doğrulayıcı bu dizgeyi kullanarak taahhüt edilen polinoma ilişkin iddia edilen değerlendirmeleri doğrulayabilir. Zcash protokolünde iletişim maliyetlerini azaltmak için kullanışlıdır. |
| Community | [Resmî Zcash Topluluk Forumu](https://forum.zcashcommunity.com) / [Zcash Topluluğu Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash Ar-Ge Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash) |
| Crosslink | Zcash'nin mevcut iş kanıtı mekanizmasının yanında hisse kanıtını da çalıştıracak şekilde önerilen hibrit bir konsensüs tasarımı. Çalışmaları Shielded Labs yürütür ve `crosslink_monolith` deposundaki Feature Net adlı test ağını işletir. Önceki `zebra-crosslink` prototip deposu Kasım 2026'da kullanımdan kaldırılmıştır. Crosslink bugün Zcash kapsamında değildir. [Crosslink protokolü](/zcash-tech/crosslink-protocol) |
| CrossPay | ZODL cüzdanındaki bir özellik. Korumalı ZEC harcarken alıcının tercih ettiği varlık ve Zincir üzerinden ödeme almanızı sağlar; işlem merkezi bir borsa yerine NEAR Intents üzerinden yönlendirilir. |
| Cypherpunk Zero | ECC, çizer Stranger Wolf, Mighty Jaxx ve seçili ekosistem ortaklarının birlikte yürüttüğü yaratıcı bir evren ve iş birliği. [Cypherpunk Zero Sosyal](https://x.com/cypherpunkZero) / [OpenSea Koleksiyonu](https://opensea.io/collection/cypherpunk-zero) |

## D

| Terim | Tanım |
|------|-----------|
| DeFi | ZEC ile DeFi'yi bütünleştiren projeler: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [NEAR Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / [ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [THORSwap](https://app.thorswap.finance/) |
| Deshielding | Bir işlemin zaddr'den (korumalı adres) taddr'ye (şeffaf adres) gönderilmesini ifade eder. İşlemin kaynağı görünmez; ancak fonlar herkese açık bir değer havuzuna girer. |
| Developer Resources | [Geliştirici Kaynakları](https://www.zcashcommunity.com/developers/) |
| Documentation | [Resmî Belgeler](https://zcash.readthedocs.io/en/latest/) |

## E

| Terim | Tanım |
|------|-----------|
| ECC | Zcash protokolünü başlatan ekip olan Electric Coin Company; daha önce Zcash Company olarak biliniyordu. Tüm mühendislik ekibi, Bootstrap yönetim kurulu ile yaşanan yönetişim anlaşmazlığının ardından Ocak 2026'da istifa etti ve sonrasında ZODL'u kurdu. |
| ECDSA | Eliptik Eğri Dijital İmza Algoritması, kriptografik olarak güvenli bir dijital imza şemasıdır. ECDSA imzalama/doğrulama algoritması, eliptik eğri noktalarının çarpımına dayanır. |
| Education | Zcash'ı açıklayan, öğrenmeye yönelik videolar [burada](https://www.zcashcommunity.com/zcash-education/) |
| Encrypted Memos | Korumalı adreslere gönderilen işlemlere eklenen ve ödemenin alıcısı tarafından görülebilen ek bir alan. Şifrelenmiş memo yalnızca gönderici ve alıcı tarafından görülebilir. |
| Equihash | Zcash üzerinde kullanılan, bellek odaklı iş kanıtı madenciliği algoritması. |
| Events | Zcash ile ilgili etkinliklerin takvimini [Luma](https://luma.com/zcash) ve [Zcash Foundation](https://zfnd.org/zf-events/) üzerinden görüntüleyebilirsiniz. |
| Exchanges | [Zcash destekleyen borsaların listesi](https://z.cash/exchanges/) |

## F

| Terim | Tanım |
|------|-----------|
| Fiat-Shamir | Etkileşimli bir bilgi kanıtını temel alarak dijital imza oluşturma tekniği. Bu sayede, temelindeki bilgiler açığa çıkarılmadan bazı olgular (ör. bir sırrın bilinmesi) herkese açık biçimde kanıtlanabilir. |
| Formal Verification | Yalnızca testlere güvenmek yerine, bir sistemin belirtilen şekilde davrandığını matematiksel olarak kanıtlama. Ironwood Eylem devresi, sağlamlık hatası bulunmadığını göstermek amacıyla zkSecurity ve ZODL katkıcıları tarafından Lean teorem ispatlayıcısı kullanılarak bu yöntemle doğrulandı. |
| Founders Reward | Kurucu ödülü, toplam blok ödülünün yüzde 20'sini oluşturur. Her bloğun değerinden düşülür ve protokol geliştirme ile büyümeyi desteklemek için şeffaf biçimde dağıtılır. |
| Free2Z | Zcash tarafından desteklenen, anonim içerik ve özel bağışlar için bir araç. [Free2Z](https://free2z.com) |
| FROST | Esnek, Tur Sayısı Optimize Edilmiş Schnorr eşik imza şeması. [Araştırma Makalesi](https://eprint.iacr.org/2020/852) |

## G

| Terim | Tanım |
|------|-----------|
| Governance | ZIP sürecinde alınan kararlar, Zcash belirtimine ve ağı çalıştıran yazılıma işlenir. Ağın çoğunluğu yükseltmeyi benimsediğinde ve konsensüs bozulmadığında değişiklikler zincir üstünde onaylanır. [Protokolün Tam Geçmişi](https://zfnd.org/protocol-agreements-and-major-decisions/) |

## H

| Terim | Tanım |
|------|-----------|
| Halo | Güvene dayalı kurulumlara gerek kalmadan devre yükseltmelerini mümkün kılar; böylece Zcash korumalı protokolü gelecekteki iyileştirme ve genişletmeler için daha esnek hale gelir. [Teknik Açıklama](https://z.cash/learn/what-is-halo-for-zcash/) |
| HD Wallet | Hiyerarşik deterministik cüzdanlar, tek bir tohumdan bir dizi anahtar çifti üretir; böylece kolaylık, yönetilebilirlik ve yüksek düzeyde güvenlik sağlar. |
| Heartwood | Zcash için 4. büyük ağ yükseltmesi. [Daha fazla bilgi](https://z.cash/upgrade/heartwood/) |

## I

| Terim | Tanım |
|------|-----------|
| Index | CoinDesk ZCX Endeksi, Zcash için ABD dolarına eşdeğer, gerçek zamanlı bir spot kuru gösterir. [Fiyat Endeksi](https://www.coindesk.com/indices/zcx/) |
| Integrations | Zcash ödemelerini çeşitli üçüncü taraf sağlayıcılar aracılığıyla kabul edebilirsiniz. [Ödeme İşlemcileri](https://z.cash/zcash-for-business/) |
| Interactive Proof System | Hesaplamayı bir İspatçı ile bir Doğrulayıcı arasındaki mesaj alışverişi olarak modelleyen soyut bir makine. |
| Investment | Zcash'a yatırım yapmak isteyen kurumsal yatırımcılar veya aile ofisleri için çeşitli finansal seçenekler mevcuttur. [Tam liste](https://z.cash/investors/) |
| Ironwood | Ana ağda 28 Temmuz 2026'da 3.428.143. bloktan beri etkin olan NU6.3 ağ yükseltmesi. Ironwood, düzeltilmiş Orchard devresi üzerine kurulu yeni bir korumalı havuz ekler ve orijinal Orchard havuzunu mühürler; böylece herkes dolaşımdaki arzın doğru olduğunu denetleyebilir. Konsensüs kuralları [ZIP 258](https://zips.z.cash/zip-0258) içinde belirtilmiştir. [Ironwood](/zcash-tech/ironwood) |

## J

| Terim | Tanım |
|------|-----------|
| JubJub | zk-SNARK devrelerinde verimli biçimde uygulanmak üzere tasarlanmış bir eliptik eğri. |

## K

| Terim | Tanım |
|------|-----------|
| Keystone Wallet | Yerel Zcash (Orchard korumalı) desteğine sahip, soğuk imzalama için ZODL ile uyumlu, ağ bağlantısı olmayan bir donanım cüzdanı. [Keystone](https://keyst.one) |

## L

| Terim | Tanım |
|------|-----------|
| Layer-1 | Temel bir ağı ve altyapısını ifade eder. Katman 1 blokzincirleri, başka bir ağa ihtiyaç duymadan işlemleri doğrulayıp kesinleştirebilir. Zcash, bir L1 blokzinciridir. |
| librustzcash | Zcash ile çalışmak için gereken tüm crate'leri ve bağımlılıkları içeren bir Rust çalışma alanı. [depo](https://github.com/zcash/librustzcash) |
| lightwalletd | Hafif istemcilere blokzincir bilgileri sunan, durumsuz bir sunucu. [lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html) |

## M

| Terim | Tanım |
|------|-----------|
| Metrics | Ağ ölçümlerine [buradan](https://tokenterminal.com/explorer/projects/zcash/metrics/all) ulaşabilirsiniz. |
| Metadata | Kullanıcının Zcash işlemiyle birlikte oluşturulan veriler. Blok yüksekliği, işlem sürümü veya sona erme yüksekliği gibi bilgiler içerebilir. |
| Mobile SDK | Android ile Zcash arasında bağlantı kuran hafif bir SDK; üçüncü taraf Android uygulamalarının korumalı işlemler gönderip almasını sağlar. [GitHub](https://github.com/zcash/zcash-android-wallet-sdk) |
| Mining | Her blok için Zcash ağındaki düğümlerin, kendini ayarlayan bir zorluk düzeyine bağlı çözümü bulmak amacıyla karmaşık matematiksel hesaplamalar yaparak yarışması süreci. [Rehber](https://z.cash/mining-zcash/) |
| Multisignature | Fon harcamak için birden fazla özel anahtar imzası gerektiren adres. Şu anda çoklu imza işlevi yalnızca şeffaf adreslerde desteklenmektedir. |

## N

| Terim | Tanım |
|------|-----------|
| Network Sustainability Mechanism (NSM) | Protokolün uzun vadeli güvenlik bütçesinin tamamen yeni arz ihracına bağlı kalmaması için işlem ücretlerinin bir bölümünü yakmayı öneren Shielded Labs önerisi. ZIP 234 içinde belirtilmiştir; 2026'da incelenmektedir. |
| Nighthawk | Nighthawk Apps tarafından geliştirilen, artık kullanılmayan bir Zcash mobil cüzdan. Zcash cüzdanları artık bakıma alınmamaktadır; Nighthawk Wallet 3.0 ise DarkFi için geliştirilmiştir. Eski bir Nighthawk tohumundaki fonları taşımak için [Fonları Kurtarma](/using-zcash/recovering-funds) sayfasına bakın. |
| Noir Wallet | Zcash Community Grants tarafından desteklenen, Zcash tarayıcı uzantısı cüzdanı. Korumalı ZEC varlıklarını QR kodlarına ve elle aktarımlara ihtiyaç duymadan doğrudan tarayıcı uygulamalarına bağlamak üzere geliştirilmiştir. [zknoir.com](https://www.zknoir.com/) |
| NU5 | Zcash için 6. büyük ağ yükseltmesi; Orchard korumalı havuzunu ve Birleşik Adresleri kullanıma sunar. [Daha fazla bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5) |
| NU6 | Zcash için 7. büyük ağ yükseltmesi; blok sübvansiyonunu Zcash Community Grants programını ve Ertelenmiş Geliştirici Fonu Kilitli Kasasını finanse edecek şekilde düzenler. 2024'ün sonlarında etkinleştirildi. [Daha fazla bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6) |
| NU7 | Ironwood sonrasındaki ağ yükseltmesi; ana ağda 6 Kasım 2026'da (UTC) 3.543.405 yüksekliğinde etkinleştirildi. [ZIP 259](https://zips.z.cash/zip-0259) uyarınca 25 saniyelik bloklar (ZIP 218), ücretlerin geri dönüştürüldüğü Ağ Sürdürülebilirliği Mekanizması (ZIP'ler 235 ve 237) ve sürüm 4 işlemlerinin sona ermesiyle Sprout fonlarının harcanamaz hale gelmesini (ZIP 2003) beraberinde getirir. Yeni bir işlem biçimi eklemez; Tachyon ve Zcash Korumalı Varlıklar bu yükseltmenin kapsamında değildir. |

## O

| Terim | Tanım |
|------|-----------|
| Oblivious Synchronization | Proje Tachyon kapsamında geliştirilen bu yöntem, cüzdanın hangi notları istediğini açığa çıkarmadan ihtiyaç duyduğu verileri güvenilmeyen bir sunucudan istemesini sağlar. Protokol nullifier'ların ilişkilendirilemez biçimde değişmesini sağladığından sunucu nullifier'larınızı hiçbir zaman öğrenmez. [Yazı](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) |
| Orchard | NU5 ile sunulan korumalı havuz. Sağlamlık hatası bulunduğunda Ironwood tarafından mühürlendi; bu nedenle artık Orchard içinde gönderim veya alım yapamazsınız. Fonlar yalnızca turnike üzerinden çıkabilir. [Korumalı havuzlar](/using-zcash/shielded-pools) |
| Overwinter | Zcash için 1. ağ yükseltmesi. [Daha fazla bilgi](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter) |

## P

| Terim | Tanım |
|------|-----------|
| Payments | Çeşitli ödeme sağlayıcıları aracılığıyla günlük alışverişlerinizde Zcash kullanabilirsiniz. [Ödeme Uygulamaları](https://z.cash/pay-with-zcash/) |
| PCD (Proof-Carrying Data) | Verilerin kendi doğruluğuna ilişkin bir kanıtla birlikte taşındığı; böylece veriler birleştirildiğinde kanıtların da birleştiği temel bir yapı. Tachyon projesi, korumalı protokolü PCD etrafında yeniden kurar ve her cüzdanın Zinciri yeniden taramak yerine kendi bakiyesinin doğru olduğunu gösteren özyinelemeli bir kanıt taşımasını sağlar. Zcash uygulaması, Halo yaklaşımını izleyen ve güvene dayalı kurulum gerektirmeyen [Ragu](https://github.com/tachyon-zcash/ragu)'dur. |
| Peer-to-Peer Network | P2P ağları merkeziyetsizlik kavramına dayanır. Blokzincir teknolojisinin temel mimarisidir. |
| PIR (Private Information Retrieval) | Sunucunun hangi kaydı istediğinizi öğrenmeden bir kaydı sunucudan almanızı sağlayan teknikler. Hafif cüzdanların aradıkları bilgiyi açığa çıkarmadan ihtiyaç duyduklarını alabilmeleri için Zcash kapsamında aktif olarak araştırılmaktadır. |
| Podcast | [Radiolab (Zcash Töreni)](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp) |

## Q

| Terim | Tanım |
|------|-----------|
| QR Code | Zcash adreslerini kolayca taranabilmeleri için kodlamakta kullanılan, makinelerce okunabilir bir kod. Birleşik Adresler (UA'lar) modern Zcash cüzdanlarda genellikle QR kodları aracılığıyla paylaşılır. |
| Quantum Recoverability | Ironwood note'larının [ZIP 2005](https://zips.z.cash/zip-2005)'te tanımlanmış bir özelliğidir. Gelecekteki bir kuantum bilgisayar bugün onu koruyan kriptografiyi kırarsa bir coinin zincir üstü kaydının kurtarılabilir olmasını sağlar. Kuantum direncinden ziyade bir kurtarma yoludur ve mevcut Sprout, Sapling veya Orchard fonlarına değil, Ironwood note'larına uygulanır. |

## R

| Terim | Tanım |
|------|-----------|
| Recovery Phrase | Bir cüzdanı yedeklemek ve geri yüklemek için kullanılan 12 veya 24 harf ve rakamdan oluşan bir dizi. Zcash'te bu ifade, harcama ve görüntüleme anahtarlarını yeniden oluşturur; bu nedenle fonların kurtarılması ve güvenliği açısından kritik öneme sahiptir. |

## S

| Terim | Tanım |
|------|-----------|
| Sapling | Korumalı işlemler için önemli verimlilik iyileştirmeleri sunan ve mobil kullanıma geçişin önünü açan büyük bir ağ yükseltmesi. 419.200. blokta etkinleştirildi. |
| Selective Disclosure | Korumalı bir adresin sahibinin, verileri diğer herkesten gizli tutarken görüntüleme anahtarlarını veya ödeme açıklamalarını üçüncü taraflarla seçerek paylaşmasına olanak tanır. |
| Shielded Address | zaddr olarak da adlandırılır. Bu adres türü z ile başlar ve zk-SNARKs kullanarak göndereni, alıcıyı, tutarı ve memo'yu gizler. |
| Shielded Labs | Zcash protokol ekonomisi ve konsensüs üzerinde çalışan bağımsız bir kuruluş. Şu anda Crosslink ve Ağ Sürdürülebilirliği Mekanizması'na liderlik ediyor. [GitHub](https://github.com/ShieldedLabs) |
| Shielded Transaction | Yalnızca korumalı adresler arasında gerçekleşen bir işlem. Blokzincirde tamamen özeldir. |
| Sol/s | Saniyedeki çözüm sayısı; Equihash madenciliği performansını ölçer. |
| Spending Key | Korumalı bir adresteki fonların harcanmasına izin veren özel anahtar (bakiyeyi ve geçmişi görüntülemenizi de sağlar). |
| Sprout | Zcash'in özgün korumalı protokol sürümü (2016'da kullanıma sunuldu). |

## T

| Terim | Tanım |
|------|-----------|
| Tachyon | Zcash'in ölçeklendirme programı. NU7'ün ([ZIP 259](https://zips.z.cash/zip-0259)) parçası değildir ve etkinleştirme tarihi yoktur. Cüzdanları her bloğu taramaktan uzaklaştırıp kanıt taşıyan cüzdan durumuna, gözlemlenemez eşitlemeye ve budanabilir düğüm durumuna yönlendirerek saniyede binlerce korumalı işleme ulaşmayı hedefler. [Proje sitesi](https://tachyon.z.cash/overview/) |
| TAZ | Testnet Zcash (değeri olmayan test para birimi). |
| Testnet | Ana ağdan önce ağ yükseltmelerini ve özellikleri sınamak için kullanılan ayrı bir blokzincir. |
| Trailing Finality Layer (TFL) | Madenciliğin yerini almadan yakın tarihli blokların kesinleştirilebilmesi için Zcash'in iş kanıtı zincirinin arkasına bir kesinlik katmanı eklenmesine yönelik araştırma. Crosslink, bu çalışmadan ortaya çıkan tasarımdır. |
| Transaction | Kullanıcılar arasındaki, ağa gönderilen ve sonunda bir blokta onaylanan ödeme. |
| Transaction Expiry | Madenciliği yapılmamış bir ödemenin hangi zamana kadar dahil edilebileceğini belirleyen blok yüksekliği sınırı. Sıfır olmayan N son kullanım yüksekliğine sahip sıradan bir ödeme N bloğunda veya daha önce madenciliğe dahil edilebilir, ancak N+1 bloğunda edilemez. 0 yüksekliği son kullanım süresini devre dışı bırakır. Bu, otomatik bir para iadesi zamanlayıcısı değildir. [ZIP 203](https://zips.z.cash/zip-0203) |
| Transaction Fee | Varsayılan ücret 0,0001 ZEC'tir. Daha yüksek ücretler öncelik sağlar; çok düşük ücretler gecikmelere veya sürenin dolmasına neden olabilir. |
| Transparent Address | taddr olarak da adlandırılır. Bu adres türü t ile başlar. Tamamen herkese açıktır (Bitcoin gibi). |
| Transparent Transaction | Yalnızca şeffaf adresler arasında gerçekleşen bir işlem; her şey herkes tarafından görülebilir. |
| Turnstile | Her korumalı havuza ne kadar değerin girip çıktığını izleyen muhasebe kuralıdır; böylece hiçbir havuz, içine girenden fazlasını serbest bırakamaz. Zcash'in geçmişindeki her havuz geçişinde kullanılmıştır ve şu anda Orchard'den Ironwood'e geçişi korumaktadır. [Daha fazla bilgi](/zcash-tech/the-turnstile) |

## U

| Terim | Tanım |
|------|-----------|
| Unified Address | Tek bir dize içinde hem şeffaf hem de korumalı ödemeler için çalışan modern adres biçimi (NU5'te tanıtıldı). |
| Upgrade Activation | Bir ağ yükseltmesinin (ör. NU5, NU6) otomatik olarak etkinleştiği belirli blok yüksekliği. |

## V

| Terim | Tanım |
|------|-----------|
| Viewing Key | Fonları harcama olanağı vermeden korumalı bir adresin bakiyesini ve işlem geçmişini görüntülemenizi sağlayan özel anahtar. |

## W

| Terim | Tanım |
|------|-----------|
| Wallet | Özel anahtarları saklayan ve ZEC göndermenizi/almanızı sağlayan yazılım veya donanım. Aktif cüzdanlar arasında ZODL (iOS/Android), Zingo! (mobil/masaüstü), Zkool (mobil/masaüstü), Zallet (tam düğüm cüzdanı, beta sürümünde) ve Keystone (donanım) yer alır. Listenin tamamı için [Zcash Ekosistem Cüzdanları](https://z.cash/ecosystem/?wallets=#tag-wallets) sayfasına bakın. |
| WebZjs | Tarayıcı ortamları için Zcash adına ChainSafe tarafından geliştirilen ilk JavaScript SDK'sı. Korumalı ZEC'i MetaMask'e getiren Zcash Korumalı Cüzdan snap'inin temelini oluşturur. |

## X

| Terim | Tanım |
|------|-----------|
| XZC | Bazı eski borsalarda Zcash için kullanılan eski bir ticker sembolü. Resmî ticker ZEC'tir. |

## Y

| Terim | Tanım |
|------|-----------|
| YWallet | Hızlı eşitlemesiyle bilinen, Orchard, Sapling ve şeffaf adresleri destekleyen, gizlilik odaklı bir Zcash cüzdanı. Artık bakımı yapılmıyor: geliştiricisi, Ironwood için güncellenmeyeceğini doğruladı; bu nedenle artık ağı takip edemiyor. Aynı geliştiricinin Zkool'ı bakımı yapılan halefidir. |

## Z

| Terim | Tanım |
|------|-----------|
| Zcash | zk-SNARKs kullanan, gizlilik odaklı bir kripto para birimi. Şeffaf (Bitcoin tarzı) ve tamamen korumalı ödemeleri birbirine bağlar. |
| Zcash Foundation | Zcash ekosistemini destekleyen, geliştirmeleri finanse eden ve gizliliği teşvik eden bağımsız, kâr amacı gütmeyen kuruluş. |
| Zcash Network | İşlemleri doğrulayan ve blokzinciri sürdüren düğümlerin eşler arası ağı. |
| ZEC | Zcash için resmî para birimi kodu (bazı borsalarda hâlâ XZC gösterilir). |
| Z3 stack | Birlikte zcashd'in yerini alan üç program: düğüm için Zebra, dizinleme için Zaino, cüzdan için Zallet. [Z3 yığını](/zcash-tech/z3-stack) |
| Zerocash | Zcash'in temel aldığı akademik protokol (2014). |
| Zaino | Zebra düğümünden cüzdan verilerini sunan, Zingo Labs tarafından Rust ile yazılmış bir dizinleyici. Hafif cüzdanlar için zcashd'in yaptığı dizinleme işini devralır. [Zaino](/zcash-tech/zaino) |
| Zakura | Ölçeklenmek üzere geliştirilmiş, Sean Bowe ve Dev Ojha'nın liderlik ettiği ayrı bir Zcash tam düğüm. Daha hızlı eşitlenir, blokları yerel olarak budar ve hâlâ ona bağımlı yazılımlar için kendi üzerinde zcashd çalıştırabilir. [Zakura düğüm](/zcash-tech/zakura-node) |
| Zallet | zcashd cüzdanının yerini alan cüzdan. Baştan başlamak yerine mevcut bir `wallet.dat`'i aktarın. [Zallet](/zcash-tech/zallet) ve [Zallet hızlı başvuru](/using-zcash/zallet-quick-reference-guide) |
| Zebra | zcashd'in yerini alan ve Zcash Foundation tarafından bakımı yapılan tam düğüm. İşlemleri doğrulayan bir düğüme ihtiyacınız varsa bunu çalıştırın. [Zebra tam düğüm](/zcash-tech/zebra-full-node) |
| zcashd | Artık kullanımdan kaldırılmış olan özgün Zcash tam düğümü ve cüzdanı. 6.20.0 sürümü, 18 Temmuz 2026'da 3.417.100. blokta kendini kapattı ve NU6.3'ü hiçbir zaman desteklemedi. Bunun yerine Z3 yığınını veya Zakura'i çalıştırın. [Geçiş kılavuzu](/guides/migration-guide-zcashd-to-zebrad-zallet) |
| ZIP | Zcash İyileştirme Önerisi; protokol değişikliklerini önermek ve onaylamak için kullanılan topluluk yönetişimi süreci. [ZIP Depo](https://github.com/zcash/zips) |
| ZODL | Zcash Açık Geliştirme Laboratuvarı. Bootstrap ile yaşanan bir yönetişim anlaşmazlığının ardından istifa eden Josh Swihart ve eski Electric Coin Company mühendislik ekibi tarafından 2026'nın başında kurulan bağımsız kuruluş. Mart 2026'da tohum finansmanı olarak 25 milyon doların üzerinde kaynak topladı ve Şubat 2026'da Zashi adından yeniden adlandırılan ZODL cüzdanının bakımını yapıyor. [zodl.com](https://zodl.com) |
| zk-SNARKs | Sıfır Bilgi Kısa Etkileşimsiz Bilgi Argümanları — Zcash korumalı işlemlerine güç veren kriptografi. Herhangi bir gizli bilgiyi açığa çıkarmadan bir ifadenin (ör. geçerli bir harcama) kanıtlanmasını sağlar. |
| ZSA (Zcash Shielded Assets) | Zcash'in korumalı gizlilik özelliklerini devralan ve kullanıcılar tarafından çıkarılan token'lar; ZEC dışındaki varlıkların ağ üzerinde gizli biçimde hareket etmesini sağlar. [ZIP 226](https://zips.z.cash/zip-0226)'da tanımlanmıştır. NU7'ün ([ZIP 259](https://zips.z.cash/zip-0259)) parçası değildir ve etkinleştirme tarihi yoktur. |

---

**Son güncelleme:** Ekim 2026
**Katkıda bulunmak ister misiniz?** [Bu sayfayı GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md) üzerinde düzenleyin
