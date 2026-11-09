[![Edit Page](https://img.shields.io/badge/Edit-blue)](https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/2FA_Hardware_Devices.md)

# 2FA 硬件设备

数据安全（Data security）和隐私（privacy）是个人和企业都极为关注的问题。网络攻击和数据泄露正变得越来越普遍，因此必须采取积极措施来保护敏感数据并维护您的隐私。其中一项措施是使用硬件安全密钥（hardware security keys），它能为保护您的设备和数据提供额外一层防护。

## 什么是硬件安全密钥？

硬件安全密钥是一种用于双因素身份验证（2FA）的实体设备，可保护您的账户和设备。它与您的用户名和密码配合使用，以确保只有获得授权的用户能够访问您的账户和数据。

这些密钥旨在与您的用户名和密码配合使用，以确保只有获得授权的用户能够访问您的账户和数据。它们有多种形式，例如 U 盘、NFC 卡或 Bluetooth 设备。

![Hardware Security Key Example](/content-images/1dff66a4-d8e6-483f-9a1e-065d3974d665-a4c6c73e00.webp)

## 硬件安全密钥如何工作

您必须在支持此技术的网站或平台上通过硬件安全密钥启用 2FA，例如 Binance 和 Coinbase 交易所。

使用 YubiKey 等硬件安全密钥时，只需将硬件密钥插入台式机、笔记本电脑或智能手机的 USB 或 Type-C 端口，密钥便会为您完成验证。

## 使用硬件安全密钥有哪些好处？

与传统的基于密码的身份验证方法相比，硬件安全密钥具有多项优势。它们比密码更难被攻击，而密码很容易因暴力破解、社会工程或网络钓鱼攻击而泄露。安全密钥每次使用时都会生成唯一代码，使攻击者几乎不可能预测或复制该代码。它们也易于使用和配置，无需在您的设备上安装任何额外软件或驱动程序。

## 硬件安全密钥是否兼容所有设备和操作系统？

不兼容，硬件安全密钥有多种规格，可能并不兼容所有设备和操作系统。购买密钥前，请确保它与您的设备和操作系统兼容。

![Hardware Security Key Form Factors](/content-images/a830c435-ad20-4183-b381-475afe1089b3-5537cd7388.webp)

## 一把硬件安全密钥可以用于多个账户吗？

可以，一把硬件安全密钥可以用于保护不同网站和服务上的多个账户。

## 如果我丢失了硬件安全密钥会怎样？

如果您丢失了硬件安全密钥，您的账户可能会被锁定。建议准备备用密钥或替代身份验证方式，以避免这种情况。

## 2FA 硬件示例

以下是市面上一些 2FA 硬件示例。

**Yubico YubiKey 5 NFC**

![Yubico YubiKey 5 NFC](/content-images/bf1ac95e-7277-4559-b5ef-63117b66971b-3aa542aba7.webp)

YubiKey 5 NFC 由 Yubico 制造，Yubico 是许多安全密钥所使用的 FIDO U2F 开放身份验证标准的共同开发者，因此能够可靠地保护您的设备。顾名思义，它可通过 USB A 使用，也可使用适配器通过 USB C，或通过 NFC 使用。  
它开箱即兼容多项服务，包括 Google Chrome、Facebook、Dropbox、LastPass、1Password 等。YubiKey 5 小巧、耐用且轻便，甚至还具备防水功能。  
您可以按照服务说明轻松将 YubiKey 配置为第二个 U2F 因素，并在系统提示时将密钥插入 USB 插槽。轻触或按下密钥上的金色圆圈即可注册您的密钥，因此下次登录时，只需输入密码、插入密钥并轻触它即可。

**Thetis Fido U2F 安全密钥**

![Thetis Fido U2F Security Key](/content-images/b83e42e5-bba6-4175-ad6c-d64972ef54ef-a2ef17a10d.webp)

如果您正在寻找性价比最高的安全密钥，Thetis 的这款产品应该列入您的清单。它不配备 Bluetooth 功能（更昂贵的型号提供此功能），且仅支持 FIDO U2F 标准，因此不兼容 UAF 或 OTP。不过，如果您在 Windows、macOS 或 Linux 上使用 Chrome 或 Opera 浏览器，它可以提供安全的网站访问。  
这款价格实惠的安全密钥采用紧凑的折叠式设计，配有可旋转的铝制外壳，可防止连接器在携带过程中暴露并可能受损。它有三种吸引人的颜色：黑色、金色和银色。  
塑料外壳手感坚固且相对耐用，但应避免将它与重物一起放在包中。密钥上的孔洞不够大，因此可用于连接钥匙扣或挂绳的选择有限。

**CryptoTrust OnlyKey**

![CryptoTrust OnlyKey](/content-images/13be6ecc-227e-498c-8a36-6d52c023cd78-06e3e924dc.webp)

顾名思义，OnlyKey 拥有一些竞争对手所没有的巧妙功能。得益于可绕过潜入计算机的键盘记录程序的内置键盘，即使计算机或网站遭到入侵，它也能保障在线账户安全。它支持多种 2FA 方法，包括 FIDO 2 U2F、Yubico OTP 和 TOTP。  
虽然它并非面向主流用途的最佳密码管理器，但 OnlyKey 可以在一把密钥上存储 24 个 OTP 账户、24 个密码和 24 个用户名/URL。如果您不想记住多个密码，并希望由密钥为您处理，这项功能会非常方便。  
它提供加密备份、自毁功能（在一定次数的错误尝试后清除设备）以及更新固件以获取新功能的能力。不足之处在于，其用户界面远非理想。

## 将您的 2FA 硬件密钥绑定到 Google 账户

现在您已了解 2FA 硬件密钥是什么以及它们如何工作，以下是将您的密钥连接到 Google 账户的方法。

**步骤 1**  
登录您的 Gmail 账户，然后点击 **管理您的 Google 账户**

![Google Account - Manage Account](/content-images/995fc955-791a-4456-9218-7e5964da48b5-31c64640b2.webp)

**步骤 2**  
点击 **安全性**

![Google Security Settings](/content-images/246db235-6596-41ff-bd7a-f8ee4f80962b-340193c2c3.webp)

**步骤 3**  
点击 **两步验证**

![2-Step Verification Screen](/content-images/19cd202a-1a70-47e6-a02a-aa24f6e199fa-a9fcb911ce.webp)

**步骤 4**  
选择 **显示更多选项**

![Show More Options](/content-images/2ade9531-1cf6-48e8-b9a8-178d41a4cd30-b1e9ea1400.webp)

**步骤 5**  
现在选择 **安全密钥**，然后点击 **高级**

**步骤 6**  
连接您的 2FA 安全密钥

**步骤 7**  
输入您希望为该设备使用的名称，然后点击 **完成**
