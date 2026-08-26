<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ṣíṣayẹwo Àwọn Ìtọ́jú Zcash

## TL;DR

- Gbigba faili ìkọ̀lẹ́ Zcash kò bára mu pẹ̀lú gbígba èyí tí iṣẹ́ náà tẹ̀ jáde. Ìdánilójú ni ọ̀nà tóo fi lè mọ ìyàtọ̀ rẹ̀.
- Àkójọ àyẹ̀wò fi hàn pé ìwé náà dé láìṣe ìpalára. **ìmúṣẹ** fi hàn ẹni tó ṣe é. O nílò méjèèjì, àti àkójọ àyẹ̀wò fúnra rẹ kò fi bẹ́ẹ̀ jẹ́ ẹrí rárá.
- Zebra tẹ ìwé kan jáde tó sọ nípa àwọn ohun tí wọ́n ń ṣe. `SHA256SUMS` faili pẹlú ìdìpọ̀ **Sigstore** tí ó so ìtúmọ̀ náà mọ́ iṣẹ-ṣiṣe GitHub Actions kan pàtó, fi àmì sí i kí o sì ṣe àdàkọ rẹ  kò nílò ìṣàkóso kókó.
- Zallet ń tẹ àwọn ìdìbò tí a yàtọ̀ sí GPG jáde (`.asc`) pẹlú SLSA orísun àti SBOM.
- The Zcash signing key rotated in 2026 from Electric Coin Company to Zcash Open Development Lab (ZODL). If you verified older releases, you need the new key — and the handover statement is signed by both keys, so you can verify the rotation itself.
- `gpg` ó ń sọ ìkọ̀rọ́ alábẹ̀ẹ̀kejì tí wọ́n fi òǹtẹ̀ sí fáìlì kan, kì í ṣe kókó àkọọ́lẹ̀ tá a dárúkọ nínú àwọn àtẹjáde. Ẹsẹ ọwọ tó bá dà bí èyí tí kò tọ́ sábà máa ń jẹ́ ọ̀kan lára àwọn kọ̀rọ̀ alábẹ́ẹ̀rẹ̀, kìí ṣe ikọ̀ ìjàkadì.
- Bí ìdánimọ̀ bá kùnà, má ṣe fi ìsọfúnni onípò méjì náà ṣiṣẹ́.

*A ti ṣayẹwo rẹ̀ lòdì sí Zebra. `v6.3.0` àti Zallet. `v0.1.0-beta.2` on 2026-08-18.*

## Ìdí tí èyí fi ṣe pàtàkì jù fún Zcash

A tampered wallet binary can exfiltrate a spending key or a viewing key. Unlike a compromised password, that loss is permanent: there is no rollback, no chargeback and no support desk. Shielded transactions protect what happens *on chain* — they offer no protection at all when the software you are running was replaced before it ever reached you.

Eyi jẹ ọkan ninu awọn ọna ikọlu diẹ nibiti idaniloju aṣiri ti ilana naa ko ṣe pataki. Ijẹrisi ni ipele ti o bo rẹ.

## Àpẹẹrẹ ìhalèmọ̀  ohun tí àyẹwò ṣe àti èyí tí kò mú jáde

** Àwọn ẹja tí wọ́n mú:**

- Aago tí a fi ṣe àdàkọ tàbí fáìlì yípadà ti wọlé láti ibòmíràn ju ojúewé ìfilọ́lẹ̀ iṣẹ́ náà lọ.
- Àdàkọ tí ó wà ní àárín-ọmọ ènìyàn nígbà ìmúwáwé.
- Àjọ CDN tí a ti fi ṣe àdàkàdekè tàbí ilé ìkápá ìpèsè-ìpínsílẹ̀ kan.
- Ìwà ìbàjẹ́ tó wáyé láìròtẹ́lẹ̀ nígbà tí wọ́n ń gbé e kiri.

** Kò lè rí:**

