# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Paga Servicios de IA en Privado con ZEC Blindado

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Principiante - 10 min
</span>


## TL;DR

- **NanoGPT** acepta ZEC blindado directamente, sin cuenta y sin correo electrónico
- La recarga mínima es de **$0.10**, así que puedes probarlo por unas monedas
- El crédito llega en unos **30 segundos**, con la primera confirmación
- Para servicios que no aceptan ZEC, usa **CrossPay** para gastar ZEC blindado y que les paguen en USDC
- Lo que termina en la cadena depende de **en qué pool esté tu ZEC**, y la pantalla nunca te lo dice

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> ¿Para quién es esto?

- Cualquiera que no quiera una suscripción de IA vinculada a su nombre
- Desarrolladores que pagan inferencia sin una tarjeta corporativa
- Personas en países donde los pagos con tarjeta a servicios de IA fallan
- Cualquiera que prefiera no entregar un correo electrónico para probar un modelo

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> El Problema

Pagar IA normalmente implica una tarjeta, un correo electrónico y una cuenta. Eso vincula cada prompt que escribes con tu identidad legal, y el procesador de pagos también lo ve.

Se supone que las criptomonedas solucionan esto, pero la mayoría de las guías están desactualizadas. Los servicios cambian lo que aceptan, y una guía escrita hace un año te llevará por una ruta que ya no funciona.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> ¿Por qué Zcash?

Un pago blindado oculta el remitente, el receptor y la cantidad. El servicio recibe el pago, y nadie que observe la cadena aprende quién pagó ni cuánto.

Eso solo se cumple si pagas **desde** fondos blindados. Esta página especifica claramente cuándo se cumple y cuándo no.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Lo Que Necesitas

- ZEC en un saldo **blindado**
- Una wallet que pueda enviar a una dirección unificada. Este recorrido usa **Noir Wallet**, una extensión de navegador, para que todo el flujo se mantenga en una sola ventana. Zkool y Zodl funcionan de la misma manera
- Aproximadamente $1 para seguir el ejemplo

> **¿Vienes desde un exchange?** La mayoría de los exchanges, incluido Binance, solo retiran ZEC a direcciones **transparentes**, y no aceptarán una dirección `u1...` como destino. Retira primero a tu propia dirección transparente, blíndala en tu wallet y luego paga desde el saldo blindado.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Ruta 1: Pagar NanoGPT directamente

