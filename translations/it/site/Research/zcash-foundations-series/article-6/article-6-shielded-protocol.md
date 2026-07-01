# Il Protocollo Schermato, da Cima a Fondo
##### Ricerca originale di [Annkkitaaa](https://github.com/Annkkitaaa)

![alt text](image-27.png)

### Assemblare ogni pezzo in un'unica transazione Zcash privata

> **Serie:** *Zcash from First Principles* . **Articolo 6 . Il Protocollo Schermato** (finale)
> **Pubblico:** i nuovi arrivati che hanno letto gli Articoli da 0 a 5. È qui che tutto si collega.
> **Cosa porterai con te:** un modello mentale completo e corretto di una transazione Zcash schermata, con ogni concetto della serie al suo posto, e ogni filo aperto nell'Articolo 0 finalmente chiuso.

Abbiamo iniziato, nell'[Articolo 0](article-0-shielded-transaction.md), con un paradosso e una storia di buste sigillate su una bacheca pubblica. Poi abbiamo trascorso cinque articoli a costruire le parti: campi finiti, curve ellittiche, impegni (commitment), alberi di Merkle e prove a conoscenza zero. Ora le mettiamo insieme e osserviamo un vero pagamento privato funzionare, dall'inizio alla fine.

---

## 1. Perché dovrebbe interessarti?

Preso singolarmente, ogni pezzo che hai imparato è ingegnoso. Ma la *magia* di Zcash sta nel modo in cui questi pezzi si incastrano tra loro. Un nullifier da solo non garantisce privacy. Un commitment da solo non impedisce la contraffazione. Una prova da sola non prova nulla di utile. È l'**assemblaggio** che trasforma cinque componenti in denaro al contempo privato e affidabile.

Questo articolo è l'assemblaggio. Alla fine, la frase *"la rete verifica una transazione che non può vedere"* non sembrerà più un paradosso, ma una conseguenza ovvia di parti che già comprendi.

---

## 2. Il cast, ricomposto

Ecco l'intera serie in una sola pagina, mappata dalla storia dell'Articolo 0 al meccanismo reale.

| Elemento della storia dell'Articolo 0 | Componente reale | Costruito da |
|---|---|---|
| Il denaro dentro una busta | **Nota** (valore, destinatario, casualità) | codificata come elementi di campo (Art 1) |
| La busta opaca sigillata | **Commitment della nota** | commitment di Pedersen / Sinsemilla (Art 2, 3) |
| La bacheca pubblica | **Albero dei commitment delle note** (anchor = la sua radice) | albero di Merkle incrementale (Art 4) |
| Il gettone di annullamento | **Nullifier** | un hash ZK-friendly della nota + chiave segreta (Art 2, 3) |
| "Il denaro in entrata uguaglia quello in uscita" | **Commitment di valore + controllo del bilancio** | commitment di Pedersen omomorfici (Art 2, 3) |
| La magia dietro le quinte | **Prova a conoscenza zero** | zk-SNARK su un circuito aritmetico (Art 5) |
| "Solo tu puoi leggere la tua busta" | **Nota cifrata + viewing key** | cifratura + gerarchia di chiavi (questo articolo) |

---

## 3. Da dove vengono le chiavi

Tutto ciò che un utente può fare scaturisce da un singolo segreto, la **spending key**, attraverso una gerarchia unidirezionale (ogni freccia è una derivazione irreversibile, grazie alle trappole degli Articoli 2 e 3):

![alt text](image-32.png)

Due cose degne di nota, entrambe conseguenze degli articoli precedenti:

- La separazione ti consente di consegnare una **viewing key** (per esempio, a un revisore) che rivela le tue transazioni **senza** concedere il potere di spendere. La privacy è selettiva, non tutto-o-niente.
- Ogni derivazione è **unidirezionale**: possedere una viewing key non permette mai a nessuno di recuperare la spending key, esattamente la trappola della curva ellittica dell'Articolo 2 che svolge il suo compito.

---

## 4. Spendere una nota: le quattro affermazioni

Per spendere una nota in modo privato, devi convincere la rete di quattro cose contemporaneamente **senza rivelare la nota, il suo valore, la sua posizione o la tua identità.** Ogni affermazione è soddisfatta da un componente che già conosci.

![alt text](image-31.png)

La prova non rivela **nessuno** dei fatti sottostanti (quale nota, di chi è la chiave, quale valore). Rivela solo che *tutte e quattro le affermazioni sono vere.* Questo è l'intero trucco di Zcash schermato, enunciato in un solo diagramma.

---

## 5. Il trucco del bilancio dei valori (il colpo che ci eravamo riservati)

Negli Articoli 2 e 3 avevamo notato che i commitment di Pedersen **si sommano**: il commitment a `v_1` più il commitment a `v_2` è un commitment a `v_1 + v_2`. Ecco dove questo ripaga.

Ogni nota di input e di output porta con sé un **commitment di valore**: un commitment di Pedersen `v.G + r.H` che nasconde il suo importo `v`. Poiché questi si sommano, la rete può calcolare:

```
(sum of input value commitments) − (sum of output value commitments)
```

