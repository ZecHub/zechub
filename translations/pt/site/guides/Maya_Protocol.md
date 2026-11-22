<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Corretora descentralizada Maya

> Maya Protocol é uma DEX cross-chain para conversões nativas (por exemplo, de ETH ou BTC para ZEC) sem tokens encapsulados, contas ou KYC.

## TL;DR

* O Maya converte moedas nativas entre blockchains: você envia um ativo e recebe outro na sua própria chain. Sem tokens encapsulados, sem conta, sem KYC.
* É um fork do THORChain, construído com o SDK do Cosmos e protegido por operadores de nós que depositam capital como garantia (Proof of Bond).
* Seu token nativo é o $CACAO. Os provedores de liquidez ganham taxas de conversão e ficam cobertos pela Proteção contra Perda Impermanente (ILP) após 50 dias.
* O Maya é um backend: você o usa por meio de um frontend ou carteira como THORWallet, CacaoSwap, Asgardex, Ctrl Wallet ou KeepKey.
* O vídeo tutorial mostra uma conversão de ETH para ZEC no LeoDex, um desses frontends.
* O Maya oferece suporte a depósitos de ZEC blindados/unificados via SwapKit (saída de valor transparente mais um memorando blindado), então alguns frontends podem entregar ZEC diretamente em um endereço unificado. Se o seu pagar para um endereço transparente (t1), blinde os fundos na sua carteira depois, para ter privacidade.
* O Maya não é a única opção para conversões nativas de ZEC: o THORChain também tem uma pool nativa de ZEC.

## Explicação principal

Uma corretora centralizada guarda suas moedas e exige sua identidade. O Maya, em vez disso, usa uma rede de nós que controlam cofres em cada chain suportada. Você envia moedas para um cofre do Maya, pelo menos dois terços dos nós confirmam o depósito, e o ativo correspondente é enviado de outro cofre para o seu endereço na chain de destino.

Os operadores de nós depositam uma garantia que pode ser penalizada (*slashing*) se agirem de forma indevida, o que lhes dá um motivo financeiro para permanecerem honestos. O Maya adiciona recursos ao THORChain, como nós de liquidez e seu próprio modelo de reservas, e também funciona como uma segunda rede independente ao lado dele.

As seções abaixo explicam como o Maya funciona, o que é Proof of Bond, como ele difere do THORChain e quais carteiras oferecem suporte a ele.

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## O que é o Maya Protocol?

