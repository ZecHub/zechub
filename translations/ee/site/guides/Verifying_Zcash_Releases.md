<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash ƒe Asiɖeɖe le eŋu ƒe kpeɖodzinana

## TL;DR

- Zcash binary ƒe kɔpi wɔwɔ mesɔ kple esi dɔa ta la xɔxɔ o. Kpeɖodzinyae nye alesi nèdea dzesi vovototoa.
- Checksum ɖo kpe edzi be faɛl la va ɖo nyuie. **asidede agbalẽ te** ɖoa kpe amesi wɔe dzi. Èhiã evea siaa, eye checksum le eɖokui si meɖoa kpe edzi boo o.
- Zebra taa a `SHA256SUMS` file kpe ɖe **Sigstore** bundle si blaa asiɖeɖe le eŋu ɖe GitHub Actions dɔwɔwɔ ƒe ɖoɖo tɔxɛ aɖe ŋu, tag kple commit — safuidzikpɔkpɔ mehiã o.
- Zallet taa **GPG** ƒe asidede agbalẽ te siwo woɖe ɖe vovo (`.asc`) kpe ɖe SLSA ƒe dzɔtsoƒe kple SBOM aɖe ŋu.
- Zcash ƒe asidede agbalẽ te ƒe safuia trɔ le ƒe 2026 me tso Electric Coin Company gbɔ va zu Zcash Open Development Lab (ZODL). Ne èɖo kpe xoxo siwo woɖe ɖe go dzi la, èhiã safui yeyea — eye safui eveawo de asi asitɔtrɔ ƒe nyagbɔgblɔa te, ale be nàte ŋu aɖo kpe tɔtrɔa ŋutɔ dzi.
- `gpg` ka nya ta tso **safui sue** si de asi faɛl te ŋu, ke menye safui gbãtɔ si ŋkɔ woyɔ le gbeƒãɖeɖewo me o. Zi geɖe la, asibidɛ si dzena abe ɖe mesɔ o ene nyea safui sue aɖe, ke menye amedzidzedze o.
- Ne kpeɖodzinana do kpo nu la, mègawɔ binary la o.

*Woɖo kpe edzi ɖe Zebra ŋu `v6.3.0` kple Zallet `v0.1.0-beta.2` on 2026-08-18.*

## Nusita esia le vevie wu na Zcash

Gakotoku ƒe binary si ŋu wotrɔ asi le ate ŋu aɖe gazazã ƒe safui alo nukpɔkpɔ ƒe safui aɖe ɖa. To vovo na nyagbe ɣaɣla si wogblẽ la, nu ma si bu la nɔa anyi ɖaa: womegagbugbɔa ga le eme o, womexɔa ga le eme o eye womexɔa kpekpeɖeŋunaƒe aɖeke o. Asitsatsa siwo wokpɔ ta na kpɔa nusi dzɔna *le kɔsɔkɔsɔ dzi* ta — womenaa ametakpɔkpɔ aɖeke kura ne woɖɔli kɔmpiutadziɖoɖo si zãm nèle hafi wòva ɖo gbɔwò gbeɖe o.

Esia nye amedzidzedzemɔ ʋɛ siwo dzi ɖoɖowɔɖia ƒe ameŋunyatakakawo ŋuti kakaɖedziwo meku ɖe nya aɖeke ŋu o la dometɔ ɖeka. Kpeɖodzi nye ƒuƒoƒo si tsyɔ edzi.

## Afɔku ƒe kpɔɖeŋu — nusi kpeɖodzinana wɔna eye melénɛ o

**Nulélawo:**

- Ahuhɔ̃e si ŋu wotrɔ asi le alo faɛl si ŋu wotrɔ asi le si wotsɔ tso teƒe bubu si menye dɔa ƒe axa si woɖe ɖe go o.
- Ŋutsu si le titina ƒe asitɔtrɔ le eƒe kɔpiwɔwɔ me.
- CDN si woda le afɔku me alo mama host si woxɔ le amewo si.
- Nufitifitiwɔwɔ le vo me le mɔzɔzɔ me.

**Meléa:**

