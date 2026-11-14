<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pools de valor do Zcash 

## TL;DR

- O Zcash tem atualmente **5 pools de valor**: Sprout (legado), Sapling, Orchard (somente gasto), Ironwood e Transparent.
- **Ironwood** é o atual pool blindado principal, ativo desde a atualização NU6.3 em 28 de julho de 2026.
- **Orchard** agora é **somente gasto**: nenhum valor novo pode entrar nele, e os fundos existentes estão migrando para o Ironwood.
- **Sapling** (endereços z que começam com `zs`) continua amplamente suportado e segue protegendo uma quantidade significativa de ZEC blindado.
- Os endereços **transparentes** (t...) não oferecem nenhuma privacidade nas transações e funcionam de forma semelhante ao Bitcoin.
- **Sprout** é um pool blindado legado que foi retirado do uso ativo.
- A migração do Orchard para o Ironwood está **em andamento** e é auditada publicamente pela catraca.
- Para as garantias de privacidade mais fortes, os usuários devem continuar preferindo transações **de blindado para blindado (z → z)** sempre que possível.


<br/>

## Entendendo os pools de valor do Zcash

O Zcash separa os fundos em sistemas contábeis distintos, conhecidos como pools de valor. Cada pool tem suas próprias regras criptográficas e propriedades de privacidade, enquanto o protocolo acompanha o valor total que circula entre eles.

Hoje, a rede contém cinco pools de valor principais:

- Transparent — Público e totalmente visível on-chain.
- Sapling — O primeiro pool blindado moderno amplamente adotado, ainda ativo.
- Orchard — O pool blindado principal anterior, agora somente gasto.
- Ironwood — O atual pool blindado principal, introduzido pela NU6.3.
- Sprout — O pool blindado original, lançado com o Zcash em 2016.
  


À medida que o Zcash evolui, novos pools blindados podem ser introduzidos para melhorar a segurança, a privacidade, a usabilidade e a auditabilidade, mantendo a compatibilidade com os fundos existentes.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig. 1: Um gráfico mostrando os três pools blindados (Sprout, Sapling e Orchard) até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

## Os pools blindados 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

O Ironwood é o atual pool blindado principal. Ele foi ativado em 28 de julho de 2026, no bloco 3.428.143, como parte da atualização da rede NU6.3, e é onde o novo valor blindado fica agora.

Ele existe porque uma vulnerabilidade foi encontrada no sistema de provas do Orchard em maio de 2026. Não há evidências de que ela tenha sido explorada, mas a falha fazia com que o suprimento blindado não pudesse ser comprovado como íntegro apenas pelas provas. Em vez de corrigir no próprio lugar, a rede criou um pool novo com um circuito corrigido e transferiu o valor por uma catraca que conta publicamente cada moeda. É essa contabilidade que restaura a garantia de que o suprimento blindado tem lastro integral.

