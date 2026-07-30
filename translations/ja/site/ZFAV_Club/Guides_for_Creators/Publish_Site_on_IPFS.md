<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Publish_Site_on_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFS 上でサイトを公開する

<a href="">
    <img src="https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg" alt="" width="800" height="400"/>
</a>



## IPFS とは

IPFS（InterPlanetary File System）は、ファイルの保存と共有を分散化する方法を実現するために設計されたピアツーピアプロトコルおよびネットワークです。

インターネットの伝統的なクライアント-サーバー型モデルとは異なり、IPFS ではユーザーがファイルを直接お互いに共有できるようになり、中央集権的なサーバーに依存してコンテンツを保存・配布する必要がありません。

IPFS のファイルは *コンテンツアドレッシング* を使用して参照されます。これは、各ファイルがその内容に基づいて一意のハッシュまたは CONTENT IDENTIFIER（CID）が割り当てられ、このハッシュがネットワークからファイルを取得するために使用されることを意味します。

ユーザーがファイルを IPFS に追加すると、ファイルはブロックと呼ばれる小さなピースに分割され、各ブロックには CID が割り当てられます。これらのブロックはネットワーク上のさまざまなノードに保存されるため、ファイルは複数のソースから簡単に取得できます。

これにより冗長性と障害耐性が確保され、またどのノードも単一の故障点や制御ポイントになることが難しくなります。

**読む: [IPFS とは](https://blog.infura.io/post/an-introduction-to-ipfs)**

## サイトの作成

この例では、シンプルなウェブサイトを作成します。

[サンプルサイト](https://squirrel.surf/)

**ステップ1:** ネットワーク設計に不慣れな場合は、ウェブサイトの主なコンテンツを記述してください。タイトル、本文、他のページやサイトへのリンク、フッターなどを含めてください。

**ステップ2:** [HTMLテンプレート](https://nicepage.com/html-templates)を使用して、作成したテキストを貼り付けます。ウェブサイトのスタイルシート（.CSS）を作成することもオプションです。

**ステップ3:** ディレクトリを保存します。すべての .html ページと画像は同じフォルダーに配置する必要があります。

## ノードの設定

[公式サイト](https://docs.ipfs.tech/install/ipfs-desktop/)から IPFS をダウンロードしてインストールしてください。

### IPFS の初期化:

デスクトップアプリを使用している場合は、初期化を実行する必要はありません。

ターミナルまたはコマンドプロンプトを開き、以下のコマンドを実行します: ipfs init

### **サイトフォルダーを IPFS に追加**:

ウェブサイトのファイルが含まれるフォルダーを選択し、「Add Folder（フォルダーを追加）」オプションに移動してください。

<a href="">
    <img src="https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png" alt="" width="400" height="200"/>
</a>

–

ターミナルを使用している場合は、以下のコマンドを実行します: ipfs add -r folder_name でフォルダーを再帰的に IPFS に追加します。

### IPFS 上でサイトをピン留めする:

ウェブサイトのファイルが IPFS に追加された後、それらをネットワーク上に残すために **ピン留め** する必要があります。

–

ターミナルを使用している場合は、以下のコマンドを実行します: ipfs pin add **hash**

**hash** = 前のステップで追加したフォルダーの CID

または、[Pinata](https://pinata.cloud/) や [Dolpin](https://dolpin.io/) のようなサービスを使用してディレクトリをピン留めすることもできます。

これは非常に時間を節約します！

–

### IPFS 上でウェブサイトにアクセスする:

ウェブサイトは今や IPFS 上に公開されており、フォルダーのハッシュを使用してアクセスできます。ウェブサイトにアクセスするには https://ipfs.io/ipfs/**hash** にアクセスしてください。

**hash** = フォルダーの CID

この場合、CID = QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3

## IPNS

Interplanetary Naming System（IPNS）は、ウェブサイトに関連する IPFS CID を更新しながらも静的なリンクを提供できるようにするキーです。

<a href="">
    <img src="https://dnslink.io/assets/dns-query.a0134a75.png" alt="" width="400" height="100"/>
</a>

IPFS デスクトップアプリケーションのサイトフォルダー設定メニューで、**Publish to IPNS（IPNS に公開）** を選択してください。

<a href="">
    <img src="https://i.ibb.co/Ch25dKf/IPNS.png" alt="" width="400" height="200"/>
</a>

キー: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

また、このキーを使用してサイトをゲートウェイ経由で表示することもできます: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS リンク

サイトは作成されました。今度は、URL をコンテンツにポイントする方法が必要です。

すでにウェブアドレスを所有している場合は、TXTレコード _dnslink(your domain) を追加して新しいレコードを設定できます。プロバイダーによって自動で埋まる場合もあります。

<a href="">
    <img src="https://i.ibb.co/MgRxBHj/example.png" alt="" width="400" height="100"/>
</a>

ネットワークを通じて変更が反映されるまで時間がかかるため、それを確認するには少し時間がかかります。

*おめでとうございます！今やあなたは検閲に耐えるウェブサイトを持っています。*

____

**リソース**

[IPFS ドキュメンテーション](https://docs.ipfs.tech/)

[IPNS ドキュメンテーション](https://docs.ipfs.tech/concepts/ipns/)

[DNS リンクドキュメント](https://dnslink.io/#introduction)
