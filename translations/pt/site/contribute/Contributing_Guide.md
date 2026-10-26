<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Contribuir para ZecHub

ZecHub ajuda as pessoas a aprender sobre Zcash. Se está a ler esta página, estamos muito entusiasmados por estar a considerar contribuir! Qualquer contribuição que fizer será refletida em [zechub.wiki](https://www.zechub.wiki/) e noutras redes sociais de ZecHub.

### Novos contribuidores

Para obter uma visão geral de ZecHub, leia o [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Começar

ZecHub utiliza GitHub para gerir a contribuição da comunidade. Se é novo em GitHub, não se preocupe! Vamos explicar como pode envolver-se como contribuidor da comunidade para ZecHub. Pagamos gratificações em ZEC blindado por contribuições aceites. Os valores das recompensas não são fixos em ZEC — consulte [Como são definidas as recompensas](#how-rewards-are-set). Neste guia, terá uma visão geral do fluxo de trabalho de contribuição, desde abrir uma issue, criar um pull request (PR), rever e integrar o PR.


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


### Junte-se à conversa

Primeiro, junte-se à conversa nas nossas [ligações da comunidade](https://zechub.wiki/zcash-community/community-links).

### Guias de estilo

Qualquer contribuição para ZecHub deve seguir o guia de estilo de [ZecHub](https://zechub.wiki/contribute/style-guide). Isto inclui wikis, documentação e conteúdos de redes sociais.

### Formas de contribuir

ZecHub é um projeto orientado pela comunidade que procura fornecer apoio e recursos aos utilizadores e programadores de Zcash. Existem muitas formas de se envolver com ZecHub, incluindo escrever para a nossa newsletter semanal, contribuir para a nossa base de conhecimento ou ajudar em projetos de desenvolvimento.

Estes são os tipos de contribuição que ZecHub aceita atualmente:

### Como são definidas as recompensas

As gratificações são pagas em ZEC blindado. Os números de ZEC que costumavam constar nos títulos abaixo eram referências históricas a uma taxa ZEC/USD anterior. Não os considere taxas atuais.

Como é escolhido um valor:

1. Faça corresponder o trabalho a um intervalo em USD na [política de valores de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Escolha um objetivo dentro desse intervalo — não automaticamente o mais elevado.
3. Converta à cotação pública à vista de ZEC/USD e introduza ZEC na recompensa:

```
zec_to_enter = usd_target / zec_usd_spot
```

Arredonde para 4 casas decimais. O ficheiro de política é a única fonte de verdade. Se esta página e esse ficheiro divergirem, a política prevalece.

O trabalho pago está listado em [ZEC Bounties](https://bounties.zechub.wiki/).

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

1. **Integrado** — o PR é aceite no repositório.
2. **Recompensa aprovada** — um patrocinador ou a DAO concorda que é devida uma recompensa e qual o seu valor.
3. **Pago** — ZEC chega ao seu Unified Address blindado.

Uma contribuição integrada não aprova, por si só, uma recompensa. Uma recompensa aprovada não é um pagamento concluído.

#### Trabalho de desenvolvimento

Qualquer trabalho de desenvolvimento aprovado que ajude a construir o ecossistema de Zcash. Isto pode incluir a nossa wiki, novas wallets ou qualquer aplicação que consiga imaginar.

#### Tutoriais de Zcash (vídeo)

Segue-se um tutorial de exemplo:


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

Crie e partilhe tutoriais sobre aplicações de Zcash e seja recompensado. Envie um PR para zechub/tutorials ou envie o vídeo para o canal #video-content em Discord. Se o vídeo cumprir os nossos critérios, iremos publicá-lo e dar-lhe uma gratificação.

#### Wiki de ZecHub - nova página wiki publicada

O nosso site wiki fornece materiais educativos sobre Zcash num formato simples e fácil de assimilar. Zcash é uma tecnologia muito avançada, com uma comunidade vibrante, pelo que ainda há mais documentação que precisamos de criar. O nosso objetivo é criar documentação sobre:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Estas são áreas bastante amplas, por isso há muito por onde trabalhar. Se quiser inspiração, consulte o nosso atual [site wiki-docs](https://zechub.wiki/) e veja o que falta. Depois de determinar sobre o que quer escrever, comece a fazer as suas alterações e aprenda como submeter um PR para o repositório de ZecHub. Toda a nossa documentação é criada e mantida neste repositório. Siga o guia de estilo de [ZecHub](https://zechub.wiki/contribute/style-guide) ao escrever uma página wiki e use uma página existente na mesma secção como referência estrutural. Depois de submeter um PR, envie uma mensagem a @dismad, @squirrel ou @vito na secção #zechub do discord, e eles irão rever o seu PR e integrá-lo se estiver pronto para ser adicionado ao site. Se for integrado, adicionarão o documento ao website de ZecHub. Se o documento não estiver pronto, sugerirão edições no PR.

#### Wiki de ZecHub - página wiki traduzida

O objetivo de ZecHub é fornecer um centro educativo open-source para o qual qualquer pessoa da comunidade de Zcash possa contribuir. Um dos maiores sucessos do centro é ver membros da comunidade traduzirem materiais de ZecHub para o seu idioma local.

Nota: o limite global de tradução de páginas de ZecHub é de 10 páginas por semana.

As páginas de idiomas selecionadas em `translations/<locale>/site/` são acompanhadas em relação à sua fonte em inglês através de um manifesto de hash da fonte. Consulte [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) para deteção de desatualização, o fluxo de sincronização e a validação de termos protegidos.

#### Wiki de ZecHub - edição de um documento existente

Por vezes, as informações na nossa documentação não estão totalmente corretas. Não há problema. É por isso que as disponibilizamos como open source! Se encontrar algo que precise de ser alterado num wiki-doc, vá ao rodapé do documento (que liga à respetiva página GitHub) e sugira uma alteração através de um PR.

#### Wiki de ZecHub - ligação quebrada corrigida

Se encontrar uma ligação quebrada ou algo importante escrito incorretamente, vá ao rodapé do documento (que liga à respetiva página GitHub) e sugira a alteração através de um PR.

#### Newsletter - nova edição

Produzimos a newsletter semanal do ecossistema. Esta é uma forma muito simples e fácil de se envolver! A newsletter é publicada todas as sextas-feiras ou sábados. Se quiser escrever uma newsletter, envie uma mensagem a @squirrel na secção #zecweekly de Discord para avisar.

Depois disso, pode ir à [secção da newsletter deste repositório](/newsletter/newsletterbasics.md) e submeter um pull request para criar uma nova edição da newsletter. Siga o formato utilizado neste [modelo](/newsletter/newslettertemplate.md).

Depois de fazer isto, @squirrel ou (em Discord) verá que a sua nova edição da newsletter está disponível, irá revê-la e depois integrá-la no repositório. Depois de ser integrada, irá usar o conteúdo e publicá-lo através do Substack.

#### Newsletter - tradução

Atualmente, temos edições em espanhol, português e russo. As versões traduzidas são publicadas nas respetivas redes sociais, e fazemos o nosso melhor para as amplificar através das redes sociais de ZecHub.

Se quiser traduzir a newsletter para o seu idioma local, diga-nos em que canal a partilharia e em que idioma publicaria a newsletter, para podermos coordenar o seu lançamento.

#### Podcast - episódio publicado nas redes sociais de ZecHub

Tem uma ideia para um programa de notícias, podcast, conversa sobre Twitter ou outro conteúdo de vídeo/áudio? Diga-nos em #video-content de Discord e conversaremos.

As recompensas para este tipo de conteúdo são um pouco maiores, pelo que uma proposta teria de ser submetida à DAO de ZecHub antes de aprovar a despesa.

#### Publicações criativas nas redes sociais

Queremos novo conteúdo envolvente para as nossas redes sociais. Vídeos curtos, GIFs, memes e outras publicações criativas são aceites quando correspondem ao guia de estilo de [ZecHub](https://zechub.wiki/contribute/style-guide). O valor da recompensa segue a [política de valores de recompensas](https://bounties.zechub.wiki/docs/bounty-amounts).

Também pode criar miniaturas para a nossa newsletter e podcast. Se tiver talento para design, envie-nos uma mensagem em #design no Discord.

#### Outras ideias? Diga-nos!

Tem outra sugestão? Diga-nos em #general no Discord. Podemos discuti-la e ver se a DAO de ZecHub a apoiará.

### Para terminar

Não hesite em começar a contribuir para um dos protocolos mais respeitados do setor. Esta é uma excelente forma de se envolver com Zcash. Se tiver alguma dúvida sobre como contribuir, informe-nos em [Discord](#join-the-conversation).

Obrigado!
