<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Guida al Raspberry Pi 4 per eseguire Zebra

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="raspberry pi" width="300" height="300"/>

Eseguire il software del nodo Zebra su un Raspberry Pi 4 ti permette di partecipare alla rete Zcash come nodo indipendente e compatibile con il consenso. Questa guida ti accompagnerà attraverso i passaggi per configurare ed eseguire Zebra sul tuo Raspberry Pi 4.

## Prerequisiti

1. Raspberry Pi 4 (2GB di RAM o superiore consigliato).

2. Scheda MicroSD (16GB o superiore consigliato) con Raspberry Pi OS (Raspbian) installato.

3. Connessione a internet stabile.

4. Tastiera, mouse e un monitor (per la configurazione iniziale).

5. Client SSH (facoltativo, per l'accesso remoto).

## Installazione

1. __Aggiorna il tuo sistema__
   Apri un terminale o accedi via SSH al tuo Raspberry Pi e assicurati che il tuo sistema sia aggiornato eseguendo:

   __sudo apt update__

   __sudo apt upgrade__

2. __Installa le dipendenze__
   Dovrai installare alcune dipendenze necessarie per compilare ed eseguire Zebra:

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __Clona il repository di Zebra__
   Apri un terminale e clona il repository di Zebra sul tuo Raspberry Pi:

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __Compila Zebra__
   Per compilare Zebra, usa i seguenti comandi:

   __cargo build --release__

   Questo processo potrebbe richiedere del tempo. Assicurati che il tuo Raspberry Pi sia adeguatamente raffreddato, poiché la compilazione può generare calore.

5. __Configurazione__
   Crea un file di configurazione per Zebra. Puoi usare la configurazione predefinita come punto di partenza:

   __cp zcash.conf.example zcash.conf__

   Modifica il file zcash.conf per personalizzare le impostazioni del tuo nodo. Puoi specificare la rete, abilitare il mining, configurare le connessioni con i peer e altro.

6. __Avvia Zebra__
   Ora puoi avviare Zebra con la tua configurazione personalizzata:

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   Questo comando avvierà il nodo Zebra, che inizierà a sincronizzarsi con la blockchain di Zcash.

7. __Monitoraggio__
   Puoi monitorare l'avanzamento e lo stato del tuo nodo Zebra aprendo un browser web e navigando su __http://127.0.0.1:8233/status__.

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra logo" width="200" height="200"/>

## Risoluzione dei problemi

Se incontri problemi nella compilazione o nell'esecuzione di Zebra, consulta la [documentazione di Zebra](https://doc.zebra.zfnd.org/docs/intro.html) per suggerimenti sulla risoluzione dei problemi e informazioni aggiuntive.

Assicurati di mantenere il tuo Raspberry Pi fresco, poiché eseguire un nodo può generare calore. Potresti voler usare una soluzione di raffreddamento, come una ventola o un dissipatore di calore.

## Conclusione

Seguendo questa guida, dovresti aver configurato ed eseguito Zebra con successo sul tuo Raspberry Pi 4. Ora stai contribuendo alla rete Zcash come nodo indipendente, aiutando a proteggere la privacy delle transazioni Zcash.
