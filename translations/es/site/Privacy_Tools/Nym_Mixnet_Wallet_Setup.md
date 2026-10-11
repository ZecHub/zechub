<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Enruta el tráfico de la wallet Zcash a través de Nym Mixnet

> Última verificación: 29 de septiembre de 2026

Las transacciones blindadas de Zcash protegen los datos de las transacciones en la cadena, pero las wallets aún se comunican por internet. Los observadores de red pueden conocer potencialmente metadatos como tu dirección IP, cuándo se conecta tu wallet y con qué infraestructura se comunica.

Nym añade una capa independiente de privacidad de red. A fecha de septiembre de 2026, el mejor enfoque depende de la wallet:

1. **Prefiere la integración nativa de Nym de una wallet cuando exista.**
2. De lo contrario, utiliza el **modo Mixnet de NymVPN a nivel de sistema** para que el tráfico de red de la wallet se enrute a través de Nym sin depender de la compatibilidad de proxy específica de la wallet.

Para información general sobre VPN y dVPN, consulta [VPN y dVPN](./VPN_and_DVPN.md).

## Lo que añade Nym y lo que no

Un pago blindado de Zcash y una herramienta de privacidad de red resuelven problemas diferentes:

- Los **pools blindados de Zcash** protegen los detalles de las transacciones en la cadena.
- El **enrutamiento por mixnet de Nym** está diseñado para reducir la vinculabilidad entre tu identidad de red real y el servicio que recibe el tráfico de la wallet.
- Un destino contactado mediante un túnel de NymVPN a nivel de sistema debería ver una salida de Nym en lugar de tu IP doméstica o móvil.

La mixnet de Nym usa múltiples saltos, mezcla de paquetes, retrasos aleatorizados, tráfico de cobertura y cifrado onion para reducir la filtración de metadatos de red.

Nym **no** protege frente a un dispositivo comprometido, software de wallet malicioso, frases de recuperación expuestas, identidad revelada mediante cuentas de exchange ni pérdida de privacidad causada por actividad transparente de Zcash.

## Compatibilidad nativa con Nym: úsala primero cuando esté disponible

Nym anunció el 24 de septiembre de 2026 que su trabajo de Community Grant de Zcash está terminado y que la compatibilidad nativa con mixnet se está incorporando a wallets reales de Zcash.

### Wallet Zingo!

Zingo PC incluye un transporte nativo de Nym. Zingo Mobile también incorpora Mixnet Mode en iOS y Android mediante un proxy de Nym integrado en la aplicación.

Comportamiento actual documentado por Zingo:

- El control de Nym se encuentra en **Settings → Nym Mixnet**.
- El envío de un pago se enruta a través de la mixnet.
- Las transmisiones de migración de Ironwood siguen la misma ruta de envío protegida.
- Las solicitudes de precios de ZEC también se enrutan a través de la mixnet.
- El envío falla de forma segura mientras Nym está activado: si el transporte de la mixnet no está disponible, el pago no se envía silenciosamente por clearnet.
- **Actualmente, la sincronización de la cadena no se enruta a través de la mixnet** en Zingo PC. Los bloques compactos, las consultas de nullifier, las obtenciones de transacciones, el tráfico del mempool y las comprobaciones de estado del servidor siguen usando la conexión normal al servidor.

Esta distinción es importante: la integración nativa de Zingo protege la ruta de difusión con mayor vinculación, pero aún no es un túnel de red para todo el dispositivo.

Si tu modelo de amenazas también requiere ocultar el tráfico de sincronización al servidor, utiliza un túnel de privacidad a nivel de sistema como NymVPN, además de comprender la latencia y complejidad adicionales que esto introduce.

Fuentes:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym informa que **Zkool** ahora permite conectarse a infraestructura RPC de Zcash a través de la mixnet de Nym mediante un interruptor nativo.

Zkool es el sucesor mantenido activamente de YWallet. Su proyecto también admite proxy Tor y servicios onion para conexiones de servidor de Zcash.

Prefiere la opción nativa de Nym de Zkool antes que intentar forzar una compilación antigua de YWallet a través de una ruta de proxy no documentada.

Fuentes:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet también cuenta con rutas de transporte compatibles con Nym. Su implementación actual permite enrutar el envío de transacciones salientes a través de la mixnet de Nym y una ruta dVPN de Nym independiente para la sincronización de bloques compactos. Trata estas protecciones como distintas, en lugar de asumir que cada solicitud de la wallet usa automáticamente la mixnet.

Fuentes:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### ZODL

Actualmente, ZODL incorpora **Tor Protection**, no la misma integración nativa de Nym descrita anteriormente para Zingo, Zkool y Nozy.

La función Tor de ZODL puede enrutar el envío de transacciones, la recuperación de datos de transacciones, las solicitudes de tipo de cambio y las llamadas a API de terceros a través de Tor. Nym declaró el 24 de septiembre de 2026 que sigue en conversaciones activas con el equipo de ZODL sobre una integración más amplia de la mixnet.

Para ZODL hoy, utiliza una de estas opciones:

- Tor Protection documentado de ZODL, o
- NymVPN a nivel de sistema si tu objetivo es enrutar el tráfico general del dispositivo de la wallet a través de Nym.

No supongas que Tor y Nym son transportes intercambiables dentro de la wallet simplemente porque ambos son redes de privacidad.

Ajustes de Tor de ZODL:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Fuentes:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Alternativa: NymVPN a nivel de sistema

Esta es la opción de Nym con mayor compatibilidad porque no requiere que la wallet comprenda configuraciones de proxy específicas de Nym.

### 1. Instala NymVPN

