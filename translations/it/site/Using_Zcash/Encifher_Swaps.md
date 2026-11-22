<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Scambio da SOL/USDC a ZEC con encrypt.trade

> Scambia SOL o USDC su Solana in ZEC, con il passaggio cross-chain instradato tramite NEAR Intents.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## TL;DR

* [Encrypt.trade](https://encrypt.trade/zec) esegue il wrap di SOL o USDC in token crittografati (eSOL/eUSDC), poi li scambia in ZEC tramite NEAR Intents.
* Gli importi sono nascosti su Solana, ma l'indirizzo del tuo portafoglio e il suo uso dell'app sono pubblici.
* ZEC viene consegnato solo a un indirizzo trasparente (t1/t3), quindi resta visibile sulla chain Zcash finché non lo schermi.
* Scherma ZEC nel tuo portafoglio appena arriva.
* Sia l'app che NEAR Intents eseguono lo screening dei portafogli per la compliance.

---

## Spiegazione di base
[**encrypt.trade**](https://encrypt.trade/zec) è un'app Solana gestita da JMD Labs Inc. Ti permette di scambiare **SOL o USDC** su Solana in **Zcash (ZEC)**. I tuoi token vengono prima trasformati in versioni crittografate tramite il wrap, così gli importi sono nascosti su Solana, e poi scambiati in ZEC tramite NEAR Intents.

Lo scambio è privato solo in parte. La stessa [documentazione](https://docs.encifher.io/docs) dell'app dice che la tua interazione con la chain non è anonima: le persone possono vedere che il tuo portafoglio ha usato l'app, ma non quanto hai spostato. Anche ZEC arriva su un indirizzo trasparente, quindi resta visibile sulla chain Zcash finché non lo schermi.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Cosa sapere prima di effettuare lo scambio  
- **Lato Solana.** Il wrap nasconde gli importi, ma l'indirizzo del tuo portafoglio e il suo uso dell'app sono pubblici. Le sue [buone pratiche](https://docs.encifher.io/docs/best-practices) avvertono che un semplice wrap, scambio e unwrap rende la tua transazione collegabile.
- **Crittografia.** I saldi crittografati sono elaborati off-chain all'interno di un enclave hardware (TEE). L'[articolo](https://eprint.iacr.org/2026/1504) degli sviluppatori dice che questo si affida all'integrità del TEE, alla gestione onesta delle chiavi threshold e alla root di attestazione del cloud, non alla sola crittografia.
- **Passaggio cross-chain.** Lo scambio in ZEC è instradato tramite NEAR Intents, dove solver indipendenti eseguono l'ordine.
- **Lato Zcash.** NEAR Intents elenca ZEC come supportato solo per [indirizzi trasparenti](https://docs.near-intents.org/resources/chain-support), e il campo ZEC su encrypt.trade accettava solo indirizzi trasparenti (t1 o t3) quando questa guida è stata verificata a settembre 2026. Un indirizzo trasparente mostra pubblicamente il suo saldo e i trasferimenti in arrivo finché non lo schermi.
- **Screening.** L'app controlla i portafogli in fase di collegamento rispetto a database come TRM e Chainalysis, e la sua [pagina di compliance](https://docs.encifher.io/docs/compliance) dice che i record crittografati possono essere esaminati se esiste una causa legale legittima. Anche NEAR Intents esegue il proprio [screening](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passo 1: collega il tuo portafoglio Solana  
Visita [Encrypt.trade](https://encrypt.trade/zec) usando **Chrome o Firefox**, e collega il tuo portafoglio **Phantom**, **Solflare** o **Slope**. Assicurati che il tuo portafoglio contenga abbastanza **SOL** per le commissioni di gas e i token che vuoi scambiare. Una volta collegato, sei pronto per eseguire il wrap dei tuoi asset.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passo 2: esegui il wrap dei tuoi token  
Vai alla sezione **Wrap**. Scegli **SOL** o **USDC**, inserisci l'importo e conferma. L'app blocca i tuoi asset ed emette **versioni crittografate (eSOL o eUSDC)**. Eseguire il wrap di un importo diverso da quello che scambi rende più difficile collegare i due in base all'importo, ma non nasconde che il tuo portafoglio abbia usato l'app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passo 3: prepara il tuo portafoglio ZODL  
Scarica [**ZODL**](https://zodl.com), il portafoglio Zcash mantenuto da ZODL. Nella schermata Receive, copia il tuo **indirizzo trasparente di Zcash** (inizia con t1). Encrypt.trade al momento non accetta indirizzi schermati o unificati per ZEC. Salva in modo sicuro la tua frase mnemonica prima di procedere.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passo 4: scambia  
Di nuovo su **encrypt.trade**, vai a **Swap**. Seleziona **eSOL/eUSDC -> ZEC**, incolla il tuo indirizzo trasparente ZODL, controlla i dettagli e conferma.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents** gestisce l'instradamento cross-chain e invia **ZEC** al tuo portafoglio ZODL. Possono volerci alcuni minuti. NEAR Intents consiglia di prevedere fino a 15 minuti per gli scambi cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passo 5: scherma i tuoi ZEC  
Una volta che ZEC arriva, usa l'opzione **Shield** di ZODL per spostarlo nella [pool schermata](/using-zcash/shielded-pools). Fino ad allora resta a un indirizzo trasparente dove chiunque può vedere il saldo. La schermatura protegge ciò che fai dopo, ma il trasferimento in arrivo e la transazione di schermatura restano visibili on-chain. Verifica sempre i link, evita di riutilizzare gli indirizzi e testa prima piccoli importi.  

---

###  Chi è coinvolto e dove chiedere aiuto  
- **Encrypt.trade** è l'app, gestita da JMD Labs Inc. La sua [informativa sulla privacy](https://encrypt.trade/privacy) dice che raccoglie dati tecnici come IP, dettagli del browser e del dispositivo, invia l'indirizzo del tuo portafoglio, la cronologia recente e i saldi ai provider di compliance prima di uno scambio, e può conservare log e risultati dello screening AML fino a cinque anni. I suoi [termini](https://encrypt.trade/terms) vietano l'uso di una VPN o di un proxy per nascondere la tua posizione. Assistenza: help@encifher.io o il [Telegram gruppo](https://t.me/+ZWHGMW4ZHXQwYTZl) collegato dall'app.
- **NEAR Intents** gestisce il passaggio cross-chain e consegna ZEC. Vedi i suoi [termini dell'API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e l'informativa sulla privacy su near.com/privacy, segui gli scambi sull'[NEAR Intents Explorer](https://explorer.near-intents.org) e chiedi aiuto nel [NEAR Intents gruppoTelegram](https://t.me/near_intents).

I termini e gli indirizzi supportati possono cambiare, quindi verifica le versioni attuali prima di effettuare uno scambio di importo elevato. Per saperne di più sul quadro generale, vedi [exchange non-custodial (senza custodia di terzi)](/using-zcash/non-custodial-exchanges).

---

Combinando **Solana**, **Zcash** e **NEAR Intents**, **encrypt.trade** ti offre una via rapida per passare da SOL o USDC a ZEC. Nasconde gli importi su Solana, ma non è privato da un capo all'altro: scherma i tuoi ZEC appena arrivano.
