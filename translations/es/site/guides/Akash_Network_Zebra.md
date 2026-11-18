# Cómo ejecutar Zebra en Akash Network

Guía paso a paso para desplegar un nodo completo [full node] de Zebra Zcash en Akash.

### Qué estás desplegando

Un nodo completo de Zebra que:

-> Sincronizará toda la blockchain [blockchain] de Zcash (más de 100 GB para mainnet, ~40 GB para testnet)

-> Costará aproximadamente $15/mes según los precios del token [token] AKT

-> Tardará de varias horas a días en sincronizarse por completo

-> Usará 4 vCPU, 16 GB de RAM, 350 GB de almacenamiento (mainnet) o 2 vCPU, 8 GB de RAM, 50 GB (testnet)


La plantilla awesome-akash ahora fija **Zebra 7.0.0** (nunca `:latest`). Habilita Prometheus (`9999`) y health (`8080`) internamente, JSON-RPC internamente para un **lightwalletd** ubicado en el mismo lugar mediante gRPC **9067**, y los indicadores de funciones `ENABLE_METRICS` / `ENABLE_HEALTH` / `ENABLE_RPC` / `ENABLE_LIGHTWALLETD`.

Para un nodo de Mainnet podado más rápido, consulta [Cómo ejecutar Zakura en Akash](/guides/akash-network-zakura). Para un panel de Regtest desechable, consulta [Así habló Zakura en Akash](/guides/thus-spoke-zakura-akash).

### Cómo Akash publica puertos

Los números del SDL (`port` / `as`) son **puertos de contenedor**. Zebra sigue escuchando en **8233**, lightwalletd en **9067** y la comprobación de estado en **8080**. Esos números son para el proceso y para otros servicios del mismo despliegue (`zebra:8232`).

No son los puertos de la IP pública del proveedor.

**Predeterminado (esta plantilla):** no hay una IP dedicada. Para cada exposición TCP de `global: true`, el proveedor asigna un **puerto alto aleatorio** en un host compartido a tu puerto de contenedor. Cuando se activa la concesión, **Concesiones → URI** en Console/Air muestra los endpoints reales, por ejemplo:

```
zebra-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

Los peers y las billeteras usan esos valores de host:puerto. Copia el URI de la exposición que te interese (P2P o lightwalletd). Si configuras `ZEBRA_NETWORK__EXTERNAL_ADDR`, asígnale el URI P2P mapeado (`provider.example:31482`), no `…:8233`.

**HTTP** (`as: 80` con `http_options`, usado en el panel de Thus Spoke): muchos proveedores publican un **nombre de host de ingreso** (a menudo en 80/443) en lugar de un puerto TCP aleatorio. Abre la URI de ese servicio en un navegador.

**Interno** (`global: false` o `to: service: lightwalletd`): solo DNS del clúster (`zebra:8232`). Sin URI pública.

**Las IP dedicadas** (`endpoints` / `kind: ip` en el SDL) son un **extra prémium**. Pueden reservar una IP pública y, a veces, el puerto `as` de esa IP. Estas plantillas no solicitan una. Si quieres una `host:8233` estable, añádela más adelante; espera un costo adicional y menos proveedores que pujen.

### Qué sitio usar (pagos)

El SDL es el mismo. Las dos interfaces web de Akash difieren en **cómo pagas**.

| Sitio | Pagos | Billetera |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | Pago web tradicional (tarjeta / medios de pago en moneda fiduciaria que ofrece Console) | Cuenta de Console |
| [air.akash.network](https://air.akash.network) | Pagos nativos en Akash (AKT / ACT) | **Keplr** |

Usa **Air** cuando quieras pagar con Keplr on-chain. Usa **Console** cuando quieras un proceso de pago web convencional. No esperes una liquidación nativa de Keplr en Console.

### Requisitos previos

**Si pagas en Console (pago en línea)**

1. Una cuenta de Console en [console.akash.network](https://console.akash.network)
2. Un método de pago aceptado por la interfaz de Console
3. Unos minutos en la interfaz de usuario

**Si pagas en Air (Akash nativo / Keplr)**

1. Extensión de navegador **Keplr** (Chrome/Brave/Firefox)
2. **AKT / ACT** en Keplr para el depósito y el arrendamiento (desde un exchange o IBC)
3. Abre [air.akash.network](https://air.akash.network)

#### Paso 1: Conectar

**Consola (pagos web)**

-> Ve a [https://console.akash.network](https://console.akash.network)

→ Inicia sesión / completa el proceso de la cuenta de Console

Usa el checkout que presenta la interfaz (no Keplr on-chain)

**Air (pagos Akash nativos)**

-> Ve a [https://air.akash.network](https://air.akash.network)

-> Haz clic en **«Connect Wallet»**

-> Elige **Keplr** y aprueba la conexión

-> Confirma que tu saldo de AKT/ACT sea suficiente para el depósito y el alquiler

#### Paso 2: Crea el despliegue

-> Haz clic en **«Deploy»**

-> Elige **«Build your template»** (o pasa directamente a cargar el SDL)


##### Opción A: Cargar archivo SDL (recomendado)

**Pagos web (Console)**

[![Deploy on Akash Console](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

**Pagos Akash nativos con Keplr (Air)**

[Abre esta plantilla en Air](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opción B: Usar el editor SDL

Si quieres pegar manualmente [el SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copia el contenido de *zebra-akash.yml*

-> Pégalo en el editor SDL

-> Modifícalo según sea necesario (consulta la sección de configuración a continuación)

-> Haz clic en **«Create Deployment»**


#### Paso 3: Revisa y aprueba el depósito

La interfaz de usuario te mostrará:

-> **Depósito del despliegue**: ~5 AKT (lo recuperarás cuando cierres el despliegue)

-> **Coste estimado**: Basado en los precios de tu SDL

En **Air**, haz clic en **«Approve»**** y inicia sesión en **Keplr**. En **Console**, completa el proceso de pago web que muestra la interfaz.

#### Paso 4: Elige un proveedor

Después de unos 30 segundos, verás ofertas de los proveedores. Cada oferta muestra:

-> **Precio por bloque [block]** (en AKT o USDC)

-> **Coste mensual estimado**

-> **Detalles del proveedor** (tiempo de actividad, región, etc.)


**No elijas simplemente el más barato.** Comprueba:

-> Porcentaje de tiempo de actividad (procura que sea > 95 %)

-> Región (cuanto más cerca de ti, mejor latencia, aunque no importa mucho para los nodos de blockchain)

-> Estado auditado (marca de verificación verde = más confiable)


Haz clic en **«Accept Bid»**** en el proveedor que elegiste. En Air, inicia sesión Keplr. En Console, confirma mediante el flujo de pago web.

#### Paso 5: Espera al despliegue

Console:

-> Creará el arrendamiento con el proveedor elegido

-> Enviará el manifiesto (indica al proveedor qué ejecutar)

-> Iniciará tu contenedor

Esto tarda entre 1 y 2 minutos. Verás actualizaciones de estado en la interfaz.

#### Paso 6: Verifica que esté funcionando

Una vez desplegado, verás:

-> Pestaña **Services**: Muestra tu servicio *zebra* con su estado

-> Pestaña **Logs**: Registros en vivo del contenedor

-> Pestaña **Leases**: Detalles de tu despliegue (DSEQ, proveedor, coste)


##### Comprueba los registros

Haz clic en **Logs** y deberías ver cómo se inicia Zebra:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

La sincronización tardará **de horas a días** según la red. Observa:

-> Alturas de bloque en aumento

-> Conexiones de pares (deberían ser entre 10 y 30 pares)

-> Ausencia de errores repetidos


#### Paso 7: Obtén la dirección [address] de tu nodo

Haz clic en la pestaña **Leases** y luego en **URIs**.

Verás algo como:

```
zebra-8233: provider-hostname.com:31482
lightwalletd-9067: provider-hostname.com:32011
```

Cada línea es una exposición de `global: true`. El nombre incluye el puerto SDL `as` (8233, 9067). El número después del nombre de host es el **puerto asignado por el proveedor**, asignado al iniciar el alquiler. Otros nodos Zcash se conectan a `provider-hostname.com:31482`. Las billeteras compactas usan el URI lightwalletd (TLS desactivado, a menos que termines TLS por tu cuenta).

El contenedor sigue escuchando en 8233 / 9067. La dirección pública siempre es la URI, a menos que más adelante añadas una IP dedicada (no incluida en esta plantilla).

### Opciones de configuración

#### Cambiar a Testnet

El SDL usa Mainnet de forma predeterminada. Para usar Testnet:

-> **Comenta la configuración de Mainnet** en la sección *env*:

   ```yaml
   # - "ZEBRA_NETWORK__NETWORK=Mainnet"
   # - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:8233"
   ```

-> **Descomenta la configuración de Testnet**:

   ```yaml
   - "ZEBRA_NETWORK__NETWORK=Testnet"
   - "ZEBRA_NETWORK__LISTEN_ADDR=[::]:18233"
   ```

-> **Actualiza el puerto expuesto** en la sección *expose*:

   ```yaml
   # Comment out Mainnet port:
   # - port: 8233
   #   as: 8233
   #   to:
   #     - global: true
   #   proto: tcp

   # Uncomment Testnet port:
   - port: 18233
     as: 18233
     to:
       - global: true
     proto: tcp
   ```

-> **Opcional: Reduce los recursos** para Testnet en *profiles.compute.zebra.resources*:

   ```yaml
   cpu:
     units: 2  # Down from 4
   memory:
     size: 8Gi  # Down from 16Gi
   storage:
     - size: 50Gi  # Down from 150Gi
   ```

-> **Opcional: Reduce los precios** en *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Habilitar acceso RPC

RPC está deshabilitado de forma predeterminada por seguridad. Para habilitarlo:

**Para Mainnet:**

-> Descomenta en la sección *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Descomenta el puerto RPC de Mainnet en *expose*:

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

**Para Testnet:**

-> Descomenta en la sección *env*:

   ```yaml
   - "ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232"
   - "ZEBRA_RPC__COOKIE_DIR=/home/zebra/.cache/zebra"
   ```

-> Descomenta el puerto RPC de Testnet en *expose*:

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Advertencia**: Si estableces *global: true* para RPC, lo estarás exponiendo a internet. Zebra usa autenticación mediante cookies de forma predeterminada, pero aun así, no lo hagas a menos que sepas lo que haces.

Si expones RPC con `global: true`, la dirección pública sigue siendo una **URI de arrendamiento** (`host:&lt;random-high-port&gt;`), no `host:8232`. Con `global: false` (esta plantilla), RPC permanece en la red de despliegue (`zebra:8232` para lightwalletd). Los arrendamientos de IP dedicada son una opción de pago independiente y no están incluidos en el SDL.

#### Habilitar métricas (Prometheus)

Para recopilar métricas de monitorización:

-> Descomenta en *env*:

   ```yaml
   - "ZEBRA_METRICS__ENDPOINT_ADDR=0.0.0.0:9999"
   ```

-> Descomenta el puerto de métricas en *expose*:

   ```yaml
   - port: 9999
     as: 9999
     to:
       - global: false
     proto: tcp
   ```

#### Ajustar recursos/precios

Si no recibes ofertas o quieres optimizar el coste:

**Para proveedores con especificaciones más bajas**, reduce en la sección *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (mínimo para una velocidad de sincronización razonable)

-> Memoria: *size: 12Gi* (mínimo para la estabilidad)

-> Almacenamiento: *size: 120Gi* (mínimo para mainnet)

**Para atraer más ofertas**, aumenta en *profiles.placement.akash.pricing*:

-> Mainnet: Prueba *amount: 1000000* uakt/block

-> Testnet: Prueba *amount: 1000000* uakt/block

### Actualizar tu despliegue

¿Necesitas cambiar la configuración después de desplegar?

-> Ve a **My Deployments** en Console

-> Busca tu despliegue de Zebra

-> Haz clic en **«Update Deployment»**

-> Edita el SDL

-> Haz clic en **«Update»** (Air: inicia sesión en Keplr; Console: confirma el flujo de pago web)

**Nota [Note]**: La actualización reiniciará tu contenedor. El nodo se reanudará desde su estado guardado (almacenamiento persistente), pero espera entre 1 y 2 minutos de inactividad.

### Monitorización

#### Mediante Console

-> Pestaña **Logs**: Registros en vivo del contenedor

-> Pestaña **Shell**: Obtén una shell dentro del contenedor (útil para depurar)

-> Pestaña **Events**: Eventos de Kubernetes (casi inútiles salvo que algo esté roto)


#### Mediante RPC (si está habilitado)

Si habilitaste RPC, puedes consultar tu nodo como un nodo completo normal de zebrad (¡porque lo es!)

### Cerrar tu despliegue

Cuando termines o quieras dejar de pagar:

-> Ve a **My Deployments**

-> Busca tu despliegue de Zebra

-> Haz clic en **«Close Deployment»**

-> Confirmar (Air: inicia sesión Keplr; Console: confirma en la interfaz de usuario de Console)

Se te reembolsará tu depósito de 5 AKT. El **almacenamiento persistente** debería conservarse por el proveedor, pero no dependas de ello: trátalo como cualquier otro proveedor de nube.

### Solución de problemas

#### Error «Insufficient funds»

En Air, financia Keplr con AKT/ACT. En Console, recarga el método de pago de Console.

#### No aparecen ofertas

Puede que:

-> Tus precios sean demasiado bajos (aumenta *amount* en SDL)

-> Tus requisitos de recursos sean demasiado altos para los proveedores disponibles (reduce CPU/memoria/almacenamiento)

-> Debas esperar más tiempo (a veces las ofertas tardan entre 60 y 90 segundos en aparecer)


#### El despliegue se queda en «pending»

El proveedor podría tener problemas. Cierra el despliegue e inténtalo con otro proveedor.

#### Los registros de Zebra muestran «No peers connected»

Esto es normal durante los primeros minutos. Zebra descubrirá pares automáticamente. Si persiste después de más de 10 minutos, podrías tener un problema de red (poco probable en Akash).

#### Errores «Out of memory» en los registros

Escatimaste en RAM. Cierra el despliegue y vuelve a desplegar con al menos 12 Gi de memoria (se recomiendan 16 Gi).

#### La sincronización tarda una eternidad

Define «eternidad»:

-> **Horas**: Normal

-> **Días**: También normal para mainnet desde cero

-> **Semanas**: Algo va mal; revisa los registros en busca de errores


### Gestión de costes

Supervisa tus gastos en Console o Air:

-> **My Deployments** -> Tu despliegue -> Muestra la estimación de «Cost per month»

-> Air: tu saldo de AKT/ACT de Keplr disminuye con el tiempo. Console: tu saldo de pagos de Console disminuye.

Cuando tu saldo sea bajo, Akash cerrará automáticamente tu despliegue. **Recarga [top up] tu billetera periódicamente** o configura alertas.

#### Reducir costes

-> **Usa Testnet** para pruebas no productivas (50 % más barato)

-> **Reduce CPU/memoria** si no necesitas una sincronización rápida

-> **Elige proveedores más baratos** (no siempre es prudente: el tiempo de actividad importa)


### Mainnet frente a Testnet

```markdown
----------------------------------------------------------------------------------
|            | Mainnet (default)               | Testnet                         |
---------------------------------------------------------------------------------|
| Purpose   | Production Zcash blockchain      | Testing and development         |
| Network   | ZEBRA_NETWORK__NETWORK=Mainnet   | ZEBRA_NETWORK__NETWORK=Testnet  |
| P2P Port  | 8233                             | 18233                           |
| RPC Port  | 8232                             | 18232                           |
| Sync time | Days                             | Hours                           |
| Storage   | 350GB+                           | 50GB                            |
| Resources | 4 CPU / 16GB RAM                 | 2 CPU / 8GB RAM                 |
| Cost      | ~$15/month                       | ~$5/month                       |
----------------------------------------------------------------------------------
```

Empieza con Testnet si solo estás probando el proceso de despliegue. Consulta la sección «Cambiar a Testnet» anterior para obtener la configuración.

### Recursos adicionales

**Akash Consola** (pagos web): [https://console.akash.network](https://console.akash.network)

**Akash Air** (AKT/ACT nativo + Keplr): [https://air.akash.network](https://air.akash.network)

**Documentación de Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentación de Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Exploradores de Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (para problemas con proveedores)
