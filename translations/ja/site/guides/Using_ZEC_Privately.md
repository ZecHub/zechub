<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECをプライベートに利用する

#### シールドされた（shielded、プライベート）対公開型（transparent）

現在のZcashには、シールドされたものと公開型の2種類のアドレス（address）およびトランザクション（transaction）タイプがあります。シールドされたZECと公開型の違いは非常にシンプルです。シールドされたZECは資金とトランザクションをプライベート（privacy）に保ちますが、公開型のZECはBitcoinのように完全に公開されています。つまり、誰かがあなたのアドレスを知っていれば、残高とすべてのトランザクションを閲覧できます。

初めてZECを使う人は、自分がどの種類のアドレスを使用しているのか気付かないかもしれません。これは、すべての取引所（exchange）がシールドされたZECおよび／またはシールドされたZECの出金をサポートしているわけではないためです。 

したがって、たとえば誰かがCoinbaseを利用してZECを購入する場合、公開型（transparent）のZECを購入し、ウォレット（Wallet）内の公開型アドレス（address）にZECを出金することしかできません。[Zodl](https://zodl.com/)のようなウォレットは、これを解決するために公開型アドレスへ送られた資金をシールドできますが、誰もがそれを知っているわけではありません。端的に言えば、多くの人は取引所（exchange）または主要なウォレットで許可されている方法でZECを利用しています。

#### ZECがシールドされていることを確認する

すべての人にZECを自己保管することをおすすめします。つまり、ZECを取引所からウォレットへ移動してください。シールドされた、すなわちプライベートなZECを使用しているかどうかを確認する最良の方法は、残高があるアドレスを見ることです。アドレスが「z」または「u1」で始まる場合、残高はシールドされています。アドレスが「t」で始まる場合、残高は公開型です。

通常、シールドされたZECにするには2つの方法があります。

**シールドされた**出金をサポートする取引所からの場合：

  1. 取引所でZECを購入します
  2. 取引所で出金手続きを開始します
  3. シールドされたZECウォレットを開き、受取アドレスが「u1」または「z」で始まることを確認します
  4. 取引所から出金を実行します

**公開型**出金をサポートする取引所からの場合：


  1. 取引所でZECを購入します
  2. 取引所で出金手続きを開始します
  3. 自動シールド機能を持つZECウォレットを開き、公開型の受取アドレスを使用します
  4. 取引所から出金を実行します
  5. 10回の承認を待ってから、公開型アドレスにあるZECをシールドされたアドレスへシールドします


こちらは、取引所からZECを出金する方法のチュートリアルです。これはシールドされた出金であることに注意してください。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/REUbkLzK7J4"
    title="Buy and withdraw ZEC to a shielded wallet from Gemini"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>
    

---
こちらは、公開型アドレスからシールドされたアドレスへZECをシールドする方法のチュートリアルです。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/W2msuzrxr3s"
    title="Shield your ZEC from a transparent to shielded address"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


---
こちらは、CoinbaseでZECを購入し、Zodlへ送る方法のチュートリアルです。

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Avweu5V9QRc"
    title="Coinbase + Zashi: Buy Zcash & Shield Instantly"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


#### トランザクション

ZECがシールドされたアドレスをサポートするシールドされたウォレットにあることを確認したら、そのZECでトランザクションを行うかどうかを決められます。ZECでのトランザクションは非常に簡単です。相手の希望に応じて、シールドされたアドレスまたは公開型アドレスのどちらにもZECを送れます。あらゆる金銭トランザクションと同様に、データを漏らしてしまう可能性はわずかにあります。ZECはデータ漏洩への対策に最も優れていますが、だからといって無頓着に使ってよいわけではありません。ZECでトランザクションを行う際に避けるべきことを以下に示します。

- シールドされたアドレスを公開すること
- シールドされたアドレスをtアドレスの通過地点として使用すること（いわゆる「ミキシング」）
- シールドされたアドレスから公開型アドレスへのトランザクションを大量に実行し、その実行を公開すること
- シールドされたZECをどこで使っているかを定期的に人々へ知らせること


本質的には、ZECをシールドされたウォレットに保管し、シールドされたアドレス間でトランザクションを行い、公共の場（例：コーヒーショップ）でZECをどのように使用するかに注意するのが最善です。プライバシーを確保するには、一定の責任が伴います。 

#### リソース

[Zcashトランザクション](https://zechub.wiki/using-zcash/transactions)
