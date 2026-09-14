# Maya 탈중앙화 거래소

---

## 튜토리얼


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/f1k6xhNfTV8"
    title="How to Swap Ethereum to Zcash on LeoDex"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


## Maya Protocol란?

Maya는 서로 다른 블록체인 간에 암호화폐를 거래할 수 있게 해주는 [탈중앙화 거래소](https://nym.com/blog/what-is-dex) (DEX) 시스템입니다. 예를 들어 Bitcoin 블록체인의 Bitcoin (BTC)과 Ethereum 블록체인의 Ethereum (ETH)을, 자산을 직접 보관하거나 중앙화된 기관 또는 KYC(Know Your Customer) 절차를 거치지 않고도 간편하게 교환할 수 있습니다.

Maya Protocol은 Cosmos Software Development Kit (Cosmos SDK)로 개발되었으며 Proof of Bond (PoB) 합의 메커니즘으로 작동합니다. 프로토콜은 "노드 운영자(Node Operator)"들에 의해 유지되며, 이들은 시스템에 자본을 스테이킹하고 그 기여와 노력에 대한 보상으로 수익을 얻습니다. 본질적으로 노드는 사용자의 스왑을 검증하고 서로 다른 블록체인의 지정된 주소에 있는 자산을 관리하는 소프트웨어를 실행하는 컴퓨터입니다.

스왑을 완료하려면 지원되는 암호화폐가 사용자로부터 Maya의 주소 중 하나로 전송되어야 하며, 이후 다른 블록체인에 있는 다른 Maya 주소에서 동일한 가치의 금액이 전송됩니다. 이 과정은 노드의 3분의 2 이상에 의해 관리되고 승인되며, 특히 자금이 제대로 수신되었는지 확인합니다.

이러한 방식으로 사용자는 한 블록체인에서 한 종류의 토큰을 보내고 다른 블록체인에서 다른 종류의 토큰을 받을 수 있습니다. 모두 네이티브하게, 래핑된(wrapped) 토큰 없이 이루어집니다.

## Proof of Bond란?

Proof of Bond (PoB)는 노드 운영자가 네트워크에 참여하기 위해 반드시 채권(bond, 일반적으로 네트워크의 네이티브 토큰 형태)을 예치해야 하는 합의 메커니즘입니다. 이 채권은 경제적 보안 장치 역할을 하여 노드가 정직하게 행동하고 네트워크의 무결성을 유지하도록 보장합니다. 노드가 악의적으로 행동하거나 의무를 다하지 못하면 채권이 슬래싱(slashing)되어, 즉 벌금으로 일부가 몰수됩니다.

Maya Protocol에서 이 메커니즘은 노드 운영자가 스테이킹한 자원으로부터 경제적 가치를 창출하여 자본 효율성을 높이는 데 도움이 됩니다. 마찬가지로 Thorchain에서도 노드 운영자는 RUNE(네이티브 토큰)을 채권으로 예치해 네트워크를 보호하고 참여자 간의 협력을 보장합니다.

## Maya와 THORChain의 차이점

Maya는 THORChain의 포크이지만, 훌륭한 대안이 될 만한 몇 가지 새로운 기능이 추가되었습니다. 가장 중요한 것들은 다음과 같습니다.

### Liquidity Nodes

순수 채권 모델(Pure Bond Model)을 따르는 대신, Maya는 Liquidity Nodes 모델로의 전환을 검토하고 있습니다. 이 시스템에서 노드는 유동성을 직접 제공하며 이를 네트워크에 채권으로 묶을 수 있습니다. 이 방식은 노드 운영자가 상당한 위험을 감수한다는 의미입니다. 자금을 잘못 사용하면 손실을 입기 때문에 강력한 억지력이 됩니다. 결과적으로 노드 운영자는 Liquidity Pool의 Liquidity Unit을 사용하게 되며, 이는 동시에 유동성을 제공하고 네트워크 보안을 강화합니다.

### 비영구적 손실 보호 (Impermanent Loss Protection)

유동성 공급자(LP)가 암호화폐 자산 가격의 지속적인 변동으로 인해 유동성을 제공할 때 겪을 수 있는 일시적 손실로부터 보호하는 시스템입니다.
ILP는 $CACAO 공급량의 10%(1,000만 $CACAO)를 보유하고 있으며 프로토콜 수수료의 10%로 지속적으로 보충됩니다. ILP는 유동성 예치 후 50일이 지나면 활성화되며, 보장 한도는 100%입니다.

ILP 보장 기간은 ASSET과 $CACAO의 성과에 따라 달라집니다. ASSET의 성과가 더 좋으면 150일 후에, $CACAO의 성과가 더 좋으면 450일 후에 전액 보장이 완성됩니다. ILP는 전액 인출 시 지급되고 초기화되지만, 부분 인출에는 영향을 받지 않습니다. 추가 예치(탑업)의 경우 ILP는 초기화되지만 지급되지는 않습니다.

### 다른 배분 모델

Liquidity Auction은 참가자들에게 $CACAO 토큰을 분배하기 위해 설계된 21일간의 이벤트였습니다. 이벤트 기간 동안 사용자들은 지원되는 자산을 특정 주소에 예치했습니다. 경매가 종료되면 $CACAO 토큰의 90%는 유동성 기여도에 비례해 참가자들에게 배분되고, 나머지 10%는 ILP 준비금에 배분되었습니다. 참가자들은 유동성 공급자가 되어 예치된 자산과 $CACAO 토큰이 Maya의 풀에 들어갔고, 이를 통해 발생하는 수수료의 일부를 받을 수 있게 되었습니다.

### 다른 준비금 운용 방식

Maya Protocol 제네시스 시점에 사용 가능한 CACAO 준비금은 THORChain의 44%와 비교해 총 공급량의 10%에 불과했으며, 주로 비영구적 손실 보호(ILP)를 위해 사용되었습니다. Maya는 블록 발행(emission)이 없으며, Protocol Owned Liquidity와 Lending이 구현된다면 THORChain과는 다른 설계가 될 것입니다. THORChain에서는 이러한 요소들이 준비금과 긴밀하게 통합되어 있기 때문입니다.

그럼에도 불구하고 Maya는 이러한 차이점에도 THORChain을 보완하는 솔루션 역할을 하며, 중복성, 확장, 검증을 제공하고 현재 THORChain 구현에 없는 새로운 네트워크를 통합합니다.

또한 Maya의 목표는 다른 서비스들이 그 위에 구축할 수 있는 *백엔드*가 되는 것이며, Maya의 인프라 위에 많은 새로운 *프론트엔드* 또는 DEX 서비스가 만들어지기를 기대합니다.

## Maya Protocol 지갑 통합

*백엔드* 역할을 하는 Maya는 사용되려면 다양한 UI와 지갑의 지원이 필요합니다.
이미 Maya를 지원하는 서비스들은 다음과 같습니다:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

DefiSpot: 더 이상 온라인 상태가 아니며, 도메인이 확인되지 않습니다.

[XDEFI](https://www.xdefi.io/): Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON 등 30개 이상의 네이티브 블록체인과 모든 EVM 및 Cosmos 체인을 지원하는 멀티 생태계 자기수탁 지갑입니다.

[KeepKey ](https://keepkey.com/): 디지털 자산을 안전하게 보관하는 하드웨어 지갑입니다.
