<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nkwụghachi ego Zcash Wallet Fund

** Gịnị mere i ji debe ihe ndị ị na-eji emepụta?**

Mkpụrụ, igodo mmefu ego, igodi nlele na faịlụ wallet abụghị ihe a ga-agbanwerịta. Okwu mkpụrụ nwere ike ị nweta mkpịsị ugodi maka ọtụtụ obere akpa, mana ọ naghị edochi isi ma ọ bụ akwụkwọ nchekwa niile dị ugbu a. Igodo nyocha nwere ike ikpughe ọrụ echedoro kama enweghị ike inye ikike imefu ego.

Iweghachite na-adabere n'inwe ikike mmefu ziri ezi yana ụzọ a kwadoro ugbu a maka ọdọ mmiri nke nwere ego ahụ. Debe ihe eji ewepụta onwe gị ma ghara ịkekọrịta mkpụrụ, igodo imefu ego, ma ọ bụ faịlụ obere akpa onye ọbụla ị tụkwasịghị obi.

# Nchebe na Ibu Ọrụ

Ọ dị oke mkpa ka ndị ọrụ ghọta ihe ize ndụ metụtara na-emeso nzuzo igodo ma debe ha chebe site n'aka ikike ịnweta. Nche nke ego dabere na ibu ọrụ onye ọrụ iji chekwaa mkpịsị ugodi onwe ya.

## Ego echekwara na ihe nketa: Sprout, Sapling and Orchard

ZEC ndị ochie nwere ike ịkwaga dịka akụkụ nke mgbake. Ụzọ a dabere na ọdọ mmiri echedoro ugbu a na-ejide ego ahụ.

> ** A na-eme atụmatụ NU7 maka November 5, 2026.** Ozugbo ọ rụọ ọrụ, ụzọ mbugharị ugbu a si n'ọdọ mmiri Sprout ochie ga-akwụsị ịrụ ọrụ.
>
> Ọ bụrụ na ị ka nwere ZEC n'ime ọdọ mmiri Sprout, bugharịa ya tupu nkwalite ahụ. Mgbe arụ ọrụ, ngwaọrụ ndị dị ugbu a agaghịzi enwe ike ibugharị ego nke Sprout gaa Sapling, adreesị doro anya ma ọ bụ ebe ọzọ.
>
> Ọ bụrụ na ị na-ele ibe a **mgbe NU7** mechara rụọ ọrụ, **A ga-ejide Sprout n'ime ice ruo mgbe usoro mgbake ọdịnihu dịnụ, nke anaghị eme atụmatụ ugbu a.

