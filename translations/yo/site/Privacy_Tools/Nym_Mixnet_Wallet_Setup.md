<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ipa ọna Zcash Apamọwọ Lori Nym Mixnet

> Ìdánilójú ìkẹyìn: Oṣù Kẹsàn 29, 2026

Àwọn ìṣòwò tí a fi ààbò bo Zcash ń dáàbò bo dátà ìṣòwò lórí ẹ̀wọ̀n, ṣùgbọ́n àwọn àpò owó ṣì ń bá ara wọn sọ̀rọ̀ lórí ìkànnì ayélujára. Àwọn olùwòran nẹ́tíwọ́ọ̀kì lè kọ́ àwọn máàtìwọ́ọ̀kì bíi àdírẹ́sì IP rẹ, nígbà tí àpò owó rẹ bá so pọ̀, àti irú ètò ìṣiṣẹ́ tí ó bá ara wọn mu.

Nym fi ipele ikọkọ nẹtiwọọki ti o yatọ kun. Ni Oṣu Kẹsan ọdun 2026, ọna ti o dara julọ da lori apamọwọ:

1. **Mo fẹ́ kí àkópọ̀ Nym ti àpò owó rẹ wà nígbà tí ó bá wà.**
2. Bí bẹ́ẹ̀ kọ́, lo **ìpele-sisẹmu NymVPN Mixnet mode** kí a lè darí ìrìnnà nẹ́tíwọ́ọ̀kì àpò owó náà nípasẹ̀ Nym láìgbára lé àtìlẹ́yìn aṣojú àpò owó pàtó kan.

Fun ipilẹ VPN gbogbogbo ati dVPN, wo [VPN ati dVPN](./VPN_and_DVPN.md).

## Ohun tí Nym fi kún un — àti ohun tí kò ṣe

Isanwo Zcash ti a daabobo ati irinṣẹ aṣiri nẹtiwọọki yanju awọn iṣoro oriṣiriṣi:

- **Zcash** daabobo awọn alaye iṣowo lori pq.
- **Nym mixnet routing** ni a ṣe láti dín ìbáṣepọ̀ láàárín ìdámọ̀ nẹ́tíwọ́ọ̀kì gidi rẹ àti ìtajà tí ń gba àpò owó iṣẹ́ kù.
- Ibùdó tí a bá kàn sí nípasẹ̀ ọ̀nà NymVPN tó wà ní ìpele ètò yẹ kí ó rí ọ̀nà àbájáde Nym dípò IP ilé/alágbèéká rẹ.

Mixnet Nym nlo ọpọlọpọ awọn hops, idapọ packet, awọn idaduro laileto, ijabọ ideri, ati fifi ẹnọ kọ alubosa lati dinku jijo data nẹtiwọọki-metadata.

Nym kò dáàbò bo ẹ̀rọ tí ó bàjẹ́, sọ́fítíwọ́ọ̀kì àpò ìbàjẹ́, àwọn gbólóhùn ìgbàpadà tí a fi hàn, ìdánimọ̀ tí o fi hàn nípasẹ̀ àkọọ́lẹ̀ pàṣípààrọ̀, tàbí pípadánù ìpamọ́ tí ìṣiṣẹ́ Zcash tí ó hàn gbangba fà.

## Atilẹyin Nym abinibi: lo eyi ni akọkọ nigbati o ba wa

Nym kede ni Oṣu Kẹsan ọjọ 24, ọdun 2026 pe iṣẹ ifunni agbegbe Zcash rẹ ti pari ati pe atilẹyin mixnet abinibi n firanṣẹ ni awọn apamọwọ Zcash gidi.

### Àpò owó Zingo!

Zingo PC ní ọkọ̀ Nym ìbílẹ̀ kan. Zingo Mobile tún ń fi Mixnet Mode ránṣẹ́ lórí iOS àti Android nípa lílo àwòkọ Nym nínú app.

Ìwà lọ́wọ́lọ́wọ́ tí Zingo:

- Iṣakoso Nym wa labẹ **Awọn Eto → Nym Mixnet**.
- Fifiranṣẹ isanwo ni a gbe nipasẹ mixnet.
- Àwọn ìṣíkiri ìṣíkiri Ironwood tẹ̀lé ipa ọ̀nà ìfiránṣẹ́ kan náà tí a dáàbò bò.
- Àwọn ìbéèrè owó ZEC ni a tún máa ń lò nípasẹ̀ mixnet.
- Fífiránṣẹ́ kò ní sí ní pípa nígbà tí a bá ti mú Nym ṣiṣẹ́: tí ìrìnnà mixnet kò bá sí, a kò ní fi ìsanwó ránṣẹ́ ní ìdákẹ́jẹ́ẹ́ lórí clearnet.
- **A kò tíì lo àsopọ̀mọ́ra ẹ̀wọ̀n láti inú mixnet** lọ́wọ́lọ́wọ́ nínú Zingo PC. Àwọn bulọ́ọ̀kù kékeré, ìbéèrè nullifier, àwọn ìfipamọ́ ìṣòwò, ijabọ mempool, àti àwọn àyẹ̀wò ìlera olupin ṣì ń lo ìsopọ̀ olupin déédéé.

