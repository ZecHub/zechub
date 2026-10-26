<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Halo

## Resumo

Halo é um sistema de provas de conhecimento zero (ZKP) recursivo e sem necessidade de confiança, descoberto por Sean Bowe em Electric Coin Co. Elimina a necessidade de uma configuração de confiança e torna prática a composição recursiva de provas, que é a base do atual roteiro de escalabilidade e segurança de Zcash.

- **O que é:** uma construção zk-SNARK com recursão eficiente e sem cerimónia de configuração de confiança.
- **Porque é importante:** o pool blindado Orchard de Zcash, ativado com NU5 em 2022, utiliza Halo 2 — a implementação de produção desta investigação.
- **Propriedade principal:** sem "resíduos tóxicos" de cerimónias de configuração e com provas que podem atestar um número praticamente ilimitado de outras provas.
- **Licenciamento:** Halo 2 é open source sob as licenças [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), pelo que qualquer pessoa no ecossistema pode desenvolver sobre ele.

---

## Explicação principal

Halo é um sistema de provas de conhecimento zero recursivo e sem necessidade de confiança, descoberto por Sean Bowe em Electric Coin Co. Elimina a configuração de confiança e permite uma maior escalabilidade da blockchain Zcash. Halo foi o primeiro sistema de provas de conhecimento zero simultaneamente eficiente e recursivo — amplamente considerado um avanço científico.

![halo](/content-images/_unavailable.svg "halo")

### Os dois componentes

- **Esquema sucinto de compromisso polinomial.** Permite que quem faz o compromisso se comprometa com um polinómio através de uma cadeia curta que pode ser usada por um verificador para confirmar avaliações declaradas do polinómio comprometido.
- **Prova interativa de oráculo polinomial.** O verificador pede ao provador (um algoritmo) para abrir todos os compromissos em pontos à sua escolha, utilizando o esquema de compromisso polinomial, e verifica se a identidade se mantém entre eles.

### Sem configuração de confiança

