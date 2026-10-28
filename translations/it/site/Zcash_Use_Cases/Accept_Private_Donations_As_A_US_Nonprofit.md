# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Accetta donazioni private in ZEC come organizzazione non profit statunitense

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermedio - 10 min
</span>

> Questa pagina contiene informazioni generali, non consulenza legale o fiscale. Le norme fiscali statunitensi cambiano, quindi verifica ogni passaggio con il tuo commercialista o consulente fiscale. Ogni regola riportata di seguito rimanda alla relativa fonte IRS, verificata nell'ottobre 2026 rispetto alla Publication 526 (per le dichiarazioni del 2025) e al Form 8283 (revisione di dicembre 2025). Le FAQ IRS sulla valuta virtuale sono state scritte per transazioni precedenti al 2025, quindi confrontale con le linee guida attuali.

## In breve

- Conserva le donazioni in un portafoglio schermato controllato dalla tua organizzazione, non nel portafoglio personale di un membro dello staff
- L'IRS considera ZEC come proprietà, quindi una donazione in ZEC è un contributo non in contanti
- Per una donazione di $250 o più, invia al donatore una conferma scritta che descriva ZEC ma non ne indichi un valore in dollari
- Per donazioni superiori a $5.000, il donatore necessita di una perizia qualificata e tu firmi il suo Form 8283
- Se vendi ZEC entro tre anni dalla ricezione e hai firmato la Section B del Form 8283 del donatore, presenta il Form 8282
- Un donatore che rimane anonimo per te generalmente non può richiedere una detrazione di $250 o più

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A chi si rivolge?

- Organizzazioni benefiche statunitensi 501(c)(3), chiese e gruppi comunitari che desiderano accettare ZEC
- Tesorieri, contabili e membri del consiglio di amministrazione che configurano donazioni in crypto
- Donatori che vogliono sapere cosa richiede loro un'organizzazione non profit

