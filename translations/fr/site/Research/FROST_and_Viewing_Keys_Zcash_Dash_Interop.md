# FROST & Viewing Keys : note de recherche sur l’interopérabilité Zcash/Dash

*Préparé pour ZecHub · Révisé le 27 septembre 2026 · Toutes les affirmations sont sourcées dans le texte*

## Résumé exécutif

ZecHub a soulevé cette question après avoir ajouté DASH shielded comme option de don au wiki : les viewing keys de type Zcash, ou les signatures à seuil FROST, pourraient-elles être adaptées à Dash ?

La recherche a reformulé la question. Les viewing keys ne sont pas une question ouverte — Dash a intégré le pool shielded [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) dans sa chaîne Evolution, et la hiérarchie de clés de Orchard inclut des viewing keys par conception. La [feuille de route](https://www.dash.org/roadmap/) de Dash les positionne pour la divulgation aux auditeurs et la conformité à la Travel Rule. Cette partie est déployée, non hypothétique.

**C’est FROST qui constitue la véritable lacune.** Dash utilise déjà des signatures à seuil BLS via les [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), mais celles-ci servent le consensus au niveau du réseau — ChainLocks et InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) vise autre chose : une autorisation de dépense à seuil sur un seul compte shielded détenu par un petit groupe de détenteurs individuels de clés. Les deux ne sont pas interchangeables. Et puisque ZIP 312 reste **Draft**, il n’existe aucune implémentation de référence sur l’une ou l’autre chaîne à porter ; ce serait donc un travail inédit, quel que soit le côté qui le réaliserait.

---

## Chronologie : pourquoi cette comparaison est inhabituelle en ce moment

Deux événements liés aux pools shielded se sont produits à quelques semaines d’intervalle à la mi-2026.

**Zcash s’est éloigné de Orchard.** Le chercheur Taylor Hornby a révélé une vulnérabilité de circuit dans Orchard susceptible d’être exploitée pour gonfler l’offre de manière indétectable. Zcash a réagi en activant **Ironwood (NU6.3)** le **28 juillet 2026**, introduisant un nouveau pool shielded avec un mécanisme de migration turnstile.

