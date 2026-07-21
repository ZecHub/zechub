<a href="https://github.com/zechub/zechub/edit/main/site/guides/Using_ZEC_Privately.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZECをプライバシー保護して使用する

#### シールド（プライベート）とトランスペアレントの違い

現在では、Zcashにはシールド（プライベート）とトランスペアレントという2つのアドレスおよび取引タイプがあります。シールドとトランスペアレントのZECの違いは非常に単純です。シールドZECはあなたの資金と取引をプライバシー保護しますが、トランスペアレントZECはビットコインのように完全に透明になります。これは、相手があなたのアドレスを知っている場合、あなたの残高やすべての取引を見ることができるということです。

人々が最初にZECを使用し始めたとき、自分がどのタイプのアドレスを使っているのか気づかないかもしれません。その理由は、すべての取引所がシールドZECおよび/またはシールドZECの引き出しをサポートしていないからです。

例えば、Coinbaseを使っていてZECを購入した場合、トランスペアレントなZECを購入し、ウォレット内のトランスペアレントアドレスにのみ引き出せるようになります。[Zodl](https://zodl.com/)のようなウォレットは、トランスペアレントアドレスに送金された資金をシールド化してこの問題を解決できますが、そのような機能があることは多くの人が知らないかもしれません。単純に言って、多くの人は自分の取引所や主なウォレットが提供する方法でZECを使用しています。

#### ZECがシールドされているか確認する

私たちはすべての人にZECを自己管理することをお勧めします。つまり、取引所からウォレットへZECを移動してください。自分がシールド（プライベート）なZECを使っているかどうかは、残高がどのアドレスにあるか見て判断できます。アドレスが始まる文字が「z」または「u1」であれば、あなたの残高はシールドされています。アドレスが始まる文字が「t」であれば、残高はトランスペアレントです。

ZECをシールドするためには一般的に2つの方法があります。

**シールド引き出しをサポートしている取引所から：**

  1. 取引所でZECを購入
  2. 取引所内で引き出しのプロセスを開始
  3. シールドZECウォレットを開き、受信アドレスが「u1」または「z」から始いていることを確認
  4. 取引所から引き出しを実行

**トランスペアレント引き出しをサポートしている取引所から：**

  1. 取引所でZECを購入
  2. 取引所内で引き出しのプロセスを開始
  3. 自動シールド機能付きのZECウォレットを開き、トランスペアレントな受信アドレスを使用
  4. 取引所から引き出しを実行
  5. 10回の確認が完了したら、トランスペアレントアドレスからシールドアドレスへZECをシールド化

取引所からZECを引き出す方法に関するチュートリアルです。これはシールド引き出しの例です。

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
トランスペアレントアドレスからシールドアドレスへZECをシールド化する方法のチュートリアルです。

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
CoinbaseでZECを購入し、Zashiに送金する方法のチュートリアルです。

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


#### 取引

ZECがシールドアドレスをサポートするウォレットに保管されていることを確認した後、そのZECを使って取引を行うかどうか決めることができます。ZECの取引は非常に簡単です。相手の希望に応じて、シールドまたはトランスペアレントアドレスどちらにもZECを送金できます。どの通貨取引でも同様ですが、データ漏洩の可能性がわずかにあることを覚えておく必要があります。ZECはデータ漏洩に対して最も効果的ですが、それゆえに気を抜いて使用するべきではありません。ZECを使って取引を行う際には以下の点に注意してください。

- シールドアドレスを明らかにすること
- シールドアドレスをtアドレスの経由（いわゆる「ミキシング」）として使用すること
- 大量のシールドからトランスペアレントへの取引を行い、その実行を明らかにすること
- 定期的に自分がどの場所でシールドZECを使用しているかを人々に知らせること

つまり、あなたのZECに対して最も良い方法は、シールドウォレットに保有し、シールドアドレス間で取引を行い、公共の場（例：カフェ）での使用には注意を払うことです。プライバシー保護には責任が伴います。

#### リソース

[Zcash取引](https://zechub.wiki/using-zcash/transactions)
