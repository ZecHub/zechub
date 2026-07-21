<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Segurança Pós-Quântica no Zcash

## TL;DR

- Computadores quânticos são um risco futuro porque podem quebrar parte da criptografia de chave pública usada hoje pelas blockchains.
- "Pós-quântico" significa criptografia que roda em computadores comuns, mas foi projetada para resistir a ataques de futuros computadores quânticos.
- Zcash não é totalmente pós-quântico hoje.
- O Zcash blindado reduz a quantidade de dados públicos de transação que futuros atacantes podem estudar, mas o uso blindado não é o mesmo que resistência quântica completa.
- Zcash está se preparando por meio de pesquisa, ZIPs e propostas de atualização como ZIP 2005 e Project Tachyon.
- Uma migração pós-quântica segura precisa proteger fundos, privacidade, carteiras, exchanges e regras de consenso ao mesmo tempo.

## O Que É Computação Quântica?

Um computador normal armazena informações como bits. Cada bit é `0` ou `1`.

Um computador quântico usa bits quânticos, chamados qubits. Qubits podem ser usados por algoritmos especiais que resolvem alguns problemas matemáticos muito mais rápido do que computadores normais.

Isso não significa que um computador quântico seja mais rápido em tudo. O risco é específico. Parte da criptografia depende de problemas matemáticos que são muito difíceis para computadores normais, mas muito mais fáceis para um computador quântico suficientemente grande.

Para blockchains, o exemplo mais importante é a criptografia de chave pública. Chaves públicas e assinaturas são usadas para provar que um usuário tem permissão para gastar moedas.

## Por Que as Blockchains se Importam

As blockchains usam criptografia para vários trabalhos diferentes:

| Ferramenta criptográfica | O que faz | Impacto quântico |
| --- | --- | --- |
| Assinaturas digitais | Provam que o proprietário autorizou um gasto | Alto risco para sistemas comuns de curva elíptica |
| Funções hash | Constroem endereços, commitments, árvores de Merkle e desafios | Menor risco, mas as margens de segurança importam |
| Provas de conhecimento zero | Provam que transações blindadas são válidas sem revelar detalhes | Depende do sistema de prova e das suposições |
| Acordo de chaves | Ajuda carteiras a criptografar dados de notas para destinatários | Precisa de revisão cuidadosa sob um modelo de ameaça quântica |

Um computador quântico suficientemente poderoso poderia ameaçar muitos esquemas de assinatura usados hoje, incluindo assinaturas de curva elíptica. Isso importa porque uma assinatura é o que permite à rede saber que uma transação foi autorizada pela chave correta.

Funções hash são diferentes. O algoritmo de Grover pode acelerar a busca por força bruta, mas não quebra funções hash da mesma forma direta. Margens de segurança maiores podem ajudar.

## O Que É Criptografia Pós-Quântica?

Criptografia pós-quântica é uma criptografia projetada para permanecer segura tanto contra computadores normais quanto contra futuros computadores quânticos.

Isso não significa que a criptografia use um computador quântico. Significa que o sistema se baseia em diferentes problemas matemáticos difíceis.

Em 2024, o NIST lançou os primeiros padrões pós-quânticos finalizados:

- **ML-KEM** para estabelecimento de chaves
- **ML-DSA** para assinaturas digitais
- **SLH-DSA** para assinaturas digitais baseadas em hash

Esses padrões são um marco importante, mas uma blockchain não pode simplesmente trocar um algoritmo por outro da noite para o dia. Regras de consenso, carteiras, hardware wallets, tamanhos de transação, taxas e privacidade precisam ser considerados.

## Como o Risco Quântico Aparece On-Chain

Uma forma simples de pensar sobre o risco é:

1. Um usuário cria um par de chaves.
2. A chave pública ou os dados de assinatura podem aparecer on-chain.
3. Um futuro atacante quântico pode ser capaz de usar esse material público para descobrir a chave privada.
4. Se os fundos ainda estiverem controlados por essa chave, podem estar em risco.

