# Ntuziaka Mbugharị: Site na zcashd gaa Zebrad/Zallet

full node zcashd ọdịnala, nke *Electric Coin Company (ECC)* / *Zodl* na-elekọta, ejirila Zebra na Zallet dochie ya. zcashd ruru nkwụsị njedebe nkwado ya na 18 Julaị 2026, ọ naghịkwa arụ ọrụ ọzọ.

- Zebra bụ mmejuputa Rust ọgbara ọhụrụ nke protocol Zcash, nke Zcash Foundation mepụtara
- Zallet bụ e-akpa ego dị mfe e wuru iji soro node Zebra rụọ ọrụ nke ọma, nke Zodl mepụtara

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Ntuziaka a na-eduga gị n’ime mbugharị site na **zcashd** gaa na **Zebrad** na **Zallet**, tinyere nhazi, mbubata e-akpa ego, na idozi nsogbu mbugharị ndị a na-ahụkarị.

---

## zcashd kwụsịrị ịrụ ọrụ na 18 Julaị 2026

**Ihe nke a pụtara**

- zcashd ruru nkwụsị njedebe nkwado ya na 18 Julaị 2026. Ọ gaghị emekọrịta na njedebe chain ọzọ, ọ nweghịkwa ike izipu ma ọ bụ ịnata ego. Nke a emechaala; ebughị ya n’obi ime ya.
- Ọrụ abụọ nke zcashd ekewala ugbu a: **zebrad** bụ full node, ebe **Zallet** bụ e-akpa ego.
- Zallet nọ na **beta**. Mgbanwe ndị na-emebi ndakọrịta nwere ike ime n'etiti mwepụta, ma usoro JSON-RPC ụfọdụ nke zcashd emebeghị. Lelee [matriks ọkwa usoro](https://zcash.github.io/zallet/) tupu ịdabere na oku kpọmkwem.
- Ọ bụrụ na ị ka jidere ego **Sprout**, buru ụzọ gụọ ịdọ aka ná ntị dị na nzọụkwụ 6. Zallet anaghị akwado pool Sprout, ụzọ a na-emekarị isi bugharịa ego ndị ahụ chọrọ zcashd na-arụ ọrụ.

**Ihe Mere A Ga-eji Bugharịa - Karịa Ịkwụsị Ịkwado Ya**

Ọbụna ma e wezụga ịkwụsị nkwado, e nwere ezigbo ihe mere ị ga-eji bugharịa:
- Nchekwa & Ịkwụsi Ike: Nchekwa ebe nchekwa na ngwá ọrụ ọgbara ọhụrụ nke Rust na-ebelata ihe ize ndụ nke adịghị ike.
- Ọsọ & Ịrụ Ọrụ Nke Ọma: E mere Zebrad maka ịrụ ọtụtụ ọrụ n’otu oge, iji ihe onwunwe rụọ ọrụ nke ọma, na imekọrịta ngwa ngwa.
- Nhazi Modul: Ikewa mgbagha node (Zebrad) na UI e-akpa ego (Zallet) na-enye ókè doro anya na ụzọ ka mma isi kwalite.
- Ndakọrịta na Ecosystem Ọdịnihu: Ngwá ọrụ, mmelite, na akụkụ ndị ọzọ nke ecosystem Zcash ga na-elekwasị anya karịa na Zebrad/Zallet.
- Udo N’uche: Zere ịnọrapara n’iji akụkụ agwụla nkwado ya na nke anaghị akwadozi.

### Ugbu a, ka anyị banye n’ime ntuziaka Mbugharị

