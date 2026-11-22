<a href="https://github.com/zechub/zechub/edit/main/site/guides/Verifying_Zcash_Releases.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Verificando releases do Zcash

## TL;DR

- Baixar um binário do Zcash não é o mesmo que obter aquele que o projeto publicou. A verificação é como você distingue um do outro.
- Um checksum prova que o arquivo chegou íntegro. Uma **assinatura** prova quem o produziu. Você precisa dos dois, e um checksum sozinho prova muito pouco.
- O Zebra publica um arquivo `SHA256SUMS` e um bundle do **Sigstore** que vincula a release a um workflow específico do GitHub Actions, a uma tag e a um commit, sem nenhuma necessidade de gerenciar chaves.
- O Zallet publica assinaturas **GPG** destacadas (`.asc`) junto com a proveniência SLSA e um SBOM.
- A chave de assinatura do Zcash foi rotacionada em 2026, passando da Electric Coin Company para o Zcash Open Development Lab (ZODL). Se você verificou releases mais antigas, precisa da nova chave. A declaração de transição é assinada pelas duas chaves, então você pode verificar a própria rotação.
- O `gpg` informa a **subchave** que assinou um arquivo, não a chave primária citada nos anúncios. Uma impressão digital que parece errada geralmente é uma subchave, não um ataque.
- Se a verificação falhar, não execute o binário.

*Verificado com Zebra `v6.3.0` e Zallet `v0.1.0-beta.2` em 2026-08-18.*

## Por que isso importa ainda mais para o Zcash

Um binário de carteira adulterado pode extrair uma chave de gastos ou uma chave de visualização. Ao contrário de uma senha comprometida, essa perda é permanente: não há reversão, não há estorno e não há central de suporte. As transações blindadas protegem o que acontece *on-chain*, mas não oferecem nenhuma proteção quando o software que você está executando foi substituído antes mesmo de chegar até você.

Este é um dos poucos vetores de ataque em que as garantias de privacidade do protocolo simplesmente não se aplicam. A verificação é a camada que cobre esse risco.

## Modelo de ameaças: o que a verificação detecta e o que não detecta

**Detecta:**

- Um espelho adulterado ou um arquivo modificado servido de algum lugar que não seja a página de releases do projeto.
- Uma substituição por man-in-the-middle durante o download.
- Uma CDN comprometida ou um host de distribuição sequestrado.
- Corrupção acidental durante a transferência.

**Não detecta:**

- Um mantenedor que assina código malicioso. A assinatura será verificada corretamente: ela prova a origem, não a intenção.
- Um host de build comprometido que produz um artefato assinado, mas malicioso. É para reduzir esse risco que existem builds reproduzíveis e atestados de proveniência.
- Uma chave que você obteve da mesma fonte comprometida que o binário. Se um atacante controla tanto o arquivo quanto a chave com que você o verifica, a verificação não diz nada.

Esse último ponto é o que a maioria dos guias ignora. **O lugar de onde você obtém a chave importa tanto quanto executar o comando.**

---

## Parte 1: Zebra, checksums e Sigstore

O Zebra publica estes arquivos para cada release:

| Arquivo | Finalidade |
|---|---|
| `zebrad-<version>-<arch>.tar.gz` | o arquivo compactado do binário |
| `zebrad-<version>-<arch>.tar.gz.sha256` | checksum por arquivo |
| `SHA256SUMS` | checksums de todas as arquiteturas |
| `SHA256SUMS.sigstore.json` | bundle do Sigstore que assina `SHA256SUMS` |

### Passo 1: baixe

```bash
BASE=https://github.com/ZcashFoundation/zebra/releases/download/v6.3.0
curl -sLO $BASE/zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz
curl -sLO $BASE/SHA256SUMS
curl -sLO $BASE/SHA256SUMS.sigstore.json
```

### Passo 2: confira o checksum

```bash
sha256sum -c --ignore-missing SHA256SUMS
```

Saída real:

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

O `--ignore-missing` é necessário aqui porque o `SHA256SUMS` cobre todas as arquiteturas e você baixou apenas uma. Sem ele, o `sha256sum` informa o arquivo aarch64 ausente como uma falha, e você pode interpretar um sucesso como uma falha.

A variante por arquivo também funciona:

