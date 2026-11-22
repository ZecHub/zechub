<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Halo

## TL;DR

Halo é um sistema de prova de conhecimento zero (ZKP) recursivo e sem necessidade de confiança, descoberto por Sean Bowe na Electric Coin Co. Ele elimina a necessidade de uma configuração confiável e torna prática a composição recursiva de provas, que é a base do atual roteiro de escalabilidade e segurança do Zcash.

- **O que é:** uma construção zk-SNARK com recursão eficiente e sem cerimônia de configuração confiável.
- **Por que é importante:** a pool blindada Orchard do Zcash, ativada com o NU5 em 2022, roda no Halo 2, a implementação em produção desta pesquisa.
- **Propriedade principal:** nenhum "lixo tóxico" gerado por cerimônias de configuração, e provas que podem atestar uma quantidade praticamente ilimitada de outras provas.
- **Licenciamento:** o Halo 2 é open source sob as licenças [MIT e Apache 2.0](https://github.com/zcash/halo2#readme), então qualquer pessoa no ecossistema pode desenvolver com base nele.

---

## Explicação principal

Halo é um sistema de prova de conhecimento zero recursivo e sem necessidade de confiança, descoberto por Sean Bowe na Electric Coin Co. Ele elimina a configuração confiável e permite maior escalabilidade da blockchain do Zcash. O Halo foi o primeiro sistema de prova de conhecimento zero que é ao mesmo tempo eficiente e recursivo, amplamente considerado um avanço científico.

![halo](/content-images/_unavailable.svg "halo")

### Os dois componentes

- **Esquema de compromisso polinomial sucinto.** Permite que quem faz o compromisso se comprometa com um polinômio por meio de uma string curta, que pode ser usada por um verificador para confirmar as avaliações alegadas do polinômio comprometido.
- **Prova interativa de oráculo polinomial.** O verificador pede ao provador (um algoritmo) que abra todos os compromissos em pontos de sua escolha, usando o esquema de compromisso polinomial, e verifica se a identidade entre eles é verdadeira.

### Sem configuração confiável

Algumas construções zk-SNARK, como a Groth16, exigem uma configuração confiável para gerar seus parâmetros públicos, frequentemente chamados de string de referência comum (CRS). A CRS é compartilhada com provadores e verificadores; ela não é o segredo que precisa ser destruído. O material intermediário secreto ("lixo tóxico") produzido por essa configuração é que deve ser descartado. Uma computação multipartidária segura pode distribuir essa confiança: a cerimônia é segura se pelo menos um participante seguir o protocolo e destruir sua contribuição secreta. Veja a [explicação sobre parâmetros públicos e lixo tóxico](https://zodl.com/snark-parameters/) da ECC.

As pools blindadas anteriores do Zcash, Sprout e Sapling, usavam sistemas de prova com configuração confiável, BCTV14 e Groth16, respectivamente. Seus parâmetros públicos continuam disponíveis para geração e verificação de provas. A preocupação é se o material secreto da configuração foi retido, o que poderia permitir provas falsas; publicar a própria CRS é esperado e não revela esse material secreto.

O Halo combina a composição recursiva de provas com um esquema de compromisso polinomial baseado em um argumento de produto interno. Seus parâmetros públicos não exigem uma cerimônia de configuração confiável nem a destruição de um alçapão secreto de configuração. O [livro do Halo 2 descreve esses parâmetros públicos de grupo](https://zcash.github.io/halo2/background/pc-ipa.html#setup). Isso é diferente de tornar atualizável uma string de referência estruturada gerada por cerimônia.

Eliminar essa exigência de configuração evita depender da destruição de material secreto de cerimônia para as provas do Halo. Isso não prova que uma cerimônia anterior do Sprout ou do Sapling não foi comprometida, nem certifica que todas as mudanças posteriores no protocolo são seguras. Provas recursivas atestam as computações codificadas em seus circuitos, sob as premissas do sistema de prova. Circuitos e implementações corretos continuam sendo importantes; o [explicativo sobre a implantação do Halo 2](https://zodl.com/technical-explainer-halo-on-zcash/) da ECC menciona explicitamente o risco de novos bugs ou falhas de design.

[Explicativo da Sean Bowe na Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Visual / analogia

### A cadeia de cartórios

Pense em uma zk-SNARK comum como um documento autenticado em cartório: um carimbo, uma verificação, pronto. Agora imagine que você precisa provar que uma pilha de dez mil documentos é autêntica. Sem recursão, um verificador teria que conferir cada carimbo.

O Halo transforma cada documento verificado em um carimbo no *próximo* documento, até que toda a pilha se reduza a um único documento com um único carimbo. Conferir o último documento é suficiente para confiar em toda a cadeia e, o que é crucial, o cartório do Halo (o sistema de prova) fabrica seus próprios carimbos sem nunca precisar de uma autoridade externa para configurar seu selo.

### Por que eliminar a configuração confiável é importante

Nos sistemas antigos com configuração confiável, o "selo" público (a CRS) vinha de uma cerimônia. Os participantes precisavam destruir seu material intermediário secreto, mantendo os parâmetros públicos disponíveis. O Halo evita essa cerimônia e seu alçapão secreto de configuração. Isso não elimina a necessidade de proteger as chaves de gastos dos usuários nem de verificar as premissas e a implementação do sistema de prova.

---

## Aprofundamento

### Provas recursivas

A composição recursiva de provas permite que uma única prova ateste a correção de uma quantidade praticamente ilimitada de outras provas, comprimindo uma grande quantidade de computação (e de informação). Esse é um componente essencial para a escalabilidade, pois permite que a rede escale horizontalmente, enquanto grupos de participantes ainda podem confiar na integridade do restante da rede.

Antes do Halo, alcançar a composição recursiva de provas exigia um grande custo computacional e uma configuração confiável. Uma das principais descobertas foi uma técnica chamada **amortização aninhada**: composição recursiva usando um esquema de compromisso polinomial baseado no argumento de produto interno, melhorando enormemente o desempenho e evitando a configuração confiável.

O [artigo do Halo](https://eprint.iacr.org/2019/1021.pdf) descreve integralmente esse esquema de compromisso polinomial e revelou que existia nele uma nova técnica de agregação. A técnica permite que um grande número de provas criadas de forma independente seja verificado quase tão rapidamente quanto uma única prova. Por si só, isso já oferecia uma alternativa melhor ao zk-SNARKs usado anteriormente no Zcash.

### Halo 2

O Halo 2 é uma implementação zk-SNARK de alto desempenho escrita em Rust, que elimina a necessidade de uma configuração confiável e prepara o terreno para a escalabilidade no Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Ele inclui uma generalização da abordagem chamada **esquema de acumulação**. Essa formalização mostra como a amortização aninhada realmente funciona: adicionando provas a um objeto chamado **acumulador**, em que cada prova raciocina sobre o estado anterior do acumulador, todas as provas anteriores podem ser verificadas (por indução) simplesmente verificando o estado atual do acumulador.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Paralelamente, muitas outras equipes estavam descobrindo IOPs polinomiais mais eficientes que o Sonic (usado no Halo 1), como o Marlin. O mais eficiente desses protocolos é o PLONK, que oferece enorme flexibilidade no projeto de implementações eficientes com base nas necessidades específicas de cada aplicação e proporciona um tempo de prova 5× melhor que o do Sonic.

[Visão geral do PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo no ecossistema mais amplo

A Electric Coin Company firmou um acordo com a Protocol Labs, a Filecoin Foundation e a Ethereum Foundation para explorar P&D do Halo, incluindo como a tecnologia poderia ser usada em suas respectivas redes. O acordo busca oferecer melhor escalabilidade, interoperabilidade e privacidade entre ecossistemas e para a Web 3.0.

Além disso, o Halo 2 está sob as [licenças open source MIT e Apache 2.0](https://github.com/zcash/halo2#readme), o que significa que qualquer pessoa no ecossistema pode desenvolver com esse sistema de prova.

**Filecoin.** Desde sua implantação, a biblioteca halo2 foi adotada em projetos como o zkEVM, e existe a possibilidade de integrar o Halo 2 ao sistema de prova da Filecoin Virtual Machine. O Filecoin exige inúmeras provas de espaço-tempo e provas de replicação dispendiosas; o Halo 2 é fundamental para comprimir o uso de espaço e escalar melhor a rede. [Vídeo da Filecoin Foundation com Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Também beneficiaria ambos os ecossistemas se os pagamentos de armazenamento do Filecoin pudessem ser feitos em ZEC, oferecendo às compras de armazenamento a mesma privacidade que existe nas transferências blindadas do Zcash, incluindo a criptografia de arquivos no armazenamento do Filecoin e o suporte a clientes móveis que anexam mídia a um memorando criptografado do Zcash. [Post no blog ECC × Filecoin](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Está sendo desenvolvida uma prova Halo 2 para uma função de atraso verificável (VDF) eficiente. Uma VDF é uma primitiva criptográfica com muitos casos de uso potenciais, incluindo aleatoriedade de uso geral para contratos inteligentes e eleição de líder em Proof of Stake. A ECC, a Filecoin Foundation, a Protocol Labs e a Ethereum Foundation também estão trabalhando com a [SupraNational](https://www.supranational.net/), um fornecedor especializado em criptografia acelerada por hardware, para um possível desenvolvimento da VDF em GPU e ASIC. O [grupo Privacy and Scaling Explorations](https://appliedzkp.org/) está pesquisando outras formas pelas quais as provas Halo 2 podem melhorar a privacidade e a escalabilidade do Ethereum.

### Outros projetos que usam o Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup): um protocolo de conversão atômica multichain que preserva a privacidade
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2): um zkRollup L2 na Cardano
- [DarkFi](https://dark.fi/book/arch/arch.html): uma blockchain zkEVM L1 privada
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k): um zkRollup L2 no Ethereum

---

## Implicações práticas

**Para o próprio Zcash**

- A pool blindada Orchard, ativada com o NU5, é a implementação desse novo sistema de prova na rede do Zcash. Ela é protegida pelo mesmo design de catraca usado entre Sprout e Sapling, com a intenção de aposentar gradualmente as pools blindadas mais antigas.
- Após o NU5 (meados de 2022), a integração de provas recursivas tornou-se possível, e várias melhorias de privacidade vieram junto, principalmente a introdução das 'Actions', que substituem entradas/saídas e reduzem a quantidade de metadados das transações.
- Eliminar as configurações confiáveis remove um risco sistêmico que, de outra forma, teria que se repetir a cada grande atualização do protocolo.

**Para detentores e operadores**

- A composição recursiva de provas tem o potencial de comprimir quantidades ilimitadas de computação, criar sistemas distribuídos auditáveis e melhorar a capacidade da camada 1 para operadores de nós integrais, algo relevante para extensões como os Zcash Shielded Assets e os designs de longo prazo do Zcash.

---

## Erros comuns

| Crença comum | O que realmente acontece |
| --- | --- |
| "O Halo é uma atualização futura pela qual o Zcash está esperando." | A Orchard, ativa na mainnet desde o NU5 (2022), já roda no Halo 2. |
| "Sem configuração confiável significa sem nenhum parâmetro." | O Halo ainda usa parâmetros públicos. Eles não exigem uma cerimônia em que se precise confiar que os participantes destruirão o material secreto da configuração. |
| "O Halo 2 e o artigo do Halo são a mesma coisa." | O [artigo](https://eprint.iacr.org/2019/1021.pdf) descreve o esquema de compromisso polinomial e a amortização aninhada; o Halo 2 é a implementação Rust em produção, com um esquema de acumulação e aritmetização PLONKish. |
| "A recursão só ajuda a escalar a verificação de blocos." | A recursão também comprime computação no nível da aplicação: veja as provas de espaço-tempo/replicação do Filecoin e o trabalho com VDF para o Ethereum. |

---

## Páginas relacionadas

- [zk-SNARKs](/zcash-tech/zk-snarks): a categoria geral de tecnologia à qual o Halo pertence
- [Halo (artigo de pesquisa)](https://eprint.iacr.org/2019/1021.pdf): a publicação original
- [Ironwood](/zcash-tech/ironwood) e [A catraca](/zcash-tech/the-turnstile): como as pools blindadas migram enquanto as mais antigas são aposentadas
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): uma extensão que se beneficia das provas recursivas
- [Nó integral Zebra](/zcash-tech/zebra-full-node): a implementação de nó que valida as provas on-chain

## Para saber mais

- [Uma introdução a ZKP e ao Halo 2, por Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 com Daira e Str4d, ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Blog explicativo técnico](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Apresentação para a comunidade do Halo 2, Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Documentação**

- [Recursos do Halo 2](https://github.com/mhchia/awesome-halo2)
- [Documentação do Halo 2](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
