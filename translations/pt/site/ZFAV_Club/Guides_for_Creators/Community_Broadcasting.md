<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar Página"/>
</a>

# Transmissão Comunitária usando VDO.Ninja e OBS Studio

Este breve tutorial foi criado durante o [DWeb Camp 2023](https://dwebcamp.org/) por um grupo de fellows e voluntários. O objetivo deste exercício é aproveitar o uso de dispositivos smartphone conectados a uma rede MESH offline para gravação e transmissão de vídeo colaborativas.

Usamos dois softwares de código aberto, [OBS Studio (software Open Broadcaster)](https://obsproject.com/) e [VDO.Ninja](https://vdo.ninja/). Esses softwares podem ser baixados e executados localmente no seu computador.

## OBS Studio (software Open Boardcaster)

OBS Studio é um software livre e de código aberto para gravação e transmissão ao vivo, disponível para múltiplos sistemas operacionais. O software foi lançado pela primeira vez em 2012 e conta com uma comunidade bastante grande entre streamers de jogos e criadores independentes de conteúdo em vídeo.

As interfaces de usuário do OBS Studio podem parecer bastante intimidadoras para usuários de primeira viagem. O OBS Studio é dividido em duas janelas, "Preview" e "Broadcast". A janela de preview mostra os vídeos disponíveis (várias câmeras, como webcam, Iriun Webcam, OBS Virtual Camera, fontes de vídeo e navegador), chamados de "Scenes", e "Broadcast" mostra a transmissão ao vivo.

Para transmitir uma câmera remota do VDO.ninja para o OBS Studio, você começa adicionando uma nova "Browser Source" em "Sources > Add > Browser". Na nova janela, você pode fornecer a URL da fonte do VDO.Ninja e selecionar "Make source visible".

Agora você já pode começar a transmitir os streams remotos.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) é uma aplicação web gratuita e de código aberto que permite transformar seus dispositivos móveis em câmeras para transmissão ao vivo. O software pode ser baixado e implantado no seu computador local, ou você pode usar diretamente a [versão online em https://vdo.ninja](https://vdo.ninja/).

A interface do VOD.Ninja é simples: basta abrir o VDO.Ninja no navegador web do seu dispositivo móvel e selecionar "Add your camera to OBS". Em seguida, você selecionará sua câmera e dispositivo de áudio na lista de dispositivos e clicará em "Start". Depois disso, você receberá um link de "view" que poderá adicionar ao OBS Studio.

## Dirigindo uma chamada comunitária com VDO.Ninja

Comece acessando [VDO.ninja](http://VDO.ninja) com seu navegador web em um desktop/laptop.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Para criar uma nova sala e dirigir a transmissão ao vivo da sua própria chamada comunitária, clique em Create a Room.

A próxima tela pedirá informações básicas para configurar sua sala.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Depois que uma sala é criada, o diretor tem muitas opções de controle disponíveis na tela seguinte.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


Quando as pessoas entram na sua sala, você, como diretor, verá todas as opções de fontes e controles aparecerem junto com o vídeo e o áudio delas.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## FAQ

- Que tipos de placas gráficas de vídeo são necessários para o OBS Studio?

Você pode usar um computador pessoal com uma boa placa gráfica e bastante memória ou, alternativamente, pode usar encoders de hardware [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- O OBS permite fazer tradução ao vivo e legendagem?

Existem alguns plugins contribuídos pela comunidade que parecem fornecer esse recurso. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Você poderia desenvolver seus próprios plugins para o OBS Studio?

Sim, o OBS oferece suporte a scripts em lua e python. Também a JavaScript para overlays e webviews.

- Usamos fade to black ao vivo ou transições?

Isso depende de você, o produtor!

- Há latência quando você está transmitindo?

Isso depende principalmente do destino para onde você está transmitindo. Por exemplo, o YouTube pode ter um atraso de um minuto ou mais devido ao processamento de vídeo feito nos servidores deles antes da transmissão.

- O áudio falha ao usar o OBS em uma máquina lenta e ao fazer chroma key

Use encoder de hardware ou use o StreamYard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) ou [RiverSide.FM](http://riverside.fm/)

## Créditos

- Ryan
- Ajay
- Arky

## Recursos

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: A comunidade de mídia e eventos digitais
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
