<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Récupération des fonds d'un portefeuille Zcash

**Pourquoi conserver vos éléments de récupération ?**

Les phrases de récupération, les clés de dépense, les clés pour lecture seule et les fichiers de portefeuille ne sont pas interchangeables. Une phrase de récupération peut dériver les clés de nombreux portefeuilles, mais elle ne remplace pas toutes les anciennes clés ni tous les fichiers de portefeuille. Une clé pour lecture seule peut révéler l'activité protégée, mais ne peut pas autoriser une dépense.

La récupération suppose de disposer de la bonne autorité de dépense et d'une méthode actuellement prise en charge pour le pool qui détient les fonds. Gardez vos éléments de récupération privés et ne partagez jamais vos phrases de récupération, clés de dépense ou fichiers de portefeuille avec une personne en qui vous n'avez pas confiance.

# Sécurité et responsabilité

Il est essentiel que les utilisateurs comprennent les risques liés à la manipulation des clés privées et protègent ces clés contre tout accès non autorisé. La sécurité des fonds dépend de la responsabilité de l'utilisateur dans la protection de ses clés privées.

## Anciens fonds protégés : Sprout, Sapling et Orchard

Il peut être nécessaire de migrer d'anciens ZEC protégés dans le cadre d'une récupération. La méthode dépend du pool protégé qui détient actuellement les fonds.

