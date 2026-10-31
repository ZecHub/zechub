<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Exploradores de blockchain

## Introdução

No mundo empresarial tradicional, cada transação inclui um recibo como comprovante de compra. Da mesma forma, no mundo da blockchain, um usuário recebe um recibo digital na forma de um ID de transação para cada transação concluída. A maioria das carteiras o fornece. Os exploradores de blockchain são simplesmente ferramentas que permitem visualizar o que já aconteceu em uma blockchain. Eles recebem como entrada IDs de transação, endereços ou hashes de blocos e apresentam visualmente o que ocorreu.

## Exemplos
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (pública): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (privada): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Repare que, com o Zcash, a segunda transação tem todos os detalhes importantes ocultos; isso é importante e tem grandes implicações em um mundo digital.


## Mapas de blockchain

Temos então esta longa sequência de caracteres como recibo digital; e agora? É aqui que usamos um [explorador de blockchain](https://nym.com/blog/using-blockchain-privately), ou mapa, para nos ajudar a entender o que aconteceu na blockchain. Repare como cada chain tem sua própria versão de [explorador de blockchain](https://nym.com/blog/using-blockchain-privately) acima. É importante entender que todos esses projetos de blockchain são exemplos de software de código aberto. Ou seja, qualquer pessoa pode contribuir para o código e/ou fazer fork dele como quiser. Com isso em mente, cada projeto se especializa em áreas diferentes e personaliza o explorador de blockchain para atender às necessidades desse projeto.

### Blocos
As transações são colocadas em *blocos*. Quando um bloco é minerado/validado, cada transação dentro desse bloco é confirmada e um hash de bloco é criado. Qualquer hash criado pode ser inserido em um explorador de blocos. Você pode ter visto CEXs precisando de um número de *confirmações* antes de liberarem seus fundos; essa é a métrica que usam para garantir que sua transação está 
suficientemente finalizada. Como a blockchain determina quais transações entram no próximo bloco? É um tema de pesquisa complexo, mas a maioria das chains modernas usa a ideia de *taxas* para determinar quem passa para a frente da fila. Quanto maior for a taxa, maior será a probabilidade de avançar para a frente da fila.

### Endereços

Uma forma divertida de aprender visualmente sobre [exploradores de blockchain](https://nym.com/blog/using-blockchain-privately) é inserir o endereço de uma transação aleatória. Depois, você pode voltar no tempo e ver onde os fundos tiveram origem! Cada transação tem um endereço de entrada e um endereço de saída.  Com esta informação, você pode avançar e voltar facilmente a partir de qualquer transação que tenha sido gasta. Para quem gosta de quebra-cabeças, este é o equivalente digital de um enorme quebra-cabeça financeiro e pode ser usado para fins de transparência. Usar um explorador de blockchain não só torna isso muito mais fácil de visualizar, como *também destaca* a necessidade de privacidade nas transações. A menos que esteja usando Zcash blindado, você pode fazer isso com *qualquer* blockchain transparente: BTC, ETH, ATOM, DOGE, VTC, etc. ... . Este ponto é essencial para qualquer pessoa que use a blockchain de forma segura em uma transição para um futuro exclusivamente digital.

### Montantes

Assim como ocorre com os endereços acima, qualquer transação em uma blockchain pública exibe publicamente os montantes em destaque. Isso inclui os montantes nos endereços de entrada e de saída de qualquer transação. Uma exceção ocorre quando você escolhe usar Zcash blindado -- nesse caso, todos os montantes ficam ocultos. Para proprietários de pequenas empresas que precisam de privacidade para um *comércio justo*, isso é uma enorme vantagem!

![Valores](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### O que um explorador pode e não pode ver no Zcash

#### TL;DR
- Os endereços transparentes (`t`) são totalmente visíveis em um explorador, assim como no Bitcoin
- As transações totalmente blindadas (z para z) ocultam o montante, os endereços e o memorando
- A taxa continua visível, mesmo em uma transação totalmente blindada
- A blindagem (mover de `t` para blindado) e a remoção da blindagem (blindado de volta para `t`) são parcialmente visíveis, pois um dos lados é transparente
- A privacidade se mantém apenas enquanto os fundos permanecem dentro dos pools blindados

O Zcash tem mais de um tipo de endereço, e um explorador os trata de formas muito diferentes.

Os endereços transparentes, que começam por `t`, funcionam como no Bitcoin. Um explorador mostra o remetente, o destinatário, o montante e o rastro até a origem dos fundos.

Os endereços blindados constituem o lado privado. Os fundos nos [pools blindados](https://zechub.wiki/using-zcash/shielded-pools#content) Sapling ou Orchard são protegidos por provas de conhecimento zero. Procure uma transação totalmente blindada e o explorador não conseguirá mostrar o montante, os endereços ou o memorando. Ele só pode confirmar que ocorreu uma transação válida e que ela foi registrada em um bloco. Este é o exemplo privado oculto mostrado perto do topo desta página.

Um detalhe permanece visível mesmo nas transações totalmente blindadas: a taxa. As regras de consenso do Zcash exigem que a taxa transparente seja indicada explicitamente, pelo que um explorador pode sempre mostrá-la, mesmo quando os montantes estão ocultos. Por esse motivo, é boa prática usar a taxa padrão da carteira, para que sua transação não se destaque por pagar um montante incomum.

O explorador também pode ver quando os fundos atravessam os lados transparente e blindado. Mover fundos `t` para um pool é blindagem; movê-los novamente para fora é remoção da blindagem. Essas passagens são parcialmente visíveis porque um dos lados é transparente. Apenas a atividade privada z para z, que nunca toca em um endereço `t`, mantém tudo oculto exceto a taxa.

A conclusão: a privacidade depende de permanecer dentro dos pools blindados. Assim que os fundos tocam em um endereço `t`, essa parte do seu histórico é tão pública quanto no Bitcoin. Para comprovar sua própria atividade blindada a alguém de sua escolha, como um contador, compartilhe uma chave de visualização em vez de torná-la pública. Consulte a página sobre [Chaves de visualização](https://zechub.wiki/zcash-tech/viewing-keys#content).


### Lista de exploradores de blocos do Zcash

- [Explorador de blocos do Zcash](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)


- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([rede de teste](https://sochain.com/zectest))

### Guia visual

Aqui estão quatro bons exemplos de diferentes exploradores de blockchain:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Explorador de blocos do Zcash](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
