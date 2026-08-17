---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Guia de Referência Rápida do Zallet

## Resumo

- O Zallet é uma wallet Zcash de nó completo escrita em Rust. Substitui a wallet que costumava estar integrada no zcashd.
- O zcashd atingiu a sua paragem de Fim de Suporte em 18 de julho de 2026 e já não é executado. O Zebra trata agora do lado do nó; o Zallet trata do lado da wallet.
- O Zallet é operado a partir da linha de comandos com `zallet rpc <command>`, de forma semelhante ao que fazia antes com `zcash-cli`.
- Todos os argumentos após o nome do comando têm de ser JSON válido, o que significa que os valores de texto mantêm as aspas duplas.
- O Zallet ainda está em alpha. Os comandos podem mudar entre versões, e nem todos os RPC do zcashd foram ainda migrados.

## Explicação Principal

O Zallet expõe a sua funcionalidade através de JSON-RPC, o mesmo estilo de interface que a wallet do zcashd usava. Tudo o que quiser que a wallet faça — verificar um saldo, criar uma conta, enviar um pagamento shielded — é um comando que passa a `zallet rpc`.

Duas coisas diferem do antigo hábito com `zcash-cli` e explicam a maioria dos erros iniciais. Primeiro, os argumentos têm de ser JSON válido em vez de texto simples, por isso um argumento de texto traz as suas próprias aspas dentro das aspas do shell. Segundo, o conjunto de comandos disponíveis depende da versão alpha que está a executar, por isso a lista incorporada no seu binário é mais fiável do que qualquer página escrita, incluindo esta.

Para listar todos os RPC disponíveis:

```bash
zallet rpc help
```

Para obter ajuda detalhada sobre um RPC específico:

```bash
zallet rpc help '"<command>"'
```

> **Importante:** Todos os argumentos após o nome do método **têm de ser JSON válido**.  
> Os valores de texto têm de ser escritos como `"value"` (incluindo as aspas duplas).

## Erros Comuns

- **Omitir as aspas internas em argumentos de texto.** `zallet rpc validateaddress u1abc...` falha, porque o endereço tem de chegar como JSON. Tem de ser escrito como `'"u1abc..."'`.
- **Assumir que todos os RPC do zcashd existem aqui.** A migração ainda está em curso. Alguns métodos comportam-se de forma idêntica, alguns exigem uso diferente e alguns não serão migrados de todo.
- **Tratar esta página como mais autoritativa do que o seu binário.** O Zallet está em alpha e evolui rapidamente. Quando um comando aqui não funcionar, verifique `zallet rpc help` antes de assumir que algo está avariado.
- **Esperar que o Zallet seja um nó.** É a metade wallet do par. O Zebra executa o nó, e o Zallet comunica com ele.

## Comandos RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parâmetro   | Tipo   | Obrigatório | Descrição                    |
|-------------|--------|-------------|------------------------------|
| hexstring   | string | sim         | String hexadecimal da transação |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parâmetro   | Tipo   | Obrigatório | Descrição        |
|-------------|--------|-------------|------------------|
| hexstring   | string | sim         | Script em hex    |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parâmetro | Tipo   | Obrigatório | Predefinição | Descrição                               |
|-----------|--------|-------------|--------------|-----------------------------------------|
| txid      | string | sim         |              | ID da transação                         |
| verbose   | number | não         | 0            | `0` = hex, diferente de zero = objeto JSON |
| blockhash | string | não         |              | Restringir a pesquisa a este bloco      |

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

Sem parâmetros. Devolve o esquema OpenRPC.

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

| Parâmetro | Tipo   | Obrigatório | Descrição              |
|-----------|--------|-------------|------------------------|
| address   | string | sim         | Endereço transparente  |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parâmetro | Tipo   | Obrigatório | Descrição              |
|-----------|--------|-------------|------------------------|
| address   | string | sim         | Endereço transparente  |
| signature | string | sim         | Assinatura Base64      |
| message   | string | sim         | Mensagem original      |

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

| Parâmetro  | Tipo   | Obrigatório | Descrição                             |
|------------|--------|-------------|---------------------------------------|
| passphrase | string | sim         | Palavra-passe da wallet               |
| timeout    | number | sim         | Segundos para manter a wallet desbloqueada |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parâmetro            | Tipo   | Obrigatório | Descrição                    |
|----------------------|--------|-------------|------------------------------|
| transparent_address  | string | sim         | Endereço P2PKH a converter   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parâmetro | Tipo   | Obrigatório | Descrição                                         |
|-----------|--------|-------------|---------------------------------------------------|
| address   | string | sim         | Endereço Sapling cuja spending key será exportada |

