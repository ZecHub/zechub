# L'ETF Grayscale Zcash (ZCSH)

**Zcash non ha lanciato un ETF. Grayscale sì**, convertendo un fondo che
gestisce dal 2017. Zcash è un protocollo: non ha una società, una tesoreria o un consiglio
che potrebbero emettere un fondo. Grayscale è un gestore patrimoniale indipendente che acquista
ZEC sul mercato aperto come chiunque altro.

Questa distinzione è l'aspetto più frainteso di ZCSH, ed è da qui che
inizia questa pagina. Il 25 agosto 2026 il fondo ha iniziato a essere negoziato su NYSE Arca come
*l'ETF Zcash*, il primo prodotto exchange-traded spot statunitense su Zcash, ed è
ora uno dei maggiori singoli detentori di ZEC esistenti.

![Come funziona il Grayscale Zcash ETF: gli investitori comprano azioni ZCSH tramite un broker e ottengono solo l'esposizione al prezzo, mentre il trust detiene gli ZEC presso Coinbase Custody in portafogli trasparenti; i Partecipanti autorizzati creano e riscattano le azioni in blocchi da 10.000 in contanti, e la commissione dello Sponsor è pagata con gli ZEC del trust, quindi gli ZEC per azione diminuiscono nel tempo](https://raw.githubusercontent.com/ZecHub/zechub/main/assets/ZCSH_ETP_Structure.png)

## Lo stesso fondo, tre fasi

| Quando | Cosa è cambiato |
| --- | --- |
| Ottobre 2017 | Viene lanciato come collocamento privato, solo per investitori accreditati |
| Ottobre 2021 | Le quote sono quotate su OTCQX con il ticker ZCSH, negoziate a sconto rispetto al NAV |
| 25 agosto 2026 | Diventa un ETP rimborsabile su NYSE Arca e rimuove "Trust" dal nome |

Il passaggio del 2026 non è cosmetico. Un trust quotato OTC non ha un meccanismo
di rimborso, quindi le sue quote possono oscillare verso un premio o uno sconto rispetto al valore
degli asset sottostanti, talvolta in modo grave: è esattamente ciò che
è accaduto tra il 2021 e il 2026. Un prodotto exchange-traded con meccanismi funzionanti
di creazione e rimborso dispone di una possibilità di arbitraggio che mantiene il prezzo della quota
ancorato al valore patrimoniale netto. Il passaggio da uno all'altro modifica il comportamento
dello strumento come titolo.

## Chi fa cosa

| Ruolo | Parte |
| --- | --- |
| Sponsor | Grayscale Investments Sponsors, LLC |
| Trustee | CSC Delaware Trust Company |
| Amministratore e agente di trasferimento | La Bank of New York Mellon |
| Prime broker | Coinbase, Inc. — procura ZEC per il trust |
| Partecipanti autorizzati | Jane Street, Virtu — creano e rimborsano quote |
| Agente di marketing | Foreside Fund Services |
| **Custode** | **Coinbase Custody Trust Company, LLC** — l'unico luogo in cui esiste effettivamente ZEC |

Nessuna di queste parti, singolarmente, è il fondo. La struttura è l'accordo
tra loro, che è ciò che illustra il diagramma sopra. Diversi di questi ruoli
erano assenti o riportati in modo errato nella copertura giornalistica al momento della quotazione; l'elenco qui
segue il prospetto di registrazione Form S-3 di Grayscale su EDGAR.

## Come le quote vengono create e rimborsate

Solo i Partecipanti autorizzati — broker-dealer registrati con un accordo con
lo Sponsor — possono creare o rimborsare quote, e solo in blocchi di 10.000,
chiamati Basket. Un normale investitore non interagisce mai con questo meccanismo; acquista
e vende quote esistenti sull'exchange come qualsiasi altro titolo quotato.

Il meccanismo è attualmente **in contanti**, non in-kind. Un Partecipante autorizzato
deposita contanti in, o riceve contanti da, un conto in contanti, e un fornitore di liquidità terzo
è quello che effettivamente acquisisce o cede ZEC. Il
prospetto di registrazione descrive anche un processo in-kind, nel quale un
Partecipante autorizzato depositerebbe ZEC direttamente presso il Trust o riceverebbe
ZEC da esso, ma dichiara chiaramente che "l'approvazione regolamentare in-kind non
è stata ottenuta" e potrebbe non esserlo mai.

Quindi, nel processo in contanti, ZEC passa di mano tra il fornitore di liquidità
e il mercato, mai tra l'investitore e il Trust. Nessuno nel percorso retail utilizza un
indirizzo Zcash.

## La commissione è pagata in ZEC

La commissione dello sponsor è del **2,5% all'anno**, al momento della quotazione. Matura giornalmente come
percentuale del valore patrimoniale netto ed è, nelle parole del documento, "pagabile in ZEC
allo Sponsor quotidianamente in via posticipata".

La conseguenza è strutturale piuttosto che incidentale. La commissione viene prelevata dai
ZEC del fondo, quindi la quantità di ZEC a garanzia di ciascuna quota diminuisce leggermente ogni
giorno. Una quota non è una quantità fissa di ZEC detenuta indefinitamente; è un diritto
su una quantità che si riduce lentamente. Chiunque confronti un'esposizione a lungo termine a ZCSH con
il semplice detenere ZEC deve considerarlo nel confronto.

Per contesto, il 2,5% è circa dieci volte la commissione di un tipico ETF spot su bitcoin.
Grayscale ha affermato che i primi ricavi derivanti dalla commissione dello sponsor saranno destinati nuovamente
allo sviluppo dell'ecosistema Zcash.

## Cosa possiede effettivamente un azionista

Una quota fornisce esposizione al prezzo di ZEC. Non è ZEC.

Un azionista non può inviare una transazione schermata, non può allegare un memo, non può
detenere un Unified Address e non può praticare l'autocustodia. Nessuna delle proprietà che
distinguono Zcash dagli altri asset è disponibile attraverso il wrapper: il
wrapper trasmette il prezzo e nient'altro. Per un investitore il cui obiettivo è l'esposizione
all'interno di un conto di intermediazione o pensionistico, questo è esattamente il punto. Per
chiunque sia interessato a Zcash per la privacy, l'ETF non è un sostituto di un
portafoglio, e i due non sono realmente alternative l'uno all'altro.

## Il ZEC è detenuto alla luce del sole

C'è un'ulteriore ironia nella struttura, ed è l'aspetto più incisivo di
questa pagina. Coinbase Custody detiene gli ZEC del Trust in indirizzi **trasparenti**,
non schermati. Le disponibilità del fondo sono visibili on-chain,
riconducibili al custode e osservabili in tempo reale da chiunque voglia
guardare. Nulla in questo fondo utilizza un indirizzo schermato.

Non è una svista. L'infrastruttura dei fondi regolamentati è costruita attorno all'audit
e all'attestazione, e un saldo schermato è proprio ciò che un revisore non può
verificare in modo indipendente. Il supporto di Coinbase riflette la stessa asimmetria:
riceverà ZEC inviati da un indirizzo schermato, ma non invia ZEC a
uno.

Quindi il maggiore detentore istituzionale di un asset per la privacy lo detiene nella sola
forma priva di privacy. Questo punto si basa su una fonte giornalistica anziché sui
documenti depositati: l'S-3 descrive la custodia delle chiavi private del Trust ma
non caratterizza i tipi di indirizzo, ed è qui dichiarato con tale avvertenza.

## Quanti ZEC sono coinvolti

Alla quotazione del 25 agosto 2026 il fondo deteneva circa **387.000 ZEC**, con
circa **313 milioni di dollari** in gestione.

Per una prospettiva più ampia: al 30 settembre 2025 il documento afferma che il Trust deteneva
circa il **2,4% degli ZEC in circolazione**. Entrambi i numeri variano: il primo con il
prezzo di ZEC e con creazioni e rimborsi, il secondo poiché la commissione viene pagata
attingendo alle disponibilità. Pertanto, prendi una cifra aggiornata dal documento più recente o
dalla comunicazione giornaliera del fondo, anziché da questa pagina.

## Fonti

Tutte primarie, tutte su EDGAR con CIK 1720265 salvo diversa indicazione.

- [Grayscale Zcash Trust (ZEC) — indice dei documenti depositati di EDGAR](https://www.sec.gov/edgar/browse/?CIK=1720265&owner=exclude)
- [Prospetto di registrazione Form S-3, novembre 2025](https://www.sec.gov/Archives/edgar/data/1720265/000119312525298561/zcsh-20251126.htm) — i ruoli delle entità, i meccanismi di creazione e rimborso, la commissione dello Sponsor e la percentuale di ZEC in circolazione
- [Form 10-K per l'anno concluso il 31 dicembre 2024](https://www.sec.gov/Archives/edgar/data/1720265/000095017025035469/zcsh-20241231.htm)
- [L'ETF Zcash inizia a essere negoziato su NYSE Arca, 25 agosto 2026](https://www.globenewswire.com/news-release/2026/8/25/3350404/0/en/the-zcash-etf-ticker-zcsh-built-by-grayscale-begins-trading-on-nyse-arca-expanding-investor-access-to-the-leading-privacy-focused-digital-currency.html)
- [Grayscale Pagina del fondo Zcash Trust](https://www.grayscale.com/funds/grayscale-zcash-trust) — date di avvio e comunicazioni attuali
- [Il primo ETF su una privacy coin: all'interno del documento depositato da Grayscale per Zcash](https://crypto.news/the-first-privacy-coin-etf-inside-grayscales-zcash-filing/) — fonte secondaria; l'unica trovata che afferma che gli ZEC del Trust sono detenuti in indirizzi trasparenti

Le cifre sono riferite alle date indicate e varieranno. Verificato il 30 settembre 2026.
Solo a scopo educativo, non è consulenza d'investimento.
