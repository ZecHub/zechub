# Itọsọna Iṣilọ: Lati zcashd si Zebrad/Zallet

Eto ilolupo Zcash n dagbasoke. Nodu kikun Zcashd ti aṣa, ti o ṣetọju nipasẹ *Electric Coin Company (ECC) * / *Zodl*, ni rọpo rọpo nipasẹ Zebra ati Zallet.

- Zebra is a modern Rust implementation of the Zcash protocol developed by the Zcash Foundation
- Zallet jẹ apo apamọwọ ti o ni irọrun ti a ṣe lati ṣepọ laisiyonu pẹlu awọn akopọ Zebra ti o dagbasoke nipasẹ Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Àwòrán ìjíròrò GPTIOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Itọsọna yii n tọ ọ lọ nipasẹ gbigbe lati **Zcashd** si **Zebrad** ati **Zallet**, pẹlu iṣeto, gbigbe apamọwọ wọle, ati yanju awọn iṣoro gbigbe wọpọ.

---

## Ise agbese Zcash ti kede ni ifowosi pe zcashd yoo di ohun ti ko wulo ni ọdun 2025.

**Ipò Ìkórìíra àti Ohun Tí Ó Túmọ̀ Sí**

- Ise agbese Zcash ti kede ni ifowosi pe zcashd yoo di ohun ti ko wulo ni ọdun 2025.
- A ti n gbe awọn akopọ kikun lọ si Zebrad, imuse Rust kan, lakoko ti a pinnu Zallet lati ṣe aṣeyọri paati apamọwọ ti zcashd. 
- Ni idahun, iṣẹ akanṣe Zebra tọpinpin ami-ami "Zcashd Deprecation" lati rii daju ibaramu, gbigbe RPC, ati atilẹyin ilolupo.
- Fun ọpọlọpọ awọn ọna RPC, Zebrad/Zallet yoo ni ifọkansi lati jẹ awọn rirọpo ti o ṣubu-ni (ti n ṣe apẹẹrẹ tabi ibaamu ihuwasi). Awọn miiran yoo yipada tabi ko le ni atilẹyin.

Kí Nìdí Tó Fi Yẹ Kó O Ṣí Lọ sí Ọ̀pọ̀ Ilẹ̀?

Kódà, tá a bá fi ọ̀rọ̀ pé àwọn èèyàn ò kà wá sí mọ́, àwọn ìdí pàtàkì kan wà tó fi yẹ kéèyàn ṣí lọ síbòmíì:
- Ààbò àti ìdúróṣinṣin: Ìpamọ́-ààbò Rust àti ọ̀nà ìgbàlódé ń dín ewu àwọn àléébù kù.
- Iṣe & Idagbasoke: A ṣe apẹrẹ Zebrad fun ibajọra, lilo awọn orisun ti o munadoko diẹ sii, ati isọdọkan iyara.
- Modular Architecture: Yiyọ loji node (Zebrad) lati inu apamọwọ UI (Zallet) nfunni ni awọn aala ti o mọ ati awọn ọna igbesoke ti o dara julọ.
- Ajọṣepọ Eto Ilẹ-aye Ọla: Awọn irinṣẹ, awọn ilọsiwaju, ati iyokù ti eto ilolupo Zcash yoo ṣe ifojusi Zebrad / Zallet siwaju ati siwaju sii.
- Ìbàlẹ̀ Ọkàn: Yẹra fún dídi ẹni tó ń lo ohun èlò tí kò wúlò mọ́, tí kò sì ní ìtìlẹyìn.

### Ní báyìí ẹ jẹ́ kí á lọ wo ìwé tó ń sọ nípa ṣíṣí lọ síbòmíì

Ìrànlọ́wọ́ fún Ohun Gbogbo
* Ṣe afẹyinti wallet.dat rẹ (tabi eyikeyi faili apamọwọ / ibi ipamọ bọtini miiran) lati oju opo zcashd rẹ.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ì1⁄2 ì ¤í ì ']](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Fi zcash.conf rẹ pamọ ati eyikeyi awọn eto aṣa.
* Ṣe èsì ẹ̀dà ti gbogbo àwọn àdàkọ RPC tàbí ẹ̀rọ-ìmúṣiṣẹ́ tí o lò.
* Rii daju pe awọn afẹyinti rẹ jẹ wulo (fun apẹẹrẹ ni ayika miiran, gbiyanju lati ṣii tabi ṣayẹwo wọn).
* Ṣe àtúnyẹ̀wò àwọn ọ̀nà JSON-RPC tí o ń gbára lé lásìkò yìí.
* Ṣe afiwe pẹlu tabili ibaramu ti a gbero ti o ṣetọju lori aaye atilẹyin Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Múra sílẹ̀ fún àwọn àyípadà tàbí àwọn ọ̀nà tí kò sí (àwọn kan lè nílò àtúnṣe tàbí àtúntò).

**2. Awọn ibeere Eto & Aaye Disk**
* Rii daju pe o ni aaye disiki ti o to (iyika Zcash tobi). O kere ju 10 GB ti aaye disk ọfẹ.
* Rii daju pe ẹrọ rẹ ni nẹtiwọọki iduroṣinṣin, CPU, RAM.
* Asopọ intanẹẹti 
* Ti o ba gbero lati ṣajọ lati orisun, ni Rust & Cargo ti fi sori ẹrọ.

