<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# 블록체인 탐색기

## 소개

전통적인 비즈니스 세계에서는 모든 거래에 구매 증명을 위한 영수증이 포함됩니다. 마찬가지로 블록체인 세계에서는 사용자가 완료한 모든 거래에 대해 거래 ID 형태의 디지털 영수증을 받습니다. 대부분의 지갑이 이를 제공합니다. 블록체인 탐색기는 블록체인에서 이미 일어난 일을 시각화할 수 있게 해 주는 도구입니다. 거래 ID, 주소 또는 블록 해시를 입력으로 받아 어떤 일이 일어났는지 시각적으로 보여 줍니다.

## 예시
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (공개): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (비공개): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Zcash의 두 번째 거래에서는 모든 중요한 세부 정보가 숨겨져 있다는 점에 유의하세요. 이는 중요하며 디지털 세계에서 큰 의미를 가집니다.


## 블록체인 지도

디지털 영수증인 이 긴 문자열을 받았으니, 이제 무엇을 할까요? 이때 [블록체인 탐색기](https://nym.com/blog/using-blockchain-privately), 즉 지도를 사용해 블록체인에서 일어난 일을 이해할 수 있습니다. 위에서 각 체인마다 고유한 버전의 [블록체인 탐색기](https://nym.com/blog/using-blockchain-privately)가 있는 것을 확인해 보세요. 이 모든 블록체인 프로젝트가 오픈 소스 소프트웨어의 예시라는 점을 이해하는 것이 중요합니다. 즉, 누구나 원하는 대로 코드에 기여하거나 포크할 수 있습니다. 이를 바탕으로 각 프로젝트는 서로 다른 영역에 특화되어 있으며, 해당 프로젝트의 요구에 맞도록 블록체인 탐색기를 맞춤화합니다.

### 블록
거래는 *블록*에 담깁니다. 블록이 채굴되거나 검증되면 해당 블록 안의 모든 거래가 확정되고 블록 해시가 생성됩니다. 생성된 모든 해시는 블록 탐색기에 입력할 수 있습니다. CEX가 자금을 출금하기 전에 일정 횟수의 *확정*을 요구하는 것을 본 적이 있을 것입니다. 이는 거래가 충분히 최종 확정되었는지 확인하기 위해 사용하는 지표입니다. 블록체인은 어떤 거래가 다음 블록에 들어갈지를 어떻게 결정할까요? 복잡한 연구 주제이지만, 대부분의 현대적 체인은 누가 대기열 앞에 설지를 결정하기 위해 *수수료* 개념을 사용합니다. 수수료가 높을수록 대기열 앞쪽으로 이동할 가능성이 커집니다.

### 주소

[블록체인 탐색기](https://nym.com/blog/using-blockchain-privately)를 시각적으로 익히는 재미있는 방법은 임의의 거래 주소를 입력하는 것입니다. 그러면 시간을 거슬러 올라가 자금이 어디에서 왔는지 확인할 수 있습니다! 각 거래에는 입력 주소와 출력 주소가 모두 있습니다. 이 정보를 활용하면 사용된 모든 거래에서 앞으로도 뒤로도 쉽게 이동할 수 있습니다. 퍼즐을 좋아하는 사람에게 이것은 거대한 금융 퍼즐의 디지털 버전이며, 투명성 확보 목적으로 활용될 수 있습니다. 블록체인 탐색기를 사용하면 이를 훨씬 쉽게 시각화할 수 있을 뿐 아니라, *거래 프라이버시의 필요성도 강조합니다*. 실드된 Zcash를 사용하지 않는다면 BTC, ETH, ATOM, DOGE, VTC 등 *모든* 투명 블록체인에서 이 작업을 수행할 수 있습니다 ... . 이 점은 디지털 전용 미래로 안전하게 나아가려는 모든 블록체인 사용자에게 매우 중요합니다.

### 금액

위의 주소와 마찬가지로 공개 블록체인의 모든 거래는 금액이 공개적으로 표시됩니다. 여기에는 모든 거래의 입력 및 출력 주소에 대한 금액이 포함됩니다. 한 가지 예외는 Shielded Zcash를 사용하기로 선택한 경우이며, 이때는 모든 금액이 숨겨집니다. *공정 거래*를 위해 반드시 프라이버시가 필요한 소규모 사업자에게 이는 큰 이점입니다!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### 탐색기가 Zcash에서 볼 수 있는 것과 볼 수 없는 것

#### 요약
- 투명(`t`) 주소는 Bitcoin과 마찬가지로 탐색기에서 완전히 보입니다.
- 완전히 실드된(z에서 z로) 거래는 금액, 주소 및 메모를 숨깁니다.
- 완전히 실드된 거래에서도 수수료는 계속 보입니다.
- 실딩(`t`에서 실드됨으로 이동)과 디실딩(실드됨에서 다시 `t`로 이동)은 한쪽이 투명하기 때문에 일부가 보입니다.
- 자금이 실드 풀 안에 머무는 동안에만 프라이버시가 유지됩니다.

Zcash에는 한 가지 이상의 주소 유형이 있으며, 탐색기는 이를 매우 다르게 처리합니다.

`t`로 시작하는 투명 주소는 Bitcoin처럼 작동합니다. 탐색기는 송신자, 수신자, 금액 및 자금이 어디에서 왔는지에 이르는 추적 경로를 보여 줍니다.

실드 주소는 비공개 측면입니다. Sapling 또는 Orchard [실드 풀](https://zechub.wiki/using-zcash/shielded-pools#content)의 자금은 영지식 증명으로 보호됩니다. 완전히 실드된 거래를 조회하면 탐색기는 금액, 주소 또는 메모를 보여 줄 수 없습니다. 유효한 거래가 발생했고 블록에 기록되었다는 사실만 확인할 수 있습니다. 이것이 이 페이지 상단 근처에 표시된 숨겨진 비공개 예시입니다.

완전히 실드된 거래에서도 한 가지 세부 사항은 계속 보입니다. 바로 수수료입니다. Zcash 합의 규칙은 투명 수수료를 명시적으로 기재하도록 요구하므로, 금액이 가려져 있을 때에도 탐색기는 항상 이를 보여 줄 수 있습니다. 따라서 비정상적인 금액을 지불해 거래가 눈에 띄지 않도록 표준 지갑 수수료를 사용하는 것이 좋습니다.

탐색기는 자금이 투명 측면과 실드 측면 사이를 이동하는 경우도 볼 수 있습니다. `t` 자금을 풀로 옮기는 것은 실딩이고, 다시 꺼내는 것은 디실딩입니다. 한쪽이 투명하므로 이러한 이동은 일부가 보입니다. `t` 주소를 전혀 거치지 않는 완전히 비공개적인 z에서 z로의 활동만이 수수료를 제외한 모든 것을 숨깁니다.

핵심은 프라이버시가 실드 풀 안에 머무르는 것에 달려 있다는 점입니다. 자금이 `t` 주소에 닿으면, 그 이력의 해당 부분은 Bitcoin만큼 공개됩니다. 회계사처럼 본인이 선택한 사람에게 자신의 실드 활동을 증명하려면 공개하지 말고 viewing key를 공유하세요. [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) 페이지를 참조하세요.


### Zcash 블록 탐색기 목록

- [Zcash 블록 탐색기](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### 시각 가이드

다음은 서로 다른 블록체인 탐색기의 좋은 예시 네 가지입니다.

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash 블록 탐색기](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
