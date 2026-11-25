<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>


# Zcash Lightwallet Nodes

## Na nkenke

* Ọtụtụ ndị na-eji Zcash site na light wallet [light wallet], nke na-adịghị ebudata blockchain dum. Kama nke ahụ, ọ na-agwa sava nke rụgoro ọrụ ahụ.
* Akụrụngwa atọ na-ejikarị enye light wallets ọrụ taa: **lightwalletd** (nke mbụ, Go), **Zaino** (indexer Rust), na ztreamer (indexer Rust na-arụ ọrụ nke ọma sitere na Zcash Labs, nke na-eme ka netwọk fastz.cash ọha na eze rụọ ọrụ).
* Igodo gị anaghị ahapụ ngwaọrụ gị, sava ahụ enweghị ike imefu ego gị ma ọ bụ gụọ ọnụego na memo ndị dị n’ime Azụmahia nke e chebere echebe kpamkpam.
* Ihe sava ahụ nwere ọnọdụ ọma iji mata bụ adreesị IP gị na oge ọrụ gị — Azụmahia ndị e chebere echebe na-echebe ihe na-eme na blockchain, ọ bụghị njikọ gị na sava ahụ.
* Tor na-ewepụ njirimara IP; ọ dị na e-akpa ego ndị e wuru na `zcash_client_backend`, ma na ZODL ọ bụ ntọala dị na Advanced Settings.
* Ị nwere ike ịgbanwe sava e-akpa ego gị ji, ma ọ bụ mee nke gị — lightwalletd, Zaino, na ztreamer bụ open source.

## Nkọwa Isi

Ọtụtụ ndị na-eji Zcash site n’e-akpa ego dị mfe, nke na-adịghị ebudata blockchain dum. Kama nke ahụ, ọ na-agwa sava nke rụgoro ọrụ ahụ. Peeji a na-akọwa ihe sava ndị ahụ bụ, ihe ha nwere na enweghị ike ịhụ gbasara gị, otu esi agafe njikọ gị n’elu Tor, na otu esi agbanwe sava e-akpa ego gị ji.

Ngwanrọ atọ na-ejekarị ozi e-akpa ego dị mfe taa. **lightwalletd** bụ ọrụ mbụ, e dere na Go. **Zaino** bụ indexer ọhụrụ e dere na Rust, e wuru dịka akụkụ nke ọrụ ịkwụsị zcashd. **ztreamer** bụ indexer Rust na-arụ ọrụ nke ọma nke Zcash Labs, nke na-enye netwọk fastz.cash ọha ike.

### Ihe sava e-akpa ego dị mfe na-eme

Sava e-akpa ego dị mfe na-anọdụ n’etiti e-akpa ego gị na blockchain Zcash ma nye ya nlele chain [chain] na-eji bandwidth rụọ ọrụ nke ọma. Ọ na-emere gị ihe atọ.

Ọ na-eje ozi block [block] kọmpat. Kama block dum, ọ na-eziga ụdị kọmpat nke na-ebu naanị ihe e-akpa ego chọrọ iji chọpụta Kwụọ ụhwọ [payment] na Adreesị akpa ego nke e chebere echebe ya, chọpụta mmefu note [note] ya, ma melite ndị akaebe ya.

Ọ na-ebufe Azụmahia gị. Mgbe ị zitere, e-akpa ego gị na-enye sava ahụ Azụmahia emechara, sava ahụ ebusaa ya na netwọk.

Ọ na-aza ajụjụ chain, dịka elu ugbu a na ozi ugwo [fee] e-akpa ego gị chọrọ.

E-akpa ego gị ka na-arụ ọrụ nzuzo ahụ na mpaghara. Ọ na-edobe igodo gị, na-anwale izopụ block iji chọta note gị, ma na-ewu ma bịanye aka na Azụmahia n’ọrụ ngwaọrụ gị.

### Ihe sava ahụ nwere na enweghị ike ịhụ

Nke a bụ akụkụ dị mfe ịghọtahie. Igodo gị anaghị ahapụ ngwaọrụ gị, mana nke ahụ apụtaghị na sava ahụ amụghị ihe ọ bụla gbasara gị.

Ntụaka ebe a bụ ụdị egwu nke ngwa e-akpa ego [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), nke kwesịrị ka ị gụọ ya dum ma ọ bụrụ na nke a dị gị mkpa. Ọ na-akọwa ụdị ndị mmegide dị iche iche. Nke dị mkpa na peeji a bụ onye mmegide nwere ike ilele okporo data dị n’etiti e-akpa ego gị na ịntanetị, yana n’etiti sava ahụ na ịntanetị. Onye ọ bụla na-agba sava ahụ nọ n’ọnọdụ a n’otu akụkụ, n’ihi na e-akpa ego gị na-ejikọ ha ozugbo.

