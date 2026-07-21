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


## Maya Protocol이란 무엇인가요?

Maya는 서로 다른 블록체인 간의 암호화폐 거래를 가능하게 하는 [탈중앙화 거래소](https://nym.com/blog/what-is-dex)(DEX) 시스템입니다. 예를 들어, 중앙화된 기관이나 고객신원확인(KYC) 절차를 거치지 않고, 자산을 직접 보유하지 않은 상태에서도 Bitcoin 블록체인의 Bitcoin(BTC)을 Ethereum 블록체인의 Ethereum(ETH)과 쉽게 스왑할 수 있습니다.

Maya Protocol은 Cosmos Software Development Kit(Cosmos SDK)를 사용해 개발되었으며, Proof of Bond(PoB) 합의 메커니즘으로 운영됩니다. 이 프로토콜은 자본을 시스템에 스테이킹하고 그 기여와 노력에 대한 보상으로 수익을 얻는 "노드 운영자(Node Operators)"에 의해 유지됩니다. 본질적으로 노드는 사용자 스왑을 검증하고, 서로 다른 블록체인에 걸쳐 지정된 주소의 자산을 관리하는 소프트웨어를 실행하는 컴퓨터입니다.

스왑을 완료하려면, 지원되는 암호화폐가 사용자가 보낸 Maya의 주소 중 하나에 수신되어야 하며, 이후 다른 블록체인에 있는 Maya의 또 다른 주소에서 그에 상응하는 금액이 전송됩니다. 이 과정은 최소 3분의 2 이상의 노드에 의해 관리되고 승인되며, 특히 자금이 올바르게 수신되었는지를 보장합니다.

이러한 방식으로 사용자는 한 블록체인에서 한 종류의 토큰을 보내고, 래핑 토큰을 사용하지 않으면서도 다른 블록체인에서 네이티브 형태의 다른 토큰을 받을 수 있습니다.

## Proof of Bond란 무엇인가요?

Proof of Bond(PoB)는 노드 운영자가 네트워크에 참여하기 위해 담보(bond)(보통 네트워크의 네이티브 토큰 형태)를 예치해야 하는 합의 메커니즘입니다. 이 담보는 경제적 보안 장치로 작용하여 노드가 정직하게 행동하고 네트워크의 무결성을 유지하도록 보장합니다2. 노드가 악의적으로 행동하거나 자신의 의무를 수행하지 못할 경우, 해당 담보는 슬래시될 수 있으며, 이는 벌칙으로 그 일부가 몰수된다는 뜻입니다.

Maya Protocol에서는 이 메커니즘이 노드 운영자의 스테이킹 자원으로부터 경제적 가치를 창출해 자본 효율성을 높이는 데 도움을 줍니다. 마찬가지로 THORChain에서도 노드 운영자는 네트워크를 보호하고 참여자 간 협력을 보장하기 위해 RUNE(네이티브 토큰)을 본딩합니다.

## Maya와 THORChain의 차이점

Maya는 THORChain의 포크이지만, 훌륭한 대안이 되는 몇 가지 새로운 기능과 특성을 갖추고 있습니다. 가장 중요한 것들은 다음과 같습니다.

### 유동성 노드

Maya는 Pure Bond Model을 따르기보다 Liquidity Nodes 모델로의 전환을 고려하고 있습니다. 이 시스템에서는 노드가 네트워크에 직접 유동성을 제공하고 이를 본딩할 수 있습니다. 이 접근 방식은 노드 운영자에게 상당한 위험을 부여합니다. 자금을 잘못 사용하면 손실을 입게 되므로, 이는 강력한 억제 장치로 작용합니다. 그 결과 노드 운영자는 Liquidity Pools의 Liquidity Units를 사용하게 되며, 이는 동시에 유동성을 제공하고 네트워크 보안을 강화합니다.

### 비영구적 손실 보호

암호화 자산 가격의 지속적인 변동으로 인해 유동성을 제공할 때 유동성 공급자(LP)가 겪을 수 있는 일시적 손실로부터 보호하는 시스템입니다.
ILP는 $CACAO 공급량의 10%(1천만 $CACAO)를 보유하며, 프로토콜 수수료의 10%로 지속적으로 보충됩니다. ILP는 유동성 예치 후 50일이 지나면 활성화되며, 보장 한도는 100%로 제한됩니다.

ILP 보장 기간은 ASSET과 $CACAO의 성과에 따라 달라집니다. ASSET의 성과가 더 좋으면 150일 후 완전 보장이 달성되고, $CACAO의 성과가 더 좋으면 450일 후 완전 보장이 달성됩니다. ILP는 전액 인출 시 지급되고 동시에 리셋되지만, 부분 인출에는 영향을 받지 않습니다. 추가 예치(top-up)의 경우 ILP는 리셋되지만 지급되지는 않습니다.

### 다른 할당 모델

Liquidity Auction은 참가자들에게 $CACAO 토큰을 분배하기 위해 설계된 21일간의 이벤트였습니다. 이벤트 기간 동안 사용자들은 지원되는 자산을 특정 주소에 예치했습니다. 경매 종료 시점에 $CACAO 토큰의 90%는 유동성 기여 비율에 따라 참가자들에게 할당되었고, 나머지 10%는 ILP 준비금으로 할당되었습니다. 참가자들은 유동성 공급자가 되었고, 그들이 예치한 자산과 $CACAO 토큰은 Maya의 풀에 배치되어 생성되는 수수료의 일부를 얻을 수 있게 되었습니다.

### 준비금을 다루는 다른 방식

Maya Protocol의 제네시스 시점에 사용 가능한 CACAO 준비금은 총 공급량의 10%에 불과했으며, THORChain의 44%와 비교됩니다. 또한 이는 주로 비영구적 손실 보호(ILP)를 위한 것이었습니다. Maya에는 블록 발행이 없으며, 만약 Protocol Owned Liquidity와 Lending이 구현된다면 THORChain과는 다른 설계를 가지게 될 것입니다. THORChain에서는 이러한 요소들이 준비금과 밀접하게 통합되어 있기 때문입니다.

그럼에도 불구하고 이러한 차이점들에도 불구하고 Maya는 THORChain을 보완하는 솔루션으로도 기능하며, 중복성, 확장성, 검증을 제공하고, 현재 THORChain 구현에 존재하지 않는 새로운 네트워크를 통합합니다.

또한 Maya의 목표는 다른 서비스들이 그 위에 구축할 수 있는 *백엔드*가 되는 것이며, Maya의 인프라 위에 구축된 많은 새로운 *프런트엔드*, 즉 DEX 서비스가 등장하기를 기대하고 있습니다.

## Maya protocol 지갑 통합

*백엔드*로서 기능하는 Maya는 사용되기 위해 다양한 UI와 지갑의 지원이 필요합니다. 
다음은 이미 Maya를 지원하는 서비스 목록입니다:

[Thorwallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, Metamask, Keystore

[El Dorado](https://www.eldorado.market/): XDEFI, Keystore

[CacaoSwap](https://cacaoswap.app/): Keystore, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): Keystore, Ledger

[DefiSpot](https://www.defispot.com/t): XDEFI, Metamask, Keplr, Phantom, Walletconnect, Leap Wallet, Argeentx, Braavos, Trustwallet, and Rabby.

[XDEFI](https://www.xdefi.io/): Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON 등을 포함해 30개 이상의 네이티브 블록체인과 모든 EVM 및 Cosmos 체인을 지원하는 멀티 생태계 셀프 커스터디 지갑입니다.

[KeepKey ](https://keepkey.com/): 디지털 자산을 안전하게 보관하기 위한 하드웨어 지갑입니다.
