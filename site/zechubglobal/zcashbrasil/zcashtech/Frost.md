# Frost


## O que é uma assinatura Schnorr?

Uma assinatura digital Schnorr é um conjunto de algoritmos: (KeyGen, Sign, Verify).

As assinaturas de Schnorr têm várias vantagens. Uma vantagem importante é que, quando várias chaves são usadas para assinar a mesma mensagem, as assinaturas resultantes podem ser combinadas em uma única assinatura. Isso pode ser usado para reduzir significativamente o tamanho dos pagamentos multisig e outras transações relacionadas a multisig.


## O que é FROST?

**Assinaturas de Limite de Schnorr otimizadas para rodadas flexíveis** -
*Criado por Chelsea Komlo (Universidade de Waterloo, Zcash Foundation) e Ian Goldberg (Universidade de Waterloo).*

O FROST é um protocolo de assinatura de limite e geração de chave distribuída que oferece rodadas mínimas de comunicação e é seguro para ser executado em paralelo. O protocolo FROST é uma versão limite do esquema de assinatura Schnorr.

Ao contrário das assinaturas em uma configuração de parte única, as assinaturas de limite requerem cooperação entre um número limite de signatários, cada um mantendo um compartilhamento de uma chave privada comum.

[O que são Assinaturas Limiares? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequentemente, a geração de assinaturas em uma configuração de limite impõe sobrecarga devido a rodadas de rede entre os signatários, provando ser dispendiosa quando os compartilhamentos secretos são armazenados em dispositivos limitados pela rede ou quando a coordenação ocorre em redes não confiáveis.

A sobrecarga da rede durante as operações de assinatura é reduzida pelo emprego de uma nova técnica de proteção contra ataques de falsificação aplicáveis ​​a outros esquemas.
 
O FROST melhora os protocolos de assinatura de limite, pois um número ilimitado de operações de assinatura pode ser executado com segurança em paralelo (simultaneidade).
 
Ele pode ser usado como um protocolo de 2 rodadas em que os signatários enviam e recebem 2 mensagens no total ou otimizado para um protocolo de assinatura de rodada única com um estágio de pré-processamento.

O FROST atinge suas melhorias de eficiência em parte ao permitir que o protocolo seja abortado na presença de um participante com comportamento inadequado (que é então identificado e excluído de operações futuras).
 
Provas de segurança que demonstram que o FROST é seguro contra ataques de mensagem escolhida assumindo que o problema do logaritmo discreto é difícil e o adversário controla menos participantes do que o limite são fornecidos [aqui](https://eprint.iacr.org/2020/852.pdf#página=16).


## Como funciona o FROST?

O protocolo FROST contém dois componentes importantes:

Primeiro, n participantes executam um *protocolo de geração de chave distribuída (DKG)* para gerar uma chave de verificação comum; ao final, cada participante obtém um compartilhamento de chave secreta privada e um compartilhamento de chave de verificação pública.

Posteriormente, qualquer t-de-n participantes pode executar um *protocolo de assinatura de limite* para gerar colaborativamente uma assinatura Schnorr válida.

![Sinal de limite](https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg "thresholdsign")


**Geração de chave distribuída (DKG)**

O objetivo desta fase é gerar compartilhamentos de chaves secretas de longa duração e uma chave de verificação conjunta. Esta fase é executada por n participantes.

A FROST constrói sua própria fase de geração de chaves sobre [Pedersen's DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/) na qual usa tanto o compartilhamento de segredos de Shamir quanto os esquemas de compartilhamento de segredos verificáveis ​​de Feldman como sub-rotinas. Além disso, cada participante é obrigado a demonstrar conhecimento de seu próprio segredo enviando a outros participantes uma prova de conhecimento zero, que é uma assinatura de Schnorr. Esta etapa adicional protege contra ataques de rogue-key na configuração onde t ≥ n/2.

Ao final do protocolo DKG, é gerada uma chave de verificação conjunta vk. Além disso, cada participante P ᵢ detém um valor (i, sk ᵢ ) que é seu compartilhamento de segredo de longa duração e um compartilhamento de chave de verificação vk ᵢ = sk ᵢ *G. A chave de verificação do participante P ᵢ vk ᵢ é utilizada por outros participantes para verificar a exatidão das assinaturas de P ᵢ na fase de assinatura, enquanto a chave de verificação vk é utilizada por terceiros para verificar as assinaturas emitidas pelo grupo.

**Assinatura Limite**

Esta fase se baseia em técnicas conhecidas que empregam compartilhamento aditivo de segredo e conversão de compartilhamento para gerar não interativamente o nonce para cada assinatura. Essa fase também utiliza técnicas de vinculação para evitar ataques de falsificação conhecidos sem limitar a simultaneidade.

Pré-processamento: No estágio de pré-processamento, cada participante prepara um número fixo de pares de pontos de Curva Elíptica (EC) para uso posterior, que é executado uma única vez para várias fases de assinatura de limite.

![Pré-processamento](https://i.ibb.co/nQD1c3n/preprocess.png "fase de pré-processamento")

Rodada de Assinatura 1: Cada participante Pᵢ começa gerando um único par nonce privado (dᵢ, eᵢ) e o par correspondente de pontos EC (Dᵢ, Eᵢ) e transmite esse par de pontos para todos os outros participantes. Cada participante armazena esses pares de pontos EC recebidos para uso posterior. As rodadas 2 e 3 de assinatura são as operações reais nas quais t-de-n participantes cooperam para criar uma assinatura Schnorr válida.

Rodada de Assinatura 2: Para criar uma assinatura Schnorr válida, todos os participantes trabalham juntos para executar esta rodada. A principal técnica por trás dessa rodada é o compartilhamento aditivo de segredos t-out-of-t.

Essa etapa evita ataques de falsificação porque os invasores não podem combinar compartilhamentos de assinatura em operações de assinatura distintas ou permutar o conjunto de signatários ou pontos publicados para cada signatário.

![Protocolo de assinatura](https://i.ibb.co/b5rJbXx/sign.png "protocolo de assinatura")

Tendo calculado o desafio c, cada participante é capaz de calcular a resposta zᵢ ao desafio usando os nonces de uso único e os compartilhamentos secretos de longo prazo, que são t-out-of-n (grau t-1) compartilhamentos secretos de Shamir da chave de longa duração do grupo. No final da rodada de assinaturas 2, cada participante transmite zᵢ para outros participantes.

[Leia o artigo completo](https://eprint.iacr.org/2020/852.pdf)


## Beneficia a Zcash?

Absolutamente sim. A introdução do FROST na Zcash permitirá que várias partes, separadas geograficamente, controlem a autoridade de gastos da ZEC blindada. Uma vantagem é que as transações transmitidas usando esse esquema de assinatura serão indistinguíveis de outras transações na rede, mantendo forte resistência ao rastreamento de pagamento e limitando a quantidade de dados de blockchain disponíveis para análise.

Na prática, isso permite que toda uma série de novos aplicativos seja criada na rede, desde provedores de custódia ou outros serviços não custodiais.

O FROST também se tornará um componente essencial na emissão e gerenciamento seguros de Zcash Shielded Assets (ZSA), permitindo um gerenciamento mais seguro da autoridade de gastos em organizações de desenvolvimento e custodiantes ZEC, como bolsas, distribuindo ainda mais a confiança e fornecendo essa capacidade também aos usuários do Zcash.


## Uso do FROST no ecossistema mais amplo

**FROST em [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

A fim de melhorar a eficiência dos sistemas de assinatura de limite da Coinbase, eles desenvolveram uma versão do FROST. A implementação da Coinbase faz pequenas alterações em relação ao rascunho FROST original.

Eles optaram por não usar a função de agregador de assinatura. Em vez disso, cada participante é um agregador de assinaturas. Este design é mais seguro: todos os participantes do protocolo verificam o que os outros computaram para obter um maior nível de segurança e reduzir o risco. O estágio de pré-processamento (único) também foi removido para acelerar a implementação, tendo em seu lugar uma terceira rodada de assinatura.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) por Blockstream**

Uma melhoria específica do aplicativo no FROST proposta para uso no [Blockstream's Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) para Bitcoin.

"ROAST é um wrapper simples em torno de esquemas de assinatura de limite como FROST. Ele garante que um quorum de signatários honestos, por exemplo, os funcionários da Liquid, sempre pode obter uma assinatura válida mesmo na presença de signatários disruptivos quando as conexões de rede têm latência arbitrariamente alta."

___

**FROST no IETF**

A Internet Engineering Task Force, fundada em 1986, é a principal organização de desenvolvimento de padrões para a Internet. O IETF cria padrões voluntários que são frequentemente adotados por usuários da Internet, operadores de rede e fornecedores de equipamentos e, assim, ajuda a moldar a trajetória do desenvolvimento da Internet.

A versão 11 do FROST (variante de dois turnos) foi [enviada ao IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/).

Este é um passo importante para a avaliação completa do FROST como um novo padrão de esquema de assinatura de limite para uso na Internet, em dispositivos de hardware e para outros serviços nos próximos anos.
___


Aprendizado adicional:

[Artigo Coinbase - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explicação e Exemplo](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Vídeo curto sobre assinaturas digitais Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___





