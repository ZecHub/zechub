<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verifizierung von Zcash-Releases

## TL;DR

- Das Herunterladen einer Zcash-Binärdatei ist nicht dasselbe, wie die zu erhalten, die das Projekt veröffentlicht hat. Mit der Verifizierung erkennt man den Unterschied.
- Eine Prüfsumme beweist, dass die Datei unversehrt angekommen ist. Eine **Signatur** beweist, wer sie erstellt hat. Man braucht beides, und eine Prüfsumme allein beweist nur sehr wenig.
- Zebra veröffentlicht eine `SHA256SUMS`-Datei plus ein **Sigstore**-Bundle, das das Release an einen bestimmten GitHub-Actions-Workflow, Tag und Commit bindet — ohne Schlüsselverwaltung.
- Zallet veröffentlicht getrennte **GPG**-Signaturen (`.asc`) zusammen mit SLSA-Provenienz und einer SBOM.
- Der Zcash-Signaturschlüssel wurde 2026 von Electric Coin Company zu Zcash Open Development Lab (ZODL) gewechselt. Wenn du ältere Releases verifiziert hast, brauchst du den neuen Schlüssel — und die Übergabeerklärung ist mit beiden Schlüsseln signiert, sodass du die Rotation selbst verifizieren kannst.
- `gpg` meldet den **Unterschlüssel**, der eine Datei signiert hat, nicht den Primärschlüssel, der in Ankündigungen genannt wird. Ein Fingerabdruck, der falsch aussieht, ist meist ein Unterschlüssel, kein Angriff.
- Wenn die Verifizierung fehlschlägt, führe die Binärdatei nicht aus.

*Verifiziert anhand von Zebra `v6.3.0` und Zallet `v0.1.0-beta.2` am 2026-08-18.*

## Warum das für Zcash besonders wichtig ist

Eine manipulierte Wallet-Binärdatei kann einen Spending Key oder einen Viewing Key exfiltrieren. Anders als bei einem kompromittierten Passwort ist dieser Verlust dauerhaft: Es gibt kein Rollback, kein Chargeback und keinen Support-Schalter. Shielded Transactions schützen, was *on chain* passiert — sie bieten überhaupt keinen Schutz, wenn die Software, die du ausführst, ersetzt wurde, bevor sie dich überhaupt erreicht hat.

Dies ist einer der wenigen Angriffswege, bei denen die Datenschutzgarantien des Protokolls schlicht nicht relevant sind. Verifizierung ist die Ebene, die das abdeckt.

## Bedrohungsmodell — was Verifizierung erkennt und was nicht

**Erkennt:**

- Einen manipulierten Mirror oder eine veränderte Datei, die von irgendwo anders als der Release-Seite des Projekts ausgeliefert wird.
- Einen Man-in-the-Middle-Austausch während des Downloads.
- Ein kompromittiertes CDN oder einen gekaperten Distributions-Host.
- Versehentliche Beschädigung während der Übertragung.

**Erkennt nicht:**

- Einen Maintainer, der bösartigen Code signiert. Die Signatur wird korrekt verifiziert; sie beweist die Herkunft, nicht die Absicht.
- Einen kompromittierten Build-Host, der ein signiertes, aber bösartiges Artefakt erzeugt. Dafür gibt es reproduzierbare Builds und Provenienz-Nachweise, um das Risiko einzugrenzen.
- Einen Schlüssel, den du aus derselben kompromittierten Quelle bezogen hast wie die Binärdatei. Wenn ein Angreifer sowohl die Datei als auch den Schlüssel kontrolliert, gegen den du prüfst, sagt dir die Verifizierung nichts.

Dieser letzte Punkt ist der, den die meisten Anleitungen auslassen. **Woher du den Schlüssel beziehst, ist genauso wichtig wie das Ausführen des Befehls.**

---

## Teil 1 — Zebra: Prüfsummen und Sigstore

Zebra veröffentlicht für jedes Release diese Assets:

| Asset | Zweck |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | das Binärarchiv |
| `zebrad-<version>-<arch>.tar.gz.sha256` | Prüfsumme pro Datei |
| `SHA256SUMS` | Prüfsummen für alle Architekturen |
| `SHA256SUMS.sigstore.json` | Sigstore-Bundle, das `SHA256SUMS` signiert |

