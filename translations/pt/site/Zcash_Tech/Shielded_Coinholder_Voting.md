<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Votação blindada dos detentores de moedas

> Em ago de 2026, Zcash realizou uma consulta aos detentores de moedas na qual as cédulas permaneceram criptografadas e apenas os totais finais foram revelados, usando um protocolo de votação blindada construído por Valar Group.

O que você vai aprender: como um voto pode ser ponderado pela quantidade de ZEC que você possui, mantido privado e ainda assim contado corretamente, tudo sem que ninguém descubra como você votou ou quanto você possui.

A votação blindada dos detentores de moedas permite que os detentores de Zcash votem em questões do ecossistema usando seus ZEC blindados. Ninguém descobre o que cada pessoa votou ou quanto ZEC ela possui, mas qualquer um pode auditar se os totais estão corretos. Ela funciona em uma chain de votação dedicada, construída por Valar Group e separada da mainnet do Zcash, de modo que seus fundos reais nunca se movem. Para entender de forma mais ampla como o Zcash toma decisões, consulte a [visão geral de financiamento e governança do Zcash](../zcash-community/zcash-governance). Esta página trata apenas do protocolo criptográfico de votação.

É novo no Zcash? Comece por [O que é ZEC e Zcash](../start-here/what-is-zec-and-zcash), [Pools blindadas](../using-zcash/shielded-pools) e [zk-SNARKs](../zcash-tech/zk-snarks), e depois volte aqui.

![Fluxo de votação blindada: um eleitor prova seu saldo Ironwood em um snapshot e emite uma cédula criptografada dividida em partes, que são contabilizadas de forma homomórfica e depois descriptografadas por limiar, revelando apenas os totais](/content-images/shielded-voting-flow.webp)

## Por que a votação privada é difícil

Uma boa votação de detentores de moedas precisa de quatro coisas ao mesmo tempo, e as formas óbvias de obtê-las entram em conflito entre si.

1. Peso proporcional à participação, para que possuir mais ZEC tenha mais peso.
2. Privacidade da escolha, para que ninguém descubra como você votou.
3. Privacidade do saldo, para que ninguém descubra quanto ZEC você possui.
4. Uma contagem correta e auditável que qualquer um possa verificar.

Para ponderar pela participação, parece necessário conhecer o saldo de todos. Para contar as cédulas, parece necessário abri-las. Fazer qualquer uma dessas coisas de forma ingênua vaza exatamente as informações privadas que uma [pool blindada](../using-zcash/shielded-pools) existe para proteger, e votações anteriores com moedas de fato vazaram informações de saldo por esse motivo. A votação blindada resolve essa tensão com as mesmas ferramentas que sustentam os pagamentos blindados: [provas de conhecimento zero](../zcash-tech/zk-snarks), nulificadores e criptografia.

## A intuição: uma urna que conta sozinha

> Uma catraca permite contar o que passa pelo cofre de um banco sem ver o seu interior. Uma urna blindada vai um passo além: ela soma votos lacrados sem nunca abri-los.

Imagine uma urna com três poderes incomuns. Ela consegue adicionar um envelope lacrado a um total parcial sem abri-lo. Um grupo de autoridades, sem que nenhuma delas tenha a chave sozinha, revela depois apenas os totais finais. E, antes de poder depositar um envelope, você prova discretamente que possuía ZEC em um momento fixo do passado e que ainda não votou, sem mostrar quais moedas são suas. Tudo o que vem a seguir explica como essa urna é realmente construída.

## Elegibilidade e o snapshot

Uma rodada de votação fixa uma altura de snapshot, um único bloco da mainnet do Zcash, e o seu peso é o seu saldo blindado disponível na pool [Ironwood](../zcash-tech/ironwood) naquele bloco. A regra é simples: um Ironwood ZEC no snapshot equivale a um voto. Para a consulta sobre o escopo da NU7, o snapshot foi o bloco 3.459.350 da mainnet, por volta de 24 de ago de 2026 às 19:00 UTC, com a votação aberta até 14 de set de 2026 às 19:00 UTC. ZEC transparente é tratado separadamente pelo método mais antigo, e não por este protocolo.

