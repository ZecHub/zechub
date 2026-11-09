# BTCPay Server con soporte para Zcash: guía completa de instalación e integración

BTCPay Server permite a los negocios en línea aceptar pagos con criptomonedas directamente, sin intermediarios ni custodios. Esta guía le acompaña durante el proceso completo de configuración de BTCPay Server con soporte nativo para pagos blindados [shielded payments] de Zcash.

> Esta documentación se centra en integrar Zcash en su instancia de BTCPay Server.  
> Es compatible tanto con configuraciones de **nodo completo [full node] (Zebra)** como basadas en **lightwalletd**.

---

## Tabla de contenidos

- [Por qué usar BTCPay Server con Zcash](#Why-Use-BTCPay-Server-with-Zcash)
- [Cómo funciona BTCPay Server](#How-BTCPay-Server-Works)
- [¿Dónde se almacenan los fondos? ¿Quién controla las claves privadas?](#Where-Are-Funds-Stored-Who-Controls-the-Private-Keys)
- [Cómo configurar BTCPay Server para aceptar Zcash](#How-to-Set-Up-BTCPay-Server-for-Accepting-Zcash)
  - [Desplegar BTCPay Server con soporte para Zcash](#Deploying-BTCPay-Server-with-Zcash-Support)
  - [Ejecutar su propio nodo completo de Zcash (Zebra + lightwalletd)](#Running-Your-Own-Zcash-Full-Node)
  - [Conectarse a un nodo externo de lightwalletd (configuración personalizada)](#Connecting-to-an-External-Lightwalletd-Node)
  - [Alojar BTCPay Server en casa con Cloudflare Tunnel](#Hosting-BTCPay-Server-at-Home-with-Cloudflare-Tunnel)
- [Configurar el plugin de Zcash en la interfaz web de BTCPay Server](#Configuring-the-Zcash-Plugin-in-the-BTCPay-Server-Web-Interface)
- [Integrar BTCPay Server con su sitio web](#Integrating-BTCPay-Server-with-Your-Website)
  - [Integración de API](#API-Integration)
    - [Generar una clave de API](#Generating-an-API-Key)
    - [Ejemplo: crear una factura mediante API](#Example-Creating-an-Invoice-via-API)
    - [Configurar un webhook](#Setting-Up-a-Webhook-Optional)
  - [Integración con CMS](#CMS-Integration)
  - [Botón de pago o iframe](#Payment-Button-or-Iframe-No-CMS-or-API-Needed)
- [Conclusión](#Conclusion)
- [Recursos](#Resources)


---

## Por qué usar BTCPay Server con Zcash

El comercio en línea acepta cada vez más criptomonedas. Es rápido, global y funciona sin bancos. Esto beneficia tanto a comerciantes como a clientes. Pero hay un detalle importante que muchos pasan por alto.

Al realizar un pedido, el cliente normalmente proporciona información personal: nombre, dirección de envío y número de teléfono. Si el pago se realiza mediante una blockchain pública, como Bitcoin, Ethereum o stablecoins en Ethereum o Tron, la transacción se vuelve permanentemente visible para su análisis.

Cualquiera, incluso sin saber qué se pidió, puede:

- Ver cuándo y cuánto se pagó  
- Rastrear de dónde procedían los fondos y adónde fueron  
- Vincular una dirección de criptomonedas con una persona real si existe algún punto de correlación (por ejemplo, un correo electrónico o nombre de envío filtrado)

Esto significa que una sola compra puede revelar todo el historial financiero de un cliente.

Y también funciona a la inversa. Si la dirección de un comerciante ha aparecido alguna vez on-chain, queda expuesto. Los competidores y observadores externos pueden rastrear los volúmenes de pago, la actividad de proveedores y la estructura de los flujos de negocio.

### La combinación de BTCPay Server y Zcash puede resolver esto.


BTCPay Server es un sistema gratuito y descentralizado para recibir pagos con criptomonedas.  
No es un intermediario de pagos y no retiene fondos. Todos los pagos van directamente a la billetera [wallet] del comerciante.  
Puede ser una billetera personal o una configuración multisig dentro de una organización.

El servidor gestiona tareas de coordinación:

- Genera una dirección única para cada pedido  
- Rastrea cuándo se recibe el pago y lo vincula al pedido  
- Emite recibos y notificaciones  
- Proporciona una interfaz de pago para el cliente  

Todo funciona bajo el control del propietario de la tienda, sin depender de servicios de terceros.

Zcash es una criptomoneda construida sobre pruebas zero-knowledge [zero-knowledge proofs]. Admite un modelo de transacción completamente privado.  
Al utilizar direcciones blindadas [shielded addresses] (en adelante, simplemente denominadas «direcciones»), el remitente, el destinatario y el importe de la transacción no se revelan en la blockchain.

Para las tiendas en línea, esto significa:

- El comprador puede completar el pago sin revelar su historial financiero  
- El vendedor recibe el pago sin exponer su dirección, volumen de ventas ni estructura de transacciones  
- Ningún observador externo puede vincular el pago con el pedido ni con los datos del cliente

### Ejemplo práctico

Un usuario realiza un pedido y selecciona Bitcoin o USDT como método de pago.  
El sitio web genera una dirección de pago y muestra el importe.  
Después de realizarse el pago, esta dirección se almacena en la blockchain y se hace pública.  
Un atacante solo necesita vincular un pedido con la dirección para obtener visibilidad a largo plazo de todo su historial de transacciones.

Ahora imagine la misma situación con Zcash.  
BTCPay Server genera una dirección blindada. El comprador envía el pago.  
Desde la perspectiva de la blockchain, no ocurre nada. No hay datos públicos que analizar.  
El servidor recibe la confirmación, la vincula al pedido y completa el proceso.

Para cualquier persona externa, parece que no ocurrió nada.  
Toda la lógica permanece entre la tienda y el cliente, como debe ser.

Esta solución no compromete la automatización ni la usabilidad.  
Todo funciona igual que con otras criptomonedas, pero sin el riesgo de filtraciones de datos.



## Cómo funciona BTCPay Server

BTCPay Server actúa como un puente de procesamiento de pagos entre su plataforma de comercio electrónico y la blockchain. Así funciona el flujo:

1. **El cliente realiza un pedido** en su sitio web (por ejemplo, WooCommerce, Magento o cualquier plataforma con integración de BTCPay).

2. **La tienda solicita una factura de pago** a BTCPay Server. El servidor genera una factura única con:
   - El importe del pedido
   - Un temporizador de cuenta regresiva
   - Una dirección unificada (UA) de Zcash, por ejemplo, `u1...`, que incluye de forma predeterminada un receptor Orchard (blindado).

3. **El cliente ve la página de pago** y envía ZEC a la dirección proporcionada.

4. **BTCPay Server supervisa la blockchain**, verificando el pago respecto a:
   - El importe esperado
   - La dirección receptora
   - La marca de tiempo de la factura

5. **Una vez que la transacción se detecta y confirma**, BTCPay notifica a la tienda.

6. **El cliente recibe una confirmación de pago.** Opcionalmente, el servidor puede enviar un recibo por correo electrónico.

Todo este proceso ocurre **automáticamente**, sin intermediarios ni custodios.  
BTCPay Server **no retiene ningún fondo**; simplemente conecta el sistema de pedidos con la blockchain de forma segura y privada.
## ¿Dónde se almacenan los fondos? ¿Quién controla las claves privadas?

BTCPay Server **no** es una billetera y **no requiere claves privadas**.  
Todos los fondos van **directamente** a la billetera del comerciante. La seguridad se garantiza mediante una **arquitectura basada en claves de visualización [viewing key]**.

### Cómo funciona

- **La billetera se crea con antelación.**  
  El comerciante utiliza una billetera de Zcash que admite claves de visualización, como [Zkool](https://github.com/hhanh00/zkool2/) o [Zingo! Wallet](https://zingolabs.org/).  
  Hay una lista completa disponible en [ZecHub.wiki](https://zechub.wiki/wallets).

- **BTCPay Server se conecta mediante una clave de visualización.**  
  Una clave de visualización es una **clave de solo lectura**: puede detectar pagos entrantes y generar nuevas direcciones de recepción,  
  pero no puede gastar fondos. El servidor no almacena frases semilla ni claves privadas.

- **Se accede a los datos de la blockchain mediante un servidor `lightwalletd`.**  
  Puede usar un nodo público como `https://zec.rocks` o ejecutar su propia pila de `Zebra + lightwalletd` para una soberanía total.

- **Cada pedido obtiene una dirección única.**  
  Las claves de visualización permiten al servidor derivar nuevas direcciones blindadas de Zcash para cada factura,  
  lo que permite un seguimiento seguro de los pagos y evita la reutilización de direcciones.

- **Conserva el control total sobre los fondos.**  
  Incluso si el servidor se ve comprometido, nadie puede robar su dinero; solo podrían exponerse metadatos de pago.

Este diseño separa la **infraestructura** del **control de los activos**.  
Puede actualizar, migrar o reinstalar BTCPay Server sin poner ningún fondo en riesgo.

## Cómo configurar BTCPay Server para aceptar Zcash

En las secciones anteriores, explicamos cómo funciona BTCPay Server con Zcash y por qué es importante para los pagos que preservan la privacidad. Ahora es momento de poner manos a la obra.

Su configuración exacta dependerá de varios factores:

- ¿Ya tiene una instancia de BTCPay Server?
- ¿Desea usar un lightwalletd público o ejecutar su propio nodo completo?
- ¿El servidor se ejecutará en un VPS o en casa?

Este capítulo cubre todos los escenarios de configuración actuales, desde configuraciones mínimas hasta despliegues completamente soberanos.

Veremos lo siguiente:

- Cómo desplegar todo desde cero en un VPS, incluido el nodo completo (Zebra)
- Cómo ejecutar BTCPay Server en casa mientras mantiene su IP oculta mediante **Cloudflare Tunnel**
- Cómo habilitar y configurar el soporte para Zcash dentro de la interfaz web de BTCPay Server
- Cómo integrar BTCPay con su sitio web o tienda en línea


## Desplegar BTCPay Server con soporte para Zcash

Pasemos a la configuración real. En esta sección, instalaremos BTCPay Server con soporte para Zcash, ya sea en un VPS nuevo o añadiendo soporte para ZEC a una instancia existente.

Si ya tiene BTCPay Server en ejecución (por ejemplo, para BTC o Lightning), no necesita reinstalarlo todo; simplemente habilite el plugin de ZEC.

Revisaremos varias configuraciones, desde instalaciones mínimas que utilizan un nodo público de `lightwalletd` hasta instalaciones completamente soberanas con su propio nodo completo.  
La mejor opción depende de la ubicación de su servidor y de cuánta independencia desea tener de infraestructura externa.

> Documentación oficial del plugin:  
> [https://github.com/btcpay-zcash/btcpayserver-zcash-plugin](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
>
> **Advertencia: una billetera por instancia:**  
> El plugin de Zcash utiliza **una billetera compartida** en **todas las tiendas** de la instancia de BTCPay.  
> Si aloja varias tiendas independientes en una instancia, compartirán la misma billetera de Zcash.  
> Use instancias separadas si necesita un aislamiento estricto de las billeteras.

---

### Configuración recomendada de VPS

Antes de instalar, asegúrese de tener:

- Un VPS con **Ubuntu 22.04+**
- Un nombre de dominio que apunte a la dirección IP de su servidor (mediante DNS)
- `git`, `docker` y `docker-compose` instalados
- Acceso SSH al servidor

---

## Preparar su servidor (parte oculta)

<details>
  <summary>Haga clic para expandir</summary>

Para desplegar BTCPay Server con soporte para Zcash, necesitará lo siguiente:

### 1. VPS con Ubuntu 22.04 o posterior

Recomendamos utilizar una instalación mínima de **Ubuntu Server 22.04 LTS**.  
Cualquier proveedor de VPS que ofrezca una dirección IP dedicada funcionará.  

**Requisitos mínimos**:  
- 2 núcleos de CPU  
- 4 GB de RAM  
- 40 GB de espacio en disco  

Esta configuración es suficiente si utiliza lightwalletd para Zcash.  
Si planea ejecutar un **nodo completo de Zcash**, necesitará **al menos 300 GB** de espacio libre en disco.

---

### 2. Nombre de dominio que apunte a su servidor

En el panel de su proveedor de DNS, cree un registro `A` para un subdominio  
(por ejemplo, `btcpay.example.com`) que apunte a la dirección IP de su VPS.  

Este dominio se utilizará para acceder a BTCPay Server desde el navegador  
y para generar automáticamente un **certificado SSL gratuito** mediante Let's Encrypt.

---

### 3. Acceso SSH al servidor

Para instalar BTCPay Server, debe conectarse a su VPS mediante SSH.  
Desde su terminal, ejecute:

`ssh root@YOUR_SERVER_IP`

Si utiliza macOS, Linux o WSL en Windows, SSH ya está disponible en la terminal.
En Windows estándar, utilice un cliente SSH como **PuTTY**.

---

### 4. Instalar Git, Docker y Docker Compose

Una vez conectado mediante SSH, actualice los paquetes de su sistema e instale los componentes necesarios:

```
sudo apt update && sudo apt upgrade -y
sudo apt install git curl docker.io docker-compose-plugin -y
sudo systemctl enable docker
```

> En Ubuntu 22.04 y versiones posteriores, `docker-compose` de APT está obsoleto.
> El paquete recomendado es `docker-compose-plugin`, que proporciona el comando `docker compose` (observe el espacio en lugar de un guion).

El entorno de su servidor ya está listo para instalar BTCPay Server.

</details>

---

### Paso 1: Clonar el repositorio

Cree un directorio de trabajo y descargue el despliegue de BTCPay Server Docker:

```
mkdir BTCPayServer
cd BTCPayServer
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
```

---

### Paso 2: Exportar variables de entorno

Sustituya `btcpay.example.com` por su dominio real:

```
export BTCPAY_HOST="btcpay.example.com"
export NBITCOIN_NETWORK="mainnet"
export BTCPAYGEN_CRYPTO1="btc"
export BTCPAYGEN_CRYPTO2="zec"
export BTCPAYGEN_REVERSEPROXY="nginx"
export BTCPAYGEN_LIGHTNING="none"
```

> Si planea añadir Monero o Litecoin más adelante, puede incluirlos ahora:

```
export BTCPAYGEN_CRYPTO3="ltc"
export BTCPAYGEN_CRYPTO4="xmr"
```

Puede añadir nuevas monedas en cualquier momento exportando las variables apropiadas y ejecutando de nuevo el script de configuración:

`. ./btcpay-setup.sh -i`

Para esta guía, nos centraremos únicamente en **Zcash**.

---

### Paso 3: Ejecutar el instalador

Ejecute el script de configuración para compilar e iniciar el servidor:

`. ./btcpay-setup.sh -i`

El script instalará dependencias, generará el `docker-compose.yml`, iniciará servicios y configurará `systemd`.
Esto tarda aproximadamente 5 minutos.

Una vez completado, su instancia de BTCPay Server estará disponible en:

`https://btcpay.example.com`

> Si modifica una instalación existente (por ejemplo, añadiendo ZEC), asegúrese de detener y reiniciar el servidor con la nueva configuración:

```
cd ~/BTCPayServer/btcpayserver-docker
btcpay-down.sh
. ./btcpay-setup.sh -i
```

A continuación, pase a la siguiente sección para configurar Zcash en la interfaz web de BTCPay Server.

## Ejecutar tu propio nodo completo [Full Node] de Zcash

Si prefieres **no** depender de nodos públicos de `lightwalletd`, puedes implementar tu propio nodo completo de Zcash junto con lightwalletd en el mismo servidor.  
Esto te proporciona **autonomía total**: sin dependencias externas ni necesidad de confianza.

---

### Paso 1: Garantizar suficiente espacio en disco

Un nodo completo de Zcash (Zebra + lightwalletd) actualmente requiere **más de 300 GB** de espacio en disco, y sigue creciendo.

Desglose:

- La base de datos de la blockchain de Zebra: ~260-270 GB
- La indexación de lightwalletd: ~15-20 GB

#### Almacenamiento recomendado:

- **Más de 400 GB** si el servidor se utiliza **solo** para pagos de Zcash
- **Más de 800 GB** si el servidor también ejecuta BTCPay Server, PostgreSQL, Nginx, etc.

> Idealmente, utiliza un disco SSD/NVMe con **1 TB de capacidad**, especialmente si no planeas depurar los datos con regularidad.

---

### Paso 2: Configurar las variables de entorno

Añade lo siguiente a tu configuración de entorno para activar la configuración del nodo completo:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="zcash-fullnode"
```

Esto incluirá el fragmento de `zcash-fullnode`, que inicia tanto `zebrad` como `lightwalletd` dentro de BTCPay Server.

---

### Paso 3: Volver a ejecutar el instalador

`. ./btcpay-setup.sh -i`

El script hará lo siguiente:

* Descargar las imágenes de Docker para Zebra y lightwalletd
* Configurar los servicios dentro de la pila de BTCPay
* Vincular el plugin de Zcash a la instancia **local** de `lightwalletd`

> **La sincronización completa de la blockchain puede tardar varios días**, especialmente en servidores VPS con pocos recursos.
> Hasta que se complete la sincronización, los pagos blindados [shielded] no estarán disponibles.


## Conectarse a un nodo externo de lightwalletd

En la mayoría de los casos, no se requiere autonomía total, y es posible que los comerciantes no quieran dedicar tiempo y espacio en disco a ejecutar un nodo completo de Zcash.  
De forma predeterminada, BTCPay Server se conecta a un nodo público de `lightwalletd` para gestionar pagos blindados sin descargar toda la blockchain.

El endpoint predeterminado es:

`https://zec.rocks:443`

Sin embargo, puedes configurar BTCPay Server para conectarse a **cualquier nodo externo de `lightwalletd`**, como:

`https://lightwalletd.example:443`

Esta sección muestra cómo hacerlo utilizando un **fragmento personalizado de Docker**.

> Hay un ejemplo de configuración completo con todas las variables de entorno disponible en el repositorio del plugin de [](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml).  
> Los pasos siguientes muestran una configuración mínima funcional.

---

### Paso 1: Crear un fragmento personalizado de Docker

En el directorio de tu proyecto BTCPayServer, crea un archivo de fragmento personalizado:

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

La directiva de `exclusive` garantiza que solo pueda estar activo un fragmento con la misma etiqueta (`zcash` en este caso) a la vez.
Esto evita conflictos de configuración; por ejemplo, no puedes ejecutar simultáneamente el fragmento de `zcash-fullnode` y este fragmento externo personalizado de `lightwalletd`.
Al marcarlo como `exclusive: zcash`, BTCPay Server desactivará automáticamente los contenedores predeterminados de `zcash-fullnode` e internos de `lightwalletd`, lo que te permitirá conectarte a tu propio nodo externo.

---

### Paso 2: Configurar las variables de entorno

En la terminal:

```
export BTCPAYGEN_EXCLUDE_FRAGMENTS="$BTCPAYGEN_EXCLUDE_FRAGMENTS;zcash"
export BTCPAYGEN_ADDITIONAL_FRAGMENTS="$BTCPAYGEN_ADDITIONAL_FRAGMENTS;zcash-lightwalletd.custom"
```

---

### Paso 3: Definir la dirección del nodo externo

Abre tu archivo de `.env`:

`nano .env`

Añade la siguiente línea y sustituye la URL por el endpoint que hayas elegido:

`ZCASH_LIGHTWALLETD=https://lightwalletd.example:443`

Puedes utilizar:

* Un **nodo público**, como `https://zec.rocks:443`
* Tu propio nodo autoalojado, implementado por separado de BTCPay Server

> Si el `lightwalletd` externo deja de estar disponible o se sobrecarga, los pagos blindados fallarán.
> Para servicios críticos, elige un **endpoint estable y probado** (como el `zec.rocks` predeterminado).

> ¿Quieres autoalojar `lightwalletd`?
> Puedes utilizar el `docker-compose.lwd.yml` del repositorio de [Zebra](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml).
> **Advertencia:** Esta configuración no está documentada oficialmente y requiere configurar manualmente TLS, el reenvío de puertos y el firewall; se recomienda solo para usuarios avanzados.

---

### Paso 4: Volver a ejecutar el instalador

`. ./btcpay-setup.sh -i`

BTCPay Server aplicará tu configuración personalizada y se conectará al nodo de `lightwalletd` especificado.

A partir de ahora, el plugin de Zcash utilizará ese endpoint externo para gestionar transacciones blindadas.


## Alojar BTCPay Server en casa con Cloudflare Tunnel

¿Quieres aceptar pagos de Zcash mientras alojas BTCPay Server en un dispositivo doméstico, como una Raspberry Pi 5 o cualquier servidor local **sin una IP estática**?  
Puedes exponer de forma segura tu instancia a internet utilizando **Cloudflare Tunnel**.

Este método evita el reenvío de puertos y oculta tu dirección IP real al público, al tiempo que mantiene tu servidor accesible mediante HTTPS.

También te ayuda a **evitar el coste de alquilar un VPS**, lo cual es ideal si los pagos con criptomonedas son una función opcional en lugar del núcleo de tu negocio.

---

### Paso 1: Instalar Cloudflare Tunnel

1. Crea una cuenta en [cloudflare.com](https://www.cloudflare.com) y añade tu dominio.
2. En tu **servidor doméstico**, instala Cloudflare Tunnel utilizando el repositorio oficial de paquetes de Cloudflare:

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install cloudflared
```

Si `apt install cloudflared` falla, instala en su lugar el `.deb` correspondiente:

```bash
# Raspberry Pi / ARM64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
sudo dpkg -i cloudflared.deb
```

```bash
# x86_64
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

3. Autentícate con Cloudflare:

`cloudflared tunnel login`

Este comando abrirá una ventana del navegador. Inicia sesión y autoriza el acceso a tu dominio.
Cloudflare creará automáticamente un archivo de `credentials` con un token en tu servidor.

4. Crea un túnel nuevo (puedes llamarlo `btcpay` o como prefieras):

`cloudflared tunnel create btcpay`

Esto genera un archivo de `btcpay.json` que contiene el ID y las credenciales del túnel; lo necesitarás en el siguiente paso.

---

### Paso 2: Crear el archivo de configuración del túnel

Crea el directorio de configuración (si no existe) y abre el archivo de configuración:

```
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Pega la siguiente configuración:

```
tunnel: btcpay    # your tunnel name
credentials-file: /root/.cloudflared/btcpay.json

ingress:
  - hostname: btcpay.example.com      # your domain
    service: http://127.0.0.1:80
  - service: http_status:404
```

#### Explicación:

* `tunnel`: nombre del túnel que creaste anteriormente
* `credentials-file`: ruta al archivo de token generado durante `cloudflared tunnel login`
* `hostname`: tu dominio registrado en Cloudflare (p. ej., `btcpay.example.com`)
* `service`: dirección local de tu BTCPay Server (normalmente `http://127.0.0.1:80` para Nginx)

> Cloudflare enviará el tráfico de forma segura a tu servidor local, sin exponer la IP de tu hogar.


### Paso 3: Añadir un registro DNS para tu túnel

Después de crear el túnel, Cloudflare normalmente **añadirá automáticamente un registro DNS CNAME** para tu dominio. Debería verse así:

`btcpay.example.com -> <UUID>.cfargotunnel.com`

Si no aparece automáticamente, añádelo manualmente:

1. Ve a tu [panel de Cloudflare](https://dash.cloudflare.com/)
2. Navega a la sección **DNS**
3. Añade un nuevo registro CNAME:
   - **Nombre**: `btcpay`
   - **Destino**: `<UUID>.cfargotunnel.com`  
     Puedes encontrar el valor exacto en tu archivo de `btcpay.json` o ejecutando:
     
     `cloudflared tunnel list`
     
   - **Estado del proxy**: Activado (nube naranja)

> Este registro garantiza que todas las solicitudes a `btcpay.example.com` se enruten a través de Cloudflare Tunnel, ocultando tu dirección IP real al público.

---

### Paso 4: Activar el túnel al iniciar el sistema

Para que el túnel se ejecute automáticamente al arrancar, instálalo como un servicio del sistema:

`sudo cloudflared service install`

Después, activa e inicia el servicio:

```
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Comprueba el estado:

`sudo systemctl status cloudflared`

Deberías ver un mensaje como `Active: active (running)` y la confirmación de que `btcpay.example.com` está en línea.

> A partir de ahora, el túnel se iniciará automáticamente en cada reinicio y tu BTCPay Server será accesible públicamente, sin reenvío de puertos ni exponer tu IP real.

---

### Paso 5: Finalizar la configuración de BTCPay Server

Si estás a punto de instalar BTCPay Server por primera vez, configura tu dominio antes de ejecutar el script de instalación:

`export BTCPAY_HOST="btcpay.example.com"`

Esto garantiza que se utilice el dominio correcto al generar la **configuración de Nginx** y los **certificados SSL**.

Si BTCPay Server ya está instalado y solo estás añadiendo el túnel:

```
cd ~/BTCPayServer/btcpayserver-docker
. ./btcpay-setup.sh -i
```

La instalación regenerará las configuraciones y aplicará el nuevo dominio.
Ahora deberías poder acceder a tu servidor en:

`https://btcpay.example.com`

> Tanto si utilizas un `lightwalletd` público como tu propio nodo completo, esto no afecta al túnel.
> Lo único importante es que BTCPay Server esté escuchando en `127.0.0.1:80` localmente.


## Configurar el plugin de Zcash en la interfaz web de BTCPay Server

> **Importante para configuraciones con varias tiendas:**  
> La billetera [wallet] de Zcash configurada aquí es **global** para la instancia. Todas las tiendas utilizarán esta billetera a menos que ejecutes instancias de BTCPay separadas.

Después de implementar correctamente tu instancia de BTCPay Server, tendrás que realizar una configuración básica mediante la interfaz web de administración.  
La documentación oficial proporciona instrucciones completas en inglés; aquí repasaremos los pasos esenciales y nos centraremos específicamente en configurar el plugin de Zcash.

---

### Paso 1: Iniciar sesión en la interfaz web

Visita tu instancia en:

`[https://btcpay.example.com](https://btcpay.example.com)`

- Introduce tu inicio de sesión y contraseña de administrador.
- Si es la primera vez que inicias sesión, se te pedirá que crees una cuenta.
- La primera cuenta que registres recibirá automáticamente privilegios de administrador.

---

### Paso 2: Instalar el plugin de Zcash

1. En el menú principal, ve a:

`Plugins -> Browse Plugins`

2. Localiza el plugin **Zcash (ZEC)**. Utiliza la barra de búsqueda si es necesario.
3. Haz clic en **Install** y confirma.

> Repite este proceso para cualquier otra altcoin que hayas activado durante la configuración del servidor.

Después de la instalación, haz clic en **Restart Server** para recargar la interfaz con los plugins activos.


### Paso 3: Conectar tu billetera mediante Viewing Key

Después de instalar el plugin, aparecerá una nueva sección de **Zcash** en el menú de configuración.

1. Ve a:

`Zcash -> Settings`

2. Pega tu **Unified Full Viewing Key (UFVK)**: BTCPay derivará una dirección Unified para cada factura y detectará los pagos blindados entrantes.

> **Nota:** Se admiten claves de visualización [viewing keys] heredadas de Sapling, pero para utilizar Orchard/direcciones Unified debes proporcionar una **UFVK**.


   Formato de ejemplo:

`uview184syv9wftwngkay8d...`

3. Introduce un valor en el campo de altura de bloque

* **Configuración inicial con una billetera nueva (frase semilla nueva):** introduce la altura del bloque actual de Zcash (puedes comprobarla en 3xpl.com/zcash); esto acelera el escaneo inicial.
* **Migración en el mismo servidor desde una configuración heredada solo de Sapling a direcciones Unified / Orchard:** deja este campo vacío.
* **Trasladar tu tienda a un servidor nuevo con la misma billetera/UFVK:** opcionalmente, introduce la altura de nacimiento: una altura aproximada del primer pedido pagado de tu tienda (compara la fecha del pedido en 3xpl para acotar el escaneo). Si no estás seguro, déjalo vacío.

> Aún no todas las billeteras admiten la exportación de **Unified Full Viewing Key (UFVK)**.  
> Opciones recomendadas:  
> – [**Zkool**](https://github.com/hhanh00/zkool2/)  
> – [**Zingo! Wallet (versión para PC)**](https://zingolabs.org/)  
> En ambas aplicaciones, busca la exportación de UFVK en la sección de copia de seguridad/exportación.

Estas claves admiten la **rotación automática de direcciones**, lo que significa:
- Cada cliente recibe una dirección de pago **única**
- Ves un saldo **único y unificado**

Puedes encontrar una lista de compatibilidad más amplia en [ZecHub -> Wallets](https://zechub.wiki/wallets).

Una vez rellenados todos los campos, haz clic en **Save**.

---

### Probar tu flujo de pago de ZEC

Felicidades: tu billetera de Zcash ya está conectada a BTCPay Server.

Hagamos una prueba:

1. Ve a:

`Invoices -> Create New`

2. Genera una factura de prueba por un importe pequeño en ZEC.
3. Envía fondos desde **una billetera diferente** (no la conectada a BTCPay).
4. Cuando se detecte la transacción, la página de la factura mostrará una celebración visual.
5. Confirma que el estado de la factura cambie a **Paid**.

Si todo funciona, estás listo para integrar pagos de ZEC en tu sitio web mediante la API o plugins de CMS.



## Integrar BTCPay Server con tu sitio web

Una vez que tu billetera de Zcash esté conectada a BTCPay Server, podrás integrar el sistema de pago en tu sitio web.  
Hay varias maneras de hacerlo, desde acceso directo a la API hasta plugins listos para usar para plataformas CMS populares.

---

### Opciones de integración

- **Integración de API**  
  Ideal para sitios web personalizados o sistemas sin CMS.  
  Te proporciona control total sobre la creación de facturas, el seguimiento de pagos y las notificaciones, todo dentro de tu propia interfaz y lógica.  
  Requiere conocimientos básicos de programación, por lo que esta tarea es mejor gestionada por tu desarrollador [developer].

- **Plugins de CMS**  
  Disponibles para plataformas como **WooCommerce**, **PrestaShop** y otras.  
  Estos plugins te permiten aceptar pagos en solo unos minutos, sin necesidad de programar.

- **Botón de pago o Iframe**  
  El método más sencillo.  
  Perfecto para páginas de destino, sitios web personales o cualquier sitio en el que simplemente quieras insertar un enlace de donación o widget de pago.

---

### Integración de API

Si utilizas una plataforma personalizada (o no utilizas CMS), la API es la mejor opción.  
Te proporciona total flexibilidad: puedes crear facturas, seguir su estado, recibir notificaciones y controlar por completo la experiencia del usuario.

> Nota: Incluso algunos plugins de CMS utilizan la API internamente, por lo que crear una clave de API suele ser el **primer paso necesario**, independientemente de tu método de integración.

Siguiente paso: genera una clave de API para tu tienda y empieza a utilizar la API Greenfield de [](https://docs.btcpayserver.org/API/Greenfield/v1/) para crear tu integración.


### Generar una clave de API

Para integrar BTCPay Server con tu sitio web o aplicación, tendrás que generar una clave de API.

1. Inicia sesión en BTCPay Server y abre el **menú de usuario** (esquina superior derecha)
2. Ve a **API Keys**
3. Haz clic en **Create a new API key**
4. Introduce un nombre para tu clave
5. En la sección **Permissions**, activa:
   - `Can create invoice`
   - `Can view invoice`
   - *(Opcional)* `Can modify store settings`: solo si necesitas administración a nivel de tienda

6. Haz clic en **Generate**. Se mostrará tu clave de API personal; cópiala y guárdala de forma segura.

> Esta clave concede acceso a las facturas de tu tienda.  
> **No** la compartas públicamente ni la expongas en código del lado del cliente.

---

### Ejemplo: Crear una factura mediante API

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
* Una URL de pago que puedes insertar en tu sitio web o enviar al cliente

Consulta la documentación completa:
[API Greenfield – Crear factura](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/CreateInvoice)

---

### Configurar un webhook (opcional)

Para recibir notificaciones en tiempo real cuando cambien los estados de las facturas (p. ej., cuando se reciba un pago):

1. Ve a la configuración de tu tienda -> **Webhooks**
2. Añade la URL de tu endpoint de backend que gestionará las solicitudes de `POST` de BTCPay Server
3. BTCPay enviará automáticamente notificaciones cuando una factura se pague o caduque

Las cargas útiles de webhook y la lógica de reintentos se describen en la documentación oficial de webhooks de [](https://docs.btcpayserver.org/FAQ/General/#how-to-create-a-webhook-).

> Hay ejemplos de integración disponibles para varios lenguajes de programación en la documentación de BTCPay y los repositorios de GitHub.



### Integración con CMS

BTCPay Server admite plugins para sistemas populares de gestión de contenido (CMS).  
La integración más madura y utilizada es con **WordPress + WooCommerce**, lo que facilita aceptar pagos de ZEC **sin escribir código**.

---

#### WooCommerce (WordPress)

BTCPay Server admite oficialmente un plugin para WooCommerce.

Pasos para integrar:

1. Instala el plugin **BTCPay for WooCommerce** desde el directorio de plugins de WordPress o desde GitHub.
2. En el panel de administración de WordPress, ve a:

`WooCommerce -> Settings -> Payments`

3. Busca **BTCPay** en la lista y haz clic en **Set up**
4. Introduce la URL de tu BTCPay Server y sigue las instrucciones de autorización  
   (se recomienda la generación automática de claves de API)
5. Activa el método de pago y guarda la configuración

> Hay instrucciones detalladas, tutoriales en vídeo y guías de solución de problemas disponibles en la documentación del plugin.

También encontrarás otras opciones de integración con CMS en esa misma sección de la documentación de BTCPay.

---

### Botón de pago o Iframe (sin CMS ni API)

Si no utilizas un CMS y no quieres trabajar con API, la manera más sencilla de aceptar pagos de ZEC es **insertar un enlace o widget de pago** directamente en tu sitio web.

Este método es ideal para:

- Páginas de destino
- Sitios de portafolio
- Blogs o páginas estáticas
- Proyectos sin servidor de backend

---

#### Opción 1: Botón de pago (enlace)

1. En BTCPay Server, crea manualmente una factura en la sección **Invoices**
2. Copia el enlace de pago, por ejemplo:

`[https://btcpay.example.com/i/abc123](https://btcpay.example.com/i/abc123)`

3. Añade el enlace a tu HTML:

```
<a href="https://btcpay.example.com/i/abc123" target="_blank">
  Pay with ZEC
</a>
```

---

#### Opción 2: Factura integrada (Iframe)

Para mostrar la factura directamente en tu sitio, utiliza un iframe:

`<iframe src="https://btcpay.example.com/i/abc123" width="600" height="350" frameborder="0"></iframe>`

> Puedes aplicar estilos al botón o al contenedor del iframe para que coincida con el diseño de tu sitio; BTCPay Server permite personalizar de forma flexible el tema de la página de factura.

## Conclusión

Esta guía fue extensa, pero solo cubre los aspectos fundamentales de la integración de pagos [payments] de Zcash con BTCPay Server.

La interfaz de BTCPay Server ofrece muchas más funcionalidades de las que hemos mostrado aquí. Por suerte, la interfaz de usuario está disponible en varios idiomas (incluido el ruso), lo que facilita explorar y experimentar más.

BTCPay es una herramienta altamente flexible. Puedes:

* Alojar varias tiendas independientes en una sola instancia
* Definir roles y permisos personalizados para los miembros del equipo, desde solo visualización de pedidos hasta administración completa
* Usar tus propios dominios y tu propia marca
* Configurar webhooks, billeteras [wallets] de respaldo e incluso acceso a Tor
* Configurar ajustes avanzados, como reglas fiscales, códigos de descuento, personalización de la página de pago, restricciones de métodos de pago y más

BTCPay se creó como una alternativa de código abierto a los proveedores de pago centralizados. Si buscas aceptar pagos privados de ZEC sin intermediarios, esta plataforma merece totalmente tu atención.

Te deseamos éxito al explorar el ecosistema de BTCPay y hacer que tus pagos sean realmente tuyos.

## Recursos

* [BTCPay Server Sitio web oficial](https://btcpayserver.org/)
* [Preguntas frecuentes de BTCPay](https://docs.btcpayserver.org/FAQ/)
* [BTCPay Server Repositorio de GitHub](https://github.com/btcpayserver/btcpayserver)
* [BTCPay Server Demostración de Mainnet](https://mainnet.demo.btcpayserver.org/login?ReturnUrl=%2F)
* [Zcash Complemento para BTCPay (GitHub)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
* [Zcash Guía de instalación del complemento](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/installation.md)
* [Ejemplo personalizado de zcash-lightwalletd.custom.yml](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin/blob/master/docs/zcash-lightwalletd.custom.yml)
* [lightwalletd Archivo Compose de Docker (Zebra)](https://github.com/ZcashFoundation/zebra/blob/main/docker/docker-compose.lwd.yml)
* [Documentación de la clave de API de BTCPay (Greenfield API)](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys)
* [Crear un túnel de Cloudflare](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
* [Zcash Lista de compatibilidad de billeteras (ZecHub)](https://zechub.wiki/wallets)
* [Zebra + lightwalletd en Raspberry Pi 5 (ZecHub)](https://free2z.com/ZecHub/zpage/zcash-101-zebra-lightwalletd-sync-journal-on-raspberry-pi-5)
