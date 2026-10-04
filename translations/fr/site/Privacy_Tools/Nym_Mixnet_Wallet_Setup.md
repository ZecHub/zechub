<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Acheminer le trafic des wallets Zcash via le mixnet Nym

> Dernière vérification : 29 septembre 2026

Les transactions blindées Zcash protègent les données de transaction sur la blockchain, mais les wallets communiquent toujours via Internet. Des observateurs réseau peuvent potentiellement connaître des métadonnées telles que votre adresse IP, le moment où votre wallet se connecte et l'infrastructure qu'il contacte.

Nym ajoute une couche distincte de confidentialité réseau. En septembre 2026, la meilleure approche dépend du wallet :

1. **Privilégiez l'intégration Nym native d'un wallet lorsqu'elle existe.**
2. Sinon, utilisez le **mode Mixnet NymVPN au niveau du système** afin que le trafic réseau du wallet soit acheminé via Nym sans dépendre de la prise en charge d'un proxy propre au wallet.

Pour des informations générales sur les VPN et dVPN, consultez [VPN et dVPN](./VPN_and_DVPN.md).

## Ce que Nym ajoute — et ce qu'il n'ajoute pas

Un paiement blindé Zcash et un outil de confidentialité réseau résolvent des problèmes différents :

- Les **pools blindés Zcash** protègent les détails des transactions sur la blockchain.
- Le **routage par mixnet Nym** vise à réduire la possibilité d'établir un lien entre votre véritable identité réseau et le service recevant le trafic du wallet.
- Une destination contactée via un tunnel NymVPN au niveau du système devrait voir une sortie Nym plutôt que votre IP domestique/mobile.

Le mixnet de Nym utilise plusieurs sauts, le mélange de paquets, des délais aléatoires, du trafic de couverture et le chiffrement onion afin de réduire les fuites de métadonnées réseau.

Nym ne protège **pas** contre un appareil compromis, un logiciel de wallet malveillant, des phrases de récupération exposées, l'identité que vous révélez via des comptes d'exchange, ou la perte de confidentialité provoquée par une activité Zcash transparente.

## Prise en charge Nym native : utilisez-la en premier lorsqu'elle est disponible

Le 24 septembre 2026, Nym a annoncé que son travail financé par une Community Grant Zcash était achevé et que la prise en charge native du mixnet était déployée dans de vrais wallets Zcash.

### Wallet Zingo!

Zingo PC comprend un transport Nym natif. Zingo Mobile propose également le mode Mixnet sur iOS et Android à l'aide d'un proxy Nym intégré à l'application.

Comportement actuel documenté par Zingo :

- Le contrôle Nym se trouve sous **Settings → Nym Mixnet**.
- L'envoi d'un paiement est acheminé via le mixnet.
- Les transmissions de migration Ironwood suivent le même chemin d'envoi protégé.
- Les requêtes de prix ZEC sont également acheminées via le mixnet.
- L'envoi échoue en mode fermé lorsque Nym est activé : si le transport mixnet n'est pas disponible, le paiement n'est pas silencieusement envoyé sur le clearnet.
- **La synchronisation de la chaîne n'est actuellement pas acheminée via le mixnet** dans Zingo PC. Les blocs compacts, requêtes de nullifier, récupérations de transactions, trafic mempool et vérifications de l'état du serveur utilisent toujours la connexion serveur normale.

Cette distinction est importante : l'intégration native de Zingo protège le chemin de diffusion présentant le plus fort risque de liaison, mais elle ne constitue pas encore un tunnel réseau couvrant tout l'appareil.

Si votre modèle de menace exige également de cacher le trafic de synchronisation au serveur, utilisez un tunnel de confidentialité au niveau du système tel que NymVPN, tout en tenant compte de la latence et de la complexité supplémentaires que cela entraîne.

Sources :

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym indique que **Zkool** prend désormais en charge la connexion à l'infrastructure RPC Zcash via le mixnet Nym à l'aide d'une option native.

