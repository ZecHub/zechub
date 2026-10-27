<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verificação de lançamentos do Zcash

## TL;DR

- Baixar um binário do Zcash não é o mesmo que obter aquele que o projeto publicou. A verificação é como você diferencia os dois.
- Um checksum prova que o arquivo chegou intacto. Uma **assinatura** prova quem o produziu. Você precisa dos dois, e um checksum sozinho prova muito pouco.
- Zebra publica um arquivo `SHA256SUMS` mais um bundle **Sigstore** que vincula o lançamento a um workflow, tag e commit específicos do GitHub Actions — sem necessidade de gerenciamento de chaves.
- Zallet publica assinaturas **GPG** destacadas (`.asc`) juntamente com proveniência SLSA e um SBOM.
- A chave de assinatura do Zcash foi alternada em 2026 da Electric Coin Company para a Zcash Open Development Lab (ZODL). Se você verificou lançamentos mais antigos, precisa da nova chave — e a declaração de transição está assinada por ambas as chaves, para que você possa verificar a própria rotação.
- O `gpg` informa a **subchave** que assinou um arquivo, não a chave primária mencionada nos anúncios. Uma fingerprint que parece errada geralmente é uma subchave, não um ataque.
- Se a verificação falhar, não execute o binário.

*Verificado com Zebra `v6.3.0` e Zallet `v0.1.0-beta.2` em 2026-08-18.*

## Por que isso é mais importante para o Zcash

Um binário de carteira adulterado pode exfiltrar uma chave de gastos ou uma chave de visualização. Ao contrário de uma senha comprometida, essa perda é permanente: não há reversão, nem chargeback, nem suporte ao cliente. As transações blindadas protegem o que acontece *on-chain* — não oferecem proteção alguma quando o software que você está executando foi substituído antes mesmo de chegar até você.

Este é um dos poucos vetores de ataque em que as garantias de privacidade do protocolo simplesmente não são relevantes. A verificação é a camada que o cobre.

## Modelo de ameaça — o que a verificação detecta e o que não detecta

**Detecta:**

- Um mirror adulterado ou um arquivo modificado servido de algum lugar que não seja a página de lançamentos do projeto.
- Uma conversão man-in-the-middle durante o download.
- Uma CDN comprometida ou um host de distribuição sequestrado.
- Corrupção acidental em trânsito.

**Não detecta:**

- Um maintainer que assina código malicioso. A assinatura será verificada corretamente; ela prova a origem, não a intenção.
- Um host de build comprometido que produz um artefato assinado, mas malicioso. É para reduzir isso que existem builds reproduzíveis e atestações de proveniência.
- Uma chave que você obteve da mesma fonte comprometida que o binário. Se um atacante controlar tanto o arquivo quanto a chave com a qual você o verifica, a verificação não diz nada a você.

Esse último ponto é o que a maioria dos guias ignora. **De onde você obtém a chave é tão importante quanto executar o comando.**

---

## Parte 1 — Zebra: checksums e Sigstore

Zebra publica estes recursos para cada lançamento:

| Asset | Finalidade |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | o arquivo binário |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum por arquivo |
| `SHA256SUMS` | checksums para todas as arquiteturas |
| `SHA256SUMS.sigstore.json` | bundle Sigstore que assina `SHA256SUMS` |

### Passo 1 — Baixar

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Passo 2 — Verificar o checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Saída real:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

`--ignore-missing` é necessário aqui porque `SHA256SUMS` cobre todas as arquiteturas e você baixou apenas uma. Sem isso, o `sha256sum` informa o arquivo aarch64 ausente como uma falha e você pode interpretar erroneamente uma aprovação como uma falha.

A variante por arquivo também funciona:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Este passo sozinho não é suficiente.** Você baixou o checksum do mesmo lugar que o binário. Qualquer pessoa que pudesse substituir um poderia substituir o outro. O checksum prova a integridade; o próximo passo prova a origem.

