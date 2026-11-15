<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Graphene OS

## TL;DR

- **GrapheneOS** è un sistema operativo mobile open source e no profit incentrato su privacy e sicurezza, con piena compatibilità con le app quotidiane di Android
- Punti di forza principali: sandbox delle app rafforzata, codice memory-safe e mitigazioni degli exploit, avvio verificato basato su hardware, permessi granulari e protezione della porta USB-C quando il dispositivo è bloccato
- L'installazione avviene tramite **l'installer ufficiale di WebUSB** (consigliato per la maggior parte degli utenti) oppure tramite **la procedura da riga di comando** per gli utenti tecnici
- Per un utente di Zcash, è una base solida per l'autocustodia mobile: abbinalo a un portafoglio schermato mantenuto attivamente e alla consueta igiene OPSEC

GrapheneOS è un progetto open source e no profit dedicato a migliorare privacy e sicurezza sui dispositivi mobili, mantenendo al contempo la compatibilità con le app di Android. Questo sistema operativo pone una forte enfasi sull'avanzamento delle tecnologie di privacy e sicurezza, con particolare attenzione al rafforzamento del sandboxing, delle mitigazioni degli exploit e al perfezionamento del modello di permessi. Nato nel 2014 con il nome di **CopperheadOS**, si è da allora evoluto fino a diventare un formidabile custode della tua privacy e sicurezza digitale.

L'obiettivo principale di GrapheneOS è rafforzare i confini di sicurezza, come la sandbox delle app, senza penalizzare l'esperienza utente.

GrapheneOS può introdurre vari interruttori per funzioni specifiche, come i permessi di rete, i permessi dei sensori o le restrizioni quando il dispositivo è bloccato (aspetti come periferiche USB, accesso alla fotocamera e quick tiles). Inoltre, le funzioni di privacy e sicurezza più articolate rivolte all'utente sono progettate con cura per mantenere un'esperienza user-friendly, e ognuna è accompagnata da propri miglioramenti dell'interfaccia utente.

## **Caratteristiche di GrapheneOS**

**Rafforzamento della sicurezza** GrapheneOS include numerosi miglioramenti della sicurezza, come linguaggi di programmazione memory-safe e funzioni di sicurezza basate sul compilatore per ridurre le vulnerabilità più comuni.

**Sandboxing** Rafforza il sandboxing delle app per isolare le app una dall'altra, limitando i potenziali vettori di attacco.

**Avvio verificato** GrapheneOS utilizza chiavi basate su hardware e un processo di avvio verificabile per garantire l'integrità del sistema operativo.

**Permessi migliorati** Offre un controllo più fine sui permessi delle app, permettendoti di regolare e gestire con precisione a quali dati le app possono accedere.

**Privacy Dashboard** Puoi monitorare e controllare il comportamento delle app tramite una privacy dashboard, che offre trasparenza sull'utilizzo dei dati.

**Aggiornamenti di sicurezza integrati** GrapheneOS offre aggiornamenti di sicurezza tempestivi, garantendo che tu abbia sempre la protezione più recente contro le vulnerabilità.

**Crittografia robusta** Utilizza per impostazione predefinita la crittografia dell'intero disco, proteggendo i dati memorizzati sul dispositivo.

**Sicurezza del browser migliorata** Il browser predefinito è configurato per una sicurezza potenziata, inclusa la protezione contro il tracciamento.

**Poche app preinstallate** GrapheneOS include un numero minimo di app preinstallate, riducendo i potenziali rischi per la sicurezza e la privacy.

**Protezione della porta USB da accessi ostili** Offre protezione contro l'accesso non autorizzato al dispositivo tramite le porte USB quando il dispositivo è bloccato.

**Protezioni antimalware** GrapheneOS include funzioni per rilevare e prevenire il malware noto.

**Orientato alla privacy** Il sistema operativo è progettato con una forte attenzione alla privacy dell'utente, riducendo al minimo la raccolta e l'esposizione dei dati.

**Open Source** È un progetto open source, che garantisce trasparenza e la possibilità di contributi della comunità per migliorare la sicurezza.

**Politiche di sicurezza personalizzabili** Hai la possibilità di personalizzare diverse politiche di sicurezza in base alle tue preferenze.

**Compatibilità** GrapheneOS si impegna a mantenere la compatibilità con le app di Android, così puoi continuare a usare le tue applicazioni preferite beneficiando al contempo di funzioni di sicurezza e privacy migliorate.

## **Installazione di GrapheneOS**