Zkool est le successeur activement maintenu de YWallet. Son projet prend également en charge le proxy Tor et les services onion pour les connexions au serveur Zcash.

Préférez l'option Nym native de Zkool plutôt que d'essayer de forcer une ancienne version de YWallet à passer par un chemin proxy non documenté.

Sources :

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet dispose également de chemins de transport compatibles avec Nym. Son implémentation actuelle prend en charge l'acheminement de la soumission des transactions sortantes via le mixnet Nym, ainsi qu'un chemin dVPN Nym distinct pour la synchronisation des blocs compacts. Considérez-les comme des protections distinctes au lieu de supposer que chaque requête du wallet utilise automatiquement le mixnet.

Sources :

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### ZODL

ZODL propose actuellement une **Tor Protection** intégrée, et non la même intégration Nym native décrite ci-dessus pour Zingo, Zkool et Nozy.

La fonctionnalité Tor de ZODL peut acheminer via Tor la soumission des transactions, la récupération des données de transaction, les demandes de taux de change et les appels d'API tierces. Le 24 septembre 2026, Nym a déclaré être encore en discussion active avec l'équipe ZODL concernant une intégration plus large du mixnet.

Pour ZODL aujourd'hui, utilisez soit :

- la Tor Protection documentée de ZODL, soit
- NymVPN au niveau du système si votre objectif est d'acheminer le trafic général de l'appareil du wallet via Nym.

Ne supposez pas que Tor et Nym sont des transports interchangeables au sein du wallet simplement parce qu'il s'agit tous deux de réseaux de confidentialité.

Paramètres Tor de ZODL :

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Sources :

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Solution de repli : NymVPN au niveau du système

C'est l'option Nym la plus largement compatible, car elle n'exige pas que le wallet comprenne des paramètres de proxy propres à Nym.

### 1. Installer NymVPN

Téléchargez NymVPN uniquement depuis le site officiel de Nym ou une boutique de plateforme officielle :

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN prend en charge Android, iOS, Linux, Windows et macOS.

### 2. Sélectionner le mode Mixnet

NymVPN propose le **mode Fast**, un chemin dVPN à 2 sauts optimisé pour une latence plus faible, et le **mode Mixnet**, un chemin mixnet à 5 sauts optimisé pour une meilleure protection des métadonnées réseau. Pour les activités sensibles du wallet, sélectionnez le mode Mixnet et attendez que le client indique que la connexion est établie avant d'ouvrir ou d'actualiser le wallet.

### 3. Laisser le wallet sur ses paramètres réseau normaux

Lorsque le système d'exploitation achemine déjà le trafic via NymVPN, la plupart des wallets n'ont pas besoin de paramètres proxy personnalisés.

Ouvrez normalement le wallet et laissez-le se synchroniser.

Si NymVPN propose le split tunneling sur votre plateforme, assurez-vous que le wallet est **inclus dans le tunnel protégé** et non placé sur une liste de contournement ou d'exclusion.

### 4. Vérifier le tunnel avant d'utiliser le wallet

Une vérification simple au niveau du système :

1. Déconnectez NymVPN.
2. Consultez un service public de vérification d'IP ou, sur ordinateur, exécutez :

   ```bash
   curl https://api.ipify.org
   ```

3. Notez l'IP affichée.
4. Connectez NymVPN en mode Mixnet.
5. Répétez la vérification.

L'adresse IP publique visible devrait changer.

Cela confirme le tunnel système. Cela ne prouve **pas** que chaque requête effectuée par un wallet donné suit le même chemin si l'application ou le système d'exploitation applique des règles de routage particulières.

Pour davantage d'assurance sur ordinateur :

- inspectez le processus du wallet avec le moniteur réseau du système d'exploitation ;
- vérifiez qu'il n'existe aucune exclusion de split tunneling ;
- confirmez que le comportement attendu du wallet change si NymVPN est déconnecté.

