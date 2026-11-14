<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# O que são endereços TEX do Zcash?

## Resumo

* Um endereço TEX é um endereço transparente do Zcash escrito em um formato diferente. Ele começa com `tex1` e é definido na [ZIP 320](https://zips.z.cash/zip-0320).
* Ele diz uma única coisa à sua carteira: pague este endereço somente com fundos transparentes.
* Se o seu saldo estiver blindado, uma carteira compatível faz duas etapas por você. Ela move o valor para um endereço transparente temporário e depois o envia ao endereço TEX.
* Em 2023, a Binance pediu à comunidade do Zcash uma forma de recusar depósitos blindados e devolvê-los. Os endereços TEX são a resposta, e a Binance é a corretora da lista de ZecHub [Corretoras custodiantes](/using-zcash/custodial-exchanges) que aceita depósitos TEX.
* O suporte também cresceu do lado do envio: a Coinbase permite que seus usuários enviem ZEC para endereços TEX, e kits de ferramentas de carteiras vêm adicionando suporte à ZIP 320.
* Um pagamento para um endereço TEX é público na blockchain, como qualquer pagamento transparente. O restante do seu saldo blindado continua privado.

## Explicação principal

Um endereço TEX do Zcash é um tipo especial de endereço de recebimento. TEX significa "Transparent Exchange". Ele é uma recodificação em Bech32m de um único endereço transparente p2pkh. Os endereços TEX começam com `tex1` e são um tipo separado dos endereços unificados.

Um endereço TEX indica a uma carteira compatível que ela deve fazer uma transação somente transparente (T -> T). 

A lógica é a seguinte: quando uma carteira compatível detecta um endereço TEX, ela o decodifica para obter o receptor transparente que ele contém. Em seguida, a carteira envia os fundos necessários para a transação da pool blindada para um endereço transparente efêmero separado, controlado pelo usuário (Z -> T). Depois, ela envia esses fundos para o receptor transparente decodificado do endereço TEX (T -> T).  

A proposta técnica dos endereços TEX está descrita na Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define um tipo de endereço exclusivamente para receber fundos de endereços transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Quão usados são os endereços TEX?

A adoção ainda é parcial, mas não se limita mais a uma única corretora. Vale separar dois papéis diferentes:

* **Emissão de endereços TEX para depósito.** A Binance é a corretora da nossa lista de [Corretoras custodiantes](/using-zcash/custodial-exchanges) que fornece um endereço TEX para depósitos, para que os fundos cheguem de uma origem transparente ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). A ZIP 320 não espera que outras corretoras emitam endereços TEX, a menos que precisem saber de qual endereço veio um pagamento.
* **Envio para endereços TEX.** Este é o lado que cresceu. Em outubro de 2024, a Coinbase anunciou que os usuários da Coinbase.com podem enviar Zcash para endereços TEX ([anúncio de ativos da Coinbase](https://x.com/CoinbaseAssets/status/1844428577921507416)). Kits de ferramentas de carteiras também vêm adicionando suporte à ZIP 320: a KeepKey adicionou a assinatura de transações TEX no firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), e a biblioteca XChainJS `zcash-js` foi corrigida depois de rejeitar destinatários `tex1` válidos (mais sobre isso abaixo).

Portanto, os endereços TEX não são universais, mas o leitor não deve mais presumir que a Binance é o único lugar onde eles aparecem.

### Quando eu preciso de um endereço TEX

#### Você precisa de um endereço TEX ao enviar fundos para um endereço transparente usando uma carteira que não permite enviar diretamente para um endereço transparente.

Algumas carteiras não permitem enviar diretamente para um endereço transparente, e o destinatário pode não fornecer um equivalente TEX. Assim, às vezes pode ser necessário converter um endereço transparente em um endereço TEX. Isso pode ser feito manualmente executando a implementação de referência descrita na [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Você precisa de um endereço TEX ao enviar fundos para uma corretora centralizada que exige que esses fundos venham de uma origem transparente.

A [Binance](https://www.binance.com/) é o motivo pelo qual os endereços TEX existem. Em novembro de 2023, ela informou à comunidade do Zcash que o ZEC poderia ser deslistado, a menos que houvesse uma forma de recusar depósitos vindos de endereços blindados e devolvê-los ao depositante ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). A ZIP 320 não espera que outras corretoras emitam endereços TEX, a menos que precisem saber de qual endereço veio um pagamento. A Binance é a corretora da nossa lista de [Corretoras custodiantes](/using-zcash/custodial-exchanges) que aceita depósitos em um endereço TEX.
Os endereços TEX informam a uma carteira compatível que todos os fundos enviados a esse endereço devem ser transparentes e impedem que qualquer valor blindado seja enviado a ele.
Se uma corretora como a Binance rejeitar o valor enviado, ela tem os meios necessários para devolvê-lo ao endereço de onde veio. Isso também ajuda entidades como a Binance a cumprir as leis e regulamentações impostas por governos ou outras autoridades.

### Quais carteiras são compatíveis com endereços TEX?

Você pode ver a lista mais atualizada na nossa página de [carteiras](/using-zcash/wallets). Use o filtro "Endereço TEX".

## Visual / analogia

Pense no seu saldo blindado como dinheiro guardado em um cofre trancado em casa. Ninguém de fora consegue ver quanto há dentro.

Uma corretora como a Binance tem um aviso no balcão: pagamentos aceitos somente em envelope transparente, para que o caixa possa ver de onde veio o dinheiro e devolvê-lo, se necessário. O endereço TEX é esse aviso.

Quando sua carteira vê o aviso, ela tira o valor do cofre, coloca-o em um envelope transparente com o seu endereço de retorno (o endereço transparente temporário) e leva o envelope até o balcão. O cofre continua trancado, e ninguém descobre o que mais há dentro dele.

## Aprofundamento

### Como um endereço TEX é construído

Um endereço transparente normal, que começa com `t1`, contém um hash de chave de 20 bytes, escrito em Base58Check. Um endereço TEX contém os mesmos 20 bytes, recodificados em Bech32m com o prefixo `tex` (`textest` na testnet). Converter um no outro exige poucas linhas de código, como a ZIP 320 mostra em sua implementação de referência.

O design simples foi uma exigência da Binance: a conversão precisava funcionar apenas com bibliotecas Base58Check e Bech32m no código de front-end da corretora. Um rascunho anterior da ZIP 320 incorporava a ideia aos endereços unificados, e essa versão foi abandonada por esse motivo.

Os endereços TEX emprestam a codificação Bech32m do formato de endereço unificado, mas não mantêm quase nada da sua estrutura. Se você é novo no Bech32m e em como os endereços do Zcash são validados, a página [Endereços unificados](/using-zcash/unified-addresses) cobre o básico da [ZIP 316](https://zips.z.cash/zip-0316). Um endereço TEX difere de um endereço unificado de quatro formas concretas:

| | Endereço unificado (ZIP 316) | Endereço TEX (ZIP 320) |
|---|---|---|
| O que contém | vários receptores agrupados | um único receptor transparente P2PKH |
| Prefixo legível por humanos (HRP) | `u` (mainnet) | `tex` (`textest` na testnet) |
| Ofuscação F4Jumble | sim | não |
| Typecodes para cada receptor | sim | não |

Em resumo, um endereço TEX é o invólucro Bech32m mais simples possível: um hash de chave transparente, um prefixo `tex` e nada mais.

### Regras de tratamento para carteiras e integradores

Esta é a parte que as implementações vêm errando, então vale a pena explicá-la com clareza. Ao detectar um endereço TEX, uma carteira ou integrador **não deve gastar diretamente da pool blindada para o destino TEX.** A ZIP 320 exige que todas as entradas de um pagamento TEX sejam transparentes, então o pagamento é construído em duas etapas:

1. **Desblindar.** Mova o valor da pool blindada para um endereço transparente efêmero novo, controlado pelo usuário e pertencente à carteira (Z -> T).
2. **Enviar de transparente para transparente.** Gaste essa saída efêmera para o receptor P2PKH decodificado dentro do endereço TEX (T -> T).

Algumas regras tornam isso seguro, todas da ZIP 320:

* O endereço efêmero deve ser derivado da sua frase semente, para que, se a corretora devolver os fundos, sua carteira ainda consiga encontrá-los e gastá-los.
* Um endereço efêmero novo deve ser usado a cada vez, para que pagamentos separados não possam ser vinculados entre si.
* A segunda transação deve gastar somente entradas transparentes, para que a corretora veja um depósito limpo de transparente para transparente.

A conversão e o fluxo em duas etapas são mostrados na [implementação de referência da ZIP 320](https://zips.z.cash/zip-0320#reference-implementation). Errar nisso é um problema real e recente: em outubro de 2026, a biblioteca XChainJS `zcash-js` rejeitou destinatários `tex1` válidos com o erro "Invalid 'to' address", porque seu validador só aceitava a forma Base58Check `t1`, o que quebrou os depósitos de ZEC para serviços que publicam um endereço `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). O problema foi corrigido ensinando o validador a aceitar a codificação da ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### O que um envio TEX revela

Um pagamento TEX é um pagamento transparente, portanto é público, mas vale ser preciso sobre o que um observador pode e não pode ver.

O que fica **visível** on-chain:

* O endereço transparente efêmero, já que ele aparece como saída da etapa de desblindagem e como entrada do envio final.
* Os dois valores: o valor que saiu da pool blindada na etapa Z -> T e o valor entregue na etapa T -> T.
* O receptor transparente da corretora, que é o endereço P2PKH codificado no endereço TEX.

O que fica **oculto**:

* O restante do seu saldo blindado e quais notes blindadas específicas financiaram o pagamento. A etapa de desblindagem revela que *algum* valor saiu da pool para o endereço efêmero, não de onde dentro da pool ele veio.

Assim, um observador pode vincular o endereço efêmero ao pagamento à corretora (mesmos fundos, de transparente para transparente) e pode ver que ele foi abastecido por uma retirada blindada. Ele não consegue conectá-lo aos seus outros fundos ou atividades blindadas. Nada on-chain marca de fato o pagamento como um envio "TEX": como observa a ZIP 320, um pagamento para um endereço TEX é indistinguível de um pagamento para o endereço `t1` correspondente, porque as regras de consenso não mudam e toda a regra fica na carteira.

![Pegada on-chain de um envio TEX: os fundos saem do pool blindado para um endereço transparente efêmero e depois vão de transparente para transparente até a corretora; o endereço efêmero, ambos os valores e o endereço da corretora ficam visíveis, enquanto o restante do saldo blindado permanece oculto](/content-images/tex-onchain-footprint.webp)

### O que a blockchain mostra

A regra TEX fica nas carteiras. Os nós não a verificam, então as regras de consenso continuam as mesmas. On-chain, um pagamento para um endereço TEX parece igual a um pagamento para o endereço `t1` correspondente. O valor, o endereço efêmero e o endereço da corretora são públicos, como em qualquer transação transparente.

## Páginas relacionadas

- [Endereços unificados](/using-zcash/unified-addresses): o formato de endereço do `u1` definido na ZIP 316 e o básico do Bech32m que um endereço TEX reutiliza.
- [Corretoras custodiantes](/using-zcash/custodial-exchanges): quais corretoras aceitam quais tipos de endereço, incluindo os depósitos TEX da Binance.
- [Carteiras](/using-zcash/wallets): use o filtro "Endereço TEX" para encontrar carteiras que podem pagar um endereço TEX.
- [Pools blindadas](/using-zcash/shielded-pools): onde fica o seu saldo privado antes que um pagamento TEX retire parte dele.
- [Quem pode ver o seu pagamento em Zcash](/start-here/who-can-see-your-zcash-payment): o que se torna visível quando os fundos saem da pool blindada.
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see): como um pagamento transparente aparece on-chain.
- [URIs de solicitação de pagamento do Zcash](/using-zcash/payment-request-uris): outro padrão de carteira para pagamentos pré-preenchidos.

**Última atualização:** outubro de 2026
