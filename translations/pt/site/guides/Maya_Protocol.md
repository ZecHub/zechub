# Exchange Descentralizada Maya

---

## Tutorial


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="Como trocar Ethereum por Zcash na LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## O que é o Maya Protocol?

Maya é um sistema de [exchange descentralizada](https://nym.com/blog/what-is-dex) (DEX) que permite negociar criptomoedas entre diferentes blockchains. Você pode, por exemplo, trocar Bitcoin (BTC) na blockchain do Bitcoin por Ethereum (ETH) na blockchain do Ethereum de forma simples, sem custodiar os ativos nem envolver autoridades centralizadas ou procedimentos de Know Your Customer (KYC).

O Maya Protocol foi desenvolvido usando o Cosmos Software Development Kit (Cosmos SDK) e opera com um mecanismo de consenso Proof of Bond (PoB). O protocolo é mantido por "Node Operators", que fazem stake de capital no sistema e recebem retornos como recompensa por sua contribuição e esforços. Essencialmente, os nós são computadores executando software que valida as trocas dos usuários e supervisiona os ativos em endereços designados em diferentes blockchains.

Para concluir uma troca, a criptomoeda suportada deve ser recebida em um dos endereços do Maya, enviada por um usuário, e então um valor equivalente é enviado de outro dos endereços do Maya em uma blockchain diferente. Esse processo é gerenciado e aprovado por pelo menos dois terços dos nós, garantindo em especial que os fundos sejam devidamente recebidos.

Dessa forma, os usuários podem enviar um tipo de token em uma blockchain e receber um tipo diferente em outra blockchain, tudo de forma nativa e sem usar wrapped tokens.

## O que é Proof of Bond?

Proof of Bond (PoB) é um mecanismo de consenso em que os operadores de nós precisam comprometer um bond (geralmente na forma do token nativo da rede) para participar da rede. Esse bond atua como uma forma de segurança econômica, garantindo que os nós ajam honestamente e mantenham a integridade da rede2. Se um nó tentar agir de forma maliciosa ou não cumprir suas funções, seu bond pode sofrer slashing, ou seja, uma parte dele é retirada como penalidade.

No Maya Protocol, esse mecanismo ajuda a gerar valor econômico a partir dos recursos em stake dos operadores de nós, aumentando a eficiência de capital. Da mesma forma, no THORChain, os operadores de nós fazem bond de RUNE (o token nativo) para proteger a rede e assegurar a cooperação entre os participantes.

## Diferenças entre Maya e THORChain

Maya é um fork do THORChain, mas vem com alguns novos recursos e funcionalidades que o tornam uma excelente alternativa. Os mais importantes são

### Nós de Liquidez

Em vez de seguir o Pure Bond Model, Maya está considerando uma transição para um modelo de Liquidity Nodes. Nesse sistema, os nós podem contribuir diretamente com liquidez, vinculando-a à rede. Essa abordagem significa que os operadores de nós enfrentam um risco significativo: se usarem os fundos de forma indevida, incorrem em perdas, o que funciona como um forte fator de dissuasão. Como resultado, os operadores de nós usam Liquidity Units de Liquidity Pools, que ao mesmo tempo fornecem liquidez e reforçam a segurança da rede.

### Proteção contra Perda Impermanente

Um sistema que protege os provedores de liquidez da perda temporária (LPs) que eles podem sofrer ao fornecer liquidez, devido às flutuações constantes nos preços dos criptoativos.
A ILP detém 10% da oferta de $CACAO (10 milhões de $CACAO) e é continuamente reabastecida com 10% das taxas do protocolo. A ILP torna-se ativa 50 dias após um depósito de liquidez, com cobertura limitada a 100%.

A duração da cobertura da ILP depende do desempenho do ASSET e do $CACAO. A cobertura total é atingida após 150 dias se o ASSET tiver melhor desempenho, e após 450 dias se o $CACAO tiver melhor desempenho. A ILP é paga e redefinida no momento de um saque completo, mas não é afetada por saques parciais. Para aportes adicionais, a ILP é redefinida, mas não é paga.

### Um modelo de alocação diferente

O Liquidity Auction foi um evento de 21 dias criado para distribuir tokens $CACAO entre os participantes. Durante o evento, os usuários depositaram ativos suportados em um endereço específico. Ao final do leilão, 90% dos tokens $CACAO foram alocados aos participantes na proporção de suas contribuições de liquidez, enquanto os 10% restantes foram alocados à reserva da ILP. Os participantes tornaram-se provedores de liquidez, com seus ativos depositados e tokens $CACAO colocados nos pools do Maya, permitindo que ganhassem uma parte das taxas geradas.

### Uma forma diferente de lidar com reservas

Na gênese do Maya Protocol, as reservas disponíveis de CACAO eram apenas 10% da oferta total, em comparação com 44% no THORChain, e destinavam-se principalmente à Proteção contra Perda Impermanente (ILP). Maya não possui emissões por bloco; e, se Protocol Owned Liquidity e Lending forem implementados, eles terão um design diferente, pois, no THORChain, esses aspectos estão intimamente integrados às Reservas.

Ainda assim, apesar de suas diferenças, Maya também serve como uma solução complementar ao THORChain, oferecendo redundância, extensão e validação, além de integrar novas redes que não existem na implementação atual do THORChain.

Além disso, o objetivo do Maya é tornar-se um *backend* para que outros serviços possam construir sobre ele, na esperança de ver muitos novos *frontends*, ou serviços DEX construídos sobre a infraestrutura do Maya.

## Integração do Maya protocol com carteiras

Atuando como um *backend*, Maya precisa ser suportado por diferentes UI's e carteiras para ser usado. 
Aqui está uma lista de alguns dos serviços que já oferecem suporte ao Maya:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet e Rabby.

[XDEFI](https://www.xdefi.io/): uma carteira de autocustódia multi-ecossistema com suporte para mais de 30 blockchains nativas, e todas as cadeias EVM e Cosmos, incluindo Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON e mais.

[KeepKey ](https://keepkey.com/): Uma hardware wallet para armazenar ativos digitais com segurança.
