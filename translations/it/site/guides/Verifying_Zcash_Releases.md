<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verifica delle release di Zcash

## TL;DR

- Scaricare un binario di Zcash non è la stessa cosa che ottenere quello pubblicato dal progetto. La verifica è ciò che ti permette di distinguere tra i due.
- Un checksum prova che il file è arrivato integro. Una **firma** prova chi lo ha prodotto. Ti servono entrambe, e un checksum da solo prova ben poco.
- Zebra pubblica un file `SHA256SUMS` più un bundle **Sigstore** che collega la release a uno specifico workflow GitHub Actions, tag e commit, senza richiedere gestione di chiavi.
- Zallet pubblica firme **GPG** distaccate (`.asc`) insieme alla provenance SLSA e a un SBOM.
- La chiave di firma di Zcash è stata ruotata nel 2026 da Electric Coin Company a Zcash Open Development Lab (ZODL). Se hai verificato release più vecchie, ti serve la nuova chiave, e la dichiarazione di passaggio è firmata da entrambe le chiavi, quindi puoi verificare la rotazione stessa.
- `gpg` riporta la **sottochiave** che ha firmato un file, non la chiave primaria nominata negli annunci. Un fingerprint che sembra sbagliato di solito è una sottochiave, non un attacco.
- Se la verifica fallisce, non eseguire il binario.

*Verificato rispetto a Zebra `v6.3.0` e Zallet `v0.1.0-beta.2` il 2026-08-18.*

## Perché questo conta ancora di più per Zcash

Un binario wallet manomesso può esfiltrare una spending key o una viewing key. A differenza di una password compromessa, questa perdita è permanente: non c'è rollback, non c'è chargeback e non c'è assistenza clienti. Le transazioni shielded proteggono ciò che avviene *on chain*, ma non offrono alcuna protezione quando il software che stai eseguendo è stato sostituito prima ancora di raggiungerti.

Questo è uno dei pochi vettori d'attacco per cui le garanzie di privacy del protocollo semplicemente non sono rilevanti. La verifica è il livello che copre questo rischio.

## Modello di minaccia: cosa rileva e cosa non rileva la verifica

**Rileva:**

- Un mirror manomesso o un file modificato servito da un luogo diverso dalla pagina di release del progetto.
- Una sostituzione man-in-the-middle durante il download.
- Una CDN compromessa o un host di distribuzione dirottato.
- Corruzione accidentale durante il transito.

**Non rileva:**

- Un manutentore che firma codice malevolo. La firma verrà verificata correttamente; prova l'origine, non l'intento.
- Un host di build compromesso che produce un artefatto firmato ma malevolo. È esattamente il problema che le build riproducibili e le attestazioni di provenance cercano di restringere.
- Una chiave ottenuta dalla stessa fonte compromessa da cui proviene il binario. Se un attaccante controlla sia il file sia la chiave con cui lo confronti, la verifica non ti dice nulla.

Quest'ultimo punto è quello che la maggior parte delle guide salta. **Da dove ottieni la chiave conta quanto eseguire il comando.**

---

## Parte 1 — Zebra: checksum e Sigstore

Zebra pubblica queste risorse per ogni release:

| Risorsa | Scopo |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | l'archivio binario |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum per singolo file |
| `SHA256SUMS` | checksum per tutte le architetture |
| `SHA256SUMS.sigstore.json` | bundle Sigstore che firma `SHA256SUMS` |

### Passaggio 1 — Download

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Passaggio 2 — Controlla il checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Output reale:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` è richiesto qui perché `SHA256SUMS` copre ogni architettura e tu ne hai scaricata solo una. Senza, `sha256sum` riporta l'archivio aarch64 assente come fallimento e potresti leggere erroneamente un successo come un errore.

Va bene anche la variante per singolo file:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Questo passaggio da solo non basta.** Hai scaricato il checksum dallo stesso posto del binario. Chiunque possa sostituire uno può sostituire anche l'altro. Il checksum prova l'integrità; il passaggio successivo prova l'origine.

### Passaggio 2b — Lo stesso controllo su Windows

PowerShell non ha una modalità di verifica `-c`, quindi il confronto va fatto manualmente:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Output reale:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Confrontalo con il risultato Linux riportato prima in questa pagina:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Valori identici.** L'esadecimale non fa distinzione tra maiuscole e minuscole, e questo è il falso allarme più comune su Windows.

Altri due tranelli specifici di Windows:

- **Non c'è alcun codice di uscita da controllare.** Su Linux, `sha256sum -c` restituisce 1 in caso di errore e uno script può agire di conseguenza. `Get-FileHash` stampa solo un hash: il confronto spetta a te, e puoi sbagliarlo con una lettura superficiale.
- **Leggere 64 caratteri esadecimali a occhio è inaffidabile.** Lascia che sia la shell a farlo:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **Su macOS:** il flusso è lo stesso, ma la userland BSD include `shasum` invece di `sha256sum`, quindi usa `shasum -a 256 -c --ignore-missing SHA256SUMS`. L'autore di questa pagina non aveva a disposizione una macchina macOS, quindi quel comando è documentato in base agli strumenti Apple anziché essere stato eseguito. Se verifichi su macOS, apri una PR per confermarlo o correggerlo.

### Passaggio 3 — Verifica il bundle Sigstore

Sigstore sostituisce le chiavi di firma a lunga durata con certificati a breve durata associati a un'identità CI e registrati in un transparency log pubblico. Nessuno detiene una chiave di release che possa essere rubata.

Il percorso più diretto usa `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

