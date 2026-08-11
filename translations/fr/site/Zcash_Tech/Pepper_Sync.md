---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync est le moteur de synchronisation introduit dans Zingo! 2.0, le wallet Zcash open source développé par Zingo Labs.
* Il utilise une synchronisation non linéaire au lieu de scanner la chaîne en grands blocs séquentiels, de sorte que votre solde et vos transactions apparaissent bien plus rapidement.
* La progression est enregistrée en continu. Si la connexion coupe ou si l’application se ferme, la synchronisation reprend là où elle s’était arrêtée au lieu de redémarrer.
* Vous pouvez dépenser avant que la synchronisation soit terminée.
* Les transactions blindées restent privées pendant tout le processus.

## Explication essentielle

Zingo 2.0 est la dernière version du wallet Zingo!, un wallet léger et open source conçu pour la communauté Zcash. La vedette de cette version est Pepper Sync, une amélioration majeure qui repense complètement la manière dont les wallets se connectent à la blockchain.

Par le passé, la synchronisation pouvait sembler terriblement lente, sujette aux erreurs et gourmande en ressources, obligeant parfois les utilisateurs à recommencer depuis zéro. Pepper Sync change tout cela. Il rend la synchronisation plus rapide, plus fluide, plus fiable et moins exigeante pour votre appareil, tout en préservant pleinement la confidentialité des transactions blindées.

Que vous soyez un tout nouvel utilisateur qui teste Zcash pour la première fois, ou un membre de longue date de la communauté gérant plusieurs wallets blindés, Pepper Sync rend l’expérience bien plus pratique et agréable.

### Fonctionnalités essentielles de Pepper Sync

Pepper Sync apporte plusieurs améliorations :

- Synchronisation beaucoup plus rapide - Votre wallet est prêt en quelques minutes, pas en plusieurs heures.
- Mises à jour intelligentes - Les données sont traitées en plus petits blocs, ce qui évite des rescans complets.
- Résistant aux interruptions - Si votre connexion coupe, la synchronisation reprend là où elle s’était arrêtée.
- Léger et efficace - Optimisé pour les téléphones, les ordinateurs portables et d’autres appareils moins puissants.
- Retours plus clairs - Les mises à jour de progression en temps réel réduisent la confusion.
- Préservation de la confidentialité - Les transactions blindées restent privées tout au long du processus.

### Ce qui est mieux qu’avant

Les anciennes versions de Zingo frustraient souvent les utilisateurs à cause de temps de synchronisation longs, d’une gestion des erreurs peu claire et d’une forte consommation de ressources. Pepper Sync corrige ces problèmes fréquents :

| Fonctionnalité     | Versions précédentes de Zingo          | Zingo 2.0 avec Pepper Sync                  |
| ------------------ | -------------------------------------- | ------------------------------------------- |
| Vitesse de synchro | Plus lente, surtout à la première configuration | Synchronisation initiale et continue beaucoup plus rapide |
| Gestion des erreurs | Blocages occasionnels et échecs peu clairs | Stabilité améliorée avec récupération automatique |
| Expérience utilisateur | La synchronisation semblait « opaque » pour les nouveaux venus | Transparente, avec un statut et des mises à jour plus clairs |
| Performances de l’appareil | Utilisation élevée du CPU/de la mémoire | Optimisé pour une utilisation fluide des ressources |

En bref : la synchronisation est désormais plus rapide, plus fiable et plus facile à comprendre.

## Visuel / Analogie

Imaginez qu’une ancienne synchronisation de wallet ressemble à la lecture à voix haute d’un très long livre à partir de la première page, avant d’avoir le droit d’en dire quoi que ce soit. Arrêtez-vous à mi-chemin, et vous recommencez depuis la première page. Pepper Sync lit le même livre, mais garde un marque-page, lit d’abord les chapitres qui vous concernent, et vous permet de parler de l’histoire avant d’avoir terminé la dernière page.

Le marque-page est l’élément important. Chaque version précédente traitait une synchronisation interrompue comme du travail perdu ; Pepper Sync la traite comme une pause.

### Guides visuels

