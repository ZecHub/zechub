<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ịkwado [Verifying] Mwepụta Zcash

## Na nkenke

- Ịbudata ọnụọgụ abụọ [binary] Zcash abụghị otu ihe dịka inweta nke ọrụ ahụ bipụtara. Nkwado bụ otú ị ga-esi amata ihe dị iche.
- Checksum na-egosi na faịlụ bịarutere n'enweghị mmebi. **signature** na-egosi onye mepụtara ya. Ị chọrọ ha abụọ, checksum naanị ya na-egosikwa ntakịrị ihe.
- Zebra na-ebipụta faịlụ `SHA256SUMS` tinyere ngwugwu **Sigstore** nke jikọtara mwepụta ahụ na workflow GitHub Actions, tag na commit kpọmkwem — enweghị mkpa ijikwa igodo.
- Zallet na-ebipụta **GPG** signature ndị e kewapụrụ (`.asc`) n'akụkụ SLSA provenance na SBOM.
- Igodo mbinye-aka Zcash gbanwere na 2026 site na Electric Coin Company gaa na Zcash Open Development Lab (ZODL). Ọ bụrụ na ị kwadoro mwepụta ochie, ị chọrọ igodo ọhụrụ ahụ — nkwupụta nnyefe ahụ ka igodo abụọ ahụ bịanyekwara aka, ya mere ị nwere ike ịkwado ntụgharị ahụ n'onwe ya.
- `gpg` na-akọpụta **subkey** bịanyere faịlụ aka, ọ bụghị igodo isi a kpọrọ aha n'ịkpọsa. Fingerprint nke yiri ihe na-ezighi ezi na-abụkarị subkey, ọ bụghị mwakpo.
- Ọ bụrụ na nkwado adaada, agbagbula ọnụọgụ abụọ ahụ.

*E kwadoro megide Zebra `v6.3.0` na Zallet `v0.1.0-beta.2` na 2026-08-18.*

## Gịnị mere nke a ji dị mkpa karịa maka Zcash

Ọnụọgụ abụọ e-akpa ego nke emebiri emebi nwere ike izipu Igodo ego ma ọ bụ viewing key gị pụọ. N'adịghị ka paswọọdụ e mebiri, mfu ahụ na-adịgide: enweghị rollback, enweghị chargeback, ọ nweghịkwa desk nkwado. Azụmahia nke e chebere echebe na-echebe ihe na-eme *on-chain* — ha anaghị enye nchebe ọbụla mgbe e dochiri software ị na-agba tupu ọ rute gị.

Nke a bụ otu n'ime ụzọ mwakpo ole na ole ebe nkwa Nzuzo nke protocol na-adịghị emetụta nnọọ. Nkwado bụ oyi akwa na-ekpuchi ya.

## Ụdị egwu — ihe nkwado na-achọpụta na ihe ọ na-adịghị achọpụta

**Na-achọpụta:**

- Mirror e mebiri emebi ma ọ bụ faịlụ agbanwere e si ebe ọzọ na-abụghị peeji mwepụta ọrụ ahụ nye.
- Mgbanwe man-in-the-middle n'oge nbudata.
- CDN e mebiri ma ọ bụ host nkesa a hijackara.
- Mmebi mberede n'oge mbufe.

**Anaghị achọpụta:**

- Onye na-elekọta ọrụ nke bịanyere koodu ọjọọ aka. signature ahụ ga-akwado nke ọma; ọ na-egosi ebe o siri bịa, ọ bụghị ebumnuche.
- Host owuwu e mebiri nke na-emepụta artifact nwere signature ma dịkwa njọ. Nke a bụ ihe reproducible builds na provenance attestation dị iji belata.
- Igodo i nwetara n'otu ebe e mebiri emebi e si nwetakwa ọnụọgụ abụọ ahụ. Ọ bụrụ na onye mwakpo na-achịkwa faịlụ ahụ na igodo ị jiri elele ya, nkwado anaghị agwa gị ihe ọ bụla.

