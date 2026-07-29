---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

![Namada Logo](https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/nam.png)

# Best practice per la privacy su Namada

> Indicazioni pratiche e attuabili per ottenere la massima privacy su Namada - e per capire esattamente dove finiscono le sue protezioni.

**La privacy è un diritto fondamentale.** Namada è stata creata appositamente per proteggerla attraverso una crittografia a conoscenza zero avanzata. Questa guida sintetizza le pratiche più efficaci adottate da utenti e sviluppatori attenti alla privacy.

---

## Come Namada protegge la tua privacy

Namada è una blockchain sovrana e privacy-first che nasconde gli indirizzi dei wallet, gli importi delle transazioni e i saldi usando le **prove a conoscenza zero (zk-SNARKs)**.

### Funzionalità di privacy principali

- **Transazioni schermate** - Nascondono completamente mittente, destinatario e importi.
- **Multi-Asset Shielded Pool (MASP)** - Trasferimenti, swap e bridging privati su qualsiasi asset.
- **Privacy cross-chain** - Bridging schermato tramite IBC (il supporto per Ethereum e Solana è in arrivo).
- **Ricompense Shielded Yield** - Guadagna token NAM semplicemente schermando le transazioni.
- **Commissioni basse** - Privacy robusta senza sacrificare l'usabilità.

---

## Limitazioni importanti

Anche la privacy on-chain più solida può essere compromessa dal comportamento dell'utente o da fattori off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada NON protegge da:**

- Connessione senza VPN o Tor (il tuo indirizzo IP è esposto)
- Riutilizzo ripetuto degli indirizzi schermati
- Esecuzione di transazioni trasparenti (non schermate)
- Collegamento del tuo indirizzo Namada ai social media o all'identità del mondo reale
- Uso di exchange KYC centralizzati per depositi o prelievi

</div>

---

## Best practice per la massima privacy

### 1. Principi generali
- Per impostazione predefinita usa le **transazioni schermate** per ogni operazione.
- Non riutilizzare mai gli indirizzi schermati per scopi diversi.
- Evita di mescolare attività schermate e trasparenti nella stessa sessione.

### 2. Bridging degli asset
- Usa un indirizzo trasparente dedicato **solo** per i bridge in entrata.
- Scherma immediatamente gli asset dopo il bridging in entrata.
- Riduci al minimo il bridging in uscita da Namada quando possibile.

### 3. MASP (Multi-Asset Shielded Pool)
- Tieni tutti gli asset all'interno del MASP per impostazione predefinita.
- Tratta il tuo saldo MASP come il tuo principale wallet privato.

### 4. View Key
- Condividi le viewing key **solo** con parti di cui ti fidi pienamente.
- Non pubblicare né postare mai pubblicamente le viewing key.

### 5. Igiene delle transazioni
- Randomizza i tempi e gli importi tra le transazioni.
- Raggruppa più transazioni quando possibile.
- Evita di inviare importi tondi o facilmente identificabili.

### 6. Sicurezza operativa
- Usa sempre una **VPN** (idealmente Tor) quando interagisci con wallet o dApp.
- Non condividere mai screenshot che contengano indirizzi o saldi.
- Usa wallet separati per attività diverse (trading, donazioni, uso personale).

---

## Checklist estesa per la privacy

1. **Scherma sempre per primo** - sposta gli asset nel MASP prima di effettuare transazioni.
2. **Ruota gli indirizzi schermati** regolarmente per casi d'uso diversi.
3. **Preleva direttamente verso indirizzi schermati** dagli exchange quando possibile.
4. **Varia i tempi delle transazioni** per spezzare schemi identificabili.
5. **Usa hardware wallet** per le quantità maggiori.
6. **Mantieni il software aggiornato** - esegui sempre l'ultimo client Namada.
7. **Proteggi il tuo dispositivo** con cifratura robusta e gestori di password.
8. **Sii estremamente prudente** riguardo alle fughe di metadati in chat o log pubblici.

---

## Contribuisci

Hai ulteriori best practice o feedback?  
[Unisciti alla discussione su Discord](https://discord.gg/srC76aE6)

---
*Ultimo aggiornamento: marzo 2026*
