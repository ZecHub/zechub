<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Zcash Nweghachi Ego e-akpa ego

**Gịnị mere ị ga-eji debe ihe mgbake gị?**

Mkpụrụ, Igodo ego, viewing key, na faịlụ e-akpa ego anaghị edochi ibe ha. Mkpuru mgbake [seed phrase] nwere ike ịmepụta igodo e-akpa ego maka ọtụtụ e-akpa ego, mana ọ naghị edochi igodo ochie ọ bụla ma ọ bụ faịlụ e-akpa ego. Viewing key nwere ike ikpughe ọrụ nke e chebere echebe [shielded] mana ọ nweghị ike inye ikike imefu ego.

Mgbake dabere n'inwe ikike mmefu ziri ezi na ụzọ a na-akwado ugbu a maka pool nke nwere ego ahụ. Debe ihe mgbake gị na nzuzo, ekesala mkpụrụ, Igodo ego, ma ọ bụ faịlụ e-akpa ego nye onye ọ bụla ị na-atụkwasịghị obi.

# Nchekwa na Ọrụ Dịịrị Gị

Ọ dị oke mkpa ka ndị ọrụ ghọta ihe ize ndụ dị n'ijikwa igodo nzuzo ma debe igodo ndị a ka ndị na-enweghị ikike ghara ịnweta ha. Nchekwa ego dabere n'ọrụ dịịrị onye ọrụ ichekwa igodo nzuzo ya.

## Ego ochie nke e chebere echebe: Sprout, Sapling na Orchard

Ọ nwere ike ịdị mkpa ịkwaga Azụmahia [transaction] nke e chebere echebe ochie ZEC dịka akụkụ nke mgbake. Ụzọ a dabere na pool nke e chebere echebe nke nwere ego ugbu a.

> **A na-eme atụmatụ NU7 maka Novemba 5, 2026.** Ozugbo ọ malitere, ụzọ mbugharị ugbu a si na pool Sprout ochie ga-akwụsị ịrụ ọrụ.
>
> Ọ bụrụ na ị ka nwere ZEC n'ime pool Sprout, bugharịa ya tupu nkwalite ahụ. Mgbe ọ malitere, ngwá ọrụ ndị dị ugbu a agaghịzi enwe ike ibugharị ego Sprout gaa na Sapling, Adreesị akpa ego Oha, ma ọ bụ ebe ọ bụla ọzọ.
>
> Ọ bụrụ na ị na-ele peeji a **mgbe NU7** malitechara, **Sprout anọgidesịrị n'ime akpụrụ mmiri** ruo mgbe usoro mgbake n'ọdịnihu dị, nke anaghị eme atụmatụ ya ugbu a.

## Azịza ya n'otu peeji

| Ego gị dị na | Ụzọ mbugharị | Ihe ị ga-eme |
| --- | --- | --- |
| **Sprout** | **Sprout → Sapling → Ironwood** | Ọ bụrụ na ị nwere `wallet.dat` ma ọ bụ Igodo ego Sprout nọọrọ onwe ya, buru ụzọ nwalee ụzọ mgbake Argos dị ugbu a. Ọ bụrụ na Argos adịghị mma, jiri ụzọ sidecar ochie dị na ntuziaka ubi zuru ezu. Sprout ga-ebu ụzọ rute na Sapling, emesịa ebufee ya gaa na Ironwood. Ụzọ a na-adabere n'oge n'ihi NU7. |
| **Sapling** | **Sapling → Ironwood** | Ọ dịghị gburugburu mgbake Sprout achọrọ. Jiri e-akpa ego dị ugbu a nke nwere ike ịweghachi ma ọ bụ mefuo akaụntụ Sapling gị kpọmkwem ma wuo Azụmahia Ironwood. Nkwado Ironwood naanị ya anaghị egosi nkwado mgbake Sapling ochie. |
| **Orchard** | **Orchard → Ironwood** | Orchard bụ naanị maka ịpụ. Jiri usoro mbugharị Orchard-na-Ironwood arụnyere n'ime e-akpa ego dakọtara ugbu a. Lee [Ego eweghachiri na pool Ironwood](#recovered-funds-and-the-ironwood-pool). |

