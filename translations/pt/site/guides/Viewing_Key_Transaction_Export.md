<a href="https://github.com/zechub/zechub/edit/main/site/guides/Viewing_Key_Transaction_Export.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Exportar o histórico de transações de uma Viewing Key

A maioria das exportações de wallets é limitada. A exportação fiscal da ZODL, por exemplo, fornece-lhe datas, montantes e taxas do ano civil anterior, mas não IDs de transações, memos ou endereços. Isto não é suficiente para a contabilidade, para verificar uma migração de wallet ou para perceber o que aconteceu a um pagamento.

Não precisa da sua frase-semente para obter o quadro completo. Uma full viewing key unificada (UFVK, que começa por `uview1`) pode ver todas as transações recebidas e enviadas numa conta, e duas ferramentas podem transformá-las num ficheiro que pode guardar: o servidor GraphQL da Zkool e zingo-cli. Este guia reúne as abordagens desta [discussão no fórum](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662) e atualiza-as para as versões atuais.

Testado em setembro de 2026 com a Zkool 6.30.0 e zingo-cli da zingolib 6.0.0.

## Antes de começar

Precisa de duas coisas:

1. **A UFVK** da conta. [Viewing Keys](/zcash-tech/viewing-keys) explica o que revela e como exportar uma.
2. **Uma altura de nascimento**, o bloco a partir do qual iniciar a análise. Use uma altura anterior à sua primeira transação. Se a definir demasiado alta, o histórico mais antigo ficará silenciosamente em falta. Se a definir demasiado baixa, a análise apenas demora mais tempo. A ativação de Sapling (419200) é sempre segura, mas pode demorar horas a analisar.

## Mantenha-a privada

Uma viewing key não pode gastar, mas mostra todo o seu histórico a quem a possuir.

