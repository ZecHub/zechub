# Zcash ライブラリ

Zcash に関連する主要な用語、概念、リソースをまとめた包括的な用語集です。

### クイックナビゲーション
[A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m) | [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## A

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Actions</td>
        <td className="py-5 px-6 text-foreground">各 Spend と Output ごとに複数の個別証明を作成する代わりに、Orchard プロトコルではそれらを 1 つの Action に統合します。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Addresses</td>
        <td className="py-5 px-6 text-foreground">Zcash には Shielded（Z/zaddr）アドレスと Transparent（T/taddr）アドレスがあります。Unified addresses（UA）は、NU5 アップグレード以降、Z と T を置き換える形で段階的に導入されています。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Arborist Call</td>
        <td className="py-5 px-6 text-foreground">Zcash プロトコルと研究開発の最新情報を扱う隔週の通話会です。Zcash Community Forum と Discord で開催されています。[会議ノート](https://github.com/ZcashCommunityGrants/arboretum-notes) / [フォーラム告知](https://forum.zcashcommunity.com)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Auto-shielding</td>
        <td className="py-5 px-6 text-foreground">ユーザー（より正確にはそのウォレット）が、transparent アドレスから最新の shielded ZEC プールへ資金を自動的に移動できるようにします。</td>
      </tr>
    </tbody>
  </table>
</div>

## B

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Benchmarking</td>
        <td className="py-5 px-6 text-foreground">マイナーは、Zcash のマイニングに使用される各種ハードウェアの効率性に関する指標を提出できます。[こちらを見る](https://zcashbenchmarks.info)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Block</td>
        <td className="py-5 px-6 text-foreground">Block は、ネットワーク上で送信された一連のトランザクションを含む Zcash ブロックチェーン上の記録です。平均すると、およそ 75 秒ごとに新しいブロックがブロックチェーンに追加されます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Block Explorer</td>
        <td className="py-5 px-6 text-foreground">ブロックチェーン上の過去および現在のすべてのトランザクションを閲覧するためのオンラインツールです。[Zcash Block Explorer](https://zcashexplorer.app/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Blogs</td>
        <td className="py-5 px-6 text-foreground">[ZODL ブログ（旧 Electric Coin Co）](https://zodl.com/blog/) / [Zcash Foundation ブログ](https://zfnd.org/blog/) / [ZecHub ブログ](https://zechub.wiki/zechub-dao)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Blossom</td>
        <td className="py-5 px-6 text-foreground">Zcash の 3 回目の主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#blossom)</td>
      </tr>
    </tbody>
  </table>
</div>

## C

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Canopy</td>
        <td className="py-5 px-6 text-foreground">Zcash の 5 回目の主要ネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html?highlight=orchard#canopy)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Commitment Scheme</td>
        <td className="py-5 px-6 text-foreground">コミッターが短い文字列を使って多項式にコミットし、その文字列を使って検証者がコミットされた多項式の評価値の主張を確認できるようにする仕組みです。Zcash プロトコルにおける通信コストの削減に役立ちます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Community</td>
        <td className="py-5 px-6 text-foreground">[公式 Zcash Community Forum](https://forum.zcashcommunity.com) / [Zcash Community Discord](https://discord.com/channels/669694001464737815/669694001921654794) / [Zcash R&D Discord](https://discord.com/invite/6AK7keWFaK) / [Reddit](https://www.reddit.com/r/zec/) / [Telegram](https://t.me/Zcash_Community) / [Twitter](https://x.com/zcash)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Cypherpunk Zero</td>
        <td className="py-5 px-6 text-foreground">ECC、イラストレーター Stranger Wolf、Mighty Jaxx、および一部のエコシステムパートナーによるクリエイティブ・ユニバースおよび共同プロジェクトです。[Cypherpunk Zero サイト](https://halo.electriccoin.co/?utm_source=ECC&utm_medium=Website&utm_campaign=None) / [Opensea コレクション](https://opensea.io/collection/cypherpunk-zero)</td>
      </tr>
    </tbody>
  </table>
</div>

## D

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">DeFi</td>
        <td className="py-5 px-6 text-foreground">ZEC を DeFi と統合しているプロジェクト: [Maya Protocol](https://www.mayaprotocol.com/ecosystem#user-interfaces/) / [Near Intents](https://near-intents.org/) / [ZenRock](https://app.zenrocklabs.io/) / 
[ShapeShift](https://app.shapeshift.com/) / [LeoDex](https://leodex.io/) / [ThorSwap](https://app.thorswap.finance/)
</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Deshielding</td>
        <td className="py-5 px-6 text-foreground">zaddr（shielded アドレス）から taddr（transparent アドレス）へ送信されるトランザクションを指します。トランザクションの発信元は可視化されませんが、資金は公開可視の value pool に入ります。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Developer Resources</td>
        <td className="py-5 px-6 text-foreground">[開発者向けリソース](https://www.zcashcommunity.com/developers/)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Documentation</td>
        <td className="py-5 px-6 text-foreground">[公式ドキュメント](https://zcash.readthedocs.io/en/latest/)</td>
      </tr>
    </tbody>
  </table>
</div>

## E

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ECC</td>
        <td className="py-5 px-6 text-foreground">Electric Coin Company。Zcash プロトコルの中核チームで、以前は Zcash Company として知られていました。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ECDSA</td>
        <td className="py-5 px-6 text-foreground">Elliptic Curve Digital Signature Algorithm は、暗号学的に安全なデジタル署名方式です。ECDSA の署名・検証アルゴリズムは、楕円曲線上の点の乗算に依存しています。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Education</td>
        <td className="py-5 px-6 text-foreground">Zcash を解説する学習向け動画は [こちら](https://www.zcashcommunity.com/zcash-education/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Encrypted Memos</td>
        <td className="py-5 px-6 text-foreground">shielded アドレスに送られるトランザクションに付加できる追加フィールドで、支払いの受取人に表示されます。暗号化メモは送信者と受取人にのみ見えます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Equihash</td>
        <td className="py-5 px-6 text-foreground">Zcash で使用されている、メモリ指向のプルーフ・オブ・ワーク型マイニングアルゴリズムです。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Events</td>
        <td className="py-5 px-6 text-foreground">Zcash 関連イベントのカレンダーは [Luma](https://luma.com/zcash) と [Zcash Foundation](https://zfnd.org/zf-events/) で確認できます</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Exchanges</td>
        <td className="py-5 px-6 text-foreground">[Zcash をサポートする取引所一覧](https://z.cash/exchanges/)</td>
      </tr>
    </tbody>
  </table>
</div>

## F

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Fiat-Shamir</td>
        <td className="py-5 px-6 text-foreground">知識の対話型証明を、それに基づくデジタル署名へ変換する技法です。これにより、ある事実（たとえば秘密を知っていること）を、基礎となる情報を明かさずに公開証明できます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Founders Reward</td>
        <td className="py-5 px-6 text-foreground">Founders Reward はブロック報酬全体の 20 パーセントを占め、各ブロックの価値から差し引かれて、プロトコルの開発と成長を促進するために透明性をもって分配されます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Free2z</td>
        <td className="py-5 px-6 text-foreground">Zcash を活用した、匿名コンテンツとプライベート寄付のためのツールです [Free2z](https://free2z.com)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">FROST</td>
        <td className="py-5 px-6 text-foreground">Flexible Round-Optimized Schnorr Threshold 署名方式です。[研究論文](https://eprint.iacr.org/2020/852)</td>
      </tr>
    </tbody>
  </table>
</div>

## G

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Governance</td>
        <td className="py-5 px-6 text-foreground">ZIP プロセスによる決定は、Zcash 仕様書およびネットワークを動かすソフトウェアに書き込まれます。変更は、ネットワークの多数がアップグレードを採用し、コンセンサスを壊さないときにオンチェーンで承認されます。[完全なプロトコル履歴](https://zfnd.org/protocol-governance/)</td>
      </tr>
    </tbody>
  </table>
</div>

## H

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Halo</td>
        <td className="py-5 px-6 text-foreground">trusted setup を必要とせずに回路のアップグレードを可能にし、Zcash の shielded プロトコルを将来の改善や拡張に対してより機敏にします。[技術解説](https://z.cash/learn/what-is-halo-for-zcash/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">HD Wallet</td>
        <td className="py-5 px-6 text-foreground">階層的決定性ウォレットは、1 つのシードから一連の鍵ペアを生成し、利便性と管理のしやすさに加えて高い安全性を提供します。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Heartwood</td>
        <td className="py-5 px-6 text-foreground">Zcash の 4 回目の主要ネットワークアップグレードです。[詳細情報](https://z.cash/upgrade/heartwood/)</td>
      </tr>
    </tbody>
  </table>
</div>

## I

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Index</td>
        <td className="py-5 px-6 text-foreground">CoinDesk の ZCX Index は、Zcash の米ドル建て相当のリアルタイム現物レートを表します。[価格インデックス](https://www.coindesk.com/indices/zcx/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Integrations</td>
        <td className="py-5 px-6 text-foreground">複数のサードパーティプロバイダーを通じて Zcash 支払いを受け取ることができます。[決済プロセッサ](https://z.cash/zcash-for-business/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Interactive Proof System</td>
        <td className="py-5 px-6 text-foreground">計算を、Prover と Verifier という 2 者間のメッセージ交換としてモデル化する抽象機械です。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Investment</td>
        <td className="py-5 px-6 text-foreground">Zcash へのエクスポージャーを得たい機関投資家やファミリーオフィス向けに、複数の金融オプションが用意されています。[完全一覧](https://z.cash/investors/)</td>
      </tr>
    </tbody>
  </table>
</div>

## J

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">JubJub</td>
        <td className="py-5 px-6 text-foreground">zk-SNARK 回路で効率的に実装できるよう設計された楕円曲線です。</td>
      </tr>
    </tbody>
  </table>
</div>

## K

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Keystone Wallet</td>
        <td className="py-5 px-6 text-foreground">ネイティブな Zcash（Orchard shielded）対応を備えたエアギャップ型ハードウェアウォレットで、ZODL と互換性がありコールド署名に対応しています。[Keystone](https://keyst.one)</td>
      </tr>
    </tbody>
  </table>
</div>

## L

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Layer-1</td>
        <td className="py-5 px-6 text-foreground">基盤ネットワークとその基礎インフラを指します。Layer-1 ブロックチェーンは、別のネットワークを必要とせずにトランザクションを検証し、確定できます。Zcash は L1 ブロックチェーンです。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">librustzcash</td>
        <td className="py-5 px-6 text-foreground">Zcash を扱うためのすべての crate と依存関係を含む Rust ワークスペースです。[repo](https://github.com/zcash/librustzcash)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Lightwalletd</td>
        <td className="py-5 px-6 text-foreground">ライトクライアントにブロックチェーン情報を提供するステートレスサーバーです。[Lightwalletd](https://zcash.readthedocs.io/en/latest/rtd_pages/lightclient_support.html)</td>
      </tr>
    </tbody>
  </table>
</div>

## M

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Metrics</td>
        <td className="py-5 px-6 text-foreground">ネットワーク指標は [こちら](https://tokenterminal.com/explorer/projects/zcash/metrics/all) で確認できます</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Metadata</td>
        <td className="py-5 px-6 text-foreground">ユーザーの Zcash トランザクションに付随して生成されるデータです。これには、ブロック高、トランザクションバージョン、有効期限ブロック高などが含まれます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Mobile SDK</td>
        <td className="py-5 px-6 text-foreground">Android を Zcash に接続する軽量 SDK で、サードパーティ製 Android アプリが shielded トランザクションを送受信できるようにします。[Github](https://github.com/zcash/zcash-android-wallet-sdk)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Mining</td>
        <td className="py-5 px-6 text-foreground">各ブロックごとに、Zcash ネットワーク上のノードが自己調整される難易度に基づいて複雑な数学計算を行い、解を見つけることを競うプロセスです。[ガイド](https://z.cash/mining-zcash/)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Multisignature</td>
        <td className="py-5 px-6 text-foreground">資金を使用するために複数の秘密鍵署名を必要とするアドレスです。現在、マルチシグ機能は transparent アドレスでのみサポートされています。</td>
      </tr>
    </tbody>
  </table>
</div>

## N

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Nighthawk</td>
        <td className="py-5 px-6 text-foreground">Zcash 用モバイルウォレット - [Website](https://nighthawkwallet.com)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">NU5</td>
        <td className="py-5 px-6 text-foreground">Zcash の 6 回目の主要ネットワークアップグレードで、Orchard shielded pool と Unified Addresses を導入しました。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu5)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">NU6</td>
        <td className="py-5 px-6 text-foreground">Zcash の 7 回目の主要ネットワークアップグレードで、ブロック補助金を調整して Zcash Community Grants プログラムと Shielded Labs に資金を提供します。2024 年後半に有効化されました。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#nu6)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">NU7</td>
        <td className="py-5 px-6 text-foreground">今後予定されている Zcash の 8 回目の主要ネットワークアップグレードです。2026 年には ZODL を通じたコミュニティ感情調査が実施されています。さらなる shielded pool の改善とガバナンス更新が含まれる見込みです。[フォーラム議論](https://forum.zcashcommunity.com/t/nu7-sentiment-polling-questions-for-community-review-coinholder-voting-via-zodl/55713)</td>
      </tr>
    </tbody>
  </table>
</div>

## O

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Orchard Shielded Pool</td>
        <td className="py-5 px-6 text-foreground">Zcash における 3 番目の shielded pool であり、zk-SNARK 技術スタックの継続的な進化を示しています。[詳細](https://electriccoin.co/blog/explaining-halo-2/)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Overwinter</td>
        <td className="py-5 px-6 text-foreground">Zcash の 1 回目のネットワークアップグレードです。[詳細情報](https://zcash.readthedocs.io/en/latest/rtd_pages/nu_dev_guide.html#overwinter)</td>
      </tr>
    </tbody>
  </table>
</div>

## P

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Payments</td>
        <td className="py-5 px-6 text-foreground">複数の異なる決済プロバイダーを通じて、日常の購入に Zcash を利用できます。[決済アプリ](https://z.cash/pay-with-zcash/)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Peer-to-Peer Network</td>
        <td className="py-5 px-6 text-foreground">P2P ネットワークは分散化の概念に基づいています。ブロックチェーン技術の基盤となるアーキテクチャです。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Podcast</td>
        <td className="py-5 px-6 text-foreground">[Radiolab（Zcash Ceremony）](https://archive.org/details/radiolab_podcast17crypto_zcash_ceremony) / [RealVisionFinance](https://www.youtube.com/watch?v=ibA_4kwd_YI) / [EthDenver](https://www.youtube.com/watch?v=t62isi58XcQ) / [UpOnlyPodcast](https://www.youtube.com/watch?v=AjC9T938o3Q) / [Zcast en Español](https://www.youtube.com/@ZcastEsp)</td>
      </tr>
    </tbody>
  </table>
</div>

## Q

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">QR Code</td>
        <td className="py-5 px-6 text-foreground">Zcash アドレスを簡単にスキャンできるよう符号化するために使われる機械可読コードです。現代的な Zcash ウォレットでは、Unified Addresses（UA）は通常 QR コード経由で共有されます。</td>
      </tr>
    </tbody>
  </table>
</div>

## R

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
<table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Recovery Phrase</td>
        <td className="py-5 px-6 text-foreground">ウォレットのバックアップと復元に使われる、12 または 24 個の文字と数字の並びです。Zcash では、このフレーズにより spending key と Viewing Key が再生成されるため、資金回復とセキュリティにとって極めて重要です。</td>
      </tr>
       </tbody>
  </table>
</div>

## S

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Sapling</td>
        <td className="py-5 px-6 text-foreground">shielded トランザクションの効率を大幅に改善し、モバイル採用への道を開いた主要ネットワークアップグレードです。ブロック 419200 で有効化されました。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Selective Disclosure</td>
        <td className="py-5 px-6 text-foreground">shielded アドレスの所有者が、Viewing Key や支払い開示情報を第三者に選択的に共有しつつ、それ以外の人からはデータを秘匿したままにできる仕組みです。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Shielded Address</td>
        <td className="py-5 px-6 text-foreground">zaddr とも呼ばれます。z で始まります。送信者、受信者、金額、メモを zk-SNARKs によって隠します。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Shielded Transaction</td>
        <td className="py-5 px-6 text-foreground">shielded アドレス間のみで行われるトランザクションです。ブロックチェーン上では完全にプライベートです。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Sol/s</td>
        <td className="py-5 px-6 text-foreground">1 秒あたりの解数 - Equihash マイニング性能を測る単位です。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Spending Key</td>
        <td className="py-5 px-6 text-foreground">shielded アドレスから資金を使用できる秘密鍵です（残高や履歴の閲覧も可能です）。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Sprout</td>
        <td className="py-5 px-6 text-foreground">Zcash の元祖 shielded プロトコル版（2016 年開始）です。</td>
      </tr>
    </tbody>
  </table>
</div>

## T

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">TAZ</td>
        <td className="py-5 px-6 text-foreground">Testnet Zcash（価値のないテスト用通貨）。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Testnet</td>
        <td className="py-5 px-6 text-foreground">メインネットの前にアップグレードや機能をテストするための、別個のブロックチェーンです。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transaction</td>
        <td className="py-5 px-6 text-foreground">ユーザー間の支払いであり、ネットワークに送信され、最終的にブロック内で承認されます。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transaction Expiry</td>
        <td className="py-5 px-6 text-foreground">トランザクションは未承認のままだと約 25 分（20 ブロック）で失効し、資金は自動的に戻ります。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transaction Fee</td>
        <td className="py-5 px-6 text-foreground">デフォルト手数料は 0.0001 ZEC です。高い手数料ほど優先され、非常に低い手数料では遅延や失効の原因になることがあります。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transparent Address</td>
        <td className="py-5 px-6 text-foreground">taddr とも呼ばれます。t で始まります。完全に公開されています（Bitcoin のように）。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Transparent Transaction</td>
        <td className="py-5 px-6 text-foreground">transparent アドレス間のみで行われるトランザクションです - すべてが公開可視です。</td>
      </tr>
    </tbody>
  </table>
</div>

## U

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Unified Address</td>
        <td className="py-5 px-6 text-foreground">透明な支払いと shielded 支払いの両方に 1 つの文字列で対応する、現代的なアドレス形式です（NU5 で導入）。</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Upgrade Activation</td>
        <td className="py-5 px-6 text-foreground">ネットワークアップグレード（例: NU5、NU6）が自動的に有効化される特定のブロック高です。</td>
      </tr>
    </tbody>
  </table>
</div>

## V

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Viewing Key</td>
        <td className="py-5 px-6 text-foreground">資金を使用する権限なしに、shielded アドレスの残高と取引履歴を閲覧できる秘密鍵です。</td>
      </tr>
    </tbody>
  </table>
</div>

## W

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Wallet</td>
        <td className="py-5 px-6 text-foreground">秘密鍵を保管し、ZEC の送受信を可能にするソフトウェアまたはハードウェアです。現在利用可能なウォレットには、ZODL（iOS/Android）、Zingo!（モバイル/デスクトップ）、Nighthawk（Android）、YWallet、Zallet（今後登場予定）、Keystone（ハードウェア）があります。完全な一覧は [Zcash エコシステムのウォレット](https://z.cash/ecosystem/?wallets=#tag-wallets) を参照してください</td>
      </tr>
    </tbody>
  </table>
</div>

## X

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">XZC</td>
        <td className="py-5 px-6 text-foreground">一部の旧式な取引所で使用されていた Zcash の古いティッカーシンボルです。公式ティッカーは ZEC です。</td>
      </tr>
    </tbody>
  </table>
</div>

## Y

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">YWallet</td>
        <td className="py-5 px-6 text-foreground">Orchard、Sapling、および transparent アドレスをサポートする、高性能でプライバシー重視の Zcash ウォレットです。高速な同期速度で知られています。iOS と Android で利用可能です。[YWallet](https://ywallet.app)</td>
      </tr>
    </tbody>
  </table>
</div>

## Z

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">用語</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">定義</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash</td>
        <td className="py-5 px-6 text-foreground">zk-SNARKs を使用する、プライバシー重視の暗号通貨です。transparent（Bitcoin 風）な支払いと、完全に shielded な支払いを橋渡しします。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash Foundation</td>
        <td className="py-5 px-6 text-foreground">Zcash エコシステムを支援し、開発に資金を提供し、プライバシーを推進する独立した非営利団体です。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zcash Network</td>
        <td className="py-5 px-6 text-foreground">トランザクションを検証し、ブロックチェーンを維持するノードのピアツーピアネットワークです。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ZEC</td>
        <td className="py-5 px-6 text-foreground">Zcash の公式通貨コードです（一部の取引所では今も XZC と表示されます）。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zerocash</td>
        <td className="py-5 px-6 text-foreground">Zcash の基礎となった学術プロトコル（2014 年）です。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zaino</td>
        <td className="py-5 px-6 text-foreground">Zcash Foundation が構築した、lightwalletd を置き換える次世代の Zcash インデクサです。ライトクライアントがより高速かつプライベートに同期できるようにします。Zcash Z3 インフラアップグレードの一部です。</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zallet</td>
        <td className="py-5 px-6 text-foreground">Electric Coin Co / ZODL チームによる、Zaino 上に構築された今後登場予定の公式 Zcash ウォレットです。2026 年時点で Zallet Alpha は活発に開発中です。[Forum](https://forum.zcashcommunity.com/t/zcash-z3-updates-formerly-zcashd-deprecation/48965)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">Zebra</td>
        <td className="py-5 px-6 text-foreground">Zcash Foundation による Rust ベースのフルノード実装です（zcashd の代替）。本番運用可能で、現在も積極的に保守されています。[GitHub](https://github.com/ZcashFoundation/zebra)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ZIP</td>
        <td className="py-5 px-6 text-foreground">Zcash Improvement Proposal - プロトコル変更を提案し承認するために使われるコミュニティガバナンスプロセスです。[ZIP リポジトリ](https://github.com/zcash/zips)</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">ZODL</td>
        <td className="py-5 px-6 text-foreground">Electric Coin Company のコンシューマー向け製品群の新ブランド名です。これには ZODL ウォレットアプリ（旧 ECC Wallet）と、コイン保有者向け投票のための ZODL ガバナンスプラットフォームが含まれます。[zodl.com](https://zodl.com)</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">zk-SNARKs</td>
        <td className="py-5 px-6 text-foreground">Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge — Zcash の shielded トランザクションを支える暗号技術です。ある命題（たとえば有効な支出）を、いかなる秘密情報も明かさずに証明することを可能にします。</td>
      </tr>
    </tbody>
  </table>
</div>

---

**最終更新:** 2026年5月  
**貢献したいですか？** [GitHub でこのページを編集](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Zcash_Library.md)
