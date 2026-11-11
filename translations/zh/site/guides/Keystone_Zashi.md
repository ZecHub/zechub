# Keystone Zashi 用户指南

Twitter 指南：=> [Zashi x Keystone 硬件钱包集成 Twitter 指南](https://x.com/zashi_app/status/1869793574880973144) 

此集成通过支持对屏蔽 [shielded] ZEC 进行冷存储，标志着 Zcash 易用性的重大演进。Zcash 社区过去曾在其他硬件钱包平台上遭遇挫折，但 Keystone 成为了愿意突破界限、与 Electric Coin Company 一同创新的合作伙伴。Keystone 团队获得了一笔 ZCG 拨款 [grant]，以推动其负责的工作。

## Keystone X Zashi 教程

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/ktYf7josJKM"
    title="Keystone X Zashi Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

## 准备工作
[订购并接收您的 Keystone 3 Pro 或 Keystone 3](https://keyst.one) 

电池电量：确保您的 keystone 设备电池电量高于 20%。

USB 数据线或 SD 卡：

- 用于固件更新的 USB 数据线（随附）。
- 用于升级的 Micro SD 卡（容量低于 1 TB，需另行购买）。

访问 Keystone 官方网站以进行验证和固件更新。

在您的移动设备上设置 Zashi 应用。

## [分步指南（Keystone 设备）](https://keyst.one/get-started) 


**选择您的语言**
-设备验证（通过 QR）：设备验证对于检测运输过程中可能发生的污染、防止供应链攻击，以及确保已安装固件的安全至关重要。
  - 访问 Keystone 网站上的设备验证页面。
  - 点击官方网站上的扫描 QR 码。
  - 使用您的 Keystone 相机扫描网站上显示的 QR 码。
  - 您的 Keystone 屏幕上将显示一个验证码。
  - 在网站上输入此代码，以完成验证流程。

- **固件更新：**
  - 通过 MicroSD 卡更新
    - 确保您的 Keystone 钱包 [wallet] 至少有 20% 的电池电量。
    - 将 SD 卡插入您的电脑，并将其格式化为 FAT32。
    - 从 [Keystone 固件更新页面](https://keyst.one/firmware) 下载最新的 Cypherpunk 固件版本，并将 keystone3.bin 文件保存到您的 MicroSD 卡根目录。
    - 将装有固件的 SD 卡放入您的 Keystone 钱包。
    - 在您的 Keystone 钱包上访问“升级”选项，然后按照屏幕上的说明启动更新流程。
  - **通过 USB 数据线更新**
    - 如果您的固件版本低于 1.0.4，则必须先使用 MicroSD 卡进行初始更新，之后才能继续进行 USB 更新。
    - 确保您的 Keystone 钱包至少有 20% 的电池电量。
    - 点击“通过 USB”，然后使用 USB 数据线将您的 Keystone 钱包连接至电脑。点击 [批准]，以授予您的 Keystone 钱包 USB 访问权限，否则它可能仅允许充电。
    - 打开您电脑的网页浏览器，并前往 [Keystone 固件更新页面](https://keyst.one/firmware)
    - 在更新页面上，点击“安装更新”按钮，并按照提供的说明安装最新固件。
- **创建钱包：**
    - 安全密码：选择一个强 PIN 码或密码来保护您的钱包。
    - 为您的钱包命名（可选）：您可以为钱包命名以便识别，或跳过此步骤。
    - 如果您是首次设置钱包，请选择“创建新钱包”。
    - 您的设备将生成一个由 24 个单词组成的助记词 [seed phrase]。
    - 记下此助记词并妥善保管。
    - 按照屏幕上显示的顺序验证单词，以确认助记词。
- **连接 Zashi + Keystone 钱包：**
    - 在 Keystone 设备上：点击主页上的…
    - 点击“连接软件钱包”，并选择 Zashi。用于连接 Zashi 的 QR 码将出现。
    - 在 Zashi 应用中：点击 zashi 下拉菜单（屏幕左上角）。
    - 点击“连接硬件钱包”。
    - 点击“准备扫描”。
    - 扫描 Keystone 设备上显示的 QR 码。
    - 在 Zashi 应用中：点击显示的账户以确认 Keystone 钱包账户。
    - 点击屏幕底部的“连接”。


## 额外帮助

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Jr6LqtD1W0s"
    title="Connect Keystone Hardware Wallet to Zashi"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/t_OHb1KqrRg"
    title="Sign an Outgoing Transaction with Keystone"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
