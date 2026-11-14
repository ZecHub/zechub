<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Segurança pós-quântica no Zcash

## Resumo

- Computadores quânticos são um risco futuro porque poderiam quebrar parte da criptografia de chave pública usada pelas blockchains hoje.
- "Pós-quântico" significa criptografia que roda em computadores comuns, mas é projetada para resistir a ataques de futuros computadores quânticos.
- O Zcash não é totalmente pós-quântico hoje.
- O uso blindado do Zcash reduz a quantidade de dados públicos de transações que futuros atacantes podem estudar, mas o uso blindado não é o mesmo que resistência quântica total.
- O Zcash está se preparando por meio de pesquisas, ZIPs e propostas de atualização como o ZIP 2005 e o Projeto Tachyon.
- Uma migração pós-quântica segura precisa proteger fundos, privacidade, carteiras, corretoras e regras de consenso ao mesmo tempo.

Para saber o que o Ironwood mudou e ver o status datado de cada parte, consulte [O Zcash é pós-quântico?](/zcash-tech/is-zcash-post-quantum).

## O que é computação quântica?

Um computador normal armazena informações como bits. Cada bit é `0` ou `1`.

Um computador quântico usa bits quânticos, chamados qubits. Os qubits podem ser usados por algoritmos especiais que resolvem alguns problemas matemáticos muito mais rápido do que computadores normais.

Isso não significa que um computador quântico seja mais rápido em tudo. O risco é específico. Parte da criptografia depende de problemas matemáticos que são muito difíceis para computadores normais, mas muito mais fáceis para um computador quântico grande o suficiente.

Para as blockchains, o exemplo mais importante é a criptografia de chave pública. Chaves públicas e assinaturas são usadas para provar que um usuário tem permissão para gastar moedas.

## Por que isso importa para as blockchains

As blockchains usam criptografia para várias funções diferentes:

| Ferramenta criptográfica | O que faz | Impacto quântico |
| --- | --- | --- |
| Assinaturas digitais | Provam que o dono autorizou um gasto | Alto risco para sistemas comuns de curva elíptica |
| Funções hash | Constroem endereços, compromissos, árvores Merkle e desafios | Risco menor, mas as margens de segurança importam |
| Provas de conhecimento zero | Provam que transações blindadas são válidas sem revelar detalhes | Depende do sistema de provas e das suposições |
| Acordo de chaves | Ajuda as carteiras a criptografar os dados das notes para os destinatários | Precisa de revisão cuidadosa sob um modelo de ameaça quântica |

Um computador quântico suficientemente poderoso poderia ameaçar muitos esquemas de assinatura usados hoje, incluindo as assinaturas de curva elíptica. Isso importa porque a assinatura é o que permite à rede saber que uma transação foi autorizada pela chave correta.

As funções hash são diferentes. O algoritmo de Grover pode acelerar a busca por força bruta, mas não quebra as funções hash da mesma forma direta. Margens de segurança maiores podem ajudar.

## O que é criptografia pós-quântica?

Criptografia pós-quântica é a criptografia projetada para permanecer segura tanto contra computadores normais quanto contra futuros computadores quânticos.

Isso não significa que a criptografia usa um computador quântico. Significa que o sistema se baseia em problemas matemáticos difíceis diferentes.

Em 2024, o NIST publicou os primeiros padrões pós-quânticos finalizados:

- **ML-KEM** para estabelecimento de chaves
- **ML-DSA** para assinaturas digitais
- **SLH-DSA** para assinaturas digitais baseadas em hash

Esses padrões são um marco importante, mas uma blockchain não pode simplesmente trocar um algoritmo por outro da noite para o dia. Regras de consenso, carteiras, carteiras de hardware, tamanho das transações, taxas e privacidade, tudo isso precisa ser considerado.

## Como o risco quântico aparece on-chain

Uma forma simples de pensar sobre o risco é:

1. Um usuário cria um par de chaves.
2. A chave pública ou os dados da assinatura podem aparecer on-chain.
3. Um futuro atacante quântico pode conseguir usar esse material público para descobrir a chave privada.
4. Se os fundos ainda forem controlados por essa chave, eles podem estar em risco.

