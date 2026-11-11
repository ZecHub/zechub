<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Exportando o histórico de transações de uma Viewing Key

A maioria das exportações de carteiras é limitada. A exportação fiscal da ZODL, por exemplo, fornece datas, valores e taxas do ano-calendário anterior, mas não IDs de transações, memorandos ou endereços. Isso não é suficiente para a contabilidade, para verificar uma migração de carteira ou para descobrir o que aconteceu com um pagamento.

Você não precisa da sua frase semente para obter o panorama completo. Uma chave de visualização completa unificada (UFVK, que começa com `uview1`) pode ver todas as transações recebidas e enviadas em uma conta, e duas ferramentas podem transformar isso em um arquivo que você guarda: o servidor GraphQL da Zkool e o zingo-cli. Este guia reúne as abordagens desta [discussão no fórum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) e as atualiza para as versões atuais.

Testado em setembro de 2026 com o Zkool 6.30.0 e o zingo-cli da zingolib 6.0.0.

## Antes de começar

Você precisa de duas coisas:

1. **A UFVK** da conta. [Chaves de visualização](/zcash-tech/viewing-keys) explica o que ela revela e como exportar uma.
2. **Uma altura de nascimento**, o bloco a partir do qual iniciar a varredura. Use uma altura anterior à sua primeira transação. Se você defini-la alta demais, o histórico mais antigo ficará silenciosamente ausente. Se você defini-la baixa demais, a varredura apenas demorará mais. A ativação do Sapling (419200) é sempre segura, mas a varredura pode levar horas.

## Mantenha-a privada

Uma chave de visualização não pode gastar, mas mostra todo o seu histórico a quem a possuir.