**1. Chekwaa Ihe Niile**
* Chekwaa wallet.dat gị (ma ọ bụ faịlụ e-akpa ego / ebe nchekwa igodo ọ bụla ọzọ) sitere na node zcashd gị.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Chekwaa zcash.conf gị na ntọala omenala ọ bụla.
* Bupụtakwa otu nke script RPC ọ bụla ma ọ bụ automation ị na-eji.
* Gosi na ihe ndabere gị ziri ezi (dịka ọmụmaatụ, n’ebe ọzọ, gbalịa imeghe ma ọ bụ nyochaa ha).
* Nyochaa usoro JSON-RPC ndị ị dabere na ha ugbu a.
* Tulee ha na tebụl ndakọrịta e zubere nke saịtị nkwado [Zcash na-elekọta](https://z.cash/support/zcashd-deprecation/) 
* Kwadebe maka mgbanwe ma ọ bụ usoro ndị na-adịghị (ụfọdụ nwere ike ịchọ ụzọ mgbagha ma ọ bụ mmegharị).

**2. Ihe Sistemụ Chọrọ & Oghere Disk**
* Oghere disk bụ ihe ndị mmadụ na-elegharakarị anya. chain Zcash gafere **270 GB** n’Ọgọọst 2026, ya mere hapụ opekata mpe **300 GB** nke oghere efu, na SSD ma ọ bụrụ na ị nwere ike.
* Hụ na igwe gị nwere netwọk kwụsiri ike, CPU, na RAM.
* Njikọ ịntanetị 
* Ọ bụrụ na ị na-eme atụmatụ ịchịkọta site na source, tinye Rust & Cargo.

**3. Wụnye / Hazie Zebrad**
Ị nwere ike ibudata binary arụnyerela ma ọ bụ wuo ya site na source.
* Zcash Foundation na-ebipụta mwepụta na binary maka Zebra. Dịka ọmụmaatụ, ị nwere ike iji script nrụnye ma ọ bụ budata binary dabara na OS gị.

* Rịba ama na n’ụdị Zebra ndị ọhụrụ, [anaghịzi agbanye endpoint RPC na ndabara na Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Nhọrọ A: Wụnye site na binary arụnyerela**  
Na **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Nke a na-etinye ụdị kwụsiri ike kacha ọhụrụ nke zebrad.

**Nhọrọ B: Wuo site na source**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Mgbe iwusịrị ya, bugharịa binary ahụ n’ime path gị:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Nhazi & Mmalite**  
Mepụta config ndabara:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Dezie **zebrad.toml** dịka mmasị gị siri dị (adresị ige ntị, ports, ndekọ ọnọdụ, caching).

**Malite node ahụ:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

node ahụ ga-amalite imekọrịta site na genesis — tụọ anya ọtụtụ awa (ma ọ bụ karịa) dabere na hardware na netwọk.

**5. Wụnye / Hazie Zallet (E-akpa ego)**

E mere Zallet iji dochie akụkụ e-akpa ego nke zcashd.

Lelee ibe Zallet GitHub / mwepụta maka binary.

**Ma ọ bụ wuo site na source:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Malite GUI ma ọ bụ CLI (dịka nrụnye gị si enye).
* Hazie ya ka ọ jikọọ na node Zebrad mpaghara gị site na endpoint RPC ma ọ bụ API.

**6. Ibugharị E-akpa ego zcashd Gị n’ime Zallet**

Ịchọghị zcashd na-arụ ọrụ maka nke a. Zallet na-agụ faịlụ `wallet.dat` ozugbo, nke dị mkpa ebe ọ bụ na zcashd enweghịzi ike ịmalite.

> **Debe `wallet.dat`.** Mbugharị ahụ na-akọ ihe ọ bụla ọ na-enweghị ike ịnọchite anya ya n’e-akpa ego Zallet kama ibubata ya, ihe igodo ahụ wee dị naanị na `wallet.dat`. Ehichapụla ya mgbe ị bugharịchara.

Buru ụzọ gbaa `zallet init-wallet-encryption`. Zallet na-ezobe ihe igodo site na identity age, identity ahụ aghaghị ịdị adị tupu e bubata igodo ọ bụla.

Mgbe ahụ, gbanwee config gị na e-akpa ego gị:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` dị naanị na builds nwere feature `zcashd-import`, ịgụkwa `wallet.dat` chọrọ utility `db_dump` sitere na Berkeley DB 6.2, ụdị zcashd ji. Ọ bụrụ na ị nwere karịa otu faịlụ e-akpa ego, gbaa iwu ahụ otu ugboro maka faịlụ ọ bụla ma tinye `--allow-multiple-wallet-imports` na oge ndị sochirinụ; nke ọ bụla ga-abụ setị akaụntụ nke ya. A naghị ebufe `rpcuser` na `rpcpassword` gị, n’ihi na JSON-RPC nke Zallet na-eji nyocha cookie na ndabara; tinye nzere site na `zallet add-rpc-user` ma ọ bụrụ na ịchọrọ ha.

**Ihe a na-ebufe**

* Mkpụrụ mnemonic na igodo sitere na ha, e megharịrị akaụntụ ka ha kwekọọ na e-akpa ego zcashd
* Igodo ego Sapling a bubatara iche na igodo Oha
* Ntinye nlele naanị Oha nke nwere igodo ọha ha ma ọ bụ redeem script
* Ụbọchị ọmụmụ akaụntụ, ka nyocha chain malite n’ogo ziri ezi

**Ihe anaghị ebufe.** A na-akọ ndị a ọnụ ọgụgụ ha kama ibubata ha:

* **Igodo ego Sprout na ego.** Zallet anaghị akwado pool Sprout. Ụzọ e dere bụ ibupụ ego Sprout site na iji zcashd tupu akwụsị ya, nke na-agaghịzi ekwe omume. Ọ bụrụ na nke a metụtara gị, jụọ na [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) ma ọ bụ [ọgbakọ obodo](https://forum.zcashcommunity.com/) tupu i mee ihe ọ bụla ọzọ.
* Ntinye akwụkwọ adresị
* Ntinye nlele naanị echekwara na-enweghị igodo ọha ma ọ bụ redeem script, na ntinye nwere igodo ọha a na-akpakọghị
* E-akpa ego Regtest

**Ime ndabere ma emechaa.** Mnemonic naanị ya abụghị ndabere zuru oke, n’ihi na igodo e bubatara dị naanị n’ime nchekwa data e-akpa ego. Debe otu echekwara nke `wallet.db`, faịlụ identity Nzobe ederede age nke nhọrọ `keystore.encryption_identity` kpọrọ aha, na ahịrịokwu mnemonic gị, ma debe `wallet.dat` mbụ ahụ. Rịba ama na `wallet.db` n’onwe ya ezobeghị: o nwere akụkọ Azụmahia gị na viewing key n’enweghị nzobe, ya mere chekwaa ndabere ahụ n’ebe nchekwa.

**Nyocha Ọzọ E-akpa ego & Mmekọrịta**

* Ozugbo ebubatara igodo, Zallet ga-amalite nyocha ọzọ nke chain site na Zebrad.
* Kwe ka Zallet nweta oge iji wughachi nguzozi gị na akụkọ Azụmahia gị.

**7. Nyochaa Nguzozi na Mmekọrịta**

Ozugbo e bubatara ha, Zallet ga-ejikọta na node Zebrad gị ma nyochaa blockchain ọzọ.
Mgbe mmekọrịta mechara, nguzozi na Azụmahia gị kwesịrị ịpụta kpọmkwem dịka ha dị na mbụ.

Ị nwere ike nyochaa ọkwa mmekọrịta node gị site n’ịgba:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Ma ọ bụ lelee logs.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Idozi Nsogbu**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Nsogbu</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Ihe Nwere Ike Ịkpata Ya</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Ngwọta</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad anaghị amalite</td>
        <td className="px-6 py-4">Port ji ọrụ ma ọ bụ config adịghị mma</td>
        <td className="px-6 py-4">Lelee **zebrad.toml** ma jiri port efu</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Mmekọrịta nwayọọ</td>
        <td className="px-6 py-4">Mkpọchi netwọk</td>
        <td className="px-6 py-4">Hụ na ịntanetị kwụsiri ike, malitegharịa Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">E-akpa ego enweghị Azụmahia ụfọdụ</td>
        <td className="px-6 py-4">Mbubata igodo ezughị ezu</td>
        <td className="px-6 py-4">Bubata igodo ọzọ ma ọ bụ nyochaa ọzọ na Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet enweghị ike ijikọta na node</td>
        <td className="px-6 py-4">Node anaghị arụ ọrụ ma ọ bụ endpoint ezighi ezi</td>
        <td className="px-6 py-4">Malite Zebrad ma gosi port RPC ziri ezi</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet na-akwụsị ọrụ</td>
        <td className="px-6 py-4">Build ochie</td>
        <td className="px-6 py-4">Melite gaa na mwepụta kacha ọhụrụ sitere na GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Mmechi**

Ibugharị site na zcashd gaa na Zebrad na Zallet na-enye gị ahụmịhe Zcash ngwa ngwa, nchekwa, na nke ọgbara ọhụrụ.
Site na nchekwa dabere na Rust, nhazi modul, na ngwá ọrụ ka mma, nhazi a na-ahụ na node na e-akpa ego gị dị njikere maka ọdịnihu ka ecosystem Zcash na-aga n’ihu na-etolite.

Ndụmọdụ: Debe igodo e-akpa ego gị na-enweghị ịntanetị ma na-eme ndabere data Zallet gị mgbe niile.
Gaa na [zebra.zfnd.org](https://zebra.zfnd.org) maka Zebra, na [Akwụkwọ Zallet](https://zcash.github.io/zallet/) ma ọ bụ repository [Zallet](https://github.com/zcash/zallet) maka Zallet. Isiakwụkwọ [Ibugharị site na zcashd](https://zcash.github.io/zallet/) nke Akwụkwọ Zallet bụ ebe ntụaka ikike maka nzọụkwụ 6.
