# Zero to Zero Knowledge: Funções de hash

**Introdução à série**  
Bem-vindo a uma nova série: **Zero to Zero Knowledge**!  

Nesta série, vamos aprender os fundamentos de uma ampla gama de tecnologias que fazem parte dos nossos protocolos de preservação da privacidade.

---

## Parte 1: Funções de hash

Hoje começamos com as **funções de hash**, uma peça-chave da criptografia usada em blockchains. Mais adiante nesta série, abordaremos alguns tópicos que dependem das propriedades delas.

### O que é uma função de hash?

As funções de hash recebem uma entrada de qualquer tamanho e produzem uma saída de tamanho fixo.

- **Mensagem a ser processada pelo hash** = Entrada  
- **O algoritmo usado** = Função de hash  
- **Saída resultante** = Valor de hash  


![Diagrama de função hash](/content-images/Fn_NkFHXgAEtgse-474c24c373.webp)

### Experimente você mesmo!

Vamos entender na prática usando esta ferramenta!  
Digite qualquer texto para produzir uma saída de tamanho fixo. Observe como a saída varia de acordo com os diferentes algoritmos de hash.

**Experimente:** https://cryptii.com/pipes/hash-function

---

### Propriedades das funções de hash criptográficas

As funções de hash criptográficas devem ter estas **3 propriedades**:

1. **Unidirecional**: deve ser inviável reverter uma função de hash  
2. **Resistente a colisões**: duas entradas diferentes não podem gerar o mesmo hash  
3. **Determinística**: para qualquer entrada, uma função de hash deve sempre dar o mesmo resultado

---

### Funções de hash comuns

Existem várias classes de funções de hash. Alguns exemplos:

- Secure Hashing Algorithm (**SHA-3**)  
- Message Digest Algorithm 5 (**MD5**)  
- **BLAKE2b**: usado na derivação de chaves do Zcash

**Uma introdução ao BLAKE2**: https://www.blake2.net

---

### Usos reais das funções de hash

#### 1. Hash de integridade (verificações de integridade de dados)
As verificações de integridade de dados são um exemplo de "hash de integridade". Elas são usadas para gerar checksums de arquivos de dados e dar ao usuário a garantia de que estão corretos.

![Exemplo de hashing de integridade](/content-images/Fn_Or0MWIAI6sgx-9aab89b808.webp)

#### 2. Árvores de Merkle (árvores de hash)
Uma **árvore de hash** ou **árvore de Merkle** é composta de ramos e nós folha, rotulados com o hash criptográfico de um bloco de dados.

![Diagrama de árvore de Merkle](/content-images/Fn_O7ndWIAY5PA-8e30e442ed.webp)

As árvores de Merkle são um exemplo de **esquema de compromisso criptográfico**. A raiz da árvore é vista como um compromisso, e é possível provar que os nós folha fazem parte do compromisso original.

Elas verificam os dados armazenados ou transferidos em redes P2P, garantindo que os dados recebidos de outros participantes não foram alterados.

#### 3. Árvore de compromissos de notes no Zcash
Nos pools blindados **Sapling** e **Orchard** do Zcash, a **árvore de compromissos de notes** é usada para verificar se as transações são válidas perante o consenso, ocultando perfeitamente o remetente, o destinatário e os valores gastos.

#### 4. Hash de assinatura (blocos no estilo do Bitcoin)
O **SHA256** é um exemplo de "hash de assinatura" usado para garantir a imutabilidade de cada bloco na chain do Bitcoin. Para novos blocos, os mineradores usam o hash do bloco anterior + um hash de todas as transações do bloco atual (hashMerkleRoot) + o timestamp + um valor aleatório / a dificuldade da rede.

![Diagrama de blocos do SHA256](/content-images/Fn_PaVZXoAApHPf-936e479067.webp)

#### 5. Equihash (mineração do Zcash)
O **Equihash** é o algoritmo de hash usado na mineração do Zcash. Ele também é usado por redes como Komodo e Horizen.

**Equihash: Asymmetric Proof-of-Work Based on the Generalized Birthday Problem** (Biryukov e Khovratovich): https://eprint.iacr.org/2015/946

---

### Leitura complementar

Para entender melhor os diferentes tipos de funções de hash e seus usos, este é um excelente recurso:  
https://en.wikipedia.org/wiki/Hash_function

---

**Thread de ZecHub (@ZecHub)**  
Thread original no X: https://x.com/ZecHub/status/1621240109663227906  

---

*Esta página foi compilada a partir da thread original do Zero to Zero Knowledge para a wiki do ZecHub.*
