<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Votação blindada de detentores de moedas

> Em agosto de 2026, o Zcash realizou uma consulta aos detentores de moedas na qual as cédulas permaneceram criptografadas e apenas os totais finais foram revelados, usando um protocolo de votação blindada desenvolvido por Valar Group.

O que você aprenderá: como um voto pode ser ponderado pela quantidade de ZEC que você possui, mantido privado e ainda assim contado corretamente, sem que ninguém descubra como você votou ou quanto possui.

A votação blindada de detentores de moedas permite que os detentores de Zcash votem em questões do ecossistema usando seus ZEC blindados. Ninguém descobre em que cada indivíduo votou nem quanto ZEC possui, mas qualquer pessoa pode auditar se os totais estão corretos. Ela funciona em uma chain de votação dedicada desenvolvida por Valar Group, separada da mainnet do Zcash, para que seus fundos reais nunca sejam movimentados. Para saber como o Zcash toma decisões de forma mais ampla, consulte a visão geral de [Financiamento e governança do Zcash](../zcash-community/zcash-governance). Esta página trata apenas do protocolo criptográfico de votação.

Você é novo no Zcash? Comece por [O que são ZEC e Zcash](../start-here/what-is-zec-and-zcash), [Pools blindados](../using-zcash/shielded-pools) e [zk-SNARKs](../zcash-tech/zk-snarks), depois volte aqui.

![Fluxo de votação blindada: um eleitor prova seu saldo Ironwood em um snapshot, registra uma cédula criptografada dividida em partes, que são contabilizadas homomorficamente e então descriptografadas por limiar apenas em totais](/content-images/shielded-voting-flow.webp)

## Por que a votação privada é difícil

Uma boa votação de detentores de moedas busca quatro coisas ao mesmo tempo, e as formas óbvias de obtê-las entram em conflito.

1. Ponderação pela participação, para que possuir mais ZEC tenha mais peso.
2. Privacidade da escolha, para que ninguém saiba como você votou.
3. Privacidade do saldo, para que ninguém saiba quanto ZEC você possui.
4. Uma contagem correta e auditável que qualquer pessoa possa verificar.

Para ponderar pela participação, parece ser necessário conhecer o saldo de todos. Para contar as cédulas, parece ser necessário abri-las. Fazer qualquer uma dessas coisas de forma ingênua expõe precisamente a informação privada que um [pool blindado](../using-zcash/shielded-pools) existe para proteger, e votações anteriores de moedas revelaram informações sobre saldos por esse motivo. A votação blindada resolve essa tensão com as mesmas ferramentas que possibilitam pagamentos blindados: [provas de conhecimento zero](../zcash-tech/zk-snarks), nulificadores e criptografia.

## A intuição: uma urna que se conta sozinha

> Uma catraca permite contar o que passa por um cofre bancário sem ver seu interior. Uma urna blindada vai um passo além: soma votos lacrados sem nunca abri-los.

Imagine uma urna com três poderes incomuns. Ela pode adicionar um envelope lacrado a um total acumulado sem abri-lo. Um grupo de responsáveis, sem que nenhum deles detenha a chave sozinho, revela mais tarde apenas os totais finais. E, antes que você possa depositar um envelope, prova discretamente que possuía ZEC em um momento fixo no passado e que ainda não votou, sem mostrar quais moedas são suas. Tudo o que se segue explica como essa urna é realmente construída.

## Elegibilidade e o snapshot

Uma rodada de votação fixa uma altura de snapshot, um único bloco da mainnet do Zcash, e seu peso é seu saldo blindado disponível para gastar no pool [Ironwood](../zcash-tech/ironwood) nesse bloco. A regra é simples: um Ironwood ZEC no snapshot equivale a um voto. Para a consulta de escopo da NU7, o snapshot foi o bloco 3.459.350 da mainnet, por volta de 24 de agosto de 2026 às 19:00 UTC, com a votação aberta até 14 de setembro de 2026 às 19:00 UTC. O ZEC transparente é tratado separadamente pelo método mais antigo, não por este protocolo.