- Dzadzraɖola si dea asi kɔpi vɔ̃ɖiwo te. Asidede agbalẽ te la aɖo kpe edzi nyuie; eɖoa kpe dzɔtsoƒe dzi, ke menye tameɖoɖo o.
- A compromised build host si le asidede agbalẽ te-gake-vɔ̃ɖitɔ ƒe asinudɔwɔwɔ wɔm. Esiae nye nusi xɔtu siwo woate ŋu agbugbɔ awɔ kple afisi wotso ɖaseɖiɖiwo li be woatsɔ axe mɔ ɖe enu.
- Safui si nèxɔ tso dzɔtsoƒe si woɖe mɔ na la ke si me binary la le. Ne amedzidzela aɖe kpɔ ŋusẽ ɖe faɛl la kple safui si dzi nèlé ŋku ɖo siaa dzi la, kpeɖodzinana megblɔa naneke na wò o.

Nya mamlɛtɔ mae nye esi mɔfiala akpa gãtɔ tia kpo. **Afisi nàkpɔ safuia le le vevie abe sededea ƒe duƒuƒu ene.**

---

## Akpa 1 — Zebra: checksums kple Sigstore

Zebra taa nunɔamesi siawo na ɖesiaɖe si woɖe ɖe go:

| Nunɔamesi | Taɖodzinu |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | binary nudzraɖoƒea |
| `zebrad-<version>-<arch>.tar.gz.sha256` | ɖesiaɖe ƒe faɛl ƒe ɖaseɖigbalẽ |
| `SHA256SUMS` | checksums na xɔtuɖaŋuwo katã |
| `SHA256SUMS.sigstore.json` | Sigstore bundle ƒe asidede agbalẽ te `SHA256SUMS` |

### Afɔɖeɖe 1 — Wɔ eƒe kɔpi

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Afɔɖeɖe 2 — Kpɔ checksum la ɖa

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Nusiwo dona tso eme ŋutɔŋutɔ:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` wobia tso esi le afisia elabena `SHA256SUMS` ƒo nu tso xɔtuɖaŋu ɖesiaɖe ŋu eye ɖeka koe nèɖe. Eya manɔmee la, . `sha256sum` ka nya ta tso aarch64 ƒe nudzraɖoƒe si mele afima o ŋu be edo kpo nu eye àte ŋu axlẽ mɔɖeɖe aɖe vodadatɔe be edo kpo nu.

Fail ɖesiaɖe ƒe vovototo hã wɔa dɔ:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Afɔɖeɖe sia ɖeɖe mesɔ gbɔ o.** Èɖe checksum la tso teƒe ɖeka si binary la le. Ame sia ame si ate ŋu aɖɔli ɖeka ate ŋu aɖɔli evelia. Checksum la ɖo kpe fɔmaɖimaɖi dzi; afɔɖeɖe si kplɔe ɖo ɖo kpe afisi wòtso dzi.

### Afɔɖeɖe 2b — Dzesidede ma ke le Windows dzi

PowerShell mekpɔ naneke o `-c` verify mode, ale be nàtsɔ asi asɔ kple wo nɔewo:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Nusiwo dona tso eme ŋutɔŋutɔ:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Tsɔ ema sɔ kple Linux ƒe emetsonu si do ŋgɔ le axa sia dzi:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Asixɔxɔ siwo sɔ.** Hex metsɔa nya aɖeke ɖe asi o, eye esiae nye alakpa ɣlidodo ɖeka kolia si bɔ wu le Windows dzi.

Mɔ̃ eve bubu siwo wozãna na Windows koŋ:

- **Dodoƒe ƒe kɔda aɖeke meli woalé ŋku ɖe eŋu o.** Le Linux dzi la, . `sha256sum -c` trɔa 1 ɖe kpododonu dzi eye ŋɔŋlɔdzesi ate ŋu awɔ nu ɖe ​​edzi. `Get-FileHash` only prints a hash — tsɔtsɔ sɔ kple wo nɔewo nye tɔwò be nàwɔ, eye tɔwò be nàwɔ vodada to skimming me.
- **Hex ŋɔŋlɔdzesi 64 xexlẽ to ŋku dzi nye nusi dzi womate ŋu aka ɖo o.** Na shell la nawɔe:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Le macOS:** dɔwɔwɔ ƒe ɖoɖoa le ɖeka, gake BSD userland meliwo `shasum` tsɔ wu be woawɔe `sha256sum` - zã `shasum -a 256 -c --ignore-missing SHA256SUMS`. MacOS mɔ̃ aɖeke menɔ axa sia ŋlɔla si o, eyata woŋlɔa sedede ma tso Apple ƒe dɔwɔnuwo me tsɔ wu be woawɔe. Ne èɖo kpe edzi le macOS dzi la, taflatse ʋu PR si ɖo kpe edzi alo ɖɔe ɖo.

### Afɔɖeɖe 3 — Kpɔ Sigstore ƒe babla la ɖa

Sigstore tsɔa ɖaseɖigbalẽ siwo nɔa anyi didi siwo wobla ɖe CI ƒe dzesidenu ŋu, siwo woŋlɔ ɖe dutoƒonukpɔkpɔ ƒe nuŋlɔɖi me la ɖɔlia asidede safui siwo nɔa anyi didi. Ame aɖeke meléa asiɖeɖe le nu ŋu ƒe safui si woate ŋu afi o.

Mɔ dzɔdzɔe la zãa `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Ame eveawo `--certificate-*` aflagawoe nye nya bliboa. **Wo manɔmee la, ɖeko nèle kpe ɖom edzi be ame aɖe, afi aɖe de asi faɛl la te.** Woawo gbɔe nèle kpe ɖom edzi be dɔwɔwɔ ƒe ɖoɖo aɖe de asi ete le Zebra nudzraɖoƒe, si GitHub ƒe OIDC-nala ɖo kpe edzi.

