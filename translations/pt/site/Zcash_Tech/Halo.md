<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Halo

## Resumo

Halo é um sistema recursivo de provas de conhecimento zero (ZKP) sem necessidade de confiança, descoberto por Sean Bowe na Electric Coin Co. Ele elimina a necessidade de uma configuração confiável e torna prática a composição recursiva de provas, que é a base do atual roteiro de escalabilidade e segurança do Zcash.

- **O que é:** uma construção zk-SNARK com recursão eficiente e sem cerimônia de configuração confiável.
- **Por que é importante:** o pool blindado Orchard do Zcash, ativado com NU5 em 2022, usa o Halo 2 — a implementação de produção desta pesquisa.
- **Propriedade principal:** sem "resíduos tóxicos" de cerimônias de configuração e com provas que podem atestar um número praticamente ilimitado de outras provas.
- **Licenciamento:** o Halo 2 é open source sob as licenças [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), portanto qualquer pessoa no ecossistema pode desenvolver com ele.

---

## Explicação principal

Halo é um sistema recursivo de provas de conhecimento zero sem necessidade de confiança, descoberto por Sean Bowe na Electric Coin Co. Ele elimina a configuração confiável e permite maior escalabilidade da blockchain do Zcash. Halo foi o primeiro sistema de provas de conhecimento zero que é ao mesmo tempo eficiente e recursivo — amplamente considerado um avanço científico.

![halo](/content-images/_unavailable.svg "halo")

### Os dois componentes

- **Esquema sucinto de compromisso polinomial.** Permite que uma pessoa assuma um compromisso com um polinômio usando uma cadeia curta que pode ser utilizada por um verificador para confirmar avaliações declaradas do polinômio comprometido.
- **Prova interativa de oráculo polinomial.** O verificador pede ao provador (um algoritmo) que abra todos os compromissos nos pontos de sua escolha, usando o esquema de compromisso polinomial, e verifica se a identidade se mantém entre eles.

### Sem configuração confiável

