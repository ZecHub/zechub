# L'ETF Grayscale Zcash (ZCSH)

**Ce n'est pas Zcash qui a lancé un ETF, c'est Grayscale**, en convertissant un fonds qu'elle
gère depuis 2017. Zcash est un protocole : il n'a ni société, ni trésorerie, ni conseil
d'administration susceptibles d'émettre un fonds. Grayscale est un gestionnaire d'actifs indépendant qui achète
des ZEC sur le marché libre, comme n'importe qui.

Cette distinction est le point le plus souvent mal compris au sujet de ZCSH, et c'est par elle
que commence cette page. Le 25 août 2026, le fonds a commencé à être négocié sur NYSE Arca sous le nom
*The Zcash ETF*. C'était le premier produit négocié en bourse adossé au Zcash au comptant aux États-Unis, et il est
aujourd'hui l'un des plus grands détenteurs individuels de ZEC au monde.

![Fonctionnement du Grayscale Zcash ETF : les investisseurs achètent des parts ZCSH via un courtier et n'obtiennent qu'une exposition au prix, tandis que le trust détient les ZEC chez Coinbase Custody dans des portefeuilles transparents ; les Authorized Participants créent et rachètent des parts par paniers de 10,000 contre des liquidités, et les frais du Sponsor sont prélevés sur les ZEC du trust, de sorte que la quantité de ZEC par part diminue avec le temps](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Le même fonds, trois étapes

| Date | Ce qui a changé |
| --- | --- |
| Octobre 2017 | Lancement sous forme de placement privé, réservé aux investisseurs accrédités |
| Octobre 2021 | Parts cotées sur OTCQX sous le symbole ZCSH, négociées avec une décote par rapport à la valeur liquidative |
| 25 août 2026 | Devient un ETP remboursable sur NYSE Arca et retire « Trust » de son nom |

L'étape de 2026 n'est pas cosmétique. Un trust coté hors cote n'a pas de mécanisme
de rachat, si bien que ses parts peuvent s'écarter de la valeur des actifs sous-jacents,
avec une prime ou une décote, parfois très marquée. C'est exactement ce qui
s'est produit entre 2021 et 2026. Un produit négocié en bourse doté d'un mécanisme
de création et de rachat fonctionnel dispose d'une voie d'arbitrage qui maintient le cours de la part
aligné sur la valeur liquidative. Passer de l'un à l'autre change le comportement
du produit en tant que titre financier.

## Qui fait quoi

| Rôle | Partie |
| --- | --- |
| Promoteur | Grayscale Investments Sponsors, LLC |
| Fiduciaire | CSC Delaware Trust Company |
| Administrateur et agent de transfert | The Bank of New York Mellon |
| Courtier principal | Coinbase, Inc. : se procure les ZEC pour le trust |
| Participants autorisés | Jane Street, Virtu : créent et rachètent les parts |
| Agent de commercialisation | Foreside Fund Services |
| **Dépositaire** | **Coinbase Custody Trust Company, LLC** : le seul endroit où se trouvent réellement les ZEC |

Aucune de ces parties n'est à elle seule le fonds. La structure correspond aux accords
qui les lient, tels que les présente le schéma ci-dessus. Plusieurs de ces rôles
étaient absents ou déformés dans la couverture médiatique au moment de la cotation. La liste ci-dessus
suit la déclaration d'enregistrement Form S-3 de Grayscale publiée sur EDGAR.

## Comment les parts sont créées et rachetées

Seuls les participants autorisés, des courtiers-négociants enregistrés liés par un accord avec
le promoteur, peuvent créer ou racheter des parts, et uniquement par blocs de 10 000
appelés « paniers ». Un investisseur ordinaire n'a jamais affaire à ce mécanisme : il achète
et vend des parts existantes en bourse comme n'importe quel autre titre coté.

Le mécanisme fonctionne actuellement **en espèces**, et non en nature. Un participant autorisé
verse des espèces sur un compte de trésorerie ou en reçoit, et c'est un fournisseur de
liquidité tiers qui se procure ou cède effectivement les ZEC. La
déclaration d'enregistrement décrit également un processus en nature, dans lequel un
participant autorisé déposerait directement des ZEC auprès du trust ou recevrait
des ZEC de sa part. Elle précise toutefois clairement que « l'approbation réglementaire du processus en nature n'a pas
été obtenue », et elle pourrait ne jamais l'être.

Dans le processus en espèces, les ZEC changent donc de mains entre le fournisseur de liquidité
et le marché, jamais entre l'investisseur et le trust. Personne dans le circuit
des particuliers ne touche à une adresse Zcash.

## Les frais sont payés en ZEC

Les frais du promoteur s'élèvent à **2,5 % par an** au moment de la cotation. Ils s'accumulent chaque jour en
pourcentage de la valeur liquidative et sont, selon les termes du document, « payables en ZEC
au promoteur quotidiennement, à terme échu ».

La conséquence est structurelle, et non accessoire. Les frais sont prélevés sur les
ZEC du fonds, de sorte que la quantité de ZEC adossée à chaque part diminue un peu chaque
jour. Une part ne représente pas une quantité fixe de ZEC détenue indéfiniment. Elle donne droit
à une quantité qui diminue lentement. Quiconque compare une exposition à long terme via ZCSH
à la simple détention de ZEC doit en tenir compte.

Pour donner un ordre de grandeur, 2,5 % représente environ dix fois les frais d'un ETF bitcoin au comptant classique.
Grayscale a indiqué que les premières recettes tirées des frais du promoteur seraient réinvesties
dans le développement de l'écosystème Zcash.

## Ce que possède réellement un porteur de parts

Une part offre une exposition au cours du ZEC. Ce n'est pas du ZEC.

Un porteur de parts ne peut pas envoyer de transaction protégée, ni joindre un mémo, ni
détenir une adresse unifiée, ni conserver lui-même ses fonds. Aucune des propriétés qui
distinguent Zcash des autres actifs n'est accessible au travers de cette enveloppe : elle
ne transmet que le cours, et rien d'autre. Pour un investisseur qui cherche une exposition
au sein d'un compte-titres ou d'un compte de retraite, c'est précisément le but recherché. Pour
quiconque s'intéresse à Zcash pour sa confidentialité, l'ETF ne remplace pas
un portefeuille, et les deux ne sont pas vraiment des alternatives l'un à l'autre.

## Les ZEC sont détenus à découvert

La structure recèle une autre ironie, et c'est le point le plus frappant de
cette page. Coinbase Custody conserve les ZEC du trust dans des adresses **transparentes**,
et non dans des adresses protégées. Les avoirs du fonds sont visibles on-chain,
traçables jusqu'au dépositaire et observables en temps réel par quiconque prend la peine de
regarder. Rien dans ce fonds n'utilise d'adresse protégée.

Ce n'est pas un oubli. L'infrastructure des fonds réglementés repose sur l'audit
et l'attestation, et un solde protégé est précisément ce qu'un auditeur ne peut pas
vérifier de manière indépendante. Le support de Coinbase lui-même reflète cette asymétrie : il
accepte les ZEC envoyés depuis une adresse protégée, mais n'envoie pas de ZEC vers
une telle adresse.

Le plus grand détenteur institutionnel d'un actif de confidentialité le détient donc sous la seule
forme dépourvue de confidentialité. Ce point s'appuie sur des articles de presse plutôt que sur
les documents officiels : le S-3 décrit la conservation des clés privées du trust, mais ne
précise pas les types d'adresses. Il est donc présenté ici avec cette réserve.

## Quelle quantité de ZEC est en jeu

Lors de sa cotation, le 25 août 2026, le fonds détenait environ **387 000 ZEC**, pour
environ **313 millions de dollars** d'actifs sous gestion.

Avec plus de recul : au 30 septembre 2025, le document indique que le trust détenait
environ **2,4 % des ZEC en circulation**. Ces deux chiffres évoluent, le premier avec le
cours du ZEC et au gré des créations et des rachats, le second à mesure que les frais sont prélevés
sur les avoirs. Pour obtenir un chiffre à jour, consultez le document le plus récent ou
la publication quotidienne du fonds plutôt que cette page.

## Sources

Toutes primaires, toutes sur EDGAR sous le CIK 1720265 sauf mention contraire.

- [Grayscale Zcash Trust (ZEC) : index des documents EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Déclaration d'enregistrement Form S-3, novembre 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) : rôles des entités, mécanismes de création et de rachat, frais du promoteur et pourcentage des ZEC en circulation
- [Form 10-K pour l'exercice clos le 31 décembre 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [L'ETF Zcash commence à être négocié sur NYSE Arca, 25 août 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Page du fonds Grayscale Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) : dates de création et publications actuelles
- [Le premier ETF sur une cryptomonnaie de confidentialité : dans les coulisses du dépôt Zcash de Grayscale](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) : source secondaire, la seule trouvée indiquant que les ZEC du trust sont détenus dans des adresses transparentes

Les chiffres correspondent aux dates indiquées et évolueront. Vérifié le 30 septembre 2026.
À usage éducatif uniquement, ne constitue pas un conseil en investissement.
