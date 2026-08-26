# Zcashの組織体制

## 要点

- Zcashは1社によって作られているのではなく、それぞれ異なる役割を担う複数の独立した組織によって構築されています
- その歴史の大半においては、Electric Coin CompanyとZcash Foundationの2つの組織が開発を主導してきました
- 2026年1月、ガバナンスをめぐる対立の後にElectric Coin Companyのチーム全体が辞任し、エコシステムはいくつかの独立チームへと再編されました
- 現在では、プロトコル、ノードソフトウェア、ウォレット、研究、スケーリング、資金調達はそれぞれ別のグループが担っています
- 単一の組織がZcashを支配しているわけではなく、ネットワークはオープンソースかつパーミッションレスであり、どの変化の中でも正常に稼働し続けました

<br/>

## これは誰向けか

- 実際に誰がZcashを構築し維持しているのかを理解したい初心者
- エコシステム内にある多くの組織名に混乱している人
- 誰と協力するべきか、あるいは提案をどこに送るべきかを判断したいコントリビューター

<br/>

## これが重要な理由

この構造を理解すると、それ以外のこともすべて理解しやすくなります。自分が依存しているコードを誰が保守しているのか、助成金について誰に相談すべきか、自分が関心を持つネットワークの一部分に誰が責任を持っているのかが分かるからです。また、Zcashの目立たない強みの1つも見えてきます。作業が独立した複数のグループに分散しているため、単一障害点によってプロジェクト全体が支配されたり停滞したりしにくいのです。

このページは地図です。このwiki内ですでに個別ページがある各組織については、そこに書かれている内容を繰り返すのではなく、短い説明と詳しく読むためのリンクを掲載しています。

<br/>

## 以前はどう機能していたか

Zcashの歴史の大半では、2つの組織が中心となっていました。

Electric Coin Companyは2016年にZcashを立ち上げ、中核開発チームの多くを雇用していました。その監督は、Zcashを支援するために設立された非営利の理事会であるBootstrapが担っていました。Zcash Foundationはそれと並行して独立した非営利組織として活動し、プロトコルのスチュワードシップと独立したノードの構築に注力していました。両者の資金の大部分は、開発のために確保されたブロック報酬の一部から賄われていました。

この二本柱の構造は何年も続きましたが、それは共通の資金源と、両組織が足並みをそろえ続けることに依存していました。もともとの開発資金の仕組みが変化し、その長期的な将来が不透明になるにつれて、継続的な作業費用をどう賄うかという問題はより切実になっていきました。この資金問題は、その後に起きた多くの変化の背景にあり、また、あるチームは外部資本を調達し、別のチームは助成金に依存している理由の一端でもあります。

<br/>

## 2026年の再編

2026年1月、この構造は大きく変わりました。1月7日、Electric Coin Companyの最高経営責任者であるJosh Swihartは、X上で会社チーム全体が辞任したと発表しました。

Bootstrapは、Electric Coin Companyがその完全子会社となった後の2020年に、同社を統治するために設立された非営利組織でした。会社チームとこの理事会との意見の相違は時間をかけて積み重なり、組織の方向性、開発資金をどう確保すべきか、そしてチームが外部資本を調達するために民間企業へ移すことを望んでいたZashiウォレットの将来など、いくつかの問題に及びました。Swihartはこの離脱を「constructive discharge」と表現しました。これは、条件があまりにも大きく変えられたため、実質的に辞任を強いられたことを意味する法律用語であり、理事会の過半数がZcashの使命と整合しなくなっていたと述べました。

公正を期すためには、もう一方の説明も重要です。Bootstrapはこの対立を、ガバナンスと非営利法人としての法令順守の問題として位置づけました。Zcashの創設者であるZooko Wilcoxは、公の場でこの対立に名前が挙がった理事会メンバーを擁護し、長年にわたり共に仕事をしてきた高い誠実さを持つ人々だと述べる一方で、対立そのものについてはどちらの側にも立たないことを明確にしました。

