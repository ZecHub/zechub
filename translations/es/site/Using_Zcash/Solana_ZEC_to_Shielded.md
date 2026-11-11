<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# ¿Tienes ZEC en Solana? Muévelo a Zcash blindado [shielded]

Esta página es para ti si ZEC apareció en tu billetera Solana porque tienes ZCAT, u otro token Solana que paga a sus tenedores en ZEC. No necesitas vender nada para seguirla. Moverás el ZEC que ya tienes de Solana a una billetera Zcash y terminarás con él blindado.

Realizamos cada paso a continuación con una transferencia real el 27 de septiembre de 2026, comenzando con 0,00266336 ZEC en Phantom. Las tarifas, los tiempos y las pantallas de esta página son los que vimos.

---

## Resumen

- ZEC en tu billetera Solana es un **token Solana** (emisión `A7bd…QXaS`) respaldado 1:1 por ZEC reales que el NEAR OmniBridge mantiene en la cadena Zcash: «ZEC de papel» que vive en el registro público de Solana y no puede blindarse allí.
- La ruta consta de dos pasos: **deposita** el token en solswap.org (NEAR Intents) y después **retíralo** en near.com a la dirección `u1` blindada de tu billetera. No uses el botón Swap propio de Phantom: no puede ayudarte.
- Usa una billetera que el directorio [ZecHub](/wallets) marque como **Ironwood: Lista**, y conserva un poco de SOL en Phantom para la tarifa Solana.
- Nuestra prueba real (27 de septiembre de 2026, 0,00266336 ZEC): el depósito llegó en 9 segundos, el retiro tardó unos 8 minutos y el coste total fue de aproximadamente 0,00025 ZEC + 0,0016 SOL.
- Línea de seguridad: firma solicitudes de mensajes únicamente en `near.com`/`solswap.org` cuando el mensaje incluya `intents.near`, nunca escribas tu frase semilla, y pega una `u1`, nunca una `t1`.

## Analogía visual

ZEC en Solana funciona como una **ficha de casino**. Tiene el precio del dinero en efectivo, y el casino —el NEAR OmniBridge— promete billetes reales (ZEC nativo) a cualquiera que devuelva la ficha. Pero la ficha es solo una fila en el registro del casino: todos pueden ver quién la posee, y su valor depende de que los sistemas del casino sigan siendo fiables. Retirar mediante near.com es como ir a caja y canjear la ficha. Una vez que los billetes están en un pool blindado, están en tu propia billetera opaca: nadie puede ver ya el importe ni el titular.

---

## Lo que realmente tienes

El ZEC de tu billetera Solana es un token en Solana, no monedas en la red Zcash. El NEAR OmniBridge lo emite y mantiene ZEC reales en la cadena Zcash para respaldarlo; el puente está activo en Solana desde octubre de 2025. Su tramo Solana funciona con mensajes de Wormhole y Chain Signatures de NEAR, no con un cliente ligero Zcash, por lo que el lado Solana es tan fiable como esos dos sistemas. La gente lo llama «ZEC de papel». Sigue el precio de ZEC, pero cada saldo y cada transferencia se encuentran en el registro público de Solana bajo la dirección de tu billetera, y no puede blindarse mientras permanezca allí.

Comprueba que el tuyo sea el token real. En Phantom, toca **ZEC** y desplázate hasta **Acerca de Zcash**. La dirección del contrato debe ser:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](/content-images/01-phantom-zec-mint-4a718bc213.webp)

