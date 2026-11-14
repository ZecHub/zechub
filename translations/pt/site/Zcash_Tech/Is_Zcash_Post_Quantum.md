<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# O Zcash é pós-quântico?

## Resposta curta

Não, ainda não.

Desde a atualização Ironwood, o Zcash é **recuperável no cenário quântico** para fundos mantidos na pool Ironwood. Esse é um passo real, mas não é a mesma coisa que ter segurança pós-quântica. A ZIP 2005, a especificação por trás disso, diz isso diretamente: a mudança "não torna, por si só, o protocolo seguro contra adversários quânticos". Ela prepara os fundos Ironwood para que possam ser movidos por meio de um futuro Protocolo de Recuperação quando a criptografia atual for desativada.

Esta página separa o que o Zcash protege hoje, o que a Ironwood mudou, o que ainda está exposto e o que é apenas uma proposta. A [tabela de status](#status-table) perto do final mostra a situação de cada item e quando ela foi verificada pela última vez.

<br/>

## Para quem é esta página

- Qualquer pessoa que viu "recuperável no cenário quântico" e entendeu como "à prova de computação quântica"
- Detentores decidindo se devem mover fundos para Ironwood
- Redatores e moderadores que precisam de uma resposta com fontes para indicar às pessoas

Para uma introdução à computação quântica em si, comece por [Segurança pós-quântica no Zcash](/zcash-tech/post-quantum-security).

<br/>

## Por que a pergunta é confusa

"Pós-quântico" é usado como se fosse uma única propriedade. No caso do Zcash, são pelo menos quatro perguntas separadas, e elas têm respostas diferentes:

1. **Privacidade.** Um atacante quântico consegue ver quem pagou quem e quanto?
2. **Gasto.** Um atacante quântico consegue gastar moedas que não são dele?
3. **Inflação.** Um atacante quântico consegue criar ZEC do nada?
4. **Recuperação.** Se a criptografia atual precisar ser desativada, os usuários honestos ainda conseguem retirar seus fundos?

A Ironwood só muda a resposta da quarta pergunta, e apenas para notes na pool Ironwood.

A ameaça por trás de tudo isso é um atacante capaz de calcular logaritmos discretos nas curvas elípticas que o Zcash usa. Um computador quântico grande o suficiente executando o algoritmo de Shor seria uma forma de fazer isso. A ZIP 2005 destaca que encontrar um **único** logaritmo discreto é suficiente para causar inflação arbitrária ou roubar fundos.

<br/>

## O que o Zcash protege hoje

Esta tabela descreve o protocolo como ele funciona agora, diante de um atacante capaz de quebrar logaritmos discretos. Ela se aplica a todas as pools blindadas, incluindo Ironwood, porque Ironwood usa o mesmo circuito Orchard, as mesmas provas Halo 2 e as mesmas assinaturas RedPallas que Orchard.

| Propriedade | Contra um atacante quântico hoje | O que a Ironwood mudou |
|---|---|---|
| Privacidade | Se mantém se o atacante não conhece seu endereço blindado. As provas e as assinaturas rerrandomizadas não vazam nada além disso. Se o atacante conhece o endereço, ele pode descriptografar as notes enviadas a ele, incluindo as antigas salvas da chain. | Nada. ZIP 2005: "A situação com relação à privacidade não muda para nenhuma pool." |
| Gasto | Não protegido. Um atacante poderia forjar provas ou assinaturas de gasto e roubar de qualquer pool blindada, mesmo de endereços que nunca viu. | Nada ainda. A proteção só chega após uma futura transição para o Protocolo de Recuperação. |
| Inflação | Não protegido. Um atacante poderia forjar uma prova aparentemente válida e criar ZEC dentro de qualquer pool blindada, possivelmente sem que ninguém perceba. O único limite é a [catraca](/zcash-tech/the-turnstile): nenhuma pool pode pagar mais do que seu saldo registrado. | Nada ainda. As notes Ironwood agora se comprometem com todo o seu conteúdo de uma forma que um atacante quântico não deveria conseguir falsificar, que é o que um futuro Protocolo de Recuperação precisa para manter a oferta íntegra. |
| Recuperação | As notes Sprout, Sapling e Orchard não têm caminho de recuperação. Quando seus protocolos forem desativados, qualquer coisa que restar nelas ficará inacessível. | Toda note Ironwood é recuperável, em princípio. Nenhuma note Sapling ou Orchard é. |

O ZEC transparente é um caso à parte. Suas assinaturas ECDSA podem ser forjadas assim que a chave pública é conhecida. Em um endereço transparente comum, isso acontece na primeira vez que você gasta a partir dele, e também existe uma janela curta enquanto uma transação aguarda confirmação na mempool. A ZIP 2005 não muda nada disso.

<br/>

## O que a Ironwood mudou

A Ironwood é a atualização da rede NU6.3. Ela foi ativada na Mainnet no bloco 3.428.143, em 28 de julho de 2026. Seu objetivo principal era a integridade da oferta após o bug de solidez do Orchard (veja a página [Ironwood](/zcash-tech/ironwood)), e a recuperabilidade quântica da ZIP 2005 foi lançada como parte dela.

- **Um novo formato de note.** Toda note de saída Ironwood usa o formato recuperável no cenário quântico (byte inicial do texto simples da note `0x03`). A aleatoriedade da note agora é derivada de todos os seus campos, de modo que a note fica vinculada ao seu conteúdo por um hash, e não apenas pela matemática de curvas elípticas.
- **Um caminho de recuperação apenas para notes Ironwood.** A ZIP 326 deixa explícito que toda note Ironwood é recuperável e nenhuma note Orchard é. Nenhuma configuração de carteira muda isso.
- **Orchard deixou de receber novo valor.** As recompensas Coinbase não podem mais ir para Orchard, e Orchard não pode mais enviar para um endereço Orchard diferente, então o novo valor blindado vai para Ironwood.
- **As carteiras são orientadas a mover tudo.** A ZIP 2005 diz que as carteiras DEVERIAM mover todos os fundos que controlam, incluindo fundos transparentes, Sprout e Sapling, para notes Ironwood assim que for viável, e continuar fazendo isso à medida que novos fundos chegam.

O que a Ironwood não mudou: a criptografia usada hoje para gastos e provas, a criptografia das notes e nada relacionado ao ZEC transparente.

<br/>

## Limitações que permanecem

**Existe uma janela de exposição.** Desde a ativação da Ironwood até a desativação dos protocolos antigos, um atacante quântico ainda poderia roubar, inflar ou bloquear fundos em todas as pools blindadas. A ZIP 2005 chama isso de "período crítico de exposição" e alerta que um ataque durante esse período ainda poderia prejudicar a capacidade de um detentor de recuperar seus fundos depois. É por isso que ela diz que o Zcash precisa desativar Orchard, Sapling e Sprout **antes** que ataques quânticos se tornem viáveis.

**A desativação não tem data, exceto para Sprout.** Nenhuma ZIP agenda a desativação de Orchard ou Sapling. Sprout é diferente: a [ZIP 259](https://zips.z.cash/zip-0259) lista a ZIP 2003 entre as mudanças que a NU7 implanta, então, desde a ativação da NU7, as transações da versão 4 são inválidas e qualquer ZEC que tenha ficado na pool Sprout não pode ser gasto. A NU7 foi ativada na Mainnet no bloco 3.543.405, em 6 de novembro de 2026 UTC ([ZIP 259](https://zips.z.cash/zip-0259), [anúncio no fórum](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Uma discussão sobre tornar Sapling somente para saques começou no fórum em abril de 2026.

**O Protocolo de Recuperação não está pronto.** A ZIP 2005 apenas o esboça e diz que os detalhes "estão sujeitos a mudanças". Nada dele foi implantado.

**Coletar agora, descriptografar depois.** Os textos cifrados das notes de Ironwood, Orchard, Sapling e Sprout são todos públicos na chain. Alguém pode salvá-los hoje e descriptografá-los depois, se também conhecer o endereço de recebimento. Todo endereço que você publica ou fornece faz parte desse risco. A ZIP 2005 diz que "outras mudanças no protocolo estão sendo consideradas" para transferências futuras.

**Fundos transparentes não estão cobertos.** Endereços a partir dos quais já houve gastos, ou que foram reutilizados, têm chaves públicas expostas. A recuperabilidade de alguns endereços transparentes ainda é apenas uma ideia (ZIP 2007, veja abaixo).

**Configurações com FROST têm uma ressalva extra.** Com FROST, cada participante detém uma chave de gastos quântica (`qsk`), e um atacante quântico que a detenha pode conseguir roubar. A ZIP 2005 recomenda mover os fundos de FROST para um protocolo totalmente pós-quântico com suporte a limiar assim que existir um.

<br/>

## Propostas e pesquisa

Nada disto está ativo.

- **Protocolo de Recuperação.** O mecanismo que de fato permitiria gastar fundos Ironwood após a transição. Esboçado na ZIP 2005, não especificado.
- **ZIP 2007, recuperabilidade para alguns endereços transparentes.** Apenas um número de ZIP reservado, com discussão em [zips#1302](https://github.com/zcash/zips/issues/1302). A ideia é que saídas P2PKH e P2SH cujas chaves públicas nunca foram reveladas poderiam ser recuperáveis, com garantias mais fracas do que Ironwood.
- **Privacidade pós-quântica para endereços conhecidos.** Em aberto desde 2022 em [zips#1133](https://github.com/zcash/zips/issues/1133), que observa que Zcash "já foi concebido para ter privacidade pós-quântica" quando os endereços são mantidos em segredo e pergunta como estender isso a endereços conhecidos, por exemplo com um esquema de encapsulamento de chaves pós-quântico como o Kyber (hoje ML-KEM). Em junho de 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) propôs uma ZIP para documentar as propriedades de privacidade atuais e possíveis correções.
- **Projeto Tachyon.** Uma proposta de atualização de escalabilidade. Seu site diz que ela obteria "privacidade pós-quântica completa" como efeito colateral, ao tirar a entrega de pagamentos da chain e usar troca de chaves pós-quântica. Sua biblioteca de dados portadores de prova, Ragu, é descrita como "ainda em construção". Veja [Projeto Tachyon](/zcash-tech/project-tachyon).
- **Um Zcash totalmente pós-quântico.** Provas, assinaturas e compromissos pós-quânticos em conjunto. Acompanhado em [zips#1134](https://github.com/zcash/zips/issues/1134), em aberto desde 2016. Não há especificação nem cronograma.

<br/>

## Tabela de status

Verificada pela última vez em 13 de setembro de 2026, exceto a linha de Sprout, que foi atualizada em 13 de novembro de 2026, após a ativação da NU7. O status no cabeçalho de uma ZIP e seu status na rede são coisas diferentes: a ZIP 2005 ainda diz "Proposed" no cabeçalho, embora suas regras sejam aplicadas na Mainnet desde julho de 2026.

| Item | Status da ZIP | Status na rede | Data | Fonte |
|---|---|---|---|---|
| Pool Ironwood com notes recuperáveis no cenário quântico (NU6.3) | ZIP 2005 Proposed, ZIP 229 e ZIP 258 Draft | **Ativada** na Mainnet | 28 jul 2026, bloco 3.428.143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard fechada a novo valor | ZIP 2006 Reserved, regras na ZIP 258 | **Ativada** na Mainnet | 28 jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Carteiras movendo fundos para Ironwood | Orientação na ZIP 2005, ZIP 318 e ZIP 326 (Draft) | Recomendado, depende da sua carteira | Desde 28 jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Protocolo de Recuperação | Esboçado apenas dentro da ZIP 2005 | **Não implementado** | Sem data | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Desativação de Orchard e Sapling | Nenhuma ZIP | **Não agendada** | Discussão sobre Sapling desde abr 2026 | [Fórum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Desativação de gastos Sprout (ZIP 2003) | Proposed, implantada pela NU7 segundo a ZIP 259 (Proposed) | **Ativada** na Mainnet | 6 nov 2026, bloco 3.543.405 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Recuperabilidade transparente (ZIP 2007) | Reserved | **Proposta** | ZIP reservada em 5 jul 2025, discussão aberta em 17 jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Privacidade pós-quântica para endereços conhecidos | Issues em aberto, nenhuma ZIP | **Pesquisa** | #1133 aberta em 18 ago 2022, #1307 aberta em 23 jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Projeto Tachyon | Nenhuma ZIP | **Proposta**, em desenvolvimento | Publicado pela primeira vez em abr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocolo totalmente pós-quântico | Issue em aberto, nenhuma ZIP | **Trabalho futuro** | #1134 aberta em 28 mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Na pesquisa de opinião NU7 da Zcash Foundation (fevereiro de 2026), a recuperabilidade quântica teve 90,5% de apoio do ZCAP e 94,6% dos detentores de moedas, e Tachyon teve apoio quase unânime. Essas foram pesquisas de opinião, não decisões sobre o que entra na NU7.

<br/>

## O que você pode fazer agora

- **Mova seus fundos para Ironwood.** As notes Sapling e Orchard nunca serão recuperáveis. Mover valor entre pools mostra o valor on-chain, por isso a ZIP 318 faz as carteiras dividirem os saldos em valores fixos e enviá-los aos poucos ao longo do tempo. Deixe sua carteira fazer isso, em vez de mover tudo de uma vez.
- **Não publique endereços blindados sem necessidade.** A privacidade contra um futuro atacante quântico depende de ele não conhecer seu endereço. Endereços unificados são fáceis de gerar, então dê um novo para cada pagador. A ZIP 229 recomenda a rotação de endereços por esse motivo.
- **Não reutilize endereços transparentes.** Depois que você gasta a partir de um deles, a chave pública dele fica na chain para sempre.
- **Guarde bem sua frase semente.** No Protocolo de Recuperação, da forma como foi esboçado, um gasto de recuperação precisa provar que você conhece sua chave de gastos, e as carteiras comuns derivam essa chave da frase semente.
- **Ignore afirmações de que "o Zcash é à prova de computação quântica".** Ainda não é, e as pessoas que escrevem as especificações dizem isso.

<br/>

## Equívocos comuns

- **"Ironwood é pós-quântico."** Não. Ele usa a mesma criptografia do Orchard, e a ZIP 2005 diz que o recurso "não torna o protocolo Orchard seguro contra ataques quânticos".
- **"Recuperável no cenário quântico significa seguro contra computadores quânticos hoje."** Não. Significa que os fundos Ironwood poderiam ser recuperados após uma transição futura, desde que essa transição aconteça a tempo.
- **"O Zcash blindado já tem privacidade pós-quântica."** Somente quando o atacante não conhece seu endereço. Endereços conhecidos ficam expostos em todas as pools.
- **"Tachyon já adicionou privacidade pós-quântica."** Tachyon é uma proposta. Nada dele está ativo.
- **"Computadores quânticos quebram todas as partes do Zcash."** As funções de hash são apenas enfraquecidas, não quebradas, pelos ataques quânticos conhecidos. A recuperabilidade quântica depende justamente dessa diferença.

<br/>

## Páginas relacionadas

- [Segurança pós-quântica no Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [A catraca](/zcash-tech/the-turnstile)
- [Projeto Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools blindadas](/using-zcash/shielded-pools)

<br/>

## Fontes

- [ZIP 2005: Recuperabilidade quântica do Ironwood](https://zips.z.cash/zip-2005)
- [ZIP 229: Formato de transação da versão 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Implantação da atualização da rede NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Migração de Orchard para Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Consequências da NU6.3 para carteiras](https://zips.z.cash/zip-0326)
- [ZIP 2003: Proibir transações da versão 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Proibir saldos negativos nas pools de valor da chain blindada](https://zips.z.cash/zip-0209)
- [zips#1302: Recuperabilidade quântica de um subconjunto do protocolo transparente](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Privacidade pós-quântica para Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacidade do Zcash contra adversários quânticos e capazes de quebrar logaritmos discretos](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash totalmente pós-quântico](https://github.com/zcash/zips/issues/1134)
- [Roteiro do Projeto Tachyon](https://tachyon.z.cash/roadmap/)
- [Resultados da pesquisa NU7: o que ouvimos e para onde vamos a partir daqui](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Bloco 3.428.143 no ZecBlock](https://zecblock.com/block/3428143)
- [Pedido no fórum: o Zcash é pós-quântico?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