```bash
sha256sum -c zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz.sha256
```

```
zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz: OK
```

**Este passo sozinho não é suficiente.** Você baixou o checksum do mesmo lugar que o binário. Quem conseguisse substituir um poderia substituir o outro. O checksum prova a integridade; o próximo passo prova a origem.

### Passo 2b: a mesma verificação no Windows

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

Compare com o resultado do Linux mostrado antes nesta página:

```
86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e
86326F5324F4E59CC2008C15F94407CC8D5FEACF75D64942164BB5F08ECA8C5E
```

**Valores idênticos.** Hexadecimal não diferencia maiúsculas de minúsculas, e esse é o alarme falso mais comum no Windows.

Mais duas armadilhas específicas do Windows:

- **Não há código de saída para verificar.** No Linux, o `sha256sum -c` retorna 1 em caso de falha e um script pode agir com base nisso. O `Get-FileHash` apenas imprime um hash: a comparação fica por sua conta, e é você quem pode errar ao passar os olhos rapidamente.
- **Ler 64 caracteres hexadecimais a olho nu não é confiável.** Deixe o shell fazer isso:

```powershell
$expected = "86326f5324f4e59cc2008c15f94407cc8d5feacf75d64942164bb5f08eca8c5e"
$actual = (Get-FileHash .\zebrad-6.3.0-x86_64-unknown-linux-gnu.tar.gz -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

> **No macOS:** o fluxo é o mesmo, mas o userland BSD inclui o `shasum` em vez do `sha256sum`, então use `shasum -a 256 -c --ignore-missing SHA256SUMS`. O autor desta página não tinha uma máquina macOS disponível, por isso esse comando está documentado com base nas ferramentas da Apple, sem ter sido executado. Se você fizer a verificação no macOS, abra um PR confirmando ou corrigindo.

### Passo 3: verifique o bundle do Sigstore

O Sigstore substitui chaves de assinatura de longa duração por certificados de curta duração vinculados a uma identidade de CI, registrados em um log público de transparência. Ninguém guarda uma chave de release que possa ser roubada.

O caminho mais direto usa o `cosign`:

```bash
cosign verify-blob \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/ZcashFoundation/zebra/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  SHA256SUMS
```

As duas flags `--certificate-*` são o ponto principal. **Sem elas, você está apenas confirmando que alguém, em algum lugar, assinou o arquivo.** Com elas, você confirma que o arquivo foi assinado por um workflow no repositório Zebra, autenticado pelo emissor OIDC do GitHub.

> ⚠️ **A versão importa.** Builds mais antigos do cosign não conseguem ler o formato atual de bundle do Sigstore. Executar o comando acima com o cosign `v2.4.1` produz:
>
> ```
> Error: bundle does not contain cert for verification, please provide public key
> ```
>
> O bundle *contém* um certificado: ele fica em `verificationMaterial.certificate.rawBytes`, que as versões mais antigas não procuram. Isso é uma limitação do cliente, não uma release com defeito. Se você se deparar com isso, atualize o cosign em vez de concluir que o download está ruim. O cosign empacotado pelas distribuições costuma estar bem atrás da versão upstream.

Os dois próximos passos mostram como verificar o mesmo bundle manualmente, o que vale a pena entender de qualquer forma, e é uma alternativa viável quando o seu build do cosign não colabora.

### Passo 4: leia o que o certificado realmente afirma

Você pode inspecionar o bundle sem o `cosign`, o que é útil para entender em que você está confiando. Extraia o certificado:

```bash
python3 -c "
import json,base64
d=json.load(open('SHA256SUMS.sigstore.json'))
open('cert.der','wb').write(base64.b64decode(d['verificationMaterial']['certificate']['rawBytes']))"

openssl x509 -in cert.der -inform DER -noout -issuer -ext subjectAltName
```

Saída real para o Zebra v6.3.0:

```
issuer=O = sigstore.dev, CN = sigstore-intermediate
X509v3 Subject Alternative Name: critical
    URI:https://github.com/ZcashFoundation/zebra/.github/workflows/zfnd-release-binaries.yml@refs/tags/v6.3.0
