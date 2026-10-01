<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Ụzọ Zcash Wallet Traffic Gafee Nym Mixnet

> Nnwale ikpeazụ: Septemba 29, 2026

Azụmahịa Zcash echekwara na-echebe data azụmahịa n'usoro, mana obere akpa ego ka na-ekwurịta okwu na ịntanetị. Ndị na-ahụ maka netwọk nwere ike ịmụta metadata dị ka adreesị IP gị, mgbe obere akpa ego gị jikọtara, na akụrụngwa ọ na-akpakọrịta.

Nym na-agbakwụnye oyi akwa nzuzo netwọk dị iche. Dịka ọ dị na Septemba 2026, ụzọ kachasị mma dabere na obere akpa:

1. **Họrọ njikọta Nym nke obere akpa ego mgbe ọ dị.**
2. Ma ọ bụghị ya, jiri **usoro NymVPN Mixnet mode** ka okporo ụzọ netwọk nke obere akpa ahụ wee gafere na Nym na-adabereghị na nkwado proxy kpọmkwem maka obere akpa.

Maka ndabere VPN na dVPN izugbe, lee [VPN na dVPN](./VPN_and_DVPN.md).

## Ihe Nym na-agbakwụnye - na ihe ọ na-anaghị eme

Ịkwụ ụgwọ Zcash echekwara na ngwaọrụ nzuzo netwọk na-edozi nsogbu dị iche iche:

- **Zcash** na-echebe nkọwa azụmahịa n'usoro.
- E mere nhazi Nym mixnet** iji belata njikọ dị n'etiti njirimara netwọk gị na okporo ụzọ obere akpa ọrụ.
- Ebe a na-aga site na ọwara NymVPN nke dị n'usoro kwesịrị ịhụ ụzọ ọpụpụ Nym kama ịhụ IP ụlọ/mkpanaka gị.

Ngwakọta Nym na-eji ọtụtụ hops, ngwakọta ngwugwu, igbu oge na-enweghị usoro, mkpuchi okporo ụzọ, na izochi yabasị iji belata ntapu netwọk-metadata.

Nym anaghị echebe megide ngwaọrụ mebiri emebi, ngwanrọ obere akpa ọjọọ, okwu mgbake ekpughere, njirimara ị na-ekpughe site na akaụntụ mgbanwe, ma ọ bụ mfu nzuzo nke ọrụ Zcash doro anya kpatara.

## Nkwado Native Nym: jiri nke a buru ụzọ mee ihe mgbe ọ dị

Nym kwupụtara na Septemba 24, 2026 na ọrụ Zcash Community Grant ha agwụla, a na-ebugakwa nkwado mixnet n'ime obere akpa Zcash.

### Akpa Zingo!

Zingo PC nwere ụgbọ njem Nym nke obodo. Zingo Mobile na-ebugakwa Mixnet Mode na iOS na Android site na iji ihe nnọchiteanya Nym dị n'ime ngwa.

Omume dị ugbu a nke Zingo:

- Njikwa Nym dị n'okpuru **Ntọala → Nym Mixnet**.
- A na-eziga ịkwụ ụgwọ site na mixnet.
- Nzipu njem Ironwood na-eso otu ụzọ izipu echekwara.
- A na-ejikwa mixnet eziga arịrịọ ọnụahịa ZEC.
- Izipu agaghị arụ ọrụ nke ọma mgbe Nym na-arụ ọrụ: ọ bụrụ na njem mixnet adịghị, a naghị ezipụ ụgwọ ahụ n'ime obi site na clearnet.
- **A naghị agagharị na njikọ chain ugbu a site na mixnet** na Zingo PC. Blọk dị obere, ajụjụ ndị na-emebi ihe, ihe ndị a na-achọ ịzụta, okporo ụzọ mempool, na nlele ahụike sava ka na-eji njikọ sava nkịtị.

Ihe dị iche dị mkpa: Njikọta Zingo's obodo na-echebe ụzọ mgbasa ozi njikọ kachasị elu, mana ọ ka bụ ọwara netwọk ngwaọrụ zuru oke.

Ọ bụrụ na ụdị ihe iyi egwu gị chọkwara izochi okporo ụzọ mmekọrịta site na sava ahụ, jiri ọwara nzuzo dị larịị sistemụ dịka NymVPN na mgbakwunye na ịghọta latency na mgbagwoju anya ọzọ nke a na-ewebata.

Isi mmalite:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym kọrọ na **Zkool** na-akwado ugbu a ijikọ na akụrụngwa Zcash RPC site na iji Nym mixnet site na iji toggle nke obodo.

Zkool bụ onye nọchiri YWallet. Ọrụ ya na-akwadokwa ọrụ proxying na yabasị Tor maka njikọ sava Zcash.

Họrọ nhọrọ Nym Zkool's kama ịnwa ịmanye YWallet ochie site na ụzọ proxy na-enweghị akwụkwọ ikike.

