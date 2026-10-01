# Unified Address (ZIP-316) Validation

*Ce guide est destiné à l’apprentissage, et non un décodeur prêt à l’emploi ni une bibliothèque de paiement à copier-coller. Il explique comment une Unified Address est structurée afin que vous puissiez comprendre ce que font les bibliothèques maintenues en coulisses. Pour tout ce qui manipule de vrais fonds, référez-vous à la [spécification ZIP-316](https://zips.z.cash/zip-0316) et aux implémentations officielles liées ci-dessous.*

---

## Vue d’ensemble

Une Unified Address (UA) est une chaîne d’adresse unique qui comporte plusieurs types de receivers : **Transparent**, **Sapling**, **Orchard**, ou une combinaison de ceux-ci. Le wallet payeur sélectionne automatiquement le meilleur pool de receivers qu’il prend en charge.

Imaginez une UA comme une enveloppe scellée contenant plusieurs cartes étiquetées. Chaque carte représente une manière différente de vous atteindre. Pour vérifier une adresse, une application doit :

1. **Ouvrir l’enveloppe :** Décoder la chaîne de texte.
2. **Remettre le contenu dans l’ordre :** Annuler le brouillage protecteur (**F4Jumble**).
3. **Lire chaque carte :** Extraire les receivers individuels.
4. **Appliquer les règles du protocole :** Ignorer ou rejeter les entrées selon leur plage de typecode.

---

## Pourquoi « simplement décoder Bech32m » ne suffit pas

Une UA utilise l’encodage texte Bech32m, mais le seul décodage de Bech32m ne révèle pas les receivers utilisables.

ZIP-316 brouille délibérément la charge utile avec **F4Jumble** avant l’encodage. F4Jumble garantit que la modification d’un seul caractère de l’adresse change complètement la sortie décodée. Cela empêche les attaques de malléabilité des adresses, dans lesquelles un attaquant échange des octets au milieu d’une adresse tout en laissant le préfixe et le suffixe paraître valides.

> **Règle essentielle :** La protection contre la malléabilité ne fonctionne que si votre application exécute l’intégralité du pipeline de décodage et de validation. Un décodage partiel supprime la sécurité tout en conservant tous les risques.

---

## Le pipeline de décodage, étape par étape

### Étape 1 : Décoder Bech32m et vérifier le réseau
- **Partie lisible par l’humain (HRP) :** `u` identifie le mainnet ; `utest` identifie le testnet. *(Les UA du mainnet commencent par `u1`, où `1` est le séparateur Bech32.)*
- **Limite de longueur :** Bech32m standard impose une limite de 90 caractères. Les UA dépassent généralement cette limite ; les vérifications de longueur standard doivent donc être désactivées dans le décodeur.
- Convertissez les mots Bech32m de 5 bits en octets standard de 8 bits.

### Étape 2 : Inverser F4Jumble
F4Jumble est un réseau de Feistel à 4 tours basé sur BLAKE2b :
- **Longueur de la moitié gauche :** `min(64, floor(length / 2))` octets. Le plafond de 64 octets correspond à la taille de sortie maximale de BLAKE2b. La moitié droite contient le reste de la charge utile.
- **Fonctions de hachage :** Alterne G et H en utilisant des libellés de personnalisation fixes (`UA_F4Jumble_G` et `UA_F4Jumble_H`).
- **Ordre des tours :** L’encodage direct exécute G(0) → H(0) → G(1) → H(1). L’inversion (débrouillage) exécute H(1) → G(1) → H(0) → G(0).
- **Vérification de plage :** Rejetez les entrées en dehors des limites de taille de charge utile de ZIP-316.

### Étape 3 : Supprimer le remplissage et vérifier la HRP
Avant le brouillage, l’encodeur ajoute 16 octets contenant la HRP, complétés par des zéros.
- Supprimez les 16 derniers octets après le débrouillage.
- Confirmez que la HRP intégrée correspond au réseau attendu (`u` ou `utest`). Cela évite que des adresses testnet soient acceptées par erreur sur le mainnet.

### Étape 4 : Extraire les receivers
La charge utile restante se compose d’entrées `(typecode, length, content)`, où le typecode et la longueur sont stockés sous forme d’entiers de taille compacte (un seul octet pour les petites valeurs). Typecodes de receivers connus :

| Typecode | Type de receiver       | Longueur du contenu |
| :------- | :--------------------- | :------------------ |
| `0x00`   | Transparent (P2PKH)    | 20 octets           |
| `0x01`   | Transparent (P2SH)     | 20 octets           |
| `0x02`   | Sapling                 | 43 octets           |
| `0x03`   | Orchard                 | 43 octets           |

Au-delà de ceux-ci, ZIP-316 réserve deux plages supplémentaires pour la compatibilité future :

- **`0xC0`–`0xDF` (métadonnées non MUST-understand) :** les consommateurs doivent ignorer les éléments de métadonnées non reconnus dans cette plage.
- **`0xE0` et `0xE1` (métadonnées d’expiration MUST-understand attribuées) :** le registre actuel de ZIP-316 les attribue respectivement à la hauteur et à l’heure d’expiration de l’adresse. Les consommateurs doivent comprendre ces éléments ou rejeter l’adresse.
- **`0xE2`–`0xFC` (métadonnées MUST-understand non attribuées) :** les consommateurs doivent rejeter l’adresse s’ils rencontrent un élément non reconnu dans cette plage.

Pour les types de receivers connus, vérifiez que la longueur encodée correspond à la longueur de contenu spécifiée pour ce type. Pour les éléments de métadonnées, utilisez leur longueur encodée de taille compacte afin de déterminer la longueur du contenu. Rejetez les entrées tronquées ou tout octet final superflu.

**Ordre de préférence des receivers.** Une fois une adresse analysée avec succès, un wallet ou un outil de paiement devrait choisir le meilleur receiver dans cet ordre : Orchard, puis Sapling, puis transparent.

---

## Règles de rejet obligatoires de ZIP-316

**Un décodage réussi ne rend pas une adresse valide.** Les wallets Zcash officiels rejettent strictement les adresses qui enfreignent les règles suivantes. Les outils Web doivent également les rejeter afin d’éviter les échecs de paiement :

- **Receivers blindés manquants :** L’adresse **doit** contenir au moins un receiver Sapling ou Orchard. Une UA comportant uniquement des receivers transparents est invalide selon ZIP-316.
- **Typecodes dupliqués :** Chaque type de receiver ne peut apparaître qu’une seule fois au maximum.
- **Typecodes non triés :** Les receivers doivent apparaître dans un ordre strictement croissant de typecode.
- **Receivers transparents conflictuels :** Une UA peut contenir soit P2PKH, soit P2SH, mais **jamais les deux**.
- **Entrées ou remplissage malformés :** Les préfixes réseau non concordants, les charges utiles tronquées ou les longueurs non concordantes doivent entraîner un rejet immédiat.
- **Typecodes non reconnus :** Les consommateurs doivent ignorer les éléments non reconnus, sauf ceux de la plage de métadonnées MUST-understand (`0xE0`–`0xFC`), qu’ils doivent rejeter lorsqu’ils ne sont pas reconnus. Dans le registre actuel, `0xE0` et `0xE1` sont des types d’expiration attribués, tandis que `0xE2`–`0xFC` ne sont pas attribués. Indépendamment de cela, rejetez toute adresse qui échoue aux règles de validité obligatoires ci-dessus, y compris l’exigence d’un receiver Sapling ou Orchard.

---

## Bonnes pratiques pour les développeurs

- **Comparez les receivers analysés, pas les chaînes brutes.** Décodez d’abord les adresses avant de vérifier leur égalité.
- **Utilisez des bibliothèques maintenues pour tout ce qui manipule des fonds.** Compilez des crates Rust officielles (comme `zcash_address`) vers WebAssembly plutôt que de déployer des décodeurs JavaScript personnalisés.
- **Soyez prudent avec les analyseurs écrits à la main.** Si vous en écrivez un pour apprendre, considérez-le comme un projet d’étude et testez-le avec les vecteurs officiels ci-dessous avant de lui confier quoi que ce soit.

---

## Spécifications officielles et implémentations de référence

- **[ZIP-316 : Adresses unifiées et Viewing Keys](https://zips.z.cash/zip-0316)**
- **[crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vecteurs de test officiels :**
  - [Vecteurs de test F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vecteurs de test Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossaire

| Terme | Signification |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Chaîne d’adresse unique regroupant plusieurs pools de receivers. |
| **Receiver** | Type de destination de paiement spécifique (transparent, Sapling ou Orchard). |
| **Bech32m** | Schéma d’encodage texte utilisé pour les chaînes UA. |
| **HRP** | Partie lisible par l’humain ou préfixe réseau (`u` ou `utest`). |
| **F4Jumble** | Algorithme d’obfuscation réversible garantissant l’intégrité de l’adresse. |
| **Typecode** | Nombre dans chaque entrée définissant le type de receiver dans la charge utile. |
| **Malleability** | Modification non autorisée des octets d’une adresse sans détection. |

Voir aussi : [Viewing Keys](./Viewing_Keys.md)
