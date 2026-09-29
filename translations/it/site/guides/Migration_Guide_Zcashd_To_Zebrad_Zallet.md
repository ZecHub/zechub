# Guida alla migrazione: da zcashd a Zebrad/Zallet

Il nodo completo tradizionale zcashd, gestito da *Electric Coin Company (ECC)* / *Zodl*, è stato sostituito da Zebra e Zallet. zcashd ha raggiunto l'interruzione del supporto il 18 luglio 2026 e non è più in esecuzione.

- Zebra è una moderna implementazione Rust del protocollo Zcash sviluppata dalla Zcash Foundation
- Zallet è un wallet leggero progettato per interfacciarsi senza problemi con i nodi Zebra sviluppati da Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagramma: zcashd si divide in zebrad per le funzioni di nodo e Zallet per le funzioni di wallet](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Questa guida ti accompagna nella migrazione da **Zcashd** a **Zebrad** e **Zallet**, inclusi configurazione, importazione del wallet e risoluzione dei comuni problemi di migrazione.

---

## zcashd ha smesso di funzionare il 18 luglio 2026

**Cosa significa**

- zcashd ha raggiunto l'interruzione del supporto il 18 luglio 2026. Non si sincronizzerà più con la punta della chain e non può inviare né ricevere fondi. È definitivo, non previsto.
- I due compiti di zcashd sono ora separati: **zebrad** è il nodo completo e **Zallet** è il wallet.
- Zallet è in **beta**. Possono verificarsi modifiche incompatibili tra le release e alcuni metodi JSON-RPC di zcashd non sono ancora implementati. Controlla la [matrice dello stato dei metodi](https://zcash.github.io/zallet/) prima di fare affidamento su una chiamata specifica.
- Se possiedi ancora fondi **Sprout**, leggi prima l'avvertenza nel passaggio 6. Zallet non supporta il pool Sprout e il modo abituale per spostare quei fondi richiedeva un zcashd in esecuzione.

**Perché migrare - oltre la deprecazione**

Anche mettendo da parte la deprecazione, ci sono ragioni convincenti per migrare:
- Sicurezza e robustezza: la sicurezza della memoria di Rust e gli strumenti moderni riducono i rischi di vulnerabilità.
- Prestazioni ed efficienza: Zebrad è progettato per il parallelismo, un uso più efficiente delle risorse e una sincronizzazione più veloce.
- Architettura modulare: separare la logica del nodo (Zebrad) dall'interfaccia del wallet (Zallet) offre confini più chiari e migliori percorsi di aggiornamento.
- Compatibilità con l'ecosistema futuro: strumenti, miglioramenti e il resto dell'ecosistema Zcash si rivolgeranno sempre più a Zebrad/Zallet.
- Tranquillità: evita di ritrovarti a usare un componente deprecato e non supportato.

### Ora approfondiamo la guida alla migrazione

**1. Esegui il backup di tutto**
* Esegui il backup del tuo wallet.dat (o di qualsiasi altro file wallet / archivio di chiavi) dal tuo nodo zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Salva il tuo zcash.conf e tutte le impostazioni personalizzate.
* Esporta una copia di qualsiasi script RPC o automazione che utilizzi.
* Verifica che i tuoi backup siano validi (ad esempio, in un altro ambiente, prova ad aprirli o ispezionarli).
* Esamina i metodi JSON-RPC su cui fai attualmente affidamento.
* Confrontali con la tabella di compatibilità pianificata gestita sul [sito di supporto Zcash](https://z.cash/support/zcashd-deprecation/) 
* Preparati a modifiche o metodi mancanti (alcuni potrebbero richiedere soluzioni alternative o adattamenti).

**2. Requisiti di sistema e spazio su disco**
* Lo spazio su disco è il requisito che le persone sottovalutano. La chain Zcash ha superato i **270 GB** nell'agosto 2026, quindi prevedi almeno **300 GB** di spazio libero, su un SSD se possibile.
* Assicurati che la tua macchina disponga di rete, CPU e RAM stabili.
* Una connessione Internet 
* Se prevedi di compilare dal sorgente, installa Rust e Cargo.

**3. Installa / configura Zebrad**
Puoi scaricare un binario precompilato oppure compilare dal sorgente.
* La Zcash Foundation pubblica release e binari per Zebra. Ad esempio, potresti utilizzare uno script di installazione o scaricare il binario appropriato per il tuo sistema operativo.

* Nota che nelle versioni recenti di Zebra, [l'endpoint RPC non è più abilitato per impostazione predefinita in Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Opzione A: installazione tramite binario precompilato**  
Su **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Questo installa l'ultima versione stabile di zebrad.

**Opzione B: compilazione dal sorgente**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Dopo la compilazione, sposta il binario nel tuo path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migrazione 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Configurazione e avvio**  
Genera una configurazione predefinita:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migrazione2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Modifica **zebrad.toml** in base alle tue preferenze (indirizzo di ascolto, porte, directory di stato, caching).

**Avvia il nodo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![immagine](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Il nodo inizierà a sincronizzarsi dalla genesi: attenditi diverse ore (o più) a seconda dell'hardware e della rete.

**5. Installa / configura Zallet (wallet)**

Zallet è progettato per sostituire la parte wallet di zcashd.

Controlla la pagina GitHub / delle release di Zallet per i binari.

**Oppure compila dal sorgente:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![immagine](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Avvia la GUI o la CLI (in base a quanto fornito dalla tua installazione).
* Configuralo per connettersi al tuo nodo Zebrad locale tramite endpoint RPC o API.

**6. Importazione del tuo wallet zcashd in Zallet**

Non hai bisogno di un zcashd in esecuzione per questo. Zallet legge direttamente il file `wallet.dat`, un aspetto importante perché zcashd non può più essere avviato.

> **Conserva `wallet.dat`.** La migrazione segnala tutto ciò che non riesce a rappresentare in un wallet Zallet invece di importarlo, e quel materiale delle chiavi esiste quindi solo in `wallet.dat`. Non eliminarlo dopo la migrazione.

Esegui prima `zallet init-wallet-encryption`. Zallet cifra il materiale delle chiavi in un'identità age e tale identità deve esistere prima dell'importazione di qualsiasi chiave.

Quindi converti la tua configurazione e il tuo wallet:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` è presente solo nelle build con la funzionalità `zcashd-import`, e la lettura di `wallet.dat` richiede l'utilità `db_dump` di Berkeley DB 6.2, la versione utilizzata da zcashd. Se hai più di un file wallet, esegui il comando una volta per file e aggiungi `--allow-multiple-wallet-imports` nelle esecuzioni successive; ognuno diventa il proprio insieme di account. Il tuo `rpcuser` e `rpcpassword` non vengono trasferiti, perché il JSON-RPC di Zallet utilizza per impostazione predefinita l'autenticazione tramite cookie; aggiungi le credenziali con `zallet add-rpc-user` se ti servono.

**Cosa viene trasferito**

* Seed mnemonici e le chiavi derivate da essi, con gli account ricostruiti per corrispondere al wallet zcashd
* Chiavi di spesa Sapling importate autonomamente e chiavi trasparenti
* Voci trasparenti di sola visualizzazione che includono la loro chiave pubblica o script di riscatto
* Date di nascita degli account, affinché la scansione della chain inizi all'altezza corretta

**Cosa non viene trasferito.** Questi elementi vengono segnalati con conteggi anziché importati:

* **Chiavi di spesa e fondi Sprout.** Zallet non supporta il pool Sprout. Il percorso documentato consisteva nello spostare i fondi Sprout tramite zcashd prima di ritirarlo, e ciò non è più possibile. Se questo ti riguarda, chiedi sul [Discord Zcash R&D](https://discord.gg/xpzPR53xtU) o sul [forum della community](https://forum.zcashcommunity.com/) prima di fare qualsiasi altra cosa.
* Voci della rubrica indirizzi
* Voci di sola visualizzazione memorizzate senza una chiave pubblica o script di riscatto, e voci con chiavi pubbliche non compresse
* Wallet Regtest

**Esecuzione del backup successivamente.** Una mnemonica da sola non è un backup completo, perché le chiavi importate esistono solo nel database del wallet. Conserva copie sicure di `wallet.db`, del file dell'identità di cifratura age indicato dall'opzione `keystore.encryption_identity` e della tua frase mnemonica, e conserva il `wallet.dat` originale. Nota che `wallet.db` non è esso stesso cifrato: conserva in chiaro la cronologia delle transazioni e le chiavi di visualizzazione, quindi archivia il backup in un luogo sicuro.

**Riscansione e sincronizzazione del wallet**

* Una volta importate le chiavi, Zallet attiverà una riscansione della chain tramite Zebrad.
* Lascia a Zallet il tempo necessario per ricostruire il tuo saldo e la cronologia delle transazioni.

**7. Verifica saldi e sincronizzazione**

Una volta importato, Zallet si connetterà al tuo nodo Zebrad e riscansionerà la blockchain.
Al termine della sincronizzazione, i tuoi saldi e le tue transazioni dovrebbero apparire esattamente come prima.

Puoi verificare lo stato di sincronizzazione del tuo nodo eseguendo:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![immagine](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Oppure controlla i log.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![immagine](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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
        <td className="px-6 py-4">Al wallet mancano transazioni</td>
        <td className="px-6 py-4">Importazione parziale delle chiavi</td>
        <td className="px-6 py-4">Reimporta le chiavi o esegui una riscansione in Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet non riesce a connettersi al nodo</td>
        <td className="px-6 py-4">Nodo non in esecuzione o endpoint errato</td>
        <td className="px-6 py-4">Avvia Zebrad e verifica la porta RPC corretta</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet va in crash</td>
        <td className="px-6 py-4">Build obsoleta</td>
        <td className="px-6 py-4">Aggiorna all'ultima release da GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Conclusione**

La migrazione da zcashd a Zebrad e Zallet ti offre un'esperienza Zcash più veloce, sicura e moderna.
Con la sicurezza basata su Rust, il design modulare e strumenti migliori, questa configurazione garantisce che il tuo nodo e wallet restino pronti per il futuro mentre l'ecosistema Zcash continua a evolversi.

Suggerimento: conserva le chiavi del tuo wallet offline ed esegui regolarmente il backup dei dati Zallet.
Visita [zebra.zfnd.org](https://zebra.zfnd.org) per Zebra e [The Zallet Book](https://zcash.github.io/zallet/) o il [repository Zallet](https://github.com/zcash/zallet) per Zallet. Il capitolo [Migrazione da zcashd](https://zcash.github.io/zallet/) di The Zallet Book è il riferimento autorevole per il passaggio 6.
