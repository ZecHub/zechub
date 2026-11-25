<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Sayfayı düzenle"/>
</a>

# Zebra Tam Düğüm

## Kısaca

- Zebra (`zebrad`), Zcash Foundation tarafından yazılmış ve sürdürülen, Rust dilinde geliştirilmiş Zcash tam düğümüdür.
- Blokları ve işlemleri doğrular, Zincir durumunu tutar ve eşler arası ağ üzerinden diğer düğümlerle iletişim kurar.
- Zebra ve zcashd aynı protokolü uyguluyordu ve birbiriyle çalışabiliyordu. zcashd kullanımdan kaldırıldığından beri konsensüs rolünü Zebra üstleniyor.
- Çalıştırmanın iki yolu vardır: `zfnd/zebra` Docker imajı veya kaynak koddan derleme.
- Önerilen donanım 4 CPU çekirdeği, 16 GB RAM ve 300 GB disk alanıdır. Minimum gereksinim, aynı 300 GB disk alanıyla 2 çekirdek ve 4 GB RAM'dir.

## Temel Açıklama

Zebra, tamamen Rust ile yazılmış ilk Zcash düğümdür. Zcash eşler arası ağında yer alır; işlemleri doğrular ve yayınlar, blokzincir durumunu tutar. İkinci bir bağımsız uygulamanın bulunması, ağ altyapısının tek bir kod tabanına daha az bağımlı olmasını sağlar.

### Zebra ve zcashd

Özgün Zcash düğümü olan zcashd, Bitcoin'in kod tabanından yola çıkılarak Electric Coin Company tarafından geliştirildi. Zebra, güvenlik ve verimliliğe odaklanılarak bellek güvenli bir dil olan Rust ile sıfırdan yazıldı.

Her iki uygulama da aynı protokolü izlediğinden iletişim kurabiliyor ve birlikte çalışabiliyordu. zcashd, 18 Temmuz 2026'da Destek Sonu kapsamında durduruldu ve artık başlatılamıyor. Bu nedenle kullanımda olan düğüm uygulamaları Zebra ve Zakura'dır. Genel bakış için [Tam Düğümler](/zcash-tech/full-nodes) sayfasına bakın.

## Zebra Çalıştırma

Zebra'ı Docker imajını kullanarak çalıştırabilir veya kendiniz derleyebilirsiniz. Lütfen Sistem Gereksinimleri bölümüne bakın.

### Docker Kullanımı

En son sürümü çalıştırıp Zincir'in en güncel durumuyla eşitlemek için aşağıdaki komutu yürütün:

```

docker run zfnd/zebra:latest

```

