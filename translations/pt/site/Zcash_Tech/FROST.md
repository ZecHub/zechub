<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Resumo

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) é um protocolo de assinatura de limiar e de geração distribuída de chaves: vários signatários detêm, cada um, uma parte de uma chave privada comum, e um número mínimo deles, o limiar, precisa cooperar para produzir uma única assinatura.
* Como o resultado é uma única assinatura Schnorr, uma transação feita dessa forma parece uma transação comum na rede.
* Ele exige poucas rodadas de comunicação, pode ser executado em paralelo e consegue identificar e excluir um participante que se comporte de forma desonesta.
* Para o Zcash, isso significa que o FROST permite que várias partes, separadas geograficamente, controlem a autoridade de gasto de ZEC blindados, o que é útil para custódia, garantia, serviços não custodiantes e Zcash Shielded Assets (ZSA).
* Ele foi criado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).

## Explicação principal

### O que é uma assinatura Schnorr?

Uma assinatura digital Schnorr é um conjunto de algoritmos: (KeyGen, Sign, Verify).

As assinaturas Schnorr têm várias vantagens. Uma das principais é que, quando várias chaves são usadas para assinar a mesma mensagem, as assinaturas resultantes podem ser combinadas em uma única assinatura. Isso pode reduzir significativamente o tamanho de pagamentos multisig e de outras transações relacionadas a multisig.

### O que é o FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Criado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).*

O FROST é um protocolo de assinatura de limiar e de geração distribuída de chaves que exige poucas rodadas de comunicação e pode ser executado em paralelo. O protocolo FROST é uma versão de limiar do esquema de assinatura Schnorr.

Diferentemente das assinaturas em um cenário de uma única parte, as assinaturas de limiar exigem a cooperação de um número mínimo de signatários, cada um detendo uma parte de uma chave privada comum.