- Não a cole num website ou explorador de blocos. Importe-a em software que execute pessoalmente.
- O servidor a partir do qual sincroniza vê o seu endereço IP e quais as transações que transfere na íntegra. Ambas as ferramentas abaixo obtêm cada uma das suas transações por ID para ler memos e taxas, e [ZIP 307](https://zips.z.cash/zip-0307) observa que isto informa o servidor sobre quais são as suas transações. Sincronizar a partir do seu próprio nó Zebra com Zaino ou lightwalletd evita isso. O tutorial [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial) explica uma configuração.
- zingo-cli 6 envia pagamentos através da mixnet Nym, mas a sua sincronização continua a ligar-se diretamente ao servidor, pelo que o ponto anterior também se lhe aplica.
- Dê a estas ferramentas uma viewing key, nunca uma seed. Por predefinição, o servidor GraphQL da Zkool não tem início de sessão, e a sua API devolverá a seed de qualquer conta criada a partir de uma, além de poder enviar fundos.
- Mantenha o servidor na sua própria máquina. O comando Docker abaixo só escuta em `127.0.0.1`.
- Ambas as ferramentas armazenam a chave e o seu histórico sem encriptação. Elimine os dados de trabalho quando terminar e guarde a exportação num local encriptado.

## Opção 1: GraphQL da Zkool

A `zkool_graphql` é o motor de wallet da Zkool como servidor autónomo. É um programa separado da aplicação Zkool. A forma mais simples de a executar é a imagem Docker oficial (amd64 e arm64). Há também um binário Linux x86-64 na página de [Zkoollançamentos](https://github.com/hhanh00/zkool2/releases); precisa de glibc 2.38 ou mais recente, pelo que Ubuntu 24.04 funciona e Debian 12 não.

### 1. Inicie o servidor

```bash
docker run -d --name zkool-export \
  -p 127.0.0.1:8000:8000 \
  -v zkool-export:/data \
  hhanh00/zkool-graphql:6.30.0 \
  --db-path /data/zkool.db
```

Sincroniza a partir de `https://zec.rocks`, a menos que adicione `--lwd-url` com o seu próprio servidor. No primeiro arranque, transfere os parâmetros Sapling (cerca de 50 MB). Se falhar, `docker start zkool-export` tenta novamente.

Abra `http://127.0.0.1:8000/graphiql` num navegador. Pode colar lá cada um dos passos seguintes e executá-los.

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

Devolve o ID da nova conta, que é 1 num servidor novo.

- Defina sempre `birth`. Sem isso, Zkool começa no bloco atual e não encontra nada.
- `useInternal: true` faz com que Zkool também verifique endereços transparentes de troco. Mantenha-o ativo para chaves da ZODL, a mesma definição que [Recovering Funds](/using-zcash/recovering-funds) usa para seeds da ZODL.

### 3. Sincronize

```graphql
mutation { synchronizeAccount(idAccount: 1) }
```

Isto é executado até a sincronização terminar. Não adicione `fast: true`. Essa opção ignora a transferência das transações completas, de onde vêm os memos, as taxas e as saídas.

O número devolvido é a altura que pretendia atingir, não uma prova de que lá chegou. Um erro de rede pode terminar a sincronização antecipadamente sem comunicar nada, por isso verifique:

```graphql
{ currentHeight accounts { id name height } }
```

Se o `height` da conta estiver atrás de `currentHeight`, execute novamente a sincronização. Esta continuará de onde parou.

### 4. Exporte

Guarde isto como `history.graphql`:

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

Não inclua o argumento `height`, a menos que seja essa a sua intenção. Define um mínimo, pelo que o `height: 3000000` do exemplo do fórum elimina tudo antes desse bloco.

Obtenha-o como JSON:

```bash
jq -n --rawfile q history.graphql '{query: $q}' |
  curl -s http://127.0.0.1:8000/graphql \
    -H 'content-type: application/json' --data-binary @- > history.json
```

Todas as transações devem mostrar uma taxa acima de 0, exceto as recompensas de mineração. Se alguma mostrar `"fee": "0"` e não tiver memo, os respetivos detalhes não foram transferidos. Zkool obtém as transações completas uma de cada vez após a análise, e uma falha interrompe silenciosamente as restantes. Para listar as afetadas:

```bash
jq -r '.data.transactionsByAccount[] | select(.fee == "0") | .txid' history.json
```

Se aparecer alguma, sincronize novamente alguns minutos depois e volte a exportar.

Depois, simplifique-o para CSV, uma linha por transação:

```bash
jq -r '["txid","height","time_utc","net_zec","fee_zec","memos"],
  (.data.transactionsByAccount[] |
    [.txid, .height, .time, .value, .fee,
     ([.notes[].memo, .outputs[].memo] | map(select(. != null and . != "")) | unique | join(" | "))])
  | @csv' history.json > history.csv
```

### Ler o resultado

| Campo | Significado |
|---|---|
| `value` | Alteração líquida da conta em ZEC, incluindo a taxa. Negativa para envios. |
| `fee` | Taxa em ZEC. Nos pagamentos que recebeu, foi o remetente que a pagou e esta não está em `value`. |
| `time` | Hora do bloco em UTC, sem marcador de fuso horário |
| `notes` | O que a conta recebeu nesta transação, incluindo o troco. Os memos enviados para si estão aqui. As entradas transparentes não têm endereço. |
| `spends` | As próprias notas da conta que esta transação consumiu |
| `outputs` | O que a transação enviou: cada saída transparente, mais pagamentos protegidos para outros endereços com os respetivos memos |
| `pool` | 0 transparente, 1 Sapling, 2 Orchard, 3 Ironwood |
| `scope` | 0 externo (um pagamento recebido), 1 interno (troco) |

A aplicação Zkool também tem Export Transactions, Memos e Notes no menu da conta, mas são despejos de tabelas em bruto: montantes em zatoshis, timestamps Unix e memos num ficheiro separado.

## Opção 2: zingo-cli

zingo-cli é a wallet de linha de comandos da Zingo. Não existem transferências pré-compiladas, pelo que a compila com Rust:

```bash
git clone --branch zingolib_v6.0.0 https://github.com/zingolabs/zingolib.git
cd zingolib
cargo build --release -p zingo-cli
cargo build --release --manifest-path zingo-netutils/Cargo.toml --features nym --bin nym-proxy
cp zingo-netutils/target/release/nym-proxy target/release/
```

Precisa de `nym-proxy` mesmo apenas para sincronizar. zingo-cli 6 não se liga a nenhum servidor sem isso.

A primeira execução cria uma wallet apenas de visualização, sincroniza-a e imprime o histórico:

```bash
./target/release/zingo-cli --data-dir "$HOME/zingo-export" \
  --viewkey "uview1..." --birthday 2500000 \
  --server https://zec.rocks:443 \
  --waitsync transactions > transactions.txt
```

- `--data-dir` tem de ser um caminho absoluto.
- `--viewkey` e `--birthday` aplicam-se apenas quando a wallet é criada. Omita-os depois disso.
- Por predefinição, zingo-cli inicia offline. `--server` seleciona o servidor e também conta como o seu consentimento para ficar online.
- A chave fica no histórico da sua shell, por isso elimine-a depois.

Execuções posteriores:

```bash
Z="./target/release/zingo-cli --data-dir $HOME/zingo-export"
$Z --server https://zec.rocks:443 --waitsync transactions > transactions.txt
$Z --offline value_transfers > value_transfers.txt
$Z --offline messages > memos.json
```

`--offline` lê o que já está sincronizado sem tocar na rede.

- `transactions` fornece uma entrada por transação: txid, hora (UTC), altura, tipo (`received`, `sent`, `shield` ou `send-to-self`), valor, taxa e as notas envolvidas.
- `value_transfers` fornece uma entrada por pagamento, pelo que um envio para duas pessoas corresponde a duas entradas, cada uma com o endereço do destinatário e os memos.
- `messages` lista memos como JSON.

Algumas coisas a saber sobre o resultado:

- `transactions` e `value_transfers` imprimem texto simples que se parece um pouco com JSON, mas não é.
- Os montantes estão em zatoshis (100.000.000 para 1 ZEC) e são sempre positivos. `kind` indica-lhe a direção. Para envios, `value` é o que foi enviado para outras pessoas, sem a taxa.
- A taxa aparece como "not available" quando uma transação gasta fundos transparentes que não eram seus. Apenas são mostrados memos de texto.
- Se a sincronização falhar, o erro vai para o terminal, não para o ficheiro, e zingo-cli continua a sair normalmente. Verifique o terminal antes de confiar em `transactions.txt`.

O [zingoHelper](https://github.com/dismad/zingoHelper) de dismad tem um script `exportToJSON.sh` que converte `transactions` para JSON. Foi escrito antes de zingo-cli 6, está configurado para testnet, marca algumas entradas de saída Sapling e transparentes como marcadores de posição, e precisa de ferramentas GNU, pelo que não será executado no macOS sem alterações. Considere o seu resultado um ponto de partida e verifique os totais.

## O que uma viewing key não pode dizer-lhe

- **Preços.** Nenhuma das ferramentas regista um preço em ZEC no momento de cada transação. Adicione os valores fiduciários manualmente.
- **Histórico transparente, se a chave não o incluir.** A parte transparente de uma UFVK é opcional segundo [ZIP 316](https://zips.z.cash/zip-0316). Com zingo-cli, `$Z --offline parse_viewkey uview1...` mostra que pools uma chave abrange.
- **Quem lhe pagou.** Os pagamentos protegidos não transportam o endereço do remetente. A menos que o remetente tenha colocado um no memo, não está em lado nenhum.
- **Alguns detalhes de saída.** O endereço de destino, o montante e o memo de envios protegidos são recuperados ao desencriptar com a chave. Contudo, uma wallet pode criar uma transação de modo a que isso não seja possível, embora a maioria não o faça.

## Outras ferramentas

| Ferramenta | O que obtém |
|---|---|
| ZODL | CSV fiscal com datas, montantes, taxas e uma etiqueta. Apenas o ano civil anterior, ignora transações de proteção, sem txid, memo ou endereço. |
| aplicação Zkool | Exportações de tabelas em bruto a partir do menu da conta |
| [Zenith](https://code.vergara.tech/Vergara_Tech/zenith) | Importa uma UFVK com `importvk`. `listreceived` através de RPC devolve notas recebidas com txid e memo, mas sem envios nem taxas. |
| [Zallet](https://github.com/zcash/zallet) | `z_listtransactions` é detalhado mas está marcado como experimental, e Zallet apenas importa viewing keys Sapling, não UFVKs |
| [zcash-devtool](https://github.com/zcash/zcash-devtool) | Importa uma UFVK com `wallet init-fvk`, depois `wallet list-tx`. O seu modo CSV não tem txid nem endereço, e o projeto diz para não o usar em produção. |

## Relacionados

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Recovering Funds](/using-zcash/recovering-funds)
- [Zingolib and Zaino Tutorial](/guides/zingolib-and-zaino-tutorial)
- [Fórum: Exportar histórico de transações para JSON/CSV a partir de UFVK/seed](https://forum.zcashcommunity.com/t/exporting-transaction-history-to-json-csv-from-ufvk-seed/54662)
- [Fórum: Zkool & GraphQL](https://forum.zcashcommunity.com/t/zkool-graphql/54100)
- [README de zingo-cli](https://github.com/zingolabs/zingolib/blob/zingolib_v6.0.0/zingo-cli/README.md)
