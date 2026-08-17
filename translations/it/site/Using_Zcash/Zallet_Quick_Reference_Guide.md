<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica Pagina"/>
</a>

# Guida rapida di riferimento per Zallet

## In breve

- Zallet è un wallet full-node di Zcash scritto in Rust. Sostituisce il wallet che prima si trovava all'interno di zcashd.
- zcashd ha raggiunto il suo arresto di Fine Supporto il 18 luglio 2026 e non è più in esecuzione. Zebra ora gestisce il lato nodo; Zallet gestisce il lato wallet.
- Si usa Zallet dalla riga di comando con `zallet rpc <command>`, in modo simile a come prima si usava `zcash-cli`.
- Ogni argomento dopo il nome del comando deve essere JSON valido, il che significa che i valori stringa mantengono le doppie virgolette.
- Zallet è ancora in alpha. I comandi possono cambiare tra una release e l'altra, e non tutte le RPC di zcashd sono già state portate.

## Spiegazione principale

Zallet espone le sue funzionalità tramite JSON-RPC, lo stesso stile di interfaccia usato dal wallet di zcashd. Qualsiasi cosa tu voglia far fare al wallet — controllare un saldo, creare un account, inviare un pagamento shielded — è un comando che passi a `zallet rpc`.

Due aspetti differiscono dalla vecchia abitudine con `zcash-cli` e spiegano la maggior parte degli errori iniziali. Primo, gli argomenti devono essere JSON valido anziché testo semplice, quindi un argomento stringa porta con sé le proprie virgolette all'interno delle virgolette della shell. Secondo, l'insieme dei comandi disponibili dipende dalla release alpha che stai usando, quindi l'elenco incorporato nel tuo binario è più affidabile di qualsiasi pagina scritta, compresa questa.

Per elencare tutte le RPC disponibili:

```bash
zallet rpc help
```

Per ottenere aiuto dettagliato su una RPC specifica:

```bash
zallet rpc help '"<command>"'
```

> **Importante:** Ogni argomento dopo il nome del metodo **deve essere JSON valido**.  
> I valori stringa devono essere scritti come `"value"` (incluse le virgolette doppie).

## Errori comuni

- **Omettere le virgolette interne negli argomenti stringa.** `zallet rpc validateaddress u1abc...` fallisce, perché l'indirizzo deve arrivare come JSON. Deve essere scritto `'"u1abc..."'`.
- **Dare per scontato che ogni RPC di zcashd esista anche qui.** Il porting è ancora in corso. Alcuni metodi si comportano in modo identico, alcuni richiedono un uso diverso e alcuni non verranno trasferiti affatto.
- **Trattare questa pagina come più autorevole del proprio binario.** Zallet è in alpha e si evolve rapidamente. Quando un comando qui non funziona, controlla `zallet rpc help` prima di presumere che qualcosa sia rotto.
- **Aspettarsi che Zallet sia un nodo.** È la metà wallet della coppia. Zebra esegue il nodo, e Zallet comunica con esso.