Ìyàtọ̀ yẹn ṣe pàtàkì: Ìṣọ̀kan ìbílẹ̀ Zingo's ń dáàbò bo ipa ọ̀nà ìsopọ̀mọ́ra tó ga jùlọ, ṣùgbọ́n kò tí ì jẹ́ ọ̀nà ìsopọ̀mọ́ra ẹ̀rọ gbogbo-ẹ̀rọ.

Tí àpẹẹrẹ ìhalẹ̀mọ́ rẹ bá tún nílò fífi ìjápọ̀ ìṣiṣẹ́ pa mọ́ kúrò lọ́wọ́ olupin náà, lo ọ̀nà ìpamọ́ ìpele ètò bíi NymVPN ní àfikún sí òye ìdúró àti ìṣòro tí èyí ń mú wá.

Àwọn orísun:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym ròyìn pé **Zkool** ń ṣe àtìlẹ́yìn fún sísopọ̀ mọ́ ètò Zcash RPC lórí Nym mixnet nípa lílo ìyípadà àbínibí.

Zkool ni arọ́pò YWallet. Iṣẹ́ àgbékalẹ̀ rẹ̀ tún ń ṣe àtìlẹ́yìn fún iṣẹ́ ìṣojú Tor àti iṣẹ́ oníṣẹ́ fún àwọn ìsopọ̀ olupin Zcash.

Fẹ́ràn àṣàyàn Nym Zkool's dípò gbígbìyànjú láti fipá mú kí YWallet àtijọ́ kan ṣẹ̀dá rẹ̀ nípasẹ̀ ọ̀nà aṣojú tí kò ní ìwé àṣẹ.

Àwọn orísun:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Àìsàn

NozyWallet tun ni awọn ipa ọna gbigbe ti o mọ nipa Nym. Iṣe rẹ lọwọlọwọ ṣe atilẹyin fun gbigbe ifilọlẹ iṣowo ti njade lori mixnet Nym ati ipa ọna Nym dVPN lọtọ fun amuṣiṣẹpọ-bulọọki compact-block. Wo awọn wọnyi bi awọn aabo ti o yatọ dipo ki o ro pe gbogbo ibeere apamọwọ lo mixnet laifọwọyi.

Àwọn orísun:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl ní **Tor Protection** nínú rẹ̀ lọ́wọ́lọ́wọ́, kì í ṣe ìṣọ̀kan Nym ìbílẹ̀ kan náà tí a ṣàlàyé lókè fún Zingo, Zkool, àti Nozy.

Ẹ̀yà ara Tor ti Zodl le darí ìfiránṣẹ́ ìṣòwò, ìgbàpadà ìṣòwò-dátà, ìbéèrè fún owó pàṣípààrọ̀, àti àwọn ìpè API ẹni-kẹta lórí Tor. Nym sọ ní ọjọ́ kẹrìnlélógún oṣù kẹsàn-án ọdún 2026 pé ó ṣì wà ní ìjíròrò pẹ̀lú ẹgbẹ́ Zodl nípa ìṣọ̀kan mixnet gbígbòòrò.

Fún Zodl lónìí, lo èyíkéyí:

- Ààbò Tor ti Zodl ti kọ sílẹ̀, tàbí
- NymVPN ipele-sisẹmu ti ibi-afẹde rẹ ba jẹ lati dari ijabọ ẹrọ gbogbogbo ti apamọwọ nipasẹ Nym.

Má ṣe rò pé Tor àti Nym jẹ́ àwọn ohun èlò tí a lè fi ṣe àyípadà nínú àpò owó nítorí pé àwọn méjèèjì jẹ́ àwọn nẹ́tíwọ́ọ̀kì ìpamọ́.

Àwọn ètò Zodl Tor:

**Diẹ sii → Awọn ẹya ara ẹrọ to ti ni ilọsiwaju → Beta: Idaabobo Tor → Mu ṣiṣẹ → Fipamọ awọn iyipada**

Àwọn orísun:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Isubu: NymVPN ipele-sisẹmu

Èyí ni àṣàyàn Nym tó báramu jùlọ nítorí pé kò nílò àpò owó láti lóye àwọn ètò ìṣàfihàn Nym pàtó.

