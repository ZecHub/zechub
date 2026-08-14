# Raspberry Pi 4 Üzerinde Bir Tam Düğüm Çalıştırın (Zebra + Zallet)

*Orijinal zcashd tabanlı rehberden taşındı. zcashd, 18 Temmuz 2026'da otomatik Destek Sonu durdurmasına ulaştı; bu nedenle bu rehber artık **Zebra**'yı (Zcash Foundation tarafından sürdürülen mevcut tam düğüm) ve **Zallet**'i (zcashd'nin yerleşik cüzdanının yerini almak için geliştirilen cüzdan) kullanıyor.*

## Neler öğreneceksiniz
- Headless kullanım için Raspberry Pi 4 üzerinde Ubuntu Server 22.04+ (64-bit) nasıl flashlanır ve yapılandırılır
- Zebra'nın Docker veya önceden derlenmiş bir binary aracılığıyla nasıl kurulup çalıştırılacağı
- Zallet'in nasıl kurulacağı, yapılandırılacağı ve başlatılacağı; buna cüzdan şifreleme kurulumu da dahildir
- İsteğe bağlı olarak mevcut bir zcashd config/cüzdanının Zallet'e nasıl taşınacağı

## Eski rehberden neler değişti
Bu rehberin önceki sürümü, **zcashd**'nin Pi 4 üzerinde yerel olarak nasıl derleneceğini anlatıyordu — Pi 4 paralel (`-j$(nproc)`) derleme için yeterli belleğe sahip olmadığından, tek iş parçacıklı bir derleme 3–4 saat sürüyordu. Zebra ve Zallet artık **resmi önceden derlenmiş ARM64 binary'ler ve Docker image'ları** yayımlıyor; bu nedenle çoğu durumda artık Pi üzerinde kaynak koddan herhangi bir şey derlemeniz gerekmiyor.

