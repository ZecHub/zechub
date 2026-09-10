<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Project Tachyon

## TL;DR

- Tachyon é uma reformulação proposta da forma como as wallets Zcash encontram e gastam fundos blindados, concebida para permitir que a rede cresça para números muito elevados de utilizadores
- Atualmente, uma wallet tem de tentar desencriptar uma enorme parte da blockchain para descobrir quais os pagamentos que lhe pertencem, e essa é a principal razão pela qual a sincronização blindada parece lenta
- Tachyon substitui isso por **sincronização oblivious**, para que uma wallet obtenha o que precisa sem analisar tudo e sem indicar a um servidor quais as partes que pretendia
- Também move os detalhes de pagamento da blockchain para o próprio pedido de pagamento, o que torna o protocolo mais simples, mas transfere a responsabilidade para as wallets
- É uma proposta, publicada pela primeira vez em abril de 2025 e nomeada como candidata para NU7. **Não foi lançada**, e requer um esforço de engenharia à escala da atualização Sapling

<br/>

## A quem se destina

- Qualquer pessoa que tenha visto uma wallet blindada sincronizar e se tenha perguntado porque demora tanto tempo
- Recém-chegados que veem constantemente Tachyon mencionado juntamente com NU7 e a escalabilidade de Zcash
- Leitores que querem primeiro a ideia e depois a criptografia

<br/>

## O problema que Tachyon resolve

Zcash oculta a quem se destina um pagamento. Esse é o objetivo, e cria um problema incómodo: se ninguém consegue saber a quem pertence um pagamento, como encontra a sua wallet os seus pagamentos?

Em Bitcoin isto é fácil. Os endereços são públicos, pelo que uma wallet pode perguntar a um servidor "o que foi enviado para este endereço?" e obter uma resposta. Uma wallet Zcash não pode fazer essa pergunta, porque fazê-la revelaria exatamente aquilo que o conjunto blindado foi concebido para ocultar.

Por isso, Zcash faz algo diferente. O remetente encripta os detalhes do pagamento e coloca-os dentro da própria transação. A sua wallet percorre então as transações na cadeia e tenta desencriptar cada uma. Quase todas as tentativas falham. As poucas que têm sucesso são os seus pagamentos. Isto chama-se **desencriptação por tentativa**, e é privado, correto e lento.

![Atualmente, uma wallet Zcash transfere cada transação blindada e tenta desencriptar cada uma, falhando quase todas as tentativas, para encontrar os poucos pagamentos que lhe pertencem](/content-images/tachyon-scanning-today.svg)

O problema é de que depende o trabalho. O esforço que a sua wallet despende é determinado pela dimensão da cadeia, não pelo número de pagamentos que efetivamente recebeu. Alguém que nunca recebeu um único pagamento faz quase tanto trabalho quanto alguém que os recebe diariamente. À medida que Zcash cresce, isto piora para todos. Nas palavras da proposta, "simplesmente não escala."

<br/>

## O que Tachyon altera

Tachyon ataca o problema na sua raiz: deixa de usar a blockchain como canal de entrega de segredos de pagamento.

Em vez disso, os detalhes de que precisa acompanham o próprio pedido de pagamento, fora de banda. Um pedido de pagamento, um URI ou um código QR transporta a informação que antes era encriptada na transação. Sean Bowe descreve isto como adotar **pagamentos fora de banda** pela primeira vez num protocolo blindado Zcash.

Quando a cadeia deixa de transportar essa informação, a sua wallet deixa de ter motivos para a procurar, e o problema da desencriptação por tentativa desaparece.

No entanto, a sua wallet continua a precisar de conhecer o estado atual da cadeia para poder gastar. Essa é a segunda metade do desenho, a **sincronização oblivious**: uma forma de uma wallet obter as coisas específicas de que precisa sem revelar ao servidor quais as coisas que pediu.

