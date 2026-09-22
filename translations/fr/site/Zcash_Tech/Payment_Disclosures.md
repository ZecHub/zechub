<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Preuve de paiement protégée et divulgations de paiement

## En bref

- Un identifiant de transaction identifie une transaction, mais il ne révèle ni le destinataire protégé, ni le montant, ni le mémo.
- Une divulgation de paiement permet à l'expéditeur de prouver certains détails d'un paiement sans exposer le reste de l'historique de son wallet.
- Une clé de visualisation accorde un accès continu en lecture à une adresse ou à un compte. Utilisez-la pour des audits récurrents, et non pour un litige concernant un seul paiement.
- Une divulgation de paiement ne peut pas prouver la livraison de biens, identifier à elle seule une personne, annuler un paiement ou remplacer les contrôles de confirmation.
- [ZIP 311](https://zips.z.cash/zip-0311) reste à l'état de **Draft**. Son texte actuel laisse inachevés la prise en charge de Orchard, la prise en charge des entrées transparentes, l'encodage, le versionnage et les règles d'interface utilisateur.

## Pourquoi un identifiant de transaction ne suffit pas

N'importe qui peut examiner les détails publics d'un paiement transparent Zcash. Un explorateur de blocs peut afficher ses adresses, ses montants et son état de confirmation.

Un paiement protégé fonctionne différemment. La chaîne prouve que la transaction respecte les règles de Zcash, mais elle ne publie ni l'expéditeur protégé, ni le destinataire, ni le montant, ni le mémo. Partager l'identifiant de transaction peut montrer qu'une transaction a été minée, mais ne peut pas prouver à un marchand ou à un tiers quel paiement privé elle contenait.

Cela crée un problème pratique. Un client peut devoir résoudre un litige avec un marchand, une plateforme d'échange peut devoir prouver qu'elle a traité un retrait, ou un donateur peut vouloir prouver une contribution précise. Partager une clé de visualisation complète révélerait bien plus que nécessaire dans chacun de ces cas.

[ZIP 311 : Zcash Divulgations de paiement](https://zips.z.cash/zip-0311) propose une réponse plus ciblée : divulguer et authentifier des informations sélectionnées provenant d'une seule transaction.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Fonctionnement d'une divulgation de paiement

Le déroulement de base est le suivant :

1. Le vérificateur donne à l'expéditeur un défi ou une référence unique, lorsqu'une preuve interactive est appropriée.
2. L'expéditeur sélectionne la transaction et la ou les sorties protégées à divulguer.
3. Un logiciel de wallet compatible crée une divulgation de paiement liée à cette transaction et, éventuellement, au défi.
4. L'expéditeur remet la divulgation au vérificateur.
5. Le vérificateur obtient la véritable transaction depuis un nœud Zcash de confiance, vérifie qu'elle a été minée et vérifie la divulgation par rapport à celle-ci.
6. Un résultat valide confirme uniquement les affirmations contenues dans cette divulgation.

La conception de ZIP dans Sapling utilise une clé de chiffrement sortante pour récupérer chaque sortie sélectionnée. Cela peut révéler le destinataire, le montant et le mémo de la sortie. Elle exige également une preuve d'autorité de dépense pour au moins une entrée de transaction ; ainsi, une personne qui voit simplement la transaction ne peut pas créer une divulgation valide comme si elle l'avait envoyée.

Une divulgation de paiement Sapling n'est pas obligée de révéler une adresse d'expéditeur. L'autorité de dépense peut contrôler de nombreuses adresses diversifiées ; prouver le contrôle de la dépense n'identifie donc pas automatiquement une adresse. ZIP 311 inclut une preuve d'adresse facultative pour les cas où il est nécessaire de lier la preuve à une adresse d'expéditeur connue.

## Divulgation de paiement ou clé de visualisation ?

| Méthode | Meilleure utilisation | Ce qu'elle révèle | Accès continu ? | Liée cryptographiquement au paiement ? |
| --- | --- | --- | --- | --- |
| Identifiant de transaction | Vérifier qu'une transaction a été minée | Données publiques de la transaction et confirmations | Non | Oui, mais les détails du paiement protégé restent cachés |
| Capture d'écran ou reçu | Tenue de registres informelle | Tout ce que l'expéditeur choisit d'afficher | Non | Non ; l'image peut être modifiée |
| Divulgation de paiement | Prouver des détails sélectionnés d'un paiement | Sorties de transaction sélectionnées et toute preuve incluse de l'expéditeur ou du défi | Non, mais la preuve partagée peut être copiée | Oui |
| Incoming Viewing Key | Surveiller les paiements reçus par un compte | Activité entrante couverte par la clé | Oui | Elle déchiffre les paiements entrants correspondants |
| Full Viewing Key | Comptabilité ou audit d'un compte | Activité entrante et sortante, montants, mémos et soldes couverts par la clé | Oui | Elle déchiffre l'activité correspondante du compte |

Utilisez la divulgation la plus restreinte qui répond à la question. Un litige avec un marchand concernant un seul paiement ne justifie normalement pas l'accès à chaque paiement d'un compte. Un comptable qui doit examiner une période de déclaration complète peut plutôt avoir besoin d'une clé de visualisation.

Aucune de ces méthodes n'accorde l'autorisation de dépenser. Ne partagez jamais une phrase de récupération, une clé de dépense, une clé privée ou une sauvegarde de wallet comme preuve de paiement.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Que puis-je utiliser aujourd'hui ?

Aucun wallet actuel n'est identifié ici comme mettant en œuvre la création ou la vérification de divulgations de paiement ZIP 311. Le ZIP reste à l'état de brouillon et indique « TBD » comme implémentation de référence. Les outils maintenus suivants peuvent tout de même aider l'expéditeur, le destinataire ou un auditeur autorisé à examiner les enregistrements disponibles aujourd'hui :

| Application | Utile aujourd'hui pour | Limite importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Consulter des métadonnées détaillées de transactions, les montants, les entrées et sorties de pools, ainsi que les mémos ; importer des clés de visualisation Unified ou Sapling dans des comptes en lecture seule | N'annonce pas la création ou la vérification de divulgations ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Examiner l'historique des transactions protégées et les mémos ; importer une Full Viewing Key Unified en mode lecture seule | Un enregistrement de wallet ou un compte en lecture seule n'est pas une divulgation de paiement à portée sélective |
| [Zallet](https://zcash.github.io/zallet/) | Flux de travail d'opérateur utilisant `z_viewtransaction`, `z_exportviewingkey` et `z_importviewingkey` | Logiciel bêta ; ses RPC de clés de visualisation et de transactions couvrent des enregistrements plus larges ou locaux, et non des preuves ZIP 311 |

Utilisez d'abord le wallet qui a envoyé ou reçu le paiement. Vérifiez ses détails de transaction, son mémo, son identifiant de transaction et ses confirmations, puis demandez à l'autre partie de comparer ces détails avec ses propres enregistrements. N'installez pas un nouveau wallet et n'y saisissez pas une phrase de récupération uniquement pour produire des preuves. Si un auditeur a besoin d'une visibilité continue, envisagez un compte compatible en lecture seule et comprenez la portée de la clé de visualisation avant de la partager.

Ces applications sont des alternatives pratiques pour vérifier des enregistrements, et non une preuve qu'une divulgation de paiement standardisée est disponible. Une capture d'écran peut aider les personnes à comparer des enregistrements, mais elle est modifiable et ne constitue pas une preuve cryptographique.

## Cas d'utilisation des divulgations de paiement

### Litiges avec des marchands

Un client pourrait prouver qu'un montant précis a été envoyé à l'adresse protégée du marchand. La preuve n'établit pas que des biens ont été livrés, qu'un remboursement est dû ou que la personne qui la présente possède une identité juridique particulière. Ces questions dépendent toujours de l'enregistrement de la commande et de l'accord entre les parties.

### Retraits protégés

ZIP 311 cite les retraits protégés comme cas d'utilisation cible : une plateforme d'échange prouverait le destinataire et le montant sans publier ces détails sur la chaîne. Sa preuve d'entrée transparente reste inachevée ; il ne s'agit donc pas encore d'un flux de travail standardisé complet. Le client doit également vérifier indépendamment l'état de confirmation de la transaction.

### Dons

Un donateur ou une campagne pourrait prouver une contribution particulière tout en gardant privés les paiements sans rapport. Publier la divulgation rend ses détails sélectionnés publics pour toute personne qui en reçoit une copie ; un canal de vérification privé est donc plus sûr lorsqu'une preuve publique n'est pas nécessaire.

### Comptabilité

Utilisez une divulgation de paiement lorsqu'un comptable a besoin d'une preuve pour une seule transaction. Utilisez la clé de visualisation appropriée la plus restreinte lorsque le comptable a besoin d'un accès continu à de nombreuses transactions ou à une période de déclaration complète.

## Un flux de travail respectueux de la vie privée

ZIP 311 n'est pas encore une norme de wallet finalisée et largement déployable. Lorsque des outils compatibles pour l'expéditeur et le vérificateur seront disponibles, utilisez cette liste de contrôle :

1. **Confirmez d'abord la compatibilité.** Les deux outils doivent prendre en charge le même format de divulgation et le pool protégé utilisé par le paiement.
2. **Résolvez d'abord les problèmes ordinaires.** Vérifiez la synchronisation du wallet, l'identifiant de transaction, le nombre de confirmations, l'état d'expiration et les enregistrements du destinataire avant de révéler des détails privés.
3. **Demandez un défi.** En cas de litige, le vérificateur doit fournir un nouveau numéro de commande ou un défi aléatoire afin que la divulgation soit liée à cette demande.
4. **Sélectionnez uniquement la sortie nécessaire.** N'incluez pas de sorties sans rapport provenant de la même transaction.
5. **Prévisualisez chaque champ révélé.** Vérifiez le destinataire, le montant, le mémo, la preuve d'adresse de l'expéditeur et le défi avant l'exportation.
6. **Partagez par un canal privé.** Une divulgation n'est pas une clé de dépense secrète, mais toute personne qui la reçoit peut conserver ou redistribuer les informations qu'elle révèle.
7. **Vérifiez par rapport à la chaîne.** Le vérificateur doit récupérer la transaction exacte depuis un nœud de confiance, confirmer qu'elle se trouve sur le réseau et dans le bloc prévus, puis valider la divulgation.
8. **Conservez le résultat, pas des secrets supplémentaires.** Ne gardez que ce que le processus de litige, de retrait, de don ou de comptabilité exige.

Si le wallet ne peut pas générer de divulgation, ne remplacez pas celle-ci par une clé de visualisation complète sans comprendre sa portée plus large et permanente. Demandez si le destinataire peut confirmer le paiement depuis ses propres enregistrements de wallet ou accepter à la place un enregistrement moins sensible.

## Ce qu'une divulgation valide ne prouve pas

Une vérification réussie ne prouve pas :

- Que la transaction possède suffisamment de confirmations pour la politique de risque du vérificateur
- Qu'une réorganisation de la chaîne ne peut pas supprimer une transaction récente
- Que des biens ou services ont été livrés
- Qu'un remboursement ou une rétrofacturation est requis
- Que l'expéditeur contrôle une adresse particulière, sauf si une preuve d'adresse appropriée est incluse
- Que la personne qui présente la divulgation possède l'identité réelle qu'elle revendique
- Que les sorties non divulguées, les autres transactions ou le solde du wallet ont une valeur particulière
- Que la divulgation reste privée après son partage

Le vérificateur doit contrôler séparément l'inclusion dans la chaîne et l'état de confirmation. La procédure de vérification de ZIP 311 suppose que l'appelant a déjà obtenu la transaction minée et la hauteur de son bloc.

## Limites actuelles

Considérez ZIP 311 comme une norme proposée, et non comme la promesse qu'un wallet actuel dispose d'un bouton **Prove payment** fonctionnel.

Le brouillon spécifie actuellement les dépenses et sorties Sapling, mais contient toujours des éléments inachevés pour Orchard, les entrées transparentes, l'encodage de la divulgation, le versionnage et la manière dont les wallets doivent afficher les différents niveaux de validité. Son implémentation de référence est également indiquée comme « TBD ». Tel qu'il est rédigé, il ne définit pas de divulgations de paiement pour les paiements Orchard ou Ironwood.

L'expéditeur peut également ne pas pouvoir divulguer une sortie si la transaction a été délibérément créée sans clé de visualisation sortante pour cette sortie. ZIP 311 préserve ce choix de confidentialité au lieu de créer une nouvelle voie de récupération.

Une documentation plus ancienne décrit les commandes expérimentales `z_getpaymentdisclosure` et `z_validatepaymentdisclosure` dans `zcashd`. Ces commandes ne prenaient en charge que les **sorties Sprout JoinSplit**, et non la conception Sapling dans ZIP 311, et ont été dépréciées. `zcashd` a atteint son arrêt final de fin de support en juillet 2026. N'utilisez pas ce guide historique comme instructions pour des fonds actuels.

Ces lacunes ne rendent pas l'idée inutile. Elles expliquent pourquoi un guide prudent doit distinguer le modèle de confidentialité et les cas d'utilisation des logiciels prêts pour les utilisateurs ordinaires.

## FAQ

### Puis-je prouver un paiement protégé avec seulement l'identifiant de transaction ?

Non. L'identifiant peut identifier la transaction et son état de confirmation, mais le destinataire protégé, le montant et le mémo ne sont pas publics.

### Une divulgation de paiement est-elle la même chose qu'une clé de visualisation ?

Non. Une divulgation est limitée à certains détails d'une transaction. Une clé de visualisation peut révéler au fil du temps l'activité correspondante d'une adresse ou d'un compte.

### Le destinataire peut-il créer la preuve de l'expéditeur ?

Pas selon la conception de ZIP 311. Une divulgation valide doit prouver l'autorité de dépense pour au moins une entrée. Le destinataire peut confirmer un paiement à l'aide de ses propres enregistrements de wallet, mais il s'agit d'une affirmation différente.

### Puis-je révoquer une divulgation après l'avoir partagée ?

Non. Elle n'accorde pas d'accès futur au compte comme une clé de visualisation, mais les données révélées et la preuve peuvent être copiées. Partagez-la avec autant de précaution que tout document financier privé.

### La vérification déplace-t-elle ou verrouille-t-elle des ZEC ?

Non. Créer ou vérifier une divulgation ne dépense, ne rembourse, ne gèle ni n'annule des fonds.

### Que dois-je utiliser aujourd'hui si mon wallet n'a pas de fonction de divulgation ?

Commencez par les enregistrements du wallet du destinataire, l'identifiant de transaction et l'état de confirmation, une référence de facture dans le mémo chiffré, ou un autre reçu accepté mutuellement. Utilisez une clé de visualisation uniquement lorsque sa portée plus étendue est réellement nécessaire et comprise.

## Ressources

- [ZIP 311 : Zcash Divulgations de paiement](https://zips.z.cash/zip-0311) - la conception à l'état de brouillon, les exigences, le processus de vérification et les considérations relatives à la confidentialité
- [ZIP 310 : Propriétés de sécurité des clés de visualisation Sapling](https://zips.z.cash/zip-0310) - ce que révèlent les clés de visualisation et les garanties qu'elles offrent
- [ZIP 304 : Sapling Signatures d'adresse](https://zips.z.cash/zip-0304) - le mécanisme facultatif de preuve d'adresse référencé par ZIP 311
- [Zcash spécification du protocole](https://zips.z.cash/protocol/protocol.pdf) - chiffrement des notes Sapling, clés de visualisation sortantes et autorisation de dépense
- [Document archivé sur les divulgations de paiement zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implémentation historique réservée à Sprout, et non guide actuel
- [zcashd fonctionnalités dépréciées](https://zcash.github.io/zcash/user/deprecation.html) - état des anciennes commandes expérimentales de divulgation

## Pages associées

- [Transactions](/using-zcash/transactions) - paiements protégés, confirmations et dépannage des transactions
- [Clés de visualisation](/zcash-tech/viewing-keys) - accès continu en lecture seule et options d'exportation actuelles
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) - champs de transaction publics et privés
- [Tenir des registres avec des ZEC protégés](/zcash-use-cases/keeping-records-with-shielded-zec) - comptabilité sans publier l'historique du wallet
