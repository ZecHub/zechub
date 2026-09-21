<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Récupération de fonds d’un wallet Zcash

**Pourquoi conserver vos éléments de récupération ?**

Les seeds, clés de dépense, clés de visualisation et fichiers de wallet ne sont pas interchangeables. Une phrase de seed peut dériver des clés de wallet pour de nombreux wallets, mais elle ne remplace pas toutes les clés ou tous les fichiers de wallet anciens. Une clé de visualisation peut révéler l’activité blindée, mais ne peut pas autoriser une dépense.

La récupération dépend de la détention de l’autorité de dépense correcte et d’un moyen actuellement pris en charge pour le pool qui détient les fonds. Gardez vos éléments de récupération privés et ne partagez jamais vos seeds, clés de dépense ou fichiers de wallet avec une personne en qui vous n’avez pas confiance.

# Sécurité et responsabilité

Il est essentiel que les utilisateurs comprennent les risques liés à la gestion des clés privées et les protègent contre tout accès non autorisé. La sécurité des fonds dépend de la responsabilité de l’utilisateur à protéger ses clés privées.

## Fonds blindés anciens : Sprout, Sapling et Orchard

Les anciens ZEC blindés peuvent devoir être migrés dans le cadre de la récupération. Le parcours dépend du pool blindé qui détient actuellement les fonds.

> **NU7 est prévu pour le 5 novembre 2026.** Une fois activé, le parcours de migration actuel hors de l’ancien pool Sprout cessera de fonctionner.
>
> Si vous détenez encore des ZEC dans le pool Sprout, migrez-les avant la mise à niveau. Après l’activation, les outils existants ne pourront plus déplacer les fonds Sprout vers Sapling, des adresses transparentes ou toute autre destination.
>
> Si vous consultez cette page **après l’activation de NU7**, **Sprout est gelé** jusqu’à ce qu’une future méthode de récupération soit disponible, ce qui n’est actuellement pas prévu.

## La réponse en une page

