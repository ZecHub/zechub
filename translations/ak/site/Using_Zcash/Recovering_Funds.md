<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Fund Recovery (Ɔkwampa a wobɛtumi de agye sika)

** Dɛn nti na ɛsɛ sɛ w'ani gye nneɛma a woasan anya no ho?**

Seeds, spending keys, viewing keys ne wallet files no ntumi nsesa. A seed phrase betumi ama wͻn anya wallet keys ma wallets bebree, nanso ɛntumi nsiesie ͻha biara anaa wallet file a εwᴐ mu dada nyinaa. Wͻbεyεε hwεfo kyinie bε tumi da adwuma bi adi na mmom wontumi mma kwan mmfa sika nni dwuma.

Agyede no gyina sika a woagye ne kwan pa a wode kɔma wɔn na ama wɔanya sika no. Ma nneɛma a w'atwe no ho adane kokoam, mfa nkwammoaa anaa wallet faesɛ obi biara a wunni mu ahotosoɔ nka bi da.

# Ahotɔ ne Asɛyɛde

It is crucial for users to understand the risks involved in dealing with private keys and to keep these keys protected from unauthorized access. The security of funds depends on the user's responsibility to safeguard their private keys.

## Legacy shielded funds: Sprout, Sapling and Orchard

Ɛho hia sɛ wɔde ZEC a wɔabɔ ho ban dada no sesa mu ma ɛyɛ ɔsan fa.Ɛnam kwan so na ɛbɛgyina baabi a wɔn akorae bi hyɛ ne nsa seesei de sika no sie hɔ.

> ** NU7 yɛ nhyehyɛe ma November 5, 2026.** Sɛ ɛyɛ adwuma a, mprenpren akwantuo no fi Sprout pool dedaw mu bɛ gyae adwumayɛ.
>
> Sɛ w'anya ZEC wɔ Sprout no mu a, fa di dwuma ansa na woayi no. Woyɛ saa wie a, nnwinnade bi ntumi mfa sika nkɔ Sapling so bio, anaa baabi foforo biara.
>
> Sɛ worehwɛ saa kratafa yi akyi a NU7 ayɛ adwuma no, *Sprout yɛ nea wɔayi asi hɔ ama ne ho so de kosi sɛ daakye ɔkwan bi bɛsɔ mu bio. Ɛnnso wɔnhwɛ kwan seesei.

## Mmuae no wɔ kratafa biako mu.

