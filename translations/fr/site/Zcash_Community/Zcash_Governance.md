# Aperçu du financement et de la gouvernance de Zcash

Le modèle de financement on-chain de Zcash, les mécanismes de récompense de bloc et les rôles des principales organisations

## 1. Fonctionnement des récompenses de bloc de Zcash

Zcash est une cryptomonnaie en Proof-of-Work. Chaque bloc miné distribue sa **subvention de bloc** (les ZEC nouvellement créés) ainsi que les frais de transaction selon un ensemble fixe de règles de protocole défini par les mises à niveau du réseau.

- **Modèle actuel (post-NU6 / à partir de novembre 2024)**  
  En avril 2026, la répartition est la suivante :

| Bénéficiaire                   | Pourcentage | Ce que cela finance / statut                               |
|--------------------------------|-------------|-------------------------------------------------------------|
| Mineurs                        | 80%         | Récompense de bloc directe aux mineurs                      |
| Zcash Community Grants (ZCG)   | 8%          | Subventions communautaires (se poursuit jusqu’en ~2028)     |
| Lockbox (contrôlée par le protocole) | 12%   | Les fonds s’accumulent ; aucun mécanisme de dépense pour l’instant ; un futur vote communautaire sera requis |

- **Historique du dev fund pré-NU6 (2020-nov. 2024)**  
  20% de chaque subvention de bloc allait directement aux organisations de développement :

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Ce « dev fund » de 20% a été remplacé par le modèle 8% ZCG + 12% lockbox via [ZIP 1015](https://zips.z.cash/zip-1015).

### Évolution proposée : ZIP 1016 - Modèle de financement communautaire et des détenteurs de coins
ZIP 1016 (proposé en février 2025, statut : Proposed) introduit un modèle de financement plus décentralisé. Il :
- maintiendrait l’allocation de 8% à ZCG.
- convertirait le lockbox de 12% en un « Coinholder-Controlled Fund » (alimenté par les fonds existants du lockbox + la subvention continue de bloc de 12%).
- activerait ce modèle jusqu’au troisième halving (environ 3 ans).
- donnerait aux détenteurs de ZEC le pouvoir de voter chaque trimestre sur les subventions via un processus défini par la communauté (majorité simple, quorum minimum de 420,000 ZEC).
- exigerait que les Key-Holder Organizations (incluant actuellement ZF et Shielded Labs, avec Bootstrap/ECC mentionné dans les contextes de subventions) administrent les décaissements via multisig, dans le cadre d’accords juridiques et des décisions des détenteurs de coins.
- maintiendrait toutes les exigences de ZIP 1015 concernant l’utilisation du lockbox (financement de subventions pour l’écosystème).

Cette proposition vise à faire passer l’allocation de 12% d’une gouvernance contrôlée par des organisations à une gouvernance directe par les détenteurs de coins. Elle ne modifie ni le processus ZIP ni les règles relatives à la marque.

## 2. Les organisations clés et leurs sources de financement

**Electric Coin Company (ECC) / Bootstrap Project**  
- Créateurs originels de Zcash (2016).  
- A historiquement reçu ~7% du dev fund jusqu’en novembre 2024.  
- En janvier 2026, l’équipe principale d’ingénierie et de produit a démissionné de Bootstrap/ECC en raison de différends de gouvernance et a formé le Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap ne reçoit plus de financement direct du protocole et n’emploie plus l’équipe principale de développement. Elle dépend de dons, de parrainages et de sa propre trésorerie.  
- Conserve une importance historique, mais n’est plus l’organisation active de développement du protocole.  
-> Voir le profil complet : [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formé en janvier 2026 par les développeurs originels du protocole Zcash (l’équipe principale d’ingénierie et de produit d’ECC) après leur départ de Bootstrap/ECC.  
- A levé plus de 25 millions de dollars en financement seed auprès de grands investisseurs, dont a16z Crypto et Coinbase Ventures.  
- L’équipe, composée des inventeurs et développeurs originels du protocole Zcash, poursuit le développement principal du protocole, les contributions ZIP et les outils axés sur la confidentialité, y compris le portefeuille mobile Zodl (rebaptisé à partir de Zashi).  
- Aucun financement direct on-chain du protocole ; fonctionne comme un laboratoire indépendant soutenu par du capital-risque, axé sur l’avancement de l’infrastructure de confidentialité de Zcash.  
-> Voir le profil complet : [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Site officiel : [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organisation à but non lucratif indépendante 501(c)(3), centrée sur l’infrastructure, les logiciels de nœud, la recherche et la santé de l’écosystème.  
- A historiquement reçu 5% du dev fund.  
- Ne reçoit plus de financement direct du protocole depuis NU6. Dépend des dons et des subventions.  
- Détient la marque Zcash (donnée par ECC en 2019) et joue un rôle central dans la gouvernance.  
- Gère le Zcash Community Advisory Panel (ZCAP) et aide à faciliter les consultations communautaires.  
- Agit comme Key-Holder Organization dans le cadre de la proposition ZIP 1016.  
-> Voir le profil complet : [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Site officiel : [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Le programme Zcash Community Grants finance des équipes et projets indépendants afin d’assurer un développement majeur continu et d’autres travaux pour le bien public de l’écosystème Zcash.  
- Les subventions sont décidées par un comité élu par la communauté.  
- Continue de recevoir l’intégralité des 8% des récompenses de bloc (post-NU6), administrés via la Financial Privacy Foundation.  
- Les subventions sont attribuées par un processus transparent de candidature et de vote ouvert à la communauté.  
-> Voir le profil complet : [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Site officiel : [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Organisation à but non lucratif constituée aux îles Caïmans.  
- Reçoit directement du protocole l’allocation de 8% de la subvention de bloc (selon ZIP 1015) et assure toute l’administration juridique, financière et opérationnelle du programme Zcash Community Grants.  
- Fournit la structure-cadre et le support administratif aux opérations de ZCG, y compris les décaissements, les contrats et la conformité.  
- ZCG fonctionne comme une entité autonome élue par la communauté sous l’égide de FPF.  
-> Voir le profil complet : [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Site officiel : [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organisation indépendante de soutien à Zcash, financée par des dons et basée en Suisse.  
- Première organisation de l’écosystème Zcash à n’avoir jamais reçu de financement direct ou indirect provenant du Development Fund ou des récompenses de bloc.  
- Se concentre sur des initiatives bénéfiques aux détenteurs de ZEC et donne la priorité à leur voix dans l’orientation de Zcash.  
- Agit comme Key-Holder Organization dans le cadre de la proposition ZIP 1016 pour l’administration du Coinholder-Controlled Fund.  
- Contribue au développement du protocole, au processus ZIP et à la gouvernance (représentation parmi les éditeurs ZIP).  
-> Voir le profil complet : [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Site officiel : [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Gouvernance - Comment les décisions sont prises

La gouvernance de Zcash est un mélange de « règles de protocole on-chain » et de « consensus social off-chain » :

1. **Processus ZIP (Zcash Improvement Proposals)**  
   - N’importe qui peut soumettre une ZIP.  
   - Débat public sur les forums, Discord, GitHub.  
   - Les éditeurs ZIP (actuellement Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe à titre individuel, Arya de ZF, et des représentants de Shielded Labs) examinent les propositions et décident de leur acceptation.  
   - Les ZIP acceptées sont incluses dans la prochaine mise à niveau du réseau.

2. **Accord sur la marque (2019-2024)**  
   - ECC a donné la marque Zcash à ZF en 2019.  
   - L’accord exigeait à l’origine le consentement mutuel d’ECC et de ZF pour toute mise à niveau du réseau créant un nouveau protocole de consensus.  
   - En avril 2024, ECC a annoncé son intention d’y mettre fin ; l’avis formel de résiliation a été émis en août 2024.  
   - Depuis 2025, ZF est l’unique gardienne de la marque Zcash et a adopté une nouvelle politique de marque permissive reflétant la décentralisation de l’écosystème. La marque ne sert plus de mécanisme de veto de gouvernance.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Groupe bénévole d’experts de l’écosystème.  
   - Utilisé pour des consultations communautaires non contraignantes sur les décisions majeures.

4. **Ratification on-chain**  
   - Une fois qu’une mise à niveau du réseau est déployée, la majorité du hash rate du réseau doit l’adopter (pas de risque de hard fork si le consensus est atteint).

5. **Orientation future - Le Lockbox et ZIP 1016**  
   - Les fonds du lockbox à 12% s’accumulent dans le protocole.  
   - ZIP 1016 propose de le convertir en Coinholder-Controlled Fund avec un vote trimestriel des détenteurs de coins et une administration multisig par des Key-Holder Organizations (ZF et Shielded Labs sont actuellement mentionnées).

## 4. Tableau de référence rapide - Évolution du financement

| Période          | Mineurs | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notes                                      |
|------------------|---------|---------------|------|------|---------|--------------------------------------------|
| 2020 - nov. 2024 | 80%     | 7%            | 5%   | 8%   | -       | Dev fund classique                         |
| Nov 2024 - aujourd’hui | 80% | 0%         | 0%   | 8%   | 12%     | Modèle NU6 + extension de ZCG              |
| Proposé (ZIP 1016) | 80% | 0%         | 0%   | 8%   | 12% (Coinholder-Controlled) | Jusqu’au 3e halving ; vote des détenteurs de coins |

## 5. Ressources associées

- Explication officielle du financement -> [section financement de z.cash/network](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (changement de financement NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modèle proposé pour les détenteurs de coins) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portail Zcash Community Grants -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com) (ou le site FPF actuel)

## 6. Tableau de bord du Lockbox

Le tableau de bord ZecHub affiche le montant actuel de ZEC dans le Lockbox et le fonds des détenteurs de coins [ici](https://zechub.wiki/dashboard?tab=lockbox).
