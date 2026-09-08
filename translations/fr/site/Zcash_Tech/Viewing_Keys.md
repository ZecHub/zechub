<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Les adresses protégées vous permettent d’effectuer des transactions tout en révélant le moins possible sur la blockchain Zcash. Alors que se passe-t-il lorsque vous *devez* montrer à une partie précise ce que vous détenez, ou ce que vous avez envoyé ? Chaque adresse protégée possède une Viewing Key qui accorde un accès en lecture sans accorder la capacité de dépenser. Les Viewing Keys ont été introduites dans [ZIP 310](https://zips.z.cash/zip-0310) et ajoutées au protocole lors de la mise à niveau réseau Sapling.

Une Viewing Key est l’outil de divulgation sélective : vous choisissez qui voit quoi, et vous ne transmettez jamais d’autorité de dépense pour le faire.

## Pourquoi utiliser une Viewing Key ?

Les écrits de Electric Coin Company sur le sujet présentent les situations qui reviennent le plus souvent, et ce sont encore les plus courantes aujourd’hui :

- **Une plateforme d’échange qui surveille les dépôts.** La plateforme charge une Incoming Viewing Key sur un nœud de détection exposé à internet afin de pouvoir repérer les dépôts des clients vers une adresse protégée, tandis que la clé de dépense reste sur un matériel qui ne touche jamais au réseau.
- **Un dépositaire qui prouve ses avoirs.** Le dépositaire remet à un auditeur une Full Viewing Key pour chaque adresse protégée. L’auditeur peut vérifier ces soldes et examiner l’activité passée vers et depuis ces adresses, sans pouvoir faire autre chose.
- **La diligence raisonnable sur une contrepartie.** Lorsqu’une plateforme d’échange doit examiner l’historique protégé d’un client dans le cadre d’une diligence renforcée, elle peut demander la Viewing Key plutôt que les fonds.

## Ce qu’une Viewing Key révèle, et ce qu’elle ne révèle pas

Il existe plus d’un type de clé, et la différence détermine la quantité d’informations que vous divulguez.

| Clé | Préfixe | Accorde |
|---|---|---|
| Unified Full Viewing Key (UFVK) | `uview…` | Voit les transactions entrantes **et** sortantes pour chaque pool du compte |
| Unified Incoming Viewing Key (UIVK) | `uivk…` | Voit uniquement les transactions entrantes, pour chaque pool du compte |
| Sapling Extended Full Viewing Key | `zxviews…` | Voit l’activité Sapling entrante et sortante pour les adresses de la clé |

Aucune de ces clés ne permet de dépenser. Toutes sont permanentes de la manière qui compte : une clé que vous avez distribuée ne peut pas être révoquée, seulement dépassée, en déplaçant les fonds vers un compte dont l’autre partie ne détient pas les clés.

Il vaut la peine de connaître deux pièges de divulgation avant de partager quoi que ce soit.

**Entrant ne veut pas dire restreint.** Une Unified Incoming Viewing Key s’applique à l’ensemble du compte, pas à la seule adresse sur laquelle on vous a interrogé. Exporter une UIVK pour une seule adresse Sapling accorde quand même une visibilité entrante sur chaque pool de ce compte, donc cela divulgue plus que l’adresse mentionnée. Le [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) l’indique explicitement.

**Une adresse publiée expose déjà sa clé de visualisation entrante à un futur adversaire.** [ZIP 326](https://zips.z.cash/zip-0326) note qu’un adversaire disposant d’un ordinateur quantique pourrait retrouver la clé de visualisation entrante à partir d’une adresse diversifiée publiée, ce qui est réalisable d’une manière qui ne l’est pas pour retrouver la clé de nullifier. Publier une adresse n’est pas la même chose que publier une Viewing Key aujourd’hui, mais les deux se rapprochent sur un horizon suffisamment long.

## Les Viewing Keys après Ironwood

NU6.3 a introduit le pool protégé Ironwood et a fait du pool Orchard un pool réservé aux dépenses, de sorte que les fonds migrent de l’un vers l’autre au fil du temps. Voir [Ironwood](/zcash-tech/ironwood) et [The turnstile](/zcash-tech/the-turnstile) pour la mise à niveau elle-même.

**Une Viewing Key émise avant Ironwood continue de fonctionner après la migration.** ZIP 326 précise qu’un receveur, et sa clé de visualisation entrante correspondante, relèvent du *protocole* Orchard plutôt que d’un pool : la même clé de visualisation entrante effectue le déchiffrement d’essai des textes chiffrés de notes à la fois du pool Orchard et du pool Ironwood. Zallet l’implémente ainsi, en décrivant les notes Ironwood comme de forme Orchard et déchiffrées à l’essai avec les Viewing Keys Orchard du compte sous le domaine de chiffrement des notes Ironwood.

Trois conséquences pour toute personne qui détient ou émet une clé :

1. **Les soldes se déplacent entre les pools, et l’observateur le voit se produire.** [ZIP 318](https://zips.z.cash/zip-0318) spécifie la migration comme une série de petites transactions Orchard-vers-Ironwood volontairement uniformes, diffusées selon un calendrier aléatoire, chacune dépensant une note Orchard et produisant une sortie Ironwood d’une dénomination canonique. Un auditeur qui observe avec une Viewing Key voit les avoirs passer d’un pool à l’autre par étapes sur plusieurs semaines, et non en un seul mouvement. Un wallet peut reconstituer sa propre progression de migration à partir des données de la chaîne en utilisant ses Viewing Keys.
2. **Chaque étape de migration révèle la valeur qu’elle déplace.** C’est inhérent au passage d’un turnstile, et c’est ce qui rend la migration vérifiable. Le fractionnement du solde en dénominations canoniques signifie qu’aucune transaction unique ne révèle l’intégralité du solde du pool Orchard.
3. **Les comptes créés après Ironwood peuvent dériver leurs clés différemment.** [ZIP 2005](https://zips.z.cash/zip-2005) ajoute un drapeau `use_qsk` pour les clés récupérables par le quantique, et il modifie la manière dont les clés entrantes, sortantes et de diversification sont dérivées, de sorte que les clés `use_qsk = true` sont véritablement des clés différentes. ZIP 326 exige que le drapeau soit uniforme sur tout le compte et interdit de générer des clés `use_qsk = true` avant l’activation de NU6.3 sur Mainnet. Une clé exportée depuis un compte qui existait avant Ironwood est donc une clé `use_qsk = false`, et reste correcte pour ce compte. Ne supposez pas qu’une clé exportée d’un compte décrit un autre compte.

## Exporter une Viewing Key

### Zallet

[Zallet](https://github.com/zcash/zallet) est le wallet de nœud complet qui a remplacé le wallet intégré à zcashd. L’export et l’import de Viewing Keys sont arrivés dans **v0.1.0-beta.2 (28 juillet 2026)**, donc vérifiez d’abord votre version ; les versions antérieures ne disposent pas de ces méthodes. Chaque argument après le nom de la méthode doit être du JSON valide, ce qui signifie que les valeurs de chaîne conservent leurs propres guillemets doubles. Le [Guide de référence rapide Zallet](/using-zcash/zallet-quick-reference-guide) couvre le style général des commandes.

Lister ce que le wallet contient :

```bash
zallet rpc listaddresses
```

Exporter la Unified Full Viewing Key du compte en passant une Unified Address :

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Exporter à la place la Unified Incoming Viewing Key du compte, en utilisant l’argument optionnel `ivk` :

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passer une adresse Sapling renvoie la Sapling Extended Full Viewing Key (`zxviews…`) de ce compte, conformément à l’ancien comportement de zcashd. Deux limites documentées : les adresses Sprout sont rejetées, et une Sapling Extended Full Viewing Key ne peut pas être exportée depuis un compte qui a lui-même été importé en lecture seule, car le wallet ne peut pas la reconstruire. La forme `ivk` fonctionne bien pour les comptes en lecture seule importés.

### Wallets qui exportent des Viewing Keys depuis leur propre interface

La page [Wallets](/using-zcash/wallets) suit la prise en charge des Viewing Keys et l’état de préparation à Ironwood pour chaque wallet. Au moment de la rédaction, les wallets qui affichent à la fois la prise en charge des Viewing Keys et **Ironwood: Ready** incluent ZODL, Zingo!, Zkool, Cake, Zallet, Zecd et Nozy. Vérifiez cette page plutôt que celle-ci avant de vous appuyer sur un wallet en particulier, car l’état de préparation évolue.

## Importer une Viewing Key comme compte watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) est l’option la plus souple ici, parce qu’il accepte les clés unifiées ainsi que les anciennes clés. Son README documente des comptes en lecture seule créés à partir d’une **Unified Viewing Key** ou d’une **Sapling Extended Viewing Key**, ainsi que des anciennes clés étendues protégées exportées depuis zcashd. Ajoutez un nouveau compte, choisissez la voie lecture seule, puis collez la clé `uview…` ou `zxviews…` ; le compte se synchronise alors et rapporte les soldes et l’historique sans autorité de dépense.

La prise en charge du protocole Ironwood et la migration Orchard-vers-Ironwood sont arrivées dans Zkool 6.24.0 (20 juillet 2026), et 6.26.1 (2 août 2026) a corrigé la détection des transactions Ironwood dans le mempool. Utilisez la version 6.26.1 ou ultérieure.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Le second argument est la politique de rescan : `"whenkeyisnew"` (par défaut), `"yes"` ou `"no"`. Le troisième est la hauteur de bloc à partir de laquelle rescanner. Zallet importe la clé comme compte en lecture seule et suit les transactions entrantes et sortantes de ses adresses sans autorité de dépense.

**Zallet importe uniquement les Sapling Extended Full Viewing Keys.** Il n’importera pas une Unified Full Viewing Key `uview…`, même s’il peut en exporter une. Pour transmettre un accès en lecture à un compte unifié entier, exportez l’UFVK depuis Zallet et importez-la dans un wallet qui accepte les clés unifiées, comme Zkool.

## Ce qui a changé, et ce qu’il faut cesser de chercher

Si vous avez suivi une ancienne version de cette page, ou une traduction de celle-ci, trois voies ne fonctionnent plus.

- **`zcash-cli z_exportviewingkey` et `z_importviewingkey`.** zcashd a atteint son arrêt de fin de support le 18 juillet 2026 et ne fonctionne plus. Les méthodes de Zallet portant le même nom sont le remplacement ; voir le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Le tutoriel Ywallet.** La page Wallets marque Ywallet **Ironwood: Not Ready**, ce n’est donc pas le wallet vers lequel orienter les gens pour les Viewing Keys à l’ère Ironwood. Zkool, du même développeur, accepte la même gamme de clés et est marqué Ready.
- **zcashblockexplorer.com/vk.** Le service renvoie HTTP 503 avec un certificat invalide, et il a été abandonné plutôt que remplacé. Coller une Viewing Key sur un site web confie tout votre historique de transactions à la personne qui exploite ce site, ce qui a toujours été la plus faible des trois options de l’ancienne page. Importez plutôt la clé dans un wallet que vous exploitez vous-même.

## Ressources

Utilisez les Viewing Keys uniquement en cas de besoin, et privilégiez la clé la plus restreinte qui réponde à la question posée.

- [ZIP 326: Conséquences de NU6.3 pour les wallets](https://zips.z.cash/zip-0326) — comment les Viewing Keys se comportent à travers les pools Orchard et Ironwood
- [ZIP 229: Format de transaction version 6](https://zips.z.cash/zip-0229) — définit les pools Orchard et Ironwood
- [journal des modifications de Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — quelle version a ajouté quelle méthode RPC
- [README de Zkool](https://github.com/hhanh00/zkool2/blob/main/README.md) — types de comptes et de clés pris en charge
- [ECC, Expliquer les Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgation sélective et Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Présentation vidéo sur les Viewing Keys de Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
