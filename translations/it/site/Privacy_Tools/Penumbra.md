# Penumbra 

Penumbra è una rete layer-1 proof-of-stake completamente schermata e un exchange decentralizzato nell'ecosistema Cosmos. La sua pool schermata interchain può contenere asset da chain connesse tramite IBC. Gli utenti possono trasferire, fare staking, fare scambi e fornire liquidità all'interno di Penumbra senza pubblicare i saldi dei propri singoli account o collegare queste azioni alla propria identità. Questo non significa che ogni dato della rete o del DEX sia privato.

![image.png](/content-images/_unavailable.svg)

## Tecnologia usata nella IBC di Penumbra 

Integrazione IBC: il protocollo Inter-Blockchain Communication (IBC) collega Penumbra ad altre chain abilitate a IBC. Un trasferimento IBC in entrata scherma i fondi quando entrano in Penumbra; un trasferimento in uscita rimuove la schermatura quando escono. L'attività su una chain controparte trasparente resta pubblica, incluso l'indirizzo di destinazione di un deposito in entrata. Il [confine della privacy segue il confine IBC](https://guide.penumbra.zone/overview/interchain-privacy).

Prove a conoscenza zero (ZKP): Penumbra usa prove a conoscenza zero lato client per mostrare che gli aggiornamenti di stato cifrati sono validi senza pubblicare i dati privati delle transazioni di un utente. I portafogli analizzano e decifrano localmente i dati visibili a loro; un nodo pubblico non può semplicemente restituire il saldo privato di un utente.

![image.png](/content-images/_unavailable.svg)

Exchange decentralizzato con privacy: Penumbra include un DEX per fare trading di asset all'interno della sua pool schermata. I singoli risultati degli scambi sono privati, mentre i risultati dell'esecuzione in batch e le posizioni di liquidità anonime sono pubblici. Queste distinzioni contano quando si descrive cosa nasconde l'exchange.

## Casi d'uso

Transazioni sicure: i trasferimenti all'interno della pool schermata di Penumbra proteggono mittente, destinatario, importo e tipo di asset. Gli utenti possono divulgare selettivamente la propria attività a terzi autorizzati. Condividere soltanto un indirizzo di ricezione non espone i saldi del suo proprietario. Queste proprietà non si estendono all'attività pubblica su un'altra chain dopo che i fondi sono stati prelevati.

Staking: il token di staking nativo di Penumbra è **UM**. Delegare UM a un validator restituisce token di delega che rappresentano quote nella pool di delega di quel validator. Lo stake totale nella pool di ogni validator è pubblico, mentre le singole deleghe sono anonime. La rimozione della delega crea prima token di unbonding specifici del validator, che restano esposti allo slashing fino alla fine del periodo di unbonding. Consulta la [guida allo staking schermato](https://guide.penumbra.zone/overview/staking) ufficiale.

Scambi di token: gli intenti di scambio sono raggruppati per coppia di trading ed eseguiti in batch alla fine di ogni blocco. Questo elimina l'ordinamento intra-blocco degli intenti di scambio come leva per i trader; si tratta di un meccanismo specifico, non di una garanzia che nessuna forma di MEV possa esistere. I risultati del batch vengono scritti nello stato pubblico della chain, e gli utenti rivendicano privatamente la propria quota del risultato nella pool schermata. La [guida al DEX](https://guide.penumbra.zone/overview/dex) descrive l'esecuzione in batch e l'arbitraggio automatico del protocollo.

Market making: i fornitori di liquidità creano posizioni di liquidità concentrata anonime. La liquidità delle posizioni e le funzioni di trading sono pubbliche, ma non sono collegate all'identità del fornitore.
