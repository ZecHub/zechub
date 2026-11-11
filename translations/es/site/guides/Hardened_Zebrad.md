# Nodo completo [Full Node] reforzado de Zebra

- Usa un usuario dedicado sin privilegios y sandboxing de systemd a nivel de kernel (el mismo aislamiento que Docker).  
- RPC solo está disponible en localhost con autenticación segura mediante cookie (predeterminada y recomendada).  


---

## Requisitos previos

- Cualquier distribución basada en Ubuntu
- Cadena de herramientas de Rust instalada (`rustup` + `cargo`)
- Al menos 300 GB de espacio libre en disco (partición `/var`)


---

## Configuración única (Ejecutar como usuario normal)

### 1. Actualizar el sistema e instalar dependencias de compilación

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Actualizar Rust e instalar la última versión de zebrad (v4.3.0+)

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Crear un usuario dedicado sin privilegios para zebra

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Crear un directorio de datos seguro

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
```

## Crear una configuración segura (/etc/zebrad/zebrad.toml)

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

## Crear un servicio systemd reforzado

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

## Uso diario - Flujo de trabajo con un solo comando

| Acción                  | Comando                                      | Notas |
|-------------------------|----------------------------------------------|-------|
| **Iniciar**             | `sudo systemctl start zebrad`                | Un comando |
| **Detener**             | `sudo systemctl stop zebrad`                 | Un comando |
| **Estado**              | `sudo systemctl status zebrad`               | Muestra si está en ejecución |
| **Registros en vivo**   | `journalctl -u zebrad -f -o short-precise`  | Sustituye a `screen -r` |
| **Obtener cookie RPC**  | `sudo cat /var/lib/zebrad/.cookie`           | Solo mientras está en ejecución |

**Alias convenientes** (añadir a `~/.bashrc` o `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad/.cookie'
```