Isi mmalite:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nwayo na-agbagharị agbagharị

NozyWallet nwekwara ụzọ njem nke maara Nym. Mmejuputa ya ugbu a na-akwado nhazi nnyefe azụmahịa na-apụ apụ site na mixnet Nym na ụzọ Nym dVPN dị iche maka njikọta obere ngọngọ. Were ndị a dị ka ihe nchebe pụrụ iche kama iche na arịrịọ obere akpa ọ bụla na-eji mixnet na akpaghị aka.

Isi mmalite:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl nwere **Tor Protection** arụnyere n'ime ya ugbu a, ọ bụghị otu njikọta Nym nke akọwara n'elu maka Zingo, Zkool, na Nozy.

Atụmatụ Tor nke Zodl nwere ike ibugharị nnyefe azụmahịa, weghachite data azụmahịa, arịrịọ ọnụego mgbanwe, na oku API nke ndị ọzọ site na Tor. Nym kwuru na Septemba 24, 2026 na ọ ka nọ na mkparịta ụka na-arụsi ọrụ ike na ndị otu Zodl gbasara njikọta mixnet sara mbara.

Maka Zodl taa, jiri nke ọ bụla n'ime ha:

- Nchekwa Tor nke Zodl dere, ma ọ bụ
- NymVPN nke dị n'ọkwa sistemụ ma ọ bụrụ na ebumnuche gị bụ ibugharị okporo ụzọ ngwaọrụ n'ozuzu nke obere akpa ahụ site na Nym.

Echela na Tor na Nym bụ ụzọ ndị ọzọ a ga-esi na-ebuga n'ime obere akpa ego n'ihi na ha abụọ bụ netwọk nzuzo.

Ntọala Zodl Tor:

**Ọzọ → Atụmatụ Dị Elu → Beta: Nchedo Tor → Kwado → Chekwaa mgbanwe**

Isi mmalite:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Ọdịda: NymVPN dị larịị sistemụ

Nke a bụ nhọrọ Nym kachasị dakọtara n'ọtụtụ ebe n'ihi na ọ chọghị obere akpa iji ghọta ntọala proxy nke Nym kpọmkwem.

### 1. Wụnye NymVPN

Budata NymVPN naanị site na weebụsaịtị gọọmentị Nym ma ọ bụ ụlọ ahịa ikpo okwu gọọmentị:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN na-akwado gam akporo, iOS, Linux, Windows, na macOS.

### 2. Họrọ ụdị Mixnet

NymVPN na-ekpughe **Ụdị ngwa ngwa**, ụzọ dVPN 2-hop nke e mere ka ọ dị mfe ịla n'iyi, na **Ụdị Mixnet**, ụzọ mixnet 5-hop nke e mere ka ọ dị mma maka nchekwa netwọk-metadata siri ike. Maka ọrụ obere akpa ego dị nro, họrọ ụdị Mixnet ma chere ruo mgbe onye ahịa ga-akọ na njikọ ahụ amalitela tupu emepee ma ọ bụ mee ka obere akpa ahụ dị ọhụrụ.

### 3. Hapụ obere akpa ahụ na ntọala netwọk nkịtị

Mgbe sistemụ arụmọrụ na-agbanwe okporo ụzọ site na NymVPN, ọtụtụ obere akpa anaghị achọ ntọala proxy omenala.

Mepee obere akpa ahụ dịka ọ dị na mbụ ma kwe ka ọ dakọọ.

Ọ bụrụ na NymVPN ekpughee oghere gbawara agbawa n'elu ikpo okwu gị, gosi na akpa ahụ dị n'ime ọwara echekwara**, ọ bụghị na ndepụta nke gafere ma ọ bụ mwepụ.

### 4. Lelee ọwara ahụ tupu i jiri obere akpa ahụ

Nlele dị mfe nke ọkwa sistemụ:

1. Gbanyụọ NymVPN.
2. Gaa na ọrụ nyocha IP ọha, ma ọ bụ na desktọpụ na-agba ọsọ:

   ```bash
   curl https://api.ipify.org
   ```

3. Dekọọ IP a na-ahụ anya.
4. Jikọọ NymVPN na ọnọdụ Mixnet.
5. Megharịa nlele ahụ.

IP ọha a na-ahụ anya kwesịrị ịgbanwe.

Nke a na-akwado ọwara sistemụ ahụ. Ọ naghị egosi na arịrịọ ọ bụla nke obere akpa ego mere na-agbaso otu ụzọ ahụ ma ọ bụrụ na ngwa ma ọ bụ OS nwere iwu nhazi pụrụ iche.

Maka nkọwa ndị ọzọ gbasara otu esi etinye na desktọọpụ:

