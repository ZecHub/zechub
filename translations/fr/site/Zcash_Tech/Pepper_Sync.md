<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## En bref

* Pepper Sync est le moteur de synchronisation introduit dans Zingo! 2.0, le portefeuille Zcash open source développé par Zingo Labs.
* Il utilise une synchronisation non linéaire au lieu de parcourir la chaîne par grands segments successifs. Votre solde et vos transactions apparaissent ainsi bien plus tôt.
* La progression est enregistrée en continu. Si la connexion est interrompue ou si l'application se ferme, la synchronisation reprend là où elle s'était arrêtée au lieu de recommencer depuis le début.
* Vous pouvez dépenser vos fonds avant la fin de la synchronisation.
* Les transactions protégées restent confidentielles tout au long du processus.

## Explication principale

Zingo 2.0 est la dernière version du portefeuille Zingo!, un portefeuille léger et open source conçu pour la communauté Zcash. La vedette de cette version est Pepper Sync, une mise à niveau majeure qui repense entièrement la manière dont les portefeuilles se connectent à la blockchain.

Auparavant, la synchronisation pouvait être terriblement lente, sujette aux erreurs et gourmande en ressources, obligeant parfois les utilisateurs à tout recommencer depuis le début. Pepper Sync change tout cela. La synchronisation devient plus rapide, plus fluide, plus fiable et moins exigeante pour votre appareil, tout en préservant pleinement la confidentialité des transactions protégées.

Que vous soyez un tout nouvel utilisateur qui essaie Zcash pour la première fois ou un membre de longue date de la communauté gérant plusieurs portefeuilles protégés, Pepper Sync rend l'expérience bien plus pratique et agréable.

### Principales fonctionnalités de Pepper Sync

Pepper Sync apporte plusieurs améliorations :

- Synchronisation beaucoup plus rapide - Votre portefeuille est prêt en quelques minutes, et non en plusieurs heures.
- Mises à jour intelligentes - Les données sont traitées par petits segments, ce qui évite les analyses complètes.
- Résistance aux interruptions - Si votre connexion est coupée, la synchronisation reprend là où elle s'était arrêtée.
- Légèreté et efficacité - Optimisé pour les téléphones, les ordinateurs portables et les autres appareils peu puissants.
- Retours plus clairs - Les indications de progression en temps réel limitent la confusion.
- Respect de la confidentialité - Les transactions protégées restent confidentielles tout au long du processus.

### Ce qui s'est amélioré

Les anciennes versions de Zingo frustraient souvent les utilisateurs par de longs temps de synchronisation, une gestion des erreurs peu claire et une forte consommation de ressources. Pepper Sync corrige ces problèmes courants :

| Fonctionnalité            | Versions précédentes de Zingo                | Zingo 2.0 avec Pepper Sync                   |
| ------------------ | -------------------------------------- | -------------------------------------------- |
| Vitesse de synchronisation         | Plus lente, surtout lors de la première configuration      | Synchronisation initiale et continue beaucoup plus rapide         |
| Gestion des erreurs     | Blocages occasionnels et échecs peu clairs | Stabilité améliorée avec reprise automatique   |
| Expérience utilisateur    | La synchronisation semblait « opaque » aux nouveaux venus        | Transparente, avec un état et des mises à jour plus clairs |
| Performances de l'appareil | Forte utilisation du processeur et de la mémoire                  | Optimisé pour une utilisation fluide des ressources            |

En résumé : la synchronisation est désormais plus rapide, plus fiable et plus facile à comprendre.

## Illustration et analogie

Imaginez la synchronisation d'un ancien portefeuille comme la lecture à voix haute d'un très long livre depuis la première page, avant d'avoir le droit d'en dire quoi que ce soit. Si vous vous arrêtez à la moitié, vous recommencez à la première page. Pepper Sync lit le même livre, mais il garde un marque-page, lit d'abord les chapitres qui vous concernent et vous laisse parler de l'histoire avant d'avoir terminé la dernière page.

Le marque-page est l'élément essentiel. Toutes les versions précédentes considéraient une synchronisation interrompue comme du travail perdu ; Pepper Sync la considère comme une simple pause.

### Guides visuels

- Flux détaillé - Montre l'ensemble du processus. ![Detailed Flow](/content-images/119c13ec-76be-42bd-b558-762d09275a1b-8ba7a18302.webp)

- Flux simplifié - Vue rapide pour les utilisateurs au quotidien. ![Simplified Flow](/content-images/9b612cbd-f24d-4472-9b87-0f2c908bb368-eb34a722a2.webp)

## Analyse approfondie

### Fonctionnement de Pepper Sync (vue simplifiée)

Au lieu de réanalyser la blockchain par énormes segments peu maniables, Pepper Sync procède par petites étapes faciles à gérer, en enregistrant toujours votre position au fur et à mesure.

1. Connexion - Le portefeuille se connecte au réseau.
2. Récupération des blocs - Les données sont téléchargées de manière incrémentale.
3. Vérification - Les transactions sont validées.
4. Traitement des notes protégées - La confidentialité est préservée en permanence.
5. Mise à jour des soldes - Le portefeuille s'actualise en toute sécurité.
6. Enregistrement de la progression - S'arrête et reprend sans accroc.
7. Fin - Le portefeuille est prêt pour effectuer des transactions.

## Implications pratiques

