<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Contribuer à ZecHub

ZecHub aide les gens à découvrir Zcash. Si vous lisez cette page, nous sommes vraiment ravis que vous envisagiez de contribuer ! Toute contribution que vous apporterez sera reflétée sur [zechub.wiki](https://www.zechub.wiki/) et les autres réseaux sociaux de ZecHub.

### Nouveaux contributeurs

Pour avoir une vue d’ensemble de ZecHub, lisez le [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Pour commencer

ZecHub utilise GitHub pour gérer les contributions de la communauté. Si vous débutez avec GitHub, ne vous inquiétez pas ! Nous allons vous expliquer comment vous pouvez vous impliquer en tant que contributeur communautaire à ZecHub. Nous versons des pourboires en ZEC protégés pour les contributions acceptées. Les montants des récompenses ne sont pas fixes en ZEC — consultez [Comment les récompenses sont définies](#how-rewards-are-set). Dans ce guide, vous aurez un aperçu du flux de contribution, de l’ouverture d’une issue à la création, la révision et la fusion d’une pull request (PR).


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="Comment contribuer à ZecHub !"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Rejoignez la conversation

Commencez par rejoindre la conversation via nos [liens communautaires](https://zechub.wiki/zcash-community/community-links).

### Guides de style

Toute contribution à ZecHub doit suivre le guide de style [ZecHub](https://zechub.wiki/contribute/style-guide). Cela inclut les wikis, la documentation et les contenus pour les réseaux sociaux.

### Comment vous pouvez contribuer

ZecHub est un projet porté par la communauté qui vise à fournir du soutien et des ressources aux utilisateurs et développeurs de Zcash. Il existe de nombreuses façons de s’impliquer auprès de ZecHub, notamment en écrivant pour notre newsletter hebdomadaire, en contribuant à notre base de connaissances ou en aidant sur des projets de développement.

Voici les types de contributions que ZecHub accepte actuellement :

### Comment les récompenses sont définies

Les pourboires sont versés en ZEC protégés. Les chiffres en ZEC qui figuraient auparavant dans les titres ci-dessous étaient des instantanés historiques à un ancien taux ZEC/USD. Ne les considérez pas comme des taux actuels.

Comment un montant est choisi :

1. Faites correspondre le travail à une fourchette en USD dans la [politique des montants de primes](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Choisissez un objectif dans cette fourchette — pas automatiquement le maximum.
3. Convertissez au cours spot public ZEC/USD et saisissez ZEC sur la prime :

```
zec_to_enter = usd_target / zec_usd_spot
```

Arrondissez à 4 décimales. Le fichier de politique est l’unique source de vérité. En cas de désaccord entre cette page et ce fichier, la politique prévaut.

Le travail rémunéré est répertorié sur [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties expliqué | Gagnez des ZEC en contribuant"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Trois états qui ne sont pas identiques :

1. **Fusionnée** — la PR est acceptée dans le dépôt.
2. **Récompense approuvée** — un sponsor ou la DAO accepte qu’une récompense soit due, ainsi que son montant.
3. **Payée** — ZEC atteint votre Unified Address protégé.

Une contribution fusionnée n’approuve pas à elle seule une récompense. Une récompense approuvée n’est pas un paiement effectué.

#### Travail de développement

Tout travail de développement approuvé qui contribue à bâtir l’écosystème Zcash. Cela peut inclure notre wiki, de nouveaux wallets ou toute application que vous pouvez imaginer.

#### Tutoriels Zcash (vidéo)

Voici un exemple de tutoriel ci-dessous :


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="Tutoriel d’installation de WSL + compilation/transaction zcashd"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Créez et partagez des tutoriels sur les applications Zcash et recevez une récompense. Soumettez une PR à zechub/tutorials ou envoyez votre vidéo au canal #video-content sur Discord. Si la vidéo répond à nos critères, nous la publierons et vous verserons un pourboire.

#### Wiki ZecHub - nouvelle page wiki publiée

Notre site wiki fournit des ressources pédagogiques sur Zcash dans un format simple et facile à assimiler. Zcash est une technologie très avancée avec une communauté dynamique ; il reste donc encore de la documentation à créer. Notre objectif est de créer de la documentation sur :

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Ces domaines sont assez vastes, il y a donc beaucoup de sujets sur lesquels travailler. Si vous cherchez de l’inspiration, consultez notre site actuel [wiki-docs](https://zechub.wiki/) et voyez ce qui manque. Une fois que vous avez déterminé ce que vous souhaitez écrire, commencez à apporter vos modifications et apprenez à soumettre une PR au dépôt ZecHub. Toute notre documentation est créée et maintenue dans ce dépôt. Suivez le guide de style [ZecHub](https://zechub.wiki/contribute/style-guide) lorsque vous rédigez une page wiki, et utilisez une page existante de la même section comme référence structurelle. Après avoir soumis une PR, envoyez un message à @dismad, @squirrel ou @vito dans la section #zechub du discord ; ils examineront votre PR et la fusionneront si elle est prête à être ajoutée au site. Si elle est fusionnée, ils ajouteront le document au site web ZecHub. Si le document n’est pas prêt, ils vous proposeront des modifications dans la PR.

#### Wiki ZecHub - page wiki traduite

L’objectif de ZecHub est de fournir un centre éducatif open source auquel toute personne de la communauté Zcash peut contribuer. L’une des plus grandes réussites de ce centre est de voir des membres de la communauté traduire les ressources ZecHub dans leur langue locale.

Remarque : la limite de traduction des pages Global de ZecHub est de 10 pages par semaine.

Les pages de langues sélectionnées sous `translations/<locale>/site/` sont suivies par rapport à leur source anglaise grâce à un manifeste de hachages sources. Consultez [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) pour la détection des contenus obsolètes, le flux de synchronisation et la validation des termes protégés.

#### Wiki ZecHub - modification d’un document existant

Parfois, les informations dans nos documents ne sont pas tout à fait exactes. Ce n’est pas grave. C’est pourquoi nous les avons publiés en open source ! Si vous trouvez quelque chose qui doit être modifié dans un wiki-doc, rendez-vous dans le pied de page du document (qui renvoie vers sa page GitHub) et proposez une modification via une PR.

#### Wiki ZecHub - lien brisé corrigé

Si vous trouvez qu’un lien est brisé ou qu’un élément important est mal orthographié, rendez-vous dans le pied de page du document (qui renvoie vers sa page GitHub) et proposez la modification via une PR.

#### Newsletter - nouvelle édition

Nous produisons la newsletter hebdomadaire de l’écosystème. C’est une façon très simple de participer ! La newsletter est publiée chaque vendredi ou samedi. Si vous souhaitez écrire une newsletter, envoyez un message à @squirrel dans la section #zecweekly de Discord pour le lui faire savoir.

Après cela, vous pouvez vous rendre dans la [section newsletter de ce dépôt](/newsletter/newsletterbasics.md) et soumettre une pull request pour créer une nouvelle édition de la newsletter. Veuillez suivre le format utilisé dans ce [modèle](/newsletter/newslettertemplate.md).

Après cela, @squirrel ou (sur Discord) verra que votre nouvelle édition de la newsletter est disponible ; ils l’examineront puis la fusionneront dans le dépôt. Après sa fusion, ils reprendront le contenu et le publieront via Substack.

#### Newsletter - traduction

Nous avons actuellement des éditions en espagnol, portugais et russe. Les versions traduites sont publiées sur leurs réseaux sociaux, et nous faisons de notre mieux pour les amplifier via les réseaux sociaux de ZecHub.

Si vous souhaitez traduire la newsletter dans votre langue locale, indiquez-nous depuis quel canal vous la partageriez et dans quelle langue vous publieriez la newsletter, afin que nous puissions coordonner sa publication.

#### Podcast - épisode publié sur les réseaux sociaux de ZecHub

Avez-vous une idée d’émission d’actualités, de podcast, de discussion Twitter ou d’un autre contenu vidéo/audio ? Dites-le-nous dans le canal #video-content de Discord et nous en discuterons.

Les récompenses pour ce type de contenu sont un peu plus élevées, une proposition devrait donc être soumise à la DAO de ZecHub avant d’approuver la dépense.

#### Publications créatives sur les réseaux sociaux

Nous souhaitons du nouveau contenu engageant pour nos réseaux sociaux. Les vidéos courtes, GIF, mèmes et autres publications créatives sont acceptés lorsqu’ils respectent le guide de style [ZecHub](https://zechub.wiki/contribute/style-guide). Le montant de la récompense suit la [politique des montants de primes](https://bounties.zechub.wiki/docs/bounty-amounts).

Vous pouvez également concevoir des miniatures pour notre newsletter et notre podcast. Si vous avez un talent pour le design, envoyez-nous un message dans #design sur Discord.

#### D’autres idées ? Faites-le-nous savoir !

Vous avez une autre suggestion ? Dites-le-nous dans #general sur Discord. Nous pourrons en discuter et voir si la DAO de ZecHub la soutiendra.

### Pour terminer

N’hésitez pas à commencer à contribuer à l’un des protocoles les plus respectés du secteur. C’est une excellente manière de vous impliquer auprès de Zcash. Si vous avez des questions concernant les contributions, faites-le-nous savoir sur [Discord](#join-the-conversation).

Merci !
