# Mantener registros con ZEC blindado [shielded]

## TL;DR

- Los fondos blindados son privados, pero aún puedes mantener registros financieros completos y ordenados
- Los memos actúan como partidas en tu libro mayor, como un número de factura o el motivo de un pago
- Una clave de visualización [viewing key] te permite a ti, o a alguien que elijas como un contador, revisar tu historial sin hacerlo público
- Puedes sumar los ingresos y gastos de cualquier período, que es lo que necesitas para informes o impuestos
- Nada de esto debilita tu privacidad [privacy], porque tú decides quién ve qué

<br/>

## ¿Para quién es esto?

- Trabajadores autónomos y pequeñas empresas que reciben pagos en ZEC
- Cualquier persona que necesite llevar la contabilidad mientras mantiene su privacidad
- Personas que preparan registros para un contador o para impuestos

<br/>

## El desafío

La privacidad y el mantenimiento de registros pueden parecer opuestos. Si tus transacciones [transactions] están blindadas, las cantidades y direcciones están ocultas al público, así que ¿cómo mantienes una contabilidad adecuada o muestras tus ingresos a un contador?

Con Zcash esto es una falsa disyuntiva. Las transacciones blindadas ocultan tu actividad de todos de forma predeterminada, pero Zcash también te ofrece herramientas [tools] para divulgar tus propios registros a las personas que los necesitan, según tus condiciones. Mantienes tu privacidad ante el mundo y eres transparente con tu contador al mismo tiempo.

<br/>

## Los memos son tu libro mayor

Cada transacción blindada (z a z) puede incluir un [memo](/using-zcash/memos) cifrado [encrypted]. Para el mantenimiento de registros, el memo es donde escribes el motivo del pago: un número de factura, el nombre de un cliente, un código de proyecto o una nota breve como «Alquiler de marzo».

Como el memo viaja con la transacción y solo puede ser leído por las partes involucradas, se convierte en una partida privada de tus libros. Cuando tú o tu cliente incluís un memo claro en cada pago, tu historial de transacciones se transforma en un libro mayor utilizable en lugar de una lista de cantidades sin contexto.

Un hábito sencillo: acuerda con los clientes incluir siempre el número de factura en el memo. Más adelante, relacionar los pagos con las facturas se vuelve sencillo.

<br/>

## Revisar tu propio historial

Para llevar la contabilidad, necesitas ver tu propia actividad. Tu billetera [wallet] contiene las claves que descifran tus transacciones blindadas, por lo que puede mostrarte la imagen completa: fechas, cantidades, cuáles fueron recibidas, cuáles fueron enviadas y los memos adjuntos.

Esta es la parte que el público no puede ver, pero tú sí, porque los datos son tuyos. Revisar tu historial regularmente, en lugar de hacerlo al final del año, mantiene tus registros precisos y facilita detectar errores.

<br/>

## Compartir registros con un contador

Cuando necesitas que otra persona vea tu actividad blindada, como un contador o auditor, no tienes que entregar tus claves de gasto [spending key] ni hacer público nada. Compartes una [clave de visualización](/zcash-tech/viewing-keys).

Una clave de visualización completa es de solo lectura. Permite a quien la posee ver las transacciones entrantes y salientes de una dirección, incluidas las cantidades y los memos, pero nunca le permite mover tus fondos. Eso la convierte en lo seguro para entregar a un contador. Obtiene exactamente la visibilidad que necesita, tu dinero sigue bajo tu control y el resto del mundo sigue sin ver nada.

Esto se llama divulgación selectiva [selective disclosure], y es una de las razones prácticas por las que Zcash blindado funciona a favor de una contabilidad honesta en lugar de en su contra.

<br/>

## Sumar un período

Para la mayoría de los informes, necesitas totales de un período: cuánto recibiste este trimestre, cuánto enviaste, tu posición neta. Como puedes revisar tu propio historial completo, puedes sumarlos para cualquier período que elijas: un mes, un trimestre o un año.

Mantener los memos coherentes lo facilita, porque puedes agrupar los pagos según su motivo, no solo por fecha y cantidad.

<br/>

## Una nota sobre impuestos

Las normas fiscales difieren según el país y cambian con el tiempo, por lo que esta es información general y no asesoramiento fiscal. En muchos lugares, recibir o disponer de criptomonedas puede tener consecuencias fiscales, y es posible que debas mantener registros de lo que recibiste, cuándo lo recibiste y su valor en ese momento.

La buena noticia es que Zcash blindado no te impide cumplir estas obligaciones. Puedes mantener registros privados completos, sumarlos para el período que exija tu autoridad fiscal y divulgarlos a un contador o autoridad fiscal mediante una clave de visualización, sin hacer pública tu actividad. Si no estás seguro de cuáles son tus obligaciones, habla con un profesional cualificado en tu país.

<br/>

## Errores comunes que debes evitar

- Omitir los memos, lo que te deja con cantidades y sin contexto al final del año
- Reutilizar una dirección para todo, lo que dificulta separar clientes o propósitos
- Esperar hasta la temporada de impuestos para revisar un año de historial en vez de mantener los registros sobre la marcha
- Compartir una clave de gasto cuando una clave de visualización de solo lectura es todo lo que necesita un contador

<br/>

## Páginas relacionadas

- [Memos](/using-zcash/memos) - cómo funcionan los memos cifrados
- [Claves de visualización](/zcash-tech/viewing-keys) - cómo exportar y compartir acceso de solo lectura
- [Configuración de privacidad para trabajadores autónomos](/zcash-use-cases/freelance-privacy-setup) - recibir ingresos de forma privada, el paso previo a mantener registros
