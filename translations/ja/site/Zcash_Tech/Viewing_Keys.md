<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="ページを編集"/>
</a>

# Viewing Keys

Shieldedアドレスにより、ユーザーは Zcash ブロックチェーン上で、できる限り少ない情報しか明かさずに取引できます。では、shielded Zcash 取引に関する機微な情報を特定の相手に開示する必要がある場合はどうなるのでしょうか。すべての shielded アドレスには Viewing Key が含まれています。Viewing Key は [ZIP 310](https://zips.z.cash/zip-0310) で導入され、Sapling ネットワークアップグレードでプロトコルに追加されました。Viewing Key は、ユーザーが取引に関する情報を選択的に開示できるようにするため、Zcash の重要な構成要素です。

### なぜ Viewing Key を使うのか？

そもそも、なぜユーザーがこれを行いたいのでしょうか？ この件に関する Electric Coin Co. のブログより...

*- ある取引所は、顧客が shielded アドレスに ZEC を入金したことを検知したい一方で、**spend authority** キーは安全なハードウェアに保持したいと考えています。その取引所は incoming Viewing Key を生成してインターネット接続された **detection** ノードに読み込ませることができ、spending key はより安全なシステムに残しておけます。*

*- あるカストディアンは、自身の Zcash 保有状況を監査人に見える形で提供する必要があります。カストディアンは各 shielded アドレスについて full Viewing Key を生成し、そのキーを監査人と共有できます。監査人はそれらのアドレスの残高を検証し、それらのアドレスへの過去の取引およびそれらのアドレスからの過去の取引活動を確認できます。* 

*- ある取引所は、shielded アドレスから入金を行う顧客に対してデューデリジェンス確認を実施する必要がある場合があります。その取引所は、顧客の shielded アドレスの Viewing Key を顧客に要求し、この強化されたデューデリジェンス手続きの一環として、顧客の shielded 取引活動を確認するためにそれを利用できます。*

### Viewing Key の見つけ方

#### zcashd

* *./zcash-cli listaddresses* を使って、既知のすべてのアドレスを一覧表示します

* その後、UA または Sapling shielded アドレスに対して次のコマンドを実行します

  ```bash
  ./zcash-cli z_exportviewingkey "<UA or Z address>"
  ```

#### Ywallet

* 右上で「Backup」を選択し、スマートフォンで認証してから、表示された Viewing Key をそのままコピーします。

### Viewing Key の使い方

#### zcashd

* 任意の vkey または ukey に対して、次を使用します: 

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

#### ywallet

* 右上で「Account」を選択し、右下の「+」をクリックして Viewing Key を追加・インポートし、「読み取り専用」アカウントを追加します。

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="" width="200" height="280"/>
</a>


#### zcashblockexplorer.com

* ブラウザで単純に [こちら](https://zcashblockexplorer.com/vk) を開いて、結果を待つだけです！ 注意: この結果は現在 zcashblockexplorer のノード上にあるため、この情報を zcashblockexplorer.com の所有者に信頼して預けることになります

### リソース

優れた技術ではありますが、Viewing Key は必要な場合に限って使うことが推奨されます。

Viewing Key に関するこのチュートリアルを確認してください。さらに深く知りたい場合のために、以下にこの विषयに関するリソース一覧を示します。

- [ECC、Viewing Key の解説](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC、選択的開示と Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC、Zcash Viewing Key の動画プレゼンテーション](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310](https://zips.z.cash/zip-0310)