- Olùtọ́jú tí ó fọwọ̀ sí kóòdì oníwà ìbàjẹ́. Ìfọwọ́sí náà yóò ṣètọ́nà ní tòótọ; ó fi orísun hàn, kì í ṣe ète.
- A ṣe àdàkọ ilé tí ó ń mú ẹ̀rọ-ìmọ́lẹ̀ tó wà ní ìmúṣẹ jáde. Èyí ni ohun ti àwọn àkójọpọ̀ àti ìdánilójú ibi tí wọ́n wá láti dín kù sí.
- kókó tí o rí gbà láti orísun kan náà tó jẹ́ ti ìkọ̀wé méjì. àyẹ̀wò kò sọ nǹkankan fún ọ bí ẹni tó ń jà bá ní àṣẹ lórí fáìlì àti kókó rẹ, ó yẹ kí ẹ wò ó bóyá àwọn méjèèjì wà nínú ohun èlò yìí tàbí wọn ò sí níbẹ̀.

Awon ohun to wa nibe ni awon olopaa maa n foju ba. **Ibi ti o gba kiakia naa lo je pataki bi won se le fi ofin ranse.**

---

## Apá 1  Zebra: àwọn àtúnyẹwò àti Sigstore

Zebra ṣe atẹjade awọn ohun-ini wọnyi fun igbasilẹ kọọkan:

Ànímọ́. Ète.
|---|---|
| `zebrad-<version>-<arch>.tar.gz` Àpamọ́ ìsọfúnni méjì.
| `zebrad-<version>-<arch>.tar.gz.sha256` Àkójọ àyẹ̀wò fún-àkọsílẹ̀.
| `SHA256SUMS` ì ì ¬ë¥1⁄4 í ë ¤.
| `SHA256SUMS.sigstore.json` ☐ Ìforúkọsílẹ̀ ìdìpọ̀ àwọn ìwé-ìpamọ́ Sigstore `SHA256SUMS` |

### Ìgbésè 1  Ṣe àtúnyẹ̀wò

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Ìgbésẹ̀ 2  Ṣayẹwo iye àyẹwò náà.

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Ìmújáde gidi:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` a nílò rèé níbí nítorí pé: `SHA256SUMS` ó bo gbogbo àwọn ẹ̀rọ ìgbàlódé, o sì gba ọ́ lọ́wọ́ kan ṣoṣo. láìsí rẹ̀, `sha256sum` ó ń ròyìn àpamọ́ aarch64 tí kò sí gẹ́gẹ́ bí ìkùnà àti pé o lè ṣi kà ọ̀rọ̀ ìdásílẹ̀ bíi àìdàsílẹ̀.

Àdàkọ tí ó wà fún kálukú-ìwé pẹ̀lú ń ṣiṣẹ́:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Igbesẹ yìí nìkan kò tó.** O gba àyẹ̀wò náà láti ibi kannáà tí ìkọ́lé méjì ti wà. Ẹnikẹni to bá lè rọpo ọ̀kan le rọpo èkejì. Àjọṣe-ìṣirò fi hàn pé ó jẹ́ òótọ́; ìgbésè kejì sì fìdí rẹ múlẹ̀.

### Igbesẹ 2b  Ṣayẹwo kanna lori Windows

PowerShell kò ní ìwífún kankan. `-c` mode verify, kí o fi ọwọ ṣe àfiwé:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Ìmújáde gidi:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Fi èyí wé èsì Linux tí a rí ní ìbẹ̀rẹ̀ ojúewé yìí:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Àwọn iye tó bára mu.** Hex kò ní àpò, èyí sì ni ìkìlọ̀ èké kan ṣoṣo tí ó wọ́pọ̀ jù lọ nínú Windows.

Àwọn ìdẹkùn méjì mìíràn tí ó jẹ́ ti Windows:

- **Kò sí kókó ìjáde láti ṣayẹwo.** Lórí Linux, `sha256sum -c` ó máa ń dá 1 padà nígbà tí kò bá ṣiṣẹ́, àdàkọ sì lè ṣe é. `Get-FileHash` ó kàn tẹ àmì ìdìpọ̀ kan jáde  ìwọ lo máa ṣe àfiwé náà, o sì lè ṣàṣìṣe nípa rírán nǹkan wò.
- **Kì í ṣe ohun tó ṣeé gbára lé láti ka àwọn òǹkọ̀wé mẹ́rìndínláàádọ́rin tí wọ́n fi ojú kọ.** Ẹ jẹ́ kí àgbá náà máa kà á:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **On macOS:** awọn workflow jẹ kanna, sugbon BSD userland ọkọ oju omi `shasum` dípò kí wọ́n máa sọ pé: `sha256sum`  lílò rẹ̀ `shasum -a 256 -c --ignore-missing SHA256SUMS`. Oníwé ojúewé yìí kò ní ẹ̀rọ macOS kankan, nítorí náà àṣẹ yẹn ni a ṣe àkọsílẹ̀ láti inú irinṣẹ́ Apple dípò tí yóò fi ṣiṣẹ. Bí o bá ṣètẹríba lórí MacOS, jọwọ ṣí PR kan tó ń fìdí rẹ múlẹ̀ tàbí wípé ó tọ́ sí i.

### Igbese 3  Ṣayẹwo ìdìpọ̀ Sigstore

Sigstore replaces long-lived signing keys with short-lived certificates bound to a CI identity, recorded in a public transparency log. Nobody holds a release key that can be stolen.

Ọna tí ó tọ́ lo àwọn ohun èlò yìí: `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Àwọn méjèèjì yìí ni: `--certificate-*` àwọn àmì-ìdìbò ni gbogbo kókó. **Láìsí wọn o kàn ń fìdí rẹ̀ múlẹ̀ pé ẹnìkan, níbì kan ti fọwọ́ sí fáìlì náà.** pẹ̀lú wọ́n ìwọ n fi ẹ̀rí hàn wípé ó jẹ́ àtẹsẹ̀ṣẹ̀ láti inú ìpamọ́ Zebra tí a ṣe ìdánilójú nípa OIDC GitHub's issuer.

