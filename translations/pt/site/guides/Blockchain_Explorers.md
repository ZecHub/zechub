<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exploradores de Blockchain

## Introdução

No mundo empresarial tradicional, cada transação inclui um recibo como comprovativo de compra. Da mesma forma, no mundo da blockchain, um utilizador recebe um recibo digital sob a forma de um ID de transação por cada transação concluída. A maioria das wallets fornece-o. Os exploradores de blockchain são simplesmente ferramentas que permitem visualizar o que já aconteceu numa blockchain. Recebem como dados de entrada: IDs de transação, endereços ou hashes de blocos, e apresentam visualmente o que ocorreu.

## Exemplos
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pública): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privada): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Repare que, com Zcash, a segunda transação tem todos os detalhes importantes ocultos; isto é importante e tem grandes implicações num mundo digital.


## Mapas de Blockchain

Temos então esta longa sequência de caracteres como recibo digital; e agora? É aqui que usamos um [explorador de blockchain](https://nym.com/blog/using-blockchain-privately), ou mapa, para nos ajudar a compreender o que aconteceu na blockchain. Repare como cada cadeia tem a sua própria versão de [explorador de blockchain](https://nym.com/blog/using-blockchain-privately) acima. É importante compreender que todos estes projetos de blockchain são exemplos de software de código aberto. Ou seja, qualquer pessoa pode contribuir para o código e/ou fazer fork dele conforme entender. Com isto em mente, cada projeto especializa-se em áreas diferentes e personaliza o explorador de blockchain para satisfazer as necessidades desse projeto.

### Blocos
As transações são colocadas em *blocos*. Quando um bloco é minerado/validado, cada transação dentro desse bloco é confirmada e é criado um hash de bloco. Qualquer hash criado pode ser introduzido num explorador de blocos. Poderá ter visto CEXs a necessitarem de um número de *confirmações* antes de libertarem os seus fundos; esta é a métrica que utilizam para garantir que a sua transação está 
suficientemente finalizada. Como determina a blockchain quais as transações que entram no próximo bloco? É um tema de investigação complexo, mas a maioria das cadeias modernas usa a ideia de *taxas* para determinar quem passa para a frente da fila. Quanto mais elevada for a taxa, maior será a probabilidade de avançar para a frente da fila.

### Endereços

Uma forma divertida de aprender visualmente sobre [exploradores de blockchain](https://nym.com/blog/using-blockchain-privately) é introduzir o endereço de uma transação aleatória. Depois, pode recuar no tempo e ver onde os fundos tiveram origem! Cada transação tem um endereço de entrada e um endereço de saída.  Com esta informação, pode avançar e recuar facilmente a partir de qualquer transação que tenha sido gasta. Para quem gosta de puzzles, este é o equivalente digital de um enorme puzzle financeiro e pode ser utilizado para fins de transparência. Usar um explorador de blockchain não só torna isto muito mais fácil de visualizar, como *também destaca* a necessidade de privacidade nas transações. A menos que esteja a usar Zcash blindado, pode fazer isto com *qualquer* blockchain transparente: BTC, ETH, ATOM, DOGE, VTC, etc. ... . Este ponto é essencial para qualquer pessoa que utilize a blockchain de forma segura numa transição para um futuro exclusivamente digital.

### Montantes

Tal como acontece com os endereços acima, qualquer transação numa blockchain pública apresenta publicamente os montantes em destaque. Isto inclui os montantes nos endereços de entrada e de saída de qualquer transação. Uma exceção ocorre quando escolhe utilizar Zcash blindado -- nesse caso, todos os montantes ficam ocultos. Para proprietários de pequenas empresas que necessitam de privacidade para um *comércio justo*, isto é uma enorme vantagem!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### O que um explorador pode e não pode ver no Zcash

#### TL;DR
- Os endereços transparentes (`t`) são totalmente visíveis num explorador, tal como no Bitcoin
- As transações totalmente blindadas (z para z) ocultam o montante, os endereços e o memo
- A taxa continua visível, mesmo numa transação totalmente blindada
- A blindagem (mover de `t` para blindado) e a remoção da blindagem (blindado de volta para `t`) são parcialmente visíveis, pois um dos lados é transparente
- A privacidade mantém-se apenas enquanto os fundos permanecem dentro dos pools blindados

Zcash tem mais do que um tipo de endereço, e um explorador trata-os de formas muito diferentes.

Os endereços transparentes, que começam por `t`, funcionam como no Bitcoin. Um explorador mostra o remetente, o destinatário, o montante e o rasto até à origem dos fundos.

Os endereços blindados constituem o lado privado. Os fundos nos [pools blindados](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard são protegidos por provas de conhecimento zero. Procure uma transação totalmente blindada e o explorador não conseguirá mostrar o montante, os endereços ou o memo. Só pode confirmar que ocorreu uma transação válida e que esta foi registada num bloco. Este é o exemplo privado oculto mostrado perto do topo desta página.

Um detalhe permanece visível mesmo nas transações totalmente blindadas: a taxa. As regras de consenso do Zcash exigem que a taxa transparente seja indicada explicitamente, pelo que um explorador pode sempre mostrá-la, mesmo quando os montantes estão ocultos. Por esse motivo, é boa prática usar a taxa padrão da wallet, para que a sua transação não se destaque por pagar um montante invulgar.

O explorador também pode ver quando os fundos atravessam os lados transparente e blindado. Mover fundos `t` para um pool é blindagem; movê-los novamente para fora é remoção da blindagem. Essas passagens são parcialmente visíveis porque um dos lados é transparente. Apenas a atividade privada z para z, que nunca toca num endereço `t`, mantém tudo oculto exceto a taxa.

A conclusão: a privacidade depende de permanecer dentro dos pools blindados. Assim que os fundos tocam num endereço `t`, essa parte do seu histórico é tão pública como no Bitcoin. Para comprovar a sua própria atividade blindada a alguém da sua escolha, como um contabilista, partilhe uma viewing key em vez de a tornar pública. Consulte a página sobre [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Lista de Exploradores de Blocos Zcash

- [Explorador de Blocos Zcash](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### Guia Visual

Aqui estão quatro bons exemplos de diferentes exploradores de blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorador de Blocos Zcash](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
