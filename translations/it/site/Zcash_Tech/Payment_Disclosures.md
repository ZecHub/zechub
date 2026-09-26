<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Prova di pagamento schermata e comunicazioni di pagamento

## In breve

- Un ID transazione identifica una transazione, ma non rivela un destinatario schermato, un importo o un memo.
- Una comunicazione di pagamento è progettata per consentire al mittente di provare dettagli selezionati di un pagamento senza esporre il resto della cronologia del proprio wallet.
- Una viewing key concede accesso continuativo in lettura a un indirizzo o account. Usala per audit continuativi, non per una contestazione relativa a un singolo pagamento.
- Una comunicazione di pagamento non può provare la consegna di beni, identificare da sola una persona, annullare un pagamento o sostituire i controlli di conferma.
- [ZIP 311](https://zips.z.cash/zip-0311) è ancora una **Bozza**. Il testo attuale lascia incompleti il supporto per Orchard, gli input trasparenti, la codifica, il versionamento e le regole dell'interfaccia utente.

## Perché un ID transazione non è sufficiente

Chiunque può ispezionare i dettagli pubblici di un pagamento Zcash trasparente. Un block explorer può mostrarne gli indirizzi, gli importi e lo stato delle conferme.

Un pagamento schermato funziona diversamente. La chain dimostra che la transazione ha rispettato le regole di Zcash, ma non pubblica il mittente schermato, il destinatario, l'importo o il memo. Condividere l'ID transazione può mostrare che una transazione è stata minata, ma non può dimostrare a un commerciante o a terzi quale pagamento privato contenesse.

Questo crea un problema pratico. Un cliente potrebbe dover risolvere una controversia con un commerciante, un exchange potrebbe dover dimostrare di aver elaborato un prelievo, oppure un donatore potrebbe voler provare un singolo contributo. Condividere una viewing key completa rivelerebbe molto più di quanto richiesto da ciascuno di questi casi.

[ZIP 311: Zcash Comunicazioni di pagamento](https://zips.z.cash/zip-0311) propone una risposta più circoscritta: divulgare e autenticare informazioni selezionate di una sola transazione.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Come funziona una comunicazione di pagamento

Il flusso di base è:

1. Il verificatore fornisce al mittente una sfida o un riferimento univoco, quando è appropriata una prova interattiva.
2. Il mittente seleziona la transazione e l'output o gli output schermati da divulgare.
3. Un software wallet compatibile crea una comunicazione di pagamento collegata a quella transazione e, facoltativamente, alla sfida.
4. Il mittente consegna la comunicazione al verificatore.
5. Il verificatore ottiene la transazione reale da un nodo Zcash affidabile, controlla che sia stata minata e verifica la comunicazione rispetto a essa.
6. Un risultato valido conferma solo le dichiarazioni contenute in quella comunicazione.

Il design di ZIP Sapling utilizza una chiave di cifratura in uscita per recuperare ogni output selezionato. Ciò può rivelare il destinatario dell'output, l'importo e il memo. Richiede inoltre la prova dell'autorità di spesa per almeno un input della transazione, così una persona che si limita a vedere la transazione non può creare una comunicazione valida come se l'avesse inviata.

Una comunicazione di pagamento Sapling non deve necessariamente rivelare un indirizzo del mittente. L'autorità di spesa può controllare molti indirizzi diversificati, quindi dimostrare il controllo della spesa non identifica automaticamente un singolo indirizzo. ZIP 311 include una prova facoltativa dell'indirizzo per i casi in cui sia necessario collegare la prova a un indirizzo mittente noto.

## Comunicazione di pagamento o viewing key?

| Metodo | Uso migliore | Cosa rivela | Accesso continuativo? | Legato crittograficamente al pagamento? |
| --- | --- | --- | --- | --- |
| Transaction ID | Verificare che una transazione sia stata minata | Dati pubblici della transazione e conferme | No | Sì, ma i dettagli del pagamento schermato restano nascosti |
| Screenshot or receipt | Conservazione informale dei documenti | Qualunque cosa il mittente scelga di mostrare | No | No; l'immagine può essere modificata |
| Payment disclosure | Provare dettagli selezionati di un pagamento | Output selezionati della transazione ed eventuale prova del mittente o della sfida inclusa | No, ma la prova condivisa può essere copiata | Sì |
| Incoming Viewing Key | Monitorare i pagamenti ricevuti da un account | Attività in entrata coperta dalla chiave | Sì | Decifra i pagamenti in entrata corrispondenti |
| Full Viewing Key | Contabilità o audit di un account | Attività in entrata e in uscita, importi, memo e saldi coperti dalla chiave | Sì | Decifra l'attività dell'account corrispondente |

Usa la divulgazione più limitata che risponda alla domanda. Una controversia con un commerciante relativa a un pagamento non giustifica normalmente l'accesso a tutti i pagamenti di un account. Un contabile che deve esaminare un intero periodo di rendicontazione potrebbe invece aver bisogno di una viewing key.

Nessuno dei due metodi concede l'autorizzazione a spendere. Non condividere mai una seed phrase, una chiave di spesa, una chiave privata o un backup del wallet come prova di pagamento.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Cosa posso usare oggi?

Nessun wallet attuale è qui indicato come implementazione della creazione o verifica di comunicazioni di pagamento ZIP 311. La ZIP rimane una bozza e indica la sua implementazione di riferimento come "TBD". I seguenti strumenti mantenuti possono comunque aiutare il mittente, il destinatario o un revisore autorizzato a ispezionare i registri disponibili oggi:

| App | Utile oggi per | Limite importante |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Visualizzare metadati dettagliati delle transazioni, importi, input e output dei pool e memo; importare viewing key Unified o Sapling in account di sola visualizzazione | Non dichiara di supportare la creazione o verifica di comunicazioni ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Esaminare la cronologia delle transazioni schermate e i memo; importare una Full Viewing Key Unified in modalità di sola lettura | Un record del wallet o un account di sola lettura non è una comunicazione di pagamento con ambito selettivo |
| [Zallet](https://zcash.github.io/zallet/) | Flussi di lavoro degli operatori che utilizzano `z_viewtransaction`, `z_exportviewingkey` e `z_importviewingkey` | Software beta; le sue RPC per viewing key e transazioni hanno un ambito più ampio o riguardano record locali, non prove ZIP 311 |

Usa prima il wallet che ha inviato o ricevuto il pagamento. Controlla i dettagli della transazione, il memo, l'ID transazione e le conferme, quindi chiedi all'altra parte di confrontare tali dettagli con i propri registri. Non installare un nuovo wallet né inserire una seed phrase soltanto per produrre prove. Se un revisore necessita di visibilità continuativa, considera un account di sola visualizzazione compatibile e comprendi l'ambito della viewing key prima di condividerla.

Queste app sono alternative pratiche per controllare i registri, non una prova che sia disponibile una comunicazione di pagamento standardizzata. Uno screenshot può aiutare le persone a confrontare i registri, ma è modificabile e non costituisce una prova crittografica.

## Dove si applicano le comunicazioni di pagamento

### Controversie con commercianti

Un cliente potrebbe provare che un importo specifico è stato inviato all'indirizzo schermato del commerciante. La prova non stabilisce che i beni siano stati consegnati, che sia dovuto un rimborso o che la persona che la presenta abbia una particolare identità legale. Queste questioni dipendono comunque dal record dell'ordine e dall'accordo tra le parti.

### Prelievi schermati

ZIP 311 elenca i prelievi schermati come caso d'uso previsto: un exchange dimostrerebbe il destinatario e l'importo senza pubblicare tali dettagli on-chain. La sua prova degli input trasparenti è ancora incompleta, quindi questo non è ancora un flusso di lavoro standardizzato completo. Il cliente deve inoltre controllare indipendentemente lo stato delle conferme della transazione.

### Donazioni

Un donatore o una campagna potrebbe provare un contributo particolare lasciando privati i pagamenti non correlati. Pubblicare la comunicazione rende i dettagli selezionati pubblici per chiunque riceva una copia, quindi un canale di verifica privato è più sicuro quando una prova pubblica non è necessaria.

### Contabilità

Usa una comunicazione di pagamento quando un contabile necessita di prove per una sola transazione. Usa la viewing key idonea più limitata quando il contabile necessita di accesso continuativo a molte transazioni o a un intero periodo di rendicontazione.

## Un flusso di lavoro sicuro per la privacy

ZIP 311 non è ancora uno standard per wallet completo e ampiamente distribuibile. Quando saranno disponibili strumenti compatibili per mittente e verificatore, usa questa checklist:

1. **Conferma prima la compatibilità.** Entrambi gli strumenti devono supportare lo stesso formato di comunicazione e il pool schermato usato dal pagamento.
2. **Risolvi prima i problemi ordinari.** Controlla la sincronizzazione del wallet, l'ID transazione, il numero di conferme, lo stato di scadenza e i registri del destinatario prima di rivelare dettagli privati.
3. **Richiedi una sfida.** Per una controversia, il verificatore dovrebbe fornire un numero d'ordine recente o una sfida casuale affinché la comunicazione sia collegata a quella richiesta.
4. **Seleziona solo l'output necessario.** Non includere output non correlati della stessa transazione.
5. **Visualizza in anteprima ogni campo rivelato.** Controlla il destinatario, l'importo, il memo, la prova dell'indirizzo mittente e la sfida prima dell'esportazione.
6. **Condividi tramite un canale privato.** Una comunicazione non è una chiave segreta di spesa, ma chiunque la riceva può conservare o ridistribuire le informazioni che rivela.
7. **Verifica rispetto alla chain.** Il verificatore deve recuperare la transazione esatta da un nodo affidabile, confermare che si trovi nella rete e nel blocco previsti, quindi convalidare la comunicazione.
8. **Registra il risultato, non altri segreti.** Conserva soltanto ciò che richiede il processo di controversia, prelievo, donazione o contabilità.

Se il wallet non può generare una comunicazione, non sostituirla con una viewing key completa senza comprenderne l'ambito più ampio e permanente. Chiedi se il destinatario può confermare il pagamento dai propri record del wallet o accettare invece un record meno sensibile.

## Cosa non prova una comunicazione valida

Una verifica riuscita non prova:

- Che la transazione abbia sufficienti conferme per la politica di rischio del verificatore
- Che una riorganizzazione della chain non possa rimuovere una transazione recente
- Che beni o servizi siano stati consegnati
- Che sia richiesto un rimborso o uno storno
- Che il mittente controlli un indirizzo particolare, salvo sia inclusa un'appropriata prova dell'indirizzo
- Che la persona che presenta la comunicazione abbia una presunta identità reale
- Che gli output non divulgati, altre transazioni o il saldo del wallet abbiano un valore particolare
- Che la comunicazione rimanga privata dopo essere stata condivisa

Il verificatore deve controllare separatamente l'inclusione nella chain e lo stato delle conferme. La procedura di verifica di ZIP 311 presuppone che il chiamante abbia già ottenuto la transazione minata e l'altezza del suo blocco.

## Limitazioni attuali

Considera ZIP 311 come uno standard proposto, non come la promessa che un wallet attuale disponga di un pulsante **Prova pagamento** funzionante.

La bozza attualmente specifica spese e output Sapling, ma contiene ancora elementi incompleti per Orchard, gli input trasparenti, la codifica della comunicazione, il versionamento e il modo in cui i wallet dovrebbero mostrare i diversi livelli di validità. Anche la sua implementazione di riferimento è indicata come "TBD". Così com'è scritto, non definisce comunicazioni di pagamento per pagamenti Orchard o Ironwood.

Il mittente potrebbe inoltre non essere in grado di divulgare un output se la transazione è stata deliberatamente creata senza una viewing key in uscita per quell'output. ZIP 311 preserva questa scelta di privacy invece di creare un nuovo percorso di recupero.

La documentazione meno recente descrive i comandi sperimentali `z_getpaymentdisclosure` e `z_validatepaymentdisclosure` in `zcashd`. Tali comandi supportavano **solo output Sprout JoinSplit**, non il design Sapling in ZIP 311, ed erano deprecati. `zcashd` ha raggiunto l'arresto finale di fine supporto nel luglio 2026. Non utilizzare quella guida legacy come istruzioni per fondi attuali.

Queste lacune non rendono inutile l'idea. Spiegano perché una guida attenta debba distinguere il modello di privacy e i casi d'uso dal software pronto per gli utenti comuni.

## FAQ

### Posso provare un pagamento schermato con il solo ID transazione?

No. L'ID può identificare la transazione e il suo stato di conferma, ma il destinatario schermato, l'importo e il memo non sono pubblici.

### Una comunicazione di pagamento è uguale a una viewing key?

No. Una comunicazione è limitata ai dettagli selezionati di una transazione. Una viewing key può rivelare nel tempo l'attività corrispondente per un indirizzo o account.

### Il destinatario può creare la prova del mittente?

Non secondo il design di ZIP 311. Una comunicazione valida deve dimostrare l'autorità di spesa per almeno un input. Il destinatario può confermare un pagamento usando i propri record del wallet, ma si tratta di una dichiarazione diversa.

### Posso revocare una comunicazione dopo averla condivisa?

No. Non concede accesso futuro all'account come una viewing key, ma i dati e la prova rivelati possono essere copiati. Condividila con la stessa cautela riservata a qualsiasi record finanziario privato.

### La verifica sposta o blocca dei ZEC?

No. Creare o verificare una comunicazione non spende, rimborsa, congela né annulla fondi.

### Cosa dovrei usare oggi se il mio wallet non dispone di una funzione di comunicazione?

Inizia dai record del wallet del destinatario, dall'ID transazione e dallo stato delle conferme, da un riferimento alla fattura nel memo cifrato o da un'altra ricevuta accettata reciprocamente. Usa una viewing key solo quando il suo ambito più ampio è realmente necessario e compreso.

## Risorse

- [ZIP 311: Zcash Comunicazioni di pagamento](https://zips.z.cash/zip-0311) - il design in bozza, i requisiti, il processo di verifica e le considerazioni sulla privacy
- [ZIP 310: Proprietà di sicurezza delle Sapling Viewing Keys](https://zips.z.cash/zip-0310) - cosa rivelano le viewing key e quali garanzie offrono
- [ZIP 304: Sapling Firme degli indirizzi](https://zips.z.cash/zip-0304) - il meccanismo facoltativo di prova dell'indirizzo citato da ZIP 311
- [Zcash specifica del protocollo](https://zips.z.cash/protocol/protocol.pdf) - cifratura delle note Sapling, viewing key in uscita e autorizzazione di spesa
- [Documento archiviato sulle comunicazioni di pagamento zcashd](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - implementazione storica solo Sprout, non una guida attuale
- [zcashd funzionalità deprecate](https://zcash.github.io/zcash/user/deprecation.html) - stato dei vecchi comandi sperimentali per le comunicazioni

## Pagine correlate

- [Transazioni](/using-zcash/transactions) - pagamenti schermati, conferme e risoluzione dei problemi delle transazioni
- [Viewing keys](/zcash-tech/viewing-keys) - accesso continuativo di sola lettura e opzioni di esportazione attuali
- [Cosa può vedere un block explorer](/zcash-tech/what-a-block-explorer-can-see) - campi di transazione pubblici e privati
- [Conservare i registri con ZEC schermati](/zcash-use-cases/keeping-records-with-shielded-zec) - contabilità senza pubblicare la cronologia del wallet