> ️ **Ìtumọ̀ ṣe kókó.** Àwọn ìdìpọ̀ àdàkọ tí ó ti pẹ́ kò lè ka ọ̀nà ìṣàwákiri Sigstore tó wà nísinsìnyí. Ṣíṣe èyí lókè yìí pẹlu cosign `v2.4.1` ṣe:
>
> ```
> Àṣìṣe: ìdìpọ̀ kò ní ẹrí fún ìdánimọ, jọwọ pèsè kókó gbangba (public key)
> ```
>
> Ìdìpọ̀ *ní* ní ìwé ẹrí kan  ó wà lábẹ́ rẹ̀. `verificationMaterial.certificate.rawBytes`, èyí tí àwọn ìtúmọ̀ àtijọ́ kò wá. Èyí jẹ ààlà oníṣe, kì í ṣe ìmújáde tó bàjẹ́. Bí o bá lu u, gbé ìgbésẹ̀ láti ṣàtúntò dípò kí ó parí wípé fídíò náà ti burú. Àsìálẹ̀-ìpínwọ́lé fún pínpín sábà máa ń wà ní ẹyìn ọ̀dọ̀ ẹni tí yóò gba àkọsílẹ̀ rẹ sílẹ̀.

Awọn igbesẹ meji ti o tẹle fihan bi a ṣe le ṣayẹwo iṣakojọpọ kanna pẹlu ọwọ, eyiti o tọ lati ni oye laibikita  ati pe o jẹ atunṣe ṣiṣe nigbati kọkọ-aṣẹ rẹ ko ba ṣiṣẹ.

### Ìgbésẹ̀ 4  Ka ohun tí ìwé-ẹrí náà sọ ní ti gidi.

O lè ṣàyẹ̀wò ìdìpò̀ náà láìṣe àyẹ̀wò rẹ. `cosign`, ti o wulo fun oye ohun ti iwọ n gbẹkẹle. Fa ijẹrisi naa jade:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Ojúlówó ìjáde fún Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Orukọ Ẹya yiyan jẹ idanimọ. O pe ibi ipamọ, faili ṣiṣan iṣẹ gangan ati aami naa. Sigstore ṣe afikun data meta siwaju sii ni awọn itẹsiwaju aṣa:

Ẹ̀ka: Iye fún àtúnṣe 6.3.0
|---|---|
Ẹ̀ka tí ó ń ṣe àdàkọ OIDC. `https://token.actions.githubusercontent.com` |
Àkójọ ìsọfúnni. `https://github.com/ZcashFoundation/zebra` |
Ṣẹ̀dá ìmúṣẹ. `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
Olùdájọ́: `refs/tags/v6.3.0` |
Àyíká oníṣe. `github-hosted` |
Ṣiṣẹ́ ìtòlẹ́sẹẹsẹ. `.../actions/runs/31424510487/attempts/1` |
Àkọlé àwòrán Ìwòye ibi ìpamọ́. `public` |

Gbogbo àwọn wọ̀nyí ni a lè ṣayẹwo. Ìsọ ìdìpọ̀ náà gbọ́dọ̀ bá àmì tí ó wà nínú ibi-ipamọ; ìgbésẹ̀ iṣẹ́ yẹ kí o wà àti pé kó jẹ ti gbogbo ènìyàn.

### Igbesẹ 5  Ṣayẹwo ìforúkọsílẹ̀ náà nípa lílo ìlànà ìdánimọ̀-ǹṣe (cryptographically)

O le jẹrisi ìforúkọsílẹ̀ náà ní tààràtà pẹlú OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Ìmújáde gidi:

```
Verified OK
```

Àkójọ náà tún ń ṣàkọsílẹ̀ àdàkọ tí ó fọwọ́ sí. Ẹ jẹ́ kí a rí i pé ó bá fáìlì yín mu:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Ìgbésẹ̀ 6  Àkọsílẹ̀ àkọọ́lé ìwífúnni-nípa ìmọ̀lára

Àkójọ náà ní àkọsílẹ̀ Rekor tó fi hàn pé a tẹ ìforúkọsílẹ ̀ rẹ ̀ síta fún gbogbo ènìyàn, àfikún-kìlọ:

Àgbàlagbí. Iye.
|---|---|
Àkọsílẹ̀ àkọọ́lé ìlà. `2412071838` |
Irú ìléwọ́. `hashedrekord v0.0.1` |
Ó ti wà ní 2026-08-10 19:43:09 UTC.

Eyi ni ohun ti o mu ki lilo aṣiri ṣiṣi ṣe awari. Ibuwọlu kan ti ko han ninu iwe-akọọlẹ, tabi farahan ni akoko aiṣe deedee, jẹ ifihan agbara to tọ lati ṣiṣẹ lori. Ṣe afiwe akoko iṣọpọ pẹlu ikede itusilẹ naa.

> **Àkíyèsí lórí ọ̀nà OpenSSL:** ó ń ṣàyẹ̀wò ìforúkọsílẹ̀ náà lòdì sí kókó àkọ́lé ìwé-ìfiwéra, ṣùgbọ́n kò dá ara rẹ̀ fọwọ́si ẹ̀rí ìdánimọ̀ láti gbòǹgbò Sigstore tàbí àyẹ̀wò èsì àkópò tí wọ́n fi sínú àkọọ́lẹ̀. `cosign verify-blob` o ni gbogbo awọn mẹta. Lo OpenSSL lati ye awọn ilana; lo `cosign` bí owó orí rẹ gan-an.

---

## Apá 2  Zallet: Àwọn ìdìmọ̀ GPG

Zallet ṣe atẹjade awọn ohun-ini oriṣiriṣi:

Ànímọ́. Ète.
|---|---|
| `zallet-<version>-<platform>.tar.gz` Àpamọ́ ìsọfúnni méjì.
| `.tar.gz.asc` ì ì í GPG.
| `.tar.gz.intoto.jsonl` Èrí láti ibi tí SLSA ti wá.
| `.tar.gz.provenance.json` Àkọsílẹ̀ àtòjọ.
| `.tar.gz.sbom.spdx` Àtòjọ àwọn ohun èlò fún ètò ìṣiṣẹ́.

### Ìgbésè 1  Mọ kókó ìforúkọsílẹ̀ náà kí o tó lọ wá a.

Ṣiṣẹ ìwádìí *kọ́kó*, láìní kókó tí a mú wọlé:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Ìmújáde gidi:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Eyi kii ṣe ikuna. O sọ fun ọ pe ibuwọlu kan wa ati awọn orukọ gangan kini bọtini ti o nilo, ** ṣaaju ki** to bẹrẹ wiwa. Ṣe akiyesi itẹka naa ati olutaja rẹ, lẹhinna gba bọtini lati orisun ominira ti gbigba silẹ.

> `gpg` Print time stamps in your local timezone. Ìjáde tí ó wà lókè yìí fi hàn pé àkókò tóo lò níbí kò tíì kọjá àlàfo, o lè rí i nínú ìmúṣẹ rẹ̀. `WAT` (UTC+1); ìlà kan náà kà pé: `18:18:44 UTC` má ṣe wo ìyàtọ̀ tó wà nínú àkókò tí wọ́n ń lò níbì kan pé kò bára mu.

### Igbese 2  Gbé kókó wọlé kí o sì ṣètẹ́wọ̀n rẹ̀

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Ìmújáde gidi:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
gpg: WARNING: The key's User ID is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

`Good signature` ohun méjì ló máa ń mú kí àwọn èèyàn ṣàròyé nínú ìsọfúnni tí wọ́n bá gbé jáde, méjèèjì sì bóde mu.

### Ìdí tí àlàfo ìka náà kò fi bá ohun tó wà nínú ìwé ìròyìn yẹn mu.

Awọn ZODL bọtini iyipada gbólóhùn oruko ika ọwọ `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. ṣùgbọ́n `gpg --verify` tí a ròyìn rẹ̀ `1FE9 9324 …  23F0 617F`Ó dà bíi pé kò bára mu, àmọ́ kì í ṣe bẹ́ẹ̀.