> ⚠️ **Version matters.** Cosign build xoxowo mateŋu axlẽ Sigstore bundle ƒe nɔnɔme si li fifia o. Duƒuƒu le etame kple cosign `v2.4.1` wɔa:
>
> ```
> Vodada: bundle mekpɔ cert hena kpeɖodzi o, taflatse na dutoƒo safui
> ```
>
> Bundle la *does* ɖaseɖigbalẽ aɖe — enɔa ete `verificationMaterial.certificate.rawBytes`, si agbalẽ xoxo siwo woɖe ɖe go medina o. Esia nye asisiwo ƒe seɖoƒe, ke menye asiɖeɖe le eŋu si gblẽ o. Ne èƒoe la, upgrade cosign tsɔ wu be nàƒo nya ta be download la menyo o. Zi geɖe la, cosign si wobla ɖe mama ŋu la tsi megbe ŋutɔ le dzigbe gome.

Afɔɖeɖe eve siwo kplɔe ɖo fia alesi woatsɔ asi aɖo kpe babla ɖeka ma ke dzi, si gɔme sese le vevie eɖanye nuka kee dzɔ o — eye wònye fallback si wɔa dɔ ne wò cosign build mawɔ nu aduadu o.

### Afɔɖeɖe 4 — Xlẽ nusi tututu ɖaseɖigbalẽa gblɔ

Àte ŋu alé ŋku ɖe babla la ŋu manɔmee `cosign`, si ɖea vi na nusi dzi nèka ɖo la gɔmesese. Ðe ɖaseɖigbalẽa ɖa:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Nusi do tso eme ŋutɔŋutɔ na Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Nyati ƒe Ŋkɔ Bubu lae nye dzesideŋkɔa. Eyɔa nudzraɖoƒea, dɔwɔwɔ ƒe faɛl si sɔ pɛpɛpɛ, kple dzesidenua ŋkɔ. Sigstore embeds gatu metadata ɖe kekeɖenudɔ tɔxɛwo me:

| Agbledeƒe | Asixɔxɔ na v6.3.0 |
|---|---|
| OIDC ƒe nudzɔla | `https://token.actions.githubusercontent.com` |
| Dzɔtsoƒe ƒe nudzraɖoƒe | `https://github.com/ZcashFoundation/zebra` |
| Tu commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Duƒula ƒe nɔnɔme | `github-hosted` |
| Dɔwɔwɔ ƒe ɖoɖo ƒe duƒuƒu | `.../actions/runs/31424510487/attempts/1` |
| Nudzraɖoƒe ƒe dzedzeme | `public` |

