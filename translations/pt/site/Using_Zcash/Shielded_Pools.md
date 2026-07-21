<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Pools de Valor do Zcash 

## Resumo rápido

- O Zcash atualmente possui **4 pools de valor**: Sprout (legado), Sapling, Orchard e Transparent.
- **Orchard** é o principal pool blindado atual usado por Unified Addresses (u1...).
- **Sapling** (z-addresses começando com `zs`) continua amplamente suportado e segue protegendo uma quantidade significativa de ZEC blindado.
- Endereços **Transparent** (t...) não oferecem privacidade de transação e funcionam de forma semelhante ao Bitcoin.
- **Sprout** é um pool blindado legado que foi retirado do uso ativo.
- Um futuro pool blindado conhecido como **Ironwood** foi proposto para reforçar a confiança na integridade da oferta de ZEC blindado, preservando a privacidade.
- Para as garantias de privacidade mais fortes, os usuários devem continuar a preferir transações **blindado-para-blindado (z → z)** sempre que possível.


<br/>

## Entendendo os Pools de Valor do Zcash

O Zcash separa os fundos em sistemas contábeis distintos conhecidos como pools de valor. Cada pool tem suas próprias regras criptográficas e propriedades de privacidade, enquanto o protocolo rastreia o valor total que se move entre eles.

Hoje, a rede contém quatro pools de valor principais:

- Transparent — Público e totalmente visível on-chain.
- Sapling — O primeiro pool blindado moderno amplamente adotado.
- Orchard — O principal pool blindado atual, introduzido com Unified Addresses.
- Sprout — O pool blindado original lançado com Zcash em 2016.
  


À medida que o Zcash evolui, novos pools blindados podem ser introduzidos para melhorar segurança, privacidade, usabilidade e auditabilidade, mantendo a compatibilidade com os fundos existentes.

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
Fig 1: Um gráfico mostrando os 4 pools atuais em outubro de 2025

<br/>

## Os Pools Blindados 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
Fig 2: Um gráfico mostrando o pool Orchard em outubro de 2025

<br/>

O Orchard Shielded Pool foi ativado em 31 de maio de 2022 como parte da atualização de rede NU5. Orchard introduziu um novo protocolo blindado que eliminou a necessidade de uma trusted setup e se tornou o principal pool blindado usado por Unified Addresses (UAs).

Orchard melhorou significativamente a usabilidade, a eficiência e a privacidade ao reduzir o vazamento de metadados de transação e introduzir um modelo de transação mais flexível baseado em Actions, em vez de entradas e saídas blindadas tradicionais.

Hoje, Orchard continua sendo o principal pool blindado do Zcash. No entanto, a comunidade está avaliando uma futura migração para um novo pool blindado chamado Ironwood, que forneceria garantias adicionais quanto à integridade da oferta de ZEC blindado, preservando as garantias de privacidade do Zcash.

[Carteiras blindadas de Zcash](/site/Using_Zcash/Wallets) agora oferecem suporte a Orchard. 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
Fig 3: Um gráfico mostrando o pool Sapling em outubro de 2025

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) foi uma atualização do protocolo Zcash introduzida em 28 de outubro de 2018. É uma grande melhoria em relação à versão anterior conhecida como Sprout, que tinha algumas limitações em termos de privacidade, eficiência e usabilidade. 

Algumas das melhorias incluem desempenho aprimorado para endereços blindados, Viewing Keys aprimoradas para permitir que os usuários visualizem transações recebidas e enviadas sem expor as chaves privadas do usuário, e chaves independentes de Zero Knowledge para carteiras de hardware durante a assinatura de transações. 

Zcash Sapling permite que os usuários realizem transações privadas em apenas alguns segundos quando comparado ao tempo maior que isso levava na série Sprout. 

A blindagem de transações aumenta a privacidade, tornando impossível para terceiros vincular transações e determinar a quantidade de ZEC sendo transferida. Sapling também melhora a usabilidade ao reduzir os requisitos computacionais para gerar transações privadas, tornando-as mais acessíveis aos usuários.

Os endereços de carteira Sapling começam com "zs", e isso pode ser observado em todas as carteiras blindadas de Zcash compatíveis (YWallet, Zingo Wallet, Nighthawk etc.), que possuem endereços Sapling integrados. Zcash Sapling representa um desenvolvimento significativo em tecnologia quando se trata de privacidade e eficiência das transações, o que faz do Zcash uma criptomoeda prática e eficaz para usuários que valorizam privacidade e segurança.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
Fig 4: Um gráfico mostrando o pool Sprout em outubro de 2025

Sprout foi o primeiro protocolo de privacidade Zero Knowledge aberto e sem permissão já lançado. Foi lançado em 28 de outubro de 2016.

Os endereços Sprout são identificados por suas duas primeiras letras, que são sempre "zc". Foi chamado de "Sprout" com o propósito principal de enfatizar que o software era jovem, uma blockchain em desenvolvimento com grande potencial de crescimento e aberta ao desenvolvimento. 

Sprout foi usado como uma ferramenta inicial para a [mineração slow start do Zcash](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), o que trouxe a distribuição de ZEC e recompensas de bloco para os mineradores. 

