<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Usare ZEC, in privato

#### Schermato (privato) vs. Trasparente

Allo stato attuale, in Zcash esistono due tipi di indirizzi e di transazioni: schermato e trasparente. La differenza tra ZEC schermato e ZEC trasparente è molto semplice. ZEC schermato mantiene privati il tuo denaro e le tue transazioni, mentre ZEC trasparente funziona come Bitcoin, completamente trasparente. Questo significa che chiunque può vedere il tuo saldo e tutte le tue transazioni se conosce il tuo indirizzo.

Quando le persone iniziano a usare ZEC, potrebbero non rendersi conto di quale tipo di indirizzo stanno usando. Questo perché non tutti gli exchange supportano ZEC schermato e/o i prelievi di ZEC schermato. 

Quindi, per esempio, se qualcuno usa Coinbase e acquista ZEC, acquisterebbe ZEC trasparente e potrebbe prelevare quel ZEC solo verso un indirizzo trasparente in un wallet. Wallet come [Zodl](https://zodl.com/) possono schermare i fondi inviati a un indirizzo trasparente per risolvere questo problema, ma non tutti lo sanno. Molte persone, in parole povere, usano ZEC nel modo in cui il loro exchange o il loro wallet principale consente loro.

#### Assicurarti che il tuo ZEC sia schermato

Consigliamo a tutti di autocustodire il proprio ZEC. Vale a dire, sposta il tuo ZEC da un exchange a un wallet. Il modo migliore per sapere se stai usando ZEC schermato, ovvero privato, è guardare l'indirizzo in cui si trova il saldo. Se l'indirizzo inizia con una "z" o "u1", allora il tuo saldo è schermato. Se l'indirizzo inizia con una "t", allora il saldo è trasparente.

In genere ci sono due percorsi per arrivare a ZEC schermato.

Da un exchange che supporta i prelievi **schermati**:

  1. Acquista ZEC in un exchange
  2. Avvia la procedura di prelievo nell'exchange
  3. Apri il tuo wallet ZEC schermato e assicurati che l'indirizzo di ricezione inizi con "u1" o "z"
  4. Esegui il prelievo dal tuo exchange

Da un exchange che supporta i prelievi **trasparenti**:


  1. Acquista ZEC in un exchange
  2. Avvia la procedura di prelievo nell'exchange
  3. Apri il tuo wallet ZEC con autoshielding e usa l'indirizzo di ricezione trasparente
  4. Esegui il prelievo dal tuo exchange
  5. Attendi dieci conferme, quindi scherma il ZEC dal tuo indirizzo trasparente a un indirizzo schermato


Ecco un tutorial su come prelevare ZEC da un exchange. Nota che questo è un prelievo schermato.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
Ecco un tutorial su come schermare il tuo ZEC da un indirizzo trasparente a un indirizzo schermato.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
Ecco un tutorial su come acquistare ZEC su Coinbase e inviarlo a Zashi.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### Transazioni

Dopo esserti assicurato che il tuo ZEC sia in un wallet schermato che supporta gli indirizzi schermati, puoi ora decidere se desideri effettuare transazioni con quel ZEC. Effettuare transazioni con ZEC è semplicissimo. Puoi inviare ZEC a indirizzi schermati o trasparenti a seconda della preferenza della persona. Come per qualsiasi transazione monetaria, ci sono piccole probabilità che le persone possano far trapelare dati. ZEC è il migliore nel contrastare la fuga di dati, ma questo non significa che dovresti usarlo con noncuranza. Ecco alcune cose che è opportuno evitare quando effettui transazioni con ZEC.

- Divulgare il tuo indirizzo schermato
- Usare un indirizzo schermato come tramite per gli indirizzi-t (ovvero il "mixing")
- Effettuare, e divulgare di effettuare, un numero elevato di transazioni da schermato a trasparente
- Far sapere regolarmente alle persone dove spendi ZEC schermato


In sostanza, la cosa migliore da fare con il tuo ZEC è tenerlo in un wallet schermato, effettuare transazioni tra indirizzi schermati ed essere prudente su come usi ZEC in pubblico (ad es. in un bar). Garantire la privacy comporta un certo grado di responsabilità. 

#### Risorse

[Transazioni Zcash](https://zechub.wiki/using-zcash/transactions)
