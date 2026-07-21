# Guida alla migrazione: da zcashd a Zebrad/Zallet

L'ecosistema Zcash sta evolvendo. Il tradizionale nodo completo Zcashd, gestito da *Electric Coin Company (ECC)* / *Zodl*, viene gradualmente sostituito da Zebra e Zallet.

- Zebra è una moderna implementazione in Rust del protocollo Zcash sviluppata dalla Zcash Foundation
- Zallet è un wallet leggero costruito per interfacciarsi senza problemi con i nodi Zebra, sviluppato da Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

Questa guida ti accompagna nella migrazione da **Zcashd** a **Zebrad** e **Zallet**, inclusi configurazione, importazione del wallet e risoluzione dei problemi comuni di migrazione.

---

## Il progetto Zcash ha annunciato formalmente che zcashd verrà deprecato nel 2025.

**Stato di deprecazione e cosa significa**

- Il progetto Zcash ha annunciato formalmente che zcashd verrà deprecato nel 2025.
- I nodi completi vengono migrati a Zebrad, un'implementazione in Rust, mentre Zallet è destinato a succedere alla componente wallet di zcashd.
- In risposta, il progetto Zebra tiene traccia di una milestone "Zcashd Deprecation" per garantire compatibilità, migrazione RPC e supporto dell'ecosistema.
- Per molti metodi RPC, Zebrad/Zallet mireranno a essere sostituzioni drop-in (emulando o riproducendo il comportamento). Altri cambieranno o potrebbero non essere supportati.

**Perché migrare - oltre alla deprecazione**

Anche lasciando da parte la deprecazione, ci sono ragioni convincenti per passare:
- Sicurezza e robustezza: la memory-safety di Rust e gli strumenti moderni riducono i rischi di vulnerabilità.
- Prestazioni ed efficienza: Zebrad è progettato per il parallelismo, un uso più efficiente delle risorse e una sincronizzazione più veloce.
- Architettura modulare: separare la logica del nodo (Zebrad) dall'interfaccia del wallet (Zallet) offre confini più chiari e percorsi di aggiornamento migliori.
- Compatibilità futura dell'ecosistema: gli strumenti, i miglioramenti e il resto dell'ecosistema Zcash punteranno sempre più su Zebrad/Zallet.
- Tranquillità: evita di rimanere bloccato eseguendo una componente deprecata e non supportata.

### Ora immergiamoci nella guida alla migrazione

**1. Fai il backup di tutto**
* Esegui il backup del tuo wallet.dat (o di qualsiasi altro file wallet / archivio chiavi) dal tuo nodo zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* Salva il tuo zcash.conf e tutte le impostazioni personalizzate.
* Esporta una copia di tutti gli script RPC o le automazioni che usi.
* Verifica che i tuoi backup siano validi (ad esempio, in un altro ambiente, prova ad aprirli o ispezionarli).
* Esamina quali metodi JSON-RPC stai attualmente utilizzando.
* Confrontali con la tabella di compatibilità pianificata mantenuta sul [sito di supporto Zcash](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com)
* Preparati a cambiamenti o metodi mancanti (alcuni potrebbero richiedere workaround o adattamenti).

**2. Requisiti di sistema e spazio su disco**
* Assicurati di avere spazio su disco sufficiente (la chain di Zcash è grande). Almeno 10 GB di spazio libero su disco.
* Assicurati che la tua macchina abbia una rete, CPU e RAM stabili.
* Una connessione internet
* Se prevedi di compilare dai sorgenti, assicurati di avere Rust e Cargo installati.

**3. Installazione / configurazione di Zebrad**
Puoi scaricare un binario precompilato oppure compilare dai sorgenti.
* La Zcash Foundation pubblica release e binari per Zebra. Ad esempio, potresti usare uno script di installazione o scaricare il binario appropriato per il tuo OS.

* Nota che nelle versioni recenti di Zebra, [l'endpoint RPC non è più abilitato per impostazione predefinita in Docker.](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Opzione A: installazione tramite binario precompilato**  
Su **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

Questo installa l'ultima versione stabile di zebrad.

**Opzione B: compilazione dai sorgenti**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Dopo la compilazione, sposta il binario nel tuo path:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Configurazione e avvio**  
Genera una configurazione predefinita:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

Modifica **zebrad.toml** secondo le tue preferenze (indirizzo di ascolto, porte, directory di stato, caching).

**Avvia il nodo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

Il nodo inizierà a sincronizzarsi dal genesis - aspettati diverse ore (o più) a seconda dell'hardware e della rete.

**5. Installazione / configurazione di Zallet (Wallet)**

Zallet è progettato per sostituire la parte wallet di zcashd.

Controlla la pagina GitHub / delle release di Zallet per i binari.

**Oppure compila dai sorgenti:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* Avvia la GUI o la CLI (a seconda di ciò che fornisce la tua installazione).
* Configuralo per connettersi al tuo nodo Zebrad locale tramite l'endpoint RPC o API.

**6. Importare il tuo wallet zcashd in Zallet**  
Tramite dump della chiave privata

Su zcashd, esporta le tue chiavi private:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* In Zallet, scegli Import Keys o un'opzione simile.
* Indirizzalo a **zcashd_keys.txt**.
* Zallet dovrebbe analizzare e importare gli indirizzi ZEC e le chiavi associate.

**Tramite frase seed** (se applicabile)

* Se il tuo wallet supporta un backup tramite seed, usa Restore from Seed Phrase in Zallet.
* Funziona solo se il tuo wallet zcashd è stato derivato da un seed (o se disponi di una conversione del seed).

**Rescan e sincronizzazione del wallet**

* Una volta importate le chiavi, Zallet attiverà un rescan della chain tramite Zebrad.
* Concedi del tempo a Zallet per ricostruire il tuo saldo e la cronologia delle transazioni.

**7. Verifica saldi e sincronizzazione**

Una volta importato, Zallet si connetterà al tuo nodo Zebrad e rieseguirà la scansione della blockchain.
Al termine della sincronizzazione, i tuoi saldi e le tue transazioni dovrebbero apparire esattamente come prima.

Puoi verificare lo stato di sincronizzazione del tuo nodo eseguendo:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

Oppure controlla i log.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
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
        <td className="px-6 py-4">Assicura una connessione stabile, riavvia Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Transazioni mancanti nel wallet</td>
        <td className="px-6 py-4">Importazione parziale delle chiavi</td>
        <td className="px-6 py-4">Reimporta le chiavi o esegui un rescan in Zallet</td>
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

Migrare da zcashd a Zebrad e Zallet ti offre un'esperienza Zcash più veloce, più sicura e più moderna.
Con la sicurezza basata su Rust, il design modulare e strumenti migliori, questa configurazione garantisce che il tuo nodo e il tuo wallet restino pronti per il futuro mentre l'ecosistema Zcash continua a evolversi.

Consiglio: tieni le chiavi del tuo wallet offline ed esegui regolarmente il backup dei dati di Zallet.
Visita [zebra.zfnd.org](https://zebra.zfnd.org) e [zallet.zfnd.org](https://zallet.zfnd.org) per aggiornamenti e supporto della community.
