# Demostración de MultiSig

> **Histórico. Esta guía ya no funciona.**
>
> Cada paso a continuación depende de zcashd, que alcanzó su detención automática por fin de soporte el 18 de julio de 2026. Los siete scripts distribuidos junto con esta página lo manejan mediante `zcash-cli`, por lo que ninguno puede alcanzar un nodo en funcionamiento hoy.
>
> Estos scripts no pueden migrarse mecánicamente. Se basan en las RPC de transacciones sin procesar y wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) que zcashd dejó obsoletas antes de la detención; Zallet las sustituye por nuevos métodos que operan sobre PCZT en lugar de hexadecimal de transacciones sin procesar, y todavía está en beta con muchos métodos de zcashd aún no migrados.
>
> Para custodia multipartita en Zcash hoy, consulta [FROST y custodia de umbral](/zcash-tech/frost-threshold-custody), que incluye una comparación directa con multisig transparente, y la funcional [demostración de FROST de Ywallet](/guides/frostdemo/ywallet-frost-demo). Para migrar un nodo existente desde zcashd, consulta la [guía de migración a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página se conserva como un registro histórico del flujo de trabajo de multisig transparente.

Esta demostración requiere zcashd, que se detuvo el 18 de julio de 2026 y ya no funciona. Nada de lo siguiente puede completarse contra la cadena activa.

## Recopila claves públicas de las personas necesarias

* https://github.com/iancoleman/bip39
* Si usas zcashd, también puedes crear una UA y usar tu receptor transparente. Después usa `getPubkey.sh` para extraer tu clave pública.


## Crea 2 direcciones t3 MultiSig (2 de 3)

ejecuta createMultiSig.sh para generar tu dirección multisig y script de canje. Se necesitan 3 claves públicas

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1.ª t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2.ª t3 para la dirección de cambio. 

#### NOTA: en este ejemplo pubk1,pubk4 son la misma persona, pubk2,pubk5 son la misma persona y así sucesivamente ...

#### NOTA2: ¡el ORDEN de tus pubkeys importa! ¡Presta atención a esto!!!!


## Financia la dirección t3

Usa cualquier wallet/faucet para financiar la dirección

## Crea una transacción MultiSig

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



## Firma la TX MultiSig

Abre signMultiSigTX.sh y añade tus claves privadas en las variables pk1,pk2, ....
 

*** No recomendaría escribir estas en tu terminal. ***


Si tienes acceso a todas tus claves privadas, puedes usarlas todas a la vez para ahorrar tiempo,
pero en la mayoría de los casos reales, la firma se realizará mediante personas de todo el mundo, por lo que cada participante requerido deberá firmar,
luego enviar de vuelta la salida hexadecimal raxTX actualizada, que los demás usarán para firmar y completar el procedimiento de firma.

Quien cree la primera tx firmará con su clave privada y enviará el hexadecimal rawTX actualizado que debe ser firmado por los demás participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para firmar esta tx, al menos 2 de las tres claves privadas deben firmarla. Si la clave pública que proporcionaste se exportó usando una dirección T de zcashd, puedes obtener la clave privada de tu dirección T con: 


`zcash-cli dumpprivkey "t-addr"`

Este comando se detuvo con zcashd y hoy no devuelve nada; se registra aquí únicamente para mostrar cómo la demostración obtuvo sus claves.


Para esta demostración, he usado bip39 de iancoleman para aislar rápidamente las claves privadas necesarias.


## Difunde la TX firmada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fuentes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