**Dash a adopté Orchard.** Dash a annoncé ce projet le [19 février 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *« Nous prévoyons de pouvoir lancer prochainement les transferts shielded, sous réserve, naturellement, des audits de sécurité et d’un examen supplémentaire du code. »* La [feuille de route](https://www.dash.org/roadmap/) de Dash indique que les Shielded Balances ont été **achevés en juillet 2026** avec Dash Platform **v4.0**, et Dash a publié [*« Les transactions shielded sont actives sur le mainnet Dash Evolution »*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) le **4 août 2026**.

> **Une note sur l’ordre des événements.** Certaines couvertures ont situé l’activation du mainnet Dash au 17 juillet 2026, ce qui la placerait avant Ironwood. Cette date semble provenir d’articles de presse concernant l’annonce plutôt que d’une activation. Selon les propres sources de Dash, la fonctionnalité a été achevée en juillet et annoncée comme active le 4 août — après Ironwood. Les deux chaînes se sont croisées à quelques semaines d’intervalle ; l’ordre exact dépend du jalon retenu, et cette note ne prétend pas en établir un.

Point crucial : Dash n’a pas hérité du bug. Son annonce est explicite : *« nous avons implémenté la version de Orchard sans bug d’inflation connu. La version précédente contenait un bug qui pouvait être exploité pour gonfler de manière indétectable l’offre de Zcash. »*

Dash exécute donc désormais un fork corrigé de la cryptographie dont Zcash lui-même s’est éloigné au niveau de la couche de base, tandis que le pool de nouvelle génération de Zcash (Ironwood) et son schéma d’autorisation de dépense de nouvelle génération (FROST) sont respectivement tout juste actifs et toujours à l’état Draft.

---

## Viewing keys : déployées, pas une lacune de recherche

Le pool shielded de Dash est [Orchard](https://zips.z.cash/zip-0224), construit sur Halo 2 zk-SNARKs ne nécessitant aucune configuration de confiance. La hiérarchie de clés de Orchard a toujours inclus les Full Viewing Keys et les Incoming Viewing Keys dans sa conception plutôt que comme un ajout — la capacité est donc arrivée avec le code, et non par un port que les chaînes auraient dû négocier.

La feuille de route de Dash énonce directement l’intention :

> *« Contrairement aux systèmes de confidentialité obligatoires qui ont fait face à des suppressions de cotation par les plateformes d’échange et à des frictions réglementaires, les Shielded Balances prennent en charge la divulgation sélective par des view keys — permettant aux utilisateurs et aux entreprises de partager des détails de transaction avec des auditeurs ou de respecter les exigences de la Travel Rule si nécessaire, sans compromettre la confidentialité au quotidien. »*

Deux observations méritent d’être consignées :

**Dash positionne les viewing keys autour d’un cas d’usage de production plus concret que celui atteint par les propres outils de Zcash.** Les outils de divulgation de paiement de Zcash sont restés largement expérimentaux et optionnels selon les wallets. Dash fournit des view keys comme fonctionnalité de conformité avec des cas d’usage nommés, sur une chaîne qui offre également, selon sa propre annonce, un règlement déterministe d’environ une seconde et une synchronisation de wallet d’environ vingt secondes.

**Le point ouvert concerne la dérive de compatibilité, non la capacité.** Il convient de suivre si l’implémentation des viewing keys de Dash reste compatible au niveau du format filaire avec le format de viewing keys Zcash de Orchard, alors que les deux chaînes évoluent indépendamment. C’est une question de suivi plutôt qu’un projet de recherche.

---

## Dérivation des clés : comparaison entre Zcash et Dash

Cette section répond directement à la question de l’examinateur. La réponse courte est que les arbres de clés *shielded* sont presque identiques parce que le code est partagé — les différences significatives résident dans la manière dont chaque chaîne **ancre** cet arbre dans l’espace de clés de son wallet, et dans ce qui occupe par ailleurs cet espace.

### Zcash

Zcash utilise [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032), dont le statut est **Final**. Plutôt que de placer les clés shielded dans un seul arbre BIP 32, ZIP 32 attribue à chaque pool shielded sa propre clé maître et son propre chemin :

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` est fixé à `32'` (0x80000020) conformément à BIP 43, et `coin_type` suit SLIP 44, tous les testnets partageant l’indice `1`.

Au sein d’un compte Orchard, la hiérarchie est strictement unidirectionnelle — chaque niveau peut dériver tout ce qui se trouve en dessous et rien de ce qui se trouve au-dessus :

| Clé | Peut faire | Dérive |
|---|---|---|
| Spending key | Dépenser des notes | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Autoriser des dépenses | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Voir les paiements entrants **et** sortants | IVK, OVK |
| Incoming Viewing Key | Voir uniquement les paiements entrants | Adresses diversifiées |
| Outgoing Viewing Key | Récupérer les détails des paiements sortants | — |
| Diversified address | Recevoir | — |

Orchard a simplifié cela par rapport à Sapling : selon le [Orchard Book](https://zcash.github.io/orchard/design/keys.html), la clé privée de nullifier `nsk` a été supprimée, `nk` est devenu un élément de corps plutôt qu’un point de courbe, et `ovk` est désormais dérivé de la full viewing key plutôt que détenu séparément.

Au-dessus se trouve [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) — Révision 0 Active, Révision 1 Withdrawn, Révision 2 Draft — qui regroupe les clés par pool dans une **Unified Full Viewing Key** (« combine plusieurs Full Viewing Key… Items ») et une **Unified Incoming Viewing Key**. Distinction qu’un développeur de wallet doit respecter : une UFVK révèle l’activité entrante comme sortante, tandis qu’une UIVK ne révèle que l’activité entrante.

### Dash

Dash ancre tout dans un arbre BIP 32 conventionnel, avec le type de monnaie SLIP 44 `5'`, et ajoute deux extensions de dérivation qui lui sont propres.

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) insère un niveau **feature** qui partitionne l’espace de clés selon une fonction propre à la monnaie :

```
m / purpose' / coin_type' / feature' / *
```

avec `purpose` fixé à `9'` (0x80000009) et `coin_type` à `5'` (0x80000005). La motivation énoncée par le DIP est l’isolation — *« il peut être souhaitable de conserver les fonds mixés dans un chemin isolé des fonds non mixés. »*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) va plus loin, levant la limite d’indice à 31 bits de BIP 32 afin que les composants de chemin puissent contenir des valeurs complètes de 256 bits. Cela permet des chemins dérivés de l’identité tels que :

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

où les deux derniers composants sont des hachages d’identité utilisateur. Zcash n’a pas d’équivalent : ZIP 32 ne conçoit pas la dérivation d’un chemin de clé à partir de l’identité d’une autre partie.

### Là où les deux diffèrent réellement

**Le sous-arbre shielded est le même.** Les clés shielded de Dash sont des clés Orchard, car le pool shielded de Dash est Orchard. Un développeur de wallet passant de l’un à l’autre travaille avec la même structure de la clé de dépense à la viewing key.

**L’ancrage diffère.** Zcash isole chaque pool shielded sous sa propre clé maître avec l’objectif `32'`. Dash suspend la fonctionnalité shielded à un arbre unifié sous l’objectif `9'`, aux côtés de toute autre fonctionnalité. La séparation de Zcash se fait par pool cryptographique ; celle de Dash, par fonctionnalité produit.

**L’espace de clés de Dash contient quelque chose que celui de Zcash n’a pas : un domaine BLS distinct.** Les clés d’opérateur de masternode, les clés de vote et les clés de quorum utilisées par les LLMQ sont des clés BLS, non des clés de la famille Schnorr, et vivent entièrement en dehors de l’arbre BIP 32 décrit ci-dessus. C’est précisément là que se trouve la signature à seuil existante de Dash — et précisément pourquoi elle ne se compose pas avec l’autorisation de dépense Orchard, comme l’expose la section suivante.

**La dérivation liée à l’identité est propre à Dash.** Les chemins sur 256 bits de DIP-0014 existent pour dériver des clés à partir de relations entre identités. C’est un concept de Dash Platform sans équivalent dans Zcash, et c’est le cas le plus clair où les deux schémas de dérivation ont divergé délibérément plutôt que par accident.

*Voir la Figure 1 pour les deux schémas d’ancrage convergeant vers un sous-arbre Orchard partagé.*

---

## FROST : la véritable question ouverte

Dash possède un système mature de signatures à seuil dans les **LLMQ basés sur BLS** (Long-Living Masternode Quorums), utilisés pour ChainLocks, InstantSend et le consensus des validateurs de Dash Platform.

[ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), au statut **Draft**, fait autre chose. Il met sous seuil les signatures Schnorr d’autorisation de dépense déjà définies par Sapling et Orchard — **RedJubjub** et **RedPallas**, respectivement — afin que, selon le propre cadrage de ZIP, *« les utilisateurs et services tiers partageant la garde d’un wallet, ou un groupe de personnes gérant des fonds partagés »* puissent exiger une approbation à seuil, telle qu’un 2-sur-3, avant une dépense. Il est catégorisé comme un ZIP de **Wallet** : il produit des signatures compatibles avec l’autorisation de dépense existante plutôt que de modifier le consensus. Il conserve un rôle de Coordinator, que le ZIP refuse explicitement de supprimer, et traite à la fois de la génération de clés par dépositaire de confiance et de la génération distribuée de clés.

La distinction qui importe, et la raison pour laquelle ce ne sont pas des substituts :

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Schéma de signature | BLS | Schnorr — RedJubjub / RedPallas |
| Qui signe | Un quorum de masternodes | Un petit groupe de détenteurs individuels de clés |
| Ce qui est autorisé | Un fait de réseau : un block lock, un transaction lock | Une dépense depuis un compte shielded |
| Couche | Consensus | Wallet |
| Espace de clés | Domaine BLS distinct | La clé d’autorisation de dépense Orchard/Sapling |
| Statut | Déployé | Draft, aucune implémentation de référence |

Le fait que Dash dispose de signatures à seuil BLS ne signifie **pas** qu’il possède, ou qu’il a besoin de, FROST. Mais cela signifie que les ingénieurs de Dash possèdent une expérience interne des signatures à seuil, de la génération distribuée de clés et de la coordination de quorums — une expérience réellement transférable s’ils choisissaient de construire cela.

*Voir la Figure 2 pour ce que chaque schéma signe réellement.*

### Ce qu’exigerait FROST sur le fork Orchard de Dash, à première vue

1. **Une cérémonie de DKG et de signature FROST sur RedPallas**, le schéma d’autorisation de dépense de Orchard — une variante Schnorr sur la courbe Pallas. Cela est distinct de la DKG BLS existante de Dash pour les LLMQ et ne peut y être réduit.
2. **Une prise en charge par le wallet et l’UX de la signature multipartite d’un unique compte shielded**, qui constitue un modèle d’interaction différent des outils de quorum de masternodes et requiert un équivalent de Coordinator.
3. **Une décision sur la couche.** Très probablement uniquement au niveau du wallet, puisque ZIP 312 est défini comme un schéma de wallet reposant sur des primitives existantes plutôt qu’une modification du consensus — mais cela doit être confirmé pour le fork Orchard de Dash spécifiquement, et non supposé à partir du périmètre de Zcash.

---

## Recommandation

**Viewing keys — documenter, ne pas rechercher.** La capacité est déployée sur les deux chaînes. Une courte note wiki indiquant que le pool shielded de Dash inclut des view keys, et renvoyant vers la feuille de route de Dash, évite que l’audience de ZecHub suppose qu’elle demeure hypothétique. Suivre la compatibilité du format filaire à mesure que les deux chaînes évoluent.

**FROST — véritable opportunité, bloquée en amont.** Cela dépend de l’arrivée de ZIP 312 à une implémentation de référence, ou du choix de Dash de construire en parallèle. ZecHub ne peut pas l’accélérer directement.

**La prochaine étape la plus utile est une conversation, non davantage de recherche documentaire.** Les personnes susceptibles de construire cela sont accessibles. Shielded Labs pilote ZIP 312 ; l’équipe d’ingénierie de Dash s’est déjà montrée positive envers le cadrage « emprunté à Zcash » autour de l’intégration Orchard. Un fil intercommunautaire reliant les deux ferait émerger davantage qu’une nouvelle série de lectures, et cette note a atteint la limite de ce que les sources publiques peuvent établir.

---

## Figures

**Figure 1 — Ancrage de la dérivation des clés : Zcash ZIP 32 et Dash DIP-0009/0014, convergeant vers un sous-arbre Orchard partagé.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figure 2 — Ce que chaque schéma à seuil signe : un quorum de masternodes attestant d’un fait de réseau, face à un groupe de détenteurs de clés autorisant une dépense shielded.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Sources

**Zcash — protocole**
- [ZIP 32 : Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — statut Final
- [ZIP 224 : Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312 : FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — statut Draft
- [ZIP 316 : Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Clés et adresses](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — composants de clés, §5.6.4

**Dash — protocole et annonces**
- [Les transactions shielded sont actives sur le mainnet Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 août 2026
- [Dash ajoute des transactions shielded à Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 février 2026
- [Feuille de route Dash](https://www.dash.org/roadmap/) — Shielded Balances, achevés en juillet 2026, Platform v4.0 ; mise à jour le 12 septembre 2026
- [DIP-0009 : Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014 : Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Documentation Dash Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [Dépôt dashpay/dips](https://github.com/dashpay/dips)

**Reportages contemporains**
- [Dash lance la technologie Zcash de Orchard dans une mise à niveau de confidentialité](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash apporte la confidentialité Zcash Orchard à la chaîne Evolution pour les transactions shielded](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Sources vérifiées le 27 septembre 2026. Dash Platform et ZIP 312 évoluent tous deux ; les figures et statuts doivent être revérifiés avant republication.*
