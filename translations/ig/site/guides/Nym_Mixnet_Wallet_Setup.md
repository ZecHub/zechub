<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie https://github.com/ZecHub/zechub/pull/2238t Ibe"/>
</a>

# Duga Okporo ụzọ e-akpa ego Zcash Gafee Mixnet Nym

> E nyochara ikpeazụ: Septemba 29, 2026

Azụmahia [transaction] nke e chebere echebe [shielded] nke Zcash na-echekwa data azụmahia on-chain, mana e-akpa ego ka na-ekwurịta okwu n'ịntanetị. Ndị na-ekiri netwọk nwere ike ịmata metadata dịka adreesị IP gị, oge e-akpa ego gị jikọtara, na akụrụngwa ọ na-akpọtụrụ.

Nym na-agbakwunye ọkwa Nzuzo [privacy] netwọk dị iche. Ruo Septemba 2026, ụzọ kacha mma dabere n'e-akpa ego ahụ:

1. **Họrọ njikọta Nym nke e-akpa ego nwere n'onwe ya mgbe ọ dị.**
2. Ma ọ bụghị ya, jiri **ụdị Mixnet NymVPN n'ọkwa sistemụ** ka e wee duzie okporo ụzọ netwọk e-akpa ego ahụ site na Nym n'ịdabereghị na nkwado proxy pụrụ iche nke e-akpa ego.

Maka nkọwa izugbe gbasara VPN na dVPN, lee [VPN & dVPN](./VPN_and_DVPN.md).

## Ihe Nym na-agbakwunye — na ihe ọ na-adịghị eme

Kwụọ ụhwọ [payment] nke e chebere echebe Zcash na ngwá ọrụ Nzuzo netwọk na-edozi nsogbu dị iche iche:

- **Pool [pool] nke e chebere echebe Zcash** na-echebe nkọwa azụmahia on-chain.
- **Nduzi mixnet Nym** ka e mere iji belata ike ijikọ njirimara netwọk gị n'ezie na ọrụ na-anata okporo ụzọ e-akpa ego.
- Ebe a na-aga nke a kpọtụrụ site n'ọdụ NymVPN n'ọkwa sistemụ kwesịrị ịhụ ọpụpụ Nym kama IP ụlọ/gị mkpanaka.

Mixnet Nym na-eji ọtụtụ hops, ịgwakọta packet, oge igbu oge a họpụtara n'enweghị usoro, cover traffic, na Nzobe ederede [encryption] onion iji belata mwepụ metadata netwọk.

Nym **adịghị** echebe megide ngwaọrụ emebiela, sọftụwia e-akpa ego ọjọọ, mkpụrụokwu mgbake ekpughere, njirimara ị na-ekpughe site n'akaụntụ exchange, ma ọ bụ mfu Nzuzo sitere n'ọrụ Azụmahia Oha [transparent] Zcash.

## Nkwado Nym nke dị n'ime: jiri nke a buru ụzọ mgbe ọ dị

Nym kwupụtara na Septemba 24, 2026 na ọrụ Ikike [grant] Community nke Zcash ya ezuola nakwa na a na-ewepụta nkwado mixnet nke dị n'ime n'e-akpa ego Zcash n'ezie.

### E-akpa ego Zingo!

Zingo PC nwere mbufe Nym nke dị n'ime. Zingo Mobile na-ewepụtakwa Mixnet Mode na iOS na Android site na proxy Nym dị n'ime ngwa.

Omume ugbu a nke Zingo depụtara:

- Njikwa Nym dị n'okpuru **Settings → Nym Mixnet**.
- A na-eduga izipu Kwụọ ụhwọ site na mixnet.
- Mbufe mbugharị Ironwood na-eso otu ụzọ izipu echebere.
- A na-edugakwa arịrịọ ọnụahịa ZEC site na mixnet.
- Iziga na-emechi n'enweghị ohere mgbe Nym enyere aka: ọ bụrụ na mbufe mixnet adịghị, a naghị eziga Kwụọ ụhwọ ahụ nwayọọ nwayọọ site na clearnet.
- **A naghị eduga mmekọrịta chain ugbu a site na mixnet** na Zingo PC. Compact blocks, ajụjụ nullifier, ịnweta Azụmahia, okporo ụzọ mempool, na nyocha ahụike sava ka na-eji njikọ sava nkịtị.

Ọdịiche ahụ dị mkpa: njikọta dị n'ime nke Zingo na-echebe ụzọ mgbasa ozi nwere njikọ kacha elu, mana ọ bụghị ọdụ netwọk zuru ngwaọrụ ka.

Ọ bụrụ na usoro egwu gị chọkwara izochi okporo ụzọ mmekọrịta site na sava, jiri ọdụ Nzuzo n'ọkwa sistemụ dịka NymVPN na mgbakwunye n'ịghọta oge igbu oge na mgbagwoju anya ọzọ nke nke a na-eweta.

