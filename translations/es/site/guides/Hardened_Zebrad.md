# Nodo completo Zebra reforzado

- Usa un usuario dedicado sin privilegios y aislamiento de systemd a nivel del kernel (el mismo aislamiento que Docker).  
- RPC solo en localhost con autenticación mediante cookie segura (opción predeterminada y recomendada).  


---

## Requisitos previos

- Cualquier distribución basada en Ubuntu
- Toolchain de Rust instalado (`rustup` + `cargo`)
- Al menos 300 GB de espacio libre en disco (partición `/var`)


---

## Configuración inicial (ejecutar como usuario normal)

### 1. Actualizar el sistema e instalar las dependencias de compilación

```
sudo apt update && sudo apt install -y build-essential pkg-config libclang-dev clang libssl-dev protobuf-compiler
```

## Actualizar Rust e instalar la versión más reciente de zebrad (7.0.0 o posterior)

NU7 se activó en Mainnet en el bloque 3,543,405. Solo [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) y las versiones posteriores siguen la red después de esa altura, así que un `zebrad` 6.x o anterior queda atascado en las reglas antiguas. Para compilarlo se necesita Rust 1.91 o posterior, que `rustup update` instala. Si vas a actualizar un nodo existente desde Zebra 6.x, primero haz una copia de seguridad de `/var/lib/zebrad/state/v28`: Zebra 7 lo convierte al nuevo formato de base de datos v29 durante el primer inicio, y después 6.x ya no puede leerlo.

```
rustup update
cargo install --locked --force zebrad
sudo cp ~/.cargo/bin/zebrad /usr/local/bin/zebrad
sudo chown root:root /usr/local/bin/zebrad
sudo chmod 755 /usr/local/bin/zebrad
zebrad --version
```

## Crear un usuario zebra dedicado sin privilegios

```
sudo adduser --system --group --no-create-home --shell /usr/sbin/nologin zebra
```


## Crear un directorio de datos seguro

```
sudo mkdir -p /var/lib/zebrad
sudo chown zebra:zebra /var/lib/zebrad
sudo chmod 700 /var/lib/zebrad
sudo mkdir -p /var/lib/zebrad-rpc
sudo chown zebra:zebra /var/lib/zebrad-rpc
sudo chmod 750 /var/lib/zebrad-rpc
```

`/var/lib/zebrad-rpc` guarda la cookie de autenticación RPC. El servicio de abajo solo puede escribir en estos dos directorios, y systemd se niega a iniciarlo si falta alguno de ellos.

## Crear una configuración segura (/etc/zebrad/zebrad.toml)

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

## Crear un servicio de systemd reforzado

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

Zebra escribe una cookie nueva cada vez que se inicia, que solo puede leer el usuario `zebra` (modo 600), y la elimina cuando se detiene. Léela con `sudo`, como se muestra abajo. No añadas una línea `ExecStartPost=` que cambie el modo de la cookie: puede ejecutarse antes de que zebrad haya escrito la cookie, y un comando `ExecStartPost=` fallido detiene el servicio.

## Uso diario: flujo de trabajo con un solo comando

| Acción                  | Comando                                      | Notas |
|-------------------------|----------------------------------------------|-------|
| **Iniciar**             | `sudo systemctl start zebrad`                | Un comando |
| **Detener**             | `sudo systemctl stop zebrad`                 | Un comando |
| **Estado**              | `sudo systemctl status zebrad`               | Muestra si está en ejecución |
| **Registros en vivo**    | `journalctl -u zebrad -f -o short-precise`  | Sustituye a `screen -r` |
| **Obtener cookie RPC**  | `sudo cat /var/lib/zebrad-rpc/.cookie`           | Solo mientras está en ejecución |

**Alias prácticos** (añádelos a `~/.bashrc` o `~/.zshrc`):
```
alias zebra-start='sudo systemctl start zebrad'
alias zebra-stop='sudo systemctl stop zebrad'
alias zebra-status='sudo systemctl status zebrad'
alias zebra-logs='journalctl -u zebrad -f'
alias zebra-cookie='sudo cat /var/lib/zebrad-rpc/.cookie'
```
