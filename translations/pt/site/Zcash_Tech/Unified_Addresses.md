# Validação de Unified Address (ZIP-316)

*Este é um guia de aprendizado, não um decodificador pronto nem uma biblioteca de pagamentos para copiar e colar. Ele explica como um Unified Address é estruturado para que você entenda o que as bibliotecas mantidas fazem nos bastidores. Para qualquer coisa que lide com fundos reais, siga a [especificação ZIP-316](https://zips.z.cash/zip-0316) e as implementações oficiais indicadas abaixo.*

---

## Visão geral

Um Unified Address (UA) é uma única string de endereço que contém vários tipos de receptor: **transparente**, **Sapling**, **Orchard** ou uma combinação deles. A carteira que faz o pagamento seleciona automaticamente a melhor pool de receptor que ela suporta.

Pense em um UA como um envelope lacrado com vários cartões etiquetados dentro. Cada cartão representa uma forma diferente de chegar até você. Para verificar um endereço, um aplicativo precisa:

1. **Abrir o envelope:** decodificar a string de texto.
2. **Desembaralhar o conteúdo:** desfazer o embaralhamento de proteção (**F4Jumble**).
3. **Ler cada cartão:** extrair os receptores individuais.
4. **Aplicar as regras do protocolo:** ignorar ou rejeitar entradas de acordo com a faixa do typecode.

---

## Por que "só decodificar Bech32m" não basta

Um UA usa a codificação de texto Bech32m, mas decodificar apenas o Bech32m não revela os receptores utilizáveis.

O ZIP-316 embaralha o payload deliberadamente usando o **F4Jumble** antes da codificação. O F4Jumble garante que alterar até mesmo um único caractere do endereço mude completamente a saída decodificada. Isso impede ataques de maleabilidade de endereço, nos quais um atacante troca bytes no meio de um endereço enquanto o prefixo e o sufixo continuam parecendo válidos.

> **Regra principal:** a proteção contra maleabilidade só funciona se o seu aplicativo executar o pipeline completo de decodificação e validação. Uma decodificação parcial elimina a segurança e mantém todo o risco.

---

## O pipeline de decodificação, passo a passo

### Passo 1: decodificar o Bech32m e verificar a rede
- **Parte legível por humanos (HRP):** `u` identifica a mainnet; `utest` identifica a testnet. *(UAs da mainnet começam com `u1`, onde `1` é o separador do Bech32.)*
- **Limite de comprimento:** o Bech32m padrão impõe um limite de 90 caracteres. UAs normalmente ultrapassam esse limite, então as verificações de comprimento padrão precisam ser desativadas no decodificador.
- Converta as palavras de 5 bits do Bech32m de volta para bytes padrão de 8 bits.

### Passo 2: inverter o F4Jumble
O F4Jumble é uma rede de Feistel de 4 rodadas construída sobre o BLAKE2b:
- **Comprimento da metade esquerda:** `min(64, floor(length / 2))` bytes. O limite de 64 bytes corresponde ao tamanho máximo de saída do BLAKE2b. A metade direita contém o restante do payload.
- **Funções de hash:** alterna entre G e H usando rótulos de personalização fixos (`UA_F4Jumble_G` e `UA_F4Jumble_H`).
- **Ordem das rodadas:** a codificação direta executa G(0) → H(0) → G(1) → H(1). A inversão (desembaralhamento) executa H(1) → G(1) → H(0) → G(0).
- **Verificação de faixa:** rejeite entradas fora dos limites de tamanho de payload do ZIP-316.

### Passo 3: remover o preenchimento e verificar o HRP
Antes do embaralhamento, o codificador acrescenta 16 bytes contendo o HRP, preenchidos com zeros.
- Remova os 16 bytes finais após o desembaralhamento.
- Confirme se o HRP embutido corresponde à rede esperada (`u` ou `utest`). Isso evita que endereços da testnet sejam aceitos por engano na mainnet.

### Passo 4: extrair os receptores
O payload restante consiste em entradas `(typecode, length, content)`, em que o typecode e o comprimento são armazenados como inteiros compact-size (um único byte para valores pequenos). Typecodes de receptor conhecidos:

| Typecode | Tipo de receptor    | Comprimento do conteúdo |
| :------- | :------------------ | :------------- |
| `0x00`   | Transparente (P2PKH) | 20 bytes       |
| `0x01`   | Transparente (P2SH)  | 20 bytes       |
| `0x02`   | Sapling             | 43 bytes       |
| `0x03`   | Orchard             | 43 bytes       |

Além desses, o ZIP-316 reserva mais duas faixas para compatibilidade futura:

- **`0xC0`–`0xDF` (metadados que não são MUST-understand):** os consumidores devem ignorar os itens de metadados que não reconhecem nessa faixa.
- **`0xE0` e `0xE1` (metadados de expiração MUST-understand atribuídos):** o registro atual do ZIP-316 atribui esses itens à altura e ao horário de expiração do endereço. Os consumidores devem entender esses itens ou rejeitar o endereço.
- **`0xE2`–`0xFC` (metadados MUST-understand não atribuídos):** os consumidores devem rejeitar o endereço se encontrarem um item não reconhecido nessa faixa.

Para tipos de receptor conhecidos, verifique se o comprimento codificado corresponde ao comprimento de conteúdo especificado para o tipo. Para itens de metadados, use o comprimento compact-size codificado para determinar o comprimento do conteúdo. Rejeite entradas truncadas ou quaisquer bytes sobrando no final.

**Ordem de preferência dos receptores.** Depois que um endereço é analisado com sucesso, uma carteira ou ferramenta de pagamento deve escolher o melhor receptor nesta ordem: Orchard, depois Sapling, depois transparente.

---

## Regras obrigatórias de rejeição do ZIP-316

**Decodificar com sucesso não torna um endereço válido.** As carteiras oficiais do Zcash rejeitam rigorosamente endereços que violam as regras a seguir. Ferramentas web também devem rejeitá-los para evitar falhas de pagamento:

- **Ausência de receptores blindados:** o endereço **deve** conter pelo menos um receptor Sapling ou Orchard. Um UA apenas com receptores transparentes é inválido segundo o ZIP-316.
- **Typecodes duplicados:** cada tipo de receptor pode aparecer no máximo uma vez.
- **Typecodes fora de ordem:** os receptores devem aparecer em ordem estritamente crescente de typecode.
- **Receptores transparentes conflitantes:** um UA pode conter P2PKH ou P2SH, mas **nunca os dois**.
- **Entradas ou preenchimento malformados:** prefixos de rede incompatíveis, payloads truncados ou comprimentos divergentes devem provocar rejeição imediata.
- **Typecodes não reconhecidos:** os consumidores devem ignorar itens não reconhecidos, exceto os itens na faixa de metadados MUST-understand (`0xE0`–`0xFC`), que devem ser rejeitados quando não reconhecidos. No registro atual, `0xE0` e `0xE1` são tipos de expiração atribuídos, enquanto `0xE2`–`0xFC` não estão atribuídos. Independentemente disso, rejeite qualquer endereço que não cumpra as regras obrigatórias de validade acima, incluindo a exigência de um receptor Sapling ou Orchard.

---

## Boas práticas para desenvolvedores

- **Compare receptores analisados, não strings brutas.** Decodifique os endereços antes de verificar se são iguais.
- **Use bibliotecas mantidas para qualquer coisa que lide com fundos.** Compile os crates oficiais em Rust (como `zcash_address`) para WebAssembly em vez de implantar decodificadores personalizados em JavaScript.
- **Tenha cuidado com parsers escritos à mão.** Se você escrever um para aprender, trate-o como um projeto de estudo e teste-o com os vetores oficiais abaixo antes de confiar nele para qualquer coisa.

---

## Especificações oficiais e implementações de referência

- **[ZIP-316: Unified Addresses e Viewing Keys](https://zips.z.cash/zip-0316)**
- **[Crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[Crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vetores de teste oficiais:**
  - [Vetores de teste do F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vetores de teste de Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossário

| Termo | Significado |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Uma única string de endereço que reúne várias pools de receptor. |
| **Receiver** | Tipo específico de destino de pagamento (transparente, Sapling ou Orchard). |
| **Bech32m** | Esquema de codificação de texto usado para strings de UA. |
| **HRP** | Parte legível por humanos ou prefixo de rede (`u` ou `utest`). |
| **F4Jumble** | Algoritmo de ofuscação reversível que garante a integridade do endereço. |
| **Typecode** | Número em cada entrada que define o tipo de receptor no payload. |
| **Malleability** | Modificação não autorizada dos bytes do endereço sem ser detectada. |

Veja também: [Viewing Keys](./Viewing_Keys.md)
