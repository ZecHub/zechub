# Workshop Giorno 3



## Analisi dei dati

* La scienza di analizzare dati grezzi usando sistemi, strumenti e tecniche specializzati per identificare schemi, tendenze e intuizioni


Comprende:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Contante elettronico cifrato. La prima criptovaluta a sviluppare la cifratura a conoscenza zero per pagamenti privati peer-to-peer.

nota: se vuoi dati accurati di cui ti FIDI, è consigliato far girare un proprio nodo completo [zebrad]. Puoi configurare l'infrastruttura
z3 [ zebrad + zainod/lightwalletd + "wallet a scelta qui" ] se vuoi una soluzione completa e robusta. Accedi
ai dati usando gli RPC (Remote Procedure Call)

Per una rapida dimostrazione di come funziona, guarda questo video:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Demo del workshop

Questo workshop si concentrerà sulla raccolta e trasformazione dei dati a livello di wallet. Questo è il livello a cui la maggior parte delle persone accederà
alla blockchain di Zcash.


### Caso d'uso ( Creare un file .csv di tutte le transazioni di un dato account in Zkool)

Questo è uno scenario molto diffuso in cui si avrebbe bisogno di organizzare e ottimizzare le proprie finanze personali *digitali*.

#### Passo 1

Apri Zkool e seleziona l'account che vuoi usare

nota: useremo un wallet testnet per questa demo.

nota2: scegliamo Zkool qui, ma QUALSIASI wallet che disponga di una funzionalità di esportazione andrà bene!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Passo 2


Vai al menu in alto a destra e seleziona "Export Transactions"

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Passo 3

Scarica lo script bash che useremo per trasformare i nostri dati. Per gli sviluppatori che stanno guardando, userò bash che
è standard nella maggior parte delle distro Linux, ma puoi usare il linguaggio che preferisci. 

Per i non sviluppatori o gli studenti che si stanno facendo le ossa, usa l'IA! 

Alcuni esempi di prompt che possono aiutarti a iniziare:

"Come posso usare "bash/rust/python/ ... ecc." per trasformare file CSV"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

nota: devi comunque comprendere le basi, ma è facendo questi workshop che capisci il FLUSSO del processo.

nota2: l'IA di solito non è privata, quindi fai molta attenzione quando la usi come studente!

#### Passo 4

Prepara gli script per l'uso ed eseguili

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Passo 5 Usa i dati

Apri in libreOffice o in qualsiasi visualizzatore CSV per l'uso!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />


