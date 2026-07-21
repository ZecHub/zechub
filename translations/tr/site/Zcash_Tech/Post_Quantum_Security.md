<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı Düzenle"/>
</a>

# Zcash'te Kuantum Sonrası Güvenlik

## Kısaca

- Kuantum bilgisayarlar gelecekte bir risk oluşturur çünkü bugün blokzincirlerde kullanılan bazı açık anahtarlı kriptografileri kırabilirler.
- "Post-quantum", sıradan bilgisayarlarda çalışan ancak gelecekteki kuantum bilgisayarlardan gelecek saldırılara direnç gösterecek şekilde tasarlanmış kriptografi anlamına gelir.
- Zcash bugün tam anlamıyla post-quantum değildir.
- Shielded Zcash, gelecekteki saldırganların inceleyebileceği herkese açık işlem verisi miktarını azaltır, ancak shielded kullanım tam kuantum direnciyle aynı şey değildir.
- Zcash, ZIP 2005 ve Project Tachyon gibi araştırmalar, ZIP'ler ve yükseltme önerileri aracılığıyla hazırlık yapmaktadır.
- Güvenli bir post-quantum geçişi; fonları, gizliliği, cüzdanları, borsaları ve konsensüs kurallarını aynı anda korumalıdır.

## Kuantum Hesaplama Nedir?

Normal bir bilgisayar bilgiyi bitler olarak depolar. Her bit ya `0` ya da `1` olur.

Bir kuantum bilgisayar, qubit adı verilen kuantum bitleri kullanır. Qubit'ler, bazı matematik problemlerini normal bilgisayarlardan çok daha hızlı çözen özel algoritmalar tarafından kullanılabilir.

Bu, bir kuantum bilgisayarın her konuda daha hızlı olduğu anlamına gelmez. Risk belirli bir alana özgüdür. Bazı kriptografiler, normal bilgisayarlar için çok zor ama yeterince büyük bir kuantum bilgisayar için çok daha kolay olan matematik problemlerine dayanır.

Blokzincirler için en önemli örnek açık anahtarlı kriptografidir. Açık anahtarlar ve imzalar, bir kullanıcının coin harcamaya yetkili olduğunu kanıtlamak için kullanılır.

## Blokzincirler Neden Önemsiyor?

Blokzincirler kriptografiyi birkaç farklı iş için kullanır:

| Kriptografik araç | Ne yapar | Kuantum etkisi |
| --- | --- | --- |
| Dijital imzalar | Sahibinin bir harcamaya yetki verdiğini kanıtlar | Yaygın eliptik eğri sistemleri için yüksek risk |
| Hash fonksiyonları | Adresleri, taahhütleri, Merkle ağaçlarını ve challenge'ları oluşturur | Daha düşük risk, ancak güvenlik marjları önemlidir |
| Sıfır bilgi ispatları | Ayrıntıları açığa çıkarmadan shielded işlemlerin geçerli olduğunu kanıtlar | İspat sistemine ve varsayımlara bağlıdır |
| Anahtar anlaşması | Cüzdanların alıcılar için note verisini şifrelemesine yardımcı olur | Kuantum tehdit modeli altında dikkatli inceleme gerektirir |

Yeterince güçlü bir kuantum bilgisayar, eliptik eğri imzaları da dahil olmak üzere bugün kullanılan birçok imza şemasını tehdit edebilir. Bu önemlidir çünkü bir imza, ağın bir işlemin doğru anahtar tarafından yetkilendirildiğini anlamasını sağlar.

Hash fonksiyonları farklıdır. Grover algoritması kaba kuvvet aramasını hızlandırabilir, ancak hash fonksiyonlarını aynı doğrudan şekilde kırmaz. Daha büyük güvenlik marjları yardımcı olabilir.

## Post-Quantum Kriptografi Nedir?

Post-quantum kriptografi, hem normal bilgisayarlara hem de gelecekteki kuantum bilgisayarlara karşı güvenli kalacak şekilde tasarlanan kriptografidir.

