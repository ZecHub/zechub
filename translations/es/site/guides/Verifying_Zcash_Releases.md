<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verificación de versiones [Releases] de Zcash

## TL;DR

- Descargar un binario de Zcash no equivale a obtener el que publicó el proyecto. La verificación es la forma de distinguirlos.
- Una suma de comprobación demuestra que el archivo llegó intacto. Una **firma [signature]** demuestra quién lo produjo. Necesitas ambas, y una suma de comprobación por sí sola demuestra muy poco.
- Zebra publica un archivo `SHA256SUMS` más un paquete de **Sigstore** que vincula la versión con un flujo de trabajo de Actions, etiqueta y commit específicos de GitHub; no se requiere gestión de claves.
- Zallet publica firmas **GPG** separadas (`.asc`) junto con procedencia SLSA y una SBOM.
- La clave de firma de Zcash rotó en 2026 de Electric Coin Company a Zcash Open Development Lab (ZODL). Si verificaste versiones anteriores, necesitas la nueva clave; además, la declaración de transición está firmada por ambas claves, por lo que puedes verificar la propia rotación.
- `gpg` informa la **subclave [subkey]** que firmó un archivo, no la clave primaria indicada en los anuncios. Una huella digital que parece incorrecta suele ser una subclave, no un ataque.
- Si la verificación falla, no ejecutes el binario.

*Verificado con Zebra `v6.3.0` y Zallet `v0.1.0-beta.2` el 2026-08-18.*

## Por qué esto importa más para Zcash

Un binario de billetera [wallet] manipulado puede exfiltrar una clave de gasto o claves de visualización [viewing key]. A diferencia de una contraseña comprometida, esa pérdida es permanente: no hay reversión, contracargo ni servicio de soporte. Las transacciones blindadas [Shielded transactions] protegen lo que ocurre *on-chain*; no ofrecen ninguna protección cuando el software que ejecutas fue sustituido antes de llegar a ti.

Esta es una de las pocas vías de ataque en las que las garantías de privacidad [privacy] del protocolo simplemente no son pertinentes. La verificación es la capa que lo cubre.

## Modelo de amenazas: lo que la verificación detecta y lo que no

**Detecta:**

- Un espejo manipulado o un archivo modificado servido desde algún lugar distinto de la página de versiones del proyecto.
- Un intercambio de intermediario durante la descarga.
- Una CDN comprometida o un host de distribución secuestrado.
- Corrupción accidental durante la transferencia.

**No detecta:**

- Un mantenedor que firma código malicioso. La firma se verificará correctamente; demuestra el origen, no la intención.
- Un host de compilación comprometido que produce un artefacto firmado pero malicioso. Para reducir esto existen las compilaciones reproducibles y las certificaciones de procedencia.
- Una clave que obtuviste de la misma fuente comprometida que el binario. Si un atacante controla tanto el archivo como la clave con la que lo verificas, la verificación no te dice nada.

Ese último punto es el que la mayoría de las guías omiten. **Dónde obtienes la clave importa tanto como ejecutar el comando.**

---

## Parte 1 — Zebra: sumas de comprobación y Sigstore

Zebra publica estos activos para cada versión:

| Activo | Propósito |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | el archivo binario |
| `zebrad-<version>-<arch>.tar.gz.sha256` | suma de comprobación por archivo |
| `SHA256SUMS` | sumas de comprobación para todas las arquitecturas |
| `SHA256SUMS.sigstore.json` | paquete Sigstore que firma `SHA256SUMS` |

### Paso 1 — Descargar

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Paso 2 — Comprobar la suma de comprobación

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Salida real:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` es obligatorio aquí porque `SHA256SUMS` cubre todas las arquitecturas y solo descargaste una. Sin él, `sha256sum` informa que el archivo aarch64 ausente es un fallo y puedes interpretar erróneamente un aprobado como un fallo.

La variante por archivo también funciona:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Este paso por sí solo no es suficiente.** Descargaste la suma de comprobación del mismo lugar que el binario. Quien pudiera sustituir uno podría sustituir el otro. La suma de comprobación demuestra integridad; el siguiente paso demuestra origen.

### Paso 2b — La misma comprobación en Windows

PowerShell no tiene un modo de verificación de `-c`, así que comparas manualmente:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Salida real:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Compáralo con el resultado de Linux mostrado anteriormente en esta página:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Valores idénticos.** El hexadecimal no distingue mayúsculas de minúsculas, y esta es la falsa alarma más común en Windows.

Dos trampas más específicas de Windows:

- **No hay un código de salida que comprobar.** En Linux, `sha256sum -c` devuelve 1 en caso de fallo y un script puede actuar en consecuencia. `Get-FileHash` solo imprime un hash; la comparación depende de ti, y puedes equivocarte al examinarlo superficialmente.
- **Leer 64 caracteres hexadecimales a simple vista no es fiable.** Deja que la shell lo haga:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **En macOS:** el flujo de trabajo es el mismo, pero el entorno BSD incluye `shasum` en lugar de `sha256sum`; usa `shasum -a 256 -c --ignore-missing SHA256SUMS`. El autor de esta página no tenía una máquina macOS disponible, por lo que ese comando está documentado a partir de las herramientas de Apple en vez de haberse ejecutado. Si verificas en macOS, abre una PR confirmándolo o corrigiéndolo.

### Paso 3 — Verificar el paquete Sigstore

Sigstore sustituye las claves de firma de larga duración por certificados de corta duración vinculados a una identidad de CI, registrados en un registro público de transparencia. Nadie posee una clave de versión que pueda ser robada.

La ruta directa usa `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

Las dos opciones de `--certificate-*` son el punto central. **Sin ellas, solo confirmas que alguien, en algún lugar, firmó el archivo.** Con ellas, confirmas que fue firmado por un flujo de trabajo en el repositorio de Zebra, autenticado por el emisor OIDC de GitHub.

> ⚠️ **La versión importa.** Las compilaciones antiguas de cosign no pueden leer el formato actual de paquete Sigstore. Ejecutar lo anterior con cosign `v2.4.1` produce:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> El paquete *sí* contiene un certificado: se encuentra en `verificationMaterial.certificate.rawBytes`, donde las versiones anteriores no lo buscan. Es una limitación del cliente, no una versión defectuosa. Si te ocurre, actualiza cosign en vez de concluir que la descarga es mala. El cosign distribuido en paquetes suele estar muy por detrás de la versión upstream.

Los dos pasos siguientes muestran cómo verificar el mismo paquete manualmente, algo que conviene entender de todos modos y que es una alternativa viable cuando tu compilación de cosign no coopera.

### Paso 4 — Leer lo que realmente declara el certificado

Puedes inspeccionar el paquete sin `cosign`, lo que es útil para entender en qué estás confiando. Extrae el certificado:

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

El nombre alternativo del sujeto es la identidad. Nombra el repositorio, el archivo exacto del flujo de trabajo y la etiqueta. Sigstore incorpora más metadatos de compilación en extensiones personalizadas:

| Campo | Valor para v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Cada uno de estos elementos puede comprobarse. El hash del commit debe coincidir con la etiqueta en el repositorio; la ejecución del flujo de trabajo debe existir y ser pública.

### Paso 5 — Verificar criptográficamente la firma

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

El paquete también registra el resumen que firmó. Confirma que coincide con tu archivo local:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Paso 6 — La entrada del registro de transparencia

El paquete contiene una entrada Rekor que demuestra que la firma fue publicada en un registro público e inmutable:

| Campo | Valor |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

Esto es lo que hace detectable el uso indebido silencioso de una clave. Una firma que nunca apareció en el registro, o que apareció en un momento inverosímil, es una señal sobre la que vale la pena actuar. Compara la hora de integración con el anuncio de la versión.

> **Nota sobre la ruta de OpenSSL:** verifica la firma con la clave pública del certificado, pero por sí sola no valida la cadena de certificados hasta la raíz de Sigstore ni comprueba la prueba de inclusión de la entrada del registro. `cosign verify-blob` hace las tres cosas. Usa OpenSSL para entender el mecanismo; usa `cosign` como tu comprobación real.

---

## Parte 2 — Zallet: firmas GPG

Zallet publica un conjunto distinto de activos:

| Activo | Propósito |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | el archivo binario |
| `.tar.gz.asc` | firma GPG separada |
| `.tar.gz.intoto.jsonl` | certificación de procedencia SLSA |
| `.tar.gz.provenance.json` | metadatos de procedencia |
| `.tar.gz.sbom.spdx` | lista de materiales de software |

### Paso 1 — Identificar la clave de firma antes de buscarla

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

Esto no es un fallo. Te indica que existe una firma y nombra exactamente qué clave necesitas, **antes** de empezar a buscar. Anota la huella digital y el emisor, luego obtén la clave de una fuente independiente de la descarga.

> `gpg` imprime las marcas de tiempo en tu zona horaria local. La salida anterior muestra `WAT` (UTC+1); la misma firma se lee como `18:18:44 UTC` en otro lugar. Es el mismo instante. No trates una diferencia de zona horaria como una discrepancia.

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

`Good signature` es lo que buscabas. Dos cosas de esa salida confunden a la gente, y ambas son normales.

### Por qué la huella digital no coincide con el anuncio

La declaración de transición de clave de ZODL menciona la huella digital `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Pero `gpg --verify` informó `1FE9 9324 …  23F0 617F`. Parece una discrepancia, pero no lo es.

`gpg` informa la **subclave** que realizó la firma. El anuncio nombra la **clave primaria**. Confirma la relación por ti mismo:

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

La línea `sub` es la subclave de firma; la línea `pub` es la primaria. Una identidad, un paquete de claves. Por eso la salida de verificación imprime **ambas** huellas digitales: compara la *primaria* con cualquier anuncio publicado y toma la línea de subclave como indicación de qué parte de la clave realizó el trabajo.

Dividir las claves de este modo es deliberado: una subclave de firma puede rotarse o revocarse sin descartar la identidad primaria ni la confianza acumulada en ella.

### Qué significa la advertencia de `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Esto **no** es un problema con la firma. La firma es criptográficamente válida; eso es lo que declara `Good signature`. La advertencia dice algo diferente: no has indicado a tu GnuPG local que crees que esta clave pertenece a quien afirma ser.

GnuPG separa dos preguntas:

1. **¿Esta clave firmó este archivo?** — Respondida por `Good signature`. Criptográfica, sin juicio humano.
2. **¿Esta clave pertenece a ZODL?** — No responde la criptografía en absoluto. Lo estableces comprobando la huella digital contra una fuente independiente.

Verás esta advertencia en casi todas las verificaciones salvo que firmes explícitamente la clave de forma local. No la trates como un fallo. **Sí** trata la ausencia de `Good signature` como un fallo.

### Paso 3 — Verificar la propia transición de clave

La firma de versiones de Zcash pasó de Electric Coin Company a Zcash Open Development Lab en 2026, después de que ZODL se formara en enero de 2026 por el anterior equipo de ingeniería y producto de ECC.

| | Clave anterior | Clave nueva |
|---|---|---|
| Huella digital | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Tipo | RSA de 3072 bits, creada el 2023-06-19 | RSA de 4096 bits, creada el 2026-03-23, expira el 2028-03-22 |
| Publicada el | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Cronología publicada: nueva clave generada el 2026-03-23, anunciada el 2026-03-27, firma exclusiva desde el 2026-04-23, revocación de la clave anterior de ECC prevista para el 2026-06-23.

Un anuncio de rotación en un sitio web solo es tan fiable como el sitio web. El mecanismo correcto es una declaración **firmada en claro por ambas claves**, de modo que la clave anterior avale la nueva. ZODL publica exactamente eso:

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

Dos resultados de `Good signature` en un documento, de la clave anterior y de la nueva. Si confiabas en la clave de ECC para versiones anteriores, esa confianza ahora se traslada a la clave de ZODL sin que tengas que confiar en `zodl.com`, `apt.z.cash` ni una publicación de foro. Esta es la propiedad que debes buscar siempre que un proyecto rote claves, y su ausencia merece preguntas.

### Dónde obtener una clave y dónde no

Ordenadas de mejor a peor:

1. **Una declaración firmada por la clave anterior**, como la anterior. La opción más sólida después de una rotación.
2. **Una fuente independiente de la descarga.** El binario provino de GitHub; la clave provino de `apt.z.cash`. Un atacante necesita controlar ambos.
3. **Un servidor de claves, comprobado con una huella digital publicada.** Cualquiera puede cargar en la mayoría de los servidores de claves una clave que afirme cualquier identidad. La comparación de la huella digital es lo que hace esto seguro, no el servidor de claves.
4. **La misma página que el binario.** Casi ninguna garantía. Quien pueda sustituir uno puede sustituir el otro.

Compara siempre la huella digital **completa** con la clave **primaria**. Los ID de clave cortos son trivialmente susceptibles de colisiones y se han usado en ataques reales.

## Parte 3 — Una verificación que falla