O Ironwood reutiliza o modelo de Actions do Orchard e as provas Halo 2, então ele se comporta da mesma forma no dia a dia. Há duas novidades: as transações usam o formato v6, e as notes do Ironwood são **recuperáveis em cenário quântico** segundo a [ZIP 2005](https://zips.z.cash/zip-2005), o que significa que o registro on-chain de uma moeda continua recuperável se um futuro computador quântico quebrar a criptografia atual. Isso é um caminho de recuperação, não resistência quântica, e não se aplica aos pools mais antigos.

Você não precisa de um novo endereço. Os endereços unificados reúnem vários receptores, e as carteiras escolhem o pool certo para você.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig. 2: Um gráfico mostrando o pool Orchard até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

O pool blindado Orchard foi ativado em 31 de maio de 2022 como parte da atualização da rede NU5. O Orchard introduziu um novo protocolo blindado que eliminou a necessidade de uma configuração confiável e se tornou o principal pool blindado usado pelos Unified Addresses (UAs).

O Orchard melhorou significativamente a usabilidade, a eficiência e a privacidade ao reduzir o vazamento de metadados das transações e ao introduzir um modelo de transação mais flexível, baseado em Actions em vez das tradicionais entradas e saídas blindadas.

Desde que a atualização Ironwood foi ativada em 28 de julho de 2026, **o Orchard é somente gasto**. Nenhum valor novo pode entrar no pool. Os fundos que já estão nele ainda podem ser gastos e estão migrando para o Ironwood através da catraca. As carteiras cuidam disso para você, embora a maioria permita algum controle sobre o ritmo. Cada saída do Orchard mostra seu valor na blockchain, então a forma como a carteira divide e programa a migração faz diferença para a privacidade.

Se você tem fundos no Orchard, veja [Ironwood](/zcash-tech/ironwood) para entender o que a migração significa na prática.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig. 3: Um gráfico mostrando o pool Sapling até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

O [Zcash Sapling](https://z.cash/upgrade/sapling) foi uma atualização do protocolo Zcash introduzida em 28 de outubro de 2018. Ele é uma grande melhoria em relação à versão anterior, conhecida como Sprout, que tinha algumas limitações em termos de privacidade, eficiência e usabilidade. 

Algumas das melhorias incluem desempenho aprimorado para endereços blindados, chaves de visualização aprimoradas que permitem aos usuários ver transações recebidas e enviadas sem expor as chaves privadas, e chaves de conhecimento zero independentes para carteiras de hardware durante a assinatura de transações. 

O Zcash Sapling permite que os usuários façam transações privadas em apenas alguns segundos, em comparação com o tempo mais longo que isso levava na série Sprout. 

A blindagem de transações aumenta a privacidade, tornando impossível para terceiros vincular transações e determinar a quantidade de ZEC transferida. O Sapling também melhora a usabilidade ao reduzir os requisitos computacionais para gerar transações privadas, tornando-as mais acessíveis aos usuários.

Os endereços de carteira Sapling começam com "zs", e isso pode ser observado em todas as carteiras blindadas compatíveis com o Zcash (Zkool, Zingo Wallet etc.), que têm endereços Sapling integrados. O Zcash Sapling representa um avanço tecnológico significativo em termos de privacidade e eficiência das transações, o que torna o Zcash uma criptomoeda prática e eficaz para usuários que valorizam privacidade e segurança.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig. 4: Um gráfico mostrando o pool Sprout até 29 de outubro de 2025, antes da ativação do Ironwood

O Sprout foi o primeiro protocolo de privacidade de conhecimento zero aberto e sem permissão já lançado. Ele foi lançado em 28 de outubro de 2016.

Os endereços Sprout são identificados pelas duas primeiras letras, que são sempre "zc". Ele recebeu o nome "Sprout" principalmente para enfatizar que o software era uma blockchain jovem, em desenvolvimento, com grande potencial de crescimento e aberta ao desenvolvimento. 

O Sprout foi usado como uma ferramenta inicial para a [Zcash mineração de início lento](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), que promoveu a distribuição de ZEC e das recompensas de bloco para os mineradores. 

À medida que o ecossistema do Zcash continuou se expandindo, com um número crescente de transações blindadas, observou-se que a série Zcash Sprout se tornou limitada e menos eficiente em termos de privacidade dos usuários, escalabilidade e processamento de transações. Isso levou à modificação da rede e à atualização Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool transparente</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig. 5: Um gráfico mostrando o pool transparente até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

O pool transparente do Zcash não é blindado nem privado. Os endereços de carteira transparentes no Zcash começam com a letra "t", e a privacidade é muito baixa ao usar esse tipo de endereço em transações.

As transações transparentes no Zcash são semelhantes às transações de Bitcoin: suportam transações com múltiplas assinaturas e usam endereços públicos padrão.

Os endereços transparentes do Zcash são usados principalmente por corretoras centralizadas para garantir alta transparência e confirmação na rede ao enviar e receber ZEC entre usuários.

Também é importante observar que, embora os endereços blindados do Zcash ofereçam alta privacidade nas transações, eles também exigem mais recursos computacionais para processá-las. Por isso, alguns usuários podem adotar endereços transparentes para transações que não exigem o mesmo nível de privacidade.

<br/>

## Práticas recomendadas para transferências entre pools

Quando se trata de garantir um alto nível de privacidade nas transações na rede Zcash, recomenda-se seguir as práticas abaixo:

As transações entre carteiras "z para z" na blockchain do Zcash são majoritariamente blindadas e às vezes são chamadas de transações privadas, devido ao alto nível de privacidade que geram. Essa costuma ser a melhor e mais recomendada forma de enviar e receber $ZEC quando a privacidade é necessária. 

---

Quando você envia ZEC de um "endereço Z" para um "endereço T", isso caracteriza uma transação de desblindagem. Nesse tipo de transação, o nível de privacidade nem sempre é alto, pois algumas informações ficam visíveis na blockchain por causa do envio de ZEC para um endereço transparente. A transação de desblindagem não é recomendada quando é necessária alta privacidade. 

---

Transferir ZEC de um endereço transparente (endereço T) para um endereço Z é o que se chama de blindagem. Nesse tipo de transação, o nível de privacidade nem sempre é tão alto quanto em uma transação z-z, mas ela também é recomendada quando a privacidade é necessária. 

---

Enviar ZEC de um endereço transparente (endereço T) para outro endereço transparente (endereço T) na rede Zcash (transação T-T) é muito parecido com uma transação de Bitcoin, e é por isso que as transações T-T no Zcash são sempre chamadas de transações públicas: os detalhes da transação, tanto do remetente quanto do destinatário, ficam visíveis ao público, o que torna o nível de privacidade muito baixo nesse tipo de transação. 

A maioria das corretoras centralizadas de criptomoedas usa endereços transparentes ("endereço T") para transacionar na blockchain do Zcash, mas esse tipo de transação (T-T) não tem nenhuma propriedade de privacidade.

<br/>

## A migração do Orchard para o Ironwood

A migração está acontecendo agora. O Orchard está fechado para novos depósitos, e o valor que ainda está nele está passando para o Ironwood, uma transação de cada vez. Você pode acompanhar os totais em [ironwood.live](https://ironwood.live/).

O que isso significa depende de onde estão seus fundos:

1. **A nova atividade blindada** vai automaticamente para o Ironwood. Não há nada a fazer.
2. **Os fundos existentes no Orchard** precisam migrar. As carteiras com manutenção ativa fazem isso para você, geralmente em etapas, e não tudo de uma vez.
3. **O Sapling não é afetado** e continua aceitando fundos. Apenas o Orchard foi fechado.
4. **A catraca contabiliza tudo** o que passa entre os pools, e é isso que comprova que nenhuma moeda foi criada no caminho.

> **Uma ressalva de privacidade que vale a pena conhecer.** A catraca publica o *valor* que passa entre os pools, junto com a altura do bloco. Remetente e destinatário continuam ocultos como sempre, mas um valor muito característico pode ser associado a você. É por isso que as carteiras migram em etapas, usando denominações padrão, em vez de mover seu saldo em um único bloco reconhecível. Deixe a carteira definir o próprio ritmo e considere usar Tor ou uma VPN para que seu IP não fique associado aos valores que você move.

Veja [Ironwood](/zcash-tech/ironwood) para saber mais sobre a atualização em si, e [A catraca](/zcash-tech/the-turnstile) para entender como funciona a contabilidade.

<br/>

## Erros comuns a evitar

- **Enviar de um endereço t para outro endereço t** — totalmente público, sem privacidade. Sempre blinde os fundos primeiro.
- **Supor que o Orchard ainda aceita fundos** — ele é somente gasto desde 28 de julho de 2026. O valor pode sair, mas nada novo entra
- **Confundir endereços Sapling com endereços unificados** — os endereços Sapling começam com `zs`. Os endereços unificados começam com `u1` e reúnem vários receptores, então o pool em que seu pagamento cai depende de quais receptores esse endereço contém
- **Deixar fundos no pool Sprout** — o Sprout está obsoleto há anos; retire esses fundos de lá
- **Esperar que a migração seja completamente invisível** — o valor que passa pela catraca é público, embora o remetente e o destinatário não sejam
- **Supor que t → z (blindagem) é totalmente privado** — o ato de blindar em si é visível on-chain; o conteúdo não é

---

## Páginas relacionadas

- [Ironwood](/zcash-tech/ironwood) — A atualização que criou o pool atual
- [A catraca](/zcash-tech/the-turnstile) — Como o valor que circula entre os pools é auditado
- [Carteiras](/using-zcash/wallets) — Quais carteiras têm manutenção ativa e estão prontas para o Ironwood
- [Transações](/using-zcash/transactions) — Como enviar transações blindadas
- [Comprando ZEC](/using-zcash/buying-zec) — Como adquirir ZEC antes de usá-lo nos pools
- [zk-SNARKs](/zcash-tech/zk-snarks) — A base criptográfica dos pools blindados
- [O que são ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Contexto sobre a privacidade do Zcash