1. Seus fundos nunca são movimentados nem bloqueados. A elegibilidade é fixada no snapshot, então você pode gastar ou mover ZEC imediatamente depois sem afetar seu voto.
2. Não há etapa de registro. Uma altura de snapshot é tudo o que é necessário, o que mantém o processo simples e evita revelar quem pretende votar.

## Provando seu saldo sem revelá-lo

Quando você vota, sua carteira produz uma prova de conhecimento zero de que, no snapshot, você controlava algum ZEC blindado não gasto. Ela estabelece um saldo válido e seu valor para o mecanismo privado de contagem, mas não revela notes nem produz qualquer transação na mainnet do Zcash.

Essa prova cria um crédito de votação na chain de votação igual ao seu saldo no snapshot, pertencente a uma nova chave de votação que sua carteira gera apenas para esta rodada. Como a chave é nova e não está ligada aos seus endereços do Zcash, nada na chain de votação pode ser associado às suas notes reais. Sua identidade on-chain e sua cédula não são vinculáveis por construção.

## Evitando votos duplicados, de forma privada

Para impedir que alguém vote duas vezes com as mesmas moedas, o sistema precisa confirmar que as notes que sustentam seu saldo não foram gastas no snapshot. Na mainnet, isso é feito revelando o nulificador de uma note, seu marcador único de gasto, que os nós integrais verificam para detectar reutilização. Mas revelar seu nulificador aqui ligaria sua cédula diretamente às suas notes.

![Prevenção privada de voto duplo: em vez de revelar um nullifier, a carteira usa Private Information Retrieval para buscar o material da prova enquanto oculta qual nullifier foi consultado e, em seguida, prova que a note não foi gasta](/content-images/shielded-voting-pir.webp)

Assim, o protocolo prova o oposto de forma privada. Ele cria uma lista de todos os nulificadores já usados até o snapshot, e sua carteira prova em conhecimento zero que o nulificador da sua note não está nessa lista, demonstrando que a note não foi gasta sem revelar qual note é.

Resta um problema. Obter de um servidor a parte necessária dessa lista revelaria seu nulificador ao servidor, e a lista completa é grande, cerca de 2 GB para dados da era Orchard e muito maior à medida que o Zcash cresce. A [Recuperação privada de informação](../zcash-tech/private-information-retrieval) (PIR) resolve ambos: sua carteira obtém exatamente os dados de que precisa, ocultando criptograficamente quais dados solicitou. O resultado é verificado em relação a um resumo publicado da lista de nulificadores, então um servidor desonesto não consegue forjar um resultado falso.

## Depositando uma cédula criptografada

Para cada pergunta, sua carteira faz três coisas.

1. Criptografa o peso do seu voto para o comitê de contagem usando criptografia homomórfica, um tipo de criptografia cujos textos cifrados podem ser somados sem serem decifrados. É isso que permite à urna totalizar votos que ela não consegue ler.
2. Divide seu voto em 16 partes separadas, para que até mesmo um comitê totalmente conivente tenha dificuldade em reconstruir quanto cada pessoa votou.
3. Envia essas partes em momentos aleatórios por meio de vários servidores, para que um observador não consiga determinar, pelo momento em que chegam, que as partes pertencem ao mesmo eleitor.

Cada parte inclui sua própria prova de conhecimento zero de que é uma parte legítima de uma cédula válida, então ninguém pode adicionar votos sem respaldo. As partes verificadas são adicionadas homomorficamente ao total criptografado acumulado da resposta escolhida por você.

## Contando sem abrir nenhuma cédula

A contagem é realizada por uma autoridade eleitoral distribuída: pelo menos 10 validadores da chain de votação, nenhum dos quais consegue decifrar algo sozinho. No início de uma rodada, eles executam conjuntamente uma cerimônia de geração de chaves que produz uma chave de criptografia cuja chave de decifragem correspondente é dividida entre todos eles e nunca reunida em um só lugar.

> Nenhum responsável individual detém a chave. A urna só abre quando dois terços deles usam suas chaves em conjunto e, mesmo assim, revela apenas os totais.

