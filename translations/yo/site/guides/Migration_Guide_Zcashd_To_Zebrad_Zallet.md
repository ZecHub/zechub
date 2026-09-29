# Atọ́nà Ìlọsípò: Láti zcashd sí Zebrad/Zallet

A ti rọpo gbogbo awọn nodes zcashd, eyiti o jẹ *Electric Coin Company (ECC) * / *Zodl*, nipasẹ Zebra ati Zallet. Zcashd de opin atilẹyin rẹ ni 18 Keje 2026 ko si ṣiṣẹ mọ.

- Zebra is a modern Rust implementation of the Zcash protocol developed by the Zcash Foundation
- Zallet jẹ apo apamọwọ ti o ni irọrun kan ti a ṣe lati sopọ laisiyonu pẹlu awọn akopọ Zebra ti Zodl dagbasoke

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Atọ́nà yìí yóò tọ̀ ọ lọ nípasẹ̀ ìyípadà láti **Zcashd** sí **Zebrad** àti **Zallet**, títí kan ètò ìṣètò, àtúntò owó pópó, àti dídájú àwọn ìṣòro tí ó wọpọ nínú ṣíṣípò.

---

## zcashd dáwọ́ lílo ní 18 July 2026 dúró.

** Kí ni èyí túmọ̀ sí**