![Com Tachyon, o remetente transmite os detalhes do pagamento ao destinatário fora de banda, e a wallet usa sincronização oblivious para obter apenas os dados de que precisa, em vez de analisar toda a cadeia](/content-images/tachyon-oblivious-sync.svg)

<br/>

## O que significaria para alguém que usa uma wallet

- **A sincronização deixa de crescer com a cadeia.** O tempo que a sua wallet demora a atualizar-se dependeria da sua própria atividade, e não da dimensão de Zcash.
- **Os pagamentos tornam-se mais parecidos com entregar uma fatura a alguém.** O pedido de pagamento contém o que o destinatário precisa, pelo que a troca entre remetente e destinatário importa mais do que importa hoje.
- **As wallets assumem mais responsabilidade.** Como a cadeia deixa de guardar uma cópia encriptada dos detalhes do seu pagamento, perder os dados da sua wallet torna-se mais importante. A cópia de segurança e a recuperação deixam de ser uma funcionalidade do protocolo e passam a ser algo que o software da wallet tem de fazer corretamente.
- **Alguns elementos familiares mudam ou desaparecem.** Tachyon retira a diversificação de chaves, as chaves de visualização e os endereços de pagamento do protocolo central, deixando-os para a camada da wallet. Esta é uma das partes mais consequentes da proposta e ainda está a ser trabalhada.

<br/>

## Uma análise mais detalhada para leitores técnicos

