<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>
# FROST


## Resumo rápido

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) é um protocolo de assinatura de limiar e geração distribuída de chaves: vários signatários detêm, cada um, uma parte de uma chave privada comum, e um número mínimo deles deve cooperar para produzir uma assinatura.
* Como o resultado é uma única assinatura Schnorr, uma transação feita dessa forma parece uma transação comum na rede.
* Exige um número mínimo de rodadas de comunicação, pode ser executado em paralelo e pode identificar e excluir um participante com comportamento inadequado.
* Para a Zcash, isso significa que FROST permite que múltiplas partes, geograficamente separadas, controlem a autoridade de gasto de ZEC blindado — útil para custódia, escrow, serviços sem custódia e Zcash Shielded Assets (ZSA).
* Foi criado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).

## Explicação central

### O que é uma assinatura Schnorr?

Uma assinatura digital Schnorr é um conjunto de algoritmos: (KeyGen, Sign, Verify).

As assinaturas Schnorr têm várias vantagens. Uma vantagem importante é que, quando múltiplas chaves são usadas para assinar a mesma mensagem, as assinaturas resultantes podem ser combinadas em uma única assinatura. Isso pode reduzir significativamente o tamanho de pagamentos multisig e de outras transações relacionadas a multisig.

### O que é FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Criado por Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST é um protocolo de assinatura de limiar e geração distribuída de chaves que exige um número mínimo de rodadas de comunicação e pode ser executado em paralelo. O protocolo FROST é uma versão de limiar do esquema de assinatura Schnorr.

Ao contrário das assinaturas em um contexto de parte única, as assinaturas de limiar exigem cooperação entre um número mínimo de signatários, cada um detendo uma parte de uma chave privada comum.