争点ではなかったことが2つあります。どの当事者も犯罪行為を主張していなかったため、これは法的事件ではなく企業運営とガバナンスをめぐる対立でした。そしてZcashネットワーク自体には影響がなく、オープンソースで、パーミッションレスで、安全かつ完全に稼働し続けていました。この点はSwihartもWilcoxもユーザーに対して強調していました。

その後に起きたのは崩壊ではなく再編でした。旧会社チームは2026年後半にZODLを設立し、別途、元Bootstrap理事3名はSovrightを設立しました。開発は複数の独立チームにまたがる、より分散した形へと落ち着きました。

ここで説明している声明は、2026年1月7日にJosh Swihart（@jswihart）とZooko Wilcox（@zooko）によってX上で公開されたものであり、元の投稿はそこで全文を読むことができます。

<br/>

## 現在、誰がZcashを構築しているのか

現在の作業は、それぞれが明確な役割を担う独立した組織に分散しています。

### 2026年の分裂から生まれた2つの組織

1. ZODL（Zcash Open Development Lab）は、旧Electric Coin Companyチームによって設立され、Josh Swihartが率いています。外部投資家から2,500万ドル超を調達し、Zcashの最新のシールドトランザクションを支えるHalo 2証明システムを含む中核プロトコル開発と、以前はZashiと呼ばれていたデフォルトでシールドのモバイルウォレットであるZODLウォレットに取り組んでいます。詳しくは[ZODL](https://zechub.wiki/zcash-organizations/zodl)をご覧ください。
2. Sovrightは、元Bootstrap理事3名によって設立された非営利組織です。エコシステム向けのツールと支援に注力しており、保守されなくなった古いウォレットに取り残された資金を初期ユーザーが回収できるよう支援するツールArgosを構築しました。詳しくは[Sovright](https://zechub.wiki/zcash-organizations/sovright)をご覧ください。

### プロトコルのスチュワードシップ、研究、ノードソフトウェア

3. Zcash Foundationは、古いzcashdクライアントの退役に伴ってネットワークの主要ノードになるRust製ノードであるZebraを保守しています。また、ZcashのGitHub組織、z.cashウェブサイト、X上のメインのZcashアカウントの管理も担っており、これら資産の一部管理についてZecHubと提携しています。詳しくは[Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)をご覧ください。
4. Shielded Labsは、スイスを拠点とする寄付で運営される独立非営利組織です。将来の開発資金を支えるネットワーク持続可能性メカニズムや、Zcashにproof of stakeファイナリティを追加するCrosslinkの取り組みを含む研究と長期的持続可能性に注力しており、2026年にOrchardプールの脆弱性を発見したセキュリティ監査にも資金提供しました。詳しくは[Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs)をご覧ください。
5. Electric Coin Companyは、2016年にZcashを生み出し立ち上げた組織として、今も歴史の一部であり続けています。詳しくは[Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)をご覧ください。

### スケーリングと暗号技術

6. Project Tachyonは、暗号学者Sean Boweが主導するスケーリングの取り組みです。これは、ウォレットがブロックチェーンと同期するための新しい方法であるoblivious synchronizationを提案しており、トランザクションを小さくすると同時に、副次的効果としてZcashを耐量子プライバシーへ近づけます。その作業は[tachyon.z.cash](https://tachyon.z.cash/)に記録されています。
7. Valar Groupは、スケールするプライベートで耐量子的なデジタルキャッシュのためのZcashプロトコルに取り組む、暗号技術の研究・エンジニアリングラボです。スケーリングと量子対応の作業においてProject Tachyonと緊密に協力しています。詳しくは[valargroup.dev](https://valargroup.dev/)で確認できます。

### 地域組織とコミュニティ組織

8. Obscura Labsは、ナイジェリアで登録された独立組織で、アフリカおよび新興市場に焦点を当て、インフラと普及への導線を構築しています。詳しくは[Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs)をご覧ください。

### 教育

9. ZecHubは、Zcashのための分散型教育ハブです。コミュニティメンバーが協力して、チュートリアル、wikiドキュメント、ポッドキャスト、週刊ニュースレターを通じて、人々がエコシステムを理解し、参加方法を学ぶのに役立つコンテンツを作成、検証、普及しています。今読んでいるこのwikiもZecHubの一部であり、Zcash Foundationは一部のコミュニティ資源の管理を支援するためにこれと提携しています。

### 資金調達

10. Zcash Community Grantsは、ブロック報酬の一部から独立したコントリビューターやコミュニティプロジェクトに資金を提供し、中核組織の外側にある多くのチームへ作業を広げています。詳しくは[Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)をご覧ください。
11. Financial Privacy Foundationは、Zcashエコシステムとコミュニティプロジェクトを支援しています。詳しくは[Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)をご覧ください。

これらすべての組織はオープンソースのリポジトリを保守しているため、その作業は誰でも読み、検証し、その上に構築できます。そして、組織だけが全体像ではありません。重要な貢献の多くは、中核組織だけではなく、個人や、助成金によって資金提供された受託企業からももたらされています。それと並んで、ウォレットチーム、地域コミュニティ、独立開発者、そしてプロトコルを構築してはいないもののZECを保有し支援する投資家も存在します。上の一覧は背骨であって、全体像そのものではありません。

<br/>

## 初心者はどこから始めればよいか

どの組織が自分にとって重要かは、何をしたいかによって決まります。

1. Zcashを使いたいなら、必要なのはウォレットなので、ZODLとそのウォレットが自然な出発点です。
2. ノードを運用したい、またはネットワークソフトウェアを理解したいなら、Zcash FoundationとそのZebraノードを見てください。
3. プロジェクトに資金を出したい、または報酬のある仕事として貢献したいなら、Zcash Community Grantsを見てください。
4. 研究やプロトコルの将来を追いたいなら、Shielded Labs、Project Tachyon、Valar Groupを追ってください。

<br/>

## 学び続ける

このwikiは、さらに深く学ぶ助けとなるために存在しているので、次の最善の一歩は読み進めることです。初心者向けの関連トピックをいくつか挙げます。

- 基本的なネットワークとコインについては[ZECとZcashとは何か](https://zechub.wiki/start-here/what-is-zec-and-zcash)
- Zcashを実際に使い始める最初の案内としては[新規ユーザーガイド](https://zechub.wiki/start-here/new-user-guide)
- Zcashがどのように取引のプライバシーを守るかについては[Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools)
- コイン供給がどのように検証可能なまま維持されるかについては[The turnstile](https://zechub.wiki/zcash-tech/the-turnstile)
- ネットワークが移行中のシールドプールについては[Ironwood](https://zechub.wiki/zcash-tech/ironwood)
- Zcashが時間とともにどのように変化するかについては[Network Upgrades](https://zechub.wiki/start-here/network-upgrades)
- プライバシーを支える暗号技術については[zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks)

各ページにはさらに多くのリンクがあるので、好きなだけたどっていけます。

<br/>

## よくある誤解

- Zcashは単一の企業に所有または支配されているわけではなく、どの組織も単独でネットワークを変更したり停止したりすることはできません
- 2026年の対立はネットワーク、資金、プライバシーに影響を与えず、組織上の意見の相違であり、プロトコルはその間ずっと正常に動作していました
- Electric Coin Companyを去ったチームによってZcashが終わったわけではなく、作業は新しい独立組織へ移りました
- 多くの組織が存在することは弱みではなく強みであり、単一障害点を取り除き、プロジェクトの回復力を保ちます
- ZECを保有したり広めたりすることとZcashを構築することは同じではなく、投資家や普及活動者はコミュニティの一部ではあるものの、プロトコルを開発するチームとは別です

<br/>

## 関連ページ

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - 旧Electric Coin Companyチームによって設立された開発ラボ
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - 元Bootstrap理事によって設立された非営利組織
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - プロトコルとZebraノードのスチュワード
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - 研究とプロトコルの持続可能性
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - 2016年にZcashを立ち上げた企業
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - アフリカおよび新興市場におけるインフラと普及
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - 独立したコントリビューター向けの資金提供
