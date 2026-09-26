# Demostración de MultiSig

> **Histórico. Este tutorial ya no funciona.**
>
> Todos los pasos a continuación dependen de zcashd, que alcanzó su detención automática de fin de soporte el 18 de julio de 2026. Los siete scripts incluidos junto a esta página lo controlan mediante `zcash-cli`, por lo que ninguno puede conectarse hoy a un nodo en funcionamiento.
>
> Estos scripts no pueden migrarse mecánicamente. Se basan en las RPC de transacciones sin procesar y wallet (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`) que zcashd dejó obsoletas antes de la detención; Zallet las reemplaza con nuevos métodos que operan en PCZTs en lugar de hexadecimales de transacciones sin procesar, y aún está en beta, con muchos métodos de zcashd todavía sin migrar.
>
> Para custodia multipartita en Zcash hoy, consulta [FROST y custodia por umbral](/zcash-tech/frost-threshold-custody), que incluye una comparación directa con multifirma transparente, y la [demostración de FROST de Ywallet](/guides/ywallet-frost-demo). Para migrar un nodo existente desde zcashd, consulta la [guía de migración a Zebra y Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Esta página se conserva como un registro histórico del flujo de trabajo de multifirma transparente.

Esta demostración requiere zcashd, que se detuvo el 18 de julio de 2026 y ya no funciona. Nada de lo que sigue puede completarse en la cadena activa.

## Recopila las claves públicas de las personas necesarias

* https://github.com/iancoleman/bip39
* Si utilizas zcashd, también puedes crear una UA y usar tu receptor transparente. Luego usa `getPubkey.sh` para extraer tu clave pública.


## Crea direcciones t3 de multifirma 2x (2 de 3)

ejecuta createMultiSig.sh para generar tu dirección de multifirma y script de canje. Se necesitan 3 claves públicas

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1.ª t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2.ª t3 para la dirección de cambio. 

#### NOTA: en este ejemplo pubk1,pubk4 pertenecen a la misma persona, pubk2,pubk5 pertenecen a la misma persona y así sucesivamente ...

#### NOTA2: ¡el ORDEN de tus claves públicas importa! ¡Presta atención a esto!!!!


## Financia la dirección t3

Usa cualquier wallet/faucet para financiar la dirección

## Crea una transacción de MultiSig

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



## Firma la transacción MultiSig

Abre signMultiSigTX.sh y agrega tus claves privadas en las variables pk1,pk2, ... .
 

*** No recomendaría escribir estas en tu terminal. ***


Si tienes acceso a todas tus claves privadas, puedes usarlas todas a la vez para ahorrar tiempo,
pero en la mayoría de los ejemplos del mundo real, la firma se realizará a través de personas de todo el mundo, por lo que cada participante requerido deberá firmar,
y luego devolver el resultado hexadecimal actualizado de raxTX que los demás usarán para firmar y completar el proceso de firma.

Quien cree la primera transacción firmará con su clave privada y enviará el hexadecimal rawTX actualizado que deben firmar los demás participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para firmar esta transacción, al menos 2 de las tres claves privadas deben firmarla. Si la clave pública que proporcionaste se exportó utilizando una dirección T de zcashd, puedes obtener la clave privada de tu dirección T con: 


`zcash-cli dumpprivkey "t-addr"`

Este comando se detuvo con zcashd y hoy no devuelve nada; se registra aquí únicamente para mostrar cómo la demostración obtenía sus claves.


Para esta demostración, he usado bip39 de iancoleman para aislar rápidamente las claves privadas necesarias.


## Difunde la transacción firmada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fuentes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
