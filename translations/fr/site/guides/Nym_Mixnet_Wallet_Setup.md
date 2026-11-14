<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Acheminer le trafic du portefeuille Zcash via le mixnet Nym

> Dernière vérification : 29 septembre 2026

Les transactions protégées de Zcash protègent les données des transactions on-chain, mais les portefeuilles communiquent tout de même via Internet. Les observateurs du réseau peuvent potentiellement obtenir des métadonnées telles que votre adresse IP, le moment où votre portefeuille se connecte et l'infrastructure qu'il contacte.

Nym ajoute une couche distincte de confidentialité réseau. En septembre 2026, la meilleure approche dépend du portefeuille :

1. **Privilégiez l'intégration native de Nym d'un portefeuille lorsqu'elle existe.**
2. Sinon, utilisez le **mode Mixnet de NymVPN au niveau du système** afin que le trafic réseau du portefeuille soit acheminé via Nym sans dépendre de la prise en charge d'un proxy propre au portefeuille.

Pour des informations générales sur les VPN et les dVPN, consultez [VPN et dVPN](../Privacy_Tools/VPN_and_DVPN.md).

## Ce qu'apporte Nym, et ce qu'il n'apporte pas

Un paiement Zcash protégé et un outil de confidentialité réseau résolvent des problèmes différents :

- **Les pools protégés de Zcash** protègent les détails des transactions on-chain.
- **Le routage par le mixnet Nym** est conçu pour réduire la possibilité de relier votre véritable identité réseau au service qui reçoit le trafic du portefeuille.
- Une destination contactée via un tunnel NymVPN au niveau du système devrait voir une sortie Nym plutôt que votre IP domestique ou mobile.

Le mixnet de Nym utilise plusieurs sauts, le mélange de paquets, des délais aléatoires, du trafic de couverture et un chiffrement en oignon pour réduire la fuite de métadonnées réseau.

Nym ne protège **pas** contre un appareil compromis, un logiciel de portefeuille malveillant, des phrases de récupération exposées, l'identité que vous révélez via des comptes d'exchange, ni la perte de confidentialité causée par une activité Zcash transparente.

## Prise en charge native de Nym : à utiliser en priorité lorsqu'elle est disponible

Nym a annoncé le 24 septembre 2026 que son travail financé par la subvention communautaire Zcash est terminé et que la prise en charge native du mixnet est désormais intégrée dans de véritables portefeuilles Zcash.

### Portefeuille Zingo!

Zingo PC inclut un transport Nym natif. Zingo Mobile propose également le mode Mixnet sur iOS et Android grâce à un proxy Nym intégré à l'application.

Comportement actuel documenté par Zingo :

- Le réglage Nym se trouve sous **Paramètres → Mixnet Nym**.
- L'envoi d'un paiement est acheminé via le mixnet.
- Les transmissions de migration Ironwood suivent le même chemin d'envoi protégé.
- Les requêtes de prix ZEC sont également acheminées via le mixnet.
- L'envoi échoue de manière sécurisée lorsque Nym est activé : si le transport mixnet n'est pas disponible, le paiement n'est pas envoyé silencieusement via le réseau ouvert.
- **La synchronisation de la chaîne n'est actuellement pas acheminée via le mixnet** dans Zingo PC. Les blocs compacts, les requêtes de nullifiers, la récupération des transactions, le trafic du mempool et les vérifications de l'état du serveur utilisent toujours la connexion normale au serveur.

Cette distinction est importante : l'intégration native de Zingo protège le chemin de diffusion le plus susceptible de permettre des recoupements, mais ce n'est pas encore un tunnel réseau couvrant tout l'appareil.

Si votre modèle de menace exige également de masquer le trafic de synchronisation au serveur, utilisez en complément un tunnel de confidentialité au niveau du système tel que NymVPN, en tenant compte de la latence et de la complexité supplémentaires que cela entraîne.

Sources :

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym indique que **Zkool** permet désormais de se connecter à l'infrastructure RPC Zcash via le mixnet Nym grâce à un interrupteur natif.

