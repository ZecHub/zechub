# De zéro à la connaissance zéro : transactions transparentes vs protégées et Unified Address

**Série :** De zéro à la connaissance zéro

Si vous découvrez Zcash pour la première fois, vous constaterez qu’il existe deux types de transactions disponibles : **Transparentes** et **Protégées**.  

Aujourd’hui, nous allons les découvrir et aborder l’une des nouvelles fonctionnalités de l’écosystème #Zcash, les **Unified Address**.

---

## Transactions transparentes vs protégées

- Les **transactions transparentes** utilisent des **t-addresses** (encodées en Base58). Tout est visible publiquement, comme avec Bitcoin.  
- Les **transactions protégées** utilisent des adresses encodées pour les pools **Sapling** ou **Orchard**. Celles-ci masquent l’expéditeur, le destinataire et le montant grâce aux preuves à divulgation nulle de connaissance.

Une **transaction protégée** désigne toute transaction comportant des adresses encodées pour les pools Sapling/Orchard.

![Introduction aux transactions transparentes vs protégées](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

Les **Unified Address (UA)** sont conçues pour **unifier** les transactions protégées ou transparentes dans une seule adresse.

---

## Types d’adresses dans Zcash

Il existe 3 types d’adresses en usage :

1. **(T) Transparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Le nombre de caractères (et donc la taille du code QR) augmente avec chaque type.

![Comparaison des types d’adresses](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![Comparaison de la taille des codes QR](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Fonctionnement des Unified Address

Les adresses et les clés sont encodées sous forme de séquence d’octets (**Raw Encoding**).  
Un **Receiver Encoding** inclut toutes les informations nécessaires pour transférer un actif en utilisant un protocole spécifique.

Le raw encoding d’une Unified Address est une combinaison des encodages (typecode, length, addr) des receveurs :

- UA : `0x03`  
- Sapling : `0x02`  
- Transparente : `0x01`  

**Important** : Il doit y avoir **au moins une adresse de paiement protégée** dans chaque UA. (Les adresses Sprout ne sont plus prises en charge après la mise à niveau Canopy.)

![Structure d’encodage UA](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Spécification complète : **[ZIP-316 : Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Avantages des Unified Address

- **Plus simple pour les plateformes d’échange** - Elles peuvent désormais prendre en charge les dépôts/retraits protégés de manière plus sûre.  
- **Pérennes** - De nouveaux pools protégés peuvent être ajoutés sans casser les portefeuilles.  
- **Protégé par défaut** - Chaque UA contient au moins une adresse protégée, la confidentialité est donc toujours disponible.

Il s’agit d’un changement fondamental qui aide déjà davantage de ZEC à rejoindre le pool protégé.

---

## Transactions Orchard et Actions

Orchard a introduit un nouveau concept appelé **Actions** :

- Elles réduisent la fuite de métadonnées en utilisant une **ancre unique** pour toutes les Actions d’une transaction.  
- Elles fusionnent les champs de (V4) Spend + Output en un seul engagement de valeur.  
- Cela permet des optimisations de performance du système de preuve Halo2.

Daira explique les positions d’ancrage (zcon3) :

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

## Équilibre de valeur et confidentialité

Dans certains cas (par ex. les transactions inter-pools), les montants peuvent être visibles par un observateur externe. Cependant, `valueBalanceSapling` et `valueBalanceOrchard` utilisent des **engagements homomorphes** pour prouver la quantité totale de ZEC dans les pools protégés et empêcher la contrefaçon.

Pour en savoir plus : [Défense contre la contrefaçon dans les pools protégés](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Améliorations futures

L’équipe ECC travaille sur de nouvelles méthodes RPC dans `zcashd` (remplaçant `z_sendmany`) qui permettront aux utilisateurs de prévisualiser une transaction proposée et de l’accepter ou la rejeter en fonction de ses caractéristiques de confidentialité.

---

## Recommandation

Essayez la dernière version de **YWallet** !  
Elle affiche déjà un "plan de transaction" à l’écran avant que vous n’appuyiez sur envoyer, ce qui vous aide à faire des choix plus respectueux de la confidentialité.

Excellent article sur la confidentialité des transactions : https://medium.com/@hanh.huynh/

---

**Fil original par ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Cette page a été compilée à partir du fil original Zero to Zero Knowledge pour le wiki ZecHub.*
