# **Come effettuare uno swap per ZEC nel Wallet Phantom**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

---

## **ZEC nativo o un token ZEC?**

"ZEC" in Phantom può indicare due asset diversi, quindi assicurati di sapere per quale stai pagando.

- **Il pulsante Swap integrato di Phantom** ti fornisce una rappresentazione token di ZEC su Solana (o su un'altra rete supportata da Phantom). Non è ZEC nativo. Si trova al tuo indirizzo Phantom, non ha funzionalità schermate di Zcash e un wallet Zcash non può vederlo né schermarlo.
- ZEC **nativo** esiste solo sulla blockchain Zcash e viene inviato a un indirizzo Zcash. Per ottenerlo, hai bisogno di un servizio che richieda il tuo indirizzo Zcash, come uno swap all'interno di [ZODL](https://zodl.com), una delle opzioni sulla pagina [DEX](/dex), oppure solswap.org seguito da un prelievo verso il tuo wallet Zcash (Passaggio 8).

### Controlla prima di pagare

- **Rete:** il ZEC che ricevi dovrebbe essere sulla rete **Zcash**. Se indica Solana, Ethereum o Base, è un token.
- **Asset:** ZEC nativo non ha un contratto token né un indirizzo mint. Se il tuo ne mostra uno, è un token. Esistono anche molti token "ZEC" simili su Solana, quindi non basarti solo sul nome.
- **Indirizzo:** ZEC nativo viene inviato a un indirizzo Zcash, che inizia con `t1`, `u1` o `zs`. Se il ZEC viene inviato al tuo indirizzo Phantom, stai ricevendo un token.

---

##  **Passaggio 1: Apri l'interfaccia Swap**  
Avvia l'**app Phantom** e visita **[solswap.org](https://solswap.org/)** dal browser Phantom. Il sito utilizza Near Intents e può inviare ZEC a un indirizzo Zcash.  

Anche il pulsante **Swap** di Phantom elenca ZEC, ma così ottieni il token descritto sopra, non ZEC nativo.  


![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Passaggio 2: Seleziona reti e token per il deposito**  
- Scegli la tua **rete di origine** (ad es. *Ethereum* o *Solana*), quindi deposita per effettuare lo swap.  


![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Seleziona un token di base come **SOL, USDT o USDC**.  
- Scegli ZEC come **token di destinazione**.  
- Assicurati che Zcash sia disponibile tramite l'interfaccia di swap.  



![img4](/content-images/ry4QQF-5gx-f3805528ea.webp)

---

##  **Passaggio 3: Inserisci l'importo e controlla il preventivo**  
- Inserisci l'importo che desideri scambiare.  
- Phantom mostrerà un **importo stimato da ricevere** al netto delle commissioni.  


![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Passaggio 4: Controlla gas e commissioni**  
- Per gli **swap sulla stessa chain**, assicurati di avere abbastanza token gas nativi (*ETH per Ethereum, SOL per Solana*).  
- Gli **swap cross-chain** richiedono gas sia sulle chain di origine sia su quelle di destinazione.  
- Controlla il dettaglio delle commissioni:  
  - Commissione Phantom: **0.85%**  
  - Gas di rete  
  - Commissioni del fornitore di bridge (~**0.3%**)  
  
  
---

##  **Passaggio 5: Modifica le impostazioni (facoltativo)**  
Tocca **Impostazioni Swap** per:  
- Regolare lo **slippage** (predefinito **0.3%**, regolabile fino al 30%).  
- Aumentare le **commissioni di priorità** sulle reti congestionate.  

---

##  **Passaggio 6: Conferma lo swap**  
- Controlla tutti i dettagli dello swap.  
- Tocca **Swap Now** per avviare la transazione.  


![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Passaggio 7: Monitora lo stato**  
- Monitora lo swap nella scheda **Attività recenti**.  
- Per gli swap cross-chain, utilizza il tuo **ID transazione** con **Li.Fi Scanner** per aggiornamenti in tempo reale. 


![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Passaggio 8: Preleva ZEC nativo nel tuo wallet Zcash**  
Dopo lo swap, il tuo ZEC appare nel saldo **Account** di solswap.org. Non è ancora sulla rete Zcash e non è nemmeno in Phantom. Per spostarlo:  
- Apri un wallet Zcash come [ZODL](https://zodl.com) e copia il tuo indirizzo di ricezione. Il modulo di prelievo accetta un indirizzo trasparente (`t1`) o unificato (`u1`).  
- Su solswap.org, vai su **Account** e tocca **Withdraw**.  
- Scegli **ZEC**, imposta la rete su **Zcash**, incolla il tuo indirizzo e ricontrollalo prima di confermare.  

---

## **Passaggi successivi**  
Quando ZEC nativo sarà nel tuo wallet Zcash, potrai schermarlo con [questa guida](/guides/using-zec-privately).  

Un token ZEC acquistato con il pulsante Swap di Phantom non può essere schermato in questo modo, perché non è sulla rete Zcash. Dovrai prima scambiarlo con ZEC nativo inviato a un indirizzo Zcash.
