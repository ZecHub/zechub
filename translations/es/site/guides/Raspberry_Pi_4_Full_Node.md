# Ejecuta un nodo completo [Full Node] en una Raspberry Pi 4 (Zebra + Zallet)

*Migrado de la guía original basada en zcashd. zcashd llegó a su interrupción automática por fin de soporte el 18 de julio de 2026, por lo que esta guía ahora utiliza **Zebra** (el nodo completo actual, mantenido por Zcash Foundation) y **Zallet** (la billetera [wallet] creada para reemplazar la billetera integrada de zcashd).*

## Lo que aprenderás
- Cómo instalar y configurar Ubuntu Server 22.04+ (64 bits) en una Raspberry Pi 4 para uso sin pantalla [headless]
- Cómo instalar y ejecutar Zebra, ya sea mediante Docker o un binario precompilado
- Cómo instalar, configurar e inicializar Zallet, incluida la configuración del cifrado [encryption] de la billetera
- Cómo migrar opcionalmente una configuración/billetera existente de zcashd a Zallet

## Qué cambió respecto a la guía anterior
La versión anterior de esta guía explicaba cómo compilar **zcashd** de forma nativa en una Pi 4: una compilación de un solo hilo que tardaba 3–4 horas porque la Pi 4 no tiene suficiente memoria para una compilación paralela (`-j$(nproc)`). Zebra y Zallet ahora ofrecen **binarios ARM64 precompilados e imágenes de Docker oficiales**, por lo que en la mayoría de los casos ya no necesitas compilar nada desde el código fuente en la propia Pi.

## Requisitos previos
- Una Raspberry Pi 4 (se recomiendan 4 GB de RAM o más)
- Una tarjeta microSD (32 GB+) para el sistema operativo
- Un SSD/HDD externo con compatibilidad con USB 3.0: **Zebra necesita aproximadamente 300 GB para los datos almacenados en caché de Mainnet**, una cifra que crece con el tiempo, así que no intentes ejecutarlo únicamente desde la tarjeta microSD
- Un ordenador con una ranura para tarjeta microSD (para instalar la imagen del sistema operativo)
- Una conexión Ethernet por cable o Wi-Fi
- Conocimientos básicos de la línea de comandos mediante SSH

## Paso 1: Instala Ubuntu Server 22.04+ (64 bits)
Los binarios precompilados y las imágenes de Zebra y Zallet de Docker requieren **glibc 2.34+**, lo que significa **Ubuntu Server 22.04 o una versión más reciente (64 bits/aarch64)**.

1. Instala Raspberry Pi Imager en tu ordenador principal.
2. Inserta tu tarjeta microSD.
3. Elige **Other general-purpose OS → Ubuntu → Ubuntu Server 22.04 LTS (64-bit)** (o una versión más reciente).
4. Utiliza las opciones avanzadas de Imager (el icono de engranaje) para preconfigurar el nombre de host, habilitar SSH y establecer las credenciales de Wi-Fi si es necesario, para un primer arranque sin pantalla.
5. Escribe la imagen, inserta la tarjeta y enciende la Pi.
6. Conéctate mediante SSH: `ssh <username>@<pi-hostname-or-ip>`

## Paso 2: Conecta y monta el almacenamiento externo
1. Conecta tu SSD/HDD externo mediante USB 3.0.
2. Identifica el dispositivo: `lsblk`
3. Formátalo (si es nuevo) y móntalo, por ejemplo, en `/mnt/zcash-data`, con una configuración estándar de `mkfs`/`fstab` para que se monte automáticamente al reiniciar.

