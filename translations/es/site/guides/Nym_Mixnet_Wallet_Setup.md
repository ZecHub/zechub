<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Enruta el tráfico de la billetera Zcash a través de la Mixnet Nym

> Última verificación: 29 de septiembre de 2026

Las transacciones blindadas [shielded transactions] Zcash protegen los datos de las transacciones on-chain, pero las billeteras aún se comunican a través de internet. Los observadores de red pueden potencialmente conocer metadatos, como tu dirección IP, cuándo se conecta tu billetera y con qué infraestructura se comunica.

Nym añade una capa independiente de privacidad de red. A septiembre de 2026, el mejor enfoque depende de la billetera:

1. **Prefiere la integración nativa de Nym de una billetera cuando exista.**
2. De lo contrario, usa el **modo Mixnet de NymVPN a nivel del sistema** para que el tráfico de red de la billetera se enrute a través de Nym sin depender de compatibilidad de proxy específica de la billetera.

Para información general sobre VPN y dVPN, consulta [VPN y dVPN](../Privacy_Tools/VPN_and_DVPN.md).

## Qué añade Nym y qué no

Un pago blindado de Zcash y una herramienta de privacidad de red resuelven problemas diferentes:

- **Los pools blindados de Zcash** protegen los detalles de las transacciones on-chain.
- **El enrutamiento mixnet de Nym** está diseñado para reducir la vinculación entre tu identidad de red real y el servicio que recibe el tráfico de la billetera.
- Un destino contactado mediante un túnel de NymVPN a nivel del sistema debería ver una salida de Nym en lugar de tu IP doméstica o móvil.

La mixnet de Nym usa múltiples saltos, mezcla de paquetes, retrasos aleatorios, tráfico de cobertura y cifrado onion para reducir la filtración de metadatos de red.

Nym **no** protege contra un dispositivo comprometido, software malicioso de la billetera, frases de recuperación expuestas, identidad que reveles mediante cuentas de exchange o pérdida de privacidad causada por actividad de Zcash transparente.

## Compatibilidad nativa con Nym: úsala primero cuando esté disponible

Nym anunció el 24 de septiembre de 2026 que su trabajo de subvención comunitaria de Zcash está completo y que la compatibilidad nativa con mixnet se está incorporando en billeteras reales de Zcash.

### Billetera Zingo!

Zingo PC incluye un transporte nativo de Nym. Zingo Mobile también incluye el modo Mixnet en iOS y Android mediante un proxy integrado de Nym.

Comportamiento actual documentado por Zingo:

- El control de Nym está en **Configuración → Mixnet de Nym**.
- El envío de un pago se enruta a través de la mixnet.
- Las transmisiones de migración de Ironwood siguen la misma ruta de envío protegida.
- Las solicitudes de precios de ZEC también se enrutan a través de la mixnet.
- El envío falla de forma cerrada mientras Nym está activado: si el transporte mixnet no está disponible, el pago no se envía silenciosamente a través de clearnet.
- **La sincronización de la red actualmente no se enruta a través de la mixnet** en Zingo PC. Los bloques compactos, las consultas de anuladores, las recuperaciones de transacciones, el tráfico de mempool y las comprobaciones del estado del servidor aún usan la conexión normal al servidor.

Esta distinción importa: la integración nativa de Zingo protege la ruta de difusión con mayor vinculación, pero todavía no es un túnel de red para todo el dispositivo.

Si tu modelo de amenazas también requiere ocultar el tráfico de sincronización al servidor, usa un túnel de privacidad a nivel del sistema como NymVPN, además de comprender la latencia y complejidad adicionales que esto introduce.

Fuentes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym informa que **Zkool** ahora permite conectarse a la infraestructura RPC de Zcash a través de la mixnet de Nym mediante un interruptor nativo.

Zkool es el sucesor mantenido activamente de YWallet. Su proyecto también admite proxy de Tor y servicios onion para conexiones al servidor de Zcash.

Prefiere la opción nativa de Zkool de Nym en lugar de intentar forzar una compilación antigua de YWallet a través de una ruta de proxy no documentada.

Fuentes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet también tiene rutas de transporte compatibles con Nym. Su implementación actual admite enrutar el envío saliente de transacciones a través de la mixnet de Nym y una ruta dVPN independiente de Nym para la sincronización de bloques compactos. Trata estas como protecciones distintas en lugar de asumir que cada solicitud de la billetera usa automáticamente la mixnet.

Fuentes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl cuenta actualmente con **Protección de Tor** integrada, que no es la misma integración nativa de Nym descrita anteriormente para Zingo, Zkool y Nozy.

La función Tor de Zodl puede enrutar el envío de transacciones, la recuperación de datos de transacciones, las solicitudes de tipos de cambio y las llamadas a API de terceros a través de Tor. Nym declaró el 24 de septiembre de 2026 que todavía mantiene conversaciones activas con el equipo de Zodl sobre una integración más amplia de mixnet.

Para Zodl hoy, usa cualquiera de estas opciones:

- La Protección de Tor documentada de Zodl, o
- NymVPN a nivel del sistema si tu objetivo es enrutar el tráfico general del dispositivo de la billetera a través de Nym.

No asumas que Tor y Nym son transportes intercambiables dentro de la billetera simplemente porque ambas son redes de privacidad.

Configuración de Zodl Tor:

**Más → Funciones avanzadas → Beta: Protección de Tor → Activar → Guardar cambios**

Fuentes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN a nivel del sistema

Esta es la opción de Nym más ampliamente compatible porque no requiere que la billetera entienda la configuración de proxy específica de Nym.

