<a href="https://github.com/zechub/zechub/edit/main/site/guides/Keystone_Zashi.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Keystone Zodl（前身为 Zashi）用户指南

> 将屏蔽 ZEC 存放在冷存储中：将 Keystone 硬件钱包与 Zodl 应用（前身为 Zashi，于 2026 年 2 月更名）配对，并通过 QR 码签署交易。

## TL;DR

* Keystone 3 Pro（或 Keystone 3）搭配 Cypherpunk 固件，可作为 Zodl 的离线签名设备，让屏蔽 ZEC 存放在冷存储中。
* 开始前请准备：电量高于 20% 的设备、用于固件更新的 USB 线（或 FAT32 MicroSD 卡），以及手机上的 Zodl 应用。
* 先在 Keystone 的网站上验证设备，确认设备在运输途中未遭篡改。
* 在 Keystone 上创建钱包，并离线记下 24 个词的助记词。助记词绝不会输入到 Zodl 中。
* 连接：在 Keystone 上点击 "..." > 连接软件钱包 > Zodl，然后在 Zodl 上点击连接硬件钱包并扫描 QR 码。
* Zodl 构建每笔交易；你需要在 Keystone 屏幕上批准并签名，通过 QR 码双向扫描完成操作。

## 核心说明

硬件钱包会将你的花费密钥保存在一台从不连接互联网的独立设备上。Keystone 采用离线隔离方式：它只通过 QR 码与手机通信，不使用 Bluetooth 或 USB。

在此设置中，Zodl 负责"观察"。它会与 Zcash 网络同步，显示你的屏蔽余额并准备交易。Keystone 保存助记词并进行签名。即使手机遭到入侵，攻击者也只能看到你的余额；未经你在 Keystone 上批准，他们无法转移资金。

以下步骤介绍如何准备和验证设备、更新固件、创建钱包，以及将其连接到 Zodl。

## 概述

Twitter 指南：  => [Zodl（前身为 Zashi）x Keystone 硬件钱包集成 Twitter 指南](https://x.com/zashi_app/status/1869793574880973144) 

这项集成显著提升了 Zcash 的易用性，让屏蔽 ZEC 可以冷存储。过去，Zcash 社区在与其他硬件钱包平台合作时遇到过挫折；但 Keystone 成为愿意与 Electric Coin Company 携手突破限制、共同创新的合作伙伴。Keystone 团队获得了一笔 ZCG 拨款，用于支持他们负责的工作。

## Keystone X Zodl 教程

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zodl 教程"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 准备工作
[订购并接收你的 Keystone 3 Pro 或 Keystone 3](https://keyst.one) 

电量：确保你的 Keystone 设备电量高于 20%。

USB 线或 SD 卡：

- 用于更新固件的 USB 线（随设备附带）。
- 用于升级的 Micro SD 卡（容量小于 1 TB，需另行购买）。

请准备好 Keystone 官方网站，以便验证设备和更新固件。

在移动设备上设置 Zodl 应用。

## [分步指南（Keystone 设备）](https://keyst.one/get-started) 


**选择语言**

- **设备验证（通过 QR 码）：** 设备验证至关重要，可以检测设备在运输途中是否受到污染、防范供应链攻击，并确保已安装固件的安全。
  - 访问 Keystone 网站上的设备验证页面。
  - 点击官方网站上的扫描 QR 码。
  - 使用 Keystone 摄像头扫描网站上显示的 QR 码。
  - 验证码将显示在 Keystone 屏幕上。
  - 在网站上输入此验证码，完成验证流程。

- **固件更新：**
  - 通过 MicroSD 卡更新
    - 确保你的 Keystone 钱包电量至少为 20%。
    - 将 SD 卡插入电脑，并将其格式化为 FAT32。
    - 从 [Keystone 固件更新页面](https://keyst.one/firmware) 下载最新版本的 Cypherpunk 固件，并将 keystone3.bin 文件保存到 MicroSD 卡的根目录。
    - 将装有固件的 SD 卡插入你的 Keystone 钱包。
    - 在 Keystone 钱包上打开"升级"选项，然后按照屏幕上的说明开始更新。
  - **通过 USB 线更新**
    - 如果固件版本低于 1.0.4，必须先使用 MicroSD 卡进行首次更新，然后才能通过 USB 更新。
    - 确保你的 Keystone 钱包电量至少为 20%。
    - 点击通过 USB，然后用 USB 线将你的 Keystone 钱包连接到电脑。点击 [批准]，授予你的 Keystone 钱包 USB 访问权限，否则设备可能只允许充电。
    - 打开电脑上的网页浏览器，前往 [Keystone 固件更新页面](https://keyst.one/firmware)
    - 在更新页面上，点击安装更新按钮，并按照说明安装最新固件。
- **创建钱包：**
    - 设置安全密码：选择一个强 PIN 码或密码来保护钱包。
    - 为钱包命名（可选）：你可以为钱包命名以便识别，也可以跳过此步骤。
    - 如果是首次设置钱包，请选择创建新钱包。
    - 设备将生成 24 个词的助记词。
    - 写下助记词并妥善保管。
    - 按照屏幕上显示的顺序核对这些词，确认助记词。
- **连接 Zodl + Keystone 钱包：**
    - 在 Keystone 设备上：在主页点击 …。
    - 点击连接软件钱包，然后选择 Zodl。此时会显示用于连接到 Zodl 的 QR 码。
    - 在 Zodl 应用中：点击 Zodl 下拉菜单（位于屏幕左上角）。
    - 点击连接硬件钱包。
    - 点击准备扫描。
    - 扫描 Keystone 设备上显示的 QR 码。
    - 在 Zodl 应用中：点击显示的账户，确认 Keystone 钱包账户。
    - 点击屏幕底部的连接。


## 更多帮助

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="将 Keystone 硬件钱包连接到 Zodl"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="使用 Keystone 签署转出交易"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