Phantom la abrevia a `A7bd…QXaS`, así que compara los primeros y últimos caracteres, o busca la dirección completa en [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Cualquier otro token «ZEC» de tu billetera, sin importar su nombre o logotipo, no es este. Déjalo en paz.

---

## Por qué moverlo

El ZEC blindado es el objetivo de Zcash. Cuando tu ZEC está en un pool blindado, el remitente, el destinatario y el importe de cada pago se cifran en la cadena Zcash. Nadie que consulte un explorador puede ver tu saldo.

Ya tienes ZEC. Moverlo a una billetera Zcash te proporciona la parte que lo hace Zcash y elimina el puente de la ecuación: el ZEC nativo en tu propia billetera no depende de que alguien respete un canje.

[¿Quién puede ver tu pago Zcash?](/start-here/who-can-see-your-zcash-payment) explica exactamente qué permanece oculto.

---

## Elige una billetera Zcash

ZecHub no elige una por ti. Elige en el directorio de billeteras [ZecHub](/wallets) y revisa dos etiquetas en la tarjeta de la billetera antes de instalarla:

- **Ironwood: Lista.** Ironwood es el pool al que entra el nuevo ZEC blindado desde la actualización [Ironwood](/zcash-tech/ironwood) del 28 de julio de 2026. El pool Orchard antiguo ya no acepta fondos nuevos.
- **Blindaje automático.** Es útil si un pago llega de forma transparente: la billetera mueve ese ZEC al pool blindado por ti. No consideres esta etiqueta un sustituto de **Ironwood: Lista**. Una billetera puede tener Blindaje automático y aun así carecer de un pool Ironwood (Edge se encuentra hoy en ese estado en el directorio). La mayoría de las demás billeteras muestran en su lugar un botón **Blindar**.

Instala la billetera desde el enlace de su tarjeta de directorio, no desde un resultado de búsqueda ni un anuncio. Escribe la frase semilla en papel y mantenla sin conexión.

Tu billetera muestra dos tipos de dirección:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](/content-images/02-zodl-receive-c98cd378fb.webp)

| Empieza por | Tipo | Lo que ve el público |
|---|---|---|
| `u1` | Dirección unificada | Nada sobre ti, pero solo cuando el pago llega a un pool blindado |
| `t1` | Dirección transparente | Tu dirección y el importe, para siempre, como en Solana |

Usa una `u1` que tu billetera etiquete como blindada. Una `u1` es un conjunto de receptores, y algunas billeteras incluyen un receptor transparente junto al blindado. Un remitente que solo puede pagar direcciones transparentes usará ese, y tu pago llegará de forma pública aunque hayas pegado una `u1`. La dirección blindada de nuestra billetera de prueba no tiene receptor transparente, así que eso no podía suceder. [Pools blindados](/using-zcash/shielded-pools) cubre los receptores con más detalle. Algunas billeteras muestran una `u1` nueva cada vez que abres Recibir; es normal, y todas te pertenecen. La captura de recepción y el campo de destinatario de near.com de esta página usan prefijos `u1` distintos por ese motivo.

Usamos ZODL para nuestra prueba porque era la billetera que ya teníamos configurada. Solo las billeteras que el directorio marca como **Ironwood: Listas** pueden recibir nuevo valor blindado.

---

## Muévelo

La ruta tiene dos partes: coloca tu ZEC en NEAR Intents desde Phantom y después envíalo a tu dirección Zcash. Usamos [solswap.org](https://solswap.org), un sitio creado por NEAR para usuarios de Solana, para la primera parte, y [near.com](https://near.com), la propia aplicación de NEAR, para la segunda. La guía de ZecHub [Cómo hacer swap de ZEC en la billetera Phantom](/using-zcash/solswap) cubre las pantallas de solswap con más detalle. No uses el botón **Swap** propio de Phantom para esto: ya tienes el token, y hacer swap con él no te lleva a ninguna parte.

Conserva un poco de SOL en Phantom para la tarifa Solana.

### 1. Deposita tu ZEC en solswap.org

1. Abre Phantom, ve a la pestaña del navegador, escribe `solswap.org` tú mismo y conecta tu billetera.
2. Toca **Depositar**. Configura **Activo** como **Zcash**, **Red** como **Solana** y el método como **Billetera**.
3. Introduce el importe (o toca **Máx.**) y aprueba la transacción en Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](/content-images/03-solswap-deposit-425691e62f.webp)

Nuestro depósito llegó al bloque Solana a las 15:09:08 (UTC+1), y solswap lo mostró como **Completado** nueve segundos después.

![solswap deposit history showing Completed, +0.0026 ZEC](/content-images/04-solswap-deposit-complete-be5feaf758.webp)

