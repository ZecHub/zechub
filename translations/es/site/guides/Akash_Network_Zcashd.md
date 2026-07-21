# Despliegue de zcashd en Akash mediante Console

Guía para desplegar un nodo completo de Zcash zcashd (implementación de Electric Coin Co) usando [Akash Console](https://console.akash.network). Aquí tienes un videotutorial a continuación. Más abajo encontrarás una guía más detallada.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Configuración de nodo completo de Zcash en Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Qué vas a desplegar

Un nodo completo zcashd que:

-> Sincronizará toda la blockchain de Zcash (350GB+ para mainnet, ~ 40GB para testnet)

-> Costará aproximadamente $15/mes dependiendo de los precios del token AKT

-> Tardará desde varias horas hasta días en sincronizarse por completo

-> Usará 4 vCPU, 16GB de RAM, 350GB de almacenamiento (mainnet) o 2 vCPU, 8GB de RAM, 50GB (testnet)

-> Descargará parámetros criptográficos en la primera ejecución (~ 2GB, una sola vez)

**zcashd vs Zebra:**

-> zcashd es la implementación original del nodo de Zcash por Electric Coin Co

-> Zebra es la implementación alternativa de Zcash Foundation

-> Ambas son compatibles con la red Zcash

-> zcashd tiene más funciones (minería, billetera, API de Insight Explorer)

-> Usa zcashd si necesitas funcionalidad de billetera o APIs RPC específicas


### **Importante: Mapeo de puertos en Akash**

Cuando expones un puerto en Akash (por ejemplo, el puerto 8233 para P2P de zcashd), **NO se enlaza a ese puerto exacto** en la IP pública del proveedor. En su lugar, el proveedor asigna un puerto alto aleatorio (como 31234 o 42567) y hace proxy inverso hacia el puerto 8233 de tu contenedor.

Esto es así por diseño: los proveedores ejecutan múltiples despliegues, y tendrían conflictos si todos intentaran usar directamente el puerto 8233.

**Qué significa esto para ti:**

-> Configuras el puerto 8233 en el SDL (el puerto P2P estándar de zcashd)

-> Akash te da una URI como *provider.com:31234*

-> Otros nodos de Zcash se conectan a ti en *provider.com:31234*

-> Dentro de tu contenedor, zcashd sigue escuchando en 8233


Esto se gestiona automáticamente. Solo usa la URI que Akash te proporcione.

## Requisitos previos

-> Extensión del navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)

-> **Tokens AKT** - Consigue 50-100 AKT en un exchange (Coinbase, Kraken, Osmosis)

-> **5 minutos** para hacer clic por la interfaz de Console


## Paso 1: Conecta tu billetera

