# Zcash Network Upgrades 

長年にわたり、Zcash はプロトコルに重要な変更と改善を導入してきました。ここでは、それらのアップグレードを一つひとつ見ていきます。

[OverWinter:](https://bitzecbzc.github.io/blog/overwinter/index.html) ブロック347500で有効化され、2018年6月26日に採掘されました。Overwinter は、初回ローンチ後に行われた Zcash 初のネットワークアップグレードでした。Overwinter の主な目的は、将来のネットワークアップグレードに向けてプロトコルを強化することでした。Overwinter の中核には、ネットワークアップグレード時のリプレイ保護、バージョニング、透明トランザクションのパフォーマンス向上、そしてトランザクション有効期限という新機能が含まれています。


[Sapling:](https://coinbureau.com/analysis/zcash-sapling-upgrade/) ブロック419200で有効化され、2018年10月29日に採掘されました。これは Zcash ネットワークにおける2度目の大規模かつ印象的なアップグレードであり、主にシールドトランザクション向けの zk-SNARKs の効率向上に焦点を当てていました。Sapling のリリース当時、zk-SNARKs をめぐっては、アップグレード性の課題、実装の複雑さ、trusted setup 要件など、いくつもの問題が立ちはだかっていました。幸いにも、Sapling は zk-SNARK proof 作成の効率を高め、この暗号資産の採用可能性を広げました。その恩恵を私たちは今日享受しています！ Sapling で構想されたもう一つの注目すべき取り組みは、（公開パラメータ生成セレモニー）であり、これもまた Zcash チームが改善を目指していたものでした。 


[Zcash Blossom:](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/) ブロック653600で有効化され、2019年12月11日に採掘されました。この重要なネットワークアップグレードは、ブロック時間を約75秒へと半減させることで、スケーラビリティとユーザー体験を向上させるために設計されました。その影響はどうだったのでしょうか？ トランザクション承認はより速くなり、ネットワークスループットは2倍になり、トランザクション手数料は低コストになりました。Blossom アップグレードは、セキュリティと信頼性に対する高い基準を維持しながら、ネットワーク容量を増やすために Zcash ネットワークが実践的なエンジニアリング上の判断を下せることを即座に示しました。 


[HeartWood:](https://electriccoin.co/blog/introducing-heartwood/) ブロック903000で有効化され、2020年7月16日に採掘されました。Heartwood の唯一の目的は、マイナーがシールドアドレスで報酬を受け取れる shielded Coinbase を可能にすることで、より多くのサードパーティ統合と強化されたプライバシーを実現することです。さらに、Heartwood は、ネットワークの分散化と相互運用性の向上にも支えられています。Heartwood アップグレードでは Flyclient も統合され、これにより軽量クライアントがトランザクションを効率的に検証できるようになり、スケーラビリティとサードパーティ統合が改善されました。さらに触れておくべき点として、ZIP 213 として知られる shielded Coinbase は、Coinbase 資金をシールドされた Sapling アドレスへ採掘できるよう、Zcash のコンセンサスルールを変更することを目指しています。Sapling アップグレード以前は、シールドトランザクションの作成に大量のメモリと CPU リソースを必要としたため、shielded Coinbase は実現不可能でした。


[Canopy:](https://youtu.be/R8O1SZMfESM?si=qoBL1dBp4E_af-eM) ブロック1046400で有効化され、2020年11月18日に採掘されました。このアップグレードは Electric Coin Co (ECC) と Zcash Foundation の両方によって支えられていました。Canopy は創業者報酬の終了を示し、新たな資金調達メカニズム（Zcash development fund）が導入され、新しいガバナンスモデルが Zcash エコシステムへの継続的な資金供給を支えました。Canopy では、今後4年間のための新しい開発基金が設立されます。採掘報酬の80%はマイナーに渡ります。残りの20%は、新たな Major Grants Fund（8%）、Electric Coin Co（7%）、そして Zcash Foundation（5%）に分配されます。‘canopy’ という名称は、プライバシーと分散化という原則に忠実であり続けながら、持続可能で繁栄するエコシステムを構築するという Zcash の使命を反映しています。


[NU5:](https://electriccoin.co/blog/nu5-proposed-features/) ブロック1687104で有効化され、2022年5月31日に採掘されました。Zcash Network Upgrade 5 は、2016年の誕生以来、この暗号資産にとって重要な節目の幕開けを示すものであることは特筆に値します。Zcash における6回目の主要アップグレードとして、NU5 では Orchard shielded protocol、Unified Address、そして Halo proving system が導入されました。Zcash の NU5 アップグレードは、trusted setup を排除し、プロトコル基盤の暗号技術の安全性を向上させるために構築された zk-SNARK technology stack の継続的な進化でもあります。NU5 は ECC と Zcash Foundation によっても支持されています。 


[NU6:](https://zips.z.cash/zip-0253) NU6 では、新しい Zcash development fund（Hybrid Deferred Dev Fund から非直接資金調達モデルへの移行）が実装され、その後、将来の分散型助成金資金のために発行量の一部を留保するロックボックスが設けられます。これらの資金の解放は、今後 Zcash コミュニティによって決定される仕組みにのみ委ねられます。NU6 の使命は、ブロック補助金を減らし、透明性を高めつつプライバシーを強化するため、ロックボックス機構を通じて分散型の資金調達モデルを確立することです。

[NU6.2:](https://zips.z.cash/zip-0257) NU6.2 ネットワークアップグレードでは Orchard shielded protocol が再有効化され、元の Orchard ルールに対して次の2つのコンセンサス変更が加えられます。

* Orchard Action circuit の variable-base scalar multiplication gadget が修正され、soundness vulnerability が解消されます。これにより Orchard verifying key が変更されます。NU6.2 より前の Action proofs は履歴上の（安全でない）verifying key でのみ検証され、NU6.2 以降の proofs は修正後のものの下でのみ検証されます。この修正は halo2_gadgets v0.5.0 10 および orchard v0.14.0. 11 で公開されました。

* NU6.2 の有効化以降、Orchard Action proof は修正後の circuit に対する正規の長さを持たなければなりません。NU6.2 以前は、この長さはコンセンサスルールとして強制されていませんでした。8

NU6.2 の有効化以降、この一時的な緩和策はもはや適用されません。Orchard Action descriptions を含むトランザクションは再び受け入れられなければならず、その proofs は修正後の circuit および正規長ルールのもとで検証対象となります。NU6.2 は zcashd v6.20.0 および zebra v5.0.0 にデプロイされました。

[NU6.3:](https://zips.z.cash/zip-0258) NU6.3 ネットワークアップグレードでは Ironwood shielded pool が導入されます。NU6.3 のコンセンサス変更は、version 6 transaction format 5、Orchard Action circuit update 6、ZIP 2005 7、そしてこの ZIP にまたがって規定されており、この ZIP ではアクティベーションパラメータと、トランザクションバージョンに関係なく NU6.3 の有効化に依存するコンセンサスルールが修正されています。