Zkool est le successeur activement maintenu de YWallet. Le projet prend également en charge le proxy Tor et les services onion pour les connexions au serveur Zcash.

Privilégiez l'option Nym native de Zkool plutôt que d'essayer de forcer une ancienne version de YWallet à passer par un chemin de proxy non documenté.

Sources :

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet dispose également de chemins de transport compatibles avec Nym. Son implémentation actuelle permet d'acheminer la soumission des transactions sortantes via le mixnet Nym, ainsi qu'un chemin dVPN Nym distinct pour la synchronisation des blocs compacts. Considérez-les comme des protections distinctes plutôt que de supposer que chaque requête du portefeuille utilise automatiquement le mixnet.

Sources :

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl dispose actuellement d'une **protection Tor** intégrée, qui n'est pas la même intégration Nym native que celle décrite ci-dessus pour Zingo, Zkool et Nozy.

La fonctionnalité Tor de Zodl peut acheminer via Tor la soumission des transactions, la récupération des données de transaction, les requêtes de taux de change et les appels aux API tierces. Nym a déclaré le 24 septembre 2026 être toujours en discussion active avec l'équipe Zodl au sujet d'une intégration plus large du mixnet.

Pour Zodl aujourd'hui, utilisez soit :

- la protection Tor documentée de Zodl, soit
- NymVPN au niveau du système si votre objectif est d'acheminer le trafic général de l'appareil du portefeuille via Nym.

Ne supposez pas que Tor et Nym sont des transports interchangeables au sein du portefeuille simplement parce que ce sont tous deux des réseaux de confidentialité.

Paramètres Tor de Zodl :

**Plus → Fonctionnalités avancées → Bêta : protection Tor → Activer → Enregistrer les modifications**

Sources :

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Solution de repli : NymVPN au niveau du système

Il s'agit de l'option Nym la plus largement compatible, car elle n'exige pas que le portefeuille comprenne des paramètres de proxy propres à Nym.

### 1. Installer NymVPN

Téléchargez NymVPN uniquement depuis le site officiel de Nym ou depuis une boutique d'applications officielle :

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN prend en charge Android, iOS, Linux, Windows et macOS.

### 2. Sélectionner le mode Mixnet

NymVPN propose le **mode rapide**, un chemin dVPN à 2 sauts optimisé pour une latence plus faible, et le **mode Mixnet**, un chemin mixnet à 5 sauts optimisé pour une meilleure protection des métadonnées réseau. Pour une activité sensible du portefeuille, sélectionnez le mode Mixnet et attendez que le client indique que la connexion est établie avant d'ouvrir ou d'actualiser le portefeuille.

### 3. Conserver les paramètres réseau normaux du portefeuille

Lorsque le système d'exploitation fait déjà passer le trafic par un tunnel NymVPN, la plupart des portefeuilles n'ont pas besoin de paramètres de proxy personnalisés.

Ouvrez le portefeuille normalement et laissez-le se synchroniser.

Si NymVPN propose le split tunneling sur votre plateforme, vérifiez que le portefeuille est **inclus dans le tunnel protégé** et qu'il ne figure pas sur une liste de contournement ou d'exclusion.

### 4. Vérifier le tunnel avant d'utiliser le portefeuille

Une vérification simple au niveau du système :

1. Déconnectez NymVPN.
2. Consultez un service public de vérification d'IP ou, sur ordinateur, exécutez :

   ```bash
   curl https://api.ipify.org
   ```

3. Notez l'IP visible.
4. Connectez NymVPN en mode Mixnet.
5. Répétez la vérification.

L'IP publique visible devrait changer.

Cela confirme le tunnel du système. Cela ne prouve **pas** que chaque requête effectuée par un portefeuille donné suit le même chemin si l'application ou le système d'exploitation applique des règles de routage particulières.

Pour davantage de certitude sur ordinateur :

- examinez le processus du portefeuille avec le moniteur réseau du système d'exploitation,
- vérifiez qu'il n'existe aucune exclusion de split tunneling,
- confirmez que le comportement du portefeuille change comme prévu si NymVPN est déconnecté.

