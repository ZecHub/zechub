# ワークショップ Day 3



## データ分析

* 特定のシステム、ツール、技術を使用して生データを解析し、パターンやトレンド、洞察を特定する科学。

含まれる内容：
```markdown
                     \
-> 収集         \
-> 清掃     =====  \  データ
-> 整理   =====  / 
-> 変換       /
-> 最適化        /
```




## Zcash 

* 暗号化された電子通貨。プライベートなピアツーピア決済のためにゼロ知識暗号を最初に開発した最初の暗号通貨。

note: 信頼できる正確なデータが必要な場合は、自身でフルノード [zebrad] を実行することをお勧めします。完全で堅牢なソリューションを希望する場合、z3インフラ構築 [ zebrad + zainod/lightwalletd + "ここに選ぶウォレット" ] が可能です。データはRPC（リモートプロシージャコール）を使用してアクセスします。

この仕組みの簡単なデモンストレーションについては、以下の動画をご覧ください：


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## ワークショップデモ

このワークショップではウォレットレベルからデータを収集および変換することに焦点を当てます。このレベルは、大多数の人がZcashブロックチェーンにアクセスする場所です。


### 用途例（Zkoolで指定されたアカウントのすべての取引をCSVファイルとして作成）

これは、デジタルな個人的な財務を整理・最適化する必要がある人にとって一般的なシナリオです。

#### ステップ1

Zkoolを開き、使用したいアカウントを選択します。

note: このデモではテストネットウォレットを使用します。

note2: ここではZkoolを使用していますが、エクスポート機能がある任意のウォレットでも動作します！

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### ステップ2

右上のメニューから「取引のエクスポート」を選択します。

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### ステップ3

データを変換するために使用するbashスクリプトをダウンロードします。開発者向けに、私はbashを使用しますが、これは大多数のLinuxディストリビューションで標準です。ご自身の言語を選んで使用することも可能です。

非開発者や初心者の学生であればAIを使用してください！

いくつかの例として、以下のようなプロンプトを使うことができます：

"How can I use "bash/rust/python/ ... etc." to transform CSV files"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

note: 基本的な知識は必要ですが、これらのワークショップを実施することでプロセスのフローを理解できます。

note2: AIは通常プライバシーが保証されていないため、学生として使用する際には特に注意が必要です！

#### ステップ4

スクリプトを設定し、実行します。

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### ステップ5 データの利用

LibreOfficeや任意のCSVビューアで開いて使用してください！

<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
