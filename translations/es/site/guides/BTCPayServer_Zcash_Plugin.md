# BTCPay Server con soporte para Zcash: guía completa de instalación e integración

BTCPay Server permite a los negocios en línea aceptar pagos con criptomonedas directamente, sin intermediarios ni custodios. Esta guía te acompaña a través del proceso completo para configurar BTCPay Server con soporte nativo para pagos blindados de Zcash.

> Esta documentación se centra en integrar Zcash en tu instancia de BTCPay Server.  
> Admite tanto configuraciones con **nodo completo (Zebra)** como configuraciones **basadas en lightwalletd**.

---

## Tabla de contenidos

- [Por qué usar BTCPay Server con Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Cómo funciona BTCPay Server](#How-BTCPay-Server-Works)
- [¿Dónde se almacenan los fondos? ¿Quién controla las claves privadas?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Cómo configurar BTCPay Server para aceptar Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Desplegar BTCPay Server con soporte para Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Ejecutar tu propio nodo completo de Zcash (Zebra + Lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Conectarse a un nodo externo de lightwalletd (configuración personalizada)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Alojar BTCPay Server en casa con Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configurar el plugin de Zcash en la interfaz web de BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Integrar BTCPay Server con tu sitio web](#Integrating-BTCPay-Server-with-Your-Website)
  - [Integración mediante API](#API-Integration)
    - [Generar una clave API](#Generating-an-API-Key)
    - [Ejemplo: crear una factura mediante API](#Example-Creating-an-Invoice-via-API)
    - [Configurar un webhook](#Setting-Up-a-Webhook-Optional)
  - [Integración con CMS](#CMS-Integration)
  - [Botón de pago o Iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Conclusión](#Conclusion)
- [Recursos](#Resources)


---

## Por qué usar BTCPay Server con Zcash

El comercio en línea acepta cada vez más criptomonedas. Es rápido, global y funciona sin bancos. Esto beneficia tanto a comerciantes como a clientes. Pero hay un detalle importante que muchos pasan por alto.

Al realizar un pedido, el cliente normalmente proporciona información personal: nombre, dirección de envío y número de teléfono. Si el pago se hace usando una blockchain pública, como Bitcoin, Ethereum o stablecoins en Ethereum o Tron, la transacción queda permanentemente visible para su análisis.

Cualquiera, incluso sin saber qué se pidió, puede:

- ver cuándo y cuánto se pagó  
- rastrear de dónde vinieron los fondos y a dónde fueron  
- vincular una dirección de criptomoneda con una persona real si existe algún punto de correlación (por ejemplo, un correo filtrado o un nombre de envío)

Esto significa que una sola compra puede revelar todo el historial financiero de un cliente.

Y también funciona al revés. Si la dirección de un comerciante alguna vez ha aparecido on-chain, queda expuesto. Competidores y observadores externos pueden rastrear volúmenes de pago, actividad con proveedores y la estructura de los flujos del negocio.

### La combinación de BTCPay Server y Zcash puede resolver esto.


BTCPay Server es un sistema gratuito y descentralizado para recibir pagos con criptomonedas.  
No es un intermediario de pagos y no retiene fondos. Todos los pagos van directamente a la wallet del comerciante.  
Puede ser una wallet personal o una configuración multisig dentro de una organización.

El servidor se encarga de tareas de coordinación:

- genera una dirección única para cada pedido  
- rastrea cuándo se recibe el pago y lo vincula al pedido  
- emite recibos y notificaciones  
- proporciona una interfaz de pago para el cliente  

Todo funciona bajo el control del propietario de la tienda, sin depender de servicios de terceros.

Zcash es una criptomoneda construida sobre pruebas de conocimiento cero. Admite un modelo de transacciones totalmente privado.  
Al usar direcciones blindadas (en adelante llamadas simplemente “direcciones”), el remitente, el destinatario y el importe de la transacción no se revelan en la blockchain.

Para las tiendas en línea, esto significa:

- El comprador puede completar el pago sin revelar su historial financiero  
- El vendedor recibe el pago sin exponer su dirección, volumen de ventas ni estructura de transacciones  
- Ningún observador externo puede vincular el pago con el pedido o con los datos del cliente

### Ejemplo práctico

Un usuario realiza un pedido y selecciona Bitcoin o USDT como método de pago.  
El sitio web genera una dirección de pago y muestra el importe.  
Después de que se realiza el pago, esta dirección queda almacenada en la blockchain y se vuelve pública.  
Un atacante solo necesita vincular un pedido con la dirección para obtener visibilidad a largo plazo sobre todo su historial de transacciones.

Ahora imagina la misma situación con Zcash.  
BTCPay Server genera una dirección blindada. El comprador envía el pago.  
Desde la perspectiva de la blockchain, no ocurre nada. No hay datos públicos que analizar.  
El servidor recibe la confirmación, la vincula al pedido y completa el proceso.

Para cualquier persona externa, parece que no ocurrió nada.  
Toda la lógica permanece entre la tienda y el cliente, como debe ser.

Esta solución no compromete la automatización ni la usabilidad.  
Todo funciona igual que con otras criptomonedas, solo que sin el riesgo de fugas de datos.



## Cómo funciona BTCPay Server

BTCPay Server actúa como un puente de procesamiento de pagos entre tu plataforma de comercio electrónico y la blockchain. Así es como funciona el flujo:

1. **El cliente realiza un pedido** en tu sitio web (por ejemplo, WooCommerce, Magento o cualquier plataforma con integración de BTCPay).

2. **La tienda solicita una factura de pago** a BTCPay Server. El servidor genera una factura única con:
   - El importe del pedido
   - Un temporizador de cuenta regresiva
   - Una Zcash Unified Address (UA) - por ejemplo, `u1...` - que incluye un receptor Orchard (blindado) por defecto.

3. **El cliente ve la página de pago** y envía ZEC a la dirección proporcionada.

4. **BTCPay Server supervisa la blockchain**, comprobando el pago frente a:
   - El importe esperado
   - La dirección de recepción
   - La marca de tiempo de la factura

5. **Una vez que la transacción es detectada y confirmada**, BTCPay notifica a la tienda.

6. **El cliente recibe una confirmación de pago.** Opcionalmente, el servidor puede enviar un recibo por correo electrónico.

Todo este proceso ocurre **automáticamente**, sin intermediarios ni custodios.  
BTCPay Server **no retiene fondos**; simplemente conecta el sistema de pedidos con la blockchain de forma segura y privada.
## ¿Dónde se almacenan los fondos? ¿Quién controla las claves privadas?

BTCPay Server **no** es una wallet y **no requiere claves privadas**.  
Todos los fondos van **directamente** a la wallet del comerciante. La seguridad se garantiza mediante una **arquitectura basada en viewing key**.

### Cómo funciona

- **La wallet se crea con antelación.**  
  El comerciante usa una wallet de Zcash que admita viewing keys, como [YWallet](https://ywallet.app/installation) o [Zingo! Wallet](https://zingolabs.org/).  
  Hay una lista completa disponible en [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server se conecta mediante una viewing key.**  
  Una viewing key es una **clave de solo lectura**: puede detectar pagos entrantes y generar nuevas direcciones de recepción,  
  pero no puede gastar fondos. El servidor no almacena seed phrases ni claves privadas.

- **Se accede a los datos de la blockchain a través de un servidor `lightwalletd`.**  
  Puedes usar un nodo público como `https://zec.rocks`, o ejecutar tu propia pila `Zebra + lightwalletd` para una soberanía total.

- **Cada pedido recibe una dirección única.**  
  Las viewing keys permiten al servidor derivar nuevas direcciones blindadas de Zcash para cada factura,  
  lo que posibilita un seguimiento seguro de los pagos y evita la reutilización de direcciones.

- **Conservas el control total de los fondos.**  
  Incluso si el servidor se ve comprometido, nadie podrá robar tu dinero; solo podrían quedar expuestos metadatos de pago.

Este diseño separa la **infraestructura** del **control de los activos**.  
Puedes actualizar, migrar o reinstalar BTCPay Server sin poner ningún fondo en riesgo.

## Cómo configurar BTCPay Server para aceptar Zcash

En las secciones anteriores explicamos cómo funciona BTCPay Server con Zcash y por qué es importante para los pagos que preservan la privacidad. Ahora es momento de pasar a la práctica.

Tu configuración exacta dependerá de varios factores:

- ¿Ya tienes una instancia de BTCPay Server?
- ¿Quieres usar un lightwalletd público o ejecutar tu propio nodo completo?
- ¿El servidor se ejecutará en un VPS o en casa?

Este capítulo cubre todos los escenarios de configuración actuales, desde configuraciones mínimas hasta despliegues totalmente soberanos.

Recorreremos lo siguiente:

- Cómo desplegar todo desde cero en un VPS, incluido el nodo completo (Zebra)
- Cómo ejecutar BTCPay Server en casa manteniendo oculta tu IP mediante **Cloudflare Tunnel**
- Cómo habilitar y configurar el soporte para Zcash dentro de la interfaz web de BTCPay Server
- Cómo integrar BTCPay con tu sitio web o tienda en línea


## Desplegar BTCPay Server con soporte para Zcash

Pasemos a la configuración real. En esta sección instalaremos BTCPay Server con soporte para Zcash, ya sea en un VPS nuevo o añadiendo soporte para ZEC a una instancia existente.

Si ya tienes BTCPay Server en funcionamiento (por ejemplo, para BTC o Lightning), no necesitas reinstalarlo todo: solo habilita el plugin de ZEC.

Recorreremos varias configuraciones, desde montajes mínimos usando un nodo público `lightwalletd` hasta instalaciones completamente soberanas con tu propio nodo completo.  
La mejor opción depende de la ubicación de tu servidor y del nivel de independencia que quieras tener respecto a infraestructura externa.

> Documentación oficial del plugin:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Advertencia: una wallet por instancia:**  
> El plugin de Zcash usa **una wallet compartida** entre **todas las tiendas** de la instancia de BTCPay.  
> Si alojas varias tiendas independientes en una sola instancia, compartirán la misma wallet de Zcash.  
> Usa instancias separadas si necesitas un aislamiento estricto de wallets.

---

### Configuración recomendada de VPS

Antes de instalar, asegúrate de tener:

- Un VPS con **Ubuntu 22.04+**
- Un nombre de dominio apuntando a la dirección IP de tu servidor (mediante DNS)
- `git`, `docker` y `docker-compose` instalados
- Acceso SSH al servidor

---

## Preparar tu servidor (parte oculta)

<details>
  <summary>Haz clic para desplegar</summary>

Para desplegar BTCPay Server con soporte para Zcash, necesitarás lo siguiente:

### 1. VPS con Ubuntu 22.04 o más reciente

Recomendamos usar una instalación mínima de **Ubuntu Server 22.04 LTS**.  
Cualquier proveedor de VPS que ofrezca una dirección IP dedicada servirá.  

**Requisitos mínimos**:  
- 2 núcleos de CPU  
- 4 GB de RAM  
- 40 GB de espacio en disco  

Esta configuración es suficiente si usas lightwalletd para Zcash.  
Si planeas ejecutar un **nodo completo de Zcash**, necesitarás **al menos 300 GB** de espacio libre en disco.

---

### 2. Nombre de dominio apuntando a tu servidor

En el panel de tu proveedor DNS, crea un registro `A` para un subdominio  
(por ejemplo, `btcpay.example.com`) que apunte a la dirección IP de tu VPS.  

Este dominio se usará para acceder a BTCPay Server desde el navegador  
y para generar automáticamente un **certificado SSL gratuito** mediante Let's Encrypt.

---

### 3. Acceso SSH al servidor

Para instalar BTCPay Server, debes conectarte a tu VPS mediante SSH.  
Desde tu terminal, ejecuta:

`ssh root@YOUR_SERVER_IP`

Si usas macOS, Linux o WSL en Windows, SSH ya está disponible en la terminal.
En Windows sin WSL, usa un cliente SSH como **PuTTY**.

---

### 4. Instalar Git, Docker y Docker Compose

Una vez conectado por SSH, actualiza los paquetes del sistema e instala los componentes requeridos:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> En Ubuntu 22.04 y versiones posteriores, `docker-compose` desde APT está obsoleto.
> El paquete recomendado es `docker-compose-plugin`, que proporciona el comando `docker compose` (observa el espacio en lugar del guion).

Tu entorno de servidor ya está listo para instalar BTCPay Server.

</details>

---

### Paso 1: clonar el repositorio

Crea un directorio de trabajo y descarga el despliegue Docker de BTCPay Server:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Paso 2: exportar variables de entorno

Sustituye `btcpay.example.com` por tu dominio real:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Si planeas añadir Monero o Litecoin más adelante, puedes incluirlos ahora:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Puedes añadir nuevas monedas en cualquier momento exportando las variables apropiadas y volviendo a ejecutar el script de configuración:

`. ./btcpay-setup.sh -i`

Para esta guía, nos centraremos solo en **Zcash**.

---

### Paso 3: ejecutar el instalador

Ejecuta el script de configuración para compilar e iniciar el servidor:

`. ./btcpay-setup.sh -i`

El script instalará dependencias, generará el `docker-compose.yml`, iniciará los servicios y configurará `systemd`.
Esto tarda aproximadamente 5 minutos.

Una vez completado, tu instancia de BTCPay Server estará disponible en:

`https://btcpay.example.com`

> Si estás modificando una instalación existente (por ejemplo, añadiendo ZEC), asegúrate de detener y reiniciar el servidor con la nueva configuración:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

Luego continúa con la siguiente sección para configurar Zcash en la interfaz web de BTCPay Server.



## Ejecutar tu propio nodo completo de Zcash

Si prefieres **no** depender de nodos públicos `lightwalletd`, puedes desplegar tu propio nodo completo de Zcash junto con Lightwalletd en el mismo servidor.  
Esto te da **autonomía total**: sin dependencias externas y sin necesidad de confiar en terceros.

---

### Paso 1: asegurarse de tener suficiente espacio en disco

Un nodo completo de Zcash (Zebra + Lightwalletd) requiere actualmente **más de 300 GB** de espacio en disco, y sigue creciendo.

Desglose:

- La base de datos de la blockchain de Zebra: ~260-270 GB
- La indexación de Lightwalletd: ~15-20 GB

#### Almacenamiento recomendado:

- **400 GB+** si el servidor se usa **solo** para pagos con Zcash
- **800 GB+** si el servidor también ejecuta BTCPay Server, PostgreSQL, Nginx, etc.

> Lo ideal es usar un disco SSD/NVMe con **1 TB de capacidad**, especialmente si no planeas podar los datos con regularidad.

---

### Paso 2: establecer variables de entorno

Añade lo siguiente a tu configuración de entorno para activar la configuración de nodo completo:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Esto incluirá el fragmento `zcash-fullnode`, que inicia tanto `zebrad` como `lightwalletd` dentro de BTCPay Server.

---

### Paso 3: volver a ejecutar el instalador

`. ./btcpay-setup.sh -i`

El script:

* Descargará las imágenes Docker para Zebra y Lightwalletd
* Configurará los servicios dentro de la pila de BTCPay
* Vinculará el plugin de Zcash con la instancia **local** de `lightwalletd`

> **La sincronización completa de la blockchain puede tardar varios días**, especialmente en VPS con pocos recursos.
> Hasta que la sincronización se complete, los pagos blindados no estarán disponibles.


## Conectarse a un nodo externo de Lightwalletd

En la mayoría de los casos, no se requiere autonomía total, y puede que los comerciantes no quieran dedicar tiempo y espacio en disco a ejecutar un nodo completo de Zcash.  
Por defecto, BTCPay Server se conecta a un nodo público `lightwalletd` para gestionar pagos blindados sin descargar toda la blockchain.

El endpoint por defecto es:

`https://zec.rocks:443`

Sin embargo, puedes configurar BTCPay Server para conectarse a **cualquier nodo externo `lightwalletd`**, como por ejemplo:

`https://lightwalletd.example:443`

Esta sección muestra cómo hacerlo usando un **fragmento Docker personalizado**.

> Hay un ejemplo de configuración completo con todas las variables de entorno disponible en el [repositorio del plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Los pasos a continuación muestran una configuración mínima funcional.

---

### Paso 1: crear un fragmento Docker personalizado

En tu directorio del proyecto BTCPayServer, crea un archivo de fragmento personalizado:

```
cd ~/BTCPayServer/btcpayserver-docker
mkdir -p docker-compose-generator/docker-fragments
nano docker-compose-generator/docker-fragments/zcash-lightwalletd.custom.yml
```

Añade el siguiente contenido:

```
exclusive:
- zcash
```

La directiva `exclusive` garantiza que solo un fragmento con la misma etiqueta (`zcash` en este caso) pueda estar activo al mismo tiempo.
Esto evita conflictos de configuración; por ejemplo, no puedes ejecutar simultáneamente el fragmento `zcash-fullnode` y este fragmento personalizado externo de `lightwalletd`.
Al marcarlo como `exclusive: zcash`, BTCPay Server desactivará automáticamente los contenedores por defecto `zcash-fullnode` y `lightwalletd` internos, permitiéndote conectarte en su lugar a tu propio nodo externo.

---

### Paso 2: establecer variables de entorno

En la terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Paso 3: definir la dirección del nodo externo

Abre tu archivo `.env`:

`nano .env`

Añade la siguiente línea, sustituyendo la URL por el endpoint elegido:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Puedes usar:

* Un **nodo público**, como `https://lightwalletd.zcash-infra.com`
* Tu propio nodo autoalojado, desplegado por separado de BTCPay Server

> Si el `lightwalletd` externo deja de estar disponible o se sobrecarga, los pagos blindados fallarán.
> Para servicios críticos, elige un **endpoint estable y probado** (como el predeterminado `zec.rocks`).

> ¿Quieres autoalojar `lightwalletd`?
> Puedes usar el `docker-compose.lwd.yml` del [repositorio de Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Advertencia:** Esta configuración no está documentada oficialmente y requiere configuración manual de TLS, reenvío de puertos y configuración del firewall; se recomienda solo para usuarios avanzados.

---

### Paso 4: volver a ejecutar el instalador

`. ./btcpay-setup.sh -i`

BTCPay Server aplicará tu configuración personalizada y se conectará al nodo `lightwalletd` especificado.

A partir de ese momento, el plugin de Zcash usará ese endpoint externo para gestionar transacciones blindadas.


## Alojar BTCPay Server en casa con Cloudflare Tunnel

¿Quieres aceptar pagos en Zcash alojando BTCPay Server en un dispositivo doméstico, como una Raspberry Pi 5 o cualquier servidor local **sin IP estática**?  
Puedes exponer de forma segura tu instancia a internet usando **Cloudflare Tunnel**.

Este método evita el port forwarding y oculta tu dirección IP real al público, al tiempo que mantiene tu servidor accesible mediante HTTPS.

También te ayuda a **evitar el coste de alquilar un VPS**, lo cual es ideal si los pagos con criptomonedas son una función opcional y no el núcleo de tu negocio.

---

### Paso 1: instalar Cloudflare Tunnel

1. Crea una cuenta en [cloudflare.com](https://www.cloudflare.com) y añade tu dominio.
2. En tu **servidor doméstico**, instala Cloudflare Tunnel:

```
sudo apt update
sudo apt install cloudflared --legacy
```

3. Autentícate con Cloudflare:

`cloudflared tunnel login`

Este comando abrirá una ventana del navegador. Inicia sesión y autoriza el acceso a tu dominio.
Cloudflare creará automáticamente un archivo `credentials` con un token en tu servidor.

4. Crea un nuevo túnel (puedes llamarlo `btcpay` o como prefieras):

`cloudflared tunnel create btcpay`

Esto genera un archivo `btcpay.json` que contiene el ID del túnel y las credenciales; lo necesitarás en el siguiente paso.

---

### Paso 2: crear el archivo de configuración del túnel

Crea el directorio de configuración (si no existe) y abre el archivo de configuración:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Pega la siguiente configuración:

```
tunnel: btcpay    # nombre de tu túnel
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # tu dominio
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explicación:

* `tunnel` - nombre del túnel que creaste antes
* `credentials-file` - ruta al archivo de token generado durante `cloudflared tunnel login`
* `hostname` - tu dominio registrado en Cloudflare (por ejemplo, `btcpay.example.com`)
* `service` - dirección local de tu BTCPay Server (normalmente `http://127.0.0.1:80` para Nginx)

> Cloudflare hará de proxy del tráfico de forma segura hacia tu servidor local, sin exponer la IP de tu casa.


### Paso 3: añadir un registro DNS para tu túnel

Después de crear el túnel, Cloudflare normalmente **añadirá automáticamente un registro DNS CNAME** para tu dominio. Debería verse así:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Si no aparece automáticamente, añádelo manualmente:

1. Ve a tu [panel de Cloudflare](https://dash.cloudflare.com/)
2. Navega hasta la sección **DNS**
3. Añade un nuevo registro CNAME:
   - **Name**: `btcpay`
   - **Target**: `<UUID>.cfargotunnel.com`  
     Puedes encontrar el valor exacto en tu archivo `btcpay.json` o ejecutando:
     
     `cloudflared tunnel list`
     
   - **Proxy status**: Enabled (nube naranja)

> Este registro garantiza que todas las solicitudes a `btcpay.example.com` se enruten a través de Cloudflare Tunnel, ocultando tu dirección IP real al público.

---

### Paso 4: habilitar el túnel al iniciar el sistema

Para que el túnel se ejecute automáticamente al arrancar, instálalo como servicio del sistema:

`sudo cloudflared service install`

Luego habilita e inicia el servicio:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Comprueba el estado:

`sudo systemctl status cloudflared`

Deberías ver un mensaje como `Active: active (running)` y la confirmación de que `btcpay.example.com` está en línea.

> A partir de ahora, el túnel se iniciará automáticamente en cada reinicio, y tu BTCPay Server será accesible públicamente, sin port forwarding y sin exponer tu IP real.

---

### Paso 5: finalizar la configuración de BTCPay Server

Si estás a punto de instalar BTCPay Server por primera vez, establece tu dominio antes de ejecutar el script de configuración:

`export BTCPAY_HOST="btcpay.example.com"`

Esto garantiza que se use el dominio correcto al generar la **configuración de Nginx** y los **certificados SSL**.

Si BTCPay Server ya está instalado y solo estás añadiendo el túnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

La configuración regenerará los archivos y aplicará el nuevo dominio.
Ahora deberías poder acceder a tu servidor en:

`https://btcpay.example.com`

> Tanto si usas un `lightwalletd` público como tu propio nodo completo, esto no afecta al túnel.
> Lo único que importa es que BTCPay Server esté escuchando localmente en `127.0.0.1:80`.


## Configurar el plugin de Zcash en la interfaz web de BTCPay Server

> **Importante para configuraciones con varias tiendas:**  
> La wallet de Zcash configurada aquí es **global** para la instancia. Todas las tiendas usarán esta wallet, a menos que ejecutes instancias separadas de BTCPay.

Después de desplegar correctamente tu instancia de BTCPay Server, tendrás que realizar una configuración básica mediante la interfaz web de administración.  
La documentación oficial proporciona instrucciones completas en inglés; aquí recorreremos los pasos esenciales y nos centraremos específicamente en configurar el plugin de Zcash.

---

### Paso 1: iniciar sesión en la interfaz web

Visita tu instancia en:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Introduce tu usuario y contraseña de administrador.
- Si es la primera vez que inicias sesión, se te pedirá que crees una cuenta.
- La primera cuenta que registres recibirá automáticamente privilegios de administrador.

---

### Paso 2: instalar el plugin de Zcash

1. En el menú principal, ve a:

`Plugins -> Browse Plugins`

2. Localiza el plugin **Zcash (ZEC)**. Usa la barra de búsqueda si hace falta.
3. Haz clic en **Install** y confirma.

> Repite este proceso para cualquier otra altcoin que hayas habilitado durante la configuración del servidor.

Después de la instalación, haz clic en **Restart Server** para recargar la interfaz con los plugins activos.


### Paso 3: conectar tu wallet mediante Viewing Key

Después de instalar el plugin, aparecerá una nueva sección de **Zcash** en el menú de configuración.

1. Ve a:

`Zcash -> Settings`

2. Pega tu **Unified Full Viewing Key (UFVK)**; BTCPay derivará una Unified Address para cada factura y detectará pagos blindados entrantes.

> **Nota:** Las viewing keys heredadas de Sapling son compatibles, pero para usar Orchard/Unified Addresses debes proporcionar una **UFVK**.


   Formato de ejemplo:

`uview184syv9wftwngkay8d...`

3. Introduce un valor en el campo Block height

* **Configuración inicial con una wallet nueva (nueva seed phrase):** introduce la altura actual del bloque de Zcash (puedes consultarla en 3xpl.com/zcash); esto acelera el escaneo inicial.
* **Migración en el mismo servidor desde una configuración heredada solo Sapling a Unified Addresses / Orchard:** deja este campo vacío.
* **Mover tu tienda a un servidor nuevo con la misma wallet/UFVK:** opcionalmente introduce la birth height, una altura aproximada del primer pedido pagado de tu tienda (haz coincidir la fecha del pedido en 3xpl para acotar el escaneo). Si no estás seguro, déjalo vacío.

> Todavía no todas las wallets admiten exportar **Unified Full Viewing Key (UFVK)**.  
> Opciones recomendadas:  
> – [**YWallet**](https://ywallet.app/installation)  
> – [**Zingo! Wallet (version for PC)**](https://zingolabs.org/)  
> En ambas aplicaciones, busca la exportación de UFVK en la sección de copia de seguridad/exportación.

Estas claves admiten **rotación automática de direcciones**, lo que significa:
- Cada cliente recibe una dirección de pago **única**
- Ves un único saldo **unificado**

Puedes encontrar una lista de compatibilidad más amplia en [ZecHub -> Wallets](https://zechub.wiki/wallets).

Una vez que todos los campos estén completados, haz clic en **Save**.

---

### Prueba tu flujo de pago en ZEC

Enhorabuena: tu wallet de Zcash ya está conectada a BTCPay Server.

Hagamos una prueba:

1. Ve a:

`Invoices -> Create New`

2. Genera una factura de prueba por una pequeña cantidad en ZEC.
3. Envía fondos desde **otra wallet distinta** (no la conectada a BTCPay).
4. Una vez que se detecte la transacción, la página de la factura mostrará una celebración visual.
5. Confirma que el estado de la factura cambie a **Paid**.

Si todo funciona, ya estás listo para integrar pagos en ZEC en tu sitio web usando la API o plugins de CMS.



## Integrar BTCPay Server con tu sitio web

Una vez que tu wallet de Zcash esté conectada a BTCPay Server, puedes integrar el sistema de pagos en tu sitio web.  
Hay varias formas de hacerlo, desde acceso directo por API hasta plugins listos para usar en plataformas CMS populares.

---

### Opciones de integración

- **Integración mediante API**  
  Ideal para sitios web construidos a medida o sistemas sin CMS.  
  Te da control total sobre la creación de facturas, el seguimiento de pagos y las notificaciones, todo dentro de tu propia interfaz y lógica.  
  Requiere conocimientos básicos de programación, así que esta tarea es mejor que la gestione tu desarrollador.

- **Plugins de CMS**  
  Disponibles para plataformas como **WooCommerce**, **PrestaShop** y otras.  
  Estos plugins te permiten aceptar pagos en solo unos minutos, sin necesidad de programar.

- **Botón de pago o Iframe**  
  El método más sencillo.  
  Perfecto para landing pages, sitios personales o cualquier sitio donde solo quieras incrustar un enlace de donación o un widget de checkout.

---

### Integración mediante API

Si estás usando una plataforma personalizada (o ningún CMS), la API es la mejor opción.  
Te da una flexibilidad completa: puedes crear facturas, rastrear su estado, recibir notificaciones y controlar por completo la experiencia del usuario.

> Nota: Incluso algunos plugins de CMS usan la API por debajo, así que crear una clave API suele ser el **primer paso necesario**, independientemente del método de integración.

Siguiente paso: genera una clave API para tu tienda y empieza a usar la [Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/) para construir tu integración.


### Generar una clave API

Para integrar BTCPay Server con tu sitio web o aplicación, tendrás que generar una clave API.

1. Inicia sesión en BTCPay Server y abre el **menú de usuario** (esquina superior derecha)
2. Ve a **API Keys**
3. Haz clic en **Create a new API key**
4. Introduce un nombre para tu clave
5. En la sección **Permissions**, habilita:
   - `Can create invoice`
   - `Can view invoice`
   - *(Opcional)* `Can modify store settings` - solo si necesitas gestión a nivel de tienda

6. Haz clic en **Generate**. Se mostrará tu clave API personal; cópiala y guárdala de forma segura.

> Esta clave concede acceso a las facturas de tu tienda.  
> **No** la compartas públicamente ni la expongas en código del lado del cliente.

---

### Ejemplo: crear una factura mediante API

**Endpoint:**

```
POST /api/v1/stores/{storeId}/invoices
Authorization: token {apiKey}
Content-Type: application/json
```

**Cuerpo de la solicitud:**

```
{
  "amount": 5,
  "currency": "ZEC",
  "checkout": {
    "speedPolicy": "HighSpeed",
    "paymentMethods": ["Zcash"]
  }
}
```

**Respuesta:**

Recibirás un objeto JSON con:

* `invoiceId`
* Una URL de pago que puedes incrustar en tu sitio web o enviar al cliente

Consulta la documentación completa:
[Greenfield API – Create Invoice](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurar un webhook (opcional)

Para recibir notificaciones en tiempo real cuando cambie el estado de las facturas (por ejemplo, cuando se reciba un pago):

1. Ve a la configuración de tu tienda -> **Webhooks**
2. Añade la URL de tu endpoint backend que manejará solicitudes `POST` de BTCPay Server
3. BTCPay enviará automáticamente notificaciones cuando una factura sea pagada o expire

Las cargas útiles del webhook y la lógica de reintento se describen en la [documentación oficial sobre webhooks](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Hay integraciones de ejemplo disponibles para varios lenguajes de programación en la documentación y los repositorios GitHub de BTCPay.



### Integración con CMS

BTCPay Server admite plugins para sistemas populares de gestión de contenidos (CMS).  
La integración más madura y utilizada es con **WordPress + WooCommerce**, lo que facilita aceptar pagos en ZEC **sin escribir código**.

---

#### WooCommerce (WordPress)

BTCPay Server ofrece soporte oficial para un plugin de WooCommerce.

Pasos para integrarlo:

1. Instala el plugin **BTCPay for WooCommerce** desde el directorio de plugins de WordPress o desde GitHub.
2. En el panel de administración de WordPress, ve a:

`WooCommerce -> Settings -> Payments`

3. Busca **BTCPay** en la lista y haz clic en **Set up**
4. Introduce la URL de tu BTCPay Server y sigue las instrucciones de autorización  
   (se recomienda la generación automática de la clave API)
5. Habilita el método de pago y guarda la configuración

> En la documentación del plugin encontrarás instrucciones detalladas, videotutoriales y guías de resolución de problemas.

También encontrarás otras opciones de integración con CMS en esa misma sección de la documentación de BTCPay.

---

### Botón de pago o Iframe (sin CMS ni API)

Si no usas un CMS y no quieres trabajar con APIs, la forma más fácil de aceptar pagos en ZEC es **incrustar un enlace o widget de pago** directamente en tu sitio web.

Este método es ideal para:

- Landing pages
- Sitios de portfolio
- Blogs o páginas estáticas
- Proyectos sin servidor backend

---

#### Opción 1: botón de pago (enlace)

1. En BTCPay Server, crea manualmente una factura en la sección **Invoices**
2. Copia el enlace de pago, por ejemplo:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Añade el enlace a tu HTML:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pagar con ZEC
</a>
```

---

#### Opción 2: factura incrustada (Iframe)

Para mostrar la factura directamente en tu sitio, usa un iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Puedes dar estilo al botón o al contenedor del iframe para que coincida con el diseño de tu sitio; BTCPay Server permite una tematización flexible de la página de factura.

## Conclusión

Esta guía ha sido larga, pero solo cubre los aspectos fundamentales de integrar pagos con Zcash en BTCPay Server.

La interfaz de BTCPay Server ofrece muchas más funcionalidades de las que hemos mostrado aquí. Por suerte, la interfaz está disponible en varios idiomas (incluido el ruso), lo que facilita seguir explorando y experimentando.

BTCPay es una herramienta muy flexible. Puedes:

* Alojar varias tiendas independientes en una sola instancia
* Definir roles y permisos personalizados para miembros del equipo, desde solo ver pedidos hasta administración completa
* Usar tus propios dominios y tu propia marca
* Configurar webhooks, wallets de respaldo e incluso acceso mediante Tor
* Configurar ajustes avanzados como reglas fiscales, códigos de descuento, personalización de la página de checkout, restricciones por método de pago y mucho más

BTCPay fue creado como una alternativa de código abierto a los proveedores de pago centralizados. Si quieres aceptar pagos privados en ZEC sin intermediarios, esta plataforma merece absolutamente tu atención.

Te deseamos mucho éxito explorando el ecosistema de BTCPay y haciendo que tus pagos sean realmente tuyos.

## Recursos

* [Sitio web oficial de BTCPay Server](https://btcpayserver.org/)
* [Preguntas frecuentes de BTCPay](https://docs.btcpayserver.org/FAQ/)
* [Repositorio GitHub de BTCPay Server](https://github.com/btcpayserver/btcpayserver)
* [Demo Mainnet de BTCPay Server](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Plugin de Zcash para BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Guía de instalación del plugin de Zcash](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Ejemplo personalizado de zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [Archivo Docker Compose de Lightwalletd (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentación de claves API de BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Crear un Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Lista de compatibilidad de wallets de Zcash (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + Lightwalletd en Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
