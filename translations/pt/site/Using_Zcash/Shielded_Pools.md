<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pools de valor do Zcash 

## TL;DR

- O Zcash tem atualmente **5 pools de valor**: Sprout (legado), Sapling, Orchard (apenas para gastos), Ironwood e Transparent.
- **Ironwood** é o atual pool blindado principal, ativo desde a atualização da rede NU6.3 em 28 de julho de 2026.
- **Orchard** está agora em modo **apenas para gastos**: nenhum valor novo pode entrar nele, e os fundos existentes migram para Ironwood.
- **Sapling** (z-addresses começando com `zs`) continua amplamente aceito e continua protegendo uma quantidade significativa de ZEC blindado.
- Os endereços **Transparent** (t...) não oferecem privacidade nas transações e funcionam de forma semelhante ao Bitcoin.
- **Sprout** é um pool blindado legado que foi retirado de uso ativo.
- A migração de Orchard para Ironwood está **em andamento** e é auditada publicamente pela catraca.
- Para as garantias de privacidade mais fortes, os usuários devem continuar priorizando transações **blindadas para blindadas (z → z)** sempre que possível.


<br/>

## Entendendo os pools de valor do Zcash

O Zcash separa os fundos em sistemas contábeis distintos conhecidos como pools de valor. Cada pool tem suas próprias regras criptográficas e propriedades de privacidade, enquanto o protocolo acompanha o valor total que se move entre eles.

Hoje, a rede contém cinco pools de valor principais:

- Transparent — Público e totalmente visível on-chain.
- Sapling — O primeiro pool blindado moderno amplamente adotado, ainda ativo.
- Orchard — O pool blindado principal anterior, agora apenas para gastos.
- Ironwood — O atual pool blindado principal, introduzido pela NU6.3.
- Sprout — O pool blindado original lançado com o Zcash em 2016.
  


À medida que o Zcash evolui, novos pools blindados podem ser introduzidos para melhorar a segurança, a privacidade, a usabilidade e a auditabilidade, mantendo ao mesmo tempo a compatibilidade com os fundos existentes.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: Um gráfico mostrando os três pools blindados (Sprout, Sapling e Orchard) até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

## Os pools blindados 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood é o atual pool blindado principal. Foi ativado em 28 de julho de 2026, no bloco 3,428,143, como parte da atualização da rede NU6.3, e é onde o novo valor blindado agora fica.

Ele existe porque uma vulnerabilidade foi encontrada no sistema de provas de Orchard em maio de 2026. Não há indícios de que ela tenha sido explorada, mas a falha significava que não era possível comprovar que a oferta blindada era íntegra apenas pelas provas. Em vez de corrigir o problema no local, a rede criou um novo pool com um circuito corrigido e moveu o valor por uma catraca que conta publicamente cada moeda. É essa contabilidade que restaura a garantia de que a oferta blindada está totalmente respaldada.

Ironwood reutiliza o modelo Action de Orchard e as provas Halo 2, por isso se comporta da mesma forma no dia a dia. Duas coisas são novas: as transações usam o formato v6, e as notes de Ironwood são **recuperáveis por computação quântica** segundo a [ZIP 2005](https://zips.z.cash/zip-2005), o que significa que o registro on-chain de uma moeda continua recuperável se um futuro computador quântico quebrar a criptografia atual. Esse é um caminho de recuperação, não resistência quântica, e não se aplica aos pools mais antigos.

Você não precisa de um novo endereço. Os endereços unificados agrupam vários receivers, e as carteiras escolhem o pool certo para você.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: Um gráfico mostrando o pool Orchard até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

O Orchard Shielded Pool foi ativado em 31 de maio de 2022 como parte da atualização da rede NU5. Orchard introduziu um novo protocolo blindado que eliminou a necessidade de uma configuração confiável e se tornou o pool blindado principal usado por Unified Addresses (UAs).

Orchard melhorou significativamente a usabilidade, a eficiência e a privacidade ao reduzir o vazamento de metadados das transações e ao introduzir um modelo de transação mais flexível baseado em Actions, em vez de entradas e saídas blindadas tradicionais.

Desde que a atualização Ironwood foi ativada em 28 de julho de 2026, **Orchard está apenas para gastos**. Nenhum valor novo pode entrar no pool. Os fundos já mantidos nele ainda podem ser gastos e estão migrando para Ironwood pela catraca. As carteiras fazem isso para você, embora a maioria ofereça algum controle sobre o ritmo. Cada saída de Orchard mostra seu valor na blockchain, portanto a forma como uma carteira divide e programa a migração importa para a privacidade.

Se você possui fundos em Orchard, veja [Ironwood](/zcash-tech/ironwood) para entender o que a migração significa na prática.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: Um gráfico mostrando o pool Sapling até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) foi uma atualização do protocolo Zcash introduzida em 28 de outubro de 2018. É uma grande melhoria em relação à versão anterior conhecida como Sprout, que tinha algumas limitações em termos de privacidade, eficiência e usabilidade. 

