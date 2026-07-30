<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# 在 Raspberry Pi 4 上运行 Zebra 指南

<img src="https://i.ibb.co/V3rjKwv/image-2023-11-28-172907488.png" alt="树莓派" width="300" height="300"/>

在 Raspberry Pi 4 上运行 Zebra 节点软件，可让你作为一个独立且与共识兼容的节点参与 Zcash 网络。本指南将逐步带你在 Raspberry Pi 4 上设置并运行 Zebra。

## 前提条件

1. Raspberry Pi 4（建议 2GB RAM 或更高）。

2. 已安装 Raspberry Pi OS（Raspbian）的 MicroSD 卡（建议 16GB 或更高）。

3. 稳定的互联网连接。

4. 键盘、鼠标和显示器（用于初始设置）。

5. SSH 客户端（可选，用于远程访问）。

## 安装

1. __更新你的系统__
   打开终端，或通过 SSH 连接到你的 Raspberry Pi，然后运行以下命令以确保系统为最新状态：

   __sudo apt update__

   __sudo apt upgrade__

2. __安装依赖项__
   你需要安装一些构建和运行 Zebra 所必需的依赖项：

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __克隆 Zebra 仓库__
   打开终端，将 Zebra 仓库克隆到你的 Raspberry Pi：

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __构建 Zebra__
   使用以下命令构建 Zebra：

   __cargo build --release__

   此过程可能需要一些时间。请确保你的 Raspberry Pi 具备良好的散热条件，因为编译会产生热量。

5. __配置__
   为 Zebra 创建一个配置文件。你可以使用默认配置作为起点：

   __cp zcash.conf.example zcash.conf__

   编辑 zcash.conf 文件以自定义节点设置。你可以指定网络、启用挖矿、设置对等节点连接等。

6. __启动 Zebra__
   现在你可以使用自定义配置启动 Zebra：

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   此命令将启动 Zebra 节点，并开始与 Zcash 区块链同步。

7. __监控__
   你可以打开网页浏览器并访问 __http://127.0.0.1:8233/status__，以监控 Zebra 节点的进度和状态。

<img src="https://i.ibb.co/BCtKrGp/image-2023-11-28-173024853.png" alt="zebra 标志" width="200" height="200"/>

## 故障排查

如果你在构建或运行 Zebra 时遇到任何问题，请查看 [Zebra 文档](https://doc.zebra.zfnd.org/docs/intro.html) 获取故障排查建议和更多信息。

请务必让你的 Raspberry Pi 保持凉爽，因为运行节点会产生热量。你可能需要使用散热方案，例如风扇或散热片。

## 结论

按照本指南操作后，你应该已经成功在 Raspberry Pi 4 上设置并运行 Zebra。你现在正作为一个独立节点为 Zcash 网络作出贡献，帮助保障 Zcash 交易的隐私性。
