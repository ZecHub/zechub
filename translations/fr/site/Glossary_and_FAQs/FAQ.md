# Questions fréquemment posées

Une liste des questions les plus courantes sur Zcash. Pour résoudre les problèmes avec le client Zcash, veuillez consulter le [guide officiel de dépannage](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigation rapide

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Qu'est-ce que Zcash ?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Comment puis-je acquérir Zcash ?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Différence avec les autres cryptomonnaies ?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Gouvernance du protocole ?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Où est ma transaction ?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash est-il vraiment privé ?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Idées reçues courantes</a>
</div>

---

## Qu'est-ce que Zcash ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash est une monnaie numérique offrant des transactions rapides, confidentielles et peu coûteuses. La confidentialité est la fonctionnalité centrale de Zcash. Il a été le pionnier de l'utilisation des preuves à divulgation nulle de connaissance pour chiffrer toutes les transactions.

Plusieurs wallets sont disponibles pour des paiements instantanés, mobiles, sûrs et privés : [Wallets](/using-zcash/wallets)

</div>

## Comment puis-je acquérir Zcash ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Vous pouvez acheter ZEC sur des [plateformes d'échange custodiales](/using-zcash/custodial-exchanges), des [DEX](/dex) ou des [plateformes de swap centralisées](/using-zcash/centralizedswaps).

Vous pouvez également acheter Zcash de pair à pair ou l'acquérir par le minage.

</div>

## Quelle est la différence entre Zcash et les autres cryptomonnaies ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash est fondamentalement plus privé que Bitcoin ou Ethereum. Il offre des temps de bloc rapides (75 secondes), des frais faibles et des mises à niveau régulières.

Les utilisateurs peuvent choisir entre des transactions **Transparentes** ou **Shielded**. Pour plus d'informations, consultez [Un écosystème Shielded](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Comment le protocole Zcash est-il gouverné ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Le protocole est gouverné par le processus de **proposition d'amélioration de Zcash (ZIP)**. Toute personne peut soumettre un projet de ZIP. Les projets sont débattus par la communauté, puis acceptés ou rejetés par les éditeurs de ZIP :

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Les décisions sont intégrées à la spécification et ratifiées on-chain lorsque le réseau les adopte.

</div>

## Où est ma transaction ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Lisez d'abord [notre guide des explorateurs de blocs](/guides/blockchain-explorers). Consultez ensuite l'explorateur de blocs [Zcash](https://zcashblockexplorer.com).

Les transactions expirent après environ 25 minutes (20 blocs) et les fonds sont automatiquement retournés.

**Raisons courantes pour lesquelles une transaction peut ne pas apparaître :**

- Perte de connexion
- Frais de transaction trop faibles
- Surcharge du réseau
- Trop d'entrées transparentes (taille trop importante)

**Conseils pour réussir :**

- Utilisez une connexion stable
- Payez les frais standard (ou davantage pour la priorité)
- Attendez et réessayez plus tard
- Utilisez moins d'entrées afin de conserver une transaction de petite taille

</div>

## Zcash est-il vraiment privé ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Oui.** Zcash chiffre les données de l'expéditeur, du montant et du destinataire pour les transactions shielded.

Zcash ne :

- Chiffre **pas** les transactions multisignatures (intégration de FROST en attente)
- Protège pas contre les corrélations avec les transactions transparentes
- Masque pas les adresses IP

Pour aller plus loin : [Un écosystème protégé](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

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
      <td className="py-4 px-5 text-foreground">Non. Un accord de marque empêche la Zcash Foundation ou ECC d'agir contre le consensus de la communauté. La gouvernance est décentralisée de manière avérée (voir le [rapport Messari](https://messari.io/report/decentralizing-zcash)). Les sondages communautaires, ZecHub et le A/V Club de Zcash Foundation permettent tous une large participation.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash possède-t-il une porte dérobée ?</td>
      <td className="py-4 px-5 text-foreground">Non. Ni Zcash ni aucun logiciel cryptographique que nous avons développé ne contient de porte dérobée, et n'en contiendra jamais.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash est-il contrôlé par une entreprise ?</td>
      <td className="py-4 px-5 text-foreground">Incorrect. Bien que nous collaborions avec des entreprises pour la recherche, Zcash reste engagé en faveur de la décentralisation. Plusieurs organisations autonomes travaillent ensemble en faveur de l'autodétention et du droit à la confidentialité.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash dispose d'une confidentialité limitée par rapport à d'autres monnaies axées sur la confidentialité</td>
      <td className="py-4 px-5 text-foreground">Non. La confidentialité de type Monero/Grin repose sur des leurres (qui peuvent être déjoués). Zcash chiffre toutes les données des transactions shielded afin que chaque transaction du pool soit indiscernable. Voir [Pas assez privé ?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Dernière mise à jour :** mars 2026
**Vous souhaitez contribuer ?** [Modifier cette page sur GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
