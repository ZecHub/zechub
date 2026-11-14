<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Confidentialité du minage et du staking

Le paiement de votre mineur et votre finaliseur ne sont pas la même chose. La chaîne ne les relie jamais.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Mineur</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Paiement transparent</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase paie une adresse Zcash. L'historique d'une adresse t est public.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finaliseur</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Clé zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Une clé ed25519. Elle signe les votes. Ce n'est pas une adresse Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Caution</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Mise protégée</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Elle réside dans le pool de staking. Elle désigne un finaliseur cible.</p>
  </div>
</div>

## L'ordre qui compte

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Miner</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Protéger</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Cautionner</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Si vous sautez l'étape de protection, l'étape confidentielle n'a jamais lieu. Une caution n'efface pas une coinbase transparente.</p>
</div>

## Ce qui est public

| Élément | Public ? | Pourquoi |
|---|---|---|
| Adresse t du mineur et historique coinbase | Oui | Sorties transparentes ordinaires |
| Clé du finaliseur et zfinv1 | Oui, une fois inscrit sur la liste | C'est nécessaire pour vérifier les votes |
| Pouvoir de vote et réserve de récompenses | Oui | Publiés en regard de la clé du finaliseur afin que la répartition des mises puisse être auditée |
| Quelle adresse transparente a financé une caution | Non, après une protection | La caution dépense des notes protégées |
| Lien entre votre mineur et votre finaliseur | Pas sur la chaîne | Rien dans le protocole ne l'inscrit |

Les montants mis en staking sont révélés à dessein. La conception exige que le total mis en staking et sa répartition entre les finaliseurs soient vérifiables publiquement. La quantification (puissances de 10) et des fenêtres de staking fixes limitent la quantité d'informations individuelles de calendrier ou de comportement qui fuitent, tout en permettant cet audit. Les soldes Orchard non mis en staking restent confidentiels ; le staking est la divulgation volontaire.

## Miser sur vous-même ou sur quelqu'un d'autre

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Caution vers votre propre finaliseur</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">C'est le plus simple. Vous conservez le rôle d'opérateur et la caution. Un observateur ne peut toujours pas prouver, à partir des seules données de la chaîne, que l'adresse t et la zfinv1 appartiennent à une même personne.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Caution vers un autre membre</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Le pouvoir de vote apparaît sous sa clé. Il perçoit la commission de 10 % du finaliseur actif. Vous conservez les 90 % qui s'accumulent sur la caution. Cela met en échec la supposition évidente selon laquelle le mineur qui reçoit le paiement transparent est la même personne que celle qui exploite le finaliseur.</p>
  </div>
</div>

Un groupe peut miner sur des adresses de paiement distinctes, protéger les fonds, puis répartir les cautions entre ses membres. Il devient alors beaucoup plus difficile d'affirmer, à partir des données de la chaîne, que « ce mineur est ce finaliseur ». Cela ne cache pas l'identité des finaliseurs, et cela ne cache pas le minage.

## Ce que cela ne fait pas

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Non caché</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>L'identité des finaliseurs</li>
    <li>Le pouvoir de vote de chacun d'eux</li>
    <li>Votre historique de minage transparent</li>
    <li>Un lien que vous créez hors chaîne : une même IP, un même schéma de paiement, un même opérateur</li>
  </ul>
</div>

La zfinv1 cible figure dans l'action de staking. Ici, la confidentialité porte sur l'origine des fonds, et non sur la dissimulation de la clé de destination.

## En bref

Minez. Protégez. Puis cautionnez. L'adresse du mineur et la clé du finaliseur restent sans lien, à moins que vous ne les reliiez vous-même.
