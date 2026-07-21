<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_the_Zcash_Network.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>


#  Visualiser le réseau Zcash

Ce qui suit est un guide expliquant comment exécuter le Crawler Ziggurat 3.0 pour Zcash ainsi que les programmes associés Crunchy et P2P-Viz sur Ubuntu 22.04 afin de collecter et de visualiser les informations du réseau Zcash.  
La vidéo liée ci-dessous suit le même processus.

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
## Installer les prérequis : 

Rust -> [https://rustup.rs/](https://rustup.rs/)

## Facultatif :
jq -> [https://jqlang.github.io/jq/download/](https://jqlang.github.io/jq/download/)
(pour afficher les informations json dans le terminal)

curl -> [https://everything.curl.dev/get/linux](https://everything.curl.dev/get/linux)
(pour interroger le RPC du crawler)

npm (avec nvm) -> [https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
(pour afficher P2P-Viz dans le navigateur)

----------------


----------------
Dépôt Ziggurat 3.0 | [https://github.com/runziggurat](https://github.com/runziggurat)

Dépôt du Crawler | [https://github.com/runziggurat/zcash.git](https://github.com/runziggurat/zcash.git)

Dépôt de Crunchy | [https://github.com/runziggurat/crunchy.git](https://github.com/runziggurat/crunchy.git)

Dépôt de P2P-Viz | [https://github.com/runziggurat/p2p-viz.git](https://github.com/runziggurat/p2p-viz.git)

----------------

Commencez par appliquer les mises à jour habituelles.

>  Exécutez les commandes suivantes :
```bash
sudo apt update
sudo apt upgrade
```

----------------

## Crawler du réseau Zcash

Le Crawler Zcash se trouve dans un dossier nommé 'zcash' ; il peut donc être judicieux de créer un nouveau répertoire avant de cloner le crawler (dépôt runziggurat/zcash).


>  Depuis le répertoire /Home, exécutez les commandes suivantes :
```bash
mkdir runziggurat
cd runziggurat
git clone https://github.com/runziggurat/zcash.git
cd zcash
```

Naviguez dans le navigateur vers 
[https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md](https://github.com/runziggurat/zcash/blob/main/src/tools/crawler/README.md)

Ou ouvrez le readme à l’emplacement 
'/runziggurat/zcash/src/tools/crawler/README.md'

Cette page contient des informations sur l’utilisation spécifique. 

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

`--seed-addrs` \ `--dns-seed` est le seul argument requis et nécessite au moins une adresse spécifiée pour fonctionner.



----------------

La commande 'cargo run --release --features crawler --bin crawler -- --help' est la commande d’exécution littérale et affichera le menu d’aide montré.


>  Exécutez la commande
```bash
cargo run --release --features crawler --bin crawler -- --help
```


Cela compilera le programme et garantira que tout fonctionne correctement.

Pour exécuter le Crawler, il est nécessaire d’ajouter un indicateur '--seed-addrs' à la commande de démarrage, contenant au moins une adresse IP de nœud Zcash valide. Le crawler doit être autorisé à s’exécuter pendant un laps de temps raisonnable afin d’obtenir un résultat précis. Quelques exemples d’adresses IP de nœuds peuvent être trouvés sur [https://zcashblockexplorer.com/nodes](https://zcashblockexplorer.com/nodes).

Pour obtenir des informations depuis le Crawler pendant son exécution, il est nécessaire d’ajouter l’indicateur '--rpc-addr' à la commande de démarrage. Cela n’est pas requis pour simplement exécuter le crawler lui-même, mais sinon il faudra arrêter le crawler (ctrl+c ou SIGKILL) pour afficher la moindre information.


>  Exécutez la commande
```bash
cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

Le crawler commencera à communiquer avec le réseau (par défaut toutes les 20 secondes) et à collecter les données du réseau. 
Les informations du Crawler peuvent être affichées en utilisant curl pour interroger le nœud (cela nécessite jq pour afficher ces informations). 
L’adresse RPC du Crawler dans cet exemple est définie sur '127.0.0.1:54321'


>  Dans un autre terminal, exécutez la commande
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ | jq .result.protocol_versions
```

Cela affichera les données actuelles '.protocol_version' collectées, contenues dans le champ '.result'. Le champ '.result' est très volumineux, il est donc utile d’en appeler des parties spécifiques à la place. D’autres types de données utiles sont '.num_known_nodes', '.num_good_nodes', '.user_agents', etc. Voir la section métriques [Ici](https://github.com/runziggurat/zcash/tree/main/src/tools/crawler#metrics)

----------------


----------------
Pour exécuter Crunchy et P2P-Viz, il est nécessaire de rediriger le '.result' vers un fichier .json. 


>  Exécutez la commande
```bash
curl --data-binary '{"jsonrpc": "2.0", "id":0, "method": "getmetrics", "params": [] }' -H 'content-type: application/json' http://127.0.0.1:54321/ > latest.json
```

Cela créera un fichier 'latest.json' dans le répertoire courant. Ce fichier 'latest.json' sera utilisé avec Crunchy. 

À ce stade, le Crawler peut être arrêté avec 'ctrl+c' si aucune donnée supplémentaire n’est requise. Le Crawler affichera dans le terminal un rapport contenant des informations utiles.


----------------

## Crunchy

Crunchy est nécessaire pour agréger le fichier json de sortie en vue de son utilisation avec P2P-Viz.


Pour compiler Crunchy, naviguez vers votre dossier '/runziggurat' 

>  Pour cloner le dépôt Crunchy, exécutez les commandes suivantes
```bash
git clone https://github.com/runziggurat/crunchy.git
cd crunchy
```
Copiez et collez le fichier 'latest.json' dans le dossier 'crunchy/testdata/'.

>  Exécutez les commandes suivantes 
```bash
cargo run --release -- -i testdata/latest.json -o testdata/state.json -g testdata/geoip-cache.json -f Zcash
```

Cela créera un fichier 'state.json' filtré sur les nœuds Zcash dans le dossier 'crunchy/testdata/' pour être utilisé avec P2P-Viz.

----------------

## P2P-Viz

Pour compiler P2P-Viz, il est nécessaire d’avoir npm. 


>  Pour installer npm avec nvm, exécutez les commandes suivantes :
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Fermez et redémarrez le terminal.


>  Exécutez la commande :
```bash
nvm install --lts
```

naviguez vers votre dossier '/runziggurat'


>  Pour cloner le dépôt P2P-Viz et le démarrer, exécutez les commandes suivantes
```bash
git clone https://github.com/runziggurat/p2p-viz.git
cd p2p-viz
npm i
npm run build
npm run start http
```

----------------

Ouvrez un navigateur à l’adresse [http://localhost:3000](http://localhost:3000). 

Sélectionnez 'Geolocation', puis sélectionnez 'Choose state file'.

Dans la fenêtre de l’explorateur de fichiers, sélectionnez le fichier 'state.json'. 

La carte du monde de l’explorateur de nœuds se remplira avec les données du fichier. Consultez le readme [Ici](https://github.com/runziggurat/p2p-viz#build-and-run-the-app) pour plus de détails sur les options d’utilisation et les paramètres.


----------------
CONSEILS ! 

Vous pouvez configurer le Crawler pour une exploration temporisée simplement avec la commande 'timeout', qui enverra une commande d’arrêt spécifique après une durée définie. Exécutez 'timeout --help' pour plus d’informations.
La commande suivante démarrera le crawler et l’arrêtera aussi automatiquement après 50 min.

>  Exécutez la commande
```bash
timeout --signal=2 50m cargo run --release --features crawler --bin crawler -- --seed-addrs 157.245.172.190:8233 194.135.81.61:8233 35.233.224.178:8233 --rpc-addr 127.0.0.1:54321
```

----------------
CONSEILS ! 

Le 'latest.json' peut être appelé et écrit dans le '/testdata' afin que vous n’ayez pas à le copier-coller manuellement.

----------------
CONSEILS ! 

Les informations d’adresse IP peuvent être récupérées à partir de la sortie puis utilisées pour réensemencer le Crawler au démarrage (`--seed-addrs`). Cela réduira le temps nécessaire pour effectuer une exploration complète !
