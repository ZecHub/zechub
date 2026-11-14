<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Systèmes à divulgation nulle de connaissance et systèmes à leurres

« Les cryptomonnaies exposent toutes vos dépenses au public, puisque c'est comme un Twitter vers votre compte bancaire, et c'est un problème majeur qui doit être résolu en adoptant la confidentialité on-chain. » - Ian Miers à la [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

Certains projets crypto se sont fait connaître pour leurs approches centrées sur la confidentialité. Zcash est réputé pour l'utilisation de preuves à divulgation nulle de connaissance (ZK) afin de protéger les montants des transactions et les adresses. Monero se distingue par son recours à un masquage de l'expéditeur fondé sur des leurres, combiné à d'autres schémas de chiffrement, pour assurer la confidentialité des utilisateurs sur la blockchain.


<a href="">
    <img src="/content-images/257773807-af8ae27d-0805-4a60-a5ba-749e2f-cafd67320f.webp" alt="" width="400" height="300"/>
</a>


## Comprendre les preuves ZK et les systèmes à leurres

Les preuves à divulgation nulle de connaissance sont des systèmes cryptographiques qui permettent à une partie (le prouveur) de démontrer à une autre partie (le vérificateur) la validité d'une affirmation sans révéler *aucune information sous-jacente sur l'affirmation elle-même*. Dans le contexte de Zcash, les preuves ZK servent à vérifier la validité d'une transaction sans divulguer ses détails, comme l'EXPÉDITEUR, le DESTINATAIRE ou le MONTANT de la transaction. 

**Cela garantit la préservation de la confidentialité des utilisateurs, puisque la transaction reste confidentielle tout en étant validée. Cette technologie est conçue pour garantir la confidentialité des transactions financières sur le réseau Zcash.**

Dans les systèmes à leurres tels que [RingCT](https://twitter.com/ZecHub/status/1636473585781948416), plusieurs transactions sont combinées, ce qui rend difficile le traçage de la source et de la destination réelles des fonds. L'algorithme introduit des entrées et des sorties leurres dans les transactions, chiffre également les adresses utilisées comme entrées et utilise des preuves d'intervalle pour valider que le montant transféré peut être dépensé. 

Cette approche brouille la piste des transactions. L'utilisation d'entrées leurres rend difficile, pour quiconque analyse la blockchain, l'identification du véritable expéditeur, du destinataire ou du montant de la transaction. 

**Remarque importante** : cette méthode de transaction préservant la confidentialité on-chain révèle toujours explicitement les entrées (chiffrées) de toutes les transactions des utilisateurs. Des métadonnées telles que le *FLUX DES TRANSACTIONS* entre différents utilisateurs du réseau peuvent toujours être collectées. Si un adversaire participe activement à la génération de transactions sur le réseau, il désanonymise de fait les entrées leurres des autres utilisateurs. 


## Avantages des systèmes ZK par rapport aux systèmes à leurres

Zcash et Monero sont tous deux des cryptomonnaies axées sur la confidentialité, mais ils l'obtiennent de manières différentes. 

Voici quelques avantages des preuves à divulgation nulle de connaissance (ZK) de Zcash par rapport au système à leurres de Monero :

1) **Divulgation sélective** : grâce aux fonctionnalités ZK de Zcash, les utilisateurs ont la possibilité de révéler les détails d'une transaction à des parties spécifiques [Lisez l'article de blog de ECC sur la divulgation sélective](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Dans Zcash, le contenu chiffré des transactions protégées permet de révéler de façon sélective les données d'un transfert particulier. De plus, une clé pour lecture seule peut être fournie pour divulguer toutes les transactions associées à une adresse protégée spécifique. Cette fonctionnalité permet la conformité réglementaire et l'auditabilité sans compromettre la confidentialité globale du réseau. 

Si l'algorithme à leurres de Monero (signature en anneau) contribue à assurer la confidentialité, il n'offre pas de divulgation *sélective* de la même manière.


<a href="">
    <img src="/content-images/257793324-2dcc6047-300e-4fa7-a28d-2e6cbb-7242c98ea4.webp" alt="" width="400" height="80"/>
</a>


2) **Visibilité optionnelle** : Zcash permet aux utilisateurs de choisir entre des transactions transparentes (non confidentielles) et protégées (confidentielles). Cela signifie que Zcash offre aux utilisateurs la souplesse de garder leurs informations financières confidentielles (protégées) ou de les rendre transparentes et publiquement accessibles, comme sur la plupart des autres blockchains, ainsi que l'explique le [site officiel de Zcash](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). Cette confidentialité optionnelle offre une plus grande souplesse et des cas d'utilisation pertinents pour les entreprises et les organisations, car certaines transactions peuvent nécessiter moins de confidentialité pour permettre un examen public, tandis que d'autres bénéficient d'une confidentialité renforcée.


3) **Ensemble d'anonymat** : l'[ensemble d'anonymat](https://docs.wasabiwallet.io/FAQ/FAQ-UseWasabi.html#what-is-the-difference-between-anonymity-set-and-anonymity-score) des pools protégés à divulgation nulle de connaissance comprend toutes les transactions ayant *jamais* eu lieu. Il est nettement plus grand que celui de la plupart des autres techniques on-chain visant à rendre les transactions impossibles à relier. Remarque : cela ne s'applique qu'aux transactions au sein d'un même pool protégé.

L'utilisation de leurres augmente certes l'ensemble d'anonymat. Cependant, cette approche dépend entièrement du nombre d'utilisateurs *réels* sur le réseau. 

4) **Aucune configuration de confiance** : la mise en place de Sprout et Sapling dans Zcash a fait appel à un calcul multipartite connu sous le nom de « cérémonie de configuration de confiance ». La récente mise à niveau NU5 n'a nécessité aucune confiance dans l'intégrité de la mise en place du circuit à divulgation nulle de connaissance. [Lisez l'article de blog de ECC sur NU5](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Confidentialité des données** : la [technologie zk-SNARK](https://zechub.wiki/zcash-tech/zk-snarks) utilisée dans les pools protégés de Zcash offre une sécurité nettement renforcée aux utilisateurs. La réduction des fuites de métadonnées on-chain protège les utilisateurs contre des adversaires tels que d'éventuels pirates informatiques ou des organismes d'État oppressifs. 

À plusieurs reprises, des bogues ont été identifiés dans l'algorithme de sélection des leurres de Monero. Selon un rapport de [CoinDesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero), ces bogues étaient susceptibles de révéler les dépenses des utilisateurs. 


En résumé, ce qui compte vraiment le plus est de réduire ou d'éliminer la fuite des informations et des données des utilisateurs, comme l'a expliqué Zooko lors de la [session AMA en direct d'Orchid (priv8)](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) 


<a href="">
    <img src="/content-images/257788813-509f1139-7daa-4f95-bbb4-c53564-f815d11477.webp" alt="" width="400" height="200"/>
</a>


____

***Liens de référence***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://web.archive.org/web/20240327000137/https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
