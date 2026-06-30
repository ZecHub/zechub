# Demostración de MultiSig

Esta demostración requiere zcashd 

## Reunir claves públicas de las personas necesarias

* https://github.com/iancoleman/bip39
* Si usas zcashd, también puedes crear una UA y usar tu receptor transparente. Luego usa `getPubkey.sh` para extraer tu clave pública.


## Crear direcciones t3 MultiSig 2x (2 de 3)

ejecuta createMultiSig.sh para generar tu dirección multisig y redeem script. Lo que se necesita son 3 claves públicas

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1.ª t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2.ª t3 para la dirección de cambio. 

#### NOTA: en este ejemplo pubk1,pubk4 son la misma persona, pubk2,pubk5 son la misma persona y así sucesivamente ...

#### NOTA2: ¡el ORDEN de tus pubkeys importa! ¡¡Presta atención a esto!!!!


## Financiar la dirección t3

Usa cualquier wallet/faucet para financiar la dirección

## Crear transacción MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

donde,

```
        txid: un ID de transacción de la transacción que envió dinero a tu nueva t3
   voutIndex: el índice de la salida en vout que tiene el valor más grande
scriptPubKey: El script de bloqueo P2SH contiene el hash de otro script de bloqueo (Script Hash), rodeado por los opcodes HASH160 y EQUAL. Esto está en hexadecimal y se encuentra mediante el rpc getrawtransaction; busca scriptPubKey
redeemScript: El valor hexadecimal del redeemScript que se mostró al crear nuestra t3. Esto es necesario para todas las personas que quieran gastar desde la t3.
   oldAmount: Cantidad enviada a tu nueva t3 desde el txid anterior
       tAddy: La dirección a la que quieres enviar fondos
      amount: La cantidad de ZEC que se enviará a tAddy
 changeTaddy: Dirección de cambio (¡nueva t3 con un nuevo redeemScript!)

```

`./txDetails.sh txid`   => te ayudará a encontrar la información necesaria

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** esto es necesario para firmar! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Firmar TX MultiSig

Abre signMultiSigTX.sh y añade tus claves privadas en las variables pk1,pk2, ...
 

*** No recomendaría escribir estas en tu terminal. ***


Si tienes acceso a todas tus claves privadas, puedes usarlas todas de una vez para ahorrar tiempo,
pero en la mayoría de los ejemplos del mundo real, la firma la realizarán personas repartidas por todo el mundo, por lo que cada uno de los participantes requeridos tendrá que firmar,
y luego devolver la salida "hex" actualizada de raxTX que los demás usarán para firmar y completar el procedimiento de firma.

Quien cree la primera tx firmará con su clave privada y enviará el hex rawTX actualizado que debe ser firmado por los demás participantes.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Para firmar esta tx, al menos 2 de las tres claves privadas deben firmarla. Si la clave pública que proporcionaste fue exportada usando una T-address de zcashd, puedes obtener la clave privada de tu dirección T con: 


`zcash-cli dumpprivkey "t-addr"`


Para esta demostración, he usado el bip39 de iancoleman para aislar rápidamente las claves privadas necesarias.


## Transmitir TX firmada

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Fuentes

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
