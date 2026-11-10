# Ɖeɖe mɔfia: Tso zcashd yi Zebrad/Zallet

Nusi wɔna tsã zcashd ɣaɣla dzesi ŋɔŋlɔ blibo [full node], si *Electric Coin Company (ECC)* / *Zodl* kpɔa dzi la, Zebra kple Zallet wɔ ɖe eteƒe. zcashd ƒe kpekpeɖeŋu ƒe nuwuwu va 18 July 2026, eye wòmegale dɔ wɔm o.

- Zebra nye Rust ƒe ɖeɖeɖoɖo yeye si wɔ Zcash ƒe mɔɖoɖo, si Zcash Foundation wɔ
- Zallet nye gakotoku [wallet] fafã si wotu be wòawɔ dɔ kple Zebra ƒe ɣaɣla dzesi ŋɔŋlɔwo hãlii, si Zodl wɔ

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Mɔfia sia akplɔ wò to ɖeɖe tso **zcashd** yi **Zebrad** kple **Zallet** me, eye wòaxɔ ɖoɖo, gakotoku ƒe kpekpeɖeŋu, kple ɖeɖe na ɖeɖe ƒe kuxi siwo dzɔna zi geɖe.

---

## zcashd tɔ dɔwɔwɔ le 18 July 2026

**Nusi esia fia**

