# Tenir des registres avec des ZEC protégés

## TL;DR

- Les fonds protégés sont privés, mais vous pouvez quand même tenir des registres financiers propres et complets
- Les mémos servent de lignes dans votre registre, comme un numéro de facture ou l’objet d’un paiement
- Une viewing key vous permet, à vous ou à une personne de votre choix comme un comptable, de consulter votre historique sans le rendre public
- Vous pouvez totaliser les revenus et les dépenses pour n’importe quelle période, ce dont vous avez besoin pour les déclarations ou les impôts
- Rien de tout cela n’affaiblit votre confidentialité, car c’est vous qui décidez qui voit quoi

<br/>

## À qui cela s’adresse-t-il ?

- Aux freelances et aux petites entreprises payés en ZEC
- À toute personne qui doit tenir une comptabilité tout en restant privée
- Aux personnes préparant des documents pour un comptable ou pour les impôts

<br/>

## Le défi

La confidentialité et la tenue de registres peuvent sembler opposées. Si vos transactions sont protégées, les montants et les adresses sont cachés au public, alors comment tenir une comptabilité correcte ou montrer vos revenus à un comptable ?

Avec Zcash, c’est un faux compromis. Les transactions protégées cachent par défaut votre activité à tout le monde, mais Zcash vous donne aussi des outils pour divulguer vos propres registres aux personnes qui en ont besoin, selon vos conditions. Vous restez privé vis-à-vis du monde et transparent pour votre comptable en même temps.

<br/>

## Les mémos sont votre registre

Chaque transaction protégée (z à z) peut contenir un [mémo](/using-zcash/memos) chiffré. Pour la tenue de registres, le mémo est l’endroit où vous indiquez à quoi servait le paiement : un numéro de facture, un nom de client, un code projet ou une courte note comme « loyer de mars ».

Comme le mémo accompagne la transaction et n’est lisible que par les parties concernées, il devient une ligne privée dans votre comptabilité. Lorsque vous ou votre client incluez un mémo clair sur chaque paiement, votre historique de transactions devient un registre exploitable au lieu d’une liste de montants sans contexte.

Une habitude simple : convenez avec vos clients de toujours inclure le numéro de facture dans le mémo. Plus tard, faire correspondre les paiements aux factures devient simple.

<br/>

## Consulter votre propre historique

Pour tenir une comptabilité, vous devez voir votre propre activité. Votre wallet contient les clés qui déchiffrent vos transactions protégées, donc votre wallet peut vous montrer l’ensemble : les dates, les montants, ce qui a été reçu, ce qui a été envoyé, et les mémos associés.

C’est la partie que le public ne peut pas voir, mais vous, si, parce que ces données vous appartiennent. Consulter régulièrement votre historique, plutôt qu’à la fin de l’année, permet de garder des registres exacts et de repérer plus facilement les erreurs.

<br/>

## Partager des registres avec un comptable

Lorsque vous avez besoin qu’une autre personne voie votre activité protégée, comme un comptable ou un auditeur, vous n’avez pas à lui remettre vos spending keys ni à rendre quoi que ce soit public. Vous partagez une [viewing key](/zcash-tech/viewing-keys).

Une full viewing key est en lecture seule. Elle permet à son détenteur de voir les transactions entrantes et sortantes d’une adresse, y compris les montants et les mémos, mais elle ne lui permet jamais de déplacer vos fonds. C’est donc ce qu’il faut donner à un comptable en toute sécurité. Il obtient exactement la visibilité dont il a besoin, votre argent reste sous votre contrôle, et le reste du monde ne voit toujours rien.

Cela s’appelle la divulgation sélective, et c’est l’une des raisons pratiques pour lesquelles Zcash protégé fonctionne avec une comptabilité honnête au lieu d’aller contre elle.

<br/>

## Totaliser sur une période

Pour la plupart des déclarations, vous avez besoin de totaux sur une période donnée : combien vous avez reçu ce trimestre, combien vous avez envoyé, votre position nette. Puisque vous pouvez consulter l’intégralité de votre propre historique, vous pouvez calculer ces totaux pour n’importe quelle période, un mois, un trimestre ou une année.

Garder des mémos cohérents facilite cela, car vous pouvez regrouper les paiements selon leur objet, et pas seulement selon la date et le montant.

<br/>

## Une note sur la fiscalité

Les règles fiscales diffèrent selon les pays et évoluent avec le temps ; il s’agit donc d’informations générales et non de conseils fiscaux. Dans de nombreux endroits, recevoir ou céder des cryptomonnaies peut avoir des conséquences fiscales, et l’on peut attendre de vous que vous conserviez des registres de ce que vous avez reçu, quand vous l’avez reçu, et de sa valeur à ce moment-là.

La bonne nouvelle, c’est que Zcash protégé ne vous empêche pas de respecter ces obligations. Vous pouvez conserver des registres privés complets, les totaliser pour la période exigée par votre administration fiscale et les divulguer à un comptable ou à une autorité fiscale à l’aide d’une viewing key, sans rendre votre activité publique. Si vous n’êtes pas sûr de vos obligations, parlez-en à un professionnel qualifié dans votre pays.

<br/>

## Erreurs courantes à éviter

- Omettre les mémos, ce qui vous laisse avec des montants sans contexte à la fin de l’année
- Réutiliser une seule adresse pour tout, ce qui rend plus difficile la séparation des clients ou des usages
- Attendre la saison des impôts pour passer en revue une année d’historique au lieu de tenir vos registres au fur et à mesure
- Partager une spending key alors qu’une viewing key en lecture seule est tout ce dont un comptable a besoin

<br/>

## Pages associées

- [Mémos](/using-zcash/memos) - comment fonctionnent les mémos chiffrés
- [Viewing Keys](/zcash-tech/viewing-keys) - comment exporter et partager un accès en lecture seule
- [Configuration de confidentialité pour freelance](/zcash-use-cases/freelance-privacy-setup) - recevoir des revenus de manière privée, l’étape qui précède la tenue de registres