### Schritt 1 — Herunterladen

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Schritt 2 — Die Prüfsumme prüfen

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Tatsächliche Ausgabe:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` ist hier erforderlich, weil `SHA256SUMS` jede Architektur abdeckt und du nur eine heruntergeladen hast. Ohne diese Option meldet `sha256sum` das fehlende aarch64-Archiv als Fehler und du könntest ein Bestehen fälschlich als Fehlschlag lesen.

Die Variante pro Datei funktioniert ebenfalls:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Dieser Schritt allein reicht nicht aus.** Du hast die Prüfsumme vom selben Ort heruntergeladen wie die Binärdatei. Wer das eine ersetzen konnte, konnte auch das andere ersetzen. Die Prüfsumme beweist Integrität; der nächste Schritt beweist die Herkunft.

### Schritt 2b — Dieselbe Prüfung unter Windows

PowerShell hat keinen `-c`-Verifizierungsmodus, daher vergleichst du manuell:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Tatsächliche Ausgabe:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Vergleiche das mit dem Linux-Ergebnis weiter oben auf dieser Seite:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Identische Werte.** Hexadezimalwerte kennen keine Groß-/Kleinschreibung, und das ist die mit Abstand häufigste Fehlwarnung unter Windows.

Noch zwei Windows-spezifische Fallen:

- **Es gibt keinen Exit-Code, den man prüfen kann.** Unter Linux liefert `sha256sum -c` bei einem Fehler `1` zurück und ein Skript kann darauf reagieren. `Get-FileHash` gibt nur einen Hash aus — den Vergleich musst du selbst machen, und dabei kann man sich beim Überfliegen leicht vertun.
- **64 Hex-Zeichen mit dem Auge zu prüfen ist unzuverlässig.** Lass die Shell das machen:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Unter macOS:** Der Ablauf ist derselbe, aber die BSD-Userland-Tools liefern `shasum` statt `sha256sum` — verwende `shasum -a 256 -c --ignore-missing SHA256SUMS`. Dem Autor dieser Seite stand kein macOS-Rechner zur Verfügung, daher ist dieser Befehl aus Apples Tooling dokumentiert und nicht praktisch ausgeführt. Wenn du unter macOS verifizierst, eröffne bitte einen PR, der das bestätigt oder korrigiert.

### Schritt 3 — Das Sigstore-Bundle verifizieren

Sigstore ersetzt langlebige Signaturschlüssel durch kurzlebige Zertifikate, die an eine CI-Identität gebunden und in einem öffentlichen Transparency-Log erfasst werden. Niemand besitzt einen Release-Schlüssel, der gestohlen werden kann.

Der direkte Weg nutzt `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Die beiden `--certificate-*`-Flags sind der eigentliche Punkt. **Ohne sie bestätigst du nur, dass irgendjemand irgendwo die Datei signiert hat.** Mit ihnen bestätigst du, dass sie von einem Workflow im Zebra-Repository signiert wurde, authentifiziert durch GitHubs OIDC-Issuer.

> ⚠️ **Die Version ist wichtig.** Ältere cosign-Builds können das aktuelle Sigstore-Bundle-Format nicht lesen. Wenn man den obigen Befehl mit cosign `v2.4.1` ausführt, erhält man:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Das Bundle *enthält* sehr wohl ein Zertifikat — es liegt unter `verificationMaterial.certificate.rawBytes`, wonach ältere Releases nicht suchen. Das ist eine Einschränkung des Clients, kein kaputtes Release. Wenn dir das passiert, aktualisiere cosign, statt daraus zu schließen, dass der Download fehlerhaft ist. Über Distributionen paketiertes cosign liegt oft deutlich hinter Upstream zurück.

Die nächsten beiden Schritte zeigen, wie man dasselbe Bundle von Hand verifiziert. Das Verständnis dafür ist unabhängig davon wertvoll — und es ist ein praktikabler Fallback, wenn dein cosign-Build nicht mitspielt.

### Schritt 4 — Auslesen, was das Zertifikat tatsächlich aussagt

Du kannst das Bundle auch ohne `cosign` untersuchen; das ist hilfreich, um zu verstehen, worauf du vertraust. Extrahiere das Zertifikat:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Tatsächliche Ausgabe für Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Der Subject Alternative Name ist die Identität. Er nennt das Repository, die genaue Workflow-Datei und den Tag. Sigstore bettet weitere Build-Metadaten in benutzerdefinierte Extensions ein:

| Feld | Wert für v6.3.0 |
|---|---|
| OIDC-Issuer | `https://token.actions.githubusercontent.com` |
| Quell-Repository | `https://github.com/ZcashFoundation/zebra` |
| Build-Commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner-Umgebung | `github-hosted` |
| Workflow-Run | `.../actions/runs/31424510487/attempts/1` |
| Repository-Sichtbarkeit | `public` |

Jeder einzelne dieser Werte ist prüfbar. Der Commit-Hash sollte zum Tag im Repository passen; der Workflow-Run sollte existieren und öffentlich sein.

