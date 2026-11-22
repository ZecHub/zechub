# Zero to Zero Knowledge : transactions transparentes ou protégées et adresses unifiées

**Série :** Zero to Zero Knowledge

Si vous découvrez Zcash, vous verrez qu'il existe deux types de transactions : les transactions **transparentes** et les transactions **protégées**.  

Aujourd'hui, nous allons les présenter et aborder l'une des nouvelles fonctionnalités de l'écosystème #Zcash : les **adresses unifiées**.

---

## Transactions transparentes ou protégées

- Les **transactions transparentes** utilisent des **adresses t** (encodées en Base58). Tout est visible publiquement, exactement comme sur Bitcoin.  
- Les **transactions protégées** utilisent des adresses encodées pour les pools **Sapling** ou **Orchard**. Elles masquent l'expéditeur, le destinataire et le montant grâce à des preuves à divulgation nulle de connaissance.

Une **transaction protégée** désigne toute transaction dont les adresses sont encodées pour les pools Sapling/Orchard.

![Introduction : transparent ou protégé](/content-images/FpmW00HWIAIZpQD-a244cfd85d.webp)

Les **adresses unifiées (UA)** sont conçues pour **réunir** les transactions protégées ou transparentes dans une seule adresse.

---

## Types d'adresses dans Zcash

Trois types d'adresses sont utilisés :

1. **(T) Transparente** : Base58  
2. **(Z) Sapling** : Bech32  
3. **(UA) Adresse unifiée** : Bech32m  

Le nombre de caractères (et donc la taille du code QR) augmente d'un type à l'autre.

![Comparaison des types d'adresses](/content-images/FpmXe5bXsAEFeLY-704048927f.webp)

![Comparaison de la taille des codes QR](/content-images/FpmXmDwXoAIWxov-dfc8346ffc.webp)

---

## Fonctionnement des adresses unifiées

Les adresses et les clés sont encodées sous forme de séquence d'octets (**encodage brut**).  
Un **encodage de récepteur** contient toutes les informations nécessaires pour transférer un actif à l'aide d'un protocole donné.

L'encodage brut d'une adresse unifiée combine les encodages (typecode, longueur, adresse) des récepteurs :

- UA : `0x03`  
- Sapling : `0x02`  
- Transparente : `0x01`  

**Important** : chaque UA doit contenir **au moins une adresse de paiement protégée**. (Les adresses Sprout ne sont plus prises en charge depuis la mise à niveau Canopy.)

![Structure d'encodage des UA](/content-images/FpmYW1ZXgAAvALT-70903e29c6.webp)

Spécification complète : **[ZIP-316 : adresses unifiées](https://zips.z.cash/zip-0316)**

---

## Avantages des adresses unifiées

- **Plus simple pour les exchanges** : ils peuvent désormais prendre en charge les dépôts et retraits protégés de manière plus sûre.  
- **Pérennes** : de nouveaux pools protégés peuvent être ajoutés sans casser les portefeuilles.  
- **Protégées par défaut** : chaque UA contient au moins une adresse protégée, la confidentialité est donc toujours disponible.

Il s'agit d'un changement fondamental qui aide déjà davantage de ZEC à rejoindre le pool protégé.

---

## Transactions et actions Orchard

Orchard a introduit un nouveau concept appelé **actions** :

- Elles réduisent la fuite de métadonnées en utilisant une **ancre unique** pour toutes les actions d'une transaction.  
- Elles fusionnent les champs Spend + Output (V4) en un seul engagement de valeur.  
- Cela permet d'optimiser les performances du système de preuves Halo2.

Daira explique les positions d'ancre (zcon3) :

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Solde de valeur et confidentialité

Dans certains cas (p. ex. les transactions entre pools), les montants peuvent être visibles par un observateur extérieur. Cependant, `valueBalanceSapling` et `valueBalanceOrchard` utilisent des **engagements homomorphes** pour prouver le total de ZEC dans les pools protégés et empêcher la contrefaçon.

En savoir plus : [ZIP 209 : interdire les soldes de pools de valeur de la chaîne hors limites](https://zips.z.cash/zip-0209)

---

## Améliorations futures

L'équipe ECC travaille sur de nouvelles méthodes RPC dans `zcashd` (qui remplace `z_sendmany`) qui permettront aux utilisateurs de prévisualiser une transaction proposée, puis de l'accepter ou de la rejeter en fonction de ses caractéristiques de confidentialité.

---

## Recommandation

Ce fil recommandait à l'origine **YWallet**, pour le plan de transaction qu'il affichait avant l'envoi. YWallet n'est plus maintenu et ne sera pas mis à jour pour Ironwood : il ne peut donc plus suivre la chaîne. Choisissez plutôt un portefeuille maintenu sur la page [Portefeuilles](https://zechub.wiki/wallets), de préférence un portefeuille qui vous indique ce qu'une transaction révélera avant son envoi.

Excellent article sur la confidentialité des transactions : https://medium.com/@hanh.huynh/

---

**Fil original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Cette page a été compilée à partir du fil Zero to Zero Knowledge original pour le wiki ZecHub.*
