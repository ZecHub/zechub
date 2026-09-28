# **Swap SOL/USDC -> ZEC con Encrypt.trade**  


![img1](/content-images/Bkbg5alCll-7a02545c00.webp)


*Effettua uno swap da Solana a Zcash, con il passaggio cross-chain instradato tramite Near Intents.*  

---

###  Introduzione  
[**encrypt.trade**](https://encrypt.trade/zec) è un'app Solana gestita da JMD Labs Inc. Ti consente di scambiare **SOL o USDC** su Solana con **Zcash (ZEC)**. I tuoi token vengono prima convertiti in versioni crittografate, così gli importi sono nascosti su Solana, quindi scambiati con ZEC tramite Near Intents.

Lo swap è privato per certi aspetti, ma non per tutti. La [documentazione](https://docs.encifher.io/docs) dell'app afferma che la tua interazione con la chain non è anonima: le persone possono vedere che il tuo wallet ha utilizzato l'app, ma non quanto hai trasferito. Anche il ZEC arriva a un indirizzo trasparente, quindi resta visibile sulla chain Zcash finché non lo proteggi.


![img2](/content-images/ByQ2qpeRee-67fce2814c.webp)

---

###  Cosa sapere prima di effettuare uno swap  
- **Lato Solana.** Il wrapping nasconde gli importi, ma l'indirizzo del tuo wallet e il suo utilizzo dell'app sono pubblici. Le sue [buone pratiche](https://docs.encifher.io/docs/best-practices) avvertono che un semplice wrap, swap e unwrap rende la tua transazione collegabile.
- **Crittografia.** I saldi crittografati vengono elaborati off-chain all'interno di un'enclave hardware (TEE). Il [documento](https://eprint.iacr.org/2026/1504) degli sviluppatori afferma che ciò dipende dall'integrità del TEE, da una gestione onesta delle chiavi di soglia e dalla root di attestazione cloud, non dalla sola crittografia.
- **Passaggio cross-chain.** Lo swap verso ZEC viene instradato tramite Near Intents, dove solver indipendenti eseguono l'ordine.
- **Lato Zcash.** Near Intents elenca ZEC come supportato solo per [indirizzi trasparenti](https://docs.near-intents.org/resources/chain-support), e il campo ZEC su encrypt.trade accettava solo indirizzi trasparenti (t1 o t3) quando questa guida è stata verificata nel settembre 2026. Un indirizzo trasparente mostra pubblicamente il proprio saldo e i trasferimenti in entrata finché non lo proteggi.
- **Controlli.** L'app verifica i wallet in connessione confrontandoli con database quali TRM e Chainalysis, e la sua [pagina sulla conformità](https://docs.encifher.io/docs/compliance) afferma che i record crittografati possono essere esaminati in presenza di una causa legale legittima. Anche Near Intents esegue i propri [controlli](https://docs.near-intents.org/security-compliance/risk-and-compliance).

---

###  Passaggio 1: collega il tuo wallet Solana  
Visita [encrypt.trade](https://encrypt.trade/zec) usando **Chrome o Firefox** e collega il tuo wallet **Phantom**, **Solflare** o **Slope**. Assicurati che il tuo wallet contenga abbastanza **SOL** per le commissioni gas e i token che desideri scambiare. Una volta connesso, sei pronto a effettuare il wrap dei tuoi asset.  


![img3](/content-images/SyVOs6lRxx-cbd8193e84.webp)





---

![img4](/content-images/Bkh_jTgCex-2fc8428592.webp)


---

###  Passaggio 2: effettua il wrap dei tuoi token  
Vai alla sezione **Wrap**. Scegli **SOL** o **USDC**, inserisci l'importo e conferma. L'app blocca i tuoi asset ed emette **versioni crittografate (eSOL o eUSDC)**. Effettuare il wrap di un importo diverso da quello che scambi rende più difficile associare i due in base all'importo, ma non nasconde il fatto che il tuo wallet abbia usato l'app.  




![img5](/content-images/S10J26xCxg-6322a40b18.webp)

---



![img6](/content-images/Sk0y3Te0gl-124792365a.webp)


---

###  Passaggio 3: prepara il tuo wallet ZODL  
Scarica [**ZODL**](https://zodl.com), il wallet Zcash gestito da ZODL. Nella schermata di ricezione, copia il tuo **indirizzo trasparente Zcash** (inizia con t1). Al momento encrypt.trade non accetta indirizzi schermati o unificati per ZEC. Conserva in modo sicuro la tua seed phrase prima di procedere.  


![img7](/content-images/SykjhpgRll-60d19f6979.webp)


---

###  Passaggio 4: swap  
Torna su **encrypt.trade** e vai su **Swap**. Seleziona **eSOL/eUSDC -> ZEC**, incolla il tuo indirizzo trasparente ZODL, controlla i dettagli e conferma.



![img8](/content-images/SJkI6pl0ge-9f93d8f34c.webp)

---


![img9](/content-images/S1yoapgRle-6d2031a62c.webp)


**Near Intents** gestisce l'instradamento cross-chain e invia il **ZEC** al tuo wallet ZODL. Potrebbero volerci alcuni minuti. Near Intents suggerisce di prevedere fino a 15 minuti per gli swap cross-chain.  



![img10](/content-images/S1h36Tg0xl-2d7dd0a495.webp)

---

###  Passaggio 5: proteggi il tuo ZEC  
Quando il ZEC arriva, usa l'opzione **Shield** di ZODL per trasferirlo nel [pool schermato](/using-zcash/shielded-pools). Fino ad allora si trova a un indirizzo trasparente, dove chiunque può vederne il saldo. La schermatura protegge ciò che fai successivamente, ma il trasferimento in entrata e la transazione di schermatura restano visibili sulla chain. Verifica sempre i link, evita di riutilizzare gli indirizzi e prova prima con piccoli importi.  

---

###  Chi è coinvolto e dove ottenere assistenza  
- **encrypt.trade** è l'app, gestita da JMD Labs Inc. La sua [informativa sulla privacy](https://encrypt.trade/privacy) afferma che raccoglie dati tecnici quali IP, browser e dettagli del dispositivo, invia il tuo indirizzo wallet, la cronologia recente e i saldi ai fornitori di conformità prima di uno swap e può conservare registri e risultati dei controlli AML fino a cinque anni. I suoi [termini](https://encrypt.trade/terms) vietano l'uso di una VPN o di un proxy per nascondere la tua posizione. Assistenza: help@encifher.io o il gruppo [Telegram](https://t.me/+ZWHGMW4ZHXQwYTZl) collegato dall'app.
- **Near Intents** instrada il passaggio cross-chain e consegna il ZEC. Consulta i suoi [termini dell'API 1Click](https://docs.near-intents.org/security-compliance/terms-of-service) e l'informativa sulla privacy su near.com/privacy, monitora gli swap nell'[Explorer di Near Intents](https://explorer.near-intents.org) e chiedi assistenza nella [Near Intents Telegram](https://t.me/near_intents).

I termini e gli indirizzi supportati possono cambiare, quindi verifica le versioni attuali prima di effettuare uno swap di grande importo. Per maggiori informazioni sul quadro generale, consulta [Exchange non custodial](/using-zcash/non-custodial-exchanges).

---

Combinando **Solana**, **Zcash** e **Near Intents**, **encrypt.trade** ti offre un percorso rapido da SOL o USDC a ZEC. Nasconde gli importi su Solana, ma non è privato end-to-end, quindi proteggi il tuo ZEC una volta ricevuto.
