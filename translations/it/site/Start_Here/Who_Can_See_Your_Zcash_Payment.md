<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Chi può vedere il tuo pagamento in Zcash?

## In breve

- Zcash ti offre **due tipi di indirizzo**: trasparente (`t`) e schermato (`z` o `u`).
- Quanto il pubblico può vedere dipende da quali tipi di indirizzo coinvolge il tuo pagamento.
- Solo un pagamento **da schermato a schermato** nasconde il mittente, il destinatario e l'importo.
- Un indirizzo schermato non è una singola chiave. È un piccolo insieme di chiavi, e puoi concedere **accesso in sola lettura senza cedere la possibilità di spendere**.
- Una viewing key **non può essere ritirata** una volta condivisa.

---

## La prima cosa da capire

Sulla maggior parte delle blockchain non c'è alcuna scelta da fare. Tutto ciò che invii è pubblico, per sempre, per chiunque guardi.

Zcash invece ti offre una scelta. Questa scelta viene fatta due volte: **una volta quando scegli a quale indirizzo inviare, e una volta quando decidi chi riceve una chiave per leggere la tua cronologia.**

L'immagine qui sotto copre entrambi gli aspetti.

![Tipi di chiavi Zcash e cosa può vedere un block explorer per ciascuno dei quattro percorsi di transazione](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## Prima scelta: quale indirizzo

Ogni pagamento in Zcash si sposta tra due indirizzi, e ciascuno può essere trasparente o schermato. Questo crea quattro percorsi, e ognuno espone una quantità diversa di informazioni.

Il modello è più semplice di quanto sembri: **qualsiasi cosa tocchi un indirizzo trasparente diventa pubblica.** Un pagamento che rimane interamente all'interno del pool schermato non rivela nulla tranne la commissione.

Questo è particolarmente importante quando prelevi da un exchange. Molti exchange inviano solo a indirizzi trasparenti, quindi il prelievo è pubblico. Scherma tu stesso i fondi una volta arrivati, prima di spenderli.

Per uno sguardo più approfondito su ciò che legge esattamente un explorer, vedi [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see).

---

## Seconda scelta: chi riceve una chiave

Una privacy che non puoi mai rimuovere non è utile. A volte devi dimostrare qualcosa a un commercialista, a un revisore o a un'autorità fiscale. Zcash gestisce questo senza chiederti di rinunciare al controllo.

**Spending key.** Vede tutto e sposta i fondi. Questo è il denaro. Rimane con te e non viene mai condivisa con nessuno, per nessun motivo.

**Full viewing key.** Sola lettura. Mostra attività e saldi in entrata e in uscita, ma non può spendere nemmeno un singolo zatoshi. Questa è ciò che consegni a un revisore o a un commercialista.

**Incoming viewing key.** Ancora più limitata: mostra solo i pagamenti in arrivo. Un exchange o un commerciante può usarla per confermare che il tuo deposito è arrivato, mentre la spending key rimane su hardware che non tocca mai internet.

L'ordine conta. Condividi la chiave più limitata che svolge il compito, non la più ampia che ti capita di avere.

---

## La parte che i principianti si perdono

**Una viewing key non può essere revocata.** Non esiste un pulsante "annulla condivisione". Una volta che qualcuno la possiede, può leggere quell'indirizzo per tutto il tempo in cui esiste. Se devi interrompere l'accesso, sposti i tuoi fondi su un nuovo indirizzo.

**Le commissioni sono pubbliche anche in un pagamento completamente schermato.** L'importo è nascosto; la commissione no.

**Ciò che è pubblico è permanente.** Qualsiasi cosa la chain mostri oggi, la mostrerà anche tra vent'anni. Decidere di schermare un pagamento *dopo* averlo inviato non è qualcosa che puoi fare.

---

## Mettilo in pratica

- Usa un wallet che scherma per impostazione predefinita, come [Zodl](https://zodl.com) o [Ywallet](https://ywallet.app/).
- Scherma i fondi non appena arrivano da un exchange, prima di spenderli.
- Paga verso indirizzi schermati ogni volta che il destinatario ne supporta uno.
- Prima di condividere una viewing key, chiediti quale sia la chiave più piccola che risponde alla domanda che ti viene posta.

---

## Risorse

- [Spiegazione delle viewing key (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Divulgazione selettiva e viewing key (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing keys](https://zips.z.cash/zip-0310)
- [Come funziona la tecnologia di Zcash](https://z.cash/technology/)

## Pagine correlate

- [Nozioni di base su Zcash](/start-here/what-is-zec-and-zcash)
- [Guida per nuovi utenti di Zcash](/start-here/new-user-guide)
- [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Transazioni](/using-zcash/transactions)

---

*Se desideri aggiungere o suggerire modifiche a questa pagina del wiki, vai al [repo GitHub di ZecHub](https://github.com/ZecHub/zechub) e invia una pull request.*