I due flag `--certificate-*` sono il punto centrale. **Senza di essi stai solo confermando che qualcuno, da qualche parte, ha firmato il file.** Con essi confermi che è stato firmato da un workflow nel repository Zebra, autenticato dall'emittente OIDC di GitHub.

> ⚠️ **La versione conta.** Le build più vecchie di cosign non riescono a leggere l'attuale formato del bundle Sigstore. Eseguire il comando sopra con cosign `v2.4.1` produce:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> Il bundle *contiene* davvero un certificato: si trova sotto `verificationMaterial.certificate.rawBytes`, che le release più vecchie non cercano. È un limite del client, non una release difettosa. Se ti capita, aggiorna cosign invece di concludere che il download è corrotto. Le versioni di cosign distribuite nei package manager sono spesso molto indietro rispetto a upstream.

I due passaggi seguenti mostrano come verificare lo stesso bundle a mano, cosa utile da capire in ogni caso e anche come fallback praticabile quando la tua build di cosign non collabora.

### Passaggio 4 — Leggi cosa dichiara davvero il certificato

Puoi ispezionare il bundle senza `cosign`, cosa utile per capire di cosa ti stai fidando. Estrai il certificato:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Output reale per Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

Il Subject Alternative Name è l'identità. Indica il repository, il file esatto del workflow e il tag. Sigstore incorpora ulteriore metadata di build in estensioni personalizzate:

| Campo | Valore per v6.3.0 |
|---|---|
| Emittente OIDC | `https://token.actions.githubusercontent.com` |
| Repository sorgente | `https://github.com/ZcashFoundation/zebra` |
| Commit di build | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Ambiente runner | `github-hosted` |
| Esecuzione workflow | `.../actions/runs/31424510487/attempts/1` |
| Visibilità del repository | `public` |

Ognuno di questi elementi è verificabile. L'hash del commit dovrebbe corrispondere al tag nel repository; l'esecuzione del workflow dovrebbe esistere ed essere pubblica.

### Passaggio 5 — Verifica crittograficamente la firma

Puoi confermare la firma direttamente con OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Output reale:

```
Verified OK
```

Il bundle registra anche il digest che ha firmato. Conferma che corrisponda al tuo file locale:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Passaggio 6 — La voce nel transparency log

Il bundle contiene una voce Rekor che prova che la firma è stata pubblicata in un log pubblico append-only:

| Campo | Valore |
|---|---|
| Indice log Rekor | `2412071838` |
| Tipo di voce | `hashedrekord v0.0.1` |
| Integrata il | 2026-08-10 19:43:09 UTC |

È questo che rende rilevabile un uso improprio silenzioso delle chiavi. Una firma che non è mai comparsa nel log, o che vi è comparsa in un momento implausibile, è un segnale su cui vale la pena agire. Confronta il tempo di integrazione con l'annuncio della release.

> **Nota sul percorso OpenSSL:** verifica la firma rispetto alla chiave pubblica del certificato, ma di per sé non convalida la catena del certificato fino alla root di Sigstore né controlla la prova di inclusione della voce nel log. `cosign verify-blob` fa tutte e tre le cose. Usa OpenSSL per capire il meccanismo; usa `cosign` come controllo effettivo.

---

## Parte 2 — Zallet: firme GPG

Zallet pubblica un insieme diverso di risorse:

| Risorsa | Scopo |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | l'archivio binario |
| `.tar.gz.asc` | firma GPG distaccata |
| `.tar.gz.intoto.jsonl` | attestazione di provenance SLSA |
| `.tar.gz.provenance.json` | metadata di provenance |
| `.tar.gz.sbom.spdx` | distinta base del software |

### Passaggio 1 — Identifica la chiave di firma prima di andarla a cercare

Esegui *prima* la verifica, senza aver importato alcuna chiave:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Output reale:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Questo non è un fallimento. Ti dice che una firma esiste e indica esattamente quale chiave ti serve, **prima** che tu inizi a cercarla. Annota il fingerprint e l'issuer, poi ottieni la chiave da una fonte indipendente dal download.

