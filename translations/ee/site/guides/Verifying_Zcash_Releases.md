<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Gɔmeɖeɖewo Dzɔdzɔdzɔmesewo Dodokpɔ

## TL;DR

- Menye nu ɖeka aɖe koe wònye be nàɖe Zcash ƒe nuŋlɔɖi si le Internet dzi la ɖe go o. Alesi nèwɔe nye alesi nàwɔ akpɔ vovototoa adze sii nyuie wu.
- Ne èŋlɔ nu siwo katã le agbalẽa me la, àkpɔe be wo dometɔ aɖewo nye esiwo ŋu wòhiã vevie wu. - g09 04-E.
- Zebra ɖe agbalẽ aɖe si me nyawo le la ɖe go. `SHA256SUMS` file plus a **Sigstore** bundle that ties the release to a specific GitHub Actions workflow, tag and commit  key management mehiã o.
- Zallet ta GPG ƒe asinuŋɔŋlɔgbalẽwo (`.asc`) tsɔ kpe ɖe SLSA ƒe afi si wòtso kple SBOM ŋu.
- Zcash ƒe asiɖetukpa trɔ le 2026 tso Electric Coin Company yi Zcash Open Development Lab (ZODL). Ne èkpɔa nu xoxowo la, àhiã na safui yeye  eye woade asi agbalẽ me kple safu eveawo siaa be nàte ŋu akpɔe ɖa.
- `gpg` Eɖea **aɖakavi** si de asi agbalẽ aɖe te la fiana, ke menye gbãtɔ ƒe dzesi si woyɔ le nyatakakaa me o. Ne ameŋɔŋlɔgbalẽvia medze nyuie o la, zi geɖe enye aɖiƒomɔ̃ sue aɖe ko, ke Menye amedzidzedzee o.
- Ne mɔnu sia medze edzi o la, mègawɔ binary-gbalẽa ŋu dɔ o.

*Wotsɔ kpe ɖe Zebra ŋu. `v6.3.0` kple Zallet, `v0.1.0-beta.2` on 2026-08-18.*

## Nu si tae nya sia le vevie na Zcash wu la ŋuti numeɖeɖewo:

A tampered wallet binary can exfiltrate a spending key or a viewing key. Unlike a compromised password, that loss is permanent: there is no rollback, no chargeback and no support desk. Shielded transactions protect what happens *on chain* — they offer no protection at all when the software you are running was replaced before it ever reached you.

Esia nye amedzidzedze ƒe mɔ ʋɛ siwo dzi ɖoɖowɔɖi me nu ɣaɣlawo ŋuti dedienɔnɔ ŋu nyawo mele vevie o la dometɔ ɖeka. Ðɔɖɔɖowɔwɔ ye le eme si nana wòtea ŋu wɔa esiawo katã.

## Afɔku ƒe kpɔɖeŋu  nusiwo ŋu woke ɖo le dodokpɔa me kple esiwo dzi womeke ɖo o

** Tɔmelã siwo woɖe:**

- Wowɔ nu kple nɔnɔmetata si ŋu wotrɔ asi le alo wota agbalẽ aɖe tso teƒe bubu ke menye tso dɔwɔƒea ƒe nyatakakadzraɖoƒea o.
- Ame si le titina ƒe asiɖeɖe ɖe ame ŋu ne wole wo xɔm.
- CDN si ŋu wowɔ nu ɖo nyuie alo nyatakakadzraɖoƒe aɖe si dzi woxɔa ame le.
- Nu gbegblẽ wɔwɔ le mɔ dzi.

**Mele asi ɖe ge o:**

