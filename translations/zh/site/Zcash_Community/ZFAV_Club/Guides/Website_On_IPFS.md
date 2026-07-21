<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 在 IPFS 上发布网站

![](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## IPFS 简介

IPFS（InterPlanetary File System）是一种点对点协议和网络，旨在创建一种去中心化的文件存储与共享方式。

不同于传统互联网的客户端-服务器模型，IPFS 允许用户彼此直接共享文件，而不是依赖中心化服务器来存储和分发内容。

在 IPFS 中，文件通过*内容寻址*进行定位，这意味着每个文件都会根据其内容获得一个唯一的哈希值或内容标识符（CID），并使用这个哈希值从网络中检索文件。

当用户将文件添加到 IPFS 时，文件会被拆分成称为区块的小片段，每个区块都会分配一个 CID。随后，这些区块会存储在网络中的不同节点上，使文件可以从多个来源轻松检索。

这既保证了冗余性和容错能力，也使任何单一节点都难以成为单点故障或控制点。

阅读[IPFS 简介](https://blog.infura.io/post/an-introduction-to-ipfs)



## 创建你的网站

在本示例中，我们将创建一个简单的网站。

[示例网站](https://squirrel.surf)


**步骤 1：** 如果你不熟悉网页设计，请先写好网站的主要内容，包括标题、正文、指向其他页面/网站的链接以及页脚。

**步骤 2：** 使用一个 [HTML 模板！](https://nicepage.com/html-templates) 按照相应位置粘贴你写好的文本。你也可以选择为网站额外创建一个 .CSS 样式表。

**步骤 3：** 保存你的目录。所有 .html 页面和图片都必须放在同一个文件夹中。



## 设置节点

从[官方网站](https://docs.ipfs.tech/install/ipfs-desktop/)下载并安装 IPFS。



### 初始化 IPFS：

如果你使用的是桌面应用程序，则无需初始化。

使用终端或命令提示符，运行命令：<mark>ipfs init </mark>。



**将网站文件夹添加到 IPFS：**

选择包含你网站文件的文件夹，然后进入 Add Folder 选项。

![](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

--

如果使用终端，运行命令：<mark>ipfs add -r "folder_name"</mark>，将整个文件夹递归添加到 IPFS。


### 在 IPFS 上固定网站：

当你的网站文件添加到 IPFS 后，你需要对其进行 **pin**，以确保它们持续在网络中可用。

--

如果使用终端，运行命令：如果使用终端，运行命令：<mark>ipfs pin add "hash"</mark>

"hash" = 你在上一步添加的文件夹的 CID。


或者，你也可以使用 [Pinata](https://pinata.cloud) 或 [Dolpin](https://dolpin.io) 等服务来固定目录

这样可以节省很多时间！

--

### 在 IPFS 上访问你的网站：

你的网站现在已经发布到 IPFS 上，可以通过该文件夹的哈希值访问。要访问你的网站，你可以前往 https://ipfs.io/ipfs/"hash"

"hash" = 文件夹的 CID。

在我们的示例中，CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System（IPNS）允许你更新与你网站关联的 IPFS CID，同时仍然提供一个静态链接。它以密钥的形式提供。

![](https://dnslink.io/assets/dns-query.a0134a75.png)

在 IPFS 桌面应用中，打开你的网站文件夹设置菜单并选择 Publish to IPNS。

![](https://i.ibb.co/Ch25dKf/IPNS.png)

密钥："k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

它也可以通过网关用于查看我们的网站：https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS Link

网站已经创建完成，现在我们需要一种方法将 URL 指向该内容。

如果你已经拥有一个网址，你可以使用 TXT 记录 "_dnslink(your domain)" 添加一条新记录。具体取决于服务提供商，它可能会自动填充。

![](https://i.ibb.co/MgRxBHj/example.png)

在你可以查看它之前，还需要等待它在网络中传播。

恭喜！你已经搭建了一个抗审查的网站。


**资源**

[IPFS 文档](https://docs.ipfs.tech)

[IPNS 文档](https://docs.ipfs.tech/concepts/ipns/)

[DNS link 文档](https://dnslink.io/#introduction)
