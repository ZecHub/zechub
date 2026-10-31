<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# O Zcash é pós-quântico?

## Resposta curta

Não, ainda não.

Desde a atualização Ironwood, o Zcash é **recuperável contra ataques quânticos** para fundos mantidos no pool Ironwood. É um passo real, mas não é o mesmo que ter segurança pós-quântica. O ZIP 2005, a especificação por trás disso, afirma isso diretamente: a alteração "não torna, por si só, o protocolo seguro contra adversários quânticos". Ela prepara os fundos Ironwood para que possam ser movidos por meio de um futuro Protocolo de Recuperação quando a criptografia atual for desativada.

Esta página separa o que o Zcash protege hoje, o que o Ironwood mudou, o que ainda está exposto e o que é apenas uma proposta. A [tabela de status](#status-table) perto do fim mostra em que situação está cada parte e quando isso foi verificado pela última vez.

<br/>

## Para quem é isto

- Qualquer pessoa que tenha visto "quantum-recoverable" e entendido "quantum-proof"
- Detentores que estão decidindo se devem mover fundos para o Ironwood
- Autores e moderadores que precisam de uma resposta com fontes para indicar às pessoas

Para entender a computação quântica em si, comece por [Segurança pós-quântica no Zcash](/zcash-tech/post-quantum-security).

<br/>

## Por que a pergunta é confusa

"Pós-quântico" é usado como se fosse uma única propriedade. Para o Zcash, são pelo menos quatro questões distintas, e elas têm respostas diferentes:

1. **Privacidade.** Um atacante quântico consegue ver quem pagou a quem e quanto?
2. **Gastos.** Um atacante quântico consegue gastar moedas que não são dele?
3. **Inflação.** Um atacante quântico consegue criar ZEC do nada?
4. **Recuperação.** Se a criptografia atual tiver de ser desativada, os usuários honestos ainda conseguem retirar seus fundos?

O Ironwood só altera a resposta à quarta questão, e apenas para notes no pool Ironwood.

A ameaça por trás de tudo isso é um atacante que consegue calcular logaritmos discretos nas curvas elípticas que o Zcash usa. Um computador quântico suficientemente grande executando o algoritmo de Shor seria uma forma de fazer isso. O ZIP 2005 destaca que encontrar um **único** logaritmo discreto é suficiente para causar inflação arbitrária ou roubar fundos.

<br/>

## O que o Zcash protege hoje

Esta tabela descreve o protocolo como ele funciona agora, contra um atacante capaz de quebrar logaritmos discretos. Ela se aplica a todos os pools blindados, incluindo o Ironwood, porque o Ironwood usa o mesmo circuito Orchard, provas Halo 2 e assinaturas RedPallas que o Orchard.

| Propriedade | Contra um atacante quântico hoje | O que o Ironwood mudou |
|---|---|---|
| Privacidade | Mantém-se se o atacante não conhecer seu endereço blindado. As provas e as assinaturas rerandomizadas não revelam nada adicional. Se o atacante conhecer o endereço, ele pode descriptografar as notes enviadas para ele, incluindo notes antigas salvas da chain. | Nada. ZIP 2005: "A situação em relação à Privacidade permanece inalterada para qualquer pool." |
| Gasto | Não protegido. Um atacante poderia falsificar provas ou assinaturas de gastos e roubar de qualquer pool blindado, até mesmo de endereços que nunca tenha visto. | Ainda nada. A proteção só chega após uma futura mudança para o Protocolo de Recuperação. |
| Inflação | Não protegida. Um atacante poderia falsificar uma prova com aparência válida e criar ZEC dentro de qualquer pool blindado, possivelmente sem que ninguém percebesse. O único limite é a [catraca](/zcash-tech/the-turnstile): nenhum pool pode pagar mais do que seu saldo registrado. | Ainda nada. As notes Ironwood agora se comprometem com todos os seus conteúdos de uma forma que um atacante quântico não deve conseguir falsificar, que é o que um futuro Protocolo de Recuperação precisa para manter a oferta íntegra. |
| Recuperação | As notes Sprout, Sapling e Orchard não têm caminho de recuperação. Depois que seus protocolos forem desativados, tudo o que restar nelas ficará inacessível. | Todas as notes Ironwood são recuperáveis em princípio. Nenhuma note Sapling ou Orchard é. |

O ZEC transparente é um caso separado. Suas assinaturas ECDSA podem ser falsificadas depois que a chave pública se torna conhecida. Em um endereço transparente normal, isso acontece na primeira vez que você gasta a partir dele, e também existe uma curta janela enquanto uma transação permanece não confirmada no mempool. O ZIP 2005 não altera nada disso.

<br/>

## O que o Ironwood mudou

O Ironwood é a atualização da rede NU6.3. Foi ativado na Mainnet no bloco 3,428,143 em 28 de julho de 2026. Seu principal objetivo era a integridade da oferta após o bug de solidez do Orchard (consulte a página [Ironwood](/zcash-tech/ironwood)), e a recuperabilidade quântica do ZIP 2005 foi incluída como parte dele.

- **Um novo formato de note.** Cada note de saída Ironwood usa o formato recuperável contra ataques quânticos (byte inicial do texto simples da note `0x03`). A aleatoriedade da note agora é derivada de todos os seus campos, portanto a note fica vinculada ao seu conteúdo por um hash, e não apenas pela matemática de curva elíptica.
- **Um caminho de recuperação apenas para notes Ironwood.** O ZIP 326 deixa explícito que todas as notes Ironwood são recuperáveis e nenhuma note Orchard é. Uma configuração da carteira não altera isso.
- **O Orchard deixou de receber novo valor.** As recompensas Coinbase não podem mais ir para o Orchard, e o Orchard não pode mais enviar para um endereço Orchard diferente, portanto novo valor blindado chega ao Ironwood.
- **As carteiras são instruídas a mover tudo.** O ZIP 2005 afirma que as carteiras DEVEM mover todos os fundos que controlam, incluindo fundos transparentes, Sprout e Sapling, para notes Ironwood assim que for prático, e continuar fazendo isso à medida que novos fundos chegam.

O que o Ironwood não alterou: a criptografia usada atualmente para gastar e provar, a criptografia das notes e qualquer aspecto do ZEC transparente.

<br/>

## Limitações restantes

**Existe uma janela de exposição.** Da ativação do Ironwood até que os protocolos antigos sejam desativados, um atacante quântico ainda poderia roubar, inflacionar ou bloquear fundos em todos os pools blindados. O ZIP 2005 chama isso de "período crítico de exposição" e alerta que um ataque durante esse período ainda poderia prejudicar a capacidade de um detentor de recuperar fundos mais tarde. É por isso que afirma que o Zcash deve desativar Orchard, Sapling e Sprout **antes** que os ataques quânticos se tornem viáveis.

**A desativação não tem data, exceto para Sprout.** Nenhum ZIP agenda a desativação de Orchard ou Sapling. Sprout é diferente: [ZIP 259](https://zips.z.cash/zip-0259) lista o ZIP 2003 entre as alterações que NU7 implementa, portanto as transações da versão 4 se tornam inválidas assim que NU7 for ativado e qualquer ZEC que restar no pool Sprout se torna impossível de gastar. A ativação na Mainnet está definida para o bloco 3,543,405, prevista para 5 de novembro de 2026 ([ZIP 259](https://zips.z.cash/zip-0259), [anúncio no fórum](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Uma discussão sobre somente retiradas no Sapling começou no fórum em abril de 2026.

**O Protocolo de Recuperação não está concluído.** O ZIP 2005 apenas o descreve em linhas gerais e afirma que os detalhes "estão sujeitos a alterações". Nada sobre ele foi implementado.

**Coletar agora, descriptografar depois.** Os textos cifrados das notes para Ironwood, Orchard, Sapling e Sprout são todos públicos na chain. Alguém pode salvá-los hoje e descriptografá-los mais tarde, caso também conheça o endereço de recebimento. Cada endereço que você publica ou compartilha faz parte desse risco. O ZIP 2005 afirma que "outras alterações de protocolo estão sendo consideradas" para futuras transferências.

**Os fundos transparentes não estão cobertos.** Endereços a partir dos quais já foram gastos fundos, ou que foram reutilizados, têm chaves públicas expostas. A recuperabilidade para alguns endereços transparentes é, por enquanto, apenas uma ideia (ZIP 2007, consulte abaixo).

**Configurações FROST têm uma ressalva adicional.** Com o FROST, cada participante detém uma chave de gastos quântica (`qsk`), e um atacante quântico que a detenha pode conseguir roubar. O ZIP 2005 recomenda mover fundos FROST para um protocolo totalmente pós-quântico com suporte a limiar quando um existir.

<br/>

## Propostas e pesquisa

Nenhuma delas está ativa.

- **Protocolo de Recuperação.** O mecanismo que realmente permitiria que fundos Ironwood fossem gastos após a mudança. Descrito em linhas gerais no ZIP 2005, não especificado.
- **ZIP 2007, recuperabilidade para alguns endereços transparentes.** Apenas um número ZIP reservado, com discussão em [zips#1302](https://github.com/zcash/zips/issues/1302). A ideia é que saídas P2PKH e P2SH cujas chaves públicas nunca foram reveladas poderiam ser recuperáveis, com garantias mais fracas do que o Ironwood.
- **Privacidade pós-quântica para endereços conhecidos.** Em aberto desde 2022 em [zips#1133](https://github.com/zcash/zips/issues/1133), que observa que o Zcash "já foi projetado para ter privacidade pós-quântica" quando os endereços são mantidos secretos e pergunta como estender isso a endereços conhecidos, por exemplo com um esquema pós-quântico de encapsulamento de chaves como Kyber (agora ML-KEM). Em junho de 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) propôs um ZIP para documentar as propriedades atuais de privacidade e possíveis correções.
- **Projeto Tachyon.** Uma atualização de escalabilidade proposta. Seu site afirma que obteria "privacidade pós-quântica completa" como efeito colateral, ao mover a entrega de pagamentos para fora da chain e usar troca de chaves pós-quântica. Sua biblioteca de dados que carregam provas, Ragu, é descrita como "ainda em construção". Consulte [Projeto Tachyon](/zcash-tech/project-tachyon).
- **Um Zcash totalmente pós-quântico.** Provas, assinaturas e compromissos pós-quânticos em conjunto. Acompanhado em [zips#1134](https://github.com/zcash/zips/issues/1134), aberto desde 2016. Não há especificação nem cronograma.

<br/>

## Tabela de status

Verificado pela última vez em 13 de setembro de 2026, exceto a linha Sprout, que foi atualizada em 9 de outubro de 2026. O status no cabeçalho de um ZIP e seu status na rede são coisas diferentes: o ZIP 2005 ainda diz "Proposed" em seu cabeçalho, embora suas regras sejam aplicadas na Mainnet desde julho de 2026.

| Item | Status do ZIP | Status da rede | Data | Fonte |
|---|---|---|---|---|
| Pool Ironwood com notes recuperáveis por meios quânticos (NU6.3) | ZIP 2005 Proposta, ZIP 229 e ZIP 258 Rascunho | **Ativado** na Mainnet | 28 jul 2026, bloco 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard fechado para novo valor | ZIP 2006 Reservado, regras no ZIP 258 | **Ativado** na Mainnet | 28 jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Carteiras movendo fundos para Ironwood | Orientação no ZIP 2005, ZIP 318 e ZIP 326 (Rascunho) | Recomendado, depende da sua carteira | Desde 28 jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocolo de recuperação | Descrito em linhas gerais apenas no ZIP 2005 | **Não implementado** | Sem data | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Desativação de Orchard e Sapling | Sem ZIP | **Não agendado** | Discussão sobre Sapling desde abr 2026 | [Fórum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Desativação de gastos Sprout (ZIP 2003) | Proposta, implementado por NU7 de acordo com o ZIP 259 (Proposta) | **Não ativado** | Altura da Mainnet 3,543,405, prevista para 5 nov 2026 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Recuperabilidade transparente (ZIP 2007) | Reservado | **Proposta** | ZIP reservado em 5 jul 2025, discussão aberta em 17 jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacidade pós-quântica para endereços conhecidos | Questões abertas, sem ZIP | **Pesquisa** | #1133 aberto em 18 ago 2022, #1307 aberto em 23 jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Projeto Tachyon | Sem ZIP | **Proposta**, em desenvolvimento | Publicado pela primeira vez em abr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocolo totalmente pós-quântico | Questão aberta, sem ZIP | **Trabalho futuro** | #1134 aberto em 28 mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Na pesquisa de opinião da Zcash Foundation sobre NU7 (fevereiro de 2026), a recuperabilidade quântica teve 90,5% de apoio do ZCAP e 94,6% dos detentores de moedas, e o Tachyon teve apoio quase universal. Foram pesquisas de opinião, não decisões sobre o que entra no NU7.

<br/>

## O que você pode fazer agora

- **Mova seus fundos para o Ironwood.** As notes Sapling e Orchard nunca serão recuperáveis. Mover valor entre pools revela o valor on-chain, portanto o ZIP 318 recomenda que as carteiras dividam os saldos em valores fixos e os enviem ao longo do tempo. Deixe sua carteira fazer isso em vez de mover tudo de uma vez.
- **Não publique endereços blindados de que você não precisa.** A privacidade contra um futuro atacante quântico depende de ele não conhecer seu endereço. Endereços unificados são baratos de gerar, então dê um novo a cada pagador. O ZIP 229 recomenda a rotação de endereços por esse motivo.
- **Não reutilize endereços transparentes.** Depois que você gasta a partir de um deles, sua chave pública fica na chain para sempre.
- **Mantenha sua frase semente segura.** No Protocolo de Recuperação conforme descrito em linhas gerais, um gasto de recuperação precisa provar que você conhece sua chave de gastos, e as carteiras normais derivam essa chave da semente.
- **Ignore alegações de que "Zcash é à prova de computação quântica".** Ainda não é, e as pessoas que escrevem as especificações afirmam isso.

<br/>

## Equívocos comuns

- **"O Ironwood é pós-quântico."** Não. Ele usa a mesma criptografia Orchard, e o ZIP 2005 afirma que o recurso "não torna o protocolo Orchard seguro contra ataques quânticos".
- **"Recuperável contra ataques quânticos significa seguro contra computadores quânticos hoje."** Não. Significa que os fundos Ironwood poderiam ser recuperados após uma futura mudança, desde que essa mudança aconteça a tempo.
- **"O Zcash blindado já tem privacidade pós-quântica."** Apenas quando o atacante não conhece seu endereço. Endereços conhecidos estão expostos em todos os pools.
- **"O Tachyon já adicionou privacidade pós-quântica."** O Tachyon é uma proposta. Nada dele está ativo.
- **"Os computadores quânticos quebram todas as partes do Zcash."** As funções hash são apenas enfraquecidas, e não quebradas, pelos ataques quânticos conhecidos. A recuperabilidade quântica se baseia exatamente nessa diferença.

<br/>

## Páginas relacionadas

- [Segurança pós-quântica no Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [A catraca](/zcash-tech/the-turnstile)
- [Projeto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools blindados](/using-zcash/shielded-pools)

<br/>

## Fontes

- [ZIP 2005: Recuperabilidade quântica do Ironwood](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato de transação versão 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Implementação da atualização da rede NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migração de Orchard para Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Consequências da NU6.3 para carteiras](https://zips.z.cash/zip-0326)
- [ZIP 2003: Não permitir transações da versão 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Proibir saldos negativos de pools de valor blindado na chain](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilidade quântica de um subconjunto do protocolo transparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacidade pós-quântica para o Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacidade do Zcash contra adversários quânticos e capazes de quebrar logaritmos discretos](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash totalmente pós-quântico](https://github.com/zcash/zips/issues/1134)
- [Roteiro do projeto Tachyon](https://tachyon.z.cash/roadmap/)
- [Resultados da sondagem da NU7: o que ouvimos e para onde vamos a partir daqui](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloco 3,428,143 no ZecBlock](https://zecblock.com/block/3428143)
- [Pedido no fórum: O Zcash é pós-quântico?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
