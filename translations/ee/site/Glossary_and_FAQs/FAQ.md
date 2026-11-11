# Ɖe biabia siwo dzi wokpɔa zi geɖe

Biabia siwo dzi wokpɔa zi geɖe tso Zcash ŋu ƒe xexlẽ. Ne wòdi be yeanɔ ŋku ɖe Zcash client ŋu la, mekpɔe ɖe [official troubleshooting guide](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) me.

### Mɔ kpui ƒe kplɔɖeƒe

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Nu kae nye Zcash?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Aleke mate ŋu axɔ Zcash?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Vovototo le crypto ga bubuwo ŋu?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Protocol dziɖuɖu?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Afika nye gaɖoɖo le?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash nye ɣaɣla vavã oa?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Nususu siwo menyo o siwo kpɔa zi geɖe</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd megawɔa dɔ o?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Matrɔ nye gakotoku yi Zallet me oa?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Nu kae nye Ironwood?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ɣaɣla dzesi ŋɔŋlɔ blibo kae manɔ wɔm?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Madi nyagbalẽ aɖe ƒe gɔme oa?</a>
</div>

---

## Nu kae nye Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash nye digital ga si wɔa gaɖoɖowo kabakaba, siwo nye ɣaɣla [privacy], eye adzɔ le eme sue. Ɣaɣla nye Zcash ƒe nɔnɔme vevi aɖe. Eyae wɔ dɔ gbã be wozã zero-knowledge ɖaseɖigbalɛwo [proofs] be woaŋlɔ gaɖoɖo blibo ɣaɣla.

Gakotoku geɖewo le afi sia be woawɔ fexexe kabakaba, le asimekplɔdzi, dedie, eye le ɣaɣla me: [Wallets](/using-zcash/wallets)

</div>

## Aleke mate ŋu axɔ Zcash?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Àte ŋu aƒle ZEC le [asikplɔ-dzralá gatrɔƒewo](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex), alo [centralized ɖɔli ɖɔli ƒe platformwo](/using-zcash/centralized-swaps) dzi.

Àte ŋu aƒle Zcash tso ame aɖe gbɔ na ame aɖe hã, alo nàxɔe to nukuku me.

</div>

## Vovototo kae le Zcash kple crypto ga bubuwo dome?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash nye ɣaɣla wu Bitcoin alo Ethereum le gɔme vevie. Eƒe gaɖoɖowo ƒe gaƒuƒoƒe ƒe ɣeyiɣi nye kabakaba (sekondi 75), adzɔ le eme sue, eye woɖea eƒe mɔ̃ ƒe sewo trɔtrɔ zi geɖe.

Zãlawo ate ŋu atia **Nuwo ƒe ʋuʋuɖi** alo **Ɣaɣla** gaɖoɖowo. Ne wòdi nyanya bubu la, kpɔ [A Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem).

</div>

## Aleke wodzi ɖu Zcash protocol dzi?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Wodzi ɖu protocol la dzi to **Zcash Improvement Proposal (ZIP)** ƒe mɔ nu. Ame sia ame ate ŋu aɖo ZIP ƒe tata gbãtɔ. Hamea doa woƒe nya me na tata gbãtɔawo, eye ZIP ƒe nuŋlɔlaawo xɔ wo alo gbee wo:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Wona tsitreɖoɖowo ge ɖe specification la me, eye woxɔ wo ɖoɖonu dzi ne network la xɔ wo.

</div>

## Afika nye nye Gaɖoɖo le?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Xlẽ [míaƒe mɔfiame tso gaƒuƒoƒe ƒe nukpɔlaawo ŋu](/guides/blockchain-explorers) gbã. Emegbe, kpɔ [Zcash Block Explorer](https://mainnet.zcashexplorer.app).

Gaɖoɖowo ƒe ɣeyiɣi ƒu le miniti 25 (gaɖoɖowo ƒuƒoƒe 20) megbe, eye woɖoa gaawo ɖe megbe le eɖokui si.

**Ta siwo ta gaɖoɖo aɖe mate ŋu aɖe fia o le zi geɖe:**

