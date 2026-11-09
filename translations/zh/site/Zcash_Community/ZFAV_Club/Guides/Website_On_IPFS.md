<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 在 IPFS 上发布网站

![](/content-images/IPFS-40c2e22732.webp)

## IPFS 简介

IPFS（星际文件系统 [InterPlanetary File System]）是一种点对点 [peer-to-peer] 协议和网络，旨在创建一种去中心化 [decentralized] 的文件存储和共享方式。

与互联网传统的客户端-服务器模式不同，IPFS 允许用户直接彼此共享文件，而无需依赖中心化服务器来存储和分发内容。

IPFS 中的文件使用*内容寻址 [content-addressing]*进行地址标识，这意味着每个文件都会根据其内容获得唯一的哈希值或内容标识符 [CONTENT IDENTIFIER]（CID），并使用该哈希值从网络中检索文件。

当用户将文件添加到 IPFS 时，文件会被拆分为称为区块的小部分，每个区块都会获得一个 CID。随后，这些区块会存储在网络中的不同节点上，从而可轻松从多个来源检索该文件。

这确保了冗余性和容错性，同时也使任何单一节点难以成为单点故障或控制点。

阅读 [IPFS 简介](https://blog.infura.io/post/an-introduction-to-ipfs)



## 创建你的网站

在本示例中，我们将创建一个简单的网站。

[示例网站](https://squirrel.surf)


**第 1 步：**如果你不熟悉网页设计，请先为你的网站编写主要内容，包括标题、正文、指向其他页面/网站的链接和页脚。

**第 2 步：**使用一个 [HTML 模板!](https://nicepage.com/html-templates)，并将你编写的文本粘贴到相应位置。你也可以选择为网站创建一个 .CSS 样式表。

**第 3 步：**保存你的目录。所有 .html 页面和图片必须位于同一个文件夹中。



## 设置节点

从 [官方网站](https://docs.ipfs.tech/install/ipfs-desktop/) 下载并安装 IPFS。



### 初始化 IPFS：

如果你使用桌面应用程序，则无需初始化。

使用终端或命令提示符，运行命令：<mark>ipfs init </mark>。



**将网站文件夹添加到 IPFS**：

选择包含你的网站文件的文件夹，然后导航至“添加文件夹”选项。

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

如果使用终端，运行命令：<mark>ipfs add -r "folder_name"</mark>，以递归方式将整个文件夹添加到 IPFS。


### 在 IPFS 上固定网站：

将你的网站文件添加到 IPFS 后，你需要**固定**它们，以确保它们持续在网络中可用。

--

如果使用终端，运行命令：如果使用终端，运行命令：<mark>ipfs pin add "hash"</mark>

"hash" = 你在上一步添加的文件夹的 CID。


或者，你也可以使用 [Pinata](https://pinata.cloud) 或 [Dolpin](https://dolpin.io) 等服务固定目录。

这能节省很多时间！

--

### 在 IPFS 上访问你的网站：

你的网站现已发布在 IPFS 上，并可使用文件夹的哈希值访问。要访问你的网站，你可以访问 https://ipfs.io/ipfs/"hash"

"hash" = 文件夹的 CID。

在我们的示例中，CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

星际命名系统 [Interplanetary Naming System]（IPNS）允许你更新与你的网站关联的 IPFS CID，同时仍提供一个静态链接。它以密钥形式提供。

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

在 IPFS 桌面应用程序中，打开你的网站文件夹的设置菜单，然后选择“发布到 IPNS”。

![](/content-images/IPNS-2fe62cc369.webp)

密钥："k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

它也可用于通过网关查看我们的网站：https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS 链接
 
网站已经创建，现在我们需要一种将 URL 指向内容的方法。

如果你已经拥有一个网址，则可以使用 TXT 记录 "_dnslink(your domain)" 添加一条新记录。具体取决于提供商，它可能会自动填充。

![](/content-images/example-c2a9edb28b.webp)

在你能够查看它之前，需要等待其在网络中传播。

恭喜！你已经建立了一个抗审查网站。


**资源**

[IPFS 文档](https://docs.ipfs.tech)

[IPNS 文档](https://docs.ipfs.tech/concepts/ipns/)

[DNS 链接文档](https://dnslink.io/#introduction)
