<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# IPFSを使用してGithubリポジトリをホストする

## はじめに

このガイドでは、IPFS CIDを使用してホストされるGithubリポジトリのgit clone可能なURLを作成する方法について学びます。これは、地理的な地域に関係なくコンテンツの可用性を確保し、検閲に対する抵抗力を持たせ、貴重な情報を永続的なバックアップとして保存するために役立ちます！

注意: IPFSにアップロードされたデータは、*すべて*のネットワークユーザーに対して利用可能です。個人的/機密情報については、ローカルで暗号化することを検討してください。


## IPFS Kuboのインストール

[こちら](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)に提供されているインストール手順に従ってください。

この例ではLinuxを使用していますが、他のOSバージョンも利用可能です。

インストールが成功したかを確認するために "ipfs --version" を実行してください。


## リポジトリのクローン

まず、ホストしたいGitリポジトリを選択し、それをクローンします:

コマンド: "git clone https://github.com/zechub/zechub"

![](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)


次に、IPFS経由でクローンできるように準備します。

cd zechub
git update-server-info


Gitのオブジェクトを解凍:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

これにより、後でGitリポジトリを更新した際にIPFSがオブジェクトを重複排除できるようになります。


## IPFSへのアップロード

それを行った後、そのリポジトリはホスト準備ができています。残っているのはそれをIPFSに追加することだけです:

$ pwd

/code/myrepo

$ ipfs add -r .

![](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

生成されたCID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

素晴らしい！今や、あなたのリポジトリはネットワークにアップロードされました。


## IPFSを使用してクローンする

この時点で、以下のコマンドを使ってGithubリポジトリを取得できるようになります:

git clone http://ipfs.io/ipfs/"yourCID"

あるいは、ローカルのIPFSノードを使用して検索・取得することも可能です。

最終的な注意点: IPFS上のリポジトリフォルダは、実際のGithubリポジトリと同時に更新されません。定期的にフォルダを再アップロードすることをお勧めします。