- Kadodo ƒe gbagbe
- Gaɖoɖo ƒe adzɔ le sue akpa
- Network la ƒe dɔ geɖe akpa
- Nu siwo wotsɔa de gaɖoɖo me le nuwo ƒe ʋuʋuɖi me sɔ gbɔ (eƒe lolome gã akpa)

**Nu siwo ana wòawɔ edzi:**

- Zã kadodo si le dedie
- Xe adzɔ si wode ɖo (alo gã wu ne nàdi be woade ŋgɔ na wò)
- Le mɔ kpɔ eye nàte ŋu agate wòawɔe emegbe
- Zã nu siwo wotsɔa de gaɖoɖo me sue wu be gaɖoɖo la ƒe lolome nanɔ sue

</div>

## Zcash nye Ɣaɣla vavã oa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**Ẽ.** Zcash ɣaɣlaŋlɔŋlɔa ame si dɔe, ga home, kple ame si xɔe ƒe nyawo na ɣaɣla gaɖoɖowo.

Zcash **menɔa**:

- Ɣaɣlaŋlɔŋlɔa asidede ƒe dzesi geɖe ƒe gaɖoɖowo o (FROST ƒe kadodo le mɔ kpɔm)
- Dea ɣaɣla na kadodo siwo le kple nuwo ƒe ʋuʋuɖi gaɖoɖowo o
- Ɣlaa IP gaɖoƒe ƒe dzesiwo o

