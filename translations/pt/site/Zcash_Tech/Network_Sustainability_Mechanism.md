<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Network_Sustainability_Mechanism.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Mecanismo de sustentabilidade da rede (NSM)

> O NSM faz parte do consenso do Zcash desde que [NU7](./NU7.md) foi ativado na Mainnet, no bloco 3.543.405, em 6 de novembro de 2026. As taxas já estão sendo reservadas; a reemissão para os mineradores começa no bloco 8.939.664 (com previsão para fevereiro de 2031).

O que você vai aprender: o que o Mecanismo de sustentabilidade da rede faz, quanto das taxas de cada bloco ele retira de circulação, para onde vai esse ZEC, quando e em que ritmo ele volta como recompensa de bloco e por que o limite de 21 milhões e o cronograma de halving permanecem inalterados.

O Mecanismo de sustentabilidade da rede (NSM) é um conjunto de regras de consenso que retira parte dos ZEC de circulação e os devolve aos mineradores mais tarde, ao longo de muitos anos. NU7 implantou duas partes do mecanismo: [ZIP 235](https://zips.z.cash/zip-0235), que retira de circulação 60% das taxas de transação de cada bloco, e [ZIP 237](https://zips.z.cash/zip-0237), que reemite os ZEC retirados além do subsídio normal do bloco, seguindo uma curva gradual. Ambos foram ativados por [ZIP 259](https://zips.z.cash/zip-0259).

Por que isso importa. Zcash paga pela segurança com novos ZEC em cada bloco, e esse subsídio cai pela metade a cada quatro anos, aproximadamente. Quando ele se torna pequeno, os mineradores precisam depender principalmente das taxas. O NSM é um primeiro passo em direção a esse futuro: reserva parte das taxas de hoje e as distribui aos mineradores do futuro, sem aumentar o limite de oferta nem alterar o cronograma de halving de que as pessoas já dependem.

## Resumo

- **Retirada ([ZIP 235](https://zips.z.cash/zip-0235)):** em cada bloco, 60% do total das taxas de transação (arredondado para baixo, em benefício do minerador) sai de circulação. O minerador fica com os outros 40%.
- **Saldo de valor do NSM:** um total acumulado e público dos ZEC retirados de circulação e ainda não reemitidos. É um estado de consenso, não um pool do qual alguém possa gastar.
- **O saldo inicial:** em NU7, o saldo começou em **368.58445520 ZEC**, correspondentes às recompensas de bloco e taxas que os primeiros mineradores não reivindicaram antes de NU6.
- **Reemissão ([ZIP 237](https://zips.z.cash/zip-0237)):** a partir do bloco **8.939.664**, cada bloco adiciona ao subsídio do bloco uma fração fixa do saldo (0,00001375%). Isso distribui cerca de metade do saldo a cada período de halving de quatro anos.
- **O que permanece igual:** o cronograma de halving e o limite máximo de 21 milhões de ZEC. Se o saldo algum dia chegar a zero, a emissão seguirá exatamente o cronograma antigo.

## Analogia visual

Imagine um pote de economias ao lado do caixa. Cada vez que um bloco é minerado, 60% das gorjetas (taxas) vão para o pote, em vez de ficarem com o minerador. Ninguém pode retirar dinheiro do pote manualmente. A partir de 2031, uma pequena parcela fixa do que estiver no pote será adicionada a cada recompensa de bloco, esvaziando-o aos poucos: cerca de metade a cada quatro anos, no mesmo ritmo dos halvings.

## Como funciona a retirada (ZIP 235)

- A regra vale por bloco, não por transação. Em um bloco com taxas totais de `F` (em zatoshi), o valor retirado é `floor(6 × F / 10)`, e o minerador pode reivindicar `F` menos esse valor.
- O arredondamento é feito uma vez para o bloco inteiro e sempre em benefício do minerador. Arredondar por transação retiraria menos de 60% no total (duas taxas de 1 zatoshi contribuiriam 0 cada uma).
- Exemplo: em um bloco cujas transações pagam 50.000 zatoshi (0,0005 ZEC) em taxas, são retirados 30.000 zatoshi e pagos 20.000 ao minerador. Em um bloco com taxas de 15 zatoshi, são retirados 9 e pagos 6 ao minerador.
- Não é necessário nenhum campo de transação. Cada nó calcula o valor a partir das taxas que já valida, e [ZIP 236](https://zips.z.cash/zip-0236) faz com que a transação coinbase reivindique exatamente o que é devido ao minerador, impedindo-o de retirar menos ou reivindicar mais.
- Escala: ZIP 235 estimou, com base no tráfego anterior a NU7, cerca de 370 ZEC em taxas por ano; portanto, aproximadamente 222 ZEC seriam retirados por ano. Hoje, as taxas são pequenas em comparação com o subsídio de bloco, por isso os autores esperavam pouco impacto para os mineradores.

## Como funciona a reemissão (ZIP 237)

- **O saldo.** `NSMValueBalance` começa em 368.58445520 ZEC (36.858.445.520 zatoshi) na ativação de NU7. Cada bloco adiciona o que ZIP 235 retirou e subtrai o que foi reemitido. Um bloco que deixaria o saldo negativo é inválido.
- **De onde veio o saldo inicial.** Antes de NU6, uma transação coinbase podia reivindicar menos que a recompensa total do bloco e as taxas. Nos primeiros 2.726.400 blocos da chain, os mineradores deixaram 368.58445520 ZEC sem reivindicar: o subsídio programado até essa altura era de 15.750.000 ZEC, e a oferta emitida era de 15.749.631,41554480 ZEC. ZIP 237 incorpora esse valor ao NSM para que seja distribuído em vez de perdido.
- **Sem reemissão até o bloco 8.939.664.** Entre NU7 e essa altura, o saldo apenas aumenta.
- **A fórmula.** A partir do bloco 8.939.664, o subsídio de cada bloco recebe um adicional de `ceiling(0.0000001375 × NSMValueBalance)`, calculado com base no saldo após o bloco anterior. A fração é `floor(LN2_SCALED / HalvingInterval) / 10^10` = 1375 / 10.000.000.000, com um intervalo de halving pós-NU7 de 5.040.000 blocos.
- **Por que essa fração.** `(1 − 0.0000001375)^5,040,000 ≈ 0.5`; assim, se nada mais for retirado, cerca de metade do saldo será reemitida em cada período de halving. É uma redução exponencial aplicada somente ao saldo do NSM, sobreposta às etapas inalteradas do halving.
- **Exemplo detalhado.** Se o saldo ainda fosse apenas o saldo inicial de 368,58 ZEC no bloco 8.939.664, o primeiro bloco reemitiria 5.069 zatoshi (cerca de 0,00005 ZEC), aproximadamente 0,175 ZEC por dia, considerando 3.456 blocos por dia. Os valores reais serão maiores, conforme as taxas retiradas até lá.
- **Por que o bloco 8.939.664.** ZIP 237 o determina por uma regra fixa, independentemente do valor efetivamente retirado: é o primeiro bloco após o terceiro halving (bloco 6.132.390, previsto para novembro de 2028) em que a fração do NSM aplicada a todos os ZEC ainda não programados para emissão pagaria menos que o subsídio normal do bloco (0,26041666 ZEC nesse período). As consultas a detentores de NU7 e à comunidade não chegaram a uma maioria comum sobre quando a reemissão deveria começar, então ZIP 259 usa esse ponto de cruzamento.

## O que não mudou

- **O cronograma de halving.** ZIP 237 mantém as etapas de halving de quatro anos. A alternativa rejeitada, [ZIP 234](https://zips.z.cash/zip-0234), as substituiria por uma curva de emissão gradual; as consultas de agosto e setembro de 2026 NU7 perguntaram se os halvings deveriam ser mantidos ou se a emissão deveria ser gradual, e NU7 lançou o design que preserva os halvings.
- **O limite de oferta.** A oferta emitida mais o saldo de valor do NSM cresce exatamente pelo subsídio de bloco programado em cada bloco, portanto a emissão nunca pode ultrapassar o limite. Na verdade, o limite caiu um pouco: o arredondamento do subsídio pós-NU7 em ZIP 218 reduziu a emissão total em cerca de 0,50 ZEC, e o NSM não reemite essa diferença.
- **Retirada voluntária.** [ZIP 233](https://zips.z.cash/zip-0233), que permitiria a qualquer pessoa enviar ZEC ao NSM por meio de um campo explícito de transação, não foi implantado em NU7. Hoje, as taxas são a única fonte de retirada. ZIP 237 permite que ZIPs futuros adicionem outras fontes.
- **Privacidade.** O saldo e o subsídio adicional são calculados a partir de valores que já são públicos, portanto o NSM não revela nada novo sobre as transações.

## Erros comuns

- **"60% das taxas são queimados."** Não permanentemente. Ao contrário de uma queima (o EIP-1559 do Ethereum costuma ser usado como comparação), os ZEC retirados são contabilizados e reemitidos para mineradores futuros.
- **"O NSM cria ZEC extras."** Não. Ele apenas reemite valores que foram retirados ou nunca reivindicados; a emissão total permanece dentro do limite atual.
- **"A reemissão já começou."** Ainda não. Até o bloco 8.939.664, o saldo apenas se acumula.
- **"O NSM é um fundo controlado por alguém."** Não. É um número no estado de consenso, e os valores só saem dele por meio da fórmula do subsídio de bloco.
- **"Os halvings acabaram."** Não. Esse era o design do ZIP 234, que NU7 não implantou.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Network Sustainability Mechanism (NSM) | As regras de consenso que retiram ZEC de circulação e os reemitem para os mineradores mais tarde |
| NSM Value Balance | O total acumulado e público dos ZEC retirados de circulação (ou nunca reivindicados) e ainda não reemitidos |
| Removal from circulation | Retirada de ZEC da oferta emitida para o saldo de valor do NSM; desde NU7, isso corresponde a 60% das taxas de cada bloco |
| Reissuance | Pagamento de ZEC do saldo de valor do NSM como subsídio adicional de bloco, a partir do bloco 8.939.664 |
| Issued Supply | Todos os ZEC nos pools de valor da chain; não inclui o saldo de valor do NSM |
| Block subsidy | Os novos ZEC criados em cada bloco, divididos entre o minerador e os fluxos do fundo de desenvolvimento |
| Halving interval | Número de blocos entre halvings: 5.040.000 desde NU7 (cerca de quatro anos com blocos de 25 segundos) |

## Perguntas frequentes

**Qual é o saldo atual do NSM?** O saldo inicial de 368.58445520 ZEC mais 60% das taxas de cada bloco desde o bloco 3.543.405. É um estado de consenso acompanhado por cada nó integral.

**Quem recebe os ZEC reemitidos?** Eles são adicionados ao subsídio de bloco e divididos da mesma forma: os fluxos do fundo de desenvolvimento recebem sua porcentagem fixa do subsídio total (programado mais reemitido), e o minerador fica com o restante.

**Quando começa a reemissão?** No bloco 8.939.664 da Mainnet, com previsão para fevereiro de 2031 se os blocos mantiverem uma média de 25 segundos. Na Testnet, a altura segue a mesma regra a partir da altura de ativação de NU7 na Testnet.

**As taxas vão aumentar por causa do NSM?** Não. Ele muda para onde vão as taxas, não quanto uma transação paga.

**A divisão 60/40 pode mudar?** Somente por meio de um futuro ZIP e de uma atualização da rede. ZIP 235 afirma que a divisão pode ser reavaliada se as taxas crescerem, por exemplo, quando ultrapassarem o subsídio de bloco.

## Teste seus conhecimentos

1. As transações de um bloco pagam 100.000 zatoshi em taxas. Quanto fica com o minerador?
2. De onde veio o saldo inicial do NSM?
3. Aproximadamente que parcela do saldo do NSM é reemitida por período de halving, se nada mais for retirado?
4. Por que a reemissão não eleva a emissão total para mais de 21 milhões de ZEC?

Respostas: (1) 40.000 zatoshi; 60.000 são retirados; (2) recompensas de bloco e taxas que as transações coinbase não reivindicaram antes de NU6, 368.58445520 ZEC; (3) cerca de metade; (4) a reemissão paga apenas valores que foram retirados ou nunca reivindicados, então a oferta emitida mais o saldo do NSM cresce exatamente pelo subsídio programado a cada bloco.

### Recursos

[ZIP 235: Retirar 60% das taxas de transação de circulação](https://zips.z.cash/zip-0235)

[ZIP 237: Mecanismo de sustentabilidade da rede: emissão que preserva os halvings](https://zips.z.cash/zip-0237)

[ZIP 259: Implantação da atualização da rede NU7](https://zips.z.cash/zip-0259)

[ZIP 234: Mecanismo de sustentabilidade da rede: suavização da emissão (não implantado)](https://zips.z.cash/zip-0234)

[ZIP 233: Mecanismo de sustentabilidade da rede: retirada de fundos de circulação (não implantado)](https://zips.z.cash/zip-0233)

[ZIP 236: Os blocos devem ter saldo exato](https://zips.z.cash/zip-0236)

## Páginas relacionadas

| Página | Relação |
|---|---|
| [NU7](./NU7.md) | a atualização da rede que ativou o NSM |
| [Zcash Política monetária](../start-here/zcash-monetary-policy) | o cronograma de halving e o limite de oferta mantidos pelo NSM |
| [O que os blocos de 25 segundos realmente mudam](../research/what-25-second-blocks-actually-change) | por que o subsídio e o intervalo de halving mudaram em NU7 |
| [Fundo de desenvolvimento](../start-here/development-fund) | como o subsídio de bloco é dividido |
| [Transações](../using-zcash/transactions) | como as taxas de transação são definidas |

---
