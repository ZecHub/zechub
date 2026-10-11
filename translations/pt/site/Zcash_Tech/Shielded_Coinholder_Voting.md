<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Votação Blindada de Detentores de Moedas

> Em agosto de 2026, Zcash realizou uma consulta aos detentores de moedas na qual os votos permaneceram cifrados e apenas os totais finais foram revelados, usando um protocolo de votação blindada desenvolvido por Valar Group.

O que vai aprender: como um voto pode ser ponderado pela quantidade de ZEC que detém, mantido privado e ainda assim contado corretamente, sem que ninguém descubra como votou ou quanto possui.

A votação blindada de detentores de moedas permite que os detentores de Zcash votem em questões do ecossistema usando os seus ZEC blindados. Ninguém fica a saber em que votou cada indivíduo nem quanto ZEC detém, mas qualquer pessoa pode auditar se os totais estão corretos. Funciona numa cadeia de votação dedicada desenvolvida por Valar Group, separada da mainnet de Zcash, para que os seus fundos reais nunca sejam movimentados. Para saber como Zcash toma decisões de forma mais ampla, consulte a visão geral de [Zcash Financiamento e Governação](../zcash-community/zcash-governance). Esta página trata apenas do protocolo criptográfico de votação.

É novo em Zcash? Comece por [O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash), [Pools Blindadas](../using-zcash/shielded-pools) e [zk-SNARKs](../zcash-tech/zk-snarks), e depois volte aqui.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Porque é difícil votar em privado

Uma boa votação de detentores de moedas pretende quatro coisas em simultâneo, e as formas óbvias de as conseguir entram em conflito.

1. Ponderação pela participação, para que deter mais ZEC tenha mais peso.
2. Privacidade da escolha, para que ninguém saiba como votou.
3. Privacidade do saldo, para que ninguém saiba quanto ZEC detém.
4. Uma contagem correta e auditável que qualquer pessoa possa verificar.

Para ponderar pela participação, parece ser necessário conhecer o saldo de todos. Para contar os votos, parece ser necessário abri-los. Fazer qualquer uma destas coisas de forma ingénua expõe precisamente a informação privada que uma [pool blindada](../using-zcash/shielded-pools) existe para proteger, e as votações anteriores de moedas revelavam informações sobre saldos por esta razão. A votação blindada resolve esta tensão com as mesmas ferramentas que possibilitam pagamentos blindados: [provas de conhecimento zero](../zcash-tech/zk-snarks), anuladores e cifragem.

## A intuição: uma urna que se conta a si própria

> Uma catraca permite contar o que passa por um cofre bancário sem ver o interior. Uma urna blindada vai um passo mais longe: soma votos selados sem nunca os abrir.

Imagine uma urna com três poderes invulgares. Pode adicionar um envelope selado a um total acumulado sem o abrir. Um grupo de responsáveis, sem que nenhum detenha a chave sozinho, revela mais tarde apenas os totais finais. E, antes de poder depositar um envelope, prova discretamente que detinha ZEC num momento passado fixo e que ainda não votou, sem mostrar quais moedas lhe pertencem. Tudo o que se segue explica como essa urna é realmente construída.

## Elegibilidade e a captura instantânea

Uma ronda de votação fixa uma altura de captura instantânea, um único bloco da mainnet de Zcash, e o seu peso é o seu saldo blindado disponível para gastar na pool [Ironwood](../zcash-tech/ironwood) nesse bloco. A regra é simples: um Ironwood ZEC na captura instantânea equivale a um voto. Para a consulta de âmbito NU7, a captura instantânea foi o bloco 3.459.350 da mainnet, por volta de 24 de agosto de 2026 às 19:00 UTC, com a votação aberta até 14 de setembro de 2026 às 19:00 UTC. O ZEC transparente é tratado separadamente pelo método mais antigo, não por este protocolo.

