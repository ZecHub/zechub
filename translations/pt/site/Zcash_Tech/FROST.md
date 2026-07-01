<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# FROST 


## O que é uma assinatura Schnorr?

Uma assinatura digital Schnorr é um conjunto de algoritmos: (KeyGen, Sign, Verify).

As assinaturas Schnorr têm várias vantagens. Uma vantagem importante é que, quando várias chaves são usadas para assinar a mesma mensagem, as assinaturas resultantes podem ser combinadas em uma única assinatura. Isso pode ser usado para reduzir significativamente o tamanho de pagamentos multisig e outras transações relacionadas a multisig.


## O que é FROST?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Criado por Chelsea Komlo (University of Waterloo, Zcash Foundation) e Ian Goldberg (University of Waterloo).*

FROST é um protocolo de assinatura por limiar e de geração distribuída de chaves que oferece um número mínimo de rodadas de comunicação e é seguro para ser executado em paralelo. O protocolo FROST é uma versão por limiar do esquema de assinatura Schnorr.

Ao contrário das assinaturas em um contexto de parte única, as assinaturas por limiar exigem cooperação entre um número mínimo de signatários, cada um detendo uma parcela de uma chave privada comum. 

[O que são assinaturas por limiar? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequentemente, gerar assinaturas em um contexto por limiar impõe sobrecarga devido às rodadas de rede entre os signatários, tornando-se custoso quando as parcelas secretas são armazenadas em dispositivos com rede limitada ou quando a coordenação ocorre em redes não confiáveis.

A sobrecarga de rede durante operações de assinatura é reduzida ao empregar uma técnica nova para proteção contra ataques de falsificação aplicável a outros esquemas.
 
FROST melhora os protocolos de assinatura por limiar, pois um número ilimitado de operações de assinatura pode ser executado com segurança em paralelo (concorrência).
 
Ele pode ser usado tanto como um protocolo de 2 rodadas, no qual os signatários enviam e recebem 2 mensagens no total, quanto otimizado para um protocolo de assinatura de rodada única com uma etapa de pré-processamento. 

FROST alcança suas melhorias de eficiência em parte ao permitir que o protocolo seja abortado na presença de um participante malicioso (que então é identificado e excluído de operações futuras).
 
Provas de segurança demonstrando que FROST é seguro contra ataques de mensagem escolhida, assumindo que o problema do logaritmo discreto é difícil e que o adversário controla menos participantes do que o limiar, são fornecidas [aqui](https://eprint.iacr.org/2020/852.pdf#page=16).


## Como o FROST funciona?

O protocolo FROST contém dois componentes importantes:

Primeiro, n participantes executam um *protocolo de geração distribuída de chaves (DKG)* para gerar uma chave comum de verificação; ao final, cada participante obtém uma parcela de chave secreta privada e uma parcela de chave pública de verificação. 

Depois, quaisquer t-de-n participantes podem executar um *protocolo de assinatura por limiar* para gerar colaborativamente uma assinatura Schnorr válida. 

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

**Geração distribuída de chaves (DKG)**

O objetivo desta fase é gerar parcelas de chave secreta de longa duração e uma chave conjunta de verificação. Esta fase é executada por n participantes. 

FROST constrói sua própria fase de geração de chaves com base em [Pedersens DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/)  na qual usa tanto o compartilhamento secreto de Shamir quanto os esquemas de compartilhamento secreto verificável de Feldman como sub-rotinas. Além disso, cada participante é obrigado a demonstrar conhecimento do próprio segredo enviando aos outros participantes uma prova de conhecimento zero, que por si só é uma assinatura Schnorr. Essa etapa adicional protege contra ataques de chave fraudulenta no contexto em que t ≥ n/2.

Ao final do protocolo DKG, uma chave conjunta de verificação vk é gerada. Além disso, cada participante P ᵢ mantém um valor (i, sk ᵢ ) que é sua parcela secreta de longa duração e uma parcela de chave de verificação vk ᵢ = sk ᵢ *G. A parcela de chave de verificação vk ᵢ do participante P ᵢ é usada por outros participantes para verificar a correção das parcelas de assinatura de P ᵢ na fase de assinatura, enquanto a chave de verificação vk é usada por partes externas para verificar assinaturas emitidas pelo grupo.

**Assinatura por limiar**

Esta fase se baseia em técnicas conhecidas que empregam compartilhamento secreto aditivo e conversão de parcelas para gerar, de forma não interativa, o nonce de cada assinatura. Esta fase também aproveita técnicas de vinculação para evitar ataques de falsificação conhecidos sem limitar a concorrência.

Pré-processamento: Na etapa de pré-processamento, cada participante prepara um número fixo de pares de pontos de Curva Elíptica (EC) para uso posterior, o que é executado uma única vez para múltiplas fases de assinatura por limiar.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Rodada de assinatura 1: Cada participante Pᵢ começa gerando um único par de nonces privados (dᵢ, eᵢ) e o correspondente par de pontos EC (Dᵢ, Eᵢ), e transmite esse par de pontos para todos os outros participantes. Cada participante armazena esses pares de pontos EC recebidos para uso posterior. As rodadas de assinatura 2 e 3 são as operações reais nas quais participantes t-de-n cooperam para criar uma assinatura Schnorr válida.

Rodada de assinatura 2: Para criar uma assinatura Schnorr válida, quaisquer t participantes trabalham juntos para executar esta rodada. A técnica central por trás desta rodada é o compartilhamento secreto aditivo t-de-t.

Esta etapa previne ataque de falsificação porque os atacantes não podem combinar parcelas de assinatura entre operações de assinatura distintas nem permutar o conjunto de signatários ou os pontos publicados para cada signatário. 

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Tendo calculado o desafio c, cada participante é capaz de calcular a resposta zᵢ ao desafio usando os nonces de uso único e as parcelas secretas de longo prazo, que são parcelas secretas de Shamir t-de-n (grau t-1) da chave de longa duração do grupo. Ao final da rodada de assinatura 2, cada participante transmite zᵢ aos outros participantes.

[Leia o artigo completo](https://eprint.iacr.org/2020/852.pdf)


## Isso beneficia o Zcash?

Com certeza, sim. A introdução do FROST ao Zcash permitirá que múltiplas partes, separadas geograficamente, controlem a autoridade de gasto de ZEC protegidos. Uma vantagem é que as transações transmitidas usando este esquema de assinatura serão indistinguíveis de outras transações na rede, mantendo forte resistência ao rastreamento de pagamentos e limitando a quantidade de dados da blockchain disponíveis para análise. 

Na prática, isso permite que toda uma série de novas aplicações seja construída na rede, desde provedores de escrow até outros serviços não custodiais. 

FROST também se tornará um componente essencial na emissão e gestão seguras de Zcash Shielded Assets (ZSA), permitindo uma gestão mais segura da autoridade de gasto dentro de organizações de desenvolvimento e custodiante de ZEC, como exchanges, ao distribuir ainda mais a confiança e, ao mesmo tempo, fornecer essa capacidade também aos usuários de Zcash. 


## Uso de FROST no ecossistema mais amplo

**FROST na [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Para melhorar a eficiência dos sistemas de assinatura por limiar da Coinbase, eles desenvolveram uma versão do FROST. A implementação da Coinbase faz pequenas mudanças em relação ao rascunho original do FROST.

Eles optaram por não usar o papel de agregador de assinaturas. Em vez disso, cada participante é um agregador de assinaturas. Esse design é mais seguro: todos os participantes do protocolo verificam o que os outros computaram para alcançar um nível maior de segurança e reduzir riscos. A etapa de pré-processamento (única vez) também foi removida para acelerar a implementação, passando a ter uma terceira rodada de assinatura.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) da Blockstream** 

Uma melhoria específica de aplicação sobre FROST proposta para uso na [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

"ROAST é um wrapper simples em torno de esquemas de assinatura por limiar como FROST. Ele garante que um quórum de signatários honestos, por exemplo, os functionaries da Liquid, sempre possa obter uma assinatura válida mesmo na presença de signatários disruptivos quando as conexões de rede têm latência arbitrariamente alta." 

___

**FROST no IETF**

A Internet Engineering Task Force, fundada em 1986, é a principal organização de desenvolvimento de padrões para a Internet. O IETF cria padrões voluntários que são frequentemente adotados por usuários da Internet, operadores de rede e fornecedores de equipamentos, ajudando assim a moldar a trajetória do desenvolvimento da Internet.

A versão 11 do FROST (variante de duas rodadas) foi [submetida ao IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 

Este é um passo importante para a avaliação completa do FROST como um novo padrão de esquema de assinatura por limiar para uso em toda a internet, em dispositivos de hardware e em outros serviços nos próximos anos. 
___


Aprendizado adicional:

[Artigo da Coinbase - Assinaturas por limiar](https://www.coinbase.com/blog/threshold-digital-signatures)

[Compartilhamento Secreto de Shamir - Explicação e exemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Vídeo curto sobre assinaturas digitais Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
