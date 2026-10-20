# Questions fréquemment posées

Une liste des questions les plus courantes sur Zcash. Pour résoudre les problèmes du client Zcash, veuillez consulter le [guide officiel de dépannage](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigation rapide

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qu’est-ce que Zcash ?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Comment puis-je acquérir Zcash ?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Différence avec les autres cryptomonnaies ?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Gouvernance du protocole ?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Où est ma transaction ?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash est-il vraiment privé ?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Idées reçues courantes</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd ne fonctionne plus ?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Migrer mon wallet vers Zallet ?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qu’est-ce que Ironwood ?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Quel nœud complet ?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Rechercher un terme ?</a>
</div>

---

## Qu’est-ce que Zcash ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash est une monnaie numérique offrant des transactions rapides, confidentielles et peu coûteuses. La confidentialité est la fonctionnalité centrale de Zcash. Il a été le pionnier de l’utilisation des preuves à divulgation nulle de connaissance pour chiffrer toutes les transactions.

Plusieurs wallets sont disponibles pour des paiements instantanés, mobiles, sécurisés et privés : [Wallets](/using-zcash/wallets)

</div>

## Comment puis-je acquérir Zcash ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Vous pouvez acheter ZEC sur des [plateformes d’échange custodiales](/using-zcash/custodial-exchanges), des [DEX](/using-zcash/dex) ou des [plateformes de swap centralisées](/using-zcash/centralized-swaps).

Vous pouvez aussi acheter Zcash de pair à pair ou l’acquérir par minage.

</div>

## Quelle est la différence entre Zcash et les autres cryptomonnaies ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash est fondamentalement plus privé que Bitcoin ou Ethereum. Il offre des temps de bloc rapides (75 secondes), des frais bas et des mises à niveau régulières.

Les utilisateurs peuvent choisir entre des transactions **Transparentes** ou **Protégées**. Pour plus d’informations, consultez [Un écosystème protégé](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Comment le protocole Zcash est-il gouverné ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Le protocole est gouverné par le processus de **proposition d’amélioration de Zcash (ZIP)**. Toute personne peut soumettre un projet de ZIP. Les projets sont débattus par la communauté et acceptés ou rejetés par les éditeurs de ZIP :

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Les décisions sont inscrites dans la spécification et ratifiées on-chain lorsque le réseau les adopte.

</div>

## Où est ma transaction ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Lisez d’abord [notre guide des explorateurs de blocs](/guides/blockchain-explorers). Consultez ensuite l’explorateur de blocs [Zcash](https://mainnet.zcashexplorer.app).

Les transactions expirent après environ 25 minutes (20 blocs) et les fonds sont retournés automatiquement.

**Raisons courantes pour lesquelles une transaction peut ne pas apparaître :**

- Perte de connectivité
- Frais de transaction trop bas
- Surcharge du réseau
- Trop d’entrées transparentes (taille trop importante)

**Conseils pour réussir :**

- Utilisez une connexion stable
- Payez les frais standard (ou davantage pour la priorité)
- Attendez et réessayez plus tard
- Utilisez moins d’entrées pour garder la transaction petite

</div>

## Zcash est-il vraiment privé ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Oui.** Zcash chiffre les données de l’expéditeur, du montant et du destinataire pour les transactions protégées.

Zcash ne :

- Chiffre **pas** les transactions multisignatures (intégration FROST en attente)
- Protège pas contre les corrélations avec les transactions transparentes
- Masque pas les adresses IP

Pour aller plus loin : [Un écosystème protégé](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd ne fonctionne plus, que dois-je exécuter maintenant ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd est retiré. La version 6.20.0 s’est arrêtée d’elle-même au bloc 3417100 le 18 juillet 2026, et elle n’a jamais pris en charge Ironwood (NU6.3), il n’existe donc pas de version ultérieure vers laquelle effectuer une mise à niveau.

Exécutez plutôt la pile Z3. Trois programmes se partagent le travail que zcashd effectuait seul :

- **[Zebra](/zcash-tech/zebra-full-node)** valide la chaîne
- **[Zaino](/zcash-tech/zaino)** l’indexe et fournit les données de wallet
- **[Zallet](/zcash-tech/zallet)** conserve vos fonds

[Zakura](/zcash-tech/zakura-node) est un nœud complet alternatif. Il exécute également zcashd par-dessus, ce qui aide si d’autres logiciels attendent toujours l’ancienne interface.

Commencez par le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Comment migrer mon wallet zcashd vers Zallet ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migre un `wallet.dat` existant, afin que vous conserviez vos fonds et vos adresses.

Sauvegardez d’abord `wallet.dat`, puis suivez le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet). Conservez cette sauvegarde jusqu’à avoir confirmé votre solde dans Zallet.

La [Zallet référence rapide](/using-zcash/zallet-quick-reference-guide) couvre les commandes quotidiennes une fois la migration terminée.

</div>

## Qu’est-ce que Ironwood, et dois-je faire quelque chose ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood est la mise à niveau réseau NU6.3, active sur le mainnet depuis le bloc 3 428 143 le 28 juillet 2026. Elle ajoute un pool protégé fondé sur un circuit corrigé et scelle l’ancien pool [Orchard](/using-zcash/shielded-pools), afin que chacun puisse vérifier qu’aucun ZEC n’a été forgé.

**Si vous détenez des fonds protégés, ils devront peut-être être déplacés.** La valeur ne quitte Orchard que par [le tourniquet](/zcash-tech/the-turnstile), et les wallets gèrent ce déplacement à des moments et de manières différents. Demandez à votre fournisseur de wallet avant de déplacer quoi que ce soit manuellement.

Lisez [Ironwood](/zcash-tech/ironwood) pour savoir ce qui a changé et pourquoi.

</div>

## Quel nœud complet devrais-je exécuter ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** est le remplacement direct de zcashd et le nœud que suppose le guide de migration. Choisissez-le sauf si vous avez une raison de ne pas le faire.

**[Zakura](/zcash-tech/zakura-node)** est une seconde implémentation visant l’échelle, avec une synchronisation plus rapide et un élagage natif des blocs. Choisissez-le si vous en avez besoin, ou si vous dépendez d’un logiciel qui communique encore avec zcashd.

Les deux valident la même chaîne : il s’agit donc d’un choix opérationnel plutôt que d’un choix de consensus.

</div>

## Où puis-je rechercher un terme issu d’une note de publication ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consultez la bibliothèque [Zcash](/glossary-and-faqs/zcash-library). Elle couvre les logiciels de nœud et de wallet, les pools protégés et les numéros ZIP qui apparaissent le plus souvent.

</div>

## Quelques idées reçues courantes

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Idée reçue</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Réponse correcte</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash est-il une monnaie centralisée ?</td>
      <td className="py-4 px-5 text-foreground">Non. Un accord de marque empêche la Zcash Foundation ou ECC d’agir contre le consensus de la communauté. La gouvernance est prouvée décentralisée (voir le rapport [Messari](https://messari.io/report/decentralizing-zcash)). Les sondages communautaires, ZecHub et le club A/V Zcash Foundation permettent tous une large participation.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash possède-t-il une porte dérobée ?</td>
      <td className="py-4 px-5 text-foreground">Non. Ni Zcash ni aucun logiciel cryptographique que nous avons conçu ne contient de porte dérobée, et n’en contiendra jamais.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash est-il contrôlé par une entreprise ?</td>
      <td className="py-4 px-5 text-foreground">Faux. Bien que nous nous associions à des entreprises pour la recherche, Zcash reste engagé en faveur de la décentralisation. Plusieurs organisations autonomes collaborent pour l’autogarde et le droit à la vie privée.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash offre une confidentialité limitée par rapport aux autres monnaies privées</td>
      <td className="py-4 px-5 text-foreground">Non. La confidentialité de type Monero/Grin repose sur des leurres (qui peuvent être déjoués). Zcash chiffre toutes les données des transactions protégées afin que chaque transaction dans le pool soit indiscernable. Consultez [Pas assez privé ?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Dernière mise à jour :** octobre 2026
**Vous souhaitez contribuer ?** [Modifier cette page sur GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