## Azịza ya dị n'otu peeji .

 Ego gị dị na  Ụzọ Mbugharị  Ihe ị ga-eme  Ọ bụrụ na ego ahụ adịghị, ọ bụ naanị ihe a chọrọ ka i mee.
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | If you have `wallet.dat` ma ọ bụ igodo mmefu Sprout kwụ ọtọ, gbalịa ụzọ mgbake Argos ugbu a. Ọ bụrụ na Argos adịghị adabara gị mma, jiri usoro ụgbọ ala ochie dị n'usoro ntuziaka ubi zuru ezu. Mkpụrụ ga-ebute ụzọ banye Sapling, wee gaa Ironwood. Usoro a nwere oge mmetụta uche maka NU7.
** Sapling**. **Sapling → Ironwood**: Enweghị mkpa mgbake gburugburu ebe obibi Sprout. Jiri obere akpa ego dị ugbu a nke nwere ike weghachite ma ọ bụ jiri akaụntụ gị kpọmkwem na-emefu ihe, wee wuo azụmahịa ndị Ironwood. Nkwado Ironwood naanị anaghị egosi nkwado nketa-nkwụghachi azụ maka Sapling.
**Orchard**. **Orc → Ironwood.* Orchard bụ naanị ọpụpụ-na-eji ugbu a dakọtara wallet si wuru na orchard ka ironwood Mbugharị usoro ịhụ ihe ndị ọzọ: [Ego natara na Ironwood ọdọ mmiri](#recovered-funds-and-the-ironwood-pool). |

### Ihe ise ajụjụ mkpebi usoro

1. ** Ọ bụ Sprout?** Okwu mkpụrụ a na-egosi naanị ụzọ mgbake nke oge Sapling / Orchard, ọ bụghị sprout. A `zc...` adreesị, ma ọ bụ obere akpa eweghachiri na-akọ akụkọ Sprout, na-ezo aka na Sprout.
2. **Olee ihe mgbake ị nwere?** Chọọ maka `wallet.dat`, na kọmputa ochie ma ọ bụ datadir, a `z_exportwallet` nkwado ndabere na mpaghara, ma ọ bụ a exported Sprout emefu igodo. A `zc...` nanị adreesị ezughị.
3. **Argos ma ọ bụ ihe nketa sidecar?** Ọ bụrụ na i nwere `wallet.dat` ma ọ bụ a kwụ ọtọ Ome emefu igodo na nanị chọrọ ego si, agbalị [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) Jiri ụzọ nkwụsị nke ochie na ntuziaka zuru ezu ma ọ bụrụ na Argos enweghị ike ijikwa ihe onwunwe ahụ maọbụ ọ bụrụ n'ịchọrọ ka nchịkọta mgbake niile dị n'okpuru njide gị.
4. ** Ị nwere ugbua synchronized, unpruned zcashd datadir?** Nke a bụ naanị ihe gbasara ụzọ ụgbọ ala. Detuo data node dị ugbu a nanị mgbe ọ kwụsịrị; ma ọ bụghị ya onye nduzi ubi na-ekpuchi nhọrọ snapshot / site n'isi mmalite.
5. **Where do the funds end up?** **Ironwood.** Sprout crosses through Sapling first because there is no single direct Sprout-to-Ironwood transaction. Do not stop at Sapling.

### Ntụziaka zuru ezu nke ZEC Pool Migration Field Guide

Maka ntụaka ntụgharị zuru ezu, gụnyere ụzọ mgbake nkọwapụta, iwu, ụgwọ, ihe ngwaike chọrọ, echiche nzuzo, nchọpụta nsogbu na isi mmalite, gụọ ntuziaka ahụ dum.

**Version 1.1 · Emelitere Septemba 18, 2026**

[Gụọ ZEC Pool Migration Field Guide zuru ezu na ZecHub.](/research/zec-pool-migration/view)

> ** Tupu ịmalite:** buru ụzọ chọpụta ihe ị na-agbake ma ọ bụ ihe mgbake nke ị ka nwere. Achịcha obere akpa ego ugbu a ma ọ bụkwanụ igodo mmefu ndị ọzọ na - akwadoghị Sprut pụrụ ịchọ naanị mweghachi nkịtị. Ihe ochie  dị ka mkpụrụ ZecWallet Lite, otu nketa `wallet.dat`, ma ọ bụ a kwụ ọtọ Sapling ma ọ na-amị mmefu isi  nwere ike mkpa raara onwe ya nye mgbake ụzọ.
>
> Ọ bụrụ na i chere na ego ahụ dị n'ime **Sprout**, gosi gị ma ị ka nwere ikike imefu ihe tupu itinye oge maka mgbake. A `zc...` adreesị ma ọ bụ ihe nlele naanị ezughị iji bufee ego.
>
> ** YWallet anaghịzi akwado Zcash mgbe Ironwood gasịrị. * Jiri **Zkool** maka ndị nkịtị na-abụghị Sprout weghachite site na mkpụrụ osisi na igodo akwadoro. Jiri **Argos** maka ZecWallet Lite mgbake, faịlụ obere akpa ochie, yana mkpịsị ugodi Sapling / Spruot kwụ ọtọ. Maka Sprout, Argos bụ ụzọ mbụ iji gbalịa; nduzi zuru ezu nke ubi kpuchitere ihe nketa sidecar fallback .
>
> Jiri tebụl dị n'okpuru dabere na ** ihe ị nwere**, ọ bụghị ngwá ọrụ mgbake nke i chetara iji.

Ị nwere... bido ebe a.
| --- | --- |
◯ Okwu mkpụrụ ma ọ bụ kwadoro ** igodo mmefu na-abụghị Sprout site na obere akpa ego dị ugbu a ma ọ bụkwanụ nke e debere n'oge na-adịbeghị anya, gụnyere ihe ochie YWallet Zcash. [Zkool](#fund-recovery-with-zkool) |
◯ ** igodo nlele naanị** Zkool nwere ike ibubata igodo nyocha akwado maka ịgụ-naanị ohere, mana igodo ngosi enweghị ike inye ikike mmefu mgbake. Chọta mkpụrụ ma ọ bụ isi ihe na-emefu ego kwekọrọ ekwekọ. ❑ Nweta paswọọdụ gị site na iji bọtịnụ ahụ dị ka ụzọ ọzọ ị ga - esi nweta data ndị a chọrọ. ● Gosi onye ọrụ ibe gị ebe nchekwa nke faịlụ gị (dịka ọmụmaatụ: "Zkool"); • Hụkwa otu ụdị ko
◯ Okwu iri abụọ na anọ e dere n'akwụkwọ anyị bụ́ ZecWallet Lite. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
Ihe ZecWallet Lite ma ọ bụ zcashd. `wallet.dat`, ma ọ bụ ihe na-akpaghị aka Sapling / Sprout mmefu igodo. [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)Site na Septemba 18, 2026, v1.3.0 bụ nke ugbu a ma bụrụkwa ihe kachasị mma; jiri v1.2.0 ma ọ bụ mgbe e mesịrị maka. `wallet.dat` na mgbake Sprout. "
◯ Ihe na-eto eto nke Argos enweghị ike ijikwa, ma ọ bụ mgbake ebe ịchọrọ ihe ndị ochie n'okpuru njide gị. Jiri ụzọ ụgbọ ala dị n'akụkụ ahụ mee ka ị nwee ohere iji nweta data site na usoro a maka ọtụtụ afọ gara aga. [nduzi ubi zuru ezu](/research/zec-pool-migration/view). |
◯ Ọ dịghị mkpụrụ ma ọ bụ igodo na-arụ ọrụ, mana ngwaọrụ akpọchiri ekpochi, paswọọdụ echefuru echefu, maọbụ diski dara ada. [Ọkachamara mgbake](#professional-recovery-when-you-do-not-have-the-seed). Ejila mkpụrụ na-arụ ọrụ ma ọ bụ igodo mmefu nye onye kpọtụrụ gị n'ebughị ụzọ rịọ ya. 

## Nchịkọta ego na Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) bụ onye nọchiri Zcash nke YWallet site n'aka otu onye mmepe ahụ. Ọ na-akwado ụzọ mgbake nchedo doro anya ma dị ugbu a, gụnyere igodo Sapling ochie, mana ** ọ bụghị Sprout** .

E nwere ọnọdụ abụọ a na-ekwu okwu ha ebe a:

1. ** Iweghachite akaụntụ** site na mkpụrụ okwu, igodo nzuzo ma ọ bụ igodo nlele
2. **Iwepu ego** site na obere akpa nke kwadoro naanị adreesị doro anya

### 1) Ịgbanwe Akaụntụ Gị

1. Wụnye Zkool site na ihe nchọgharị ahụ. [peeji nke na-ewepụta akwụkwọ akụkọ](https://github.com/hhanh00/zkool2/releases) mepee ya .
2. Na ** Onye njikwa akaụntụ** (isi peeji), pịa bọtịnụ **+** iji nweta ihuenyo ** Akaụntụ Ọhụrụ**
3. Tinye ** Aha Akaụntụ** iji mata akaụntụ a.
4. Tinye ** Weghachite Akaụntụ?** Nke a na-ekpughe igodo ahụ ma ọ bụ ubi ọmụmụ.
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts seed phrases, Sapling secret keys, transparent extended keys, and supported viewing keys. A viewing key is read-only and cannot authorize a spend.
6. Tinye **Ọdị elu ọmụmụ** maka akaụntụ ochie. Zkool anaghị enyocha ngọngọ tupu ịdị elu a, yabụ họrọ ogo karịa ọrụ akpa ego mbụ ma ọ bụrụ na ị maghị nke ọma. Ịtọlite ogologo oge ịmụ nwa nwere ike ime ka azụmahịa dị adị ghara ịdị.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Chekwaa akaụntụ ahụ, wee mekọrịta ya

### Iweghachite mkpụrụ site na obere akpa dị iche

Ọ bụrụ na mkpụrụ ahụ sitere n'akpa ego nke so ZIP 316  gụnyere ZODL (nke bụbu Zashi), Zingo, ma ọ bụ zcashd  gbanye ** Nhọrọ di elu** wee mee ka ** Jiri Mgbanwe Ime ụlọ ** tupu ịchekwa.

ZIP 316 na-eji adreesị dị iche / mgbanwe. Iweghachi otu n'ime akaụntụ ndị a na -enweghị ** Jiri Mgbanwe Ime** nwere ike ime ka mmepụta mgbanwe gbanwee ọ bụ ezie na ego ahụ ka dị.

Uzo abuo ndi ozo di n'okpuru ** Nhọrọ Di elu**:

- ** Extra Passphrase (nhọrọ)**, naanị ma ọ bụrụ na obere akpa mbụ jiri otu.
- ** Akaụntụ Index**, ma ọ bụrụ na akpa ego mbụ nwere ọtụtụ akaụntụ n'otu mkpụrụ. Ego ahụ nwere ike ịbụ n'okpuru ndepụta dị iche

> ** Abụọ ndị a na-apụta mgbe mkpụrụ okwu ziri ezi dị n'ọhịa Key.** Na ubi efu, ma ọ bụ ijide igodo nzuzo ma ọ̄ bụ ilele anya, Zkool gosipụtara naanị ** Jiri Mgbanwe Ime** na ** H / W Ledger. Tinye mkpụrụ mbụ ahụ, wee mepee Nhọrọ Ndị Dị Elu .

### 2) Ịchụ ego site na obere akpa naanị nke nwere nghọta.

Ọ bụrụ na obere akpa ochie ma ọ bụ akaụntụ ejiri **transparent ZEC naanị**, weghachite akaụntụ ahụ mbụ, chọta adreesị ọhụụ niile eji eme ihe, wee bugharịa ego gaa ebe echekwara ugbu a ị na-achịkwa. Echela ụdị akara ngosi nke oge gara aga ka ọ dị mfe nghọta; ụfọdụ ngwaahịa gbakwunyere nkwado ezoro ezo na nsụgharị ndị ọzọ.

1. Weghachite akaụntụ ahụ site na iji usoro ndị dị n'elu
2. Mepee akaụntụ ahụ ma gaa na ** Nweta ego** peeji nke.
3. Tap the magnifying glass in the top bar (**Find other transparent addresses**). Wallets that rotate addresses, such as Ledger and Exodus, generate many transparent addresses from one seed, and this finds the ones holding funds
4. ** Tọgharia ma mekọrịta akaụntụ ahụ mgbe e mesịrị.** Adreesị ndị a chọtara ọhụrụ na-eburu nguzozi ha n'oge nyocha ọzọ, yabụ ịhapụ nke a ga - eme ka ọ dị ka nchapu achọtaghị ihe ọ bụla.
5. Gaa na peeji nke ** Send. N'akụkụ nguzozi ị ga-ahụ bọtịnụ akara ngosi atọ. Ha enweghị aha ederede, yabụ jiri aka gị ma ọ bụ pịa ogologo iji hụ aha ha:
   - **Shield One** (ọkwa ọta) na-ebugharị otu adreesị doro anya n'otu oge
   - **Shield All** (ọkpụkpụ ọta) na-ebugharị ihe niile site n'adres ọhụụ ọ bụla ozugbo.
   - **Unshield All** (mkpọchi emepere) na-aga n'ụzọ ọzọ, gaa adreesị doro anya.

> **Shield One bụ nhọrọ nkeonwe.** Ichebe ọtụtụ adreesị n'otu azụmahịa na-ejikọta ha dịka ndị otu onye. Zkool dọrọ aka ná ntị banyere onwe ya tupu ịpịa Shield All.

6. Nyochaa azụmahịa ahụ ma zipụ ya .

Unshield All bara uru mgbe ị na-ewepụ ego n'ụlọ ahịa nke naanị adreesị doro anya. bọtịnụ mkpuchi ahụ ga - apụta ma ọ bụrụ na akaụntụ nwere adres kpuchie, yana unshel niile naanị ma ọ nwee ihe ngosi.

## ZecWallet Lite na mgbake akpa ego ochie site n'enyemaka Argos

[ZecWallet Lite (Nke a bụ ihe dị mkpa)](https://github.com/adityapk00/zecwallet-lite) A naghịzi edebe ya ma echekwa ebe nchekwa ya. Mkpụrụ mkpụrụ osisi dị iche na nhazi nke obere akpa ego ugbu a, n'ihi ya ịbubata otu ahịrịokwu ahụ n'ime obere akpa ọgbara ọhụrụ nwere ike ileghara ego ndị e jidere na adreesị ọzọ sitere na ZecWallet Lite anya. [Argos](https://argos.sovright.com), site na Sovright, bụ ebe ọrụ mgbake desktọọpụ wuru maka nke a na ihe ndị ọzọ dị mkpa.

Argos na-agụ mkpụrụ ZecWallet Lite na faịlụ wallet, zcashd `wallet.dat`, standalone Sapling extended spending keys, and Sprout spending material. For Sprout, a ZecWallet Lite seed alone is not enough because those keys were generated separately. Argos is a recovery tool, not a day-to-day wallet: inspect the source material locally, scan, then sweep into a maintained wallet you control.

Ọchịchọ Ndị Na-adịghị Elu [e nyochara anya na ya](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) Ngwá ọrụ ahụ. Nchịkọta n'onwe ya bụ n'efu onyinye inyeaka na Sovright nwere ike ịpụta mgbe a na-enyocha ihe niile.

> **Etinyela mkpụrụ n'ime ebe nrụọrụ weebụ.** Ebe Argos bụ naanị ihe na-ebudata ma ọ bụ nke a ga - eme ka ị nweta. [akwụkwọ ntuziaka onye ọrụ.](https://argos.sovright.com/guide.html). Igodo na-anọgide na ngwa desktọọpụ ahụ. Nyocha bụ mpaghara megide BIP-39 checksum. Ubi mkpụrụ a kpochapụrụ ozugbo nyocha malitere. Onye ọ bụla nke zitere gị ozi maka mkpụrụ "iji nyere aka weghachite ego gị" na - aghọgbu gị.

### Tupu ị mepee Argos .

1. Budata ngwa desktọọpụ site na . [ebe nrụọrụ weebụ Argos gọọmentị.](https://argos.sovright.com) ma ọ bụ na- [GitHub na-ewepụta peeji nke](https://github.com/sovright/argos/releases)Nyochaa checksums ma ọ bụ mbinye aka mgbe ha na-ebipụta.
2. Jiri mbipụta Argos dị ugbu a. Ka ọ na-erule Septemba 18, 2026, **v1.3.0** bụ nke dị ugbu ma bụrụkwa ihe kachasị mma. Jiri **v2.0 ma ọ bụ mgbe e mesịrị maka `wallet.dat` na mgbake Sprout **. Ihe ndị okenye karịa 1.1.0 ka nwere ike iṅomi ma wuo pre-Ironwood sweeps nke netwọk jụrụ; melite ma gbalịa ọzọ.
3. Na-arụ ọrụ na igwe ị tụkwasịrị obi. Họrọ izo ya ezo disk dum. Ekekọrịtala ihuenyo mgbe mkpụrụ, passphrase ma ọ bụ igodo mmefu dị anya.
4. Nwee ebe a na-aga Unified Address dị njikere site n'akpa ego ị na - achịkwa, dịka: [ZODL](https://zodl.app/)Nyochaa adreesị dị na obere akpa ahụ tupu i tinye ya n'ime Argos.

### Mkpụrụ mgbake

1. Mepee Argos ma họrọ ** Enwere m mkpụrụ okwu 24 nke mkpụrụ.* Nchịkọta mkpụrụ anaghị achọ faịlụ obere akpa.
2. Tinye ahịrịokwu ahụ wee pịa ** Validate seed** Ọ bụrụ na ọ sị mkpụrụ a dị mma, gaa n'ihu.
3. Tinye ** ụbọchị ọmụmụ ngọngọ elu, ma ọ bụ kacha nso atụmatụ nke mgbe wallet e kere. Ihe mbụ dị elu na-eji nwayọọ karịa mana nchekwa karịa ịkọ nkọ n'oge gara aga.
4. N'okpuru njikwa ihe nkesa, jiri ntọala nke ugbu a-ihe nkesa ahụ, ma ọ bụ tinye URLs lightwalletd. A na - anwale comma kewapụrụ site n'usoro. Ihe atụ ọha:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Tinye adreesị Unified Address.
6. Pịa **malite nyocha**. Nke a nwere ike were nkeji maọbụ ụbọchị dabere na ogo ọmụmụ gị. Ị nwere ike ịkwụsị ya wee mepee otu ebe ọrụ ahụ; nyochaa ga-amaliteghachi.
7. Mgbe nyocha ahụ gwụchara, lelee nguzozi ego, atụmatụ ụgwọ na ebe ị ga-aga wee pịa ** kpochapụ**.

Ịgbasa ozi na-enweghị ike ịgbanwe agbanwe. Debe faịlụ akpa ego mbụ ruo mgbe a kpochapụrụ ọdọ mmiri ọ bụla dị mkpa ma ebe nchekwa ahụ gosipụtara ego ndị a tụrụ anya ya. Ozugbo mgbake zuru ezu, wepụ ihe nzuzo ochie kama ịnọgide na-eji ha maka ọrụ ọhụrụ.

### Faịlụ obere akpa na igodo kwụ ọtọ.

Na ihuenyo nnabata, ** Enwere m faịlụ obere akpa ego** na-ekpuchi ZecWallet Lite file, a zcashd `wallet.dat`, ma ọ bụ standalone Sapling gbasaa mmefu igodo. Standalone Sprout na-emefu ego isi mgbake a na-edozi site Argos si Alaka mgbake ụzọ / CLI .

Argos reads wallet files without modifying them. If the wallet is encrypted, enter the passphrase when asked; it is used in memory and is not written to disk. Review the transparent, Sapling, and Sprout key counts before you start a scan.

A naghị anabata igodo ndị na-ahụ maka ihe nchọgharị n'ihi na ha enweghị ike inye ikike mmefu ego.

### Ihe ndị na-eme ka mkpụrụ osisi pulite

A ZecWallet Lite mkpụrụ adịghị enweta mkpịsị ugodi Sprout. Ndị ahụ igodo e mepụtara iche-iche. Weghachite Mgbasa site na zcashd `wallet.dat`, ma ọ bụ site na igodo mmefu kwụ ọtọ n'ime CLI.

Ọ bụrụ na faịlụ ahụ nwere data edeturu ma nwee onye akaebe echekwara, Argos nwere ike ịnye ** Ghichaa ego Sprout ** n'enweghị nyocha nke agbụ. Ma ọ bụghị ya, o nwere ike ịgba ọsọ nchịkọta zuru ezu site na netwọk P2P. Nnyocha ahụ dị ukwuu ma nwayọ. Ebe nchọpụta ọ dere bụ ihe eji emefu ego, wee chebe ya dịka obere akpa mbụ.

Uru nke Sprout nwere ike ịdaba na Sapling. Mgbe ego ndị a kwadoro ma nwee ike iji ya, bugharịa ha gaa ** Ironwood** yana obere akpa dị ugbu a nke na-akwado akaụntụ Sapling ahụ e weghachiri. Akwụsịla na Saping.

## Ego natara na Ironwood ọdọ mmiri

Ebe ọ bụ na emelitere Ironwood (NU6.3) arụ ọrụ na 28 Julaị 2026, ọdọ mmiri Orchard bụ naanị mmefu. Enweghị uru ọhụụ nwere ike ịbanye ya, ma uru dị ugbu a gafere n'ime ụlọ ntụgharị ahụ gaa Ironwood .

Ọ bụrụ na ego gị enwetaghachiri dị n'ime Orchard, bugharịa ha gaa Ironwood site na iji **akpaegozi akpaaka nke ugbu a.Ọpụpụ-naanị mgbe NU6.3 gasịrị.

Zkool 6.30.0 is current as of September 18, 2026 and supports Ironwood. Its migration design is privacy-focused but is not the same thing as claiming ZIP 318 conformance. Other current wallets may use ZIP 318-style staged migration. Follow the installed wallet's current migration screen and release notes rather than inventing a manual amount or schedule.

N'ihi ya, ego a ga-akwụ nwere ike ịdị elu karịa nke e ji akwụ ụgwọ otu ugboro.

> **Migration amounts are public.** When value crosses the turnstile, the amount and block height are visible on chain even though the sender and receiver remain shielded. Use the wallet's built-in private/staged migration policy when privacy matters, and use network-level privacy such as Tor or another trusted privacy layer where appropriate. Network privacy can hide your IP link; it does not hide the public crossing amount.

## Iweghachite miri emi na ZExCavator

[ZExCavator Ihe na-eme ka ọ dị elu.](https://github.com/zingolabs/zexcavator) is a **work-in-progress** Zingo Labs recovery project currently focused on ZecWallet Lite wallet files and wallet-format migration. Its README currently directs fund recovery users to the **Zingolib** export option while fuller ZeWIF support is still being developed.

Na-emeso ya dịka ọganihu / ihe dị n'akụkụ kama ịmeghachi ụzọ ndabara. Maka mkpụrụ ZecWallet Lite nkịtị, faịlụ wallet, zcashd `wallet.dat`, na nkwado igodo mmefu kwụ ọtọ, gbalịa Argos mbụ. Nyochaa ihe ọ bụla ZExCavator weghachite n'ime obere akpa echekwara tupu ịdabere na ya.

## Ọkachamara na-agwọ ọrịa mgbe ị na-enweghị mkpụrụ.

Ọ bụrụ na mkpụrụ ma ọ bụ igodo apụla, iweghachite onwe onye enweghị ike ịmalite. Ụfọdụ ndị nọ n'ọnọdụ ahụ jiri ụlọ ọrụ mgbake ọkachamara maka paswọọdụ echefuru echefu, ọdịda ngwaike, ma ọ bụkwanụ diski a na-apụghị ịgụ agụ.

Ụzọ ahụ abụghị otu ihe dị ka iweghachi mkpụrụ ị ka nwere. Enyela onye ọ bụla nke na-enye gị ohere "iweghachite" ya mkpụrụ ọrụ a na-arụ ọrụ. Ụdị aghụghọ ndị e ji arụ ọrụ a bụ nnọọ ndị nkịtị.

[E deghị ya ede.](https://unciphered.com) bụ otu ụlọ ọrụ na-eme nke a n'ụlọ ọrụ ma e kpuchie ya ebe ndị dị ka [Ejiri eriri mee ya.](https://www.wired.com/story/unciphered-crypto-wallet-recovery/). They are a general crypto recovery service, not a Zcash-specific tool, and they charge for the work. ZecHub does not endorse any recovery firm. If you go this route, confirm the official domain yourself and assume anyone who DMs you first is a scammer.

Ọ bụrụ na ị ka nwere mkpụrụ ma ọ bụ igodo mmefu, bido site n'ụzọ mgbake nke onwe gị dị ka Zkool ma ọ bụkwanụ Argos na igwe gị kama.

## YWallet anaghịzi edobe ya.

YWallet bụ ngwa mgbake akwadoro na ibe a ruo ogologo oge, ọtụtụ ndị nduzi ochie ka na-atụ aka ya.

Onye mmepe ya na-ekwu ugbu a na YWallet anaghịzi akwado Zcash kemgbe Ironwood melite ma duzie ndị ọrụ Zcash ka **Zkool**, onye nọchiri anya. Chekwaa ihe ochie nke YWallat / isi ihe, mana amalitela njem ọhụrụ Zcash na Y Wallet .

Ọ bụrụ na ị nwere ihe mgbake Zcash site na YWallet, weghachite ya n'ime Zkool iji usoro mkpụrụ / isi ụzọ a kwadoro n'elu.

## Peeji ndị metụtara ya

- [Akpa ego](/using-zcash/wallets) - nke wallets na-nọgidere na ha Ironwood njikere, gụnyere Argos
- [Osisi ígwè](/zcash-tech/ironwood) - ihe nkwalite gbanwere na gịnị kpatara ego ji akwaga ebe ọzọ.
- [Ihe ncheta](/using-zcash/memos) - etu akwụkwọ ozi ezoro ezo si arụ ọrụ.
- [Igodo Nlele](/zcash-tech/viewing-keys) - naanị ịgụ ohere na-enweghị ike mmefu.
- [Lightwallet Nodes (Nọmba nke obere akpa ego)](/zcash-tech/lightwallet-nodes) - ọha na eze lightwalletd endpoints Argos nwere ike iji
- [Akwụkwọ ntuziaka onye ọrụ Argos](https://argos.sovright.com/guide.html) - Njem ije site n'aka Sovright.
- [Naomi Brockwell na ngwaọrụ mgbake](https://x.com/naomibrockwell/status/2079146521405333526) - Argos na-agagharị agafe ma dee ihe gbasara mgbake ọkachamara.
