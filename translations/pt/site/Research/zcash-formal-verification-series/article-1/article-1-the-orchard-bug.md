![alt text](image-1.png)
# O Bug Orchard: Quando um Sistema de Provas Tem uma Falha

### Como uma linha de matemática com restrições insuficientes poderia ter criado dinheiro invisível ilimitado

> **Série:** *Série de Verificação Formal* · **Parte 2 de 3**
> **Público:** principiantes. A Parte 1 apresentou a verificação formal; aqui conhecemos o bug real que a tornou urgente. Tudo o que é necessário é explicado desde o início.
> **O que ficará a saber:** uma imagem intuitiva mas rigorosa de como um sistema de provas criptográficas pode conter uma falha de solidez, o que foi exatamente o bug "Orchard" de 2026 em Zcash, porque esta classe de bug pode permanecer oculta durante anos e porque já aconteceu antes.

Na Parte 1 dissemos que os testes podem mostrar a presença de bugs, mas nunca a sua ausência, e que os bugs mais perigosos residem na *especificação* de um sistema, na sua matemática subjacente. Este artigo é o estudo de caso. Em 2026, foi encontrada uma falha no pool protegido Orchard de Zcash que poderia ter permitido a um atacante criar dinheiro falsificado ilimitado de forma invisível. Tinha sobrevivido quatro anos e repetidas auditorias. Compreendê-la, bem como aos seus precedentes, é a motivação mais clara possível para provar que os sistemas estão corretos.

---

## 1. Porque deve importar-se?

Zcash é uma criptomoeda com um modo privado. No seu pool protegido, os montantes, remetentes e destinatários das transações ficam **ocultos**. Esta privacidade é criada através de **provas de conhecimento zero**: provas criptográficas de que uma transação cumpre todas as regras, sem revelar o conteúdo da transação.

Esse design tem dois lados. Num livro-razão transparente como o do Bitcoin, se alguém criasse moedas do nada, os números inflacionados seriam visíveis para todos, e a rede poderia detetá-lo e revertê-lo. Num pool protegido, os números estão ocultos por design. Assim, se o próprio sistema de provas tivesse uma falha que permitisse que uma transação inválida parecesse válida, a falsificação seria **indetetável**. Não seria possível identificá-la ao inspecionar o livro-razão, porque este é deliberadamente opaco.

Esse é exatamente o risco que se materializou em Orchard. Para o compreender, precisamos de olhar para o que uma prova de conhecimento zero realmente verifica.

---

## 2. A intuição: uma prova é tão boa quanto a sua lista de verificação

Imagine um agente de fronteira que tem de aprovar viajantes sem ver diretamente os seus documentos. Em vez disso, cada viajante preenche uma **lista de verificação**, e o agente aprova qualquer pessoa cuja lista esteja totalmente assinalada. A lista foi concebida de modo que *apenas um viajante legítimo consiga assinalar todas as caixas.*

Agora suponha que falta uma caixa crucial na lista, por exemplo, "o passaporte não está expirado". Quase toda a gente continua a preenchê-la honestamente e nada parece errado. Mas uma pessoa com um passaporte expirado também consegue assinalar todas as caixas restantes e passar sem dificuldades. O sistema parece funcionar bem no uso quotidiano. A falha só importa para alguém que a procure.

Uma prova de conhecimento zero funciona como essa lista de verificação. Não revela os detalhes privados; verifica que estes satisfazem um conjunto fixo de condições. E, se uma condição necessária for acidentalmente omitida, então algumas entradas inválidas também podem passar, enquanto tudo continua a parecer normal.

Vamos tornar precisa a ideia de "lista de condições", pois foi exatamente aí que o bug se encontrava.

---

## 3. A matemática: circuitos, restrições e solidez

