# Do Zero ao Conhecimento Zero: Frases-semente Mnemônicas

**Série:** Do Zero ao Conhecimento Zero

As frases-semente mnemônicas sustentam um dos aspectos mais importantes das criptomoedas - a **autocustódia**.  
Hoje vamos aprender como uma frase-semente é gerada e usada em carteiras.

---

## O que são Frases-semente Mnemônicas?

As frases de recuperação são definidas pela especificação **BIP-39**, o tipo mais comum de frase de recuperação usado atualmente.

A criação de frases de recuperação começa pela geração de **aleatoriedade**. Mais entropia significa maior segurança. **128 bits** de entropia são considerados suficientes para a maioria dos usuários.

![Conceito de frase-semente](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

Dependendo do comprimento da entropia inicial, a frase de recuperação terá de **12 a 24 palavras**.

---

## Passo a passo: Como uma Frase-semente de 12 Palavras é Gerada

### 1. Gerar Entropia
Começamos gerando **128 bits** de entropia.

### 2. Adicionar Checksum
Aplicamos hash à entropia usando **SHA256**. Os primeiros bits desse hash se tornam o checksum.  
Isso nos dá uma impressão digital única para nossa entropia.

![Diagrama de Entropia + Checksum](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. Dividir em blocos de 11 bits
O total de 132 bits (128 de entropia + 4 de checksum) é separado em blocos de 11 bits.

### 4. Mapear para a Lista de Palavras
Cada sequência de 11 bits é convertida em um número decimal (0-2047).  
As listas de palavras BIP-39 contêm exatamente **2048 palavras** (inglês, espanhol, chinês etc.).

Esses números são usados para encontrar a palavra correspondente na lista de palavras.

![Exemplo de mapeamento de palavras](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**Resultado:** Agora temos uma frase de recuperação segura, legível por humanos, com 12 palavras!

---

## Da Frase de Recuperação -> Seed -> Endereços de Pagamento

Usando a frase de recuperação, uma carteira pode gerar chaves para criar endereços de pagamento e diferentes contas de carteira.

As chaves geradas são **determinísticas** - a mesma entrada sempre produz a mesma saída.

### Geração da Seed
A seed da carteira é derivada da frase mnemônica usando uma **Função de Derivação de Chaves (KDF)**:

- Em **Bitcoin**: PBKDF2  
- Em **Zcash**: Blake2b-256/512

Isso produz uma seed de **64 bytes (512 bits)**.

![Seed para chaves mestras](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### Chaves Mestras
A seed é dividida em duas sequências de 32 bytes:
- **Chave Mestra de Gasto**
- **Código de Cadeia Mestre**

Elas são usadas em **Carteiras Determinísticas Hierárquicas (HD Wallets)** para a derivação de chaves filhas.

---

## Recursos Específicos do Zcash (ZIP-32)

No Zcash, a **autoridade de visualização** ou **autoridade de gasto** pode ser delegada independentemente para subárvores sem comprometer a seed mestra.

**ZIP-32** define o padrão de geração de chaves determinísticas hierárquicas adaptado aos recursos de privacidade do Zcash.

A partir de uma **Expanded Spending Key** derivamos:
- Full Viewing Key
- Incoming Viewing Key
- Conjunto de endereços de pagamento

Diferentes mecanismos de derivação produzem endereços externos adequados para serem fornecidos a remetentes em pools blindadas (Sapling & Orchard).

![Hierarquia de derivação de chaves do Zcash](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

O Zcash também oferece suporte a **endereços internos** para operações da carteira, como Auto-Shielding.

---

## Recursos

- [ZIP-32: Carteiras Determinísticas Hierárquicas Blindadas](https://zips.z.cash/zip-0032)  
- [Especificação do Protocolo Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Visão geral das carteiras blindadas por padrão](https://zechub.wiki)

---

**Tópico original por ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Esta página foi compilada a partir do tópico original Zero to Zero Knowledge para a wiki do ZecHub.*
