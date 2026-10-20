# Le Grayscale Zcash ETF (ZCSH)

**Zcash n'a pas lancé d'ETF. Grayscale l'a fait**, en convertissant un fonds qu'il
gère depuis 2017. Zcash est un protocole — il n'a ni entreprise, ni trésorerie, ni conseil
pouvant émettre un fonds. Grayscale est un gestionnaire d'actifs indépendant qui achète
des ZEC sur le marché libre comme n'importe qui d'autre.

Cette distinction est l'élément le plus souvent mal compris au sujet de ZCSH, et c'est là
que commence cette page. Le 25 août 2026, le fonds a commencé à être négocié sur NYSE Arca sous le nom
*The Zcash ETF*, le premier produit négocié en bourse américain au comptant sur Zcash, et il est
désormais l'un des plus importants détenteurs individuels de ZEC qui existent.

![How the Grayscale Zcash ETF works: investors buy ZCSH shares through a brokerage and receive price exposure only, while the trust holds the ZEC at Coinbase Custody in transparent wallets; Authorized Participants create and redeem shares in baskets of 10,000 for cash, and the Sponsor's Fee is paid out of the trust's ZEC, so ZEC per share declines over time](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Le même fonds, trois étapes

| Quand | Ce qui a changé |
| --- | --- |
| Octobre 2017 | Lancement sous forme de placement privé, réservé aux investisseurs accrédités |
| Octobre 2021 | Actions cotées sur OTCQX sous le symbole ZCSH, négociées avec une décote par rapport à la VL |
| 25 août 2026 | Devient un ETP rachetable sur NYSE Arca et retire « Trust » de son nom |

L'étape de 2026 n'est pas cosmétique. Un trust coté de gré à gré ne dispose d'aucun mécanisme
de rachat, de sorte que ses actions peuvent s'écarter, avec une prime ou une décote, de la valeur
des actifs qui les sous-tendent, parfois fortement — ce qui est précisément ce qui
s'est produit entre 2021 et 2026. Un produit négocié en bourse disposant de mécanismes opérationnels
de création et de rachat offre une possibilité d'arbitrage qui maintient le cours de l'action
lié à la valeur liquidative. Passer de l'un à l'autre modifie le comportement
du produit en tant que titre financier.

## Qui fait quoi

| Rôle | Partie |
| --- | --- |
| Promoteur | Grayscale Investments Sponsors, LLC |
| Fiduciaire | CSC Delaware Trust Company |
| Administrateur et agent de transfert | Le Bank of New York Mellon |
| Courtier principal | Coinbase, Inc. — obtient des ZEC pour le trust |
| Participants autorisés | Jane Street, Virtu — créent et rachètent des actions |
| Agent marketing | Foreside Fund Services |
| **Conservateur** | **Coinbase Custody Trust Company, LLC** — le seul endroit où existent réellement les ZEC |

Aucune de ces parties ne constitue à elle seule le fonds. La structure est l'accord
entre elles, ce que présente le diagramme ci-dessus. Plusieurs de ces rôles
étaient absents ou déformés dans la couverture médiatique au moment de la cotation ; la liste ici
suit la déclaration d'enregistrement Form S-3 de Grayscale auprès de EDGAR.

## Comment les actions sont créées et rachetées

Seuls les participants autorisés — des courtiers-négociants enregistrés liés par un accord avec
le Promoteur — peuvent créer ou racheter des actions, et uniquement par blocs de 10 000,
appelés paniers. Un investisseur ordinaire n'intervient jamais dans cette mécanique ; il achète
et vend des actions existantes en bourse comme n'importe quel autre titre coté.

Le mécanisme est actuellement **en espèces**, et non en nature. Un participant autorisé
dépose des espèces sur, ou reçoit des espèces depuis, un compte en espèces, et un fournisseur de liquidité tiers
est celui qui obtient réellement les ZEC ou s'en défait. La
déclaration d'enregistrement décrit également un processus en nature, dans lequel un
participant autorisé déposerait directement des ZEC auprès du Trust ou recevrait des
ZEC de celui-ci — mais elle précise clairement que « l'approbation réglementaire pour les opérations en nature n'a pas
été obtenue », et pourrait ne jamais l'être.

Ainsi, dans le cadre du processus en espèces, les ZEC changent de mains entre le fournisseur de liquidité
et le marché, jamais entre l'investisseur et le Trust. Personne dans le parcours de détail
ne manipule une adresse Zcash.

## Les frais sont payés en ZEC

Les frais du promoteur s'élèvent à **2,5 % par an**, à la date de cotation. Ils courent quotidiennement sous forme de
pourcentage de la valeur liquidative et sont, selon les termes du dépôt, « payables en ZEC
au Promoteur quotidiennement à terme échu ».

La conséquence est structurelle plutôt qu'accessoire. Les frais sont prélevés sur les
ZEC du fonds, de sorte que la quantité de ZEC garantissant chaque action diminue légèrement chaque
jour. Une action n'est pas une quantité fixe de ZEC détenue indéfiniment ; elle représente une créance
sur une quantité qui décroît lentement. Quiconque compare une exposition à long terme à ZCSH à la
simple détention de ZEC doit en tenir compte dans sa comparaison.

À titre de comparaison, 2,5 % représente environ dix fois les frais d'un ETF bitcoin au comptant typique.
Grayscale a indiqué que les premiers revenus tirés des frais du promoteur seraient réinvestis
dans le développement de l'écosystème Zcash.

## Ce qu'un actionnaire possède réellement

Une action offre une exposition au prix de ZEC. Ce n'est pas du ZEC.

Un actionnaire ne peut pas envoyer de transaction blindée, ne peut pas joindre de mémo, ne peut pas
détenir d'adresse unifiée et ne peut pas assurer lui-même la garde de ses actifs. Aucune des propriétés qui
distinguent Zcash des autres actifs n'est accessible par le biais de cette enveloppe — elle
ne transmet que le prix, et rien d'autre. Pour un investisseur qui souhaite une exposition
au sein d'un compte de courtage ou de retraite, c'est précisément l'objectif. Pour
quiconque s'intéresse à Zcash pour sa confidentialité, l'ETF ne remplace pas
un wallet, et les deux ne constituent pas vraiment des alternatives l'un à l'autre.

## Les ZEC sont détenus au grand jour

La structure présente une autre ironie, et c'est l'élément le plus frappant de
cette page. Coinbase Custody détient les ZEC du Trust dans des adresses
**transparentes**, et non blindées. Les avoirs du fonds sont visibles sur la chaîne,
traçables jusqu'au conservateur et observables en temps réel par toute personne souhaitant
les consulter. Rien dans ce fonds n'utilise une adresse blindée.

Il ne s'agit pas d'une omission. L'infrastructure des fonds réglementés repose sur l'audit
et l'attestation, et un solde blindé est précisément ce qu'un auditeur ne peut pas
vérifier indépendamment. Le propre service d'assistance de Coinbase reflète la même asymétrie : il
recevra des ZEC envoyés depuis une adresse blindée, mais n'envoie pas de ZEC vers
une telle adresse.

Ainsi, le plus grand détenteur institutionnel d'un actif de confidentialité le détient sous la seule
forme qui n'offre aucune confidentialité. Ce point provient de reportages plutôt que des
dépôts — le S-3 décrit la garde des clés privées du Trust, mais ne caractérise pas les
types d'adresses — et est présenté ici avec cette réserve.

## Quelle quantité de ZEC est concernée

Lors de la cotation, le 25 août 2026, le fonds détenait environ **387 000 ZEC**, avec
environ **313 millions de dollars** sous gestion.

Dans une perspective plus longue : au 30 septembre 2025, le dépôt indique que le Trust détenait
environ **2,4 % des ZEC en circulation**. Ces deux chiffres évoluent — le premier avec le
prix de ZEC ainsi qu'avec les créations et rachats, le second à mesure que les frais sont prélevés
sur les avoirs — il convient donc de consulter un chiffre actuel dans le dépôt le plus récent ou
dans la divulgation quotidienne du fonds plutôt que sur cette page.

## Sources

Toutes les sources primaires sont disponibles sur EDGAR sous le CIK 1720265, sauf indication contraire.

- [Grayscale Zcash Trust (ZEC) — index des dépôts de EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Déclaration d'enregistrement Form S-3, novembre 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — les rôles des entités, les mécanismes de création et de rachat, les frais du Promoteur et le pourcentage de ZEC en circulation
- [Form 10-K pour l'exercice clos le 31 décembre 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [Le Zcash ETF commence à être négocié sur NYSE Arca, le 25 août 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale page du fonds Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) — dates de création et informations actuelles
- [Le premier ETF de cryptomonnaie axé sur la confidentialité : à l'intérieur du dépôt de Grayscale auprès de Zcash](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — source secondaire ; la seule trouvée indiquant que les ZEC du Trust sont détenus dans des adresses transparentes

Les chiffres sont ceux des dates indiquées et évolueront. Vérifié le 30 septembre 2026.
À usage éducatif uniquement, ne constitue pas un conseil en investissement.
