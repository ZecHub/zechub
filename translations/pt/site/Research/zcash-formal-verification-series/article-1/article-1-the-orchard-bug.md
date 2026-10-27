![Texto alternativo](image-1.png)
# O bug do Orchard: quando um sistema de provas tem uma falha

### Como uma linha de matemática com restrições insuficientes poderia ter criado dinheiro invisível ilimitado

> **Série:** *Série sobre verificação formal* · **Parte 2 de 3**
> **Público:** iniciantes. A Parte 1 apresentou a verificação formal; aqui você conhecerá o bug real que a tornou urgente. Tudo o que é necessário é explicado desde o início.
> **O que você aprenderá:** uma visão intuitiva, mas precisa, de como um sistema de provas criptográficas pode conter uma falha de solidez, o que foi exatamente o bug "Orchard" de 2026 no Zcash, por que essa classe de bug pode permanecer oculta durante anos e por que isso já aconteceu antes.

Na Parte 1, dissemos que os testes podem mostrar a presença de bugs, mas nunca sua ausência, e que os bugs mais perigosos estão na *especificação* de um sistema, em sua matemática subjacente. Este artigo é o estudo de caso. Em 2026, foi encontrada uma falha no pool blindado Orchard do Zcash que poderia ter permitido a um atacante criar dinheiro falsificado ilimitado de forma invisível. Ela sobreviveu por quatro anos e a repetidas auditorias. Compreendê-la, assim como seus precedentes, é a motivação mais clara possível para provar que os sistemas estão corretos.

---

## 1. Por que isso deve importar para você?

O Zcash é uma criptomoeda com um modo privado. Em seu pool blindado, os valores, remetentes e destinatários das transações ficam **ocultos**. Essa privacidade é criada usando **provas de conhecimento zero**: provas criptográficas de que uma transação segue todas as regras, sem revelar o conteúdo da transação.

Esse design tem dois lados. Em um livro-razão transparente como o do Bitcoin, se alguém criasse moedas do nada, os números inflacionados seriam visíveis para todos, e a rede poderia detectá-los e revertê-los. Em um pool blindado, os números ficam ocultos por design. Portanto, se o próprio sistema de provas tivesse uma falha que permitisse que uma transação inválida parecesse válida, a falsificação seria **indetectável**. Você não conseguiria identificá-la inspecionando o livro-razão, porque ele é deliberadamente opaco.

Esse é exatamente o risco que se materializou no Orchard. Para compreendê-lo, precisamos examinar o que uma prova de conhecimento zero realmente verifica.

---

## 2. A intuição: uma prova é tão boa quanto sua lista de verificação

Imagine um agente de fronteira que precisa aprovar viajantes sem ver diretamente seus documentos. Em vez disso, cada viajante preenche uma **lista de verificação**, e o agente aprova qualquer pessoa cuja lista esteja totalmente marcada. A lista é projetada de modo que *apenas um viajante legítimo consiga marcar todas as caixas.*

Agora suponha que falta uma caixa crucial na lista, por exemplo, "o passaporte não está vencido". Quase todo mundo continua a preenchê-la honestamente e nada parece errado. Mas uma pessoa com um passaporte vencido também consegue marcar todas as caixas restantes e passar sem dificuldades. O sistema parece funcionar bem no uso cotidiano. A falha só importa para alguém que a procure.

Uma prova de conhecimento zero funciona como essa lista de verificação. Ela não revela os detalhes privados; verifica se eles satisfazem um conjunto fixo de condições. E, se uma condição necessária for acidentalmente omitida, algumas entradas inválidas também podem passar, enquanto tudo continua parecendo normal.

Vamos tornar precisa a ideia de "lista de condições", pois foi exatamente aí que o bug estava.

---

## 3. A matemática: circuitos, restrições e solidez

