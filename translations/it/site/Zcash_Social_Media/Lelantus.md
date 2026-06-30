# Zero to Zero Knowledge: il protocollo Lelantus

**Serie:** Zero to Zero Knowledge

Oggi diamo un'occhiata a **Lelantus**!

Rilasciato nel 2019, questo protocollo si basa su Zerocoin. È usato nella valuta **Firo** (precedentemente Zcoin) per abilitare transazioni private on-chain. Per certi aspetti assomiglia a Zcash, ma è nettamente diverso nella maggior parte degli aspetti.

![Lelantus intro](https://pbs.twimg.com/media/Fsk18DgXsAEc0Ob.jpg)

---

## Fondamenta dei protocolli Zcash vs Firo

- **Zcash** - Si basa sul protocollo **Zerocash**  
- **Firo (Zcoin)** - Si basa sul protocollo **Zerocoin**

![Zerocash vs Zerocoin comparison](https://pbs.twimg.com/media/Fsk2Fk7WcAA81ty.png)

---

## Evoluzione dei protocolli di privacy di Firo

Analogamente a Zcash, Firo usa indirizzi schermati per ottenere pagamenti anonimi.

**Cronologia:**
- **Zerocoin** - Solidità compromessa
- **Sigma** - Sistema a denominazioni fisse
- **Lelantus 1.0** - Mancava di prove di sicurezza corrette

![Protocol evolution](https://pbs.twimg.com/media/Fsk2NdaWAAAKVgH.png)

---

## Limitazioni del protocollo Sigma

Il protocollo Σ (Sigma) usato nelle versioni precedenti di Zcoin/Firo aveva una grossa limitazione: gli utenti potevano coniare solo denominazioni fisse.

Questo creava insiemi di anonimato più piccoli e apriva la porta ad attacchi di timing tra le operazioni di mint e di redeem (oltre al problema del "tainted change", il resto contaminato).

![Sigma denominations](https://pbs.twimg.com/media/Fsk2fxfWcAMUBDo.png)

---

## Come Lelantus migliora la privacy

**Lelantus** risolve il problema delle denominazioni fisse consentendo mint da un unico insieme più grande.

Vantaggi chiave:
- Elimina gli insiemi di anonimato a denominazioni fisse
- Riduce gli attacchi di timing tra burn/redeem
- Rimuove il problema del tainted change

**Limitazione**: la dimensione dell'insieme è attualmente limitata a **65.000 coin**.

![Lelantus advantages](https://pbs.twimg.com/media/Fsk2wK3X0AA6MEe.png)

---

## Coin commitment

Un **coin commitment** è un commitment a doppia cecità che codifica il numero seriale del coin e il valore del coin.

Funzionano in modo simile alle **Note** in Zcash.

Il coin commitment viene pubblicato e memorizzato sul ledger quando il coin viene creato (tramite transazioni Mint o Spend).

![Coin commitment diagram](https://pbs.twimg.com/media/Fsk3AWNX0AIHya8.png)

---

## Modello basecoin < - > zerocoin

Lelantus usa il classico modello **basecoin < - > zerocoin**.

**Caratteristica importante**: ora sono possibili riscatti parziali mantenendo nascosti il resto e gli importi.

Come in Zcash, le transazioni trasparenti devono essere selezionate esplicitamente dall'utente.

![Lelantus flow](https://pbs.twimg.com/media/Fsk3HrjXgAMgqmX.png)

---

## One-of-Many Proofs

Lelantus utilizza le **One-of-Many Proofs** per estrarre i valori di input necessari a dimostrare il bilancio senza rivelare l'origine degli input - e senza richiedere un trusted setup.

Queste prove sono usate anche in **Triptych** (menzionato nel nostro thread su CryptoNote).

![One-of-Many Proofs](https://pbs.twimg.com/media/Fsk3Z0nWIAAPD4k.jpg)

---

## Privacy a livello di rete: Dandelion++

I nodi Firo usano lo stesso Network Magic del Magicbean di Zcash.

Come Monero, Firo ha implementato **Dandelion++** per aggiungere privacy offuscando l'indirizzo IP di chi trasmette la transazione.

**Fasi di Dandelion++:**
- **Fase stem** - La transazione viene inoltrata a un singolo nodo casuale invece che a tutti i peer
- **Fase fluff** - Avviata casualmente, poi passa alla normale modalità gossip

Questo rende molto più difficile risalire all'origine di una transazione tramite l'analisi della rete.

![Dandelion++ explanation](https://pbs.twimg.com/media/Fsk4A8VWcAU84MR.png)

---

## Futuro: Lelantus-Spark

**Lelantus-Spark** (previsto per la seconda metà del 2023) introduce due livelli di visibilità opt-in usando una **derivazione in stile ZIP-32** e indirizzi diversificati.

Aggiungerà inoltre il supporto per:
- Multisig
- Asset confidenziali definiti dall'utente

Queste funzionalità sono parallele agli Shielded Assets di Zcash.

![Lelantus-Spark announcement](https://pbs.twimg.com/media/Fsk4jXeXsAACQ3h.jpg)

---

**Thread originale di ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*Questa pagina è stata compilata a partire dal thread originale Zero to Zero Knowledge per il wiki di ZecHub.*