1. Os seus fundos nunca são movimentados nem bloqueados. A elegibilidade é fixada na captura instantânea, pelo que pode gastar ou mover ZEC imediatamente depois sem afetar o seu voto.
2. Não existe uma etapa de registo. Uma altura de captura instantânea é tudo o que é necessário, o que mantém o processo simples e evita revelar quem pretende votar.

## Provar o seu saldo sem o revelar

Quando vota, a sua wallet produz uma prova de conhecimento zero de que, na captura instantânea, controlava algum ZEC blindado não gasto. Ela estabelece um saldo válido e o respetivo montante para o mecanismo privado de contagem, mas não revela notas nem produz qualquer transação na mainnet de Zcash.

Essa prova cria um crédito de votação na cadeia de votação igual ao seu saldo na captura instantânea, pertencente a uma nova chave de votação que a sua wallet gera apenas para esta ronda. Como a chave é nova e não está ligada aos seus endereços Zcash, nada na cadeia de votação pode ser associado às suas notas reais. A sua identidade on-chain e o seu voto não podem ser associados por conceção.

## Evitar votos duplicados, em privado

Para impedir que alguém vote duas vezes com as mesmas moedas, o sistema tem de confirmar que as notas que sustentam o seu saldo não foram gastas na captura instantânea. Na mainnet, isto é feito revelando o anulador de uma nota, o seu marcador único de gasto, que os nós completos verificam quanto à reutilização. Mas revelar o seu anulador aqui ligaria diretamente o seu voto às suas notas.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Assim, o protocolo prova o contrário em privado. Cria uma lista de todos os anuladores já utilizados até à captura instantânea, e a sua wallet prova em conhecimento zero que o anulador da sua nota não está nessa lista, demonstrando que a nota não foi gasta sem revelar qual é a nota.

Resta um problema. Obter de um servidor a parte necessária dessa lista revelaria o seu anulador ao servidor, e a lista completa é grande, cerca de 2 GB para dados da era Orchard e muito maior à medida que Zcash cresce. A [Recuperação Privada de Informação](../zcash-tech/private-information-retrieval) (PIR) resolve ambos: a sua wallet obtém exatamente os dados de que necessita, ocultando criptograficamente quais os dados que pediu. O resultado é verificado contra um resumo publicado da lista de anuladores, pelo que um servidor desonesto não consegue forjar um resultado falso.

## Depositar um voto cifrado

Para cada pergunta, a sua wallet faz três coisas.

1. Cifra o peso do seu voto para o comité de contagem usando cifragem homomórfica, um tipo de cifragem cujos textos cifrados podem ser somados sem serem decifrados. É isto que permite à urna totalizar votos que não consegue ler.
2. Divide o seu voto em 16 partes separadas, para que até um comité totalmente conivente tenha dificuldade em reconstruir quanto votou cada pessoa.
3. Envia essas partes em momentos aleatórios através de vários servidores, para que um observador não consiga determinar que as partes pertencem ao mesmo eleitor pelo momento em que chegam.

Cada parte inclui a sua própria prova de conhecimento zero de que é uma parte legítima de um voto válido, pelo que ninguém pode adicionar votos sem suporte. As partes verificadas são adicionadas homomorficamente ao total cifrado acumulado da resposta que escolheu.

## Contar sem abrir qualquer voto

A contagem é realizada por uma autoridade eleitoral distribuída: pelo menos 10 validadores da cadeia de votação, nenhum dos quais consegue decifrar algo sozinho. No início de uma ronda, executam conjuntamente uma cerimónia de geração de chaves que produz uma chave de cifragem cuja chave de decifragem correspondente é dividida entre todos eles e nunca reunida num só lugar.

> Nenhum responsável individual detém a chave. A urna só abre quando dois terços deles usam as suas chaves em conjunto e, mesmo assim, revela apenas os totais.

Quando a ronda encerra, os totais cifrados já existem graças à adição homomórfica acima. Cada validador publica uma decifragem parcial e uma prova de que decifrou corretamente. Assim que pelo menos dois terços contribuem, as suas partes combinam-se no apuramento final em texto simples para cada pergunta, e nada mais é alguma vez decifrado. Qualquer nó completo pode então verificar a prova de correção combinada, pelo que o público pode verificar a contagem sem confiar nos validadores.