Wo sika no wɔ akwantuo kwan so. Deɛ ɛsɛsɛ woyɛ: Wode wo ho hyɛ agyapadeɛ a w'atumi de adi dwuma mu, na wode to hɔ ma wɔn sɛ wɔmfa nyɛ adwuma bio.
| --- | --- | --- |
**Sprout**. **Spout → Sapling → Ironwood** Sɛ wowɔ bi a, fa wo ho ma no na yɛ saa wɔ ha: `wallet.dat` Sɛ Argos nyɛ papa a, fa sidecar akwantuo no di dwuma wɔ nsase so akwankyerɛ mu. Sprout bɛhia sɛ ɔsi fam kan wɔ Sapling ansa na watumi akɔ Ironwood. Saa kwan yi yɛ bere-a ɛhwehwɛ nti esiane NU7 nti".
**Sapling**. **Sappling → Ironwood**: Enni Sprout recovery environment ho hia. Fa wallet a ɛwɔ hɔ seesei no di dwuma na etumi nya wo Sapling account pɔtee bi anaa ɛtumi tu kɔ ne so ma ɛyɛ adwuma wɔ Ironwood mu. Ironwood mmoa nko ara nkyerɛ sɛ ɔwɔ tete-Saplin recovery support.
**Orchard**. **Orc → Ironwood** Orchard yɛ exit-only. Fa mfoni a ɛne no di nsɛ wɔ abɛɛfo akwantuo mu fa so kɔ "Occ" hɔ kɔ "Ironwood". Hwɛ: [Sika a wɔgye fii wɔn nsam ne Ironwood pool no](#recovered-funds-and-the-ironwood-pool). |

### Nsԑmmisa anum ho gyinaesi mu a ԑkyerԑ sԑ w'adi kan asesa.

1. **Is it Sprout?** A seed phrase alone points to a later Sapling/Orchard-era recovery path, not Sprout. A `zc...` address, anaa wallet a wɔasan de asi hɔ na ɛkyerɛ sɛ Sprout sika no da so ara hyɛ ne nsa.
2. *Deɛ ɛwɔ wo ho a wobɛtumi de ayɛ no, hwɛ sɛ ɛmmoro so anaa.* `wallet.dat`, a old computer or datadir, an' no ne ho so. `z_exportwallet` backup, anaa exported Sprout spending key. A `zc...` address nko ara nnɔɔso.
3. ** Argos anaa agyapade no akyi kar?** Sɛ wowɔ bi a, ma me nkyerɛ wo. `wallet.dat` anaa kwan a wofa so de sika di dwuma ma no, na wopɛ sɛ w'ayi ntoboa adi kɛkɛ. Bɔ mmɔden hwɛ: [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) Nea edi kan: Fa ɔkwan a wɔfa so de fa mmirika no kɔ akyiri na ɛyɛ akwankyerԑ ma adwuma, sε Argos ntumi nni dwuma anaa w'apɛsɛ sɛ wo ankasa di nneɛma nyinaa ho dwuma.
4. ** Wo wɔ zcashd datadir a w'ayi no asi hɔ dedaw?** Eyi ho hia ma sidecar akwantuo. Twerɛ node data bi kɛkɛ ansa na woatumi atu afiri mu; anyɛ saa de, field guide no ka snapshot/from-scratch options no ho asɛm.
5. Faako na sika no kɔ? * Ironwood* Sprout di kan fa Sapling ho efisɛ ɛnni nhyehyɛe baako a efi Sprout de ba Ironwood. Nnyae wo ho wɔ Sapling hɔ.

### ZEC Pool Nkrataa a Ɛkyerɛ Nsesaeɛ Afa Ɔman no Ho

Sɛ wopɛ sɛ wuhu akwan a wɔfa so nya ahobanbɔ no nyinaa, ɛne kwan pɔtee a wɔde kɔ ayaresa mu, akwankyerɛ ahorow, akatua, hardware ahiadeɛ, ahonim ho nsɛm, ɔhaw ano aduru ne baabi a wofi ba no, kenkan ɔfã biara.

**Nsɛm a wɔato din 1.1 · Wɔasan de no aba so September 18, 2026**

[Kenkan ZEC Pool Migration Field Guide no nyinaa wɔ ZecHub mu.](/research/zec-pool-migration/view)

> Ansa na wo bɛfiri ase: di kan hu nea wore san agye ne nneɛma a wode asesa no. W'ahwɛ so seesei sɛ woboa anaa wontua sika wɔ ɔkwan foforo biara so, ebia wobɛhia biribi foforɔ kɛkɛ de asan akyekyere mu. Nneɛma bi te sɛ ZecWallet Lite seed, deɛ wɔde awoɔ akyɛmu ayɛ ama obi a ɔretua ka pii ho aka nsɛm bebree akyerɛ wɔn a wɔwɔ hɔ nnɛ no. `wallet.dat`, anaa nea ne ho yɛ den a ɔtumi de sika di dwuma wɔ Sapling anaasɛ Sprout  mu no betumi ahwehwɛ ɔkwan soronko bi.
>
> Sԑ wosusuw sԑ sika no te ase a, ma y'ahunu sɛ wo da so ara wɔ tumi de tua ka ansa na wode bere asiesie. `zc...` address anaa nneɛma a wohwɛ no nkutoo nnɔɔso sɛ wode sika bɛtwe.
>
> **YWallet no longer supports Zcash after Ironwood.** Use **Zkool** for ordinary non-Sprout restores from supported seeds and keys. Use **Argos** for ZecWallet Lite recovery, legacy wallet files, and standalone Sapling/Sprout spending keys. For Sprout, Argos is the first route to try; the full field guide covers the legacy sidecar fallback.
>
> Fa nea w'anya ankasa no di dwuma wɔ ɔfã a edi so yi mu, na ɛnyɛ adeyɛ de ayiyi bi a wokae sɛ wode dii dwuma.

Wowɔ... Fi ase wɔ ha.
| --- | --- |
 Nkyerεmu a εfa nsusude ho anaa yεε no so **non-Sprout spending key** firi sika nkataho bi a w'ayi adi dada, ne nea YWallet Zcash dwumadie dedaw mu. [Zkool](#fund-recovery-with-zkool) |
A **view key only**. Zkool betumi de view keys a wɔtaa so ama akenkan nko ara, nanso w'entumi mma kwan sɛ wobɛgye sika no adi. Hwehwɛ abere anaa kabea kͻkͻm bi.
Nsɛmfua 24 a wɔde yɛ **ZecWallet Lite** aba no. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
A ZecWallet Lite anaa zcashd `wallet.dat`, anaa ɔkwampa a wo de bɛtua Sapling/Sprout ka no. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Fi September 18, 2026, v1.3.0 na yԑde bεto dwa; fa v1.2.0 anaa nea ԑkyir so ma no. `wallet.dat` ne Sprout recovery. Nneɛma a ɛboa ma wonya nkɔso
 Wopɛ sɛ wo ara wode w'ani to fam na wote nka sԑ ԑyԑ nea wobɛtumi de adi dwuma, anaa wobɛsan asiesie no a anka ɛsɛsɛ wototo nneɛma dedaw ho. fa ɔkwan foforo so wɔ "Argos" mu ma yƐn ankasa tumi di kan hu ne nyinaa. [afuw mu akwankyerε nyinaa](/research/zec-pool-migration/view). |
Ԑnyɛ adwuma aba anaa ɛbɔ a wɔde bɔ ka, nanso afiri bi wɔ hɔ a wahintaw no, wo werɛ afi password no, anaasɛ diski no ayɛ basaa. [Adwumakuo a wɔgye wɔn ho fi adwuma mu](#professional-recovery-when-you-do-not-have-the-seed). Mma obi a ɔnnhwehwɛ wo nsa mfa adwuma aba anaa kabea nkrataa nkɔma no da.

## Sika a wo nsa bɛka wɔ Zkool ho no

[Zkool](https://github.com/hhanh00/zkool2/releases) Zcash yɛ nea ɔdi YWallet akyi a ne developer no ara na ɔyɛ. Ɔboa ma wɔtumi nya nneɛma bi, ebi nso ne Sapling keys nanso ɛnyɛ Sprout.

Nsɛm mmienu na yɛreka ho asɛm wɔ ha:

1. **Sane account** firi seed phrase, private key anaa viewing key so
2. **Sweeping funds** afi sika kotoku a daa na ɛboa address ahorow a emu da hɔ nkutoo so

### 1) Dwumadi no a wobɛma so aba foforo

1. Fa Zkool firi afidie no so si hɔ. [nkrataa a wɔtintim no kratafa](https://github.com/hhanh00/zkool2/releases) na bue no
2. Wɔ **Account Manager** (ɔmanfofidie) so no, mia button a ɛkyerɛ sɛ woahyehyɛ akaw foforo bi.
3. Fa **Account Name** hyɛ aseɛ na hu saa account yi.
4. SƐ W'ayi wͻn adi no, na wo de wei ato dwa a, wobɛtumi ahu ne abodin ɛne n'awoɔ tenten.
5. Fa wo key no to **Key (Seed Phrase, Private Key, or Viewing Key) mu. Zkool gye seed phrases, Sapling secret keys, transparent extended keys ne viewing keys a wɔboa ma wɔde yɛ adwuma. A view key yɛ nea wotumi kenkan nko ara na wontumi mma kwan sɛ wode bɛsɛe sika bi.
6. Fa **Birth Height** ma account dada no. Zkool nsane blocks ansa na saa height yi aba, enti fa ho a ɛnni kan wɔ wo wallet dwumadie mu sε wonhu nea εyε ntia. Wo de ne tenten asi hɔ akyiri dodo betumi ama asesae ankasa ayera.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Kyekyɛ account no, na afei sync no

### Ɔbaako firi sika kotoku foforo mu resane de aba no asi hɔ bio

Sɛ nkura no fi sika kotoku a edi ZIP 316 akyi  ka ho ne ZODL (a kan no na wɔfrɛ no Zashi), Zingo, anaa zcashd  ma **Advanced Options** so na fa kwan ma **Use Internal Change** ansa na woagye.

ZIP 316 de adansedie a ɛwɔ mu/asesa no yɛ adwuma. Sɛ wode saa nkonta yi baako si hɔ na woannya **Use Internal Change** aa, ebetumi ama ayɛ te sɛ nea sika biara nni ho mpo nanso wɔda so ara kura ne fa bi.

Nsase foforo mmienu na ɛwɔ **Advanced Options**:

- ** Extra Passphrase (ntumi nsiw)**, sɛ mfoni kotoku a edi kan no de baako na ɛfaa so aa.
- **Account Index**, sε mfidie a w'ayi no adi kan de aka nkonta pii wɔ aba koro so. Sika betumi abͻ index soronko bi ase

> **Saa mmienu yi da adi bere a aba bi wɔ Key afedie no mu.** Sɛ mfidie no nni hwee, anaa wo kura private key anaasɛ wokura viewing key a, Zkool kyerɛ sɛ fa Internal Change na H/W Ledger di dwuma. Fa aba no to hɔ kan ansa na woabue Advanced Options.

### 2) Sika a woayi afi sika kotoku bi mu no, w'atumi ahu ne nyinaa wɔ hɔ.

Sɛ na sika krataa anaa account a atwam no yɛ ZEC nko ara, san fa saa ka no bio di dwuma ma obiara hu address biara a wode adi dwuma wɔ ɔkwan so a ɛnnyɛ den, afei twe wo sika kɔ baabi foforo. Mma w'adwene nsi sɛ akyɛm nkrataa mpɛtee bi da hɔ daa; nneɛma binom de mmoa a ɛyɛ nnam kaa ho wɔ akyiri yi nkyerɛase mu.

1. Fa akwan a ɛwɔ soro no so san fa account no si hɔ
2. bue account no na kɔ **Receive Funds** kratafa so.
3. Wɔmfa adansedie a ɛsakra, te sɛ Ledger ne Exodus no yɛ akwantuo pii wɔ abodin baako mu na eyi ma wɔn nsa ka sika ahorow.
4. **Sete na sync account no akyiri yi.** Adesamma a wohuu wɔn foforo no bɛgye wɔn sika wɔ scan foforɔ mu, enti sɛ wompɛ wei aa ɛbɛte sε nea wonhu hwee.
5. Kɔ w'abodin no so na fa ahyɛnsode mmiɛnsa yi to hɔ. Wonni text label, enti hover anaa long press hwɛ wɔn din:
   - **Shield One** (ɛkyerɛ ɔfasuo) twe address baako a ani tua bere biara mu
   - **Shield All** (ɔfasuo a ɛyɛ den) twe biribiara fi baabiara wɔ bere koro mu
   - **Wɔn a wɔantoto wɔn ho ban no nyinaa** (n'abankɛseɛ a abue) kɔ ɔkwan foforo so, akɔ baabi a emu da hɔ ma obiara hu.

> *Shield One yɛ ade a ɛtaa fa nnipa ho.** Sɛ wode address bebree sie wɔ dwumadie baako mu a, ɛma obiara hu sɛ ɛyɛ obi koro dea. Zkool ankasa bɔ kɔkɔ ansa na ɔde Shield All adi dwuma no.

6. Hwɛ adwuma no na fa to hɔ.

Unshield All yɛ adepa bere a woreyi wo sika wɔ sikakorabea bi so na wogye adrɛs ahodoɔ nko ara. Adwumayɛfoɔ no bɔ wɔn ho ban, nanso sɛ account no kura address a ɛbɔ ne ho ban nkutoo a, ɛnna unshield all nso ba saa aberɛ yi mu.

## ZecWallet Lite ne agyapadeɛ a wɔde yɛ sika nkotoku ho adwuma wɔ Argos so no

[ZecWallet Lite - Ɔfese a wɔhwɛ so ma kasa no mu nsɛm pii.](https://github.com/adityapk00/zecwallet-lite) Ne nsesaeԑ a' yεde firi ase no nte sε nea wɔde di dwuma seesei, enti sɛ wode saa asɛmfua koro yi ara kɔ abɛɛfo afidie mu a wobɛtumi ayera sika bi wɔ ZecWallet Lite nkrataafa foforo so. [Argos](https://argos.sovright.com), firi Sovright, yɛ ɔfese a wɔ siesie no ma saa dwumadie yi ne afoforo.

Argos kenkan ZecWallet Lite nkura ne sika kotoku mu nsɛm, zcashd `wallet.dat`, standalone Sapling extended spending keys, and Sprout spending material. For Sprout, a ZecWallet Lite seed alone is not enough because those keys were generated separately. Argos is a recovery tool, not a day-to-day wallet: inspect the source material locally, scan, then sweep into a maintained wallet you control.

Ɔman a wɔtɔ so mmienu tumi gyina hɔ ma: [wɔhwɛ wɔn so](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) Agyede a wontua no kwa, na wobetumi de ato Sovright so wɔ bere a wɔreyɛ nhwehwɛmu.

> **Mfa aba nni wɛbsaet bi mu da.** Argos wɛbsait no yɛ download ne the web site. [ɔhwɛfoɔ akwankyerεmu](https://argos.sovright.com/guide.html). Nsa no gyina ɔfese a woagye ato mu wɔ kɔmputa so. Yԑn ankasa ne BIP-39 checksum yε nhyehyεεfoͻ. Wᴐde nkransem bƆto dwa bere a scan fii ase. Obiara a bƐsrɛ saa nkrasɛm yi "boa ma w'atumi ayera sika" ԑne wo adi nkutahoɔ.

### Ansa na wobɛbue Argos no,

1. Twe desktop app no firi " [Argos beae a wɔagye din no](https://argos.sovright.com) anaa wɔ [GitHub de krataa a ɛretwe kɔma wɔn no adi dwuma.](https://github.com/sovright/argos/releases).Sɔ hwɛ sɛ wɔadi nkrataa no nyinaa anaa wɔn nsa ano nkyerɛwee so bere a wɔreyi adi.
2. Fa Argos a w'adi no seesei. Efi Ɔpɛnimma 18, 2026, **v1.3.0** na ɛwɔ hɔ, ne nea ɛyɛ papa sen biara. Fa **v2.0 anaa deɛ ɛboro saa di dwuma ma `wallet.dat` ne Sprout recovery**. Nkorabata a w'adi kan sen 1.1.0 no betumi ayɛ scan nanso asiesie Ironwood ho nsesae bi a network no po; update na bɔ mmɔden bio.
3. Yɛ adwuma wɔ afidie a w'agye no adi so. Fa disk nyinaa encryption di dwuma. Nkyekyɛ screen bere a aba, passwordphrase anaa sika ano nsaano mfoni da hɔ yi.
4. Ma baabi a wo bɛ kɔ Unified Address no nsiesiee afiri wallet bi a w'ɔhwɛ so, te sɛ: [ZODL](https://zodl.app/)Hyɛ adrɛs a ɛwɔ sika kotoku no mu ansa na woahyehyɛ wɔ Argos.

### Aba a wɔsan fa so ma bio no

1. bue Argos na yi **Mewɔ nsɛmfua 24 a metumi de adi dwuma**. Nkrataafa krataa ho nhia ma ntetee mu nsakrae biara.
2. Fa asɛm no to hɔ na mia **Validate seed**. Sɛ ɛka sɛ aba no yɛ papa a, kɔ so.
3. Fa bere a wɔwoo no to hɔ, anaa sɛ wohwɛ mu yiye na wode ato baabi. Ɛho yɛ mmerɛ nanso ɛyɛ hu sen sɛ wobɛka akyire dodo.
4. Wͻ server controls no ase, fa current-server preset no di dwuma anaa hyehyɛ lightwalletd URL. Wɔde ntwehwe mu atetew URL ahorow a w'asɔ ahwɛ wɔ ne nhyehyɛeɛ ho. Nhwɛso ahodoɔ:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Fa baabi a wɔde wɔn bɛkɔ no Unified Address.
6. Klik **start scan**. Eyi betumi agye simma anaa nna kakra, a egyina awoda tenten so. Wubetumi agyae na woasan abue adwuma no mu bio; wɔsan yɛ nhwehwɛmu no bio.
7. Sɛ wɔwie hwehwɛ no wie a, hwɛ nkaeemu ahorow no, kabea ho ntotoho ne baabi a woakɔ, na afei mia **sweep**.

Sɛ wo twe obi a, w'antumi annya no bio. Fa mfoni kotoku kan de sie kosi sɛ wobɛtwe nea ehia biara na sika a wɔhwɛ kwan aba ɔfese foforo so. Bere a woanya awieɛ wie pɛ, yi ahintasɛm dedaw fi hɔ sen sɛ wobɛkɔ so adi dwuma ama adwuma foforɔ bi.

### Adaka mu nkrataa ne abodin a ɛda hɔ ma no

Wɔ welcome screen no so, **Mewɔ wallet file** kata ZecWallet Lite file bi so, a zcashd `wallet.dat`, or standalone Sapling extended spending keys. Standalone Sprout spending-key recovery is handled by Argos's Sprout recovery path/CLI.

Argos kenkan nkrataa a ɛwɔ wo korabea mu no, na w'ansesa. Sɛ wokorɔkorɔ korakora wɔ sika krataa so a, fa password phrase no to hɔ bere a wobisa; wɔde di dwuma wɔ nkae mu na wɔnkyerɛw mfa nkɔ disk so. Hwɛ transparent, Sapling ne Sprout key counts ansa na woafi scan ase.

Wontumi nnye ɔhwεfo nkyerԑwde mma nhwehwԑmu mu, efisԑ wontumi mfa ho nto gua.

### Nsuo a ɛwo no ho nsensanee

ZecWallet Lite aba no ntumi mma wɔnnya Sprout nsafoa. Saa nsafoaa yi wɔ hɔ ma obiara a ɔfa ho. Nya sprout fi zcashd mu `wallet.dat`, anaa efi ɔfã biara a' wɔn ntwerɔ no wɔ CLI mu.

If the file already has spendable note data and a cached witness, Argos can offer **Sweep Sprout funds** without a chain scan. Otherwise it can run a resumable full-block scan over the P2P network. That scan is large and slow. The checkpoint it writes is spend-capable, so protect it like the original wallet.

Sɛ wo nsa ka sika a, fa kɔ Ironwood so na ma w'ahwɛ sɛ ne nyinaa wɔ hɔ. Nnyae Sapling mu da!

## Sika a wɔgye fii wɔn nsam ne Ironwood pool no

Efi Ironwood (NU6.3) upgrade a wɔde dii dwuma wɔ July 28, 2026 no, Orchard pool yɛ nea wotumi de sika to mu nkutoo. Ɛnsɛ sɛ wode biribi foforo kɔ hɔ na mmom wofa nneɛma bi a ɛwɔ hɔ ma ɛkɔ Ironwood so.

If your recovered funds are in Orchard, move them to Ironwood using a **current wallet's built-in migration flow**. Orchard is exit-only after NU6.3.

Zkool 6.30.0 yɛ nea ɛwɔ hɔ fi September 18, 2026 na ɛboa Ironwood. N'abrabɔ ho nhyehyɛeɛ no fa ahobammɔ ho nanso ɛnyɛ ade koro a ɛne sɛ ɔreka sɛ ne nyinaa di dwuma wɔ ZIP 318 mu. Sika nkotoku afoforo betumi de sika kɔkɔɔ akɔhyɛ adwuma ase wɔ akwan horow so, sɛnea wɔde kasa firi aseɛ kyerɛ no. Di wo korabea sikakorabea foforo bi sesaa akyi hwɛ ma ɛnsiane anaa nhyehyɛe biara nni hɔ. Wode w'ahyehyɛde yi adi kan bɔ ka biribi pɔtee ansa na wode to gua.

Ahyεase a wɔto so nkakrankakra betumi de nnwumakuo bebree adi dwuma, enti akatua no nyinaa tumi boro nea wɔde di dwuma prɛko.

> **Nneɛma a w'atwe no ho yɛ baguam.** Sɛ ɛmu bi kɔ ɔdan mu, ne dodoɔ ne ntramu tenten wɔ chain so mpo sɛ nea ɔde asendefoɔ na ogyefo hyɛ ban. Fa wallet no built-in private/staged migration policy di dwuma bere a ahobammɔ hia wo, na fa network level ahosuo te sε Tor anaa obi foforɔ de gye tom privacy layer baabi a ɛfata. Network ahosɔ betumi akata wo IP link; ɛnkata badwam akwantuo bo no.

## Deep Recovery a ZExCavator yɛ no so

[ZExCavator (Ɔkwan a wɔfa so yi)](https://github.com/zingolabs/zexcavator) Zingo Labs recovery project a yɛreyɛ adwuma wɔ mu no, seesei de n'ani da so ara si ZecWallet Lite wallet files ne wallet-format migration. N'adansedie ma wɔn a wɔde sika gye nkwa kɔ **Zingolib** export option hɔ bere a wɔreyi ntoboa pa ama ZeWIF nyinaa.

Susuw ho sɛ abɛɛfo/abɛbuo-afidie sen sε w'adi kan asesa kwan no. Sɛ ZecWallet Lite nkura, sika krataa a wo de di dwuma wɔ akontaahyɛde so, zcashd `wallet.dat`Sԑ wofa akwankyerε a' yεde di dwuma, na wͻtaa de ahoma kכn so no ho asεm kyerε mu sεε Argos kan. Hwɛ biribiara a ZExCavator agye atoom wɔ ne wallet a εwᴐ hͻ ansa na wode w'ani bεto so.

## Sɛ w'anya aba a, di ho dwuma yiye bere a wunni bi no.

Sɛ nkura anaa nsafoa no yera a, wɔn ankasa ntumi nsiesie. Nnipa bi wɔ saa gyinabea yi mu de adwumakuo a wɔyɛ adwuma ma wɔde gye nsɛmfua firi kɔmputa so ne nea ɛyerae nyinaa to hɔ na ama wɔatumi ayɛ ho biribi.

Saa kwan no nte sɛ nea wode bɛsan aba a wowɔ so. Mma obi mmfa aba bi a ɛyɛ adwuma mma obiara a ɔde "bɛba" ama wo. Adwumaden yi mu nnaadaa yɛ ade a ɛtaa ba.

[Nkyekyere mu nsɛm a enni ano](https://unciphered.com) yɛ adwumakuo a wɔyɛ adwuma yi wɔ fie na wɔnyaa ho nsɛm pii te sɛ: [Ɔfese a wɔde ntayaa ayɛ no](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). They are a general crypto recovery service, not a Zcash-specific tool, and they charge for the work. ZecHub does not endorse any recovery firm. If you go this route, confirm the official domain yourself and assume anyone who DMs you first is a scammer.

Sɛ wowɔ adwuma a, fa wo ankasa akwantuo so di kan te sɛ Zkool anaa Argos wɔ w'ankasa afidie no so.

## YWallet no nni hɔ bio.

YWallet yɛ mfidie a wɔtaa hyɛ ho nkuran ma wɔnya sika bio, na akwankyerεfoɔ dada no pii da so ara kyerɛ kwan.

Ne developer se YWallet no nnyε Zcash boafo bio efiri Ironwood update na ɔkyerԑ kwan ma Zcash ntaafoɔ kɔ **Zkool**, ne nkyidifo a wɔhwɛ so. Ma y'atumi akura tete YWallat seed/key material nanso mma wontum mfa nsesa foforo mmfi zcash mu nkɔ YWallit hɔ.

Sɛ wowɔ Zcash a w'atumi de agye afiri YWallet mu dedaw a, fa saa nneɛma yi san wɔ Zkool so denam kwan/nsaano akwan a ɛwɔ atifi hɔ no so.

## Nkrataafa a ɛfa ho

- [Adaka no mu nkotoku](/using-zcash/wallets) - nkotoku a w'ɔhwɛ so ne Ironwood ahobanbɔ, ɛne Argos no nso ka ho.
- [Ironwood nnua a wɔde yɛ adwuma](/zcash-tech/ironwood) - nea upgrade no sesae ne deɛn nti na sika kɔ baabi foforɔ a, ɛnneɛ ɛhe na ɛde nkuro ba?
- [Nsɛm a wɔka no bi](/using-zcash/memos) - sɛnea nkrataa a wɔde ahyɛnsode ayɛ yɛ adwuma no.
- [Ɔhwɛfoɔ Nsaano Hwehwɛbea](/zcash-tech/viewing-keys) - nea wotumi kenkan nkutoo a wontua tumi so ka biara nni hɔ
- [Lightwallet Nodes (Ɔkwan a wɔfa so de sika fa nneɛma mu)](/zcash-tech/lightwallet-nodes) - public lightwalletd endpoints Argos can use
- [Argos user guide (Argos) dwumadie no mu nkyeresoɔ](https://argos.sovright.com/guide.html) - Official akwantu ho nsɛm fi Sovright hɔ.
- [Naomi Brockwell wɔ nneɛma a wɔde siesie no ho.](https://x.com/naomibrockwell/status/2079146521405333526) - Argos akwankyerԑ ne krataafa a ɛfa adwuma mu ahobanbɔ ho.