```

O Subject Alternative Name é a identidade. Ele indica o repositório, o arquivo exato do workflow e a tag. O Sigstore incorpora outros metadados do build em extensões personalizadas:

| Campo | Valor para a v6.3.0 |
|---|---|
| OIDC issuer | `https://token.actions.githubusercontent.com` |
| Source repository | `https://github.com/ZcashFoundation/zebra` |
| Build commit | `f5c5277fe41eba9c74f37098738f93f35dd70d60` |
| Ref | `refs/tags/v6.3.0` |
| Runner environment | `github-hosted` |
| Workflow run | `.../actions/runs/31424510487/attempts/1` |
| Repository visibility | `public` |

Cada um desses valores pode ser verificado. O hash do commit deve corresponder à tag no repositório; a execução do workflow deve existir e ser pública.

### Passo 5: verifique a assinatura criptograficamente

Você pode confirmar a assinatura diretamente com o OpenSSL:

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

O bundle também registra o digest que foi assinado. Confirme que ele corresponde ao seu arquivo local:

```
bundle digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
local  digest : 3eb5de0634f637e793d0411b6c7108802a36e1219f9151803ecc6108fd0f59f6
```

### Passo 6: a entrada no log de transparência

O bundle traz uma entrada do Rekor que prova que a assinatura foi publicada em um log público do tipo append-only:

| Campo | Valor |
|---|---|
| Rekor log index | `2412071838` |
| Entry type | `hashedrekord v0.0.1` |
| Integrated at | 2026-08-10 19:43:09 UTC |

É isso que torna detectável o uso indevido silencioso de uma chave. Uma assinatura que nunca apareceu no log, ou que apareceu em um horário implausível, é um sinal que merece ação. Compare o horário de integração com o anúncio da release.

> **Observação sobre o caminho com OpenSSL:** ele verifica a assinatura com a chave pública do certificado, mas não valida, por si só, a cadeia de certificados até a raiz do Sigstore nem verifica a prova de inclusão da entrada no log. O `cosign verify-blob` faz as três coisas. Use o OpenSSL para entender o mecanismo; use o `cosign` como sua verificação de fato.

---

## Parte 2: Zallet, assinaturas GPG

O Zallet publica um conjunto diferente de arquivos:

| Arquivo | Finalidade |
|---|---|
| `zallet-<version>-<platform>.tar.gz` | o arquivo compactado do binário |
| `.tar.gz.asc` | assinatura GPG destacada |
| `.tar.gz.intoto.jsonl` | atestado de proveniência SLSA |
| `.tar.gz.provenance.json` | metadados de proveniência |
| `.tar.gz.sbom.spdx` | lista de materiais de software |

### Passo 1: identifique a chave de assinatura antes de procurá-la

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

Isso não é uma falha. A saída informa que existe uma assinatura e indica exatamente qual chave você precisa, **antes** de você começar a procurar. Anote a impressão digital e o emissor e, em seguida, obtenha a chave de uma fonte independente do download.

> O `gpg` imprime os horários no seu fuso horário local. A saída acima mostra `WAT` (UTC+1); a mesma assinatura aparece como `18:18:44 UTC` em outro lugar. É o mesmo instante. Não trate uma diferença de fuso horário como uma divergência.

### Passo 2: importe a chave e verifique

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

O `Good signature` é o que você queria. Duas coisas nessa saída confundem as pessoas, e ambas são normais.

### Por que a impressão digital não corresponde ao anúncio

A declaração de transição de chave do ZODL cita a impressão digital `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1`. Mas o `gpg --verify` informou `1FE9 9324 …  23F0 617F`. Parece uma divergência, mas não é.

O `gpg` informa a **subchave** que gerou a assinatura. O anúncio cita a **chave primária**. Confirme a relação você mesmo:

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

A linha `sub` é a subchave de assinatura; a linha `pub` é a primária. Uma identidade, um pacote de chaves. É por isso que a saída da verificação imprime **as duas** impressões digitais: compare a *primária* com qualquer anúncio publicado e entenda a linha da subchave como a indicação de qual parte da chave fez o trabalho.

Dividir as chaves dessa forma é intencional: uma subchave de assinatura pode ser rotacionada ou revogada sem descartar a identidade primária e a confiança acumulada por ela.

### O que significa o aviso `[unknown]`

```
gpg: WARNING: The key's User ID is not certified with a trusted signature!
```