Algumas das melhorias incluem melhor desempenho para endereços blindados, melhores chaves de visualização para permitir que os usuários vejam transações recebidas e enviadas sem expor as chaves privadas do usuário, e chaves independentes de conhecimento zero para carteira de hardware durante a assinatura da transação. 

O Zcash Sapling permite que os usuários realizem transações privadas em apenas alguns segundos, em comparação com o tempo maior que isso levava na série Sprout. 

A blindagem de transações aumenta a privacidade, tornando impossível que terceiros vinculem transações e determinem a quantidade de ZEC transferida. Sapling também melhora a usabilidade ao reduzir os requisitos computacionais para gerar transações privadas, tornando-as mais acessíveis aos usuários.

Os endereços de carteira Sapling começam com "zs", e isso pode ser observado em todas as Zcash Shielded Wallet compatíveis (Zkool, Zingo Wallet, Nighthawk etc.) que têm endereços Sapling integrados. O Zcash Sapling representa um desenvolvimento significativo na tecnologia em termos de privacidade e eficiência das transações, o que torna o Zcash uma criptomoeda prática e eficaz para usuários que valorizam privacidade e segurança.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: Um gráfico mostrando o pool Sprout até 29 de outubro de 2025, antes da ativação do Ironwood

Sprout foi o primeiro protocolo aberto de privacidade de conhecimento zero e sem permissão já lançado. Foi lançado em 28 de outubro de 2016.

Os endereços Sprout são identificados pelas duas primeiras letras, que são sempre "zc". Ele foi chamado de "Sprout" com o principal objetivo de enfatizar que o software era uma blockchain jovem, em crescimento, com grande potencial para se desenvolver e aberta ao desenvolvimento. 

Sprout foi usado como uma ferramenta inicial para a [mineração slow start do Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), que trouxe a distribuição de ZEC e recompensas de bloco para os mineradores. 

À medida que o ecossistema Zcash continuou se expandindo com o número crescente de transações blindadas, observou-se que a série Zcash Sprout se tornou limitada e menos eficiente em relação à privacidade do usuário, à escalabilidade das transações e ao processamento. Isso levou à modificação da rede e à atualização Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: Um gráfico mostrando o pool Transparent até 29 de outubro de 2025, antes da ativação do Ironwood

<br/>

O pool Transparent do Zcash não é blindado nem privado. Os endereços de carteira Transparent no Zcash começam com a letra "t"; a privacidade é muito baixa ao usar esse tipo de endereço em transações.

As transações Transparent no Zcash são semelhantes às transações de Bitcoin, suportam transações multi-signature e usam endereços públicos padrão.

Os endereços Transparent do Zcash são usados principalmente por corretoras centralizadas para garantir alta transparência e confirmação da rede ao enviar e receber ZEC entre usuários.

Também é importante observar que, embora os endereços blindados do Zcash proporcionem alta privacidade durante as transações, eles também exigem mais recursos computacionais para processá-las. Portanto, alguns usuários podem adotar endereços Transparent para transações que não exigem o mesmo nível de privacidade.

<br/>

## Prática recomendada para transferências entre pools

Quando se trata de considerar um alto nível de privacidade durante transações na rede Zcash, recomenda-se que você siga as práticas abaixo;

As transações que ocorrem entre carteiras "z para z" na blockchain do Zcash são principalmente blindadas e às vezes são chamadas de transações privadas devido ao alto nível de privacidade gerado. Essa costuma ser a melhor e mais recomendada forma de enviar e receber $ZEC quando a privacidade é necessária. 

---

