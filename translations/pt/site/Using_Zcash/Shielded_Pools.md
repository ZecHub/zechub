---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Pools de Valor de Zcash 

## TL;DR

- Zcash tem atualmente **5 pools de valor**: Sprout (legado), Sapling, Orchard (apenas-gasto), Ironwood e Transparent.
- **Ironwood** é o atual pool blindado principal, ativo desde a atualização NU6.3 em 28 de julho de 2026.
- **Orchard** está agora em modo **apenas-gasto**: nenhum novo valor pode entrar nele, e os fundos existentes migram para Ironwood.
- **Sapling** (z-addresses começando por `zs`) continua amplamente suportado e continua a proteger uma quantidade significativa de ZEC blindado.
- Os endereços **Transparent** (t...) não oferecem privacidade nas transações e funcionam de forma semelhante ao Bitcoin.
- **Sprout** é um pool blindado legado que foi retirado de uso ativo.
- A migração de Orchard para Ironwood está **em curso** e é auditada publicamente pelo turnstile.
- Para as garantias de privacidade mais fortes, os utilizadores devem continuar a dar preferência a transações **shielded-to-shielded (z → z)** sempre que possível.


<br/>

## Compreender os Pools de Valor de Zcash

Zcash separa os fundos em sistemas de contabilidade distintos conhecidos como pools de valor. Cada pool tem as suas próprias regras criptográficas e propriedades de privacidade, enquanto o protocolo acompanha o valor total que se move entre eles.

Hoje, a rede contém cinco pools de valor principais:

- Transparent — Público e totalmente visível on-chain.
- Sapling — O primeiro pool blindado moderno amplamente adotado, ainda ativo.
- Orchard — O anterior pool blindado principal, agora apenas-gasto.
- Ironwood — O atual pool blindado principal, introduzido pela NU6.3.
- Sprout — O pool blindado original lançado com Zcash em 2016.
  


À medida que Zcash evolui, podem ser introduzidos novos pools blindados para melhorar a segurança, a privacidade, a usabilidade e a auditabilidade, mantendo ao mesmo tempo a compatibilidade com os fundos existentes.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Fig 1: Um gráfico que mostra os atuais 4 pools em outubro de 2025

<br/>

## Os Pools Blindados 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood é o atual pool blindado principal. Foi ativado em 28 de julho de 2026 no bloco 3,428,143 como parte da atualização de rede NU6.3, e é onde o novo valor blindado passa agora a residir.

Ele existe porque foi encontrada uma vulnerabilidade no sistema de provas de Orchard em maio de 2026. Não há indícios de que tenha sido alguma vez explorada, mas a falha significava que o fornecimento blindado não podia ser provado como íntegro apenas pelas provas. Em vez de corrigir o problema no local, a rede criou um pool novo com um circuito corrigido e moveu o valor através de um turnstile que conta publicamente cada moeda. É essa contabilidade que restaura a garantia de que o fornecimento blindado está totalmente respaldado.

Ironwood reutiliza o modelo Action de Orchard e as provas Halo 2, por isso comporta-se da mesma forma no dia a dia. Duas coisas são novas: as transações usam o formato v6, e as notas de Ironwood são **recuperáveis quânticamente** ao abrigo da [ZIP 2005](https://zips.z.cash/zip-2005), o que significa que o registo on-chain de uma moeda continua recuperável se um futuro computador quântico quebrar a criptografia atual. Isto é um caminho de recuperação, não resistência quântica, e não se aplica aos pools mais antigos.

Não precisa de um novo endereço. Os Unified addresses agrupam vários receivers, e as wallets escolhem o pool certo por si.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Fig 2: Um gráfico que mostra o pool Orchard em outubro de 2025

<br/>

O Orchard Shielded Pool foi ativado em 31 de maio de 2022 como parte da atualização de rede NU5. Orchard introduziu um novo protocolo blindado que eliminou a necessidade de uma trusted setup e tornou-se o pool blindado principal usado por Unified Addresses (UAs).

Orchard melhorou significativamente a usabilidade, a eficiência e a privacidade ao reduzir a fuga de metadados das transações e ao introduzir um modelo de transação mais flexível baseado em Actions em vez de entradas e saídas blindadas tradicionais.

Desde que a atualização Ironwood foi ativada em 28 de julho de 2026, **Orchard está em modo apenas-gasto**. Nenhum novo valor pode entrar no pool. Os fundos já mantidos aí ainda podem ser gastos e estão a migrar para Ironwood através do turnstile. As wallets tratam disto por si, embora a maioria lhe dê algum controlo sobre o ritmo.

Se detém fundos em Orchard, veja [Ironwood](/zcash-tech/ironwood) para perceber o que a migração significa na prática.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Fig 3: Um gráfico que mostra o pool Sapling em outubro de 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) foi uma atualização ao protocolo Zcash introduzida em 28 de outubro de 2018. É uma grande melhoria em relação à versão anterior conhecida como Sprout, que tinha algumas limitações em termos de privacidade, eficiência e usabilidade. 

