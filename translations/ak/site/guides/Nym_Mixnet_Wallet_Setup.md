<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/Nym_Mixnet_Wallet_Setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edihttps://github.com/ZecHub/zechub/pull/2238t Page"/>
</a>

# Fa Zcash Wallet Traffic no fa Nym Mixnet no so

> Nea etwa to a wogye toom: September 29, 2026

Zcash shielded transactions bɔ nkitahodi data ho ban wɔ nkɔnsɔnkɔnsɔn so, nanso sika kotoku da so ara di nkitaho wɔ intanɛt so. Network observers betumi asua metadata te sɛ wo IP address, bere a wo wallet no di nkitaho, ne infrastructure a ɛne no di nkitaho.

Nym de network-privacy layer a ɛyɛ soronko ka ho. Efi September 2026 no, ɔkwan a eye sen biara no gyina sika kotoku no so:

1. **Pɛ sɛ sika kotoku bi native Nym integration bere a ɛwɔ hɔ no.**
2. Sɛ ɛnte saa a, fa **system-level NymVPN Mixnet mode** di dwuma enti wɔde sika kotoku no ntwamutam akwantuo no fa Nym so a ennyina sika kotokuo pɔtee proxy mmoa so.

Sɛ wopɛ VPN ne dVPN akyi nsɛm nyinaa a, hwɛ [VPN & dVPN na ɛyɛ adwuma](./VPN_and_DVPN.md).

## Nea Nym de ka ho — ne nea ɛnyɛ

Zcash sikatua a wɔabɔ ho ban ne ntwamutam kokoam adwinnade di ɔhaw ahorow ho dwuma:

- **Zcash shielded pools** bɔ asɛm no ho nsɛm ho ban wɔ nkɔnsɔnkɔnsɔn so.
- **Nym mixnet routing** yɛ nea wɔayɛ sɛ ɛbɛtew nkitahodi a ɛda wo network identity ankasa ne service a egye wallet traffic ntam.
- Ɛsɛ sɛ beaeɛ a wɔnam system-level NymVPN tunnel so di nkitaho no hunu Nym kwan a wɔfa so firi adi sene wo fie/mobile IP.

Nym mixnet de hops pii, packet mixing, randomized delays, cover traffic, ne onion encryption di dwuma de tew network-metadata leakage so.

Nym **ɛnyɛ** ho ban mfi mfiri a wɔasɛe no, sika kotoku softwea a ɛyɛ hu, nsɛmfua a wɔde san nya a wɔada no adi, nipasu a woda no adi denam nsakrae akontaabu so, anaasɛ kokoam nsɛm a ɛyera a Zcash dwumadi a ɛda adi pefee de ba no ho.

## Native Nym mmoa: di kan fa eyi di dwuma bere a ɛwɔ hɔ no

Nym de too gua wɔ September 24, 2026 sɛ ne Zcash Community Grant adwuma no awie na native mixnet mmoa no de remena wɔ Zcash sika kotoku ankasa mu.

### Zingo! Sikabɔtɔ

Zingo PC ka Nym akwantuo a ɛyɛ kurom hɔ de ho. Zingo Mobile nso de Mixnet Mode mena wɔ iOS ne Android so denam in-app Nym proxy so.

Mprempren nneyɛe a Zingo:

- Nym control no wɔ **Nsiesiei → Nym Mixnet** ase.
- Wɔde sikatua a wɔde mena no fa mixnet no so.
- Ironwood atutra nkrasɛm di ɔkwan koro no ara a wɔabɔ ho ban a wɔde mena no akyi.
- ZEC boɔ abisadeɛ nso nam mixnet no so na ɛkɔ.
- Sending di nkogu wɔ mu bere a Nym yɛ adwuma: sɛ mixnet transport no nni hɔ a, wɔmfa sikatua no nkɔ komm wɔ clearnet so.
- **Chain synchronization mprempren nnyɛ routed denam mixnet** wɔ Zingo PC. Compact blocks, nullifier queries, transaction fetches, mempool traffic, ne server-health checks da so ara de server nkitahodi a ɛyɛ daa no di dwuma.