`gpg` ó ń sọ orúkọ ** subkey** tó ṣe ìforúkọsílẹ̀ náà. Ìkéde yìí dárúkọ ** primary key**. Ẹ fi ìdánilójú hàn nípa ìbátan fúnra yín:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Ìmújáde gidi:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Àwọn ohun tó ń ṣẹlẹ̀: `sub` ìlà ni kókó-ìpínlẹ̀ aláṣẹ; àwọn `pub` ìlà ni àkọ́kọ́. ìdánimọ̀ kan, àpò kókó kan. ìdí nìyí tí àwọn èsì ìjáde ìwádìí fi ń tẹ **àwọ̀n méjèèjì**  láti ṣe àpájọ *ìlànà* pẹlú gbogbo ìròyìn tó ti jáde, àti kí ó máa wo ìlà abẹ́-ọ̀rọ̀ bí ẹni wípé yóò sọ fún ọ apá ibi nínú kọ̀ǹpútà náà ló ṣiṣẹ́.

Pípín àwọn kókó lọ́nà yìí jẹ ète: a lè yí àlééfà aláṣẹ padà tàbí kí ó di èyí tí kò sí láìsí ìkórìíra fún ìdánimọ̀ àkọkọ àti ìgbàgbọ́ rẹ.

### Kí ni ìran yìí? `[unknown]` ìkìlọ̀ tó ń ṣe kedere

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Eleyi jẹ **not** a isoro pẹlu awọn iwe aṣẹ. Awọn iwe aṣẹ ni cryptographically wulo  ti o ni ohun ti `Good signature` Ìkìlọ̀ náà sọ nǹkan míì: o kò tíì sọ fún GnuPG àdúgbò rẹ pé ìwọ gbàgbọ́ wípé kókó yìí jẹ ti ẹni tí ó ń pè é.

GnuPG ya awọn ibeere meji:

1. **Ṣé kókó yìí fọwọ́ sí àkájọ ìwé náà?**  ìdáhùn láti ọwọ́: `Good signature`Àkọsílẹ̀, kò sí ìdájọ́ ènìyàn.
2. **Ṣé kókó yìí jẹ́ ti ZODL?**  kò sí ìdáhùn nípa ìdìkọ̀sí rárá. O lè fi ìdí rẹ múlẹ̀ nípa fífi àmì ọ̀pá ọwọ́ wádìí láti mọ ibi tí ó wà.

O yoo ri ikilọ yi lori fere gbogbo idaniloju ayafi ti o ba fi ami-ami si bọtini naa ni agbegbe. Maṣe ṣe itọju rẹ bi aṣiṣe. ** Ṣe** tọju aisi kan `Good signature` bí àṣìṣe.

### Igbese 3  Ṣayẹwo iyipada bọtini funrararẹ.

Zcash release signing moved from Electric Coin Company to Zcash Open Development Lab in 2026, after ZODL was formed in January 2026 by the former ECC engineering and product team.

