<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 通过 IPFS 提供 GitHub Repo

## 简介

在本指南中，我们将学习如何为通过 IPFS CID 提供服务的 GitHub 仓库 [repository] 创建一个可通过 git 克隆的 URL。这有助于确保内容无论身处何种地理区域都可用、具备抗审查性，并可作为宝贵信息的持久备份！

注意：上传到 IPFS 的数据对*所有*网络用户均可用。你可能希望在本地加密个人/敏感数据。


## 安装 IPFS Kubo

请按照[此处](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)提供的安装说明操作

在此示例中，我们使用 Linux，也可使用其他 OS 版本。

使用 "ipfs --version" 检查安装是否成功


## 克隆仓库

首先，选择一个你想托管的 Git 仓库并克隆它：

运行命令："git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


现在，使其准备好通过 IPFS 被克隆。

cd zechub
git update-server-info


解包 Git 的对象：

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

这样做将使 IPFS 在你稍后更新 Git 仓库时能够对对象进行去重。


## 添加至 IPFS

完成后，该仓库即可提供服务。剩下要做的就是将其添加到 IPFS：

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

生成的 CID：Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

太好了！现在你的仓库已上传至网络。


## 使用 IPFS 克隆

现在你应该能够使用以下命令获取 github 仓库：

git clone http://ipfs.io/ipfs/"yourCID"

或者，你可以使用本地 IPFS 节点进行搜索和获取。

最后注意：IPFS 上的 repo 文件夹不会随实际 github 仓库一同更新。建议定期重新上传该文件夹。