Tachyon é descrito como uma alteração reversamente compatível do protocolo Orchard. Poderia ser implementado como uma atualização ao conjunto Orchard existente ou como um conjunto blindado separado, alcançado através de uma [catraca](https://zechub.wiki/zcash-tech/the-turnstile), o mesmo mecanismo que Zcash utilizou para Ironwood. A escolha afeta a implementação, não o desenho.

Mantém vários elementos de Orchard: a re-aleatorização de chaves RedPallas, os compromissos de valor homomórficos e assinaturas vinculativas, e a estrutura de chaves particionada que permite a um dispositivo delegar a geração de provas sem ceder autoridade de gasto.

O trabalho de escalabilidade baseia-se em **dados acompanhados de provas**, uma técnica na qual os dados viajam juntamente com uma prova da sua própria correção, de modo que combiná-los com outros dados acompanhados de provas produz algo que herda e amplia essas provas. É isto que permite comprimir uma grande quantidade de trabalho verificado em algo pequeno e rápido de verificar. Halo, descoberto pela equipa por detrás de Zcash, foi o que tornou os dados acompanhados de provas suficientemente práticos para desenvolver sobre eles.

A terceira vertente são os **agregados de transações blindadas**, que altera a forma como as alterações de estado blindado são comunicadas e tem efeitos indiretos na forma como as assinaturas funcionam.

<br/>

## Estado do trabalho

Tachyon é uma **proposta, não uma funcionalidade lançada**. Foi publicada em abril de 2025, e uma publicação de seguimento em maio de 2025 analisou as implicações para o consenso. É nomeada como candidata para NU7, a próxima atualização importante após Ironwood, mas o conteúdo de NU7 é decidido por votação dos detentores de moedas e nada sobre Tachyon está decidido.

O enquadramento do próprio autor é que se trata de um plano executável, e não de investigação especulativa, mas que requer um esforço de engenharia comparável a Sapling, deixando deliberadamente algumas questões mais difíceis para mais tarde.

O trabalho relacionado já é visível. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), um nó completo lançado em julho de 2026, é um esforço conjunto entre Project Tachyon e o Valar Group e antecipa algumas destas alterações ao nível da rede. A investigação sobre [recuperação privada de informação](https://zechub.wiki/zcash-tech/private-information-retrieval) visa o mesmo estrangulamento da análise de wallets a partir de uma perspetiva diferente.

<br/>

## Equívocos comuns

- **Tachyon não está ativo.** Nenhuma wallet o utiliza hoje, e nenhuma atualização o ativou.
- **Tachyon não é o mesmo que Ironwood.** Ironwood foi ativado em julho de 2026 e tratou do conjunto Orchard e da catraca. Tachyon é uma proposta distinta e posterior sobre escalabilidade.
- **Tachyon não reduz a privacidade.** O objetivo é manter a indistinguibilidade do livro-razão enquanto elimina o custo de escalabilidade, não trocar privacidade por velocidade.
- **A verificação de ZK-SNARK nunca foi o estrangulamento.** A proposta deixa claro que a parte lenta é a forma como as wallets descobrem e coordenam o estado, e não o custo de verificar provas.
- **"Destinado a NU7" não é um compromisso.** O que entra em NU7 é decidido por votação.

<br/>

## Glossário

| Termo | Significado |
|---|---|
| Desencriptação por tentativa | Tentar desencriptar transações uma a uma para encontrar aquelas que lhe são endereçadas |
| Distribuição de segredos em banda | Colocar o segredo de pagamento dentro da transação na blockchain, como Zcash faz atualmente |
| Pagamento fora de banda | Transmitir os detalhes do pagamento diretamente entre remetente e destinatário, em vez de através da cadeia |
| Sincronização oblivious | Obter os dados da cadeia de que uma wallet precisa sem revelar quais os dados solicitados |
| Dados acompanhados de provas (PCD) | Dados que viajam com uma prova da sua própria correção, para que as provas possam ser combinadas e comprimidas |
| Agregado de transações blindadas | A forma de Tachyon agrupar alterações de estado blindado, alterando como são comunicadas e assinadas |
| indistinguibilidade do livro-razão | A propriedade de as transações blindadas não poderem ser distinguidas umas das outras |

<br/>

## FAQ

**Isto tornará a sincronização da minha wallet mais rápida?** Esse é o objetivo. O tempo de sincronização dependeria da sua própria atividade em vez da dimensão da cadeia. Ainda nada foi lançado, pelo que ainda não existe uma medição a citar.

**Tenho de fazer alguma coisa agora?** Não. Tachyon é uma proposta. Se for adotado, chegaria através de uma atualização da rede com o aviso habitual.

**Remover as chaves de visualização significa perder a possibilidade de partilhar acesso de leitura?** A proposta move essa capacidade do protocolo central para a camada da wallet. A forma como isto funcionará na prática é uma das questões em aberto.

**O meu dinheiro está em risco se Tachyon for lançado?** A implementação usaria uma atualização Orchard ou uma catraca, ambas concebidas para que o valor se mova sob regras de contabilidade pública. A página Ironwood explica como funciona uma catraca.

<br/>

## Páginas relacionadas

- [Recuperação Privada de Informação](https://zechub.wiki/zcash-tech/private-information-retrieval) - outra abordagem ao mesmo estrangulamento da análise de wallets
- [Nó Zakura](https://zechub.wiki/zcash-tech/zakura-node) - um nó construído em parte a partir do esforço de engenharia de Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - a atualização ativada em julho de 2026, frequentemente confundida com Tachyon
- [A Catraca](https://zechub.wiki/zcash-tech/the-turnstile) - o mecanismo que Tachyon poderia utilizar se fosse implementado como o seu próprio conjunto
- [Segurança Pós-Quântica](https://zechub.wiki/zcash-tech/post-quantum-security) - onde Tachyon se posiciona juntamente com o trabalho de protocolo a longo prazo
- [Como Zcash Está Organizado](https://zechub.wiki/start-here/how-zcash-is-organized) - quem está a realizar este trabalho e como o ecossistema se articula

<br/>

## Recursos

- [Tachyon: Escalar Zcash com Sincronização Oblivious](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 de abril de 2025, a proposta original
- [Tachyaction à Distância](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 de maio de 2025, implicações para consenso e protocolo, escrito para programadores de protocolos
- [Blog de Sean Bowe](https://seanbowe.com/blog/) - onde a série Tachyon é publicada
- [tachyon.z.cash](https://tachyon.z.cash/) - site do projeto
