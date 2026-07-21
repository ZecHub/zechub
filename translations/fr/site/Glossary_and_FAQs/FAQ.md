# Questions fréquemment posées

Une liste des questions les plus courantes sur Zcash. Pour le dépannage du client Zcash, veuillez consulter le [guide officiel de dépannage](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigation rapide
[Qu’est-ce que Zcash ?](#what-is-zcash) | [Comment acquérir Zcash ?](#acquire) | [Différence avec les autres cryptomonnaies ?](#difference) | [Gouvernance du protocole ?](#governance) | [Où est ma transaction ?](#transaction) | [Zcash est-il vraiment privé ?](#privacy) | [Idées reçues courantes](#misconceptions)

---

## Qu’est-ce que Zcash ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash est une monnaie numérique avec des transactions rapides, confidentielles et peu coûteuses. La confidentialité est la caractéristique centrale de Zcash. Il a été pionnier dans l’utilisation des preuves à divulgation nulle de connaissance pour chiffrer toutes les transactions.  

Plusieurs portefeuilles sont disponibles pour des paiements instantanés, mobiles, sécurisés et privés : [Portefeuilles mobiles](https://z.cash/wallets/)
</div>

## Comment puis-je acquérir Zcash ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Vous pouvez acheter des ZEC sur des [plateformes d’échange](https://z.cash/exchanges) de cryptomonnaies.  
Vous pouvez également acheter Zcash de pair à pair ou en acquérir par le minage.
</div>

## Quelle est la différence entre Zcash et les autres cryptomonnaies ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash est fondamentalement plus privé que Bitcoin ou Ethereum. Il offre des temps de bloc rapides (75 secondes), des frais bas et des mises à niveau régulières.  

Les utilisateurs peuvent choisir entre des transactions **transparentes** ou **protégées**. Pour plus d’informations, voir [Un écosystème protégé](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Comment le protocole Zcash est-il gouverné ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Le protocole est gouverné par le processus **Zcash Improvement Proposal (ZIP)**. N’importe qui peut soumettre un brouillon de ZIP. Les brouillons sont débattus par la communauté et acceptés ou rejetés par les éditeurs ZIP :

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Les décisions sont inscrites dans la spécification et ratifiées on-chain lorsque le réseau les adopte.
</div>

## Où est ma transaction ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Lisez d’abord [notre guide des explorateurs de blocs](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629). Ensuite, consultez [Zcash Block Explorer](https://zcashblockexplorer.com).  

Les transactions expirent après environ 25 minutes (20 blocs) et les fonds sont automatiquement renvoyés.  

**Raisons fréquentes pour lesquelles une transaction peut ne pas apparaître :**
- Perte de connectivité
- Frais de transaction trop bas
- Surcharge du réseau
- Trop d’entrées transparentes (taille trop importante)

**Conseils pour réussir :**
- Utilisez une connexion stable
- Payez les frais standard (ou plus élevés pour la priorité)
- Attendez et réessayez plus tard
- Utilisez moins d’entrées pour garder la transaction petite
</div>

## Zcash est-il vraiment privé ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Oui.** Zcash chiffre les données de l’expéditeur, du montant et du destinataire pour les transactions protégées.  

Zcash ne **fait pas** :
- Chiffrer les transactions multisignatures (intégration FROST en attente)
- Protéger contre les corrélations avec les transactions transparentes
- Masquer les adresses IP

Pour aller plus loin : [Un écosystème protégé](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Quelques idées reçues courantes

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Idée reçue</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Bonne réponse</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash est-il une monnaie centralisée ?</td>
        <td className="py-5 px-6 text-foreground">Non. Un accord de marque empêche la Zcash Foundation ou ECC d’agir contre le consensus de la communauté. Il est prouvé que la gouvernance est décentralisée (voir le [rapport Messari](https://messari.io/report/decentralizing-zcash)). Les sondages communautaires, ZecHub et le club A/V de la Zcash Foundation permettent tous une large participation.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash a-t-il une porte dérobée ?</td>
        <td className="py-5 px-6 text-foreground">Non. Ni Zcash ni aucun logiciel cryptographique que nous avons développé ne contient de porte dérobée, et n’en contiendra jamais.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash est-il contrôlé par une entreprise ?</td>
        <td className="py-5 px-6 text-foreground">Incorrect. Bien que nous collaborions avec des entreprises pour la recherche, Zcash reste engagé en faveur de la décentralisation. Plusieurs organisations autonomes travaillent ensemble pour l’auto-garde et le droit à la vie privée.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash offre une confidentialité limitée par rapport aux autres privacy coins</td>
        <td className="py-5 px-6 text-foreground">Non. La confidentialité de type Monero/Grin repose sur des leurres (qui peuvent être déjoués). Zcash chiffre toutes les données des transactions protégées afin que chaque transaction du pool soit indiscernable. Voir [Pas assez privé ?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

**Dernière mise à jour :** mars 2026  
**Vous souhaitez contribuer ?** [Modifier cette page sur GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
