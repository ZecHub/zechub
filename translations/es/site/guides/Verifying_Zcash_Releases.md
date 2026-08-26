<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Community/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verificación de lanzamientos de Zcash

## TL;DR

- Descargar un binario de Zcash no es lo mismo que obtener el que publicó el proyecto. La verificación es la forma de distinguirlos.
- Un checksum demuestra que el archivo llegó intacto. Una **firma** demuestra quién lo produjo. Necesitas ambos, y un checksum por sí solo demuestra muy poco.
- Zebra publica un archivo `SHA256SUMS` además de un bundle de **Sigstore** que vincula el lanzamiento a un workflow, etiqueta y commit específicos de GitHub Actions, sin necesidad de gestionar claves.
- Zallet publica firmas **GPG** separadas (`.asc`) junto con procedencia SLSA y un SBOM.
- La clave de firma de Zcash rotó en 2026 de Electric Coin Company a Zcash Open Development Lab (ZODL). Si verificaste lanzamientos anteriores, necesitas la nueva clave; y la declaración de traspaso está firmada por ambas claves, así que puedes verificar la rotación en sí.
- `gpg` informa la **subclave** que firmó un archivo, no la clave primaria nombrada en los anuncios. Un fingerprint que parece incorrecto normalmente es una subclave, no un ataque.
- Si la verificación falla, no ejecutes el binario.

*Verificado con Zebra `v6.3.0` y Zallet `v0.1.0-beta.2` el 2026-08-18.*

## Por qué esto importa más para Zcash

Un binario de wallet manipulado puede exfiltrar una spending key o una viewing key. A diferencia de una contraseña comprometida, esa pérdida es permanente: no hay reversión, no hay chargeback y no hay mesa de ayuda. Las transacciones shielded protegen lo que sucede *on chain*; no ofrecen ninguna protección cuando el software que estás ejecutando fue reemplazado antes siquiera de llegar a ti.

Esta es una de las pocas vías de ataque en las que las garantías de privacidad del protocolo simplemente no son relevantes. La verificación es la capa que la cubre.

## Modelo de amenazas: qué detecta y qué no detecta la verificación

**Detecta:**

- Un mirror manipulado o un archivo modificado servido desde algún lugar que no sea la página de lanzamientos del proyecto.
- Un intercambio man-in-the-middle durante la descarga.
- Un CDN comprometido o un host de distribución secuestrado.
- Corrupción accidental durante la transferencia.

**No detecta:**

- Un mantenedor que firma código malicioso. La firma se verificará correctamente; prueba el origen, no la intención.
- Un host de compilación comprometido que produce un artefacto firmado pero malicioso. Para reducir esto existen las compilaciones reproducibles y las atestaciones de procedencia.
- Una clave que obtuviste de la misma fuente comprometida que el binario. Si un atacante controla tanto el archivo como la clave contra la que lo verificas, la verificación no te dice nada.

Ese último punto es el que la mayoría de las guías omiten. **De dónde obtienes la clave importa tanto como ejecutar el comando.**

---

## Parte 1 — Zebra: checksums y Sigstore

Zebra publica estos activos para cada lanzamiento:

| Activo | Propósito |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | el archivo binario |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum por archivo |
| `SHA256SUMS` | checksums para todas las arquitecturas |
| `SHA256SUMS.sigstore.json` | bundle de Sigstore que firma `SHA256SUMS` |

### Paso 1 — Descargar

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Paso 2 — Comprobar el checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Salida real:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

Aquí `--ignore-missing` es necesario porque `SHA256SUMS` cubre todas las arquitecturas y tú solo descargaste una. Sin él, `sha256sum` informa que el archivo aarch64 ausente es un fallo y podrías interpretar mal un resultado correcto como fallido.

La variante por archivo también funciona:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Este paso por sí solo no basta.** Descargaste el checksum del mismo lugar que el binario. Cualquiera que pudiera reemplazar uno podría reemplazar el otro. El checksum prueba la integridad; el siguiente paso prueba el origen.

### Paso 2b — La misma comprobación en Windows

PowerShell no tiene un modo de verificación `-c`, así que comparas manualmente:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Salida real:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Compáralo con el resultado de Linux mostrado antes en esta página:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Valores idénticos.** El hexadecimal no distingue mayúsculas de minúsculas, y esta es la falsa alarma más común en Windows.

Dos trampas más específicas de Windows:

- **No hay código de salida que comprobar.** En Linux, `sha256sum -c` devuelve 1 si falla y un script puede actuar en consecuencia. `Get-FileHash` solo imprime un hash: la comparación te corresponde a ti, y también el riesgo de equivocarte por revisarlo por encima.
- **Leer 64 caracteres hexadecimales a simple vista no es fiable.** Deja que el shell lo haga:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **En macOS:** el flujo es el mismo, pero el userland BSD incluye `shasum` en lugar de `sha256sum`, así que usa `shasum -a 256 -c --ignore-missing SHA256SUMS`. El autor de esta página no tenía disponible ninguna máquina con macOS, así que ese comando se documenta a partir de las herramientas de Apple en lugar de haberse ejecutado. Si verificas en macOS, por favor abre un PR para confirmarlo o corregirlo.

### Paso 3 — Verificar el bundle de Sigstore

Sigstore reemplaza las claves de firma de larga duración por certificados de corta duración vinculados a una identidad de CI, registrados en un log público de transparencia. Nadie conserva una clave de lanzamiento que pueda ser robada.

La ruta directa usa `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Las dos flags `--certificate-*` son la parte central. **Sin ellas solo estás confirmando que alguien, en algún lugar, firmó el archivo.** Con ellas estás confirmando que fue firmado por un workflow en el repositorio de Zebra, autenticado por el emisor OIDC de GitHub.

> ⚠️ **La versión importa.** Las compilaciones antiguas de cosign no pueden leer el formato actual del bundle de Sigstore. Ejecutar lo anterior con cosign `v2.4.1` produce:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> El bundle *sí* contiene un certificado: está en `verificationMaterial.certificate.rawBytes`, que las versiones antiguas no buscan. Esto es una limitación del cliente, no un lanzamiento roto. Si te ocurre, actualiza cosign en lugar de concluir que la descarga es mala. El cosign empaquetado por distribuciones suele estar bastante por detrás de la versión upstream.

Los dos pasos siguientes muestran cómo verificar el mismo bundle manualmente, algo que vale la pena entender en cualquier caso, y que además es una alternativa viable cuando tu compilación de cosign no coopera.

### Paso 4 — Leer lo que realmente afirma el certificado

Puedes inspeccionar el bundle sin `cosign`, lo que resulta útil para entender en qué estás confiando. Extrae el certificado:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Salida real para Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

El Subject Alternative Name es la identidad. Nombra el repositorio, el archivo exacto del workflow y la etiqueta. Sigstore incrusta más metadatos de compilación en extensiones personalizadas:

| Campo | Valor para v6.3.0 |
|---|---|
| Emisor OIDC | `https://token.actions.githubusercontent.com` |
| Repositorio fuente | `https://github.com/ZcashFoundation/zebra` |
| Commit de compilación | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Entorno del runner | `github-hosted` |
| Ejecución del workflow | `.../actions/runs/31424510487/attempts/1` |
| Visibilidad del repositorio | `public` |

Cada uno de estos valores se puede comprobar. El hash del commit debe coincidir con la etiqueta en el repositorio; la ejecución del workflow debe existir y ser pública.

### Paso 5 — Verificar la firma criptográficamente

Puedes confirmar la firma directamente con OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Salida real:

```
Verified OK
```

El bundle también registra el digest que firmó. Confirma que coincide con tu archivo local:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Paso 6 — La entrada en el log de transparencia

El bundle incluye una entrada de Rekor que prueba que la firma se publicó en un log público append-only:

| Campo | Valor |
|---|---|
| Índice del log de Rekor | `2412071838` |
| Tipo de entrada | `hashedrekord v0.0.1` |
| Integrado en | 2026-08-10 19:43:09 UTC |

Esto es lo que hace detectable un uso indebido silencioso de claves. Una firma que nunca apareció en el log, o que apareció en un momento implausible, es una señal que vale la pena tomar en serio. Compara la hora de integración con el anuncio del lanzamiento.

> **Nota sobre la ruta con OpenSSL:** verifica la firma contra la clave pública del certificado, pero por sí sola no valida la cadena del certificado hasta la root de Sigstore ni comprueba la prueba de inclusión de la entrada del log. `cosign verify-blob` hace las tres cosas. Usa OpenSSL para entender el mecanismo; usa `cosign` como tu comprobación real.

---

## Parte 2 — Zallet: firmas GPG

Zallet publica un conjunto distinto de activos:

| Activo | Propósito |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | el archivo binario |
| `.tar.gz.asc` | firma GPG separada |
| `.tar.gz.intoto.jsonl` | atestación de procedencia SLSA |
| `.tar.gz.provenance.json` | metadatos de procedencia |
| `.tar.gz.sbom.spdx` | software bill of materials |

### Paso 1 — Identificar la clave de firma antes de ir a buscarla

Ejecuta la verificación *primero*, sin importar ninguna clave:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Salida real:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Esto no es un fallo. Te dice que existe una firma y nombra exactamente qué clave necesitas, **antes** de que empieces a buscarla. Anota el fingerprint y el issuer, y luego obtén la clave desde una fuente independiente de la descarga.

> `gpg` muestra las marcas de tiempo en tu zona horaria local. La salida anterior muestra `WAT` (UTC+1); la misma firma en otro lugar se verá como `18:18:44 UTC`. Es el mismo instante. No trates una diferencia de zona horaria como una discrepancia.

### Paso 2 — Importar la clave y verificar

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Salida real:

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

`Good signature` es lo que querías ver. Hay dos cosas en esa salida que confunden a la gente, y ambas son normales.

### Por qué el fingerprint no coincide con el anuncio

La declaración de transición de clave de ZODL nombra el fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Pero `gpg --verify` informó `1FE9 9324 …  23F0 617F`. Parece una discrepancia, y no lo es.

`gpg` informa la **subclave** que hizo la firma. El anuncio nombra la **clave primaria**. Confirma tú mismo la relación:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Salida real:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

La línea `sub` es la subclave de firma; la línea `pub` es la primaria. Una identidad, un paquete de claves. Por eso la salida de verificación muestra **ambos** fingerprints: compara la clave *primaria* con cualquier anuncio publicado, y toma la línea de la subclave como información sobre qué parte de la clave hizo el trabajo.

Separar las claves de esta manera es deliberado: una subclave de firma puede rotarse o revocarse sin descartar la identidad primaria y la confianza acumulada en ella.

### Qué significa la advertencia `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Esto **no** es un problema con la firma. La firma es criptográficamente válida: eso es lo que indica `Good signature`. La advertencia dice otra cosa: no le has dicho a tu GnuPG local que crees que esta clave pertenece a quien dice pertenecer.

GnuPG separa dos preguntas:

1. **¿Esta clave firmó este archivo?** — lo responde `Good signature`. Es algo criptográfico, sin juicio humano.
2. **¿Esta clave pertenece a ZODL?** — la criptografía no responde eso en absoluto. Lo estableces comprobando el fingerprint con una fuente independiente.

Verás esta advertencia en casi cualquier verificación a menos que firmes explícitamente la clave de forma local. No la trates como un fallo. **Sí** debes tratar la ausencia de `Good signature` como un fallo.

### Paso 3 — Verificar la transición de clave en sí

La firma de lanzamientos de Zcash pasó de Electric Coin Company a Zcash Open Development Lab en 2026, después de que ZODL se formara en enero de 2026 por el antiguo equipo de ingeniería y producto de ECC.

| | Clave antigua | Clave nueva |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Tipo | RSA 3072-bit, creada el 2023-06-19 | RSA 4096-bit, creada el 2026-03-23, expira el 2028-03-22 |
| Publicada en | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Cronología publicada: nueva clave generada el 2026-03-23, anunciada el 2026-03-27, firma exclusiva desde el 2026-04-23, revocación de la antigua clave de ECC prevista para el 2026-06-23.

Un anuncio de rotación en un sitio web es tan confiable como el propio sitio web. El mecanismo correcto es una declaración **firmada en claro por ambas claves**, de modo que la clave antigua dé fe de la nueva. ZODL publica exactamente eso:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Salida real (abreviada: dos firmas en un documento):

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

Dos resultados `Good signature` en un mismo documento, uno de la clave antigua y otro de la nueva. Si confiabas en la clave de ECC para lanzamientos anteriores, esa confianza ahora se traslada a la clave de ZODL sin que tengas que confiar en `zodl.com`, `apt.z.cash` o una publicación en un foro. Esta es la propiedad que conviene buscar siempre que un proyecto rota claves, y su ausencia merece que preguntes por ella.

### Dónde obtener una clave, y dónde no

Ordenado de mejor a peor:

1. **Una declaración firmada por la clave anterior**, como la de arriba. Es la opción más sólida después de una rotación.
2. **Una fuente independiente de la descarga.** El binario vino de GitHub; la clave vino de `apt.z.cash`. Un atacante necesita ambas.
3. **Un keyserver, contrastado con un fingerprint publicado.** Cualquiera puede subir a la mayoría de keyservers una clave que afirme cualquier identidad. Lo que hace seguro este método es la comparación del fingerprint, no el keyserver.
4. **La misma página que el binario.** Casi no ofrece garantías. Quien pueda reemplazar uno puede reemplazar el otro.

Compara siempre el fingerprint **completo** con la clave **primaria**. Los IDs cortos de clave colisionan trivialmente y se han usado en ataques reales.

## Parte 3 — Una verificación que falla

La verificación solo es útil si sabes cómo se ve un fallo. Aquí tienes uno real, producido al añadir un único byte nulo a un archivo válido:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Salida real:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Código de salida: `1`.

Pon ambos digests uno al lado del otro:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Un byte añadido a un archivo de 66,992,676 bytes. Los dos hashes no comparten nada: ni prefijo, ni patrón. No existe coincidencia parcial ni “casi correcto”: un checksum coincide exactamente o el archivo no es el archivo que querías.

### Qué hacer cuando esto ocurre

1. **No ejecutes el binario.** No lo extraigas, no le hagas `chmod +x`.
2. **Inténtalo de nuevo desde la página oficial de lanzamientos.** La mayoría de los fallos son descargas truncadas.
3. **Si falla una segunda vez, cambia la ruta de red.** Otra conexión, o una VPN. Un fallo que te sigue a través de distintas redes es diferente de uno que no.
4. **Confirma que tienes el archivo de checksum correcto para la versión correcta.** Comparar sumas de v6.3.0 con v6.2.3 fallará correctamente.
5. **Si sigue fallando, repórtalo.** Abre un issue en el repositorio del proyecto, o usa el contacto de seguridad en `SECURITY.md` si sospechas que es deliberado. Consulta la página [Seguridad del Ecosistema Zcash](/zcash-community/zcash-ecosystem-security) para ver los canales de divulgación.
6. **Conserva el artefacto.** Un binario manipulado es evidencia. No lo borres antes de reportarlo.

Un fallo de firma es más grave que un fallo de checksum. Un checksum que no coincide normalmente es corrupción; un archivo válido con firma incorrecta no es algo que ocurra por accidente.

---

## Parte 4 — Tabla de referencia

| Proyecto | Lanzamientos publicados en | Método | De dónde viene la clave |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + bundle de Sigstore | Sin clave: identidad de CI vía GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | GPG `.asc` separado, procedencia SLSA, SBOM | `apt.z.cash/zodl.asc`: primaria `0338 34DD…58E2 6AB1`, subclave de firma `1FE9 9324…23F0 617F` |
| **zcashd** | *retirado* | — | Se detuvo en el bloque 3,417,100 el 2026-07-18. No lo instales. |
| **Zodl** (antes Zashi) | App Store / Google Play; `zodl-inc` en GitHub | Firma de la tienda; binarios Android independientes firmados con GPG | Clave de ZODL según la declaración de transición |

> **Nota sobre el nombre:** Zashi cambió de marca a **Zodl** en 2026, primero en el App Store y luego en Google Play. Las guías antiguas que se refieren a “Zashi” describen el mismo linaje de wallet.

---

## Parte 5 — Wallets móviles y hardware wallets

La verificación funciona de manera distinta una vez que sales de las descargas directas.

**App stores.** No puedes comprobar una firma por tu cuenta. La tienda firma el paquete y estás confiando en la revisión de la tienda y en la integridad de la cuenta del desarrollador. Lo que *sí* puedes verificar es que tienes la app correcta: confirma el nombre del publicador y el identificador del paquete con el sitio oficial del proyecto, no con los resultados de búsqueda. Las apps de suplantación son comunes, y un listado en una tienda no es evidencia de autenticidad.

**APKs Android independientes.** Estas *sí* pueden verificarse. ZODL publica binarios Android independientes firmados con GPG a través de GitHub Releases, así que se aplica el flujo de la Parte 2. Prefiere esta ruta si quieres una cadena verificable.

**Hardware wallets.** El dispositivo certifica su propio firmware, así que el ancla de confianza es el hardware, no un archivo en tu máquina. Consulta [Keystone Zashi](/guides/keystone-zashi) para el flujo de verificación del dispositivo. Compra directamente al fabricante: la manipulación de la cadena de suministro ocurre entre la fábrica y el comprador.

---

## Lecturas adicionales

- [Seguridad del Ecosistema Zcash](/zcash-community/zcash-ecosystem-security) — política de divulgación y contactos de seguridad
- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — instalar Zebra después de verificarlo
- [Guía rápida de referencia de Zallet](/using-zcash/zallet-quick-reference-guide) — uso de Zallet
- [Documentación de Sigstore](https://docs.sigstore.dev/)
- [Niveles de procedencia SLSA](https://slsa.dev/)

---

*Los comandos de esta página se ejecutaron con Zebra `v6.3.0` y Zallet `v0.1.0-beta.2` el 2026-08-18. Las herramientas de lanzamiento cambian: si la salida difiere de la que se muestra aquí, confía en tu propia ejecución y por favor abre un PR.*