Nos bastidores, a afirmação "esta transação é válida" é codificada como um **circuito**: uma coleção fixa de condições aritméticas, chamadas **restrições**, escritas como equações sobre números. Para criar uma prova válida, quem prova deve fornecer valores secretos (a **testemunha**) que satisfaçam *todas* as restrições. A prova convence um verificador de que essa testemunha existe, sem a revelar.

A propriedade de que precisamos neste sistema tem um nome:

> **Solidez:** tem de ser impossível produzir uma prova válida para uma afirmação *falsa*. Apenas afirmações verdadeiras devem ter testemunhas que satisfaçam todas as restrições.

A solidez é a garantia contra a falsificação. Se a solidez se mantiver, uma prova válida significa realmente "ocorreu uma transação verdadeira que respeita as regras". Se a solidez tiver uma lacuna, uma prova válida pode não significar absolutamente nada.

### O que uma restrição em falta faz (um exemplo verificado)

As restrições muitas vezes precisam de obrigar um valor a ser simples. Um exemplo comum: obrigar um valor `b` a ser um único **bit**, ou seja, `0` ou `1`. A forma padrão de o fazer é com uma restrição:

```
b × (b − 1) = 0
```

Porque funciona? Um produto é zero apenas quando um dos seus fatores é zero. Assim, `b × (b − 1) = 0` força `b = 0` ou `b = 1`, e nada mais. Ao verificar todos os valores de 0 a 16 (numa aritmética que dá a volta em 17), os *únicos* valores que o satisfazem são exatamente **0 e 1**. ✓

Agora imagine que essa linha é **acidentalmente omitida** do circuito. De repente, `b` não tem restrições. Quem prova desonestamente pode definir `b` como `5`, ou `9`, ou qualquer outro valor, e ainda satisfazer as restrições restantes. Essa única linha em falta é uma **lacuna de solidez**: afirmações falsas passam agora a ter testemunhas satisfatórias.

Isto não é hipotético. Uma restrição booleana em falta exatamente deste tipo foi encontrada no primeiro design protegido de Zcash, Sprout, durante o desenvolvimento, e foi corrigida antes do lançamento. A insuficiência de restrições é um dos erros mais comuns e perigosos na construção destes circuitos.

![alt text](image-2.png)

Esta é toda a estrutura do bug Orchard, numa escala reduzida. Agora, o caso real.

---

## 4. O que o bug Orchard realmente foi

As provas protegidas de Zcash são construídas sobre **curvas elípticas**, objetos matemáticos cujos pontos podem ser combinados e "multiplicados" por números, operações que o circuito tem de impor através de restrições. O circuito contém componentes que efetuam a **multiplicação de curvas elípticas** e verificam se foi realizada corretamente.

Segundo a divulgação feita pela Shielded Labs e pelo investigador Taylor Hornby, a falha Orchard foi precisamente esta:

> Um **elemento com restrições insuficientes do circuito Orchard** tornou possível fornecer **entradas falsas arbitrárias a uma multiplicação de curva elíptica e ainda assim fazer a verificação da multiplicação passar.**

Em termos simples, faltavam na lista de verificação do circuito as caixas que deveriam ter definido essa multiplicação. Devido à lacuna, um atacante suficientemente especializado poderia construir uma prova de transação que o sistema aceitaria, embora a transação criasse valor do nada. Isto é **falsificação** e, como os montantes no pool protegido estão ocultos, teria sido **indetetável** a partir do livro-razão. Mais tarde, a equipa Tachyon descreveu a mesma falha ao nível do código como linhas em falta no circuito que alteravam silenciosamente as equações subjacentes.

Os paralelos com a nossa história da lista de verificação são exatos:

| História da lista de verificação | O bug Orchard |
|---|---|
| Falta a caixa "passaporte não expirado" | Falta uma restrição numa multiplicação de curva elíptica |
| Um viajante com passaporte expirado passa na mesma | Entradas falsas arbitrárias passam na verificação da multiplicação |
| Todos os outros não são afetados, pelo que nada parece errado | As transações normais funcionavam perfeitamente, ocultando a falha |
| Só alguém que a procure encontra a falha | Foi necessário um especialista a sondar deliberadamente a matemática do circuito |