Nos bastidores, a afirmação "esta transação é válida" é codificada como um **circuito**: uma coleção fixa de condições aritméticas, chamadas **restrições**, escritas como equações sobre números. Para criar uma prova válida, quem prova deve fornecer valores secretos (a **testemunha**) que satisfaçam *todas* as restrições. A prova convence um verificador de que essa testemunha existe, sem revelá-la.

A propriedade de que precisamos nesse sistema tem um nome:

> **Solidez:** deve ser impossível produzir uma prova válida para uma afirmação *falsa*. Apenas afirmações verdadeiras devem ter testemunhas que satisfaçam todas as restrições.

A solidez é a garantia contra a falsificação. Se a solidez se mantiver, uma prova válida realmente significa "ocorreu uma transação real que segue as regras". Se a solidez tiver uma lacuna, uma prova válida pode não significar absolutamente nada.

### O que uma restrição ausente faz (um exemplo verificado)

As restrições muitas vezes precisam forçar um valor a ser simples. Um exemplo comum: forçar um valor `b` a ser um único **bit**, ou seja, `0` ou `1`. A forma padrão de fazer isso é com uma restrição:

```
b × (b − 1) = 0
```

Por que isso funciona? Um produto é zero apenas quando um de seus fatores é zero. Portanto, `b × (b − 1) = 0` força `b = 0` ou `b = 1`, e nada mais. Ao verificar todos os valores de 0 a 16 (em uma aritmética que dá a volta em 17), os *únicos* valores que a satisfazem são exatamente **0 e 1**. ✓

Agora imagine que essa linha seja **acidentalmente omitida** do circuito. De repente, `b` não tem restrições. Quem prova desonestamente pode definir `b` como `5`, ou `9`, ou qualquer outro valor, e ainda satisfazer as restrições restantes. Essa única linha ausente é uma **lacuna de solidez**: afirmações falsas agora têm testemunhas satisfatórias.

Isso não é hipotético. Uma restrição booleana ausente exatamente desse tipo foi encontrada no primeiro design blindado do Zcash, Sprout, durante o desenvolvimento, e corrigida antes do lançamento. Restrições insuficientes são um dos erros mais comuns e perigosos na construção desses circuitos.

![Texto alternativo](image-2.png)

Essa é toda a estrutura do bug do Orchard, em pequena escala. Agora, o caso real.

---

## 4. O que realmente foi o bug do Orchard

As provas blindadas do Zcash são construídas sobre **curvas elípticas**, objetos matemáticos cujos pontos podem ser combinados e "multiplicados" por números, operações que o circuito precisa impor por meio de restrições. O circuito contém componentes que realizam a **multiplicação de curvas elípticas** e verificam se ela foi feita corretamente.

Segundo a divulgação feita pela Shielded Labs e pelo pesquisador Taylor Hornby, a falha do Orchard foi precisamente esta:

> Um **elemento com restrições insuficientes do circuito Orchard** tornou possível fornecer **entradas falsas arbitrárias a uma multiplicação de curva elíptica e ainda fazer a verificação da multiplicação passar.**

Em termos simples, faltavam na lista de verificação do circuito as caixas que deveriam fixar essa multiplicação. Devido à lacuna, um atacante suficientemente especializado poderia construir uma prova de transação que o sistema aceitaria, embora a transação criasse valor do nada. Isso é **falsificação** e, como os valores no pool blindado estão ocultos, teria sido **indetectável** no livro-razão. Mais tarde, a equipe Tachyon descreveu a mesma falha no nível do código como linhas ausentes no circuito que alteravam silenciosamente as equações subjacentes.

Os paralelos com nossa história da lista de verificação são exatos:

| Checklist story | O bug do Orchard |
|---|---|
| Falta a caixa "passaporte não vencido" | Falta uma restrição em uma multiplicação de curva elíptica |
| Um viajante com passaporte vencido passa mesmo assim | Entradas falsas arbitrárias passam na verificação da multiplicação |
| Todos os outros não são afetados, então nada parece errado | As transações normais funcionavam perfeitamente, ocultando a falha |
| Só alguém procurando por ela encontra a falha | Foi necessário um especialista sondando deliberadamente a matemática do circuito |