Se la transazione è bilanciata (nessun denaro creato o distrutto), le parti `v` si annullano esattamente, lasciando solo un commitment a **valore zero**, offuscato dalla casualità residua. Il mittente prova di conoscere quella casualità residua producendo una piccola firma chiamata **binding signature.** Una binding signature valida è possibile solo quando i valori sono realmente bilanciati, **eppure non è stato rivelato un solo importo.**

> Questa è l'illustrazione più chiara di tutta la serie del *perché* avessimo bisogno di commitment omomorfici basati sulle curve. La regola "denaro in entrata uguale a denaro in uscita" è imposta **sommando insieme le buste sigillate** e verificando che il risultato si sigilli a zero.

---

## 6. Una transazione completa, osservata da cima a fondo

Assembliamo Alice che paga Bob. Useremo la chiara struttura "lato spesa / lato output" di Sapling come modello didattico.

**Una transazione schermata raggruppa due tipi di descrizioni:**

| Spend description (consuma una nota) | Output description (crea una nota) |
|---|---|
| commitment di valore dell'input | commitment di valore dell'output |
| l'**anchor** contro cui prova (una radice dell'albero) | il nuovo **commitment della nota** (una nuova foglia) |
| il **nullifier** della nota spesa | una **chiave effimera** per la cifratura |
| una chiave pubblica ri-randomizzata + firma di autorizzazione alla spesa | la **nota cifrata** (testo cifrato per il destinatario) |
| lo **zk-SNARK** che prova le quattro affermazioni | uno **zk-SNARK** che prova che l'output è ben formato |

Più una **binding signature** sull'intero bundle, che impone il bilancio dei valori (Sezione 5).

![alt text](image-30.png)

Segui la privacy: la rete ha controllato l'anchor, ha verificato che il nullifier fosse nuovo, ha verificato la prova e ha verificato il bilancio. Ha accettato un pagamento valido **senza aver appreso alcun importo, alcun indirizzo, né quale nota sia stata spesa.** Nel frattempo il **nullifier** della nota spesa (la sua morte) e il nuovo **commitment** di Bob (la nascita della sua nota) si trovano in due strutture pubbliche diverse, senza alcun legame visibile tra loro, il legame reciso dell'Articolo 0.

---

## 7. Chiudere ogni filo aperto nell'Articolo 0

L'Articolo 0 ha aperto deliberatamente delle domande. Eccole tutte, chiuse.

| Filo aperto nell'Articolo 0 | Chiuso da |
|---|---|
| Come è possibile una busta sigillata-eppure-infalsificabile? | I commitment: nascosti grazie alla casualità, vincolanti grazie alla resistenza alle collisioni / la trappola della curva (Art 3) |
| Da dove vengono le chiavi e le ricette segrete? | Aritmetica dei campi e moltiplicazione scalare su curva ellittica (Art 1, 2) |
| Cos'è esattamente "la bacheca"? | Un albero di Merkle incrementale di commitment di note; la sua radice è l'anchor (Art 4) |
| Perché il gettone di annullamento non può essere collegato alla sua busta? | Il nullifier è un hash con chiave conservato in un insieme separato dai commitment (Art 2, 3, 4) |
| Come si prova la validità senza rivelare nulla? | Uno zk-SNARK su un circuito aritmetico che codifica tutte e quattro le affermazioni (Art 5) |
| Come fa il destinatario a sapere di essere stato pagato? | La nota è cifrata verso il suo indirizzo; lui prova a decifrarla (trial-decrypt) con una viewing key (questo articolo) |
| Come si impone "denaro in entrata = denaro in uscita" in modo privato? | Commitment di valore omomorfici + la binding signature (Sez 5) |

Il paradosso della prima pagina, *verificare ciò che non puoi vedere*, è ora completamente dissolto. La rete verifica **affermazioni su dati nascosti**, mai i dati stessi.

---

## 8. Sapling vs Orchard, in un soffio

Abbiamo insegnato con la struttura di Sapling perché la sua separazione è la più chiara. Il design attuale, **Orchard**, raffina queste idee anziché sostituirle:

| | **Sapling** | **Orchard** |
|---|---|---|
| Unità di transazione | descrizioni separate di **Spend** e **Output** | **Action** unificate (ciascuna fa una spesa + un output) |
| Sistema di prova | **Groth16** (trusted setup) | **Halo 2** (nessun trusted setup) |
| Curve | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Hash dei commitment | Pedersen | Sinsemilla |

Ogni concetto di questo articolo si trasferisce direttamente; Orchard principalmente raggruppa spesa-e-output insieme e sostituisce con un sistema di prova senza cerimonia. I cinque pilastri rimangono invariati.

---

## 9. Una dichiarazione onesta

Questo è il quadro più completo della serie, ma resta pur sempre un modello. Abbiamo compresso le esatte codifiche di campo di una nota, le precise formule di derivazione delle chiavi, la ri-randomizzazione delle chiavi di spesa, gli indirizzi diversificati, i campi memo, la gestione delle commissioni, la differenza tra commitment di valore e commitment di note in tutti i dettagli, e il ruolo preciso di ciascuna firma. Abbiamo inoltre presentato un solo flusso canonico; le transazioni reali possono trasportare molte spese e output insieme e possono mescolare parti transparent e schermate. La fonte autorevole è la Specifica del Protocollo Zcash. Ciò che ora possiedi è la forma corretta; la specifica riempie ogni misura.