Descarga NymVPN solo desde el sitio web oficial de Nym o una tienda oficial de la plataforma:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN es compatible con Android, iOS, Linux, Windows y macOS.

### 2. Selecciona el modo Mixnet

NymVPN ofrece el **modo Fast**, una ruta dVPN de 2 saltos optimizada para una menor latencia, y el **modo Mixnet**, una ruta de mixnet de 5 saltos optimizada para una mayor protección de los metadatos de red. Para actividad sensible de la wallet, selecciona el modo Mixnet y espera a que el cliente informe que la conexión se ha establecido antes de abrir o actualizar la wallet.

### 3. Deja la wallet con la configuración normal de red

Cuando el sistema operativo ya está tunelizando el tráfico a través de NymVPN, la mayoría de las wallets no necesitan configuraciones de proxy personalizadas.

Abre la wallet normalmente y permite que se sincronice.

Si NymVPN ofrece túnel dividido en tu plataforma, confirma que la wallet esté **incluida en el túnel protegido**, no en una lista de omisión o exclusión.

### 4. Verifica el túnel antes de utilizar la wallet

Una sencilla comprobación a nivel de sistema:

1. Desconecta NymVPN.
2. Visita un servicio público de comprobación de IP o, en un ordenador de escritorio, ejecuta:

   ```bash
   curl https://api.ipify.org
   ```

3. Registra la IP visible.
4. Conecta NymVPN en modo Mixnet.
5. Repite la comprobación.

La IP pública visible debería cambiar.

Esto confirma el túnel del sistema. **No** demuestra que todas las solicitudes realizadas por una wallet concreta sigan la misma ruta si la aplicación o el sistema operativo tienen reglas de enrutamiento especiales.

Para mayor seguridad en ordenadores de escritorio:

- inspecciona el proceso de la wallet con el monitor de red del sistema operativo,
- verifica que no haya una exclusión de túnel dividido,
- confirma que el comportamiento esperado de la wallet cambie si se desconecta NymVPN.

No publiques capturas de pantalla que contengan direcciones de wallet, saldos, IDs de transacción, direcciones IP o material de recuperación mientras solucionas problemas.

## Modo de proxy para dApp / wallet de NymVPN

NymVPN también ofrece un modo de proxy para aplicaciones y wallets mediante enrutamiento SOCKS5 / RPC a través de la mixnet.

La documentación pública de configuración de Nym muestra este uso principalmente con configuración RPC de estilo Ethereum. Es útil para software que admite explícitamente una ruta genérica compatible de proxy/RPC, pero **no** debe suponerse que funcione con todas las wallets de Zcash.

Utiliza esta ruta solo cuando la documentación de la propia wallet confirme compatibilidad con proxy o RPC.

De lo contrario, prefiere:

- la integración nativa de Nym de la wallet, o
- NymVPN a nivel de sistema.

## Compensaciones de rendimiento y tiempos de espera

Las mixnets intercambian intencionadamente velocidad por una protección más sólida de los metadatos.

Espera un posible impacto en:

- la sincronización inicial de la wallet,
- sincronizaciones largas de puesta al día,
- consultas del historial de transacciones,
- tiempos de espera de RPC,
- llamadas a API de terceros.

Orientación práctica:

- Comienza con la configuración predeterminada de Nym.
- Espera que la primera sincronización o una sincronización larga de puesta al día tarde más.
- Reintenta un tiempo de espera antes de debilitar la configuración de privacidad.
- Evita cambiar repetidamente los modos de privacidad inmediatamente antes de una transacción sensible.
- Si utilizas una ruta más rápida para la sincronización masiva, entiende que la infraestructura contactada puede observar tu identidad de red real durante ese período.
- Para Zingo PC específicamente, recuerda que su transporte nativo de Nym actualmente protege los envíos y las consultas de precios, mientras que la sincronización permanece directa.

## Consideraciones para dispositivos móviles

En Android e iOS, la ranura VPN del sistema operativo suele ser la forma más sencilla de enrutar el tráfico general de la wallet a través de NymVPN: conecta primero NymVPN y luego abre la wallet.

Si otra VPN, firewall o bloqueador de anuncios basado en VPN local ya ocupa la interfaz VPN del sistema, es posible que los dos productos no puedan funcionar simultáneamente. Confirma el estado de la VPN del sistema operativo antes de asumir que la wallet está protegida.

## Lista de comprobación del modelo de amenazas

Antes de confiar en la configuración, pregúntate:

- ¿Estoy usando direcciones blindadas de Zcash cuando corresponde?
- ¿Mi wallet tiene compatibilidad nativa con Nym?
- Si es así, ¿qué tráfico protege exactamente esa integración nativa?
- Si necesito una cobertura más amplia, ¿está conectado NymVPN antes de que la wallet inicie actividad de red?
- ¿La wallet está excluida por una regla de túnel dividido?
- ¿Estoy usando un modo de proxy que la wallet realmente documenta?
- ¿Estoy filtrando identidad a través de un exchange, sesión de navegador, API de terceros o dirección transparente?
- ¿Estoy preparado para una sincronización más lenta y tiempos de espera ocasionales?

## Fuentes

- Nym: Nym mixnet ya disponible en wallets de Zcash, 24 de septiembre de 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportamiento de Nym de Zingo PC: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transporte Nym de Zingo Mobile: https://github.com/zingolabs/zingo-mobile
- Repositorio de Zkool: https://github.com/hhanh00/zkool2
- Trabajo de transporte Nym de NozyWallet: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Tor Protection de ZODL: https://support.zodl.com/article/17-enabling-tor-protection
