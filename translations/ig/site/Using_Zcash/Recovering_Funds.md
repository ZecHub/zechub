<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mweghachi Ego Zcash Wallet

**Gịnị mere ị ga-eji debe ihe mgbake gị?**

Mkpụrụ, igodo mmefu, igodo nlele, na faịlụ obere akpa enweghị ike ịgbanwe agbanwe. Okwu mkpụrụ nwere ike ịnweta igodo obere akpa maka ọtụtụ obere akpa, mana ọ naghị edochi igodo ochie ma ọ bụ faịlụ obere akpa ọ bụla. Igodo nlele nwere ike ikpughe ihe omume echekwara mana enweghị ike inye ikike maka mmefu.

Mgbake dabere n'inwe ikike mmefu ego ziri ezi na ụzọ a na-akwado ugbu a maka ọdọ mmiri nke nwere ego ahụ. Debe ihe mgbake ahụ n'onwe gị, emekwala ka onye ọ bụla ị na-atụkwasịghị obi kesaa mkpụrụ, igodo mmefu, ma ọ bụ faịlụ obere akpa ego gị.

# Nchekwa na Ibu Ọrụ

Ọ dị oke mkpa ka ndị ọrụ ghọta ihe egwu dị na ijikwa igodo nzuzo ma chekwaa igodo ndị a ka ha ghara ịnweta ikike. Nchekwa ego dabere na ọrụ onye ọrụ ichekwa igodo nzuzo ha.

## Ego ndị a na-echebe site na ihe ochie: Sprout, Sapling na Orchard

O nwere ike ịdị mkpa ka a kwaga ZEC ochie nke nwere ihe nchebe dịka akụkụ nke mgbake. Ụzọ ahụ dabere na ọdọ mmiri nke nwere ihe nchebe ugbu a.

> **A na-eme atụmatụ NU7 maka Nọvemba 5, 2026.** Ozugbo ọ malitere ọrụ, ụzọ mbugharị ugbu a si n'ọdọ mmiri Sprout nke ochie ga-akwụsị ịrụ ọrụ.
>
> Ọ bụrụ na ị ka nwere ZEC na ọdọ mmiri Sprout, bufee ya tupu mmelite ahụ. Mgbe emechara ya, ngwaọrụ ndị dị adị agaghịzi enwe ike ibugharị ego Sprout gaa na Sapling, adreesị doro anya, ma ọ bụ ebe ọ bụla ọzọ.
>
> Ọ bụrụ na ị na-elele ibe a **mgbe NU7** gbanyere mkpọrọgwụ, **A na-akpọnwụ Sprout n'ime ice** ruo mgbe usoro mgbake ga-adị n'ọdịnihu, nke a na-emebeghị atụmatụ ugbu a.

## Azịza ya n'otu peeji

| Ego gị dị | Ụzọ njem | Ihe ị ga-eme |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | If you have `wallet.dat` ma ọ bụ igodo mmefu Sprout nkeonwe, nwaa ụzọ mgbake Argos dị ugbu a. Ọ bụrụ na Argos adịghị mma, jiri ụzọ sidecar ochie dị na ntuziaka ubi zuru oke. Sprout ga-ebu ụzọ daa na Sapling, wee gaa n'ihu gaa Ironwood. Ụzọ a na-ewe oge n'ihi NU7. |
| **Sapling** | **Sapling → Ironwood** | Ọ dịghị mkpa ka e nwee ebe a ga-esi nwetaghachi Sprout. Jiri obere akpa ego dị ugbu a nke nwere ike ị nwetaghachi ma ọ bụ mefuo akaụntụ Sapling gị ma wuo azụmahịa Ironwood. Nkwado Ironwood naanị anaghị egosi nkwado mgbake legacy-Sapling. |
| **Orchard** | **Orchard → Ironwood** | Orchard bụ naanị ụzọ ọpụpụ. Jiri usoro mbugharị Orchard-site-Ironwood nke dị n'ime obere akpa ego dakọtara ugbu a. Lee [Ego e weghachitere na ọdọ mmiri Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Usoro mkpebi ajụjụ ise

