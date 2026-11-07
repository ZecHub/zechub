<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Hame ƒe Broadcasting kple VDO.Ninja kple OBS Studio

Wɔna kple volɔntiawo ƒe ha ƒe wɔ wò tutorial kpui sia le [DWeb Camp 2023](https://dwebcamp.org/) me. Nɔnɔmetata sia ƒe taɖodzinu nye be woazã smartphone mɔ̃wo siwo ƒo xlã offline MESH network be woawɔ video ƒe nuŋlɔɖi kple streaming ɖeka.

Míezã open source dɔwɔwɔ eve, [OBS Studio (Open Broadcaster software)](https://obsproject.com/) kple [VDO.Ninja](https://vdo.ninja/). Àte ŋu atsɔ dɔwɔwɔ siawo ava le wò kɔmpiuta dzi eye nàwɔ wo le afi ma.

## OBS Studio (Open Broadcaster software)

OBS Studio nye dɔwɔwɔ si nye ablɔɖe kple open source, si woazã be woaŋlɔ nu alo woawɔ live streaming, eye wòle operating system vovovowo dzi. Woɖe dɔwɔwɔ sia go gbã le 2012 me, eye game streaming ƒe hame kple video content creators siwo wòawɔ wo ɖokui ƒe dɔwo lɔ̃e e ŋutɔ.

OBS Studio ƒe user interface ate ŋu akpɔ ɖe amesi zãm wò le zi gbã la ŋu abe nu si sesẽ ene. Woama OBS Studio ƒe screen la ƒe akpa eve, "Preview" kple "Broadcast". Preview ƒe window fia video siwo li (camera vovovowo abe webcam, Iriun Webcam, OBS Virtual Camera, Video kple Browser source), siwo woyɔ be "Scenes", eye "Broadcast" fia live stream la.

Be nàtsɔ remote camera stream tso VDO.ninja ava OBS Studio me la, nàdze egɔme kple Browser Source yeye ƒe tsatsala kple "Sources > Add > Browser". Le window yeye la me la, àte ŋu ana source URL tso VDO.Ninja eye nàtia "Make source visible".

Azɔ la, àte ŋu adze remote streams ƒe broadcasting gɔme.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) nye web application si nye ablɔɖe kple open source, si na wò ŋu trɔ wò mobile devices zu live streaming camera. Àte ŋu atsɔ dɔwɔwɔ sia ava eye nàɖoe le wò kɔmpiuta dzi, alo nàzã [online version le https://vdo.ninja](https://vdo.ninja/). tẽ.

VOD.Ninja ƒe interface bɔbɔe; ke ɖe VDO.Ninja ƒe website la ŋu le wò mobile device ƒe web browser me eye nàtia "Add your camera to OBS". Emegbe la, àtia wò camera kple audio device tso devicewo ƒe list la me eye nàdzi "Start". Emegbe la, nàxɔ "view" link si nàte ŋu akpe ɖe OBS Studio ŋu.

## Hame ƒe ƒoƒo ƒe kplɔɖoɖo kple VDO.Ninja

Dze egɔme to [VDO.ninja](http://VDO.ninja) dzi kple wò web browser le desktop/laptop dzi.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


Be nàwɔ xɔ yeye eye nàkplɔ wò hame ƒe call livestream ŋu la, dzi Create a Room.

Screen si kplɔe ɖo la abia nyatakaka vevi aɖewo tso asike woawɔ wò xɔ la ɖo.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

Ne woawɔ xɔ aɖe vɔ la, director la axɔ control options geɖe le screen si kplɔe ɖo la dzi.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


Ne amewo ge ɖe wò xɔ me la, wò, abe director ene, nàkpɔ source options kple controls katã ƒe dzɔdzɔ kple woƒe video kple audio.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## Nyabiase siwo wozã ɣesiaɣi

- Video graphic cards ka ƒomevi woahiã na OBS Studio?

Àte ŋu azã personal computer si ƒe graphic card nyo kple memory geɖe, alo nàzã hardware encoders [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE).
- Ɖe OBS na wò ŋu nàwɔ live translation kple captioning?

Hame la ƒe plugin aɖewo li siwo abe wotena feature sia gɔme ene. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Ɖe àte ŋu awɔ wò ŋutɔ ƒe plugins na OBS Studio?

Ɛ̃, OBS kpe ɖe lua kple python scripting ŋu. Eya kple JavaScript na Overlays kple webviews.

- Ɖe míazã live fade to black alo transitions?

Esia le wò, producer la, si!

- Ɖe delay li ne nèle streaming wɔm?

Esia ɖe afi si nèle streaming wɔm ɖo ŋutɔ. Ɖe, YouTube ate ŋu anɔ kple minute ɖeka alo wu ema ƒe delay elabena wowo ƒe serverwo wɔ video processing hafi woabroadcast e.

- Audio ƒe ɖoɖo ɖea ne wòzã OBS le machine bɔbɔe dzi eye nèle green-screening wɔm

Zã Hardware encoder alo zã stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) alo [RiverSide.FM](http://riverside.fm/)

## Akpe

- Ryan
- Ajay
- Arky

## Nusiwo woazã

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: Media kple digital event hame
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
