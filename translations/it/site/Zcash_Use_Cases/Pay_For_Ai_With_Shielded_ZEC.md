# <img src="/content-images/programmer-software-engineer-coder-softw-bce5a0cb5b.svg" width="24" height="24" alt="developer icon"/> Paga servizi di AI in privato con ZEC schermato

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Principiante - 10 min
</span>


## TL;DR

- **NanoGPT** accetta direttamente ZEC schermato, senza account e senza email
- La ricarica minima è di **$0.10**, quindi puoi provarlo spendendo pochissimo
- Il credito arriva in circa **30 secondi**, alla prima conferma
- Per i servizi che non accettano ZEC, usa **CrossPay** per spendere ZEC schermato e farli pagare in USDC
- Ciò che finisce on-chain dipende da **in quale pool si trova il tuo ZEC**, e la schermata non te lo dice mai

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Per chi è?

- Chiunque non voglia un abbonamento AI collegato al proprio nome
- Sviluppatori che pagano l'inferenza senza una carta aziendale
- Persone in paesi dove i pagamenti con carta verso i servizi di AI non funzionano
- Chiunque preferisca non fornire un'email solo per provare un modello

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Il problema

Pagare l'AI di solito significa usare una carta, un'email e un account. Questo collega ogni prompt che scrivi alla tua identità legale, e anche il processore di pagamento lo vede.

Le crypto dovrebbero risolvere il problema, ma la maggior parte delle guide è obsoleta. I servizi cambiano ciò che accettano, e una guida scritta un anno fa può indirizzarti verso un percorso che non funziona più.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Perché Zcash?

Un pagamento schermato nasconde il mittente, il destinatario e l'importo. Il servizio viene pagato e nessuno che osserva la chain scopre chi ha pagato o quanto.

Questo vale solo se paghi **da** fondi schermati. Questa pagina specifica chiaramente quando vale e quando no.

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Cosa ti serve

- ZEC in un saldo **schermato**
- Un wallet che possa inviare a un Unified Address. Questa guida usa **Noir Wallet**, un'estensione del browser, così l'intero flusso resta in una sola finestra. Zkool e Zodl funzionano allo stesso modo
- Circa $1 per seguire i passaggi

> **Arrivi da un exchange?** La maggior parte degli exchange, inclusa Binance, consente di prelevare ZEC solo verso indirizzi **transparent**, e non accetterà un indirizzo `u1...` come destinazione. Preleva prima verso un tuo indirizzo transparent, schermalo nel tuo wallet, poi paga dal saldo schermato.

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Percorso 1: paga NanoGPT direttamente