Para deixar clara a gravidade: o pesquisador, com assistência de IA, escreveu um *exploit funcional completo* e confirmou em uma rede de testes local que ele produzia moedas falsificadas ilimitadas e indetectáveis. Era uma falha real e explorável, não uma preocupação teórica.

---

## 5. Por que ela permaneceu oculta por quatro anos

O bug esteve no Orchard desde sua ativação em **maio de 2022** até a correção de emergência em **junho de 2026**, passando por repetidas auditorias profissionais feitas por alguns dos melhores criptógrafos do mundo. Como?

Porque, como a Parte 1 alertou, **os testes amostram casos, e essa falha existia em um caso que ninguém amostrou.** As transações normais nunca acionavam a restrição ausente, então todos os testes passavam e todos os dias de operação normal pareciam impecáveis. A falha só podia ser alcançada construindo deliberadamente uma testemunha incomum, direcionada exatamente à lacuna. Ela acabou sendo encontrada não pela execução de testes, mas pelo *raciocínio sobre a matemática do circuito*.

A própria descoberta é um sinal da direção que a segurança está tomando. Em abril de 2026, a Shielded Labs contratou o pesquisador de segurança **Taylor Hornby** especificamente para procurar exatamente esse tipo de falha. Pouco depois do lançamento de um novo modelo de IA de fronteira (Claude Opus 4.8 da Anthropic), no fim de maio de 2026, Hornby o utilizou, junto com uma ferramenta personalizada de análise e métodos tradicionais, em uma revisão direcionada do circuito Orchard. Em **29 de maio de 2026**, a revisão encontrou a vulnerabilidade.

Vale a pena declarar claramente dois fatos sóbrios da divulgação:

- A equipe não encontrou **nenhuma evidência** de que o bug tenha sido explorado e considera improvável uma exploração anterior (ele havia escapado a anos de escrutínio especializado e foi encontrado por meio de um esforço deliberado de white hat). Porém, a própria natureza de uma falha *indetectável* significa que o livro-razão, por si só, não consegue provar totalmente que isso nunca aconteceu.
- A descoberta causou uma turbulência significativa, incluindo uma queda acentuada no preço do ativo, precisamente porque a *possibilidade* de falsificação oculta é muito grave para o dinheiro.

![Texto alternativo](image-3.png)

---

## 6. Esta não foi a primeira vez

O bug do Orchard pertence a uma família recorrente, e ver essa família é o que faz a verificação formal parecer não opcional, mas inevitável. Uma falha de falsificação sempre tem origem em uma de três fontes (a taxonomia da Parte 1): a **especificação** (a própria matemática), a **implementação** (código que não segue a matemática correta) ou uma **premissa quebrada**. E, crucialmente:

> Um bug de falsificação só é **indetectável** se estiver na **especificação**. Bugs de implementação deixam evidências públicas permanentes, porque cada bloco registra o conteúdo completo de cada transação, de modo que reproduzir o histórico com software corrigido exporia qualquer transação que o código defeituoso tenha aceitado indevidamente.

A própria história do Zcash ilustra o padrão:

| Bug (year) | Origem | Detectável? |
|---|---|---|
| Falha de compromisso do Zerocash (2016, pré-lançamento) | Especificação (um hash truncado quebrou uma propriedade de vinculação) | Indetectável |
| Falha de solidez da configuração confiável (2018) | Especificação (um erro no artigo subjacente sobre zk-SNARK) | Indetectável |
| Colisão de consultas do sistema de provas (2025) | Especificação (uma verificação ausente no sistema de provas) | Detectável |
| Bug de validação de subgrupo de curva (2016) | Implementação (uma verificação de subgrupo ausente) | Detectável |
| **Multiplicação do Orchard com restrições insuficientes (2026)** | **Especificação (o circuito)** | **Indetectável** |

