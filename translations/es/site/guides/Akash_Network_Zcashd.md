# Desplegando zcashd en Akash mediante Console

> **Obsoleto. No sigas esta guía para desplegar un nodo que tengas intención de usar.**
>
> zcashd alcanzó su detención automática por Fin de Soporte el 18 de julio de 2026. Un nodo zcashd desplegado hoy no se sincronizará con la punta de la cadena, por lo que el despliegue cuesta dinero cada mes y no produce nada.
>
> Despliega **Zebra** en su lugar: [Cómo ejecutar Zebra en Akash Network](/guides/akash-network-zebra), que cubre el mismo flujo de trabajo de Akash Console y necesita aproximadamente un tercio del disco. Si estás moviendo una configuración existente, consulta la [guía de migración de zcashd a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página se conserva como un registro histórico del despliegue de zcashd.

Guía para desplegar un nodo completo de Zcash con zcashd (implementación de Electric Coin Co) usando [Akash Console](https://console.akash.network). Aquí tienes un videotutorial a continuación. Más abajo puedes encontrar una guía más detallada.

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


## Qué estás desplegando

Un nodo completo zcashd que:

-> Sincronizará toda la blockchain de Zcash (350GB+ para mainnet, ~ 40GB para testnet)

-> Costará aproximadamente $15/mes dependiendo de los precios del token AKT

-> Tardará de varias horas a días en sincronizarse por completo

-> Usará 4 vCPU, 16GB de RAM, 350GB de almacenamiento (mainnet) o 2 vCPU, 8GB de RAM, 50GB (testnet)

-> Descargará parámetros criptográficos en la primera ejecución (~ 2GB, una sola vez)

**zcashd vs Zebra:**

-> zcashd fue la implementación original del nodo de Zcash de Electric Coin Co, detenida desde el 18 de julio de 2026

-> Zebra, de la Zcash Foundation, es el nodo completo que se usa hoy

-> Solo Zebra sigue la cadena actual; un nodo zcashd no puede alcanzar la punta

-> La wallet de zcashd ha sido reemplazada por [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Usa zcashd si necesitas funcionalidad de wallet o APIs RPC específicas


### **Importante: Mapeo de puertos en Akash**

Cuando expones un puerto en Akash (por ejemplo, el puerto 8233 para el P2P de zcashd), **NO se enlaza a ese puerto exacto** en la IP pública del proveedor. En su lugar, el proveedor asigna un puerto alto aleatorio (como 31234 o 42567) y hace reverse proxy hacia el puerto 8233 de tu contenedor.

Esto es intencional: los proveedores ejecutan múltiples despliegues, y habría conflictos si todos intentaran usar el puerto 8233 directamente.

**Lo que esto significa para ti:**

-> Configuras el puerto 8233 en el SDL (el puerto P2P estándar de zcashd)

-> Akash te da una URI como *provider.com:31234*

-> Otros nodos de Zcash se conectan a ti en *provider.com:31234*

-> Dentro de tu contenedor, zcashd sigue escuchando en 8233


Esto se gestiona automáticamente. Solo usa la URI que Akash te proporcione.

## Prerrequisitos

-> **Keplr Wallet** extensión de navegador instalada (Chrome/Brave/Firefox)

-> **Tokens AKT** - Consigue 50-100 AKT en un exchange (Coinbase, Kraken, Osmosis)

-> **5 minutos** para hacer clic en la interfaz de Console


## Paso 1: Conecta tu wallet

-> Ve a [https://console.akash.network](https://console.akash.network)

-> Haz clic en **"Connect Wallet"** arriba a la derecha

-> Elige **Keplr** (o tu wallet Cosmos preferida)

-> Aprueba la conexión cuando aparezca Keplr


Tu saldo de AKT debería aparecer arriba a la derecha. Si es cero, primero deposita fondos en tu wallet.

## Paso 2: Crea el despliegue

-> Haz clic en el botón **"Deploy"** (botón azul grande, en el centro de la página)

-> Elige **"Build your template"** (o pasa directamente a subir el SDL)

### Opción A: Subir archivo SDL (Recomendado)

> **Este botón despliega un nodo detenido.** Cobrará contra tu saldo de AKT por un nodo que no puede sincronizarse. Usa la [guía de Zebra](/guides/akash-network-zebra) en su lugar.

[![Desplegar en Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opción B: Usar el editor SDL

Si quieres pegar el SDL manualmente:

-> Copia el contenido de *zcashd-akash.yml*

-> Pégalo en el editor SDL

-> Modifícalo según sea necesario (consulta la sección de configuración más abajo)

-> Haz clic en **"Create Deployment"**


## Paso 3: Revisa y aprueba el depósito

Console te mostrará:

-> **Depósito del despliegue**: ~ 5 AKT (lo recuperas cuando cierras el despliegue)

-> **Costo estimado**: Basado en los precios de tu SDL


Haz clic en **"Approve"** y firma la transacción en Keplr.

## Paso 4: Elige un proveedor

Después de ~ 30 segundos, verás ofertas de proveedores. Cada oferta muestra:

-> **Precio por bloque** (en AKT o USDC)

-> **Costo mensual estimado**

-> **Detalles del proveedor** (uptime, región, etc.)


**No elijas simplemente el más barato.** Revisa:

-> % de uptime (apunta a > 95%)

-> Región (más cerca de ti = mejor latencia, pero no importa mucho para nodos de blockchain)

-> Estado auditado (marca de verificación verde = más confiable)


Haz clic en **"Accept Bid"** en el proveedor que elijas y firma en Keplr.

## Paso 5: Espera el despliegue

Console:

-> Creará el lease con el proveedor que elegiste

-> Enviará el manifest (le dice al proveedor qué ejecutar)

-> Iniciará tu contenedor


Esto tarda 1-2 minutos. Verás actualizaciones de estado en la interfaz.

## Paso 6: Verifica que esté en ejecución

Una vez desplegado, verás:

-> Pestaña **Services**: Muestra tu servicio *zcashd* con su estado

-> Pestaña **Logs**: Logs en vivo de tu nodo zcashd

-> Pestaña **Leases**: Detalles sobre tu despliegue (DSEQ, proveedor, costo)


### Revisa los logs

Haz clic en **Logs** y deberías ver que zcashd está arrancando:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**La primera ejecución descargará zcash-params (~2GB).** Esta es una operación que se realiza una sola vez y tarda entre 5 y 10 minutos dependiendo del ancho de banda del proveedor. Los reinicios posteriores omitirán este paso.

La sincronización tardará **de horas a días** dependiendo de la red. Observa:

-> Alturas de bloque en aumento

-> Conexiones de pares (deberían ser 10-30 pares)

-> Sin errores repetidos


## Paso 7: Obtén la dirección de tu nodo

Haz clic en la pestaña **Leases**, luego en **URIs**.

Verás algo como:

```
zcashd-8233: provider-hostname.com:31234
```

Este es el **endpoint P2P público** de tu nodo. Otros nodos de Zcash se conectarán a ti en esa dirección.

**Observa el mapeo de puertos:** Configuraste el puerto 8233 en el SDL, pero Akash lo asignó a un puerto público diferente (31234 en este ejemplo). Esto es normal: consulta la sección "Mapeo de puertos en Akash" al principio si esto te confunde. Tu nodo es accesible en el puerto que Akash muestre aquí, no necesariamente en 8233.

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

-> **Opcional: Reduce recursos** para Testnet en *profiles.compute.zcashd.resources*:

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

> nota: bajar los precios puede impedir que nuestros proveedores hagan ofertas. experimenta con este valor, o usa el endpoint del proveedor para comprobar si ofertarían. (revisa la documentación de la api del proveedor)

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

**Advertencia**: Si estableces *global: true* para RPC, lo estás exponiendo a internet con autenticación básica. Es una mala idea. Usa *global: false* y accede a RPC a través de la red interna de Akash o configura un túnel seguro.

**Recordatorio sobre el mapeo de puertos**: Incluso si expones RPC globalmente, Akash lo mapeará a un puerto alto aleatorio (no 8232/18232). Revisa las URIs de tu despliegue para ver el endpoint público real. Con *global: false* (recomendado), el endpoint RPC solo es accesible dentro de la red de despliegue de Akash, no desde la internet pública.

### Habilitar índice de transacciones

El índice de transacciones te permite consultar cualquier transacción por su ID a través de RPC. Usa más almacenamiento (~ 20% más).

Descomenta en *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Advertencia**: Habilitar txindex en un nodo ya sincronizado requiere reindexar toda la blockchain, lo que lleva horas.

### Habilitar Insight Explorer

Insight Explorer proporciona endpoints API REST adicionales para datos de la blockchain (útil para exploradores de bloques).

Descomenta en *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Esto habilita automáticamente txindex y agrega métodos RPC adicionales.

### Habilitar métricas Prometheus

Para recolectar métricas para monitoreo:

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

### Ajustar recursos/precio

Si no estás recibiendo ofertas o quieres optimizar costos:

**Para proveedores con menos especificaciones**, reduce en la sección *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para una velocidad de sincronización razonable)

-> Memoria: *size: 12Gi* (mínimo para estabilidad)

-> Almacenamiento: *size: 120Gi* (mínimo para mainnet)


**Para atraer más ofertas**, aumenta en *profiles.placement.akash.pricing*:

-> Mainnet: Prueba *amount: 15000* uakt/block

-> Testnet: Prueba *amount: 7500* uakt/block


Los valores del SDL están configurados conservadoramente altos. La mayoría de los proveedores ofertarán por menos.

## Actualizar tu despliegue

¿Necesitas cambiar la configuración después de desplegar?

-> Ve a **My Deployments** en Console

-> Encuentra tu despliegue de zcashd

-> Haz clic en **"Update Deployment"**

-> Edita el SDL

-> Haz clic en **"Update"** y aprueba en Keplr


**Nota**: Actualizar reiniciará tu contenedor. El nodo reanudará desde su estado guardado (almacenamiento persistente), pero espera 1-2 minutos de inactividad.

## Monitoreo

### Mediante Console

-> Pestaña **Logs**: Logs en vivo del contenedor

-> Pestaña **Shell**: Obtén una shell dentro del contenedor (útil para depuración)

-> Pestaña **Events**: Eventos de Kubernetes (casi inútiles a menos que algo esté roto)


### Mediante RPC (si está habilitado)

Si habilitaste RPC, puedes consultar tu nodo como un nodo completo zcashd normal (¡porque lo es!)

### Alternativa a zcash-cli

Si tienes acceso a shell a través de Console, puedes usar *zcash-cli* directamente:

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


Tu depósito de 5 AKT será reembolsado. El **almacenamiento persistente** debería conservarse por parte del proveedor, pero no dependas de ello: trátalo como cualquier otro proveedor cloud.

## Solución de problemas

### Error "Insufficient funds"

Necesitas más AKT. Deposita fondos en tu wallet de Keplr.

### No aparecen ofertas

Puede ser que:

-> Tu precio sea demasiado bajo (aumenta *amount* en el SDL)

-> Tus requisitos de recursos sean demasiado altos para los proveedores disponibles (reduce CPU/memoria/almacenamiento)

-> Espera más tiempo (a veces las ofertas tardan 60-90 segundos en aparecer)


### El despliegue se queda en "pending"

El proveedor podría estar teniendo problemas. Cierra el despliegue e inténtalo con otro proveedor.

### Los logs de zcashd muestran "No peers connected"

Desde la detención por Fin de Soporte del 18 de julio de 2026, este es el estado permanente esperado en lugar de un retraso de arranque, y no hay cantidad de espera o redespliegue que lo arregle. Despliega [Zebra](/guides/akash-network-zebra) en su lugar.

### Errores de "Out of memory" en los logs

Te quedaste demasiado corto de RAM. Cierra el despliegue y vuelve a desplegar con al menos 12Gi de memoria (16Gi recomendado).

### La sincronización está tardando una eternidad

Define "una eternidad":

-> **Horas**: Normal

-> **Días**: También normal para mainnet desde cero

-> **Semanas**: Algo va mal, revisa los logs en busca de errores


### "Error fetching zcash-params"

El proveedor podría tener problemas de red o ancho de banda lento. Esto normalmente se resuelve solo. Si persiste durante más de 30 minutos, prueba a volver a desplegar con otro proveedor.

### Fallos de autenticación RPC

-> Comprueba que *ZCASHD_RPCUSER* y *ZCASHD_RPCPASSWORD* estén configurados correctamente

-> Verifica que estás usando el puerto correcto (8232 para mainnet, 18232 para testnet)

-> Recuerda que Akash mapea los puertos: usa la URI de tu despliegue, no 8232 directamente


## Gestión de costos

Monitorea tu gasto en Console:

-> **My Deployments** -> Tu despliegue -> Muestra la estimación de "Cost per month"

-> El saldo de tu wallet de Keplr disminuirá con el tiempo


Cuando tu saldo sea bajo, Akash cerrará automáticamente tu despliegue. **Recarga tu wallet periódicamente** o configura alertas.

### Reducir costos

-> **Usa Testnet** para pruebas no productivas (50% más barato)

-> **Reduce CPU/memoria** si no necesitas sincronización rápida

-> **Elige proveedores más baratos** (no siempre es buena idea; el uptime importa)

-> **Usa USDC en lugar de AKT** si el precio de AKT es volátil (requiere cambiar el precio en el SDL)

-> **Deshabilita txindex** si no lo necesitas (ahorra ~ 20% de almacenamiento)


### Recursos adicionales

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentación de Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores de Zcash**: [https://zechub.wiki/using-zcash/blockchain-explorers](https://zechub.wiki/using-zcash/blockchain-explorers)

**Discord de Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas con proveedores)

## Notas finales

- **El almacenamiento persistente importa.** No omitas *persistent: true* ni uses la clase *beta2*. Usa *beta3*.
- **La sincronización inicial es lenta.** Ten paciencia. Esto es normal para los nodos de blockchain.
- **Mantén tu wallet con fondos.** Los despliegues se cierran automáticamente cuando te quedas sin AKT.
- **Los backups no son automáticos.** Si te importan los datos, asume que pueden desaparecer y planifica en consecuencia.
- **La seguridad de RPC es crítica.** No expongas RPC a internet sin medidas de seguridad adecuadas.
- **zcash-params se almacenan en caché.** La primera ejecución descarga ~2GB de parámetros criptográficos. Esto es normal y solo sucede una vez.