- Ame si wɔa dɔ le asitelefon dzi la dea dzesi nu gbegblẽ siwo wowɔ. Asitɔtrɔ sia ana woakpɔe be eƒe ŋkɔa nye nyateƒe; eɖea ame si wɔ dɔa, ke menye amesi ɖoe o.
- Aʋawɔwɔ si me afɔku le, eye wòna wowɔ nuŋɔŋlɔ aɖe gake enye vɔ̃ɖivɔ̃ɖi. Esiae nye nusi ŋu woagate ŋu awɔ nuwo ɖo kple afisi wodzɔe tso ƒe ɖaseɖiɖiwo li be woate ŋu akpɔ egbɔ.
- Ne ame aɖe kpɔ ŋusẽ ɖe nyatakaka si nèŋlɔ kple esiwo dzi wòzãe la siaa dzi la, ekema kpeɖodzi aɖeke meli o.

Nu mamlɛtɔa nye esi ŋu mɔfiamewo dometɔ akpa gãtɔ ƒoa asa ɖo. ** Afi si nàkpɔ safui le la hã le vevie abe alesi wòate ŋu azã sededea ene.**

---

## Akpa 1  Zebra: checksum kple Sigstore

Zebra ɖea nu siawo ɖe go le eƒe magazine ɖesiaɖe me:

| Nunɔamese | Taɖodzi |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | nudzraɖoƒe si me nu eve le |
| `zebrad-<version>-<arch>.tar.gz.sha256` | ɖesiaɖe ƒe faɛl ƒe ɖaseɖigbalẽ |
| `SHA256SUMS` | checksums na xɔtuɖaŋuwo katã |
| `SHA256SUMS.sigstore.json` | Sigstore bundle ƒe asidede agbalẽ te `SHA256SUMS` |

### Afɔɖeɖe 1  Download

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Afɔɖeɖe 2  Kpɔe ɖa be èkpɔ ga si wotsɔ kpɔ egbɔa hã.

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Nuwɔna ŋutɔŋutɔ:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` wohiã le afisia elabena: `SHA256SUMS` Eɖea mɔ̃ ɖe sia ɖe si le asiwò la me eye ɖeka pɛ ko nèɖe. Ne mele eme o la, màte ŋu akpɔe adze sii gbeɖe o. `sha256sum` le nyatakaka dem tso archiv si mele aarch64 me o ŋu be enye vodada eye àte ŋu axlẽ mɔɖeɖe aɖe abe nusi gblẽ ene.

Dɔwɔƒe ɖeka ƒe dɔwɔgbalẽwo hã wɔa dɔ:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Mɔ sia ɖeɖe mesɔ gbɔ o.** Èxɔ numedzodzro la tso teƒe ɖeka kple binary. Ame ɖesiaɖe si ate ŋu axɔ ɖe ame aɖe te la, ate ŋu atsɔ evelia hã aɖo eteƒe. Numedzodzro ƒe kpeɖodzia ɖoa kpe nyateƒenyenye dzi; afɔɖeɖe bubu ɖo kpe dzɔtsoƒe dzi.

### Afɔ 2b  Nusia ke ko wòdzroa Windows me hã.

PowerShell me le o. `-c` to mɔ si dzi nàtsɔ adzro nu me le, ale be nàte ŋu atsɔe asɔ kple esi nèwɔ la:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Nuwɔna ŋutɔŋutɔ:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Tsɔe sɔ kple Linux ƒe dzidzedze si dze le axa sia me:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Nɔnɔme siwo sɔ.** Hex mefia be nu si wotsɔna dea ga wo o, eye esiae nye aʋatsoɣeyiɣi ɖeka aɖe koŋ le Windows dzi.

Windows-ƒonɔamesi eve bubuwo:

- **Menye asiɖeɖe le mɔa dzi ƒe dzesi aɖeke li si míalé ŋku ɖe eŋu o.** Le Linux me la, `sha256sum -c` Etrɔna 1 le vodada me eye nuŋlɔɖi ate ŋu awɔ dɔ ɖe edzi. `Get-FileHash` Ðeko wòŋlɔa nu si woƒo ƒu la ɖi  eye miawoe ate ŋu atsɔe asɔ kple esi me míedzro, gake miate ŋu ada vo le eme to ŋkuléle ɖe eŋu dzi.
- **Mɔ̃e nye be ame ƒe ŋku mate ŋu axlẽ ŋɔŋlɔdzesi 64 o.** Na aŋutrɔa nawɔ esia:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Le macOS dzi:** dɔwɔnawo le ɖeka, gake BSD userland me tɔwoe. `shasum` wu be woagblɔe ko. `sha256sum`  zazã `shasum -a 256 -c --ignore-missing SHA256SUMS`MacOS mele axa sia ŋlɔla si o, eyata woŋlɔa se ma le Apple ƒe dɔwɔnuwo me tsɔ wu be woaƒoe. Ne èkpɔe le macOS dzi la, taflatse ʋu PR aɖe nàtsɔ aɖo kpe edzi alo aɖɔlii.

### Afɔ 3  Kpɔ Sigstore ƒe nubabla la dzi

Sigstore tsɔ nu si me agbe didi le la ɖɔli kple esi ƒe agbenɔƒe nɔa kpuie eye wòdo ƒome kple ame aɖe, siwo dzi wolé ŋku ɖo. Ame aɖeke mekpɔa mɔ be woafi woƒe safui o.

Mɔ si dzi woato awɔ dɔe tẽ la zãa mɔ sia. `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Wo ame evea siaa. `--certificate-*` flags nye nu vevitɔ. ** Ne womeli o la, ɖeko nèɖo kpe edzi be ame aɖe si le afi aɖe da asi ɖe nyatakaka sia dzi.** Woƒe zazã na nèle eɖem fiae be dɔwɔɖoɖo aɖe si nɔ Zebra ƒe nudzraɖoƒe mee te agbalẽa ɖo eye GitHub OIDC ŋlɔla aɖee to eme hafi de asi ete.

