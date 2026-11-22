<a href="https://github.com/zechub/zechub/edit/main/site/guides/Maya_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Maya 탈중앙화 거래소

> Maya Protocol는 래핑된 토큰, 계정 또는 KYC 없이 네이티브 스왑(예: ETH 또는 BTC를 ZEC로 스왑)을 지원하는 크로스체인 DEX입니다.

## 요약

* Maya는 블록체인 간에 네이티브 코인을 스왑합니다. 한 자산을 보내면 다른 체인에서 해당 체인의 자산을 받습니다. 래핑된 토큰도, 계정도, KYC도 필요하지 않습니다.
* THORChain의 포크로, Cosmos SDK를 사용해 구축되었으며 자본을 위임 지분으로 맡기는 노드 운영자에 의해 보호됩니다(위임 지분 증명).
* 네이티브 토큰은 $CACAO입니다. 유동성 공급자는 스왑 수수료를 얻으며, 50일이 지나면 비영구적 손실 보호(ILP)를 받습니다.
* Maya는 백엔드입니다. THORWallet, CacaoSwap, Asgardex, Ctrl Wallet 또는 KeepKey 같은 프런트엔드나 지갑을 통해 사용합니다.
* 튜토리얼 영상에서는 이 프런트엔드 중 하나인 LeoDex에서 ETH를 ZEC로 스왑하는 방법을 보여 줍니다.
* Maya는 SwapKit를 통해 거래정보 보호/통합 ZEC 입금을 지원합니다(투명 가치 출력에 거래정보 보호 메모를 더하는 방식). 이에 따라 일부 프런트엔드에서는 ZEC를 통합 주소로 바로 받을 수 있습니다. 사용하는 서비스에서 투명(t1) 주소로 지급하는 경우, 프라이버시를 위해 나중에 지갑에서 거래정보를 보호하세요.
* 네이티브 ZEC 스왑을 지원하는 서비스는 Maya만 있는 것이 아닙니다. THORChain에도 네이티브 ZEC 풀이 있습니다.

## 핵심 설명

중앙화 거래소는 코인을 보관하고 신원을 요구합니다. 반면 Maya는 지원되는 각 체인에서 볼트를 관리하는 노드 네트워크를 사용합니다. 사용자가 Maya 볼트로 코인을 보내면 노드 3분의 2 이상이 입금을 확인하고, 다른 볼트에서 목적지 체인의 주소로 해당 자산을 보내 줍니다.

노드 운영자는 부정행위를 하면 삭감될 수 있는 위임 지분을 담보로 걸며, 이는 정직하게 행동하도록 하는 경제적 동기를 제공합니다. Maya는 THORChain에 유동성 노드와 자체 준비금 설계 등의 기능을 더하고, 이와 나란히 독립적인 두 번째 네트워크로도 작동합니다.

아래 섹션에서는 Maya의 작동 방식, 위임 지분 증명, THORChain와의 차이점, 그리고 지원 지갑을 다룹니다.

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


## Maya Protocol란 무엇인가요?

