<a href="https://github.com/zechub/zechub/edit/main/site/guides/Ledger_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guida utente di Ledger Shielded ZEC

> Conserva, ricevi e invia ZEC privati (schermati) con il tuo portafoglio hardware Ledger in Ledger Wallet Desktop.

## In breve

* Dal 23 settembre 2026, Ledger Wallet Desktop supporta gli ZEC schermati. Un account Zcash ha un saldo trasparente e un saldo privato nella pool Ironwood.
* Per ora solo desktop. Il supporto mobile è annunciato come "in arrivo".
* Ti servono un Nano S Plus, Nano X, Stax o Flex (non il modello Nano S originale), Ledger Wallet Desktop 4.21+ e l'ultima app Zcash.
* Fai clic su **Abilita schermato** una sola volta: il tuo Ledger esporta le chiavi di visualizzazione affinché l'app desktop possa trovare i tuoi fondi privati. Le chiavi di spesa non lasciano mai il dispositivo.
* Quando puoi, ricevi all'indirizzo privato (u1...). Spostare ZEC dal tuo saldo trasparente a quello privato funziona, ma collega i due.
* Ogni invio viene esaminato e firmato sullo schermo di Ledger. Controlla lì gli indirizzi, carattere per carattere.

## Spiegazione essenziale

Zcash ha due tipi di saldo. Il saldo trasparente ZEC (indirizzi t1) funziona come Bitcoin: gli importi e gli indirizzi sono pubblici. Il saldo schermato ZEC si trova in una pool schermata, dove mittente, destinatario e importo sono crittografati on-chain.

Ledger conserva le tue chiavi di spesa sul dispositivo hardware. Per mostrare un saldo privato, Ledger Wallet Desktop necessita di una Full Viewing Key unificata (UFVK). Il dispositivo la esporta una sola volta e l'app desktop la usa per analizzare la blockchain alla ricerca delle tue note schermate. Una chiave di visualizzazione può vedere la tua cronologia schermata, ma non può spendere, quindi trattala come informazione privata.

I passaggi seguenti coprono l'installazione dell'app Zcash, l'aggiunta di un account, l'abilitazione del saldo schermato, la ricezione, la schermatura di ZEC trasparenti e l'invio dal saldo schermato.

## Panoramica

Il 23 settembre 2026 Ledger ha aggiunto il supporto nativo schermato per ZEC a Ledger Wallet Desktop. Un account di Zcash ora contiene un saldo trasparente e un saldo privato nella pool Ironwood di Zcash. Le tue chiavi private restano sul tuo Ledger, e ogni transazione viene esaminata e firmata sul dispositivo.

**Solo desktop.** L'annuncio di Ledger afferma che il supporto schermato per ZEC è "disponibile solo su Ledger Wallet Desktop. Il supporto mobile non è disponibile al momento, ma arriverà presto." L'app desktop mostra lo stesso avviso. Verificato il 15 ottobre 2026.

## Preparazione