Woate ŋu alé ŋku ɖe esiawo dometɔ ɖesiaɖe ŋu. Ele be commit hash la nasɔ kple tag si le nudzraɖoƒea; ele be dɔwɔwɔ ƒe duƒuƒu nanɔ anyi eye wòanye dutoƒo.

### Afɔɖeɖe 5 — Kpɔ asidede agbalẽ te dzi le nya ɣaɣlawo me

Àte ŋu aɖo kpe asidede agbalẽ te dzi tẽ kple OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Nusiwo dona tso eme ŋutɔŋutɔ:

```
Verified OK
```

Bundle la ŋlɔa digest si wòde asi hã ɖi. Kpɔ egbɔ be esɔ kple wò faɛl si le mia gbɔ:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Afɔɖeɖe 6 — Nuŋɔŋlɔ si me woɖea nu le le gaglãgbe

Rekor ƒe nuŋɔŋlɔ aɖe le babla la me si ɖo kpe edzi be wota asidede agbalẽa te ɖe dutoƒo nuŋlɔɖi aɖe si me woate ŋu atsɔe akpe ɖe eŋu ɖeɖeko me:

| Agbledeƒe | Asixɔxɔ |
|---|---|
| Rekor nuŋlɔɖi ƒe xexlẽdzesifiaƒe | `2412071838` |
| Nusiwo woŋlɔ ƒe ƒomevi | `hashedrekord v0.0.1` |
| Wowɔ ɖeka le | 2026-08-10 19:43:09 UTC |

Esiae na be woate ŋu ade dzesi safui siwo meƒoa nu le mɔ gbegblẽ nu o. Asidede agbalẽ te si medze le nuŋlɔɖia me kpɔ o, alo si dze le ɣeyiɣi si dzi womate ŋu aka ɖo o me la nye dzesi si ŋu wòle be woawɔ nu ɖo. Tsɔ ɣeyiɣi si woatsɔ awɔ ɖekae sɔ kple gbeƒãɖeɖe si woɖe ɖe go.

> **De dzesii le OpenSSL mɔ dzi:** eɖoa kpe asidede agbalẽ te dzi ɖe ɖaseɖigbalẽa ƒe dutoƒo safui nu, gake le eɖokui si meɖoa kpe ɖaseɖigbalẽ ƒe kɔsɔkɔsɔa dzi yi Sigstore ƒe ke dzi alo léa ŋku ɖe nuŋlɔɖi ƒe nuŋɔŋlɔa ƒe kpeɖodzi si wotsɔ de eme ŋu o. `cosign verify-blob` wɔa etɔ̃awo katã. Zã OpenSSL nàtsɔ ase mɔ̃a gɔme; zã `cosign` abe wò cheque ŋutɔŋutɔ ene.

---

## Akpa 2 — Zallet: GPG ƒe asidede agbalẽ te

Zallet taa nunɔamesi vovovowo ƒe hatsotso aɖe:

| Nunɔamesi | Taɖodzinu |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | binary nudzraɖoƒea |
| `.tar.gz.asc` | GPG ƒe asidede agbalẽ te si woɖe ɖa |
| `.tar.gz.intoto.jsonl` | SLSA ƒe dzɔtsoƒe ƒe ɖaseɖiɖi |
| `.tar.gz.provenance.json` | afisi wotso metadata |
| `.tar.gz.sbom.spdx` | software ƒe agbalẽ si ku ɖe nuwo ŋu |

### Afɔɖeɖe 1 — De dzesi asidede agbalẽ te ƒe safuia hafi nàyi aɖadi

