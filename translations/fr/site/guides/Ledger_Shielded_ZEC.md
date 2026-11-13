<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guide de l'utilisateur Ledger Shielded ZEC

> Détenez, recevez et envoyez des ZEC privés (shielded) avec votre portefeuille matériel Ledger dans Ledger Wallet Desktop.

## En bref

* Depuis le 23 septembre 2026, Ledger Wallet Desktop prend en charge les ZEC protégés. Un compte Zcash possède un solde transparent et un solde privé dans le pool Ironwood.
* Uniquement sur ordinateur pour le moment. La prise en charge mobile est annoncée comme « bientôt disponible ».
* Vous avez besoin d'un Nano S Plus, Nano X, Stax ou Flex (et non du Nano S d'origine), de Ledger Wallet Desktop 4.21+ et de la dernière application Zcash.
* Cliquez une fois sur **Activer le mode protégé** : votre Ledger exporte une clé de visualisation afin que l'application de bureau puisse trouver vos fonds privés. Les clés de dépense ne quittent jamais l'appareil.
* Recevez sur l'adresse privée (u1...) lorsque vous le pouvez. Déplacer des ZEC de votre solde transparent vers le solde privé fonctionne, mais relie les deux.
* Chaque envoi est vérifié et signé sur l'écran Ledger. Vérifiez les adresses sur cet écran, caractère par caractère.

## Explication fondamentale

Zcash possède deux types de solde. Les fonds transparents ZEC (adresses t1) fonctionnent comme Bitcoin : les montants et les adresses sont publics. Les fonds protégés ZEC se trouvent dans un pool protégé, où l'expéditeur, le destinataire et le montant sont chiffrés on-chain.

Ledger conserve vos clés de dépense sur le dispositif matériel. Pour afficher un solde privé, Ledger Wallet Desktop a besoin d’une Full Viewing Key unifiée (UFVK). L’appareil l’exporte une seule fois, et l’application de bureau l’utilise pour analyser la blockchain à la recherche de vos notes protégées. Une clé de visualisation peut consulter votre historique protégé, mais ne permet pas de dépenser des fonds ; considérez-la donc comme une information privée.

Les étapes ci-dessous couvrent l’installation de l’application Zcash, l’ajout d’un compte, l’activation du solde privé, la réception, la mise à l’abri des ZEC transparents et l’envoi depuis le solde privé.

## Aperçu

Le 23 septembre 2026, Ledger a ajouté la prise en charge native de ZEC shielded à Ledger Wallet Desktop. Un compte Zcash contient désormais un solde transparent et un solde privé dans le pool Ironwood de Zcash. Vos clés privées restent sur votre Ledger, et chaque transaction est examinée et signée sur l'appareil.

**Ordinateur uniquement.** L'annonce de Ledger indique que ZEC shielded est « disponible sur Ledger Wallet Desktop uniquement. La prise en charge mobile n'est pas disponible pour le moment, mais arrivera bientôt. » L'application de bureau affiche le même avis. Vérifié le 15 octobre 2026.

## Préparation