[NanoGPT](https://nano-gpt.com/) te da acceso a más de 200 modelos, incluidos GPT, Claude, Gemini y modelos de imagen, y acepta ZEC de forma nativa.

### Paso 1: Ábrelo. No hay registro

Ve a nano-gpt.com y empieza a usarlo. Cada sesión es anónima por defecto y la propia app lo dice: *"You are already using NanoGPT privately."* No hay ninguna cuenta que crear ni ningún correo electrónico que entregar.

### Paso 2: Guarda primero un token de inicio de sesión

Antes de poner dinero, abre **Settings** y crea un token de inicio de sesión, luego guárdalo en un lugar seguro.

> **Este paso protege tu dinero.** Un saldo anónimo vive en los datos locales de tu navegador. Si borras las cookies sin un token guardado, el saldo desaparece, sin ninguna cuenta desde la que recuperarlo. Haz esto antes de depositar, no después.

### Paso 3: Añade saldo

Abre **Balance**, elige **Custom** e introduce una cantidad. El mínimo es **$0.10** y el máximo es $5,000. NanoGPT te dice lo que compra, alrededor de 12 prompts de GPT 5.5 o 18 imágenes por $1.

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Paso 4: Elige Zcash

Selecciona **Digital currencies** y luego **Zcash** en la cuadrícula.

Recibirás un código QR, una dirección de pago y un **mínimo de transferencia** en ZEC para la cantidad que elegiste. Esa cifra se calcula en el momento en que carga la página.

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Paso 5: Envía desde tu wallet

Copia la dirección en tu wallet, introduce la cantidad y envía. La comisión de red es de aproximadamente **0.00015 ZEC**.

> **Envía un poco más del mínimo.** La cotización se calcula cuando carga la página y ZEC se mueve antes de que tu transacción se confirme. En las pruebas, enviar exactamente el mínimo resultó en **$0.99** en lugar de $1.00. Enviar un poco más resultó en $1.17 por el mismo $1 nominal, porque NanoGPT acredita lo que realmente envías.

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### Paso 6: Espera unos 30 segundos

Tu wallet mostrará la transacción como pendiente y luego confirmándose. NanoGPT acredita el saldo con la **primera confirmación**, así que no tienes que esperar a las tres.

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

El saldo aparece y puedes gastarlo inmediatamente.

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Ruta 2: Servicios que no aceptan ZEC

La mayoría de los servicios de IA no aceptan ZEC. **Venice.ai** y **OpenRouter** aceptan USDC en su lugar, y OpenRouter te permite elegir en qué cadena se liquida el pago.

Para esos casos, usa **CrossPay** en [Zodl](/zcash-organizations/zodl). Gastas ZEC blindado y al destinatario se le paga en el activo que pidió, enrutado a través de NEAR Intents sin un exchange centralizado y sin KYC.

1. Obtén la dirección de pago del servicio y el activo y la cadena que espera, por ejemplo USDC en Base
2. Abre Zodl y elige **CrossPay**
3. Introduce esa dirección, selecciona el activo que quiere el servicio e introduce la cantidad
4. Envía desde tu saldo blindado

Tu ZEC sale blindado. El servicio ve llegar un pago normal en USDC y nunca sabe que comenzó como ZEC.

> La parte del swap es visible en la cadena de destino, así que el pago en USDC en sí es tan público como cualquier otro pago en USDC. Lo que permanece privado es el lado de Zcash y el vínculo entre ambos.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Qué se revela en cada paso

Esta es la parte que la mayoría de las guías omiten.

| Qué ocurre | Qué aprende el servicio | Qué queda en la cadena |
|---|---|---|
| Navegar y escribir prompts | Nada. Sin cuenta, sin correo electrónico | Nada |
| Se emite una dirección de depósito | Nada | Nada |
| Pagas **desde Sapling** | La dirección de depósito que usaste | Nada. Blindado a blindado |
| Pagas **desde Ironwood** | Lo mismo | **La cantidad y la altura del bloque** |
| Pagas **desde una dirección transparente** | Lo mismo | La cantidad y tu t-address |
| Cualquiera de los casos anteriores | Tu IP, a menos que uses Tor o una VPN | No aplica |

### Por qué importa el pool

La dirección de depósito de NanoGPT es una dirección unificada. Al decodificar una emitida en agosto de 2026 se muestran exactamente dos receptores: **Sapling** y **Orchard**.

Desde que la actualización [Ironwood](/zcash-tech/ironwood) se activó el 28 de julio de 2026, Orchard es solo de gasto y ya no puede entrar nuevo valor en él. Eso deja a **Sapling como el único receptor en el que realmente puede aterrizar un pago**.

Así que, si tu ZEC ya está en Sapling, el pago es de Sapling a Sapling y nada de eso es público. Pero si has migrado a Ironwood, al pagar mueves valor a través de un límite entre pools, y [the turnstile](/zcash-tech/the-turnstile) publica la cantidad y la altura aunque el remitente y el receptor permanezcan ocultos.

Las pantallas se ven idénticas en ambos casos. Mantener un pequeño saldo en Sapling para pagos es la solución más simple.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errores Comunes que Debes Evitar

- Depositar antes de guardar un token de inicio de sesión y luego borrar las cookies
- Enviar exactamente el mínimo de transferencia y quedarse un centavo corto
- Intentar retirar directamente desde un exchange a una dirección `u1...`
- Suponer que el pago es privado sin comprobar desde qué pool gastaste
- Pagar a través de una conexión normal cuando el objetivo era precisamente no ser identificado

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Puedes:

- Usar modelos de IA de frontera sin una cuenta, un correo electrónico ni una tarjeta
- Pagar en ZEC blindado y saber exactamente qué oculta y qué no
- Llegar a servicios que nunca han oído hablar de Zcash, a través de CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Ironwood](/zcash-tech/ironwood) - por qué cambió el pool en el que se encuentran tus fondos
- [The Turnstile](/zcash-tech/the-turnstile) - qué se vuelve público cuando el valor cruza entre pools
- [Wallets](/using-zcash/wallets) - qué wallets se mantienen
- [ZODL](/zcash-organizations/zodl) - la wallet detrás de CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progreso

**Paso 1 de 1**

Has pagado un servicio de IA con ZEC blindado y sabes qué reveló.

<br/>

## Siguiente Paso

- [Enviar dinero sin vincular tu identidad](/zcash-use-cases/send-money-without-linking-identity)

<br/>
