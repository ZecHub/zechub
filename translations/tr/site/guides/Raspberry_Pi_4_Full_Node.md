# Raspberry Pi 4’te Tam Düğüm Çalıştırma (Zebra + Zallet)

*Orijinal zcashd tabanlı kılavuzdan taşınmıştır. zcashd, 18 Temmuz 2026’da otomatik Destek Sonu durdurmasına ulaştı; bu nedenle bu kılavuz artık **Zebra** (Zcash Foundation tarafından sürdürülen güncel tam düğüm) ve **Zallet** (zcashd'nin yerleşik cüzdanının yerine geçen cüzdan) kullanıyor.*

## Neler öğreneceksiniz
- Raspberry Pi 4’te başsız kullanım için Ubuntu Server 22.04+ (64 bit) nasıl yazılır ve yapılandırılır
- Docker aracılığıyla veya önceden derlenmiş bir ikili dosyayla Zebra nasıl kurulur ve çalıştırılır
- Cüzdan şifrelemesi kurulumu da dahil olmak üzere Zallet nasıl kurulur, yapılandırılır ve başlatılır
- Mevcut bir zcashd yapılandırmasının/cüzdanının isteğe bağlı olarak Zallet'ye nasıl taşınacağı

## Eski kılavuzdan neler değişti
Bu kılavuzun önceki sürümünde **zcashd** doğrudan Pi 4 üzerinde derleniyordu — Pi 4’ün paralel (`-j$(nproc)`) derleme için yeterli belleği olmadığından tek iş parçacıklı derleme 3–4 saat sürüyordu. Zebra ve Zallet artık her ikisi de **resmî, önceden derlenmiş ARM64 ikili dosyaları ve Docker imajları** sunuyor; bu nedenle çoğu durumda artık Pi’nin kendisinde kaynak koddan derleme yapmanız gerekmiyor.

## Gereksinimler
- Raspberry Pi 4 (4 GB veya üzeri RAM önerilir)
- İşletim sistemi için bir microSD kart (32 GB+)
- USB 3.0 destekli harici SSD/HDD — **Zebra, önbelleğe alınmış Mainnet verileri için yaklaşık 300 GB alan gerektirir** ve bu alan zamanla artar; bu nedenle yalnızca microSD karttan çalıştırmayı denemeyin
- İşletim sistemi imajını yazmak için microSD kart yuvası olan bir bilgisayar
- Kablolu Ethernet bağlantısı veya Wi-Fi
- SSH üzerinden komut satırını temel düzeyde kullanabilme

## Adım 1: Ubuntu Server 22.04+ (64 bit) imajını yazın
Zebra ve Zallet'nin önceden derlenmiş ikili dosyaları ve Docker imajları **glibc 2.34+** gerektirir; bu da **Ubuntu Server 22.04 veya daha yenisinin (64 bit/aarch64)** gerekli olduğu anlamına gelir.

1. Ana bilgisayarınıza Raspberry Pi Imager’ı yükleyin.
2. microSD kartınızı takın.
3. **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (veya daha yenisini) seçin.
4. Başsız ilk açılış için Imager’ın gelişmiş seçeneklerini (dişli simgesi) kullanarak ana bilgisayar adını önceden yapılandırın, SSH’yi etkinleştirin ve gerekirse Wi-Fi kimlik bilgilerini ayarlayın.
5. İmajı yazın, kartı takın ve Pi’yi açın.
6. SSH ile bağlanın: `ssh <username>@<pi-hostname-or-ip>`

## Adım 2: Harici depolamayı bağlayın ve bağlama noktasına bağlayın
1. Harici SSD/HDD’nizi USB 3.0 üzerinden bağlayın.
2. Aygıtı belirleyin: `lsblk`
3. Yeni ise biçimlendirin ve örneğin `/mnt/zcash-data` konumuna, yeniden başlatmada otomatik bağlanmasını sağlayacak standart bir `mkfs`/`fstab` düzeniyle bağlayın.

## Adım 3: Sistemi güncelleyin
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Adım 4: Zebra'i kurun ve çalıştırın
### Seçenek A — Docker (önerilen)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
İlerlemeyi kontrol edin: `docker logs -f zebra`

### Seçenek B — cargo binstall aracılığıyla önceden derlenmiş ikili dosya
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Bu işlem, önceden derlenmiş bir `aarch64` ikili dosyası yükler — derleme gerekmez.

**Eşitleme süresi hakkında:** Bunun biraz zaman almasını bekleyin — sıkça belirtilen ilk eşitleme süreleri (yaklaşık 2 saat), Pi 4’ün CPU’sundan daha güçlü referans donanımlardan alınmıştır; bu nedenle gerçek Pi 4 donanımındaki eşitleme süreniz muhtemelen daha uzun olacaktır.

## Adım 5: Zallet'i kurun
Zallet şu anda **alfa** aşamasındadır — geriye dönük uyumluluğu bozan değişiklikler bekleyin ve henüz önemli miktarda fon için üretime hazır bir gözetim çözümü olarak değerlendirmeyin.

### Seçenek A — Docker (önerilen)
```bash
docker pull zodlinc/zallet:latest
```
Bu imaj ARM64’ü (Nix tabanlı bir derleme aracılığıyla) destekler ve kabuksuz, minimal bir dosya sisteminde çalışır — yapılandırma ve veri yollarını `--datadir` ve birim bağlamaları aracılığıyla açıkça belirtin (bkz. Adım 6).

### Seçenek B — Kaynak koddan derleme
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Alfa aşamasında Zallet'in crate’leri henüz crates.io’da yayımlanmadığından, doğrudan git deposundan kurulum, Docker dışındaki desteklenen yöntemdir.

## Adım 6: Zallet'i yapılandırın
Seçtiğiniz veri dizininde (ör. `/mnt/zcash-data/zallet`) `zallet.toml` oluşturun:
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
validator_address = "127.0.0.1:8232"   # Zebra's JSON-RPC endpoint
[keystore]
[note_management]
[rpc]
bind = ["127.0.0.1:SOMEPORT"]
```
Zebra farklı bir ana bilgisayarda/bağlantı noktasında çalışıyorsa `validator_address`'yı ayarlayın; Zebra RPC kimlik doğrulama düzeninizle eşleşmesi için `[indexer]` altındaki `validator_cookie_auth`/`validator_user`/`validator_password` ayarlarını yapılandırın.

**zcashd'den mi taşıyorsunuz?** Elinizde hâlâ eski bir `zcash.conf` varsa:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Adım 7: Cüzdan şifrelemesini ayarlayın
Zallet, tüm anahtar materyalini `age`/`rage` kullanarak şifreler:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Bu işlem bir açık anahtar ve otomatik oluşturulmuş bir parola yazdırır — **parolayı kaydedin; parola olmadan kimlik dosyasını kurtaramazsınız.**

## Adım 8: Cüzdanı başlatın ve çalıştırın
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
Birden fazla bağımsız harcama kökü oluşturmayı bilerek istemediğiniz sürece `generate-mnemonic` komutunu **yalnızca bir kez** çalıştırın.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Adım 9: Mevcut bir zcashd cüzdanını taşıma (isteğe bağlı)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Bunun için `db_dump` yardımcı programı gerekir (Berkeley DB 6.2.23’e karşı derlenmiş) — sistem kurulumundan veya zcashd'in yerel kaynak kod derlemesinden. zcashd artık kurulu değilse, bu henüz Zallet içinde tamamen kendi kendine yeterli olmayan tek taşıma adımıdır.

## Adım 10: Her şeyin çalıştığını doğrulayın
```bash
zallet -d /mnt/zcash-data/zallet help
```
Cüzdanın yanıt verdiğini ve Zebra eşitlemeyi tamamladığında bakiyelerin/adreslerin beklentilerinizle eşleştiğini doğrulayın.

## Sorun giderme
- **ARM’de Zebra derleme/çalışma zamanı sorunları:** Kaynak koddan derleme yapıyorsanız Rust ARM araç zincirini kurun — Zebra'in kendi belgelerine göre, ARM donanımında x86_64 derleme araçlarını çalıştırmak gözle görülür biçimde daha yavaştır.
- **Depolama alanının dolması:** Zebra'in yaklaşık 300 GB’lık kapladığı alan artmaya devam eder — yeterli ek alan planlayın.
- **Docker izin hataları:** Kullanıcınızı `docker` grubuna ekledikten sonra oturumu kapatıp yeniden açın veya bu arada `sudo` kullanın.
- **Zallet kapsayıcısında kabuk yok:** Resmî `zodlinc/zallet` imajı tasarım gereği sıfırdan oluşturulmuştur — `--datadir` değerini her zaman açıkça belirtin ve veri dizininizi bir birim olarak bağlayın.

## Eski zcashd kılavuzuna kıyasla donanım notları
Zebra ve Zallet, önceden derlenmiş ikili dosyaları/kapsayıcıları çalıştırdığınız için kurulum sırasında genellikle zcashd derlemeye kıyasla daha az CPU kullanır. 4 GB RAM makul bir başlangıç noktasıdır; `htop` ile izleyin ve yoğun takas belleği kullanımı görürseniz 8 GB Pi 4 modelini değerlendirin.

## Ek kaynaklar
- [Zebra Book](https://zebra.zfnd.org) — resmî Zebra belgeleri
- [Zallet Book](https://zcash.github.io/zallet/) — resmî Zallet belgeleri
- [zcashd Destek Sonu bildirimi](https://z.cash/support/zcashd-deprecation)

---

*Bu kılavuzu faydalı bulduysanız ZecHub'i desteklemeyi düşünebilirsiniz: [zecHub.wiki/donation adresindeki güncel ZecHub bağış korumalı adresini buraya ekleyin — hâlâ güncel olduğunu doğrulayamadığım için burada yer almıyor].*