## Önkoşullar
- Bir Raspberry Pi 4 (4 GB RAM veya daha fazlası önerilir)
- İşletim sistemi için bir microSD kart (32 GB+)
- USB 3.0 destekli harici bir SSD/HDD — **Zebra, önbelleğe alınmış Mainnet verisi için yaklaşık 300 GB alana ihtiyaç duyar** ve bu zamanla büyür, bu yüzden bunu yalnızca microSD kart üzerinden çalıştırmayı denemeyin
- Bir microSD kart yuvasına sahip bir bilgisayar (OS image'ını flashlamak için)
- Kablolu Ethernet bağlantısı veya Wi-Fi
- SSH üzerinden komut satırını temel düzeyde rahat kullanabilme

## Adım 1: Ubuntu Server 22.04+ (64-bit) flashlayın
Zebra ve Zallet'in önceden derlenmiş binary'leri ile Docker image'ları **glibc 2.34+** gerektirir; bu da **Ubuntu Server 22.04 veya daha yenisi (64-bit/aarch64)** anlamına gelir.

1. Ana bilgisayarınıza Raspberry Pi Imager'ı kurun.
2. microSD kartınızı takın.
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (veya daha yenisi) seçin.
4. İlk açılışı headless yapmak için Imager'ın gelişmiş seçeneklerini (dişli simgesi) kullanarak hostname'i önceden yapılandırın, SSH'yi etkinleştirin ve gerekirse Wi-Fi kimlik bilgilerini ayarlayın.
5. Image'ı yazın, kartı takın ve Pi'yi açın.
6. SSH ile bağlanın: `ssh <username>@<pi-hostname-or-ip>`

## Adım 2: Harici depolamayı bağlayın ve mount edin
1. Harici SSD/HDD'nizi USB 3.0 üzerinden bağlayın.
2. Aygıtı belirleyin: `lsblk`
3. (Yeniyse) biçimlendirin ve örneğin `/mnt/zcash-data` konumuna mount edin; yeniden başlatmada otomatik mount olması için standart bir `mkfs`/`fstab` kurulumu kullanın.

## Adım 3: Sistemi güncelleyin
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Adım 4: Zebra'yı kurun ve çalıştırın
### Seçenek A — Docker (önerilir)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # bundan sonra çıkış yapıp tekrar giriş yapın
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
İlerlemeyi kontrol edin: `docker logs -f zebra`

### Seçenek B — cargo binstall ile önceden derlenmiş binary
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Bu, önceden derlenmiş bir `aarch64` binary kurar — derleme gerekmez.

**Senkronizasyon süresi hakkında:** bunun biraz zaman almasını bekleyin — sıkça alıntılanan ilk senkronizasyon rakamları (yaklaşık 2 saat), Pi 4'ün CPU'sundan daha güçlü referans donanımlardan gelir; bu yüzden gerçek Pi 4 donanımında gerçek senkronizasyon süreniz muhtemelen daha uzun olacaktır.

## Adım 5: Zallet'i kurun
Zallet şu anda **alpha** aşamasındadır — uyumluluğu bozan değişiklikler bekleyin ve henüz önemli miktarda fon için üretime hazır saklama çözümü olarak değerlendirmeyin.

### Seçenek A — Docker (önerilir)
```bash
docker pull zodlinc/zallet:latest
```
Bu image ARM64'ü destekler (Nix tabanlı bir derleme aracılığıyla) ve minimal, shellsiz bir dosya sisteminden çalışır — yapılandırma ve veri yollarını `--datadir` ile volume mount'ları üzerinden açıkça belirtin (bkz. Adım 6).

### Seçenek B — Kaynak koddan derleyin
```bash
# Rust 1.85+ gerektirir (rustup kurulumu için Adım 4B'ye bakın)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Zallet'in crate'leri alpha aşamasında henüz crates.io üzerinde yayımlanmadığı için git reposundan doğrudan kurulum, Docker dışındaki desteklenen yöntemdir.

## Adım 6: Zallet'i yapılandırın
Seçtiğiniz veri dizininde (örneğin `/mnt/zcash-data/zallet`) `zallet.toml` oluşturun:
```toml
[builder.limits]
[consensus]
network = "main"
[database]
[external]
[features]
as_of_version = "0.0.0"
[features.deprecated]
[features.experimental]
[indexer]
validator_address = "127.0.0.1:8232"   # Zebra'nın JSON-RPC uç noktası
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Zebra farklı bir host/port üzerinde çalışıyorsa `validator_address` değerini ayarlayın ve `[indexer]` altında `validator_cookie_auth`/`validator_user`/`validator_password` ayarlarını Zebra RPC kimlik doğrulama kurulumunuza uyacak şekilde yapılandırın.

**zcashd'den mi geçiyorsunuz?** Hâlâ eski bir `zcash.conf` dosyanız varsa:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Adım 7: Cüzdan şifrelemesini kurun
Zallet, tüm anahtar materyalini `age`/`rage` kullanarak şifreler:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Bu bir açık anahtar ve otomatik oluşturulmuş bir parola üretir — **parolayı kaydedin; identity dosyasını onsuz kurtaramazsınız.**

## Adım 8: Cüzdanı başlatın ve çalıştırın
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
Birden fazla bağımsız harcama kökü istemediğiniz sürece `generate-mnemonic` komutunu **yalnızca bir kez çalıştırın**.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Adım 9: Mevcut bir zcashd cüzdanını taşıma (isteğe bağlı)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Bu, `db_dump` yardımcı aracını gerektirir (Berkeley DB 6.2.23'e karşı derlenmiş) — sistem kurulumu veya zcashd'nin yerel kaynak derlemesinden. Artık zcashd kurulu değilse, bu henüz Zallet içinde tamamen kendi kendine yeterli olmayan tek taşıma adımıdır.

## Adım 10: Her şeyin çalıştığını doğrulayın
```bash
zallet -d /mnt/zcash-data/zallet help
```
Cüzdanın yanıt verdiğini ve Zebra senkronizasyonu tamamladıktan sonra bakiyelerin/adreslerin beklendiği gibi olduğunu doğrulayın.

## Sorun giderme
- **ARM üzerinde Zebra derleme/çalışma zamanı sorunları:** Kaynak koddan derliyorsanız Rust ARM toolchain'ini kurun — Zebra'nın kendi belgelerine göre, ARM donanımı üzerinde x86_64 derleme araçlarını çalıştırmak belirgin şekilde daha yavaş olacaktır.
- **Depolama alanının dolması:** Zebra'nın yaklaşık 300 GB'lık alan kullanımı büyümeye devam eder — buna göre boş alan planlayın.
- **Docker izin hataları:** Kullanıcınızı `docker` grubuna ekledikten sonra çıkış yapıp tekrar giriş yapın veya bu arada `sudo` kullanın.
- **Zallet container'ında shell yok:** Resmi `zodlinc/zallet` image'ı tasarım gereği from-scratch'tır — her zaman `--datadir` parametresini açıkça verin ve veri dizininizi bir volume olarak mount edin.

## Eski zcashd rehberine kıyasla donanım notları
Önceden derlenmiş binary'ler/container'lar çalıştırdığınız için Zebra ve Zallet, kurulum sırasında genel olarak zcashd derlemeye kıyasla CPU açısından daha hafiftir. 4 GB RAM makul bir başlangıç noktasıdır; `htop` ile izleyin ve yoğun swap görürseniz 8 GB'lık Pi 4 varyantını değerlendirin.

## Ek kaynaklar
- [Zebra Kitabı](https://zebra.zfnd.org) — resmi Zebra belgeleri
- [Zallet Kitabı](https://zcash.github.io/wallet) — resmi Zallet belgeleri
- [zcashd Destek Sonu bildirimi](https://z.cash/support/zcashd-deprecation)

---

*Bu rehberi faydalı bulduysanız, ZecHub'ı desteklemeyi düşünebilirsiniz: [güncel ZecHub shielded bağış adresini zechub.wiki/donation sayfasından ekleyin — hâlâ güncel olduğunu doğrulayamadığım için buraya eklenmedi].*
