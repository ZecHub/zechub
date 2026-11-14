<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Como contribuir com o ZecHub

O ZecHub ajuda as pessoas a aprender sobre o Zcash. Se você está lendo esta página, ficamos muito felizes por você estar pensando em contribuir! Qualquer contribuição que você fizer será refletida no [zechub.wiki](https://www.zechub.wiki/) e em outras redes sociais do ZecHub.

### Novos colaboradores

Para ter uma visão geral do ZecHub, leia o [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Primeiros passos

O ZecHub usa o GitHub para gerenciar as contribuições da comunidade. Se você é novo no GitHub, não se preocupe! Vamos explicar como você pode participar como colaborador da comunidade do ZecHub. Pagamos gorjetas em ZEC blindado pelas contribuições aceitas. Os valores das recompensas não são fixos em ZEC. Veja [Como as recompensas são definidas](#how-rewards-are-set). Neste guia, você terá uma visão geral do fluxo de contribuição: abrir uma issue, criar um pull request (PR), revisar e fazer o merge do PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Participe da conversa

Primeiro, participe da conversa nos nossos [links da comunidade](https://zechub.wiki/zcash-community/community-links).

### Guias de estilo

Qualquer contribuição para o ZecHub deve seguir o [guia de estilo do ZecHub](https://zechub.wiki/contribute/style-guide). Isso inclui wikis, documentação e conteúdo para redes sociais.

### Formas de contribuir

O ZecHub é um projeto guiado pela comunidade que tem como objetivo oferecer suporte e recursos para usuários e desenvolvedores do Zcash. Há muitas formas de participar do ZecHub, incluindo escrever para a nossa newsletter semanal, contribuir com a nossa base de conhecimento ou ajudar em projetos de desenvolvimento.

Estes são os tipos de contribuição que o ZecHub aceita atualmente:

### Como as recompensas são definidas

As gorjetas são pagas em ZEC blindado. Os valores em ZEC que antes apareciam nos títulos abaixo eram registros históricos de uma cotação ZEC/USD antiga. Não os trate como valores atuais.

Como um valor é escolhido:

1. Associe o trabalho a uma faixa em USD na [política de valores de bounty](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Escolha um valor-alvo dentro dessa faixa, não automaticamente o máximo.
3. Converta usando uma cotação spot pública ZEC/USD e insira ZEC no bounty:

```
zec_to_enter = usd_target / zec_usd_spot
```

Arredonde para 4 casas decimais. O arquivo da política é a única fonte oficial. Se esta página e esse arquivo divergirem, vale a política.

Os trabalhos pagos estão listados em [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Três estados que não são a mesma coisa:

1. **Merge feito**: o PR é aceito no repositório.
2. **Recompensa aprovada**: um patrocinador ou a DAO concorda que uma recompensa é devida, e de qual valor.
3. **Pago**: o ZEC chega ao seu Unified Address blindado.

Uma contribuição com merge feito não aprova uma recompensa por si só. Uma recompensa aprovada não é um pagamento concluído.

#### Trabalho de desenvolvimento

Qualquer trabalho de desenvolvimento aprovado que ajude a construir o ecossistema do Zcash. Isso pode incluir a nossa wiki, novas carteiras ou qualquer aplicativo que você imaginar.

#### Tutoriais do Zcash (vídeo)

Aqui está um exemplo de tutorial:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Crie e compartilhe tutoriais sobre aplicativos do Zcash e seja recompensado. Envie um PR para zechub/tutorials ou envie o vídeo para o canal #video-content no Discord. Se o vídeo atender aos nossos critérios, vamos publicá-lo e dar uma gorjeta a você.

#### Wiki do ZecHub: nova página da wiki publicada

O nosso site da wiki oferece materiais educativos sobre o Zcash em um formato fácil e acessível. O Zcash é uma tecnologia muito avançada com uma comunidade vibrante, então ainda há muita documentação a ser criada. O nosso objetivo é criar documentação sobre:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Essas são áreas bem amplas, então há muito material para trabalhar. Se você quiser inspiração, confira o nosso [site de documentação da wiki](https://zechub.wiki/) e veja o que está faltando. Depois de decidir sobre o que quer escrever, comece a fazer as suas alterações e aprenda a enviar um PR para o repositório ZecHub. Toda a nossa documentação é criada e mantida nesse repositório. Siga o [guia de estilo do ZecHub](https://zechub.wiki/contribute/style-guide) ao escrever uma página da wiki e use uma página existente da mesma seção como referência de estrutura. Depois de enviar um PR, mande uma mensagem para @dismad, @squirrel ou @vito na seção #zechub do Discord, e eles vão revisar o seu PR e fazer o merge se ele estiver pronto para ser adicionado ao site. Se o merge for feito, eles vão adicionar o documento ao site do ZecHub. Se o documento não estiver pronto, eles vão sugerir edições para você no PR.

#### Wiki do ZecHub: página da wiki traduzida

O objetivo do ZecHub é oferecer um hub educacional de código aberto com o qual qualquer pessoa da comunidade do Zcash possa contribuir. Um dos maiores sucessos do hub é ver membros da comunidade traduzindo os materiais do ZecHub para o seu idioma local.

Observação: o limite global de tradução de páginas do ZecHub é de 10 páginas por semana.

As páginas de idioma curadas em `translations/<locale>/site/` são acompanhadas em relação à sua fonte em inglês por meio de um manifesto de hashes da fonte. Veja [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) para a detecção de páginas desatualizadas, o fluxo de sincronização e a validação de termos protegidos.

#### Wiki do ZecHub: edição de um documento existente

Às vezes, as informações da nossa documentação não estão totalmente corretas. Tudo bem. É por isso que a mantemos como código aberto! Se você encontrar algo que precisa ser alterado em um documento da wiki, vá até o rodapé do documento (que leva à sua página no GitHub) e sugira uma alteração por meio de um PR.

#### Wiki do ZecHub: link quebrado corrigido

Se você encontrar um link quebrado ou algo importante escrito errado, vá até o rodapé do documento (que leva à sua página no GitHub) e sugira a alteração por meio de um PR.

#### Newsletter: nova edição

Produzimos a newsletter semanal do ecossistema. Essa é uma forma super fácil e de pouco esforço para participar! A newsletter sai toda sexta-feira ou sábado. Se você quiser escrever uma newsletter, mande uma mensagem para @squirrel na seção #zecweekly do Discord para avisar.

Depois disso, você pode ir até a [seção de newsletter deste repositório](/newsletter/newsletterbasics.md) e enviar um pull request para criar uma nova edição da newsletter. Siga o formato usado neste [modelo](/newsletter/newslettertemplate.md).

Depois que você fizer isso, @squirrel ou (no Discord) verá que a sua nova edição da newsletter está disponível, vai revisá-la e fazer o merge no repositório. Depois do merge, o conteúdo será publicado via Substack.

#### Newsletter: tradução

Atualmente temos edições em espanhol, português e russo. As versões traduzidas são publicadas nas redes sociais dos tradutores, e fazemos o possível para divulgá-las pelas redes sociais do ZecHub.

Se você quiser traduzir a newsletter para o seu idioma local, diga para nós em qual canal você a compartilharia e em qual idioma você publicaria a newsletter, para que possamos coordenar o lançamento.

#### Podcast: episódio publicado nas redes sociais do ZecHub

Você tem uma ideia para um programa de notícias, podcast, palestra sobre o Twitter ou outro conteúdo em vídeo ou áudio? Conte para nós no #video-content do Discord e vamos conversar.

As recompensas para esse tipo de conteúdo são um pouco maiores, então uma proposta precisaria ser enviada à DAO do ZecHub antes da aprovação do gasto.

#### Posts criativos para redes sociais

Queremos conteúdo novo e envolvente para as nossas redes sociais. Vídeos curtos, GIFs, memes e outros posts criativos são aceitos quando seguem o [guia de estilo do ZecHub](https://zechub.wiki/contribute/style-guide). O valor da recompensa segue a [política de valores de bounty](https://bounties.zechub.wiki/docs/bounty-amounts).

Você também pode criar thumbnails para a nossa newsletter e o nosso podcast. Se você tem talento para design, mande uma mensagem para nós no #design do Discord.

#### Outras ideias? Conte para nós!

Tem outra sugestão? Conte para nós no #general do Discord. Podemos discutir a ideia e ver se a DAO do ZecHub vai apoiá-la.

### Para finalizar

Não hesite em começar a contribuir com um dos protocolos mais respeitados do setor. Essa é uma ótima forma de participar do Zcash. Se você tiver qualquer dúvida sobre como contribuir, fale com a gente no [Discord](#join-the-conversation).

Obrigado!
