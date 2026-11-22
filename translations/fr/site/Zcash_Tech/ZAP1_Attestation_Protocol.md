# Protocole d'attestation ZAP1

ZAP1 est un protocole d'attestation open source pour Zcash. Il inscrit des événements structurés du cycle de vie dans un arbre Merkle BLAKE2b et ancre la racine de l'arbre on-chain au moyen de mémos protégés Orchard. Les preuves sont vérifiables publiquement. Les données des événements restent privées.

## Fonctionnement

Les opérateurs enregistrent des types d'événements (déploiements, paiements, transferts, etc.) et les soumettent à une instance ZAP1. Chaque événement produit un hachage de feuille à l'aide de BLAKE2b-256 avec séparation de domaine. Les feuilles s'accumulent dans un arbre Merkle. Lorsqu'un seuil est atteint, la racine de l'arbre est encodée sous forme de mémo ZAP1:09 et ancrée dans Zcash au sein d'une transaction protégée.

Toute personne disposant d'un hachage de feuille peut vérifier le chemin complet de la feuille à la racine, puis jusqu'à l'ancrage on-chain, sans avoir à faire confiance à l'opérateur.

## Propriétés principales

- **Indépendant de l'application** : tout opérateur Zcash peut définir ses propres types d'événements et chaînes de personnalisation
- **Respectueux de la confidentialité** : le contenu des événements est haché avant l'ancrage. Seuls les hachages sont inscrits on-chain.
- **Vérifiable de manière indépendante** : la vérification ne nécessite que le lot de preuves et un accès à la chaîne. Aucune confiance envers l'opérateur n'est requise.
- **Compatible avec ZIP 302** : ZAP1 converge vers un partType ZIP 302 pour le contenu d'attestation

## Ce qui existe

- Implémentation de référence (Rust, sous licence MIT)
- SDK de vérification sur crates.io (Rust + 83 Ko de WASM)
- SDK JavaScript sur npm
- Décodeur de mémos universel (identifie les mémos ZAP1, ZIP 302 TVLV, texte, binaires et vides)
- Kit de conformité comprenant 29 vérifications d'API et 14 vérifications de protocole
- Conception de signature à seuil 2 sur 3 FROST pour la diffusion d'ancrages multipartite
- Projet de PR #1243 ZIP en cours d'examen
- 4 ancrages sur le mainnet avec 14 feuilles en mars 2026

## Architecture

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Chaque opérateur exécute sa propre instance ZAP1 avec ses propres clés, son propre arbre Merkle et ses propres ancrages. Aucun état n'est partagé entre les opérateurs.

## Pour en savoir plus

- Code source : [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK de vérification : [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Décodeur de mémos : [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Spécification du protocole : [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Projet ZIP : [PR #1243](https://github.com/zcash/zips/pull/1243)
- API en ligne : [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Guide de l'opérateur : [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