> A wallet tem de estar desbloqueada. Exporta apenas a spending key Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parâmetro    | Tipo   | Obrigatório | Descrição        |
|--------------|--------|-------------|------------------|
| account_uuid | string | sim         | UUID da conta    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parâmetro         | Tipo             | Obrigatório | Descrição                               |
|-------------------|------------------|-------------|-----------------------------------------|
| account           | string / number  | sim         | UUID da conta ou índice de conta ZIP-32 |
| receiver_types    | array of string  | não         | Tipos de receiver a incluir             |
| diversifier_index | number           | não         | Índice diversifier específico           |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parâmetro | Tipo             | Obrigatório | Predefinição | Descrição                           |
|-----------|------------------|-------------|--------------|-------------------------------------|
| account   | string / number  | sim         |              | UUID da conta ou índice ZIP-32      |
| minconf   | number           | não         | 1            | Confirmações mínimas                |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parâmetro | Tipo   | Obrigatório | Predefinição | Descrição               |
|-----------|--------|-------------|--------------|-------------------------|
| minconf   | number | não         | 1            | Confirmações mínimas    |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parâmetro    | Tipo   | Obrigatório | Descrição                               |
|--------------|--------|-------------|-----------------------------------------|
| account_name | string | sim         | Nome legível por humanos                |
| seedfp       | string | não         | Obrigatório se a wallet tiver várias seeds |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parâmetro    | Tipo   | Obrigatório | Predefinição | Descrição                               |
|--------------|--------|-------------|--------------|-----------------------------------------|
| minconf      | number | não         | 1            | Confirmações mínimas                    |
| as_of_height | number | não         |              | Consultar nesta altura (`-1` = tip)     |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parâmetro  | Tipo             | Obrigatório | Descrição                                  |
|------------|------------------|-------------|--------------------------------------------|
| operationid| array of string  | não         | IDs de operação (omitir para todas as concluídas) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parâmetro  | Tipo             | Obrigatório | Descrição                           |
|------------|------------------|-------------|-------------------------------------|
| operationid| array of string  | não         | IDs de operação (omitir para todas) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parâmetro         | Tipo    | Obrigatório | Predefinição | Descrição                    |
|-------------------|---------|-------------|--------------|------------------------------|
| minconf           | number  | não         | 1            | Confirmações mínimas         |
| include_watchonly | boolean | não         | false        | Incluir saldos watch-only    |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parâmetro | Tipo    | Obrigatório | Predefinição | Descrição                         |
|-----------|---------|-------------|--------------|-----------------------------------|
| account   | string  | sim         |              | UUID da conta                     |
| hex_data  | string  | sim         |              | Chave pública em hex ou redeem script |
| rescan    | boolean | não         | true         | Reexaminar após importação        |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parâmetro   | Tipo   | Obrigatório | Predefinição   | Descrição                             |
|-------------|--------|-------------|----------------|---------------------------------------|
| key         | string | sim         |                | Sapling extended spending key         |
| rescan      | string | não         | `"whenkeyisnew"` | `"yes"`, `"no"` ou `"whenkeyisnew"` |
| start_height| number | não         | 0              | Altura inicial para reexame           |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parâmetro         | Tipo    | Obrigatório | Predefinição | Descrição                                 |
|-------------------|---------|-------------|--------------|-------------------------------------------|
| include_addresses | boolean | não         | true         | Também devolver endereços de cada conta   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parâmetro | Tipo   | Obrigatório | Descrição                             |
|-----------|--------|-------------|---------------------------------------|
| status    | string | não         | Filtrar por estado (ex.: `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parâmetro    | Tipo   | Obrigatório | Descrição                     |
|--------------|--------|-------------|-------------------------------|
| account_uuid | string | não         | Limitar a uma conta           |
| start_height | number | não         | Limite inferior inclusivo     |
| end_height   | number | não         | Limite superior exclusivo     |
| offset       | number | não         | Ignorar este número de resultados |
| limit        | number | não         | Número máximo de resultados a devolver |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parâmetro       | Tipo   | Obrigatório | Descrição                        |
|-----------------|--------|-------------|----------------------------------|
| unified_address | string | sim         | Unified Address a inspecionar    |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parâmetro         | Tipo             | Obrigatório | Predefinição | Descrição                    |
|-------------------|------------------|-------------|--------------|------------------------------|
| minconf           | number           | não         | 1            | Confirmações mínimas         |
| maxconf           | number           | não         | ∞            | Confirmações máximas         |
| include_watchonly | boolean          | não         | false        | Incluir watch-only           |
| addresses         | array of string  | não         |              | Filtrar para estes endereços |
| as_of_height      | number           | não         |              | Consultar nesta altura       |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parâmetro | Tipo  | Obrigatório | Descrição                                                                    |
|-----------|-------|-------------|------------------------------------------------------------------------------|
| accounts  | array | sim         | Array de objetos: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parâmetro      | Tipo             | Obrigatório | Predefinição    | Descrição                                         |
|----------------|------------------|-------------|-----------------|---------------------------------------------------|
| fromaddress    | string           | sim         |                 | Endereço de origem ou `"ANY_TADDR"`               |
| amounts        | array of object  | sim         |                 | Destinatários (`address`, `amount`, `memo` opcional) |
| minconf        | number           | não         |                 | Confirmações mínimas                              |
| fee            | null             | não         |                 | Tem de ser `null` (apenas ZIP-317)                |
| privacy_policy | string           | não         | `"FullPrivacy"` | String da política de privacidade                 |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parâmetro      | Tipo   | Obrigatório | Descrição                                             |
|----------------|--------|-------------|-------------------------------------------------------|
| fromaddress    | string | sim         | Endereço transparente ou UUID da conta                |
| toaddress      | string | sim         | Destino shielded                                      |
| fee            | null   | não         | Tem de ser `null`                                     |
| limit          | number | não         | Número máximo de UTXOs coinbase a shield              |
| memo           | string | não         | Memo codificado em hex                                |
| privacy_policy | string | não         | `AllowRevealedSenders` ou `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parâmetro | Tipo   | Obrigatório | Descrição       |
|-----------|--------|-------------|-----------------|
| txid      | string | sim         | ID da transação |

---

## Páginas Relacionadas

- [Guia de Migração: Zcashd para Zebrad e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — migração passo a passo a partir de uma configuração existente do zcashd
- [Nó Completo Zebra](/zcash-tech/zebra-full-node) — a implementação de nó com a qual o Zallet funciona
- [Nós Completos](/zcash-tech/full-nodes) — o que envolve executar um nó completo e porque poderá querer um
- [Wallets](/using-zcash/wallets) — opções de wallet mais leves se um nó completo for mais do que precisa
- [Transações](/using-zcash/transactions) — como as transações shielded e transparentes diferem
