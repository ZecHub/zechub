<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìwé Ìròyìn Ààbò

> Fi àkọsílẹ̀ ìsanwó ránṣẹ́ sí àkójọ àwọn àdírẹ́sì tí a dáàbò bò gẹ́gẹ́ bí àkọsílẹ̀ Zcash, nípa lílo Zallet. Àkójọ àwọn olùgbà àti àkọsílẹ̀ náà kò ní àwọn àdírẹ́sì tí ó hàn gbangba.

Ìwé ìròyìn ààbò jẹ́ àwọn ìṣòwò ààbò. Ìjáde kọ̀ọ̀kan san owó díẹ̀ sí olùgbà kan tí a pè Unified Address, ó sì ní apá kejì nínú àkọsílẹ̀ náà nínú pápá àkọsílẹ̀. Zallet ń kọ́ àwọn ìṣòwò wọ̀nyẹn, ó sì ń fi wọ́n ránṣẹ́. Zebra àti Zaino nìkan ló ń pèsè ìwífún nípa pọ́ọ̀ntì.

Àwọn ìwé àkọsílẹ̀ náà ń gbé nínú [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Wọ́n kọ wọ́n fún Zallet àkọ́kọ́, wọn kò sì lè ṣiṣẹ́ bí ó ti rí ní ìtújáde lọ́wọ́lọ́wọ́. Ojú ìwé yìí ni ìlànà tí a ti ṣe àtúnṣe sí. A ṣàyẹ̀wò rẹ̀ sí Zallet `v0.1.0-beta.3` àti ìwé Zallet gẹ́gẹ́ bí ọjọ́ keje oṣù kẹwàá ọdún 2026.

## Ohun tí o nílò

- A ti mu Zebra ṣiṣẹpọ patapata, pẹlu RPC ti a so mọ localhost.
- Zaino ṣe àgbékalẹ̀ pẹ̀lú ojú ìbora Zebra yẹn.
- Zallet `v0.1.0-beta.3` tàbí tuntun, àpò owó, pẹ̀lú RPC rẹ̀ tí ó so mọ́ localhost. Àwọn ìwé náà ni a ṣe àkójọ wọn `z_sendmany` gẹ́gẹ́ bí a ṣe ṣe é. A kò gba owó nọ́mbà: tí o bá kọjá `fee`, ó gbọ́dọ̀ jẹ́ `null`, nítorí pé Zallet máa ń lo owó ZIP 317 nígbà gbogbo.
- Àkọọ́lẹ̀ tí a fi owó pamọ́ sí tí Unified Address rẹ̀ lè ná owó tí a fi ààbò pamọ́ sí.
- Àdírẹ́sì Ìṣọ̀kan Olùgbà. Àkọsílẹ̀ lórí àdírẹ́sì tí ó hàn gbangba jẹ́ àṣìṣe.

Má ṣe fi àdírẹ́sì tàbí kúkì tí a fi owó ṣe sínú wiki tàbí sínú ìwé àkọsílẹ̀ tí a ti ṣe àdéhùn rẹ̀ `txBuilderFromFile.sh` ní Unified Address tí a fi àmì sí. Rọpò rẹ̀ ní agbègbè rẹ kí o má sì ṣe fi àṣẹ sí i.

## Ṣe atunto Zallet

Ṣẹ̀dá ìṣètò pẹ̀lú Zallet tí o ń ṣiṣẹ́, lẹ́yìn náà tọ́ka sí Zebra àti Zaino. Àpẹẹrẹ inú ìkọ́ni àtijọ́ náà lo `as_of_version = "0.0.0"` àti ọ̀nà ilé ẹni. Wo fáìlì yẹn gẹ́gẹ́ bí àwòrán kékeré, kìí ṣe àpẹẹrẹ.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` gbọdọ ṣe atokọ `z_sendmany`, `z_getoperationstatus`, àti `z_getoperationresult`. So RPC pọ̀ mọ́ `127.0.0.1` nìkan.

## Àkójọ àwọn olùgbà

Unified Address kan ṣoṣo fún ìlà kan, kò sí gbólóhùn ọ̀rọ̀, kò sí àwọn ìlà òfo. Ìwé ìkọ̀wé náà kà `daoAddresses.md`. Ìwé àtijọ́ náà sọ pé `daoAddress.md`. Fáìlì yẹn kò sí nínú ibi ìpamọ́, àwọn orúkọ náà kò sì báramu.

```text
u1...
u1...
```

## Fi akọsilẹ kan ranṣẹ

`z_sendmany` jẹ́ àìsíṣọ̀kan. Ó dá ìdánimọ̀ iṣẹ́ padà. Ìdìbò `z_getoperationstatus` titi ipo naa yoo fi de `success` tàbí àṣìṣe kan. Orun ìṣẹ́jú-àáyá márùn-ún tí a ti ṣètò, èyí tí ìwé àkọsílẹ̀ náà ń ṣe, yóò pàdánù àbájáde náà nígbà tí ìkọ́lé náà bá gba àkókò púpọ̀ sí i. `z_getoperationresult` Ó ń lo iṣẹ́ náà, nítorí náà má ṣe pè é títí tí ipò náà yóò fi di òpin.

A ti yọ owo kuro. Zallet n ṣe iṣiro ZIP 317. Maṣe kọja nọmba kan.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Ààyè àkọsílẹ̀ náà jẹ́ hex tí a kò lè rí, ó pọ̀jù 512 baiti. `ascii2hex` Àkójọpọ̀ ASCII nìkan ni ó ń ṣàkójọ. Àkọsílẹ̀ tí ó ní èyíkéyìí ohun kikọ tí kìí ṣe ASCII kò ní ṣiṣẹ́. `xxd` or `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` mu UTF-8.

Ètò ìpamọ́ jẹ́ àìṣedéédé sí `FullPrivacy`. Iyẹn ni aiyipada ti o tọ fun olugba ti a daabobo. Maṣe kọja `AllowFullyTransparent`.

## Àbùkù ìkọ̀wé

Àwọn wọ̀nyí wà ní orí igi ní ọjọ́ kẹjọ oṣù kẹwàá ọdún 2026. Má ṣe sáré `shieldNewsletter.sh` títí tí wọ́n fi máa ṣe àtúnṣe.

- `[[ bytesInFile -lt 512 ]]` ó sọnù `$`. Ẹ̀ka àkọsílẹ̀ kan ṣoṣo kò ṣiṣẹ́ rárá.
- Awọn chunk lupu n tọju hex, lẹhinna `hex2ascii` ó túmọ̀ rẹ̀, lẹ́yìn náà `txBuilderFromFile.sh` Ó tún fi àmì sí i. A kò fi àmì sí apá tó kẹ́yìn àyàfi tí ìlà tó tẹ̀lé bá kún 512. A kò pín ìlà gígùn. A fi ránṣẹ́ ní gbogbo rẹ̀, ó sì lè kọjá àkọsílẹ̀ 512-byte.
- `txBuilderFromFile.sh` awọn ipe `./zallet rpc` láìsí ipa ọ̀nà ìṣètò, ó sì ń retí pé kí a lo binary nínú àkójọ ìṣètò lọ́wọ́lọ́wọ́ `zallet -c <config> rpc`.
- `toCurl.sh` bá Zebra sọ̀rọ̀ lórí ibudo 8232 pẹ̀lú kúkì kan, ó sì pè wọ́n `getinfo` àti `sendmany`. Zallet kò pese `sendmany`. Ìdúró ìwakùsà náà tún ń lo `[[ chainHeight -gt temp ]]` láìsí `$`, nítorí náà kò dúró.
- `z_gettotalbalance 0 true` a gba gẹ́gẹ́ bí àwọn àríyànjiyàn ipò afikún. Ṣàyẹ̀wò `rpc help z_gettotalbalance` lórí binary tí o ń ṣiṣẹ́ kí o tó lo ìpè náà.
- Ẹyọ kọ̀ọ̀kan ni a fi ránṣẹ́ `0.0001` ZEC fún gbogbo olùgbà. Owó ZIP 317 ló wà ní òkè. Àkọsílẹ̀ gígùn sí ọ̀pọ̀ àdírẹ́sì ná ju iye eruku lọ.

## Lẹ́yìn àtúnṣe kan

Olùsáré tí a ti ṣe àtúnṣe gbọ́dọ̀:

1. Ka àkọsílẹ̀ náà gẹ́gẹ́ bí baiti kí o sì pín sí orí ààlà baiti 512, kìí ṣe lórí àwọn ìlà.
2. Hex-encode gbogbo apakan lẹẹkan.
3. Pe `zallet -c <config> rpc z_sendmany` pẹ̀lú UA tí a fi owó fún, àkójọ àwọn olùgbà, àti àríyànjiyàn láìsí owó.
4. Ìdìbò dìbò `z_getoperationstatus` fún ìdámọ̀ iṣẹ́ náà.
5. Ṣe igbasilẹ txid nikan lẹhin `success`.

Ojú ìwé ẹ̀kọ́ àtijọ́ náà ṣì wà ní [Àwọn ìwé ìròyìn tí a dáàbò bo](/tutorials/shieldednewsletter/readme). Lo oju-iwe yii fun ilana naa.
