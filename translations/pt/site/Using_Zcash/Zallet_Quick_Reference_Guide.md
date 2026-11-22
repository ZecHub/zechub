<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guia de referência rápida da Zallet

## TL;DR

- A Zallet é uma carteira de nó integral do Zcash escrita em Rust. Ela substitui a carteira que antes ficava dentro do zcashd.
- O zcashd atingiu sua parada de fim de suporte em 18 de julho de 2026 e não funciona mais. O Zebra agora cuida da parte do nó; a Zallet cuida da parte da carteira.
- Você controla a Zallet pela linha de comando com `zallet rpc <command>`, de forma muito parecida com o uso que fazia do `zcash-cli` antes.
- Todo argumento após o nome do comando deve ser um JSON válido, o que significa que os valores de string mantêm suas aspas duplas.
- A Zallet está em beta. Os comandos podem mudar entre versões, e nem todas as RPCs do zcashd foram portadas ainda.

## Explicação principal

A Zallet expõe suas funcionalidades por meio de JSON-RPC, o mesmo estilo de interface que a carteira do zcashd usava. Tudo o que você quiser que a carteira faça (verificar um saldo, criar uma conta, enviar um pagamento blindado) é um comando que você passa para `zallet rpc`.

Duas coisas são diferentes do antigo hábito com o `zcash-cli` e explicam a maioria dos erros iniciais. Primeiro, os argumentos devem ser JSON válido em vez de texto simples, então um argumento de string leva suas próprias aspas dentro das aspas do shell. Segundo, o conjunto de comandos disponíveis depende da versão beta que você está usando, então a lista embutida no seu binário é mais confiável do que qualquer página escrita, incluindo esta.

Para listar todas as RPCs disponíveis:

```bash
zallet rpc help
```

Para obter ajuda detalhada sobre uma RPC específica:

```bash
zallet rpc help '"<command>"'
```

> **Importante:** Todo argumento após o nome do método **deve ser um JSON válido**.  
> Valores de string devem ser escritos como `"value"` (incluindo as aspas duplas).

## Erros comuns

- **Omitir as aspas internas em argumentos de string.** `zallet rpc validateaddress u1abc...` falha, porque o endereço precisa chegar como JSON. Ele precisa ser escrito `'"u1abc..."'`.
- **Supor que toda RPC existe aqui.** A portabilidade ainda está em andamento. Alguns métodos se comportam de forma idêntica, alguns exigem um uso diferente e alguns não serão portados de jeito nenhum.
- **Tratar esta página como mais confiável do que o seu binário.** A Zallet está em beta e evolui rapidamente. Quando um comando daqui não funcionar, verifique `zallet rpc help` antes de supor que algo está quebrado.
- **Esperar que a Zallet seja um nó.** Ela é a metade carteira da dupla. O Zebra executa o nó, e a Zallet se comunica com ele.