- zcashd ƒe kpekpeɖeŋu ƒe nuwuwu va le 18 July 2026. Wòmagale asɔ ɖo ɖoɖonu [chain] ƒe dzogbe o, eye wòmate ŋu aɖo ga alo axɔ ga o. Esia wu vavã, menye nu si wole ɖoɖom be woawɔ o.
- zcashd ƒe dɔ eve la mama ƒe te: **zebrad** nye ɣaɣla dzesi ŋɔŋlɔ blibo, eye **Zallet** nye gakotoku.
- Zallet le **beta** me. Tso ɖeɖe aɖe me yi bubu me la, tɔtrɔ siwo gbãa nu ate ŋu ava, eye zcashd ƒe JSON-RPC mɔnu aɖewo mede bɔ o haɖe. Kpɔ [mɔnu ƒe nɔnɔ ƒe kpekpeɖeŋu ƒe kɔkɔe](https://zcash.github.io/zallet/) hafi nàtsɔ yɔyɔ aɖe si tututu na wò.
- Ne **Sprout** ƒe ga le asiwo haɖe la, xlẽ nyagblɔɖi si le afɔ 6 me gbã. Zallet mekplɔa Sprout gaƒuƒoƒo [pool] o, eye mɔ si woɖua zi geɖe be woatsɔ ga mawo ayi la bia be zcashd nanɔ dɔ wɔm.

**Nu ka ta wòawɔ ɖeɖe - Le Ɖeɖeɖeƒeƒe wu**

Ne míede ɖeɖeɖeƒeƒe ɖa la gɔ̃ hã, tata siwo sesẽ le eŋu be wòatso ayi:
- Dedie Kple Sesẽ: Rust ƒe ŋkuɖododze ɖe memory dedie kple dɔwɔnu yeye woaɖe afɔ le kuxi ƒe mɔwo ŋu.
- Wɔwɔ Nyui Kple Dzedze: Woɖo Zebrad ɖeɖeɖe be wòawɔ dɔ geɖe ɖe ƒeɖeɖe me, wòatsɔ nu siwo le asi nɛ awɔ dɔ nyuie, eye wòawɔ sync kabakaba.
- Ɖoɖoƒe Ƒe Nɔnɔ Ƒe Mama: Ɖeɖe ɣaɣla dzesi ŋɔŋlɔ ƒe dɔ (Zebrad) tso gakotoku ƒe UI (Zallet) gbɔ na dzidzime ƒe towo kɔ nyuie eye wòana mɔ nyuie na ɖeɖe.
- Mɔ Si Ɖo Kple Ecosystem Ƒe Mawuɖoɖo: Dɔwɔnu, nyonyo, kple Zcash ƒe ecosystem ƒe akpa bubuwo aɖe ŋku ɖe Zebrad/Zallet ŋu geɖe.
- Dziɖoɖo: Mègaxɔ mɔ be nàle component si woɖe ɖa eye womakplɔa dzi o ƒe dɔwɔwɔ me o.

### Azɔ míayi ɖe Ɖeɖe mɔfia me

**1. Wɔ backup na nu sia nu**
* Wɔ backup na wò wallet.dat (alo gakotoku ƒe faɛl bubu aɖe / safui ƒe nudzraɖoƒe) tso wò zcashd ƒe ɣaɣla dzesi ŋɔŋlɔ me.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Dzra wò zcash.conf kple ɖoɖo siwo nèwɔ ɖe wò ŋutɔ ŋu ɖo.
* Ɖe RPC script alo automation si nètsɔna ƒe kopi aɖe ɖa.
* Kpɔ be wò backupwo le nyuie (kpɔe le nɔnɔ bubu aɖe me, abe be nàte ŋu aʋu alo akpɔ wo me ene).
* Kpɔ JSON-RPC mɔnu siwo nèle tsɔm fifia.
* Sɔ kple mɔɖoɖo ƒe kpekpeɖeŋu si [Zcash ƒe kpekpeɖeŋu ƒe asiti](https://z.cash/support/zcashd-deprecation/) dzra ɖo  
* Dzra ɖo na tɔtrɔwo alo mɔnu siwo mele o (aɖewo ate ŋu ahia mɔ bubu alo trɔtrɔ).

**2. System ƒe Hiãhiãwo Kple Disk Ƒe Teƒe**
* Disk ƒe teƒe nye hiãhiã si amewo mekɔna ɖe eŋu o. Zcash ƒe ɖoɖonu va le **270 GB** wu le August 2026 me, eyata na teƒe blibo **300 GB** le asiwo, le SSD dzi ne nàte ŋu.
* Kpɔ be network, CPU, kple RAM si le wò mɔkeke dzi la le sesĩe.
* Internet ƒe kadodo aɖe 
* Ne èɖo ɖe edzi be yòawɔ compilation tso source me la, na Rust kple Cargo nanɔ asiwo.

**3. Ɖo / Ɖoɖo Zebrad**
Àte ŋu aɖe binary si woɖo ɖo xoxo alo nawɔe tso source me.
* Zcash Foundation dea releases kple binaries ɖe go na Zebra. Abe kpɔɖeŋu ene la, àte ŋu atsɔ install script alo aɖe binary si dze wò OS ŋu.

* Ɖo ŋku edzi be le Zebra ƒe versions yeyewo me la, [RPC endpoint la mele enabled le Docker me le gɔmedzedze o.](https://zfnd.org/zebra-2-3-0-release/)

**Mɔ A: Ɖo to binary si woɖo ɖo xoxo me**  
Le **Linux**/**macOS** dzi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Esia doa zebrad ƒe version sesẽ si yeyee ɖe mɔ.

**Mɔ B: Wɔe tso source me**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Le wɔwɔ megbe la, tsɔ binary la de wò path me:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Ɖoɖo Kple Dɔ Ƒe Gɔmedzedze**  
Wɔ config si le gɔmedzedze ɖe mɔ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Trɔ **zebrad.toml** ɖe wò dɔmenyui nu (mɔ si wòasẽ to, ports, state ƒe teƒe, caching).

**Dze ɣaɣla dzesi ŋɔŋlɔ la gɔme:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Ɣaɣla dzesi ŋɔŋlɔ la adze sync wɔwɔ gɔme tso genesis me - eƒe wɔwɔ ate ŋu axɔ gaƒoƒo geɖe (alo wu nenema) le hardware kple network nu.

**5. Ɖo / Ɖoɖo Zallet (Gakotoku)**

Zallet wotu be wòaxɔ zcashd ƒe gakotoku ƒe akpa ƒe teƒe.

Kpɔ Zallet ƒe GitHub / release axa na binaries.

**Alo wɔe tso source me:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Dze GUI alo CLI gɔme (abe ale si wò ƒe ɖoɖo na wɔm ene).
* Ɖoɖoe be wòakado ɖe wò Zebrad ƒe ɣaɣla dzesi ŋɔŋlɔ si le afi sia to RPC alo API endpoint me.

**6. Ɖe Wò zcashd ƒe Gakotoku Ɖe Zallet Me**

Mèhia zcashd si le dɔ wɔm o na esia. Zallet xlea `wallet.dat` faɛl la tẽ, si le vevie elabena zcashd magate ŋu adze gɔme o.

> **Dzra `wallet.dat` ɖo.** Ɖeɖe la aɖe nya si wòmate ŋu aɖo le Zallet ƒe gakotoku me la afia, le esime wòmaɖee me o, eye safui ƒe nu mawo anɔ `wallet.dat` me ɖeɖeka. Mègbugbɔ tutui le ɖeɖe megbe o.

Wɔ `zallet init-wallet-encryption` gbã. Zallet tsɔ age identity ɣaɣlaŋlɔŋlɔa safui ƒe nuwo, eye identity ma nanɔ anyi hafi woaɖe safui aɖeke aɖo eme.

Emegbe la, trɔ wò config kple wò gakotoku:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` le builds siwo me `zcashd-import` feature le ko, eye `wallet.dat` ƒe xexlẽ bia `db_dump` dɔwɔnu tso Berkeley DB 6.2 me, si nye version si zcashd tsɔ. Ne gakotoku ƒe faɛl geɖe le asiwo la, wɔ command la ɖeka ɖeka na faɛl siawo, eye de `--allow-multiple-wallet-imports` le wɔwɔ mamlɛtɔwo me; ɖeka sia ɖeka azu accounts ƒe ha ɖeɖeka. Wò `rpcuser` kple `rpcpassword` mele vɛm o, elabena Zallet ƒe JSON-RPC tsɔa cookie authentication le gɔmedzedze; de credentials kple `zallet add-rpc-user` ne èhia wo.

**Nusi vɛna**

* Mnemonic ƒe seedwo kple safui siwo wodze tso wo me, eye woagbugbɔ atu accounts la be wòasɔ kple zcashd ƒe gakotoku
* Sapling ƒe gazazãsafui siwo wotsɔ va ɖe eŋu ɖeɖeka kple transparent ƒe safuiwo
* Transparent ƒe nukpɔsafui ƒe entries siwo me public key alo redeem script le
* Account birthdays, ale be ɖoɖonu ƒe scanning nadze gɔme le height si dze

**Nusi mevɛ o.** Woafia esiawo kple xexlẽƒe, menye be woaɖe wo aɖo me o:

* **Sprout ƒe gazazãsafuiwo kple ga.** Zallet mekplɔa Sprout gaƒuƒoƒo o. Mɔ si woɖe fia la nye be woatsɔ Sprout ƒe ga aɖe tso eme kple zcashd hafi woaɖe eɖa, eye esia megate ŋu awɔ o azɔ. Ne esia ku ɖe wò ŋu la, bia nya le [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) alo le [community forum](https://forum.zcashcommunity.com/) hafi nàwɔ nu bubu aɖeke.
* Gaɖoƒe ƒe dzesi ƒe agbalẽ ƒe entries
* Nukpɔsafui ƒe entries siwo wodzra ɖo manɔ public key alo redeem script o, kple entries siwo me public key si womecompress o le
* Regtest ƒe gakotokuwɔwo

**Backup wɔwɔ le megbe.** Mnemonic ɖeka mewɔa backup blibo o, elabena safui siwo wotsɔ va ɖe eŋu la le gakotoku ƒe database me ɖeɖeka. Dzra kopi dedie siwo le `wallet.db`, age ɣaɣlaŋlɔŋlɔ ƒe identity faɛl si `keystore.encryption_identity` ƒe option la ƒo ŋkɔ na, kple wò mnemonic ƒe nyagbalẽ la ɖo, eye dzra `wallet.dat` si le gɔmedzedze la hã ɖo. Ɖo ŋku edzi be `wallet.db` ŋutɔ menye ɣaɣlaŋlɔŋlɔ nane o: gaɖoɖo ƒe ŋutinya kple nukpɔsafuiwo le eme kɔ, eyata dzra backup la ɖo le afi dedie aɖe.

**Gakotoku ƒe Rescan Kple Synchronization**

* Ne woɖe safuiwo ɖo me vɔ la, Zallet adze ɖoɖonu ƒe rescan gɔme to Zebrad me.
* Na ɣeyiɣi aɖe na Zallet be wòagbugbɔ atu wò balance kple gaɖoɖo ƒe ŋutinya.

**7. Kpɔ Balances Kple Sync Ƒe Nyateƒe**

Ne woɖe wo ɖo me vɔ la, Zallet akado ɖe wò Zebrad ƒe ɣaɣla dzesi ŋɔŋlɔ dzi eye wòawɔ blockchain ƒe rescan.
Ne synchronization wu la, wò balancewo kple gaɖoɖowo anɔ afi ma ke abe tsã ene.

Àte ŋu akpɔ wò ɣaɣla dzesi ŋɔŋlɔ ƒe sync ƒe nɔnɔ ƒe nyateƒe to esia wɔwɔ me:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Alo kpɔ logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Kuxi Ƒe Ɖeɖe**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Kuxi</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Nu Si Ate Ŋu Anye Eƒe Ta</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Ɖeɖe</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad mate ŋu adze gɔme o</td>
        <td className="px-6 py-4">Wole port la tsɔm alo config la menyo o</td>
        <td className="px-6 py-4">Kpɔ **zebrad.toml** eye tsɔ port si wɔa dɔ o</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sync blewu</td>
        <td className="px-6 py-4">Network ƒe ƒoƒoɖoƒo</td>
        <td className="px-6 py-4">Kpɔ be internet la le sesĩe, gbugbɔ dze Zebrad gɔme</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Gaɖoɖo aɖewo mele gakotoku me o</td>
        <td className="px-6 py-4">Safui ƒe ɖeɖe si meblibo o</td>
        <td className="px-6 py-4">Ɖe safuiwo ɖo eme ake alo wɔ rescan le Zallet me</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet mate ŋu akado ɖe ɣaɣla dzesi ŋɔŋlɔ la dzi o</td>
        <td className="px-6 py-4">Ɣaɣla dzesi ŋɔŋlɔ la mele dɔ wɔm o alo endpoint la menyo o</td>
        <td className="px-6 py-4">Dze Zebrad gɔme eye kpɔ be RPC port si le eteƒe la sɔ</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet dzra</td>
        <td className="px-6 py-4">Build xoxo</td>
        <td className="px-6 py-4">Yɔ ɖe release si yeyee tso GitHub gbɔ</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Nuwuwu**

Ɖeɖe tso zcashd yi Zebrad kple Zallet na wò Zcash ƒe nunya si kabakaba, le dedie, eye yeyee wu.
Kple dedie si tso Rust me, ɖoɖo si mama, kple dɔwɔnu nyuitɔwo, ɖoɖo sia ana wò ɣaɣla dzesi ŋɔŋlɔ kple gakotoku nanɔ ŋgɔ ɖo le etsɔme, le esime Zcash ƒe ecosystem gale ɖeɖem.

Nuxlɔ̃ame: Dzra wò gakotoku ƒe safuiwo ɖo le internet me o, eye wɔ backup na wò Zallet ƒe data zi sia zi.
Yi [zebra.zfnd.org](https://zebra.zfnd.org) na Zebra, eye yi [The Zallet Book](https://zcash.github.io/zallet/) alo [Zallet repository](https://github.com/zcash/zallet) na Zallet. The [Migrating from zcashd](https://zcash.github.io/zallet/) ƒe ta le The Zallet Book me nye mɔɖoɖo si le dziɖuɖu na afɔ 6.
