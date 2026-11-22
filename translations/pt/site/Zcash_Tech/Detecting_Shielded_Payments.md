# Detectando pagamentos blindados: quanto custa fazer a varredura

Uma empresa que aceita ZEC blindados precisa encontrar seus pagamentos recebidos. No pool transparente, isso é uma consulta a um índice. Nos pools blindados, ninguém consegue indexar pagamentos por endereço; por isso, a carteira ou o backend precisa testar cada saída blindada na chain com as próprias chaves. Esta página explica como isso funciona, quanto custa e como escolher um projeto de contas que mantenha o custo sob controle.

## Resumo

* O custo de detecção de pagamentos blindados cresce com o número de **chaves de visualização** que você monitora, não com o número de endereços que você fornece
* Uma conta pode emitir um **endereço diversificado** novo e não vinculável para cada cliente ou fatura sem custo extra de varredura
* Uma chave de visualização revela a **conta inteira**. Se um auditor precisar ver apenas um cliente, esse cliente precisará da própria conta, e cada conta acrescenta trabalho de varredura em cada bloco
* Dimensione o scanner para **blocos cheios**, não para a média. A mainnet já produz sequências de blocos quase cheios
* Meça o custo por tentativa no seu próprio hardware antes de dimensionar qualquer coisa

## Por que pagamentos blindados não podem ser indexados

Com endereços transparentes, um nó consegue ler o endereço em cada saída e criar um índice que associa endereços a saídas. Zebra expõe isso por meio de `getaddressutxos` e `getaddresstxids`.

Uma ação blindada não tem um endereço legível. Ela contém um compromisso de note, uma chave pública efêmera e uma note criptografada. Nenhum desses bytes informa a quem se destina o pagamento, então nem o nó nem um [indexador](Lightwallet_Nodes.md) consegue criar um índice de endereços.

A descoberta, portanto, funciona na direção oposta. A carteira pega cada saída blindada e pergunta "isto é meu?" tentando descriptografá-la. Isso é chamado de **descriptografia de tentativa**. [Viewing keys](Viewing_Keys.md) explica o que as chaves revelam, e [Zcash sincronização de carteiras](Zcash_Wallet_Syncing.md) aborda como as carteiras programam esse trabalho.

## Como funciona uma tentativa

Para o formato de ação do protocolo Orchard, usado tanto pelos pools Orchard quanto pelos Ironwood:

1. **Acordo de chaves:** multiplique a chave pública efêmera da ação pela sua chave de visualização de entrada. Isso é uma multiplicação escalar na curva Pallas e representa a maior parte do custo
2. **Derivação de chaves:** aplique um hash ao segredo compartilhado para gerar uma chave simétrica
3. **Descriptografe os primeiros 52 bytes** da note: o diversificador, o valor e `rseed`
4. **Reconstrua o compromisso da note** a partir do que você descriptografou
5. **Compare** com o `cmx` da ação. Se houver correspondência, a note é sua

Você só descobre se a note é sua na etapa 5, então **uma tentativa sem correspondência custa quase o mesmo que uma com correspondência**. Quase todas as ações na chain pertencem a outra pessoa, então quase todo o trabalho resulta em tentativas sem correspondência.

## A fórmula do custo

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Não há um termo para endereços. As carteiras tentam tanto a chave externa (endereços que você fornece) quanto a chave interna (troco), por isso `I = 2`. Você pode ver isso nos loops `for scope in [Scope::External, Scope::Internal]` em librustzcash`zcash_client_backend/src/scanning.rs`.

