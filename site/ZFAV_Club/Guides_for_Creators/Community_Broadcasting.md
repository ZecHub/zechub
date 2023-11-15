# Community Broadcasting using VDO.Ninja and OBS Studio

This short tutorial was created during the [DWeb Camp 2023](https://dwebcamp.org/) by group of fellows and volunteers. The goal of this exercise is to leverage on using smart phone devices connected to offline MESH network for collaborative video recording and streaming.

We use two open source software [OBS Studio (Open Broadcaster software)](https://obsproject.com/) and [VDO.Ninja](https://vdo.ninja/). These software could be downloaded and run locally on your computer.

## OBS Studio (Open Boardcaster software)

OBS Studio is Free and Open source software for recording and live streaming that is available for multiple operating systems. The software was first released in 2012 and enjoys quite a large following among game streaming community and independent video content creators.

The OBS Studio user interfaces could look quite daunting for the first the time users. The OBS studio is divided into two windows "Preview" and "Broadcast". The preview window shows available videos (various cameras such as webcam, Iriun Webcam, OBS Virtual Camera, Video and Browser source) called "Scenes" and "Broadcast" shows the live stream.

In order to stream from a remote camera stream from VDO.ninja into OBS Studio, you start by adding a new "Browser Source" with "Sources > Add > Browser". In the new window, you can provide the source URL from VDO.Ninja and select "Make source visible".

Now you can now start broadcasting the remote streams.

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) is an Free and open source web application that allows you to turn your mobile devices into live streaming camera. The software could downloaded and deployed onto your local computer or you can directly use the [online version at https://vdo.ninja](https://vdo.ninja/).

The VOD.Ninja interface is simple, just open the VDO.Ninja in your mobile devices web browser and select "Add your camera to OBS". You'll then select your camera and audio device from list of devices and click "Start".  You'll then get "view" link which can add to OBS Studio.

## Directing a community call with VDO.Ninja

Start by going to [VDO.ninja](http://VDO.ninja) with your web browser on a desktop/laptop.

![Screenshot 2023-08-23 162222.png](Community%20Broadcasting%20using%20VDO%20Ninja%20and%20OBS%20Stu%20fb45e527473240549baa12996510650d/Screenshot_2023-08-23_162222.png)

To create a new room and direct your own community call livestream, click Create a Room.

The next screen will ask for basic information to setup your room.

![Screenshot 2023-08-23 183900.png](Community%20Broadcasting%20using%20VDO%20Ninja%20and%20OBS%20Stu%20fb45e527473240549baa12996510650d/Screenshot_2023-08-23_183900.png)

Once a room is created, the director has a lot of control options available on the following screen.

![Screenshot 2023-08-23 184015.png](Community%20Broadcasting%20using%20VDO%20Ninja%20and%20OBS%20Stu%20fb45e527473240549baa12996510650d/Screenshot_2023-08-23_184015.png)

When people join your room then you, the director, will see all of the source options and controls appear with their video and audio.

![Screenshot 2023-08-23 194136.png](Community%20Broadcasting%20using%20VDO%20Ninja%20and%20OBS%20Stu%20fb45e527473240549baa12996510650d/Screenshot_2023-08-23_194136.png)

## FAQ

- What types of video graphic cards are required for OBS Studio ?

You can use a personal computer with good graphic card and lots of memory or alternatively you can use a hardware encoders (Teradek VidiU) [https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)

- Does OBS allow you to do live translation and captioning?

There are some community contributed plugins that seems to be provide such a feature.     [https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- Could you develop your own plugins for OBS Studio?

Yes,  OBS has support lua, python scripting. Also JavaScript for Overlays and webviews.

- Do we use live fade to black or transitions?

That’s up to you, the producer!

- Is there a latency when you are streaming?

This depends mostly on the destination to where you are streaming. For example, YouTube might have a delay of a minute or more due to video processing that’s done on their servers before being broadcast.

- Audio drops when using OBS on slow machine and while doing green-screening

Use Hardware encoder or use stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) or [RiverSide.FM](http://riverside.fm/)

## Credits

- Ryan
- Ajay
- Arky

## Resources

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours: The media and digital event community
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
