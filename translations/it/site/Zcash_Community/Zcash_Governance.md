# Panoramica su finanziamento e governance di Zcash

Il modello di finanziamento on-chain di Zcash, la meccanica dei block reward e i ruoli delle principali organizzazioni

## 1. Come funzionano le ricompense di blocco di Zcash

Zcash è una criptovaluta Proof-of-Work. Ogni blocco minato distribuisce il suo **sussidio di blocco** (lo ZEC appena creato) più le commissioni di transazione secondo una regola fissa del protocollo stabilita dagli aggiornamenti di rete.

- **Modello attuale (NU6.1 / dal 24 novembre 2025 in poi)**  
  La distribuzione è:

| Destinatario                   | Percentuale | Cosa finanzia / stato                                                |
|---------------------------------|-------------|----------------------------------------------------------------------|
| Miner                           | 80%         | Ricompensa diretta del blocco ai miner                               |
| Zcash Community Grants (ZCG)    | 8%          | Finanziamenti della comunità (proseguono fino al ~2028)              |
| Fondo controllato dai detentori di monete | 12%    | Alimentato dall'ex lockbox; i detentori di monete votano sui finanziamenti ([ZIP 1016](https://zips.z.cash/zip-1016)) |

- **Fondo di sviluppo storico pre-NU6 (2020 - Nov 2024)**  
  Il 20% di ogni sussidio di blocco andava direttamente alle organizzazioni di sviluppo:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

