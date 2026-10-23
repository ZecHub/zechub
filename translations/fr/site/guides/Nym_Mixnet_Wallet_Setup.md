<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page https://github.com/ZecHub/zechub/pull/2238t"/>
</a>

# Acheminer le trafic des wallets Zcash via le mixnet Nym

> Dernière vérification : 29 septembre 2026

Les transactions protégées Zcash protègent les données de transaction on-chain, mais les wallets communiquent toujours sur Internet. Les observateurs du réseau peuvent potentiellement apprendre des métadonnées telles que votre adresse IP, le moment où votre wallet se connecte et l'infrastructure qu'il contacte.

Nym ajoute une couche distincte de confidentialité réseau. En septembre 2026, la meilleure approche dépend du wallet :

1. **Privilégiez l'intégration native Nym d'un wallet lorsqu'elle existe.**
2. Sinon, utilisez le **mode Mixnet NymVPN au niveau du système** afin que le trafic réseau du wallet soit acheminé via Nym sans dépendre d'une prise en charge de proxy propre au wallet.

Pour des informations générales sur les VPN et dVPN, consultez [VPN et dVPN](./VPN_and_DVPN.md).

## Ce que Nym ajoute — et ce qu'il n'ajoute pas

Un paiement protégé Zcash et un outil de confidentialité réseau résolvent des problèmes différents :

- Les **pools protégés Zcash** protègent les détails des transactions on-chain.
- Le **routage par mixnet Nym** est conçu pour réduire la possibilité d'établir un lien entre votre véritable identité réseau et le service qui reçoit le trafic du wallet.
- Une destination contactée via un tunnel NymVPN au niveau du système devrait voir une sortie Nym plutôt que votre adresse IP résidentielle/mobile.

Le mixnet de Nym utilise plusieurs sauts, le mélange de paquets, des délais aléatoires, du trafic de couverture et le chiffrement onion afin de réduire les fuites de métadonnées réseau.

Nym ne protège **pas** contre un appareil compromis, un logiciel de wallet malveillant, des phrases de récupération exposées, l'identité que vous révélez via des comptes d'exchange, ou une perte de confidentialité causée par une activité Zcash transparente.

## Prise en charge native de Nym : utilisez-la d'abord lorsqu'elle est disponible

Le 24 septembre 2026, Nym a annoncé que son travail de Zcash Community Grant Zcash était terminé et que la prise en charge native du mixnet était déployée dans de véritables wallets Zcash.

### Wallet Zingo!

Zingo PC inclut un transport natif Nym. Zingo Mobile propose également le mode Mixnet sur iOS et Android à l'aide d'un proxy Nym intégré à l'application.

Comportement actuel documenté par Zingo :

- Le contrôle Nym se trouve sous **Paramètres → Mixnet Nym**.
- L'envoi d'un paiement est acheminé via le mixnet.
- Les transmissions de migration Ironwood suivent le même chemin d'envoi protégé.
- Les demandes de prix ZEC sont également acheminées via le mixnet.
- L'envoi échoue de façon sécurisée lorsque Nym est activé : si le transport mixnet n'est pas disponible, le paiement n'est pas envoyé silencieusement via clearnet.
- **La synchronisation de la chaîne n'est actuellement pas acheminée via le mixnet** dans Zingo PC. Les blocs compacts, les requêtes de nullifier, les récupérations de transactions, le trafic mempool et les vérifications de l'état des serveurs utilisent toujours la connexion normale au serveur.

Cette distinction est importante : l'intégration native de Zingo protège le chemin de diffusion présentant le plus fort risque de corrélation, mais elle ne constitue pas encore un tunnel réseau couvrant tout l'appareil.

Si votre modèle de menace exige également de masquer le trafic de synchronisation au serveur, utilisez un tunnel de confidentialité au niveau du système tel que NymVPN, tout en tenant compte de la latence et de la complexité supplémentaires que cela introduit.

Sources :

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym indique que **Zkool** prend désormais en charge la connexion à l'infrastructure RPC Zcash via le mixnet Nym grâce à une option native.