> `gpg` stampa i timestamp nel tuo fuso orario locale. L'output sopra mostra `WAT` (UTC+1); la stessa firma altrove appare come `18:18:44 UTC`. È lo stesso istante. Non considerare una differenza di fuso orario come una discrepanza.

### Passaggio 2 — Importa la chiave e verifica

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Output reale:

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

`Good signature` è quello che volevi ottenere. Ci sono due cose in questo output che confondono spesso le persone, ed entrambe sono normali.

### Perché il fingerprint non corrisponde all'annuncio

La dichiarazione di transizione della chiave ZODL nomina il fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Ma `gpg --verify` ha riportato `1FE9 9324 …  23F0 617F`. Sembra una discrepanza, ma non lo è.

`gpg` riporta la **sottochiave** che ha generato la firma. L'annuncio nomina la **chiave primaria**. Conferma tu stesso la relazione:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Output reale:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

La riga `sub` è la sottochiave di firma; la riga `pub` è la chiave primaria. Un'unica identità, un unico pacchetto di chiavi. Ecco perché l'output di verifica stampa **entrambi** i fingerprint: confronta la chiave *primaria* con qualsiasi annuncio pubblicato e considera la riga della sottochiave come l'indicazione di quale parte della chiave ha svolto il lavoro.

Separare le chiavi in questo modo è deliberato: una sottochiave di firma può essere ruotata o revocata senza scartare l'identità primaria e la fiducia accumulata.

### Cosa significa l'avviso `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Questo **non** è un problema della firma. La firma è crittograficamente valida: questo è ciò che afferma `Good signature`. L'avviso dice qualcos'altro: non hai detto al tuo GnuPG locale che credi che questa chiave appartenga davvero a chi dichiara di essere.

GnuPG separa due domande:

1. **È stata questa chiave a firmare questo file?** — a questa risponde `Good signature`. È un fatto crittografico, senza giudizio umano.
2. **Questa chiave appartiene davvero a ZODL?** — a questa la crittografia non risponde affatto. Lo stabilisci controllando il fingerprint rispetto a una fonte indipendente.

Vedrai questo avviso in quasi ogni verifica, a meno che tu non firmi esplicitamente la chiave in locale. Non trattarlo come un fallimento. **Tratta invece l'assenza di `Good signature` come un fallimento.**

### Passaggio 3 — Verifica la transizione della chiave stessa

La firma delle release di Zcash è passata da Electric Coin Company a Zcash Open Development Lab nel 2026, dopo che ZODL è stata costituita nel gennaio 2026 dall'ex team di ingegneria e prodotto di ECC.

| | Vecchia chiave | Nuova chiave |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Tipo | RSA 3072-bit, creata il 2023-06-19 | RSA 4096-bit, creata il 2026-03-23, scade il 2028-03-22 |
| Pubblicata su | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Cronologia pubblicata: nuova chiave generata il 2026-03-23, annunciata il 2026-03-27, firma esclusiva dal 2026-04-23, revoca della vecchia chiave ECC prevista per il 2026-06-23.

Un annuncio di rotazione su un sito web è affidabile solo quanto il sito stesso. Il meccanismo corretto è una dichiarazione **clear-signed da entrambe le chiavi**, in modo che la vecchia chiave garantisca per la nuova. ZODL pubblica esattamente questo:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Output reale (abbreviato: due firme su un solo documento):

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

Due risultati `Good signature` sullo stesso documento, dalla vecchia chiave e dalla nuova. Se ti fidavi della chiave ECC per le release precedenti, quella fiducia ora si estende alla chiave ZODL senza che tu debba fidarti di `zodl.com`, `apt.z.cash` o di un post su un forum. Questa è la proprietà da cercare ogni volta che un progetto ruota le chiavi, e la sua assenza è motivo per chiedere spiegazioni.

### Dove ottenere una chiave, e dove no

Classificato dal migliore al peggiore:

1. **Una dichiarazione firmata dalla chiave precedente**, come sopra. È l'opzione più forte dopo una rotazione.
2. **Una fonte indipendente dal download.** Il binario proviene da GitHub; la chiave da `apt.z.cash`. Un attaccante deve compromettere entrambe.
3. **Un keyserver, verificato rispetto a un fingerprint pubblicato.** Chiunque può caricare su molti keyserver una chiave che dichiara qualsiasi identità. È il confronto del fingerprint che rende sicuro questo metodo, non il keyserver.
4. **La stessa pagina del binario.** Quasi nessuna garanzia. Chi può sostituire uno può sostituire anche l'altra.

Confronta sempre il fingerprint **completo** con la chiave **primaria**. Gli ID chiave brevi sono trivialmente soggetti a collisione e sono già stati usati in attacchi reali.