Blockchains transparentes expõem muitas informações por design. Endereços, valores e links entre transações são públicos. O material de chave pública também pode se tornar visível quando as moedas são gastas.

Essa é uma das razões pelas quais a reutilização de endereços é prejudicial. A reutilização dá aos observadores mais dados para conectar hoje e dá aos futuros atacantes mais material histórico para analisar.

## O Que É Diferente no Zcash?

Zcash suporta transações transparentes e blindadas.

O Zcash transparente funciona mais como o uso de blockchain pública no estilo Bitcoin. Endereços, valores e relações entre transações são visíveis.

O Zcash blindado é diferente. Transações blindadas usam provas de conhecimento zero para que a rede possa verificar que uma transação segue as regras sem revelar o remetente, o destinatário ou o valor.

Isso dá ao Zcash uma importante vantagem de privacidade:

- Menos dados de transação são publicados para todos verem.
- Os usuários evitam criar um grafo público de pagamentos quando permanecem blindados.
- Observadores futuros têm menos histórico financeiro público para analisar.
- A divulgação seletiva pode acontecer por meio de viewing keys em vez de registros públicos por padrão.

Mas o Zcash blindado não é automaticamente pós-quântico. Pools blindados ainda dependem de suposições criptográficas. Autorização de gasto, note commitments, nullifiers, sistemas de prova, criptografia e chaves de carteira precisam de revisão cuidadosa.

A versão curta:

> O uso blindado reduz a exposição pública, mas o Zcash ainda precisa de atualizações pós-quânticas deliberadas.

## Mapa de Risco do Zcash

| Área | Explicação para iniciantes | Preocupação pós-quântica |
| --- | --- | --- |
| Endereços transparentes | Endereços públicos e grafo público de transações | Riscos semelhantes aos de outras blockchains transparentes |
| Autorização de gasto | A prova de que um usuário tem permissão para gastar | Esquemas de assinatura podem precisar de substituição ou migração |
| Notas blindadas | Registros privados de valor dentro de pools blindados | Alguns componentes podem precisar de novas suposições ou ferramentas de recuperação |
| zk-SNARKs | Provas de que transações blindadas são válidas | As suposições do sistema de prova precisam de revisão |
| Varredura da carteira | Como as carteiras encontram e descriptografam notas recebidas | Acordo de chaves e criptografia de notas precisam de revisão |
| Migração | Mover fundos para uma criptografia mais segura | Deve evitar tanto perda de fundos quanto vazamentos de privacidade |

## Como o Zcash Está se Preparando

### Zcash Tem um Processo de Atualização de Rede

Zcash já mudou sua criptografia antes. Sapling tornou as transações blindadas mais fáceis de usar. NU5 introduziu Orchard, Unified Addresses e Halo 2.

Isso importa porque a prontidão pós-quântica não é um patch de software de uma linha. Ela exige atualizações coordenadas da rede, mudanças em carteiras, auditorias e tempo para que os usuários migrem.

Atualizações anteriores do Zcash mostram que o ecossistema tem experiência em migrar de criptografia mais antiga para designs mais novos.

### Halo e Orchard Reduziram Suposições Mais Antigas

Halo 2 é usado por Orchard, o pool blindado moderno do Zcash. Uma melhoria importante é que Halo removeu a necessidade de uma trusted setup para o sistema de prova do Orchard.

Isso não é a mesma coisa que segurança pós-quântica. Ainda assim, é relevante porque mostra que o Zcash consegue substituir blocos fundamentais criptográficos importantes quando designs melhores estão disponíveis.

### ZIP 2005 Foca na Recuperabilidade Quântica

ZIP 2005 tem o título "Orchard Quantum Recoverability". Ele propõe mudanças destinadas a ajudar usuários do Orchard a recuperar ou migrar fundos se ataques quânticos contra suposições mais antigas se tornarem práticos.

Recuperabilidade não é o mesmo que segurança pós-quântica completa. Ela é mais limitada e ainda útil:

- Segurança pós-quântica completa tenta impedir que ataques quânticos funcionem.
- Recuperabilidade dá aos usuários honestos um caminho melhor caso a criptografia antiga se torne insegura.

Para iniciantes, pense nisso como um plano de saída de emergência. Ele não substitui todo o prédio, mas ajuda as pessoas a sair da sala antiga com segurança se a fechadura antiga ficar fraca.

### Project Tachyon Aponta para Melhorias Maiores no Protocolo

Project Tachyon é uma proposta de atualização do Zcash focada em escala, sincronização e crescimento de estado. Seu site público diz que a proposta busca reduzir o tamanho das transações, diminuir o crescimento do estado dos validadores e obter privacidade pós-quântica completa como efeito colateral.

Como Tachyon é uma proposta, ela ainda depende de trabalho de engenharia, revisão e aprovação da comunidade antes da ativação. É melhor entendê-la como parte da pesquisa ativa e da direção de atualização do Zcash, não como um recurso que os usuários já têm hoje.

### Pesquisa e Padrões Estão Avançando

O mundo mais amplo da criptografia também está avançando. Os padrões pós-quânticos do NIST dão aos implementadores blocos fundamentais mais fortes para assinaturas e estabelecimento de chaves. Pesquisadores de conhecimento zero continuam estudando sistemas de prova que possam se sustentar sob suposições quânticas.

Zcash pode se beneficiar desse trabalho, mas ainda precisa adaptá-lo a uma blockchain que preserve a privacidade.

## Possíveis Abordagens Futuras de Atualização

### Autorização de Gasto Pós-Quântica

Zcash pode eventualmente precisar de uma autorização de gasto que não dependa de esquemas de assinatura vulneráveis a ataques quânticos.

Isso poderia usar assinaturas pós-quânticas, assinaturas híbridas ou outro design. Um design híbrido usa verificações clássicas e pós-quânticas durante um período de transição, para que o sistema não dependa de apenas uma suposição.

O desafio é tamanho e custo. Assinaturas pós-quânticas podem ser maiores do que as assinaturas de hoje, o que afeta o tamanho das transações, largura de banda, taxas, carteiras móveis e hardware wallets.

### Novos Formatos de Endereço e Chave

Nova criptografia frequentemente exige novas chaves e endereços. Os usuários precisariam de um caminho claro de migração dos formatos antigos para formatos mais seguros.

A migração deve ser simples nas carteiras. A maioria dos usuários não deveria precisar entender cada detalhe criptográfico para permanecer segura.

### Migração com Preservação de Privacidade

A migração é especialmente sensível para o Zcash. Se muitos usuários moverem fundos de pools antigos para pools novos em padrões óbvios, a própria migração pode vazar informações.

Um bom plano de migração precisa proteger:

- Fundos dos usuários
- Privacidade dos usuários
- Compatibilidade das carteiras
- Suporte de exchanges
- Suporte de hardware wallets
- Segurança do consenso da rede

### Revisão do Sistema de Prova Pós-Quântico

Substituir assinaturas não é suficiente. O design blindado do Zcash também depende de provas de conhecimento zero e commitments.

Trabalho futuro pode precisar revisar ou substituir:

- Suposições de zk-SNARK
- Commitments polinomiais
- Hashes de desafio Fiat-Shamir
- Note commitments
- Construção de nullifiers
- Suposições da árvore de Merkle
- Criptografia de notas e comportamento de viewing key

Alguns componentes podem ser aceitáveis com parâmetros ajustados. Outros componentes podem precisar de novos designs.

## Exemplos para Iniciantes

### Exemplo 1: A Fechadura Antiga

Imagine um cofre com uma fechadura que é forte hoje. Uma nova ferramenta inventada no futuro pode abrir essa fechadura antiga rapidamente.

Criptografia pós-quântica é como substituir a fechadura por um design que não se espera que a nova ferramenta quebre.

