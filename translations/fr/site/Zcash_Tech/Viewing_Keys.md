<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Clés de visualisation

Les adresses blindées vous permettent d'effectuer des transactions tout en révélant aussi peu que possible sur la blockchain Zcash. Alors, que se passe-t-il lorsque vous *devez* montrer à une partie précise ce que vous détenez ou ce que vous avez envoyé ? Chaque adresse blindée possède une clé de visualisation qui accorde un accès en lecture sans accorder la capacité de dépenser. Les clés de visualisation ont été introduites dans [ZIP 310](https://zips.z.cash/zip-0310) et ajoutées au protocole lors de la mise à niveau du réseau Sapling.

Une clé de visualisation est l'outil de divulgation sélective : vous choisissez qui voit quoi, sans jamais céder d'autorité de dépense pour y parvenir.

## En bref

Une clé de visualisation donne un accès **en lecture seule** à l’activité d’une adresse ou d’un compte protégés Zcash : toute personne qui la détient peut voir les transactions entrantes (et, pour les Full Viewing Keys, sortantes), mais ne peut jamais dépenser les fonds.

- **Ce que c'est :** l'outil de divulgation sélective des pools blindés. Introduit dans [ZIP 310](https://zips.z.cash/zip-0310), ajouté au protocole lors de la mise à niveau réseau Sapling.
- **Ce qu'il permet :** la détection des dépôts (clés entrantes `uivk…`) ou une visibilité complète des entrées/sorties d'un compte (clés de visualisation complètes unifiées `uview…`), ainsi que les clés Sapling `zxviews…` historiques.
- **Ce qu'il ne permet pas :** l'autorisation de dépenser. Rien de ce que fait le détenteur d'une clé de visualisation ne peut déplacer des fonds.
- **Où cela fonctionne aujourd'hui :** export/import dans [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) et comptes en lecture seule dans des wallets tels que Zkool ; consultez la page [Wallets](/using-zcash/wallets) pour la matrice de prise en charge actuelle.
- **La règle générale :** privilégiez la clé la plus restreinte qui répond à la question posée, et rappelez-vous qu'une clé communiquée ne peut pas être récupérée — elle ne peut être rendue obsolète qu'en déplaçant les fonds.

---

## Pourquoi utiliser une clé de visualisation ?

Les écrits de Electric Coin Company sur le sujet présentent les situations les plus fréquentes, qui restent aujourd'hui les cas d'usage habituels :

- **Une plateforme d'échange surveillant les dépôts.** La plateforme charge une clé de visualisation entrante sur un nœud de détection connecté à Internet afin de repérer les dépôts des clients vers une adresse blindée, tandis que la clé de dépense reste sur du matériel qui ne touche jamais le réseau.
- **Un dépositaire prouvant ses avoirs.** Le dépositaire remet à un auditeur une clé de visualisation complète pour chaque adresse blindée. L'auditeur peut vérifier ces soldes et examiner l'activité passée vers et depuis ces adresses, sans pouvoir faire autre chose.
- **La diligence raisonnable concernant une contrepartie.** Lorsqu'une plateforme d'échange doit examiner l'historique blindé d'un client dans le cadre d'une diligence raisonnable renforcée, elle peut demander la clé de visualisation plutôt que les fonds.

## Ce qu'une clé de visualisation révèle et ne révèle pas

Il existe plusieurs types de clés, et la différence détermine l'étendue de ce que vous divulguez.

| Clé | Préfixe | Autorise |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Voit les transactions entrantes **et** sortantes de chaque pool du compte |
| Unified incoming viewing key (UIVK) | `uivk…` | Voit uniquement les transactions entrantes, pour chaque pool du compte |
| Sapling extended full viewing key | `zxviews…` | Voit l'activité entrante et sortante Sapling pour les adresses de la clé |

Aucune de ces clés ne peut dépenser. Toutes sont permanentes dans le sens qui compte : une clé que vous avez communiquée ne peut pas être révoquée, seulement rendue obsolète en déplaçant les fonds vers un compte dont l'autre partie ne détient pas les clés.

Deux pièges de divulgation méritent d'être connus avant de partager quoi que ce soit.

**Entrante ne signifie pas restreinte.** Une clé de visualisation entrante unifiée porte sur l'ensemble du compte, et non sur la seule adresse au sujet de laquelle on vous a interrogé. Exporter une UIVK pour une seule adresse Sapling accorde toujours une visibilité sur les entrées de tous les pools de ce compte ; elle divulgue donc davantage que l'adresse qu'elle désigne. Le [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) l'indique explicitement.

**Une adresse publiée expose déjà sa clé de visualisation entrante à un futur adversaire.** [ZIP 326](https://zips.z.cash/zip-0326) note qu'un adversaire disposant d'un ordinateur quantique pourrait récupérer la clé de visualisation entrante à partir d'une adresse diversifiée publiée, ce qui est faisable d'une manière qui ne l'est pas pour la récupération de la clé de nullificateur. Publier une adresse n'équivaut pas à publier aujourd'hui une clé de visualisation, mais les deux se rapprochent sur un horizon suffisamment long.

## Les clés de visualisation après Ironwood

NU6.3 a introduit le pool blindé Ironwood et rendu le pool Orchard uniquement dépensable, de sorte que les fonds migrent progressivement de l'un vers l'autre. Consultez [Ironwood](/zcash-tech/ironwood) et [Le tourniquet](/zcash-tech/the-turnstile) pour la mise à niveau elle-même.

**Une clé de visualisation émise avant Ironwood continue de fonctionner après la migration.** ZIP 326 précise qu'un récepteur, ainsi que sa clé de visualisation entrante correspondante, relève du *protocole* Orchard plutôt que d'un pool : la même clé de visualisation entrante déchiffre par essai les textes chiffrés de notes des pools Orchard et Ironwood. Zallet l'implémente ainsi, décrivant les notes Ironwood comme ayant la forme Orchard et déchiffrées par essai avec les clés de visualisation Orchard du compte dans le domaine de chiffrement des notes Ironwood.

Trois conséquences pour toute personne détenant ou émettant une clé :

1. **Les soldes se déplacent entre les pools, et le lecteur le voit se produire.** [ZIP 318](https://zips.z.cash/zip-0318) définit la migration comme une série de petites transactions Orchard-vers-Ironwood délibérément uniformes, diffusées selon un calendrier aléatoire, chacune dépensant une note Orchard et produisant une sortie Ironwood d'une dénomination canonique. Un auditeur qui observe avec une clé de visualisation voit les avoirs passer d'un pool à l'autre par étapes sur plusieurs semaines, et non en un seul mouvement. Un wallet peut reconstituer sa propre progression de migration à partir des données de la chaîne à l'aide de ses clés de visualisation.
2. **Chaque étape de migration révèle la valeur qu'elle déplace.** C'est inhérent au franchissement d'un tourniquet, et c'est ce qui rend la migration vérifiable. Répartir le solde en dénominations canoniques signifie qu'aucune transaction unique ne révèle le solde complet du pool Orchard.
3. **Les comptes créés après Ironwood peuvent dériver leurs clés différemment.** [ZIP 2005](https://zips.z.cash/zip-2005) ajoute un indicateur `use_qsk` pour les clés récupérables quantiquement, et modifie la manière dont les clés entrantes, sortantes et de diversificateur sont dérivées ; les clés `use_qsk = true` sont donc véritablement différentes. ZIP 326 exige que l'indicateur soit uniforme dans un compte et interdit de générer des clés `use_qsk = true` avant l'activation de NU6.3 sur Mainnet. Une clé exportée depuis un compte existant avant Ironwood est donc une clé `use_qsk = false` et reste correcte pour ce compte. Ne supposez pas qu'une clé exportée d'un compte décrit un autre compte.

## Exporter une clé de visualisation

### Zallet

[Zallet](https://github.com/zcash/zallet) est le wallet de nœud complet qui a remplacé le wallet intégré à zcashd. L'exportation et l'importation de clés de visualisation sont arrivées dans **v0.1.0-beta.2 (28 juillet 2026)** ; vérifiez donc d'abord votre version, car les versions antérieures ne disposent pas de ces méthodes. Chaque argument après le nom de la méthode doit être un JSON valide, ce qui signifie que les valeurs de chaîne conservent leurs propres guillemets doubles. Le [Zallet Guide de référence rapide](/using-zcash/zallet-quick-reference-guide) couvre le style général des commandes.

Listez ce que le wallet détient :

```bash
zallet rpc listaddresses
```

Exportez la clé de visualisation complète unifiée du compte en fournissant une adresse unifiée :

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exportez plutôt la clé de visualisation entrante unifiée du compte, à l'aide de l'argument facultatif `ivk` :

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Fournir une adresse Sapling renvoie la clé de visualisation complète étendue Sapling de ce compte (`zxviews…`), correspondant à l'ancien comportement de zcashd. Deux limites documentées : les adresses Sprout sont rejetées, et une clé de visualisation complète étendue Sapling ne peut pas être exportée depuis un compte lui-même importé en lecture seule, car le wallet ne peut pas la reconstituer. La forme `ivk` fonctionne toutefois pour les comptes importés en lecture seule.

### Wallets qui exportent des clés de visualisation depuis leur propre interface

La page [Wallets](/using-zcash/wallets) répertorie la prise en charge des clés de visualisation et l'état de préparation à Ironwood pour chaque wallet. Au moment de la rédaction, les wallets indiquant à la fois la prise en charge des clés de visualisation et **Ironwood: Ready** comprennent ZODL, Zingo!, Zkool, Cake, Zallet, zecd et Nozy. Consultez cette page plutôt que celle-ci avant de vous fier à un wallet particulier, car cet état évolue.

## Importer une clé de visualisation en tant que compte en lecture seule

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) est l'option la plus flexible ici, car elle accepte les clés unifiées comme les anciennes. Son README documente les comptes en lecture seule créés à partir d'une **clé de visualisation unifiée** ou d'une **clé de visualisation étendue Sapling**, ainsi que les anciennes clés étendues blindées exportées depuis zcashd. Ajoutez un nouveau compte, choisissez l'option lecture seule et collez la clé `uview…` ou `zxviews…` ; le compte se synchronise alors et signale les soldes et l'historique sans autorité de dépense.

La prise en charge du protocole Ironwood et la migration Orchard-vers-Ironwood sont arrivées dans Zkool 6.24.0 (20 juillet 2026), et la version 6.26.1 (2 août 2026) a corrigé la détection des transactions Ironwood dans le mempool. Utilisez la version 6.26.1 ou une version ultérieure.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Le deuxième argument est la politique de rescannage : `"whenkeyisnew"` (par défaut), `"yes"` ou `"no"`. Le troisième est la hauteur de bloc à partir de laquelle rescanner. Zallet importe la clé comme compte en lecture seule et suit les transactions entrantes et sortantes de ses adresses sans autorité de dépense.

**Zallet importe uniquement les clés de visualisation complète étendues Sapling.** Il n'importera pas une clé de visualisation complète unifiée `uview…`, même s'il peut en exporter une. Pour céder un accès en lecture à un compte unifié entier, exportez l'UFVK depuis Zallet et importez-la dans un wallet qui accepte les clés unifiées, tel que Zkool.

Pour transformer une clé importée en fichier complet d'historique de transactions, avec txids, frais et mémos, consultez [Exporter l'historique des transactions depuis un Viewing Key](/guides/viewing-key-transaction-export).

## Ce qui a changé et ce qu'il faut cesser de chercher

Si vous avez suivi une ancienne version de cette page, ou sa traduction, trois méthodes ne fonctionnent plus.

- **`zcash-cli z_exportviewingkey` et `z_importviewingkey`.** zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus. Les méthodes portant le même nom de Zallet sont leur remplacement ; consultez le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Le guide Ywallet.** La page Wallets indique Ywallet **Ironwood: Not Ready** ; ce n'est donc pas le wallet vers lequel orienter les utilisateurs pour les clés de visualisation de l'ère Ironwood. Zkool, du même développeur, accepte la même gamme de clés et est indiqué comme Ready.
- **zcashblockexplorer.com/vk.** Le service renvoie HTTP 503 avec un certificat invalide, et a été abandonné plutôt que remplacé. Coller une clé de visualisation dans un site web remet l'intégralité de votre historique de transactions à la personne qui exploite ce site ; c'était déjà la plus faible des trois options de l'ancienne page. Importez plutôt la clé dans un wallet que vous exploitez.

## Visuel / Analogie

### La fenêtre de l’auditeur

Considérez un compte blindé comme une salle de coffres dans une banque :

- La **clé de dépense** est la clé de la pièce. Quiconque la détient peut ouvrir les boîtes et en retirer le contenu.
- Une **clé de visualisation** est la fenêtre de l'auditeur sur cette pièce. L'auditeur peut observer chaque boîte entrer et sortir, lire les étiquettes et tenir un registre — mais la fenêtre n'a pas de poignée. Rien à l'intérieur de la pièce ne peut être déplacé par la personne qui regarde à travers elle.

### Ce que la fenêtre ne peut pas afficher

La fenêtre donne sur la pièce, pas sur le monde extérieur. Elle montre l'activité protégée du compte surveillé ; elle ne transforme pas la personne qui surveille en observateur de toute la blockchain, et elle ne lui permet pas de corréler l'activité du compte avec l'historique non protégé de qui que ce soit. Et parce que la fenêtre est installée au niveau du compte, donner à quelqu'un un judas sur un seul coffre de dépôt (une seule adresse) lui donne tout de même une vue de l'ensemble des entrées de la pièce — c'est précisément pourquoi la règle de la clé la plus restreinte existe.

### Pourquoi vous ne pouvez pas rétablir la fenêtre

Une Viewing Key est une information, pas une entrée d’autorisation. Une fois copiée, elle existe jusqu’à ce que les fonds quittent le compte qu’elle surveille. La solution pratique est la rotation : déplacez les soldes vers un nouveau compte dont l’autre partie n’a jamais reçu les clés, et l’ancienne fenêtre donne sur une pièce vide.

## Approfondissement

### Déchiffrement d’essai : comment la visualisation fonctionne réellement

Chaque transaction blindée chiffre les textes en clair de ses notes pour le destinataire prévu. Un wallet détenant une viewing key effectue un **déchiffrement d’essai** : pour chaque transaction qu’il trouve sur la chaîne, il tente de déchiffrer les textes chiffrés des notes avec la clé. Les succès révèlent la valeur de la note, le diversificateur du destinataire et le mémo ; les échecs ne coûtent rien. C’est pourquoi la même incoming viewing key continue de fonctionner dans les pools Orchard et Ironwood — [ZIP 326](https://zips.z.cash/zip-0326) associe un receiver au *protocole* Orchard, de sorte que les textes chiffrés des notes Ironwood ont la forme Orchard et sont déchiffrés par essai avec les viewing keys Orchard du compte dans le domaine de chiffrement des notes Ironwood.

### Full ou incoming : ce que décide la dérivation

Une clé de visualisation **complète** peut dériver la capacité de visualisation sortante, ce qui permet à un auditeur de reconstituer le côté *expéditeur* d’un transfert une fois la transaction déchiffrée. Une clé de visualisation **entrante** s’arrête délibérément là : elle détecte et déchiffre les notes entrantes, mais ne peut pas reconstituer le lien avec les sorties. La dérivation entre ces capacités est à sens unique — la clé entrante est dérivée *à partir de* la clé complète, jamais l’inverse — ce qui fait de « entrante uniquement » une véritable réduction plutôt qu’une promesse. Le drapeau `use_qsk` de [ZIP 2005](https://zips.z.cash/zip-2005) modifie la dérivation elle-même ; les clés récupérables par ordinateur quantique constituent donc une famille de clés entièrement différente, et non une variante de l’ancienne.

### À quoi ressemble la migration pour un spectateur

Comme la migration [ZIP 318](https://zips.z.cash/zip-0318) est une série aléatoire de petites transactions uniformes de Orchard à Ironwood, un observateur détenant la clé voit un escalier : de nombreux paliers de valeur à dénomination canonique plutôt qu'un seul saut. Aucun palier ne révèle à lui seul le solde total en cours de migration, mais le *motif* est reconnaissable — c'est le compromis recherché d'un turnstile auditable.

## Implications pratiques

- **Pour les exchanges et les processeurs de paiement :** chargez la clé de visualisation entrante du compte (ou l’UFVK pour une couverture complète) sur un nœud de détection et rapprochez automatiquement les dépôts des clients, exactement comme avec une adresse transparente — mais la clé de dépense du client ne quitte jamais le stockage à froid.
- **Pour les auditeurs et les preuves de réserves :** une clé de visualisation complète transforme « faites-nous confiance » en « vérifiez ceci » : les soldes et l’historique complet des transactions des comptes surveillés, sans aucune possibilité d’y toucher. Combinez-la avec [Divulgations de paiement](/zcash-tech/payment-disclosures) pour des preuves ponctuelles concernant un seul paiement.
- **Pour la diligence raisonnable :** remettez à une contrepartie la clé du compte concerné par la mission, et non celle de l’ensemble de votre wallet. Si la relation prend fin, faites tourner le compte.
- **Pour les choix d’outils :** Zallet exporte des UFVK et importe des clés de visualisation complètes étendues Sapling ; Zkool accepte les clés unifiées et héritées comme comptes en lecture seule. Consultez la page [Wallets](/using-zcash/wallets) pour la matrice de disponibilité actuelle Ironwood avant de standardiser un wallet.
- **Le coût de la divulgation est permanent :** chaque détenteur supplémentaire d’une clé représente une ligne de crédit permanente en matière de confidentialité que vous ne pouvez pas clôturer. Émettez des clés par relation, limitez-les à un seul compte et documentez qui détient quoi.

## Erreurs courantes

| Croyance répandue | Ce qu’il en est réellement |
| --- | --- |
| « Une clé de visualisation peut dépenser les fonds si elle fuit. » | C’est impossible. Les clés de visualisation ne confèrent aucune autorité de dépense ; au pire, une fuite révèle l’historique. |
| « Je peux révoquer une clé de visualisation plus tard. » | C’est impossible. Une clé communiquée fonctionne jusqu’à ce que les fonds soient déplacés vers un compte dont l’autre partie ne détient pas les clés. |
| « Exporter une UIVK pour une seule adresse ne montre que cette adresse. » | Les clés de visualisation sont associées au compte. Une UIVK montre l’activité entrante de chaque pool du compte. |
| « `zcash-cli z_exportviewingkey` fonctionne toujours. » | Non. zcashd a atteint son arrêt de fin de support le 18 juillet 2026 ; utilisez plutôt `z_exportviewingkey` / `z_importviewingkey` de Zallet. |
| « Coller une clé de visualisation dans un outil web est sûr, car elle est en lecture seule. » | La lecture seule signifie tout de même que l’intégralité de l’historique des transactions de ce compte est remise à la personne qui gère le site. Importez la clé dans un wallet que vous gérez. |
| « Zallet peut importer toute clé de visualisation que Zallet peut exporter. » | Non. Zallet importe uniquement les clés de visualisation complètes étendues Sapling ; les clés de visualisation unifiées `uview…` doivent être importées dans des wallets qui acceptent les clés unifiées, comme Zkool. |

## Pages associées

- [Divulgations de paiement](/zcash-tech/payment-disclosures) — prouver des détails sélectionnés d’un paiement sans accorder un accès continu à un compte
- [Adresses unifiées](/zcash-tech/unified-addresses) — la couche d’adresse qui contient les récepteurs de clés de visualisation
- [Ironwood](/zcash-tech/ironwood) — le pool protégé NU6.3 vers lequel Orchard migre
- [Le tourniquet](/zcash-tech/the-turnstile) — le mécanisme de migration de Orchard vers Ironwood que les observateurs peuvent suivre
- [Portefeuilles](/using-zcash/wallets) — le répertoire complet des portefeuilles, de la prise en charge des clés de visualisation et de l’état de préparation de Ironwood
- [Exporter l’historique des transactions depuis un Viewing Key](/guides/viewing-key-transaction-export) — transformer une clé importée en un fichier d’historique complet des txid/frais/mémos

## Ressources

Utilisez les clés de visualisation selon les besoins, et privilégiez la clé la plus restreinte qui répond à la question posée.

- [Divulgation d'informations de paiement](/zcash-tech/payment-disclosures) - prouver certains détails d'un paiement sans accorder d'accès continu à un compte
- [ZIP 326 : NU6.3 Conséquences pour les portefeuilles](https://zips.z.cash/zip-0326) — comment les clés de visualisation fonctionnent entre les pools Orchard et Ironwood
- [ZIP 229 : format de transaction version 6](https://zips.z.cash/zip-0229) — définit les pools Orchard et Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — spécification des clés de visualisation
- [Zallet journal des modifications](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — quelle version a ajouté quelle méthode RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — types de comptes et de clés pris en charge
- [ECC, explication des clés de visualisation](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, divulgation sélective et clés de visualisation](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Keyprésentation vidéo](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
