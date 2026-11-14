<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Projeto Tachyon

## Resumo

- Tachyon é uma proposta de reformulação da forma como as carteiras do Zcash encontram e gastam fundos blindados, pensada para permitir que a rede cresça até um número muito grande de usuários
- Hoje uma carteira precisa tentar descriptografar uma enorme parte da blockchain para descobrir quais pagamentos são seus, e esse é o principal motivo pelo qual a sincronização blindada parece lenta
- Tachyon substitui isso pela **sincronização oblívia**, de modo que a carteira busca o que precisa sem varrer tudo e sem dizer a um servidor quais partes ela queria
- Ele também tira os detalhes do pagamento da blockchain e os coloca na própria solicitação de pagamento, o que torna o protocolo mais simples, mas transfere responsabilidade para as carteiras
- É uma proposta, publicada pela primeira vez em abril de 2025. **Não faz parte do NU7** e **não foi lançada**, e exige um esforço de engenharia na escala da atualização Sapling

<br/>

## Para quem é isto

- Qualquer pessoa que já viu uma carteira blindada sincronizando e se perguntou por que demora tanto
- Iniciantes que veem Tachyon sendo mencionado junto com NU7 e a escalabilidade do Zcash
- Leitores que querem primeiro a ideia e depois a criptografia

<br/>

## O problema que o Tachyon resolve

O Zcash oculta para quem é um pagamento. Esse é justamente o objetivo, e ele cria um problema incômodo: se ninguém consegue dizer a quem pertence um pagamento, como a sua própria carteira encontra os seus?

No Bitcoin isso é fácil. Os endereços são públicos, então uma carteira pode perguntar a um servidor "o que foi enviado para este endereço?" e obter uma resposta. Uma carteira do Zcash não pode fazer essa pergunta, porque fazê-la revelaria exatamente o que a pool blindada foi projetada para esconder.

Por isso o Zcash faz algo diferente. O remetente criptografa os detalhes do pagamento e os coloca dentro da própria transação. Sua carteira então percorre as transações na chain e tenta descriptografar cada uma. Quase todas as tentativas falham. As poucas que dão certo são os seus pagamentos. Isso se chama **descriptografia por tentativa**, e é privada, correta e lenta.

![Hoje, uma carteira Zcash baixa todas as transações blindadas e tenta descriptografar cada uma delas, com quase todas as tentativas falhando, para encontrar os poucos pagamentos que lhe pertencem](/content-images/tachyon-scanning-today.svg)

O problema está naquilo de que o trabalho depende. O esforço que sua carteira gasta é determinado pelo tamanho da chain, não pela quantidade de pagamentos que você realmente recebeu. Alguém que nunca recebeu um único pagamento faz quase tanto trabalho quanto alguém que recebe pagamentos todos os dias. À medida que o Zcash cresce, isso piora para todo mundo. Nas palavras da proposta, isso "simplesmente não escala".

<br/>

## O que o Tachyon muda

O Tachyon ataca o problema pela raiz: ele deixa de usar a blockchain como canal de entrega dos segredos de pagamento.

Em vez disso, os detalhes de que você precisa viajam junto com a própria solicitação de pagamento, fora da chain. Uma solicitação de pagamento, uma URI ou um QR code carrega as informações que antes eram criptografadas dentro da transação. O Sean Bowe descreve isso como a primeira vez que um protocolo blindado do Zcash adota **pagamentos fora de banda**.

Quando a chain deixa de carregar essas informações, sua carteira não tem mais motivo para vasculhá-la, e o problema da descriptografia por tentativa desaparece.

Mesmo assim, sua carteira ainda precisa conhecer o estado atual da chain para poder gastar. Essa é a segunda metade do projeto, a **sincronização oblívia**: uma forma de a carteira buscar exatamente o que precisa sem revelar ao servidor o que pediu.

![Com o Tachyon, o remetente passa os detalhes do pagamento ao destinatário fora da banda, e a carteira usa sincronização oblívia para recuperar apenas os dados de que precisa, em vez de escanear a chain inteira](/content-images/tachyon-oblivious-sync.svg)

