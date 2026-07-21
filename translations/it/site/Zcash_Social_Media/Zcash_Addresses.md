# Zero to Zero Knowledge: transazioni trasparenti vs schermate e Unified Address

**Serie:** Zero to Zero Knowledge

Se stai imparando a conoscere Zcash per la prima volta, scoprirai che sono disponibili due tipi di transazione: **Trasparenti** e **Schermate**.  

Oggi le impariamo a conoscere e trattiamo una delle nuove funzionalità dell'ecosistema #Zcash, gli **Unified Address**.

---

## Transazioni trasparenti vs schermate

- Le **transazioni trasparenti** usano gli **indirizzi-t** (codificati in Base58). Tutto è pubblicamente visibile, proprio come in Bitcoin.  
- Le **transazioni schermate** usano indirizzi codificati per le pool **Sapling** o **Orchard**. Queste nascondono mittente, destinatario e importo usando prove a conoscenza zero.

**Transazione schermata** si riferisce a qualsiasi transazione con indirizzi codificati per le pool Sapling/Orchard.

![Transparent vs Shielded intro](https://pbs.twimg.com/media/FpmW00HWIAIZpQD.jpg)

Gli **Unified Address (UA)** sono progettati per **unificare** le transazioni schermate o trasparenti in un unico indirizzo.

---

## Tipi di indirizzo in Zcash

Ci sono 3 tipi di indirizzo in uso:

1. **(T) Trasparente** – Base58  
2. **(Z) Sapling** – Bech32  
3. **(UA) Unified Address** – Bech32m  

Il numero di caratteri (e quindi la dimensione del codice QR) aumenta con ciascun tipo.

![Address types comparison](https://pbs.twimg.com/media/FpmXe5bXsAEFeLY.png)

![QR code size comparison](https://pbs.twimg.com/media/FpmXmDwXoAIWxov.png)

---

## Come funzionano gli Unified Address

Indirizzi e chiavi sono codificati come una sequenza di byte (**Raw Encoding**).  
Una **Receiver Encoding** include tutte le informazioni necessarie per trasferire un asset usando uno specifico protocollo.

La codifica grezza di un Unified Address è una combinazione di codifiche (typecode, lunghezza, addr) dei receiver:

- UA: `0x03`  
- Sapling: `0x02`  
- Trasparente: `0x01`  

**Importante**: deve esserci **almeno un indirizzo di pagamento schermato** in ogni UA. (Gli indirizzi Sprout non sono più supportati dopo l'aggiornamento Canopy.)

![UA encoding structure](https://pbs.twimg.com/media/FpmYW1ZXgAAvALT.png)

Specifica completa: **[ZIP-316: Unified Addresses](https://zips.z.cash/zip-0316)**

---

## Vantaggi degli Unified Address

- **Più semplice per gli exchange** - Ora possono supportare in modo più sicuro depositi/prelievi schermati.  
- **A prova di futuro** - È possibile aggiungere nuove pool schermate senza rompere i wallet.  
- **Shielded-by-Default** - Ogni UA contiene almeno un indirizzo schermato, quindi la privacy è sempre disponibile.

Si tratta di un cambiamento fondamentale che sta già aiutando più ZEC a spostarsi nella pool schermata.

---

## Transazioni e Action di Orchard

Orchard ha introdotto un nuovo concetto chiamato **Action**:

- Riducono la fuoriuscita di metadati usando un **singolo anchor** per tutte le Action di una transazione.  
- Fondono i campi di Spend + Output (V4) in un unico value commitment.  
- Questo abilita ottimizzazioni delle prestazioni del sistema di prove Halo2.

Daira spiega le posizioni degli anchor (zcon3):

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f6UToqiIdeY"
    title="Zcon3"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

## Bilancio del valore e privacy

In alcuni casi (ad esempio le transazioni tra pool diverse) gli importi possono essere visibili a un osservatore esterno. Tuttavia, `valueBalanceSapling` e `valueBalanceOrchard` usano **commitment omomorfici** per provare il totale di ZEC nelle pool schermate e impedire la contraffazione.

Approfondisci: [Defense Against Counterfeiting in Shielded Pools](https://electriccoin.co/blog/defense-against-counterfeiting-in-shielded-pools/)

---

## Miglioramenti futuri

Il team ECC sta lavorando a nuovi metodi RPC in `zcashd` (che sostituiranno `z_sendmany`) che permetteranno agli utenti di visualizzare in anteprima e accettare/rifiutare una transazione proposta in base alle sue caratteristiche di privacy.

---

## Raccomandazione

Prova l'ultima versione di **YWallet**!  
Mostra già un "Transaction Plan" sullo schermo prima di premere invio, aiutandoti a fare scelte più private.

Ottimo articolo sulla privacy delle transazioni: https://medium.com/@hanh.huynh/

---

**Thread originale di ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1628498645627666432

---

*Questa pagina è stata compilata a partire dal thread originale Zero to Zero Knowledge per la wiki di ZecHub.*
