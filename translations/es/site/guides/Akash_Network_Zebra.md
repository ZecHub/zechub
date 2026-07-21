# Cómo ejecutar Zebra en Akash Network

Guía paso a paso para desplegar un nodo completo Zebra de Zcash usando [Akash Console](https://console.akash.network).

### Qué vas a desplegar

Un nodo completo de Zebra que:

-> Sincronizará toda la blockchain de Zcash (100GB+ para mainnet, ~40GB para testnet)

-> Costará aproximadamente $15/mes dependiendo de los precios del token AKT

-> Tardará desde varias horas hasta días en sincronizarse por completo

-> Usará 4 vCPUs, 16GB RAM, 350GB de almacenamiento (mainnet) o 2 vCPUs, 8GB RAM, 50GB (testnet)


### Importante: Mapeo de puertos en Akash

Cuando expones un puerto en Akash (por ejemplo, el puerto 8233 para el P2P de Zebra), **NO se vincula a ese puerto exacto** en la IP pública del proveedor. En su lugar, el proveedor asigna un puerto alto aleatorio (como 31234 o 42567) y hace reverse-proxy hacia el puerto 8233 de tu contenedor.

Esto es así por diseño: los proveedores ejecutan múltiples despliegues, y habría conflictos si todos intentaran usar directamente el puerto 8233.

**Lo que esto significa para ti:**

-> Configuras el puerto 8233 en el SDL (el puerto P2P estándar de Zebra)

-> Akash te da una URI como *provider.com:31234*

-> Otros nodos de Zcash se conectan a ti en *provider.com:31234*

-> Dentro de tu contenedor, Zebra sigue escuchando en 8233


Esto se gestiona automáticamente. Simplemente usa la URI que Akash te proporcione.

### Requisitos previos

1. Extensión del navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)
2. **Tokens AKT** - Consigue entre 50 y 100 AKT en un exchange (Coinbase, Kraken, Osmosis)
3. **5 minutos** para hacer clic en la interfaz de Console

#### Paso 1: Conecta tu wallet

