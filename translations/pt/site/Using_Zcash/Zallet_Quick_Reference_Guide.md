<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Guia de referência rápida do Zallet

## TL;DR

- O Zallet é uma carteira Zcash de nó integral escrita em Rust. Ele substitui a carteira que antes fazia parte do zcashd.
- O zcashd chegou à sua interrupção de fim de suporte em 18 de julho de 2026 e não é mais executado. O Zebra agora gerencia o lado do nó; o Zallet gerencia o lado da carteira.
- Você opera o Zallet pela linha de comando com `zallet rpc <command>`, de forma semelhante a como usava `zcash-cli` antes.
- Todos os argumentos após o nome do comando precisam ser JSON válido, o que significa que os valores de texto mantêm suas aspas duplas.
- O Zallet está em beta. Os comandos podem mudar entre versões, e nem todos os RPCs do zcashd foram migrados ainda.

## Explicação principal

O Zallet expõe suas funcionalidades por meio de JSON-RPC, o mesmo estilo de interface que a carteira do zcashd usava. Tudo o que você quiser que a carteira faça — verificar um saldo, criar uma conta, enviar um pagamento blindado — é um comando que você passa para `zallet rpc`.

Duas coisas diferem do antigo hábito com `zcash-cli` e explicam a maioria dos erros iniciais. Primeiro, os argumentos precisam ser JSON válido em vez de texto simples, por isso um argumento de texto traz suas próprias aspas dentro das aspas do shell. Segundo, o conjunto de comandos disponíveis depende da versão beta que você está executando, por isso a lista incorporada ao seu binário é mais confiável do que qualquer página escrita, incluindo esta.

Para listar todos os RPCs disponíveis:

```bash
zallet rpc help
```

Para obter ajuda detalhada sobre um RPC específico:

```bash
zallet rpc help '"<command>"'
```

> **Importante:** Todos os argumentos após o nome do método **precisam ser JSON válido**.  
> Os valores de texto têm de ser escritos como `"value"` (incluindo as aspas duplas).

## Erros comuns

- **Omitir as aspas internas em argumentos de texto.** `zallet rpc validateaddress u1abc...` falha, porque o endereço tem de chegar como JSON. Tem de ser escrito como `'"u1abc..."'`.
- **Supor que todos os RPCs existem aqui.** A migração ainda está em andamento. Alguns métodos se comportam de forma idêntica, alguns precisam de uso diferente e alguns não serão migrados.
- **Tratar esta página como mais confiável do que seu binário.** O Zallet está em beta e evolui rapidamente. Quando um comando desta página não funcionar, verifique `zallet rpc help` antes de supor que algo está quebrado.
- **Esperar que o Zallet seja um nó.** Ele é a metade da carteira do par. O Zebra executa o nó, e o Zallet se comunica com ele.

## Comandos RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Tipo   | Obrigatório | Descrição                    |
|-------------|--------|-------------|------------------------------|
| hexstring   | string | sim         | String hexadecimal da transação |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Tipo   | Obrigatório | Descrição        |
|-------------|--------|-------------|------------------|
| hexstring   | string | sim         | Script em hex    |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter  | Tipo   | Obrigatório | Padrão | Descrição                               |
|-----------|--------|-------------|--------------|-----------------------------------------|
| txid       | string | sim         |              | ID da transação                         |
| verbose    | number | não         | 0            | `0` = hex, diferente de zero = objeto JSON |
| blockhash  | string | não         |              | Restringir a busca a este bloco      |

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

