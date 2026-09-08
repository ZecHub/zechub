<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nyochaa Zcash Releases

## TL;DR

- Ibudata Zcash ọnụọgụ abụọ abụghị otu ihe ahụ dị ka ịnweta nke ọrụ a bipụtara. Nyocha bụ otú ị si amata ọdịiche.
- Nchịkọta ego na-egosi faịlụ ahụ erutela nke ọma. ** mbinye aka** gosipụtara onye mepụtara ya ị chọrọ ha abụọ, ma nchịkọta ego n'onwe ya egosila obere ihe.
- Zebra na-ebipụta akwụkwọ akụkọ. `SHA256SUMS` faịlụ tinyere ** Sigstore** ngwugwu nke na-ejikọta ntọhapụ ahụ n'otu ọrụ GitHub Actions, mkpado ma tinye  enweghị njikwa igodo achọrọ.
- Zallet na-ebipụta akwụkwọ mmado ** GPG** (`.asc`) tinyere SLSA provenance na SBOM.
- The Zcash signing key rotated in 2026 from Electric Coin Company to Zcash Open Development Lab (ZODL). If you verified older releases, you need the new key — and the handover statement is signed by both keys, so you can verify the rotation itself.
- `gpg` na-akọ ** subkey** nke bịanyere aka n'akwụkwọ, ọ bụghị isi ihe a kpọrọ aha na ọkwa. Mkpịsị aka mkpịsị ụkwụ dị njọ bụkarị igodo ọzọ, ọ dịghị ọgụ.
- Ọ bụrụ na nyocha ahụ adaghị, agbapụla ọnụọgụ abụọ.

*A na-enyocha ya megide Zebra. `v6.3.0` na Zallet . `v0.1.0-beta.2` on 2026-08-18.*

## Ihe mere nke a ji dị mkpa karịa maka Zcash

A tampered wallet binary can exfiltrate a spending key or a viewing key. Unlike a compromised password, that loss is permanent: there is no rollback, no chargeback and no support desk. Shielded transactions protect what happens *on chain* — they offer no protection at all when the software you are running was replaced before it ever reached you.

Nke a bụ otu n'ime ụzọ ọgụ ole na ole ebe nkwa nzuzo nke usoro ahụ adịghị mkpa. Nyocha bụ oyi akwa kpuchiri ya.

## Ihe atụ iyi egwu  ihe nyocha ahụ na-eme ma ghara ijide ya.

** Ihe a na-egbute:**

- Ihe onyonyo a gbanwere ma ọ bụ faịlụ e mezigharịrị site na ebe ọzọ karịa ibe ntọhapụ nke ọrụ ahụ.
- Mgbanwe nwoke-n'etiti n'oge ibudata.
- CDN mebiri emebi ma ọ bụ onye na-ekesa nkesa.
- Nrụrụ aka na mberede n'oge njem.

** Ọ naghị ejide:**

- Onye na-eme ihe n'ọrụ nke bịanyere aka n'akwụkwọ koodu ọjọọ. Mbinyeaka ahụ ga-enyocha ya; ọ gosipụtara mmalite, ọ bụghị ebumnobi.
- Onye na-ewu ewu nke mebiri emebi na -emepụta ihe eji arụ ọrụ ma ọ bụ ihe ọjọọ. Nke a bụ ihe ndị nwere ike ịmepụta ọzọ na nkwenye sitere n'aka dị adị iji belata.
- Igodo ị nwetara site n'otu ebe ahụ mebiri emebi dị ka ọnụọgụ abụọ. Ọ bụrụ na onye mwakpo achịkwa ma faịlụ ahụ yana igodo ị nyochara ya, nkwenye anaghị agwa gị ihe ọ bụla.

Nke ikpeazụ ahụ bụ nke ọtụtụ ndị nduzi na-atụfu. ** Ebe ị nwetara igodo dị mkpa dịka ịme iwu.**

---

## Nkebi nke 1  Zebra: checksums na Sigstore

Zebra na-ebipụta ihe ndị a maka mbipute ọ bụla:

Akụnụba. Nzube.
|---|---|
| `zebrad-<version>-<arch>.tar.gz` Ihe nchekwa data nke ọnụọgụ abụọ.
| `zebrad-<version>-<arch>.tar.gz.sha256` Nchịkọta ego maka faịlụ ọ bụla.
| `SHA256SUMS`  nchịkọta maka ihe owuwu niile.
| `SHA256SUMS.sigstore.json` ◯ Sigstore ngwugwu mbinye aka `SHA256SUMS` |