Bu, kriptografinin bir kuantum bilgisayar kullandığı anlamına gelmez. Sistemin farklı zor matematik problemlerine dayandığı anlamına gelir.

2024'te NIST ilk nihai post-quantum standartlarını yayımladı:

- Anahtar oluşturma için **ML-KEM**
- Dijital imzalar için **ML-DSA**
- Hash tabanlı dijital imzalar için **SLH-DSA**

Bu standartlar büyük bir dönüm noktasıdır, ancak bir blokzincir bir algoritmayı başka bir algoritmayla bir gecede basitçe değiştiremez. Konsensüs kuralları, cüzdanlar, donanım cüzdanları, işlem boyutları, ücretler ve gizliliğin hepsi dikkate alınmalıdır.

## Kuantum Riski Zincir Üzerinde Nasıl Ortaya Çıkar?

Riski düşünmenin basit bir yolu şudur:

1. Bir kullanıcı bir anahtar çifti oluşturur.
2. Açık anahtar veya imza verisi zincir üzerinde görünebilir.
3. Gelecekteki bir kuantum saldırganı, özel anahtarı öğrenmek için bu herkese açık materyali kullanabilir.
4. Fonlar hâlâ o anahtar tarafından kontrol ediliyorsa risk altında olabilir.

Şeffaf blokzincirler tasarım gereği çok fazla bilgiyi açığa çıkarır. Adresler, miktarlar ve işlem bağlantıları herkese açıktır. Coin harcandığında açık anahtar materyali de görünür hâle gelebilir.

Adres tekrar kullanımının zararlı olmasının nedenlerinden biri budur. Tekrar kullanım, gözlemcilere bugün bağlayabilecekleri daha fazla veri verir ve gelecekteki saldırganlara analiz edecekleri daha fazla tarihsel materyal sağlar.

## Zcash'te Farklı Olan Nedir?

Zcash hem transparent hem de shielded işlemleri destekler.

Transparent Zcash, Bitcoin tarzı herkese açık blokzincir kullanımına daha çok benzer. Adresler, miktarlar ve işlem ilişkileri görünürdür.

Shielded Zcash farklıdır. Shielded işlemler sıfır bilgi ispatlarını kullanır; böylece ağ, göndereni, alıcıyı veya miktarı açıklamadan bir işlemin kurallara uygun olduğunu doğrulayabilir.

Bu, Zcash'e önemli bir gizlilik avantajı sağlar:

- Herkesin görebileceği daha az işlem verisi yayımlanır.
- Kullanıcılar shielded kaldıklarında herkese açık bir ödeme grafiği oluşturmazlar.
- Gelecekteki gözlemcilerin analiz edebileceği daha az herkese açık finansal geçmiş olur.
- Seçmeli ifşa, varsayılan olarak herkese açık kayıtlar yerine viewing keys aracılığıyla gerçekleşebilir.

Ancak shielded Zcash otomatik olarak post-quantum değildir. Shielded havuzlar hâlâ kriptografik varsayımlara dayanır. Harcama yetkilendirmesi, note taahhütleri, nullifier'lar, ispat sistemleri, şifreleme ve cüzdan anahtarlarının hepsi dikkatli inceleme gerektirir.

Kısa sürüm:

> Shielded kullanım herkese açık görünürlüğü azaltır, ancak Zcash'in yine de bilinçli post-quantum yükseltmelere ihtiyacı vardır.

## Zcash Risk Haritası

| Alan | Başlangıç düzeyinde açıklama | Post-quantum endişesi |
| --- | --- | --- |
| Transparent adresler | Herkese açık adresler ve herkese açık işlem grafiği | Diğer transparent blokzincirlere benzer riskler |
| Harcama yetkilendirmesi | Bir kullanıcının harcama yapmaya yetkili olduğunun kanıtı | İmza şemalarının değiştirilmesi veya geçişi gerekebilir |
| Shielded note'lar | Shielded havuzların içindeki özel değer kayıtları | Bazı bileşenler yeni varsayımlara veya kurtarma araçlarına ihtiyaç duyabilir |
| zk-SNARKs | Shielded işlemlerin geçerli olduğuna dair ispatlar | İspat sistemi varsayımlarının gözden geçirilmesi gerekir |
| Cüzdan taraması | Cüzdanların alınan note'ları nasıl bulup çözdüğü | Anahtar anlaşması ve note şifrelemesi gözden geçirilmelidir |
| Geçiş | Fonların daha güvenli kriptografiye taşınması | Hem fon kaybı hem de gizlilik sızıntıları önlenmelidir |