Sem parâmetros. Retorna o esquema OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Sem parâmetros. (Apenas Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Tipo   | Obrigatório | Descrição              |
|-----------|--------|-------------|------------------------|
| address   | string | sim         | Endereço transparente  |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Tipo   | Obrigatório | Descrição              |
|-----------|--------|-------------|------------------------|
| address    | string | sim         | Endereço transparente  |
| signature  | string | sim         | Assinatura Base64      |
| message    | string | sim         | Mensagem original      |

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

| Parameter   | Tipo   | Obrigatório | Descrição                             |
|------------|--------|-------------|---------------------------------------|
| passphrase  | string | sim         | Senha da carteira               |
| timeout     | number | sim         | Segundos para manter a carteira desbloqueada |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Tipo   | Obrigatório | Descrição                    |
|----------------------|--------|-------------|------------------------------|
| transparent_address   | string | sim         | Endereço P2PKH a converter   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Tipo   | Obrigatório | Descrição                                         |
|-----------|--------|-------------|---------------------------------------------------|
| address   | string | sim         | Endereço Sapling cuja chave de gastos será exportada |

> A carteira precisa estar desbloqueada. Exporta apenas a chave de gastos Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Tipo   | Obrigatório | Descrição        |
|--------------|--------|-------------|------------------|
| account_uuid  | string | sim         | UUID da conta    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Tipo            | Obrigatório | Descrição                               |
|-------------------|------------------|-------------|-----------------------------------------|
| account            | string / number | sim         | UUID da conta ou índice da conta ZIP-32 |
| receiver_types     | array of string | não         | Tipos de receiver a incluir             |
| diversifier_index  | number          | não         | Índice específico do diversifier           |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Tipo            | Obrigatório | Padrão | Descrição                           |
|-----------|------------------|-------------|--------------|-------------------------------------|
| account   | string / number | sim         |              | UUID da conta ou índice ZIP-32      |
| minconf   | number          | não         | 1            | Confirmações mínimas                |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Tipo   | Obrigatório | Padrão | Descrição               |
|-----------|--------|-------------|--------------|-------------------------|
| minconf   | number | não         | 1            | Confirmações mínimas    |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Tipo   | Obrigatório | Descrição                               |
|--------------|--------|-------------|-----------------------------------------|
| account_name  | string | sim         | Nome legível para humanos                |
| seedfp        | string | não         | Obrigatório se a carteira tiver várias seeds |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Tipo   | Obrigatório | Padrão | Descrição                               |
|--------------|--------|-------------|--------------|-----------------------------------------|
| minconf       | number | não         | 1            | Confirmações mínimas                    |
| as_of_height  | number | não         |              | Consultar a partir desta altura (`-1` = tip)     |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Tipo            | Obrigatório | Descrição                                  |
|------------|------------------|-------------|--------------------------------------------|
| operationid  | array of string | não         | IDs de operação (omitir para todas as concluídas) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Tipo            | Obrigatório | Descrição                           |
|------------|------------------|-------------|-------------------------------------|
| operationid| array of string  | não         | IDs de operação (omitir para todas) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter         | Tipo    | Obrigatório | Padrão | Descrição                    |
|-------------------|---------|-------------|--------------|------------------------------|
| minconf           | number  | não         | 1            | Confirmações mínimas         |
| include_watchonly | boolean | não         | false        | Incluir saldos somente de observação    |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter | Tipo    | Obrigatório | Padrão | Descrição                         |
|-----------|---------|-------------|--------------|-----------------------------------|
| account   | string  | sim         |              | UUID da conta                     |
| hex_data  | string  | sim         |              | Chave pública em hex ou redeem script |
| rescan    | boolean | não         | true         | Reexaminar após a importação        |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Tipo   | Obrigatório | Padrão   | Descrição                             |
|-------------|--------|-------------|----------------|---------------------------------------|
| key         | string | sim         |                | Chave de gastos estendida Sapling         |
| rescan      | string | não         | `"whenkeyisnew"` | `"yes"`, `"no"` ou `"whenkeyisnew"` |
| start_height| number | não         | 0              | Altura inicial do reexame           |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Tipo    | Obrigatório | Padrão | Descrição                                 |
|-------------------|---------|-------------|--------------|-------------------------------------------|
| include_addresses | boolean | não         | true         | Também retornar endereços de cada conta   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Tipo   | Obrigatório | Descrição                             |
|-----------|--------|-------------|---------------------------------------|
| status    | string | não         | Filtrar por status (ex.: `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Tipo   | Obrigatório | Descrição                     |
|--------------|--------|-------------|-------------------------------|
| account_uuid | string | não         | Limitar a uma conta           |
| start_height | number | não         | Limite inferior inclusivo     |
| end_height   | number | não         | Limite superior exclusivo     |
| offset       | number | não         | Ignorar esta quantidade de resultados |
| limit        | number | não         | Número máximo de resultados a retornar |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter         | Tipo   | Obrigatório | Descrição                        |
|-----------------|--------|-------------|----------------------------------|
| unified_address | string | sim         | Unified Address a inspecionar    |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Tipo             | Obrigatório | Padrão | Descrição                    |
|-------------------|------------------|-------------|--------------|------------------------------|
| minconf           | number           | não         | 1            | Confirmações mínimas         |
| maxconf           | number           | não         | ∞            | Confirmações máximas         |
| include_watchonly | boolean          | não         | false        | Incluir somente de observação           |
| addresses         | array of string  | não         |              | Filtrar por estes endereços |
| as_of_height      | number           | não         |              | Consultar nesta altura       |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Tipo  | Obrigatório | Descrição                                                                    |
|-----------|-------|-------------|------------------------------------------------------------------------------|
| accounts  | array | sim         | Array de objetos: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Tipo             | Obrigatório | Padrão    | Descrição                                         |
|----------------|------------------|-------------|-----------------|---------------------------------------------------|
| fromaddress    | string           | sim         |                 | Endereço de origem ou `"ANY_TADDR"`               |
| amounts        | array of object  | sim         |                 | Destinatários (`address`, `amount`, `memo` opcional) |
| minconf        | number           | não         |                 | Confirmações mínimas                              |
| fee            | null             | não         |                 | Deve ser `null` (apenas ZIP-317)                |
| privacy_policy | string           | não         | `"FullPrivacy"` | String da política de privacidade                 |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Tipo   | Obrigatório | Descrição                                             |
|----------------|--------|-------------|-------------------------------------------------------|
| fromaddress    | string | sim         | Endereço transparente ou UUID da conta                |
| toaddress      | string | sim         | Destino blindado                                      |
| fee            | null   | não         | Deve ser `null`                                     |
| limit          | number | não         | Número máximo de UTXOs coinbase a blindar              |
| memo           | string | não         | Memorando codificado em hex                                |
| privacy_policy | string | não         | `AllowRevealedSenders` ou `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Tipo   | Obrigatório | Descrição       |
|-----------|--------|-------------|-----------------|
| txid      | string | sim         | ID da transação |

---

## Páginas relacionadas

- [Guia de migração: zcashd para Zebrad e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — migração passo a passo a partir de uma configuração existente de zcashd
- [Nó integral Zebra](/zcash-tech/zebra-full-node) — a implementação de nó com a qual o Zallet funciona
- [Nós integrais](/zcash-tech/full-nodes) — o que envolve executar um nó integral e por que você pode querer um
- [Carteiras](/using-zcash/wallets) — opções de carteiras mais leves se um nó integral for mais do que você precisa
- [Transações](/using-zcash/transactions) — como as transações blindadas e transparentes diferem
