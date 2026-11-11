<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="编辑页面"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy（PGP）是一款加密软件包，可通过不安全的渠道提供安全通信。PGP 结合使用加密（encryption）和数字签名（signature），以确保只有预期收件人能够阅读消息，并验证发送者确实是其所声称的身份。

## 可用工具（tools）

有许多不同的 PGP 工具可用，其中一些最受欢迎的包括：

* **[GPG](https://gpgtools.org/)**：GPG 是一种免费开源的 PGP 实现，可用于 Windows、macOS 和 Linux。
* **[PGPMail](https://www.openpgp.org/software/)**：PGPMail 是一款商业 PGP 电子邮件客户端，可用于 Windows 和 macOS。
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**：Mailvelope 是适用于 Gmail 和 Thunderbird 的免费开源 PGP 扩展程序。

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## 如何生成密钥

要使用 PGP，您需要生成一对密钥：以下是生成 PGP 密钥的方法：

1. 打开您的 PGP 软件。
2. 点击"生成密钥"按钮。
3. 输入您的姓名和电子邮件地址（address）。
4. 选择密钥长度。密钥长度越长，您的密钥就越安全。
5. 点击"生成"按钮。

您的 PGP 密钥对将会生成。

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## 如何使用 PGP 加密电子邮件

生成 PGP 密钥对后，您可以使用它来加密和解密电子邮件。要加密电子邮件，您需要知道收件人的公钥。随后，您可以使用 PGP 工具通过收件人的公钥加密电子邮件。

没有收件人私钥的任何人都无法读取加密后的电子邮件。要解密电子邮件，收件人可以使用其私钥解密该电子邮件。

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## 最佳实践

以下是使用 PGP 的一些最佳实践：

* 妥善保管您的私钥。私钥是您 PGP 密钥对中最重要的部分。如果有人获得您的私钥，他们就能解密使用您公钥加密的任何消息。

![Best Practices 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Best Practices 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* 与您信任的人分享您的公钥。您可以直接将公钥发送给他们，或将其上传到 PGP 密钥服务器。
* 为您的 PGP 密钥环使用强密码。您的 PGP 密钥环是存储 PGP 密钥的文件。使用强密码保护此文件非常重要。
* 保持您的 PGP 软件处于最新状态。PGP 软件会持续更新，以修复错误并提升安全性。保持软件最新非常重要，以确保您使用最新的安全功能。

## 如何使用 PGP 加密电子邮件

* 打开您的 PGP 软件。
* 打开您想要加密的电子邮件。
* 点击"加密"按钮。
* 输入收件人的公钥。
* 点击"加密"按钮。
* 电子邮件将被加密。

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## 如何使用 PGP 解密电子邮件

* 打开您的 PGP 软件。
* 打开加密的电子邮件。
* 点击"解密"按钮。
* 输入您的私钥。
* 点击"解密"按钮。
* 电子邮件将被解密。

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
