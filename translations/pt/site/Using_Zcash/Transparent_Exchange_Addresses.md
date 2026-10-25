<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# O que são endereços TEX de Zcash?

## TL;DR

* Um endereço TEX é um endereço transparente de Zcash escrito num formato diferente. Começa por `tex1` e é definido em [ZIP 320](https://zips.z.cash/zip-0320).
* Diz uma coisa à sua wallet: pague este endereço apenas com fundos transparentes.
* Se o seu saldo estiver blindado, uma wallet compatível executa dois passos por si. Move o montante para um endereço transparente temporário e, em seguida, envia-o para o endereço TEX.
* Em 2023, Binance pediu à comunidade de Zcash uma forma de recusar depósitos blindados e devolvê-los. Os endereços TEX são a resposta, e Binance é a exchange na lista de ZecHub [Exchanges de custódia](/using-zcash/custodial-exchanges) que aceita depósitos TEX.
* Um pagamento para um endereço TEX é público na blockchain, tal como qualquer pagamento transparente. O restante do seu saldo blindado mantém-se privado.

## Explicação principal

Um endereço TEX de Zcash é um tipo especial de endereço de receção. TEX significa "Transparent Exchange". É uma recodificação Bech32m de um único endereço Transparente p2pkh. Os endereços TEX começam por `tex1` e são um tipo distinto dos Unified Addresses.

Um endereço TEX indica a uma wallet compatível que deve efetuar uma transação apenas transparente (T -> T). 

A lógica é a seguinte: quando uma wallet compatível deteta um endereço TEX, descodifica-o para obter o recetor Transparente que contém. A wallet envia então os fundos necessários para a transação do pool Blindado para um endereço Transparente efémero, separado e controlado pelo utilizador (Z -> T). Em seguida, envia esses fundos para o recetor Transparente descodificado do endereço TEX (T -> T).  

A proposta técnica para endereços TEX é descrita em Zcash [ZIP 320](https://zips.z.cash/zip-0320), que define um tipo de endereço exclusivamente para receber fundos de endereços Transparentes.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Os endereços TEX ainda não são amplamente adotados. Os utilizadores de Zcash poderão ter de os usar eventualmente.

### Quando preciso de um endereço TEX

#### Precisa de um endereço TEX quando envia fundos para um endereço Transparente usando uma wallet que não suporta o envio direto para um endereço Transparente.

Algumas wallets não permitem enviar diretamente para um endereço Transparente, e o destinatário pode não fornecer um equivalente TEX. Portanto, por vezes pode ser necessário converter de um endereço Transparente para um endereço TEX. Isto pode ser feito manualmente através da execução da implementação de referência descrita em [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Precisa de um endereço TEX quando envia fundos para uma exchange centralizada que exige que esses fundos provenham de uma origem Transparente.

[Binance](https://www.binance.com/) é a razão pela qual os endereços TEX existem. Em novembro de 2023, informou a comunidade de Zcash de que ZEC poderia ser removido da lista, a menos que existisse uma forma de recusar depósitos de endereços blindados e devolvê-los ao depositante ([ZIP 320, Contexto](https://zips.z.cash/zip-0320#background)). ZIP 320 não prevê que outras exchanges emitam endereços TEX, a menos que precisem de saber de que endereço proveio um pagamento. Binance é a exchange na nossa lista de [Exchanges de custódia](/using-zcash/custodial-exchanges) que aceita depósitos para um endereço TEX.
Os endereços TEX informam uma wallet compatível de que todos os fundos enviados para esse endereço devem ser transparentes e excluem o envio de qualquer valor blindado para o referido endereço.
Se uma exchange como Binance rejeitar o valor enviado, terá os meios necessários para devolver esse valor ao endereço de onde veio. Também ajuda entidades como Binance a cumprir as leis e regulamentações impostas por governos ou outras autoridades.

### Que wallets suportam endereços TEX?

Pode ver a lista mais atualizada na nossa página de [wallets](/using-zcash/wallets). Utilize o filtro de Endereço TEX.

## Visual / Analogia

Imagine o seu saldo blindado como dinheiro num cofre fechado em casa. Ninguém no exterior consegue ver quanto está lá dentro.

Uma exchange como Binance tem uma placa no balcão: pagamentos aceites apenas num envelope transparente, para que o caixa possa ver de onde veio o dinheiro e devolvê-lo se necessário. O endereço TEX é essa placa.

Quando a sua wallet vê a placa, retira o montante do cofre, coloca-o num envelope transparente com o seu endereço de devolução (o endereço transparente temporário) e leva o envelope ao balcão. O cofre mantém-se fechado, e ninguém fica a saber o que mais está lá dentro.

## Análise aprofundada

### Como é construído um endereço TEX

Um endereço transparente normal que começa por `t1` contém um hash de chave de 20 bytes, escrito em Base58Check. Um endereço TEX contém os mesmos 20 bytes, recodificados em Bech32m com o prefixo `tex` (`textest` na testnet). Converter um no outro requer algumas linhas de código, como ZIP 320 mostra na sua implementação de referência.

O desenho simples era um requisito de Binance: a conversão tinha de funcionar apenas com bibliotecas Base58Check e Bech32m no código de front-end da exchange. Um rascunho anterior de ZIP 320 incorporava a ideia nos Unified Addresses, e essa versão foi abandonada por este motivo.

### Pagar um endereço TEX a partir de um saldo blindado

ZIP 320 exige que uma wallet compatível construa duas transações neste caso. A primeira move os fundos do seu saldo blindado para um novo endereço transparente efémero. A segunda envia-os desse endereço para o endereço TEX.

Se a exchange recusar o depósito, devolve os fundos ao endereço efémero. A sua wallet tem de conseguir encontrá-los e gastá-los, por isso ZIP 320 pede às wallets que derivem endereços efémeros a partir da sua frase-semente. Também pede às wallets que usem sempre um novo endereço efémero, para que pagamentos separados não possam ser associados entre si.

### O que a blockchain mostra

A regra TEX reside nas wallets. Os nós não a verificam, pelo que as regras de consenso permanecem iguais. Na blockchain, um pagamento para um endereço TEX tem o mesmo aspeto que um pagamento para o endereço correspondente de `t1`. O montante, o endereço efémero e o endereço da exchange são públicos, tal como em qualquer transação transparente.

## Páginas relacionadas

- [Exchanges de custódia](/using-zcash/custodial-exchanges): que exchanges aceitam que tipos de endereço, incluindo os depósitos TEX de Binance.
- [Wallets](/using-zcash/wallets): utilize o filtro de Endereço TEX para encontrar wallets que podem pagar a um endereço TEX.
- [Pools blindados](/using-zcash/shielded-pools): onde se encontra o seu saldo privado antes de um pagamento TEX mover parte dele para fora.
- [Quem pode ver o seu pagamento de Zcash](/start-here/who-can-see-your-zcash-payment): o que se torna visível quando os fundos saem do pool blindado.
- [O que um explorador de blocos pode ver](/zcash-tech/what-a-block-explorer-can-see): como um pagamento transparente aparece na blockchain.
- [Zcash URIs de pedido de pagamento](/using-zcash/payment-request-uris): outro padrão de wallet para pagamentos pré-preenchidos.

**Última atualização:** outubro de 2026