> ️ ** Version matters.** Xexlẽ ƒe ɖoɖo xoxowo mate ŋu axlẽ Sigstore bundle format si li fifia o. Etsɔ cosign na xlẽa esiwo le etame la `v2.4.1` enana be:
>
> ```
> Vodada: nuƒlegbalẽvi mele mɔ̃a me o, taflatse na nyatakaka si le amewo katã gbɔ la mí.
> ```
>
> Ðaseɖigbalẽ aɖe le *aƒletɔ* la me  ele ete. `verificationMaterial.certificate.rawBytes`, si nye xoxowo me la mele wo dim o. Esia enye client ƒe seɖoƒe, menye ɖeɖekoe le eme o. Ne èdo edzi la, ɖo cosign dzi tsɔ wu be nàƒo nya ta be downloada gblẽ. Cosign siwo wotsɔna dea asi na amewo zi geɖe nɔa megbe ŋutɔ ne wole nu dem tso eŋu.

Afɔ eve siwo kplɔe ɖo la fia alesi woada gbe ɖe nu ɖeka ma ke dzi kple asi, si nyo be woa se le nusianu me  eye enye mɔ nyui aɖe ne wò cosign ƒe wɔwɔme mewɔ dɔ o.

### Afɔ 4  Xlẽ nu si tututu wogblɔ le ɖaseɖigbalẽa me.

Àte ŋu adzro nu siwo le eme la me kpɔna evɔ màtsɔ ɖeke kpe ɖe eŋu o. `cosign`, si nyo na gɔmesese nusi dzi nèle ŋu ɖom ɖo. Ʋu ɖaseɖigbalẽa:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Zebra v6.3.0 ƒe dɔwɔwɔ ŋutɔŋutɔ:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Subject Alternative Name nye ŋkɔ. Eyɔa nuɖanuƒe, dɔwɔmɔnu ƒe nuŋlɔɖi kple dzesi la be Sigstore dea asi bubu me meta datawo ŋu le ɖoɖo bubuwo dzi:

| Gbadzaƒe | Asixɔxɔ na v6.3.0 |
|---|---|
| OIDC ƒe nudzɔla | `https://token.actions.githubusercontent.com` |
| Dzɔtsoƒe ƒe nudzraɖoƒe | `https://github.com/ZcashFoundation/zebra` |
| Tu commit ɖo | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Duƒula ƒe nɔnɔme | `github-hosted` |
| Dɔwɔwɔ ƒe ɖoɖo ƒe duƒuƒu | `.../actions/runs/31424510487/attempts/1` |
| Nudzraɖoƒe ƒe dzedzeme | `public` |

Wo dometɔ ɖesiaɖe ate ŋu adzro. Ele be commit hash la nasɔ kple tag si le nudzraɖoƒe; ele be workflow ƒe dɔwɔwɔ nanɔ anyi eye wòanye dutoƒo tɔ.

### Afɔɖeɖe 5  Wɔ dzesi si dzi woŋlɔ nu ɖo la ŋuti numekuku le mɔ aɖe nu.

Àte ŋu azã OpenSSL atsɔ aɖɔ asii:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Nuwɔna ŋutɔŋutɔ:

```
Verified OK
```

Eŋlɔa nusi wòɖo asii hã ɖe agbalẽvi la me. Kae be eɖi mia gbɔ nyatakakawo:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Afɔɖeɖe 6  Nu siwo woŋlɔ ɖe agbalẽ si me nyawo le la ŋuti kɔna nyuie

Rekor ƒe nuŋlɔɖi aɖe le nubabla la me si ɖo kpe edzi be woɖe asi le agbalẽa ŋu ɖe dutoƒo, eye eƒe akpa aɖewo koe nye:

| Gbadzaƒe | Asixᴐxᴐ |
|---|---|
| Rekor log index ƒe xexlẽdzesi | `2412071838` |
| Nusiwo woŋlɔ ƒe ƒomevi | `hashedrekord v0.0.1` |
| Wowɔ ɖeka le | 2026-08-10 19:43:09 UTC ƒe ɣeyiɣia me |

Esiae na be woate ŋu akpɔ nusi nye tofloko ƒe ŋudɔwɔwɔ nyuie. Ŋlɔɖesi si medzɔ kpɔ le nuŋlɔɖi me o, alo eɖe eɖokui fia le ɣeyiɣi manyatalenu aɖe dzi la enye dzesi si ta wòle be woawɔ nu ɖo. Tsɔ ɖekawɔwɔa kple ɖeviawo ɖeɖefia sɔ kplii.

> **Nɔnɔme le OpenSSL mɔa dzi:** eɖea dzesi si nye ɖaseɖigbalẽ ƒe kpeɖeŋutɔ, gake eya ŋutɔ meɖoa asi ɖe ɖaseɖimenuwo ŋu be woado Sigstore tɔ o alo kpɔa nuŋlɔɖi siwo ku ɖe agbalẽawo ŋuti la hã gbɔ. `cosign verify-blob` wɔa etɔ̃awo katã. Zã OpenSSL nàse alesi wowɔa dɔe gɔme; zã `cosign` wò ga si nèxɔ la.

---

## Akpa 2  Zallet: GPG ƒe asinuŋɔŋlɔwo

Zallet ɖea ga bubu aɖewo ɖe go:

| Nunɔamese | Taɖodzi |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | nudzraɖoƒe si me nu eve le |
| `.tar.gz.asc` | GPG ƒe asidede agbalẽ te si woɖe ɖa |
| `.tar.gz.intoto.jsonl` | SLSA ƒe afisi wòtso ƒe ɖaseɖiɖi |
| `.tar.gz.provenance.json` | afisi wotso ƒe metadata |
| `.tar.gz.sbom.spdx` | kɔmpiutadziɖoɖowo ƒe agbalẽ si ku ɖe nuwo ŋu |

### Afɔɖeɖe 1  Nya nu si tututu nèdi be yeatsɔ adzra ɖo hafi nàyi aɖadie