Saa nsonsonoe no ho hia: Zingo's kurom nkabom no bɔ ɔkwan a ɛkorɔn sen biara a wɔde bɔ amanneɛ no ho ban, nanso ennya nyɛɛ mfiri nyinaa ntam nkitahodi kwan.

Sɛ wo ahunahuna nhwɛsoɔ no nso hwehwɛ sɛ wode sync traffic sie firi server no so a, fa system-level privacy tunnel te sɛ NymVPN di dwuma de ka nteaseɛ a ɛfa latency ne nsɛnnennen foforɔ a yei de ba no ho.

Nneɛma a wonya fi mu:

- https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- https://github.com/zingolabs/zingo-mobile
- https://nym.com/blog/nym-mixnet-zcash-wallets

### Zkool

Nym bɔ amanneɛ sɛ **Zkool** seesei boa sɛ wobɛka Zcash RPC infrastructure so wɔ Nym mixnet so denam native toggle a wode bedi dwuma so.

Zkool yɛ YWallet. Ne dwumadie no nso boa Tor proxy ne onion dwumadie ma Zcash server nkitahodiɛ.

Pɛ Zkool's kurom Nym option sen sɛ wobɛbɔ mmɔden sɛ wobɛhyɛ YWallet dedaw bi si denam proxy kwan a enni nkrataa so.

Nneɛma a wonya fi mu:

- https://nym.com/blog/nym-mixnet-zcash-wallets
- https://github.com/hhanh00/zkool2

### Nozy

NozyWallet nso wɔ Nym-aware akwantuo akwan. Ne mprempren dwumadie no boa routing outgoing transaction submission wɔ Nym mixnet so ne Nym dVPN kwan a ɛyɛ soronko ma compact-block synchronization. Fa eyinom sɛ ahobammɔ soronko sen sɛ wobɛfa no sɛ sika kotoku biara a wɔbisa no de mixnet no di dwuma ɔno ara.

Nneɛma a wonya fi mu:

- https://github.com/LEONINE-DAO/Nozy-wallet
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_SEND_EGRESS_CASE_BREAKDOWN.md
- https://github.com/LEONINE-DAO/Nozy-wallet/blob/master/docs/reference/NYM_DVPN_SYNC_CASE_BREAKDOWN.md

### Zodl

Zodl mprempren wɔ **Tor Protection** a wɔasisi mu, ɛnyɛ native Nym nkabom koro no ara a yɛaka ho asɛm wɔ atifi hɔ ama Zingo, Zkool, ne Nozy.

Zodl Tor feature no tumi fa atɔfoɔ a wɔde bɛmena, atɔfoɔ-data a wɔgye, exchange-rate abisadeɛ, ne API frɛ a ɛtɔ so mmiɛnsa fa Tor so. Nym kaa wɔ September 24, 2026 sɛ ɛda so ara ne Zodl kuw no rebɔ nkɔmmɔ denneennen fa mixnet nkabom a ɛtrɛw ho.

Sɛ wopɛ Zodl nnɛ a, fa emu biara di dwuma:

- Zodl a wɔakyerɛw Tor Protection, anaasɛ
- system-level NymVPN sɛ wo botaeɛ ne sɛ wobɛfa wallet no general device traffic no so afa Nym so a.

Mfa no sɛ Tor ne Nym yɛ akwantuo a wɔsesa wɔ sika kotokuo no mu esiane sɛ wɔn mmienu nyinaa yɛ kokoam nkitahodiɛ nti kɛkɛ.

Zodl Tor nhyehyɛe:

**Pii → Nneɛma a ɛkɔ akyiri → Beta: Tor Ahobammɔ → Ma → Sie nsakrae**

Nneɛma a wonya fi mu:

- https://support.zodl.com/article/17-enabling-tor-protection
- https://nym.com/blog/nym-mixnet-zcash-wallets

## Fallback: nhyehyɛe-gyinabea NymVPN

Eyi ne Nym nhyehyɛe a ɛne ne ho hyia kɛse efisɛ enhia sɛ sika kotoku no te Nym-specific proxy nhyehyɛe ase.

