<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# O que são os endereços TEX Zcash?

## TL;DR

* Um endereço TEX é um endereço Zcash transparente escrito num formato diferente. Começa por `tex1` e é definido na [ZIP 320](https://zips.z.cash/zip-0320).
* Indica à sua wallet uma coisa: pague este endereço apenas com fundos transparentes.
* Se o seu saldo estiver protegido, uma wallet compatível executa dois passos por si. Move o montante para um endereço transparente temporário e, em seguida, envia-o para o endereço TEX.
* Em 2023, a Binance pediu à comunidade Zcash uma forma de recusar depósitos protegidos e devolvê-los. Os endereços TEX são a resposta, e a Binance é a exchange na lista de ZecHub [Exchanges de custódia](/using-zcash/custodial-exchanges) que aceita depósitos TEX.
* O suporte também cresceu no lado do envio: a Coinbase permite aos seus utilizadores enviar ZEC para endereços TEX, e os kits de ferramentas de wallet têm vindo a adicionar suporte para a ZIP 320.
* Um pagamento para um endereço TEX é público na blockchain, como qualquer pagamento transparente. O restante saldo protegido mantém-se privado.

## Explicação principal

Um endereço TEX Zcash é um tipo especial de endereço de receção. TEX significa "Transparent Exchange". É uma recodificação Bech32m de um único endereço Transparente p2pkh. Os endereços TEX começam por `tex1` e constituem um tipo distinto dos Unified Addresses.

Um endereço TEX indica a uma wallet compatível que deve realizar uma transação Apenas Transparente (T -> T). 

A lógica é a seguinte: quando uma wallet compatível deteta um endereço TEX, descodifica-o para obter o recetor Transparente que contém. A wallet envia então os fundos necessários para a transação da pool protegida para um endereço Transparente efémero separado, controlado pelo utilizador (Z -> T). Em seguida, envia esses fundos para o recetor Transparente descodificado do endereço TEX (T -> T).  

A proposta técnica para endereços TEX está delineada na Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define um tipo de endereço exclusivamente para receber fundos de endereços Transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Quão utilizados são os endereços TEX?

A adoção continua parcial, mas já não se limita a uma única exchange. Vale a pena distinguir duas funções diferentes:

* **Emissão de endereços de depósito TEX.** A Binance é a exchange na nossa lista de [Exchanges de custódia](/using-zcash/custodial-exchanges) que fornece um endereço TEX para depósitos, para que os fundos cheguem de uma origem transparente ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). A ZIP 320 não prevê que outras exchanges emitam endereços TEX, a menos que necessitem de saber de que endereço provém um pagamento.
* **Envio para endereços TEX.** Este é o lado que cresceu. Em outubro de 2024, a Coinbase anunciou que os utilizadores de Coinbase.com podem enviar Zcash para endereços TEX ([Coinbase anúncio Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Os kits de ferramentas de wallet também têm vindo a adicionar suporte para a ZIP 320: a KeepKey adicionou assinatura para transações TEX no firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), e a biblioteca XChainJS `zcash-js` foi corrigida após rejeitar destinatários `tex1` válidos (mais sobre isto abaixo).

Assim, os endereços TEX não são universais, mas o leitor já não deve assumir que a Binance é o único lugar onde aparecem.

### Quando preciso de um endereço TEX

#### Precisa de um endereço TEX ao enviar fundos para um endereço Transparente usando uma wallet que não suporta o envio direto para um endereço Transparente.

Certas wallets não permitem o envio direto para um endereço Transparente, e o destinatário pode não fornecer um equivalente TEX. Por isso, por vezes pode ser necessário converter um endereço Transparente num endereço TEX. Isto pode ser feito manualmente executando a implementação de referência descrita em [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Precisa de um endereço TEX ao enviar fundos para uma exchange centralizada que exige que esses fundos provenham de uma origem Transparente.

A [Binance](https://www.binance.com/) é a razão pela qual os endereços TEX existem. Em novembro de 2023, informou a comunidade Zcash de que a ZEC poderia ser removida da lista se não existisse uma forma de recusar depósitos de endereços protegidos e devolvê-los ao depositante ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). A ZIP 320 não prevê que outras exchanges emitam endereços TEX, a menos que necessitem de saber de que endereço provém um pagamento. A Binance é a exchange na nossa lista de [Exchanges de custódia](/using-zcash/custodial-exchanges) que aceita depósitos num endereço TEX.
Os endereços TEX informam uma wallet compatível de que todos os fundos enviados para esse endereço devem ser transparentes e excluem o envio de qualquer valor protegido para esse endereço.
Se uma exchange como a Binance rejeitar o valor enviado, dispõe dos meios necessários para devolver esse valor ao endereço de onde proveio. Também ajuda entidades como a Binance a cumprir as leis e regulamentos impostos por governos ou outras autoridades.

### Que wallets suportam endereços TEX?

Pode consultar a lista mais atualizada na nossa página de [wallets](/using-zcash/wallets). Utilize o filtro TEX Address.

## Visual / Analogia

Pense no seu saldo protegido como dinheiro num cofre fechado em casa. Ninguém do exterior consegue ver quanto está lá dentro.

Uma exchange como a Binance tem uma placa ao balcão: só são aceites pagamentos num envelope transparente, para que o caixa possa ver de onde veio o dinheiro e devolvê-lo se necessário. O endereço TEX é essa placa.

Quando a sua wallet vê a placa, retira o montante do cofre, coloca-o num envelope transparente com o seu endereço de devolução (o endereço transparente temporário) e leva o envelope ao balcão. O cofre mantém-se fechado, e ninguém fica a saber o que mais existe nele.

## Análise aprofundada

### Como é construído um endereço TEX

Um endereço transparente normal que começa por `t1` contém um hash de chave de 20 bytes, escrito em Base58Check. Um endereço TEX contém os mesmos 20 bytes, recodificados em Bech32m com o prefixo `tex` (`textest` na testnet). Converter um no outro requer apenas algumas linhas de código, como demonstra a ZIP 320 na sua implementação de referência.

O design simples era um requisito da Binance: a conversão tinha de funcionar apenas com bibliotecas Base58Check e Bech32m no código de front-end da exchange. Um rascunho anterior da ZIP 320 integrava a ideia nos Unified Addresses, e essa versão foi abandonada por esta razão.

Os endereços TEX adotam a codificação Bech32m do formato Unified Address, mas conservam quase nada da sua estrutura. Se é novo em Bech32m e na forma como os endereços Zcash são validados, a página [Unified Addresses](/using-zcash/unified-addresses) aborda os fundamentos na [ZIP 316](https://zips.z.cash/zip-0316). Um endereço TEX difere de um Unified Address de quatro formas concretas:

| | Unified Address (ZIP 316) | Endereço TEX (ZIP 320) |
|---|---|---|
| O que contém | vários recetores agrupados | um único recetor transparente P2PKH |
| Prefixo legível por humanos (HRP) | `u` (mainnet) | `tex` (`textest` na testnet) |
| Ofuscação F4Jumble | sim | não |
| Códigos de tipo para cada recetor | sim | não |

Em suma, um endereço TEX é o invólucro Bech32m mais simples possível: um hash de chave transparente, um prefixo `tex` e nada mais.

### Regras de tratamento para wallets e integradores

Esta é a parte que as implementações têm feito erradamente, por isso vale a pena dizê-lo claramente. Ao detetar um endereço TEX, uma wallet ou integrador **não deve gastar diretamente da pool protegida para o destino TEX.** A ZIP 320 exige que cada entrada de um pagamento TEX seja transparente, pelo que o pagamento é construído em dois passos:

1. **Desproteger.** Mova o montante da pool protegida para um endereço transparente efémero, novo e controlado pelo utilizador, que pertença à wallet (Z -> T).
2. **Enviar de transparente para transparente.** Gaste essa saída efémera para o recetor P2PKH descodificado dentro do endereço TEX (T -> T).

Algumas regras tornam este processo seguro, todas provenientes da ZIP 320:

* O endereço efémero deve ser derivado da sua frase-semente, para que, se a exchange devolver os fundos, a sua wallet ainda consiga encontrá-los e gastá-los.
* Deve ser utilizado um endereço efémero novo de cada vez, para que pagamentos separados não possam ser associados entre si.
* A segunda transação deve gastar apenas entradas transparentes, para que a exchange veja um depósito transparente-para-transparente limpo.

A conversão e o fluxo de dois passos são apresentados na [ZIP implementação de referência da 320](https://zips.z.cash/zip-0320#reference-implementation). Fazer isto incorretamente é um problema real e recente: em outubro de 2026, a biblioteca XChainJS `zcash-js` rejeitou destinatários `tex1` válidos com o erro "Invalid 'to' address", porque o seu validador aceitava apenas o formato Base58Check `t1`, o que impedia depósitos ZEC em serviços que publicam um endereço `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Foi corrigido ensinando o validador a aceitar a codificação da ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### O que revela um envio TEX

Um pagamento TEX é um pagamento transparente, portanto é público, mas vale a pena ser preciso sobre o que um observador pode e não pode ver.

O que é **visível** on-chain:

* O endereço transparente efémero, uma vez que aparece como a saída do passo de desproteção e a entrada do envio final.
* Ambos os montantes: o valor que saiu da pool protegida no passo Z -> T e o valor entregue no passo T -> T.
* O recetor transparente da exchange, que é o endereço P2PKH codificado no endereço TEX.

O que permanece **oculto**:

* O restante saldo protegido e quais notas protegidas específicas financiaram o pagamento. O passo de desproteção revela que *algum* valor saiu da pool para o endereço efémero, não de onde veio dentro da pool.

Assim, um observador pode associar o endereço efémero ao pagamento da exchange (os mesmos fundos, de transparente para transparente) e pode ver que foi abastecido a partir de uma retirada protegida. Não o consegue ligar aos seus outros fundos ou atividade protegidos. Nada on-chain identifica efetivamente o pagamento como um envio "TEX": como observa a ZIP 320, um pagamento para um endereço TEX é indistinguível de um pagamento para o endereço `t1` correspondente, porque as regras de consenso não mudam e toda a regra reside na wallet.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### O que a blockchain mostra

A regra TEX reside nas wallets. Os nós não a verificam, pelo que as regras de consenso permanecem iguais. On-chain, um pagamento para um endereço TEX parece igual a um pagamento para o endereço `t1` correspondente. O montante, o endereço efémero e o endereço da exchange são públicos, como em qualquer transação transparente.

## Páginas relacionadas

- [Unified Addresses](/using-zcash/unified-addresses): o formato de endereço `u1` na ZIP 316 e os fundamentos de Bech32m que um endereço TEX reutiliza.
- [Exchanges de custódia](/using-zcash/custodial-exchanges): que exchanges aceitam que tipos de endereço, incluindo os depósitos TEX da Binance.
- [Wallets](/using-zcash/wallets): utilize o filtro TEX Address para encontrar wallets que podem pagar para um endereço TEX.
- [Pools protegidas](/using-zcash/shielded-pools): onde se encontra o seu saldo privado antes de um pagamento TEX retirar parte dele.
- [Quem pode ver o seu pagamento Zcash](/start-here/who-can-see-your-zcash-payment): o que se torna visível assim que os fundos saem da pool protegida.
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see): como um pagamento transparente aparece on-chain.
- [Zcash URIs de pedido de pagamento](/using-zcash/payment-request-uris): outra norma de wallet para pagamentos pré-preenchidos.

**Última atualização:** outubro de 2026
