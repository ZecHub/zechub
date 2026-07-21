<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Nodi Lightwallet di Zcash

## Introduzione

Zcash, una criptovaluta incentrata sulla privacy, supporta una funzionalità chiamata "nodi lightwallet" che consente agli utenti di interagire con la blockchain di Zcash senza scaricare l'intera cronologia. Questa pagina wiki fornisce una panoramica sui nodi lightwallet, il ruolo del servizio "lightwalletd" nell'ecosistema Zcash, un elenco attuale di server dei nodi lightwallet e istruzioni su come cambiare server nei wallet più diffusi come Ywallet e Zingo.

## Servizio Lightwalletd

Il servizio "lightwalletd", abbreviazione di "lightwallet daemon", svolge un ruolo fondamentale nell'ecosistema dei nodi lightwallet di Zcash. Funziona come intermediario che fornisce ai client leggeri (lightwallet) le informazioni necessarie per funzionare efficacemente. Ecco una breve spiegazione del servizio lightwalletd:

__Aggregatore di Dati__: Lightwalletd aggrega dati dalla blockchain di Zcash, come informazioni sulle transazioni, dati dei blocchi e informazioni sui pool shielded.

__Verifica Semplificata__: Lightwalletd esegue una verifica semplificata di questi dati, consentendo ai lightwallet di accedere alle informazioni necessarie senza dover validare l'intera blockchain.

__Preservazione della Privacy__: Il servizio mantiene la privacy degli utenti Zcash non richiedendo loro di esporre le proprie viewing key o informazioni personali sulle transazioni.

__Sincronizzazione Efficiente__: Lightwalletd consente una sincronizzazione efficiente per i lightwallet, riducendo significativamente il tempo e le risorse necessarie per aggiornarsi alla blockchain di Zcash.


## Elenco Attuale dei Server Lightwalletd

* [status.zec.rocks](https://status.zec.rocks/)
* [hosh.zec.rocks](https://hosh.zec.rocks/zec)

## Cambiare Server nei Wallet Mobile

Cambiare il server del nodo lightwallet è relativamente semplice. Trova e accedi alle impostazioni avanzate all'interno dell'applicazione.

__Apri Ywallet/Zingo/Zashi/eZcash__: Avvia il wallet di tua scelta sul tuo dispositivo.

#### Ywallet:

Per Ywallet è l'icona a forma di ingranaggio in alto a destra - Vai alla scheda Zcash.

![SmartSelect_20250313_105128](https://github.com/user-attachments/assets/b0a2910b-dbdf-4292-8e69-af5a386aa183)

#### Zingo:

Per Zingo è nel menu hamburger in alto a sinistra, poi clicca su impostazioni e scorri verso il basso

![SmartSelect_20250313_105737_Zingo](https://github.com/user-attachments/assets/ea8f7672-e644-41a5-a422-db131740404a)

#### Zashi:

Per Zashi è l'icona a forma di ingranaggio in alto a destra - Vai su Impostazioni Avanzate, e poi Scegli un server

![SmartSelect_20250313_110200_Zashi](https://github.com/user-attachments/assets/5a9d050a-8308-4cc2-907e-513072066aed)

#### eZcash

Per eZcash è nel menu hamburger in alto a sinistra, poi clicca su Impostazioni, tocca Avanzate

![SmartSelect_20250313_110616](https://github.com/user-attachments/assets/655c0172-61a0-4322-b8cf-4eee4bb53b51)


## Conclusione

I nodi lightwallet di Zcash e il servizio lightwalletd offrono un modo comodo e rispettoso della privacy per interagire con la blockchain. La possibilità di cambiare server offre flessibilità nella scelta di un nodo che meglio si adatta alle tue esigenze.
