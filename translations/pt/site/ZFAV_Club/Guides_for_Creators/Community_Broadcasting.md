<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Transmissão comunitária usando VDO.Ninja e OBS Studio

Este breve tutorial foi criado durante o [DWeb Camp 2023](https://dwebcamp.org/) por um grupo de bolsistas e voluntários. O objetivo deste exercício é aproveitar smartphones conectados a uma rede MESH offline para gravação e transmissão colaborativa de vídeo.

Usamos dois softwares de código aberto: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) e [VDO.Ninja](https://vdo.ninja/). Esses softwares podem ser baixados e executados localmente no seu computador.

## OBS Studio (Open Boardcaster software)

O OBS Studio é um software livre e de código aberto para gravação e transmissão ao vivo, disponível para vários sistemas operacionais. O software foi lançado pela primeira vez em 2012 e conta com um grande número de seguidores na comunidade de streaming de jogos e entre criadores independentes de conteúdo em vídeo.

A interface do OBS Studio pode parecer bastante intimidadora para quem a usa pela primeira vez. O OBS Studio é dividido em duas janelas, "Preview" e "Broadcast". A janela de pré-visualização mostra os vídeos disponíveis (várias câmeras, como webcam, Iriun Webcam, OBS Virtual Camera, Video e Browser source), chamados de "Scenes", e a "Broadcast" mostra a transmissão ao vivo.

Para transmitir no OBS Studio o vídeo de uma câmera remota vindo do VDO.ninja, comece adicionando uma nova "Browser Source" em "Sources > Add > Browser". Na nova janela, você pode informar a URL de origem do VDO.Ninja e selecionar "Make source visible".

Agora você já pode começar a transmitir os streams remotos.

## VDO.Ninja

O [VDO.Ninja](https://vdo.ninja/) é um aplicativo web livre e de código aberto que permite transformar seus dispositivos móveis em câmeras de transmissão ao vivo. O software pode ser baixado e implantado no seu computador local, ou você pode usar diretamente a [versão online em https://vdo.ninja](https://vdo.ninja/).

A interface do VOD.Ninja é simples: basta abrir o VDO.Ninja no navegador do seu dispositivo móvel e selecionar "Add your camera to OBS". Em seguida, selecione sua câmera e seu dispositivo de áudio na lista de dispositivos e clique em "Start".  Você receberá então um link de "view", que pode ser adicionado ao OBS Studio.

## Dirigindo uma chamada comunitária com o VDO.Ninja

Comece acessando o [VDO.ninja](http://VDO.ninja) com o navegador de um desktop/laptop.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


Para criar uma nova sala e dirigir a transmissão ao vivo da sua própria chamada comunitária, clique em Create a Room.

A próxima tela pedirá informações básicas para configurar sua sala.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

Depois que a sala é criada, o diretor tem muitas opções de controle disponíveis na tela seguinte.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


Quando as pessoas entrarem na sua sala, você, o diretor, verá aparecer todas as opções de fonte e os controles com o vídeo e o áudio delas.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## Perguntas frequentes

- Que tipos de placa de vídeo são necessários para o OBS Studio?

Você pode usar um computador pessoal com uma boa placa de vídeo e bastante memória ou, como alternativa, pode usar codificadores de hardware [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- O OBS permite fazer tradução e legendagem ao vivo?

Existem alguns plugins criados pela comunidade que parecem oferecer esse recurso. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Você pode desenvolver seus próprios plugins para o OBS Studio?

Sim, o OBS tem suporte a scripts em lua e python. Também há JavaScript para overlays e webviews.

- Usamos fade to black ao vivo ou transições?

Isso fica a seu critério, produtor!

- Existe latência durante a transmissão?

Isso depende principalmente do destino para onde você está transmitindo. Por exemplo, o YouTube pode ter um atraso de um minuto ou mais devido ao processamento de vídeo feito nos servidores dele antes da transmissão.

- O áudio falha ao usar o OBS em uma máquina lenta e durante o uso de green screen

Use um codificador de hardware ou use o stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) ou [RiverSide.FM](http://riverside.fm/)

## Créditos

- Ryan
- Ajay
- Arky

## Recursos

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: a comunidade de mídia e eventos digitais
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
