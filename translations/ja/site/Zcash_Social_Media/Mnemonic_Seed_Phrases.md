# ゼロからゼロ知識へ: ニーモニック・シードフレーズ

**シリーズ:** Zero to Zero Knowledge

ニーモニック・シードフレーズは、暗号資産における最も重要な要素のひとつである **セルフカストディ** を支えています。  
今日は、シードフレーズがどのように生成され、ウォレットで使われるのかを学びます。

---

## ニーモニック・シードフレーズとは？

リカバリーフレーズは **BIP-39** 仕様によって定義されており、現在もっとも一般的に使われているリカバリーフレーズの形式です。

リカバリーフレーズの作成は、まず **ランダム性** を生成することから始まります。エントロピーが大きいほど、セキュリティは高くなります。**128ビット** のエントロピーは、ほとんどのユーザーにとって十分と考えられています。

![シードフレーズの概念](https://pbs.twimg.com/media/FooM3qWWACgrwzn.jpg)

初期エントロピーの長さに応じて、リカバリーフレーズの長さは **12語から24語** になります。

---

## ステップごとに見る: 12語のシードフレーズが生成される仕組み

### 1. エントロピーを生成する
まず **128ビット** のエントロピーを生成します。

### 2. チェックサムを追加する
エントロピーを **SHA256** でハッシュ化します。このハッシュの先頭数ビットがチェックサムになります。  
これにより、エントロピーに固有のフィンガープリントが与えられます。

![エントロピー + チェックサムの図](https://pbs.twimg.com/media/FooNoOEXgAAu-g6.png)

### 3. 11ビットごとの塊に分割する
合計132ビット（128ビットのエントロピー + 4ビットのチェックサム）を、11ビットずつの塊に分けます。

### 4. 単語リストに対応付ける
各11ビットの並びは、10進数（0〜2047）に変換されます。  
BIP-39の単語リストには、**2048語** がちょうど含まれています（英語、スペイン語、中国語など）。

これらの数値を使って、単語リスト内の対応する単語を見つけます。

![単語対応付けの例](https://pbs.twimg.com/media/FooN9rfXEBoQuU2.png)

**結果:** これで、安全で人間が読みやすい12語のリカバリーフレーズができました！

---

## リカバリーフレーズ -> Seed -> 支払いアドレス

リカバリーフレーズを使うことで、ウォレットは支払いアドレスや複数のウォレットアカウントを作成するための鍵を生成できます。

生成される鍵は **決定論的** です。つまり、同じ入力からは常に同じ出力が得られます。

### Seed の生成
ウォレットの seed は、ニーモニックフレーズから **Key Derivation Function (KDF)** を用いて導出されます。

- **Bitcoin** では: PBKDF2  
- **Zcash** では: Blake2b-256/512

これにより、**64バイト（512ビット）** の seed が生成されます。

![seed からマスター鍵へ](https://pbs.twimg.com/media/FooOuumXEAgcBm1.jpg)

### マスター鍵
seed は2つの32バイト列に分割されます:
- **Master Spending Key**
- **Master Chain Code**

これらは、子鍵を導出する **Hierarchical Deterministic (HD) Wallets** で使用されます。

---

## Zcash 固有の機能 (ZIP-32)

Zcash では、マスター seed を損なうことなく、サブツリーに対して **viewing authority** または **spending authority** を独立して委任できます。

**ZIP-32** は、Zcash のプライバシー機能に合わせて調整された階層的決定論的鍵生成の標準を定義しています。

**Expanded Spending Key** から、以下を導出します:
- Full Viewing Key
- Incoming Viewing Key
- 支払いアドレスのセット

異なる導出メカニズムによって、シールドプール（Sapling と Orchard）全体で送金者に渡すのに適した外部アドレスが生成されます。

![Zcash 鍵導出の階層構造](https://pbs.twimg.com/media/FooPKd4XEBUQhJ6.jpg)

Zcash はまた、Auto-Shielding のようなウォレット操作のための **内部アドレス** もサポートしています。

---

## リソース

- [ZIP-32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)  
- [Zcash プロトコル仕様 (NU5)](https://zips.z.cash/protocol/protocol.pdf)  
- [Shielded-by-default ウォレットの概要](https://zechub.wiki)

---

**ZecHub (@ZecHub) によるオリジナルスレッド**  
https://x.com/ZecHub/status/1624125037945946145

---

*このページは、ZecHub wiki のために元の Zero to Zero Knowledge スレッドをもとに作成されました。*