-> Ve a [https://console.akash.network](https://console.akash.network)

-> Haz clic en **"Connect Wallet"** arriba a la derecha

-> Elige **Keplr** (o tu wallet de Cosmos preferida)

-> Aprueba la conexión cuando aparezca Keplr


Tu saldo de AKT debería aparecer arriba a la derecha. Si es cero, primero recarga tu wallet.

#### Paso 2: Crear el despliegue

-> Haz clic en el botón **"Deploy"** (gran botón azul, en el centro de la página)

-> Elige **"Build your template"** (o pasa directamente a subir el SDL)


##### Opción A: Subir archivo SDL (recomendado)

[![Desplegar en Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opción B: Usar el editor SDL

Si quieres pegar manualmente [el SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copia el contenido de *zebra-akash.yml*

-> Pégalo en el editor SDL

-> Modifícalo según sea necesario (consulta la sección de configuración más abajo)

-> Haz clic en **"Create Deployment"**


#### Paso 3: Revisar y aprobar el depósito

La Console te mostrará:

-> **Depósito del despliegue**: ~5 AKT (lo recuperas cuando cierras el despliegue)

-> **Costo estimado**: Basado en el precio definido en tu SDL

Haz clic en **"Approve"** y firma la transacción en Keplr.

#### Paso 4: Elegir un proveedor

Después de ~ 30 segundos, verás ofertas de proveedores. Cada oferta muestra:

-> **Precio por bloque** (en AKT o USDC)

-> **Costo mensual estimado**

-> **Detalles del proveedor** (uptime, región, etc.)


**No elijas simplemente el más barato.** Revisa:

-> % de uptime (apunta a > 95%)

-> Región (más cerca de ti = mejor latencia, aunque para nodos blockchain no importa mucho)

-> Estado auditado (marca verde = más confiable)


Haz clic en **"Accept Bid"** en el proveedor que elijas y firma en Keplr.

#### Paso 5: Esperar el despliegue

La Console hará lo siguiente:

-> Creará el lease con el proveedor elegido

-> Enviará el manifest (le dice al proveedor qué ejecutar)

-> Iniciará tu contenedor

Esto tarda 1-2 minutos. Verás actualizaciones de estado en la interfaz.

#### Paso 6: Verificar que está en ejecución

Una vez desplegado, verás:

-> Pestaña **Services**: Muestra tu servicio *zebra* con su estado

-> Pestaña **Logs**: Logs en vivo del contenedor

-> Pestaña **Leases**: Detalles sobre tu despliegue (DSEQ, proveedor, costo)


##### Revisar los logs

Haz clic en **Logs** y deberías ver Zebra iniciándose:

```bash
Loading config from environment variables
Mainnet network selected
Listening for peer connections on [::]:8233
Starting initial sync...
```

La sincronización tardará **de horas a días** dependiendo de la red. Observa:

-> Alturas de bloque en aumento

-> Conexiones de pares (deberían ser 10-30 pares)

-> Ausencia de errores repetidos


#### Paso 7: Obtener la dirección de tu nodo

Haz clic en la pestaña **Leases**, luego en **URIs**.

Verás algo como:

```bash
zebra-8233: provider-hostname.com:31234
```

Este es el **endpoint P2P público** de tu nodo. Otros nodos de Zcash se conectarán a ti en esta dirección.

**Ten en cuenta el mapeo de puertos:** Configuraste el puerto 8233 en el SDL, pero Akash lo asignó a un puerto público diferente (31234 en este ejemplo). Esto es normal; consulta la sección "Mapeo de puertos en Akash" al principio si esto te confunde. Tu nodo es accesible en el puerto que Akash muestre aquí, no necesariamente en 8233.

Si habilitaste RPC (comentado por defecto en el SDL), también verás aquí el endpoint RPC con su propio puerto mapeado.

### Opciones de configuración

#### Cambiar a Testnet

El SDL usa Mainnet por defecto. Para usar Testnet en su lugar:

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

-> **Opcional: Baja el precio** en *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

#### Habilitar acceso RPC

RPC está deshabilitado por defecto por seguridad. Para habilitarlo:

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

**Advertencia**: Si estableces *global: true* para RPC, lo estás exponiendo a internet. Zebra usa autenticación por cookie por defecto, pero aun así, no lo hagas a menos que sepas lo que estás haciendo.

**Recordatorio sobre el mapeo de puertos**: Incluso si expones RPC globalmente, Akash lo mapeará a un puerto alto aleatorio (no 8232/18232). Revisa las URI en tu despliegue para ver el endpoint público real. Para *global: false* (recomendado), el endpoint RPC solo es accesible dentro de la red de despliegue de Akash, no desde la internet pública.

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

#### Ajustar recursos/precio

Si no estás recibiendo ofertas o quieres optimizar el costo:

**Para proveedores con menos recursos**, reduce en la sección *profiles.compute.zebra.resources*:

-> CPU: *units: 2* (mínimo para una velocidad de sincronización razonable)

-> Memoria: *size: 12Gi* (mínimo para estabilidad)

-> Almacenamiento: *size: 120Gi* (mínimo para mainnet)

**Para atraer más ofertas**, aumenta en *profiles.placement.akash.pricing*:

-> Mainnet: Prueba con *amount: 1000000* uakt/block

-> Testnet: Prueba con *amount: 1000000* uakt/block

### Actualizar tu despliegue

¿Necesitas cambiar la configuración después de desplegar?

-> Ve a **My Deployments** en Console

-> Encuentra tu despliegue de Zebra

-> Haz clic en **"Update Deployment"**

-> Edita el SDL

-> Haz clic en **"Update"** y aprueba en Keplr

**Nota**: Al actualizar se reiniciará tu contenedor. El nodo reanudará desde su estado guardado (almacenamiento persistente), pero espera 1-2 minutos de inactividad.

### Monitorización

#### Vía Console

-> Pestaña **Logs**: Logs en vivo del contenedor

-> Pestaña **Shell**: Obtén una shell dentro del contenedor (útil para depuración)

-> Pestaña **Events**: Eventos de Kubernetes (casi inútiles a menos que algo esté roto)


#### Vía RPC (si está habilitado)

Si habilitaste RPC, puedes consultar tu nodo como un nodo completo normal de zebrad (¡porque lo es!)

### Cerrar tu despliegue

Cuando termines o quieras dejar de pagar:

-> Ve a **My Deployments**

-> Encuentra tu despliegue de Zebra

-> Haz clic en **"Close Deployment"**

-> Confirma y firma en Keplr

Tu depósito de 5 AKT será reembolsado. El **almacenamiento persistente** debería conservarse por parte del proveedor, pero no confíes en ello: trátalo como a cualquier otro proveedor cloud.

### Solución de problemas

#### Error "Insufficient funds"

Necesitas más AKT. Recarga tu wallet de Keplr.

#### No aparecen ofertas

Puede ser que:

-> Tu precio es demasiado bajo (aumenta *amount* en el SDL)

-> Tus requisitos de recursos son demasiado altos para los proveedores disponibles (reduce CPU/memoria/almacenamiento)

-> Espera más tiempo (a veces las ofertas tardan 60-90 segundos en aparecer)


#### El despliegue se queda en "pending"

Es posible que el proveedor tenga problemas. Cierra el despliegue y prueba con otro proveedor.

#### Los logs de Zebra muestran "No peers connected"

Esto es normal durante los primeros minutos. Zebra descubrirá pares automáticamente. Si persiste después de 10+ minutos, podrías tener un problema de red (poco probable en Akash).

#### Errores "Out of memory" en los logs

Escatimaste demasiado en RAM. Cierra el despliegue y vuelve a desplegar con al menos 12Gi de memoria (se recomiendan 16Gi).

#### La sincronización tarda eternamente

Define "eternamente":

-> **Horas**: Normal

-> **Días**: También es normal para mainnet desde cero

-> **Semanas**: Algo va mal, revisa los logs en busca de errores


### Gestión de costos

Supervisa tu gasto en la Console:

-> **My Deployments** -> Tu despliegue -> Muestra la estimación de "Cost per month"

-> El saldo de tu wallet de Keplr disminuirá con el tiempo


Cuando tu saldo sea bajo, Akash cerrará automáticamente tu despliegue. **Recarga tu wallet periódicamente** o configura alertas.

#### Reducir costos

-> **Usa Testnet** para pruebas no productivas (50% más barato)

-> **Reduce CPU/memoria** si no necesitas una sincronización rápida

-> **Elige proveedores más baratos** (no siempre es buena idea: el uptime importa)


### Mainnet vs Testnet

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

Empieza con Testnet si solo estás probando el proceso de despliegue. Consulta la sección "Cambiar a Testnet" de arriba para la configuración.

### Recursos adicionales

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentación de Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentación de Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Exploradores de Zcash**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord de Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas con proveedores)
