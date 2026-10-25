<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nyadzɔdzɔgbalẽ si Wotsɔ Akpoxɔnu Wɔe

> Ðo dzesidegbalẽvi ɖe adrɛs siwo wokpɔ ta na ƒe xexlẽdzesi abe Zcash nuŋlɔɖiwo ene, zã Zallet. Amesiwo xɔe ƒe ŋkɔwo kple nuŋlɔɖia nɔa adrɛs siwo me kɔ la dzi.

Nyadzɔdzɔgbalẽ si wotsɔ akpoxɔnu wɔe nye asitsatsa siwo wotsɔ akpoxɔnu wɔe siwo kplɔ wo nɔewo ɖo. Nusi dona ɖesiaɖe xea ga sue aɖe na Unified Address xɔe eye wòtsɔa nuŋlɔɖia ƒe akpa si kplɔe ɖo le nuŋlɔɖi ƒe akpaa dzi. Zallet tua asitsatsa mawo heɖoa wo ɖa. Kɔsɔkɔsɔ ŋuti nyatakakawo koe Zebra kple Zaino naa.

Nuŋɔŋlɔawo nɔa agbe le [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Woŋlɔ wo na Zallet gbãtɔ eye womele dedie be woaƒu du abe alesi wole ene atsi tre ɖe esi woɖe ɖe go fifia ŋu o. Axa siae nye ɖoɖo si wowɔ yeyee. Wolé ŋku ɖe Zallet ŋu `v0.1.0-beta.3` kple Zallet gbalẽa tso October 7, 2026 dzi.

## Nusiwo nèhiã

- Zebra wɔ ɖeka bliboe, kple RPC si wobla ɖe localhost ŋu.
- Zaino wɔ ɖeka kple Zebra node ma.
- Zallet `v0.1.0-beta.3` alo yeyetɔ, gakotoku tutu, kple eƒe RPC si wobla ɖe localhost ŋu. Agbalẽa ŋlɔ ŋkɔwo `z_sendmany` abe alesi wowɔe ene. Wogbea xexlẽdzesiwo ƒe fetu: ne èto eme `fee`, ele be wòanɔ nenema `null`, elabena Zallet zãa ZIP 317 ƒe fetu ɣesiaɣi.
- Akɔntabubu si ŋu wokpɔa ga ɖo si ƒe Unified Address ate ŋu azã ga si wokpɔ ta na.
- Adrɛs Siwo Wowɔ Ðekae Siwo Xɔe. Memo si le adrɛs si me kɔ dzi nye vodada.

Mègatsɔ adrɛs si ŋu wokpɔ ga ɖo alo kuki de wiki alo ŋɔŋlɔdzesi si wotsɔ ɖokuiwò na me o. Fifia ƒe ɣeyiɣia `txBuilderFromFile.sh` na Unified Address wotsɔ hardcoded wɔe. Tsɔe ɖɔ li le mia gbɔ eye mègatsɔe de asi na ame o.

## Trɔ asi le Zallet ŋu

Wɔ config kple Zallet si nèle dɔ wɔm, emegbe nàfia asi Zebra kple Zaino. Kpɔɖeŋu si le nufiame xoxoa me zãna `as_of_version = "0.0.0"` kple ame ŋutɔ ƒe aƒememɔ. Bu faɛl ma abe foto si woɖe le ɣeyiɣi kpui aɖe me ene, ke menye be wòanye nɔnɔmetata o.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` ele be wòaŋlɔ ŋkɔ `z_sendmany`, `z_getoperationstatus`, kple `z_getoperationresult`. Bla RPC ɖe eŋu `127.0.0.1` ko.

## Ame siwo axɔe ƒe ŋkɔwo

Unified Address ɖeka le fli ɖesiaɖe me, nyayɔyɔ aɖeke meli o, fli ƒuƒlu aɖeke meli o. Nuŋɔŋlɔa xlẽ `daoAddresses.md`. Readme xoxoa gblɔ be `daoAddress.md`. Fail ma mele repo la me o, eye ŋkɔawo hã mesɔ o.

```text
u1...
u1...
```

## Ðo nuŋlɔɖi ɖeka ɖa

`z_sendmany` nye asynchronous ƒe nuwɔna. Etrɔa dɔwɔwɔ ƒe id. Numekuku `z_getoperationstatus` vaseɖe esime nɔnɔmea naɖo `success` alo vodada aɖe. Alɔ̃dɔdɔ sɛkɛnd 5 si woɖo ɖi, si nye nusi ŋɔŋlɔdzesi la wɔna, bu emetsonua ne xɔtutua xɔ ɣeyiɣi didi wu. `z_getoperationresult` ɖua dɔwɔwɔa, eyata mègayɔe o vaseɖe esime nɔnɔmea naɖo nuwuwu.

Woɖe fe si woxena la ɖa. Zallet bua ZIP 317. Mègatsɔ xexlẽdzesi aɖeke to eme o.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Memo ƒe agblea nye raw hex, 512 bytes ƒe agbɔsɔsɔme. `ascii2hex` wɔa dɔ kple ASCII ɖeɖeko. Nuŋlɔɖi si me ŋɔŋlɔdzesi ɖesiaɖe si menye ASCII o le la do kpo nu. `xxd` alo `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` kpɔa UTF-8 gbɔ.

Ameŋunyatakakawo ŋuti ɖoɖoa defaults to `FullPrivacy`. Emae nye default nyuitɔ na amesi xɔ akpoxɔnu. Mègato eme o `AllowFullyTransparent`.

## Nuŋɔŋlɔ ƒe gbɔdzɔgbɔdzɔwo

Esiawo le ati la me tso October 8, 2026. Mègaƒu du o `shieldNewsletter.sh` vaseɖe esime woaɖɔ wo ɖo.

- `[[ bytesInFile -lt 512 ]]` bu `$`. Alɔdzedɔwɔƒe si me woŋlɔa nu ɖeka le la meƒua du gbeɖe o.
- Chunk loop la dzraa hex ɖo, ekema `hex2ascii` eɖea egɔme, ekema `txBuilderFromFile.sh` egadea kɔpi me ake. Womekɔa akpa mamlɛtɔ o negbe ɖe fli aɖe si va emegbe la yɔ fũ 512. Womema fli didi aɖe o. Woɖonɛ ɖa bliboe eye ate ŋu agbɔ 512-byte memo la ŋu.
- `txBuilderFromFile.sh` yɔyɔwo `./zallet rpc` kple config mɔ aɖeke o, eye wòle mɔ kpɔm na binary le fifi directory me. Zã `zallet -c <config> rpc`.
- `toCurl.sh` ƒoa nu kple Zebra le melidzeƒe 8232 kple kuki, eye wòƒoa ka `getinfo` kple `sendmany`. Zallet mewɔa esia o `sendmany`. Mine-wait loop hã zãa `[[ chainHeight -gt temp ]]` manᴐmee `$`, eyata melalana o.
- `z_gettotalbalance 0 true` wotsɔa wo toa eme abe ɖoƒe ŋuti nyaʋiʋli bubuwo ene. Le ŋku ɖe eŋu `rpc help z_gettotalbalance` le binary si nèƒua du hafi zãa yɔyɔ ma dzi.
- Chunk ɖesiaɖe ɖoa ɖa `0.0001` ZEC na amesiame si xɔe. ZIP 317 ƒe fetu la le etame. Nuŋlɔɖi didi aɖe si woŋlɔ ɖe adrɛs geɖe dzi la zãa ga geɖe wu ke ƒe agbɔsɔsɔme.

## Le ɖɔɖɔɖo aɖe megbe

Ele be duƒula si woɖɔ ɖo la na:

1. Xlẽ nuŋlɔɖia abe byte ene eye nàmae ɖe byte 512 ƒe liƒowo dzi, ke menye le fliwo dzi o.
2. Hex-encode ɖe akpa ɖesiaɖe zi ɖeka.
3. Yᴐ `zallet -c <config> rpc z_sendmany` kple UA si wodo ga na, amesiwo xɔa ga ƒe hatsotso, kple fetu ŋuti nyaʋiʋli aɖeke manɔmee.
4. Numekuku `z_getoperationstatus` na dɔwɔwɔ ƒe id ma.
5. Ŋlɔ txid la ɖi le ema megbe ko `success`.

Nufiame ƒe axa xoxoa gakpɔtɔ le [Nyadzɔdzɔgbalẽ ƒe nuŋɔŋlɔ siwo Wokpɔ ta na](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Zã axa sia hena dɔa wɔwɔ.
