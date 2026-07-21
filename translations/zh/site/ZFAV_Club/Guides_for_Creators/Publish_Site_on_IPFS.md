<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 在 IPFS 上发布网站

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## IPFS 简介

IPFS（星际文件系统，InterPlanetary File System）是一种点对点协议和网络，旨在创建一种去中心化的文件存储与共享方式。

不同于互联网传统的客户端-服务器模型，IPFS 允许用户彼此直接共享文件，而不是依赖中心化服务器来存储和分发内容。

IPFS 中的文件使用*内容寻址*来标识，这意味着每个文件都会根据其内容分配一个唯一的哈希值或内容标识符（CID），并使用这个哈希值从网络中检索文件。

当用户将文件添加到 IPFS 时，文件会被拆分成称为区块的小片段，并为每个区块分配一个 CID。随后，这些区块会存储在网络中的不同节点上，从而使文件能够从多个来源轻松检索。

这既确保了冗余和容错性，也使任何单一节点都难以成为单点故障或控制点。

**阅读：[IPFS 简介](https://blog.infura.io/post/an-introduction-to-ipfs)**

## 创建你的网站

在本示例中，我们将创建一个简单的网站。

[示例网站](https://squirrel.surf/)

**第 1 步：** 如果你不熟悉网页设计，请先为你的网站编写主要内容，包括标题、正文文本、指向其他页面/网站的链接以及页脚。

**第 2 步：** 使用一个 [HTML 模板！](https://nicepage.com/html-templates) 按照模板粘贴你编写好的文本内容。你也可以选择为网站额外创建一个 .CSS 样式表。

**第 3 步：** 保存你的目录。所有 .html 页面和图片都必须位于同一个文件夹中。

## 设置节点

从[官方网站](https://docs.ipfs.tech/install/ipfs-desktop/)下载并安装 IPFS。

### 初始化 IPFS：

如果你使用的是桌面应用程序，则无需初始化。

使用终端或命令提示符，运行命令：ipfs init

### **将网站文件夹添加到 IPFS**：

选择包含你网站文件的文件夹，然后找到 Add Folder 选项。


<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

如果使用终端，运行命令：ipfs add -r folder_name，将整个文件夹递归添加到 IPFS。

### 在 IPFS 上固定网站：

当你的网站文件添加到 IPFS 后，你需要将其**固定（pin）**，以确保它们在网络中持续可用。

–

如果使用终端，运行命令：If using Terminal, Run command: ipfs pin add **hash**

**hash** = 你在上一步添加的文件夹的 CID。

或者，你也可以使用 [Pinata](https://pinata.cloud/) 或 [Dolpin](https://dolpin.io/) 等服务来固定目录

这会节省大量时间！

–

### 在 IPFS 上访问你的网站：

你的网站现在已经发布到 IPFS 上，可以使用该文件夹的哈希值进行访问。要访问你的网站，你可以前往 https://ipfs.io/ipfs/**hash**

**hash** = 文件夹的 CID。

在我们的示例中，CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

星际命名系统（IPNS）允许你更新与你网站关联的 IPFS CID，同时仍然提供一个静态链接。它以密钥的形式提供。


<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>


在 IPFS 桌面应用程序中，打开你的网站文件夹的设置菜单，然后选择 Publish to IPNS。

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>


密钥：“k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

它也可以用于通过网关查看我们的网站：https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

网站已经创建完成，现在我们需要一种方法将 URL 指向该内容。

如果你已经拥有一个网址，你可以使用 TXT 记录 _dnslink(your domain) 添加一条新记录。具体取决于服务提供商，它可能会自动填充。


<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>


在你能够查看之前，它需要一些时间在网络中传播。

*恭喜！你现在拥有了一个抗审查的网站。*

____

**资源**

[IPFS 文档](https://docs.ipfs.tech/)

[IPNS 文档](https://docs.ipfs.tech/concepts/ipns/)

[DNS link 文档](https://dnslink.io/#introduction)
