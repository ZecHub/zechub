<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Newsletter ZecWeekly

ZecWeekly é uma newsletter enviada todos os domingos de manhã. Inclui todas as notícias que aconteceram durante a semana no ecossistema do Zcash. As notícias são selecionadas semanalmente por membros da comunidade e todos os links relevantes são adicionados à newsletter. Assine a newsletter [aqui](https://zechub.substack.com/).

## Contribuir

As contribuições para a newsletter funcionam melhor quando um colaborador prepara a edição para a semana correta, acompanha a discussão atual sobre a recompensa ou coordenação e envia o pull request depois que os links semanais estiverem prontos. Não envie uma edição futura antes de o ZecHub publicar ou confirmar a data dessa edição. Pull requests antecipados frequentemente não incluem atualizações do final da semana, entram em conflito com um curador designado ou usam o prazo errado.

### 1. Confirmar a edição atual

Antes de começar a escrever:

- Consulte [ZEC Bounties](https://bounties.zechub.wiki/) para ver a tarefa atual da newsletter.
- Aguarde receber uma atribuição.
- As edições da newsletter ficam na faixa XS da [política de valores das recompensas](https://bounties.zechub.wiki/docs/bounty-amounts). O valor em ZEC na recompensa ativa é o valor, não qualquer título mais antigo nos guias de contribuição.

![ss](/content-images/149a802c-b64f-4969-ad89-e83ffecf568e-d5d8387145.webp)



### 2. Fazer fork do repositório

Se você é novo no GitHub, use este fluxo de trabalho:

1. Abra o [repositório ZecHub](https://github.com/ZecHub/zechub).
2. Clique em **Fork** e crie um fork na sua conta do GitHub.
3. No seu fork, crie uma nova branch para a edição. Um nome de branch claro é útil, como `digest-may-30-2026`.
4. Certifique-se de que o seu pull request terá `ZecHub/zechub` como repositório base e `main` como branch base.

Se você usar a linha de comando, o mesmo fluxo de trabalho será assim:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

Substitua `YOUR-USERNAME` pelo seu próprio nome de usuário do GitHub. O URL acima é um marcador de posição e não será resolvido como está escrito.

### 3. Criar o arquivo da newsletter

Use o [modelo de newsletter](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) como ponto de partida. As edições da newsletter pertencem à pasta [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter).

Ao criar o arquivo:

- Siga o formato de nome de arquivo solicitado pela issue ou usado por edições recentes aceitas.
- Mantenha a mesma ordem de seções do modelo, a menos que a tarefa peça um formato diferente.
- Adicione apenas links da semana relevante.
- Escreva uma descrição curta e clara para cada link, para que os leitores entendam por que ele é importante.
- Traduza ou resuma em inglês as fontes que não estiverem em inglês, quando necessário.
- Verifique todos os links antes de abrir o pull request.

### 4. Coletar links no momento certo

A ZecWeekly normalmente cobre a atividade do ecossistema do Zcash na semana atual e é publicada perto do fim da semana. O momento mais seguro é:

- Comece a coletar links depois que a issue ou tarefa atual da newsletter for publicada.
- Mantenha um rascunho enquanto a semana ainda estiver em andamento.
- Envie o pull request perto da data de envio solicitada, depois de verificar atualizações do final da semana.
- Não envie a newsletter de uma semana futura antes de a tarefa para essa data existir ou antes de o ZecHub confirmar que você deve prepará-la.

Se uma issue indicar que você deve enviar até uma data específica, siga essa data. Se houver um conflito entre esta página e uma issue atual, siga a issue atual.

### 5. Abrir o pull request

Quando o arquivo da newsletter estiver pronto:

1. Faça commit das suas alterações no seu fork.
2. Abra um pull request para `ZecHub/zechub` na branch `main`.
3. Use um título que corresponda à edição, como `Zcash Ecosystem Digest | May 30th`.
4. Inclua o link para a issue no corpo do pull request, para que os revisores possam associar o trabalho à tarefa.

Exemplo de corpo do pull request:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Depois que o pull request estiver aberto, acompanhe os comentários da revisão. Se o ZecHub pedir alterações, atualize a mesma branch em vez de abrir um segundo pull request para a mesma edição.

### Exemplos reais

Use estes pull requests de newsletters já integrados como exemplos de envios aceitos:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)


![Exemplo de pull request de newsletter ZecWeekly integrado](/content-images/9230d68d-6406-4c8a-992c-df84e0d318d8-8893d2de55.webp)

Ao comparar o seu trabalho com um exemplo, concentre-se na localização do arquivo, no formato do título, na ordem das seções, nas descrições dos links e em verificar se o pull request remete à tarefa correta.

### Erros comuns a evitar

- Abrir um pull request antes de a data da edição ou da tarefa estar confirmada.
- Trabalhar em uma issue que já tenha um pull request associado.
- Enviar o pull request para o seu próprio fork em vez de `ZecHub/zechub`.
- Usar o nome de arquivo errado ou colocar o arquivo fora da pasta `newsletter`.
- Copiar uma edição antiga sem atualizar todas as datas, links e descrições.
- Adicionar links da semana errada.
- Deixar links quebrados, links duplicados ou texto de marcador de posição do modelo.
- Abrir um novo pull request após comentários da revisão, em vez de atualizar a branch original.

### Lista de verificação final

Antes de solicitar revisão, confirme que:

- A data da issue ou tarefa corresponde ao seu arquivo da newsletter.
- Ainda não há outro pull request aberto cobrindo a mesma issue ou edição.
- O arquivo está na pasta `newsletter`.
- As seções do modelo estão completas.
- Todos os links funcionam e têm uma descrição útil.
- O corpo do pull request inclui o link para a issue correta.
- Você está disponível para fazer alterações se os revisores solicitarem mudanças.

## Edições anteriores

[Arquivo da ZecWeekly](https://zechub.substack.com/p/archive)
