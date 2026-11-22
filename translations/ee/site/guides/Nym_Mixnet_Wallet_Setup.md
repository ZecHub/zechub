<a href="https://github.com/zechub/zechub/edit/main/site/guides/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa ƒe trɔtrɔ"/>
</a>

# Ɖo Zcash Gakotoku [wallet] Ƒe Network Trafiki To Nym Mixnet Dzi

> Woɖe kpekpeɖeŋu kpuie zi mamlɛtɔ: September 29, 2026

Zcash ɣaɣla [shielded] gaɖoɖowo [transactions] xɔa gaɖoɖo ƒe nyawo ɖoɖonu dzi [on-chain] ɖe asi, gake gakotokuwɔ haƒo to internet dzi. Network ƒe nukpɔlawo ate ŋu anya metadata abe wò IP gaɖoƒe ƒe dzesi, ɣeyiɣi si wò gakotoku va do ƒome kple, eye infrastructure si wò do ƒome kplii ene.

Nym tsɔa network ɣaɣla [privacy] ƒe keke mawu bubu kpe ɖe eŋu. Le September 2026 me la, mɔ nyuitɔ la dze ɖe gakotoku la ŋu:

1. **Tia gakotoku ƒe Nym integration si wotu ɖe eme le eŋu ne wònɔ anyi.**
2. Ne menye nenema o la, zã **system-level NymVPN Mixnet mode** be woato gakotoku ƒe network trafiki to Nym dzi, eye wòmagaɖe asi ɖe gakotoku tɔxɛ proxy ƒe kpekpeɖeŋu ŋu o.

Ne nàdi VPN kple dVPN ƒe nyagblɔɖi gbogblɔ, kpɔ [VPN & dVPN](../Privacy_Tools/VPN_and_DVPN.md).

## Nu si Nym tsɔna kpe ɖe eŋu — kple nu si wòmeɖe wɔm o

ɣaɣla Zcash fexexe [payment] kple network ɣaɣla ƒe dɔwɔnu wòaɖɔ fukpekpe bubuwo:

- **Zcash ɣaɣla gaƒuƒoƒowo [shielded pools] xɔa gaɖoɖo ƒe nyawo ɖoɖonu dzi ɖe asi.**
- **Nym mixnet ƒe mɔ-toɖoɖo wowɔe be wòagblẽ kadodo si le wò network ƒe nyenye vavã kple dɔwɔƒe si xɔa gakotoku ƒe trafiki dome.**
- Dɔwɔƒe si woɖo ƒome kplii to system-level NymVPN tunnel me la ele be wòakpɔ Nym exit ɖe wò aƒeme/asitelefon IP teƒe.

Nym ƒe mixnet zãna hops geɖe, packet ƒe tsɔtsrɔ̃, ɣeyiɣi si wodzra ɖe eme fũe, cover traffic, kple onion encryption be wòaɖe network-metadata ƒe dzudzɔɖoɖo gbɔ.

Nym **menoa ɖe asi o** tso device si woɖu dzi le, gakotoku ƒe software vɔ̃, recovery phrases si do go, nyenye si nàfia to gatrɔƒe [exchange] ƒe accountwo me, alo ɣaɣla ƒe vuvɔ si va tso nuwo ƒe ʋuʋuɖi [transparent] Zcash ƒe dɔwɔwɔ me.

## Nym ƒe native kpekpeɖeŋu: zãe gbã ne wònɔ anyi

Nym gblɔ le September 24, 2026 be eƒe Zcash Community Grant dɔ la wu, eye native mixnet ƒe kpekpeɖeŋu le dzodzom le Zcash gakotokuwɔ me.

### Zingo! Gakotoku

Zingo PC ɖe Nym transport si wotu ɖe eme ɖe eŋu. Zingo Mobile hã tsɔ Mixnet Mode va le iOS kple Android dzi, eye wozã Nym proxy si le app la me.

Nu si wòle fifia abe Zingo ŋlɔe ene:

- Nym ƒe control le **Settings → Nym Mixnet** te.
- Fexexe ɖoɖo to mixnet la me.
- Ironwood migration ƒe transmissionwo hã to send mɔ si woxɔ ɖe asi la me.
- ZEC ƒe asiƒe biabiawo hã to mixnet la me.
- Ne woʋu Nym la, sending wɔnɔa dedie: ne mixnet transport menɔ anyi o la, wometsɔa fexexe la ɖo to clearnet dzi tsɔ ɣlae o.
- **Ɖoɖonu [chain] ƒe synchronization mele mixnet la me fifia o** le Zingo PC me. Compact blocks, nullifier biabiawo, gaɖoɖo xexle, mempool trafiki, kple server ƒe nɔnɔme nyuitɔ ƒe kpɔkpɔ lia server ƒe kadodo masani la dzi.

Mama la le vevie: Zingo ƒe native integration xɔa broadcast mɔ si kadodo geɖe le le eŋu ɖe asi, gake menye device bliboa ƒe network tunnel haɖe o.

