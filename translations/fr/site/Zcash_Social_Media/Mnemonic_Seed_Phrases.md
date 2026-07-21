# De zéro à Zero Knowledge : les phrases mnémoniques de récupération

**Série :** Zero to Zero Knowledge

Les phrases mnémoniques de récupération sous-tendent l’un des aspects les plus importants des cryptomonnaies : la **garde autonome**.  
Aujourd’hui, nous allons apprendre comment une phrase de récupération est générée et utilisée dans les portefeuilles.

---

## Que sont les phrases mnémoniques de récupération ?

Les phrases de récupération sont définies par la spécification **BIP-39**, le type de phrase de récupération le plus couramment utilisé aujourd’hui.

La création des phrases de récupération commence par la génération d’**aléa**. Plus il y a d’entropie, plus la sécurité est élevée. **128 bits** d’entropie sont considérés comme suffisants pour la plupart des utilisateurs.

![Concept de phrase de récupération](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Selon la longueur de l’entropie initiale, la phrase de récupération comportera **12 à 24 mots**.

---

## Étape par étape : comment une phrase de récupération de 12 mots est générée

### 1. Générer l’entropie
Nous commençons par générer **128 bits** d’entropie.

### 2. Ajouter la somme de contrôle
Nous hachons l’entropie avec **SHA256**. Les premiers bits de ce hachage deviennent la somme de contrôle.  
Cela nous donne une empreinte unique pour notre entropie.

![Schéma Entropie + Somme de contrôle](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Diviser en segments de 11 bits
Les 132 bits au total (128 d’entropie + 4 de somme de contrôle) sont séparés en segments de 11 bits.

### 4. Associer à la liste de mots
Chaque séquence de 11 bits est convertie en nombre décimal (0-2047).  
Les listes de mots BIP-39 contiennent exactement **2048 mots** (anglais, espagnol, chinois, etc.).

Ces nombres sont utilisés pour trouver le mot correspondant dans la liste.

![Exemple d’association des mots](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Résultat :** nous avons maintenant une phrase de récupération sécurisée, lisible par l’humain, de 12 mots !

---

## De la phrase de récupération -> seed -> adresses de paiement

À l’aide de la phrase de récupération, un portefeuille peut générer des clés pour créer des adresses de paiement et différents comptes de portefeuille.

Les clés générées sont **déterministes** : la même entrée produit toujours la même sortie.

### Génération du seed
Le seed du portefeuille est dérivé de la phrase mnémonique à l’aide d’une **fonction de dérivation de clé (KDF)** :

- Dans **Bitcoin** : PBKDF2  
- Dans **Zcash** : Blake2b-256/512

Cela produit un seed de **64 octets (512 bits)**.

![Du seed aux clés maîtresses](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Clés maîtresses
Le seed est divisé en deux séquences de 32 octets :
- **Clé maîtresse de dépense**
- **Code de chaîne maître**

Elles sont utilisées dans les **portefeuilles déterministes hiérarchiques (HD)** pour la dérivation des clés enfants.

---

## Fonctionnalités spécifiques à Zcash (ZIP-32)

Dans Zcash, l’**autorité de visualisation** ou l’**autorité de dépense** peut être déléguée indépendamment pour des sous-arbres sans compromettre le seed maître.

**ZIP-32** définit la norme de génération de clés déterministes hiérarchiques adaptée aux fonctionnalités de confidentialité de Zcash.

À partir d’une **Expanded Spending Key**, nous dérivons :
- Full Viewing Key
- Incoming Viewing Key
- Ensemble d’adresses de paiement

Différents mécanismes de dérivation produisent des adresses externes adaptées au partage avec des expéditeurs à travers les pools protégés (Sapling & Orchard).

![Hiérarchie de dérivation des clés Zcash](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash prend également en charge les **adresses internes** pour les opérations de portefeuille telles que l’Auto-Shielding.

---

## Ressources

- [ZIP-32 : portefeuilles déterministes hiérarchiques protégés](https://zips.z.cash/zip-0032)  
- [Spécification du protocole Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Aperçu des portefeuilles protégés par défaut](https://zechub.wiki)

---

**Fil original par ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Cette page a été compilée à partir du fil original Zero to Zero Knowledge pour le wiki ZecHub.*
