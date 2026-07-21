<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/PGP_Encryption.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Pretty Good Privacy (PGP)

Pretty Good Privacy (PGP) は、不安全なチャネル上で安全な通信を提供する暗号化ソフトウェアパッケージです。PGP は、暗号化とデジタル署名の組み合わせを使用して、メッセージを意図された受信者だけが読めるようにし、送信者が本当にその人物であることを保証します。

## 利用可能なツール

多くの PGP ツールがありますが、最も人気のあるものには以下のようなものがあります：

* **[GPG](https://gpgtools.org/)**: GPG は、Windows、macOS、Linux で利用できる無料でオープンソースの PGP 実装です。
* **[PGPMail](https://www.openpgp.org/software/)**: PGPMail は、Windows および macOS で利用可能な商用の PGP 電子メールクライアントです。
* **[Mailvelope](https://www.comparitech.com/blog/information-security/pgp-encryption-gmail/)**: Mailvelope は、Gmail と Thunderbird 用の無料でオープンソースの PGP 拡張機能です。

![PGP ツール](https://github.com/ZecHub/zechub/assets/81990132/44984a75-800a-4f7a-94a5-88827e39b431)

## キーの生成方法

PGP を使用するには、キーのペアを生成する必要があります。PGP キーを生成する手順は以下の通りです：

1. PGP ソフトウェアを開きます。
2. 「キーガenerate」ボタンをクリックします。
3. お名前と電子メールアドレスを入力します。
4. キーの長さを選択します。キーの長さが長いほど、セキュリティは高くなります。
5. 「Generate（生成）」ボタンをクリックします。

PGP キーのペアが生成されます。

![キーゲネレート](https://github.com/ZecHub/zechub/assets/81990132/15721ce1-0a77-4ebe-87f4-33e1455f2a40)

## PGP を使用した電子メールの利用方法

PGP キーのペアを生成したら、それを使って電子メールを暗号化および復号化できます。電子メールを暗号化するには、受信者の公開鍵が必要です。その後、PGP ツールを使用して、受信者の公開鍵で電子メールを暗号化します。

暗号化された電子メールは、受信者の秘密鍵を持っていない人にとっては読み取ることができません。復号化するには、受信者が自分の秘密鍵を使って電子メールを復号化できます。

![PGP 電子メール](https://github.com/ZecHub/zechub/assets/81990132/dafb761d-f399-40c9-9323-526ba3bd0bc4)

## 最佳実践

PGP を使用する際のベストプラクティスは以下の通りです：

* 秘密鍵を安全に保管してください。秘密鍵は、PGP キーのペアの中で最も重要な部分です。誰かがあなたの秘密鍵を取得すると、あなたの公開鍵で暗号化されたメッセージを復号化できるようになります。

![ベストプラクティス 1](https://github.com/ZecHub/zechub/assets/81990132/39a6fae4-a9a1-4061-a97c-4a9b975f6383)

![ベストプラクティス 2](https://github.com/ZecHub/zechub/assets/81990132/6c15d6bb-556b-4ff5-b647-3363c8cbb8fd)

* 信頼できる人に自分の公開鍵を共有してください。直接送信するか、PGP キーのサーバーにアップロードして公開鍵を共有できます。
* PGP キーリングには強力なパスワードを使用してください。PGP キーリングは、PGP キーを保存するファイルです。このファイルを保護するために、強力なパスワードを使用することが重要です。
* PGP ソフトウェアを最新版に保つようにしてください。PGP ソフトウェアは、バグの修正やセキュリティの改善のために常に更新されています。最新のセキュリティ機能を使用するためには、ソフトウェアを最新版に保つことが重要です。

## PGP で電子メールを暗号化する方法

* PGP ソフトウェアを開きます。
* 暗号化したい電子メールを開きます。
* 「Encrypt（暗号化）」ボタンをクリックします。
* 受信者の公開鍵を入力します。
* 「Encrypt（暗号化）」ボタンをクリックします。
* 電子メールが暗号化されます。

![電子メールの暗号化](https://github.com/ZecHub/zechub/assets/81990132/a06cd9da-8bc8-45e0-ae2b-83e45aa8163e)

---

![暗号化フロー](https://github.com/ZecHub/zechub/assets/81990132/da1499e9-fc87-46b2-93ed-28d43cf1fd86)

## PGP で電子メールを復号化する方法

* PGP ソフトウェアを開きます。
* 暗号化された電子メールを開きます。
* 「Decrypt（復号化）」ボタンをクリックします。
* 自分の秘密鍵を入力します。
* 「Decrypt（復号化）」ボタンをクリックします。
* 電子メールが復号化されます。

![電子メールの復号化](https://github.com/ZecHub/zechub/assets/81990132/beae714c-020f-4c1e-aa4f-3dd9430670cc)
