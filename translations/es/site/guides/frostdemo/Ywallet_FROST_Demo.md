# Demostración de FROST en Ywallet

## Compilar los binarios de FROST

https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign

Usa el repositorio anterior y sigue las instrucciones de compilación: 

`cargo build --bin trusted-dealer`

`cargo build --bin dkg`

`cargo build --bin coordinator`

`cargo build --bin participants`

Los binarios estarán en la carpeta target.


## Crear FROST UA

`./generateFROST_UA.sh`



## Importar UFVK en Ywallet

Cuentas -> Haz clic en + y pega el ufvk del paso anterior

## Crear una transacción con Ywallet

Pega cualquier UA y envía una tx. Guarda el archivo.

## Iniciar el procedimiento de firma de FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

la primera entrada es la ubicación de la tx sin procesar del paso anterior
la segunda entrada es la ubicación y el nombre de la tx firmada que quieres transmitir
Esta es la parte en la que le indicas a FROST qué transacción quieres que todos firmen

## Iniciar Coordinator

`./runCoordinator.sh`

Esto coordina la firma de cada participante y crea una firma de grupo

## Hacer que cada Participant firme esta transacción

`./participantSign.sh key-package-1.json`


`./participantSign.sh key-package-2.json`

## Finalizar la transacción firmada

En la ventana de Coordinator, copia la firma de grupo que se muestra y pégala en la ventana de firma de FROST.
Esto completará la firma de FROST y generará 'mysingedtx'


## Transmitir tu transacción con Ywallet

Haz clic en 'More' en la parte inferior derecha de Ywallet y busca 'Broadcast'. Busca 'mysignedtx' y haz clic en ok.

Si todo funciona, obtendrás un ID de transacción :)
