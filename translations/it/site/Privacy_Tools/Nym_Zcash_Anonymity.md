<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica pagina"/>
</a>

# Nym Anonimato Mixnet per Zcash

> Ultima verifica: 18 ottobre 2026

Le pool schermate di Zcash nascondono importi, mittenti e destinatari on-chain. Non nascondono il percorso di rete tra un portafoglio e il server lightwallet. La mixnet di Nym aggiunge questa protezione mancante a livello di rete. A ottobre 2026, l'integrazione è attiva nei portafogli di produzione (Zingo, Zkool).

Fonte: [Come Nym aggiunge anonimato ai portafogli Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 ottobre 2026).

## Cosa è protetto

Nym suddivide i pacchetti di transazione (in genere 7–15 KB di dati di spesa e prove ZK) in pacchetti Sphinx e li instrada attraverso la mixnet. Questo:

- Nasconde l'IP del mittente al server lightwallet
- Mescola il traffico con altro traffico di Nym
- Fornisce circa 17 bit di entropia con le impostazioni predefinite, con un insieme di anonimato citato superiore a 100.000 utenti

I pagamenti e le richieste di prezzo in Zingo v7 seguono questo percorso per impostazione predefinita.

## Cosa non è protetto

La sincronizzazione della chain, le query dei nullifier, il recupero delle transazioni e il traffico mempool usano attualmente la normale connessione all'indexer. Anche i metadati a livello di dispositivo o applicazione al di fuori dei pacchetti mescolati non rientrano nell'ambito di Nym.

Se il tuo modello di minaccia richiede di nascondere il traffico di sincronizzazione, combina un portafoglio con mixnet nativa con NymVPN a livello di sistema. Vedi [Nym VPN](/guides/nym-vpn).

## Portafogli

| Portafoglio | Stato | Note |
| --- | --- | --- |
| Zingo v7 | Attivo, predefinito | `makers run-cli` include `nym-proxy`. La sessione inizia offline; `--online`, `--remember-online` o `--server` concede il consenso. |
| Zkool | Attivo | Integrazione nativa della mixnet. |
| Altri | Tramite NymVPN | Instrada il portafoglio attraverso la modalità Mixnet a livello di sistema. |

I dettagli di configurazione per il percorso a livello di portafoglio sono disponibili in [Instrada il traffico del portafoglio Zcash attraverso la mixnet Nym](/guides/nym-mixnet-wallet-setup).

## Compromessi

Una trasmissione instradata tramite Nym è circa 12,5× più lenta rispetto a clearnet (~3,4 s). Tor è più veloce (~3,7×) ma usa flussi FIFO senza mescolamento, quindi un avversario globale può comunque correlare. Far crescere la base di utenti condivisa di Nym aumenta l'anonimato in modo più efficace dell'aggiunta di ritardo extra.

## Igiene a livello di applicazione: nym-swizzle-zcash

La protezione a livello di rete non è sufficiente. Anche con una mixnet o VPN perfetta, un server lightwallet può comunque collegare le sessioni osservando gli schemi a livello di applicazione:

- Concatenamento dei punti di ripresa: i client riprendono la sincronizzazione esattamente da `previous end + 1`, quindi il server può concatenare le sessioni solo in base all'altezza del blocco.
- Sincronizzazione poi invio: i portafogli si sincronizzano immediatamente prima della trasmissione, consentendo al server di attribuire una transazione alla sessione di sincronizzazione precedente.

Il crate [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) implementa una policy di igiene specifica per Zcash che affronta entrambi i problemi. Riunisce le primitive generali di `nym-swizzle` in una policy consapevole della chain per i light client.

**Intervalli di sincronizzazione quantizzati.** Le richieste vengono ampliate a una griglia estesa all'intera rete con celle delle dimensioni di un giorno. L'inizio viene arrotondato per difetto e la fine per eccesso. Gli intervalli sono deterministici, crescenti e disgiunti. I controlli di reorg restano all'interno dell'intervallo ampliato, quindi il punto di ripresa esatto non viene rivelato. L'anonimato deriva dalla collisione (molti portafogli emettono gli stessi confini) anziché dal rumore.

**Trasmissioni disaccoppiate.** Gli invii delle transazioni vengono ritardati secondo una distribuzione esponenziale (media di 144 blocchi ≈ 3 ore, limite di 576 blocchi ≈ 12 ore) che corrisponde alla pianificazione dei trasferimenti di ZIP 318. I ritardi superano la durata tipica dei processi, quindi le pianificazioni vengono mantenute in modo persistente. La transazione viene costruita solo al momento dell'invio rispetto a una punta aggiornata. La sincronizzazione e la trasmissione dovrebbero usare server diversi.

Il crate espone i trait `BlockSource` e `TxBroadcaster`, viene compilato per `wasm32-unknown-unknown` e non dispone di uno stack di rete proprio. Consulta la documentazione di [Nym](https://nym.com/docs/developers/swizzle/zcash) per l'API completa e gli esempi.

## Fonti

- [Come Nym aggiunge anonimato ai portafogli Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 ottobre 2026
- [nym-swizzle-zcash: policy di igiene per i light client Zcash](https://nym.com/docs/developers/swizzle/zcash) — Documentazione di Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Instrada il traffico del portafoglio Zcash attraverso la mixnet Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
