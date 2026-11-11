# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Paga servicios de IA de forma privada con ZEC blindado [shielded]

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Principiante - 10 min
</span>


## TL;DR

- **NanoGPT** acepta ZEC blindado directamente, sin cuenta ni correo electrónico
- La recarga [top up] mínima es de **$0.10**, así que puedes probarlo con muy poco dinero
- El crédito llega en unos **30 segundos**, con la primera confirmación
- Para servicios que no aceptan ZEC, usa **CrossPay** para gastar ZEC blindado y hacer que les paguen en USDC
- Lo que termina on-chain depende de **en qué pool está tu ZEC**, y la pantalla nunca te lo indica

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> ¿Para quién es esto?

- Para cualquiera que no quiera una suscripción de IA vinculada a su nombre
- Para desarrolladores [developer] que pagan por inferencia sin una tarjeta corporativa
- Para personas en países donde los pagos con tarjeta a servicios de IA fallan
- Para cualquiera que prefiera no entregar un correo electrónico para probar un modelo

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> El problema

Pagar por IA normalmente implica una tarjeta, un correo electrónico y una cuenta. Eso vincula cada prompt que escribes con tu identidad legal, y el procesador de pagos también lo ve.

Se supone que las criptomonedas solucionan esto, pero la mayoría de las guías están desactualizadas. Los servicios cambian lo que aceptan, y una guía paso a paso escrita hace un año te llevará por una ruta que ya no funciona.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> ¿Por qué Zcash?

Un pago [payment] blindado oculta al remitente, al receptor y el importe. El servicio recibe el pago, y nadie que observe la red [chain] sabe quién pagó ni cuánto.

Esto solo se cumple si pagas **desde** fondos blindados. Esta página especifica cuándo se cumple y cuándo no.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Lo que necesitas

- ZEC en un saldo **blindado**
- Una billetera [wallet] que pueda enviar a una dirección [address] unificada. Esta guía usa **Noir Wallet**, una extensión de navegador, para que todo el proceso permanezca en una sola ventana. Zkool y Zodl funcionan de la misma forma
- Aproximadamente $1 para seguir los pasos

> **¿Vienes de un exchange?** La mayoría de los exchanges, incluido Binance, solo retiran ZEC a direcciones **transparentes [transparent]**, y no aceptarán una dirección `u1...` como destino. Primero retira a tu propia dirección transparente, protégela en tu billetera y después paga desde el saldo blindado.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Ruta 1: Paga a NanoGPT directamente