1. Seus fundos nunca se movem e nunca são bloqueados. A elegibilidade é fixada no snapshot, então você pode gastar ou mover ZEC logo depois sem afetar o seu voto.
2. Não há etapa de registro. Basta uma altura de snapshot, o que mantém o processo leve e evita revelar quem pretende votar.

## Provando seu saldo sem revelá-lo

Quando você vota, sua carteira gera uma prova de conhecimento zero de que, no snapshot, você controlava algum ZEC blindado não gasto. Ela comprova um saldo válido e o seu tamanho para o mecanismo privado de contagem, mas não revela nenhuma note e não gera nenhuma transação na mainnet do Zcash.

Essa prova cria um crédito de votação na chain de votação igual ao seu saldo no snapshot, pertencente a uma nova chave de votação que sua carteira gera apenas para esta rodada. Como a chave é nova e não tem ligação com seus endereços do Zcash, nada na chain de votação pode ser rastreado até suas notes reais. Sua identidade on-chain e sua cédula são não vinculáveis por construção.

## Impedindo o voto duplo, de forma privada

Para impedir que alguém vote duas vezes com as mesmas moedas, o sistema precisa confirmar que as notes por trás do seu saldo não estavam gastas no snapshot. Na mainnet, isso é feito revelando o nulificador de uma note, o seu marcador único de gasto, que os nós integrais verificam para detectar reutilização. Mas revelar seu nulificador aqui ligaria sua cédula diretamente às suas notes.

![Prevenção privada de voto duplo: em vez de revelar um nulificador, a carteira usa Private Information Retrieval para buscar o material da prova sem revelar sobre qual nulificador perguntou e, em seguida, prova que a note não foi gasta](/content-images/shielded-voting-pir.webp)

Por isso, o protocolo prova o contrário de forma privada. Ele constrói uma lista de todos os nulificadores já usados até o snapshot, e sua carteira prova com conhecimento zero que o nulificador da sua note não está nessa lista, mostrando que a note não estava gasta sem revelar qual note é.

Resta um problema. Buscar em um servidor a parte necessária dessa lista revelaria seu nulificador ao servidor, e a lista completa é grande, cerca de 2 GB para os dados da era Orchard e muito maior à medida que o Zcash cresce. A [Recuperação Privada de Informações](../zcash-tech/private-information-retrieval) (PIR) resolve os dois problemas: sua carteira busca exatamente os dados de que precisa, ocultando criptograficamente quais dados solicitou. O resultado é verificado contra um resumo publicado da lista de nulificadores, de modo que um servidor desonesto não consegue forjar um resultado falso.

## Emitindo uma cédula criptografada

Para cada pergunta, sua carteira faz três coisas.

1. Ela criptografa o peso do seu voto para o comitê de contagem usando criptografia homomórfica, um tipo de criptografia cujos textos cifrados podem ser somados sem serem descriptografados. É isso que permite à urna totalizar votos que ela não consegue ler.
2. Ela divide seu voto em 16 partes separadas, de modo que até um comitê totalmente conluiado teria dificuldade para reconstruir quanto uma pessoa votou.
3. Ela envia essas partes em momentos aleatórios por meio de vários servidores, para que um observador não consiga perceber, pelo horário de chegada, que as partes pertencem ao mesmo eleitor.

Cada parte carrega sua própria prova de conhecimento zero de que é um pedaço legítimo de uma cédula válida, para que ninguém possa adicionar votos sem lastro. As partes verificadas são somadas de forma homomórfica ao total parcial criptografado da resposta escolhida.

## Contando sem abrir nenhuma cédula

A contagem é feita por uma autoridade eleitoral distribuída: pelo menos 10 validadores da chain de votação, nenhum dos quais consegue descriptografar nada sozinho. No início de uma rodada, eles realizam juntos uma cerimônia de geração de chaves que produz uma chave de criptografia cuja chave de descriptografia correspondente é dividida entre todos eles e nunca é montada em um único lugar.

> Nenhuma autoridade tem a chave sozinha. A urna só se abre quando dois terços delas giram suas chaves juntas, e mesmo assim revela apenas os totais.