Para deixar clara a gravidade: o investigador, com assistência de IA, escreveu um *exploit funcional completo* e confirmou numa rede de testes local que produzia moedas falsificadas ilimitadas e indetetáveis. Era uma falha real e explorável, não uma preocupação teórica.

---

## 5. Porque permaneceu oculta durante quatro anos

O bug existiu em Orchard desde a sua ativação em **maio de 2022** até à correção de emergência em **junho de 2026**, passando por repetidas auditorias profissionais realizadas por alguns dos melhores criptógrafos do mundo. Como?

Porque, como a Parte 1 alertou, **os testes amostram casos, e esta falha existia num caso que ninguém amostrou.** As transações normais nunca acionavam a restrição em falta, por isso todos os testes passavam e todos os dias de operação normal pareciam irrepreensíveis. A falha só era alcançável construindo deliberadamente uma testemunha invulgar, dirigida diretamente à lacuna. Acabou por ser encontrada não através da execução de testes, mas por *raciocínio sobre a matemática do circuito*.

A própria descoberta é um sinal da direção que a segurança está a tomar. Em abril de 2026, a Shielded Labs contratou o investigador de segurança **Taylor Hornby** especificamente para procurar este tipo exato de falha. Pouco depois do lançamento de um novo modelo de IA de fronteira (Claude Opus 4.8 da Anthropic), no final de maio de 2026, Hornby utilizou-o, juntamente com uma ferramenta personalizada de análise e métodos tradicionais, numa revisão direcionada do circuito Orchard. A revisão encontrou a vulnerabilidade em **29 de maio de 2026**.

Vale a pena declarar claramente dois factos sóbrios da divulgação:

- A equipa não encontrou **nenhuma evidência** de que o bug tenha sido explorado e considera improvável uma exploração anterior (tinha escapado a anos de escrutínio especializado e foi encontrado através de um esforço deliberado de white hat). Porém, a própria natureza de uma falha *indetetável* significa que o livro-razão, por si só, não consegue provar totalmente que nunca aconteceu.
- A descoberta causou uma turbulência significativa, incluindo uma queda acentuada no preço do ativo, precisamente porque a *possibilidade* de falsificação oculta é tão grave para o dinheiro.

![alt text](image-3.png)

---

## 6. Esta não foi a primeira vez

O bug Orchard pertence a uma família recorrente, e ver essa família é o que faz a verificação formal parecer não opcional, mas inevitável. Uma falha de falsificação tem sempre origem numa de três fontes (a taxonomia da Parte 1): a **especificação** (a própria matemática), a **implementação** (código que não segue a matemática correta), ou uma **premissa quebrada**. E, crucialmente:

> Um bug de falsificação só é **indetetável** se residir na **especificação**. Bugs de implementação deixam evidência pública permanente, porque cada bloco regista o conteúdo completo de cada transação, pelo que reproduzir o histórico com software corrigido exporia qualquer transação que o código defeituoso tenha aceitado indevidamente.

A própria história de Zcash ilustra o padrão:

| Bug (ano) | Origem | Detetável? |
|---|---|---|
| Falha de compromisso Zerocash (2016, pré-lançamento) | Especificação (um hash truncado quebrou uma propriedade de vinculação) | Indetetável |
| Falha de solidez da configuração de confiança (2018) | Especificação (um erro no artigo subjacente sobre zk-SNARK) | Indetetável |
| Colisão de consultas do sistema de provas (2025) | Especificação (uma verificação em falta no sistema de provas) | Detetável |
| Bug de validação de subgrupo de curva (2016) | Implementação (uma verificação de subgrupo em falta) | Detetável |
| **Multiplicação com restrições insuficientes Orchard (2026)** | **Especificação (o circuito)** | **Indetetável** |

