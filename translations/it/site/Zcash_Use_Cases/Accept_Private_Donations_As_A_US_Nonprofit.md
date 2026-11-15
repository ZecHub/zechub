# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> Accetta donazioni private in ZEC come nonprofit statunitense

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  Intermedio - 10 min
</span>

> Questa pagina contiene informazioni di carattere generale, non una consulenza legale o fiscale. Le norme fiscali statunitensi cambiano, quindi verifica ogni passaggio con il tuo commercialista o con un consulente fiscale. Ogni regola qui sotto rimanda alla propria fonte IRS, verificata a ottobre 2026 rispetto alla Publication 526 (per le dichiarazioni dei redditi del 2025) e al Form 8283 (revisione di dicembre 2025). La IRS FAQ sulla valuta virtuale è stata scritta per transazioni precedenti al 2025, quindi confrontala con le linee guida attuali.

## TL;DR

- Conserva le donazioni in un portafoglio schermato controllato dalla tua organizzazione, non nel portafoglio personale di un membro dello staff
- L'IRS considera ZEC come proprietà, quindi una donazione in ZEC è un contributo non in denaro
- Per una donazione di 250 $ o più, invia al donatore un'attestazione scritta che descriva ZEC ma senza attribuirgli un valore in dollari
- Per le donazioni superiori a 5.000 $, il donatore necessita di una perizia qualificata, e tu firmi il suo Form 8283
- Se vendi ZEC entro tre anni dalla ricezione e hai firmato la Sezione B del Form 8283 del donatore, presenta il Form 8282
- Un donatore che resta anonimo nei tuoi confronti in genere non può richiedere una detrazione di 250 $ o più

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> A chi si rivolge?

- Organizzazioni di beneficenza 501(c)(3) statunitensi, chiese e gruppi comunitari che vogliono accettare ZEC
- TesORIeri, contabili e membri del consiglio che stanno configurando le donazioni in criptovalute
- Donatori che vogliono sapere di che cosa un'organizzazione nonprofit ha bisogno da parte loro

Per i singoli e i creator, vedi [Ricevere donazioni in privato](/zcash-use-cases/receive-donations-privately).

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> Il problema

La maggior parte dei servizi di donazioni in criptovalute per le organizzazioni di beneficenza statunitensi ti fornisce un indirizzo trasparente, oppure converte la donazione per te attraverso uno di questi. Su un indirizzo trasparente chiunque può vedere ogni donazione, il suo importo e il tuo saldo. Un donatore che dona in privato di proposito perde quella privacy nell'esatto momento in cui la donazione arriva.

Un'organizzazione nonprofit ha anche pratiche burocratiche che un singolo non ha: ricevute per i donatori, moduli IRS per le donazioni più grandi e una dichiarazione annuale. La privacy e quelle pratiche possono coesistere, purché tu le pianifichi prima che arrivi la prima donazione.

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> Cosa resta privato e cosa no

| | Donazione schermata al tuo indirizzo schermato |
|---|---|
| Il pubblico | Non può vedere il donatore, il tuo indirizzo o l'importo |
| La tua organizzazione | Vede l'importo e l'eventuale memo; vede il donatore solo se questi te lo comunica |
| Il tuo commercialista | Vede ciò che condividi tu, per esempio con le [chiavi di visualizzazione](/zcash-tech/viewing-keys) |
| Quando vendi | Se il tuo exchange accetta solo depositi trasparenti, l'importo che sposti fuori dalla pool schermata diventa pubblico (vedi [il turnstile (tornello)](/zcash-tech/the-turnstile)) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> Cosa ti serve

- Una politica di accettazione delle donazioni, approvata dal tuo consiglio, che copra le criptovalute
- Un [portafoglio](/using-zcash/wallets) con indirizzi schermati, controllato dall'organizzazione
- Un account su un exchange a nome dell'organizzazione, se prevedi di convertire ZEC in dollari
- Un commercialista che abbia già gestito donazioni non in denaro

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> Guida passo per passo

### Passo 1: decidi la tua politica

Scrivi e fai approvare dal tuo consiglio:
- Chi può spostare i fondi e se due persone debbano approvare ogni spostamento
- Se vendi ogni donazione subito o ne conservi una parte in ZEC
- Se accetti donazioni anonime e fino a quale importo

### Passo 2: configura un portafoglio controllato dall'organizzazione

- Crea il portafoglio su un dispositivo dell'organizzazione, non su un telefono personale
- Conserva la frase mnemonica offline, in modo che due responsabili possano ciascuno accedervi
- Per un controllo condiviso, vedi [Gestire una tesoreria comunitaria privata](/zcash-use-cases/private-community-treasury)

### Passo 3: pubblica un indirizzo schermato

- Condividi sulla tua pagina per le donazioni un indirizzo solo schermato. Un [indirizzo unificato](/using-zcash/unified-addresses) inizia con `u1`, ma può anche contenere un receiver trasparente, e una donazione da un portafoglio solo trasparente arriva allora pubblicamente. Usa l'indirizzo solo schermato del tuo portafoglio, se lo offre.
- Non pubblicare un indirizzo trasparente (inizia con `t1` o `t3`)
- Chiedi ai donatori che vogliono una ricevuta di inserire la loro email nel [memo](/using-zcash/memos). Il memo è crittografato, quindi solo la tua organizzazione può leggerlo.

