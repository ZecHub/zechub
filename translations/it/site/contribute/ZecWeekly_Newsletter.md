<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly è una newsletter che esce ogni venerdì mattina. Include tutte le notizie accadute durante la settimana nell'ecosistema Zcash.

Le notizie sono curate settimanalmente dai membri della community e tutti i link rilevanti vengono aggiunti alla newsletter.

Per favore iscriviti alla newsletter [qui](https://zechub.substack.com/).

## Contribuire

I contributi alla newsletter funzionano meglio quando un collaboratore prepara l'edizione della settimana corretta, segue l'attuale thread di bounty o coordinamento e invia la pull request dopo che i link settimanali sono pronti. Per favore non inviare un'edizione futura prima che ZecHub abbia pubblicato o confermato la data per quell'edizione. Le pull request anticipate spesso perdono gli aggiornamenti di fine settimana, vanno in conflitto con un curatore assegnato o usano la scadenza sbagliata.

### 1. Conferma l'edizione corrente

Prima di iniziare a scrivere:

- Controlla le [issue GitHub di ZecHub](https://github.com/ZecHub/zechub/issues) e [Dework](https://app.dework.xyz/zechub-2424) per l'attuale task della newsletter.
- Usa la data nel titolo della issue o nella descrizione del task come fonte di verità.
- Apri la issue e controlla se un altro collaboratore ha già commentato, è stato assegnato o ha aperto una pull request collegata.
- Cerca tra le pull request aperte il numero della issue e la data dell'edizione prima di iniziare. Per esempio, cerca `is:pr is:open "May 30th" repo:ZecHub/zechub`.
- Se il task non è chiaro, chiedi nella issue, sul Discord di ZecHub o scrivendo a [ZecHub su Twitter](https://twitter.com/ZecHub) prima di preparare l'edizione completa.

![Open GitHub issues filtered for current ZecWeekly newsletter tasks](assets/zecweekly-current-task-search.png)

### 2. Fai il fork del repository

Se sei nuovo su GitHub, usa questo flusso di lavoro:

1. Apri il [repository di ZecHub](https://github.com/ZecHub/zechub).
2. Clicca su **Fork** e crea un fork sotto il tuo account GitHub.
3. Nel tuo fork, crea un nuovo branch per l'edizione. Un nome di branch chiaro è utile, come `digest-may-30-2026`.
4. Assicurati che la tua pull request abbia come repository di base `ZecHub/zechub` e come branch di base `main`.

Se usi la riga di comando, lo stesso flusso di lavoro è il seguente:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Crea il file della newsletter

Usa il [template della newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) come punto di partenza. Le edizioni della newsletter vanno nella cartella [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Quando crei il file:

- Rispetta il formato del nome file richiesto dalla issue o usato dalle recenti edizioni accettate.
- Mantieni lo stesso ordine delle sezioni del template, a meno che il task non richieda un formato diverso.
- Aggiungi solo i link della settimana rilevante.
- Scrivi una descrizione breve e chiara per ogni link in modo che i lettori capiscano perché è importante.
- Traduci o riassumi in inglese le fonti non in inglese quando necessario.
- Controlla ogni link prima di aprire la pull request.

### 4. Raccogli i link al momento giusto

ZecWeekly normalmente copre l'attività dell'ecosistema Zcash della settimana corrente ed è pubblicata verso la fine della settimana. La tempistica più sicura è:

- Inizia a raccogliere i link dopo che la issue o il task della newsletter corrente è stato pubblicato.
- Mantieni una bozza mentre la settimana è ancora in corso.
- Invia la pull request a ridosso della data di consegna richiesta, dopo aver verificato gli aggiornamenti di fine settimana.
- Non inviare la newsletter di una settimana futura prima che esista il task per quella data o prima che ZecHub confermi che dovresti prepararla.

Se una issue dice di inviare entro una data specifica, segui quella data. Se c'è un conflitto tra questa pagina e una issue corrente, segui la issue corrente.

### 5. Apri la pull request

Quando il file della tua newsletter è pronto:

1. Fai il commit delle tue modifiche sul tuo fork.
2. Apri una pull request verso `ZecHub/zechub` sul branch `main`.
3. Usa un titolo che corrisponda all'edizione, come `Zcash Ecosystem Digest | May 30th`.
4. Collega la issue nel corpo della pull request in modo che i revisori possano collegare il lavoro al task.

Esempio di corpo della pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Dopo che la pull request è aperta, fai attenzione ai commenti di revisione. Se ZecHub chiede delle modifiche, aggiorna lo stesso branch invece di aprire una seconda pull request per la stessa edizione.

### Esempi reali

Usa queste pull request di newsletter già unite come esempi di invii accettati:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![Merged ZecWeekly newsletter pull request example](assets/zecweekly-example-pr.png)

Quando confronti il tuo lavoro con un esempio, concentrati sulla posizione del file, il formato del titolo, l'ordine delle sezioni, le descrizioni dei link e se la pull request si ricollega al task corretto.

### Errori comuni da evitare

- Aprire una pull request prima che la data dell'edizione o il task siano confermati.
- Lavorare su una issue che ha già una pull request collegata.
- Inviare la pull request al proprio fork invece che a `ZecHub/zechub`.
- Usare il nome di file sbagliato o mettere il file fuori dalla cartella `newsletter`.
- Copiare una vecchia edizione senza aggiornare ogni data, link e descrizione.
- Aggiungere link della settimana sbagliata.
- Lasciare link interrotti, link duplicati o testo segnaposto dal template.
- Aprire una nuova pull request dopo i commenti di revisione invece di aggiornare il branch originale.

### Lista di controllo finale

Prima di richiedere la revisione, conferma che:

- La data della issue o del task corrisponda al file della tua newsletter.
- Nessun'altra pull request aperta copra già la stessa issue o edizione.
- Il file sia nella cartella `newsletter`.
- Le sezioni del template siano complete.
- Ogni link funzioni e abbia una descrizione utile.
- Il corpo della pull request colleghi la issue corretta.
- Tu sia disponibile a fare modifiche se i revisori le richiedono.

## Edizioni passate

[Archivio ZecWeekly](https://zechub.substack.com/p/archive)