### 1. Fi NymVPN sori ẹrọ

Ṣe igbasilẹ NymVPN nikan lati oju opo wẹẹbu osise ti Nym tabi ile itaja pẹpẹ osise kan:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN ṣe atilẹyin fun Android, iOS, Linux, Windows, ati macOS.

### 2. Yan ipo Mixnet

NymVPN ṣafihan **Ipo Yara**, ipa ọna dVPN 2-hop ti a ṣe iṣapeye fun idaduro kekere, ati ipo Mixnet**, ipa ọna mixnet 5-hop ti a ṣe iṣapeye fun aabo metadata nẹtiwọọki ti o lagbara. Fun iṣẹ apamọwọ ti o ni imọlara, yan ipo Mixnet ki o duro titi ti alabara yoo fi royin pe asopọ naa ti wa ni idasilẹ ṣaaju ṣiṣi tabi isọdọtun apamọwọ naa.

### 3. Fi apamọwọ silẹ lori awọn eto nẹtiwọọki deede

Nígbà tí ètò ìṣiṣẹ́ bá ti ń yí àwọn ènìyàn padà nípasẹ̀ NymVPN, ọ̀pọ̀lọpọ̀ àwọn àpò owó kò nílò àwọn ètò ìṣàpẹẹrẹ àdáni.

Ṣí àpò owó náà déédéé kí o sì jẹ́ kí ó dọ́gba.

Tí NymVPN bá fi àṣírí ihò ìfàsẹ́yìn hàn lórí ìtàkùn rẹ, jẹ́rìí sí i pé àpò owó náà wà nínú ihò ìfàsẹ́yìn tí a dáàbò bò**, kì í ṣe sí àkójọ ìfòpinsí tàbí ìyọkúrò.

### 4. Ṣe àyẹ̀wò ọ̀nà abẹ́lẹ̀ kí o tó lo àpò owó náà

Ayẹwo ipele eto ti o rọrun kan:

1. Ge asopọ NymVPN.
2. Ṣèbẹ̀wò sí iṣẹ́ àyẹ̀wò IP gbogbogbò, tàbí lórí kọ̀ǹpútà alágbèéká:

   ```bash
   curl https://api.ipify.org
   ```

3. Ṣe igbasilẹ IP ti o han.
4. So NymVPN pọ mọ ipo Mixnet.
5. Tún ṣe àyẹ̀wò náà.

IP gbogbo eniyan ti o han yẹ ki o yipada.

Èyí fi hàn pé ọ̀nà ìṣàn ẹ̀rọ náà jẹ́rìí sí i. Kò fi hàn pé gbogbo ìbéèrè tí àpò owó kan bá béèrè máa ń tẹ̀lé ọ̀nà kan náà tí àpù tàbí OS bá ní àwọn òfin ìtọ́sọ́nà pàtàkì.

Fun idaniloju diẹ sii lori tabili:

- ṣe àyẹ̀wò ilana apamọwọ pẹlu atẹle nẹtiwọọki ti eto iṣẹ,
- rí i dájú pé kò sí ìyọkúrò ihò-ìpín,
- jẹrisi awọn iyipada ihuwasi apamọwọ ti a reti ti o ba ti ge asopọ NymVPN.

Má ṣe fi àwọn àwòrán tí ó ní àdírẹ́sì àpò owó, ìwọ̀nba owó, ìdánimọ̀ ìṣòwò, àdírẹ́sì IP, tàbí ohun èlò ìgbàpadà hàn nígbà tí o bá ń ṣe àtúnṣe.

## Ipo aṣoju NymVPN dApp / apamọwọ

NymVPN tun ṣafihan ipo aṣoju app-ati-apamọwọ nipa lilo ipa ọna SOCKS5 / RPC nipasẹ mixnet.

Àkọsílẹ̀ ìṣètò gbogbogbòò ti Nym fi èyí hàn ní pàtàkì pẹ̀lú ìṣètò RPC ti ara Ethereum. Ó wúlò fún sọ́fítíwè tí ó ṣe àtìlẹ́yìn fún ọ̀nà proxy/RPC gbogbogbò tí ó báramu, ṣùgbọ́n kò yẹ kí a rò pé ó ń ṣiṣẹ́ pẹ̀lú gbogbo àpò Zcash.

Lo ipa ọna yii nikan nigbati awọn iwe apamọwọ funrararẹ ba jẹrisi atilẹyin aṣoju ti o baamu tabi RPC.

Bí bẹ́ẹ̀ kọ́, o fẹ́:

- ìṣọ̀kan Nym ti àpò owó náà, tàbí
- ipele-eto NymVPN.

## Awọn iṣowo iṣẹ ṣiṣe ati akoko ipari