-> Ve a [https://console.akash.network](https://console.akash.network)

-> Haz clic en **"Connect Wallet"** en la esquina superior derecha

-> Elige **Keplr** (o tu billetera Cosmos preferida)

-> Aprueba la conexión cuando aparezca la ventana emergente de Keplr


Tu saldo de AKT debería aparecer en la esquina superior derecha. Si es cero, primero recarga tu billetera.

## Paso 2: Crear despliegue

-> Haz clic en el botón **"Deploy"** (gran botón azul, en el centro de la página)

-> Elige **"Build your template"** (o pasa directamente a subir el SDL)

### Opción A: Subir archivo SDL (Recomendado)

[![Desplegar en Akash](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opción B: Usar el editor SDL

Si quieres pegar manualmente el SDL:

-> Copia el contenido de *zcashd-akash.yml*

-> Pégalo en el editor SDL

-> Modifícalo según sea necesario (consulta la sección de configuración más abajo)

-> Haz clic en **"Create Deployment"**


## Paso 3: Revisar y aprobar el depósito

Console te mostrará:

-> **Depósito del despliegue**: ~ 5 AKT (te lo devuelven cuando cierres el despliegue)

-> **Costo estimado**: Basado en el precio de tu SDL


Haz clic en **"Approve"** y firma la transacción en Keplr.

## Paso 4: Elegir un proveedor

Después de ~ 30 segundos, verás ofertas de los proveedores. Cada oferta muestra:

-> **Precio por bloque** (en AKT o USDC)

-> **Costo mensual estimado**

-> **Detalles del proveedor** (tiempo de actividad, región, etc.)


**No elijas simplemente el más barato.** Comprueba:

-> % de tiempo de actividad (apunta a > 95%)

-> Región (más cerca de ti = mejor latencia, pero no importa mucho para nodos blockchain)

-> Estado auditado (marca de verificación verde = más confiable)


Haz clic en **"Accept Bid"** en el proveedor que elijas y firma en Keplr.

## Paso 5: Espera el despliegue

Console:

-> Creará el lease con el proveedor que hayas elegido

-> Enviará el manifiesto (le dice al proveedor qué debe ejecutar)

-> Iniciará tu contenedor


Esto tarda 1-2 minutos. Verás actualizaciones de estado en la interfaz.

## Paso 6: Verificar que está funcionando

Una vez desplegado, verás:

-> Pestaña **Services**: Muestra tu servicio *zcashd* con su estado

-> Pestaña **Logs**: Registros en vivo de tu nodo zcashd

-> Pestaña **Leases**: Detalles sobre tu despliegue (DSEQ, proveedor, costo)


### Revisar los registros

Haz clic en **Logs** y deberías ver que zcashd se está iniciando:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**La primera ejecución descargará zcash-params (~2GB).** Esta es una operación que se realiza una sola vez y tarda entre 5 y 10 minutos dependiendo del ancho de banda del proveedor. Los reinicios posteriores la omitirán.

La sincronización tardará **de horas a días** dependiendo de la red. Observa:

-> Alturas de bloque en aumento

-> Conexiones de pares (deberían ser 10-30 pares)

-> Que no haya errores repetidos
## Paso 7: Obtén la dirección de tu nodo

Haz clic en la pestaña **Leases**, luego en **URIs**.

Verás algo como esto:

```
zcashd-8233: provider-hostname.com:31234
```

Este es el **endpoint P2P público** de tu nodo. Otros nodos de Zcash se conectarán a ti en esta dirección.

**Observa el mapeo de puertos:** Configuraste el puerto 8233 en el SDL, pero Akash lo asignó a un puerto público diferente (31234 en este ejemplo). Esto es normal; consulta la sección "Port Mapping on Akash" en la parte superior si esto te confunde. Tu nodo es accesible en el puerto que Akash muestre aquí, no necesariamente en el 8233.

Si habilitaste RPC (comentado por defecto en el SDL), también verás aquí el endpoint RPC con su propio puerto asignado.

## Opciones de configuración

### Cambiar a Testnet

El SDL usa Mainnet por defecto. Para usar Testnet en su lugar:

-> **Cambia la red en la sección *env*:**

   ```yaml
   # - "ZCASHD_NETWORK=mainnet"
   - "ZCASHD_NETWORK=testnet"
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

-> **Opcional: Reduce los recursos** para Testnet en *profiles.compute.zcashd.resources*:

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

> nota: bajar los precios puede hacer que nuestros proveedores no presenten ofertas. experimenta con este valor o usa el endpoint del proveedor para comprobar si ofertarían. (revisa la documentación de la API del proveedor)

### Habilitar acceso RPC

RPC está deshabilitado por defecto por seguridad. Para habilitarlo:

**CRÍTICO: Establece credenciales seguras.** El RPC de zcashd transmite nombre de usuario/contraseña por HTTP (no HTTPS). Expón RPC solo si entiendes las implicaciones de seguridad.

-> Descomenta en la sección *env*:

   ```yaml
   - "ZCASHD_RPCUSER=yourusername"
   - "ZCASHD_RPCPASSWORD=your_very_strong_password_here"  # Use a real password
   - "ZCASHD_RPCBIND=0.0.0.0"
   - "ZCASHD_RPCPORT=8232"  # Mainnet
   # - "ZCASHD_RPCPORT=18232"  # Testnet
   - "ZCASHD_ALLOWIP=0.0.0.0/0"  # Allow from anywhere (use with caution)
   ```

-> Descomenta el puerto RPC en *expose*:

   **Para Mainnet:**

   ```yaml
   - port: 8232
     as: 8232
     to:
       - global: false  # Keep internal for security
     proto: tcp
   ```

   **Para Testnet:**

   ```yaml
   - port: 18232
     as: 18232
     to:
       - global: false
     proto: tcp
   ```

**Advertencia**: Si configuras *global: true* para RPC, lo estarás exponiendo a internet con autenticación básica. Es una mala idea. Usa *global: false* y accede al RPC a través de la red interna de Akash o configura un túnel seguro.

**Recordatorio sobre el mapeo de puertos**: Incluso si expones RPC globalmente, Akash lo mapeará a un puerto alto aleatorio (no 8232/18232). Revisa las URIs en tu despliegue para ver el endpoint público real. Con *global: false* (recomendado), el endpoint RPC solo es accesible dentro de la red del despliegue de Akash, no desde la internet pública.

### Habilitar índice de transacciones

El índice de transacciones te permite consultar cualquier transacción por su ID mediante RPC. Usa más almacenamiento (~ aumento del 20%).

Descomenta en *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Advertencia**: Habilitar txindex en un nodo ya sincronizado requiere reindexar toda la blockchain, lo que toma horas.

### Habilitar Insight Explorer

Insight Explorer proporciona endpoints adicionales de API REST para datos de la blockchain (útil para exploradores de bloques).

Descomenta en *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Esto habilita automáticamente txindex y añade métodos RPC extra.

### Habilitar métricas de Prometheus

Para recopilar métricas para monitoreo:

-> Descomenta en *env*:

   ```bash
   - "ZCASHD_PROMETHEUSPORT=9969"
   - "ZCASHD_METRICSIP=0.0.0.0/0"
   ```

-> Descomenta el puerto de métricas en *expose*:

   ```bash
   - port: 9969
     as: 9969
     to:
       - global: false
     proto: tcp
   ```
   
Las métricas estarán disponibles en http://yourendpoint:9969/metrics en formato Prometheus.

### Ajustar recursos/precios

Si no estás recibiendo ofertas o quieres optimizar el costo:

**Para proveedores con menos recursos**, reduce en la sección *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para una velocidad de sincronización razonable)

-> Memoria: *size: 12Gi* (mínimo para estabilidad)

-> Almacenamiento: *size: 120Gi* (mínimo para mainnet)


**Para atraer más ofertas**, aumenta en *profiles.placement.akash.pricing*:

-> Mainnet: Prueba con *amount: 15000* uakt/block

-> Testnet: Prueba con *amount: 7500* uakt/block


Los valores del SDL están configurados de forma conservadoramente alta. La mayoría de los proveedores ofertarán por menos.

## Actualizar tu despliegue

¿Necesitas cambiar la configuración después de desplegar?

-> Ve a **My Deployments** en Console

-> Encuentra tu despliegue de zcashd

-> Haz clic en **"Update Deployment"**

-> Edita el SDL

-> Haz clic en **"Update"** y aprueba en Keplr


**Nota**: La actualización reiniciará tu contenedor. El nodo reanudará desde su estado guardado (almacenamiento persistente), pero espera 1-2 minutos de inactividad.
## Monitorización

### Vía Console

-> **Pestaña Logs**: Registros en vivo del contenedor

-> **Pestaña Shell**: Obtén una shell dentro del contenedor (útil para depuración)

-> **Pestaña Events**: Eventos de Kubernetes (casi siempre inútiles a menos que algo esté roto)


### Vía RPC (si está habilitado)

Si habilitaste RPC, puedes consultar tu nodo como un nodo completo normal de zcashd (¡porque lo es!)

### Alternativa a zcash-cli

Si tienes acceso a una shell mediante Console, puedes usar *zcash-cli* directamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Cerrar tu despliegue

Cuando hayas terminado o quieras dejar de pagar:

-> Ve a **My Deployments**

-> Encuentra tu despliegue de zcashd

-> Haz clic en **"Close Deployment"**

-> Confirma y firma en Keplr


Tu depósito de 5 AKT será reembolsado. El **almacenamiento persistente** debería ser preservado por el proveedor, pero no dependas de ello: trátalo como a cualquier otro proveedor cloud.

## Solución de problemas

### Error "Insufficient funds"

Necesitas más AKT. Fondea tu wallet de Keplr.

### No aparecen ofertas

Puede ser que:

-> Tu precio sea demasiado bajo (aumenta *amount* en SDL)

-> Tus requisitos de recursos sean demasiado altos para los proveedores disponibles (reduce CPU/memoria/almacenamiento)

-> Espera más tiempo (a veces tarda entre 60 y 90 segundos en que aparezcan ofertas)


### El despliegue se queda en "pending"

Es posible que el proveedor esté teniendo problemas. Cierra el despliegue y prueba con otro proveedor.

### Los logs de zcashd muestran "No peers connected"

Esto es normal durante los primeros minutos. zcashd descubrirá pares automáticamente. Si persiste después de más de 10 minutos, podrías tener un problema de red (poco probable en Akash).

### Errores de "Out of memory" en los logs

Ahorraste demasiado en RAM. Cierra el despliegue y vuelve a desplegar con al menos 12Gi de memoria (se recomiendan 16Gi).

### La sincronización está tardando una eternidad

Define "una eternidad":

-> **Horas**: Normal

-> **Días**: También es normal para mainnet desde cero

-> **Semanas**: Algo va mal, revisa los logs en busca de errores


### "Error fetching zcash-params"

Es posible que el proveedor tenga problemas de red o poco ancho de banda. Esto normalmente se resuelve solo. Si persiste durante más de 30 minutos, intenta volver a desplegar en otro proveedor.

### Fallos de autenticación RPC

-> Comprueba que *ZCASHD_RPCUSER* y *ZCASHD_RPCPASSWORD* estén configurados correctamente

-> Verifica que estés usando el puerto correcto (8232 para mainnet, 18232 para testnet)

-> Recuerda que Akash mapea los puertos: usa la URI de tu despliegue, no 8232 directamente


## Gestión de costos

Monitorea tu gasto en la Console:

-> **My Deployments** -> Tu despliegue -> Muestra la estimación de "Cost per month"

-> El saldo de tu wallet de Keplr disminuirá con el tiempo


Cuando tu saldo sea bajo, Akash cerrará automáticamente tu despliegue. **Recarga tu wallet periódicamente** o configura alertas.

### Reducir costos

-> **Usa Testnet** para pruebas no productivas (50% más barato)

-> **Reduce CPU/memoria** si no necesitas una sincronización rápida

-> **Elige proveedores más baratos** (no siempre es buena idea: la disponibilidad importa)

-> **Usa USDC en lugar de AKT** si el precio de AKT es volátil (requiere un cambio de precio en SDL)

-> **Desactiva txindex** si no lo necesitas (ahorra ~ 20% de almacenamiento)


### Recursos adicionales

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentación de Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores de Zcash**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord de Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas con proveedores)

## Notas finales

- **El almacenamiento persistente importa.** No omitas *persistent: true* ni uses la clase *beta2*. Usa *beta3*.
- **La sincronización inicial es lenta.** Ten paciencia. Esto es normal en los nodos blockchain.
- **Mantén tu wallet con fondos.** Los despliegues se cierran automáticamente cuando te quedas sin AKT.
- **Las copias de seguridad no son automáticas.** Si te importan los datos, asume que pueden desaparecer y planifica en consecuencia.
- **La seguridad de RPC es crítica.** No expongas RPC a internet sin las medidas de seguridad adecuadas.
- **zcash-params se almacenan en caché.** La primera ejecución descarga ~2GB de parámetros criptográficos. Esto es normal y solo ocurre una vez.
