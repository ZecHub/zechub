<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jarida Lililolindwa

> Tuma ujumbe wa kuashiria kwenye orodha ya anwani zilizolindwa kama memo za Zcash, ukitumia Zallet. Orodha ya wapokeaji na ujumbe hukaa mbali na anwani zenye uwazi.

Jarida lililolindwa ni mfululizo wa miamala iliyolindwa. Kila matokeo hulipa kiasi kidogo kwa mpokeaji Unified Address na hubeba kipande kinachofuata cha noti katika sehemu ya memo. Zallet huunda na kutuma miamala hiyo. Zebra na Zaino hutoa data ya mnyororo pekee.

Hati hizo zinapatikana katika [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Ziliandikwa kwa ajili ya Zallet ya mapema na si salama kuziendesha kama zilivyo dhidi ya toleo la sasa. Ukurasa huu ndio utaratibu uliosasishwa. Zimehakikiwa dhidi ya Zallet `v0.1.0-beta.3` na kitabu cha Zallet kufikia tarehe 7 Oktoba 2026.

## Unachohitaji

- Zebra imesawazishwa kikamilifu, huku RPC ikiwa imeunganishwa na localhost.
- Zaino ililinganishwa dhidi ya nodi hiyo Zebra.
- Zallet `v0.1.0-beta.3` au mpya zaidi, muundo wa pochi, huku RPC yake ikiwa imeunganishwa na localhost. Orodha ya vitabu huorodheshwa `z_sendmany` kama inavyotekelezwa. Ada ya nambari inakataliwa: ukifaulu `fee`, lazima iwe `null`, kwa sababu Zallet hutumia ada ya ZIP 317 kila wakati.
- Akaunti inayofadhiliwa ambayo Unified Address inaweza kutumia pesa zilizolindwa.
- Anwani Zilizounganishwa za Mpokeaji. Memo kwenye anwani inayoonekana wazi ni hitilafu.

Usiweke anwani au kidakuzi kilichofadhiliwa kwenye wiki au kwenye hati iliyoidhinishwa `txBuilderFromFile.sh` Ina Unified Address iliyosimbwa kwa msimbo mgumu. Ibadilishe ndani na usiiweke.

## Sanidi Zallet

Tengeneza usanidi kwa kutumia Zallet unayoendesha, kisha uelekeze kwenye Zebra na Zaino. Sampuli katika mafunzo ya zamani hutumia `as_of_version = "0.0.0"` na njia ya kibinafsi ya nyumbani. Ichukulie faili hiyo kama picha, si kiolezo.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` orodha ya lazima `z_sendmany`, `z_getoperationstatus` na `z_getoperationresult`. Bandika RPC kwenye `127.0.0.1` pekee.

## Orodha ya wapokeaji

Unified Address kwa kila mstari, hakuna nukuu, hakuna mistari tupu. Hati inasomeka `daoAddresses.md`. Msomaji wa zamani anasema `daoAddress.md`. Faili hiyo haipo kwenye repo, na majina hayalingani.

```text
u1...
u1...
```

## Tuma memo moja

`z_sendmany` ni isiyosawazisha. Inarudisha kitambulisho cha operesheni. Kura ya maoni `z_getoperationstatus` hadi hali iwe `success` au hitilafu. Muda wa kulala wa sekunde 5 uliowekwa, ambao ndio hati hufanya, hupoteza matokeo wakati ujenzi unachukua muda mrefu zaidi. `z_getoperationresult` hutumia operesheni, kwa hivyo usiite hadi hali iwe ya mwisho.

Ada imeachwa. Zallet inahesabu ZIP 317. Usipitishe nambari.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Sehemu ya memo ni heksaidi ghafi, upeo wa baiti 512. `ascii2hex` husimba ASCII pekee. Dokezo lenye herufi yoyote isiyo ya ASCII hushindwa. `xxd` or `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` Hushughulikia UTF-8.

Sera ya faragha chaguomsingi ni `FullPrivacy`. Hiyo ndiyo chaguo-msingi sahihi kwa mpokeaji aliyelindwa. Usipite `AllowFullyTransparent`.

## Kasoro za hati

Hizi ziko kwenye mti kufikia tarehe 8 Oktoba 2026. Usikimbie `shieldNewsletter.sh` hadi zitakaporekebishwa.

- `[[ bytesInFile -lt 512 ]]` haipo `$`. Tawi la memo moja halifanyi kazi kamwe.
- Kitanzi cha chunk huhifadhi hex, kisha `hex2ascii` huifafanua, kisha `txBuilderFromFile.sh` huisimba tena. Kipande cha mwisho hakijasafishwa isipokuwa mstari wa baadaye ufurike 512. Mstari mrefu haujagawanywa. Hutumwa mzima na unaweza kuzidi memo ya baiti 512.
- `txBuilderFromFile.sh` simu `./zallet rpc` bila njia ya usanidi, na inatarajia jozi katika saraka ya sasa `zallet -c <config> rpc`.
- `toCurl.sh` anazungumza na Zebra kwenye lango 8232 akiwa na biskuti, na anapiga simu `getinfo` na `sendmany`. Zallet haitoi `sendmany`. Kitanzi cha kusubiri mgodi pia hutumia `[[ chainHeight -gt temp ]]` bila `$`, kwa hivyo haisubiri.
- `z_gettotalbalance 0 true` inapitishwa kama hoja za ziada za msimamo. Angalia `rpc help z_gettotalbalance` kwenye mfumo wa binary unaoendesha kabla ya kutumia simu hiyo.
- Kila kipande hutuma `0.0001` ZEC kwa kila mpokeaji. Ada ya ZIP 317 iko juu. Noti ndefu kwa anwani nyingi hutumia zaidi ya kiasi cha vumbi.

## Baada ya marekebisho

Mkimbiaji aliyerekebishwa anapaswa:

1. Soma dokezo kama baiti na ugawanye kwenye mipaka ya baiti 512, si kwenye mistari.
2. Hex-encode kila kipande mara moja.
3. Piga simu `zallet -c <config> rpc z_sendmany` pamoja na UA inayofadhiliwa, safu ya mpokeaji, na hoja isiyo na ada.
4. Kura ya maoni `z_getoperationstatus` kwa kitambulisho hicho cha operesheni.
5. Rekodi txid tu baada ya `success`.

Ukurasa wa mafunzo ya zamani unabaki [Hati za Jarida Lililolindwa](/tutorials/shieldednewsletter/readme). Tumia ukurasa huu kwa utaratibu.
