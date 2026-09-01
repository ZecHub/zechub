<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly è una newsletter che viene inviata ogni domenica mattina. Include tutte le notizie accadute durante la settimana nell'ecosistema Zcash. Le notizie vengono curate settimanalmente dai membri della community e tutti i link pertinenti vengono aggiunti alla newsletter. Iscriviti alla newsletter [qui](https://zechub.substack.com/).

## Contribuire

I contributi alla newsletter funzionano meglio quando un collaboratore prepara l'edizione per la settimana corretta, segue il thread attuale della bounty o di coordinamento e invia la pull request dopo che i link settimanali sono pronti. Per favore, non inviare un'edizione futura prima che ZecHub abbia pubblicato o confermato la data di quell'edizione. Le pull request inviate in anticipo spesso non includono aggiornamenti di fine settimana, entrano in conflitto con un curatore assegnato o usano la scadenza sbagliata.

### 1. Conferma l'edizione corrente

Prima di iniziare a scrivere:

- Controlla [ZEC Bounties ](https://bounties.zechub.wiki/) per il task corrente della newsletter.
- Attendi di essere assegnato

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fai il fork del repository

Se sei nuovo su GitHub, usa questo flusso di lavoro:

1. Apri il [repository ZecHub](https://github.com/ZecHub/zechub).
2. Fai clic su **Fork** e crea un fork sotto il tuo account GitHub.
3. Nel tuo fork, crea un nuovo branch per l'edizione. Un nome di branch chiaro è utile, ad esempio `digest-may-30-2026`.
4. Assicurati che la tua pull request abbia come repository base `ZecHub/zechub` e come branch base `main`.

Se usi la riga di comando, lo stesso flusso di lavoro appare così:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Sostituisci `YOUR-USERNAME` con il tuo nome utente GitHub. L'URL sopra è un segnaposto e non verrà risolto così com'è scritto.

### 3. Crea il file della newsletter

Usa il [template della newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) come punto di partenza. Le edizioni della newsletter appartengono alla cartella [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Quando crei il file:

- Rispetta il formato del nome file richiesto dall'issue o usato dalle edizioni recenti accettate.
- Mantieni lo stesso ordine delle sezioni del template, a meno che il task non richieda un formato diverso.
- Aggiungi solo i link della settimana pertinente.
- Scrivi una descrizione breve e chiara per ogni link in modo che i lettori capiscano perché è importante.
- Traduci o riassumi in inglese le fonti non in inglese, quando necessario.
- Controlla ogni link prima di aprire la pull request.

### 4. Raccogli i link al momento giusto

ZecWeekly di norma copre l'attività dell'ecosistema Zcash della settimana corrente e viene pubblicata verso la fine della settimana. La tempistica più sicura è:

- Inizia a raccogliere i link dopo che l'issue o il task della newsletter corrente è stato pubblicato.
- Mantieni una bozza mentre la settimana è ancora in corso.
- Invia la pull request vicino alla data di consegna richiesta, dopo aver controllato gli aggiornamenti di fine settimana.
- Non inviare la newsletter di una settimana futura prima che esista il task per quella data o prima che ZecHub confermi che dovresti prepararla.

Se un'issue dice di inviare entro una data specifica, segui quella data. Se c'è un conflitto tra questa pagina e un'issue corrente, segui l'issue corrente.

### 5. Apri la pull request

Quando il file della tua newsletter è pronto:

1. Esegui il commit delle tue modifiche nel tuo fork.
2. Apri una pull request verso `ZecHub/zechub` sul branch `main`.
3. Usa un titolo che corrisponda all'edizione, ad esempio `Zcash Ecosystem Digest | May 30th`.
4. Collega l'issue nel corpo della pull request in modo che i revisori possano collegare il lavoro al task.

Esempio di corpo della pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Dopo che la pull request è aperta, tieni d'occhio i commenti di revisione. Se ZecHub chiede modifiche, aggiorna lo stesso branch invece di aprire una seconda pull request per la stessa edizione.

### Esempi reali

Usa queste pull request della newsletter già unite come esempi di invii accettati:

- [Zcash Ecosystem Digest | 11 aprile](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 marzo](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 febbraio](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Quando confronti il tuo lavoro con un esempio, concentrati sulla posizione del file, sul formato del titolo, sull'ordine delle sezioni, sulle descrizioni dei link e sul fatto che la pull request rimandi al task corretto.

### Errori comuni da evitare

- Aprire una pull request prima che la data dell'edizione o il task siano confermati.
- Lavorare su un'issue che ha già una pull request collegata.
- Inviare la pull request al tuo fork invece che a `ZecHub/zechub`.
- Usare il nome file sbagliato o mettere il file fuori dalla cartella `newsletter`.
- Copiare una vecchia edizione senza aggiornare ogni data, link e descrizione.
- Aggiungere link della settimana sbagliata.
- Lasciare link non funzionanti, link duplicati o testo segnaposto del template.
- Aprire una nuova pull request dopo i commenti di revisione invece di aggiornare il branch originale.

### Checklist finale

Prima di richiedere una revisione, conferma che:

- La data dell'issue o del task corrisponde al file della tua newsletter.
- Nessun'altra pull request aperta sta già coprendo la stessa issue o edizione.
- Il file è nella cartella `newsletter`.
- Le sezioni del template sono complete.
- Ogni link funziona e ha una descrizione utile.
- Il corpo della pull request collega l'issue corretta.
- Sei disponibile a fare modifiche se i revisori le richiedono.

## Edizioni passate

[Archivio ZecWeekly](https://zechub.substack.com/p/archive)