A conclusão é clara: as falhas que poderiam permanecer ocultas para sempre são as que estão na matemática. Essa é precisamente a classe que uma prova da especificação, verificada por máquina, pode eliminar, todos os casos de uma só vez. Os testes e as auditorias amostram; somente provar a matemática cobre todas as entradas.

---

## 7. A resposta

Os desenvolvedores do Zcash agiram rapidamente e em etapas:

1. **Correção de emergência (até 1-2 de junho de 2026).** Em poucos dias após a divulgação, uma atualização de emergência da rede fechou a janela de vulnerabilidade, adicionando as restrições ausentes para que a matemática do circuito voltasse a ser sólida.
2. **Um novo começo demonstrável ("Ironwood", ativado em 28 de julho de 2026).** Em vez de confiar indefinidamente em uma versão corrigida do pool antigo, a comunidade lançou um pool blindado totalmente novo, Ironwood, baseado no circuito corrigido, mas começando do zero e acompanhado por uma prova formal de correção verificada por máquina.

Esse segundo passo é onde a verificação formal entra na história, e é o tema da Parte 3. Vale a pena antecipar a conclusão sobre a qual a equipe agiu, pois ela une toda esta série:

> Uma falha de falsificação *indetectável* só pode existir na **especificação** do protocolo. Portanto, se você conseguir **provar que a especificação** exclui a falsificação, eliminará toda a classe de bugs que permaneceu oculta aqui por quatro anos.

Essa é exatamente a ideia do primeiro pilar da Parte 1: verifique a especificação, e você fechará a lacuna que os testes nunca conseguiriam fechar.

---

## 8. Uma ressalva honesta

Simplificamos deliberadamente. O circuito real envolve centenas de regiões e muitos milhares de restrições, e a falha real é tecnicamente mais intrincada do que uma única verificação de bit ausente; usamos a verificação de bit porque ela mostra exatamente a *estrutura* de um circuito com restrições insuficientes e porque esse erro exato é real na história do Zcash. A falha precisa do Orchard foi uma multiplicação de curva elíptica com restrições insuficientes, como declarado na divulgação oficial. Também condensamos o cronograma de divulgação e correção. Para o relato técnico oficial, consulte a divulgação da Shielded Labs e os textos do Project Tachyon.

---

## 9. Resumo

- O pool blindado do Zcash oculta valores usando **provas de conhecimento zero**, portanto uma falha nessas provas poderia permitir **falsificação invisível**.
- Um sistema de provas verifica um **circuito** fixo de **restrições**; sua propriedade crucial é a **solidez**: apenas afirmações verdadeiras devem ter uma **testemunha** satisfatória.
- Uma **restrição ausente** cria uma **lacuna de solidez**, permitindo que afirmações falsas passem. (Caso simples verificado: `b(b−1)=0` força `b` a ser 0 ou 1; remova-a e `b` pode ser qualquer valor. Essa classe exata de bug é real na história do Zcash.)
- O **bug do Orchard** foi uma **multiplicação de curva elíptica com restrições insuficientes**: entradas falsas arbitrárias podiam passar na verificação da multiplicação, permitindo falsificação ilimitada e indetectável. Um exploit funcional foi demonstrado em uma rede de testes.
- Ele permaneceu oculto por **quatro anos** (maio de 2022 a junho de 2026) porque os testes amostram casos e nunca o amostraram; foi encontrado por meio de raciocínio sobre a matemática, com assistência de IA, em 29 de maio de 2026.
- A falsificação indetectável só pode existir na **especificação**, e o Zcash já viu essa família de bugs antes. O Zcash respondeu com uma correção de emergência e um novo pool formalmente verificado, **Ironwood**, o tema da Parte 3.

---

## Glossário