zk-SNARKs dependem de uma cadeia de referência comum (CRS) como parâmetro público para provar e verificar. Esta CRS tem de ser gerada antecipadamente por uma entidade de confiança. Até recentemente, eram necessários elaborados cálculos seguros multipartidários (MPC) — como os realizados pela rede Aztec e por Zcash — para mitigar o risco envolvido nesta [cerimónia de configuração de confiança](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Os anteriores pools blindados Sprout e Sapling de Zcash utilizavam os sistemas de prova zk BCTV14 e Groth16. Embora fossem seguros, tinham limitações: não eram escaláveis porque estavam associados a uma única aplicação, os "resíduos tóxicos" (restos de material criptográfico gerado durante a cerimónia de génese) podiam persistir, e existia um elemento de confiança (ainda que mínimo) ao considerar a cerimónia aceitável.

Halo elimina a configuração de confiança ao colapsar repetidamente múltiplas instâncias de problemas difíceis em conjunto ao longo de ciclos de curvas elípticas, para que as provas computacionais possam raciocinar eficientemente sobre si próprias (amortização aninhada). Um efeito secundário é que a cadeia de referência estruturada (o resultado de uma cerimónia) passa a poder ser atualizada, permitindo aplicações como contratos inteligentes.

Halo oferece aos utilizadores duas garantias importantes sobre a segurança de um sistema de provas de conhecimento zero em grande escala. Primeiro, permite aos utilizadores provar que ninguém envolvido na cerimónia de génese criou uma porta traseira secreta para executar transações fraudulentas. Segundo, permite aos utilizadores demonstrar que o sistema se manteve seguro ao longo do tempo, mesmo tendo sido sujeito a atualizações e alterações.

[Sean BoweExplicação do Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visual / Analogia

### A cadeia de notários

Pense numa zk-SNARK normal como um documento autenticado: um carimbo, uma verificação, concluído. Agora imagine que precisa de provar que uma pilha de dez mil documentos é autêntica. Sem recursão, um verificador teria de verificar cada carimbo.

Halo transforma cada documento verificado num carimbo no documento *seguinte*, até que toda a pilha colapse num único documento com um único carimbo. Verificar o último documento é suficiente para confiar em toda a cadeia — e, crucialmente, o notário de Halo (o sistema de prova) produz os seus próprios carimbos sem nunca necessitar de uma autoridade externa para configurar o seu selo.

### Porque é importante eliminar a configuração de confiança

Nos sistemas mais antigos, o "selo" (a CRS) provinha de uma cerimónia. Os participantes tinham de destruir o material intermédio e todos tinham de confiar que o tinham feito. O selo de Halo é produzido apenas pela matemática: não há nada a destruir, nada a divulgar e nenhuma cerimónia em que confiar.

---

## Análise aprofundada

### Provas recursivas

A composição recursiva de provas permite que uma única prova ateste a correção de um número praticamente ilimitado de outras provas, comprimindo uma grande quantidade de computação (e informação). Este é um componente essencial para a escalabilidade, porque permite que a rede escale horizontalmente enquanto grupos de participantes ainda podem confiar na integridade do restante da rede.

Antes de Halo, obter composição recursiva de provas exigia um grande custo computacional e uma configuração de confiança. Uma das principais descobertas foi uma técnica chamada **amortização aninhada**: composição recursiva usando um esquema de compromisso polinomial baseado no argumento do produto interno, melhorando massivamente o desempenho e evitando simultaneamente a configuração de confiança.

O artigo [Halo](https://eprint.iacr.org/2019/1021.pdf) descreve integralmente este esquema de compromisso polinomial e descobriu que nele existia uma nova técnica de agregação. A técnica permite que um grande número de provas criadas independentemente seja verificado quase tão depressa como uma única prova. Por si só, isso já oferecia uma alternativa melhor ao zk-SNARKs anterior utilizado em Zcash.

### Halo 2

Halo 2 é uma implementação zk-SNARK de elevado desempenho escrita em Rust, que elimina a necessidade de uma configuração de confiança e prepara o terreno para a escalabilidade em Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Inclui uma generalização da abordagem chamada **esquema de acumulação**. Esta formalização mostra como a amortização aninhada funciona realmente: ao adicionar provas a um objeto chamado **acumulador**, em que cada prova raciocina sobre o estado anterior do acumulador, todas as provas anteriores podem ser verificadas (por indução) simplesmente verificando o estado atual do acumulador.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Em paralelo, muitas outras equipas estavam a descobrir IOPs polinomiais mais eficientes do que Sonic (utilizado em Halo 1), como Marlin. O mais eficiente destes protocolos é PLONK, que concede enorme flexibilidade na criação de implementações eficientes com base em necessidades específicas da aplicação e proporciona um tempo de provador 5× melhor do que Sonic.

[Visão geral de PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo no ecossistema mais amplo

Electric Coin Company celebrou um acordo com Protocol Labs, a Fundação Filecoin e a Ethereum Foundation para explorar I&D de Halo, incluindo como a tecnologia poderia ser utilizada nas respetivas redes. O acordo visa proporcionar melhor escalabilidade, interoperabilidade e privacidade entre ecossistemas e para a Web 3.0.

Além disso, Halo 2 está sob as licenças open source [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), o que significa que qualquer pessoa no ecossistema pode desenvolver com o sistema de prova.

**Filecoin.** Desde a sua implementação, a biblioteca halo2 foi adotada em projetos como a zkEVM, e existe potencial para integração de Halo 2 no sistema de provas da Máquina Virtual Filecoin. Filecoin requer numerosas provas dispendiosas de espaço-tempo e provas de replicação; Halo 2 é fundamental para comprimir a utilização de espaço e escalar melhor a rede. [FilecoinVídeo da Fundação com Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Ambos os ecossistemas também beneficiariam se os pagamentos de armazenamento Filecoin pudessem ser efetuados em ZEC, proporcionando a mesma privacidade para compras de armazenamento que existe nas transferências blindadas Zcash — incluindo a encriptação de ficheiros no armazenamento Filecoin e o suporte a clientes móveis que anexam multimédia a uma nota encriptada Zcash. [ECC × publicação de blogue Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Está a ser desenvolvida uma prova Halo 2 para uma Função de Atraso Verificável (VDF) eficiente. Uma VDF é uma primitiva criptográfica com muitos potenciais casos de utilização, incluindo aleatoriedade de uso geral para contratos inteligentes e eleição de líderes em Proof of Stake. ECC, a Fundação Filecoin, Protocol Labs e a Ethereum Foundation também estão a trabalhar com [SupraNational](https://www.supranational.net/), um fornecedor especializado em criptografia acelerada por hardware, para potencial desenvolvimento por GPU e ASIC da VDF. O grupo [Privacy and Scaling Explorations](https://appliedzkp.org/) está a investigar formas adicionais pelas quais as provas Halo 2 podem melhorar a privacidade e a escalabilidade do Ethereum.

### Outros projetos que utilizam Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — um protocolo de swaps atómicos multichain que preserva a privacidade
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — um zkRollup L2 em Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — uma blockchain zkEVM L1 privada
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — um zkRollup L2 em Ethereum

---

## Implicações práticas

**Para o próprio Zcash**

- O pool blindado Orchard, ativado com NU5, é a implementação deste novo sistema de prova na rede Zcash. É protegido pelo mesmo desenho de catraca utilizado entre Sprout e Sapling, com a intenção de retirar gradualmente os pools blindados mais antigos.
- Após NU5 (meados de 2022), a integração de provas recursivas tornou-se possível, acompanhada por várias melhorias de privacidade — mais notavelmente a introdução de 'Actions' em substituição de entradas/saídas, o que reduz a quantidade de metadados das transações.
- Eliminar configurações de confiança elimina um risco sistémico que, de outro modo, teria de ser repetido em cada grande atualização de protocolo.

**Para detentores e operadores**

- A composição recursiva de provas tem potencial para comprimir quantidades ilimitadas de computação, criar sistemas distribuídos auditáveis e melhorar a capacidade da Camada 1 para operadores de nós completos — relevante para extensões como Zcash Shielded Assets e os projetos de mais longo prazo de Zcash.

---

## Erros comuns

| Crença comum | Qual é realmente o caso |
| --- | --- |
| "Halo é uma futura atualização pela qual Zcash está à espera." | Orchard, ativo na mainnet desde NU5 (2022), já funciona com Halo 2. |
| "Sem configuração de confiança significa não haver quaisquer parâmetros." | Halo continua a utilizar parâmetros estruturados; a diferença é que não contêm resíduos tóxicos e podem ser gerados e atualizados sem uma cerimónia em que os participantes tenham de confiar. |
| "Halo 2 e o artigo Halo são a mesma coisa." | O [artigo](https://eprint.iacr.org/2019/1021.pdf) descreve o esquema de compromisso polinomial e a amortização aninhada; Halo 2 é a implementação Rust de produção com um esquema de acumulação e aritmetização PLONKish. |
| "A recursão apenas ajuda a escalar a verificação de blocos." | A recursão também comprime a computação ao nível da aplicação — consulte as provas de espaço-tempo/replicação de Filecoin e o trabalho de VDF para Ethereum. |

---

## Páginas relacionadas

- [zk-SNARKs](/zcash-tech/zk-snarks) — a categoria geral de tecnologia a que Halo pertence
- [Halo (artigo de investigação)](https://eprint.iacr.org/2019/1021.pdf) — a publicação original
- [Ironwood](/zcash-tech/ironwood) e [A catraca](/zcash-tech/the-turnstile) — como os pools blindados migram enquanto os mais antigos são retirados
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — uma extensão que beneficia de provas recursivas
- [Zebra Nó completo](/zcash-tech/zebra-full-node) — a implementação de nó que valida provas na cadeia

## Aprendizagem adicional

- [Uma introdução a ZKP e Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 com Daira e Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blog explicativo técnico](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentação**

- [Recursos de Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentação de Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