### Passo 2b — A mesma verificação no Windows

O PowerShell não tem um modo de verificação `-c`, então você compara manualmente:

```powershell
Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256 | Format-List
```

Saída real:

```
Algorithm : SHA256
Hash      : 86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
Path      : \\wsl$\Ubuntu\home\briefking\verify\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
```

Compare isso com o resultado do Linux mostrado anteriormente nesta página:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Valores idênticos.** Hexadecimal não diferencia maiúsculas de minúsculas, e este é o falso alarme mais comum no Windows.

Mais duas armadilhas específicas do Windows:

- **Não há código de saída para verificar.** No Linux, `sha256sum -c` retorna 1 em caso de falha e um script pode agir de acordo. `Get-FileHash` apenas imprime um hash — a comparação cabe a você, assim como o risco de errar ao ler rapidamente.
- **Ler 64 caracteres hexadecimais a olho não é confiável.** Deixe o shell fazer isso:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **No macOS:** o fluxo é o mesmo, mas o userland BSD inclui `shasum` em vez de `sha256sum` — use `shasum -a 256 -c --ignore-missing SHA256SUMS`. O autor desta página não tinha nenhuma máquina macOS disponível, então esse comando está documentado com base nas ferramentas da Apple em vez de ter sido executado. Se você verificar no macOS, abra um PR confirmando ou corrigindo-o.

### Passo 3 — Verificar o bundle Sigstore

O Sigstore substitui chaves de assinatura de longa duração por certificados de curta duração vinculados a uma identidade de CI, registrados em um log público de transparência. Ninguém mantém uma chave de lançamento que possa ser roubada.

O caminho mais direto usa `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

As duas flags `--certificate-*` são o ponto central. **Sem elas, você está apenas confirmando que alguém, em algum lugar, assinou o arquivo.** Com elas, você está confirmando que ele foi assinado por um workflow no repositório Zebra, autenticado pelo emissor OIDC do GitHub.

> ⚠️ **A versão importa.** Builds mais antigas do cosign não conseguem ler o formato atual do bundle Sigstore. Executar o comando acima com cosign `v2.4.1` produz:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> O bundle *contém* um certificado — ele fica em `verificationMaterial.certificate.rawBytes`, onde versões mais antigas não procuram. Isso é uma limitação do cliente, não um lançamento corrompido. Se você encontrar isso, atualize o cosign em vez de concluir que o download está comprometido. O cosign empacotado por distribuições costuma estar bem defasado em relação ao upstream.

Os dois passos seguintes mostram como verificar manualmente o mesmo bundle, algo que vale a pena entender de qualquer forma — e uma alternativa viável quando sua build do cosign não coopera.

### Passo 4 — Ler o que o certificado realmente declara

Você pode inspecionar o bundle sem `cosign`, o que é útil para entender em que está confiando. Extraia o certificado:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Saída real para Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

O Subject Alternative Name é a identidade. Ele nomeia o repositório, o arquivo exato do workflow e a tag. O Sigstore incorpora mais metadados de build em extensões personalizadas:

| Field | Valor para v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Cada um desses itens pode ser verificado. O hash do commit deve corresponder à tag no repositório; a execução do workflow deve existir e ser pública.

### Passo 5 — Verificar a assinatura criptograficamente

Você pode confirmar a assinatura diretamente com OpenSSL:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('sig.bin','wb').write(base64.b64decode(d['messageSignature']['signature']))"

openssl x509 -in cert.der -inform DER -pubkey -noout > pub.pem
openssl dgst -sha256 -verify pub.pem -signature sig.bin SHA256SUMS
```

Saída real:

```
Verified OK
```

O bundle também registra o digest que assinou. Confirme que ele corresponde ao seu arquivo local:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Passo 6 — A entrada do log de transparência

O bundle contém uma entrada Rekor que prova que a assinatura foi publicada em um log público append-only:

| Field | Valor |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

É isso que torna detectável o uso indevido silencioso de chaves. Uma assinatura que nunca apareceu no log, ou que apareceu em um momento implausível, é um sinal que vale a pena levar a sério. Compare o momento da integração com o anúncio do lançamento.

> **Nota sobre o caminho do OpenSSL:** ele verifica a assinatura com a chave pública do certificado, mas não valida por si só a cadeia de certificados até a root do Sigstore nem verifica a prova de inclusão da entrada no log. `cosign verify-blob` faz as três coisas. Use OpenSSL para entender o mecanismo; use `cosign` como sua verificação efetiva.

---

## Parte 2 — Zallet: assinaturas GPG

Zallet publica um conjunto diferente de recursos:

| Asset | Finalidade |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | o arquivo binário |
| `.tar.gz.asc` | assinatura GPG destacada |
| `.tar.gz.intoto.jsonl` | atestação de proveniência SLSA |
| `.tar.gz.provenance.json` | metadados de proveniência |
| `.tar.gz.sbom.spdx` | lista de materiais de software |

### Passo 1 — Identificar a chave de assinatura antes de procurá-la

Execute a verificação *primeiro*, sem nenhuma chave importada:

```bash
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Saída real:

```
gpg: Signature made Tue Jul 28 19:18:44 2026 WAT
gpg:                using RSA key 1FE99324758F296718B457067F4BBBBA23F0617F
gpg:                issuer "sysadmin@zodl.com"
gpg: Can't check signature: No public key
```

Isso não é uma falha. Isso informa que existe uma assinatura e indica exatamente de qual chave você precisa, **antes** de começar a procurar. Anote a fingerprint e o emissor, depois obtenha a chave de uma fonte independente do download.

> O `gpg` imprime timestamps no seu fuso horário local. A saída acima mostra `WAT` (UTC+1); em outro lugar, a mesma assinatura aparece como `18:18:44 UTC`. É o mesmo instante. Não trate uma diferença de fuso horário como incompatibilidade.

### Passo 2 — Importar a chave e verificar

```bash
curl -sL https://apt.z.cash/zodl.asc -o zodl.asc
gpg --import zodl.asc
gpg --verify zallet-v0.1.0-beta.2-linux-amd64.tar.gz.asc \
             zallet-v0.1.0-beta.2-linux-amd64.tar.gz
```

Saída real:

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

`Good signature` era o que você queria. Há duas coisas nessa saída que confundem as pessoas, e ambas são normais.

### Por que a fingerprint não corresponde ao anúncio

A declaração de transição da chave ZODL indica a fingerprint `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Mas `gpg --verify` reportou `1FE9 9324 …  23F0 617F`. Isso parece uma incompatibilidade, mas não é.

O `gpg` reporta a **subchave** que fez a assinatura. O anúncio menciona a **chave primária**. Confirme você mesmo a relação:

```bash
gpg --list-keys --with-subkey-fingerprints sysadmin@zodl.com
```

Saída real:

```
pub   rsa4096 2026-03-23 [SCEA]
      033834DD49DECF9DBB9934BC6C93CA8E58E26AB1
uid           [ unknown] Zcash Open Development Lab (ZODL) (Dallas, Texas) <sysadmin@zodl.com>
sub   rsa4096 2026-03-23 [SEA]
      1FE99324758F296718B457067F4BBBBA23F0617F
```

A linha `sub` é a subchave de assinatura; a linha `pub` é a primária. Uma identidade, um pacote de chaves. É por isso que a saída de verificação imprime **ambas** as fingerprints — compare a *primária* com qualquer anúncio publicado e considere a linha da subchave como a indicação de qual parte da chave fez o trabalho.

Dividir chaves dessa forma é deliberado: uma subchave de assinatura pode ser alternada ou revogada sem descartar a identidade primária e a confiança acumulada nela.

### O que significa o aviso `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Isso **não** é um problema com a assinatura. A assinatura é criptograficamente válida — é isso que `Good signature` afirma. O aviso diz outra coisa: você ainda não informou ao seu GnuPG local que acredita que esta chave pertence a quem afirma pertencer.

