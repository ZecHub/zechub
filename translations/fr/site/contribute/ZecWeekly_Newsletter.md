<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly est une newsletter envoyée chaque dimanche matin. Elle inclut toutes les actualités survenues pendant la semaine dans l’écosystème Zcash. Les actualités sont sélectionnées chaque semaine par des membres de la communauté, et tous les liens pertinents sont ajoutés à la newsletter. Veuillez vous abonner à la newsletter [ici](https://zechub.substack.com/).

## Contribuer

Les contributions à la newsletter fonctionnent mieux lorsqu’un contributeur prépare l’édition pour la bonne semaine, suit le fil actuel de prime ou de coordination, et soumet la pull request une fois que les liens hebdomadaires sont prêts. Veuillez ne pas soumettre une édition future avant que ZecHub n’ait publié ou confirmé la date de cette édition. Les pull requests envoyées trop tôt manquent souvent des mises à jour de fin de semaine, entrent en conflit avec un curateur déjà désigné ou utilisent la mauvaise échéance.

### 1. Confirmer l’édition en cours

Avant de commencer à écrire :

- Consultez [ZEC Bounties ](https://bounties.zechub.wiki/) pour la tâche actuelle de la newsletter.
- Attendez d’être assigné

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. Forker le dépôt

Si vous débutez sur GitHub, utilisez ce workflow :

1. Ouvrez le [dépôt ZecHub](https://github.com/ZecHub/zechub).
2. Cliquez sur **Fork** et créez un fork sous votre compte GitHub.
3. Dans votre fork, créez une nouvelle branche pour l’édition. Un nom de branche clair est utile, par exemple `digest-may-30-2026`.
4. Assurez-vous que votre pull request cible `ZecHub/zechub` comme dépôt de base et `main` comme branche de base.

Si vous utilisez la ligne de commande, le même workflow ressemble à ceci :

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Créer le fichier de la newsletter

Utilisez le [modèle de newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) comme point de départ. Les éditions de la newsletter doivent être placées dans le dossier [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Lors de la création du fichier :

- Respectez le format de nom de fichier demandé par l’issue ou utilisé par les éditions récentes acceptées.
- Conservez le même ordre des sections que dans le modèle, sauf si la tâche demande un format différent.
- Ajoutez uniquement les liens de la semaine concernée.
- Rédigez une description courte et claire pour chaque lien afin que les lecteurs comprennent pourquoi il est important.
- Traduisez ou résumez en anglais les sources non anglophones si nécessaire.
- Vérifiez chaque lien avant d’ouvrir la pull request.

### 4. Collecter les liens au bon moment

ZecWeekly couvre normalement l’activité de l’écosystème Zcash pour la semaine en cours et est publiée vers la fin de la semaine. Le moment le plus sûr est le suivant :

- Commencez à collecter les liens après la publication de l’édition actuelle de la newsletter ou de la tâche correspondante.
- Conservez un brouillon tant que la semaine est encore en cours.
- Soumettez la pull request près de la date de soumission demandée, après avoir vérifié les mises à jour de fin de semaine.
- Ne soumettez pas la newsletter d’une semaine future avant que la tâche pour cette date n’existe ou avant que ZecHub ne confirme que vous devez la préparer.

Si une issue indique de soumettre avant une date précise, suivez cette date. S’il y a un conflit entre cette page et une issue en cours, suivez l’issue en cours.

### 5. Ouvrir la pull request

Lorsque votre fichier de newsletter est prêt :

1. Committez vos modifications dans votre fork.
2. Ouvrez une pull request vers `ZecHub/zechub` sur la branche `main`.
3. Utilisez un titre correspondant à l’édition, par exemple `Zcash Ecosystem Digest | May 30th`.
4. Liez l’issue dans le corps de la pull request afin que les reviewers puissent relier le travail à la tâche.

Exemple de corps de pull request :

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Après l’ouverture de la pull request, surveillez les commentaires de review. Si ZecHub demande des modifications, mettez à jour la même branche au lieu d’ouvrir une deuxième pull request pour la même édition.

### Exemples réels

Utilisez ces pull requests de newsletter fusionnées comme exemples de soumissions acceptées :

- [Zcash Ecosystem Digest | 11 avril](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 mars](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 février](https://github.com/ZecHub/zechub/pull/1474)


![Exemple de pull request de newsletter ZecWeekly fusionnée](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

Lorsque vous comparez votre travail à un exemple, concentrez-vous sur l’emplacement du fichier, le format du titre, l’ordre des sections, les descriptions des liens et sur le fait que la pull request renvoie bien à la bonne tâche.

### Erreurs courantes à éviter

- Ouvrir une pull request avant que la date de l’édition ou la tâche ne soit confirmée.
- Travailler sur une issue qui a déjà une pull request liée.
- Soumettre la pull request vers votre propre fork au lieu de `ZecHub/zechub`.
- Utiliser le mauvais nom de fichier ou placer le fichier en dehors du dossier `newsletter`.
- Copier une ancienne édition sans mettre à jour chaque date, lien et description.
- Ajouter des liens provenant de la mauvaise semaine.
- Laisser des liens cassés, des liens en double ou du texte de remplissage provenant du modèle.
- Ouvrir une nouvelle pull request après des commentaires de review au lieu de mettre à jour la branche d’origine.

### Checklist finale

Avant de demander une review, confirmez que :

- La date de l’issue ou de la tâche correspond à votre fichier de newsletter.
- Aucune autre pull request ouverte ne couvre déjà la même issue ou édition.
- Le fichier se trouve dans le dossier `newsletter`.
- Les sections du modèle sont complètes.
- Chaque lien fonctionne et comporte une description utile.
- Le corps de la pull request lie la bonne issue.
- Vous êtes disponible pour effectuer des modifications si les reviewers en demandent.

## Éditions passées

[Archives ZecWeekly](https://zechub.substack.com/p/archive)