| Vos fonds sont dans | Parcours de migration | Que faire |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Si vous avez `wallet.dat` ou une clé de dépense Sprout autonome, essayez d’abord le parcours de récupération actuel de Argos. Si Argos ne convient pas, utilisez le parcours sidecar ancien dans le guide de terrain complet. Sprout doit d’abord arriver dans Sapling, puis être déplacé vers Ironwood. Ce parcours est sensible au temps en raison de NU7. |
| **Sapling** | **Sapling → Ironwood** | Aucun environnement de récupération Sprout n’est nécessaire. Utilisez un wallet actuel qui peut à la fois récupérer ou dépenser votre compte Sapling spécifique et construire des transactions Ironwood. La prise en charge d’Ironwood seule ne prouve pas la prise en charge de la récupération d’anciens Sapling. |
| **Orchard** | **Orchard → Ironwood** | Orchard est uniquement destiné à la sortie. Utilisez le flux de migration intégré Orchard-vers-Ironwood d’un wallet actuel compatible. Consultez [Fonds récupérés et le pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Flux de décision en cinq questions

1. **Est-ce Sprout ?** Une phrase de seed seule indique un parcours de récupération de l’ère Sapling/Orchard plus récente, pas Sprout. Une adresse `zc...`, ou un wallet restauré signalant un solde Sprout, indique Sprout.
2. **Quels éléments de récupération avez-vous ?** Recherchez `wallet.dat`, l’ancien ordinateur ou répertoire de données, une sauvegarde `z_exportwallet`, ou une clé de dépense Sprout exportée. Une adresse `zc...` seule ne suffit pas.
3. **Argos ou le sidecar ancien ?** Si vous avez `wallet.dat` ou une clé de dépense Sprout autonome et souhaitez simplement sortir les fonds, essayez d’abord [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Utilisez le parcours sidecar ancien dans le guide de terrain complet si Argos ne peut pas gérer les éléments ou si vous souhaitez contrôler vous-même l’ensemble de la pile de récupération.
4. **Disposez-vous déjà d’un répertoire de données zcashd synchronisé et non élagué ?** Cela ne compte que pour le parcours sidecar ancien. Copiez les données de nœud existantes uniquement après un arrêt propre ; sinon, le guide de terrain couvre les options d’instantané et de reconstruction depuis zéro.
5. **Où les fonds arrivent-ils ?** **Ironwood.** Sprout passe d’abord par Sapling, car il n’existe pas de transaction directe unique de Sprout vers Ironwood. Ne vous arrêtez pas à Sapling.

### Guide de terrain complet de migration du pool ZEC

Pour la référence complète sur la migration, y compris les parcours de récupération détaillés, commandes, frais, exigences matérielles, considérations de confidentialité, dépannage et notes de sources, lisez le guide complet.

**Version 1.1 · Mise à jour le 18 septembre 2026**

[Lire le guide de terrain complet de migration du pool ZEC dans ZecHub](/research/zec-pool-migration/view)

> **Avant de commencer :** établissez d’abord **ce que vous récupérez et quels éléments de récupération vous possédez encore**. Un seed de wallet actuel ou une clé de dépense non-Sprout prise en charge peut seulement nécessiter une restauration normale. Des éléments plus anciens — comme un seed ZecWallet Lite, un ancien `wallet.dat` ou une clé de dépense Sapling ou Sprout autonome — peuvent nécessiter un parcours de récupération dédié.
>
> Si vous pensez que les fonds sont dans **Sprout**, confirmez que vous détenez toujours l’autorité de dépense avant de consacrer du temps à la récupération. Une adresse `zc...` ou des éléments de visualisation seuls ne suffisent pas à déplacer les fonds.
>
> **YWallet ne prend plus en charge Zcash après Ironwood.** Utilisez **Zkool** pour les restaurations ordinaires non-Sprout à partir de seeds et clés pris en charge. Utilisez **Argos** pour la récupération de ZecWallet Lite, les anciens fichiers de wallet et les clés de dépense Sapling/Sprout autonomes. Pour Sprout, Argos est le premier parcours à essayer ; le guide de terrain complet couvre la solution de repli sidecar ancienne.
>
> Utilisez le tableau ci-dessous selon **ce que vous avez réellement**, et non l’outil de récupération que vous vous souvenez avoir utilisé.

| Vous avez | Commencez ici |
| --- | --- |
| Une phrase de seed ou une **clé de dépense non-Sprout** prise en charge provenant d’un wallet actuel ou récemment maintenu, y compris d’anciens éléments YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| Une **clé de visualisation uniquement** | Zkool peut importer les clés de visualisation prises en charge pour un accès en lecture seule, mais une clé de visualisation ne peut pas autoriser une dépense de récupération. Trouvez le seed ou la clé de dépense correspondant. |
| Un seed **ZecWallet Lite** de 24 mots | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Un fichier ZecWallet Lite ou zcashd `wallet.dat`, ou une clé de dépense étendue Sapling / Sprout autonome | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Au 18 septembre 2026, la v1.3.0 est actuelle et privilégiée ; utilisez la v1.2.0 ou une version ultérieure pour la récupération `wallet.dat` et Sprout. |
| Des éléments Sprout que Argos ne peut pas gérer, ou une récupération dont vous souhaitez contrôler vous-même les composants anciens | Utilisez le parcours sidecar ancien dans le [guide de terrain complet](/research/zec-pool-migration/view). |
| Aucun seed ou clé de dépense fonctionnel, mais un appareil verrouillé, un mot de passe oublié ou un disque défaillant | [Récupération professionnelle](#professional-recovery-when-you-do-not-have-the-seed). N’envoyez jamais un seed ou une clé de dépense fonctionnel à une personne qui vous contacte sans sollicitation. |

## Récupération de fonds avec Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) est le successeur Zcash maintenu de YWallet, par le même développeur. Il prend en charge les parcours de récupération transparents et blindés modernes, y compris les anciennes clés Sapling, mais **pas Sprout**.

Deux situations sont couvertes ici :

1. **Restaurer un compte** à partir d’une phrase de seed, d’une clé privée ou d’une clé de visualisation
2. **Balayer des fonds** depuis un wallet qui n’a jamais pris en charge que des adresses transparentes

### 1) Restaurer un compte

1. Installez Zkool depuis la [page des versions](https://github.com/hhanh00/zkool2/releases) et ouvrez-le
2. Dans le **Gestionnaire de comptes** (la page principale), appuyez sur le bouton **+** pour accéder à l’écran **Nouveau compte**
3. Saisissez un **Nom de compte** pour identifier ce compte
4. Activez **Restaurer le compte ?**. Les champs de clé et de hauteur de naissance apparaissent alors
5. Collez votre clé dans **Clé (phrase de seed, clé privée ou Viewing Key)**. Zkool accepte les phrases de seed, les clés secrètes Sapling, les clés étendues transparentes et les clés de visualisation prises en charge. Une clé de visualisation est en lecture seule et ne peut pas autoriser une dépense.
6. Saisissez une **hauteur de naissance** pour un ancien compte. Zkool ne scanne pas les blocs antérieurs à cette hauteur ; choisissez donc une hauteur antérieure à la première activité du wallet en cas de doute. Une hauteur de naissance définie trop tard peut faire paraître des transactions réelles comme manquantes.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Enregistrez le compte, puis synchronisez-le

### Restaurer un seed provenant d’un wallet différent

Si le seed provient d’un wallet qui suit ZIP 316 — y compris ZODL (anciennement Zashi), Zingo ou zcashd — activez **Options avancées** et activez **Utiliser le changement interne** avant d’enregistrer.

ZIP 316 utilise une adresse interne/de change distincte. Restaurer l’un de ces comptes sans **Utiliser le changement interne** peut faire paraître les sorties de change comme manquantes, même si les fonds existent toujours.

Deux champs supplémentaires se trouvent dans **Options avancées** :

- **Phrase de passe supplémentaire (facultative)**, uniquement si le wallet d’origine en utilisait une
- **Index de compte**, si le wallet d’origine détenait plusieurs comptes sur un même seed. Les fonds peuvent se trouver sous un index différent

> **Ces deux options n’apparaissent qu’une fois qu’une phrase de seed valide se trouve dans le champ Clé.** Lorsque le champ est vide, ou contient une clé privée ou de visualisation, Zkool affiche uniquement **Utiliser le changement interne** et **H/W Ledger**. Collez d’abord le seed, puis ouvrez Options avancées.

### 2) Balayer des fonds depuis un wallet uniquement transparent

Si l’ancien wallet ou compte ne détenait que des **ZEC transparentes**, restaurez d’abord le compte, trouvez chaque adresse transparente utilisée, puis déplacez les fonds vers une destination blindée actuelle que vous contrôlez. Ne supposez pas qu’une ancienne marque de wallet a toujours été uniquement transparente ; certains produits ont ajouté la prise en charge blindée dans des versions ultérieures.

1. Restaurez le compte en suivant les étapes ci-dessus
2. Ouvrez le compte et accédez à la page **Recevoir des fonds**
3. Appuyez sur la loupe dans la barre supérieure (**Trouver d’autres adresses transparentes**). Les wallets qui font tourner les adresses, comme Ledger et Exodus, génèrent de nombreuses adresses transparentes à partir d’un seed, et cette fonction trouve celles qui détiennent des fonds
4. **Réinitialisez et synchronisez ensuite le compte.** Les adresses nouvellement trouvées ne récupèrent leurs soldes qu’au scan suivant ; ignorer cette étape donne l’impression que le balayage n’a rien trouvé
5. Accédez à la page **Envoyer**. Près du solde, vous trouverez trois boutons d’icône. Ils n’ont pas de libellé textuel ; survolez-les ou effectuez un appui long pour voir leur nom :
   - **Shield One** (bouclier détouré) déplace une adresse transparente à la fois
   - **Shield All** (bouclier plein) déplace tout depuis toutes les adresses transparentes à la fois
   - **Unshield All** (cadenas ouvert) fait l’inverse, vers une adresse transparente

> **Shield One est le choix le plus privé.** Blinder plusieurs adresses dans une seule transaction les relie publiquement comme appartenant à la même personne. Zkool avertit lui-même à ce sujet avant d’exécuter Shield All.

6. Vérifiez la transaction et envoyez-la

Unshield All est utile lors d’un retrait vers un exchange qui n’accepte que les adresses transparentes. Les boutons de blindage n’apparaissent que si le compte a une adresse blindée, et Unshield All seulement s’il en a une transparente.

## Récupération de ZecWallet Lite et de wallets anciens avec Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) n’est plus maintenu et son dépôt est archivé. Sa dérivation de seed diffère de la structure utilisée par les wallets actuels ; importer la même phrase dans un wallet moderne peut donc manquer les fonds détenus aux adresses dérivées supplémentaires de ZecWallet Lite. [Argos](https://argos.sovright.com), de Sovright, est un espace de travail de récupération sur ordinateur conçu pour ce cas et d’autres cas de récupération ancienne.

Argos lit les seeds et fichiers de wallet ZecWallet Lite, zcashd `wallet.dat`, les clés de dépense étendues Sapling autonomes et les éléments de dépense Sprout. Pour Sprout, un seed ZecWallet Lite seul ne suffit pas, car ces clés ont été générées séparément. Argos est un outil de récupération, pas un wallet quotidien : inspectez localement les éléments source, scannez, puis balayez vers un wallet maintenu que vous contrôlez.

Least Authority a [audité](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) l’outil. La récupération elle-même est gratuite. Un don facultatif à Sovright peut apparaître lors du balayage.

> **Ne saisissez jamais un seed sur un site web.** Le site Argos sert uniquement au téléchargement et au [guide utilisateur](https://argos.sovright.com/guide.html). Les clés restent dans l’application de bureau signée. La validation est locale par rapport à la somme de contrôle BIP-39. Le champ du seed s’efface au démarrage du scan. Toute personne qui vous envoie un message demandant ce seed « pour vous aider à récupérer vos fonds » tente de vous escroquer.

### Avant d’ouvrir Argos

1. Téléchargez l’application de bureau depuis le site [officiel Argos](https://argos.sovright.com) ou la [page des versions GitHub](https://github.com/sovright/argos/releases). Vérifiez les sommes de contrôle ou signatures lorsqu’elles sont publiées.
2. Utilisez la version actuelle de Argos. Au 18 septembre 2026, **v1.3.0** est actuelle et privilégiée. Utilisez **v1.2.0 ou une version ultérieure pour la récupération `wallet.dat` et Sprout**. Les versions antérieures à 1.1.0 peuvent toujours scanner, mais construisent des balayages pré-Ironwood que le réseau rejette ; mettez à jour et réessayez.
3. Travaillez sur une machine en laquelle vous avez confiance. Préférez le chiffrement complet du disque. Ne partagez pas votre écran lorsqu’un seed, une phrase de passe ou une clé de dépense est visible.
4. Préparez une destination Unified Address provenant d’un wallet maintenu que vous contrôlez, tel que [ZODL](https://zodl.app/). Confirmez l’adresse dans ce wallet avant de la coller dans Argos.

### Récupération par seed

1. Ouvrez Argos et choisissez **J’ai ma phrase de seed de 24 mots**. Une récupération par seed ne nécessite pas de fichier de wallet.
2. Collez la phrase et cliquez sur **Valider le seed**. S’il indique que le seed est valide, continuez.
3. Saisissez une **hauteur de bloc d’anniversaire**, ou l’estimation la plus proche de la date de création du wallet. Une hauteur plus ancienne est plus lente, mais plus sûre que de deviner une date trop récente.
4. Dans les contrôles de serveur, utilisez le préréglage du serveur actuel, ou saisissez des URL lightwalletd. Les URL séparées par des virgules sont essayées dans l’ordre. Exemples publics :

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Collez la destination Unified Address.
6. Cliquez sur **démarrer le scan**. Cela peut prendre des minutes ou des jours selon la hauteur d’anniversaire. Vous pouvez quitter et rouvrir le même espace de travail ; le scan reprend.
7. Lorsque le scan est terminé, vérifiez les soldes, l’estimation des frais et la destination, puis cliquez sur **balayer**.

La diffusion d’un balayage est irréversible. Conservez le fichier de wallet d’origine jusqu’à ce que chaque pool concerné ait été balayé et que le wallet de destination affiche les fonds attendus. Une fois la récupération terminée, retirez les anciens secrets au lieu de continuer à les utiliser pour de nouvelles activités.

### Fichiers de wallet et clés autonomes

Sur l’écran d’accueil, **J’ai un fichier de wallet** couvre un fichier ZecWallet Lite, un zcashd `wallet.dat`, ou des clés de dépense étendues Sapling autonomes. La récupération de clé de dépense Sprout autonome est gérée par le parcours/CLI de récupération Sprout de Argos.

Argos lit les fichiers de wallet sans les modifier. Si le wallet est chiffré, saisissez la phrase de passe lorsqu’elle est demandée ; elle est utilisée en mémoire et n’est pas écrite sur le disque. Vérifiez le nombre de clés transparentes, Sapling et Sprout avant de démarrer un scan.

Les clés de visualisation ne sont pas acceptées pour un balayage, car elles ne peuvent pas autoriser une dépense.

### Notes sur Sprout

Un seed ZecWallet Lite ne dérive pas les clés Sprout. Ces clés ont été générées séparément. Récupérez Sprout depuis un zcashd `wallet.dat`, ou depuis une clé de dépense autonome dans la CLI.

Si le fichier contient déjà des données de note dépensables et un témoin mis en cache, Argos peut proposer **Balayer les fonds Sprout** sans scan de la chaîne. Sinon, il peut exécuter un scan complet de blocs reprenable sur le réseau P2P. Ce scan est volumineux et lent. Le point de contrôle qu’il écrit permet de dépenser ; protégez-le donc comme le wallet d’origine.

La valeur Sprout ne peut arriver que dans Sapling. Une fois les fonds Sapling confirmés et dépensables, déplacez-les vers **Ironwood** avec un wallet actuel prenant en charge le compte Sapling récupéré. Ne vous arrêtez pas à Sapling.

## Fonds récupérés et pool Ironwood

Depuis l’activation de la mise à niveau Ironwood (NU6.3) le 28 juillet 2026, le pool Orchard est uniquement destiné à la dépense. Aucune nouvelle valeur ne peut y entrer, et la valeur existante sort par le tourniquet vers Ironwood.

Si vos fonds récupérés sont dans Orchard, déplacez-les vers Ironwood en utilisant le **flux de migration intégré d’un wallet actuel**. Orchard est uniquement destiné à la sortie après NU6.3.

Zkool 6.30.0 est actuel au 18 septembre 2026 et prend en charge Ironwood. Sa conception de migration est axée sur la confidentialité, mais cela ne revient pas à revendiquer la conformité à ZIP 318. D’autres wallets actuels peuvent utiliser une migration progressive de style ZIP 318. Suivez l’écran de migration actuel et les notes de version du wallet installé, plutôt que d’inventer un montant ou calendrier manuel.

Une migration progressive peut utiliser plusieurs transactions, donc les frais totaux peuvent être plus élevés qu’un transfert unique.

> **Les montants de migration sont publics.** Lorsque la valeur passe par le tourniquet, le montant et la hauteur de bloc sont visibles sur la chaîne, même si l’expéditeur et le destinataire restent blindés. Utilisez la politique de migration privée/progressive intégrée du wallet lorsque la confidentialité importe, ainsi qu’une protection de la confidentialité au niveau réseau telle que Tor ou une autre couche de confidentialité fiable, lorsque cela est approprié. La confidentialité réseau peut cacher votre lien IP ; elle ne cache pas le montant public du passage.

## Récupération approfondie avec ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) est un projet de récupération Zingo Labs **en cours de développement**, actuellement axé sur les fichiers de wallet ZecWallet Lite et la migration de formats de wallet. Son README dirige actuellement les utilisateurs qui récupèrent des fonds vers l’option d’exportation **Zingolib**, tandis qu’une prise en charge ZeWIF plus complète est encore en cours de développement.

Considérez-le comme un outil avancé ou destiné aux cas particuliers, plutôt que comme le parcours de récupération par défaut. Pour les seeds ZecWallet Lite ordinaires, fichiers de wallet, zcashd `wallet.dat` et clés de dépense autonomes prises en charge, essayez d’abord Argos. Vérifiez tout élément récupéré par ZExCavator dans un wallet maintenu avant de vous y fier.

## Récupération professionnelle lorsque vous n’avez pas le seed

Si le seed ou la clé est perdu, une restauration auto-hébergée ne peut pas commencer. Certaines personnes dans cette situation font appel à une entreprise de récupération professionnelle pour des mots de passe oubliés, des pannes matérielles ou des disques illisibles.

Ce parcours n’est pas la même chose que restaurer un seed que vous avez encore. Ne remettez pas un seed fonctionnel à quelqu’un qui propose de le « récupérer » pour vous. La version frauduleuse de ce service est courante.

[Unciphered](https://unciphered.com) est une entreprise qui réalise ce travail en interne et a été présentée dans des médias tels que [Wired](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). Il s’agit d’un service général de récupération de cryptomonnaies, et non d’un outil spécifique à Zcash, et il facture ce travail. ZecHub ne recommande aucune entreprise de récupération. Si vous suivez cette voie, confirmez vous-même le domaine officiel et considérez toute personne qui vous envoie d’abord un message privé comme un escroc.

Si vous avez encore un seed ou une clé de dépense fonctionnel, commencez plutôt par un parcours de récupération auto-hébergé tel que Zkool ou Argos sur votre propre machine.

## YWallet n’est plus maintenu

YWallet a longtemps été l’outil de récupération recommandé sur cette page, et de nombreux guides plus anciens y renvoient encore.

Son développeur indique désormais que YWallet ne prend plus en charge Zcash depuis la mise à jour Ironwood et dirige les utilisateurs de Zcash vers **Zkool**, son successeur maintenu. Conservez les anciens éléments seed/clé de YWallet, mais ne commencez pas une nouvelle migration Zcash dans YWallet.

Si vous avez déjà des éléments de récupération Zcash provenant de YWallet, restaurez-les dans Zkool en utilisant le parcours seed/clé pris en charge ci-dessus.

## Pages connexes

- [Wallets](/using-zcash/wallets) - quels wallets sont maintenus et leur préparation à Ironwood, y compris Argos
- [Ironwood](/zcash-tech/ironwood) - ce que la mise à niveau a changé et pourquoi les fonds migrent
- [Mémos](/using-zcash/memos) - comment fonctionnent les mémos chiffrés
- [Clés de visualisation](/zcash-tech/viewing-keys) - accès en lecture seule sans pouvoir de dépense
- [Nœuds lightwallet](/zcash-tech/lightwallet-nodes) - points de terminaison publics lightwalletd que Argos peut utiliser
- [Guide utilisateur de Argos](https://argos.sovright.com/guide.html) - guide officiel de Sovright
- [Naomi Brockwell sur les outils de récupération](https://x.com/naomibrockwell/status/2079146521405333526) - guide Argos et note sur la récupération professionnelle
