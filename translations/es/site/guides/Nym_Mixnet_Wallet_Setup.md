<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Página de Edihttps://github.com/ZecHub/zechub/pull/2238t"/>
</a>

# Enruta el tráfico de la wallet Zcash a través de la mixnet de Nym

> Última verificación: 29 de septiembre de 2026

Las transacciones blindadas de Zcash protegen los datos de las transacciones on-chain, pero las wallets siguen comunicándose a través de internet. Los observadores de red podrían conocer metadatos como tu dirección IP, cuándo se conecta tu wallet y qué infraestructura contacta.

Nym añade una capa independiente de privacidad de red. A septiembre de 2026, el mejor enfoque depende de la wallet:

1. **Prefiere la integración nativa de Nym de una wallet cuando exista.**
2. De lo contrario, usa el **modo Mixnet de NymVPN a nivel de sistema** para que el tráfico de red de la wallet se enrute a través de Nym sin depender de soporte de proxy específico de la wallet.

Para información general sobre VPN y dVPN, consulta [VPN y dVPN](./VPN_and_DVPN.md).

## Qué añade Nym — y qué no

Un pago blindado de Zcash y una herramienta de privacidad de red resuelven problemas diferentes:

- Los **pools blindados de Zcash** protegen los detalles de las transacciones on-chain.
- El enrutamiento mediante mixnet de Nym está diseñado para reducir la capacidad de vincular tu identidad de red real con el servicio que recibe el tráfico de la wallet.
- Un destino contactado mediante un túnel de NymVPN a nivel de sistema debería ver una salida de Nym en lugar de tu IP doméstica o móvil.

La mixnet de Nym utiliza múltiples saltos, mezcla de paquetes, retrasos aleatorios, tráfico de cobertura y cifrado onion para reducir la filtración de metadatos de red.

Nym **no** protege contra un dispositivo comprometido, software de wallet malicioso, frases de recuperación expuestas, identidad que revelas mediante cuentas de exchange ni pérdida de privacidad causada por actividad transparente de Zcash.

## Soporte nativo de Nym: úsalo primero cuando esté disponible

Nym anunció el 24 de septiembre de 2026 que su trabajo de subvención comunitaria de Zcash está completo y que el soporte nativo de mixnet se está implementando en wallets reales de Zcash.

### Wallet Zingo!

Zingo PC incluye un transporte nativo de Nym. Zingo Mobile también incluye el modo Mixnet en iOS y Android mediante un proxy de Nym dentro de la aplicación.

Comportamiento actual documentado por Zingo:

- El control de Nym está en **Configuración → Mixnet de Nym**.
- El envío de un pago se enruta a través de la mixnet.
- Las transmisiones de migración de Ironwood siguen la misma ruta de envío protegida.
- Las solicitudes de precio de ZEC también se enrutan a través de la mixnet.
- Los envíos fallan de forma cerrada mientras Nym está habilitado: si el transporte de mixnet no está disponible, el pago no se envía silenciosamente por clearnet.
- **La sincronización de la cadena actualmente no se enruta a través de la mixnet** en Zingo PC. Los bloques compactos, las consultas de nullifiers, las obtenciones de transacciones, el tráfico de mempool y las comprobaciones de salud del servidor siguen utilizando la conexión normal al servidor.

Esa distinción es importante: la integración nativa de Zingo protege la ruta de difusión con mayor capacidad de vinculación, pero todavía no es un túnel de red para todo el dispositivo.

Si tu modelo de amenazas también requiere ocultar el tráfico de sincronización al servidor, usa un túnel de privacidad a nivel de sistema como NymVPN, además de comprender la latencia y complejidad adicionales que esto introduce.

Fuentes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym informa que **Zkool** ahora admite conectarse a la infraestructura RPC de Zcash a través de la mixnet de Nym usando un interruptor nativo.

Zkool es el sucesor mantenido activamente de YWallet. Su proyecto también admite proxy de Tor y servicios onion para conexiones a servidores de Zcash.

Prefiere la opción nativa de Zkool de Nym en lugar de intentar forzar una versión antigua de YWallet mediante una ruta de proxy no documentada.

Fuentes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet también tiene rutas de transporte compatibles con Nym. Su implementación actual admite enrutar el envío de transacciones salientes a través de la mixnet de Nym y una ruta dVPN independiente de Nym para la sincronización de bloques compactos. Considera estas protecciones distintas, en lugar de asumir que cada solicitud de la wallet usa automáticamente la mixnet.

Fuentes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl actualmente cuenta con **Protección de Tor** integrada, no con la misma integración nativa de Nym descrita anteriormente para Zingo, Zkool y Nozy.

La función de Zodl de Tor puede enrutar el envío de transacciones, la recuperación de datos de transacciones, las solicitudes de tipo de cambio y las llamadas a API de terceros a través de Tor. Nym declaró el 24 de septiembre de 2026 que sigue en conversaciones activas con el equipo de Zodl sobre una integración más amplia de la mixnet.

Para Zodl hoy, usa una de estas opciones:

- la Protección de Tor documentada de Zodl, o
- NymVPN a nivel de sistema si tu objetivo es enrutar el tráfico general del dispositivo de la wallet a través de Nym.

No supongas que Tor y Nym son transportes intercambiables dentro de la wallet simplemente porque ambos son redes de privacidad.

Configuración de Zodl Tor:

**Más → Funciones avanzadas → Beta: Protección de Tor → Habilitar → Guardar cambios**

Fuentes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN a nivel de sistema

Esta es la opción de Nym más ampliamente compatible porque no requiere que la wallet entienda configuraciones de proxy específicas de Nym.

