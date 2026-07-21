<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zebra_Full_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

## Zebra Node'a Giriş

Zebra ile tanışın: Rust ile Zcash Node Altyapısında Devrim

Tamamen Rust ile geliştirilmiş ilk Zcash node'u olan Zebra ile tanışın; bu çığır açan başarı, Zcash ekosisteminde önemli bir dönüm noktasıdır. Zcash eşler arası ağa sorunsuz biçimde entegre edilen Zebra, ağın dayanıklılığını güçlendiren kritik bir araç olarak hizmet eder. İşlemleri doğrulama ve yayınlama ile Zcash blockchain durumunu titizlikle koruma gibi temel işlevleri sayesinde Zebra, daha merkeziyetsiz bir ağ altyapısına katkıda bulunur.

## Zcashd Node Uygulamasına Karşı Avantajları
Kökeni Bitcoin'in temel kod tabanına dayanan ve Electric Coin Company tarafından geliştirilen özgün Zcash node'u zcashd'nin aksine, bizim uygulamamız bağımsız bir yapıdır. Güvenlik ve verimlilik odağıyla sıfırdan geliştirilen Zebra, bellek güvenliğine sahip Rust dilinin gücünden yararlanır.

Farklı kökenlere sahip olmalarına rağmen, hem zcashd hem de Zebra aynı protokole uyar; bu da aralarında sorunsuz iletişim ve birlikte çalışabilirlik sağlar. Bu yenilik yalnızca Zcash ekosistemini genişletmekle kalmaz, aynı zamanda blockchain node geliştirme için yeni bir standart belirler.

## Zebra Launcher Talimatları

Zebra'yı Docker image'ımızı kullanarak çalıştırabilir veya manuel olarak derleyebilirsiniz. Lütfen Sistem Gereksinimleri bölümüne bakın.

### Docker Kullanımı:

En son sürümümüzü zahmetsizce çalıştırmak ve en güncel duruma senkronize etmek için aşağıdaki komutu çalıştırın:

```

docker run zfnd/zebra:latest

```