### 1. Instala NymVPN

Descarga NymVPN solo desde el sitio web oficial de Nym o una tienda oficial de la plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN es compatible con Android, iOS, Linux, Windows y macOS.

### 2. Selecciona el modo Mixnet

NymVPN ofrece el **modo rápido**, una ruta dVPN de 2 saltos optimizada para menor latencia, y el **modo Mixnet**, una ruta mixnet de 5 saltos optimizada para una mayor protección de metadatos de red. Para actividad sensible de la billetera, selecciona el modo Mixnet y espera hasta que el cliente informe que la conexión se ha establecido antes de abrir o actualizar la billetera.

### 3. Deja la billetera con la configuración normal de red

Cuando el sistema operativo ya está tunelizando el tráfico a través de NymVPN, la mayoría de las billeteras no necesitan configuración de proxy personalizada.

Abre la billetera normalmente y permite que se sincronice.

Si NymVPN ofrece tunelización dividida en tu plataforma, confirma que la billetera esté **incluida en el túnel protegido**, no incluida en una lista de omisión o exclusión.

### 4. Verifica el túnel antes de usar la billetera

Una comprobación sencilla a nivel del sistema:

1. Desconecta NymVPN.
2. Visita un servicio público de comprobación de IP o, en escritorio, ejecuta:

   ```bash
   curl https://api.ipify.org
   ```

3. Registra la IP visible.
4. Conecta NymVPN en modo Mixnet.
5. Repite la comprobación.

La IP pública visible debería cambiar.

Esto confirma el túnel del sistema. **No** demuestra que cada solicitud realizada por una billetera concreta siga la misma ruta si la aplicación o el sistema operativo tienen reglas de enrutamiento especiales.

Para mayor seguridad en escritorio:

- Inspecciona el proceso de la billetera con el monitor de red del sistema operativo.
- Verifica que no haya una exclusión de tunelización dividida.
- Confirma que el comportamiento esperado de la billetera cambie si se desconecta NymVPN.

No publiques capturas de pantalla que contengan direcciones de billetera, saldos, ID de transacciones, direcciones IP o material de recuperación mientras solucionas problemas.

## Modo proxy de dApp / billetera de NymVPN

NymVPN también ofrece un modo proxy para aplicaciones y billeteras mediante enrutamiento SOCKS5 / RPC a través de la mixnet.

La documentación pública de configuración de Nym demuestra esto principalmente con configuración RPC de estilo Ethereum. Es útil para software que admite explícitamente una ruta genérica compatible de proxy/RPC, pero **no** debe suponerse que funcione con todas las billeteras de Zcash.

Usa esta ruta únicamente cuando la propia documentación de la billetera confirme compatibilidad con proxy o RPC.

De lo contrario, prefiere:

- La integración nativa de Nym de la billetera, o
- NymVPN a nivel del sistema.

## Compensaciones de rendimiento y tiempo de espera

Las mixnets intercambian intencionalmente velocidad por una protección más sólida de metadatos.

Espera un posible impacto en:

- La sincronización inicial de la billetera.
- Las sincronizaciones extensas de recuperación.
- Las consultas del historial de transacciones.
- Los tiempos de espera de RPC.
- Las llamadas a API de terceros.

Orientación práctica:

- Empieza con la configuración predeterminada de Nym.
- Espera que la primera sincronización o una sincronización extensa de recuperación tarde más.
- Reintenta un tiempo de espera antes de debilitar la configuración de privacidad.
- Evita cambiar repetidamente los modos de privacidad justo antes de una transacción sensible.
- Si usas una ruta más rápida para la sincronización masiva, comprende que la infraestructura contactada puede observar tu identidad de red real durante ese período.
- Para Zingo PC específicamente, recuerda que su transporte nativo de Nym actualmente protege los envíos y la consulta de precios, mientras que la sincronización sigue siendo directa.

## Consideraciones móviles

En Android e iOS, la ranura VPN del sistema operativo suele ser la forma más sencilla de enrutar el tráfico general de la billetera a través de NymVPN: conecta primero NymVPN y después abre la billetera.

Si otra VPN, firewall o bloqueador de anuncios basado en VPN local ya ocupa la interfaz VPN del sistema, es posible que los dos productos no puedan funcionar simultáneamente. Confirma el estado de VPN del sistema operativo antes de asumir que la billetera está protegida.

## Lista de verificación del modelo de amenazas

Antes de confiar en la configuración, pregunta:

- ¿Estoy usando direcciones blindadas de Zcash cuando corresponde?
- ¿Mi billetera tiene compatibilidad nativa con Nym?
- De ser así, ¿qué tráfico protege exactamente esa integración nativa?
- Si necesito una cobertura más amplia, ¿está conectado NymVPN antes de que la billetera inicie actividad de red?
- ¿La billetera está excluida por una regla de tunelización dividida?
- ¿Estoy confiando en un modo proxy que la billetera realmente documenta?
- ¿Estoy filtrando identidad mediante un exchange, sesión del navegador, API de terceros o dirección transparente?
- ¿Estoy preparado para una sincronización más lenta y tiempos de espera ocasionales?

## Fuentes

- Nym: Mixnet de Nym ahora activa en billeteras de Zcash, 24 de septiembre de 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamiento de Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte de Zingo Mobile Nym: https://github.com/zingolabs/zingo-mobile
- Repositorio de Zkool: https://github.com/hhanh00/zkool2
- Trabajo de transporte de NozyWallet Nym: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Protección de Zodl Tor: https://support.zodl.com/article/17-enabling-tor-protection