Questo 20% di "dev fund" è stato sostituito dal modello 8% ZCG + 12% lockbox tramite [ZIP 1015](https://zips.z.cash/zip-1015) (NU6, novembre 2024). Da novembre 2024 a novembre 2025 il 12% si è accumulato nel Deferred Dev Fund Lockbox, senza alcun modo di spenderlo.

### Modello attuale: ZIP 1016 - modello di finanziamento comunitario e dei possessori di monete
ZIP 1016 (creata a febbraio 2025) è stata attivata sulla mainnet da [NU6.1](/zcash-tech/nu6-1) al blocco 3.146.400 il 24 novembre 2025 ([ZIP 255](https://zips.z.cash/zip-0255)). Prevede di:
- Continuare l'assegnazione dell'8% a ZCG.
- Ha convertito il 12% del Lockbox in un "Coinholder-Controlled Fund" (alimentato dai fondi esistenti del Lockbox e dal sussidio di blocco del 12% in corso).
- Resta in vigore fino al terzo halving (il ZIP consente di spostare quella data se NU7 modifica i tempi dei blocchi).
- Permette ai possessori di ZEC di votare sui finanziamenti (maggioranza semplice, minimo di 420.000 ZEC votati).
- Richiede alle Key-Holder Organizations (che attualmente includono ZF e Shielded Labs, con Bootstrap/ECC citate nei contesti di finanziamento) di amministrare le erogazioni tramite multisig, vincolate da accordi legali e decisioni dei possessori di monete.
- Mantiene tutti i requisiti di ZIP 1015 sull'uso del Lockbox (finanziare finanziamenti per l'ecosistema).

Questo modello passa dalla governance controllata dalle organizzazioni a quella diretta dei possessori di monete per l'assegnazione del 12%. Non modifica il processo ZIP né le regole sui marchi.

## 2. Le organizzazioni principali e le loro fonti di finanziamento

**Electric Coin Company (ECC) / Bootstrap Project**  
- Creatori originali di Zcash (2016).  
- Storicamente ha ricevuto circa il 7% del fondo di sviluppo fino a novembre 2024.  
- Nel gennaio 2026, il team principale di ingegneria e prodotto si è dimesso da Bootstrap/ECC a causa di dispute di governance e ha formato lo Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap non riceve più finanziamenti diretti dal protocollo e non impiega più il team di sviluppo principale. Si basa su donazioni, sponsorizzazioni e la propria tesoreria.  
- Mantiene un'importanza storica ma non è più l'organizzazione di sviluppo attiva del protocollo.  
-> Vedi profilo completo: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formato nel gennaio 2026 dagli sviluppatori originali del protocollo Zcash (il team principale di ingegneria e prodotto di ECC) dopo aver lasciato Bootstrap/ECC.  
- Ha raccolto oltre 25 milioni di dollari in finanziamenti seed da importanti investitori tra cui a16z Crypto e Coinbase Ventures.  
- Il team, composto dagli inventori e sviluppatori originali del protocollo Zcash, continua lo sviluppo principale del protocollo, i contributi alle ZIP e gli strumenti focalizzati sulla privacy, incluso il portafoglio mobile Zodl (rinominato da Zashi).  
- Nessun finanziamento diretto on-chain dal protocollo; opera come laboratorio indipendente sostenuto da VC focalizzato sull'avanzamento dell'infrastruttura di privacy di Zcash.  
-> Vedi profilo completo: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)  
-> Sito ufficiale: [zodl.com](https://zodl.com/)
  
**Zcash Foundation (ZF)**  
- Organizzazione non profit indipendente 501(c)(3) focalizzata su infrastruttura, software per nodi, ricerca e salute dell'ecosistema.  
- Storicamente ha ricevuto il 5% del fondo di sviluppo.  
- Non riceve più finanziamenti diretti dal protocollo dopo NU6. Si basa su donazioni e finanziamenti.  
- Detiene il marchio di Zcash (donato da ECC nel 2019) e gioca un ruolo centrale nella governance.  
- Gestisce lo Zcash Community Advisory Panel (ZCAP) e aiuta a facilitare i sondaggi comunitari.  
- Agisce come Key-Holder Organization nell'ambito di ZIP 1016.  
-> Vedi profilo completo: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)  
-> Sito ufficiale: [zfnd.org](https://zfnd.org/)

**Zcash Community Grants (ZCG)**  
- Il programma Zcash Community Grants finanzia team e progetti indipendenti per svolgere importanti attività di sviluppo in corso e altri lavori per il bene pubblico dell'ecosistema di Zcash.  
- I finanziamenti sono decisi da un comitato eletto dalla comunità.  
- Continua a ricevere l'intero 8% dei block reward (post-NU6), amministrato attraverso la Financial Privacy Foundation.  
- I finanziamenti vengono assegnati attraverso un processo trasparente di candidatura e votazione aperto alla comunità.  
-> Vedi profilo completo: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)  
-> Sito ufficiale: [zcashcommunitygrants.org/](https://zcashcommunitygrants.org/)

**Financial Privacy Foundation (FPF)**  
- Un'organizzazione non profit costituita nelle Isole Cayman.  
- Riceve l'8% del sussidio di blocco direttamente dal protocollo (secondo ZIP 1015) e gestisce tutta l'amministrazione legale, finanziaria e operativa per il programma Zcash Community Grants.  
- Fornisce la struttura ombrello e il supporto amministrativo per le operazioni di ZCG, incluse erogazioni, contratti e conformità.  
- ZCG opera come entità autonoma eletta dalla comunità sotto l'ombrello di FPF.  
-> Vedi profilo completo: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)  
-> Sito ufficiale: [financialprivacyfoundation.org/](https://www.financialprivacyfoundation.org/)

**Shielded Labs**  
- Organizzazione indipendente di supporto a Zcash, finanziata da donazioni, con sede in Svizzera.  
- La prima organizzazione nell'ecosistema di Zcash che non ha mai ricevuto finanziamenti diretti o indiretti dal Development Fund o dai block reward.  
- Si concentra su iniziative che beneficiano i possessori di ZEC e dà priorità alla voce dei possessori nel plasmare la direzione di Zcash.  
- Agisce come Key-Holder Organization nell'ambito dello ZIP 1016 per l'amministrazione del Coinholder-Controlled Fund.  
- Contribuisce allo sviluppo del protocollo, al processo ZIP e alla governance (rappresentanza come ZIP editor).  
-> Vedi profilo completo: [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)  
-> Sito ufficiale: [shieldedlabs.net](https://shieldedlabs.net/)

## 3. Governance - come vengono prese le decisioni

La governance di Zcash è un mix di "regole del protocollo on-chain" e "consenso sociale off-chain":

1. **Processo ZIP (Zcash Improvement Proposals)**  
   - Chiunque può inviare una ZIP.  
   - Dibattito pubblico su forum, Discord, GitHub.  
   - Gli attuali editor delle ZIP sono Jack Grigg, Daira-Emma Hopwood e Kris Nuttycombe (a titolo individuale); Arya e Marek (Zcash Foundation); Mark Henderson e Sam H. Smith (Shielded Labs); Sean Bowe e Tal Derei (Project Tachyon); e Dev Ojha (Valar Group).
   - L'approvazione di una ZIP non ne programma automaticamente l'inclusione nel prossimo aggiornamento di rete. Le ZIP di consenso richiedono un piano di distribuzione e un'implementazione, e le loro regole si attivano all'altezza dell'aggiornamento di rete specificata.

2. **Accordo sul Marchio (2019-2024)**  
   - ECC ha donato il marchio di Zcash a ZF nel 2019.  
   - L'accordo originariamente richiedeva il consenso reciproco sia di ECC che di ZF per qualsiasi aggiornamento di rete che creasse un nuovo protocollo di consenso.  
   - Nell'aprile 2024 ECC ha annunciato l'intenzione di terminarlo; la notifica formale di terminazione è stata emessa ad agosto 2024.  
   - A partire dal 2025, ZF è l'unico custode del marchio di Zcash e ha adottato una nuova politica permissiva sui marchi che riflette la decentralizzazione dell'ecosistema. Il marchio non funge più da meccanismo di veto sulla governance.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Gruppo di volontari esperti dell'ecosistema.  
   - Utilizzato per sondaggi comunitari non vincolanti su decisioni importanti.

4. **Ratifica on-chain**  
   - Gli aggiornamenti di rete si attivano a un'altezza di blocco prestabilita. I nodi che eseguono un software compatibile applicano le nuove regole di consenso a partire da quell'altezza. I nodi che non si aggiornano potrebbero continuare a seguire un ramo di consenso precedente all'aggiornamento, con il possibile risultato di una divisione della chain.

5. **Il lockbox e ZIP 1016**  
   - I fondi del lockbox al 12% si sono accumulati nel protocollo da novembre 2024 a novembre 2025.  
   - NU6.1 li ha convertiti nel Coinholder-Controlled Fund, con votazione dei possessori di monete e amministrazione multisig da parte delle Key-Holder Organizations (attualmente indicate ZF e Shielded Labs).

## 4. Tabella di riferimento rapido - evoluzione del finanziamento

| Periodo           | Miner | ECC/Bootstrap | ZF | ZCG | Lockbox               | Nota                                                       |
|-------------------|----------|---------------|-----|-----|------------------------|------------------------------------------------------------|
| 2020 - Nov 2024   | 80%      | 7%            | 5%  | 8%  | -                      | Fondo di sviluppo classico                                 |
| Nov 2024 - Nov 2025 | 80%    | 0%            | 0%  | 8%  | 12%                    | Modello NU6 + estensione ZCG                               |
| Nov 2025 - oggi (ZIP 1016) | 80% | 0%       | 0%  | 8%  | 12% (Coinholder-Controlled) | NU6.1; fino al 3° halving; votazione dei possessori di monete |

## 5. Risorse correlate

- Spiegazione ufficiale del finanziamento -> [sezione finanziamento di z.cash](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (modifica finanziamento NU6) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- ZIP 1016 (modello dei possessori di monete, attivo da NU6.1) -> [zips.z.cash/zip-1016](https://zips.z.cash/zip-1016)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Portale Zcash Community Grants -> [zcashcommunitygrants.org](https://zcashcommunitygrants.org)

## 6. Dashboard del Lockbox

La dashboard di ZecHub mostra la quantità attuale di ZEC nel Lockbox e nel fondo dei possessori di monete [qui](https://zechub.wiki/dashboard?tab=lockbox).
