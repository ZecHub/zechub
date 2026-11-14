<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Preuve de paiement protégé et divulgations de paiement

## En bref

- Un identifiant de transaction identifie une transaction, mais il ne révèle ni le destinataire protégé, ni le montant, ni le mémo.
- Une divulgation de paiement est conçue pour permettre à l'expéditeur de prouver certains détails d'un paiement sans exposer le reste de l'historique de son portefeuille.
- Une clé pour lecture seule accorde un accès permanent en lecture à une adresse ou à un compte. Utilisez-la pour des audits continus, pas pour un litige portant sur un seul paiement.
- Une divulgation de paiement ne peut pas prouver la livraison de biens, identifier une personne à elle seule, annuler un paiement ni remplacer la vérification des confirmations.
- [ZIP 311](https://zips.z.cash/zip-0311) est encore à l'état de **brouillon**. Son texte actuel laisse inachevées la prise en charge d'Orchard, la prise en charge des entrées transparentes, l'encodage, la gestion des versions et les règles d'interface utilisateur.

## Pourquoi un identifiant de transaction ne suffit pas

N'importe qui peut consulter les détails publics d'un paiement Zcash transparent. Un explorateur de blocs peut afficher ses adresses, ses montants et son état de confirmation.

Un paiement protégé fonctionne différemment. La chaîne prouve que la transaction a respecté les règles de Zcash, mais elle ne publie ni l'expéditeur protégé, ni le destinataire, ni le montant, ni le mémo. Partager l'identifiant de transaction peut montrer qu'une transaction a été minée, mais ne permet pas de prouver à un commerçant ou à un tiers quel paiement privé elle contenait.

Cela pose un problème concret. Un client peut avoir besoin de résoudre un litige avec un commerçant, un exchange peut devoir prouver qu'il a traité un retrait, ou un donateur peut vouloir prouver une contribution. Partager une clé pour lecture seule complète révélerait bien plus que ce qu'exige chacun de ces cas.

[ZIP 311 : Zcash Payment Disclosures](https://zips.z.cash/zip-0311) propose une réponse plus ciblée : divulguer et authentifier certaines informations d'une seule transaction.

![Un identifiant de transaction prouve qu'une transaction existe, mais ne révèle pas les détails d'un paiement protégé. Une divulgation de paiement ZIP 311 permettrait à un vérificateur d'authentifier, par rapport à la transaction minée, uniquement le destinataire, le montant, le mémo et, en option, les informations sur l'expéditeur sélectionnés.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Fonctionnement d'une divulgation de paiement

Le déroulement de base est le suivant :

1. Le vérificateur remet à l'expéditeur un défi ou une référence unique, lorsqu'une preuve interactive est appropriée.
2. L'expéditeur sélectionne la transaction et la ou les sorties protégées à divulguer.
3. Un logiciel de portefeuille compatible crée une divulgation de paiement liée à cette transaction et, éventuellement, au défi.
4. L'expéditeur transmet la divulgation au vérificateur.
5. Le vérificateur récupère la véritable transaction auprès d'un nœud Zcash de confiance, vérifie qu'elle a été minée et contrôle la divulgation par rapport à celle-ci.
6. Un résultat valide ne confirme que les affirmations contenues dans cette divulgation.

La conception Sapling du ZIP utilise une clé de chiffrement sortante pour récupérer chaque sortie sélectionnée. Cela peut révéler le destinataire, le montant et le mémo de la sortie. Elle exige également une preuve d'autorité de dépense pour au moins une entrée de la transaction, de sorte qu'une personne qui se contente de voir la transaction ne puisse pas créer une divulgation valide en se faisant passer pour l'expéditeur.

Une divulgation de paiement Sapling n'a pas besoin de révéler une adresse d'expéditeur. Une autorité de dépense peut contrôler de nombreuses adresses diversifiées : prouver le contrôle de la dépense n'identifie donc pas automatiquement une adresse. ZIP 311 prévoit une preuve d'adresse facultative pour les cas où il est nécessaire de lier la preuve à une adresse d'expéditeur connue.

## Divulgation de paiement ou clé pour lecture seule ?

| Méthode | Meilleur usage | Ce qu'elle révèle | Accès permanent ? | Liée cryptographiquement au paiement ? |
| --- | --- | --- | --- | --- |
| Transaction ID | Vérifier qu'une transaction a été minée | Données publiques de la transaction et confirmations | Non | Oui, mais les détails du paiement protégé restent cachés |
| Screenshot or receipt | Tenue de registres informelle | Tout ce que l'expéditeur choisit d'afficher | Non | Non ; l'image peut être modifiée |
| Payment disclosure | Prouver certains détails d'un paiement | Les sorties de transaction sélectionnées et toute preuve d'expéditeur ou de défi incluse | Non, mais la preuve partagée peut être copiée | Oui |
| Incoming Viewing Key | Suivre les paiements reçus par un compte | L'activité entrante couverte par la clé | Oui | Elle déchiffre les paiements entrants correspondants |
| Full Viewing Key | Comptabilité ou audit d'un compte | L'activité entrante et sortante, les montants, les mémos et les soldes couverts par la clé | Oui | Elle déchiffre l'activité correspondante du compte |

Utilisez la divulgation la plus restreinte qui répond à la question. Un litige commercial portant sur un seul paiement ne justifie normalement pas l'accès à tous les paiements d'un compte. Un comptable qui doit examiner une période de déclaration complète peut en revanche avoir besoin d'une clé pour lecture seule.

Aucune de ces méthodes n'accorde l'autorisation de dépenser. Ne partagez jamais une phrase de récupération, une clé de dépense, une clé privée ou une sauvegarde de portefeuille comme preuve de paiement.

![Un relevé de transaction est disponible dès aujourd'hui, mais n'apporte aucune nouvelle preuve à un tiers. Une divulgation de paiement prouverait certains détails d'un paiement. Une clé pour lecture seule offre une visibilité plus large et continue.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## Que puis-je utiliser aujourd'hui ?

Aucun portefeuille actuel n'est identifié ici comme mettant en œuvre la création ou la vérification de divulgations de paiement ZIP 311. Le ZIP reste un brouillon et indique « TBD » pour son implémentation de référence. Les outils maintenus suivants peuvent néanmoins aider l'expéditeur, le destinataire ou un auditeur autorisé à examiner les registres disponibles aujourd'hui :

| Application | Utile aujourd'hui pour | Limite importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Consulter les métadonnées détaillées des transactions, les montants, les entrées et sorties des pools et les mémos ; importer des clés pour lecture seule unifiées ou Sapling dans des comptes en lecture seule | N'annonce pas la création ni la vérification de divulgations ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Examiner l'historique des transactions protégées et les mémos ; importer une Full Viewing Key unifiée en mode lecture seule | Un registre de portefeuille ou un compte en lecture seule n'est pas une divulgation de paiement à portée sélective |
| [Zallet](https://zcash.github.io/zallet/) | Flux de travail d'opérateur utilisant `z_viewtransaction`, `z_exportviewingkey` et `z_importviewingkey` | Logiciel en version bêta ; ses RPC de clés pour lecture seule et de transactions donnent un accès plus large ou des registres locaux, pas des preuves ZIP 311 |

Utilisez d'abord le portefeuille qui a envoyé ou reçu le paiement. Vérifiez les détails de la transaction, le mémo, l'identifiant de transaction et les confirmations, puis demandez à l'autre partie de comparer ces détails avec ses propres registres. N'installez pas un nouveau portefeuille et n'y saisissez pas une phrase de récupération simplement pour produire une preuve. Si un auditeur a besoin d'une visibilité continue, envisagez un compte compatible en lecture seule et comprenez la portée de la clé pour lecture seule avant de la partager.

Ces applications sont des alternatives pratiques pour vérifier des registres, pas la preuve qu'une divulgation de paiement standardisée est disponible. Une capture d'écran peut aider à comparer des registres, mais elle est modifiable et ne constitue pas une preuve cryptographique.

## Où les divulgations de paiement s'appliquent

### Litiges commerciaux

Un client pourrait prouver qu'un montant précis a été envoyé à l'adresse protégée du commerçant. La preuve n'établit pas que les biens ont été livrés, qu'un remboursement est dû ni que la personne qui la présente possède une identité juridique particulière. Ces questions dépendent toujours de l'enregistrement de la commande et de l'accord entre les parties.

### Retraits protégés

ZIP 311 cite les retraits protégés comme cas d'utilisation visé : un exchange prouverait le destinataire et le montant sans publier ces détails on-chain. Sa preuve pour les entrées transparentes est encore inachevée : il ne s'agit donc pas encore d'un flux de travail standardisé complet. Le client doit également vérifier de manière indépendante l'état de confirmation de la transaction.

### Dons

Un donateur ou une campagne pourrait prouver une contribution particulière tout en gardant privés les paiements sans rapport. Publier la divulgation rend ses détails sélectionnés publics pour toute personne qui en reçoit une copie : un canal de vérification privé est donc plus sûr lorsqu'une preuve publique n'est pas nécessaire.

### Comptabilité

Utilisez une divulgation de paiement lorsqu'un comptable a besoin d'une preuve pour une seule transaction. Utilisez la clé pour lecture seule adaptée la plus restreinte lorsque le comptable a besoin d'un accès continu à de nombreuses transactions ou à une période de déclaration complète.

## Une procédure respectueuse de la confidentialité

ZIP 311 n'est pas encore une norme de portefeuille aboutie et largement déployable. Lorsque des outils compatibles seront disponibles pour l'expéditeur et le vérificateur, utilisez cette liste de contrôle :

1. **Vérifiez d'abord la compatibilité.** Les deux outils doivent prendre en charge le même format de divulgation et le pool protégé utilisé par le paiement.
2. **Résolvez d'abord les problèmes ordinaires.** Vérifiez la synchronisation du portefeuille, l'identifiant de transaction, le nombre de confirmations, l'état d'expiration et les registres du destinataire avant de révéler des détails privés.
3. **Demandez un défi.** En cas de litige, le vérificateur doit fournir un nouveau numéro de commande ou un défi aléatoire afin que la divulgation soit liée à cette demande.
4. **Sélectionnez uniquement la sortie nécessaire.** N'incluez pas de sorties sans rapport provenant de la même transaction.
5. **Prévisualisez chaque champ révélé.** Vérifiez le destinataire, le montant, le mémo, la preuve d'adresse de l'expéditeur et le défi avant l'exportation.
6. **Partagez par un canal privé.** Une divulgation n'est pas une clé de dépense secrète, mais toute personne qui la reçoit peut conserver ou redistribuer les informations qu'elle révèle.
7. **Vérifiez par rapport à la chaîne.** Le vérificateur doit récupérer la transaction exacte auprès d'un nœud de confiance, confirmer qu'elle se trouve dans le réseau et le bloc prévus, puis valider la divulgation.
8. **Consignez le résultat, pas des secrets supplémentaires.** Ne conservez que ce qu'exige le processus de litige, de retrait, de don ou de comptabilité.

Si le portefeuille ne peut pas générer de divulgation, ne lui substituez pas une clé pour lecture seule complète sans comprendre sa portée plus large et permanente. Demandez si le destinataire peut confirmer le paiement à partir de ses propres registres de portefeuille ou accepter à la place un document moins sensible.

## Ce qu'une divulgation valide ne prouve pas

Une vérification réussie ne prouve pas :

- Que la transaction a suffisamment de confirmations au regard de la politique de risque du vérificateur
- Qu'une réorganisation de la chaîne ne peut pas supprimer une transaction récente
- Que les biens ou services ont été livrés
- Qu'un remboursement ou une rétrofacturation est nécessaire
- Que l'expéditeur contrôle une adresse particulière, sauf si une preuve d'adresse appropriée est incluse
- Que la personne qui présente la divulgation possède l'identité réelle qu'elle revendique
- Que les sorties non divulguées, les autres transactions ou le solde du portefeuille ont une valeur particulière
- Que la divulgation reste privée après avoir été partagée

Le vérificateur doit contrôler séparément l'inclusion dans la chaîne et l'état de confirmation. La procédure de vérification de ZIP 311 suppose que l'appelant a déjà obtenu la transaction minée et la hauteur de son bloc.

## Limites actuelles

Considérez ZIP 311 comme une norme proposée, et non comme la promesse qu'un portefeuille actuel dispose d'un bouton **Prouver le paiement** fonctionnel.

Le brouillon spécifie actuellement les dépenses et sorties Sapling, mais contient encore des points inachevés concernant Orchard, les entrées transparentes, l'encodage de la divulgation, la gestion des versions et la manière dont les portefeuilles doivent afficher les différents niveaux de validité. Son implémentation de référence est également indiquée comme « TBD ». Dans sa rédaction actuelle, il ne définit pas de divulgations de paiement pour les paiements Orchard ou Ironwood.

L'expéditeur peut également être dans l'impossibilité de divulguer une sortie si la transaction a été délibérément créée sans clé pour lecture seule sortante pour cette sortie. ZIP 311 préserve ce choix de confidentialité plutôt que de créer une nouvelle voie de récupération.

Une documentation plus ancienne décrit les commandes expérimentales `z_getpaymentdisclosure` et `z_validatepaymentdisclosure` dans `zcashd`. Ces commandes ne prenaient en charge **que les sorties Sprout JoinSplit**, et non la conception Sapling de ZIP 311, et elles ont été dépréciées. `zcashd` a atteint son arrêt définitif de fin de support en juillet 2026. N'utilisez pas ce guide historique comme instructions pour des fonds actuels.

Ces lacunes ne rendent pas l'idée inutile. Elles expliquent pourquoi un guide rigoureux doit distinguer le modèle de confidentialité et les cas d'utilisation des logiciels prêts pour les utilisateurs ordinaires.

## FAQ

### Puis-je prouver un paiement protégé avec le seul identifiant de transaction ?

Non. L'identifiant peut identifier la transaction et son état de confirmation, mais le destinataire protégé, le montant et le mémo ne sont pas publics.

### Une divulgation de paiement est-elle identique à une clé pour lecture seule ?

Non. Une divulgation porte sur certains détails d'une seule transaction. Une clé pour lecture seule peut révéler dans la durée l'activité correspondante d'une adresse ou d'un compte.

### Le destinataire peut-il créer la preuve de l'expéditeur ?

Pas selon la conception de ZIP 311. Une divulgation valide doit prouver l'autorité de dépense pour au moins une entrée. Le destinataire peut confirmer un paiement à l'aide de ses propres registres de portefeuille, mais il s'agit d'une affirmation différente.

### Puis-je révoquer une divulgation après l'avoir partagée ?

Non. Elle n'accorde pas d'accès futur au compte comme une clé pour lecture seule, mais les données révélées et la preuve peuvent être copiées. Partagez-la avec autant de précautions que n'importe quel document financier privé.

### La vérification déplace-t-elle ou bloque-t-elle des ZEC ?

Non. Créer ou vérifier une divulgation ne dépense, ne rembourse, ne gèle ni n'annule aucun fonds.

### Que dois-je utiliser aujourd'hui si mon portefeuille n'a pas de fonction de divulgation ?

Commencez par les registres du portefeuille du destinataire, l'identifiant de transaction et l'état de confirmation, une référence de facture dans le mémo chiffré ou un autre reçu accepté par les deux parties. N'utilisez une clé pour lecture seule que lorsque sa portée plus large est réellement nécessaire et bien comprise.

## Ressources

- [ZIP 311 : Zcash Payment Disclosures](https://zips.z.cash/zip-0311) - la conception provisoire, les exigences, le processus de vérification et les considérations de confidentialité
- [ZIP 310 : propriétés de sécurité des clés pour lecture seule Sapling](https://zips.z.cash/zip-0310) - ce que révèlent les clés pour lecture seule et quelles garanties elles offrent
- [ZIP 304 : signatures d'adresses Sapling](https://zips.z.cash/zip-0304) - le mécanisme facultatif de preuve d'adresse mentionné par ZIP 311
- [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf) - chiffrement des notes Sapling, clés pour lecture seule sortantes et autorisation de dépense
- [Document archivé sur les divulgations de paiement zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implémentation historique limitée à Sprout, pas un guide actuel
- [Fonctionnalités dépréciées de zcashd](https://zcash.github.io/zcash/user/deprecation.html) - état des anciennes commandes expérimentales de divulgation

## Pages connexes

- [Transactions](/using-zcash/transactions) - paiements protégés, confirmations et dépannage des transactions
- [Clés pour lecture seule](/zcash-tech/viewing-keys) - accès permanent en lecture seule et options d'exportation actuelles
- [Ce qu'un explorateur de blocs peut voir](/zcash-tech/what-a-block-explorer-can-see) - champs publics et privés des transactions
- [Tenir des registres avec des ZEC protégés](/zcash-use-cases/keeping-records-with-shielded-zec) - la comptabilité sans publier l'historique du portefeuille
