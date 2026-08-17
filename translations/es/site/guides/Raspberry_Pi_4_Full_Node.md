# Ejecuta un Nodo Completo en una Raspberry Pi 4 (Zebra + Zallet)

*Migrado de la guía original basada en zcashd. zcashd alcanzó su detención automática de Fin de Soporte el 18 de julio de 2026, por lo que esta guía ahora usa **Zebra** (el nodo completo actual, mantenido por la Zcash Foundation) y **Zallet** (la wallet creada para reemplazar la wallet integrada de zcashd).*

## Lo que aprenderás
- Cómo grabar y configurar Ubuntu Server 22.04+ (64-bit) en una Raspberry Pi 4 para uso sin monitor ni periféricos
- Cómo instalar y ejecutar Zebra, ya sea mediante Docker o un binario precompilado
- Cómo instalar, configurar e inicializar Zallet, incluida la configuración del cifrado de la wallet
- Cómo migrar opcionalmente una configuración/wallet existente de zcashd a Zallet

## Qué cambió respecto de la guía anterior
La versión anterior de esta guía explicaba cómo compilar **zcashd** de forma nativa en una Pi 4 — una compilación de un solo hilo que tardaba entre 3 y 4 horas porque la Pi 4 no tiene memoria suficiente para una compilación paralela (`-j$(nproc)`). Tanto Zebra como Zallet ahora distribuyen **binarios oficiales precompilados para ARM64 e imágenes Docker**, así que en la mayoría de los casos ya no necesitas compilar nada desde el código fuente en la propia Pi.

## Requisitos previos
- Una Raspberry Pi 4 (se recomiendan 4 GB de RAM o más)
- Una tarjeta microSD (32 GB+) para el sistema operativo
- Un SSD/HDD externo con soporte USB 3.0 — **Zebra necesita aproximadamente 300 GB para los datos cacheados de Mainnet**, y esa cifra crecerá con el tiempo, así que no intentes ejecutarlo solo desde la tarjeta microSD
- Un ordenador con ranura para tarjeta microSD (para grabar la imagen del sistema operativo)
- Una conexión Ethernet por cable o Wi-Fi
- Comodidad básica con la línea de comandos por SSH

## Paso 1: Grabar Ubuntu Server 22.04+ (64-bit)
Los binarios precompilados y las imágenes Docker de Zebra y Zallet requieren **glibc 2.34+**, lo que significa **Ubuntu Server 22.04 o más reciente (64-bit/aarch64)**.

1. Instala Raspberry Pi Imager en tu ordenador principal.
2. Inserta tu tarjeta microSD.
3. Elige **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (o una versión más reciente).
4. Usa las opciones avanzadas de Imager (icono de engranaje) para preconfigurar el hostname, habilitar SSH y establecer las credenciales de Wi-Fi si es necesario, para un primer arranque sin monitor ni periféricos.
5. Graba la imagen, inserta la tarjeta y enciende la Pi.
6. Conéctate por SSH: `ssh <username>@<pi-hostname-or-ip>`

## Paso 2: Conectar y montar almacenamiento externo
1. Conecta tu SSD/HDD externo mediante USB 3.0.
2. Identifica el dispositivo: `lsblk`
3. Formátalo (si es nuevo) y móntalo, por ejemplo en `/mnt/zcash-data`, con una configuración estándar de `mkfs`/`fstab` para que se monte automáticamente al reiniciar.

## Paso 3: Actualizar el sistema
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Paso 4: Instalar y ejecutar Zebra
### Opción A — Docker (recomendado)
```bash
sudo apt install -y docker.io
sudo usermod -aG docker $USER   # log out/in after this
docker run -d \
  --name zebra \
  -p 8233:8233 \
  -v /mnt/zcash-data/zebra:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```
Comprueba el progreso: `docker logs -f zebra`

