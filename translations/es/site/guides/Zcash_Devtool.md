# El Devtool de Zcash

[¿Qué es zcash-devtool?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

El Devtool de Zcash es una plataforma para experimentar con Zcash. Está creado por desarrolladores [developers], para desarrolladores, para las pruebas y el desarrollo de nueva funcionalidad de Zcash; y no debe considerarse listo para producción. La API de línea de comandos que expone esta herramienta puede cambiará en cualquier momento y sin previo aviso. NO comprometas fondos significativos a la gestión de la billetera [wallet] integrada de zcash-devtool.

### Tutorial en vídeo del Devtool de Zcash:
Kris Nuttycombe (@nuttycom) presentó esta herramienta durante ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: la multiherramienta de desarrollo de Zcash con Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Para obtener una guía paso a paso sobre cómo comenzar a usar estas herramientas [tools], consulta [este recorrido](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Documenta un recorrido completo sobre cómo configurar y usar las herramientas del devtool de zcash. Su objetivo es servir como guía para realizar la configuración y añadir tu propia funcionalidad a la herramienta.

## Inicio rápido

Los comandos siguientes se verificaron con zcash-devtool `main` (commit `5a26ee8`, agosto de 2026). La herramienta cambia sin previo aviso, así que ejecuta `--help` en cualquier comando si algo de aquí ya no coincide.

### Instalación

No hay binarios precompilados. Instala [Rust](https://rustup.rs) y, después, compila desde el código fuente:

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Los ejemplos siguientes llaman al binario compilado, `target/release/zcash-devtool`. `cargo run --release -- ...` funciona de la misma manera.

### Crear una billetera de testnet

Comienza en testnet. Las monedas de testnet (TAZ) no tienen valor.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` es el directorio de la billetera. Va después de `wallet` y antes del subcomando.
- `-i` es un archivo de identidad de [age](https://age-encryption.org). La frase mnemónica de la billetera se cifra [encrypted] para él, y el archivo se crea si no existe. Consérvalo: `send`, `shield` y otros comandos de gasto lo necesitan para descifrar la semilla.
- `-n` es la red [network]: `test` o `main`.
- `-s` selecciona el servidor de billetera ligera. El valor predeterminado, `zecrocks`, se conecta al servidor zec.rocks para la red elegida.
- Para restaurar una billetera existente, usa `restore-mnemonic` en lugar de `init`. Solicita la frase.

`balance` enumera cada pool por separado, incluido Ironwood:

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Ejecuta `zcash-devtool wallet -w ./my-wallet list-addresses` para ver la dirección unificada de la billetera y envíale fondos de testnet desde un [faucet](https://zechub.wiki/using-zcash/faucets).

Para mainnet, pasa `-n main` a `init`. Usa solo cantidades que puedas permitirte perder.

### Enviar y blindar

Las cantidades están en zatoshis (1 ZEC = 100.000.000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` muestra la transacción [transaction] que construiría una `send`, sin enviarla. `list-tx` y `list-unspent` muestran el historial y las notas [notes] de la billetera.

Cualquier comando que se comunique con un servidor también acepta `--connection tor`, que enruta la conexión a través del cliente Tor integrado.

### Inspeccionar direcciones, claves y transacciones

`inspect` decodifica datos de Zcash sin conexión: direcciones [addresses], claves y transacciones sin procesar. Añade `--lookup` para obtener más información de la cadena [chain], como una transacción mediante su ID.

```
$ zcash-devtool inspect utest1h55y5z...
Zcash address
 - Network: testnet
 - Kind: Unified Address
 - Receivers:
   - Orchard (...)
   - Sapling (...)
   - Transparent P2PKH (...)
```

Las notas Ironwood se envían al mismo receptor Orchard en una dirección unificada, por lo que las direcciones no cambiaron con NU6.3.

### Construir transacciones por pasos con PCZTs

Una PCZT (transacción de Zcash creada parcialmente) divide la construcción de una transacción en pasos separados: crear, demostrar, firmar y enviar. Cada paso puede ejecutarse en una máquina distinta, por ejemplo con un firmante de hardware como Keystone. Cada comando `pczt` lee la PCZT desde un archivo o stdin y la escribe en un archivo (`--output`) o stdout, por lo que los pasos pueden encadenarse:

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` enumera los otros pasos, incluidos `inspect`, `redact`, `combine`, `extract` y `shield`.

### Mover fondos de Orchard a Ironwood

Desde NU6.3, los fondos de Orchard solo pueden moverse a las propias direcciones de la billetera. Los comandos `migration` los trasladan a Ironwood:

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` previsualiza las divisiones de notas y el calendario de transferencia, y no modifica nada.
- `commit` construye y prefirma las primeras transacciones de preparación. Añade `--external` para dejarlas sin firmar para un firmante externo como Keystone.
- `status` muestra el progreso de la migración y el siguiente paso.
- `advance` demuestra la siguiente transacción cuyo ancla está lista.

Los comandos de migración aún están en desarrollo. `advance` se detiene en la primera transacción que está lista para transmitirse, porque la transmisión aún no está implementada en la herramienta. Para el uso cotidiano, mueve fondos con una billetera que admita Ironwood. Consulta [Pools blindados](https://zechub.wiki/using-zcash/shielded-pools).


**Advertencias de seguridad:**
¡¡¡NO USES ESTO EN PRODUCCIÓN!!!
La aplicación no se ha escrito teniendo en cuenta la seguridad. Sin embargo, cuenta con mecanismos como el cifrado de las frases semilla mnemónicas que deberían hacerla viable para experimentos a pequeña escala, bajo tu propio riesgo.

### Avanzado (tutorial de librustzcash)


[ver el vídeo aquí](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
