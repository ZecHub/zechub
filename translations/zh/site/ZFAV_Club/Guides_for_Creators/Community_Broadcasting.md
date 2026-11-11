<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Community_Broadcasting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 使用 VDO.Ninja 和 OBS Studio 进行社区广播 [Community Broadcasting]

本简短教程由一群研究员和志愿者在 [DWeb Camp 2023](https://dwebcamp.org/) 期间创建。本练习旨在利用连接至离线 MESH 网络的智能手机设备，进行协作式视频录制和流媒体传输。

我们使用两款开源软件 [OBS Studio（Open Broadcaster software）](https://obsproject.com/) 和 [VDO.Ninja](https://vdo.ninja/)。这些软件可以下载并在您的计算机本地运行。

## OBS Studio（开放广播软件 [Open Boardcaster software]）

OBS Studio 是一款免费开源软件，可用于录制和直播，并支持多个操作系统。该软件于 2012 年首次发布，在游戏直播社区和独立视频内容创作者中拥有相当庞大的追随者群体。

OBS Studio 的用户界面对首次使用的用户而言可能颇具挑战性。OBS Studio 分为两个窗口："预览"和"广播"。预览窗口显示可用视频（各种摄像头，如网络摄像头、Iriun Webcam、OBS Virtual Camera、视频和浏览器源），这些被称为"场景"；"广播"窗口则显示直播流。

若要将来自 VDO.ninja 的远程摄像头流传输至 OBS Studio，首先需通过"来源 > 添加 > 浏览器"添加新的"浏览器源"。在新窗口中，您可以提供来自 VDO.Ninja 的源 URL，并选择"使来源可见"。

现在您可以开始广播远程流。

## VDO.Ninja

[VDO.Ninja](https://vdo.ninja/) 是一款免费开源 Web 应用程序，可让您将移动设备变为直播摄像头。该软件可以下载并部署到您的本地计算机，或者您也可以直接使用 [位于 https://vdo.ninja](https://vdo.ninja/). 的在线版本

VOD.Ninja 的界面很简单：只需在移动设备的 Web 浏览器中打开 VDO.Ninja，并选择"将您的摄像头添加到 OBS"。然后，您将从设备列表中选择摄像头和音频设备，并点击"开始"。随后，您将获得可添加至 OBS Studio 的"view"链接。

## 使用 VDO.Ninja 导演社区通话

首先，在台式机/笔记本电脑的 Web 浏览器中前往 [VDO.ninja](http://VDO.ninja)。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="300" height="400"/>
</a>


要创建新房间并导演自己的社区通话直播，请点击"创建房间"。

下一个屏幕将要求您提供用于设置房间的基本信息。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>

房间创建后，导演可在以下屏幕中使用许多控制选项。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="400"/>
</a>


当人们加入您的房间时，作为导演的您将看到所有源选项和控制项随其视频和音频出现。

<a href="">
    <img src="/content-images/_unavailable.svg" alt="" width="400" height="300"/>
</a>


## 常见问题 [FAQ]

- OBS Studio 需要什么类型的视频显卡？

您可以使用配备优质显卡和大量内存的个人计算机，或者使用硬件编码器 [Teradek VidiU](https://www.bhphotovideo.com/c/product/1609186-REG/teradek_10_0235_vidiu_x_modem.html?gclid=EAIaIQobChMIl4aIo7zX_wIVDhqtBh0PgwhxEAAYAiAAEgInufD_BwE)
- OBS 支持实时翻译和字幕吗？

有一些社区贡献的插件似乎提供此类功能。[https://github.com/eddieoz/OBS-live-translation](https://github.com/eddieoz/OBS-live-translation)

- 您可以为 OBS Studio 开发自己的插件吗？

可以，OBS 支持 lua、python 脚本。也支持 JavaScript 用于叠加层和 Web 视图。

- 我们应使用实时淡出至黑屏还是转场？

这取决于您，制作人！

- 直播时会有延迟吗？

这主要取决于您的直播目的地。例如，YouTube 可能会因其服务器在广播前进行的视频处理而产生一分钟或更长时间的延迟。

- 在运行缓慢的设备上使用 OBS 且进行绿幕处理时，音频会中断

使用硬件编码器或使用 stream yard
[https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard](https://support.streamyard.com/hc/en-us/articles/360056350852-How-to-Use-OBS-Virtual-Camera-with-StreamYard) 或 [RiverSide.FM](http://riverside.fm/)

## 致谢

- Ryan
- Ajay
- Arky

## 资源

[https://obsproject.com/help](https://obsproject.com/help)

[https://docs.vdo.ninja/](https://docs.vdo.ninja/)

Office Hours：媒体和数字活动社区
[https://alex4d.com/notes/item/media-and-digital-event-community](https://alex4d.com/notes/item/media-and-digital-event-community)