Isso **não** é um problema com a assinatura. A assinatura é criptograficamente válida, e é isso que `Good signature` afirma. O aviso diz outra coisa: você não informou ao seu GnuPG local que acredita que essa chave pertence a quem ela diz pertencer.

O GnuPG separa duas perguntas:

1. **Esta chave assinou este arquivo?** Respondida pelo `Good signature`. Criptográfica, sem julgamento humano.
2. **Esta chave pertence ao ZODL?** Não é respondida pela criptografia. Você estabelece isso conferindo a impressão digital com uma fonte independente.

Você verá esse aviso em quase todas as verificações, a menos que assine a chave localmente de forma explícita. Não o trate como falha. **Trate**, sim, a ausência de `Good signature` como falha.

### Passo 3: verifique a própria transição de chave

A assinatura das releases do Zcash passou da Electric Coin Company para o Zcash Open Development Lab em 2026, depois que o ZODL foi formado em janeiro de 2026 pela antiga equipe de engenharia e produto da ECC.

| | Chave antiga | Chave nova |
|---|---|---|
| Impressão digital | `B1C9 095E AA18 48DB B54D 9DDA 1D05 FDC6 6B37 2CFE` | `0338 34DD 49DE CF9D BB99 34BC 6C93 CA8E 58E2 6AB1` |
| UID | Zcash Master Signing Key (ECC) `<sysadmin@z.cash>` | Zcash Open Development Lab (ZODL) `<sysadmin@zodl.com>` |
| Tipo | RSA 3072 bits, criada em 2023-06-19 | RSA 4096 bits, criada em 2026-03-23, expira em 2028-03-22 |
| Publicada em | `https://apt.z.cash/zcash.asc` | `https://apt.z.cash/zodl.asc` |

Cronograma publicado: nova chave gerada em 2026-03-23, anunciada em 2026-03-27, assinatura exclusiva a partir de 2026-04-23, revogação da antiga chave da ECC planejada para 2026-06-23.

Um anúncio de rotação em um site é tão confiável quanto o próprio site. O mecanismo correto é uma declaração **assinada em texto claro pelas duas chaves**, de modo que a chave antiga avalize a nova. O ZODL publica exatamente isso:

```bash
curl -sL https://zodl.com/security/key-transition.txt.asc -o key-transition.txt.asc
curl -sL https://apt.z.cash/zcash.asc -o zcash.asc
gpg --import zcash.asc
gpg --verify key-transition.txt.asc
```

Saída real (resumida, duas assinaturas em um único documento):

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

Dois resultados `Good signature` em um único documento, da chave antiga e da nova. Se você confiava na chave da ECC para releases anteriores, essa confiança agora se transfere para a chave do ZODL sem que você precise confiar no `zodl.com`, no `apt.z.cash` ou em um post de fórum. Essa é a propriedade a procurar sempre que um projeto rotaciona chaves, e a ausência dela merece ser questionada.

### Onde obter uma chave e onde não obter

Da melhor para a pior opção:

1. **Uma declaração assinada pela chave anterior**, como acima. A opção mais forte após uma rotação.
2. **Uma fonte independente do download.** O binário veio do GitHub; a chave veio do `apt.z.cash`. Um atacante precisaria comprometer os dois.
3. **Um keyserver, com conferência cruzada com uma impressão digital publicada.** Qualquer pessoa pode enviar para a maioria dos keyservers uma chave que alega qualquer identidade. É a comparação da impressão digital que torna isso seguro, não o keyserver.
4. **A mesma página do binário.** Quase nenhuma garantia. Quem consegue substituir um consegue substituir o outro.

Sempre compare a impressão digital **completa** com a chave **primária**. IDs de chave curtos são facilmente colidíveis e já foram usados em ataques reais.

## Parte 3: uma verificação que falha

A verificação só é útil se você souber como é uma falha. Aqui está uma real, produzida acrescentando um único byte nulo a um arquivo compactado válido:

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

Um byte acrescentado a um arquivo de 66.992.676 bytes. Os dois hashes não têm nada em comum: nem um prefixo, nem um padrão. Não existe correspondência parcial nem "quase igual": um checksum ou corresponde exatamente, ou o arquivo não é o arquivo que você queria.

