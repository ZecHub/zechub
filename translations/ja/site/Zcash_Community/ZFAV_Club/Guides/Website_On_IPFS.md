<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Website_On_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFSでウェブサイトを公開する

![](/content-images/IPFS-40c2e22732.webp)

## IPFSの概要

IPFS（InterPlanetary File System）は、ファイルを保存・共有するための分散型の方法を作成するよう設計された、ピアツーピアのプロトコルおよびネットワークです。

従来のインターネットにおけるクライアント・サーバーモデルとは異なり、IPFSではユーザーがコンテンツの保存・配信を中央集権型サーバーに依存することなく、ファイルを直接共有できます。

IPFS内のファイルは*コンテンツアドレッシング（content-addressing）*を使用してアドレス指定されます。つまり、各ファイルにはその内容に基づく一意のハッシュ、またはコンテンツ識別子（CONTENT IDENTIFIER、CID）が付与され、このハッシュを使用してネットワークからファイルを取得します。

IPFSは、コンテンツをCIDで識別されるブロックとして保存します。ファイルを追加すると、そのファイルは自分のノードに保存されますが、他のノードに自動的にコピーされるわけではありません。他の読者がファイルを取得できるように、アクセス可能なコピーをオンラインに保つか、リモートピン留め（Remote Pinning）を手配してください。詳しくは[IPFSの永続性（Persistence）](https://docs.ipfs.tech/concepts/persistence/)をご覧ください。

[IPFSの紹介](https://blog.infura.io/post/an-introduction-to-ipfs)をお読みください



## サイトの作成

この例では、シンプルなウェブサイトを作成します。

[サンプルサイト](https://squirrel.surf)


**ステップ1：** ウェブデザインに不慣れな場合は、タイトル、本文、他のページ／サイトへのリンク、フッターを含むウェブサイトの主なコンテンツを作成してください。

**ステップ2：** [HTMLテンプレート!](https://nicepage.com/html-templates)を使用し、作成したテキストを適切に貼り付けてください。必要に応じて、ウェブサイト用の.CSSスタイルシートも作成できます。

**ステップ3：** ホームページはサイトフォルダのルートにある`index.html`に配置してください。画像やCSSも含め、`style.css`のような相対パスを使用することで、IPFSゲートウェイ（Gateway）URLでも正しく動作するようにします。

## ノードのセットアップ

[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) がノード（Node）を自動で管理します。サイトを共有している間は、起動したままにしておいてください。

[コマンドライン（Command-line）での方法](https://docs.ipfs.tech/how-to/command-line-quick-start/)では、最初に一度だけ新しいリポジトリ（Repository）を初期化してください：

```sh
ipfs init
```

次に、ノードを起動し、このターミナルを開いたままにしてください。

```sh
ipfs daemon
```

残りのコマンドは2つ目のターミナル（Terminal）で実行してください。IPFS Desktopがすでにこのリポジトリ（Repository）を管理している場合は、2つ目のデーモン（Daemon）を起動しないでください。

**サイトフォルダーをIPFSに追加する：**

IPFS Desktopで、「フォルダを追加」（Add Folder）オプションを使い、ウェブサイトのファイルが入ったフォルダを選択します。

![](/content-images/ipfs-site-folder-2c96524d98.webp)

--

CLIを使う場合は、サイトフォルダの親ディレクトリで次のコマンドを実行してください：

```sh
ipfs add -r folder_name
```

`folder_name` をご自身のフォルダー名に置き換えてください（スペースを含む名前は引用符で囲んでください）。最後の `added ... folder_name` 行に表示される CID を保存してください。この CID は `index.html` だけでなく、ディレクトリ全体を識別します。

### IPFSにサイトをピン留めする：

CLI の `ipfs add` コマンドは、インポートしたコンテンツをデフォルトでローカルにピン留め（Pin）します。フォルダーのピン留めは次のコマンドで確認できます：

```sh
ipfs pin ls YOUR_FOLDER_CID
```

`YOUR_FOLDER_CID` を前のステップで得た CID に置き換えてください。出力には `recursive` と表示されるはずです。ピン留め（Pinning）は、このノードが持つコピーをガベージコレクション（Garbage Collection）から保護しますが、電源を切ったコンピューターをオンラインに保つわけではありません。ノードがオフラインの間も利用できるようにするには、[リモートピン留め（Remote Pinning）](https://docs.ipfs.tech/how-to/work-with-pinning-services/)を設定し、リモートサービスがピン留めを完了したことを確認してください。

### IPFSでウェブサイトにアクセスする：

まず、ローカルゲートウェイ `http://127.0.0.1:8080/ipfs/YOUR_FOLDER_CID/` でサイトを確認してください（デーモンが別のゲートウェイポートを表示している場合は、そのポートを使用してください）。末尾のスラッシュを付けることで、相対リンクがディレクトリ内で正しく解決されます。

`https://ipfs.io/ipfs/YOUR_FOLDER_CID/`などのパブリックゲートウェイ（Public Gateway）は、到達可能なノードからコンテンツを取得できるようになれば、それを配信できます。ローカルでのプレビューが成功しても、一般に公開されていることの証明にはなりません。

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

`example.com`の場合は、次のDNSレコードを追加し、`YOUR_FOLDER_CID`をご自身のディレクトリCIDに置き換えてください：

| タイプ | 名前 | 値 |
|---|---|---|
| TXT | `_dnslink.example.com` | `dnslink=/ipfs/YOUR_FOLDER_CID` |

DNSプロバイダー（DNS provider）によっては、ゾーンが自動的に付加される場合があります。その場合は `_dnslink` のみを入力してください。上記の IPNS 名を使用している場合は、値を `dnslink=/ipns/YOUR_IPNS_NAME` にすることもできます。[DNSLink](https://docs.ipfs.tech/concepts/dnslink/) をご参照ください。

![](/content-images/example-c2a9edb28b.webp)

DNSの反映後、`https://ipfs.io/ipns/example.com/`をお試しください。`https://example.com/`でサイトを直接配信するには、DNSLinkに対応したゲートウェイとHTTPSの設定も必要です。TXTレコードだけではこれらは設定されません。[カスタムドメインガイド](https://docs.ipfs.tech/how-to/websites-on-ipfs/custom-domains/)に従ってください。

おめでとうございます！検閲に強いウェブサイトをセットアップしました。


**リソース**

[IPFSドキュメント](https://docs.ipfs.tech)

[IPNSドキュメント](https://docs.ipfs.tech/concepts/ipns/)

[DNSリンクのドキュメント](https://dnslink.io/#introduction)
