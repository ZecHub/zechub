![alt text](image-1.png)
# O bug do Orchard: quando um sistema de provas tem uma falha

### Como uma única linha de matemática sub-restrita poderia ter cunhado dinheiro invisível ilimitado

> **Série:** *Série verificação formal* · **Parte 2 de 3**
> **Público:** iniciantes. A Parte 1 apresentou a verificação formal; aqui conhecemos o bug real que a tornou urgente. Tudo o que é necessário é explicado do zero.
> **O que você vai levar daqui:** uma visão intuitiva, mas precisa, de como um sistema de provas criptográficas pode conter uma falha de solidez, o que exatamente foi o bug "Orchard" do Zcash em 2026, por que essa classe de bug pode ficar escondida por anos e por que isso já aconteceu antes.

Na Parte 1, dissemos que os testes podem mostrar a presença de bugs, mas nunca a sua ausência, e que os bugs mais perigosos vivem na *especificação* de um sistema, a matemática subjacente. Este artigo é o estudo de caso. Em 2026, foi encontrada uma falha na pool blindada Orchard do Zcash que poderia ter permitido a um invasor criar dinheiro falsificado ilimitado de forma invisível. Ela havia sobrevivido por quatro anos e a repetidas auditorias. Entendê-la, assim como suas antecessoras, é a motivação mais clara possível para provar que os sistemas estão corretos.

---

## 1. Por que você deveria se importar?

O Zcash é uma criptomoeda com um modo privado. Na sua pool blindada, os valores, os remetentes e os destinatários das transações ficam **ocultos**. Essa privacidade é criada usando **provas de conhecimento zero**: provas criptográficas de que uma transação obedece a todas as regras, sem revelar o conteúdo da transação.

Esse design tem dois lados. Em um registro transparente como o do Bitcoin, se alguém fizesse moedas surgirem do nada, os números inflados ficariam visíveis para todos, e a rede poderia detectar isso e revertê-lo. Em uma pool blindada, os números ficam ocultos por design. Então, se o próprio sistema de provas tivesse uma falha que permitisse que uma transação inválida parecesse válida, a falsificação seria **indetectável**. Você não conseguiria percebê-la inspecionando o registro, porque o registro é deliberadamente opaco.

Esse é exatamente o risco que se concretizou no Orchard. Para entendê-lo, precisamos olhar por dentro o que uma prova de conhecimento zero realmente verifica.

---

## 2. A intuição: uma prova só é tão boa quanto a sua lista de verificação

Imagine um agente de fronteira que precisa aprovar viajantes sem ver os documentos deles diretamente. Em vez disso, cada viajante preenche uma **lista de verificação**, e o agente aprova qualquer pessoa cuja lista esteja totalmente marcada. A lista foi projetada para que *apenas um viajante legítimo consiga marcar todas as caixas.*

Agora suponha que falte na lista uma caixa crucial, digamos, "o passaporte não está vencido". Quase todo mundo continua preenchendo honestamente e nada parece errado. Mas uma pessoa com o passaporte vencido *também* consegue marcar todas as caixas restantes e passar tranquilamente. O sistema parece funcionar bem no uso diário. A falha só importa para quem sai procurando por ela.

Uma prova de conhecimento zero funciona como essa lista de verificação. Ela não revela os detalhes privados; verifica se eles satisfazem um conjunto fixo de condições. E se uma condição necessária for deixada de fora por acidente, algumas entradas inválidas *também* podem passar, enquanto tudo continua parecendo normal.

Vamos tornar precisa a ideia de "lista de condições", porque é exatamente aí que o bug vivia.

---

## 3. A matemática: circuitos, restrições e solidez

Por baixo dos panos, a afirmação "esta transação é válida" é codificada como um **circuito**: uma coleção fixa de condições aritméticas, chamadas **restrições**, escritas como equações sobre números. Para gerar uma prova válida, o provador precisa fornecer valores secretos (a **testemunha**) que satisfaçam *todas* as restrições. A prova convence um verificador de que essa testemunha existe, sem revelá-la.

A propriedade de que precisamos nesse sistema tem um nome:

> **Solidez:** deve ser impossível produzir uma prova válida para uma afirmação *falsa*. Apenas afirmações verdadeiras devem ter testemunhas que satisfaçam todas as restrições.

A solidez é a garantia contra falsificação. Se a solidez se mantém, uma prova válida significa de fato que "uma transação real, que obedece às regras, aconteceu". Se a solidez tem uma lacuna, uma prova válida pode não significar absolutamente nada.

### O que uma restrição ausente faz (um exemplo verificado)

As restrições muitas vezes precisam forçar um valor a ser simples. Um exemplo comum: forçar um valor `b` a ser um único **bit**, ou `0` ou `1`. A forma padrão de fazer isso é com uma única restrição:

```
b × (b − 1) = 0
```

Por que funciona? Um produto só é zero quando um dos seus fatores é zero. Então `b × (b − 1) = 0` força `b = 0` ou `b = 1`, e nada mais. Verificando cada valor de 0 a 16 (em uma aritmética que volta ao início em 17), os *únicos* valores que a satisfazem são exatamente **0 e 1**. ✓

Agora imagine que essa linha seja **deixada de fora por acidente** do circuito. De repente, `b` fica sem restrição. Um provador desonesto pode definir `b` como `5`, ou `9`, ou qualquer outra coisa, e ainda assim satisfazer as restrições restantes. Essa única linha ausente é uma **lacuna de solidez**: afirmações falsas agora têm testemunhas que as satisfazem.

Isso não é hipotético. Uma restrição booleana ausente exatamente desse tipo foi encontrada no primeiríssimo design blindado do Zcash, o Sprout, durante o desenvolvimento, e corrigida antes do lançamento. A sub-restrição é um dos erros mais comuns e perigosos na construção desses circuitos.

![alt text](image-2.png)

Esse é todo o formato do bug do Orchard, em pequena escala. Agora, o caso real.

---

## 4. O que o bug do Orchard realmente foi

As provas blindadas do Zcash são construídas sobre **curvas elípticas**, objetos matemáticos cujos pontos podem ser combinados e "multiplicados" por números, operações que o circuito precisa impor com restrições. O circuito contém componentes que realizam a **multiplicação em curva elíptica** e verificam se ela foi feita corretamente.

De acordo com a divulgação feita pela Shielded Labs e pelo pesquisador Taylor Hornby, a falha do Orchard foi precisamente esta:

> Um **elemento sub-restrito do circuito do Orchard** tornou possível **inserir entradas falsas arbitrárias em uma multiplicação em curva elíptica e ainda assim fazer a verificação da multiplicação passar.**

Em termos simples, faltavam na lista de verificação do circuito as caixas que deveriam ter fixado essa multiplicação. Por causa dessa lacuna, um invasor suficientemente especializado poderia construir uma prova de transação que o sistema aceitaria mesmo que a transação criasse valor do nada. Isso é **falsificação** e, como os valores na pool blindada ficam ocultos, ela teria sido **indetectável** a partir do registro. A equipe do Tachyon depois descreveu a mesma falha no nível do código como linhas ausentes no circuito que embaralhavam silenciosamente as equações subjacentes.

Os paralelos com a nossa história da lista de verificação são exatos:

| História da lista de verificação | O bug do Orchard |
|---|---|
| Uma caixa "passaporte não vencido" ausente | Uma restrição ausente em uma multiplicação em curva elíptica |
| Um viajante com passaporte vencido passa mesmo assim | Entradas falsas arbitrárias passam na verificação da multiplicação |
| Todos os outros não são afetados, então nada parece errado | As transações normais funcionavam perfeitamente, escondendo a falha |
| Só quem está procurando encontra a falha | Foi preciso um especialista investigando deliberadamente a matemática do circuito |

Para deixar claro o quão grave isso foi: o pesquisador, com ajuda de IA, escreveu um *exploit completo e funcional* e confirmou em uma rede de teste local que ele produzia moedas falsificadas ilimitadas e indetectáveis. Foi uma falha real e explorável, não uma preocupação teórica.

---

## 5. Por que ficou escondido por quatro anos

O bug viveu no Orchard desde a sua ativação em **maio de 2022** até a correção emergencial em **junho de 2026**, passando por repetidas auditorias profissionais feitas por alguns dos melhores criptógrafos do mundo. Como?

Porque, como a Parte 1 alertou, **os testes fazem amostragem de casos, e essa falha vivia em um caso que ninguém amostrou.** As transações comuns nunca acionavam a restrição ausente, então todos os testes passavam e cada dia de operação normal parecia impecável. A falha só podia ser alcançada construindo deliberadamente uma testemunha incomum, mirando diretamente na lacuna. No fim, ela foi encontrada não executando testes, mas *raciocinando sobre a matemática do circuito*.

A própria descoberta é um sinal de para onde a segurança está caminhando. Em abril de 2026, a Shielded Labs contratou o pesquisador de segurança **Taylor Hornby** especificamente para caçar exatamente esse tipo de falha. Pouco depois do lançamento de um novo modelo de IA de fronteira (o Claude Opus 4.8, da Anthropic), no fim de maio de 2026, Hornby o usou, junto com um ambiente de análise personalizado e métodos tradicionais, em uma revisão direcionada do circuito do Orchard. Em **29 de maio de 2026**, a revisão encontrou a vulnerabilidade.

Vale a pena declarar com clareza dois fatos sóbrios da divulgação:

- A equipe **não encontrou nenhuma evidência** de que o bug tenha sido explorado algum dia e considera improvável uma exploração anterior (ele havia escapado de anos de escrutínio especializado e foi encontrado por meio de um esforço deliberado de white hat). Mas a própria natureza de uma falha *indetectável* significa que o registro, por si só, não consegue provar totalmente que isso nunca aconteceu.
- A descoberta causou uma turbulência significativa, incluindo uma queda acentuada no preço do ativo, justamente porque a *possibilidade* de falsificação oculta é muito grave para um dinheiro.

![alt text](image-3.png)

---

## 6. Não foi a primeira vez

O bug do Orchard pertence a uma família recorrente, e enxergar essa família é o que faz a verificação formal parecer não opcional, mas inevitável. Uma falha de falsificação sempre tem origem em uma de três fontes (a taxonomia da Parte 1): a **especificação** (a própria matemática), a **implementação** (o código não segue a matemática correta) ou uma **suposição quebrada**. E, crucialmente:

> Um bug de falsificação só é **indetectável** se vive na **especificação**. Os bugs de implementação deixam evidências públicas permanentes, porque cada bloco registra o conteúdo completo de cada transação, então reproduzir o histórico com um software corrigido exporia qualquer transação que o código com bug tivesse aceitado indevidamente.

O próprio histórico do Zcash ilustra o padrão:

| Bug (ano) | Origem | Detectável? |
|---|---|---|
| Falha de compromisso do Zerocash (2016, pré-lançamento) | Especificação (um hash truncado quebrou uma propriedade de vinculação) | Indetectável |
| Falha de solidez da configuração confiável (2018) | Especificação (um erro no artigo subjacente do zk-SNARK) | Indetectável |
| Colisão de consultas no sistema de provas (2025) | Especificação (uma verificação ausente no sistema de provas) | Detectável |
| Bug de validação de subgrupo da curva (2016) | Implementação (uma verificação de subgrupo ausente) | Detectável |
| **Multiplicação sub-restrita do Orchard (2026)** | **Especificação (o circuito)** | **Indetectável** |

O fio condutor é claro: as falhas que poderiam ficar escondidas para sempre são as que estão na matemática. Essa é precisamente a classe que uma prova da especificação verificada por máquina pode eliminar, todos os casos de uma só vez. Testes e auditorias fazem amostragem; só provar a matemática cobre todas as entradas.

---

## 7. A resposta

Os desenvolvedores do Zcash agiram rapidamente e em etapas:

1. **Correção emergencial (até 1-2 de junho de 2026).** Poucos dias após a divulgação, uma atualização da rede emergencial fechou a janela de vulnerabilidade, adicionando as restrições ausentes para que a matemática do circuito voltasse a ser sólida.
2. **Um recomeço novo e demonstrável ("Ironwood", ativado em 28 de julho de 2026).** Em vez de confiar indefinidamente em uma versão corrigida da pool antiga, a comunidade lançou uma pool blindada totalmente nova, a Ironwood, baseada no circuito corrigido, mas começando do zero e acompanhada de uma prova formal de correção verificada por máquina.

Essa segunda etapa é onde a verificação formal entra na história, e ela é o assunto da Parte 3. Vale a pena antecipar a conclusão com base na qual a equipe agiu, porque ela amarra toda esta série:

> Uma falha de falsificação *indetectável* só pode viver na **especificação** do protocolo. Então, se você conseguir **provar que a especificação** impede a falsificação, você elimina toda a classe de bug que se escondeu aqui por quatro anos.

Essa é exatamente a ideia do primeiro pilar da Parte 1: verifique a especificação e você fecha a lacuna que os testes nunca conseguiriam fechar.

---

## 8. Um aviso honesto

Simplificamos deliberadamente. O circuito real envolve centenas de regiões e muitos milhares de restrições, e a falha real é tecnicamente mais intrincada do que uma única verificação de bit ausente; usamos a verificação de bit porque ela mostra exatamente o *formato* de um circuito sub-restrito e porque esse exato erro é real no histórico do Zcash. A falha precisa do Orchard foi uma multiplicação em curva elíptica sub-restrita, conforme declarado na divulgação oficial. Também resumimos a linha do tempo da divulgação e da correção. Para o relato técnico oficial, consulte a divulgação da Shielded Labs e os textos do Project Tachyon.

---

## 9. Resumo

