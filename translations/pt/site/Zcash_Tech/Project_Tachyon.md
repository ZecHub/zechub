<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon é uma reformulação proposta da forma como as carteiras do Zcash encontram e gastam fundos blindados, concebida para permitir que a rede cresça para um número muito elevado de usuários
- Atualmente, uma carteira precisa tentar descriptografar uma enorme parte da blockchain para descobrir quais pagamentos são seus, e essa é a principal razão pela qual a sincronização blindada parece lenta
- Tachyon substitui isso por **sincronização oblivious**, para que uma carteira obtenha o que precisa sem analisar tudo e sem indicar a um servidor quais partes queria
- Também move os detalhes de pagamento da blockchain para o próprio pedido de pagamento, o que torna o protocolo mais simples, mas transfere a responsabilidade para as carteiras
- É uma proposta, publicada pela primeira vez em abril de 2025. **Não faz parte de NU7** e **não foi lançada**, e requer um esforço de engenharia na escala da atualização Sapling

<br/>

## Para quem é

- Qualquer pessoa que tenha visto uma carteira blindada sincronizar e se perguntado por que demora tanto
- Pessoas recém-chegadas que veem constantemente Tachyon mencionado junto com NU7 e a escalabilidade do Zcash
- Leitores que querem primeiro a ideia e depois a criptografia

<br/>

## O problema que Tachyon resolve

O Zcash oculta para quem é um pagamento. Esse é o objetivo, e isso cria um problema incômodo: se ninguém consegue saber a quem pertence um pagamento, como a sua carteira encontra os seus pagamentos?

No Bitcoin isso é fácil. Os endereços são públicos, então uma carteira pode perguntar a um servidor "o que foi enviado para este endereço?" e obter uma resposta. Uma carteira do Zcash não pode fazer essa pergunta, porque fazê-la revelaria exatamente o que o pool blindado foi projetado para ocultar.

Por isso, o Zcash faz algo diferente. O remetente criptografa os detalhes do pagamento e os coloca dentro da própria transação. Sua carteira então percorre as transações na chain e tenta descriptografar cada uma. Quase todas as tentativas falham. As poucas que têm sucesso são os seus pagamentos. Isso é chamado de **descriptografia por tentativa**, e é privado, correto e lento.

![Atualmente, uma carteira Zcash transfere cada transação blindada e tenta descriptografar cada uma, falhando em quase todas as tentativas, para encontrar os poucos pagamentos que pertencem a ela](/content-images/tachyon-scanning-today.svg)

O problema é do que o trabalho depende. O esforço que sua carteira emprega é determinado pelo tamanho da chain, não pelo número de pagamentos que você realmente recebeu. Alguém que nunca recebeu um único pagamento faz quase tanto trabalho quanto alguém que os recebe diariamente. À medida que o Zcash cresce, isso piora para todos. Nas palavras da proposta, "simplesmente não escala."

<br/>

## O que Tachyon muda

Tachyon ataca o problema em sua raiz: deixa de usar a blockchain como canal de entrega de segredos de pagamento.

Em vez disso, os detalhes de que você precisa acompanham o próprio pedido de pagamento, fora de banda. Um pedido de pagamento, um URI ou um código QR transporta as informações que antes eram criptografadas na transação. Sean Bowe descreve isso como adotar **pagamentos fora de banda** pela primeira vez em um protocolo blindado do Zcash.

Quando a chain deixa de transportar essas informações, sua carteira deixa de ter motivos para procurá-las, e o problema da descriptografia por tentativa desaparece.

No entanto, sua carteira ainda precisa conhecer o estado atual da chain para poder gastar. Essa é a segunda metade do projeto, a **sincronização oblivious**: uma forma de uma carteira obter as coisas específicas de que precisa sem revelar ao servidor quais coisas solicitou.