Come indicato nella sezione sulle buone pratiche, si consiglia di usare la guida ufficiale all'installazione consigliata. Esistono due metodi per installare GrapheneOS: usare l'[installer basato su WebUSB](https://grapheneos.org/install/web) oppure seguire la [guida all'installazione da riga di comando](https://grapheneos.org/install/cli).

**Installazione basata su Web USB** Per installare GrapheneOS con il metodo dell'installer web, in genere ti servono i seguenti materiali e risorse:

- 2 GB di memoria libera e 32 GB di spazio di archiviazione libero.
- Cavo USB (A o C)
- Usa un sistema operativo host supportato e un browser con supporto WebUSB funzionante. Consulta i [prerequisiti ufficiali di WebUSB](https://grapheneos.org/install/web#prerequisites) correnti per le versioni supportate e le restrizioni relative ai pacchetti dei browser; i sistemi più vecchi giunti a fine vita non sono supportati ufficialmente.
- L'installer web può anche essere eseguito da un dispositivo Android supportato, da ChromeOS o da GrapheneOS. Segui le note specifiche per il browser nella guida ufficiale invece di dare per scontato che ogni pacchetto Chromium supporti WebUSB.

Consulta la guida all'installazione tramite il link qui sotto e segui il processo di installazione

[GrapheneOS Guida all'installer web](https://grapheneos.org/install/web#prerequisites)

**Installazione da riga di comando** L'installazione da riga di comando non è consigliata agli utenti privi di competenze tecniche, e per essa sono necessari i seguenti strumenti e risorse:

- Devi avere a disposizione almeno 2 GB di memoria libera e 32 GB di spazio di archiviazione libero
- Cavo USB (A o C)
- Usa un sistema operativo host supportato dai [prerequisiti correnti per la riga di comando](https://grapheneos.org/install/cli#prerequisites) e segui quella guida per gli strumenti necessari.
- Gli host Android, ChromeOS e GrapheneOS dovrebbero usare l'installer web; non sono elencati tra gli host supportati per l'installazione da riga di comando.

Consulta la guida all'installazione tramite il link qui sotto e segui il processo di installazione

[Installazione da riga di comando](https://grapheneos.org/install/cli#prerequisites)

## **Buone pratiche**

**Mantieni il sistema operativo aggiornato** Aggiorna regolarmente GrapheneOS per assicurarti di avere le ultime patch di sicurezza e i miglioramenti più recenti.

**Usa password robuste** Imposta password robuste e univoche per la crittografia del dispositivo e per gli accessi alle app, per prevenire accessi non autorizzati.

**Permessi delle app** Rivedi e gestisci con attenzione i permessi delle app, concedendo solo ciò che è necessario perché ogni app funzioni.

**Backup regolari** Esegui regolarmente il backup dei tuoi dati, nel caso di perdita del dispositivo o di corruzione dei dati.

**Crittografa l'archiviazione** Se non è attiva per impostazione predefinita, crittografa lo spazio di archiviazione del dispositivo per proteggere i tuoi dati in caso di smarrimento o furto.

**Schermata di blocco sicura** Usa una schermata di blocco sicura, come un PIN, una password o l'autenticazione biometrica, per prevenire accessi non autorizzati.

**Riblocca il bootloader dopo l'installazione** Il processo di installazione ufficiale richiede di [sbloccare temporaneamente il bootloader](https://grapheneos.org/install/web#unlocking-the-bootloader) per flashare GrapheneOS, poi di [ribloccarlo prima dell'uso](https://grapheneos.org/install/web#locking-the-bootloader) per abilitare l'avvio verificato completo. Sbloccare e ribloccare cancellano entrambi tutti i dati utente, quindi esegui prima il backup e segui i passaggi ufficiali in ordine. Non fare il root del sistema operativo installato.

**Verifica le fonti delle app** Verifica l'autenticità delle app e delle loro fonti per evitare di installare software dannoso.

**Installa un browser orientato alla privacy** Valuta l'uso di un browser orientato alla privacy come il browser Brave, Firefox o Bromite per una navigazione sicura.

**Controlla regolarmente le app** Rivedi periodicamente e disinstalla le app che non usi più o di cui non ti fidi più, per ridurre la superficie di attacco.

**Attiva l'autenticazione a due fattori (2FA)** Attiva il 2FA per i tuoi account online per aggiungere un livello di sicurezza in più.

**Evita il Wi-Fi pubblico** Fai attenzione quando ti colleghi a reti Wi-Fi pubbliche, perché possono essere meno sicure. Usa una VPN quando necessario.

**Fai attenzione ai dati sulla posizione** Limita il tracciamento della posizione per le app e valuta l'uso di uno strumento di spoofing della posizione se la privacy è importante per te.

**Evita link e allegati sconosciuti** Diffida dei link e degli allegati email non richiesti, perché potrebbero essere tentativi di phishing o malware.

**Rivedi le impostazioni predefinite** Rivedi con attenzione e modifica le impostazioni predefinite per allinearle alle tue preferenze di privacy.

**Supporto della comunità** Partecipa alla comunità di GrapheneOS e ai suoi forum per consigli, aggiornamenti e suggerimenti sulla sicurezza. Puoi contattare il team e restare aggiornato facendo clic [qui](https://grapheneos.org/contact) per esplorare altri contatti.

**Usa il metodo di installazione ufficiale** GrapheneOS offre due metodi di installazione supportati ufficialmente. Puoi scegliere l'installer basato su WebUSB, consigliato per la maggior parte delle persone, oppure seguire la guida all'installazione da riga di comando, pensata per gli utenti più esperti dal punto di vista tecnico.

## **Conclusioni**

In sostanza, GrapheneOS punta a offrire un sistema operativo mobile alternativo che dà priorità alla privacy e alla sicurezza dei suoi utenti, dandogli un maggiore controllo sulla propria vita digitale e garantendo al contempo la compatibilità con le app di cui si fidano. È un progetto che mira a stabilire uno standard elevato per la sicurezza e la privacy dei dispositivi mobili in un'epoca in cui queste preoccupazioni sono di primaria importanza.

## Pagine correlate

- [Messaggistica sicura](Secure_Messengers.md) — comunicazione privata su un dispositivo rafforzato
- [Crittografia PGP](PGP_Encryption.md) — scambio di email e file crittografati
- [VPN e DVPN](VPN_and_DVPN.md) — privacy a livello di rete su mobile
- [Browser web](Web_Browsers.md) — scelta e rafforzamento di un browser mobile