Ʋu nuɖuxɔ la * gbã*, ne mèhe nyaʋi aɖeke o:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nuwɔna ŋutɔŋutɔ:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Menye vodadae wònye o. Efiaa wò be asinuŋɔŋlɔ aɖe li eye eyɔa safui si tututu nèhiã hafi nàdze egɔme dia nu la na wò. De dzesi asibidɛ kple amesi ŋlɔ agbalẽae, emegbe xɔ safua le afisi ŋu nyatakakaawo mele o.

> `gpg` prints time stamps le miaƒe nutoa me ƒe game dzi. Eʋe si dze la fiaa nu siwo nèŋlɔ ɖi be nàxlẽ kple gbe bubuwoe `WAT` (UTC+1); ŋkɔ ma ke xlẽna be: `18:18:44 UTC` le teƒe bubu. Ɣeyiɣi ma ke mee wòdzɔnae ɖo. Mègabu ɣeyiɣi ƒe vovototo be enye nusi mesɔ o.

### Afɔ 2  Ʋu nu vevi la eye nàkpɔe ɖa be ele eme hã.

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nuwɔna ŋutɔŋutɔ:

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

`Good signature` Nu eve aɖewo le nya siwo wogblɔ la me si nana amewo tɔtɔna, eye wo ame evea siaa sɔ.

### Nu si tae asibidɛ ƒe dzesi mesɔ kple esi le boblododoa me o la ŋuti nya aɖe li.

ZODL ƒe safuiwo tɔtrɔ ŋuti nyafiagbalẽa yɔ asibidɛ dzidzeƒe be Fingerprint (asibidenu) `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`Gake . `gpg --verify` woƒo nu tso eŋu na mí. `1FE9 9324 …  23F0 617F`Edze abe ɖe womesɔ o ene gake mele nenema o.

`gpg` Etsɔ **aɖakavi** si na wowɔ asinuŋɔŋlɔ la. Nyatakakaa yɔna ame siwo nye **aƒakavi gbãtɔ.* Wò ŋutɔ kpɔ ƒomedodo sia:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Nuwɔna ŋutɔŋutɔ:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Ŋkɔa enye: `sub` line nye asitelefon ƒe dzesi; the `pub` line nye primary. Ŋutinya ɖeka, key package ɖeka. Esia tae verification output prints **both** fingerprints  compare the *primary* against any published announcement, eye wobua subkey line be enye nusi fiaa wò afisi ke la ƒe akpa aɖe wɔ dɔ le.

Ne ame aɖe ɖe asi le safuiwo ŋu alea la, eɖea tame: woate ŋu atrɔa asifɔvi si dzi woade dzesi ɖo alo agblẽe evɔ womagatsɔ woƒe ŋkɔ kple kakaɖedzi aƒu gbe o.

### Nu ka gɔ̃e nye esia? `[unknown]` Nuxlɔ̃ame ƒe mɔnuwo:

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Menye asinuŋɔŋlɔa ƒe kuxie o. Asinuŋusẽ si le eme la nye esi ŋu gɔmesese nyui aɖe nɔna  ema tae míeyia edzi nɔa asi trɔm ɖe eŋu ɖo `Good signature` Nuxlɔ̃ame la gblɔ nya bubu: mègblɔ na wò GnuPG si le afima be yexɔe se be amesi ƒe ŋkɔ wòle lae ʋɔtrua nye o.

GnuPG ɖe nyabiase eve me:

1. **Ðe safui sia de asi agbalẽa ŋɔŋlɔ me?**  ame si ɖo eŋu ye gblɔe `Good signature`Menye amegbetɔwoe kpɔ ŋusẽ ɖe edzi o.
2. **Ðe safui sia nye ZODL tɔa?**  womegblɔ nya aɖeke le asitelefon dzi o. Àte ŋu ato asibidɛ ƒe dzesi si wotsɔ sɔ kple teƒe bubu aɖe la dzi anya ne eyae wònye hã.