## Comandos RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parâmetro   | Tipo   | Obrigatório | Descrição                |
|-------------|--------|----------|--------------------------|
| hexstring   | string | sim      | String hex da transação  |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parâmetro   | Tipo   | Obrigatório | Descrição       |
|-------------|--------|----------|-----------------|
| hexstring   | string | sim      | Script em hex   |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parâmetro  | Tipo   | Obrigatório | Padrão  | Descrição                            |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | sim      |         | ID da transação                      |
| verbose    | number | não      | 0       | `0` = hex, diferente de zero = objeto JSON |
| blockhash  | string | não      |         | Restringe a busca a este bloco       |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Sem parâmetros.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Sem parâmetros.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Sem parâmetros.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Sem parâmetros. Retorna o schema OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Sem parâmetros. (Somente regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parâmetro | Tipo   | Obrigatório | Descrição               |
|-----------|--------|----------|-------------------------|
| address   | string | sim      | Endereço transparente   |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parâmetro  | Tipo   | Obrigatório | Descrição               |
|------------|--------|----------|-------------------------|
| address    | string | sim      | Endereço transparente   |
| signature  | string | sim      | Assinatura em Base64    |
| message    | string | sim      | Mensagem original       |

---

### walletlock

```bash
zallet rpc walletlock
```

Sem parâmetros.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parâmetro   | Tipo   | Obrigatório | Descrição                            |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | sim      | Senha da carteira                    |
| timeout     | number | sim      | Segundos para manter a carteira desbloqueada |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parâmetro             | Tipo   | Obrigatório | Descrição                  |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | sim      | Endereço P2PKH a converter |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parâmetro | Tipo   | Obrigatório | Descrição                                        |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | sim      | Endereço Sapling cuja chave de gastos será exportada |

> A carteira deve estar desbloqueada. Exporta apenas a chave de gastos Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parâmetro     | Tipo   | Obrigatório | Descrição       |
|---------------|--------|----------|-----------------|
| account_uuid  | string | sim      | UUID da conta   |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parâmetro          | Tipo            | Obrigatório | Descrição                                |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | sim      | UUID da conta ou índice de conta ZIP-32  |
| receiver_types     | array of string | não      | Tipos de receptor a incluir              |
| diversifier_index  | number          | não      | Índice de diversificador específico      |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parâmetro | Tipo            | Obrigatório | Padrão  | Descrição                        |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | sim      |         | UUID da conta ou índice ZIP-32   |
| minconf   | number          | não      | 1       | Mínimo de confirmações           |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parâmetro | Tipo   | Obrigatório | Padrão  | Descrição                 |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | não      | 1       | Mínimo de confirmações    |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parâmetro     | Tipo   | Obrigatório | Descrição                                |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | sim      | Nome legível                             |
| seedfp        | string | não      | Obrigatório se a carteira tiver várias seeds |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parâmetro     | Tipo   | Obrigatório | Padrão  | Descrição                            |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | não      | 1       | Mínimo de confirmações               |
| as_of_height  | number | não      |         | Consulta a partir desta altura (`-1` = topo) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parâmetro    | Tipo            | Obrigatório | Descrição                                |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | não      | IDs das operações (omita para todas as concluídas) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parâmetro    | Tipo            | Obrigatório | Descrição                      |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | não      | IDs das operações (omita para todas) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parâmetro          | Tipo    | Obrigatório | Padrão  | Descrição                       |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | não      | 1       | Mínimo de confirmações          |
| include_watchonly  | boolean | não      | false   | Inclui saldos somente de observação |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parâmetro  | Tipo    | Obrigatório | Padrão  | Descrição                            |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | sim      |         | UUID da conta                        |
| hex_data   | string  | sim      |         | Chave pública em hex ou redeem script |
| rescan     | boolean | não      | true    | Faz um novo escaneamento após a importação |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parâmetro     | Tipo   | Obrigatório | Padrão         | Descrição                                |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | sim      |                | Chave de gastos estendida Sapling          |
| rescan        | string | não      | `"whenkeyisnew"` | `"yes"`, `"no"` ou `"whenkeyisnew"`   |
| start_height  | number | não      | 0              | Altura inicial do novo escaneamento      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parâmetro          | Tipo    | Obrigatório | Padrão  | Descrição                                |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | não      | true    | Também retorna os endereços de cada conta |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parâmetro | Tipo   | Obrigatório | Descrição                            |
|-----------|--------|----------|--------------------------------------|
| status    | string | não      | Filtra por status (por exemplo, `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parâmetro      | Tipo   | Obrigatório | Descrição                    |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | não      | Limita a uma conta           |
| start_height   | number | não      | Limite inferior inclusivo    |
| end_height     | number | não      | Limite superior exclusivo    |
| offset         | number | não      | Pula esta quantidade de resultados |
| limit          | number | não      | Máximo de resultados a retornar |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parâmetro         | Tipo   | Obrigatório | Descrição                    |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | sim      | Endereço unificado a inspecionar |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parâmetro          | Tipo            | Obrigatório | Padrão  | Descrição                            |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | não      | 1       | Mínimo de confirmações               |
| maxconf            | number          | não      | ∞       | Máximo de confirmações               |
| include_watchonly  | boolean         | não      | false   | Inclui somente de observação         |
| addresses          | array of string | não      |         | Filtra por estes endereços           |
| as_of_height       | number          | não      |         | Consulta a partir desta altura       |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parâmetro | Tipo  | Obrigatório | Descrição                                                                   |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | sim      | Array de objetos: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parâmetro        | Tipo            | Obrigatório | Padrão          | Descrição                                        |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | sim      |                 | Endereço de origem ou `"ANY_TADDR"`               |
| amounts          | array of object | sim      |                 | Destinatários (`address`, `amount`, `memo` opcional)|
| minconf          | number          | não      |                 | Mínimo de confirmações                           |
| fee              | null            | não      |                 | Deve ser `null` (somente ZIP-317)                |
| privacy_policy   | string          | não      | `"FullPrivacy"` | String da política de privacidade                |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parâmetro        | Tipo   | Obrigatório | Descrição                                        |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | sim      | Endereço transparente ou UUID da conta           |
| toaddress        | string | sim      | Destino blindado                                 |
| fee              | null   | não      | Deve ser `null`                                  |
| limit            | number | não      | Número máximo de UTXOs de coinbase a blindar     |
| memo             | string | não      | Memorando codificado em hex                      |
| privacy_policy   | string | não      | `AllowRevealedSenders` ou `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parâmetro | Tipo   | Obrigatório | Descrição       |
|-----------|--------|----------|-----------------|
| txid      | string | sim      | ID da transação |

---

## Páginas relacionadas

- [Guia de migração: do zcashd para o Zebrad e a Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet): passo a passo para migrar de uma configuração existente do zcashd
- [Nó integral Zebra](/zcash-tech/zebra-full-node): a implementação de nó com a qual a Zallet trabalha em conjunto
- [Nós integrais](/zcash-tech/full-nodes): o que envolve executar um nó integral e por que você pode querer um
- [Carteiras](/using-zcash/wallets): opções de carteiras mais leves, caso um nó integral seja mais do que você precisa
- [Transações](/using-zcash/transactions): como as transações blindadas e transparentes diferem
