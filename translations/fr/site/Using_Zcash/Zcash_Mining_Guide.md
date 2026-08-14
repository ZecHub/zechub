# Guide de minage Zcash : rejoindre un pool de minage avec du matériel personnel

## Introduction

Zcash (ZEC) est une cryptomonnaie axée sur la confidentialité qui utilise l’algorithme de preuve de travail Equihash pour le minage. Miner du Zcash consiste à utiliser de la puissance de calcul pour résoudre des problèmes mathématiques complexes, valider des transactions et sécuriser le réseau en échange de récompenses en ZEC. En raison de la difficulté élevée du réseau, le minage en solo n’est pas recommandé pour la plupart des utilisateurs. Rejoindre un pool de minage est la meilleure façon d’obtenir des récompenses régulières en combinant votre puissance de hachage avec celle d’autres personnes.

Ce guide se concentre sur le minage de Zcash avec du matériel personnel (par ex., un PC domestique avec des GPU ou des ASIC d’entrée de gamme). Notez que, même si les GPU peuvent encore miner du Zcash, les ASIC sont bien plus efficaces et rentables en 2026 en raison de la difficulté du réseau. Vérifiez toujours la rentabilité actuelle à l’aide d’outils comme WhatToMine.com, car des facteurs comme le coût de l’électricité, le prix du matériel et la valeur du ZEC influencent la viabilité. Le minage n’est pas forcément rentable pour tout le monde ; renseignez-vous sur les réglementations locales et les tarifs de l’énergie (visez < 0,08 $/kWh).


## Exigences

### Matériel
- **Minage avec GPU (configuration personnelle recommandée pour les débutants) :**
  - GPU NVIDIA ou AMD avec au moins 4 Go de VRAM (par ex., NVIDIA GTX 1070, RTX 3060 ; AMD RX 580 ou mieux).
  - Une carte mère compatible, une alimentation suffisante (au moins 750 W pour plusieurs GPU) et un bon refroidissement pour éviter la surchauffe.
  - Les rigs multi-GPU sont courants pour obtenir de meilleurs taux de hachage (par ex., 6x GPU peuvent atteindre 1 à 2 kSol/s).
- **Minage avec ASIC (plus efficace mais plus coûteux) :**
  - ASIC compatibles Equihash comme le Bitmain Antminer Z15 (420 kSol/s) ou l’Innosilicon A9 (50 kSol/s).
  - Ils sont plus bruyants, plus chauds et consomment plus d’énergie (par ex., 1500 W+) ; ils conviennent à des espaces dédiés. Achetez auprès de sources réputées comme Bitmain.com ou de revendeurs (Blockware Mining).
- **Général :** Internet stable, un ordinateur pour la configuration/le suivi. Les ASIC dominent le réseau (~13 GSol/s de hashrate total en 2026), ce qui rend le minage avec GPU moins compétitif, mais encore possible pour les amateurs.

### Logiciel
- **Système d’exploitation :** Windows 10/11, Linux (Ubuntu recommandé pour la stabilité).
- **Logiciel de minage :**
  - Pour les GPU : lolMiner (prend en charge AMD/NVIDIA), GMiner ou miniZ (axé NVIDIA). Téléchargez-les depuis les dépôts GitHub officiels (par ex., github.com/Lolliedieb/lolMiner-releases).
  - Pour les ASIC : utilisez le firmware/tableau de bord intégré du fabricant (par ex., l’interface web de Bitmain).