### À qui profite Pepper Sync ?

- Nouveaux utilisateurs - Ils peuvent configurer leur portefeuille rapidement sans être découragés par les délais.
- Utilisateurs quotidiens - Une synchronisation fiable rend les paiements protégés pratiques au quotidien.
- Développeurs et testeurs - Des temps de synchronisation plus courts signifient des cycles de test plus rapides.
- Appareils mobiles et légers - Zingo fonctionne désormais efficacement, même sur du matériel aux ressources limitées.

### Pourquoi c'est important pour Zcash

Zcash repose sur les transactions protégées, l'un des outils de confidentialité les plus puissants des cryptomonnaies. Mais la confidentialité n'est utile que si elle est accessible.

Pepper Sync y contribue en :

- Abaissant les barrières à l'entrée - Les nouveaux utilisateurs peuvent démarrer rapidement.
- Favorisant l'usage au quotidien - Les adresses protégées inspirent davantage confiance.
- Encourageant la croissance de l'écosystème - Une meilleure expérience de portefeuille stimule l'adoption, les applications et les services.

En améliorant l'expérience de portefeuille, Pepper Sync renforce l'ensemble de l'écosystème Zcash.

### Premiers pas : prise en main de Zingo 2.0

1. Téléchargez le portefeuille - Obtenez la version adaptée sur la [page des versions de Zingo GitHub](https://github.com/zingolabs/zingolib)
2. Configurez votre portefeuille - Créez-en un nouveau ou restaurez-le à partir d'une phrase de récupération existante. [Zingo 2.0 avec Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Laissez Pepper Sync fonctionner - Suivez les indicateurs de progression pendant la mise à jour de votre portefeuille. [Exécution de Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Commencez à utiliser Zcash - Envoyez et recevez des ZEC protégés dès la fin de la synchronisation.
5. Ne vous inquiétez pas des interruptions - Si l'application se ferme ou si la connexion est coupée, Pepper Sync reprend automatiquement.

## Erreurs courantes

**Considérer Pepper Sync comme un portefeuille à part entière**. Pepper Sync est le moteur de synchronisation intégré au portefeuille Zingo!, et non une application distincte. Vous installez Zingo ; Pepper Sync est ce qui fonctionne en arrière-plan.

**Supposer qu'une synchronisation plus rapide signifie une confidentialité moindre**. La rapidité provient de la manière dont les données des blocs sont récupérées, ordonnées et mises en cache, et non de la divulgation de davantage d'informations. Les transactions protégées restent confidentielles du début à la fin.

**Supposer que vous devez être entièrement synchronisé avant de pouvoir dépenser**. Dépenser avant la fin de la synchronisation est l'une des fonctionnalités phares de Pepper Sync : vous n'avez donc pas à attendre que le portefeuille atteigne le sommet de la chaîne.

## FAQ - Questions fréquentes

**Q : Dois-je relancer une analyse complète à chaque ouverture du portefeuille ?**

R : Non. Pepper Sync enregistre la progression, vous ne mettez donc à jour qu'à partir du dernier point.

**Q : Que se passe-t-il si ma connexion Internet est coupée ?**

R : La synchronisation se met en pause et reprend plus tard sans recommencer depuis le début.

**Q : Ma confidentialité est-elle préservée pendant la synchronisation ?**

R : Oui. Les transactions protégées restent entièrement confidentielles.

**Q : Combien de temps dure la première synchronisation ?**

R : Généralement quelques minutes au lieu de plusieurs heures, selon votre appareil et votre connexion Internet.

**Q : Puis-je utiliser le portefeuille avant la fin de la synchronisation ?**

R : Oui. Pepper Sync permet de dépenser avant la fin de la synchronisation : vous n'avez donc pas besoin d'attendre que le portefeuille atteigne le sommet de la chaîne.

## Conclusion

Avec Pepper Sync dans Zingo 2.0, la synchronisation n'est plus le principal point faible des portefeuilles protégés. Elle est désormais rapide, stable et conviviale, ce qui abaisse la barrière pour les nouveaux venus et rend l'usage quotidien bien plus pratique.

Pour les utilisateurs, cela signifie moins d'attente et plus de confidentialité. Pour les développeurs, cela offre une base plus solide sur laquelle construire. Pour l'écosystème Zcash, c'est une étape de plus pour rendre les transactions protégées accessibles à tous.

Zingo 2.0 avec Pepper Sync n'est pas une simple mise à niveau : c'est un véritable bond en avant pour des cryptomonnaies confidentielles et faciles à utiliser.

## Pages associées

- [Synchronisation des portefeuilles Zcash](/zcash-tech/zcash-wallet-syncing) — le fonctionnement de la synchronisation des portefeuilles dans l'écosystème Zcash.
- [Nœuds pour portefeuilles légers](/zcash-tech/lightwallet-nodes) — l'infrastructure sur laquelle se synchronise un portefeuille léger tel que Zingo.
- [Zaino](/zcash-tech/zaino) — l'indexeur développé par l'équipe Zingo.
- [Portefeuilles](/wallets) — le répertoire complet des portefeuilles Zcash et de leurs fonctionnalités.

## Pour aller plus loin

- [Dépôt Zingo! GitHub](https://github.com/zingolabs/zingolib)
- [Forum de la communauté Zcash](https://forum.zcashcommunity.com/)
- Annonces officielles - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
