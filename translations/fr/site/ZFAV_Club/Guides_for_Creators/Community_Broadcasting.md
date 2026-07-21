<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Modifier la page"/>
</a>

# Diffusion communautaire avec VDO.Ninja et OBS Studio

Ce court tutoriel a été créé pendant le [DWeb Camp 2023](https://dwebcamp.org/) par un groupe de participants et de bénévoles. L’objectif de cet exercice est de tirer parti de l’utilisation de smartphones connectés à un réseau MESH hors ligne pour l’enregistrement vidéo collaboratif et la diffusion en streaming.

Nous utilisons deux logiciels open source, [OBS Studio (Open Broadcaster software)](https://obsproject.com/) et [VDO.Ninja](https://vdo.ninja/). Ces logiciels peuvent être téléchargés et exécutés localement sur votre ordinateur.

## OBS Studio (Open Boardcaster software)

OBS Studio est un logiciel gratuit et open source d’enregistrement et de diffusion en direct, disponible pour plusieurs systèmes d’exploitation. Le logiciel a été publié pour la première fois en 2012 et bénéficie d’une grande popularité parmi la communauté du streaming de jeux vidéo et les créateurs de contenu vidéo indépendants.

Les interfaces utilisateur d’OBS Studio peuvent sembler assez intimidantes pour les nouveaux utilisateurs. OBS Studio est divisé en deux fenêtres, « Preview » et « Broadcast ». La fenêtre d’aperçu affiche les vidéos disponibles (diverses caméras telles que webcam, Iriun Webcam, OBS Virtual Camera, sources vidéo et navigateur) appelées « Scenes », tandis que « Broadcast » affiche le flux en direct.

Afin de diffuser dans OBS Studio un flux de caméra distant provenant de VDO.ninja, commencez par ajouter une nouvelle « Browser Source » avec « Sources > Add > Browser ». Dans la nouvelle fenêtre, vous pouvez fournir l’URL source de VDO.Ninja et sélectionner « Make source visible ».

Vous pouvez maintenant commencer à diffuser les flux distants.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) est une application web gratuite et open source qui vous permet de transformer vos appareils mobiles en caméra de diffusion en direct. Le logiciel peut être téléchargé et déployé sur votre ordinateur local, ou vous pouvez directement utiliser la [version en ligne sur https://vdo.ninja](https://vdo.ninja/).

L’interface de VOD.Ninja est simple : ouvrez simplement VDO.Ninja dans le navigateur web de votre appareil mobile et sélectionnez « Add your camera to OBS ». Vous choisirez ensuite votre caméra et votre périphérique audio dans la liste des appareils, puis cliquerez sur « Start ». Vous obtiendrez alors un lien « view » que vous pourrez ajouter à OBS Studio.

## Réaliser une émission communautaire avec VDO.Ninja

Commencez par aller sur [VDO.ninja](http://VDO.ninja) avec votre navigateur web sur un ordinateur de bureau ou portable.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Pour créer une nouvelle salle et réaliser le livestream de votre propre émission communautaire, cliquez sur Create a Room.

L’écran suivant vous demandera des informations de base pour configurer votre salle.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Une fois la salle créée, le réalisateur dispose de nombreuses options de contrôle sur l’écran suivant.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


Lorsque des personnes rejoignent votre salle, vous, le réalisateur, verrez apparaître toutes les options de source et tous les contrôles avec leur vidéo et leur audio.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## FAQ

- Quels types de cartes graphiques vidéo sont nécessaires pour OBS Studio ?

Vous pouvez utiliser un ordinateur personnel avec une bonne carte graphique et beaucoup de mémoire, ou alternativement un encodeur matériel [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBS permet-il de faire de la traduction en direct et du sous-titrage ?

Il existe des plugins fournis par la communauté qui semblent offrir une telle fonctionnalité. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Pourriez-vous développer vos propres plugins pour OBS Studio ?

Oui, OBS prend en charge les scripts lua et python. Aussi JavaScript pour les overlays et les vues web.

- Utilise-t-on un fondu au noir en direct ou des transitions ?

C’est à vous d’en décider, le producteur !

- Y a-t-il de la latence lorsque vous diffusez ?

Cela dépend principalement de la destination vers laquelle vous diffusez. Par exemple, YouTube peut avoir un délai d’une minute ou plus en raison du traitement vidéo effectué sur ses serveurs avant la diffusion.

- Le son coupe lors de l’utilisation d’OBS sur une machine lente et pendant l’utilisation d’un fond vert

Utilisez un encodeur matériel ou utilisez stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) ou [RiverSide.FM](http://riverside.fm/)

## Crédits

- Ryan
- Ajay
- Arky

## Ressources

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Heures de bureau : la communauté des médias et des événements numériques
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
