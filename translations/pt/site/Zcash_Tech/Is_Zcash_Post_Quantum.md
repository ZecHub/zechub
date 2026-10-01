<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# O Zcash é pós-quântico?

## Resposta curta

Não, ainda não.

Desde a atualização Ironwood, o Zcash é **recuperável perante ataques quânticos** para fundos mantidos no pool Ironwood. É um passo real, mas não é o mesmo que ter segurança pós-quântica. O ZIP 2005, a especificação subjacente, afirma-o diretamente: a alteração "não torna, por si só, o protocolo seguro contra adversários quânticos". Prepara os fundos Ironwood para que possam ser movidos através de um futuro Protocolo de Recuperação, assim que a criptografia atual for desativada.

Esta página distingue o que o Zcash protege hoje, o que o Ironwood alterou, o que continua exposto e o que é apenas uma proposta. A [tabela de estado](#status-table) perto do fim mostra em que ponto está cada componente e quando isso foi verificado pela última vez.

<br/>

## A quem se destina

- Qualquer pessoa que tenha visto "quantum-recoverable" e entendido "quantum-proof"
- Detentores que estejam a decidir se devem mover fundos para o Ironwood
- Autores e moderadores que necessitem de uma resposta com fontes para indicar às pessoas

Para contexto sobre a própria computação quântica, comece por [Segurança Pós-Quântica no Zcash](/zcash-tech/post-quantum-security).

<br/>

## Porque é que a questão é confusa

"Pós-quântico" é usado como se fosse uma única propriedade. Para o Zcash, são pelo menos quatro questões distintas, e têm respostas diferentes:

1. **Privacidade.** Um atacante quântico consegue ver quem pagou a quem e quanto?
2. **Gasto.** Um atacante quântico consegue gastar moedas que não lhe pertencem?
3. **Inflação.** Um atacante quântico consegue criar ZEC do nada?
4. **Recuperação.** Se a criptografia atual tiver de ser desativada, os utilizadores honestos ainda conseguem retirar os seus fundos?

O Ironwood apenas altera a resposta à quarta questão, e apenas para notas no pool Ironwood.

A ameaça por detrás de tudo isto é um atacante que consegue calcular logaritmos discretos nas curvas elípticas que o Zcash usa. Um computador quântico suficientemente grande a executar o algoritmo de Shor seria uma forma de o fazer. O ZIP 2005 salienta que encontrar um **único** logaritmo discreto é suficiente para causar inflação arbitrária ou roubar fundos.

<br/>

## O que o Zcash protege hoje

Esta tabela descreve o protocolo tal como funciona agora, contra um atacante capaz de quebrar logaritmos discretos. Aplica-se a todos os pools blindados, incluindo o Ironwood, porque o Ironwood usa o mesmo circuito Orchard, provas Halo 2 e assinaturas RedPallas que o Orchard.

| Propriedade | Contra um atacante quântico hoje | O que o Ironwood alterou |
|---|---|---|
| Privacidade | Mantém-se se o atacante não conhecer o seu endereço blindado. As provas e as assinaturas rerandomizadas não revelam nada adicional. Se o atacante conhecer o endereço, pode desencriptar as notas enviadas para ele, incluindo notas antigas guardadas da cadeia. | Nada. ZIP 2005: "A situação relativa à Privacidade mantém-se inalterada para qualquer pool." |
| Gasto | Não protegido. Um atacante poderia falsificar provas ou assinaturas de gasto e roubar de qualquer pool blindado, até de endereços que nunca tenha visto. | Ainda nada. A proteção só chega após uma futura mudança para o Protocolo de Recuperação. |
| Inflação | Não protegida. Um atacante poderia falsificar uma prova com aspeto válido e criar ZEC dentro de qualquer pool blindado, possivelmente sem que ninguém reparasse. O único limite é o [torniquete](/zcash-tech/the-turnstile): nenhum pool pode pagar mais do que o seu saldo registado. | Ainda nada. As notas Ironwood passam agora a comprometer-se com todos os seus conteúdos de uma forma que um atacante quântico não deverá conseguir falsificar, que é o que um futuro Protocolo de Recuperação precisa para manter a oferta íntegra. |
| Recuperação | As notas Sprout, Sapling e Orchard não têm via de recuperação. Depois de os seus protocolos serem desativados, tudo o que nelas permanecer ficaria inacessível. | Todas as notas Ironwood são recuperáveis em princípio. Nenhuma nota Sapling ou Orchard o é. |

O ZEC transparente é um caso separado. As suas assinaturas ECDSA podem ser falsificadas depois de a chave pública ser conhecida. Num endereço transparente normal, isso acontece na primeira vez que se gasta a partir dele, e existe também uma curta janela enquanto uma transação permanece não confirmada no mempool. O ZIP 2005 não altera nada disso.

<br/>

## O que o Ironwood alterou

O Ironwood é a atualização de rede NU6.3. Foi ativado na Mainnet no bloco 3,428,143, em 28 de julho de 2026. O seu principal objetivo era a integridade da oferta após o bug de solidez Orchard (consulte a página [Ironwood](/zcash-tech/ironwood)), tendo a recuperabilidade quântica do ZIP 2005 sido incluída como parte dela.

- **Um novo formato de nota.** Cada nota de saída Ironwood usa o formato recuperável perante ataques quânticos (byte inicial do texto simples da nota `0x03`). A aleatoriedade da nota passa agora a ser derivada de todos os seus campos, pelo que a nota fica ligada ao seu conteúdo por um hash, e não apenas por matemática de curva elíptica.
- **Uma via de recuperação apenas para notas Ironwood.** O ZIP 326 deixa explícito que todas as notas Ironwood são recuperáveis e nenhuma nota Orchard o é. Uma definição da wallet não altera isso.
- **O Orchard deixou de receber novo valor.** As recompensas Coinbase já não podem ir para o Orchard, e o Orchard já não pode enviar para um endereço Orchard diferente, pelo que novo valor blindado chega ao Ironwood.
- **As wallets são instruídas a mover tudo.** O ZIP 2005 afirma que as wallets DEVEM mover todos os fundos que controlam, incluindo fundos transparentes, Sprout e Sapling, para notas Ironwood assim que for prático, e continuar a fazê-lo à medida que chegam novos fundos.

O que o Ironwood não alterou: a criptografia usada atualmente para gastar e provar, a encriptação de notas e tudo o que respeita ao ZEC transparente.

<br/>

## Limitações que permanecem

**Existe uma janela de exposição.** Desde a ativação do Ironwood até os protocolos antigos serem desativados, um atacante quântico ainda poderia roubar, inflacionar ou bloquear fundos em todos os pools blindados. O ZIP 2005 chama-lhe o "período crítico de exposição" e alerta que um ataque durante esse período ainda poderia prejudicar a capacidade de um detentor recuperar mais tarde. É por isso que afirma que o Zcash tem de desativar Orchard, Sapling e Sprout **antes** de os ataques quânticos se tornarem viáveis.

**A desativação não tem data.** Nenhum ZIP agenda a desativação de Orchard ou Sapling. O ZIP 2003, um Draft e candidato a NU7, desativaria gastos Sprout ao não permitir transações da versão 4. Uma discussão sobre apenas levantamentos no Sapling começou no fórum em abril de 2026.

**O Protocolo de Recuperação não está concluído.** O ZIP 2005 apenas o delineia e afirma que os detalhes "estão sujeitos a alteração". Nada sobre ele está implementado.

**Recolher agora, desencriptar depois.** Os textos cifrados das notas para Ironwood, Orchard, Sapling e Sprout são todos públicos na cadeia. Alguém pode guardá-los hoje e desencriptá-los mais tarde, caso também conheça o endereço de receção. Cada endereço que publica ou partilha faz parte desse risco. O ZIP 2005 afirma que "estão a ser consideradas outras alterações de protocolo" para futuras transferências.

**Os fundos transparentes não estão abrangidos.** Os endereços a partir dos quais já se gastou, ou que foram reutilizados, têm chaves públicas expostas. A recuperabilidade para alguns endereços transparentes é, por enquanto, apenas uma ideia (ZIP 2007, consulte abaixo).

**As configurações FROST têm uma ressalva adicional.** Com o FROST, cada participante detém uma chave de gasto quântico (`qsk`), e um atacante quântico que a detenha poderá conseguir roubar. O ZIP 2005 recomenda mover fundos FROST para um protocolo totalmente pós-quântico com suporte de limiar, quando tal existir.

<br/>

## Propostas e investigação

Nenhuma destas está ativa.

- **Protocolo de Recuperação.** O mecanismo que permitiria efetivamente gastar fundos Ironwood após a mudança. Delineado no ZIP 2005, não especificado.
- **ZIP 2007, recuperabilidade para alguns endereços transparentes.** Apenas um número ZIP reservado, com discussão em [zips#1302](https://github.com/zcash/zips/issues/1302). A ideia é que saídas P2PKH e P2SH cujas chaves públicas nunca foram reveladas poderiam ser recuperáveis, com garantias mais fracas do que Ironwood.
- **Privacidade pós-quântica para endereços conhecidos.** Em aberto desde 2022 em [zips#1133](https://github.com/zcash/zips/issues/1133), que observa que o Zcash "já se destina a ter privacidade pós-quântica" quando os endereços são mantidos secretos e pergunta como estender isso a endereços conhecidos, por exemplo com um esquema pós-quântico de encapsulamento de chaves como Kyber (agora ML-KEM). Em junho de 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) propôs um ZIP para documentar as propriedades atuais de privacidade e possíveis correções.
- **Projeto Tachyon.** Uma atualização de escalabilidade proposta. O seu site afirma que obteria "privacidade pós-quântica completa" como efeito secundário, ao mover a entrega de pagamentos para fora da cadeia e usar troca de chaves pós-quântica. A sua biblioteca de dados com provas, Ragu, é descrita como "ainda em construção". Consulte [Projeto Tachyon](/zcash-tech/project-tachyon).
- **Um Zcash totalmente pós-quântico.** Provas, assinaturas e compromissos pós-quânticos em conjunto. Acompanhado em [zips#1134](https://github.com/zcash/zips/issues/1134), aberto desde 2016. Não existe especificação nem cronograma.

<br/>

## Tabela de estado

Verificado pela última vez em 13 de setembro de 2026. O estado no cabeçalho de um ZIP e o seu estado na rede são coisas diferentes: o ZIP 2005 ainda diz "Proposed" no seu cabeçalho, apesar de as suas regras serem aplicadas na Mainnet desde julho de 2026.

| Item | Estado do ZIP | Estado da rede | Data | Fonte |
|---|---|---|---|---|
| Pool Ironwood com notas recuperáveis perante ataques quânticos (NU6.3) | ZIP 2005 Proposed, ZIP 229 e ZIP 258 Draft | **Ativado** na Mainnet | 28 jul. 2026, bloco 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard fechado a novo valor | ZIP 2006 Reserved, regras no ZIP 258 | **Ativado** na Mainnet | 28 jul. 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallets a mover fundos para Ironwood | Orientação no ZIP 2005, ZIP 318 e ZIP 326 (Draft) | Recomendado, depende da sua wallet | Desde 28 jul. 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocolo de Recuperação | Delineado apenas dentro do ZIP 2005 | **Não implementado** | Sem data | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Desativação de Orchard e Sapling | Sem ZIP | **Não agendado** | Discussão Sapling desde abr. 2026 | [Fórum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Desativação de gastos Sprout (ZIP 2003) | Draft, candidato a NU7 | **Não ativado** | Sem data | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Recuperabilidade transparente (ZIP 2007) | Reserved | **Proposta** | ZIP reservado em 5 jul. 2025, discussão aberta em 17 jun. 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacidade pós-quântica para endereços conhecidos | Questões abertas, sem ZIP | **Investigação** | #1133 aberto em 18 ago. 2022, #1307 aberto em 23 jun. 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Projeto Tachyon | Sem ZIP | **Proposta**, em desenvolvimento | Publicado pela primeira vez em abr. 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocolo totalmente pós-quântico | Questão aberta, sem ZIP | **Trabalho futuro** | #1134 aberto em 28 mar. 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Na sondagem de opinião do Zcash Foundation em NU7 (fevereiro de 2026), a recuperabilidade quântica teve 90,5% de apoio dos ZCAP e 94,6% dos detentores de moedas, e o Tachyon teve apoio quase universal. Foram sondagens de opinião, não decisões sobre o que entra no NU7.

<br/>

## O que pode fazer agora

- **Mova os seus fundos para Ironwood.** As notas Sapling e Orchard nunca serão recuperáveis. Mover valor entre pools revela o montante na cadeia, pelo que o ZIP 318 recomenda que as wallets dividam os saldos em montantes fixos e os enviem ao longo do tempo. Deixe a sua wallet fazê-lo, em vez de mover tudo de uma vez.
- **Não publique endereços blindados de que não necessita.** A privacidade contra um futuro atacante quântico depende de ele não conhecer o seu endereço. Os endereços unificados são baratos de gerar, por isso dê um novo a cada pagador. O ZIP 229 recomenda a rotação de endereços por esta razão.
- **Não reutilize endereços transparentes.** Depois de gastar a partir de um, a sua chave pública fica na cadeia para sempre.
- **Mantenha a sua frase-semente segura.** No Protocolo de Recuperação tal como delineado, um gasto de recuperação tem de provar que conhece a sua chave de gasto, e as wallets normais derivam essa chave da semente.
- **Ignore alegações de que "Zcash é à prova de computação quântica".** Ainda não é, e as pessoas que escrevem as especificações afirmam-no.

<br/>

## Equívocos comuns

- **"O Ironwood é pós-quântico."** Não. Utiliza a mesma criptografia Orchard, e o ZIP 2005 afirma que a funcionalidade "não torna o protocolo Orchard seguro contra ataques quânticos".
- **"Recuperável perante ataques quânticos significa seguro contra computadores quânticos hoje."** Não. Significa que os fundos Ironwood poderiam ser recuperados após uma futura mudança, desde que essa mudança aconteça a tempo.
- **"O Zcash blindado já tem privacidade pós-quântica."** Apenas quando o atacante não conhece o seu endereço. Os endereços conhecidos estão expostos em todos os pools.
- **"O Tachyon já adicionou privacidade pós-quântica."** O Tachyon é uma proposta. Nada dele está ativo.
- **"Os computadores quânticos quebram todas as partes do Zcash."** As funções hash são apenas enfraquecidas, e não quebradas, pelos ataques quânticos conhecidos. A recuperabilidade quântica baseia-se precisamente nessa diferença.

<br/>

## Páginas relacionadas

- [Segurança Pós-Quântica no Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [O Torniquete](/zcash-tech/the-turnstile)
- [Projeto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools Blindados](/using-zcash/shielded-pools)

<br/>

## Fontes

- [ZIP 2005: Ironwood Recuperabilidade Quântica](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato de Transação Versão 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Implementação da Atualização de Rede NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migração de Orchard para Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Consequências da NU6.3 para Wallets](https://zips.z.cash/zip-0326)
- [ZIP 2003: Não permitir transações da versão 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Proibir Saldos Negativos de Pools de Valor Blindado na Cadeia](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilidade quântica de um subconjunto do protocolo transparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacidade pós-quântica para Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacidade do Zcash contra adversários quânticos e capazes de quebrar logaritmos discretos](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash totalmente pós-quântico](https://github.com/zcash/zips/issues/1134)
- [Roteiro do Projeto Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Resultados da Sondagem: O Que Ouvimos e Para Onde Vamos a Seguir](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloco 3,428,143 no Blockchair](https://blockchair.com/zcash/block/3428143)
- [Pedido no fórum: O Zcash é pós-quântico?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
