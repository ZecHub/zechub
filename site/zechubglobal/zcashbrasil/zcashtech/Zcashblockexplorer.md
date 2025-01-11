# Block Explorers

[Zcash Block Explorer](https://zechub.wiki/using-zcash/blockchain-explorers) é uma fonte aberta com o objetivo de atender às necessidades dos usuários Zcash que precisam de uma fonte confiável de seus dados de transações Zcash e o status da rede. Isso significa que qualquer pessoa que executa um node Zcash pode executar seu próprio Block Explorer.

## Introdução

No mundo dos negócios tradicionais, todas as transações incluem um recibo como prova de compra. Da mesma forma, no mundo blockchain, um usuário recebe um recibo digital na forma de um ID de transação para cada transação concluída. A maioria das carteiras fornecerá isso para você. Os Block Explorers são simplesmente ferramentas que permitem visualizar o que já aconteceu em uma blockchain. Eles tomam como entradas: IDs de transação, endereços ou hashes de bloco e exibem visualmente o que ocorreu.

## Exemplos

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)
    
    
- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)
    
 
- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)


- Zcash (Público): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://zcashblockexplorer.com/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)
  
  
- Zcash (Privado): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://zcashblockexplorer.com/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)


#### Observe que com a Zcash como a segunda transação tem todos os detalhes importantes ocultos, isso é importante e tem grandes implicações em um mundo digital.

---

## Blockchain Maps

Portanto, temos essa longa sequência de caracteres como um recibo digital, e agora? É aqui que usamos um Block Explorer, ou mapa, para nos ajudar a digerir o que aconteceu na blockchain. 

Observe como cada blockchain tem sua própria versão de Block Explorer acima. É importante entender que todos esses projetos blockchain são exemplos de software de código aberto. Ou seja, qualquer um pode contribuir e/ou fazer um fork do código ao seu gosto. Com esse entendimento, cada projeto se especializa em diferentes áreas e customiza o Block Explorer para atender às necessidades do referido projeto.

---

### Blocks

As transações são colocadas em *blocos*. Quando um bloco é minerado/validado, todas as transações dentro desse bloco são confirmadas e um hash de bloco é criado. Qualquer hash criado pode ser inserido em um Block Explorer. Você deve ter visto CEXs (Exchanges Centralizadas) precisando de uma série de *confirmações* antes de liberar seus fundos, esta é a métrica que eles estão usando para garantir que sua transação seja suficientemente finalizada. 

Como a blockchain determina quais transações entram no próximo bloco? Tópico de pesquisa complexo, mas a maioria das redes modernas usa a ideia de *taxas* para determinar quem fica na frente da fila. Quanto maior a taxa, maior a chance de você subir para a frente da fila.

---

### Endereços

Uma maneira divertida de aprender visualmente os Block Explorers é inserir o endereço de qualquer transação aleatória. Então você pode voltar no tempo e ver de onde os fundos foram originados!

Cada transação tem um endereço de entrada (input) e um endereço de saída (output). Armado com esta informação, pode-se avançar e retroceder prontamente em qualquer transação que tenha sido gasta. Para quem gosta de quebra-cabeças, este é o equivalente digital de um enorme quebra-cabeça financeiro e pode ser usado para fins de transparência. 

O uso de um Block Explorer torna isso não apenas muito mais fácil de visualizar, mas *também destaca* a necessidade de privacidade nas transações. A menos que você esteja usando Zcash Blindado, você pode fazer isso com *qualquer* blockchain transparente: BTC, ETH, ATOM, DOGE, VTC, etc... . Este ponto é crítico para qualquer um que use a blockchain e se mova com segurança para um futuro apenas digital.

---

### Valores

Semelhante aos endereços acima, qualquer transação em uma blockchain pública tem os valores disponíveis publicamente em exibição total. 

Isso inclui valores nos endereços de entrada e saída para qualquer transação. Uma exceção a isso é quando você escolhe usar Zcash Blindado - todos os valores ficam ocultos. Para proprietários de pequenas empresas que necessariamente precisam de privacidade para *comércio justo*, este é um grande benefício!

![valores](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)

---

### Guia Visual

Aqui estão quatro bons exemplos de diferentes Block Explorers:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcashblockexplorer](https://zechub.wiki/using-zcash/blockchain-explorers)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://github.com/user-attachments/assets/826db543-cbe7-423f-841c-2ef4720914f3)

![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)