### 1. Instala NymVPN

Descarga NymVPN únicamente desde el sitio web oficial de Nym o una tienda oficial de la plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN es compatible con Android, iOS, Linux, Windows y macOS.

### 2. Selecciona el modo Mixnet

NymVPN ofrece el **modo rápido**, una ruta dVPN de 2 saltos optimizada para menor latencia, y el **modo Mixnet**, una ruta de mixnet de 5 saltos optimizada para una protección más sólida de los metadatos de red. Para actividad sensible de la wallet, selecciona el modo Mixnet y espera hasta que el cliente informe que la conexión está establecida antes de abrir o actualizar la wallet.

### 3. Deja la wallet con la configuración de red normal

Cuando el sistema operativo ya está tunelizando el tráfico a través de NymVPN, la mayoría de las wallets no necesitan configuraciones de proxy personalizadas.

Abre la wallet normalmente y permite que se sincronice.

Si NymVPN ofrece tunelización dividida en tu plataforma, confirma que la wallet está **incluida en el túnel protegido**, no incluida en una lista de omisión o exclusión.

### 4. Verifica el túnel antes de usar la wallet

Una comprobación sencilla a nivel de sistema:

1. Desconecta NymVPN.
2. Visita un servicio público de comprobación de IP o, en escritorio, ejecuta:

   ```bash
   curl https://api.ipify.org
   ```

3. Registra la IP visible.
4. Conecta NymVPN en modo Mixnet.
5. Repite la comprobación.

La IP pública visible debería cambiar.

Esto confirma el túnel del sistema. **No** demuestra que cada solicitud realizada por una wallet concreta siga la misma ruta si la aplicación o el sistema operativo tienen reglas especiales de enrutamiento.

Para una mayor seguridad en escritorio:

- inspecciona el proceso de la wallet con el monitor de red del sistema operativo,
- verifica que no haya una exclusión de túnel dividido,
- confirma que el comportamiento esperado de la wallet cambie si se desconecta NymVPN.

No publiques capturas de pantalla que contengan direcciones de wallet, saldos, IDs de transacciones, direcciones IP o material de recuperación mientras solucionas problemas.

## Modo proxy de dApp / wallet de NymVPN

NymVPN también ofrece un modo proxy para aplicaciones y wallets mediante enrutamiento SOCKS5 / RPC a través de la mixnet.

La documentación pública de configuración de Nym demuestra esto principalmente con configuración RPC de estilo Ethereum. Es útil para software que admita explícitamente una ruta de proxy/RPC genérica compatible, pero **no** se debe asumir que funciona con todas las wallets de Zcash.

Usa esta ruta únicamente cuando la documentación de la propia wallet confirme soporte de proxy o RPC compatible.

De lo contrario, prefiere:

- la integración nativa de Nym de la wallet, o
- NymVPN a nivel de sistema.

## Compensaciones de rendimiento y tiempos de espera

Las mixnets intercambian intencionalmente velocidad por una protección de metadatos más sólida.

Espera un posible impacto en:

- la sincronización inicial de la wallet,
- sincronizaciones largas de recuperación,
- consultas del historial de transacciones,
- tiempos de espera de RPC,
- llamadas a API de terceros.

Orientación práctica:

- Comienza con la configuración predeterminada de Nym.
- Espera que la primera sincronización o una sincronización larga de recuperación tarde más.
- Reintenta un tiempo de espera antes de reducir la configuración de privacidad.
- Evita cambiar repetidamente los modos de privacidad inmediatamente antes de una transacción sensible.
- Si utilizas una ruta más rápida para una sincronización masiva, comprende que la infraestructura contactada podría observar tu identidad de red real durante ese período.
- Para Zingo PC específicamente, recuerda que su transporte nativo de Nym actualmente protege los envíos y la consulta de precios, mientras que la sincronización sigue siendo directa.

## Consideraciones para móviles

En Android e iOS, la ranura VPN del sistema operativo suele ser la forma más sencilla de enrutar el tráfico general de la wallet a través de NymVPN: conecta primero NymVPN y después abre la wallet.

Si otra VPN, firewall o bloqueador de anuncios basado en VPN local ya ocupa la interfaz VPN del sistema, es posible que los dos productos no puedan funcionar simultáneamente. Confirma el estado de la VPN del sistema operativo antes de asumir que la wallet está protegida.

## Lista de comprobación del modelo de amenazas

Antes de confiar en esta configuración, pregúntate:

- ¿Estoy usando direcciones blindadas de Zcash cuando corresponde?
- ¿Mi wallet tiene soporte nativo de Nym?
- De ser así, ¿qué tráfico protege exactamente esa integración nativa?
- Si necesito una cobertura más amplia, ¿está conectado NymVPN antes de que la wallet inicie actividad de red?
- ¿La wallet está excluida por una regla de túnel dividido?
- ¿Estoy confiando en un modo proxy que la wallet realmente documenta?
- ¿Estoy filtrando mi identidad mediante un exchange, sesión de navegador, API de terceros o dirección transparente?
- ¿Estoy preparado para una sincronización más lenta y tiempos de espera ocasionales?

## Fuentes

- Nym: la mixnet de Nym ya está disponible en wallets de Zcash, 24 de septiembre de 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamiento de Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte de Zingo Mobile Nym: https://github.com/zingolabs/zingo-mobile
- Repositorio de Zkool: https://github.com/hhanh00/zkool2
- Trabajo de transporte de NozyWallet Nym: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Protección de Zodl Tor: https://support.zodl.com/article/17-enabling-tor-protection