### Opción B — Binario precompilado mediante cargo binstall
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install cargo-binstall
cargo binstall zebrad
zebrad start
```
Esto instala un binario `aarch64` precompilado — no requiere compilación.

**Sobre el tiempo de sincronización:** espera que esto lleve un tiempo — las cifras de primera sincronización que suelen citarse (aproximadamente 2 horas) provienen de hardware de referencia más potente que la CPU de una Pi 4, por lo que tu tiempo real de sincronización en hardware Pi 4 probablemente será mayor.

## Paso 5: Instalar Zallet
Zallet está actualmente en **alpha** — espera cambios incompatibles, y no la trates todavía como una solución de custodia lista para producción para fondos significativos.

### Opción A — Docker (recomendado)
```bash
docker pull zodlinc/zallet:latest
```
Esta imagen es compatible con ARM64 (mediante una compilación basada en Nix) y se ejecuta desde un sistema de archivos mínimo y sin shell — pasa explícitamente la configuración y las rutas de datos mediante `--datadir` y montajes de volumen (ver el Paso 6).

### Opción B — Compilar desde el código fuente
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Los crates de Zallet aún no se publican en crates.io durante la fase alpha, por lo que instalarlo directamente desde el repositorio git es el método no Docker compatible.

## Paso 6: Configurar Zallet
Crea `zallet.toml` en el directorio de datos que elijas (por ejemplo `/mnt/zcash-data/zallet`):
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
Ajusta `validator_address` si Zebra se ejecuta en otro host/puerto, y configura `validator_cookie_auth`/`validator_user`/`validator_password` en `[indexer]` para que coincidan con tu configuración de autenticación RPC de Zebra.

**¿Migrando desde zcashd?** Si todavía tienes un `zcash.conf` antiguo:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Paso 7: Configurar el cifrado de la wallet
Zallet cifra todo el material de claves usando `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Esto imprime una clave pública y una frase de contraseña autogenerada — **guarda la frase de contraseña; no podrás recuperar el archivo de identidad sin ella.**

## Paso 8: Inicializar e iniciar la wallet
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Ejecuta `generate-mnemonic` solo una vez** a menos que quieras deliberadamente múltiples raíces de gasto independientes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Paso 9: Migrar una wallet existente de zcashd (opcional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Esto requiere la utilidad `db_dump` (compilada contra Berkeley DB 6.2.23) — desde una instalación del sistema o una compilación local de zcashd desde el código fuente. Si ya no tienes zcashd instalado, este es el único paso de migración que todavía no está completamente integrado en Zallet.

## Paso 10: Verificar que todo funciona
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirma que la wallet responde y, una vez que Zebra termine de sincronizar, que los saldos/direcciones coincidan con lo esperado.

## Solución de problemas
- **Problemas de compilación/ejecución de Zebra en ARM:** si compilas desde el código fuente, instala el toolchain ARM de Rust — ejecutar herramientas de compilación x86_64 en hardware ARM será notablemente más lento, según la propia documentación de Zebra.
- **El almacenamiento se está llenando:** la huella de ~300 GB de Zebra sigue creciendo — planifica espacio de sobra.
- **Errores de permisos de Docker:** cierra sesión y vuelve a entrar después de añadir tu usuario al grupo `docker`, o usa `sudo` mientras tanto.
- **El contenedor de Zallet no tiene shell:** la imagen oficial `zodlinc/zallet` es from-scratch por diseño — pasa siempre `--datadir` explícitamente y monta tu directorio de datos como volumen.

## Notas de hardware frente a la antigua guía de zcashd
Zebra y Zallet suelen ser más ligeros en CPU durante la configuración que compilar zcashd, ya que estás ejecutando binarios/contenedores precompilados. 4 GB de RAM es un punto de partida razonable; supervisa con `htop` y considera la variante Pi 4 de 8 GB si observas mucho swapping.

## Recursos adicionales
- [Libro de Zebra](https://zebra.zfnd.org) — documentación oficial de Zebra
- [Libro de Zallet](https://zcash.github.io/wallet) — documentación oficial de Zallet
- [Aviso de Fin de Soporte de zcashd](https://z.cash/support/zcashd-deprecation)

---

*Si esta guía te resultó útil, considera apoyar a ZecHub: [insert current ZecHub donation shielded address from zechub.wiki/donation — not included here since I couldn't verify it's still current].*
