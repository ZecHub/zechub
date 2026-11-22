<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter blindada

> Envie uma note em markdown para uma lista de endereços blindados como memorandos Zcash, usando Zallet. A lista de destinatários e a note ficam fora de endereços transparentes.

Uma newsletter blindada é uma série de transações blindadas. Cada saída paga um valor mínimo para um Unified Address de um destinatário e leva o próximo trecho da note no campo de memorando. Zallet monta e envia essas transações. Zebra e Zaino apenas fornecem dados da chain.

Os scripts ficam em [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Eles foram escritos para uma versão inicial de Zallet e não é seguro executá-los como estão na versão atual. Esta página traz o procedimento atualizado. Verificado com Zallet `v0.1.0-beta.3` e o livro de Zallet em 7 de outubro de 2026.

## O que você precisa

- Zebra totalmente sincronizado, com o RPC vinculado ao localhost.
- Zaino sincronizado com esse nó Zebra.
- Zallet `v0.1.0-beta.3` ou mais recente, build de carteira, com o RPC vinculado ao localhost. O livro lista `z_sendmany` como implementado. Uma taxa numérica é rejeitada: se você passar `fee`, ele deve ser `null`, porque Zallet sempre usa a taxa ZIP 317.
- Uma conta com saldo cujo Unified Address possa gastar fundos blindados.
- Unified Addresses dos destinatários. Um memorando para um endereço transparente gera um erro.

Não coloque um endereço com saldo nem um cookie na wiki ou em um script commitado. O `txBuilderFromFile.sh` atual tem um Unified Address fixo no código. Substitua-o localmente e não faça commit dele.

## Configure Zallet

Gere uma configuração com o Zallet que você está executando e depois aponte-a para Zebra e Zaino. O exemplo do tutorial antigo usa `as_of_version = "0.0.0"` e um caminho pessoal no diretório home. Trate esse arquivo como um retrato de um momento, não como um modelo.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` deve listar `z_sendmany`, `z_getoperationstatus` e `z_getoperationresult`. Vincule o RPC apenas a `127.0.0.1`.

## Lista de destinatários

Um Unified Address por linha, sem aspas e sem linhas em branco. O script lê `daoAddresses.md`. O readme antigo diz `daoAddress.md`. Esse arquivo não está no repositório, e os nomes não coincidem.

```text
u1...
u1...
```

## Envie um memorando

`z_sendmany` é assíncrono. Ele retorna um id de operação. Consulte `z_getoperationstatus` até que o status seja `success` ou um erro. Uma espera fixa de 5 segundos, que é o que o script faz, perde o resultado quando a montagem demora mais. `z_getoperationresult` consome a operação, então não o chame até que o status seja final.

A taxa é omitida. Zallet calcula a ZIP 317. Não passe um número.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

O campo de memorando é hex bruto, com no máximo 512 bytes. `ascii2hex` codifica apenas ASCII. Uma note com qualquer caractere não ASCII falha. `xxd` ou `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` lida com UTF-8.

A política de privacidade tem como padrão `FullPrivacy`. Esse é o padrão correto para um destinatário blindado. Não passe `AllowFullyTransparent`.

## Defeitos do script

Estes defeitos estão no código em 8 de outubro de 2026. Não execute `shieldNewsletter.sh` até que sejam corrigidos.

- Falta `$` em `[[ bytesInFile -lt 512 ]]`. O ramo de memorando único nunca é executado.
- O loop de trechos armazena hex, depois `hex2ascii` o decodifica e então `txBuilderFromFile.sh` o codifica de novo. O último trecho não é enviado, a menos que uma linha posterior ultrapasse 512. Uma linha longa não é dividida. Ela é enviada inteira e pode ultrapassar o memorando de 512 bytes.
- `txBuilderFromFile.sh` chama `./zallet rpc` sem caminho de configuração e espera o binário no diretório atual. Use `zallet -c <config> rpc`.
- `toCurl.sh` se comunica com Zebra na porta 8232 com um cookie e chama `getinfo` e `sendmany`. Zallet não fornece `sendmany`. O loop de espera pela mineração também usa `[[ chainHeight -gt temp ]]` sem `$`, então ele não espera.
- `z_gettotalbalance 0 true` é passado como argumentos posicionais extras. Verifique `rpc help z_gettotalbalance` no binário que você executa antes de usar essa chamada.
- Cada trecho envia `0.0001` ZEC para cada destinatário. A taxa ZIP 317 é cobrada à parte. Uma note longa para muitos endereços gasta mais do que os valores mínimos.

## Depois de uma correção

Um executor corrigido deve:

1. Ler a note como bytes e dividi-la em blocos de 512 bytes, não por linhas.
2. Codificar cada trecho em hex uma única vez.
3. Chamar `zallet -c <config> rpc z_sendmany` com o UA com saldo, o array de destinatários e nenhum argumento de taxa.
4. Consultar `z_getoperationstatus` para esse id de operação.
5. Registrar o txid somente após `success`.

A página do tutorial antigo continua em [Scripts da newsletter blindada](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Use esta página para o procedimento.