### Usoro mkpebi nke ajụjụ ise

1. **Ọ bụ Sprout?** Mkpuru mgbake naanị ya na-atụ aka n'ụzọ mgbake oge Sapling/Orchard mechara, ọ bụghị Sprout. Adreesị akpa ego `zc...`, ma ọ bụ e-akpa ego eweghachiri na-akọpụta nguzozi Sprout, na-atụ aka na Sprout.
2. **Kedu ihe mgbake ị nwere?** Chọọ `wallet.dat`, kọmputa ochie ma ọ bụ datadir, ndabere `z_exportwallet`, ma ọ bụ Igodo ego Sprout ebupụtala. Adreesị akpa ego `zc...` naanị ya ezughị.
3. **Argos ka ọ bụ sidecar ochie?** Ọ bụrụ na ị nwere `wallet.dat` ma ọ bụ Igodo ego Sprout nọọrọ onwe ya ma naanị ịchọrọ iwepụta ego ahụ, buru ụzọ nwalee [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Jiri ụzọ sidecar ochie dị na ntuziaka ubi zuru ezu ma ọ bụrụ na Argos enweghị ike ijikwa ihe ahụ ma ọ bụ ọ bụrụ na ịchọrọ ka nchịkọta mgbake zuru ezu dị n'okpuru njikwa nke gị.
4. **Ị nweelarị datadir zcashd emekọrịtara, nke a na-egbutụghị?** Nke a dị mkpa naanị maka ụzọ sidecar ochie. Detuo data node dị ugbu a naanị mgbe emechichara ya nke ọma; ma ọ bụghị ya, ntuziaka ubi ahụ na-ekpuchi nhọrọ snapshot/site na-amalite site na mbụ.
5. **Ebee ka ego ahụ ga-ejedebe?** **Ironwood.** Sprout na-agafe Sapling mbụ n'ihi na ọ dịghị otu Azụmahia kpọmkwem si na Sprout gaa Ironwood. Akwụsịla na Sapling.

### Ntuziaka Ubi Zuru Ezu Maka Mbugharị Pool ZEC

Maka ntụaka mbugharị zuru ezu, gụnyere ụzọ mgbake zuru ezu, iwu, ugwo [fee], ihe achọrọ maka hardware, echiche gbasara Nzuzo [privacy], idozi nsogbu, na ndetu isi mmalite, gụọ ntuziaka zuru ezu.

**Ụdị 1.1 · Emelitere Septemba 18, 2026**

[Gụọ Ntuziaka Ubi Zuru Ezu Maka Mbugharị Pool ZEC na ZecHub](/research/zec-pool-migration/view)

> **Tupu ịmalite:** buru ụzọ chọpụta **ihe ị na-eweghachi na ihe mgbake ị ka nwere**. Mkpuru e-akpa ego dị ugbu a ma ọ bụ Igodo ego na-abụghị Sprout a na-akwado nwere ike ịchọ naanị iweghachi nkịtị. Ihe ochie — dịka mkpụrụ Zecwallet Lite, `wallet.dat` ochie, ma ọ bụ Igodo ego Sapling ma ọ bụ Sprout nọọrọ onwe ya — nwere ike ịchọ ụzọ mgbake pụrụ iche.
>
> Ọ bụrụ na i chere na ego ahụ dị na **Sprout**, gosi na ị ka nwere ikike mmefu tupu i wepụta oge maka mgbake. Adreesị akpa ego `zc...` ma ọ bụ naanị ihe nlele ezughị iji bugharịa ego ahụ.
>
> **YWallet anaghịzi akwado Zcash mgbe Ironwood gasịrị.** Jiri **Zkool** maka nlọghachi nkịtị na-abụghị Sprout sitere na mkpụrụ na igodo a na-akwado. Jiri **Argos** maka mgbake Zecwallet Lite, faịlụ e-akpa ego ochie, na Igodo ego Sapling/Sprout nọọrọ onwe ha. Maka Sprout, Argos bụ ụzọ mbụ ị ga-anwale; ntuziaka ubi zuru ezu na-ekpuchi ụzọ sidecar ochie ọzọ.
>
> Jiri tebụl dị n'okpuru dabere na **ihe ị nwere n'ezie**, ọ bụghị ngwá ọrụ mgbake ị chetara iji.

| Ị nwere | Bido ebe a |
| --- | --- |
| Mkpuru mgbake ma ọ bụ **Igodo ego na-abụghị Sprout** a na-akwado sitere na e-akpa ego dị ugbu a ma ọ bụ nke e lekọtara anya n'oge na-adịbeghị anya, gụnyere ihe ochie YWallet Zcash | [Zkool](#fund-recovery-with-zkool) |
| **Viewing key naanị** | Zkool nwere ike ibubata viewing key a na-akwado maka ohere naanị ọgụgụ, mana viewing key enweghị ike inye ikike mmefu maka mgbake. Chọta mkpụrụ ma ọ bụ Igodo ego kwekọrọ na ya. |
| Mkpụrụ okwu 24 **Zecwallet Lite** | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos) |
| Zecwallet Lite ma ọ bụ zcashd `wallet.dat`, ma ọ bụ Igodo ego Sapling / Sprout nọọrọ onwe ya | [Argos](#zecwallet-lite-and-legacy-wallet-recovery-with-argos). Site na Septemba 18, 2026, v1.3.0 bụ ụdị dị ugbu a na nke ka mma; jiri v1.2.0 ma ọ bụ nke ọhụrụ maka mgbake `wallet.dat` na Sprout. |
| Ihe Sprout nke Argos enweghị ike ijikwa, ma ọ bụ mgbake ebe ịchọrọ ka ihe ndị ochie dị n'okpuru njikwa nke gị | Jiri ụzọ sidecar ochie dị na [ntuziaka ubi zuru ezu](/research/zec-pool-migration/view). |
| Ọ dịghị mkpụrụ ma ọ bụ Igodo ego na-arụ ọrụ, mana ngwaọrụ akpọchiri akpọchi, okwuntughe echefuru, ma ọ bụ diski dara ada | [Mgbake ọkachamara](#professional-recovery-when-you-do-not-have-the-seed). Ezitela onye kpọtụrụ gị n'amaghị ama mkpụrụ ma ọ bụ Igodo ego na-arụ ọrụ. |

## Mgbake Ego na Zkool

[Zkool](https://github.com/hhanh00/zkool2/releases) bụ onye nọchiri Zcash nke a na-elekọta anya maka YWallet, sitere n'aka otu onye mmepụta. Ọ na-akwado ụzọ mgbake Oha na nke e chebere echebe nke oge a, gụnyere igodo Sapling ochie, mana **ọ bụghị Sprout**.

E kpuchiri ọnọdụ abụọ ebe a:

1. **Iweghachi akaụntụ** site na Mkpuru mgbake, igodo nzuzo, ma ọ bụ viewing key
2. **Ikwapụ ego** n'e-akpa ego nke kwadoro naanị Adreesị akpa ego Oha

### 1) Iweghachi Akaụntụ

1. Wụnye Zkool site na [peeji releases](https://github.com/hhanh00/zkool2/releases) ma mepee ya
2. Na **Account Manager** (peeji isi), pịa bọtịnụ **+** ka i ruo ihuenyo **New Account**
3. Tinye **Aha Akaụntụ** iji mata akaụntụ a
4. Gbanwuo **Restore Account?**. Nke a na-egosi oghere igodo na ogo ọmụmụ
5. Mado igodo gị n'ime **Key (Seed Phrase, Private Key, or Viewing Key)**. Zkool na-anabata mkpuru mgbake, igodo nzuzo Sapling, igodo Oha agbatịpụrụ, na viewing key a na-akwado. Viewing key bụ naanị maka ọgụgụ ma enweghị ike inye ikike mmefu.
6. Tinye **Ogo Ọmụmụ** maka akaụntụ ochie. Zkool anaghị enyocha block tupu ogo a, ya mere họrọ ogo tupu ọrụ mbụ e-akpa ego ma ọ bụrụ na ị maghị n'aka. Ogo ọmụmụ a tọrọ n'oge nwere ike ime ka ezigbo Azụmahia yie ka ha efuola.

![Zkool New Account screen with Restore Account and Advanced Options both turned on](/content-images/zkool-restore-account-60b1d2777e.webp)

7. Chekwaa akaụntụ ahụ, mesịa mekọrịta ya

### Iweghachi mkpụrụ sitere n'e-akpa ego ọzọ

Ọ bụrụ na mkpụrụ ahụ si n'e-akpa ego na-agbaso ZIP 316 — gụnyere ZODL (nke a na-akpọbu Zashi), Zingo, ma ọ bụ zcashd — gbanye **Advanced Options** ma mee ka **Use Internal Change** rụọ ọrụ tupu ịchekwaa.

ZIP 316 na-eji Adreesị akpa ego nke ime/mgbanwe dị iche. Iweghachi otu n'ime akaụntụ ndị a na-enweghị **Use Internal Change** nwere ike ime ka nsonaazụ mgbanwe yie ka ha efuola n'agbanyeghị na ego ahụ ka dị.

Oghere abụọ ọzọ dị n'okpuru **Advanced Options**:

- **Extra Passphrase (optional)**, naanị ma ọ bụrụ na e-akpa ego mbụ jiri otu
- **Account Index**, ma ọ bụrụ na e-akpa ego mbụ nwere ọtụtụ akaụntụ n'otu mkpụrụ. Ego ahụ nwere ike ịdị n'okpuru index ọzọ

> **Ndị a abụọ pụtara naanị mgbe mkpuru mgbake ziri ezi dị n'oghere Key.** Mgbe oghere ahụ tọgbọ chakoo, ma ọ bụ nwee igodo nzuzo ma ọ bụ viewing key, Zkool na-egosi naanị **Use Internal Change** na **H/W Ledger**. Buru ụzọ mado mkpụrụ ahụ, mesịa mepee Advanced Options.

### 2) Ikwapụ Ego Site n'E-akpa Ego Naanị Oha

Ọ bụrụ na e-akpa ego ma ọ bụ akaụntụ ochie nwere naanị **ZEC Oha**, buru ụzọ weghachi akaụntụ ahụ, chọta Adreesị akpa ego Oha niile ejirila, mesịa bugharịa ego ahụ gaa ebe nke e chebere echebe dị ugbu a ị na-achịkwa. Echela na Akara ngosi e-akpa ego ochie bụ naanị Oha mgbe niile; ụfọdụ ngwaahịa tinyere nkwado nke e chebere echebe n'ụdị ndị mechara.

1. Weghachite akaụntụ ahụ site n'iji usoro ndị dị n'elu
2. Mepee akaụntụ ahụ wee gaa na peeji **Receive Funds**
3. Pịa iko na-ebuli elu dị na ogwe elu (**Find other transparent addresses**). E-akpa ego ndị na-atụgharị Adreesị akpa ego, dịka Ledger na Exodus, na-emepụta ọtụtụ Adreesị akpa ego Oha site n'otu mkpụrụ, nke a na-achọta ndị nwere ego
4. **Tọgharịa ma mekọrịta akaụntụ ahụ emesịa.** Adreesị akpa ego ndị a chọpụtara ọhụrụ na-enweta nguzozi ha naanị n'enyocha ọzọ, ya mere ịhapụ nke a na-eme ka o yie na ikwapụ ahụ enweghị ihe ọ bụla ọ chọpụtara
5. Gaa na peeji **Send**. N'akụkụ nguzozi, ị ga-ahụ bọtịnụ akara ngosi atọ. Ha enweghị akara ederede, ya mere debe cursor n'elu ha ma ọ bụ pịa ogologo ka ịhụ aha ha:
   - **Shield One** (ọta akọwapụtara) na-ebufe otu Adreesị akpa ego Oha n'otu oge
   - **Shield All** (ọta siri ike) na-ebufe ihe niile site na Adreesị akpa ego Oha ọ bụla n'otu oge
   - **Unshield All** (mkpọchi mepere emepe) na-aga n'akụkụ ọzọ, banye n'ime Adreesị akpa ego Oha

> **Shield One bụ nhọrọ Nzuzo karịa.** Ichebe ọtụtụ Adreesị akpa ego n'otu Azụmahia na-ejikọta ha n'ihu ọha dị ka nke otu onye. Zkool na-adọkwa aka ná ntị maka nke a tupu ọ gbaa Shield All.

6. Nyochaa Azụmahia ahụ ma zipụ ya

Unshield All bara uru mgbe ị na-ewepụ ego gaa exchange nke na-anabata naanị Adreesị akpa ego Oha. Bọtịnụ nchebe na-apụta naanị ma ọ bụrụ na akaụntụ ahụ nwere Adreesị akpa ego nke e chebere echebe, Unshield All pụtakwa naanị ma ọ bụrụ na ọ nwere nke Oha.

## Zecwallet Lite na mgbake e-akpa ego ochie na Argos

[Zecwallet Lite](https://github.com/adityapk00/zecwallet-lite) anaghịzi elekọta ya, echekwala repository ya. Mepụta mkpụrụ ya dị iche na nhazi e-akpa ego dị ugbu a na-eji, ya mere ibubata otu ahịrịokwu ahụ n'e-akpa ego nke oge a nwere ike ghara ịhụ ego e nwere na Adreesị akpa ego ndị ọzọ Zecwallet Lite mepụtara. [Argos](https://argos.sovright.com), sitere na Sovright, bụ oghere ọrụ mgbake desktop e wuru maka nke a na ọnọdụ mgbake ochie ndị ọzọ.

Argos na-agụ mkpụrụ Zecwallet Lite na faịlụ e-akpa ego, zcashd `wallet.dat`, Igodo ego agbatịpụrụ Sapling nọọrọ onwe ya, na ihe mmefu Sprout. Maka Sprout, mkpụrụ Zecwallet Lite naanị ya ezughị n'ihi na e mepụtara igodo ndị ahụ iche. Argos bụ ngwá ọrụ mgbake, ọ bụghị e-akpa ego kwa ụbọchị: nyochaa ihe mmalite n'ime ngwaọrụ gị, nyocha, mesịa kwakọba ego ahụ n'e-akpa ego a na-elekọta anya ị na-achịkwa.

Least Authority [enyochala](https://argos.sovright.com/assets/least-authority-argos-audit-2026-06-29.pdf) ngwá ọrụ ahụ. Mgbake n'onwe ya bụ n'efu. Onyinye nhọrọ nye Sovright nwere ike ịpụta mgbe ị na-akwakọba ego.

> **Etinyela mkpụrụ n'ime weebụsaịtị.** Saịtị Argos bụ naanị maka nbudata na [ntuziaka onye ọrụ](https://argos.sovright.com/guide.html). Igodo na-adị n'ime ngwa desktop e binyere aka. Nkwado na-adị n'ime ngwaọrụ megide checksum BIP-39. Oghere mkpụrụ na-ehichapụ ozugbo nyocha malitere. Onye ọ bụla zitere gị ozi na-arịọ mkpụrụ ahụ “iji nyere gị aka iweghachi ego gị” na-aghọgbu gị.

### Tupu ị mepee Argos

1. Budata ngwa desktọpụ site na saịtị gọọmentị [Argos](https://argos.sovright.com) ma ọ bụ ibe mwepụta [GitHub](https://github.com/sovright/argos/releases). Nyochaa checksums ma ọ bụ signature mgbe e bipụtara ha.
2. Jiri mwepụta Argos dị ugbu a. Ruo Septemba 18, 2026, **v1.3.0** bụ nke dị ugbu a ma kacha akwado. Jiri **v1.2.0 ma ọ bụ nke ka ọhụrụ maka mgbake `wallet.dat` na Sprout**. Build ndị tọrọ 1.1.0 ka nwere ike ịnyocha, mana ha na-emepụta sweeps tupu Ironwood nke netwọk na-ajụ; melite ma gbalịa ọzọ.
3. Rụọ ọrụ na kọmputa ị tụkwasịrị obi. Họrọ Nzobe ederede [encryption] nke diski dum. Ekekọrịtala ihuenyo mgbe Mkpuru mgbake [seed phrase], passphrase, ma ọ bụ Igodo ego [spending key] pụtara ìhè.
4. Kwadebe Adreesị akpa ego Otu [Unified Address] ebe ị ga-eziga ego, sitere na e-akpa ego ị na-achịkwa nke a na-elekọta nke ọma, dịka [ZODL](https://zodl.com/). Kwenye Adreesị akpa ego ahụ n’e-akpa ego ahụ tupu ị mado ya n’ime Argos.

### Mgbake mkpụrụ

1. Mepee Argos wee họrọ **I have my 24-word seed phrase**. Mgbake mkpụrụ anaghị achọ faịlụ e-akpa ego.
2. Mado ahịrịokwu ahụ ma pịa **Validate seed**. Ọ bụrụ na ọ sị na mkpụrụ ahụ ziri ezi, gaa n'ihu.
3. Tinye **ogo block ụbọchị ọmụmụ**, ma ọ bụ atụmatụ kacha nso nke oge e mepụtara e-akpa ego ahụ. Ogo mbụ dị nwayọ karịa mana ọ dị nchebe karịa ịkọ nkọ n'oge.
4. N'okpuru njikwa sava, jiri preset sava dị ugbu a, ma ọ bụ tinye URL lightwalletd. A na-anwale URL ndị comma kewara n'usoro. Ọmụmaatụ ọha:

   `https://zec.rocks:443,https://zec-node.cakewallet.com:443,https://na.zec.rocks:443`

5. Mado Unified Address ebe a ga-ezigara ego.
6. Pịa **start scan**. Nke a nwere ike iwe nkeji ma ọ bụ ụbọchị dabere n'ogo block ụbọchị ọmụmụ. Ị nwere ike ịpụ ma mepee otu oghere ọrụ ahụ ọzọ; nyocha ahụ na-aga n'ihu.
7. Mgbe nyocha kwụsịrị, nyochaa nguzozi, atụmatụ ugwo, na ebe a ga-ezigara ego, mesịa pịa **sweep**.

Ịgbasa sweep enweghị ike ịgbanwe. Debe faịlụ e-akpa ego mbụ ruo mgbe a kwakọbara pool ọ bụla dị mkpa ma e-akpa ego ebe a na-aga gosiri ego a tụrụ anya ya. Ozugbo mgbake zuru ezu, kwụsị iji ihe nzuzo ochie kama ịga n'ihu iji ha maka ọrụ ọhụrụ.

### Faịlụ e-akpa ego na igodo nọọrọ onwe ha

Na ihuenyo nnabata, **I have a wallet file** na-ekpuchi faịlụ Zecwallet Lite, zcashd `wallet.dat`, ma ọ bụ Igodo ego agbatịpụrụ Sapling nọọrọ onwe ya. A na-eji ụzọ mgbake Argos Sprout/CLI edozi mgbake Igodo ego Sprout nọọrọ onwe ya.

Argos na-agụ faịlụ e-akpa ego na-enweghị ịgbanwe ha. Ọ bụrụ na e zoro ezo e-akpa ego ahụ, tinye passphrase mgbe a jụrụ; a na-eji ya n'ime ebe nchekwa ma anaghị ede ya na diski. Nyochaa ọnụ ọgụgụ igodo Oha, Sapling, na Sprout tupu ịmalite nyocha.

A naghị anabata viewing key maka sweep n'ihi na ha enweghị ike inye ikike mmefu.

### Ndụmọdụ Sprout

Mkpụrụ Zecwallet Lite anaghị emepụta igodo Sprout. E mepụtara igodo ndị ahụ iche. Weghachite Sprout site na zcashd `wallet.dat`, ma ọ bụ site na Igodo ego nọọrọ onwe ya na CLI.

Ọ bụrụ na faịlụ ahụ enweelarị data note nwere ike imefu na witness echekwara, Argos nwere ike inye **Sweep ego Sprout** na-enweghị nyocha chain. Ma ọ bụghị ya, ọ nwere ike ịgba nyocha block zuru ezu nwere ike ịga n'ihu n'elu netwọk P2P. Nnyocha ahụ buru ibu ma dị nwayọ. Checkpoint ọ na-ede nwere ike imefu ego, ya mere chebe ya dịka faịlụ e-akpa ego mbụ.

Uru Sprout nwere ike ịda naanị na Sapling. Mgbe ekwenyesịrị ego Sapling ma nwee ike imefu, bugharịa ya gaa **Ironwood** site n'e-akpa ego dị ugbu a na-akwado akaụntụ Sapling eweghachiri. Akwụsịla na Sapling.

## Ego eweghachiri na pool Ironwood

Kemgbe nkwalite Ironwood (NU6.3) malitere na 28 Julaị 2026, pool Orchard bụ naanị maka mmefu. Ọ dịghị uru ọhụrụ nwere ike ịbanye ya, uru dị ugbu a na-apụ site na turnstile gaa Ironwood.

Ọ bụrụ na ego ị weghachiri dị na Orchard, bugharịa ya gaa Ironwood site na **usoro mbugharị arụnyere n'ime e-akpa ego dị ugbu a**. Orchard bụ naanị maka ịpụ mgbe NU6.3 gasịrị.

Zkool 6.30.0 bụ ụdị dị ugbu a site na Septemba 18, 2026 ma na-akwado Ironwood. Nhazi mbugharị ya lekwasịrị anya na Nzuzo mana ọ bụghị otu ihe na ịsị na o kwekọrọ na ZIP 318. E-akpa ego ndị ọzọ dị ugbu a nwere ike iji mbugharị nkeji n'usoro ZIP 318. Soro ihuenyo mbugharị na ndetu release nke e-akpa ego arụnyere ugbu a kama ịmepụta ego ma ọ bụ usoro n'onwe gị.

Mbugharị nkeji n'usoro nwere ike iji ọtụtụ Azụmahia, ya mere ngụkọta ugwo nwere ike ịkarị nke nnyefe otu ugboro.

> **Ọnụ ọgụgụ mbugharị bụ ọha.** Mgbe uru gafere turnstile, ego na ogo block na-apụta ìhè na chain n'agbanyeghị na onye zitere na onye natara ka bụ nke e chebere echebe. Jiri amụma mbugharị nzuzo/nkeji n'usoro arụnyere n'ime e-akpa ego mgbe Nzuzo dị mkpa, ma jiri Nzuzo ọkwa netwọk dịka Tor ma ọ bụ oyi akwa Nzuzo ọzọ ị tụkwasịrị obi mgbe o kwesịrị ekwesị. Nzuzo netwọk nwere ike izochi njikọ IP gị; ọ naghị ezobe ego ọha na-agafe.

## Mgbake Miri Emi na ZExCavator

[ZExCavator](https://github.com/zingolabs/zexcavator) bụ ọrụ mgbake Zingo Labs **ka na-aga n'ihu** nke lekwasịrị anya ugbu a na faịlụ e-akpa ego Zecwallet Lite na mbugharị usoro faịlụ e-akpa ego. README ya na-agwa ndị ọrụ mgbake ego ugbu a ka ha jiri nhọrọ mbupụ **Zingolib** ebe nkwado ZeWIF zuru ezu ka na-emepụta.

Were ya dịka ngwá ọrụ dị elu/maka ọnọdụ pụrụ iche kama ụzọ mgbake ndabere. Maka mkpụrụ Zecwallet Lite nkịtị, faịlụ e-akpa ego, zcashd `wallet.dat`, na Igodo ego nọọrọ onwe ya a na-akwado, buru ụzọ nwalee Argos. Nyochaa ihe ọ bụla ZExCavator weghachiri n'e-akpa ego a na-elekọta anya tupu ịdabere na ya.

## Mgbake ọkachamara mgbe ị nweghị mkpụrụ

Ọ bụrụ na mkpụrụ ma ọ bụ igodo efuola, nlọghachi i mere n'onwe gị enweghị ike ịmalite. Ụfọdụ ndị nọ n'ọnọdụ ahụ na-eji ụlọ ọrụ mgbake ọkachamara maka okwuntughe echefuru, ọdịda hardware, ma ọ bụ diski a na-agụghị agụ.

Ụzọ ahụ abụghị otu na iweghachi mkpụrụ ị ka nwere. Enyela onye ọ bụla nyere gị aka nkwado mkpụrụ na-arụ ọrụ. Ụdị aghụghọ nke ọrụ a na-adịkarị.

[Unciphered](https://unciphered.com) bụ otu ụlọ ọrụ na-arụ ọrụ a n'ime ụlọ, a kọwakwala ya n'ebe dịka Wired. Ha bụ ọrụ mgbake crypto n'ozuzu, ọ bụghị ngwá ọrụ kpọmkwem maka Zcash, ha na-akwụkwa ugwo maka ọrụ ahụ. ZecHub anaghị akwado ụlọ ọrụ mgbake ọ bụla. Ọ bụrụ na ị ga-eso ụzọ a, gosi domain gọọmentị ahụ n'onwe gị ma were onye ọ bụla zitere gị DM mbụ dị ka onye aghụghọ.

Ọ bụrụ na ị ka nwere mkpụrụ ma ọ bụ Igodo ego na-arụ ọrụ, bido site n'ụzọ mgbake i mere n'onwe gị dịka Zkool ma ọ bụ Argos n'igwe nke gị kama.

## YWallet anaghịzi elekọta ya

YWallet bụ ngwá ọrụ mgbake akwadoro na peeji a ogologo oge, ọtụtụ ntuziaka ochie ka na-atụ aka na ya.

Onye mmepụta ya kwuru ugbu a na YWallet anaghịzi akwado Zcash kemgbe mmelite Ironwood ma na-atụzi ndị ọrụ Zcash aka na **Zkool**, onye nọchiri ya a na-elekọta anya. Debe ihe mkpụrụ/igodo YWallet ochie, mana ebidola mbugharị Zcash ọhụrụ na YWallet.

Ọ bụrụ na i nwelarị ihe mgbake Zcash sitere na YWallet, weghachite ya na Zkool site n'iji ụzọ mkpụrụ/igodo a na-akwado dị n'elu.

## Peeji metụtara

- [E-akpa ego](/using-zcash/wallets) - e-akpa ego ndị a na-elekọta anya na nkwadebe Ironwood ha, gụnyere Argos
- [Ironwood](/zcash-tech/ironwood) - ihe nkwalite ahụ gbanwere na ihe mere ego ji akwaga
- [Memo](/using-zcash/memos) - ka memo e zoro ezo si arụ ọrụ
- [Viewing Key](/zcash-tech/viewing-keys) - ohere naanị ọgụgụ na-enweghị ike mmefu
- [Node Lightwallet](/zcash-tech/lightwallet-nodes) - endpoints lightwalletd ọha Argos nwere ike iji
- [Argos ntuziaka onye ọrụ](https://argos.sovright.com/guide.html) - nduzi gọọmentị sitere na Sovright
- [Naomi Brockwell banyere ngwá ọrụ mgbake](https://x.com/naomibrockwell/status/2079146521405333526) - nduzi Argos na ndetu gbasara mgbake ọkachamara
