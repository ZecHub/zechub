<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica la pagina"/>
</a>

# Guida per l'utente di Keystone Zodl (precedentemente Zashi)

> Conserva ZEC schermati in cold storage: abbina un portafoglio hardware Keystone all'app Zodl (precedentemente Zashi, con nuovo brand da febbraio 2026) e firma le transazioni tramite codici QR.

## In breve

* Keystone 3 Pro (o Keystone 3) con il firmware Cypherpunk funziona come dispositivo di firma air-gapped per Zodl, così ZEC schermati possono restare in cold storage.
* Prima di iniziare: batteria oltre il 20%, cavo USB (o scheda MicroSD FAT32) per aggiornare il firmware e app Zodl sul telefono.
* Verifica prima il dispositivo sul sito web di Keystone. In questo modo controlli che non sia stato manomesso durante il trasporto.
* Crea il portafoglio su Keystone e annota offline la frase mnemonica di 24 parole. Non viene mai inserita in Zodl.
* Connetti: su Keystone tocca "..." > Connetti portafoglio software > Zodl, poi in Zodl tocca Connetti portafoglio hardware e scansiona il codice QR.
* Zodl prepara ogni transazione; tu la approvi e la firmi sullo schermo di Keystone, scansionando i codici QR in entrambe le direzioni.

## Spiegazione di base

Un portafoglio hardware conserva le tue chiavi di spesa su un dispositivo separato che non si connette mai a internet. Keystone è air-gapped: comunica con il telefono solo tramite codici QR, non via Bluetooth o USB.

In questa configurazione, Zodl è il lato "di osservazione". Si sincronizza con la rete di Zcash, mostra il tuo saldo schermato e prepara le transazioni. Keystone conserva la frase mnemonica e firma. Un telefono compromesso può vedere il tuo saldo, ma non può trasferire fondi senza la tua approvazione su Keystone.

I passaggi seguenti illustrano come preparare il dispositivo, verificarlo, aggiornare il firmware, creare il portafoglio e connetterlo a Zodl.

## Panoramica

Guida di Twitter:  => [Zodl (precedentemente Zashi) x Integrazione del portafoglio hardware Keystone Twitter Guida](https://x.com/zashi_app/status/1869793574880973144) 

Questa integrazione segna un'evoluzione significativa dell'usabilità di Zcash, perché consente di conservare in cold storage ZEC schermati. In passato, la community di Zcash ha subito battute d'arresto con altre piattaforme di portafogli hardware, ma Keystone si è rivelato un partner collaborativo, pronto a superare i limiti e innovare insieme a Electric Coin Company. Il team di Keystone ha ricevuto un finanziamento ZCG per sostenere la propria parte del lavoro.

## Tutorial Keystone X Zodl

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Tutorial Keystone X Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## Preparazione
[Ordina e ricevi il tuo Keystone 3 Pro o Keystone 3](https://keyst.one) 

Livello della batteria: assicurati che il tuo dispositivo Keystone abbia una carica superiore al 20%.

Cavo USB o scheda SD:

- Cavo USB per l'aggiornamento del firmware (incluso).
- Scheda MicroSD (inferiore a 1 TB) per gli aggiornamenti (da acquistare separatamente).

Accedi al sito web ufficiale di Keystone per la verifica e l'aggiornamento del firmware.

Configura l'app Zodl sul tuo dispositivo mobile.

## [Guida passo passo(Keystone Dispositivo)](https://keyst.one/get-started) 


**Scegli la lingua**

- **Verifica del dispositivo (tramite QR):** è fondamentale per rilevare eventuali manomissioni durante il trasporto, prevenire attacchi alla supply chain e garantire la sicurezza del firmware installato.
  - Visita la pagina di verifica del dispositivo sul sito web di Keystone.
  - Fai clic su Scansiona codice QR sul sito web ufficiale.
  - Usa la fotocamera di Keystone per scansionare il codice QR mostrato sul sito web.
  - Sullo schermo di Keystone apparirà un codice di verifica.
  - Inserisci questo codice sul sito web per completare la procedura di verifica.

- **Aggiornamento del firmware:**
  - Aggiornamento tramite scheda MicroSD
    - Assicurati che il tuo portafoglio Keystone abbia almeno il 20% di carica.
    - Inserisci la scheda SD nel computer e formattala come FAT32.
    - Scarica l'ultima versione del firmware Cypherpunk dalla pagina di aggiornamento del firmware di [Keystone](https://keyst.one/firmware) e salva il file keystone3.bin nella directory principale della scheda MicroSD.
    - Inserisci nel portafoglio Keystone la scheda SD con il firmware.
    - Apri l'opzione "Aggiorna" sul portafoglio Keystone, poi segui le istruzioni sullo schermo per avviare l'aggiornamento.
  - **Aggiornamento tramite cavo USB**
    - Se la versione del firmware è precedente alla 1.0.4, prima dovrai eseguire l'aggiornamento iniziale tramite una scheda MicroSD, poi potrai procedere con gli aggiornamenti USB.
    - Assicurati che il tuo portafoglio Keystone abbia almeno il 20% di carica.
    - Tocca Tramite USB e usa il cavo USB per collegare il portafoglio Keystone al computer. Tocca [Approva] per autorizzare l'accesso USB al portafoglio Keystone, altrimenti potrebbe consentire solo la ricarica.
    - Apri il browser web del computer e vai alla pagina di aggiornamento del firmware di [Keystone](https://keyst.one/firmware)
    - Nella pagina di aggiornamento, fai clic sul pulsante Installa aggiornamento e segui le istruzioni per installare il firmware più recente.
- **Crea il portafoglio:**
    - Password sicura: scegli un PIN o una password robusta per proteggere il portafoglio.
    - Dai un nome al portafoglio (facoltativo): puoi assegnare un nome al portafoglio per identificarlo facilmente oppure saltare questo passaggio.
    - Seleziona Crea nuovo portafoglio se è la prima volta che ne configuri uno.
    - Il dispositivo genererà una frase mnemonica di 24 parole.
    - Annotala e conservala al sicuro.
    - Conferma la frase mnemonica verificando che le parole siano nell'ordine corretto, come mostrato sullo schermo.
- **Connetti il portafoglio Zodl + Keystone:**
    - Sul dispositivo Keystone: tocca … nella pagina principale
    - Tocca Connetti portafoglio software e scegli Zodl. Apparirà il codice QR per connetterti a Zodl.
    - Nell'app Zodl: tocca il menu a discesa Zodl (in alto a sinistra dello schermo)
    - Tocca Connetti portafoglio hardware
    - Tocca Pronto per la scansione
    - Scansiona il codice QR mostrato sul dispositivo Keystone
    - Nell'app Zodl: conferma il portafoglio Keystone toccando l'account visualizzato
    - Tocca Connetti in fondo allo schermo


## Ulteriore assistenza

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connetti il portafoglio hardware Keystone a Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Firma una transazione in uscita con Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