O GnuPG separa duas perguntas:

1. **Foi esta chave que assinou este arquivo?** — Respondido por `Good signature`. Criptográfico, sem julgamento humano.
2. **Esta chave pertence à ZODL?** — Isso não é respondido pela criptografia. Você estabelece isso verificando a fingerprint em uma fonte independente.

Você verá este aviso em quase todas as verificações, a menos que assine explicitamente a chave localmente. Não o trate como falha. **Trate** a ausência de `Good signature` como falha.

### Passo 3 — Verificar a própria transição de chave

A assinatura de lançamentos do Zcash passou da Electric Coin Company para a Zcash Open Development Lab em 2026, depois que a ZODL foi formada em janeiro de 2026 pela antiga equipe de engenharia e produto da ECC.

| | Chave antiga | Nova chave |
|---|---|---|
| Fingerprint | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Type | RSA 3072-bit, criada em 2023-06-19 | RSA 4096-bit, criada em 2026-03-23, expira em 2028-03-22 |
| Published at | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Cronologia publicada: nova chave gerada em 2026-03-23, anunciada em 2026-03-27, assinatura exclusiva a partir de 2026-04-23, revogação da antiga chave ECC planejada para 2026-06-23.

Um anúncio de rotação em um website é confiável apenas na medida em que o próprio website é confiável. O mecanismo correto é uma declaração **clear-signed por ambas as chaves**, de forma que a chave antiga ateste a nova. A ZODL publica exatamente isso:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Saída real (abreviada — duas assinaturas em um só documento):

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

Dois resultados `Good signature` em um só documento, da chave antiga e da nova. Se você confiava na chave ECC para lançamentos anteriores, essa confiança agora se estende à chave ZODL sem que você precise confiar em `zodl.com`, `apt.z.cash` ou em uma publicação de fórum. Esta é a propriedade que você deve procurar sempre que um projeto alterna chaves — e vale a pena perguntar sobre sua ausência.

### Onde obter uma chave — e onde não obter

Em ordem do melhor para o pior:

1. **Uma declaração assinada pela chave anterior**, como acima. A opção mais forte após uma rotação.
2. **Uma fonte independente do download.** O binário veio do GitHub; a chave veio de `apt.z.cash`. Um atacante precisa comprometer ambos.
3. **Um keyserver, com verificação cruzada contra uma fingerprint publicada.** Qualquer pessoa pode carregar uma chave alegando qualquer identidade na maioria dos keyservers. A comparação da fingerprint é o que torna isso seguro — não o keyserver.
4. **A mesma página do binário.** Quase nenhuma garantia. Quem consegue substituir um consegue substituir o outro.

Sempre compare a fingerprint **completa** com a chave **primária**. IDs curtos de chave são trivialmente suscetíveis a colisões e já foram usados em ataques reais.

## Parte 3 — Uma verificação que falha

A verificação só é útil se você souber como é uma falha. Aqui está um exemplo real, produzido ao adicionar um único byte nulo a um arquivo válido:

```bash
cp zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
sha256sum tampered.tar.gz > tampered.sha256
printf '\x00' >> tampered.tar.gz
sha256sum -c tampered.sha256
```

Saída real:

```
tampered.tar.gz: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
```

Código de saída: `1`.

Coloque os dois digests lado a lado:

