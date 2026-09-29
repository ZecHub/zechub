<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Boletim ZecWeekly

ZecWeekly é um boletim enviado todos os domingos de manhã. Inclui todas as notícias que aconteceram durante a semana no ecossistema Zcash. As notícias são selecionadas semanalmente por membros da comunidade e todos os links relevantes são adicionados ao boletim. Subscreva o boletim [aqui](https://zechub.substack.com/).

## Contribuir

As contribuições para o boletim funcionam melhor quando um colaborador prepara a edição para a semana correta, acompanha a discussão atual sobre a recompensa ou coordenação e submete o pull request depois de os links semanais estarem prontos. Não submeta uma edição futura antes de ZecHub ter publicado ou confirmado a data dessa edição. Pull requests antecipados frequentemente não incluem atualizações do final da semana, entram em conflito com um curador atribuído ou usam o prazo errado.

### 1. Confirmar a edição atual

Antes de começar a escrever:

- Consulte [ZEC Bounties ](https://bounties.zechub.wiki/) para ver a tarefa atual do boletim.
- Aguarde que lhe seja atribuída a tarefa

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fazer fork do repositório

Se é novo no GitHub, utilize este fluxo de trabalho:

1. Abra o [repositório ZecHub](https://github.com/ZecHub/zechub).
2. Clique em **Fork** e crie um fork na sua conta GitHub.
3. No seu fork, crie uma nova branch para a edição. Um nome de branch claro é útil, como `digest-may-30-2026`.
4. Certifique-se de que o seu pull request terá `ZecHub/zechub` como repositório base e `main` como branch base.

Se utilizar a linha de comandos, o mesmo fluxo de trabalho é assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Substitua `YOUR-USERNAME` pelo seu próprio nome de utilizador do GitHub. O URL acima é um marcador de posição e não será resolvido tal como está escrito.

### 3. Criar o ficheiro do boletim

Utilize o [modelo de boletim](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições do boletim pertencem à pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o ficheiro:

- Siga o formato de nome de ficheiro solicitado pela issue ou utilizado por edições recentes aceites.
- Mantenha a mesma ordem de secções do modelo, salvo se a tarefa pedir um formato diferente.
- Adicione apenas links da semana relevante.
- Escreva uma descrição curta e clara para cada link, para que os leitores compreendam a sua relevância.
- Traduza ou resuma em inglês as fontes que não estejam em inglês, quando necessário.
- Verifique todos os links antes de abrir o pull request.

### 4. Recolher links no momento certo

ZecWeekly normalmente cobre a atividade do ecossistema Zcash da semana atual e é publicado perto do fim da semana. O momento mais seguro é:

- Começar a recolher links depois de a issue ou tarefa atual do boletim ser publicada.
- Manter um rascunho enquanto a semana ainda estiver a decorrer.
- Submeter o pull request perto da data de submissão solicitada, depois de verificar atualizações do final da semana.
- Não submeter o boletim de uma semana futura antes de existir a tarefa para essa data ou antes de ZecHub confirmar que o deve preparar.

Se uma issue indicar que deve submeter até uma data específica, siga essa data. Se houver um conflito entre esta página e uma issue atual, siga a issue atual.

### 5. Abrir o pull request

Quando o ficheiro do boletim estiver pronto:

1. Faça commit das suas alterações no seu fork.
2. Abra um pull request para `ZecHub/zechub` na branch `main`.
3. Utilize um título que corresponda à edição, como `Zcash Ecosystem Digest | May 30th`.
4. Inclua o link para a issue no corpo do pull request, para que os revisores possam associar o trabalho à tarefa.

Exemplo de corpo de pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois de o pull request estar aberto, acompanhe os comentários da revisão. Se ZecHub pedir alterações, atualize a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Utilize estes pull requests de boletins já integrados como exemplos de submissões aceites:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Exemplo de pull request de boletim ZecWeekly integrado](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Ao comparar o seu trabalho com um exemplo, concentre-se na localização do ficheiro, no formato do título, na ordem das secções, nas descrições dos links e em verificar se o pull request remete para a tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou da tarefa estar confirmada.
- Trabalhar numa issue que já tenha um pull request associado.
- Submeter o pull request para o seu próprio fork em vez de `ZecHub/zechub`.
- Utilizar o nome de ficheiro errado ou colocar o ficheiro fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, links e descrições.
- Adicionar links da semana errada.
- Deixar links quebrados, links duplicados ou texto de marcador de posição do modelo.
- Abrir um novo pull request após comentários da revisão, em vez de atualizar a branch original.

### Lista de verificação final

Antes de pedir revisão, confirme que:

- A data da issue ou tarefa corresponde ao seu ficheiro de boletim.
- Não existe já outro pull request aberto que cubra a mesma issue ou edição.
- O ficheiro está na pasta `newsletter`.
- As secções do modelo estão completas.
- Todos os links funcionam e têm uma descrição útil.
- O corpo do pull request inclui o link para a issue correta.
- Está disponível para fazer alterações se os revisores as solicitarem.

## Edições anteriores

[Arquivo ZecWeekly](https://zechub.substack.com/p/archive)