### Nzọụkwụ 1  Download

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Nzọụkwụ 2  Lelee checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Ezi mmepụta:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` a chọrọ ebe a n'ihi na: `SHA256SUMS` na-ekpuchi ọ bụla ije ma ị naanị ebudatara otu. Na-enweghị ya, `sha256sum` na-akọ akụkọ aarch64 dị ka ọdịda ma ị nwere ike ịkọhie ihe gafere dịka ọdịda.

Ụdị faịlụ nke ọ bụla na-arụkwa ọrụ:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Nke a naanị nzọụkwụ bụ ezughị.** Ị ebudatara checksum si n'otu ebe dị ka ọnụọgụ abụọ. Onye ọ bụla nwere ike dochie otu nwere ike dozie nke ọzọ. Checksum na-egosi iguzosi ike n'ezi ihe; usoro ọzọ gosipụtara mmalite.

### Nzọụkwụ 2b  Otu nlele na Windows

PowerShell enweghị ihe ọ bụla . `-c` nyochaa ọnọdụ, yabụ ị jiri aka tụnyere:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Ezi mmepụta:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Tụlee nke ahụ na nsonaazụ Linux tupu oge a:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

** Ụkpụrụ ndị yiri.** Hex anaghị ebute ikpe, nke a bụ otu mkpu ụgha kachasị na Windows.

Ugboro abụọ ọzọ Windows-kpọmkwem ọnyà:

- **Enweghị koodu ọpụpụ iji lelee.** Na Linux, `sha256sum -c` na-alaghachi 1 mgbe ọdịda ma edemede nwere ike ime ya. `Get-FileHash` naanị na-ebipụta hash  ntụnyere bụ nke gị ime, ma bụrụkwa nke gị iji mebie site n'ịgbagharị.
- **Ịgụ mkpụrụ edemede 64 hex site na anya bụ ihe a na-apụghị ịdabere.** Ka shei mee ya:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> ** Na macOS:** usoro ọrụ bụ otu ihe ahụ, ma BSD userland ụgbọ mmiri `shasum` kama nke ahụ. `sha256sum`  iji mee ihe `shasum -a 256 -c --ignore-missing SHA256SUMS`. Onye edemede nke ibe a enweghị igwe MacOS dị, yabụ iwu ahụ ka edere site na ngwa ọrụ Apple kama ịgba ọsọ. Ọ bụrụ n'ịkwado na macOS, biko mepee PR iji kwado ma ọ bụ dozie ya.

### Nzọụkwụ 3  Nyochaa Sigstore ngwugwu

Sigstore na-eji akwụkwọ ikike dị mkpirikpi dochie anya igodo mbinye aka ogologo oge ejikọtara ya na njirimara CI, edekọ n'ime ndekọ nghọta ọha. Ọ dịghị onye nwere mkpịsị ugodi ntọhapụ nke enwere ike izu ohi.

Ụzọ kwụ ọtọ na-eji `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Ha abụọ . `--certificate-*` flags are the whole point. **Without them you are only confirming that somebody, somewhere signed the file.** With them you are confirming it was signed by a workflow in the Zebra repository, authenticated by GitHub's OIDC issuer.

> ️ **Ọdịiche dị iche.** Ọhụrụ cosign na-ewu enweghị ike ịgụ usoro Sigstore ugbu a. Na -agba ọsọ n'elu ya na cosign `v2.4.1` na-emepụta:
>
> ```
> Njehie: ụyọkọ enweghị cert maka nkwenye, biko nye igodo ọha na eze (Public key)
> ```
>
> Ngwongwo ahụ * nwere* akwụkwọ ikike  ọ na-anọdụ n'okpuru ya. `verificationMaterial.certificate.rawBytes`, nke ochie releases adịghị achọ. Nke a bụ onye ahịa mmachi, ọ bụghị agbajikwa ntọhapụ. Ọ bụrụ na ị kụrụ ya, kwalite cosign kama ikwubi nbudata dị njọ. Nkesa-packaged cosign bụ mgbe anya n'azụ elu mmiri.

Nzọụkwụ abụọ na-esote ga-egosi otu esi enyocha otu ngwugwu ahụ site n'aka, nke bara uru ịghọta agbanyeghị  ma bụrụ ihe ndabere dị mma mgbe ụlọ ọrụ gị agaghị arụkọ ọrụ.

