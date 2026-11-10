<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Akwụkwọ Akụkọ nke e chebere echebe [Shielded Newsletter]

> Jiri Zallet ziga note markdown ndepụta Adreesị akpa ego nke e chebere echebe [shielded addresses] dị ka memo Zcash. Ndepụta ndị nnata na note ahụ anaghị anọ na Adreesị akpa ego Oha [transparent addresses].

Akwụkwọ Akụkọ nke e chebere echebe bụ usoro Azụmahia nke e chebere echebe [shielded transactions]. Mpụta ọ bụla na-akwụ obere ego nye Adreesị Ejikọrọ ọnụ nke onye nnata ma buru akụkụ ọzọ nke note ahụ n’oghere memo. Zallet na-ewu ma na-eziga Azụmahia ndị ahụ. Zebra na Zaino na-enye naanị data chain.

Script ndị ahụ dị na [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Edere ha maka Zallet mbụ, ọ dịghịkwa mma ịgba ha otu ha dị megide mwepụta ugbu a. Ibe a bụ usoro emelitere. Enyochara ya megide akwụkwọ Zallet `v0.1.0-beta.3` na Zallet dịka ọ dị na 7 Ọktoba 2026.

## Ihe ị chọrọ

- Zebra emekọrịtala kpamkpam, RPC ejikọkwara na localhost.
- Zaino emekọrịtara megide node Zebra ahụ.
- Zallet `v0.1.0-beta.3` ma ọ bụ nke ka ọhụrụ, wallet build, RPC ya ejikọkwara na localhost. Akwụkwọ ahụ depụtara `z_sendmany` dịka nke etinyerela n’ọrụ. A na-ajụ ugwo [fee] ọnụọgụ: ọ bụrụ na ị gafee `fee`, ọ ga-abụrịrị `null`, n’ihi na Zallet na-eji ugwo ZIP 317 mgbe niile.
- Akaụntụ nwere ego nke Adreesị Ejikọrọ ọnụ ya nwere ike imefu ego nke e chebere echebe.
- Adreesị Ejikọrọ ọnụ nke ndị nnata. memo dị na Adreesị akpa ego Oha bụ njehie.

Etinyela Adreesị akpa ego nwere ego ma ọ bụ cookie na wiki ma ọ bụ na script a tinyere na commit. `txBuilderFromFile.sh` ugbu a nwere Adreesị Ejikọrọ ọnụ etinyere n’ime ya kpọmkwem. Dochie ya n’ime mpaghara gị, etinyekwala ya na commit.

## Hazie Zallet

Mepụta config site na Zallet ị na-agba, emesịa tụọ ya aka na Zebra na Zaino. Ihe atụ dị na tutorial ochie na-eji `as_of_version = "0.0.0"` na ụzọ home nke onwe. Were faịlụ ahụ dị ka snapshot, ọ bụghị template.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` ga-edepụtarịrị `z_sendmany`, `z_getoperationstatus`, na `z_getoperationresult`. Jikọọ RPC naanị na `127.0.0.1`.

## Ndepụta ndị nnata

Otu Adreesị Ejikọrọ ọnụ n’ahịrị ọ bụla, enweghị quote, enweghị ahịrị tọgbọ chakoo. Script ahụ na-agụ `daoAddresses.md`. readme ochie kwuru `daoAddress.md`. Faịlụ ahụ adịghị na repo, aha ndị ahụ adịghịkwa dakọrịta.

```text
u1...
u1...
```

## Ziga otu memo

`z_sendmany` anaghị arụ ọrụ ozugbo. Ọ na-eweghachi id arụmọrụ. Na-enyocha `z_getoperationstatus` ruo mgbe ọkwa ahụ ga-abụ `success` ma ọ bụ njehie. Ihi ụra sekọnd 5 nke a kara aka, nke bụ ihe script ahụ na-eme, na-atụfu nsonaazụ mgbe iwu ahụ na-ewe ogologo oge. `z_getoperationresult` na-eri arụmọrụ ahụ, ya mere akpọla ya ruo mgbe ọkwa ahụ ga-adị n’ikpeazụ.

Ewepụla ugwo. Zallet na-agbakọ ZIP 317. Agafela ọnụọgụ.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Ogige memo bụ hex raw, byte 512 kachasị. `ascii2hex` na-edepụta naanị ASCII. note nwere mkpụrụedemede ọ bụla na-abụghị ASCII ga-ada. `xxd` ma ọ bụ `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` na-ejikwa UTF-8.

Ndabara iwu Nzuzo [Privacy policy] bụ `FullPrivacy`. Nke ahụ bụ ndabara kwesịrị ekwesị maka onye nnata nke e chebere echebe. Agafela `AllowFullyTransparent`.

## Nrụrụ script

Ndị a dị na tree dịka ọ dị na 8 Ọktoba 2026. Agbala `shieldNewsletter.sh` ruo mgbe edozi ha.

- `[[ bytesInFile -lt 512 ]]` enweghị `$`. Alaka memo otu anaghị agba ọsọ.
- Loop chunk ahụ na-echekwa hex, mgbe ahụ `hex2ascii` na-edepụta ya, emesịa `txBuilderFromFile.sh` edepụta ya ọzọ. A naghị ezipụ chunk ikpeazụ ma ọ bụrụ na ahịrị ọzọ esote ejupụtachaghị byte 512. A naghị ekewa ahịrị ogologo. A na-eziga ya dum, ọ nwere ike ịgafe memo byte 512.
- `txBuilderFromFile.sh` na-akpọ `./zallet rpc` na-enweghị ụzọ config, ma na-atụ anya binary ahụ n’akwụkwọ ndekọ ugbu a. Jiri `zallet -c <config> rpc`.
- `toCurl.sh` na-ekwu okwu na Zebra n’ọdụ ụgbọ mmiri 8232 jiri cookie, ma kpọọ `getinfo` na `sendmany`. Zallet anaghị enye `sendmany`. Loop ichere ịgwụputa [mining] na-ejikwa `[[ chainHeight -gt temp ]]` na-enweghị `$`, ya mere ọ naghị echere.
- A na-agafe `z_gettotalbalance 0 true` dịka arụmụka positional ndị ọzọ. Lelee `rpc help z_gettotalbalance` na binary ị na-agba tupu iji oku ahụ.
- Chunk ọ bụla na-eziga `0.0001` ZEC nye onye nnata ọ bụla. Ugwo ZIP 317 dị n’elu ya. note ogologo nye ọtụtụ Adreesị akpa ego na-emefu karịa ego dust.

## Mgbe emezichara

Onye na-agba script edoziworo kwesịrị:

1. Gụọ note ahụ dị ka bytes ma kewaa ya n’ókè byte 512, ọ bụghị n’ahịrị.
2. Depụta hex nke chunk ọ bụla otu ugboro.
3. Kpọọ `zallet -c <config> rpc z_sendmany` site na UA nwere ego, array ndị nnata, na-enweghị arụmụka ugwo.
4. Nyochaa `z_getoperationstatus` maka id arụmọrụ ahụ.
5. Dekọọ txid naanị mgbe `success` gasịrị.

Ibe tutorial ochie ahụ ka dị na [Script Akwụkwọ Akụkọ nke e chebere echebe](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Jiri ibe a maka usoro ahụ.