[NanoGPT](https://nano-gpt.com/) ti dà accesso a più di 200 modelli, inclusi GPT, Claude, Gemini e modelli di immagini, e accetta ZEC nativamente.

### Passo 1: Aprilo. Non c'è registrazione

Vai su nano-gpt.com e inizia a usarlo. Ogni sessione è anonima per impostazione predefinita e l'app lo dichiara esplicitamente: *"You are already using NanoGPT privately."* Non c'è alcun account da creare né alcuna email da fornire.

### Passo 2: Salva prima un token di accesso

Prima di caricare denaro, apri **Settings** e crea un token di accesso, poi conservalo in un posto sicuro.

> **Questo passaggio protegge il tuo denaro.** Un saldo anonimo vive nei dati locali del tuo browser. Se cancelli i cookie senza aver salvato un token, il saldo scompare e non esiste un account da cui recuperarlo. Fallo prima di depositare, non dopo.

### Passo 3: Aggiungi saldo

Apri **Balance**, scegli **Custom** e inserisci un importo. Il minimo è **$0.10** e il massimo è $5,000. NanoGPT ti dice cosa puoi acquistare, circa 12 prompt GPT 5.5 o 18 immagini per $1.

![NanoGPT add balance screen showing the custom amount and the ten cent minimum](/content-images/nanogpt-add-balance-acc74a4e6d.webp)

### Passo 4: Scegli Zcash

Seleziona **Digital currencies**, poi **Zcash** dalla griglia.

Otterrai un codice QR, un indirizzo di pagamento e un **transfer minimum** in ZEC per l'importo scelto. Questa cifra viene calcolata nel momento in cui la pagina si carica.

![NanoGPT Zcash deposit screen with the QR code, unified address and transfer minimum](/content-images/nanogpt-zec-deposit-bd1980d2f7.webp)

### Passo 5: Invia dal tuo wallet

Copia l'indirizzo nel tuo wallet, inserisci l'importo e invia. La commissione di rete è circa **0.00015 ZEC**.

> **Invia leggermente più del minimo.** Il preventivo viene calcolato quando la pagina si carica e il prezzo di ZEC si muove prima che la tua transazione venga confermata. Nei test, inviando esattamente il minimo sono arrivati **$0.99** invece di $1.00. Inviando un po' di più sono arrivati $1.17 per lo stesso $1 nominale, perché NanoGPT accredita ciò che invii realmente.

![Noir Wallet send screen with the NanoGPT address pasted in and the network fee shown](/content-images/noir-send-6380a5f4ef.webp)

### Passo 6: Aspetta circa 30 secondi

Il tuo wallet mostrerà prima la transazione in attesa, poi in conferma. NanoGPT accredita il saldo alla **prima conferma**, quindi non devi aspettare tutte e tre.

![Wallet confirmation showing the amount sent and the transaction hash](/content-images/noir-sent-2d476e94b9.webp)

Il saldo appare e puoi spenderlo immediatamente.

![NanoGPT balance page showing the credited amount and deposit history](/content-images/nanogpt-balance-0b0c0c86ba.webp)

<br/>

## <img src="/content-images/send-svgrepo-com-b62f643de0.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="send icon"/> Percorso 2: servizi che non accettano ZEC

La maggior parte dei servizi di AI non accetta ZEC. **Venice.ai** e **OpenRouter** accettano invece USDC, e OpenRouter ti permette di scegliere su quale chain verrà regolato il checkout.

Per questi, usa **CrossPay** in [Zodl](/zcash-organizations/zodl). Spendi ZEC schermato e il destinatario viene pagato con l'asset che ha richiesto, instradato tramite NEAR Intents senza un exchange centralizzato e senza KYC.

1. Ottieni l'indirizzo di pagamento del servizio e l'asset e la chain che si aspetta, per esempio USDC su Base
2. Apri Zodl e scegli **CrossPay**
3. Inserisci quell'indirizzo, seleziona l'asset che il servizio vuole e inserisci l'importo
4. Invia dal tuo saldo schermato

Il tuo ZEC esce dalla schermatura. Il servizio vede arrivare un normale pagamento in USDC e non scopre mai che è partito come ZEC.

> La parte di swap è visibile sulla chain di destinazione, quindi il pagamento in USDC stesso è pubblico come qualsiasi altro pagamento in USDC. Ciò che resta privato è il lato Zcash e il collegamento tra i due.

<br/>

## <img src="/content-images/triangle-exclamation-7a4c4150be.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Cosa viene rivelato in ogni passaggio

Questa è la parte che la maggior parte delle guide salta.

| Cosa succede | Cosa apprende il servizio | Cosa finisce on-chain |
|---|---|---|
| Navigazione e prompt | Nulla. Nessun account, nessuna email | Nulla |
| Viene emesso un indirizzo di deposito | Nulla | Nulla |
| Paghi **da Sapling** | L'indirizzo di deposito che hai usato | Nulla. Shielded a shielded |
| Paghi **da Ironwood** | Uguale | **L'importo e l'altezza del blocco** |
| Paghi **da un indirizzo transparent** | Uguale | L'importo e il tuo t-address |
| Qualsiasi caso sopra | Il tuo IP, a meno che tu non usi Tor o una VPN | Non applicabile |

### Perché il pool conta

L'indirizzo di deposito di NanoGPT è un Unified Address. Decodificandone uno emesso nell'agosto 2026 si vedono esattamente due receiver: **Sapling** e **Orchard**.

Da quando l'upgrade [Ironwood](/zcash-tech/ironwood) si è attivato il 28 luglio 2026, Orchard è solo spend-only e nessun nuovo valore può entrarvi. Questo lascia **Sapling come unico receiver in cui un pagamento può effettivamente arrivare**.

Quindi, se il tuo ZEC è già in Sapling, il pagamento è da Sapling a Sapling e nulla di ciò è pubblico. Ma se sei migrato a Ironwood, pagare sposta valore oltre il confine di un pool, e [il turnstile](/zcash-tech/the-turnstile) pubblica l'importo e l'altezza anche se mittente e destinatario restano nascosti.

Le schermate sembrano identiche in entrambi i casi. Mantenere un piccolo saldo Sapling per i pagamenti è la soluzione più semplice.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errori comuni da evitare

- Depositare prima di aver salvato un token di accesso, poi cancellare i cookie
- Inviare esattamente il transfer minimum e ritrovarsi con un centesimo in meno
- Provare a prelevare direttamente da un exchange verso un indirizzo `u1...`
- Dare per scontato che il pagamento sia privato senza controllare da quale pool hai speso
- Pagare tramite una connessione normale quando lo scopo era proprio non essere identificati

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Risultato

Puoi:

- Usare modelli AI di frontiera senza account, email o carta
- Pagare in ZEC schermato e sapere esattamente cosa questo nasconde e cosa no
- Raggiungere servizi che non hanno mai sentito parlare di Zcash, tramite CrossPay

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Correlati

- [Ironwood](/zcash-tech/ironwood) - perché è cambiato il pool in cui si trovano i tuoi fondi
- [Il Turnstile](/zcash-tech/the-turnstile) - cosa diventa pubblico quando il valore attraversa i pool
- [Wallet](/using-zcash/wallets) - quali wallet sono mantenuti
- [ZODL](/zcash-organizations/zodl) - il wallet dietro CrossPay

<br/>

## <img src="/content-images/progress-arrows-svgrepo-com-aad76739e5.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progresso

**Passo 1 di 1**

Hai pagato un servizio di AI con ZEC schermato e sai cosa ha rivelato.

<br/>

## Passo successivo

- [Invia denaro senza collegare la tua identità](/zcash-use-cases/send-money-without-linking-identity)

<br/>