Algumas das melhorias incluem melhor desempenho para endereços blindados, melhores viewing keys para permitir aos utilizadores ver transações recebidas e enviadas sem expor as chaves privadas do utilizador, e chaves independentes de Zero Knowledge para wallet de hardware durante a assinatura da transação. 

Zcash Sapling permite aos utilizadores realizar transações privadas em apenas alguns segundos quando comparado com o tempo mais longo que isso levava na série Sprout. 

A blindagem de transações aumenta a privacidade, tornando impossível para terceiros ligar transações e determinar a quantidade de ZEC transferida. Sapling também melhora a usabilidade ao reduzir os requisitos computacionais para gerar transações privadas, tornando-as mais acessíveis aos utilizadores.

Os endereços de wallet Sapling começam por "zs" e isso pode ser observado em todas as Zcash Shielded Wallet suportadas (YWallet, Zingo Wallet, Nighthawk etc.) que têm endereços Sapling incorporados. Zcash Sapling representa um desenvolvimento significativo na tecnologia no que diz respeito à privacidade e eficiência das transações, o que faz de Zcash uma criptomoeda prática e eficaz para utilizadores que valorizam privacidade e segurança.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Fig 4: Um gráfico que mostra o pool Sprout em outubro de 2025

Sprout foi o primeiro protocolo de privacidade Zero Knowledge aberto e permissionless alguma vez lançado. Foi lançado em 28 de outubro de 2016.

Os endereços Sprout são identificados pelas suas duas primeiras letras, que são sempre "zc". Foi chamado "Sprout" com o principal objetivo de enfatizar que o software era jovem, uma blockchain em crescimento com grande potencial para se desenvolver e aberta ao desenvolvimento. 

Sprout foi usado como uma ferramenta inicial para a [mineração slow start de Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), que trouxe a distribuição de ZEC e recompensas de bloco para os mineradores. 

À medida que o ecossistema Zcash continuou a expandir-se com o número crescente de transações blindadas, observou-se que a série Zcash Sprout se tornou limitada e menos eficiente no que diz respeito à privacidade do utilizador, à escalabilidade das transações e ao processamento. Isto levou à modificação da rede e à atualização Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Fig 5: Um gráfico que mostra o pool Transparent em outubro de 2025

<br/>

O pool Transparent de Zcash é não blindado e não privado. Os endereços de wallet Transparent em Zcash começam com a letra "t"; a privacidade é muito baixa ao usar este tipo de endereço em transações.

As transações Transparent em Zcash são semelhantes às transações de Bitcoin, suportando transações multi-signature e usando endereços públicos padrão.

Os endereços Transparent de Zcash são maioritariamente usados por exchanges centralizadas para garantir elevada transparência e confirmação da rede ao enviar e receber ZEC entre utilizadores.

Também é importante notar que, embora os endereços blindados de Zcash proporcionem elevada privacidade durante as transações, também exigem mais recursos computacionais para processar transações. Portanto, alguns utilizadores podem adotar endereços Transparent para transações que não exigem o mesmo nível de privacidade.

<br/>

## Prática Recomendada para Transferência entre Pools

Quando se trata de considerar um elevado nível de privacidade durante transações na rede Zcash, recomenda-se que siga as práticas abaixo;

As transações que ocorrem entre wallets "z para z" na blockchain Zcash são maioritariamente blindadas e por vezes são chamadas Transações Privadas devido ao elevado nível de privacidade gerado. Esta é normalmente a melhor e mais recomendada forma de enviar e receber $ZEC quando a privacidade é necessária. 

---

