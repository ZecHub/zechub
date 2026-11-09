<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 通过 IPFS 提供 GitHub 仓库 (Repo)

## 简介

在本指南中，我们将学习如何为使用 IPFS CID 提供服务的 GitHub 仓库创建一个可通过 git 克隆的 URL。 

这对于确保内容可用性、不受地理区域限制、抗审查，以及作为有价值信息的持久备份非常有用！

注意：上传到 IPFS 的数据对所有网络用户均可用。您可能希望在本地加密个人/敏感数据。

## 安装 IPFS Kubo

请按照 [此处](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)提供的安装说明操作

在此示例中，我们使用 Linux，也可使用其他 OS 版本。

使用   ipfs –version 检查安装是否成功

## 克隆仓库

首先，选择一个您想要托管的 Git 仓库并克隆它：

运行命令：“git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)

现在，让它准备好通过 IPFS 被克隆。

cd zechub git update-server-info

解包 Git 对象：

![](/content-images/image-2024-04-20-175848513-2ceb90dd7b.webp)

这样做将使 IPFS 在之后更新 Git 仓库时能够去重对象。

## 添加到 IPFS

完成后，该仓库便可提供服务。接下来只需将其添加到 IPFS：

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

生成的 CID：Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

太棒了！现在您的仓库已上传至网络。

## 使用 IPFS 克隆

现在，您应该能够使用以下方式获取 GitHub 仓库：

git clone http://ipfs.io/ipfs/yourCID

或者，您可以使用本地 IPFS 节点搜索并获取该仓库。

最后说明：IPFS 上的 repo 文件夹不会随实际 github 仓库一同更新。建议定期重新上传该文件夹。
