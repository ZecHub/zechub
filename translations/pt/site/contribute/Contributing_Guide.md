<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Como contribuir com o ZecHub

O ZecHub ajuda as pessoas a aprender sobre o Zcash. Se você está lendo esta página, ficamos muito animados por você considerar contribuir! Qualquer contribuição que você fizer será refletida em [zechub.wiki](https://www.zechub.wiki/) e em outras redes sociais do ZecHub.

### Novos colaboradores

Para ter uma visão geral do ZecHub, leia o [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Primeiros passos

O ZecHub usa o GitHub para gerenciar contribuições da comunidade. Se você é novo no GitHub, não se preocupe! Vamos explicar como você pode se envolver como colaborador da comunidade do ZecHub. Pagamos gratificações em ZEC blindado por contribuições aceitas. Os valores das recompensas não são fixos em ZEC — consulte [Como são definidas as recompensas](#how-rewards-are-set). Neste guia, você terá uma visão geral do fluxo de trabalho de contribuição, desde abrir uma issue, criar um pull request (PR), revisar e integrar o PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="Como contribuir para ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Participe da conversa

Primeiro, participe da conversa nos nossos [links da comunidade](https://zechub.wiki/zcash-community/community-links).

### Guias de estilo

Qualquer contribuição para o ZecHub deve seguir o guia de estilo do [ZecHub](https://zechub.wiki/contribute/style-guide). Isso inclui wikis, documentação e conteúdo para redes sociais.

### Formas de contribuir

O ZecHub é um projeto orientado pela comunidade que busca fornecer apoio e recursos para usuários e desenvolvedores do Zcash. Há muitas formas de se envolver com o ZecHub, incluindo escrever para a nossa newsletter semanal, contribuir para a nossa base de conhecimento ou ajudar em projetos de desenvolvimento.

Estes são os tipos de contribuição que o ZecHub aceita atualmente:

### Como são definidas as recompensas

As gratificações são pagas em ZEC blindado. Os valores em ZEC que costumavam estar nos títulos abaixo eram referências históricas a uma cotação ZEC/USD anterior. Não os considere taxas atuais.

Como um valor é escolhido:

1. Faça corresponder o trabalho a um intervalo em USD na [política de valores de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Escolha um valor dentro desse intervalo — não automaticamente o mais alto.
3. Converta pela cotação pública à vista de ZEC/USD e informe o valor em ZEC na recompensa:

```
zec_to_enter = usd_target / zec_usd_spot
```

Arredonde para 4 casas decimais. O arquivo da política é a única fonte de verdade. Se esta página e esse arquivo divergirem, a política prevalece.

O trabalho remunerado está listado em [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explicado | Ganhe ZEC ao contribuir"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Três estados que não são iguais:

1. **Integrado** — o PR é aceito no repositório.
2. **Recompensa aprovada** — um patrocinador ou a DAO concorda que uma recompensa é devida e define seu valor.
3. **Pago** — o ZEC chega ao seu Unified Address blindado.

Uma contribuição integrada não aprova, por si só, uma recompensa. Uma recompensa aprovada não é um pagamento concluído.

#### Trabalho de desenvolvimento

Qualquer trabalho de desenvolvimento aprovado que ajude a construir o ecossistema do Zcash. Isso pode incluir nossa wiki, novas carteiras ou qualquer aplicativo que você imaginar.

#### Tutoriais do Zcash (vídeo)

Veja abaixo um tutorial de exemplo:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="Tutorial de instalação WSL + compilação/transação zcashd"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Crie e compartilhe tutoriais sobre aplicativos do Zcash e receba recompensas. Envie um PR para zechub/tutorials ou envie o vídeo para o canal #video-content no Discord. Se o vídeo atender aos nossos critérios, vamos publicá-lo e dar uma gratificação a você.

#### Wiki do ZecHub - nova página wiki publicada

O nosso site wiki fornece materiais educacionais sobre o Zcash em um formato simples e fácil de entender. O Zcash é uma tecnologia muito avançada, com uma comunidade vibrante, por isso ainda há mais documentação que precisamos criar. Nosso objetivo é criar documentação sobre:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Estas são áreas bastante amplas, então há muito com que trabalhar. Se quiser inspiração, consulte nosso atual [site de documentos da wiki](https://zechub.wiki/) e veja o que está faltando. Depois de decidir sobre o que quer escrever, comece a fazer suas alterações e aprenda como enviar um PR para o repositório do ZecHub. Toda a nossa documentação é criada e mantida neste repositório. Siga o guia de estilo do [ZecHub](https://zechub.wiki/contribute/style-guide) ao escrever uma página wiki e use uma página existente na mesma seção como referência estrutural. Depois de enviar um PR, envie uma mensagem para @dismad, @squirrel ou @vito na seção #zechub do Discord, e eles revisarão seu PR e o integrarão se ele estiver pronto para ser adicionado ao site. Se for integrado, eles adicionarão o documento ao site do ZecHub. Se o documento não estiver pronto, eles sugerirão edições para você no PR.

#### Wiki do ZecHub - página wiki traduzida

O objetivo do ZecHub é fornecer um centro educacional open-source para o qual qualquer pessoa da comunidade do Zcash possa contribuir. Um dos maiores sucessos do centro é ver membros da comunidade traduzirem materiais do ZecHub para seu idioma local.

Nota: o limite global de tradução de páginas do ZecHub é de 10 páginas por semana.

As páginas de locais selecionados em `translations/<locale>/site/` são acompanhadas em relação à fonte em inglês por meio de um manifesto de hash da fonte. Consulte [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) para detecção de desatualização, o fluxo de trabalho de sincronização e a validação de termos protegidos.

#### Wiki do ZecHub - edição de um documento existente

Às vezes, as informações em nossa documentação não estão totalmente corretas. Tudo bem. É por isso que as disponibilizamos como open source! Se você encontrar algo que precisa ser alterado em um documento da wiki, vá até o rodapé do documento (que aponta para a página dele no GitHub) e sugira uma alteração por meio de um PR.

#### Wiki do ZecHub - link quebrado corrigido

Se você encontrar um link quebrado ou algo importante escrito incorretamente, vá até o rodapé do documento (que aponta para a página dele no GitHub) e sugira a alteração por meio de um PR.

#### Newsletter - nova edição

Produzimos a newsletter semanal do ecossistema. Esta é uma forma muito simples e fácil de se envolver! A newsletter é publicada toda sexta-feira ou sábado. Se quiser escrever uma newsletter, envie uma mensagem para @squirrel na seção #zecweekly do Discord para avisar.

Depois disso, você pode ir à [seção da newsletter deste repositório](/newsletter/newsletterbasics.md) e enviar um pull request para criar uma nova edição da newsletter. Siga o formato usado neste [modelo](/newsletter/newslettertemplate.md).

Depois de fazer isso, @squirrel ou (no Discord) verá que sua nova edição da newsletter está disponível, fará a revisão e depois a integrará ao repositório. Depois que ela for integrada, usará o conteúdo e o publicará pelo Substack.

#### Newsletter - tradução

Atualmente, temos edições em espanhol, português e russo. As versões traduzidas são publicadas nas respectivas redes sociais, e fazemos o possível para amplificá-las pelas redes sociais do ZecHub.

Se quiser traduzir a newsletter para seu idioma local, informe-nos em qual canal você a compartilharia e em qual idioma publicaria a newsletter, para que possamos coordenar seu lançamento.

#### Podcast - episódio publicado nas redes sociais do ZecHub

Você tem uma ideia para um programa de notícias, podcast, conversa no Twitter ou outro conteúdo de vídeo/áudio? Conte para nós no #video-content do Discord e conversaremos.

As recompensas para este tipo de conteúdo são um pouco maiores, então uma proposta precisaria ser enviada à DAO do ZecHub antes de aprovar o gasto.

#### Publicações criativas nas redes sociais

Queremos conteúdo novo e envolvente para nossas redes sociais. Vídeos curtos, GIFs, memes e outras publicações criativas são aceitos quando seguem o guia de estilo do [ZecHub](https://zechub.wiki/contribute/style-guide). O valor da recompensa segue a [política de valores de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).

Você também pode criar miniaturas para nossa newsletter e podcast. Se tiver talento para design, envie uma mensagem para nós em #design no Discord.

#### Outras ideias? Conte para nós!

Tem outra sugestão? Conte para nós em #general no Discord. Podemos discuti-la e ver se a DAO do ZecHub vai apoiá-la.

### Para terminar

Não hesite em começar a contribuir para um dos protocolos mais respeitados do setor. Esta é uma ótima forma de se envolver com o Zcash. Se tiver alguma dúvida sobre como contribuir, informe-nos no [Discord](#join-the-conversation).

Obrigado!