![Com Tachyon, o remetente transmite os detalhes do pagamento ao destinatário fora de banda, e a carteira usa sincronização oblivious para obter apenas os dados de que precisa, em vez de analisar toda a chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## O que isso significaria para alguém que usa uma carteira

- **A sincronização deixa de crescer com a chain.** O tempo que sua carteira levaria para se atualizar dependeria da sua própria atividade, e não do tamanho do Zcash.
- **Os pagamentos se tornam mais parecidos com entregar uma fatura a alguém.** O pedido de pagamento contém o que o destinatário precisa, então a troca entre remetente e destinatário importa mais do que hoje.
- **As carteiras assumem mais responsabilidade.** Como a chain deixa de guardar uma cópia criptografada dos detalhes do seu pagamento, perder os dados da sua carteira se torna mais importante. O backup e a recuperação deixam de ser um recurso do protocolo e passam a ser algo que o software da carteira precisa fazer corretamente.
- **Alguns elementos familiares mudam ou desaparecem.** Tachyon retira a diversificação de chaves, as chaves de visualização e os endereços de pagamento do protocolo central, deixando-os para a camada da carteira. Esta é uma das partes mais consequentes da proposta e ainda está sendo trabalhada.

<br/>

## Uma análise mais detalhada para leitores técnicos

Tachyon é descrito como uma alteração com compatibilidade reversa do protocolo Orchard. Poderia ser implementado como uma atualização do pool Orchard existente ou como um pool blindado separado, alcançado por meio de uma [catraca](https://zechub.wiki/zcash-tech/the-turnstile), o mesmo mecanismo que o Zcash utilizou para Ironwood. A escolha afeta a implementação, não o projeto.

Mantém vários elementos de Orchard: a re-aleatorização de chaves RedPallas, os compromissos de valor homomórficos e as assinaturas de vinculação, e a estrutura de chaves particionada que permite a um dispositivo delegar a geração de provas sem ceder autoridade de gasto.

O trabalho de escalabilidade baseia-se em **dados acompanhados de provas**, uma técnica na qual os dados viajam juntamente com uma prova de sua própria correção, de modo que combiná-los com outros dados acompanhados de provas produz algo que herda e amplia essas provas. É isso que permite comprimir uma grande quantidade de trabalho verificado em algo pequeno e rápido de verificar. Halo, descoberto pela equipe por trás do Zcash, foi o que tornou os dados acompanhados de provas suficientemente práticos para desenvolver com base neles.

A terceira vertente são os **agregados de transações blindadas**, que alteram a forma como as alterações de estado blindado são comunicadas e têm efeitos indiretos na forma como as assinaturas funcionam.

<br/>

## Estado do trabalho

Tachyon é uma **proposta, não uma funcionalidade lançada**. Foi publicada em abril de 2025, e uma publicação posterior em maio de 2025 analisou as implicações para o consenso. Foi nomeada como candidata para NU7, a próxima atualização após Ironwood, mas o escopo de NU7 acordado em 17 de setembro de 2026 não a inclui: [ZIP 259](https://zips.z.cash/zip-0259) lista o que NU7 implementa, e o [anúncio no fórum](https://forum.zcashcommunity.com/t/nu7-timeline/57655) afirma que nenhum novo formato de transação aparece nele. Ainda não foi definida uma data de ativação para Tachyon.

A própria visão do autor é que se trata de um plano acionável, e não de pesquisa especulativa, mas que requer um esforço de engenharia comparável ao Sapling, deixando deliberadamente algumas questões mais difíceis para mais tarde.

O trabalho relacionado já é visível. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), um nó integral lançado em julho de 2026, é um esforço conjunto entre Project Tachyon e o Valar Group e antecipa algumas dessas alterações no nível da rede. A pesquisa sobre [recuperação privada de informações](https://zechub.wiki/zcash-tech/private-information-retrieval) visa o mesmo gargalo da varredura de carteiras sob uma perspectiva diferente.

<br/>

## Equívocos comuns

- **Tachyon não está ativo.** Nenhuma carteira o utiliza hoje, e nenhuma atualização o ativou.
- **Tachyon não é o mesmo que Ironwood.** Ironwood foi ativado em julho de 2026 e tratou do pool Orchard e da catraca. Tachyon é uma proposta distinta e posterior sobre escalabilidade.
- **Tachyon não reduz a privacidade.** O objetivo é manter a indistinguibilidade do ledger enquanto elimina o custo de escalabilidade, não trocar privacidade por velocidade.
- **A verificação de zk-SNARK nunca foi o gargalo.** A proposta deixa claro que a parte lenta é a forma como as carteiras descobrem e coordenam o estado, e não o custo de verificar provas.
- **Tachyon não está em NU7.** Foi indicado anteriormente como candidato, mas o escopo acordado em setembro de 2026 abrange blocos de 25 segundos, reciclagem de taxas e o fim das transações da versão 4, sem um novo formato de transação ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Glossário

| Termo | Significado |
|---|---|
| Trial decryption | Tentar descriptografar transações uma a uma para encontrar aquelas endereçadas a você |
| In-band secret distribution | Colocar o segredo de pagamento dentro da transação na blockchain, como o Zcash faz atualmente |
| Out-of-band payment | Transmitir os detalhes do pagamento diretamente entre remetente e destinatário, em vez de pela chain |
| Oblivious synchronization | Obter os dados da chain de que uma carteira precisa sem revelar quais dados foram solicitados |
| Proof-carrying data (PCD) | Dados que viajam com uma prova de sua própria correção, para que as provas possam ser combinadas e comprimidas |
| Shielded transaction aggregate | A forma de Tachyon agrupar alterações de estado blindado, alterando como são comunicadas e assinadas |
| ledger indistinguishability | A propriedade de as transações blindadas não poderem ser distinguidas umas das outras |

<br/>

## FAQ

**Isso tornará a sincronização da minha carteira mais rápida?** Esse é o objetivo. O tempo de sincronização dependeria da sua própria atividade em vez do tamanho da chain. Ainda nada foi lançado, então ainda não há uma medição para citar.

**Preciso fazer algo agora?** Não. Tachyon é uma proposta. Se for adotado, chegaria por meio de uma atualização da rede com o aviso habitual.

**Remover as chaves de visualização significa perder a possibilidade de compartilhar acesso de leitura?** A proposta move essa capacidade do protocolo central para a camada da carteira. A forma como isso funcionará na prática é uma das questões em aberto.

**Meu dinheiro está em risco se Tachyon for lançado?** A implementação usaria uma atualização do Orchard ou uma catraca, ambas projetadas para que o valor se mova sob regras de contabilidade pública. A página Ironwood explica como uma catraca funciona.

<br/>

## Páginas relacionadas

- [Recuperação privada de informações](https://zechub.wiki/zcash-tech/private-information-retrieval) - outra abordagem para o mesmo gargalo da varredura de carteiras
- [Nó Zakura](https://zechub.wiki/zcash-tech/zakura-node) - um nó construído em parte a partir do esforço de engenharia de Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - a atualização ativada em julho de 2026, frequentemente confundida com Tachyon
- [A catraca](https://zechub.wiki/zcash-tech/the-turnstile) - o mecanismo que Tachyon poderia usar se fosse implementado como seu próprio pool
- [Segurança pós-quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - onde Tachyon se posiciona junto ao trabalho de protocolo de longo prazo
- [Como o Zcash é organizado](https://zechub.wiki/start-here/how-zcash-is-organized) - quem está realizando este trabalho e como o ecossistema se articula

<br/>

## Recursos

- [Tachyon: Scaling Zcash with Oblivious Synchronization](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 de abril de 2025, a proposta original
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 de maio de 2025, implicações para consenso e protocolo, escrito para desenvolvedores de protocolos
- [Blog de Sean Bowe](https://seanbowe.com/blog/) - onde a série Tachyon é publicada
- [tachyon.z.cash](https://tachyon.z.cash/) - site do projeto
