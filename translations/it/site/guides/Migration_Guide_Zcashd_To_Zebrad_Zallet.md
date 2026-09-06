# Guida alla migrazione: da zcashd a Zebrad/Zallet

Il tradizionale nodo completo zcashd, mantenuto da *Electric Coin Company (ECC)* / *Zodl*, è stato sostituito da Zebra e Zallet. zcashd ha raggiunto il termine del supporto il 18 luglio 2026 e non è più in esecuzione.

- Zebra è una moderna implementazione in Rust del protocollo Zcash sviluppata dalla Zcash Foundation
- Zallet è un wallet leggero progettato per interfacciarsi perfettamente con i nodi Zebra sviluppati da Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagramma: zcashd si divide in zebrad per le funzioni del nodo e Zallet per le funzioni del wallet](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Questa guida ti accompagna nella migrazione da **Zcashd** a **Zebrad** e **Zallet**, inclusi configurazione, importazione del wallet e risoluzione dei problemi di migrazione più comuni.

---

## zcashd ha smesso di funzionare il 18 luglio 2026

**Cosa significa**

- zcashd ha raggiunto il termine del supporto il 18 luglio 2026. Non si sincronizzerà più con la punta della catena e non può inviare né ricevere fondi. È già concluso, non pianificato.
- I due compiti di zcashd sono ora separati: **zebrad** è il nodo completo e **Zallet** è il wallet.
- Zallet è in **beta**. Possono verificarsi modifiche incompatibili tra le versioni e alcuni metodi JSON-RPC di zcashd non sono ancora implementati. Consulta la [matrice dello stato dei metodi](https://zcash.github.io/zallet/) prima di fare affidamento su una chiamata specifica.
- Se possiedi ancora fondi **Sprout**, leggi prima l'avvertenza nel passaggio 6. Zallet non supporta il pool Sprout e il modo abituale per spostare quei fondi richiedeva un zcashd in esecuzione.

**Perché migrare - Oltre la deprecazione**

Anche tralasciando la deprecazione, ci sono motivi validi per effettuare il passaggio:
- Sicurezza e robustezza: la sicurezza della memoria di Rust e gli strumenti moderni riducono i rischi di vulnerabilità.
- Prestazioni ed efficienza: Zebrad è progettato per il parallelismo, un uso più efficiente delle risorse e una sincronizzazione più rapida.
- Architettura modulare: separare la logica del nodo (Zebrad) dall'interfaccia del wallet (Zallet) offre confini più chiari e percorsi di aggiornamento migliori.
- Compatibilità con l'ecosistema futuro: strumenti, miglioramenti e il resto dell'ecosistema Zcash si orienteranno sempre più verso Zebrad/Zallet.
- Tranquillità: evita di ritrovarti a eseguire un componente deprecato e non supportato.

### Ora approfondiamo la guida alla migrazione

**1. Esegui il backup di tutto**
* Esegui il backup del tuo wallet.dat (o di qualsiasi altro file wallet / archivio di chiavi) dal tuo nodo zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Salva il tuo zcash.conf e tutte le impostazioni personalizzate.
* Esporta una copia di eventuali script RPC o automazioni che utilizzi.
* Verifica che i backup siano validi (ad es. prova ad aprirli o ispezionarli in un altro ambiente).
* Esamina i metodi JSON-RPC su cui fai attualmente affidamento.
* Confrontali con la tabella di compatibilità pianificata mantenuta sul [sito di supporto Zcash](https://z.cash/support/zcashd-deprecation/) 
* Preparati a modifiche o metodi mancanti (alcuni potrebbero richiedere soluzioni alternative o adattamenti).

**2. Requisiti di sistema e spazio su disco**
* Lo spazio su disco è il requisito che le persone sottovalutano. La catena Zcash ha superato i **270 GB** nell'agosto 2026, quindi prevedi almeno **300 GB** di spazio libero, preferibilmente su un SSD.
* Assicurati che la tua macchina disponga di rete, CPU e RAM stabili.
* Una connessione Internet 
* Se intendi compilare dai sorgenti, assicurati di avere Rust e Cargo installati.

**3. Installa / configura Zebrad**
Puoi scaricare un binario precompilato oppure compilare dai sorgenti.
* La Zcash Foundation pubblica release e binari per Zebra. Ad esempio, potresti usare uno script di installazione o scaricare il binario appropriato per il tuo sistema operativo.

* Nota che nelle versioni recenti di Zebra, [l'endpoint RPC non è più abilitato per impostazione predefinita in Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opzione A: installazione tramite binario precompilato**  
Su **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Questo installa l'ultima versione stabile di zebrad.

**Opzione B: compilazione dai sorgenti**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Dopo la compilazione, sposta il binario nel tuo path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configurazione e avvio**  
Genera una configurazione predefinita:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Modifica **zebrad.toml** secondo le tue preferenze (indirizzo di ascolto, porte, directory dello stato, caching).

**Avvia il nodo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Il nodo inizierà la sincronizzazione dalla genesi: prevedi diverse ore (o più), a seconda dell'hardware e della rete.

**5. Installa / configura Zallet (wallet)**

Zallet è progettato per sostituire la componente wallet di zcashd.

Consulta la pagina GitHub / delle release di Zallet per i binari.

**Oppure compila dai sorgenti:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Avvia la GUI o la CLI (in base a quanto previsto dalla tua installazione).
* Configurala per connettersi al tuo nodo Zebrad locale tramite RPC o endpoint API.

**6. Importazione del tuo wallet zcashd in Zallet**

Non è necessario avere zcashd in esecuzione. Zallet legge direttamente il file `wallet.dat`, aspetto importante poiché zcashd non può più essere avviato.

> **Conserva `wallet.dat`.** La migrazione segnala tutto ciò che non può rappresentare in un wallet Zallet invece di importarlo, e quel materiale delle chiavi esiste quindi solo in `wallet.dat`. Non eliminarlo dopo la migrazione.

Esegui prima `zallet init-wallet-encryption`. Zallet cifra il materiale delle chiavi con un'identità age, e tale identità deve esistere prima che qualsiasi chiave venga importata.

Quindi converti la tua configurazione e il tuo wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` è presente solo nelle build con la funzionalità `zcashd-import`, e la lettura di `wallet.dat` richiede l'utilità `db_dump` di Berkeley DB 6.2, la versione utilizzata da zcashd. Se hai più di un file wallet, esegui il comando una volta per ciascun file e aggiungi `--allow-multiple-wallet-imports` nelle esecuzioni successive; ognuno diventerà il proprio insieme di account. Il tuo `rpcuser` e `rpcpassword` non vengono trasferiti, perché il JSON-RPC di Zallet utilizza per impostazione predefinita l'autenticazione tramite cookie; aggiungi credenziali con `zallet add-rpc-user` se ne hai bisogno.

**Cosa viene trasferito**

* Seed mnemonici e le chiavi derivate da essi, con gli account ricostruiti per corrispondere al wallet zcashd
* Chiavi di spesa Sapling importate separatamente e chiavi trasparenti
* Voci trasparenti di sola visualizzazione che includono la loro chiave pubblica o redeem script
* Date di nascita degli account, affinché la scansione della catena inizi all'altezza corretta

**Cosa non viene trasferito.** Questi elementi vengono segnalati con conteggi anziché importati:

* **Chiavi di spesa e fondi Sprout.** Zallet non supporta il pool Sprout. Il percorso documentato prevedeva di spostare i fondi Sprout usando zcashd prima di ritirarlo, e ciò non è più possibile. Se questo ti riguarda, chiedi nel [Discord Zcash R&D](https://discord.gg/xpzPR53xtU) o nel [forum della comunità](https://forum.zcashcommunity.com/) prima di fare qualsiasi altra cosa.
* Voci della rubrica
* Voci di sola visualizzazione archiviate senza una chiave pubblica o redeem script, e voci con chiavi pubbliche non compresse
* Wallet Regtest

**Backup successivo.** Una mnemonica da sola non è un backup completo, perché le chiavi importate esistono solo nel database del wallet. Conserva copie sicure di `wallet.db`, del file di identità per la cifratura age indicato dall'opzione `keystore.encryption_identity` e della tua frase mnemonica, e conserva il `wallet.dat` originale. Nota che `wallet.db` non è esso stesso cifrato: contiene la cronologia delle transazioni e le chiavi di visualizzazione in chiaro, quindi archivia il backup in un luogo sicuro.

**Riscansione e sincronizzazione del wallet**

* Una volta importate le chiavi, Zallet attiverà una riscansione della catena tramite Zebrad.
* Concedi a Zallet il tempo necessario per ricostruire il tuo saldo e la cronologia delle transazioni.

**7. Verifica dei saldi e sincronizzazione**

Una volta importato, Zallet si connetterà al tuo nodo Zebrad e rieseguirà la scansione della blockchain.
Al completamento della sincronizzazione, i tuoi saldi e le tue transazioni dovrebbero apparire esattamente come prima.

Puoi verificare lo stato di sincronizzazione del tuo nodo eseguendo:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Oppure controlla i log.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Risoluzione dei problemi**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Problema</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Possibile causa</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Soluzione</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad non si avvia</td>
        <td className="px-6 py-4">Porta in uso o configurazione errata</td>
        <td className="px-6 py-4">Controlla **zebrad.toml** e usa una porta libera</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Sincronizzazione lenta</td>
        <td className="px-6 py-4">Congestione della rete</td>
        <td className="px-6 py-4">Assicurati di avere una connessione Internet stabile, riavvia Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Al wallet mancano delle transazioni</td>
        <td className="px-6 py-4">Importazione parziale delle chiavi</td>
        <td className="px-6 py-4">Reimporta le chiavi o riesegui la scansione in Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet non riesce a connettersi al nodo</td>
        <td className="px-6 py-4">Nodo non in esecuzione o endpoint errato</td>
        <td className="px-6 py-4">Avvia Zebrad e verifica la porta RPC corretta</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet si arresta in modo anomalo</td>
        <td className="px-6 py-4">Build obsoleta</td>
        <td className="px-6 py-4">Aggiorna all'ultima release da GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusione**

La migrazione da zcashd a Zebrad e Zallet ti offre un'esperienza Zcash più veloce, sicura e moderna.
Grazie alla sicurezza basata su Rust, al design modulare e a strumenti migliori, questa configurazione assicura che il tuo nodo e il tuo wallet siano pronti per il futuro mentre l'ecosistema Zcash continua a evolversi.

Suggerimento: conserva le chiavi del tuo wallet offline ed esegui regolarmente il backup dei dati Zallet.
Visita [zebra.zfnd.org](https://zebra.zfnd.org) per Zebra e [The Zallet Book](https://zcash.github.io/zallet/) o il [repository di Zallet](https://github.com/zcash/zallet) per Zallet. Il capitolo [Migrazione da zcashd](https://zcash.github.io/zallet/) di The Zallet Book è il riferimento autorevole per il passaggio 6.
