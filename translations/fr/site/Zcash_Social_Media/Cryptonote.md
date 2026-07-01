# De zéro à la connaissance nulle : protocole CryptoNote

**Série :** De zéro à la connaissance nulle

Un sujet intéressant aujourd’hui !  
Le protocole **CryptoNote** permet une forte confidentialité on-chain. Aujourd’hui, nous découvrons toutes ses caractéristiques clés et comment il a été mis en œuvre par plusieurs projets de confidentialité notables.

![Introduction à CryptoNote](https://pbs.twimg.com/media/FrXr5P8WIAAvx36.jpg)

---

## Contexte

Le livre blanc original de CryptoNote a été publié sous le pseudonyme **"Nicolas van Saberhagen"**.  

**Bytecoin** a été la première cryptomonnaie à mettre en œuvre le protocole. Le projet le plus connu qui l’utilise aujourd’hui est **Monero (XMR)**. Il a également été utilisé dans TurtleCoin, Aeon et plusieurs autres.

---

## Fonctionnalités principales de CryptoNote

Le protocole CryptoNote offre trois fonctionnalités principales :

1. **Intraçabilité et non-liabilité** des transactions
2. **Preuve de travail égalitaire** (résistante aux ASIC) 
3. **Émission dynamique**

---

## 1. Intraçabilité - Signatures en anneau

L’intraçabilité est principalement obtenue grâce aux **signatures en anneau**.

Lors de l’envoi d’une transaction, votre véritable clé publique est mélangée à plusieurs clés leurres (l’« anneau ») — contenant toutes le même montant de pièces. Cela rend extrêmement difficile de déterminer qui a réellement envoyé les pièces.

La **taille de l’anneau** affecte considérablement l’ensemble d’anonymat. Des anneaux plus grands offrent une meilleure confidentialité.

![Explication des signatures en anneau](https://pbs.twimg.com/media/FrXteGHXgAANE0F.png)

**Comparaison avec Zcash** :  
L’ensemble d’anonymat de Zcash correspond au nombre total de transactions *jamais* effectuées dans un pool protégé donné (bien plus grand que les tailles d’anneau typiques de CryptoNote).

---

## Ring CT (Transactions confidentielles)

Le modèle **Ring CT** a considérablement amélioré la confidentialité dans les monnaies basées sur CryptoNote.

Au lieu de seulement masquer l’expéditeur, Ring CT **obscurcit également les montants des transactions** entre l’expéditeur et le destinataire.

![Schéma de Ring CT](https://pbs.twimg.com/media/FrXuivgWYAAze7B.png)

Il utilise :
- la cryptographie sur courbes elliptiques
- les engagements de Pedersen
- le chiffrement homomorphe

Des **preuves** sont utilisées pour montrer que le montant est supérieur à 0 et se situe dans des plages valides **sans révéler les valeurs réelles**.

Les **adresses furtives** ajoutent également des adresses à usage unique pour le destinataire.

![Adresses furtives + preuves](https://pbs.twimg.com/media/FrXut5aWAAMhuRb.jpg)

---

## 2. Preuve de travail égalitaire (ePoW)

CryptoNote vise à créer un système de minage plus équitable en étant résistant aux ASIC.

Il utilise l’algorithme **CryptoNight** (une fonction gourmande en mémoire). Contrairement au SHA256 de Bitcoin, CryptoNight est conçu pour réduire l’écart entre les mineurs CPU, GPU et ASIC.

**Étapes de CryptoNight :**
1. Initialiser une grande zone mémoire (scratchpad) avec des données pseud aléatoires
2. Effectuer de nombreuses opérations de lecture/écriture sur le scratchpad
3. Hacher l’ensemble du scratchpad pour produire la valeur finale

![Minage CryptoNight](https://pbs.twimg.com/media/FrXvNs3XsAA37LG.jpg)

(Remarque : Monero s’est depuis éloigné de CryptoNight au profit d’autres algorithmes.)

---

## 3. Émission dynamique

Au lieu d’événements de halving soudains (comme Bitcoin), CryptoNote utilise une **récompense de bloc diminuant progressivement**.

Cela crée une courbe d’émission beaucoup plus fluide au fil du temps.

![Courbe d’émission dynamique](https://pbs.twimg.com/media/FrXv8wpXoAEjUxW.png)

**Lien avec Zcash** :  
Les développeurs de Zcash ont discuté de la mise en œuvre d’une courbe d’émission plus fluide à l’avenir, potentiellement via un « Zcash Posterity Fund ».

---

## Conclusion

CryptoNote s’est avéré être une approche solide et éprouvée de la confidentialité on-chain. Bon nombre de ses innovations ont influencé l’écosystème plus large des monnaies axées sur la confidentialité.

Certains chercheurs pensent que les fonctionnalités de CryptoNote pourraient éventuellement être combinées avec des pools protégés à connaissance nulle sans confiance.

---

**Fil original par ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Cette page a été compilée à partir du fil original Zero to Zero Knowledge pour le wiki ZecHub.*
