<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Community-Broadcasting mit VDO.Ninja und OBS Studio

Dieses kurze Tutorial wurde während des [DWeb Camp 2023](https://dwebcamp.org/) von einer Gruppe von Fellows und Freiwilligen erstellt. Das Ziel dieser Übung ist es, die Nutzung von Smartphones zu nutzen, die mit einem offline MESH-Netzwerk verbunden sind, um kollaborative Videoaufnahmen und Streaming zu ermöglichen.

Wir verwenden zwei Open-Source-Programme: [OBS Studio (Open Broadcaster software)](https://obsproject.com/) und [VDO.Ninja](https://vdo.ninja/). Diese Programme können heruntergeladen und lokal auf deinem Computer ausgeführt werden.

## OBS Studio (Open Boardcaster software)

OBS Studio ist freie Open-Source-Software für Aufnahmen und Livestreaming, die für mehrere Betriebssysteme verfügbar ist. Die Software wurde erstmals 2012 veröffentlicht und genießt eine ziemlich große Anhängerschaft in der Game-Streaming-Community und bei unabhängigen Video-Content-Erstellern.

Die Benutzeroberfläche von OBS Studio kann auf Erstnutzer zunächst ziemlich einschüchternd wirken. OBS Studio ist in zwei Fenster unterteilt: „Preview“ und „Broadcast“. Das Preview-Fenster zeigt verfügbare Videos (verschiedene Kameras wie Webcam, Iriun Webcam, OBS Virtual Camera, Video- und Browser-Quelle), die „Scenes“ genannt werden, und „Broadcast“ zeigt den Livestream.

Um einen entfernten Kamerastream von VDO.ninja in OBS Studio zu streamen, beginnst du damit, eine neue „Browser Source“ über „Sources > Add > Browser“ hinzuzufügen. Im neuen Fenster kannst du die Quell-URL von VDO.Ninja eingeben und „Make source visible“ auswählen.

Jetzt kannst du mit dem Senden der entfernten Streams beginnen.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) ist eine freie Open-Source-Webanwendung, mit der du deine mobilen Geräte in Live-Streaming-Kameras verwandeln kannst. Die Software kann heruntergeladen und auf deinem lokalen Computer bereitgestellt werden, oder du kannst direkt die [Online-Version unter https://vdo.ninja/](https://vdo.ninja/) verwenden.

Die Benutzeroberfläche von VOD.Ninja ist einfach: Öffne VDO.Ninja einfach im Webbrowser deines Mobilgeräts und wähle „Add your camera to OBS“. Anschließend wählst du deine Kamera und dein Audiogerät aus der Geräteliste aus und klickst auf „Start“. Danach erhältst du einen „view“-Link, den du zu OBS Studio hinzufügen kannst.

## Eine Community-Anruf mit VDO.Ninja leiten

Beginne, indem du mit deinem Webbrowser auf einem Desktop/Laptop zu [VDO.ninja](http://VDO.ninja) gehst.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


Um einen neuen Raum zu erstellen und deinen eigenen Community-Call-Livestream zu leiten, klicke auf Create a Room.

Der nächste Bildschirm fragt nach grundlegenden Informationen, um deinen Raum einzurichten.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

Sobald ein Raum erstellt wurde, stehen dem Regisseur auf dem folgenden Bildschirm viele Steuerungsoptionen zur Verfügung.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


Wenn Personen deinem Raum beitreten, siehst du als Regisseur alle Quelloptionen und Steuerungen zusammen mit ihrem Video und Audio erscheinen.

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## FAQ

- Welche Arten von Grafikkarten werden für OBS Studio benötigt?

Du kannst einen Personal Computer mit einer guten Grafikkarte und viel Arbeitsspeicher verwenden, oder alternativ einen Hardware-Encoder wie [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- Ermöglicht OBS Live-Übersetzung und Untertitelung?

Es gibt einige von der Community beigesteuerte Plugins, die eine solche Funktion bereitzustellen scheinen. [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Könntest du eigene Plugins für OBS Studio entwickeln?

Ja, OBS unterstützt Lua- und Python-Scripting. Außerdem JavaScript für Overlays und Webviews.

- Verwenden wir Live-Fade-to-Black oder Übergänge?

Das liegt ganz bei dir, dem Producer!

- Gibt es eine Latenz beim Streamen?

Das hängt größtenteils vom Ziel ab, an das du streamst. Zum Beispiel kann YouTube aufgrund der Videoverarbeitung auf seinen Servern, die vor der Ausstrahlung durchgeführt wird, eine Verzögerung von einer Minute oder mehr haben.

- Tonaussetzer bei der Verwendung von OBS auf einem langsamen Rechner und beim Greenscreening

Verwende einen Hardware-Encoder oder nutze StreamYard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) oder [RiverSide.FM](http://riverside.fm/)

## Danksagungen

- Ryan
- Ajay
- Arky

## Ressourcen

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Sprechstunden: Die Medien- und digitale Event-Community
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