- Flux détaillé - Montre le processus complet. ![Flux détaillé](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Flux simplifié - Vue rapide pour les utilisateurs au quotidien. ![Flux simplifié](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Analyse approfondie

### Comment fonctionne Pepper Sync (vue simple)

Au lieu de rescanner la blockchain en énormes blocs lourds et peu pratiques, Pepper Sync fonctionne par petites étapes faciles à gérer, tout en enregistrant toujours votre progression au fur et à mesure.

1. Connexion - Le wallet se connecte au réseau.
2. Récupération des blocs - Les données sont téléchargées de manière incrémentale.
3. Vérification - Les transactions sont validées.
4. Gestion des notes blindées - La confidentialité est préservée à tout moment.
5. Mise à jour des soldes - Le wallet se met à jour en toute sécurité.
6. Enregistrement de la progression - S’arrête et reprend sans accroc.
7. Fin - Le wallet est prêt à effectuer des transactions.

## Implications pratiques

### Qui bénéficie de Pepper Sync ?

- Nouveaux utilisateurs - Peuvent configurer des wallets rapidement sans se laisser décourager par les délais.
- Utilisateurs quotidiens - Une synchronisation fiable rend les paiements blindés pratiques au quotidien.
- Développeurs et testeurs - Des temps de synchronisation plus courts signifient des cycles de test plus rapides.
- Appareils mobiles et légers - Zingo fonctionne désormais efficacement même sur du matériel aux ressources limitées.

### Pourquoi c’est important pour Zcash

Zcash est construit autour des transactions blindées, l’un des outils de confidentialité les plus puissants dans la cryptomonnaie. Mais la confidentialité n’est utile que si elle est accessible.

Pepper Sync aide en :

- Réduisant les barrières à l’entrée - Les nouveaux utilisateurs peuvent démarrer rapidement.
- Soutenant l’utilisabilité au quotidien - Les adresses blindées deviennent plus faciles à utiliser en confiance.
- Encourageant la croissance de l’écosystème - Une meilleure expérience wallet favorise davantage d’adoption, d’applications et de services.

En améliorant l’expérience wallet, Pepper Sync renforce l’ensemble de l’écosystème Zcash.

### Pour commencer : prise en main avec Zingo 2.0

1. Télécharger le wallet - Obtenez la bonne version depuis la [page des releases GitHub de Zingo](https://github.com/zingolabs/zingolib)
2. Configurer votre wallet - Créez-en un nouveau ou restaurez-en un à partir d’une phrase de récupération existante. [Zingo 2.0 avec Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Lancer Pepper Sync - Surveillez les indicateurs de progression pendant que votre wallet se met à jour. [Exécution de Pepper Sync](https://x.com/ZingoLabs/status/1961871338441724191)
4. Commencer à utiliser Zcash - Envoyez et recevez des ZEC blindés dès que la synchronisation est terminée.
5. Rester serein face aux interruptions - Si l’application se ferme ou si la connexion coupe, Pepper Sync reprend automatiquement.

## Erreurs courantes

**Considérer Pepper Sync comme un wallet à part entière**. Pepper Sync est le moteur de synchronisation à l’intérieur du wallet Zingo!, pas une application distincte. Vous installez Zingo ; Pepper Sync est ce qui fonctionne en dessous.

**Supposer qu’une synchronisation plus rapide signifie une confidentialité plus faible**. La vitesse vient de la manière dont les données de blocs sont récupérées, ordonnées et mises en cache, pas de la révélation de davantage d’informations. Les transactions blindées restent privées du début à la fin.

**Supposer qu’il faut être entièrement synchronisé avant de pouvoir dépenser**. Pouvoir dépenser avant la fin de la synchronisation est l’une des fonctionnalités phares de Pepper Sync, vous n’avez donc pas à attendre que le wallet atteigne la pointe de la chaîne.

## FAQ - Questions fréquentes

**Q : Dois-je rescanner à chaque fois que j’ouvre le wallet ?**

R : Non. Pepper Sync enregistre la progression, donc vous ne mettez à jour qu’à partir du dernier point.

**Q : Que se passe-t-il si ma connexion internet se coupe ?**

R : La synchronisation se met en pause et reprend plus tard sans redémarrer.

**Q : Ma confidentialité est-elle protégée pendant la synchronisation ?**

R : Oui. Les transactions blindées restent entièrement privées.

**Q : Combien de temps dure la première synchronisation ?**

R : Généralement quelques minutes au lieu de plusieurs heures, selon votre appareil et votre connexion internet.

**Q : Puis-je utiliser le wallet avant la fin de la synchronisation ?**

R : Oui. Pepper Sync permet de dépenser avant que la synchronisation soit terminée, vous n’avez donc pas besoin d’attendre que le wallet atteigne la pointe de la chaîne.

## Conclusion

Avec Zingo 2.0 Pepper Sync, la synchronisation n’est plus le principal point douloureux des wallets blindés. Elle est désormais rapide, stable et conviviale, ce qui abaisse la barrière d’entrée pour les nouveaux venus et rend l’utilisation quotidienne bien plus pratique.

Pour les utilisateurs, cela signifie moins d’attente et plus de confidentialité. Pour les développeurs, cela signifie une base plus solide sur laquelle construire. Pour l’écosystème Zcash, c’est une étape de plus vers des transactions blindées accessibles à tous.

Zingo 2.0 avec Pepper Sync n’est pas simplement une mise à niveau ; c’est un bond en avant pour une crypto privée et utilisable.

## Pages connexes

- [Synchronisation des wallets Zcash](/zcash-tech/zcash-wallet-syncing) — comment fonctionne la synchronisation des wallets dans l’ensemble de l’écosystème Zcash.
- [Nœuds Lightwallet](/zcash-tech/lightwallet-nodes) — l’infrastructure sur laquelle un wallet léger tel que Zingo se synchronise.
- [Zaino](/zcash-tech/zaino) — l’indexeur développé par l’équipe Zingo.
- [Wallets](/wallets) — le répertoire complet des wallets Zcash et de leurs fonctionnalités.

## Pour aller plus loin

- [Dépôt GitHub de Zingo!](https://github.com/zingolabs/zingolib)
- [Forum communautaire Zcash](https://forum.zcashcommunity.com/)
- Annonces officielles - [Twitter de Zingo Labs](https://twitter.com/ZingoLabs)

___
___