1. **Ọ̀ bụ Ome?** Naanị okwu mkpụrụ na-egosi ụzọ mgbake Sapling/Orchard nke oge Sapling/Orchard gasịrị, ọ bụghị Ome. `zc...` adreesị, ma ọ bụ obere akpa eweghachiri na-akọ akụkọ ego Sprout, na-atụ aka na Sprout.
2. **Kedu ihe mgbake ị nwere?** Chọọ `wallet.dat`, kọmputa ochie ma ọ bụ datadir, a `z_exportwallet` nkwado ndabere, ma ọ bụ igodo mmefu Sprout ebupụ. `zc...` naanị adreesị ezughi oke.
3. **Argos ka ọ̀ bụ ụgbọala ochie?** Ọ bụrụ na ị nwere `wallet.dat` ma ọ bụ igodo mmefu Sprout naanị ya ma chọọ naanị ego ahụ, nwaa [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) mbụ. Jiri ụzọ ụgbọala ochie dị na ntuziaka ubi zuru oke ma ọ bụrụ na Argos enweghị ike ijikwa ihe ahụ ma ọ bụ ọ bụrụ na ịchọrọ ka ihe mgbake zuru oke dị n'okpuru njikwa nke gị.
4. **Ị nwere zcashd datadir nke a na-anaghị ewepụ?** Nke a dị mkpa naanị maka ụzọ sidecar ochie. Detuo data node dị adị naanị mgbe emechara mmechi dị ọcha; ma ọ bụghị ya, ntuziaka ubi ahụ na-ekpuchi nhọrọ foto/site na ọkọ.
5. **Ebee ka ego ahụ ga-esi agwụ?** **Ironwood.** Ome ahụ ga-ebu ụzọ gafere Sapling n'ihi na ọ dịghị otu azụmahịa Sprout-to-Ironwood kpọmkwem. Akwụsịla na Sapling.

### Nduzi zuru oke nke Ọdọ Mmiri ZEC

Maka ntụaka mbugharị zuru oke, gụnyere ụzọ mgbake zuru ezu, iwu, ụgwọ, ihe achọrọ maka ngwaike, ihe gbasara nzuzo, nsogbu nsogbu, na ndetu isi mmalite, gụọ ntuziaka zuru oke.

**Ụdị 1.1 · Emelitere na Septemba 18, 2026**

[Gụọ ntuziaka zuru oke nke ZEC Pool Migration Field na ZecHub](/research/zec-pool-migration/view)

> **Tupu ịmalite:** buru ụzọ chọpụta **ihe ị na-agbake na ihe mgbake ị ka nwere**. Mkpụrụ obere akpa ego dị ugbu a ma ọ bụ igodo mmefu Sprout na-abụghị nke Sprout nwere ike ịchọ naanị ihe ndozi nkịtị. Ihe ochie — dị ka mkpụrụ ZecWallet Lite, ihe nketa `wallet.dat`, ma ọ bụ igodo mmefu Sapling ma ọ bụ Sprout nke na-anọghị ya - nwere ike ịchọ ụzọ mgbake pụrụ iche.
>
> Ọ bụrụ na i chere na ego ahụ dị na **Sprout**, gosi na ị ka nwere ikike imefu ego tupu itinye oge iji nwetaghachi ya. `zc...` naanị ihe e dere n'adreesị maọbụ ihe e ji ele ihe anya ezughi oke iji bufee ego ahụ.
>
> **YWallet anaghịzi akwado Zcash mgbe Ironwood gasịrị.** Jiri **Zkool** maka mweghachi nkịtị na-abụghị Sprout site na mkpụrụ na igodo akwadoro. Jiri **Argos** maka mgbake ZecWallet Lite, faịlụ obere akpa ochie, na igodo mmefu Sapling/Sprout nkeonwe. Maka Sprout, Argos bụ ụzọ mbụ ị ga-anwale; ntuziaka ubi zuru oke na-ekpuchi mgbanwe sidecar nke ochie.
>
> Jiri tebụl dị n'okpuru dabere na **ihe ị nwere n'ezie**, ọ bụghị ngwaọrụ mgbake ị chetara iji.