Ne wò threat model hã bia be woaɣla sync trafiki tso server la gbɔ la, zã system-level ɣaɣla tunnel abe NymVPN ene, eye nàse asi le ɣeyiɣi didi kple fukpekpe si esia va kplɔe ɖo la ŋu.

Tɔgbuiwo:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym gblɔ be **Zkool** ate ŋu va do ƒome kple Zcash RPC infrastructure to Nym mixnet la me fifia, eye native toggle le eŋu.

Zkool nye YWallet ƒe successor si woaɖɔa fifia. Eƒe project la hã kpe ɖe Tor proxying kple onion services ŋu na Zcash server ƒe kadodowo.

Tia Zkool ƒe native Nym option ɖe mɔ si nàte ŋu akaka YWallet ƒe build xoxo aɖo proxy mɔ si me woŋlɔ nya tso o la me.

Tɔgbuiwo:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet hã ƒe transport mɔ siwo nya Nym le. Eƒe implementation fifia kpe ɖe outgoing gaɖoɖo submission ƒe mɔ-toɖoɖo to Nym mixnet dzi, kple Nym dVPN mɔ bubu na compact-block synchronization ŋu. Bu esiawo abe ɣaɣla vovovowo ene, eye mèbu be gakotoku ƒe biabia ɖe sia ɖe to mixnet la me ɖe eɖokui si o.

Tɔgbuiwo:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl ƒe **Tor Protection** si wotu ɖe eme le fifia, menye native Nym integration ma ke si woɖe ƒoɖoɖo tsoe le afisia na Zingo, Zkool, kple Nozy o.

Zodl ƒe Tor feature ate ŋu ato gaɖoɖo submission, gaɖoɖo-nyawo ƒe xexle, gatrɔ ƒe rate biabiawo, kple third-party API ƒe yɔyɔwo to Tor dzi. Nym gblɔ le September 24, 2026 be wòle nyadzɔdzɔ geɖe me fifia kple Zodl ƒe team la tso mixnet integration si keke wu ŋu.

Na Zodl egbea la, zã ɖeka tso esiawo me:

- Zodl ƒe Tor Protection si woŋlɔ nya tsoe, alo
- system-level NymVPN ne wò tae nye be nàto gakotoku ƒe device trafiki gbogblɔ to Nym dzi.

Mèbu be Tor kple Nym enye transport siwo wòate ŋu atrɔ ɖe wo nɔewo teƒe le gakotoku la me o, elabena wòwo katã nye ɣaɣla ƒe networkwo.

Zodl Tor ƒe settings:

**More → Advanced Features → Beta: Tor Protection → Enable → Save changes**

Tɔgbuiwo:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Mɔ bubu: system-level NymVPN

Esia nye Nym option si wòate ŋu awɔ dɔ kple nu geɖe wu, elabena mebia be gakotoku la nase Nym-tɔxɛ proxy settings o.

### 1. Ɖo NymVPN ɖe eme

Wòtsɔ NymVPN va tso Nym ƒe official website alo official platform store ko me:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN kpe ɖe Android, iOS, Linux, Windows, kple macOS ŋu.

### 2. Tia Mixnet mode

NymVPN ƒe **Fast mode**, nye 2-hop dVPN mɔ si woɖe ɖe latency sue ŋu, eye **Mixnet mode**, nye 5-hop mixnet mɔ si woɖe ɖe network-metadata ƒe ɣaɣla sesẽ wu ŋu. Na gakotoku ƒe dɔ si le vevie la, tia Mixnet mode eye nàlala va se ɣeyiɣi si client la gblɔ be kadodo la wɔ anyi hafi nàʋu alo nàgbɔ gakotoku la.

### 3. Na gakotoku la nanɔ network ƒe settings masaniwo dzi

Ne operating system la ato trafiki to NymVPN dzi xoxo la, gakotokuwɔ geɖe mebiaa proxy settings tɔxɛ o.

Ʋu gakotoku la abe ale si nèwɔnɛ ɖaa ene, eye na wòaɖɔ sync.

Ne NymVPN fia split tunneling le wò platform dzi la, kpɔ be gakotoku la **le tunnel si woxɔ ɖe asi la me**, eye wometsɔe de bypass alo exclusion list me o.

### 4. Kpɔ tunnel la ɖa hafi nàzã gakotoku la

System-level ƒe kpɔkpɔ bɔbɔe aɖe:

1. Ɖe NymVPN ƒe kadodo ɖa.
2. Yi public IP-checking service dzi, alo le desktop dzi la wɔ:

   ```bash
   curl https://api.ipify.org
   ```

3. Ŋlɔ IP si wòkpɔ la ɖe agbalẽ dzi.
4. Ɖo NymVPN ƒome le Mixnet mode me.
5. Wɔ kpɔkpɔ la ake.

Ele be public IP si wòkpɔ la natrɔ.

Esia fia be system tunnel la wɔ dɔ. Emefia be biabia ɖe sia ɖe si gakotoku aɖe wɔ hã to mɔ ma ke me o, ne app alo OS la ƒe routing rules tɔxɛ le.

Ne nàdi kafukafu geɖe le desktop dzi:

- kpɔ gakotoku ƒe process la kple operating system ƒe network monitor,
- kpɔ be split-tunnel exclusion aɖeke mele o,
- kpɔ be gakotoku la ƒe nɔnɔme si nèle mɔm na la trɔ ne woɖe NymVPN ƒe kadodo ɖa.

Mègblɔ screenshot si me gakotoku ƒe gaɖoƒe ƒe dzesiwo, balancewo, gaɖoɖo IDs, IP gaɖoƒe ƒe dzesiwo, alo recovery materialwo le o, esi nèle fukpekpe la dim.

## NymVPN dApp / gakotoku ƒe proxy mode

NymVPN hã fia app kple gakotoku ƒe proxy mode, eye wozã SOCKS5 / RPC mɔ-toɖoɖo to mixnet la me.

Nym ƒe public setup ƒe agbalẽwo fia esia vevie kple Ethereum-style RPC configuration. Ewɔ na software si kpe ɖe generic proxy/RPC mɔ si sɔ kple eŋu ɖe asi le nyateƒe me, gake mele be woabu be wòawɔ dɔ kple Zcash gakotoku ɖe sia ɖe o.

Zã mɔ sia ko ne gakotoku ƒe agbalẽwo ɖokpe ɖe proxy alo RPC ƒe kpekpeɖeŋu si sɔ kple eŋu.

Ne menye nenema o la, tia:

- gakotoku ƒe native Nym integration, alo
- system-level NymVPN.

## Performance kple timeout ƒe fukpekpewo

Mixnets ɖoa ŋusẽ ɖe speed ŋu ɖe metadata ƒe ɣaɣla sesẽ wu ta.

Ðo ŋku edzi be esia ate ŋu awɔ tɔxɛ le:

- gakotoku ƒe synchronization gbã,
- catch-up sync didiwo,
- gaɖoɖo ƒe history biabiawo,
- RPC timeoutwo,
- third-party API ƒe yɔyɔwo.

Nufiame si anwɔ dɔ:

- Dze egɔme kple Nym ƒe settings siwo wode ɖo xoxo.
- Ðo ŋku edzi be sync gbã alo catch-up sync didi aɖe axɔ ɣeyiɣi didi wu.
- Wɔ timeout aɖe gake hafi nàɖe ɣaɣla ƒe settings ƒe sesẽ gbɔ.
- Mègatrɔa ɣaɣla ƒe modes enuenu enumake hafi nàwɔ gaɖoɖo si le vevie o.
- Ne nàzã mɔ si kabakaba wu na bulk sync la, se egɔme be infrastructure si nèdo ƒome kplii ate ŋu akpɔ wò network ƒe nyenye vavã le ɣeyiɣi ma me.
- Na Zingo PC tɔxɛ la, ɖo ŋku edzi be eƒe native Nym transport xɔa sends kple asiƒe didi ɖe asi fifia, ke synchronization lia direct.

## Mobile ƒe nudzodzrowo

Le Android kple iOS dzi la, operating system ƒe VPN slot nye mɔ bɔbɔe si le vevie wu be nàto gakotoku ƒe trafiki gbogblɔ to NymVPN dzi: Ɖo NymVPN ƒome gbã, ekema nàʋu gakotoku la.

Ne VPN bubu, firewall, alo local VPN-based ad blocker aɖe xɔ operating system ƒe VPN interface xoxo la, products eveawo mate ŋu awɔ dɔ ɖekae o. Kpɔ operating system ƒe VPN ƒe nɔnɔme ɖa hafi nàbu be woɣla gakotoku la.

## Threat-model ƒe checklist

Hafi nàɖo ŋusẽ ɖe setup la ŋu la, bia ɖokuiwò:

- Metsoa ɣaɣla Zcash gaɖoƒe ƒe dzesiwo zã le teƒe siwo dzeegbɔ?
- Nye gakotoku la ƒe native Nym support le?
- Ne ele, trafiki kae native integration ma xɔna ɖe asi le nyateƒe me?
- Ne mehia coverage si keke wu la, NymVPN ɖo ƒome hafi gakotoku la dze network dɔ wɔwɔ gɔme?
- Split-tunneling rule aɖe ɖee gakotoku la ɖa?
- Mele proxy mode aɖe dzi ɖo ŋusẽ si gakotoku la ŋlɔ nya tsoe le nyateƒe me?
- Mele identity dzudzɔm to gatrɔƒe, browser session, third-party API, alo nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi aɖe me?
- Mede ɖokuiwɔ ɖo be sync aɖɔ ɣeyiɣi didi, eye timeoutwo ate ŋu ava le ɣeyiɣi aɖewo?

## Tɔgbuiwo

- Nym: Nym mixnet le Zcash gakotokuwɔ me fifia, September 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym ƒe nɔnɔme: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym transport: https://github.com/zingolabs/zingo-mobile
- Zkool repository: https://github.com/hhanh00/zkool2
- NozyWallet Nym transport dɔ: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Protection: https://support.zodl.com/article/17-enabling-tor-protection
