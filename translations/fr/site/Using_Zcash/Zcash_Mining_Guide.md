# Zcash Guide de minage : rejoindre un pool de minage avec du matériel personnel

## Introduction

Zcash (ZEC) est une cryptomonnaie axée sur la confidentialité qui utilise l’algorithme de preuve de travail Equihash pour le minage. Le minage de Zcash consiste à utiliser de la puissance de calcul pour résoudre des problèmes mathématiques complexes, valider des transactions et sécuriser le réseau en échange de récompenses en ZEC. En raison de la difficulté élevée du réseau, le minage en solo n’est pas recommandé pour la plupart des utilisateurs. Rejoindre un pool de minage est la meilleure façon d’obtenir des récompenses régulières en combinant votre puissance de hachage avec celle des autres.

Ce guide porte sur le minage de Zcash avec du matériel personnel (par exemple, un PC domestique doté de GPU ou des ASIC d’entrée de gamme). Notez que si les GPU peuvent encore miner Zcash, les ASIC sont bien plus efficaces et rentables en 2026 en raison de la difficulté du réseau. Vérifiez toujours la rentabilité actuelle à l’aide d’outils tels que WhatToMine.com, car des facteurs comme les coûts d’électricité, les prix du matériel et la valeur de ZEC affectent la viabilité. Le minage peut ne pas être rentable pour tout le monde ; renseignez-vous sur les réglementations locales et les tarifs énergétiques (visez < 0,08 $/kWh).


## Prérequis

### Matériel
- **Minage par GPU (configuration personnelle recommandée pour les débutants) :**
  - GPU NVIDIA ou AMD avec au moins 4 Go de VRAM (par exemple, NVIDIA GTX 1070, RTX 3060 ; AMD RX 580 ou supérieur).
  - Une carte mère compatible, une alimentation suffisante (au moins 750 W pour plusieurs GPU) et un bon refroidissement pour éviter la surchauffe.
  - Les rigs multi-GPU sont courants pour de meilleurs taux de hachage (par exemple, 6 GPU peuvent atteindre 1 à 2 kSol/s).
- **Minage par ASIC (plus efficace mais plus coûteux) :**
  - Des ASIC compatibles avec Equihash tels que Bitmain Antminer Z15 (420 kSol/s) ou Innosilicon A9 (50 kSol/s).
  - Ils sont plus bruyants, plus chauds et consomment davantage d’électricité (par exemple, 1500 W+) ; ils conviennent à des espaces dédiés. Achetez auprès de sources réputées comme Bitmain.com ou de revendeurs (Blockware Mining).
- **Général :** Internet stable, un ordinateur pour la configuration et la surveillance. Les ASIC dominent le réseau (~13 GSol/s de taux de hachage total en 2026), ce qui rend le minage par GPU moins compétitif mais toujours possible pour les amateurs.

### Logiciels
- **Système d’exploitation :** Windows 10/11, Linux (Ubuntu recommandé pour sa stabilité).
- **Logiciel de minage :**
  - Pour les GPU : lolMiner (prend en charge AMD/NVIDIA), GMiner ou miniZ (axé sur NVIDIA). Téléchargez depuis les dépôts officiels GitHub (par exemple, github.com/Lolliedieb/lolMiner-releases).
  - Pour les ASIC : utilisez le firmware/tableau de bord intégré du fabricant (par exemple, l’interface web de Bitmain).
