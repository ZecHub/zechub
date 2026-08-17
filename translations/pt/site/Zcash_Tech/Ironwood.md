<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Ironwood

> Ironwood é ativado na mainnet da Zcash no bloco 3.428.143, previsto para cerca de 28 de julho de 2026 UTC.

O que vais aprender: o que o Ironwood muda, porque é grave existir um bug em dinheiro oculto e como o turnstile permite a qualquer pessoa confirmar que nenhum ZEC foi forjado.

Ironwood é uma [atualização de rede](../start-here/network-upgrades) da Zcash, formalmente a NU6.3, que introduz uma nova shielded pool com o mesmo nome. Uma [shielded pool](../using-zcash/shielded-pools) é o conjunto de fundos cujos montantes e proprietários permanecem ocultos pela [criptografia de conhecimento zero](../zcash-tech/zk-snarks). O Ironwood existe para conter e auditar um bug de solidez encontrado na shielded pool Orchard existente, e para dar à comunidade uma forma mais robusta de verificar que a oferta total de ZEC é legítima. As suas regras de consenso estão especificadas na [ZIP 258](https://zips.z.cash/zip-0258).

Porque isto é importante. Com dinheiro transparente como o Bitcoin, qualquer pessoa pode verificar que não foram forjadas moedas lendo o registo público. O dinheiro blindado oculta os montantes, por isso não basta olhar. Em vez disso, é a própria criptografia que tem de garantir que ninguém consegue criar dinheiro em segredo. O Ironwood é importante porque foi encontrado um bug nessa garantia para a pool Orchard. A atualização fecha essa falha e dá a qualquer pessoa uma forma de confirmar que a oferta total de ZEC continua a ser legítima.

És novo na Zcash? Começa por [O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash) e [Shielded Pools](../using-zcash/shielded-pools), e depois volta aqui.

![Fluxo de migração de valor do Ironwood: o valor sai da pool Orchard, passa pelo ponto de controlo do turnstile e entra na nova pool Ironwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Porque foi necessário o Ironwood

No final de maio de 2026, o investigador independente de segurança Taylor Hornby, durante uma auditoria ao protocolo para a [Shielded Labs](../zcash-organizations/shielded-labs), divulgou de forma responsável um bug de solidez na shielded pool Orchard. A Orchard era, na altura, a mais recente shielded pool da Zcash, e a falha encontrava-se numa parte de curva elíptica do seu circuito de conhecimento zero, que usa o sistema de provas [Halo](../zcash-tech/halo) 2.

1. Um bug de solidez significa que a matemática que prova que uma transação é válida não o garante completamente.
2. Em teoria, um atacante poderia ter usado a falha para forjar valor inválido dentro da pool Orchard e gastar fundos que na realidade não lhe pertenciam, sem deixar vestígios que um nó normal conseguisse detetar.
3. O turnstile da Zcash continuava, ainda assim, a limitar a quantidade de valor que alguma vez poderia sair da Orchard, pelo que a oferta total não podia ser inflacionada, mas a criptografia da própria pool já não garantia que cada moeda oculta dentro dela fosse real.

![Explicação do bug: uma transação coloca 5 ZEC, mas a prova defeituosa continua a ser aceite quando saem 7 ZEC, criando 2 ZEC do nada](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

Os números acima são uma imagem simplificada. A falha real estava numa parte específica da matemática do circuito, não numa contagem literal de moedas a entrar e a sair. A ideia essencial é apenas que um bug de solidez pode permitir criar valor dentro da pool sem deteção.

É importante salientar que não há qualquer evidência de que o bug alguma vez tenha sido explorado, não há evidência de impacto nos fundos dos utilizadores e não há evidência de que a oferta total de ZEC tenha mudado. Foi descoberto através de investigação de segurança e corrigido antes de qualquer dano conhecido.

## A resposta

A comunidade Zcash lançou correções por fases, em vez de tudo de uma só vez.

![Cronologia da resposta ao Ironwood: o bug da Orchard é encontrado em maio de 2026, a pool é suspensa em junho de 2026, o circuito é corrigido na NU6.2 e o Ironwood é ativado por volta de 28 de julho de 2026](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. No início de junho de 2026, uma medida temporária desativou a pool Orchard enquanto era preparada uma correção completa.
2. A atualização NU6.2 corrigiu o próprio circuito Orchard, fechando a vulnerabilidade de solidez subjacente.
3. A atualização NU6.3, Ironwood, introduz uma nova shielded pool e um ponto de controlo público para que o valor possa sair da antiga pool Orchard sob auditoria completa.

![A correção na NU6.2: a prova corrigida exige que as entradas sejam iguais às saídas, pelo que uma saída válida de 5 ZEC é aceite, enquanto uma tentativa de emitir 7 ZEC é rejeitada](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## O que faz a pool Ironwood

A NU6.2 tornou seguro o circuito Orchard para todas as novas transações, mas o valor criado sob as regras antigas continua na pool Orchard. O Ironwood dá a esse valor um destino limpo e uma forma de o auditar à medida que se move.

A pool Ironwood é uma nova pool de valor blindado criada quando a NU6.3 é ativada. É construída sobre o circuito corrigido e usa um formato de nota recuperável face à computação quântica (um design que permite recuperar fundos se os [computadores quânticos](../zcash-tech/post-quantum-security) vierem a quebrar a criptografia atual), definido na [ZIP 2005](https://zips.z.cash/zip-2005).

1. Após a ativação, a antiga pool Orchard passa a ser apenas para gasto, pelo que não poderá entrar nela novo valor.
2. O novo valor blindado passa a entrar no Ironwood.
3. O ZEC blindado mantém as mesmas fortes garantias de privacidade que ocultam remetente, destinatário e montante.

## O turnstile

A ideia central do Ironwood é o turnstile, um ponto de controlo contabilístico pelo qual cada moeda tem de passar ao mover-se da antiga pool Orchard para a Ironwood.

> Um turnstile faz pelo dinheiro oculto o que uma porta de vidro faz por um cofre bancário. Continuas sem conseguir ver o interior, mas podes contar exatamente o que entra e o que sai.

1. Os fundos que saem da Orchard são contados num ponto público de verificação antes de entrarem no Ironwood.
2. Isto permite a qualquer pessoa auditar quanto ZEC migra, reforçando a confiança na oferta circulante real.
3. Se algum ZEC falsificado tivesse sido criado através do bug anterior, seria nesta contabilidade de migração que ele apareceria.

Os turnstiles não são novidade na Zcash. A rede já os usou antes, nas fronteiras entre as pools Sprout, Sapling e Orchard, para que o valor que se move entre pools permaneça auditável e para que nenhuma pool possa libertar mais do que aquilo que nela entrou legitimamente.

As regras de consenso mantêm cada pool de valor, incluindo a Ironwood, dentro do limite máximo de dinheiro da rede, pelo que os saldos das pools nunca podem ficar negativos.

## O que os utilizadores precisam de fazer

As wallets e o software de nó tratam da maior parte disto automaticamente, mas a mudança prática é simples: ao longo do tempo, mover as participações blindadas da antiga pool Orchard através do turnstile para a pool Ironwood. Segue as orientações do fornecedor da tua wallet e atualiza sempre para uma versão suportada antes do bloco de ativação.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Shielded pool | O conjunto de fundos cujos montantes e proprietários são ocultados por criptografia de conhecimento zero |
| Bug de solidez | Uma falha que permite que uma transação inválida passe na verificação da prova como se fosse válida |
| Turnstile | Um ponto de controlo público que conta o valor em movimento entre pools para que a oferta continue auditável |
| Apenas para gasto | Uma pool da qual podes gastar, mas à qual não podes adicionar novo valor |
| Atualização de rede (NU) | Uma alteração coordenada às regras de consenso da Zcash, ativada numa determinada altura de bloco |
| Nota recuperável face à computação quântica | Um formato de nota concebido para que os fundos possam ser recuperados se os computadores quânticos vierem a quebrar a criptografia atual |

## FAQ

O meu ZEC foi afetado? Não. Não há evidência de que o bug alguma vez tenha sido usado, não houve impacto nos fundos dos utilizadores e não houve alteração na oferta total.

Preciso de fazer alguma coisa? Mantém a tua wallet e o software de nó atualizados para uma versão suportada antes do bloco de ativação. A tua wallet move os fundos para o Ironwood ao longo do tempo à medida que gastas, por isso não há nada manual que exija pressa. Segue as orientações do fornecedor da tua wallet.

A Zcash continua privada? Sim. O Ironwood mantém a mesma privacidade blindada que oculta remetente, destinatário e montante. Esta atualização diz respeito à integridade da oferta, não à privacidade.

O bug chegou alguma vez a ser explorado? Não há evidência disso. Foi descoberto através de investigação de segurança, divulgado de forma responsável e corrigido antes de qualquer dano conhecido.

O que acontece à antiga pool Orchard? Passa a ser apenas para gasto. Nenhum novo valor pode entrar nela, e o valor existente move-se para o Ironwood através do turnstile, onde a migração é auditada publicamente.

## Testa a tua compreensão

Se o ZEC dentro das shielded pools está oculto, como pode alguém confirmar que o bug da Orchard não inflacionou secretamente a oferta total?

<details>
<summary>Resposta</summary>

Através do turnstile. Cada moeda que sai da antiga pool Orchard é contada num ponto de controlo público ao entrar no Ironwood. Se mais valor tentasse sair do que aquele que entrou legitimamente, a contabilidade não bateria certo, por isso qualquer falsificação que o bug pudesse ter criado viria ao de cima nesse ponto de passagem.
</details>

### Recursos

[ZIP 258: Implementação da Atualização de Rede NU6.3](https://zips.z.cash/zip-0258)

[ZIP 257: Implementação da Mitigação Temporária da Vulnerabilidade da Orchard e da Atualização de Rede NU6.2](https://zips.z.cash/zip-0257)

[ZIP 2005: Recuperabilidade Quântica do Ironwood](https://zips.z.cash/zip-2005)

[Ironwood: Uma Nova Shielded Pool para a Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Ver também

[Atualizações de Rede da Zcash](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Segurança Pós-Quântica](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash)

---

Série: [Índice das Atualizações de Rede](../start-here/network-upgrades) · Anterior: [NU6.2](../zcash-tech/nu6-2)