### Passo 4: registra ogni donazione

Per ogni donazione, registra:
- Data e ora di ricezione
- Importo in ZEC
- Valore in dollari statunitensi in quel momento e la fonte del prezzo che hai usato
- ID della transazione e memo

L'IRS considera ZEC come proprietà ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), quindi si tratta di un contributo non in denaro nei tuoi libri contabili. Per dare al tuo commercialista un accesso in sola lettura, vedi [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec).

### Passo 5: emetti l'attestazione per le donazioni di 250 $ o più

Un donatore non può detrarre una singola donazione di 250 $ o più senza un'attestazione scritta da parte tua ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf)). Per una donazione in ZEC, includi:
- Il nome della tua organizzazione
- La data in cui l'hai ricevuta
- Una descrizione della donazione, per esempio "1,5 ZEC". Non indicarne il valore in dollari: valutare la donazione è compito del donatore.
- Se hai dato qualcosa in cambio, per esempio "Non sono stati forniti beni o servizi in cambio di questo contributo."

Il donatore deve averla prima di presentare la dichiarazione dei redditi ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf)). Le organizzazioni di solito la inviano entro il 31 gennaio dell'anno successivo; inviarla subito è la soluzione più semplice.

### Passo 6: firma il Form 8283 per le donazioni superiori a 5.000 $

Se un donatore dichiara più di 5.000 $, gli serve una perizia qualificata. Le criptovalute non rientrano tra i titoli quotati in borsa, quindi la perizia si applica anche a loro ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf)). Il donatore ti porta [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf), e tu firmi la parte relativa al donatario della Sezione B. La tua firma conferma che in quella data hai ricevuto ZEC; non conferma il valore indicato dal donatore ([IRS FAQ, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 7: converti in dollari, se ne hai bisogno

- Verifica su [Exchange custodial (custodia di terzi)](/using-zcash/custodial-exchanges) quali exchange accettano depositi schermati. Molti accettano solo depositi trasparenti.
- Se il tuo è solo trasparente, sposta ZEC dal tuo portafoglio schermato all'exchange in un unico passaggio, al momento della vendita. Quell'importo diventa pubblico, ma le tue altre donazioni e il tuo saldo restano privati.
- Se vendi ZEC entro tre anni dalla ricezione e hai firmato la Sezione B del Form 8283 del donatore, presenta [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) entro 125 giorni dalla vendita e invia una copia al donatore ([IRS FAQ, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

### Passo 8: riporta tutto nella dichiarazione annuale

Riporta le donazioni in ZEC come contributi non in denaro nella tua dichiarazione della serie Form 990, con [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) se ti si applica. Chiedi al tuo commercialista come elencare le donazioni anonime.

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> Donatori anonimi: cosa possono e non possono detrarre

- La privacy nei confronti del pubblico non è la stessa cosa dell'anonimato nei tuoi confronti. Un donatore può donare in privato e comunque condividere la propria email nel memo per ricevere una ricevuta.
- Un donatore che resta anonimo nei tuoi confronti non può ottenere un'attestazione, quindi non può detrarre una singola donazione di 250 $ o più.
- Oltre i 5.000 $, il donatore necessita inoltre di una perizia e della tua firma sul Form 8283, il che significa rivelarti chi è.
- Per il donatore, una donazione in ZEC detenuta per più di un anno è generalmente detraibile al valore equo di mercato, senza imposta sulle plusvalenze sulla donazione ([IRS FAQ, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions)).

Comunica questo sulla tua pagina per le donazioni, così i donatori possono scegliere prima di donare.

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> Errori comuni da evitare

- Conservare le donazioni nel portafoglio personale di un membro dello staff
- Pubblicare come indirizzo per le donazioni un indirizzo trasparente o un indirizzo di deposito dell'exchange
- Indicare un valore in dollari nell'attestazione
- Vendere entro tre anni e dimenticare il Form 8282
- Promettere ai donatori anonimi una detrazione fiscale

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> Risultato

Puoi:
- Accettare ZEC senza esporre i tuoi donatori o il tuo saldo
- Fornire ai donatori la documentazione di cui hanno bisogno per richiedere una detrazione
- Tenere registri che il tuo commercialista e il tuo revisore possano controllare

<br/>

## Fonti

- [IRS: Domande frequenti sulle transazioni in valuta virtuale](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 riguardano le organizzazioni di beneficenza)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: Contributi di beneficenza, comprovazione e divulgazione](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: Contributi di beneficenza](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: Determinare il valore della proprietà donata](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: perizie per le donazioni in criptovalute](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) e [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> Contenuti correlati

- [Ricevere donazioni in privato](/zcash-use-cases/receive-donations-privately) - la stessa idea per i singoli
- [Keeping records with shielded ZEC](/zcash-use-cases/keeping-records-with-shielded-zec) - memo e chiavi di visualizzazione per i tuoi registri
- [Viewing Keys](/zcash-tech/viewing-keys) - accesso in sola lettura per un commercialista o un revisore
- [Il turnstile](/zcash-tech/the-turnstile) - cosa diventa pubblico quando ZEC esce da una pool schermata

<br/>

## Prossimo passo

- [Gestire una tesoreria comunitaria privata](/zcash-use-cases/private-community-treasury)

<br/>
