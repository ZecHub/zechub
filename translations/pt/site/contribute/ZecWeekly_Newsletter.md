<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Newsletter ZecWeekly

ZecWeekly é uma newsletter enviada todas as sextas-feiras de manhã. Ela inclui todas as notícias que aconteceram durante a semana no ecossistema Zcash.

As notícias são selecionadas semanalmente por membros da comunidade, e todos os links relevantes são adicionados à newsletter.

Assine a newsletter [aqui](https://zechub.substack.com/).

## Contribuir

As contribuições para a newsletter funcionam melhor quando um colaborador prepara a edição para a semana correta, acompanha a thread atual de recompensa ou coordenação e envia o pull request depois que os links da semana estiverem prontos. Por favor, não envie uma edição futura antes de o ZecHub publicar ou confirmar a data dessa edição. Pull requests enviados cedo demais muitas vezes deixam de fora atualizações do fim da semana, entram em conflito com um curador designado ou usam o prazo errado.

### 1. Confirmar a edição atual

Antes de começar a escrever:

- Verifique as [issues do GitHub do ZecHub](https://github.com/ZecHub/zechub/issues) e o [Dework](https://app.dework.xyz/zechub-2424) para encontrar a tarefa atual da newsletter.
- Use a data no título da issue ou na descrição da tarefa como fonte da verdade.
- Abra a issue e verifique se outro colaborador já comentou, foi designado ou abriu um pull request vinculado.
- Pesquise os pull requests abertos pelo número da issue e pela data da edição antes de começar. Por exemplo, pesquise `is:pr is:open "May 30th" repo:ZecHub/zechub`.
- Se a tarefa não estiver clara, pergunte na issue, no Discord do ZecHub ou enviando uma mensagem para o [ZecHub no Twitter](https://twitter.com/ZecHub) antes de preparar a edição completa.

![Issues abertas do GitHub filtradas para as tarefas atuais da newsletter ZecWeekly](assets/zecweekly-current-task-search.png)

### 2. Fazer um fork do repositório

Se você é novo no GitHub, use este fluxo de trabalho:

1. Abra o [repositório do ZecHub](https://github.com/ZecHub/zechub).
2. Clique em **Fork** e crie um fork na sua conta do GitHub.
3. No seu fork, crie uma nova branch para a edição. Um nome de branch claro ajuda, como `digest-may-30-2026`.
4. Certifique-se de que seu pull request terá `ZecHub/zechub` como repositório base e `main` como branch base.

Se você usa a linha de comando, o mesmo fluxo de trabalho fica assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Criar o arquivo da newsletter

Use o [modelo da newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições da newsletter pertencem à pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o arquivo:

- Siga o formato de nome de arquivo solicitado pela issue ou usado por edições aceitas recentemente.
- Mantenha a mesma ordem das seções do modelo, a menos que a tarefa peça um formato diferente.
- Adicione links apenas da semana relevante.
- Escreva uma descrição curta e clara para cada link, para que os leitores entendam por que ele é importante.
- Traduza ou resuma em inglês fontes que não estejam em inglês, quando necessário.
- Verifique cada link antes de abrir o pull request.

### 4. Coletar links no momento certo

O ZecWeekly normalmente cobre a atividade do ecossistema Zcash da semana atual e é publicado perto do fim da semana. O momento mais seguro é:

- Começar a coletar links depois que a issue ou tarefa da newsletter atual for publicada.
- Manter um rascunho enquanto a semana ainda estiver em andamento.
- Enviar o pull request perto da data de envio solicitada, depois de verificar se houve atualizações no fim da semana.
- Não envie a newsletter de uma semana futura antes que a tarefa para essa data exista ou antes que o ZecHub confirme que você deve prepará-la.

Se uma issue disser para enviar até uma data específica, siga essa data. Se houver conflito entre esta página e uma issue atual, siga a issue atual.

### 5. Abrir o pull request

Quando o arquivo da sua newsletter estiver pronto:

1. Faça commit das suas alterações no seu fork.
2. Abra um pull request para `ZecHub/zechub` na branch `main`.
3. Use um título que corresponda à edição, como `Zcash Ecosystem Digest | May 30th`.
4. Vincule a issue no corpo do pull request para que os revisores possam relacionar o trabalho à tarefa.

Exemplo de corpo do pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois que o pull request estiver aberto, acompanhe os comentários de revisão. Se o ZecHub pedir edições, atualize a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Use estes pull requests de newsletter já mesclados como exemplos de envios aceitos:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![Exemplo de pull request mesclado da newsletter ZecWeekly](assets/zecweekly-example-pr.png)

Ao comparar seu trabalho com um exemplo, concentre-se no local do arquivo, no formato do título, na ordem das seções, nas descrições dos links e em saber se o pull request remete à tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou a tarefa estar confirmada.
- Trabalhar em uma issue que já tem um pull request vinculado.
- Enviar o pull request para o seu próprio fork em vez de `ZecHub/zechub`.
- Usar o nome de arquivo errado ou colocar o arquivo fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, links e descrições.
- Adicionar links da semana errada.
- Deixar links quebrados, links duplicados ou texto placeholder do modelo.
- Abrir um novo pull request após comentários de revisão em vez de atualizar a branch original.

### Checklist final

Antes de solicitar revisão, confirme que:

- A data da issue ou da tarefa corresponde ao arquivo da sua newsletter.
- Nenhum outro pull request aberto já está cobrindo a mesma issue ou edição.
- O arquivo está na pasta `newsletter`.
- As seções do modelo estão completas.
- Todos os links funcionam e têm uma descrição útil.
- O corpo do pull request vincula a issue correta.
- Você está disponível para fazer edições se os revisores solicitarem mudanças.

## Edições anteriores

[Arquivo do ZecWeekly](https://zechub.substack.com/p/archive)
