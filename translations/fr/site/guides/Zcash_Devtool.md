# L'outil de développement Zcash

[Qu'est-ce que le zcash-devtool ?](https://github.com/zcash/zcash-devtool?tab=readme-ov-file) 

L'outil de développement Zcash est une plateforme pour expérimenter avec Zcash. Il est conçu par des développeurs, pour des développeurs, afin de tester et de développer de nouvelles fonctionnalités Zcash ; il ne doit pas être considéré comme prêt pour la production. L'API en ligne de commande exposée par cet outil peut changer, et changera, à tout moment et sans préavis. NE confiez PAS de fonds importants à la gestion du portefeuille intégré de zcash-devtool.

### Tutoriel vidéo de l'outil de développement Zcash :
Kris Nuttycombe (@nuttycom) a présenté cet outil lors de la ZconVI.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/5gvQF5oFT8E"
    title="zcash-devtool: the Zcash development multitool with Kris Nuttycombe - ZconVI"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---

Pour un guide pas à pas expliquant comment commencer à utiliser ces outils, consultez [ce tutoriel](https://github.com/zcash/zcash-devtool/blob/main/doc/walkthrough.md). Il décrit en détail comment installer et utiliser les outils de développement zcash. Il est destiné à servir de guide pour vous installer et ajouter vos propres fonctionnalités à l'outil.

## Démarrage rapide

Les commandes ci-dessous ont été vérifiées avec zcash-devtool `main` (commit `5a26ee8`, août 2026). L'outil change sans préavis : exécutez donc `--help` sur n'importe quelle commande si quelque chose ici ne correspond plus.

### Installation

Il n'existe pas de binaires précompilés. Installez [Rust](https://rustup.rs), puis compilez à partir des sources :

```bash
git clone https://github.com/zcash/zcash-devtool.git
cd zcash-devtool
cargo run --release -- --help
```

Les exemples ci-dessous appellent le binaire compilé, `target/release/zcash-devtool`. `cargo run --release -- ...` fonctionne de la même manière.

### Créer un portefeuille testnet

Commencez sur le testnet. Les pièces du testnet (TAZ) n'ont aucune valeur.

```bash
zcash-devtool wallet -w ./my-wallet init --name demo -i ./my-wallet-identity.txt -n test
zcash-devtool wallet -w ./my-wallet sync
zcash-devtool wallet -w ./my-wallet balance
```

- `-w` est le répertoire du portefeuille. Il se place après `wallet` et avant la sous-commande.
- `-i` est un fichier d'identité [age](https://age-encryption.org). La phrase mnémonique du portefeuille est chiffrée pour ce fichier, qui est créé s'il n'existe pas. Conservez-le : `send`, `shield` et les autres commandes de dépense en ont besoin pour déchiffrer la graine.
- `-n` est le réseau : `test` ou `main`.
- `-s` choisit le serveur de portefeuille léger. La valeur par défaut, `zecrocks`, se connecte au serveur zec.rocks du réseau choisi.
- Pour restaurer un portefeuille existant, utilisez `restore-mnemonic` à la place de `init`. La phrase vous sera demandée.

`balance` affiche chaque pool séparément, y compris Ironwood :

```
    Balance:   0.00000000 TAZ
     Sapling Spendable:   0.00000000 TAZ
     Orchard Spendable:   0.00000000 TAZ
    Ironwood Spendable:   0.00000000 TAZ
  Unshielded Spendable:   0.00000000 TAZ
```

Exécutez `zcash-devtool wallet -w ./my-wallet list-addresses` pour afficher l'adresse unifiée du portefeuille, et envoyez-y des fonds testnet depuis un [faucet](https://zechub.wiki/using-zcash/faucets).

Pour le mainnet, passez `-n main` à `init`. N'utilisez que des montants que vous pouvez vous permettre de perdre.

### Envoyer et protéger

Les montants sont exprimés en zatoshis (1 ZEC = 100 000 000 zatoshis).

```bash
zcash-devtool wallet -w ./my-wallet send -i ./my-wallet-identity.txt \
  --address <recipient address> --value 100000 --memo "hello"
zcash-devtool wallet -w ./my-wallet shield -i ./my-wallet-identity.txt
```

`propose` affiche la transaction qu'un `send` construirait, sans l'envoyer. `list-tx` et `list-unspent` affichent l'historique et les notes du portefeuille.

Toute commande qui communique avec un serveur accepte également `--connection tor`, qui fait passer la connexion par le client Tor intégré.

### Inspecter les adresses, les clés et les transactions

`inspect` décode des données Zcash hors ligne : adresses, clés et transactions brutes. Ajoutez `--lookup` pour récupérer davantage d'informations depuis la chaîne, comme une transaction à partir de son identifiant.

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

Les notes Ironwood sont envoyées au même récepteur Orchard d'une adresse unifiée, de sorte que les adresses n'ont pas changé avec NU6.3.

### Construire des transactions par étapes avec les PCZT

Une PCZT (transaction Zcash partiellement créée) divise la construction d'une transaction en étapes distinctes : création, preuve, signature et envoi. Chaque étape peut s'exécuter sur une machine différente, par exemple avec un signataire matériel tel que Keystone. Chaque commande `pczt` lit la PCZT depuis un fichier ou l'entrée standard et l'écrit dans un fichier (`--output`) ou sur la sortie standard, ce qui permet d'enchaîner les étapes avec des pipes :

```bash
zcash-devtool pczt -w ./my-wallet create --address <recipient address> --value 100000 \
  | zcash-devtool pczt -w ./my-wallet prove -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet sign -i ./my-wallet-identity.txt \
  | zcash-devtool pczt -w ./my-wallet send
```

`zcash-devtool pczt --help` liste les autres étapes, dont `inspect`, `redact`, `combine`, `extract` et `shield`.

### Déplacer des fonds de Orchard vers Ironwood

Depuis NU6.3, les fonds Orchard ne peuvent être déplacés que vers les propres adresses du portefeuille. Les commandes `migration` les déplacent vers Ironwood :

```bash
zcash-devtool migration -w ./my-wallet plan
zcash-devtool migration -w ./my-wallet commit -i ./my-wallet-identity.txt
zcash-devtool migration -w ./my-wallet status
zcash-devtool migration -w ./my-wallet advance
```

- `plan` donne un aperçu des divisions de notes et du calendrier des transferts, sans rien modifier.
- `commit` construit et pré-signe les premières transactions de préparation. Ajoutez `--external` pour les laisser non signées à l'intention d'un signataire externe tel que Keystone.
- `status` affiche la progression de la migration et l'étape suivante.
- `advance` génère la preuve de la prochaine transaction dont l'ancre est prête.

Les commandes de migration sont encore en cours de développement. `advance` s'arrête à la première transaction prête à être diffusée, car la diffusion n'est pas encore implémentée dans l'outil. Pour un usage quotidien, déplacez vos fonds avec un portefeuille qui prend en charge Ironwood. Consultez [Pools protégés](https://zechub.wiki/using-zcash/shielded-pools).


**Avertissements de sécurité :**
N'UTILISEZ PAS CECI EN PRODUCTION !!!
L'application n'a pas été écrite en tenant compte de la sécurité. Elle offre toutefois certaines fonctionnalités, comme le chiffrement des phrases de récupération mnémoniques, qui devraient la rendre utilisable pour des expérimentations à petite échelle, à vos propres risques.

### Avancé (tutoriel librustzcash )


[regardez la vidéo ici](https://free2z.cash/uploadz/public/ZcashTutorial/librustzcash-a-rust-crates.mp4)