Àkpɔ nuxlɔ̃ame sia le ɖaseɖigbalẽ ɖesiaɖe kloe dzi negbe ɖe nède asi na safui la tẽe ko. Mègabu esia be enye kpododonu o. **Mè** bu akɔntabubu si me mele o ŋu ne èle wo zãm kple wò mɔfianuwo alo kpeɖeŋutɔ siwo li, eye mèzãa woƒe ŋkɔwo nyuie o. `Good signature` be enye kpododonu.

### Afɔ 3  Kpɔe ɖa be ɖe wòle klalo ŋutɔ hã.

Zcash ƒe asiɖeɖe ɖe agbalẽwo dzi ʋu tso Electric Coin Company yi Zcash Open Development Lab le 2026, esi woɖo ZODL le January 2026 me to ECC-dɔwɔƒe si nye mɔ̃ɖaŋudɔ kple nuwo ŋuti dɔwɔha tsã la gbɔ.

| | Safui xoxo aɖe | Safui yeye |
|---|---|---|
| Asibidɛ ƒe dzesi | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Aƒetɔ ƒe Asidede Asi ƒe Safui (ECC) `<sysadmin@z.cash>` | Zcash Ŋgɔyidɔwo ƒe Dɔwɔƒe si Woʋu (ZODL) `<sysadmin@zodl.com>` |
| Ƒomevi | RSA 3072-bit, wowɔ le 2023-06-19 | RSA 4096-bit, si wowɔ le 2026-03-23, awu enu le 2028-03-22 |
| Wotae le | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Ɣeyiɣi si me wota agbalẽa: Wowɔ safui yeye le 2026-03-23, woɖe gbeƒãe le 20 26-03-27, wole asi kpem ɖe eŋu tso ƒe 2026-04-23 dzi, eye woɖo be woaɖɔli ECC safui xoxo la le 6/23-2026.

Ne ame aɖe gblɔ be yeate ŋu aɖo kpe edzi le nyatakakadzraɖoƒe si dzi wòŋlɔa nu ɖo la, ekema eya ŋutɔ ƒe ŋkɔ koe wòle be woaɖo kpee. Nuŋɔŋlɔ nyuitɔ nye nyagbe **si me saɖaga eveawo katã ŋlɔe ɖi**; ale be ʋɔtrua xoxo naxɔ ɖe yeyea ta. ZODL ka nya sia tututu:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Nusiwo dzɔ ŋutɔŋutɔ (si le kpuie  asiɖeɖe eve ɖe agbalẽ ɖeka dzi):

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

Evelia. `Good signature` ne èka ɖe ECC-ƒle le ɖoɖo xoxoa me dzi la, ekema fifia woagaɖo ŋu ɖe ZODL ƒle ŋuti eye màgahiã be nàxɔ edzi ase o. `zodl.com`, `apt.z.cash`, alo forum ƒe nuŋɔŋlɔ. Esia nye nɔnɔme si wòle be nàdi ɣesiaɣi si dɔ aɖe trɔ asi le safuiwo ŋu  eye wòhiã be woabia nya tso eŋu ne mele afi ma o la ŋuti.

### Afi kae nàkpɔ safui le  eye afi ka màgate ŋu akpɔe o?

Woɖo wo ɖe hatsotso si nyo wu la me:

1. **Nya si me nyawo wotsɔ asi ɖo le nyatia ƒe gbãtɔa te** abe alesi wòdze le etame ene. Ne wotrɔe la, enye esi sesẽ wu.
2. **Aƒe si le vovo na download la.** Binary tso GitHub; key tso `apt.z.cash`Ehiã be nu eve siawo siaa nanɔ ame si dze mía dzi la ŋu.
3. **Aƒetrɔdzrala, si wotafa kple asibidɛ aɖe.** Ame sia ame ate ŋu adaa mɔ̃vi ɖe akpa gãtɔ dzi be yeate ŋu anya amesi wònye. Asibidenu tsɔtsɔ sɔnae nana esia nɔa dedie  menye asitelefon la o.
4. **Agbalẽa ƒe axa si nye evelia tɔ.** Kakaɖedzi aɖeke meli o. Ame sia ame si ate ŋu aɖɔli ɖeka la, ate ŋu atrɔ asi le evelia hã ŋu.