Àkójọ àdàkọ:Old key. New key.
|---|---|---|
Àmì ìka. `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
UID Zcash Ọ̀gá Àkọlé Ìforúkọsílẹ (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, created 2023-06-19 | RSA 4096-bit, created 2026-03-23, expires 2028-03-22 |
A tẹ̀ ẹ́ jáde ní: `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Àkọsílẹ̀ àkókò tí a tẹ jáde: kókó tuntun ti a ṣe 2026-03-23, ìfilọ́lẹ̀ 2026- 03-27, wíwọlé fún àdáni láti 2026-4-23, pípaáṣẹ kíkéde kọ́rọ̀ ECC àtijọ́ ní ètò sí 2026-6-23 .

Ìkéde ìyípadà lórí ojúlé ayélujára jẹ́ olóòótọ̀ bí ojúlé náà. Ẹ̀rọ tí ó tọ ni àlàyé **tí àwọn kókó méjèèjì fọwọ́ sí**, nítorí náà kíkọ àkọsílẹ̀ àtijọ́ fún tuntun yìí. ZODL tẹ ìwé kan jáde ní pàtó pé:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Ìjáde gidi (ìkúrú  ìforúkọsílẹ̀ méjì lórí ìwé kan):

```
gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key B1C9095EAA1848DBB54D9DDA1D05FDC66B372CFE
gpg:                issuer "sysadmin@z.cash"
gpg: Good signature from "Zcash Master Signing Key (Electric Coin Company) <sysadmin@z.cash>" [unknown]
Primary key fingerprint: B1C9 095E AA18 48DB B54D  9DDA 1D05 FDC6 6B37 2CFE

gpg: Signature made Fri Mar 27 01:11:14 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Good signature from "Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>" [unknown]
Primary key fingerprint: 0338 34DD 49DE CF9D BB99  34BC 6C93 CA8E 58E2 6AB1
     Subkey fingerprint: 1FE9 9324 758F 2967 18B4  5706 7F4B BBBA 23F0 617F
```

Méjì `Good signature` ti o ba gbẹkẹle awọn ECC bọtini fun sẹyìn igbasilẹ, wipe igbẹkẹle bayi gbe siwaju si ZODL bọtini lai ni lati gbekele rẹ `zodl.com`, `apt.z.cash`, tabi ifiweranṣẹ apejọ. Eyi ni ohun-ini lati wa nigbakugba ti iṣẹ akanṣe kan ba yi awọn bọtini pada  ati pe isansa rẹ tọ si ibeere nipa.

### Ibi tí a ti lè rí kókó  àti ibi tá ò fi ní rí i

A ṣe àkójọ láti ibi tó dára jù lọ sí èyí tí ó burú jùlọ:

1. **Ìsọ̀rọ̀ tí kókó tó ṣáájú fi ọwọ́ sí**, bí èyí tá a sọ lókè. Àtúnṣe to lágbára jùlọ lẹ́yìn yípadà kan.
2. **Orí-ìmọ̀ tí kò ní ìsopọ̀ pẹlú ohun tó wà nínú ẹrù náà.** Ẹyọ méjì yìí wá láti GitHub; ọ̀nà àbájáde rẹ̀ sì ti jáde látọ́dọ̀ `apt.z.cash`Àwọn méjèèjì ló yẹ kí ẹni tó bá ń gbéjà kò wá.
3. **A keyserver, cross-checked against a published fingerprint.** Anyone can upload a key claiming any identity to most keyservers. The fingerprint comparison is what makes this safe — not the keyserver.
4. **Ojúewé kan náà tí ìdìpọ̀ méjì.** Kò sí ìdánilójú kankan. Ẹnikẹ́ni tó bá lè rọ̀ ọ́ lóyè, ó le rọ́ọ̀dù òmíràn.

Nigbagbogbo fi àdàkọ ìka ọwọ **kúnrẹ́** wé kókó àkọ́bí. Àwọn ID tó ṣe kúrú jẹ́ èyí tí a lè kọlu láìṣeé mọ̀, wọ́n sì ti lo wọn nínú àwọn ìjàkadì gidi.

## Apá 3  Àyẹ̀wò tí kò yọrí sí rere