<br/>

## O que isso significaria para quem usa uma carteira

- **A sincronização deixa de crescer junto com a chain.** O tempo que sua carteira gasta para se atualizar acompanharia a sua própria atividade, e não o tamanho do Zcash.
- **Pagar fica mais parecido com entregar uma conta a alguém.** A solicitação de pagamento carrega o que o destinatário precisa, então a troca entre remetente e destinatário importa mais do que hoje.
- **As carteiras assumem mais responsabilidade.** Como a chain não guarda mais uma cópia criptografada dos detalhes do seu pagamento, perder os dados da carteira passa a ser mais grave. Backup e recuperação deixam de ser um recurso do protocolo e passam a ser algo que o software da carteira precisa fazer direito.
- **Algumas peças conhecidas mudam de lugar ou desaparecem.** O Tachyon retira a diversificação de chaves, as chaves de visualização e os endereços de pagamento do núcleo do protocolo, deixando-os para a camada da carteira. Essa é uma das partes de maior impacto da proposta e ainda está sendo discutida.

<br/>

## Um olhar mais detalhado para leitores técnicos

O Tachyon é descrito como uma mudança retrocompatível no protocolo Orchard. Ele poderia ser implantado como uma atualização da pool Orchard existente ou como uma pool blindada separada, acessada por meio de uma [catraca](https://zechub.wiki/zcash-tech/the-turnstile), o mesmo mecanismo que o Zcash usou para o Ironwood. A escolha afeta a implantação, não o projeto.

Ele mantém vários elementos do Orchard: a re-randomização de chaves RedPallas, os compromissos de valor homomórficos e as assinaturas de vinculação, e a estrutura de chaves particionada que permite a um dispositivo delegar a geração de provas sem entregar a autoridade de gasto.

O trabalho de escalabilidade se apoia em **dados portadores de prova**, uma técnica em que os dados viajam acompanhados de uma prova da sua própria correção, de modo que combiná-los com outros dados portadores de prova produz algo que herda e estende essas provas. É isso que permite comprimir uma grande quantidade de trabalho verificado em algo pequeno e rápido de checar. O Halo, descoberto pela equipe por trás do Zcash, foi o que tornou os dados portadores de prova práticos o suficiente para servir de base.

A terceira vertente são os **agregados de transações blindadas**, que mudam a forma como as alterações do estado blindado são comunicadas e têm efeitos em cadeia sobre o funcionamento das assinaturas.

<br/>

## Em que pé está o trabalho

O Tachyon é uma **proposta, não um recurso lançado**. Foi publicado em abril de 2025, e um texto complementar em maio de 2025 analisou as implicações para o consenso. Foi apontado como candidato para o NU7, a próxima atualização depois do Ironwood, mas o escopo do NU7 acordado em 17 de setembro de 2026 não o inclui: o [ZIP 259](https://zips.z.cash/zip-0259) lista o que o NU7 implanta, e o [anúncio no fórum](https://forum.zcashcommunity.com/t/nu7-timeline/57655) diz que nenhum novo formato de transação aparece nele. Nenhuma data de ativação foi definida para o Tachyon.

O próprio autor o apresenta como um plano executável, e não como pesquisa especulativa, mas que exige um esforço de engenharia comparável ao do Sapling, com algumas questões mais difíceis deixadas deliberadamente para depois.

Já há trabalhos relacionados visíveis. O [Zakura](https://zechub.wiki/zcash-tech/zakura-node), um nó integral lançado em julho de 2026, é um esforço conjunto entre o Projeto Tachyon e a Valar Group e antecipa algumas dessas mudanças no nível da rede. A pesquisa sobre [recuperação privada de informações](https://zechub.wiki/zcash-tech/private-information-retrieval) ataca o mesmo gargalo de varredura por outro ângulo.

<br/>

## Equívocos comuns

- **O Tachyon não está em funcionamento.** Nenhuma carteira o usa hoje, e nenhuma atualização o ativou.
- **O Tachyon não é a mesma coisa que o Ironwood.** O Ironwood foi ativado em julho de 2026 e tratou da pool Orchard e da catraca. O Tachyon é uma proposta separada e posterior, sobre escalabilidade.
- **O Tachyon não reduz a privacidade.** O objetivo é manter a indistinguibilidade do registro eliminando o custo de escalabilidade, e não trocar privacidade por velocidade.
- **A verificação de zk-SNARK nunca foi o gargalo.** A proposta deixa claro que a parte lenta é a forma como as carteiras descobrem e coordenam o estado, não o custo de verificar provas.
- **O Tachyon não está no NU7.** Ele já foi apontado como candidato, mas o escopo acordado em setembro de 2026 abrange blocos de 25 segundos, reciclagem de taxas e o fim das transações da versão 4, sem nenhum novo formato de transação ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Glossário

| Termo | Significado |
|---|---|
| Trial decryption | Tentar descriptografar as transações uma a uma para encontrar as que são destinadas a você |
| In-band secret distribution | Colocar o segredo do pagamento dentro da transação na blockchain, como o Zcash faz hoje |
| Out-of-band payment | Passar os detalhes do pagamento diretamente entre remetente e destinatário, em vez de usar a chain |
| Oblivious synchronization | Buscar os dados da chain de que uma carteira precisa sem revelar quais dados foram solicitados |
| Proof-carrying data (PCD) | Dados que viajam com uma prova da sua própria correção, para que as provas possam ser combinadas e comprimidas |
| Shielded transaction aggregate | A forma do Tachyon de agrupar alterações do estado blindado, mudando como elas são comunicadas e assinadas |
| ledger indistinguishability | A propriedade de que as transações blindadas não podem ser distinguidas umas das outras |

<br/>

## Perguntas frequentes

**Isso vai fazer minha carteira sincronizar mais rápido?** Esse é o objetivo. O tempo de sincronização acompanharia a sua própria atividade, e não o tamanho da chain. Nada foi lançado ainda, então não há nenhum número medido para citar.

**Preciso fazer alguma coisa agora?** Não. O Tachyon é uma proposta. Se for adotado, chegará por meio de uma atualização da rede, com o aviso prévio de sempre.

**Remover as chaves de visualização significa perder a possibilidade de compartilhar acesso de leitura?** A proposta transfere esse recurso do núcleo do protocolo para a camada da carteira. Como isso vai funcionar na prática é uma das questões em aberto.

**Meu dinheiro corre risco se o Tachyon for lançado?** A implantação usaria uma atualização do Orchard ou uma catraca, ambas projetadas para que o valor seja movimentado sob regras de contabilidade públicas. A página Ironwood explica como uma catraca funciona.

<br/>

## Páginas relacionadas

- [Recuperação privada de informações](https://zechub.wiki/zcash-tech/private-information-retrieval) - outra abordagem para o mesmo gargalo de varredura das carteiras
- [Nó Zakura](https://zechub.wiki/zcash-tech/zakura-node) - um nó construído em parte a partir do esforço de engenharia do Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - a atualização ativada em julho de 2026, muitas vezes confundida com o Tachyon
- [A catraca](https://zechub.wiki/zcash-tech/the-turnstile) - o mecanismo que o Tachyon poderia usar se fosse implantado como uma pool própria
- [Segurança pós-quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - onde o Tachyon se situa em relação ao trabalho de protocolo de longo prazo
- [Como o Zcash é organizado](https://zechub.wiki/start-here/how-zcash-is-organized) - quem está fazendo esse trabalho e como o ecossistema se encaixa

<br/>

## Recursos

- [Tachyon: escalando o Zcash com sincronização oblívia](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 de abril de 2025, a proposta original
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 de maio de 2025, implicações para o consenso e o protocolo, escrito para desenvolvedores de protocolo
- [Blog de Sean Bowe](https://seanbowe.com/blog/) - onde a série sobre o Tachyon é publicada
- [tachyon.z.cash](https://tachyon.z.cash/) - site do projeto
