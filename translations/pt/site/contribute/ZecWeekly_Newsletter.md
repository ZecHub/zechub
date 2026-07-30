<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Newsletter ZecWeekly

O ZecWeekly é uma newsletter enviada todos os domingos de manhã. Inclui todas as notícias que aconteceram durante a semana no ecossistema Zcash. As notícias são selecionadas semanalmente por membros da comunidade e todos os links relevantes são adicionados à newsletter. Subscreve a newsletter [aqui](https://zechub.substack.com/).

## Contribuir

As contribuições para a newsletter funcionam melhor quando um colaborador prepara a edição para a semana correta, segue a thread atual de bounty ou de coordenação e submete o pull request depois de os links semanais estarem prontos. Por favor, não submetas uma edição futura antes de a ZecHub publicar ou confirmar a data dessa edição. Pull requests antecipados muitas vezes não incluem atualizações do fim da semana, entram em conflito com um curador já atribuído ou usam o prazo errado.

### 1. Confirmar a edição atual

Antes de começares a escrever:

- Verifica [ZEC Bounties ](https://bounties.zechub.wiki/) para a tarefa atual da newsletter.
- Espera que te seja atribuída

![ss](https://github.com/user-attachments/assets/149a802c-b64f-4969-ad89-e83ffecf568e)



### 2. Fazer fork do repositório

Se és novo no GitHub, usa este fluxo de trabalho:

1. Abre o [repositório ZecHub](https://github.com/ZecHub/zechub).
2. Clica em **Fork** e cria um fork na tua conta GitHub.
3. No teu fork, cria uma nova branch para a edição. Um nome de branch claro é útil, como `digest-may-30-2026`.
4. Certifica-te de que o teu pull request terá como repositório base `ZecHub/zechub` e como branch base `main`.

Se usares a linha de comandos, o mesmo fluxo de trabalho é assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Criar o ficheiro da newsletter

Usa o [modelo de newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições da newsletter pertencem à pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o ficheiro:

- Segue o formato de nome de ficheiro pedido na issue ou usado por edições recentes aceites.
- Mantém a mesma ordem de secções do modelo, a menos que a tarefa peça um formato diferente.
- Adiciona apenas links da semana relevante.
- Escreve uma descrição curta e clara para cada link, para que os leitores percebam por que é importante.
- Traduz ou resume em inglês fontes que não estejam em inglês, quando necessário.
- Verifica todos os links antes de abrir o pull request.

### 4. Recolher links no momento certo

O ZecWeekly normalmente cobre a atividade do ecossistema Zcash da semana atual e é publicado perto do final da semana. O momento mais seguro é:

- Começar a recolher links depois de a edição atual da newsletter ou a tarefa ser publicada.
- Manter um rascunho enquanto a semana ainda está em curso.
- Submeter o pull request perto da data de submissão pedida, depois de verificares se há atualizações de fim de semana.
- Não submeter a newsletter de uma semana futura antes de existir a tarefa para essa data ou antes de a ZecHub confirmar que deves prepará-la.

Se uma issue disser para submeter até uma data específica, segue essa data. Se houver um conflito entre esta página e uma issue atual, segue a issue atual.

### 5. Abrir o pull request

Quando o ficheiro da tua newsletter estiver pronto:

1. Faz commit das tuas alterações no teu fork.
2. Abre um pull request para `ZecHub/zechub` na branch `main`.
3. Usa um título que corresponda à edição, como `Zcash Ecosystem Digest | May 30th`.
4. Liga a issue no corpo do pull request para que os revisores possam associar o trabalho à tarefa.

Exemplo de corpo de pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois de o pull request estar aberto, acompanha os comentários de revisão. Se a ZecHub pedir edições, atualiza a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Usa estes pull requests de newsletters já integrados como exemplos de submissões aceites:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](https://github.com/user-attachments/assets/9230d68d-6406-4c8a-992c-df84e0d318d8)

Ao comparares o teu trabalho com um exemplo, concentra-te na localização do ficheiro, no formato do título, na ordem das secções, nas descrições dos links e em saber se o pull request remete para a tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou da tarefa estar confirmada.
- Trabalhar numa issue que já tem um pull request associado.
- Submeter o pull request para o teu próprio fork em vez de `ZecHub/zechub`.
- Usar o nome de ficheiro errado ou colocar o ficheiro fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, links e descrições.
- Adicionar links da semana errada.
- Deixar links quebrados, links duplicados ou texto provisório do modelo.
- Abrir um novo pull request após comentários de revisão em vez de atualizar a branch original.

### Lista de verificação final

Antes de pedires revisão, confirma que:

- A data da issue ou da tarefa corresponde ao ficheiro da tua newsletter.
- Não existe já outro pull request aberto a cobrir a mesma issue ou edição.
- O ficheiro está na pasta `newsletter`.
- As secções do modelo estão completas.
- Todos os links funcionam e têm uma descrição útil.
- O corpo do pull request liga à issue correta.
- Estás disponível para fazer edições se os revisores pedirem alterações.

## Edições anteriores

[Arquivo do ZecWeekly](https://zechub.substack.com/p/archive)