Isi okwu ikpeazụ ahụ bụ nke ọtụtụ nduzi na-awụli elu. **Ebe ị nwetara igodo ahụ dịkwa mkpa dịka ịgba iwu ahụ.**

---

## Akụkụ 1 — Zebra: checksum na Sigstore

Zebra na-ebipụta assets ndị a maka mwepụta ọ bụla:

| Asset | Ebumnuche |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | archive ọnụọgụ abụọ |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum kwa-faịlụ |
| `SHA256SUMS` | checksum maka architectures niile |
| `SHA256SUMS.sigstore.json` | ngwugwu Sigstore na-abịanye `SHA256SUMS` aka |

### Nzọụkwụ 1 — Budata

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Nzọụkwụ 2 — Lelee checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Mwepụta n'ezie:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

A chọrọ `--ignore-missing` ebe a n'ihi na `SHA256SUMS` na-ekpuchi architecture ọ bụla ma ị budatara naanị otu. Enweghị ya, `sha256sum` na-akọpụta archive aarch64 na-adịghị dịka ọdịda, ị nwekwara ike ịghọta nnabata dịka ọdịda.

Ụdị kwa-faịlụ na-arụkwa ọrụ:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Nzọụkwụ a naanị ya ezughị.** Ị budatara checksum ahụ n'otu ebe ahụ ọnụọgụ abụọ ahụ si. Onye ọ bụla nwere ike dochie otu nwere ike dochie nke ọzọ. Checksum na-egosi izi ezi; nzọụkwụ sochirinụ na-egosi ebe o siri bịa.

### Nzọụkwụ 2b — Otu nlele ahụ na Windows

PowerShell enweghị ọnọdụ verify nke `-c`, ya mere ị ga-atụnyere aka:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Mwepụta n'ezie:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Tụnyere nke ahụ na nsonaazụ Linux dị n'ihu na peeji a:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Ụkpụrụ ndị ahụ yitere kpamkpam.** Hex enweghị mkpụrụedemede ukwu ma ọ bụ nta, nke a bụkwa mkpu ụgha a na-ahụkarị na Windows.

Ọnyà abụọ ọzọ kpọmkwem maka Windows:

- **Enweghị exit code ị ga-enyocha.** Na Linux, `sha256sum -c` na-eweghachi 1 mgbe ọ dara, script nwekwara ike ime ihe dabere na ya. `Get-FileHash` na-ebipụta naanị hash — ntụnyere bụ nke gị ime, nke gị kwa imehie site n'ile anya ngwa ngwa.
- **Iji anya gụọ mkpụrụedemede hex 64 anaghị atụkwasị obi.** Ka shell mee ya:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Na macOS:** usoro ọrụ ahụ bụ otu, mana BSD userland na-abịa na `shasum` kama `sha256sum` — jiri `shasum -a 256 -c --ignore-missing SHA256SUMS`. Onye dere peeji a enweghị igwe macOS, ya mere e depụtara iwu ahụ site na tooling Apple kama ịgba ya. Ọ bụrụ na ị kwadoro na macOS, biko mepee PR iji kwado ma ọ bụ mezie ya.

### Nzọụkwụ 3 — Kwado ngwugwu Sigstore

Sigstore na-edochi igodo mbinye-aka na-adị ogologo oge site na certificates dị mkpụmkpụ ejikọtara na njirimara CI, nke e dekọrọ na transparency log ọhaneze. Ọ dịghị onye na-ejide igodo mwepụta a pụrụ izuru.