- lelee usoro obere akpa ego site na iji ihe nlekota netwọk nke sistemụ arụmọrụ,
- hụ na enweghị mwepu ọwara nkewa,
- gosi mgbanwe omume akpa ego a na-atụ anya ya ma ọ bụrụ na ewepụghị NymVPN.

Etinyela foto ndị nwere adreesị obere akpa ego, nguzozi, njirimara azụmahịa, adreesị IP, ma ọ bụ ihe mgbake mgbe ị na-edozi nsogbu.

## Ọnọdụ proxy NymVPN dApp / obere akpa

NymVPN na-ekpughekwa ụdị proxy ngwa-na-wallet site na iji SOCKS5 / RPC na-agagharị na mixnet.

Akwụkwọ ntọala ọha nke Nym gosiri nke a karịsịa site na nhazi RPC nke ụdị Ethereum. Ọ bara uru maka ngwanrọ nke na-akwado ụzọ proxy/RPC nke ọma, mana ekwesighi iche na ọ ga-arụ ọrụ na obere akpa Zcash ọ bụla.

Jiri ụzọ a naanị mgbe akwụkwọ nke obere akpa ahụ kwadoro nkwado proxy ma ọ bụ RPC dakọtara.

Ma ọ bụghị ya, họrọ:

- njikọta Nym nke obere akpa ahụ, ma ọ bụ
- system-level NymVPN.

## Mmekọrịta arụmọrụ na oge ezumike

Mixnets na-azụ ahịa ọsọ ọsọ maka nchekwa metadata siri ike.

Atụ anya mmetụta nwere ike inwe na:

- mmekọrịta akpa ego mbụ,
- nnukwu njikọta njide,
- ajụjụ akụkọ ihe mere eme azụmahịa,
- Oge nkwụsị oge RPC,
- Oku API nke ndị ọzọ.

Nduzi bara uru:

- Malite na ntọala Nym ndabara.
- Atụla anya na mmekọrịta mbụ ma ọ bụ mmekọrịta ogologo oge ga-ewe ogologo oge.
- Nwaa ọzọ oge ezumike tupu ntọala nzuzo adịghị ike.
- Zere ịgbanwe ụdị nzuzo ugboro ugboro ozugbo tupu azụmahịa dị mkpa.
- Ọ bụrụ na ị jiri ụzọ dị ngwa maka mmekọrịta buru ibu, ghọta na akụrụngwa kọntaktị nwere ike ịhụ njirimara netwọk gị n'ezie n'oge ahụ.
- Maka Zingo PC kpọmkwem, cheta na njem Nym nke obodo ya na-echebe izipu na ịchọ ọnụahịa ugbu a, ebe njikọta ka bụ kpọmkwem.

## Ihe ndị a ga-atụle na mkpanaka

Na gam akporo na iOS, oghere VPN sistemụ arụmọrụ na-abụkarị ụzọ kachasị mfe isi zipu okporo ụzọ obere akpa izugbe site na NymVPN: jikọọ NymVPN mbụ, wee mepee obere akpa ahụ.

Ọ bụrụ na VPN ọzọ, firewall, ma ọ bụ ihe mgbochi mgbasa ozi nke dabere na VPN dị na mpaghara eburula ụzọ VPN sistemụ ahụ, ngwaahịa abụọ ahụ nwere ike ọ gaghị enwe ike ịrụ ọrụ n'otu oge. Kwenye ọnọdụ VPN nke sistemụ arụmọrụ tupu i chee na e nwere obere akpa ahụ.

## Ndepụta ihe atụ iyi egwu

Tupu ị dabere na ntọala ahụ, jụọ:

- M na-eji adreesị Zcash echekwara ebe ọ dị mkpa?
- Akpa m ọ nwere nkwado Nym nke obodo?
- Ọ bụrụ otu a, kpọmkwem okporo ụzọ dị aṅaa ka njikọta obodo ahụ na-echebe?
- Ọ bụrụ na m chọrọ mkpuchi sara mbara, ọ dị na NymVPN ejikọtara tupu obere akpa amalite ọrụ netwọk?
- Iwu nkewa nkewa ọ na-ewepụ obere akpa ego ahụ?
- M̀ na-adabere na ụdị proxy nke obere akpa ahụ na-ede n'ezie?
- M̀ na-agbapụta njirimara site na mgbanwe, nnọkọ ihe nchọgharị, API nke ndị ọzọ, ma ọ bụ adreesị doro anya?
- M dị njikere maka mmekọrịta dị nwayọ na oge ụfọdụ?

## Isi mmalite

- Nym: Nym mixnet dị ugbu a na obere akpa Zcash, Septemba 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Omume Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym njem: https://github.com/zingolabs/zingo-mobile
- Ebe nchekwa Zkool: https://github.com/hhanh00/zkool2
- Ọrụ njem NozyWallet Nym: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Nchedo Zodl Tor: https://support.zodl.com/article/17-enabling-tor-protection
