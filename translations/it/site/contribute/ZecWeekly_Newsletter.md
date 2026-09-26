<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly è una newsletter che viene pubblicata ogni domenica mattina. Include tutte le notizie avvenute durante la settimana nell'ecosistema Zcash. Le notizie sono curate settimanalmente dai membri della community e tutti i link pertinenti vengono aggiunti alla newsletter. Iscriviti alla newsletter [qui](https://zechub.substack.com/).

## Contribuire

I contributi alla newsletter funzionano meglio quando un collaboratore prepara l'edizione per la settimana corretta, segue l'attuale thread relativo alla taglia o al coordinamento e invia la pull request dopo che i link settimanali sono pronti. Non inviare un'edizione futura prima che ZecHub abbia pubblicato o confermato la data di quell'edizione. Le pull request anticipate spesso non includono aggiornamenti dell'ultima parte della settimana, entrano in conflitto con un curatore assegnato o utilizzano la scadenza sbagliata.

### 1. Conferma l'edizione attuale

Prima di iniziare a scrivere:

- Controlla [ZEC Bounties ](https://bounties.zechub.wiki/) per l'attività relativa alla newsletter attuale.
- Attendi di ricevere l'assegnazione

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fai il fork del repository

Se non conosci GitHub, usa questo flusso di lavoro:

1. Apri il [repository ZecHub](https://github.com/ZecHub/zechub).
2. Fai clic su **Fork** e crea un fork nel tuo account GitHub.
3. Nel tuo fork, crea un nuovo branch per l'edizione. Un nome del branch chiaro è utile, ad esempio `digest-may-30-2026`.
4. Assicurati che la tua pull request abbia come repository di base `ZecHub/zechub` e come branch di base `main`.

Se utilizzi la riga di comando, lo stesso flusso di lavoro è così:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Sostituisci `YOUR-USERNAME` con il tuo nome utente GitHub. L'URL sopra è un segnaposto e non verrà risolto così com'è scritto.

### 3. Crea il file della newsletter

Usa il [modello della newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) come punto di partenza. Le edizioni della newsletter appartengono alla cartella [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Quando crei il file:

- Rispetta il formato del nome file richiesto dall'issue o utilizzato dalle recenti edizioni accettate.
- Mantieni lo stesso ordine delle sezioni del modello, a meno che l'attività non richieda un formato diverso.
- Aggiungi link solo della settimana pertinente.
- Scrivi una descrizione breve e chiara per ogni link, così i lettori capiscono perché è importante.
- Quando necessario, traduci o riassumi in inglese le fonti non in inglese.
- Controlla ogni link prima di aprire la pull request.

### 4. Raccogli i link al momento giusto

ZecWeekly normalmente copre l'attività dell'ecosistema Zcash della settimana corrente e viene pubblicata verso la fine della settimana. La tempistica più sicura è:

- Inizia a raccogliere i link dopo la pubblicazione dell'attuale numero o attività della newsletter.
- Mantieni una bozza mentre la settimana è ancora in corso.
- Invia la pull request vicino alla data di invio richiesta, dopo aver controllato gli aggiornamenti dell'ultima parte della settimana.
- Non inviare la newsletter di una settimana futura prima che esista l'attività per quella data o prima che ZecHub confermi che devi prepararla.

Se un'issue indica di inviare entro una data specifica, segui quella data. Se c'è un conflitto tra questa pagina e un'issue attuale, segui l'issue attuale.

### 5. Apri la pull request

Quando il file della newsletter è pronto:

1. Effettua il commit delle modifiche nel tuo fork.
2. Apri una pull request in `ZecHub/zechub` sul branch `main`.
3. Usa un titolo che corrisponda all'edizione, ad esempio `Zcash Ecosystem Digest | May 30th`.
4. Collega l'issue nel corpo della pull request, così i revisori possono collegare il lavoro all'attività.

Esempio di corpo della pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Dopo aver aperto la pull request, tieni d'occhio i commenti della revisione. Se ZecHub richiede modifiche, aggiorna lo stesso branch invece di aprire una seconda pull request per la stessa edizione.

### Esempi reali

Usa queste pull request della newsletter unite come esempi di invii accettati:

- [Zcash Ecosystem Digest | 11 aprile](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 marzo](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 febbraio](https://github.com/ZecHub/zechub/pull/1474)


![Esempio di pull request della newsletter ZecWeekly unita](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Quando confronti il tuo lavoro con un esempio, concentrati sulla posizione del file, sul formato del titolo, sull'ordine delle sezioni, sulle descrizioni dei link e sul fatto che la pull request sia collegata all'attività corretta.

### Errori comuni da evitare

- Aprire una pull request prima che la data dell'edizione o l'attività sia confermata.
- Lavorare su un'issue che ha già una pull request collegata.
- Inviare la pull request al tuo fork invece che a `ZecHub/zechub`.
- Usare il nome file sbagliato o collocare il file al di fuori della cartella `newsletter`.
- Copiare una vecchia edizione senza aggiornare ogni data, link e descrizione.
- Aggiungere link della settimana sbagliata.
- Lasciare link non funzionanti, link duplicati o testo segnaposto del modello.
- Aprire una nuova pull request dopo i commenti di revisione invece di aggiornare il branch originale.

### Checklist finale

Prima di richiedere la revisione, conferma che:

- La data dell'issue o dell'attività corrisponde al file della newsletter.
- Nessun'altra pull request aperta sta già coprendo la stessa issue o edizione.
- Il file si trova nella cartella `newsletter`.
- Le sezioni del modello sono complete.
- Ogni link funziona e ha una descrizione utile.
- Il corpo della pull request collega l'issue corretta.
- Sei disponibile a effettuare modifiche se i revisori le richiedono.

## Edizioni passate

[Archivio ZecWeekly](https://zechub.substack.com/p/archive)
