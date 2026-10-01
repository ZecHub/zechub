# Unified Address (ZIP-316) Validação

*Este é um guia de aprendizagem, não um descodificador empacotado nem uma biblioteca de pagamentos para copiar e colar. Explica como um Unified Address é estruturado para que possa compreender o que as bibliotecas mantidas fazem internamente. Para qualquer coisa que lide com fundos reais, recorra à especificação [ZIP-316](https://zips.z.cash/zip-0316) e às implementações oficiais associadas abaixo.*

---

## A visão geral

Um Unified Address (UA) é uma única string de endereço que inclui vários tipos de recetor: **Transparent**, **Sapling**, **Orchard** ou uma combinação. A wallet pagadora seleciona automaticamente o melhor conjunto de recetores que suporta.

Pense numa UA como um envelope selado que contém vários cartões identificados. Cada cartão representa uma forma diferente de chegar até si. Para verificar um endereço, uma aplicação deve:

1. **Abrir o envelope:** Descodificar a string de texto.
2. **Desbaralhar o conteúdo:** Desfazer a mistura protetora (**F4Jumble**).
3. **Ler cada cartão:** Extrair recetores individuais.
4. **Aplicar as regras do protocolo:** Ignorar ou rejeitar entradas de acordo com o respetivo intervalo de typecodes.

---

## Porque apenas "descodificar Bech32m" não é suficiente

Uma UA utiliza a codificação de texto Bech32m, mas descodificar apenas Bech32m não revela os recetores utilizáveis.

A ZIP-316 baralha deliberadamente a carga útil com **F4Jumble** antes da codificação. F4Jumble garante que alterar até um único caráter no endereço muda completamente o resultado descodificado. Isto evita ataques de maleabilidade de endereços, nos quais um atacante troca bytes no meio de um endereço mantendo o prefixo e o sufixo aparentemente válidos.

> **Regra fundamental:** A proteção contra maleabilidade só funciona se a sua aplicação executar o processo completo de descodificação e validação. A descodificação parcial elimina a segurança, mantendo todo o risco.

---

## O processo de descodificação, passo a passo

### Passo 1: Descodificar Bech32m e verificar a rede
- **Parte legível para humanos (HRP):** `u` identifica a mainnet; `utest` identifica a testnet. *(As UAs da mainnet começam com `u1`, onde `1` é o separador Bech32.)*
- **Limite de comprimento:** O Bech32m padrão impõe um limite de 90 carateres. As UAs excedem normalmente este limite, pelo que as verificações de comprimento padrão devem ser desativadas no descodificador.
- Converta as palavras Bech32m de 5 bits novamente em bytes padrão de 8 bits.

### Passo 2: Inverter F4Jumble
F4Jumble é uma rede Feistel de 4 rondas construída sobre BLAKE2b:
- **Comprimento da metade esquerda:** `min(64, floor(length / 2))` bytes. O limite de 64 bytes corresponde ao tamanho máximo de saída de BLAKE2b. A metade direita contém a carga útil restante.
- **Funções hash:** Alterna G e H utilizando etiquetas de personalização fixas (`UA_F4Jumble_G` e `UA_F4Jumble_H`).
- **Ordem das rondas:** A codificação direta executa G(0) → H(0) → G(1) → H(1). A inversão (desbaralhamento) executa H(1) → G(1) → H(0) → G(0).
- **Verificação de intervalo:** Rejeite entradas fora dos limites de tamanho da carga útil da ZIP-316.

### Passo 3: Remover o preenchimento e verificar a HRP
Antes de baralhar, o codificador acrescenta 16 bytes contendo a HRP, preenchidos com zeros.
- Remova os 16 bytes finais após desbaralhar.
- Confirme que a HRP incorporada corresponde à rede esperada (`u` ou `utest`). Isto evita que endereços da testnet sejam aceites acidentalmente na mainnet.

### Passo 4: Extrair recetores
A carga útil restante consiste em entradas `(typecode, length, content)`, nas quais o typecode e o comprimento são armazenados como inteiros de tamanho compacto (um único byte para valores pequenos). Typecodes de recetor conhecidos:

| Typecode | Tipo de recetor       | Comprimento do conteúdo |
| :------- | :-------------------- | :---------------------- |
| `0x00`   | Transparent (P2PKH)   | 20 bytes                |
| `0x01`   | Transparent (P2SH)    | 20 bytes                |
| `0x02`   | Sapling               | 43 bytes                |
| `0x03`   | Orchard               | 43 bytes                |

Para além destes, a ZIP-316 reserva dois intervalos adicionais para compatibilidade futura:

- **`0xC0`–`0xDF` (metadados não MUST-understand):** os consumidores devem ignorar itens de metadados que não reconheçam neste intervalo.
- **`0xE0` e `0xE1` (metadados de expiração MUST-understand atribuídos):** o registo atual da ZIP-316 atribui-os à altura e ao tempo de expiração do endereço. Os consumidores devem compreender estes itens ou rejeitar o endereço.
- **`0xE2`–`0xFC` (metadados MUST-understand não atribuídos):** os consumidores devem rejeitar o endereço se encontrarem um item não reconhecido neste intervalo.

Para tipos de recetor conhecidos, verifique se o comprimento codificado corresponde ao comprimento de conteúdo especificado pelo tipo. Para itens de metadados, utilize o respetivo comprimento de tamanho compacto codificado para determinar o comprimento do conteúdo. Rejeite entradas truncadas ou quaisquer bytes finais.

**Ordem preferencial de recetores.** Depois de um endereço ser analisado com êxito, uma wallet ou ferramenta de pagamento deve escolher o melhor recetor nesta ordem: Orchard, depois Sapling, e depois transparent.

---

## Regras de rejeição obrigatória da ZIP-316

**Descodificar com êxito não torna um endereço válido.** As wallets oficiais Zcash rejeitam rigorosamente endereços que violem as seguintes regras. As ferramentas web também devem rejeitá-los para evitar falhas de pagamento:

- **Recetores blindados em falta:** O endereço **tem** de conter pelo menos um recetor Sapling ou Orchard. Uma UA com apenas recetores transparent é inválida ao abrigo da ZIP-316.
- **Typecodes duplicados:** Cada tipo de recetor pode aparecer, no máximo, uma vez.
- **Typecodes não ordenados:** Os recetores devem aparecer por ordem de typecode estritamente ascendente.
- **Recetores transparent em conflito:** Uma UA pode incluir P2PKH ou P2SH, mas **nunca ambos**.
- **Entradas ou preenchimento malformados:** Prefixos de rede incompatíveis, cargas úteis truncadas ou comprimentos incompatíveis devem provocar rejeição imediata.
- **Typecodes não reconhecidos:** Os consumidores devem ignorar itens não reconhecidos, exceto itens no intervalo de metadados MUST-understand (`0xE0`–`0xFC`), que devem rejeitar quando não reconhecidos. No registo atual, `0xE0` e `0xE1` são tipos de expiração atribuídos, enquanto `0xE2`–`0xFC` não estão atribuídos. Independentemente disso, rejeite qualquer endereço que não cumpra as regras de validade obrigatórias acima, incluindo o requisito de um recetor Sapling ou Orchard.

---

## Boas práticas para programadores

- **Compare recetores analisados, não strings brutas.** Descodifique primeiro os endereços antes de verificar a igualdade.
- **Utilize bibliotecas mantidas para tudo o que lide com fundos.** Compile crates Rust oficiais (como `zcash_address`) para WebAssembly em vez de implementar descodificadores JavaScript personalizados.
- **Tenha cuidado com analisadores escritos manualmente.** Se escrever um para aprender, trate-o como um projeto de estudo e teste-o com os vetores oficiais abaixo antes de lhe confiar qualquer coisa.

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
| **Unified Address (UA)** | String de endereço única que agrupa vários conjuntos de recetores. |
| **Receiver** | Tipo específico de destino de pagamento (transparent, Sapling ou Orchard). |
| **Bech32m** | Esquema de codificação de texto utilizado para strings de UA. |
| **HRP** | Parte legível para humanos ou prefixo de rede (`u` ou `utest`). |
| **F4Jumble** | Algoritmo de ofuscação reversível que assegura a integridade do endereço. |
| **Typecode** | Número em cada entrada que define o tipo de recetor na carga útil. |
| **Malleability** | Modificação não autorizada dos bytes de um endereço sem deteção. |

Veja também: [Chaves de visualização](./Viewing_Keys.md)
