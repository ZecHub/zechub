<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) 是一个密码学软件包，用于在不安全的信道上提供安全通信。PGP 结合使用加密和数字签名，以确保只有预期接收者能够读取消息，并且发送者的身份真实可信。

## 可用工具

目前有许多不同的 PGP 工具可供使用，其中一些最受欢迎的包括：

* **[GPG](https://gpgtools.org/)**：GPG 是一个免费且开源的 PGP 实现，可用于 Windows、macOS 和 Linux。
* **[PGPMail](https://www.openpgp.org/software/)**：PGPMail 是一个商用的 PGP 电子邮件客户端，可用于 Windows 和 macOS。
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**：Mailvelope 是一个适用于 Gmail 和 Thunderbird 的免费开源 PGP 扩展。

![PGP 工具](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## 如何生成密钥

要使用 PGP，你需要生成一对密钥：以下是生成 PGP 密钥的方法：

1. 打开你的 PGP 软件。
2. 点击“Generate Key”按钮。
3. 输入你的姓名和电子邮件地址。
4. 选择密钥长度。密钥长度越长，密钥就越安全。
5. 点击“Generate”按钮。

你的 PGP 密钥对将会生成。

![生成密钥](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## 如何将 PGP 用于电子邮件

生成 PGP 密钥对后，你就可以使用它来加密和解密电子邮件。要加密一封电子邮件，你需要知道收件人的公钥。然后，你可以使用 PGP 工具通过收件人的公钥对电子邮件进行加密。

对于任何没有收件人私钥的人来说，这封加密邮件都是不可读的。要解密邮件，收件人可以使用他们的私钥来进行解密。

![PGP 电子邮件](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## 最佳实践

以下是一些使用 PGP 的最佳实践：

* 妥善保管你的私钥。私钥是 PGP 密钥对中最重要的部分。如果有人获取了你的私钥，他们就可以解密任何使用你公钥加密的消息。

![最佳实践 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![最佳实践 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* 仅与信任的人分享你的公钥。你可以通过直接发送给对方，或将其上传到 PGP 密钥服务器来共享你的公钥。
* 为你的 PGP 密钥环使用强密码。PGP 密钥环是存储 PGP 密钥的文件。使用强密码来保护该文件非常重要。
* 保持你的 PGP 软件为最新版本。PGP 软件会不断更新，以修复漏洞并提升安全性。保持软件更新非常重要，这样才能确保你使用的是最新的安全功能。

## 如何使用 PGP 加密电子邮件

* 打开你的 PGP 软件。
* 打开你想加密的电子邮件。
* 点击“Encrypt”按钮。
* 输入收件人的公钥。
* 点击“Encrypt”按钮。
* 电子邮件将被加密。

![加密电子邮件](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![加密流程](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## 如何使用 PGP 解密电子邮件

* 打开你的 PGP 软件。
* 打开已加密的电子邮件。
* 点击“Decrypt”按钮。
* 输入你的私钥。
* 点击“Decrypt”按钮。
* 电子邮件将被解密。

![解密电子邮件](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