### 1. Fa NymVPN hyɛ mu

Twe NymVPN fi Nym official website anaa official platform store nkutoo so:

- https://nym.com/
- https://nym.com/blog/nymvpn-v2026.12

NymVPN boa Android, iOS, Linux, Windows, ne macOS.

### 2. Paw Mixnet mode no

NymVPN da **Fast mode** adi, 2-hop dVPN kwan a wɔayɛ no yie ama latency a ɛba fam, ne **Mixnet mode**, 5-hop mixnet kwan a wɔayɛ no yie ama network-metadata ahobanbɔ a ɛyɛ den. Sɛ wopɛ sika kotoku dwumadi a ɛyɛ mmerɛw a, paw Mixnet mode na twɛn kosi sɛ akraman no bɛbɔ amanneɛ sɛ wɔde nkitahodi no asi hɔ ansa na woabue anaa woayɛ sika kotoku no foforo.

### 3. Gyae sika kotoku no wɔ network nhyehyɛe a ɛyɛ daa so

Sɛ dwumadie nhyehyɛeɛ no reyɛ tunneling traffic dedaw denam NymVPN, wallet dodoɔ no ara nhia custom proxy nhyehyeɛ.

Bue sika kotoku no sɛnea ɛsɛ na ma no kwan ma ɛnyɛ pɛpɛɛpɛ.

Sɛ NymVPN da split tunneling adi wɔ wo platform no so a, si so dua sɛ sika kotoku no **ka tunnel a wɔabɔ ho ban no ho**, ɛnyɛ nea wɔde ato bypass anaa exclusion list so.

### 4. Hwɛ sɛ tuntum no yɛ nokware ansa na wode sika kotoku no adi dwuma

Nhyehyɛe-gyinabea nhwehwɛmu a ɛnyɛ den:

1. Twa NymVPN.
2. Kɔ ɔmanfo IP-hwɛ adwuma bi so, anaasɛ wɔ desktop run so:

   ```bash
   curl https://api.ipify.org
   ```

3. Kyerɛw IP a wotumi hu no.
4. Fa NymVPN di nkitaho wɔ Mixnet mode mu.
5. Tia nhwehwɛmu no mu bio.

Ɛsɛ sɛ ɔmanfo IP a wotumi hu no sesa.

Eyi si nhyehyɛe no tunnel no so dua. Ɛnkyerɛ **ɛnyɛ** sɛ abisadeɛ biara a sika kotokuo pɔtee bi de yɛ no di ɔkwan korɔ no ara akyi sɛ app anaa OS no wɔ routing mmara soronko a.

Sɛ wopɛ awerɛhyem pii wɔ desktop so a:

- hwehwɛ sika kotoku no nhyehyɛe no mu denam operating system no network monitor no so,
- hwɛ sɛ split-tunnel biara nni hɔ a wɔayi afi mu,
- si so dua sɛ sika kotoku suban nsakrae a wɔhwɛ kwan sɛ wɔatwa NymVPN mu a.

Mfa screenshots a wallet address, balances, transaction ID, IP address, anaa recovery material wom nkɔ bere a woredi ɔhaw ahorow ho dwuma no.

## NymVPN dApp / sika kotoku proxy mode

NymVPN nso da app-ne-wallet proxy mode adi denam SOCKS5 / RPC routing a ɛnam mixnet so.

Nym ɔmanfoɔ nhyehyeɛ nkrataa no kyerɛ yei titire ne Ethereum-style RPC nhyehyeɛ. Ɛho wɔ mfasoɔ ma softwea a ɛboa pefee sɛ ɛboa generic proxy/RPC kwan a ɛne no hyia, nanso ɛnsɛ sɛ **ɛnyɛ** sɛ wɔfa no sɛ ɛne Zcash sika kotokuo biara yɛ adwuma.

Fa saa kwan yi di dwuma bere a sika kotoku no ankasa nkrataa si proxy anaa RPC mmoa a ɛne no hyia so dua nkutoo.

Sɛ ɛnte saa a, pɛ sɛ:

- sika kotoku no kurom Nym nkabom, anaasɛ
- nhyehyɛe-gyinabea NymVPN.

## Adwumayɛ ne bere a wɔde yɛ adwuma a wɔde di gua

Mixnets hyɛ da sesa ahoɔhare de nya metadata ahobammɔ a emu yɛ den.

Hwɛ kwan sɛ ebetumi anya nkɛntɛnso wɔ:

- mfitiase sika kotoku a wɔde yɛ adwuma,
- catch-up syncs akɛse,
- nkitahodi-abakɔsɛm ho nsɛmmisa,
- RPC bere a wɔde twam,
- API frɛ a ɛto so abiɛsa.

Akwankyerɛ a mfaso wɔ so:

- Fi ase de Nym nhyehyɛe a wɔahyɛ da ayɛ.
- Hwɛ kwan sɛ sync a edi kan anaa catch-up sync tenten begye bere tenten.
- San sɔ bere a wɔde twam hwɛ ansa na woayɛ kokoam nhyehyɛe ahorow no mmerɛw.
- Kwati sɛ wobɛsesa kokoam nsɛm a wode sie no mpɛn pii ntɛm ara ansa na woayɛ asɛm a ɛho hia.
- Sɛ wode ɔkwan a ɛyɛ ntɛm di dwuma ma bulk sync a, te ase sɛ contacted infrastructure betumi ahwɛ wo network identity ankasa wɔ saa bere no mu.
- Zingo PC pɔtee, kae sɛ ne kurom Nym akwantu mprempren bɔ send ne bo hwehwɛ ho ban, bere a synchronization da so ara yɛ tẽẽ.

## Mobile so nsusuwii ahorow

Wɔ Android ne iOS so no, operating system VPN slot no taa yɛ ɔkwan a ɛyɛ mmerɛw a wobɛfa so de general wallet traffic afa NymVPN: fa NymVPN di kan bata ho, afei bue wallet no.

Sɛ VPN, firewall, anaa local VPN-based ad blocker foforo agye system VPN interface no dedaw a, ebia nneɛma abien no rentumi nyɛ adwuma bere koro mu. Si operating system no VPN tebea so dua ansa na woafa no sɛ wɔabɔ sika kotoku no ho ban.

## Ahunahuna-nhwɛso nhwehwɛmu kratasin

Ansa na wode wo ho bɛto nhyehyɛe no so no, bisa sɛ:

- So mede Zcash address ahorow a wɔabɔ ho ban redi dwuma wɔ baabi a ɛfata?
- So me sika kotoku no wɔ native Nym support?
- Sɛ saa a, kar akwan bɛn ankasa na saa native integration no bɔ ho ban?
- Sɛ mihia coverage a ɛtrɛw a, so NymVPN abɔ ansa na wallet no afi network dwumadi ase?
- So mmara bi a ɛfa mpaapaemu a wɔde fa nsu mu na ɛayi sika kotoku no afi mu?
- So mede me ho ato proxy mode bi a sika kotoku no kyerɛw ho asɛm ankasa so?
- So menam exchange, browser session, third-party API, anaa address a ɛda adi so retu identity?
- So masiesie me ho ama sync a ɛyɛ brɛoo ne bere a ɛtɔ mmere bi a ɛbɛtwa mu?

## Nneɛma a wonya fi mu

- Nym: Nym mixnet mprempren te Zcash sika kotoku mu, September 24, 2026: https://nym.com/blog/nym-mixnet-zcash-wallets
- Zingo PC Nym nneyɛe: https://github.com/zingolabs/zingo-pc#the-nym-mixnet
- Zingo Mobile Nym akwantuo: https://github.com/zingolabs/zingo-mobile
- Zkool akoraeɛ: https://github.com/hhanh00/zkool2
- NozyWallet Nym akwantuo adwuma: https://github.com/LEONINE-DAO/Nozy-wallet
- NymVPN v2026.12: Ɔde ne nsa kyerɛɛ ne so. https://nym.com/blog/nymvpn-v2026.12
- Zodl Tor Ahobammɔ: https://support.zodl.com/article/17-enabling-tor-protection