- A pool blindada do Zcash oculta os valores usando **provas de conhecimento zero**, então uma falha nessas provas poderia permitir uma **falsificação invisível**.
- Um sistema de provas verifica um **circuito** fixo de **restrições**; sua propriedade crucial é a **solidez**: apenas afirmações verdadeiras devem ter uma **testemunha** que as satisfaça.
- Uma **restrição ausente** cria uma **lacuna de solidez**, deixando passar afirmações falsas. (Caso de exemplo verificado: `b(b−1)=0` força `b` a ser 0 ou 1; remova-a e `b` pode ser qualquer coisa. Essa exata classe de bug é real no histórico do Zcash.)
- O **bug do Orchard** foi uma **multiplicação em curva elíptica sub-restrita**: entradas falsas arbitrárias podiam passar na verificação da multiplicação, permitindo uma falsificação ilimitada e indetectável. Um exploit funcional foi demonstrado em uma rede de teste.
- Ele ficou escondido por **quatro anos** (de maio de 2022 a junho de 2026) porque os testes fazem amostragem de casos e nunca amostraram esse; ele foi encontrado raciocinando sobre a matemática, com ajuda de IA, em 29 de maio de 2026.
- A falsificação indetectável só pode viver na **especificação**, e o Zcash já viu essa família de bug antes. O Zcash respondeu com uma correção emergencial e uma nova pool verificada formalmente, a **Ironwood**, assunto da Parte 3.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Shielded pool** | O modo privado do Zcash, em que os valores e as partes ficam ocultos |
| **Zero-knowledge proof** | Uma prova de que uma afirmação oculta é válida, sem revelar mais nada |
| **Circuit** | O conjunto fixo de condições aritméticas que uma transação válida precisa satisfazer |
| **Constraint** | Uma condição (equação) dentro do circuito |
| **Witness** | Os valores secretos que satisfazem as restrições |
| **Soundness** | A garantia de que apenas afirmações verdadeiras podem produzir uma prova válida |
| **Soundness gap** | Uma restrição ausente que deixa passar afirmações falsas |
| **Under-constrained** | Um circuito ao qual falta uma condição necessária, a raiz do bug do Orchard |
| **Detectable / undetectable** | Se uma exploração deixaria ou não evidências no registro público |

---

## Perguntas frequentes

**Foi realmente criado Zcash falsificado?**
Não foi encontrada nenhuma evidência de exploração, e a equipe considera isso improvável. Mas, como a falha teria sido indetectável a partir do registro, o registro, por si só, não consegue provar totalmente que isso nunca aconteceu, e é por isso que a resposta foi tão minuciosa.

**Por que ocultar valores torna um bug pior?**
Em uma chain transparente, as moedas cunhadas ficam visíveis e podem ser detectadas e revertidas. Quando os valores ficam ocultos por privacidade, um bug de falsificação não produz nenhuma anomalia visível, então pode persistir sem ser visto.

**Por que anos de auditorias não o detectaram?**
Auditorias e testes examinam, em grande parte, o comportamento em casos realistas. Essa falha só aparecia com uma entrada incomum, criada deliberadamente e mirando um caso extremo matemático, que a revisão de rotina não acionava. Ela foi encontrada por um raciocínio direcionado sobre o circuito, não por testes.

**Basta mesmo uma restrição ausente?**
Sim. Um sistema de provas só é tão forte quanto o seu conjunto completo de restrições. Uma única condição necessária deixada de fora já basta para deixar passar afirmações inválidas.

**Qual foi o papel da IA?**
Um pesquisador usou um modelo de IA de fronteira, junto com um ambiente personalizado e métodos tradicionais, para revisar a matemática do circuito e encontrar a falha. A IA é cada vez mais usada pelos dois lados da segurança, e isso é parte do motivo pelo qual provar que os sistemas estão corretos importa tanto agora.

---

### Teste sua intuição

Suponha que uma transação blindada deva provar que "o dinheiro que entra é igual ao dinheiro que sai", mas o circuito se esquece de restringir um valor de saída. O que um provador desonesto poderia fazer e por que o registro público pareceria completamente normal? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Com essa saída sem restrição, o provador poderia defini-la como maior do que as entradas reais permitem, criando valor do nada, uma falsificação. A prova ainda seria verificada, porque a restrição ausente é a única coisa que teria detectado o desequilíbrio. E, como a pool blindada oculta os valores, o registro mostra apenas que "ocorreu uma transação válida", sem nenhum desequilíbrio visível para disparar um alarme. A falsificação é real, mas invisível, e é exatamente por isso que a solidez do circuito importa tanto, e exatamente por isso que ela precisa ser provada, e não testada.
</details>

---

### O que vem a seguir

**Parte 3 · Ironwood:** a correção não foi apenas um patch. Os engenheiros do Zcash construíram uma nova pool blindada e a acompanharam de uma prova matemática verificada por máquina, com mais de 2.700 teoremas escritos no assistente de provas Lean, de que ela não pode criar dinheiro falsificado sob as suas premissas declaradas. Veremos o que significam "integridade do saldo" e "solidez de conhecimento", o que exatamente a prova cobre e não cobre, e como a pool antiga foi aposentada com segurança.

*Parte da série* Verificação formal  *para [ZecHub](https://zechub.org).*