Quando a rodada termina, os totais criptografados já existem graças à soma homomórfica descrita acima. Cada validador publica uma descriptografia parcial junto com uma prova de que descriptografou corretamente. Depois que pelo menos dois terços tiverem contribuído, suas partes se combinam na apuração final em texto claro para cada pergunta, e nada mais é descriptografado. Qualquer nó integral pode então verificar a prova de correção combinada, de modo que o público pode verificar a contagem sem confiar nos validadores.

## Quem opera o sistema e o que não pode fazer

O design separa duas funções para que nenhum grupo tenha poder demais.

![Separação de poderes: um multisig coordenador define quais perguntas aparecem, mas não pode ver os votos, enquanto um conjunto de validadores faz a contagem, mas não pode ler cédulas individuais nem forjar um resultado](/content-images/shielded-voting-roles.webp)

O multisig coordenador é um grupo 2 de 5 com representantes do Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs) e Valar Group. Ele decide quais perguntas chegam à chain e atesta a chave de criptografia de cada rodada, mas não pode ver, alterar nem bloquear votos individuais. Quem não gostar das perguntas pode operar sua própria chain de votação, já que o software é aberto e sem permissão.

Os validadores são os pelo menos 10 nós que guardam a chave de descriptografia dividida e realizam a descriptografia por limiar. Eles não podem descriptografar cédulas individuais nem fabricar uma apuração falsa, porque cada descriptografia vem acompanhada de uma prova pública de correção.

## Para que serve o quórum

Os organizadores definem um limite de participação: os resultados da consulta só são considerados representativos dos detentores de moedas se pelo menos 1.000.000 de ZEC participar de pelo menos uma pergunta, incluindo abstenções. O quórum não decide nenhuma pergunta e não é aplicado por pergunta. É uma verificação única sobre toda a consulta, para que um resultado só seja levado a sério quando uma quantidade substancial de ZEC comparecer. Abaixo desse nível, o resultado não é considerado um sinal significativo.

## Contra o que este protocolo não protege

Ter clareza sobre os limites faz parte de entender o design.

1. É um sinal, não uma decisão vinculante. Uma consulta aos detentores de moedas mede o sentimento ponderado pela participação e alimenta o [processo de governança](../zcash-community/zcash-governance) normal do Zcash, em vez de substituí-lo.
2. É ponderada por moedas, então a influência acompanha as participações. Menos atrito pode aumentar a participação, mas não muda a concentração de ZEC.
3. A pauta é definida pelo multisig coordenador, que escolhe quais perguntas aparecem. Ele não pode mexer nos votos, e qualquer um pode operar uma chain concorrente, mas a definição da pauta continua sendo um ponto de influência.
4. A contagem precisa de validadores online. Produzir a apuração exige a cooperação de pelo menos dois terços deles, então uma grande interrupção ou uma recusa coordenada poderia atrasar um resultado.
5. A privacidade do saldo sob conluio total é defesa em profundidade, não um teorema. Se todo o comitê reconstruísse a chave em segredo, a divisão em partes e o envio em momentos distintos é que protegeriam seu saldo, e os projetistas reconhecem que essas proteções são mais fracas em caso de conluio. A análise sofisticada de tráfego é um risco residual.
6. Mais partes móveis do que o design anterior. Servidores PIR, servidores de envio, uma nova chave de votação e provas em várias etapas são, cada um, um ponto onde podem surgir bugs ou erros de configuração. O sistema é de código aberto e partes dele foram auditadas de forma independente, o que gerencia esse risco em vez de eliminá-lo.

O que ele protege, de forma forte e verificável, são as duas coisas mais importantes: sua cédula não pode ser vinculada à sua identidade, e apenas os totais finais são revelados.

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| Voting chain | Uma blockchain separada, construída por Valar Group, que executa a votação; suas notes de Zcash nunca são movidas para ela |
| Snapshot height | O bloco da mainnet cujos saldos definem o peso do voto (bloco 3.459.350 para a consulta de NU7) |
| Nullifier | O marcador único de gasto de uma note; revelá-lo vincularia uma cédula a uma note, então a votação prova a não pertença em vez disso |
| Private Information Retrieval (PIR) | Buscar dados em um servidor ocultando quais dados você solicitou |
| Homomorphic encryption | Criptografia cujos textos cifrados podem ser somados sem serem descriptografados |
| Coordinator multisig | O grupo 2 de 5 que autoriza as perguntas e a chave da rodada, mas não pode ver nem alterar votos |
| Election authority | Os 10 ou mais validadores que guardam juntos a chave de descriptografia dividida e revelam apenas a apuração final |
| Threshold decryption | Recuperar um resultado somente quando detentores suficientes de partes da chave, aqui dois terços, cooperam |
| Quorum | A participação mínima de 1.000.000 de ZEC para que a consulta seja considerada representativa |

