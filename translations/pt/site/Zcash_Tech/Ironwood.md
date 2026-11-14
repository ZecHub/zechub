<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> O Ironwood foi ativado na mainnet do Zcash no bloco 3.428.143, em 28 de julho de 2026 UTC, e está em funcionamento desde então.

O que você vai aprender: o que o Ironwood muda, por que um bug em dinheiro oculto é grave e como a catraca permite que qualquer pessoa confirme que nenhum ZEC foi falsificado.

O Ironwood é uma Zcash [atualização da rede](../start-here/network-upgrades), formalmente NU6.3, que introduz um novo pool blindado de mesmo nome. Um [pool blindado](../using-zcash/shielded-pools) é o conjunto de fundos cujos valores e proprietários permanecem ocultos pela [criptografia de conhecimento zero](../zcash-tech/zk-snarks). O Ironwood existe para conter e auditar um bug de solidez encontrado no pool blindado Orchard existente, e para dar à comunidade uma forma mais robusta de verificar que a oferta total de ZEC é honesta. Suas regras de consenso estão especificadas na [ZIP 258](https://zips.z.cash/zip-0258).

Por que isso importa. Com dinheiro transparente, como o Bitcoin, qualquer pessoa pode verificar que nenhuma moeda foi falsificada lendo o registro público. O dinheiro blindado oculta os valores, então não dá para simplesmente olhar. Em vez disso, a própria criptografia precisa garantir que ninguém possa criar dinheiro em segredo. O Ironwood importa porque foi encontrado um bug nessa garantia para o pool Orchard. A atualização fecha essa brecha e dá a qualquer pessoa uma forma de confirmar que a oferta total de ZEC continua honesta.

É novo no Zcash? Comece por [O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Pools blindados](../using-zcash/shielded-pools), e depois volte aqui.

![Fluxo de migração de valor do Ironwood: o valor sai do pool Orchard, passa pelo ponto de controle da catraca e entra no novo pool Ironwood](/content-images/ironwood-flow-8af7a58b99.webp)

## Por que o Ironwood foi necessário

No final de maio de 2026, o pesquisador de segurança independente Taylor Hornby, durante uma auditoria de protocolo para [Shielded Labs](../zcash-organizations/shielded-labs), divulgou de forma responsável um bug de solidez no pool blindado Orchard. O Orchard era, na época, o pool blindado mais recente do Zcash, e a falha estava em uma parte de curva elíptica do seu circuito de conhecimento zero, que usa o sistema de provas [Halo](../zcash-tech/halo) 2.

1. Um bug de solidez significa que a matemática que prova que uma transação é válida não garante isso totalmente.
2. Em teoria, um invasor poderia ter usado a falha para forjar valor inválido dentro do pool Orchard e gastar fundos que não eram realmente dele, sem deixar nenhum rastro que um nó comum detectaria.
3. A catraca do Zcash ainda limitava quanto valor poderia sair do Orchard, então a oferta total não podia ser inflada, mas a própria criptografia do pool já não garantia que cada moeda oculta dentro dele fosse real.

![O bug explicado: uma transação recebe 5 ZEC de entrada, mas a prova defeituosa ainda é aceita quando saem 7 ZEC, criando 2 ZEC do nada](/content-images/ironwood-bug-8f689d6f61.webp)

Os números acima são uma representação simplificada. A falha real estava em uma parte específica da matemática do circuito, não em uma contagem literal de moedas entrando e saindo. O ponto a reter é apenas que um bug de solidez pode permitir que valor seja criado dentro do pool sem ser detectado.

É importante destacar que não há evidência de que o bug tenha sido explorado, nenhuma evidência de impacto nos fundos dos usuários e nenhuma evidência de que a oferta total de ZEC tenha mudado. Ele foi encontrado por meio de pesquisa de segurança e corrigido antes de qualquer dano conhecido.

## A resposta

A comunidade do Zcash lançou as correções em etapas, e não todas de uma vez.

![Linha do tempo da resposta Ironwood: o bug do Orchard é encontrado em maio de 2026, o pool é pausado em junho de 2026, o circuito é corrigido no NU6.2 e o Ironwood foi ativado no bloco 3,428,143 em 28 de julho de 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. No início de junho de 2026, uma medida temporária desativou o pool Orchard enquanto uma correção completa era preparada.
2. A atualização NU6.2 corrigiu o próprio circuito do Orchard, fechando a vulnerabilidade de solidez subjacente.
3. A atualização NU6.3, o Ironwood, introduz um novo pool blindado e um ponto de verificação público para que o valor possa sair do antigo pool Orchard sob auditoria completa.

![A correção no NU6.2: a prova corrigida exige que as entradas sejam iguais às saídas, então uma saída válida de 5 ZEC é aceita, enquanto uma tentativa de gerar uma saída de 7 ZEC é rejeitada](/content-images/ironwood-fix-bb4f70ddc9.webp)

## O que o pool Ironwood faz

O NU6.2 protegeu o circuito do Orchard para todas as novas transações, mas o valor criado sob as regras antigas ainda está no pool Orchard. O Ironwood dá a esse valor um destino limpo e uma forma de auditá-lo enquanto ele se move.

O pool Ironwood é o pool de valor blindado criado pela NU6.3 no bloco 3.428.143. Ele é construído sobre o circuito corrigido e usa um formato de note recuperável contra ataques quânticos (um design que permite recuperar os fundos caso [computadores quânticos](../zcash-tech/post-quantum-security) um dia quebrem a criptografia atual), definido na [ZIP 2005](https://zips.z.cash/zip-2005).

1. Após a ativação, o antigo pool Orchard passa a ser somente de gasto, então nenhum valor novo pode entrar nele.
2. O valor recém-blindado passa a ir para o Ironwood.
3. Dentro do Ironwood, o ZEC blindado mantém a privacidade que oculta remetente, destinatário e valor. Mover ZEC do Orchard para o Ironwood revela o valor movido.

## A catraca

A ideia central do Ironwood é a catraca, um ponto de verificação contábil pelo qual toda moeda precisa passar ao sair do antigo pool Orchard para o Ironwood.

> Uma catraca faz pelo dinheiro oculto o que uma porta de vidro faz por um cofre de banco. Você continua sem ver o que há dentro, mas pode contar exatamente o que entra e o que sai.

1. Os fundos que saem do Orchard são contados em um ponto de verificação público antes de entrarem no Ironwood.
2. Isso permite que qualquer pessoa audite quanto ZEC migra, reforçando a confiança na oferta circulante real.
3. Se algum ZEC falsificado tivesse sido criado por meio do bug anterior, é nessa contabilidade da migração que ele apareceria.

Catracas não são novidade no Zcash. A rede já as usou antes, nas fronteiras entre os pools Sprout, Sapling e Orchard, para que o valor que se move entre pools continue auditável e nenhum pool possa liberar mais do que legitimamente entrou nele.

As regras de consenso mantêm todos os pools de valor, incluindo o Ironwood, dentro do limite máximo de dinheiro da rede, de modo que os saldos dos pools nunca podem ficar negativos.

## O que os usuários precisam fazer

As carteiras e os softwares de nó cuidam da maior parte disso automaticamente, mas a mudança prática é simples: com o tempo, mova seus saldos blindados do antigo pool Orchard pela catraca para o pool Ironwood. Cada movimentação mostra seu valor na blockchain, por isso as carteiras que seguem a [ZIP 318](https://zips.z.cash/zip-0318) dividem esse valor em quantias padronizadas e as enviam ao longo do tempo. Siga as orientações do provedor da sua carteira e mantenha seu software em uma versão com suporte.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Shielded pool | O conjunto de fundos cujos valores e proprietários são ocultados pela criptografia de conhecimento zero |
| Soundness bug | Uma falha que permite que uma transação inválida passe na verificação da prova como se fosse válida |
| Turnstile | Um ponto de verificação público que conta o valor que se move entre pools para que a oferta continue auditável |
| Spend-only | Um pool do qual você pode gastar, mas ao qual não pode adicionar novo valor |
| Network upgrade (NU) | Uma mudança coordenada nas regras de consenso do Zcash, ativada em uma altura de bloco definida |
| Quantum-recoverable note | Um formato de note projetado para que os fundos possam ser recuperados caso computadores quânticos um dia quebrem a criptografia atual |

## Perguntas frequentes

Meu ZEC foi afetado? Não. Não há evidência de que o bug tenha sido usado, nenhum impacto nos fundos dos usuários e nenhuma mudança na oferta total.

Preciso fazer alguma coisa? Mantenha sua carteira e seu software de nó em uma versão com suporte. Gastar fundos do Orchard os move para o Ironwood, e o valor que atravessa é público. Algumas carteiras oferecem uma migração que envia quantias padronizadas ao longo do tempo, para que seu saldo seja mais difícil de vincular. Siga as orientações do provedor da sua carteira.

O Zcash continua privado? Sim. Os pagamentos dentro do Ironwood ocultam remetente, destinatário e valor, assim como os pagamentos no Orchard. O valor que se move entre pools, como do Orchard para o Ironwood, é público. Esta atualização trata da integridade da oferta.

O bug chegou a ser explorado? Não há evidência de que tenha sido. Ele foi encontrado por meio de pesquisa de segurança, divulgado de forma responsável e corrigido antes de qualquer dano conhecido.

O que acontece com o antigo pool Orchard? Ele passa a ser somente de gasto. Nenhum valor novo pode entrar nele, e o valor existente vai para o Ironwood pela catraca, onde a migração é auditada publicamente.

## Teste seu entendimento

Se o ZEC dentro dos pools blindados fica oculto, como alguém pode confirmar que o bug do Orchard não inflou secretamente a oferta total?

<details>
<summary>Resposta</summary>

Pela catraca. Cada moeda que sai do antigo pool Orchard é contada em um ponto de verificação público ao entrar no Ironwood. Se tentasse sair mais valor do que entrou legitimamente, a contabilidade não fecharia, então qualquer moeda falsificada que o bug pudesse ter criado apareceria nesse portão.
</details>

### Recursos

[ZIP 258: Implantação da atualização da rede NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Implantação da mitigação temporária de vulnerabilidade do Orchard e da atualização da rede NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Recuperabilidade quântica do Ironwood](https://zips.z.cash/zip-2005)

[ZIP 229: Formato de transação versão 6](https://zips.z.cash/zip-0229)

[ZIP 318: Migração do Orchard para o Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Um novo pool blindado para o Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Veja também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Segurança pós-quântica](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice de atualizações da rede](../start-here/network-upgrades) · Anterior: [NU6.2](../zcash-tech/nu6-2) · Próximo: [NU7](../zcash-tech/nu7)