Àyẹ̀wò jẹ́ ohun tí ó wúlò bí o bá mọ irú àṣìṣe tó dàbí. Eyi ni gidi kan, ti a ṣe nipa fifi null byte si ibi ìpamọ to wulo:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Ìmújáde gidi:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Àkọlé ìjáde: `1`.

Fi àwọn ìdì méjì náà lẹ́gbẹ̀ẹ́ ara wọn:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Ojúlówó ìsọfúnni tí ó wà nínú àwọn àdàkọ náà kò ní jẹ́ kí a rí ohun tó jọra. Kò sí ìdánwò kan tàbí "ìdára" kankan: iye-àyẹ̀wò yìí yóò bá ara rẹ mu, tabi faili ò lè ṣe bí o ti fẹ́ kó dà bíi pé òun ni ọ̀rọ̀ inú rẹ̀ ń sọ.

### Ohun tó yẹ kó o ṣe nígbà tí irú nǹkan báyìí bá ṣẹlẹ̀ sí ẹ

1. **Má ṣe fi ìdìpọ̀-ìpínlẹ̀ náà sílẹ.** Máà yọ ọ́ jáde, má ṣe `chmod +x` it.
2. **Gbiyanju lẹẹkansi lati oju-iwe igbasilẹ osise.** Ọpọlọpọ awọn ikuna jẹ gbigba silẹ ti a ge.
3. ** Bí ó bá kùnà lẹ́ẹ̀kejì, yí ipa ọ̀nà àkànṣe padà.** Ìsopọ̀ tí kò rí bẹ́ẹ̣ tàbí VPN. Àìdáa tó ń tẹ ẹ mọ́lẹ̀ ní gbogbo àwọn ìtàkùn yàtọ̀ sí èyí tí kì í ṣe béè.
4. **Ṣe idaniloju pe o ni faili iṣayẹwo ti o tọ fun ẹya to tọ.** Ṣiṣipopada v6.3.0 lodi si awọn akojọpọ v6.2.3 yoo kuna deede.
5. **Ti o ba tun kuna, royin rẹ.** Ṣii ọrọ kan ni ibi ipamọ iṣẹ akanṣe naa, tabi lo olubasọrọ aabo ninu `SECURITY.md` fún ohunkóhun tí o bá fura sí pé ó jẹ́ àfojúdi. wo ìwé-ìwé náà "The Bible and Its Message". [Ààbò Ìpínlẹ̀-ìmọ́ra Zcash](/zcash-community/zcash-ecosystem-security) ojúewé fún àwọn ọ̀nà ìfúnni.
6. **Ẹ pa ohun èlò náà mọ́.** Ẹ̀rí ni ìdìpọ̀ méjì tí wọ́n ti fi ṣe àdàkọ. Má yọ ọ kúrò kí o tó ròyìn rẹ.

Àìmúṣẹ ìforúkọsílẹ̀ jẹ́ ohun tó burú ju àṣìṣe iye ìdánwò lọ. Ìṣòro tí kò bá ṣe pàtó ni ó sábà máa ń jẹ́ ìwà òdì; faili-tí o tọ, ṣùgbọ́n ti a fọwọsi bí ẹni pé kò dára kì í ṣe nǹkan kan tó ṣẹlẹ̀ lójijì.

---

## Apá 4  Àtẹ ìsọfúnni

