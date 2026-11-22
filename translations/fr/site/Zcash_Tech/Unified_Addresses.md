# Validation des adresses unifiées (ZIP-316)

*Ceci est un guide d'apprentissage, et non un décodeur prêt à l'emploi ni une bibliothèque de paiement à copier-coller. Il explique la structure d'une adresse unifiée afin que vous puissiez comprendre ce que font en interne les bibliothèques maintenues. Pour tout ce qui manipule des fonds réels, référez-vous à la [spécification ZIP-316](https://zips.z.cash/zip-0316) et aux implémentations officielles indiquées ci-dessous.*

---

## Vue d'ensemble

Une adresse unifiée (UA) est une chaîne d'adresse unique qui contient plusieurs types de destinataires : **Transparent**, **Sapling**, **Orchard**, ou une combinaison de ceux-ci. Le portefeuille qui effectue le paiement sélectionne automatiquement le meilleur pool de destinataire qu'il prend en charge.

Imaginez une UA comme une enveloppe scellée contenant plusieurs cartes étiquetées. Chaque carte représente un moyen différent de vous joindre. Pour vérifier une adresse, une application doit :

1. **Ouvrir l'enveloppe :** décoder la chaîne de texte.
2. **Remettre le contenu en ordre :** annuler le brouillage de protection (**F4Jumble**).
3. **Lire chaque carte :** extraire les destinataires individuels.
4. **Appliquer les règles du protocole :** ignorer ou rejeter les entrées selon leur plage de typecode.

---

## Pourquoi « il suffit de décoder le Bech32m » ne suffit pas

Une UA utilise l'encodage texte Bech32m, mais le décodage Bech32m seul ne révèle pas les destinataires utilisables.

ZIP-316 brouille délibérément la charge utile à l'aide de **F4Jumble** avant l'encodage. F4Jumble garantit que la modification d'un seul caractère de l'adresse change complètement le résultat décodé. Cela empêche les attaques par malléabilité d'adresse, dans lesquelles un attaquant échange des octets au milieu d'une adresse tout en conservant un préfixe et un suffixe d'apparence valide.

> **Règle essentielle :** la protection contre la malléabilité ne fonctionne que si votre application exécute l'intégralité de la chaîne de décodage et de validation. Un décodage partiel supprime la sécurité tout en conservant tous les risques.

---

## La chaîne de décodage, étape par étape

### Étape 1 : décoder le Bech32m et vérifier le réseau
- **Partie lisible par l'humain (HRP) :** `u` identifie le mainnet ; `utest` identifie le testnet. *(Les UA du mainnet commencent par `u1`, où `1` est le séparateur Bech32.)*
- **Limite de longueur :** le Bech32m standard impose une limite de 90 caractères. Les UA dépassent généralement cette limite ; les vérifications de longueur standard doivent donc être désactivées dans le décodeur.
- Reconvertissez les mots Bech32m de 5 bits en octets standard de 8 bits.

### Étape 2 : inverser F4Jumble
F4Jumble est un réseau de Feistel à 4 tours construit sur BLAKE2b :
- **Longueur de la moitié gauche :** `min(64, floor(length / 2))` octets. Le plafond de 64 octets correspond à la taille de sortie maximale de BLAKE2b. La moitié droite contient le reste de la charge utile.
- **Fonctions de hachage :** alterne G et H en utilisant des étiquettes de personnalisation fixes (`UA_F4Jumble_G` et `UA_F4Jumble_H`).
- **Ordre des tours :** l'encodage direct exécute G(0) → H(0) → G(1) → H(1). L'inversion (le débrouillage) exécute H(1) → G(1) → H(0) → G(0).
- **Vérification de plage :** rejetez les entrées situées en dehors des limites de taille de charge utile de ZIP-316.

### Étape 3 : supprimer le remplissage et vérifier le HRP
Avant le brouillage, l'encodeur ajoute 16 octets contenant le HRP, complétés par des zéros.
- Supprimez les 16 derniers octets après le débrouillage.
- Vérifiez que le HRP intégré correspond au réseau attendu (`u` ou `utest`). Cela empêche que des adresses du testnet soient acceptées par erreur sur le mainnet.

### Étape 4 : extraire les destinataires
La charge utile restante se compose d'entrées `(typecode, length, content)`, où le typecode et la longueur sont stockés sous forme d'entiers compact-size (un seul octet pour les petites valeurs). Typecodes de destinataires connus :

| Typecode | Type de destinataire | Longueur du contenu |
| :------- | :------------------ | :------------- |
| `0x00`   | Transparent (P2PKH) | 20 octets       |
| `0x01`   | Transparent (P2SH)  | 20 octets       |
| `0x02`   | Sapling             | 43 octets       |
| `0x03`   | Orchard             | 43 octets       |