Zkool est le successeur activement maintenu de YWallet. Son projet prend également en charge le proxy Tor et les services onion pour les connexions serveur Zcash.

Préférez l'option native Nym de Zkool plutôt que de tenter de forcer une ancienne version de YWallet à utiliser un chemin proxy non documenté.

Sources :

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet dispose également de chemins de transport compatibles avec Nym. Son implémentation actuelle prend en charge l'acheminement de la soumission de transactions sortantes via le mixnet Nym et un chemin dVPN Nym distinct pour la synchronisation des blocs compacts. Considérez-les comme des protections distinctes plutôt que de supposer que chaque requête du wallet utilise automatiquement le mixnet.

Sources :

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl dispose actuellement d'une **protection Tor** intégrée, qui n'est pas la même intégration native Nym que celle décrite ci-dessus pour Zingo, Zkool et Nozy.

La fonctionnalité Tor de Zodl peut acheminer la soumission de transactions, la récupération de données de transaction, les demandes de taux de change et les appels d'API tiers via Tor. Le 24 septembre 2026, Nym a indiqué qu'il était toujours en discussion active avec l'équipe Zodl concernant une intégration plus large du mixnet.

Pour Zodl aujourd'hui, utilisez soit :

- la protection Tor documentée de Zodl, ou
- NymVPN au niveau du système si votre objectif est d'acheminer le trafic général de l'appareil du wallet via Nym.

Ne supposez pas que Tor et Nym sont des transports interchangeables au sein du wallet simplement parce qu'il s'agit dans les deux cas de réseaux de confidentialité.

Paramètres Tor de Zodl :

**Plus → Fonctionnalités avancées → Bêta : protection Tor → Activer → Enregistrer les modifications**

Sources :

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Solution de repli : NymVPN au niveau du système

Il s'agit de l'option Nym la plus largement compatible, car elle n'exige pas que le wallet comprenne les paramètres de proxy spécifiques à Nym.

### 1. Installer NymVPN

Téléchargez NymVPN uniquement depuis le site officiel de Nym ou une boutique officielle de plateforme :

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN prend en charge Android, iOS, Linux, Windows et macOS.

### 2. Sélectionner le mode Mixnet

NymVPN propose le **mode Rapide**, un chemin dVPN à 2 sauts optimisé pour réduire la latence, et le **mode Mixnet**, un chemin mixnet à 5 sauts optimisé pour une meilleure protection des métadonnées réseau. Pour les activités sensibles liées au wallet, sélectionnez le mode Mixnet et attendez que le client indique que la connexion est établie avant d'ouvrir ou d'actualiser le wallet.

### 3. Laisser le wallet sur les paramètres réseau normaux

Lorsque le système d'exploitation tunnelise déjà le trafic via NymVPN, la plupart des wallets n'ont pas besoin de paramètres de proxy personnalisés.

Ouvrez le wallet normalement et autorisez-le à se synchroniser.

Si NymVPN propose le split tunneling sur votre plateforme, confirmez que le wallet est **inclus dans le tunnel protégé** et non placé sur une liste de contournement ou d'exclusion.

### 4. Vérifier le tunnel avant d'utiliser le wallet

Une simple vérification au niveau du système :

1. Déconnectez NymVPN.
2. Visitez un service public de vérification d'adresse IP ou, sur ordinateur, exécutez :

   ```bash
   curl https://api.ipify.org
   ```

3. Notez l'adresse IP visible.
4. Connectez NymVPN en mode Mixnet.
5. Répétez la vérification.

L'adresse IP publique visible devrait changer.

Cela confirme le tunnel système. Cela ne **prouve pas** que chaque requête effectuée par un wallet particulier suit le même chemin si l'application ou le système d'exploitation dispose de règles de routage spéciales.

Pour davantage d'assurance sur ordinateur :

- inspectez le processus du wallet avec le moniteur réseau du système d'exploitation,
- vérifiez qu'il n'existe aucune exclusion de split tunneling,
- confirmez que le comportement attendu du wallet change si NymVPN est déconnecté.

Ne publiez pas de captures d'écran contenant des adresses de wallet, des soldes, des identifiants de transaction, des adresses IP ou du matériel de récupération lors du dépannage.

## Mode proxy pour dApp / wallet NymVPN

NymVPN propose également un mode proxy pour applications et wallets utilisant le routage SOCKS5 / RPC via le mixnet.

La documentation publique de configuration de Nym illustre principalement cette fonctionnalité avec une configuration RPC de type Ethereum. Elle est utile pour les logiciels qui prennent explicitement en charge un chemin générique proxy/RPC compatible, mais il ne faut **pas** supposer qu'elle fonctionne avec tous les wallets Zcash.

Utilisez ce chemin uniquement lorsque la documentation du wallet confirme une prise en charge compatible du proxy ou de RPC.

Sinon, privilégiez :

- l'intégration native Nym du wallet, ou
- NymVPN au niveau du système.

## Compromis de performances et de délais d'attente

Les mixnets échangent volontairement de la vitesse contre une protection plus forte des métadonnées.

Attendez-vous à un impact possible sur :

- la synchronisation initiale du wallet,
- les grandes synchronisations de rattrapage,
- les requêtes d'historique des transactions,
- les délais d'attente RPC,
- les appels d'API tiers.

Conseils pratiques :

- Commencez avec les paramètres Nym par défaut.
- Attendez-vous à ce que la première synchronisation ou une longue synchronisation de rattrapage prenne plus de temps.
- Réessayez après un délai d'attente avant d'affaiblir les paramètres de confidentialité.
- Évitez de changer répétitivement de mode de confidentialité immédiatement avant une transaction sensible.
- Si vous utilisez un chemin plus rapide pour une synchronisation volumineuse, sachez que l'infrastructure contactée peut observer votre véritable identité réseau durant cette période.
- Pour Zingo PC en particulier, rappelez-vous que son transport natif Nym protège actuellement les envois et la consultation des prix, tandis que la synchronisation reste directe.

## Considérations mobiles

Sur Android et iOS, l'emplacement VPN du système d'exploitation est généralement le moyen le plus simple d'acheminer le trafic général du wallet via NymVPN : connectez d'abord NymVPN, puis ouvrez le wallet.

Si un autre VPN, pare-feu ou bloqueur de publicité local basé sur VPN utilise déjà l'interface VPN du système, les deux produits peuvent ne pas pouvoir fonctionner simultanément. Confirmez l'état du VPN du système d'exploitation avant de supposer que le wallet est protégé.

## Liste de contrôle du modèle de menace

Avant de vous fier à cette configuration, posez-vous les questions suivantes :

- Est-ce que j'utilise des adresses Zcash protégées lorsque cela est approprié ?
- Mon wallet prend-il en charge Nym de manière native ?
- Si oui, quel trafic exactement cette intégration native protège-t-elle ?
- Si j'ai besoin d'une couverture plus large, NymVPN est-il connecté avant que le wallet commence toute activité réseau ?
- Le wallet est-il exclu par une règle de split tunneling ?
- Est-ce que je m'appuie sur un mode proxy réellement documenté par le wallet ?
- Est-ce que je divulgue mon identité via un exchange, une session de navigateur, une API tierce ou une adresse transparente ?
- Suis-je prêt à accepter une synchronisation plus lente et des délais d'attente occasionnels ?

## Sources

- Nym : le mixnet Nym est désormais actif dans les wallets Zcash, 24 septembre 2026 : https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportement de Zingo PC Nym : https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transport Nym de Zingo Mobile : https://github.com/zingolabs/zingo-mobile
- Dépôt Zkool : https://github.com/hhanh00/zkool2
- Travail sur le transport Nym de NozyWallet : https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12 : https://nym.com/blog/nymvpn-v2026.12
- Protection Tor de Zodl : https://support.zodl.com/article/17-enabling-tor-protection
