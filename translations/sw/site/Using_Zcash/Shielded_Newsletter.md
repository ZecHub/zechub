<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Jarida la habari la faragha [Shielded Newsletter]

> Tuma dokezo la Markdown kwa orodha ya anwani za faragha kama jumbe [memos] za Zcash, ukitumia Zallet. Orodha ya wapokeaji na dokezo hubaki nje ya anwani za uwazi [transparent addresses].

Jarida la habari la faragha ni mfululizo wa miamala ya faragha [shielded transactions]. Kila towe hulipa kiasi kidogo kwa Anwani Iliyounganishwa ya mpokeaji na hubeba sehemu inayofuata ya dokezo [note] katika sehemu ya ujumbe. Zallet huunda na kutuma miamala hiyo. Zebra na Zaino hutoa data ya mnyororo [chain] pekee.

Maandishi yako katika [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Yaliandikwa kwa ajili ya Zallet ya awali na si salama kuyaendesha kama yalivyo dhidi ya toleo la sasa. Ukurasa huu una utaratibu uliosasishwa. Yamehakikiwa dhidi ya Zallet `v0.1.0-beta.3` na kitabu cha Zallet kufikia 7 Oktoba 2026.

## Unachohitaji

- Zebra iliyosawazishwa kikamilifu, huku RPC ikiwa imefungwa kwa localhost.
- Zaino iliyosawazishwa dhidi ya node hiyo ya Zebra.
- Zallet `v0.1.0-beta.3` au toleo jipya zaidi, muundo wa pochi [wallet], huku RPC yake ikiwa imefungwa kwa localhost. Kitabu kinaorodhesha `z_sendmany` kuwa imetekelezwa. Ada [fee] ya namba inakataliwa: ukipitisha `fee`, lazima iwe `null`, kwa sababu Zallet hutumia daima ada ya ZIP 317.
- Akaunti yenye fedha ambayo Anwani Iliyounganishwa yake inaweza kutumia fedha za faragha.
- Anwani Iliyounganishwa za wapokeaji. Ujumbe kwenye anwani ya uwazi ni hitilafu.

Usiweke anwani yenye fedha au cookie katika wiki au katika hati iliyowekwa kwenye commit. `txBuilderFromFile.sh` ya sasa ina Anwani Iliyounganishwa iliyowekwa moja kwa moja. Ibadilishe ndani ya mazingira yako na usiiweke kwenye commit.

## Sanidi Zallet

Tengeneza usanidi kwa Zallet unayoendesha, kisha ielekeze kwa Zebra na Zaino. Sampuli katika mafunzo ya zamani hutumia `as_of_version = "0.0.0"` na njia binafsi ya nyumbani. Ichukulie faili hiyo kama nakala ya wakati fulani, si kama kiolezo.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` lazima iorodheshe `z_sendmany`, `z_getoperationstatus`, na `z_getoperationresult`. Funga RPC kwa `127.0.0.1` pekee.

## Orodha ya wapokeaji

Anwani Iliyounganishwa moja kwa kila mstari, bila alama za kunukuu, bila mistari mitupu. Hati husoma `daoAddresses.md`. Readme ya zamani inasema `daoAddress.md`. Faili hiyo haimo katika repo, na majina hayalingani.

```text
u1...
u1...
```

## Tuma ujumbe mmoja

`z_sendmany` hufanya kazi kwa njia isiyosubiri. Hurejesha kitambulisho cha operesheni. Chunguza `z_getoperationstatus` hadi hali iwe `success` au hitilafu. Kusubiri kwa sekunde 5 kwa muda maalumu, ambako ndicho hati hufanya, hupoteza matokeo wakati muundo unachukua muda mrefu zaidi. `z_getoperationresult` hutumia operesheni hiyo, kwa hivyo usiite hadi hali iwe ya mwisho.

Ada haijawekwa. Zallet hukokotoa ZIP 317. Usipitishie namba.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Sehemu ya ujumbe ni hex ghafi, upeo wa baiti 512. `ascii2hex` husimba ASCII pekee. Dokezo lenye herufi yoyote isiyo ya ASCII hushindwa. `xxd` au `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` hushughulikia UTF-8.

Sera ya faragha [Privacy policy] hutumia chaguo-msingi la `FullPrivacy`. Hilo ndilo chaguo sahihi la msingi kwa mpokeaji wa faragha. Usipitishie `AllowFullyTransparent`.

## Kasoro za hati

Hizi ziko kwenye mti kufikia 8 Oktoba 2026. Usiendeshe `shieldNewsletter.sh` hadi zitakaporekebishwa.

- `[[ bytesInFile -lt 512 ]]` haina `$`. Tawi la ujumbe mmoja halitekelezwi kamwe.
- Kitanzi cha vipande huhifadhi hex, kisha `hex2ascii` huisimbua, halafu `txBuilderFromFile.sh` huisimba tena. Kipande cha mwisho hakitumwi isipokuwa mstari wa baadaye uzidi baiti 512. Mstari mrefu haukatwi. Hutumwa wote na unaweza kuzidi ujumbe wa baiti 512.
- `txBuilderFromFile.sh` huita `./zallet rpc` bila njia ya usanidi, na hutegemea binary iwe katika saraka ya sasa. Tumia `zallet -c <config> rpc`.
- `toCurl.sh` huwasiliana na Zebra kwenye bandari 8232 kwa cookie, na huita `getinfo` na `sendmany`. Zallet haitoi `sendmany`. Kitanzi cha kusubiri uchimbaji pia hutumia `[[ chainHeight -gt temp ]]` bila `$`, kwa hivyo hakisubiri.
- `z_gettotalbalance 0 true` hupitishwa kama hoja za ziada za nafasi. Angalia `rpc help z_gettotalbalance` kwenye binary unayoendesha kabla ya kutumia mwito huo.
- Kila kipande hutuma `0.0001` ZEC kwa kila mpokeaji. Ada ya ZIP 317 huongezwa juu yake. Dokezo refu kwa anwani nyingi hutumia zaidi ya kiasi cha dust.

## Baada ya kurekebisha

Kiendeshaji kilichorekebishwa kinapaswa:

1. Kusoma dokezo kama baiti na kuligawa kwenye mipaka ya baiti 512, si kwenye mistari.
2. Kusimba kila kipande kwa hex mara moja.
3. Kuita `zallet -c <config> rpc z_sendmany` kwa UA yenye fedha, mkusanyiko wa wapokeaji, na bila hoja ya ada.
4. Kuchunguza `z_getoperationstatus` kwa kitambulisho hicho cha operesheni.
5. Kurekodi txid baada ya `success` pekee.

Ukurasa wa mafunzo ya zamani unasalia katika [Maandishi ya Jarida la habari la faragha](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Tumia ukurasa huu kwa utaratibu.