[O que são assinaturas de limiar? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequentemente, gerar assinaturas em um cenário de limiar gera uma sobrecarga causada pelas rodadas de rede entre os signatários, o que se torna caro quando as partes secretas estão armazenadas em dispositivos com rede limitada ou quando a coordenação acontece em redes pouco confiáveis.

A sobrecarga de rede durante as operações de assinatura é reduzida com o uso de uma técnica inovadora que protege contra ataques de falsificação e que também pode ser aplicada a outros esquemas.

O FROST aprimora os protocolos de assinatura de limiar ao permitir que um número ilimitado de operações de assinatura seja realizado com segurança em paralelo (concorrência).

Ele pode ser usado como um protocolo de 2 rodadas, em que os signatários enviam e recebem 2 mensagens no total, ou como um protocolo de assinatura otimizado de rodada única com uma etapa de pré-processamento.

O FROST obtém seus ganhos de eficiência em parte ao permitir que o protocolo seja interrompido na presença de um participante desonesto, que é então identificado e excluído das operações futuras.

As provas de segurança que demonstram que o FROST é seguro contra ataques de mensagem escolhida, partindo do pressuposto de que o problema do logaritmo discreto é difícil e de que o adversário controla menos participantes do que o limiar, estão disponíveis [aqui](https://eprint.iacr.org/2020/852.pdf#page=16).

### Como o FROST funciona?

O protocolo FROST contém dois componentes importantes:

Primeiro, n participantes executam um protocolo de geração distribuída de chaves (DKG) para gerar uma chave de verificação comum. Ao final, cada participante obtém uma parte privada da chave secreta e uma parte pública da chave de verificação.

Depois disso, quaisquer t de n participantes podem executar um protocolo de assinatura de limiar para gerar, em colaboração, uma assinatura Schnorr válida.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Visualização / analogia

Pense no FROST como um cofre que só abre quando vários portadores de chave autorizados giram suas chaves juntos, mas sem que todos sejam necessários: basta um número definido (por exemplo, quaisquer 3 de 5). Depois que o cofre é aberto, um observador externo não consegue saber quais portadores de chave compareceram, nem mesmo que mais de um esteve envolvido. Da mesma forma, um grupo pode autorizar em conjunto uma transação Zcash enquanto a rede vê apenas uma assinatura de aparência comum.

## Aprofundamento

**Geração distribuída de chaves (DKG)**

O objetivo desta fase é gerar partes de chave secreta de longa duração e uma chave de verificação conjunta. Esta fase é executada por n participantes.

O FROST constrói sua própria fase de geração de chaves com base no DKG de Pedersen (GJKR03), que usa como sub-rotinas tanto o esquema de compartilhamento de segredo de Shamir quanto o esquema de compartilhamento de segredo verificável de Feldman. Além disso, cada participante precisa demonstrar conhecimento do próprio segredo enviando aos demais participantes uma prova de conhecimento zero, que é ela mesma uma assinatura Schnorr. Essa etapa adicional protege contra ataques de chave maliciosa quando t ≥ n/2.

Ao final do protocolo DKG, é gerada uma chave de verificação conjunta vk. Cada participante Pᵢ detém um valor (i, skᵢ ), que é sua parte secreta de longa duração, e uma parte da chave de verificação vkᵢ = skᵢ *G. A parte da chave de verificação vkᵢ do participante Pᵢ é usada pelos demais participantes para verificar a correção das partes de assinatura de Pᵢ durante a fase de assinatura, enquanto a chave de verificação vk é usada por partes externas para verificar as assinaturas emitidas pelo grupo.

**Assinatura de limiar**

Esta fase se baseia em técnicas conhecidas que usam compartilhamento aditivo de segredo e conversão de partes para gerar, de forma não interativa, o nonce de cada assinatura. Ela também aproveita técnicas de vinculação para evitar ataques de falsificação conhecidos sem limitar a concorrência.

Na etapa de pré-processamento, cada participante prepara um número fixo de pares de pontos de curva elíptica (EC) para uso posterior. Essa etapa é executada uma única vez para várias fases de assinatura de limiar.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Rodada de assinatura 1: Cada participante Pᵢ começa gerando um único par de nonces privados (dᵢ, eᵢ) e o par correspondente de pontos EC (Dᵢ, Eᵢ), e então transmite esse par de pontos a todos os demais participantes. Cada participante armazena esses pares de pontos EC para uso posterior. As rodadas de assinatura 2 e 3 são as operações propriamente ditas, nas quais t de n participantes cooperam para criar uma assinatura Schnorr válida.

Rodada de assinatura 2: Os participantes trabalham juntos para criar uma assinatura Schnorr válida. A técnica central desta rodada é o compartilhamento aditivo de segredo t de t.

Esta etapa impede ataques de falsificação, porque os atacantes não conseguem combinar partes de assinatura de operações de assinatura distintas nem permutar o conjunto de signatários ou os pontos publicados por cada signatário.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Depois de calcular o desafio c, cada participante pode calcular a resposta zᵢ usando os nonces de uso único e as partes secretas de longo prazo, que são partes secretas de Shamir t de n (grau t-1) da chave de longa duração do grupo. Ao final da rodada de assinatura 2, cada participante transmite zᵢ aos demais participantes.

[Leia o artigo completo](https://eprint.iacr.org/2020/852.pdf)

### Uso do FROST no ecossistema mais amplo

**FROST na [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Para melhorar a eficiência dos sistemas de assinatura de limiar da Coinbase, a equipe desenvolveu uma versão do FROST. Essa implementação do Coinbase faz pequenas alterações em relação ao rascunho original do FROST.

A equipe optou por não usar o papel de agregador de assinaturas. Em vez disso, cada participante é um agregador de assinaturas. Esse design é mais seguro: todos os participantes do protocolo verificam os cálculos dos demais, alcançando assim um nível maior de segurança e reduzindo o risco. A etapa de pré-processamento única também foi removida para acelerar a implementação, sendo usada em seu lugar uma terceira rodada de assinatura.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) da Blockstream**

Um aprimoramento do FROST voltado a uma aplicação específica foi proposto para uso na [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) do Bitcoin.

"O ROAST é um wrapper simples em torno de esquemas de assinatura de limiar como o FROST. Ele garante que um quórum de signatários honestos, por exemplo, os funcionários da Liquid, sempre consiga obter uma assinatura válida, mesmo na presença de signatários disruptivos, quando as conexões de rede têm latência arbitrariamente alta."

---

**FROST na IETF**

A Internet Engineering Task Force, fundada em 1986, é a principal organização de desenvolvimento de padrões da Internet. A IETF desenvolve padrões voluntários que muitas vezes são adotados por usuários da Internet, operadores de rede e fornecedores de equipamentos, ajudando a moldar a trajetória da Internet.

A versão 11 do FROST (variante de duas rodadas) foi [submetida à IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Esse é um passo importante rumo à avaliação completa do FROST como um novo padrão de esquema de assinatura de limiar para uso em toda a internet, em dispositivos de hardware e em outros serviços nos próximos anos.


## Implicações práticas

Com certeza. A introdução do FROST no Zcash permitirá que várias partes, separadas geograficamente, controlem a autoridade de gasto de ZEC blindados. As transações transmitidas com esse esquema de assinatura serão indistinguíveis das demais transações na rede, mantendo uma forte resistência ao rastreamento de pagamentos e limitando a quantidade de dados da blockchain disponíveis para análise.

Na prática, isso possibilita a criação de uma ampla gama de novos aplicativos na rede, desde provedores de garantia até outros serviços não custodiantes.

O FROST também se tornará um componente essencial na emissão e no gerenciamento seguros de Zcash Shielded Assets (ZSA), permitindo um gerenciamento mais seguro da autoridade de gasto dentro de organizações de desenvolvimento e de custodiantes de ZEC, como corretoras, além de oferecer esse recurso aos usuários de Zcash.

## Erros comuns

**Confundir o FROST com o multisig on-chain tradicional**. O multisig tradicional pode revelar vários signatários ou várias assinaturas on-chain. O FROST produz uma única assinatura Schnorr agregada, de modo que uma transação é indistinguível de uma transação com assinatura única.

**Supor que menos participantes do que o limiar possam assinar**. Somente um número mínimo (t de n) de participantes agindo em conjunto pode produzir uma assinatura válida; qualquer grupo menor não consegue.

**Supor que o FROST oculta tudo off-chain**. O FROST protege a assinatura on-chain, mas a coordenação entre os signatários ainda acontece off-chain e exige seus próprios controles de privacidade e segurança.


## Páginas relacionadas

- [Halo](/zcash-tech/halo) — o sistema de provas recursivo e sem necessidade de confiança usado no pool Orchard do Zcash.
- [Chaves de visualização](/zcash-tech/viewing-keys) — divulgação seletiva para transações blindadas.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — onde o FROST ajuda a gerenciar a autoridade de gasto e de emissão.
- [Sincronização de carteiras Zcash](/zcash-tech/zcash-wallet-syncing) — outra peça central da infraestrutura de privacidade do Zcash.


## Para saber mais

[Artigo da Coinbase - Assinaturas de limiar](https://www.coinbase.com/blog/threshold-digital-signatures)

[Compartilhamento de segredo de Shamir - Explicação e exemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Vídeo curto sobre assinaturas digitais Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