- Não a cole em um site ou explorador de blocos. Importe-a para um software que você mesmo executa.
- O servidor com o qual você sincroniza vê seu endereço IP e quais transações você baixa integralmente. Ambas as ferramentas abaixo buscam cada uma das suas transações por ID para ler memorandos e taxas, e a [ZIP 307](https://zips.z.cash/zip-0307) observa que isso informa ao servidor quais transações são suas. Sincronizar a partir do seu próprio nó Zebra com Zaino ou lightwalletd evita isso. O [Tutorial do Zingolib e Zaino](/guides/zingolib-and-zaino-tutorial) explica uma configuração.
- O zingo-cli 6 envia pagamentos pela mixnet Nym, mas sua sincronização ainda se conecta diretamente ao servidor, portanto o ponto acima também se aplica a ele.
- Forneça a essas ferramentas uma chave de visualização, nunca uma seed. Por padrão, o servidor GraphQL da Zkool não tem login, e sua API devolverá a seed de qualquer conta criada a partir de uma e poderá enviar fundos.
- Mantenha o servidor na sua própria máquina. O comando Docker abaixo escuta apenas em `127.0.0.1`.
- Ambas as ferramentas armazenam a chave e seu histórico sem criptografia. Exclua os dados de trabalho quando terminar e mantenha a exportação em algum lugar criptografado.

## Opção 1: GraphQL da Zkool

`zkool_graphql` é o mecanismo de carteira da Zkool como um servidor independente. É um programa separado do app Zkool. A maneira mais simples de executá-lo é com a imagem oficial do Docker (amd64 e arm64). Há também um binário Linux x86-64 na [página de lançamentos do Zkool](https://github.com/hhanh00/zkool2/releases); ele precisa da glibc 2.38 ou mais recente, portanto o Ubuntu 24.04 funciona e o Debian 12 não.

### 1. Inicie o servidor

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Ele sincroniza a partir de `https://zec.rocks`, a menos que você adicione `--lwd-url` com seu próprio servidor. Na primeira inicialização, ele baixa os parâmetros do Sapling (cerca de 50 MB). Se isso falhar, `docker start zkool-export` tenta novamente.

Abra `http://127.0.0.1:8000/graphiql` em um navegador. Você pode colar cada uma das próximas etapas lá e executá-la.

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

- Sempre defina `birth`. Sem isso, o Zkool começa no bloco atual e não encontra nada.
- `useInternal: true` faz o Zkool também verificar endereços transparentes de troco. Mantenha-o ativado para chaves da ZODL, a mesma configuração que [Recuperando fundos](/using-zcash/recovering-funds) usa para seeds da ZODL.

### 3. Sincronize

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Isso é executado até a sincronização terminar. Não adicione `fast: true`. Essa opção ignora o download das transações completas, de onde vêm os memorandos, as taxas e as saídas.

O número retornado é a altura que ele pretendia atingir, não uma prova de que chegou lá. Um erro de rede pode encerrar a sincronização antecipadamente sem informar nada, então verifique:

```graphql
{ currentHeight accounts { id name height } }
```

Se o `height` da conta estiver atrás de `currentHeight`, execute a sincronização novamente. Ela continuará de onde parou.

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

Não inclua o argumento `height`, a menos que essa seja sua intenção. Ele define um mínimo, portanto o `height: 3000000` do exemplo do fórum exclui tudo antes desse bloco.

Busque-o como JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Todas as transações devem mostrar uma taxa acima de 0, exceto as recompensas de mineração. Se alguma mostrar `"fee": "0"` e não tiver memorando, seus detalhes não foram baixados. O Zkool busca as transações completas uma por vez após a varredura, e uma falha interrompe silenciosamente as demais. Para listar as afetadas:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Se alguma aparecer, sincronize novamente alguns minutos depois e exporte novamente.

Depois, simplifique-o para CSV, uma linha por transação:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Lendo o resultado

| Campo | Significado |
|---|---|
| `value` | Alteração líquida da conta em ZEC, incluindo a taxa. Negativa para envios. |
| `fee` | Taxa em ZEC. Nos pagamentos que você recebeu, o remetente a pagou e ela não está em `value`. |
| `time` | Horário do bloco em UTC, sem marcador de fuso horário |
| `notes` | O que a conta recebeu nesta transação, incluindo o troco. Os memorandos enviados a você estão aqui. As entradas transparentes não têm endereço. |
| `spends` | As próprias notes da conta que esta transação consumiu |
| `outputs` | O que a transação enviou: cada saída transparente, além de pagamentos blindados para outros endereços com seus memorandos |
| `pool` | 0 transparente, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externo (um pagamento recebido), 1 interno (troco) |

O app Zkool também tem Export Transactions, Memos e Notes no menu da conta, mas são despejos de tabelas brutas: valores em zatoshis, timestamps Unix e memorandos em um arquivo separado.

## Opção 2: zingo-cli

O zingo-cli é a carteira de linha de comando da Zingo. Não há downloads pré-compilados, então você o compila com Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Você precisa do `nym-proxy` mesmo apenas para sincronizar. O zingo-cli 6 não se conecta a nenhum servidor sem ele.

A primeira execução cria uma carteira somente para visualização, sincroniza-a e imprime o histórico:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` deve ser um caminho absoluto.
- `--viewkey` e `--birthday` só se aplicam quando a carteira é criada. Omita-os depois disso.
- Por padrão, o zingo-cli inicia offline. `--server` seleciona o servidor e também conta como seu consentimento para ficar online.
- A chave fica no histórico do seu shell, então exclua-a depois.

Execuções posteriores:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lê o que já está sincronizado sem acessar a rede.

- `transactions` fornece uma entrada por transação: txid, horário (UTC), altura, tipo (`received`, `sent`, `shield` ou `send-to-self`), valor, taxa e as notes envolvidas.
- `value_transfers` fornece uma entrada por pagamento, então um envio para duas pessoas corresponde a duas entradas, cada uma com o endereço do destinatário e os memorandos.
- `messages` lista memorandos como JSON.

Algumas coisas a saber sobre o resultado:

- `transactions` e `value_transfers` imprimem texto simples que se parece um pouco com JSON, mas não é.
- Os valores estão em zatoshis (100.000.000 para 1 ZEC) e são sempre positivos. `kind` indica a direção. Para envios, `value` é o que foi enviado para outras pessoas, sem a taxa.
- A taxa aparece como "not available" quando uma transação gasta fundos transparentes que não eram seus. Apenas memorandos de texto são mostrados.
- Se a sincronização falhar, o erro vai para o terminal, não para o arquivo, e o zingo-cli ainda encerra normalmente. Verifique o terminal antes de confiar em `transactions.txt`.

O [zingoHelper](https://github.com/dismad/zingoHelper) de dismad tem um script `exportToJSON.sh` que converte `transactions` para JSON. Ele foi escrito antes do zingo-cli 6, está configurado para testnet, marca algumas entradas de saída Sapling e transparentes como espaços reservados e precisa de ferramentas GNU, portanto não será executado no macOS padrão. Trate seu resultado como um ponto de partida e verifique os totais.

## O que uma chave de visualização não pode informar

- **Preços.** Nenhuma das ferramentas registra um preço do ZEC no momento de cada transação. Adicione você mesmo os valores fiduciários.
- **Histórico transparente, se a chave não o incluir.** A parte transparente de uma UFVK é opcional segundo a [ZIP 316](https://zips.z.cash/zip-0316). Com o zingo-cli, `$Z --offline parse_viewkey uview1...` mostra quais pools uma chave abrange.
- **Quem pagou a você.** Pagamentos blindados não carregam o endereço do remetente. A menos que o remetente tenha colocado um no memorando, ele não está em lugar algum.
- **Alguns detalhes de saída.** O endereço de destino, o valor e o memorando de envios blindados são recuperados ao descriptografar com a chave. No entanto, uma carteira pode criar uma transação de modo que isso não seja possível, embora a maioria não faça isso.

## Outras ferramentas

| Ferramenta | O que você obtém |
|---|---|
| ZODL | CSV fiscal com datas, valores, taxas e uma etiqueta. Apenas o ano-calendário anterior, ignora transações de blindagem, sem txid, memorando ou endereço. |
| Aplicativo Zkool | Exportações de tabelas brutas do menu da conta |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa uma UFVK com `importvk`. `listreceived` via RPC retorna notes recebidas com txid e memorando, mas sem envios nem taxas. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` é detalhado, mas está marcado como experimental, e a Zallet importa apenas chaves de visualização Sapling, não UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa uma UFVK com `wallet init-fvk`, depois `wallet list-tx`. Seu modo CSV não tem txid nem endereço, e o projeto diz para não usá-lo em produção. |

## Relacionados

- [Chaves de visualização](/zcash-tech/viewing-keys)
- [Recuperando fundos](/using-zcash/recovering-funds)
- [Tutorial do Zingolib e Zaino](/guides/zingolib-and-zaino-tutorial)
- [Fórum: Exportando histórico de transações para JSON/CSV a partir de UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Fórum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README do zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