[ZIP 218](https://zips.z.cash/zip-0218) limita as ações blindadas a **330 por bloco**, então `A` é no máximo 330.

## Endereços diversificados: muitos endereços, uma chave

Um endereço do protocolo Orchard é composto por um diversificador `d` (11 bytes) e uma chave de transmissão derivada da mesma chave de visualização de entrada. [ZIP 32](https://zips.z.cash/zip-0032) deriva cada diversificador de um índice de 88 bits com criptografia FF1, então uma conta tem **2^88 endereços**, e cada um é válido para o protocolo Orchard.

Isso oferece duas propriedades úteis para um backend de pagamentos:

* **Os endereços não são vinculáveis entre si.** Sem a chave de visualização, dois endereços diversificados de uma mesma conta parecem pertencer a duas carteiras diferentes
* **Os pagamentos podem ser associados às faturas sem uma tabela de consulta.** Quando uma tentativa de descriptografia dá certo, a note descriptografada contém `d`. A chave de diversificador da conta descriptografa `d` e recupera o índice; assim, se o índice for o número da sua fatura, você sabe qual fatura foi paga

Envolva cada endereço em um [endereço unificado](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) antes de mostrá-lo a um cliente.

## O ponto de atenção: uma chave de visualização revela a conta inteira

Não é possível limitar uma chave de visualização a um único endereço diversificado, porque todos os endereços da conta usam a mesma chave. Por isso, a conta também é a unidade de divulgação. Quem obtiver a chave de visualização de uma conta verá todos os pagamentos feitos a todos os endereços dela.

Isso faz com que três aspectos sejam decididos juntos:

| Projeto | Custo de varredura | O que pode ser mostrado a um auditor |
|:--|:--|:--|
| Uma conta, um endereço diversificado por cliente | Uma chave, seja qual for o número de clientes | Tudo ou nada |
| Uma conta por cliente | Uma chave por cliente, em cada bloco | Um cliente por vez |
| Uma conta por cliente e período | Uma chave por cliente e período | Um cliente em um período |

Escolha o projeto das contas desde o início. Dividir uma conta depois significa transferir os fundos para novas contas, o que custa taxas e cria um padrão visível.

## Quanto custa na prática

Estes valores foram medidos em um núcleo de laptop (Apple M3 Pro, build de lançamento), usando `try_compact_note_decryption` do `zcash_note_encryption` 0.5.1 em ações Ironwood reais da testnet:

| Medição | Valor |
|:--|:--|
| Uma tentativa, uma chave por vez | cerca de 82 µs |
| Uma tentativa, em lote com 10 ou 100 chaves | cerca de 42 µs |

O processamento em lote reduz o custo aproximadamente pela metade, e o scanner de librustzcash também processa em lotes pelo mesmo motivo.

Com `t = 42 µs` e blocos cheios de 330 ações:

| Contas monitoradas | Tempo de CPU por bloco cheio | Núcleos necessários para acompanhar blocos cheios |
|:--|:--|:--|
| 1 | 28 ms | 0,001 |
| 1.000.000 (uma por cliente) | 7,7 horas | cerca de 1.109 |

Os mesmos 1 milhão de clientes usando endereços diversificados em uma única conta custam 28 ms por bloco cheio. A única diferença está no limite entre as contas.

## Dimensione para picos, não para médias

Nos 5.000 blocos da mainnet até a altura 3.582.677 (amostrados em 17 de novembro de 2026):

* 62% dos blocos não tinham saídas blindadas, e a mediana era zero
* A média era de 12,3 saídas blindadas por bloco
* 153 blocos entre as alturas 3.579.935 e 3.580.346, cerca de três horas de chain, tiveram mais de 250 saídas cada, muitas vezes em sequência. Eles continham 75% de todas as saídas da amostra

Um scanner dimensionado para a média fica para trás durante uma sequência como essa. Deixe uma margem (por exemplo, planeje usar metade do intervalo de 25 segundos de cada bloco) e dimensione para o limite máximo.

## Blocos compactos ajudam com a largura de banda, não com o número de tentativas

Carteiras leves fazem a varredura de blocos compactos de um servidor lightwallet. Uma ação compacta tem 148 bytes, contra 820 na ação completa. Ela mantém apenas o que uma tentativa precisa: a chave efêmera, os primeiros 52 bytes do texto cifrado, o nulificador e `cmx`. Os dados transparentes só são enviados se o cliente solicitar.

Blocos compactos reduzem o tamanho do download. Eles não reduzem o número de tentativas, porque cada ação ainda precisa ser testada com cada chave.

## Lista de verificação para um backend de pagamentos

* Decida quem precisará ver o quê antes de criar as contas
* Sempre que a divulgação permitir, emita um endereço diversificado por fatura a partir de uma única conta
* Meça `t` no seu próprio hardware, com o processamento em lote ativado
* Dimensione a varredura da ponta da chain para 330 ações por bloco, com margem
* Divida novas varreduras por intervalo de altura entre os workers. O histórico é fixo, então essa divisão em paralelo funciona bem
* Lembre-se de que cada nova conta também precisa ser varrida desde a altura de aniversário dela

## Saiba mais

* [ZIP 218: intervalo alvo de 25 segundos entre blocos](https://zips.z.cash/zip-0218), incluindo os limites de ações por bloco
* [ZIP 32: carteiras hierárquicas determinísticas blindadas](https://zips.z.cash/zip-0032)
* [ZIP 316: endereços unificados e chaves de visualização unificadas](https://zips.z.cash/zip-0316)
* [Protocolo Lightwallet: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` varredura e `zcash_note_encryption`
* [Uma chave de visualização, 1 milhão de clientes](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): as medições completas, com código de laboratório para reproduzi-las
