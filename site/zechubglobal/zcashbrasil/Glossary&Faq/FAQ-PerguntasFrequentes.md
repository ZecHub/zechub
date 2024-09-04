# Perguntas Frequentes (FAQ)

Uma lista de tópicos com as perguntas mais frequentes sobre a Zcash. Para solucionar problemas com o Zcash Client, consulte a [documentação de solução de problemas](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html).

## O que é a Zcash?

Zcash é uma moeda digital com baixas taxas, rápida e confidencial. A privacidade é a característica central da Zcash. Ela pioneirou o uso de provas de conhecimento zero (ou zero knowledge proof) para proteger as informações dos usuários, criptografando todas as transações. Existem várias carteiras que você pode baixar para pagamentos instantâneos, móveis, seguros e privados.

[Carteiras Mobile](https://z.cash/wallets/)

## Como posso adquirir Zcash?

Você pode comprar ZEC em [exchanges](https://z.cash/exchanges) de criptomoedas. Você também pode adquirir Zcash diretamente de outra pessoa de forma peer-to-peer (P2P). Tenha cuidado ao trocar com serviços e indivíduos que você não está familiarizado. Você também pode adquirir Zcash através da mineração.

## Qual é a diferença entre a Zcash e outras criptomoedas?

O Zcash é fundamentalmente mais privado do que outras criptomoedas, como Bitcoin ou Ethereum. A Zcash suporta blocos rápidos (75 segundos), baixas taxas e tem agendas regulares de atualização, o que significa que esse protocolo é altamente adaptável. Uma característica fundamental é a privacidade opcional, mas altamente segura.

Os usuários podem selecionar se uma transação é feita na parte transparente ou blindada da Blockchain. Para mais informações, consulte [aqui](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html)

## Como o protocolo Zcash é governado?

O protocolo é governado pelo processo de Proposta de Melhoria do Zcash/Zcash Improvements Proposal. O processo de ZIP fornece um local e uma estrutura aberta para avaliar coletivamente as mudanças na Zcash.

Qualquer pessoa pode enviar um rascunho de ZIP. Os rascunhos de ZIP são debatidos pela comunidade em geral e, em seguida, aceitos ou rejeitados pelos editores de ZIP.

Atualmente, existem dois editores de ZIP - [Daira Hopwood](https://twitter.com/feministPLT) representa a Electric Coin Company e [Conrado](https://twitter.com/conradoplg) representa a Zcash Foundation.

As decisões do processo ZIP são escritas na especificação da Zcash, bem como no software que executa a rede. As mudanças são "ratificadas" on-chain quando a maioria da rede adota a atualização e não quebra o consenso.

## Onde está minha transação?

Primeiro, leia [nosso artigo](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) sobre exploradores de blocos. Em seguida, verifique com o [Block Explorer Zcash](https://zcashblockexplorer.com), observando que todas as transações expiram por padrão após cerca de 25 minutos/20 blocos e os fundos são devolvidos ao endereço de envio original.

Se sua transação expirar, a melhor coisa a fazer é tentar a transação novamente com algumas possíveis modificações.

Existem várias razões pelas quais sua transação pode não estar incluída em um bloco:

+ Perda de conectividade

+ Taxa de transação muito baixa

+ Sobrecarga da rede

+ Muitas entradas transparentes (tamanho da transação muito grande)

**Sugerimos tentar sua transação novamente com:**

+ Tente novamente com uma conexão melhor

+ Use a taxa padrão

+ Tente novamente mais tarde ou aumente a taxa para transações de alta prioridade

+ Use uma quantidade mínima de entradas para limitar o tamanho ou aumente a taxa para transações grandes

## A Zcash é realmente privada?

Sim, a Zcash permite privacidade completa para os usuários, criptografando dados do remetente, do destinatário e do valor dentro de transações de assinatura única publicadas em sua Blockchain, especificamente para transações envolvendo endereços blindados.

A Zcash não criptografa dados para transações de múltiplas assinaturas (aguardando a integração do FROST) ou protege contra correlações feitas com transações públicas transparentes (por exemplo, quando a Zcash é negociada para/de outra criptomoeda), nem obscurece endereços IP.

Leia mais aqui: [Ecossistema Blindado](https://electriccoin.co/blog/shielded-ecosystem)

## Alguns equívocos comuns

+ A Zcash é uma moeda centralizada?

   Não, existe um acordo de marca registrada que impede a Zcash Foundation ou a ECC de tomar qualquer medida contrária ao consenso claro da comunidade Zcash.

   O consenso claro é determinado por meio de votação da comunidade dentro e fora do Painel Consultivo da Comunidade (ZCAP), um grupo de ~100+ voluntários com amplo interesse ou conhecimento do ecossistema Zcash.

   Aqui, a Messari Research detalha a história comprovada de governança descentralizada e tomada de decisão conduzida pela comunidade da Zcash: https://messari.io/report/decentralizing-zcash

Os méritos da votação on-chain e da votação de holders de moedas têm sido discutidos para um possível mecanismo de Proof of Stake futuro. Já foi usado pela comunidade da Zcash, veja [aqui](https://forum.zcashcommunity.com/t/coin-holder-polling-instructions/40170).

Projetos como o clube ZK A/V e a ZecHub permitem participação e contribuição diversificadas de membros da comunidade ou indivíduos interessados em produzir conteúdo de qualidade assincronamente, com oportunidades de ganhar ZEC sem KYC.

   Para obter informações sobre as principais organizações da Zcash e os cargos em cada equipe das organizações, consulte [aqui](https://zechub.notion.site/Zcash-Basics-d2946ad9c3b541759174dbcbf0e8c9cc)

   Para aprender exatamente como o Fundo de Desenvolvimento da Zcash é dividido entre as principais organizações, clique [aqui](https://zechub.notion.site/Zcash-Development-Fund-aa3e0ac2a8514d97aef5254f3b76d7b2).

+ A Zcash possui uma backdoor?

   Não, nem a Zcash nem quaisquer outros algoritmos criptográficos ou software que desenvolvemos contêm uma backdoor e nunca irão conter.

+ A Zcash é controlada por uma corporação?

   Incorreto. Embora a Zcash tenha se associado a grandes empresas e bancos para programas de pesquisa e divulgação, continuamos comprometidos em alcançar nosso objetivo de liberdade econômica e resiliência por meio da descentralização.

   A Zcash tem várias organizações que mantêm um nível de autonomia e, portanto, não são dependentes de nenhum único partido. Em vez disso, trabalham juntas para promover a auto-custódia de ativos, financiar implementações independentes de nós e liderar na educação regulatória relacionada à defesa da privacidade digital e proteção dos direitos humanos.

+ A Zcash tem privacidade limitada em comparação com outras moedas de privacidade

   Não, a privacidade obtida a partir de uma moeda de privacidade como Monero ou Grin/Litecoin depende principalmente do uso de iscas que obscurecem a origem e o destino das transações. Os dados do grafo de transações ainda são acessíveis.

   Se um adversário gastasse tempo e recursos suficientes monitorando a chain, esse tipo de privacidade poderia ser derrotado. A Zcash criptografa todos os dados da transação, portanto, o mesmo método de ataque não funcionaria. Todas as transações são indistinguíveis dentro de uma pool blindada.

   Não há solução perfeita, especialmente se qualquer adversário tiver acesso a tempo e recursos significativos, como redes neurais de inteligência artificial. Especificamos as circunstâncias (crescentes) em que pode ser mais benéfico usar uma solução de conhecimento zero em vez de uma baseada em isca.
   
   [Leia mais](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)