| Ị nwere | Malite ebe a |
| --- | --- |
| Okwu mkpụrụ ma ọ bụ **mkpụrụ ego mmefu nke na-abụghị nke Sprout** sitere na obere akpa ego dị ugbu a ma ọ bụ nke a na-elekọta n'oge na-adịbeghị anya, gụnyere ihe ochie YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| Naanị **viewing key ** | Zkool nwere ike ibubata igodo nlele akwadoro maka ohere ịgụ naanị, mana viewing key enweghị ike inye ikike maka mmefu mgbake. Chọta mkpụrụ ma ọ bụ igodo mmefu kwekọrọ. |
| Mkpụrụ nke mkpụrụ okwu iri abụọ na anọ nke **ZecWallet Lite** | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| ZecWallet Lite ma ọ bụ zcashd `wallet.dat`, ma ọ bụ isi ihe eji emefu Sapling / Sprout | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos)Dịka ọ dị na Septemba 18, 2026, v1.3.0 dị ugbu a ma bụrụ nke a na-ahọrọ; jiri v1.2.0 ma ọ bụ karịa maka `wallet.dat` na mgbake Sprout. |
| Ihe Sprout nke Argos na-enweghị ike ijikwa, ma ọ bụ mgbake ebe ịchọrọ ka ihe ndị dị na ya dị n'okpuru njikwa nke gị | Jiri ụzọ sidecar ochie dị na [ntuziaka ubi zuru oke](/research/zec-pool-migration/view). |
| Enweghị mkpụrụ ọrụ ma ọ bụ igodo mmefu, mana ngwaọrụ akpọchiri akpọchi, paswọọdụ echefuru echefu, ma ọ bụ diski dara ada | [Mgbake ọkachamara](#professional-recovery-when-you-do-not-have-the-seed)E zigarala onye kpọtụrụ gị n'amaghị gị ma ọ bụ onye na-arịọ gị ka i tinye ego n'ọrụ. |

## Mgbake Ego na Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) bụ Zcash nke na-anọchi YWallet site n'aka otu onye nrụpụta ahụ. Ọ na-akwado ụzọ mgbake doro anya na nke ọgbara ọhụrụ, gụnyere igodo Sapling ochie, mana **ọ bụghị Sprout**.

E kwuru okwu abụọ ebe a:

1. **Ịweghachi akaụntụ** site na mkpụrụ okwu, igodo nzuzo, ma ọ bụ igodo nlele
2. **Ịnara ego** n'ime obere akpa nke na-akwado naanị adreesị doro anya

### 1) Iweghachi Akaụntụ

1. Wụnye Zkool site na [ibe mwepụta](https://github.com/hhanh00/zkool2/releases) ma mepee ya
2. Na **Onye njikwa akaụntụ** (ibe mbụ), pịa bọtịnụ ****** iji ruo na ihuenyo **Akaụntụ Ọhụrụ**
3. Tinye **Aha Akaụntụ** iji chọpụta akaụntụ a
4. Gbanye **Weghachite Akaụntụ?**. Nke a na-ekpughe mpaghara igodo na elu ọmụmụ nwa
5. Paste your key into **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool accepts seed phrases, Sapling secret keys, transparent extended keys, and supported viewing keys. A viewing key is read-only and cannot authorize a spend.
6. Tinye **Ịdị Elu Ọmụmụ** maka akaụntụ ochie. Zkool anaghị enyocha blọk tupu ogologo a, yabụ họrọ ịdị elu tupu oge mbụ nke obere akpa ahụ ma ọ bụrụ na ị maghị. Ogologo ọmụmụ a kara aka n'oge nwere ike ime ka azụmahịa ndị dị adị yie ka ha na-efu.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Chekwaa akaụntụ ahụ, wee mekọrịta ya

### Iweghachi mkpụrụ site na obere akpa dị iche

Ọ bụrụ na mkpụrụ ahụ si na obere akpa nke na-eso ZIP 316 — gụnyere ZODL (nke bụbu Zashi), Zingo, ma ọ bụ zcashd — gbanye **Nhọrọ Dị Elu** wee gbanye **Jiri Mgbanwe Dị n'ime** tupu ịchekwa.

ZIP 316 na-eji adreesị dị iche maka ime/mgbanwe. Iweghachi otu n'ime akaụntụ ndị a na-enweghị **Jiri Mgbanwe dị n'ime** nwere ike ime ka ihe mgbanwe pụta dị ka ihe na-efu efu n'agbanyeghị na ego ahụ ka dị.

Ubi abụọ ọzọ dị n'okpuru **Nhọrọ Dị Elu**:

- **Okwu Mgbakwunye (nhọrọ)**, naanị ma ọ bụrụ na obere akpa mbụ ejiri otu
- **Ndepụta Akaụntụ**, ọ bụrụ na obere akpa mbụ ahụ nwere ọtụtụ akaụntụ na otu mkpụrụ. Ego ahụ nwere ike ịnọ n'okpuru ndeksi dị iche.

> **Aha abụọ a na-apụta naanị ozugbo mkpụrụ okwu dị mma dị n'ọhịa Key.** Ebe ubi ahụ tọgbọ chakoo, ma ọ bụ jide igodo nzuzo ma ọ bụ nke ikiri, Zkool na-egosi naanị **Jiri Mgbanwe Dị n'ime** na **H/W Ledger**. Mado mkpụrụ ahụ mbụ, wee mepee Nhọrọ Dị Elu.

### 2) Ịnara ego site na obere akpa ego doro anya

Ọ bụrụ na obere akpa ma ọ bụ akaụntụ ochie ahụ nwere naanị ZEC doro anya**, weghachite akaụntụ ahụ mbụ, chọta adreesị ọ bụla ejiri mee ihe doro anya, wee bufee ego ahụ gaa ebe ị na-achịkwa ugbu a. Echekwala na akara obere akpa ochie na-apụta ìhè mgbe niile; ụfọdụ ngwaahịa gbakwunyere nkwado nchekwa na ụdị ndị ọzọ.

1. Weghachite akaụntụ ahụ site na iji usoro ndị dị n'elu
2. Mepee akaụntụ ahụ wee gaa na ibe **Nweta Ego**
3. Pịa iko ihe na-eme ka ọ dị n'elu mmanya ahụ (**Chọta adreesị ndị ọzọ na-egosighi ihe**). Obere akpa ndị na-agbanwe adreesị, dị ka Ledger na Exodus, na-emepụta ọtụtụ adreesị doro anya site na otu mkpụrụ, nke a na-achọtakwa ndị nwere ego ahụ
4. **Tọgharịa ma mekọrịta akaụntụ ahụ ma emechaa.** Adreesị ndị achọtara ọhụrụ na-anakọta naanị ihe ha ga-eme na nyocha ọzọ, yabụ ịhapụ nke a na-eme ka o yie ka ihe ahụ achọtaghị ihe ọ bụla
5. Gaa na peeji **Zipu**. N'akụkụ nguzozi ahụ, ị ga-ahụ bọtịnụ akara ngosi atọ. Ha enweghị akara ederede, yabụ fegharịa ma ọ bụ pịa ogologo iji hụ aha ha:
   - **Shield One** (ihe mkpuchi a kapịrị ọnụ) na-ebugharị otu adreesị doro anya n'otu oge
   - **Shield All** (ihe mkpuchi siri ike) na-ebugharị ihe niile site na adreesị ọ bụla doro anya n'otu oge
   - **Unshield All** (oghere mkpọchi) na-aga n'ụzọ ọzọ, gaa na adreesị doro anya

> **Shield One bụ nhọrọ nkeonwe karịa.** Ikpuchi ọtụtụ adreesị n'otu azụmahịa na-ejikọ ha n'ihu ọha dị ka nke otu onye ahụ. Zkool dọrọ aka ná ntị gbasara nke a n'onwe ya tupu ọ gbaa Shield All.

6. Nyochaa azụmahịa ahụ ma ziga ya

Unshield All bara uru mgbe ị na-apụ na mgbanwe nke na-anabata naanị adreesị doro anya. Bọtịnụ nchekwa na-apụta naanị ma ọ bụrụ na akaụntụ ahụ nwere adreesị echekwara, na Unshield All naanị ma ọ bụrụ na o nwere adreesị doro anya.

## ZecWallet Lite na mgbake obere akpa ochie na Argos

[ZecWallet Lite](https://github.com/adityapk00/zecwallet-lite) A naghịzi elekọta ya, a na-echekwakwa ebe nchekwa ya. Nha mkpụrụ ya dị iche na nhazi nke obere akpa ego dị ugbu a na-eji, yabụ iwebata otu ahịrịokwu ahụ n'ime obere akpa ego ọgbara ọhụrụ nwere ike imefu ego echekwara na adreesị ndị ọzọ ZecWallet Lite nwetara. [Argos](https://argos.sovright.com), nke Sovright, bụ ebe ọrụ mgbake desktọpụ e wuru maka nke a na ikpe mgbake ndị ọzọ.

Argos na-agụ faịlụ mkpụrụ na obere akpa ZecWallet Lite, zcashd `wallet.dat`, Sapling nke na-anaghị etinye ego n'otu ebe, yana ihe eji emefu Sprout. Maka Sprout, naanị mkpụrụ ZecWallet Lite ezughị ezu n'ihi na e mepụtara igodo ndị ahụ iche iche. Argos bụ ngwaọrụ mgbake, ọ bụghị obere akpa kwa ụbọchị: lelee ihe sitere na ya n'ógbè gị, nyochaa ya, wee jiri obere akpa ị na-achịkwa.

Least Authority [enyochaala](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) ngwaọrụ ahụ. Mgbake n'onwe ya bụ n'efu. Onyinye nhọrọ nye Sovright nwere ike ịpụta n'oge nyocha ahụ.

> **Etinyela mkpụrụ n'ime weebụsaịtị.** Ebe nrụọrụ weebụ Argos bụ naanị nbudata na [ntuziaka onye ọrụ](https://argos.sovright.com/guide.html)Igodo na-anọ na ngwa desktọpụ e denyere aha. Nnwale dị n'ógbè ahụ ma e jiri ya tụnyere checksum BIP-39. Ebe mkpụrụ osisi ahụ na-apụ ozugbo nyocha ahụ malitere. Onye ọ bụla zitere gị ozi na-arịọ mkpụrụ ahụ "iji nyere aka nweta ego gị" na-aghọgbu gị.

### Tupu ị mepee Argos

1. Budata ngwa desktọpụ ahụ site na [Ebe nrụọrụ weebụ Argos gọọmentị](https://argos.sovright.com) ma ọ bụ [GitHub weputara ibe](https://github.com/sovright/argos/releases). Lelee checksum ma ọ bụ mbinye aka mgbe e bipụtara ha.
2. Jiri mwepụta Argos dị ugbu a. Dịka ọ dị na Septemba 18, 2026, **v1.3.0** dị ugbu a ma bụrụ nke a na-ahọrọ. Jiri **v1.2.0 ma ọ bụ karịa maka `wallet.dat` na mgbake Sprout**. Ihe ndị e wuru karịa 1.1.0 ka nwere ike inyocha mana ha na-arụ ọrụ tupu Ironwood nke netwọk jụrụ; melite ma nwaa ọzọ.
3. Rụọ ọrụ na igwe ị tụkwasịrị obi. Họọrọ nzuzo diski zuru oke. Ekekọrịtala ihuenyo mgbe a na-ahụ mkpụrụ, okwuntughe, ma ọ bụ igodo mmefu.
4. Have a destination Unified Address ready from a maintained wallet you control, such as [ZODL](https://zodl.app/). Kwado adreesị dị na obere akpa ahụ tupu ị tinye ya na Argos.

### Mweghachi mkpụrụ

1. Mepee Argos wee họrọ **Enwere m mkpụrụ okwu m nke nwere okwu iri abụọ na anọ**. Mweghachi mkpụrụ anaghị achọ faịlụ obere akpa.
2. Mado ahịrịokwu ahụ wee pịa **Validate mkpụrụ**. Ọ bụrụ na ọ na-ekwu na mkpụrụ ahụ dị irè, gaa n'ihu.
3. Tinye **ogologo blọk ụbọchị ọmụmụ**, ma ọ bụ atụmatụ kacha nso nke oge e kere obere akpa ahụ. Ogologo mbụ dị nwayọ mana dịkwa nchebe karịa ịkọ nkọ n'oge.
4. Under the server controls, use the current-server preset, or enter lightwalletd URLs. Comma-separated URLs are tried in order. Public examples:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Paste the destination Unified Address.
6. Pịa **malite nyocha**. Nke a nwere ike were nkeji ma ọ bụ ụbọchị dabere na ogologo ụbọchị ọmụmụ. Ị nwere ike ịkwụsị ma mepee otu ebe ọrụ ahụ; nyocha ahụ ga-amaliteghachi.
7. Mgbe nyocha ahụ gwụchara, lelee nguzozi, atụmatụ ụgwọ, na ebe a na-aga, wee pịa **sweep**.

Mgbasa ozi nyocha agaghị agbanwe agbanwe. Debe faịlụ akpa ego mbụ ahụ ruo mgbe e wepụrụ olulu mmiri ọ bụla dị mkpa ma obere akpa ego ebe ị na-aga gosi ego a tụrụ anya ya. Ozugbo mgbake ahụ gwụchara, wepụ ihe nzuzo ochie kama ịnọgide na-eji ha eme ihe ọhụrụ.

### Faịlụ obere akpa na igodo ndị nọọrọ onwe ha

N'ihuenyo nnabata, **Enwere m faịlụ obere akpa** na-ekpuchi faịlụ ZecWallet Lite, zcashd `wallet.dat`, ma ọ bụ Sapling nke na-anaghị etinye ego n'otu ebe. Usoro mgbake/CLI nke Argos na-ejikwa mgbake mmefu Sprout nke na-anaghị etinye ego n'otu ebe.

Argos na-agụ faịlụ obere akpa na-agbanweghị ha. Ọ bụrụ na e zoro akpa ahụ ezoro ezo, tinye okwuntughe mgbe a jụrụ ya; a na-eji ya na ebe nchekwa ma edeghị ya na diski. Lelee ọnụọgụ igodo doro anya, Sapling, na Sprout tupu ịmalite nyocha.

A naghị anabata igodo nlele maka nyocha n'ihi na ha enweghị ike inye ikike imefu ego.

### Ihe ndetu Sprout

Mkpụrụ ZecWallet Lite anaghị enweta igodo Sprout. E mepụtara igodo ndị ahụ iche iche. Weghachite Sprout site na zcashd `wallet.dat`, ma ọ bụ site na isi ego ejiri aka ya mee na CLI.

Ọ bụrụ na faịlụ ahụ nwere data ndetu a ga-emefu na onye akaebe echekwara, Argos nwere ike inye **Sweep Sprout ego** na-enweghị nyocha yinye. Ma ọ bụghị ya, ọ nwere ike ịgba ọsọ nyocha zuru oke nke enwere ike ịmegharị na netwọk P2P. Nyocha ahụ buru ibu ma dị nwayọ. Ebe nlele ọ na-ede nwere ike imefu ego, yabụ chebe ya dị ka obere akpa mbụ.

Uru Sprout nwere ike ịdaba naanị na Sapling. Mgbe ego Sapling ahụ kwadoro ma nwee ike imefu ya, bufee ha gaa na **Ironwood** site na obere akpa ego dị ugbu a nke na-akwado akaụntụ Sapling eweghachitere. Akwụsịla na Sapling.

## Ego e weghachitere na ọdọ mmiri Ironwood

Ebe ọ bụ na emelitere Ironwood (NU6.3) na 28 Julaị 2026, ọdọ mmiri Orchard bụ naanị ihe a na-emefu. Enweghị uru ọhụrụ ọ bụla nwere ike itinye ya, uru dị adị na-esikwa na turnstile ahụ banye na Ironwood.

Ọ bụrụ na ego ị nwetara dị na Orchard, jiri **mbugharị akpa ego dị ugbu a** bufee ha na Ironwood. A na-apụ Orchard naanị mgbe NU6.3 gasịrị.

Zkool 6.30.0 dị ugbu a dịka ọ dị na Septemba 18, 2026 ma na-akwado Ironwood. Nhazi mbugharị ya lekwasịrị anya na nzuzo mana ọ bụghị otu ihe ahụ dị ka ịzọrọ na ọ dabara na ZIP 318. Obere akpa ndị ọzọ dị ugbu a nwere ike iji mbugharị ZIP 318. Soro ihuenyo mbugharị ugbu a nke obere akpa arụnyere na ndetu ntọhapụ kama ịmepụta ego ma ọ bụ usoro ntuziaka.

Mbugharị a na-ahazi nwere ike iji ọtụtụ azụmahịa, yabụ mkpokọta ụgwọ nwere ike ịdị elu karịa mbufe otu ugboro.

> **Ọnụọgụ mbugharị bụ nke ọha.** Mgbe uru gafere turnstile ahụ, a na-ahụ ọnụọgụgụ na elu blọk ahụ na yinye n'agbanyeghị na onye zitere na onye nnata ka nọ na-echebe. Jiri amụma mbugharị nkeonwe/usoro nke akpa ego ahụ mgbe nzuzo dị mkpa, ma jiri nzuzo dị larịị netwọk dịka Tor ma ọ bụ oyi akwa nzuzo ọzọ a pụrụ ịtụkwasị obi ebe ọ dị mkpa. Nzuzo netwọk nwere ike zoo njikọ IP gị; ọ naghị ezo ọnụọgụ mbugharị ọha.

## Mgbake miri emi site na iji ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) bụ **ọrụ na-aga n'ihu** Ọrụ mgbake Zingo Labs lekwasịrị anya ugbu a na faịlụ obere akpa ZecWallet Lite na mbugharị usoro obere akpa. README ya na-eduzi ndị ọrụ mgbake ego ugbu a na nhọrọ mbupụ **Zingolib** ebe a ka na-emepụta nkwado ZeWIF zuru oke.

Were ya dị ka ngwaọrụ dị elu/ihe eji eme ihe kama ụzọ mgbake ndabara. Maka mkpụrụ ZecWallet Lite nkịtị, faịlụ obere akpa, zcashd `wallet.dat`, ma kwado igodo mmefu nkeonwe, nwaa Argos mbụ. Lelee ihe ọ bụla ZExCavator weghachitere na obere akpa ego echekwara tupu ị dabere na ya.

## Mgbake ọkachamara mgbe ị na-enweghị mkpụrụ

Ọ bụrụ na mkpụrụ ma ọ bụ igodo ahụ apụọ, restore nke ejiri aka ya weghachite agaghị amalite. Ụfọdụ ndị nọ n'ọnọdụ ahụ na-eji ụlọ ọrụ mgbake ọkachamara maka paswọọdụ echefuru echefu, nsogbu ngwaike, ma ọ bụ diski ndị a na-apụghị ịgụ.

Ụzọ ahụ abụghị otu ihe ahụ dị ka iweghachi mkpụrụ ị ka nwere. Enyela onye ọ bụla kwere nkwa "iweghachite" ya maka gị mkpụrụ na-arụ ọrụ. Ụdị aghụghọ nke ọrụ a bụ ihe a na-ahụkarị.

[Unciphered](https://unciphered.com) bụ otu ụlọ ọrụ na-arụ ọrụ a n'ime ụlọ ma ekpuchila ya n'ebe dịka [Waya nwere waya](https://www.wired.com/story/unciphered-crypto-wallet-recovery/)Ha bụ ọrụ mgbake crypto nkịtị, ọ bụghị ngwaọrụ Zcash kpọmkwem, ha na-anakwa ụgwọ maka ọrụ ahụ. ZecHub anaghị akwado ụlọ ọrụ mgbake ọ bụla. Ọ bụrụ na ị gaa n'ụzọ a, kwado ngalaba gọọmentị n'onwe gị ma chee na onye ọ bụla nke na-akpọ gị DM mbụ bụ onye wayo.

Ọ bụrụ na ị ka nwere mkpụrụ ọrụ ma ọ bụ igodo mmefu, malite site na ụzọ mgbake nkeonwe dịka Zkool ma ọ bụ Argos na igwe nke gị kama.

## A naghịzi elekọta YWallet

YWallet bụ ngwaọrụ mgbake akwadoro na ibe a ruo ogologo oge, ọtụtụ ndị nduzi ochie ka na-atụ aka na ya.

Onye mepụtara ya kwuru ugbu a na YWallet anaghịzi akwado Zcash kemgbe emelitere Ironwood ma na-eduzi ndị ọrụ Zcash na **Zkool**, onye ga-anọchi ya. Chekwaa mkpụrụ/ihe dị mkpa YWallet ochie, mana ebidola mbugharị Zcash ọhụrụ na YWallet.

Ọ bụrụ na ị nwere ihe mgbake Zcash site na YWallet, weghachite ya na Zkool site na iji ụzọ mkpụrụ/isi nkwado dị n'elu.

## Ibe ndị metụtara ya

- [Obere akpa](/using-zcash/wallets) - obere akpa ego a na-edobe na njikere ha maka Ironwood, gụnyere Argos
- [Ironwood](/zcash-tech/ironwood) - ihe mmelite ahụ gbanwere na ihe kpatara ego ji akwaga ebe ọzọ
- [Ihe ncheta](/using-zcash/memos) - otu esi arụ ọrụ ndetu ezoro ezo
- [Igodo Ilele](/zcash-tech/viewing-keys) - ịnweta ịgụ naanị na-enweghị ike imefu ego
- [Ọnụọgụ obere akpa](/zcash-tech/lightwallet-nodes) - public lightwalletd endpoints Argos can use
- [Ntuziaka onye ọrụ Argos](https://argos.sovright.com/guide.html) - usoro mmụta gọọmentị sitere na Sovright
- [Naomi Brockwell na ngwaọrụ mgbake](https://x.com/naomibrockwell/status/2079146521405333526) - Ihe nkiri Argos na ndetu gbasara mgbake ọkachamara
