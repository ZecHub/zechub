<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 使用 IPFS 提供 GitHub 仓库

## 简介

在本指南中，我们将学习如何为你的 GitHub 仓库创建一个可通过 git 克隆的 URL，并使用 IPFS CID 提供访问。

这对于确保内容可用性、不受地理区域限制、具备抗审查能力，以及作为有价值信息的持久备份都很有帮助！

注意：上传到 IPFS 的数据对所有网络用户都可见。你可能希望在本地对个人/敏感数据进行加密。

## 安装 IPFS Kubo

请按照[这里](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)提供的安装说明进行操作。

本示例使用 Linux，其他操作系统版本也可用。

使用   ipfs –version   检查安装是否成功

## 克隆仓库

首先，选择一个你想要托管的 Git 仓库并克隆它：

运行命令：“git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

现在，为了让它能够通过 IPFS 被克隆。

cd zechub git update-server-info

解包 Git 对象：

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

这样做可以让 IPFS 在你之后更新 Git 仓库时对对象进行去重。

## 添加到 IPFS

完成这些步骤后，该仓库就可以准备好提供访问了。接下来只需要将其添加到 IPFS：

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

生成的 CID：Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

太棒了！现在你的仓库已经上传到网络中了。

## 使用 IPFS 克隆

现在你应该可以使用以下命令获取该 GitHub 仓库：

git clone http://ipfs.io/ipfs/yourCID

或者，你也可以使用本地 IPFS 节点进行搜索和获取。

最后说明：IPFS 上的仓库文件夹不会随着实际的 github 仓库同步更新。建议定期重新上传该文件夹。
