<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) è un pacchetto software crittografico che fornisce comunicazioni sicure su canali non sicuri. PGP usa una combinazione di cifratura e firme digitali per garantire che solo il destinatario previsto possa leggere un messaggio e che il mittente sia chi dice di essere.

## Strumenti disponibili

Esistono molti strumenti PGP diversi, ma alcuni dei più popolari includono:

* **[GPG](https://gpgtools.org/)**: GPG è un'implementazione PGP gratuita e open-source disponibile per Windows, macOS e Linux.
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail è un client email PGP commerciale disponibile per Windows e macOS.
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope è un'estensione PGP gratuita e open-source per Gmail e Thunderbird.

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## Come generare le chiavi

Per usare PGP, devi generare una coppia di chiavi. Come generare le chiavi PGP:

1. Apri il tuo software PGP.
2. Clicca sul pulsante "Generate Key".
3. Inserisci il tuo nome e indirizzo email.
4. Scegli la lunghezza della chiave. Maggiore è la lunghezza della chiave, più sicure saranno le tue chiavi.
5. Clicca sul pulsante "Generate".

La tua coppia di chiavi PGP verrà generata.

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## Come usare PGP per le email

Una volta generata una coppia di chiavi PGP, puoi usarla per cifrare e decifrare le email. Per cifrare un'email, devi conoscere la chiave pubblica del destinatario. Puoi quindi usare il tuo strumento PGP per cifrare l'email usando la chiave pubblica del destinatario.

L'email cifrata sarà illeggibile per chiunque non disponga della chiave privata del destinatario. Per decifrare l'email, il destinatario può usare la propria chiave privata per decifrarla.

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## Best practice

Ecco alcune best practice per l'uso di PGP:

* Tieni al sicuro la tua chiave privata. La chiave privata è la parte più importante della tua coppia di chiavi PGP. Se qualcuno ottiene la tua chiave privata, può decifrare qualsiasi messaggio che sia stato cifrato con la tua chiave pubblica.

![Best Practices 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Best Practices 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* Condividi la tua chiave pubblica con persone di cui ti fidi. Puoi condividere la tua chiave pubblica inviandola loro direttamente oppure caricandola su un keyserver PGP.
* Usa password robuste per il tuo keyring PGP. Il tuo keyring PGP è un file che memorizza le tue chiavi PGP. È importante usare una password robusta per proteggere questo file.
* Mantieni aggiornato il tuo software PGP. Il software PGP viene costantemente aggiornato per correggere bug e migliorare la sicurezza. È importante tenere aggiornato il software per assicurarti di usare le funzionalità di sicurezza più recenti.

## Come cifrare un'email con PGP

* Apri il tuo software PGP.
* Apri l'email che vuoi cifrare.
* Clicca sul pulsante "Encrypt".
* Inserisci la chiave pubblica del destinatario.
* Clicca sul pulsante "Encrypt".
* L'email verrà cifrata.

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## Come decifrare un'email con PGP

* Apri il tuo software PGP.
* Apri l'email cifrata.
* Clicca sul pulsante "Decrypt".
* Inserisci la tua chiave privata.
* Clicca sul pulsante "Decrypt".
* L'email verrà decifrata.

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