Wɔ kpeɖodzia *gbã*, eye wometsɔ safui aɖeke vɛ o:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nusiwo dona tso eme ŋutɔŋutɔ:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Esia menye kpododonu o. Egblɔna na wò be asidede agbalẽ te li eye wòyɔa safui si tututu nèhiã la ŋkɔ, **hafi** nàdze didi gɔme. De dzesi asibidɛ ƒe dzesi kple amesi na safuia, emegbe nàxɔ safuia tso teƒe aɖe si le eɖokui si le kɔpiwɔwɔ me.

> `gpg` taa ɣeyiɣi ƒe dzesiwo le wò nutoa me ƒe ɣeyiɣikɔntabubu me. Nusi do tso eme le etame la ɖee fia `WAT` (UTC + 1) ƒe xexlẽme; asidede agbalẽ te ma ke xlẽ `18:18:44 UTC` le teƒe bubuwo. Enumake ma ke. Mègabu ɣeyiɣi ƒe didime ƒe vovototo be enye nusi mesɔ o.

### Afɔɖeɖe 2 — Tsɔ safuia va dukɔa me eye nàɖo kpe edzi

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Nusiwo dona tso eme ŋutɔŋutɔ:

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

`Good signature` nye nusi nèdi. Nu eve siwo le emetsonu ma me tɔtɔa amewo, eye wo ame evea siaa sɔ.

### Nusita asibidɛa mewɔ ɖeka kple gbeƒãɖeɖea o