## Quem o gere e o que não pode fazer

O desenho separa duas funções para que nenhum grupo detenha poder excessivo.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

A multisig coordenadora é um grupo de 2 em 5 com representantes do Projeto Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) e Valar Group. Decide quais as perguntas que chegam à cadeia e atesta a chave de cifragem de cada ronda, mas não consegue ver, alterar ou bloquear votos individuais. Qualquer pessoa que não goste das perguntas pode executar a sua própria cadeia de votação, pois o software é aberto e sem permissão.

Os validadores são os pelo menos 10 nós que detêm a chave de decifragem dividida e realizam a decifragem por limiar. Não conseguem decifrar votos individuais nem fabricar um apuramento falso, porque cada decifragem inclui uma prova pública de correção.

## Para que serve o quórum

Os organizadores definem um limiar de participação: os resultados da consulta são considerados representativos dos detentores de moedas apenas se pelo menos 1.000.000 ZEC participar em pelo menos uma pergunta, incluindo abstenções. O quórum não decide nenhuma pergunta nem é aplicado por pergunta. É uma única verificação para toda a consulta, pelo que um resultado só é levado a sério quando participa uma quantidade substancial de ZEC. Abaixo desse nível, o resultado não é considerado um sinal significativo.

## Contra o que este protocolo não protege

Ser claro quanto aos limites faz parte de compreender o desenho.

1. É um sinal, não uma decisão vinculativa. Uma consulta a detentores de moedas mede o sentimento ponderado pela participação e alimenta o processo normal de [governação](../zcash-community/zcash-governance) da Zcash, em vez de o substituir.
2. É ponderado por moedas, pelo que a influência segue as participações. Menos obstáculos podem aumentar a participação, mas não alteram a concentração de ZEC.
3. A agenda é definida pela multisig coordenadora, que escolhe quais as perguntas apresentadas. Não pode tocar nos votos e qualquer pessoa pode executar uma cadeia concorrente, mas a definição da agenda continua a ser um ponto de influência.
4. A contagem necessita de validadores online. Produzir o apuramento requer que pelo menos dois terços cooperem, pelo que uma grande indisponibilidade ou recusa coordenada pode atrasar um resultado.
5. A privacidade do saldo sob conivência total é uma defesa em profundidade, não um teorema. Se todo o comité reconstruísse secretamente a chave, a divisão em partes e a submissão temporizada seriam o que protegeria o seu saldo, e os criadores reconhecem que estas são mais fracas sob conivência. A análise sofisticada de tráfego é um risco residual.
6. Há mais componentes móveis do que no desenho anterior. Servidores PIR, servidores de submissão, uma nova chave de votação e provas em várias etapas são, cada um, um local onde podem surgir erros ou configurações incorretas. O sistema é open source e partes dele foram auditadas de forma independente, o que gere esse risco em vez de o eliminar.

Aquilo que protege, de forma forte e verificável, são as duas coisas mais importantes: o seu voto não pode ser ligado à sua identidade, e apenas os totais finais são revelados.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Voting chain | Uma blockchain separada, desenvolvida por Valar Group, que executa a votação; as suas notas Zcash nunca passam para ela |
| Snapshot height | O bloco da mainnet cujos saldos definem o peso de votação (bloco 3.459.350 para a consulta NU7) |
| Nullifier | O marcador único de gasto de uma nota; revelá-lo ligaria um voto a uma nota, pelo que a votação prova antes a não pertença |
| Private Information Retrieval (PIR) | Obter dados de um servidor ocultando quais os dados solicitados |
| Homomorphic encryption | Cifragem cujos textos cifrados podem ser somados sem serem decifrados |
| Coordinator multisig | O grupo de 2 em 5 que autoriza as perguntas e a chave da ronda, mas não consegue ver nem alterar votos |
| Election authority | Os 10 ou mais validadores que detêm conjuntamente a chave de decifragem dividida e revelam apenas o apuramento final |
| Threshold decryption | Recuperar um resultado apenas quando cooperam suficientes detentores de partes da chave, neste caso dois terços |
| Quorum | A participação mínima de 1.000.000 ZEC para que a consulta seja considerada representativa |