---

## 10. Riepilogo

- Una transazione schermata incastra tutti e cinque i componenti: una **nota** (il valore), il suo **commitment** nell'**albero dei commitment delle note**, un **nullifier** per impedire la doppia spesa, **commitment di valore** per il bilancio, e uno **zk-SNARK** che lega tutto insieme.
- Spendere prova **quattro affermazioni in una volta sola**, che la nota esiste, che sei autorizzato, che il suo nullifier è corretto e che il valore è bilanciato, a **conoscenza zero**, senza rivelare nessuno dei fatti sottostanti.
- Il **bilancio dei valori** è imposto **sommando commitment omomorfici** e verificando che si sigillino a zero, tramite la **binding signature**, senza che alcun importo venga divulgato.
- I poteri di un utente scaturiscono da un'unica **spending key** attraverso una **gerarchia unidirezionale**, abilitando **viewing key** che rivelano senza concedere il potere di spesa.
- La rete **verifica affermazioni su dati nascosti**, dissolvendo il paradosso verifica-vs-privacy dell'Articolo 0. Ogni filo lì aperto è ora chiuso.
- **Orchard** raffina **Sapling** (Action unificate, Halo 2 senza trusted setup, curve Pasta, Sinsemilla) senza modificare i cinque pilastri.

---

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| **Spending key** | L'unico segreto radice da cui derivano tutte le chiavi di un utente |
| **Viewing key** | Rivela le tue transazioni a chi la detiene senza permettergli di spendere |
| **Spend description** | La parte di una tx che consuma una nota (nullifier, anchor, prova) |
| **Output description** | La parte di una tx che crea una nota (commitment, testo cifrato, prova) |
| **Action (Orchard)** | Un'unità unificata che esegue insieme una spesa e un output |
| **Commitment di valore** | Un commitment di Pedersen omomorfico a un importo |
| **Binding signature** | La firma che prova che i valori sono bilanciati senza rivelarli |
| **Anchor** | La radice dell'albero contro cui una spesa prova l'appartenenza |
| **Trial decryption** | Un destinatario che testa i nuovi commitment per trovare le note destinate a lui |

---

## FAQ

**La rete vede mai l'importo o chi ha pagato chi?**
No. Verifica la prova, la freschezza del nullifier, l'anchor e la binding signature. Tutti i valori privati restano nascosti.

**Cosa mi impedisce di spendere una nota due volte?**
Il nullifier. Spendere lo pubblica; la rete rifiuta qualsiasi nullifier già presente nell'insieme dei nullifier. La stessa nota produce sempre lo stesso nullifier.

**Come si può verificare il bilancio se gli importi sono nascosti?**
I commitment di valore si sommano in modo omomorfico; i commitment di una transazione bilanciata si annullano in un commitment a zero, cosa che la binding signature prova.

**Posso provare le mie transazioni a un revisore senza cedere il controllo?**
Sì. Consegna una viewing key. Rivela la tua attività schermata ma non può autorizzare spese, grazie alla gerarchia di chiavi unidirezionale.

**Sapling è ormai obsoleto adesso che esiste Orchard?**
Entrambi sono esistiti sulla rete; Orchard è il design attuale. I concetti sono condivisi, quindi comprenderne uno ti dà l'altro.

---

### Metti alla prova la tua intuizione

Un amico dice: "Poiché la prova nasconde l'importo, un ladro potrebbe semplicemente dichiarare che i suoi output valgono più dei suoi input e stampare denaro gratis." Usando la Sezione 5, spiega in due frasi perché questo fallisce. *(Risposta sotto.)*

<details><summary>Risposta</summary>

Gli importi sono nascosti, ma ciascuno è avvolto in un commitment di valore omomorfico, e la rete somma tutti i commitment di input e sottrae tutti i commitment di output; se i valori nascosti non fossero bilanciati, il risultato non si sigillerebbe a zero e **non si potrebbe produrre alcuna binding signature valida.** Il ladro può nascondere *quanto*, ma non può far passare valori non bilanciati al controllo del bilancio, quindi stampare denaro gratis è impossibile senza rivelare nulla e venendo comunque scoperto dall'aritmetica.
</details>

---

### La serie, completa

Hai ora viaggiato da un singolo paradosso fino a un pagamento privato completo:

![alt text](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


Da qui, l'arco naturale successivo va più in profondità: il funzionamento interno di Groth16 e Halo 2, le cerimonie di trusted setup, i circuiti di Sapling e Orchard nel dettaglio, la derivazione delle chiavi e gli indirizzi diversificati, e l'evoluzione del protocollo attraverso i network upgrade. Ma le fondamenta sono ora poste, e ognuno di quegli argomenti ha un posto a cui agganciarsi.

*Parte della serie* Zcash from First Principles *per [ZecHub](https://zechub.org). Licenza CC BY-SA 4.0.*