### O que fazer quando isso acontece

1. **Não execute o binário.** Não o extraia nem use `chmod +x` nele.
2. **Tente novamente a partir da página oficial de releases.** A maioria das falhas é causada por downloads truncados.
3. **Se falhar uma segunda vez, mude o caminho de rede.** Outra conexão ou uma VPN. Uma falha que acompanha você em redes diferentes é diferente de uma que não acompanha.
4. **Confirme que você tem o arquivo de checksum certo para a versão certa.** Comparar a v6.3.0 com os checksums da v6.2.3 vai falhar, e corretamente.
5. **Se ainda falhar, reporte.** Abra uma issue no repositório do projeto ou use o contato de segurança em `SECURITY.md` para qualquer coisa que você suspeite ser intencional. Veja a página [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security) para os canais de divulgação.
6. **Guarde o artefato.** Um binário adulterado é uma evidência. Não o apague antes de reportar.

Uma falha de assinatura é mais grave do que uma falha de checksum. Uma divergência de checksum geralmente é corrupção; um arquivo válido com assinatura inválida não é algo que acontece por acidente.

---

## Parte 4: tabela de referência

| Projeto | Releases publicadas em | Método | De onde vem a chave |
|---|---|---|---|
| **Zebra** | `github.com/ZcashFoundation/zebra/releases` | `SHA256SUMS` + Sigstore bundle | Sem chave: identidade de CI via OIDC do GitHub |
| **Zallet** | `github.com/zcash/zallet/releases` | Detached GPG `.asc`, SLSA provenance, SBOM | `apt.z.cash/zodl.asc`: primária `0338 34DD…58E2 6AB1`, subchave de assinatura `1FE9 9324…23F0 617F` |
| **zcashd** | *descontinuado* | — | Interrompido no bloco 3.417.100 em 2026-07-18. Não instale. |
| **Zodl** (antes Zashi) | App Store / Google Play; `zodl-inc` no GitHub | Store signing; standalone Android binaries GPG-signed | Chave do ZODL conforme a declaração de transição |

> **Observação sobre nomes:** o Zashi foi renomeado para **Zodl** em 2026, primeiro na App Store e depois no Google Play. Guias mais antigos que se referem ao "Zashi" descrevem a mesma linhagem de carteira.

---

## Parte 5: carteiras móveis e carteiras de hardware

A verificação funciona de outra forma quando você sai dos downloads diretos.

**Lojas de aplicativos.** Você não consegue verificar uma assinatura por conta própria. A loja assina o pacote, e você está confiando na revisão da loja e na integridade da conta do desenvolvedor. O que você *pode* verificar é se tem o aplicativo certo: confirme o nome do publicador e o identificador do pacote no site oficial do projeto, não nos resultados de busca. Aplicativos que se passam por outros são comuns, e uma página na loja não é prova de autenticidade.

**APKs Android avulsos.** Estes *podem* ser verificados. O ZODL publica binários Android avulsos assinados com GPG via GitHub Releases, então o fluxo da Parte 2 se aplica. Prefira esse caminho se você quiser uma cadeia verificável.

**Carteiras de hardware.** O dispositivo atesta o próprio firmware, então a âncora de confiança é o hardware, não um arquivo na sua máquina. Veja [Keystone Zashi](/guides/keystone-zashi) para o fluxo de verificação do dispositivo. Compre diretamente do fabricante: adulterações na cadeia de suprimentos acontecem entre a fábrica e o comprador.

---

## Leitura complementar

- [Zcash Ecosystem Security](/zcash-community/zcash-ecosystem-security): política de divulgação e contatos de segurança
- [Zebra Nó integral](/zcash-tech/zebra-full-node): como instalar o Zebra depois de verificá-lo
- [Zallet Guia de referência rápida](/using-zcash/zallet-quick-reference-guide): como usar o Zallet
- [Documentação do Sigstore](https://docs.sigstore.dev/)
- [Níveis de proveniência SLSA](https://slsa.dev/)

---

*Os comandos desta página foram executados com Zebra `v6.3.0` e Zallet `v0.1.0-beta.2` em 2026-08-18. As ferramentas de release mudam: se a saída for diferente da mostrada aqui, confie na sua própria execução e abra um PR.*
