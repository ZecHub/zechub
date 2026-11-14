<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly é uma newsletter enviada todo domingo de manhã. Ela reúne todas as notícias da semana no ecossistema Zcash. As notícias são selecionadas semanalmente por membros da comunidade, e todos os links relevantes são adicionados à newsletter. Assine a newsletter [aqui](https://zechub.substack.com/).

## Contribua

As contribuições para a newsletter funcionam melhor quando um único colaborador prepara a edição da semana correta, acompanha a bounty ou o tópico de coordenação atual e envia o pull request depois que os links da semana estão prontos. Não envie uma edição futura antes que ZecHub tenha publicado ou confirmado a data dessa edição. Pull requests enviados cedo demais costumam deixar de fora as atualizações do fim da semana, entrar em conflito com um curador designado ou usar o prazo errado.

### 1. Confirme a edição atual

Antes de começar a escrever:

- Verifique [ZEC Bounties](https://bounties.zechub.wiki/) para encontrar a tarefa atual da newsletter.
- Aguarde até ser designado.
- As edições da newsletter ficam na faixa XS da [política de valores de bounties](https://bounties.zechub.wiki/docs/bounty-amounts). O valor é o número ZEC que aparece na bounty ativa, e não qualquer título antigo nos guias de contribuição.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Faça um fork do repositório

Se você é novo no GitHub, siga este fluxo de trabalho:

1. Abra o [repositório ZecHub](https://github.com/ZecHub/zechub).
2. Clique em **Fork** e crie um fork na sua conta do GitHub.
3. No seu fork, crie uma nova branch para a edição. Um nome de branch claro ajuda, por exemplo `digest-may-30-2026`.
4. Confirme que o seu pull request terá `ZecHub/zechub` como repositório base e `main` como branch base.

Se você usa a linha de comando, o mesmo fluxo de trabalho fica assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Substitua `YOUR-USERNAME` pelo seu nome de usuário do GitHub. A URL acima é apenas um exemplo e não funciona do jeito que está escrita.

### 3. Crie o arquivo da newsletter

Use o [modelo da newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições da newsletter ficam na pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o arquivo:

- Siga o formato de nome de arquivo pedido na issue ou usado nas edições aceitas recentemente.
- Mantenha a mesma ordem de seções do modelo, a menos que a tarefa peça um formato diferente.
- Adicione apenas links da semana em questão.
- Escreva uma descrição curta e clara para cada link, para que os leitores entendam por que ele é importante.
- Traduza ou resuma em inglês as fontes que não estão em inglês, quando necessário.
- Verifique todos os links antes de abrir o pull request.

### 4. Reúna os links no momento certo

ZecWeekly normalmente cobre a atividade do ecossistema Zcash na semana atual e é publicada perto do fim da semana. O momento mais seguro é este:

- Comece a reunir links depois que a issue ou tarefa da newsletter atual for publicada.
- Mantenha um rascunho enquanto a semana ainda está em andamento.
- Envie o pull request perto da data de envio pedida, depois de verificar as atualizações do fim da semana.
- Não envie a newsletter de uma semana futura antes que exista a tarefa para essa data ou antes que ZecHub confirme que você deve prepará-la.

Se uma issue pedir o envio até uma data específica, siga essa data. Se houver conflito entre esta página e uma issue atual, siga a issue atual.

### 5. Abra o pull request

Quando o arquivo da newsletter estiver pronto:

1. Faça o commit das suas alterações no seu fork.
2. Abra um pull request para `ZecHub/zechub` na branch `main`.
3. Use um título que corresponda à edição, por exemplo `Zcash Ecosystem Digest | May 30th`.
4. Inclua o link da issue no corpo do pull request, para que os revisores possam relacionar o trabalho à tarefa.

Exemplo de corpo do pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois de abrir o pull request, fique atento aos comentários da revisão. Se ZecHub pedir alterações, atualize a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Use estes pull requests de newsletter já mesclados como exemplos de envios aceitos:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Exemplo de pull request mesclado da newsletter ZecWeekly](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Ao comparar o seu trabalho com um exemplo, preste atenção à localização do arquivo, ao formato do título, à ordem das seções, às descrições dos links e se o pull request está ligado à tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou a tarefa estar confirmada.
- Trabalhar em uma issue que já tem um pull request vinculado.
- Enviar o pull request para o seu próprio fork em vez de `ZecHub/zechub`.
- Usar o nome de arquivo errado ou colocar o arquivo fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, links e descrições.
- Adicionar links da semana errada.
- Deixar links quebrados, links duplicados ou texto de exemplo do modelo.
- Abrir um novo pull request depois dos comentários da revisão em vez de atualizar a branch original.

### Checklist final

Antes de pedir a revisão, confirme que:

- A data da issue ou da tarefa corresponde ao seu arquivo da newsletter.
- Nenhum outro pull request aberto já cobre a mesma issue ou edição.
- O arquivo está na pasta `newsletter`.
- As seções do modelo estão completas.
- Todos os links funcionam e têm uma descrição útil.
- O corpo do pull request tem o link da issue correta.
- Você está disponível para fazer alterações se os revisores pedirem.

## Edições anteriores

[Arquivo do ZecWeekly](https://zechub.substack.com/p/archive)
