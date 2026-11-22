<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zcash_Stack.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Zcash Stack: Ejecutar un servidor de billetera ligera en Kubernetes o Docker

[Zcash Stack](https://github.com/zecrocks/zcash-stack) es el kit de despliegue de código abierto del equipo detrás de zec.rocks. Agrupa un nodo completo de Zcash, un servidor de billetera ligera y extras opcionales (Zaino, un explorador de bloques, un servicio oculto de Tor, un servidor DNS, zecd, un proxy gRPC-web para billeteras en el navegador) en un chart de Helm para Kubernetes y en archivos Compose de Docker. Todos los servidores zec.rocks lightwalletd se ejecutan desde este chart. El proyecto está financiado por [Zcash Community Grants](https://zcashcommunitygrants.org/).

Esta página resume qué despliega el kit, qué necesitas antes de instalarlo y cuáles son los ajustes más importantes. Corresponde a la versión **0.4.9** del chart (publicada el 13 de noviembre de 2026). El [README del chart](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md) y las [notas del taller](https://github.com/zecrocks/zcash-stack/tree/main/docs) del propio proyecto son la referencia; léelos antes de ejecutar nada en producción.

## En resumen

- **Dos formas de empezar.** Un chart de Helm para Kubernetes (k3s en tu propio hardware NVMe es el objetivo principal; también funcionan GKE Standard y Autopilot) y archivos Compose de Docker para una sola máquina. El taller recomienda Docker si es la primera vez que ejecutas servidores y Kubernetes si ya administras flotas.
- **Un nodo de la red y un servidor de billetera ligera.** La configuración recomendada es Zebra + lightwalletd. Zakura puede reemplazar a Zebra como backend, y Zaino puede reemplazar a lightwalletd o ejecutarse junto a él.
- **Calcula unos 600 GiB de disco.** El estado de la red de Zebra ocupaba unos 260 GiB en junio de 2026 y sigue creciendo; la caché de la billetera ligera añade unos 17 GiB. Una sincronización completa tarda días, así que el chart puede restaurar desde una instantánea publicada.
- **El chart fija las versiones de las imágenes.** En la versión 0.4.9 son Zebra 7.0.0 (sigue a NU7), lightwalletd v0.6.1, Zakura 1.8.6 y Zaino 0.8.0. Actualiza el chart antes de las actualizaciones de red y antes de que una versión de Zakura llegue a su altura de fin de soporte.
- **Registra tu servidor.** Los operadores públicos pueden añadir su servidor al monitor [hosh.zec.rocks](https://hosh.zec.rocks/zec) para que las billeteras y los usuarios vean si está disponible.

## Qué se despliega

Cada componente se controla con un interruptor en [`values.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/values.yaml) del chart. Solo lightwalletd está activado de forma predeterminada y necesita un nodo de la red, así que los archivos de ejemplo también activan Zebra.

| Componente | Imagen en el chart 0.4.9 | Predeterminado | Función |
|:--|:--|:--|:--|
| Zebra | `zfnd/zebra:7.0.0` | desactivado (activado en los ejemplos) | Nodo completo; valida la red y ofrece RPC a los demás componentes |
| Zakura | `zakuracore/zakura:1.8.6` | desactivado | Bifurcación de Zebra; backend intercambiable con lightwalletd o Zaino en lugar de Zebra |
| lightwalletd | `electriccoinco/lightwalletd:v0.6.1` | activado | Servidor de billetera ligera (gRPC) para billeteras móviles y de escritorio |
| Zaino | `zingodevops/zaino:0.8.0-no-tls` | desactivado | Indexador de Rust que también sirve a billeteras ligeras |
| Explorador de bloques | `emersonian/zcash-explorer:v0.0.6` | desactivado | Explorador web que lee el JSON-RPC del nodo (Zaino no puede servirle de backend: solo ofrece gRPC) |
| Tor | `osminogin/tor-simple:0.4.9.16` | desactivado | Publica lightwalletd o Zaino como servicio de `.onion` |
| Servidor DNS | `zfnd/dnsseeder:v1.8.0` | desactivado | Ayuda a los nodos nuevos a encontrar pares |
| zecd | `ghcr.io/zecrocks/zecd:0.6.3` | desactivado | Servidor de billetera centrado en las transacciones blindadas (consulta [zecd](/zcash-tech/zecd)) |
| Proxy gRPC-web | `envoyproxy/envoy:v1.40.2` | desactivado | Permite que las billeteras del navegador se comuniquen con lightwalletd, al que los navegadores no pueden acceder mediante gRPC sin procesar |
| Billetera WebZjs | `ghcr.io/zecrocks/webzjs-wallet` | desactivado | Billetera de navegador; necesita que el proxy gRPC-web esté en el mismo host |

Dos notas sobre las versiones. La versión upstream de Zaino es [0.10.1](https://github.com/zingolabs/zaino/releases), mientras que el chart todavía incluye la imagen 0.8.0; consulta `values.yaml` antes de confiar en comportamientos más recientes de Zaino. Además, los nodos Zakura se detienen en Mainnet al alcanzar una altura de fin de soporte específica de cada versión: para la 1.8.6 es el bloque 3,643,309, alrededor del 5 de diciembre de 2026, y las compilaciones x86-64 desde la 1.8.0 no se inician en CPU sin BMI2 y ADX. La página de [Zakura Node](/zcash-tech/zakura-node) explica ambos casos.

## Kubernetes: antes de instalar

El chart se despliega sobre tres elementos que debes configurar una vez por clúster.

1. **Un controlador de entrada.** El chart crea un recurso Kubernetes `Ingress` estándar y usa de forma predeterminada la clase `nginx`; se recomienda ingress-nginx porque gestiona gRPC de la misma manera en k3s y GKE. En k3s, instala k3s con `--disable traefik` o conserva Traefik y configura `ingress.className: traefik` más `ingress.backendProtocol: GRPC` (el chart genera entonces un recurso Traefik `IngressRoute`, porque un Ingress normal a través de Traefik devuelve un error HTTP 500 con gRPC). En GKE, la clase de entrada integrada `gce` no puede dirigir gRPC a lightwalletd ni a Zaino.
2. **cert-manager y un ClusterIssuer** para obtener certificados automáticos de Let's Encrypt (`examples/cluster-issuer.yaml`; primero prueba con el emisor de staging). En GKE Autopilot, instala cert-manager con `--set global.leaderElection.namespace=cert-manager` o la creación del emisor fallará con un error x509 «unknown authority». Puedes omitir cert-manager y apuntar `<service>.ingress.tls.secretName` a tu propio certificado.
3. **Un StorageClass.** `local-path` funciona bien en k3s con NVMe. En GKE, asigna a Zebra una clase IOPS aprovisionada (el repositorio incluye un ejemplo con Hyperdisk) y aumenta primero la cuota regional de disco: los proyectos nuevos de GKE solo permiten 500 GB de SSD y 500 GB de Hyperdisk por región, y un nodo de la red necesita entre 300 y 500 GB. De lo contrario, el volumen se queda en `Pending` con `QUOTA_EXCEEDED`. No se puede cambiar `storageClassName` en un StatefulSet existente sin volver a crear el volumen.

Después, configura un registro DNS para cada nombre de host, apuntándolo a la IP externa del controlador de entrada. Si todavía no tienes DNS, incluye un nombre [sslip.io](https://sslip.io), como `203-0-113-7.sslip.io`, junto a tu nombre de host real: resuelve a partir de la IP incluida en el nombre, así que el certificado se emite de inmediato. Para los servidores permanentes, conserva tu propio nombre de host como principal.

## Kubernetes: instalación

```bash
helm repo add zcash https://zecrocks.github.io/zcash-stack
helm repo update
# copy an example from the repo's examples/ folder, set your hostnames and RPC credentials, then:
helm install zcash zcash/zcash-stack -f examples/zebra-mainnet.yaml
```

El ejemplo [`zebra-mainnet.yaml`](https://github.com/zecrocks/zcash-stack/blob/main/examples/zebra-mainnet.yaml) activa Zebra, conecta lightwalletd a este, asigna una caché de 40 GiB a lightwalletd y configura una entrada TLS; además, mantiene el RPC del nodo dentro del clúster. Cambia el nombre de usuario y la contraseña RPC de ejemplo antes de instalar. Otros ejemplos cubren testnet, GKE, GKE Autopilot con alta disponibilidad, un servicio oculto de Tor y la configuración inicial con sslip.io.

Para actualizar, ejecuta `helm repo update`, revisa los cambios con el complemento helm-diff (`helm diff upgrade zcash zcash/zcash-stack -f values.yaml`) y luego ejecuta `helm upgrade` con los mismos argumentos. Si vienes de un chart 0.0.x, lee primero [MIGRATION.md](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/MIGRATION.md): la versión 0.1.0 sustituyó la configuración anterior de Traefik por Ingress estándar y cert-manager, y cambió la estructura de los valores.

## Dimensionamiento

| | Estado normal | Sincronización inicial | Disco |
|:--|:--|:--|:--|
| Zebra | ~0.1 vCPU, 1.6 GiB | Alto consumo de CPU, IOPS y memoria | ~260 GiB (junio de 2026) y sigue creciendo; valor predeterminado del chart: 500 GiB |
| lightwalletd | ~0.15 vCPU, 165 MiB | Construye la caché bloque a bloque | ~17 GiB; valor predeterminado del chart: 40 GiB |

La pila completa solicita unos 1.5 vCPU y 4.5 GiB de memoria. Para una sola máquina, el chart recomienda 8 vCPU, 32 GiB de RAM y aproximadamente 1 TB de NVMe (en GKE, una instancia `n2-standard-8` con un volumen Hyperdisk o pd-ssd de 500 GiB). Las solicitudes predeterminadas ya cumplen los mínimos de GKE Autopilot, y los límites de CPU quedan desactivados para permitir picos durante la sincronización.

## Ajustes importantes

**Restauración desde una instantánea.** Configura `<chain>.initSnapshot.enabled: true` (con `initSnapshot.url`, `gs://` o `https://`) para empezar desde una instantánea publicada en lugar de sincronizar desde el bloque génesis. La restauración registra su progreso, reanuda correctamente las descargas interrumpidas y nunca borra un volumen sano de una instalación anterior. Una instantánea supone confiar en una fuente: los bloques posteriores siguen validándose, y una instantánea incorrecta se manifiesta en bloques que no superan la validación. Según el taller, una sincronización desde cero tarda unos 10 días y empezar desde una instantánea, unas 10 horas.

**Escalabilidad y cero tiempo de inactividad.** lightwalletd y Zaino son cachés ligeras delante del nodo, así que ejecuta `replicas: 2` para aplicar actualizaciones graduales sin tiempo de inactividad (se añade automáticamente un PodDisruptionBudget cuando hay más de una réplica). Los nodos de la red no están pensados para repartir carga: cada réplica es otro nodo completo, con su propio volumen y su propia sincronización. Ejecuta uno o dos si necesitas redundancia.

**Pares entrantes.** De forma predeterminada, Zebra solo establece conexiones salientes. `zebra.p2pPublic.enabled: true` acepta pares entrantes en el puerto 8233 (18233 en testnet) y anuncia tu dirección; elige `externalAddrFrom: hostIP` en bare metal y k3s, `nodeExternalIP` en nubes donde la IP propia del nodo es privada, o `loadBalancer` con una IP estática reservada en GKE Autopilot.

**TLS y gRPC.** TLS termina en el controlador de entrada y dentro del clúster se usa HTTP/2 sin cifrar, así que varios nombres de host pueden apuntar a un mismo lightwalletd. Mantén `path: /` junto con `pathType: Prefix`, porque las rutas de los métodos gRPC lo necesitan. Si el primer certificado falla por la redirección HTTPS, emítelo con el emisor de staging o configura temporalmente `ingress.tls.sslRedirect: "false"`.

**Servicio oculto de Tor.** Es útil cuando tu clúster no tiene una IP pública ni un dominio:

```yaml
tor:
  enabled: true
  targetService: zaino   # or lightwalletd
  hiddenServicePort: 443
```

Consulta la dirección con `kubectl exec -it tor-0 -- cat /var/lib/tor/hidden_service/hostname` y pruébala a través de un cliente Tor local con [zecping](https://github.com/zecrocks/zecping): `./zecping -socks localhost:9150 -addr <address>.onion:443`.

**Durante las actualizaciones de red.** Zebra puede prohibir la conexión de pares que sigan usando versiones antiguas y detenerse, con un registro que indica que las actualizaciones de la red se han detenido. La lista de bloqueos se guarda en memoria, así que `kubectl delete pod zebra-0` la borra; el pod vuelve a iniciarse con los mismos datos de la red, sin volver a sincronizar.

## Docker Compose

Para una sola máquina, clona el repositorio e inicia el archivo predeterminado desde la carpeta `docker/`:

```bash
git clone https://github.com/zecrocks/zcash-stack.git
cd zcash-stack/docker
docker compose up --detach
docker compose logs --follow
```

`compose.yaml` ejecuta Zebra, lightwalletd y [Watchtower](https://containrrr.dev/watchtower/) en x86; `compose.arm.yaml` hace lo mismo en hosts ARM. Watchtower descarga automáticamente las imágenes nuevas, y el archivo predeterminado usa la etiqueta `zfnd/zebra:latest`, así que el nodo sigue las nuevas versiones de Zebra sin actualizaciones manuales. `compose.zaino.yaml` sustituye lightwalletd por Zaino, pero fija una imagen comunitaria antigua (`emersonian/zcash-zaino:0.1.2-zr4`), así que revísala antes de usarla. Otros archivos añaden una interfaz TLS de Caddy, un proxy VPS y un túnel autossh para nodos domésticos.

Configura `LIGHTWALLETD_DONATION_ADDRESS` en el archivo `.env` con tu propia dirección unificada para publicarla como dirección de donaciones del servidor. Ejecutar `./download-snapshot.sh` desde la carpeta `docker/` antes del primer `docker compose up` descarga una instantánea de la red en lugar de sincronizar desde cero.

## Conexión y monitorización

La segunda clase del taller explica cómo exponer el servidor: con una IP estática pública, ocultando la IP de tu casa detrás de un túnel SSH a un VPS o de Tailscale Funnel, o con un servidor exclusivo para Tor. Comprueba el resultado apuntando una billetera al servidor (en ZODL, Advanced Settings; consulta [Cambiar el servidor en tu billetera](/zcash-tech/lightwallet-nodes)) o llamando a `GetLightdInfo` con un cliente gRPC.

Para monitorizar, la tercera clase enumera los comandos manuales de Docker y sugiere registrar un servidor público con [hosh](https://hosh.zec.rocks/zec), el monitor de disponibilidad de zec.rocks. Para registrarlo, hay que enviar una solicitud de incorporación de cambios que añada el nombre de host y el puerto a la lista de servidores de hosh. Puedes pedir ayuda con cualquier paso en el [zec.rocksforo de talleres](https://workshops.zec.rocks).

## Errores comunes

**Instalar lightwalletd sin un nodo de la red.** lightwalletd lee de Zebra (o de Zakura). Activa uno o empieza con un archivo de ejemplo que ya lo haga.

**Dejar las credenciales RPC de ejemplo.** Los ejemplos incluyen valores provisionales. El RPC permanece dentro del clúster, pero cámbialos igualmente.

**Ejecutar un nodo de la red con la cuota de disco predeterminada de GKE.** El volumen nunca se vincula. Aumenta la cuota regional antes de instalar.

**Aumentar Zebra para repartir la carga.** Cada réplica de Zebra requiere una sincronización completa adicional. En su lugar, escala lightwalletd o Zaino.

**Mantener un chart antiguo durante una actualización de red.** Un nodo anterior a una actualización deja de seguir Mainnet cuando esta se activa (Zebra necesita la versión 7.0.0 o posterior desde NU7). Ejecuta `helm repo update` y actualiza el chart antes de las alturas de activación y de las alturas de fin de soporte de Zakura.

## Páginas relacionadas

- [Zcash Nodos Lightwallet](/zcash-tech/lightwallet-nodes): qué puede y qué no puede ver un servidor de billetera ligera, y servidores públicos.
- [Zebra Nodo completo](/zcash-tech/zebra-full-node): el validador que ejecuta esta pila.
- [Zakura Nodo](/zcash-tech/zakura-node): la bifurcación de Zebra que puede ejecutar el chart.
- [Zaino](/zcash-tech/zaino): el indexador de Rust.
- [zecd](/zcash-tech/zecd): el servidor de billetera que puede añadir el chart.
- [Zcash RPC e indexación de nodos](/guides/zcash-node-rpc-and-indexing): RPC de Zebra, Zallet e indexadores.
- [Cómo ejecutar Zebra en la red Akash](/guides/akash-network-zebra): otra forma de alojar un nodo.

## Recursos

- [zecrocks/zcash-stack](https://github.com/zecrocks/zcash-stack) (repositorio, versiones y ejemplos)
- [Zcash Stack README del chart Helm](https://github.com/zecrocks/zcash-stack/blob/main/charts/zcash-stack/README.md)
- [Notas del taller: sincronizar, conectar, observar](https://github.com/zecrocks/zcash-stack/tree/main/docs)
- [Docker README](https://github.com/zecrocks/zcash-stack/blob/main/docker/README.md)
- [Listado de Artifact Hub](https://artifacthub.io/packages/search?repo=zcash)
- [hosh.zec.rocks](https://hosh.zec.rocks/zec) (monitor público de servidores)

**Última actualización:** noviembre de 2026 (chart 0.4.9)