Tsɔa asibidɛ ƒe dzesi blibo la sɔ kple gbãtɔ si le eme. Aʋawɔnuvi kpuiwo nye esiwo ŋu woate ŋu awɔ avu ɖo bɔbɔe eye wozã wo tsɔ wɔ amedzidzedze ŋutɔŋutɔ hãe.

## Akpa 3  Womewɔ Numekuku Nyuie O

Ne ènya alesi vodada le la, ekema ko hafi wòɖea vi. Esia enye esi dzɔ ŋutɔŋutɔ to nulɔ̃ŋkɔ ɖeka ƒe kpeɖeɖe ɖe nuŋlɔɖi si ŋu kakaɖedzi le me:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Nuwɔna ŋutɔŋutɔ:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Ʋuʋu ƒe dzesi: `1`.

Tsɔa nuŋɔŋlɔ eveawo ɖe wo nɔewo xa:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

One byte appended to a 66,992,676-byte file. The two hashes share nothing — not a prefix, not a pattern. There is no partial match and no "close enough": a checksum either matches exactly or the file is not the file you wanted.

### Nu kae wòle be nàwɔ ne esia dzɔ?

1. **Mègawɔ binary la o.** Mègatsɔe ɖe eme, mègazãnɛ le mɔ bubu aɖeke nu o. `chmod +x` it.
2. **Tsɔe kpɔ ake le nyatakakadzraɖoƒe si dzi woɖe wo ɖo la.** Nusiwo gblẽna wue nye download siwo ŋu wotrɔ asi le.
3. **Ne edzɔ be megadzɔe o la, trɔ kadodoa ƒe mɔ.** Kadodo bubu alo VPN. Ne èdze agbagba gake wògbe edzi le Internet dzi ko la, ke ɖeko nàtrɔ asi le eŋu ne mèwɔe nenema o.
4. ** Ka ɖe edzi be checksum file si sɔ na version nyuitɔ le asiwò. ** Ne ètsɔ v6.3.0 kple v6.2.3 ƒe xexlẽdzesiwo asɔ la, àdo kpo nu nyuie.
5. **Ne egagbe kokoko la, gblɔe.** Ʋu nya aɖe le ɖoɖowɔƒea ƒe nudzraɖoƒe alo zã dedienɔnɔ ŋuti kadodo si le afi sia. `SECURITY.md` ne èbu be ɖe wowɔe le susu me la, kpɔ agbalẽ si nye "Agbadzedzewo" ƒe axa 12 lia. [Zcash Ecosystem Security (Zakawo ƒe Habɔbɔa Ƒe Dedienɔnɔ)](/zcash-community/zcash-ecosystem-security) axa si dzi woato ana amewo nanya nu tso eŋu.
6. ** Miɖe nuwɔwɔa.** Nuŋlɔɖi si wotsɔ ɖe ame ŋu la nye kpeɖodzi. Mègaɖee ɖa hafi nàtsɔe ayi na ʋɔnudrɔ̃lawo o.

A signature failure is more serious than a checksum failure. A checksum mismatch is usually corruption; a valid-file-but-bad-signature is not something that happens by accident.

---

## Akpa 4  Numedzodzro ƒe nuŋlɔɖi