## Zcash Nasıl Hazırlanıyor?

### Zcash'in Bir Ağ Yükseltme Süreci Var

Zcash kriptografisini daha önce değiştirdi. Sapling, shielded işlemleri kullanmayı kolaylaştırdı. NU5 ise Orchard, Unified Address ve Halo 2'yi tanıttı.

Bu önemlidir çünkü post-quantum hazırlığı tek satırlık bir yazılım yaması değildir. Koordineli ağ yükseltmeleri, cüzdan değişiklikleri, denetimler ve kullanıcıların geçiş yapması için zaman gerektirir.

Geçmiş Zcash yükseltmeleri, ekosistemin eski kriptografiden daha yeni tasarımlara geçme konusunda deneyime sahip olduğunu gösterir.

### Halo ve Orchard Daha Eski Varsayımları Azalttı

Halo 2, Zcash'in modern shielded havuzu olan Orchard tarafından kullanılır. Önemli bir iyileştirme, Halo'nun Orchard ispat sistemi için trusted setup ihtiyacını ortadan kaldırmış olmasıdır.

Bu, post-quantum güvenlikle aynı şey değildir. Yine de önemlidir çünkü daha iyi tasarımlar mevcut olduğunda Zcash'in büyük kriptografik yapı taşlarını değiştirebildiğini gösterir.

### ZIP 2005 Kuantum Kurtarılabilirliğine Odaklanır

ZIP 2005'in başlığı "Orchard Quantum Recoverability"dir. Eski varsayımlara yönelik kuantum saldırıları pratik hâle gelirse Orchard kullanıcılarının fonları kurtarmasına veya taşımasına yardımcı olmayı amaçlayan değişiklikler önerir.

Kurtarılabilirlik, tam post-quantum güvenlikle aynı şey değildir. Daha dardır ama yine de faydalıdır:

- Tam post-quantum güvenlik, kuantum saldırılarının işe yaramasını engellemeye çalışır.
- Kurtarılabilirlik, eski kriptografi güvensiz hâle gelirse dürüst kullanıcılara daha iyi bir çıkış yolu sağlar.

Yeni başlayanlar için bunu bir acil çıkış planı gibi düşünün. Tüm binayı değiştirmez, ancak eski kilit zayıflarsa insanların eski odadan güvenli bir şekilde çıkmasına yardımcı olur.

### Project Tachyon Daha Büyük Protokol İyileştirmelerine Yöneliyor

Project Tachyon, ölçek, senkronizasyon ve durum büyümesine odaklanan önerilen bir Zcash yükseltmesidir. Kamuya açık sitesinde, önerinin işlemleri küçültmeyi, doğrulayıcı durum büyümesini azaltmayı ve yan etki olarak tam post-quantum gizlilik elde etmeyi amaçladığı belirtiliyor.

Tachyon bir öneri olduğu için etkinleştirilmeden önce hâlâ mühendislik çalışmasına, incelemeye ve topluluk onayına bağlıdır. Bunu, kullanıcıların bugün zaten sahip olduğu bir özellikten ziyade Zcash'in aktif araştırma ve yükseltme yönünün bir parçası olarak anlamak en doğrusudur.

### Araştırma ve Standartlar İlerliyor

Daha geniş kriptografi dünyası da ilerliyor. NIST'in post-quantum standartları, uygulayıcılara imzalar ve anahtar oluşturma için daha güçlü yapı taşları sunuyor. Sıfır bilgi araştırmacıları, kuantum varsayımları altında ayakta kalabilecek ispat sistemlerini incelemeye devam ediyor.

