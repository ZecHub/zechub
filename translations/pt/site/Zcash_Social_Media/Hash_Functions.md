# Do Zero ao Conhecimento Zero: Funções Hash

**Introdução à Série**  
Bem-vindo a uma nova série: **Do Zero ao Conhecimento Zero**!  

Nesta série, aprenderemos os fundamentos de uma ampla gama de tecnologias que compõem nossos protocolos de preservação da privacidade.

---

## Parte 1: Funções Hash

Hoje começamos com **Funções Hash** - uma peça-chave da criptografia usada em blockchains. Mais adiante nesta série, abordaremos alguns tópicos que dependem de suas propriedades.

### O que é uma Função Hash?

Funções Hash recebem uma entrada de qualquer comprimento e produzem uma saída de comprimento fixo.

- **Mensagem a ser submetida ao hash** = Entrada  
- **O algoritmo que é usado** = Função Hash  
- **Saída resultante** = Valor Hash  


![diagrama de Função Hash](https://pbs.twimg.com/media/Fn_NkFHXgAEtgse.png)

### Experimente você mesmo!

Vamos obter uma compreensão prática usando esta ferramenta!  
Insira qualquer texto arbitrário para produzir uma saída de comprimento fixo. Observe como a saída varia dependendo do algoritmo de hash diferente.

**Experimente:** https://cryptii.com/pipes/hash-function

---

### Propriedades das Funções Hash Criptográficas

Funções Hash criptográficas devem ter estas **3 propriedades**:

1. **Unidirecional** - Deve ser inviável reverter uma função hash  
2. **Resistente a colisões** - Duas entradas diferentes não devem gerar a mesma saída de hash  
3. **Determinística** - Para qualquer entrada, uma função hash deve sempre fornecer o mesmo resultado

---

### Funções Hash Comuns

Existem várias classes de Funções Hash. Alguns exemplos:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Usado na derivação de chaves do Zcash

**Uma introdução ao BLAKE2 por Zooko**: https://www.zfnd.org/blog/blake2/

---

### Usos das Funções Hash no Mundo Real

#### 1. Hashing de Integridade (Verificações de Integridade de Dados)
Verificações de integridade de dados são um exemplo de "Hashing de Integridade". Elas são usadas para gerar checksums em arquivos de dados e fornecer garantia de correção ao usuário.

![exemplo de Hashing de Integridade](https://pbs.twimg.com/media/Fn_Or0MWIAI6sgx.png)

#### 2. Árvores de Merkle (Árvores Hash)
Uma **árvore hash** ou **árvore de Merkle** é composta por ramos e nós-folha que são rotulados com o hash criptográfico de um bloco de dados.

![diagrama de Árvore de Merkle](https://pbs.twimg.com/media/Fn_O7ndWIAY5PA-.jpg)

Árvores de Merkle são um exemplo de um **esquema de compromisso criptográfico**. A raiz da árvore é vista como um compromisso, e prova-se que os nós-folha fazem parte do compromisso original.

Elas verificam dados armazenados ou transferidos em redes P2P, garantindo que os dados recebidos de pares não foram alterados.

#### 3. Árvore de Compromisso de Notas no Zcash
Nas pools blindadas **Sapling** e **Orchard** do Zcash, a **Note Commitment Tree** é usada para verificar se as transações são válidas de acordo com o consenso, ao mesmo tempo em que oculta perfeitamente o remetente, o destinatário e os valores consumidos.

#### 4. Hash de Assinatura (blocos no estilo Bitcoin)
**SHA256** é um exemplo de "hash de assinatura" usado para impor a imutabilidade de cada bloco na cadeia do Bitcoin. Os mineradores usam o hash do bloco anterior + um hash de todas as transações no bloco atual (hashMerkleRoot) + timestamp + valor aleatório / dificuldade da rede para novos blocos.

![diagrama de bloco SHA256](https://pbs.twimg.com/media/Fn_PaVZXoAApHPf.jpg)

#### 5. Equihash (Mineração de Zcash)
**Equihash** é o algoritmo de hash usado na mineração de Zcash. Ele também é usado por redes como Komodo e Horizen.

**Blog original do Zcash sobre Equihash**: https://electriccoin.co/blog/equihash/

---

### Leitura Adicional

Para construir uma compreensão maior dos diferentes tipos de funções hash e seus usos associados, este é um excelente recurso:  
https://en.wikipedia.org/wiki/Hash_function

---

**Thread do ZecHub (@ZecHub)**  
Thread original no X: https://x.com/ZecHub/status/1621240109663227906  

---

*Esta página foi compilada a partir da thread original Do Zero ao Conhecimento Zero para a wiki do ZecHub.*
