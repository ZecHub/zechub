<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Ironwood

> Ironwood foi ativado na mainnet do Zcash no bloco 3.428.143 em 28 de julho de 2026 UTC e está ativo desde então.

O que você vai aprender: o que o Ironwood muda, por que é grave haver um bug em dinheiro oculto e como a catraca permite que qualquer pessoa confirme que nenhum ZEC foi forjado.

Ironwood é uma [atualização da rede](../start-here/network-upgrades) do Zcash, formalmente a NU6.3, que introduz um novo pool blindado com o mesmo nome. Um [pool blindado](../using-zcash/shielded-pools) é o conjunto de fundos cujos valores e proprietários permanecem ocultos pela [criptografia de conhecimento zero](../zcash-tech/zk-snarks). O Ironwood existe para conter e auditar um bug de solidez encontrado no pool blindado Orchard existente e para dar à comunidade uma forma mais robusta de verificar que a oferta total de ZEC é legítima. Suas regras de consenso estão especificadas na [ZIP 258](https://zips.z.cash/zip-0258).

Por que isso é importante. Com dinheiro transparente como o Bitcoin, qualquer pessoa pode verificar que nenhuma moeda foi forjada lendo o registro público. O dinheiro blindado oculta os valores, por isso não basta olhar. Em vez disso, a própria criptografia precisa garantir que ninguém consiga criar dinheiro em segredo. O Ironwood é importante porque foi encontrado um bug nessa garantia para o pool Orchard. A atualização fecha essa falha e dá a qualquer pessoa uma forma de confirmar que a oferta total de ZEC continua legítima.

Você é novo no Zcash? Comece por [O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Pools blindados](../using-zcash/shielded-pools), depois volte aqui.

![Fluxo de migração de valor do Ironwood: o valor sai do pool Orchard, passa pelo ponto de controle do turnstile e entra no novo pool Ironwood](/content-images/ironwood-flow-8af7a58b99.webp)

## Por que o Ironwood foi necessário

No final de maio de 2026, o pesquisador independente de segurança Taylor Hornby, durante uma auditoria do protocolo para a [Shielded Labs](../zcash-organizations/shielded-labs), divulgou de forma responsável um bug de solidez no pool blindado Orchard. O Orchard era, na época, o mais recente pool blindado do Zcash, e a falha estava em uma parte de curva elíptica de seu circuito de conhecimento zero, que usa o sistema de provas [Halo](../zcash-tech/halo) 2.

1. Um bug de solidez significa que a matemática que prova que uma transação é válida não garante isso completamente.
2. Em teoria, um atacante poderia ter usado a falha para forjar valor inválido dentro do pool Orchard e gastar fundos que não eram realmente seus, sem deixar vestígios que um nó normal detectaria.
3. A catraca do Zcash ainda limitava a quantidade de valor que poderia sair do Orchard, portanto a oferta total não poderia ser inflacionada, mas a criptografia do próprio pool já não garantia que cada moeda oculta dentro dele fosse real.

![Explicação do bug: uma transação insere 5 ZEC, mas a prova defeituosa continua sendo aceita quando saem 7 ZEC, criando 2 ZEC do nada](/content-images/ironwood-bug-8f689d6f61.webp)

Os números acima são uma representação simplificada. A falha real estava em uma parte específica da matemática do circuito, não em uma contagem literal de moedas entrando e saindo. A ideia principal é apenas que um bug de solidez pode permitir que valor seja criado dentro do pool sem detecção.

É importante ressaltar que não há evidência de que o bug tenha sido explorado, de impacto nos fundos dos usuários ou de que a oferta total de ZEC tenha mudado. Ele foi descoberto por meio de pesquisa de segurança e corrigido antes de qualquer dano conhecido.

## A resposta

A comunidade do Zcash lançou correções em etapas, em vez de todas de uma só vez.

![Linha do tempo da resposta ao Ironwood: o bug da Orchard é encontrado em maio de 2026, o pool é suspenso em junho de 2026, o circuito é corrigido na NU6.2 e o Ironwood foi ativado no bloco 3.428.143 em 28 de julho de 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. No início de junho de 2026, uma medida temporária desativou o pool Orchard enquanto uma correção completa era preparada.
2. A atualização NU6.2 corrigiu o próprio circuito Orchard, fechando a vulnerabilidade de solidez subjacente.
3. A atualização NU6.3, Ironwood, introduz um novo pool blindado e um ponto de verificação público para que o valor possa sair do antigo pool Orchard sob auditoria completa.

![A correção na NU6.2: a prova corrigida exige que as entradas sejam iguais às saídas, portanto uma saída válida de 5 ZEC é aceita, enquanto uma tentativa de emitir 7 ZEC é rejeitada](/content-images/ironwood-fix-bb4f70ddc9.webp)

## O que o pool Ironwood faz

A NU6.2 tornou seguro o circuito Orchard para todas as novas transações, mas o valor criado sob as regras antigas ainda está no pool Orchard. O Ironwood dá a esse valor um destino seguro e uma forma de auditá-lo à medida que se move.

O pool Ironwood é o pool de valor blindado criado pela NU6.3 no bloco 3.428.143. Ele é construído sobre o circuito corrigido e usa um formato de note recuperável por computação quântica (um design que permite recuperar fundos se os [computadores quânticos](../zcash-tech/post-quantum-security) vierem a quebrar a criptografia atual), definido na [ZIP 2005](https://zips.z.cash/zip-2005).

1. Após a ativação, o antigo pool Orchard passa a ser apenas para gastos, portanto nenhum novo valor pode entrar nele.
2. O novo valor blindado passa a entrar no Ironwood.
3. Dentro do Ironwood, o ZEC blindado mantém a privacidade que oculta remetente, destinatário e valor. Mover ZEC do Orchard para o Ironwood revela o valor transferido.

## A catraca

A ideia central do Ironwood é a catraca, um ponto de verificação contábil pelo qual cada moeda precisa passar ao se mover do antigo pool Orchard para o Ironwood.

> Uma catraca faz pelo dinheiro oculto o que uma porta de vidro faz por um cofre bancário. Você ainda não consegue ver o interior, mas pode contar exatamente o que entra e o que sai.

1. Os fundos que saem do Orchard são contados em um ponto público de verificação antes de entrarem no Ironwood.
2. Isso permite que qualquer pessoa audite quanto ZEC migra, reforçando a confiança na oferta circulante real.
3. Se algum ZEC falsificado tivesse sido criado por meio do bug anterior, ele apareceria nessa contabilidade de migração.

As catracas não são novidade no Zcash. A rede já as usou antes, nas fronteiras entre os pools Sprout, Sapling e Orchard, para que o valor que se move entre pools permaneça auditável e para que nenhum pool possa liberar mais do que entrou nele legitimamente.

As regras de consenso mantêm cada pool de valor, incluindo o Ironwood, dentro do limite máximo de dinheiro da rede, portanto os saldos dos pools nunca podem ficar negativos.

## O que os usuários precisam fazer

As carteiras e o software de nó cuidam da maior parte disso automaticamente, mas a mudança prática é simples: ao longo do tempo, mova os fundos blindados do antigo pool Orchard através da catraca para o pool Ironwood. Cada transferência mostra seu valor na blockchain, portanto as carteiras que seguem a [ZIP 318](https://zips.z.cash/zip-0318) o dividem em valores padrão e os enviam ao longo do tempo. Siga as orientações do provedor da sua carteira e mantenha seu software em uma versão compatível.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Shielded pool | O conjunto de fundos cujos valores e proprietários são ocultados por criptografia de conhecimento zero |
| Soundness bug | Uma falha que permite que uma transação inválida passe na verificação da prova como se fosse válida |
| Turnstile | Um ponto público de verificação que conta o valor em movimento entre pools para que a oferta permaneça auditável |
| Spend-only | Um pool do qual você pode gastar, mas ao qual não pode adicionar novo valor |
| Network upgrade (NU) | Uma alteração coordenada nas regras de consenso do Zcash, ativada em uma determinada altura de bloco |
| Quantum-recoverable note | Um formato de note projetado para que os fundos possam ser recuperados se os computadores quânticos vierem a quebrar a criptografia atual |

## FAQ

Meu ZEC foi afetado? Não. Não há evidência de que o bug tenha sido usado, de impacto nos fundos dos usuários ou de alteração na oferta total.

Preciso fazer alguma coisa? Mantenha o software da sua carteira e do nó em uma versão compatível. Gastar fundos do Orchard os move para o Ironwood, e o valor que atravessa é público. Algumas carteiras oferecem uma migração que envia valores padrão ao longo do tempo, dificultando associar seu saldo. Siga as orientações do provedor da sua carteira.

O Zcash continua privado? Sim. Os pagamentos dentro do Ironwood ocultam remetente, destinatário e valor, assim como os pagamentos do Orchard. O valor que se move entre pools, como do Orchard para o Ironwood, é público. Esta atualização trata da integridade da oferta.

O bug chegou a ser explorado? Não há evidência disso. Ele foi descoberto por meio de pesquisa de segurança, divulgado de forma responsável e corrigido antes de qualquer dano conhecido.

O que acontece com o antigo pool Orchard? Ele passa a ser apenas para gastos. Nenhum novo valor pode entrar nele, e o valor existente se move para o Ironwood através da catraca, onde a migração é auditada publicamente.

## Teste sua compreensão

Se o ZEC dentro dos pools blindados está oculto, como alguém pode confirmar que o bug do Orchard não inflacionou secretamente a oferta total?

<details>
<summary>Resposta</summary>

Por meio da catraca. Cada moeda que sai do antigo pool Orchard é contada em um ponto público de verificação ao entrar no Ironwood. Se mais valor tentasse sair do que entrou legitimamente, a contabilidade não fecharia, portanto qualquer falsificação que o bug pudesse ter criado apareceria nessa passagem.
</details>

### Recursos

[ZIP 258: Implementação da atualização da rede NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Implementação da mitigação temporária da vulnerabilidade do Orchard e da atualização da rede NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Recuperabilidade quântica do Ironwood](https://zips.z.cash/zip-2005)

[ZIP 229: Formato de transação versão 6](https://zips.z.cash/zip-0229)

[ZIP 318: Migração do Orchard para o Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Um novo pool blindado para o Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Ver também

[Atualizações da rede do Zcash](../start-here/network-upgrades)

[Pools blindados](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Segurança pós-quântica](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice das atualizações da rede](../start-here/network-upgrades) · Anterior: [NU6.2](../zcash-tech/nu6-2)