Au-delà de ceux-ci, ZIP-316 réserve deux autres plages pour la compatibilité future :

- **`0xC0`–`0xDF` (métadonnées non MUST-understand) :** les consommateurs doivent ignorer les éléments de métadonnées qu'ils ne reconnaissent pas dans cette plage.
- **`0xE0` et `0xE1` (métadonnées d'expiration MUST-understand attribuées) :** le registre actuel de ZIP-316 les attribue à la hauteur et à l'heure d'expiration de l'adresse. Les consommateurs doivent comprendre ces éléments ou rejeter l'adresse.
- **`0xE2`–`0xFC` (métadonnées MUST-understand non attribuées) :** les consommateurs doivent rejeter l'adresse s'ils rencontrent un élément non reconnu dans cette plage.

Pour les types de destinataires connus, vérifiez que la longueur encodée correspond à la longueur de contenu spécifiée pour le type. Pour les éléments de métadonnées, utilisez leur longueur compact-size encodée pour déterminer la longueur du contenu. Rejetez les entrées tronquées ainsi que tout octet résiduel.

**Ordre de préférence des destinataires.** Une fois qu'une adresse a été analysée avec succès, un portefeuille ou un outil de paiement doit choisir le meilleur destinataire dans cet ordre : Orchard, puis Sapling, puis transparent.

---

## Règles de rejet obligatoires de ZIP-316

**Un décodage réussi ne rend pas une adresse valide.** Les portefeuilles officiels Zcash rejettent strictement les adresses qui enfreignent les règles suivantes. Les outils web doivent également les rejeter afin d'éviter les échecs de paiement :

- **Absence de destinataires protégés :** l'adresse **doit** contenir au moins un destinataire Sapling ou Orchard. Une UA ne comportant que des destinataires transparents est invalide selon ZIP-316.
- **Typecodes en double :** chaque type de destinataire ne peut apparaître qu'une seule fois au maximum.
- **Typecodes non triés :** les destinataires doivent apparaître dans l'ordre strictement croissant des typecodes.
- **Destinataires transparents incompatibles :** une UA peut contenir soit un P2PKH, soit un P2SH, mais **jamais les deux**.
- **Entrées ou remplissage mal formés :** des préfixes réseau incohérents, des charges utiles tronquées ou des longueurs incohérentes doivent entraîner un rejet immédiat.
- **Typecodes non reconnus :** les consommateurs doivent ignorer les éléments non reconnus, sauf ceux de la plage de métadonnées MUST-understand (`0xE0`–`0xFC`), qu'ils doivent rejeter lorsqu'ils ne les reconnaissent pas. Dans le registre actuel, `0xE0` et `0xE1` sont des types d'expiration attribués, tandis que `0xE2`–`0xFC` ne sont pas attribués. Indépendamment de cela, rejetez toute adresse qui ne respecte pas les règles de validité obligatoires ci-dessus, y compris l'exigence d'un destinataire Sapling ou Orchard.

---

## Bonnes pratiques pour les développeurs

- **Comparez les destinataires analysés, et non les chaînes brutes.** Décodez d'abord les adresses avant de vérifier leur égalité.
- **Utilisez des bibliothèques maintenues pour tout ce qui manipule des fonds.** Compilez les crates officiels Rust (comme `zcash_address`) en WebAssembly plutôt que de déployer des décodeurs JavaScript personnalisés.
- **Soyez prudent avec les analyseurs écrits à la main.** Si vous en écrivez un pour apprendre, considérez-le comme un projet d'étude et testez-le avec les vecteurs officiels ci-dessous avant de lui confier quoi que ce soit.

---

## Spécifications officielles et implémentations de référence

- **[ZIP-316 : adresses unifiées et Viewing Keys](https://zips.z.cash/zip-0316)**
- **[Crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[Crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vecteurs de test officiels :**
  - [Vecteurs de test F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vecteurs de test des adresses unifiées](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossaire

| Terme | Signification |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Chaîne d'adresse unique regroupant plusieurs pools de destinataires. |
| **Receiver** | Type précis de destination de paiement (transparent, Sapling ou Orchard). |
| **Bech32m** | Schéma d'encodage texte utilisé pour les chaînes UA. |
| **HRP** | Partie lisible par l'humain ou préfixe réseau (`u` ou `utest`). |
| **F4Jumble** | Algorithme d'obfuscation réversible garantissant l'intégrité de l'adresse. |
| **Typecode** | Nombre présent dans chaque entrée qui définit le type de destinataire dans la charge utile. |
| **Malleability** | Modification non autorisée des octets d'une adresse sans détection. |

Voir aussi : [Viewing Keys](./Viewing_Keys.md)