zk-SNARKs dependem de uma cadeia de referência comum (CRS) como parâmetro público para provar e verificar. Esta CRS deve ser gerada antecipadamente por uma entidade confiável. Até recentemente, eram necessários elaborados cálculos seguros multipartidários (MPC) — como os realizados pela rede Aztec e pelo Zcash — para mitigar o risco envolvido nesta [cerimônia de configuração confiável](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Os pools blindados anteriores Sprout e Sapling do Zcash usavam os sistemas de prova zk BCTV14 e Groth16. Embora fossem seguros, tinham limitações: não eram escaláveis porque estavam vinculados a uma única aplicação, os "resíduos tóxicos" (restos de material criptográfico gerado durante a cerimônia de gênese) podiam persistir, e havia um elemento de confiança (ainda que mínimo) ao considerar a cerimônia aceitável.

Halo elimina a configuração confiável ao colapsar repetidamente múltiplas instâncias de problemas difíceis ao longo de ciclos de curvas elípticas, para que as provas computacionais possam raciocinar eficientemente sobre si mesmas (amortização aninhada). Um efeito colateral é que a cadeia de referência estruturada (o resultado de uma cerimônia) pode ser atualizada, permitindo aplicações como contratos inteligentes.

Halo oferece aos usuários duas garantias importantes sobre a segurança de um sistema de provas de conhecimento zero em grande escala. Primeiro, permite que os usuários provem que ninguém envolvido na cerimônia de gênese criou uma porta dos fundos secreta para executar transações fraudulentas. Segundo, permite que os usuários demonstrem que o sistema permaneceu seguro ao longo do tempo, mesmo passando por atualizações e mudanças.

[Explicação de Sean Bowe no Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visual / Analogia

### A cadeia de notários

Pense em uma zk-SNARK normal como um documento autenticado: um carimbo, uma verificação, pronto. Agora imagine que você precisa provar que uma pilha de dez mil documentos é autêntica. Sem recursão, um verificador teria que verificar cada carimbo.

Halo transforma cada documento verificado em um carimbo no documento *seguinte*, até que toda a pilha colapse em um único documento com um único carimbo. Verificar o último documento é suficiente para confiar em toda a chain — e, crucialmente, o notário do Halo (o sistema de prova) produz seus próprios carimbos sem nunca precisar de uma autoridade externa para configurar seu selo.

### Por que eliminar a configuração confiável é importante

Nos sistemas mais antigos, o "selo" (a CRS) vinha de uma cerimônia. Os participantes tinham que destruir o material intermediário, e todos tinham que confiar que eles fizeram isso. O selo do Halo é produzido apenas pela matemática: não há nada para destruir, nada para vazar e nenhuma cerimônia em que confiar.

---

## Análise aprofundada

### Provas recursivas

A composição recursiva de provas permite que uma única prova ateste a correção de um número praticamente ilimitado de outras provas, comprimindo uma grande quantidade de computação (e informação). Este é um componente essencial para a escalabilidade, porque permite que a rede escale horizontalmente enquanto grupos de participantes ainda podem confiar na integridade do restante da rede.

Antes do Halo, alcançar a composição recursiva de provas exigia um grande custo computacional e uma configuração confiável. Uma das principais descobertas foi uma técnica chamada **amortização aninhada**: composição recursiva usando um esquema de compromisso polinomial baseado no argumento do produto interno, melhorando muito o desempenho e evitando a configuração confiável.

O artigo [Halo](https://eprint.iacr.org/2019/1021.pdf) descreve integralmente este esquema de compromisso polinomial e descobriu que nele existia uma nova técnica de agregação. A técnica permite que um grande número de provas criadas independentemente seja verificado quase tão rapidamente quanto uma única prova. Por si só, isso já oferecia uma alternativa melhor aos zk-SNARKs anteriores usados no Zcash.

### Halo 2

Halo 2 é uma implementação zk-SNARK de alto desempenho escrita em Rust, que elimina a necessidade de uma configuração confiável e prepara o terreno para a escalabilidade no Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Inclui uma generalização da abordagem chamada **esquema de acumulação**. Esta formalização mostra como a amortização aninhada realmente funciona: ao adicionar provas a um objeto chamado **acumulador**, em que cada prova raciocina sobre o estado anterior do acumulador, todas as provas anteriores podem ser verificadas (por indução) simplesmente verificando o estado atual do acumulador.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Em paralelo, muitas outras equipes estavam descobrindo IOPs polinomiais mais eficientes do que Sonic (usado no Halo 1), como Marlin. O mais eficiente desses protocolos é PLONK, que concede enorme flexibilidade na criação de implementações eficientes com base em necessidades específicas da aplicação e proporciona um tempo de provador 5× melhor do que Sonic.

[Visão geral do PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo no ecossistema mais amplo

A Electric Coin Company celebrou um acordo com Protocol Labs, a Filecoin Foundation e a Ethereum Foundation para explorar P&D de Halo, incluindo como a tecnologia poderia ser usada em suas respectivas redes. O acordo visa proporcionar melhor escalabilidade, interoperabilidade e privacidade entre ecossistemas e para a Web 3.0.

Além disso, o Halo 2 está sob as licenças open source [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), o que significa que qualquer pessoa no ecossistema pode desenvolver com o sistema de prova.

**Filecoin.** Desde sua implementação, a biblioteca halo2 foi adotada em projetos como a zkEVM, e há potencial para integração do Halo 2 ao sistema de provas da Máquina Virtual Filecoin. Filecoin requer numerosas provas dispendiosas de espaço-tempo e provas de replicação; o Halo 2 é fundamental para comprimir o uso de espaço e escalar melhor a rede. [Vídeo da Filecoin Foundation com Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Ambos os ecossistemas também se beneficiariam se os pagamentos de armazenamento do Filecoin pudessem ser feitos em ZEC, proporcionando a mesma privacidade para compras de armazenamento que existe nas transferências blindadas do Zcash — incluindo a criptografia de arquivos no armazenamento Filecoin e o suporte a clientes móveis que anexam mídia a um memorando criptografado do Zcash. [Post do blog ECC × Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Está sendo desenvolvida uma prova Halo 2 para uma Função de Atraso Verificável (VDF) eficiente. Uma VDF é uma primitiva criptográfica com muitos casos de uso potenciais, incluindo aleatoriedade de uso geral para contratos inteligentes e eleição de líderes em Proof of Stake. ECC, a Filecoin Foundation, Protocol Labs e a Ethereum Foundation também estão trabalhando com a [SupraNational](https://www.supranational.net/), uma fornecedora especializada em criptografia acelerada por hardware, para o potencial desenvolvimento da VDF em GPU e ASIC. O grupo [Privacy and Scaling Explorations](https://appliedzkp.org/) está pesquisando formas adicionais pelas quais as provas Halo 2 podem melhorar a privacidade e a escalabilidade do Ethereum.

### Outros projetos que usam Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — um protocolo de conversões atômicas multichain que preserva a privacidade
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — um zkRollup L2 no Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html) — uma blockchain zkEVM L1 privada
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — um zkRollup L2 no Ethereum

---

## Implicações práticas

**Para o próprio Zcash**

- O pool blindado Orchard, ativado com NU5, é a implementação deste novo sistema de prova na rede do Zcash. Ele é protegido pelo mesmo desenho de catraca usado entre Sprout e Sapling, com a intenção de desativar gradualmente os pools blindados mais antigos.
- Após NU5 (meados de 2022), a integração de provas recursivas tornou-se possível, acompanhada por várias melhorias de privacidade — mais notavelmente a introdução de 'Actions' em substituição a entradas/saídas, o que reduz a quantidade de metadados das transações.
- Eliminar configurações confiáveis elimina um risco sistêmico que, de outro modo, teria que ser repetido em cada grande atualização de protocolo.

**Para detentores e operadores**

- A composição recursiva de provas tem potencial para comprimir quantidades ilimitadas de computação, criar sistemas distribuídos auditáveis e melhorar a capacidade da Camada 1 para operadores de nós integrais — relevante para extensões como Zcash Shielded Assets e os projetos de longo prazo do Zcash.

---

## Erros comuns

| Crença comum | O que realmente acontece |
| --- | --- |
| "Halo é uma futura atualização pela qual o Zcash está esperando." | Orchard, ativo na mainnet desde NU5 (2022), já funciona com Halo 2. |
| "Sem configuração confiável significa não haver quaisquer parâmetros." | Halo continua a usar parâmetros estruturados; a diferença é que eles não contêm resíduos tóxicos e podem ser gerados e atualizados sem uma cerimônia em que os participantes tenham que confiar. |
| "Halo 2 e o artigo Halo são a mesma coisa." | O [artigo](https://eprint.iacr.org/2019/1021.pdf) descreve o esquema de compromisso polinomial e a amortização aninhada; Halo 2 é a implementação Rust de produção com um esquema de acumulação e aritmetização PLONKish. |
| "A recursão apenas ajuda a escalar a verificação de blocos." | A recursão também comprime a computação no nível da aplicação — consulte as provas de espaço-tempo/replicação do Filecoin e o trabalho de VDF para Ethereum. |

---

## Páginas relacionadas

- [zk-SNARKs](/zcash-tech/zk-snarks) — a categoria geral de tecnologia à qual Halo pertence
- [Halo (artigo de pesquisa)](https://eprint.iacr.org/2019/1021.pdf) — a publicação original
- [Ironwood](/zcash-tech/ironwood) e [A catraca](/zcash-tech/the-turnstile) — como os pools blindados migram enquanto os mais antigos são desativados
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — uma extensão que se beneficia de provas recursivas
- [Zebra Nó integral](/zcash-tech/zebra-full-node) — a implementação de nó que valida provas na chain

## Aprendizagem adicional

- [Uma introdução a ZKP e Halo 2 — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 com Daira e Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blog explicativo técnico](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentação**

- [Recursos do Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentação do Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