Blockchains transparentes expõem muitas informações por design. Endereços, valores e ligações entre transações são públicos. O material da chave pública também pode se tornar visível quando as moedas são gastas.

Esse é um dos motivos pelos quais reutilizar endereços é prejudicial. A reutilização dá aos observadores mais dados para conectar hoje e dá aos futuros atacantes mais material histórico para analisar.

## O que é diferente no Zcash?

O Zcash suporta transações transparentes e blindadas.

O uso transparente do Zcash funciona de forma mais parecida com o uso de uma blockchain pública no estilo do Bitcoin. Endereços, valores e relações entre transações são visíveis.

O uso blindado do Zcash é diferente. As transações blindadas usam provas de conhecimento zero para que a rede possa verificar que uma transação segue as regras sem revelar o remetente, o destinatário ou o valor.

Isso dá ao Zcash uma vantagem importante de privacidade:

- Menos dados de transações são publicados para todos verem.
- Os usuários evitam criar um grafo público de pagamentos quando permanecem no modo blindado.
- Futuros observadores têm menos histórico financeiro público para analisar.
- A divulgação seletiva pode acontecer por meio de chaves de visualização, em vez de registros públicos por padrão.

Mas o uso blindado do Zcash não é automaticamente pós-quântico. Os pools blindados ainda dependem de suposições criptográficas. Autorização de gastos, compromissos de notes, nulificadores, sistemas de provas, criptografia e chaves das carteiras, tudo isso precisa de revisão cuidadosa.

A versão curta:

> O uso blindado reduz a exposição pública, mas o Zcash ainda precisa de atualizações pós-quânticas deliberadas.

## Mapa de riscos do Zcash

| Área | Explicação para iniciantes | Preocupação pós-quântica |
| --- | --- | --- |
| Endereços transparentes | Endereços públicos e grafo público de transações | Riscos semelhantes aos de outras blockchains transparentes |
| Autorização de gastos | A prova de que um usuário tem permissão para gastar | Os esquemas de assinatura podem precisar de substituição ou migração |
| Notes blindadas | Registros privados de valor dentro dos pools blindados | Alguns componentes podem precisar de novas suposições ou ferramentas de recuperação |
| zk-SNARKs | Provas de que as transações blindadas são válidas | As suposições do sistema de provas precisam de revisão |
| Varredura das carteiras | Como as carteiras encontram e descriptografam as notes recebidas | O acordo de chaves e a criptografia das notes precisam de revisão |
| Migração | Mover fundos para uma criptografia mais segura | Deve evitar tanto a perda de fundos quanto vazamentos de privacidade |

## Como o Zcash está se preparando

### O Zcash tem um processo de atualização da rede

O Zcash já mudou sua criptografia antes. O Sapling tornou as transações blindadas mais fáceis de usar. O NU5 introduziu o Orchard, os Unified Addresses e o Halo 2.

Isso importa porque a preparação pós-quântica não é um patch de software de uma linha. Ela exige atualizações da rede coordenadas, mudanças nas carteiras, auditorias e tempo para os usuários migrarem.

As atualizações anteriores do Zcash mostram que o ecossistema tem experiência em migrar de criptografias mais antigas para designs mais novos.

### Halo e Orchard reduziram suposições antigas

O Halo 2 é usado pelo Orchard, o pool blindado moderno do Zcash. Uma melhoria importante é que o Halo eliminou a necessidade de uma configuração confiável para o sistema de provas do Orchard.

Isso não é a mesma coisa que segurança pós-quântica. Ainda assim, é relevante porque mostra que o Zcash consegue substituir grandes blocos de construção criptográficos quando há designs melhores disponíveis.

### O ZIP 2005 foca na recuperabilidade quântica

O ZIP 2005 tem o título "Orchard Quantum Recoverability". Ele propõe mudanças destinadas a ajudar os usuários do Orchard a recuperar ou migrar fundos caso ataques quânticos contra suposições antigas se tornem viáveis.

Recuperabilidade não é o mesmo que segurança pós-quântica total. É algo mais restrito, mas ainda útil:

- A segurança pós-quântica total tenta impedir que ataques quânticos funcionem.
- A recuperabilidade oferece aos usuários honestos um caminho melhor caso a criptografia antiga se torne insegura.

Para iniciantes, pense nisso como um plano de saída de emergência. Ele não substitui o prédio inteiro, mas ajuda as pessoas a sair da sala antiga com segurança se a fechadura antiga ficar fraca.

### O Projeto Tachyon mira melhorias maiores no protocolo

O Projeto Tachyon é uma proposta de atualização do Zcash focada em escala, sincronização e crescimento do estado. Seu site público diz que a proposta visa reduzir o tamanho das transações, diminuir o crescimento do estado dos validadores e obter privacidade pós-quântica total como efeito colateral.

Como o Tachyon é uma proposta, ele ainda depende de trabalho de engenharia, revisão e aprovação da comunidade antes da ativação. A melhor forma de entendê-lo é como parte da direção ativa de pesquisa e atualização do Zcash, e não como um recurso que os usuários já têm hoje.

### Pesquisas e padrões estão avançando

O mundo da criptografia em geral também está avançando. Os padrões pós-quânticos do NIST oferecem aos implementadores blocos de construção mais fortes para assinaturas e estabelecimento de chaves. Pesquisadores de conhecimento zero continuam estudando sistemas de provas capazes de resistir sob suposições quânticas.

O Zcash pode se beneficiar desse trabalho, mas ainda precisa adaptá-lo a uma blockchain que preserva a privacidade.

## Possíveis abordagens para atualizações futuras

### Autorização de gastos pós-quântica

O Zcash pode eventualmente precisar de uma autorização de gastos que não dependa de esquemas de assinatura vulneráveis a ataques quânticos.

Isso poderia usar assinaturas pós-quânticas, assinaturas híbridas ou outro design. Um design híbrido usa verificações clássicas e pós-quânticas durante um período de transição, para que o sistema não dependa de uma única suposição.

O desafio é o tamanho e o custo. As assinaturas pós-quânticas podem ser maiores do que as assinaturas atuais, o que afeta o tamanho das transações, a largura de banda, as taxas, as carteiras móveis e as carteiras de hardware.

### Novos formatos de endereço e de chave

Uma nova criptografia muitas vezes exige novas chaves e novos endereços. Os usuários precisariam de um caminho de migração claro dos formatos antigos para formatos mais seguros.

A migração deve ser simples nas carteiras. A maioria dos usuários não deveria precisar entender cada detalhe criptográfico para se manter segura.

### Migração que preserva a privacidade

A migração é especialmente delicada para o Zcash. Se muitos usuários moverem fundos de pools antigos para pools novos seguindo padrões óbvios, a própria migração poderia vazar informações.

Um bom plano de migração precisa proteger:

- Os fundos dos usuários
- A privacidade dos usuários
- A compatibilidade das carteiras
- O suporte das corretoras
- O suporte das carteiras de hardware
- A segurança do consenso da rede

### Revisão pós-quântica do sistema de provas

Substituir as assinaturas não é suficiente. O design blindado do Zcash também depende de provas de conhecimento zero e de compromissos.

O trabalho futuro pode precisar revisar ou substituir:

- As suposições do zk-SNARK
- Os compromissos polinomiais
- Os hashes de desafio Fiat-Shamir
- Os compromissos de notes
- A construção dos nulificadores
- As suposições da árvore Merkle
- A criptografia das notes e o comportamento das chaves de visualização

Alguns componentes podem ser aceitáveis com parâmetros ajustados. Outros componentes podem precisar de novos designs.

## Exemplos para iniciantes

### Exemplo 1: a fechadura antiga

Imagine um cofre com uma fechadura que é forte hoje. Uma nova ferramenta inventada no futuro talvez consiga abrir essa fechadura antiga rapidamente.

A criptografia pós-quântica é como substituir a fechadura por um design que não se espera que a nova ferramenta consiga quebrar.

Para uma blockchain, substituir a fechadura é difícil porque toda carteira, todo nó, toda corretora e todo dispositivo de hardware precisam entender o novo design.