### Nzọụkwụ 4  Gụọ ihe akwụkwọ ahụ kwuru n'ezie.

Ị nwere ike inyocha ụyọkọ ahụ n'enweghị ihe ọ bụla. `cosign`, nke bara uru maka ịghọta ihe ị tụkwasịrị obi. Wepụ akwụkwọ ahụ:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Nrụpụta nke Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Aha ọzọ nke isiokwu bụ njirimara. Ọ na-akpọ aha nchekwa, faịlụ ọrụ kpọmkwem, yana mkpado ahụ. Sigstore agbakwunye mgbakwunye metadata ndị ọzọ n'ime ndọtị omenala:

Ubi. Uru maka v6.3.0
|---|---|
Onye na-enye OIDC. `https://token.actions.githubusercontent.com` |
Ebe nchekwa isi mmalite. `https://github.com/ZcashFoundation/zebra` |
◯ Mee ka ihe ahụ doo anya. `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
Onye na-agbachitere: `refs/tags/v6.3.0` |
Gburugburu ebe a na-agba ọsọ. `github-hosted` |
 Gbaa usoro ọrụ. `.../actions/runs/31424510487/attempts/1` |
Ihe ngosi nchekwa data. `public` |

Onye ọ bụla n'ime ndị a nwere ike ịlele. hash ahụ kwesịrị ikwekọ na mkpado dị na ebe nchekwa; usoro ọrụ ga-adị adị ma bụrụ ọha mmadụ.

### Nzọụkwụ 5  Nyochaa mbinye aka na cryptographically

Ị nwere ike ikwenye mbinye aka ahụ ozugbo na OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Ezi mmepụta:

```
Verified OK
```

Ihe ngwugwu ahụ na-edekọkwa nchịkọta nke ọ bịanyere aka. Nyochaa ya kwekọrọ na faịlụ mpaghara gị:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Nzọụkwụ 6  Ihe ndekọ akwụkwọ nghọta

Ngwongwo ahụ nwere ndekọ Rekor na-egosi mbinye aka a bipụtara ya n'akwụkwọ ọha, tinye naanị log:

Ubi. Uru.
|---|---|
◯ Ihe ndekọ log index. `2412071838` |
Ụdị ntinye. `hashedrekord v0.0.1` |
 Ejikọtara na 2026-08-10 19:43:09 UTC.

Nke a bụ ihe na-eme ka igodo dị jụụ jiri mee ihe n'ụzọ ziri ezi. Nkwekọrịta nke ahụ apụtaghị na ndekọ, ma ọ bụ pụtara na oge adịghị mma, bụ akara bara uru ime ihe. Tụlee oge mwekota megide ọkwa ntọhapụ.

> ** Nkọwa na ụzọ OpenSSL:** ọ nyochaa mbinye aka megide igodo ọha nke asambodo ahụ, mana ya onwe ya anaghị enyocha usoro akwụkwọ ikike maka mgbọrọgwụ Sigstore ma ọ bụ lelee ihe ngosi ntinye ndekọ. `cosign verify-blob` na-eme ihe atọ ahụ. Jiri OpenSSL iji ghọta usoro; jiri `cosign` dị ka ego ị na-akwụ.

---

## Akụkụ 2  Zallet: GPG signatures

Zallet na-ebipụta ihe dị iche:

Akụnụba. Nzube.
|---|---|
| `zallet-<version>-<platform>.tar.gz` Ihe nchekwa data nke ọnụọgụ abụọ.
| `.tar.gz.asc` ◯ Ihe e ji amata GPG nke dịpụrụ adịpụ.
| `.tar.gz.intoto.jsonl` Ihe akaebe nke ebe ihe si bịa.
| `.tar.gz.provenance.json` Metadata nke ebe o si.
| `.tar.gz.sbom.spdx` Akwukwo ihe eji emeputa software.

### Nzọụkwụ 1  Chọpụta igodo mbinye aka tupu ị gawa ịchọ ya .

Gbaa nyocha * mbụ, na-enweghị igodo ebubata:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Ezi mmepụta:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Nke a abụghị ọdịda. Ọ na-agwa gị mbinye aka dị adị ma aha kpọmkwem igodo ị chọrọ, ** tupu** ịmalite ịchọ. Rịba ama mkpisiaka ahụ na onye nyere ya, wee nweta isi ihe site n'ebe ọzọ nke nweere onwe ha maka ibudata.

> `gpg` na-ebipụta akara oge n'oge mpaghara gị. Ihe dị elu gosipụtara `WAT` (UTC+1); otu mbinye aka ahụ na-agụ: `18:18:44 UTC` N'otu oge ahụ. Elela ọdịiche nke mpaghara oge anya dị ka ihe na-ekwekọghị ekwekọ.

### Nzọụkwụ 2  Bubata igodo ma nyochaa ya .

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Ezi mmepụta:

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

`Good signature` Ihe abụọ dị na mpụta ahụ gbagwojuru ndị mmadụ anya, ha abụọ bụkwa ihe nkịtị.

### Ihe mere na mkpisiaka ahụ adabaghị n'ihe e dere ná mkpọsa ngwá ahịa ahụ.

ZODL isi mgbanwe iwu aha mkpisiaka akara aka `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`Ma . `gpg --verify` e kwuru na ọ bụ `1FE9 9324 …  23F0 617F`Nke ahụ yiri ka ọ bụ enweghị nkwekọ ma o meghị.

`gpg` na-akọ ** subkey** nke mere mbinye aka. Nkwupụta ahụ aha ya bụ isi ihe mbụ. Kwado mmekọrịta gị onwe gị:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Ezi mmepụta:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Ihe ahụ bụ: `sub` ahịrị bụ subkey mbinye aka; na-eme ka a mara ihe dị n'ime ya. `pub` ahịrị bụ isi. Otu njirimara, otu ngwugwu igodo. Nke a mere na nyocha mmepụta mbipụta ** ma** mkpisiaka  tụnyere * isi* megide ọkwa ọ bụla e bipụtara, wee mesoo subkey akara dị ka ịgwa gị akụkụ nke igodo ahụ rụrụ ọrụ ahụ.

Ịkewa igodo n'ụzọ dị otú a bụ ihe e bu n'uche: enwere ike ịgbanwere ma ọ bụ kagbuo subkey na-edebanye aha ya n'ebughị ụzọ wepụ njirimara mbụ ahụ.

### Gịnị na- `[unknown]` ịdọ aka ná ntị pụtara

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Nke a abụghị nsogbu na mbinye aka. Mbinye aka ahụ bụ ihe ziri ezi nke ọma  ọ bụ ya mere `Good signature` ịdọ aka na ntị ahụ kwuru ihe dị iche: Ị gwaghị GnuPG mpaghara gị na i kwenyere igodo a bụ onye ọ na-ekwu.

GnuPG na-ekewapụ ajụjụ abụọ:

1. **Kedụ ka igodo a si bịanye aka na faịlụ a?**  zara site n'aka: `Good signature`Ọ bụ ihe nzuzo, ọ bụghị mmadụ.
2. **Key a ọ bụ nke ZODL?**  enweghị azịza site na nzuzo ma. Ị ga-achọpụta ya site n'iji akara mkpịsị aka ahụ tụnyere isi mmalite dị iche.

Ị ga-ahụ ịdọ aka ná ntị a na ihe fọrọ nke nta ka ọ bụrụ nkwenye niile ma ọ gwụla ma i doro anya ịbanye igodo ahụ n'ógbè. Elela ya dị ka ọdịda. ** Do** dozie isi okwu efu `Good signature` dị ka ọdịda.

### Nzọụkwụ 3  Nyochaa isi mgbanwe onwe ya

Zcash release signing moved from Electric Coin Company to Zcash Open Development Lab in 2026, after ZODL was formed in January 2026 by the former ECC engineering and product team.

Igodo ochie. Igodo ọhụrụ.
|---|---|---|
Ihe mkpịsị aka. `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
☐ UID ▸ Zcash Master Signing Key (ECC)  Nkwado maka ịkwụ ụgwọ na-akwụghị ụgwọ. `<sysadmin@z.cash>` Zcash Open Development Lab (ZODL) Ihe ndị dị mkpa `<sysadmin@zodl.com>` |
☐ Ụdị: RSA 3072-bit, kere 2023-06-19 ▸ RSA 4096-bit, eke 2026-03-23, ga-agwụ na 2028-03-22 📅 ya. - N'ihi gịnị? Ọ bụ n'ihi ihe ndị a ka m ji kwuo okwu ahụ.
E bipụtara na: `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Oge e bipụtara: igodo ọhụrụ emere 2026-03-23, mara ọkwa na 2026- 03-27, ịbịanye aka naanị site na 20 26-4-23, iweghachi nke isi ECC ochie emebere maka 2026-6-23 .

Nkwupụta ntụgharị na webụsaịtị bụ naanị ntụkwasị obi dịka weebụsaịtị. Usoro ziri ezi bụ nkwupụta ** nke ejiri mkpịsị ugodi abụọ bịanye aka, yabụ igodo ochie ahụ kwadoro maka ọhụrụ. ZODL bipụtara kpọmkwem:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Nrụpụta n'ezie (abbreviated  abụọ signatures on one document):

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

Abụọ . `Good signature` na-arụpụta otu akwụkwọ, site na isi ochie ahụ ma nke ọhụrụ. Ọ bụrụ na ị tụkwasịrị obi igodo ECC maka mbipute ndị gara aga, ntụkwasị obi a gafere ugbu a gaa ZODL key n'enweghị mkpa ịtụkwasị gị obi ọzọ `zodl.com`, `apt.z.cash`, ma ọ bụ post forum. Nke a bụ ihe onwunwe ị ga-achọ mgbe ọ bụla ọrụ na -atụgharị igodo  yana enweghị ya bara uru ịjụ maka ya.

### Ebe ị ga-enweta igodo  na ebe ọ bụghị.

E si n'onye kasị mma ruo onye nke kachasị njọ:

1. ** Nkwupụta nke igodo gara aga bịanyere aka na ya, dị ka n'elu. Nhọrọ kachasị ike mgbe a gbanwere ya.
2. **Isi mmalite nke na-enweghị ihe ọ bụla n'ime ibudata.** Ihe ọnụọgụ abụọ ahụ sitere na GitHub; igodo si `apt.z.cash`Onye na-awakpo mmadụ chọrọ ha abụọ.
3. **Onye na-ejide mkpịsị aka, nke a nyochara ya site n'akara akara mkpịkpọaka e bipụtara.** Onye ọ bụla nwere ike bulite igodo na-ekwu maka njirimara onye ọbụla ka ọtụtụ ndị na - ejide mkpịrịka. Ntụle mkpịkpọrọ ahụ bụ ihe mere nchekwa  abụghị keyserver.
4. **Otu peeji ahụ dị ka ọnụọgụ abụọ.** Ọ fọrọ nke nta ka ọ bụrụ na e nweghị nkwa. Onye nwere ike dochie otu onye nwekwara ike dochia ibe ya.

Na-atụle mkpịsị aka ** zuru ezu** na igodo isi. Igodo ID dị mkpirikpi bụ ihe a pụrụ iji mee ka ọ bụrụ nke ọma ma jiri ya mee ihe n'ezie mwakpo .

## Nkebi nke 3  Nnyocha na-ada ada

Nyocha bụ naanị uru ma ọ bụrụ na ị maara ihe ọdịda dị ka. Nke a bụ ezigbo, mepụtara site n'ịgbakwunye otu byte efu na nchekwa data ziri ezi:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Ezi mmepụta:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Koodu ọpụpụ: `1`.

Tinye ihe abụọ ahụ n'akụkụ ibe ha:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Otu byte agbakwunyere na faịlụ 66,992,676-byte. Ihe abụọ ahụ enweghị ihe ọ bụla  abụghị prefix, ọ bụghị ụkpụrụ. Enweghị nkwekọrịta akụkụ ma ọ bụ "dị nso": nchịkọta nyocha dabara kpọmkwem maọbụ faịlụ adịghị faịlụ ịchọrọ.

### Ihe ị ga-eme ma nke a mee.

1. ** Ejila ọnụọgụ abụọ ahụ.** Ewepụla ya, emela. `chmod +x` it.
2. ** Gbalịa ọzọ site na peeji ntọhapụ.** Ọtụtụ ọdịda bụ nbudata ebudatara.
3. ** Ọ bụrụ na ọ daa nke ugboro abụọ, gbanwee ụzọ netwọk.** Njikọ dị iche ma ọ bụ VPN. Nsogbu ndị na-eso gị n'ofe netwọk dị iche site na otu nke anaghị eme ya.
4. ** Gosi na ị nwere faịlụ nchịkọta ego ziri ezi maka nsụgharị kwesịrị ekwesị.** Ịtụle v6.3.0 megide v6.2.3 ga-adaba.
5. ** Ọ bụrụ na ọ ka dara, kọọ ya.** Mepee nsogbu n'ụlọ nkwakọba ihe nke ọrụ ahụ, ma ọ bụ jiri kọntaktị nchebe dị na `SECURITY.md` maka ihe ọbụla ị na-eche bụ nke e bu n'obi. Lee akwụkwọ a: [Zcash Ecosystem Security (Nchebe nke Ebe Ihe Dị Ndụ)](/zcash-community/zcash-ecosystem-security) peeji maka ọwa nkwupụta.
6. **Kebere ihe ahụ.** Ihe abụọ a na-agbanwe agbanwe bụ akaebe. Ehichapụla ya tupu ị kọọ akụkọ.

Ọdịda mbinye aka dị njọ karịa ọdịda checksum. A na-enwekarị nrụrụ; faịlụ ziri ezi ma ọ bụ ihe ọjọọ abụghị ihe na - eme site n'ihe mberede .

---

## Akụkụ 4  Tebụl ntụaka

 Project  Releases bipụtara na  Method  Ebe igodo si abịa 
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle.  Ọ dịghị igodo  CI njirimara site na GitHub OIDC
**Zallet** Ọ bụ onye na-eme ihe nkiri. `github.com/zcash/zallet/releases` GPG ewepụrụ onwe ya. `.asc`, ebe SLSA si, SBOM. `apt.z.cash/zodl.asc`  nke mbụ `0338 34DD…58E2 6AB1`, na-edebanye aha subkey `1FE9 9324…23F0 617F` |
**zcashd**  Kwụsị na ngọngọ 3,417,100 on 2026-07-18. Do not install.
♬ **Zodl** (nke a na-akpọbu Zashi) ♫ App Store / Google Play; `zodl-inc` na GitHub  Nkwekọrịta ụlọ ahịa; ihe abụọ Android kwadoro GPG-kweere aka  ZODL igodo kwa nkwupụta mgbanwe  Ọdịnaya nke ndị ọrụ:

> **Naming note:** Zashi was rebranded to **Zodl** in 2026 — first on the App Store, then on Google Play. Older guides referring to "Zashi" describe the same wallet lineage.

---

## Nkebi nke 5  Mobile na ngwaike wallets

Nyocha na-arụ ọrụ dị iche mgbe ị hapụrụ nbudata kpọmkwem.

**App stores.** You cannot check a signature yourself. The store signs the package and you are trusting the store's review and the developer account's integrity. What you *can* verify is that you have the right app: confirm the publisher name and the package identifier against the project's official site, not against search results. Impersonation apps are common, and a store listing is not evidence of authenticity.

**Standalone Android APKs.** Ndị a *nwere ike nyochaa. ZODL na-ebipụta GPG bịanyere aka n'akwụkwọ nke onwe ha gam akporo binaries site GitHub Releases, ya mere akụkụ 2 workflow metụtara. Họrọ ụzọ a ma ọ bụrụ na ịchọrọ usoro nyocha.

** Ngwá ọrụ ngwaike.** Ngwaọrụ ahụ na-egosi ihe ngwanrọ ya, n'ihi ya ntụkwasị obi bụ akụrụngwa, ọ bụghị faịlụ dị na igwe gị. Lee [Keystone Zashi (Onye na-eme ihe nkiri)](/guides/keystone-zashi) maka usoro nyocha ngwaọrụ. Zụta kpọmkwem site n'aka onye nrụpụta  mmebi nke ọkọnọ na-eme n'etiti ụlọ ọrụ mmepụta ihe na onye zụrụ ya.

---

## Ịgụ ihe ọzọ

- [Zcash Ecosystem Security (Nchebe nke Ebe Ihe Dị Ndụ)](/zcash-community/zcash-ecosystem-security)  amụma nkwupụta na kọntaktị nchebe
- [Zebra Full Node (Nọmba zuru ezu)](/zcash-tech/zebra-full-node)  ịwụnye Zebra mgbe nyochachara ya
- [Akwụkwọ Ntuziaka Ọsọ Zallet](/using-zcash/zallet-quick-reference-guide)  iji Zallet eme ihe
- [Akwụkwọ Sigstore](https://docs.sigstore.dev/)
- [SLSA ebe ọkwa si abịa](https://slsa.dev/)

---

*Iwu ndị dị na ibe a gbara ọsọ megide Zebra `v6.3.0` na Zallet `v0.1.0-beta.2` na 2026-08-18. Mgbanwe ngwá ọrụ ntọhapụ: ọ bụrụ na mmepụta dị iche site n'ihe e gosipụtara ebe a, tụkwasị obi gị onwe gị ma biko mepee PR.*
