# Ywallet FROST demostración

> **Ywallet ya no recibe mantenimiento.** Su desarrollador ha confirmado que no se actualizará para Ironwood (NU6.3), por lo que ya no puede seguir la red y los pasos siguientes no pueden completarse en la red principal. Esta página se conserva como referencia. Zkool, del mismo desarrollador, es el sucesor mantenido y admite multisig de FROST.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/3IZgxDqQNbw"
    title="FROST + Ywallet Demostración de transacción"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Compilar binarios de FROST

[GitHub enlace](https://github.com/ZcashFoundation/frost-zcash-demo)

Usa el repositorio anterior y sigue las instrucciones de compilación: 

```bash
cargo build --bin trusted-dealer
cargo build --bin dkg
cargo build --bin coordinator
cargo build --bin participant
```

Los binarios estarán en la carpeta de destino.

## Crear UA de FROST

`./generateFROST_UA.sh`



## Importar UFVK en Ywallet

Cuentas -> Haz clic en + y pega el ufvk del paso anterior

## Crear una transacción con Ywallet

Pega cualquier UA y envía una transacción. Guarda el archivo.

## Iniciar el procedimiento de firma de FROST

`./signFROST_tx.sh rawtxs/mytx signedtxs/mysignedtx`

La primera entrada es la ubicación de la transacción sin procesar del paso anterior
La segunda entrada es la ubicación y el nombre de la transacción firmada que deseas transmitir
Esta es la parte en la que indicas a FROST qué transacción quieres que todos firmen

## Iniciar coordinador

`./runCoordinator.sh`

Esto coordina la firma de cada participante y crea una firma de grupo

## Hacer que cada participante firme esta transacción

```bash
./participantSign.sh key-package-1.json
./participantSign.sh key-package-2.json
```

## Finalizar transacción firmada

En la ventana del coordinador, copia la firma de grupo que se muestra y pégala en la ventana de firma de FROST.
Esto completará la firma de FROST y generará «mysingedtx»


## Transmitir tu transacción con Ywallet

Haz clic en «More» en la parte inferior derecha de Ywallet y busca «Broadcast». Busca «mysignedtx» y haz clic en Aceptar.

Si todo funciona, obtendrás un ID de transacción :)
