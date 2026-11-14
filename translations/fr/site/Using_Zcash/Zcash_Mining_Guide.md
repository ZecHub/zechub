<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Mining_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide de minage Zcash : rejoindre un pool de minage avec votre propre matériel

> Dirigez votre GPU ou votre ASIC vers un pool, partagez le travail avec d'autres mineurs et recevez des paiements réguliers en ZEC au lieu d'attendre des années un bloc trouvé en solo.

## En bref

* Zcash utilise la preuve de travail Equihash. Les ASIC dominent le réseau, les GPU servent donc surtout aux amateurs et aux tests.
* Avec une petite installation, le minage en solo ne trouve que rarement un bloc. Un pool regroupe le hashrate et vous verse une part de chaque bloc qu'il trouve.
* Il vous faut trois choses : une adresse de portefeuille Zcash pour les paiements, du matériel de minage et un logiciel de minage (ou le tableau de bord intégré de l'ASIC).
* Les pools se distinguent par leurs frais (environ 0-2 %), leur méthode de paiement (PPLNS, PPS+), leur paiement minimum et l'emplacement de leurs serveurs.
* Vérifiez d'abord la rentabilité : le prix de l'électricité, le coût du matériel et le cours du ZEC déterminent si le minage rapporte quoi que ce soit.
* Voie avancée : faites tourner votre propre nœud Zebra et minez via son RPC `getblocktemplate`.

## Explication essentielle

Le minage est le processus qui crée les nouveaux blocs Zcash. Les mineurs s'affrontent pour résoudre un problème Equihash ; la première solution valide ajoute le bloc suivant et remporte la récompense de bloc. Plus vous apportez de hashrate, plus vous gagnez souvent, mais face au réseau actuel, une seule installation domestique ne gagnerait presque jamais seule.

Un pool de minage résout ce problème. Le pool confie à chaque mineur de plus petites portions de travail appelées parts. Chaque part acceptée prouve que vous avez fourni du hashrate. Lorsqu'un membre du pool trouve un bloc, la récompense est répartie selon les parts, et vous êtes payé automatiquement dès que votre solde dépasse le minimum du pool.

L'installation comporte cinq éléments, détaillés étape par étape ci-dessous :

1. Une adresse de portefeuille pour recevoir les paiements.
2. Du matériel : des GPU dans un PC, ou un ASIC Equihash.
3. Un compte sur le pool (ou simplement votre adresse, pour les pools sans inscription).
4. Un logiciel de minage dirigé vers le serveur stratum du pool, avec `YOUR_ADDRESS.WORKER_NAME` comme nom d'utilisateur.
5. La surveillance : parts acceptées, hashrate, température et solde non payé.

## Introduction

Zcash (ZEC) est une cryptomonnaie axée sur la confidentialité qui utilise l'algorithme de preuve de travail Equihash pour le minage. Miner du Zcash consiste à utiliser de la puissance de calcul pour résoudre des problèmes mathématiques complexes, valider les transactions et sécuriser le réseau en échange de récompenses en ZEC. En raison de la difficulté élevée du réseau, le minage en solo est déconseillé à la plupart des utilisateurs. Rejoindre un pool de minage est la meilleure façon d'obtenir des récompenses régulières en combinant votre puissance de hachage avec celle d'autres mineurs.

Ce guide porte sur le minage de Zcash avec votre propre matériel (p. ex. un PC domestique équipé de GPU ou des ASIC d'entrée de gamme). Notez que si les GPU peuvent encore miner du Zcash, les ASIC sont bien plus efficaces et rentables en 2026 en raison de la difficulté du réseau. Vérifiez toujours la rentabilité actuelle avec des outils comme WhatToMine.com, car des facteurs tels que le coût de l'électricité, le prix du matériel et la valeur du ZEC influent sur la viabilité. Le minage n'est pas forcément rentable pour tout le monde ; renseignez-vous sur la réglementation locale et les tarifs de l'énergie (visez moins de 0,08 $/kWh).


## Prérequis

### Matériel
- **Minage GPU (installation personnelle recommandée pour les débutants) :**
  - GPU NVIDIA ou AMD avec au moins 4 Go de VRAM (p. ex. NVIDIA GTX 1070, RTX 3060 ; AMD RX 580 ou mieux).
  - Une carte mère compatible, une alimentation suffisante (au moins 750 W pour plusieurs GPU) et un bon refroidissement pour éviter la surchauffe.
  - Les installations multi-GPU sont courantes pour obtenir un meilleur hashrate (p. ex. 6 GPU peuvent atteindre 1-2 kSol/s).
- **Minage ASIC (plus efficace mais plus coûteux) :**
  - ASIC compatibles Equihash comme le Bitmain Antminer Z15 (420 kSol/s) ou l'Innosilicon A9 (50 kSol/s).
  - Ils sont plus bruyants, chauffent davantage et consomment plus d'énergie (p. ex. 1500 W et plus) ; ils conviennent à des espaces dédiés. Achetez-les auprès de sources fiables comme Bitmain.com ou de revendeurs (Blockware Mining).
- **Général :** une connexion internet stable et un ordinateur pour la configuration et la surveillance. Les ASIC dominent le réseau (~13 GSol/s de hashrate total en 2026), ce qui rend le minage GPU moins compétitif, mais toujours possible pour les amateurs.

### Logiciels
- **Système d'exploitation :** Windows 10/11, Linux (Ubuntu recommandé pour sa stabilité).
- **Logiciel de minage :**
  - Pour les GPU : lolMiner (compatible AMD/NVIDIA), GMiner ou miniZ (orienté NVIDIA). Téléchargez-les depuis les dépôts GitHub officiels (p. ex. github.com/Lolliedieb/lolMiner-releases).
  - Pour les ASIC : utilisez le micrologiciel et le tableau de bord intégrés du fabricant (p. ex. l'interface web de Bitmain).
- **Portefeuille :** un portefeuille Zcash pour recevoir les paiements. Recommandés :
  - Protégés (privés) : ZODL Wallet, Zingo (mobile/ordinateur), Zkool (mobile/ordinateur).
  - Transparents (plus simples mais moins confidentiels) : Edge Wallet.
  - Téléchargez-les depuis [portefeuilles](https://zechub.wiki/wallets). Générez une adresse protégée (commençant par « zs ») pour la confidentialité si le pool la prend en charge.

### Autres
- Électricité : calculez les coûts. Les GPU consomment 150-300 W par carte ; les ASIC plus de 1000 W.
- Antivirus : désactivez-le pendant la configuration, car il peut signaler les logiciels de minage comme des menaces.

## Guide étape par étape pour rejoindre un pool de minage

### Étape 1 : configurez votre portefeuille Zcash
1. Téléchargez et installez un portefeuille depuis le site officiel de Zcash [portefeuilles](https://zechub.wiki/wallets).
2. Créez un nouveau portefeuille et sauvegardez votre phrase de récupération en lieu sûr.
3. Générez une adresse de réception (de préférence protégée, pour la confidentialité). Notez-la, p. ex. `zs1exampleaddress...`.
4. Une adresse transparente (commençant par « t ») est plus simple à utiliser, mais offre moins de confidentialité.

### Étape 2 : préparez votre matériel
- Pour les GPU :
  1. Installez les GPU dans votre PC et mettez à jour les pilotes (NVIDIA : GeForce Experience ; AMD : Radeon Software).
  2. Overclockez si vous avez de l'expérience (utilisez MSI Afterburner pour la stabilité ; visez +100-200 sur la fréquence du cœur et -500 sur la mémoire pour l'efficacité).
- Pour les ASIC :
  1. Branchez l'ASIC à l'alimentation et au réseau Ethernet.
  2. Trouvez son adresse IP à l'aide d'un outil comme Advanced IP Scanner ou de l'application du fabricant.
  3. Accédez au tableau de bord web (p. ex. saisissez l'IP dans le navigateur ; identifiants par défaut : root/root pour Bitmain).

**Avertissement :** assurez une ventilation adéquate ; le minage produit de la chaleur. Commencez petit pour tester.

### Étape 3 : choisissez et rejoignez un pool de minage
Les pools de minage répartissent le travail et partagent les récompenses en fonction du hashrate que vous apportez. Choisissez selon les frais (0-2 %), le paiement minimum (0,01-0,1 ZEC), l'emplacement (faible latence) et la fiabilité.

**Pools recommandés (selon le hashrate, les frais et les avis) :**
- **2Miners (zec.2miners.com)** : 1 % de frais, paiement PPLNS, compatible GPU/ASIC/NiceHash. Hashrate élevé (~1,17 GSol/s), serveurs fiables.
- **F2Pool (zec.f2pool.com)** : 2 % de frais, paiement PPS+, prise en charge de plusieurs cryptomonnaies. Grand pool (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)** : 2 % de frais (PPS+), tableau de bord convivial, serveurs dans le monde entier.
- **AntPool (zec.antpool.com)** : 1 % de frais, proposé par Bitmain, adapté aux ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)** : pool de minage Zcash professionnel de Foundry Digital. Utilise des paiements PPLNS, propose un suivi transparent des récompenses et une assistance de niveau entreprise. Convient surtout aux mineurs ASIC institutionnels et à grande échelle ; nécessite une vérification du compte.
- **Sovright (mining.sovright.com)** : un pool Zcash basé sur Stratum V2, qui fonctionne actuellement sur un testnet public. Il n'y a pas encore de paiements réels en ZEC ; considérez-le donc comme un moyen de tester votre installation plutôt que comme une source de revenus. Consultez la section dédiée ci-dessous pour plus de détails.
- Autres : Kryptex Pool, Luxor (consultez poolwatch.io/coin/zcash pour des statistiques en temps réel).

1. Rendez-vous sur le site du pool et créez un compte (par e-mail, ou sans inscription pour certains comme 2Miners).
2. Ajoutez votre adresse de portefeuille Zcash dans les paramètres pour les paiements.
3. Notez le serveur stratum du pool (p. ex. zec.2miners.com:1010) et le port.

### Étape 4 : installez et configurez le logiciel de minage
- Pour les GPU (exemple : lolMiner sous Windows/Linux) :
  1. Téléchargez lolMiner depuis GitHub (dernière version, p. ex. 1.88).
  2. Extrayez-le dans un dossier.
  3. Créez un fichier batch (start.bat) avec la configuration :
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Remplacez `YOUR_WALLET_ADDRESS` par votre adresse ZEC.
     - `WORKER_NAME` : un nom pour votre installation (p. ex. Rig1).
     - Pour les serveurs européens : eu.zec.2miners.com:1010.
  4. Exécutez le fichier batch. Il se connectera au pool et commencera à miner.
- Pour les ASIC (exemple : Bitmain Antminer) :
  1. Connectez-vous au tableau de bord web.
  2. Allez dans Miner Configuration.
  3. Ajoutez les informations du pool :
     - URL : stratum+tcp://zec.2miners.com:1010
     - Nom d'utilisateur : YOUR_WALLET_ADDRESS.WORKER_NAME
     - Mot de passe : x (ou vide).
  4. Enregistrez et redémarrez le mineur.
- Pour d'autres logiciels (p. ex. GMiner) :
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test :** laissez tourner 10-15 minutes ; vérifiez dans la console les parts acceptées et le hashrate.

### Étape 5 : lancez le minage et surveillez
1. Lancez le mineur : il se connectera au pool et commencera à soumettre des parts.
2. Surveillez via :
   - Le tableau de bord du pool : saisissez votre adresse de portefeuille pour voir le hashrate, le solde non payé et les statistiques.
   - La console du logiciel : surveillez les erreurs et la température (à maintenir sous 80 °C).
   - Les outils : utilisez HiveOS ou SimpleMining OS pour gérer vos installations à distance.
3. Paiements : la plupart des pools paient automatiquement lorsque vous atteignez le minimum (p. ex. 0,05 ZEC). Consultez les règles du pool.

   
![Configuration de surveillance du minage Zcash](/content-images/zcashMining-5ca0019c17.webp)


### Surveiller Foundry Zcash Pool

Pour les utilisateurs de Foundry Zcash Pool :

- Surveillez les performances de vos mineurs via le tableau de bord du pool Foundry.
- Vérifiez :
  - Les workers actifs
  - Le hashrate déclaré
  - Les parts acceptées
  - Les récompenses estimées
  - L'état des paiements

Comme Foundry utilise un modèle de récompense PPLNS, les récompenses de minage dépendent des parts apportées sur la fenêtre de récompense du pool, et pas seulement du hashrate instantané.

Pratiques de surveillance recommandées :
- Comparez le hashrate du tableau de bord de l'ASIC avec le hashrate déclaré par Foundry.
- Examinez les parts rejetées, les parts périmées ou l'instabilité de la connexion.
- Maintenez une connexion réseau stable, car les interruptions réduisent les parts soumises et les récompenses potentielles.


## Sovright : pool sur testnet et réseau de relais

Sovright (sovright.com) exploite un pool de minage Stratum V2 et un réseau de relais de blocs distinct. Ils remplissent des fonctions différentes et sont donc présentés séparément ci-dessous.

### Pool de minage (mining.sovright.com)

Le pool de Sovright fonctionne sur un testnet Zcash public (NU6, Stratum V2), et non sur le mainnet. Le testnet ne verse pas de vrais ZEC. Utilisez-le pour tester la configuration de votre mineur, pas pour gagner de l'argent.

- Aucun compte n'est nécessaire pour commencer. Dirigez un mineur Equihash CPU ou ASIC vers le pool et vos parts apparaissent sur un tableau de bord en direct.
- Sovright publie également un proxy Stratum V2 open source pour les mineurs qui souhaitent choisir leurs propres modèles de bloc au lieu de simplement accepter les tâches du pool :

  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Dirigez votre mineur vers le proxy plutôt que directement vers le pool :
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  en utilisant un nom de worker comme `yourname.rig1`.
- La page de transparence de Sovright affiche une politique « tout inclure » pour les transactions protégées, contrairement à certains pools qui les filtrent. Chaque bloc reçoit une attestation signée, afin que la politique puisse être vérifiée de manière indépendante.
- Créez un compte sur mining.sovright.com (connexion via Google ou par e-mail) pour suivre vos propres workers au lieu des données d'exemple du tableau de bord.

### Réseau de relais (relay.sovright.com)

Sovright exploite par ailleurs un réseau public de relais de blocs sur le mainnet Zcash. Lorsqu'un pool trouve un bloc, la vitesse à laquelle ce bloc atteint le reste du réseau détermine la fréquence à laquelle il devient orphelin, c'est-à-dire qu'il perd la course à la propagation et que la récompense correspondante est perdue. Le relais transmet les blocs entre quatre régions grâce au relais de blocs compacts avec correction d'erreurs directe.

Le tableau de bord public montre l'effet en direct : les régions connectées au relais voient les nouveaux blocs en bien moins de la moitié du temps nécessaire à la simple diffusion de pair à pair, et le tableau de bord suit en direct le taux de blocs orphelins du réseau.

Il s'agit d'une infrastructure destinée aux opérateurs de pools, pas aux mineurs individuels. Le dépôt open source `mining-infra` de Sovright documente une passerelle de relais `submitblock` permettant de diffuser les blocs trouvés dans le maillage plus rapidement que le P2P natif. Pour vous connecter, contactez directement Sovright (support@sovright.com) afin d'obtenir les adresses des pairs du relais et une clé d'authentification.


## Miner avec votre propre nœud Zebra

Tout ce qui précède dirige votre mineur vers le pool de quelqu'un d'autre. L'autre voie consiste à faire tourner vous-même un nœud et à laisser votre logiciel de minage lui demander du travail. Depuis l'arrêt de zcashd le 18 juillet 2026, cela signifie [Zebra](/zcash-tech/zebra-full-node), le nœud dont traite cette section.

Le rôle de Zebra est restreint et précis : il construit des modèles de bloc et accepte les blocs résolus via son interface RPC. Le hachage est effectué par le logiciel de minage, et le partage des récompenses entre plusieurs mineurs relève du logiciel de pool. La probabilité qu'un minage en solo trouve un jour un bloc dépend de votre part du hashrate du réseau, que cette section ne cherche pas à estimer. C'est pourquoi l'introduction de cette page déconseille le minage en solo à la plupart des utilisateurs.

Les étapes suivent deux pages du Book de Zebra, [Mining Zcash with Zebra](https://zebra.zfnd.org/user/mining.html) et [Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html), telles qu'elles se présentaient le 8 octobre 2026. Les noms de clés et les valeurs par défaut changent d'une version à l'autre ; vérifiez donc le Book avant de vous y fier.

### Définir l'adresse qui reçoit la récompense

Créez un fichier de configuration avec les paramètres par défaut, puis modifiez-le :

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Une adresse de mineur est obligatoire ([Book : adresse du mineur](https://zebra.zfnd.org/user/mining.html#miner-address)) :

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra accepte une adresse transparente P2PKH ou P2SH, une adresse Sapling ou une Unified Address. Pour une Unified Address comportant plusieurs destinataires, le Book indique que Zebra paie un seul destinataire, « en privilégiant Orchard, puis Sapling, puis transparent ».

Deux clés facultatives se placent dans la même section `[mining]` :

| Clé | Rôle | Limite |
|---|---|---|
| `extra_coinbase_data` | Ajoute une étiquette publique, comme le nom d'un pool, à l'entrée coinbase de chaque bloc que vous minez, après le marqueur propre à Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 octets. Au-delà, « Zebra refuse de démarrer » |
| `miner_memo` | Joint un mémo protégé à la sortie de la récompense. Contrairement à `extra_coinbase_data`, il n'est pas public : seule une personne disposant d'une clé pour lecture seule de l'adresse de réception peut le lire ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 octets. Ne fonctionne que si la récompense va à un destinataire protégé. Avec une adresse transparente, il « n'a silencieusement aucun effet » |

### Ouvrir le port RPC

Le logiciel de minage communique avec Zebra via JSON-RPC, qui reste désactivé tant que vous ne lui donnez pas d'adresse d'écoute ([Book : section RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)) :

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 est le port RPC standard sur le Mainnet. `127.0.0.1` limite l'accès au port à la même machine.

Depuis Zebra 2.0.0, un cookie protège le port RPC, une méthode semblable à celle qu'utilisait zcashd. Zebra écrit le cookie au démarrage du point de terminaison RPC et le supprime à l'arrêt. Par défaut, le fichier se trouve dans le répertoire de cache de Zebra, par exemple `/home/user/.cache/zebra/.cookie` sous Linux, et contient une seule ligne :

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` déplace le fichier. `rpc.enable_cookie_auth = false` désactive la vérification, et avec elle la seule authentification dont dispose le port RPC : tout ce qui peut atteindre le port peut alors l'appeler.

### Démarrer Zebra et le laisser se synchroniser

```bash
zebrad
```

Zebra lit la configuration à l'emplacement par défaut. Passez `-c /path/to/zebrad.toml` pour utiliser un autre fichier. Attendez la fin de la synchronisation. Le journal affiche `sync_percent=100.000%` lorsqu'elle est terminée ([Book : exécuter zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Full Node](/zcash-tech/zebra-full-node) traite du matériel et de l'espace disque.

### Vérifier avec getblocktemplate

`getblocktemplate` est l'appel que fait le logiciel de minage pour obtenir du travail ; c'est donc aussi le test le plus rapide ([Book : tester l'installation](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Remplacez `__cookie__:PASSWORD` par le contenu de votre fichier cookie :

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Une installation fonctionnelle renvoie un objet `result` contenant les champs dont un mineur a besoin, parmi lesquels `previousblockhash`, `coinbasetxn`, `target` et `height`. Si vous avez défini `extra_coinbase_data`, le Book explique comment retrouver votre étiquette dans `coinbasetxn.data`.

### Diriger votre logiciel de minage vers le nœud

Indiquez à votre logiciel de minage ou de pool le point de terminaison RPC, `127.0.0.1:8232`, ainsi que le nom d'utilisateur et le mot de passe du cookie. Le Book indique que Zebra « prend en charge les méthodes RPC nécessaires pour faire fonctionner la plupart des logiciels de pool de minage » ([Book : faire fonctionner un pool de minage](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Deux remarques du Book avant de choisir un logiciel :

- **s-nomp sert uniquement aux tests.** Le Book qualifie sa configuration s-nomp d'« expérimentale » et indique que s-nomp « n'est pas compatible avec NU5, de sorte que certaines fonctions de minage sont désactivées ». Son [guide Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) ajoute que s-nomp « n'a pas été officiellement mis à jour pour NU5 ni pour les mises à niveau du réseau ultérieures » et oriente les mineurs en production vers des logiciels de pool qui prennent en charge les mises à niveau actuelles.
- **Zebra fournit une pile prête à l'emploi.** Le dépôt Zebra contient une configuration Docker Compose dans [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) qui démarre Zebra avec un pool de minage et, si vous le demandez, un mineur CPU. Le pool qu'elle contient est s-nomp et il démarre sur le Testnet sauf si vous le modifiez ; considérez-la donc comme un moyen de comprendre les différents éléments.

### La voie Docker

Le chemin le plus court proposé par le Book est l'image Docker de `zfnd/zebra`, avec l'adresse et le port RPC passés en variables d'environnement ([Book : Mining with Zebra in Docker](https://zebra.zfnd.org/user/mining-docker.html)). La commande ci-dessous reprend celle du Book avec une seule modification : elle publie le port RPC uniquement sur l'adresse de bouclage de l'hôte, afin que les autres machines ne puissent pas l'atteindre.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Cette commande démarre un nœud sur le Mainnet, publie le port P2P (8233) sur l'hôte Docker et rend le port RPC (8232) accessible uniquement depuis l'hôte lui-même. Affichez le cookie avec :

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Conservez `0.0.0.0` dans `ZEBRA_RPC__LISTEN_ADDR`.** C'est l'adresse sur laquelle Zebra écoute à l'intérieur du conteneur. Docker redirige un port publié vers l'interface réseau propre au conteneur ; un Zebra écoutant sur `127.0.0.1` à l'intérieur du conteneur ne recevrait donc pas la connexion, même depuis l'hôte. C'est le `127.0.0.1:` placé devant `-p` qui maintient le port hors du réseau.
- **La commande du Book** publie le port RPC avec `-p 8232:8232`, ce qui l'ouvre sur toutes les interfaces réseau de l'hôte.
- **Pour vous exercer sur le Testnet**, ajoutez `-e ZEBRA_NETWORK__NETWORK="Testnet"`, définissez `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publiez `-p 18233:18233` et `-p 127.0.0.1:18232:18232`, et indiquez une adresse Testnet. Une adresse Mainnet empêche Zebra de démarrer sur le Testnet, et inversement.

Le paiement des mineurs et la gestion du portefeuille sortent du cadre de cette section. Pour le volet portefeuille, consultez [Zallet](/zcash-tech/zallet).

## Conseils et bonnes pratiques
- **Rentabilité :** utilisez des calculateurs comme whattomine.com/coins/166-zec-equihash. Exemple : une RTX 3060 (~300 Sol/s) rapporte ~0,001 ZEC/jour à 50 $/ZEC, moins ~0,50 $ d'électricité.
- **Confidentialité :** utilisez des pools protégés s'ils sont disponibles ; évitez de réutiliser vos adresses.
- **Sécurité :** utilisez des mots de passe robustes ; activez l'authentification à deux facteurs sur les pools et les portefeuilles. Ne partagez jamais vos clés privées.
- **Dépannage :** si aucune part n'est acceptée, vérifiez le pare-feu, l'antivirus ou une configuration erronée. Rejoignez des forums comme forum.zcashcommunity.com ou r/zec sur Reddit.
- **Alternatives :** si le minage n'est pas rentable, envisagez le minage dans le cloud ou le staking d'autres cryptomonnaies.
- **Note environnementale :** le minage consomme de l'énergie ; utilisez des sources renouvelables si possible.
- **Mises à jour :** Zcash peut évoluer (p. ex. un éventuel passage à la preuve d'enjeu) ; consultez z.cash pour les actualités.