## Perguntas frequentes

As minhas moedas são movimentadas ou bloqueadas quando voto? Não. A elegibilidade é medida no bloco de captura instantânea, pelo que o seu ZEC permanece no lugar e disponível para gastar. A votação produz provas numa cadeia separada, não uma transação de Zcash.

Alguém pode saber como votei ou quanto detenho? Não. Os votos são cifrados e apenas os totais agregados são decifrados. O seu voto não pode ser associado à sua identidade, e o seu saldo é dividido em 16 partes temporizadas para o proteger mesmo contra um comité conivente.

O que impede alguém de votar duas vezes ou de votar com moedas que não possui? Cada voto inclui provas de conhecimento zero de que é sustentado por um saldo real e não gasto na captura instantânea, e uma prova de não pertença baseada em PIR mostra que a nota subjacente ainda não tinha sido gasta, sem revelar qual é a nota.

Quem conta os votos? Um conjunto distribuído de pelo menos 10 validadores, nenhum dos quais consegue decifrar algo sozinho. Dois terços têm de cooperar para revelar os totais, e cada decifragem inclui uma prova pública de correção.

O resultado é vinculativo? É um sinal de sentimento dos detentores de moedas ponderado pela participação. Informa a governação normal de Zcash, em vez de promulgar automaticamente uma alteração.

Posso executar ou auditar isto eu próprio? Sim. O software da cadeia de votação, os circuitos, o sistema PIR e um auditor de apuramento são todos publicados por Valar Group para qualquer pessoa inspecionar e executar.

## Teste a sua compreensão

Se cada voto é cifrado e cada eleitor é anónimo, como pode alguém ter a certeza de que os totais publicados estão corretos e de que ninguém votou duas vezes?

<details>
<summary>Resposta</summary>

Três provas fazem o trabalho. Cada voto inclui uma prova de conhecimento zero de que é sustentado por um saldo real na captura instantânea, pelo que não são contados votos sem suporte. Uma prova de não pertença baseada em PIR mostra que a nota por trás dele não tinha sido gasta, evitando votos duplicados sem revelar a nota. E, quando os validadores decifram os totais, cada um publica uma prova de correção, pelo que qualquer nó completo pode confirmar que os números finais foram decifrados honestamente a partir dos votos cifrados.
</details>

## Recursos

- [NU7 Anúncio da Votação de Detentores de Moedas (Valar Group e Projeto Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - a publicação no fórum que define o âmbito da consulta, a altura de captura instantânea e o calendário
- [A Cadeia de Votação de Detentores de Moedas: desenho técnico](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - a descrição do protocolo em que esta página se baseia
- [Valar Group documentação de votação blindada](https://valargroup.gitbook.io/shielded-vote-docs) - a referência mantida para a cadeia de votação
- [Valar Group código de votação e auditorias (GitHub)](https://github.com/valargroup/vote-sdk) - a implementação open source e as suas auditorias

## Páginas relacionadas

- [Recuperação Privada de Informação](../zcash-tech/private-information-retrieval) - a técnica de prova de não pertença por trás da prevenção privada de votos duplicados
- [Ironwood](../zcash-tech/ironwood) - a pool blindada cujos saldos definem o peso de votação
- [zk-SNARKs](../zcash-tech/zk-snarks) - o sistema de provas por trás das provas de saldo e elegibilidade
- [Pools Blindadas](../using-zcash/shielded-pools) - o que é um saldo blindado e porque permanece oculto
- [Zcash Visão geral de Financiamento e Governação](../zcash-community/zcash-governance) - como este sinal de sentimento alimenta o processo de decisão mais amplo de Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - um dos cinco membros da multisig coordenadora
