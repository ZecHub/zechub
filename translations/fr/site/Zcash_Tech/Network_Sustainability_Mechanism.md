<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Mécanisme de durabilité du réseau (NSM)

> Le NSM fait partie du consensus de Zcash depuis que [NU7](./NU7.md) a été activé au bloc 3,543,405 du Mainnet, le 6 novembre 2026. Les frais sont désormais mis de côté ; leur réémission aux mineurs commencera au bloc 8,939,664 (prévue vers février 2031).

Ce que vous allez découvrir : le rôle du mécanisme de durabilité du réseau, la part des frais de chaque bloc qu’il retire de la circulation, où va cette ZEC, quand et à quel rythme elle revient sous forme de récompenses de bloc, et pourquoi le plafond de 21 millions et le calendrier des halvings restent inchangés.

Le mécanisme de durabilité du réseau (NSM) est un ensemble de règles de consensus qui retire une partie des ZEC de la circulation et la reverse ultérieurement aux mineurs, sur plusieurs années. NU7 en a déployé deux volets : [ZIP 235](https://zips.z.cash/zip-0235), qui retire 60 % des frais de transaction de chaque bloc de la circulation, et [ZIP 237](https://zips.z.cash/zip-0237), qui réémet les ZEC retirés en plus de la subvention de bloc habituelle, selon une courbe progressive. Les deux ont été activés par [ZIP 259](https://zips.z.cash/zip-0259).

Pourquoi est-ce important ? Zcash finance sa sécurité avec de nouveaux ZEC dans chaque bloc, et cette subvention est réduite de moitié environ tous les quatre ans. Lorsqu’elle devient faible, les mineurs doivent compter principalement sur les frais. Le NSM est une première étape vers cet avenir : il met de côté une partie des frais actuels pour les verser aux mineurs du futur, sans relever le plafond de l’offre ni modifier le calendrier des halvings auquel les utilisateurs se fient déjà.

## En bref

- **Retrait ([ZIP 235](https://zips.z.cash/zip-0235)) :** dans chaque bloc, 60 % du total des frais de transaction (arrondi à l’entier inférieur, à l’avantage du mineur) sont retirés de la circulation. Le mineur conserve les 40 % restants.
- **Solde de valeur du NSM :** un total cumulé public des ZEC retirés de la circulation et pas encore réémis. Il s’agit d’un état de consensus, et non d’un pool dans lequel quiconque pourrait puiser.
- **La réserve initiale :** au moment de NU7, le solde a commencé à **368.58445520 ZEC**, soit les récompenses de bloc et les frais que les premiers mineurs n’ont pas réclamés avant NU6.
- **Réémission ([ZIP 237](https://zips.z.cash/zip-0237)) :** à partir du bloc **8,939,664**, chaque bloc ajoute à la subvention de bloc une fraction fixe (0.00001375 %) du solde. Cela permet de verser environ la moitié du solde au cours de chaque période de halving de quatre ans.
- **Ce qui reste inchangé :** le calendrier des halvings et le plafond de 21 millions de ZEC. Si le solde tombe un jour à zéro, l’émission suit exactement l’ancien calendrier.

## Analogie visuelle

Imaginez un bocal d’épargne à côté de la caisse. Chaque fois qu’un bloc est miné, 60 % des pourboires (les frais) vont dans le bocal au lieu de finir dans la poche du mineur. Personne ne peut retirer de l’argent du bocal à la main. À partir de 2031, une petite part fixe de ce que contient le bocal est ajoutée à chaque récompense de bloc, si bien que le bocal se vide lentement : environ la moitié tous les quatre ans, au même rythme que les halvings.

## Fonctionnement du retrait (ZIP 235)

- La règle s’applique à chaque bloc, et non à chaque transaction. Pour un bloc dont le total des frais est de `F` (en zatoshi), le montant retiré est de `floor(6 × F / 10)` et le mineur peut réclamer `F` moins ce montant.
- L’arrondi est effectué une seule fois pour l’ensemble du bloc, toujours à l’avantage du mineur. Un arrondi par transaction retirerait au total moins de 60 % (deux frais de 1 zatoshi contribueraient chacun 0).
- Exemple : un bloc dont les transactions paient 50,000 zatoshi (0.0005 ZEC) de frais en retire 30,000 et verse 20,000 au mineur. Un bloc avec 15 zatoshi de frais en retire 9 et en verse 6 au mineur.
- Aucun champ de transaction n’est nécessaire. Chaque nœud calcule le montant à partir des frais qu’il valide déjà, et [ZIP 236](https://zips.z.cash/zip-0236) fait en sorte que la transaction coinbase réclame exactement ce qui est dû au mineur, qui ne peut donc ni retirer moins ni réclamer davantage.
- Ordre de grandeur : ZIP 235 estimait, à partir du trafic antérieur à NU7, environ 370 ZEC de frais par an, soit près de 222 ZEC retirés chaque année. Aujourd’hui, les frais sont faibles comparés à la subvention de bloc, d’où l’impact limité attendu par les auteurs sur les mineurs.

## Fonctionnement de la réémission (ZIP 237)

- **Le solde.** `NSMValueBalance` commence à 368.58445520 ZEC (36,858,445,520 zatoshi) au moment de l’activation de NU7. Chaque bloc ajoute ce que ZIP 235 a retiré et soustrait ce qui a été réémis. Un bloc qui rendrait le solde négatif est invalide.
- **Origine de la réserve initiale.** Avant NU6, une transaction coinbase pouvait réclamer moins que la totalité de la récompense de bloc et des frais. Au cours des 2,726,400 premiers blocs de la chaîne, les mineurs ont laissé 368.58445520 ZEC sans le réclamer : la subvention prévue jusqu’à cette hauteur était de 15,750,000 ZEC, et l’offre émise était de 15,749,631.41554480 ZEC. ZIP 237 place cette valeur dans le NSM afin qu’elle soit versée au lieu d’être perdue.
- **Aucune réémission avant le bloc 8,939,664.** Entre NU7 et cette hauteur, le solde ne fait qu’augmenter.
- **La formule.** À partir du bloc 8,939,664, la subvention de chaque bloc reçoit un supplément de `ceiling(0.0000001375 × NSMValueBalance)`, calculé à partir du solde après le bloc précédent. La fraction est `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10,000,000,000, avec une période de halving postérieure à NU7 de 5,040,000 blocs.
- **Pourquoi cette fraction ?** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`, ainsi, si aucun nouveau montant n’est retiré, environ la moitié du solde est réémise à chaque période de halving. Il s’agit d’une décroissance exponentielle appliquée uniquement au solde du NSM, superposée aux étapes de halving inchangées.
- **Exemple de calcul.** Si le solde ne contenait encore que la réserve initiale de 368.58 ZEC au bloc 8,939,664, le premier bloc réémettrait 5,069 zatoshi (environ 0.00005 ZEC), soit près de 0.175 ZEC par jour à raison de 3,456 blocs par jour. Les montants réels seront plus élevés, selon les frais retirés d’ici là.
- **Pourquoi le bloc 8,939,664 ?** ZIP 237 le détermine selon une règle fixe, indépendamment du montant réellement retiré : il s’agit du premier bloc après le troisième halving (bloc 6,132,390, prévu vers novembre 2028) où la fraction du NSM appliquée à tous les ZEC dont l’émission n’est pas encore prévue donnerait un montant inférieur à la subvention de bloc normale (0.26041666 ZEC pendant cette période). Les sondages auprès des détenteurs de NU7 et de la communauté n’ont pas dégagé de majorité commune sur la date de début de la réémission ; ZIP 259 retient donc ce point de croisement.

## Ce qui n’a pas changé

- **Le calendrier des halvings.** ZIP 237 conserve les étapes de halving tous les quatre ans. La solution rejetée, [ZIP 234](https://zips.z.cash/zip-0234), les aurait remplacées par une courbe d’émission progressive. Les sondages d’août et septembre 2026 NU7 demandaient s’il fallait préserver les halvings ou lisser l’émission, et NU7 a livré la conception qui préserve les halvings.
- **Le plafond de l’offre.** L’offre émise et le solde de valeur du NSM augmentent, à chaque bloc, exactement du montant de la subvention de bloc prévue ; l’émission ne peut donc jamais dépasser le plafond. En fait, celui-ci a légèrement diminué : l’arrondi de la subvention postérieure à NU7 dans ZIP 218 a réduit l’émission totale d’environ 0.50 ZEC, et le NSM ne réémet pas ce manque.
- **Retrait volontaire.** [ZIP 233](https://zips.z.cash/zip-0233), qui aurait permis à quiconque d’envoyer des ZEC dans le NSM au moyen d’un champ de transaction explicite, n’a pas été déployé dans NU7. Aujourd’hui, les frais sont la seule source de retrait. ZIP 237 permet à de futurs ZIP d’ajouter d’autres sources.
- **Confidentialité.** Le solde et la subvention supplémentaire sont calculés à partir de valeurs déjà publiques ; le NSM ne révèle donc rien de nouveau sur les transactions.

## Erreurs fréquentes

- **« 60 % des frais sont détruits. »** Pas de façon permanente. Contrairement à une destruction (l’EIP-1559 d’Ethereum est la comparaison habituelle), les ZEC retirés sont comptabilisés et réémis aux mineurs du futur.
- **« Le NSM crée des ZEC supplémentaires. »** Non. Il ne réémet que la valeur retirée ou jamais réclamée ; l’émission totale reste sous le plafond existant.
- **« La réémission a commencé. »** Pas encore. Jusqu’au bloc 8,939,664, le solde ne fait que s’accumuler.
- **« Le NSM est un fonds contrôlé par quelqu’un. »** Non. C’est un nombre inscrit dans l’état de consensus, et la valeur n’en sort que par la formule de subvention de bloc.
- **« Les halvings ont disparu. »** Non. C’était la conception de ZIP 234, que NU7 n’a pas déployée.

## Glossaire

| Terme | Signification en langage courant |
|---|---|
| Network Sustainability Mechanism (NSM) | Les règles de consensus qui retirent des ZEC de la circulation et les réémettent aux mineurs ultérieurement |
| NSM Value Balance | Le total cumulé public des ZEC retirés de la circulation (ou jamais réclamés) et pas encore réémis |
| Removal from circulation | Transfert des ZEC de l’offre émise vers le solde de valeur du NSM ; depuis NU7, il s’agit de 60 % des frais de chaque bloc |
| Reissuance | Reversement des ZEC du solde de valeur du NSM sous forme de subvention de bloc supplémentaire, à partir du bloc 8,939,664 |
| Issued Supply | Tous les ZEC présents dans les pools de valeur de la chaîne ; elle n’inclut pas le solde de valeur du NSM |
| Block subsidy | Les nouveaux ZEC créés dans chaque bloc, répartis entre le mineur et les fonds de développement |
| Halving interval | Nombre de blocs entre deux halvings : 5,040,000 depuis NU7 (environ quatre ans avec des blocs de 25 secondes) |

## FAQ

**Quel est le montant actuel du NSM ?** La réserve initiale de 368.58445520 ZEC, à laquelle s’ajoutent 60 % des frais de chaque bloc depuis le bloc 3,543,405. Il s’agit d’un état de consensus suivi par chaque nœud complet.

**Qui reçoit les ZEC réémis ?** Ils sont ajoutés à la subvention de bloc et répartis de la même façon : les fonds de développement reçoivent leur pourcentage fixe de la subvention totale (prévue et réémise), et le mineur reçoit le reste.

**Quand la réémission commence-t-elle ?** Au bloc 8,939,664 du Mainnet, prévu vers février 2031 si les blocs conservent une moyenne de 25 secondes. Sur le Testnet, la hauteur suit la même règle à partir de la hauteur d’activation de NU7 sur le Testnet.

**Les frais vont-ils augmenter à cause du NSM ?** Non. Le mécanisme change la destination des frais, pas le montant payé pour une transaction.

**La répartition 60/40 peut-elle changer ?** Seulement avec un futur ZIP et une mise à niveau du réseau. ZIP 235 indique que la répartition pourrait être réexaminée si les frais augmentent, par exemple lorsqu’ils dépassent la subvention de bloc.

## Vérifiez vos connaissances

1. Les transactions d’un bloc paient 100,000 zatoshi de frais. Quel montant le mineur conserve-t-il ?
2. D’où vient le solde initial du NSM ?
3. Quelle part environ du solde du NSM est réémise à chaque période de halving si aucun nouveau montant n’est retiré ?
4. Pourquoi la réémission ne fait-elle pas dépasser l’émission totale de 21 millions de ZEC ?

Réponses : (1) 40,000 zatoshi ; 60,000 sont retirés ; (2) des récompenses de bloc et des frais que les transactions coinbase n’ont pas réclamés avant NU6, soit 368.58445520 ZEC ; (3) environ la moitié ; (4) la réémission ne verse que la valeur retirée ou jamais réclamée, de sorte que l’offre émise et le solde du NSM augmentent exactement du montant de la subvention prévue à chaque bloc.

### Ressources

[ZIP 235 : Retirer de la circulation 60 % des frais de transaction](https://zips.z.cash/zip-0235)

[ZIP 237 : Mécanisme de durabilité du réseau : émission préservant les halvings](https://zips.z.cash/zip-0237)

[ZIP 259 : Déploiement de la mise à niveau du réseau NU7](https://zips.z.cash/zip-0259)

[ZIP 234 : Mécanisme de durabilité du réseau : lissage de l’émission (non déployé)](https://zips.z.cash/zip-0234)

[ZIP 233 : Mécanisme de durabilité du réseau : retrait de fonds de la circulation (non déployé)](https://zips.z.cash/zip-0233)

[ZIP 236 : Les blocs doivent être équilibrés exactement](https://zips.z.cash/zip-0236)

## Pages associées

| Page | Pourquoi est-elle associée ? |
|---|---|
| [NU7](./NU7.md) | la mise à niveau du réseau qui a activé le NSM |
| [Zcash Politique monétaire](../start-here/zcash-monetary-policy) | le calendrier des halvings et le plafond de l’offre que le NSM préserve |
| [Ce que changent vraiment les blocs de 25 secondes](../research/what-25-second-blocks-actually-change) | pourquoi la subvention et la période de halving ont changé dans NU7 |
| [Fonds de développement](../start-here/development-fund) | la répartition de la subvention de bloc |
| [Transactions](../using-zcash/transactions) | la détermination des frais de transaction |

---
