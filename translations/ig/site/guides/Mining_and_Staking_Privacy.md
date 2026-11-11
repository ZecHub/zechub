<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Nzuzo [privacy] nke ịgwụputa [mining] na Mkpọchi ego dijitalụ [staking]

Ụgwọ onye na-egwụputa [miner] gị na finalizer gị abụghị otu ihe. chain anaghị ejikọta ha.

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Onye na-egwụputa</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">Ụgwọ Oha [transparent]</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase na-akwụ ụgwọ n'ime Adreesị akpa ego [address] nke Zcash. Akụkọ ihe mere eme nke t-address bụ nke ọha.</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">Igodo zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">Ọ bụ igodo ed25519. Ọ na-edebanye aha na votu. Ọ bụghị Adreesị akpa ego nke Zcash.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Mkpọchi ego dijitalụ nke e chebere echebe [shielded]</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">Ọ dị n'ime pool nke Mkpọchi ego dijitalụ. Ọ na-akpọ finalizer a chọrọ.</p>
  </div>
</div>

## Usoro dị mkpa

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 Gwuputa</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Chebe</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Hapụ nchedo ahụ, nzọụkwụ nke onwe anaghị eme. bond anaghị ehichapụ coinbase Oha.</p>
</div>

## Ihe bụ nke ọha

| Ihe | Ọ bụ nke ọha? | Ihe kpatara ya |
|---|---|---|
| t-address nke onye na-egwụputa na akụkọ coinbase | Ee | Mmepụta Oha nkịtị |
| Igodo finalizer na zfinv1 | Ee, ozugbo ọ nọ na roster | Ọ ga-adịrịrị otu a iji nyochaa votu |
| Ike ịtụ vootu na banki ụgwọ ọrụ | Ee | A na-ebipụta ya megide igodo finalizer ka e wee nwee ike nyochaa nkesa Mkpọchi ego dijitalụ |
| Adreesị Oha nke kwadoro bond | Mba, mgbe echebere ya | bond na-emefu note ndị e chebere echebe |
| Njikọ si n'aka onye na-egwụputa gị gaa na finalizer gị | Ọ bụghị on-chain | Ọ dịghị ihe dị na protocol na-ede ya |

A na-ekpughe ego ndị e tinyere na Mkpọchi ego dijitalụ n'ebumnuche. Nhazi ahụ chọrọ ka mkpokọta ego e tinyere na Mkpọchi ego dijitalụ na nkesa ya n'etiti finalizer bụrụ ihe ọha nwere ike ịlele. Quantization (ike nke 10) na windo Mkpọchi ego dijitalụ a kara aka na-amachi ole ozi gbasara oge onye ọ bụla ma ọ bụ ụkpụrụ si apụta, ebe ha ka na-ekwe ka nyocha ahụ mee. Ọnụ ego Orchard ndị a na-etinyeghị na Mkpọchi ego dijitalụ na-anọgide na nzuzo; Mkpọchi ego dijitalụ bụ mkpughe e bu n'obi.

## Tinye Mkpọchi ego dijitalụ n'onwe gị, ma ọ bụ n'aka onye ọzọ

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">Bond nye finalizer nke gị</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">Ọ bụ nke kachasị mfe. Ị na-edobe ọrụ onye na-arụ ọrụ na bond. Onye na-ekiri ka enweghị ike igosi na t-address na zfinv1 bụ nke otu onye naanị site na data chain.</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">Bond nye onye otu ọzọ</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">Ike ịtụ vootu na-apụta n'okpuru igodo ha. Ha na-enweta komishọn 10% nke active-finalizer. Ị na-edobe 90% na-agbakọta na bond. Nke a na-akụda echiche doro anya na onye na-egwụputa na-enweta ụgwọ Oha bụ otu onye na-arụ ọrụ finalizer.</p>
  </div>
</div>

Otu nwere ike ịgwụputa na Adreesị akpa ego nkwụghachi dị iche iche, chebe ego ahụ, ma tinye bond n'etiti ndị otu. Nke a na-eme ka ikwu na “onye na-egwụputa a bụ finalizer a” sie ike karịa, site na data chain. Ọ naghị ezo ndị finalizer bụ, ọ naghị ezokwa ịgwụputa.

## Ihe nke a anaghị eme

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">Anaghị ezo ya</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Ndị finalizer bụ</li>
    <li>Ole ike ịtụ vootu onye ọ bụla nwere</li>
    <li>Akụkọ ịgwụputa Oha gị</li>
    <li>Njikọ ị na-emepụta off-chain: otu IP, otu ụkpụrụ nkwụghachi, otu onye na-arụ ọrụ</li>
  </ul>
</div>

zfinv1 e lekwasịrị anya dị n'ime omume Mkpọchi ego dijitalụ. Nzuzo ebe a gbasara isi mmalite ego, ọ bụghị izochi igodo ebe a na-aga.

## Nkọwa dị mkpirikpi

Gwuputa. Chebe. Mgbe ahụ tinye bond. Adreesị onye na-egwụputa na igodo finalizer anaghị enwe njikọ ma ọ bụrụ na ị jikọtaghị ha n'onwe gị.
