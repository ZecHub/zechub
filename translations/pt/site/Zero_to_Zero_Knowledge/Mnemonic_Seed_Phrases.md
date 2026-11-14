# Zero to Zero Knowledge: Frases semente mnemônicas

**Série:** Zero to Zero Knowledge

As frases semente mnemônicas sustentam um dos aspectos mais importantes das criptomoedas: a **autocustódia**.  
Hoje vamos aprender como uma frase semente é gerada e usada nas carteiras.

---

## O que são frases semente mnemônicas?

As frases de recuperação são definidas pela especificação **BIP-39**, o tipo de frase de recuperação mais comum usado hoje.

A criação das frases de recuperação começa com a geração de **aleatoriedade**. Quanto mais entropia, maior a segurança. **128 bits** de entropia são considerados suficientes para a maioria dos usuários.

![Conceito de frase semente](/content-images/FooM3qWWACgrwzn-f222c4081f.webp)

Dependendo do tamanho da entropia inicial, a frase de recuperação terá de **12 a 24 palavras**.

---

## Passo a passo: como uma frase semente de 12 palavras é gerada

### 1. Gerar entropia
Começamos gerando **128 bits** de entropia.

### 2. Adicionar o checksum
Calculamos o hash da entropia usando **SHA256**. Os primeiros bits desse hash se tornam o checksum.  
Isso nos dá uma impressão digital única para a nossa entropia.

![Diagrama de entropia + checksum](/content-images/FooNoOEXgAAu-g6-613238fa7e.webp)

### 3. Dividir em blocos de 11 bits
Os 132 bits no total (128 de entropia + 4 de checksum) são separados em blocos de 11 bits.

### 4. Mapear para a lista de palavras
Cada sequência de 11 bits é convertida em um número decimal (0-2047).  
As listas de palavras do BIP-39 contêm exatamente **2048 palavras** (inglês, espanhol, chinês etc.).

Esses números são usados para encontrar a palavra correspondente na lista de palavras.

![Exemplo de mapeamento de palavras](/content-images/FooN9rfXEBoQuU2-d11331fc0a.webp)

**Resultado:** agora temos uma frase de recuperação de 12 palavras segura e legível por humanos!

---

## Da frase de recuperação -> semente -> endereços de pagamento

Usando a frase de recuperação, uma carteira pode gerar chaves para criar endereços de pagamento e diferentes contas da carteira.

As chaves geradas são **determinísticas**: a mesma entrada sempre produz a mesma saída.

### Geração da semente
A semente da carteira é derivada da frase mnemônica usando uma **função de derivação de chave (KDF)**:

- No **Bitcoin**: PBKDF2  
- No **Zcash**: Blake2b-256/512

Isso produz uma semente de **64 bytes (512 bits)**.

![Da semente às chaves mestras](/content-images/FooOuumXEAgcBm1-dc7c66b84a.webp)

### Chaves mestras
A semente é dividida em duas sequências de 32 bytes:
- **Chave de gastos mestra**
- **Código de chain mestre**

Elas são usadas em **carteiras hierárquicas determinísticas (HD)** para a derivação de chaves filhas.

---

## Recursos específicos do Zcash (ZIP-32)

No Zcash, a **autoridade de visualização** ou a **autoridade de gasto** pode ser delegada de forma independente para subárvores sem comprometer a semente mestra.

O **ZIP-32** define o padrão de geração de chaves hierárquicas determinísticas adaptado aos recursos de privacidade do Zcash.

A partir de uma **chave de gastos expandida**, derivamos:
- Full Viewing Key
- Incoming Viewing Key
- Conjunto de endereços de pagamento

Diferentes mecanismos de derivação produzem endereços externos adequados para fornecer a remetentes nos pools blindados (Sapling e Orchard).

![Hierarquia de derivação de chaves do Zcash](/content-images/FooPKd4XEBUQhJ6-af133c01bf.webp)

O Zcash também suporta **endereços internos** para operações da carteira, como a blindagem automática.

---

## Recursos

- [ZIP-32: carteiras hierárquicas determinísticas blindadas](https://zips.z.cash/zip-0032)  
- [Especificação do protocolo Zcash (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Visão geral das carteiras blindadas por padrão](https://zechub.wiki)

---

**Thread original de ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1624125037945946145

---

*Esta página foi compilada a partir da thread original do Zero to Zero Knowledge para a wiki do ZecHub.*
