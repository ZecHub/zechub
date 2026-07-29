# Zero to Zero Knowledge: Trusted Execution Environments (TEE)

**Serie:** Zero to Zero Knowledge

Zero to Zero Knowledge è tornata con un nuovo argomento!  
Questa settimana esploriamo i **Trusted Execution Environments (TEE)** - come vengono usati nelle privacy coin e in altre applicazioni blockchain.

![Introduzione ai Trusted Execution Environments](https://pbs.twimg.com/media/Fquj-h2WcAIgSnL.jpg)

---

## TEE e blockchain: proprietà complementari

Le blockchain e i TEE hanno punti di forza molto complementari:

- Le **blockchain** garantiscono disponibilità, persistenza dello stato e consentono la verifica pubblica dell'intero stato - ma hanno una potenza di calcolo limitata.  
- I **TEE** possono eseguire compiti computazionali intensivi in modo privato - ma mancano di persistenza dello stato nativa.

Insieme possono creare potenti sistemi che preservano la privacy.

---

## Secret Network: privacy basata su TEE

**Secret Network** sfrutta la tecnologia TEE (in particolare Intel SGX) per eseguire calcoli su input, output e stato cifrati.

Ogni nodo validatore esegue chip Intel SGX. I livelli di consenso e di calcolo sono combinati:

- Le transazioni vengono elaborate all'interno di enclave sicure.  
- I dati vengono decifrati solo **all'interno del TEE**.

Questo è diverso da Zcash, che usa le **prove a conoscenza zero** per la privacy. In Zcash, le transazioni schermate vengono trasmesse e validate pubblicamente senza rivelare alcun dato aggiuntivo alla rete. Gli Zcash Shielded Assets seguono lo stesso principio.

![Diagramma TEE di Secret Network](https://pbs.twimg.com/media/FqulPjNX0AEfjRp.png)

Per una spiegazione dettagliata di come i TEE vengono implementati su Secret Network, leggi questo eccellente articolo di @l_woetzel:  
https://carter-woetzel.medium.com/secret-network-tees-lets-talk-fud-vulnerability-33ca94b6df38

---

## Come Secret Network protegge le chiavi e lo stato

- Il **seed di cifratura del consenso** della rete è memorizzato all'interno del TEE di ogni validatore.  
- I contratti usano chiavi di cifratura uniche e non falsificabili.  
- I secret contract vengono eseguiti sul modulo di calcolo del Cosmos SDK ma supportano input/output e stato cifrati.

---

## Remote Attestation

La **Remote Attestation** è il processo che dimostra che un'enclave è in esecuzione in un ambiente hardware sicuro e genuino.

Consente a una parte remota di verificare:
- Che sia in esecuzione l'applicazione corretta  
- Che l'applicazione non sia stata manomessa  
- Che venga eseguita in modo sicuro all'interno di un'enclave Intel SGX

![Spiegazione della Remote Attestation](https://pbs.twimg.com/media/FqumRjoWwAAeT-M.png)

Le enclave contengono anche chiavi private di firma e di attestazione che non possono essere accedute dall'esterno.

![Protezione delle chiavi dell'enclave](https://pbs.twimg.com/media/Fqumv83XoAQq-MO.png)

---

## Data Sealing

Poiché le enclave sono stateless, i dati devono talvolta essere memorizzati all'esterno, in memoria non attendibile.  

Il **Data Sealing** cifra i dati all'interno dell'enclave usando una chiave derivata dalla CPU. Il blocco cifrato può essere decifrato (unsealed) solo sullo **stesso sistema**.

![Diagramma del Data Sealing](https://pbs.twimg.com/media/FqunBwyWYAA-TR3.jpg)

---

## Oasis Network

Anche **Oasis Network** usa i TEE attraverso il suo ParaTime confidenziale (ad esempio Sapphire e Cipher).

I dati cifrati entrano nel TEE insieme allo smart contract. Vengono decifrati, elaborati e ri-cifrati prima di lasciare l'enclave.

![Flusso TEE di Oasis Network](https://pbs.twimg.com/media/FqunJRDXwAMt4Ob.png)

---

## I TEE nelle reti Proof-of-Stake

Molte blockchain Proof-of-Stake (incluse Secret e Oasis) usano **Tendermint** come framework di consenso.

Per i validatori PoS:
- Le chiavi devono essere gestite in modo sicuro e mai esposte in chiaro.  
- I validatori devono rimanere online (si applicano penalità per i tempi di inattività).  
- Firmare messaggi in conflitto può portare allo slashing.

I **TEE** sono ideali per generare e usare in modo sicuro le chiavi dei validatori.

![Sicurezza di Tendermint e PoS](https://pbs.twimg.com/media/Fqun0HEX0AAooxW.jpg)

---

## Zcash e la ricerca sul Proof-of-Stake

Zcash sta attivamente studiando una migrazione al Proof-of-Stake.

- Leggi la ricerca: https://electriccoin.co/blog/zcash-proof-of-stake-research/  
- Guarda questo segmento di una Community Call della Zcash Foundation che spiega i diversi design PoS e le loro implicazioni per la privacy:
  
<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/22a-ROcb3AQ"
    title="PoS designs"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

---

**Thread originale di ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1633579659282587651

---

*Questa pagina è stata compilata a partire dal thread originale Zero to Zero Knowledge per la wiki di ZecHub.*
