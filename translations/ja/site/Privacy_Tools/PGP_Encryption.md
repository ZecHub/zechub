<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Pretty Good Privacy（PGP）

Pretty Good Privacy（PGP）は、安全でない通信チャネル上で安全な通信を提供する暗号ソフトウェアパッケージです。PGPは、暗号化（encryption）とデジタル署名（digital signatures）を組み合わせて使用し、意図した受信者のみがメッセージを読めること、そして送信者が本人であることを保証します。

## 利用可能なツール（Available Tools）

さまざまなPGPツールがありますが、特に人気があるものには以下があります。

* **[GPG](https://gpgtools.org/)**: GPGは、Windows、macOS、Linuxで利用できる、無料かつオープンソースのPGP実装です。
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMailは、WindowsおよびmacOSで利用できる商用PGPメールクライアントです。
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelopeは、GmailおよびThunderbird向けの無料かつオープンソースのPGP拡張機能です。

![PGP Tools](/content-images/44984a75-800a-4f7a-94a5-88827e39b431-c66ef53a2b.webp)

## 鍵の生成方法

PGPを使用するには、鍵のペアを生成する必要があります。PGP鍵の生成方法は以下のとおりです。

1. PGPソフトウェアを開きます。
2. 「鍵を生成」ボタンをクリックします。
3. 名前とメールアドレスを入力します。
4. 鍵長を選択します。鍵長が長いほど、鍵の安全性は高くなります。
5. 「生成」ボタンをクリックします。

PGP鍵ペアが生成されます。

![Generate Keys](/content-images/15721ce1-0a77-4ebe-87f4-33e1455f2a40-7699b1771d.webp)

## PGPをメールで使用する方法

PGP鍵ペアを生成したら、それを使用してメールを暗号化および復号できます。メールを暗号化するには、受信者の公開鍵を知っている必要があります。その後、PGPツールを使用して受信者の公開鍵でメールを暗号化できます。

暗号化されたメールは、受信者の秘密鍵を持たない人には読めません。メールを復号するには、受信者が自身の秘密鍵を使用してメールを復号します。

![PGP Email](/content-images/dafb761d-f399-40c9-9323-526ba3bd0bc4-98503ad98b.webp)

## ベストプラクティス

PGPを使用する際のベストプラクティスを以下に示します。

* 秘密鍵を安全に保管します。秘密鍵は、PGP鍵ペアの中で最も重要な部分です。誰かがあなたの秘密鍵を入手すると、あなたの公開鍵で暗号化されたすべてのメッセージを復号できます。

![Best Practices 1](/content-images/39a6fae4-a9a1-4061-a97c-4a9b975f6383-eced005c8b.webp)

![Best Practices 2](/content-images/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd-50ca49a070.webp)

* 公開鍵は信頼できる人と共有します。公開鍵は、直接送信するか、PGP鍵サーバーにアップロードすることで共有できます。
* PGP鍵リングには強力なパスワードを使用します。PGP鍵リングは、PGP鍵を保存するファイルです。このファイルを保護するために、強力なパスワードを使用することが重要です。
* PGPソフトウェアを最新の状態に保ちます。PGPソフトウェアは、バグの修正とセキュリティの向上のために常に更新されています。最新のセキュリティ機能を使用できるよう、ソフトウェアを最新の状態に保つことが重要です。

## PGPでメールを暗号化する方法

* PGPソフトウェアを開きます。
* 暗号化するメールを開きます。
* 「暗号化」ボタンをクリックします。
* 受信者の公開鍵を入力します。
* 「暗号化」ボタンをクリックします。
* メールが暗号化されます。

![Encrypt Email](/content-images/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e-6edd4a03ea.webp)

---

![Encryption Flow](/content-images/da1499e9-fc87-46b2-93ed-28d43cf1fd86-86fdc87d10.webp)

## PGPでメールを復号する方法

* PGPソフトウェアを開きます。
* 暗号化されたメールを開きます。
* 「復号」ボタンをクリックします。
* 秘密鍵を入力します。
* 「復号」ボタンをクリックします。
* メールが復号されます。

![Decrypt Email](/content-images/beae714c-020f-4c1e-aa4f-3dd9430670cc-1e9d38f1ef.webp)
