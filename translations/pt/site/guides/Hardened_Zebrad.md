# Nó integral Zebra reforçado

- Usa um usuário dedicado sem privilégios + sandboxing `systemd` no nível do kernel (o mesmo isolamento do Docker).  
- O RPC é somente no localhost com autenticação segura por cookie (padrão e recomendada).  


---

## Pré-requisitos

- qualquer distribuição baseada em Ubuntu
- toolchain Rust instalado (`rustup` + `cargo`)
- Pelo menos 300 GB de espaço livre em disco (partição `/var`)


---

## Configuração única (execute como seu usuário normal)

### 1. Atualizar o sistema e instalar as dependências de compilação

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Atualizar o Rust e instalar o zebrad mais recente (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Criar usuário zebra dedicado sem privilégios

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Criar diretório de dados seguro

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Criar configuração segura (/etc/zebrad/zebrad.toml)

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

## Criar serviço systemd reforçado

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

## Uso diário - Fluxo de trabalho com um único comando

| Action                    | Comando                                      | Notas |
|-------------------------|----------------------------------------------|-------|
| **Start**               | `sudo systemctl start zebrad`                | Um comando |
| **Stop**                | `sudo systemctl stop zebrad`                 | Um comando |
| **Status**              | `sudo systemctl status zebrad`               | Mostra se está em execução |
| **Live logs**           | `journalctl -u zebrad -f -o short-precise`  | Substitui `screen -r` |
| **Get RPC cookie**      | `sudo cat /var/lib/zebrad/.cookie`           | Apenas enquanto estiver em execução |

**Aliases de conveniência** (adicione ao `~/.bashrc` ou `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
