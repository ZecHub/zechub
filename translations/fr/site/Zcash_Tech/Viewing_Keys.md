<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Clés pour lecture seule

Les adresses protégées vous permettent d'effectuer des transactions en révélant le moins possible sur la blockchain Zcash. Que se passe-t-il alors lorsque vous *devez* montrer à une partie précise ce que vous détenez ou ce que vous avez envoyé ? Une clé pour lecture seule accorde un accès en lecture sans accorder la capacité de dépenser. Les clés pour lecture seule existaient déjà pour Sprout ; Sapling a ajouté des fonctionnalités comme la détection du moment où une note reçue est dépensée. [ZIP 310](https://zips.z.cash/zip-0310) est un brouillon informatif qui documente les propriétés de sécurité des clés pour lecture seule Sapling. Il ne s'agit pas de la mise à niveau qui a introduit les clés pour lecture seule.

Une clé pour lecture seule est l'outil de la divulgation sélective : vous choisissez qui voit quoi, sans jamais céder pour autant le pouvoir de dépenser.

## En bref

Une clé pour lecture seule accorde un accès **en lecture seule** à l'activité d'une adresse ou d'un compte Zcash protégé : quiconque la détient peut voir les transactions entrantes (et, pour les clés pour lecture seule complètes, sortantes), mais ne peut jamais dépenser.

