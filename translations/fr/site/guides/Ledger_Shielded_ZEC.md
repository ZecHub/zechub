<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide d'utilisation des ZEC protégés avec Ledger

> Détenez, recevez et envoyez des ZEC privés (protégés) avec votre portefeuille matériel Ledger dans Ledger Wallet Desktop.

## En bref

* Depuis le 23 septembre 2026, Ledger Wallet Desktop prend en charge les ZEC protégés. Un même compte Zcash dispose d'un solde transparent et d'un solde privé dans le pool Ironwood.
* Uniquement sur ordinateur pour l'instant. La prise en charge mobile est annoncée comme « bientôt disponible ».
* Il vous faut un Nano S Plus, un Nano X, un Stax ou un Flex (pas le Nano S d'origine), Ledger Wallet Desktop 4.21 ou ultérieur et la dernière version de l'application Zcash.
* Cliquez une seule fois sur **Activer le mode protégé** : votre Ledger exporte une clé pour lecture seule afin que l'application de bureau puisse retrouver vos fonds privés. Les clés de dépense ne quittent jamais l'appareil.
* Recevez sur l'adresse privée (u1...) chaque fois que possible. Transférer des ZEC de votre solde transparent vers votre solde privé fonctionne, mais crée un lien entre les deux.
* Chaque envoi est vérifié et signé sur l'écran du Ledger. Vérifiez-y les adresses, caractère par caractère.

## Explication de base

Zcash comporte deux types de solde. Les ZEC transparents (adresses t1) fonctionnent comme le Bitcoin : les montants et les adresses sont publics. Les ZEC protégés se trouvent dans un pool protégé, où l'expéditeur, le destinataire et le montant sont chiffrés on-chain.

Ledger conserve vos clés de dépense sur l'appareil matériel. Pour afficher un solde privé, Ledger Wallet Desktop a besoin d'une Unified Full Viewing Key (UFVK). L'appareil l'exporte une seule fois, et l'application de bureau l'utilise pour analyser la blockchain à la recherche de vos notes protégées. Une clé pour lecture seule permet de voir votre historique protégé mais pas de dépenser ; traitez-la donc comme une information confidentielle.

Les étapes ci-dessous couvrent l'installation de l'application Zcash, l'ajout d'un compte, l'activation du solde privé, la réception, la protection de ZEC transparents et l'envoi depuis le solde privé.

## Présentation

Le 23 septembre 2026, Ledger a ajouté la prise en charge native des ZEC protégés à Ledger Wallet Desktop. Un même compte Zcash détient désormais un solde transparent et un solde privé dans le pool Ironwood de Zcash. Vos clés privées restent sur votre Ledger, et chaque transaction est vérifiée et signée sur l'appareil.

**Uniquement sur ordinateur.** L'annonce de Ledger indique que les ZEC protégés sont « disponibles uniquement sur Ledger Wallet Desktop. La prise en charge mobile n'est pas disponible pour le moment, mais arrive bientôt. » L'application de bureau affiche le même avertissement. Vérifié le 15 octobre 2026.

## Préparation

- Un appareil Ledger compatible avec l'application Zcash : Nano S Plus, Nano X, Stax ou Flex. L'application Zcash actuelle n'est pas conçue pour le Nano S d'origine.
- Ledger Wallet Desktop 4.21 ou ultérieur, téléchargé uniquement depuis [ledger.com](https://www.ledger.com). Ce guide a utilisé la version 4.24.0.
- La dernière version de l'application Zcash sur votre Ledger (3.9.4 au moment de la rédaction de ce guide).
- Une petite quantité de ZEC pour faire des tests. Toutes les étapes ci-dessous ont été réalisées sur le réseau principal avec 0,001 ZEC. Chaque transaction entraîne de faibles frais de réseau (0,00015 ZEC lors de notre test).
- Votre phrase de récupération de 24 mots reste sur papier. Ne la saisissez jamais sur un ordinateur et ne la partagez jamais.

## Guide étape par étape (Ledger Wallet Desktop)

**1. Installer ou mettre à jour l'application Zcash**
- Ouvrez Ledger Wallet, connectez et déverrouillez votre Ledger, puis ouvrez **Mon Ledger**. Autorisez la connexion sur l'appareil.
- Recherchez **Zcash** dans le catalogue d'applications, puis cliquez sur **Installer**, ou sur **Mettre à jour** si elle est déjà installée.
- Ouvrez l'application Zcash sur votre Ledger. L'écran affiche « L'application Zcash est prête ». Faites défiler vers la droite jusqu'à **Infos sur l'application** pour vérifier la version.

**2. Ajouter un compte Zcash**
- Dans Ledger Wallet, choisissez **Ajouter un compte**. Dans **Sélectionner un actif**, recherchez Zcash et choisissez **Zcash (ZEC)**, et non un jeton encapsulé comme le jeton Binance-Peg Zcash.
- Lorsque l'application Zcash est ouverte sur votre Ledger, Ledger Wallet trouve votre compte. Cochez-le sous **Sélectionnez les comptes que vous souhaitez ajouter** et cliquez sur **Confirmer**.
- La page du compte affiche le **Solde disponible**, le **Solde transparent** et le **Solde privé**, ainsi qu'un bouton **Activer le mode protégé**.

![Compte Zcash dans Ledger Wallet Desktop montrant l'avis réservé à la version de bureau, les soldes transparent et privé, et le bouton « Enable shielded »](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Activer le solde privé**
- Cliquez sur **Activer le mode protégé**. La fenêtre **Activer le solde privé Zcash** comporte quatre étapes : Naissance, UFVK, Appareil et Confirmation.
- **Naissance :** pour un nouveau compte, conservez la hauteur de naissance à la date du jour. Ne cochez « Ce compte a déjà reçu des ZEC protégés » que si vous savez que c'est le cas, car une analyse à partir du bloc 0 peut prendre beaucoup de temps.
- **UFVK et Appareil :** Ledger Wallet demande à votre Ledger d'exporter votre Unified Full Viewing Key (UFVK). Lisez les écrans de l'appareil et approuvez. Si vous voyez « Connexion à l'appareil perdue », assurez-vous que l'application Zcash est ouverte, approuvez rapidement et cliquez sur **Réessayer**.
- Lorsque vous voyez **UFVK importée avec succès**, cliquez sur **Lancer la synchronisation**. Une fois la synchronisation terminée, le bouton devient **Mettre à jour le solde**, avec l'heure de la « Dernière synchronisation ».
- La clé pour lecture seule reste sur votre ordinateur. Elle permet de retrouver vos fonds protégés, mais pas de les dépenser.

![Fenêtre « Enable Zcash private balance » montrant l'UFVK importée avec succès et le bouton « Start sync »](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Recevoir des ZEC et vérifier les deux adresses sur votre Ledger**
- Cliquez sur **Recevoir** et choisissez votre compte Zcash. Ledger Wallet affiche une **Adresse pour Zcash 1** (transparente, commençant par t1) et une **Adresse privée pour Zcash 1** (commençant par u1). Les adresses précédentes restent valides.
- Votre Ledger affiche « Vérifier les adresses Zcash », puis l'**Adresse privée** sur deux pages, puis l'**Adresse publique**. Comparez chaque caractère avec l'écran avant de partager l'une ou l'autre adresse, puis confirmez sur l'appareil.
- Privilégiez l'adresse privée ; n'utilisez l'adresse transparente que si l'expéditeur ne prend rien d'autre en charge.

![Fenêtre Recevoir de Ledger Wallet montrant l'adresse transparente et l'adresse privée pour Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Écrans de l'appareil Ledger : « Verify Zcash addresses », « Private address » sur deux pages, puis « Public Address »](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Transférer des ZEC transparents vers votre solde privé**
- Cliquez sur **Envoyer**. Sous **Transfert vers soi-même**, choisissez **Envoyer vers le solde privé**.
- Saisissez un montant ou utilisez 25 %, 50 %, 75 % ou **Max**. Vérifiez les frais de réseau, puis cliquez sur **Vérifier**.
- Sur votre Ledger, faites défiler : « Vérifier la transaction d'envoi de ZEC », « Transfert d'une adresse publique vers une adresse privée », le montant, l'adresse de sortie sur deux pages, les frais et la hauteur d'expiration. Vérifiez que l'adresse de sortie correspond à votre adresse privée de l'étape 4, puis appuyez sur les deux boutons sur **Signer la transaction**.
- Ledger Wallet affiche **Transaction envoyée**. Dans les détails de la transaction, le type indiqué est **Privée (Ironwood)**.
- Ledger Wallet précise qu'un transfert vers soi-même relie vos fonds protégés à votre adresse publique. Recevoir directement sur votre adresse privée évite ce lien.

![Fenêtre d'envoi de ZEC dans Ledger Wallet avec l'option de transfert vers soi-même « Send to private balance »](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Écrans de vérification de l'appareil Ledger pour déplacer des ZEC du solde transparent vers l'adresse privée, se terminant par « Sign transaction » et « Transaction signed »](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Une fois la transaction confirmée, le solde transparent diminue et le solde privé augmente. Les nouveaux fonds protégés apparaissent comme « en cours de maturation » jusqu'à ce qu'ils aient suffisamment de confirmations pour être dépensés.

![Compte Zcash après protection : solde transparent réduit, solde privé augmenté et affiché comme en cours de maturation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Envoyer des ZEC depuis votre solde privé**
- Dès que le solde privé est dépensable, cliquez sur **Envoyer** et réglez **Transférer depuis** sur **Solde privé**.
- Collez l'adresse du destinataire et saisissez le montant. Vous pouvez ajouter un **Mémo (facultatif)** chiffré de 512 octets maximum, que seul le destinataire peut lire.
- Vérifiez le destinataire, le montant et les frais sur votre Ledger, puis appuyez sur les deux boutons sur **Signer la transaction**.

![Détails d'une transaction envoyée depuis le solde privé dans Ledger Wallet](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Bon à savoir

- Les ZEC protégés sur Ledger sont pour l'instant disponibles uniquement sur ordinateur (vérifié le 15 octobre 2026).
- Le solde privé de Ledger Wallet utilise le pool Ironwood.
- Ledger indique que vous pouvez partager un accès en lecture seule à votre historique de transactions avec un conseiller fiscal. Toute personne disposant de votre clé pour lecture seule peut voir votre historique protégé ; ne la partagez donc qu'en connaissance de cause.
- Les écrans de l'appareil présentés dans ce guide ont été capturés avec l'émulateur Speculos de Ledger (Nano S Plus) exécutant l'application Zcash 3.9.4, connecté à Ledger Wallet Desktop 4.24.0 sur le réseau principal Zcash. Un Ledger physique exécute la même application et affiche les mêmes écrans.

## Aide supplémentaire

- [Nouveauté dans Ledger Wallet : prise en charge native des Zcash protégés](https://www.ledger.com/blog-native-shielded-zcash-support) (annonce de Ledger)
- [Centre d'aide Ledger](https://support.ledger.com)
- [Page des portefeuilles ZecHub](/using-zcash/wallets)
- [Pools protégés](/using-zcash/shielded-pools) et [Clés pour lecture seule](/zcash-tech/viewing-keys) sur ZecHub
- Une autre option de portefeuille matériel : le [guide d'utilisation Keystone Zashi](/guides/keystone-zashi)