ZODL safui ƒe tɔtrɔ nyagbɔgblɔ yɔa asibidɛ ƒe dzesi `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Gake `gpg --verify` ka nya ta `1FE9 9324 …  23F0 617F`. Ema dze abe masɔmasɔ ene eye menye nenemae o.

`gpg` ka nya ta tso **subkey** si wɔ asidede agbalẽ te ŋu. Gbeƒãɖeɖea tsɔ ŋkɔ na **safui gbãtɔ**. Wò ŋutɔ ɖo kpe ƒomedodoa dzi:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Nusiwo dona tso eme ŋutɔŋutɔ:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

The `sub` fli nye asidede agbalẽ te ƒe safui sue; the `pub` fli ye nye gbãtɔ. Dzesideŋkɔ ɖeka, safui ƒe agbalẽvi ɖeka. Esia tae ɖaseɖiɖi ƒe emetsonua taa asibidɛ **evea siaa** — tsɔ *gbãtɔ* sɔ kple gbeƒãɖeɖe ɖesiaɖe si wota, eye nàwɔ nu ɖe ​​safui sue ƒe fli ŋu abe ɖe wògblɔ safuia ƒe akpa si wɔ dɔa na wò ene.

Eɖoe koŋ ma safuiwo alea: woate ŋu atrɔ asi le safui sue si wode asi ete ŋu alo ate fli ɖe eme evɔ womatsɔ dzesideŋkɔ gbãtɔ kple kakaɖedzi si woƒo ƒu la aƒu gbe o.

### Nukae nye... `[unknown]` nuxlɔ̃ame fia

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Esia nye **menye** kuxi le asidede agbalẽ te ŋu o. Asidede agbalẽ te la nye cryptographically valid — emae nye nusi `Good signature` gblɔ be. Nuxlɔ̃amea gblɔ nya bubu: mègblɔ na wò nutoa me GnuPG be yexɔe se be safui sia nye amesi wògblɔ be enye ye tɔ o.

GnuPG ma biabia eve dome:

1. **Ðe safui sia de asi faɛl sia tea?** — answered by `Good signature`. Cryptographic, amegbetɔ ƒe ʋɔnudɔdrɔ̃ aɖeke meli o.
2. **Ðe safui sia nye ZODL tɔa?** — womeɖo eŋu to nya ɣaɣlawo me kura o. Èɖoe anyi to asibidɛ ƒe dzesi la me dzodzro le dzɔtsoƒe si le eɖokui si me.

Àkpɔ nuxlɔ̃ame sia le kpeɖodzinana ɖesiaɖe kloe me negbe ɖe nède asi safuia te tẽ le mia gbɔ hafi. Mègabui be enye kpododonu o. **Do** atike na amesi bu `Good signature` abe kpododonu ene.

### Afɔɖeɖe 3 — Kpɔe ɖa be safui ƒe tɔtrɔ ŋutɔ hã

Zcash ƒe asiɖeɖe le eŋu ƒe asidede asi ʋu tso Electric Coin Company yi Zcash Open Development Lab le ƒe 2026 me, le esi woɖo ZODL le January 2026 me to ECC ƒe mɔ̃ɖaŋudɔwɔlawo kple adzɔnuwo ƒe ƒuƒoƒo tsãtɔ dzi.

| | Safui xoxo aɖe | Safui yeye |
|---|---|---|
| Asibidɛ ƒe dzesi | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Aƒetɔ ƒe Asidede Asi ƒe Safui (ECC) . `<sysadmin@z.cash>` | Zcash ƒe Ŋgɔyidɔwo ƒe Dɔwɔƒe si Woʋu (ZODL) . `<sysadmin@zodl.com>` |
| Ƒomevi | RSA 3072-bit, wowɔ le 2023-06-19 | RSA 4096-bit, si wowɔ le 2026-03-23, wu enu le 2028-03-22 |
| Wotae le | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Ɣeyiɣikɔntabubu si wota: safui yeye si wowɔ 2026-03-23, woɖe gbeƒãe 2026-03-27, asidede agbalẽ te ɖeɖeko tso 2026-04-23, ECC safui xoxo si woɖe ɖa le ɖoɖo nu 2026-06-23.

Gbeƒãɖeɖe si woɖena ɖe amewo ƒe tɔtrɔ le nyatakakadzraɖoƒe aɖe dzi nye esi dzi woate ŋu aka ɖo abe nyatakakadzraɖoƒea ene. Mɔnu nyuitɔe nye nyagbɔgblɔ **si wotsɔ safui eveawo de asi eme kɔ nyuie**, eyata safui xoxoa ɖo kpe yeyea dzi. ZODL taa nu ma tututu:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Nusi do tso eme ŋutɔŋutɔ (woɖe kpuie — asidede agbalẽ te eve le nuŋlɔɖi ɖeka dzi):

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

Eve `Good signature` emetsonuwo le nuŋlɔɖi ɖeka dzi, tso safui xoxoa kple yeyea dzi. Ne èka ɖe ECC safuia dzi na esiwo woɖe ɖe go do ŋgɔ la, kakaɖedzi ma yia ŋgɔ azɔ yia ZODL safuia gbɔ evɔ mahiã be nàka ɖe edzi o `zodl.com`, `apt.z.cash`, alo nya aɖe si woŋlɔ ɖe nyamedzroƒe. Esia nye nunɔamesi si woadi ɣesiaɣi si dɔ aɖe trɔ safuiwo — eye eƒe anyimanɔmanɔ sɔ be woabia nu tso eŋu.

### Afisi woakpɔ safui le — kple afisi màxɔ safui le o

Woɖoe ɖe ɖoɖo nu tso nyuitɔ dzi va ɖo vɔ̃ɖitɔ dzi:

1. **Nyagbɔgblɔ si de asi na safui si do ŋgɔ**, abe alesi wòle etame ene. Tiatia sesẽtɔ kekeake le tɔtrɔ aɖe megbe.
2. **Dzɔtsoƒe si le eɖokui si tso kɔpiwɔwɔ gbɔ.** Binary la tso GitHub gbɔ; safuia tso `apt.z.cash`. Amedzidzela hiã evea siaa.
3. **A keyserver, cross-checked against a published fingerprint.** Ame sia ame ateŋu atsɔ safui si gblɔ be yenye dzesidenu ɖesiaɖe ɖe keyserver akpa gãtɔ dzi. Asibidɛ ƒe dzesi tsɔtsɔ sɔ kple wo nɔewoe nye nusi na esia le dedie — menye keyserver o.
4. **Axa ma ke kple binary la.** Kakaɖedzi aɖeke kloe meli o. Ame sia ame si ate ŋu axɔ ɖe ɖeka teƒe la ate ŋu axɔ ɖe evelia teƒe.

Tsɔ asibidɛ ƒe dzesi **blibo** sɔ kple **gbãtɔ** safuia ɣesiaɣi. Key ID kpuiwo nye esiwo woate ŋu aƒo ƒu le mɔ maɖinu nu eye wozã wo le amedzidzedze ŋutɔŋutɔwo me.

## Akpa 3 — Kpeɖodzinya si do kpo nu

Ne ènya alesi kpododonu le ko hafi kpeɖodzinana ɖea vi. Nu ŋutɔŋutɔ aɖee nye esi, si wowɔ to byte null ɖeka tsɔtsɔ kpe ɖe nudzraɖoƒe si sɔ ŋu me:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Nusiwo dona tso eme ŋutɔŋutɔ:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Dodo le eme ƒe kɔda: `1`.

Tsɔ nuɖuɖumeŋusẽ eveawo da ɖe wo nɔewo xa:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Byte ɖeka tsɔ kpe ɖe faɛl si ƒe lolome nye byte 66,992,676 ŋu. Hash eveawo ma naneke o — menye ŋgɔdonya o, menye kpɔɖeŋu aɖeke o. Akpa aɖeke mesɔ kple "close enough" o: checksum sɔ pɛpɛpɛ alo faɛl la menye faɛl si nèdi o.

### Nusi woawɔ ne esia dzɔ

1. **Mègaƒu du binary la o.** Mègaɖee o, mègaɖee o `chmod +x` it.
2. **Gadze agbagba ake tso axa si woɖe ɖe go le se nu.** Dodokpɔ akpa gãtɔ nyea kɔpi siwo wotso.
3. **Ne edo kpo nu zi evelia la, trɔ network mɔ.** Kadodo vovovo, alo VPN. Dodokpɔ si kplɔ wò ɖo le networkwo dzi la to vovo na esi mekplɔ wò ɖo o.
4. **Ðe kpe edzi be checksum faɛl nyuitɔ le asiwò na tɔtrɔ nyuitɔ.** Ne ètsɔ v6.3.0 sɔ kple v6.2.3 sums la, ado kpo nu nyuie.
5. **Ne egado kpo nu kokoko la, gblɔe.** Ʋu nya aɖe le dɔa ƒe nudzraɖoƒe, alo zã dedienɔnɔ ƒe kadodoa le `SECURITY.md` elabena nusianu si nèsusu be eɖoe koŋ wɔe. Kpɔ nya si [Zcash Nutoa Me Dzɔdzɔmenuwo ƒe Dedienɔnɔ](/zcash-community/zcash-ecosystem-security) axa si dzi woato aɖe nyatakakawo afia.
6. **Keep the artifact.** Binary si ŋu wotrɔ asi le nye kpeɖodzi. Mègatutui hafi agblɔe o.

Asidede agbalẽ te ƒe kpododonu nu sẽ wu checksum ƒe kpododonu. Zi geɖe la, checksum ƒe masɔmasɔ nyea nufitifitiwɔwɔ; faɛl-si sɔ-gake-asidede-vɔ̃ɖi menye nusi dzɔna le vo me o.

---

## Akpa 4 — Nufiame kplɔ̃

| Dɔwɔwɔ | Nusiwo woɖe ɖe go siwo wota le | Mɔnu | Afisi safuia tso |
|---|---|---|---|
| **Zebra** ƒe ƒuƒoƒo | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore ƒe agbalẽdzraɖoƒe | Safui aɖeke meli o — CI ƒe dzeside to GitHub OIDC |
| **Zallet** ƒe ƒuƒoƒo | `github.com/zcash/zallet/releases` | GPG si woɖe ɖe vovo `.asc`, SLSA ƒe dzɔtsoƒe, SBOM | `apt.z.cash/zodl.asc` - gɔmedzeƒe `0338 34DD…58E2 6AB1`, asidede subkey dzi `1FE9 9324…23F0 617F` |
| **zcashd** ƒe ƒuƒoƒo | *dzudzɔxɔxɔledɔme* | — | Wotɔ ɖe block 3,417,100 dzi le 2026-07-18 dzi. Mègaɖoe ɖe wò kɔmpiuta dzi o. |
| **Zodl** (si woyɔna tsã be Zashi) | Dɔdamɔnudzraƒe / Google Play; `zodl-inc` le GitHub dzi | Fiasewo ƒe asidede agbalẽ te; standalone Android binaries GPG-de asi ete | ZODL safui ɖe tɔtrɔ ƒe nyagbɔgblɔ ɖesiaɖe me |

> **Ŋkɔyɔyɔ ƒe nuŋlɔɖi:** Wotrɔ Zashi ƒe ŋkɔ wòzu **Zodl** le ƒe 2026 me — gbã le App Store, emegbe le Google Play. Mɔfiala xoxo siwo ƒo nu tso "Zashi" ŋu la ɖɔ gakotoku ƒe dzidzime ma ke.

---

## Akpa 5 — Asitelefon kple xɔtunuwo ƒe gakotokuwo

Kpeɖodzinana wɔa dɔ le mɔ bubu nu ne ènya gblẽ nu siwo woɖe ɖe go tẽ ko.

**App stores.** Wò ŋutɔ màte ŋu alé ŋku ɖe asidede agbalẽ te ŋu o. Fiasea dea asi agbalẽvia te eye nèle kakaɖedzi le fiasea ƒe ŋkuléle ɖe eŋu kple dɔwɔƒea ƒe akɔnta ƒe blibonyenye ŋu. Nusi *ate ŋu* aɖo kpe edzi enye be dɔwɔnu nyuitɔ le asiwò: ɖo kpe gbeƒãɖela ƒe ŋkɔ kple agbalẽvi ƒe dzesi dzi ɖe dɔa ƒe nyatakakadzraɖoƒe si dziɖuɖua da asi ɖo dzi, ke menye ɖe numekuku me tsonu ŋu o. Ameɖokuiwɔwɔ ƒe dɔwɔnuwo bɔ, eye fiase me ŋkɔwo ƒe ŋkɔwo menye kpeɖodzi be wonye nyateƒe o.

**Standalone Android APKs.** Esiawo *ate ŋu * aɖo kpe edzi. ZODL taa Android binaries siwo le wo ɖokui si siwo GPG-de asi ete to GitHub Releases dzi, eyata Akpa 2 ƒe dɔwɔwɔ ƒe ɖoɖoa wɔa dɔ. Di mɔ sia ne èdi kɔsɔkɔsɔ si woate ŋu akpɔ.

**Hardware wallets.** Mɔ̃a ɖoa kpe eya ŋutɔ ƒe firmware dzi, eyata kakaɖedzi ƒe sekea nye hardware la, ke menye file si le wò mɔ̃a dzi o. Kpɔ [Keystone Zashi ƒe kpe](/guides/keystone-zashi) na mɔ̃a ƒe kpeɖodzi ƒe sisi. Ƒle tẽ tso ewɔla gbɔ — nuzazãwo ƒe kɔsɔkɔsɔ ƒe asitɔtrɔ dzɔna le dɔwɔƒe kple nuƒlela dome.

---

## Nuxexlẽ bubuwo

- [Zcash Nutoa me ƒe Dedienɔnɔ](/zcash-community/zcash-ecosystem-security) — nyatakakawo ɖeɖe ɖe go ƒe ɖoɖo kple dedienɔnɔ ƒe kadodowo
- [Zebra ƒe Node Bliboe](/zcash-tech/zebra-full-node) — Zebra dede eme ne èɖo kpe edzi vɔ
- [Zallet ƒe Mɔfiame Kabakaba](/using-zcash/zallet-quick-reference-guide) — Zallet zazã
- [Sigstore ƒe nuŋlɔɖiwo](https://docs.sigstore.dev/)
- [SLSA ƒe dzɔtsoƒe ƒe dzidzenuwo](https://slsa.dev/)

---

*Wowɔ sedede siwo le axa sia dzi la ɖe Zebra ŋu `v6.3.0` kple Zallet `v0.1.0-beta.2` le ƒe 2026-08-18 dzi. Release tooling changes: ne output to vovo tso esi woɖe fia le afisia gbɔ la, ka ɖe wò ŋutɔ wò duƒuƒu dzi eye taflatse ʋu PR.*
