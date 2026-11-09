# Despliegue de zcashd en Akash mediante Console

> **Obsoleto. No sigas esta guía para desplegar un nodo que pretendas usar.**
>
> zcashd alcanzó su detención automática por fin de soporte el 18 de julio de 2026. Un nodo zcashd desplegado hoy no se sincronizará con la punta de la cadena, por lo que el despliegue cuesta dinero cada mes y no produce nada.
>
> Despliega **Zebra** en su lugar: [Cómo ejecutar Zebra en Akash Network](/guides/akash-network-zebra), que cubre el mismo flujo de trabajo de Akash Console y necesita aproximadamente un tercio del disco. Si estás trasladando una configuración existente, consulta la guía de migración de [zcashd a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página se conserva como registro histórico del despliegue de zcashd.

Guía para desplegar un nodo completo [full node] zcashd Zcash (implementación Electric Coin Co) mediante [Akash Console](https://console.akash.network). A continuación hay un tutorial en video. Más abajo encontrarás una guía más detallada.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/SVekeNU6_-g"
    title="Zcash Configuración de nodo completo en Akash Network"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Lo Que Estás Desplegando

Un nodo completo zcashd que:

-> Sincronizará toda la blockchain [blockchain] Zcash (más de 350 GB para mainnet, ~ 40 GB para testnet)

-> Costará aproximadamente $15/mes dependiendo de los precios de los tokens AKT

-> Tardará de varias horas a días en sincronizarse por completo

-> Usará 4 vCPU, 16 GB de RAM, 350 GB de almacenamiento (mainnet) o 2 vCPU, 8 GB de RAM, 50 GB (testnet)

-> Descargará parámetros criptográficos en la primera ejecución (~ 2 GB, una sola vez)

**zcashd frente a Zebra:**

-> zcashd fue la implementación original del nodo Zcash de Electric Coin Co, detenida desde el 18 de julio de 2026

-> Zebra, de la Zcash Foundation, es el nodo completo que se utiliza hoy

-> Solo Zebra sigue la cadena actual; un nodo zcashd no puede alcanzar la punta

-> La billetera [wallet] de zcashd ha sido reemplazada por [Zallet](/using-zcash/zallet-quick-reference-guide)

-> Usa zcashd si necesitas funcionalidades de billetera o API RPC específicas


### **Importante: Mapeo de Puertos en Akash**

Cuando expones un puerto en Akash (p. ej., el puerto 8233 para P2P de zcashd), **NO se vincula a ese puerto exacto** en la IP pública del proveedor. En su lugar, el proveedor asigna un puerto alto aleatorio (como 31234 o 42567) y lo conecta mediante proxy inverso al puerto 8233 de tu contenedor.

Esto es intencional: los proveedores ejecutan varios despliegues y habría conflictos si todos intentaran usar directamente el puerto 8233.

**Lo que esto significa para ti:**

-> Configuras el puerto 8233 en el SDL (el puerto P2P estándar de zcashd)

-> Akash te proporciona una URI como *provider.com:31234*

-> Otros nodos Zcash se conectan contigo en *provider.com:31234*

-> Dentro de tu contenedor, zcashd sigue escuchando en el puerto 8233


Esto se gestiona automáticamente. Solo usa la URI que Akash te proporcione.

## Requisitos Previos

-> Extensión de navegador **Keplr Wallet** instalada (Chrome/Brave/Firefox)

-> **Tokens AKT**: Obtén entre 50 y 100 AKT de un exchange [exchange] (Coinbase, Kraken, Osmosis)

-> **5 minutos** para hacer clic en la interfaz de Console


## Paso 1: Conecta Tu Billetera

-> Ve a [https://console.akash.network](https://console.akash.network)

-> Haz clic en **«Connect Wallet»** en la esquina superior derecha

-> Elige **Keplr** (o tu billetera Cosmos preferida)

-> Aprueba la conexión cuando aparezca Keplr


Tu saldo de AKT debería aparecer en la esquina superior derecha. Si es cero, primero añade fondos a tu billetera.

## Paso 2: Crea el Despliegue

-> Haz clic en el botón **«Deploy»** (botón azul grande, en el centro de la página)

-> Elige **«Build your template»** (o ve directamente a cargar el SDL)

### Opción A: Cargar Archivo SDL (Recomendado)

> **Este botón despliega un nodo detenido.** Cobra de tu saldo de AKT por un nodo que no puede sincronizarse. Usa en su lugar la guía [Zebra](/guides/akash-network-zebra).

[![Deploy on Akash](/content-images/deploy-with-akash-btn-74abb88d44.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zcashd)

### Opción B: Usar el Editor SDL

Si quieres pegar manualmente el SDL:

-> Copia el contenido de *zcashd-akash.yml*

-> Pégalo en el editor SDL

-> Modifícalo según sea necesario (consulta la sección de configuración a continuación)

-> Haz clic en **«Create Deployment»**


## Paso 3: Revisa y Aprueba el Depósito

Console te mostrará:

-> **Depósito de despliegue**: ~ 5 AKT (recuperas esto cuando cierras el despliegue)

-> **Costo estimado**: Basado en los precios de tu SDL


Haz clic en **«Approve»** y firma la transacción [transaction] en Keplr.

## Paso 4: Elige un Proveedor

Después de ~ 30 segundos, verás ofertas de proveedores. Cada oferta muestra:

-> **Precio por bloque** (en AKT o USDC)

-> **Costo mensual estimado**

-> **Detalles del proveedor** (tiempo de actividad, región, etc.)


**No elijas simplemente el más barato.** Comprueba:

-> Porcentaje de tiempo de actividad (apunta a > 95%)

-> Región (cuanto más cerca de ti, mejor latencia, aunque no importa mucho para los nodos de blockchain)

-> Estado auditado (marca de verificación verde = más confiable)


Haz clic en **«Accept Bid»** en el proveedor que elijas y firma en Keplr.

## Paso 5: Espera el Despliegue

Console hará lo siguiente:

-> Creará el arrendamiento con el proveedor elegido

-> Enviará el manifiesto (indica al proveedor qué ejecutar)

-> Iniciará tu contenedor


Esto tarda entre 1 y 2 minutos. Verás actualizaciones de estado en la interfaz.

## Paso 6: Verifica Que Está en Ejecución

Una vez desplegado, verás:

-> Pestaña **Services**: Muestra tu servicio *zcashd* con su estado

-> Pestaña **Logs**: Registros en vivo de tu nodo zcashd

-> Pestaña **Leases**: Detalles de tu despliegue (DSEQ, proveedor, costo)


### Comprueba los Registros

Haz clic en **Logs** y deberías ver que zcashd se inicia:

```bash
[zcashd]: ZCASHD_NETWORK=mainnet
[zcashd]: Starting: zcashd -printtoconsole -showmetrics=1
...
```

**La primera ejecución descargará zcash-params (~2 GB).** Esta es una operación única y tarda entre 5 y 10 minutos dependiendo del ancho de banda del proveedor. Los reinicios posteriores omitirán esto.

La sincronización tardará **de horas a días** dependiendo de la red. Observa lo siguiente:

-> Alturas de bloque crecientes

-> Conexiones entre pares (deberían ser entre 10 y 30 pares)

-> Ningún error repetido


## Paso 7: Obtén la Dirección de Tu Nodo

Haz clic en la pestaña **Leases** y luego en **URIs**.

Verás algo como:

```
zcashd-8233: provider-hostname.com:31234
```

Este es el **endpoint P2P público** de tu nodo. Otros nodos Zcash se conectarán contigo en esta dirección.

**Ten en cuenta el mapeo de puertos:** Configuraste el puerto 8233 en el SDL, pero Akash lo asignó a un puerto público diferente (31234 en este ejemplo). Esto es normal; consulta la sección «Mapeo de Puertos en Akash» al principio si te confunde. Tu nodo es accesible en el puerto que Akash muestre aquí, no necesariamente en el 8233.

Si activaste RPC (comentado de forma predeterminada en el SDL), también verás aquí el endpoint RPC con su propio puerto mapeado.

## Opciones de Configuración

### Cambiar a Testnet

El SDL usa Mainnet de forma predeterminada. Para usar Testnet en su lugar:

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

-> **Opcional: Reduce los precios** en *profiles.placement.akash.pricing*:

   ```yaml
   amount: 5000  # Down from 10000
   ```

> Ten en cuenta que bajar los precios puede impedir que nuestros proveedores hagan ofertas. Experimenta con este valor o usa el endpoint del proveedor para comprobar si harían una oferta. (Revisa la documentación de la API del proveedor)

### Activar el Acceso RPC

RPC está desactivado de forma predeterminada por seguridad. Para activarlo:

**CRÍTICO: Establece credenciales seguras.** La RPC de zcashd transmite el nombre de usuario/la contraseña mediante HTTP (no HTTPS). Expón RPC solo si entiendes las implicaciones de seguridad.

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

**Advertencia**: Si estableces *global: true* para RPC, lo expones a Internet con autenticación básica. Es una mala idea. Usa *global: false* y accede a RPC mediante la red interna de Akash o configura un túnel seguro.

**Recordatorio sobre el mapeo de puertos**: Incluso si expones RPC globalmente, Akash lo mapeará a un puerto alto aleatorio (no 8232/18232). Consulta las URI de tu despliegue para ver el endpoint público real. Para *global: false* (recomendado), el endpoint RPC solo es accesible dentro de la red de despliegue de Akash, no desde Internet público.

### Activar el Índice de Transacciones

El índice de transacciones te permite consultar cualquier transacción por su ID mediante RPC. Utiliza más almacenamiento (~ 20% de aumento).

Descomenta en *env*:

```yaml
- "ZCASHD_TXINDEX=1"
```

**Advertencia**: Activar txindex en un nodo sincronizado existente requiere volver a indexar toda la blockchain, lo que tarda horas.

### Activar Insight Explorer

Insight Explorer proporciona endpoints API REST adicionales para datos de blockchain (útiles para exploradores de bloques).

Descomenta en *env*:

```yaml
- "ZCASHD_INSIGHTEXPLORER=1"
```

Esto activa automáticamente txindex y añade métodos RPC adicionales.

### Activar Métricas de Prometheus

Para recopilar métricas de monitoreo:

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

### Ajustar Recursos/Precios

Si no estás recibiendo ofertas o quieres optimizar el costo:

**Para proveedores de especificaciones más bajas**, reduce en la sección *profiles.compute.zcashd.resources*:

-> CPU: *units: 2* (mínimo para una velocidad de sincronización razonable)

-> Memoria: *size: 12Gi* (mínimo para la estabilidad)

-> Almacenamiento: *size: 120Gi* (mínimo para mainnet)


**Para atraer más ofertas**, aumenta en *profiles.placement.akash.pricing*:

-> Mainnet: Prueba *amount: 15000* uakt/block

-> Testnet: Prueba *amount: 7500* uakt/block


Los valores del SDL se establecen de forma conservadoramente alta. La mayoría de proveedores ofertará menos.

## Actualizar Tu Despliegue

¿Necesitas cambiar la configuración después de desplegar?

-> Ve a **My Deployments** en Console

-> Busca tu despliegue zcashd

-> Haz clic en **«Update Deployment»**

-> Edita el SDL

-> Haz clic en **«Update»** y aprueba en Keplr


**Nota**: La actualización reiniciará tu contenedor. El nodo se reanudará desde su estado guardado (almacenamiento persistente), pero espera entre 1 y 2 minutos de inactividad.

## Monitoreo

### Mediante Console

-> Pestaña **Logs**: Registros en vivo del contenedor

-> Pestaña **Shell**: Obtén una consola dentro del contenedor (útil para depurar)

-> Pestaña **Events**: Eventos de Kubernetes (principalmente inútiles salvo que algo esté roto)


### Mediante RPC (si está activado)

Si activaste RPC, puedes consultar tu nodo como un nodo completo zcashd normal (¡porque lo es!)

### Alternativa zcash-cli

Si tienes acceso a una consola mediante Console, puedes usar *zcash-cli* directamente:

```bash
# From the Shell tab in Console
zcash-cli getblockchaininfo
zcash-cli getpeerinfo
zcash-cli getinfo
```

## Cerrar Tu Despliegue

Cuando hayas terminado o quieras dejar de pagar:

-> Ve a **My Deployments**

-> Busca tu despliegue zcashd

-> Haz clic en **«Close Deployment»**

-> Confirma y firma en Keplr


Tu depósito de 5 AKT será reembolsado. El **almacenamiento persistente** debería conservarse por el proveedor, pero no dependas de ello: trátalo como cualquier otro proveedor de nube.

## Solución de Problemas

### Error «Insufficient funds»

Necesitas más AKT. Añade fondos a tu billetera Keplr.

### No aparecen ofertas

Puede ser que:

-> Tus precios sean demasiado bajos (aumenta *amount* en el SDL)

-> Tus requisitos de recursos sean demasiado altos para los proveedores disponibles (reduce CPU/memoria/almacenamiento)

-> Debas esperar más tiempo (a veces las ofertas tardan entre 60 y 90 segundos en aparecer)


### El despliegue se queda en «pending»

El proveedor podría estar teniendo problemas. Cierra el despliegue e inténtalo con otro proveedor.

### Los registros de zcashd muestran «No peers connected»

Desde la detención por fin de soporte el 18 de julio de 2026, este es el estado permanente esperado en lugar de un retraso de inicio, y ninguna cantidad de espera o redespliegue lo solucionará. Despliega [Zebra](/guides/akash-network-zebra) en su lugar.

### Errores «Out of memory» en los registros

Escatimaste en RAM. Cierra el despliegue y vuelve a desplegar con al menos 12 Gi de memoria (se recomiendan 16 Gi).

### La sincronización tarda una eternidad

Define «una eternidad»:

-> **Horas**: Normal

-> **Días**: También normal para mainnet desde cero

-> **Semanas**: Algo está mal, revisa los registros en busca de errores


### «Error fetching zcash-params»

El proveedor podría tener problemas de red o un ancho de banda lento. Esto normalmente se resuelve por sí solo. Si persiste durante más de 30 minutos, intenta redesplegar con otro proveedor.

### Fallos de autenticación RPC

-> Comprueba que `ZCASHD_RPCUSER` y `ZCASHD_RPCPASSWORD` estén configurados correctamente

-> Verifica que estés usando el puerto correcto (8232 para mainnet, 18232 para testnet)

-> Recuerda que Akash mapea los puertos: usa la URI de tu despliegue, no el 8232 directamente


## Gestión de Costos

Monitorea tus gastos en Console:

-> **My Deployments** -> Tu despliegue -> Muestra la estimación de «Cost per month»

-> El saldo de tu billetera Keplr disminuirá con el tiempo


Cuando tu saldo sea bajo, Akash cerrará automáticamente tu despliegue. **Recarga [top up] tu billetera periódicamente** o configura alertas.

### Reducción de Costos

-> **Usa Testnet** para pruebas no productivas (50% más barato)

-> **Reduce CPU/memoria** si no necesitas una sincronización rápida

-> **Elige proveedores más baratos** (no siempre es prudente: el tiempo de actividad importa)

-> **Usa USDC en lugar de AKT** si el precio de AKT es volátil (requiere cambiar los precios del SDL)

-> **Desactiva txindex** si no lo necesitas (ahorra ~ 20% de almacenamiento)


### Recursos Adicionales

**Akash Console**: [https://console.akash.network](https://console.akash.network)

**Documentación de Akash**: [https://akash.network/docs/](https://akash.network/docs/)

**Exploradores de Zcash**: [https://zechub.wiki/guides/blockchain-explorers](https://zechub.wiki/guides/blockchain-explorers)

**Discord de Akash**: [https://discord.akash.network](https://discord.akash.network) (para problemas con proveedores)

## Notas Finales

- **El almacenamiento persistente importa.** No omitas *persistent: true* ni uses la clase *beta2*. Usa *beta3*.
- **La sincronización inicial es lenta.** Ten paciencia. Esto es normal para los nodos de blockchain.
- **Mantén fondos en tu billetera.** Los despliegues se cierran automáticamente cuando te quedas sin AKT.
- **Las copias de seguridad no son automáticas.** Si te importan los datos, asume que pueden desaparecer y planifica en consecuencia.
- **La seguridad de RPC es crítica.** No expongas RPC a Internet sin las medidas de seguridad adecuadas.
- **zcash-params se almacena en caché.** La primera ejecución descarga ~2 GB de parámetros criptográficos. Esto es normal y ocurre solo una vez.