## Paso 3: Actualiza el sistema
```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Paso 4: Instala y ejecuta Zebra
### Opción A — Docker (recomendada)
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
Esto instala un binario `aarch64` precompilado; no se requiere compilación.

**Sobre el tiempo de sincronización:** espera que esto tarde un tiempo; las cifras comúnmente citadas para la primera sincronización (aproximadamente 2 horas) proceden de hardware de referencia más potente que la CPU de una Pi 4, por lo que tu tiempo real de sincronización en hardware Pi 4 probablemente será mayor.

## Paso 5: Instala Zallet
Zallet se encuentra actualmente en fase **alpha**: espera cambios incompatibles y no lo consideres todavía una custodia lista para producción de fondos significativos.

### Opción A — Docker (recomendada)
```bash
docker pull zodlinc/zallet:latest
```
Esta imagen es compatible con ARM64 (mediante una compilación basada en Nix) y se ejecuta desde un sistema de archivos mínimo sin shell: proporciona explícitamente las rutas de configuración y datos mediante `--datadir` y montajes de volúmenes (consulta el paso 6).

### Opción B — Compilar desde el código fuente
```bash
# Requires Rust 1.85+ (see Step 4B for rustup install)
sudo apt install -y clang libclang-dev protobuf-compiler
cargo install --locked --git https://github.com/zcash/wallet.git
```
Los crates de Zallet aún no se publican en crates.io durante la fase alpha, por lo que instalar directamente desde el repositorio git es el método compatible que no utiliza Docker.

## Paso 6: Configura Zallet
Crea `zallet.toml` en el directorio de datos que hayas elegido (por ejemplo, `/mnt/zcash-data/zallet`):
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
Ajusta `validator_address` si Zebra se ejecuta en un host/puerto distinto, y configura `validator_cookie_auth`/`validator_user`/`validator_password` en `[indexer]` para que coincidan con tu configuración de autenticación RPC de Zebra.

**¿Migras desde zcashd?** Si aún tienes un `zcash.conf` antiguo:
```bash
zallet migrate-zcash-conf --datadir /path/to/old/zcashd/datadir -o /mnt/zcash-data/zallet/zallet.toml
```

## Paso 7: Configura el cifrado de la billetera
Zallet cifra todo el material de claves mediante `age`/`rage`:
```bash
cargo install rage
rage -p -o /mnt/zcash-data/zallet/encryption-identity.txt <(rage-keygen)
```
Esto imprime una clave pública y una frase de contraseña generada automáticamente: **guarda la frase de contraseña; no podrás recuperar el archivo de identidad sin ella.**

## Paso 8: Inicializa e inicia la billetera
```bash
zallet -d /mnt/zcash-data/zallet init-wallet-encryption
zallet -d /mnt/zcash-data/zallet generate-mnemonic
```
**Ejecuta `generate-mnemonic` solo una vez**, a menos que quieras deliberadamente múltiples raíces de gasto independientes.

```bash
zallet -d /mnt/zcash-data/zallet start
```

## Paso 9: Migra una billetera zcashd existente (opcional)
```bash
zallet -d /mnt/zcash-data/zallet migrate-zcashd-wallet --zcashd-datadir /path/to/old/zcashd/datadir
```
Esto requiere la utilidad `db_dump` (compilada con Berkeley DB 6.2.23), procedente de una instalación del sistema o de una compilación local desde el código fuente de zcashd. Si ya no tienes zcashd instalado, este es el único paso de migración que aún no es completamente autónomo en Zallet.

## Paso 10: Verifica que todo funcione
```bash
zallet -d /mnt/zcash-data/zallet help
```
Confirma que la billetera responda y, una vez que Zebra termine de sincronizarse, que los saldos/direcciones [addresses] coincidan con lo esperado.

## Solución de problemas
- **Problemas de compilación/ejecución de Zebra en ARM:** Si compilas desde el código fuente, instala la cadena de herramientas ARM de Rust; ejecutar herramientas de compilación x86_64 en hardware ARM será notablemente más lento, según la propia documentación de Zebra.
- **El almacenamiento se está llenando:** La huella de aproximadamente 300 GB de Zebra sigue creciendo; planifica espacio adicional.
- **Errores de permisos de Docker:** Cierra sesión y vuelve a iniciarla después de añadir tu usuario al grupo `docker`, o utiliza `sudo` mientras tanto.
- **El contenedor Zallet no tiene shell:** La imagen oficial de `zodlinc/zallet` está diseñada desde cero: proporciona siempre `--datadir` explícitamente y monta tu directorio de datos como volumen.

## Notas sobre el hardware frente a la antigua guía de zcashd
Zebra y Zallet suelen exigir menos CPU durante la configuración que compilar zcashd, ya que ejecutas binarios/contenedores precompilados. 4 GB de RAM son un punto de partida razonable; supervisa con `htop` y considera la variante Pi 4 de 8 GB si observas un uso intensivo de swap.

## Recursos adicionales
- [Zebra Book](https://zebra.zfnd.org) — documentación oficial de Zebra
- [Zallet Book](https://zcash.github.io/zallet/) — documentación oficial de Zallet
- [zcashd Aviso de fin de soporte](https://z.cash/support/zcashd-deprecation)

---

*Si esta guía te resultó útil, considera apoyar a ZecHub: [Inserta la dirección de donación blindada [shielded] actual de ZecHub desde zechub.wiki/donation; no se incluye aquí porque no pude verificar que siga vigente.*
