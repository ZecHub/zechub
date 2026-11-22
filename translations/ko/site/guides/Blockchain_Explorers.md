<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="페이지 편집"/>
</a>

# 블록체인 탐색기

## 소개

전통적인 비즈니스 세계에서는 모든 거래에 구매 증명용 영수증이 포함됩니다. 마찬가지로 블록체인 세계에서는 사용자가 완료한 모든 거래에 대해 거래 ID 형식의 디지털 영수증을 받습니다. 대부분의 지갑은 이를 제공합니다. 블록체인 탐색기는 블록체인에서 이미 일어난 일을 시각적으로 보여 주는 도구입니다. 거래 ID, 주소 또는 블록 해시를 입력하면 어떤 일이 있었는지 시각적으로 표시합니다.

## 예시
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (공개): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://mainnet.zcashexplorer.app/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (비공개): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://mainnet.zcashexplorer.app/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Zcash에서 두 번째 거래의 중요한 세부 정보가 모두 숨겨져 있는 것을 확인해 보세요. 이는 디지털 세계에서 매우 중요하고 큰 영향을 미칩니다.


## 블록체인 지도

디지털 영수증으로 받은 이 긴 문자열을 이제 어떻게 하면 좋을까요? 블록체인에서 어떤 일이 있었는지 파악하는 데 도움을 주는 [블록체인 탐색기](https://nym.com/blog/using-blockchain-privately), 즉 지도는 바로 이럴 때 사용합니다. 위에 각 체인마다 자체 [블록체인 탐색기](https://nym.com/blog/using-blockchain-privately)가 있는 것을 확인해 보세요. 이 모든 블록체인 프로젝트가 오픈 소스 소프트웨어의 예라는 점을 이해하는 것이 중요합니다. 즉, 누구나 코드를 원하는 대로 개선하거나 포크할 수 있습니다. 이러한 점을 염두에 두면 각 프로젝트가 서로 다른 분야를 전문으로 하며, 해당 프로젝트의 요구에 맞게 블록체인 탐색기를 맞춤화한다는 것을 알 수 있습니다.

### 블록
거래는 *블록*에 담깁니다. 블록이 채굴되거나 검증되면 해당 블록 안의 모든 거래가 확인되고 블록 해시가 생성됩니다. 생성된 해시는 무엇이든 블록 탐색기에 입력할 수 있습니다. CEX에서 자금을 지급하기 전에 일정 횟수의 *확인*을 요구하는 것을 보셨을 수 있습니다. 이는 거래가 충분히 확정되었는지 확인하는 데 사용하는 기준입니다. 블록체인은 다음 블록에 포함될 거래를 어떻게 결정할까요? 복잡한 연구 주제이지만, 대부분의 최신 체인은 *수수료*를 기준으로 대기열의 앞자리에 들어갈 거래를 결정합니다. 수수료가 높을수록 대기열 앞쪽으로 이동할 가능성이 커집니다.

### 주소

[블록체인 탐색기](https://nym.com/blog/using-blockchain-privately)를 눈으로 익히는 재미있는 방법은 임의의 거래 주소를 입력하는 것입니다. 그런 다음 시간을 거슬러 올라가 자금이 어디서 왔는지 확인할 수 있습니다! 각 거래에는 입력 주소와 출력 주소가 모두 있습니다. 이 정보를 활용하면 자금이 사용된 거래에서 앞뒤로 쉽게 이동할 수 있습니다. 퍼즐을 좋아하는 사람들에게 이는 거대한 금융 퍼즐의 디지털 버전이며, 투명성을 높이는 데 활용될 수 있습니다. 블록체인 탐색기를 사용하면 훨씬 쉽게 시각화할 수 있을 뿐 아니라, 거래 프라이버시가 필요한 이유도 *분명히 보여 줍니다*. 거래정보 보호 Zcash를 사용하지 않는다면 BTC, ETH, ATOM, DOGE, VTC 등 *모든* 투명 블록체인에서 이 작업을 할 수 있습니다. 디지털 환경만 존재하는 미래로 나아가는 가운데 블록체인을 안전하게 사용하는 모든 사람에게 이 점은 매우 중요합니다.

### 금액

위에서 살펴본 주소와 마찬가지로 공개 블록체인의 모든 거래 금액은 공개적으로 확인할 수 있습니다. 여기에는 거래의 입력 주소와 출력 주소에 있는 금액이 모두 포함됩니다. 한 가지 예외는 거래정보 보호 Zcash를 사용하는 경우입니다. 이때는 모든 금액이 숨겨집니다. *공정한 거래*를 위해 반드시 프라이버시가 필요한 소규모 사업자에게 이는 큰 이점입니다!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Zcash에서 탐색기로 볼 수 있는 것과 볼 수 없는 것

#### 요약
- 투명(`t`) 주소는 Bitcoin처럼 탐색기에서 전체 내용을 확인할 수 있습니다.
- 완전히 거래정보가 보호되는(z에서 z로 이동하는) 거래는 금액, 주소, 메모를 숨깁니다.
- 완전히 거래정보가 보호되는 거래에서도 수수료는 표시됩니다.
- 거래정보 보호 주소로 `t`를 옮기는 거래정보 보호 처리와, 거래정보 보호 주소에서 `t`로 되돌리는 거래정보 보호 해제는 한쪽이 투명하므로 일부 내용이 표시됩니다.
- 자금이 거래정보 보호 구역 안에 머무는 동안에만 프라이버시가 유지됩니다.

Zcash에는 여러 종류의 주소가 있으며, 탐색기는 주소 종류에 따라 정보를 매우 다르게 표시합니다.

`t`로 시작하는 투명 주소는 Bitcoin과 같은 방식으로 작동합니다. 탐색기에는 송신자, 수신자, 금액, 그리고 자금의 출처까지 이어지는 내역이 표시됩니다.

거래정보 보호 주소는 비공개 영역입니다. Sapling 또는 Orchard [거래정보 보호 구역](https://zechub.wiki/using-zcash/shielded-pools#content)에 있는 자금은 영지식 증명으로 보호됩니다. 완전히 거래정보가 보호되는 거래를 조회하면 탐색기에서는 금액, 주소, 메모를 표시할 수 없습니다. 유효한 거래가 발생해 블록에 기록되었다는 사실만 확인할 수 있습니다. 이 페이지 상단에 나온 비공개 예시가 바로 이런 경우입니다.

완전히 거래정보가 보호되는 거래에서도 한 가지 세부 정보는 표시됩니다. 바로 수수료입니다. Zcash 합의 규칙에 따라 투명 수수료를 명시해야 하므로, 금액이 가려져 있어도 탐색기에는 수수료가 항상 표시됩니다. 따라서 거래가 이례적인 금액의 수수료를 내는 것으로 눈에 띄지 않도록 지갑의 기본 수수료를 사용하는 것이 좋습니다.

자금이 투명 영역과 거래정보 보호 영역 사이를 이동할 때도 탐색기에 표시됩니다. `t` 자금을 풀 안으로 옮기는 것은 거래정보 보호 처리이고, 다시 밖으로 옮기는 것은 거래정보 보호 해제입니다. 한쪽이 투명하기 때문에 이러한 이동은 일부 내용이 표시됩니다. `t` 주소에 한 번도 닿지 않는 완전한 비공개 z에서 z로의 활동만이 수수료를 제외한 모든 정보를 숨깁니다.

핵심은 프라이버시를 지키려면 거래정보 보호 구역 안에 머물러야 한다는 것입니다. 자금이 `t` 주소에 닿는 순간, 해당 자금의 그 부분 내역은 Bitcoin만큼 공개됩니다. 회계사처럼 신뢰하는 사람에게 자신의 거래정보 보호 활동을 증명하려면 이를 공개하지 말고 viewing key를 공유하세요. [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) 페이지를 참조하세요.


### Zcash 블록 탐색기 목록

- [Zcash 블록 탐색기](https://mainnet.zcashexplorer.app/)

- [3xpl](https://3xpl.com/zcash)

- [ShieldedScan](https://shieldedscan.xyz)

- [ZecBlock](https://zecblock.com/)

- [SoChain](https://sochain.com/zec) ([테스트넷](https://sochain.com/zectest))

- [ZecZcash 탐색기](https://zeczcash.com/explorer)



### 시각 안내

다음은 다양한 블록체인 탐색기의 좋은 예시 4가지입니다.

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash 블록 탐색기](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