[O que são Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequentemente, gerar assinaturas em um contexto de limiar gera sobrecarga devido às rodadas de rede entre os signatários, tornando isso custoso quando as partes secretas são armazenadas em dispositivos com limitações de rede ou quando a coordenação ocorre em redes não confiáveis.

A sobrecarga de rede durante as operações de assinatura é reduzida por meio do uso de uma nova técnica que protege contra ataques de falsificação e que também é aplicável a outros esquemas.

FROST melhora os protocolos de assinatura de limiar ao permitir que um número ilimitado de operações de assinatura seja executado com segurança em paralelo (concorrência).

Ele pode ser usado tanto como um protocolo de 2 rodadas, no qual os signatários enviam e recebem 2 mensagens no total, quanto como um protocolo otimizado de assinatura em rodada única com uma etapa de pré-processamento.

FROST alcança suas melhorias de eficiência, em parte, ao permitir que o protocolo seja abortado na presença de um participante com comportamento inadequado, que então é identificado e excluído de operações futuras.

Provas de segurança demonstrando que FROST é seguro contra ataques de mensagem escolhida, assumindo que o problema do logaritmo discreto é difícil e que o adversário controla menos participantes do que o limiar, são fornecidas [aqui](https://eprint.iacr.org/2020/852.pdf#page=16).

### Como FROST funciona?

O protocolo FROST contém dois componentes importantes:

Primeiro, n participantes executam um protocolo de geração distribuída de chaves (DKG) para gerar uma chave comum de verificação. Ao final, cada participante obtém uma parte de chave secreta privada e uma parte de chave pública de verificação.

Depois disso, quaisquer t de n participantes podem executar um protocolo de assinatura de limiar para gerar colaborativamente uma assinatura Schnorr válida.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visual / Analogia

Pense no FROST como um cofre que só abre quando vários detentores autorizados de chaves giram suas chaves juntos — mas nem todos os detentores são necessários; apenas uma quantidade definida (por exemplo, quaisquer 3 de 5). Quando o cofre é aberto, um observador externo não consegue dizer quais detentores de chave compareceram, nem sequer que mais de um esteve envolvido. Da mesma forma, um grupo pode autorizar conjuntamente uma transação Zcash enquanto a rede vê apenas uma assinatura comum.

## Aprofundamento

**Geração distribuída de chaves (DKG)**

O objetivo desta fase é gerar partes de chave secreta de longa duração e uma chave conjunta de verificação. Esta fase é executada por n participantes.

FROST constrói sua própria fase de geração de chaves sobre o DKG de Pedersen (GJKR03), que usa tanto o compartilhamento secreto de Shamir quanto os esquemas verificáveis de compartilhamento secreto de Feldman como sub-rotinas. Além disso, cada participante deve demonstrar conhecimento do próprio segredo enviando uma prova de conhecimento zero aos outros participantes, que é em si uma assinatura Schnorr. Essa etapa adicional protege contra ataques de rogue-key quando t ≥ n/2.

Ao final do protocolo DKG, é gerada uma chave conjunta de verificação vk. Cada participante Pᵢ mantém um valor (i, skᵢ ) que é sua parte secreta de longa duração e uma parte de chave de verificação vkᵢ = skᵢ *G. A parte de chave de verificação vkᵢ do participante Pᵢ é usada por outros participantes para verificar a correção das partes de assinatura de Pᵢ durante a fase de assinatura, enquanto a chave de verificação vk é usada por partes externas para verificar assinaturas emitidas pelo grupo.

**Assinatura de limiar**

Esta fase se baseia em técnicas conhecidas que empregam compartilhamento aditivo de segredo e conversão de partes para gerar de forma não interativa o nonce de cada assinatura. Ela também aproveita técnicas de vinculação para evitar ataques de falsificação conhecidos sem limitar a concorrência.

Na etapa de pré-processamento, cada participante prepara um número fixo de pares de pontos de Curva Elíptica (EC) para uso posterior. Esta etapa é executada uma vez para múltiplas fases de assinatura de limiar.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Rodada de assinatura 1: Cada participante Pᵢ começa gerando um único par privado de nonce (dᵢ, eᵢ) e o par correspondente de pontos EC (Dᵢ, Eᵢ), depois transmite esse par de pontos para todos os outros participantes. Cada participante armazena esses pares de pontos EC para uso posterior. As rodadas de assinatura 2 e 3 são as operações reais nas quais t de n participantes cooperam para criar uma assinatura Schnorr válida.

Rodada de assinatura 2: Os participantes trabalham juntos para criar uma assinatura Schnorr válida. A técnica central por trás desta rodada é o compartilhamento aditivo de segredo t-de-t.

Esta etapa previne ataques de falsificação porque os atacantes não podem combinar partes de assinatura entre operações de assinatura distintas, nem permutar o conjunto de signatários ou os pontos publicados para cada signatário.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Tendo calculado o desafio c, cada participante pode calcular a resposta zᵢ usando os nonces de uso único e as partes secretas de longo prazo, que são partes secretas de Shamir t-de-n (grau t-1) da chave de longa duração do grupo. Ao final da rodada de assinatura 2, cada participante transmite zᵢ aos outros participantes.

[Leia o artigo completo](https://eprint.iacr.org/2020/852.pdf)
### Uso de FROST no ecossistema mais amplo

**FROST na [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Para melhorar a eficiência dos sistemas de assinatura por limiar da Coinbase, eles desenvolveram uma versão de FROST. Esta implementação da Coinbase faz pequenas alterações em relação ao rascunho original de FROST.

Eles optaram por não usar o papel de agregador de assinaturas. Em vez disso, cada participante é um agregador de assinaturas. Esse design é mais seguro: todos os participantes do protocolo verificam os cálculos dos outros, alcançando assim um nível mais alto de segurança e reduzindo o risco. A etapa única de pré-processamento também foi removida para acelerar a implementação, usando-se uma terceira rodada de assinatura em seu lugar.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) da Blockstream**

Uma melhoria específica de aplicação sobre FROST é proposta para uso na [Sidechain Liquid da Blockstream](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

“ROAST é um wrapper simples em torno de esquemas de assinatura por limiar como FROST. Ele garante que um quórum de signatários honestos, por exemplo, os functionaries da Liquid, possa sempre obter uma assinatura válida mesmo na presença de signatários disruptivos quando as conexões de rede têm latência arbitrariamente alta.”

---

**FROST no IETF**

A Internet Engineering Task Force, fundada em 1986, é a principal organização de desenvolvimento de padrões para a Internet. O IETF desenvolve padrões voluntários que frequentemente são adotados por usuários da Internet, operadores de rede e fornecedores de equipamentos, ajudando a moldar a trajetória da Internet.

A versão 11 de FROST (variante de duas rodadas) foi [submetida ao IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Este é um passo importante rumo à avaliação completa de FROST como um novo padrão de esquema de assinatura por limiar para uso em toda a internet, em dispositivos de hardware e em outros serviços nos próximos anos.


## Implicações Práticas

Com certeza, sim. A introdução de FROST no Zcash permitirá que múltiplas partes, separadas geograficamente, controlem a autoridade de gasto de ZEC blindado. As transações transmitidas usando esse esquema de assinatura serão indistinguíveis de outras transações na rede, mantendo forte resistência ao rastreamento de pagamentos e limitando a quantidade de dados da blockchain disponível para análise.

Na prática, isso permite que uma ampla gama de novas aplicações seja construída na rede, desde provedores de custódia em garantia até outros serviços sem custódia.

FROST também se tornará um componente essencial na emissão e gestão seguras de Zcash Shielded Assets (ZSA), permitindo um gerenciamento mais seguro da autoridade de gasto dentro de organizações de desenvolvimento e custodians de ZEC, como exchanges, ao mesmo tempo em que também fornece essa capacidade aos usuários de Zcash.

## Erros Comuns

**Confundir FROST com multisig tradicional on-chain**. O multisig tradicional pode revelar múltiplos signatários ou múltiplas assinaturas on-chain. FROST produz uma única assinatura Schnorr agregada, então uma transação é indistinguível de uma transação com assinatura única.

**Presumir que menos do que o limiar pode assinar**. Apenas um número limiar (t-de-n) de participantes atuando em conjunto pode produzir uma assinatura válida; qualquer grupo menor não pode.

**Presumir que FROST esconde tudo off-chain**. FROST protege a assinatura on-chain, mas a coordenação entre os signatários ainda ocorre off-chain e exige seus próprios controles de privacidade e segurança.


## Páginas Relacionadas

- [Halo](/zcash-tech/halo) — o sistema de provas recursivo e sem confiança usado na pool Orchard do Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) — divulgação seletiva para transações blindadas.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — onde FROST ajuda a gerenciar a autoridade de gasto/emissão.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — outra peça central da infraestrutura de privacidade do Zcash.


## Aprendizado Adicional

[Artigo da Coinbase - Assinaturas por Limiar](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explicação e Exemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Vídeo Curto sobre Assinaturas Digitais Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