- **Ce que c'est :** l'outil de divulgation sélective des pools protégés, dont les fonctionnalités diffèrent selon le pool et le type de clé. [ZIP 310](https://zips.z.cash/zip-0310) documente ce que révèle une clé pour lecture seule complète Sapling et indique quelles informations sont garanties, non vérifiées, non définies ou non révélées.
- **Ce qu'elle accorde :** la détection des dépôts (clés entrantes `uivk…`) ou une visibilité complète des entrées et sorties d'un compte (clés pour lecture seule complètes unifiées `uview…`), ainsi que les anciennes clés Sapling `zxviews…`.
- **Ce qu'elle n'accorde pas :** le pouvoir de dépenser. Le détenteur d'une clé pour lecture seule ne peut en aucun cas déplacer des fonds.
- **Où elle fonctionne aujourd'hui :** l'export et l'import dans [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) et les comptes en lecture seule dans des portefeuilles comme Zkool ; consultez la page [Portefeuilles](/using-zcash/wallets) pour connaître la prise en charge actuelle.
- **La règle d'or :** privilégiez la clé la plus restreinte qui répond à la question posée, et n'oubliez pas qu'une clé remise ne peut pas être révoquée. Vous pouvez seulement la rendre caduque en déplaçant les fonds.

---

## Pourquoi utiliser une clé pour lecture seule ?

Les écrits de Electric Coin Company sur le sujet décrivent les situations les plus fréquentes, qui restent les plus courantes aujourd'hui :

- **Un exchange qui surveille les dépôts.** L'exchange charge une clé pour lecture seule entrante sur un nœud de détection connecté à Internet afin de repérer les dépôts des clients sur une adresse protégée, tandis que la clé de dépense reste sur un matériel qui ne touche jamais le réseau.
- **Un dépositaire qui prouve ses avoirs.** Le dépositaire remet à un auditeur une clé pour lecture seule complète pour chaque adresse protégée. L'auditeur peut vérifier ces soldes et examiner l'activité passée vers et depuis ces adresses, et rien de plus.
- **La vérification préalable d'une contrepartie.** Lorsqu'un exchange doit examiner l'historique protégé d'un client dans le cadre d'une vigilance renforcée, il peut demander la clé pour lecture seule plutôt que les fonds.

## Ce qu'une clé pour lecture seule révèle et ne révèle pas

Il existe plusieurs types de clés, et la différence entre elles détermine ce que vous dévoilez.

| Clé | Préfixe | Accorde |
|---|---|---|
| Clé pour lecture seule complète unifiée (UFVK) | `uview…` | Voit les transactions entrantes **et** sortantes pour chaque pool du compte |
| Clé pour lecture seule entrante unifiée (UIVK) | `uivk…` | Voit uniquement les transactions entrantes, pour chaque pool du compte |
| Clé pour lecture seule complète étendue Sapling | `zxviews…` | Voit l'activité Sapling entrante et sortante pour les adresses de la clé |

Aucune de ces clés ne permet de dépenser. Toutes sont permanentes en un sens qui compte : une clé que vous avez remise ne peut pas être révoquée. Vous pouvez seulement la rendre caduque en déplaçant les fonds vers un compte dont l'autre partie ne détient pas les clés.

Deux pièges liés à la divulgation sont bons à connaître avant de partager quoi que ce soit.

**Entrante ne veut pas dire restreinte.** Une clé pour lecture seule entrante unifiée couvre l'ensemble du compte, et pas seulement l'adresse sur laquelle on vous a interrogé. Exporter une UIVK pour une seule adresse Sapling accorde quand même une visibilité sur les entrées de chaque pool de ce compte. Elle divulgue donc davantage que l'adresse qu'elle désigne. Le [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) l'indique explicitement.

**Une adresse publiée expose déjà sa clé pour lecture seule entrante à un futur adversaire.** [ZIP 326](https://zips.z.cash/zip-0326) souligne qu'un adversaire disposant d'un ordinateur quantique pourrait récupérer la clé pour lecture seule entrante à partir d'une adresse diversifiée publiée. Ce serait faisable, alors que la récupération de la clé du nullifier ne l'est pas. Publier une adresse n'équivaut pas aujourd'hui à publier une clé pour lecture seule, mais les deux se rapprochent sur un horizon suffisamment long.

## Les clés pour lecture seule après Ironwood

NU6.3 a introduit le pool protégé Ironwood et a limité le pool Orchard aux seules dépenses, de sorte que les fonds migrent de l'un à l'autre au fil du temps. Consultez [Ironwood](/zcash-tech/ironwood) et [Le sas comptable](/zcash-tech/the-turnstile) pour en savoir plus sur la mise à niveau elle-même.

**Une clé pour lecture seule émise avant Ironwood continue de fonctionner après la migration.** ZIP 326 précise qu'un récepteur, ainsi que la clé pour lecture seule entrante correspondante, relève du *protocole* Orchard plutôt que d'un pool : la même clé pour lecture seule entrante déchiffre par essai les textes chiffrés des notes du pool Orchard comme ceux du pool Ironwood. Zallet l'implémente ainsi : les notes Ironwood y ont la forme de notes Orchard et sont déchiffrées par essai avec les clés pour lecture seule Orchard du compte, dans le domaine de chiffrement des notes Ironwood.

Cela a trois conséquences pour quiconque détient ou émet une clé :

1. **Les soldes passent d'un pool à l'autre, et le détenteur de la clé le voit.** [ZIP 318](https://zips.z.cash/zip-0318) décrit la migration comme une série de petites transactions Orchard vers Ironwood, volontairement uniformes et diffusées selon un calendrier aléatoire. Chacune dépense une note Orchard et produit une sortie Ironwood d'une dénomination canonique. Un auditeur qui observe avec une clé pour lecture seule voit les avoirs passer d'un pool à l'autre par étapes sur plusieurs semaines, et non en un seul mouvement. Un portefeuille peut reconstituer l'avancement de sa propre migration à partir des données de la chaîne grâce à ses clés pour lecture seule.
2. **Chaque étape de la migration révèle la valeur qu'elle déplace.** C'est inhérent au passage d'un sas comptable, et c'est ce qui rend la migration auditable. Comme le solde est découpé en dénominations canoniques, aucune transaction ne révèle à elle seule l'intégralité du solde du pool Orchard.
3. **Les comptes créés après Ironwood peuvent dériver leurs clés différemment.** [ZIP 2005](https://zips.z.cash/zip-2005) ajoute un indicateur `use_qsk` pour les clés récupérables face au quantique. Il modifie la dérivation des clés entrantes, des clés sortantes et des clés de diversification, si bien que les clés `use_qsk = true` sont réellement des clés différentes. ZIP 326 exige que l'indicateur soit uniforme sur l'ensemble d'un compte et interdit de générer des clés `use_qsk = true` avant l'activation de NU6.3 sur le Mainnet. Une clé exportée d'un compte qui existait avant Ironwood est donc une clé `use_qsk = false` et reste valable pour ce compte. Ne supposez pas qu'une clé exportée d'un compte décrit un autre compte.

## Exporter une clé pour lecture seule

### Zallet

[Zallet](https://github.com/zcash/zallet) est le portefeuille de nœud complet qui a remplacé le portefeuille intégré à zcashd. L'export et l'import de clés pour lecture seule sont arrivés dans la **v0.1.0-beta.2 (28 juillet 2026)**. Vérifiez donc d'abord votre version, car ces méthodes n'existent pas dans les versions antérieures. Chaque argument placé après le nom de la méthode doit être du JSON valide : les valeurs de type chaîne de caractères conservent donc leurs propres guillemets doubles. Le [Guide de référence rapide de Zallet](/using-zcash/zallet-quick-reference-guide) présente la syntaxe générale des commandes.

Listez ce que contient le portefeuille :

```bash
zallet rpc listaddresses
```

Exportez la clé pour lecture seule complète unifiée du compte en indiquant une adresse unifiée :

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Pour exporter plutôt la clé pour lecture seule entrante unifiée du compte, utilisez l'argument facultatif `ivk` :

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Si vous indiquez une adresse Sapling, vous obtenez la clé pour lecture seule complète étendue Sapling de ce compte (`zxviews…`), comme avec l'ancien comportement de zcashd. Deux limites sont documentées. Les adresses Sprout sont rejetées. Une clé pour lecture seule complète étendue Sapling ne peut pas être exportée d'un compte lui-même importé en lecture seule, car le portefeuille ne peut pas la reconstituer. La forme `ivk` fonctionne en revanche pour les comptes importés en lecture seule.

### Portefeuilles qui exportent les clés pour lecture seule depuis leur propre interface

La page [Portefeuilles](/using-zcash/wallets) indique, pour chaque portefeuille, la prise en charge des clés pour lecture seule et l'état de préparation pour Ironwood. Au moment de la rédaction, les portefeuilles qui affichent à la fois la prise en charge des clés pour lecture seule et la mention **Ironwood : Ready** sont ZODL, Zingo!, Zkool, Cake, Zallet, zecd et Nozy. Comme l'état de préparation évolue, consultez cette page-là plutôt que celle-ci avant de vous fier à un portefeuille en particulier.

## Importer une clé pour lecture seule comme compte en lecture seule

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) est ici l'option la plus souple, car il accepte aussi bien les clés unifiées que les anciennes clés. Son README documente les comptes en lecture seule créés à partir d'une **clé pour lecture seule unifiée** ou d'une **clé pour lecture seule étendue Sapling**, ainsi que les anciennes clés protégées étendues exportées depuis zcashd. Ajoutez un nouveau compte, choisissez l'option en lecture seule et collez la clé `uview…` ou `zxviews…`. Le compte se synchronise ensuite et affiche les soldes et l'historique, sans aucun pouvoir de dépense.

La prise en charge du protocole Ironwood et la migration de Orchard vers Ironwood sont arrivées dans Zkool 6.24.0 (20 juillet 2026), et la version 6.26.1 (2 août 2026) a corrigé la détection des transactions Ironwood dans la mempool. Utilisez la version 6.26.1 ou une version ultérieure.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Le deuxième argument est la politique de réanalyse : `"whenkeyisnew"` (par défaut), `"yes"` ou `"no"`. Le troisième est la hauteur de bloc à partir de laquelle réanalyser. Zallet importe la clé comme compte en lecture seule et suit les transactions entrantes et sortantes de ses adresses, sans pouvoir de dépense.

**Zallet importe uniquement les clés pour lecture seule complètes étendues Sapling.** Il n'importe pas de clé pour lecture seule complète unifiée `uview…`, même s'il peut en exporter une. Pour donner accès en lecture à un compte unifié entier, exportez l'UFVK depuis Zallet et importez-la dans un portefeuille qui accepte les clés unifiées, comme Zkool.

Pour transformer une clé importée en un fichier d'historique complet des transactions, avec les txids, les frais et les mémos, consultez [Exporter l'historique des transactions à partir d'une Viewing Key](/guides/viewing-key-transaction-export).

## Ce qui a changé et ce qu'il ne faut plus chercher

Si vous avez suivi une version plus ancienne de cette page, ou une traduction de celle-ci, sachez que trois méthodes ne fonctionnent plus.

- **`zcash-cli z_exportviewingkey` et `z_importviewingkey`.** zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus. Les méthodes du même nom de Zallet les remplacent ; consultez le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Le tutoriel Ywallet.** La page Portefeuilles indique Ywallet **Ironwood : Not Ready**. Ce n'est donc pas le portefeuille à recommander pour les clés pour lecture seule de l'ère Ironwood. Zkool, du même développeur, accepte la même gamme de clés et est indiqué comme Ready.
- **zcashblockexplorer.com/vk.** Le service renvoie une erreur HTTP 503 avec un certificat invalide. Il a été abandonné sans être remplacé. Coller une clé pour lecture seule dans un site web livre tout votre historique de transactions à celui qui gère ce site, et c'était déjà la moins sûre des trois options présentées sur l'ancienne page. Importez plutôt la clé dans un portefeuille que vous gérez vous-même.

## Visuel / analogie

### La fenêtre de l'auditeur

Imaginez un compte protégé comme une salle de coffres dans une banque :

- La **clé de dépense** est la clé de la salle. Quiconque la détient peut ouvrir les coffres et en retirer le contenu.
- Une **clé pour lecture seule** est la fenêtre de l'auditeur donnant sur cette salle. L'auditeur peut voir chaque coffre entrer et sortir, lire les étiquettes et tenir un registre, mais la fenêtre n'a pas de poignée. La personne qui regarde à travers ne peut rien déplacer à l'intérieur de la salle.

### Ce que la fenêtre ne peut pas montrer

La fenêtre donne sur la salle, pas sur le monde extérieur. Elle montre l'activité protégée du compte observé. Elle ne fait pas de l'observateur un témoin de toute la blockchain, et ne lui permet pas de relier l'activité du compte à l'historique non protégé de quelqu'un d'autre. De plus, comme la fenêtre est installée au niveau du compte, donner à quelqu'un un judas sur un seul coffre (une seule adresse) lui donne quand même la vue sur toutes les entrées de la salle. C'est précisément pour cela que la règle de la clé la plus restreinte existe.

### Pourquoi vous ne pouvez pas reprendre la fenêtre

Une clé pour lecture seule est une information, pas une autorisation inscrite quelque part. Une fois copiée, elle reste valable tant que les fonds n'ont pas quitté le compte qu'elle observe. La solution pratique est la rotation : déplacez les soldes vers un nouveau compte dont l'autre partie n'a jamais reçu les clés, et l'ancienne fenêtre donnera sur une salle vide.

## Analyse approfondie

### Le déchiffrement par essai : comment fonctionne réellement la lecture

Chaque transaction protégée chiffre les textes en clair de ses notes à l'intention du destinataire prévu. Un portefeuille qui détient une clé pour lecture seule effectue un **déchiffrement par essai** : pour chaque transaction trouvée sur la chaîne, il tente de déchiffrer les textes chiffrés des notes avec la clé. Les réussites révèlent la valeur de la note, le diversificateur du destinataire et le mémo ; les échecs ne coûtent rien. C'est pourquoi la même clé pour lecture seule entrante continue de fonctionner dans les pools Orchard et Ironwood. [ZIP 326](https://zips.z.cash/zip-0326) rattache un récepteur au *protocole* Orchard : les textes chiffrés des notes Ironwood ont donc la forme de notes Orchard et sont déchiffrés par essai avec les clés pour lecture seule Orchard du compte, dans le domaine de chiffrement des notes Ironwood.

### Complète ou entrante : ce que décide la dérivation

Une clé pour lecture seule **complète** peut dériver la capacité de lecture des sorties. C'est ce qui permet à un auditeur de reconstituer le côté *expéditeur* d'un transfert une fois la transaction déchiffrée. Une clé pour lecture seule **entrante** s'arrête volontairement avant : elle détecte et déchiffre les notes entrantes, mais ne peut pas reconstituer les liens sortants. La dérivation entre ces capacités est à sens unique : la clé entrante est dérivée *de* la clé complète, jamais l'inverse. C'est ce qui fait de « entrante uniquement » une véritable restriction et non une simple promesse. L'indicateur `use_qsk` de [ZIP 2005](https://zips.z.cash/zip-2005) modifie la dérivation elle-même : les clés récupérables face au quantique forment donc une famille de clés entièrement différente, et non une variante de l'ancienne.

### À quoi ressemble la migration pour un observateur

Comme la migration [ZIP 318](https://zips.z.cash/zip-0318) est une série aléatoire de petites transactions uniformes de Orchard vers Ironwood, un observateur qui détient la clé voit un escalier : de nombreuses marches d'une valeur de dénomination canonique, plutôt qu'un seul saut. Aucune étape ne révèle à elle seule le solde total en cours de migration, mais le *schéma* est reconnaissable. C'est le compromis voulu d'un sas comptable auditable.

## Implications pratiques

- **Pour les exchanges et les processeurs de paiement :** chargez la clé pour lecture seule entrante du compte (ou l'UFVK pour une couverture complète) sur un nœud de détection et rapprochez automatiquement les dépôts des clients, exactement comme vous le feriez avec une adresse transparente, sans que la clé de dépense quitte jamais le stockage à froid.
- **Pour les auditeurs et les preuves de réserves :** une clé pour lecture seule complète remplace « faites-nous confiance » par « vérifiez par vous-même ». Elle donne accès aux soldes et à l'historique complet des transactions des comptes observés, sans aucune possibilité d'y toucher. Combinez-la avec les [divulgations de paiement](/zcash-tech/payment-disclosures) pour prouver ponctuellement un paiement précis.
- **Pour la vérification préalable :** remettez à une contrepartie la clé du compte concerné par la relation d'affaires, et non celle de tout votre portefeuille. Si la relation prend fin, effectuez une rotation du compte.
- **Pour le choix des outils :** Zallet exporte les UFVK et importe les clés pour lecture seule complètes étendues Sapling ; Zkool accepte les clés unifiées et les anciennes clés comme comptes en lecture seule. Consultez la page [Portefeuilles](/using-zcash/wallets) pour connaître l'état de préparation actuel pour Ironwood avant d'adopter un portefeuille comme standard.
- **Le coût de la divulgation est permanent :** chaque détenteur supplémentaire d'une clé constitue une ouverture permanente sur votre confidentialité, que vous ne pouvez pas refermer. Émettez une clé par relation, limitez-la à un seul compte et notez qui détient quoi.

## Erreurs courantes

| Idée reçue | Ce qu'il en est réellement |
| --- | --- |
| « Une clé pour lecture seule peut dépenser les fonds si elle fuite. » | C'est impossible. Les clés pour lecture seule ne confèrent aucun pouvoir de dépense ; au pire, une fuite divulgue l'historique. |
| « Je peux révoquer une clé pour lecture seule plus tard. » | C'est impossible. Une clé remise fonctionne jusqu'à ce que les fonds soient déplacés vers un compte dont l'autre partie ne détient pas les clés. |
| « Exporter une UIVK pour une adresse ne montre que cette adresse. » | Les clés pour lecture seule sont rattachées au compte. Une UIVK montre l'activité entrante de chaque pool du compte. |
| « `zcash-cli z_exportviewingkey` fonctionne toujours. » | Non. zcashd a atteint son arrêt de fin de support le 18 juillet 2026 ; utilisez plutôt `z_exportviewingkey` / `z_importviewingkey` de Zallet. |
| « Coller une clé pour lecture seule dans un outil web est sans danger, puisqu'elle est en lecture seule. » | Lecture seule signifie quand même que tout votre historique de transactions pour ce compte est livré à celui qui gère le site. Importez la clé dans un portefeuille que vous gérez vous-même. |
| « Zallet peut importer n'importe quelle clé pour lecture seule que Zallet peut exporter. » | Non. Zallet importe uniquement les clés pour lecture seule complètes étendues Sapling ; les clés unifiées `uview…` doivent être importées dans des portefeuilles qui acceptent les clés unifiées, comme Zkool. |

## Pages associées

- [Divulgations de paiement](/zcash-tech/payment-disclosures) : prouver certains détails d'un paiement sans accorder d'accès permanent à un compte
- [Adresses unifiées](/zcash-tech/unified-addresses) : la couche d'adressage qui contient les récepteurs des clés pour lecture seule
- [Ironwood](/zcash-tech/ironwood) : le pool protégé de NU6.3 vers lequel Orchard migre
- [Le sas comptable](/zcash-tech/the-turnstile) : le mécanisme de migration de Orchard vers Ironwood que les observateurs peuvent suivre
- [Portefeuilles](/using-zcash/wallets) : le répertoire complet des portefeuilles, avec la prise en charge des clés pour lecture seule et l'état de préparation pour Ironwood
- [Exporter l'historique des transactions à partir d'une Viewing Key](/guides/viewing-key-transaction-export) : transformer une clé importée en un fichier d'historique complet (txid, frais, mémo)

## Ressources

Utilisez les clés pour lecture seule uniquement en cas de besoin, et privilégiez la clé la plus restreinte qui répond à la question posée.

- [Divulgations de paiement](/zcash-tech/payment-disclosures) - prouver certains détails d'un paiement sans accorder d'accès permanent à un compte
- [ZIP 326 : conséquences de NU6.3 pour les portefeuilles](https://zips.z.cash/zip-0326) : le comportement des clés pour lecture seule dans les pools Orchard et Ironwood
- [ZIP 229 : format de transaction version 6](https://zips.z.cash/zip-0229) : définit les pools Orchard et Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) : spécification des clés pour lecture seule
- [Journal des modifications de Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) : quelle version a ajouté quelle méthode RPC
- [README de Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) : types de comptes et de clés pris en charge
- [ECC, Comprendre les clés pour lecture seule](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgation sélective et clés pour lecture seule](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, présentation vidéo Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
