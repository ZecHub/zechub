<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/IPFS_File_Sharing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# IPFSとBraveブラウザ（Browser）を使ったP2Pファイル共有

IPFSを使えば、ピアツーピア（Peer-to-Peer）方式で大容量メディアファイル（file）を共有できます。

では、何が問題なのでしょうか。IPFSゲートウェイ（gateway）は大容量ファイルでは機能せず、タイムアウトします。

**必要要件**：[IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/) + [Braveブラウザ](https://brave.com/)

要約すると、動画は最後にあります。

ZF AV Club内でこれを使って大容量メディアファイルを転送できます。楽しくてとてもクールなので、皆さん向けに文書化します！！

*さらに*、このユースケースを開発するために、Protocol LabsのIPFSチームと直接協力します。
これはdWeb Campで築いたつながりから得られた、もう1つの利点です！

受信側のマシンにIPFSがインストールされておらず、Brave以外のブラウザを使用している場合：ゲートウェイがファイルを読み込むまで待つ必要があります。*大容量ファイルでは504エラーが返されます。*

次に、元のノード（node）がオフラインになったときに単一障害点の問題が起きないよう、他の人のファイルを自分のマシンにピン留めする方法について説明します。

[この動画内の動画の共有リンクは[https://ipfs.io/ipfs/QmU8SDV1ozFf2n7FVq52jxuQ3jKjHXj48V6k4xbDqojmNy?filename=MadBitcoinsOnABoat_kaiber.mp4](https://ipfs.io/ipfs/QmU8SDV1ozFf2n7FVq52jxuQ3jKjHXj48V6k4xbDqojmNy?filename=MadBitcoinsOnABoat_kaiber.mp4)](https://cdn.discordapp.com/attachments/1154434684558770237/1154435234276835338/IPFSdesktop_getStartedbrave_ZFAV_20230921.mp4)です。

この動画内の動画の共有リンクは[https://ipfs.io/ipfs/QmU8SDV1ozFf2n7FVq52jxuQ3jKjHXj48V6k4xbDqojmNy?filename=MadBitcoinsOnABoat_kaiber.mp4](https://ipfs.io/ipfs/QmU8SDV1ozFf2n7FVq52jxuQ3jKjHXj48V6k4xbDqojmNy?filename=MadBitcoinsOnABoat_kaiber.mp4)です。