Quando envia ZEC de "Z-address" para "T-address", isso simplesmente representa uma forma de transação de desblindagem. Neste tipo de transação, o nível de privacidade nem sempre é elevado, uma vez que alguma informação será visível na blockchain devido ao efeito de enviar ZEC para um endereço Transparent. A transação de desblindagem nem sempre é recomendada quando é necessária elevada privacidade. 

---

Transferir ZEC de um endereço Transparent (T-address) para um Z-address é simplesmente conhecido como blindagem. Neste tipo de transação, o nível de privacidade nem sempre é elevado quando comparado com o de uma transação z-z, mas também é recomendado quando a privacidade é necessária. 

---

Enviar ZEC de um endereço Transparent (T-address) para outro endereço Transparent (T-address) na rede Zcash (transação T-T) é muito semelhante a uma transação de Bitcoin e é por isso que as transações T-T em Zcash são sempre chamadas transações públicas, porque os detalhes da transação tanto do remetente como do destinatário tornam-se visíveis ao público, o que faz com que o nível de privacidade seja muito baixo nesse tipo de transação. 

A maioria das exchanges centralizadas de criptomoedas usa endereços Transparent ("T-address) quando se trata de transacionar na blockchain Zcash, mas este tipo de transação (T-T) não terá quaisquer propriedades privadas.

<br/>

## A Migração de Orchard para Ironwood

A migração está a acontecer agora. Orchard está fechado a novos depósitos, e o valor que ainda permanece lá está a mover-se para Ironwood, uma transação de cada vez. Pode acompanhar os totais em [ironwood.live](https://ironwood.live/).

O que isto significa depende de onde estão os seus fundos:

1. **Nova atividade blindada** entra automaticamente em Ironwood. Não há nada a fazer.
2. **Fundos existentes em Orchard** precisam de migrar. As wallets mantidas fazem isto por si, normalmente por etapas em vez de tudo de uma vez.
3. **Sapling não é afetado** e continua a aceitar fundos. Só Orchard foi fechado.
4. **O turnstile conta tudo** o que atravessa entre pools, o que prova que nenhuma moeda foi inventada ao longo do caminho.

> **Há uma ressalva de privacidade que vale a pena conhecer.** O turnstile publica o *montante* que atravessa entre pools, juntamente com a altura do bloco. O remetente e o destinatário permanecem ocultos como sempre, mas um montante distintivo pode ser associado a si. É por isso que as wallets migram por etapas usando denominações padrão em vez de mover o seu saldo num único montante reconhecível. Deixe a sua wallet gerir o seu próprio ritmo e considere usar Tor ou uma VPN para que o seu IP não fique associado aos montantes que move.

Veja [Ironwood](/zcash-tech/ironwood) para a própria atualização, e [O Turnstile](/zcash-tech/the-turnstile) para saber como funciona a contabilidade.

<br/>

## Erros Comuns a Evitar

- **Enviar de t-address para t-address** — totalmente público, sem privacidade. Proteja sempre os fundos primeiro.
- **Assumir que Orchard ainda aceita fundos** — está em modo apenas-gasto desde 28 de julho de 2026. O valor pode sair, mas nada de novo entra
- **Confundir Sapling e Unified addresses** — os endereços Sapling começam por `zs`. Os Unified addresses começam por `u1` e agrupam vários receivers, por isso o pool em que o seu pagamento entra depende dos receivers que esse endereço transporta
- **Deixar fundos no pool Sprout** — Sprout foi descontinuado há anos; mova esses fundos para fora
- **Esperar que uma migração seja completamente invisível** — o montante que atravessa o turnstile é público, embora o remetente e o destinatário não o sejam
- **Assumir que t → z (blindagem) é totalmente privado** — o próprio ato de blindar é visível on-chain; o conteúdo não

---

## Páginas Relacionadas

- [Ironwood](/zcash-tech/ironwood) — A atualização que criou o pool atual
- [O Turnstile](/zcash-tech/the-turnstile) — Como o valor que se move entre pools é auditado
- [Wallets](/using-zcash/wallets) — Que wallets são mantidas e estão prontas para Ironwood
- [Transações](/using-zcash/transactions) — Como enviar transações blindadas
- [Comprar ZEC](/using-zcash/buying-zec) — Adquirir ZEC antes de o usar em pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — A base criptográfica dos pools blindados
- [O que são ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Contexto sobre a privacidade de Zcash
