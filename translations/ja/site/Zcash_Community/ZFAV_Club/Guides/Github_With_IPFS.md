<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# IPFSでGitHubリポジトリ（Repo）を提供する

## はじめに

このガイドでは、IPFS CIDを使用して提供されるGitHubリポジトリ（repository）用の、git clone可能なURLを作成する方法を学びます。これは、地理的な地域にかかわらずコンテンツの可用性、検閲耐性（censorship resistance）、および貴重な情報の永続的なバックアップを確保するうえで役立ちます。

注：IPFSにアップロードされたデータは、*すべての*ネットワーク利用者が利用できます。個人情報や機密性の高いデータは、ローカルで暗号化することをおすすめします。


## IPFS Kuboをインストールする

[こちら](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)に記載されているインストール手順に従ってください。

この例ではLinuxを使用しますが、他のOSバージョンも利用できます。

「ipfs --version」を使用して、インストールが成功したことを確認してください。


## リポジトリをクローンする

まず、ホストしたいGitリポジトリを選択し、クローンします。

コマンドを実行：「git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


次に、IPFS経由でクローンできるよう準備します。

cd zechub
git update-server-info


Gitのオブジェクトを展開します。

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

これにより、後でGitリポジトリを更新した場合に、IPFSがオブジェクトの重複を排除できるようになります。


## IPFSに追加する

ここまで完了したら、リポジトリを提供する準備ができています。あとはIPFSに追加するだけです。

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

生成されたCID：Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

すばらしいです！これでリポジトリがネットワークにアップロードされました。


## IPFSを使用してクローンする

これで、以下を使用してGitHubリポジトリを取得できるはずです。

git clone http://ipfs.io/ipfs/"yourCID"

または、ローカルのIPFSノードを使用して検索・取得することもできます。

最後に：IPFS上のリポジトリフォルダは、実際のGitHubリポジトリと同時に更新されません。定期的にフォルダを再アップロードすることをおすすめします。