### Exemplo 2: a caixa pública de recibos

Os dados de uma blockchain transparente são como colocar cada recibo em uma caixa pública para sempre. Mesmo que ninguém consiga ler todos os padrões hoje, ferramentas futuras podem descobrir mais depois.

O uso blindado do Zcash tenta evitar a publicação desses recibos desde o início. Isso ajuda a privacidade a longo prazo, mas a fechadura que protege o sistema blindado ainda precisa ser revisada para um futuro quântico.

### Exemplo 3: o plano de saída

A recuperabilidade é como planejar uma rota de fuga antes de haver um incêndio. Você espera não precisar dela, mas é muito mais seguro projetá-la cedo do que durante uma emergência.

O ZIP 2005 se encaixa nessa ideia para as notes do Orchard.

## O que os usuários podem fazer hoje

Os usuários não precisam entrar em pânico. Grandes computadores quânticos públicos capazes de quebrar a criptografia das blockchains em uso não estão disponíveis hoje.

Bons hábitos ainda ajudam:

- Prefira o uso blindado do Zcash sempre que possível.
- Evite reutilizar endereços.
- Mantenha suas carteiras atualizadas.
- Acompanhe os anúncios de atualizações da rede do Zcash.
- Fique atento a ZIPs e orientações das carteiras sobre recuperabilidade ou migração.
- Não presuma que a atividade transparente é privada.
- Não mova fundos com base em boatos; espere orientações claras de desenvolvedores do Zcash e equipes de carteiras confiáveis.

## Desafios

As atualizações pós-quânticas são difíceis para qualquer blockchain.

Os desafios comuns incluem:

- Chaves e assinaturas maiores
- Transações maiores
- Custos de verificação mais altos
- Maior uso de largura de banda
- Novas auditorias de segurança
- Suporte das carteiras de hardware
- Desempenho das carteiras móveis
- Integração com corretoras e serviços de custódia
- Vazamentos de privacidade durante a migração
- Acordo da comunidade sobre mudanças no consenso

Para o Zcash, a parte mais difícil não é apenas manter as moedas gastáveis. A parte difícil é manter as moedas gastáveis preservando a privacidade que torna o Zcash diferente.

## Resumo final

Computadores quânticos poderiam eventualmente ameaçar parte da criptografia usada pelas blockchains. A criptografia pós-quântica é a resposta de longo prazo, mas precisa ser implantada com cuidado.

O Zcash não é totalmente pós-quântico hoje. No entanto, o Zcash tem pontos fortes úteis: as transações blindadas reduzem a exposição pública, a rede tem um histórico de atualizações criptográficas e pesquisas atuais como o ZIP 2005 e o Projeto Tachyon já estão voltadas para os riscos quânticos futuros.

Para iniciantes, a ideia principal é simples: a privacidade hoje reduz a exposição de dados no futuro, e atualizações cuidadosas podem ajudar o Zcash a avançar para uma segurança mais forte na era quântica sem sacrificar a usabilidade.

## Páginas relacionadas

- [O Zcash é pós-quântico?](/zcash-tech/is-zcash-post-quantum) - O que o Ironwood mudou, o que ainda está exposto e uma tabela de status datada
- [Pools blindados](/using-zcash/shielded-pools) - Como as transações blindadas do Zcash protegem os detalhes das transações
- [Halo](/zcash-tech/halo) - O sistema de provas do Zcash sem configuração confiável
- [ZKP e zk-SNARKs](/zcash-tech/zk-snarks) - Como as provas de conhecimento zero funcionam no Zcash
- [Chaves de visualização](/zcash-tech/viewing-keys) - Como a divulgação seletiva funciona no Zcash blindado
- [Ativos blindados do Zcash](/zcash-tech/zcash-shielded-assets) - Futuros ativos blindados e suporte a ativos privados

## Referências

- [NIST: primeiros padrões de criptografia pós-quântica finalizados](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Projeto de Criptografia Pós-Quântica do NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Projeto Tachyon](https://tachyon.z.cash/)
- [Especificação do protocolo Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Livro do Halo 2](https://zcash.github.io/halo2/)
