<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

A ZecWeekly é uma newsletter que é enviada todos os domingos de manhã. Inclui todas as notícias que aconteceram durante a semana no ecossistema Zcash. As notícias são selecionadas semanalmente por membros da comunidade e todos os links relevantes são adicionados à newsletter. Subscreva a newsletter [aqui](https://zechub.substack.com/).

## Contribuir

As contribuições para a newsletter funcionam melhor quando um colaborador prepara a edição para a semana correta, segue a thread atual de recompensa ou coordenação e submete o pull request depois de os links semanais estarem prontos. Por favor, não submeta uma edição futura antes de a ZecHub publicar ou confirmar a data dessa edição. Pull requests antecipados muitas vezes falham atualizações de fim de semana, entram em conflito com um curador designado ou usam o prazo errado.

### 1. Confirmar a edição atual

Antes de começar a escrever:

- Verifique [ZEC Bounties ](https://bounties.zechub.wiki/) para a tarefa atual da newsletter.
- Aguarde ser-lhe atribuída

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fazer fork do repositório

Se é novo no GitHub, use este fluxo de trabalho:

1. Abra o [repositório ZecHub](https://github.com/ZecHub/zechub).
2. Clique em **Fork** e crie um fork na sua conta GitHub.
3. No seu fork, crie uma nova branch para a edição. Um nome de branch claro é útil, como `digest-may-30-2026`.
4. Certifique-se de que o seu pull request terá como repositório base `ZecHub/zechub` e como branch base `main`.

Se usar a linha de comandos, o mesmo fluxo de trabalho é assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Substitua `YOUR-USERNAME` pelo seu próprio nome de utilizador do GitHub. O URL acima é um marcador de posição e não será resolvido tal como está escrito.

### 3. Criar o ficheiro da newsletter

Use o [modelo da newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições da newsletter pertencem à pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o ficheiro:

- Siga o formato de nome de ficheiro pedido pela issue ou usado por edições recentes aceites.
- Mantenha a mesma ordem de secções do modelo, a menos que a tarefa peça um formato diferente.
- Adicione links apenas da semana relevante.
- Escreva uma descrição curta e clara para cada link, para que os leitores percebam porque é importante.
- Traduza ou resuma fontes que não estejam em inglês para inglês, quando necessário.
- Verifique cada link antes de abrir o pull request.

### 4. Recolher links no momento certo

A ZecWeekly normalmente cobre a atividade do ecossistema Zcash da semana atual e é publicada perto do final da semana. O momento mais seguro é:

- Comece a recolher links depois de a edição ou tarefa atual da newsletter ser publicada.
- Mantenha um rascunho enquanto a semana ainda está ativa.
- Submeta o pull request perto da data de submissão pedida, depois de verificar atualizações de fim de semana.
- Não submeta a newsletter de uma semana futura antes de a tarefa para essa data existir ou antes de a ZecHub confirmar que a deve preparar.

Se uma issue disser para submeter até uma data específica, siga essa data. Se houver um conflito entre esta página e uma issue atual, siga a issue atual.

### 5. Abrir o pull request

Quando o seu ficheiro da newsletter estiver pronto:

1. Faça commit das suas alterações no seu fork.
2. Abra um pull request para `ZecHub/zechub` na branch `main`.
3. Use um título que corresponda à edição, como `Zcash Ecosystem Digest | May 30th`.
4. Ligue a issue no corpo do pull request para que os revisores possam associar o trabalho à tarefa.

Exemplo de corpo do pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois de o pull request estar aberto, acompanhe os comentários de revisão. Se a ZecHub pedir edições, atualize a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Use estes pull requests de newsletters já integrados como exemplos de submissões aceites:

- [Zcash Ecosystem Digest | 11 de abril](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 de março](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 de fevereiro](https://github.com/ZecHub/zechub/pull/1474)


![Merged ZecWeekly newsletter pull request example](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Ao comparar o seu trabalho com um exemplo, concentre-se na localização do ficheiro, no formato do título, na ordem das secções, nas descrições dos links e em saber se o pull request remete para a tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou a tarefa estar confirmada.
- Trabalhar numa issue que já tem um pull request associado.
- Submeter o pull request para o seu próprio fork em vez de `ZecHub/zechub`.
- Usar o nome de ficheiro errado ou colocar o ficheiro fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, links e descrições.
- Adicionar links da semana errada.
- Deixar links quebrados, links duplicados ou texto de marcador de posição do modelo.
- Abrir um novo pull request após comentários de revisão em vez de atualizar a branch original.

### Lista de verificação final

Antes de pedir revisão, confirme que:

- A data da issue ou tarefa corresponde ao seu ficheiro da newsletter.
- Nenhum outro pull request aberto já está a cobrir a mesma issue ou edição.
- O ficheiro está na pasta `newsletter`.
- As secções do modelo estão completas.
- Todos os links funcionam e têm uma descrição útil.
- O corpo do pull request liga à issue correta.
- Está disponível para fazer edições se os revisores pedirem alterações.

## Edições anteriores

[Arquivo ZecWeekly](https://zechub.substack.com/p/archive)
