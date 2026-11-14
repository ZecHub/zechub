# Foire aux questions

Voici les questions les plus fréquentes sur Zcash. Pour résoudre les problèmes du client Zcash, consultez le [guide officiel de dépannage](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigation rapide

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qu'est-ce que Zcash ?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Comment obtenir des Zcash ?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Différence avec les autres cryptomonnaies ?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Gouvernance du protocole ?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Où est ma transaction ?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash est-il vraiment confidentiel ?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Idées reçues courantes</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd ne fonctionne plus ?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Transférer mon portefeuille vers Zallet ?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qu'est-ce que Ironwood ?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Quel nœud complet ?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Chercher un terme ?</a>
</div>

---

## Qu'est-ce que Zcash ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash est une monnaie numérique offrant des transactions rapides et confidentielles, avec des frais réduits. La confidentialité est la caractéristique centrale de Zcash. Il a été le premier à utiliser des preuves à divulgation nulle de connaissance pour chiffrer toutes les transactions.

Plusieurs portefeuilles sont disponibles pour des paiements instantanés, mobiles, sécurisés et confidentiels : [Portefeuilles](/using-zcash/wallets)

</div>

## Comment obtenir des Zcash ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Vous pouvez acheter des ZEC sur des [exchanges dépositaires](/using-zcash/custodial-exchanges), des [DEX](/using-zcash/dex) ou des [plateformes d'échange centralisées](/using-zcash/centralized-swaps).

Vous pouvez également acheter des Zcash de pair à pair ou en obtenir par le minage.

</div>

## Quelle est la différence entre Zcash et les autres cryptomonnaies ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash est fondamentalement plus confidentiel que Bitcoin ou Ethereum. Il offre des temps de bloc rapides (25 secondes depuis l'activation de NU7 en novembre 2026, contre 75 secondes auparavant), des frais réduits et des mises à niveau régulières.

Les utilisateurs peuvent choisir entre des transactions **transparentes** ou **protégées**. Pour en savoir plus, consultez [Un écosystème protégé](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Comment le protocole Zcash est-il gouverné ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Le protocole est régi par le processus des **propositions d'amélioration de Zcash (ZIP)**. Tout le monde peut soumettre un projet de ZIP. Les projets sont débattus par la communauté, puis acceptés ou rejetés par les éditeurs des ZIP :

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Les décisions sont inscrites dans la spécification et ratifiées on-chain lorsque le réseau les adopte.

</div>

## Où est ma transaction ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Lisez d'abord [notre guide des explorateurs de blocs](/guides/blockchain-explorers). Consultez ensuite [l'explorateur de blocs Zcash](https://mainnet.zcashexplorer.app).

Il n'existe ni délai d'expiration fixe de 25 minutes ni minuterie de remboursement automatique. Vérifiez la hauteur d'expiration enregistrée par votre portefeuille et si le paiement d'origine a été miné. S'il a expiré sans avoir été miné, il n'a pas été réglé on-chain ; l'expiration ne crée pas de transaction de remboursement. Laissez le portefeuille se synchroniser avant de suivre ses instructions pour réessayer. Consultez le [dépannage des transactions](/using-zcash/transactions#troubleshooting-stuck-transactions) et la [ZIP 203](https://zips.z.cash/zip-0203).

**Raisons courantes pour lesquelles une transaction peut ne pas apparaître :**

- Perte de connexion
- Frais de transaction trop faibles
- Surcharge du réseau
- Trop d'entrées transparentes (taille trop importante)

**Conseils pour réussir :**

- Utilisez une connexion stable
- Payez les frais standard (ou plus pour être prioritaire)
- Patientez et réessayez plus tard
- Utilisez moins d'entrées pour que la transaction reste petite

</div>

## Zcash est-il vraiment confidentiel ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Oui.** Zcash chiffre les données de l'expéditeur, du montant et du destinataire pour les transactions protégées.

Zcash ne fait **pas** les choses suivantes :

- Chiffrer les transactions multisignatures (intégration de FROST en attente)
- Protéger contre les corrélations avec les transactions transparentes
- Masquer les adresses IP

Pour aller plus loin : [Un écosystème protégé](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd ne fonctionne plus, que dois-je utiliser maintenant ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd est retiré. La version 6.20.0 s'est arrêtée d'elle-même au bloc 3417100 le 18 juillet 2026, et elle n'a jamais pris en charge Ironwood (NU6.3) : il n'existe donc aucune version ultérieure vers laquelle effectuer la mise à jour.

Utilisez plutôt la pile Z3. Trois programmes se partagent le travail que zcashd effectuait seul :

- **[Zebra](/zcash-tech/zebra-full-node)** valide la chaîne
- **[Zaino](/zcash-tech/zaino)** l'indexe et fournit les données des portefeuilles
- **[Zallet](/zcash-tech/zallet)** détient vos fonds

[Zakura](/zcash-tech/zakura-node) est un nœud complet alternatif. Il exécute également zcashd par-dessus lui-même, ce qui est utile si d'autres logiciels attendent encore l'ancienne interface.

Commencez par le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Comment transférer mon portefeuille zcashd vers Zallet ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet migre un `wallet.dat` existant : vous conservez donc vos fonds et vos adresses.

Sauvegardez d'abord `wallet.dat`, puis suivez le [guide de migration](/guides/migration-guide-zcashd-to-zebrad-zallet). Conservez cette sauvegarde jusqu'à ce que vous ayez vérifié votre solde dans Zallet.

L'[aide-mémoire Zallet](/using-zcash/zallet-quick-reference-guide) présente les commandes courantes une fois la migration effectuée.

</div>

## Qu'est-ce que Ironwood, et dois-je faire quelque chose ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood est la mise à niveau du réseau NU6.3, active sur le réseau principal depuis le bloc 3 428 143, le 28 juillet 2026. Elle ajoute un pool protégé fondé sur un circuit corrigé et scelle l'ancien pool [Orchard](/using-zcash/shielded-pools), afin que chacun puisse vérifier qu'aucun ZEC n'a été contrefait.

**Si vous détenez des fonds protégés, ils devront peut-être être déplacés.** La valeur ne quitte Orchard qu'en passant par [le sas comptable](/zcash-tech/the-turnstile), et les portefeuilles gèrent ce transfert à des moments et de manières différents. Renseignez-vous auprès du fournisseur de votre portefeuille avant de déplacer quoi que ce soit manuellement.

Lisez [Ironwood](/zcash-tech/ironwood) pour savoir ce qui a changé et pourquoi.

</div>

## Quel nœud complet dois-je utiliser ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** est le remplaçant direct de zcashd et le nœud sur lequel s'appuie le guide de migration. Choisissez-le, sauf si vous avez une raison de ne pas le faire.

**[Zakura](/zcash-tech/zakura-node)** est une seconde implémentation conçue pour le passage à l'échelle, avec une synchronisation plus rapide et un élagage natif des blocs. Choisissez-le si vous en avez besoin, ou si vous dépendez de logiciels qui communiquent encore avec zcashd.

Les deux valident la même chaîne : il s'agit donc d'un choix opérationnel et non d'un choix de consensus.

</div>

## Où chercher un terme figurant dans des notes de version ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Consultez la [bibliothèque Zcash](/glossary-and-faqs/zcash-library). Elle couvre les logiciels de nœud et de portefeuille, les pools protégés et les numéros de ZIP qui reviennent le plus souvent.

</div>

## Quelques idées reçues courantes

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Idée reçue</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Bonne réponse</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash est-il une cryptomonnaie centralisée ?</td>
      <td className="py-4 px-5 text-foreground">Non. Un accord sur la marque empêche la Zcash Foundation ou l'ECC d'agir contre le consensus de la communauté. Il est prouvé que la gouvernance est décentralisée (voir le [rapport Messari](https://messari.io/report/decentralizing-zcash)). Les sondages communautaires, ZecHub et l'A/V Club de Zcash Foundation permettent tous une large participation.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash comporte-t-il une porte dérobée ?</td>
      <td className="py-4 px-5 text-foreground">Non. Ni Zcash ni aucun logiciel cryptographique que nous avons développé ne contient de porte dérobée, et ce ne sera jamais le cas.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash est-il contrôlé par une entreprise ?</td>
      <td className="py-4 px-5 text-foreground">Faux. Bien que nous collaborions avec des entreprises pour la recherche, Zcash reste attaché à la décentralisation. Plusieurs organisations autonomes travaillent ensemble en faveur de l'auto-conservation et du droit à la confidentialité.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash offre une confidentialité limitée par rapport aux autres cryptomonnaies confidentielles</td>
      <td className="py-4 px-5 text-foreground">Non. La confidentialité de type Monero/Grin repose sur des leurres (qui peuvent être déjoués). Zcash chiffre toutes les données des transactions protégées, de sorte que chaque transaction du pool est indiscernable des autres. Consultez [Pas assez confidentiel ?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Dernière mise à jour :** octobre 2026
**Vous souhaitez contribuer ?** [Modifiez cette page sur GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