- Un appareil Ledger qui exécute l'application Zcash : Nano S Plus, Nano X, Stax ou Flex. L'application Zcash actuelle n'est pas conçue pour le Nano S d'origine.
- Ledger Wallet Desktop 4.21 ou version ultérieure, téléchargé uniquement depuis [ledger.com](https://www.ledger.com). Ce guide utilise la version 4.24.0.
- La dernière application Zcash sur votre Ledger (3.9.4 au moment de la rédaction de ce guide).
- Une petite quantité de ZEC pour effectuer un test. Toutes les étapes ci-dessous ont été réalisées sur le mainnet avec 0,001 ZEC. Chaque transaction entraîne de faibles frais de réseau (0,00015 ZEC lors de notre test).
- Votre phrase de récupération de 24 mots reste sur papier. Ne la saisissez jamais sur un ordinateur et ne la partagez jamais.

## Guide étape par étape (Ledger Wallet Desktop)

**1. Installer ou mettre à jour l'application Zcash**
- Ouvrez Ledger Wallet, connectez et déverrouillez votre Ledger, puis ouvrez **Mes Ledger**. Autorisez la connexion sur l'appareil.
- Recherchez **Zcash** dans le catalogue d'applications, puis cliquez sur **Installer**, ou sur **Mettre à jour** si elle est déjà installée.
- Ouvrez l'application Zcash sur votre Ledger. L'écran affiche « L'application Zcash est prête ». Faites défiler vers la droite jusqu'à **Informations sur l'application** pour vérifier la version.

**2. Ajouter un compte Zcash**
- Dans Ledger Wallet, choisissez **Ajouter un compte**. Dans **Sélectionner un actif**, recherchez Zcash et choisissez **Zcash (ZEC)**, et non un jeton encapsulé tel que Binance-Peg Zcash Token.
- Avec l'application Zcash ouverte sur votre Ledger, Ledger Wallet trouve votre compte. Cochez-le sous **Sélectionnez les comptes que vous souhaitez ajouter**, puis cliquez sur **Confirmer**.
- La page du compte affiche **Solde disponible**, **Solde transparent** et **Solde privé**, ainsi qu'un bouton **Activer le mode shielded**.

![Compte Zcash dans Ledger Wallet Desktop affichant l’avis réservé au bureau, les soldes transparent et privé, ainsi que le bouton « Enable shielded »](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Activer le solde privé**
- Cliquez sur **Activer le mode shielded**. La fenêtre **Activer le solde privé Zcash** comporte quatre étapes : Birthday, UFVK, Appareil et Confirmation.
- **Birthday :** pour un nouveau compte, conservez la hauteur birthday à la date d'aujourd'hui. Cochez « Ce compte a reçu des ZEC shielded dans le passé » uniquement si vous savez que c'est le cas, car l'analyse à partir du bloc 0 peut prendre beaucoup de temps.
- **UFVK et Appareil :** Ledger Wallet demande à votre Ledger d'exporter votre Unified Full Viewing Key (UFVK). Lisez les écrans sur l'appareil et approuvez. Si vous voyez « Connexion à l'appareil perdue », assurez-vous que l'application Zcash est ouverte, approuvez rapidement et cliquez sur **Réessayer**.
- Lorsque vous voyez **UFVK importé avec succès**, cliquez sur **Démarrer la synchronisation**. Une fois la synchronisation terminée, le bouton devient **Mettre à jour le solde** et affiche une heure de « Dernière synchronisation ».
- La clé de visualisation reste sur votre ordinateur. Elle peut trouver vos fonds shielded, mais ne peut pas les dépenser.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Recevoir des ZEC et vérifier les deux adresses sur votre Ledger**
- Cliquez sur **Recevoir** et choisissez votre compte Zcash. Ledger Wallet affiche une **Adresse pour Zcash 1** (transparente, commençant par t1) et une **Adresse privée pour Zcash 1** (commençant par u1). Les anciennes adresses restent valides.
- Votre Ledger affiche « Vérifier les adresses Zcash », l'**Adresse privée** sur deux pages, puis l'**Adresse publique**. Comparez chaque caractère avec l'écran avant de partager l'une ou l'autre adresse, puis confirmez sur l'appareil.
- Préférez l'adresse privée ; n'utilisez l'adresse transparente que si l'expéditeur ne prend en charge aucune autre option.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Déplacer des ZEC transparents vers votre solde privé**
- Cliquez sur **Envoyer**. Sous **Transfert vers soi-même**, choisissez **Envoyer vers le solde privé**.
- Saisissez un montant ou utilisez 25 %, 50 %, 75 % ou **Max**. Vérifiez les frais de réseau, puis cliquez sur **Vérifier**.
- Sur votre Ledger, parcourez les étapes : « Vérifier la transaction pour envoyer ZEC », « Transfert de l'adresse publique vers l'adresse privée », le montant, l'adresse de sortie sur deux pages, les frais et la hauteur d'expiration. Vérifiez que l'adresse de sortie correspond à votre adresse privée de l'étape 4, puis appuyez sur les deux boutons sur **Signer la transaction**.
- Ledger Wallet affiche **Transaction envoyée**. Dans les détails de la transaction, le type indique **Privé (Ironwood)**.
- Ledger Wallet indique qu'un transfert vers soi-même lie vos fonds shielded à votre adresse publique. Recevoir directement sur votre adresse privée permet de les conserver non liés.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Une fois la transaction confirmée, le solde transparent diminue et le solde privé augmente. Les nouveaux fonds shielded s'affichent comme « en maturation » jusqu'à ce qu'ils aient suffisamment de confirmations pour être dépensés.

![Compte Zcash après protection : solde transparent réduit, solde privé augmenté et affiché comme en maturation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Envoyer des ZEC depuis votre solde privé**
- Une fois le solde privé disponible à la dépense, cliquez sur **Envoyer** et définissez **Transférer depuis** sur **Solde privé**.
- Collez l'adresse du destinataire et saisissez le montant. Vous pouvez ajouter un **Mémo (facultatif)** chiffré de jusqu'à 512 octets, que seul le destinataire peut lire.
- Vérifiez le destinataire, le montant et les frais sur votre Ledger, puis appuyez sur les deux boutons sur **Signer la transaction**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Bon à savoir

- ZEC shielded sur Ledger est uniquement disponible sur ordinateur pour le moment (vérifié le 15 octobre 2026).
- Le solde privé de Ledger Wallet utilise le pool Ironwood.
- Ledger indique que vous pouvez partager un accès en lecture seule à votre historique de transactions avec un conseiller fiscal. Toute personne disposant de votre clé de visualisation peut voir votre historique shielded ; ne la partagez donc que volontairement.
- Les écrans de l'appareil figurant dans ce guide ont été capturés avec l'émulateur Speculos de Ledger (Nano S Plus), exécutant l'application Zcash 3.9.4, connecté à Ledger Wallet Desktop 4.24.0 sur le mainnet Zcash. Un Ledger physique exécute la même application et affiche les mêmes écrans.

## Aide supplémentaire

- [Nouveau dans Ledger Wallet : prise en charge native de Zcash Shielded](https://www.ledger.com/blog-native-shielded-zcash-support) (annonce de Ledger)
- [Centre d'aide Ledger](https://support.ledger.com)
- [Page Wallets de ZecHub](/using-zcash/wallets)
- [Pools Shielded](/using-zcash/shielded-pools) et [clés de visualisation](/zcash-tech/viewing-keys) sur ZecHub
- Une autre option de hardware wallet : le [Keystone guide de l'utilisateur Zashi](/guides/keystone-zashi)
