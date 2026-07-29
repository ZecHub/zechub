<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 使用 IPFS 提供 Github 仓库

## 简介

在本指南中，我们将学习如何为你的 Github 仓库创建一个可通过 git 克隆的 URL，并使用 IPFS CID 提供服务。这对于确保内容无论在任何地理区域都可访问、具备抗审查能力，以及作为有价值信息的持久备份都非常有用！

注意：上传到 IPFS 的数据对*所有*网络用户都可用。你可能希望在本地加密个人/敏感数据。


## 安装 IPFS Kubo

按照[此处](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)提供的安装说明进行操作

在本示例中，我们使用 Linux，其他操作系统版本也可用。

使用 "ipfs --version" 检查安装是否成功


## 克隆仓库

首先，选择一个你想托管的 Git 仓库并克隆它：

运行命令："git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


现在，为了让它能够通过 IPFS 被克隆。

cd zechub
git update-server-info


解包 Git 的对象：

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

这样做可以让 IPFS 在你稍后更新 Git 仓库时对对象进行去重。


## 添加到 IPFS

完成这些操作后，该仓库就可以提供服务了。剩下要做的就是将其添加到 IPFS：

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

生成的 CID：Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

太棒了！现在你的仓库已经上传到网络中了。


## 使用 IPFS 克隆

你现在应该可以通过以下方式获取该 github 仓库：

git clone http://ipfs.io/ipfs/"yourCID"

或者，你也可以使用本地 IPFS 节点进行搜索和获取。

最后说明：IPFS 上的仓库文件夹不会随着实际的 github 仓库同步更新。建议定期重新上传该文件夹。
