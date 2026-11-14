<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Diffusion communautaire avec VDO.Ninja et OBS Studio

Ce court tutoriel a été créé lors du [DWeb Camp 2023](https://dwebcamp.org/) par un groupe de participants et de bénévoles. L'objectif de cet exercice est de tirer parti de smartphones connectés à un réseau MESH hors ligne pour l'enregistrement et la diffusion vidéo collaboratifs.

Nous utilisons deux logiciels open source : [OBS Studio (Open Broadcaster Software)](https://obsproject.com/) et [VDO.Ninja](https://vdo.ninja/). Ces logiciels peuvent être téléchargés et exécutés localement sur votre ordinateur.

## OBS Studio (Open Broadcaster Software)

OBS Studio est un logiciel libre et open source d'enregistrement et de diffusion en direct, disponible pour plusieurs systèmes d'exploitation. Le logiciel a été publié pour la première fois en 2012 et jouit d'une communauté d'utilisateurs assez importante parmi les streamers de jeux vidéo et les créateurs de contenu vidéo indépendants.

L'interface d'OBS Studio peut sembler assez intimidante pour les nouveaux utilisateurs. OBS Studio est divisé en deux fenêtres : « Aperçu » et « Diffusion ». La fenêtre d'aperçu affiche les vidéos disponibles (différentes caméras telles qu'une webcam, Iriun Webcam, OBS Virtual Camera, une source vidéo ou une source navigateur), appelées « Scènes », et la fenêtre « Diffusion » affiche le flux en direct.

Pour diffuser dans OBS Studio le flux d'une caméra distante provenant de VDO.Ninja, commencez par ajouter une nouvelle « Source navigateur » via « Sources > Ajouter > Navigateur ». Dans la nouvelle fenêtre, vous pouvez indiquer l'URL de la source fournie par VDO.Ninja et sélectionner « Rendre la source visible ».

Vous pouvez maintenant commencer à diffuser les flux distants.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) est une application web libre et open source qui vous permet de transformer vos appareils mobiles en caméras de diffusion en direct. Le logiciel peut être téléchargé et déployé sur votre ordinateur local, ou vous pouvez utiliser directement la [version en ligne à l'adresse https://vdo.ninja](https://vdo.ninja/).

L'interface de VDO.Ninja est simple : ouvrez simplement VDO.Ninja dans le navigateur web de votre appareil mobile et sélectionnez « Add your camera to OBS ». Sélectionnez ensuite votre caméra et votre périphérique audio dans la liste des appareils, puis cliquez sur « Start ». Vous obtiendrez alors un lien « view » que vous pourrez ajouter à OBS Studio.

## Diriger un appel communautaire avec VDO.Ninja

Commencez par vous rendre sur [VDO.ninja](http://VDO.ninja) avec le navigateur web d'un ordinateur de bureau ou portable.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


Pour créer une nouvelle salle et diriger la diffusion en direct de votre propre appel communautaire, cliquez sur Create a Room.

L'écran suivant vous demandera des informations de base pour configurer votre salle.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

Une fois la salle créée, le directeur dispose de nombreuses options de contrôle sur l'écran suivant.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


Lorsque des personnes rejoignent votre salle, vous, le directeur, verrez apparaître toutes les options de source et les commandes, avec leur vidéo et leur audio.

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## FAQ

- Quels types de cartes graphiques sont nécessaires pour OBS Studio ?

Vous pouvez utiliser un ordinateur personnel doté d'une bonne carte graphique et de beaucoup de mémoire, ou bien utiliser un encodeur matériel comme le [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBS permet-il de faire de la traduction et du sous-titrage en direct ?

Certains plugins développés par la communauté semblent offrir une telle fonctionnalité. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Pouvez-vous développer vos propres plugins pour OBS Studio ?

Oui, OBS prend en charge les scripts Lua et Python. Il existe aussi JavaScript pour les superpositions et les vues web.

- Utilisons-nous des fondus au noir ou des transitions en direct ?

C'est à vous de décider, en tant que producteur !

- Y a-t-il une latence lors de la diffusion ?

Cela dépend principalement de la destination de votre diffusion. Par exemple, YouTube peut avoir un délai d'une minute ou plus en raison du traitement vidéo effectué sur ses serveurs avant la diffusion.

- Coupures audio lors de l'utilisation d'OBS sur une machine lente et pendant l'incrustation sur fond vert

Utilisez un encodeur matériel ou StreamYard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) ou [RiverSide.FM](http://riverside.fm/)

## Crédits

- Ryan
- Ajay
- Arky

## Ressources

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours : la communauté des médias et des événements numériques
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