O fio condutor é evidente: as falhas que poderiam permanecer ocultas para sempre são as que estão na matemática. Esta é precisamente a classe que uma prova da especificação, verificada por máquina, pode eliminar, todos os casos de uma só vez. Os testes e as auditorias amostram; só provar a matemática abrange todas as entradas.

---

## 7. A resposta

Os desenvolvedores de Zcash agiram rapidamente e por fases:

1. **Correção de emergência (até 1-2 de junho de 2026).** Poucos dias após a divulgação, uma atualização de emergência da rede fechou a janela de vulnerabilidade, acrescentando as restrições em falta para que a matemática do circuito voltasse a ser sólida.
2. **Um novo começo demonstrável ("Ironwood", ativado em 28 de julho de 2026).** Em vez de confiar indefinidamente numa versão corrigida do pool antigo, a comunidade lançou um pool protegido completamente novo, Ironwood, baseado no circuito corrigido mas começando do zero, e acompanhado por uma prova formal de correção verificada por máquina.

Esse segundo passo é onde a verificação formal entra na história, e é o tema da Parte 3. Vale a pena antecipar a conclusão sobre a qual a equipa atuou, pois liga toda esta série:

> Uma falha de falsificação *indetetável* só pode existir na **especificação** do protocolo. Portanto, se conseguir **provar que a especificação** exclui a falsificação, elimina toda a classe de bugs que aqui permaneceu oculta durante quatro anos.

Essa é exatamente a ideia do primeiro pilar da Parte 1: verificar a especificação fecha a lacuna que os testes nunca conseguiriam fechar.

---

## 8. Uma ressalva honesta

Simplificámos deliberadamente. O circuito real envolve centenas de regiões e muitos milhares de restrições, e a falha real é tecnicamente mais intrincada do que uma única verificação de bit em falta; utilizámos a verificação de bit porque mostra exatamente a *estrutura* de um circuito com restrições insuficientes e porque esse erro exato é real na história de Zcash. A falha precisa de Orchard foi uma multiplicação de curva elíptica com restrições insuficientes, como declarado na divulgação oficial. Também condensámos o cronograma de divulgação e correção. Para o relato técnico oficial, consulte a divulgação da Shielded Labs e os textos do Project Tachyon.

---

## 9. Resumo

- O pool protegido de Zcash oculta montantes usando **provas de conhecimento zero**, pelo que uma falha nessas provas poderia permitir **falsificação invisível**.
- Um sistema de provas verifica um **circuito** fixo de **restrições**; a sua propriedade crucial é a **solidez**: apenas afirmações verdadeiras devem ter uma **testemunha** satisfatória.
- Uma **restrição em falta** cria uma **lacuna de solidez**, permitindo a passagem de afirmações falsas. (Caso simples verificado: `b(b−1)=0` força `b` a ser 0 ou 1; se for removida, `b` pode ser qualquer valor. Esta classe exata de bug é real na história de Zcash.)
- O **bug Orchard** foi uma **multiplicação de curva elíptica com restrições insuficientes**: entradas falsas arbitrárias podiam passar na verificação da multiplicação, permitindo falsificação ilimitada e indetetável. Foi demonstrado um exploit funcional numa rede de testes.
- Permaneceu oculto durante **quatro anos** (maio de 2022 a junho de 2026) porque os testes amostram casos e nunca o amostraram; foi encontrado através de raciocínio sobre a matemática, com assistência de IA, em 29 de maio de 2026.
- A falsificação indetetável só pode existir na **especificação**, e Zcash já viu esta família de bugs anteriormente. Zcash respondeu com uma correção de emergência e um novo pool formalmente verificado, **Ironwood**, o tema da Parte 3.

---

## Glossário

