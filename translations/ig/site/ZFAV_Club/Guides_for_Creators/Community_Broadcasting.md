<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mgbasa ozi nke obodo [Community Broadcasting] site na VDO.Ninja na OBS Studio

E mepụtara nkuzi mkpirikpi a n'oge [DWeb Camp 2023](https://dwebcamp.org/) site n'aka otu ndị ọrụ ibe na ndị ọrụ afọ ofufo. Ebumnuche nke mmemme a bụ iji ngwaọrụ ekwentị amamihe [smart phone devices] ejikọrọ na netwọkụ MESH na-anọghị n'ịntanetị mee ndekọ vidiyo na mgbasa ozi ọnụ.

Anyị na-eji ngwanrọ mepere emepe abụọ [OBS Studio (Open Broadcaster software)](https://obsproject.com/) na [VDO.Ninja](https://vdo.ninja/). Enwere ike ibudata ngwanrọ ndị a ma jiri ha rụọ ọrụ n'ime kọmputa gị.

## OBS Studio (Open Boardcaster software)

OBS Studio bụ ngwanrọ n'efu ma mepere emepe maka ndekọ na mgbasa ozi ndụ [live streaming], nke dị maka sistemụ arụmọrụ dị iche iche. E wepụtara ngwanrọ a mbụ na 2012, ọ nwekwara ọtụtụ ndị na-akwado ya n'etiti obodo mgbasa egwuregwu na ndị na-emepụta ọdịnaya vidiyo nọọrọ onwe ha.

Ihu onye ọrụ OBS Studio nwere ike iyi ihe na-atụ egwu nye ndị na-eji ya nke mbụ. E kewara OBS Studio n'ime windo abụọ, “Nlele [Preview]” na “Mgbasa [Broadcast]”. Windo nlele na-egosi vidiyo dị (kamera dị iche iche dịka webcam, Iriun Webcam, OBS Virtual Camera, Video na Browser source) a na-akpọ “Scenes”, ebe “Broadcast” na-egosi mgbasa ozi ndụ.

Iji bubata mgbasa kamera dịpụrụ adịpụ site na VDO.ninja n'ime OBS Studio, bido site n'ịgbakwunye “Browser Source” ọhụrụ site na “Sources > Add > Browser”. N'ime windo ọhụrụ ahụ, ị nwere ike inye URL isi mmalite sitere na VDO.Ninja ma họrọ “Make source visible”.

Ugbu a, ị nwere ike ịmalite ịgbasa mgbasa dịpụrụ adịpụ.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) bụ ngwa weebụ n'efu ma mepere emepe nke na-enye gị ohere ịgbanwe ngwaọrụ mkpanaka gị ka ọ bụrụ kamera mgbasa ozi ndụ. Enwere ike ibudata ngwanrọ a ma tinye ya n'ime kọmputa mpaghara gị, ma ọ bụ jiri [ụdị n'ịntanetị na https://vdo.ninja](https://vdo.ninja/). ozugbo.

Ihu VOD.Ninja dị mfe; naanị mepee VDO.Ninja n'ime ihe nchọgharị weebụ ngwaọrụ mkpanaka gị ma họrọ “Add your camera to OBS”. Ị ga-ahọrọzi kamera na ngwaọrụ ọdịyo gị site na ndepụta ngwaọrụ ma pịa “Start”. Mgbe ahụ, ị ga-enweta njikọ “view” nke ị nwere ike itinye na OBS Studio.

## Idu oku obodo site na VDO.Ninja

Bido site na ịga [VDO.ninja](http://VDO.ninja) site n'ihe nchọgharị weebụ gị na desktọọpụ/laptọọpụ.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


Iji mepụta ime ụlọ ọhụrụ ma duzie mgbasa ozi ndụ oku obodo nke gị, pịa Create a Room.

Ihuenyo na-esote ga-arịọ maka ozi ndị bụ isi iji hazie ime ụlọ gị.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

Ozugbo e mepụtara ime ụlọ, onye nduzi nwere ọtụtụ nhọrọ njikwa dị na ihuenyo na-esote.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


Mgbe ndị mmadụ sonyeere ime ụlọ gị, gị, onye nduzi, ga-ahụ nhọrọ isi mmalite na njikwa niile na-apụta yana vidiyo na ọdịyo ha.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## Ajụjụ a na-ajụkarị [FAQ]

- Kedu ụdị kaadị eserese vidiyo achọrọ maka OBS Studio?

Ị nwere ike iji kọmputa nkeonwe nwere ezigbo kaadị eserese na ebe nchekwa buru ibu, ma ọ bụ jiri encoders ngwaike [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE).
- OBS ọ na-enye gị ohere ịme ntụgharị asụsụ ndụ na itinye nkọwa okwu?

Enwere ụfọdụ plugins ndị obodo nyere aka mepụta nke yiri ka ha na-enye ụdị atụmatụ ahụ. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Ị nwere ike ịmepụta plugins nke gị maka OBS Studio?

Ee, OBS na-akwado Lua na scripting Python. Ọzọkwa, JavaScript maka Overlays na webviews.

- Anyị ọ na-eji fade to black dị ndụ ma ọ bụ transitions?

Nke ahụ dịịrị gị, onye mmepụta!

- Enwere latency mgbe ị na-agbasa?

Nke a dabere nke ukwuu na ebe ị na-agbasa ozi. Dịka ọmụmaatụ, YouTube nwere ike inwe igbu oge nke nkeji 1 ma ọ bụ karịa n'ihi nhazi vidiyo a na-eme na sava ha tupu agbasa ya.

- Ọdịyo na-akwụsị mgbe a na-eji OBS na igwe nwayọ ma na-eme green-screening

Jiri encoder ngwaike ma ọ bụ jiri stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) ma ọ bụ [RiverSide.FM](http://riverside.fm/)

## Ndị nyere aka [Credits]

- Ryan
- Ajay
- Arky

## Akụrụngwa [Resources]

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Oge Ọfịs [Office Hours]: Obodo mgbasa ozi na mmemme dijitalụ
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