Talimatların tamamı için [Docker belgelerine](https://zebra.zfnd.org/user/docker.html) bakın.

### Zebra Derleme

Zebra'ı derlemek için Rust, libclang ve bir C++ derleyicisi gerekir.

- En son kararlı Rust sürümünün yüklü olduğundan emin olun; Zebra yalnızca bu sürümle test edilir.
- Gerekli derleme bağımlılıkları şunlardır:
  - libclang (libclang-dev veya llvm-dev olarak da bilinir)
  - clang veya başka bir C++ derleyicisi (tüm platformlar için g++ ya da macOS için Xcode gibi)
  - 16 Mayıs 2020'de yayımlanan Protocol Buffers v3.12.0 ile sunulan *--experimental_allow_proto3_optional* işaretine sahip protoc (Protocol Buffers derleyicisi).

### Yükleme ve Başlatma

glibc 2.34 veya daha yeni bir sürüme sahip x86_64 ya da aarch64 Linux üzerinde (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023) derleme bağımlılıklarını atlayıp imzalı, önceden derlenmiş bir ikili dosya yükleyebilirsiniz:

```
cargo binstall zebrad
```

Aynı ikili dosyalar her GitHub sürümüne `zebrad-<version>-<target>.tar.gz` olarak eklenir; her birinde SHA-256 sağlama toplamı, Sigstore derleme kökeni kanıtı ve Cosign imzası bulunur. Daha eski platformlarda Docker imajını kullanın veya kaynak koddan derleyin.

Kaynak koddan derlemek için kodu alın ve sürüm ikili dosyasını oluşturun:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Düğümü şu komutla başlatın:

```
target/release/zebrad start
```

Yükleme kılavuzu: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## İsteğe Bağlı Yapılandırmalar ve Özellikler

### Yapılandırma Dosyasını Başlatma

  - Bir yapılandırma dosyası oluşturmak için şu komutu kullanın:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Oluşturulan *zebrad.toml* dosyası, Linux için varsayılan tercihler dizinine yerleştirilir. Alternatif işletim sistemlerinin varsayılan konumları için belgelere bakın.

### İlerleme Çubuklarını Yapılandırma

  - İlerleme çubuklarını kullanarak terminalde önemli ölçümleri görüntülemek için *zebrad.toml* dosyanızda *tracing.progress_bar* ayarını yapılandırın. Not: Bilinen bir sorun nedeniyle ilerleme çubuğu tahminleri aşırı büyüyebilir.

### Madenciliği Yapılandırma

  - Zebra, Docker içinde bir *MINER_ADDRESS* ve bağlantı noktası eşlemesi belirtilerek madencilik yapacak şekilde yapılandırılabilir. Daha fazla bilgi için [Madencilik desteği belgelerine](https://zebra.zfnd.org/user/mining-docker.html) bakın.

### Özel Derleme Özellikleri

  - Prometheus ölçümleri, Sentry izleme, deneysel Elasticsearch desteği ve daha fazlası gibi ek Cargo özellikleriyle Zebra'ın işlevselliğini genişletin.

  - Yükleme sırasında `--features` işaretinin parametreleri olarak listeleyerek birden fazla özelliği bir arada kullanın.

  - Performansı iyileştirmek amacıyla bazı hata ayıklama ve izleme özellikleri sürüm derlemelerinde devre dışıdır. Deneysel ve geliştirici özelliklerinin tam listesi için [API belgelerine](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags) bakın.

## Sistem Gereksinimleri ve Ağ Yapılandırması

### Önerilen Gereksinimler

- CPU: 4 CPU çekirdeği
- RAM: 16 GB
- Disk Alanı: İkili dosyaları derlemek ve önbelleğe alınmış Zincir durumunu depolamak için 300 GB kullanılabilir disk alanı
- Ağ: Ayda en az 300 GB yükleme ve indirme kapasitesine sahip 100 Mbps ağ bağlantısı

### Minimum Gereksinimler

- CPU: 2 CPU çekirdeği
- RAM: 4 GB
- Disk Alanı: 300 GB kullanılabilir disk alanı

Zebra'ın test paketinin tamamlanması, makinenizin özelliklerine bağlı olarak bir saatten uzun sürebilir. Daha yavaş sistemlerde Zebra derlenip çalıştırılabilir. Kesin performans sınırları testlerle belirlenmemiştir.

### Disk Gereksinimleri

- Zebra, önbelleğe alınmış Mainnet verileri için yaklaşık 300 GB, Testnet verileri içinse 10 GB kullanır. Disk kullanımının zamanla artmasını bekleyin.
- Veritabanı düzenli aralıklarla ve ayrıca kapatma ya da yeniden başlatma sırasında temizlenir. Değişiklikler veritabanı işlemleri kullanılarak kaydedilir. Zorla sonlandırma veya panic nedeniyle oluşan tamamlanmamış değişiklikler, Zebra bir sonraki başlatılışında geri alınır.

### Ağ Gereksinimleri ve Bağlantı Noktaları

- Zebra, gelen ve giden bağlantılar için aşağıdaki TCP bağlantı noktalarını kullanır:
  - Mainnet için 8233
  - Testnet için 18233
- Zebra, belirli bir listen_addr ile yapılandırıldığında bu adresi gelen bağlantılar için duyurur. Eşitleme için giden bağlantılar gereklidir; gelen bağlantılar isteğe bağlıdır.
- Zcash DNS tohum sunucularına erişmek için işletim sisteminin DNS çözümleyicisi (genellikle 53 numaralı bağlantı noktası) gerekir.
- Zebra herhangi bir bağlantı noktasında giden bağlantılar kurabilir. zcashd, diğer ağlara yönelik DDoS saldırılarında kullanılmasını önlemek için varsayılan bağlantı noktalarındaki eşleri tercih eder.

### Mainnet İçin Tipik Ağ Kullanımı

- İlk Eşitleme: İlk eşitleme için 300 GB indirme gerekir ve bu miktarın artması beklenir.
- Sürekli Güncellemeler: Kullanıcı işlemlerinin boyutuna ve eş taleplerine bağlı olarak günde 10 MB ile 10 GB arasında yükleme ve indirme.
- Zebra, dahili veritabanı sürümü her değiştiğinde ilk eşitlemeyi başlatır. Bu nedenle sürüm yükseltmeleri sırasında Zincir'in tamamının indirilmesi gerekebilir.
- Gidiş-dönüş gecikmesi 2 saniye veya daha az olan eşler tercih edilir. Gecikme bu eşiği aşarsa Zebra deposunda bir talep açın.

## Sık Yapılan Hatalar

- Diski bugünkü kullanım miktarına göre boyutlandırmak. Önbelleğe alınmış Mainnet durumu şimdiden 300 GB'a yaklaştı ve büyümeye devam ediyor.
- `zebrad` üzerinden cüzdan RPC'leri beklemek. Anahtarlar ve bakiyeler ayrı bir program olan [Zallet](https://github.com/zcash/zallet) içinde tutulur.
- `zebrad`'ı tek başına çalıştırıp hafif cüzdanların bağlanmasını beklemek. Bunun için lightwalletd veya [Zaino](/zcash-tech/zaino) türünde bir indeksleyici gerekir.
- Beklenmedik bir yeniden eşitlemeyi arıza sanmak. Veritabanı sürümünün değişmesi, tasarım gereği yeniden eşitlemeyi tetikler.

## İlgili Sayfalar

- [Tam Düğümler](/zcash-tech/full-nodes) - tam düğümün ne yaptığı ve hangi uygulamaların bulunduğu
- [Zakura Düğümü](/zcash-tech/zakura-node) - daha hızlı eşitleme ve budama özelliklerine sahip, Zebra'dan çatallanmış bir düğüm
- [Zaino](/zcash-tech/zaino) - hafif cüzdanlara hizmet veren Rust indeksleyicisi
- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) - hafif cüzdanların sorguladığı sunucular
- [Zcash Madencilik Rehberi](/using-zcash/zcash-mining-guide) - kendi düğümünüz üzerinden madencilik

## Daha Fazla Öğrenme

- [Zebra Kitabı](https://zebra.zfnd.org)
- [Zebra'nın GitHub deposu](https://github.com/ZcashFoundation/zebra/)
- [Sistem Gereksinimleri](https://zebra.zfnd.org/user/requirements.html)