Para uma blockchain, substituir a fechadura é difícil porque cada carteira, nó, exchange e dispositivo de hardware precisa entender o novo design.

### Exemplo 2: A Caixa Pública de Recibos

Dados de blockchain transparente são como colocar todos os recibos em uma caixa pública para sempre. Mesmo que ninguém consiga ler todos os padrões hoje, ferramentas futuras podem aprender mais depois.

O Zcash blindado tenta evitar publicar esses recibos em primeiro lugar. Isso ajuda a privacidade de longo prazo, mas a fechadura que protege o sistema blindado ainda precisa ser revisada para um futuro quântico.

### Exemplo 3: O Plano de Saída

Recuperabilidade é como planejar uma rota de saída antes que haja um incêndio. Você espera não precisar dela, mas é muito mais seguro planejá-la cedo do que durante uma emergência.

ZIP 2005 se encaixa nessa ideia para notas do Orchard.

## O Que os Usuários Podem Fazer Hoje

Os usuários não precisam entrar em pânico. Grandes computadores quânticos públicos capazes de quebrar a criptografia de blockchain já implantada não estão disponíveis hoje.

Bons hábitos ainda ajudam:

- Prefira usar Zcash blindado quando possível.
- Evite reutilizar endereços.
- Mantenha as carteiras atualizadas.
- Acompanhe os anúncios de atualização de rede do Zcash.
- Fique atento a ZIPs e orientações de carteiras sobre recuperabilidade ou migração.
- Não assuma que a atividade transparente é privada.
- Não mova fundos com base em rumores; espere orientações claras de desenvolvedores confiáveis de Zcash e das equipes de carteiras.

## Desafios

Atualizações pós-quânticas são difíceis para qualquer blockchain.

Desafios comuns incluem:

- Chaves e assinaturas maiores
- Transações maiores
- Custos de verificação mais altos
- Maior uso de largura de banda
- Novas auditorias de segurança
- Suporte de hardware wallets
- Desempenho de carteiras móveis
- Integração com exchanges e custódia
- Vazamentos de privacidade durante a migração
- Concordância da comunidade sobre mudanças de consenso

Para o Zcash, a parte mais difícil não é apenas manter as moedas gastáveis. A parte difícil é manter as moedas gastáveis enquanto se preserva a privacidade que torna o Zcash diferente.

## Resumo

Computadores quânticos podem eventualmente ameaçar parte da criptografia usada por blockchains. A criptografia pós-quântica é a resposta de longo prazo, mas precisa ser implantada com cuidado.

Zcash não é totalmente pós-quântico hoje. No entanto, o Zcash tem pontos fortes úteis: transações blindadas reduzem a exposição pública, a rede tem um histórico de atualizações criptográficas e pesquisas atuais como ZIP 2005 e Project Tachyon já estão voltadas para riscos quânticos futuros.

Para iniciantes, a ideia principal é simples: privacidade hoje reduz a exposição futura de dados, e atualizações cuidadosas podem ajudar o Zcash a avançar em direção a uma segurança mais forte na era quântica sem sacrificar a usabilidade.

## Páginas Relacionadas

- [Pools Blindados](/using-zcash/shielded-pools) - Como as transações blindadas do Zcash protegem os detalhes das transações
- [Halo](/zcash-tech/halo) - O sistema de prova do Zcash sem trusted setup
- [ZKP & ZK-SNARKS](/zcash-tech/zk-snarks) - Como as provas de conhecimento zero funcionam no Zcash
- [Viewing Keys](/zcash-tech/viewing-keys) - Como a divulgação seletiva funciona no Zcash blindado
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Futuros ativos blindados e suporte a ativos privados
- [Privacidade como um Princípio Fundamental](/privacy/privacy-as-a-core-principle) - Por que a privacidade financeira importa

## Referências

- [NIST: Primeiros padrões finalizados de criptografia pós-quântica](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Projeto de Criptografia Pós-Quântica do NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Especificação do Protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Livro do Halo 2](https://zcash.github.io/halo2/)
