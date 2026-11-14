<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 在 IPFS 上发布网站

<a href="">
    <img src="/content-images/IPFS-40c2e22732.webp" alt="" width="800" height="400"/>
</a>



## IPFS 简介

IPFS（InterPlanetary File System）是一种对等网络协议和网络，旨在创建一种去中心化 [decentralised] 的文件存储与共享方式。

不同于互联网传统的客户端-服务器模式，IPFS 允许用户直接相互共享文件，而无需依赖中心化服务器来存储和分发内容。

IPFS 中的文件使用*内容寻址 [content-addressing]*进行地址标识，这意味着每个文件都会根据其内容获得唯一的哈希值或内容标识符（CID），并使用该哈希值从网络中检索文件。

IPFS 以区块（blocks）的形式存储内容，每个区块都由 CID 标识。添加文件只会将其存储在你自己的节点（node）上，不会自动复制到其他节点。请保持一份可访问的副本在线，或安排远程固定（remote pinning），以便其他读者能够检索该文件。请参阅 [IPFS 持久性](https://docs.ipfs.tech/concepts/persistence/)。

**阅读：[IPFS 简介](https://blog.infura.io/post/an-introduction-to-ipfs)**

## 创建你的网站

在本示例中，我们将创建一个简单的网站。

[示例网站](https://squirrel.surf/)

**第 1 步：**如果你不熟悉网页设计，请为你的网站编写主要内容，包括标题、正文文本、指向其他页面/网站的链接和页脚。

**第 2 步：**使用一个 [HTML 模板!](https://nicepage.com/html-templates)，并相应地粘贴你编写的文本。你也可以选择为网站创建 .CSS 样式表。

**第 3 步：**将你的主页放在网站文件夹根目录下的 `index.html` 中。同时包含其图片和 CSS，并使用 `style.css` 这样的相对路径（relative path），以便它们在 IPFS 网关（gateway）URL 下也能正常工作。

## 设置节点

[IPFS 桌面版（Desktop）](https://docs.ipfs.tech/install/ipfs-desktop/)会为您管理节点。分享网站期间，请保持其运行。

对于[命令行方式](https://docs.ipfs.tech/how-to/command-line-quick-start/)，只需初始化一次新的仓库：

```sh
ipfs init
```

然后启动节点，并保持此终端处于打开状态：

```sh
ipfs daemon
```

在第二个终端中运行其余命令。如果 IPFS Desktop 已在管理此仓库，请勿再启动第二个守护进程（daemon）。

### **将网站文件夹添加到 IPFS**：

在 IPFS Desktop 中，使用"Add Folder"（添加文件夹）选项选择包含网站文件的文件夹。

<a href="">
    <img src="/content-images/ipfs-site-folder-2c96524d98.webp" alt="" width="400" height="200"/>
</a>

–

对于命令行界面（CLI）方式，请在你的网站文件夹的上级目录中运行以下命令：

```sh
ipfs add -r folder_name
```

将 `folder_name` 替换为你的文件夹名称（名称中含有空格时需加引号）。请保存最后一行 `added ... folder_name` 中的 CID：它标识的是整个目录，而不仅仅是 `index.html`。

### 在 IPFS 上固定网站：

CLI `ipfs add` 命令默认会在本地固定（pin）导入的内容。使用以下命令检查文件夹的固定状态：

```sh
ipfs pin ls YOUR_FOLDER_CID
```

将 `YOUR_FOLDER_CID` 替换为上一步得到的 CID；输出应显示 `recursive`。固定（pinning）可保护此节点上的副本不被垃圾回收（garbage collection），但无法让已关机的计算机保持在线。若要在你的节点离线时仍保持可用，请设置[远程固定（remote pinning）](https://docs.ipfs.tech/how-to/work-with-pinning-services/)，并确认远程服务已完成固定。

### 在 IPFS 上访问你的网站：

首先通过本地网关 `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` 检查你的网站（如果你的守护进程（daemon）显示的网关端口不同，请使用该端口）。末尾的斜杠可让相对链接在该目录内正确解析。

一旦公共网关（如 `https://ipfs.io/ipfs/YOUR_FOLDER_CID/`）能够从一个可访问的节点检索到内容，它就可以提供该网站。本地预览成功并不能证明网站已可公开访问。

在我们的示例中，CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System（IPNS）允许你更新与你的网站关联的 IPFS CID，同时仍提供一个静态链接。它以密钥形式提供。


<a href="">
    <img src="/content-images/dns-query.a0134a75-9ef7817f80.webp" alt="" width="400" height="100"/>
</a>


在 IPFS 桌面应用程序中，打开网站文件夹的设置菜单并选择“发布到 IPNS”。

<a href="">
    <img src="/content-images/IPNS-2fe62cc369.webp" alt="" width="400" height="200"/>
</a>


密钥：“k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

它也可以用于通过网关查看我们的网站：https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS 链接

网站已经创建完成，现在我们需要一种将 URL 指向内容的方法。

对于 `example.com`，添加以下 DNS 记录，并将 `YOUR_FOLDER_CID` 替换为你的目录 CID：

| 类型 | 名称 | 值 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

部分 DNS 提供商会自动追加区域（zone）；在这种情况下只需输入 `_dnslink`。如果使用上面的 IPNS 名称，值也可以改为 `dnslink=/ipns/YOUR_IPNS_NAME`。参见 [DNSLink](https://docs.ipfs.tech/concepts/dnslink/)。

<a href="">
    <img src="/content-images/example-c2a9edb28b.webp" alt="" width="400" height="100"/>
</a>


DNS 传播完成后，尝试 `https://ipfs.io/ipns/example.com/`。要直接在 `https://example.com/` 上提供该网站，还需要一个支持 DNSLink 的网关以及 HTTPS 配置；仅靠 TXT 记录无法完成这些设置。请参阅[自定义域名指南](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)。

*恭喜！你现在拥有了一个抗审查网站。*

____

**资源**

[IPFS 文档](https://docs.ipfs.tech/)

[IPNS 文档](https://docs.ipfs.tech/concepts/ipns/)

[DNS 链接文档](https://dnslink.io/#introduction)
