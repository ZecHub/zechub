<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Akwụkwọ Ozi Ekpuchiri

> Zipu akwụkwọ ndetu akara na ndepụta adreesị echekwara dị ka ndetu Zcash, site na iji Zallet. Ndepụta onye nnata na akwụkwọ ndetu ahụ anaghị anọchi anya adreesị doro anya.

Akwụkwọ ozi nchekwa bụ usoro azụmahịa echekwara. Mbupụ ọ bụla na-akwụ obere ego nye onye nnata Unified Address ma na-ebu akụkụ ọzọ nke akwụkwọ ozi ahụ n'ọhịa memo. Zallet na-ewulite ma na-eziga azụmahịa ndị ahụ. Zebra na Zaino na-enye naanị data yinye.

Akwụkwọ edemede ndị ahụ dị ndụ na [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). E dere ha maka Zallet mbụ ma ha adịghị mma ịgba ọsọ dịka ọ dị megide mwepụta dị ugbu a. Peeji a bụ usoro emelitere. A lere ya anya na Zallet `v0.1.0-beta.3` na akwụkwọ Zallet dịka nke 7 Ọktoba 2026.

## Ihe ị chọrọ

- Zebra emekọrịtara nke ọma, e jikwa RPC jikọọ na localhost.
- Zaino jikọtara ọnụ megide ebe Zebra ahụ.
- Zallet `v0.1.0-beta.3` ma ọ bụ nke ọhụrụ, ihe e ji arụ obere akpa ego, nke nwere njikọ RPC ya na localhost. Ndepụta akwụkwọ ahụ `z_sendmany` dịka e tinyere ya n'ọrụ. A na-ajụ ụgwọ ọnụọgụgụ: ọ bụrụ na ị gafere `fee`, ọ ghaghị ịbụ `null`, n'ihi na Zallet na-eji ụgwọ ZIP 317 mgbe niile.
- Akaụntụ egosiri nke Unified Address nwere ike imefu ego echekwara.
- Adreesị Ndị Nnata Jikọtara. Ihe e dere na adreesị doro anya bụ njehie.

Etinyela adreesị ego ma ọ bụ kuki n'ime wiki ma ọ bụ n'ime edemede e tinyere n'ọrụ `txBuilderFromFile.sh` nwere Unified Address e tinyere koodu ya. Dochie ya n'ógbè gị ma emekwala ya.

## Hazie Zallet

Mepụta nhazi site na iji Zallet ị na-agba, wee tụọ ya na Zebra na Zaino. Ihe atụ dị na nkuzi ochie ahụ na-eji `as_of_version = "0.0.0"` na ụzọ obibi nkeonwe. Were faịlụ ahụ dị ka foto nta, ọ bụghị ihe nlereanya.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` ga-edepụtarịrị `z_sendmany`, `z_getoperationstatus`, na `z_getoperationresult`. Jikọọ RPC na `127.0.0.1` naanị.

## Ndepụta ndị nnata

Otu Unified Address Ọnụ n'otu ahịrị, enweghị nhota okwu, enweghị ahịrị efu. Ederede ahụ na-agụ `daoAddresses.md`. Akwụkwọ ochie ahụ kwuru `daoAddress.md`. Faịlụ ahụ adịghị na repo ahụ, aha ya adabaghịkwa.

```text
u1...
u1...
```

## Zipu otu ozi ederede

`z_sendmany` ọ bụ ihe na-adịghị agbanwe agbanwe. Ọ na-eweghachi njirimara ọrụ. Ntụle `z_getoperationstatus` ruo mgbe ọnọdụ ahụ dị `success` ma ọ bụ njehie. Ụra nke sekọnd ise edobere, nke bụ ihe edemede ahụ na-eme, na-efunahụ nsonaazụ ya mgbe nrụpụta ahụ were ogologo oge. `z_getoperationresult` na-eri ọrụ ahụ, yabụ akpọla ya ruo mgbe ọnọdụ ahụ ga-abụ njedebe.

A naghị akwụ ụgwọ. Zallet na-agbakọ ZIP 317. Agafela nọmba.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Ebe ndetu ahụ bụ hex nkịtị, oke kachasị bụ 512 bytes. `ascii2hex` na-agbanwe naanị ASCII. Ndetu nwere mkpụrụedemede na-abụghị ASCII agaghị arụ ọrụ nke ọma. `xxd` or `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` na-eji UTF-8 arụ ọrụ.

Iwu nzuzo na-adabere na `FullPrivacy`. Nke ahụ bụ ndabara ziri ezi maka onye nnata echekwara. Agafeela `AllowFullyTransparent`.

## Mmejọ ederede

Ndị a dị n'osisi ahụ dịka ọ dị na 8 Ọktoba 2026. Agbakwala ọsọ `shieldNewsletter.sh` ruo mgbe ha ga-edozi.

- `[[ bytesInFile -lt 512 ]]` na-efu efu `$`. Alaka otu ihe ncheta anaghị agba ọsọ.
- Mkpọchi chunk na-echekwa hex, mgbe ahụ `hex2ascii` depụta ya, mgbe ahụ `txBuilderFromFile.sh` na-agbanwe ya ọzọ. A naghị ehichapụ akụkụ ikpeazụ ma ọ bụrụ na ahịrị nke ọzọ agafee 512. A naghị ekewa ahịrị ogologo. A na-eziga ya dum ma nwee ike ịgafe ihe ndetu 512-byte.
- `txBuilderFromFile.sh` oku `./zallet rpc` na-enweghị ụzọ nhazi, ma na-atụ anya ọnụọgụ abụọ dị na ndekọ dị ugbu a. Jiri `zallet -c <config> rpc`.
- `toCurl.sh` na Zebra na-agwa okwu na ọdụ ụgbọ mmiri 8232 site na iji kuki, wee kpọọ oku `getinfo` na `sendmany`. Zallet anaghị enye `sendmany`. Mkpọchi nchere nke igwe na-ejikwa `[[ chainHeight -gt temp ]]` na-enweghị `$`, yabụ ọ naghị echere.
- `z_gettotalbalance 0 true` a na-agafe dị ka arụmụka ọnọdụ mgbakwunye. Lelee `rpc help z_gettotalbalance` na binary ị na-agba ọsọ tupu i jiri oku ahụ.
- Iberibe ọ bụla na-eziga `0.0001` ZEC nye onye ọ bụla natara ya. Ụgwọ ZIP 317 dị n'elu. Ihe dị ogologo maka ọtụtụ adreesị na-efu ihe karịrị uzuzu ahụ.

## Mgbe emechara ndozi

Onye na-agba ọsọ agbaziri kwesịrị:

1. Gụọ ihe ndetu ahụ dị ka byte wee kewaa ya na ókè 512-byte, ọ bụghị na ahịrị.
2. Hex-encode nkebi ọ bụla otu ugboro.
3. Kpọọ oku `zallet -c <config> rpc z_sendmany` na UA enyere ego, usoro onye nnata, na arụmụka enweghị ụgwọ.
4. Ntuli aka `z_getoperationstatus` maka ọrụ ahụ id.
5. Dekọọ txid ahụ naanị mgbe emechara `success`.

Ibe nkuzi ochie ahụ ka dị na [Ederede Akwụkwọ Ozi Ekpuchiri Echekwara](/tutorials/shieldednewsletter/readme). Jiri ibe a mee ihe maka usoro a.