- zcashd dé ìparí àtìlẹ́yìn rẹ̀ ní 18 July 2026. Kò tún lè ṣe ìṣọ̀kan sí òpin ẹ̀ka mọ, kò sì le fi ránṣẹ́ tàbí gba owó. Èyí ti parí, a kò gbèrò láti ṣe é.
- zcashd's two jobs are now split: **zebrad** is the full node, and **Zallet** is the wallet.
- Zallet wà ní **beta**. Breaking àwọn àtúnṣe le ṣẹlẹ laarin awọn idasilẹ, ati diẹ ninu awọn zcashd JSON-RPC ọna ti wa ni ko ṣe sibẹsibẹ. Ṣayẹwo awọn [matrix ipo ọna ṣiṣe](https://zcash.github.io/zallet/) kó o tó di ẹni tí ò ń retí pé kí ẹnì kan pè é.
- Ti o ba tun ni awọn owo **Sprout**, ka ikilọ ninu igbesẹ 6 akọkọ. Zallet ko ṣe atilẹyin fun iṣupọ Sprout, ati ọna ti a lo nigbagbogbo lati gbe awọn owo wọnyẹn nilo zcashd ṣiṣe.

** Kí Nìdí Tó Fi Yẹ Ká Ṣí Lọ sí Ọ̀pọ̀ Ètò Ìlú - Kò Ní Jẹ́ Kéèyàn Máa Kùnà Rẹ̀**

Kódà, tá a bá fi ìtìjú sílẹ̀, àwọn ìdí pàtàkì wà tó yẹ kéèyàn máa ṣí lọ:
- Ààbò àti ìdúróṣinṣin: Ìpamọ́-ààbò Rust ati irinṣẹ ìgbàlódé dín ewu àwọn àléébù kù.
- Iṣẹ & Idagbasoke: A ṣe apẹrẹ Zebrad fun ibajọra, lilo awọn orisun daradara diẹ sii, ati isopọmọ iyara.
- Ẹrọ-iṣẹ Modular: Yiyọ loji node (Zebrad) lati inu apamọwọ UI (Zallet) nfunni ni awọn aala ti o mọ ati ọna igbesoke to dara julọ.
- Ifarada Eto Ilẹ-aye Ọla: Awọn irinṣẹ, awọn ilọsiwaju ati iyoku eto ilolupo Zcash yoo ṣe ifojusi Zebrad / Zallet siwaju sii.
- Ìbàlẹ̀ ọkàn: Yẹra fún dídi ẹni tí ó ń lo ohun èlò kan tó ti di àwáwí, èyí tí kò ní ìtìlẹ́yìn.

### Ẹ jẹ́ ká wá wo ìwé tó ń sọ nípa ṣíṣí lọ síbòmíì.

**1. Ṣe àtúnṣe sí Gbogbo nǹkan**
* Ṣe afẹyinti wallet.dat rẹ (tabi eyikeyi faili apamọwọ / ibi ipamọ bọtini miiran) lati oju opo zcashd rẹ.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Fi zcash.conf rẹ pamọ ati awọn eto aṣa eyikeyi.
* Ṣàtúnṣe ẹ̀dà ti gbogbo àwọn àkọsílẹ̀ RPC tàbí ohun-èlò tí o lò.
* Ṣayẹwo pe awọn afẹyinti rẹ jẹ to wulo (fun apẹẹrẹ ni ayika miiran, gbiyanju lati ṣii tabi ṣe ayẹwo wọn).
* Ṣe àtúnyẹ̀wò àwọn ìlànà JSON-RPC tí o ń gbára lé nísinsìnyí.
* Fi wé pẹlú tábìlì ìmúṣẹ tí a gbero ti o wà ní orí ìwé àkọsílẹ̀. [Àwòrán ìtìlẹyìn Zcash](https://z.cash/support/zcashd-deprecation/) 
* Múra sílẹ̀ fún àwọn àyípadà tàbí ìlànà tí kò sí (àwọn kan lè nílò ìmúṣẹ tàbí yíyẹ wọn padà).

**2. Àwọn Ohun Tí Ó Pọn Dọ́rọ̀ àti Àyè Onírìísí**
* Àyè disk jẹ ohun tí àwọn ènìyàn kò kà sí. Ìpínlẹ̀ Zcash kọjá 270 GB ní August 2026, nítorí náà fi ààyè sílẹ̀ fún ó kéré tán 300GB, lórí SSD bí o bá lè ṣe é.
* Rii daju pe ẹrọ rẹ ni nẹtiwọọki iduroṣinṣin, CPU, RAM.
* Ìsopọ̀ ayélujára kan. 
* Ti o ba gbero lati ṣajọ lati orisun, ni Rust & Cargo ti fi sori ẹrọ.

**3. Fi sori ẹrọ / Ṣeto Zebrad**
O le ṣe igbasilẹ faili ti a kọ tẹlẹ tabi kó o lati orisun.
* Zcash Foundation ń tẹ̀wé jáde àti àwọn ìdìpọ̀ méjì fún Zebra. Àpẹẹrẹ, o lè lo àdàkọ-ìfiwọlé tàbí gba ẹrù ìdìpọ̀ tó bá yẹ fún OS rẹ.

* Kíyè síi pé nínú àwọn ẹ̀dà Zebra tí ó ṣẹṣẹ, [a kò tún gba ìparí RPC láàyè mọ́ nípasẹ̀ àfojúsùn nínú Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Ohun A: Fi sori ẹrọ nipasẹ awọn prebuilt alakomeji** 
Lori ** Linux**/** macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

This installs the latest stable version of zebrad.

**Ohun tí o lè ṣe B: Ṣẹ̀dá láti orísun**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Lẹ́yìn tí ẹ bá ti kọ ilé, gbé ìsọ̀rí náà síbi tóo fẹ́ kó dé:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Ìṣètò & Igbesẹ** 
Ṣẹda ìtòlẹ́sẹẹsẹ àbínibí:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Ṣatunkọ **zebrad.toml** si awọn ayanfẹ rẹ (gbiyanju adirẹsi, ibudo, itọsọna ipinlẹ, caching).

**Bẹrẹ ìsopọ̀:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Àkó náà yóò bẹ̀rẹ̀ sí ṣe àdàkọ láti ìpilẹ̀ṣẹ̀ - retí wákàtí mélòó kan (tàbí jù bẹẹ lọ) ní ìbámu pẹ̀lú ohun èlò àti ẹ̀rọ-ìpèsè.

**5. Ṣíṣètò/Ṣiṣẹ́pò Zallet (Wolẹti)**

Zallet ni a ṣe lati rọpo apakan apamọwọ ti zcashd.

Ṣayẹwo oju-iwe GitHub / igbasilẹ Zallet fun awọn alakomeji.

** Tabi kókó láti orísun:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Ṣii GUI tabi CLI (bi fifi sori ẹrọ rẹ ṣe pese).
* Ṣeto rẹ lati sopọ si oju-ọna Zebrad agbegbe rẹ nipasẹ RPC tabi API opin.

**6. Gbigbe Iwe-owo zcashd rẹ sinu Zallet**

O kò nílò zcashd tí ó ń ṣiṣẹ́ fún èyí. Zallet ka àwọn ìsọfúnni náà `wallet.dat` faili taara, eyi ti o ṣe pataki nitori zcashd ko le bẹrẹ mọ.

> **Tún un ṣe. `wallet.dat`.** Awọn gbigbe iroyin ohunkohun ti o ko le ṣe afihan ni a Zallet apamọwọ dipo importing o, ati awọn pataki ohun elo ki o si wa nikan ninu `wallet.dat`. Má ṣe pa á lẹ́yìn tí o bá ti ṣípò padà.

Ẹ sá lọ! `zallet init-wallet-encryption` Zallet n ṣe àdàkọ ìkóhun-ìmọ̀ kókó sí ìdánimọ́ ọjọ́ orí, àti pé idadíyẹ̀wò náà ní láti wà kí wọ́n tó gbé àwọn kọǹpútà kan wá.

Lẹhinna yi iṣeto rẹ pada ati apamọwọ rẹ:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` jẹ nikan ni o wa ninu kọ pẹlu awọn `zcashd-import` àwọn ohun tó wà nínú ìwé náà àti kíkàwé. `wallet.dat` nílò àwọn ohun tí wọ́n ń lò. `db_dump` utility lati Berkeley DB 6.2, awọn ti ikede zcashd lo. Ti o ba ni diẹ ẹ sii ju ọkan apamọwọ faili, ṣiṣe awọn aṣẹ lẹẹkan fun kọọkan faili ki o si fi kun `--allow-multiple-wallet-imports` lori awọn nigbamii nṣiṣẹ; kọọkan di ara rẹ ṣeto ti iroyin. `rpcuser` àti pé, `rpcpassword` a kò gbé wọn lọ, nítorí pé JSON-RPC ti Zallet ń lo ìfọwọ́sí kuki ní àdàkọ; fi àwọn àkọọ́lẹ̀ ìdánilójú kún un pẹlú: `zallet add-rpc-user` tó o bá nílò wọn.

* Ohun tó bá dé*

* Àwọn ìkókó tí ó jẹ́ kí n mọ̀ nípa wọn àti àwọn kókó tó jáde láti inú wọn, pẹlú àkọọlẹ̀-ìpamọ́ ti a tún ṣe padà fún àpò zcashd náà.
* Awọn bọtini ti o nlo Sapling ati awọn bọtini ṣiṣan gbangba ti a gbe wọle lọtọ.
* Awọn titẹsi iṣọwo nikan ti o ni awọn bọtini gbangba wọn tabi iwe afọwọkọ igbasilẹ
* Ṣàkójọ ọjọ́ ìbí, kí àyẹ̀wò ẹyínrẹ̀ẹ̀rọ náà lè bẹ̀rẹ̀ ní ibi tí ó yẹ.

**Àwọn nǹkan tí kò bára dé.** Àwọn wọ̀nyí ni a ròyìn pẹlú iye dípò àwọn ti wọn kó wá:

* **Sprout ìnáwó kókó ati owo.** Zallet ko ni atilẹyin fun awọn Sprout pool. Awọn iwe ọna wà lati gbe gbóògì owo jade lilo zcashd ṣaaju ki o to retiring ti o, ati pe jẹ bayi ṣee ṣe. Ti yi ba kan si ọ, beere lori awọn [Zcash R&D Discord ì í ë ¤ì 'ë¦¬í ¬ê° êμ¬ì§ .](https://discord.gg/xpzPR53xtU) tàbí àwọn tó wà nínú [àpéjọ àwùjọ](https://forum.zcashcommunity.com/) kí o tó ṣe ohunkóhun mìíràn.
* Àwọn àkọsílẹ̀ ìwé àdírẹ́sì
* Àwọn àkọsílẹ̀ tí a fi àwòdì nìkan sí, ti wọn kò ní kókó ìta gbangba tàbí kíkọ́wé láti rà padà àti àwọn àkọsílẹ̀ pẹlú àwọn kọ̀ǹpútà tó jẹ́ pé kì í ṣe kókó-ìta gbangba ni wọ́n ń lò.
* Àwọn àpamọ́ ìforúkọsílẹ̀

** Ṣiṣakoso lẹhin.** A mnemonic lori ara rẹ ni ko kan pipe afẹyinti, nitori ti wọle bọtini wa nikan ninu awọn apamọwọ database. Pa ailewu daakọ ti `wallet.db`, awọn ọjọ ori encryption idanimọ faili ti a npè nipasẹ awọn `keystore.encryption_identity` àtúnṣe, àti ọ̀rọ̀-ìfipamọ́ rẹ, kí o sì pa ìpilẹ̀ṣẹ̀ náà mọ́. `wallet.dat`Kíyè sí i pé: `wallet.db` kò ní ìdìkọ̀rọ́: ó ń tọjú ìtàn ìṣirò rẹ àti wíwo kókó nínú àyè, nítorí náà fi ẹ̀dà afẹyinti pamọ síbi tí o wà láìséwu.

**Ìṣàtúnṣe àpòòwé & Àjọsopọ**

* Nígbà tí a bá ti kó àwọn kọ́kó wọlé, Zallet yóò tún àtúnyẹ̀wò ẹrù náà ṣe nípasẹ̀ Zebrad.
* Fún Zallet ní àkókò díẹ̀ láti tún àkáǹtì rẹ àti ìtàn ìṣirò rẹ̀ ṣe.

**7. Ṣayẹwo Awọn Balance ati Sync**

Nígbà tí wọ́n bá ti kó wọn wá, Zallet yóò so mọ̀ sí Zebrad node rẹ ó sì tún ṣàyẹwò ìsọ̀rí náà.
Nígbà tí ìṣàmúlò bá parí, àlàfo àti ìnáwó rẹ yóò fara hàn bí ó ti rí tẹ́lẹ̀.

O le ṣayẹwo ipo isọdọkan ti node rẹ nipa ṣiṣe:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Tàbí kí wọ́n ṣàyẹ̀wò àkọsílẹ̀.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Ìṣòro dídájú**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Issue</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Possible Cause</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Solution</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad won't start</td>
        <td className="px-6 py-4">Port in use or bad config</td>
        <td className="px-6 py-4">Check **zebrad.toml** and use a free port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Slow sync</td>
        <td className="px-6 py-4">Network congestion</td>
        <td className="px-6 py-4">Ensure stable internet, restart Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet missing transactions</td>
        <td className="px-6 py-4">Partial key import</td>
        <td className="px-6 py-4">Re-import keys or rescan in Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet can't connect to node</td>
        <td className="px-6 py-4">Node not running or wrong endpoint</td>
        <td className="px-6 py-4">Start Zebrad and verify correct RPC port</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet crashes</td>
        <td className="px-6 py-4">Outdated build</td>
        <td className="px-6 py-4">Update to latest release from GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

Ìparí ìwádìí**

Ṣíṣípò láti zcashd sí Zebrad àti Zallet fún ọ ní ìrírí Zcash tó yá jù, tí ó dáàbò bò, tí o sì jẹ́ òde òní.
Pẹlu aabo ti o da lori Rust, apẹrẹ modulu ati irinṣẹ to dara julọ, iṣeto yii ṣe idaniloju pe node rẹ ati apamọwọ wa ni ọjọ iwaju-ṣetan bi ilolupo eda abemi Zcash tẹsiwaju lati dagbasoke.

Ìmọ̀ràn: Pa àwọn kókó àpò rẹ mọ́ àti ṣe afẹyinti gbogbo ìsọfúnni Zallet.
Ìbẹ̀wò [zebra.zfnd.org (ìkànnì)](https://zebra.zfnd.org) fún Zebra, àti [Ìwé Zallet](https://zcash.github.io/zallet/) tàbí àwọn tó wà nínú [Àkójọ àwọn ìsọfúnni nípa Zallet](https://github.com/zcash/zallet) fún Zallet. [Migrate from zcashd (ì í ì ë§ ê°)](https://zcash.github.io/zallet/) orí The Zallet Book ni ìwé tí a fi ń ṣe àlàyé fún ìgbésẹ̀ kẹfà.
