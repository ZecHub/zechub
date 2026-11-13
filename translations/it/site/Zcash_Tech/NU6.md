<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifica Pagina"/>
</a>

# NU6

> NU6 è stato attivato sulla mainnet di Zcash al blocco 2,726,400 (23 novembre 2024 UTC).

Cosa imparerai: come Zcash continua a finanziare il proprio sviluppo dopo un halving, perché ha accantonato una riserva che non sapeva ancora come spendere e come ha reso esattamente prevedibile l’offerta totale di ZEC.

NU6 è un [aggiornamento di rete](../start-here/network-upgrades) di Zcash, distribuito tramite [ZIP 253](https://zips.z.cash/zip-0253), che si è attivato sulla mainnet nel novembre 2024 al blocco 2,726,400. È un aggiornamento monetario e di [finanziamento dello sviluppo](../start-here/development-fund): ha mantenuto una quota del sussidio di blocco destinata allo sviluppo oltre l’halving del novembre 2024, ha istituito una riserva nel protocollo per un futuro utilizzo deciso dalla comunità e ha reso più rigoroso il modo in cui viene conteggiato il nuovo ZEC. NU6 è stato sostenuto sia da Electric Coin Company sia dalla Zcash Foundation.

Perché è importante. Il [Development Fund](../zcash-tech/canopy) di Zcash era previsto in scadenza intorno all’halving del novembre 2024, il secondo nella sua storia. NU6 ha mantenuto quel finanziamento, ma invece di assegnare ogni moneta a destinatari fissi, ne ha riservata una quota all’interno del protocollo così che la comunità potesse decidere in seguito cosa farne. Ha anche chiuso un discreto vuoto contabile, così l’ammontare totale di ZEC che esisterà mai ora può essere previsto con esattezza.

## In breve

- NU6 è stato attivato sulla mainnet al blocco 2.726.400 (23 novembre 2024 UTC), distribuito tramite ZIP 253.
- Ha mantenuto il 20% del sussidio di blocco destinato allo sviluppo dopo l'halving del novembre 2024: l'8% a Zcash Community Grants (ZCG) e il 12% nel nuovo Deferred Dev Fund Lockbox (ZIP 2001).
- Il lockbox è una riserva interna al protocollo senza un destinatario autorizzato a spenderla: NU6 ha lasciato volutamente aperta la questione della governance, a cui ha poi risposto NU6.1 (2025).
- ZIP 236 ora richiede che ogni transazione coinbase sia esattamente in pareggio, così i miner non possono più richiedere meno del dovuto e bruciare per errore ZEC. L'offerta totale futura diventa esattamente prevedibile.
- Saldi, privacy e regole delle transazioni restano invariati: NU6 è un aggiornamento che riguarda il finanziamento e la contabilità.

## Analogia visiva

Pensa a NU6 come a una famiglia che ha sempre pagato una paghetta fissa ai suoi costruttori e sa che i pagamenti sono destinati a finire. Invece di interrompere i pagamenti, NU6 divide la paghetta: una parte continua ad andare al comitato dei finanziamenti della comunità e un'altra finisce in una cassaforte di famiglia di cui non è ancora stata annunciata alcuna combinazione. La cassaforte tiene da parte il denaro finché la famiglia non si accorderà sulle regole per aprirla: quell'accordo è NU6.1.

## Cosa ha cambiato NU6

NU6 ha continuato a destinare il 20% del sussidio di blocco al finanziamento dello sviluppo dopo l’halving del novembre 2024, una regola definita in [ZIP 1015](https://zips.z.cash/zip-1015). Ha diviso quel 20% in due parti.

1. L’8% del sussidio di blocco va a Zcash Community Grants (ZCG), che finanzia lavori realizzati dalla e per la comunità.
2. Il 12% confluisce in un nuovo lockbox nel protocollo, conservato per un futuro utilizzo deciso dalla comunità.

Il resto del sussidio di blocco, più le commissioni di transazione, va ai miner che proteggono la rete. NU6 ha anche aggiornato le regole esistenti dei funding stream e del dev fund (ZIP 207 e ZIP 214) per adattarle a questa nuova struttura.

![Suddivisione del development fund di NU6: il 20 percento del sussidio di blocco va allo sviluppo, con l’8 percento a Zcash Community Grants e il 12 percento nel Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## Il lockbox differito

La quota del 12% è la nuova idea introdotta da NU6. Invece di essere pagato a un indirizzo destinatario, quel valore viene depositato direttamente in una pool nel protocollo chiamata Deferred Dev Fund Lockbox, definita in [ZIP 2001](https://zips.z.cash/zip-2001).

1. Il lockbox è un nuovo tipo di funding stream (DEFERRED_POOL), in cui il valore della ricompensa di blocco confluisce nel protocollo stesso, non a una persona o organizzazione.
2. La rete lo tiene traccia come saldo di una propria pool di valori della chain, allo stesso modo in cui tiene traccia dei saldi delle pool schermate.
3. NU6 ha creato il lockbox intenzionalmente ma ha lasciato aperta la domanda più difficile: chi controlla quei fondi e come vengono rilasciati?

A questa domanda è stata data risposta in seguito da [NU6.1](../zcash-tech/nu6-1), che ha definito la governance: ha continuato il flusso dell’8% del sussidio di blocco verso Zcash Community Grants e ha indirizzato un flusso del 12% in un fondo controllato dai detentori di monete alimentato dal lockbox.

## Far quadrare i conti

NU6 ha anche colmato una lacuna contabile nel modo in cui vengono creati nuovi ZEC, definita nella [ZIP 236](https://zips.z.cash/zip-0236). Le transazioni Coinbase sono le transazioni speciali che distribuiscono i nuovi ZEC e le commissioni di ogni blocco.

1. Prima di NU6, una transazione coinbase doveva solo non reclamare più di quanto le spettasse. Un miner poteva reclamare meno del sussidio completo, bruciando silenziosamente quel ZEC.
2. Dopo NU6, una transazione coinbase deve essere esattamente in equilibrio: il valore totale in uscita deve essere uguale al sussidio del miner più le commissioni, né più né meno.
3. Poiché i miner non possono più reclamare meno del dovuto e bruciare accidentalmente ZEC, l’ammontare totale di ZEC che esisterà mai ora può essere previsto con esattezza.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Come si è evoluto il finanziamento

NU6 è un capitolo di una storia più lunga su come Zcash finanzia se stesso.

1. Canopy (2020) ha concluso la founders reward originaria e ha creato il [development fund](../start-here/development-fund).
2. NU6 (novembre 2024) ha ristrutturato quel finanziamento dopo il secondo halving e ha istituito il Deferred Dev Fund Lockbox, riservando una quota dell’emissione per futuri grant decisi dalla comunità.
3. NU6.1 (2025) ha risposto alla domanda lasciata aperta da NU6, cioè chi controlla i fondi riservati, continuando a destinare l’8% del sussidio di blocco a Zcash Community Grants e indirizzando il 12% in un fondo controllato dai detentori di monete alimentato dal lockbox.

![Come si è evoluto il finanziamento di Zcash: Canopy ha creato il development fund, NU6 ha istituito il lockbox e NU6.1 ha stabilito le regole su chi lo controlla](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Errori comuni

- **Pensare che NU6 abbia cambiato la politica monetaria.** Il programma di emissione e la tempistica dell'halving non sono stati toccati; NU6 ha cambiato chi riceve una parte del sussidio, non quanti nuovi ZEC vengono emessi.
- **Confondere il lockbox con un portafoglio di una fondazione.** Il Deferred Dev Fund Lockbox è una value pool della chain tracciata dal consenso, non un indirizzo da cui qualcuno possa spendere.
- **Presumere che NU6.1 e NU6 siano lo stesso aggiornamento.** NU6 ha creato la riserva; NU6.1 ha deciso chi la controlla: l'8% a ZCG e il 12% a un fondo controllato dai detentori di monete.
- **Credere che la regola del saldo esatto (ZIP 236) modifichi le monete degli utenti.** Vincola le transazioni coinbase, cioè i pagamenti dell'emissione per ogni blocco, non i saldi esistenti né le transazioni ordinarie.
- **Considerare nuova la quota del 20% per lo sviluppo.** Il finanziamento allo sviluppo del 20% esiste da Canopy; NU6 lo ha prolungato oltre l'halving e lo ha diviso in 8% a ZCG e 12% al lockbox.

## Glossario

| Termine | Significato in parole semplici |
|---|---|
| Block subsidy | Il nuovo ZEC creato con ogni blocco che viene minato |
| Coinbase transaction | La transazione speciale che distribuisce il sussidio e le commissioni di un blocco |
| Deferred Dev Fund Lockbox | Una riserva nel protocollo che conserva una quota dell’emissione per un futuro utilizzo deciso dalla comunità |
| Zcash Community Grants (ZCG) | Un comitato che finanzia lavori realizzati dalla e per la comunità di Zcash |
| Consensus branch id | L’identificatore che i nodi usano per capire quali regole di aggiornamento segue un blocco |
| Network upgrade (NU) | Una modifica coordinata alle regole di consenso di Zcash, attivata a una determinata altezza di blocco |

## FAQ

NU6 cambia il mio ZEC o la mia privacy? No. NU6 riguarda il modo in cui viene finanziato lo sviluppo e il modo in cui viene conteggiata l’emissione, non le tue transazioni o la tua privacy. I tuoi fondi e le tue transazioni schermate non subiscono effetti.

Da dove arriva il finanziamento? Dal sussidio di blocco, il nuovo ZEC emesso man mano che i blocchi vengono minati. Una quota del 20% viene indirizzata allo sviluppo invece di andare interamente ai miner.

A cosa serve il lockbox? Riserva una quota dell’emissione all’interno del protocollo così che la comunità possa decidere in seguito come usarla. NU6 ha accantonato la riserva e NU6.1 ha stabilito le regole su chi la controlla.

La regola del bilanciamento esatto cambia le mie monete? No. Richiede solo che la transazione coinbase di ciascun blocco distribuisca esattamente quanto le spetta. Influisce sulla contabilità della nuova emissione, non sui saldi esistenti.

Cosa definisce tecnicamente NU6? NU6 è distribuito tramite ZIP 253, che ne stabilisce l’attivazione sulla mainnet al blocco 2,726,400 e il suo consensus branch id. Le modifiche al consenso stesse derivano da ZIP 236, ZIP 1015 e ZIP 2001, con ZIP 207 e ZIP 214 aggiornati per adattarsi.

In cosa NU6 è diverso da NU6.1? NU6 ha ristrutturato il finanziamento e ha creato il lockbox. NU6.1 ha deciso chi controlla i fondi del lockbox e come viene suddivisa la quota riservata.

## Verifica la tua comprensione

NU6 ha istituito il Deferred Dev Fund Lockbox ma non ha detto chi lo controlla. Perché un aggiornamento dovrebbe creare una riserva e lasciare deliberatamente la sua governance a più tardi?

<details>
<summary>Risposta</summary>

Creare la riserva ha fissato il fatto che una quota dell’emissione sarebbe stata accantonata all’interno del protocollo invece di essere pagata a destinatari fissi. Decidere chi controlla quei fondi e come vengono rilasciati è una questione di governance più difficile. NU6 ha deliberatamente lasciato aperta questa domanda, e NU6.1 le ha dato risposta: l’8% del sussidio di blocco continua ad andare a Zcash Community Grants e il 12% va a un fondo controllato dai detentori di monete alimentato dal lockbox.
</details>

### Risorse

[ZIP 253: Distribuzione del Network Upgrade NU6](https://zips.z.cash/zip-0253)

[ZIP 236: I blocchi dovrebbero essere esattamente in equilibrio](https://zips.z.cash/zip-0236)

[ZIP 1015: Allocazione del sussidio di blocco per il finanziamento dello sviluppo non diretto](https://zips.z.cash/zip-1015)

[ZIP 2001: Funding stream del lockbox](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Vedi anche

[Aggiornamenti di rete di Zcash](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Politica monetaria di Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Che cosa sono ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

## Pagine correlate

| Pagina | Perché è correlata |
|---|---|
| [Canopy](./Canopy.md) | ha creato il fondo di sviluppo che NU6 ha ristrutturato |
| [NU6.1](./NU6_1.md) | ha deciso chi controlla i fondi del lockbox |
| [NU6.2](./NU6_2.md) | l'aggiornamento di riparazione d'emergenza Orchard della stessa serie |
| [Fondo di sviluppo](../start-here/development-fund) | la storia dei finanziamenti dietro la quota del 20% |

Serie: [Indice degli aggiornamenti di rete](../start-here/network-upgrades) · Precedente: [NU5](../zcash-tech/nu5) · Successivo: [NU6.1](../zcash-tech/nu6-1)
