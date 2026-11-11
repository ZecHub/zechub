<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFSでウェブサイトを公開する

![](/content-images/IPFS-40c2e22732.webp)

## IPFSの概要

IPFS（InterPlanetary File System）は、ファイルを保存・共有するための分散型の方法を作成するよう設計された、ピアツーピアのプロトコルおよびネットワークです。

従来のインターネットにおけるクライアント・サーバーモデルとは異なり、IPFSではユーザーがコンテンツの保存・配信を中央集権型サーバーに依存することなく、ファイルを直接共有できます。

IPFS内のファイルは*コンテンツアドレッシング（content-addressing）*を使用してアドレス指定されます。つまり、各ファイルにはその内容に基づく一意のハッシュ、またはコンテンツ識別子（CONTENT IDENTIFIER、CID）が付与され、このハッシュを使用してネットワークからファイルを取得します。

ユーザーがファイルをIPFSに追加すると、そのファイルはブロックと呼ばれる小さな断片に分割され、各ブロックにCIDが付与されます。これらのブロックはネットワーク内の異なるノードに保存されるため、複数のソースから容易にファイルを取得できます。

これにより冗長性と耐障害性が確保されると同時に、単一のノードが単一障害点や制御点となることを困難にします。

[IPFSの紹介](https://blog.infura.io/post/an-introduction-to-ipfs)をお読みください



## サイトの作成

この例では、シンプルなウェブサイトを作成します。

[サンプルサイト](https://squirrel.surf)


**ステップ1：** ウェブデザインに不慣れな場合は、タイトル、本文、他のページ／サイトへのリンク、フッターを含むウェブサイトの主なコンテンツを作成してください。

**ステップ2：** [HTMLテンプレート!](https://nicepage.com/html-templates)を使用し、作成したテキストを適切に貼り付けてください。必要に応じて、ウェブサイト用の.CSSスタイルシートも作成できます。

**ステップ3：** ディレクトリを保存してください。すべての.htmlページと画像は同じフォルダー内に配置する必要があります。



## ノードのセットアップ

[公式ウェブサイト](https://docs.ipfs.tech/install/ipfs-desktop/)からIPFSをダウンロードしてインストールしてください。



### IPFSの初期化：

デスクトップアプリケーションを使用している場合、初期化は必要ありません。

ターミナルまたはコマンドプロンプトを使用する場合は、次のコマンドを実行します：<mark>ipfs init </mark>。



**サイトフォルダーをIPFSに追加する：**

ウェブサイトのファイルがあるフォルダーを選択し、「フォルダーを追加」オプションに移動します。

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

ターミナルを使用する場合は、フォルダー全体を再帰的にIPFSへ追加するため、次のコマンドを実行します：<mark>ipfs add -r "folder_name"</mark>


### IPFSにサイトをピン留めする：

ウェブサイトのファイルをIPFSに追加したら、ネットワーク上で利用可能な状態を維持するために、それらを**ピン留め**する必要があります。

--

ターミナルを使用する場合は、ターミナルを使用する場合は、次のコマンドを実行します：<mark>ipfs pin add "hash"</mark>

「hash」＝前のステップで追加したフォルダーのCIDです。


また、[Pinata](https://pinata.cloud)や[Dolpin](https://dolpin.io)などのサービスを使用してディレクトリをピン留めすることもできます。

多くの時間を節約できます！

--

### IPFSでウェブサイトにアクセスする：

これでウェブサイトはIPFS上に公開され、フォルダーのハッシュを使用してアクセスできます。ウェブサイトにアクセスするには、https://ipfs.io/ipfs/"hash"にアクセスしてください。

「hash」＝フォルダーのCIDです。

この例では、CID＝「QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3」です。


## IPNS

Interplanetary Naming System（IPNS）では、ウェブサイトに関連付けられたIPFS CIDを更新しても、固定リンクを提供し続けられます。これはキーとして提供されます。

![](/content-images/dns-query.a0134a75-9ef7817f80.webp)

IPFSデスクトップアプリケーションでサイトフォルダーの設定メニューを開き、「IPNSに公開」を選択してください。

![](/content-images/IPNS-2fe62cc369.webp)

キー：「k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n」

ゲートウェイ経由でサイトを閲覧するためにも使用できます：https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n


## DNSリンク
 
サイトは作成されました。次に、URLをコンテンツに紐付ける方法が必要です。

すでにウェブアドレスを所有している場合は、TXTレコード「_dnslink(your domain)」を使用して新しいレコードを追加できます。プロバイダーによっては自動入力される場合があります。

![](/content-images/example-c2a9edb28b.webp)

閲覧できるようになるまで、ネットワーク全体に伝播するには時間がかかります。

おめでとうございます！検閲に強いウェブサイトをセットアップしました。


**リソース**

[IPFSドキュメント](https://docs.ipfs.tech)

[IPNSドキュメント](https://docs.ipfs.tech/concepts/ipns/)

[DNSリンクのドキュメント](https://dnslink.io/#introduction)
