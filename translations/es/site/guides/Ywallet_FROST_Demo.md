# Demostración de FROST con Ywallet

> **Ywallet ya no recibe mantenimiento.** Su desarrollador ha confirmado que no se actualizará para Ironwood (NU6.3), por lo que ya no puede seguir la cadena y los pasos a continuación no pueden completarse en mainnet. Esta página se conserva como referencia. Zkool, del mismo desarrollador, es el sucesor mantenido y admite multisig FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="Demostración de transacción FROST + Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compilar los binarios de FROST

[Enlace de Github](https://github.com/ZcashFoundation/frost-zcash-demo/tree/update-zcash-sign)

Usa el repositorio anterior y sigue las instrucciones para compilar: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participants
```

Los binarios estarán en la carpeta target.

## Crear UA de FROST

`./generateFROST_UA.sh`



## Importar UFVK en Ywallet

Cuentas -> Haz clic en + y pega el ufvk del paso anterior

## Crear una transacción con Ywallet

Pega cualquier UA y envía una tx. Guarda el archivo.

## Iniciar el procedimiento de firma FROST 

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

La primera entrada es la ubicación de la tx sin procesar del paso anterior  
La segunda entrada es la ubicación y el nombre de la tx firmada que quieres transmitir  
Esta es la parte en la que le indicas a FROST qué transacción quieres que todos firmen

## Iniciar el coordinador

`./runCoordinator.sh`

Esto coordina la firma de cada participante y crea una firma de grupo

## Hacer que cada participante firme esta transacción

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizar la transacción firmada

En la ventana del coordinador, copia la firma de grupo que aparece como salida y pégala en la ventana de firma FROST.  
Esto completará la firma FROST y generará 'mysingedtx'


## Transmitir tu transacción con Ywallet

Haz clic en 'Más' en la esquina inferior derecha de Ywallet y busca 'Transmitir'. Busca 'mysignedtx' y haz clic en aceptar.

Si todo funciona, obtendrás un ID de transacción :)