Ne publiez pas de captures d'écran contenant des adresses de wallet, soldes, identifiants de transaction, adresses IP ou éléments de récupération lors du dépannage.

## Mode proxy dApp / wallet NymVPN

NymVPN propose également un mode proxy pour applications et wallets utilisant un routage SOCKS5 / RPC via le mixnet.

La documentation publique de configuration de Nym présente principalement cette solution avec une configuration RPC de type Ethereum. Elle est utile pour les logiciels prenant explicitement en charge un chemin proxy/RPC générique compatible, mais il ne faut **pas** supposer qu'elle fonctionne avec tous les wallets Zcash.

N'utilisez ce chemin que lorsque la documentation propre au wallet confirme une prise en charge compatible du proxy ou de RPC.

Sinon, privilégiez :

- l'intégration Nym native du wallet, ou
- NymVPN au niveau du système.

## Compromis de performances et de délais d'expiration

Les mixnets sacrifient intentionnellement la vitesse au profit d'une protection renforcée des métadonnées.

Attendez-vous à des conséquences possibles sur :

- la synchronisation initiale du wallet ;
- les grandes synchronisations de rattrapage ;
- les requêtes d'historique des transactions ;
- les délais d'expiration RPC ;
- les appels d'API tierces.

Conseils pratiques :

- Commencez avec les paramètres Nym par défaut.
- Attendez-vous à ce que la première synchronisation ou une longue synchronisation de rattrapage prenne davantage de temps.
- Réessayez après un délai d'expiration avant d'affaiblir les paramètres de confidentialité.
- Évitez de changer à répétition de mode de confidentialité juste avant une transaction sensible.
- Si vous utilisez un chemin plus rapide pour une synchronisation de masse, comprenez que l'infrastructure contactée peut observer votre véritable identité réseau durant cette période.
- Pour Zingo PC en particulier, rappelez-vous que son transport Nym natif protège actuellement les envois et la consultation des prix, tandis que la synchronisation reste directe.

## Considérations mobiles

Sur Android et iOS, l'emplacement VPN du système d'exploitation est généralement la façon la plus simple d'acheminer le trafic général du wallet via NymVPN : connectez d'abord NymVPN, puis ouvrez le wallet.

Si un autre VPN, pare-feu ou bloqueur de publicités fondé sur un VPN local occupe déjà l'interface VPN du système, les deux produits risquent de ne pas pouvoir fonctionner simultanément. Vérifiez l'état du VPN du système d'exploitation avant de supposer que le wallet est protégé.

## Liste de contrôle du modèle de menace

Avant de vous fier à cette configuration, demandez-vous :

- Est-ce que j'utilise des adresses Zcash blindées lorsque cela est approprié ?
- Mon wallet prend-il en charge Nym de façon native ?
- Si oui, quel trafic exactement cette intégration native protège-t-elle ?
- Si j'ai besoin d'une couverture plus large, NymVPN est-il connecté avant que le wallet ne commence son activité réseau ?
- Le wallet est-il exclu par une règle de split tunneling ?
- Est-ce que je m'appuie sur un mode proxy que le wallet documente réellement ?
- Est-ce que je révèle mon identité via un exchange, une session de navigateur, une API tierce ou une adresse transparente ?
- Suis-je prêt à accepter une synchronisation plus lente et des délais d'expiration occasionnels ?

## Sources

- Nym : le mixnet Nym désormais actif dans les wallets Zcash, 24 septembre 2026 : https://nym.com/blog/nym-mixnet-zcash-wallets
- Comportement Nym de Zingo PC : https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Transport Nym Mobile de Zingo : https://github.com/zingolabs/zingo-mobile
- Dépôt Zkool : https://github.com/hhanh00/zkool2
- Travail sur le transport Nym de NozyWallet : https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12 : https://nym.com/blog/nymvpn-v2026.12
- Tor Protection de ZODL : https://support.zodl.com/article/17-enabling-tor-protection
