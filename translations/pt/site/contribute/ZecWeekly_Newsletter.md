<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Boletim informativo ZecWeekly

ZecWeekly é um boletim informativo enviado todos os domingos de manhã. Inclui todas as notícias que aconteceram durante a semana no ecossistema Zcash. As notícias são selecionadas semanalmente por membros da comunidade e todas as ligações relevantes são adicionadas ao boletim informativo. Subscreva o boletim informativo [aqui](https://zechub.substack.com/).

## Contribuir

As contribuições para o boletim informativo funcionam melhor quando um contribuidor prepara a edição para a semana correta, segue o tópico atual de recompensa ou coordenação e submete o pull request depois de as ligações semanais estarem prontas. Não submeta uma edição futura antes de o ZecHub publicar ou confirmar a data dessa edição. Pull requests antecipados frequentemente não incluem atualizações do final da semana, entram em conflito com um curador designado ou utilizam o prazo errado.

### 1. Confirmar a edição atual

Antes de começar a escrever:

- Consulte [ZEC Bounties ](https://bounties.zechub.wiki/) para a tarefa atual do boletim informativo.
- Aguarde que lhe seja atribuída a tarefa

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fazer um fork do repositório

Se é novo no GitHub, utilize este fluxo de trabalho:

1. Abra o [repositório do ZecHub](https://github.com/ZecHub/zechub).
2. Clique em **Fork** e crie um fork na sua conta GitHub.
3. No seu fork, crie uma nova branch para a edição. Um nome de branch claro é útil, como `digest-may-30-2026`.
4. Certifique-se de que o seu pull request terá `ZecHub/zechub` como repositório base e `main` como branch base.

Se utilizar a linha de comandos, o mesmo fluxo de trabalho é assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Substitua `YOUR-USERNAME` pelo seu próprio nome de utilizador do GitHub. O URL acima é um marcador de posição e não será resolvido como está escrito.

### 3. Criar o ficheiro do boletim informativo

Utilize o [modelo de boletim informativo](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições do boletim informativo pertencem à pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o ficheiro:

- Siga o formato de nome de ficheiro pedido pela issue ou utilizado pelas edições recentes aceites.
- Mantenha a mesma ordem de secções do modelo, exceto se a tarefa pedir um formato diferente.
- Adicione ligações apenas da semana relevante.
- Escreva uma descrição breve e clara para cada ligação, para que os leitores compreendam a sua importância.
- Traduza ou resuma fontes que não estejam em inglês para inglês, quando necessário.
- Verifique todas as ligações antes de abrir o pull request.

### 4. Recolher ligações no momento certo

ZecWeekly normalmente cobre a atividade do ecossistema Zcash da semana atual e é publicado perto do fim da semana. O momento mais seguro é:

- Começar a recolher ligações depois de a issue ou tarefa do boletim informativo atual ser publicada.
- Manter um rascunho enquanto a semana ainda estiver ativa.
- Submeter o pull request perto da data de submissão pedida, depois de verificar se existem atualizações do final da semana.
- Não submeter o boletim informativo de uma semana futura antes de a tarefa para essa data existir ou antes de o ZecHub confirmar que deve prepará-lo.

Se uma issue indicar que deve submeter até uma data específica, siga essa data. Se existir um conflito entre esta página e uma issue atual, siga a issue atual.

### 5. Abrir o pull request

Quando o ficheiro do seu boletim informativo estiver pronto:

1. Faça commit das suas alterações no seu fork.
2. Abra um pull request para `ZecHub/zechub` na branch `main`.
3. Utilize um título que corresponda à edição, como `Zcash Ecosystem Digest | May 30th`.
4. Associe a issue no corpo do pull request para que os revisores possam relacionar o trabalho com a tarefa.

Exemplo de corpo de pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois de o pull request estar aberto, acompanhe os comentários de revisão. Se o ZecHub pedir edições, atualize a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Utilize estes pull requests de boletins informativos integrados como exemplos de submissões aceites:

- [Zcash Ecosystem Digest | 11 de abril](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 de março](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 de fevereiro](https://github.com/ZecHub/zechub/pull/1474)


![Exemplo de pull request integrado do boletim informativo ZecWeekly](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Ao comparar o seu trabalho com um exemplo, foque-se na localização do ficheiro, no formato do título, na ordem das secções, nas descrições das ligações e em verificar se o pull request remete para a tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou da tarefa estar confirmada.
- Trabalhar numa issue que já tem um pull request associado.
- Submeter o pull request para o seu próprio fork em vez de `ZecHub/zechub`.
- Utilizar o nome de ficheiro errado ou colocar o ficheiro fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, ligações e descrições.
- Adicionar ligações da semana errada.
- Deixar ligações quebradas, ligações duplicadas ou texto de marcador de posição do modelo.
- Abrir um novo pull request após comentários de revisão em vez de atualizar a branch original.

### Lista de verificação final

Antes de pedir revisão, confirme que:

- A data da issue ou tarefa corresponde ao ficheiro do seu boletim informativo.
- Nenhum outro pull request aberto já abrange a mesma issue ou edição.
- O ficheiro está na pasta `newsletter`.
- As secções do modelo estão completas.
- Todas as ligações funcionam e têm uma descrição útil.
- O corpo do pull request associa a issue correta.
- Está disponível para fazer edições se os revisores pedirem alterações.

## Edições anteriores

[Arquivo ZecWeekly](https://zechub.substack.com/p/archive)