Bido n’ihe echebere. Megide onye mmegide ọ bụla dị na ụdị ahụ, gụnyere onye mebiri sava ahụ, ọ “enweghị ike ịmụta ihe ọ bụla gbasara ihe igodo kriptografik onye ọrụ nwere (igodo ego, viewing key, Mkpuru mgbake [seed phrase], na ihe ndị ọzọ)”, enweghị ike izuru ego gị, ọ pụghịkwa ime ka ị ziga ego ị na-achọghị iziga. Ọnụego na memo dị n’ime Azụmahia nke e chebere echebe kpamkpam na-anọgide na Nzobe ederede [encryption].

Mgbe ahụ, e nwere ihe ndị na-adịghị echebe. Ụdị egwu ahụ depụtara ndị a dịka adịghị ike amaara megide onye mmegide na-ekiri okporo data:

| Adịghị ike | Otu o si eme |
|:--|:--|
| Ịmata onye ị bụ | “Onye mmegide maara adreesị IP onye ọrụ, nke nwere ike iduga ha n’ezi njirimara onye ọrụ” |
| Ịmata ebe ị nọ n’ụdị mkpokọta | Ịchọ IP gị “n’ebe nchekwa data geolocation iji tụọ ebe ha nọ” |
| Ịmata na mgbe ị zitere ma ọ bụ natara Azụmahia nke e chebere echebe | Izipu “na-eji bandwidth karịa, nke a na-ahụ anya ọbụna ma njikọ ahụ ezoro ezo”. Ụdị ahụ kwuru na sava n’onwe ya na-ahụ omume izipu na ịnata |
| Ịgụ ọnụ ọgụgụ Azụmahia i meela ka oge na-aga | Otu ụkpụrụ bandwidth ahụ, a hụrụ n’oge dị ogologo |
| Ịhụ ụkpụrụ Kwụọ ụhwọ na-eme ugboro ugboro | Ileba anya mgbe ọrụ na-eme |
| Ịchọpụta ma Adreesị akpa ego bụ nke gị | Onye mmegide maralarị Adreesị akpa ego nwere ike “iziga ego na Adreesị akpa ego ahụ wee lelee ma e nwere mmụba bandwidth” sitere n’e-akpa ego gị mgbe ọ na-ebudata ya |

Ụdị ahụ kwukwara na ọnọdụ nkịtị na-eche “mmekọrịta ntụkwasị obi dị n’etiti onye ọrụ na onye na-arụ sava lightwalletd”.

Ya mere nchịkọta eziokwu bụ nke a. Sava e-akpa ego dị mfe enweghị ike imefu ego gị, ọ nweghịkwa ike ịgụ ọnụego ma ọ bụ memo dị na Azụmahia gị nke e chebere echebe. Ihe o nwere ọnọdụ ọma iji mata bụ adreesị IP gị na oge ọrụ gị, na ha abụọ ọnụ nwere ike ikwu ọtụtụ ihe gbasara mmadụ. Azụmahia nke e chebere echebe na-echebe ihe na-eme na blockchain. Ha anaghị, n’onwe ha, ezobe njikọ gị na sava ahụ.

## Ihe Nlereanya / Ule

Chee echiche maka ọbá akwụkwọ ọha nke na-edobe akwụkwọ akụkọ ọ bụla e bipụtarala. Full node [full node] bụ onye na-agụ akwụkwọ na-eburu ebe nchekwa dum laa ụlọ. E-akpa ego dị mfe bụ onye na-agụ akwụkwọ na-arịọ onye na-elekọta ọbá akwụkwọ maka nchịkọta kwa ụbọchị kama — obere akwụkwọ dị gịrịgịrị nke na-ebu naanị ihe ga-ezuru iji hụ ma ihe ọ bụla metụtara ya.

A na-emechi nchịkọta ahụ: onye na-elekọta ọbá akwụkwọ na-achịkọta ya n’enweghị ike ịgụ ihe ndị dị gị mkpa, ma ị na-emeghe ya n’ụlọ site n’igodo nke gị. Nke ahụ bụ block kọmpat, mmeghe ahụ bụkwa nnwale izopụ na ngwaọrụ gị.

Mana onye na-elekọta ọbá akwụkwọ ahụ ka na-ahụ onye na-agụ akwụkwọ batara, oge ọ batara, na ịdị arọ ngwugwu ọ bu pụọ. Nke ahụ bụ adreesị IP na oge — a na-ahụ ha site n’oche ọrụ, n’agbanyeghị etu e si mechie envelopu ahụ nke ọma. Tor yiri izipu onye ozi na-amaghị aha: onye na-elekọta ọbá akwụkwọ ka na-enye otu ngwugwu ahụ, mana ọ maghịzi ụlọ onye ọ na-aga.

