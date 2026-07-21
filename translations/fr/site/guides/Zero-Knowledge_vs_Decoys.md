<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Connaissances à divulgation nulle vs systèmes basés sur des leurres

« La cryptomonnaie expose toutes vos activités de dépense au public, car c'est comme un Twitter relié à votre compte bancaire, et c'est un problème majeur qui doit être résolu en adoptant la confidentialité on-chain. » - Ian Miers à la [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certains projets crypto ont gagné en reconnaissance pour leurs approches axées sur la confidentialité. Zcash est réputé pour employer des preuves à divulgation nulle de connaissance (ZK) afin de protéger les montants et les adresses des transactions. Monero se distingue par son utilisation d'une obfuscation de l'expéditeur basée sur des leurres, en combinaison avec d'autres schémas de chiffrement, afin d'assurer la confidentialité des utilisateurs sur la blockchain.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## Comprendre les preuves ZK et les systèmes basés sur des leurres

Les preuves à divulgation nulle de connaissance sont des systèmes cryptographiques qui permettent à une partie (le prouveur) de démontrer à une autre partie (le vérificateur) la validité d'une affirmation sans révéler *aucune information sous-jacente sur l'affirmation elle-même*. Dans le contexte de Zcash, les preuves ZK sont utilisées pour vérifier la validité d'une transaction sans divulguer les détails de la transaction tels que l'EXPÉDITEUR, le DESTINATAIRE ou le MONTANT de la transaction. 

**Cela garantit que la confidentialité de l'utilisateur est préservée, car la transaction reste confidentielle tout en étant validée. Cette technologie est conçue pour garantir la confidentialité des transactions financières sur le réseau Zcash.**

Dans les systèmes basés sur des leurres tels que [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), plusieurs transactions sont combinées, ce qui rend complexe ou difficile la traçabilité de la véritable source et de la destination des fonds. L'algorithme introduit des entrées et des sorties leurres dans les transactions, tout en chiffrant également les adresses utilisées comme entrées et en utilisant des preuves d'intervalle pour valider que le montant transféré peut être dépensé. 

Cette approche obscurcit la trace des transactions. L'utilisation d'entrées leurres complique l'identification du véritable expéditeur, destinataire ou montant de la transaction pour toute personne analysant la blockchain. 

**Note importante** : Cette méthode de transaction préservant la confidentialité on-chain révèle tout de même explicitement les entrées (chiffrées) de toutes les transactions des utilisateurs. Des métadonnées telles que le *FLUX DES TRANSACTIONS* entre différents utilisateurs sur le réseau peuvent toujours être recueillies. Si un adversaire participe activement à la génération de transactions sur le réseau, cela désanonymise effectivement les entrées leurres des autres utilisateurs. 


## Avantages des ZK par rapport aux systèmes basés sur des leurres

Zcash et Monero sont tous deux des cryptomonnaies axées sur la confidentialité, mais ils atteignent cette confidentialité de différentes manières. 

Voici quelques avantages des preuves à divulgation nulle de connaissance (ZK) de Zcash par rapport au système de leurres de Monero :

1) **Divulgation sélective** : Avec l'ensemble de fonctionnalités ZK de Zcash, les utilisateurs ont la possibilité de révéler les détails d'une transaction à des parties spécifiques [Lire le blog de l'ECC sur la divulgation sélective](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Dans Zcash, le contenu chiffré des transactions protégées permet aux individus de révéler sélectivement les données d'un transfert particulier. De plus, une Viewing Key peut être fournie pour divulguer toutes les transactions associées à une adresse protégée spécifique. Cette fonctionnalité permet la conformité réglementaire et l'auditabilité sans compromettre la confidentialité globale du réseau. 

Bien que l'algorithme de leurres de Monero (signature en anneau) contribue à offrir de la confidentialité, il n'offre pas de divulgation *sélective* de la même manière.


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Visibilité optionnelle** : Zcash permet aux utilisateurs de choisir entre des transactions transparentes (non privées) et protégées (privées). Cela signifie que Zcash offre aux utilisateurs la flexibilité de soit garder leurs informations financières privées (protégées), soit les rendre transparentes et accessibles publiquement, comme la plupart des autres blockchains, comme expliqué sur le [site officiel de Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Cette confidentialité sur option permet une plus grande flexibilité et des cas d'usage pertinents pour les entreprises et les organisations, certaines transactions pouvant nécessiter moins de confidentialité pour un examen public, tandis que d'autres bénéficient d'une confidentialité renforcée.


3) **Ensemble d'anonymat** : L'[ensemble d'anonymat](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) des pools protégés à divulgation nulle de connaissance comprend toutes les transactions qui se sont *déjà* produites. Il est considérablement plus vaste que la plupart des autres techniques on-chain visant à rendre les transactions non corrélables. Remarque : cela ne s'applique qu'aux transactions au sein du même pool protégé.

L'utilisation de leurres augmente bien l'ensemble d'anonymat. Cependant, cette approche dépend entièrement du nombre d'utilisateurs *réels* sur le réseau. 

4) **Aucune configuration de confiance** : La configuration de Sprout et Sapling de Zcash utilisait un calcul multipartite connu sous le nom de « cérémonie de trusted setup ». La récente mise à niveau NU5 n'a nécessité aucune confiance dans l'intégrité de la configuration du circuit à divulgation nulle de connaissance. [Lire le blog de l'ECC sur NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Confidentialité des données** : La [technologie zk-SNARK](https://wiki.zechub.xyz/zcash-technology) utilisée dans les pools protégés de Zcash permet une sécurité nettement renforcée pour les utilisateurs. La réduction des fuites de métadonnées on-chain signifie que les utilisateurs sont protégés contre des adversaires tels que d'éventuels pirates ou des autorités étatiques oppressives. 

Il existe plusieurs cas dans lesquels des bogues ont été identifiés dans l'algorithme de sélection des leurres de Monero. Selon un rapport de [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero), ces bogues avaient le potentiel de révéler les dépenses des utilisateurs. 


En résumé, ce qui importe vraiment le plus, c'est de réduire ou d'éliminer la fuite d'informations et de données des utilisateurs, comme l'explique Zooko lors de la [session AMA en direct Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***Liens de référence***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
