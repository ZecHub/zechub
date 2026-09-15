# Maswali Yanayoulizwa Mara Nyingi

Orodha ya maswali ya kawaida kuhusu Zcash. Kwa utatuzi wa matatizo mteja Zcash, tafadhali angalia makala juu yake katika ukurasa huu: "Zcash". [rasmi troubleshooting mwongozo](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

### Navigation ya haraka
[Zcash ni nini?](#what-is-zcash) | [Jinsi ya kupata Zcash?](#how-can-i-acquire-zcash) | [Tofauti kutoka cryptocurrencies nyingine?](#what-is-the-difference-between-zcash-and-other-cryptocurrencies) | [Utawala wa itifaki?](#how-is-the-zcash-protocol-governed) | [Mkataba wangu uko wapi?](#where-is-my-transaction) | [Je, Zcash ni ya kibinafsi?](#is-zcash-really-private) | [Maoni yasiyo sahihi kuhusu ndoa](#a-few-common-misconceptions)

---

## Zcash ni nini?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash ni sarafu ya dijiti na shughuli za haraka, siri na ada ndogo. Faragha ndio sifa kuu ya Zcash. Ilianzisha matumizi ya uthibitisho wa maarifa-sifa ili kupachika manunuzi yote. 

Pochi kadhaa zinapatikana kwa malipo ya papo hapo, simu za rununu, salama na binafsi: [Wallets za Mkono](https://z.cash/wallets/)
</div>

## Ninaweza kupataje Zcash?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Unaweza kununua ZEC kwa cryptocurrency [kubadilishana](https://z.cash/exchanges).  
Unaweza pia kununua Zcash peer-to-peer au kupata kwa madini.
</div>

## Ni tofauti gani kati ya Zcash na sarafu nyingine za siri?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash kimsingi ni zaidi binafsi kuliko Bitcoin au Ethereum. Inatoa muda wa haraka (sekunde 75), ada ya chini, na upgrades mara kwa mara. 

Watumiaji wanaweza kuchagua kati ya **Transparent** au **Shielded** shughuli. Kwa habari zaidi tazama [Mazingira Yenye Kuhifadhiwa Vizuri](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html).
</div>

## Je, ni jinsi gani Zcash itifaki inaongozwa?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Itifaki inaongozwa na mchakato wa ** Zcash Uboreshaji Pendekezo (ZIP) **. Mtu yeyote anaweza kuwasilisha rasimu ya ZIP. Rasimu ni kujadiliwa kwa jamii na kukubalika au kukataliwa na mhariri ZIP:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

Maamuzi ni yaliyoandikwa katika vipimo na kuthibitishwa juu ya mnyororo wakati mtandao inachukua yao.
</div>

## Mkataba wangu uko wapi?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Kusoma kwanza [mwongozo wetu kuzuia wavumbuzi](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629)Kisha angalia . [Zcash Block Explorer (Mtafutaji wa Hifadhi)](https://zcashblockexplorer.com).  

Shughuli expire baada ya takriban dakika 25 (block 20) na fedha ni kurudi moja kwa moja. 

** Sababu za kawaida shughuli inaweza kuonekana:**
- Kupoteza uhusiano wa mawasiliano
- Ada ya shughuli ni chini sana.
- Network overload (mzigo wa juu)
- Wengi mno pembejeo uwazi (ukubwa kubwa sana)

** Vidokezo vya kufanikiwa:**
- Tumia uhusiano imara
- Lipa ada ya kawaida (au zaidi kwa kipaumbele)
- Subiri na ujaribu baadaye.
- Matumizi pembejeo chache kuweka shughuli ndogo
</div>

## Je, Zcash ni ya Kibinafsi?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**Ndiyo.** Zcash encrypts mtumaji, kiasi cha fedha na data ya mpokeaji kwa ajili ya shughuli za ulinzi. 

Zcash haina **not**:
- Encrypt multisignature shughuli (FROST ushirikiano inasubiri)
- Kulinda dhidi ya uhusiano na shughuli uwazi
- Ficha anwani za IP

Kusoma zaidi: [Mazingira Yenye Kuhifadhiwa Vizuri](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## Maoni yasiyo sahihi kuhusu jambo hilo

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Misconception</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">Correct Answer</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Is Zcash a centralised coin?</td>
        <td className="py-5 px-6 text-foreground">No. A trademark agreement prevents the Zcash Foundation or ECC from acting against community consensus. Governance is proven decentralised (see [Messari report](https://messari.io/report/decentralizing-zcash)). Community polls, ZecHub, and Zcash Foundation A/V Club all enable broad participation.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Does Zcash have a backdoor?</td>
        <td className="py-5 px-6 text-foreground">No. Neither Zcash nor any cryptographic software we have built contains a backdoor, and never will.</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Is Zcash controlled by a corporation?</td>
        <td className="py-5 px-6 text-foreground">Incorrect. While we partner with companies for research, Zcash remains committed to decentralisation. Multiple autonomous organisations work together toward self-custody and privacy rights.</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash has limited privacy compared to other privacy coins</td>
        <td className="py-5 px-6 text-foreground">No. Monero/Grin-style privacy relies on decoys (which can be defeated). Zcash encrypts all shielded transaction data so every transaction in the pool is indistinguishable. See [Not Private Enough?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/).</td>
      </tr>
    </tbody>
  </table>
</div>

---

** Mwisho updated:** Machi 2026 
**Want kuchangia?** [Hariri ukurasa huu kwenye GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
