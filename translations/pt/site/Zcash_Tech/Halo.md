<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Halo


## O que é Halo?

Halo é uma prova de conhecimento zero (ZKP) recursiva e sem confiança descoberta por Sean Bowe na Electric Coin Co. Ela elimina a configuração confiável e permite maior escalabilidade da blockchain Zcash. Halo foi o primeiro sistema de prova de conhecimento zero que é ao mesmo tempo eficiente e recursivo, amplamente considerado um avanço científico.

![halo](https://electriccoin.co/wp-content/uploads/2021/01/Halo-on-Z-1440x720.png "halo")


**Componentes**

Esquema sucinto de compromisso polinomial: permite que um compromitente se comprometa com um polinômio por meio de uma string curta que pode ser usada por um verificador para confirmar avaliações reivindicadas do polinômio comprometido.

Prova interativa de oráculo polinomial: o verificador pede ao provador (algoritmo) para abrir todos os compromissos em vários pontos de sua escolha usando o esquema de compromisso polinomial e verifica se a identidade se mantém verdadeira entre eles. 


### Sem configuração confiável

zkSNARKs dependem de uma common reference string (CRS) como parâmetro público para provar e verificar. Essa CRS deve ser gerada antecipadamente por uma parte confiável. Até recentemente, computações multipartidárias seguras (MPC) elaboradas, como as realizadas pela rede Aztec e pela Zcash, eram necessárias para mitigar o risco envolvido durante essa [cerimônia de configuração confiável](https://zkproof.org/2021/06/30/setup-ceremonies/amp/). 

Anteriormente, os pools blindados Sprout e Sapling da Zcash utilizavam os sistemas de zk-proving BCTV14 e Groth 16. Embora fossem seguros, havia limitações. Eles não eram escaláveis, pois estavam vinculados a uma única aplicação, o "lixo tóxico" (remanescente do material criptográfico gerado durante a cerimônia gênese) poderia persistir, e havia um elemento de confiança (ainda que mínimo) para que os usuários considerassem a cerimônia aceitável.

Ao colapsar repetidamente múltiplas instâncias de problemas difíceis em conjunto ao longo de ciclos de curvas elípticas, de modo que provas computacionais possam ser usadas para raciocinar eficientemente sobre si mesmas (amortização aninhada), a necessidade de uma configuração confiável é eliminada. Isso também significa que a structured reference string (saída da cerimônia) é atualizável, permitindo aplicações como contratos inteligentes.

Halo fornece aos usuários duas garantias importantes em relação à segurança do sistema de prova de conhecimento zero em larga escala. Primeiro, permite que os usuários provem que ninguém envolvido na cerimônia gênese criou uma porta dos fundos secreta para executar transações fraudulentas. Segundo, permite que os usuários demonstrem que o sistema permaneceu seguro ao longo do tempo, mesmo tendo passado por atualizações e mudanças.

[Explicação de Sean Bowe no Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo) 
 


### Provas recursivas

A composição recursiva de provas permite que uma única prova ateste a correção de uma quantidade praticamente ilimitada de outras provas, permitindo que uma grande quantidade de computação (e informação) seja comprimida. Esse é um componente essencial para a escalabilidade, não menos importante porque nos permite escalar a rede horizontalmente enquanto ainda permite que grupos de participantes confiem na integridade do restante da rede.

Antes de Halo, alcançar a composição recursiva de provas exigia grande custo computacional e uma configuração confiável. Uma das principais descobertas foi uma técnica chamada **amortização aninhada**. Essa técnica permite composição recursiva usando o esquema de compromisso polinomial baseado em argumento de produto interno, melhorando massivamente o desempenho e evitando a configuração confiável.

No [artigo de Halo](https://eprint.iacr.org/2019/1021.pdf), descrevemos completamente esse esquema de compromisso polinomial e descobrimos que nele existia uma nova técnica de agregação. A técnica permite que um grande número de provas criadas independentemente seja verificado quase tão rapidamente quanto a verificação de uma única prova. Só isso já ofereceria uma alternativa melhor aos zk-SNARKs anteriores usados na Zcash.


### Halo 2

Halo 2 é uma implementação zk-SNARK de alto desempenho escrita em Rust que elimina a necessidade de uma configuração confiável, ao mesmo tempo em que prepara o caminho para a escalabilidade na Zcash. 

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="" width="500" height="300"/>
</a>

Ela inclui uma generalização da nossa abordagem chamada **esquema de acumulação**. Essa nova formalização expõe como nossa técnica de amortização aninhada realmente funciona; ao adicionar provas a um objeto chamado **acumulador,** em que as provas raciocinam sobre o estado anterior do acumulador, podemos verificar que todas as provas anteriores estavam corretas (por indução) simplesmente verificando o estado atual do acumulador.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="" width="500" height="300"/>
</a>



Em paralelo, muitas outras equipes estavam descobrindo novos Polynomial IOPs mais eficientes do que Sonic (usado no Halo 1), como Marlin. 

O mais eficiente desses novos protocolos é PLONK, que oferece enorme flexibilidade para projetar implementações eficientes com base em necessidades específicas de aplicação e proporciona um tempo de prova 5x melhor do que Sonic.

[Visão geral de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)


### Como isso beneficia a Zcash?

O pool blindado Orchard foi ativado com NU5 e é a implementação desse novo sistema de prova na rede Zcash. Protegido pelo mesmo desenho de catraca usado entre Sprout e Sapling, com a intenção de aposentar gradualmente os pools blindados mais antigos. Isso incentiva a migração para um sistema de prova totalmente sem confiança, reforçando a confiança na solidez da base monetária e reduzindo a complexidade de implementação e a superfície de ataque da Zcash como um todo. Após a ativação do NU5 em meados de 2022, a integração de provas recursivas tornou-se possível (embora isso ainda não esteja completo). Vários aprimoramentos de privacidade também foram feitos tangencialmente. A introdução de 'Actions' para substituir entradas/saídas ajudou a reduzir a quantidade de metadados de transação. 

Configurações confiáveis geralmente são difíceis de coordenar e apresentavam um risco sistêmico. Seria necessário repeti-las a cada grande atualização do protocolo. Removê-las representa uma melhoria substancial para implementar com segurança novas atualizações do protocolo. 

A composição recursiva de provas tem o potencial de comprimir quantidades ilimitadas de computação, criando sistemas distribuídos auditáveis e tornando a Zcash altamente capaz, particularmente com a mudança para Proof of Stake. Isso também é útil para extensões como Zcash Shielded Assets e para melhorar a capacidade da Camada 1 na faixa mais alta de uso de nós completos nos próximos anos para a Zcash.


## Halo no ecossistema mais amplo 

A Electric Coin Company firmou um acordo com Protocol Labs, a Filecoin Foundation e a Ethereum Foundation para explorar P&D de Halo, incluindo como a tecnologia pode ser usada em suas respectivas redes. O acordo visa proporcionar melhor escalabilidade, interoperabilidade e privacidade entre ecossistemas e para a Web 3.0.

Além disso, Halo 2 está sob as [licenças open-source MIT e Apache 2.0](https://github.com/zcash/halo2#readme), o que significa que qualquer pessoa no ecossistema pode construir com o sistema de provas.

### Filecoin

Desde sua implantação, a biblioteca halo2 foi adotada em projetos como o zkEVM, e há potencial integração de Halo 2 ao sistema de provas da Filecoin Virtual Machine. A Filecoin exige numerosas e custosas proofs of spacetime / proofs of replication. Halo2 será fundamental para comprimir o uso de espaço e escalar melhor a rede.

[Vídeo da Filecoin Foundation com Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Além disso, seria altamente benéfico para os ecossistemas Filecoin e Zcash se os pagamentos de armazenamento da Filecoin pudessem ser feitos em ZEC, oferecendo o mesmo nível de privacidade para compras de armazenamento que existe nas transferências blindadas da Zcash. Esse suporte acrescentaria a capacidade de criptografar arquivos no armazenamento da Filecoin e adicionar suporte a clientes móveis para que eles pudessem **anexar** mídia ou arquivos a um memo criptografado da Zcash. 

[Post do blog ECC x Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Implementação de uma prova Halo 2 para a Verifiable Delay Function (VDF) eficiente está em desenvolvimento. Uma VDF é uma primitiva criptográfica que tem muitos casos de uso potenciais. 

Ela pode ser usada como uma fonte de aleatoriedade de uso geral, inclusive em aplicações de contratos inteligentes, bem como para eleição de líderes em Proof of Stake na Ethereum e em outros protocolos.

ECC, a Filecoin Foundation, Protocol Labs e a Ethereum Foundation também trabalharão com a [SupraNational](https://www.supranational.net/), uma fornecedora especializada em criptografia acelerada por hardware, para possível design de GPU e ASIC e desenvolvimento da VDF.

O grupo [Privacy and Scaling Exploration](https://appliedzkp.org/) também está pesquisando diferentes formas pelas quais provas Halo 2 podem melhorar a privacidade e a escalabilidade do ecossistema Ethereum. Esse grupo está ligado à Ethereum Foundation e tem um foco amplo em provas de conhecimento zero e primitivas criptográficas. 

## Outros projetos que usam Halo

+ [Anoma, um protocolo multichain de atomic swap com preservação de privacidade](https://anoma.net/blog/an-introduction-to-zk-snark-plonkup)

+ [Oribis, um zkRollup L2 na Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)

+ [Darkfi, uma blockchain zkEVM L1 privada](https://darkrenaissance.github.io/darkfi/architecture/architecture.html)

+ [Scroll, um zkRollup L2 na Ethereum](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k)


**Aprendizado adicional**:

[Uma introdução a zkp e halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)

[Halo 2 com Daira e Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)

[Blog técnico explicativo](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)

[Mostra da comunidade Halo 2 - Ying Tong @Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentação**

[Recursos de Halo 2](https://github.com/adria0/awesome-halo2)

[Docs de Halo 2](https://zcash.github.io/halo2/)

[GitHub de Halo 2](https://github.com/zcash/halo2)