## Parte 3 — Una verifica che fallisce

La verifica è utile solo se sai riconoscere un fallimento. Eccone uno reale, ottenuto aggiungendo un singolo byte nullo a un archivio valido:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Output reale:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Codice di uscita: `1`.

Metti i due digest fianco a fianco:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Un byte aggiunto a un file di 66,992,676 byte. I due hash non hanno nulla in comune: né un prefisso, né uno schema. Non esiste una corrispondenza parziale né un "abbastanza vicino": un checksum o corrisponde esattamente, oppure il file non è quello che volevi.

### Cosa fare quando succede

1. **Non eseguire il binario.** Non estrarlo, non fare `chmod +x`.
2. **Riprova dalla pagina di release ufficiale.** La maggior parte dei fallimenti sono download troncati.
3. **Se fallisce una seconda volta, cambia percorso di rete.** Una connessione diversa, o una VPN. Un fallimento che ti segue su reti diverse è diverso da uno che non lo fa.
4. **Conferma di avere il file checksum giusto per la versione giusta.** Confrontare le somme di v6.3.0 con quelle di v6.2.3 fallirà correttamente.
5. **Se continua a fallire, segnalalo.** Apri una issue nel repository del progetto, oppure usa il contatto di sicurezza in `SECURITY.md` per qualsiasi cosa sospetti sia intenzionale. Consulta la pagina [Sicurezza dell'ecosistema Zcash](/zcash-community/zcash-ecosystem-security) per i canali di divulgazione.
6. **Conserva l'artefatto.** Un binario manomesso è una prova. Non cancellarlo prima di averlo segnalato.

Un fallimento della firma è più grave di un fallimento del checksum. Una discrepanza del checksum di solito è corruzione; un file valido ma con firma errata non è qualcosa che accade per caso.

---

## Parte 4 — Tabella di riferimento

| Progetto | Release pubblicate su | Metodo | Da dove proviene la chiave |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + bundle Sigstore | Nessuna chiave: identità CI tramite GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | GPG `.asc` distaccato, provenance SLSA, SBOM | `apt.z.cash/zodl.asc` — primaria `0338 34DD…58E2 6AB1`, sottochiave di firma `1FE9 9324…23F0 617F` |
| **zcashd** | *ritirato* | — | Arrestato al blocco 3,417,100 il 2026-07-18. Non installarlo. |
| **Zodl** (ex Zashi) | App Store / Google Play; `zodl-inc` su GitHub | Firma dello store; binari Android standalone firmati con GPG | Chiave ZODL secondo la dichiarazione di transizione |

> **Nota sul nome:** Zashi è stato rinominato in **Zodl** nel 2026, prima su App Store e poi su Google Play. Le guide più vecchie che si riferiscono a "Zashi" descrivono la stessa linea di wallet.

---

## Parte 5 — Wallet mobili e hardware wallet

La verifica funziona in modo diverso quando si esce dai download diretti.

**App store.** Non puoi controllare personalmente una firma. È lo store a firmare il pacchetto, e tu ti fidi della revisione dello store e dell'integrità dell'account sviluppatore. Quello che *puoi* verificare è di avere l'app giusta: conferma il nome dell'editore e l'identificatore del pacchetto rispetto al sito ufficiale del progetto, non ai risultati di ricerca. Le app di impersonificazione sono comuni, e una scheda nello store non è una prova di autenticità.

**APK Android standalone.** Questi *possono* essere verificati. ZODL pubblica binari Android standalone firmati con GPG tramite GitHub Releases, quindi si applica il flusso della Parte 2. Preferisci questo percorso se vuoi una catena verificabile.

**Hardware wallet.** Il dispositivo attesta il proprio firmware, quindi l'ancora di fiducia è l'hardware, non un file sulla tua macchina. Vedi [Keystone Zashi](/guides/keystone-zashi) per il flusso di verifica del dispositivo. Acquista direttamente dal produttore: le manomissioni della supply chain avvengono tra la fabbrica e l'acquirente.

---

## Ulteriori letture

- [Sicurezza dell'ecosistema Zcash](/zcash-community/zcash-ecosystem-security) — policy di divulgazione e contatti di sicurezza
- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — installare Zebra dopo averlo verificato
- [Guida rapida di riferimento a Zallet](/using-zcash/zallet-quick-reference-guide) — usare Zallet
- [Documentazione Sigstore](https://docs.sigstore.dev/)
- [Livelli di provenance SLSA](https://slsa.dev/)

---

*I comandi in questa pagina sono stati eseguiti su Zebra `v6.3.0` e Zallet `v0.1.0-beta.2` il 2026-08-18. Gli strumenti di release cambiano: se l'output differisce da quanto mostrato qui, fidati della tua esecuzione e apri una PR.*
