# Zero to Zero Knowledge: CryptoNoteプロトコル（Protocol）

**シリーズ：** Zero to Zero Knowledge

今日は興味深い内容です！  
**CryptoNote**プロトコルは、強力なオンチェーン（on-chain）のプライバシー（privacy）を実現します。本日は、その主要な機能のすべてと、複数の著名なプライバシープロジェクトによってどのように実装されてきたかを学びます。

![CryptoNote intro](/content-images/FrXr5P8WIAAvx36-88db0c8250.webp)

---

## 背景

CryptoNoteのオリジナルホワイトペーパーは、**「Nicolas van Saberhagen」**という仮名で公開されました。  

**Bytecoin**は、このプロトコルを最初に実装した暗号通貨です。現在これを利用している最も有名なプロジェクトは**Monero（XMR）**です。TurtleCoin、Aeon、その他いくつかでも使用されています。

---

## CryptoNoteの主要機能

CryptoNoteプロトコルは、主に3つの機能を提供します。

1. トランザクション（transaction）の**追跡不能性と関連付け不能（unlinkable）**
2. **公平なProof of Work**（ASIC耐性） 
3. **動的な発行量**

---

## 1. 追跡不能性 - リング署名（Ring Signatures）

追跡不能性は、主に**リング署名（Ring Signatures）**によって実現されます。

トランザクションを送信する際、実際の公開鍵は、同じコイン額を含む複数のおとり鍵（「リング」）と混合されます。これにより、実際にコインを送った人物を特定することが極めて困難になります。

**リングサイズ**は匿名性セットに大きく影響します。リングが大きいほど、より優れたプライバシーが得られます。

![Ring Signatures explanation](/content-images/FrXteGHXgAANE0F-f11593a0d9.webp)

**Zcashとの比較**：  
Zcashの匿名性セットは、特定のシールドされた（shielded）プール（pool）で*これまでに*行われたトランザクションの総数です（一般的なCryptoNoteのリングサイズよりはるかに大きいです）。

---

## Ring CT（コンフィデンシャル・トランザクション）

**Ring CT**モデルは、CryptoNoteベースのコインにおけるプライバシーを大幅に改善しました。

Ring CTは送信者を隠すだけでなく、送信者と受取人の間の**トランザクション額も難読化します**。

![Ring CT diagram](/content-images/FrXuivgWYAAze7B-260071c1b3.webp)

以下を使用します。
- 楕円曲線暗号
- ペダーセン・コミットメント
- 準同型暗号化（encryption）

**Proofs**は、実際の値を**明らかにせずに**、金額が0より大きく有効な範囲内にあることを示すために使用されます。

**ステルスアドレス（Stealth Addresses）**も、受取人向けに1回限りの使用アドレスを追加します。

![Stealth Addresses + Proofs](/content-images/FrXut5aWAAMhuRb-f3ce8ea3fd.webp)

---

## 2. 公平なProof of Work（ePoW）

CryptoNoteは、ASICへの耐性を持つことで、より公平なマイニング（mining）システムの構築を目指しています。

これは、メモリ負荷の高い関数である**CryptoNight**アルゴリズムを使用します。BitcoinのSHA256とは異なり、CryptoNightはCPU、GPU、ASICマイナー（miner）間の差を縮めるよう設計されています。

**CryptoNightの手順：**
1. 擬似ランダムデータで大きなメモリ領域（スクラッチパッド）を初期化する
2. スクラッチパッド上で多数の読み書き操作を実行する
3. スクラッチパッド全体をハッシュ化して最終値を生成する

![CryptoNight mining](/content-images/FrXvNs3XsAA37LG-5779657f5c.webp)

（注：Moneroはその後、CryptoNightから他のアルゴリズムへ移行しています。）

---

## 3. 動的な発行量

CryptoNoteは、Bitcoinのような突発的な半減期（halving）イベントではなく、**滑らかに減少するブロック（block）報酬**を使用します。

これにより、時間の経過に伴ってはるかに滑らかな発行曲線が作られます。

![Dynamic emission curve](/content-images/FrXv8wpXoAEjUxW-e2bbaebced.webp)

**Zcashとの関連：**  
Zcashのdeveloperは、将来的に、場合によっては「Zcash Posterity Fund」を通じて、より滑らかな発行曲線を実装することについて議論してきました。

---

## 結論

CryptoNoteは、オンチェーンのプライバシーに対する強力かつ実戦で検証されたアプローチであることを証明してきました。その多くの革新は、より広いプライバシーコインのエコシステムに影響を与えてきました。

一部の研究者は、CryptoNoteの機能が最終的にトラストレスなゼロ知識（zero-knowledge）のシールドされたプールと組み合わせられる可能性があると考えています。

---

**ZecHub（@ZecHub）によるオリジナルスレッド**  
https://x.com/ZecHub/status/1636473585781948416

---

*このページは、ZecHub wiki向けに、オリジナルのZero to Zero Knowledgeスレッドから作成されました。*