### Schritt 5 — Die Signatur kryptografisch verifizieren

Du kannst die Signatur direkt mit OpenSSL bestätigen:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Tatsächliche Ausgabe:

```
Verified OK
```

Das Bundle enthält auch den signierten Digest. Bestätige, dass er zu deiner lokalen Datei passt:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Schritt 6 — Der Transparency-Log-Eintrag

Das Bundle enthält einen Rekor-Eintrag, der beweist, dass die Signatur in einem öffentlichen, append-only Log veröffentlicht wurde:

| Feld | Wert |
|---|---|
| Rekor-Log-Index | `2412071838` |
| Eintragstyp | `hashedrekord v0.0.1` |
| Integriert am | 2026-08-10 19:43:09 UTC |

Dadurch wird stiller Schlüsselmissbrauch erkennbar. Eine Signatur, die nie im Log erschien oder zu einem unplausiblen Zeitpunkt erschien, ist ein Signal, auf das man reagieren sollte. Vergleiche die Integrationszeit mit der Release-Ankündigung.

> **Hinweis zum OpenSSL-Weg:** Er verifiziert die Signatur gegen den öffentlichen Schlüssel des Zertifikats, validiert aber nicht selbstständig die Zertifikatskette bis zur Sigstore-Root und prüft auch nicht den Inclusion Proof des Log-Eintrags. `cosign verify-blob` macht alle drei Dinge. Nutze OpenSSL, um den Mechanismus zu verstehen; nutze `cosign` als eigentliche Prüfung.

---

## Teil 2 — Zallet: GPG-Signaturen

Zallet veröffentlicht einen anderen Satz an Assets:

| Asset | Zweck |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | das Binärarchiv |
| `.tar.gz.asc` | getrennte GPG-Signatur |
| `.tar.gz.intoto.jsonl` | SLSA-Provenienz-Nachweis |
| `.tar.gz.provenance.json` | Provenienz-Metadaten |
| `.tar.gz.sbom.spdx` | Software Bill of Materials |

### Schritt 1 — Den Signaturschlüssel identifizieren, bevor du danach suchst

Führe die Verifizierung *zuerst* aus, ohne einen Schlüssel importiert zu haben:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Tatsächliche Ausgabe:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Das ist kein Fehlschlag. Es zeigt dir, dass eine Signatur existiert, und benennt genau den Schlüssel, den du brauchst, **bevor** du mit der Suche beginnst. Notiere den Fingerabdruck und den Issuer und beschaffe den Schlüssel aus einer Quelle, die unabhängig vom Download ist.

> `gpg` gibt Zeitstempel in deiner lokalen Zeitzone aus. Die Ausgabe oben zeigt `WAT` (UTC+1); dieselbe Signatur erscheint anderswo als `18:18:44 UTC`. Derselbe Zeitpunkt. Behandle eine Zeitzonendifferenz nicht als Widerspruch.

### Schritt 2 — Den Schlüssel importieren und verifizieren

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Tatsächliche Ausgabe:

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

`Good signature` ist das, was du sehen wolltest. Zwei Dinge in dieser Ausgabe verwirren Menschen, und beides ist normal.

### Warum der Fingerabdruck nicht zur Ankündigung passt