La verificación solo es útil si sabes cómo se ve un fallo. Aquí tienes uno real, producido al añadir un único byte nulo a un archivo válido:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Salida real:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Código de salida: `1`.

Coloca los dos resúmenes uno al lado del otro:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Un byte añadido a un archivo de 66.992.676 bytes. Los dos hashes no comparten nada: ni un prefijo ni un patrón. No hay coincidencia parcial ni «lo suficientemente cercano»: una suma de comprobación coincide exactamente o el archivo no es el que querías.

### Qué hacer cuando esto ocurre

1. **No ejecutes el binario.** No lo extraigas, no lo `chmod +x`.
2. **Inténtalo de nuevo desde la página oficial de versiones.** La mayoría de los fallos son descargas truncadas.
3. **Si falla una segunda vez, cambia la ruta de red.** Otra conexión o una VPN. Un fallo que te acompaña a través de redes es distinto de uno que no.
4. **Confirma que tienes el archivo de suma de comprobación correcto para la versión correcta.** Comparar las sumas de v6.3.0 con v6.2.3 fallará correctamente.
5. **Si sigue fallando, repórtalo.** Abre un issue en el repositorio del proyecto o usa el contacto de seguridad en `SECURITY.md` para cualquier cosa que sospeches que es deliberada. Consulta la página de [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) para los canales de divulgación.
6. **Conserva el artefacto.** Un binario manipulado es evidencia. No lo elimines antes de reportarlo.

Un fallo de firma es más grave que un fallo de suma de comprobación. Una discrepancia de suma de comprobación suele ser corrupción; un archivo válido con una firma incorrecta no es algo que ocurra por accidente.

---

## Parte 4 — Tabla de referencia

| Proyecto | Versiones publicadas en | Método | De dónde proviene la clave |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Sin clave: identidad de CI mediante OIDC de GitHub |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc`: primaria `0338 34DD…58E2 6AB1`, subclave de firma `1FE9 9324…23F0 617F` |
| **zcashd** | *retirado* | — | Detenido en el bloque [block] 3.417.100 el 2026-07-18. No lo instales. |
| **Zodl** (antes Zashi) | App Store / Google Play; `zodl-inc` en GitHub | Store signing; standalone Android binaries GPG-signed | Clave de ZODL según declaración de transición |

> **Nota de denominación:** Zashi cambió su marca a **Zodl** en 2026, primero en App Store y después en Google Play. Las guías antiguas que mencionan «Zashi» describen el mismo linaje de billetera.

---

## Parte 5 — Billeteras móviles y hardware wallets

La verificación funciona de manera diferente cuando abandonas las descargas directas.

**Tiendas de aplicaciones.** No puedes comprobar una firma tú mismo. La tienda firma el paquete y confías en la revisión de la tienda y en la integridad de la cuenta del desarrollador [developer]. Lo que *sí* puedes verificar es que tienes la aplicación correcta: confirma el nombre del editor y el identificador del paquete con el sitio oficial del proyecto, no con los resultados de búsqueda. Las aplicaciones de suplantación son comunes, y una ficha de tienda no es evidencia de autenticidad.

**APKs independientes de Android.** Estas *pueden* verificarse. ZODL publica binarios independientes de Android firmados con GPG mediante Releases de GitHub, por lo que se aplica el flujo de trabajo de la Parte 2. Prefiere esta ruta si quieres una cadena comprobable.

**Hardware wallets.** El dispositivo certifica su propio firmware, por lo que el ancla de confianza es el hardware, no un archivo en tu máquina. Consulta [Keystone Zashi](/guides/keystone-zashi) para el flujo de verificación del dispositivo. Compra directamente al fabricante: la manipulación de la cadena de suministro ocurre entre la fábrica y el comprador.

---

## Lecturas adicionales

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) — política de divulgación y contactos de seguridad
- [Zebra Nodo completo](/zcash-tech/zebra-full-node) — instalar Zebra después de verificarlo
- [Zallet Guía de referencia rápida](/using-zcash/zallet-quick-reference-guide) — usar Zallet
- [Documentación de Sigstore](https://docs.sigstore.dev/)
- [Niveles de procedencia SLSA](https://slsa.dev/)

---

*Los comandos de esta página se ejecutaron con Zebra `v6.3.0` y Zallet `v0.1.0-beta.2` el 2026-08-18. Las herramientas de versiones cambian: si la salida difiere de la mostrada aquí, confía en tu propia ejecución y abre una PR.*
