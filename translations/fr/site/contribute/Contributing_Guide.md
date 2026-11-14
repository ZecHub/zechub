<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Contribuer à ZecHub

ZecHub aide les gens à se familiariser avec Zcash. Si vous lisez cette page, nous sommes ravis que vous envisagiez de contribuer ! Chacune de vos contributions apparaîtra sur [zechub.wiki](https://www.zechub.wiki/) et sur les autres réseaux sociaux de ZecHub.

### Nouveaux contributeurs

Pour avoir une vue d'ensemble de ZecHub, lisez le [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Premiers pas

ZecHub utilise GitHub pour gérer les contributions de la communauté. Si vous découvrez GitHub, pas d'inquiétude ! Nous allons vous expliquer en détail comment vous impliquer en tant que contributeur communautaire de ZecHub. Nous versons des pourboires en ZEC protégés pour les contributions acceptées. Les montants des récompenses ne sont pas fixés en ZEC : consultez [Comment les récompenses sont fixées](#how-rewards-are-set). Dans ce guide, vous trouverez une vue d'ensemble du processus de contribution : ouverture d'une issue, création d'une pull request (PR), relecture et fusion de la PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Rejoignez la conversation

Tout d'abord, rejoignez la conversation via nos [liens communautaires](https://zechub.wiki/zcash-community/community-links).

### Guides de style

Toute contribution à ZecHub doit respecter le [guide de style de ZecHub](https://zechub.wiki/contribute/style-guide). Cela concerne les wikis, la documentation et les contenus pour les réseaux sociaux.

### Comment contribuer

ZecHub est un projet communautaire qui vise à offrir du soutien et des ressources aux utilisateurs et aux développeurs de Zcash. Il existe de nombreuses façons de participer à ZecHub : rédiger pour notre newsletter hebdomadaire, enrichir notre base de connaissances ou aider aux projets de développement.

Voici les types de contributions que ZecHub accepte actuellement :

### Comment les récompenses sont fixées

Les pourboires sont versés en ZEC protégés. Les montants en ZEC qui figuraient auparavant dans les titres ci-dessous étaient des instantanés historiques fondés sur un ancien taux ZEC/USD. Ne les considérez pas comme des taux actuels.

Comment un montant est choisi :

1. Associez le travail à une fourchette en USD de la [politique des montants de primes](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Choisissez une cible à l'intérieur de cette fourchette, pas automatiquement le maximum.
3. Convertissez au cours au comptant public ZEC/USD et indiquez ZEC sur la prime :

```
zec_to_enter = usd_target / zec_usd_spot
```

Arrondissez à 4 décimales. Le fichier de politique est l'unique source de référence. Si cette page et ce fichier divergent, la politique prévaut.

Les travaux rémunérés sont listés sur [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Trois états qui ne sont pas équivalents :

1. **Fusionnée** : la PR est acceptée dans le dépôt.
2. **Récompense approuvée** : un sponsor ou la DAO convient qu'une récompense est due, et de son montant.
3. **Payée** : les ZEC arrivent sur votre Unified Address protégée.

Une contribution fusionnée n'approuve pas à elle seule une récompense. Une récompense approuvée n'est pas un paiement effectué.

#### Travail de développement

Tout travail de développement approuvé qui contribue à construire l'écosystème Zcash. Cela peut inclure notre wiki, de nouveaux portefeuilles ou toute application à laquelle vous pouvez penser.

#### Tutoriels Zcash (vidéo)

Voici un exemple de tutoriel ci-dessous :


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Créez et partagez des tutoriels sur les applications Zcash et soyez récompensé. Soumettez une PR à zechub/tutorials ou envoyez votre vidéo sur le canal #video-content de Discord. Si la vidéo répond à nos critères, nous la publierons et vous verserons un pourboire.

#### Wiki ZecHub : nouvelle page de wiki publiée

Notre site wiki propose des contenus pédagogiques sur Zcash dans un format simple et facile à assimiler. Zcash est une technologie très avancée, dotée d'une communauté dynamique, et il reste donc encore beaucoup de documentation à créer. Notre objectif est de produire de la documentation sur :

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Ce sont des domaines assez vastes, il y a donc beaucoup de matière. Si vous cherchez de l'inspiration, consultez notre [site de documentation wiki](https://zechub.wiki/) actuel et voyez ce qui manque. Une fois que vous avez choisi ce que vous voulez écrire, commencez vos modifications et apprenez à soumettre une PR au dépôt ZecHub. Toute notre documentation est créée et maintenue dans ce dépôt. Suivez le [guide de style de ZecHub](https://zechub.wiki/contribute/style-guide) lorsque vous rédigez une page de wiki, et prenez une page existante de la même section comme modèle de structure. Après avoir soumis une PR, envoyez un message à @dismad, @squirrel ou @vito dans la section #zechub du Discord : ils relironont votre PR et la fusionneront si elle est prête à être ajoutée au site. Si elle est fusionnée, ils ajouteront le document au site web ZecHub. Si le document n'est pas prêt, ils vous suggéreront des modifications dans la PR.

#### Wiki ZecHub : page de wiki traduite

L'objectif de ZecHub est de proposer un centre éducatif open source auquel tout membre de la communauté Zcash peut contribuer. L'une des plus grandes réussites de ce centre est de voir des membres de la communauté traduire les contenus ZecHub dans leur langue.

À noter : la limite globale de traduction de pages de ZecHub est de 10 pages par semaine.

Les pages localisées sélectionnées sous `translations/<locale>/site/` sont suivies par rapport à leur source anglaise grâce à un manifeste de hachages des sources. Consultez [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) pour la détection des pages obsolètes, le processus de synchronisation et la validation des termes protégés.

#### Wiki ZecHub : modification d'un document existant

Il arrive que les informations de notre documentation ne soient pas tout à fait exactes. Ce n'est pas grave. C'est justement pour cela que nous la publions en open source ! Si vous trouvez quelque chose à modifier dans un document du wiki, rendez-vous en bas du document (qui renvoie vers sa page GitHub) et proposez une modification via une PR.

#### Wiki ZecHub : lien cassé corrigé

Si vous constatez qu'un lien est cassé ou que quelque chose d'important est mal orthographié, rendez-vous en bas du document (qui renvoie vers sa page GitHub) et proposez la modification via une PR.

#### Newsletter : nouvelle édition

Nous produisons la newsletter hebdomadaire de l'écosystème. C'est une façon très simple et peu exigeante de participer ! La newsletter paraît chaque vendredi ou samedi. Si vous souhaitez rédiger une newsletter, envoyez un message à @squirrel dans la section #zecweekly de Discord pour le prévenir.

Ensuite, vous pouvez vous rendre dans la [section newsletter de ce dépôt](/newsletter/newsletterbasics.md) et soumettre une pull request pour créer une nouvelle édition de la newsletter. Veuillez respecter le format utilisé dans ce [modèle](/newsletter/newslettertemplate.md).

Une fois cela fait, @squirrel (ou dans Discord) verra que votre nouvelle édition de la newsletter est disponible, la relira puis la fusionnera dans le dépôt. Après la fusion, le contenu sera publié via Substack.

#### Newsletter : traduction

Nous avons actuellement des éditions en espagnol, en portugais et en russe. Les versions traduites sont publiées sur leurs propres réseaux sociaux, et nous faisons de notre mieux pour leur donner de la visibilité via les réseaux sociaux de ZecHub.

Si vous souhaitez traduire la newsletter dans votre langue, indiquez-nous le canal sur lequel vous la partageriez et la langue dans laquelle vous la publieriez, afin que nous puissions coordonner sa sortie.

#### Podcast : épisode publié sur les réseaux sociaux de ZecHub

Vous avez une idée d'émission d'actualité, de podcast, de conférence Twitter ou d'un autre contenu vidéo ou audio ? Parlez-nous-en dans #video-content sur Discord et nous en discuterons.

Les récompenses pour ce type de contenu sont un peu plus élevées : une proposition devra donc être soumise à la DAO de ZecHub avant l'approbation de la dépense.

#### Publications créatives pour les réseaux sociaux

Nous recherchons de nouveaux contenus engageants pour nos réseaux sociaux. Les vidéos courtes, GIF, mèmes et autres publications créatives sont acceptés s'ils respectent le [guide de style de ZecHub](https://zechub.wiki/contribute/style-guide). Le montant de la récompense suit la [politique des montants de primes](https://bounties.zechub.wiki/docs/bounty-amounts).

Vous pouvez aussi concevoir des miniatures pour notre newsletter et notre podcast. Si vous avez un talent de designer, écrivez-nous dans #design sur Discord.

#### D'autres idées ? Faites-le-nous savoir !

Vous avez une autre suggestion ? Parlez-nous-en dans #general sur Discord. Nous pourrons en discuter et voir si la DAO de ZecHub est prête à la soutenir.

### Pour conclure

N'hésitez pas à commencer à contribuer à l'un des protocoles les plus respectés du secteur. C'est une excellente façon de vous impliquer dans Zcash. Si vous avez des questions sur la contribution, faites-le-nous savoir sur [Discord](#join-the-conversation).

Merci !
