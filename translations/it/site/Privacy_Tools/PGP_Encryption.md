<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) è un pacchetto software crittografico che fornisce comunicazioni sicure su canali non sicuri. PGP usa una combinazione di crittografia e firme digitali per garantire che solo il destinatario previsto possa leggere un messaggio e che il mittente sia chi dice di essere.

## Strumenti disponibili

Esistono molti strumenti PGP diversi, ma tra i più popolari ci sono:

* **[GnuPG (GPG)](https://gnupg.org/)**: uno strumento da riga di comando open source e gratuito per OpenPGP. Scegli il pacchetto o l'interfaccia grafica adatti al tuo sistema operativo.
* **[Thunderbird](https://www.openpgp.org/software/thunderbird/)**: un client di email desktop gratuito e open source con supporto integrato per OpenPGP a partire dalla versione 78. Non ha bisogno di Mailvelope per crittografare le email.
* **[Mailvelope](https://mailvelope.com/)**: un'estensione per browser open source che aggiunge OpenPGP ai servizi di webmail supportati, tra cui Gmail. È uno strumento per webmail, non un'estensione per Thunderbird.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Come generare le chiavi

Per usare PGP, devi generare una coppia di chiavi: Come generare le chiavi PGP:

1. Apri il tuo software PGP.
2. Fai clic sul pulsante "Genera chiave".
3. Inserisci il tuo nome e il tuo indirizzo email.
4. Scegli la lunghezza della chiave. Più lunga è la chiave, più sicure saranno le tue chiavi.
5. Fai clic sul pulsante "Genera".

La tua coppia di chiavi PGP verrà generata.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## Come usare PGP per le email

Una volta generata una coppia di chiavi PGP, puoi usarla per crittografare e decrittografare le email. Per crittografare un'email, devi conoscere la chiave pubblica del destinatario. Puoi quindi usare il tuo strumento PGP per crittografare l'email usando la chiave pubblica del destinatario.

L'email crittografata sarà illeggibile per chiunque non possieda la chiave privata del destinatario. Per decrittografare l'email, il destinatario può usare la propria chiave privata per decrittografarla.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## Buone pratiche

Ecco alcune buone pratiche per l'uso di PGP:

* Tieni al sicuro la tua chiave privata. La chiave privata è la parte più importante della tua coppia di chiavi PGP. Se qualcuno ottiene la tua chiave privata, può decrittografare qualsiasi messaggio crittografato con la tua chiave pubblica.

![Buone pratiche 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Buone pratiche 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Condividi la tua chiave pubblica con le persone di cui ti fidi. Puoi condividere la tua chiave pubblica inviandola direttamente oppure caricandola su un keyserver PGP.
* Usa password robuste per il tuo portachiavi PGP. Il tuo portachiavi PGP è un file che contiene le tue chiavi PGP. È importante usare una password robusta per proteggere questo file.
* Mantieni il tuo software PGP aggiornato. Il software PGP viene aggiornato continuamente per correggere bug e migliorare la sicurezza. È importante mantenere il software aggiornato per assicurarti di usare le funzionalità di sicurezza più recenti.

## Come crittografare un'email con PGP

* Apri il tuo software PGP.
* Apri l'email che vuoi crittografare.
* Fai clic sul pulsante "Crittografa".
* Inserisci la chiave pubblica del destinatario.
* Fai clic sul pulsante "Crittografa".
* L'email verrà crittografata.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## Come decrittografare un'email con PGP

* Apri il tuo software PGP.
* Apri l'email crittografata.
* Fai clic sul pulsante "Decrittografa".
* Inserisci la tua chiave privata.
* Fai clic sul pulsante "Decrittografa".
* L'email verrà decrittografata.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