Tu ZEC ahora se encuentra en tu saldo NEAR Intents. Tu clave Phantom autoriza cada salida de ese saldo, los solucionadores NEAR Intents llevan a cabo la entrega y NEAR Intents puede retener un saldo para revisión de cumplimiento (consulta las notas de confianza a continuación).

### 2. Envíalo a tu dirección Zcash en near.com

solswap también tiene una página **Retirar**, pero no nos funcionó. El **Importe recibido** y la **Tarifa** permanecían en «–» y el botón no hacía nada, tanto si elegíamos Zcash como Solana como red.

![solswap Withdraw form with the received amount and fee stuck at a dash](/content-images/05-solswap-withdraw-blank-92c6e64c65.webp)

Si te sucede esto, tu ZEC no está bloqueado. El saldo está vinculado a la clave de tu billetera, no al sitio web, por lo que cualquier aplicación NEAR Intents en la que inicies sesión con esa billetera puede acceder a él. Nosotros terminamos en near.com:

1. Ve a `near.com` e inicia sesión con la misma billetera Phantom.
2. Tu saldo de solswap aparece bajo **Mover activos heredados** (near.com llama «heredados» a los saldos de aplicaciones NEAR Intents antiguas). Toca **Retirar** en la fila ZEC. No necesitas **Mover**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](/content-images/06-nearcom-legacy-assets-7ee16c5ac4.webp)

3. Configura **Red** como **Zcash**, pega la dirección `u1` de tu billetera como **Destinatario** y compara los primeros y últimos seis caracteres con los de tu billetera.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](/content-images/07-nearcom-withdraw-724ef22b38.webp)

4. Toca **Revisar retiro**, lee el resumen y toca **Enviar**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](/content-images/08-nearcom-review-b6053f675b.webp)

5. Phantom te pide **Firmar mensaje** para near.com. Esta firma es lo que autoriza a NEAR Intents a mover tu saldo. No cuesta SOL, pero eso no la hace inocua: un sitio imitador puede mostrar la misma solicitud y vaciar tu saldo NEAR Intents con ella. Antes de tocar **Confirmar**, comprueba todo lo siguiente y toca **Cancelar** si falla aunque sea uno:
   - El sitio indicado en la solicitud es `near.com`. (El depósito del paso 1 fue una solicitud de transacción Phantom normal de `solswap.org`; revisa ese nombre allí del mismo modo.)
   - Abre **Mensaje** y encuentra `"verifying_contract": "intents.near"`.
   - El mensaje es texto legible como el de la captura. Si es un bloque ilegible o el sitio no coincide con el de la barra de direcciones, recházalo.
   - Nunca te pide tu frase semilla. Firmar nunca implica escribirla.

![Phantom Sign Message request from near.com on the Solana network](/content-images/09-phantom-sign-message-cb1ce6d20f.webp)

6. near.com muestra **Procesando envío**, **Enviando** y **Completo**. **Ver en el explorador** abre el registro NEAR Intents de la transferencia.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](/content-images/10-nearcom-complete-c641093c46.webp)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](/content-images/11-intents-explorer-f93f87814e.webp)

### Cuánto costó nuestra prueba y cuánto tardó

| | Nuestra prueba |
|---|---|
| ZEC depositado desde Phantom | 0,00266336 ZEC |
| ZEC recibido en la billetera Zcash | 0,00241336 ZEC, blindado |
| Coste en el lado ZEC | 0,00025 ZEC (near.com mostró «Tarifa 0 ZEC»; el coste está incluido en la cotización) |
| SOL gastado en el depósito | 0,00156844 SOL, de los cuales 0,00008 SOL fueron la tarifa de red |
| Mínimo | No se alcanzó ninguno. solswap indicó un depósito mínimo de 0,00000001 ZEC, y near.com aceptó 0,0026 ZEC |
| Depósito, Phantom a solswap | 9 segundos |
| Retiro, desde la firma en near.com hasta ZEC en la billetera Zcash | Unos 8 minutos (near.com estimó unos 2) |

