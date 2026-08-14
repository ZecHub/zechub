# Ʋuʋu ƒe Mɔfiame: Tso zcashd dzi yi Zebrad/Zallet dzi

Zcash ƒe lãwo ƒe agbenɔnɔ ƒe ɖoɖoa le tɔtrɔm. Zcashd full node si wozãna tsã, si *Electric Coin Company (ECC)* / *Zodl* léa be na la, le Zebra kple Zallet ɖɔlim vivivi.

- Zebra nye egbegbe Rust ƒe Zcash ɖoɖowɔɖi si Zcash Foundation wɔ la ƒe dɔwɔwɔ
- Zallet nye gakotoku si ƒe kpekpeme le bɔbɔe si wotu be wòawɔ ɖeka kple Zebra nodes siwo Zodl to vɛ la nyuie

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![DzeɖoɖoGPTINɔnɔmetataOct12202508_15_20A](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Mɔfiame sia kplɔa wò to ʋuʋu tso **Zcashd** yi **Zebrad** kple **Zallet** me, si me ɖoɖowɔwɔ, gakotoku ƒe tsɔtsɔ yi, kple ʋuʋu ƒe kuxi siwo bɔ gbɔ kpɔkpɔ hã le.

---

## Zcash dɔa ɖe gbeƒãe le se nu be woaɖe zcashd ɖa le ƒe 2025 me.

**Deprecation Status & Nusi Wòfia**

- Zcash dɔa ɖe gbeƒãe le se nu be woaɖe zcashd ɖa le ƒe 2025 me.
- Wole node blibowo ʋum yi Zebrad, si nye Rust ƒe dɔwɔwɔ, esime woɖoe be Zallet naxɔ ɖe zcashd ƒe gakotoku ƒe akpa dzi. 
- Le esia ta la, Zebra dɔa léa ŋku ɖe "Zcashd Deprecation" ƒe nu vevi aɖe ŋu be woakpɔ egbɔ be wowɔ ɖeka, RPC ƒe ʋuʋu, kple lãwo ƒe agbenɔnɔ ƒe kpekpeɖeŋu.
- Le RPC mɔnu geɖewo gome la, Zebrad/Zallet aɖoe be yeanye drop-in replacements (emulating alo matching behavior). Bubuwo atrɔ alo ɖewohĩ womado alɔ wo o.

**Nukatae Woaʋu - Beyond Deprecation**

Ne míeɖe asi le ameŋugblẽnyawo ŋu gɔ̃ hã la, susu sẽŋuwo li siwo tae wòle be míaʋu:
- Dedienɔnɔ & Sesẽme: Rust ƒe ŋkuɖodzinu-dedienɔnɔ kple egbegbe dɔwɔnuwo ɖea afɔku siwo le afɔkuwo me dzi kpɔtɔna.
- Dɔwɔwɔ & Dɔwɔwɔ Nyuie: Wotrɔ asi le Zebrad ŋu na parallelism, nunɔamesiwo zazã nyuie wu, kple sync kabakaba wu.
- Modular Architecture: Node logic (Zebrad) mama tso gakotoku UI (Zallet) gbɔ naa liƒo siwo me kɔ wu kple ŋgɔyiyimɔ nyuitɔwo.
- Etsɔme ƒe lãwo ƒe agbenɔnɔ ƒe sɔsɔ: Dɔwɔnuwo, ŋgɔyiyiwo, kple Zcash ƒe lãwo ƒe agbenɔnɔ ƒe akpa mamlɛa aɖo taɖodzinu na Zebrad/Zallet geɖe wu.
- Susu ƒe Ŋutifafa: Ƒo asa na be nàtsi akpa aɖe si megahiã o, si ŋu womedo alɔe o la dzi.

### Azɔ mina míage ɖe Ʋuʋu ƒe mɔfiamegbalẽa me

**1. Backup Nusianu**
* Wɔ wò wallet.dat (alo gakotoku ƒe faɛl / safuidzraƒe bubu ɖesiaɖe) ƒe kɔpi tso wò zcashd node me.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1) .](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Dzra wò zcash.conf kple ɖoɖo ɖesiaɖe si nèwɔ ɖe ɖoɖo nu ɖo.
* Tsɔ RPC ŋɔŋlɔdzesiwo alo automation ɖesiaɖe si nèzãna ƒe kɔpi ɖo ɖe duta.
* Kpɔ egbɔ be wò backups sɔ (e.g. le nɔnɔme bubu me la, dze agbagba nàʋu wo alo alé ŋku ɖe wo ŋu).
* Dzro JSON-RPC mɔnu siwo dzi nèle ŋu ɖom ɖo fifia la me.
* Tsɔe sɔ kple ɖoɖo si wowɔ be woawɔ ɖeka kple wo nɔewo ƒe kplɔ̃ si wolé be na le [Zcash ƒe kpekpeɖeŋunaƒe](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) 
* Dzra ɖo ɖe tɔtrɔwo alo mɔnu siwo bu ŋu (ɖewo ate ŋu ahiã be woakpɔ wo gbɔ alo atrɔ asi le wo ŋu).

**2. System ƒe Nudidiwo & Disk ƒe Teƒe**
* Kpɔ egbɔ be disk ƒe teƒe sɔ gbɔ na ye (Zcash chain lolo). Ne mede ɖeke o la, GB 10 ya teti ƒe disk ƒe teƒe si woate ŋu azã faa.
* Kpɔ egbɔ be wò mɔ̃a ƒe network, CPU, RAM li ke.
* Internet dzi kadodo aɖe 
* Ne èɖoe be yeaƒoe nu ƒu tso dzɔtsoƒe la, na nàda Rust & Cargo ɖe wò kɔmpiuta dzi.

**3. De / Ðoɖowɔwɔ Zebrad** .
Àte ŋu awɔ binary si wotu do ŋgɔ ƒe kɔpi alo atu tso dzɔtsoƒe.
* Zcash Foundation taa nusiwo woɖe ɖe go kple binaries na Zebra. E.g. àte ŋu azã install script alo awɔ binary si sɔ na wò OS la ƒe kɔpi.

* De dzesii be le Zebra ƒe tɔtrɔ yeye siwo wowɔ nyitsɔ laa me la, [RPC ƒe nuwuƒea megawɔa dɔ le gɔmedzedzea me le Docker me o.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Tiatia A: Dee to binary si wotu do ŋgɔ dzi** 
Le **Linux**/**macOS** dzi la:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2) .](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Esia dea zebrad ƒe tɔtrɔ yeyetɔ si li ke la wò kɔmpiuta dzi.

**Tiatia B: Tu tso dzɔtsoƒe**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3) .](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Ne ètu vɔ la, tsɔ binary la yi wò mɔ dzi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ʋuʋudedi 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Ðoɖowɔwɔ & Gɔmedzedze** 
Wɔ ɖoɖowɔɖi si woɖo ɖi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ʋuʋudedi2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Trɔ asi le **zebrad.toml** ŋu ɖe wò didiwo nu (se adrɛs, melidzeƒewo, nɔnɔme ƒe nuŋlɔɖi, caching).

**Dze node la gɔme:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![nɔnɔmetata](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Node la adze syncing gɔme tso genesis - kpɔ mɔ na gaƒoƒo geɖe (alo esi wu nenema) le hardware kple network nu.

**5. De / Ðoɖo Zallet (Gakotoku)**

Wotrɔ asi le Zallet ŋu be wòaɖɔli zcashd ƒe gakotoku ƒe akpa.

Kpɔ Zallet GitHub / release ƒe axaa ɖa hena binaries.

**Alo tu tso dzɔtsoƒe:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![nɔnɔmetata](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Dze GUI alo CLI gɔme (abe alesi wò ɖoɖowɔɖia na ene).
* Trɔ asi le eŋu be wòado ka kple wò teƒea ƒe Zebrad node to RPC alo API nuwuƒe dzi.

**6. Wò zcashd Gakotokua Tsɔtsɔ Va Zallet** 
To Private Key Dump dzi

Le zcashd dzi la, ɖo wò safui ɣaɣlawo ɖe duta:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4) .](/content-images/rJzgzwFagx-4a0874f250.svg)
</div>

* Le Zallet me la, tia Import Keys alo tiatia ma tɔgbe.
* Fia asi edzi ɖe **zcashd_keys.txt** dzi. 
* Ele be Zallet naɖe ZEC adrɛswo kple safui siwo do ƒome kplii me ahatsɔe ade eme.

**To Nuku ƒe Nyagbɔgblɔ dzi** (ne esɔ) .

* Ne wò gakotokua doa alɔ nuku ƒe kɔpi la, zã Gbugbɔ tso Nuku ƒe Nyagbe me le Zallet me.
* Nenye be wokpɔ wò zcashd gakotoku tso nuku aɖe me ko hafi esia wɔa dɔ (alo nuku ƒe tɔtrɔ le asiwò).

**Gakotoku Gbugbɔgawɔ & Ðekawɔwɔ**

* Ne wonya xɔ safuiawo ko la, Zallet aʋu kɔsɔkɔsɔa gbugbɔgakpɔ to Zebrad dzi.
* Na ɣeyiɣi aɖe Zallet be wòagbugbɔ wò ga si susɔ kple asitsatsa ŋutinya atu.

**7. Kpɔ Dadaɖeanyiwo Kple Sync** .

Ne wonya tsɔe vɛ ko la, Zallet aƒo ka na wò Zebrad node eye wòagbugbɔ akpɔ blockchain la.
Ne wowu nuwɔwɔ ɖekae nu la, ele be wò ga si susɔ kple wò asitsatsa nadze abe tsã ene pɛpɛpɛ.

Àte ŋu aɖo kpe wò node ƒe sync nɔnɔme dzi to duƒuƒu:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![nɔnɔmetata](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Alo lé ŋku ɖe nuŋlɔɖiwo ŋu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![nɔnɔmetata](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Kuxiwo gbɔ kpɔkpɔ**

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

**9. Nyanuwuwuw**

Ʋuʋu tso zcashd yi Zebrad kple Zallet naa Zcash nuteƒekpɔkpɔ si le kabakaba wu, si le dedie wu, eye wònye egbegbe tɔ.
Le Rust-dzi dedienɔnɔ, modular wɔwɔme, kple dɔwɔnu nyuitɔwo, ɖoɖo sia kpɔa egbɔ be wò node kple gakotoku gakpɔtɔ le dzadzraɖoɖi na etsɔme esi Zcash ecosystem yi edzi le tɔtrɔm.

Kpekpeɖeŋu: Na wò gakotoku ƒe safuiwo nanɔ Internet dzi eye nàwɔ wò Zallet nyatakakawo ƒe kɔpi edziedzi.
Yi [zebra.zfnd.org](https://zebra.zfnd.org) kple [zallet.zfnd.org](https://zallet.zfnd.org) hena nyatakaka yeyewo kple nutoa me tɔwo ƒe kpekpeɖeŋu.