Die Erklärung zum ZODL-Schlüsselwechsel nennt den Fingerabdruck `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Aber `gpg --verify` meldete `1FE9 9324 …  23F0 617F`. Das sieht nach einem Widerspruch aus und ist keiner.

`gpg` meldet den **Unterschlüssel**, der die Signatur erstellt hat. Die Ankündigung nennt den **Primärschlüssel**. Bestätige die Beziehung selbst:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Tatsächliche Ausgabe:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

Die Zeile `sub` ist der Signatur-Unterschlüssel; die Zeile `pub` ist der Primärschlüssel. Eine Identität, ein Schlüsselpaket. Deshalb gibt die Verifizierungsausgabe **beide** Fingerabdrücke aus — vergleiche den *Primärschlüssel* mit veröffentlichten Ankündigungen und verstehe die Unterschlüssel-Zeile als Hinweis darauf, welcher Teil des Schlüssels die Arbeit erledigt hat.

Diese Aufteilung ist beabsichtigt: Ein Signatur-Unterschlüssel kann rotiert oder widerrufen werden, ohne die Primäridentität und das damit aufgebaute Vertrauen aufzugeben.

### Was die Warnung `[unknown]` bedeutet

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Das ist **kein** Problem mit der Signatur. Die Signatur ist kryptografisch gültig — genau das besagt `Good signature`. Die Warnung sagt etwas anderes: Du hast deiner lokalen GnuPG-Installation nicht mitgeteilt, dass du glaubst, dass dieser Schlüssel zu dem gehört, was er vorgibt zu sein.

GnuPG trennt zwei Fragen:

1. **Hat dieser Schlüssel diese Datei signiert?** — beantwortet durch `Good signature`. Kryptografisch, ohne menschliches Urteil.
2. **Gehört dieser Schlüssel zu ZODL?** — das wird überhaupt nicht durch Kryptografie beantwortet. Das stellst du fest, indem du den Fingerabdruck mit einer unabhängigen Quelle abgleichst.

Du wirst diese Warnung bei fast jeder Verifizierung sehen, sofern du den Schlüssel nicht ausdrücklich lokal signierst. Behandle sie nicht als Fehlschlag. **Behandle** ein fehlendes `Good signature` als Fehlschlag.

### Schritt 3 — Die Schlüsselrotation selbst verifizieren

Die Signierung von Zcash-Releases wechselte 2026 von Electric Coin Company zu Zcash Open Development Lab, nachdem ZODL im Januar 2026 vom früheren ECC-Engineering- und Produktteam gegründet worden war.

| | Alter Schlüssel | Neuer Schlüssel |
|---|---|---|
| Fingerabdruck | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Typ | RSA 3072-Bit, erstellt am 2023-06-19 | RSA 4096-Bit, erstellt am 2026-03-23, läuft am 2028-03-22 ab |
| Veröffentlicht unter | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Veröffentlichte Zeitleiste: neuer Schlüssel erzeugt am 2026-03-23, angekündigt am 2026-03-27, exklusive Signierung ab 2026-04-23, Widerruf des alten ECC-Schlüssels geplant für 2026-06-23.

Eine Rotationsankündigung auf einer Website ist nur so vertrauenswürdig wie die Website. Der richtige Mechanismus ist eine Erklärung, die **clear-signed von beiden Schlüsseln** ist, sodass der alte Schlüssel für den neuen bürgt. Genau das veröffentlicht ZODL:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Tatsächliche Ausgabe (gekürzt — zwei Signaturen auf einem Dokument):

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

Zwei `Good signature`-Ergebnisse auf einem Dokument, vom alten Schlüssel und vom neuen. Wenn du dem ECC-Schlüssel bei früheren Releases vertraut hast, trägt dieses Vertrauen jetzt auf den ZODL-Schlüssel über, ohne dass du `zodl.com`, `apt.z.cash` oder einem Forenbeitrag vertrauen musst. Nach genau dieser Eigenschaft solltest du immer Ausschau halten, wenn ein Projekt Schlüssel rotiert — und ihr Fehlen ist etwas, wonach man fragen sollte.

### Wo man einen Schlüssel herbekommt — und wo nicht

In absteigender Reihenfolge, von gut nach schlecht:

1. **Eine Erklärung, die mit dem vorherigen Schlüssel signiert ist**, wie oben. Die stärkste Option nach einer Rotation.
2. **Eine Quelle, die vom Download unabhängig ist.** Die Binärdatei kam von GitHub; der Schlüssel kam von `apt.z.cash`. Ein Angreifer braucht beides.
3. **Ein Keyserver, abgeglichen mit einem veröffentlichten Fingerabdruck.** Auf die meisten Keyserver kann jeder einen Schlüssel hochladen, der jede beliebige Identität behauptet. Erst der Fingerabdruckabgleich macht das sicher — nicht der Keyserver.
4. **Dieselbe Seite wie die Binärdatei.** Fast keine Absicherung. Wer das eine ersetzen kann, kann auch das andere ersetzen.

Vergleiche immer den **vollständigen** Fingerabdruck mit dem **Primärschlüssel**. Kurze Schlüssel-IDs lassen sich trivial kollidieren und wurden bei echten Angriffen eingesetzt.

## Teil 3 — Eine Verifizierung, die fehlschlägt

Verifizierung ist nur nützlich, wenn du weißt, wie ein Fehlschlag aussieht. Hier ist ein echtes Beispiel, erzeugt durch das Anhängen eines einzelnen Null-Bytes an ein gültiges Archiv:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Tatsächliche Ausgabe:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Exit-Code: `1`.

Stelle die beiden Digests nebeneinander:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Ein Byte an eine 66.992.676 Byte große Datei angehängt. Die beiden Hashes haben nichts gemeinsam — weder ein Präfix noch ein Muster. Es gibt keine teilweise Übereinstimmung und kein "nah genug": Eine Prüfsumme stimmt entweder exakt überein, oder die Datei ist nicht die Datei, die du haben wolltest.

### Was du tun solltest, wenn das passiert

1. **Führe die Binärdatei nicht aus.** Entpacke sie nicht, führe kein `chmod +x` darauf aus.
2. **Versuche es erneut von der offiziellen Release-Seite.** Die meisten Fehler sind abgebrochene Downloads.
3. **Wenn es beim zweiten Mal wieder fehlschlägt, ändere den Netzwerkpfad.** Andere Verbindung oder ein VPN. Ein Fehler, der dich über Netzwerke hinweg begleitet, ist etwas anderes als einer, der das nicht tut.
4. **Bestätige, dass du die richtige Prüfsummendatei für die richtige Version hast.** Der Vergleich von v6.3.0 mit den Prüfsummen von v6.2.3 schlägt korrekt fehl.
5. **Wenn es weiterhin fehlschlägt, melde es.** Eröffne ein Issue im Repository des Projekts oder nutze den Sicherheitskontakt in `SECURITY.md` für alles, was dir absichtlich erscheint. Siehe die Seite [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) für Meldekanäle.
6. **Bewahre das Artefakt auf.** Eine manipulierte Binärdatei ist ein Beweisstück. Lösche sie nicht, bevor du sie gemeldet hast.

Ein Signaturfehler ist ernster als ein Prüfsummenfehler. Eine nicht passende Prüfsumme ist meist Beschädigung; eine gültige Datei mit schlechter Signatur ist nichts, was zufällig passiert.

---

## Teil 4 — Referenztabelle

| Projekt | Releases veröffentlicht unter | Methode | Woher der Schlüssel kommt |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore-Bundle | Kein Schlüssel — CI-Identität via GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | Getrennte GPG-`.asc`, SLSA-Provenienz, SBOM | `apt.z.cash/zodl.asc` — Primärschlüssel `0338 34DD…58E2 6AB1`, Signatur-Unterschlüssel `1FE9 9324…23F0 617F` |
| **zcashd** | *eingestellt* | — | Bei Block 3,417,100 am 2026-07-18 angehalten. Nicht installieren. |
| **Zodl** (früher Zashi) | App Store / Google Play; `zodl-inc` auf GitHub | Store-Signierung; eigenständige Android-Binärdateien GPG-signiert | ZODL-Schlüssel gemäß Übergangserklärung |

> **Hinweis zur Benennung:** Zashi wurde 2026 zu **Zodl** umbenannt — zuerst im App Store, dann bei Google Play. Ältere Anleitungen, die sich auf "Zashi" beziehen, beschreiben dieselbe Wallet-Linie.

---

## Teil 5 — Mobile und Hardware-Wallets

Sobald man direkte Downloads verlässt, funktioniert Verifizierung anders.

**App Stores.** Du kannst eine Signatur nicht selbst prüfen. Der Store signiert das Paket, und du vertraust auf die Prüfung des Stores und die Integrität des Entwicklerkontos. Was du *prüfen* kannst, ist, dass du die richtige App hast: Bestätige den Namen des Herausgebers und die Paketkennung anhand der offiziellen Website des Projekts, nicht anhand von Suchergebnissen. Imitations-Apps sind häufig, und ein Store-Eintrag ist kein Beweis für Authentizität.

**Eigenständige Android-APKs.** Diese *können* verifiziert werden. ZODL veröffentlicht GPG-signierte eigenständige Android-Binärdateien über GitHub Releases, daher gilt der Ablauf aus Teil 2. Bevorzuge diesen Weg, wenn du eine überprüfbare Kette möchtest.

**Hardware-Wallets.** Das Gerät bestätigt seine eigene Firmware, daher ist der Vertrauensanker die Hardware, nicht eine Datei auf deinem Rechner. Siehe [Keystone Zashi](/guides/keystone-zashi) für den Geräte-Verifizierungsablauf. Kaufe direkt beim Hersteller — Manipulationen in der Lieferkette passieren zwischen Fabrik und Käufer.

---

## Weiterführende Literatur

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — Offenlegungsrichtlinie und Sicherheitskontakte
- [Zebra Full Node](/zcash-tech/zebra-full-node) — Installation von Zebra nach der Verifizierung
- [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) — Verwendung von Zallet
- [Sigstore-Dokumentation](https://docs.sigstore.dev/)
- [SLSA-Provenienzstufen](https://slsa.dev/)

---

*Die Befehle auf dieser Seite wurden am 2026-08-18 mit Zebra `v6.3.0` und Zallet `v0.1.0-beta.2` ausgeführt. Release-Tooling ändert sich: Wenn die Ausgabe von der hier gezeigten abweicht, vertraue deinem eigenen Lauf und eröffne bitte einen PR.*