- Un dispositivo Ledger che esegue l'app Zcash: Nano S Plus, Nano X, Stax o Flex. L'attuale app Zcash non è progettata per il modello Nano S originale.
- Ledger Wallet Desktop 4.21 o successivo, scaricato solo da [ledger.com](https://www.ledger.com). Questa guida ha utilizzato la versione 4.24.0.
- L'ultima app Zcash sul tuo Ledger (3.9.4 quando è stata scritta questa guida).
- Una piccola quantità di ZEC con cui fare una prova. Ogni passaggio seguente è stato eseguito su mainnet con 0,001 ZEC. Ogni transazione comporta una piccola commissione di rete (0,00015 ZEC nel nostro test).
- La tua frase di recupero di 24 parole resta su carta. Non digitarla mai su un computer e non condividerla mai.

## Guida passo per passo (Ledger Wallet Desktop)

**1. Installa o aggiorna l'app Zcash**
- Apri Ledger Wallet, collega e sblocca il tuo Ledger, quindi apri **I miei Ledger**. Consenti la connessione sul dispositivo.
- Cerca **Zcash** nel catalogo delle app, quindi fai clic su **Installa**, oppure su **Aggiorna** se è già installata.
- Apri l'app Zcash sul tuo Ledger. Lo schermo mostra "L'app Zcash è pronta". Scorri verso destra fino a **Informazioni sull'app** per verificare la versione.

**2. Aggiungi un account di Zcash**
- In Ledger Wallet, scegli **Aggiungi account**. In **Seleziona asset**, cerca Zcash e seleziona **Zcash (ZEC)**, non un token wrapped come Binance-Peg Zcash Token.
- Con l'app Zcash aperta sul tuo Ledger, Ledger Wallet trova il tuo account. Selezionalo in **Seleziona gli account che vuoi aggiungere** e fai clic su **Conferma**.
- La pagina dell'account mostra **Saldo disponibile**, **Saldo trasparente** e **Saldo privato**, oltre a un pulsante **Abilita schermatura**.

![Account Zcash in Ledger Wallet Desktop con avviso solo desktop, saldi trasparente e schermato e pulsante “Enable shielded”](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-01-account-desktop-only.png)

**3. Abilita il saldo privato**
- Fai clic su **Abilita schermatura**. La finestra **Abilita il saldo privato di Zcash** presenta quattro passaggi: data di inizio, UFVK, dispositivo e conferma.
- **Data di inizio:** per un nuovo account, mantieni l'altezza della data di inizio alla data odierna. Seleziona "Questo account ha ricevuto ZEC schermati in passato" solo se sai che è avvenuto, perché la scansione dal blocco 0 può richiedere molto tempo.
- **UFVK e dispositivo:** Ledger Wallet chiede al tuo Ledger di esportare il tuo Unified Full Viewing Key (UFVK). Leggi le schermate sul dispositivo e approva. Se visualizzi "Connessione al dispositivo persa", assicurati che l'app Zcash sia aperta, approva tempestivamente e fai clic su **Riprova**.
- Quando visualizzi **UFVK importato con successo**, fai clic su **Avvia sincronizzazione**. Al termine della sincronizzazione, il pulsante diventa **Aggiorna saldo** con l'ora dell'"Ultima sincronizzazione".
- Le chiavi di visualizzazione restano sul tuo computer. Possono trovare i tuoi fondi schermati, ma non possono spenderli.

![Enable Zcash private balance window showing UFVK successfully imported and the Start sync button](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-02-ufvk-imported.png)

**4. Ricevi ZEC e verifica entrambi gli indirizzi sul tuo Ledger**
- Fai clic su **Ricevi** e seleziona il tuo account di Zcash. Ledger Wallet mostra un **Indirizzo per Zcash 1** (trasparente, che inizia con t1) e un **Indirizzo privato per Zcash 1** (che inizia con u1). Gli indirizzi precedenti restano validi.
- Il tuo Ledger mostra "Verifica gli indirizzi Zcash", l'**Indirizzo privato** su due pagine, poi l'**Indirizzo pubblico**. Confronta ogni carattere con lo schermo prima di condividere uno dei due indirizzi, quindi conferma sul dispositivo.
- Preferisci l'indirizzo privato; usa quello trasparente solo quando il mittente non supporta altro.

![Ledger Wallet Receive window showing the transparent address and the private address for Zcash 1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-03-receive-addresses.png)

![Ledger device screens: Verify Zcash addresses, Private address in two pages, then Public Address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-04-device-verify-addresses.png)

**5. Sposta ZEC trasparenti nel tuo saldo privato**
- Fai clic su **Invia**. In **Trasferimento a te stesso**, scegli **Invia al saldo privato**.
- Inserisci un importo oppure usa 25%, 50%, 75% o **Max**. Verifica la commissione di rete, quindi fai clic su **Esamina**.
- Sul tuo Ledger, procedi tra queste schermate: "Esamina la transazione per inviare ZEC", "Trasferisci dall'indirizzo pubblico all'indirizzo privato", l'importo, l'indirizzo di destinazione su due pagine, la commissione e l'altezza di scadenza. Verifica che l'indirizzo di destinazione corrisponda al tuo indirizzo privato del passaggio 4, quindi premi entrambi i pulsanti su **Firma transazione**.
- Ledger Wallet mostra **Transazione inviata**. Nei dettagli della transazione, il tipo indica **Privata (Ironwood)**.
- Ledger Wallet segnala che un trasferimento a te stesso collega i tuoi fondi schermati al tuo indirizzo pubblico. Riceverli direttamente al tuo indirizzo privato li mantiene non collegati.

![Send ZEC window in Ledger Wallet with the Self transfer option Send to private balance](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-05-send-to-private-balance.png)

![Ledger device review screens for moving ZEC from the transparent balance to the private address, ending with Sign transaction and Transaction signed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-06-device-review-shielding.png)

- Dopo la conferma della transazione, il saldo trasparente diminuisce e il saldo privato aumenta. I nuovi fondi schermati vengono visualizzati come "in maturazione" finché non ricevono conferme sufficienti per essere spesi.

![Account Zcash dopo la schermatura: saldo trasparente ridotto, saldo schermato aumentato e mostrato come in maturazione](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-07-balances-after-shielding.png)

**6. Invia ZEC dal tuo saldo privato**
- Quando il saldo privato è spendibile, fai clic su **Invia** e imposta **Trasferisci da** su **Saldo privato**.
- Incolla l'indirizzo del destinatario e inserisci l'importo. Puoi aggiungere un **Memo (facoltativo)** crittografato fino a 512 byte, che solo il destinatario può leggere.
- Esamina il destinatario, l'importo e la commissione sul tuo Ledger, quindi premi entrambi i pulsanti su **Firma transazione**.

![Sent transaction from the private balance in Ledger Wallet transaction details](https://raw.githubusercontent.com/ZecHub/zechub/main/site/guides/assets/ledger-zec-08-private-send.png)

## Da sapere

- Il supporto schermato per ZEC su Ledger è per ora disponibile solo su desktop (verificato il 15 ottobre 2026).
- Il saldo privato di Ledger Wallet utilizza la pool Ironwood.
- Ledger afferma che puoi condividere l'accesso in sola lettura alla cronologia delle tue transazioni con un consulente fiscale. Chiunque disponga delle tue chiavi di visualizzazione può vedere la tua cronologia schermata, quindi condividile solo intenzionalmente.
- Le schermate del dispositivo in questa guida sono state acquisite con l'emulatore Speculos di Ledger (Nano S Plus), che eseguiva l'app Zcash 3.9.4, collegato a Ledger Wallet Desktop 4.24.0 su mainnet di Zcash. Un Ledger fisico esegue la stessa app e mostra le stesse schermate.

## Ulteriore assistenza

- [Novità in Ledger Wallet: supporto nativo per Zcash Shielded](https://www.ledger.com/blog-native-shielded-zcash-support) (annuncio di Ledger)
- [Centro assistenza di Ledger](https://support.ledger.com)
- Pagina dei [portafogli di ZecHub](/using-zcash/wallets)
- [Pool schermate](/using-zcash/shielded-pools) e [chiavi di visualizzazione](/zcash-tech/viewing-keys) su ZecHub
- Un'altra opzione di portafoglio hardware: la [Keystone guida utente di Zashi](/guides/keystone-zashi)
