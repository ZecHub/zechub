# Nó integral Zebra reforçado

- Usa um usuário dedicado sem privilégios + sandboxing do systemd em nível de kernel (o mesmo isolamento do Docker).  
- O RPC é acessível apenas via localhost, com autenticação segura por cookie (padrão e recomendado).  


---

## Pré-requisitos

- Qualquer distro baseada em Ubuntu
- Toolchain do Rust instalada (`rustup` + `cargo`)
- Pelo menos 300 GB de espaço livre em disco (partição `/var`)


---

## Configuração única (execute como seu usuário normal)

### 1. Atualize o sistema e instale as dependências de compilação

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Atualize o Rust e instale o zebrad mais recente (7.0.0 ou mais novo)

O NU7 foi ativado na Mainnet no bloco 3.543.405. Somente o [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) e versões posteriores seguem a chain após essa altura, então um `zebrad` 6.x ou mais antigo fica preso nas regras antigas. Para compilá-lo, é necessário o Rust 1.91 ou mais novo, que o `rustup update` instala. Se você estiver atualizando um nó existente a partir do Zebra 6.x, faça primeiro um backup de `/var/lib/zebrad/state/v28`: o Zebra 7 o converte para o novo formato de banco de dados v29 na primeira inicialização, e a versão 6.x não consegue mais lê-lo depois disso.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Crie um usuário zebra dedicado sem privilégios

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Crie um diretório de dados seguro

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` guarda o cookie de autenticação RPC. O serviço abaixo só pode gravar nesses dois diretórios, e o systemd se recusa a iniciá-lo se algum deles estiver faltando.

## Crie uma configuração segura (/etc/zebrad/zebrad.toml)

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

## Crie um serviço systemd reforçado

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

O Zebra grava um novo cookie toda vez que é iniciado, legível apenas pelo usuário `zebra` (modo 600), e o apaga quando é parado. Leia-o com `sudo`, como mostrado abaixo. Não adicione uma linha `ExecStartPost=` que altere o modo do cookie: ela pode ser executada antes de o zebrad ter gravado o cookie, e um comando `ExecStartPost=` que falha interrompe o serviço.

## Uso diário: fluxo de trabalho com um único comando

| Ação                    | Comando                                      | Observações |
|-------------------------|----------------------------------------------|-------|
| **Iniciar**             | `sudo systemctl start zebrad`                | Um comando |
| **Parar**               | `sudo systemctl stop zebrad`                 | Um comando |
| **Status**              | `sudo systemctl status zebrad`               | Mostra se está em execução |
| **Logs ao vivo**        | `journalctl -u zebrad -f -o short-precise`  | Substitui `screen -r` |
| **Obter cookie RPC**    | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Somente durante a execução |

**Aliases práticos** (adicione a `~/.bashrc` ou `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
