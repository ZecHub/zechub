# Protocole d’attestation ZAP1

ZAP1 est un protocole d’attestation open source pour Zcash. Il écrit des événements de cycle de vie structurés dans un arbre de Merkle BLAKE2b et ancre la racine de l’arbre on-chain via des mémos blindés Orchard. Les preuves sont vérifiables publiquement. Les données des événements restent privées.

## Comment cela fonctionne

Les opérateurs enregistrent des types d’événements (déploiements, paiements, transferts, etc.) et les soumettent à une instance ZAP1. Chaque événement produit un hachage feuille en utilisant BLAKE2b-256 avec séparation de domaine. Les feuilles s’accumulent dans un arbre de Merkle. Lorsqu’un seuil est atteint, la racine de l’arbre est encodée sous forme de mémo ZAP1:09 et ancrée à Zcash dans une transaction blindée.

Quiconque possède un hachage feuille peut vérifier le chemin complet de la feuille jusqu’à la racine puis jusqu’à l’ancrage on-chain, sans avoir à faire confiance à l’opérateur.

## Propriétés clés

- **Indépendant de l’application** : tout opérateur Zcash peut définir ses propres types d’événements et chaînes de personnalisation
- **Préservant la confidentialité** : les charges utiles des événements sont hachées avant l’ancrage. Seuls les hachages vont on-chain.
- **Vérifiable indépendamment** : la vérification ne nécessite que le bundle de preuve et un accès à la chaîne. Aucune confiance envers l’opérateur n’est requise.
- **Compatible ZIP 302** : ZAP1 converge vers un partType ZIP 302 pour la charge utile d’attestation

## Ce qui existe

- Implémentation de référence (Rust, sous licence MIT)
- SDK de vérification sur crates.io (Rust + 83KB WASM)
- SDK JavaScript sur npm
- Décodeur universel de mémos (identifie ZAP1, ZIP 302 TVLV, texte, binaire et mémos vides)
- Kit de conformité avec 29 vérifications d’API et 14 vérifications de protocole
- Conception de signature à seuil FROST 2-of-3 pour la diffusion d’ancrages multi-parties
- Projet de ZIP PR #1243 en cours d’examen
- 4 ancrages mainnet avec 14 feuilles en date de mars 2026

## Architecture

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Chaque opérateur exécute sa propre instance ZAP1 avec ses propres clés, son propre arbre de Merkle et ses propres ancrages. Aucun état partagé entre les opérateurs.

## Où en apprendre davantage

- Source : [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK de vérification : [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Décodeur de mémos : [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Spécification du protocole : [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Projet de ZIP : [PR #1243](https://github.com/zcash/zips/pull/1243)
- API en direct : [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Guide de l’opérateur : [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