Quando a rodada se encerra, os totais criptografados já existem graças à adição homomórfica acima. Cada validador publica uma decifragem parcial e uma prova de que decifrou corretamente. Assim que pelo menos dois terços contribuem, suas partes se combinam na contagem final em texto simples para cada pergunta, e nada mais é decifrado. Qualquer nó integral pode então verificar a prova de correção combinada, então o público pode verificar a contagem sem confiar nos validadores.

## Quem o administra e o que não pode fazer

O projeto separa duas funções para que nenhum grupo detenha poder excessivo.

![Separação de poderes: uma multisig coordenadora define quais perguntas aparecem, mas não pode ver os votos, enquanto um conjunto de validadores contabiliza os votos, mas não pode ler as cédulas individuais nem falsificar uma apuração](/content-images/shielded-voting-roles.webp)

A multisig coordenadora é um grupo de 2 em 5 com representantes do Projeto Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) e Valar Group. Ela decide quais perguntas chegam à chain e atesta a chave de criptografia de cada rodada, mas não consegue ver, alterar ou bloquear votos individuais. Qualquer pessoa que não goste das perguntas pode executar sua própria chain de votação, pois o software é aberto e sem permissão.

Os validadores são os pelo menos 10 nós que detêm a chave de decifragem dividida e realizam a decifragem por limiar. Eles não conseguem decifrar cédulas individuais nem fabricar uma contagem falsa, porque cada decifragem inclui uma prova pública de correção.

## Para que serve o quórum

Os organizadores definem um limiar de participação: os resultados da consulta são considerados representativos dos detentores de moedas apenas se pelo menos 1.000.000 ZEC participarem de pelo menos uma pergunta, incluindo abstenções. O quórum não decide nenhuma pergunta nem é aplicado por pergunta. É uma única verificação para toda a consulta, então um resultado só é levado a sério quando participa uma quantidade substancial de ZEC. Abaixo desse nível, o resultado não é considerado um sinal significativo.

## Contra o que este protocolo não protege

Deixar claros os limites faz parte de compreender o projeto.

1. É um sinal, não uma decisão vinculativa. Uma consulta a detentores de moedas mede o sentimento ponderado pela participação e alimenta o processo normal de [governança](../zcash-community/zcash-governance) do Zcash, em vez de substituí-lo.
2. É ponderado por moedas, então a influência acompanha as posses. Menos obstáculos podem aumentar a participação, mas não alteram a concentração de ZEC.
3. A agenda é definida pela multisig coordenadora, que escolhe quais perguntas aparecem. Ela não pode tocar nos votos, e qualquer pessoa pode executar uma chain concorrente, mas a definição da agenda continua sendo um ponto de influência.
4. A contagem precisa de validadores online. Produzir a contagem requer que pelo menos dois terços cooperem, então uma grande indisponibilidade ou recusa coordenada pode atrasar um resultado.
5. A privacidade do saldo sob conivência total é uma defesa em profundidade, não um teorema. Se todo o comitê reconstruísse secretamente a chave, a divisão em partes e o envio temporizado seriam o que protegeria seu saldo, e os criadores reconhecem que essas medidas são mais fracas sob conivência. A análise sofisticada de tráfego é um risco residual.
6. Há mais partes móveis do que no projeto anterior. Servidores PIR, servidores de envio, uma nova chave de votação e provas em várias etapas são, cada um, um local onde podem surgir bugs ou configurações incorretas. O sistema é open source e partes dele foram auditadas de forma independente, o que gerencia esse risco em vez de eliminá-lo.

O que ele protege, de forma forte e verificável, são as duas coisas mais importantes: sua cédula não pode ser vinculada à sua identidade, e apenas os totais finais são revelados.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Voting chain | Uma blockchain separada, desenvolvida por Valar Group, que executa a votação; suas notes do Zcash nunca são movidas para ela |
| Snapshot height | O bloco da mainnet cujos saldos definem o peso de votação (bloco 3.459.350 para a consulta NU7) |
| Nullifier | O marcador único de gasto de uma note; revelá-lo ligaria uma cédula a uma note, então a votação prova a não inclusão em vez disso |
| Private Information Retrieval (PIR) | Obter dados de um servidor ocultando quais dados você solicitou |
| Homomorphic encryption | Criptografia cujos textos cifrados podem ser somados sem serem decifrados |
| Coordinator multisig | O grupo de 2 em 5 que autoriza as perguntas e a chave da rodada, mas não consegue ver nem alterar votos |
| Election authority | Os 10 ou mais validadores que detêm conjuntamente a chave de decifragem dividida e revelam apenas a contagem final |
| Threshold decryption | Recuperar um resultado apenas quando cooperam detentores suficientes de partes da chave, neste caso dois terços |
| Quorum | A participação mínima de 1.000.000 ZEC para que a consulta seja considerada representativa |