- **Wallet :** Un wallet Zcash pour recevoir les paiements. Recommandés :
  - Shielded (privé) : ZODL Wallet, Zingo (mobile/desktop), Zkool (mobile/desktop).
  - Transparent (plus simple mais moins privé) : Edge Wallet, Zecwallet Lite.
  - Téléchargez depuis [wallets](https://zechub.wiki/wallets). Générez une adresse shielded (commence par « zs ») pour préserver votre confidentialité si le pool la prend en charge.

### Autres
- Électricité : calculez les coûts. Les GPU utilisent 150 à 300 W par carte ; les ASIC 1000 W+.
- Antivirus : désactivez-le durant la configuration, car il peut signaler les mineurs comme des menaces.

## Guide étape par étape pour rejoindre un pool de minage

### Étape 1 : configurer votre wallet Zcash
1. Téléchargez et installez un wallet depuis le site officiel de Zcash [wallets](https://zechub.wiki/wallets).
2. Créez un nouveau wallet et sauvegardez votre phrase de récupération en lieu sûr.
3. Générez une adresse de réception (de préférence shielded pour la confidentialité). Notez-la, par exemple `zs1exampleaddress...`.
4. Si vous utilisez une adresse transparente (commence par « t »), c’est plus simple mais offre moins de confidentialité.

### Étape 2 : préparer votre matériel
- Pour les GPU :
  1. Installez les GPU dans votre PC et mettez à jour les pilotes (NVIDIA : GeForce Experience ; AMD : Radeon Software).
  2. Overclockez si vous êtes expérimenté (utilisez MSI Afterburner pour la stabilité ; visez +100 à 200 d’horloge du cœur, -500 de mémoire pour l’efficacité).
- Pour les ASIC :
  1. Connectez l’ASIC à l’alimentation et à Ethernet.
  2. Trouvez son adresse IP à l’aide d’un outil tel qu’Advanced IP Scanner ou l’application du fabricant.
  3. Accédez au tableau de bord web (par exemple, saisissez l’IP dans le navigateur, identifiants par défaut : root/root pour Bitmain).

**Avertissement :** Assurez une ventilation adéquate ; le minage génère de la chaleur. Commencez petit pour tester.

### Étape 3 : choisir et rejoindre un pool de minage
Les pools de minage distribuent le travail et partagent les récompenses en fonction du taux de hachage que vous apportez. Sélectionnez-en un selon les frais (0 à 2 %), le minimum de paiement (0,01 à 0,1 ZEC), l’emplacement (faible ping) et la fiabilité.

**Pools recommandés (selon le taux de hachage, les frais et les avis) :**
- **2Miners (zec.2miners.com)** : 1 % de frais, paiement PPLNS, prend en charge GPU/ASIC/NiceHash. Taux de hachage élevé (~1,17 GSol/s), serveurs fiables.
- **F2Pool (zec.f2pool.com)** : 2 % de frais, paiement PPS+, prise en charge de plusieurs cryptomonnaies. Grand pool (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)** : 2 % de frais (PPS+), tableau de bord convivial, serveurs mondiaux.
- **AntPool (zec.antpool.com)** : 1 % de frais, de Bitmain, bien adapté aux ASIC (~494 MSol/s).
- **Foundry Zcash Pool (foundrydigital.com/foundry-zcash-pool/)** : Pool de minage professionnel Zcash de Foundry Digital. Utilise les paiements PPLNS, offre un suivi transparent des récompenses et une assistance de niveau entreprise. Convient le mieux aux mineurs ASIC institutionnels et à grande échelle ; nécessite une vérification de compte.
- **Sovright (mining.sovright.com)** : Un pool Zcash construit sur Stratum V2, actuellement exécuté en tant que testnet public. Aucun paiement ZEC réel n’est encore effectué ; considérez-le donc comme un moyen de tester votre configuration plutôt que comme une source de revenus. Consultez la section dédiée ci-dessous pour plus de détails.
- Autres : Kryptex Pool, Luxor (consultez poolwatch.io/coin/zcash pour des statistiques en temps réel).

1. Visitez le site web du pool et créez un compte (e-mail ou sans inscription pour certains, comme 2Miners).
2. Ajoutez votre adresse de wallet Zcash dans les paramètres de paiement.
3. Notez le serveur stratum du pool (par exemple, zec.2miners.com:1010) et son port.

### Étape 4 : installer et configurer le logiciel de minage
- Pour les GPU (exemple : lolMiner sur Windows/Linux) :
  1. Téléchargez lolMiner depuis GitHub (dernière version, par exemple 1.88).
  2. Extrayez-le dans un dossier.
  3. Créez un fichier batch (start.bat) avec la configuration :
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Remplacez `YOUR_WALLET_ADDRESS` par votre adresse ZEC.
     - `WORKER_NAME` : un nom pour votre rig (par exemple, Rig1).
     - Pour les serveurs européens : eu.zec.2miners.com:1010.
  4. Exécutez le fichier batch. Il se connectera au pool et commencera le minage.
- Pour les ASIC (exemple : Bitmain Antminer) :
  1. Connectez-vous au tableau de bord web.
  2. Accédez à Miner Configuration.
  3. Ajoutez les détails du pool :
     - URL : stratum+tcp://zec.2miners.com:1010
     - Nom d’utilisateur : YOUR_WALLET_ADDRESS.WORKER_NAME
     - Mot de passe : x (ou vide).
  4. Enregistrez et redémarrez le mineur.
- Pour d’autres logiciels (par exemple, GMiner) :
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test :** Exécutez pendant 10 à 15 minutes ; vérifiez dans la console les parts acceptées et le taux de hachage.

### Étape 5 : commencer le minage et surveiller
1. Lancez le mineur : il se connectera au pool et commencera à soumettre des parts.
2. Surveillez via :
   - Tableau de bord du pool : saisissez votre adresse de wallet pour voir le taux de hachage, le solde impayé et les statistiques.
   - Console du logiciel : surveillez les erreurs, la température (maintenez-la < 80 degrés C).
   - Outils : utilisez HiveOS ou SimpleMining OS pour la gestion à distance des rigs.
3. Paiements : la plupart des pools paient automatiquement lorsque vous atteignez le minimum (par exemple, 0,05 ZEC). Consultez les règles du pool.

   
![Zcash Mining Monitoring Setup](/content-images/zcashMining-5ca0019c17.webp)


## Sovright : pool de testnet et réseau de relais

Sovright (sovright.com) gère un pool de minage Stratum V2 et un réseau de relais de blocs distinct. Ils remplissent des rôles différents ; ils sont donc traités séparément ci-dessous.

### Pool de minage (mining.sovright.com)

Le pool de Sovright fonctionne sur un testnet public Zcash (NU6, Stratum V2), et non sur le mainnet. Le testnet ne verse pas de véritables ZEC. Utilisez-le pour tester la configuration de votre mineur, et non pour gagner de l’argent.

- Aucun compte n’est requis pour démarrer. Dirigez un mineur Equihash CPU ou ASIC vers le pool et vos parts apparaîtront sur un tableau de bord en direct.
- Sovright publie également un proxy Stratum V2 open source pour les mineurs souhaitant choisir leurs propres modèles de blocs au lieu de simplement accepter les tâches du pool :

### Surveillance de Foundry Zcash Pool

Pour les utilisateurs de Foundry Zcash Pool :

- Surveillez les performances des mineurs via le tableau de bord du pool Foundry.
- Vérifiez :
  - Les workers actifs
  - Le taux de hachage rapporté
  - Les parts acceptées
  - Les récompenses estimées
  - L’état des paiements

Comme Foundry utilise un modèle de récompense PPLNS, les récompenses de minage dépendent des parts apportées sur la fenêtre de récompense du pool, plutôt que du seul taux de hachage instantané.

Pratiques de surveillance recommandées :
- Comparez le taux de hachage du tableau de bord ASIC avec celui rapporté par Foundry.
- Examinez les parts rejetées, les parts périmées ou l’instabilité de connexion.
- Maintenez une connexion réseau stable, car les interruptions réduisent les parts soumises et les récompenses potentielles.
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
  en utilisant un nom de worker tel que `yourname.rig1`.
- La page de transparence de Sovright indique une politique « include all » pour les transactions shielded, contrairement à certains pools qui les filtrent. Chaque bloc reçoit une attestation signée afin que cette politique puisse être vérifiée indépendamment.
- Créez un compte sur mining.sovright.com (connexion Google ou e-mail) pour suivre vos propres workers plutôt que les données d’exemple du tableau de bord.

### Réseau de relais (relay.sovright.com)

Sovright gère séparément un réseau public de relais de blocs sur le mainnet Zcash. Lorsqu’un pool trouve un bloc, la vitesse à laquelle ce bloc atteint le reste du réseau détermine la fréquence à laquelle il devient orphelin, c’est-à-dire qu’il perd la course de propagation et que sa récompense est perdue. Le relais transfère les blocs à travers quatre régions à l’aide d’un relais de blocs compact avec correction d’erreurs directe.

Le tableau de bord public montre l’effet en direct : les régions connectées au relais reçoivent de nouveaux blocs en bien moins de la moitié du temps nécessaire au gossip pair à pair classique, et le tableau de bord suit le taux d’orphelins en direct du réseau.

Il s’agit d’une infrastructure pour les opérateurs de pools, et non pour les mineurs individuels. Le dépôt open source `mining-infra` de Sovright documente une passerelle de relais `submitblock` permettant de diffuser les blocs trouvés dans le maillage plus rapidement que le P2P natif. Pour vous connecter, contactez directement Sovright (support@sovright.com) afin d’obtenir les adresses des pairs de relais et une clé d’authentification.


## Miner contre votre propre nœud Zebra

Tout ce qui précède dirige votre mineur vers le pool de quelqu’un d’autre. L’autre approche consiste à exécuter vous-même un nœud et à demander à votre logiciel de minage de lui demander du travail. Puisque zcashd s’est arrêté le 18 juillet 2026, cela signifie [Zebra](/zcash-tech/zebra-full-node), le nœud couvert par cette section.

Le rôle de Zebra est limité et précis : il construit des modèles de blocs et accepte les blocs résolus via son interface RPC. Le hachage est effectué par le logiciel de minage, et le partage des récompenses entre plusieurs mineurs relève du logiciel de pool. La possibilité de trouver un bloc en minant seul dépend de votre part du taux de hachage du réseau, que cette section ne tente pas d’estimer. C’est pourquoi l’introduction de cette page ne recommande pas le minage en solo à la plupart des utilisateurs.

Les étapes suivent deux pages du Book Zebra, [Minage Zcash avec Zebra](https://zebra.zfnd.org/user/mining.html) et [Minage avec Zebra dans Docker](https://zebra.zfnd.org/user/mining-docker.html), telles qu’elles se présentaient le 8 octobre 2026. Les noms des clés et les valeurs par défaut changent entre les versions ; consultez donc le Book avant de vous y fier.

### Définir l’adresse qui reçoit la récompense

Créez un fichier de configuration avec les paramètres par défaut, puis modifiez-le :

```bash
mkdir -p ~/.config
zebrad generate -o ~/.config/zebrad.toml
```

Une adresse de mineur est requise ([Book : adresse du mineur](https://zebra.zfnd.org/user/mining.html#miner-address)) :

```toml
[mining]
miner_address = "YOUR_ADDRESS"
```

Zebra accepte une adresse P2PKH ou P2SH transparente, une adresse Sapling ou une Unified Address. Pour une Unified Address comportant plus d’un récepteur, le Book indique que Zebra paie un seul récepteur, « en préférant Orchard, puis Sapling, puis transparent ».

Deux clés facultatives figurent dans la même section `[mining]` :

| Clé | Fonction | Limite |
|---|---|---|
| `extra_coinbase_data` | Ajoute une étiquette publique, telle qu’un nom de pool, à l’entrée coinbase de chaque bloc que vous minez, après le propre marqueur de Zebra ([Book](https://zebra.zfnd.org/user/mining.html#extra-coinbase-data)) | 86 octets. Au-delà, « Zebra refuse de démarrer » |
| `miner_memo` | Joint un mémo shielded à la sortie de récompense. Contrairement à `extra_coinbase_data`, il n’est pas public : seule une personne possédant une viewing key pour l’adresse de réception peut le lire ([Book](https://zebra.zfnd.org/user/mining.html#miner-memo)) | 512 octets. Cela fonctionne uniquement lorsque la récompense est envoyée à un récepteur shielded. Avec une adresse transparente, cela « n’a silencieusement aucun effet » |

### Ouvrir le port RPC

Le logiciel de minage communique avec Zebra via JSON-RPC, qui reste désactivé tant que vous ne lui donnez pas une adresse sur laquelle écouter ([Book : section RPC](https://zebra.zfnd.org/user/mining.html#rpc-section)) :

```toml
[rpc]
listen_addr = "127.0.0.1:8232"
```

8232 est le port RPC standard sur Mainnet. `127.0.0.1` garde le port accessible uniquement depuis la même machine.

Depuis Zebra 2.0.0, un cookie protège le port RPC, selon une méthode similaire à celle utilisée par zcashd. Zebra écrit le cookie lorsque le point de terminaison RPC démarre et le supprime à l’arrêt. Par défaut, le fichier se trouve dans le répertoire de cache de Zebra, par exemple `/home/user/.cache/zebra/.cookie` sur Linux, et contient une ligne :

```text
__cookie__:PASSWORD
```

`rpc.cookie_dir` déplace le fichier. `rpc.enable_cookie_auth = false` désactive la vérification et, avec elle, la seule authentification du port RPC : tout ce qui peut atteindre le port peut alors l’appeler.

### Démarrer Zebra et le laisser se synchroniser

```bash
zebrad
```

Zebra lit la configuration depuis l’emplacement par défaut. Passez `-c /path/to/zebrad.toml` pour utiliser un autre fichier. Attendez la fin de la synchronisation. Le journal affiche `sync_percent=100.000%` lorsqu’elle est terminée ([Book : exécuter zebra](https://zebra.zfnd.org/user/mining.html#running-zebra)). [Zebra Nœud complet](/zcash-tech/zebra-full-node) couvre le matériel et l’espace disque.

### Vérifier avec getblocktemplate

`getblocktemplate` est l’appel effectué par le logiciel de minage pour obtenir du travail ; c’est donc aussi le test le plus rapide ([Book : tester la configuration](https://zebra.zfnd.org/user/mining.html#testing-the-setup)). Remplacez `__cookie__:PASSWORD` par le contenu de votre fichier cookie :

```bash
curl --silent --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'Content-type: application/json' http://__cookie__:PASSWORD@127.0.0.1:8232/ | jq
```

Une configuration fonctionnelle renvoie un objet `result` contenant les champs nécessaires à un mineur, notamment `previousblockhash`, `coinbasetxn`, `target` et `height`. Si vous avez défini `extra_coinbase_data`, le Book explique comment trouver votre étiquette dans `coinbasetxn.data`.

### Diriger votre logiciel de minage vers celui-ci

Fournissez à votre logiciel de minage ou de pool le point de terminaison RPC, `127.0.0.1:8232`, ainsi que le nom d’utilisateur et le mot de passe du cookie. Le Book indique que Zebra « prend en charge les méthodes RPC nécessaires pour exécuter la plupart des logiciels de pool de minage » ([Book : exécuter un pool de minage](https://zebra.zfnd.org/user/mining.html#run-a-mining-pool)).

Deux remarques du Book avant de choisir un logiciel :

- **s-nomp est réservé aux tests.** Le Book qualifie sa configuration s-nomp d’« expérimentale » et indique que s-nomp « n’est pas compatible avec NU5, donc certaines fonctions de minage sont désactivées ». Son guide [Testnet](https://zebra.zfnd.org/user/mining-testnet-s-nomp.html) ajoute que s-nomp « n’a pas été officiellement mis à jour pour NU5 ou les mises à niveau ultérieures du réseau » et oriente les mineurs de production vers des logiciels de pool compatibles avec les mises à niveau actuelles.
- **Zebra fournit une pile prête à l’emploi.** Le dépôt Zebra contient une configuration Compose Docker dans [`docker/mining/`](https://github.com/ZcashFoundation/zebra/tree/main/docker/mining) qui démarre Zebra avec un pool de minage et, si vous le demandez, un mineur CPU. Le pool qu’elle contient est s-nomp et démarre sur Testnet à moins que vous ne le modifiiez ; considérez-la donc comme un moyen d’apprendre les composants en jeu.

### La voie Docker

Le chemin le plus court du Book est l’image `zfnd/zebra` Docker, avec l’adresse et le port RPC transmis comme variables d’environnement ([Book : minage avec Zebra dans Docker](https://zebra.zfnd.org/user/mining-docker.html)). La commande ci-dessous est celle du Book avec une modification : elle publie le port RPC uniquement sur l’adresse loopback de l’hôte, afin que les autres machines ne puissent pas l’atteindre.

```bash
docker run -d --name zebra_local \
  -e ZEBRA_MINING__MINER_ADDRESS="YOUR_ADDRESS" \
  -e ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:8232 \
  -p 8233:8233 \
  -p 127.0.0.1:8232:8232 \
  -v zebrad-cache:/home/zebra/.cache/zebra \
  zfnd/zebra:latest
```

Cela démarre un nœud Mainnet, publie le port P2P (8233) sur l’hôte Docker, et rend le port RPC (8232) accessible uniquement depuis l’hôte lui-même. Affichez le cookie avec :

```bash
docker exec -it zebra_local cat /home/zebra/.cache/zebra/.cookie
```

- **Conservez `0.0.0.0` dans `ZEBRA_RPC__LISTEN_ADDR`.** C’est l’adresse sur laquelle Zebra écoute à l’intérieur du conteneur. Docker transfère un port publié vers l’interface réseau propre au conteneur ; ainsi, un Zebra qui écoute sur `127.0.0.1` à l’intérieur du conteneur ne recevrait pas la connexion, même depuis l’hôte. Le `127.0.0.1:` devant `-p` est ce qui maintient le port hors du réseau.
- **La commande du Book** publie le port RPC avec `-p 8232:8232`, ce qui l’ouvre sur chaque interface réseau de l’hôte.
- **Pour vous exercer sur Testnet**, ajoutez `-e ZEBRA_NETWORK__NETWORK="Testnet"`, définissez `ZEBRA_RPC__LISTEN_ADDR=0.0.0.0:18232`, publiez `-p 18233:18233` et `-p 127.0.0.1:18232:18232`, et fournissez une adresse Testnet. Une adresse Mainnet empêche Zebra de démarrer sur Testnet, et inversement.

Le paiement des mineurs et la gestion du wallet sont en dehors du périmètre de cette section. Pour la partie wallet, consultez [Zallet](/zcash-tech/zallet).

## Conseils et bonnes pratiques
- **Rentabilité :** Utilisez des calculateurs tels que whattomine.com/coins/166-zec-equihash. Exemple : une RTX 3060 (~300 Sol/s) rapporte ~0,001 ZEC/jour à 50 $/ZEC, moins environ 0,50 $ d’électricité.
- **Confidentialité :** Utilisez des pools shielded s’ils sont disponibles ; évitez de réutiliser des adresses.
- **Sécurité :** Utilisez des mots de passe robustes ; activez la 2FA sur les pools/wallets. Ne partagez jamais vos clés privées.
- **Dépannage :** En l’absence de parts, vérifiez le pare-feu, l’antivirus ou une mauvaise configuration. Rejoignez des forums tels que forum.zcashcommunity.com ou Reddit r/zec.
- **Alternatives :** Si ce n’est pas rentable, envisagez le cloud mining ou le staking d’autres cryptomonnaies.
- **Note environnementale :** Le minage consomme de l’énergie ; utilisez des sources renouvelables si possible.
- **Mises à jour :** Zcash peut évoluer (par exemple, vers un éventuel passage au PoS) ; consultez z.cash pour les actualités.
