# Zero to Zero Knowledge: funções hash

**Introdução à série**  
Boas-vindas a uma nova série: **Zero to Zero Knowledge**!  

Nesta série, aprenderemos os fundamentos de uma ampla gama de tecnologias que compõem nossos protocolos de preservação da privacidade.

---

## Parte 1: funções hash

Hoje começamos com **funções hash** - uma peça-chave da criptografia usada em blockchains. Mais adiante nesta série, abordaremos alguns tópicos que dependem de suas propriedades.

### O que é uma função hash?

Funções hash recebem uma entrada de qualquer comprimento e produzem uma saída de comprimento fixo.

- **Mensagem a ser submetida ao hash** = Entrada  
- **O algoritmo usado** = Função hash  
- **Saída resultante** = Valor hash  


![Diagrama de função hash](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Experimente você mesmo!

Tenha uma compreensão prática usando esta ferramenta!  
Insira qualquer texto arbitrário para produzir uma saída de comprimento fixo. Observe como a saída varia dependendo do algoritmo de hash escolhido.

**Experimente:** https://cryptii.com/pipes/hash-function

---

### Propriedades das funções hash criptográficas

Funções hash criptográficas devem ter estas **3 propriedades**:

1. **Unidirecional** - Deve ser inviável reverter uma função hash  
2. **Resistente a colisões** - Duas entradas diferentes não devem gerar a mesma saída de hash  
3. **Determinística** - Para qualquer entrada, uma função hash deve sempre fornecer o mesmo resultado

---

### Funções hash comuns

Existem várias classes de funções hash. Alguns exemplos:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b** - Usado na derivação de chaves do Zcash

**Uma introdução ao BLAKE2**: https://www.blake2.net

---

### Usos de funções hash no mundo real

#### 1. Hashing de integridade (verificações de integridade de dados)
Verificações de integridade de dados são um exemplo de "hashing de integridade". Elas são usadas para gerar checksums em arquivos de dados e fornecer garantia de correção ao usuário.

![Exemplo de hashing de integridade](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Árvores de Merkle (árvores hash)
Uma **árvore hash** ou **árvore de Merkle** é composta por ramos e nós-folha rotulados com o hash criptográfico de um bloco de dados.

![Diagrama de árvore de Merkle](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

Árvores de Merkle são um exemplo de um **esquema de compromisso criptográfico**. A raiz da árvore é vista como um compromisso, e prova-se que os nós-folha fazem parte do compromisso original.

Elas verificam dados armazenados ou transferidos em redes P2P, garantindo que os dados recebidos de pares não foram alterados.

#### 3. Árvore de compromisso de notes no Zcash
Nas pools blindadas **Sapling** e **Orchard** do Zcash, a **Note Commitment Tree** é usada para verificar se as transações são válidas de acordo com o consenso, ao mesmo tempo em que oculta perfeitamente o remetente, o destinatário e os valores consumidos.

#### 4. Hash de assinatura (blocos no estilo Bitcoin)
**SHA256** é um exemplo de "hash de assinatura" usado para impor a imutabilidade de cada bloco na chain do Bitcoin. Os mineradores usam o hash do bloco anterior + um hash de todas as transações no bloco atual (hashMerkleRoot) + timestamp + valor aleatório / dificuldade da rede para novos blocos.

![Diagrama de bloco SHA256](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (mineração de Zcash)
**Equihash** é o algoritmo de hash usado na mineração de Zcash. Ele também é usado por redes como Komodo e Horizen.

**Equihash: Asymmetric Proof-of-Work Based on the Generalized Birthday Problem** (Biryukov e Khovratovich): https://eprint.iacr.org/2015/946

---

### Leitura adicional

Para ter uma compreensão maior dos diferentes tipos de funções hash e seus usos associados, este é um excelente recurso:  
https://en.wikipedia.org/wiki/Hash_function

---

**Thread do ZecHub (@ZecHub)**  
Thread original no X: https://x.com/ZecHub/status/1621240109663227906  

---

*Esta página foi compilada a partir da thread original Zero to Zero Knowledge para a wiki do ZecHub.*
