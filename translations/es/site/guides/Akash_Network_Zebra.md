# Cómo ejecutar Zebra en Akash Network

Guía paso a paso para desplegar un nodo completo [full node] de Zebra Zcash usando [Akash Console](https://console.akash.network).

### Qué estás desplegando

Un nodo completo de Zebra que:

-> Sincronizará toda la blockchain [blockchain] de Zcash (más de 100 GB para mainnet, ~40 GB para testnet)

-> Costará aproximadamente $15/mes según los precios del token [token] AKT

-> Tardará de varias horas a días en sincronizarse por completo

-> Usará 4 vCPU, 16 GB de RAM, 350 GB de almacenamiento (mainnet) o 2 vCPU, 8 GB de RAM, 50 GB (testnet)


### Importante: Mapeo de puertos en Akash

Cuando expones un puerto en Akash (p. ej., el puerto 8233 para Zebra P2P), **NO se vincula a ese puerto exacto** en la IP pública del proveedor. En su lugar, el proveedor asigna un puerto alto aleatorio (como 31234 o 42567) y lo redirige mediante proxy inverso al puerto 8233 de tu contenedor.

Esto es así por diseño: los proveedores ejecutan varios despliegues y habría conflictos si todos intentaran usar el puerto 8233 directamente.

**Lo que esto significa para ti:**

-> Configuras el puerto 8233 en el SDL (el puerto P2P estándar de Zebra)

-> Akash te proporciona una URI como *provider.com:31234*

-> Otros nodos [nodes] de Zcash se conectan a ti en *provider.com:31234*

-> Dentro de tu contenedor, Zebra sigue escuchando en el 8233


Esto se gestiona automáticamente. Solo usa la URI que Akash te proporciona.

### Requisitos previos

1. Extensión de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)
2. **Tokens AKT**: Obtén entre 50 y 100 AKT de un exchange [exchange] (Coinbase, Kraken, Osmosis)
3. **5 minutos** para navegar por la interfaz de Console

#### Paso 1: Conecta tu billetera [wallet]

-> Ve a [https://console.akash.network](https://console.akash.network)

-> Haz clic en **«Connect Wallet»** en la parte superior derecha

-> Elige **Keplr** (o tu billetera Cosmos preferida)

-> Aprueba la conexión cuando aparezca Keplr


Tu saldo de AKT debería aparecer en la parte superior derecha. Si es cero, primero añade fondos a tu billetera.

#### Paso 2: Crea el despliegue

-> Haz clic en el botón **«Deploy»** (botón azul grande, en el centro de la página)

-> Elige **«Build your template»** (o pasa directamente a cargar el SDL)


##### Opción A: Cargar archivo SDL (recomendado)

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zebra)

##### Opción B: Usar el editor SDL

Si quieres pegar manualmente [el SDL](https://github.com/akash-network/awesome-akash/blob/master/zcash-zebra/deploy.yaml):

-> Copia el contenido de *zebra-akash.yml*

-> Pégalo en el editor SDL

-> Modifícalo según sea necesario (consulta la sección de configuración a continuación)

-> Haz clic en **«Create Deployment»**


#### Paso 3: Revisa y aprueba el depósito

Console te mostrará:

-> **Depósito del despliegue**: ~5 AKT (lo recuperarás cuando cierres el despliegue)

-> **Coste estimado**: Basado en los precios de tu SDL

Haz clic en **«Approve»** y firma la transacción [transaction] en Keplr.

#### Paso 4: Elige un proveedor

Después de unos 30 segundos, verás ofertas de los proveedores. Cada oferta muestra:

-> **Precio por bloque [block]** (en AKT o USDC)

-> **Coste mensual estimado**

-> **Detalles del proveedor** (tiempo de actividad, región, etc.)


**No elijas simplemente el más barato.** Comprueba:

-> Porcentaje de tiempo de actividad (procura que sea > 95 %)

-> Región (cuanto más cerca de ti, mejor latencia, aunque no importa mucho para los nodos de blockchain)

-> Estado auditado (marca de verificación verde = más confiable)


Haz clic en **«Accept Bid»** en el proveedor elegido y firma en Keplr.

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

```bash
zebra-8233: provider-hostname.com:31234
```

Este es el **endpoint P2P público** de tu nodo. Otros nodos de Zcash se conectarán a ti en esta dirección.

**Ten en cuenta el mapeo de puertos:** Configuraste el puerto 8233 en el SDL, pero Akash lo asignó a un puerto público diferente (31234 en este ejemplo). Esto es normal; consulta la sección «Mapeo de puertos en Akash» al principio si te resulta confuso. Tu nodo es accesible en el puerto que Akash muestra aquí, no necesariamente en el 8233.

Si habilitaste RPC (comentado de forma predeterminada en el SDL), también verás aquí el endpoint RPC con su propio puerto mapeado.

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

**Recordatorio sobre el mapeo de puertos**: Aunque expongas RPC globalmente, Akash lo mapeará a un puerto alto aleatorio (no 8232/18232). Consulta las URI de tu despliegue para ver el endpoint público real. Para *global: false* (recomendado), el endpoint RPC solo es accesible dentro de la red de despliegue de Akash, no desde internet público.

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

-> Haz clic en **«Update»** y aprueba en Keplr

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

-> Confirma y firma en Keplr

Se te reembolsará tu depósito de 5 AKT. El **almacenamiento persistente** debería conservarse por el proveedor, pero no dependas de ello: trátalo como cualquier otro proveedor de nube.

### Solución de problemas

#### Error «Insufficient funds»

Necesitas más AKT. Añade fondos a tu billetera Keplr.

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

Supervisa tus gastos en Console:

-> **My Deployments** -> Tu despliegue -> Muestra la estimación de «Cost per month»

-> El saldo de tu billetera Keplr disminuirá con el tiempo


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

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentación de Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Documentación de Zebra**: [https://zebra.zfnd.org/](https://zebra.zfnd.org/)

**Exploradores de Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Akash Discord**: [https://discord.akash.network](https://discord.akash.network) (para problemas con proveedores)
