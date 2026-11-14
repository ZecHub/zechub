# FROST et clés pour lecture seule : note de recherche sur l'interopérabilité Zcash/Dash

*Préparé pour ZecHub · Révisé le 27 septembre 2026 · Toutes les affirmations sont sourcées dans le texte*

## Synthèse

ZecHub a soulevé cette question après avoir ajouté DASH protégé comme option de don pour le wiki : les clés pour lecture seule de type Zcash, ou les signatures à seuil FROST, pourraient-elles être transposées à Dash ?

La recherche a reformulé la question. Les clés pour lecture seule ne sont pas une question ouverte : Dash a intégré le [Zcash pool protégé Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) dans sa chaîne Evolution, et la hiérarchie de clés de Orchard inclut par construction des clés pour lecture seule. La propre [feuille de route](https://www.dash.org/roadmap/) de Dash les présente comme un outil de divulgation aux auditeurs et de conformité à la Travel Rule. Cette moitié de la question est déployée, et non hypothétique.

**FROST est le véritable point manquant.** Dash utilise déjà des signatures à seuil BLS au moyen des [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), mais celles-ci servent au consensus au niveau du réseau : ChainLocks et InstantSend. Le [ZIP 312](https://zips.z.cash/zip-0312) vise autre chose : une autorisation de dépense à seuil sur un compte protégé unique détenu par un petit groupe de détenteurs de clés individuels. Les deux ne sont pas interchangeables. Et comme le ZIP 312 reste à l'état de **brouillon**, il n'existe d'implémentation de référence à porter sur aucune des deux chaînes : il s'agirait donc d'un travail inédit, quel que soit le camp qui le réalise.

---

## Chronologie : pourquoi cette comparaison est inhabituelle en ce moment

Deux événements liés aux pools protégés se sont produits à quelques semaines d'intervalle à la mi-2026.

**Zcash a quitté Orchard.** Le chercheur Taylor Hornby a révélé une vulnérabilité de circuit dans Orchard qui pouvait être exploitée pour gonfler l'offre de manière indétectable. Zcash a réagi en activant **Ironwood (NU6.3)** le **28 juillet 2026**, introduisant un nouveau pool protégé doté d'un mécanisme de migration par sas comptable.

**Dash a adopté Orchard.** Dash a annoncé le projet le [19 février 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) : *« Nous prévoyons de pouvoir lancer prochainement les transferts protégés, naturellement sous réserve d'audits de sécurité et d'une revue de code supplémentaire. »* La [feuille de route](https://www.dash.org/roadmap/) de Dash indique que les Shielded Balances ont été **achevés en juillet 2026** avec Dash Platform **v4.0**, et Dash a publié [*« Les transactions protégées sont en service sur le mainnet Dash Evolution »*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) le **4 août 2026**.

> **Une remarque sur l'ordre des événements.** Certains articles ont situé l'activation de Dash sur le mainnet au 17 juillet 2026, ce qui la placerait avant Ironwood. Cette date semble provenir de comptes rendus de presse de l'annonce plutôt que d'une activation. Selon les propres sources de Dash, la fonctionnalité a été achevée en juillet et annoncée en service le 4 août, soit après Ironwood. Les deux chaînes se sont croisées en l'espace de quelques semaines ; l'ordre exact dépend de l'étape retenue, et cette note ne tranche pas.

Point essentiel, Dash n'a pas hérité du bogue. Leur annonce est explicite : *« nous avons implémenté la version de Orchard dépourvue de bogue d'inflation connu. La version précédente contenait un bogue qui pouvait être exploité pour gonfler de manière indétectable l'offre de Zcash. »*

Ainsi, Dash utilise désormais un fork corrigé de la cryptographie que Zcash a lui-même abandonnée au niveau de la couche de base, tandis que le pool de nouvelle génération de Zcash (Ironwood) et son schéma d'autorisation de dépense de nouvelle génération (FROST) sont respectivement tout juste en service et encore à l'état de brouillon.

---

## Clés pour lecture seule : déployées, pas une lacune de recherche

Le pool protégé de Dash est [Orchard](https://zips.z.cash/zip-0224), construit sur Halo 2 zk-SNARKs, qui ne nécessite aucune configuration de confiance. La hiérarchie de clés de Orchard a toujours inclus les Full Viewing Keys et les Incoming Viewing Keys comme partie intégrante de sa conception plutôt que comme un module complémentaire : la fonctionnalité est donc arrivée avec le code, et non sous la forme d'un portage que l'une ou l'autre chaîne aurait dû négocier.

La feuille de route de Dash énonce directement l'intention :

> *« Contrairement aux systèmes de confidentialité obligatoire qui ont subi des retraits de cotation sur des exchanges et des frictions réglementaires, les Shielded Balances prennent en charge la divulgation sélective via des clés pour lecture seule, permettant aux utilisateurs et aux entreprises de partager les détails de leurs transactions avec des auditeurs ou de se conformer aux exigences de la Travel Rule si nécessaire, sans compromettre la confidentialité au quotidien. »*

Deux observations méritent d'être consignées :

**Dash positionne les clés pour lecture seule autour d'un cas d'utilisation en production plus concret que celui atteint par les propres outils de Zcash.** Les outils de divulgation de paiements de Zcash sont restés largement expérimentaux et optionnels selon les portefeuilles. Dash livre les clés pour lecture seule comme une fonctionnalité de conformité assortie de cas d'utilisation nommés, sur une chaîne qui offre en outre un règlement déterministe en environ une seconde et une synchronisation du portefeuille d'environ vingt secondes, selon sa propre annonce.

**Le point en suspens est la dérive de compatibilité, pas la capacité.** Il convient de surveiller si l'implémentation des clés pour lecture seule de Dash reste compatible au niveau du format avec le format de clé pour lecture seule Orchard de Zcash à mesure que les deux chaînes évoluent indépendamment. C'est une question de suivi plutôt qu'un projet de recherche.

---

## Dérivation des clés : comparaison entre Zcash et Dash

Cette section répond directement à la question du relecteur. En bref, les arbres de clés *protégées* sont quasi identiques parce que le code est partagé : les différences significatives tiennent à la manière dont chaque chaîne **enracine** cet arbre dans l'espace de clés de son portefeuille, et à ce qui occupe par ailleurs cet espace.

### Zcash

Zcash utilise le [ZIP 32, *Portefeuilles déterministes hiérarchiques protégés*](https://zips.z.cash/zip-0032), dont le statut est **final**. Plutôt que de placer les clés protégées dans un arbre BIP 32 unique, le ZIP 32 attribue à chaque pool protégé sa propre clé maîtresse et son propre chemin :

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` est fixé à `32'` (0x80000020) conformément à BIP 43, et `coin_type` suit SLIP 44, tous les testnets partageant l'index `1`.

Au sein d'un compte Orchard, la hiérarchie est strictement unidirectionnelle : chaque niveau peut dériver tout ce qui se trouve en dessous de lui et rien au-dessus :

| Clé | Permet de | Dérive |
|---|---|---|
| Spending key | Dépenser des notes | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autoriser des dépenses | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Voir les paiements entrants **et** sortants | IVK, OVK |
| Incoming Viewing Key | Voir uniquement les paiements entrants | Adresses diversifiées |
| Outgoing Viewing Key | Récupérer les détails des paiements sortants | — |
| Diversified address | Recevoir | — |

Orchard a simplifié cette structure par rapport à Sapling : selon le [Orchard Book](https://zcash.github.io/orchard/design/keys.html), la clé privée de nullifier `nsk` a été supprimée, `nk` est devenu un élément de corps plutôt qu'un point de courbe, et `ovk` est désormais dérivé de la Full Viewing Key plutôt que conservé séparément.

Au-dessus se trouve le [ZIP 316, *Adresses unifiées et clés pour lecture seule unifiées*](https://zips.z.cash/zip-0316) (révision 0 active, révision 1 retirée, révision 2 à l'état de brouillon), qui regroupe les clés de chaque pool dans une **Unified Full Viewing Key** (« combine plusieurs éléments Full Viewing Key… ») et une **Unified Incoming Viewing Key**. La distinction qu'un développeur de portefeuille doit respecter : une UFVK révèle l'activité entrante et sortante, une UIVK uniquement l'activité entrante.

### Dash

Dash enracine tout dans un arbre BIP 32 classique, avec le type de pièce SLIP 44 `5'`, et y ajoute deux extensions de dérivation qui lui sont propres.

Le [DIP-0009, *Chemins de dérivation par fonctionnalité*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) insère un niveau **fonctionnalité** qui partitionne l'espace de clés selon des fonctions propres à la pièce :

```
m / purpose' / coin_type' / feature' / *
```

avec `purpose` fixé à `9'` (0x80000009) et `coin_type` à `5'` (0x80000005). La motivation affichée du DIP est l'isolement : *« il peut être souhaitable de conserver les fonds mélangés dans un chemin isolé des fonds non mélangés. »*

Le [DIP-0014, *Dérivation de clés étendue à l'aide d'entiers non signés de 256 bits*](https://github.com/dashpay/dips/blob/master/dip-0014.md) va plus loin en levant la limite d'index de 31 bits de BIP 32, de sorte que les composantes du chemin peuvent porter des valeurs complètes de 256 bits. Cela permet des chemins dérivés d'identités, tels que :

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

où les deux dernières composantes sont des empreintes d'identités d'utilisateurs. Zcash n'a pas d'équivalent : le ZIP 32 ne prévoit aucune notion de dérivation d'un chemin de clé à partir de l'identité d'une autre partie.

### Là où les deux diffèrent réellement

**Le sous-arbre protégé est le même.** Les clés protégées de Dash sont des clés Orchard, parce que le pool protégé de Dash est Orchard. Un développeur de portefeuille qui passe de l'un à l'autre travaille avec la même structure, de la clé de dépense à la clé pour lecture seule.

**L'enracinement diffère.** Zcash isole chaque pool protégé sous sa propre clé maîtresse avec l'objectif `32'`. Dash rattache la fonctionnalité protégée à un arbre unifié unique sous l'objectif `9'`, aux côtés de toutes les autres fonctionnalités. La séparation de Zcash se fait par pool cryptographique ; celle de Dash par fonctionnalité produit.

**L'espace de clés de Dash contient quelque chose que celui de Zcash ne contient pas : un domaine BLS distinct.** Les clés d'opérateur de masternode, les clés de vote et les clés de quorum utilisées par les LLMQ sont des clés BLS, et non des clés de la famille Schnorr, et se situent entièrement en dehors de l'arbre BIP 32 décrit ci-dessus. C'est précisément là que réside la signature à seuil existante de Dash, et c'est précisément pourquoi elle ne se combine pas avec l'autorisation de dépense Orchard, comme l'expose la section suivante.

**La dérivation liée à l'identité est propre à Dash.** Les chemins de 256 bits du DIP-0014 servent à dériver des clés à partir de relations entre identités. Il s'agit d'un concept de Dash Platform sans équivalent Zcash, et c'est le cas le plus net où les deux schémas de dérivation ont divergé à dessein plutôt que par accident.

*Voir la figure 1 pour les deux schémas d'enracinement convergeant vers un sous-arbre Orchard commun.*

---

## FROST : la question véritablement ouverte

Dash dispose d'un système de signatures à seuil éprouvé avec les **LLMQ basés sur BLS** (Long-Living Masternode Quorums), utilisés pour ChainLocks, InstantSend et le consensus des validateurs de Dash Platform.

Le [ZIP 312, *FROST pour les multisignatures d'autorisation de dépense*](https://zips.z.cash/zip-0312), à l'état de **brouillon**, fait autre chose. Il transforme en schéma à seuil les signatures d'autorisation de dépense basées sur Schnorr déjà définies par Sapling et Orchard (respectivement **RedJubjub** et **RedPallas**), de sorte que, selon les termes mêmes du ZIP, *« des utilisateurs et des services tiers partageant la garde d'un portefeuille, ou un groupe de personnes gérant des fonds communs »* puissent exiger une approbation à seuil, par exemple « 2 sur 3 », avant une dépense. Il est classé comme ZIP de type **portefeuille** : il produit des signatures compatibles avec l'autorisation de dépense existante plutôt que de modifier le consensus. Il conserve un rôle de coordinateur, que le ZIP renonce explicitement à supprimer, et il traite à la fois de la génération de clés par un distributeur de confiance et de la génération distribuée de clés.

La distinction qui compte, et la raison pour laquelle ces deux systèmes ne sont pas substituables :

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Schéma de signature | BLS | Schnorr — RedJubjub / RedPallas |
| Qui signe | Un quorum de masternodes | Un petit groupe de détenteurs de clés individuels |
| Ce qui est autorisé | Un fait du réseau : un verrouillage de bloc, un verrouillage de transaction | Une dépense depuis un compte protégé |
| Couche | Consensus | Portefeuille |
| Espace de clés | Domaine BLS distinct | La clé d'autorisation de dépense Orchard/Sapling |
| Statut | Déployé | Brouillon, sans implémentation de référence |

Le fait que Dash dispose de signatures à seuil BLS ne signifie **pas** qu'il dispose de FROST, ni qu'il en a besoin. Mais cela signifie que les ingénieurs de Dash possèdent en interne une expérience de la signature à seuil, de la génération distribuée de clés et de la coordination de quorums : une expérience réellement transférable s'ils choisissaient de construire ce système.

*Voir la figure 2 pour ce que chaque schéma signe réellement.*

### Ce qu'exigerait FROST sur le fork Orchard de Dash, en première approche

1. **Une DKG FROST et une cérémonie de signature sur RedPallas**, le schéma d'autorisation de dépense de Orchard, une variante de Schnorr sur la courbe Pallas. Cela est distinct de la DKG BLS existante de Dash pour les LLMQ, et ne s'y réduit pas.
2. **Une prise en charge, dans les portefeuilles et l'expérience utilisateur, de la signature multipartite d'un compte protégé unique**, qui constitue un schéma d'interaction différent de celui des outils de quorum de masternodes et nécessite un équivalent du coordinateur.
3. **Une décision sur la couche.** Très probablement au seul niveau du portefeuille, puisque le ZIP 312 est conçu comme un schéma de portefeuille reposant sur des primitives existantes plutôt que comme une modification du consensus ; mais cela doit être confirmé spécifiquement pour le fork Orchard de Dash, et non déduit du périmètre défini par Zcash.

---

## Recommandation

**Clés pour lecture seule : documenter, pas rechercher.** La fonctionnalité est livrée sur les deux chaînes. Une courte note de wiki indiquant que le pool protégé de Dash inclut des clés pour lecture seule, avec un lien vers la feuille de route de Dash, éviterait que le public de ZecHub suppose qu'elle est encore hypothétique. Suivez la compatibilité du format à mesure que les deux chaînes évoluent.

**FROST : une réelle opportunité, bloquée en amont.** Elle dépend de l'aboutissement du ZIP 312 à une implémentation de référence, ou du choix de Dash de développer en parallèle. ZecHub ne peut pas l'accélérer directement.

**La prochaine étape la plus utile est une conversation, et non davantage de recherche documentaire.** Les personnes qui construiraient ce système sont joignables. Shielded Labs pilote le ZIP 312 ; l'équipe d'ingénierie de Dash a déjà accueilli favorablement le discours « emprunté à Zcash » autour de l'intégration de Orchard. Un fil de discussion intercommunautaire reliant les deux ferait émerger davantage qu'une nouvelle série de lectures, et cette note a atteint la limite de ce que les sources publiques permettent d'établir.

---

## Figures

**Figure 1 — Enracinement de la dérivation des clés : ZIP 32 de Zcash et DIP-0009/0014 de Dash, convergeant vers un sous-arbre Orchard commun.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figure 2 — Ce que signe chaque schéma à seuil : un quorum de masternodes attestant un fait du réseau, face à un groupe de détenteurs de clés autorisant une dépense protégée.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Sources

**Zcash — protocole**
- [ZIP 32 : Portefeuilles déterministes hiérarchiques protégés](https://zips.z.cash/zip-0032) — statut final
- [ZIP 224 : Protocole protégé Orchard](https://zips.z.cash/zip-0224)
- [ZIP 312 : FROST pour les multisignatures d'autorisation de dépense](https://zips.z.cash/zip-0312) — statut brouillon
- [ZIP 316 : Adresses unifiées et clés pour lecture seule unifiées](https://zips.z.cash/zip-0316)
- [Le Orchard Book — Clés et adresses](https://zcash.github.io/orchard/design/keys.html)
- [Spécification du protocole Zcash](https://zips.z.cash/protocol/protocol.pdf) — composants des clés, §5.6.4

**Dash — protocole et annonces**
- [Les transactions protégées sont en service sur le mainnet Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 août 2026
- [Dash ajoute les transactions protégées à Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 février 2026
- [Feuille de route de Dash](https://www.dash.org/roadmap/) — Shielded Balances, achevés en juillet 2026, Platform v4.0 ; mise à jour le 12 septembre 2026
- [DIP-0009 : Chemins de dérivation par fonctionnalité](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014 : Dérivation de clés étendue à l'aide d'entiers non signés de 256 bits](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentation de Dash Core — Quorums de masternodes (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [Dépôt dashpay/dips](https://github.com/dashpay/dips)

**Articles de presse contemporains**
- [Dash lance la technologie Orchard de Zcash dans une mise à niveau de confidentialité](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash apporte la confidentialité Orchard de Zcash à la chaîne Evolution pour les transactions protégées](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Sources vérifiées le 27 septembre 2026. Dash Platform et le ZIP 312 évoluent tous deux ; les chiffres et les statuts doivent être revérifiés avant toute republication.*
