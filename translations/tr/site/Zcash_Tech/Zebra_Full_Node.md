<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zebra Tam Düğüm

## Kısaca

- Zebra (`zebrad`), Rust ile yazılmış ve Zcash Foundation tarafından sürdürülen Zcash tam düğümüdür.
- Blokları ve işlemleri doğrular, zincir durumunu korur ve eşler arası ağ üzerinden diğer düğümlerle iletişim kurar.
- Zebra ve zcashd aynı protokolü uyguladı ve birlikte çalışabiliyordu. zcashd kullanımdan kaldırıldığından beri Zebra mutabakat rolünü üstlenmektedir.
- Çalıştırmanın iki yolu vardır: `zfnd/zebra` Docker imajı veya kaynak koddan derleme.
- Önerilen donanım 4 CPU çekirdeği, 16 GB RAM ve 300 GB disktir. Asgari gereksinim, aynı 300 GB disk alanıyla 2 çekirdek ve 4 GB RAM'dir.

## Temel Açıklama

Zebra, tamamen Rust ile yazılmış ilk Zcash düğümüdür. İşlemleri doğrulayıp yayınladığı ve blok zinciri durumunu koruduğu Zcash eşler arası ağında yer alır. İkinci bağımsız bir uygulamanın bulunması, ağ altyapısının herhangi tek bir kod tabanına daha az bağımlı olmasını sağlar.

### Zebra ve zcashd

Özgün Zcash düğümü olan zcashd, Bitcoin'in kod tabanından Electric Coin Company tarafından geliştirildi. Zebra ise güvenlik ve verimliliğe odaklanılarak, bellek güvenli bir dil olan Rust'ta sıfırdan yazıldı.

Her iki uygulama da aynı protokolü takip eder; dolayısıyla iletişim kurabilir ve birlikte çalışabilirler. zcashd, 18 Temmuz 2026'da Destek Sonu durma noktasına ulaştı ve artık başlamıyor; bu da kullanımda olan düğüm uygulamaları olarak Zebra ve Zakura'ü bırakıyor. Daha geniş tablo için [Tam Düğümler](/zcash-tech/full-nodes) sayfasına bakın.

## Zebra Çalıştırma

Zebra'yi Docker imajını kullanarak çalıştırabilir veya manuel olarak derleyebilirsiniz. Lütfen Sistem Gereksinimleri bölümüne bakın.

### Docker Kullanımı

En son sürümü çalıştırmak ve zincirin ucuyla senkronize etmek için aşağıdaki komutu çalıştırın:

```

docker run zfnd/zebra:latest

```

Tam talimatlar için [Docker belgelerine](https://zebra.zfnd.org/user/docker.html) bakın.

### Zebra Derleme

Zebra derlemek için Rust, libclang ve bir C++ derleyicisi gerekir.

- Zebra yalnızca bununla test edildiği için en son kararlı Rust sürümünün kurulu olduğundan emin olun.
- Gerekli derleme bağımlılıkları şunlardır:
  - libclang (libclang-dev veya llvm-dev olarak da bilinir)
  - clang ya da başka bir C++ derleyicisi (tüm platformlar için g++ veya macOS için Xcode gibi)
  - Protocol Buffers v3.12.0'da (16 Mayıs 2020'de yayımlandı) kullanıma sunulan *--experimental_allow_proto3_optional* bayrağıyla birlikte protoc (Protocol Buffers derleyicisi).

### Kurulum ve Başlatma

glibc 2.34 veya daha yeni sürümü kullanan x86_64 ya da aarch64 Linux'ta (Ubuntu 22.04+, Debian 12+, RHEL 9+, Amazon Linux 2023), derleme bağımlılıklarını atlayabilir ve imzalı, önceden derlenmiş bir ikili dosya kurabilirsiniz:

```
cargo binstall zebrad
```

Aynı ikili dosyalar, her GitHub sürümüne `zebrad-<version>-<target>.tar.gz` olarak eklenir; her birinde SHA-256 sağlama toplamı, Sigstore derleme-kökeni kanıtı ve Cosign imzası bulunur. Eski platformlarda Docker imajını kullanın veya kaynak koddan derleyin.

Kaynak koddan derlemek için kodu alın ve sürüm ikili dosyasını derleyin:

```
git clone https://github.com/ZcashFoundation/zebra.git
cd zebra
cargo build --release --bin zebrad
```

Düğümü şu komutla başlatın:

```
target/release/zebrad start
```

Kurulum rehberi: [zebra.zfnd.org/user/install.html](https://zebra.zfnd.org/user/install.html)

## İsteğe Bağlı Yapılandırmalar ve Özellikler

### Yapılandırma Dosyasını Başlatma

  - Şu komutu kullanarak bir yapılandırma dosyası oluşturun:

  ```
  zebrad generate -o ~/.config/zebrad.toml

  ```

  - Oluşturulan *zebrad.toml*, Linux'un varsayılan tercih dizinine yerleştirilecektir. Diğer işletim sistemlerinin varsayılan konumları için belgelere bakın.

### İlerleme Çubuklarını Yapılandırma

  - Terminalde ilerleme çubukları kullanarak temel metrikleri görüntülemek için *zebrad.toml* dosyanızdaki *tracing.progress_bar* ayarını yapılandırın. Not: İlerleme çubuğu tahminlerinin aşırı derecede büyük olabildiği bilinen bir sorun vardır.

### Madenciliği Yapılandırma

  - Zebra, Docker'da bir *MINER_ADDRESS* ve port eşlemesi belirtilerek madencilik için yapılandırılabilir. Daha fazla ayrıntıyı [Madencilik desteği belgelerinde](https://zebra.zfnd.org/user/mining-docker.html) bulabilirsiniz.

### Özel Derleme Özellikleri

  - Prometheus metrikleri, Sentry izleme, deneysel Elasticsearch desteği ve daha fazlası gibi ek Cargo özellikleriyle Zebra'nin işlevselliğini genişletin.

  - Kurulum sırasında `--features` bayrağının parametreleri olarak birden fazla özelliği listeleyerek bunları birleştirin.

  - Performansı optimize etmek amacıyla bazı hata ayıklama ve izleme özellikleri sürüm derlemelerinde devre dışı bırakılır. Deneysel ve geliştirici özelliklerinin tam listesi için [API belgelerine](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags) başvurun.

## Sistem Gereksinimleri ve Ağ Yapılandırması

### Önerilen Gereksinimler

- CPU: 4 CPU çekirdeği
- RAM: 16 GB
- Disk Alanı: İkili dosyaları derlemek ve önbelleğe alınmış zincir durumunu depolamak için 300 GB kullanılabilir disk alanı
- Ağ: Ayda en az 300 GB yükleme ve indirme ile 100 Mbps ağ bağlantısı

### Asgari Gereksinimler

- CPU: 2 CPU çekirdeği
- RAM: 4 GB
- Disk Alanı: 300 GB kullanılabilir disk alanı

Zebra'nin test paketi, makinenizin özelliklerine bağlı olarak tamamlanması bir saatten fazla sürebilir. Daha yavaş sistemler de Zebra'yi derleyip çalıştırabilir. Kesin performans sınırları testlerle belirlenmemiştir.

### Disk Gereksinimleri

- Zebra, önbelleğe alınmış Mainnet verileri için yaklaşık 300 GB ve önbelleğe alınmış Testnet verileri için 10 GB kullanır. Disk kullanımının zamanla artmasını bekleyin.
- Veritabanı periyodik olarak, ayrıca kapatma veya yeniden başlatma sırasında temizlenir. Değişiklikler veritabanı işlemleri kullanılarak kaydedilir. Zorla sonlandırma veya panic nedeniyle tamamlanmamış değişiklikler, Zebra bir sonraki kez başladığında geri alınır.

### Ağ Gereksinimleri ve Portlar

- Zebra, gelen ve giden bağlantılar için aşağıdaki TCP portlarını kullanır:
  - Mainnet için 8233
  - Testnet için 18233
- Zebra'yi belirli bir listen_addr ile yapılandırmak, bu adresi gelen bağlantılar için duyurur. Senkronizasyon için giden bağlantılar gereklidir; gelen bağlantılar isteğe bağlıdır.
- İşletim sistemi DNS çözümleyicisi aracılığıyla Zcash DNS seed'lerine erişim gereklidir (genellikle port 53).
- Zebra herhangi bir port üzerinden giden bağlantılar kurabilir. zcashd, diğer ağlara yönelik DDoS saldırılarında kullanılmaktan kaçınmak için varsayılan portlardaki eşleri tercih eder.

### Tipik Mainnet Ağ Kullanımı

- İlk Senkronizasyon: İlk senkronizasyon için 300 GB indirme gerekir ve bu miktarın artması beklenmektedir.
- Süregelen Güncellemeler: Kullanıcı işlem boyutlarına ve eş isteklerine bağlı olarak günlük 10 MB ile 10 GB arasında yükleme ve indirme.
- Zebra, her dahili veritabanı sürümü değişikliğinde ilk senkronizasyon başlatır; bu, sürüm yükseltmeleri sırasında zincirin tamamının indirilmesi anlamına gelebilir.
- Gidiş-dönüş gecikmesi 2 saniye veya daha az olan eşler tercih edilir. Gecikme bu eşiği aşarsa Zebra deposunda bir kayıt açın.

## Yaygın Hatalar

- Diski bugünün ihtiyaçlarına göre boyutlandırmak. Önbelleğe alınmış Mainnet durumu zaten 300 GB'a yakın ve büyümeye devam ediyor.
- `zebrad`'den cüzdan RPC'leri beklemek. Anahtarlar ve bakiyeler, ayrı bir program olan [Zallet](https://github.com/zcash/zallet) içinde bulunur.
- `zebrad`'yi tek başına çalıştırıp hafif cüzdanların bağlanmasını beklemek. Bu yol, lightwalletd ya da [Zaino](/zcash-tech/zaino) olmak üzere bir indeksleyici gerektirir.
- Beklenmedik bir yeniden senkronizasyonu hata olarak görmek. Bir veritabanı sürümü değişikliği bunu tasarım gereği tetikler.

## İlgili Sayfalar

- [Tam Düğümler](/zcash-tech/full-nodes) - tam düğümün ne yaptığı ve hangi uygulamaların bulunduğu
- [Zakura Düğümü](/zcash-tech/zakura-node) - daha hızlı senkronizasyon ve budama özelliğine sahip, Zebra'den çatallanmış bir düğüm
- [Zaino](/zcash-tech/zaino) - hafif cüzdanlara hizmet veren Rust indeksleyicisi
- [Hafif Cüzdan Düğümleri](/zcash-tech/lightwallet-nodes) - hafif cüzdanların sorguladığı sunucular
- [Zcash Madencilik Rehberi](/using-zcash/zcash-mining-guide) - kendi düğümünüze karşı madencilik

## Daha Fazla Öğrenme

- [Zebra Kitabı](https://zebra.zfnd.org)
- [ üzerindeki Zebra GitHub](https://github.com/ZcashFoundation/zebra/)
- [Sistem Gereksinimleri](https://zebra.zfnd.org/user/requirements.html)