## Perguntas frequentes

Minhas moedas são movimentadas ou bloqueadas quando voto? Não. A elegibilidade é medida no bloco do snapshot, então seu ZEC permanece no lugar e disponível para gastar. A votação produz provas em uma chain separada, não uma transação do Zcash.

Alguém pode saber como votei ou quanto possuo? Não. As cédulas são criptografadas e apenas os totais agregados são decifrados. Seu voto não é vinculável à sua identidade, e seu saldo é dividido em 16 partes temporizadas para protegê-lo até mesmo contra um comitê conivente.

O que impede alguém de votar duas vezes ou de votar com moedas que não possui? Cada cédula inclui provas de conhecimento zero de que é respaldada por um saldo real e não gasto no snapshot, e uma prova de não inclusão baseada em PIR mostra que a note subjacente ainda não tinha sido gasta, sem revelar qual note é.

Quem conta os votos? Um conjunto distribuído de pelo menos 10 validadores, nenhum dos quais consegue decifrar algo sozinho. Dois terços precisam cooperar para revelar os totais, e cada decifragem inclui uma prova pública de correção.

O resultado é vinculativo? É um sinal do sentimento dos detentores de moedas ponderado pela participação. Ele informa a governança normal do Zcash, em vez de implementar automaticamente uma mudança.

Posso executar ou auditar isto por conta própria? Sim. O software da chain de votação, os circuitos, o sistema PIR e um auditor de contagem são todos publicados por Valar Group para que qualquer pessoa possa inspecioná-los e executá-los.

## Teste sua compreensão

Se cada cédula é criptografada e cada eleitor é anônimo, como alguém pode ter certeza de que os totais publicados estão corretos e de que ninguém votou duas vezes?

<details>
<summary>Resposta</summary>

Três provas fazem o trabalho. Cada cédula inclui uma prova de conhecimento zero de que é respaldada por um saldo real no snapshot, então votos sem respaldo não são contados. Uma prova de não inclusão baseada em PIR mostra que a note por trás dela não tinha sido gasta, evitando votos duplicados sem revelar a note. E, quando os validadores decifram os totais, cada um publica uma prova de correção, então qualquer nó integral pode confirmar que os números finais foram decifrados honestamente a partir das cédulas criptografadas.
</details>

## Recursos

- [Anúncio da votação de detentores de moedas da NU7 (Valar Group e Projeto Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - a publicação no fórum que define o escopo da consulta, a altura de snapshot e o cronograma
- [A chain de votação de detentores de moedas: projeto técnico](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - a descrição do protocolo em que esta página se baseia
- [Documentação de votação blindada da Valar Group](https://valargroup.gitbook.io/shielded-vote-docs) - a referência mantida para a chain de votação
- [Código de votação e auditorias da Valar Group (GitHub)](https://github.com/valargroup/vote-sdk) - a implementação open source e suas auditorias

## Páginas relacionadas

- [Recuperação privada de informação](../zcash-tech/private-information-retrieval) - a técnica de prova de não inclusão por trás da prevenção privada de votos duplicados
- [Ironwood](../zcash-tech/ironwood) - o pool blindado cujos saldos definem o peso de votação
- [zk-SNARKs](../zcash-tech/zk-snarks) - o sistema de provas por trás das provas de saldo e elegibilidade
- [Pools blindados](../using-zcash/shielded-pools) - o que é um saldo blindado e por que permanece oculto
- [Visão geral de financiamento e governança do Zcash](../zcash-community/zcash-governance) - como este sinal de sentimento alimenta o processo de decisão mais amplo do Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - um dos cinco membros da multisig coordenadora
