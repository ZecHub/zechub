# Halo


## O que é Halo?

Halo é uma zero-knowledge proof (ZKP) descoberta por Sean Bowe na Electric Coin Co. Ele elimina a Trusted Setup e permite maior escalabilidade da blockchain Zcash. Halo foi o primeiro sistema zero-knowledge proof que é eficiente e recursivo amplamente considerado como um avanço científico.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Componentes**

Succinct Polynomial Commitment Scheme: permite que um colaborador se comprometa com um polinômio com uma string curta que pode ser usada por um verificador para confirmar as avaliações reivindicadas do polinômio confirmado.

Polynomial Interactive Oracle Proof: O verificador pede ao provador (algoritmo) para abrir todos os compromissos em vários pontos de sua escolha usando o esquema de compromisso polinomial e verifica se a identidade é verdadeira entre eles.


### No Trusted Setup

zkSNARKs dependem de uma string de referência comum (CRS) como um parâmetro público para provar e verificar. Este CRS deve ser gerado antecipadamente por uma parte confiável. Até recentemente, era necessário elaborar cálculos multipartidários seguros (MPC) como aqueles executados pela rede Aztec e Zcash para mitigar o risco envolvido durante a [Trusted Setup ceremony](https://zkproof.org/2021/06/30/setup-cerimônias/amp/).

Anteriormente, as pools blindadas Sprout & Sapling da Zcash utilizavam os sistemas BCTV14 & Groth 16 zk-proving. Embora estes fossem seguros, havia limitações. Eles não eram escaláveis, pois estavam vinculados a um único aplicativo, o "resíduo tóxico" (restos de material criptográfico gerado durante a cerimônia de gênese) poderia persistir e havia um elemento de confiança (embora mínimo) para os usuários considerarem a cerimônia aceitável .

Ao agrupar repetidamente várias instâncias de problemas difíceis em ciclos de curvas elípticas, de modo que as provas computacionais possam ser usadas para raciocinar sobre si mesmas com eficiência (amortização aninhada), a necessidade de um Trusted Setup é eliminada. Isso também significa que a string de referência estruturada (saída da cerimônia) pode ser atualizada, permitindo aplicativos como contratos inteligentes.

O Halo fornece aos usuários duas garantias importantes em relação à segurança do sistema zero-knowledge proof em larga escala. Em primeiro lugar, permite que os usuários provem que ninguém que esteve envolvido na cerimônia de gênese criou um backdoor secreto para executar transações fraudulentas. Em segundo lugar, permite que os usuários demonstrem que o sistema permaneceu seguro ao longo do tempo, mesmo com atualizações e alterações.

[Explicador de Sean Bowes no Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)
 


### Recursive Proofs

A composição de Recursive Proofs permite que uma única prova ateste a correção de outras provas praticamente ilimitadas, permitindo que uma grande quantidade de computação (e informação) seja comprimida. Este é um componente essencial para a escalabilidade, até porque nos permite dimensionar horizontalmente a rede enquanto ainda permite que bolsões de participantes confiem na integridade do restante da rede.

Antes do Halo, obter composição de Recursive Proofs exigia grandes despesas computacionais e uma Trusted Setup. Uma das principais descobertas foi uma técnica chamada “nested amortization”. Essa técnica permite a composição recursiva usando o esquema de compromisso polinomial baseado no argumento do produto interno, melhorando massivamente o desempenho e evitando a Trusted setup.

No [documento Halo](https://eprint.iacr.org/2019/1021.pdf), descrevemos completamente esse esquema de compromisso polinomial e descobrimos que existia uma nova técnica de agregação nele. A técnica permite que um grande número de provas criadas independentemente sejam verificadas quase tão rapidamente quanto a verificação de uma única prova. Isso por si só ofereceria uma alternativa melhor aos zk-SNARKs anteriores usados ​​na Zcash.


### Halo 2

Halo 2 é uma implementação zk-SNARK de alto desempenho escrita em Rust que elimina a necessidade de um Trusted Setup enquanto prepara o cenário para escalabilidade em Zcash.

![halo2image](https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg "halo2")

Ele inclui uma generalização de nossa abordagem chamada de “esquema de acumulação”. Essa nova formalização expõe como nossa técnica de amortização aninhada realmente funciona; adicionando provas a um objeto chamado “acumulador”, onde as provas raciocinam sobre o estado anterior do acumulador, podemos verificar se todas as provas anteriores estavam corretas (por indução) simplesmente verificando o estado atual do acumulador.

![Accumulatorimage](https://i.imgur.com/l4HrYgE.png "acumulador")

Paralelamente, muitas outras equipes foram descobrindo novos IOPs polinomiais que eram mais eficientes que o Sonic (usado no Halo 1), como o Marlin.

O mais eficiente desses novos protocolos é o PLONK, que concede enorme flexibilidade no design de implementações eficientes com base nas necessidades específicas do aplicativo e fornece tempo de prova 5x melhor do Sonic.

[Visão geral do PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Como isso beneficia a Zcash?

A Pool Orchard Blindada ativado com NU5 & é a implementação deste novo sistema de prova na Rede Zcash. Protegido pelo mesmo design de catraca usado entre Sprout e Sapling com a intenção de retirar gradualmente as Pools blindadas mais antigas. Isso incentiva a migração para um sistema de prova totalmente confiável, reforçando a confiança na solidez da base monetária e reduzindo a complexidade da implementação e a superfície de ataque da Zcash em geral. Após a ativação do NU5 em meados de 2022, a integração de Recursive Proofs tornou-se possível (embora isso não esteja completo). Vários aprimoramentos de privacidade também foram feitos tangencialmente. A introdução de 'Ações' para substituir entradas/saídas ajudou a reduzir a quantidade de metadados da transação.

Os Trusted Setup ​​geralmente são difíceis de coordenar e apresentam um risco sistêmico. Seria necessário repeti-los para cada grande atualização de protocolo. Removê-los apresenta uma melhoria substancial para a implementação segura de novas atualizações de protocolo.

A composição Recursive Proofs tem o potencial de comprimir quantidades ilimitadas de computação, criando sistemas distribuídos auditáveis, tornando o Zcash altamente capaz, especialmente com a mudança para Proof of Stake. Isso também é útil para extensões como Zcash Shielded Assets e para melhorar a capacidade da Camada 1 na extremidade superior do uso de nó completo nos próximos anos para Zcash.


## Halo no ecossistema mais amplo

A Electric Coin Company firmou um acordo com o Protocol Labs, a Filecoin Foundation e a Ethereum Foundation para explorar o Halo R&D, incluindo como a tecnologia pode ser usada em suas respectivas redes. O acordo visa fornecer melhor escalabilidade, interoperabilidade e privacidade entre os ecossistemas e para a Web 3.0.

Além disso, o Halo 2 está sob as [licenças de código aberto MIT e Apache 2.0](https://github.com/zcash/halo2#readme), o que significa que qualquer pessoa no ecossistema pode construir com o sistema de teste.

### Filecoin

Desde a sua implantação, a biblioteca halo2 foi adotada em projetos como o zkEVM, há potencial de integração do Halo 2 no sistema de prova para a máquina virtual Filecoin. Filecoin requer inúmeras provas caras de espaço-tempo/provas de replicação. O Halo2 será fundamental na compactação do uso do espaço, dimensionando melhor a rede.

[Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Além disso, seria altamente benéfico para os ecossistemas Filecoin e Zcash se os pagamentos de armazenamento Filecoin pudessem ser feitos na ZEC, proporcionando o mesmo nível de privacidade para compras de armazenamento que existe nas transferências blindadas Zcash. Esse suporte adicionaria a capacidade de criptografar arquivos no armazenamento Filecoin e adicionar suporte a clientes móveis para que eles pudessem “anexar” mídia ou arquivos a um memorando criptografado Zcash.

[Postagem do blog ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementação de uma prova de Halo 2 para a eficiente função de atraso verificável (VDF) que está sendo desenvolvida. Um VDF é um primitivo criptográfico que tem muitos casos de uso em potencial.

Ele pode ser usado como uma fonte de aleatoriedade de propósito geral, incluindo o uso em aplicativos de contrato inteligente, bem como eleição de líder em Proof of Stake no Ethereum e outros protocolos.

A ECC, a Filecoin Foundation, a Protocol Labs e a Ethereum Foundation também trabalharão com a [SupraNational](https://www.supranational.net/), um fornecedor especializado em criptografia acelerada por hardware, para possíveis projetos de GPU e ASIC e desenvolvimento do VDF.

O [grupo de exploração de privacidade e escala](https://appliedzkp.org/) também está pesquisando diferentes maneiras pelas quais as provas do Halo 2 podem melhorar a privacidade e a escalabilidade do ecossistema Ethereum. Este grupo se estende até a fundação Ethereum e tem um amplo foco em provas de conhecimento zero e primitivas criptográficas.

## Outros projetos usando Halo

+ [Anoma, um protocolo de troca atômica multicadeia que preserva a privacidade](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, um L2 zkRollup no Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, uma blockchain privada L1 zkEVM](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, um L2 zkRollup no Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Aprendizagem Adicional**:

[Uma introdução ao zkp e halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 com Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blog do Explicador Técnico](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Halo 2 Community Showcase - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentação**

[Recursos do Halo 2](https://github.com/adria0/awesome-halo2)

[documentos do Halo 2](https://zcash.github.io/halo2/)

[Halo 2 github](https://github.com/zcash/halo2)


