<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nsɛm ho amanneɛbɔ krataa a wɔabɔ ho ban

> Fa markdown note kɔ address ahorow a wɔabɔ ho ban no din sɛ Zcash memos, fa Zallet. Wɔn a wogye no din ne krataa a wɔakyerɛw no tra address ahorow a ɛda adi pefee so.

Nsɛm ho amanneɛbɔ krataa a wɔabɔ ho ban yɛ nnwuma a wɔabɔ ho ban toatoa so. Output biara tua sika ketewaa bi ma nea ogye no Unified Address na ɛde nkyerɛwde no fã a edi hɔ no kɔ memo field no mu. Zallet na ɔkyekye na ɔde saa nnwuma no mena. Zebra ne Zaino de nkɔnsɔnkɔnsɔn data nkutoo ma.

Nkyerɛwee ahorow no te ase wɔ [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Wɔkyerɛw maa Zallet a edi kan na ɛnyɛ ahobammɔ sɛ wobetu mmirika sɛnea ɛte atia mprempren a wɔayi no adi no. Saa krataafa yi ne ɔkwan a wɔayɛ no foforo. Wɔhwɛɛ mu sɛ ɛnyɛ Zallet `v0.1.0-beta.3` ne Zallet nwoma no firi 7 Ɔkɔtɔberɛ 2026.

## Nea wuhia

- Zebra ayɛ sync koraa, a RPC akyekyere localhost.
- Zaino yɛɛ sync tiaa saa Zebra node no.
- Zallet `v0.1.0-beta.3` anaa foforo, wallet build, a ne RPC akyekyere localhost. Nhoma no mu nsɛm a wɔahyehyɛ `z_sendmany` sɛnea wɔde adi dwuma no. Wɔpow akontaahyɛde ho ka: sɛ wotwam a `fee`, ɛsɛ sɛ ɛyɛ saa `null`, efisɛ Zallet de ZIP 317 ho ka no di dwuma bere nyinaa.
- Akontaabu a wɔde sika ahyɛ mu a ne Unified Address betumi asɛe sika a wɔabɔ ho ban.
- Address ahorow a Wɔaka abom a Wɔde Ma. Memo a ɛwɔ address a ɛda adi so no yɛ mfomso.

Mfa address a wɔde sika ahyɛ mu anaa kuki nhyɛ wiki no mu anaa script a wɔahyɛ ho bɔ mu. Mprempren no `txBuilderFromFile.sh` wɔ Unified Address a wɔde hardcoded ayɛ. Fa si ananmu wɔ mpɔtam hɔ na mfa nhyɛ wo nsa.

## Hyehyɛ Zallet

Fa Zallet a woreyɛ no yɛ config, afei twe adwene si Zebra ne Zaino. Nhwɛsoɔ a ɛwɔ nkyerɛkyerɛ dedaw no mu no de di dwuma `as_of_version = "0.0.0"` ne ankorankoro fie kwan. Fa saa fael no di dwuma sɛ mfonini a wɔayɛ no ntɛm ara, na ɛnyɛ sɛ ɛyɛ nsusuwso.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` ɛsɛ sɛ wɔkyerɛw din `z_sendmany`, `z_getoperationstatus`, ne `z_getoperationresult`. Bind RPC to `127.0.0.1` nko ara.

## Wɔn a wobegye no din

Unified Address biako wɔ nkyerɛwde biara mu, nsɛm a wɔafa aka biara nni hɔ, nkyerɛwde a ɛda hɔ kwa biara nni hɔ. Nkyerɛwee no kenkan `daoAddresses.md`. Readme dedaw no ka `daoAddress.md`. Saa fael no nni repo no mu, na edin ahorow no nhyia.

```text
u1...
u1...
```

## Fa memo biako mena

`z_sendmany` yɛ asynchronous a ɛnyɛ adwuma. Ɛsan de operation id bi ba. Nhwehwɛmu a wɔyɛe `z_getoperationstatus` kosi sɛ tebea no bɛyɛ `success` anaasɛ mfomso bi. A fixed 5 second sleep, a ɛyɛ nea script no yɛ no, hwere nea efi mu ba bere a build no gye bere tenten no. `z_getoperationresult` di oprehyɛn no, enti frɛ no kosi sɛ tebea no bɛyɛ terminal.

Wɔayi sika a wɔbɔ no afi mu. Zallet bu ZIP 317. Mfa nɔma bi ntwam.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

Memo field no yɛ raw hex, 512 bytes a ɛboro so. `ascii2hex` yɛ ASCII nkutoo ho adwuma. Nkyerɛwde a ɛwɔ nkyerɛwde biara a ɛnyɛ ASCII di nkogu. `xxd` anaa `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` di UTF-8 ho dwuma.

Kokoam nsɛm ho nhyehyɛe defaults to `FullPrivacy`. Ɛno ne default a ɛfata ma shielded recipient. Mma ntwam `AllowFullyTransparent`.

## Script mu sintɔ ahorow

Eyinom wɔ dua no mu fi 8 October 2026. Ntu mmirika `shieldNewsletter.sh` kosi sɛ wobesiesie.

- `[[ bytesInFile -lt 512 ]]` no ayera `$`. Baa dwumadibea a ɛwɔ memo biako no ntumi nkɔ da.
- Chunk loop no sie hex, afei `hex2ascii` decode no, afei `txBuilderFromFile.sh` encode no bio. Wɔnhoro chunk a etwa to no gye sɛ akyiri yi line bi boro so 512. Wɔnkyekyɛ line tenten bi mu. Wɔde mena nyinaa na ebetumi aboro 512-byte memo no.
- `txBuilderFromFile.sh` frɛ `./zallet rpc` a enni config kwan biara, na ɔhwɛ kwan sɛ binary no bɛba mprempren directory no mu. Fa di dwuma `zallet -c <config> rpc`.
- `toCurl.sh` ɔne Zebra kasa wɔ port 8232 a ɔde cookie, na ɔfrɛ `getinfo` ne `sendmany`. Zallet mfa mma `sendmany`. Mine-wait loop no nso de di dwuma `[[ chainHeight -gt temp ]]` nka ho `$`, enti ɛntwɛn.
- `z_gettotalbalance 0 true` no twam sɛ gyinabea ho akyinnyegye afoforo. Hwɛ `rpc help z_gettotalbalance` wɔ binary a wotu mmirika ansa na wode saa frɛ no adi dwuma no so.
- Chunk biara soma `0.0001` ZEC de kɔma obiara a obegye no. ZIP 317 ho ka no wɔ soro. Sɛ wokyerɛw krataa tenten kɔ address pii so a, wɔsɛe sika pii sen mfutuma dodow no.

## Bere a wɔasiesie no akyi

Ɛsɛ sɛ mmirikatufo a wɔateɛteɛ no:

1. Kenkan nkyerɛwde no sɛ baiti na kyekyɛ mu wɔ 512-byte hye so, ɛnyɛ nkyerɛwde so.
2. Hex-encode chunk biara pɛnkoro.
3. Frɛ `zallet -c <config> rpc z_sendmany` ne UA a wɔde sika ma, recipient array, ne fee akyinnyegye biara.
4. Nhwehwɛmu a wɔyɛe `z_getoperationstatus` ma saa oprehyɛn id.
5. Kyerɛw txid no akyi nkutoo `success`.

Nkyerɛkyerɛ krataafa dedaw no da so ara wɔ [Shielded Newsletter nkyerɛwee ahorow](/tutorials/shieldednewsletter/readme). Fa kratafa yi di dwuma ma ɔkwan a wɔfa so yɛ no.