## Nnyocha Miri Emi

### Ịgafe n’elu Tor

Tor na-agbaji njikọ dị n’etiti adreesị IP gị na okporo data e-akpa ego gị, nke na-ewepụ njirimara kasị ike dị na tebụl dị n’elu.

Nkwado dị na ọba akwụkwọ Rust nke ọtụtụ e-akpa ego Zcash na-ewu n’elu ha. zcash_client_backend nwere modul Tor e wuru na [Arti](https://tpo.pages.torproject.net/core/arti/), mmejuputa Rust nke Tor, yabụ e-akpa ego nwere ike iduzi mmekọrịta sync, mgbasa Azụmahia, na ọchụchọ ọnụahịa site na Tor n’ebughị client Tor dị iche.

Ndị onye mmepụta Zaino na-arụ otu arụmụka ahụ, na-ezo aka n’ụdị egwu ahụ kpọmkwem: e nwere “mkpa iji usoro mbufe na-amaghị aha (dịka Nym ma ọ bụ Tor) iji mee ka njirimara clients ghara ịpụta ìhè n’ebe sava indexing nke Zcash nọ”.

Na **ZODL**, Tor bụ ntọala dị na Advanced Settings. Ihe ndetu mbipụta e-akpa ego ahụ na-atụ ndị ọrụ aka na ọnọdụ njikọ aka “tinyere ịgbanye Tor na Advanced Settings” ma ọ bụrụ na ha “họrọ ibelata ikpughe metadata”, ngwa ahụ na-enyekwa ịgbanye Tor tupu ị weghachi e-akpa ego, nke bụ oge IP ọhụrụ ga-enwe njikọ na akụkọ e-akpa ego dum ma ọ bụghị ya.

Ihe ịdọ aka ná ntị abụọ. Tor na-ezobe IP gị n’aka sava ahụ, mana ọ naghị agbanwe ihe sava ahụ na-amụta site n’arịrịọ ị na-eme. Ịgafe site na onion na-agbakwụnye latency, yabụ syncing na-ewe ogologo oge. Ịgba sava nke gị na-ezere ajụjụ ntụkwasị obi n’ụzọ ọzọ, n’ihi na mgbe ahụ, onye na-arụ ya bụ gị.

### Zaino, indexer Rust

[Zaino](/zcash-tech/zaino) bụ indexer e dere na Rust site n’otu Zingo, e wuru iji dochie lightwalletd dịka akụkụ nke ọrụ ịkwụsị zcashd. Ọ na-eje ozi light client, client zuru oke, na block explorer, na-agụ data chain nke a na-edobe na “ma ọ bụ Zebra ma ọ bụ full validator zcashd”.

Ọ nọ n’okpuru mmepe na-arụsi ọrụ ike, ebe ewepụtara ụdị 0.10.1 na Septemba 2026. Ọ na-achọ ịnọgide na-adaba azụ na lightwalletd ebe o kwere omume, ka e-akpa ego nwee ike ịtụ aka na ya n’edeghachighị ha.

Zaino nwere peeji nke ya nwere eserese nhazi, yabụ peeji a na-ekpuchi naanị ọrụ ya dịka sava e-akpa ego dị mfe.

### ztreamer na fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) bụ indexer Zcash na sava e-akpa ego dị fechaa nke arụmọrụ ya dị elu, e dere ya na Rust site n'aka Zcash Labs. E mere ya maka igbu oge dị ala na izipu ọtụtụ data ngwa ngwa, ọ bụkwa ya na-arụ netwọk indexer ọha [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) (nke a mara ọkwa na 19 Nọvemba 2026).

fastz.cash na-arụ ọrụ nkesa edge mpaghara (ugbu a Frankfurt, London, Virginia, Oregon, São Paulo, Singapore, na Osaka). Mpaghara nke ọ bụla nwere full node nke ya na ndeksi ztreamer mpaghara. TLS na-akwụsị na node. Oge etiti a tụrụ maka nzaghachi mbụ nke oku GetLatestBlock bụ ihe dị ka 35 ms n'ụwa niile. A na-akọ na mmekọrịta nso block na-adị ngwa ihe ruru ~3× karịa lightwalletd ndị na-adịbeghị anya, ebe ndeksi pere mpe (~18 GB) na-eme ka itinye ebe edge ndị ọzọ dị mfe.

Ọnọdụ na ebe njedebe kacha nso: [status.fastz.cash](https://status.fastz.cash).

**Ihe ndetu gbasara Nzuzo:** fastz.cash na-arụkwa ọrụ wallet-pir nke Valar Group. Ndị ọrụ Vizor nwere ike iji ya taa maka ajụjụ sync nke nzuzo na-ebelata metadata sava ahụ na-amụta banyere notes ma ọ bụ mpaghara ndị a na-arịọ. Nke a bụ usoro nzuzo agbakwunyere n’elu ụdị iyi egwu light-wallet nkịtị akọwara n’elu; ọ naghị anọchi Tor ma ọ bụ nhọrọ onye na-arụ ọrụ.

ztreamer bụ sọftụwia nwere koodu mepere emepe, a pụkwara ịrụ ya n’onwe ya (Zakura node etinyere n’ime ya ma ọ bụ n’ụdị dị anya). Dịka lightwalletd na Zaino, ọ na-eje ozi na light-wallet protocol site na gRPC. A ka na-arụsi ọrụ ike n’ịzụlite ya, e mekwara ya ka ọ bụrụ ma akụrụngwa mmepụta ma ebe a na-anwale mmezi protocol light-wallet n’ọdịnihu.

### Ịgba nke gị

Nhọrọ kachasị mma bụ ka ị bụrụ onye na-arụ ọrụ sava nke gị, nke na-ewepụ kpamkpam ajụjụ ntụkwasị obi. Sava atọ a niile bụ ngwa mepere emepe: [lightwalletd](https://github.com/zcash/lightwalletd) na Go, [Zaino](https://github.com/zingolabs/zaino) na Rust, na [ztreamer](https://github.com/zcashlabs/ztreamer) na Rust. Ha na-agụ site na full validator, ya mere ị ga-achọkwa [Zebra](/zcash-tech/zebra-full-node) ma ọ bụ Zakura. A na-etinye sava zec.rocks site na [Zcash Stack](/guides/zcash-stack), Helm chart mepere emepe na ngwa Compose Docker nke na-arụ Zebra na lightwalletd ọnụ.

## Mmetụta Bara Uru

### Ndepụta sava

Dashboard [hosh.zec.rocks](https://hosh.zec.rocks/zec) na-enyocha sava ọha na ahụike ha, ọ bụkwa ebe ị ga-elele ihe na-arụ ọrụ n’ezie. [status.zec.rocks](https://status.zec.rocks/) na-egosi ọnọdụ ọrụ. Maka netwọk fastz.cash, lee [status.fastz.cash](https://status.fastz.cash).

Sava ndị edepụtara na dashboard ahụ n’oge edere ihe a:

| Sava | Ihe ndetu |
|:--|:--|
| zec.rocks:443 | Edepụtara ebe njikọ mpaghara n'akụkụ ya na na.zec.rocks, eu.zec.rocks, ap.zec.rocks na sa.zec.rocks |
| zec-node.cakewallet.com:443 | Ọ dị na ngalaba Cake Wallet |
| zec.0xrpc.io:443 | 0xRPC na-arụ ya; ọ na-enye ebe njikọ ọha n'efu maka ọtụtụ chain ma na-arịọ onyinye iji kwụọ ụgwọ ikike |
| zaino.unsafe.zec.rocks:443 | Ihe atụ Zaino. Rịba aha nnabata ahụ ama; were ya dịka nke a ka na-anwale |
| testnet.zec.rocks:443 | Testnet, nwere ihe atụ testnet Zaino e depụtara na zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Netwọk ztreamer ọha nke Zcash Labs na-arụ. Lelee status.fastz.cash maka ebe njikọ mpaghara na ọnọdụ ọrụ. |

Lelee dashboard kama ịtụkwasị ndepụta a obi. Ndị na-arụ ọrụ na-abịa ma na-apụ, ibe dị otu a na-emekwa ochie.

### Ịgbanwe sava n’e-akpa ego gị

Ọ bara uru ime ma ọ bụrụ na ịchọrọ ịhọrọ onye na-arụ ọrụ ị tụkwasịrị obi, kesaa ọrụ n’etiti ndị na-arụ ọrụ, ma ọ bụ tụọ aka na nke gị.

Ụzọ menu ndị dị n’okpuru ziri ezi mgbe emelitere peeji a, mana interface e-akpa ego na-agagharị, yabụ were ha dịka ntụaka karịa ụzọ kpọmkwem. Chọọ Advanced Settings ma ọ bụ nhọrọ sava.

#### ZODL

A na-akpọbu ya Zashi. Cog dị n’akụkụ aka nri elu, emesia Advanced Settings. Tor dị n’otu ihuenyo ahụ. ZODL na-enyekwa ụzọ mkpirisi Switch server mgbe ọdịda sync sitere na sava na-adịghị emelite.

#### Zkool

Onye nọchiri Ywallet, nke sitere n’aka otu onye mmepụta ahụ (a naghịzi elekọta Ywallet n’onwe ya, ọ pụghịkwa iso netwọk ahụ mgbe Ironwood gasịrị). Akara gia (Mepee Ntọala) dị n’elu ihuenyo akaụntụ, emesia mpaghara Sava Light Node. Bọtịnụ ndepụta dị n’akụkụ ya na-ahọrọ n’ime sava ndị amaara, ebe mgba ọkụ Direct / Tor / Nym / Proxy dị n’okpuru ya na-ahazi otu e-akpa ego si ejikọta.

#### Zingo

Menu hamburger dị n’akụkụ aka ekpe elu, emesia Settings, wee pịgharịa ala.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Menu hamburger dị n’akụkụ aka ekpe elu, emesia Settings, emesia Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Ewere screenshot ndị ahụ na March 2025, ngwa ndị ahụ ewepụtakwala mbipụta kemgbe ahụ, yabụ bọtịnụ nwere ike ịbụla ebe ọzọ.

## Mmejọ A Na-ahụkarị

**Iche na sava ahụ nwere ike ịgụ Azụmahia gị**. Ọ nweghị ike. Igodo gị na-anọ na ngwaọrụ gị, ọnụego na memo dị n’ime Azụmahia nke e chebere echebe kpamkpam na-anọgide na Nzobe ederede — ọbụna megide onye mmegide mebiri sava ahụ.

**Ịgụ “shielded” dịka “njikọ na-amaghị aha”**. Azụmahia nke e chebere echebe na-echebe ihe na-eme na blockchain. Adreesị IP gị na oge ọrụ gị bụ oyi akwa dị iche, oyi akwa ahụ bụkwa kpọmkwem ihe sava ahụ na-ahụ.

**Iche na Tor na-ewepụ akara ọ bụla**. Tor na-ezobe IP gị n’aka sava ahụ, mana ọ naghị agbanwe ihe sava ahụ na-amụta site n’arịrịọ ị na-eme, ọ na-agbakwụnyekwa latency na syncing.

**Ịtụkwasị ndepụta sava dị na ibe wiki obi**. Ndị na-arụ ọrụ na-abịa ma na-apụ. Lelee [hosh.zec.rocks](https://hosh.zec.rocks/zec) na [status.fastz.cash](https://status.fastz.cash) ka ị mara ihe na-arụ ọrụ n’ezie tupu i jiri e-akpa ego gị jikọọ na ihe ọ bụla.

## Nchịkọta

E-akpa ego dị mfe na-enye gị pool nke e chebere echebe na-enweghị oghere diski, nke bụ ezigbo mgbanwe. Naanị ghọta nke ọma ihe ị na-agbanwe. Sava ahụ enweghị ike ịnara ego gị ma ọ bụ gụọ ọnụego gị nke e chebere echebe, mana ọ nọ n’ọnọdụ ọma ịhụ adreesị IP gị na mgbe ị na-eme Azụmahia. Gafee n’elu Tor, họrọ onye na-arụ sava gị n’amụma, ma ọ bụ gbaa nke gị.

## Peeji Ndị Metụtara

- [Onye nwere ike ịhụ Zcash Ịkwụ Ụhwọ](/start-here/who-can-see-your-zcash-payment) Gị — echiche maka ndị mbido banyere otu ajụjụ ahụ.
- [Ihe onye na-enyocha block nwere ike ịhụ](/zcash-tech/what-a-block-explorer-can-see) — ihe a na-ahụ na on-chain, ma e jiri ya tụnyere ihe a na-ahụ n’akụkụ sava.
- [Zaino](/zcash-tech/zaino) — eserese owuwu na ọrụ sara mbara nke Rust indexer.
- [Zinder](/zcash-tech/zinder) — alpha indexer nke Zcash Foundation, nke na-ejere e-akpa ego dị mfe ozi site na ihe nkwụnye dakọtara na lightwalletd.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — onye na-akwado nkwado nke sava e-akpa ego dị mfe na-agụ ozi n’aka ya.
- [Zcash Ịmekọrịta e-akpa ego](/zcash-tech/zcash-wallet-syncing) — otu e-akpa ego gị si hazie compact blocks ndị sava na-eziga.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — indexer Rust dị elu nke netwọkụ fastz.cash na-eji.

**Emelitere ikpeazụ:** Nọvemba 2026
