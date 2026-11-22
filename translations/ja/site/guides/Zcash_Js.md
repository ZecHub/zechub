# Zcash JS デベロッパーガイド

**zcash.js**（`@zcashlabs/zcash.js`）は、Zcash Labsが2026年10月26日にリリースした実験的なTypeScript/JavaScript SDKです。デベロッパーは、Node.jsおよびブラウザーからZcashネットワークと連携するウォレット（Wallet）、ライトクライアント（light client）、ダッシュボード（dashboard）、アプリケーションを構築できます。

> **ステータス**: 実験的（v0.1.1）です。永続的なNodeウォレットには現在、Linux + `flock`が必要です。ライブブラウザーでの送受信の完全な対応と、ウォレットデータベースの履歴移行は、まだ完全には認定されていません。本番環境で使用する前に、必ず公式ドキュメントを確認してください。

## SDKが提供するもの

- `createPublicClient` — ステートレスなJSON-RPCクエリーとトランザクション（transaction）の監視
- `createLightClient` — ライトウォレットのクエリーとストリーム（NodeではネイティブgRPC、ブラウザーではgRPC-Web）
- `createWalletClient` — ローカルアカウント、スキャン、提案、署名、送信、および記録された支払い（payment）の復元
- 正確な`bigint`額、ネットワーク検証、ビューイング/アドレス（address）ツール（tools）、およびPCZTユーティリティ
- バンドル済みのベースラインウォレットエンジン、ワーカー、ローカルSapling証明アセット（個別のRustインストールは不要です）

## インストール

**Node.js 22.23.4**（パッケージで固定されているバージョン）を使用してください。

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM（`package.json`内の`"type": "module"`）とともにTypeScriptを推奨します。
- ブラウザーアプリケーションは、最新のESMバンドラーで動作します。バンドラーは遅延読み込みのWASM、ワーカー、証明アセットを出力します。これらはアプリケーションとともにデプロイする必要があります。

## 最初のチェーンクエリー（ウォレットなし）

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network`オプションを省略すると、デフォルトでメインネットになります（対応するエンドポイントを指定してください）。
- 純粋なJSON-RPC用途向けに`createPublicClient`も利用できます。

## ウォレットを開く

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### ストレージオプション

| 環境     | ストレージオプション                                      |
|-----------------|-----------------------------------------------------|
| Node（永続的）  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| ブラウザー         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| 使い捨て      | `{ kind: 'memory' }`                                |

**重要なデフォルト設定**（v0.1.1時点）:

- 支出とお釣りは、デフォルトでIronwoodのみです
- 手数料（fee）ルール: ZIP-317
- 確認数: 信頼済み3 / 未信頼3
- 支払いを提案する前に、必ず`wallet.sync()`を呼び出してください

## 高レベルのウォレットワークフロー

1. ニーモニックアカウントを作成またはインポートし、署名者を接続します
2. `wallet.sync()`を呼び出します
3. 受信アドレスをリクエストします（Unified / Ironwoodを推奨します）
4. 提案を作成 → 確認 → `wallet.send()`を呼び出します
5. 確認を監視するか、再起動後の復元には記録済み操作を使用します

アプリケーションがニーモニックのバイト列を所有します。不要になったらメモリーから消去してください。すべての受取人、金額、手数料、プール（pool）、有効期限を示す、明確な承認UIを必ず提示してください。

完全に動作する例については、公式の[ウォレットのチュートリアル](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)を参照してください。

## プラットフォームに関する注意事項と現在の制限

| 機能            | Node                              | ブラウザー                          |
|-----------------------|-----------------------------------|----------------------------------|
| パッケージ               | Node 22.23.4 + ESM                | 最新のESMバンドラー + WebAssembly |
| ライトクエリー         | ネイティブgRPC                       | gRPC-Web + CORS                  |
| 永続ストレージ       | Linux + `flock`のみ              | OPFS（セキュアコンテキスト）            |
| 使い捨てストレージ    | メモリー                            | メモリー                           |

追加の制限事項:

- 永続的なNodeストレージは現在、Linuxのみです
- 管理されたシークレット保管庫、リモート証明サービス、ハードウェア署名者の統合はまだありません
- ストレージは、保存時に暗号化（encryption）されているとは**案内されていません**
- 同じウォレットストレージを複数のプロセスまたはブラウザータブから同時に開かないでください
- 必ず`await wallet.close()`でウォレットを適切に閉じてください

## 次のステップ

- 公式インストール手順と最初のリクエスト: [インストール](https://zcashlabs.github.io/zcashjs/api/installation.html)
- ウォレットを開いて設定する: [ウォレットを開く](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- 完全なワークフロー: [ウォレットのチュートリアル](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- APIリファレンス: [APIリファレンス](https://zcashlabs.github.io/zcashjs/api/reference.html)
- プラットフォームの制限: [Nodeとブラウザーのセットアップ](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## 公式リソース

- デベロッパーブック: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHubリポジトリー: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npmパッケージ: `@zcashlabs/zcash.js`


---

*このガイドは`@zcashlabs/zcash.js@0.1.1`（2026年10月）に基づいています。SDKは活発に開発中です。最新のAPIおよび制限事項については、常に公式ドキュメントを優先してください。*
