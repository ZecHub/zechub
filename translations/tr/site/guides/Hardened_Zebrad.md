# Güçlendirilmiş Zebra Tam Düğümü

- Ayrıcalıksız özel bir kullanıcı + çekirdek düzeyinde systemd sandboxing kullanır (Docker ile aynı izolasyon).  
- RPC yalnızca localhost üzerindedir ve güvenli cookie kimlik doğrulaması kullanır (varsayılan ve önerilen).  


---

## Ön Koşullar

- Ubuntu tabanlı herhangi bir dağıtım
- Rust toolchain kurulu (`rustup` + `cargo`)
- En az 300 GB boş disk alanı (`/var` bölümü)


---

## Tek Seferlik Kurulum (Normal kullanıcınızla çalıştırın)

### 1. Sistemi güncelleyin ve derleme bağımlılıklarını kurun

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Rust'ı güncelleyin ve en güncel zebrad sürümünü kurun (v4.3.0+)

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
```

## Güvenli yapılandırmayı oluşturun (/etc/zebrad/zebrad.toml)

```
sudo mkdir -p /etc/zebrad
sudo tee /etc/zebrad/zebrad.toml > /dev/null <<EOF
[network]
network = "Mainnet"
listen_addr = "0.0.0.0:8233"

[state]
cache_dir = "/var/lib/zebrad"

[rpc]
# Enable RPC on localhost only (never expose to the internet!)
listen_addr = "127.0.0.1:8232"

# Cookie authentication 
enable_cookie_auth = true     # ← uncomment to be explicit
EOF

sudo chown zebra:zebra /etc/zebrad/zebrad.toml
sudo chmod 600 /etc/zebrad/zebrad.toml
```

## Güçlendirilmiş systemd servisini oluşturun

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
ExecStartPost=/bin/chmod 750 /var/lib/zebrad-rpc
ExecStartPost=/bin/chmod 640 /var/lib/zebrad-rpc/.cookie

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

## Günlük Kullanım - Tek Komutlu İş Akışı

| Eylem | Komut | Notlar |
|-------------------------|----------------------------------------------|-------|
| **Başlat**               | `sudo systemctl start zebrad`                | Tek komut |
| **Durdur**                | `sudo systemctl stop zebrad`                 | Tek komut |
| **Durum**              | `sudo systemctl status zebrad`               | Çalışıp çalışmadığını gösterir |
| **Canlı günlükler**           | `journalctl -u zebrad -f -o short-precise`  | `screen -r` yerine geçer |
| **RPC cookie al**      | `sudo cat /var/lib/zebrad/.cookie`           | Yalnızca çalışırken |

**Kolaylık sağlayan alias'lar** (`~/.bashrc` veya `~/.zshrc` dosyasına ekleyin):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
