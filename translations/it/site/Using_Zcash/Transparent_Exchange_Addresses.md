# Cosa Sono gli Indirizzi TEX di Zcash?

Gli indirizzi TEX di Zcash rappresentano un tipo unico di indirizzo di ricezione. Acronimo di indirizzo "Transparent Exchange", si tratta di una codifica **unica**, di tipo Unified (bech32m) di un singolo indirizzo Transparent p2pkh.

Il suo unico scopo è informare un portafoglio compatibile di effettuare una transazione Solo-Transparent (T -> T).

La logica è la seguente: Quando rileva un indirizzo TEX, un portafoglio compatibile lo decodifica per ottenere il destinatario Transparent in esso contenuto. Il portafoglio invia quindi i fondi necessari per la transazione dal pool Shielded a un indirizzo Transparent separato, effimero e controllato dall'utente (Z -> T). Successivamente invia quei fondi al destinatario Transparent decodificato dell'indirizzo TEX (T -> T).

La proposta tecnica per gli indirizzi TEX è delineata in Zcash [ZIP 320](https://zips.z.cash/zip-0320), che definisce un tipo di indirizzo esclusivamente per ricevere fondi da indirizzi Transparent.

![TEX](https://i.ibb.co/8m7HPqV/ZashiTex.png)


Sebbene gli indirizzi TEX non siano ancora ampiamente adottati, gli utenti di Zcash potrebbero doverli utilizzare prima o poi.

## Quando Ho Bisogno di un Indirizzo TEX

### Hai **bisogno** di un indirizzo TEX quando invii fondi a un indirizzo Transparent utilizzando un portafoglio che non supporta l'invio diretto a un indirizzo Transparent.
Alcuni portafogli semplicemente non consentono di inviare direttamente a un indirizzo Transparent e **il destinatario potrebbe non fornire un equivalente TEX**. Quindi, a volte potrebbe essere necessario **convertire** un indirizzo Transparent in uno TEX. Ciò può essere fatto manualmente eseguendo l'implementazione di riferimento descritta in zip-320. Un'istanza ospitata di un **Convertitore da Transparent a TEX** è disponibile [QUI](https://690e9524c66a3ecac5d54eff--jade-brioche-873777.netlify.app/).

### Hai bisogno di un indirizzo TEX quando invii fondi a un exchange centralizzato che **RICHIEDE che quei fondi provengano da una fonte Transparent**.
Attualmente, [Binance](https://www.binance.com/) è l'unico exchange centralizzato che utilizza indirizzi TEX (ed è il motivo principale della loro creazione).
Gli indirizzi TEX informano un portafoglio compatibile che tutti i fondi inviati a quell'indirizzo devono essere trasparenti ed escludono qualsiasi valore shielded dall'essere inviato a tale indirizzo.
Se un exchange come Binance rifiuta il valore inviato, dispone dei mezzi necessari per restituire tale valore all'indirizzo da cui proviene. Aiuta inoltre entità come Binance a conformarsi alle leggi e ai regolamenti imposti dai governi o da altre autorità.


## Quali Portafogli Supportano gli Indirizzi TEX?

Puoi consultare l'elenco più aggiornato sulla nostra pagina [portafogli](https://zechub.wiki/wallets). Usa il **Filtro indirizzi TEX**.