Daha kapsamlı talimatlar ve ayrıntılı bilgiler için lütfen [Docker dokümantasyonumuza](https://zebra.zfnd.org/user/docker.html) başvurun.

### Zebra Derleme:

Zebra'yı derlemek için Rust, libclang ve bir C++ derleyicisi gerekir.

- Zebra yalnızca bununla test edildiğinden, en son kararlı Rust sürümünün kurulu olduğundan emin olun.
- Gerekli derleme bağımlılıkları şunlardır:
  - libclang (libclang-dev veya llvm-dev olarak da bilinir)
  - clang veya başka bir C++ derleyicisi (tüm platformlar için g++ ya da macOS için Xcode gibi)
  - *--experimental_allow_proto3_optional* bayrağı ile protoc (Protocol Buffers derleyicisi); bu bayrak, 16 Mayıs 2020'de yayımlanan Protocol Buffers v3.12.0 ile sunulmuştur.



### Arch Üzerindeki Bağımlılıklar:

Bağımlılıkların karşılandığından emin olduktan sonra, Zebra'yı derlemek ve kurmak için aşağıdaki komutu çalıştırın:

```

cargo install --locked zebrad

```

Zebra'yı başlatmak için şunu çalıştırın:

```
zebrad start

```


## İsteğe Bağlı Yapılandırmalar ve Özellikler:


### - Yapılandırma Dosyasını Başlatma:

  - Aşağıdaki komutu kullanarak bir yapılandırma dosyası oluşturun:
    
  ```
  zebrad generate -o ~/.config/zebrad.toml
  
  ```

  - Oluşturulan *zebrad.toml*, Linux'un varsayılan tercih dizinine yerleştirilir. Diğer işletim sistemlerinin varsayılan konumları için dokümantasyonumuza bakın.



### - İlerleme Çubuklarını Yapılandırma:

  - *zebrad.toml* dosyanızda *tracing.progress_bar* ayarını yapılandırarak önemli metriklerin terminalde ilerleme çubuklarıyla gösterilmesini sağlayın. Not: İlerleme çubuğu tahminlerinin aşırı büyük hale gelebildiği bilinen bir sorun vardır.



### - Madenciliği Yapılandırma:

  - Zebra, Docker içinde bir *MINER_ADDRESS* ve port eşlemesi belirtilerek madencilik için özelleştirilebilir. Daha fazla ayrıntıyı [Madencilik desteği dokümantasyonumuzda](https://zebra.zfnd.org/user/mining-docker.html) bulabilirsiniz.


### - Özel Derleme Özellikleri:

  - Prometheus metrikleri, Sentry izleme, deneysel Elasticsearch desteği ve daha fazlası gibi ek Cargo özellikleriyle Zebra'nın işlevselliğini genişletin.

  - Kurulum sırasında `--features` bayrağının parametreleri olarak birden fazla özelliği listeleyerek bunları birleştirin.


### Not: Bazı hata ayıklama ve izleme özellikleri, performansı optimize etmek için release derlemelerinde devre dışı bırakılmıştır.

Deneysel ve geliştirici özelliklerinin kapsamlı bir listesi için lütfen [API dokümantasyonumuza](https://docs.rs/zebrad/latest/zebrad/index.html#zebra-feature-flags) bakın.
 

# Zebra için Sistem Gereksinimleri ve Ağ Yapılandırması

Tamamen Rust ile geliştirilmiş devrim niteliğindeki Zcash node'u zebrad'i derlemek ve çalıştırmak için en iyi performans ve güvenilirliği sağlamak adına aşağıdaki sistem gereksinimlerini öneriyoruz:

### Sistem Gereksinimleri:
- CPU: 4 CPU çekirdeği
- RAM: 16 GB
- Disk Alanı: İkili dosyaların derlenmesi ve önbelleğe alınmış chain state'in depolanması için 300 GB kullanılabilir disk alanı
- Ağ: Aylık en az 300 GB yükleme ve indirme kapasitesine sahip 100 Mbps ağ bağlantısı


Lütfen Zebra'nın test paketinin, makinenizin özelliklerine bağlı olarak tamamlanmasının bir saatten fazla sürebileceğini unutmayın. Daha yavaş sistemler Zebra'yı derleyip çalıştırabiliyor olabilir, ancak testler yoluyla kesin performans sınırlarını henüz belirlemiş değiliz.


### Disk Gereksinimleri:
- Zebra, önbelleğe alınmış Mainnet verileri için yaklaşık 300 GB ve önbelleğe alınmış Testnet verileri için 10 GB kullanır. Disk kullanımının zamanla artmasını bekleyin.
- Veritabanı, özellikle kapatma veya yeniden başlatma sırasında düzenli olarak temizlenir ve veri bütünlüğü sağlanır. Zorla sonlandırmalar veya panikler nedeniyle tamamlanmamış değişiklikler, Zebra yeniden başlatıldığında geri alınır.


### Ağ Gereksinimleri ve Portlar:
- Zebra, gelen ve giden bağlantılar için aşağıdaki TCP portlarını kullanır:
  - Mainnet için 8233
  - Testnet için 18233
- Zebra'yı belirli bir listen_addr ile yapılandırmak, bu adresin gelen bağlantılar için ilan edilmesini sağlar. Senkronizasyon için giden bağlantılar gerekli olsa da gelen bağlantılar isteğe bağlıdır.
- İşletim sistemi DNS çözümleyicisi üzerinden (genellikle 53 numaralı port) Zcash DNS seeders erişimi gereklidir.
- Zebra herhangi bir port üzerinden giden bağlantılar kurabilse de, zcashd diğer ağlara yönelik DDoS saldırılarını azaltmak için varsayılan portlardaki eşleri tercih eder.


### Tipik Mainnet Ağ Kullanımı:
- İlk Senkronizasyon: İlk senkronizasyon için 300 GB indirme gerekir; sonraki indirmelerde bunun artması beklenir.
- Sürekli Güncellemeler: Kullanıcı işlem boyutlarına ve eş isteklerine bağlı olarak günlük 10 MB ile 10 GB arasında yükleme ve indirme bekleyin.
- Zebra, her dahili veritabanı sürümü değişikliğinde bir ilk senkronizasyon başlatır; bu da sürüm yükseltmeleri sırasında tam chain indirmeleri gerektirebilir.
- Gidiş-dönüş gecikmesi 2 saniye veya daha az olan eşler tercih edilir. Gecikme bu eşiği aşarsa lütfen yardım için bir destek kaydı gönderin.


Bu önerilere ve yapılandırmalara uyarak, Zebra'nın Zcash ağı içindeki verimliliğini ve etkinliğini en üst düzeye çıkarabilirsiniz. Herhangi bir sorunla karşılaşırsanız veya ek yardıma ihtiyaç duyarsanız, destek ekibimiz size rehberlik sağlamaya hazırdır.


Zebra Node Kurulum rehberinin bağlantısı burada:
https://zebra.zfnd.org/user/install.html?highlight=zebra%20launcher#installing-zebra