Xexlẽ bubu: [A Shielded Ecosystem](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd megawɔa dɔ o, nu kae manɔ wɔm fifia?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd le dɔ me o azɔ. Version 6.20.0 tɔ eɖokui ɖe gaɖoɖowo ƒuƒoƒe 3417100 dzi le 18 July 2026, eye mekpɔ Ironwood (NU6.3) ƒe kpekpeɖeŋu kpɔ gbeɖe o, eyata version bubu aɖeke mele be nàtsɔ awɔ upgrade o.

Wɔ Z3 stack la dɔ ɖe teƒe. Program etɔ mawo ma wɔ dɔ si zcashd wɔ ena ɖe eɖokui me:

- **[Zebra](/zcash-tech/zebra-full-node)** dea ɖoɖonu la ƒe nyateƒe
- **[Zaino](/zcash-tech/zaino)** ƒoa eƒe index eye wònaa gakotoku ƒe data
- **[Zallet](/zcash-tech/zallet)** kpɔa wò gaawo dzi

[Zakura](/zcash-tech/zakura-node) nye ɣaɣla dzesi ŋɔŋlɔ blibo bubu. Eya hã wɔa zcashd dɔ le eɖokui dzi, si kpena ɖe wò ŋu ne software bubuwo gale interface xoxoa dim.

Dze egɔme kple [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).

</div>

## Aleke matrɔ nye zcashd gakotoku ayi Zallet me?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet trɔa `wallet.dat` si le xoxo, eyata nàgaɖo wò gaawo kple wò gaɖoƒe ƒe dzesiwo.

Wɔ `wallet.dat` ƒe backup gbã, eye nàdze ɖe [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) yome. Lé backup ma ɖe asi vaseɖe esi nàkɔ wò ga home le Zallet me.

[Zallet quick reference](/using-zcash/zallet-quick-reference-guide) ƒe nya me wɔa dɔ kple gbe sia gbe ƒe sewo ne nàva yi vɔ.

</div>

## Nu kae nye Ironwood, eye hia be mawɔ nu aɖe oa?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood nye mɔ̃ ƒe sewo trɔtrɔ [network upgrade] NU6.3, si le mainnet dzi tso gaɖoɖowo ƒuƒoƒe 3,428,143 dzi le 28 July 2026. Etsɔ ɣaɣla gaƒuƒoƒo yeye va, si wowɔ tso circuit si woɖo ɖo emegbe me, eye wotu xoxo [Orchard](/using-zcash/shielded-pools) gaƒuƒoƒo la, ale be ame sia ame ate ŋu akpɔe ɖa be ZEC aɖeke menye ɖe dzodzro o.

**Ne èle ɣaɣla gaawo ɖe asi la, ele be woatrɔ wo yi teƒe bubu.** Ga ƒe asixɔxɔ doa le Orchard me to [gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe](/zcash-tech/the-turnstile) ko, eye gakotokuwo trɔa wo le ɣeyiɣi vovovowo kple mɔ vovovowo nu. Ɖoe ɖe wò gakotoku ƒe nudzraɖola gbɔ hafi nàtsɔ asi atrɔ nu aɖeke.

Xlẽ [Ironwood](/zcash-tech/ironwood) be nànya nu si trɔ kple ta si ta etrɔ.

</div>

## Ɣaɣla dzesi ŋɔŋlɔ blibo kae manɔ wɔm?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** nye nu si ɖe teƒe na zcashd tẽ, eye migration guide la bua be yeanɔ wɔm. Tiae negbe wòta bubu aɖeke mele na wò o.

**[Zakura](/zcash-tech/zakura-node)** nye dɔwɔwɔ bubu si ƒe tame nye be wòanɔ gã, si ƒe sync le kabakaba wu eye wòate ŋu atso gaɖoɖowo ƒuƒoƒewo xoxo le eɖokui me. Tiae ne èhia esiawo, alo ne èle software si gale ƒo nu kple zcashd zãm.

Evea kata dea ɖoɖonu ma ke ƒe nyateƒe, eyata dɔwɔwɔ ƒe tiatae nye, menye gbegbɔgblɔ ɖi ƒe tiatae o.

</div>

## Afika mate ŋu adi nyagbalẽ aɖe si tso release note me ƒe gɔme?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Kpɔ [Zcash Library](/glossary-and-faqs/zcash-library). Eƒe nya me le ɣaɣla dzesi ŋɔŋlɔ kple gakotoku ƒe software, ɣaɣla gaƒuƒoƒowo, kple ZIP ƒe xexlẽwo siwo doa go zi geɖe.

</div>

## Nususu siwo menyo o aɖe siwo kpɔa zi geɖe

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Nususu si menyo o</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">Ɖoɖo blibo</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash nye coin si wodzi ɖu le teƒe ɖeka oa?</td>
      <td className="py-4 px-5 text-foreground">Ao. Trademark ƒe agreement aɖe tɔa Zcash Foundation alo ECC ɖe mɔ be woanɔ wɔm tsitre ɖe hamea ƒe gbegbɔgblɔ ɖi ŋu o. Woɖe ɖoɖo be dziɖuɖu la nye ha nuɖo agni (kpɔ [Messari ƒe report](https://messari.io/report/decentralizing-zcash)). Hamea ƒe vote, ZecHub, kple Zcash Foundation A/V Club wɔa mɔ na ame geɖe ƒe hatsotso.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ƒe mɔ megbe aɖe le eme oa?</td>
      <td className="py-4 px-5 text-foreground">Ao. Zcash alo crypto ƒe software aɖeke si míetu kpɔ o le mɔ megbe aɖeke, eye makpɔe gbeɖe o.</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Company aɖe le Zcash dziɖum oa?</td>
      <td className="py-4 px-5 text-foreground">Esia menye nyateƒe o. Togbɔ be míewɔa dɔ kple companywo le numekpɔkpɔ me hã la, Zcash gale ha nuɖo agni ƒe dzadzraɖo. Hame siwo ƒe dziɖuɖu le wo ŋutɔ ƒe asi me geɖe wɔa dɔ ɖekae be woaƒo asikplɔ le wo ŋutɔ ƒe asi me eye woakpɔ ɣaɣla ƒe katãtɔwo dzi.</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash ƒe ɣaɣla le sue sɔ kple ɣaɣla coin bubuwo</td>
      <td className="py-4 px-5 text-foreground">Ao. Monero/Grin ƒe ɣaɣla ɖoa dzi ɖe decoywo ŋu (siwo ate ŋu aɖe wɔnuku). Zcash ɣaɣlaŋlɔŋlɔa ɣaɣla gaɖoɖo ƒe data blibo, ale be gaɖoɖo sia ame si le gaƒuƒoƒo la me mate ŋu adze to o. Kpɔ [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
    </tr>
  </tbody>
</table>

</div>

---

**Wotrɔe mlɔeba:** October 2026
**Èdi be yeawɔ kpekpeɖeŋu oa?** [Trɔ axa sia le GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