Mixnets mọ̀ọ́mọ̀ ṣe ìtajà iyara fún ààbò metadata tó lágbára sí i.

Reti ipa ti o ṣeeṣe lori:

- amuṣiṣẹpọ apamọwọ akọkọ,
- awọn amuṣiṣẹpọ gbigba-soke nla,
- awọn ibeere itan-iṣowo,
- Awọn akoko idaduro RPC,
- Awọn ipe API ẹni-kẹta.

Ìtọ́sọ́nà tó wúlò:

- Bẹrẹ pẹlu awọn eto Nym aiyipada.
- Reti pe amuṣiṣẹpọ akọkọ tabi amuṣiṣẹpọ igba pipẹ yoo gba akoko pipẹ.
- Tún gbìyànjú àkókò ìsinmi kí o tó sọ àwọn ètò ìpamọ́ di aláìlera.
- Yẹra fún yíyípadà àwọn ipò ìpamọ́ lẹ́ẹ̀kọ̀ọ̀kan kí ìṣòwò tó ṣe pàtàkì.
- Tí o bá lo ọ̀nà tó yára jù fún ìṣọ̀kanpọ̀pọ̀, mọ̀ pé àwọn ẹ̀rọ ìbánisọ̀rọ̀ tí a ti kàn sí lè kíyèsí ìdámọ̀ nẹ́tíwọ́ọ̀kì rẹ ní àkókò yẹn.
- Fún Zingo PC pàtó, rántí pé ọkọ̀ Nym ìbílẹ̀ rẹ̀ ń dáàbò bo àwọn ìfiránṣẹ́ àti wíwá owó lọ́wọ́lọ́wọ́, nígbàtí ìṣọ̀kan náà ṣì wà ní tààrà.

## Àwọn ohun tí a ronú nípa rẹ̀ lórí fóònù alágbéká

Lórí Android àti iOS, ọ̀nà VPN ẹ̀rọ ìṣiṣẹ́ sábà máa ń jẹ́ ọ̀nà tó rọrùn jùlọ láti darí ìjáde gbogbogbòò nípasẹ̀ NymVPN: so NymVPN pọ̀ ní àkọ́kọ́, lẹ́yìn náà ṣí àpò náà.

Tí VPN mìíràn, firewall, tàbí ad blocker VPN agbègbè bá ti wà ní ojú-ọ̀nà VPN ètò náà, àwọn ọjà méjèèjì lè má lè ṣiṣẹ́ ní àkókò kan náà. Jẹ́rìí ipò VPN ètò ìṣiṣẹ́ kí o tó rò pé àpò owó náà wà ní ààbò.

## Àtòjọ àwòṣe ewu

Ṣaaju ki o to gbẹkẹle eto naa, beere:

- Ṣé mo ń lo àwọn àdírẹ́sì Zcash tí a fi ààbò pamọ́ níbi tí ó bá yẹ?
- Ṣé àpò owó mi ní àtìlẹ́yìn Nym ti ìbílẹ̀?
- Tí ó bá rí bẹ́ẹ̀, ọ̀nà wo gan-an ni ìṣọ̀kan ìbílẹ̀ náà ń dáàbò bò?
- Tí mo bá nílò ààbò tó gbòòrò, ṣé NymVPN ti sopọ̀ mọ́ra kí àpò owó tó bẹ̀rẹ̀ iṣẹ́ nẹ́tíwọ́ọ̀kì?
- Ṣé òfin ìpínyà-ìlànà ni a kò fi àpò owó náà sílẹ̀?
- Ṣé mo gbẹ́kẹ̀lé ipò ìṣàpẹẹrẹ kan tí àpò owó náà ń ṣàkọsílẹ̀ ní gidi?
- Ṣé mo ń sọ̀dá ìdánimọ̀ nípasẹ̀ pàṣípààrọ̀, ìpàdé ẹ̀rọ aṣàwárí, API ẹni-kẹta, tàbí àdírẹ́sì tí ó hàn gbangba?
- Ṣé mo ti múra tán fún ìṣiṣẹ́pọ̀ díẹ̀díẹ̀ àti àkókò ìsinmi lẹ́ẹ̀kọ̀ọ̀kan?

## Àwọn Orísun

- Nym: Nym mixnet n gbe ni awọn apamọwọ Zcash bayi, Oṣu Kẹsan Ọjọ 24, Ọdun 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Ìwà Zingo PC Nym: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Gbigbe Zingo Mobile Nym: https://github.com/zingolabs/zingo-mobile
- Ibi ipamọ Zkool: https://github.com/hhanh00/zkool2
- NozyWallet Nym iṣẹ irinna: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Ààbò Zodl Tor: https://support.zodl.com/article/17-enabling-tor-protection
