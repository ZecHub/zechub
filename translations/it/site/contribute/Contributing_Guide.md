<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Contribuire a ZecHub

ZecHub aiuta le persone a conoscere Zcash. Se stai leggendo questa pagina, siamo davvero entusiasti che tu stia pensando di contribuire! Qualsiasi contributo apporterai sarà pubblicato su [zechub.wiki](https://www.zechub.wiki/) e sugli altri social media di ZecHub.

### Nuovi contributori

Per avere una panoramica di ZecHub, leggi il [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Per iniziare

ZecHub usa GitHub per gestire i contributi della community. Se sei nuovo in GitHub, non preoccuparti! Ti spiegheremo come puoi partecipare come contributore della community di ZecHub. Per i contributi accettati, paghiamo mance in ZEC schermati. Gli importi delle ricompense non sono fissi in ZEC — consulta [Come vengono stabilite le ricompense](#how-rewards-are-set). In questa guida avrai una panoramica del flusso di lavoro per i contributi: dall'apertura di una issue, alla creazione di una pull request (PR), alla revisione e al merge della PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="Come contribuire a ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Unisciti alla conversazione

Per prima cosa, unisciti alla conversazione nei nostri [link della community](https://zechub.wiki/zcash-community/community-links).

### Guide di stile

Ogni contributo a ZecHub deve seguire la guida di stile di [ZecHub](https://zechub.wiki/contribute/style-guide). Questo include wiki, documentazione e contenuti per i social media.

### Modi in cui puoi contribuire

ZecHub è un progetto guidato dalla community che mira a fornire supporto e risorse agli utenti e agli sviluppatori di Zcash. Ci sono molti modi per partecipare a ZecHub, tra cui scrivere per la nostra newsletter settimanale, contribuire alla nostra base di conoscenze o aiutare con progetti di sviluppo.

Questi sono i tipi di contributo che ZecHub accetta attualmente:

### Come vengono stabilite le ricompense

Le mance vengono pagate in ZEC schermati. I numeri in ZEC che un tempo comparivano nelle intestazioni qui sotto erano istantanee storiche a un precedente tasso ZEC/USD. Non considerarli tassi attuali.

Come viene scelto un importo:

1. Abbina il lavoro a un intervallo in USD nella [politica sugli importi delle bounty](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Scegli un obiettivo all'interno di quella fascia — non automaticamente il massimo.
3. Converti al prezzo spot pubblico ZEC/USD e inserisci ZEC nella bounty:

```
zec_to_enter = usd_target / zec_usd_spot
```

Arrotonda a 4 cifre decimali. Il file della policy è l'unica fonte di verità. Se questa pagina e quel file non concordano, prevale la policy.

Il lavoro retribuito è elencato su [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties spiegato | Guadagna ZEC contribuendo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Tre stati che non sono la stessa cosa:

1. **Merge effettuato** — la PR è stata accettata nel repository.
2. **Ricompensa approvata** — uno sponsor o la DAO concorda che sia dovuta una ricompensa e ne stabilisce l'importo.
3. **Pagato** — ZEC raggiunge il tuo Unified Address schermato.

Un contributo sottoposto a merge non approva di per sé una ricompensa. Una ricompensa approvata non costituisce un pagamento completato.

#### Lavoro di sviluppo

Qualsiasi lavoro di sviluppo approvato che contribuisca a costruire l'ecosistema Zcash. Può includere la nostra wiki, nuovi wallet o qualsiasi applicazione ti venga in mente.

#### Tutorial su Zcash (video)

Ecco un tutorial di esempio qui sotto:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="Tutorial sull'installazione di WSL + compilazione/transazione Zcashd"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Crea e condividi tutorial sulle app Zcash e ottieni ricompense. Invia una PR a zechub/tutorials oppure manda il video al canale #video-content in Discord. Se il video soddisfa i nostri criteri, lo pubblicheremo e ti daremo una mancia.

#### Wiki ZecHub - nuova pagina wiki pubblicata

Il nostro sito wiki fornisce materiali educativi su Zcash in un formato semplice e facilmente assimilabile. Zcash è una tecnologia molto avanzata con una community vivace, quindi dobbiamo ancora creare altra documentazione. Il nostro obiettivo è creare documentazione su:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Si tratta di aree piuttosto ampie, quindi c'è molto materiale su cui lavorare. Se vuoi trovare ispirazione, consulta il nostro attuale [sito wiki-docs](https://zechub.wiki/) e guarda cosa manca. Una volta deciso di cosa vuoi scrivere, inizia ad apportare le modifiche e scopri come inviare una PR al repository ZecHub. Tutta la nostra documentazione viene creata e mantenuta in questo repository. Quando scrivi una pagina wiki, segui la guida di stile di [ZecHub](https://zechub.wiki/contribute/style-guide) e usa come riferimento strutturale una pagina esistente nella stessa sezione. Dopo aver inviato una PR, manda un messaggio a @dismad, @squirrel o @vito nella sezione #zechub di discord: esamineranno la tua PR e la integreranno se sarà pronta per essere aggiunta al sito. Se verrà integrata, aggiungeranno il documento al sito web ZecHub. Se il documento non è pronto, ti suggeriranno modifiche nella PR.

#### Wiki ZecHub - pagina wiki tradotta

L'obiettivo di ZecHub è fornire un hub educativo open-source al quale chiunque nella community di Zcash possa contribuire. Uno dei maggiori successi dell'hub è vedere i membri della community tradurre i materiali di ZecHub nella loro lingua locale.

Nota: il limite di traduzione globale delle pagine di ZecHub è di 10 pagine a settimana.

Le pagine locali curate sotto `translations/<locale>/site/` vengono monitorate rispetto alla fonte inglese tramite un manifesto di hash della fonte. Consulta [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) per il rilevamento dell'obsolescenza, il flusso di sincronizzazione e la convalida dei termini protetti.

#### Wiki ZecHub - modifica a un documento esistente

A volte le informazioni nei documenti non sono del tutto precise. Va bene così. È per questo che li rendiamo open source! Se trovi qualcosa che richiede una modifica in un wiki-doc, vai al piè di pagina del documento, che contiene un link alla sua pagina GitHub, e suggerisci una modifica tramite una PR.

#### Wiki ZecHub - link non funzionante corretto

Se trovi un link non funzionante o qualcosa di importante scritto in modo errato, vai al piè di pagina del documento, che contiene un link alla sua pagina GitHub, e suggerisci la modifica tramite una PR.

#### Newsletter - nuova edizione

Produciamo la newsletter settimanale dell'ecosistema. È un modo semplicissimo e poco impegnativo per partecipare! La newsletter viene pubblicata ogni venerdì o sabato. Se vuoi scrivere una newsletter, manda un messaggio a @squirrel nella sezione #zecweekly di Discord per farglielo sapere.

Dopo averlo fatto, puoi andare alla [sezione newsletter di questo repository](/newsletter/newsletterbasics.md) e inviare una pull request per creare una nuova edizione della newsletter. Segui il formato usato in questo [modello](/newsletter/newslettertemplate.md).

Dopo averlo fatto, @squirrel o (in Discord) vedranno che la tua nuova edizione della newsletter è disponibile, la esamineranno e poi la integreranno nel repository. Dopo il merge, prenderanno il contenuto e lo pubblicheranno tramite Substack.

#### Newsletter - traduzione

Attualmente abbiamo edizioni in spagnolo, portoghese e russo. Le versioni tradotte vengono pubblicate sui rispettivi social e facciamo del nostro meglio per amplificarle tramite i social di ZecHub.

Se vuoi tradurre la newsletter nella tua lingua locale, facci sapere da quale canale la condivideresti e in quale lingua pubblicheresti la newsletter, così potremo coordinarne la pubblicazione.

#### Podcast - episodio pubblicato sui social di ZecHub

Hai un'idea per un programma di notizie, un podcast, un talk su Twitter o qualche altro contenuto video/audio? Parlacene in Discord #video-content e ne discuteremo.

Le ricompense per questo tipo di contenuto sono un po' più elevate, quindi una proposta dovrebbe essere presentata alla DAO di ZecHub prima di approvare la spesa.

#### Post creativi sui social media

Vogliamo nuovi contenuti coinvolgenti per i nostri social media. Video brevi, GIF, meme e altri post creativi sono accettati quando rispettano la guida di stile di [ZecHub](https://zechub.wiki/contribute/style-guide). L'importo della ricompensa segue la [politica sugli importi delle bounty](https://bounties.zechub.wiki/docs/bounty-amounts).

Puoi anche progettare miniature per la nostra newsletter e il podcast. Se hai talento nel design, scrivici su #design in Discord.

#### Altre idee? Facci sapere!

Hai un altro suggerimento? Diccelo su #general in Discord. Possiamo discuterne e vedere se la DAO di ZecHub lo sosterrà.

### Per concludere

Non esitare a iniziare a contribuire a uno dei protocolli più rispettati del settore. È un ottimo modo per partecipare a Zcash. Se hai domande sui contributi, faccelo sapere su [Discord](#join-the-conversation).

Grazie!
