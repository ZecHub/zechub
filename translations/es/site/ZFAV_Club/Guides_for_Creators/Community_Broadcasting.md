<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Transmisión comunitaria usando VDO.Ninja y OBS Studio

Este breve tutorial fue creado durante el [DWeb Camp 2023](https://dwebcamp.org/) por un grupo de fellows y voluntarios. El objetivo de este ejercicio es aprovechar el uso de dispositivos inteligentes conectados a una red MESH sin conexión para la grabación y transmisión colaborativa de video.

Usamos dos programas de código abierto [OBS Studio (software Open Broadcaster)](https://obsproject.com/) y [VDO.Ninja](https://vdo.ninja/). Estos programas pueden descargarse y ejecutarse localmente en tu computadora.

## OBS Studio (software Open Boardcaster)

OBS Studio es un programa gratuito y de código abierto para grabación y transmisión en vivo que está disponible para múltiples sistemas operativos. El software se lanzó por primera vez en 2012 y goza de bastante popularidad entre la comunidad de streaming de videojuegos y los creadores independientes de contenido en video.

La interfaz de usuario de OBS Studio puede parecer bastante intimidante para quienes lo usan por primera vez. OBS Studio se divide en dos ventanas: "Preview" y "Broadcast". La ventana de vista previa muestra los videos disponibles (varias cámaras como webcam, Iriun Webcam, OBS Virtual Camera, fuentes de Video y Browser) llamadas "Scenes", y "Broadcast" muestra la transmisión en vivo.

Para transmitir a OBS Studio desde una cámara remota por medio de VDO.ninja, comienza agregando una nueva "Browser Source" con "Sources > Add > Browser". En la nueva ventana, puedes proporcionar la URL de la fuente desde VDO.Ninja y seleccionar "Make source visible".

Ahora ya puedes comenzar a transmitir las fuentes remotas.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) es una aplicación web gratuita y de código abierto que te permite convertir tus dispositivos móviles en una cámara de transmisión en vivo. El software puede descargarse e implementarse en tu computadora local o puedes usar directamente la [versión en línea en https://vdo.ninja](https://vdo.ninja/).

La interfaz de VOD.Ninja es simple: solo abre VDO.Ninja en el navegador web de tu dispositivo móvil y selecciona "Add your camera to OBS". Luego seleccionarás tu cámara y dispositivo de audio de la lista de dispositivos y harás clic en "Start". Después obtendrás un enlace de "view" que puedes agregar a OBS Studio.

## Dirigir una llamada comunitaria con VDO.Ninja

Comienza yendo a [VDO.ninja](http://VDO.ninja) con tu navegador web en una computadora de escritorio o laptop.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Para crear una nueva sala y dirigir la transmisión en vivo de tu propia llamada comunitaria, haz clic en Create a Room.

La siguiente pantalla te pedirá información básica para configurar tu sala.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Una vez que se crea una sala, el director tiene muchas opciones de control disponibles en la siguiente pantalla.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


Cuando las personas se unen a tu sala, tú, como director, verás aparecer todas las opciones de fuentes y controles junto con su video y audio.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## Preguntas frecuentes

- ¿Qué tipos de tarjetas gráficas de video se requieren para OBS Studio?

Puedes usar una computadora personal con una buena tarjeta gráfica y mucha memoria o, alternativamente, puedes usar un codificador de hardware [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- ¿OBS te permite hacer traducción en vivo y subtitulado?

Hay algunos plugins aportados por la comunidad que parecen ofrecer esa función. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- ¿Podrías desarrollar tus propios plugins para OBS Studio?

Sí, OBS admite scripting en lua y python. También JavaScript para overlays y webviews.

- ¿Usamos fundido en vivo a negro o transiciones?

Eso depende de ti, ¡el productor!

- ¿Hay latencia cuando estás transmitiendo?

Esto depende principalmente del destino al que estés transmitiendo. Por ejemplo, YouTube podría tener un retraso de un minuto o más debido al procesamiento de video que se realiza en sus servidores antes de ser emitido.

- Caídas de audio al usar OBS en una máquina lenta y mientras se hace chroma key

Usa un codificador de hardware o usa stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) o [RiverSide.FM](http://riverside.fm/)

## Créditos

- Ryan
- Ajay
- Arky

## Recursos

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Horario de oficina: La comunidad de medios y eventos digitales
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
