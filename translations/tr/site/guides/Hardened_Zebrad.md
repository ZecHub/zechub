# Güvenliği Sıkılaştırılmış Zebra Tam Düğümü

- Ayrı bir ayrıcalıksız kullanıcı + çekirdek seviyesinde systemd sandboxing (Docker ile aynı izolasyon).  
- RPC yalnızca localhost için, güvenli çerez kimlik doğrulama (varsayılan ve önerilen).


---

## Ön Gereksinimler

- Herhangi bir Ubuntu tabanlı dağıtım
- Rust araç zinciri kurulu (`rustup` + `cargo`)
- En az 300 GB boş disk alanı (`/var` bölümü)

---

## Tek Seferlik Kurulum (Normal kullanıcı olarak çalıştırın)

### 1. Sistemi güncelleyin & derleme bağımlılıklarını kurun

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust'ı güncelleyin ve en son zebrad (7.0.0 veya daha yeni) kurun

NU7, Mainnet'te blok 3.543.405'te etkin. Sadece [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) ve sonrası bu yükseklikten sonra zinciri takip eder, bu yüzden 6.x veya daha eski `zebrad` eski kurallarda takılı kalır. Derlemek için Rust 1.91 veya yeni sürüm gerekir, bu `rustup update` kurar. Mevcut bir düğümü Zebra 6.x'den yükseltiyorsanız önce `/var/lib/zebrad/state/v28` yedekleyin: Zebra 7, ilk başlatmada yeni v29 veritabanı formatına taşır, 6.x ise sonrasında okuyamaz.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Ayrıcalıksız zebra kullanıcısı oluşturun

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```

## Güvenli veri dizini oluşturun

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` RPC kimlik doğrulama çerezini tutar. Aşağıdaki servis yalnızca bu iki dizine yazabilir, ve systemd bunlardan biri eksikse başlatmayı reddeder.

## Güvenli yapılandırma (/etc/zebrad/zebrad.toml) oluşturun

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

## Güvenliği sıkılaştırılmış systemd servisi oluşturun

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

Zebra her başlatıldığında yeni bir çerez oluşturur, yalnızca `zebra` kullanıcısı tarafından okunabilir (mod 600), ve durduğunda siler. Aşağıdaki gibi `sudo` ile okuyun. Çerezin modunu değiştiren bir `ExecStartPost=` satırı eklemeyin: bu, zebrad çerezi yazmadan önce çalışabilir, ve başarısız bir `ExecStartPost=` komutu hizmeti durdurur.

## Günlük Kullanım - Tek Komut İş Akışı

| Eylem                  | Komut                                      | Notlar |
|------------------------|--------------------------------------------|--------|
| **Başlat**             | `sudo systemctl start zebrad`                                      | Tek komut |
| **Dur**                | `sudo systemctl stop zebrad`                                      | Tek komut |
| **Durum**              | `sudo systemctl status zebrad`                                      | Çalışıyor mu gösterir |
| **Canlı günlükler**    | `journalctl -u zebrad -f -o short-precise`                                      | `screen -r` yerine geçer |
| **RPC çerezi al**      | `sudo cat /var/lib/zebrad-rpc/.cookie`                                      | Yalnızca çalışırken |

**Kullanışlı takma adlar** (`~/.bashrc` veya `~/.zshrc`'ye ekleyin):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
