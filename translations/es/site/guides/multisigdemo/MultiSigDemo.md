# Demo de MultiSig

> **Histórico. Este recorrido ya no funciona.**
>
> Cada paso a continuación depende de zcashd, que alcanzó su detención automática por Fin de Soporte el 18 de julio de 2026. Los siete scripts incluidos junto con esta página lo controlan mediante `zcash-cli`, así que ninguno de ellos puede alcanzar un nodo en ejecución hoy.
>
> Estos scripts no pueden portarse mecánicamente. Están construidos sobre las RPC de transacciones sin procesar y wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) que zcashd desaprobó antes de la detención; Zallet las reemplaza con nuevos métodos que operan sobre PCZTs en lugar de hex de transacciones sin procesar, y todavía está en beta, con muchos métodos de zcashd aún no portados.
>
> Para la custodia multipartita en Zcash hoy, consulta [FROST y Custodia por Umbral](/zcash-tech/frost-threshold-custody), que incluye una comparación directa con multisig transparente, y la demo funcional de [FROST en Ywallet](/guides/frostdemo/ywallet-frost-demo). Para mover un nodo existente fuera de zcashd, consulta la [guía de migración a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página se conserva como un registro histórico del flujo de trabajo de multisig transparente.

Esta demo requiere zcashd, que se detuvo el 18 de julio de 2026 y ya no funciona. Nada de lo que aparece a continuación puede completarse contra la cadena en vivo.

## Reunir claves públicas de las personas necesarias

* https://github.com/iancoleman/bip39
* Si usas zcashd, también puedes crear una UA y usar tu receptor transparente. Luego usa `getPubkey.sh` para extraer tu clave pública.


## Crear direcciones t3 MultiSig 2x (2 de 3)

ejecuta createMultiSig.sh para generar tu dirección multisig y redeem script. Lo que se necesita son 3 claves públicas

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1.ª t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2.ª t3 para la dirección de cambio. 

#### NOTA: en este ejemplo pubk1,pubk4 son la misma persona, pubk2,pubk5 son la misma persona y así sucesivamente ...

#### NOTA2: ¡el ORDEN de tus claves públicas importa! ¡¡¡Presta atención a esto!!!!


## Financiar la dirección t3

Usa cualquier wallet/facuet para financiar la dirección

## Crear transacción MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

donde,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => te ayudará a encontrar la información necesaria

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Firmar TX MultiSig

Abre signMultiSigTX.sh y añade tus claves privadas en las variables pk1,pk2, ...
 

*** No recomendaría escribir estas en tu terminal. ***


Si tienes acceso a todas tus claves privadas, puedes usarlas todas a la vez para ahorrar tiempo,
pero en la mayoría de los ejemplos del mundo real, la firma la harán personas repartidas por todo el mundo, por lo que cada uno de los participantes requeridos tendrá que firmar,
luego enviar de vuelta la salida "hex" actualizada de raxTX que los demás usarán para firmar y completar el procedimiento de firma.

Quien cree la primera tx, firmará con su clave privada y enviará el hex rawTX actualizado que debe ser firmado por los demás participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para firmar esta tx, al menos 2 de las tres claves privadas deben firmarla. Si la clave pública que proporcionaste fue exportada usando una T-address de zcashd, puedes obtener la clave privada de tu dirección T con: 


`zcash-cli dumpprivkey "t-addr"`

Este comando se detuvo con zcashd y hoy no devuelve nada; se registra aquí solo para mostrar cómo la demo obtenía sus claves.


Para esta demo, he usado bip39 de iancoleman para aislar rápidamente las claves privadas necesarias.


## Transmitir TX firmada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fuentes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
