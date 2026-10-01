<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ¿Tienes ZEC en Solana? Muévelo a Zcash blindado

Esta página es para ti si ZEC apareció en tu wallet de Solana porque tienes ZCAT, u otro token de Solana que paga a sus titulares en ZEC. No necesitas vender nada para seguir esta guía. Moverás los ZEC que ya tienes de Solana a una wallet de Zcash y acabarás con ellos blindados.

Realizamos cada paso siguiente con una transferencia real el 27 de septiembre de 2026, empezando con 0.00266336 ZEC en Phantom. Las comisiones, los tiempos y las pantallas de esta página son los que vimos.

---

## Lo que realmente tienes

Los ZEC de tu wallet de Solana son un token en Solana, no monedas en la red de Zcash. El OmniBridge de NEAR lo emite y mantiene ZEC reales en la cadena de Zcash como respaldo; el bridge está activo en Solana desde octubre de 2025. Su parte en Solana funciona con mensajes de Wormhole y NEAR Chain Signatures, no con un cliente ligero de Zcash, por lo que el lado de Solana es tan sólido como esos dos sistemas. La gente lo llama «ZEC de papel». Sigue el precio de ZEC, pero cada saldo y cada transferencia se encuentran en el registro público de Solana bajo la dirección de tu wallet, y no puede blindarse mientras permanezca allí.

Comprueba que el tuyo sea el token real. En Phantom, toca **ZEC** y desplázate hasta **Acerca de Zcash**. La dirección del contrato debe ser:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantom la abrevia a `A7bd…QXaS`, así que compara los primeros y últimos caracteres, o busca la dirección completa en [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Cualquier otro token «ZEC» de tu wallet, sea cual sea su nombre o logotipo, no es este. No lo toques.

---

## Por qué moverlo

Los ZEC blindados son el objetivo de Zcash. Cuando tus ZEC se encuentran en un pool blindado, el remitente, el destinatario y el importe de cada pago se cifran en la cadena de Zcash. Nadie que navegue por un explorador puede ver tu saldo.

Ya tienes ZEC. Moverlos a una wallet de Zcash te da la parte que los hace Zcash, y elimina el bridge de la ecuación: los ZEC nativos en tu propia wallet no dependen de que alguien respete un canje.

[¿Quién puede ver tu pago de Zcash?](/start-here/who-can-see-your-zcash-payment) explica exactamente qué permanece oculto.

---

## Elige una wallet de Zcash

ZecHub no elige una por ti. Elige en el directorio de wallets de [ZecHub](/wallets) y comprueba dos etiquetas en la tarjeta de la wallet antes de instalarla:

- **Ironwood: Lista.** Ironwood es el pool al que entran los nuevos ZEC blindados desde la actualización de [Ironwood](/zcash-tech/ironwood) del 28 de julio de 2026. El pool más antiguo de Orchard ya no acepta nuevos fondos.
- **Blindaje automático.** Es útil si un pago llega de forma transparente: la wallet mueve esos ZEC al pool blindado por ti. No trates esta etiqueta como sustituto de **Ironwood: Lista**. Una wallet puede tener blindaje automático y aun así carecer de un pool de Ironwood (Edge está hoy en ese estado en el directorio). La mayoría de las demás wallets muestran en su lugar un botón **Shield**.

Instala la wallet desde el enlace de su tarjeta en el directorio, no desde un resultado de búsqueda ni un anuncio. Escribe la frase semilla en papel y mantenla sin conexión.

Tu wallet muestra dos tipos de dirección:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| Empieza por | Tipo | Lo que ve el público |
|---|---|---|
| `u1` | Unified Address | Nada sobre ti, pero solo cuando el pago llega a un pool blindado |
| `t1` | Dirección transparente | Tu dirección y el importe, para siempre, como en Solana |

Usa una `u1` que tu wallet etiquete como blindada. Una `u1` es un conjunto de receptores, y algunas wallets incluyen un receptor transparente junto al blindado. Un remitente que solo puede pagar direcciones transparentes usará ese, y tu pago llegará de forma pública aunque hayas pegado una `u1`. La dirección blindada de nuestra wallet de prueba no tiene receptor transparente, así que eso no podía ocurrir. [Pools blindados](/using-zcash/shielded-pools) cubre los receptores con más detalle. Algunas wallets muestran una `u1` nueva cada vez que abres Recibir; es normal, y todas te pertenecen. La captura de recepción y el campo de destinatario de near.com de esta página usan prefijos de `u1` distintos por ese motivo.

Usamos ZODL para nuestra prueba porque era la wallet que ya teníamos configurada. Solo las wallets que el directorio marca como **Ironwood: Lista** pueden recibir nuevo valor blindado.

---

## Muévelo

La ruta tiene dos partes: deposita tus ZEC en NEAR Intents desde Phantom, y después envíalos a tu dirección de Zcash. Usamos [solswap.org](https://solswap.org), un sitio creado por NEAR para usuarios de Solana, para la primera parte y [near.com](https://near.com), la propia aplicación de NEAR, para la segunda. La guía de ZecHub, [Cómo intercambiar por ZEC en la wallet Phantom](/using-zcash/solswap), explica las pantallas de solswap con más detalle. No uses el botón **Swap** de Phantom para esto: ya tienes el token, e intercambiarlo no te lleva a ninguna parte.

Mantén un poco de SOL en Phantom para la comisión de Solana.

### 1. Deposita tus ZEC en solswap.org

1. Abre Phantom, ve a la pestaña del navegador, escribe `solswap.org` tú mismo y conecta tu wallet.
2. Toca **Deposit**. Configura **Asset** como **Zcash**, **Network** como **Solana** y el método como **Wallet**.
3. Introduce el importe (o toca **Max**) y aprueba la transacción en Phantom.

![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

Nuestro depósito llegó al bloque de Solana a las 15:09:08 (UTC+1) y solswap lo mostró como **Completed** nueve segundos después.

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

Tus ZEC ahora están en tu saldo de NEAR Intents. Tu clave de Phantom autoriza cada movimiento que sale de él, los solucionadores de NEAR Intents realizan la entrega y NEAR Intents puede retener un saldo para revisión de cumplimiento (consulta las notas de confianza a continuación).

### 2. Envíalos a tu dirección de Zcash en near.com

solswap también tiene una página **Withdraw**, pero no nos funcionó. **Received amount** y **Fee** se quedaron en «–» y el botón no hacía nada, tanto si elegíamos Zcash como Solana como red.

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

Si te ocurre esto, tus ZEC no están bloqueados. El saldo está vinculado a la clave de tu wallet, no al sitio web, así que cualquier aplicación de NEAR Intents en la que inicies sesión con esa wallet puede acceder a él. Terminamos en near.com:

1. Ve a `near.com` e inicia sesión con la misma wallet de Phantom.
2. Tu saldo de solswap aparece en **Move legacy assets** (near.com llama «legacy» a los saldos de aplicaciones de NEAR Intents más antiguas). Toca **Withdraw** en la fila de ZEC. No necesitas **Move**.

![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. Configura **Network** como **Zcash**, pega la dirección de `u1` de tu wallet como **Recipient** y compara los primeros y últimos seis caracteres con los de tu wallet.

![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. Toca **Review withdrawal**, lee el resumen y toca **Send**.

![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantom te pide **Sign Message** para near.com. Esta firma es la que autoriza a NEAR Intents a mover tu saldo. No cuesta SOL, pero eso no la hace inocua: un sitio imitador puede mostrar la misma solicitud y vaciar con ella tu saldo de NEAR Intents. Antes de tocar **Confirm**, comprueba todo lo siguiente y toca **Cancel** si alguno falla:
   - El sitio indicado en la solicitud es `near.com`. (El depósito del paso 1 fue una solicitud de transacción ordinaria de Phantom desde `solswap.org`; comprueba ese nombre allí del mismo modo.)
   - Abre **Message** y encuentra `"verifying_contract": "intents.near"`.
   - El mensaje es texto legible como el de la captura. Si es un bloque ilegible, o el sitio no coincide con el de tu barra de direcciones, recházalo.
   - Nunca te pide tu frase semilla. Firmar nunca implica escribirla.

![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.com muestra **Processing send**, **Sending** y **Complete**. **View on explorer** abre el registro de NEAR Intents de la transferencia.

![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### Cuánto costó nuestra prueba y cuánto tardó

| | Nuestra prueba |
|---|---|
| ZEC depositados desde Phantom | 0.00266336 ZEC |
| ZEC recibidos en la wallet de Zcash | 0.00241336 ZEC, blindados |
| Coste en el lado de ZEC | 0.00025 ZEC (near.com mostraba «Fee 0 ZEC»; el coste está incluido en el precio de la cotización) |
| SOL gastado en el depósito | 0.00156844 SOL, de los cuales 0.00008 SOL fueron la comisión de red |
| Mínimo | No se alcanzó ninguno. solswap indicaba un depósito mínimo de 0.00000001 ZEC, y near.com aceptó 0.0026 ZEC |
| Depósito, de Phantom a solswap | 9 segundos |
| Retiro, desde la firma en near.com hasta los ZEC en la wallet de Zcash | Unos 8 minutos (near.com estimó unos 2) |

Registros: depósito en Solana [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) en el bloque 3,498,141. Las comisiones y los tiempos cambian según la carga de la red, así que la pantalla de revisión tiene la última palabra cuando lo hagas.

El bridge de NEAR publica un mínimo de 0.01 ZEC y una comisión de 0.00047 ZEC para sus retiros estándar de Zcash. near.com no aplicó ninguno de los dos a nuestros 0.0026 ZEC. Si una aplicación rechaza una cantidad pequeña, prueba near.com antes de recargar.

### Otras rutas y en qué confía cada una

Cada ruta para salir de Solana confía en OmniBridge, porque el bridge mantiene los ZEC que respaldan tu token. Además:

- **La ruta anterior** confía en NEAR Intents. Tu firma autoriza la transferencia, los solucionadores entregan los ZEC en el lado de Zcash y NEAR Intents puede retener fondos para revisión de cumplimiento; en 2026, un titular de Zcash [informó de un gran intercambio retenido durante semanas](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). También conectas tu wallet a dos sitios web, así que comprueba la barra de direcciones cada vez.
- **Wallets con NEAR Intents incorporado** (busca la función NEAR Intents en el [directorio](/wallets)) usan el mismo sistema desde dentro de la wallet de Zcash. La misma confianza, menos sitios web. No probamos esto con ZEC en Solana.
- **Un exchange**, solo si acepta depósitos de este token en la red de Solana, cosa que la mayoría no hace. Entregas la custodia y normalmente tu identidad, y muchos exchanges solo envían ZEC a direcciones de `t1`. Consulta [exchanges con custodia](/using-zcash/custodial-exchanges).

---

## Blíndalo y comprueba

Llegó blindado. Nuestros ZEC fueron a una dirección de `u1` y llegaron directamente al pool blindado de Ironwood. No hubo un paso transparente ni nada que blindar manualmente. La wallet lo mostraba como **Receiving…** con un icono de blindaje a las 16:07 (UTC+1) mientras recopilaba confirmaciones.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

Para comprobarlo tú mismo, abre la transacción en tu wallet y copia el ID de transacción.

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

Pégalo en [el explorador de bloques de Zcash](https://mainnet.zcashexplorer.app). No te desconcierte el resumen. El nuestro dice **Shielded Inputs / Outputs 0 / 0** y **Transferred from/to shielded pool 0.0 ZEC**, porque el resumen del explorador aún no cuenta Ironwood. Las direcciones de `t1` que ves están en el lado de envío (los ZEC que gastó y el cambio que conservó), no son las tuyas.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

Haz clic en **Raw TX: JSON** y busca `ironwood`. Un `valueBalance` negativo allí significa que los ZEC entran en el pool de Ironwood. El nuestro fue `-0.00241336`, exactamente lo que llegó, y nada en la transacción muestra quién lo recibió.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[Lo que puede ver un explorador de bloques](/zcash-tech/what-a-block-explorer-can-see) explica el resto de los campos.

### Si pegas una dirección de `t1`

No enviamos a una, pero el resultado es predecible. Los ZEC llegan al saldo transparente de tu wallet, y el explorador muestra tu dirección de `t1` y el importe a cualquiera, permanentemente. Una wallet con blindaje automático los mueve después al pool blindado; de lo contrario, toca **Shield**, lo que cuesta una pequeña comisión de red. La transacción de blindaje también es pública, ya que gasta desde tu dirección de `t1`. No se pierde nada, pero el vínculo entre ese depósito y tu wallet permanece en la cadena. Pega la `u1`.

---

## Mantente a salvo

Los nuevos titulares son objetivos. Casi todas las estafas que verás son una de estas:

- **Tipo de dirección equivocado.** Una dirección de Zcash empieza por `u1`, `t1`, `zs` o `tex1`. Una dirección de Solana no tiene ninguno de esos prefijos. Nunca envíes ZEC nativos a una dirección de Solana, ni envíes el token de Solana a una dirección de Zcash.
- **Servicios exclusivamente transparentes.** Algunos bridges, sitios de intercambio y exchanges solo pueden enviar a direcciones de `t1`. Es viable si blindas los ZEC en cuanto lleguen. Simplemente no los dejes allí.
- **Wallets falsas.** Instala solo desde el enlace de la tarjeta del [directorio de wallets](/wallets) o desde la ficha oficial de la tienda de aplicaciones a la que dirige. Las aplicaciones falsas de wallets de criptomonedas llegan a las tiendas de aplicaciones, y se parecen exactamente a las reales.
- **Phishing de frases semilla.** Ninguna wallet, bridge, sitio de intercambio, agente de soporte, moderador ni airdrop necesita jamás tu frase semilla. Firmar un mensaje nunca implica escribirla. Cualquiera que la pida intenta robarte. [Recuperación de fondos](/using-zcash/recovering-funds) cubre la versión de esta estafa de «recuperaremos tu wallet».
- **Tokens fraudulentos y sitios de «claim».** Tokens llamados ZEC, Zcash o algo parecido aparecen sin que los pidas en wallets de Solana, a menudo con un enlace para «claim» más. Conectar tu wallet a ese enlace puede vaciarla. Comprueba la dirección del contrato al inicio de esta página e ignora todo lo demás.
- **Solicitudes de firma maliciosas.** Una solicitud «Sign Message» puede mover tu saldo de NEAR Intents sin ninguna comisión de SOL. Firma solo en `near.com` o `solswap.org`, y solo cuando el mensaje nombre a `intents.near` (el paso 5 anterior muestra qué comprobar).
- **Sitios imitadores.** Escribe `solswap.org` y `near.com` tú mismo o usa marcadores. No sigas enlaces de mensajes directos, respuestas o anuncios.

---

## Qué hacer con ZEC blindados

- Mantén la privacidad cuando los gastes: [Usar ZEC de forma privada](/guides/using-zec-privately)
- Encuentra lugares que los acepten: [Lugares donde gastar ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Envíalos con un mensaje privado adjunto: [Memos](/using-zcash/memos)
- Paga a alguien sin vincular tu identidad: [Enviar dinero sin vincular la identidad](/zcash-use-cases/send-money-without-linking-identity)
