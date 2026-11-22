<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exportando o histórico de transações de um Viewing Key

A maioria das exportações de carteira é pobre. A exportação fiscal do ZODL, por exemplo, traz datas, valores e taxas do ano-calendário anterior, mas não traz IDs de transação, memorandos nem endereços. Isso não basta para a contabilidade, para conferir uma migração de carteira ou para descobrir o que aconteceu com um pagamento.

Você não precisa da sua frase semente para ter o quadro completo. Uma unified full viewing key (UFVK, que começa com `uview1`) consegue ver todas as transações recebidas e enviadas de uma conta, e duas ferramentas transformam isso em um arquivo que você guarda: o servidor GraphQL Zkool e o zingo-cli. Este guia reúne as abordagens [deste tópico do fórum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) e as atualiza para as versões atuais.

Testado em setembro de 2026 com o Zkool 6.30.0 e o zingo-cli do zingolib 6.0.0. Ambos são anteriores ao NU7, por isso, em novembro de 2026, as etapas foram transferidas para o Zkool 6.37.0 e o zingolib 8.0.0. [Zkool 6.35.0](https://github.com/hhanh00/zkool2/pull/1388) é a primeira versão do Zkool compilada com a altura de ativação da Mainnet do NU7, e zingolib 8.0.0 é a versão que adiciona suporte à Mainnet do NU7.

## Antes de começar

Você precisa de duas coisas:

1. **A UFVK** da conta. [Chaves de visualização](/zcash-tech/viewing-keys) explica o que ela revela e como exportar uma.
2. **Uma altura de nascimento**, o bloco a partir do qual a varredura começa. Use uma altura anterior à sua primeira transação. Se ela for alta demais, o histórico mais antigo some sem aviso. Se for baixa demais, a varredura só demora mais. A ativação do Sapling (419200) é sempre segura, mas a varredura pode levar horas.

## Mantenha a privacidade

Uma chave de visualização não consegue gastar, mas mostra todo o seu histórico a quem a tiver.

- Não cole a chave em um site ou explorador de blocos. Importe-a em um software que você mesmo executa.
- O servidor de onde você sincroniza vê seu endereço IP e quais transações você baixa por completo. As duas ferramentas abaixo buscam cada uma das suas transações pelo ID para ler memorandos e taxas, e [ZIP 307](https://zips.z.cash/zip-0307) observa que isso revela ao servidor quais transações são suas. Sincronizar a partir do seu próprio nó Zebra com Zaino ou lightwalletd evita isso. O [Zingolib e o tutorial Zaino](/guides/zingolib-and-zaino-tutorial) mostram uma configuração passo a passo.
- zingo-cli envia pagamentos pela mixnet Nym, mas a sincronização dele ainda se conecta diretamente ao servidor, então o ponto acima também se aplica a ele.
- Forneça a essas ferramentas uma chave de visualização, nunca uma frase semente. O comando Docker abaixo inicia o servidor Zkool GraphQL com `--allow-unauthenticated`, sem login, e a API devolve a frase semente de qualquer conta criada a partir de uma e pode enviar fundos.
- Mantenha o servidor na sua própria máquina. O comando Docker abaixo só escuta em `127.0.0.1` do seu computador. Dentro do contêiner, o servidor precisa escutar em todas as interfaces (`--bind-address 0.0.0.0`); caso contrário, Docker não consegue alcançá-lo. O mapeamento `-p 127.0.0.1:8000:8000` é o que mantém o acesso local.
- As duas ferramentas armazenam a chave e seu histórico sem criptografia. Zkool pode criptografar o banco de dados (`--db-password-file`), mas o comando abaixo simplifica as coisas com `--allow-unencrypted-database`. Apague os dados de trabalho quando terminar e guarde a exportação em algum lugar criptografado.

## Opção 1: GraphQL do Zkool

O `zkool_graphql` é o motor de carteira do Zkool como servidor independente. É um programa separado do app Zkool. A forma mais simples de executá-lo é a imagem oficial do Docker (amd64 e arm64). Também há um binário x86-64 para Linux na [Zkoolpágina de releases](https://github.com/hhanh00/zkool2/releases); ele exige glibc 2.38 ou mais recente, então funciona no Ubuntu 24.04 e não no Debian 12.

### 1. Inicie o servidor

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.37.0 \
  --db-path /data/zkool.db \
  --bind-address 0.0.0.0 \
  --allow-unauthenticated \
  --allow-unencrypted-database
```

Desde a versão 6.32.0, o servidor não inicia até que você deixe explícitas duas escolhas: como os clientes fazem login (uma chave JWT ou `--allow-unauthenticated`) e se o banco de dados é criptografado (uma senha ou `--allow-unencrypted-database`). Agora, por padrão, ele também escuta somente em `127.0.0.1`, o que significa que, dentro de um contêiner, nada de fora consegue acessá-lo; por isso, `--bind-address 0.0.0.0`. Se o contêiner parar logo em seguida, `docker logs zkool-export` mostra qual opção está faltando.

Ele sincroniza a partir de `https://zec.rocks`, a menos que você adicione `--lwd-url` com seu próprio servidor. A imagem já inclui os parâmetros de Sapling, então não há mais nada para baixar.

Abra `http://127.0.0.1:8000/graphiql` em um navegador. Você pode colar cada um dos próximos passos ali e executá-lo.

### 2. Importe a chave

```graphql
mutation {
  createAccount(newAccount: {
    name: "export"
    key: "uview1..."
    aindex: 0
    birth: 2500000
    useInternal: true
  })
}
```

Ele retorna o ID da nova conta, que é 1 em um servidor novo.

- Sempre defina `birth`. Sem isso, o Zkool começa do bloco atual e não encontra nada.
- `useInternal: true` faz o Zkool verificar também os endereços transparentes de troco. Deixe ativado para chaves do ZODL, a mesma configuração que [Recuperando fundos](/using-zcash/recovering-funds) usa para sementes do ZODL.

### 3. Sincronize

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Isso roda até a sincronização terminar. Não adicione `fast: true`. Ele pula o download das transações completas, que é de onde vêm os memorandos, as taxas e as saídas.

O número retornado é a altura que ele tinha como alvo, não uma prova de que chegou lá. Um erro de rede pode encerrar a sincronização antes da hora sem relatar nada, então verifique:

```graphql
{ currentHeight accounts { id name height } }
```

Se o `height` da conta estiver atrás de `currentHeight`, execute a sincronização de novo. Ela continua de onde parou.

### 4. Exporte

Salve isto como `history.graphql`:

```graphql
{
  transactionsByAccount(idAccount: 1) {
    txid height time value fee
    notes { pool scope address value memo }
    spends { pool scope address value }
    outputs { pool vout address value memo }
  }
}
```

Deixe de fora o argumento `height`, a menos que você realmente queira usá-lo. Ele define um mínimo, então o `height: 3000000` do exemplo do fórum descarta tudo antes daquele bloco.

Busque o resultado como JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Toda transação deve mostrar uma taxa acima de 0, exceto as recompensas de mineração. Se alguma mostrar `"fee": "0"` e nenhum memorando, os detalhes dela não foram baixados. O Zkool busca as transações completas uma de cada vez depois da varredura, e uma falha interrompe silenciosamente o resto. Para listar as afetadas:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Se aparecer alguma, sincronize de novo alguns minutos depois e exporte novamente.

Depois, converta para CSV, com uma linha por transação:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Lendo a saída

| Campo | Significado |
|---|---|
| `value` | Variação líquida da conta em ZEC, com a taxa incluída. Negativa para envios. |
| `fee` | Taxa em ZEC. Nos pagamentos que você recebeu, quem enviou pagou a taxa e ela não está em `value`. |
| `time` | Horário do bloco em UTC, sem indicação de fuso horário |
| `notes` | O que a conta recebeu nesta transação, incluindo o troco. Os memorandos enviados a você ficam aqui. As entradas transparentes não têm endereço. |
| `spends` | As notes da própria conta que esta transação consumiu |
| `outputs` | O que a transação enviou: todas as saídas transparentes, mais os pagamentos blindados para outros endereços com os respectivos memorandos |
| `pool` | 0 transparente, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externo (um pagamento recebido), 1 interno (troco) |

O app Zkool também tem as opções Exportar transações, memorandos e notes no menu da conta, mas elas são despejos brutos de tabelas: valores em zatoshis, timestamps Unix e memorandos em um arquivo separado.

## Opção 2: zingo-cli

O zingo-cli é a carteira de linha de comando do Zingo. Não há downloads pré-compilados, então você precisa compilá-lo com Rust. Use o zingolib 8.0.0 ou mais recente: é a primeira versão que conhece a altura de ativação de NU7 na Mainnet (3.543.405), segundo suas [notas de versão](https://github.com/zingolabs/zingolib/releases/tag/zingolib_v8.0.0). Compilações feitas a partir de tags mais antigas, como a 6.0.0, não a conhecem.

A compilação usa o [cargo-make](https://github.com/sagiegurari/cargo-make) (`cargo install cargo-make`). No Ubuntu, você também precisa de `sudo apt install build-essential gcc libsqlite3-dev`.

```bash
git clone --branch zingolib_v8.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
makers run-cli --build-only
```

Isso compila `./target/release/zingo-cli` e coloca `nym-proxy` ao lado dele. Você precisa de `nym-proxy` até mesmo só para sincronizar: zingo-cli não fica online sem ele. Desde a versão 8.0.0, `zingo-netutils` faz parte do workspace principal, então a receita antiga, que copiava `nym-proxy` de `zingo-netutils/target/release/`, não funciona mais.

Se você mover `zingo-cli` para outro lugar, mova `nym-proxy` junto, ou informe ao zingo-cli onde ele está com `--nym-proxy /path/to/nym-proxy` ou com a variável de ambiente `ZINGO_NYM_PROXY`. Sem isso, ele procura ao lado do próprio binário e depois no seu `PATH`. Se não conseguir iniciar o proxy, ele não fica online de jeito nenhum.

Somente os pagamentos (e a consulta de preço ZEC) passam pelo Nym. A sincronização se conecta diretamente ao servidor.

A primeira execução cria uma carteira somente de visualização, sincroniza e imprime o histórico:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` deve ser um caminho absoluto.
- `--viewkey` e `--birthday` só se aplicam quando a carteira é criada. Depois disso, omita-os.
- Um zingo-cli recém-criado fica offline por padrão e precisa do seu consentimento para ficar online. `--server` escolhe o servidor e também conta como esse consentimento. As outras formas são `--online` (somente nesta sessão) e `--remember-online`, que também salva a escolha junto à carteira para que as execuções seguintes fiquem online sem uma flag (`--forget-online` desfaz isso).
- A chave fica registrada no histórico do seu shell, então limpe-o depois.

Execuções seguintes:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lê o que já está sincronizado sem acessar a rede.

- `transactions` gera uma entrada por transação: txid, horário (UTC), altura, tipo (`received`, `sent`, `shield` ou `send-to-self`), valor, taxa e as notes envolvidas.
- `value_transfers` gera uma entrada por pagamento, então um envio para duas pessoas vira duas entradas, cada uma com o endereço do destinatário e os memorandos.
- `messages` lista os memorandos em JSON.

Algumas coisas para saber sobre a saída:

- `transactions` e `value_transfers` imprimem texto simples que lembra um pouco JSON, mas não é.
- Os valores estão em zatoshis (100.000.000 para 1 ZEC) e são sempre positivos. `kind` indica a direção. Nos envios, `value` é o que foi para outras pessoas, sem a taxa.
- A taxa aparece como "not available" quando uma transação gasta fundos transparentes que não eram seus. Apenas memorandos de texto são exibidos.
- Se a sincronização falhar, o erro vai para o terminal, não para o arquivo. Desde o zingolib 8.0.0 (zingo-cli 0.5.0), um comando que falha também termina com um código diferente de zero, mas confira o terminal antes de confiar em `transactions.txt`.

O [zingoHelper](https://github.com/dismad/zingoHelper) de dismad tem um script `exportToJSON.sh` que converte `transactions` para JSON. Ele foi escrito antes do zingo-cli 6, está configurado para a testnet, marca algumas entradas Sapling enviadas e entradas transparentes como placeholders e exige as ferramentas GNU, então não roda no macOS padrão. Trate a saída dele como ponto de partida e confira os totais.

## O que uma chave de visualização não consegue informar

- **Preços.** Nenhuma das ferramentas registra o preço do ZEC no momento de cada transação. Adicione você mesmo os valores em moeda fiduciária.
- **Histórico transparente, se a chave não o incluir.** A parte transparente de uma UFVK é opcional segundo a [ZIP 316](https://zips.z.cash/zip-0316). Com o zingo-cli, `$Z --offline parse_viewkey uview1...` mostra quais pools uma chave cobre.
- **Quem pagou você.** Pagamentos blindados não carregam o endereço de quem enviou. A menos que o remetente o tenha colocado no memorando, ele não está em lugar nenhum.
- **Alguns detalhes de envio.** O endereço de destino, o valor e o memorando dos envios blindados são recuperados ao descriptografar com a chave. Uma carteira pode montar uma transação de forma que isso não seja possível, embora a maioria não faça isso.

## Outras ferramentas

| Ferramenta | O que você obtém |
|---|---|
| ZODL | CSV fiscal com datas, valores, taxas e uma tag. Só o ano-calendário anterior, ignora transações de blindagem, sem txid, memorando ou endereço. |
| App Zkool | Exportações brutas de tabelas pelo menu da conta |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa uma UFVK com `importvk`. `listreceived` via RPC retorna as notes recebidas com txid e memorando, mas sem envios e sem taxas. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` é detalhado, mas marcado como experimental, e Zallet só importa chaves de visualização Sapling, não UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa uma UFVK com `wallet init-fvk` e depois `wallet list-tx`. O modo CSV dele não tem txid nem endereço, e o projeto recomenda não usá-lo em produção. |

## Relacionados

- [Chaves de visualização](/zcash-tech/viewing-keys)
- [Recuperação de fundos](/using-zcash/recovering-funds)
- [Tutorial de Zingolib e Zaino](/guides/zingolib-and-zaino-tutorial)
- [Fórum: exportando o histórico de transações para JSON/CSV a partir da UFVK/frase semente](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Fórum: Zkool e GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README do zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v8.0.0/zingo-cli/README.md)
