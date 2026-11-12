<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Encifher_Swaps.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Scambio da SOL/USDC a ZEC tramite encrypt.trade

> Scambia SOL o USDC su Solana in ZEC, con il passaggio cross-chain instradato tramite NEAR Intents.


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)



---

## In breve

* [encrypt.trade](https://encrypt.trade/zec) converte SOL o USDC in token crittografati (eSOL/eUSDC), quindi li scambia in ZEC tramite NEAR Intents.
* Gli importi sono nascosti su Solana, ma l'indirizzo del tuo portafoglio e il suo utilizzo dell'app sono pubblici.
* ZEC viene consegnato solo a un indirizzo trasparente (t1/t3), quindi è visibile sulla chain di Zcash finché non lo scherma.
* Scherma ZEC nel tuo portafoglio non appena arriva.
* L'app e NEAR Intents sottopongono entrambi i portafogli a controlli di conformità.

---

## Spiegazione principale
[**encrypt.trade**](https://encrypt.trade/zec) è un'app di Solana gestita da JMD Labs Inc. Ti consente di scambiare **SOL o USDC** su Solana in **Zcash (ZEC)**. I tuoi token vengono prima convertiti in versioni crittografate, così gli importi sono nascosti su Solana, quindi vengono scambiati in ZEC tramite NEAR Intents.

Lo scambio è privato sotto alcuni aspetti, ma non sotto tutti. La [documentazione](https://docs.encifher.io/docs) dell'app afferma che la tua interazione con la chain non è anonima: le persone possono vedere che il tuo portafoglio ha usato l'app, ma non quanto hai trasferito. ZEC arriva inoltre a un indirizzo trasparente, quindi rimane visibile sulla chain di Zcash finché non lo scherma.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Cosa sapere prima di effettuare lo scambio  
- **Lato Solana.** La conversione nasconde gli importi, ma l'indirizzo del tuo portafoglio e il suo utilizzo dell'app sono pubblici. Le sue [buone pratiche](https://docs.encifher.io/docs/best-practices) avvertono che una semplice conversione, scambio e riconversione rende la tua transazione collegabile.
- **Crittografia.** I saldi crittografati vengono elaborati off-chain all'interno di un enclave hardware (TEE). Il [documento](https://eprint.iacr.org/2026/1504) degli sviluppatori afferma che ciò dipende dall'integrità del TEE, da una gestione onesta delle chiavi di soglia e dalla radice di attestazione cloud, non dalla sola crittografia.
- **Passaggio cross-chain.** Lo scambio in ZEC viene instradato tramite NEAR Intents, dove solver indipendenti eseguono l'ordine.
- **Lato Zcash.** NEAR Intents indica ZEC come supportato solo per [indirizzi trasparenti](https://docs.near-intents.org/resources/chain-support), e il campo ZEC su encrypt.trade accettava solo indirizzi trasparenti (t1 o t3) quando questa guida è stata verificata nel settembre 2026. Un indirizzo trasparente mostra pubblicamente il suo saldo e i trasferimenti in entrata finché non lo scherma.
- **Controlli.** L'app verifica i portafogli che si connettono rispetto a database come TRM e Chainalysis, e la sua [pagina sulla conformità](https://docs.encifher.io/docs/compliance) afferma che i record crittografati possono essere esaminati in presenza di un legittimo motivo legale. Anche NEAR Intents esegue propri [controlli](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passaggio 1: collega il tuo portafoglio Solana  
Visita [encrypt.trade](https://encrypt.trade/zec) usando **Chrome o Firefox**, quindi collega il tuo portafoglio **Phantom**, **Solflare** o **Slope**. Assicurati che il tuo portafoglio contenga abbastanza **SOL** per le commissioni gas e i token che vuoi scambiare. Una volta collegato, sei pronto a convertire i tuoi asset.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passaggio 2: converti i tuoi token  
Vai alla sezione **Wrap**. Scegli **SOL** o **USDC**, inserisci l'importo e conferma. L'app blocca i tuoi asset ed emette **versioni crittografate (eSOL o eUSDC)**. Convertire un importo diverso da quello che scambi rende più difficile abbinare i due importi, ma non nasconde il fatto che il tuo portafoglio abbia usato l'app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passaggio 3: prepara il tuo portafoglio ZODL  
Scarica [**ZODL**](https://zodl.com), il portafoglio Zcash gestito da ZODL. Nella schermata Ricevi, copia il tuo **indirizzo trasparente Zcash** (inizia con t1). Al momento encrypt.trade non accetta indirizzi schermati o unificati per ZEC. Conserva in modo sicuro la tua frase mnemonica prima di procedere.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passaggio 4: scambia  
Torna su **encrypt.trade** e vai a **Swap**. Seleziona **eSOL/eUSDC -> ZEC**, incolla il tuo indirizzo trasparente ZODL, controlla i dettagli e conferma.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**NEAR Intents** gestisce l'instradamento cross-chain e invia ZEC al tuo portafoglio ZODL. Possono essere necessari alcuni minuti. NEAR Intents suggerisce di prevedere fino a 15 minuti per gli scambi cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passaggio 5: scherma ZEC  
Una volta arrivato ZEC, usa l'opzione **Shield** di ZODL per spostarlo nella [pool schermata](/using-zcash/shielded-pools). Fino ad allora rimane presso un indirizzo trasparente, dove chiunque può vederne il saldo. La schermatura protegge ciò che fai in seguito, ma il trasferimento in entrata e la transazione di schermatura restano visibili sulla chain. Verifica sempre i link, evita di riutilizzare gli indirizzi e prova prima con piccoli importi.  

---

###  Chi è coinvolto e dove ottenere aiuto  
- **encrypt.trade** è l'app, gestita da JMD Labs Inc. La sua [informativa sulla privacy](https://encrypt.trade/privacy) afferma che raccoglie dati tecnici quali IP, browser e dettagli del dispositivo, invia il tuo indirizzo del portafoglio, la cronologia recente e i saldi ai fornitori di conformità prima di uno scambio, e può conservare log e risultati dei controlli AML fino a cinque anni. I suoi [termini](https://encrypt.trade/terms) vietano l'uso di una VPN o di un proxy per nascondere la tua posizione. Supporto: help@encifher.io o il gruppo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) collegato dall'app.
- **NEAR Intents** instrada il passaggio cross-chain e consegna ZEC. Consulta i suoi [termini dell'API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e l'informativa sulla privacy su near.com/privacy, monitora gli scambi sull'[NEAR Intents Explorer](https://explorer.near-intents.org) e chiedi aiuto nel [NEAR Intents Telegram](https://t.me/near_intents).

I termini e gli indirizzi supportati possono cambiare, quindi controlla le versioni attuali prima di un grande scambio. Per saperne di più sul quadro generale, consulta [Exchange non-custodial](/using-zcash/non-custodial-exchanges).

---

Combinando **Solana**, **Zcash** e **NEAR Intents**, **encrypt.trade** ti offre un percorso rapido da SOL o USDC a ZEC. Nasconde gli importi su Solana, ma non è privato end-to-end, quindi scherma ZEC non appena arriva.
