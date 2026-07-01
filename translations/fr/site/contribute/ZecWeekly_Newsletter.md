<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly est une newsletter envoyée chaque vendredi matin. Elle comprend toutes les actualités survenues pendant la semaine dans l’écosystème Zcash.

Les actualités sont sélectionnées chaque semaine par des membres de la communauté et tous les liens pertinents sont ajoutés à la newsletter.

Veuillez vous abonner à la newsletter [ici](https://zechub.substack.com/).

## Contribuer

Les contributions à la newsletter fonctionnent mieux lorsqu’un contributeur prépare l’édition pour la bonne semaine, suit le fil actuel de prime ou de coordination, et soumet la pull request une fois que les liens hebdomadaires sont prêts. Veuillez ne pas soumettre une édition future avant que ZecHub ait publié ou confirmé la date de cette édition. Les pull requests ouvertes trop tôt manquent souvent les mises à jour de fin de semaine, entrent en conflit avec un curateur déjà désigné, ou utilisent la mauvaise échéance.

### 1. Confirmer l’édition en cours

Avant de commencer à écrire :

- Vérifiez les [issues GitHub de ZecHub](https://github.com/ZecHub/zechub/issues) et [Dework](https://app.dework.xyz/zechub-2424) pour trouver la tâche actuelle de la newsletter.
- Utilisez la date dans le titre de l’issue ou la description de la tâche comme source de vérité.
- Ouvrez l’issue et vérifiez si un autre contributeur a déjà commenté, a été assigné, ou a ouvert une pull request liée.
- Recherchez dans les pull requests ouvertes le numéro de l’issue et la date de l’édition avant de commencer. Par exemple, recherchez `is:pr is:open "May 30th" repo:ZecHub/zechub`.
- Si la tâche n’est pas claire, demandez dans l’issue, sur le Discord de ZecHub, ou en envoyant un message à [ZecHub sur Twitter](https://twitter.com/ZecHub) avant de préparer l’édition complète.

![Issues GitHub ouvertes filtrées pour les tâches actuelles de la newsletter ZecWeekly](assets/zecweekly-current-task-search.png)

### 2. Forker le dépôt

Si vous débutez sur GitHub, utilisez ce flux de travail :

1. Ouvrez le [dépôt ZecHub](https://github.com/ZecHub/zechub).
2. Cliquez sur **Fork** et créez un fork sous votre compte GitHub.
3. Dans votre fork, créez une nouvelle branche pour l’édition. Un nom de branche clair est utile, par exemple `digest-may-30-2026`.
4. Assurez-vous que votre pull request cible `ZecHub/zechub` comme dépôt de base et `main` comme branche de base.

Si vous utilisez la ligne de commande, le même flux de travail ressemble à ceci :

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Créer le fichier de la newsletter

Utilisez le [modèle de newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) comme point de départ. Les éditions de la newsletter doivent se trouver dans le dossier [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Lors de la création du fichier :

- Respectez le format de nom de fichier demandé par l’issue ou utilisé par les éditions récentes acceptées.
- Conservez le même ordre de sections que le modèle, sauf si la tâche demande un format différent.
- Ajoutez uniquement des liens de la semaine concernée.
- Rédigez une description courte et claire pour chaque lien afin que les lecteurs comprennent pourquoi il est important.
- Traduisez ou résumez en anglais les sources non anglophones lorsque c’est nécessaire.
- Vérifiez chaque lien avant d’ouvrir la pull request.

### 4. Collecter les liens au bon moment

ZecWeekly couvre normalement l’activité de l’écosystème Zcash pour la semaine en cours et est publiée vers la fin de la semaine. Le moment le plus sûr est :

- Commencez à collecter les liens après la publication de l’issue ou de la tâche actuelle de la newsletter.
- Conservez un brouillon tant que la semaine est encore en cours.
- Soumettez la pull request près de la date de soumission demandée, après avoir vérifié les mises à jour de fin de semaine.
- Ne soumettez pas la newsletter d’une semaine future avant que la tâche pour cette date n’existe ou avant que ZecHub confirme que vous devez la préparer.

Si une issue indique une date limite précise, suivez cette date. En cas de conflit entre cette page et une issue en cours, suivez l’issue en cours.

### 5. Ouvrir la pull request

Quand le fichier de votre newsletter est prêt :

1. Validez vos modifications dans votre fork.
2. Ouvrez une pull request vers `ZecHub/zechub` sur la branche `main`.
3. Utilisez un titre correspondant à l’édition, par exemple `Zcash Ecosystem Digest | May 30th`.
4. Liez l’issue dans le corps de la pull request afin que les relecteurs puissent relier le travail à la tâche.

Exemple de corps de pull request :

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Après l’ouverture de la pull request, surveillez les commentaires de relecture. Si ZecHub demande des modifications, mettez à jour la même branche au lieu d’ouvrir une deuxième pull request pour la même édition.

### Exemples réels

Utilisez ces pull requests fusionnées de newsletters comme exemples de soumissions acceptées :

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![Exemple de pull request fusionnée pour la newsletter ZecWeekly](assets/zecweekly-example-pr.png)

Lorsque vous comparez votre travail à un exemple, concentrez-vous sur l’emplacement du fichier, le format du titre, l’ordre des sections, les descriptions des liens, et sur le fait que la pull request renvoie bien à la bonne tâche.

### Erreurs courantes à éviter

- Ouvrir une pull request avant que la date de l’édition ou la tâche ne soit confirmée.
- Travailler sur une issue qui a déjà une pull request liée.
- Soumettre la pull request sur votre propre fork au lieu de `ZecHub/zechub`.
- Utiliser le mauvais nom de fichier ou placer le fichier en dehors du dossier `newsletter`.
- Copier une ancienne édition sans mettre à jour chaque date, lien et description.
- Ajouter des liens de la mauvaise semaine.
- Laisser des liens cassés, des liens en double, ou du texte d’exemple provenant du modèle.
- Ouvrir une nouvelle pull request après des commentaires de relecture au lieu de mettre à jour la branche d’origine.

### Liste de vérification finale

Avant de demander une relecture, confirmez que :

- La date de l’issue ou de la tâche correspond à votre fichier de newsletter.
- Aucune autre pull request ouverte ne couvre déjà la même issue ou la même édition.
- Le fichier se trouve dans le dossier `newsletter`.
- Les sections du modèle sont complètes.
- Chaque lien fonctionne et comporte une description utile.
- Le corps de la pull request lie la bonne issue.
- Vous êtes disponible pour apporter des modifications si les relecteurs en demandent.

## Éditions précédentes

[Archives de ZecWeekly](https://zechub.substack.com/p/archive)
