<a href="https://github.com/ZecHub/zechub/edit/main/site/Using_Zcash/Shielded_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Newsletter blindada

> Envie uma note em markdown para uma lista de endereços blindados como memorandos do Zcash, usando Zallet. A lista de destinatários e a note ficam fora de endereços transparentes.

Uma newsletter blindada é uma série de transações blindadas. Cada saída paga um valor mínimo a um Unified Address do destinatário e contém a próxima parte da note no campo de memorando. Zallet cria e envia essas transações. Zebra e Zaino fornecem apenas dados da chain.

Os scripts estão em [`site/tutorials/shieldedNewsletter`](https://github.com/ZecHub/zechub/tree/main/site/tutorials/shieldedNewsletter). Eles foram escritos para uma versão inicial do Zallet e não é seguro executá-los como estão na versão atual. Esta página apresenta o procedimento atualizado. Verificado com Zallet `v0.1.0-beta.3` e o livro do Zallet em 7 de outubro de 2026.

## O que você precisa

- Zebra totalmente sincronizado, com RPC vinculado a localhost.
- Zaino sincronizado com esse nó Zebra.
- Zallet `v0.1.0-beta.3` ou mais recente, compilação de carteira, com seu RPC vinculado a localhost. O livro lista `z_sendmany` como implementado. Uma taxa numérica é rejeitada: se você passar `fee`, ela deverá ser `null`, pois o Zallet sempre usa a taxa ZIP 317.
- Uma conta com fundos cujo Unified Address possa gastar fundos blindados.
- Endereços Unified dos destinatários. Um memorando em um endereço transparente é um erro.

Não coloque um endereço com fundos nem um cookie na wiki ou em um script enviado ao repositório. O `txBuilderFromFile.sh` atual tem um Unified Address codificado. Substitua-o localmente e não faça commit dele.

## Configurar o Zallet

Gere uma configuração com o Zallet que você está executando e, em seguida, aponte-o para Zebra e Zaino. O exemplo no tutorial antigo usa `as_of_version = "0.0.0"` e um caminho pessoal de diretório inicial. Trate esse arquivo como um retrato, não como um modelo.

```bash
zallet init
zallet -c ~/.zallet/zallet.toml start
zallet -c ~/.zallet/zallet.toml rpc help
```

`rpc help` deve listar `z_sendmany`, `z_getoperationstatus` e `z_getoperationresult`. Vincule o RPC apenas a `127.0.0.1`.

## Lista de destinatários

Um Unified Address por linha, sem aspas e sem linhas em branco. O script lê `daoAddresses.md`. O readme antigo informa `daoAddress.md`. Esse arquivo não está no repositório, e os nomes não correspondem.

```text
u1...
u1...
```

## Enviar um memorando

`z_sendmany` é assíncrono. Retorna um ID de operação. Consulte `z_getoperationstatus` até que o status seja `success` ou ocorra um erro. Uma pausa fixa de 5 segundos, que é o que o script faz, perde o resultado quando a compilação leva mais tempo. `z_getoperationresult` consome a operação, portanto não o chame até que o status seja terminal.

A taxa é omitida. O Zallet calcula ZIP 317. Não passe um número.

```bash
MEMO_HEX=$(printf '%s' "$NOTE" | xxd -p -c 9999)
zallet -c ~/.zallet/zallet.toml rpc z_sendmany \
  "$FROM_UA" \
  "[{\"address\":\"$TO_UA\",\"amount\":0.0001,\"memo\":\"$MEMO_HEX\"}]"
```

O campo de memorando é hexadecimal bruto, com no máximo 512 bytes. `ascii2hex` codifica apenas ASCII. Uma note com qualquer caractere não ASCII falha. `xxd` ou `python3 -c 'import sys; sys.stdout.write(sys.stdin.buffer.read().hex())'` processa UTF-8.

A política de privacidade usa `FullPrivacy` por padrão. Esse é o padrão correto para um destinatário blindado. Não passe `AllowFullyTransparent`.

## Defeitos dos scripts

Eles estão na árvore em 8 de outubro de 2026. Não execute `shieldNewsletter.sh` até que sejam corrigidos.

- Em `[[ bytesInFile -lt 512 ]]` falta `$`. O ramo de memorando único nunca é executado.
- O ciclo de fragmentos armazena hexadecimal, depois `hex2ascii` o decodifica e `txBuilderFromFile.sh` o codifica novamente. O último fragmento não é enviado, a menos que uma linha posterior ultrapasse 512. Uma linha longa não é dividida. Ela é enviada inteira e pode exceder o memorando de 512 bytes.
- `txBuilderFromFile.sh` chama `./zallet rpc` sem caminho de configuração e espera o binário no diretório atual. Use `zallet -c <config> rpc`.
- `toCurl.sh` se comunica com Zebra na porta 8232 com um cookie e chama `getinfo` e `sendmany`. O Zallet não fornece `sendmany`. O ciclo de espera pela mineração também usa `[[ chainHeight -gt temp ]]` sem `$`, portanto não espera.
- `z_gettotalbalance 0 true` é passado como argumentos posicionais extras. Verifique `rpc help z_gettotalbalance` no binário que você executa antes de usar essa chamada.
- Cada fragmento envia `0.0001` ZEC para cada destinatário. A taxa ZIP 317 é cobrada além desse valor. Uma note longa para muitos endereços gasta mais do que os valores mínimos.

## Após uma correção

Um executor corrigido deve:

1. Ler a note como bytes e dividi-la em limites de 512 bytes, não por linhas.
2. Codificar cada fragmento em hexadecimal uma única vez.
3. Chamar `zallet -c <config> rpc z_sendmany` com a UA com fundos, o array de destinatários e sem argumento de taxa.
4. Consultar `z_getoperationstatus` para esse ID de operação.
5. Registrar o txid apenas após `success`.

A página do tutorial antigo continua em [Scripts da newsletter blindada](https://github.com/ZecHub/zechub/blob/main/site/tutorials/shieldedNewsletter/readme.md). Use esta página para o procedimento.
