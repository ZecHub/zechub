<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# O que são os endereços TEX do Zcash?

## TL;DR

* Um endereço TEX é um endereço transparente do Zcash escrito em um formato diferente. Começa com `tex1` e é definido na [ZIP 320](https://zips.z.cash/zip-0320).
* Ele informa uma coisa à sua carteira: pague este endereço apenas com fundos transparentes.
* Se o seu saldo estiver blindado, uma carteira compatível executa duas etapas para você. Ela move o valor para um endereço transparente temporário e depois o envia ao endereço TEX.
* Em 2023, a Binance pediu à comunidade do Zcash uma forma de recusar depósitos blindados e devolvê-los. Os endereços TEX são a resposta, e a Binance é a corretora na lista de [Corretoras custodiantes](/using-zcash/custodial-exchanges) do ZecHub que aceita depósitos TEX.
* O suporte também cresceu do lado do envio: a Coinbase permite que seus usuários enviem ZEC para endereços TEX, e kits de ferramentas para carteiras vêm adicionando suporte à ZIP 320.
* Um pagamento para um endereço TEX é público na blockchain, como qualquer pagamento transparente. O restante do seu saldo blindado permanece privado.

## Explicação principal

Um endereço TEX do Zcash é um tipo especial de endereço de recebimento. TEX significa "Transparent Exchange". É uma recodificação Bech32m de um único endereço transparente p2pkh. Os endereços TEX começam com `tex1` e constituem um tipo distinto de endereços unificados.

Um endereço TEX informa a uma carteira compatível que ela deve realizar uma transação somente transparente (T -> T). 

A lógica é a seguinte: quando uma carteira compatível detecta um endereço TEX, ela o decodifica para obter o receptor transparente que ele contém. A carteira então envia os fundos necessários para a transação do pool blindado para um endereço transparente efêmero separado e controlado pelo usuário (Z -> T). Em seguida, envia esses fundos para o receptor transparente decodificado do endereço TEX (T -> T).  

A proposta técnica para endereços TEX está descrita na [ZIP 320](https://zips.z.cash/zip-0320) do Zcash, que define um tipo de endereço exclusivamente para receber fundos de endereços transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Quão usados são os endereços TEX?

A adoção ainda é parcial, mas já não se limita a uma única corretora. Vale a pena separar duas funções diferentes:

* **Emissão de endereços TEX para depósitos.** A Binance é a corretora na nossa lista de [Corretoras custodiantes](/using-zcash/custodial-exchanges) que fornece um endereço TEX para depósitos, para que os fundos cheguem de uma origem transparente ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). A ZIP 320 não prevê que outras corretoras emitam endereços TEX, a menos que precisem saber de qual endereço um pagamento veio.
* **Envio para endereços TEX.** Este é o lado que cresceu. Em outubro de 2024, a Coinbase anunciou que os usuários do Coinbase.com podem enviar Zcash para endereços TEX ([anúncio da Coinbase Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Kits de ferramentas para carteiras também vêm adicionando suporte à ZIP 320: a KeepKey adicionou assinatura para transações TEX no firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), e a biblioteca XChainJS `zcash-js` foi corrigida depois de rejeitar destinatários `tex1` válidos (mais sobre isso abaixo).

Portanto, os endereços TEX não são universais, mas o leitor não deve mais presumir que a Binance é o único lugar em que eles aparecem.

### Quando preciso de um endereço TEX

#### Você precisa de um endereço TEX ao enviar fundos para um endereço transparente usando uma carteira que não oferece suporte ao envio direto para um endereço transparente.

Certas carteiras não permitem o envio direto para um endereço transparente, e o destinatário pode não fornecer um equivalente TEX. Portanto, às vezes pode ser necessário converter um endereço transparente em um endereço TEX. Isso pode ser feito manualmente executando a implementação de referência descrita em [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Você precisa de um endereço TEX ao enviar fundos para uma corretora centralizada que exige que esses fundos venham de uma origem transparente.

A [Binance](https://www.binance.com/) é a razão pela qual os endereços TEX existem. Em novembro de 2023, ela informou à comunidade do Zcash que a ZEC poderia ser removida da lista se não houvesse uma forma de recusar depósitos de endereços blindados e devolvê-los ao depositante ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). A ZIP 320 não prevê que outras corretoras emitam endereços TEX, a menos que precisem saber de qual endereço um pagamento veio. A Binance é a corretora na nossa lista de [Corretoras custodiantes](/using-zcash/custodial-exchanges) que aceita depósitos em um endereço TEX.
Os endereços TEX informam uma carteira compatível de que todos os fundos enviados para esse endereço devem ser transparentes e impedem o envio de qualquer valor blindado para esse endereço.
Se uma corretora como a Binance rejeitar o valor enviado, ela dispõe dos meios necessários para devolver esse valor ao endereço de onde ele veio. Isso também ajuda entidades como a Binance a cumprir as leis e os regulamentos impostos por governos ou outras autoridades.

### Quais carteiras oferecem suporte a endereços TEX?

Você pode consultar a lista mais atualizada em nossa página de [carteiras](/using-zcash/wallets). Use o filtro TEX Address.

## Visual / analogia

Pense no seu saldo blindado como dinheiro em um cofre trancado em casa. Ninguém de fora consegue ver quanto há dentro.

Uma corretora como a Binance tem uma placa no balcão: pagamentos são aceitos apenas em um envelope transparente, para que o caixa possa ver de onde o dinheiro veio e devolvê-lo se necessário. O endereço TEX é essa placa.

Quando sua carteira vê a placa, ela tira o valor do cofre, coloca-o em um envelope transparente com seu endereço de devolução (o endereço transparente temporário) e leva o envelope ao balcão. O cofre permanece trancado, e ninguém fica sabendo o que mais há nele.

## Análise aprofundada

### Como um endereço TEX é construído

Um endereço transparente normal que começa com `t1` contém um hash de chave de 20 bytes, escrito em Base58Check. Um endereço TEX contém os mesmos 20 bytes, recodificados em Bech32m com o prefixo `tex` (`textest` na testnet). Converter um no outro requer apenas algumas linhas de código, como mostra a ZIP 320 em sua implementação de referência.

O design simples era uma exigência da Binance: a conversão precisava funcionar apenas com bibliotecas Base58Check e Bech32m no código de front-end da corretora. Um rascunho anterior da ZIP 320 integrava a ideia aos endereços unificados, e essa versão foi abandonada por esse motivo.

Os endereços TEX usam a codificação Bech32m do formato de endereço unificado, mas mantêm quase nada de sua estrutura. Se você é novo no Bech32m e na forma como os endereços do Zcash são validados, a página [Endereços unificados](/using-zcash/unified-addresses) aborda os fundamentos na [ZIP 316](https://zips.z.cash/zip-0316). Um endereço TEX difere de um endereço unificado em quatro aspectos concretos:

| | Unified Address (ZIP 316) | Endereço TEX (ZIP 320) |
|---|---|---|
| O que contém | vários receptores agrupados | um único receptor transparente P2PKH |
| Prefixo legível por humanos (HRP) | `u` (mainnet) | `tex` (`textest` na testnet) |
| Ofuscação F4Jumble | sim | não |
| Códigos de tipo para cada destinatário | sim | não |

Em resumo, um endereço TEX é o invólucro Bech32m mais simples possível: um hash de chave transparente, um prefixo `tex` e nada mais.

### Regras de tratamento para carteiras e integradores

Esta é a parte que as implementações vêm fazendo de forma errada, por isso vale a pena afirmá-la claramente. Ao detectar um endereço TEX, uma carteira ou integrador **não deve gastar diretamente do pool blindado para o destino TEX.** A ZIP 320 exige que cada entrada de um pagamento TEX seja transparente, portanto o pagamento é construído em duas etapas:

1. **Desblindar.** Mova o valor do pool blindado para um endereço transparente efêmero, novo e controlado pelo usuário, pertencente à carteira (Z -> T).
2. **Enviar de transparente para transparente.** Gaste essa saída efêmera para o receptor P2PKH decodificado dentro do endereço TEX (T -> T).

Algumas regras tornam isso seguro, todas provenientes da ZIP 320:

* O endereço efêmero deve ser derivado da sua frase semente, para que, se a corretora devolver os fundos, sua carteira ainda consiga encontrá-los e gastá-los.
* Um endereço efêmero novo deve ser usado a cada vez, para que pagamentos separados não possam ser vinculados entre si.
* A segunda transação deve gastar apenas entradas transparentes, para que a corretora veja um depósito transparente para transparente limpo.

A conversão e o fluxo de duas etapas são mostrados na [implementação de referência da ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Fazer isso de forma errada é um problema real e recente: em outubro de 2026, a biblioteca XChainJS `zcash-js` rejeitou destinatários `tex1` válidos com o erro "Invalid 'to' address", porque seu validador aceitava apenas o formato Base58Check `t1`, o que impedia depósitos de ZEC em serviços que publicam um endereço `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Isso foi corrigido ensinando o validador a aceitar a codificação da ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### O que um envio TEX revela

Um pagamento TEX é um pagamento transparente, portanto é público, mas vale a pena ser preciso sobre o que um observador pode e não pode ver.

O que é **visível** on-chain:

* O endereço transparente efêmero, pois aparece como a saída da etapa de desblindagem e a entrada do envio final.
* Ambos os valores: o valor que saiu do pool blindado na etapa Z -> T e o valor entregue na etapa T -> T.
* O receptor transparente da corretora, que é o endereço P2PKH codificado no endereço TEX.

O que permanece **oculto**:

* O restante do seu saldo blindado e quais notes blindadas específicas financiaram o pagamento. A etapa de desblindagem revela que *algum* valor saiu do pool para o endereço efêmero, mas não de onde ele veio dentro do pool.

Portanto, um observador pode vincular o endereço efêmero ao pagamento da corretora (os mesmos fundos, de transparente para transparente) e pode ver que ele foi abastecido a partir de uma retirada blindada. Ele não consegue conectá-lo aos seus outros fundos ou atividades blindados. Nada on-chain realmente identifica o pagamento como um envio "TEX": como observa a ZIP 320, um pagamento para um endereço TEX é indistinguível de um pagamento para o endereço `t1` correspondente, porque as regras de consenso não mudam e toda a regra está na carteira.

![Rastro on-chain de um envio TEX: os fundos saem do pool blindado para um endereço transparente efêmero e, em seguida, vão de transparente para transparente até a corretora; o endereço efêmero, ambos os valores e o endereço da corretora ficam visíveis, enquanto o restante do saldo blindado permanece oculto](/content-images/tex-onchain-footprint.webp)

### O que a blockchain mostra

A regra TEX está nas carteiras. Os nós não a verificam, portanto as regras de consenso permanecem as mesmas. On-chain, um pagamento para um endereço TEX parece igual a um pagamento para o endereço `t1` correspondente. O valor, o endereço efêmero e o endereço da corretora são públicos, como em qualquer transação transparente.

## Páginas relacionadas

- [Endereços unificados](/using-zcash/unified-addresses): o formato de endereço `u1` da ZIP 316 e os fundamentos do Bech32m que um endereço TEX reutiliza.
- [Corretoras custodiantes](/using-zcash/custodial-exchanges): quais corretoras aceitam quais tipos de endereço, incluindo os depósitos TEX da Binance.
- [Carteiras](/using-zcash/wallets): use o filtro TEX Address para encontrar carteiras que podem pagar para um endereço TEX.
- [Pools blindados](/using-zcash/shielded-pools): onde fica seu saldo privado antes de um pagamento TEX retirar parte dele.
- [Quem pode ver seu pagamento do Zcash](/start-here/who-can-see-your-zcash-payment): o que se torna visível assim que os fundos saem do pool blindado.
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see): como um pagamento transparente aparece on-chain.
- [URIs de solicitação de pagamento do Zcash](/using-zcash/payment-request-uris): outro padrão de carteira para pagamentos pré-preenchidos.

**Última atualização:** outubro de 2026