## Comandi RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parametro  | Tipo   | Obbligatorio | Descrizione              |
|------------|--------|--------------|--------------------------|
| hexstring  | string | sì           | Stringa hex transazione  |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parametro  | Tipo   | Obbligatorio | Descrizione    |
|------------|--------|--------------|----------------|
| hexstring  | string | sì           | Script hex     |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parametro | Tipo   | Obbligatorio | Predefinito | Descrizione                           |
|-----------|--------|--------------|-------------|---------------------------------------|
| txid      | string | sì           |             | ID della transazione                  |
| verbose   | number | no           | 0           | `0` = hex, non-zero = oggetto JSON    |
| blockhash | string | no           |             | Limita la ricerca a questo blocco     |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Nessun parametro.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Nessun parametro.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Nessun parametro.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Nessun parametro. Restituisce lo schema OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Nessun parametro. (Solo Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parametro | Tipo   | Obbligatorio | Descrizione              |
|-----------|--------|--------------|--------------------------|
| address   | string | sì           | Indirizzo trasparente    |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parametro | Tipo   | Obbligatorio | Descrizione              |
|-----------|--------|--------------|--------------------------|
| address   | string | sì           | Indirizzo trasparente    |
| signature | string | sì           | Firma Base64             |
| message   | string | sì           | Messaggio originale      |

---

### walletlock

```bash
zallet rpc walletlock
```

Nessun parametro.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parametro  | Tipo   | Obbligatorio | Descrizione                              |
|------------|--------|--------------|------------------------------------------|
| passphrase | string | sì           | Passphrase del wallet                    |
| timeout    | number | sì           | Secondi per mantenere il wallet sbloccato|

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parametro             | Tipo   | Obbligatorio | Descrizione               |
|-----------------------|--------|--------------|---------------------------|
| transparent_address   | string | sì           | Indirizzo P2PKH da convertire |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parametro | Tipo   | Obbligatorio | Descrizione                                   |
|-----------|--------|--------------|-----------------------------------------------|
| address   | string | sì           | Indirizzo Sapling di cui esportare la spending key |

> Il wallet deve essere sbloccato. Esporta solo la Sapling spending key.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parametro    | Tipo   | Obbligatorio | Descrizione     |
|--------------|--------|--------------|-----------------|
| account_uuid | string | sì           | UUID account    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parametro         | Tipo            | Obbligatorio | Descrizione                               |
|-------------------|-----------------|--------------|-------------------------------------------|
| account           | string / number | sì           | UUID account o indice account ZIP-32      |
| receiver_types    | array of string | no           | Tipi di receiver da includere             |
| diversifier_index | number          | no           | Indice del diversifier specifico          |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parametro | Tipo            | Obbligatorio | Predefinito | Descrizione                      |
|-----------|-----------------|--------------|-------------|----------------------------------|
| account   | string / number | sì           |             | UUID account o indice ZIP-32     |
| minconf   | number          | no           | 1           | Conferme minime                  |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parametro | Tipo   | Obbligatorio | Predefinito | Descrizione           |
|-----------|--------|--------------|-------------|-----------------------|
| minconf   | number | no           | 1           | Conferme minime       |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parametro    | Tipo   | Obbligatorio | Descrizione                              |
|--------------|--------|--------------|------------------------------------------|
| account_name | string | sì           | Nome leggibile da umani                  |
| seedfp       | string | no           | Obbligatorio se il wallet ha più seed    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parametro    | Tipo   | Obbligatorio | Predefinito | Descrizione                           |
|--------------|--------|--------------|-------------|---------------------------------------|
| minconf      | number | no           | 1           | Conferme minime                       |
| as_of_height | number | no           |             | Interroga a questa altezza (`-1` = tip)|

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parametro   | Tipo            | Obbligatorio | Descrizione                               |
|-------------|-----------------|--------------|-------------------------------------------|
| operationid | array of string | no           | ID operazione (ometti per tutte le concluse) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parametro   | Tipo            | Obbligatorio | Descrizione                           |
|-------------|-----------------|--------------|---------------------------------------|
| operationid | array of string | no           | ID operazione (ometti per tutte)      |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parametro         | Tipo    | Obbligatorio | Predefinito | Descrizione                    |
|-------------------|---------|--------------|-------------|--------------------------------|
| minconf           | number  | no           | 1           | Conferme minime                |
| include_watchonly | boolean | no           | false       | Includi i saldi watch-only     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parametro | Tipo    | Obbligatorio | Predefinito | Descrizione                          |
|-----------|---------|--------------|-------------|--------------------------------------|
| account   | string  | sì           |             | UUID account                         |
| hex_data  | string  | sì           |             | Chiave pubblica hex o redeem script  |
| rescan    | boolean | no           | true        | Riesegui la scansione dopo l'import  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parametro    | Tipo   | Obbligatorio | Predefinito     | Descrizione                              |
|--------------|--------|--------------|-----------------|------------------------------------------|
| key          | string | sì           |                 | Sapling extended spending key            |
| rescan       | string | no           | `"whenkeyisnew"` | `"yes"`, `"no"`, o `"whenkeyisnew"`    |
| start_height | number | no           | 0               | Altezza iniziale della scansione         |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parametro         | Tipo    | Obbligatorio | Predefinito | Descrizione                                 |
|-------------------|---------|--------------|-------------|---------------------------------------------|
| include_addresses | boolean | no           | true        | Restituisce anche gli indirizzi per ogni account |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parametro | Tipo   | Obbligatorio | Descrizione                                |
|-----------|--------|--------------|--------------------------------------------|
| status    | string | no           | Filtra per stato (es. `"success"`)         |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parametro    | Tipo   | Obbligatorio | Descrizione                    |
|--------------|--------|--------------|--------------------------------|
| account_uuid | string | no           | Limita a un solo account       |
| start_height | number | no           | Limite inferiore inclusivo     |
| end_height   | number | no           | Limite superiore esclusivo     |
| offset       | number | no           | Salta questo numero di risultati |
| limit        | number | no           | Numero massimo di risultati da restituire |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parametro       | Tipo   | Obbligatorio | Descrizione                    |
|-----------------|--------|--------------|--------------------------------|
| unified_address | string | sì           | Unified Address da ispezionare |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parametro         | Tipo            | Obbligatorio | Predefinito | Descrizione                    |
|-------------------|-----------------|--------------|-------------|--------------------------------|
| minconf           | number          | no           | 1           | Conferme minime                |
| maxconf           | number          | no           | ∞           | Conferme massime               |
| include_watchonly | boolean         | no           | false       | Includi watch-only             |
| addresses         | array of string | no           |             | Filtra per questi indirizzi    |
| as_of_height      | number          | no           |             | Interroga a questa altezza     |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parametro | Tipo  | Obbligatorio | Descrizione                                                                 |
|-----------|-------|--------------|-----------------------------------------------------------------------------|
| accounts  | array | sì           | Array di oggetti: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parametro      | Tipo            | Obbligatorio | Predefinito     | Descrizione                                      |
|----------------|-----------------|--------------|-----------------|--------------------------------------------------|
| fromaddress    | string          | sì           |                 | Indirizzo sorgente o `"ANY_TADDR"`               |
| amounts        | array of object | sì           |                 | Destinatari (`address`, `amount`, `memo` opzionale) |
| minconf        | number          | no           |                 | Conferme minime                                  |
| fee            | null            | no           |                 | Deve essere `null` (solo ZIP-317)                |
| privacy_policy | string          | no           | `"FullPrivacy"` | Stringa della privacy policy                     |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parametro      | Tipo   | Obbligatorio | Descrizione                                      |
|----------------|--------|--------------|--------------------------------------------------|
| fromaddress    | string | sì           | Indirizzo trasparente o UUID account             |
| toaddress      | string | sì           | Destinazione shielded                            |
| fee            | null   | no           | Deve essere `null`                               |
| limit          | number | no           | Numero massimo di UTXO coinbase da schermare     |
| memo           | string | no           | Memo codificato in hex                           |
| privacy_policy | string | no           | `AllowRevealedSenders` o `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parametro | Tipo   | Obbligatorio | Descrizione         |
|-----------|--------|--------------|---------------------|
| txid      | string | sì           | ID della transazione |

---

## Pagine correlate

- [Guida alla migrazione: da Zcashd a Zebrad e Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — passaggio passo dopo passo da una configurazione zcashd esistente
- [Nodo completo Zebra](/zcash-tech/zebra-full-node) — l'implementazione del nodo con cui Zallet lavora insieme
- [Nodi completi](/zcash-tech/full-nodes) — cosa comporta eseguire un nodo completo e perché potresti volerne uno
- [Wallet](/using-zcash/wallets) — opzioni di wallet più leggere se un nodo completo è più di quanto ti serva
- [Transazioni](/using-zcash/transactions) — come differiscono le transazioni shielded e trasparenti
