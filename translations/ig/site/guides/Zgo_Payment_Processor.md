<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZGo Onye nhazi Kwụọ ụhwọ [Payment Processor]: Ịnabata Zcash Na-enweghị Onye nlekota

ZGo bụ onye nhazi Kwụọ ụhwọ na-enweghị Onye nlekota maka Zcash. Onye ahịa na-akwụ ụgwọ na ZEC site n’e-akpa ego [wallet] nke ha, ZGo na-enyocha blockchain Zcash maka Azụmahia [transaction], ego ahụ eruo e-akpa ego onye ọchụnta ego ozugbo site na nnyefe nke e chebere echebe [shielded]. ZGo anaghị ejide ego ahụ n’etiti.

Ntuziaka a na-akọwa otú usoro Kwụọ ụhwọ si arụ ọrụ, otú e si ahazi akaụntụ [account], na otú e si ejikọta ZGo na Xero na WooCommerce. Ọ na-ekpuchikwa mmejọ abụọ na-akpata ọtụtụ nsogbu n’oge nhazi mbụ.

## N’ibe a

1. [Ihe kpatara iji ZGo](#why-use-zgo)
2. [Otu ZGo si arụ ọrụ](#how-zgo-works)
3. [Ịhazi akaụntụ](#setting-up-an-account)
4. [ZGo na Xero](#zgo-with-xero)
5. [ZGo na WooCommerce](#zgo-with-woocommerce)
6. [Njirimara](#features)
7. [Mmejọ ndị a na-ahụkarị](#common-mistakes)
8. [Mmechi](#conclusion)
9. [Akụrụngwa](#resources)

## Ihe kpatara iji ZGo

Ọtụtụ ndị nhazi Kwụọ ụhwọ cryptocurrency bụ Onye nlekota [custodial]. Ego ahụ na-ebu ụzọ abanye n’akaụntụ onye nhazi, e mesịa eziga ya n’aka onye ọchụnta ego; nke a pụtara na ndị ọzọ na-achịkwa ego ahụ nwa oge, ha nwekwara ike ifriizi, igbu oge, ma ọ bụ kọọ maka ya.

ZGo na-eji ụzọ dị iche kpamkpam. Kwụọ ụhwọ [Payments] na-esi n’e-akpa ego [wallet] nke onye ahịa ozugbo gaa n’e-akpa ego nke onye na-ere ahịa site n’Azụmahia nke e chebere echebe [shielded transaction] nke Zcash. Onye nhazi ahụ na-emepụta naanị invoice ma na-ele blockchain anya maka nkwenye. Enweghị nguzozi etiti, usoro iwepụ ego, ma ọ bụ onye nke atọ nwere ike igbu oge na mmecha.

Maka onye ọchụnta ego, nke a pụtara ihe atọ bara uru: njide zuru oke nke ZEC na-abata, Nzuzo [privacy] nke Azụmahia nke e chebere echebe site na ndabara, na enweghị ịdabere na onye na-eweta ọrụ etiti ịnọ n’ịntanetị ma ọ bụ ịnọgide nwee ike ịkwụ ụgwọ.

## Otu ZGo si arụ ọrụ

Usoro Kwụọ ụhwọ bụ otu, n’agbanyeghị ma ejiri ZGo naanị ya, site na Xero, ma ọ bụ site na WooCommerce:

1. Onye ọchụnta ego na-emepụta arịrịọ Kwụọ ụhwọ na ZGo, nke na-apụta dị ka koodu QR nwere ego ole, ID invoice, na Adreesị akpa ego [address] nnata Zcash.
2. Onye ahịa na-eji e-akpa ego Zcash enyocha QR ahụ (Orchard, Sapling, na ụdị Adreesị Oha [transparent] niile ka akwadoro na plugin WordPress) wee kwado Kwụọ ụhwọ ahụ.
3. A na-ebipụta Azụmahia ahụ na netwọk Zcash dịka nnyefe nke e chebere echebe sitere n’e-akpa ego onye ahịa gaa n’e-akpa ego onye ọchụnta ego.
4. ZGo na-enyocha blockchain Zcash maka Azụmahia ahụ.
5. Mgbe nkwenye ise gachara, ZGo na-akara Kwụọ ụhwọ ahụ akara ikpeazụ wee gwa njikọta ọ bụla e jikọrọ (Xero, WooCommerce, ma ọ bụ webhook).

Ọnụ ọgụgụ nkwenye ise bụ isi ihe dị mkpa. Ihe ọ bụla tupu ya bụ Kwụọ ụhwọ na-aga n’ihu, ọ bụghị Kwụọ ụhwọ anabatara. Mmezu iwu, mmelite ngwa ahịa, na omume ọ bụla a na-apụghị ịgbanwe n’akụkụ onye ọchụnta ego kwesịrị ichere nzọụkwụ 5.

ZGo na-arụ ọrụ n’ihe nchọgharị ọ bụla nke oge a na kọmputa ma ọ bụ ekwentị, na-enweghị nrụnye n’akụkụ abụọ ahụ. Onye ahịa chọrọ e-akpa ego Zcash; onye ọchụnta ego chọrọ e-akpa ego Zcash na akaụntụ ZGo.

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="/content-images/de50885b-b068-4157-bbda-0981ca23efc8-a00a274776.webp" />

## Ịhazi akaụntụ

Iji mepụta akaụntụ ZGo, a chọrọ e-akpa ego Zcash nwere obere ego ZEC. Obere nguzozi ZEC ahụ na-ekpuchi ugwo [fee] on-chain maka Azụmahia mmalite akaụntụ. E-akpa ego Zcash ọ bụla a ma ama na-arụ ọrụ maka nke a; lee [ZecHub Wallets](https://zechub.wiki/wallets) maka nhọrọ ndị dị ugbu a.

Nhazi bụ isi:

1. Mepee [zgo.cash](https://zgo.cash/) n’ihe nchọgharị.
2. Jiri e-akpa ego Zcash nke onye ọchụnta ego na-achịkwa mepụta akaụntụ. E-akpa ego a ga-enwerịrị mkpịsị ugodi. Adreesị nkwụnye ego exchange agaghị arụ ọrụ (lee [Mmejọ ndị a na-ahụkarị](#common-mistakes)).
3. Kwenye e-akpa ego ahụ site n’iziga obere Azụmahia mmalite.
4. Hazie Adreesị akpa ego nnata. Kwụọ ụhwọ niile a na-ahazi site n’akaụntụ a ga-abanye n’e-akpa ego a.

Ozugbo akaụntụ ahụ rụọ ọrụ, otu onye ọchụnta ego ahụ nwere ike iji ZGo maka Kwụọ ụhwọ otu oge (otu koodu QR n’mmemme pop-up) ma ọ bụ jikọọ ya na nhazi na-adịgide adịgide site na Xero ma ọ bụ WooCommerce.

## ZGo na Xero

[Xero](https://www.xero.com/) bụ ikpo okwu ndekọ ego nke igwe ojii ọtụtụ obere azụmahịa na azụmahịa ọkara na-eji. Njikọta ZGo–Xero na-ekwe ka onye ọchụnta ego wepụta invoice na Xero, onye ahịa kwụọ ya na ZEC, ka Xero wee kaa invoice ahụ akara na akwụla ya ozugbo Azụmahia ahụ kwadoro.

Otu o si arụ ọrụ:

1. Onye ọchụnta ego na-emepụta invoice na Xero dịka ọ na-adị.
2. ZGo na-agbakwunye nhọrọ Kwụọ ụhwọ Zcash na invoice ahụ.
3. Onye ahịa na-akwụ na ZEC site n’e-akpa ego ha.
4. ZGo na-enyocha [Zcash blockchain](https://z.cash/) maka Azụmahia ahụ.
5. Mgbe nkwenye ise gachara, ZGo na-akọpụta Kwụọ ụhwọ ahụ na Xero, nke na-akara invoice ahụ akara dị ka nke edoziworo.

ZEC na-abanye n’e-akpa ego onye ọchụnta ego, ọ bụghị n’akaụntụ ọ bụla ZGo na-achịkwa ma ọ bụ Xero na-achịkwa. Ndekọ ndekọ ego dị na Xero na-anọgide na-emekọrịta onwe ya na mmezu on-chain.

Maka nhazi mbụ, soro ntụziaka pụrụ iche a: [Nhazi Njikọta Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb).

## ZGo na WooCommerce

Maka ụlọ ahịa n’ịntanetị na-arụ na [WooCommerce](https://woocommerce.com/) na [WordPress](https://wordpress.org/), ZGo na-enye plugin pụrụ iche. Plugin ahụ na-agbakwunye Zcash dịka usoro Kwụọ ụhwọ n’oge checkout ma na-ahụ ọnọdụ iwu ahụ anya ozugbo Kwụọ ụhwọ kwadoro.

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="/content-images/55a791bb-1947-4f55-b5b9-55083be8ed49-2bc8d2571e.webp" />

Usoro zuru ezu n’ime ụlọ ahịa WooCommerce:

1. Onye ahịa ruru checkout wee họrọ Zcash dịka usoro Kwụọ ụhwọ.
2. Plugin ahụ na-emepụta arịrịọ Kwụọ ụhwọ ma gosi koodu QR na ibe checkout.
3. Onye ahịa na-akwụ site n’e-akpa ego ha.
4. Azụmahia ahụ na-ebipụta na netwọk Zcash, ZGo amalite inyocha ya.
5. Mgbe nkwenye ise gachara, ZGo na-akọpụta Kwụọ ụhwọ ahụ dị ka nke ikpeazụ nye plugin ahụ.
6. Plugin ahụ na-akara iwu WooCommerce akara na akwụla ya wee melite nchekwa data iwu.

A na-akwụ iwu ahụ naanị mgbe nzọụkwụ 6 mechara. Enwere ike igosi onye ahịa ọnọdụ ndị mbụ (ebipụtara, nkwenye mbụ) dịka “a nabatara Kwụọ ụhwọ, na-eche nkwenye,” mana ngwa ahịa, mmezu, na akpaaka ọ bụla na-esochi kwesịrị ichere ọnọdụ ikpeazụ.

Plugin ahụ na-etinyekwa dashboard nchịkwa n’ime WordPress, ebe onye ọchụnta ego nwere ike inyocha iwu na Kwụọ ụhwọ ZEC na-abata n’akụkụ nlele iwu WooCommerce nkịtị. Plugin ahụ na-akwado ụdị Adreesị Zcash niile dị ugbu a: Orchard, Sapling, na Oha. Ndị ahịa na-akwụ site n’e-akpa ego ọ bụla na-agbaso ụkpụrụ nwere ike mezue Azụmahia ahụ.

## Njirimara

**Na-enweghị Onye nlekota.** Kwụọ ụhwọ na-esi n’e-akpa ego onye ahịa abanye ozugbo n’e-akpa ego onye ọchụnta ego site na Azụmahia nke e chebere echebe. ZGo anaghị ejide ego ahụ n’etiti, onye ọchụnta ego na-edobe njikwa zuru oke n’oge niile.

**Nzipụta na-agbanwe agbanwe.** Enwere ike iji ZGo maka otu ehihie n’ahịa pop-up, maka nhazi ebe ire ahịa na-adịgide adịgide, ma ọ bụ dịka backend maka ụlọ ahịa n’ịntanetị site na njikọta Xero ma ọ bụ WooCommerce.

**Dabere n’ihe nchọgharị.** Enweghị nrụnye n’akụkụ onye ahịa ma ọ bụ onye ọchụnta ego. ZGo na-arụ ọrụ n’ihe nchọgharị ọ bụla nke oge a na kọmputa ma ọ bụ ekwentị.

**Ndakọrịta e-akpa ego.** E-akpa ego Zcash ndị a ma ama, gụnyere ndị na-akwado Orchard, Sapling, na ụdị Adreesị Oha, nwere ike ịkwụ invoice ZGo na-enweghị nhazi ọzọ n’akụkụ onye ahịa.

**Njikọta.** Njikọta ozugbo na Xero (ndekọ ego) na WooCommerce (azụmahịa elektrọnik) na-ekpuchi usoro ọrụ abụọ ndị ọchụnta ego na-ejikarị eme ihe site na mbido.

## Mmejọ ndị a na-ahụkarị

**Iwere iwu ahụ dịka nke akwụgoro tupu nkwenye ise.** Azụmahia e bipụtara abụghị otu na Kwụọ ụhwọ ekwenyere. Azụmahia ahụ ka nwere ike ghara ikwenye ma ọ bụ jiri nke ọzọ dochie ya. Ọ bụ naanị mgbe nkwenye ise gachara ka ZGo na-akọpụta Kwụọ ụhwọ ahụ dị ka nke ikpeazụ, ọ bụkwa mgbe ahụ ka ekwesịrị ịkara iwu ahụ akara akwụgoro n’usoro ndị na-esochi. Ọ bụrụ na onye ọchụnta ego ahazie ngwa ahịa ma ọ bụ mmezu ka ọ malite n’oge e bipụtara Azụmahia, Kwụọ ụhwọ aghụghọ ma ọ bụ nke dara ada ga-akpata ezigbo mfu.

**Ịtụ ZGo aka na Adreesị nkwụnye ego exchange.** Ọ dị ka Adreesị akpa ego Zcash, mana Adreesị nkwụnye ego exchange dị n’okpuru njikwa exchange, ọ bụghị onye ọchụnta ego. Exchange nwere mkpịsị ugodi, nke pụtara na exchange nwere ego ahụ; nke a na-emebi ihe mere eji onye nhazi na-enweghị Onye nlekota. Adreesị e-akpa ego ahaziri na ZGo ga-abụrịrị nke e-akpa ego onye ọchụnta ego na-achịkwa Mkpuru mgbake [seed phrase] ya ozugbo.

**Iwere ZGo dịka e-akpa ego.** ZGo bụ onye nhazi Kwụọ ụhwọ, ọ bụghị e-akpa ego. Ọ naghị echekwa mkpịsị ugodi, ejide nguzozi, ma ọ bụ kwe ka onye ọchụnta ego mefuo ego. A chọrọ e-akpa ego Zcash dị iche n’okpuru njikwa onye ọchụnta ego iji nata ego ZGo na-edu.

## Mmechi

ZGo na-enye ndị ọchụnta ego ụzọ ha ga-esi anabata Kwụọ ụhwọ Zcash na-enweghị ịhapụ njide, na-enweghị ịdabere n’onye etiti, na-enweghị ikpughe nkọwa Azụmahia na chain Oha. Njikọta abụọ ahụ (Xero na WooCommerce) na-ekpuchi usoro ọrụ ndị ọchụnta ego na-ejikarị eme ihe; maka ihe ndị ọzọ niile, enwere ike iji ZGo naanị ya site n’ihe nchọgharị ọ bụla.

Maka nhazi, ụzọ ahụ dị mkpirikpi: nweta e-akpa ego Zcash, mepụta akaụntụ na [zgo.cash](https://zgo.cash/), wee malite imepụta arịrịọ Kwụọ ụhwọ ozugbo ma ọ bụ wụnye njikọta dị mkpa.

## Akụrụngwa

- [weebụsaịtị gọọmentị ZGo](https://zgo.cash/)
- [ntụziaka Nhazi Njikọta Xero](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) na [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [ibe mbụ ọrụ Zcash](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), ndepụta e-akpa ego Zcash dakọtara
- [nchịkọta Ndị nhazi Kwụọ ụhwọ ZecHub](https://zechub.wiki/payment-processors), ZGo n’ọdịnaya nhọrọ Kwụọ ụhwọ Zcash ndị ọzọ
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), ntụziaka ZecHub metụtara ya maka ụzọ ọzọ a na-akwado onwe ya
