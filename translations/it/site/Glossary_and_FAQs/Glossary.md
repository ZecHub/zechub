<a href="https://github.com/zechub/zechub/edit/main/site/Glossary_and_FAQs/Glossary.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Glossario

Cerca un termine che hai incontrato in una nota di rilascio, in una discussione del forum o nel changelog di un portafoglio. Le voci sono brevi e rimandano alla pagina più completa, quando disponibile.

Per le domande anziché i termini, consulta le [FAQ](/glossary-and-faqs/faq).

---

### Crosslink

Un progetto di consenso ibrido proposto che eseguirebbe la proof of stake insieme all'attuale proof of work di Zcash. Shielded Labs guida il lavoro e mantiene un prototipo nel repository `zebra-crosslink`. Crosslink non fa parte di Zcash oggi.

[Protocollo Crosslink](/zcash-tech/crosslink-protocol)

### Ironwood

Aggiornamento di rete NU6.3, attivo su mainnet dal blocco 3.428.143 del 28 luglio 2026. Ironwood aggiunge una nuova pool schermata basata sul circuito Orchard corretto e sigilla la pool Orchard originale, così chiunque può verificare che l'offerta circolante sia onesta. Le sue regole di consenso sono specificate nella [ZIP 258](https://zips.z.cash/zip-0258).

[Ironwood](/zcash-tech/ironwood)

### Meccanismo di sostenibilità della rete

Un insieme di proposte per continuare a finanziare la rete mentre la ricompensa del blocco diminuisce, uniformando l'emissione e rimuovendo ZEC dalla circolazione anziché emetterne di più. Tre ZIP lo coprono: [233](https://zips.z.cash/zip-0233), [234](https://zips.z.cash/zip-0234) e [235](https://zips.z.cash/zip-0235). Tutte e tre sono ancora in stato di bozza.

### Orchard

La pool schermata introdotta in NU5. Ironwood l'ha sigillata dopo la scoperta di un bug di solidità, quindi non puoi più inviare o ricevere all'interno di Orchard. I fondi possono uscire solo attraverso il turnstile (tornello).

[Pool schermate](/using-zcash/shielded-pools)

### Progetto Tachyon

Un aggiornamento di scalabilità proposto guidato dal cofondatore di Zcash Sean Bowe. Aggrega le transazioni usando dati con prova incorporata e riduce aggressivamente lo stato dei validatori, così la chain può crescere senza che ogni validatore cresca con essa. Tachyon è una proposta, non codice distribuito.

[Progetto Tachyon](/zcash-tech/project-tachyon)

### Turnstile (tornello)

Il checkpoint contabile attraverso cui passa il valore quando si sposta da una pool schermata a un'altra. Una pool non può mai rilasciare più di quanto vi sia entrato in modo dimostrabile, ed è così che Ironwood mantiene eventuali ZEC contraffatti contenuti all'interno di Orchard.

[Il turnstile](/zcash-tech/the-turnstile)

### Unified address

Un singolo indirizzo che riunisce diversi tipi di ricevitore, così un portafoglio mittente sceglie il migliore supportato da entrambi i portafogli. Specificato nella [ZIP 316](https://zips.z.cash/zip-0316).

[Indirizzi unificati](/zcash-tech/unified-addresses)

### Stack Z3

I tre programmi che insieme sostituiscono zcashd: Zebra per il nodo, Zaino per l'indicizzazione, Zallet per il portafoglio.

[Stack Z3](/zcash-tech/z3-stack)

### Zaino

Un indicizzatore che fornisce dati del portafoglio da un nodo Zebra, scritto in Rust da Zingo Labs. Si fa carico del lavoro di indicizzazione che zcashd svolgeva per i portafogli leggeri.

[Zaino](/zcash-tech/zaino)

### Zakura

Un full node (nodo completo) Zcash separato creato per la scalabilità, guidato da Sean Bowe e Dev Ojha. Si sincronizza più rapidamente, riduce i blocchi in modo nativo e può eseguire zcashd sopra di sé per il software che ne dipende ancora.

[Nodo Zakura](/zcash-tech/zakura-node)

### Zallet

Il portafoglio che sostituisce il portafoglio zcashd. Trasferisci un `wallet.dat` esistente invece di ricominciare da zero.

[Zallet](/zcash-tech/zallet) e il riferimento rapido di [Zallet](/using-zcash/zallet-quick-reference-guide)

### Zcash Shielded Assets

Asset personalizzati emessi all'interno della pool schermata di Zcash, così si spostano con la stessa privacy di ZEC. Le regole di trasferimento e distruzione sono specificate nella [ZIP 226](https://zips.z.cash/zip-0226), ancora in stato di bozza.

[Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets)

### zcashd

Il full node e portafoglio originale di Zcash, ora ritirato. La versione 6.20.0 si è arrestata al blocco 3417100 il 18 luglio 2026 e non ha mai supportato NU6.3. Esegui invece lo stack Z3 o Zakura.

[Guida alla migrazione](/guides/migration-guide-zcashd-to-zebrad-zallet)

### Zebra

Il full node che sostituisce zcashd, gestito da Zcash Foundation. Eseguilo se ti serve un nodo validatore.

[Zebra full node](/zcash-tech/zebra-full-node)

### ZIP

Proposta di miglioramento di Zcash. Gli ZIP sono i documenti numerati che specificano le modifiche al protocollo. Bozza significa proposta, non distribuita.

| ZIP | Titolo | Stato |
|-----|-------|--------|
| [218](https://zips.z.cash/zip-0218) | Spaziatura obiettivo dei blocchi di 25 secondi | Bozza |
| [226](https://zips.z.cash/zip-0226) | Trasferimento e distruzione di Zcash Shielded Assets | Bozza |
| [233](https://zips.z.cash/zip-0233) | Meccanismo di sostenibilità della rete: rimozione di fondi dalla circolazione | Bozza |
| [234](https://zips.z.cash/zip-0234) | Meccanismo di sostenibilità della rete: uniformazione dell'emissione | Bozza |
| [235](https://zips.z.cash/zip-0235) | Rimuovere dalla circolazione il 60% delle commissioni di transazione | Bozza |
| [316](https://zips.z.cash/zip-0316) | Indirizzi unificati e chiavi di visualizzazione unificate | Attiva, revisioni successive in stato di bozza |
| [317](https://zips.z.cash/zip-0317) | Meccanismo di commissione di trasferimento proporzionale | Attiva, revisioni successive in stato di bozza |

L'elenco completo è disponibile su [zips.z.cash](https://zips.z.cash/).

---

**Ultimo aggiornamento:** ottobre 2026
**Vuoi contribuire?** [Modifica questa pagina su GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Glossary.md)