**3. Fi sori ẹrọ / Ṣeto Zebrad**
O le ṣe igbasilẹ kan ti a ti kọ tẹlẹ tabi kọ lati orisun.
* Zcash Foundation n tẹjade awọn itusilẹ ati awọn alakomeji fun Zebra. Fun apẹẹrẹ, o le lo iwe afọwọkọ fifi sori ẹrọ tabi ṣe igbasilẹ alakomeje ti o yẹ fun OS rẹ.

* Akiyesi pe ninu awọn ẹya Zebra ti o ṣẹṣẹ, [a ko tun gba aaye ipari RPC ni aiyipada ni Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Aṣayan A: Fi sori ẹrọ nipasẹ iṣaaju ti a ti kọ* 
Lori ** Linux **/** macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ì ¬í ì2 ]](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

This installs the latest stable version of zebrad.

**Aṣayan B: Kọ lati orisun**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ì ¤í ì (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Lẹ́yìn tí ẹ bá ti kọ́ ilé, ẹ gbé ìsọ̀rí náà sínú ọ̀nà yín:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Ìṣilọ 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Ìṣètò àti Ìfilọ́lẹ̀** 
Ṣẹda ìtòlẹ́sẹẹsẹ àbínibí:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ìyípadà2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Ṣatunkọ **zebrad.toml** si awọn ayanfẹ rẹ (gbigbọ adirẹsi, awọn ibudo, itọsọna ipinlẹ, caching).

**Bẹrẹ ìsopọ̀:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Àwòrán](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Nọ́ọ̀dù náà yóò bẹ̀rẹ̀ sí ṣe àdàkọ láti ìpilẹ̀ṣẹ̀ - retí wákàtí bíi mélòó kan (tàbí jù bẹ́ẹ̀ lọ) ní ìbámu pẹ̀lú ohun èlò àti ẹ̀rọ-ìpèsè.

**5. Fi sori ẹrọ / Ṣiṣeto Zallet (Wallet) **

Zallet ni a ṣe lati rọpo apakan apamọwọ ti zcashd.

Ṣayẹwo oju-iwe GitHub / igbasilẹ Zallet fun awọn alakomeji.

**Àbí kókó láti orísun:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Àwòrán](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Ṣii GUI tabi CLI (bi fifi sori ẹrọ rẹ ṣe pese).
* Ṣeto rẹ lati sopọ si oju-ọna Zebrad agbegbe rẹ nipasẹ RPC tabi opin API.

**6. Gbigba Iwe apamọwọ zcashd rẹ wọle sinu Zallet** 
Nípasẹ̀ Ibi ìkóhunsílẹ̀ Àkọ́kọ́

Lori zcashd, kó àwọn kókó ìpamọ́ rẹ jáde:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ì ¤ë¥1⁄4 ì 1⁄4ì ì ']](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Ni Zallet, yan Awọn bọtini Gbigbe tabi aṣayan ti o jọra.
* Fi hàn án sí ìkànnì zcashd_keys.txt. 
* Zallet yẹ ki o ṣawari ati gbe awọn adirẹsi ZEC ati awọn bọtini ti o jọmọ wọle.

** Nípasẹ̀ gbólóhùn ìkékúrú** (bí ó bá yẹ)

* Ti apamọwọ rẹ ba ṣe atilẹyin fun afẹyinti irugbin, lo Tunṣe lati Ọrọ-ọrọ Irugbin ni Zallet.
* This only works if your zcashd wallet was derived from a seed (or you have seed conversion).

**Ìṣàtúnṣe àpamọ́ àti Ìṣàmúlò Àpapọ̀**

* Gbàrà tí wọ́n bá ti kó àwọn kókó wọlé, Zallet yóò tún àtúnyẹ̀wò ẹ̀rọ náà ṣe nípasẹ̀ Zebrad.
* Fún Zallet ní àkókò díẹ̀ láti ṣàtúnṣe àròpọ̀ àti ìtàn ìnáwó rẹ.

**7. Ṣayẹwo Awọn Balance ati Sync**

Nígbà tí wọ́n bá ti kó o wọlé, Zallet yóò so mọ́ Zebrad node rẹ, yóò sì tún àdàkọ ìsọ̀rí náà ṣe.
Nígbà tí ìfọwọ́sowọ́pọ̀ bá parí, àlàfo rẹ àti àwọn ìnáwó rẹ yóò farahàn gẹ́gẹ́ bí ti ìṣáájú.

O le ṣayẹwo ipo isọdọkan ti node rẹ nipa ṣiṣe:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Àwòrán](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Tàbí kí wọ́n ṣàyẹ̀wò àkọsílẹ̀.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
[Àwòrán](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Ìtọjú ìṣòro**

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

**9. Ìparí**

Ṣíṣípò láti zcashd sí Zebrad àti Zallet fún ọ ní ìrírí Zcash tó yá jù, tó dáàbò bò, tó sì jẹ́ òde òní.
Pẹlu aabo ti o da lori Rust, apẹrẹ modulu, ati irinṣẹ ti o dara julọ, iṣeto yii rii daju pe node ati apamọwọ rẹ wa ni ọjọ iwaju-ṣetan bi ilolupo eda abemi Zcash tẹsiwaju lati dagbasoke.

Ìmọ̀ràn: Pa àwọn kókó àpamọ́ rẹ mọ́, kí o sì máa ṣe àtìlẹyìn àwọn ìsọfúnni Zallet rẹ déédéé.
Lọ sí [zebra.zfnd.org]](https://zebra.zfnd.org) àti [zallet.zfnd.org](https://zallet.zfnd.org) fún àtúnṣe àti ìtìlẹyìn àwùjọ.
