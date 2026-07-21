# Keystone Zashi 用户指南

Twitter 指南： => [Zashi x Keystone 硬件钱包集成 Twitter 指南](https://x.com/zashi_app/status/1869793574880973144) 

这项集成通过实现受屏蔽的 ZEC 冷存储，标志着 Zcash 可用性的一次重要演进。过去，Zcash 社区在其他硬件钱包平台上曾遭遇挫折，但 Keystone 成为了一个愿意与 Electric Coin Company 一起突破边界、共同创新的合作伙伴。Keystone 团队获得了一笔 ZCG 资助，以支持他们这一侧的工作。

## Keystone X Zashi 教程

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi 教程"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 准备工作
[订购并收到你的 Keystone 3 Pro 或 Keystone 3](https://keyst.one) 

电池电量：请确保你的 keystone 设备电量高于 20%。

USB 数据线或 SD 卡：

- 用于固件更新的 USB 数据线（随附）。
- 用于升级的 Micro SD 卡（小于 1 TB，需单独购买）。

访问 Keystone 官方网站以进行验证和固件更新。

在你的移动设备上设置好 Zashi 应用。

## [分步指南（Keystone 设备）](https://keyst.one/get-started) 


**选择你的语言**
-设备验证（通过 QR）：设备验证对于检测运输过程中可能发生的污染、防止供应链攻击以及确保已安装固件的安全性至关重要。
  - 访问 Keystone 网站上的设备验证页面。
  - 在官方网站上点击 Scan QR Code。
  - 使用你的 Keystone 相机扫描网站上显示的二维码。
  - 你的 Keystone 屏幕上会显示一个验证码。
  - 在网站上输入此代码以完成验证流程。

- **固件更新：**
  - 通过 MicroSD 卡更新
    - 确保你的 Keystone 钱包至少有 20% 电量。
    - 将 SD 卡插入电脑，并将其格式化为 FAT32。
    - 从[Keystone 固件更新页面](https://keyst.one/firmware)下载最新的 Cypherpunk 固件版本，并将 keystone3.bin 文件保存到你的 MicroSD 卡根目录。
    - 将存有固件的 SD 卡插入你的 Keystone 钱包。
    - 在你的 Keystone 钱包中进入 "Upgrade" 选项，然后按照屏幕提示开始更新流程。
  - **通过 USB 数据线更新**
    - 如果你的固件版本低于 1.0.4，你需要先使用 MicroSD 卡完成初始更新，然后才能继续使用 USB 更新。
    - 确保你的 Keystone 钱包至少有 20% 电量。
    - 点击 via USB，并使用 USB 数据线将你的 Keystone 钱包连接到电脑。点击 [Approve] 授予你的 Keystone 钱包 USB 访问权限，否则它可能只允许充电。
    - 打开你电脑的网页浏览器，并前往[Keystone 固件更新页面](https://keyst.one/firmware)
    - 在更新页面上，点击 Install Update 按钮，并按照提供的说明安装最新固件。
- **创建钱包：**
    - 安全密码：选择一个强 PIN 码或密码来保护你的钱包。
    - 为你的钱包命名（可选）：你可以选择为钱包命名以便于识别，或者跳过此步骤。
    - 如果你是第一次设置钱包，请选择 Create New Wallet。
    - 你的设备将生成一个 24 个单词的助记词。
    - 请写下这组助记词并妥善保管。
    - 按照屏幕显示的顺序验证单词，以确认助记词。
- **连接 Zashi + Keystone 钱包：**
    - 在 Keystone 设备上：在主页点击 …
    - 点击 Connect Software Wallet 并选择 Zashi。用于连接 Zashi 的二维码将会显示。
    - 在 Zashi 应用中：点击 zashi 下拉菜单（屏幕左上角）
    - 点击 Connect Hardware Wallet
    - 点击 Ready to Scan
    - 扫描 Keystone 设备上显示的二维码
    - 在 Zashi 应用中：点击显示的账户，确认 Keystone 钱包账户
    - 点击屏幕底部的 Connect


## 额外帮助

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="将 Keystone 硬件钱包连接到 Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="使用 Keystone 签署一笔转出交易"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
