<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# IPFS 上にウェブサイトを公開する

![](/content-images/IPFS-40c2e22732.webp)

## IPFS とは？

IPFS（InterPlanetary File System）は、ファイルの保存と共有を行うための分散型方法を実現するためのピアツーピアプロトコルおよびネットワークです。

従来のインターネットにおけるクライアント-サーバー方式とは異なり、IPFS ではユーザーがファイルを直接共有できるようになり、中央集権的なサーバーに依存することなくコンテンツを保存・配布できます。

IPFS 上のファイルは *コンテンツアドレッシング* を使用して参照されます。つまり、各ファイルにはその内容に基づいて一意なハッシュまたは CONTENT IDENTIFIER（CID）が割り当てられ、このハッシュを使用してネットワークからファイルを取得します。

ユーザーが IPFS にファイルを追加すると、ファイルはブロックと呼ばれる小さなピースに分割され、それぞれのブロックには CID が割り当てられます。これらのブロックはネットワーク上のさまざまなノードに保存されるため、複数のソースから簡単にファイルを取得できます。

これにより冗長性や障害耐性が確保され、また、どのノードも単一の障害点または制御ポイントになることが難しくなります。

[IPFS に関する紹介](https://blog.infura.io/post/an-introduction-to-ipfs) を参照してください。


## サイトの作成

この例では、シンプルなウェブサイトを作成します。

[サンプルサイト](https://squirrel.surf)


**ステップ1:** ネットワーク設計に不慣れな場合は、ウェブサイトの主なコンテンツを記述してください。タイトル、本文、他のページやサイトへのリンク、フッターなどを含めてください。

**ステップ2:** [HTMLテンプレート](https://nicepage.com/html-templates) を使用して、作成したテキストを貼り付けます。ウェブサイトのスタイルシート（.CSS）を作成することも可能です。

**ステップ3:** ディレクトリを保存します。すべての .html ページと画像は同じフォルダ内に配置してください。


## ノードの設定

[公式サイト](https://docs.ipfs.tech/install/ipfs-desktop/) から IPFS をダウンロードしてインストールしてください。


### IPFS の初期化:

デスクトップアプリを使用している場合は、初期化する必要はありません。

ターミナルまたはコマンドプロンプトを開き、以下のコマンドを実行します: <mark>ipfs init</mark>。


**サイトフォルダを IPFS に追加する:**

ウェブサイトのファイルが含まれるフォルダを選択し、「フォルダを追加」オプションを使用してください。

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

ターミナルを使用している場合は、以下のコマンドを実行します: <mark>ipfs add -r "folder_name"</mark> でフォルダ全体を再帰的に IPFS に追加します。


### サイトを IPFS 上にピン留めする:

ウェブサイトのファイルが IPFS に追加された後、ネットワーク上での可用性を確保するために **ピン留め** する必要があります。

--

ターミナルを使用している場合は、以下のコマンドを実行します: <mark>ipfs pin add "hash"</mark>

"hash" = 前のステップで追加したフォルダの CID。

また、[Pinata](https://pinata.cloud) や [Dolpin](https://dolpin.io) のようなサービスを使用してディレクトリをピン留めすることも可能です。これは非常に時間を節約します！

--

### IPFS 上でウェブサイトにアクセスする:

ウェブサイトは現在、IPFS 上に公開されており、フォルダのハッシュを使用してアクセスできます。ウェブサイトにアクセスするには、https://ipfs.io/ipfs/"hash" にアクセスしてください。

"hash" = フォルダの CID。

この例では CID = "QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3"


## IPNS

Interplanetary Naming System（IPNS）は、ウェブサイトに関連する IPFS CID を更新しながらも静的なリンクを提供できるようにします。これは鍵として提供されます。

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFS デスクトップアプリケーションの設定メニューで、サイトフォルダを選択し、「IPNS に公開」を選択してください。

![](/content-images/IPNS-2fe62cc369.webp)

鍵: "k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n"

また、ゲートウェイ経由でサイトを表示することも可能です: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNS リンク

サイトは作成されました。今度は、URL をコンテンツにポイントする方法が必要です。

すでにウェブアドレスを所有している場合は、TXTレコード "_dnslink(your domain)" を使用して新しいレコードを追加できます。プロバイダーによって自動で埋まる場合もあります。

![](/content-images/example-c2a9edb28b.webp)

ネットワークを通じて反映されるまでに時間がかかるため、表示できるようになるには少し時間がかかります。

おめでとうございます！あなたは検閲に耐えるウェブサイトを設定しました。


**リソース**

[IPFS ドキュメント](https://docs.ipfs.tech)

[IPNS ドキュメント](https://docs.ipfs.tech/concepts/ipns/)

[DNS リンクドキュメント](https://dnslink.io/#introduction)