Project  Àwọn àtúnṣe tí a tẹ̀ jáde ní Method  Ibi tí kókó náà ti wá  Àdàkọ:Copyrighted by the author.
|---|---|---|---|
"Ìgbẹ́ Zebra" `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore ìdìpọ̀. Kò sí kókó  Àmì CI nípasẹ̀ GitHub OIDC
Ìtàn nípa Zallet. `github.com/zcash/zallet/releases` GPG tí a yà sókè. `.asc`, ibi tí SLSA ti wá, SBOM. `apt.z.cash/zodl.asc`  àkọ́kọ́ `0338 34DD…58E2 6AB1`, wíwọlé kókó-ìpínlẹ̀ `1FE9 9324…23F0 617F` |
**zcashd** . *retired*  . ó dúró ní block 3,417,100 on 2026-07-18. má ṣe fi sori ẹrọ.
 Zodl (tí a mọ̀ sí Zashi) App Store / Google Play; `zodl-inc` on GitHub  ìdìbò ilé-ìpamọ́; àwọn ẹ̀dà Android tó dá dúró tí wọ́n ti fọwọ́ sí GPG ZODL kókó fún àtúnṣe àkọsílẹ̀ transition statement

> **Nọ́tà orúkọ:** Zashi ni a tún ṣe àdàkọ sí **Zodl** ní 2026  àkọ́kọ́ lórí App Store, lẹ́yìn náà lórí Google Play. Àwọn ìwé atọ́nà tí ó ti pẹ̀lẹ́ tó ń tọka si "Zashi" ṣàpèjúwe ìlà ìdílé apamọwọ kannáà.

---

## Apá 5  Àwọn pọ́ọ̀sì alágbèéká àti ti ohun èlò orí kọǹpútà

Ìdánilójú máa ń ṣiṣẹ́ lọ̀nà tí ó yàtọ̀ lẹ́yìn tó o bá ti kúrò nínú ìmúwáàle tààrà.

** App stores.** O kò le ṣayẹwo ìforúkọsílẹ̀ fúnra rẹ. Ìṣòwò náà fọwọ́ sí ìwé àdìpọ̀, o sì ń gbẹkẹle ìdánilẹ́kọ̀ọ́ ti ilé-ìtajà àti àìlábàáyé àkọọ́lé olùgbéejáde. Ohun tí ìwọ * lè fi dá ẹ lójú ni pé ó ní ohun èlò tó tọ: jẹ́ kí orúkọ onímòǹgbà àti àmì ìṣàmúlò ọjà lòdì sí ojúewé iṣẹ́ náà, kì í ṣe lòdì sáwọn àṣeyọrí àwárí. Àwọn ètò ìlóríkójú wọpọ̀, àwọn àkójọ oníṣòwò kìí sì jé ẹ̀rí nípa òótọ́lọ́gbọ́n.

**Standalone Android APKs.** Àwọn wọ̀nyí *le jẹ́ àyẹwò. ZODL ń tẹ GPG-ìmúṣẹ àwọn ìdìpọ̀ méjì tí ó dúró sán - ún ti Android jáde nípasẹ GitHub Releases, nítorí náà apá 2 iṣẹ ìṣiṣẹ́ ni a lò. Ṣààyàn ipa ọ̀nà yìí bí o bá fẹ kí ẹsẹ̀ yíyèwo wà.

** Awọn apamọwọ ohun elo.** Ẹrọ naa jẹri si ẹrọ-iṣẹ tirẹ, nitorinaa iduro igbẹkẹle ni hardware, kii ṣe faili lori ẹrọ rẹ. Wo [Keystone Zashi (ìyẹn Òkúta Ìkóhun)](/guides/keystone-zashi)  ìfipábánilòpọ̀ nínú ẹrù-ìranṣẹ́ máa ń wáyé láàárín ilé iṣẹ́ àti oníbàárà.

---

## Àwọn àlàyé síwájú sí i

- [Ààbò Ìpínlẹ̀-ìmọ́ra Zcash](/zcash-community/zcash-ecosystem-security)  Ìlànà ìfúnni àti àwọn alábàákẹ́gbẹ́ tó ń rí sí ọ̀ràn ààbò
- [Zebra Ìkànnì Pípéye](/zcash-tech/zebra-full-node)  gbígbé Zebra kalẹ̀ lẹ́yìn tí a bá ti ṣàyẹ̀wò rẹ̀.
- [Ìwé Ìtọ́sọ́nà Rírìndìn Nípa Zallet](/using-zcash/zallet-quick-reference-guide)  lílo oògùn Zallet
- [Àkọsílẹ̀ ilé ìtajà Sigstore](https://docs.sigstore.dev/)
- [Awọn ipele ti awọn SLSA lati ọdọ wọn wa.](https://slsa.dev/)

---

*A ṣe àtúnṣe àwọn àṣẹ inú ojúewé yìí sí Zebra. `v6.3.0` àti Zallet. `v0.1.0-beta.2` 2026-08-18. Àwọn àtúnṣe ohun èlò ìfúnni: bí àṣejù bá yàtọ̀ sí èyí tí a fi hàn níbí, gbẹ́kẹ̀lé ìdánwò tìrẹ àti jọwọ ṣí PR.*
