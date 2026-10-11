<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Newsletter blindada

> Envie uma nota em markdown para uma lista de endereços blindados como memorandos Zcash, usando Zallet. A lista de destinatários e a nota mantêm-se fora de endereços transparentes.

Uma newsletter blindada é uma série de transações blindadas. Cada saída paga um montante mínimo a um destinatário Unified Address e transporta a próxima parte da nota no campo de memorando. Zallet cria e envia essas transações. Zebra e Zaino apenas fornecem dados da cadeia.

Os scripts encontram-se em [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Foram escritos para uma versão inicial de Zallet e não é seguro executá-los tal como estão na versão atual. Esta página apresenta o procedimento atualizado. Verificado com Zallet `v0.1.0-beta.3` e o livro de Zallet em 7 de outubro de 2026.

## O que precisa

- Zebra totalmente sincronizado, com RPC associado a localhost.
- Zaino sincronizado com esse nó Zebra.
- Zallet `v0.1.0-beta.3` ou mais recente, compilação de wallet, com o respetivo RPC associado a localhost. O livro lista `z_sendmany` como implementado. Uma taxa numérica é rejeitada: se transmitir `fee`, tem de ser `null`, porque Zallet usa sempre a taxa ZIP 317.
- Uma conta com fundos cujo Unified Address possa gastar fundos blindados.
- Unified Addresses dos destinatários. Um memorando num endereço transparente é um erro.

Não coloque um endereço com fundos nem um cookie na wiki ou num script submetido ao repositório. O `txBuilderFromFile.sh` atual tem um Unified Address codificado. Substitua-o localmente e não o submeta.

## Configurar Zallet

Gere uma configuração com o Zallet que está a executar e, em seguida, aponte-o para Zebra e Zaino. O exemplo no tutorial antigo usa `as_of_version = "0.0.0"` e um caminho pessoal de diretório inicial. Trate esse ficheiro como uma referência histórica, não como um modelo.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` tem de listar `z_sendmany`, `z_getoperationstatus` e `z_getoperationresult`. Associe RPC apenas a `127.0.0.1`.

## Lista de destinatários

Um Unified Address por linha, sem aspas e sem linhas em branco. O script lê `daoAddresses.md`. O readme antigo indica `daoAddress.md`. Esse ficheiro não está no repositório, e os nomes não correspondem.

```text
u1...
u1...
```

## Enviar um memorando

`z_sendmany` é assíncrono. Devolve um ID de operação. Consulte `z_getoperationstatus` até o estado ser `success` ou ocorrer um erro. Uma pausa fixa de 5 segundos, que é o que o script faz, perde o resultado quando a compilação demora mais tempo. `z_getoperationresult` consome a operação, portanto não o chame até o estado ser terminal.

A taxa é omitida. Zallet calcula ZIP 317. Não transmita um número.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

O campo de memorando é hexadecimal bruto, com um máximo de 512 bytes. `ascii2hex` codifica apenas ASCII. Uma nota com qualquer caráter não ASCII falha. `xxd` ou `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` processa UTF-8.

A política de privacidade tem por predefinição `FullPrivacy`. Essa é a predefinição correta para um destinatário blindado. Não transmita `AllowFullyTransparent`.

## Defeitos dos scripts

Estes encontram-se na árvore em 8 de outubro de 2026. Não execute `shieldNewsletter.sh` até serem corrigidos.

- A `[[ bytesInFile -lt 512 ]]` não tem `$`. O ramo de memorando único nunca é executado.
- O ciclo de fragmentos armazena hexadecimal, depois `hex2ascii` descodifica-o e `txBuilderFromFile.sh` volta a codificá-lo. O último fragmento não é enviado, exceto se uma linha posterior ultrapassar 512. Uma linha longa não é dividida. É enviada inteira e pode exceder o memorando de 512 bytes.
- `txBuilderFromFile.sh` chama `./zallet rpc` sem caminho de configuração e espera o binário no diretório atual. Use `zallet -c <config> rpc`.
- `toCurl.sh` comunica com Zebra na porta 8232 com um cookie, e chama `getinfo` e `sendmany`. Zallet não fornece `sendmany`. O ciclo de espera pela mineração também usa `[[ chainHeight -gt temp ]]` sem `$`, pelo que não espera.
- `z_gettotalbalance 0 true` é transmitido como argumentos posicionais adicionais. Verifique `rpc help z_gettotalbalance` no binário que executa antes de usar essa chamada.
- Cada fragmento envia `0.0001` ZEC para cada destinatário. A taxa ZIP 317 acresce a esse valor. Uma nota longa para muitos endereços gasta mais do que os montantes mínimos.

## Após uma correção

Um executor corrigido deve:

1. Ler a nota como bytes e dividi-la em limites de 512 bytes, não por linhas.
2. Codificar cada fragmento em hexadecimal uma única vez.
3. Chamar `zallet -c <config> rpc z_sendmany` com a UA com fundos, o array de destinatários e sem argumento de taxa.
4. Consultar `z_getoperationstatus` para esse ID de operação.
5. Registar o txid apenas após `success`.

A página do tutorial antigo continua em [Scripts da newsletter blindada](/tutorials/shieldednewsletter/readme). Utilize esta página para o procedimento.
