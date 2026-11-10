<a href="https://github.com/henryquincy/zechub/edit/main/site/guides/Raspberry_pi_4_Zebra_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 在 Raspberry Pi 4 上运行 Zebra 的指南

<img src="/content-images/image-2023-11-28-172907488-e7e9fd4ac5.webp" alt="raspberry pi" width="300" height="300"/>

在 Raspberry Pi 4 上运行 Zebra 节点 [node] 软件，可让您作为独立且兼容共识 [consensus] 的节点参与 Zcash 网络。本指南将带您完成在 Raspberry Pi 4 上设置并运行 Zebra 的步骤。

## 前提条件

1. Raspberry Pi 4（建议配备 2GB RAM 或更高配置）。

2. 已安装 Raspberry Pi OS（Raspbian）的 MicroSD 卡（建议 16GB 或更大容量）。

3. 稳定的互联网连接。

4. 键盘、鼠标和显示器（用于初始设置）。

5. SSH 客户端（可选，用于远程访问）。

## 安装

1. __更新系统__
   打开终端或通过 SSH 连接到 Raspberry Pi，并通过运行以下命令确保系统处于最新状态：

   __sudo apt update__

   __sudo apt upgrade__

2. __安装依赖项__
   您需要安装一些用于构建和运行 Zebra 的必要依赖项：

   __sudo apt install build-essential cmake git clang libssl-dev pkg-config__

3. __克隆 Zebra 仓库__
   打开终端，并将 Zebra 仓库克隆到 Raspberry Pi：

   __git clone https://github.com/ZcashFoundation/zebra.git__

   __cd zebra__

4. __构建 Zebra__
   要构建 Zebra，请使用以下命令：

   __cargo build --release__

   此过程可能需要一些时间。请确保 Raspberry Pi 得到充分散热，因为编译可能会产生热量。

5. __配置__
   为 Zebra 创建配置文件。您可以将默认配置作为起点：

   __cp zcash.conf.example zcash.conf__

   编辑 zcash.conf 文件以自定义节点设置。您可以指定网络、启用挖矿 [mining]、设置对等连接等。

6. __启动 Zebra__
   现在，您可以使用自定义配置启动 Zebra：

   __./target/release/zebrad -c zcash.conf__

   __git comment__ 

   此命令将启动 Zebra 节点，并开始与 Zcash blockchain 同步。

7. __监控__
   您可以通过打开 Web 浏览器并访问 __http://127.0.0.1:8233/status__. 来监控 Zebra 节点的进度和状态。

<img src="/content-images/image-2023-11-28-173024853-99540511cf.webp" alt="zebra logo" width="200" height="200"/>

## 故障排除

如果您在构建或运行 Zebra 时遇到任何问题，请查看 [Zebra 文档](https://zebra.zfnd.org/user/troubleshooting.html)，获取故障排除提示和其他信息。

请确保 Raspberry Pi 保持凉爽，因为运行节点可能会产生热量。您可能需要使用散热方案，例如风扇或散热片。

## 结论

按照本指南操作后，您应该已成功在 Raspberry Pi 4 上设置并运行 Zebra。您现在正作为独立节点为 Zcash 网络作出贡献，帮助保护 Zcash 交易 [transactions] 的隐私 [privacy]。