Ebe mmalite:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym na-akọ na **Zkool** na-akwado ugbu a ijikọ na akụrụngwa RPC Zcash site na mixnet Nym site na toggle nke dị n'ime.

Zkool bụ onye nọchiri YWallet nke a na-elekọta nke ọma. Ọrụ ya na-akwado proxying Tor na ọrụ onion maka njikọ sava Zcash.

Họrọ nhọrọ Nym nke dị n'ime Zkool karịa ịnwa ịmanye ụdị YWallet ochie site n'okporo ụzọ proxy enweghị akwụkwọ.

Ebe mmalite:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet nwekwara ụzọ mbufe maara Nym. Mmejuputa ya ugbu a na-akwado iduzi nnyefe Azụmahia na-apụ apụ site na mixnet Nym na ụzọ dVPN Nym dị iche maka mmekọrịta compact-block. Were ndị a dịka nchedo dị iche iche kama iche na arịrịọ e-akpa ego ọ bụla na-eji mixnet ozugbo.

Ebe mmalite:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl nwere ugbu a **Nchedo Tor** e wuru n'ime, ọ bụghị otu njikọta Nym nke dị n'ime akọwara n'elu maka Zingo, Zkool, na Nozy.

Njirimara Tor nke Zodl nwere ike iduzi nnyefe Azụmahia, ịnweta data Azụmahia, arịrịọ ọnụego exchange, na oku API ndị ọzọ site na Tor. Nym kwuru na Septemba 24, 2026 na ya ka na-ekwurịta okwu nke ọma na otu Zodl gbasara njikọta mixnet sara mbara.

Maka Zodl taa, jiri otu n'ime ndị a:

- Nchedo Tor nke Zodl depụtara, ma ọ bụ
- NymVPN n'ọkwa sistemụ ma ọ bụrụ na ebumnuche gị bụ iduzi okporo ụzọ ngwaọrụ izugbe e-akpa ego ahụ site na Nym.

Echekwala na Tor na Nym bụ mbufe a pụrụ iji dochie ibe ha n'ime e-akpa ego naanị n'ihi na ha abụọ bụ netwọk Nzuzo.

Ntọala Zodl Tor:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Ebe mmalite:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Nhọrọ ndabere: NymVPN n'ọkwa sistemụ

Nke a bụ nhọrọ Nym dakọtara n'ọtụtụ ebe n'ihi na ọ chọghị ka e-akpa ego ghọta ntọala proxy pụrụ iche nke Nym.

### 1. Wụnye NymVPN

Budata NymVPN naanị site na weebụsaịtị gọọmentị Nym ma ọ bụ ụlọ ahịa gọọmentị nke ikpo okwu:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN na-akwado Android, iOS, Linux, Windows, na macOS.

### 2. Họrọ ụdị Mixnet

NymVPN na-enye **Fast mode**, ụzọ dVPN 2-hop emebere maka latency dị ala, na **Mixnet mode**, ụzọ mixnet 5-hop emebere maka nchedo metadata netwọk siri ike karị. Maka ọrụ e-akpa ego nwere mmetụta, họrọ Mixnet mode ma chere ruo mgbe onye ahịa ga-akọ na njikọ ahụ eguzobela tupu imepe ma ọ bụ ime ka e-akpa ego dị ọhụrụ.

### 3. Hapụ e-akpa ego na ntọala netwọk nkịtị

Mgbe sistemụ arụmọrụ na-edugalarị okporo ụzọ site na NymVPN, ọtụtụ e-akpa ego anaghị achọ ntọala proxy ahaziri iche.

Mepee e-akpa ego ahụ n'ụzọ nkịtị ma kwe ka ọ mekọọrịta.

Ọ bụrụ na NymVPN na-enye split tunneling n'elu ikpo okwu gị, gosi na e-akpa ego ahụ **so na ọdụ echebere**, ọ bụghị na e tinyere ya n'ndepụta bypass ma ọ bụ mwepu.

### 4. Nyochaa ọdụ ahụ tupu iji e-akpa ego

Nyocha dị mfe n'ọkwa sistemụ:

1. Kwụsị NymVPN.
2. Gaa n'ọrụ nyocha IP ọha, ma ọ bụ na desktọpụ gbaa:

   ```bash
   curl https://api.ipify.org
   ```

3. Detuo IP a na-ahụ anya.
4. Jikọọ NymVPN na Mixnet mode.
5. Megharịa nyocha ahụ.

IP ọha a na-ahụ anya kwesịrị ịgbanwe.

Nke a na-akwado ọdụ sistemụ. Ọ **dịghị** egosi na arịrịọ ọ bụla e-akpa ego kpọmkwem na-eme na-eso otu ụzọ ma ọ bụrụ na ngwa ahụ ma ọ bụ OS nwere iwu nduzi pụrụ iche.

Maka nkwa karịrị akarị na desktọpụ:

- nyochaa usoro e-akpa ego ahụ site na network monitor nke sistemụ arụmọrụ,
- gosi na enweghị mwepu split-tunnel,
- kwado na omume e-akpa ego a tụrụ anya ya na-agbanwe ma ọ bụrụ na akwụsịrị NymVPN.

Edebela nseta ihuenyo nwere adreesị akpa ego, nguzo ego, ID Azụmahia, adreesị IP, ma ọ bụ ihe mgbake mgbe ị na-achọpụta nsogbu.

## Ụdị proxy dApp / e-akpa ego NymVPN

NymVPN na-enyekwa ụdị proxy ngwa-na-e-akpa ego site na SOCKS5 / nduzi RPC site na mixnet.

Akwụkwọ ntọala ọha Nym na-egosi nke a ọkachasị site na nhazi RPC ụdị Ethereum. Ọ bara uru maka sọftụwia na-akwado kpọmkwem ụzọ proxy/RPC izugbe dakọtara, mana ekwesịghị iche na ọ ga-arụ ọrụ na e-akpa ego Zcash ọ bụla.

Jiri ụzọ a naanị mgbe akwụkwọ nke e-akpa ego ahụ n'onwe ya na-akwado proxy ma ọ bụ nkwado RPC dakọtara.

Ma ọ bụghị ya, họrọ:

- njikọta Nym nke e-akpa ego nwere n'onwe ya, ma ọ bụ
- NymVPN n'ọkwa sistemụ.

## Mmekọrịta arụmọrụ na timeout

Mixnet na-agbanwe ụma ọsọ maka nchedo metadata siri ike karị.

Tụọ anya mmetụta nwere ike ịpụta na:

- mmekọrịta e-akpa ego mbụ,
- mmekọrịta catch-up buru ibu,
- ajụjụ akụkọ Azụmahia,
- timeout RPC,
- oku API ndị ọzọ.

Nduzi bara uru:

- Bido na ntọala ndabara Nym.
- Tụọ anya na mmekọrịta mbụ ma ọ bụ mmekọrịta catch-up ogologo ga-ewe ogologo oge.
- Nwalee ọzọ mgbe timeout mere tupu ime ka ntọala Nzuzo daa mbà.
- Zere ịgbanwe ụdị Nzuzo ugboro ugboro ozugbo tupu Azụmahia nwere mmetụta.
- Ọ bụrụ na ị na-eji ụzọ ọsọ ọsọ maka mmekọrịta nnukwu, ghọta na akụrụngwa a kpọtụrụ nwere ike ịhụ njirimara netwọk gị n'ezie n'oge ahụ.
- Maka Zingo PC kpọmkwem, cheta na mbufe Nym nke dị n'ime ya na-echebe izipu na nyocha ọnụahịa ugbu a, ebe mmekọrịta na-anọgide kpọmkwem.

## Ihe gbasara mkpanaka

Na Android na iOS, oghere VPN nke sistemụ arụmọrụ na-abụkarị ụzọ kacha mfe isi duzie okporo ụzọ e-akpa ego izugbe site na NymVPN: buru ụzọ jikọọ NymVPN, wee mepee e-akpa ego.

Ọ bụrụ na VPN ọzọ, firewall, ma ọ bụ ad blocker dabere na VPN mpaghara ejirila interface VPN sistemụ, ngwaahịa abụọ ahụ nwere ike ghara ịrụ ọrụ n'otu oge. Gosi ọnọdụ VPN nke sistemụ arụmọrụ tupu iche na echebere e-akpa ego ahụ.

## Ndepụta nyocha usoro egwu

Tupu ịdabere na ntọala ahụ, jụọ:

- Ana m eji adreesị akpa ego Azụmahia nke e chebere echebe Zcash ebe o kwesịrị ekwesị?
- E-akpa ego m ò nwere nkwado Nym nke dị n'ime?
- Ọ bụrụ otu a, kedu kpọmkwem okporo ụzọ njikọta nke dị n'ime ahụ na-echebe?
- Ọ bụrụ na achọrọ m mkpuchi sara mbara, NymVPN ejikọtala tupu e-akpa ego amalite ọrụ netwọk?
- E wepụrụ e-akpa ego ahụ site n'iwu split-tunneling?
- Ana m adabere n'ụdị proxy nke e-akpa ego depụtara n'ezie?
- Ana m ewepụ njirimara site na exchange, oge nchọgharị, API ndị ọzọ, ma ọ bụ adreesị Oha?
- Adịla m njikere maka mmekọrịta nwayọọ nwayọọ na timeout mgbe ụfọdụ?

## Ebe mmalite

- Nym: mixnet Nym dị ndụ ugbu a n'e-akpa ego Zcash, Septemba 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Omume Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Mbufe Zingo Mobile Nym: https://github.com/zingolabs/zingo-mobile
- Ebe nchekwa Zkool: https://github.com/hhanh00/zkool2
- Ọrụ mbufe NozyWallet Nym: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Nchedo Zodl Tor: https://support.zodl.com/article/17-enabling-tor-protection
