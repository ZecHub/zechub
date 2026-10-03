# **Come effettuare uno swap per ZEC nel Wallet Phantom**



![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Hai già ZEC su Solana (ad esempio da un token che remunera i titolari in ZEC)? Non scambiarlo. Sposta quel token in un wallet Zcash schermato con [Hai ZEC su Solana? Spostalo in Zcash schermato](/using-zcash/solana-zec-to-shielded).

---

## **ZEC nativo o un token ZEC?**

"ZEC" in Phantom può indicare due asset diversi, quindi assicurati di sapere per quale stai pagando.

- **Il pulsante Swap integrato di Phantom** ti fornisce una rappresentazione token di ZEC su Solana (o su un'altra rete supportata da Phantom). Non è ZEC nativo. Si trova al tuo indirizzo Phantom, non ha funzionalità schermate di Zcash e un wallet Zcash non può vederlo né schermarlo.
- ZEC **nativo** esiste solo sulla blockchain Zcash e viene inviato a un indirizzo Zcash. Per ottenerlo, hai bisogno di un servizio che richieda il tuo indirizzo Zcash, come uno swap all'interno di [ZODL](https://zodl.com), una delle opzioni sulla pagina [DEX](/dex), oppure solswap.org seguito da un prelievo verso il tuo wallet Zcash (Passaggio 8).

### Controlla prima di pagare

- **Rete:** lo ZEC che ricevi dovrebbe essere sulla rete **Zcash**. Se indica Solana, Ethereum o Base, è un token.
- **Asset:** lo ZEC nativo non ha un contratto token né un indirizzo mint. Se il tuo ne mostra uno, è un token. Su Solana esistono anche molti token "ZEC" simili, quindi non basarti solo sul nome. Il token OmniBridge su Solana è `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; è comunque un token, non ZEC nativo.
- **Indirizzo:** lo ZEC nativo va a un indirizzo Zcash, che inizia con `t1`, `u1` o `zs`. Se lo ZEC viene inviato al tuo indirizzo Phantom, stai ricevendo un token.

---

##  **Passaggio 1: Apri l'interfaccia Swap**
Avvia l'app **Phantom** e visita **[solswap.org](https://solswap.org/)** dal browser Phantom. Digita tu stesso l'indirizzo. Il sito funziona su NEAR Intents e può inviare ZEC a un indirizzo Zcash.

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

##  **Passaggio 3: Inserisci l'importo e controlla la quotazione**
- Inserisci l'importo che desideri scambiare.
- Usa l'importo da ricevere mostrato su **solswap.org**. È la quotazione applicabile a questo percorso.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Passaggio 4: Verifica gas e commissioni**
- Conserva in Phantom una quantità sufficiente del token gas della catena di origine per approvare il deposito (*SOL* su Solana, *ETH* su Ethereum).
- Leggi la riga delle commissioni nel preventivo di solswap prima di confermare. Lo Swap integrato di Phantom utilizza una propria struttura commissionale (storicamente una commissione Phantom dello 0,85%, più il gas di rete e una commissione di bridging). Questi valori non si applicano a un deposito su solswap.org.

---

##  **Passaggio 5: Regola le impostazioni (facoltativo)**
Su solswap.org, verifica lo slippage e il minimo quotato da ricevere in quella schermata prima di effettuare il deposito.

Se invece stai visualizzando la schermata **Swap** di Phantom, ti trovi nel percorso dei token indicato nella parte superiore di questa pagina. Chiudila e apri `solswap.org` nel browser Phantom.

---

##  **Passaggio 6: Conferma lo swap**
- Controlla tutti i dettagli dello swap su solswap.org.
- Conferma il deposito in Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Passaggio 7: Monitora lo stato**
- Tieni traccia del deposito nell'attività di solswap.org finché non risulta **Completato**.
- L'ID della transazione Solana o della chain di origine si trova in quella riga dell'attività e nell'explorer della chain di quella rete.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Passaggio 8: Preleva ZEC nativo nel tuo wallet Zcash**
Dopo lo swap, il tuo ZEC compare nel saldo dell'**Account** di solswap.org. Non è ancora sulla rete Zcash, né si trova in Phantom.

1. Apri un wallet Zcash che la [directory](/wallets) contrassegna come **Ironwood: Ready**. Copia un `u1` che il tuo wallet etichetta come schermato. Anche un `t1` funziona, ma quel deposito è pubblico finché non lo scherma.
2. Su solswap.org, vai su **Account** e tocca **Withdraw**. Seleziona **ZEC**, imposta la rete su **Zcash**, incolla l'indirizzo e controlla il primo e l'ultimo carattere prima di confermare.
3. Se **Received amount** e **Fee** rimangono su "–" e il pulsante non fa nulla, il saldo non è perso. Si trova in NEAR Intents sotto la tua chiave Phantom. Completa l'operazione su [near.com](https://near.com): accedi con lo stesso wallet Phantom, apri **Move legacy assets**, tocca **Withdraw** nella riga ZEC (non **Move**), imposta la rete su **Zcash** e incolla lo stesso `u1`. Phantom ti chiederà di **Sign Message**. Conferma solo se la richiesta proviene da `near.com` e il messaggio menziona `"verifying_contract": "intents.near"`. Le schermate complete per questa soluzione alternativa sono in [Got ZEC su Solana? Spostalo su Zcash schermato](/using-zcash/solana-zec-to-shielded).

---

## **Passaggi successivi**
Una volta che ZEC nativo è nel tuo wallet Zcash, mantienilo schermato usando [Usare ZEC privatamente](/guides/using-zec-privately).

Un token ZEC acquistato con il pulsante Swap di Phantom non può essere schermato da Phantom. Quel token è l'asset OmniBridge su Solana. Spostalo con [Hai ZEC su Solana? Spostalo in Zcash schermati](/using-zcash/solana-zec-to-shielded).