Registros: depósito Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) en el bloque 3.498.141. Las tarifas y los tiempos cambian con la carga de la red, así que la pantalla de revisión tiene la última palabra cuando lo hagas.

El puente de NEAR publica un mínimo de 0,01 ZEC y una tarifa de 0,00047 ZEC para sus retiros estándar de Zcash. near.com no aplicó ninguno de los dos a nuestros 0,0026 ZEC. Si una aplicación rechaza un importe pequeño, prueba near.com antes de hacer una recarga.

### Otras rutas y en qué confía cada una

Cada ruta fuera de Solana confía en el OmniBridge, porque el puente mantiene el ZEC que respalda tu token. Además:

- **La ruta anterior** confía en NEAR Intents. Tu firma autoriza la transferencia, los solucionadores entregan el ZEC en el lado Zcash y NEAR Intents puede retener fondos para revisión de cumplimiento; en 2026, un titular de Zcash [informó de un swap grande retenido durante semanas](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). También conectas tu billetera a dos sitios web, así que comprueba la barra de direcciones cada vez.
- **Billeteras con NEAR Intents integrado** (busca la función NEAR Intents en el [directorio](/wallets)) usan el mismo sistema desde dentro de la billetera Zcash. La misma confianza, menos sitios web. No probamos esto con ZEC en Solana.
- **Un exchange**, únicamente si acepta depósitos de este token en la red Solana, lo que la mayoría no hace. Entregas la custodia y normalmente tu identidad, y muchos exchanges solo envían ZEC a direcciones `t1`. Consulta [exchanges custodios](/using-zcash/custodial-exchanges).

---

## Blíndalo y comprueba

Llegó blindado. Nuestro ZEC fue a una dirección `u1` y llegó directamente al pool blindado Ironwood. No hubo un paso transparente ni nada que blindar manualmente. La billetera lo mostraba como **Recibiendo…** con un icono de escudo a las 16:07 (UTC+1) mientras reunía confirmaciones.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](/content-images/12-zodl-receiving-cb9f41511d.webp)

Para comprobarlo tú mismo, abre la transacción en tu billetera y copia el ID de la transacción.

![Zcash wallet transaction details with the transaction ID and timestamp](/content-images/13-zodl-tx-details-b08434d680.webp)

Pégalo en [el explorador de bloques Zcash](https://mainnet.zcashexplorer.app). No te confundas con el resumen. El nuestro indica **Entradas / Salidas blindadas 0 / 0** y **Transferido desde/hacia pool blindado 0,0 ZEC**, porque el resumen del explorador todavía no cuenta Ironwood. Las direcciones `t1` que ves están en el lado emisor (el ZEC que gastó y el cambio que conservó), no son las tuyas.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](/content-images/14-explorer-summary-6153afb265.webp)

Haz clic en **TX sin procesar: JSON** y busca `ironwood`. Un `valueBalance` negativo allí es ZEC entrando en el pool Ironwood. El nuestro fue `-0.00241336`, exactamente lo que llegó, y nada en la transacción muestra quién lo recibió.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](/content-images/15-explorer-raw-ironwood-8ff8ae0892.webp)

[Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see) explica el resto de los campos.

### Si pegas una dirección `t1`

No enviamos a una, pero el resultado es predecible. El ZEC llega al saldo transparente de tu billetera, y el explorador muestra tu dirección `t1` y el importe a cualquiera, permanentemente. Una billetera con blindaje automático lo mueve después al pool blindado; de lo contrario, toca **Blindar**, lo cual cuesta una pequeña tarifa de red. La transacción de blindaje también es pública, ya que gasta desde tu dirección `t1`. No se pierde nada, pero el vínculo entre ese depósito y tu billetera permanece en la cadena. Pega la `u1`.

---

## Mantente a salvo

Los nuevos tenedores son objetivo. Casi todas las estafas que verás son una de estas:

- **Tipo de dirección incorrecto.** Una dirección Zcash empieza por `u1`, `t1`, `zs` o `tex1`. Una dirección Solana no tiene ninguno de esos prefijos. Nunca envíes ZEC nativo a una dirección Solana, ni envíes el token Solana a una dirección Zcash.
- **Servicios solo transparentes.** Algunos puentes, sitios de swap y exchanges solo pueden enviar a direcciones `t1`. Es viable si blindas el ZEC en cuanto llegue. Solo no lo dejes allí.
- **Billeteras falsas.** Instala únicamente desde el enlace de la tarjeta del directorio de billeteras [](/wallets) o desde la ficha oficial de la tienda de aplicaciones a la que dirige. Las aplicaciones falsas de billeteras de criptomonedas sí se cuelan en las tiendas de aplicaciones, y parecen exactamente reales.
- **Phishing de frases semilla.** Ninguna billetera, puente, sitio de swap, agente de soporte, moderador ni airdrop necesita jamás tu frase semilla. Firmar un mensaje nunca implica escribirla. Cualquiera que la pida intenta robarte. [Recuperar fondos](/using-zcash/recovering-funds) cubre la versión de esta estafa de «recuperaremos tu billetera».
- **Tokens fraudulentos y sitios de «reclamo».** Tokens llamados ZEC, Zcash o algo parecido aparecen sin que los solicites en billeteras Solana, a menudo con un enlace para «reclamar» más. Conectar tu billetera a ese enlace puede vaciarla. Comprueba la dirección del contrato al inicio de esta página e ignora todo lo demás.
- **Solicitudes de firma maliciosas.** Una solicitud de «Firmar mensaje» puede mover tu saldo NEAR Intents sin ninguna tarifa de SOL. Firma solo en `near.com` o `solswap.org`, y únicamente cuando el mensaje nombre `intents.near` (el paso 5 anterior muestra qué comprobar).
- **Sitios imitadores.** Escribe `solswap.org` y `near.com` tú mismo o usa marcadores. No sigas enlaces de mensajes directos, respuestas o anuncios.

---

## Errores comunes

- **Usar el botón Swap de Phantom** en vez del flujo de depósito. Ya tienes el token: hacer swap simplemente cambia un ZEC de papel por otro token y no te acerca al ZEC nativo.
- **Pegar una dirección `t1`**, o una `u1` que oculte un receptor transparente, cuando tu billetera ofrece una `u1` solo blindada. El depósito llega de forma pública y queda vinculado permanentemente a tu billetera.
- **Asumir que los fondos están bloqueados** cuando la página Retirar de solswap muestra «–». El saldo sigue tu clave Phantom, no el sitio web: termina el retiro en near.com.
- **Firmar un mensaje sin comprobarlo.** Un sitio imitador puede vaciar tu saldo NEAR Intents con una sola firma. El sitio debe ser `near.com` y el mensaje debe contener `"verifying_contract": "intents.near"`.
- **Confundir los dos tickers «ZEC».** El token Solana y el Zcash nativo ZEC comparten nombre, pero no red: enviar cualquiera a la otra cadena lo pierde.

## Qué hacer con ZEC blindado

- Mantén la privacidad cuando lo gastes: [Usar ZEC de forma privada](/guides/using-zec-privately)
- Encuentra lugares que lo acepten: [Lugares donde gastar ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envíalo con un mensaje privado adjunto: [Memos](/using-zcash/memos)
- Paga a alguien sin vincular tu identidad: [Enviar dinero sin vincular la identidad](/zcash-use-cases/send-money-without-linking-identity)

---

## Páginas relacionadas

- [Cómo hacer swap de ZEC en la billetera Phantom](/using-zcash/solswap) — las pantallas de solswap con más detalle
- [Pools blindados](/using-zcash/shielded-pools) — qué son los pools Ironwood/Orchard y cómo funcionan los receptores
- [¿Quién puede ver tu pago Zcash?](/start-here/who-can-see-your-zcash-payment) — qué oculta realmente el blindaje
- [Billeteras](/wallets) — el directorio; revisa la etiqueta **Ironwood: Lista**
- [Exchanges custodios](/using-zcash/custodial-exchanges) — la contrapartida que esta ruta evita
- [Recuperar fondos](/using-zcash/recovering-funds) — qué conservar a salvo para no perder nunca el acceso