O Maya é um sistema de [corretora descentralizada](https://nym.com/blog/what-is-dex) (DEX) que permite negociar criptomoedas entre diferentes blockchains. Você pode, por exemplo, converter Bitcoin (BTC) na blockchain do Bitcoin em Ethereum (ETH) na blockchain do Ethereum de forma fácil, sem que ninguém custodie os ativos e sem envolver autoridades centralizadas ou procedimentos de Know Your Customer (KYC).

O Maya Protocol foi desenvolvido usando o Software Development Kit do Cosmos (SDK do Cosmos) e opera com um mecanismo de consenso Proof of Bond (PoB). O protocolo é mantido por "operadores de nós", que fazem staking de capital no sistema e recebem retornos como recompensa por sua contribuição e esforço. Basicamente, os nós são computadores que executam um software que valida as conversões dos usuários e supervisiona os ativos em endereços designados em diferentes blockchains.

Para concluir uma conversão, a criptomoeda suportada precisa ser recebida em um dos endereços do Maya, enviada por um usuário, e então um valor equivalente é enviado de outro endereço do Maya em uma blockchain diferente. Esse processo é gerenciado e aprovado por pelo menos dois terços dos nós, que garantem principalmente que os fundos foram recebidos corretamente.

Dessa forma, os usuários podem enviar um tipo de token em uma blockchain e receber um tipo diferente em outra blockchain, tudo de forma nativa e sem usar tokens encapsulados.

## O que é Proof of Bond?

Proof of Bond (PoB) é um mecanismo de consenso no qual os operadores de nós precisam depositar uma garantia (geralmente no token nativo da rede) para participar da rede. Essa garantia funciona como uma forma de segurança econômica, assegurando que os nós ajam com honestidade e mantenham a integridade da rede. Se um nó tentar agir de forma maliciosa ou deixar de cumprir suas funções, sua garantia pode ser penalizada, ou seja, uma parte dela é retirada como punição.

No Maya Protocol, esse mecanismo ajuda a gerar valor econômico a partir dos recursos em staking dos operadores de nós, aumentando a eficiência do capital. Da mesma forma, no THORChain, os operadores de nós depositam RUNE (o token nativo) como garantia para proteger a rede e assegurar a cooperação entre os participantes.

## Diferenças entre o Maya e o THORChain

O Maya é um fork do THORChain, mas traz alguns recursos e funcionalidades novos que o tornam uma ótima alternativa. Os mais importantes são:

### Nós de liquidez

Em vez de seguir o modelo de garantia pura, o Maya está considerando migrar para um modelo de nós de liquidez. Nesse sistema, os nós podem contribuir diretamente com liquidez, depositando-a como garantia na rede. Essa abordagem significa que os operadores de nós correm um risco significativo: se usarem os fundos de forma indevida, sofrem perdas, o que funciona como um forte fator de dissuasão. Como resultado, os operadores de nós usam Unidades de Liquidez das pools de liquidez, que ao mesmo tempo fornecem liquidez e reforçam a segurança da rede.

### Proteção contra Perda Impermanente

Um sistema que protege os provedores de liquidez (LPs) da perda temporária que podem sofrer ao fornecer liquidez, devido às constantes flutuações nos preços dos criptoativos.
A ILP detém 10% do suprimento de $CACAO (10 milhões de $CACAO) e é reabastecida continuamente com 10% das taxas do protocolo. A ILP passa a valer 50 dias após um depósito de liquidez, com cobertura limitada a 100%.

A duração da cobertura da ILP depende do desempenho do ATIVO e do $CACAO. A cobertura total é atingida após 150 dias se o ATIVO tiver desempenho melhor, e após 450 dias se o $CACAO tiver desempenho melhor. A ILP é paga e reiniciada no saque total, mas não é afetada por saques parciais. Em caso de recargas, a ILP é reiniciada, mas não é paga.

### Um modelo de alocação diferente

O Leilão de Liquidez foi um evento de 21 dias criado para distribuir tokens $CACAO entre os participantes. Durante o evento, os usuários depositaram ativos suportados em um endereço específico. Ao final do leilão, 90% dos tokens $CACAO foram alocados aos participantes na proporção de suas contribuições de liquidez, enquanto os 10% restantes foram destinados à reserva da ILP. Os participantes se tornaram provedores de liquidez, com seus ativos depositados e tokens $CACAO colocados nas pools do Maya, o que lhes permite receber uma parte das taxas geradas.

### Uma forma diferente de lidar com as reservas

Na gênese do Maya Protocol, as reservas de CACAO disponíveis eram apenas 10% do suprimento total, contra 44% no THORChain, e destinavam-se principalmente à Proteção contra Perda Impermanente (ILP). O Maya não tem emissões por bloco; e, se a Liquidez de Propriedade do Protocolo e os Empréstimos forem implementados, terão um design diferente, já que no THORChain esses aspectos estão intimamente integrados às Reservas.

Ainda assim, apesar das diferenças, o Maya também serve como uma solução complementar ao THORChain, oferecendo redundância, extensão e validação, além de integrar novas redes que não existem na implementação atual do THORChain.

Além disso, o objetivo do Maya é se tornar um *backend* sobre o qual outros serviços possam ser construídos, na esperança de ver surgirem muitos novos *frontends*, ou serviços de DEX, construídos sobre a infraestrutura do Maya.

## Integração de carteiras com o Maya Protocol

Atuando como *backend*, o Maya precisa ser suportado por diferentes interfaces e carteiras para ser usado.
Veja uma lista com alguns dos serviços que já oferecem suporte ao Maya:

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, Keystore

El Dorado: não está mais online, seu domínio não resolve.

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: não está mais online, seu domínio não resolve.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): uma carteira de autocustódia multiecossistema com suporte a mais de 30 blockchains nativas e a todas as chains EVM e Cosmos, incluindo Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON e outras.

[KeepKey ](https://keepkey.com/): uma carteira de hardware para armazenar ativos digitais com segurança.
