# Full node ya Zebra iliyoimarishwa

- Hutumia mtumiaji maalum asiye na ruhusa za juu pamoja na uwekeaji kwenye sandbox wa systemd katika kiwango cha kernel (kutenga sawa na Docker).  
- RPC inaruhusiwa kwenye localhost pekee na hutumia uthibitishaji salama wa cookie (chaguomsingi na unaopendekezwa).  


---

## Mahitaji ya awali

- Usambazaji wowote unaotokana na Ubuntu
- Zana za ujenzi za Rust zimesakinishwa (`rustup` + `cargo`)
- Angalau GB 300 za nafasi ya diski zilizo huru (sehemu ya `/var`)


---

## Usanidi wa mara moja (Tekeleza kama mtumiaji wako wa kawaida)

### 1. Sasisha mfumo na usakinishe vitegemezi vya ujenzi

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Sasisha Rust na usakinishe zebrad ya hivi karibuni (7.0.0 au mpya zaidi)

NU7 imewashwa kwenye Mainnet katika block 3,543,405. Ni [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) na matoleo mapya zaidi pekee yanayofuata mnyororo baada ya urefu huo, kwa hivyo `zebrad` ya toleo la 6.x au la zamani zaidi imekwama kwenye kanuni za zamani. Ili kuijenga, unahitaji Rust 1.91 au mpya zaidi, ambayo `rustup update` husakinisha. Ikiwa unasasisha node iliyopo kutoka Zebra 6.x, hifadhi nakala ya `/var/lib/zebrad/state/v28` kwanza: Zebra 7 huihamishia kwenye umbizo jipya la hifadhidata la v29 inapoanza kwa mara ya kwanza, na 6.x haiwezi kuisoma baadaye.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Unda mtumiaji maalum wa zebra asiye na ruhusa za juu

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Unda saraka salama ya data

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` huhifadhi cookie ya uthibitishaji ya RPC. Huduma iliyo hapa chini inaweza kuandika kwenye saraka hizi mbili pekee, na systemd hukataa kuianzisha ikiwa mojawapo haipo.

## Unda usanidi salama (/etc/zebrad/zebrad.toml)

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

## Unda huduma ya systemd iliyoimarishwa kiusalama

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

Zebra huandika cookie mpya kila inapoanza; ni mtumiaji wa `zebra` pekee anayeweza kuisoma (mode 600), na huifuta huduma inaposimama. Isome kwa kutumia `sudo`, kama ilivyo hapa chini. Usiongeze mstari wa `ExecStartPost=` unaobadilisha mode ya cookie: unaweza kuendeshwa kabla ya zebrad kuandika cookie, na amri ya `ExecStartPost=` ikishindwa, huduma husimama.

## Matumizi ya kila siku - mtiririko wa kazi wa amri moja

| Kitendo                  | Amri                                      | Maelezo |
|-------------------------|----------------------------------------------|-------|
| **Anza**               | `sudo systemctl start zebrad`                | Amri moja |
| **Simamisha**                | `sudo systemctl stop zebrad`                 | Amri moja |
| **Hali**              | `sudo systemctl status zebrad`               | Huonyesha ikiwa inaendeshwa |
| **Kumbukumbu za moja kwa moja**           | `journalctl -u zebrad -f -o short-precise`  | Huchukua nafasi ya `screen -r` |
| **Pata cookie ya RPC**      | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Wakati tu inaendeshwa |

**Majina mbadala ya urahisi** (yaongeze kwenye `~/.bashrc` au `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