Per privati e creatori, consulta [Ricevi donazioni privatamente](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Il problema

La maggior parte dei servizi di donazione in crypto per le organizzazioni benefiche statunitensi ti fornisce un indirizzo trasparente oppure converte la donazione per te tramite uno di essi. Su un indirizzo trasparente, chiunque può vedere ogni donazione, il suo importo e il tuo saldo. Un donatore che effettua intenzionalmente una donazione privata perde quella privacy nel momento in cui la donazione arriva.

Un'organizzazione non profit ha anche documentazione che un privato non ha: ricevute per i donatori, moduli IRS per le donazioni più grandi e una dichiarazione annuale. Privacy e documentazione possono funzionare insieme, purché tu le pianifichi prima che arrivi la prima donazione.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Cosa rimane privato e cosa no

| | Donazione schermata al tuo indirizzo schermato |
|---|---|
| Il pubblico | Non può vedere il donatore, il tuo indirizzo o l'importo |
| La tua organizzazione | Vede l'importo e gli eventuali memo; vede il donatore solo se questi si identifica |
| Il tuo commercialista | Vede ciò che condividi, ad esempio tramite una [chiave di visualizzazione](/zcash-tech/viewing-keys) |
| Quando vendi | Se il tuo exchange accetta solo depositi trasparenti, l'importo che sposti fuori dalla pool schermata diventa pubblico (consulta [il turnstile](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Cosa ti serve

- Una politica di accettazione delle donazioni, approvata dal tuo consiglio di amministrazione, che copra le criptovalute
- Un [portafoglio](/using-zcash/wallets) con indirizzi schermati, controllato dall'organizzazione
- Un account exchange a nome dell'organizzazione, se prevedi di convertire ZEC in dollari
- Un commercialista che abbia gestito donazioni non in contanti

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guida passo passo

### Passaggio 1: Decidi la tua politica

Metti per iscritto, e fai approvare dal tuo consiglio di amministrazione:
- Chi può spostare fondi e se ogni spostamento debba essere approvato da due persone
- Se vendi subito ogni donazione o conservi una parte di ZEC
- Se accetti donazioni anonime e fino a quale importo

### Passaggio 2: Configura un portafoglio controllato dall'organizzazione

- Crea il portafoglio su un dispositivo dell'organizzazione, non su un telefono personale
- Conserva la frase mnemonica offline, presso due responsabili che possano accedervi individualmente
- Per il controllo condiviso, consulta [Gestisci una tesoreria comunitaria privata](/zcash-use-cases/private-community-treasury)

### Passaggio 3: Pubblica un indirizzo schermato

- Condividi un indirizzo esclusivamente schermato nella tua pagina delle donazioni. Un [indirizzo unificato](/using-zcash/unified-addresses) inizia con `u1`, ma può contenere anche un ricevitore trasparente e una donazione da un portafoglio esclusivamente trasparente arriva quindi pubblicamente. Usa l'indirizzo esclusivamente schermato del tuo portafoglio, se ne offre uno.
- Non pubblicare un indirizzo trasparente (inizia con `t1` o `t3`)
- Chiedi ai donatori che desiderano una ricevuta di inserire la propria email nel [memo](/using-zcash/memos). Il memo è crittografato, quindi solo la tua organizzazione può leggerlo.

### Passaggio 4: Registra ogni donazione

Per ogni donazione, registra:
- Data e ora della ricezione
- Importo in ZEC
- Valore in dollari statunitensi in quel momento e la fonte del prezzo utilizzata
- ID della transazione e memo

L'IRS considera ZEC come proprietà ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), quindi nei tuoi registri si tratta di un contributo non in contanti. Per fornire al tuo commercialista accesso in sola lettura, consulta [Conservare registri con ZEC schermati](/zcash-use-cases/keeping-records-with-shielded-zec).

### Passaggio 5: Conferma le donazioni di $250 o più

Un donatore non può detrarre una singola donazione di $250 o più senza una tua conferma scritta ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Per una donazione in ZEC, includi:
- Il nome della tua organizzazione
- La data in cui l'hai ricevuta
- Una descrizione della donazione, ad esempio "1,5 ZEC". Non indicarne un valore in dollari: valutare la donazione è compito del donatore.
- Se hai fornito qualcosa in cambio, ad esempio "Nessun bene o servizio è stato fornito in cambio di questo contributo."

Il donatore deve averla prima di presentare la propria dichiarazione dei redditi ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Le organizzazioni di solito la inviano entro il 31 gennaio dell'anno successivo; inviarla subito è la soluzione più semplice.

### Passaggio 6: Firma il Form 8283 per donazioni superiori a $5.000

Se un donatore richiede più di $5.000, necessita di una perizia qualificata. Le crypto non sono considerate titoli quotati pubblicamente, quindi la perizia si applica anche a esse ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). Il donatore ti porta il [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) e tu firmi la parte del beneficiario della Section B. La tua firma conferma che hai ricevuto ZEC in quella data; non conferma il valore indicato dal donatore ([FAQ IRS, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passaggio 7: Converti in dollari, se necessario

- Verifica quali exchange accettano depositi schermati su [Exchange custodial](/using-zcash/custodial-exchanges). Molti accettano solo depositi trasparenti.
- Se il tuo è esclusivamente trasparente, sposta ZEC dal tuo portafoglio schermato all'exchange in un unico passaggio, al momento della vendita. Tale importo diventa pubblico, ma le altre donazioni e il tuo saldo rimangono privati.
- Se vendi ZEC entro tre anni dalla ricezione e hai firmato la Section B del Form 8283 del donatore, presenta il [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) entro 125 giorni dalla vendita e inviane una copia al donatore ([FAQ IRS, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passaggio 8: Riporta le donazioni nella dichiarazione annuale

Riporta le donazioni in ZEC come contributi non in contanti nella tua dichiarazione della serie Form 990, con lo [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) se applicabile al tuo caso. Chiedi al tuo commercialista come elencare le donazioni anonime.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Donatori anonimi: cosa possono e non possono richiedere

- Privacy dal pubblico non equivale all'anonimato nei tuoi confronti. Un donatore può donare privatamente e condividere comunque la propria email nel memo per ottenere una ricevuta.
- Un donatore che rimane anonimo per te non può ottenere una conferma, quindi non può detrarre una singola donazione di $250 o più.
- Oltre $5.000, il donatore necessita anche di una perizia e della tua firma sul Form 8283, il che significa dirti chi è.
- Per il donatore, una donazione in ZEC detenuta per più di un anno è generalmente detraibile al valore equo di mercato, senza imposta sulle plusvalenze sulla donazione ([FAQ IRS, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Indicalo nella tua pagina delle donazioni, così i donatori possono scegliere prima di donare.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errori comuni da evitare

- Conservare le donazioni nel portafoglio personale di un membro dello staff
- Pubblicare un indirizzo trasparente, oppure un indirizzo di deposito di un exchange, come indirizzo per le donazioni
- Indicare un valore in dollari nella conferma
- Vendere entro tre anni e dimenticare il Form 8282
- Promettere una detrazione fiscale ai donatori anonimi

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Risultato

Puoi:
- Accettare ZEC senza esporre i tuoi donatori o il tuo saldo
- Fornire ai donatori la documentazione necessaria per richiedere una detrazione
- Conservare registri che il tuo commercialista e revisore possano verificare

<br/>

## Fonti

- [IRS: Domande frequenti sulle transazioni in valuta virtuale](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (le Q34–Q37 riguardano le organizzazioni benefiche)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Contributi benefici, documentazione e divulgazione](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Contributi benefici](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Determinazione del valore dei beni donati](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: Perizie per donazioni in crypto](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) e [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Correlati

- [Ricevi donazioni privatamente](/zcash-use-cases/receive-donations-privately) - la stessa idea per i privati
- [Conservare registri con ZEC schermati](/zcash-use-cases/keeping-records-with-shielded-zec) - memo e chiavi di visualizzazione per la tua contabilità
- [Chiavi di visualizzazione](/zcash-tech/viewing-keys) - accesso in sola lettura per un commercialista o revisore
- [Il turnstile](/zcash-tech/the-turnstile) - cosa diventa pubblico quando ZEC esce da una pool schermata

<br/>

## Passaggio successivo

- [Gestisci una tesoreria comunitaria privata](/zcash-use-cases/private-community-treasury)

<br/>