| Termo | Significado em linguagem simples |
|---|---|
| **Shielded pool** | O modo privado de Zcash em que os montantes e as partes estão ocultos |
| **Zero-knowledge proof** | Uma prova de que uma afirmação oculta é válida, sem revelar mais nada |
| **Circuit** | O conjunto fixo de condições aritméticas que uma transação válida deve satisfazer |
| **Constraint** | Uma condição (equação) dentro do circuito |
| **Witness** | Os valores secretos que satisfazem as restrições |
| **Soundness** | A garantia de que apenas afirmações verdadeiras podem produzir uma prova válida |
| **Soundness gap** | Uma restrição em falta que permite a passagem de afirmações falsas |
| **Under-constrained** | Um circuito sem uma condição de que precisava, a origem do bug Orchard |
| **Detectable / undetectable** | Se a exploração deixaria evidência no livro-razão público |

---

## Perguntas frequentes

**Foram realmente criadas Zcash falsificadas?**
Não foi encontrada nenhuma evidência de exploração, e a equipa considera-a improvável. Mas, como a falha teria sido indetetável a partir do livro-razão, este por si só não consegue provar totalmente que nunca aconteceu, razão pela qual a resposta foi tão minuciosa.

**Porque ocultar montantes torna um bug pior?**
Numa cadeia transparente, as moedas criadas são visíveis e podem ser detetadas e revertidas. Quando os montantes são ocultados para garantir privacidade, um bug de falsificação não produz qualquer anomalia visível, pelo que pode persistir sem ser visto.

**Porque é que anos de auditorias não o detetaram?**
As auditorias e os testes examinam sobretudo o comportamento em casos realistas. Esta falha só surgia com uma entrada invulgar e deliberadamente construída, dirigida a um caso-limite matemático, que a revisão de rotina não exercitou. Foi encontrada por raciocínio direcionado sobre o circuito, e não por testes.

**Uma restrição em falta é realmente suficiente?**
Sim. Um sistema de provas é apenas tão forte quanto o seu conjunto completo de restrições. Basta deixar de fora uma condição necessária para permitir a passagem de afirmações inválidas.

**Que papel desempenhou a IA?**
Um investigador usou um modelo de IA de fronteira juntamente com uma ferramenta personalizada e métodos tradicionais para rever a matemática do circuito e encontrar a falha. A IA é cada vez mais usada em ambos os lados da segurança, o que é parte da razão pela qual provar agora que os sistemas estão corretos é tão importante.

---

### Teste a sua intuição

Suponha que uma transação protegida deve provar que "o dinheiro que entra é igual ao dinheiro que sai", mas o circuito esquece-se de restringir um valor de saída. O que poderia fazer alguém que prova desonestamente e porque é que o livro-razão público pareceria completamente normal? *(Resposta abaixo.)*

<details><summary>Resposta</summary>

Com essa saída sem restrições, quem prova poderia defini-la acima do que as entradas reais permitem, criando valor do nada, uma falsificação. A prova continuaria a verificar, porque a restrição em falta é a única coisa que teria detetado o desequilíbrio. E, como o pool protegido oculta os montantes, o livro-razão mostra apenas que "ocorreu uma transação válida", sem qualquer desequilíbrio visível que levante um alerta. A falsificação é real mas invisível, que é precisamente a razão pela qual a solidez do circuito é tão importante e pela qual tem de ser provada, em vez de testada.
</details>

---

### O que se segue

**Parte 3 · Ironwood:** a correção não foi apenas um patch. Os engenheiros de Zcash construíram um novo pool protegido e acompanharam-no com uma prova matemática verificada por máquina, mais de 2.700 teoremas escritos no assistente de provas Lean, de que não pode criar dinheiro falsificado sob as suas premissas declaradas. Veremos o que significam "integridade do saldo" e "solidez do conhecimento", exatamente o que a prova cobre e não cobre, e como o pool antigo foi retirado em segurança.

*Parte da* série de Verificação Formal *para [ZecHub](https://zechub.org).*
