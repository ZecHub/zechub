# Validação de Unified Address (ZIP-316)

*Este é um guia de aprendizagem, não um decodificador empacotado nem uma biblioteca de pagamentos para copiar e colar. Ele explica como um Unified Address é estruturado para que você possa entender o que as bibliotecas mantidas fazem internamente. Para qualquer coisa que lide com fundos reais, recorra à especificação [ZIP-316](https://zips.z.cash/zip-0316) e às implementações oficiais vinculadas abaixo.*

---

## Visão geral

Um Unified Address (UA) é uma única string de endereço que inclui vários tipos de receptores: **Transparent**, **Sapling**, **Orchard** ou uma combinação. A carteira pagadora seleciona automaticamente o melhor pool de receptores compatível.

Pense em uma UA como um envelope lacrado que contém vários cartões identificados. Cada cartão representa uma forma diferente de chegar até você. Para verificar um endereço, um aplicativo deve:

1. **Abra o envelope:** Decodifique a string de texto.
2. **Desembaralhe o conteúdo:** Desfaça a mistura protetora (**F4Jumble**).
3. **Leia cada cartão:** Extraia os receptores individuais.
4. **Aplique as regras do protocolo:** Ignore ou rejeite entradas de acordo com o respectivo intervalo de typecodes.

---

## Por que apenas "decodificar Bech32m" não é suficiente

Uma UA usa a codificação de texto Bech32m, mas decodificar apenas Bech32m não revela os receptores utilizáveis.

A ZIP-316 embaralha deliberadamente a carga útil com **F4Jumble** antes da codificação. F4Jumble garante que alterar até mesmo um único caractere no endereço muda completamente o resultado decodificado. Isso evita ataques de maleabilidade de endereços, nos quais um atacante troca bytes no meio de um endereço mantendo o prefixo e o sufixo aparentemente válidos.

> **Regra fundamental:** A proteção contra maleabilidade só funciona se o seu aplicativo executar o processo completo de decodificação e validação. A decodificação parcial elimina a segurança, mantendo todo o risco.

---

## O processo de decodificação, passo a passo

### Passo 1: Decodifique Bech32m e verifique a rede
- **Parte legível para humanos (HRP):** `u` identifica a mainnet; `utest` identifica a testnet. *(As UAs da mainnet começam com `u1`, em que `1` é o separador Bech32.)*
- **Limite de comprimento:** O Bech32m padrão impõe um limite de 90 caracteres. As UAs normalmente excedem esse limite, portanto as verificações de comprimento padrão devem ser desativadas no decodificador.
- Converta as palavras Bech32m de 5 bits novamente em bytes padrão de 8 bits.

### Passo 2: Inverta F4Jumble
F4Jumble é uma rede Feistel de 4 rodadas construída sobre BLAKE2b:
- **Comprimento da metade esquerda:** `min(64, floor(length / 2))` bytes. O limite de 64 bytes corresponde ao tamanho máximo de saída de BLAKE2b. A metade direita contém a carga útil restante.
- **Funções hash:** Alterna G e H usando rótulos fixos de personalização (`UA_F4Jumble_G` e `UA_F4Jumble_H`).
- **Ordem das rodadas:** A codificação direta executa G(0) → H(0) → G(1) → H(1). A inversão (desembaralhamento) executa H(1) → G(1) → H(0) → G(0).
- **Verificação de intervalo:** Rejeite entradas fora dos limites de tamanho da carga útil da ZIP-316.

### Passo 3: Remova o preenchimento e verifique a HRP
Antes de embaralhar, o codificador acrescenta 16 bytes contendo a HRP, preenchidos com zeros.
- Remova os 16 bytes finais após desembaralhar.
- Confirme que a HRP incorporada corresponde à rede esperada (`u` ou `utest`). Isso evita que endereços da testnet sejam aceitos acidentalmente na mainnet.

### Passo 4: Extraia os receptores
A carga útil restante consiste em entradas `(typecode, length, content)`, nas quais o typecode e o comprimento são armazenados como inteiros de tamanho compacto (um único byte para valores pequenos). Typecodes de receptores conhecidos:

| Typecode | Tipo de receptor       | Comprimento do conteúdo |
| :------- | :-------------------- | :---------------------- |
| `0x00`   | Transparente (P2PKH)   | 20 bytes                |
| `0x01`   | Transparente (P2SH)    | 20 bytes                |
| `0x02`   | Sapling                | 43 bytes                |
| `0x03`   | Orchard                | 43 bytes                |

Além desses, a ZIP-316 reserva dois intervalos adicionais para compatibilidade futura:

- **`0xC0`–`0xDF` (metadados não MUST-understand):** os consumidores devem ignorar itens de metadados que não reconheçam nesse intervalo.
- **`0xE0` e `0xE1` (metadados de expiração MUST-understand atribuídos):** o registro atual da ZIP-316 atribui esses códigos à altura e ao tempo de expiração do endereço. Os consumidores devem compreender esses itens ou rejeitar o endereço.
- **`0xE2`–`0xFC` (metadados MUST-understand não atribuídos):** os consumidores devem rejeitar o endereço se encontrarem um item não reconhecido nesse intervalo.

Para tipos de receptores conhecidos, verifique se o comprimento codificado corresponde ao comprimento de conteúdo especificado pelo tipo. Para itens de metadados, use o respectivo comprimento de tamanho compacto codificado para determinar o comprimento do conteúdo. Rejeite entradas truncadas ou quaisquer bytes finais.

**Ordem preferencial de receptores.** Depois que um endereço for analisado com êxito, uma carteira ou ferramenta de pagamento deve escolher o melhor receptor nesta ordem: Orchard, depois Sapling e, por fim, transparente.

---

## Regras obrigatórias de rejeição da ZIP-316

**Decodificar com êxito não torna um endereço válido.** As carteiras oficiais do Zcash rejeitam rigorosamente endereços que violem as seguintes regras. As ferramentas web também devem rejeitá-los para evitar falhas de pagamento:

- **Receptores blindados ausentes:** O endereço **deve** conter pelo menos um receptor Sapling ou Orchard. Uma UA com apenas receptores transparentes é inválida segundo a ZIP-316.
- **Typecodes duplicados:** Cada tipo de receptor pode aparecer, no máximo, uma vez.
- **Typecodes não ordenados:** Os receptores devem aparecer em ordem de typecode estritamente crescente.
- **Receptores transparentes em conflito:** Uma UA pode incluir P2PKH ou P2SH, mas **nunca ambos**.
- **Entradas ou preenchimento malformados:** Prefixos de rede incompatíveis, cargas úteis truncadas ou comprimentos incompatíveis devem provocar rejeição imediata.
- **Typecodes não reconhecidos:** Os consumidores devem ignorar itens não reconhecidos, exceto itens no intervalo de metadados MUST-understand (`0xE0`–`0xFC`), que devem rejeitar quando não reconhecidos. No registro atual, `0xE0` e `0xE1` são tipos de expiração atribuídos, enquanto `0xE2`–`0xFC` não estão atribuídos. Independentemente disso, rejeite qualquer endereço que não cumpra as regras de validade obrigatórias acima, incluindo o requisito de um receptor Sapling ou Orchard.

---

## Boas práticas para desenvolvedores

- **Compare receptores analisados, não strings brutas.** Decodifique primeiro os endereços antes de verificar a igualdade.
- **Use bibliotecas mantidas para tudo que lide com fundos.** Compile crates Rust oficiais (como `zcash_address`) para WebAssembly em vez de implementar decodificadores JavaScript personalizados.
- **Tenha cuidado com analisadores escritos manualmente.** Se você escrever um para aprender, trate-o como um projeto de estudo e teste-o com os vetores oficiais abaixo antes de confiar qualquer coisa a ele.

---

## Especificações oficiais e implementações de referência

- **[ZIP-316: Endereços unificados e chaves de visualização](https://zips.z.cash/zip-0316)**
- **[crate zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[crate f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vetores de teste oficiais:**
  - [Vetores de teste F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vetores de teste Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossário

| Termo | Significado |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | String de endereço única que agrupa vários pools de receptores. |
| **Receiver** | Tipo específico de destino de pagamento (transparente, Sapling ou Orchard). |
| **Bech32m** | Esquema de codificação de texto usado para strings de UA. |
| **HRP** | Parte legível para humanos ou prefixo de rede (`u` ou `utest`). |
| **F4Jumble** | Algoritmo de ofuscação reversível que assegura a integridade do endereço. |
| **Typecode** | Número em cada entrada que define o tipo de receptor na carga útil. |
| **Malleability** | Modificação não autorizada dos bytes de um endereço sem detecção. |

Veja também: [Chaves de visualização](./Viewing_Keys.md)