Zcash bu çalışmalardan yararlanabilir, ancak yine de bunu gizliliği koruyan bir blokzincire uyarlaması gerekir.

## Olası Gelecek Yükseltme Yaklaşımları

### Post-Quantum Harcama Yetkilendirmesi

Zcash'in sonunda kuantuma karşı savunmasız imza şemalarına dayanmayan bir harcama yetkilendirmesine ihtiyacı olabilir.

Bu; post-quantum imzalar, hibrit imzalar veya başka bir tasarım kullanabilir. Hibrit tasarım, geçiş döneminde hem klasik hem de post-quantum kontrollerini kullanır; böylece sistem yalnızca tek bir varsayıma dayanmaz.

Zorluk boyut ve maliyettir. Post-quantum imzalar günümüz imzalarından daha büyük olabilir; bu da işlem boyutunu, bant genişliğini, ücretleri, mobil cüzdanları ve donanım cüzdanlarını etkiler.

### Yeni Adres ve Anahtar Formatları

Yeni kriptografi genellikle yeni anahtarlar ve adresler gerektirir. Kullanıcıların eski formatlardan daha güvenli formatlara geçmesi için net bir yol gerekir.

Geçiş cüzdanlarda basit olmalıdır. Çoğu kullanıcı güvende kalmak için her kriptografik ayrıntıyı anlamak zorunda kalmamalıdır.

### Gizliliği Koruyan Geçiş

Geçiş, Zcash için özellikle hassastır. Eğer birçok kullanıcı fonlarını eski havuzlardan yeni havuzlara bariz kalıplarla taşırsa, geçişin kendisi bilgi sızdırabilir.

İyi bir geçiş planının şunları koruması gerekir:

- Kullanıcı fonları
- Kullanıcı gizliliği
- Cüzdan uyumluluğu
- Borsa desteği
- Donanım cüzdanı desteği
- Ağ konsensüsü güvenliği

### Post-Quantum İspat Sistemi İncelemesi

İmzaları değiştirmek yeterli değildir. Zcash'in shielded tasarımı aynı zamanda sıfır bilgi ispatlarına ve taahhütlere de dayanır.

Gelecekteki çalışmaların şunları gözden geçirmesi veya değiştirmesi gerekebilir:

- zk-SNARK varsayımları
- Polinom taahhütleri
- Fiat-Shamir challenge hash'leri
- Note taahhütleri
- Nullifier yapısı
- Merkle ağacı varsayımları
- Note şifrelemesi ve viewing-key davranışı

Bazı bileşenler ayarlanmış parametrelerle kabul edilebilir olabilir. Diğer bileşenler yeni tasarımlar gerektirebilir.

## Başlangıç Seviyesi Örnekler

### Örnek 1: Eski Kilit

Bugün güçlü olan bir kilide sahip bir kasa hayal edin. Gelecekte icat edilen yeni bir araç bu eski kilidi hızlıca açabilir.

Post-quantum kriptografi, kilidi yeni aracın kırması beklenmeyen bir tasarımla değiştirmek gibidir.

Bir blokzincir için kilidi değiştirmek zordur çünkü her cüzdan, node, borsa ve donanım cihazı yeni tasarımı anlamak zorundadır.

### Örnek 2: Herkese Açık Fiş Kutusu

Transparent blokzincir verisi, her fişi sonsuza kadar herkese açık bir kutuya koymak gibidir. Bugün kimse tüm kalıpları okuyamasa bile, gelecekteki araçlar daha sonra daha fazlasını öğrenebilir.

Shielded Zcash bu fişleri en başta yayımlamaktan kaçınmaya çalışır. Bu, uzun vadeli gizliliğe yardımcı olur, ancak shielded sistemi koruyan kilidin yine de kuantum geleceği açısından gözden geçirilmesi gerekir.

### Örnek 3: Çıkış Planı

Kurtarılabilirlik, yangın çıkmadan önce bir kaçış rotası planlamak gibidir. Ona ihtiyaç duymamayı umarsınız, ancak acil durum sırasında tasarlamaktan çok daha güvenli olan şey bunu erken tasarlamaktır.