À medida que o ecossistema Zcash continuou a se expandir com o aumento do número de transações blindadas, observou-se que a série Zcash Sprout se tornou limitada e menos eficiente em termos de privacidade do usuário, escalabilidade de transações e processamento. Isso levou à modificação da rede e à atualização Sapling. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Transparent</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
Fig 5: Um gráfico mostrando o pool Transparent em outubro de 2025

<br/>

O pool Transparent do Zcash é não blindado e não privado. Endereços de carteira Transparent no Zcash começam com a letra "t"; a privacidade é muito baixa ao usar esse tipo de endereço para transações.

As transações Transparent no Zcash são semelhantes às transações do Bitcoin, que suportam transações multiassinatura e fazem uso de endereços públicos padrão.

Os endereços Transparent do Zcash são usados principalmente por exchanges centralizadas para garantir alta transparência e confirmação da rede ao enviar e receber ZEC entre usuários.

Também é importante observar que, embora os endereços blindados de Zcash ofereçam alta privacidade durante as transações, eles também exigem mais recursos computacionais para processar transações. Portanto, alguns usuários podem adotar endereços Transparent para transações que não exigem o mesmo nível de privacidade.

<br/>

## Prática Recomendada para Transferência entre Pools

Quando se trata de buscar um alto nível de privacidade durante transações na rede Zcash, recomenda-se seguir as práticas abaixo;

Transações que ocorrem entre carteiras "z para z" na blockchain Zcash são em sua maioria blindadas, e às vezes são chamadas de transações privadas devido ao alto nível de privacidade gerado. Essa costuma ser a melhor e mais recomendada forma de enviar e receber $ZEC quando a privacidade é necessária. 

---

Quando você envia ZEC de "Z-address" para "T-address", isso simplesmente representa uma forma de transação de desblindagem. Nesse tipo de transação, o nível de privacidade nem sempre é alto, pois algumas informações ficarão visíveis na blockchain devido ao envio de ZEC para um Transparent Address. A transação de desblindagem nem sempre é recomendada quando é necessária alta privacidade. 

---

Transferir ZEC de um Transparent Address (T-address) para um Z-address é conhecido simplesmente como blindagem. Nesse tipo de transação, o nível de privacidade nem sempre é tão alto quanto o de uma transação z-z, mas ainda assim é recomendado quando a privacidade é necessária. 

---

Enviar ZEC de um Transparent Address (T-address) para outro Transparent Address (T-address) na rede Zcash (transação T-T) é muito semelhante a uma transação de Bitcoin, e é por isso que as transações T-T no Zcash são sempre chamadas de transações públicas, porque os detalhes da transação tanto do remetente quanto do destinatário se tornam visíveis ao público, o que torna o nível de privacidade muito baixo nesse tipo de transação. 

A maioria das exchanges centralizadas de criptomoedas usa Transparent Address ("T-address) ao transacionar na blockchain Zcash, mas esse tipo de transação (T-T) não terá nenhuma propriedade privada.

<br/>

## O Futuro: Pool Ironwood

A comunidade Zcash está atualmente avaliando um pool blindado proposto chamado Ironwood.

Ironwood foi projetado para resolver uma vulnerabilidade descoberta recentemente e corrigida no sistema de provas do Orchard. Embora não haja evidência de que a vulnerabilidade tenha sido explorada, Ironwood forneceria uma camada adicional de garantia ao permitir uma migração controlada de Orchard para um pool blindado recém-criado.

O objetivo não é substituir a privacidade do Zcash, mas fortalecer a confiança na integridade da oferta de ZEC blindado.

## De acordo com a proposta:

1. Novas atividades blindadas migrariam gradualmente para Ironwood.
2. Os fundos existentes em Orchard poderiam ser migrados de forma privada.
3. A contabilidade pública de turnstile forneceria evidências mais fortes de que todos os fundos blindados permanecem totalmente lastreados.
4. Os usuários manteriam as mesmas proteções de privacidade que esperam do Zcash.

<br/>
Se ativado por futuras atualizações de rede, Ironwood se tornaria a próxima geração do ecossistema blindado do Zcash, preservando a compatibilidade com os fundos blindados existentes.

<br/>

## Erros Comuns a Evitar

- **Enviar de t-address para t-address** — totalmente público, sem privacidade. Sempre blinde os fundos primeiro.
- **Confundir endereços Sapling e Orchard** — os endereços Sapling começam com `zs`, os endereços Orchard/Unified começam com `u1`
- **Deixar fundos no pool Sprout** — Sprout está obsoleto; migre os fundos para Orchard
- **Assumir que t → z (blindagem) é totalmente privado** — o ato de blindar em si é visível on-chain; o conteúdo não é

---

## Páginas Relacionadas

- [Carteiras](/using-zcash/wallets) — Quais carteiras suportam os pools Orchard e Sapling
- [Transações](/using-zcash/transactions) — Como enviar transações blindadas
- [Como comprar ZEC](/using-zcash/buying-zec) — Adquirir ZEC antes de usá-lo nos pools
- [ZK-SNARKs](/zcash-tech/zk-snarks) — A base criptográfica dos pools blindados
- [O que é ZEC e Zcash](/start-here/what-is-zec-and-zcash) — Contexto sobre a privacidade do Zcash