Quando você envia ZEC de "Z-address" para "T-address", isso simplesmente representa uma forma de transação de desblindagem. Nesse tipo de transação, o nível de privacidade nem sempre é alto, pois algumas informações serão visíveis na blockchain devido ao envio de ZEC para um endereço Transparent. A transação de desblindagem nem sempre é recomendada quando é necessária alta privacidade. 

---

Transferir ZEC de um endereço Transparent (T-address) para um Z-address é simplesmente conhecido como blindagem. Nesse tipo de transação, o nível de privacidade nem sempre é alto quando comparado ao de uma transação z-z, mas ela também é recomendada quando a privacidade é necessária. 

---

Enviar ZEC de um endereço Transparent (T-address) para outro endereço Transparent (T-address) na rede Zcash (transação T-T) é muito semelhante a uma transação de Bitcoin, e é por isso que as transações T-T no Zcash são sempre chamadas de transações públicas, porque os detalhes da transação tanto do remetente quanto do destinatário se tornam visíveis ao público, o que faz com que o nível de privacidade seja muito baixo nesse tipo de transação. 

A maioria das corretoras centralizadas de criptomoedas usa endereços Transparent ("T-address) ao transacionar na blockchain do Zcash, mas esse tipo de transação (T-T) não terá propriedades privadas.

<br/>

## A migração de Orchard para Ironwood

A migração está acontecendo agora. Orchard está fechado para novos depósitos, e o valor que ainda está nele está migrando para Ironwood, uma transação por vez. Você pode acompanhar os totais em [ironwood.live](https://ironwood.live/).

O que isso significa depende de onde seus fundos estão:

1. **A nova atividade blindada** entra automaticamente em Ironwood. Não há nada a fazer.
2. **Os fundos existentes em Orchard** precisam migrar. As carteiras mantidas fazem isso para você, geralmente em etapas, em vez de tudo de uma vez.
3. **Sapling não é afetado** e continua aceitando fundos. Apenas Orchard foi fechado.
4. **A catraca conta tudo** que atravessa entre pools, o que comprova que nenhuma moeda foi criada no caminho.

> **Uma ressalva de privacidade que vale a pena conhecer.** A catraca publica o *valor* que atravessa entre pools, junto com a altura do bloco. Remetente e destinatário permanecem ocultos como sempre, mas um valor distinto pode ser vinculado a você. É por isso que as carteiras migram em etapas usando denominações padrão, em vez de mover seu saldo em uma única quantia reconhecível. Deixe sua carteira definir seu próprio ritmo e considere usar Tor ou uma VPN para que seu IP não seja vinculado aos valores que você move.

Veja [Ironwood](/zcash-tech/ironwood) para a atualização em si e [A catraca](/zcash-tech/the-turnstile) para entender como funciona a contabilidade.

<br/>

## Erros comuns a evitar

- **Enviar de t-address para t-address** — totalmente público, sem privacidade. Sempre blinde os fundos primeiro.
- **Presumir que Orchard ainda aceita fundos** — está apenas para gastos desde 28 de julho de 2026. O valor pode sair, mas nada novo entra
- **Confundir endereços Sapling e Unified** — os endereços Sapling começam com `zs`. Os endereços Unified começam com `u1` e agrupam vários receivers, portanto o pool em que seu pagamento entra depende dos receivers que esse endereço contém
- **Deixar fundos no pool Sprout** — Sprout foi descontinuado há anos; mova esses fundos para fora
- **Esperar que uma migração seja completamente invisível** — o valor que atravessa a catraca é público, embora o remetente e o destinatário não sejam
- **Presumir que t → z (blindagem) é totalmente privado** — o próprio ato de blindar é visível on-chain; o conteúdo não

---

## Páginas relacionadas

- [Ironwood](/zcash-tech/ironwood) — A atualização que criou o pool atual
- [A catraca](/zcash-tech/the-turnstile) — Como o valor que se move entre pools é auditado
- [Carteiras](/using-zcash/wallets) — Quais carteiras são mantidas e estão prontas para Ironwood
- [Transações](/using-zcash/transactions) — Como enviar transações blindadas
- [Comprar ZEC](/using-zcash/buying-zec) — Adquirir ZEC antes de usá-lo em pools
- [zk-SNARKs](/zcash-tech/zk-snarks) — A base criptográfica dos pools blindados
- [O que são ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Contexto sobre a privacidade do Zcash
