<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Confidentialité du minage et du staking

Votre paiement de minage et votre finaliseur ne sont pas la même chose. La chaîne ne les relie jamais.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Mineur</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Paiement transparent</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paie une adresse Zcash. L’historique d’une t-address est public.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finaliseur</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Clé zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Une clé ed25519. Elle signe les votes. Ce n’est pas une adresse Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Stake protégé</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Se trouve dans le pool de staking. Désigne un finaliseur cible.</p>
  </div>
</div>

## L’ordre qui compte

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Miner</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Protéger</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bonder</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Sautez l’étape de protection et l’étape privée n’aura jamais lieu. Un bond n’efface pas une coinbase transparente.</p>
</div>

## Ce qui est public

| Élément | Public ? | Pourquoi |
|---|---|---|
| t-address du mineur et historique de coinbase | Oui | Sorties transparentes normales |
| Clé du finaliseur et zfinv1 | Oui, une fois dans la liste | Elle doit l’être pour vérifier les votes |
| Pouvoir de vote et banque de récompenses | Oui | Publiés par rapport à la clé du finaliseur afin que la répartition du stake puisse être auditée |
| Quelle adresse transparente a financé un bond | Non, après une protection | Le bond dépense des notes protégées |
| Lien entre votre mineur et votre finaliseur | Pas sur la chaîne | Rien dans le protocole ne l’inscrit |

Les montants stakés sont délibérément révélés. La conception nécessite que le total staké et la répartition entre les finalisateurs soient vérifiables publiquement. La quantification (puissances de 10) et des fenêtres de staking fixes limitent la quantité d’informations individuelles sur le moment ou les schémas qui fuitent, tout en permettant cet audit. Les soldes Orchard non stakés restent privés ; le staking constitue la divulgation intentionnelle.

## Staker pour vous-même ou pour quelqu’un d’autre

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bondez vers votre propre finaliseur</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">La solution la plus simple. Vous conservez le rôle d’opérateur et le bond. Un observateur ne peut toujours pas prouver, à partir des seules données de la chaîne, que la t-address et le zfinv1 appartiennent à une même personne.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bondez vers un autre membre</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Le pouvoir de vote apparaît sous sa clé. Cette personne perçoit la commission de 10 % du finaliseur actif. Vous conservez les 90 % accumulés sur le bond. Cela invalide l’hypothèse évidente selon laquelle le mineur recevant le paiement transparent est la même personne qui exploite le finaliseur.</p>
  </div>
</div>

Un groupe peut miner sur des adresses de paiement distinctes, protéger et créer des liens entre ses membres. Il est alors beaucoup plus difficile d’affirmer, à partir des données de la chaîne, que « ce mineur est ce finaliseur ». Cela ne masque pas l’identité des finaliseurs, ni le minage.

## Ce que cela ne fait pas

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Non caché</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Qui sont les finaliseurs</li>
    <li>Quel pouvoir de vote chacun possède</li>
    <li>Votre historique de minage transparent</li>
    <li>Un lien que vous créez hors chaîne : une IP, un modèle de paiement, un opérateur</li>
  </ul>
</div>

Le zfinv1 cible se trouve dans l’action de staking. La confidentialité concerne ici la source des fonds, et non le fait de cacher la clé de destination.

## Version courte

Minez. Protégez. Puis bondez. L’adresse du mineur et la clé du finaliseur restent sans lien, sauf si vous les reliez vous-même.
