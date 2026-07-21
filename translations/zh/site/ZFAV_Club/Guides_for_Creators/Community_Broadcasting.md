<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 使用 VDO.Ninja 和 OBS Studio 进行社区直播

这篇简短教程由一群研究员和志愿者在 [DWeb Camp 2023](https://dwebcamp.org/) 期间创建。本练习的目标是利用连接到离线 MESH 网络的智能手机设备进行协作式视频录制和直播。

我们使用两个开源软件：[OBS Studio（Open Broadcaster software）](https://obsproject.com/) 和 [VDO.Ninja](https://vdo.ninja/)。这些软件可以下载后在你的电脑上本地运行。

## OBS Studio（Open Boardcaster software）

OBS Studio 是一款免费的开源录制和直播软件，支持多种操作系统。该软件于 2012 年首次发布，并在游戏直播社区和独立视频内容创作者中拥有相当庞大的用户群体。

对于初次使用者来说，OBS Studio 的用户界面看起来可能相当复杂。OBS Studio 分为两个窗口：“Preview”和“Broadcast”。Preview 窗口显示可用的视频（各种摄像头，如网络摄像头、Iriun Webcam、OBS Virtual Camera、Video 和 Browser source），这些被称为“Scenes”；而“Broadcast”则显示直播画面。

为了将来自 VDO.ninja 的远程摄像头画面串流到 OBS Studio 中，你需要先添加一个新的 “Browser Source”，路径为 “Sources > Add > Browser”。在新窗口中，你可以填写来自 VDO.Ninja 的源 URL，并选择 “Make source visible”。

现在你就可以开始直播这些远程画面了。

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) 是一个免费的开源 Web 应用，可让你把移动设备变成直播摄像头。该软件可以下载并部署到你的本地电脑上，或者你也可以直接使用 [在线版本 https://vdo.ninja/](https://vdo.ninja/)。

VOD.Ninja 的界面很简单，只需在你的移动设备浏览器中打开 VDO.Ninja，然后选择 “Add your camera to OBS”。接着从设备列表中选择你的摄像头和音频设备，并点击 “Start”。之后你会得到一个 “view” 链接，可将其添加到 OBS Studio 中。

## 使用 VDO.Ninja 导播社区通话

首先，在台式机或笔记本电脑的浏览器中访问 [VDO.ninja](http://VDO.ninja)。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8ded1b54-602b-4e66-af92-127990eff723/Screenshot_2023-08-23_162222/w=3840,quality=80" alt="" width="300" height="400"/>
</a>


要创建一个新房间并导播你自己的社区通话直播，请点击 Create a Room。

下一个页面会要求你填写用于设置房间的基本信息。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/ae698696-7b4d-458e-8de0-58a198c36e73/Screenshot_2023-08-23_183900/w=3840,quality=80" alt="" width="400" height="400"/>
</a>

房间创建完成后，导播可以在接下来的页面中使用许多控制选项。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/35b43544-5114-4e74-ac41-9e8993fe62ea/Screenshot_2023-08-23_184015/w=3840,quality=80" alt="" width="400" height="400"/>
</a>


当有人加入你的房间后，作为导播的你将看到所有源选项和控制项，连同他们的视频和音频一起显示出来。

<a href="">
    <img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/2247f187-b005-478e-9e5e-471cb8f070d3/Screenshot_2023-08-23_194136/w=3840,quality=80" alt="" width="400" height="300"/>
</a>


## 常见问题

- OBS Studio 需要什么类型的视频显卡？

你可以使用配备良好显卡和大容量内存的个人电脑，或者也可以使用硬件编码器 [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBS 是否支持实时翻译和字幕？

有一些社区贡献的插件似乎提供了这样的功能。[https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- 你可以为 OBS Studio 开发自己的插件吗？

可以，OBS 支持 lua、python 脚本，也支持用于叠加层和 webview 的 JavaScript。

- 我们会使用实时淡出到黑场或转场效果吗？

这取决于你，也就是制作人！

- 直播时会有延迟吗？

这主要取决于你的直播目标平台。例如，YouTube 可能会有一分钟或更长时间的延迟，因为视频在正式播出前需要先在他们的服务器上进行处理。

- 在配置较慢的机器上使用 OBS 并进行绿幕处理时，音频会掉帧

使用硬件编码器或使用 stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) 或 [RiverSide.FM](http://riverside.fm/)

## 致谢

- Ryan
- Ajay
- Arky

## 资源

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours：媒体与数字活动社区
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
