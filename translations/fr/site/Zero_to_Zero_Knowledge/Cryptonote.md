# Zero to Zero Knowledge : le protocole CryptoNote

**Série :** Zero to Zero Knowledge

Un sujet intéressant aujourd'hui !  
Le protocole **CryptoNote** permet une forte confidentialité on-chain. Aujourd'hui, nous découvrons toutes ses caractéristiques clés et la manière dont il a été mis en œuvre par plusieurs projets de confidentialité notables.

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## Contexte

Le livre blanc original de CryptoNote a été publié sous le pseudonyme **« Nicolas van Saberhagen »**.  

**Bytecoin** a été la première cryptomonnaie à mettre en œuvre le protocole. Le projet le plus connu qui l'utilise aujourd'hui est **Monero (XMR)**. Il a également été utilisé dans TurtleCoin, Aeon et plusieurs autres.

---

## Caractéristiques principales de CryptoNote

Le protocole CryptoNote offre trois caractéristiques principales :

1. **Intraçabilité et caractère impossible à relier** des transactions
2. **Preuve de travail égalitaire** (résistante aux ASIC) 
3. **Émission dynamique**

---

## 1. Intraçabilité : les signatures de cercle

L'intraçabilité est principalement obtenue grâce aux **signatures de cercle**.

Lorsque vous envoyez une transaction, votre véritable clé publique est mélangée à plusieurs clés leurres (le « cercle »), qui contiennent toutes le même montant de pièces. Il devient ainsi extrêmement difficile de déterminer qui a réellement envoyé les pièces.

**La taille du cercle** influe considérablement sur l'ensemble d'anonymat. Des cercles plus grands offrent une meilleure confidentialité.

![Explication des signatures en anneau](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Comparaison avec Zcash** :  
L'ensemble d'anonymat de Zcash correspond au nombre total de transactions *jamais* effectuées dans un pool protégé donné (bien plus important que les tailles de cercle habituelles de CryptoNote).

---

## Ring CT (transactions confidentielles)

Le modèle **Ring CT** a grandement amélioré la confidentialité des monnaies basées sur CryptoNote.

Au lieu de masquer uniquement l'expéditeur, Ring CT **masque également les montants des transactions** entre l'expéditeur et le destinataire.

![Diagramme Ring CT](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

Il utilise :
- La cryptographie sur les courbes elliptiques
- Les engagements de Pedersen
- Le chiffrement homomorphe

Des **preuves** sont utilisées pour démontrer que le montant est supérieur à 0 et se situe dans des plages valides **sans révéler les valeurs réelles**.

Les **adresses furtives** ajoutent en outre des adresses à usage unique pour le destinataire.

![Adresses furtives + preuves](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. Preuve de travail égalitaire (ePoW)

CryptoNote vise à créer un système de minage plus équitable en résistant aux ASIC.

Il utilise l'algorithme **CryptoNight** (une fonction exigeante en mémoire). Contrairement au SHA256 de Bitcoin, CryptoNight est conçu pour réduire l'écart entre les mineurs utilisant des CPU, des GPU et des ASIC.

**Étapes de CryptoNight :**
1. Initialiser une grande zone de mémoire (scratchpad) avec des données pseudo-aléatoires
2. Effectuer de nombreuses opérations de lecture et d'écriture sur le scratchpad
3. Hacher l'ensemble du scratchpad pour produire la valeur finale

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

(Remarque : Monero a depuis abandonné CryptoNight au profit d'autres algorithmes.)

---

## 3. Émission dynamique

Au lieu d'événements de halving soudains (comme pour Bitcoin), CryptoNote utilise une **récompense de bloc qui diminue progressivement**.

Cela crée une courbe d'émission beaucoup plus régulière au fil du temps.

![Courbe d'émission dynamique](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Lien avec Zcash** :  
Les développeurs de Zcash ont évoqué la mise en place à l'avenir d'une courbe d'émission plus régulière, éventuellement par le biais d'un « Zcash Posterity Fund ».

---

## Conclusion

CryptoNote s'est révélé être une approche solide et éprouvée de la confidentialité on-chain. Nombre de ses innovations ont influencé l'écosystème plus large des monnaies de confidentialité.

Certains chercheurs estiment que les caractéristiques de CryptoNote pourraient à terme être combinées avec des pools protégés à divulgation nulle de connaissance ne nécessitant aucune confiance.

---

**Fil original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1636473585781948416

---

*Cette page a été compilée à partir du fil Zero to Zero Knowledge original pour le wiki ZecHub.*