```bash
sha256sum zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz tampered.tar.gz
```

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e  zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
8d4e2e22adcb014e006fafc71a974f987ba11297587f593cf89eb9bb1feff0b5  tampered.tar.gz
```

Um byte adicionado a um arquivo de 66,992,676 bytes. Os dois hashes não compartilham nada — nem um prefixo, nem um padrão. Não existe correspondência parcial nem "próximo o suficiente": um checksum ou corresponde exatamente, ou o arquivo não é o arquivo que você queria.

### O que fazer quando isso acontece

1. **Não execute o binário.** Não o extraia, não faça `chmod +x` nele.
2. **Tente novamente na página oficial de lançamentos.** A maioria das falhas são downloads truncados.
3. **Se falhar uma segunda vez, mude o caminho de rede.** Use uma conexão diferente ou uma VPN. Uma falha que acompanha você em várias redes é diferente de uma que não acompanha.
4. **Confirme que você tem o arquivo de checksum correto para a versão correta.** Comparar somas de v6.3.0 com v6.2.3 falhará corretamente.
5. **Se continuar falhando, reporte.** Abra uma issue no repositório do projeto ou use o contato de segurança em `SECURITY.md` para qualquer coisa que você suspeite ser deliberada. Consulte a página [Segurança do ecossistema Zcash](/zcash-community/zcash-ecosystem-security) para conhecer os canais de divulgação.
6. **Guarde o artefato.** Um binário adulterado é prova. Não o exclua antes de reportar.

Uma falha de assinatura é mais séria do que uma falha de checksum. Uma incompatibilidade de checksum geralmente é corrupção; um arquivo válido com assinatura inválida não é algo que acontece por acidente.

---

## Parte 4 — Tabela de referência

| Project | Lançamentos publicados em | Método | De onde vem a chave |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Sem chave — identidade de CI via GitHub OIDC |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc` — primária `0338 34DD…58E2 6AB1`, subchave de assinatura `1FE9 9324…23F0 617F` |
| **zcashd** | *retired* | — | Interrompido no bloco 3,417,100 em 2026-07-18. Não instale. |
| **Zodl** (anteriormente Zashi) | App Store / Google Play; `zodl-inc` no GitHub | Store signing; standalone Android binaries GPG-signed | Chave ZODL conforme a declaração de transição |

> **Nota sobre o nome:** Zashi foi renomeado para **Zodl** em 2026 — primeiro na App Store, depois no Google Play. Guias mais antigos que se referem a "Zashi" descrevem a mesma linhagem de carteira.

---

## Parte 5 — Carteiras móveis e carteiras de hardware

A verificação funciona de forma diferente quando você deixa os downloads diretos.

**App stores.** Você não pode verificar uma assinatura por conta própria. A loja assina o pacote e você está confiando na revisão da loja e na integridade da conta do desenvolvedor. O que você *pode* verificar é se tem o app correto: confirme o nome do publicador e o identificador do pacote no site oficial do projeto, não nos resultados de pesquisa. Apps de imitação são comuns, e uma listagem na loja não é prova de autenticidade.

**APKs Android independentes.** Estes *podem* ser verificados. A ZODL publica binários Android independentes assinados com GPG por meio do GitHub Releases, portanto o fluxo da Parte 2 se aplica. Prefira esse caminho se você quiser uma chain verificável.

**Carteiras de hardware.** O dispositivo atesta seu próprio firmware, portanto a âncora de confiança é o hardware, não um arquivo na sua máquina. Consulte [Keystone Zashi](/guides/keystone-zashi) para conhecer o fluxo de verificação do dispositivo. Compre diretamente do fabricante — adulterações na cadeia de suprimentos acontecem entre a fábrica e o comprador.

---

## Leitura adicional

- [Segurança do ecossistema Zcash](/zcash-community/zcash-ecosystem-security) — política de divulgação e contatos de segurança
- [Nó integral Zebra](/zcash-tech/zebra-full-node) — instale o Zebra depois de verificá-lo
- [Guia de referência rápida do Zallet](/using-zcash/zallet-quick-reference-guide) — usando o Zallet
- [Documentação do Sigstore](https://docs.sigstore.dev/)
- [Níveis de proveniência do SLSA](https://slsa.dev/)

---

*Os comandos desta página foram executados com Zebra `v6.3.0` e Zallet `v0.1.0-beta.2` em 2026-08-18. As ferramentas de lançamento mudam: se a saída diferir do que é mostrado aqui, confie na sua própria execução e, por favor, abra um PR.*
