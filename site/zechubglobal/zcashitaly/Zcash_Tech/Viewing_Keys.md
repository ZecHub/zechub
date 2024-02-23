# Chiavi di visualizzazione

Gli indirizzi protetti consentono agli utenti di effettuare transazioni rivelando il minor numero possibile di informazioni sulla blockchain di Zcash. Cosa succede quando è necessario divulgare informazioni sensibili su una transazione Zcash protetta a una parte specifica? Ogni indirizzo protetto include una chiave di visualizzazione. Le chiavi di visualizzazione sono state introdotte in [ZIP 310](https://zips.z.cash/zip-0310) e aggiunte al protocollo nell'aggiornamento di rete di Sapling. Le chiavi di visualizzazione sono una parte cruciale di Zcash in quanto consentono agli utenti di divulgare selettivamente informazioni sulle transazioni.

### Perché usare una chiave di visualizzazione?

Perché un utente vorrebbe mai farlo? Dall'articolo di Electric Coin Co. sulla questione...

*- Un exchange desidera rilevare quando un cliente deposita ZEC in un indirizzo protetto, mantenendo le chiavi di "autorizzazione di spesa" su hardware sicuro (ad esempio, HSM). L'exchange potrebbe generare una chiave di visualizzazione in ingresso e caricarla su un nodo "di rilevamento" connesso a Internet, mentre la chiave di spesa rimane nel sistema più sicuro.*

*- Un custode ha bisogno di fornire visibilità delle sue proprietà di Zcash agli auditor. Il custode può generare una chiave di visualizzazione completa per ciascuno dei suoi indirizzi protetti e condividerla con il proprio revisore. Il revisore potrà verificare il saldo di quegli indirizzi e rivedere l'attività di transazione passata da e verso quegli indirizzi.* 

*- Un exchange potrebbe dover condurre controlli di dovuta diligenza su un cliente che effettua depositi da un indirizzo protetto. L'exchange potrebbe richiedere la chiave di visualizzazione del cliente per il suo indirizzo protetto e usarla per rivedere l'attività di transazione protetta del cliente come parte di queste procedure di dovuta diligenza migliorate.*

### Come trovare la tua chiave di visualizzazione

#### zcashd

* Elencare tutti gli indirizzi conosciuti utilizzando ` ./zcash-cli listaddresses`

* Quindi eseguire il seguente comando per gli indirizzi schermati UA o Sapling:

  `./zcash-cli z_exportviewingkey "<UA or Z address>"`

#### ywallet

* Nell'angolo in alto a destra seleziona "Backup", autentica il tuo cellulare, quindi copia semplicemente la tua chiave di visualizzazione che ti viene visualizzata.

### Come utilizzare la tua chiave di visualizzazione

#### zcashd

* Usa quanto segue con qualsiasi vkey o ukey:

`./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000`

#### ywallet

* Nell'angolo in alto a destra seleziona "Account", fai clic su "+" nell'angolo inferiore destro per aggiungere ed importa la tua chiave di visualizzazione per avere il tuo account di *sola lettura*

![myViewKey](https://user-images.githubusercontent.com/81990132/208585568-46065002-6682-4ff4-ae8b-d206205b5d9b.png)


#### zcashblockexplorer.com

* Semplicemente entra a questo [link](https://zcashblockexplorer.com/vk), inserisci la chiave di visualizzazione e clicca su "Start Importing" per ottenere i risultati! Nota: questi risultati sono ora sul nodo di zcashblockexplorer e quindi stai affidando queste informazioni ai proprietari di zcashblockexplorer.com

### Resources

Pur essendo una grande tecnologia, si consiglia di utilizzare le chiavi di visualizzazione solo quando necessario.

Consulta questo tutorial sulle chiavi di visualizzazione. Di seguito è riportato un elenco di risorse sull'argomento se desideri approfondire:

- [ECC, Spiegazione delle chiavi di visualizzazione](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Divulgazione selettiva e chiavi di visualizzazione](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Presentazione video sulle chiavi di visualizzazione di Zcash](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
