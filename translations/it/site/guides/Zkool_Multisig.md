# Guida al Multisig di Zkool

Questa guida fornisce una procedura passo passo su come effettuare transazioni multisig usando Zkool. Include la creazione di account, l'invio o la ricezione di fondi e l'impostazione della generazione distribuita delle chiavi (DKG) per il multisig. Sono inclusi screenshot per ogni passaggio principale.

## Tutorial

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/eagkCIv3BlQ"
    title="Zkool Demo | The Successor to Ywallet"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## 1. Creare un account


1. Apri l'**app Zkool** e vai su **New Account**.


![img1](https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f)

3. Inserisci un **Nome account** (es. Anabelle).  
   

![img2](https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254)


4. Opzionalmente attiva **Use Internal Change** o **Restore Account** se necessario.


5. Dopo la creazione, l'account comparirà nella tua **Lista degli account**.  


![img3](https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb)


## 2. Ricevere fondi

Ogni account genera più tipi di indirizzo:

**Unified Address**

**Indirizzo solo Orchard**

**Indirizzo Sapling**
  
**Indirizzo trasparente**


Seleziona il tipo che vuoi usare e condividilo per ricevere fondi.  


![img4](https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d)





## 3. Inviare fondi

1. Vai alla sezione **Recipient**.  


![img5](https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138)


3. Inserisci l'**indirizzo del destinatario**.  

4. Specifica l'**importo** e un eventuale **memo** opzionale.  

5. Rivedi i dettagli della transazione e **conferma**.  


Una volta completata, il saldo si aggiorna nella tua lista degli account.  


![img6](https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64)


## 4. Eseguire transazioni multisig: impostare la generazione distribuita delle chiavi (Multisig)

Il multisig in Zkool usa la **generazione distribuita delle chiavi (DKG)** per garantire che più partecipanti controllino un account condiviso.



### Passo 1: avvia la DKG
Scegli un **Nome** per il wallet condiviso (es. Anabelle).

Imposta il **Numero di partecipanti**.
  
Scegli il tuo **ID partecipante**.
  
Definisci il **Numero di firmatari richiesti (soglia)**.
    
Seleziona l'**Account di finanziamento**.
  

![img7](https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0)



### Passo 2: aggiungi gli indirizzi dei partecipanti
- Inserisci l'**Unified Address** di ciascun partecipante (consigliato).


**Nota:** se usi un indirizzo solo Orchard o solo Sapling, il multisig sarà limitato a quel solo pool (Orchard o Sapling).  
Questo significa che il wallet condiviso non può ricevere fondi da altri pool.  
Per la massima compatibilità e flessibilità, usa sempre gli **Unified Address**.  


### Passo 3: esegui i round della DKG
Attendi che tutti i partecipanti scambino i pacchetti del **round 1** e del **round 2**.  


![img8](https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4)



### Passo 4: finalizza l'indirizzo condiviso
Una volta completato, viene generato un **indirizzo condiviso**.  


![img9](https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747)



## Conclusione

Con Zkool puoi: creare account, inviare e ricevere fondi e impostare un **wallet multisig** usando la generazione distribuita delle chiavi. Questo garantisce una **sicurezza potenziata** e una **gestione dei fondi collaborativa e privata**.  