[NanoGPT](https://nano-gpt.com/) te ofrece más de 200 modelos, incluidos GPT, Claude, Gemini y modelos de imagen, y acepta ZEC de forma nativa.

### Paso 1: Ábrelo. No hay registro

Ve a nano-gpt.com y empieza a usarlo. Cada sesión es anónima de forma predeterminada y la aplicación lo dice claramente: *«Ya estás usando NanoGPT de forma privada.»* No hay ninguna cuenta que crear ni correo electrónico que entregar.

### Paso 2: Guarda primero un token de inicio de sesión

Antes de ingresar dinero, abre **Settings** y crea un token de inicio de sesión; luego guárdalo en un lugar seguro.

> **Este paso protege tu dinero.** Un saldo anónimo reside en los datos locales de tu navegador. Si borras tus cookies sin un token guardado, el saldo desaparece y no hay ninguna cuenta desde la que recuperarlo. Hazlo antes de depositar, no después.

### Paso 3: Añade saldo

Abre **Balance**, elige **Custom** e introduce un importe. El mínimo es **$0.10** y el máximo es $5,000. NanoGPT te indica lo que puedes comprar: unos 12 prompts de GPT 5.5 o 18 imágenes por $1.

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Paso 4: Elige Zcash

Selecciona **Digital currencies** y luego **Zcash** de la cuadrícula.

Recibirás un código QR, una dirección de pago y un **mínimo de transferencia** en ZEC para el importe que elegiste. Esa cifra se cotiza en el momento en que carga la página.

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Paso 5: Envía desde tu billetera

Copia la dirección en tu billetera, introduce el importe y envía. La comisión [fee] de red es de aproximadamente **0.00015 ZEC**.

> **Envía un poco más del mínimo.** La cotización se fija cuando carga la página y ZEC cambia antes de que se confirme tu transacción [transaction]. En las pruebas, enviar exactamente el mínimo resultó en **$0.99** en vez de $1.00. Enviar un poco más resultó en $1.17 por el mismo $1 nominal, porque NanoGPT acredita lo que realmente envías.

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### Paso 6: Espera unos 30 segundos

Tu billetera mostrará la transacción como pendiente y luego en confirmación. NanoGPT acredita el saldo con la **primera confirmación**, así que no tienes que esperar las tres.

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

El saldo aparece y puedes gastarlo de inmediato.

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Ruta 2: Servicios que no aceptan ZEC

La mayoría de los servicios de IA no aceptan ZEC. **Venice.ai** y **OpenRouter** aceptan USDC en su lugar, y OpenRouter te permite elegir en qué red se liquida el pago.

Para esos servicios, usa **CrossPay** en [Zodl](/zcash-organizations/zodl). Gastas ZEC blindado y el destinatario recibe el pago en el activo que solicitó, enrutado mediante NEAR Intents sin un exchange centralizado ni KYC.

1. Obtén la dirección de pago del servicio y el activo y la red que espera, por ejemplo USDC en Base
2. Abre Zodl y elige **CrossPay**
3. Introduce esa dirección, selecciona el activo que quiere el servicio e introduce el importe
4. Envía desde tu saldo blindado

Tu ZEC sale blindado. El servicio ve llegar un pago USDC normal y nunca sabe que comenzó como ZEC.

> El tramo de swap es visible en la red de destino, así que el pago USDC en sí es tan público como cualquier otro pago USDC. Lo que permanece privado es el lado Zcash y el vínculo entre ambos.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Qué se revela en cada paso

Esta es la parte que la mayoría de las guías omite.

| Lo que ocurre | Lo que aprende el servicio | Lo que queda on-chain |
|---|---|---|
| Navegar y escribir prompts | Nada. Sin cuenta ni correo electrónico | Nada |
| Se emite una dirección de depósito | Nada | Nada |
| Pagas **desde Sapling** | La dirección de depósito que utilizaste | Nada. De blindado a blindado |
| Pagas **desde Ironwood** | Lo mismo | **El importe y la altura del bloque [block]** |
| Pagas **desde una dirección transparente** | Lo mismo | El importe y tu t-address |
| Cualquiera de los anteriores | Tu IP, salvo que uses Tor o una VPN | No aplicable |

### Por qué importa el pool

La dirección de depósito de NanoGPT es una dirección unificada. Al decodificar una emitida en agosto de 2026, se muestran exactamente dos receptores: **Sapling** y **Orchard**.

Desde que la actualización [Ironwood](/zcash-tech/ironwood) se activó el 28 de julio de 2026, Orchard es solo para gastar y ningún valor nuevo puede entrar en él. Eso deja **Sapling como el único receptor en el que un pago puede realmente llegar**.

Por lo tanto, si tu ZEC ya está en Sapling, el pago es de Sapling a Sapling y nada al respecto es público. Pero si has migrado a Ironwood, pagar mueve valor a través de un límite entre pools, y [the turnstile](/zcash-tech/the-turnstile) publica el importe y la altura aunque el remitente y el receptor permanezcan ocultos.

Las pantallas se ven idénticas de cualquier forma. Mantener un pequeño saldo de Sapling para pagos es la solución más sencilla.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errores comunes que debes evitar

- Depositar antes de guardar un token de inicio de sesión y luego borrar las cookies
- Enviar exactamente el mínimo de transferencia y quedarse un céntimo corto
- Intentar retirar directamente de un exchange a una dirección `u1...`
- Suponer que el pago es privado sin comprobar de qué pool gastaste
- Pagar mediante una conexión normal cuando el objetivo era no ser identificado

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Puedes:

- Usar modelos de IA de vanguardia sin cuenta, correo electrónico ni tarjeta
- Pagar en ZEC blindado y saber exactamente qué oculta y qué no
- Llegar a servicios que nunca han oído hablar de Zcash, mediante CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Ironwood](/zcash-tech/ironwood) - por qué cambió el pool en el que se encuentran tus fondos
- [The Turnstile](/zcash-tech/the-turnstile) - qué se vuelve público cuando el valor cruza pools
- [Billeteras](/using-zcash/wallets) - qué billeteras se mantienen
- [ZODL](/zcash-organizations/zodl) - la billetera detrás de CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progreso

**Paso 1 de 1**

Has pagado por un servicio de IA con ZEC blindado y sabes qué reveló.

<br/>

## Siguiente paso

- [Envía dinero sin vincular tu identidad](/zcash-use-cases/send-money-without-linking-identity)

<br/>
