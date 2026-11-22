# <img src="/content-images/people-community-add-svgrepo-com-3c6ac75333.svg" width="24" height="24" alt="community icon"/> Organiza una campaña de recaudación de fondos con ZEC

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermedio - 10 min
</span>

## TL;DR

- Dale a la campaña su propia cuenta en la billetera (wallet) y una dirección (address) blindada (shielded), para que nunca se mezcle con otros fondos
- Comparte un enlace de solicitud de pago (payment) o un código QR con un monto sugerido y un memo ya completado
- Muestra el progreso sin exponer a los donantes: publica tú mismo el total o entrega claves de visualización (viewing key) a un único revisor de confianza
- Las claves de visualización abarcan toda la cuenta, no solo una dirección, y por eso la campaña tiene su propia cuenta
- Cierra la campaña en la fecha que prometiste y publica en qué se usó el dinero

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> ¿Para quién es esto?

- Grupos comunitarios, proyectos de código abierto y creadores que recaudan dinero para un objetivo concreto
- Organizaciones sin fines de lucro que realizan una campaña de fin de año o de emergencia en ZEC
- Cualquiera que quiera que los donantes confíen en la campaña sin hacer pública cada donación

Si eres una organización sin fines de lucro de EE. UU., lee primero [Acepta donaciones privadas como organización sin fines de lucro de EE. UU.](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) para los recibos y los formularios IRS.

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> El problema

La mayoría de las recaudaciones de fondos con criptomonedas usan una dirección transparente (transparent) para que los donantes puedan ver cómo crece el total. Eso también muestra cada donación, su monto, cuándo llegó y adónde va el dinero después. Los donantes que donan de forma privada a propósito pierden esa privacidad (privacy), y cualquiera puede seguir los fondos después de la campaña.

Una campaña totalmente privada tiene el problema opuesto: los donantes no pueden ver si se alcanzó el objetivo ni cómo se gastó el dinero.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> ¿Por qué Zcash?

Con ZEC blindado, cada donación permanece privada on-chain, y tú decides qué mostrar: un total, una barra de progreso o acceso de solo lectura para un revisor. Los donantes pueden añadir un mensaje en el [memo](/using-zcash/memos), y tú puedes agradecerles sin que nadie más vea quién donó.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Lo que necesitas

- Una [billetera](/wallets) blindada en la que puedas crear una cuenta separada
- Una página de la campaña: un sitio web, una publicación en redes sociales o un hilo en un foro
- Un objetivo, una fecha de finalización y un plan sobre cómo se usará el dinero

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guía paso a paso

### Paso 1: Define el objetivo y las reglas

Antes de lanzar la campaña, pon por escrito:
- Cuánto vas a recaudar y qué se pagará con ello
- La fecha de finalización
- Qué pasará si recaudas más o menos que el objetivo
- Quién controla los fondos y si más de una persona debe aprobar los gastos (consulta [Gestiona una tesorería comunitaria privada](/zcash-use-cases/private-community-treasury))

Publica todo esto en la página de la campaña. Los donantes confían en una campaña que dice desde el principio lo que va a hacer.

### Paso 2: Crea una cuenta separada para la campaña

Crea una cuenta nueva en tu billetera, que uses solo para esta campaña, y copia una dirección blindada de ella. Mantener la campaña separada hace que el total sea fácil de leer, y es importante más adelante si compartes claves de visualización, porque las claves de visualización muestran la actividad de toda la cuenta ([Claves de visualización](/zcash-tech/viewing-keys)).

### Paso 3: Crea un enlace de solicitud de pago y un código QR

Una [URI de solicitud de pago](/using-zcash/payment-request-uris) es un enlace de `zcash:` que completa la dirección, un monto sugerido y un memo para el donante. Usa el [generador de solicitudes de pago](/tools) de ZecHub para crear una y luego compártela como enlace y como código QR.

Un memo como «Nombre de la campaña, responder a: tu correo electrónico o usuario» ayuda a los donantes que quieren un agradecimiento o un recibo. Indica en la página que el memo es opcional.

### Paso 4: Lanza la página de la campaña

Incluye en la página:
- El objetivo, la fecha de finalización y las reglas del Paso 1
- La dirección blindada, el código QR y el enlace
- Cómo donar desde una billetera blindada y dónde conseguir una
- Cómo informarás del progreso (Paso 5)

Fija la dirección en un único lugar y diles a los donantes que solo la copien de allí.

### Paso 5: Informa del progreso sin exponer a los donantes

Elige una opción e indica en la página cuál:
- **Publica tú mismo el total**, por ejemplo una vez por semana, a partir del saldo de la cuenta de la campaña en tu billetera
- **Entrega claves de visualización a un único revisor de confianza**, como un miembro de la junta directiva o un miembro de la comunidad que los donantes conozcan, que confirme públicamente el total. Las claves de visualización entrantes muestran las donaciones recibidas; las claves de visualización completas también muestran los gastos ([Claves de visualización](/zcash-tech/viewing-keys))

No publiques claves de visualización en la página de la campaña. Cualquiera que las tenga puede ver el monto y el memo de cada donación, incluidos los datos de contacto de los donantes.

### Paso 6: Agradece a los donantes

Responde a los donantes que dejaron un contacto en el memo. Nunca publiques el nombre o el monto de un donante sin pedirle permiso primero.

### Paso 7: Cierra la campaña e informa

En la fecha de finalización:
- Anuncia que la campaña está cerrada y elimina o actualiza la dirección y el código QR
- Publica el total final y en qué se usó el dinero
- Si compartiste claves de visualización, pide al revisor que confirme el total final y los gastos

Las [divulgaciones de pago](/zcash-tech/payment-disclosures) podrían permitirte algún día demostrar un único pago sin claves de visualización, pero el estándar todavía es un borrador, así que no confíes en ellas por ahora.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errores comunes que debes evitar

- Gestionar la campaña desde la cuenta de tu billetera de uso diario
- Publicar claves de visualización, lo que expone el monto y el memo de cada donante
- Usar una dirección transparente o una dirección de depósito de un exchange porque es más fácil mostrar el total
- Dejar la dirección publicada después de que termine la campaña, de modo que siguen llegando donaciones sin un plan para ellas
- No informar nunca de cómo se gastó el dinero

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Resultado

Puedes:
- Recaudar ZEC para un objetivo claro mientras cada donación permanece privada on-chain
- Mostrar un progreso en el que los donantes pueden confiar
- Cerrar la campaña con un informe público y sin donantes expuestos

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Relacionado

- [Recibe donaciones de forma privada](/zcash-use-cases/receive-donations-privately) - donaciones continuas, sin una campaña
- [Gestiona una tesorería comunitaria privada](/zcash-use-cases/private-community-treasury) - roles y aprobaciones para fondos compartidos
- [URI de solicitud de pago](/using-zcash/payment-request-uris) - enlaces y códigos QR con el monto y el memo ya completados
- [Claves de visualización](/zcash-tech/viewing-keys) - acceso de solo lectura para un revisor
- [Dónde donar ZEC](/zcash-use-cases/where-to-donate-zec) - organizaciones sin fines de lucro que ya aceptan ZEC

<br/>

## Siguiente paso

- [Acepta donaciones privadas como organización sin fines de lucro de EE. UU.](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit)

<br/>

Si eres nuevo, empieza aquí: [¿Qué es Zcash?](/start-here/what-is-zec-and-zcash)
