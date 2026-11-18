# Hardened Zebra Tam Düğüm

- Özel, ayrıcalıksız bir kullanıcı ve çekirdek düzeyinde systemd yalıtımı kullanır (Docker ile aynı yalıtım).
- RPC yalnızca localhost üzerinden, güvenli çerez kimlik doğrulamasıyla kullanılabilir (varsayılan ve önerilen).

---

## Ön Koşullar

- Ubuntu tabanlı herhangi bir dağıtım
- Rust araç zinciri kurulu olmalı (`rustup` + `cargo`)
- En az 300 GB boş disk alanı (`/var` bölümü)

---

## Tek Seferlik Kurulum (normal kullanıcınız olarak çalıştırın)

### 1. Sistemi güncelleyin ve derleme bağımlılıklarını yükleyin

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust'i güncelleyin ve en son zebrad sürümünü yükleyin (7.0.0 veya üzeri)

NU7, Mainnet'te 3.543.405 numaralı blokta etkinleştirildi. Bu blok yüksekliğinden sonraki zinciri yalnızca [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ve sonraki sürümler takip eder; bu nedenle 6.x veya daha eski bir `zebrad` eski kurallarda takılı kalır. Derlemek için `rustup update` tarafından yüklenen Rust 1.91 veya üzeri gerekir. Mevcut bir düğümü Zebra 6.x sürümünden yükseltiyorsanız önce `/var/lib/zebrad/state/v28` yedeğini alın: Zebra 7, ilk başlatmada veritabanını yeni v29 biçimine geçirir ve 6.x sonrasında bu veritabanını okuyamaz.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Ayrıcalıksız özel zebra kullanıcısını oluşturun

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Güvenli veri dizinini oluşturun

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc`, RPC kimlik doğrulama çerezini tutar. Aşağıdaki hizmet yalnızca bu iki dizine yazabilir ve bu dizinlerden biri eksikse systemd hizmetin başlamasını engeller.

## Güvenli yapılandırmayı oluşturun (/etc/zebrad/zebrad.toml)

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"
# Peer cache. The default, ~/.cache/zebra, isn't writable by this service
cache_dir = "/var/lib/zebrad"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # the default, shown to be explicit
# Without this line the cookie goes to ~/.cache/zebra, which this service can't write to,
# and zebrad stops at startup with "Zebra must be able to write the auth cookie to the disk"
cookie_dir = "/var/lib/zebrad-rpc"
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## Güçlendirilmiş systemd hizmetini oluşturun

```
sudo tee /etc/systemd/system/zebrad.service > /dev/null <<EOF
[Unit]
Description=Zebra Zcash Full Node (zebrad)
After=network.target

[Service]
Type=simple
User=zebra
Group=zebra
ExecStart=/usr/local/bin/zebrad --config /etc/zebrad/zebrad.toml start

UMask=0027

# Kernel-level sandboxing (makes native zebrad as isolated as Docker)
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
PrivateDevices=yes
NoNewPrivileges=yes
RestrictAddressFamilies=AF_INET AF_INET6
RestrictNamespaces=yes
MemoryDenyWriteExecute=yes
ReadWritePaths=/var/lib/zebrad /var/lib/zebrad-rpc

LimitNOFILE=65535
Restart=on-failure
RestartSec=5s
EOF

sudo systemctl daemon-reload
```

Zebra, her başlatıldığında yalnızca `zebra` kullanıcısının okuyabildiği (izin modu 600) yeni bir çerez oluşturur ve durduğunda çerezi siler. Aşağıda gösterildiği gibi çerezi `sudo` ile okuyun. Çerezin izin modunu değiştiren bir `ExecStartPost=` satırı eklemeyin: bu satır, zebrad çerezi yazmadan önce çalışabilir ve başarısız bir `ExecStartPost=` komutu hizmeti durdurur.

## Günlük Kullanım - Tek Komutlu İş Akışı

| İşlem                  | Komut                                      | Notlar |
|-------------------------|----------------------------------------------|-------|
| **Başlat**              | `sudo systemctl start zebrad`                | Tek komut |
| **Durdur**              | `sudo systemctl stop zebrad`                 | Tek komut |
| **Durum**               | `sudo systemctl status zebrad`               | Çalışıp çalışmadığını gösterir |
| **Canlı günlükler**      | `journalctl -u zebrad -f -o short-precise`  | `screen -r` yerine geçer |
| **RPC çerezini al**     | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Yalnızca çalışırken |

**Kullanışlı takma adlar** (`~/.bashrc` veya `~/.zshrc` dosyasına ekleyin):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
