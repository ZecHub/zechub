# Aperçu du financement et de la gouvernance de Zcash

Le modèle de financement on-chain de Zcash, les mécanismes de récompense de bloc et les rôles des principales organisations

## 1. Fonctionnement des récompenses de bloc de Zcash

Zcash est une cryptomonnaie à preuve de travail. Chaque bloc miné distribue sa **subvention de bloc** (les ZEC nouvellement créés) ainsi que les frais de transaction selon une règle de protocole fixe, définie par les mises à niveau du réseau.

- **Modèle actuel (NU6.1 / depuis le 24 novembre 2025)**  
  La répartition est la suivante :

| Bénéficiaire                      | Pourcentage | Ce qui est financé / statut                                      |
|--------------------------------|------------|-------------------------------------------------------------|
| Mineurs                         | 80 %        | Récompense de bloc directe versée aux mineurs                               |
| Zcash Community Grants (ZCG)   | 8 %         | Subventions communautaires (jusqu'à environ 2028)                  |
| Fonds contrôlé par les détenteurs de pièces     | 12 %        | Alimenté initialement par l'ancienne lockbox ; les détenteurs de pièces votent sur les subventions ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **Ancien fonds de développement d'avant NU6 (2020 - novembre 2024)**  
  20 % de chaque subvention de bloc étaient versés directement à des organisations de développement :

  - 7 % -> Electric Coin Company (ECC) / Projet Bootstrap  
  - 5 % -> Zcash Foundation (ZF)  
  - 8 % -> Zcash Community Grants (ZCG)

Ce « fonds de développement » de 20 % a été remplacé par le modèle 8 % ZCG + 12 % lockbox via [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, novembre 2024). De novembre 2024 à novembre 2025, les 12 % se sont accumulés dans la lockbox du fonds de développement différé, sans aucun moyen de les dépenser.

### Modèle actuel : ZIP 1016 - Modèle de financement par la communauté et les détenteurs de pièces
La ZIP 1016 (créée en février 2025) a été activée sur le réseau principal par [NU6.1](/zcash-tech/nu6-1) au bloc 3 146 400, le 24 novembre 2025 ([ZIP 255](https://zips.z.cash/zip-0255)). Elle :
- Maintient l'allocation de 8 % à ZCG.
- A converti la lockbox de 12 % en un « Fonds contrôlé par les détenteurs de pièces » (alimenté par les fonds existants de la lockbox + la subvention de bloc continue de 12 %).
- S'applique jusqu'au troisième halving (la ZIP permet de décaler cette date si NU7 modifie le rythme des blocs).
- Permet aux détenteurs de pièces ZEC de voter sur les subventions (majorité simple, avec un minimum de 420 000 ZEC exprimés).
- Exige que des organisations détentrices de clés (comprenant actuellement ZF et Shielded Labs, Bootstrap/ECC étant mentionnés dans le contexte des subventions) administrent les versements via un multisig, dans le respect d'accords juridiques et des décisions des détenteurs de pièces.
- Conserve toutes les exigences de la ZIP 1015 relatives à l'utilisation de la lockbox (financement de subventions pour l'écosystème).

Ce modèle fait passer l'allocation de 12 % d'un contrôle par des organisations à une gouvernance directe par les détenteurs de pièces. Il ne modifie ni le processus ZIP ni les règles relatives à la marque.

## 2. Les principales organisations et leurs sources de financement

**Electric Coin Company (ECC) / Projet Bootstrap**  
- Créateurs à l'origine de Zcash (2016).  
- Ont historiquement reçu environ 7 % du fonds de développement jusqu'en novembre 2024.  
- En janvier 2026, l'équipe principale d'ingénierie et de produit a démissionné de Bootstrap/ECC en raison de différends liés à la gouvernance et a fondé le Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap ne reçoit plus de financement direct du protocole et n'emploie plus l'équipe de développement principale. L'organisation dépend des dons, des parrainages et de sa propre trésorerie.  
- Conserve une importance historique, mais n'est plus l'organisation active de développement du protocole.  
-> Voir le profil complet : [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Fondé en janvier 2026 par les développeurs d'origine du protocole Zcash (l'équipe principale d'ingénierie et de produit de ECC) après leur départ de Bootstrap/ECC.  
- A levé plus de 25 millions de dollars en financement d'amorçage auprès d'investisseurs majeurs, dont a16z Crypto et Coinbase Ventures.  
- L'équipe, composée des inventeurs et développeurs d'origine du protocole Zcash, poursuit le développement du protocole principal, les contributions à ZIP et des outils axés sur la confidentialité, dont le portefeuille mobile Zodl (anciennement Zashi).  
- Aucun financement on-chain direct du protocole ; fonctionne comme un laboratoire indépendant soutenu par du capital-risque et consacré à l'avancement de l'infrastructure de confidentialité de Zcash.  
-> Voir le profil complet : [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Site officiel : [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organisation indépendante à but non lucratif de type 501(c)(3), consacrée à l'infrastructure, aux logiciels de nœud, à la recherche et à la santé de l'écosystème.  
- A historiquement reçu 5 % du fonds de développement.  
- Ne reçoit plus de financement direct du protocole depuis NU6. Dépend des dons et des subventions.  
- Détient la marque Zcash (cédée par ECC en 2019) et joue un rôle central dans la gouvernance.  
- Gère le Zcash Community Advisory Panel (ZCAP) et contribue à l'organisation des sondages communautaires.  
- Agit en tant qu'organisation détentrice de clés dans le cadre de la ZIP 1016.  
-> Voir le profil complet : [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Site officiel : [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Le programme Zcash Community Grants finance des équipes et des projets indépendants afin qu'ils réalisent d'importants travaux de développement continus et d'autres travaux d'intérêt général pour l'écosystème Zcash.  
- Les subventions sont décidées par un comité élu par la communauté.  
- Continue de recevoir la totalité des 8 % des récompenses de bloc (depuis NU6), administrés par la Financial Privacy Foundation.  
- Les subventions sont attribuées selon un processus de candidature et de vote transparent, ouvert à la communauté.  
-> Voir le profil complet : [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Site officiel : [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Organisation à but non lucratif constituée aux îles Caïmans.  
- Reçoit directement du protocole l'allocation de 8 % de la subvention de bloc (conformément à la ZIP 1015) et assure l'ensemble de l'administration juridique, financière et opérationnelle du programme Zcash Community Grants.  
- Fournit la structure faîtière et le soutien administratif aux activités de ZCG, notamment pour les versements, les contrats et la conformité.  
- ZCG fonctionne comme une entité autonome élue par la communauté sous l'égide de la FPF.  
-> Voir le profil complet : [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Site officiel : [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organisation de soutien à Zcash indépendante, financée par des dons et basée en Suisse.  
- Première organisation de l'écosystème Zcash à n'avoir jamais reçu de financement direct ou indirect du fonds de développement ou des récompenses de bloc.  
- Se concentre sur des initiatives qui profitent aux détenteurs de ZEC et donne la priorité à la voix des détenteurs dans l'orientation de Zcash.  
- Agit en tant qu'organisation détentrice de clés dans le cadre de la ZIP 1016 pour l'administration du Fonds contrôlé par les détenteurs de pièces.  
- Contribue au développement du protocole, au processus ZIP et à la gouvernance (représentation parmi les éditeurs ZIP).  
-> Voir le profil complet : [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Site officiel : [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Gouvernance - Comment les décisions sont prises

La gouvernance de Zcash combine des « règles de protocole on-chain » et un « consensus social hors chaîne » :

1. **Processus ZIP (Zcash Improvement Proposals)**  
   - Tout le monde peut soumettre une ZIP.  
   - Débat public sur les forums, Discord et GitHub.  
   - Les éditeurs ZIP actuels sont Jack Grigg, Daira-Emma Hopwood et Kris Nuttycombe (à titre individuel) ; Arya et Marek (Zcash Foundation) ; Mark Henderson et Sam H. Smith (Shielded Labs) ; Sean Bowe et Tal Derei (Projet Tachyon) ; ainsi que Dev Ojha (Valar Group).
   - L'approbation d'une ZIP n'entraîne pas automatiquement son inclusion dans la prochaine mise à niveau du réseau. Les ZIP de consensus nécessitent un plan de déploiement et une implémentation, et leurs règles s'activent à la hauteur de mise à niveau du réseau spécifiée.

2. **Accord sur la marque (2019-2024)**  
   - ECC a cédé la marque Zcash à ZF en 2019.  
   - L'accord exigeait à l'origine le consentement mutuel de ECC et de ZF pour toute mise à niveau du réseau créant un nouveau protocole de consensus.  
   - En avril 2024, ECC a annoncé son intention d'y mettre fin ; l'avis formel de résiliation a été émis en août 2024.  
   - Depuis 2025, ZF est l'unique gardienne de la marque Zcash et a adopté une nouvelle politique de marque permissive, reflétant la décentralisation de l'écosystème. La marque ne fait plus office de mécanisme de veto en matière de gouvernance.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Groupe bénévole d'experts de l'écosystème.  
   - Utilisé pour des sondages communautaires non contraignants sur les décisions importantes.

4. **Ratification on-chain**  
   - Les mises à niveau du réseau s'activent à une hauteur de bloc prédéterminée. Les nœuds exécutant un logiciel compatible appliquent les nouvelles règles de consensus à partir de cette hauteur. Les nœuds qui ne se mettent pas à jour peuvent continuer à suivre une branche de consensus antérieure à la mise à niveau, ce qui peut entraîner une scission de la chaîne.

5. **La lockbox et la ZIP 1016**  
   - Les fonds de la lockbox de 12 % se sont accumulés dans le protocole de novembre 2024 à novembre 2025.  
   - NU6.1 les a convertis en Fonds contrôlé par les détenteurs de pièces, avec un vote des détenteurs de pièces et une administration multisig assurée par des organisations détentrices de clés (actuellement ZF et Shielded Labs).

## 4. Tableau récapitulatif - Évolution du financement

| Période           | Mineurs | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notes                                      |
|------------------|--------|---------------|------|------|---------|--------------------------------------------|
| 2020 - nov. 2024  | 80 %    | 7 %            | 5 %   | 8 %   | -       | Fonds de développement classique                           |
| Nov. 2024 - nov. 2025 | 80 % | 0 %            | 0 %   | 8 %   | 12 %     | Modèle NU6 + prolongation ZCG                  |
| Nov. 2025 - aujourd'hui (ZIP 1016) | 80 % | 0 %   | 0 %   | 8 %   | 12 % (contrôlé par les détenteurs de pièces) | NU6.1 ; jusqu'au 3e halving ; vote des détenteurs de pièces |

## 5. Ressources associées

- Explication officielle du financement -> [section financement du réseau sur z.cash](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (changement de financement NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modèle des détenteurs de pièces, en vigueur depuis NU6.1) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portail Zcash Community Grants -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Tableau de bord de la lockbox

Le tableau de bord ZecHub indique le montant actuel de ZEC dans la lockbox et le fonds des détenteurs de pièces, à consulter [ici](https://zechub.wiki/dashboard?tab=lockbox).