| Term | Significado em linguagem simples |
|---|---|
| **Shielded pool** | O modo privado do Zcash em que os valores e as partes estão ocultos |
| **Zero-knowledge proof** | Uma prova de que uma afirmação oculta é válida, sem revelar mais nada |
| **Circuit** | O conjunto fixo de condições aritméticas que uma transação válida deve satisfazer |
| **Constraint** | Uma condição (equação) dentro do circuito |
| **Witness** | Os valores secretos que satisfazem as restrições |
| **Soundness** | A garantia de que apenas afirmações verdadeiras podem produzir uma prova válida |
| **Soundness gap** | Uma restrição ausente que permite que afirmações falsas passem |
| **Under-constrained** | Um circuito sem uma condição de que precisava, a origem do bug do Orchard |
| **Detectable / undetectable** | Se a exploração deixaria evidências no livro-razão público |

---

## Perguntas frequentes

**Zcash falsificado foi realmente criado?**
Nenhuma evidência de exploração foi encontrada, e a equipe considera isso improvável. Mas, como a falha teria sido indetectável no livro-razão, ele por si só não consegue provar totalmente que isso nunca aconteceu, razão pela qual a resposta foi tão minuciosa.

**Por que ocultar valores torna um bug pior?**
Em uma chain transparente, as moedas criadas são visíveis e podem ser detectadas e revertidas. Quando os valores são ocultos para garantir privacidade, um bug de falsificação não produz nenhuma anomalia visível, portanto pode persistir sem ser visto.

**Por que anos de auditorias não o detectaram?**
As auditorias e os testes examinam principalmente o comportamento em casos realistas. Essa falha só surgia com uma entrada incomum e deliberadamente construída, direcionada a um caso-limite matemático, que a revisão de rotina não exercitou. Ela foi encontrada por raciocínio direcionado sobre o circuito, e não por testes.

**Uma restrição ausente é realmente suficiente?**
Sim. Um sistema de provas é apenas tão forte quanto o seu conjunto completo de restrições. Basta deixar de fora uma condição necessária para permitir a passagem de afirmações inválidas.

**Que papel a IA desempenhou?**
Um pesquisador usou um modelo de IA de fronteira juntamente com uma ferramenta personalizada e métodos tradicionais para revisar a matemática do circuito e encontrar a falha. A IA é cada vez mais usada em ambos os lados da segurança, o que é parte da razão pela qual provar agora que os sistemas estão corretos é tão importante.

---

### Teste sua intuição

Suponha que uma transação blindada deve provar que "o dinheiro que entra é igual ao dinheiro que sai", mas o circuito esquece de restringir um valor de saída. O que um provador desonesto poderia fazer e por que o livro-razão público pareceria completamente normal? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Com essa saída sem restrições, o provador poderia defini-la acima do que as entradas reais permitem, criando valor do nada, uma falsificação. A prova continuaria a verificar, porque a restrição ausente é a única coisa que teria detectado o desequilíbrio. E, como o pool blindado oculta os montantes, o livro-razão mostra apenas que "ocorreu uma transação válida", sem qualquer desequilíbrio visível que levante um alerta. A falsificação é real, mas invisível, o que é precisamente a razão pela qual a solidez do circuito é tão importante e pela qual deve ser provada, em vez de testada.
</details>

---

### O que vem a seguir

**Parte 3 · Ironwood:** a correção não foi apenas um patch. Os engenheiros do Zcash construíram um novo pool blindado e o acompanharam com uma prova matemática verificada por máquina, mais de 2.700 teoremas escritos no assistente de provas Lean, de que não pode criar dinheiro falsificado sob as suas premissas declaradas. Você verá o que significam "integridade do saldo" e "solidez do conhecimento", exatamente o que a prova cobre e não cobre, e como o pool antigo foi retirado em segurança.

*Parte da* série de verificação formal *para [ZecHub](https://zechub.org).*
