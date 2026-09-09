# Ʋuʋu ƒe Mɔfiame: Tso zcashd dzi yi Zebrad/Zallet dzi

Wotsɔ Zebra kple Zallet ɖɔ li zcashd blibo node si wozãna tsã, si *Electric Coin Company (ECC)* / *Zodl* léa be na. zcashd ɖo eƒe kpekpeɖeŋunana ƒe nuwuwu le 18 July 2026 dzi eye megale dɔ wɔm o.

- Zebra nye egbegbe Rust ƒe Zcash ɖoɖowɔɖi si Zcash Foundation wɔ la ƒe dɔwɔwɔ
- Zallet nye gakotoku si le bɔbɔe si wotu be wòawɔ ɖeka kple Zebra nodes siwo Zodl to vɛ la nyuie

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Mɔfiame sia kplɔ wò to ʋuʋu tso **Zcashd** yi **Zebrad** kple **Zallet** me, si me ɖoɖowɔwɔ, gakotoku ƒe tsɔtsɔ yi, kple ʋuʋu ƒe kuxi siwo bɔ gbɔ kpɔkpɔ hã le.

---

## zcashd dzudzɔ duƒuƒu le 18 July 2026 dzi

**Nusi esia fia**

- zcashd ɖo eƒe kpekpeɖeŋunana ƒe nuwuwu le 18 July 2026. Magawɔ ɖeka kple kɔsɔkɔsɔa ƒe nugbɔ ake o, eye mate ŋu aɖo ga alo axɔe o. Esia wu enu, ke menye ɖoɖoe o.
- zcashd ƒe dɔ eveawo ma fifia: **zebrad** nye node bliboa, eye **Zallet** nye gakotoku.
- Zallet le **beta** me. Tɔtrɔ siwo gblẽ ateŋu adzɔ le asiɖeɖe le wo ŋu dome, eye womewɔ zcashd JSON-RPC mɔnu aɖewo haɖe o. Kpɔe ɖa be [mɔnu ƒe nɔnɔme matriki](https://zcash.github.io/zallet/) hafi nànɔ te ɖe kaƒoƒo aɖe koŋ dzi.
- Ne ègalé **Sprout** ga ɖe asi la, xlẽ nuxlɔ̃ame si le afɔɖeɖe 6 lia me gbã. Zallet medoa alɔ Sprout ƒe ta la o, eye mɔ si dzi woato aʋu ga mawo zi geɖe la bia be woawɔ zcashd si le du dzi.

**Nukatae Woaʋu - Beyond Deprecation**

Ne míeɖe asi le ameŋugblẽnyawo ŋu gɔ̃ hã la, susu sẽŋuwo li siwo tae wòle be míaʋu:
- Dedienɔnɔ & Sesẽme: Rust ƒe ŋkuɖodzinu-dedienɔnɔ kple egbegbe dɔwɔnuwo ɖea afɔku siwo le afɔkuwo me dzi kpɔtɔna.
- Dɔwɔwɔ & Dɔwɔwɔ Nyuie: Wotrɔ asi le Zebrad ŋu na parallelism, nunɔamesiwo zazã nyuie wu, kple sync kabakaba wu.
- Modular Architecture: Node logic (Zebrad) mama tso gakotoku UI (Zallet) gbɔ naa liƒo siwo me kɔ wu kple ŋgɔyiyimɔ nyuitɔwo.
- Etsɔme ƒe lãwo ƒe agbenɔnɔ ƒe ɖekawɔwɔ: Dɔwɔnuwo, ŋgɔyiyiwo, kple Zcash ƒe lãwo ƒe agbenɔnɔ ƒe akpa mamlɛa aɖo taɖodzinu na Zebrad/Zallet geɖe wu.
- Susu ƒe Ŋutifafa: Ƒo asa na be nàtsi akpa aɖe si megahiã o, si ŋu womedo alɔe o la dzi.

### Azɔ mina míage ɖe Ʋuʋu ƒe mɔfiamegbalẽa me

**1. Backup Nusianu**
* Wɔ wò wallet.dat (alo gakotoku ƒe faɛl / safuidzraƒe bubu ɖesiaɖe) ƒe kɔpi tso wò zcashd node me.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Dzra wò zcash.conf kple ɖoɖo ɖesiaɖe si nèwɔ ɖe ɖoɖo nu ɖo.
* Tsɔ RPC ŋɔŋlɔdzesiwo alo automation ɖesiaɖe si nèzãna ƒe kɔpi ɖo ɖe duta.
* Kpɔ egbɔ be wò backups sɔ (e.g. le nɔnɔme bubu me la, dze agbagba nàʋu wo alo alé ŋku ɖe wo ŋu).
* Dzro JSON-RPC mɔnu siwo dzi nèle ŋu ɖom ɖo fifia la me.
* Tsɔe sɔ kple ɖoɖowɔɖi ƒe kplɔ̃ si dzi wolé be na le [Zcash ƒe kpekpeɖeŋunaƒe](https://z.cash/support/zcashd-deprecation/) 
* Dzra ɖo ɖe tɔtrɔwo alo mɔnu siwo bu ŋu (ɖewo ate ŋu ahiã be woakpɔ wo gbɔ alo atrɔ asi le wo ŋu).

**2. System ƒe Nudidiwo & Disk ƒe Teƒe**
* Disk ƒe teƒee nye nudidi si amewo bua nu tsɛe. Zcash kɔsɔkɔsɔa to **270 GB** le August 2026 me, eyata ɖe mɔ na **300 GB** ya teti ƒe teƒe faa, le SSD dzi ne àte ŋui.
* Kpɔ egbɔ be wò mɔ̃a ƒe network, CPU, RAM li ke.
* Internet dzi kadodo aɖe 
* Ne èɖoe be yeaƒoe nu ƒu tso dzɔtsoƒe la, na woatsɔ Rust & Cargo ade eme.

**3. De / Ðoɖowɔwɔ Zebrad** .
Àte ŋu awɔ binary si wotu do ŋgɔ ƒe kɔpi alo atu tso dzɔtsoƒe.
* Zcash Foundation taa nusiwo woɖe ɖe go kple binaries na Zebra. E.g. àte ŋu azã install script alo awɔ binary si sɔ na wò OS la ƒe kɔpi.

* De dzesii be le Zebra ƒe tata siwo wota nyitsɔ laa me la, . [RPC ƒe nuwuƒea megale dɔ wɔm le gɔmedzedzea me le Docker me o.](https://zfnd.org/zebra-2-3-0-release/)

**Tiatia A: Dee to binary si wotu do ŋgɔ dzi** 
Le **Linux**/**macOS** dzi la:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Esia dea zebrad ƒe tɔtrɔ yeyetɔ si li ke la wò kɔmpiuta dzi.

**Tiatia B: Tu tso dzɔtsoƒe**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Ne ètu vɔ la, tsɔ binary la yi wò mɔ dzi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Ðoɖowɔwɔ & Gɔmedzedze** 
Wɔ ɖoɖowɔɖi si woɖo ɖi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Trɔ asi le **zebrad.toml** ŋu ɖe wò didiwo nu (se adrɛs, melidzeƒewo, nɔnɔme ƒe nuŋlɔɖi, caching).

**Dze node la gɔme:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Node la adze syncing gɔme tso genesis - kpɔ mɔ na gaƒoƒo geɖe (alo esi wu nenema) le hardware kple network nu.

**5. De / Ðoɖo Zallet (Gakotoku)**

Wotrɔ asi le Zallet ŋu be wòaɖɔli zcashd ƒe gakotoku ƒe akpa.

Kpɔ Zallet GitHub / release ƒe axaa ɖa hena binaries.

**Alo tu tso dzɔtsoƒe:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Dze GUI alo CLI gɔme (abe alesi wò ɖoɖowɔɖia na ene).
* Trɔ asi le eŋu be wòado ka kple wò teƒea ƒe Zebrad node to RPC alo API nuwuƒe dzi.

**6. Wò zcashd Gakotokua Tsɔtsɔ Va Zallet**

Miehiã zcashd si le du dzi na esia o. Zallet xlẽa nya sia `wallet.dat` file tẽ, si le vevie elabena womate ŋu adze zcashd gɔme o.

> **Le aɖe asi `wallet.dat`.** Ʋuʋua ka nya ta tso nusianu si mateŋu atsi tre ɖi na le Zallet gakotoku me tsɔ wu be wòatsɔe avae, eye emegbe nu vevi ma nɔa anyi le `wallet.dat`. Mègatutui le ʋuʋu vɔ megbe o.

Ƒu du `zallet init-wallet-encryption` gbã. Zallet tsɔa nya veviwo ɣlana ɖe ƒexɔxɔ ƒe dzesidenu aɖe me, eye ele be dzesidenu ma nanɔ anyi hafi woatsɔ safui aɖeke avae.

Emegbe trɔ wò config kple wò gakotokua:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` le xɔ siwo wotu kple la me ko `zcashd-import` feature, kple nuxexlẽ `wallet.dat` hiã na `db_dump` utility tso Berkeley DB 6.2, si nye tɔtrɔ si zcashd zã. Ne gakotoku ƒe faɛl wu ɖeka le asiwò la, wɔ sededea zi ɖeka le faɛl ɖesiaɖe me eye nàtsɔe akpe ɖe eŋu `--allow-multiple-wallet-imports` le duƒuƒu siwo va emegbe dzi; wo dometɔ ɖesiaɖe va zua eya ŋutɔ ƒe akɔntabubuwo. Wò `rpcuser` kple `rpcpassword` wometsɔa wo yia edzi o, elabena Zallet ƒe JSON-RPC zãa cookie ƒe kpeɖodzinana le gɔmedzedzea me; tsɔ ɖaseɖigbalẽwo kpee kple `zallet add-rpc-user` ne èhiã wo.

**Nusi va dzea ŋgɔ**

* Mnemonic nukuwo kple safui siwo wokpɔ tso wo me, kple akɔntabubu siwo wogbugbɔ tu be woasɔ kple zcashd gakotokua
* Standalone tsɔ Sapling gazazã ƒe safuiwo kple safui siwo me kɔ la tso duta vɛ
* Dzesi siwo me kɔ siwo woate ŋu akpɔ le gakpɔkpɔ ɖeɖeko me siwo me woƒe dutoƒo safui alo redeem script le
* Akɔntabubu dzigbezãwo, eyata kɔsɔkɔsɔ scanning dzea egɔme tso kɔkɔƒe nyuitɔ

**Nusi meva dze o.** Wotsɔa xexlẽdzesiwo ka nya ta le esiawo ŋu tsɔ wu be woatsɔ wo tso duta vɛ:

* **Sprout gazazã ƒe safuiwo kple ga.** Zallet medoa alɔ Sprout ƒe ta o. Mɔ si woŋlɔ ɖi enye be woaɖe Sprout ƒe ga ado goe to zcashd zazã me hafi axɔ dzudzɔ le dɔ me, eye ema megate ŋu dzɔna o. Ne esia kpɔ ŋusẽ ɖe dziwò la, bia le... [Zcash Numekuku Kple Dɔwɔnawo ƒe Masɔmasɔ](https://discord.gg/xpzPR53xtU) alo be [nutoa me ƒe nyamedzroƒe](https://forum.zcashcommunity.com/) hafi awɔ nu bubu aɖe.
* Adrɛsgbalẽa me nyawo
* Watch-only nuŋɔŋlɔ siwo wodzra ɖo dutoƒo safui alo redeem script manɔmee, kple nya siwo me dutoƒo safui siwo womeƒo o
* Regtest gakotokuwo kpɔ

**Backing up afterwards.** Mnemonic le eɖokui si menye backup blibo o, elabena safui siwo wotsɔ tso duta vɛ la le gakotoku ƒe nyatakakadzraɖoƒea ko. Dzra eƒe kɔpiwo ɖo dedie `wallet.db`, ƒexɔxɔ ƒe nya ɣaɣla ƒe dzesidegbalẽvi si wotsɔ ŋkɔ na `keystore.encryption_identity` tiatia, kple wò ŋkuɖodzinyagbɔgblɔ, eye nàlé gbãtɔa ɖe asi `wallet.dat`. De dzesii be `wallet.db` menye eya ŋutɔe wotsɔ nya ɣaɣlawo ŋlɔe o: eléa wò asitsatsa ŋutinya kple nukpɔkpɔ ƒe safuiwo ɖe eme kɔ, eyata dzra backup la ɖo ɖe teƒe aɖe si le dedie.

**Gakotoku Gbugbɔgawɔ & Ðekawɔwɔ**

* Ne wonya xɔ safuiawo ko la, Zallet aʋu kɔsɔkɔsɔa gbugbɔgakpɔ to Zebrad dzi.
* Na ɣeyiɣi aɖe Zallet be wòagbugbɔ wò ga si susɔ kple asitsatsa ŋutinya atu.

**7. Kpɔ Dadaɖeanyiwo Kple Sync** .

Ne wonya tsɔe vɛ ko la, Zallet aƒo ka na wò Zebrad node eye wòagbugbɔ akpɔ blockchain la.
Ne wowu nuwɔwɔ ɖekae nu la, ele be wò ga si susɔ kple wò asitsatsa nadze abe tsã ene pɛpɛpɛ.

Àte ŋu aɖo kpe wò node ƒe sync nɔnɔme dzi to duƒuƒu:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Alo lé ŋku ɖe nuŋlɔɖiwo ŋu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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
Le Rust-dzi dedienɔnɔ, modular wɔwɔme, kple dɔwɔnu nyuitɔwo, ɖoɖo sia kpɔa egbɔ be wò node kple gakotoku gakpɔtɔ le dzadzraɖoɖi na etsɔme esime Zcash ecosystem yi edzi le tɔtrɔm.

Kpekpeɖeŋu: Na wò gakotoku ƒe safuiwo nanɔ Internet dzi eye nàwɔ wò Zallet nyatakakawo ƒe kɔpi edziedzi.
Sasrã [zebra.zfnd.org ƒe nyatakakadzraɖoƒea](https://zebra.zfnd.org) na Zebra, kple [Zallet ƒe Agbalẽa](https://zcash.github.io/zallet/) alo be [Zallet ƒe nudzraɖoƒe](https://github.com/zcash/zallet) na Zallet. The [Ʋuʋu tso zcashd](https://zcash.github.io/zallet/) ta si le The Zallet Book mee nye afɔɖeɖe 6 lia ƒe numekugbalẽ si ŋu ŋusẽ le.
