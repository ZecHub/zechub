<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly est une newsletter envoyée chaque dimanche matin. Elle rassemble toutes les actualités de la semaine dans l'écosystème Zcash. Les actualités sont sélectionnées chaque semaine par des membres de la communauté et tous les liens pertinents sont ajoutés à la newsletter. Abonnez-vous à la newsletter [ici](https://zechub.substack.com/).

## Contribuer

Les contributions à la newsletter fonctionnent mieux lorsqu'un seul contributeur prépare l'édition de la bonne semaine, suit le fil de prime ou de coordination en cours et soumet la pull request une fois les liens de la semaine prêts. Ne soumettez pas une édition future avant que ZecHub ait publié ou confirmé la date de cette édition. Les pull requests anticipées manquent souvent les actualités de fin de semaine, entrent en conflit avec un curateur désigné ou utilisent la mauvaise échéance.

### 1. Confirmez l'édition en cours

Avant de commencer à rédiger :

- Consultez [ZEC Bounties](https://bounties.zechub.wiki/) pour trouver la tâche de newsletter en cours.
- Attendez qu'elle vous soit attribuée.
- Les éditions de la newsletter relèvent de la tranche XS de la [politique des montants de primes](https://bounties.zechub.wiki/docs/bounty-amounts). Le chiffre ZEC indiqué sur la prime active correspond au montant, et non un ancien intitulé figurant dans les guides de contribution.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Forkez le dépôt

Si vous découvrez GitHub, suivez cette procédure :

1. Ouvrez le [dépôt ZecHub](https://github.com/ZecHub/zechub).
2. Cliquez sur **Fork** et créez un fork sous votre compte GitHub.
3. Dans votre fork, créez une nouvelle branche pour l'édition. Un nom de branche clair est utile, par exemple `digest-may-30-2026`.
4. Assurez-vous que votre pull request ciblera `ZecHub/zechub` comme dépôt de base et `main` comme branche de base.

Si vous utilisez la ligne de commande, la même procédure se présente ainsi :

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Remplacez `YOUR-USERNAME` par votre propre nom d'utilisateur GitHub. L'URL ci-dessus est un exemple fictif et ne fonctionnera pas telle quelle.

### 3. Créez le fichier de la newsletter

Utilisez le [modèle de newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) comme point de départ. Les éditions de la newsletter se trouvent dans le dossier [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Lors de la création du fichier :

- Respectez le format de nom de fichier demandé dans l'issue ou utilisé par les éditions récemment acceptées.
- Conservez le même ordre des sections que dans le modèle, sauf si la tâche demande un format différent.
- N'ajoutez que des liens de la semaine concernée.
- Rédigez une description courte et claire pour chaque lien afin que les lecteurs comprennent pourquoi il est important.
- Traduisez ou résumez en anglais les sources non anglophones si nécessaire.
- Vérifiez chaque lien avant d'ouvrir la pull request.

### 4. Collectez les liens au bon moment

ZecWeekly couvre normalement l'activité de l'écosystème Zcash de la semaine en cours et paraît vers la fin de la semaine. Le calendrier le plus sûr est le suivant :

- Commencez à collecter des liens après la publication de l'issue ou de la tâche de la newsletter en cours.
- Tenez un brouillon tant que la semaine est en cours.
- Soumettez la pull request à l'approche de la date de soumission demandée, après avoir vérifié les actualités de fin de semaine.
- Ne soumettez pas la newsletter d'une semaine future avant que la tâche pour cette date existe ou que ZecHub confirme que vous devez la préparer.

Si une issue indique une date de soumission précise, respectez cette date. En cas de contradiction entre cette page et une issue en cours, suivez l'issue en cours.

### 5. Ouvrez la pull request

Lorsque votre fichier de newsletter est prêt :

1. Committez vos modifications dans votre fork.
2. Ouvrez une pull request vers `ZecHub/zechub` sur la branche `main`.
3. Utilisez un titre correspondant à l'édition, par exemple `Zcash Ecosystem Digest | May 30th`.
4. Mentionnez l'issue dans le corps de la pull request afin que les relecteurs puissent relier le travail à la tâche.

Exemple de corps de pull request :

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Une fois la pull request ouverte, surveillez les commentaires de relecture. Si ZecHub demande des modifications, mettez à jour la même branche au lieu d'ouvrir une seconde pull request pour la même édition.

### Exemples réels

Servez-vous de ces pull requests de newsletter fusionnées comme exemples de soumissions acceptées :

- [Synthèse de l'écosystème Zcash | 11 avril](https://github.com/ZecHub/zechub/pull/1551)
- [Synthèse de l'écosystème Zcash | 28 mars](https://github.com/ZecHub/zechub/pull/1544)
- [Synthèse de l'écosystème Zcash | 14 février](https://github.com/ZecHub/zechub/pull/1474)


![Exemple de pull request fusionnée pour la newsletter ZecWeekly](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Lorsque vous comparez votre travail à un exemple, concentrez-vous sur l'emplacement du fichier, le format du titre, l'ordre des sections, les descriptions des liens et le fait que la pull request renvoie bien à la bonne tâche.

### Erreurs courantes à éviter

- Ouvrir une pull request avant que la date de l'édition ou la tâche soit confirmée.
- Travailler sur une issue à laquelle une pull request est déjà liée.
- Soumettre la pull request à votre propre fork au lieu de `ZecHub/zechub`.
- Utiliser un mauvais nom de fichier ou placer le fichier en dehors du dossier `newsletter`.
- Copier une ancienne édition sans mettre à jour chaque date, lien et description.
- Ajouter des liens de la mauvaise semaine.
- Laisser des liens cassés, des liens en double ou du texte provisoire issu du modèle.
- Ouvrir une nouvelle pull request après des commentaires de relecture au lieu de mettre à jour la branche d'origine.

### Liste de vérification finale

Avant de demander une relecture, vérifiez que :

- La date de l'issue ou de la tâche correspond à votre fichier de newsletter.
- Aucune autre pull request ouverte ne couvre déjà la même issue ou édition.
- Le fichier se trouve dans le dossier `newsletter`.
- Les sections du modèle sont complètes.
- Chaque lien fonctionne et dispose d'une description utile.
- Le corps de la pull request renvoie à la bonne issue.
- Vous êtes disponible pour apporter des modifications si les relecteurs en demandent.

## Éditions précédentes

[Archives ZecWeekly](https://zechub.substack.com/p/archive)