- **Wallet :** Un wallet Zcash pour recevoir les paiements. Recommandés :
  - Shielded (privé) : Zashi Wallet, Zingo (Mobile/Desktop) YWallet (mobile/desktop).
  - Transparent (plus simple mais moins privé) : Edge Wallet, Zecwallet Lite.
  - Téléchargez depuis [portefeuilles](https://zechub.wiki/wallets). Générez une adresse shielded (commence par 'zs') pour plus de confidentialité si le pool la prend en charge.

### Autres
- Électricité : calculez les coûts. Les GPU utilisent 150 à 300 W par carte ; les ASIC 1000 W+.
- Antivirus : désactivez-le pendant la configuration, car il peut signaler les mineurs comme des menaces.

## Guide étape par étape pour rejoindre un pool de minage

### Étape 1 : configurer votre wallet Zcash
1. Téléchargez et installez un wallet depuis le site officiel de Zcash [portefeuilles](https://zechub.wiki/wallets).
2. Créez un nouveau wallet et sauvegardez votre phrase de récupération en lieu sûr.
3. Générez une adresse de réception (de préférence shielded pour la confidentialité). Notez-la, par ex., `zs1exampleaddress...`.
4. Si vous utilisez une adresse transparente (commence par 't'), c’est plus simple mais cela offre moins de confidentialité.

### Étape 2 : préparer votre matériel
- Pour les GPU :
  1. Installez les GPU dans votre PC et mettez à jour les pilotes (NVIDIA : GeForce Experience ; AMD : Radeon Software).
  2. Overclockez si vous avez de l’expérience (utilisez MSI Afterburner pour la stabilité ; visez +100 à 200 sur le core clock, -500 sur la mémoire pour l’efficacité).
- Pour les ASIC :
  1. Connectez l’ASIC à l’alimentation et à Ethernet.
  2. Trouvez son adresse IP à l’aide d’un outil comme Advanced IP Scanner ou l’application du fabricant.
  3. Accédez au tableau de bord web (par ex., entrez l’IP dans le navigateur, identifiants par défaut : root/root pour Bitmain).

**Avertissement :** Assurez une ventilation adéquate ; le minage génère de la chaleur. Commencez petit pour tester.

### Étape 3 : choisir et rejoindre un pool de minage
Les pools de minage répartissent le travail et partagent les récompenses en fonction de votre hashrate contribué. Sélectionnez-en un selon les frais (0-2 %), le minimum de paiement (0,01-0,1 ZEC), l’emplacement (ping faible) et la fiabilité.

**Pools recommandés (selon le hashrate, les frais et les avis) :**
- **2Miners (zec.2miners.com)** : 1 % de frais, paiement PPLNS, prend en charge GPU/ASIC/NiceHash. Hashrate élevé (~1,17 GSol/s), serveurs fiables.
- **F2Pool (zec.f2pool.com)** : 2 % de frais, paiement PPS+, prise en charge multi-coin. Grand pool (~2,57 GSol/s).
- **ViaBTC (zec.viabtc.com)** : 2 % de frais (PPS+), tableau de bord convivial, serveurs mondiaux.
- **AntPool (zec.antpool.com)** : 1 % de frais, de Bitmain, bien adapté aux ASIC (~494 MSol/s).
- **Sovright (mining.sovright.com)** : Un pool Zcash construit sur Stratum V2, actuellement exploité comme testnet public. Aucun paiement ZEC réel pour le moment ; considérez-le comme un moyen de tester votre configuration plutôt que comme une source de revenus. Voir la section dédiée ci-dessous pour plus de détails.
- Autres : Kryptex Pool, Luxor (consultez poolwatch.io/coin/zcash pour des statistiques en temps réel).

1. Visitez le site web du pool et créez un compte (email ou sans inscription pour certains comme 2Miners).
2. Ajoutez votre adresse de wallet Zcash dans les paramètres de paiement.
3. Notez le serveur stratum du pool (par ex., zec.2miners.com:1010) et le port.

### Étape 4 : installer et configurer le logiciel de minage
- Pour les GPU (exemple : lolMiner sous Windows/Linux) :
  1. Téléchargez lolMiner depuis GitHub (dernière version, par ex., 1.88).
  2. Extrayez-le dans un dossier.
  3. Créez un fichier batch (start.bat) avec la configuration :
     ```
     lolMiner.exe --coin ZEC --pool zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
     ```
     - Remplacez `YOUR_WALLET_ADDRESS` par votre adresse ZEC.
     - `WORKER_NAME` : un nom pour votre rig (par ex., Rig1).
     - Pour les serveurs UE : eu.zec.2miners.com:1010.
  4. Exécutez le fichier batch. Il se connectera au pool et commencera à miner.
- Pour les ASIC (exemple : Bitmain Antminer) :
  1. Connectez-vous au tableau de bord web.
  2. Allez dans Miner Configuration.
  3. Ajoutez les détails du pool :
     - URL: stratum+tcp://zec.2miners.com:1010
     - Username: YOUR_WALLET_ADDRESS.WORKER_NAME
     - Password: x (ou vide).
  4. Enregistrez et redémarrez le mineur.
- Pour d’autres logiciels (par ex., GMiner) :
  ```
  miner.exe --algo 125_4 --server zec.2miners.com:1010 --user YOUR_WALLET_ADDRESS.WORKER_NAME --pass x
  ```

**Test :** Faites tourner pendant 10 à 15 minutes ; vérifiez dans la console les shares acceptées et le hashrate.

### Étape 5 : démarrer le minage et surveiller
1. Lancez le mineur : il se connectera au pool et commencera à soumettre des shares.
2. Surveillez via :
   - Tableau de bord du pool : entrez votre adresse de wallet pour voir le hashrate, le solde non payé et les statistiques.
   - Console du logiciel : surveillez les erreurs, la température (gardez < 80 degrés C).
   - Outils : utilisez HiveOS ou SimpleMining OS pour la gestion à distance du rig.
3. Paiements : la plupart des pools paient automatiquement lorsque vous atteignez le minimum (par ex., 0,05 ZEC). Vérifiez les règles du pool.

   
![Configuration de surveillance du minage Zcash](/content-images/zcashMining-5ca0019c17.webp)


## Sovright : pool de testnet et réseau de relais

Sovright (sovright.com) exploite un pool de minage Stratum V2 ainsi qu’un réseau de relais de blocs séparé. Ils remplissent des rôles différents, c’est pourquoi ils sont traités séparément ci-dessous.

### Pool de minage (mining.sovright.com)

Le pool de Sovright fonctionne sur un testnet public Zcash (NU6, Stratum V2), pas sur le mainnet. Le testnet ne verse pas de véritables ZEC. Utilisez-le pour tester la configuration de votre mineur, pas pour gagner de l’argent.

- Aucun compte n’est nécessaire pour commencer. Dirigez un mineur Equihash CPU ou ASIC vers le pool et vos shares apparaîtront sur un tableau de bord en direct.
- Sovright publie également un proxy Stratum V2 open source pour les mineurs qui souhaitent choisir leurs propres modèles de blocs au lieu de simplement prendre les jobs du pool :
  ```
  git clone https://github.com/sovright/mining-infra
  cd mining-infra
  cargo build --release -p sovright-v1-stratum-proxy
  ./target/release/sovright-v1-stratum-proxy --listen 0.0.0.0:3334 --upstream 34.28.134.13:3333
  ```
  Dirigez votre mineur vers le proxy au lieu du pool directement :
  ```
  stratum+tcp://<your-proxy-ip>:3334
  ```
  en utilisant un nom de worker comme `yourname.rig1`.
- La page de transparence de Sovright indique une politique « include all » pour les transactions shielded, contrairement à certains pools qui les filtrent. Chaque bloc reçoit une attestation signée afin que cette politique puisse être vérifiée de manière indépendante.
- Créez un compte sur mining.sovright.com (connexion Google ou email) pour suivre vos propres workers au lieu des données d’exemple du tableau de bord.

### Réseau de relais (relay.sovright.com)

Sovright exploite séparément un réseau public de relais de blocs sur le mainnet Zcash. Lorsqu’un pool trouve un bloc, la vitesse à laquelle ce bloc atteint le reste du réseau détermine la fréquence à laquelle il devient orphelin, ce qui signifie qu’il perd la course de propagation et que la récompense est perdue. Le relais transmet les blocs à travers quatre régions en utilisant un relais de blocs compacts avec correction d’erreurs directe.

Le tableau de bord public montre l’effet en direct : les régions connectées au relais voient les nouveaux blocs en bien moins de la moitié du temps nécessaire au simple gossip peer-to-peer, et le tableau de bord suit le taux d’orphelins en direct du réseau.

Il s’agit d’une infrastructure destinée aux opérateurs de pools, pas aux mineurs individuels. Le dépôt open source `mining-infra` de Sovright documente une passerelle de relais `submitblock` pour diffuser les blocs trouvés dans le maillage plus rapidement que le P2P natif. Pour vous connecter, contactez directement Sovright (support@sovright.com) pour obtenir les adresses des pairs de relais et une clé d’authentification.


## Conseils et bonnes pratiques
- **Rentabilité :** Utilisez des calculateurs comme whattomine.com/coins/166-zec-equihash. Exemple : une RTX 3060 (~300 Sol/s) rapporte ~0,001 ZEC/jour à 50 $/ZEC, moins ~0,50 $ d’électricité.
- **Confidentialité :** Utilisez des pools shielded si disponibles ; évitez de réutiliser les adresses.
- **Sécurité :** Utilisez des mots de passe robustes ; activez la 2FA sur les pools/wallets. Ne partagez jamais vos clés privées.
- **Dépannage :** Si aucune share n’est envoyée, vérifiez le pare-feu, l’antivirus ou une mauvaise configuration. Rejoignez des forums comme forum.zcashcommunity.com ou Reddit r/zec.
- **Alternatives :** Si ce n’est pas rentable, envisagez le cloud mining ou le staking d’autres coins.
- **Note environnementale :** Le minage consomme de l’énergie ; utilisez des sources renouvelables si possible.
- **Mises à jour :** Zcash peut évoluer (par ex., passage potentiel au PoS) ; consultez z.cash pour les actualités.