## Perguntas frequentes

Minhas moedas se movem ou ficam bloqueadas quando eu voto? Não. A elegibilidade é medida no bloco do snapshot, então seu ZEC permanece onde está e disponível para gasto. A votação gera provas em uma chain separada, não uma transação de Zcash.

Alguém consegue saber como eu votei ou quanto eu possuo? Não. As cédulas são criptografadas e apenas os totais agregados são descriptografados. Seu voto é não vinculável à sua identidade, e seu saldo é dividido em 16 partes enviadas em momentos distintos para protegê-lo até mesmo contra um comitê conluiado.

O que impede alguém de votar duas vezes ou de votar com moedas que não possui? Cada cédula carrega provas de conhecimento zero de que é lastreada por um saldo real e não gasto no snapshot, e uma prova de não pertença baseada em PIR mostra que a note subjacente ainda não tinha sido gasta, sem revelar qual note é.

Quem conta os votos? Um conjunto distribuído de pelo menos 10 validadores, nenhum dos quais consegue descriptografar nada sozinho. Dois terços precisam cooperar para revelar os totais, e cada descriptografia vem com uma prova pública de correção.

O resultado é vinculante? É um sinal do sentimento dos detentores de moedas ponderado pela participação. Ele orienta a governança normal do Zcash, em vez de promulgar uma mudança automaticamente.

Posso operar ou auditar isso eu mesmo? Sim. O software da chain de votação, os circuitos, o sistema PIR e um auditor de apuração são todos publicados por Valar Group para que qualquer um possa inspecioná-los e executá-los.

## Teste seu entendimento

Se todas as cédulas são criptografadas e todos os eleitores são anônimos, como alguém pode ter certeza de que os totais publicados estão corretos e de que ninguém votou duas vezes?

<details>
<summary>Resposta</summary>

Três provas fazem o trabalho. Cada cédula carrega uma prova de conhecimento zero de que é lastreada por um saldo real no snapshot, então nenhum voto sem lastro é contado. Uma prova de não pertença baseada em PIR mostra que a note por trás dela não estava gasta, impedindo o voto duplo sem revelar a note. E, quando os validadores descriptografam os totais, cada um publica uma prova de correção, para que qualquer nó integral possa confirmar que os números finais foram descriptografados honestamente a partir das cédulas criptografadas.
</details>

## Recursos

- [Anúncio da votação dos detentores de moedas de NU7 (Valar Group e Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - a publicação no fórum que define o escopo da consulta, a altura do snapshot e o cronograma
- [A chain de votação dos detentores de moedas: design técnico](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - a descrição do protocolo na qual esta página se baseia
- [Documentação da votação blindada de Valar Group](https://valargroup.gitbook.io/shielded-vote-docs) - a referência mantida para a chain de votação
- [Código de votação e auditorias de Valar Group (GitHub)](https://github.com/valargroup/vote-sdk) - a implementação de código aberto e suas auditorias

## Páginas relacionadas

- [Recuperação Privada de Informações](../zcash-tech/private-information-retrieval) - a técnica de prova de não pertença por trás da prevenção privada do voto duplo
- [Ironwood](../zcash-tech/ironwood) - a pool blindada cujos saldos definem o peso do voto
- [zk-SNARKs](../zcash-tech/zk-snarks) - o sistema de provas por trás das provas de saldo e de elegibilidade
- [Pools blindadas](../using-zcash/shielded-pools) - o que é um saldo blindado e por que ele permanece oculto
- [Visão geral de financiamento e governança do Zcash](../zcash-community/zcash-governance) - como este sinal de sentimento alimenta o processo de decisão mais amplo do Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - um dos cinco membros do multisig coordenador
