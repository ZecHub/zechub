<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Gli indirizzi Shielded consentono agli utenti di effettuare transazioni rivelando il minor numero possibile di informazioni sulla blockchain Zcash. Cosa succede quando hai bisogno di divulgare informazioni sensibili relative a una transazione Zcash Shielded a una parte specifica? Ogni indirizzo Shielded include una Viewing Key. Le Viewing Keys sono state introdotte nella [ZIP 310](https://zips.z.cash/zip-0310) e aggiunte al protocollo con l'aggiornamento di rete Sapling. Le Viewing Keys sono una componente fondamentale di Zcash in quanto consentono agli utenti di divulgare selettivamente informazioni sulle transazioni.

### Perché usare una Viewing Key?

Perché un utente dovrebbe volerlo fare? Dal blog di Electric Coin Co. sull'argomento...

*- Un exchange vuole rilevare quando un cliente deposita ZEC su un indirizzo Shielded, mantenendo al contempo le chiavi di **autorizzazione alla spesa** su hardware sicuro. L'exchange potrebbe generare una Viewing Key in entrata e caricarla su un nodo di **rilevamento** connesso a Internet, mentre la chiave di spesa rimane sul sistema più sicuro.*

*- Un custode ha bisogno di fornire visibilità delle proprie disponibilità in Zcash ai revisori. Il custode può generare una Viewing Key completa per ciascuno dei propri indirizzi Shielded e condividere tale chiave con il proprio revisore. Il revisore sarà in grado di verificare il saldo di quegli indirizzi e di esaminare la cronologia delle transazioni passate da e verso quegli indirizzi.*

*- Un exchange potrebbe dover effettuare controlli di due diligence su un cliente che effettua depositi da un indirizzo Shielded. L'exchange potrebbe richiedere al cliente la Viewing Key del proprio indirizzo Shielded e utilizzarla per esaminare l'attività delle transazioni Shielded del cliente come parte di queste procedure di due diligence rafforzate.*

### Come trovare la tua Viewing Key

#### zcashd

* Elenca tutti gli indirizzi conosciuti usando *./zcash-cli listaddresses*

* Poi esegui il seguente comando per gli indirizzi Unified Address o Sapling Shielded

  *./zcash-cli z_exportviewingkey "<UA o indirizzo Z>"*

#### Ywallet

* In alto a destra seleziona "Backup", autenticati sul telefono, poi copia semplicemente la Viewing Key visualizzata.

### Come usare la tua Viewing Key

#### zcashd

* Usa il seguente comando con qualsiasi vkey o ukey: 

*./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000*

#### ywallet

* In alto a destra, seleziona "Account", clicca su "+" in basso a destra per aggiungere e importare la tua Viewing Key al tuo account in modalità sola lettura.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* Punta semplicemente il tuo browser [qui](https://zcashblockexplorer.com/vk) e attendi i risultati! Nota: questo risultato è ora sul nodo di zcashblockexplorer e quindi stai affidando queste informazioni ai proprietari di zcashblockexplorer.com

### Risorse

Pur essendo un'ottima tecnologia, si consiglia di usare le Viewing Keys solo quando necessario.

Consulta questo tutorial sulle Viewing Keys. Di seguito trovi un elenco di risorse sull'argomento se vuoi approfondire:

- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