Lors du dépannage, ne publiez pas de captures d'écran contenant des adresses de portefeuille, des soldes, des identifiants de transaction, des adresses IP ou des éléments de récupération.

## Mode proxy dApp / portefeuille de NymVPN

NymVPN propose également un mode proxy pour applications et portefeuilles utilisant un routage SOCKS5 / RPC via le mixnet.

La documentation publique de configuration de Nym l'illustre principalement avec une configuration RPC de type Ethereum. Elle est utile pour les logiciels qui prennent explicitement en charge un chemin proxy/RPC générique compatible, mais il ne faut **pas** supposer qu'elle fonctionne avec tous les portefeuilles Zcash.

N'utilisez ce chemin que lorsque la documentation du portefeuille lui-même confirme une prise en charge compatible du proxy ou du RPC.

Sinon, privilégiez :

- l'intégration Nym native du portefeuille, ou
- NymVPN au niveau du système.

## Compromis entre performances et délais d'expiration

Les mixnets sacrifient volontairement la vitesse au profit d'une meilleure protection des métadonnées.

Attendez-vous à un impact possible sur :

- la synchronisation initiale du portefeuille,
- les synchronisations de rattrapage importantes,
- les requêtes d'historique des transactions,
- les délais d'expiration RPC,
- les appels aux API tierces.

Conseils pratiques :

- Commencez avec les paramètres Nym par défaut.
- Attendez-vous à ce que la première synchronisation ou une longue synchronisation de rattrapage prenne plus de temps.
- Réessayez après un délai d'expiration avant d'affaiblir les paramètres de confidentialité.
- Évitez de changer de mode de confidentialité à plusieurs reprises juste avant une transaction sensible.
- Si vous utilisez un chemin plus rapide pour la synchronisation en masse, sachez que l'infrastructure contactée peut observer votre véritable identité réseau pendant cette période.
- Pour Zingo PC en particulier, rappelez-vous que son transport Nym natif protège actuellement les envois et la consultation des prix, tandis que la synchronisation reste directe.

## Considérations pour les appareils mobiles

Sur Android et iOS, l'emplacement VPN du système d'exploitation est généralement le moyen le plus simple d'acheminer le trafic général du portefeuille via NymVPN : connectez d'abord NymVPN, puis ouvrez le portefeuille.

Si un autre VPN, un pare-feu ou un bloqueur de publicités local basé sur un VPN occupe déjà l'interface VPN du système, les deux produits risquent de ne pas pouvoir fonctionner simultanément. Vérifiez l'état du VPN dans le système d'exploitation avant de supposer que le portefeuille est protégé.

## Liste de contrôle du modèle de menace

Avant de vous fier à cette configuration, posez-vous les questions suivantes :

- Est-ce que j'utilise des adresses Zcash protégées lorsque c'est approprié ?
- Mon portefeuille prend-il en charge Nym de manière native ?
- Si oui, quel trafic exactement cette intégration native protège-t-elle ?
- Si j'ai besoin d'une couverture plus large, NymVPN est-il connecté avant que le portefeuille ne commence son activité réseau ?
- Le portefeuille est-il exclu par une règle de split tunneling ?
- Est-ce que je m'appuie sur un mode proxy que le portefeuille documente réellement ?
- Est-ce que je divulgue mon identité via un exchange, une session de navigateur, une API tierce ou une adresse transparente ?
- Suis-je prêt à accepter une synchronisation plus lente et des délais d'expiration occasionnels ?

## Sources

- Nym : le mixnet Nym est désormais disponible dans les portefeuilles Zcash, 24 septembre 2026 : https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportement de Nym dans Zingo PC : https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transport Nym de Zingo Mobile : https://github.com/zingolabs/zingo-mobile
- Dépôt Zkool : https://github.com/hhanh00/zkool2
- Travaux sur le transport Nym de NozyWallet : https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12 : https://nym.com/blog/nymvpn-v2026.12
- Protection Tor de Zodl : https://support.zodl.com/article/17-enabling-tor-protection