> **NU7 a été activé sur le réseau principal le 6 novembre 2026 (UTC), au bloc 3 543 405.** Il interdit les transactions de version 4 ([ZIP 2003](https://zips.z.cash/zip-2003)), or les fonds Sprout ne peuvent être dépensés que dans des transactions de version 4 : la méthode de migration depuis l'ancien pool Sprout ne fonctionne donc plus.
>
> **Sprout est désormais gelé.** Les outils existants ne peuvent plus déplacer les fonds Sprout vers Sapling, vers des adresses transparentes ni vers aucune autre destination. ZIP 2003 ne détruit pas les fonds Sprout et laisse ouverte la possibilité d'une future méthode de récupération, mais aucune n'est prévue actuellement. Si vous détenez des clés Sprout, conservez-les en lieu sûr.

## La réponse en une page

| Vos fonds sont dans | Méthode de migration | Que faire |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Si vous disposez de `wallet.dat` ou d'une clé de dépense Sprout autonome, essayez d'abord la méthode de récupération actuelle avec Argos. Si Argos ne convient pas, utilisez la méthode historique avec environnement annexe décrite dans le guide pratique complet. Sprout doit d'abord arriver dans Sapling, puis être transféré vers Ironwood. Depuis l'activation de NU7 (bloc 3 543 405), les fonds Sprout ne peuvent plus être déplacés sur le réseau principal ; voir l'avertissement ci-dessus. |
| **Sapling** | **Sapling → Ironwood** | Aucun environnement de récupération Sprout n'est nécessaire. Utilisez un portefeuille actuel capable à la fois de restaurer ou de dépenser votre compte Sapling et de construire des transactions Ironwood. La seule prise en charge de Ironwood ne garantit pas la récupération des anciens comptes Sapling. |
| **Orchard** | **Orchard → Ironwood** | Orchard est en sortie uniquement. Utilisez la fonction de migration de Orchard vers Ironwood intégrée à un portefeuille actuel compatible. Voir [Fonds récupérés et le pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Arbre de décision en cinq questions

1. **S'agit-il de Sprout ?** Une phrase de récupération seule indique une méthode de récupération de l'ère Sapling/Orchard, plus récente, et non Sprout. Une adresse `zc...`, ou un portefeuille restauré affichant un solde Sprout, indique Sprout.
2. **De quels éléments de récupération disposez-vous ?** Recherchez `wallet.dat`, l'ancien ordinateur ou le répertoire de données, une sauvegarde `z_exportwallet` ou une clé de dépense Sprout exportée. Une adresse `zc...` seule ne suffit pas.
3. **Argos ou l'environnement annexe historique ?** Si vous disposez de `wallet.dat` ou d'une clé de dépense Sprout autonome et souhaitez simplement récupérer les fonds, essayez d'abord [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Utilisez la méthode historique avec environnement annexe décrite dans le guide pratique complet si Argos ne peut pas traiter vos éléments ou si vous souhaitez garder toute la chaîne de récupération sous votre propre contrôle.
4. **Disposez-vous déjà d'un répertoire de données zcashd synchronisé et non élagué ?** Cela ne concerne que la méthode historique avec environnement annexe. Ne copiez les données d'un nœud existant qu'après un arrêt propre ; sinon, le guide pratique présente les options d'instantané ou de synchronisation à partir de zéro.
5. **Où les fonds doivent-ils arriver ?** **Ironwood.** Sprout passe d'abord par Sapling, car il n'existe pas de transaction directe unique de Sprout vers Ironwood. Ne vous arrêtez pas à Sapling.

### Guide pratique complet de migration du pool ZEC

Pour la référence complète sur la migration, avec les méthodes de récupération détaillées, les commandes, les frais, la configuration matérielle requise, les considérations de confidentialité, le dépannage et les notes sur les sources, consultez le guide complet.

**Version 1.1 · Mise à jour du 18 septembre 2026**

[Lire le guide pratique complet de migration du pool ZEC dans ZecHub](/research/zec-pool-migration/view)

> **Avant de commencer :** déterminez d'abord **ce que vous récupérez et quels éléments de récupération vous possédez encore**. Une phrase de récupération de portefeuille actuel ou une clé de dépense non Sprout prise en charge peut ne nécessiter qu'une restauration normale. Des éléments plus anciens, comme une phrase de récupération Zecwallet Lite, un ancien `wallet.dat` ou une clé de dépense Sapling ou Sprout autonome, peuvent nécessiter une méthode de récupération dédiée.
>
> Si vous pensez que les fonds se trouvent dans **Sprout**, vérifiez que vous disposez toujours de l'autorité de dépense avant de consacrer du temps à la récupération. Une adresse `zc...` ou des éléments de lecture seule ne suffisent pas à déplacer les fonds.
>
> **YWallet ne prend plus en charge Zcash depuis Ironwood.** Utilisez **Zkool** pour les restaurations ordinaires hors Sprout à partir de phrases de récupération et de clés prises en charge. Utilisez **Argos** pour la récupération Zecwallet Lite, les anciens fichiers de portefeuille et les clés de dépense Sapling/Sprout autonomes. Pour Sprout, Argos est la première méthode à essayer ; le guide pratique complet décrit la solution de repli avec environnement annexe historique.
>
> Utilisez le tableau ci-dessous en fonction de **ce que vous possédez réellement**, et non de l'outil de récupération dont vous vous souvenez.

| Vous avez | Commencez ici |
| --- | --- |
| Une phrase de récupération ou une **clé de dépense non Sprout** prise en charge provenant d'un portefeuille actuel ou récemment maintenu, y compris d'anciens éléments YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| **Uniquement une clé pour lecture seule** | Zkool peut importer les clés pour lecture seule prises en charge pour un accès en lecture, mais une clé pour lecture seule ne peut pas autoriser une dépense de récupération. Retrouvez la phrase de récupération ou la clé de dépense correspondante. |
| Une phrase de récupération **Zecwallet Lite** de 24 mots | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Un `wallet.dat` Zecwallet Lite ou zcashd, ou une clé de dépense Sapling / Sprout autonome | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Au 18 septembre 2026, la version v1.3.0 est la version actuelle et recommandée ; utilisez la v1.2.0 ou une version ultérieure pour la récupération `wallet.dat` et Sprout. |
| Des éléments Sprout que Argos ne peut pas traiter, ou une récupération pour laquelle vous souhaitez garder les composants historiques sous votre propre contrôle | Utilisez la méthode historique avec environnement annexe décrite dans le [guide pratique complet](/research/zec-pool-migration/view). |
| Aucune phrase de récupération ni clé de dépense utilisable, mais un appareil verrouillé, un mot de passe oublié ou un disque défaillant | [Récupération professionnelle](#professional-recovery-when-you-do-not-have-the-seed). N'envoyez jamais une phrase de récupération ou une clé de dépense valide à une personne qui vous contacte spontanément. |

## Récupération des fonds avec Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) est le successeur maintenu de YWallet pour Zcash, créé par le même développeur. Il prend en charge les méthodes de récupération transparentes et protégées modernes, y compris les anciennes clés Sapling, mais **pas Sprout**.

Deux situations sont abordées ici :

1. **Restaurer un compte** à partir d'une phrase de récupération, d'une clé privée ou d'une clé pour lecture seule
2. **Balayer les fonds** d'un portefeuille qui n'a jamais pris en charge que des adresses transparentes

### 1) Restaurer un compte

1. Installez Zkool depuis la [page des versions](https://github.com/hhanh00/zkool2/releases) et ouvrez-le
2. Dans le **Gestionnaire de comptes** (la page principale), appuyez sur le bouton **+** pour accéder à l'écran **Nouveau compte**
3. Saisissez un **Nom de compte** pour identifier ce compte
4. Activez **Restaurer le compte ?**. Les champs de la clé et de la hauteur de naissance apparaissent alors
5. Collez votre clé dans **Clé (phrase de récupération, clé privée ou Viewing Key)**. Zkool accepte les phrases de récupération, les clés secrètes Sapling, les clés étendues transparentes et les clés pour lecture seule prises en charge. Une clé pour lecture seule ne permet que la consultation et ne peut pas autoriser une dépense.
6. Saisissez une **Hauteur de naissance** pour un ancien compte. Zkool n'analyse pas les blocs antérieurs à cette hauteur : choisissez donc une hauteur antérieure à la première activité du portefeuille en cas de doute. Une hauteur de naissance trop tardive peut faire croire que des transactions réelles ont disparu.

![Écran « New Account » de Zkool avec « Restore Account » et « Advanced Options » tous deux activés](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Enregistrez le compte, puis synchronisez-le

### Restaurer une phrase de récupération provenant d'un autre portefeuille

Si la phrase de récupération provient d'un portefeuille conforme à ZIP 316, notamment ZODL (anciennement Zashi), Zingo ou zcashd, activez les **Options avancées** et cochez **Utiliser la monnaie interne** avant d'enregistrer.

ZIP 316 utilise une adresse interne distincte pour la monnaie rendue. Restaurer l'un de ces comptes sans **Utiliser la monnaie interne** peut faire croire que la monnaie rendue a disparu alors que les fonds existent toujours.

Deux autres champs se trouvent dans les **Options avancées** :

- **Phrase secrète supplémentaire (facultative)**, uniquement si le portefeuille d'origine en utilisait une
- **Index de compte**, si le portefeuille d'origine contenait plusieurs comptes sur une même phrase de récupération. Les fonds peuvent se trouver sous un autre index

> **Ces deux champs n'apparaissent qu'une fois qu'une phrase de récupération valide a été saisie dans le champ Clé.** Si le champ est vide ou contient une clé privée ou une clé pour lecture seule, Zkool n'affiche que **Utiliser la monnaie interne** et **H/W Ledger**. Collez d'abord la phrase de récupération, puis ouvrez les Options avancées.

### 2) Balayer les fonds d'un portefeuille uniquement transparent

Si l'ancien portefeuille ou compte ne détenait que des **ZEC transparents**, restaurez d'abord le compte, retrouvez toutes les adresses transparentes utilisées, puis transférez les fonds vers une destination protégée actuelle que vous contrôlez. Ne supposez pas qu'une ancienne marque de portefeuille a toujours été uniquement transparente ; certains produits ont ajouté la prise en charge des adresses protégées dans des versions ultérieures.

1. Restaurez le compte en suivant les étapes ci-dessus
2. Ouvrez le compte et accédez à la page **Recevoir des fonds**
3. Appuyez sur la loupe dans la barre supérieure (**Trouver d'autres adresses transparentes**). Les portefeuilles qui font tourner les adresses, comme Ledger et Exodus, génèrent de nombreuses adresses transparentes à partir d'une seule phrase de récupération, et cette fonction retrouve celles qui détiennent des fonds
4. **Réinitialisez et resynchronisez ensuite le compte.** Les adresses nouvellement trouvées n'affichent leur solde qu'à l'analyse suivante : si vous sautez cette étape, le balayage semblera n'avoir rien trouvé
5. Accédez à la page **Envoyer**. À côté du solde, vous trouverez trois boutons à icône. Ils n'ont pas de libellé : survolez-les ou appuyez longuement pour afficher leur nom :
   - **Protéger une adresse** (bouclier en contour) transfère une adresse transparente à la fois
   - **Tout protéger** (bouclier plein) transfère en une seule fois tous les fonds de toutes les adresses transparentes
   - **Tout déprotéger** (cadenas ouvert) fait l'inverse, vers une adresse transparente

> **Protéger une adresse est le choix le plus confidentiel.** Protéger plusieurs adresses dans une seule transaction établit publiquement qu'elles appartiennent à la même personne. Zkool vous en avertit lui-même avant d'exécuter Tout protéger.

6. Vérifiez la transaction et envoyez-la

Tout déprotéger est utile pour effectuer un retrait vers un exchange qui n'accepte que les adresses transparentes. Les boutons de protection n'apparaissent que si le compte possède une adresse protégée, et Tout déprotéger uniquement s'il possède une adresse transparente.

## Récupération Zecwallet Lite et d'anciens portefeuilles avec Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) n'est plus maintenu et son dépôt est archivé. Sa dérivation de phrase de récupération diffère de celle des portefeuilles actuels : importer la même phrase dans un portefeuille moderne peut donc omettre les fonds détenus sur les adresses dérivées supplémentaires de Zecwallet Lite. [Argos](https://argos.sovright.com), de Sovright, est un espace de travail de récupération pour ordinateur conçu pour ce cas et pour d'autres récupérations d'anciens portefeuilles.

Argos lit les phrases de récupération et fichiers de portefeuille Zecwallet Lite, les `wallet.dat` zcashd, les clés de dépense étendues Sapling autonomes et les éléments de dépense Sprout. Pour Sprout, une phrase de récupération Zecwallet Lite seule ne suffit pas, car ces clés ont été générées séparément. Argos est un outil de récupération, pas un portefeuille du quotidien : examinez localement les éléments sources, lancez l'analyse, puis balayez les fonds vers un portefeuille maintenu que vous contrôlez.

Least Authority a [audité](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) l'outil. La récupération elle-même est gratuite. Un don facultatif à Sovright peut vous être proposé pendant le balayage.

> **Ne saisissez jamais une phrase de récupération sur un site web.** Le site Argos sert uniquement au téléchargement et au [guide d'utilisation](https://argos.sovright.com/guide.html). Les clés restent dans l'application de bureau signée. La validation s'effectue localement grâce à la somme de contrôle BIP-39. Le champ de la phrase de récupération est effacé dès le début de l'analyse. Toute personne qui vous écrit pour vous demander cette phrase « pour vous aider à récupérer vos fonds » tente de vous escroquer.

### Avant d'ouvrir Argos

1. Téléchargez l'application de bureau depuis le [site officiel de Argos](https://argos.sovright.com) ou la [page des versions GitHub](https://github.com/sovright/argos/releases). Vérifiez les sommes de contrôle ou les signatures lorsqu'elles sont publiées.
2. Utilisez la version actuelle de Argos. Au 18 septembre 2026, la **v1.3.0** est la version actuelle et recommandée. Utilisez **la v1.2.0 ou une version ultérieure pour la récupération `wallet.dat` et Sprout**. Les versions antérieures à 1.1.0 peuvent toujours analyser, mais construisent des balayages antérieurs à Ironwood que le réseau rejette ; mettez à jour et réessayez.
3. Travaillez sur une machine de confiance. Privilégiez le chiffrement complet du disque. Ne partagez pas votre écran lorsqu'une phrase de récupération, une phrase secrète ou une clé de dépense est visible.
4. Préparez une adresse unifiée de destination provenant d'un portefeuille maintenu que vous contrôlez, comme [ZODL](https://zodl.com/). Vérifiez l'adresse dans ce portefeuille avant de la coller dans Argos.

### Récupération par phrase de récupération

1. Ouvrez Argos et choisissez **J'ai ma phrase de récupération de 24 mots**. Une récupération par phrase de récupération ne nécessite pas de fichier de portefeuille.
2. Collez la phrase et cliquez sur **Valider la phrase de récupération**. Si elle est indiquée comme valide, continuez.
3. Saisissez une **hauteur de bloc de naissance**, ou l'estimation la plus proche de la date de création du portefeuille. Une hauteur plus ancienne est plus lente, mais plus sûre qu'une estimation trop tardive.
4. Dans les paramètres du serveur, utilisez le préréglage du serveur actuel ou saisissez des URL lightwalletd. Les URL séparées par des virgules sont essayées dans l'ordre. Exemples publics :

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Collez l'adresse unifiée de destination.
6. Cliquez sur **lancer l'analyse**. Cela peut prendre de quelques minutes à plusieurs jours selon la hauteur de naissance. Vous pouvez quitter puis rouvrir le même espace de travail ; l'analyse reprend.
7. Une fois l'analyse terminée, vérifiez les soldes, l'estimation des frais et la destination, puis cliquez sur **balayer**.

La diffusion d'un balayage est irréversible. Conservez le fichier de portefeuille d'origine jusqu'à ce que chaque pool concerné ait été balayé et que le portefeuille de destination affiche les fonds attendus. Une fois la récupération terminée, mettez hors service les anciens secrets plutôt que de continuer à les utiliser pour de nouvelles activités.

### Fichiers de portefeuille et clés autonomes

Sur l'écran d'accueil, **J'ai un fichier de portefeuille** couvre un fichier Zecwallet Lite, un `wallet.dat` zcashd ou des clés de dépense étendues Sapling autonomes. La récupération à partir d'une clé de dépense Sprout autonome est assurée par la méthode de récupération Sprout / l'interface en ligne de commande de Argos.

Argos lit les fichiers de portefeuille sans les modifier. Si le portefeuille est chiffré, saisissez la phrase secrète lorsqu'elle vous est demandée ; elle est utilisée en mémoire et n'est pas écrite sur le disque. Vérifiez le nombre de clés transparentes, Sapling et Sprout avant de lancer une analyse.

Les clés pour lecture seule ne sont pas acceptées pour un balayage, car elles ne peuvent pas autoriser de dépense.

### Notes sur Sprout

Une phrase de récupération Zecwallet Lite ne dérive pas les clés Sprout. Ces clés ont été générées séparément. Récupérez Sprout à partir d'un `wallet.dat` zcashd, ou à partir d'une clé de dépense autonome via l'interface en ligne de commande.

Si le fichier contient déjà des données de note dépensables et un témoin en cache, Argos peut proposer **Balayer les fonds Sprout** sans analyser la chaîne. Sinon, il peut effectuer une analyse complète des blocs, avec reprise possible, via le réseau P2P. Cette analyse est volumineuse et lente. Le point de contrôle qu'elle écrit permet de dépenser les fonds : protégez-le donc comme le portefeuille d'origine.

Les fonds Sprout ne peuvent arriver que dans Sapling. Une fois les fonds Sapling confirmés et dépensables, transférez-les vers **Ironwood** avec un portefeuille actuel qui prend en charge le compte Sapling récupéré. Ne vous arrêtez pas à Sapling.

## Fonds récupérés et le pool Ironwood

Depuis l'activation de la mise à niveau Ironwood (NU6.3) le 28 juillet 2026, le pool Orchard est en dépense uniquement. Aucune nouvelle valeur ne peut y entrer, et la valeur existante en sort par le sas comptable vers Ironwood.

Si vos fonds récupérés se trouvent dans Orchard, transférez-les vers Ironwood à l'aide de la **fonction de migration intégrée d'un portefeuille actuel**. Orchard est en sortie uniquement depuis NU6.3.

Zkool 6.30.0 est la version actuelle au 18 septembre 2026 et prend en charge Ironwood. Sa conception de la migration privilégie la confidentialité, mais cela ne revient pas à revendiquer la conformité à ZIP 318. D'autres portefeuilles actuels peuvent utiliser une migration échelonnée de type ZIP 318. Suivez l'écran de migration et les notes de version actuels du portefeuille installé plutôt que d'inventer un montant ou un calendrier manuel.

Une migration échelonnée peut utiliser plusieurs transactions : le total des frais peut donc être plus élevé que pour un transfert unique.

> **Les montants migrés sont publics.** Lorsque la valeur franchit le sas comptable, le montant et la hauteur de bloc sont visibles sur la chaîne, même si l'expéditeur et le destinataire restent protégés. Utilisez la politique de migration privée ou échelonnée intégrée au portefeuille lorsque la confidentialité compte, et utilisez une protection de la confidentialité au niveau du réseau, comme Tor ou une autre couche de confidentialité de confiance, le cas échéant. La confidentialité réseau peut masquer le lien avec votre adresse IP ; elle ne masque pas le montant public du franchissement.

## Récupération approfondie avec ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) est un projet de récupération Zingo Labs **en cours de développement**, actuellement axé sur les fichiers de portefeuille Zecwallet Lite et la migration de formats de portefeuille. Son README oriente actuellement les utilisateurs qui souhaitent récupérer des fonds vers l'option d'exportation **Zingolib**, en attendant que la prise en charge complète de ZeWIF soit développée.

Considérez-le comme un outil avancé, réservé aux cas particuliers, plutôt que comme la méthode de récupération par défaut. Pour les phrases de récupération Zecwallet Lite ordinaires, les fichiers de portefeuille, les `wallet.dat` zcashd et les clés de dépense autonomes prises en charge, essayez d'abord Argos. Vérifiez tout ce que ZExCavator récupère dans un portefeuille maintenu avant de vous y fier.

## Récupération professionnelle lorsque vous n'avez pas la phrase de récupération

Si la phrase de récupération ou la clé a disparu, une restauration autonome est impossible. Certaines personnes dans cette situation font appel à une société de récupération professionnelle en cas de mot de passe oublié, de panne matérielle ou de disque illisible.

Cette démarche est différente de la restauration d'une phrase de récupération que vous possédez encore. Ne confiez jamais une phrase de récupération valide à quelqu'un qui propose de la « récupérer » pour vous. Les arnaques imitant ce service sont courantes.

[Unciphered](https://unciphered.com) est une société qui effectue ce travail en interne et qui a été citée notamment par Wired. Il s'agit d'un service général de récupération de cryptomonnaies, pas d'un outil propre à Zcash, et ce travail est payant. ZecHub ne recommande aucune société de récupération. Si vous choisissez cette voie, vérifiez vous-même le domaine officiel et considérez que toute personne qui vous contacte la première par message privé est un escroc.

Si vous possédez encore une phrase de récupération ou une clé de dépense valide, commencez plutôt par une méthode de récupération autonome, comme Zkool ou Argos, sur votre propre machine.

## YWallet n'est plus maintenu

YWallet a longtemps été l'outil de récupération recommandé sur cette page, et de nombreux guides plus anciens y renvoient encore.

Son développeur indique désormais que YWallet ne prend plus en charge Zcash depuis la mise à jour Ironwood et oriente les utilisateurs de Zcash vers **Zkool**, son successeur maintenu. Conservez vos anciens éléments YWallet (phrase de récupération ou clé), mais ne commencez pas de nouvelle migration Zcash dans YWallet.

Si vous disposez déjà d'éléments de récupération Zcash provenant de YWallet, restaurez-les dans Zkool en suivant la méthode par phrase de récupération ou par clé prise en charge décrite ci-dessus.

## Pages associées

- [Portefeuilles](/using-zcash/wallets) - les portefeuilles maintenus et leur compatibilité avec Ironwood, y compris Argos
- [Ironwood](/zcash-tech/ironwood) - ce que la mise à niveau a changé et pourquoi les fonds migrent
- [Mémos](/using-zcash/memos) - le fonctionnement des mémos chiffrés
- [Viewing Keys](/zcash-tech/viewing-keys) - un accès en lecture seule sans pouvoir de dépense
- [Nœuds lightwallet](/zcash-tech/lightwallet-nodes) - les points d'accès lightwalletd publics que Argos peut utiliser
- [Guide d'utilisation de Argos](https://argos.sovright.com/guide.html) - le tutoriel officiel de Sovright
- [Naomi Brockwell sur les outils de récupération](https://x.com/naomibrockwell/status/2079146521405333526) - un tutoriel Argos et une remarque sur la récupération professionnelle
