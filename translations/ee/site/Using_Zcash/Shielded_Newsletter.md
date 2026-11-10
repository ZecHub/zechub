<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Aŋlɔ Axɔ"/>
</a>

# Ɣaɣla [Shielded] Nyadzɔdzɔgbalẽ [Newsletter]

> Ðo markdown didienu [note] ɖe ɣaɣla gaɖoƒe ƒe dzesiwo ƒe xexlẽme abe Zcash nya kpui [memos] ene, esi wozã Zallet. Amesiwo ƒe xexlẽme kple didienua menɔa nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe dzi o.

Ɣaɣla nyadzɔdzɔgbalẽ enye ɣaɣla gaɖoɖowo [transactions] ƒe dzidzime. Dɔwɔwɔ sia dzea ga sue aɖe ɖe xɔlila ƒe Unified Address dzi eye wòtsɔa didienua ƒe akpa si gbɔna ɖea nya kpui ƒe teƒe me. Zallet wɔa eye wòdɔa gaɖoɖowo siawo ɖa. Zebra kple Zaino dekae nana ɖoɖonu [chain] ƒe nyawo.

Scriptwo le [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Woŋlɔ wo na Zallet ƒe gɔmedzedze ƒe tɔtrɔ aɖe, eye menye dedie be woazã wo ale si wònɔ ene kple tɔtrɔ si le egbea o. Axa siae nye mɔ si woɖo yeyee. Wodo kpe ɖe Zallet `v0.1.0-beta.3` kple Zallet ƒe agbalẽ ŋu le 7 October 2026 dzi.

## Nu si wòhiã

- Zebra si de sync blibo, esi RPC bla ɖe localhost.
- Zaino si de sync kple Zebra ɣaɣla dzesi ŋɔŋlɔ [node] ma.
- Zallet `v0.1.0-beta.3` alo yeyetɔ, gakotoku [wallet] ƒe tutu, esi wòƒe RPC bla ɖe localhost. Agbalẽ la fia be woɖo `z_sendmany` wɔ. Woagbe adzɔ [fee] si nye xexlẽme: ne nàtsɔ `fee` ava la, ele be wòanye `null`, elabena Zallet zãa ZIP 317 adzɔ ɣesiaɣi.
- Akawunt si me ga le, si ƒe Unified Address ate ŋu atsɔ ɣaɣla ga awɔ nu.
- Xɔlila ƒe Unified Addresswo. Nya kpui si le nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi [address] dzi nye vodada.

Mègatsɔ gaɖoƒe si me ga le alo cookie aɖe ade wiki me alo script si wòde asi ɖo ŋu me o. `txBuilderFromFile.sh` si le fifia la ƒe Unified Address woŋlɔ ɖe eme ɖe eɖokui ŋu. Trɔe le wòƒe teƒe eye mègade asi ɖoe o.

## Ðo Zallet ɖe ɖoɖo nu

Wɔ config kple Zallet si nèle zãm, eye nàfia Zebra kple Zaino. Kpɔɖeŋu si le gɔmefiafia xoxo me zãa `as_of_version = "0.0.0"` kple aƒeme mɔ si nye ame ŋutɔ tɔ. Bu file ma be enye ɣeyiɣi ƒe nɔnɔ ƒe nɔnɔmetata, menye kpɔɖeŋu na nàdze ɖoɖo nu o.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` ele be wòaxlẽ `z_sendmany`, `z_getoperationstatus`, kple `z_getoperationresult`. Bla RPC ɖe `127.0.0.1` ko.

## Xɔlilawo ƒe xexlẽme

Unified Address ɖeka le fli sia fli dzi, nyagblɔɖiwo manɔe o, fli ƒuƒluwo manɔe o. Script la xlẽa `daoAddresses.md`. Readme xoxo la gblɔa `daoAddress.md`. File ma mele repo me o, eye ŋkɔawo sɔ o.

```text
u1...
u1...
```

## Dɔ nya kpui ɖeka ɖa

`z_sendmany` menye dɔ si wowɔ enumake o. Wòtrɔa operation id aɖe. Kpɔ `z_getoperationstatus` va se ɖe esi nɔnɔa anye `success` alo vodada ava. Dɔlalaƒe 5 ƒe ŋuŋɔ, si nye nu si script la wɔna, na wòbu emetsonu ne tutu la ɖea ŋgɔ na ɣeyiɣi didi. `z_getoperationresult` ɖua operation la, eyata mègayɔe hafi nɔnɔa naɖo eƒe nuwuwu o.

Wometsɔ adzɔ o. Zallet bu ZIP 317. Mègatsɔ xexlẽme aɖe o.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Nya kpui ƒe teƒea nye hex si me woŋlɔ nu kplikplikpli, byte 512 koe wòate ŋu akpɔ ɖe edzi. `ascii2hex` trɔa ASCII ko. Didienu si me non-ASCII ƒe nɔnɔaɖe le la agbe o. `xxd` alo `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` dea asi UTF-8 ŋu.

Ɣaɣla [Privacy] ƒe ɖoɖo ɖe edzi gɔmedze le `FullPrivacy`. Esia nye ɖoɖo nyuitɔ na ɣaɣla xɔlila. Mègatsɔ `AllowFullyTransparent` o.

## Scriptwo ƒe vodadawo

Esiawo le ati la me le 8 October 2026 dzi. Mègawɔ `shieldNewsletter.sh` hafi woaɖo wo ɖe eɖo o.

- `[[ bytesInFile -lt 512 ]]` mehiã `$` o. Akpa si dɔa nya kpui ɖeka la mewɔa dɔ o.
- Akpa si mama wɔa chunkwo la ɖea hex ɖo, eye `hex2ascii` trɔe ɖe megbe, eye `txBuilderFromFile.sh` trɔe ɖe hex me ake. Wometsɔ chunk mamlɛtɔ la ɖa ne fli si gbɔna meva wu 512 o. Womama fli didi aɖe ɖe akpawo me o. Wodɔe blibo eye wòate ŋu awu nya kpui ƒe byte 512.
- `txBuilderFromFile.sh` yɔa `./zallet rpc` menye kple config ƒe mɔ aɖe o, eye wòlala be binary la nanɔ directory si me wòle fifia me. Zã `zallet -c <config> rpc`.
- `toCurl.sh` doa gbe na Zebra le port 8232 kple cookie, eye wòyɔa `getinfo` kple `sendmany`. Zallet menana `sendmany` o. Mine-wait ƒe akpa la hã zãa `[[ chainHeight -gt temp ]]` manɔ kple `$` o, eyata melala o.
- Woɖea `z_gettotalbalance 0 true` abe positional arguments bubuwo ene. Kpɔ `rpc help z_gettotalbalance` le binary si nèle zãm la dzi hafi nàzã yɔyɔ ma.
- Chunk sia sia dɔa `0.0001` ZEC ɖe xɔlila sia sia ŋu. ZIP 317 adzɔ le eƒe dzi. Didienu didi si wòdɔ ɖe gaɖoƒe dzesi geɖe ŋu la ɖua ga geɖe wu dust ƒe homewo.

## Le ɖoɖo megbe

Dɔwɔla si woɖo ɖe eɖo la ele be wòawɔ esiawo:

1. Xlẽ didienua abe bytes ene eye nàmae ɖe byte 512 ƒe towo me, menye ɖe fliwo me o.
2. Trɔ chunk sia sia ɖe hex me zi ɖeka ko.
3. Yɔ `zallet -c <config> rpc z_sendmany` kple UA si me ga le, xɔlilawo ƒe array, eye mègatsɔ adzɔ ƒe argument o.
4. Kpɔ `z_getoperationstatus` na operation id ma.
5. Ŋlɔ txid la ɖe agbalẽ me ne `success` va yi megbe ko.

Gɔmefiafia ƒe axa xoxo la gale [Ɣaɣla Nyadzɔdzɔgbalẽ ƒe scriptwo](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Zã axa sia na mɔnu la.