Maya는 여러 블록체인에서 암호화폐를 거래할 수 있는 [탈중앙화 거래소(DEX)](https://nym.com/blog/what-is-dex) 시스템입니다. 예를 들어, 자산을 직접 보유하거나 중앙 기관 또는 고객 확인(KYC) 절차를 거치지 않고도 비트코인 블록체인의 비트코인(BTC)을 이더리움 블록체인의 이더리움(ETH)으로 간편하게 스왑할 수 있습니다.

Maya Protocol는 Cosmos 소프트웨어 개발 키트(Cosmos SDK)를 사용해 개발되었으며 위임 지분 증명(PoB) 합의 메커니즘으로 운영됩니다. 프로토콜은 시스템에 자본을 스테이킹하고 기여와 노력에 대한 보상을 받는 “노드 운영자”가 유지합니다. 노드는 사용자의 스왑을 검증하고 여러 블록체인의 지정 주소에 있는 자산을 관리하는 소프트웨어를 실행하는 컴퓨터입니다.

스왑을 완료하려면 사용자가 지원되는 암호화폐를 Maya의 주소 중 하나로 보내야 하며, 다른 블록체인에 있는 Maya의 또 다른 주소에서 이에 상응하는 금액이 전송됩니다. 이 과정은 노드 3분의 2 이상의 관리와 승인을 거치며, 특히 자금이 정상적으로 입금되었는지 확인합니다.

이렇게 사용자는 한 블록체인에서 한 종류의 토큰을 보내고 다른 블록체인에서 다른 종류의 토큰을 네이티브 방식으로 받을 수 있으며, 래핑된 토큰을 사용할 필요가 없습니다.

## 위임 지분 증명이란 무엇인가요?

위임 지분 증명(PoB)은 노드 운영자가 네트워크에 참여하기 위해 위임 지분(일반적으로 네트워크의 네이티브 토큰)을 맡겨야 하는 합의 메커니즘입니다. 이 지분은 경제적 보안 장치로 작동하여 노드가 정직하게 행동하고 네트워크의 무결성을 유지하도록 합니다. 노드가 악의적으로 행동하거나 맡은 의무를 수행하지 않으면 위임 지분이 삭감될 수 있습니다. 즉, 그 일부를 벌칙으로 가져갑니다.

Maya Protocol에서는 이 메커니즘을 통해 노드 운영자가 스테이킹한 자원에서 경제적 가치를 만들어 자본 효율성을 높입니다. 마찬가지로 THORChain에서는 노드 운영자가 RUNE(네이티브 토큰)을 위임 지분으로 맡겨 네트워크를 보호하고 참여자 간 협력을 보장합니다.

## Maya와 THORChain의 차이점

Maya는 THORChain의 포크이지만, 훌륭한 대안이 되도록 몇 가지 새로운 기능을 추가했습니다. 가장 중요한 기능은 다음과 같습니다.

### 유동성 노드

순수 위임 지분 모델을 따르는 대신, Maya는 유동성 노드 모델로 전환하는 방안을 검토하고 있습니다. 이 모델에서는 노드가 네트워크에 유동성을 직접 제공하고 이를 네트워크에 맡길 수 있습니다. 이에 따라 노드 운영자는 상당한 위험을 감수하게 됩니다. 자금을 오용하면 손실을 입으므로 강력한 억제 효과가 생깁니다. 그 결과 노드 운영자는 유동성 풀의 유동성 단위를 사용합니다. 이 단위는 유동성을 제공하는 동시에 네트워크 보안을 강화합니다.

### 비영구적 손실 보호

암호화폐 자산 가격이 계속 변동하면서 유동성을 제공하는 동안 유동성 공급자(LP)가 겪을 수 있는 일시적인 손실을 보호하는 시스템입니다.
ILP는 $CACAO 공급량의 10%(1,000만 $CACAO)를 보유하며, 프로토콜 수수료의 10%를 지속적으로 충당받습니다. ILP는 유동성 입금 후 50일이 지나면 활성화되며, 보장 한도는 100%입니다.

ILP 보장 기간은 ASSET과 $CACAO의 성과에 따라 달라집니다. ASSET의 성과가 더 좋으면 150일 후, $CACAO의 성과가 더 좋으면 450일 후에 전액 보장됩니다. 전액 인출하면 ILP가 지급되고 초기화되지만, 일부 인출에는 영향을 받지 않습니다. 추가 충전 시에는 ILP가 초기화되지만 지급되지는 않습니다.

### 다른 분배 모델

유동성 경매는 참가자에게 $CACAO 토큰을 분배하기 위해 진행된 21일간의 행사였습니다. 행사 기간에 사용자는 지원되는 자산을 지정된 주소에 예치했습니다. 경매가 끝난 뒤 $CACAO 토큰의 90%는 유동성 기여도에 비례해 참가자에게 분배되었고, 나머지 10%는 ILP 준비금으로 배정되었습니다. 참가자는 유동성 공급자가 되었으며, 예치한 자산과 $CACAO 토큰은 Maya의 풀에 들어가 발생한 수수료의 일부를 받을 수 있었습니다.

### 다른 준비금 운영 방식

Maya Protocol의 제네시스 시점에 이용 가능한 CACAO 준비금은 총 공급량의 10%에 불과했습니다. THORChain의 44%와 비교하면 적은 양이며, 주로 비영구적 손실 보호(Impermanent Loss Protection, ILP)를 위해 마련되었습니다. Maya에는 블록 발행량이 없습니다. 프로토콜 소유 유동성과 대출이 도입된다면, 준비금과 긴밀하게 통합된 THORChain의 경우와는 다른 설계가 적용될 것입니다.

이러한 차이에도 Maya는 여전히 THORChain를 보완하는 솔루션입니다. 중복성, 확장 및 검증을 제공하고, 기존 THORChain 구현에는 없는 새 네트워크를 통합합니다.

또한 Maya의 목표는 다른 서비스가 기반으로 삼을 수 있는 *백엔드*가 되는 것입니다. Maya의 인프라를 바탕으로 다양한 새 *프런트엔드* 또는 DEX 서비스가 만들어지기를 기대합니다.

## Maya Protocol 지갑 연동

*백엔드*인 Maya를 사용하려면 여러 UI와 지갑에서 지원해야 합니다.
다음은 이미 Maya를 지원하는 서비스 목록입니다.

[THORWallet DEX](https://www.thorwallet.org/): Ledger, XDEFI, MetaMask, 키스토어

El Dorado: 더 이상 온라인 상태가 아니며 도메인이 확인되지 않습니다.

[CacaoSwap](https://cacaoswap.app/): 키스토어, MetaMask, XDEFI, Keplr, Leap

[Asgardex](https://www.asgardex.com/): 키스토어, Ledger

DefiSpot: 더 이상 온라인 상태가 아니며 도메인이 확인되지 않습니다.

[Ctrl Wallet (XDEFI)](https://ctrl.xyz/): 30개 이상의 네이티브 블록체인과 모든 EVM 및 Cosmos 체인을 지원하는 멀티 생태계 셀프 커스터디 지갑입니다. Bitcoin, Ethereum, Solana, THORChain, Maya Protocol, TRON 등을 지원합니다.

[KeepKey ](https://keepkey.com/): 디지털 자산을 안전하게 보관하기 위한 하드웨어 지갑입니다.