| Dɔwɔna | Nusiwo woɖe ɖe go siwo wota le | Nuwɔmɔnu | Afisi safuia tso |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore ƒe agbalẽdzraɖoƒe | Safui aɖeke meli o — CI ƒe dzesidenu to GitHub OIDC dzi |
| **Zallet** | `github.com/zcash/zallet/releases` | GPG si woɖe ɖe vovo `.asc`, SLSA ƒe dzɔtsoƒe, SBOM | `apt.z.cash/zodl.asc` - gɔmedzeƒe `0338 34DD…58E2 6AB1`, asidede subkey dzi `1FE9 9324…23F0 617F` |
| **zcashd** | *xɔ dzudzɔ* | — | Wotɔ ɖe block 3,417,100 dzi le 2026-07-18 dzi. Mègaɖoe ɖe wò kɔmpiuta dzi o. |
| **Zodl** (si woyɔna tsã be Zashi) | Dɔdamɔnudzraƒe / Google Play; `zodl-inc` le GitHub dzi | Fiasewo ƒe asidede agbalẽ te; standalone Android binaries GPG-de asi ete | ZODL safui ɖe tɔtrɔ ƒe nyagbɔgblɔ ɖesiaɖe me |

> **Name note:** Zashi was rebranded to **Zodl** in 2026  first on the App Store, then on Google Play. Kpekpeɖeŋu xoxo siwo ku ɖe "Zashi" ŋu la ɖɔ gaɖaka ƒe dzidzime ɖeka ma ke.

---

## Akpa 5  Asitelefon kple asinudɔwɔƒe ƒe gaɖɔɖonuwo

Ne èɖe mɔ be woadoe ɖe Internet dzi tẽ la, ale si nèdzea agbagba ɖoa kpe edzii ya ato vovo.

**App stores.** You cannot check a signature yourself. The store signs the package and you are trusting the store's review and the developer account's integrity. What you *can* verify is that you have the right app: confirm the publisher name and the package identifier against the project's official site, not against search results. Impersonation apps are common, and a store listing is not evidence of authenticity.

**Standalone Android APKs.** Woateŋu *aɖo kpe edzi. ZODL taa GPG-signed standalone Android binaries to GitHub Releases dzi, eyata Part 2 workflow la wɔa dɔe. Tia mɔ sia ne èdi be woaɖɔli nu siwo le eme ɖo.

**Hardware wallets.** Ðɔkta la ɖoa kpe eƒe firmware dzi, eyata nu si ŋu kakaɖedzi le ye nye hardwarea ke menye wò kɔmpiuta ƒe nuŋlɔɖi o. Kpɔe ɖe: [Keystone Zashi (Keystone Zashi)](/guides/keystone-zashi)  Woƒlea nu le dɔwɔƒe si wɔa mɔ̃a ŋu tẽe.  Wodzraa nuwo ƒe amesinɔnɔ me ɖo tso asitsadɔwɔƒea va se ɖe nudzrala dzi.

---

## Nu bubu siwo nàxlẽ le afi sia

- [Zcash Ecosystem Security (Zakawo ƒe Habɔbɔa Ƒe Dedienɔnɔ)](/zcash-community/zcash-ecosystem-security)  Nyatakakawo ɖeɖe ɖe go kple dedienɔnɔ ŋuti kadodoawo
- [Zebra ƒe Dzogoe Blibo la](/zcash-tech/zebra-full-node)  Zebra ƒe ɖoɖowɔɖi le eƒe dzigbɔdzedze megbe
- [Zallet Ŋgɔdzesidenu Kpatawo](/using-zcash/zallet-quick-reference-guide)  ne èzãa Zallet
- [Sigstore ƒe agbalẽwo](https://docs.sigstore.dev/)
- [SLSA ƒe afi si wotso la dzi ɖe edzi](https://slsa.dev/)

---

*Wotsɔ sedede siwo le axa sia wɔ dɔe ɖe Zebra ŋu. `v6.3.0` kple Zallet, `v0.1.0-beta.2` le 2026-08-18. Release tooling changes: ne output to vovo na esi woɖe fiae la, ke ɖo ŋu ɖe wò ŋutɔ ƒe agbagbadzedzewo dzi eye taflatse ʋu PR.*
