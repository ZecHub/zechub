# Zero to Zero Knowledge : les phrases de récupération mnémoniques

**Série :** Zero to Zero Knowledge

Les phrases de récupération mnémoniques sont à la base de l'un des aspects les plus importants des cryptomonnaies : l'**autoconservation**.  
Aujourd'hui, nous allons voir comment une phrase de récupération est générée puis utilisée dans les portefeuilles.

---

## Que sont les phrases de récupération mnémoniques ?

La spécification **BIP-39** définit les phrases de récupération. C'est aujourd'hui le type de phrase de récupération le plus courant.

Pour créer une phrase de récupération, on commence par générer de l'**aléa**. Plus il y a d'entropie, plus la sécurité est élevée. Une entropie de **128 bits** est jugée suffisante pour la plupart des utilisateurs.

![Concept de phrase de récupération](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Selon la longueur de l'entropie initiale, la phrase de récupération comptera **de 12 à 24 mots**.

---

## Étape par étape : comment est générée une phrase de récupération de 12 mots

### 1. Générer l'entropie
Nous commençons par générer **128 bits** d'entropie.

### 2. Ajouter une somme de contrôle
Nous hachons l'entropie avec **SHA256**. Les premiers bits de ce hachage forment la somme de contrôle.  
Nous obtenons ainsi une empreinte unique de notre entropie.

![Diagramme entropie + somme de contrôle](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Découper en blocs de 11 bits
Les 132 bits au total (128 bits d'entropie + 4 bits de somme de contrôle) sont découpés en blocs de 11 bits.

### 4. Faire correspondre avec la liste de mots
Chaque séquence de 11 bits est convertie en un nombre décimal (de 0 à 2047).  
Les listes de mots BIP-39 contiennent exactement **2048 mots** (en anglais, en espagnol, en chinois, etc.).

Ces nombres servent à trouver le mot correspondant dans la liste de mots.

![Exemple de correspondance des mots](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Résultat :** nous disposons maintenant d'une phrase de récupération de 12 mots, sûre et lisible par un humain !

---

## De la phrase de récupération à la graine, puis aux adresses de paiement

À partir de la phrase de récupération, un portefeuille peut générer des clés qui servent à créer des adresses de paiement et différents comptes de portefeuille.

Les clés générées sont **déterministes** : une même entrée produit toujours le même résultat.

### Génération de la graine
La graine du portefeuille est dérivée de la phrase mnémonique au moyen d'une **fonction de dérivation de clé (KDF)** :

- Dans **Bitcoin** : PBKDF2  
- Dans **Zcash** : Blake2b-256/512

On obtient ainsi une graine de **64 octets (512 bits)**.

![De la graine aux clés maîtresses](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Clés maîtresses
La graine est divisée en deux séquences de 32 octets :
- **Clé de dépense maîtresse**
- **Code de chaîne maître**

Les **portefeuilles hiérarchiques déterministes (HD)** les utilisent pour dériver les clés enfants.

---

## Fonctionnalités propres à Zcash (ZIP-32)

Dans Zcash, l'**autorité de lecture** ou l'**autorité de dépense** peut être déléguée séparément pour des sous-arbres sans compromettre la graine maîtresse.

**ZIP-32** définit la norme de génération de clés hiérarchique déterministe adaptée aux fonctionnalités de confidentialité de Zcash.

À partir d'une **clé de dépense étendue**, on dérive :
- Full Viewing Key
- Incoming Viewing Key
- Un ensemble d'adresses de paiement

Différents mécanismes de dérivation produisent des adresses externes, que vous pouvez communiquer aux expéditeurs dans tous les pools protégés (Sapling et Orchard).

![Hiérarchie de dérivation des clés Zcash](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

Zcash prend aussi en charge des **adresses internes** pour les opérations du portefeuille, comme l'auto-protection.

---

## Ressources

- [ZIP-32 : portefeuilles hiérarchiques déterministes protégés](https://zips.z.cash/zip-0032)  
- [Spécification du protocole Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Présentation des portefeuilles protégés par défaut](https://zechub.wiki)

---

**Fil original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Cette page a été rédigée pour le wiki ZecHub à partir du fil Zero to Zero Knowledge original.*