Ụzọ kwụ ọtọ na-eji `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Flags `--certificate-*` abụọ bụ isi ihe niile. **Enweghị ha, ị na-akwado naanị na mmadụ, n'ebe ụfọdụ, bịanyere faịlụ ahụ aka.** Site na ha, ị na-akwado na workflow dị na repository Zebra bịanyere ya aka, nke OIDC issuer nke GitHub kwadoro.

> ⚠️ **Ụdị version dị mkpa.** Cosign ochie enweghị ike ịgụ usoro ngwugwu Sigstore dị ugbu a. Ịgba nke dị n'elu na cosign `v2.4.1` na-emepụta:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Ngwugwu ahụ *nwere* certificate — ọ dị n'okpuru `verificationMaterial.certificate.rawBytes`, ebe mwepụta ochie anaghị achọ. Nke a bụ mmachi client, ọ bụghị mwepụta mebiri emebi. Ọ bụrụ na nke a emee gị, kwalite cosign kama ikpebi na nbudata ahụ adịghị mma. Cosign etinyere site na distribution na-anọkarị ọtụtụ oge n'azụ upstream.

Nzọụkwụ abụọ sochirinụ na-egosi otu esi eji aka kwado otu ngwugwu ahụ, nke bara uru ịghọta n'agbanyeghị ihe ọ bụla — ọ bụkwa ụzọ ọzọ na-arụ ọrụ mgbe cosign build gị ekweghị imekọrịta.

### Nzọụkwụ 4 — Gụọ ihe certificate ahụ na-ekwu n'ezie

Ị nwere ike inyocha ngwugwu ahụ na-enweghị `cosign`, nke bara uru maka ịghọta ihe ị na-atụkwasị obi. Wepụ certificate:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Mwepụta n'ezie maka Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name bụ njirimara ahụ. Ọ na-akpọ repository, faịlụ workflow kpọmkwem, na tag. Sigstore na-etinye metadata owuwu ọzọ na custom extensions:

| Field | Uru maka v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

A pụrụ inyocha nke ọ bụla n'ime ndị a. Hash commit kwesịrị ikwekọ na tag dị na repository; workflow run kwesịrị ịdị ma bụrụ nke ọha.

### Nzọụkwụ 5 — Jiri cryptography kwado signature

Ị nwere ike iji OpenSSL kwado signature ozugbo:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Mwepụta n'ezie:

```
Verified OK
```

Ngwugwu ahụ dekọkwara digest ọ bịanyere aka. Kwenye na ọ kwekọrọ na faịlụ mpaghara gị:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Nzọụkwụ 6 — Ntinye transparency log

Ngwugwu ahụ nwere ntinye Rekor nke na-egosi na e bipụtara signature ahụ na log ọhaneze, append-only:

| Field | Uru |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

Nke a bụ ihe na-eme ka iji igodo eme ihe n'enweghị onye maara bụrụ nke a pụrụ ịchọpụta. Signature nke na-apụtaghị na log, ma ọ bụ pụtara n'oge na-adịghị ezi uche, bụ akara kwesịrị ime ka ị mee ihe. Tụnyere oge integration ahụ na ọkwa mwepụta.

> **Rịba ama banyere ụzọ OpenSSL:** ọ na-akwado signature ahụ megide public key certificate ahụ, mana ọ naghị eji onwe ya kwado certificate chain gaa na root Sigstore ma ọ bụ lelee inclusion proof nke ntinye log ahụ. `cosign verify-blob` na-eme ha atọ. Jiri OpenSSL ghọta usoro ahụ; jiri `cosign` mee nlele gị n'ezie.

---

## Akụkụ 2 — Zallet: GPG signature

Zallet na-ebipụta ụdị assets dị iche:

| Asset | Ebumnuche |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | archive ọnụọgụ abụọ |
| `.tar.gz.asc` | GPG signature e kewapụrụ |
| `.tar.gz.intoto.jsonl` | attestation SLSA provenance |
| `.tar.gz.provenance.json` | metadata provenance |
| `.tar.gz.sbom.spdx` | bill of materials software |

### Nzọụkwụ 1 — Chọpụta igodo mbinye-aka tupu ịmalite ịchọ ya

Buru ụzọ gbaa nkwado ahụ *mbụ*, na-enweghị igodo ebubatara:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Mwepụta n'ezie:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Nke a abụghị ọdịda. Ọ na-agwa gị na signature dị ma kpọọ kpọmkwem igodo ị chọrọ, **tupu** ịmalite ịchọ. Rịba ama fingerprint na issuer, wee nweta igodo ahụ site n'ebe na-adabereghị na nbudata ahụ.

> `gpg` na-ebipụta timestamps na timezone mpaghara gị. Mwepụta dị n'elu na-egosi `WAT` (UTC+1); otu signature ahụ na-agụ `18:18:44 UTC` ebe ọzọ. Otu oge ahụ. Ewerela ihe dị iche timezone dịka enweghị nkwekọrịta.

### Nzọụkwụ 2 — Bubata igodo ahụ ma kwado

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Mwepụta n'ezie:

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

`Good signature` bụ ihe ị chọrọ. Ihe abụọ dị na mwepụta ahụ na-agbagwoju ndị mmadụ anya, ha abụọ bụkwa ihe nkịtị.

### Gịnị mere fingerprint anaghị ekwekọ na ọkwa ahụ

Nkwupụta mgbanwe igodo ZODL na-akpọ fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Mana `gpg --verify` kọrọ `1FE9 9324 …  23F0 617F`. Nke ahụ yiri enweghị nkwekọrịta, mana ọ bụghị ya.

`gpg` na-akọpụta **subkey** mere signature ahụ. Ọkwa ahụ na-akpọ **igodo isi**. Kwenye mmekọrịta ahụ n'onwe gị:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Mwepụta n'ezie:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Ahịrị `sub` bụ signing subkey; ahịrị `pub` bụ isi. Otu njirimara, otu package igodo. Nke a bụ ihe mere mwepụta nkwado ji ebipụta fingerprints **ha abụọ** — tụnyere nke *isi* na ọkwa ọ bụla e bipụtara, ma were ahịrị subkey dịka nke na-agwa gị akụkụ igodo rụrụ ọrụ ahụ.

Ikewa igodo n'ụzọ a bụ ebumnobi: a pụrụ ịtụgharị ma ọ bụ kagbuo signing subkey na-enweghị ịtụfu njirimara isi na ntụkwasị obi ọ chịkọtara.

### Ihe ịdọ aka ná ntị `[unknown]` pụtara

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Nke a **abụghị** nsogbu na signature ahụ. Signature ahụ dị mma n'ụzọ cryptographic — nke ahụ bụ ihe `Good signature` na-ekwu. Ịdọ aka ná ntị ahụ na-ekwu ihe ọzọ: ị gwabeghị GnuPG mpaghara gị na ị kwenyere na igodo a bụ nke onye ọ sịrị na ọ bụ.

GnuPG na-ekewa ajụjụ abụọ:

1. **Igodo a ọ bịanyere faịlụ a aka?** — `Good signature` na-aza ya. Ọ bụ cryptographic, enweghị mkpebi mmadụ.
2. **Igodo a ọ bụ nke ZODL?** — cryptography anaghị aza nke a ma ọlị. Ị na-eguzobe ya site n'ịlele fingerprint megide ebe onwe ya.

Ị ga-ahụ ịdọ aka ná ntị a n'ihe fọrọ nke nta ka ọ bụrụ nkwado niile ma ọ bụrụ na ị banyeghị igodo ahụ aka na mpaghara. Ewerela ya dịka ọdịda. **Were** enweghị `Good signature` dịka ọdịda.

### Nzọụkwụ 3 — Kwado mgbanwe igodo ahụ n'onwe ya

Mbinye aka mwepụta Zcash si na Electric Coin Company kwaga Zcash Open Development Lab na 2026, mgbe e hiwere ZODL na Jenụwarị 2026 site na engineering na product team mbụ nke ECC.

| | Igodo ochie | Igodo ọhụrụ |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, emepụtara 2023-06-19 | RSA 4096-bit, emepụtara 2026-03-23, ga-ekubi 2028-03-22 |
| Published at | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Usoro oge e bipụtara: e mepụtara igodo ọhụrụ 2026-03-23, e kwupụtara ya 2026-03-27, mbinye aka naanị ya malitere 2026-04-23, e mere atụmatụ kagbuo igodo ochie ECC na 2026-06-23.

Ọkwa ntụgharị na website bụ naanị nke a pụrụ ịtụkwasị obi dịka website ahụ. Usoro ziri ezi bụ nkwupụta **igodo abụọ ahụ clear-signere**, ka igodo ochie wee kwado nke ọhụrụ. ZODL na-ebipụta nke ahụ kpọmkwem:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Mwepụta n'ezie (e belatara — signature abụọ n'otu akwụkwọ):

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

Nsonaazụ `Good signature` abụọ n'otu akwụkwọ, sitere na igodo ochie na igodo ọhụrụ. Ọ bụrụ na ị tụkwasịrị igodo ECC obi maka mwepụta mbụ, ntụkwasị obi ahụ na-aga ugbu a n'ihu na igodo ZODL n'enweghị ịtụkwasị `zodl.com`, `apt.z.cash`, ma ọ bụ post forum obi. Nke a bụ njirimara ị ga-achọ mgbe ọrụ na-atụgharị igodo — enweghị ya kwesịkwara ka a jụọ ajụjụ.

### Ebe a ga-enweta igodo — na ebe a na-agaghị enweta ya

E si nke kacha mma ruo nke kacha njọ:

1. **Nkwupụta igodo gara aga bịanyere aka**, dịka n'elu. Nhọrọ kacha ike mgbe ntụgharị gasịrị.
2. **Ebe na-adabereghị na nbudata ahụ.** Ọnụọgụ abụọ si na GitHub bịa; igodo si na `apt.z.cash` bịa. Onye mwakpo ga-achọ ha abụọ.
3. **Keyserver, nke a jiri fingerprint e bipụtara nyochaa ọzọ.** Onye ọ bụla nwere ike ibugo igodo na-ekwu njirimara ọ bụla n'ọtụtụ keyserver. Ntụnyere fingerprint bụ ihe na-eme nke a dị nchebe — ọ bụghị keyserver.
4. **Otu peeji ahụ ọnụọgụ abụọ dị.** Ihe fọrọ nke nta ka ọ bụrụ enweghị mmesi obi ike. Onye ọ bụla nwere ike dochie otu nwere ike dochie nke ọzọ.

Na-atụnyere **fingerprint zuru ezu** mgbe niile megide igodo **isi**. Short key ID na-adị mfe ịkpakọta, ejirila ha mee mwakpo n'ezie.

## Akụkụ 3 — Nkwado dara ada

Nkwado bara uru naanị ma ọ bụrụ na ị maara ụdị ọdịda ya dị. Nke a bụ nke dị n'ezie, e mepụtara ya site n'itinye naanị null byte otu na archive dị mma:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Mwepụta n'ezie:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Exit code: `1`.

Debe digests abụọ ahụ n'akụkụ ibe ha:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Otu byte ka etinyere na faịlụ 66,992,676-byte. Hash abụọ ahụ enweghị ihe ha na-ekekọrịta — ọbụghị prefix, ọbụghị pattern. Enweghị partial match ma ọ bụ “nso zuru ezu”: checksum na-ekwekọ kpọmkwem ma ọ bụ faịlụ ahụ abụghị faịlụ ị chọrọ.

### Ihe ị ga-eme mgbe nke a mere

1. **Agbagbula ọnụọgụ abụọ ahụ.** Ewepụtala ya, ejikwala `chmod +x` ya.
2. **Nwaa ọzọ site na peeji mwepụta gọọmentị.** Ọtụtụ ọdịda bụ nbudata e bepụrụ.
3. **Ọ bụrụ na ọ daa nke ugboro abụọ, gbanwee ụzọ netwọk.** Njikọ ọzọ, ma ọ bụ VPN. Ọdịda na-eso gị gafee netwọk dị iche na nke na-adịghị.
4. **Kwenye na ị nwere faịlụ checksum ziri ezi maka version ziri ezi.** Iji sums v6.3.0 tụnyere v6.2.3 ga-ada n'ụzọ ziri ezi.
5. **Ọ bụrụ na ọ ka daa, kọọ ya.** Mepee issue na repository ọrụ ahụ, ma ọ bụ jiri kọntaktị nchekwa dị na `SECURITY.md` maka ihe ọ bụla ị chere bụ nke e kpachaara anya. Lee peeji [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) maka channels ikpughe.
6. **Debe artifact ahụ.** Ọnụọgụ abụọ e mebiri emebi bụ ihe akaebe. Ehichapụla ya tupu ị kọọ ya.

Ọdịda signature dị njọ karịa ọdịda checksum. Enweghị nkwekọrịta checksum na-abụkarị mmebi; faịlụ dị mma mana signature ọjọọ abụghị ihe na-eme na mberede.

---

## Akụkụ 4 — Tebụl ntụaka

| Project | Ebe e bipụtara mwepụta | Usoro | Ebe igodo si abịa |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Enweghị igodo — njirimara CI site na OIDC GitHub |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — isi `0338 34DD…58E2 6AB1`, signing subkey `1FE9 9324…23F0 617F` |
| **zcashd** | *larala ezumike* | — | Kwụsịrị na block 3,417,100 na 2026-07-18. Etinyela ya. |
| **Zodl** (nke a na-akpọbu Zashi) | App Store / Google Play; `zodl-inc` na GitHub | Store signing; standalone Android binaries GPG-signed | Igodo ZODL kwa nkwupụta mgbanwe |

> **Rịba ama maka aha:** Zashi gbanwere aha ya ka ọ bụrụ **Zodl** na 2026 — mbụ na App Store, emesịa na Google Play. Nduzi ochie na-ekwu maka “Zashi” na-akọwa otu usoro e-akpa ego ahụ.

---

## Akụkụ 5 — E-akpa ego mobile na hardware

Nkwado na-arụ ọrụ n'ụzọ dị iche mgbe ị hapụrụ nbudata kpọmkwem.

**Ụlọ ahịa app.** Ị pụghị inyocha signature n'onwe gị. Store na-abịanye package aka, ma ị na-atụkwasị ntụle store na izi ezi akaụntụ onye mmepụta obi. Ihe ị *nwere ike* ikwenye bụ na ị nwere app ziri ezi: kwado aha publisher na package identifier megide website gọọmentị nke ọrụ ahụ, ọ bụghị megide nsonaazụ ọchụchọ. Apps nṅomi na-adịkarị, listing store abụghịkwa ihe akaebe nke eziokwu.

**APKs standalone Android.** Ndị a *nwere ike* ịkwado. ZODL na-ebipụta binaries standalone Android GPG-signed site na Releases GitHub, ya mere usoro ọrụ Akụkụ 2 na-emetụta. Họrọ ụzọ a ma ọ bụrụ na ịchọrọ chain a pụrụ inyocha.

**Hardware wallets.** Ngwaọrụ ahụ na-akwado firmware nke ya, ya mere trust anchor bụ hardware, ọ bụghị faịlụ dị n'igwe gị. Lee [Keystone Zashi](/guides/keystone-zashi) maka usoro nkwado ngwaọrụ. Zụta kpọmkwem n'aka onye nrụpụta — mmebi supply-chain na-eme n'etiti factory na onye zụrụ ya.

---

## Ịgụkwu

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — policy ikpughe na kọntaktị nchekwa
- [Zebra Full Node](/zcash-tech/zebra-full-node) — itinye Zebra mgbe ị kwadoro ya
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — iji Zallet
- [Akwụkwọ Sigstore](https://docs.sigstore.dev/)
- [Ọkwa SLSA provenance](https://slsa.dev/)

---

*E gbara iwu ndị dị na peeji a megide Zebra `v6.3.0` na Zallet `v0.1.0-beta.2` na 2026-08-18. Tooling mwepụta na-agbanwe: ọ bụrụ na mwepụta dị iche na nke egosiri ebe a, tụkwasị n'ọsọ nke gị obi ma biko mepee PR.*
