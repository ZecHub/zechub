<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>


#  Visualización de la red de Zcash

La siguiente es una guía sobre cómo ejecutar el Crawler de Ziggurat 3.0 para Zcash, así como los programas asociados Crunchy y P2P-Viz en Ubuntu 22.04 para recopilar y visualizar información de la red de Zcash.  
El video enlazado a continuación sigue el mismo proceso.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Nq5cLiAHxPI"
    title="ziggurat 3.0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    
----------------
## Instalar requisitos: 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Opcional:
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(para mostrar información json en la terminal)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(para consultar el RPC del crawler)

npm (con nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(para mostrar P2P-Viz en el navegador)

----------------


----------------
Repositorio de Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Repositorio del Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Repositorio de Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Repositorio de P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Comienza aplicando las actualizaciones normales.

>  Ejecuta los siguientes comandos:
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler de la red de Zcash

El Crawler de Zcash se encuentra dentro de una carpeta llamada 'zcash', por lo que puede ser recomendable crear un nuevo directorio antes de clonar el crawler (repositorio runziggurat/zcash).


>  Desde el directorio /Home, ejecuta los siguientes comandos:
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Navega en el navegador a 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

O abre el readme en 
'/runziggurat/zcash/src/tools/crawler/README.md'

Esta página contiene información sobre el uso específico. 

----------------


```bash
$ cargo run --release --features crawler --bin crawler -- --help

OPTIONS:
    -c, --crawl-interval <CRAWL_INTERVAL>
            The main crawling loop interval in seconds [default: 5]

    -h, --help
            Print help information

    -r, --rpc-addr <RPC_ADDR>
            If present, start an RPC server at the specified address

    -s, --seed-addrs <SEED_ADDRS>...
            A list of initial standalone IP addresses and/or DNS servers to connect to

    -n, --node-listening-port <NODE_LISTENING_PORT>
            Default port used for connecting to the nodes [default: 8233]

    -V, --version
            Print version information
```

`--seed-addrs` \ `--dns-seed` es el único argumento requerido y necesita al menos una dirección especificada para poder ejecutarse.



----------------

El comando 'cargo run --release --features crawler --bin crawler -- --help' es el comando literal de ejecución e imprimirá el menú de ayuda mostrado.


>  Ejecuta el comando
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Esto compilará el programa y garantizará que todo esté funcionando correctamente.

Para ejecutar el Crawler, es necesario añadir una bandera `--seed-addrs` al comando de inicio, que contenga al menos una dirección IP válida de un nodo de Zcash. Se debe permitir que el crawler se ejecute durante un tiempo razonable para obtener un resultado preciso. Algunas direcciones IP de nodos de ejemplo se pueden encontrar en [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Para obtener información del Crawler mientras se está ejecutando, es necesario añadir la bandera `--rpc-addr` al comando de inicio. Esto no es obligatorio para ejecutar únicamente el crawler, pero de lo contrario será necesario detenerlo (`ctrl+c` o `SIGKILL`) para mostrar cualquier información.


>  Ejecuta el comando
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

El crawler comenzará a comunicarse con la red (por defecto cada 20 segundos) y a recopilar datos de la red. 
La información del Crawler se puede mostrar usando curl para consultar el nodo (esto requiere jq para mostrar esa información). 
La dirección RPC del Crawler en este ejemplo está configurada como '127.0.0.1:54321'


>  En otra terminal, ejecuta el comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Esto mostrará los datos actuales recopilados de '.protocol_version' contenidos dentro del campo '.result'. El campo '.result' es muy grande, por lo que resulta útil invocar porciones específicas del mismo. Otros tipos de datos útiles son '.num_known_nodes', '.num_good_nodes', '.user_agents', etc. Consulta la sección de métricas [Aquí](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Para ejecutar Crunchy y P2P-Viz, es necesario canalizar `.result` a un archivo `.json`. 


>  Ejecuta el comando
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Esto creará un archivo 'latest.json' en el directorio actual. Este archivo 'latest.json' se utilizará con Crunchy. 

En este punto, el Crawler puede detenerse con 'ctrl+c' si no se requieren más datos. El Crawler mostrará en la terminal un informe con información útil.


----------------

## Crunchy

Crunchy es necesario para agregar el archivo json de salida para su uso con P2P-Viz.


Para compilar Crunchy, navega a tu carpeta '/runziggurat' 

>  Para clonar el repositorio de Crunchy, ejecuta los siguientes comandos
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Copia y pega el archivo 'latest.json' en la carpeta 'crunchy/testdata/'.

>  Ejecuta los siguientes comandos 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Esto creará un archivo 'state.json' filtrado por nodos de Zcash en la carpeta 'crunchy/testdata/' para ser utilizado con P2P-Viz.

----------------

## P2P-Viz

Para compilar P2P-Viz, es necesario tener npm. 


>  Para instalar npm con nvm, ejecuta los siguientes comandos:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Cierra y reinicia la terminal.


>  Ejecuta el comando:
```bash
nvm install --lts
```

navega a tu carpeta '/runziggurat'


>  Para clonar el repositorio de P2P-Viz e iniciarlo, ejecuta los siguientes comandos
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Abre un navegador en [http://localhost:3000](http://localhost:3000). 

Selecciona 'Geolocation' y luego selecciona 'Choose state file'.

En la ventana emergente del explorador de archivos, selecciona el archivo 'state.json'. 

El mapa mundial del explorador de nodos se llenará con los datos del archivo. Consulta el readme [Aquí](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) para más detalles sobre opciones de uso y configuración.


----------------
¡CONSEJOS! 

Puedes configurar el Crawler para un rastreo temporizado simplemente con el comando 'timeout', que emitirá una orden de finalización específica después de un tiempo establecido. Ejecuta 'timeout --help' para más información.
El siguiente comando iniciará el crawler y también lo detendrá automáticamente después de 50 minutos.

>  Ejecuta el comando
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
¡CONSEJOS! 

Se puede invocar y escribir `latest.json` directamente en `/testdata` para no tener que copiarlo y pegarlo manualmente.

----------------
¡CONSEJOS! 

La información de direcciones IP puede recopilarse a partir de la salida y luego usarse para volver a sembrar el Crawler al inicio (`--seed-addrs`). ¡Esto reducirá el tiempo necesario para realizar un rastreo completo!