ZIP 2005, Orchard note'ları için bu fikre uyar.

## Kullanıcılar Bugün Ne Yapabilir?

Kullanıcıların paniğe kapılmasına gerek yok. Dağıtılmış blokzincir kriptografisini kırabilecek kadar güçlü büyük herkese açık kuantum bilgisayarlar bugün mevcut değildir.

Yine de iyi alışkanlıklar yardımcı olur:

- Mümkün olduğunda shielded Zcash kullanımını tercih edin.
- Adresleri yeniden kullanmaktan kaçının.
- Cüzdanları güncel tutun.
- Zcash ağ yükseltme duyurularını takip edin.
- Kurtarılabilirlik veya geçiş hakkında ZIP'leri ve cüzdan rehberliğini izleyin.
- Transparent etkinliğin özel olduğunu varsaymayın.
- Söylentilere göre fon taşımayın; güvenilir Zcash geliştiricilerinden ve cüzdan ekiplerinden net yönlendirme gelmesini bekleyin.

## Zorluklar

Post-quantum yükseltmeleri her blokzincir için zordur.

Yaygın zorluklar şunları içerir:

- Daha büyük anahtarlar ve imzalar
- Daha büyük işlemler
- Daha yüksek doğrulama maliyetleri
- Daha fazla bant genişliği kullanımı
- Yeni güvenlik denetimleri
- Donanım cüzdanı desteği
- Mobil cüzdan performansı
- Borsa ve saklama entegrasyonu
- Geçiş sırasında gizlilik sızıntıları
- Konsensüs değişiklikleri konusunda topluluk uzlaşması

Zcash için en zor kısım yalnızca coin'leri harcanabilir tutmak değildir. Zor olan, coin'leri harcanabilir tutarken aynı zamanda Zcash'i farklı kılan gizliliği korumaktır.

## Özet

Kuantum bilgisayarlar sonunda blokzincirlerde kullanılan bazı kriptografileri tehdit edebilir. Post-quantum kriptografi uzun vadeli cevaptır, ancak dikkatlice devreye alınmalıdır.

Zcash bugün tam anlamıyla post-quantum değildir. Ancak Zcash'in faydalı güçlü yanları vardır: shielded işlemler herkese açık görünürlüğü azaltır, ağın kriptografik yükseltmeler konusunda bir geçmişi vardır ve ZIP 2005 ile Project Tachyon gibi güncel araştırmalar şimdiden gelecekteki kuantum risklerine yönelmiştir.

Yeni başlayanlar için ana fikir basittir: bugünkü gizlilik gelecekteki veri görünürlüğünü azaltır ve dikkatli yükseltmeler, kullanılabilirlikten ödün vermeden Zcash'in daha güçlü kuantum çağı güvenliğine doğru ilerlemesine yardımcı olabilir.

## İlgili Sayfalar

- [Shielded Havuzlar](/using-zcash/shielded-pools) - Zcash shielded işlemleri işlem ayrıntılarını nasıl korur
- [Halo](/zcash-tech/halo) - Trusted setup olmadan Zcash'in ispat sistemi
- [ZKP ve ZK-SNARKS](/zcash-tech/zk-snarks) - Sıfır bilgi ispatları Zcash'te nasıl çalışır
- [Viewing Keys](/zcash-tech/viewing-keys) - Seçmeli ifşa shielded Zcash'te nasıl çalışır
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Gelecekteki shielded varlıklar ve özel varlık desteği
- [Temel Bir İlke Olarak Gizlilik](/privacy/privacy-as-a-core-principle) - Finansal gizliliğin neden önemli olduğu

## Referanslar

- [NIST: İlk nihai post-quantum şifreleme standartları](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST Post-Quantum Kriptografi Projesi](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Zcash Protokol Spesifikasyonu](https://zips.z.cash/protocol/protocol.pdf)
- [Halo 2 Kitabı](https://zcash.github.io/halo2/)
